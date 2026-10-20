import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CarFront, Check, Mountain, Phone, Users, Utensils } from "lucide-react";
import { BulletList, FAQList } from "@/components/DetailSections";
import TravelImage from "@/components/TravelImage";
import SapaItinerary from "@/components/sapa/SapaItinerary";
import { sapaDays, sapaFaqs, sapaPackage as product, sapaQuoteUrl } from "@/lib/mock/sapaPackage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://exitour.co.kr";
const canonical = `${siteUrl.replace(/\/$/, "")}${product.canonicalPath}`;

export function generateMetadata(): Metadata {
  return {
    title: "사파 3박 5일 단독 패키지｜판시팡·깟깟마을·하노이 반일투어 | EXITour",
    description: `${product.summary} 성인 4인 기준 1인 기본요금 69만 원, 항공권·호텔 별도.`,
    alternates: { canonical: product.canonicalPath },
    openGraph: { title: product.title, description: product.summary, url: canonical, images: [{ url: product.hero.src, width: 1536, height: 1024, alt: product.hero.alt }] },
  };
}

const structuredData = [
  { "@context": "https://schema.org", "@type": "Service", name: product.title, description: product.summary,
    url: canonical, image: `${siteUrl.replace(/\/$/, "")}${product.hero.src}`, areaServed: { "@type": "Place", name: "Sapa, Hanoi, Vietnam" },
    provider: { "@type": "TravelAgency", name: "EXITour", url: siteUrl },
    offers: { "@type": "Offer", url: canonical, price: product.price.amountKrw, priceCurrency: "KRW", description: product.price.note,
      priceSpecification: { "@type": "UnitPriceSpecification", price: product.price.amountKrw, priceCurrency: "KRW", unitText: "성인 4인 출발 기준 성인 1인" } } },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: sapaFaqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "홈", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "베트남", item: `${siteUrl}/destinations/vietnam` },
    { "@type": "ListItem", position: 3, name: "사파", item: `${siteUrl}/destinations/vietnam/sapa` },
    { "@type": "ListItem", position: 4, name: product.title, item: canonical },
  ] },
];

const container = "mx-auto max-w-6xl px-5 sm:px-6 lg:px-8";
const sectionTitle = "break-keep text-2xl font-bold leading-snug text-ink sm:text-3xl";

