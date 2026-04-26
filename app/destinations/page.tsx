import DestinationCard from "@/components/DestinationCard";
import CTASection from "@/components/CTASection";
import { destinations } from "@/lib/data";

export default function DestinationsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-cyan-700">Destinations</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            한국인 여행자에게 검증된 프리미엄 목적지
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            휴양, 가족 여행, 허니문, 도시 여행, 자연 탐방까지 목적지별 이동 시간과 추천 시즌, 어울리는 여행 스타일을 한눈에 비교할 수 있게 정리했습니다.
          </p>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
