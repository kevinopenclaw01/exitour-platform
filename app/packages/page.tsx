import { CategoryPage, travelMetadata } from "@/components/travel/TravelPages";

export const metadata = travelMetadata("packages");

export default function Page() {
  return <CategoryPage category="packages" />;
}
