import Link from "next/link";
import Image from "next/image";
import CTASection from "@/components/CTASection";
import DestinationCard from "@/components/DestinationCard";
import FAQSection from "@/components/FAQSection";
import HotelCard from "@/components/HotelCard";
import ProductCard from "@/components/ProductCard";
import { destinations, hotels, products, type Destination } from "@/lib/data";

const featuredDestinationOrder = ["danang", "bohol", "boracay", "guam", "nha-trang", "kazakhstan"];

const getFeaturedDestinations = () =>
  featuredDestinationOrder
    .map((id) => destinations.find((destination) => destination.id === id))
    .filter((destination): destination is Destination => Boolean(destination))
    .map((destination) =>
      destination.id === "kazakhstan"
        ? {
            ...destination,
            href: "/kazakhstan",
            country: "카자흐스탄",
            name: "카자흐스탄",
            summary: "알마티에서 시작하는 설산, 호수, 캐년, 사막의 프리미엄 프라이빗 자연여행",
            bestFor: ["프리미엄", "전용차량", "가이드동행"],
            season: "4월-10월 또는 상담 후 안내",
            flightTime: "장거리 자연여행 / 상담형 일정",
          }
        : destination,
    );

export default function Home() {
  const featuredDestinations = getFeaturedDestinations();
  const featuredProducts = products.slice(0, 4);
  const featuredHotels = hotels.slice(0, 3);

  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-black text-cyan-700">프리미엄 맞춤 여행 상담</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              한국인에게 편안한 속도로 설계하는 EXITour 여행
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              필리핀, 베트남, 괌, 두바이, 카자흐스탄, 유럽까지 호텔과 차량, 투어, 현지 케어를 하나의 일정으로 정리합니다. 정해진 패키지가 아니라 우리 가족에게 맞는 여행을 만듭니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                견적 요청하기
              </Link>
              <Link href="/destinations" className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                목적지 둘러보기
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-lg bg-slate-200 sm:translate-y-8">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                alt="프리미엄 해변 여행"
                width={900}
                height={720}
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-lg bg-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80"
                  alt="프리미엄 리조트 객실"
                  width={900}
                  height={520}
                  className="h-44 w-full object-cover"
                />
              </div>
              <div className="rounded-lg bg-cyan-50 p-5">
                <p className="text-3xl font-black text-slate-950">15+</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">주요 목적지별 호텔, 차량, 투어 샘플 데이터를 기반으로 상담 흐름을 준비했습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-cyan-700">Destinations</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">주요 목적지</h2>
            </div>
            <Link href="/destinations" className="text-sm font-black text-slate-950 underline underline-offset-4">전체 보기</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-cyan-700">Products</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">인기 상품</h2>
            </div>
            <Link href="/products" className="text-sm font-black text-slate-950 underline underline-offset-4">전체 보기</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-cyan-700">Hotels</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">계약 호텔 특가</h2>
            </div>
            <Link href="/hotels" className="text-sm font-black text-slate-950 underline underline-offset-4">전체 보기</Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <FAQSection />
    </>
  );
}
