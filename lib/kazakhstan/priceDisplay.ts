// 가격 표시와 검수 상태를 구분하며 비정상 금액은 상담형으로 처리합니다.

import type { KazakhstanPriceReview, PriceVerification } from "./priceReviews";

export type KazakhstanPriceDisplay =
  | { kind: "consult"; amountKrw: null; label: "상담 문의"; verification: null }
  | { kind: "from-price"; amountKrw: number; label: string; verification: PriceVerification };

export const normalizePriceKrw = (value: number | null | undefined): number | null => {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) return null;
  return value;
};

export const getKazakhstanPriceDisplay = (
  priceFromKrw: number | null | undefined,
  review: KazakhstanPriceReview | undefined,
  options?: { showUnverified?: boolean },
): KazakhstanPriceDisplay => {
  const amount = normalizePriceKrw(priceFromKrw);
  if (amount === null) {
    return { kind: "consult", amountKrw: null, label: "상담 문의", verification: null };
  }

  const verification: PriceVerification = review?.verification ?? "unverified";

  if (verification === "unverified" && options?.showUnverified === false) {
    return { kind: "consult", amountKrw: null, label: "상담 문의", verification: null };
  }

  const label = `${new Intl.NumberFormat("ko-KR").format(amount)}원~`;
  return { kind: "from-price", amountKrw: amount, label, verification };
};

export const getKazakhstanOfferPrice = (display: KazakhstanPriceDisplay): number | null => {
  if (display.kind === "from-price" && display.verification === "approved") {
    return normalizePriceKrw(display.amountKrw);
  }
  return null;
};
