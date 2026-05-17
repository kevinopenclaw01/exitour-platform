import type { Metadata } from "next";
import Link from "next/link";
import { BulletList, InfoBlock } from "@/components/DetailSections";
import KazakhstanHero from "@/components/kazakhstan/KazakhstanHero";
import PremiumCTA from "@/components/premium/PremiumCTA";
import { kazakhstanDestinations, kazakhstanKakaoMessage, productTypes } from "@/lib/mock/kazakhstanPremium";

export function generateMetadata(): Metadata {
  return {
    title: "알마티 프리미엄 여행 허브 | EXITour",
    description: "카자흐스탄 알마티를 거점으로 프리미엄 패키지, 당일투어, 공항 이동 상담을 연결합니다.",
    alternates: { canonical: "/kazakhstan/almaty" },
  };
}

export default function AlmatyHubPage() {
  return (
    <>
      <KazakhstanHero
        eyebrow="Almaty Private Travel"
        title="알마티 프리미엄 여행 허브"
        description="알마티는 차른 캐년, 콜사이·카인디 호수, 알틴에멜 국립공원으로 이어지는 카자흐스탄 프라이빗 자연 여행의 출발점입니다."
        imagePath="/images/kazakhstan/almaty-hero.jpg"
        meta={["프리미엄 패키지", "프라이빗 당일투어", "공항 이동 상담"]}
      />
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="Why Almaty is the base">
            <p>알마티는 국제선 도착, 호텔, 식사, 주요 자연 명소 출발 동선이 집중된 도시입니다. 장거리 자연 여행 전후 컨디션을 조절하기 좋습니다.</p>
          </InfoBlock>
          <InfoBlock title="Product categories">
            <div className="grid gap-3">
              {productTypes.map((type) => (
                <Link key={type.id} href={type.path} className="rounded-md border border-slate-200 bg-white px-4 py-3 font-black text-slate-900 transition hover:border-cyan-300">
                  {type.label}
                </Link>
              ))}
            </div>
          </InfoBlock>
          <InfoBlock title="Featured destinations around Almaty">
            <BulletList items={kazakhstanDestinations.slice(1, 6).map((destination) => destination.title)} />
          </InfoBlock>
          <InfoBlock title="렌트카가 아닌 가이드 동행 여행">
            <p>카자흐스탄은 장거리 이동, 비포장 도로, 통신 불안정, 현지 소통 이슈가 있어 렌트카보다 가이드 동행 프라이빗 여행으로 안내합니다.</p>
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
