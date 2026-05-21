import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  altynEmelBreakfastNotice,
  altynEmelJoinPriceNotice,
  altynEmelJoinSections,
  altynEmelJoinTourMessage,
  getAltynEmelProduct,
} from "@/lib/mock/kazakhstanAltynEmel";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const product = getAltynEmelProduct("join-tour");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "카자흐스탄 알틴에멜 조인 투어｜악타우 산맥·노래하는 사구 알마티 출발",
    description: "알마티 출발 알틴에멜 조인 투어로 악타우 산맥과 노래하는 사구를 가이드 동행과 중식 포함으로 여행하는 카자흐스탄 자연투어입니다.",
    alternates: { canonical: "/kazakhstan/almaty/join-tour/altyn-emel-singing-dune-aktau" },
  };
}

const jsonLd = product
  ? [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: product.title,
        alternateName: "Kazakhstan Altyn Emel Join Tour｜Aktau Mountains & Singing Dune",
        description: product.summary,
        areaServed: "Kazakhstan",
        offers: {
          "@type": "Offer",
          priceCurrency: "KRW",
          priceSpecification: {
            "@type": "PriceSpecification",
            description: "조인 투어 가격은 상담 후 안내됩니다. 1인 기준가와 최소 출발 인원은 추후 입력할 수 있습니다.",
          },
          url: `${siteUrl}${product.canonicalPath}`,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
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
          { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` },
          { "@type": "ListItem", position: 3, name: "알마티 조인 투어", item: `${siteUrl}/kazakhstan/almaty/join-tour` },
          { "@type": "ListItem", position: 4, name: product.shortTitle, item: `${siteUrl}${product.canonicalPath}` },
        ],
      },
    ]
  : [];

export default function AltynEmelJoinTourPage() {
  if (!product) notFound();

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Almaty Join Nature Tour"
        title="알틴에멜 조인 투어"
        description="악타우 산맥과 노래하는 사구를 함께 만나는 알마티 출발 자연투어"
        imagePath={product.imagePath}
        meta={["조인 그룹투어", "중식 포함", "가이드 동행", "출발 가능일 확인"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="조인 투어란?">
            <p>{altynEmelJoinSections.intro}</p>
          </InfoBlock>
          <InfoBlock title="상품 요약">
            <p>{product.summary}</p>
            <p className="mt-4 font-bold text-slate-800">{altynEmelJoinPriceNotice}</p>
          </InfoBlock>
          <InfoBlock title="악타우 산맥 소개">
            <p>악타우 산맥은 알틴에멜을 대표하는 컬러 산맥 지형입니다. 장거리 자연투어 중 사진 포인트와 지형 감상이 좋은 구간입니다.</p>
          </InfoBlock>
          <InfoBlock title="노래하는 사구 소개">
            <p>노래하는 사구는 넓은 사막 지형과 국립공원 분위기를 함께 느낄 수 있는 대표 방문지입니다.</p>
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={product.includes} />
          </InfoBlock>
          <InfoBlock title="가이드 언어 안내">
            <p>{altynEmelJoinSections.guide}</p>
          </InfoBlock>
          <InfoBlock title="아침 식사 안내">
            <p>{altynEmelBreakfastNotice}</p>
          </InfoBlock>
          <InfoBlock title="조인 투어 이용 전 확인사항">
            <BulletList items={product.notices} />
          </InfoBlock>
          <InfoBlock title="추천 일정 흐름">
            <NumberedList items={product.itinerary} />
          </InfoBlock>
          <InfoBlock title="프라이빗 투어와 차이">
            <p>{altynEmelJoinSections.difference}</p>
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={product.excludes} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={product.faqs} />
          <PremiumCTA message={altynEmelJoinTourMessage} href={buildQuoteUrl(product.quotePrefill ?? {})} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/almaty/day-tour/altyn-emel-singing-dune-aktau">
              프라이빗 투어 보기
            </Link>
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/altyn-emel-guide">
              알틴에멜 여행 가이드 보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
