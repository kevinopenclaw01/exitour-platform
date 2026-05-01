import Link from "next/link";
import AdminAccessDenied from "@/components/AdminAccessDenied";
import AdminErrorPanel from "@/components/AdminErrorPanel";
import QuoteStatusBadge from "@/components/QuoteStatusBadge";
import { adminHref, fetchQuoteRequests, getTokenString, isAdminTokenValid, quoteStatuses } from "@/lib/admin/quotes";

export const dynamic = "force-dynamic";

type AdminQuotesPageProps = {
  searchParams: Promise<{ token?: string | string[]; status?: string | string[] }>;
};

const formatDateTime = (value: string | null) =>
  value ? new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";

const formatPeople = (adults: number | null, children: number | null, infants: number | null) =>
  `성인 ${adults ?? 0}, 아동 ${children ?? 0}, 유아 ${infants ?? 0}`;

export default async function AdminQuotesPage({ searchParams }: AdminQuotesPageProps) {
  const params = await searchParams;
  const token = params.token;
  const rawStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = rawStatus && quoteStatuses.includes(rawStatus as (typeof quoteStatuses)[number]) ? rawStatus : undefined;

  if (!isAdminTokenValid(token)) {
    return <AdminAccessDenied />;
  }

  const tokenString = getTokenString(token);
  const quotesResult = await fetchQuoteRequests(status);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-700">Admin Quotes</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">견적 요청 목록</h1>
          </div>
          <Link href={adminHref("/admin", tokenString)} className="text-sm font-black text-slate-950 underline underline-offset-4">
            관리자 홈
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href={adminHref("/admin/quotes", tokenString)}
            className={`rounded-md px-3 py-2 text-sm font-black ${!status ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}
          >
            전체
          </Link>
          {quoteStatuses.map((item) => (
            <Link
              key={item}
              href={`${adminHref("/admin/quotes", tokenString)}&status=${item}`}
              className={`rounded-md px-3 py-2 text-sm font-black ${status === item ? "bg-slate-950 text-white" : "bg-white text-slate-700"}`}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          {quotesResult.error ? (
            <AdminErrorPanel error={quotesResult.error} />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="px-4 py-3">이름</th>
                    <th className="px-4 py-3">여행지</th>
                    <th className="px-4 py-3">날짜</th>
                    <th className="px-4 py-3">인원</th>
                    <th className="px-4 py-3">연락처</th>
                    <th className="px-4 py-3">상태</th>
                    <th className="px-4 py-3">접수일</th>
                    <th className="px-4 py-3">상세</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quotesResult.data.map((quote) => (
                    <tr key={quote.id}>
                      <td className="px-4 py-3 font-bold text-slate-950">{quote.customer_name ?? "-"}</td>
                      <td className="px-4 py-3 text-slate-600">{quote.destination_text ?? "-"}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {quote.start_date ?? "-"} - {quote.end_date ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{formatPeople(quote.adults, quote.children, quote.infants)}</td>
                      <td className="px-4 py-3 text-slate-600">{quote.phone || quote.kakao_id || "-"}</td>
                      <td className="px-4 py-3">
                        <QuoteStatusBadge status={quote.status} />
                      </td>
                      <td className="px-4 py-3 text-slate-600">{formatDateTime(quote.created_at)}</td>
                      <td className="px-4 py-3">
                        <Link href={adminHref(`/admin/quotes/${quote.id}`, tokenString)} className="font-black text-cyan-700">
                          보기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
