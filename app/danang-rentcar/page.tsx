import { redirect } from "next/navigation";
import { danangRentcarProduct } from "@/lib/mock/danangRentcar";

export default function DanangRentcarMarketingRedirectPage() {
  redirect(danangRentcarProduct.canonicalPath);
}
