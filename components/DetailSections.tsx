import Link from "next/link";
import type { FAQ } from "@/lib/data";

export function PageHero({
  eyebrow,
  title,
  description,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <p className="text-sm font-bold text-cyan-700">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
        {meta ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.map((item) => (
              <span key={item} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700">
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-4 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cyan-600" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-950 text-xs font-black text-white">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {faqs.map((faq) => (
        <article key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-base font-black text-slate-950">{faq.question}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}

export function ConsultationCTA({
  title,
  description,
  href = "/quote",
  label = "카카오톡 상담 대신 견적 요청하기",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="rounded-lg bg-slate-950 p-6 text-white sm:p-8">
      <p className="text-sm font-bold text-cyan-300">상담 CTA</p>
      <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex rounded-md bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
      >
        {label}
      </Link>
    </section>
  );
}
