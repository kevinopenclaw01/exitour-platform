import { guidePolicy, pricingPolicy } from "@/lib/mock/kazakhstanPremium";

export default function KazakhstanGuideNotice() {
  return (
    <section className="rounded-lg border border-cyan-200 bg-cyan-50 p-5">
      <h2 className="text-xl font-black text-slate-950">가이드 언어와 4인 기준 요금 안내</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
        <p>{guidePolicy}</p>
        <p>{pricingPolicy}</p>
      </div>
    </section>
  );
}
