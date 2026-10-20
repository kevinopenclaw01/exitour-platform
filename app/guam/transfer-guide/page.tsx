import type { Metadata } from "next";
import Link from "next/link";
import { FAQList } from "@/components/DetailSections";
import { GuamTransferGuideSection } from "@/components/guam-transfer/GuamTransferGuideSection";
import { guamTransferFaqs, guamTransferGuide, guamTransferProduct } from "@/lib/mock/guamTransfer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${guamTransferProduct.guidePath}`;

export function generateMetadata(): Metadata {
  return {
    title: `${guamTransferGuide.title} | EXITour`,
    description: guamTransferGuide.description,
    alternates: {
      canonical: guamTransferProduct.guidePath,
    },
  };
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: guamTransferGuide.title,
  description: guamTransferGuide.description,
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
  mainEntity: guamTransferFaqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "괌 공항 이동 가이드", item: canonicalUrl },
  ],
};

export default function GuamTransferGuidePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h1 className="mt-4 max-w-4xl text-4xl display text-slate-950 sm:text-5xl">
            {guamTransferGuide.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{guamTransferGuide.description}</p>
          <div className="mt-8">
            <Link href={guamTransferProduct.canonicalPath} className="inline-flex rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal-hover">
              괌 공항 픽업/드랍 상품 보기
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          {guamTransferGuide.sections.map((section) => (
            <GuamTransferGuideSection key={section.title} title={section.title} body={section.body} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={guamTransferFaqs} />
          <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm sm:p-8">
            <h2 className="mt-3 text-2xl display sm:text-3xl">괌 공항 이동을 편도 또는 왕복으로 상담하세요</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              항공편명, 호텔명, 탑승 인원, 캐리어 수를 기준으로 공항 픽업/드랍 가능 여부를 확인할 수 있습니다.
            </p>
            <Link href={guamTransferProduct.canonicalPath} className="mt-6 inline-flex rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal-hover">
              괌 공항 픽업/드랍 보기
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}
