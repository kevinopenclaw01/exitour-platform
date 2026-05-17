import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  almatyHotelGuide,
  getKazakhstanProduct,
  guidePolicy,
  hotelPolicy,
  kazakhstanKakaoMessage,
  kazakhstanMealHighlights,
  kazakhstanPreparationItems,
  kazakhstanQuotePrefills,
  pricingPolicy,
} from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const product = getKazakhstanProduct("private-package", "3n5d-premium");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  if (!product) return { title: "상품을 찾을 수 없습니다 | EXITour" };
  return {
    title: "카자흐스탄 알마티 3박 5일 프리미엄 패키지｜차린캐년·콜사이호수·시티투어 단독 가이드 여행",
    description:
      "알마티를 거점으로 침블락, 아유사이, 차린캐년, 콜사이호수, 블랙캐년, 이식호수, 투르겐폭포, 알마티 시티투어를 전용차량과 가이드 동행으로 여행하는 카자흐스탄 3박 5일 프리미엄 프라이빗 패키지입니다.",
    alternates: { canonical: "/kazakhstan/almaty/private-package/3n5d-premium" },
  };
}

const jsonLd = product
  ? [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: product.title,
        description: product.summary,
        areaServed: "Kazakhstan",
        offers: {
          "@type": "Offer",
          priceCurrency: "KRW",
          priceSpecification: {
            "@type": "PriceSpecification",
            description: pricingPolicy,
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
          { "@type": "ListItem", position: 3, name: "알마티", item: `${siteUrl}/kazakhstan/almaty` },
          { "@type": "ListItem", position: 4, name: product.shortTitle, item: `${siteUrl}${product.canonicalPath}` },
        ],
      },
    ]
  : [];

export default function KazakhstanThreeNightPremiumPage() {
  if (!product) notFound();

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Kazakhstan Launch Product"
        title={product.title}
        description={product.summary}
        imagePath={product.imagePath}
        meta={["3박 5일", "전용차량+가이드", "식사 포함", "호텔 선택형"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="이 상품이 대표 상품인 이유">
            <p>알마티 시내, 설산, 캐년, 호수, 폭포, 맛집투어를 3박 5일 안에 균형 있게 담아 카자흐스탄 첫 프리미엄 자연 여행으로 소개하기 좋습니다.</p>
          </InfoBlock>
          <InfoBlock title="3박 5일 핵심 요약">
            <BulletList items={product.highlights} />
          </InfoBlock>
          <InfoBlock title="일정표">
            <NumberedList items={product.itinerary} />
          </InfoBlock>
          <InfoBlock title="주요 여행지 하이라이트">
            <BulletList items={["침블락", "아유사이 국립공원", "차린 캐년", "콜사이 호수", "블랙캐년", "이식호수", "투르겐 폭포", "알마티 시티투어"]} />
          </InfoBlock>
          <InfoBlock title="호텔 등급 선택">
            <BulletList items={almatyHotelGuide.sections.slice(1, 5).map((section) => section.title)} />
            <p className="mt-4">{hotelPolicy}</p>
          </InfoBlock>
          <InfoBlock title="식사/맛집투어 안내">
            <BulletList items={kazakhstanMealHighlights} />
            <p className="mt-4">특정 식당은 확정 보장이 아니라 예정 또는 동급 식당 기준이며, 실제 식사는 상담 후 확정됩니다.</p>
          </InfoBlock>
          <InfoBlock title="가이드 언어 옵션">
            <BulletList items={["영어 가이드", "한국어 가이드, 가능 시", "영어 가이드 + 한국어 통역 조합"]} />
            <p className="mt-4">{guidePolicy}</p>
          </InfoBlock>
          <InfoBlock title="상담형 가격 안내">
            <p>{pricingPolicy}</p>
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={product.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={product.excludes} />
          </InfoBlock>
          <InfoBlock title="준비물 / 주의사항">
            <BulletList items={[...kazakhstanPreparationItems, ...product.notices]} />
          </InfoBlock>
          <KazakhstanGuideNotice />
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={product.faqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} href={buildQuoteUrl(kazakhstanQuotePrefills.threeNightsFiveDays)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/private-tour-guide">
              카자흐스탄 프라이빗 투어 가이드
            </Link>
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/almaty-hotel-guide">
              알마티 호텔 선택 가이드
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
