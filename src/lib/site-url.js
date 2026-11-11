export function getSiteUrl(value) {
  const rawValue = value instanceof URL ? value.toString() : value;
  const siteUrl = typeof rawValue === "string" ? rawValue.trim() : "";

  if (!siteUrl) return undefined;

  try {
    const url = new URL(siteUrl);

    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString().replace(/\/$/, "")
      : undefined;
  } catch {
    return undefined;
  }
}

export function isSiteIndexingEnabled(value) {
  return typeof value === "string" && value.trim().toLowerCase() === "true";
}
