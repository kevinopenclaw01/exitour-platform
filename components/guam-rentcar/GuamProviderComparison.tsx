import type { GuamRentcarProvider } from "@/lib/mock/guamRentcar";

export default function GuamProviderComparison({ providers }: { providers: GuamRentcarProvider[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {providers.map((provider) => (
        <article key={provider.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold text-cyan-700">{provider.paymentModel}</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">{provider.name}</h3>
            </div>
            <span className="w-fit rounded-md bg-slate-950 px-3 py-1.5 text-xs font-black text-white">
              {provider.id === "rent-a" ? "현장결제형" : "사전결제형"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-600">{provider.summary}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase text-slate-500">추천 대상</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {provider.bestFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-black uppercase text-slate-500">핵심 조건</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {provider.keyPoints.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-slate-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
