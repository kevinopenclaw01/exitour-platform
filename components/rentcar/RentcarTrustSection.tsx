import { danangRentcarProduct } from "@/lib/mock/danangRentcar";

export default function RentcarTrustSection() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-cyan-700">후기/신뢰도</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">평점</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{danangRentcarProduct.rating.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">리뷰 수</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{danangRentcarProduct.reviewCount}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">후기 콘텐츠</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">실제 후기 추가 예정</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        고객 이름, 사진, 상세 후기는 임의로 생성하지 않았습니다. 실제 운영 후기 확보 후 관리자 검수 과정을 거쳐 노출하는 구조를 권장합니다.
      </p>
    </section>
  );
}
