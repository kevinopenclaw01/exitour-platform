import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanMealSection from "@/components/kazakhstan/KazakhstanMealSection";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
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

const product = getKazakhstanProduct("private-package", "4n6d-nature");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const visibleFaqs =
  product?.faqs.filter((faq) => !["최소 몇 명부터 가능한가요?", "가이드는 어떤 언어로 진행되나요?"].includes(faq.question)) ?? [];

const packageBenefits = [
  "알마티 몰 투어",
  "싸이란 파크",
  "홍범도 장군 기념관",
  "알마티 센츄럴 테마파크",
];

const guideAndPriceNotice = [
  guidePolicy,
  "프리미엄 단독 패키지는 4인 이상부터 진행 가능합니다.",
  pricingPolicy,
];

const hotelAndMealInfo = [
  "호텔은 리가달 또는 동급 4성급 기준이며, 2인 1실 기준으로 안내합니다.",
  hotelPolicy,
  "식사는 호텔식, 현지식, 한식 등 일정표상 식사가 포함되는 구성입니다.",
  "노쇼핑·노옵션 상품으로 안내합니다.",
];

const operationalNotices = [
  "현지 사정(자연재해·우천 등)에 따라 일정이 변경될 수 있습니다.",
];

const contactItems = ["카카오톡 ID: exitouroffice 또는 exitour1", "전화: 010-5934-2629"];

export function generateMetadata(): Metadata {
  if (!product) return { title: "상품을 찾을 수 없습니다 | EXITour" };
  return {
    title: "카자흐스탄 알마티 4박 6일 프리미엄 단독 패키지 | EXITour",
    description: product.summary,
    alternates: { canonical: product.canonicalPath },
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
          priceSpecification: { "@type": "PriceSpecification", description: pricingPolicy },
          url: `${siteUrl}${product.canonicalPath}`,
        },
      },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: visibleFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: siteUrl }, { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` }, { "@type": "ListItem", position: 3, name: "알마티", item: `${siteUrl}/kazakhstan/almaty` }, { "@type": "ListItem", position: 4, name: product.shortTitle, item: `${siteUrl}${product.canonicalPath}` }] },
    ]
  : [];

export default function KazakhstanNaturePackageDetailPage() {
  if (!product) notFound();

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Kazakhstan Premium Package"
        title={product.title}
        description={product.summary}
        imagePath={product.imagePath}
        meta={[product.duration, "4인 이상 진행", "전용차량", "한국어 가이드", "노쇼핑·노옵션"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="추천 대상">
            <BulletList items={product.recommendedFor} />
          </InfoBlock>
          <InfoBlock title="하이라이트">
            <BulletList items={product.highlights} />
          </InfoBlock>
          <InfoBlock title="일정/설명">
            <NumberedList items={product.itinerary} />
          </InfoBlock>
          <InfoBlock title="4대 특전">
            <BulletList items={packageBenefits} />
            <p className="mt-4">특전은 가능 시 제공되는 일정 요소이며, 현지 운영 상황에 따라 순서나 포함 여부가 조정될 수 있어 확정 보장 사항은 아닙니다.</p>
          </InfoBlock>
          <InfoBlock title="호텔·식사·노쇼핑 안내">
            <BulletList items={hotelAndMealInfo} />
          </InfoBlock>
          <KazakhstanMealSection primaryPlanId="4n6d" />
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
          <InfoBlock title="상담 문의">
            <BulletList items={contactItems} />
          </InfoBlock>
          <InfoBlock title="후기/신뢰도">
            <p>실제 후기 추가 예정입니다. 고객 이름, 사진, 상세 후기는 임의 생성하지 않았습니다.</p>
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={visibleFaqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} href={buildQuoteUrl(kazakhstanQuotePrefills.fourNightsSixDays)} />
        </div>
      </section>
    </>
  );
}
