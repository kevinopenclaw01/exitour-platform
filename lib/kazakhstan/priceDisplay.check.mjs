// priceDisplay 순수 함수 확인 스크립트. node --test로 실행.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  normalizePriceKrw,
  getKazakhstanPriceDisplay,
  getKazakhstanOfferPrice,
} from "./priceDisplay.ts";
import { kazakhstanPriceReviews } from "./priceReviews.ts";

const unverified = { verification: "unverified", internalNote: "" };
const approved = { verification: "approved", internalNote: "" };

describe("normalizePriceKrw", () => {
  it("invalid values → null", () => {
    for (const v of [0, -1, 1.5, NaN, Infinity, -Infinity, null, undefined, Number.MAX_SAFE_INTEGER + 1]) {
      assert.equal(normalizePriceKrw(v), null, `expected null for ${v}`);
    }
  });
  it("valid positive integer", () => {
    assert.equal(normalizePriceKrw(1890000), 1890000);
  });
});

describe("getKazakhstanPriceDisplay", () => {
  it("null price → consult", () => {
    const d = getKazakhstanPriceDisplay(null, unverified);
    assert.equal(d.kind, "consult");
    assert.equal(d.label, "상담 문의");
  });
  it("every invalid value remains consult and cannot become a free Offer", () => {
    for (const value of [0, -1, 1.5, NaN, Infinity, undefined, Number.MAX_SAFE_INTEGER + 1]) {
      const display = getKazakhstanPriceDisplay(value, approved);
      assert.equal(display.kind, "consult");
      assert.equal(getKazakhstanOfferPrice(display), null);
    }
  });
  it("1890000 + unverified → from-price with label", () => {
    const d = getKazakhstanPriceDisplay(1890000, unverified);
    assert.equal(d.kind, "from-price");
    assert.equal(d.label, "1,890,000원~");
    assert.equal(d.verification, "unverified");
  });
  it("1890000 + unverified + showUnverified:false → consult", () => {
    const d = getKazakhstanPriceDisplay(1890000, unverified, { showUnverified: false });
    assert.equal(d.kind, "consult");
  });
  it("290000 + approved → from-price", () => {
    const d = getKazakhstanPriceDisplay(290000, approved);
    assert.equal(d.kind, "from-price");
    assert.equal(d.verification, "approved");
  });
  it("290000 + no review → unverified", () => {
    const d = getKazakhstanPriceDisplay(290000, undefined);
    assert.equal(d.verification, "unverified");
  });
  it("hiding unverified prices does not hide an approved price", () => {
    const display = getKazakhstanPriceDisplay(290000, approved, { showUnverified: false });
    assert.equal(display.kind, "from-price");
    assert.equal(display.amountKrw, 290000);
  });
});

describe("getKazakhstanOfferPrice", () => {
  it("consult → null", () => {
    assert.equal(getKazakhstanOfferPrice({ kind: "consult", amountKrw: null, label: "상담 문의", verification: null }), null);
  });
  it("from-price unverified → null", () => {
    const d = getKazakhstanPriceDisplay(1890000, unverified);
    assert.equal(getKazakhstanOfferPrice(d), null);
  });
  it("from-price approved → amount", () => {
    const d = getKazakhstanPriceDisplay(290000, approved);
    assert.equal(getKazakhstanOfferPrice(d), 290000);
  });
  it("rejects invalid amounts even in an externally constructed approved display", () => {
    for (const amountKrw of [0, -1, Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
      assert.equal(getKazakhstanOfferPrice({ kind: "from-price", amountKrw, label: "", verification: "approved" }), null);
    }
  });
});

describe("kazakhstanPriceReviews", () => {
  it("both entries are unverified", () => {
    for (const key of ["kazakhstan-4n6d-nature", "kazakhstan-charyn-canyon"]) {
      assert.equal(kazakhstanPriceReviews[key].verification, "unverified");
    }
  });
});
