import type { GuamTransferPriceOption } from "@/lib/mock/guamTransfer";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function GuamTransferPriceTable({ options }: { options: GuamTransferPriceOption[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-3">구분</th>
              <th className="px-4 py-3">탑승 인원</th>
              <th className="px-4 py-3 text-right">현장 요금</th>
              <th className="px-4 py-3 text-right">예약금</th>
              <th className="px-4 py-3">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {options.map((option) => (
              <tr key={option.id}>
                <td className="px-4 py-4 font-black text-slate-950">{option.tripLabel}</td>
                <td className="px-4 py-4 text-slate-700">{option.passengerLabel}</td>
                <td className="px-4 py-4 text-right text-lg font-black text-slate-950">
                  {option.priceUsd ? `$${option.priceUsd}` : "문의"}
                </td>
                <td className="px-4 py-4 text-right font-black text-cyan-700">
                  {formatKrw(option.reservationDepositKrw)}원
                </td>
                <td className="px-4 py-4 text-slate-600">{option.note ?? "상담 후 가능 여부 확인"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500">
        모든 옵션의 예약금은 10,000원입니다. 현장 요금은 USD 기준이며 실제 예약 전 차량 가능 여부와 인원/캐리어 조건을 확인합니다.
      </p>
    </div>
  );
}
