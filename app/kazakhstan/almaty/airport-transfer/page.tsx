import type { Metadata } from "next";
import { BulletList, InfoBlock } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { guidePolicy, kazakhstanKakaoMessage } from "@/lib/mock/kazakhstanPremium";

export function generateMetadata(): Metadata {
  return {
    title: "알마티 공항 픽업·샌딩 상담 | EXITour",
    description: "알마티 공항 도착과 출발, 호텔 이동, 가이드/차량 포함 가능성을 상담하는 페이지입니다.",
    alternates: { canonical: "/kazakhstan/almaty/airport-transfer" },
  };
}

export default function AlmatyAirportTransferPage() {
  return (
    <>
      <KazakhstanHero
        eyebrow="Almaty Airport Transfer"
        title="알마티 공항 픽업·샌딩 상담"
        description="알마티 공항 도착/출발 시간, 호텔 위치, 인원, 수하물, 가이드 필요 여부에 따라 전용차량 이동을 상담합니다."
        imagePath="/images/kazakhstan/almaty-hero.jpg"
        meta={["상담형 공항 이동", "전용차량 가능", "가이드 동행 상담"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="알마티 공항 도착/출발">
            <p>항공편 도착 시간과 호텔 위치를 기준으로 공항 픽업 또는 샌딩 차량을 상담합니다. 장거리 자연 여행 전후 일정이라면 이동 피로를 고려해 여유 있게 구성합니다.</p>
          </InfoBlock>
          <InfoBlock title="가이드/차량 포함 가능성">
            <p>{guidePolicy}</p>
          </InfoBlock>
          <InfoBlock title="상담 시 필요한 정보">
            <BulletList items={["항공편명", "도착 또는 출발 시간", "호텔명", "탑승 인원", "수하물 수", "가이드 동행 필요 여부"]} />
          </InfoBlock>
          <InfoBlock title="가격 안내">
            <p>알마티 공항 이동은 과도한 고정 가격표 대신 항공 시간, 호텔 위치, 차량 조건, 가이드 동행 여부를 확인한 뒤 상담으로 안내합니다.</p>
          </InfoBlock>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <PremiumCTA message={kazakhstanKakaoMessage} />
        </div>
      </section>
    </>
  );
}
