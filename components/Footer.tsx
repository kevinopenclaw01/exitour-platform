import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-black tracking-tight">EXITour</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            EXITour는 한국인 여행자의 휴식 속도와 취향을 기준으로 호텔, 차량, 투어, 현지 케어를 정교하게 연결하는 프리미엄 여행 상담 브랜드입니다.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-100">상담 안내</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>평일 10:00-18:00</li>
            <li>카카오톡 상담 준비 중</li>
            <li>견적 요청 후 담당자 배정 예정</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-100">바로가기</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
            <Link href="/quote" className="hover:text-white">견적 요청</Link>
            <Link href="/custom-package" className="hover:text-white">맞춤 패키지</Link>
            <Link href="/hotels" className="hover:text-white">계약 호텔 특가</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-slate-400">
        © 2026 EXITour. Static MVP for premium travel consultation.
      </div>
    </footer>
  );
}
