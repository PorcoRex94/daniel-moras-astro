import { readdir, readFile } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const distDirectory = resolve("dist");
const configuredSiteUrl = (process.env.SITE_URL ?? "").trim().replace(/\/$/, "");
const indexingEnabled = (process.env.SITE_INDEXING ?? "").trim().toLowerCase() === "true";
const isIndexable = Boolean(configuredSiteUrl) && indexingEnabled;
const failures = [];

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

function occurrences(source, expression) {
  return [...source.matchAll(expression)].length;
}

function inspectPage(filePath, html) {
  const path = `/${relative(distDirectory, filePath).split(sep).join("/")}`.replace(/\/index\.html$/, "/");
  if (path.startsWith("/design-review/")) return;

  if (/<meta\s+http-equiv="refresh"/i.test(html)) {
    if (!/<meta\s+name="robots"\s+content="noindex"/i.test(html)) {
      failures.push(`${path}: la redirección heredada debe quedar en noindex.`);
    }
    return;
  }

  const titleCount = occurrences(html, /<title>/gi);
  const descriptionCount = occurrences(html, /<meta\s+name="description"/gi);
  const h1Count = occurrences(html, /<h1(?:\s|>)/gi);

  if (titleCount !== 1) failures.push(`${path}: se esperaban 1 title y se encontraron ${titleCount}.`);
  if (descriptionCount !== 1) failures.push(`${path}: se esperaba 1 meta description y se encontraron ${descriptionCount}.`);
  if (h1Count !== 1) failures.push(`${path}: se esperaba 1 h1 y se encontraron ${h1Count}.`);
  if (/daniel-moras-astro\.vercel\.app/i.test(html)) failures.push(`${path}: conserva una referencia a Vercel.`);

  for (const image of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt=(?:"[^"]*"|'[^']*')/i.test(image)) {
      failures.push(`${path}: hay una imagen sin atributo alt.`);
      break;
    }
  }

  if (isIndexable) {
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (!canonical?.startsWith(configuredSiteUrl)) {
      failures.push(`${path}: canonical ausente o fuera de SITE_URL.`);
    }
    if (!/<meta\s+name="robots"\s+content="index, follow"/i.test(html)) {
      failures.push(`${path}: robots no permite indexación con SITE_URL configurada.`);
    }
  } else {
    if (/<link\s+rel="canonical"/i.test(html)) failures.push(`${path}: expone canonical sin SITE_URL.`);
    if (!/<meta\s+name="robots"\s+content="noindex, nofollow"/i.test(html)) {
      failures.push(`${path}: no queda en noindex mientras la indexación está deshabilitada.`);
    }
  }
}

const files = await htmlFiles(distDirectory);
for (const filePath of files) {
  inspectPage(filePath, await readFile(filePath, "utf8"));
}

const robots = await readFile(resolve(distDirectory, "robots.txt"), "utf8");
const sitemap = await readFile(resolve(distDirectory, "sitemap.xml"), "utf8");

if (indexingEnabled && !configuredSiteUrl) {
  failures.push("SITE_INDEXING=true requiere definir SITE_URL.");
}

if (isIndexable) {
  if (!robots.includes(`Sitemap: ${configuredSiteUrl}/sitemap.xml`)) failures.push("robots.txt no referencia el sitemap de SITE_URL.");
  if (!sitemap.includes("<loc>")) failures.push("sitemap.xml no contiene URLs indexables.");
} else {
  if (!robots.includes("Disallow: /")) failures.push("robots.txt no bloquea indexación sin SITE_URL.");
  if (sitemap.includes("<loc>")) failures.push("sitemap.xml contiene URLs sin SITE_URL.");
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`SEO validado en ${files.length} páginas HTML (${isIndexable ? "modo indexable" : "modo noindex"}).`);
