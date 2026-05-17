import Link from "next/link";

type PremiumCTAProps = {
  message: string;
  href?: string;
};

export default function PremiumCTA({ message, href = "/quote" }: PremiumCTAProps) {
  return (
    <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm sm:p-8">
      <p className="text-sm font-bold text-cyan-300">프리미엄 상담 CTA</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">전용차량과 가이드가 함께하는 여행을 상담해보세요</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        여행 형태, 희망 지역, 인원, 가이드 언어, 숙박과 식사 조건을 남겨주시면 프리미엄 프라이빗 일정으로 정리합니다.
      </p>
      <pre className="mt-5 overflow-x-auto rounded-lg bg-white/10 p-4 text-xs leading-6 text-slate-100">{message}</pre>
      <Link href={href} className="mt-6 inline-flex rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
        견적 요청으로 이동
      </Link>
    </section>
  );
}
