import type { Metadata } from "next";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock } from "@/components/DetailSections";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanProductCard from "@/components/kazakhstan/KazakhstanProductCard";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  kazakhstanDestinations,
  kazakhstanFaqs,
  kazakhstanKakaoMessage,
  kazakhstanProducts,
  kazakhstanQuotePrefills,
  productTypes,
} from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "카자흐스탄 알마티 | 단독·조인 프리미엄 투어 | EXITour",
    description:
      "설산, 호수, 캐년, 국립공원까지 알마티의 자연을 전용차량과 전담 가이드로 깊이 있게 경험하는 프리미엄 투어입니다. 단독투어와 소수 정예 조인투어 중 선택할 수 있습니다.",
    alternates: { canonical: "/kazakhstan" },
  };
}

const jsonLd = [
  { "@context": "https://schema.org", "@type": "TouristDestination", name: "카자흐스탄 알마티 | 단독·조인 프리미엄 투어", url: `${siteUrl}/kazakhstan` },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: kazakhstanProducts.filter((product) => product.status === "available").map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.title, url: `${siteUrl}${product.canonicalPath}` })),
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
    ],
  },
];

const kazakhstanMainGuideNotice = [
  "모든 일정은 한국어 가이드가 동행합니다.",
  "단독투어는 4인 이상부터 진행 가능합니다. 기본적으로 정해진 동선과 일정에 따라 진행되며, 원하시는 일정이 있으실 경우 상담 후 맞춤 구성도 가능합니다.",
  "조인투어는 1인부터 참여 가능합니다.",
  "카자흐스탄 프리미엄 패키지 요금은 인원, 일정, 호텔 등급, 차량 조건에 따라 달라집니다. 정확한 요금은 희망 일정과 인원 확인 후 안내드립니다.",
];

export default function KazakhstanPage() {
  const featuredProducts = kazakhstanProducts.filter((product) => product.status === "available" && product.productType !== "join-tour");

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Kazakhstan Almaty"
        title="카자흐스탄 알마티 | 단독·조인 프리미엄 투어"
        description="설산, 호수, 캐년, 국립공원까지 — 알마티의 자연을 전용차량과 전담 가이드로 깊이 있게 경험하는 프리미엄 투어입니다. 내 일정에 맞춘 단독투어(자유 패키지·데이투어)와 소수 정예 조인투어 중 선택하실 수 있으며, 개인 일정과 취향에 따라 상담 후 맞춤 구성도 가능합니다."
        imagePath="/images/kazakhstan/kazakhstan-main-hero.png"
        meta={["전용차량", "가이드 동행", "식사 포함", "호텔 선택형", "렌트카 제외"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          {productTypes.map((type) => (
            <Link key={type.id} href={type.path} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300">
              <p className="text-sm font-black text-cyan-700">Travel Style</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{type.label}</h2>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="왜 가이드 동행이 필요한가요?">
            <BulletList items={["장거리 이동이 많습니다.", "일부 자연 지역은 비포장 도로가 포함됩니다.", "외곽 지역은 인터넷이 불안정할 수 있습니다.", "언어 문제와 현지 소통 때문에 일정 변경 대응이 중요합니다."]} />
          </InfoBlock>
          <KazakhstanGuideNotice title="가이드 언어와 요금 안내" paragraphs={kazakhstanMainGuideNotice} />
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Main destinations</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kazakhstanDestinations.map((destination) => (
              <InfoBlock key={destination.id} title={destination.title}>
                <p>{destination.description}</p>
              </InfoBlock>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">대표 상품</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {featuredProducts.map((product) => (
              <KazakhstanProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={kazakhstanFaqs} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/kazakhstan/premium-packages" className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-white">카자흐스탄 프리미엄 허브</Link>
            <Link href="/premium-package-guide" className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-white">프리미엄 패키지 가이드</Link>
          </div>
          <PremiumCTA message={kazakhstanKakaoMessage} href={buildQuoteUrl(kazakhstanQuotePrefills.kazakhstanHub)} />
        </div>
      </section>
    </>
  );
}
