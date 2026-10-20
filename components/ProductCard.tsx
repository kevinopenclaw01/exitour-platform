import Link from "next/link";
import type { Product } from "@/lib/data";
import { ArrowUpRight, CarFront, Compass, Flower2, Luggage, Plane } from "lucide-react";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function ProductCard({ product, href, variant = "default" }: { product: Product & { canonicalPath?: string }; href?: string; variant?: "default" | "home" }) {
  const priceLabel = Number.isSafeInteger(product.priceFromKrw) && product.priceFromKrw > 0
    ? `${formatKrw(product.priceFromKrw)}원~`
    : "상담 문의";
  if (variant === "home") {
    const categories = {
      transfer: { label: "공항 이동", icon: Plane },
      transport: { label: "전용차량", icon: CarFront },
      tour: { label: "현지 투어", icon: Compass },
      wellness: { label: "휴식 · 웰니스", icon: Flower2 },
      package: { label: "맞춤 패키지", icon: Luggage },
    };
    const { label, icon: Icon } = categories[product.category];
    return (
      <Link href={href ?? product.canonicalPath ?? `/products/${product.slug}`} className="group flex h-full min-w-0 flex-col rounded-md border border-slate-200 bg-white p-5 transition hover:border-[#176753]">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#176753]"><Icon size={18} strokeWidth={1.5} aria-hidden="true" />{label}</span>
          <ArrowUpRight size={17} className="text-slate-400 group-hover:text-[#176753]" aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs text-slate-500">{product.destinationScope}</p>
        <h3 className="mt-2 min-h-14 break-keep text-lg font-bold leading-7 text-[#172b27]">{product.title}</h3>
        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">{product.summary}</p>
        <div className="mt-5 flex flex-1 flex-col justify-end gap-2 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">{product.duration}</p>
          <p className="text-xl font-bold text-[#172b27]">{priceLabel}</p>
        </div>
      </Link>
    );
  }
  return (
    <Link
      href={href ?? product.canonicalPath ?? `/products/${product.slug}`}
      className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">{product.destinationScope}</p>
      <h3 className="mt-3 text-xl font-black text-slate-950">{product.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700">
        {product.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-xs font-semibold text-slate-500">{product.duration}</p>
        <p className="text-right text-lg font-black text-slate-950">{priceLabel}</p>
      </div>
    </Link>
  );
}
