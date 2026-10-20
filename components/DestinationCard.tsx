import Link from "next/link";
import type { Destination } from "@/lib/data";
import { getAirportCode } from "@/lib/airportCodes";
import TravelImage from "@/components/TravelImage";

type DestinationCardProps = {
  destination: Destination & {
    href?: string;
  };
  variant?: "default" | "home";
};

// 수하물 태그 모양 목적지 카드. 공항 코드가 있는 곳은 코드를 크게, 없는 곳은 지명을 크게 쓴다.
export default function DestinationCard({ destination, variant = "default" }: DestinationCardProps) {
  const href = destination.href ?? `/destinations/${destination.countrySlug}/${destination.citySlug}`;
  const airport = getAirportCode(destination.id);

  if (variant === "home") {
    return (
      <Link
        href={href}
        className="tag tag-hole group flex h-full min-w-0 flex-col px-5 pb-5 pt-12 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none"
      >
        <p className="text-xs font-medium text-muted">{destination.country}</p>
        {airport ? (
          <p className="code mt-2 text-[4.25rem] text-ink transition-colors group-hover:text-navy" aria-hidden="true">
            {airport.code}
          </p>
        ) : null}
        <h3 className="display mt-2 text-2xl text-ink">{destination.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{destination.summary}</p>
        <dl className="tag-perf mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 pt-4 text-xs">
          <dt className="text-muted">비행</dt>
          <dd className="font-medium text-ink">{destination.flightTime}</dd>
          <dt className="text-muted">좋은 때</dt>
          <dd className="font-medium text-ink">{destination.season}</dd>
        </dl>
      </Link>
    );
  }

  return (
    <Link href={href} className="tag group flex h-full flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <TravelImage
          src={destination.imageUrl}
          alt={`${destination.name} 여행 이미지`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          fallbackTitle={destination.name}
        />
        {airport ? (
          <span className="code absolute bottom-3 left-3 rounded-md bg-white px-2.5 pb-1 pt-1.5 text-3xl text-ink" aria-hidden="true">
            {airport.code}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-muted">{destination.country}</p>
        <h3 className="display mt-1 text-2xl text-ink group-hover:text-navy">{destination.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{destination.summary}</p>
        <p className="mt-4 text-sm text-slate-700">{destination.bestFor.join(", ")}</p>
        <dl className="tag-perf mt-auto grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 pt-4 text-xs">
          <dt className="text-muted">비행</dt>
          <dd className="font-medium text-ink">{destination.flightTime}</dd>
          <dt className="text-muted">좋은 때</dt>
          <dd className="font-medium text-ink">{destination.season}</dd>
        </dl>
      </div>
    </Link>
  );
}
