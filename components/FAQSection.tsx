import { faqs } from "@/lib/data";

export default function FAQSection() {
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
