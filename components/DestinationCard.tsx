import Image from "next/image";
import type { Destination } from "@/lib/data";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name} 여행 이미지`}
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-cyan-700">{destination.country}</p>
          <p className="text-xs font-semibold text-slate-500">{destination.season}</p>
        </div>
        <h3 className="mt-2 text-xl font-black text-slate-950">{destination.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{destination.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {destination.bestFor.map((tag) => (
            <span key={tag} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs font-semibold text-slate-500">비행/이동: {destination.flightTime}</p>
      </div>
    </article>
  );
}
