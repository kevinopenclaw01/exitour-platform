import QuoteForm from "@/components/QuoteForm";
import { destinations, serviceOptions } from "@/lib/data";
import { sanitizeQuotePrefill } from "@/lib/quote/prefill";

const hotelGrades = ["상관없음", "4성급", "5성급", "풀빌라", "럭셔리"];

type QuotePageProps = {
  searchParams: Promise<{
    productId?: string;
    product?: string;
    destination?: string;
    service?: string;
    sourcePath?: string;
  }>;
};

export default async function QuotePage({ searchParams }: QuotePageProps) {
  const prefill = sanitizeQuotePrefill(await searchParams);

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl">
            <h1 className="display text-[2.25rem] text-ink sm:text-5xl">견적 요청서</h1>
            <p className="mt-5 text-base leading-8 text-slate-700">
              여행지, 날짜, 인원, 필요한 서비스를 남겨주시면 EXITour 담당자가 가능 여부와 상담 기준 견적을 확인해 안내드립니다. 실제 예약과 확정 가격은 상담 후 결정됩니다.
            </p>
          </div>
          <div className="text-sm text-slate-700 md:text-right">
            <p>글보다 말이 편하시면</p>
            <a href="tel:01059342629" className="num text-2xl font-semibold text-cobalt hover:underline">
              010-5934-2629
            </a>
            <p className="mt-1">카카오톡 ID exitouroffice</p>
          </div>
        </div>

        <QuoteForm destinations={destinations} hotelGrades={hotelGrades} serviceOptions={serviceOptions} prefill={prefill} />
      </div>
    </section>
  );
}
