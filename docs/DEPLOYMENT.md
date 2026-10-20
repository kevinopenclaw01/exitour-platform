# EXITour 도메인 배포 기록

## 2026-10-16 사파 상품 배포

- 기존 Vercel 프로젝트에 배포: `dpl_mufEQSyp3CybxMw1nVCj289uSK9Y`, `READY`
- 공식 상품: `https://exitour.co.kr/vietnam/sapa/private-package/3n5d-sapa-hanoi`
- 홈페이지·상품 목록·베트남·사파·하노이 페이지에서 공식 상품으로 연결
- Codex 생성 풍경 1장과 얼굴 없는 사용자 제공 풍경 2장 사용
- 원가·마진 원본, 환경변수, 고객 얼굴 사진·영상, SQL은 배포 파일에서 제외
- lint/build 성공, 로컬 브라우저 10개 검증 및 기존 요금 테스트 43개 통과
- Supabase 저장은 아래 조직 서비스 제한으로 미완료이며 정적 기본요금만 반영

## 2026-10-13 배포

- 기존 Vercel 프로젝트: `exitour-platform-llcg`
- 배포 ID: `dpl_ENYEPnELU9hb7yyFMTSgczLNnS2f`
- 배포 상태: `READY`
- 운영 기본 주소: `https://exitour.co.kr`
- `www.exitour.co.kr`은 기본 주소로 308 이동하도록 등록
- 운영/미리보기 `NEXT_PUBLIC_SITE_URL`: `https://exitour.co.kr`
- `.env.local`, Git 정보, 고객 데이터, Supabase SQL 원본은 업로드하지 않음
- 로컬 작업 파일을 업로드한 배포이며 Git commit/push를 수행하지 않음

Next.js와 eslint-config-next는 16.4.0, Nodemailer는 10.1.0으로 보안 패치했다. 운영 의존성 audit 0건, 개발 의존성에는 별도 경고가 남는다. lint/build와 요금 테스트 43개가 통과했다.

## DNS 전환 상태

사용자가 가비아 DNS를 저장했고 Vercel 권장 A/CNAME 반영을 확인했다. 2026-10-16 공식 도메인 HTTPS 200과 `www`에서 공식 도메인 동일 경로로 308 이동을 확인했다.

Vercel이 해당 프로젝트/도메인에 제시한 설정:

| 타입 | 호스트 | 값 | TTL |
| --- | --- | --- | --- |
| A | @ | 216.198.79.1 | 600 |
| CNAME | www | 55472b2bbe87677d.vercel-dns-017.com. | 600 |

전환 전 `@`와 `www`는 모두 `real-alb-49294726.ap-northeast-2.elb.amazonaws.com.`에 연결된 CNAME, TTL 600이었다. Facebook 인증 TXT와 AWS 인증 CNAME은 그대로 보존한다. 가비아 네임서버를 변경하지 않는다. 기존 AWS 파일 삭제 또는 호스팅 해지는 수행하지 않았다.

## 완료 전 검증

1. 변경 후 가비아 저장 결과와 레코드 확인
2. 권한 있는 DNS 및 Vercel 도메인 설정에서 전환 확인
3. 인증서 검증을 유지한 HTTPS 접속, www 리디렉션 확인
4. 홈페이지·카자흐스탄·상품 상세·quote 자동입력·이미지 표시 확인
5. 관리자 접근 보호 확인, 실제 고객 견적 제출 없이 API 입력 검증 확인

보호된 Vercel 미리보기의 인증 우회 링크 생성은 보안 검토에서 거부되어 사용하지 않았다. 접근 보호를 해제하거나 다른 방식으로 우회하지 않는다. 정식 도메인 전환 후 공개 페이지를 검증한다.

## 별도 운영 대기 사항

2026-10-16 사용자가 기존 홈페이지 전용 Supabase 프로젝트 `exitour-platform` 복구를 선택했다.
복구 API가 조직 서비스 제한으로 `PaymentRequiredException`을 반환했다. 유료 업그레이드나 다른 프로젝트로 임의 변경하지 않았다.
사파 요금 DB 저장은 미완료이며 제한 해제 후 복구·실제 스키마 확인·적재·조회 검증이 필요하다.
견적 DB 저장과 관리자 DB 권한, SMTP 운영 설정도 실제 연결 검증 전에는 정상이라고 보고하지 않는다. 이번 작업에서 기존 admin/quote/API/RLS/migration 코드는 변경하지 않았다.
