"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/destinations", label: "목적지" },
  { href: "/products", label: "상품" },
  { href: "/hotels", label: "호텔" },
  { href: "/custom-package", label: "맞춤 패키지" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0" aria-label="EXITour 홈">
          <span className="block text-2xl font-extrabold leading-none text-[#173f34]">EXITour</span>
          <span className="mt-1 hidden text-[11px] font-medium text-slate-500 sm:block">여행의 시작, 엑시투어</span>
        </Link>
        <nav aria-label="주요 메뉴" className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navItems.map((item) => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={"py-3 transition hover:text-[#176753] " + (isActive(item.href) ? "font-bold text-[#176753]" : "text-slate-600")}>{item.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/quote" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[#176753] px-3 py-2.5 text-xs font-semibold text-white hover:bg-[#124f40] sm:px-4 sm:text-sm">
            견적 요청<ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          <button type="button" aria-label={open ? "메뉴 닫기" : "메뉴 열기"} title={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center rounded-md text-[#173f34] hover:bg-slate-100 lg:hidden">
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open ? <nav id="mobile-navigation" aria-label="모바일 주요 메뉴" className="absolute left-0 right-0 top-full grid grid-cols-2 gap-1 border-b border-slate-200 bg-white p-4 shadow-sm lg:hidden">
        {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={isActive(item.href) ? "page" : undefined} className={"rounded-md px-4 py-3 text-sm font-medium hover:bg-emerald-50 " + (isActive(item.href) ? "bg-emerald-50 text-[#176753]" : "text-slate-700")}>{item.label}</Link>)}
      </nav> : null}
    </header>
  );
}
