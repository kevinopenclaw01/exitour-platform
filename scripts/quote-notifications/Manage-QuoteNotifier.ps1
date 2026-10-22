[CmdletBinding()]
param(
    [ValidateSet('Setup', 'Install', 'Run', 'Status', 'Disable')]
    [string]$Mode = 'Status',
    [string]$DataDirectory = 'C:\AI\exitour-quote-notifier',
    [Security.SecureString]$SecretKey
)

$ErrorActionPreference = 'Stop'
$stage = 'start'
$taskName = 'EXITour Website Quote Kakao'
$projectUrl = 'https://mdneuvnqwcorvinvtawp.supabase.co'
$credentialFile = Join-Path $DataDirectory 'credentials.xml'
$worker = Join-Path $PSScriptRoot 'worker.mjs'
$stateFile = Join-Path $DataDirectory 'state.json'

function Get-NodePath {
    $bundled = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node.exe'
    if (Test-Path -LiteralPath $bundled) { return $bundled }
    return (Get-Command node.exe -ErrorAction Stop).Source
}

function Initialize-PrivateDirectory {
    $null = New-Item -ItemType Directory -Path $DataDirectory -Force
    $sid = [Security.Principal.WindowsIdentity]::GetCurrent().User
    # icacls changes only the DACL without requiring audit-policy privileges.
    $allowed = @($sid.Value, 'S-1-5-18')
    $null = & icacls.exe $DataDirectory '/inheritance:r' '/grant:r' ('*' + $sid.Value + ':(OI)(CI)F') '*S-1-5-18:(OI)(CI)F'
    if ($LASTEXITCODE -ne 0) { throw 'private_directory_acl_failed' }
    foreach ($rule in @((Get-Acl -LiteralPath $DataDirectory).Access)) {
        $identity = $rule.IdentityReference.Translate([Security.Principal.SecurityIdentifier]).Value
        if ($identity -notin $allowed) {
            $null = & icacls.exe $DataDirectory '/remove' ('*' + $identity)
            if ($LASTEXITCODE -ne 0) { throw 'private_directory_acl_failed' }
        }
    }
    $acl = Get-Acl -LiteralPath $DataDirectory
    if (-not $acl.AreAccessRulesProtected) { throw 'private_directory_not_protected' }
    foreach ($rule in @($acl.Access)) {
        if ($rule.IdentityReference.Translate([Security.Principal.SecurityIdentifier]).Value -notin $allowed) { throw 'private_directory_not_private' }
    }
}

function Invoke-Worker([switch]$Initialize) {
    $start = New-Object Diagnostics.ProcessStartInfo
    $start.FileName = Get-NodePath
    $start.Arguments = '"' + $worker + '"' + $(if ($Initialize) { ' --initialize' } else { '' })
    $start.UseShellExecute = $false
    $start.CreateNoWindow = $true
    $start.RedirectStandardInput = $true
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    foreach ($name in @('SUPABASE_SERVICE_ROLE_KEY', 'SUPABASE_DB_URL', 'SUPABASE_URL')) {
        $start.EnvironmentVariables.Remove($name)
    }
    $start.EnvironmentVariables['EXITOUR_NOTIFIER_DATA_DIR'] = $DataDirectory
    $process = New-Object Diagnostics.Process
    $process.StartInfo = $start
    $credential = $null
    if (-not $Initialize) {
        $credential = Import-Clixml -LiteralPath $credentialFile
        if ($credential.UserName -ne $projectUrl) { throw 'credential_project_mismatch' }
    }
    $null = $process.Start()
    if ($credential) {
        $payload = @{url = $projectUrl; key = $credential.GetNetworkCredential().Password} | ConvertTo-Json -Compress
        $process.StandardInput.WriteLine($payload)
        $payload = $null
        $credential = $null
    }
    $process.StandardInput.Close()
    $output = $process.StandardOutput.ReadToEnd()
    $null = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    $logFile = Join-Path $DataDirectory 'worker.log'
    if ((Test-Path -LiteralPath $logFile) -and (Get-Item -LiteralPath $logFile).Length -gt 1MB) {
        Move-Item -LiteralPath $logFile -Destination (Join-Path $DataDirectory 'worker.previous.log') -Force
    }
    if ($output) {
        Add-Content -LiteralPath $logFile -Value $output.Trim() -Encoding UTF8
        Write-Output $output.Trim()
    }
    return $process.ExitCode
}

