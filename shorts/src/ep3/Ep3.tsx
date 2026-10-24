import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { EndCard } from "../components/EndCard";
import { Accent, Episode, SceneSpec, totalFrames } from "../components/Episode";
import { Building, CarGlyph, Cross, Gauge, Steering } from "../components/Icons";
import { Stage } from "../components/Layout";
import { Hl, Kicker, Lines, Marker, Sub } from "../components/Text";
import { countUp, EASE_IO, lerp, popIn, prog, pulse, rise } from "../lib/anim";
import { C, FONT } from "../theme";

/* ───────── 1. 후킹: 흔한 오해 ───────── */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const stamp = popIn(frame, 46, 14);
  return (
    <Stage gap={36}>
      <Kicker start={0} color={C.coral}>
        많이들 오해하는 것
      </Kicker>
      <Lines start={2} size={124} lines={["12시간 빌리면", "12시간 동안", <Hl key="h">어디든 OK?</Hl>]} />
      <div
        style={{
          alignSelf: "center",
          marginTop: 40,
          display: "flex",
          alignItems: "center",
          gap: 26,
          padding: "30px 56px",
          borderRadius: 36,
          border: `6px solid ${C.coral}`,
          background: "rgba(251,113,133,0.12)",
          rotate: "-6deg",
          opacity: stamp.opacity,
          scale: lerp(1.8, 1, prog(frame, 46, 10, Easing.in(Easing.quad))) * (stamp.opacity > 0 ? 1 : 0),
        }}
      >
        <Cross size={92} />
        <div style={{ color: C.coral, fontSize: 112, fontWeight: 900, letterSpacing: "-0.04em" }}>아니에요</div>
      </div>
    </Stage>
  );
};

/* ───────── 2. 기본 구간 ───────── */
const BaseZone: React.FC = () => {
  const frame = useCurrentFrame();
  const pct = countUp(frame, 40, 70, 8);
  return (
    <Stage gap={40}>
      <Lines
        start={0}
        size={100}
        lines={[
          "다낭 렌트카엔",
          <>
            <Marker start={16}>
              <Hl>‘기본 구간’</Hl>
            </Marker>
            이 있어요
          </>,
        ]}
      />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", rowGap: 26, marginTop: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => {
          const at = 40 + i * 7;
          const inside = i < 8;
          const t = prog(frame, at, 10);
          return (
            <div key={i} style={{ width: 172, display: "flex", justifyContent: "center", ...popIn(frame, 30 + i * 3, 12) }}>
              <div style={{ opacity: lerp(0.25, 1, t) }}>
                <CarGlyph size={160} color={t > 0.5 ? (inside ? C.cyan : C.amber) : C.dim} />
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: "36px 44px",
          borderRadius: 36,
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(148,163,184,0.22)",
          ...rise(frame, 60, 40),
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, flexWrap: "wrap" }}>
          <span style={{ color: C.text, fontSize: 52, fontWeight: 800 }}>10팀 중</span>
          <span>
            <span style={{ color: C.cyan, fontSize: 132, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1 }}>
              {pct}팀
            </span>
            <span style={{ color: C.text, fontSize: 52, fontWeight: 800 }}>은</span>
          </span>
        </div>
        <div style={{ color: C.white, fontSize: 52, fontWeight: 800, marginTop: 6 }}>기본 구간 안에서 끝나요</div>
        <div style={{ color: C.muted, fontSize: 34, fontWeight: 600, marginTop: 14, ...rise(frame, 130, 20) }}>
          바나힐만, 또는 호이안만 다녀오는 일정처럼요
        </div>
      </div>
    </Stage>
  );
};

/* ───────── 3. 추가금 지역 ───────── */
const PLACES = [
  { name: "후에", desc: "옛 수도", x: 150, y: 90, at: 40 },
  { name: "인터컨티넨탈", desc: "선짜 반도", x: 780, y: 120, at: 64 },
  { name: "호아푸탄", desc: "래프팅", x: 116, y: 400, at: 88 },
  { name: "미선 유적지", desc: "유적지", x: 236, y: 630, at: 112 },
  { name: "남호이안", desc: "리조트 지역", x: 770, y: 600, at: 136 },
];

