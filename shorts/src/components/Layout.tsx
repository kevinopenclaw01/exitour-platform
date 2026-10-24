import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { dimAfter, prog, rise } from "../lib/anim";
import { C, FONT, SAFE } from "../theme";

/** 쇼츠 UI에 가리지 않는 본문 영역 */
export const Stage: React.FC<{
  children: React.ReactNode;
  gap?: number;
  justify?: React.CSSProperties["justifyContent"];
  style?: React.CSSProperties;
}> = ({ children, gap = 40, justify = "flex-start", style }) => (
  <AbsoluteFill style={{ fontFamily: FONT }}>
    <div
      style={{
        position: "absolute",
        top: SAFE.top,
        left: SAFE.left,
        right: SAFE.right,
        height: SAFE.bottom - SAFE.top,
        display: "flex",
        flexDirection: "column",
        justifyContent: justify,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

export type Step = {
  at: number;
  label: string;
  value: React.ReactNode;
  sub?: string;
  color?: string;
};

/** 단계별로 하나씩 켜지고, 다음 단계가 나오면 이전 단계는 흐려지는 설명 목록 */
export const StepList: React.FC<{
  steps: Step[];
  valueSize?: number;
  gap?: number;
  width?: number;
}> = ({ steps, valueSize = 84, gap = 34, width = 420 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap, width }}>
      {steps.map((s, i) => {
        const next = steps[i + 1];
        const color = s.color ?? C.cyan;
        const dim = next ? dimAfter(frame, next.at) : 1;
        const bar = prog(frame, s.at + 4, 12);
        return (
          <div
            key={i}
            style={{
              position: "relative",
              paddingLeft: 28,
              ...rise(frame, s.at, 40, 14),
              opacity: prog(frame, s.at, 14) * dim,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 6,
                width: 8,
                height: `${bar * 100}%`,
                borderRadius: 4,
                background: color,
              }}
            />
            <div style={{ color: C.text, fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {s.label}
            </div>
            <div
              style={{
                color,
                fontSize: valueSize,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
                marginTop: 2,
              }}
            >
              {s.value}
            </div>
            {s.sub ? (
              <div
                style={{
                  color: C.muted,
                  fontSize: 30,
                  fontWeight: 600,
                  lineHeight: 1.38,
                  marginTop: 8,
                  wordBreak: "keep-all",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.sub}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

/** 차량 소개 장면: 제목 줄 + 좌측 배치도 + 우측 단계 설명 */
export const VehicleLayout: React.FC<{
  num: string;
  name: string;
  tag: string;
  art: React.ReactNode;
  map: React.ReactNode;
  steps: Step[];
  valueSize?: number;
}> = ({ num, name, tag, art, map, steps, valueSize }) => {
  const frame = useCurrentFrame();
  const artIn = prog(frame, 4, 22);
  return (
    <Stage gap={28}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 170 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, ...rise(frame, 0, 30, 12) }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ color: C.cyan, fontSize: 40, fontWeight: 900 }}>{num}</span>
            <span style={{ color: C.white, fontSize: 104, fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1 }}>
              {name}
            </span>
          </div>
          <div style={{ color: C.muted, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{tag}</div>
        </div>
        <div style={{ opacity: artIn, translate: `${(1 - artIn) * 260}px 0px` }}>{art}</div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={rise(frame, 6, 40, 16)}>{map}</div>
        <div style={{ paddingTop: 40 }}>
          <StepList steps={steps} valueSize={valueSize} />
        </div>
      </div>
    </Stage>
  );
};
