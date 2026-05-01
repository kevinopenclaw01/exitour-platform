import Link from "next/link";
import type { ReactNode } from "react";
import AdminAccessDenied from "@/components/AdminAccessDenied";
import AdminErrorPanel from "@/components/AdminErrorPanel";
import QuoteStatusBadge from "@/components/QuoteStatusBadge";
import { adminHref, fetchQuoteRequestById, getTokenString, isAdminTokenValid, quoteStatuses } from "@/lib/admin/quotes";

export const dynamic = "force-dynamic";

type AdminQuoteDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string | string[]; result?: string | string[] }>;
};

const formatDateTime = (value: string | null) =>
  value ? new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";

const formatCurrency = (value: number | null) =>
  value ? `${new Intl.NumberFormat("ko-KR").format(value)}원` : "-";

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <dt className="text-xs font-bold text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm font-semibold leading-6 text-slate-900">{value || "-"}</dd>
    </div>
  );
}

export default async function AdminQuoteDetailPage({ params, searchParams }: AdminQuoteDetailPageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const token = query.token;
  const tokenString = getTokenString(token);
  const result = Array.isArray(query.result) ? query.result[0] : query.result;

  if (!isAdminTokenValid(token)) {
    return <AdminAccessDenied />;
  }

  const quoteResult = await fetchQuoteRequestById(id);

  if (quoteResult.error) {
    return (
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <AdminErrorPanel error={quoteResult.error} />
        </div>
      </section>
    );
  }

  const quote = quoteResult.data;

  if (!quote) {
    return (
      <section className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-black text-slate-950">견적 요청을 찾을 수 없습니다</h1>
            <Link href={adminHref("/admin/quotes", tokenString)} className="mt-6 inline-flex font-black text-cyan-700">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-700">Quote Detail</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{quote.customer_name ?? "이름 없음"} 견적 요청</h1>
            <div className="mt-4 flex items-center gap-3">
              <QuoteStatusBadge status={quote.status} />
              <span className="text-sm font-semibold text-slate-500">접수일 {formatDateTime(quote.created_at)}</span>
            </div>
          </div>
          <Link href={adminHref("/admin/quotes", tokenString)} className="text-sm font-black text-slate-950 underline underline-offset-4">
            목록으로
          </Link>
        </div>

        {result === "updated" ? (
          <div className="mt-6 rounded-md bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-900">상태가 변경되었습니다.</div>
        ) : null}
        {result === "error" ? (
          <div className="mt-6 rounded-md bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">
            상태 변경이 실패했습니다. 현재 RLS 정책상 anon update가 막혀 있을 수 있습니다.
          </div>
        ) : null}

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailRow label="여행지" value={quote.destination_text} />
            <DetailRow label="일정" value={`${quote.start_date ?? "-"} - ${quote.end_date ?? "-"}`} />
            <DetailRow label="인원" value={`성인 ${quote.adults ?? 0}, 아동 ${quote.children ?? 0}, 유아 ${quote.infants ?? 0}`} />
            <DetailRow label="호텔 등급" value={quote.hotel_grade} />
            <DetailRow label="요청 서비스" value={quote.requested_services?.join(", ")} />
            <DetailRow label="예산" value={formatCurrency(quote.budget_krw)} />
            <DetailRow label="이름" value={quote.customer_name} />
            <DetailRow label="연락처" value={quote.phone} />
            <DetailRow label="카카오톡 ID" value={quote.kakao_id} />
            <DetailRow label="이메일" value={quote.email} />
            <DetailRow label="개인정보 동의" value={quote.privacy_agreed ? "동의" : "미동의"} />
            <DetailRow label="상태" value={<QuoteStatusBadge status={quote.status} />} />
            <div className="rounded-lg border border-slate-200 bg-white p-4 sm:col-span-2">
              <dt className="text-xs font-bold text-slate-500">문의 내용</dt>
              <dd className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-900">{quote.message || "-"}</dd>
            </div>
          </dl>

          <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-black text-slate-950">상태 변경</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              현재는 임시 관리자 MVP입니다. service role key를 쓰지 않으므로 RLS update 정책이 없으면 변경이 실패할 수 있습니다.
            </p>
            <form action={`/admin/quotes/${quote.id}/status?token=${encodeURIComponent(tokenString)}`} method="post" className="mt-5 space-y-4">
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
                상태값
                <select name="status" defaultValue={quote.status ?? "new"} className="rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500">
                  {quoteStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="w-full rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
                상태 변경
              </button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}
