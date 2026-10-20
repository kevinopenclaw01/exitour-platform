import test from "node:test";
import assert from "node:assert/strict";
import { calculatePricing } from "./calculate.ts";

const CALC_AT = "2026-10-13T00:00:00Z";
const VALID_UNTIL = "2026-10-14T00:00:00Z";

function kztRate(over = {}) {
  return {
    id: "synthetic-fx-kzt",
    source: "manual",
    baseCurrency: "KZT",
    quoteCurrency: "KRW",
    rateMicros: 2916667,
    rateKind: "remittance",
    observedAt: "2026-10-12T00:00:00Z",
    capturedAt: "2026-10-12T01:00:00Z",
    validUntil: "2026-10-14T00:00:00Z",
    ...over,
  };
}

function usdRate(over = {}) {
  return {
    id: "synthetic-fx-usd",
    source: "manual",
    baseCurrency: "USD",
    quoteCurrency: "KRW",
    rateMicros: 1400000000,
    rateKind: "remittance",
    observedAt: "2026-10-12T00:00:00Z",
    capturedAt: "2026-10-12T01:00:00Z",
    validUntil: "2026-10-14T00:00:00Z",
    ...over,
  };
}

function line(over = {}) {
  return {
    id: "synthetic-line-1",
    title: "synthetic KZT line",
    currency: "KZT",
    amountMinor: 16500000,
    quantity: 1,
    unit: "per-group",
    verification: "verified",
    sourceReference: "synthetic-fixture",
    ...over,
  };
}

function baseInput(over = {}) {
  return {
    productId: "synthetic-product",
    revisionId: "synthetic-rev-1",
    travelers: 4,
    minTravelers: 2,
    costLines: [line()],
    rates: [kztRate(), usdRate()],
    policy: {
      markupBps: 0,
      fixedFeeKrw: 0,
      roundingKrw: 1,
      requiredRateKind: "remittance",
    },
    calculatedAt: CALC_AT,
    validUntil: VALID_UNTIL,
    ...over,
  };
}

function assertCalc(actual, exp) {
  assert.equal(actual.costKrw, exp.cost);
  assert.equal(actual.markupKrw, exp.markup);
  assert.equal(actual.calculatedTotalKrw, exp.total);
  assert.equal(actual.displayPerPersonKrw, exp.perPerson);
  assert.equal(actual.displayTotalKrw, exp.displayTotal);
  assert.deepEqual(actual.lines.map((l) => l.totalKrw), exp.lines);
}

test("1. KZT 환산", () => {
  const r = calculatePricing(baseInput());
  assertCalc(r, { cost: 481251, markup: 0, total: 481251, perPerson: 120313, displayTotal: 481252, lines: [481251] });
});

test("2. USD 환산", () => {
  const r1 = calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-usd", title: "synthetic USD line", currency: "USD", amountMinor: 10000, unit: "per-group" })] }));
  assert.equal(r1.costKrw, 140000);
  assert.equal(r1.displayPerPersonKrw, 35000);
  const r2 = calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-usd", title: "synthetic USD line", currency: "USD", amountMinor: 10000, unit: "per-person" })] }));
  assert.deepEqual(r2.lines.map((l) => l.totalKrw), [560000]);
  assert.equal(r2.displayPerPersonKrw, 140000);
});

test("3. 라인 합계에서 한 번만 올림", () => {
  const r = calculatePricing(baseInput({ costLines: [line({ unit: "per-person" })] }));
  assert.deepEqual(r.lines.map((l) => l.totalKrw), [1925001]);
});

test("4. 정책 조합", () => {
  const r = calculatePricing(baseInput({
    costLines: [
      line(),
      line({ id: "synthetic-line-usd", title: "synthetic USD line", currency: "USD", amountMinor: 10000, unit: "per-person" }),
    ],
    policy: { markupBps: 2000, fixedFeeKrw: 10000, roundingKrw: 1000, requiredRateKind: "remittance" },
  }));
  assertCalc(r, { cost: 1041251, markup: 208251, total: 1259502, perPerson: 315000, displayTotal: 1260000, lines: [481251, 560000] });
});

test("5. KRW 원 단위", () => {
  const r = calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-krw", title: "synthetic KRW line", currency: "KRW", amountMinor: 100000 })], rates: [] }));
  assert.equal(r.costKrw, 100000);
  assert.equal(r.displayPerPersonKrw, 25000);
});

test("6. 0원 라인 허용 / 0원만 있으면 throw / 빈 costLines throw", () => {
  const r = calculatePricing(baseInput({ costLines: [line(), line({ id: "synthetic-line-krw", title: "synthetic KRW zero line", currency: "KRW", amountMinor: 0 })] }));
  assert.deepEqual(r.lines.map((l) => l.totalKrw), [481251, 0]);
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-krw", title: "synthetic KRW zero line", currency: "KRW", amountMinor: 0 })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ costLines: [] })), Error);
});

