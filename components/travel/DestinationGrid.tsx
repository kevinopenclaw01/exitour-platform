import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { destinationPath, getTravelDestinations, type TravelCategoryId } from "@/lib/travel/catalog";

export default function DestinationGrid({ category }: { category: TravelCategoryId }) {
  const destinations = getTravelDestinations(category);
  const countries = [...new Set(destinations.map((destination) => destination.country))];
  return (
    <div className="space-y-8">
      {countries.map((country) => {
        const cities = destinations.filter((destination) => destination.country === country);
        return (
          <section key={country} aria-label={cities[0].countryName}>
            <h3 className="mb-4 border-b border-line pb-3 text-base font-bold text-ink">{cities[0].countryName}</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cities.map((destination) => (
                <Link key={destination.city} href={destinationPath(category, destination)} className="group flex min-h-48 flex-col rounded-md border border-line bg-white p-5 transition-colors hover:border-navy">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xl font-bold text-ink">{destination.name}</h4>
                    <ArrowUpRight size={20} className="shrink-0 text-navy" aria-hidden="true" />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{category === "packages" ? destination.packageSummary : destination.activitySummary}</p>
                  <span className="mt-5 text-sm font-semibold text-navy group-hover:underline">여행 안내·상담</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
