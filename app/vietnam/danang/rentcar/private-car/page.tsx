import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import RentcarOptionTable from "@/components/rentcar/RentcarOptionTable";
import RentcarQuoteCTA from "@/components/rentcar/RentcarQuoteCTA";
import RentcarTrustSection from "@/components/rentcar/RentcarTrustSection";
import {
  danangRentcarExtraOptions,
  danangRentcarFaqs,
  danangRentcarPriceOptions,
  danangRentcarProduct,
} from "@/lib/mock/danangRentcar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${danangRentcarProduct.canonicalPath}`;

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export const metadata: Metadata = {
  title: `${danangRentcarProduct.shortTitle} | EXITour`,
  description: danangRentcarProduct.summary,
  alternates: {
    canonical: danangRentcarProduct.canonicalPath,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: danangRentcarProduct.title,
  description: danangRentcarProduct.summary,
  category: "Rentcar private car with driver",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: danangRentcarProduct.rating,
    reviewCount: danangRentcarProduct.reviewCount,
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: danangRentcarProduct.priceFromKrw,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
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
    { "@type": "ListItem", position: 3, name: "다낭", item: `${siteUrl}/destinations/vietnam/danang` },
    { "@type": "ListItem", position: 4, name: "다낭 렌트카 단독차량", item: canonicalUrl },
  ],
};

export default function DanangPrivateCarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black text-cyan-700">{danangRentcarProduct.region} · {danangRentcarProduct.productType}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {danangRentcarProduct.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{danangRentcarProduct.heroDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-black text-white">
                {formatKrw(danangRentcarProduct.priceFromKrw)}원부터
              </span>
              <span className="rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-black text-cyan-800">
                평점 {danangRentcarProduct.rating.toFixed(2)}
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">
                리뷰 {danangRentcarProduct.reviewCount}
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                견적 요청하기
              </Link>
              <Link href={danangRentcarProduct.guidePath} className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                다낭 렌트카 이용 가이드 자세히 보기
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <Image src="/window.svg" alt="다낭 렌트카 차량대절 안내" width={72} height={72} />
              <p className="text-right text-sm font-bold leading-6 text-slate-600">
                다낭 · 호이안 · 바나힐
                <br />
                기사 포함 단독차량
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {["7인승", "16인승", "리무진", "29인승"].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 text-center text-lg font-black text-slate-950 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-white p-4">
              <p className="text-xs font-bold text-slate-500">표준 동선</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">호텔 픽업 → 맛집/쇼핑 → 마사지 → 호이안 또는 바나힐 → 호텔 복귀</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <InfoBlock title="상품 요약">
            <p>{danangRentcarProduct.summary}</p>
          </InfoBlock>
          <InfoBlock title="이런 분께 추천">
            <BulletList items={danangRentcarProduct.recommendedFor} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">가격표</h2>
          <div className="mt-8">
            <RentcarOptionTable options={danangRentcarPriceOptions} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="차량 안내">
            <div className="space-y-4">
              {danangRentcarProduct.vehicleGuide.map((vehicle) => (
                <div key={vehicle.title}>
                  <h3 className="font-black text-slate-950">{vehicle.title}</h3>
                  <p className="mt-1">{vehicle.body}</p>
                </div>
              ))}
            </div>
          </InfoBlock>
          <InfoBlock title="추가 옵션">
            <div className="grid gap-3">
              {danangRentcarExtraOptions.map((option) => (
                <div key={option.id} className="rounded-md bg-slate-50 p-3">
                  <p className="font-black text-slate-950">{option.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{option.description}</p>
                </div>
              ))}
            </div>
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={danangRentcarProduct.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={danangRentcarProduct.excludes} />
          </InfoBlock>
          <InfoBlock title="이용 방법">
            <NumberedList items={danangRentcarProduct.usageSteps} />
          </InfoBlock>
          <InfoBlock title="취소 규정">
            <BulletList items={danangRentcarProduct.cancellationPolicy} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">추천 코스</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {danangRentcarProduct.recommendedCourses.map((course) => (
              <InfoBlock key={course.title} title={course.title}>
                <NumberedList items={course.items} />
              </InfoBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={danangRentcarFaqs} />
          <RentcarTrustSection />
          <RentcarQuoteCTA message={danangRentcarProduct.kakaoMessage} />
        </div>
      </section>
    </>
  );
}
