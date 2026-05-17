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
    <section className="bg-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold text-cyan-700">Quote Request</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">견적 요청</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            여행지, 날짜, 인원, 필요한 서비스를 남겨주시면 EXITour 담당자가 가능 여부와 상담 기준 견적을 확인해 안내드립니다. 실제 예약과 확정 가격은 상담 후 결정됩니다.
          </p>
        </div>

        <QuoteForm destinations={destinations} hotelGrades={hotelGrades} serviceOptions={serviceOptions} prefill={prefill} />
      </div>
    </section>
  );
}
