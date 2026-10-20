// P1 요금 계산 초안: DB·승인·동결 없이 순수 계산만 한다.
import type { PricingInput, PricingCalculation } from "./types";

function ceilDiv(a: bigint, b: bigint): bigint {
  if (a < BigInt(0) || b <= BigInt(0)) throw new Error("pricing: invalid division");
  return (a + b - BigInt(1)) / b;
}

function assertSafeInt(v: unknown, name: string): number {
  if (typeof v !== "number" || !Number.isSafeInteger(v)) throw new Error(`pricing: ${name} not safe integer`);
  return v;
}

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2})$/;
export function parsePricingTimestamp(s: string, name = "timestamp"): number {
  if (typeof s !== "string") throw new Error(`pricing: ${name} not string`);
  const m = DATE_RE.exec(s);
  if (!m) throw new Error(`pricing: ${name} invalid format`);
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  if (mo < 1 || mo > 12) throw new Error(`pricing: ${name} bad month`);
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
  if (d < 1 || d > days) throw new Error(`pricing: ${name} bad day`);
  if (Number(m[4]) > 23 || Number(m[5]) > 59 || (m[6] && Number(m[6].slice(1)) >= 60)) {
    throw new Error(`pricing: ${name} bad time`);
  }
  if (m[8] !== "Z" && (Number(m[8].slice(1, 3)) > 23 || Number(m[8].slice(4)) > 59)) {
    throw new Error(`pricing: ${name} bad offset`);
  }
  const ms = Date.parse(s);
  if (Number.isNaN(ms)) throw new Error(`pricing: ${name} unparseable`);
  return ms;
}

function assertNonEmptyString(v: unknown, name: string): string {
  if (typeof v !== "string" || v.trim() === "") throw new Error(`pricing: ${name} empty`);
  return v;
}

