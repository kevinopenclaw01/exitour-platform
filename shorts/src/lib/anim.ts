import type React from "react";
import { Easing, interpolate } from "remotion";

export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IO = Easing.bezier(0.65, 0, 0.35, 1);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** start 프레임부터 dur 프레임 동안 0 → 1 */
export const prog = (frame: number, start: number, dur = 16, easing = EASE) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...CLAMP, easing });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 아래에서 올라오며 나타나기 */
export const rise = (
  frame: number,
  start: number,
  dist = 48,
  dur = 16,
): React.CSSProperties => {
  const t = prog(frame, start, dur);
  return { opacity: t, translate: `0px ${(1 - t) * dist}px` };
};

/** 살짝 튀어나오는 등장 (0.6 → 1.06 → 1) */
export const popIn = (frame: number, start: number, dur = 14) => {
  const t = prog(frame, start, dur, Easing.out(Easing.back(2.2)));
  return {
    opacity: prog(frame, start, Math.max(4, dur / 2)),
    scale: lerp(0.6, 1, t),
  };
};

/** 강조 펄스: start 시점에 한 번 커졌다 돌아오기 */
export const pulse = (frame: number, start: number, dur = 12, amount = 0.08) => {
  const t = interpolate(frame, [start, start + dur], [0, 1], CLAMP);
  return 1 + Math.sin(Math.PI * t) * amount;
};

export const countUp = (
  frame: number,
  start: number,
  dur: number,
  to: number,
  from = 0,
) => Math.round(lerp(from, to, prog(frame, start, dur)));

/** 이전 단계 강조를 낮추기 위한 불투명도 */
export const dimAfter = (frame: number, at: number, to = 0.38) =>
  lerp(1, to, prog(frame, at, 10, EASE_IO));
