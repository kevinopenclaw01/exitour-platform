import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONT } from "./theme";

const weights: [string, string][] = [
  ["500", "Pretendard-Medium.woff2"],
  ["600", "Pretendard-SemiBold.woff2"],
  ["700", "Pretendard-Bold.woff2"],
  ["800", "Pretendard-ExtraBold.woff2"],
  ["900", "Pretendard-Black.woff2"],
];

export const fontsLoaded = Promise.all(
  weights.map(([weight, file]) =>
    loadFont({
      family: FONT,
      url: staticFile(`fonts/${file}`),
      weight,
    }),
  ),
);
