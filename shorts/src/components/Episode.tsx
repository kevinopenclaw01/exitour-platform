import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { Background } from "./Background";
import { Header } from "./Header";
import { softPush, softTiming, TRANSITION_FRAMES } from "./transitions";

export type SceneSpec = {
  name: string;
  dur: number;
  el: React.ReactNode;
};

export const totalFrames = (scenes: SceneSpec[]) =>
  scenes.reduce((sum, s) => sum + s.dur, 0) - TRANSITION_FRAMES * (scenes.length - 1);

/** 장면 시작 프레임(전환 겹침 반영) — 효과음 배치에 사용 */
export const sceneStarts = (scenes: SceneSpec[]) => {
  const starts: number[] = [];
  let t = 0;
  scenes.forEach((s, i) => {
    starts.push(t);
    t += s.dur - (i < scenes.length - 1 ? TRANSITION_FRAMES : 0);
  });
  return starts;
};

/** 효과음: 몇 번째 장면의 몇 프레임에 어떤 소리를 낼지 */
export type Accent = [scene: number, at: number, sfx: "pop" | "ding" | "thud"];

const VOLUME = { whoosh: 0.7, pop: 0.55, ding: 0.6, thud: 0.7 };

const Sfx: React.FC<{ from: number; name: keyof typeof VOLUME }> = ({ from, name }) => (
  <Sequence from={from} durationInFrames={40} layout="none" name={`효과음 ${name}`}>
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={VOLUME[name]} />
  </Sequence>
);

export const Episode: React.FC<{
  ep: 1 | 2 | 3;
  scenes: SceneSpec[];
  accents?: Accent[];
  children?: React.ReactNode;
}> = ({ ep, scenes, accents = [], children }) => (
  <AbsoluteFill>
    <Background />
    <TransitionSeries>
      {scenes.map((s, i) => (
        <React.Fragment key={s.name}>
          {i > 0 ? (
            <TransitionSeries.Transition presentation={softPush()} timing={softTiming} />
          ) : null}
          <TransitionSeries.Sequence name={s.name} durationInFrames={s.dur}>
            {s.el}
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
    </TransitionSeries>
    <Header ep={ep} />
    {sceneStarts(scenes)
      .slice(1)
      .map((start) => (
        <Sfx key={`w${start}`} from={Math.max(0, start - 3)} name="whoosh" />
      ))}
    {accents.map(([scene, at, name]) => (
      <Sfx key={`${scene}-${at}`} from={sceneStarts(scenes)[scene] + at} name={name} />
    ))}
    {children}
  </AbsoluteFill>
);
