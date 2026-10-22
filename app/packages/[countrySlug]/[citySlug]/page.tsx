import { notFound } from "next/navigation";
import { DestinationPage, travelMetadata } from "@/components/travel/TravelPages";
import { getTravelDestination, getTravelDestinations } from "@/lib/travel/catalog";

type Props = { params: Promise<{ countrySlug: string; citySlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTravelDestinations("packages").map((destination) => ({ countrySlug: destination.country, citySlug: destination.city }));
}

async function resolveDestination(params: Props["params"]) {
  const { countrySlug, citySlug } = await params;
  const destination = getTravelDestination("packages", countrySlug, citySlug);
  if (!destination) notFound();
  return destination;
}

export async function generateMetadata({ params }: Props) {
  return travelMetadata("packages", await resolveDestination(params));
}

export default async function Page({ params }: Props) {
  return <DestinationPage category="packages" destination={await resolveDestination(params)} />;
}
