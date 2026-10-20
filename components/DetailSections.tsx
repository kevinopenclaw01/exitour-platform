import Link from "next/link";
import type { FAQ } from "@/lib/data";

// eyebrow는 예전 페이지 호환용으로만 받는다. 제목 위 꼬리표는 그리지 않는다.
export function PageHero({
  title,
  description,
  meta,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  meta?: string[];
}) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <h1 className="display max-w-4xl text-[2.25rem] text-ink sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{description}</p>
        {meta ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {meta.map((item) => (
              <li key={item} className="rounded-full border-2 border-line px-3.5 py-1 text-sm font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="tag p-5 sm:p-6">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <div className="mt-4 text-[0.95rem] leading-7 text-slate-700">{children}</div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-[0.7rem] h-1 w-2.5 shrink-0 rounded-full bg-navy" aria-hidden="true" />
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
          <span className="code w-7 shrink-0 pt-0.5 text-2xl text-navy" aria-hidden="true">
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
    <div className="border-t-2 border-ink">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span className="text-2xl leading-none text-navy transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="max-w-3xl pb-5 pr-8 text-[0.95rem] leading-7 text-slate-700">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ConsultationCTA({
  title,
  description,
  href = "/quote",
  label = "견적 요청서 쓰기",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="rounded-lg border border-line bg-paper p-6 text-ink sm:p-8">
      <h2 className="display text-2xl sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-slate-700">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex min-h-12 items-center rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-signal-hover"
      >
        {label}
      </Link>
    </section>
  );
}
