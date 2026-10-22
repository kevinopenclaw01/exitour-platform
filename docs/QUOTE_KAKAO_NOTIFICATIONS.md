# 홈페이지 견적 접수 카카오톡 알림

2026-10-22 설치 및 실제 수신 검증 완료. 운영 사이트 시험 견적 1건이 두 방에 각각 1건 도착했고, 재실행에서 추가 발송 0건을 확인했다. 시험 DB 레코드는 정리했으며 실제 고객 데이터는 변경하지 않았다. 자동 테스트 15개, lint, build 통과.

## 대상과 흐름

고객이 `/quote`를 제출하여 `quote_requests`에 저장되면, 이 PC의 Windows 작업 스케줄러가 새 접수를 확인하고 기존 스마트스토어 알림과 같은 두 방에 전달한다.

- `office_work`: exitour 업무톡
- `office_storage`: 엑시투어 저장소

견적 접수는 결제나 예약 확정이 아니다. 메시지에도 이를 명시한다. 이름, 여행지, 일정, 인원, 연락처, 카카오톡 ID, 이메일, 호텔 등급, 요청 서비스, 예산과 문의 내용을 전달한다. 상품·유입 페이지는 기존 quote prefill이 저장한 `message`를 그대로 활용한다. 고객에게 메시지를 발송하거나 새 채팅방으로 초대하지 않는다.

홈페이지 화면, `/api/quote`, 관리자 기능, 이메일 알림, DB schema, migrations, RLS, 기존 예약 감시 프로그램은 변경하지 않는다. 따라서 홈페이지 재배포 없이 현재 운영 사이트에 적용할 수 있다. 새 라이브러리나 유료 메시지 서비스를 추가하지 않는다.

## 실행 조건

- 이 PC가 켜져 있고 Windows 사용자 `kevin`이 로그인되어 있어야 한다.
- 기존 `자동화/kakao/Send-KakaoMessage.ps1`의 인증이 유효해야 한다.
- `EXITour Website Quote Kakao` 작업은 60초마다 확인한다. 로그온 시에도 실행한다.
- 기존 예약 알림과 동일하게 한국시간 **23:00~07:00**에는 발송하지 않는다. 그동안의 견적은 DB에 남으며 07:00 이후 순서대로 처리한다.
- 최초 활성화 시점 이후 접수부터 보낸다. 과거 고객에게 알림을 일괄 재발송하지 않는다.

Vercel에서 이 PC로 공개 포트를 열거나 Nexus·Chrome·로컬 LLM 서버를 인터넷에 노출하지 않는다. 이 PC를 끄면 즉시 알림은 불가능하지만, 다시 켜고 로그인하면 미처리 접수를 확인한다. 상시 발송이 필요하면 별도의 상시 실행 서버와 승인된 카카오 발송 서비스로 이전해야 한다.

## 보안

사용자가 승인한 **웹사이트 전용 Supabase 프로젝트**의 secret key 또는 legacy service_role key만 서버 작업에 사용한다. 이 키는 RLS를 우회할 수 있는 강한 권한이므로 브라우저·클라이언트 코드·Git·문서·로그·명령행 인수에 저장하지 않는다. 공개용 anon 키로 고객 데이터를 읽게 하는 RLS 변경도 하지 않는다.

설정 파일은 기본적으로 `C:\AI\exitour-quote-notifier\credentials.xml`이다. Windows DPAPI로 현재 사용자·PC에 묶어 암호화하고, 폴더 ACL은 현재 사용자와 SYSTEM만 허용한다. 키는 실행 중 메모리와 자식 프로세스의 표준 입력으로만 전달한다. 다른 프로젝트의 환경변수를 자동으로 가져오지 않는다.

