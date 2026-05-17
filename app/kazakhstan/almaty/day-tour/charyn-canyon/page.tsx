import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BulletList, FAQList, InfoBlock, NumberedList } from "@/components/DetailSections";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { getKazakhstanProduct, kazakhstanKakaoMessage } from "@/lib/mock/kazakhstanPremium";

const product = getKazakhstanProduct("day-tour", "charyn-canyon");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateMetadata(): Metadata {
  if (!product) return { title: "상품을 찾을 수 없습니다 | EXITour" };
  return {
    title: `${product.shortTitle} | EXITour`,
    description: product.summary,
    alternates: { canonical: product.canonicalPath },
  };
}

const jsonLd = product
  ? [
      { "@context": "https://schema.org", "@type": "Service", name: product.title, description: product.summary, areaServed: "Kazakhstan", offers: { "@type": "Offer", priceCurrency: "KRW", price: product.priceFromKrw, url: `${siteUrl}${product.canonicalPath}` } },
      { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: product.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "홈", item: siteUrl }, { "@type": "ListItem", position: 2, name: "카자흐스탄", item: `${siteUrl}/kazakhstan` }, { "@type": "ListItem", position: 3, name: "알마티", item: `${siteUrl}/kazakhstan/almaty` }, { "@type": "ListItem", position: 4, name: product.shortTitle, item: `${siteUrl}${product.canonicalPath}` }] },
    ]
  : [];

export default function CharynCanyonDetailPage() {
  if (!product) notFound();

  return (
    <>
      {jsonLd.map((item) => (
        <script key={item["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <KazakhstanHero
        eyebrow="Premium Private Day Tour"
        title={product.title}
        description={product.summary}
        imagePath={product.imagePath}
        meta={[product.duration, `최소 추천 ${product.minRecommendedPeople}명`, "전용차량", "가이드 동행"]}
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
          <KazakhstanGuideNotice />
          <InfoBlock title="포함사항">
            <BulletList items={product.includes} />
          </InfoBlock>
          <InfoBlock title="불포함사항">
            <BulletList items={product.excludes} />
          </InfoBlock>
          <InfoBlock title="주의사항">
            <BulletList items={product.notices} />
          </InfoBlock>
          <InfoBlock title="후기/신뢰도">
            <p>실제 후기 추가 예정입니다. 고객 이름, 사진, 상세 후기는 임의 생성하지 않았습니다.</p>
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={product.faqs} />
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
