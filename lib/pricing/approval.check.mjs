import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

if (!process.env.PRICING_BUILD_DIR) throw new Error("Run npm.cmd run test:pricing.");
const require = createRequire(import.meta.url);
const { createPriceProposal, approvePriceProposal, rejectPriceProposal, getApprovedPublicPrice } =
  require(join(process.env.PRICING_BUILD_DIR, "approval.js"));

function fixture() {
  return {
    productId: "synthetic-test-only", revisionId: "test-revision-1", travelers: 4, minTravelers: 4,
    calculatedAt: "2026-10-13T00:00:00Z", validUntil: "2026-10-14T00:00:00Z",
    costLines: [{ id: "test-cost", title: "검증용 가상 원가", currency: "USD", amountMinor: 10000,
      quantity: 1, unit: "per-person", verification: "verified", sourceReference: "synthetic fixture, not supplier data" }],
    rates: [{ id: "test-usd", source: "manual", baseCurrency: "USD", quoteCurrency: "KRW",
      rateMicros: 1400000000, rateKind: "cash-buy", observedAt: "2026-10-12T23:00:00Z",
      capturedAt: "2026-10-12T23:30:00Z", validUntil: "2026-10-14T00:00:00Z" }],
    policy: { markupBps: 2000, fixedFeeKrw: 10000, roundingKrw: 1000, requiredRateKind: "cash-buy" },
  };
}

function approve(proposal, overrides = {}) {
  return approvePriceProposal(proposal, {
    actorId: "test-reviewer", at: "2026-10-13T01:00:00Z", expectedFingerprint: proposal.fingerprint, ...overrides,
  });
}

describe("pricing proposal transitions (not live authorization)", () => {
  it("pending and rejected proposals cannot return a public price", () => {
    const pending = createPriceProposal(fixture(), "test-author");
    assert.equal(pending.status, "pending");
    assert.equal(getApprovedPublicPrice(pending, "2026-10-13T01:00:00Z"), null);
    const rejected = rejectPriceProposal(pending, {
      actorId: "test-reviewer", at: "2026-10-13T01:00:00Z", reason: "가상 검증용 반려",
      expectedFingerprint: pending.fingerprint,
    });
    assert.equal(getApprovedPublicPrice(rejected, "2026-10-13T02:00:00Z"), null);
    assert.equal(pending.status, "pending");
    assert.equal(rejected.audit.length, 2);
    assert.throws(() => approve(rejected));
  });
  it("approved DTO excludes supplier cost, rate, actor and internal source", () => {
    const proposal = createPriceProposal(fixture(), "test-author");
    const approved = approve(proposal);
    assert.deepEqual(getApprovedPublicPrice(approved, "2026-10-13T02:00:00Z"), {
      productId: "synthetic-test-only", revisionId: "test-revision-1", currency: "KRW",
      pricePerPersonKrw: 171000, priceTotalKrw: 684000, travelers: 4, minTravelers: 4,
      validUntil: "2026-10-14T00:00:00Z",
    });
    assert.equal(proposal.status, "pending");
    assert.throws(() => approve(approved));
  });
  it("unverified costs and missing references cannot be approved", () => {
    for (const override of [{ verification: "unverified" }, { sourceReference: " " }]) {
      const input = fixture();
      Object.assign(input.costLines[0], override);
      assert.throws(() => approve(createPriceProposal(input, "test-author")));
    }
  });
  it("snapshot is independent and deeply frozen", () => {
    const input = fixture();
    const proposal = createPriceProposal(input, "test-author");
    input.costLines[0].amountMinor = 1;
    input.rates[0].rateMicros = 1;
    assert.equal(proposal.input.costLines[0].amountMinor, 10000);
    assert.throws(() => { proposal.input.rates[0].rateMicros = 1; });
    assert.throws(() => { proposal.calculation.costKrw = 1; });
    assert.throws(() => proposal.audit.push({}));
  });
  it("changed revision, tampered cost and tampered calculation are rejected", () => {
    const proposal = createPriceProposal(fixture(), "test-author");
    assert.throws(() => approve(proposal, { expectedFingerprint: "another-revision" }));
    const tamperedCost = structuredClone(proposal);
    tamperedCost.input.costLines[0].amountMinor = 1;
    assert.throws(() => approve(tamperedCost));
    const tamperedResult = structuredClone(proposal);
    tamperedResult.calculation.displayTotalKrw = 1;
    assert.throws(() => approve(tamperedResult));
  });
  it("cannot approve expired proposals or disclose expired approved prices", () => {
    const pending = createPriceProposal(fixture(), "test-author");
    assert.throws(() => approve(pending, { at: "2026-10-14T00:00:00Z" }));
    assert.throws(() => getApprovedPublicPrice(approve(pending), "2026-10-14T00:00:00Z"));
    assert.throws(() => getApprovedPublicPrice(approve(pending), "2026-10-13T00:30:00Z"));
  });
  it("actors and decision timestamps must be valid", () => {
    assert.throws(() => createPriceProposal(fixture(), " "));
    const proposal = createPriceProposal(fixture(), "test-author");
    assert.throws(() => approve(proposal, { actorId: "" }));
    assert.throws(() => approve(proposal, { at: "2026-10-12T23:59:00Z" }));
    assert.throws(() => approve(proposal, { at: "bad" }));
    assert.throws(() => approve(proposal, { at: "2026-10-13" }));
    assert.throws(() => rejectPriceProposal(proposal, {
      actorId: "test-reviewer", at: "bad", reason: "test", expectedFingerprint: proposal.fingerprint,
    }));
  });
  it("expired proposals can be explicitly rejected with a reason", () => {
    const proposal = createPriceProposal(fixture(), "test-author");
    const rejected = rejectPriceProposal(proposal, {
      actorId: "test-reviewer", at: "2026-10-15T00:00:00Z", reason: "유효기간 만료",
      expectedFingerprint: proposal.fingerprint,
    });
    assert.equal(rejected.status, "rejected");
  });
  it("rejection dates must exist in the calendar", () => {
    const proposal = createPriceProposal(fixture(), "test-author");
    assert.throws(() => rejectPriceProposal(proposal, {
      actorId: "test-reviewer", at: "2026-11-31T00:00:00Z", reason: "test",
      expectedFingerprint: proposal.fingerprint,
    }));
  });
});
