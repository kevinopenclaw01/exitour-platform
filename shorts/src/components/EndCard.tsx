import React from "react";
import { useCurrentFrame } from "remotion";
import { prog, pulse, rise } from "../lib/anim";
import { C } from "../theme";
import { LogoMark } from "./Header";
import { Stage } from "./Layout";
import { Kicker, Lines } from "./Text";

export const EndCard: React.FC<{
  label: string;
  title: React.ReactNode[];
  cta: string;
  titleSize?: number;
}> = ({ label, title, cta, titleSize = 100 }) => {
  const frame = useCurrentFrame();
  const ctaIn = prog(frame, 30, 14);
  return (
    <Stage gap={44}>
      <Kicker start={0}>{label}</Kicker>
      <Lines lines={title} size={titleSize} start={3} />
      <div
        style={{
          marginTop: 30,
          padding: "44px 40px",
          borderRadius: 40,
          background: "rgba(255,255,255,0.05)",
          border: "2px solid rgba(148,163,184,0.22)",
          display: "flex",
          alignItems: "center",
          gap: 32,
          ...rise(frame, 16, 40, 16),
        }}
      >
        <LogoMark size={128} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ color: C.white, fontSize: 64, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1 }}>
            EXITour
          </div>
          <div style={{ color: C.text, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
            다낭 렌트카 · 기사 포함 단독 차량
          </div>
          <div style={{ color: C.cyan, fontSize: 28, fontWeight: 800 }}>Since 2015</div>
        </div>
      </div>
      <div
        style={{
          alignSelf: "center",
          marginTop: 10,
          padding: "26px 54px",
          borderRadius: 999,
          background: C.cyan,
          color: C.bg,
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: "-0.02em",
          opacity: ctaIn,
          scale: (0.85 + ctaIn * 0.15) * pulse(frame, 52, 16, 0.06) * pulse(frame, 78, 16, 0.06),
          boxShadow: "0 12px 40px rgba(34,211,238,0.35)",
        }}
      >
        {cta}
      </div>
    </Stage>
  );
};
