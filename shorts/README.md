# EXITour 쇼츠 모션그래픽

유튜브 쇼츠용 세로 모션그래픽 영상(1080×1920, 30fps)을 만드는 [Remotion](https://www.remotion.dev) 프로젝트입니다.
웹사이트(Next.js)와는 의존성이 분리된 독립 폴더이며, 웹사이트 빌드·린트 대상에서 제외되어 있습니다.

기획 의도와 편별 구성은 [PLAN.md](./PLAN.md)에 있습니다.

## 영상 목록

| 컴포지션 ID | 내용 | 길이 |
| --- | --- | --- |
| `Ep1-Vehicles` | 1편 몇 명? 인원별 차량 선택 | 57초 |
| `Ep2-Hours` | 2편 몇 시간? 6시간 vs 12시간 | 44.5초 |
| `Ep3-Routes` | 3편 어디로? 기본 구간과 추가금 | 57.7초 |

## 사용법

Windows에서는 `npm` 대신 `npm.cmd`, `npx` 대신 `npx.cmd`를 사용하세요.

```bash
cd shorts
npm i                # 의존성 설치
npm run dev          # Remotion Studio 미리보기
npm run lint         # ESLint + 타입 검사

# MP4 렌더링
npx remotion render Ep1-Vehicles out/danang-rentcar-ep1-vehicles.mp4 --crf=16
npx remotion render Ep2-Hours out/danang-rentcar-ep2-hours.mp4 --crf=16
npx remotion render Ep3-Routes out/danang-rentcar-ep3-routes.mp4 --crf=16
```

## 수정 위치

- 화면 문구와 장면 길이: `src/ep1/Ep1.tsx`, `src/ep2/Ep2.tsx`, `src/ep3/Ep3.tsx`
  각 파일 아래쪽의 `EP*_SCENES`에서 장면 순서와 길이(프레임, 30 = 1초)를, `EP*_ACCENTS`에서 효과음 위치를 바꿀 수 있습니다.
- 색상·안전 영역: `src/theme.ts`
- 상단 브랜드 바: `src/components/Header.tsx`
- 마지막 브랜드 카드: `src/components/EndCard.tsx`

## 에셋

- 폰트: Pretendard (SIL Open Font License 1.1, `public/fonts/Pretendard-LICENSE.txt`)
- 효과음: `scripts/make-sfx.py`로 직접 합성한 음원입니다(외부 음원 없음). `python scripts/make-sfx.py`로 다시 만들 수 있습니다.
- Remotion은 개인 및 3인 이하 팀은 무료이며, 그보다 큰 회사는 [회사 라이선스](https://www.remotion.dev/license)가 필요합니다.
