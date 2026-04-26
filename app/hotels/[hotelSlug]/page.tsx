import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BulletList,
  ConsultationCTA,
  InfoBlock,
  PageHero,
} from "@/components/DetailSections";
import { formatKrw, getHotelBySlug, hotels } from "@/lib/data";

type HotelPageProps = {
  params: Promise<{ hotelSlug: string }>;
};

export function generateStaticParams() {
  return hotels.map((hotel) => ({
    hotelSlug: hotel.slug,
  }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { hotelSlug } = await params;
  const hotel = getHotelBySlug(hotelSlug);

  if (!hotel) {
    return {
      title: "호텔을 찾을 수 없습니다 | EXITour",
    };
  }

  return {
    title: `${hotel.name} | EXITour 호텔 특가`,
    description: hotel.summary,
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const { hotelSlug } = await params;
  const hotel = getHotelBySlug(hotelSlug);

  if (!hotel) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Hotel Deal"
        title={hotel.name}
        description={hotel.summary}
        meta={[
          hotel.city,
          hotel.grade,
          hotel.isContractedDeal ? "계약 특가" : "상담 가능",
          ...hotel.badges,
        ]}
      />

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <Image
              src={hotel.imageUrl}
              alt={`${hotel.name} 대표 이미지`}
              width={1000}
              height={760}
              className="h-full min-h-80 w-full object-cover"
              priority
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <InfoBlock title="가격 안내">
              <p className="text-2xl font-black text-slate-950">1박 {formatKrw(hotel.priceFromKrw)}원~</p>
              <p className="mt-2">{hotel.priceNote}</p>
            </InfoBlock>
            <InfoBlock title="조식 여부">
              <p>{hotel.breakfast}</p>
            </InfoBlock>
            <InfoBlock title="객실 타입">
              <BulletList items={hotel.roomTypes} />
            </InfoBlock>
            <InfoBlock title="추천 대상">
              <BulletList items={hotel.recommendedFor} />
            </InfoBlock>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <InfoBlock title="주변 명소">
            <BulletList items={hotel.nearbyAttractions} />
          </InfoBlock>
          <InfoBlock title="계약 혜택">
            <BulletList items={hotel.perks} />
          </InfoBlock>
          <InfoBlock title="취소 규정">
            <BulletList items={hotel.cancellationPolicy} />
          </InfoBlock>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <ConsultationCTA
            title="호텔 특가와 객실 가능 여부를 확인해보세요"
            description="계약 특가는 날짜, 객실 타입, 조식 조건에 따라 달라집니다. 여행일과 인원을 남기면 상담 기준 견적으로 정리할 수 있습니다."
            label="호텔 특가 문의하기"
          />
        </div>
      </section>
    </>
  );
}
