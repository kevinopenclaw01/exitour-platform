import { notFound } from "next/navigation";
import { DestinationPage, travelMetadata } from "@/components/travel/TravelPages";
import { getTravelDestination, getTravelDestinations } from "@/lib/travel/catalog";

type Props = { params: Promise<{ countrySlug: string; citySlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getTravelDestinations("activities").map((destination) => ({ countrySlug: destination.country, citySlug: destination.city }));
}

async function resolveDestination(params: Props["params"]) {
  const { countrySlug, citySlug } = await params;
  const destination = getTravelDestination("activities", countrySlug, citySlug);
  if (!destination) notFound();
  return destination;
}

export async function generateMetadata({ params }: Props) {
  return travelMetadata("activities", await resolveDestination(params));
}

export default async function Page({ params }: Props) {
  return <DestinationPage category="activities" destination={await resolveDestination(params)} />;
}
