import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { mkdir, open, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROJECT_URL, EXPECTED_CHAT_IDS, ROOMS, buildPollUrl, deliverQuote,
  initialState, isQuietTime, validateState } from './core.mjs';

const dataDir = process.env.EXITOUR_NOTIFIER_DATA_DIR || 'C:\\AI\\exitour-quote-notifier';
const stateFile = path.join(dataDir, 'state.json');
const orchestra = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../../..');
const kakaoDir = path.join(orchestra, '자동화', 'kakao');
const powershell = path.join(process.env.SystemRoot || 'C:\\Windows',
  'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');

function log(event, extra = {}) {
  console.log(JSON.stringify({ at: new Date().toISOString(), event, ...extra }));
}

async function save(state) {
  const temporary = `${stateFile}.tmp`;
  await writeFile(temporary, JSON.stringify(state, null, 2), { mode: 0o600 });
  await rename(temporary, stateFile);
}

function runScript(filename, args = []) {
  return new Promise(resolve => {
    const child = spawn(powershell, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
      '-File', path.join(kakaoDir, filename), ...args], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let output = '';
    let overflow = false;
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', chunk => {
      if (output.length < 100_000) output += chunk;
      else overflow = true;
    });
    // Existing wrapper errors may contain message details. Never relay stdout/stderr to logs.
    child.stderr.resume();
    const timer = setTimeout(() => child.kill(), 180_000);
    child.on('error', () => { clearTimeout(timer); resolve({ launchFailed: true }); });
    child.on('close', code => {
      clearTimeout(timer);
      try {
        const json = JSON.parse(output.replace(/^\uFEFF/, '').trim());
        resolve({ code, json: overflow ? null : json });
      } catch { resolve({ code, json: null }); }
    });
  });
}

async function verifyRooms() {
  const aliases = JSON.parse((await readFile(path.join(kakaoDir, 'chat-aliases.json'), 'utf8')).replace(/^\uFEFF/, ''));
  for (const room of ROOMS) {
    if (String(aliases[room]?.chat_id) !== EXPECTED_CHAT_IDS[room]) throw new Error('room_configuration_changed');
  }
}

async function send(room, message) {
  await verifyRooms();
  const ready = await runScript('Test-KakaoAutomation.ps1');
  if (ready.code !== 0 || ready.json?.ready !== true) return { status: 'not_sent' };
  const messageFile = path.join(dataDir, 'pending-message.txt');
  await writeFile(messageFile, `\uFEFF${message}`, { mode: 0o600 });
  try {
    const result = await runScript('Send-KakaoMessage.ps1', ['-Target', room, '-MessageFile', messageFile]);
    if (result.launchFailed) return { status: 'not_sent' };
    return { status: result.code === 0 && result.json?.success === true
      && result.json?.sent === true ? 'sent' : 'uncertain' };
  } finally { await unlink(messageFile).catch(() => {}); }
}

function headersFor(key) {
  if (key.startsWith('sb_secret_')) return { apikey: key };
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString());
    if (payload.role !== 'service_role' || payload.ref !== 'mdneuvnqwcorvinvtawp') throw new Error();
  } catch { throw new Error('wrong_project_or_key_type'); }
  return { apikey: key, Authorization: `Bearer ${key}` };
}

async function main() {
  await mkdir(dataDir, { recursive: true, mode: 0o700 });
  let lock;
  try { lock = await open(path.join(dataDir, 'worker.lock'), 'wx'); }
  catch (error) {
    if (error.code === 'EEXIST') { log('already_running_or_stale_lock'); return; }
    throw error;
  }
  try {
    await lock.writeFile(String(process.pid));
    if (process.argv.includes('--initialize')) {
      try { await readFile(stateFile); throw new Error('already_initialized'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; }
      await save(initialState());
      log('initialized_future_quotes_only');
      return;
    }
    const state = validateState(JSON.parse(await readFile(stateFile, 'utf8')));
    if (isQuietTime()) { log('quiet_hours'); return; }
    const input = createInterface({ input: process.stdin, crlfDelay: Infinity });
    const line = await input[Symbol.asyncIterator]().next();
    input.close();
    const config = JSON.parse(line.value || '{}');
    if (config.url?.replace(/\/$/, '') !== PROJECT_URL) throw new Error('wrong_project');
    const headers = headersFor(String(config.key || '').trim());
    const response = await fetch(buildPollUrl(state), {
      headers, redirect: 'error', signal: AbortSignal.timeout(20_000), cache: 'no-store',
    });
    if (!response.ok) { log('database_read_failed', { status: response.status }); process.exitCode = 1; return; }
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('invalid_database_response');
    await verifyRooms();
    // A leftover file can exist after a forced Windows shutdown; state marks delivery uncertain.
    await unlink(path.join(dataDir, 'pending-message.txt')).catch(() => {});
    if (state.pending && rows[0]?.id !== state.pending.id) throw new Error('pending_row_missing');
    let delivered = 0;
    const startedAt = Date.now();
    for (const row of rows) {
      if (Date.now() - startedAt > 180_000) break;
      const result = await deliverQuote(state, row, { save, send });
      if (result.status === 'ignored_without_consent') {
        log(result.status, { quote_id: row.id });
        continue;
      }
      if (result.status !== 'delivered') {
        log(result.status, { quote_id: row.id });
        process.exitCode = result.status === 'quiet' ? 0 : 1;
        return;
      }
      delivered++;
    }
    log('poll_complete', { delivered });
  } finally {
    await lock.close();
    await unlink(path.join(dataDir, 'worker.lock'));
  }
}

main().catch(error => {
  const safe = new Set(['invalid_state', 'invalid_cursor', 'invalid_pending', 'invalid_row',
    'pending_row_missing', 'already_initialized', 'wrong_project', 'wrong_project_or_key_type',
    'room_configuration_changed', 'invalid_database_response']);
  log('worker_failed', { reason: safe.has(error.message) ? error.message : 'local_or_network_error' });
  process.exitCode = 1;
});
