import { getSiteUrl } from "../lib/site-url";

const siteUrl = getSiteUrl(import.meta.env.SITE);

export function GET() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
