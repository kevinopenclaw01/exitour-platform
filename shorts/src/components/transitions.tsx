import React from "react";
import { AbsoluteFill } from "remotion";
import { linearTiming } from "@remotion/transitions";
import type {
  TransitionPresentation,
  TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { EASE } from "../lib/anim";

type Props = Record<string, never>;

const SoftPush: React.FC<TransitionPresentationComponentProps<Props>> = ({
  children,
  presentationDirection,
  presentationProgress,
}) => {
  const t = EASE(presentationProgress);
  const entering = presentationDirection === "entering";
  return (
    <AbsoluteFill
      style={
        entering
          ? { opacity: t, translate: `0px ${(1 - t) * 70}px` }
          : {
              opacity: 1 - t,
              translate: `0px ${-t * 70}px`,
              filter: `blur(${t * 10}px)`,
            }
      }
    >
      {children}
    </AbsoluteFill>
  );
};

export const softPush = (): TransitionPresentation<Props> => ({
  component: SoftPush,
  props: {},
});

export const TRANSITION_FRAMES = 12;
export const softTiming = linearTiming({ durationInFrames: TRANSITION_FRAMES });
