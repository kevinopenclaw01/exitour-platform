import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#172b27] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_0.8fr] lg:px-8">
        <div>
          <p className="text-2xl font-bold">EXITour</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            바다, 도시, 대자연을 당신의 속도로 만나는 여행.<br />엑시투어가 호텔, 차량, 투어를 함께 연결합니다.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">여행 상담</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li><a href="tel:01059342629" className="text-base font-semibold text-white hover:text-emerald-200">010-5934-2629</a></li>
            <li>카카오톡 ID: exitouroffice / exitour1</li>
            <li><Link href="/quote" className="underline underline-offset-4 hover:text-white">견적 문의 남기기</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-100">바로가기</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/quote" className="hover:text-white">견적 요청</Link>
            <Link href="/custom-package" className="hover:text-white">맞춤 패키지</Link>
            <Link href="/hotels" className="hover:text-white">호텔 · 리조트</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-5 py-5 text-xs text-slate-400 sm:px-6 lg:px-8">
        © 2026 EXITour. All rights reserved.
      </div>
    </footer>
  );
}
