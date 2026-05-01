import type { Metadata } from "next";
import Link from "next/link";
import { FAQList, InfoBlock } from "@/components/DetailSections";
import { guamRentcarFaqs, guamRentcarGuide, guamRentcarProduct } from "@/lib/mock/guamRentcar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${guamRentcarProduct.guidePath}`;

export function generateMetadata(): Metadata {
  return {
    title: `${guamRentcarGuide.title} | EXITour`,
    description: guamRentcarGuide.description,
    alternates: {
      canonical: guamRentcarProduct.guidePath,
    },
  };
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guamRentcarGuide.title,
  description: guamRentcarGuide.description,
  inLanguage: "ko-KR",
  mainEntityOfPage: canonicalUrl,
  publisher: {
    "@type": "TravelAgency",
    name: "EXITour",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: guamRentcarFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "괌", item: `${siteUrl}/destinations/guam` },
    { "@type": "ListItem", position: 3, name: "괌 렌트카 가이드", item: canonicalUrl },
  ],
};

export default function GuamRentcarGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Guam Rentcar Guide</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {guamRentcarGuide.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{guamRentcarGuide.description}</p>
          <div className="mt-8">
            <Link href={guamRentcarProduct.canonicalPath} className="inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
              괌 렌트카 상품 페이지 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {guamRentcarGuide.sections.map((section) => (
            <InfoBlock key={section.title} title={section.title}>
              <p>{section.body}</p>
            </InfoBlock>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={guamRentcarFaqs} />
          <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <p className="text-sm font-bold text-cyan-300">상품 페이지 CTA</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">렌트A/B 조건을 비교하고 예약 상담을 시작하세요</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              공항 인수, 호텔 반납, 카시트, 보험, 디파짓 조건을 확인한 뒤 가족 일정에 맞는 업체와 차종을 선택할 수 있습니다.
            </p>
            <Link href={guamRentcarProduct.canonicalPath} className="mt-6 inline-flex rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
              괌 렌트카 상품 보기
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
