// Temporary redirects unpublish the old catalog without deleting source or data.
// Remove the matching rule only after a product is reviewed for republication.
export const legacyCatalogRedirects = [
  { source: "/kazakhstan/:path*", destination: "/packages/kazakhstan/almaty" },
  { source: "/vietnam/sapa/:path*", destination: "/packages/vietnam/sapa" },
  { source: "/vietnam/danang/:path*", destination: "/activities/vietnam/danang" },
  { source: "/guam/:path*", destination: "/activities/guam/guam" },
  { source: "/danang-rentcar", destination: "/activities/vietnam/danang" },
  { source: "/danang-pickup", destination: "/activities/vietnam/danang" },
  { source: "/guam-pickup", destination: "/activities/guam/guam" },
  { source: "/guam-rentcar", destination: "/activities/guam/guam" },
  { source: "/premium-packages/:path*", destination: "/packages" },
  { source: "/premium-package-guide", destination: "/packages" },
  { source: "/custom-package", destination: "/packages" },
  { source: "/products/:path*", destination: "/activities" },
  { source: "/hotels/:path*", destination: "/packages" },
  { source: "/destinations/:path*", destination: "/#destinations" },
].map((redirect) => ({ ...redirect, permanent: false as const }));
