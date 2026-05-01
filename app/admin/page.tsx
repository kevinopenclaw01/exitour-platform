import Link from "next/link";
import AdminAccessDenied from "@/components/AdminAccessDenied";
import AdminErrorPanel from "@/components/AdminErrorPanel";
import QuoteStatusBadge from "@/components/QuoteStatusBadge";
import { adminHref, fetchQuoteRequests, getTokenString, isAdminTokenValid, quoteStatuses } from "@/lib/admin/quotes";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ token?: string | string[] }>;
};

const formatDateTime = (value: string | null) =>
  value ? new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : "-";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { token } = await searchParams;

  if (!isAdminTokenValid(token)) {
    return <AdminAccessDenied />;
  }

  const tokenString = getTokenString(token);
  const quotesResult = await fetchQuoteRequests();

  if (quotesResult.error) {
    return (
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">관리자 홈</h1>
          <div className="mt-8">
            <AdminErrorPanel error={quotesResult.error} />
          </div>
        </div>
      </section>
    );
  }

  const quotes = quotesResult.data;
  const total = quotes.length;
  const statusCounts = quoteStatuses.map((status) => ({
    status,
    count: quotes.filter((quote) => quote.status === status).length,
  }));
  const recentQuotes = quotes.slice(0, 5);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold text-cyan-700">Admin</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">관리자 홈</h1>
          </div>
          <Link
            href={adminHref("/admin/quotes", tokenString)}
            className="rounded-md bg-slate-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-800"
          >
            견적 요청 목록으로 이동
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-500">총 견적 요청</p>
            <p className="mt-3 text-3xl font-black text-slate-950">{total}</p>
          </div>
          {statusCounts.map((item) => (
            <div key={item.status} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <QuoteStatusBadge status={item.status} />
              <p className="mt-3 text-3xl font-black text-slate-950">{item.count}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">최근 견적 요청 5개</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="py-3 pr-4">이름</th>
                  <th className="py-3 pr-4">여행지</th>
                  <th className="py-3 pr-4">일정</th>
                  <th className="py-3 pr-4">상태</th>
                  <th className="py-3 pr-4">접수일</th>
                  <th className="py-3 pr-4">상세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="py-3 pr-4 font-bold text-slate-950">{quote.customer_name ?? "-"}</td>
                    <td className="py-3 pr-4 text-slate-600">{quote.destination_text ?? "-"}</td>
                    <td className="py-3 pr-4 text-slate-600">
                      {quote.start_date ?? "-"} - {quote.end_date ?? "-"}
                    </td>
                    <td className="py-3 pr-4">
                      <QuoteStatusBadge status={quote.status} />
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{formatDateTime(quote.created_at)}</td>
                    <td className="py-3 pr-4">
                      <Link href={adminHref(`/admin/quotes/${quote.id}`, tokenString)} className="font-black text-cyan-700">
                        보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}
