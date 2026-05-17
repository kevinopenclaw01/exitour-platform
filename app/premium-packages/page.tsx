import type { Metadata } from "next";
import Link from "next/link";
import { BulletList, FAQList, InfoBlock } from "@/components/DetailSections";
import PremiumCountryGrid from "@/components/premium/PremiumCountryGrid";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  kazakhstanFaqs,
  kazakhstanKakaoMessage,
  premiumPackageCountries,
} from "@/lib/mock/kazakhstanPremium";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "프리미엄 프라이빗 패키지 허브 | EXITour",
    description: "카자흐스탄 자연 여행을 시작으로 국가별 프리미엄 단독 패키지를 상담하는 글로벌 허브입니다.",
    alternates: { canonical: "/premium-packages" },
  };
}

const jsonLd = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: "프리미엄 프라이빗 패키지 허브", url: `${siteUrl}/premium-packages` },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: premiumPackageCountries.map((country, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: country.name,
      url: `${siteUrl}${country.href}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: kazakhstanFaqs.map((faq) => ({
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
      { "@type": "ListItem", position: 2, name: "프리미엄 패키지", item: `${siteUrl}/premium-packages` },
    ],
  },
];

export default function PremiumPackagesPage() {
  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-black text-cyan-700">Premium Packages</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            프리미엄 프라이빗 패키지 허브
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            단체 버스 일정이 아니라 전용차량, 가이드, 식사, 이동 속도를 고객 조건에 맞추는 단독 여행 상담 허브입니다.
          </p>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="프리미엄 프라이빗 패키지란?">
            <p>여행자만을 위한 차량과 가이드, 식사와 휴식 시간을 조합해 가족, 부모님, 소규모 팀의 속도에 맞추는 맞춤형 여행입니다.</p>
          </InfoBlock>
          <InfoBlock title="일반 패키지와 다른 점">
            <BulletList items={["단독 차량과 가이드 중심", "이동 거리와 휴식 시간 조정", "부모님·아이 컨디션 반영", "국가별 안전한 현지 소통 지원"]} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">국가 선택</h2>
          <div className="mt-8">
            <PremiumCountryGrid countries={premiumPackageCountries} />
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="추천 고객 유형">
            <BulletList items={["부모님과 함께하는 자연 여행", "장거리 이동이 많은 목적지", "현지 소통이 중요한 프라이빗 일정", "일정 속도를 직접 조절하고 싶은 가족"]} />
          </InfoBlock>
          <InfoBlock title="프리미엄 패키지 장점">
            <BulletList items={["전용차량", "가이드 동행", "식사 동선 조율", "공항 이동과 호텔 동선 상담", "목적지별 안전한 운영 구조"]} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <Link href="/premium-package-guide" className="inline-flex rounded-md border border-slate-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100">
            프리미엄 패키지 가이드 보기
          </Link>
          <FAQList faqs={kazakhstanFaqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
