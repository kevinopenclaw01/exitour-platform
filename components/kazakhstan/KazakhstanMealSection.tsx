import {
  kazakhstanMealComparisonRows,
  kazakhstanMealMenuCards,
  kazakhstanMealNotes,
  kazakhstanMealPlans,
  type KazakhstanMealPlanId,
} from "@/lib/mock/kazakhstanPremium";

type KazakhstanMealSectionProps = {
  primaryPlanId: KazakhstanMealPlanId;
};

const planDescriptions = {
  basic:
    "현지식 중심으로 알마티 여행에 필요한 식사를 합리적으로 구성했습니다. 샤슬릭 BBQ와 피자·샐러드 등 비교적 익숙한 메뉴를 함께 넣어, 현지식이 낯선 고객도 부담을 줄일 수 있도록 구성합니다.",
  enhanced:
    "식사 만족도를 더 중요하게 생각하는 고객을 위한 구성입니다. 기본 현지식에 더해 피자·샐러드·파스타, 뷔페식, 송어정식, 한식 등 메뉴 다양성과 식사 만족도를 강화했습니다.",
};

const basicKeywords = ["현지식 중심", "합리적인 식사 구성", "샤슬릭 BBQ 포함", "피자·샐러드 구성", "일정에 맞춘 기본 식사"];
const enhancedKeywords = ["특식 강화", "뷔페식 포함", "파스타 추가", "송어정식 포함", "한식 포함", "가족·중장년 추천"];

export default function KazakhstanMealSection({ primaryPlanId }: KazakhstanMealSectionProps) {
  const primaryPlan = kazakhstanMealPlans[primaryPlanId];
  const secondaryPlan = kazakhstanMealPlans[primaryPlanId === "3n5d" ? "4n6d" : "3n5d"];

  return (
    <section className="space-y-7 lg:col-span-2">
      <div className="max-w-3xl">
        <p className="text-sm font-black text-cyan-700">Almaty Meal Plan</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">알마티 식사, 일정에 맞게 더 알차게 준비했습니다</h2>
        <p className="mt-4 text-base leading-8 text-slate-600">
          현지식이 낯선 고객도 부담 없이 즐길 수 있도록 기본 식사 구성과 특식 강화 구성을 나누어 안내드립니다.
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-500">
          여행 일정은 동일하게 즐기고, 식사 만족도를 더 중요하게 생각하는 고객은 특식 강화 구성을 선택할 수 있습니다.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <MealPlanCard
          tone="basic"
          title={`${primaryPlan.label} 기본 식사 구성`}
          description={planDescriptions.basic}
          items={primaryPlan.basicItems}
          keywords={basicKeywords}
        />
        <MealPlanCard
          tone="enhanced"
          title={`${primaryPlan.label} 특식 강화 구성`}
          description={planDescriptions.enhanced}
          items={primaryPlan.enhancedItems}
          keywords={enhancedKeywords}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h3 className="text-xl font-black text-slate-950">식사 구성 비교표</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {primaryPlan.label} 구성을 먼저 확인하고, {secondaryPlan.label} 구성은 일정 선택 시 함께 비교해 볼 수 있습니다.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-950">
                <th className="w-36 px-5 py-4 font-black">구분</th>
                <th className="px-5 py-4 font-black text-cyan-800">기본 식사 구성</th>
                <th className="px-5 py-4 font-black text-amber-700">특식 강화 구성</th>
              </tr>
            </thead>
            <tbody>
              {kazakhstanMealComparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-slate-200 align-top">
                  <th className="bg-slate-50 px-5 py-4 font-black text-slate-950">{row.label}</th>
                  <td className="px-5 py-4 leading-7 text-slate-600">{row.basic}</td>
                  <td className="px-5 py-4 leading-7 text-slate-600">{row.enhanced}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-black text-slate-950">대표 메뉴 구성</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kazakhstanMealMenuCards.map((item) => (
            <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-20 items-center justify-center rounded-md bg-gradient-to-br from-slate-50 to-amber-50 text-xs font-black text-slate-400">
                메뉴 이미지 준비 중
              </div>
              <h4 className="text-base font-black text-slate-950">{item.title}</h4>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4">
        <ul className="space-y-2 text-sm leading-7 text-amber-950">
          {kazakhstanMealNotes.map((note) => (
            <li key={note}>※ {note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MealPlanCard({
  tone,
  title,
  description,
  items,
  keywords,
}: {
  tone: "basic" | "enhanced";
  title: string;
  description: string;
  items: string[];
  keywords: string[];
}) {
  const isEnhanced = tone === "enhanced";

  return (
    <div className={`rounded-lg border bg-white p-5 shadow-sm sm:p-6 ${isEnhanced ? "border-amber-300" : "border-cyan-200"}`}>
      <p className={`text-sm font-black ${isEnhanced ? "text-amber-700" : "text-cyan-700"}`}>
        {isEnhanced ? "식사 만족도 강화형" : "고객 취향에 맞춘 식사 선택"}
      </p>
      <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">{description}</p>
      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-bold text-slate-800">
            <span className={`mt-1 h-2 w-2 rounded-full ${isEnhanced ? "bg-amber-500" : "bg-cyan-500"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span key={keyword} className={`rounded-full px-3 py-1 text-xs font-black ${isEnhanced ? "bg-slate-950 text-amber-200" : "bg-cyan-50 text-cyan-800"}`}>
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
