import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import AltynEmelComparisonImage from "@/components/kazakhstan/AltynEmelComparisonImage";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  altynEmelPrivateSections,
  altynEmelPrivateTourMessage,
  altynEmelPrivatePriceNotice,
  altynEmelPreparationItems,
  getAltynEmelProduct,
} from "@/lib/mock/kazakhstanAltynEmel";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const product = getAltynEmelProduct("day-tour");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "카자흐스탄 알틴에멜 국립공원 프라이빗 투어｜노래하는 사구·악타우 산맥 알마티 출발",
    description:
      "알마티 출발로 알틴에멜 국립공원, 노래하는 사구, 악타우 산맥을 전용차량과 가이드 동행으로 여행하는 카자흐스탄 프라이빗 자연투어입니다.",
    alternates: { canonical: "/kazakhstan/almaty/day-tour/altyn-emel-singing-dune-aktau" },
  };
}

const jsonLd = product
  ? [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: product.title,
        alternateName: "Kazakhstan Altyn Emel Private Day Tour｜Singing Dune & Aktau Mountains",
        description: product.summary,
        areaServed: "Kazakhstan",
        offers: {
          "@type": "Offer",
          priceCurrency: "KRW",
          priceSpecification: {
            "@type": "PriceSpecification",
            description: "참고 상품 기준 확인 후 안내되며 최종 금액은 상담 시 안내됩니다.",
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
          { "@type": "ListItem", position: 3, name: "알마티 당일투어", item: `${siteUrl}/kazakhstan/almaty/day-tour` },
          { "@type": "ListItem", position: 4, name: product.shortTitle, item: `${siteUrl}${product.canonicalPath}` },
        ],
      },
    ]
  : [];

export default function AltynEmelPrivateTourPage() {
  if (!product) notFound();

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Premium Private Nature Tour"
        title="알틴에멜 국립공원 프라이빗 투어"
        description="노래하는 사구와 악타우 산맥을 만나는 알마티 출발 대자연 코스"
        imagePath={product.imagePath}
        meta={["전용차량", "가이드 동행", "노래하는 사구", "악타우 산맥"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="상품 요약">
            <p>{product.summary}</p>
            <p className="mt-4 font-bold text-slate-800">{altynEmelPrivatePriceNotice}</p>
          </InfoBlock>
          <InfoBlock title="알틴에멜 국립공원은 어떤 곳인가">
            <p>{altynEmelPrivateSections.placeIntro}</p>
          </InfoBlock>
          <InfoBlock title="노래하는 사구 소개">
            <p>노래하는 사구는 알틴에멜을 대표하는 사막 지형입니다. 바람과 모래가 만드는 독특한 분위기와 넓은 시야가 인상적인 포인트입니다.</p>
          </InfoBlock>
          <InfoBlock title="악타우 산맥 소개">
            <p>악타우 산맥은 밝은 색과 붉은 지층이 이어지는 컬러 산맥으로, 카자흐스탄 자연 여행의 거친 질감을 가장 선명하게 보여줍니다.</p>
          </InfoBlock>
          <InfoBlock title="추천 일정 흐름">
            <NumberedList items={product.itinerary} />
          </InfoBlock>
          <InfoBlock title="이동/차량/가이드 안내">
            <p>{altynEmelPrivateSections.recommendation}</p>
            <div className="mt-4">
              <KazakhstanGuideNotice />
            </div>
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={product.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={product.excludes} />
          </InfoBlock>
          <InfoBlock title="준비물/주의사항">
            <BulletList items={[...altynEmelPreparationItems, ...product.notices]} />
          </InfoBlock>
          <InfoBlock title="당일투어 이용 시 알아야 할 점">
            <p>알틴에멜은 장거리 이동과 야외 관람이 중심인 코스입니다. 출발 시간, 화장실과 식사 동선, 도로 상황에 따라 일정이 조정될 수 있습니다.</p>
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={product.faqs} />
          <AltynEmelComparisonImage />
          <PremiumCTA message={altynEmelPrivateTourMessage} href={buildQuoteUrl(product.quotePrefill ?? {})} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/altyn-emel-guide">
              알틴에멜 여행 가이드 보기
            </Link>
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/almaty/join-tour/altyn-emel-singing-dune-aktau">
              조인 투어와 비교하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
