import { CategoryPage, travelMetadata } from "@/components/travel/TravelPages";

export const metadata = travelMetadata("activities");

export default function Page() {
  return <CategoryPage category="activities" />;
}
