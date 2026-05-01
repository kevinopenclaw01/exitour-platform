import { redirect } from "next/navigation";

export const quoteStatuses = ["new", "contacted", "confirmed", "closed"] as const;

export type QuoteStatus = (typeof quoteStatuses)[number];

export type QuoteRequest = {
  id: string;
  destination_text: string | null;
  start_date: string | null;
  end_date: string | null;
  adults: number | null;
  children: number | null;
  infants: number | null;
  hotel_grade: string | null;
  requested_services: string[] | null;
  budget_krw: number | null;
  customer_name: string | null;
  phone: string | null;
  kakao_id: string | null;
  email: string | null;
  message: string | null;
  privacy_agreed: boolean | null;
  status: QuoteStatus | string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type SupabaseAdminError = {
  code?: string;
  message: string;
  details?: string;
  hint?: string;
  status: number;
};

export type SupabaseAdminResult<T> =
  | { data: T; error: null }
  | { data: null; error: SupabaseAdminError };

const getSupabaseRestConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase public URL and anon key are required.");
  }

  return {
    anonKey,
    restUrl: `${url.replace(/\/$/, "")}/rest/v1`,
  };
};

const parseSupabaseError = async (response: Response): Promise<SupabaseAdminError> => {
  const body = (await response.json().catch(() => null)) as
    | { code?: string; message?: string; details?: string; hint?: string }
    | null;

  return {
    code: body?.code,
    message: body?.message ?? "Supabase request failed.",
    details: body?.details,
    hint: body?.hint,
    status: response.status,
  };
};

export const isAdminTokenValid = (token: string | string[] | undefined) => {
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN;
  const givenToken = Array.isArray(token) ? token[0] : token;

  return Boolean(expectedToken && givenToken && givenToken === expectedToken);
};

export const getTokenString = (token: string | string[] | undefined) =>
  Array.isArray(token) ? token[0] ?? "" : token ?? "";

export const adminHref = (path: string, token: string) => `${path}?token=${encodeURIComponent(token)}`;

export async function fetchQuoteRequests(status?: string): Promise<SupabaseAdminResult<QuoteRequest[]>> {
  const { anonKey, restUrl } = getSupabaseRestConfig();
  const params = new URLSearchParams({
    select: "*",
    order: "created_at.desc",
    limit: "100",
  });

  if (status && quoteStatuses.includes(status as QuoteStatus)) {
    params.set("status", `eq.${status}`);
  }

  const response = await fetch(`${restUrl}/quote_requests?${params.toString()}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: null, error: await parseSupabaseError(response) };
  }

  return { data: (await response.json()) as QuoteRequest[], error: null };
}

export async function fetchQuoteRequestById(id: string): Promise<SupabaseAdminResult<QuoteRequest | null>> {
  const { anonKey, restUrl } = getSupabaseRestConfig();
  const params = new URLSearchParams({
    select: "*",
    id: `eq.${id}`,
    limit: "1",
  });

  const response = await fetch(`${restUrl}/quote_requests?${params.toString()}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: null, error: await parseSupabaseError(response) };
  }

  const rows = (await response.json()) as QuoteRequest[];
  return { data: rows[0] ?? null, error: null };
}

export async function updateQuoteStatus(id: string, status: QuoteStatus): Promise<SupabaseAdminResult<null>> {
  const { anonKey, restUrl } = getSupabaseRestConfig();
  const params = new URLSearchParams({
    id: `eq.${id}`,
  });

  const response = await fetch(`${restUrl}/quote_requests?${params.toString()}`, {
    method: "PATCH",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: null, error: await parseSupabaseError(response) };
  }

  return { data: null, error: null };
}

export function redirectToQuoteDetail(id: string, token: string, result: "updated" | "error") {
  redirect(`/admin/quotes/${id}?token=${encodeURIComponent(token)}&result=${result}`);
}
