# EXITour Database Schema

Phase 3는 프론트엔드 연결 없이 Supabase/Postgres에서 사용할 초기 스키마와 seed를 준비하는 단계다. 현재 `lib/data.ts`의 정적 목적지, 상품, 호텔 구조를 DB로 옮길 수 있게 설계하되, Phase 4 이후 기능을 붙이기 위한 확장 지점을 함께 둔다.

## 테이블 목적

- `countries`: 국가 단위 목적지. SEO, 정렬, 활성 상태를 관리한다.
- `cities`: 국가 하위 도시. 도시 가이드, 공항, 추천 시즌, 추천 대상을 관리한다.
- `product_categories`: 상품 카테고리. 공항 픽업, 호핑투어, 마사지 등 운영 분류다.
- `products`: 상품 본문 정보. 설명, 일정, 포함/불포함, 주의사항, 취소 규정을 저장한다.
- `product_rates`: 상품 가격 정보. 상품 본문과 분리해 시즌, 기간, 통화, 환율, 마진, 표시가, 승인 상태를 관리한다.
- `hotels`: 호텔 본문 정보. 도시, 등급, 편의시설, 추천 대상, 계약 여부를 저장한다.
- `hotel_rooms`: 호텔 객실 타입. 조식 여부, 침대 타입, 최대 인원을 저장한다.
- `hotel_rates`: 호텔 객실 요금. 시즌, 기간, 통화, 계약가, 환율, 마진, 표시가, 재고 상태, 승인 상태를 관리한다.
- `faqs`: 홈, 국가, 도시, 상품, 호텔, 맞춤 패키지에 연결 가능한 FAQ.
- `reviews`: 국가, 도시, 상품, 호텔, 맞춤 패키지에 연결 가능한 후기.
- `quote_requests`: 고객 견적 요청. 개인정보와 상담 상태가 포함된다.
- `price_change_requests`: OpenClaw, provider, admin, manual 출처의 가격 변경 요청.
- `price_change_logs`: 승인 후 실제 변경 기록과 감사 로그.
- `external_providers`: 외부 호텔/항공/액티비티 provider 메타데이터.
- `external_products`: 외부 provider 상품 원문과 내부 매핑 payload.

## 공개 조회 테이블과 비공개 운영 테이블

공개 조회 가능 테이블:

- `countries`
- `cities`
- `product_categories`
- `products`
- `product_rates`
- `hotels`
- `hotel_rooms`
- `hotel_rates`
- `faqs`
- `reviews`

공개 조회 정책은 `is_active = true` 데이터만 허용한다. 가격 테이블은 추가로 `approval_status = 'approved'` 조건을 적용한다.

비공개 운영 테이블:

- `quote_requests`
- `price_change_requests`
- `price_change_logs`
- `external_providers`
- `external_products`

`quote_requests`는 public insert만 허용하고 select/update/delete는 관리자 또는 서버 전용으로 둔다. 가격 변경과 외부 provider 테이블은 public policy를 만들지 않아 기본적으로 접근할 수 없다.

## 가격 변경 흐름

가격 정보는 상품/호텔 본문과 분리한다.

1. 관리자, OpenClaw, 외부 provider, 수동 작업자가 가격 변경안을 만든다.
2. 변경안은 `price_change_requests`에 `pending` 상태로 저장한다.
3. 기존 값은 `current_snapshot`, 제안 값은 `proposed_snapshot`에 보관한다.
4. 관리자가 승인하면 대상 가격 테이블의 값을 변경한다.
5. 실제 변경 내용은 `price_change_logs`에 기록한다.
6. 승인 전 가격은 고객 화면에 자동 반영하지 않는다.

`product_rates`와 `hotel_rates`의 `approval_status`는 `draft`, `pending`, `approved`, `rejected`, `archived` 중 하나다. 공개 조회는 approved만 허용한다.

## quote_requests 보안 원칙

`quote_requests`에는 이름, 연락처, 카카오톡 ID, 이메일, 여행 예산, 문의 내용이 포함될 수 있다.

- public insert만 허용한다.
- public select/update/delete policy는 만들지 않는다.
- insert 시 `privacy_agreed = true` 조건을 요구한다.
- Phase 4에서 폼 저장을 붙일 때 개인정보가 URL query, 클라이언트 로그, 브라우저 콘솔에 과도하게 남지 않도록 한다.
- Phase 5 관리자 페이지에서만 목록과 상세 조회를 제공한다.

## service role key 사용 원칙

- `SUPABASE_SERVICE_ROLE_KEY`는 서버 환경에서만 사용한다.
- `SUPABASE_SERVICE_ROLE_KEY`를 클라이언트 컴포넌트, 브라우저 번들, `NEXT_PUBLIC_*` 환경변수에 절대 넣지 않는다.
- 공개 화면은 `NEXT_PUBLIC_SUPABASE_ANON_KEY`와 RLS 정책이 허용하는 범위에서만 접근한다.
- 관리자 작업, 가격 승인, 외부 provider 동기화, OpenClaw webhook 처리는 서버 전용 코드에서 처리한다.

## Phase 4 프론트엔드 연결 계획

Phase 4에서는 `/quote` 폼을 실제 DB 저장으로 연결한다.

- 입력값 검증 추가
- 개인정보 동의 필수 처리
- `quote_requests` insert 구현
- 성공/실패 UI 추가
- 저장 후에도 고객에게 확정가처럼 보이는 표현 금지
- 가능하면 서버 액션 또는 route handler에서 저장해 개인정보 노출을 줄인다.

## Phase 5 관리자 페이지 연결 계획

Phase 5에서는 관리자 페이지 MVP를 만든다.

- 관리자 인증 또는 보호된 접근 방식 추가
- `quote_requests` 목록과 상세 조회
- 상담 상태 변경
- 관리자 메모 필드 확장 검토
- 상품/호텔/가격 읽기 화면
- RLS와 서버 전용 권한 경계를 검증

## Phase 7 OpenClaw 연동 계획

Phase 7에서는 OpenClaw API 또는 webhook이 가격 변경 요청을 넣을 수 있게 한다.

- OpenClaw 요청은 `OPENCLAW_WEBHOOK_SECRET`으로 검증한다.
- OpenClaw는 실제 가격을 직접 변경하지 않고 `price_change_requests`에 제안만 저장한다.
- 관리자가 승인하기 전에는 `product_rates`, `hotel_rates`의 공개 approved 가격에 반영하지 않는다.
- 승인/반려/적용 기록은 `price_change_logs`와 감사 로그 성격으로 보존한다.
