import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { lerp, prog } from "../lib/anim";
import { C, FONT } from "../theme";

export type SeatState = "hidden" | "off" | "on" | "ok" | "tight" | "driver";

export type SeatDef = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** [로컬 프레임, 상태] — 프레임 순서대로 */
  keys: [number, SeatState][];
};

const LOOK: Record<SeatState, { fill: string; stroke: string; opacity: number }> = {
  hidden: { fill: "rgba(148,163,184,0.10)", stroke: "rgba(148,163,184,0.35)", opacity: 0 },
  off: { fill: "rgba(148,163,184,0.10)", stroke: "rgba(148,163,184,0.38)", opacity: 1 },
  on: { fill: C.cyan, stroke: C.cyanSoft, opacity: 1 },
  ok: { fill: "rgba(34,211,238,0.30)", stroke: C.cyan, opacity: 1 },
  tight: { fill: C.amber, stroke: "#FDE68A", opacity: 1 },
  driver: { fill: "#1E293B", stroke: "#64748B", opacity: 1 },
};

const ACTIVE: SeatState[] = ["on", "ok", "tight"];

const Seat: React.FC<{ seat: SeatDef; frame: number }> = ({ seat, frame }) => {
  let idx = -1;
  seat.keys.forEach(([at], i) => {
    if (at <= frame) idx = i;
  });
  const cur: SeatState = idx >= 0 ? seat.keys[idx][1] : "hidden";
  const prev: SeatState = idx > 0 ? seat.keys[idx - 1][1] : "hidden";
  const at = idx >= 0 ? seat.keys[idx][0] : 0;
  const t = idx >= 0 ? prog(frame, at, 9) : 0;

  const fill = interpolateColors(t, [0, 1], [LOOK[prev].fill, LOOK[cur].fill]);
  const stroke = interpolateColors(t, [0, 1], [LOOK[prev].stroke, LOOK[cur].stroke]);
  const opacity = lerp(LOOK[prev].opacity, LOOK[cur].opacity, t);
  const entering = ACTIVE.includes(cur) && prev !== cur;
  const bump = entering ? 1 + Math.sin(Math.PI * Math.min(1, (frame - at) / 10)) * 0.14 : 1;
  const grow = prev === "hidden" ? lerp(0.5, 1, t) : 1;
  const scale = bump * grow;

  const { x, y, w, h } = seat;
  const cx = x + w / 2;
  const cy = y + h / 2;
  const personOpacity =
    (ACTIVE.includes(cur) ? t : 0) + (ACTIVE.includes(prev) ? 1 - t : 0);
  const shown = ACTIVE.includes(cur) ? cur : prev;
  const personColor = shown === "ok" ? C.white : "#04202A";

  return (
    <g
      transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
      opacity={opacity}
      style={{
        filter: cur === "on" ? `drop-shadow(0 0 ${12 * t}px rgba(34,211,238,0.7))` : undefined,
      }}
    >
      <rect x={x} y={y} width={w} height={h} rx={Math.min(w, h) * 0.2} fill={fill} stroke={stroke} strokeWidth={3} />
      <rect
        x={x + 7}
        y={y + h * 0.74}
        width={w - 14}
        height={h * 0.17}
        rx={5}
        fill="rgba(0,0,0,0.22)"
      />
      {cur === "driver" ? (
        <g>
          <circle cx={cx} cy={y + h * 0.36} r={Math.min(w, h) * 0.22} stroke={C.muted} strokeWidth={5} fill="none" />
          <circle cx={cx} cy={y + h * 0.36} r={4} fill={C.muted} />
          <text
            x={cx}
            y={y - 12}
            fill={C.muted}
            fontSize={24}
            fontWeight={800}
            textAnchor="middle"
            style={{ fontFamily: FONT }}
          >
            기사
          </text>
        </g>
      ) : (
        <g opacity={Math.min(1, personOpacity)}>
          <circle cx={cx} cy={y + h * 0.3} r={Math.min(w, h) * 0.13} fill={personColor} />
          <path
            d={`M ${cx - w * 0.24} ${y + h * 0.7} Q ${cx - w * 0.24} ${y + h * 0.46} ${cx} ${y + h * 0.46} Q ${cx + w * 0.24} ${y + h * 0.46} ${cx + w * 0.24} ${y + h * 0.7} Z`}
            fill={personColor}
          />
        </g>
      )}
    </g>
  );
};

/** 위에서 내려다본 차량 실내 배치도 (앞쪽이 위) */
export const SeatMap: React.FC<{
  viewW: number;
  viewH: number;
  height: number;
  body: { x: number; y: number; w: number; h: number; r: number };
  seats: SeatDef[];
  accent?: string;
  children?: React.ReactNode;
}> = ({ viewW, viewH, height, body, seats, accent = "rgba(148,163,184,0.45)", children }) => {
  const frame = useCurrentFrame();
  const { x, y, w, h, r } = body;
  const wheelW = 26;
  const wheelH = h * 0.11;
  return (
    <svg width={(height * viewW) / viewH} height={height} viewBox={`0 0 ${viewW} ${viewH}`}>
      <defs>
        <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0F1B33" />
          <stop offset="0.5" stopColor="#16264A" />
          <stop offset="1" stopColor="#0F1B33" />
        </linearGradient>
      </defs>
      {[y + h * 0.13, y + h * 0.8].map((wy) => (
        <g key={wy}>
          <rect x={x - 12} y={wy} width={wheelW} height={wheelH} rx={9} fill="#020617" />
          <rect x={x + w - wheelW + 12} y={wy} width={wheelW} height={wheelH} rx={9} fill="#020617" />
        </g>
      ))}
      <ellipse cx={x - 14} cy={y + h * 0.1} rx={16} ry={10} fill="#1E293B" />
      <ellipse cx={x + w + 14} cy={y + h * 0.1} rx={16} ry={10} fill="#1E293B" />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="url(#carBody)" stroke={accent} strokeWidth={4} />
      <path
        d={`M ${x + 34} ${y + h * 0.105} Q ${x + w / 2} ${y + h * 0.04} ${x + w - 34} ${y + h * 0.105} L ${x + w - 48} ${y + h * 0.15} Q ${x + w / 2} ${y + h * 0.12} ${x + 48} ${y + h * 0.15} Z`}
        fill="rgba(103,232,249,0.22)"
      />
      <rect x={x + 26} y={y + 10} width={46} height={12} rx={6} fill="#FEF9C3" opacity={0.9} />
      <rect x={x + w - 72} y={y + 10} width={46} height={12} rx={6} fill="#FEF9C3" opacity={0.9} />
      <rect x={x + 30} y={y + h - 22} width={40} height={10} rx={5} fill="#F87171" opacity={0.85} />
      <rect x={x + w - 70} y={y + h - 22} width={40} height={10} rx={5} fill="#F87171" opacity={0.85} />
      {children}
      {seats.map((s, i) => (
        <Seat key={i} seat={s} frame={frame} />
      ))}
    </svg>
  );
};
