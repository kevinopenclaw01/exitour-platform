import Link from "next/link";

export default function RentcarQuoteCTA({
  message,
  title = "차량 옵션과 동선을 상담해보세요",
  description = "아래 문구를 기준으로 희망 일정과 방문지를 남겨주시면 7인승, 16인승, 리무진 중 적합한 차량을 안내할 수 있습니다.",
}: {
  message: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="rounded-lg bg-slate-950 p-6 text-white shadow-sm sm:p-8">
      <h2 className="mt-3 text-2xl display sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
        {description}
      </p>
      <pre className="mt-5 overflow-x-auto rounded-lg bg-white/10 p-4 text-xs leading-6 text-slate-100">{message}</pre>
      <Link
        href="/quote"
        className="mt-6 inline-flex rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal-hover"
      >
        견적 요청으로 이동
      </Link>
    </section>
  );
}
