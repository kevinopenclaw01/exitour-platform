import Link from "next/link";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/destinations", label: "목적지" },
  { href: "/products", label: "상품" },
  { href: "/hotels", label: "호텔" },
  { href: "/custom-package", label: "맞춤 패키지" },
  { href: "/quote", label: "견적 요청" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-sm font-black text-white">
            EX
          </span>
          <span>
            <span className="block text-xl font-black tracking-tight text-slate-950">EXITour</span>
            <span className="block text-xs font-medium text-slate-500">Premium Travel Concierge</span>
          </span>
        </Link>
        <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
