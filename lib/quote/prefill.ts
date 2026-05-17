export type QuotePrefillInput = {
  productId?: string;
  product?: string;
  destination?: string;
  service?: string;
  sourcePath?: string;
};

const limits: Record<keyof QuotePrefillInput, number> = {
  productId: 120,
  product: 180,
  destination: 100,
  service: 100,
  sourcePath: 220,
};

const stripControlChars = (value: string) => value.replace(/[\u0000-\u001f\u007f]/g, " ");

export const sanitizeQuotePrefillValue = (value: unknown, key: keyof QuotePrefillInput) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const sanitized = stripControlChars(value).replace(/\s+/g, " ").trim().slice(0, limits[key]);
  return sanitized.length > 0 ? sanitized : undefined;
};

export const sanitizeQuotePrefill = (input: QuotePrefillInput): QuotePrefillInput => ({
  productId: sanitizeQuotePrefillValue(input.productId, "productId"),
  product: sanitizeQuotePrefillValue(input.product, "product"),
  destination: sanitizeQuotePrefillValue(input.destination, "destination"),
  service: sanitizeQuotePrefillValue(input.service, "service"),
  sourcePath: sanitizeQuotePrefillValue(input.sourcePath, "sourcePath"),
});

export const buildQuoteUrl = (input: QuotePrefillInput) => {
  const prefill = sanitizeQuotePrefill(input);
  const params = new URLSearchParams();

  Object.entries(prefill).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();
  return queryString ? `/quote?${queryString}` : "/quote";
};

export const hasQuotePrefill = (prefill?: QuotePrefillInput) =>
  Boolean(prefill?.productId || prefill?.product || prefill?.destination || prefill?.service || prefill?.sourcePath);

export const formatQuotePrefillMessage = (prefill?: QuotePrefillInput) => {
  const sanitized = sanitizeQuotePrefill(prefill ?? {});

  if (!hasQuotePrefill(sanitized)) {
    return "";
  }

  return [
    "[자동 입력 정보]",
    sanitized.product ? `상품명: ${sanitized.product}` : undefined,
    sanitized.destination ? `여행지: ${sanitized.destination}` : undefined,
    sanitized.service ? `문의 유형: ${sanitized.service}` : undefined,
    sanitized.sourcePath ? `유입 페이지: ${sanitized.sourcePath}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
};
