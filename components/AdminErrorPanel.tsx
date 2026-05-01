import type { SupabaseAdminError } from "@/lib/admin/quotes";

export default function AdminErrorPanel({ error }: { error: SupabaseAdminError }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
      <p className="font-black">Supabase 요청이 RLS 또는 권한 정책에 의해 차단되었습니다.</p>
      <p className="mt-2 leading-6">
        현재 Phase 5는 service role key를 사용하지 않고 anon key로만 조회/수정을 시도합니다. `quote_requests`의
        select/update 정책이 없다면 관리자 MVP 조회와 상태 변경은 실제 DB에서 실패하는 것이 정상입니다.
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-2">
        <div>
          <dt className="font-bold">status</dt>
          <dd>{error.status}</dd>
        </div>
        <div>
          <dt className="font-bold">code</dt>
          <dd>{error.code ?? "-"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-bold">message</dt>
          <dd>{error.message}</dd>
        </div>
        {error.details ? (
          <div className="sm:col-span-2">
            <dt className="font-bold">details</dt>
            <dd>{error.details}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
