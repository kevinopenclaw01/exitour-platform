import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function withPricingBuild(run) {
  const buildDir = mkdtempSync(join(tmpdir(), "exitour-pricing-checks-"));
  try {
    const compilation = spawnSync(process.execPath, [
      "node_modules/typescript/bin/tsc", "lib/pricing/types.ts", "lib/pricing/calculate.ts", "lib/pricing/approval.ts",
      "--target", "ES2020", "--module", "commonjs", "--moduleResolution", "node", "--strict",
      "--lib", "es2022,dom", "--skipLibCheck", "--outDir", buildDir,
    ], { cwd: projectRoot, stdio: "inherit" });
    if (compilation.status !== 0) return compilation.status ?? 1;
    return run(buildDir);
  } finally {
    const child = relative(resolve(tmpdir()), resolve(buildDir));
    if (!isAbsolute(child) && !child.startsWith("..") && child.startsWith("exitour-pricing-checks-")) {
      rmSync(buildDir, { recursive: true, force: true });
    }
  }
}
