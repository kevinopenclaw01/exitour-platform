const statusLabels: Record<string, string> = {
  new: "신규",
  contacted: "연락 완료",
  confirmed: "확정",
  closed: "종료",
};

export default function QuoteStatusBadge({ status }: { status: string | null | undefined }) {
  const value = status ?? "new";

  return (
    <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-700">
      {statusLabels[value] ?? value}
    </span>
  );
}
