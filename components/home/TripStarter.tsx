import { airportCodes } from "@/lib/airportCodes";

const starterDestinations = [
  { id: "danang", name: "다낭" },
  { id: "bohol", name: "보홀" },
  { id: "boracay", name: "보라카이" },
  { id: "guam", name: "괌" },
  { id: "nha-trang", name: "나트랑" },
  { id: "kazakhstan", name: "알마티" },
  { id: "sapa", name: "사파" },
];

const travelTypes = ["단독 맞춤 일정", "공항 이동 · 전용차량", "호텔 · 리조트"];

// JS 없이도 동작하는 GET 폼: 고른 값이 /quote?destination=…&service=… 로 넘어가 견적 요청서에 미리 채워진다.
export default function TripStarter() {
  return (
    <form action="/quote" method="get" className="tag tag-hole w-full px-5 pb-5 pt-12 text-ink [--hole-bg:var(--color-cobalt)] sm:px-7 sm:pb-7">
      <input type="hidden" name="sourcePath" value="/" />
      <fieldset>
        <legend className="text-base font-bold">어디로 가세요?</legend>
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7 lg:grid-cols-4 xl:grid-cols-7">
          {starterDestinations.map((destination, index) => (
            <label
              key={destination.id}
              className="group relative flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-line px-1 py-2 text-center transition-colors hover:border-slate-400 has-[:checked]:border-cobalt has-[:checked]:bg-cobalt has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt"
            >
              <input type="radio" name="destination" value={destination.name} defaultChecked={index === 0} className="sr-only" />
              <span className="code text-[1.6rem]">{airportCodes[destination.id].code}</span>
              <span className="mt-1 text-xs font-medium">{destination.name}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-base font-bold">무엇이 필요하세요?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {travelTypes.map((type, index) => (
            <label
              key={type}
              className="cursor-pointer rounded-full border-2 border-line px-4 py-2 text-sm font-medium transition-colors hover:border-slate-400 has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cobalt"
            >
              <input type="radio" name="service" value={type} defaultChecked={index === 0} className="sr-only" />
              {type}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="tag-perf mt-6 pt-5">
        <button
          type="submit"
          className="flex min-h-13 w-full items-center justify-center rounded-md bg-signal px-5 py-3.5 text-base font-bold text-ink transition-colors hover:bg-signal-hover"
        >
          이 조건으로 견적 요청서 쓰기
        </button>
        <p className="mt-3 text-center text-xs text-muted">날짜와 인원은 다음 화면에서 적습니다. 상담 후 확정되며 바로 결제되지 않습니다.</p>
      </div>
    </form>
  );
}
