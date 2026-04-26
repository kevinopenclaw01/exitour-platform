import Image from "next/image";
import type { Hotel } from "@/lib/data";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={hotel.imageUrl}
          alt={`${hotel.name} 호텔 이미지`}
          width={800}
          height={600}
          className="h-full w-full object-cover"
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
    </article>
  );
}
