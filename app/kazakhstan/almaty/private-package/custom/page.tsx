import { redirect } from "next/navigation";
import { kazakhstanQuotePrefills } from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

export default function KazakhstanCustomPrivatePackageInquiryPage() {
  redirect(buildQuoteUrl(kazakhstanQuotePrefills.customPrivatePackage));
}
