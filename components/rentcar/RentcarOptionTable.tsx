import type { RentcarPriceOption } from "@/lib/mock/danangRentcar";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function RentcarOptionTable({ options }: { options: RentcarPriceOption[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-3">차량 옵션</th>
              <th className="px-4 py-3">이용 시간</th>
              <th className="px-4 py-3">추천 인원</th>
              <th className="px-4 py-3 text-right">요금</th>
              <th className="px-4 py-3">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {options.map((option) => (
              <tr key={option.id} className="bg-white">
                <td className="px-4 py-4 font-black text-slate-950">{option.label}</td>
                <td className="px-4 py-4 text-slate-700">{option.duration}</td>
                <td className="px-4 py-4 text-slate-700">{option.maxPassengers}</td>
                <td className="px-4 py-4 text-right text-lg font-black text-slate-950">
                  {formatKrw(option.priceKrw)}원
                </td>
                <td className="px-4 py-4 text-slate-600">{option.note ?? "상담 후 가능 여부 확인"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500">
        표시 요금은 기본 기준입니다. 실제 요금은 날짜, 차량 가능 여부, 시즌에 따라 상담 때 확정됩니다.
      </p>
    </div>
  );
}
