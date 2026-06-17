import { getCollection } from "astro:content";

const siteUrl = "https://daniel-moras-astro.vercel.app";

const staticPages = [
  "",
  "blog",
  "rubros/packaging",
  "rubros/textil",
  "rubros/editorial",
  "rubros/etiquetas",
  "rubros/comunicacion-visual",
];

export async function GET() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const blogPages = posts.map((post) => `blog/${post.id}`);

  const urls = [...staticPages, ...blogPages]
    .map((path) => {
      const loc = `${siteUrl}/${path}`.replace(/\/$/, "");

      return `
  <url>
    <loc>${loc}</loc>
    <changefreq>${path.startsWith("blog/") ? "monthly" : "weekly"}</changefreq>
    <priority>${path === "" ? "1.0" : path.startsWith("rubros/") ? "0.9" : "0.8"}</priority>
  </url>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    },
  );
}