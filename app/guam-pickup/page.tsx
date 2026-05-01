import { redirect } from "next/navigation";
import { guamTransferProduct } from "@/lib/mock/guamTransfer";

export default function GuamPickupMarketingRedirectPage() {
  redirect(guamTransferProduct.canonicalPath);
}