const ExtraMap: React.FC = () => {
  const frame = useCurrentFrame();
  const hub = { x: 468, y: 365 };
  const zone = popIn(frame, 14, 18);
  return (
    <Stage gap={30}>
      <Lines
        start={0}
        size={100}
        lines={[
          "이런 곳은",
          <>
            거리{" "}
            <Marker start={16} color="rgba(251,191,36,0.4)">
              <Hl color={C.amber}>추가금</Hl>
            </Marker>
            이 붙어요
          </>,
        ]}
      />
      <svg width={936} height={740} style={{ overflow: "visible", fontFamily: FONT }}>
        <g
          transform={`translate(${hub.x} ${hub.y}) scale(${zone.scale}) translate(${-hub.x} ${-hub.y})`}
          opacity={zone.opacity}
        >
          <circle cx={hub.x} cy={hub.y} r={160} fill="rgba(34,211,238,0.12)" stroke={C.cyan} strokeWidth={4} strokeDasharray="14 10" />
          <text x={hub.x} y={hub.y - 92} fill={C.cyan} fontSize={32} fontWeight={900} textAnchor="middle">
            기본 구간
          </text>
          <circle cx={hub.x} cy={hub.y} r={22} fill={C.cyan} />
          <circle cx={hub.x} cy={hub.y} r={36} fill="none" stroke={C.cyan} strokeWidth={3} opacity={0.5} />
          <text x={hub.x} y={hub.y + 78} fill={C.white} fontSize={40} fontWeight={900} textAnchor="middle">
            다낭 시내
          </text>
        </g>
        {PLACES.map((p) => {
          const dx = p.x - hub.x;
          const dy = p.y - hub.y;
          const len = Math.hypot(dx, dy);
          const sx = hub.x + (dx / len) * 160;
          const sy = hub.y + (dy / len) * 160;
          const t = prog(frame, p.at, 18, EASE_IO);
          const ex = lerp(sx, p.x, t);
          const ey = lerp(sy, p.y, t);
          const pin = popIn(frame, p.at + 14, 14);
          return (
            <g key={p.name}>
              <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={C.amber} strokeWidth={5} strokeDasharray="12 10" opacity={t > 0 ? 1 : 0} />
              <g
                transform={`translate(${p.x} ${p.y}) scale(${pin.scale}) translate(${-p.x} ${-p.y})`}
                opacity={pin.opacity}
              >
                <circle cx={p.x} cy={p.y} r={30} fill="rgba(251,191,36,0.2)" />
                <circle cx={p.x} cy={p.y} r={16} fill={C.amber} />
                <text x={p.x} y={p.y + 66} fill={C.white} fontSize={38} fontWeight={900} textAnchor="middle">
                  {p.name}
                </text>
                <text x={p.x} y={p.y + 102} fill={C.amber} fontSize={28} fontWeight={700} textAnchor="middle">
                  {p.desc}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
      <Sub start={176} size={36} style={{ textAlign: "center" }}>
        외곽 지역은 거리에 따라 추가금이 붙어요
      </Sub>
    </Stage>
  );
};

/* ───────── 4. 잦은 왕복 ───────── */
const LEG = 22;
const LEGS = 6;

const PingPong: React.FC = () => {
  const frame = useCurrentFrame();
  const start = 40;
  const a = 120;
  const b = 816;
  const legT = Math.max(0, Math.min(LEGS, (frame - start) / LEG));
  const leg = Math.min(LEGS - 1, Math.floor(legT));
  const within = EASE_IO(legT - leg);
  const forward = leg % 2 === 0;
  const x = forward ? lerp(a, b, within) : lerp(b, a, within);
  const trips = Math.floor(legT / 2);
  const heat = Math.min(1, trips / 3);
  const roadColor = heat < 0.5 ? C.cyan : C.amber;
  const tag = popIn(frame, start + LEG * LEGS + 4, 14);

  return (
    <Stage gap={40}>
      <Lines
        start={0}
        size={100}
        lines={[
          "자주 왔다 갔다 해도",
          <>
            <Marker start={16} color="rgba(251,191,36,0.4)">
              <Hl color={C.amber}>추가금</Hl>
            </Marker>
            이 생겨요
          </>,
        ]}
      />
      <div style={{ position: "relative", height: 440, marginTop: 20, ...rise(frame, 10, 30) }}>
        <div style={{ position: "absolute", left: 0, top: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Building size={150} color={C.text} />
          <div style={{ color: C.white, fontSize: 40, fontWeight: 900 }}>숙소</div>
        </div>
        <div style={{ position: "absolute", right: 0, top: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Building size={110} color={C.muted} />
            <Building size={150} color={C.text} />
          </div>
          <div style={{ color: C.white, fontSize: 40, fontWeight: 900 }}>다낭 시내</div>
        </div>
        <svg width={936} height={440} style={{ position: "absolute", inset: 0 }}>
          <line x1={40} y1={400} x2={896} y2={400} stroke="rgba(148,163,184,0.25)" strokeWidth={40} strokeLinecap="round" />
          <line x1={40} y1={400} x2={896} y2={400} stroke={roadColor} strokeWidth={6} strokeDasharray="18 14" opacity={0.85} />
        </svg>
        <div style={{ position: "absolute", left: x - 60, top: 330, scale: forward ? "1 1" : "-1 1" }}>
          <CarGlyph size={120} color={C.cyan} />
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            translate: "-50% 0px",
            padding: "14px 30px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: `2px solid ${roadColor}`,
            color: roadColor,
            fontSize: 44,
            fontWeight: 900,
            whiteSpace: "nowrap",
            scale: pulse(frame, start + LEG * 2, 10, 0.1) * pulse(frame, start + LEG * 4, 10, 0.1) * pulse(frame, start + LEG * 6, 10, 0.1),
          }}
        >
          왕복 {trips}회
        </div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 110,
            translate: "-50% 0px",
            padding: "12px 28px",
            borderRadius: 999,
            background: C.amber,
            color: C.bg,
            fontSize: 40,
            fontWeight: 900,
            whiteSpace: "nowrap",
            ...tag,
          }}
        >
          + 추가금
        </div>
      </div>
      <Sub start={60} size={38}>
        여러 팀이 한 차에 타서 일정이 갈리면 왕복이 늘어나요
      </Sub>
    </Stage>
  );
};

/* ───────── 5. 왜 생길까 ───────── */
const ReasonCard: React.FC<{ icon: React.ReactNode; title: string; body: string; start: number; n: string }> = ({
  icon,
  title,
  body,
  start,
  n,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        gap: 32,
        alignItems: "center",
        padding: "40px 40px",
        borderRadius: 36,
        background: "rgba(255,255,255,0.05)",
        border: "2px solid rgba(148,163,184,0.22)",
        ...rise(frame, start, 44),
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          flexShrink: 0,
          borderRadius: 40,
          background: "rgba(34,211,238,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...popIn(frame, start + 8, 14),
        }}
      >
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ color: C.cyan, fontSize: 30, fontWeight: 900 }}>이유 {n}</div>
        <div style={{ color: C.white, fontSize: 54, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.12 }}>{title}</div>
        <div style={{ color: C.muted, fontSize: 32, fontWeight: 600, lineHeight: 1.4, wordBreak: "keep-all" }}>{body}</div>
      </div>
    </div>
  );
};

