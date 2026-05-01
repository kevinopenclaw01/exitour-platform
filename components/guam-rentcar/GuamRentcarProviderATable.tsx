import {
  calculateProviderADepositKrw,
  guamRentcarExchangeRatePolicy,
  type GuamProviderARate,
} from "@/lib/mock/guamRentcar";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function GuamRentcarProviderATable({ rates }: { rates: GuamProviderARate[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-3">차종</th>
              <th className="px-4 py-3">기간</th>
              <th className="px-4 py-3 text-right">판매가</th>
              <th className="px-4 py-3 text-right">현장 카드결제</th>
              <th className="px-4 py-3 text-right">예약금</th>
              <th className="px-4 py-3 text-right">예약금 원화</th>
              <th className="px-4 py-3">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rates.map((rate) => (
              <tr key={rate.id}>
                <td className="px-4 py-4 font-black text-slate-950">{rate.vehicleClass}</td>
                <td className="px-4 py-4 text-slate-700">{rate.periodLabel}</td>
                <td className="px-4 py-4 text-right font-bold text-slate-950">${rate.salePriceUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.onsitePaymentUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.reservationDepositUsd}</td>
                <td className="px-4 py-4 text-right text-lg font-black text-slate-950">
                  {formatKrw(calculateProviderADepositKrw(rate.reservationDepositUsd))}원
                </td>
                <td className="px-4 py-4 text-slate-600">{rate.note ?? "예약 가능 여부 확인 필요"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500">
        예약금은 판매가 - 현장결제금액이며 {guamRentcarExchangeRatePolicy.basis} mock {formatKrw(guamRentcarExchangeRatePolicy.rateKrw)}원 기준으로 계산했습니다.
        실제 예약 전 환율과 차량 가능 여부를 다시 확인합니다.
      </p>
    </div>
  );
}
