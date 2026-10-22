import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

async function loadTs(path) {
  const code = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
}

const catalog = await loadTs("../lib/travel/catalog.ts");
const { legacyCatalogRedirects } = await loadTs("../lib/travel/legacyRoutes.ts");
const { buildQuoteUrl } = await loadTs("../lib/quote/prefill.ts");

test("the public catalog has exactly the two approved categories", () => {
  assert.deepEqual(catalog.travelCategories.map(({ name }) => name), ["우리끼리 맞춤 패키지", "내맘대로 단품 투어"]);
});

test("package destinations match the approved seven cities", () => {
  assert.deepEqual(catalog.getTravelDestinations("packages").map(({ city }) => city), ["danang", "nhatrang", "sapa", "phuquoc", "almaty", "bohol", "boracay"]);
});

test("individual destinations match the approved five cities", () => {
  assert.deepEqual(catalog.getTravelDestinations("activities").map(({ city }) => city), ["danang", "bohol", "boracay", "guam", "phuquoc"]);
});

test("unknown or unsupported country/category combinations cannot resolve", () => {
  assert.equal(catalog.getTravelDestination("activities", "kazakhstan", "almaty"), undefined);
  assert.equal(catalog.getTravelDestination("packages", "guam", "guam"), undefined);
  assert.equal(catalog.getTravelDestination("packages", "philippines", "sapa"), undefined);
  assert.equal(catalog.getTravelDestination("activities", "vietnam", "unknown"), undefined);
});

test("each destination has content, a unique URL and valid inquiry prefill", () => {
  const paths = new Set();
  for (const category of catalog.travelCategories) {
    assert.ok(existsSync(new URL(`../public${category.image}`, import.meta.url)));
    for (const destination of catalog.getTravelDestinations(category.id)) {
      const path = catalog.destinationPath(category.id, destination);
      assert.ok(!paths.has(path));
      paths.add(path);
      const summary = category.id === "packages" ? destination.packageSummary : destination.activitySummary;
      const ideas = category.id === "packages" ? destination.packageIdeas : destination.activityIdeas;
      assert.ok(summary?.length && ideas?.length && destination.consultationNote.length);
      const url = new URL(buildQuoteUrl({ destination: `${destination.countryName} - ${destination.name}`, service: category.name, sourcePath: path }), "https://exitour.co.kr");
      assert.equal(url.pathname, "/quote");
      assert.equal(url.searchParams.get("service"), category.name);
      assert.equal(url.searchParams.get("sourcePath"), path);
      assert.equal(url.searchParams.get("destination"), `${destination.countryName} - ${destination.name}`);
      assert.equal(url.searchParams.has("productId"), false);
    }
  }
  assert.equal(paths.size, 12);
});

test("legacy redirects are temporary and exclude operational routes", () => {
  for (const redirect of legacyCatalogRedirects) {
    assert.equal(redirect.permanent, false);
    assert.ok(!/^\/(api|admin|quote)(\/|$)/.test(redirect.source));
    assert.ok(/^\/(packages|activities)(\/|$)|^\/#destinations$/.test(redirect.destination));
  }
});

test("all existing static catalog routes are hidden, but their source survives", () => {
  const manifest = JSON.parse(readFileSync(new URL("../.next/prerender-manifest.json", import.meta.url), "utf8"));
  const oldRoutes = Object.keys(manifest.routes).filter((path) => path !== "/" && path !== "/favicon.ico" && !path.startsWith("/_") && !/^\/(packages|activities)(\/|$)/.test(path));
  assert.ok(oldRoutes.length > 30);
  for (const path of oldRoutes) {
    assert.ok(legacyCatalogRedirects.some(({ source }) => source.endsWith("/:path*")
      ? path === source.replace("/:path*", "") || path.startsWith(source.replace(":path*", ""))
      : source === path), `Old public route is not hidden: ${path}`);
  }
  for (const path of ["../lib/mock/sapaPackage.ts", "../lib/mock/kazakhstanPremium.ts", "../app/vietnam/sapa/private-package/3n5d-sapa-hanoi/page.tsx", "../app/kazakhstan/almaty/private-package/3n5d-premium/page.tsx"]) {
    assert.ok(existsSync(new URL(path, import.meta.url)));
  }
});
