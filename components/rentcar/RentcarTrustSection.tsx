import { danangRentcarProduct } from "@/lib/mock/danangRentcar";

export default function RentcarTrustSection() {
  return (
    <section className="tag p-5 sm:p-6">
      <h2 className="text-xl font-bold text-ink">이용 평점</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">평점</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{danangRentcarProduct.rating.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">리뷰 수</p>
          <p className="mt-2 text-3xl font-black text-slate-950">{danangRentcarProduct.reviewCount}</p>
        </div>
      </div>
    </section>
  );
}
