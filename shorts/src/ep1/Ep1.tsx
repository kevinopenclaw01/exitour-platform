import React from "react";
import { useCurrentFrame } from "remotion";
import { EndCard } from "../components/EndCard";
import { Accent, Episode, SceneSpec, totalFrames } from "../components/Episode";
import { Arrow, Person, SuitcaseShape } from "../components/Icons";
import { Stage, VehicleLayout } from "../components/Layout";
import { SeatDef, SeatMap } from "../components/SeatMap";
import { Hl, Kicker, Lines, Marker, Sub } from "../components/Text";
import { Bus29, Limo, Mpv7, Van16 } from "../components/Vehicles";
import { countUp, dimAfter, EASE, lerp, popIn, prog, pulse, rise } from "../lib/anim";
import { C } from "../theme";

/* ───────── 1. 후킹 ───────── */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const drive = prog(frame, 6, 34, EASE);
  return (
    <Stage gap={34}>
      <Kicker start={0}>다낭 렌트카 예약 전 필독</Kicker>
      <Lines
        start={2}
        size={128}
        lines={[
          "7인승인데",
          <>
            왜{" "}
            <Marker start={22}>
              <Hl>4명</Hl>
            </Marker>
            만
          </>,
          "권할까?",
        ]}
      />
      <div style={{ position: "relative", height: 430, marginTop: 10 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => {
            const dropped = i >= 4;
            const fade = dropped ? dimAfter(frame, 66 + (i - 4) * 4, 0.22) : 1;
            return (
              <div
                key={i}
                style={{
                  ...popIn(frame, 30 + i * 4),
                  opacity: prog(frame, 30 + i * 4, 6) * fade,
                  scale: popIn(frame, 30 + i * 4).scale * (dropped ? 1 : pulse(frame, 72, 14, 0.12)),
                }}
              >
                <Person size={84} color={dropped && frame > 66 ? C.muted : C.cyan} />
              </div>
            );
          })}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            translate: `${lerp(-1200, -340, drive)}px 0px`,
          }}
        >
          <Mpv7 width={680} spin={drive * 900} />
        </div>
      </div>
    </Stage>
  );
};

