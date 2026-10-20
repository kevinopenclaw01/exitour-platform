---
name: EXITour baggage-tag system
updated: 2026-10-20
colors:
  paper: "#F3F5FA"      # 바탕
  ink: "#0F1838"        # 글자, 남색 띠
  cobalt: "#2340D8"     # 브랜드 면(첫 화면·상담 띠)
  cobalt-deep: "#1A2FA6"
  signal: "#FFD23F"     # 주된 행동 버튼만
  signal-hover: "#FFC410"
  line: "#D6DCEA"       # 선·테두리
  muted: "#46527A"      # 보조 글자
typography:
  display: "Black Han Sans 400 — h1·h2 (class .display)"
  body: "Noto Sans KR variable — 본문·작은 제목"
  code: "Archivo wdth 62, 800 — 공항 코드·워드마크 (class .code)"
  num: "Archivo wdth 80 tabular — 가격·전화번호 (class .num)"
rounded: { tag: 6px, chip: 9999px }
shadow:
  tag: "0 2px 0 rgb(15 24 56/.08), 0 14px 28px -14px rgb(15 24 56/.35)"
---

# EXITour 디자인 시스템

## 한 줄
여행 가방의 **수하물 태그**. 행선지는 공항 코드(DAD·TAG·MPH·GUM·CXR·ALA·HAN…)로 크게 박고, 카드는 끈 구멍과 절취선이 있는 태그로 만든다.

## 색
- 바탕은 `paper`, 흰 태그가 그 위에 뜬다.
- `cobalt`는 포인트가 아니라 **면**이다: 홈 첫 화면, 페이지 끝 상담 띠, 상담 상자.
- `ink`는 글자와 남색 띠(카자흐스탄 소개, 바닥글, 카자흐스탄 상품 머리).
- `signal` 노랑은 **주된 행동 버튼에만**(견적 요청, 일정 보기). 한 구역에 하나.
- 예전 페이지 호환: Tailwind의 `slate-*`는 남색 중립색, `cyan-*`는 코발트 눈금으로 바꿔 두었다(`app/globals.css`). 새 코드는 위 이름을 쓴다. 컴포넌트에 hex를 새로 쓰지 않는다.

## 글자
- 큰 제목(h1·h2)은 `.display`(Black Han Sans). 굵기 클래스를 더하지 않는다.
- 카드 안 작은 제목은 Noto Sans KR `font-bold`.
- 공항 코드·워드마크는 `.code`, 가격·전화번호는 `.num`.
- 제목 위 꼬리표(영문 섹션 이름, "상담 CTA" 같은 내부 라벨)는 쓰지 않는다. 대문자 라벨도 없다.

## 부품
- `.tag` 흰 카드 + 태그 그림자. `.tag-hole` 위쪽 끈 구멍(구멍 색은 `--hole-bg`로 배경에 맞춘다). `.tag-perf` 점선 절취선 — 카드 아래 비행시간·가격 줄 위에.
- 목적지 카드: 나라 → 공항 코드(크게) → 지명 → 요약 → 절취선 → 비행·좋은 때. 공항 코드는 `lib/airportCodes.ts`에 있는 것만(공항이 없는 무이네·유럽은 코드 없음).
- 상품(홈): 일정표 한 줄 — 종류 아이콘·이름·지역·기간·가격. 상품 목록 페이지는 태그 카드.
- 선택 칩: 테두리 2px `line`, 고르면 `cobalt`(행선지) 또는 `ink`(형태)로 채운다. `has-[:checked]`로 그린다.
- 자주 묻는 질문: 위 굵은 `ink` 선 + `details` 접기, 오른쪽 `+`가 45° 돌아 `×`.
- 번호는 실제 순서일 때만(상담 3단계, 일정 Day, 이용 방법).

## 움직임
- 태그 카드에 마우스를 올리면 4px 위로. 다른 등장 효과는 없다. `prefers-reduced-motion`이면 끈다.

## 문구
- 손님 말로 쓴다. 버튼은 하는 일을 말한다("견적 요청서 쓰기", "카자흐스탄 일정 보기").
- 가격이 0이거나 미정이면 "상담 후 안내". 0원으로 보이지 않게.
- 개발용 메모(mock, 예시, 템플릿, TODO)는 손님 화면에 두지 않는다.
- 오류는 무엇이 안 됐고 어떻게 하면 되는지 말한다(견적 저장 실패 → 전화·카카오톡 안내).
