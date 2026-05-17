import type { Metadata } from "next";
import { BulletList, FAQList, InfoBlock } from "@/components/DetailSections";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanProductCard from "@/components/kazakhstan/KazakhstanProductCard";
import PremiumCTA from "@/components/premium/PremiumCTA";
import {
  kazakhstanFaqs,
  kazakhstanKakaoMessage,
  kazakhstanProducts,
} from "@/lib/mock/kazakhstanPremium";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  return {
    title: "카자흐스탄 프리미엄 패키지 | EXITour",
    description: "카자흐스탄 알마티 3박 5일 대표 프리미엄 패키지를 중심으로 전용차량, 가이드, 식사, 호텔 선택형 일정을 상담합니다.",
    alternates: { canonical: "/kazakhstan/premium-packages" },
  };
}

const packageProducts = kazakhstanProducts.filter((product) => product.productType === "private-package");
const jsonLd = [
  { "@context": "https://schema.org", "@type": "CollectionPage", name: "카자흐스탄 프리미엄 패키지", url: `${siteUrl}/kazakhstan/premium-packages` },
  { "@context": "https://schema.org", "@type": "ItemList", itemListElement: packageProducts.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.title, url: product.status === "available" ? `${siteUrl}${product.canonicalPath}` : `${siteUrl}/quote` })) },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: kazakhstanFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: siteUrl }, { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` }, { "@type": "ListItem", position: 3, name: "프리미엄 패키지", item: `${siteUrl}/kazakhstan/premium-packages` }] },
];

export default function KazakhstanPremiumPackagesPage() {
  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Kazakhstan Premium Packages"
        title="카자흐스탄 3박 5일 대표 프리미엄 패키지"
        description="알마티 3박 5일 대표 상품을 우선으로, 전용차량과 가이드 동행, 식사 포함, 호텔 선택형 구조의 프리미엄 프라이빗 자연여행을 상담합니다."
        imagePath="/images/kazakhstan/premium-private-tour.jpg"
        meta={["3박 5일 우선 오픈", "전용차량", "가이드 포함", "식사 포함", "호텔 선택형"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="왜 3박 5일 대표 상품인가요?">
            <p>알마티 시내와 침블락, 차린캐년, 콜사이호수, 이식호수, 투르겐폭포를 무리 없이 묶어 첫 카자흐스탄 프리미엄 자연여행으로 소개하기 좋습니다.</p>
          </InfoBlock>
          <InfoBlock title="포함 개념">
            <BulletList items={["전용차량", "가이드 동행", "식사 동선 상담", "숙박 필요 여부 확인", "장거리 이동 컨디션 안내"]} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">우선 오픈 패키지</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {packageProducts.map((product) => (
              <KazakhstanProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <KazakhstanGuideNotice />
          <FAQList faqs={kazakhstanFaqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