export default function SapaPrivatePackagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <TravelImage src={product.hero.src} alt={product.hero.alt} fill preload sizes="100vw" className="object-cover object-center" fallbackTitle="" fallbackClassName="bg-ink" />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className={`${container} relative w-full py-12 sm:py-16 lg:py-20`}>
          <nav aria-label="현재 위치" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-white/90">
            <Link href="/destinations/vietnam" className="hover:underline">베트남</Link><span>/</span><Link href="/destinations/vietnam/sapa" className="hover:underline">사파</Link><span>/</span><span>단독 패키지</span>
          </nav>
          <p className="text-sm font-semibold">EXITour · 베트남 북부 단독여행</p>
          <h1 className="mt-4 max-w-3xl break-keep text-3xl font-bold leading-tight sm:text-5xl">사파 3박 5일<br />단독 패키지</h1>
          <p className="mt-5 max-w-xl break-keep text-lg font-medium leading-8 sm:text-xl">{product.subtitle}</p>
          <p className="mt-4 max-w-xl break-keep text-sm leading-7 text-white/95">{product.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={sapaQuoteUrl} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-cyan-50">사파 일정 상담<ArrowRight size={17} aria-hidden="true" /></Link>
            <a href="#itinerary" className="inline-flex min-h-12 items-center rounded-md border border-white/70 px-5 py-3 text-sm font-semibold hover:bg-white/10">5일 일정 보기</a>
          </div>
          <p className="mt-8 text-xs text-white/85">{product.hero.caption}</p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white" aria-label="상품 핵심 정보">
        <dl className={`${container} grid grid-cols-2 gap-x-6 gap-y-5 py-7 md:grid-cols-4`}>
          {[
            { icon: Users, label: "여행 형태", value: "성인 4인 기준 단독여행" },
            { icon: CarFront, label: "이동·안내", value: "전용차량·한국어 현지 가이드" },
            { icon: Mountain, label: "주요 코스", value: "판시팡·깟깟마을·하노이" },
            { icon: Utensils, label: "예약 방식", value: "항공·호텔 별도 선택" },
          ].map(({ icon: Icon, label, value }) => <div key={label} className="min-w-0"><dt className="flex items-center gap-2 text-xs text-slate-500"><Icon size={17} className="shrink-0 text-navy" aria-hidden="true" />{label}</dt><dd className="mt-2 break-keep text-sm font-semibold leading-6 text-ink">{value}</dd></div>)}
        </dl>
      </section>

      <section className="bg-white">
        <div className={`${container} grid gap-8 py-12 lg:grid-cols-[1fr_320px] lg:gap-12 lg:py-16`}>
          <div>
            <p className="text-xs font-semibold text-navy">우리 일행의 속도로 떠나는 사파</p>
            <h2 className={`${sectionTitle} mt-3`}>함께하는 사람에 맞춰,<br />산과 마을 사이를 천천히</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">다른 팀과 일정을 맞추지 않아도 되는 단독여행입니다. 산악 풍경을 보는 시간, 마을을 걷는 시간, 이동 중 쉬어가는 시간을 가이드와 함께 조율합니다. 기본 코스를 바꾸고 싶다면 예약 전에 알려주세요.</p>
            <ul className="mt-6 grid gap-3 text-sm font-medium text-slate-700 sm:grid-cols-2">{product.highlights.map((text) => <li key={text} className="flex gap-2"><Check size={18} className="shrink-0 text-navy" aria-hidden="true" />{text}</li>)}</ul>
          </div>
          <aside className="self-start rounded-md border border-cyan-200 bg-cyan-50 p-6" aria-label="기본요금 안내">
            <p className="text-sm font-semibold text-navy">성인 4인 출발 기준 · 성인 1인</p>
            <p className="mt-3 text-3xl font-bold text-ink">690,000<span className="ml-1 text-base">원부터</span></p>
            <p className="mt-2 text-sm text-slate-600">4인 기본 합계 2,760,000원</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{product.price.note}</p>
            <Link href={sapaQuoteUrl} className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-md bg-navy px-4 py-3 text-sm font-bold text-white hover:bg-[#0c4536]">여행일별 견적 요청<ArrowRight size={16} aria-hidden="true" /></Link>
          </aside>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-paper">
        <div className={`${container} py-12 lg:py-16`}>
          <h2 className={sectionTitle}>구름 위의 풍경을 만나는 시간</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">판시팡의 조망은 날씨에 따라 달라집니다. 맑은 날의 산 능선도, 안개가 흐르는 산길도 무리하지 않는 일정으로 만납니다.</p>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">{product.gallery.map((photo) => <figure key={photo.src}><div className="relative aspect-[16/9] overflow-hidden rounded-md"><TravelImage src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" fallbackTitle="판시팡의 산과 구름" /></div><figcaption className="mt-3 text-xs leading-6 text-slate-500">{photo.caption}</figcaption></figure>)}</div>
          <div className="mt-8 grid gap-6 border-t border-slate-200 pt-7 md:grid-cols-3">
            {[
              ["판시팡", "열차·케이블카·트램을 연결하는 산악 코스. 시설 운영과 건강 상태를 확인해 이동합니다."],
              ["깟깟마을과 사파", "마을길과 전망 카페, 광장·성당·재래시장까지. 걷는 구간은 일행의 체력에 맞춰 상담합니다."],
              ["하노이 반일투어", "호안끼엠 구시가지와 응옥선 사당, 전신마사지 90분. 귀국편에 맞춰 공항까지 연결합니다."],
            ].map(([title, description]) => <article key={title}><h3 className="text-lg font-bold text-ink">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="itinerary" className="scroll-mt-24 bg-white">
        <div className={`${container} max-w-4xl py-12 lg:py-16`}>
          <p className="text-xs font-semibold text-navy">하노이 입국 · 사파 호텔 3박 · 심야 귀국편</p>
          <h2 className={`${sectionTitle} mt-3`}>3박 5일, 이렇게 여행합니다</h2>
          <p className="mb-7 mt-4 text-sm leading-7 text-slate-600">낮 도착·심야 출발 항공편 기준 예시 일정입니다. 호텔은 Day 1~3 총 3박이며 마지막 밤은 기내박입니다. 항공 시간, 날씨, 교통과 시설 운영에 따라 방문 순서·체류 시간은 조정될 수 있습니다.</p>
          <SapaItinerary days={sapaDays} />
        </div>
      </section>

      <section className="bg-paper">
        <div className={`${container} py-12 lg:py-16`}>
          <h2 className={sectionTitle}>포함 범위를 먼저 확인해주세요</h2>
          <div className="mt-7 grid gap-8 md:grid-cols-2">
            <div><h3 className="mb-4 text-lg font-bold text-navy">포함사항</h3><BulletList items={[...product.includes]} /></div>
            <div><h3 className="mb-4 text-lg font-bold text-slate-800">불포함사항</h3><BulletList items={[...product.excludes]} /></div>
          </div>
          <div className="mt-8 grid gap-7 border-t border-slate-200 pt-7 md:grid-cols-2">
            <div><h3 className="text-lg font-bold text-ink">호텔은 취향에 맞게 선택</h3><p className="mt-3 text-sm leading-7 text-slate-600">기본요금은 지상 일정 기준이며 사파 호텔 3박은 별도입니다. 이미 예약한 호텔이 있다면 위치를 알려주세요. 숙박·조식 포함 여부와 픽업 동선을 함께 확인합니다.</p></div>
            <div><h3 className="text-lg font-bold text-ink">현지식부터 삼겹살까지</h3><p className="mt-3 text-sm leading-7 text-slate-600">일정표상 현지식과 삼겹살, 하노이 분짜 등으로 식사를 구성합니다. 식사 횟수·메뉴와 알레르기 대응은 최종 견적서에서 확정하며, 특정 식당은 보장하지 않습니다. 호텔 조식은 별도 예약 조건입니다.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${container} grid gap-8 py-12 md:grid-cols-2 lg:py-16`}>
          <div><h2 className="mb-5 text-2xl font-bold text-ink">준비물</h2><BulletList items={[...product.preparation]} /></div>
          <div><h2 className="mb-5 text-2xl font-bold text-ink">이용 전 확인사항</h2><BulletList items={[...product.notices]} /></div>
          <div className="border-t border-slate-200 pt-6 md:col-span-2"><h2 className="text-lg font-bold text-ink">예약·취소·변경 안내</h2><p className="mt-3 text-sm leading-7 text-slate-600">{product.cancellation}</p></div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-paper">
        <div className={`${container} py-12 lg:py-16`}><h2 className={`${sectionTitle} mb-7`}>출발 전에 궁금한 점</h2><FAQList faqs={sapaFaqs} /></div>
      </section>

      <section className="bg-navy text-white">
        <div className={`${container} py-12 lg:py-16`}>
          <p className="text-sm font-semibold text-cyan-200">EXITour 사파 여행 상담</p>
          <h2 className="mt-3 break-keep text-2xl font-bold leading-snug sm:text-3xl">여행일과 일행을 알려주세요</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90">희망 출발일, 성인·아동 인원, 항공편, 사파 숙소와 원하는 코스를 남겨주세요. 상품 정보가 자동 입력된 견적 요청으로 연결됩니다.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={sapaQuoteUrl} className="inline-flex min-h-12 items-center gap-3 rounded-md bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-cyan-50">사파 맞춤 견적 요청<ArrowRight size={17} aria-hidden="true" /></Link>
            <a href={product.storeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-md border border-white/70 px-5 py-3 text-sm font-semibold hover:bg-white/10">네이버 상품·문의 보기</a>
            <a href="tel:01059342629" className="inline-flex min-h-12 items-center gap-2 px-2 py-3 text-sm font-semibold"><Phone size={17} aria-hidden="true" />010-5934-2629</a>
          </div>
          <p className="mt-5 text-sm text-white/85">카카오톡 ID: exitouroffice 또는 exitour1</p>
        </div>
      </section>
    </>
  );
}
