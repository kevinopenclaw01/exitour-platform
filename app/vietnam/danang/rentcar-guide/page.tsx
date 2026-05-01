import type { Metadata } from "next";
import Link from "next/link";
import { FAQList, InfoBlock } from "@/components/DetailSections";
import {
  danangRentcarFaqs,
  danangRentcarGuide,
  danangRentcarProduct,
} from "@/lib/mock/danangRentcar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const guideUrl = `${siteUrl}${danangRentcarProduct.guidePath}`;

export const metadata: Metadata = {
  title: `${danangRentcarGuide.title} | EXITour`,
  description: danangRentcarGuide.description,
  alternates: {
    canonical: danangRentcarProduct.guidePath,
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: danangRentcarGuide.title,
  description: danangRentcarGuide.description,
  mainEntityOfPage: guideUrl,
  author: {
    "@type": "Organization",
    name: "EXITour",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: danangRentcarFaqs.map((faq) => ({
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
    { "@type": "ListItem", position: 2, name: "베트남", item: `${siteUrl}/destinations/vietnam` },
    { "@type": "ListItem", position: 3, name: "다낭 렌트카 이용 가이드", item: guideUrl },
  ],
};

export default function DanangRentcarGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Danang Rentcar Guide</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {danangRentcarGuide.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{danangRentcarGuide.description}</p>
          <Link
            href={danangRentcarProduct.canonicalPath}
            className="mt-8 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            다낭 렌트카 상품 보기
          </Link>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {danangRentcarGuide.sections.map((section) => (
            <InfoBlock key={section.title} title={section.title}>
              <p>{section.body}</p>
            </InfoBlock>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">다낭 렌트카 FAQ</h2>
          <FAQList faqs={danangRentcarFaqs} />
          <div className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-black">가이드 기준으로 내 일정에 맞는 차량을 골라보세요</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              여행일, 탑승 인원, 호텔명, 희망 방문지를 남기면 다낭 렌트카 단독차량 옵션을 상담 기준으로 정리할 수 있습니다.
            </p>
            <Link
              href={danangRentcarProduct.canonicalPath}
              className="mt-6 inline-flex rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
            >
              상품 페이지로 이동
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
