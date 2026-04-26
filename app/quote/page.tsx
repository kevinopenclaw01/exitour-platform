import { destinations, serviceOptions } from "@/lib/data";

const hotelGrades = ["상관없음", "4성급", "5성급", "풀빌라", "럭셔리"];

export default function QuotePage() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-cyan-700">Quote Request</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">견적 요청</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            현재 단계에서는 실제 저장 기능 없이 UI만 제공합니다. 입력 항목은 이후 Supabase 저장과 관리자 확인 화면으로 연결하기 쉽게 구성했습니다.
          </p>
        </div>

        <form className="mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              여행지
              <select className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500">
                <option>선택해주세요</option>
                {destinations.map((destination) => (
                  <option key={destination.id}>{destination.country} - {destination.name}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              호텔 등급
              <select className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500">
                {hotelGrades.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              출발일
              <input type="date" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              귀국일
              <input type="date" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              성인 수
              <input type="number" min="0" placeholder="예: 2" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              아동 수
              <input type="number" min="0" placeholder="예: 1" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              유아 수
              <input type="number" min="0" placeholder="예: 0" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              예산
              <input type="text" placeholder="예: 1인 150만원 또는 총 500만원" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              이름
              <input type="text" placeholder="홍길동" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              연락처
              <input type="tel" placeholder="010-0000-0000" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800 md:col-span-2">
              카카오톡 ID
              <input type="text" placeholder="상담 가능한 카카오톡 ID" className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
            </label>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-bold text-slate-800">필요한 서비스</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {serviceOptions.map((service) => (
                <label key={service} className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
                  <input type="checkbox" className="h-4 w-4 accent-cyan-600" />
                  {service}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-6 flex flex-col gap-2 text-sm font-bold text-slate-800">
            문의 내용
            <textarea rows={6} placeholder="원하는 일정, 피하고 싶은 일정, 선호 호텔, 기념일 여부 등을 적어주세요." className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500" />
          </label>

          <label className="mt-6 flex items-start gap-3 rounded-md bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
            <input type="checkbox" className="mt-1 h-4 w-4 accent-cyan-600" />
            개인정보 수집 및 상담 목적 이용에 동의합니다. 현재 MVP에서는 입력 내용이 저장되지 않습니다.
          </label>

          <button type="button" className="mt-6 w-full rounded-md bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800">
            상담 요청 UI 확인
          </button>
        </form>
      </div>
    </section>
  );
}
