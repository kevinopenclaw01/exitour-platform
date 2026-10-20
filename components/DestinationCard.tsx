import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import TravelImage from "@/components/TravelImage";

type DestinationCardProps = {
  destination: Destination & {
    href?: string;
  };
  variant?: "default" | "home";
};

export default function DestinationCard({ destination, variant = "default" }: DestinationCardProps) {
  const href = destination.href ?? `/destinations/${destination.countrySlug}/${destination.citySlug}`;

  if (variant === "home") {
    return (
      <Link href={href} className="group block min-w-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-slate-100">
          <TravelImage src={destination.imageUrl} alt={`${destination.name} 여행 이미지`} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" fallbackTitle={destination.name} />
        </div>
        <div className="pt-3 sm:pt-4">
          <p className="text-xs font-medium text-[#176753]">{destination.country}</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-[#172b27] sm:text-xl">{destination.name}</h3>
            <ArrowUpRight size={18} className="shrink-0 text-slate-400 transition group-hover:text-[#176753]" aria-hidden="true" />
          </div>
          <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">{destination.summary}</p>
          <p className="mt-2 truncate text-xs font-medium text-slate-600">{destination.bestFor.slice(0, 2).join(" · ")}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-200">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name} 여행 이미지`}
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
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
    </Link>
  );
}
