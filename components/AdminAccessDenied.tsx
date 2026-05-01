export default function AdminAccessDenied() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-bold text-red-700">Admin Access Required</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">관리자 접근이 차단되었습니다</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            임시 관리자 보호 방식으로 URL query에 유효한 token이 필요합니다. 실제 토큰 값은 환경변수
            `ADMIN_ACCESS_TOKEN`에만 보관하고 코드나 클라이언트 번들에 노출하지 않습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
