import React from "react";
import { Composition, Folder } from "remotion";
import "./fonts";
import { Ep1, EP1_DURATION } from "./ep1/Ep1";
import { Ep2, EP2_DURATION } from "./ep2/Ep2";
import { Ep3, EP3_DURATION } from "./ep3/Ep3";
import { FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Danang-Rentcar-Shorts">
      <Composition
        id="Ep1-Vehicles"
        component={Ep1}
        durationInFrames={EP1_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Ep2-Hours"
        component={Ep2}
        durationInFrames={EP2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Ep3-Routes"
        component={Ep3}
        durationInFrames={EP3_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </Folder>
  );
};
