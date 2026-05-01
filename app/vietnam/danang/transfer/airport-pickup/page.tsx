import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import RentcarQuoteCTA from "@/components/rentcar/RentcarQuoteCTA";
import TransferOptionTable from "@/components/transfer/TransferOptionTable";
import {
  danangTransferFaqs,
  danangTransferOptions,
  danangTransferProduct,
} from "@/lib/mock/danangTransfer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${danangTransferProduct.canonicalPath}`;

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export const metadata: Metadata = {
  title: `${danangTransferProduct.title} | EXITour`,
  description: danangTransferProduct.summary,
  alternates: {
    canonical: danangTransferProduct.canonicalPath,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: danangTransferProduct.fullTitle,
  description: danangTransferProduct.summary,
  category: "Airport transfer private car",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: danangTransferProduct.rating,
    reviewCount: danangTransferProduct.reviewCount,
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: danangTransferProduct.priceFromKrw,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: danangTransferFaqs.map((faq) => ({
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
    { "@type": "ListItem", position: 3, name: "다낭", item: `${siteUrl}/destinations/vietnam/danang` },
    { "@type": "ListItem", position: 4, name: "다낭 공항 픽업 샌딩", item: canonicalUrl },
  ],
};

export default function DanangAirportTransferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black text-cyan-700">
              {danangTransferProduct.region} · {danangTransferProduct.productType}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {danangTransferProduct.fullTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{danangTransferProduct.heroDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {danangTransferProduct.heroBullets.map((item) => (
                <span key={item} className="rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-black text-cyan-800">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-black text-white">
                {formatKrw(danangTransferProduct.priceFromKrw)}원부터
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">
                평점 {danangTransferProduct.rating.toFixed(2)} · 리뷰 {danangTransferProduct.reviewCount}
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                견적 요청하기
              </Link>
              <Link href={danangTransferProduct.guidePath} className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                공항 픽업 샌딩 가이드 보기
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <Image src="/globe.svg" alt="다낭 공항 픽업 샌딩 안내" width={72} height={72} />
              <p className="text-right text-sm font-bold leading-6 text-slate-600">
                스타카페 미팅
                <br />
                픽업 · 드랍 · 항공편 지연 대응
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["공항 → 다낭", "공항 → 호이안", "다낭 → 공항", "호이안 → 공항"].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 text-center text-base font-black text-slate-950 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-white p-4">
              <p className="text-xs font-bold text-slate-500">이용 방법</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                공항 도착 → 짐 수령 → 스타카페 기사 미팅 → 호텔 이동
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <InfoBlock title="상품 요약">
            <p>{danangTransferProduct.summary}</p>
          </InfoBlock>
          <InfoBlock title="이런 분께 추천">
            <BulletList items={danangTransferProduct.recommendedFor} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">구간 + 차량 옵션</h2>
          <div className="mt-8">
            <TransferOptionTable options={danangTransferOptions} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="구간 안내">
            <div className="space-y-4">
              {danangTransferProduct.routeGuide.map((route) => (
                <div key={route.title}>
                  <h3 className="font-black text-slate-950">{route.title}</h3>
                  <p className="mt-1">{route.body}</p>
                </div>
              ))}
            </div>
          </InfoBlock>
          <InfoBlock title="이용 방법">
            <NumberedList items={danangTransferProduct.usageSteps} />
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={danangTransferProduct.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={danangTransferProduct.excludes} />
          </InfoBlock>
          <InfoBlock title="취소 규정">
            <BulletList items={danangTransferProduct.cancellationPolicy} />
          </InfoBlock>
          <InfoBlock title="후기/신뢰도">
            <p>평점 {danangTransferProduct.rating.toFixed(2)} · 리뷰 {danangTransferProduct.reviewCount}</p>
            <p className="mt-2 text-xs text-slate-500">실제 후기 상세 콘텐츠는 추가 예정입니다. 고객 이름/사진은 임의 생성하지 않았습니다.</p>
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={danangTransferFaqs} />
          <RentcarQuoteCTA message={danangTransferProduct.kakaoMessage} />
        </div>
      </section>
    </>
  );
}
