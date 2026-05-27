import type { Metadata } from "next";
import { InfoBlock } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import KazakhstanProductCard from "@/components/kazakhstan/KazakhstanProductCard";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { altynEmelJoinPrefill, altynEmelJoinTourMessage } from "@/lib/mock/kazakhstanAltynEmel";
import { kazakhstanProducts } from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

export function generateMetadata(): Metadata {
  return {
    title: "알마티 조인 그룹투어 목록 | EXITour",
    description: "알마티 출발 카자흐스탄 조인 그룹투어를 확인하고, 출발 가능 날짜와 가이드 언어를 상담합니다.",
    alternates: { canonical: "/kazakhstan/almaty/join-tour" },
  };
}

export default function AlmatyJoinTourPage() {
  const products = kazakhstanProducts.filter((product) => product.productType === "join-tour");

  return (
    <>
      <KazakhstanHero
        eyebrow="Almaty Join Tours"
        title="알마티 조인 그룹투어"
        description="혼자 또는 소수 인원도 참여 가능한 카자흐스탄 현지 조인형 자연투어입니다. 출발 가능 여부는 날짜와 모객 상황에 따라 상담 후 안내됩니다."
        imagePath="/images/kazakhstan/altyn-emel-join-tour-hero.png"
        meta={["조인 그룹투어", "출발 가능일 확인", "가이드 동행", "상담 후 가격 안내"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {products.map((product) => (
            <KazakhstanProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="조인 투어 운영 안내">
            <p>조인 투어는 다른 여행자와 함께 진행될 수 있으며, 출발 가능 여부는 모객 상황, 날짜, 현지 운영 상황에 따라 달라집니다.</p>
          </InfoBlock>
          <InfoBlock title="프라이빗 투어와의 차이">
            <p>일정, 차량, 식사 장소, 체류 시간은 현지 운영 흐름을 따릅니다. 가족이나 부모님 동반처럼 단독 일정이 필요한 경우 프라이빗 투어 상담을 권장합니다.</p>
          </InfoBlock>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
          <PremiumCTA message={altynEmelJoinTourMessage} href={buildQuoteUrl(altynEmelJoinPrefill)} />
        </div>
      </section>
    </>
  );
}
