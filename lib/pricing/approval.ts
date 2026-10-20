import { createHash } from "node:crypto";
import { calculatePricing, parsePricingTimestamp } from "./calculate";
import type { PricingCalculation, PricingInput } from "./types";

type AuditEntry = {
  action: "submitted" | "approved" | "rejected";
  actorId: string;
  at: string;
  reason: string;
};

export type PriceProposal = {
  status: "pending" | "approved" | "rejected";
  fingerprint: string;
  input: PricingInput;
  calculation: PricingCalculation;
  audit: AuditEntry[];
};

function freezeSnapshot<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) freezeSnapshot(child);
    Object.freeze(value);
  }
  return value;
}

function digest(input: PricingInput, calculation: PricingCalculation): string {
  return createHash("sha256").update(JSON.stringify({ input, calculation })).digest("hex");
}

function requireText(value: string, field: string): string {
  if (typeof value !== "string" || !value.trim() || value.length > 500) {
    throw new Error(`${field} is required.`);
  }
  return value.trim();
}

function verifyProposal(proposal: PriceProposal, at: string): void {
  if (proposal.fingerprint !== digest(proposal.input, proposal.calculation)) {
    throw new Error("Price snapshot was modified; create a new proposal.");
  }
  // Revalidate expiry without replacing the original calculation-time snapshot.
  const current = calculatePricing({ ...proposal.input, calculatedAt: at });
  if (JSON.stringify(current) !== JSON.stringify(proposal.calculation)) {
    throw new Error("Calculation does not match the price snapshot.");
  }
  if (Date.parse(at) < Date.parse(proposal.input.calculatedAt)) {
    throw new Error("Decision cannot precede submission.");
  }
}

export function createPriceProposal(input: PricingInput, actorId: string): PriceProposal {
  const calculation = calculatePricing(input);
  const snapshot = structuredClone(input);
  return freezeSnapshot({
    status: "pending",
    fingerprint: digest(snapshot, calculation),
    input: snapshot,
    calculation,
    audit: [{ action: "submitted", actorId: requireText(actorId, "Actor"), at: input.calculatedAt, reason: "" }],
  });
}

// Domain transitions only. A future server DAL must authenticate/authorize the actor.
export function approvePriceProposal(
  proposal: PriceProposal,
  decision: { actorId: string; at: string; expectedFingerprint: string },
): PriceProposal {
  if (proposal.status !== "pending") throw new Error("Only a pending proposal can be approved.");
  if (decision.expectedFingerprint !== proposal.fingerprint) throw new Error("Proposal revision changed.");
  verifyProposal(proposal, decision.at);
  if (proposal.input.costLines.some((line) => line.verification !== "verified" || !line.sourceReference.trim())) {
    throw new Error("Supplier costs and source references must be verified before approval.");
  }
  return freezeSnapshot({
    ...proposal,
    status: "approved",
    audit: [...proposal.audit, { action: "approved", actorId: requireText(decision.actorId, "Approver"), at: decision.at, reason: "" }],
  });
}

export function rejectPriceProposal(
  proposal: PriceProposal,
  decision: { actorId: string; at: string; reason: string; expectedFingerprint: string },
): PriceProposal {
  if (proposal.status !== "pending") throw new Error("Only a pending proposal can be rejected.");
  if (decision.expectedFingerprint !== proposal.fingerprint) throw new Error("Proposal revision changed.");
  // Expired proposals may still be rejected, but timestamps and snapshots must be valid.
  verifyProposal(proposal, proposal.input.calculatedAt);
  if (parsePricingTimestamp(decision.at, "rejectedAt") < Date.parse(proposal.input.calculatedAt)) {
    throw new Error("Invalid rejection timestamp.");
  }
  return freezeSnapshot({
    ...proposal,
    status: "rejected",
    audit: [...proposal.audit, {
      action: "rejected", actorId: requireText(decision.actorId, "Reviewer"), at: decision.at,
      reason: requireText(decision.reason, "Rejection reason"),
    }],
  });
}

export function getApprovedPublicPrice(proposal: PriceProposal, at: string) {
  if (proposal.status !== "approved") return null;
  verifyProposal(proposal, at);
  const approval = proposal.audit.at(-1);
  if (!approval || approval.action !== "approved" || Date.parse(at) < Date.parse(approval.at)) {
    throw new Error("A valid approval record is required.");
  }
  return {
    productId: proposal.input.productId,
    revisionId: proposal.input.revisionId,
    currency: "KRW" as const,
    pricePerPersonKrw: proposal.calculation.displayPerPersonKrw,
    priceTotalKrw: proposal.calculation.displayTotalKrw,
    travelers: proposal.input.travelers,
    minTravelers: proposal.input.minTravelers,
    validUntil: proposal.input.validUntil,
  };
}
