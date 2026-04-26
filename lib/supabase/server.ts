type SupabaseInsertResult<T> =
  | { data: T; error: null }
  | {
      data: null;
      error: {
        code?: string;
        message: string;
        details?: string;
        hint?: string;
        status: number;
      };
    };

const getSupabaseConfig = () => {
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

export async function insertSupabaseRow<TPayload extends Record<string, unknown>, TResult>(
  table: string,
  payload: TPayload,
): Promise<SupabaseInsertResult<TResult[]>> {
  const { anonKey, restUrl } = getSupabaseConfig();

  const response = await fetch(`${restUrl}/${table}`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const body = (await response.json().catch(() => null)) as
    | TResult[]
    | { code?: string; message?: string; details?: string; hint?: string }
    | null;

  if (!response.ok) {
    const errorBody = body && !Array.isArray(body) ? body : null;
    return {
      data: null,
      error: {
        message: errorBody?.message ?? "Supabase insert failed.",
        details: errorBody?.details,
        hint: errorBody?.hint,
        code: errorBody?.code,
        status: response.status,
      },
    };
  }

  return {
    data: Array.isArray(body) ? body : [],
    error: null,
  };
}
