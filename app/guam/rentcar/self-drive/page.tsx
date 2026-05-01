import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import GuamProviderComparison from "@/components/guam-rentcar/GuamProviderComparison";
import GuamRentcarProviderATable from "@/components/guam-rentcar/GuamRentcarProviderATable";
import GuamRentcarProviderBTable from "@/components/guam-rentcar/GuamRentcarProviderBTable";
import GuamRentcarRuleSection from "@/components/guam-rentcar/GuamRentcarRuleSection";
import RentcarQuoteCTA from "@/components/rentcar/RentcarQuoteCTA";
import {
  guamProviderARates,
  guamProviderBRates,
  guamRentcarExchangeRatePolicy,
  guamRentcarFaqs,
  guamRentcarPickupReturnRules,
  guamRentcarProduct,
  guamRentcarProviders,
  guamRentcarRules,
} from "@/lib/mock/guamRentcar";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${guamRentcarProduct.canonicalPath}`;
const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export function generateMetadata(): Metadata {
  return {
    title: `${guamRentcarProduct.shortTitle} | EXITour`,
    description: guamRentcarProduct.summary,
    alternates: {
      canonical: guamRentcarProduct.canonicalPath,
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: guamRentcarProduct.title,
  description: guamRentcarProduct.summary,
  areaServed: "Guam",
  provider: {
    "@type": "TravelAgency",
    name: "EXITour",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: guamRentcarProduct.priceFromKrw,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
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
    { "@type": "ListItem", position: 3, name: "괌 렌트카", item: canonicalUrl },
  ],
};

export default function GuamRentcarSelfDrivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black text-cyan-700">
              {guamRentcarProduct.region} · {guamRentcarProduct.productType}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {guamRentcarProduct.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{guamRentcarProduct.heroDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {guamRentcarProduct.heroBullets.map((item) => (
                <span key={item} className="rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-black text-cyan-800">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-black text-white">
                예약금 {formatKrw(guamRentcarProduct.priceFromKrw)}원부터
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">
                {guamRentcarExchangeRatePolicy.basis} mock {formatKrw(guamRentcarExchangeRatePolicy.rateKrw)}원
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                견적 요청하기
              </Link>
              <Link href={guamRentcarProduct.guidePath} className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                괌 렌트카 가이드 보기
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <Image src="/globe.svg" alt="괌 렌트카 업체 비교 안내" width={72} height={72} />
              <p className="text-right text-sm font-bold leading-6 text-slate-600">
                공항인수 · 호텔반납
                <br />
                카시트 · 보험 조건 비교
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {guamRentcarProviders.map((provider) => (
                <div key={provider.id} className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-xs font-bold text-cyan-700">{provider.name}</p>
                  <p className="mt-2 text-lg font-black text-slate-950">{provider.paymentModel}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-white p-4">
              <p className="text-xs font-bold text-slate-500">가격 표시 기준</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{guamRentcarExchangeRatePolicy.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <InfoBlock title="상품 요약">
            <p>{guamRentcarProduct.summary}</p>
          </InfoBlock>
          <InfoBlock title="이런 분께 추천">
            <BulletList items={guamRentcarProduct.recommendedFor} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">렌트A / 렌트B 선택 비교</h2>
          <div className="mt-8">
            <GuamProviderComparison providers={guamRentcarProviders} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">렌트A 예약금 + 현장결제 요금표</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            렌트A는 예약금만 원화로 먼저 결제하고, 렌트 당일 현장에서 VISA, JCB, MASTER, AMEX, DISCOVER 카드로 잔액을 결제합니다.
          </p>
          <div className="mt-8">
            <GuamRentcarProviderATable rates={guamProviderARates} />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">렌트B 전액 사전결제 요금표</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            렌트B는 daily USD에 mock 환율을 적용하고 서비스 기준금액을 더한 전액 사전결제 구조입니다. 보험과 공항 옵션은 선택 조건에 따라 더해집니다.
          </p>
          <div className="mt-8">
            <GuamRentcarProviderBTable rates={guamProviderBRates} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <GuamRentcarRuleSection title="인수/반납 조건" groups={guamRentcarPickupReturnRules} />
          <GuamRentcarRuleSection title="보험/디파짓/면허 및 포함사항" groups={guamRentcarRules} />
          <InfoBlock title="예약 신청서 안내">
            <NumberedList items={guamRentcarProduct.applicationFields} />
          </InfoBlock>
          <InfoBlock title="SUV 무료 업그레이드 안내">
            <BulletList items={guamRentcarProduct.suvUpgradeNotice} />
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={guamRentcarProduct.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={guamRentcarProduct.excludes} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={guamRentcarFaqs} />
          <section className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <p className="text-sm font-bold text-cyan-700">후기/신뢰도</p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950">실제 후기 추가 예정</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              고객 이름, 사진, 상세 후기는 임의 생성하지 않았습니다. 실제 운영 후기 확보 후 관리자 검수 과정을 거쳐 노출하는 구조를 권장합니다.
            </p>
          </section>
          <RentcarQuoteCTA
            message={guamRentcarProduct.kakaoMessage}
            title="괌 렌트카 업체와 차종을 상담해보세요"
            description="희망 업체, 차종, 인수/반납 장소, 항공편명, 카시트와 아이스쿨러 필요 여부를 남겨주시면 렌트A/B 조건을 비교해 안내할 수 있습니다."
          />
          <div className="text-center">
            <Link href={guamRentcarProduct.guidePath} className="inline-flex rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100">
              괌 렌트카 이용 가이드 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
