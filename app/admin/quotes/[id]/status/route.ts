import { NextResponse } from "next/server";
import { isAdminTokenValid, quoteStatuses, updateQuoteStatus } from "@/lib/admin/quotes";

type StatusRouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: StatusRouteContext) {
  const { id } = await context.params;
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const redirectUrl = new URL(`/admin/quotes/${id}`, url.origin);
  redirectUrl.searchParams.set("token", token);

  if (!isAdminTokenValid(token)) {
    redirectUrl.searchParams.set("result", "error");
    return NextResponse.redirect(redirectUrl);
  }

  const formData = await request.formData();
  const status = formData.get("status");

  if (typeof status !== "string" || !quoteStatuses.includes(status as (typeof quoteStatuses)[number])) {
    redirectUrl.searchParams.set("result", "error");
    return NextResponse.redirect(redirectUrl);
  }

  const result = await updateQuoteStatus(id, status as (typeof quoteStatuses)[number]);

  if (result.error) {
    console.error("Admin quote status update failed:", {
      code: result.error.code,
      message: result.error.message,
      details: result.error.details,
      hint: result.error.hint,
      status: result.error.status,
    });
    redirectUrl.searchParams.set("result", "error");
    return NextResponse.redirect(redirectUrl);
  }

  redirectUrl.searchParams.set("result", "updated");
  return NextResponse.redirect(redirectUrl);
}
