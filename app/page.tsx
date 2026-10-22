import type { Metadata } from "next";
import CategoryCards from "@/components/travel/CategoryCards";
import DestinationExplorer from "@/components/travel/DestinationExplorer";
import { TravelComparison, TravelConsultation, TravelFAQ, travelContainer } from "@/components/travel/TravelPages";

export const metadata: Metadata = {
  title: "EXITour | 우리끼리 맞춤 패키지 · 내맘대로 단품 투어",
  description: "우리 그룹 전담 가이드와 만드는 맞춤 패키지, 필요한 서비스만 고르는 단품 투어. 베트남·필리핀·카자흐스탄·괌 여행을 EXITour와 준비하세요. 맞춤 패키지는 호텔·항공 불포함이며 요청 시 대행을 상담합니다.",
  alternates: { canonical: "/" },
};

const steps = [
  { title: "여행 방식과 지역 선택", description: "전담 가이드가 필요한 여행인지, 개별 서비스만 필요한지 먼저 골라 주세요." },
  { title: "날짜와 일행 이야기", description: "여행 날짜, 인원, 가고 싶은 곳과 필요한 서비스를 알려주세요." },
  { title: "일정·조건 확인 후 결정", description: "가능한 일정과 요금, 포함·불포함 내역을 확인한 뒤 여행을 결정합니다." },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className={`${travelContainer} pb-12 pt-10 sm:pb-16 sm:pt-14`}>
          <h1 className="display text-3xl tracking-normal text-ink sm:text-5xl">EXITour와 떠나는 두 가지 여행</h1>
          <p className="mb-8 mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg">우리 일행만을 위한 가이드와 함께하거나, 필요한 서비스만 자유롭게 고르거나.<br className="hidden sm:block" /> 여행의 방식부터 선택해 보세요.</p>
          <CategoryCards />
        </div>
      </section>
      <section id="destinations" className="scroll-mt-24 bg-paper">
        <div className={`${travelContainer} py-14 sm:py-16`}>
          <h2 className="display text-3xl tracking-normal sm:text-4xl">여행 방식에 맞는 목적지</h2>
          <p className="mb-7 mt-4 text-base leading-7 text-muted">가고 싶은 나라와 도시를 고르고, 우리 여행에 맞는 방향을 살펴보세요.</p>
          <DestinationExplorer />
        </div>
      </section>
      <TravelComparison />
      <section className="border-t border-line bg-paper">
        <div className={`${travelContainer} py-14 sm:py-16`}>
          <h2 className="display text-3xl tracking-normal sm:text-4xl">여행 준비는 이렇게</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <span className="num text-3xl font-bold text-navy" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <TravelConsultation />
      <TravelFAQ />
    </>
  );
}
