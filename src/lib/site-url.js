export const defaultSiteUrl = "https://daniel-moras-astro.vercel.app";

export function getSiteUrl(value) {
  const rawValue = value instanceof URL ? value.toString() : value;
  const siteUrl = typeof rawValue === "string" ? rawValue.trim() : "";

  return (siteUrl || defaultSiteUrl).replace(/\/$/, "");
}
