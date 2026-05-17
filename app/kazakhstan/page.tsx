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
  productTypes,
} from "@/lib/mock/kazakhstanPremium";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "카자흐스탄 프리미엄 프라이빗 여행 | EXITour",
    description: "알마티를 중심으로 설산, 호수, 캐년, 국립공원, 시티투어를 전용차량과 가이드 동행으로 여행하는 고가 프리미엄 프라이빗 자연여행입니다.",
    alternates: { canonical: "/kazakhstan" },
  };
}

const jsonLd = [
  { "@context": "https://schema.org", "@type": "TouristDestination", name: "카자흐스탄 프리미엄 프라이빗 여행", url: `${siteUrl}/kazakhstan` },
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

export default function KazakhstanPage() {
  const featuredProducts = kazakhstanProducts.filter((product) => product.status === "available");

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Kazakhstan Premium Private"
        title="카자흐스탄 프리미엄 프라이빗 여행"
        description="일반 저가 패키지나 렌트카 상품이 아니라, 알마티를 중심으로 설산, 호수, 캐년, 국립공원, 시티투어를 전용차량과 가이드 동행으로 여행하는 고가 프리미엄 자연여행입니다."
        imagePath="/images/kazakhstan/almaty-hero.jpg"
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
          <KazakhstanGuideNotice />
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
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
