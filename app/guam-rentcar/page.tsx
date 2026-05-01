import { redirect } from "next/navigation";
import { guamRentcarProduct } from "@/lib/mock/guamRentcar";

export default function GuamRentcarMarketingRedirectPage() {
  redirect(guamRentcarProduct.canonicalPath);
}
