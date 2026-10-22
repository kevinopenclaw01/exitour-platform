import Link from "next/link";
import { ArrowRight, Compass, UsersRound } from "lucide-react";
import TravelImage from "@/components/TravelImage";
import { travelCategories } from "@/lib/travel/catalog";

export default function CategoryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {travelCategories.map((category) => {
        const Icon = category.id === "packages" ? UsersRound : Compass;
        return (
          <Link key={category.id} href={`/${category.id}`} className="group overflow-hidden rounded-md border border-line bg-white transition-shadow hover:shadow-md">
            <div className="relative h-40 overflow-hidden sm:h-48">
              <TravelImage src={category.image} alt={category.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" preload className="object-cover" fallbackTitle={category.name} />
            </div>
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-3 text-navy">
                <Icon size={24} className="shrink-0" aria-hidden="true" />
                <h2 className="text-xl font-bold text-ink sm:text-2xl">{category.name}</h2>
              </div>
              <p className="mt-3 text-base leading-7 text-muted">{category.shortDescription}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
                {category.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="mt-6 flex min-h-11 items-center justify-between border-t border-line pt-4 text-sm font-bold text-navy">
                <span>여행지 선택하기</span><ArrowRight size={20} aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
