export type GuamRentcarRuleGroup = {
  title?: string;
  provider?: string;
  items: string[];
};

export default function GuamRentcarRuleSection({
  title,
  groups,
}: {
  title: string;
  groups: GuamRentcarRuleGroup[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title ?? group.provider} className="rounded-lg bg-slate-50 p-4">
            <h3 className="font-black text-slate-950">{group.title ?? group.provider}</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {group.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-cyan-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