/* ───────── 2. 기사 포함 차량 소개 ───────── */
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const cells: { name: string; art: React.ReactNode }[] = [
    { name: "7인승", art: <Mpv7 width={340} /> },
    { name: "16인승", art: <Van16 width={360} /> },
    { name: "리무진", art: <Limo width={360} /> },
    { name: "29인승", art: <Bus29 width={400} /> },
  ];
  return (
    <Stage gap={34}>
      <Kicker start={0}>먼저 알아둘 점</Kicker>
      <Lines
        start={2}
        size={100}
        lines={[
          "다낭 렌트카는",
          <>
            <Marker start={20}>
              <Hl>기사님이 운전</Hl>
            </Marker>
            하는
          </>,
          "단독 차량이에요",
        ]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", rowGap: 30, marginTop: 20 }}>
        {cells.map((c, i) => (
          <div
            key={c.name}
            style={{
              width: 450,
              height: 250,
              borderRadius: 32,
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(148,163,184,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 22,
              gap: 10,
              ...popIn(frame, 30 + i * 7, 16),
            }}
          >
            {c.art}
            <div style={{ color: C.white, fontSize: 42, fontWeight: 900, letterSpacing: "-0.03em" }}>{c.name}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ───────── 3. 7인승 ───────── */
const SEATS_7: SeatDef[] = [
  { x: 78, y: 200, w: 100, h: 100, keys: [[0, "driver"]] },
  { x: 282, y: 200, w: 100, h: 100, keys: [[0, "off"], [26, "on"]] },
  { x: 68, y: 380, w: 100, h: 100, keys: [[0, "off"], [32, "on"]] },
  { x: 180, y: 380, w: 100, h: 100, keys: [[0, "off"], [37, "on"]] },
  { x: 292, y: 380, w: 100, h: 100, keys: [[0, "off"], [42, "on"]] },
  { x: 112, y: 570, w: 100, h: 100, keys: [[124, "tight"], [236, "hidden"]] },
  { x: 248, y: 570, w: 100, h: 100, keys: [[128, "tight"], [236, "hidden"]] },
];

const Seven: React.FC = () => {
  const frame = useCurrentFrame();
  const trunkLabel = 1 - prog(frame, 118, 8) + prog(frame, 236, 10) - prog(frame, 246, 8);
  return (
    <VehicleLayout
      num="01"
      name="7인승"
      tag="토요타 이노바급"
      art={<Mpv7 width={380} spin={prog(frame, 4, 22) * 400} />}
      map={
        <SeatMap
          viewW={460}
          viewH={820}
          height={820}
          body={{ x: 40, y: 20, w: 380, h: 780, r: 96 }}
          seats={SEATS_7}
        >
          <rect
            x={70}
            y={540}
            width={320}
            height={232}
            rx={26}
            fill="rgba(251,191,36,0.05)"
            stroke="rgba(148,163,184,0.45)"
            strokeWidth={3}
            strokeDasharray="12 10"
          />
          <text
            x={230}
            y={668}
            fill={C.muted}
            fontSize={34}
            fontWeight={800}
            textAnchor="middle"
            opacity={Math.max(0, Math.min(1, trunkLabel))}
          >
            트렁크
          </text>
          {[85, 161, 237, 313].map((x, i) => {
            const t = prog(frame, 250 + i * 7, 14, EASE);
            return <SuitcaseShape key={x} x={x} y={lerp(420, 604, t)} w={62} opacity={prog(frame, 250 + i * 7, 6)} />;
          })}
        </SeatMap>
      }
      steps={[
        { at: 20, label: "추천 인원", value: "4명", sub: "기사님 옆 1명 + 뒷줄 3명" },
        {
          at: 118,
          label: "트렁크 좌석을 펴면",
          value: "최대 6명",
          sub: "뒤 2석은 좁아서 아이나 체구가 작은 분께",
          color: C.amber,
        },
        {
          at: 232,
          label: "캐리어가 있다면",
          value: "꼭 4명까지",
          sub: "트렁크 좌석 자리에 4명 캐리어가 쏙",
        },
      ]}
    />
  );
};

/* ───────── 4. 16인승 추천 이유 ───────── */
const Bridge: React.FC = () => {
  const frame = useCurrentFrame();
  const n = countUp(frame, 40, 22, 10);
  return (
    <Stage gap={40}>
      <Lines
        start={0}
        size={116}
        lines={[
          "5명부터는",
          <>
            <Marker start={16}>
              <Hl>16인승</Hl>
            </Marker>{" "}
            추천
          </>,
        ]}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, ...rise(frame, 12, 30) }}>
          <Mpv7 width={330} />
          <div style={{ color: C.muted, fontSize: 40, fontWeight: 800 }}>7인승</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, ...rise(frame, 22, 20) }}>
          <div style={{ color: C.amber, fontSize: 40, fontWeight: 900 }}>+$10</div>
          <Arrow width={110} color={C.amber} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, ...rise(frame, 30, 30) }}>
          <Van16 width={380} />
          <div style={{ color: C.white, fontSize: 40, fontWeight: 900 }}>16인승</div>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          padding: "40px 44px",
          borderRadius: 36,
          background: "rgba(251,191,36,0.08)",
          border: `2px solid rgba(251,191,36,0.4)`,
          ...rise(frame, 36, 40),
        }}
      >
        <div style={{ color: C.text, fontSize: 40, fontWeight: 700 }}>7인승과 요금 차이는 약</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <span
            style={{
              color: C.amber,
              fontSize: 170,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              display: "inline-block",
              scale: pulse(frame, 62, 14, 0.08),
            }}
          >
            ${n}
          </span>
          <span style={{ color: C.text, fontSize: 40, fontWeight: 700 }}>(13,000~15,000원)</span>
        </div>
        <div style={{ color: C.muted, fontSize: 34, fontWeight: 600, marginTop: 6, ...rise(frame, 76, 20) }}>
          5명이면 1인당 3,000원 정도 차이예요
        </div>
      </div>
    </Stage>
  );
};

/* ───────── 5. 16인승 ───────── */
const front = (x: number, at: number, state: "ok" | "tight"): SeatDef => ({
  x,
  y: 175,
  w: 84,
  h: 84,
  keys: [
    [0, "off"],
    [at, state],
  ],
});

