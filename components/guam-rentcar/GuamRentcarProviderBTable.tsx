import {
  calculateProviderBPrepayKrw,
  guamRentcarExchangeRatePolicy,
  type GuamProviderBRate,
} from "@/lib/mock/guamRentcar";

const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export default function GuamRentcarProviderBTable({ rates }: { rates: GuamProviderBRate[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-950 text-white">
            <tr>
              <th className="px-4 py-3">차종</th>
              <th className="px-4 py-3">예시 모델</th>
              <th className="px-4 py-3 text-right">Daily</th>
              <th className="px-4 py-3 text-right">3+</th>
              <th className="px-4 py-3 text-right">Week</th>
              <th className="px-4 py-3 text-right">Month</th>
              <th className="px-4 py-3 text-right">3HR</th>
              <th className="px-4 py-3 text-right">ZDC</th>
              <th className="px-4 py-3 text-right">AP-P/Up</th>
              <th className="px-4 py-3 text-right">AP-Drop</th>
              <th className="px-4 py-3 text-right">1일 사전결제 예시</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rates.map((rate) => (
              <tr key={rate.id}>
                <td className="px-4 py-4 font-black text-slate-950">{rate.vehicleClass}</td>
                <td className="px-4 py-4 text-slate-700">{rate.modelExample}</td>
                <td className="px-4 py-4 text-right font-bold text-slate-950">${rate.dailyUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">{rate.threePlusUsd ? `$${rate.threePlusUsd}` : "-"}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.weekUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.monthUsd.toLocaleString("en-US")}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.threeHourUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.zdcUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.airportPickupUsd}</td>
                <td className="px-4 py-4 text-right text-slate-700">${rate.airportDropUsd}</td>
                <td className="px-4 py-4 text-right text-lg font-black text-slate-950">
                  {formatKrw(calculateProviderBPrepayKrw(rate.dailyUsd))}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold leading-5 text-slate-500">
        렌트B 사전결제 예시는 daily USD x {guamRentcarExchangeRatePolicy.basis} mock {formatKrw(guamRentcarExchangeRatePolicy.rateKrw)}원 + 서비스 기준금액 {formatKrw(guamRentcarExchangeRatePolicy.fixedServiceFeeKrw)}원으로 계산했습니다.
      </p>
    </div>
  );
}
