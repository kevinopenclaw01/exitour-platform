import React from "react";
import { useCurrentFrame } from "remotion";
import { EndCard } from "../components/EndCard";
import { Accent, Episode, SceneSpec, totalFrames } from "../components/Episode";
import { Check, Clock } from "../components/Icons";
import { Stage, StepList } from "../components/Layout";
import { Hl, Kicker, Lines, Marker, Sub } from "../components/Text";
import { Timeline } from "../components/Timeline";
import { countUp, EASE, lerp, popIn, prog, pulse, rise } from "../lib/anim";
import { C } from "../theme";

/* ───────── 1. 후킹 ───────── */
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const spin = prog(frame, 6, 40, EASE);
  return (
    <Stage gap={40}>
      <Kicker start={0}>렌트 시간, 뭘 골라야 할까?</Kicker>
      <Lines start={2} size={132} lines={["6시간", <Hl key="h">vs 12시간</Hl>]} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, marginTop: 10 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, ...popIn(frame, 14) }}>
          <Clock size={300} hours={lerp(0, 6, spin)} minuteTurns={spin * 6} color={C.muted} />
          <div style={{ color: C.muted, fontSize: 48, fontWeight: 900 }}>6시간</div>
        </div>
        <div style={{ color: C.white, fontSize: 60, fontWeight: 900, ...popIn(frame, 26) }}>VS</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, ...popIn(frame, 20) }}>
          <Clock size={300} hours={lerp(0, 12, spin)} minuteTurns={spin * 12} color={C.cyan} />
          <div style={{ color: C.cyan, fontSize: 48, fontWeight: 900 }}>12시간</div>
        </div>
      </div>
      <Lines
        start={44}
        size={84}
        lines={[
          <>
            요금 차이는 단{" "}
            <Marker start={58} color="rgba(251,191,36,0.4)">
              <Hl color={C.amber}>$10</Hl>
            </Marker>
          </>,
        ]}
        align="center"
        style={{ marginTop: 16 }}
      />
    </Stage>
  );
};

