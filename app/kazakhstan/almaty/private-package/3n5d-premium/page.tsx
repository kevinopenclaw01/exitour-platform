import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanMealSection from "@/components/kazakhstan/KazakhstanMealSection";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  almatyHotelGuide,
  getKazakhstanProduct,
  guidePolicy,
  hotelPolicy,
  kazakhstanKakaoMessage,
  kazakhstanPreparationItems,
  kazakhstanQuotePrefills,
  kazakhstanTravelNotices,
  pricingPolicy,
} from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const product = getKazakhstanProduct("private-package", "3n5d-premium");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const visibleFaqs =
  product?.faqs.filter((faq) => !["최소 몇 명부터 가능한가요?", "가이드는 어떤 언어로 진행되나요?"].includes(faq.question)) ?? [];

const guideAndPriceNotice = [
  guidePolicy,
  "프리미엄 단독 패키지와 단독투어는 4인 이상부터 진행 가능합니다. 기본적으로 정해진 동선과 일정에 따라 진행되며, 원하시는 일정이 있으실 경우 상담 후 맞춤 구성도 가능합니다.",
  "조인투어는 1인부터 참여 가능합니다.",
  pricingPolicy,
];

const operationalNotices = [
  "홍범도 장군 기념관, 카자흐 전통복장 체험, 사마르칸 포토존 등은 가능 시 특전으로 상담하며 확정 보장 사항이 아닙니다.",
  "일정 순서와 방문지는 항공 스케줄, 현지 운영 상황, 날씨와 도로 상황에 따라 조정될 수 있습니다.",
];

export function generateMetadata(): Metadata {
  if (!product) return { title: "상품을 찾을 수 없습니다 | EXITour" };
  return {
    title: "카자흐스탄 알마티 3박 5일 프리미엄 단독 패키지｜차린캐년·콜사이호수·시티투어",
    description:
      "다른 팀과 섞이지 않고 우리 일행만 전용차량과 가이드 동행으로 떠나는 단독 여행입니다. 침블락, 아유사이, 차린캐년, 콜사이호수, 블랙캐년, 이식호수, 투르겐폭포, 알마티 시티투어까지 알마티의 자연을 균형 있게 담았습니다.",
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
        mainEntity: visibleFaqs.map((faq) => ({
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
        meta={["3박 5일", "전용차량+한국어 가이드", "식사 포함", "호텔 선택형"]}
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
          <KazakhstanMealSection primaryPlanId="3n5d" />
          <InfoBlock title="한국어 가이드와 요금 안내">
            <div className="space-y-3">
              {guideAndPriceNotice.map((notice) => (
                <p key={notice}>{notice}</p>
              ))}
            </div>
          </InfoBlock>
          <InfoBlock title="포함사항">
            <BulletList items={product.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={product.excludes} />
          </InfoBlock>
          <InfoBlock title="준비물 / 이동 주의사항">
            <BulletList items={[...kazakhstanPreparationItems, ...kazakhstanTravelNotices]} />
          </InfoBlock>
          <InfoBlock title="유의사항">
            <BulletList items={operationalNotices} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={visibleFaqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} href={buildQuoteUrl(kazakhstanQuotePrefills.threeNightsFiveDays)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100" href="/kazakhstan/private-tour-guide">
              카자흐스탄 단독투어 가이드
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
