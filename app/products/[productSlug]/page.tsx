import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import {
  BulletList,
  ConsultationCTA,
  FAQList,
  InfoBlock,
  NumberedList,
  PageHero,
} from "@/components/DetailSections";
import { formatKrw, getProductBySlug, getRelatedProducts, products } from "@/lib/data";

type ProductPageProps = {
  params: Promise<{ productSlug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    productSlug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    return {
      title: "상품을 찾을 수 없습니다 | EXITour",
    };
  }

  return {
    title: `${product.title} | EXITour`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <PageHero
        eyebrow="Product Detail"
        title={product.title}
        description={product.description}
        meta={[product.region, product.category, `${formatKrw(product.priceFromKrw)}원~`, product.duration]}
      />

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-5">
            <InfoBlock title="가격 안내">
              <p className="text-2xl font-black text-slate-950">{formatKrw(product.priceFromKrw)}원~</p>
              <p className="mt-2">{product.priceNote}</p>
            </InfoBlock>
            <InfoBlock title="추천 대상">
              <BulletList items={product.recommendedFor} />
            </InfoBlock>
            <InfoBlock title="일정/설명">
              <NumberedList items={product.itinerary} />
            </InfoBlock>
            <InfoBlock title="주의사항">
              <BulletList items={product.notices} />
            </InfoBlock>
            <InfoBlock title="취소 규정">
              <BulletList items={product.cancellationPolicy} />
            </InfoBlock>
          </div>

          <aside className="space-y-5">
            <InfoBlock title="포함 사항">
              <BulletList items={product.includes} />
            </InfoBlock>
            <InfoBlock title="불포함 사항">
              <BulletList items={product.excludes} />
            </InfoBlock>
            <ConsultationCTA
              title="카카오톡 상담으로 세부 조건을 맞춰보세요"
              description="카카오톡 상담 채널은 이후 연결 예정입니다. 현재는 견적 요청 화면에서 여행일과 인원을 남기면 상담 흐름으로 이어질 수 있게 준비했습니다."
            />
          </aside>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">상품 FAQ</h2>
          <div className="mt-8">
            <FAQList faqs={product.faqs} />
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">관련 상품</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
