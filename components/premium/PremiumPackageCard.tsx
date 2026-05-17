import Link from "next/link";
import type { KazakhstanProduct } from "@/lib/mock/kazakhstanPremium";
import { buildQuoteUrl } from "@/lib/quote/prefill";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function PremiumPackageCard({ product }: { product: KazakhstanProduct }) {
  const isAvailable = product.status === "available";
  const href = isAvailable ? product.canonicalPath : buildQuoteUrl(product.quotePrefill ?? {});

  return (
    <Link
      href={href}
      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
    >
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-cyan-50 px-3 py-1.5 text-xs font-black text-cyan-800">{product.serviceLevel}</span>
        <span className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">
          {isAvailable ? "상세 보기" : product.status === "inquiry" ? "상담 문의" : "상세 준비 중"}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-black text-slate-950">{product.shortTitle}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{product.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {product.highlights.slice(0, 3).map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500">{product.duration}</p>
        <p className="text-right text-lg font-black text-slate-950">
          {product.priceFromKrw > 0 ? `${formatKrw(product.priceFromKrw)}원~` : "상담 문의"}
        </p>
      </div>
    </Link>
  );
}
