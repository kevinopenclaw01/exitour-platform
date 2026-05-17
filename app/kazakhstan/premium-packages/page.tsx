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
    description: "2일 이상 카자흐스탄 프라이빗 자연 패키지를 전용차량과 가이드 동행으로 상담합니다.",
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
        title="카자흐스탄 2일 이상 프리미엄 프라이빗 패키지"
        description="알마티를 거점으로 캐년, 호수, 사막, 국립공원을 전용차량과 가이드 동행으로 연결합니다."
        imagePath="/images/kazakhstan/premium-private-tour.jpg"
        meta={["2일 이상 상담 가능", "전용차량", "가이드 포함", "식사 동선 상담"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="왜 카자흐스탄 프리미엄 패키지인가요?">
            <p>자연 명소 간 이동 거리가 길고 현지 소통과 도로 상황 변수가 있어, 전용차량과 가이드가 함께하는 단독 일정이 여행 만족도와 안정성을 높입니다.</p>
          </InfoBlock>
          <InfoBlock title="포함 개념">
            <BulletList items={["전용차량", "가이드 동행", "식사 동선 상담", "숙박 필요 여부 확인", "장거리 이동 컨디션 안내"]} />
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">추천 패키지</h2>
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
