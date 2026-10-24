import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

const wavePath = (y: number, amp: number, len: number, phase: number) => {
  let d = `M -40 ${y}`;
  for (let x = -40; x <= 1120; x += 20) {
    d += ` L ${x} ${(y + Math.sin((x / len) * Math.PI * 2 + phase) * amp).toFixed(1)}`;
  }
  return d;
};

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, #071631 48%, ${C.bg} 100%)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          left: -380 + Math.sin(t * 0.35) * 70,
          top: 120 + Math.cos(t * 0.28) * 60,
          background:
            "radial-gradient(circle, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0) 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          borderRadius: "50%",
          left: 360 + Math.cos(t * 0.3) * 80,
          top: 900 + Math.sin(t * 0.25) * 70,
          background:
            "radial-gradient(circle, rgba(14,116,144,0.32) 0%, rgba(14,116,144,0) 65%)",
        }}
      />
      <svg
        width={1080}
        height={1920}
        style={{ position: "absolute", inset: 0, opacity: 0.55 }}
      >
        <defs>
          <pattern
            id="dots"
            width={44}
            height={44}
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(0 ${(-frame * 0.4) % 44})`}
          >
            <circle cx={2} cy={2} r={1.6} fill="rgba(148,163,184,0.28)" />
          </pattern>
          <linearGradient id="dotFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.9" />
            <stop offset="0.55" stopColor="white" stopOpacity="0.25" />
            <stop offset="1" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
          <mask id="dotMask">
            <rect width={1080} height={1920} fill="url(#dotFade)" />
          </mask>
        </defs>
        <rect width={1080} height={1920} fill="url(#dots)" mask="url(#dotMask)" />
      </svg>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={wavePath(1560 + i * 64, 14 + i * 3, 520 + i * 90, t * (0.8 - i * 0.12) + i)}
            stroke={i % 2 === 0 ? "rgba(34,211,238,0.16)" : "rgba(103,232,249,0.08)"}
            strokeWidth={3}
            fill="none"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
