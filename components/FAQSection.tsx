import { faqs } from "@/lib/data";
import { ChevronDown } from "lucide-react";

export default function FAQSection({ variant = "default" }: { variant?: "default" | "home" }) {
  if (variant === "home") {
    return (
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8">
          <div><h2 className="text-2xl font-bold text-[#172b27] sm:text-3xl">출발 전 궁금한 이야기</h2><p className="mt-3 text-sm leading-6 text-slate-500">여행을 준비하며 자주 묻는 질문을 모았습니다.</p></div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => <details key={faq.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-semibold text-[#172b27] [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span><ChevronDown size={18} className="shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="max-w-3xl pb-5 pr-6 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </details>)}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-cyan-700">FAQ</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">자주 묻는 질문</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-black text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
