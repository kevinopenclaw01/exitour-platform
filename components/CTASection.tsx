import Link from "next/link";

// 페이지 끝 상담 띠. 코발트 면 위에 노란 행동 버튼 하나, 전화와 카카오톡은 바로 보이게.
export default function CTASection({ variant = "default" }: { variant?: "default" | "home" }) {
  const title = variant === "home" ? "여행은 우리 일행 속도로, 일정은 엑시투어가" : "항공권을 이미 샀어도 괜찮습니다";
  const body =
    variant === "home"
      ? "항공권이 준비되어 있어도 괜찮습니다. 호텔, 차량, 투어를 조합해 여행 조건에 맞는 견적을 안내합니다."
      : "가족 구성, 여행 속도, 예산, 꼭 하고 싶은 경험을 알려주시면 목적지별 호텔과 현지 서비스를 묶어 견적으로 정리해 드립니다.";

  return (
    <section className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <h2 className="display max-w-2xl text-3xl sm:text-[2.6rem]">{title}</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
          <Link
            href="/quote"
            className="inline-flex min-h-13 items-center justify-center rounded-md bg-signal px-6 py-3.5 text-base font-bold text-ink transition-colors hover:bg-signal-hover"
          >
            견적 요청서 쓰기
          </Link>
          <a
            href="tel:01059342629"
            className="inline-flex min-h-13 items-center justify-center rounded-md border-2 border-slate-300 bg-white px-6 py-3 text-base font-semibold text-ink transition-colors hover:border-ink"
          >
            전화 상담 <span className="num ml-2">010-5934-2629</span>
          </a>
          <p className="text-sm text-muted sm:ml-2 lg:ml-0 lg:text-center">카카오톡 ID exitouroffice</p>
        </div>
      </div>
    </section>
  );
}