const Why: React.FC = () => (
  <Stage gap={36}>
    <Lines start={0} size={100} lines={["왜 추가금이", <Hl key="h">생길까요?</Hl>]} />
    <ReasonCard
      n="1"
      start={22}
      icon={<Steering size={96} color={C.cyan} />}
      title="기사님 운전 피로도"
      body="기사님이 직접 운전하는 차량이라 장거리·잦은 이동은 부담이 커요"
    />
    <ReasonCard
      n="2"
      start={96}
      icon={<Gauge size={104} color={C.cyan} />}
      title="주행거리만큼 차량 감가"
      body="그래서 한국 렌터카도 주행거리·지역 제한을 두는 곳이 있어요"
    />
  </Stage>
);

/* ───────── 6. 해결: 예약 때 동선 확인 ───────── */
const FLOW = [
  { t: "가고 싶은 곳·동선 공유", at: 30 },
  { t: "추가금 여부 미리 안내", at: 70 },
  { t: "동선 조정으로 추가금 줄이기", at: 110 },
];

const Plan: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Lines
        start={0}
        size={100}
        lines={[
          "그래서 예약할 때",
          <>
            <Marker start={16}>
              <Hl>동선부터</Hl>
            </Marker>{" "}
            확인해요
          </>,
        ]}
      />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 34, marginTop: 10 }}>
        <div
          style={{
            position: "absolute",
            left: 47,
            top: 50,
            width: 6,
            height: `${prog(frame, 40, 90) * 76}%`,
            borderRadius: 3,
            background: "rgba(34,211,238,0.5)",
          }}
        />
        {FLOW.map((f, i) => (
          <div key={f.t} style={{ display: "flex", alignItems: "center", gap: 30, ...rise(frame, f.at, 30) }}>
            <div
              style={{
                width: 100,
                height: 100,
                flexShrink: 0,
                borderRadius: "50%",
                background: C.cyan,
                color: C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                fontWeight: 900,
                ...popIn(frame, f.at, 14),
              }}
            >
              {i + 1}
            </div>
            <div
              style={{
                flex: 1,
                padding: "30px 34px",
                borderRadius: 30,
                background: "rgba(255,255,255,0.05)",
                border: "2px solid rgba(148,163,184,0.22)",
                color: C.white,
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                wordBreak: "keep-all",
              }}
            >
              {f.t}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 10,
          padding: "30px 40px",
          borderRadius: 32,
          background: "rgba(34,211,238,0.12)",
          border: `3px solid ${C.cyan}`,
          color: C.text,
          fontSize: 40,
          fontWeight: 800,
          lineHeight: 1.4,
          wordBreak: "keep-all",
          ...rise(frame, 160, 30),
        }}
      >
        동선만 미리 알려주시면 <Hl>추가금이 나오는지 출발 전에 모두 안내</Hl>해 드려요
      </div>
    </Stage>
  );
};