export function calculatePricing(input: PricingInput): PricingCalculation {
  assertNonEmptyString(input.productId, "productId");
  assertNonEmptyString(input.revisionId, "revisionId");
  const travelers = assertSafeInt(input.travelers, "travelers");
  const minTravelers = assertSafeInt(input.minTravelers, "minTravelers");
  if (travelers < 1) throw new Error("pricing: travelers<1");
  if (minTravelers < 1) throw new Error("pricing: minTravelers<1");
  if (travelers < minTravelers) throw new Error("pricing: below minTravelers");

  const policy = input.policy;
  const markupBps = assertSafeInt(policy.markupBps, "markupBps");
  const fixedFeeKrw = assertSafeInt(policy.fixedFeeKrw, "fixedFeeKrw");
  const roundingKrw = assertSafeInt(policy.roundingKrw, "roundingKrw");
  if (markupBps < 0) throw new Error("pricing: markupBps<0");
  if (fixedFeeKrw < 0) throw new Error("pricing: fixedFeeKrw<0");
  if (roundingKrw < 1) throw new Error("pricing: roundingKrw<1");

  const reqKind = policy.requiredRateKind;
  if (!["cash-buy", "remittance", "reference"].includes(reqKind)) throw new Error("pricing: bad requiredRateKind");

  parsePricingTimestamp(input.calculatedAt, "calculatedAt");
  const validUntilMs = parsePricingTimestamp(input.validUntil, "validUntil");
  if (!(validUntilMs > Date.parse(input.calculatedAt))) throw new Error("pricing: validUntil<=calculatedAt");

  if (!Array.isArray(input.costLines) || input.costLines.length === 0) throw new Error("pricing: empty costLines");
  const lineIds = new Set<string>();
  for (const cl of input.costLines) {
    assertNonEmptyString(cl.id, "line.id");
    assertNonEmptyString(cl.title, "line.title");
    assertNonEmptyString(cl.sourceReference, "line.sourceReference");
    if (lineIds.has(cl.id)) throw new Error("pricing: duplicate line id");
    lineIds.add(cl.id);
    if (!["KRW", "USD", "KZT"].includes(cl.currency)) throw new Error("pricing: bad currency");
    if (!["per-person", "per-group"].includes(cl.unit)) throw new Error("pricing: bad unit");
    if (!["verified", "unverified"].includes(cl.verification)) throw new Error("pricing: bad verification");
    const amt = assertSafeInt(cl.amountMinor, "amountMinor");
    const qty = assertSafeInt(cl.quantity, "quantity");
    if (amt < 0) throw new Error("pricing: amountMinor<0");
    if (qty < 1) throw new Error("pricing: quantity<1");
  }

  if (!Array.isArray(input.rates)) throw new Error("pricing: rates not array");
  const rateIds = new Set<string>();
  const rateByCur = new Map<string, typeof input.rates[0]>();
  for (const r of input.rates) {
    assertNonEmptyString(r.id, "rate.id");
    if (r.source !== "manual") throw new Error("pricing: rate.source!=manual");
    if (!(["USD", "KZT"] as string[]).includes(r.baseCurrency)) throw new Error("pricing: bad baseCurrency");
    if (r.quoteCurrency !== "KRW") throw new Error("pricing: quoteCurrency!=KRW");
    if (rateIds.has(r.id)) throw new Error("pricing: duplicate rate id");
    rateIds.add(r.id);
    if (rateByCur.has(r.baseCurrency)) throw new Error("pricing: duplicate baseCurrency");
    const rm = assertSafeInt(r.rateMicros, "rateMicros");
    if (rm < 1) throw new Error("pricing: rateMicros<1");
    if (!["cash-buy", "remittance", "reference"].includes(r.rateKind)) throw new Error("pricing: bad rateKind");
    if (r.rateKind !== reqKind) throw new Error("pricing: rateKind!=requiredRateKind");
    parsePricingTimestamp(r.observedAt, "observedAt");
    parsePricingTimestamp(r.capturedAt, "capturedAt");
    const rValid = parsePricingTimestamp(r.validUntil, "rate.validUntil");
    const obsMs = Date.parse(r.observedAt);
    const capMs = Date.parse(r.capturedAt);
    const calcMs = Date.parse(input.calculatedAt);
    if (!(obsMs <= capMs)) throw new Error("pricing: observed>captured");
    if (!(capMs <= calcMs)) throw new Error("pricing: captured>calculatedAt");
    if (!(rValid > calcMs)) throw new Error("pricing: rate.validUntil<=calculatedAt");
    rateByCur.set(r.baseCurrency, r);
  }

  const microDiv = BigInt(100) * BigInt(1000000);
  const lineTotals: { id: string; totalKrw: number }[] = [];
  let costKrwB = BigInt(0);
  for (const cl of input.costLines) {
    const units = BigInt(cl.quantity) * (cl.unit === "per-person" ? BigInt(travelers) : BigInt(1));
    let lineKrw: bigint;
    if (cl.currency === "KRW") {
      lineKrw = BigInt(cl.amountMinor) * units;
    } else {
      const r = rateByCur.get(cl.currency);
      if (!r) throw new Error(`pricing: missing rate ${cl.currency}`);
      if (!(validUntilMs <= Date.parse(r.validUntil))) throw new Error("pricing: validUntil>rate.validUntil");
      lineKrw = ceilDiv(BigInt(cl.amountMinor) * units * BigInt(r.rateMicros), microDiv);
    }
    if (lineKrw > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("pricing: line overflow");
    const totalNum = Number(lineKrw);
    lineTotals.push({ id: cl.id, totalKrw: totalNum });
    costKrwB += lineKrw;
  }
  if (costKrwB <= BigInt(0)) throw new Error("pricing: zero costKrw");

  const markupKrwB = ceilDiv(costKrwB * BigInt(markupBps), BigInt(10000));
  const totalB = costKrwB + markupKrwB + BigInt(fixedFeeKrw);
  const perPersonB = ceilDiv(totalB, BigInt(travelers) * BigInt(roundingKrw)) * BigInt(roundingKrw);
  const displayTotalB = perPersonB * BigInt(travelers);

  for (const value of [costKrwB, markupKrwB, totalB, perPersonB, displayTotalB]) {
    if (value > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("pricing: total overflow");
  }

  const costKrw = Number(costKrwB), markupKrw = Number(markupKrwB);
  const calculatedTotalKrw = Number(totalB), displayPerPersonKrw = Number(perPersonB);
  for (const v of [costKrw, markupKrw, calculatedTotalKrw, displayPerPersonKrw]) {
    if (!Number.isSafeInteger(v)) throw new Error("pricing: total overflow");
  }

  return {
    costKrw,
    markupKrw,
    calculatedTotalKrw,
    displayPerPersonKrw,
    displayTotalKrw: Number(displayTotalB),
    lines: lineTotals,
  };
}
