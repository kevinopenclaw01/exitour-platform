import React from "react";
import { useCurrentFrame } from "remotion";
import { prog, rise } from "../lib/anim";
import { C, FONT } from "../theme";

export const Kicker: React.FC<{
  children: React.ReactNode;
  start?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, start = 0, color = C.cyan, style }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 26px",
        borderRadius: 999,
        border: `2px solid ${color}`,
        background: `${color}1F`,
        color,
        fontFamily: FONT,
        fontSize: 32,
        fontWeight: 800,
        letterSpacing: "-0.01em",
        ...rise(frame, start, 24, 12),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** 줄 단위로 차례차례 올라오는 큰 제목 */
export const Lines: React.FC<{
  lines: React.ReactNode[];
  size?: number;
  start?: number;
  stagger?: number;
  color?: string;
  weight?: number;
  lineHeight?: number;
  align?: "left" | "center";
  style?: React.CSSProperties;
}> = ({
  lines,
  size = 104,
  start = 0,
  stagger = 4,
  color = C.white,
  weight = 900,
  lineHeight = 1.18,
  align = "left",
  style,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        letterSpacing: "-0.035em",
        textAlign: align,
        wordBreak: "keep-all",
        ...style,
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={rise(frame, start + i * stagger, size * 0.5, 14)}>
          {line}
        </div>
      ))}
    </div>
  );
};

export const Hl: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.cyan,
}) => <span style={{ color }}>{children}</span>;

/** 형광펜이 왼쪽에서 오른쪽으로 칠해지는 강조 */
export const Marker: React.FC<{
  children: React.ReactNode;
  start: number;
  color?: string;
  dur?: number;
}> = ({ children, start, color = "rgba(34,211,238,0.38)", dur = 14 }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, start, dur);
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${t * 100}% 40%`,
        backgroundPosition: "0 88%",
        padding: "0 6px",
        margin: "0 -6px",
      }}
    >
      {children}
    </span>
  );
};

export const Sub: React.FC<{
  children: React.ReactNode;
  start?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, start = 0, size = 40, color = C.muted, style }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 600,
        color,
        lineHeight: 1.4,
        letterSpacing: "-0.02em",
        wordBreak: "keep-all",
        ...rise(frame, start, 24, 14),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
