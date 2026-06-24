import type { Metadata } from "next";
import Link from "next/link";
import { FAQList, InfoBlock } from "@/components/DetailSections";
import AltynEmelComparisonImage from "@/components/kazakhstan/AltynEmelComparisonImage";
import {
  altynEmelFaqs,
  altynEmelGuide,
  altynEmelJoinPrefill,
  altynEmelPrivatePrefill,
} from "@/lib/mock/kazakhstanAltynEmel";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "알틴에멜 국립공원 여행 가이드｜노래하는 사구·악타우 산맥 알마티 출발 투어",
    description: "알틴에멜 국립공원의 노래하는 사구, 악타우 산맥, 알마티 출발 투어 방법, 프라이빗 투어와 조인 투어 차이, 준비물과 주의사항을 안내합니다.",
    alternates: { canonical: "/kazakhstan/altyn-emel-guide" },
  };
}

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: altynEmelGuide.title,
    description: altynEmelGuide.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${siteUrl}/kazakhstan/altyn-emel-guide`,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: altynEmelFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` },
      { "@type": "ListItem", position: 3, name: "알틴에멜 여행 가이드", item: `${siteUrl}/kazakhstan/altyn-emel-guide` },
    ],
  },
];

export default function AltynEmelGuidePage() {
  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Altyn-Emel Travel Guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{altynEmelGuide.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{altynEmelGuide.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kazakhstan/almaty/day-tour/altyn-emel-singing-dune-aktau" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
              알틴에멜 프라이빗 투어 보기
            </Link>
            <Link href={buildQuoteUrl(altynEmelJoinPrefill)} className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
              알틴에멜 조인 투어 문의하기
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {altynEmelGuide.sections.map((section) => (
            <InfoBlock key={section.title} title={section.title}>
              <p>{section.body}</p>
            </InfoBlock>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
          <AltynEmelComparisonImage />
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={altynEmelFaqs} />
          <div className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
            <p className="text-sm font-bold text-cyan-300">관련 상품 CTA</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">알틴에멜 여행 형태를 비교해 상담하세요</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              단독 일정과 여유 있는 동선이 필요하면 프라이빗 투어, 출발 가능 날짜에 맞춰 합리적으로 참여하려면 조인 투어를 확인하세요.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href={buildQuoteUrl(altynEmelPrivatePrefill)} className="rounded-md bg-cyan-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300">
                프라이빗 투어 상담
              </Link>
              <Link href={buildQuoteUrl(altynEmelJoinPrefill)} className="rounded-md border border-white/30 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/10">
                조인 투어 상담
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
