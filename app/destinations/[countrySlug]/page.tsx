import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationCard from "@/components/DestinationCard";
import HotelCard from "@/components/HotelCard";
import ProductCard from "@/components/ProductCard";
import {
  BulletList,
  ConsultationCTA,
  FAQList,
  InfoBlock,
  PageHero,
} from "@/components/DetailSections";
import {
  countries,
  destinations,
  getCountryBySlug,
  getHotelsForCountry,
  getProductsForCountry,
} from "@/lib/data";
import { guamTransferProductCard } from "@/lib/mock/guamTransfer";

type CountryPageProps = {
  params: Promise<{ countrySlug: string }>;
};

export function generateStaticParams() {
  return countries.map((country) => ({
    countrySlug: country.slug,
  }));
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    return {
      title: "국가를 찾을 수 없습니다 | EXITour",
    };
  }

  return {
    title: `${country.name} 여행 | EXITour`,
    description: country.summary,
  };
}

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);

  if (!country) {
    notFound();
  }

  const countryCities = destinations.filter((destination) => destination.countrySlug === country.slug);
  const countryProducts = getProductsForCountry(country.slug);
  const visibleCountryProducts = country.slug === "guam" ? [guamTransferProductCard, ...countryProducts] : countryProducts;
  const countryHotels = getHotelsForCountry(country.slug);

  return (
    <>
      <PageHero
        eyebrow="Destination Country"
        title={`${country.name} 여행`}
        description={`${country.headline}. ${country.summary}`}
        meta={[country.season, ...country.travelStyles]}
      />

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <InfoBlock title="추천 여행 스타일">
            <BulletList items={country.travelStyles} />
          </InfoBlock>
          <InfoBlock title="대표 도시 목록">
            <div className="grid gap-3 sm:grid-cols-2">
              {countryCities.map((city) => (
                <Link
                  key={city.id}
                  href={`/destinations/${city.countrySlug}/${city.citySlug}`}
                  className="rounded-md border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-700"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </InfoBlock>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">도시 여행 가이드</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {countryCities.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-950">해당 국가 상품</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCountryProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {countryHotels.length > 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight text-slate-950">해당 국가 호텔</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {countryHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-8 px-5 py-14 sm:px-6 lg:px-8">
          <FAQList faqs={country.faqs} />
          <ConsultationCTA
            title={`${country.name} 맞춤 견적을 받아보세요`}
            description="여행일, 인원, 호텔 등급, 필요한 서비스를 남기면 상담 기준으로 국가별 추천 일정을 정리할 수 있습니다."
            label="맞춤 견적 요청하기"
          />
        </div>
      </section>
    </>
  );
}
