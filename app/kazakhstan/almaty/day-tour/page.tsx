import type { Metadata } from "next";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanProductCard from "@/components/kazakhstan/KazakhstanProductCard";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { kazakhstanKakaoMessage, kazakhstanProducts } from "@/lib/mock/kazakhstanPremium";

export function generateMetadata(): Metadata {
  return {
    title: "알마티 프라이빗 당일투어 목록 | EXITour",
    description: "알마티 출발 차른 캐년, 콜사이·카인디, 알틴에멜 프리미엄 당일투어 목록입니다.",
    alternates: { canonical: "/kazakhstan/almaty/day-tour" },
  };
}

export default function AlmatyDayTourPage() {
  const products = kazakhstanProducts.filter((product) => product.productType === "day-tour" && product.id !== "kazakhstan-altyn-emel");

  return (
    <>
      <KazakhstanHero
        eyebrow="Almaty Private Day Tours"
        title="알마티 프리미엄 프라이빗 당일투어"
        description="알마티에서 출발하는 대표 자연 명소를 전용차량과 가이드 동행으로 안전하게 연결합니다."
        imagePath="/images/kazakhstan/charyn-canyon.jpg"
        meta={["차른 캐년", "콜사이·카인디", "알틴에멜", "가이드 동행"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {products.map((product) => (
            <KazakhstanProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <KazakhstanGuideNotice />
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
