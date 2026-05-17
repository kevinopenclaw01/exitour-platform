import type { Metadata } from "next";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import GuamTransferPriceTable from "@/components/guam-transfer/GuamTransferPriceTable";
import { GuamVehicleImageGrid } from "@/components/guam-transfer/GuamTransferGuideSection";
import RentcarQuoteCTA from "@/components/rentcar/RentcarQuoteCTA";
import {
  guamTransferFaqs,
  guamTransferPriceOptions,
  guamTransferProduct,
  guamTransferVehicleImages,
} from "@/lib/mock/guamTransfer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const canonicalUrl = `${siteUrl}${guamTransferProduct.canonicalPath}`;
const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export function generateMetadata(): Metadata {
  return {
    title: `${guamTransferProduct.shortTitle} | EXITour`,
    description: guamTransferProduct.summary,
    alternates: {
      canonical: guamTransferProduct.canonicalPath,
    },
  };
}

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: guamTransferProduct.title,
  description: guamTransferProduct.summary,
  areaServed: "Guam",
  provider: {
    "@type": "TravelAgency",
    name: "EXITour",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "KRW",
    price: guamTransferProduct.priceFromKrw,
    availability: "https://schema.org/InStock",
    url: canonicalUrl,
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
    { "@type": "ListItem", position: 3, name: "괌 공항 픽업/드랍", item: canonicalUrl },
  ],
};

export default function GuamAirportPickupDropoffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black text-cyan-700">
              {guamTransferProduct.region} · {guamTransferProduct.productType}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {guamTransferProduct.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{guamTransferProduct.heroDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {guamTransferProduct.heroBullets.map((item) => (
                <span key={item} className="rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-black text-cyan-800">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md bg-slate-950 px-3 py-1.5 text-sm font-black text-white">
                예약금 {formatKrw(guamTransferProduct.reservationDepositKrw)}원
              </span>
              <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">
                편도 ${guamTransferProduct.priceFromUsd}부터
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                견적 요청하기
              </Link>
              <Link href={guamTransferProduct.guidePath} className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                괌 공항 이동 가이드 보기
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {["공항→호텔", "호텔→공항", "왕복", "카시트 상담"].map((item) => (
                <div key={item} className="rounded-lg bg-white p-4 text-center text-base font-black text-slate-950 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-white p-4">
              <p className="text-xs font-bold text-slate-500">차량 안내</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                Sienna급 대표 차량 또는 동급 차량 예시 기준으로 안내하며, 실제 차량은 현지 배정 상황에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <InfoBlock title="괌 공항 픽업/드랍 요약">
            <p>{guamTransferProduct.summary}</p>
          </InfoBlock>
          <InfoBlock title="이런 분께 추천">
            <BulletList items={guamTransferProduct.recommendedFor} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">왕복/편도 가격표</h2>
          <div className="mt-8">
            <GuamTransferPriceTable options={guamTransferPriceOptions} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="예약금 10,000원 안내">
            <p>
              모든 옵션은 예약금 {formatKrw(guamTransferProduct.reservationDepositKrw)}원 기준으로 상담을 시작합니다.
              현장 요금은 USD 기준이며 최종 차량 가능 여부와 인원 조건 확인 후 안내합니다.
            </p>
          </InfoBlock>
          <InfoBlock title="공항 미팅 방법">
            <NumberedList items={guamTransferProduct.meetingSteps} />
          </InfoBlock>
          <InfoBlock title="호텔 이동/반납 안내">
            <BulletList items={guamTransferProduct.hotelTransferGuide} />
          </InfoBlock>
          <InfoBlock title="차량 안내">
            <BulletList items={guamTransferProduct.vehicleGuide} />
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={guamTransferProduct.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={guamTransferProduct.excludes} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <GuamVehicleImageGrid
            title="왕복/편도 대표 차량 이미지"
            description="실제 이미지 파일이 있으면 표시하고, 없으면 대표 이미지 / 동급 차량 예시 fallback을 보여줍니다."
            vehicles={guamTransferVehicleImages}
          />
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="주의사항">
            <BulletList items={guamTransferProduct.notices} />
          </InfoBlock>
          <InfoBlock title="실제 후기 추가 예정">
            <p>
              고객 이름, 사진, 상세 후기는 임의 생성하지 않았습니다. 실제 운영 후기 확보 후 관리자 검수 과정을 거쳐 노출하는 구조를 권장합니다.
            </p>
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={guamTransferFaqs} />
          <RentcarQuoteCTA
            message={guamTransferProduct.kakaoMessage}
            title="괌 공항 픽업/드랍을 상담해보세요"
            description="이용 구간, 항공편명, 탑승 인원, 호텔명, 캐리어 수, 카시트 필요 여부를 남겨주시면 편도/왕복 조건을 확인해 안내할 수 있습니다."
          />
          <div className="text-center">
            <Link href={guamTransferProduct.guidePath} className="inline-flex rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100">
              괌 공항 이동 가이드 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
