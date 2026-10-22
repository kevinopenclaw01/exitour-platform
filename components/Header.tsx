"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "/packages", label: "우리끼리 맞춤 패키지" },
  { href: "/activities", label: "내맘대로 단품 투어" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-baseline gap-2.5" aria-label="EXITour 홈">
          <span className="code text-[2rem] text-navy">EXITour</span>
          <span className="hidden text-xs font-medium text-muted xl:inline">여행의 시작, 엑시투어</span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors " +
                  (active ? "bg-cyan-50 text-navy" : "text-slate-700 hover:bg-slate-100 hover:text-ink")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center rounded-md bg-signal px-4 text-sm font-bold text-ink transition-colors hover:bg-signal-hover"
          >
            견적 요청
          </Link>
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-slate-100 lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="모바일 주요 메뉴"
          className="absolute inset-x-0 top-full border-b border-line bg-white px-4 pb-5 pt-2 shadow-md lg:hidden"
        >
          <ul className="divide-y divide-slate-100">
            {[{ href: "/", label: "홈" }, ...navItems].map((item) => {
              const active = item.href === "/" ? pathname === "/" : isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={"flex min-h-12 items-center text-base " + (active ? "font-bold text-navy" : "font-medium text-ink")}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a href="tel:01059342629" className="mt-4 flex min-h-12 items-center justify-center rounded-md border border-line text-sm font-semibold text-ink">
            전화 상담 010-5934-2629
          </a>
        </nav>
      ) : null}
    </header>
  );
}
