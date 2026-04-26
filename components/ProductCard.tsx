import Link from "next/link";
import type { Product } from "@/lib/data";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
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
        <p className="text-right text-lg font-black text-slate-950">{formatKrw(product.priceFromKrw)}원~</p>
      </div>
    </Link>
  );
}
