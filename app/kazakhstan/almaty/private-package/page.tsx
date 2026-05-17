import type { Metadata } from "next";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanProductCard from "@/components/kazakhstan/KazakhstanProductCard";
import KazakhstanGuideNotice from "@/components/kazakhstan/KazakhstanGuideNotice";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { kazakhstanKakaoMessage, kazakhstanProducts } from "@/lib/mock/kazakhstanPremium";

export function generateMetadata(): Metadata {
  return {
    title: "알마티 프라이빗 패키지 목록 | EXITour",
    description: "카자흐스탄 알마티 출발 2일 이상 프리미엄 프라이빗 패키지 목록입니다.",
    alternates: { canonical: "/kazakhstan/almaty/private-package" },
  };
}

export default function AlmatyPrivatePackagePage() {
  const products = kazakhstanProducts.filter((product) => product.productType === "private-package");

  return (
    <>
      <KazakhstanHero
        eyebrow="Almaty Private Packages"
        title="알마티 프리미엄 프라이빗 패키지"
        description="2일 이상 카자흐스탄 자연 여행을 전용차량과 가이드 동행으로 상담합니다."
        imagePath="/images/kazakhstan/premium-private-tour.jpg"
        meta={["4인 기준 상담", "전용차량", "가이드 포함"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
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