const SEATS_16: SeatDef[] = [
  { x: 70, y: 175, w: 84, h: 84, keys: [[0, "driver"]] },
  front(232, 108, "ok"),
  front(324, 112, "ok"),
  ...[320, 445, 570].flatMap((y, r) =>
    [62, 154, 320].map(
      (x, c): SeatDef => ({ x, y, w: 84, h: 84, keys: [[0, "off"], [24 + (r * 3 + c) * 3, "on"]] }),
    ),
  ),
  ...[53, 143, 233, 323].map(
    (x, i): SeatDef => ({ x, y: 700, w: 84, h: 84, keys: [[0, "off"], [192 + i * 4, "tight"]] }),
  ),
];

const LuggageRow: React.FC<{ start: number; count: number; y: number; x0: number; w: number; gap: number }> = ({
  start,
  count,
  y,
  x0,
  w,
  gap,
}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => {
        const t = prog(frame, start + i * 5, 14, EASE);
        return (
          <SuitcaseShape
            key={i}
            x={x0 + i * (w + gap)}
            y={lerp(y - 160, y, t)}
            w={w}
            opacity={prog(frame, start + i * 5, 6)}
          />
        );
      })}
    </g>
  );
};

const LuggageZone: React.FC<{ label: string; labelFade: number }> = ({ label, labelFade }) => (
  <g>
    <rect
      x={62}
      y={815}
      width={336}
      height={140}
      rx={24}
      fill="rgba(148,163,184,0.05)"
      stroke="rgba(148,163,184,0.45)"
      strokeWidth={3}
      strokeDasharray="12 10"
    />
    <text x={230} y={898} fill={C.muted} fontSize={32} fontWeight={800} textAnchor="middle" opacity={labelFade}>
      {label}
    </text>
  </g>
);

const Sixteen: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <VehicleLayout
      num="02"
      name="16인승"
      tag="기사 제외 최대 15명"
      art={<Van16 width={390} spin={prog(frame, 4, 22) * 400} />}
      map={
        <SeatMap
          viewW={460}
          viewH={1000}
          height={820}
          body={{ x: 40, y: 20, w: 380, h: 960, r: 84 }}
          seats={SEATS_16}
        >
          <LuggageZone label="짐칸" labelFade={1 - prog(frame, 268, 8)} />
          <LuggageRow start={272} count={7} y={852} x0={69} w={40} gap={7} />
        </SeatMap>
      }
      valueSize={78}
      steps={[
        { at: 20, label: "여유 있게", value: "9명까지", sub: "16인승 추천 인원" },
        { at: 104, label: "조금 좁아도 괜찮다면", value: "11명까지", color: C.cyanSoft },
        { at: 188, label: "최대 탑승", value: "15명", sub: "탈 수는 있지만 꽤 좁아요", color: C.amber },
        { at: 268, label: "캐리어 (24인치 기준)", value: "7~8개", sub: "앞좌석이 비면 더 실을 수 있어요", color: C.white },
      ]}
    />
  );
};

/* ───────── 6. 리무진 ───────── */
const SEATS_LIMO: SeatDef[] = [
  { x: 70, y: 175, w: 84, h: 84, keys: [[0, "driver"]] },
  front(232, 104, "tight"),
  front(324, 108, "tight"),
  ...[
    [66, 315],
    [276, 315],
    [66, 490],
    [276, 490],
  ].map(([x, y], i): SeatDef => ({ x, y, w: 118, h: 124, keys: [[0, "off"], [24 + i * 4, "on"]] })),
  ...[64, 178, 292].map((x, i): SeatDef => ({ x, y: 670, w: 104, h: 110, keys: [[0, "off"], [40 + i * 4, "on"]] })),
];

const Limousine: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <VehicleLayout
      num="03"
      name="리무진"
      tag="16인승 차체 · 넓은 리무진 시트"
      art={<Limo width={390} spin={prog(frame, 4, 22) * 400} />}
      map={
        <SeatMap
          viewW={460}
          viewH={1000}
          height={820}
          body={{ x: 40, y: 20, w: 380, h: 960, r: 84 }}
          seats={SEATS_LIMO}
          accent="rgba(233,196,106,0.7)"
        >
          <LuggageZone label="트렁크" labelFade={1 - prog(frame, 176, 8)} />
          <LuggageRow start={180} count={7} y={852} x0={69} w={40} gap={7} />
        </SeatMap>
      }
      steps={[
        { at: 20, label: "가장 편안하게", value: "7명", sub: "뒤쪽 리무진 시트 7석" },
        { at: 100, label: "최대", value: "9명", sub: "8명부터는 기사님 옆자리에 앉아요", color: C.amber },
        { at: 176, label: "캐리어 (24인치 기준)", value: "약 7개", color: C.white },
      ]}
    />
  );
};

