import React from "react";
import { useCurrentFrame } from "remotion";
import { lerp, prog, rise } from "../lib/anim";
import { C, FONT } from "../theme";

export type Segment = {
  from: number;
  to: number;
  start: number;
  dur?: number;
  color: string;
  hatch?: boolean;
  label?: string;
  labelColor?: string;
  startLabel?: string;
};

const H0 = 8;
const H1 = 24;

/** 08시~24시 하루 타임라인. 22시 운영 종료선과 야간 구간 표시 */
export const Timeline: React.FC<{
  width?: number;
  segments: Segment[];
  closeAt?: number;
  start?: number;
}> = ({ width = 936, segments, closeAt = 0, start = 0 }) => {
  const frame = useCurrentFrame();
  const pad = 34;
  const x = (h: number) => pad + ((h - H0) / (H1 - H0)) * (width - pad * 2);
  const trackY = 96;
  const trackH = 64;
  const close = prog(frame, closeAt, 14);

  return (
    <svg width={width} height={250} style={{ overflow: "visible", ...rise(frame, start, 30, 14) }}>
      <defs>
        <pattern id="hatch" width={16} height={16} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width={16} height={16} fill="rgba(251,191,36,0.10)" />
          <rect width={6} height={16} fill="rgba(251,191,36,0.35)" />
        </pattern>
      </defs>
      <rect x={x(H0)} y={trackY} width={x(H1) - x(H0)} height={trackH} rx={18} fill="rgba(255,255,255,0.06)" stroke="rgba(148,163,184,0.28)" strokeWidth={2} />
      <rect x={x(22)} y={trackY} width={x(24) - x(22)} height={trackH} rx={18} fill="url(#hatch)" opacity={close} />
      {segments.map((s, i) => {
        const t = prog(frame, s.start, s.dur ?? 24);
        const w = (x(s.to) - x(s.from)) * t;
        return (
          <g key={i}>
            <rect
              x={x(s.from)}
              y={trackY + 6}
              width={Math.max(0, w)}
              height={trackH - 12}
              rx={13}
              fill={s.hatch ? "url(#hatch)" : s.color}
              stroke={s.hatch ? s.color : "none"}
              strokeWidth={3}
            />
            {s.label ? (
              <text
                x={x(s.from) + (x(s.to) - x(s.from)) / 2}
                y={trackY + trackH / 2 + 11}
                fill={s.labelColor ?? C.bg}
                fontSize={30}
                fontWeight={900}
                textAnchor="middle"
                opacity={prog(frame, s.start + (s.dur ?? 24) - 6, 8)}
                style={{ fontFamily: FONT }}
              >
                {s.label}
              </text>
            ) : null}
            {s.startLabel ? (
              <text
                x={x(s.from)}
                y={trackY - 18}
                fill={s.color}
                fontSize={30}
                fontWeight={900}
                textAnchor="middle"
                opacity={prog(frame, s.start, 10)}
                style={{ fontFamily: FONT }}
              >
                {s.startLabel}
              </text>
            ) : null}
          </g>
        );
      })}
      <g opacity={close}>
        <line x1={x(22)} y1={lerp(trackY + 20, 40, close)} x2={x(22)} y2={trackY + trackH + 22} stroke={C.amber} strokeWidth={5} strokeDasharray="10 8" />
        <text x={x(22)} y={28} fill={C.amber} fontSize={30} fontWeight={900} textAnchor="middle" style={{ fontFamily: FONT }}>
          22시 운영 종료
        </text>
      </g>
      {[8, 10, 12, 14, 16, 18, 20, 22, 24].map((h) => (
        <text
          key={h}
          x={x(h)}
          y={trackY + trackH + 52}
          fill={h === 22 ? C.amber : C.muted}
          fontSize={26}
          fontWeight={700}
          textAnchor="middle"
          style={{ fontFamily: FONT }}
        >
          {h}시
        </text>
      ))}
    </svg>
  );
};
