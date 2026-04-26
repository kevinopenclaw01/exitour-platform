import CTASection from "@/components/CTASection";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/lib/data";

export default function HotelsPage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-cyan-700">Hotels</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            일정 동선까지 고려한 계약 호텔 특가
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            단순 최저가가 아니라 공항 이동, 투어 픽업, 조식, 객실 구조, 가족 편의시설까지 함께 확인합니다. 목적지별 대표 호텔 샘플을 바탕으로 상담 화면을 구성했습니다.
          </p>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
