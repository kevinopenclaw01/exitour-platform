import Link from "next/link";
import type { Product } from "@/lib/data";
import { ArrowRight, CarFront, Compass, Flower2, Luggage, Plane } from "lucide-react";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

const categories = {
  transfer: { label: "공항 이동", icon: Plane },
  transport: { label: "전용차량", icon: CarFront },
  tour: { label: "현지 투어", icon: Compass },
  wellness: { label: "휴식 · 웰니스", icon: Flower2 },
  package: { label: "맞춤 패키지", icon: Luggage },
};

export default function ProductCard({ product, href, variant = "default" }: { product: Product & { canonicalPath?: string }; href?: string; variant?: "default" | "home" }) {
  const hasPrice = Number.isSafeInteger(product.priceFromKrw) && product.priceFromKrw > 0;
  const target = href ?? product.canonicalPath ?? `/products/${product.slug}`;
  const { label, icon: Icon } = categories[product.category];

  // 홈: 일정표 한 줄
  if (variant === "home") {
    return (
      <Link
        href={target}
        className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-5 sm:grid-cols-[10rem_1fr_9rem_8rem_1.5rem] sm:gap-x-6"
      >
        <span className="col-span-2 inline-flex items-center gap-2 text-sm font-medium text-cobalt sm:col-span-1">
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
          {label}
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-bold leading-snug text-ink group-hover:text-cobalt">{product.title}</span>
          <span className="mt-1 block text-sm text-muted">{product.destinationScope}</span>
        </span>
        <span className="hidden text-sm text-slate-700 sm:block">{product.duration}</span>
        <span className="text-right">
          {hasPrice ? (
            <span className="num text-xl font-bold text-ink">
              {formatKrw(product.priceFromKrw)}
              <span className="ml-0.5 font-sans text-sm font-medium">원~</span>
            </span>
          ) : (
            <span className="text-sm font-semibold text-ink">상담 후 안내</span>
          )}
        </span>
        <ArrowRight size={18} className="hidden text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-cobalt sm:block" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link href={target} className="tag group flex h-full flex-col p-5 transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transform-none">
      <span className="inline-flex items-center gap-2 text-sm font-medium text-cobalt">
        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        {label}
        <span className="text-muted">· {product.destinationScope}</span>
      </span>
      <h3 className="mt-3 text-xl font-bold leading-snug text-ink group-hover:text-cobalt">{product.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.summary}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
        {product.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <span className="mt-[0.6rem] h-1 w-2.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <div className="tag-perf mt-5 flex items-end justify-between gap-3 pt-4">
        <p className="text-sm text-muted">{product.duration}</p>
        {hasPrice ? (
          <p className="num text-right text-xl font-bold text-ink">
            {formatKrw(product.priceFromKrw)}
            <span className="ml-0.5 font-sans text-sm font-medium">원~</span>
          </p>
        ) : (
          <p className="text-right text-sm font-semibold text-ink">상담 후 안내</p>
        )}
      </div>
    </Link>
  );
}
