import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import ProductCard from "@/components/ProductCard";
import {
  BulletList,
  ConsultationCTA,
  FAQList,
  InfoBlock,
  NumberedList,
  PageHero,
} from "@/components/DetailSections";
import {
  destinations,
  getDestinationBySlugs,
  getHotelsForCity,
  getProductsForCity,
} from "@/lib/data";
import { danangRentcarProductCard } from "@/lib/mock/danangRentcar";
import { danangTransferProductCard } from "@/lib/mock/danangTransfer";
import { availableKazakhstanProductCards } from "@/lib/mock/kazakhstanPremium";

type CityPageProps = {
  params: Promise<{ countrySlug: string; citySlug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({
    countrySlug: destination.countrySlug,
    citySlug: destination.citySlug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { countrySlug, citySlug } = await params;
  const destination = getDestinationBySlugs(countrySlug, citySlug);

  if (!destination) {
    return {
      title: "도시를 찾을 수 없습니다 | EXITour",
    };
  }

  return {
    title: `${destination.name} 여행 가이드 | EXITour`,
    description: destination.summary,
  };
}

export default async function CityDetailPage({ params }: CityPageProps) {
  const { countrySlug, citySlug } = await params;
  const destination = getDestinationBySlugs(countrySlug, citySlug);

  if (!destination) {
    notFound();
  }

  const cityProducts = getProductsForCity(countrySlug, citySlug);
  const visibleCityProducts =
    countrySlug === "vietnam" && citySlug === "danang"
      ? [danangRentcarProductCard, danangTransferProductCard, ...cityProducts]
      : countrySlug === "kazakhstan" && citySlug === "almaty"
        ? [...availableKazakhstanProductCards, ...cityProducts]
      : cityProducts;
  const cityHotels = getHotelsForCity(countrySlug, citySlug);

  return (
    <>
      <PageHero
        eyebrow="City Guide"
        title={`${destination.name} 여행 가이드`}
        description={destination.guide}
        meta={[destination.country, destination.season, destination.flightTime, ...destination.bestFor]}
      />

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
          <InfoBlock title="대표 명소">
            <BulletList items={destination.attractions} />
          </InfoBlock>
          <InfoBlock title="공항/이동 정보">
            <p>{destination.transferInfo}</p>
          </InfoBlock>
          <InfoBlock title="추천 일정">
            <NumberedList items={destination.itinerary} />
          </InfoBlock>
          <InfoBlock title="가족여행 팁">
            <BulletList items={destination.familyTips} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">해당 도시 상품</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCityProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {cityHotels.length > 0 ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">해당 도시 호텔</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cityHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={destination.faqs} />
          <ConsultationCTA
            title={`${destination.name} 일정 상담을 시작해보세요`}
            description="호텔, 차량, 투어, 휴식 시간을 여행자 조건에 맞춰 조합할 수 있도록 견적 요청 화면으로 연결합니다."
            label="상담 요청하기"
          />
        </div>
      </section>
    </>
  );
}
