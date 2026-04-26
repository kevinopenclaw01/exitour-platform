import CTASection from "@/components/CTASection";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export default function ProductsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-cyan-700">Products</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            공항 이동부터 현지 투어까지 필요한 것만 고르는 여행 상품
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            항공과 숙소를 이미 예약한 고객도 현지 이동, 해양 액티비티, 마사지, 일일투어를 따로 조합할 수 있습니다. 가격은 샘플 기준이며 실제 상담 시 목적지와 인원에 따라 확정됩니다.
          </p>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
