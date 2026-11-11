import { getSiteUrl, isSiteIndexingEnabled } from "../lib/site-url";

const siteUrl = getSiteUrl(import.meta.env.SITE);
const isIndexable = Boolean(siteUrl) && isSiteIndexingEnabled(import.meta.env.SITE_INDEXING);

export function GET() {
  const content = isIndexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
