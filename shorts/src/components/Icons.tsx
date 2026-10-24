import React from "react";
import { C } from "../theme";

export const Suitcase: React.FC<{
  w?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ w = 64, color = C.cyan, style }) => (
  <svg width={w} height={w * 1.6} viewBox="0 0 64 102" style={style}>
    <path
      d="M24 14 V6 Q24 2 28 2 H36 Q40 2 40 6 V14"
      stroke={C.text}
      strokeWidth={4}
      fill="none"
    />
    <rect x={4} y={14} width={56} height={76} rx={10} fill={color} stroke="rgba(0,0,0,0.18)" strokeWidth={2} />
    {[18, 32, 46].map((x) => (
      <rect key={x} x={x - 1.5} y={22} width={3} height={60} rx={1.5} fill="rgba(0,0,0,0.18)" />
    ))}
    <circle cx={16} cy={96} r={5} fill={C.text} />
    <circle cx={48} cy={96} r={5} fill={C.text} />
  </svg>
);

/** SVG 안에 바로 그리는 캐리어 (x, y는 좌상단, 높이는 w * 1.6) */
export const SuitcaseShape: React.FC<{
  x: number;
  y: number;
  w: number;
  color?: string;
  opacity?: number;
}> = ({ x, y, w, color = C.cyan, opacity = 1 }) => {
  const k = w / 64;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} opacity={opacity}>
      <path d="M24 14 V6 Q24 2 28 2 H36 Q40 2 40 6 V14" stroke={C.text} strokeWidth={4} fill="none" />
      <rect x={4} y={14} width={56} height={76} rx={10} fill={color} stroke="rgba(0,0,0,0.18)" strokeWidth={2} />
      {[18, 32, 46].map((cx) => (
        <rect key={cx} x={cx - 1.5} y={22} width={3} height={60} rx={1.5} fill="rgba(0,0,0,0.18)" />
      ))}
      <circle cx={16} cy={96} r={5} fill={C.text} />
      <circle cx={48} cy={96} r={5} fill={C.text} />
    </g>
  );
};

export const Person: React.FC<{
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ size = 60, color = C.cyan, style }) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 48 60" style={style}>
    <circle cx={24} cy={14} r={11} fill={color} />
    <path d="M4 58 V46 Q4 30 24 30 Q44 30 44 46 V58 Z" fill={color} />
  </svg>
);

export const Steering: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = C.text,
}) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <circle cx={24} cy={24} r={19} stroke={color} strokeWidth={5} fill="none" />
    <circle cx={24} cy={24} r={5} fill={color} />
    <path d="M6 22 H19 M29 22 H42 M24 29 V42" stroke={color} strokeWidth={5} strokeLinecap="round" />
  </svg>
);

export const Check: React.FC<{ size?: number; color?: string; bg?: string }> = ({
  size = 56,
  color = C.bg,
  bg = C.green,
}) => (
  <svg width={size} height={size} viewBox="0 0 56 56">
    <circle cx={28} cy={28} r={28} fill={bg} />
    <path d="M16 29 L25 38 L41 19" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Cross: React.FC<{ size?: number; color?: string; bg?: string }> = ({
  size = 56,
  color = C.white,
  bg = C.coral,
}) => (
  <svg width={size} height={size} viewBox="0 0 56 56">
    <circle cx={28} cy={28} r={28} fill={bg} />
    <path d="M19 19 L37 37 M37 19 L19 37" stroke={color} strokeWidth={6} strokeLinecap="round" />
  </svg>
);

export const Clock: React.FC<{
  size?: number;
  hours: number;
  minuteTurns?: number;
  color?: string;
}> = ({ size = 200, hours, minuteTurns = 0, color = C.cyan }) => {
  const hourAngle = (hours / 12) * 360;
  const minuteAngle = minuteTurns * 360;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <circle cx={100} cy={100} r={92} fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth={8} />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const r1 = i % 3 === 0 ? 70 : 76;
        return (
          <line
            key={i}
            x1={100 + Math.sin(a) * r1}
            y1={100 - Math.cos(a) * r1}
            x2={100 + Math.sin(a) * 84}
            y2={100 - Math.cos(a) * 84}
            stroke={C.muted}
            strokeWidth={i % 3 === 0 ? 6 : 3}
            strokeLinecap="round"
          />
        );
      })}
      <line
        x1={100}
        y1={100}
        x2={100}
        y2={52}
        stroke={C.white}
        strokeWidth={9}
        strokeLinecap="round"
        transform={`rotate(${hourAngle} 100 100)`}
      />
      <line
        x1={100}
        y1={100}
        x2={100}
        y2={34}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        transform={`rotate(${minuteAngle} 100 100)`}
      />
      <circle cx={100} cy={100} r={9} fill={C.white} />
    </svg>
  );
};

export const Pin: React.FC<{ size?: number; color?: string }> = ({
  size = 48,
  color = C.amber,
}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 40 52">
    <path
      d="M20 50 C20 50 4 31 4 19 A16 16 0 0 1 36 19 C36 31 20 50 20 50 Z"
      fill={color}
    />
    <circle cx={20} cy={19} r={6.5} fill={C.bg} />
  </svg>
);

export const Arrow: React.FC<{ width?: number; color?: string; dir?: "right" | "down" }> = ({
  width = 80,
  color = C.muted,
  dir = "right",
}) => (
  <svg
    width={width}
    height={width * 0.5}
    viewBox="0 0 80 40"
    style={{ rotate: dir === "down" ? "90deg" : "0deg" }}
  >
    <path d="M4 20 H68 M52 6 L70 20 L52 34" stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CarGlyph: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = C.cyan }) => (
  <svg width={size} height={size * 0.62} viewBox="0 0 120 74">
    <path
      d="M8 52 V40 Q8 33 15 31 L30 27 L44 10 Q47 6 53 6 H86 Q93 6 97 12 L108 30 Q114 33 114 40 V52 Q114 56 110 56 H10 Q8 56 8 52 Z"
      fill={color}
    />
    <path d="M48 26 L56 14 H72 V26 Z M78 26 V14 H88 L96 26 Z" fill="rgba(5,11,26,0.55)" />
    <circle cx={32} cy={56} r={12} fill={C.bg} />
    <circle cx={32} cy={56} r={6} fill={color} />
    <circle cx={90} cy={56} r={12} fill={C.bg} />
    <circle cx={90} cy={56} r={6} fill={color} />
  </svg>
);

export const Building: React.FC<{ size?: number; color?: string }> = ({ size = 120, color = C.text }) => (
  <svg width={size} height={size} viewBox="0 0 120 120">
    <rect x={22} y={14} width={76} height={98} rx={8} fill={color} />
    {[0, 1, 2, 3].map((r) =>
      [0, 1, 2].map((c) => (
        <rect key={`${r}-${c}`} x={34 + c * 20} y={26 + r * 18} width={12} height={10} rx={2} fill={C.bg} opacity={0.75} />
      )),
    )}
    <rect x={50} y={92} width={20} height={20} rx={3} fill={C.bg} />
    <rect x={8} y={108} width={104} height={6} rx={3} fill={color} />
  </svg>
);

export const Gauge: React.FC<{ size?: number; color?: string }> = ({ size = 96, color = C.cyan }) => (
  <svg width={size} height={size} viewBox="0 0 96 96">
    <path d="M14 66 A36 36 0 1 1 82 66" stroke={color} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M48 58 L68 32" stroke={C.white} strokeWidth={7} strokeLinecap="round" />
    <circle cx={48} cy={58} r={8} fill={C.white} />
    <rect x={30} y={72} width={36} height={14} rx={4} fill={color} />
  </svg>
);
