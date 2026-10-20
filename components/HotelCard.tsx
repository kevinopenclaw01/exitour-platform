import Link from "next/link";
import type { Hotel } from "@/lib/data";
import { MapPin } from "lucide-react";
import TravelImage from "@/components/TravelImage";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function HotelCard({ hotel, variant = "default" }: { hotel: Hotel; variant?: "default" | "home" }) {
  return (
    <Link href={`/hotels/${hotel.slug}`} className="tag group flex h-full min-w-0 flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <TravelImage
          src={hotel.imageUrl}
          alt={`${hotel.name} 호텔 이미지`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          fallbackTitle={hotel.name}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="inline-flex items-center gap-1.5 text-muted">
            <MapPin size={14} aria-hidden="true" />
            {hotel.destination}
          </p>
          <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-semibold text-cobalt">{hotel.grade}</span>
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink group-hover:text-cobalt">{hotel.name}</h3>
        <p className={"mt-2 text-sm leading-6 text-slate-600 " + (variant === "home" ? "line-clamp-2" : "")}>{hotel.summary}</p>
        {variant === "default" ? (
          <p className="mt-3 text-sm text-slate-700">{hotel.perks.join(", ")}</p>
        ) : null}
        <p className="tag-perf mt-auto pt-4 text-right">
          <span className="mr-2 text-sm text-muted">1박</span>
          <span className="num text-xl font-bold text-ink">{formatKrw(hotel.priceFromKrw)}</span>
          <span className="ml-0.5 text-sm font-medium text-ink">원~</span>
        </p>
      </div>
    </Link>
  );
}
