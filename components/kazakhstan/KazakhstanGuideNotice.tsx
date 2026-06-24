import { guidePolicy, pricingPolicy } from "@/lib/mock/kazakhstanPremium";

type KazakhstanGuideNoticeProps = {
  title?: string;
  paragraphs?: string[];
};

export default function KazakhstanGuideNotice({
  title = "한국어 가이드와 요금 안내",
  paragraphs = [guidePolicy, pricingPolicy],
}: KazakhstanGuideNoticeProps) {
  return (
    <section className="rounded-lg border border-cyan-200 bg-cyan-50 p-5">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