/* ───────── 2. 기본 요금 구조 ───────── */
const PlanCard: React.FC<{ hours: string; h: number; note: string; color: string; start: number }> = ({
  hours,
  h,
  note,
  color,
  start,
}) => {
  const frame = useCurrentFrame();
  const spin = prog(frame, start + 6, 30);
  return (
    <div
      style={{
        width: 360,
        padding: "40px 0 40px",
        borderRadius: 36,
        background: `${color}14`,
        border: `3px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        ...popIn(frame, start, 16),
      }}
    >
      <Clock size={150} hours={lerp(0, h, spin)} minuteTurns={spin * h} color={color} />
      <div style={{ color, fontSize: 96, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.1, marginTop: 10 }}>
        {hours}
      </div>
      <div style={{ color: C.muted, fontSize: 32, fontWeight: 700 }}>{note}</div>
    </div>
  );
};

const Rules: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={44}>
      <Lines start={0} size={104} lines={["렌트 시간은", <Hl key="h">딱 2가지</Hl>]} />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <PlanCard hours="6시간" h={6} note="짧은 일정" color={C.muted} start={14} />
        <PlanCard hours="12시간" h={12} note="하루 종일" color={C.cyan} start={22} />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            translate: "-50% -50%",
            padding: "16px 22px",
            borderRadius: 999,
            background: C.amber,
            color: C.bg,
            fontSize: 38,
            fontWeight: 900,
            whiteSpace: "nowrap",
            ...popIn(frame, 46, 14),
          }}
        >
          +약 $10
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px 44px",
          borderRadius: 36,
          background: "rgba(251,191,36,0.08)",
          border: "2px solid rgba(251,191,36,0.4)",
          ...rise(frame, 96, 40),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ color: C.text, fontSize: 44, fontWeight: 800 }}>이용 시간을 넘기면</div>
          <div style={{ color: C.muted, fontSize: 32, fontWeight: 600 }}>초과 요금이 붙어요</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: C.muted, fontSize: 32, fontWeight: 700 }}>시간당</div>
          <div
            style={{
              color: C.amber,
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "inline-block",
              scale: pulse(frame, 116, 14, 0.1),
            }}
          >
            $7
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* ───────── 3. 22시 운영 종료 ───────── */
const Closing: React.FC = () => (
  <Stage gap={56}>
    <Lines
      start={0}
      size={104}
      lines={[
        "운영은",
        <>
          <Marker start={14} color="rgba(251,191,36,0.4)">
            <Hl color={C.amber}>밤 10시</Hl>
          </Marker>
          까지
        </>,
      ]}
    />
    <Timeline
      start={10}
      closeAt={22}
      segments={[
        { from: 11, to: 22, start: 64, dur: 40, color: C.cyan, label: "실제 이용 11시간", startLabel: "11시 출발" },
      ]}
    />
    <StepList
      width={936}
      valueSize={96}
      gap={44}
      steps={[
        { at: 56, label: "12시간 신청 + 오전 11시 출발이면", value: "22시에 종료", sub: "12시간을 다 못 채워도 22시에 마감해요" },
        { at: 170, label: "22시 넘어서 더 이용하면", value: "시간당 $7", sub: "야간 요금이 따로 붙어요", color: C.amber },
      ]}
    />
  </Stage>
);

/* ───────── 4. 계산 예시 ───────── */
const Example: React.FC = () => {
  const frame = useCurrentFrame();
  const total = countUp(frame, 186, 24, 14);
  return (
    <Stage gap={38}>
      <Kicker start={0} color={C.amber}>
        이럴 땐 얼마?
      </Kicker>
      <Lines
        start={2}
        size={88}
        lines={[
          "12시간 신청하고",
          <>
            <Hl>오전 10시</Hl> → <Hl color={C.amber}>밤 11시</Hl>
          </>,
        ]}
      />
      <Timeline
        start={8}
        closeAt={0}
        segments={[
          { from: 10, to: 22, start: 30, dur: 44, color: C.cyan, label: "12시간", startLabel: "10시 출발" },
          { from: 22, to: 23, start: 80, dur: 16, color: C.amber, hatch: true },
        ]}
      />
      <div style={{ display: "flex", gap: 24 }}>
        {[
          { t: "12시간 초과 1시간", at: 100 },
          { t: "22시 이후 야간 1시간", at: 128 },
        ].map((c) => (
          <div
            key={c.t}
            style={{
              flex: 1,
              padding: "28px 30px",
              borderRadius: 30,
              background: "rgba(251,191,36,0.08)",
              border: "2px solid rgba(251,191,36,0.45)",
              ...popIn(frame, c.at, 14),
            }}
          >
            <div style={{ color: C.text, fontSize: 34, fontWeight: 800, wordBreak: "keep-all" }}>{c.t}</div>
            <div style={{ color: C.amber, fontSize: 84, fontWeight: 900, lineHeight: 1.05 }}>+$7</div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 44px",
          borderRadius: 36,
          background: C.amber,
          ...rise(frame, 176, 30),
        }}
      >
        <div style={{ color: C.bg, fontSize: 48, fontWeight: 900 }}>추가 요금 합계</div>
        <div
          style={{
            color: C.bg,
            fontSize: 112,
            fontWeight: 900,
            letterSpacing: "-0.05em",
            lineHeight: 1,
            display: "inline-block",
            scale: pulse(frame, 212, 14, 0.1),
          }}
        >
          ${total}
        </div>
      </div>
    </Stage>
  );
};

/* ───────── 5. 결론: 애매하면 12시간 ───────── */
const Bar: React.FC<{
  label: string;
  note: string;
  value: number;
  color: string;
  start: number;
  px: number;
}> = ({ label, note, value, color, start, px }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, start, 26);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 230 }}>
      <div
        style={{
          width: 170,
          height: value * px * t,
          borderRadius: "24px 24px 8px 8px",
          background: color,
          display: "flex",
          justifyContent: "center",
          paddingTop: 14,
          overflow: "hidden",
        }}
      >
        <span style={{ color: C.bg, fontSize: 56, fontWeight: 900, opacity: prog(frame, start + 16, 10) }}>+${value}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <div style={{ color: C.text, fontSize: 36, fontWeight: 800, whiteSpace: "nowrap" }}>{label}</div>
        <div style={{ color, fontSize: 28, fontWeight: 800, whiteSpace: "nowrap", opacity: prog(frame, start + 24, 10) }}>
          {note}
        </div>
      </div>
    </div>
  );
};

const Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const px = 24;
  const line = prog(frame, 20, 18);
  return (
    <Stage gap={30}>
      <Lines start={0} size={92} lines={["6시간 신청 후", "시간을 넘기면?"]} />
      <div
        style={{
          position: "relative",
          height: 500,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: 40,
          paddingRight: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 94 + 10 * px,
            borderTop: `5px dashed ${C.cyan}`,
            opacity: line,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 14,
              color: C.cyan,
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.25,
            }}
          >
            처음부터 12시간
            <br />
            <span style={{ fontSize: 64 }}>+$10</span>
          </div>
        </div>
        <Bar label="1시간 초과" note="아직은 6시간 OK" value={7} color={C.muted} start={40} px={px} />
        <Bar label="2시간 초과" note="12시간보다 손해" value={14} color={C.coral} start={74} px={px} />
      </div>
      <div
        style={{
          padding: "36px 40px",
          borderRadius: 36,
          background: "rgba(34,211,238,0.10)",
          border: `3px solid ${C.cyan}`,
          display: "flex",
          alignItems: "center",
          gap: 30,
          ...rise(frame, 128, 40),
        }}
      >
        <div style={popIn(frame, 140, 14)}>
          <Check size={96} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ color: C.text, fontSize: 38, fontWeight: 700, wordBreak: "keep-all", lineHeight: 1.3 }}>
            6시간 안에 확실히 끝나는 게 아니라면
          </div>
          <div style={{ color: C.cyan, fontSize: 88, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            12시간이 이득
          </div>
        </div>
      </div>
      <Sub start={176} size={34}>
        * 6시간·12시간 요금 차이는 차량별로 약 $10 수준이에요
      </Sub>
    </Stage>
  );
};

/* ───────── 6. 다음 편 ───────── */
const End: React.FC = () => (
  <EndCard
    label="다음 편 · 3/3"
    title={["12시간 빌리면", <Hl key="h">어디든 갈 수 있을까?</Hl>]}
    cta="구독하고 3편 보기"
    titleSize={96}
  />
);

export const EP2_SCENES: SceneSpec[] = [
  { name: "후킹", dur: 120, el: <Hook /> },
  { name: "6시간과 12시간", dur: 255, el: <Rules /> },
  { name: "22시 운영 종료", dur: 300, el: <Closing /> },
  { name: "계산 예시", dur: 300, el: <Example /> },
  { name: "결론", dur: 300, el: <Verdict /> },
  { name: "다음 편", dur: 120, el: <End /> },
];

export const EP2_DURATION = totalFrames(EP2_SCENES);

const EP2_ACCENTS: Accent[] = [
  [0, 58, "ding"],
  [1, 46, "pop"],
  [1, 116, "pop"],
  [2, 64, "pop"],
  [2, 170, "pop"],
  [3, 100, "pop"],
  [3, 128, "pop"],
  [3, 212, "ding"],
  [4, 74, "pop"],
  [4, 140, "ding"],
  [5, 52, "pop"],
];

export const Ep2: React.FC = () => <Episode ep={2} scenes={EP2_SCENES} accents={EP2_ACCENTS} />;
