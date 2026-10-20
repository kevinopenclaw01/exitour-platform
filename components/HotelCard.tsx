import Image from "next/image";
import Link from "next/link";
import type { Hotel } from "@/lib/data";
import { ArrowUpRight, MapPin } from "lucide-react";
import TravelImage from "@/components/TravelImage";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function HotelCard({ hotel, variant = "default" }: { hotel: Hotel; variant?: "default" | "home" }) {
  if (variant === "home") {
    return (
      <Link href={`/hotels/${hotel.slug}`} className="group flex h-full min-w-0 flex-col">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-slate-100">
          <TravelImage src={hotel.imageUrl} alt={`${hotel.name} 호텔 이미지`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" fallbackTitle={hotel.name} />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <p className="inline-flex items-center gap-1.5 text-slate-500"><MapPin size={13} aria-hidden="true" />{hotel.destination}</p>
            <span className="font-semibold text-[#8c6c36]">{hotel.grade}</span>
          </div>
          <h3 className="mt-2 text-lg font-bold leading-7 text-[#172b27]">{hotel.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{hotel.summary}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            <p className="text-lg font-bold text-[#172b27]"><span className="mr-2 text-xs font-normal text-slate-500">1박</span>{formatKrw(hotel.priceFromKrw)}원~</p>
            <ArrowUpRight size={18} className="shrink-0 text-slate-400 group-hover:text-[#176753]" aria-hidden="true" />
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={`/hotels/${hotel.slug}`}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={hotel.imageUrl}
          alt={`${hotel.name} 호텔 이미지`}
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-cyan-700">{hotel.destination}</p>
          <span className="rounded-md bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">{hotel.grade}</span>
        </div>
        <h3 className="mt-3 text-xl font-black text-slate-950">{hotel.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{hotel.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {hotel.perks.map((perk) => (
            <span key={perk} className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
              {perk}
            </span>
          ))}
        </div>
        <p className="mt-5 text-lg font-black text-slate-950">1박 {formatKrw(hotel.priceFromKrw)}원~</p>
      </div>
    </Link>
  );
}
