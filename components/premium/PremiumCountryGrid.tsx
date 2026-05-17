import Link from "next/link";

export type PremiumCountryCard = {
  id: string;
  name: string;
  status: string;
  href: string;
  description: string;
};

export default function PremiumCountryGrid({ countries }: { countries: PremiumCountryCard[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {countries.map((country) => (
        <Link
          key={country.id}
          href={country.href}
          className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md"
        >
          <span className="w-fit rounded-md bg-slate-100 px-3 py-1.5 text-xs font-black text-slate-700">
            {country.status === "available" ? "상담 가능" : "준비 중"}
          </span>
          <h3 className="mt-4 text-xl font-black text-slate-950">{country.name}</h3>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{country.description}</p>
        </Link>
      ))}
    </div>
  );
}