test("7. 숫자 오류", () => {
  for (const v of [-1, NaN, Infinity, 1.5]) {
    assert.throws(() => calculatePricing(baseInput({ costLines: [line({ amountMinor: v })] })), Error);
  }
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ quantity: 0 })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ travelers: 0 })), Error);
  for (const v of [0, 1.5]) {
    assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ rateMicros: v }), usdRate()] })), Error);
  }
  assert.throws(() => calculatePricing(baseInput({ policy: { markupBps: -1, fixedFeeKrw: 0, roundingKrw: 1, requiredRateKind: "remittance" } })), Error);
  assert.throws(() => calculatePricing(baseInput({ policy: { markupBps: 0, fixedFeeKrw: -1, roundingKrw: 1, requiredRateKind: "remittance" } })), Error);
  assert.throws(() => calculatePricing(baseInput({ policy: { markupBps: 0, fixedFeeKrw: 0, roundingKrw: 0, requiredRateKind: "remittance" } })), Error);
});

test("8. safe integer 초과", () => {
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ amountMinor: 2 ** 53 })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-usd", title: "synthetic USD line", currency: "USD", amountMinor: Number.MAX_SAFE_INTEGER, unit: "per-group" })] })), Error);
});

test("9. 환율 누락", () => {
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ id: "synthetic-line-usd", title: "synthetic USD line", currency: "USD", amountMinor: 10000 })], rates: [kztRate()] })), Error);
});

test("10. 만료", () => {
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ validUntil: CALC_AT }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ validUntil: "2026-10-15T00:00:00Z" })), Error);
  assert.throws(() => calculatePricing(baseInput({ validUntil: CALC_AT })), Error);
});

test("11. 미래 시각", () => {
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ observedAt: "2026-10-13T00:00:01Z" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ capturedAt: "2026-10-13T00:00:01Z" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ observedAt: "2026-10-12T02:00:00Z" }), usdRate()] })), Error);
  const r = calculatePricing(baseInput({ rates: [kztRate({ capturedAt: "2026-10-13T08:00:00+09:00" }), usdRate()] }));
  assert.equal(r.costKrw, 481251);
});

test("12. 중복", () => {
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate(), kztRate({ id: "synthetic-fx-kzt-2" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ costLines: [line(), line()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate(), usdRate({ id: "synthetic-fx-kzt" })] })), Error);
});

test("13. 최소 인원 미달", () => {
  assert.throws(() => calculatePricing(baseInput({ travelers: 1, minTravelers: 2 })), Error);
});

test("14. 잘못된 열거값", () => {
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ unit: "per-room" })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ currency: "EUR" })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ source: "api" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ costLines: [line({ verification: "approved" })] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ rateKind: "cash-buy" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ rateKind: "card" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ policy: { markupBps: 0, fixedFeeKrw: 0, roundingKrw: 1, requiredRateKind: "card" } })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ baseCurrency: "KRW" }), usdRate()] })), Error);
  assert.throws(() => calculatePricing(baseInput({ rates: [kztRate({ quoteCurrency: "USD" }), usdRate()] })), Error);
});

test("15. 날짜 형식", () => {
  for (const d of ["2026-10-13", "2026-10-13T00:00:00", "not-a-date", "2026-02-30T00:00:00Z"]) {
    assert.throws(() => calculatePricing(baseInput({ calculatedAt: d })), Error);
  }
});

test("16. 미검증 라인", () => {
  const r = calculatePricing(baseInput({ costLines: [line({ verification: "unverified" })] }));
  assertCalc(r, { cost: 481251, markup: 0, total: 481251, perPerson: 120313, displayTotal: 481252, lines: [481251] });
});

test("17. 결정성과 입력 보존", () => {
  const input = baseInput();
  const before = structuredClone(input);
  const a = calculatePricing(input);
  const b = calculatePricing(baseInput());
  assert.deepStrictEqual(a, b);
  assert.deepStrictEqual(input, before);
});

test("18. 인원 곱셈도 BigInt로 계산해 원단위 올림 경계를 보존", () => {
  const input = baseInput({
    travelers: 3,
    costLines: [line({ currency: "USD", amountMinor: 1, quantity: 9007199166666667, unit: "per-person" })],
    rates: [usdRate({ rateMicros: 1 })],
  });
  assert.equal(calculatePricing(input).costKrw, 270215976);
});

test("19. 1인 표시가는 안전해도 결제 총액 오버플로면 거부", () => {
  assert.throws(() => calculatePricing(baseInput({
    travelers: 2, costLines: [line({ currency: "KRW", amountMinor: Number.MAX_SAFE_INTEGER })], rates: [],
  })), Error);
});

test("20. 24시 날짜 자동 보정과 잘못된 시간 형식을 거부", () => {
  for (const calculatedAt of ["2026-10-12T24:00:00Z", "2026-10-13T00:60:00Z", "2026-10-13T00:00:60Z"]) {
    assert.throws(() => calculatePricing(baseInput({ calculatedAt })), Error);
  }
});
