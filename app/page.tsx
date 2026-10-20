import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import DestinationCard from "@/components/DestinationCard";
import FAQSection from "@/components/FAQSection";
import HotelCard from "@/components/HotelCard";
import ProductCard from "@/components/ProductCard";
import TravelImage from "@/components/TravelImage";
import TripStarter from "@/components/home/TripStarter";
import { destinations, hotels, products, type Destination } from "@/lib/data";
import { sapaProductCard } from "@/lib/mock/sapaPackage";

const featuredDestinationOrder = ["danang", "bohol", "boracay", "guam", "nha-trang", "kazakhstan"];
const getFeaturedDestinations = () => featuredDestinationOrder
  .map((id) => destinations.find((destination) => destination.id === id))
  .filter((destination): destination is Destination => Boolean(destination))
  .map((destination) => destination.id === "kazakhstan" ? {
    ...destination, href: "/kazakhstan", country: "카자흐스탄", name: "알마티",
    summary: "알마티에서 시작하는 설산, 호수, 캐년의 프리미엄 단독 자연여행",
    bestFor: ["프리미엄", "전용차량", "가이드동행"],
    season: "4월-10월 또는 상담 후 안내",
  } : destination);

const consultSteps = [
  { title: "견적 요청", body: "행선지, 날짜, 인원, 필요한 서비스를 남깁니다. 항공권은 이미 있어도 됩니다." },
  { title: "일정 확인", body: "담당자가 호텔·차량·투어 가능 여부와 동선을 확인합니다." },
  { title: "견적 안내", body: "조건에 맞춘 일정과 금액을 카카오톡이나 전화로 안내드립니다. 확정은 그다음입니다." },
];

function SectionHead({ title, description, href, label }: { title: string; description: string; href: string; label: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mb-10">
      <div className="max-w-2xl">
        <h2 className="display text-3xl text-ink sm:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted">{description}</p>
      </div>
      <Link href={href} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-navy hover:underline">
        {label}
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* 첫 화면: 흰 여백 + 수하물 태그 상담 시작 폼 */}
      <section className="border-b border-line bg-white text-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16 lg:px-8 lg:pb-20 lg:pt-16">
          <div>
            <h1 className="display text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4.25rem]">
              우리 일행 속도로
              <br />
              짜는 여행
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
              항공권은 직접 사셔도 됩니다. 호텔, 전용차량, 현지 투어를 행선지에 맞춰 묶고, 단독 일정으로 견적을 드립니다.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2 text-sm text-ink">
              <li className="rounded-full border-2 border-line px-3.5 py-1">전용차량 · 가이드 동행</li>
              <li className="rounded-full border-2 border-line px-3.5 py-1">가족여행 맞춤 일정</li>
              <li className="rounded-full border-2 border-line px-3.5 py-1">설산 · 호수 장거리 자연여행</li>
            </ul>
          </div>
          <TripStarter />
        </div>
      </section>

      {/* 행선지 태그 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHead
            title="행선지를 고르세요"
            description="휴양지 리조트부터 설산과 호수까지. 공항에서 호텔, 호텔에서 투어까지 이어서 준비합니다."
            href="/destinations"
            label="모든 목적지"
          />
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
            {getFeaturedDestinations().map((destination) => (
              <div key={destination.id} className="w-[15.5rem] shrink-0 snap-start sm:w-auto">
                <DestinationCard destination={destination} variant="home" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카자흐스탄: 이 회사만 하는 장거리 여정 */}
      <section className="bg-ink text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]">
            <TravelImage
              src="/images/home/kazakhstan-nature-editorial.png"
              alt="설산 아래 호수가 펼쳐진 카자흐스탄 알마티 근교 풍경"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              fallbackTitle="설산과 호수를 만나는 여정"
            />
          </div>
          <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-14 lg:py-16">
            <p className="code text-[5.5rem] text-signal" aria-hidden="true">ALA</p>
            <h2 className="display mt-4 text-3xl sm:text-[2.6rem]">알마티에서 시작하는 카자흐스탄 자연여행</h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              설산, 호수, 캐년을 전용차량과 가이드 동행으로 만납니다. 우리 일행만의 단독 일정부터 조인투어까지 고를 수 있습니다.
            </p>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
              <li className="flex justify-between py-3"><span>프리미엄 단독 패키지</span><span className="text-slate-400">3박 5일 · 4박 6일</span></li>
              <li className="flex justify-between py-3"><span>단독 데이 투어</span><span className="text-slate-400">차른 캐년 · 알틴에멜</span></li>
              <li className="flex justify-between py-3"><span>조인투어</span><span className="text-slate-400">알틴에멜 국립공원</span></li>
            </ul>
            <Link
              href="/kazakhstan"
              className="mt-8 inline-flex min-h-12 w-fit items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal-hover"
            >
              카자흐스탄 일정 보기
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 상품: 일정표처럼 한 줄씩 */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHead
            title="여행을 채우는 선택"
            description="공항 이동부터 하루를 채우는 현지 투어까지, 필요한 것만 골라 더합니다."
            href="/products"
            label="모든 상품"
          />
          <div className="divide-y divide-line border-y-2 border-ink">
            {[sapaProductCard, ...products.slice(0, 4)].map((product) => (
              <ProductCard key={product.id} product={product} variant="home" />
            ))}
          </div>
        </div>
      </section>

      {/* 상담 순서: 실제 진행 순서라 번호를 붙인다 */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="display text-3xl text-ink sm:text-4xl">견적은 이렇게 받습니다</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {consultSteps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-ink pt-5">
                <span className="code text-5xl text-navy" aria-hidden="true">{index + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-ink">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[0.95rem] leading-7 text-slate-700">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 호텔 */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <SectionHead
            title="머무는 곳도 여행이니까"
            description="위치와 객실, 가족 구성에 맞춰 호텔과 리조트를 고릅니다."
            href="/hotels"
            label="모든 호텔"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.slice(0, 3).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} variant="home" />
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted">실제 요금과 객실 가능 여부는 여행 일정과 예약 조건을 확인한 뒤 안내드립니다.</p>
        </div>
      </section>

      <CTASection variant="home" />
      <FAQSection variant="home" />
    </>
  );
}
