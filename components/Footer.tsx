import Link from "next/link";

const footerLinks = [
  { href: "/destinations", label: "목적지" },
  { href: "/products", label: "상품" },
  { href: "/premium-packages", label: "단독 패키지" },
  { href: "/hotels", label: "호텔 · 리조트" },
  { href: "/custom-package", label: "맞춤 일정" },
  { href: "/quote", label: "견적 요청" },
];

export default function Footer() {
  return (
    <footer className="on-dark bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="code text-5xl text-white">EXITour</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
            항공권은 이미 있어도 괜찮습니다. 호텔, 차량, 현지 투어를 우리 일행의 속도에 맞춰 묶어 드립니다.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">상담</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>
              <a href="tel:01059342629" className="num text-2xl font-semibold text-white hover:text-signal">
                010-5934-2629
              </a>
            </li>
            <li>카카오톡 ID exitouroffice, exitour1</li>
            <li>
              <Link href="/quote" className="font-semibold text-signal underline hover:text-white">
                견적 요청서 쓰기
              </Link>
            </li>
          </ul>
        </div>
        <nav aria-label="바닥 메뉴">
          <h2 className="text-sm font-bold text-white">둘러보기</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-300 md:grid-cols-1">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-5 text-xs text-slate-400 sm:px-6 lg:px-8">
        © 2026 EXITour
      </div>
    </footer>
  );
}
