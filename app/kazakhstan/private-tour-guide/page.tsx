import type { Metadata } from "next";
import Link from "next/link";
import { FAQList, InfoBlock } from "@/components/DetailSections";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { kazakhstanFaqs, kazakhstanKakaoMessage, privateTourGuide } from "@/lib/mock/kazakhstanPremium";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: `${privateTourGuide.title} | EXITour`,
    description: privateTourGuide.description,
    alternates: { canonical: "/kazakhstan/private-tour-guide" },
  };
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: privateTourGuide.title,
    description: privateTourGuide.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${siteUrl}/kazakhstan/private-tour-guide`,
  },
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
      { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` },
      { "@type": "ListItem", position: 3, name: "프라이빗 투어 가이드", item: `${siteUrl}/kazakhstan/private-tour-guide` },
    ],
  },
];

export default function KazakhstanPrivateTourGuidePage() {
  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Kazakhstan Private Tour Guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{privateTourGuide.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{privateTourGuide.description}</p>
          <div className="mt-8">
            <Link href="/kazakhstan/almaty/private-package/3n5d-premium" className="inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
              3박 5일 대표 상품 보기
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {privateTourGuide.sections.map((section) => (
            <InfoBlock key={section.title} title={section.title}>
              <p>{section.body}</p>
            </InfoBlock>
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={kazakhstanFaqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
