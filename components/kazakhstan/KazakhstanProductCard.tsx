import PremiumPackageCard from "@/components/premium/PremiumPackageCard";
import type { KazakhstanProduct } from "@/lib/mock/kazakhstanPremium";

export default function KazakhstanProductCard({ product }: { product: KazakhstanProduct }) {
  return <PremiumPackageCard product={product} />;
}
