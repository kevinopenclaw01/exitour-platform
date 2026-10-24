import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog } from "../lib/anim";
import { C, FONT } from "../theme";

const STEPS = ["몇 명?", "몇 시간?", "어디로?"];

export const LogoMark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: C.white,
      color: C.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: size * 0.42,
      letterSpacing: "-0.04em",
      boxShadow: "0 8px 30px rgba(34,211,238,0.25)",
    }}
  >
    EX
  </div>
);

export const Header: React.FC<{ ep: 1 | 2 | 3 }> = ({ ep }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, 0, 12);

  return (
    <AbsoluteFill style={{ fontFamily: FONT, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 168,
          left: 72,
          right: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: t,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark size={66} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                color: C.white,
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              EXITour
            </div>
            <div style={{ color: C.muted, fontSize: 23, fontWeight: 600 }}>
              다낭 렌트카 완전정복
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {STEPS.map((label, i) => {
            const active = i + 1 === ep;
            return (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontSize: 23,
                  fontWeight: 800,
                  color: active ? C.bg : C.muted,
                  background: active ? C.cyan : "rgba(255,255,255,0.06)",
                  border: `2px solid ${active ? C.cyan : "rgba(148,163,184,0.25)"}`,
                }}
              >
                <span style={{ opacity: active ? 0.75 : 0.6 }}>{i + 1}</span>
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
