import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, Compass, Plane, UsersRound } from "lucide-react";
import { FAQList, BulletList } from "@/components/DetailSections";
import TravelImage from "@/components/TravelImage";
import DestinationGrid from "@/components/travel/DestinationGrid";
import { buildQuoteUrl } from "@/lib/quote/prefill";
import { destinationPath, getTravelCategory, getTravelDestinations, travelFaqs, type TravelCategoryId, type TravelDestination } from "@/lib/travel/catalog";

export const travelContainer = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

export function travelMetadata(categoryId: TravelCategoryId, destination?: TravelDestination): Metadata {
  const category = getTravelCategory(categoryId);
  const path = destination ? destinationPath(categoryId, destination) : `/${categoryId}`;
  const title = `${destination ? `${destination.name} ` : ""}${category.name} | EXITour`;
  const description = destination
    ? `${categoryId === "packages" ? destination.packageSummary : destination.activitySummary} ${category.accommodation}. 지역별 일정과 이용 조건을 상담합니다.`
    : `${category.shortDescription}. ${category.accommodation}. ${getTravelDestinations(categoryId).map((item) => item.name).join("·")} 여행을 상담하세요.`;
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path, images: [category.image] } };
}

export function TravelConsultation({ category, destination, sourcePath = "/" }: { category?: TravelCategoryId; destination?: TravelDestination; sourcePath?: string }) {
  const categoryInfo = category ? getTravelCategory(category) : undefined;
  const href = buildQuoteUrl({ destination: destination ? `${destination.countryName} - ${destination.name}` : undefined, service: categoryInfo?.name, sourcePath });
  return (
    <section className="border-y border-line bg-paper">
      <div className={`${travelContainer} flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between`}>
        <div className="max-w-2xl">
          <h2 className="display text-2xl tracking-normal sm:text-3xl">{destination ? `${destination.name}, 우리 여행을 이야기해 주세요` : "어떤 여행을 생각하고 계신가요?"}</h2>
          <p className="mt-3 text-base leading-7 text-muted">날짜와 인원, 원하는 여행 방식을 남겨주세요. 가능한 일정과 이용 조건부터 함께 확인하겠습니다.</p>
          <p className="mt-2 text-sm leading-6 text-muted">상담 접수 후 담당자가 안내드립니다. 예약·결제가 바로 확정되지는 않습니다.</p>
        </div>
        <Link href={href} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start rounded-md bg-signal px-6 py-3 text-sm font-bold text-ink hover:bg-signal-hover">여행 상담하기<ArrowRight size={18} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

export function TravelComparison() {
  const rows = [
    { label: "가이드", packages: "우리 그룹 전담 가이드 동행", activities: "여행 전체 전담 가이드 없음" },
    { label: "일정", packages: "일정·동선을 상담하며 맞춤 구성", activities: "직접 짠 일정에 서비스만 추가" },
    { label: "선택", packages: "일행만의 여행을 한 번에 상담", activities: "렌터카·이동·현지 투어를 개별 선택" },
    { label: "호텔·항공", packages: "불포함 · 원하는 분만 대행 상담", activities: "별도로 준비" },
  ];
  return (
    <section className="bg-white">
      <div className={`${travelContainer} py-14 sm:py-16`}>
        <h2 className="display text-3xl tracking-normal sm:text-4xl">같은 자유여행, 다른 방식</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">우리 그룹만의 가이드가 필요한지, 필요한 서비스만 고를지에 따라 선택하세요.</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-left text-sm sm:text-base">
            <caption className="sr-only">우리끼리 맞춤 패키지와 내맘대로 단품 투어 비교</caption>
            <thead className="border-y-2 border-ink">
              <tr><th scope="col" className="w-[18%] py-4 pr-2">구분</th><th scope="col" className="w-[41%] px-2 py-4 text-navy sm:px-5">우리끼리 맞춤 패키지</th><th scope="col" className="px-2 py-4 sm:px-5">내맘대로 단품 투어</th></tr>
            </thead>
            <tbody>{rows.map((row) => <tr key={row.label} className="border-b border-line align-top"><th scope="row" className="py-4 pr-2 font-semibold">{row.label}</th><td className="px-2 py-4 leading-6 text-muted sm:px-5">{row.packages}</td><td className="px-2 py-4 leading-6 text-muted sm:px-5">{row.activities}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">맞춤 패키지는 현지인 가이드 또는 한국어 가능 가이드가 동행합니다. 단품 서비스의 기사·현장 안내 포함 여부는 각각의 이용 조건에 따라 안내드립니다.</p>
      </div>
    </section>
  );
}

export function TravelFAQ() {
  return (
    <section className="bg-white">
      <div className={`${travelContainer} grid gap-8 py-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16`}>
        <h2 className="display text-3xl tracking-normal">출발 전에 많이 묻는 것</h2>
        <FAQList faqs={travelFaqs} />
      </div>
    </section>
  );
}

export function CategoryPage({ category: categoryId }: { category: TravelCategoryId }) {
  const category = getTravelCategory(categoryId);
  const policies = [
    { Icon: categoryId === "packages" ? UsersRound : Compass, title: "가이드", body: category.guide },
    { Icon: Check, title: "여행 방식", body: category.itinerary },
    { Icon: Plane, title: "호텔·항공", body: category.accommodation },
  ];
  return (
    <>
      <section className="bg-white">
        <div className={`${travelContainer} py-10 sm:py-14`}>
          <Link href="/" className="text-sm text-muted underline">홈</Link>
          <h1 className="display mt-6 text-3xl tracking-normal sm:text-5xl">{category.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{category.description}</p>
          <ul className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-3">
            {policies.map(({ Icon, title, body }) => <li key={title}><Icon size={22} className="mb-3 text-navy" aria-hidden="true" /><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted">{body}</p></li>)}
          </ul>
          <p className="mt-6 text-sm leading-6 text-muted">{categoryId === "packages" ? "가이드는 현지인 또는 한국어가 가능한 가이드입니다. 한국인 가이드 동행을 기본 조건으로 하지 않으며, 사용 언어와 배정 조건은 상담 시 확인합니다." : "여행 전체를 동행하는 전담 가이드가 없는 방식입니다. 개별 투어의 기사·현장 진행 인력이나 안내 포함 여부는 서비스별로 확인합니다."}</p>
        </div>
        <div className="relative h-44 sm:h-64"><TravelImage src={category.image} alt={category.imageAlt} fill sizes="100vw" className="object-cover" fallbackTitle={category.name} /></div>
      </section>
      <section id="destinations" className="scroll-mt-24 bg-paper">
        <div className={`${travelContainer} py-14`}>
          <h2 className="display text-3xl tracking-normal">어디로 떠나고 싶으세요?</h2>
          <p className="mb-8 mt-4 text-base leading-7 text-muted">여행지별로 상세 상품을 준비하고 있습니다. 우선 지역 안내를 살펴보고 원하는 일정과 서비스를 상담해 주세요.</p>
          <DestinationGrid category={categoryId} />
        </div>
      </section>
      <TravelConsultation category={categoryId} sourcePath={`/${categoryId}`} />
      <TravelFAQ />
    </>
  );
}

export function DestinationPage({ category: categoryId, destination }: { category: TravelCategoryId; destination: TravelDestination }) {
  const category = getTravelCategory(categoryId);
  const isPackage = categoryId === "packages";
  const ideas = (isPackage ? destination.packageIdeas : destination.activityIdeas) ?? [];
  const image = destination.city === "sapa" ? "/images/sapa/sapa-terraces-hero.png" : destination.city === "almaty" ? "/images/home/kazakhstan-nature-editorial.png" : undefined;
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className={`${travelContainer} py-10 sm:py-14`}>
          <nav aria-label="현재 위치" className="flex flex-wrap items-center gap-2 text-sm text-muted"><Link href="/" className="underline">홈</Link><span aria-hidden="true">/</span><Link href={`/${categoryId}`} className="underline">{category.name}</Link><span aria-hidden="true">/</span><span>{destination.countryName}</span></nav>
          <h1 className="display mt-8 text-3xl tracking-normal sm:text-5xl">{destination.name}<br /><span className="mt-3 block text-2xl sm:text-3xl">{category.name}</span></h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{isPackage ? destination.packageSummary : destination.activitySummary}</p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{category.description}</p>
        </div>
        {image ? <div className="relative h-52 sm:h-72"><TravelImage src={image} alt={`${destination.name} 자연 여행 풍경`} fill sizes="100vw" className="object-cover" fallbackTitle={destination.name} /></div> : null}
      </section>
      <div className={`${travelContainer} grid gap-12 py-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16`}>
        <section>
          <h2 className="text-2xl font-bold">{isPackage ? "이런 여행을 함께 준비합니다" : "필요한 서비스부터 이야기해 주세요"}</h2>
          <p className="mb-5 mt-4 text-base leading-7 text-muted">{isPackage ? "아래는 상담할 수 있는 여행 방향입니다. 확정된 상품 일정이 아니라 일행의 취향과 현지 조건을 확인하는 출발점입니다." : "아래 항목은 상담 가능한 서비스 유형입니다. 상세 상품과 이용 조건, 제공 가능 여부는 확인 후 안내드립니다."}</p>
          <BulletList items={ideas} />
          <p className="mt-6 border-l-2 border-navy pl-4 text-sm leading-7 text-muted">{destination.consultationNote}</p>
        </section>
        <section className="border-t-2 border-ink pt-5">
          <h2 className="text-xl font-bold">상담 전 확인해 주세요</h2>
          <dl className="mt-4 divide-y divide-line text-sm">
            <div className="py-3"><dt className="font-bold">가이드</dt><dd className="mt-2 leading-6 text-muted">{category.guide}. {isPackage ? "현지인 또는 한국어 가능 가이드로 안내하며, 언어와 배정 조건은 상담 시 확인합니다." : "기사·현장 안내 포함 여부는 개별 서비스마다 다릅니다."}</dd></div>
            <div className="py-3"><dt className="font-bold">호텔·항공</dt><dd className="mt-2 leading-6 text-muted">{category.accommodation}</dd></div>
            <div className="py-3"><dt className="font-bold">요금·포함사항</dt><dd className="mt-2 leading-6 text-muted">일정, 인원과 필요한 서비스를 확인한 뒤 안내합니다. 식사·입장료·이동 등 구체적인 포함 내역은 상담 견적에서 확인해 주세요.</dd></div>
          </dl>
        </section>
      </div>
      <TravelConsultation category={categoryId} destination={destination} sourcePath={destinationPath(categoryId, destination)} />
      <div className={`${travelContainer} py-10`}><Link href={`/${categoryId}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-navy">다른 여행지 둘러보기<ArrowRight size={16} aria-hidden="true" /></Link></div>
    </>
  );
}