`state.json`에는 활성화 시각, 접수 ID/시각, 방별 처리 상태만 기록한다. 이름·전화번호·문의 내용은 상태·로그에 기록하지 않는다. 발송에 필요한 임시 `pending-message.txt`는 같은 보호 폴더 안에 만들고 즉시 삭제한다. 강제 종료 시 남은 파일은 다음 실행에서 정리한다. 이 운영 폴더를 공개 저장소나 AI 프롬프트에 첨부하지 않는다.

## 설치

현재 프로젝트의 PowerShell 스크립트:

```powershell
$script = 'C:\Users\kevin\Desktop\바탕화면\AI\semi ochestra\웹사이트\EXITour 홈페이지\site\scripts\quote-notifications\Manage-QuoteNotifier.ps1'
# 키는 프롬프트에만 입력한다. 채팅이나 아래 명령에 붙이지 않는다.
& $script -Mode Setup
& $script -Mode Install
& $script -Mode Status
```

Setup은 웹사이트 전용 URL과 키 종류를 확인하고, 행을 읽지 않는 `limit=0` 요청으로 접근을 검증한 뒤 암호화한다. Install은 활성화 시점을 저장하고 작업을 등록한다. 기존 작업이 있으면 덮어쓰지 않는다. 같은 작업이 실행 중이면 중복 실행하지 않는다.

즉시 1회 확인 및 중지:

```powershell
& $script -Mode Run
& $script -Mode Disable
```

## 재시도와 중복 방지

방별로 완료 상태를 저장한다. 업무톡 전송 성공 후 저장소의 사전 인증이 실패하면 다음 실행에서 저장소만 다시 시도한다. 두 방 모두 성공해야 접수 처리 커서를 넘긴다. 정렬은 `created_at, id`이며 DB의 마이크로초 시각을 그대로 보존한다.

외부 메신저는 완전한 exactly-once 보장을 제공하지 않는다. 전송 요청 뒤 통신이 끊어지거나 프로세스가 죽으면 실제 발송 여부가 불명확할 수 있다. 이때 `sending`/`uncertain` 상태로 보류하고 자동 재발송하지 않는다. 이후 접수도 보류하므로 운영자가 방에서 접수번호를 확인해야 한다. **실제 수신 여부 확인 후에만** 해당 방 상태를 `sent` 또는 `pending`으로 복구한다. 확실히 발송 전인 인증 오류는 `pending`으로 유지해 다음 실행에서 재시도한다. 기존 Kakao wrapper 자체의 재시도 정책은 변경하지 않는다.

강제 종료 후 `worker.lock`이 남으면, 작업 스케줄러와 해당 PID를 확인하여 **우리 worker가 종료된 경우에만** 잠금을 정리한다. 다른 예약 봇이나 인증 프로세스를 종료하지 않는다. 상태 파일을 삭제해 다시 초기화하면 미처리 견적을 건너뛸 수 있으므로 임의 삭제하지 않는다.

## 검증과 로그

```powershell
npm.cmd run test:quote-notifications
npm.cmd run lint
npm.cmd run build
```

실제 시험은 명확하게 `연동 시험 / 실제 고객 아님`으로 표시한 견적 1건을 `/api/quote`에 제출하고 두 방에서 동일 접수번호를 확인한다. 다시 실행해 같은 접수의 재발송이 없는지 확인한다. 운영 고객 데이터로 시험하지 않는다.

`C:\AI\exitour-quote-notifier\worker.log`에는 `poll_complete`, `database_read_failed`(HTTP 상태만), `retry`, `needs_review`, `ignored_without_consent`, `quiet_hours` 등 메타데이터만 남긴다. 동의가 없는 비정상 행은 발송하지 않고 건너뛰어 다음 정상 접수를 막지 않는다. 로그는 1MB 단위로 1세대 회전한다. 401/403이면 웹사이트 전용 키 설정을 확인하고, 카카오 인증 오류는 기존 Kakao 운영 절차로 처리한다. 승인 없이 인증을 초기화하거나 봇·서버를 재시작하지 않는다.
