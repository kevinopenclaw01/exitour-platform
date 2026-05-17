import type { Metadata } from "next";
import Link from "next/link";
import { FAQList, InfoBlock } from "@/components/DetailSections";
import { kazakhstanFaqs, premiumPackageGuide } from "@/lib/mock/kazakhstanPremium";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: `${premiumPackageGuide.title} | EXITour`,
    description: premiumPackageGuide.description,
    alternates: { canonical: "/premium-package-guide" },
  };
}

const jsonLd = [
  { "@context": "https://schema.org", "@type": "Article", headline: premiumPackageGuide.title, description: premiumPackageGuide.description, inLanguage: "ko-KR", mainEntityOfPage: `${siteUrl}/premium-package-guide` },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: kazakhstanFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "프리미엄 패키지 가이드", item: `${siteUrl}/premium-package-guide` },
    ],
  },
];

export default function PremiumPackageGuidePage() {
  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Premium Guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {premiumPackageGuide.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{premiumPackageGuide.description}</p>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {premiumPackageGuide.sections.map((section) => (
            <InfoBlock key={section.title} title={section.title}>
              <p>{section.body}</p>
            </InfoBlock>
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={kazakhstanFaqs} />
          <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-bold text-cyan-300">프리미엄 패키지 CTA</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">목적지별 프리미엄 패키지를 비교해보세요</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">카자흐스탄 자연 여행부터 가족 휴양지까지 단독 일정 상담 구조를 확인할 수 있습니다.</p>
            <Link href="/premium-packages" className="mt-6 inline-flex rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
              프리미엄 패키지 허브 보기
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
