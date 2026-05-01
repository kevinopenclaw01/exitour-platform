import { redirect } from "next/navigation";
import { danangTransferProduct } from "@/lib/mock/danangTransfer";

export default function DanangPickupMarketingRedirectPage() {
  redirect(danangTransferProduct.canonicalPath);
}
