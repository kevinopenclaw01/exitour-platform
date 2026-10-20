import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Compass, Plane } from "lucide-react";
import CTASection from "@/components/CTASection";
import DestinationCard from "@/components/DestinationCard";
import FAQSection from "@/components/FAQSection";
import HotelCard from "@/components/HotelCard";
import ProductCard from "@/components/ProductCard";
import TravelImage from "@/components/TravelImage";
import { destinations, hotels, products, type Destination } from "@/lib/data";
import { sapaProductCard } from "@/lib/mock/sapaPackage";

const featuredDestinationOrder = ["danang", "bohol", "boracay", "guam", "nha-trang", "kazakhstan"];
const getFeaturedDestinations = () => featuredDestinationOrder
  .map((id) => destinations.find((destination) => destination.id === id))
  .filter((destination): destination is Destination => Boolean(destination))
  .map((destination) => destination.id === "kazakhstan" ? {
    ...destination, href: "/kazakhstan", country: "카자흐스탄", name: "카자흐스탄",
    summary: "알마티에서 시작하는 설산, 호수, 캐년의 프리미엄 단독 자연여행",
    bestFor: ["프리미엄", "전용차량", "가이드동행"],
    season: "4월-10월 또는 상담 후 안내", flightTime: "장거리 자연여행 / 상담형 일정",
    imageUrl: "/images/home/kazakhstan-nature-editorial.png",
  } : destination);

const travelStyles = [
  { href: "/premium-packages", label: "프리미엄 단독여행", icon: Compass },
  { href: "/products", label: "현지 투어 · 공항 이동", icon: Plane },
  { href: "/hotels", label: "호텔 · 리조트", icon: Building2 },
];

function SectionHeading({ title, description, href, label }: {
  title: string; description: string; href: string; label: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4 sm:mb-9">
      <div>
        <h2 className="text-2xl font-bold text-[#172b27] sm:text-3xl">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      <Link href={href} className="inline-flex shrink-0 items-center gap-2 py-2 text-sm font-semibold text-[#176753] hover:text-[#0c4536]">
        {label}<ArrowRight size={16} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[400px] items-center overflow-hidden bg-[#195b68] text-white sm:min-h-[440px] lg:min-h-[460px]">
        <TravelImage src="/images/home/exitour-coast-hero-v2.png" alt="투명한 바다와 푸른 해안을 담은 EXITour 여행 이미지" fill preload sizes="100vw" className="object-cover object-[center_60%]" fallbackTitle="" fallbackClassName="bg-[#195b68]" />
        <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-white/90 sm:text-sm">여행의 시작, 엑시투어</p>
            <h1 className="mt-3 text-5xl font-bold leading-none sm:text-6xl lg:text-7xl">EXITour</h1>
            <p className="mt-5 break-keep text-2xl font-semibold leading-snug sm:text-3xl">우리 일행의 속도로,<br />더 깊이 만나는 여행</p>
            <p className="mt-4 max-w-lg break-keep text-sm leading-6 text-white/95 sm:text-base sm:leading-7">
              바다에서 보내는 여유부터 설산과 호수를 만나는 여정까지.<br className="hidden sm:block" /> 호텔, 차량, 투어를 여행의 취향에 맞게 연결합니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
              <Link href="/quote" className="inline-flex min-h-11 items-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-bold text-[#174c3e] transition hover:bg-emerald-50 sm:px-5">
                여행 상담<ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/destinations" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/65 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-5">
                목적지 보기<ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <nav aria-label="여행 형태" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 px-4 sm:px-6 lg:px-8">
          {travelStyles.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="group flex min-h-20 flex-col items-center justify-center gap-2 border-r border-slate-100 px-2 py-4 text-center last:border-r-0 sm:flex-row sm:gap-4">
              <Icon size={23} strokeWidth={1.5} className="shrink-0 text-[#176753]" aria-hidden="true" />
              <span className="break-keep text-xs font-semibold text-slate-700 group-hover:text-[#176753] sm:text-sm">{label}</span>
              <ArrowUpRight size={16} className="hidden text-slate-400 transition group-hover:text-[#176753] md:block" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </nav>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <SectionHeading title="어디로 떠나볼까요?" description="휴양, 가족여행, 자연여행. 지금 마음이 향하는 곳을 찾아보세요." href="/destinations" label="모든 목적지" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
            {getFeaturedDestinations().map((destination) => <DestinationCard key={destination.id} destination={destination} variant="home" />)}
          </div>
        </div>
      </section>
      <section className="border-y border-slate-100 bg-[#f3f6f4]">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:px-8">
          <div className="relative aspect-[3/2] overflow-hidden rounded-md">
            <TravelImage src="/images/home/kazakhstan-nature-editorial.png" alt="설산과 호수를 담은 카자흐스탄 자연여행 이미지" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" fallbackTitle="설산과 호수를 만나는 여정" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#176753]">엑시투어의 특별한 여정</p>
            <h2 className="mt-3 break-keep text-3xl font-bold leading-snug text-[#172b27] sm:text-4xl">알마티에서 시작하는<br />카자흐스탄 자연여행</h2>
            <p className="mt-5 max-w-lg break-keep text-sm leading-7 text-slate-600 sm:text-base">
              설산, 호수, 캐년을 전용차량과 가이드 동행으로 만납니다. 우리 일행만의 단독 일정부터 조인투어까지, 원하는 여행 형태를 상담해보세요.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#176753]">
              <span>프리미엄 단독 패키지</span><span>단독 데이 투어</span><span>조인투어</span>
            </div>
            <Link href="/kazakhstan" className="mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[#176753] py-2 text-sm font-bold text-[#176753] hover:text-[#0c4536]">
              카자흐스탄 여행 보기<ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <SectionHeading title="여행을 채우는 작은 선택" description="편안한 공항 이동부터 하루를 특별하게 만드는 현지 투어까지." href="/products" label="모든 상품" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[sapaProductCard, ...products.slice(0, 3)].map((product) => <ProductCard key={product.id} product={product} variant="home" />)}
          </div>
        </div>
      </section>
      <section className="bg-[#f7f8f7]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <SectionHeading title="머무는 시간도 여행이니까" description="위치와 객실, 가족 구성에 맞춰 호텔과 리조트를 살펴보세요." href="/hotels" label="모든 호텔" />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.slice(0, 3).map((hotel) => <HotelCard key={hotel.id} hotel={hotel} variant="home" />)}
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-500">실제 요금과 객실 가능 여부는 여행 일정과 예약 조건을 확인한 뒤 안내드립니다.</p>
        </div>
      </section>
      <CTASection variant="home" />
      <FAQSection variant="home" />
    </>
  );
}
