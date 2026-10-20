export type PricingCurrency = "KRW" | "USD" | "KZT";
export type ExchangeRateKind = "cash-buy" | "remittance" | "reference";

export type FxSnapshot = {
  id: string;
  source: "manual";
  baseCurrency: Exclude<PricingCurrency, "KRW">;
  quoteCurrency: "KRW";
  rateMicros: number;
  rateKind: ExchangeRateKind;
  observedAt: string;
  capturedAt: string;
  validUntil: string;
};

export type SupplierCostLine = {
  id: string;
  title: string;
  currency: PricingCurrency;
  amountMinor: number;
  quantity: number;
  unit: "per-person" | "per-group";
  verification: "verified" | "unverified";
  sourceReference: string;
};

export type PricingInput = {
  productId: string;
  revisionId: string;
  travelers: number;
  minTravelers: number;
  costLines: SupplierCostLine[];
  rates: FxSnapshot[];
  policy: {
    markupBps: number;
    fixedFeeKrw: number;
    roundingKrw: number;
    requiredRateKind: ExchangeRateKind;
  };
  calculatedAt: string;
  validUntil: string;
};

export type PricingCalculation = {
  costKrw: number;
  markupKrw: number;
  calculatedTotalKrw: number;
  displayPerPersonKrw: number;
  displayTotalKrw: number;
  lines: { id: string; totalKrw: number }[];
};