try {
    switch ($Mode) {
        'Setup' {
            $stage = 'private_directory'
            Initialize-PrivateDirectory
            # Read-Host avoids clipboard history, shell arguments and plaintext .env files.
            $stage = 'key_validation'
            $secret = if ($SecretKey) { $SecretKey } else { Read-Host 'EXITour Supabase secret key (sb_secret_... or legacy service_role)' -AsSecureString }
            $credential = New-Object Management.Automation.PSCredential($projectUrl, $secret)
            $key = $credential.GetNetworkCredential().Password
            if (-not $key.StartsWith('sb_secret_')) {
                $parts = $key.Split('.')
                if ($parts.Count -ne 3) { throw 'server_key_required' }
                $encoded = $parts[1].Replace('-', '+').Replace('_', '/')
                $encoded += '=' * ((4 - $encoded.Length % 4) % 4)
                $claims = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($encoded)) | ConvertFrom-Json
                if ($claims.role -ne 'service_role' -or $claims.ref -ne 'mdneuvnqwcorvinvtawp') { throw 'server_key_project_mismatch' }
            }
            $headers = @{apikey = $key}
            if (-not $key.StartsWith('sb_secret_')) { $headers.Authorization = 'Bearer ' + $key }
            $stage = 'database_access_check'
            $null = Invoke-WebRequest -UseBasicParsing -Method Get -Uri ($projectUrl + '/rest/v1/quote_requests?select=id&limit=0') -Headers $headers -UserAgent 'EXITourQuoteNotifier/1.0 (Windows server worker)' -TimeoutSec 20
            $stage = 'encrypted_store'
            $credential | Export-Clixml -LiteralPath $credentialFile
            $key = $null
            $headers = $null
            Write-Output '{"configured":true,"encrypted":"Windows DPAPI, current user"}'
        }
        'Install' {
            if (-not (Test-Path -LiteralPath $credentialFile)) { throw 'setup_required' }
            if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) { throw 'task_already_exists' }
            Initialize-PrivateDirectory
            if (-not (Test-Path -LiteralPath $stateFile)) {
                $result = @(Invoke-Worker -Initialize)
                if ($result[-1] -ne 0) { throw 'initialization_failed' }
            }
            $arguments = '-NoProfile -NonInteractive -ExecutionPolicy Bypass -File "' + $PSCommandPath + '" -Mode Run -DataDirectory "' + $DataDirectory + '"'
            $hostPath = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
            $action = New-ScheduledTaskAction -Execute $hostPath -Argument $arguments -WorkingDirectory $PSScriptRoot
            $repeat = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) -RepetitionInterval (New-TimeSpan -Minutes 1)
            $logon = New-ScheduledTaskTrigger -AtLogOn -User ([Security.Principal.WindowsIdentity]::GetCurrent().Name)
            $principal = New-ScheduledTaskPrincipal -UserId ([Security.Principal.WindowsIdentity]::GetCurrent().Name) -LogonType Interactive -RunLevel Limited
            $settings = New-ScheduledTaskSettingsSet -MultipleInstances IgnoreNew -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 15) -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
            $null = Register-ScheduledTask -TaskName $taskName -Action $action -Trigger @($repeat, $logon) -Principal $principal -Settings $settings -Description 'Website quote alerts to the two approved existing SmartStore Kakao rooms. Quiet hours 23:00-07:00 KST.'
            Write-Output '{"installed":true,"interval_seconds":60,"quiet_hours_kst":"23:00-07:00"}'
        }
        'Run' {
            $result = @(Invoke-Worker)
            $result | Select-Object -SkipLast 1 | Write-Output
            exit $result[-1]
        }
        'Status' {
            $task = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
            $state = if (Test-Path -LiteralPath $stateFile) { Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json } else { $null }
            [pscustomobject]@{
                credential_configured = (Test-Path -LiteralPath $credentialFile)
                task_state = $(if ($task) { [string]$task.State } else { 'not_installed' })
                activated_at = $state.activatedAt
                pending_delivery = [bool]$state.pending
                pending_room_states = $state.pending.rooms
            } | ConvertTo-Json -Depth 4
        }
        'Disable' {
            $null = Disable-ScheduledTask -TaskName $taskName
            Write-Output '{"disabled":true}'
        }
    }
}
catch {
    # Never emit HTTP error bodies, key values, customer records or exception command lines.
    @{ok = $false; reason = 'notifier_setup_or_runtime_failed'; stage = $stage; error_type = $_.Exception.GetType().Name; line = $_.InvocationInfo.ScriptLineNumber; http_status = $(if ($_.Exception.Response) { [int]$_.Exception.Response.StatusCode } else { $null })} | ConvertTo-Json -Compress
    exit 1
}
