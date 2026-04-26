# EXITour 개발 로드맵

## Phase 1: 정적 MVP 홈페이지 — 완료

완료 범위:

- `/`
- `/destinations`
- `/products`
- `/hotels`
- `/custom-package`
- `/quote`
- 공통 컴포넌트: Header, Footer, DestinationCard, ProductCard, HotelCard, CTASection, FAQSection
- 정적 데이터: `lib/data.ts`
- 한국어 고객용 콘텐츠
- Tailwind CSS 기반 모바일 반응형 화면
- 견적 요청 UI만 구현, 저장 기능 없음
- `npm.cmd run lint` 성공
- `npm.cmd run build` 성공

## Phase 2: 상품/호텔/도시 상세 페이지 추가

목표:

- 목적지 상세 페이지 추가: `/destinations/[slug]`
- 상품 상세 페이지 추가: `/products/[slug]`
- 호텔 상세 페이지 추가: `/hotels/[slug]`
- `lib/data.ts`의 데이터에 slug, 상세 설명, 추천 일정, SEO 필드 추가
- 상세 페이지별 CTA와 관련 상품/호텔 연결
- 실제 DB 연결 없이 정적 데이터 기반으로 구현

주의:

- Supabase, API, 관리자 페이지는 아직 구현하지 않는다.
- 상세 페이지도 빈 페이지나 TODO가 아니라 고객이 읽을 수 있는 한국어 콘텐츠로 구성한다.

## Phase 3: Supabase DB schema와 seed 추가

목표:

- Supabase/Postgres 스키마 초안 작성
- 목적지, 상품, 호텔, 가격 규칙, 견적 요청 관련 테이블 설계
- seed 데이터 작성
- RLS 정책 초안 작성
- service role key와 anon key 사용 범위 문서화

주의:

- 클라이언트에 service role key를 노출하지 않는다.
- 가격 변경 승인 시스템의 기반 테이블을 함께 고려한다.

## Phase 4: 견적 요청 폼 DB 저장

목표:

- `/quote` 폼 입력값을 Supabase에 저장
- 필수 입력값 검증
- 개인정보 동의 필수 처리
- 저장 성공/실패 UI 추가
- 관리자 확인 전까지 고객에게 확정 가격으로 오해될 표현 방지

주의:

- 저장은 서버 경유 또는 RLS 정책을 고려한 방식으로 구현한다.
- 개인정보가 URL, 로그, 클라이언트 상태에 과도하게 남지 않게 한다.

## Phase 5: 관리자 페이지 MVP

목표:

- 관리자 로그인 또는 보호된 접근 방식 추가
- 견적 요청 목록
- 견적 요청 상세
- 상담 상태 변경
- 관리자 메모
- 기본 필터와 검색

주의:

- 관리자 데이터는 공개 페이지에서 접근할 수 없어야 한다.
- 권한과 RLS 정책을 먼저 확인한다.

## Phase 6: 가격 변경 승인 시스템

목표:

- 가격 변경 요청 테이블과 UI 추가
- 기존 가격과 변경 가격 비교
- 승인/반려 플로우
- 감사 로그 기록
- 승인된 변경만 고객 노출 가격에 반영

주의:

- 실제 가격 변경은 승인 플로우 없이 자동 반영하지 않는다.

## Phase 7: OpenClaw API 연동

목표:

- OpenClaw API 연동 지점 정의
- 가격 변경 제안 또는 견적 보조 데이터 생성
- 생성된 변경안은 승인 대기 상태로 저장
- 장애와 타임아웃 대응

주의:

- OpenClaw가 제안한 가격도 관리자 승인 전에는 고객 화면에 반영하지 않는다.

## Phase 8: SEO, JSON-LD, sitemap, robots 고도화

목표:

- 페이지별 metadata 정리
- Organization, Service, Product, FAQPage JSON-LD 검토 및 적용
- sitemap.xml
- robots.txt
- 목적지/상품/호텔 상세 페이지의 검색 친화 콘텐츠 강화
- AEO를 고려한 질문형 콘텐츠 보강

## Phase 9: 외부 호텔/항공 API provider adapter 구조 추가

목표:

- 호텔 provider adapter 인터페이스 설계
- 항공 provider adapter 인터페이스 설계
- 외부 응답을 내부 공통 모델로 정규화
- API 실패 시 수동 운영과 캐시 fallback 설계
- 공급처별 가격과 내부 판매가 분리

주의:

- 외부 API 가격은 자동 노출하지 않는다.
- 관리자 승인과 감사 로그를 거친 데이터만 고객에게 확정 가격으로 보여준다.

## Phase 10: 배포와 운영 자동화

목표:

- 운영 환경 변수 정리
- 배포 파이프라인 구성
- 빌드, 린트, 타입 체크 자동화
- DB migration 적용 절차 문서화
- 백업과 장애 대응 문서화
- 운영 체크리스트 작성

주의:

- 배포 전 개인정보, API 키, 가격 변경 승인 플로우를 반드시 점검한다.
