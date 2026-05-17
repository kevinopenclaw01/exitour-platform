import { NextResponse } from "next/server";
import { sendQuoteNotification } from "@/lib/email/sendQuoteNotification";
import { formatQuotePrefillMessage, sanitizeQuotePrefill, type QuotePrefillInput } from "@/lib/quote/prefill";
import { insertSupabaseRow } from "@/lib/supabase/server";

type QuotePayload = {
  destination_text: string;
  start_date: string;
  end_date: string;
  adults: number;
  children?: number;
  infants?: number;
  hotel_grade?: string;
  requested_services?: string[];
  budget_krw?: number;
  customer_name: string;
  phone?: string;
  kakao_id?: string;
  email?: string;
  message?: string;
  privacy_agreed: boolean;
};

type ValidatedQuotePayload = QuotePayload & {
  quote_prefill?: QuotePrefillInput;
};

const successMessage = "문의가 접수되었습니다. EXITour 담당자가 여행 일정과 가능 여부를 확인한 뒤 안내드리겠습니다.";
const failureMessage = "입력값을 확인해 주세요.";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const toOptionalString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;

const toRequiredString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const toNumber = (value: unknown) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : NaN;
  }

  if (typeof value === "string" && value.trim() !== "") {
    return Number(value);
  }

  return NaN;
};

const toOptionalNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const numberValue = toNumber(value);
  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const isValidDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));

const toServiceArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isNonEmptyString).map((item) => item.trim());
};

const toQuotePrefill = (value: unknown) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const prefill = sanitizeQuotePrefill(value as QuotePrefillInput);
  return prefill.productId || prefill.product || prefill.destination || prefill.service || prefill.sourcePath ? prefill : undefined;
};

const appendPrefillToMessage = (payload: ValidatedQuotePayload): QuotePayload => {
  const { quote_prefill: quotePrefill, ...quotePayload } = payload;
  const prefillMessage = formatQuotePrefillMessage(quotePrefill);

  if (!prefillMessage) {
    return quotePayload;
  }

  const customerMessage = quotePayload.message?.trim();

  return {
    ...quotePayload,
    message: customerMessage ? `${prefillMessage}\n\n[고객 문의 내용]\n${customerMessage}` : prefillMessage,
  };
};

const validateQuotePayload = (body: Record<string, unknown>): ValidatedQuotePayload | null => {
  const destinationText = toRequiredString(body.destination_text);
  const startDate = toRequiredString(body.start_date);
  const endDate = toRequiredString(body.end_date);
  const adults = toNumber(body.adults);
  const customerName = toRequiredString(body.customer_name);
  const phone = toOptionalString(body.phone);
  const kakaoId = toOptionalString(body.kakao_id);
  const privacyAgreed = body.privacy_agreed === true;

  if (!destinationText || !isValidDate(startDate) || !isValidDate(endDate)) {
    return null;
  }

  if (new Date(startDate) > new Date(endDate)) {
    return null;
  }

  if (!Number.isInteger(adults) || adults < 1) {
    return null;
  }

  if (!customerName || (!phone && !kakaoId) || !privacyAgreed) {
    return null;
  }

  const children = toOptionalNumber(body.children);
  const infants = toOptionalNumber(body.infants);
  const budgetKrw = toOptionalNumber(body.budget_krw);

  if (
    (children !== undefined && (!Number.isInteger(children) || children < 0)) ||
    (infants !== undefined && (!Number.isInteger(infants) || infants < 0)) ||
    (budgetKrw !== undefined && (!Number.isInteger(budgetKrw) || budgetKrw < 0))
  ) {
    return null;
  }

  return {
    destination_text: destinationText,
    start_date: startDate,
    end_date: endDate,
    adults,
    children,
    infants,
    hotel_grade: toOptionalString(body.hotel_grade),
    requested_services: toServiceArray(body.requested_services),
    budget_krw: budgetKrw,
    customer_name: customerName,
    phone,
    kakao_id: kakaoId,
    email: toOptionalString(body.email),
    message: toOptionalString(body.message),
    quote_prefill: toQuotePrefill(body.quote_prefill),
    privacy_agreed: privacyAgreed,
  };
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const payload = validateQuotePayload(body);

    if (!payload) {
      return NextResponse.json({ ok: false, message: failureMessage }, { status: 400 });
    }

    const insertPayload = appendPrefillToMessage(payload);
    const { error } = await insertSupabaseRow<QuotePayload, { id: string }>("quote_requests", insertPayload);

    if (error) {
      console.error("Quote insert failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        status: error.status,
      });

      const debug =
        process.env.NODE_ENV === "production"
          ? undefined
          : {
              code: error.code,
              message: error.message,
              details: error.details,
              hint: error.hint,
              status: error.status,
              table: "quote_requests",
            };

      return NextResponse.json({ ok: false, message: failureMessage, debug }, { status: 500 });
    }

    try {
      await sendQuoteNotification(insertPayload);
    } catch (emailError) {
      console.error("Quote notification email failed:", {
        message: emailError instanceof Error ? emailError.message : "Unknown email error",
        name: emailError instanceof Error ? emailError.name : undefined,
      });
    }

    return NextResponse.json({ ok: true, message: successMessage });
  } catch (error) {
    console.error("Quote route failed:", error);
    return NextResponse.json({ ok: false, message: failureMessage }, { status: 500 });
  }
}
