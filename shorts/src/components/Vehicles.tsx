import React from "react";
import { C, FONT } from "../theme";

type SideProps = { width: number; spin?: number; style?: React.CSSProperties };

const Wheel: React.FC<{ cx: number; cy: number; r: number; spin: number }> = ({
  cx,
  cy,
  r,
  spin,
}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#0B1220" />
    <circle cx={cx} cy={cy} r={r * 0.6} fill="#94A3B8" />
    <g transform={`rotate(${spin} ${cx} ${cy})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <rect
          key={a}
          x={cx - 2.5}
          y={cy - r * 0.56}
          width={5}
          height={r * 0.5}
          rx={2}
          fill="#475569"
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.18} fill="#334155" />
  </g>
);

const Shadow: React.FC<{ cx: number; cy: number; rx: number }> = ({ cx, cy, rx }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={9} fill="rgba(0,0,0,0.45)" />
);

/** 7인승 (토요타 이노바급 MPV) */
export const Mpv7: React.FC<SideProps> = ({ width, spin = 0, style }) => (
  <svg width={width} height={width * (190 / 420)} viewBox="0 0 420 190" style={style}>
    <Shadow cx={210} cy={176} rx={196} />
    <path
      d="M22 150 L20 120 Q20 104 36 100 L92 90 Q108 86 118 80 L158 46 Q164 40 174 40 L352 40 Q372 40 380 52 L392 100 L394 140 Q394 150 384 150 L350 150 A32 32 0 0 0 286 150 L130 150 A32 32 0 0 0 66 150 L32 150 Z"
      fill="#E2E8F0"
    />
    <path d="M24 128 L392 128 L394 140 Q394 150 384 150 L350 150 A32 32 0 0 0 286 150 L130 150 A32 32 0 0 0 66 150 L32 150 L22 150 Z" fill="#94A3B8" />
    <path
      d="M128 84 L162 50 Q166 47 172 47 L346 47 Q362 47 368 58 L378 86 Q380 92 372 92 L132 92 Q124 92 128 84 Z"
      fill="#0F172A"
    />
    <path d="M150 88 L176 52 L196 52 L170 88 Z" fill="rgba(103,232,249,0.25)" />
    <rect x={232} y={46} width={8} height={47} fill="#E2E8F0" />
    <rect x={300} y={46} width={8} height={47} fill="#E2E8F0" />
    <path d="M232 94 V126 M300 94 V126" stroke="rgba(15,23,42,0.25)" strokeWidth={2} />
    <rect x={24} y={104} width={26} height={9} rx={4} fill="#FEF9C3" />
    <rect x={386} y={98} width={8} height={22} rx={3} fill="#F87171" />
    <Wheel cx={98} cy={146} r={26} spin={spin} />
    <Wheel cx={318} cy={146} r={26} spin={spin} />
  </svg>
);

const VanBody: React.FC<{
  width: number;
  spin: number;
  body: string;
  lower: string;
  stripe: string;
  glass: string;
  style?: React.CSSProperties;
  badge?: string;
  outline?: string;
}> = ({ width, spin, body, lower, stripe, glass, style, badge, outline }) => {
  const windows = [184, 251.5, 319, 386.5];
  return (
    <svg width={width} height={width * (220 / 480)} viewBox="0 0 480 220" style={style}>
      <Shadow cx={240} cy={204} rx={226} />
      <path
        d="M24 176 L22 140 Q22 124 36 120 L70 112 Q82 108 88 98 L112 44 Q118 32 132 32 L442 32 Q458 32 460 48 L462 166 Q462 176 452 176 L414 176 A34 34 0 0 0 346 176 L144 176 A34 34 0 0 0 76 176 L34 176 Z"
        fill={body}
        stroke={outline ?? "none"}
        strokeWidth={3}
      />
      <path
        d="M23 150 L461 150 L462 166 Q462 176 452 176 L414 176 A34 34 0 0 0 346 176 L144 176 A34 34 0 0 0 76 176 L34 176 L24 176 Z"
        fill={lower}
      />
      <rect x={30} y={124} width={432} height={8} fill={stripe} />
      <path d="M100 98 L122 52 Q126 46 134 46 L172 46 L172 98 Z" fill={glass} />
      {windows.map((x) => (
        <rect key={x} x={x} y={46} width={59.5} height={52} rx={7} fill={glass} />
      ))}
      <path d="M118 92 L140 52 L156 52 L134 92 Z" fill="rgba(103,232,249,0.22)" />
      <path d="M180 44 V170" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
      <path d="M250 44 V170" stroke="rgba(0,0,0,0.18)" strokeWidth={2} />
      <rect x={26} y={124} width={30} height={10} rx={4} fill="#FEF9C3" />
      <rect x={455} y={110} width={7} height={30} rx={3} fill="#F87171" />
      {badge ? (
        <text
          x={245}
          y={166}
          fill={stripe}
          fontSize={18}
          fontWeight={800}
          textAnchor="middle"
          letterSpacing={4}
          style={{ fontFamily: FONT }}
        >
          {badge}
        </text>
      ) : null}
      <Wheel cx={110} cy={172} r={28} spin={spin} />
      <Wheel cx={380} cy={172} r={28} spin={spin} />
    </svg>
  );
};

/** 16인승 승합차 */
export const Van16: React.FC<SideProps> = ({ width, spin = 0, style }) => (
  <VanBody
    width={width}
    spin={spin}
    style={style}
    body="#F1F5F9"
    lower="#CBD5E1"
    stripe={C.cyan}
    glass="#0F172A"
  />
);

/** 리무진 (16인승 차체 개조) */
export const Limo: React.FC<SideProps> = ({ width, spin = 0, style }) => (
  <VanBody
    width={width}
    spin={spin}
    style={style}
    body="#1F2937"
    lower="#111827"
    stripe={C.gold}
    glass="#030712"
    badge="LIMOUSINE"
    outline="rgba(233,196,106,0.45)"
  />
);

/** 29인승 소형 버스 */
export const Bus29: React.FC<SideProps> = ({ width, spin = 0, style }) => {
  const windows = Array.from({ length: 6 }).map((_, i) => 128 + i * (67.3 + 8));
  return (
    <svg width={width} height={width * (230 / 600)} viewBox="0 0 600 230" style={style}>
      <Shadow cx={300} cy={214} rx={286} />
      <path
        d="M24 186 L20 60 Q20 30 50 28 L566 28 Q584 28 584 46 L586 176 Q586 186 576 186 L504 186 A34 34 0 0 0 436 186 L154 186 A34 34 0 0 0 86 186 L34 186 Z"
        fill="#F8FAFC"
      />
      <path
        d="M22 132 Q300 150 585 112 L586 176 Q586 186 576 186 L504 186 A34 34 0 0 0 436 186 L154 186 A34 34 0 0 0 86 186 L34 186 L24 186 Z"
        fill={C.cyanDeep}
      />
      <path d="M22 124 Q300 142 585 104 L585 114 Q300 152 22 134 Z" fill={C.cyan} />
      <path d="M24 64 Q24 40 48 40 L70 40 L70 112 L24 112 Z" fill="#0F172A" />
      <rect x={78} y={42} width={40} height={136} rx={5} fill="#E2E8F0" stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
      <rect x={83} y={48} width={30} height={60} rx={4} fill="#0F172A" />
      {windows.map((x) => (
        <rect key={x} x={x} y={42} width={67.3} height={62} rx={7} fill="#0F172A" />
      ))}
      <path d="M140 98 L166 48 L182 48 L156 98 Z" fill="rgba(103,232,249,0.22)" />
      <rect x={24} y={150} width={28} height={12} rx={4} fill="#FEF9C3" />
      <rect x={579} y={130} width={7} height={34} rx={3} fill="#F87171" />
      <Wheel cx={120} cy={182} r={28} spin={spin} />
      <Wheel cx={470} cy={182} r={28} spin={spin} />
    </svg>
  );
};
