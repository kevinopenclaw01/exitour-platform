import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { projectRoot, withPricingBuild } from "./pricing-build.mjs";

const require = createRequire(import.meta.url);
const inputArgument = process.argv.indexOf("--input");
if (inputArgument !== -1 && !process.argv[inputArgument + 1]) {
  console.error("--input JSON 파일 경로가 필요합니다.");
  process.exitCode = 1;
} else {
  try {
    const path = inputArgument === -1 ? join(projectRoot, "docs/examples/pricing-input.json") : resolve(process.argv[inputArgument + 1]);
    const input = JSON.parse(readFileSync(path, "utf8"));
    process.exitCode = withPricingBuild((buildDir) => {
      const { createPriceProposal, getApprovedPublicPrice } = require(join(buildDir, "approval.js"));
      const proposal = createPriceProposal(input, "local-preview");
      console.log(JSON.stringify({
        notice: "내부 계산 미리보기입니다. 기본 입력은 가상 데이터이며, 승인·DB 저장·판매가 변경은 수행하지 않습니다.",
        productId: input.productId, revisionId: input.revisionId, status: proposal.status,
        calculation: proposal.calculation, fingerprint: proposal.fingerprint,
        publicPrice: getApprovedPublicPrice(proposal, input.calculatedAt),
      }, null, 2));
      return 0;
    });
  } catch {
    console.error("요금 입력값 또는 JSON 파일을 확인해 주세요. 입력 원문·환경변수는 출력하지 않습니다.");
    process.exitCode = 1;
  }
}