/* ───────── 7. PLUS: 한국어 가이드 + 신뢰 ───────── */
const Plus: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={36}>
      <Kicker start={0} color={C.gold}>
        PLUS
      </Kicker>
      <Lines
        start={2}
        size={100}
        lines={[
          "한국어 공식 인증",
          <>
            <Hl>가이드</Hl>도 신청 가능
          </>,
        ]}
      />
      <Sub start={20} size={40}>
        패키지 투어 대신, 렌트카 + 가이드로 나만의 일정을 짜보세요
      </Sub>
      <div style={{ display: "flex", gap: 24, marginTop: 30 }}>
        {[
          { big: "판매 1위", small: "네이버 다낭 렌트카", at: 70 },
          { big: "11년째", small: "2015년부터 다낭에서", at: 84 },
        ].map((b) => (
          <div
            key={b.big}
            style={{
              flex: 1,
              padding: "40px 34px",
              borderRadius: 36,
              background: "rgba(233,196,106,0.10)",
              border: `3px solid ${C.gold}`,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              ...popIn(frame, b.at, 16),
            }}
          >
            <div style={{ color: C.gold, fontSize: 76, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>{b.big}</div>
            <div style={{ color: C.text, fontSize: 34, fontWeight: 800, wordBreak: "keep-all" }}>{b.small}</div>
          </div>
        ))}
      </div>
      <Sub start={110} size={36} color={C.text} style={{ textAlign: "center", marginTop: 10 }}>
        믿고 맡겨주시면 편안한 다낭 여행 만들어 드릴게요
      </Sub>
    </Stage>
  );
};

/* ───────── 8. 마무리 ───────── */
const End: React.FC = () => (
  <EndCard
    label="다낭 렌트카 완전정복 · 완결"
    title={["몇 명? 몇 시간?", "어디로?", <Hl key="h">3가지면 준비 끝</Hl>]}
    cta="궁금한 점은 댓글로!"
    titleSize={96}
  />
);

export const EP3_SCENES: SceneSpec[] = [
  { name: "후킹", dur: 120, el: <Hook /> },
  { name: "기본 구간", dur: 270, el: <BaseZone /> },
  { name: "추가금 지역", dur: 330, el: <ExtraMap /> },
  { name: "잦은 왕복", dur: 240, el: <PingPong /> },
  { name: "추가금 이유", dur: 240, el: <Why /> },
  { name: "사전 동선 상담", dur: 270, el: <Plan /> },
  { name: "가이드와 신뢰", dur: 225, el: <Plus /> },
  { name: "마무리", dur: 120, el: <End /> },
];

export const EP3_DURATION = totalFrames(EP3_SCENES);

const EP3_ACCENTS: Accent[] = [
  [0, 46, "thud"],
  [1, 110, "ding"],
  [2, 54, "pop"],
  [2, 78, "pop"],
  [2, 102, "pop"],
  [2, 126, "pop"],
  [2, 150, "pop"],
  [3, 176, "pop"],
  [4, 30, "pop"],
  [4, 104, "pop"],
  [5, 30, "pop"],
  [5, 70, "pop"],
  [5, 110, "pop"],
  [6, 70, "ding"],
  [7, 52, "pop"],
];

export const Ep3: React.FC = () => <Episode ep={3} scenes={EP3_SCENES} accents={EP3_ACCENTS} />;
