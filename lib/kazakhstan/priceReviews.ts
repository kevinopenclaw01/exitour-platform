// 카자흐스탄 상품 가격 검수 상태. approved는 확정 절차 후에만 부여.

export type PriceVerification = "approved" | "unverified";

export type KazakhstanPriceReview = {
  verification: PriceVerification;
  internalNote: string;
};

export const kazakhstanPriceReviews: Readonly<Record<string, KazakhstanPriceReview>> = {
  "kazakhstan-4n6d-nature": {
    verification: "unverified",
    internalNote:
      "2026-10-13 2차 회의: 1019 행사 표 일부 대응. 상시 판매·4인 조건·항공 범위·실제 지급액 미확정. 고객 노출 금지 메모.",
  },
  "kazakhstan-charyn-canyon": {
    verification: "unverified",
    internalNote:
      "2026-10-13 2차 회의: 전체 원가와 과금 단위 미확정. 고객 노출 금지 메모.",
  },
};
