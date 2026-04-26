import Link from "next/link";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";

const steps = [
  {
    title: "여행 조건 확인",
    body: "여행지, 날짜, 인원, 항공권 보유 여부, 선호 호텔 등급을 먼저 정리합니다.",
  },
  {
    title: "호텔과 서비스 조합",
    body: "계약 호텔, 공항 이동, 렌터카, 투어, 마사지, 식사 동선을 목적지별로 맞춥니다.",
  },
  {
    title: "상담용 견적 제안",
    body: "예산과 여행 속도에 맞춰 무리한 일정은 줄이고 꼭 필요한 경험을 남깁니다.",
  },
];

const packageTypes = ["가족 휴양", "허니문", "부모님 동반", "아이 동반", "프리미엄 골프", "유럽 소도시"];

export default function CustomPackagePage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-bold text-cyan-700">Custom Package</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              우리 가족에게 맞는 일정만 남기는 맞춤 패키지
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
              EXITour의 맞춤 패키지는 단체 일정표를 그대로 따라가는 방식이 아닙니다. 항공 시간이 늦은 가족, 조용한 풀빌라를 원하는 커플, 이동을 줄이고 싶은 부모님 여행처럼 실제 조건을 기준으로 설계합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800">
                맞춤 견적 요청
              </Link>
              <Link href="/products" className="rounded-md border border-slate-300 px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100">
                상품 먼저 보기
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-black text-cyan-700">0{index + 1}</p>
                <h2 className="mt-2 text-xl font-black text-slate-950">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-cyan-700">추천 상담 유형</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">이런 여행을 잘 맞춥니다</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packageTypes.map((type) => (
              <div key={type} className="rounded-lg border border-slate-200 bg-white p-5">
                <p className="text-lg font-black text-slate-950">{type}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  여행 목적과 동행자 컨디션을 기준으로 호텔, 차량, 현지 경험을 조합합니다.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
      <FAQSection />
    </>
  );
}
