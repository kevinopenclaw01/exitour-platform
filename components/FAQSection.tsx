import { faqs } from "@/lib/data";
import { Plus } from "lucide-react";

export default function FAQSection({ variant = "default" }: { variant?: "default" | "home" }) {
  return (
    <section className={variant === "home" ? "border-t border-line bg-white" : "bg-white"}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <h2 className="display text-3xl text-ink sm:text-4xl">출발 전에 많이 묻는 것</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            여기 없는 질문은 카카오톡 exitouroffice로 물어보세요.
          </p>
        </div>
        <div className="border-t-2 border-ink">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <Plus size={20} className="shrink-0 text-navy transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="max-w-3xl pb-6 pr-8 text-[0.95rem] leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
