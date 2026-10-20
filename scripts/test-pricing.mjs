import { spawnSync } from "node:child_process";
import { projectRoot, withPricingBuild } from "./pricing-build.mjs";

process.exitCode = withPricingBuild((buildDir) => {
  const checks = spawnSync(process.execPath, [
    "--test", "lib/pricing/calculate.check.mjs", "lib/pricing/approval.check.mjs", "lib/kazakhstan/priceDisplay.check.mjs",
  ], { cwd: projectRoot, stdio: "inherit", env: { ...process.env, PRICING_BUILD_DIR: buildDir } });
  return checks.status ?? 1;
});