/* ───────── 7. 29인승 ───────── */
const Bus: React.FC = () => {
  const frame = useCurrentFrame();
  const drive = prog(frame, 4, 36, EASE);
  return (
    <Stage gap={36}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 18, ...rise(frame, 0, 30, 12) }}>
        <span style={{ color: C.cyan, fontSize: 40, fontWeight: 900 }}>04</span>
        <span style={{ color: C.white, fontSize: 104, fontWeight: 900, letterSpacing: "-0.045em" }}>29인승</span>
        <span style={{ color: C.muted, fontSize: 32, fontWeight: 700, marginLeft: 6 }}>소형 버스</span>
      </div>
      <div style={{ height: 380, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "visible" }}>
        <div style={{ translate: `${lerp(1100, 0, drive)}px 0px` }}>
          <Bus29 width={930} spin={-drive * 900} />
        </div>
      </div>
      <Lines
        start={22}
        size={112}
        lines={[
          <>
            <Marker start={38}>
              <Hl>12명 이상</Hl>
            </Marker>
            이라면
          </>,
          "29인승 한 대로",
        ]}
      />
      <Sub start={34} size={42}>
        대가족·단체 여행팀이 주로 이용해요
      </Sub>
    </Stage>
  );
};

/* ───────── 8. 한눈에 정리 ───────── */
const SUMMARY: { who: string; car: string; note: string }[] = [
  { who: "1~4명", car: "7인승", note: "캐리어가 있으면 4명까지" },
  { who: "5~11명", car: "16인승", note: "9명까지가 가장 여유로워요" },
  { who: "7명", car: "리무진", note: "넓고 편안하게 · 최대 9명" },
  { who: "12명+", car: "29인승", note: "단체 여행에 딱" },
];

const Summary: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Lines start={0} size={92} lines={["인원별 차량", <Hl key="h">한눈에 정리</Hl>]} />
      <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 16 }}>
        {SUMMARY.map((r, i) => (
          <div
            key={r.car}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 26,
              padding: "28px 34px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.05)",
              border: "2px solid rgba(148,163,184,0.2)",
              ...rise(frame, 14 + i * 9, 40, 14),
            }}
          >
            <div style={{ width: 250, color: C.cyan, fontSize: 64, fontWeight: 900, letterSpacing: "-0.04em" }}>
              {r.who}
            </div>
            <Arrow width={64} color={C.dim} />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ color: C.white, fontSize: 58, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                {r.car}
              </div>
              <div style={{ color: C.muted, fontSize: 30, fontWeight: 600 }}>{r.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ───────── 9. 다음 편 ───────── */
const End: React.FC = () => (
  <EndCard
    label="다음 편 · 2/3"
    title={["6시간 vs 12시간,", <Hl key="h">뭐가 이득일까?</Hl>]}
    cta="구독하고 2편 보기"
  />
);

export const EP1_SCENES: SceneSpec[] = [
  { name: "후킹", dur: 120, el: <Hook /> },
  { name: "기사 포함 차량", dur: 135, el: <Intro /> },
  { name: "7인승", dur: 375, el: <Seven /> },
  { name: "16인승 추천", dur: 150, el: <Bridge /> },
  { name: "16인승", dur: 360, el: <Sixteen /> },
  { name: "리무진", dur: 255, el: <Limousine /> },
  { name: "29인승", dur: 150, el: <Bus /> },
  { name: "한눈에 정리", dur: 160, el: <Summary /> },
  { name: "다음 편", dur: 110, el: <End /> },
];

export const EP1_DURATION = totalFrames(EP1_SCENES);

const EP1_ACCENTS: Accent[] = [
  [0, 22, "pop"],
  [2, 26, "pop"],
  [2, 124, "pop"],
  [2, 250, "pop"],
  [3, 62, "ding"],
  [4, 24, "pop"],
  [4, 108, "pop"],
  [4, 192, "pop"],
  [4, 272, "pop"],
  [5, 24, "pop"],
  [5, 104, "pop"],
  [5, 180, "pop"],
  [6, 38, "pop"],
  [8, 52, "pop"],
];

export const Ep1: React.FC = () => <Episode ep={1} scenes={EP1_SCENES} accents={EP1_ACCENTS} />;
