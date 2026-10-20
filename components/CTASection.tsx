import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTASection({ variant = "default" }: { variant?: "default" | "home" }) {
  if (variant === "home") {
    return (
      <section className="bg-[#174c3e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-semibold text-emerald-200">맞춤 여행 상담</p>
            <h2 className="mt-3 break-keep text-3xl font-bold leading-snug sm:text-4xl">여행은 당신의 속도로.<br />일정은 엑시투어와 함께.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">항공권이 준비되어 있어도 괜찮습니다. 호텔, 차량, 투어를 조합해 여행 조건에 맞는 견적을 안내합니다.</p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4 lg:flex-col lg:items-start">
            <Link href="/quote" className="inline-flex min-h-12 items-center gap-4 rounded-md bg-white px-6 py-3 text-sm font-bold text-[#174c3e] hover:bg-emerald-50">나의 여행 상담하기<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link href="/custom-package" className="inline-flex items-center gap-2 py-2 text-sm text-white/90 hover:text-white">맞춤 패키지 알아보기<ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-bold text-cyan-300">맞춤 패키지 상담</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
            항공권을 이미 샀어도 괜찮습니다. 호텔, 차량, 투어만 골라 프리미엄 일정으로 정리해드립니다.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            가족 구성, 여행 속도, 예산, 꼭 하고 싶은 경험을 알려주시면 목적지별 계약 호텔과 현지 서비스를 조합해 상담 가능한 견적 형태로 준비합니다.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Link href="/quote" className="rounded-md bg-cyan-400 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-cyan-300">
            견적 요청하기
          </Link>
          <Link href="/custom-package" className="rounded-md border border-white/20 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/10">
            맞춤 패키지 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
