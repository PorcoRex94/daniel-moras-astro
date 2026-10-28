import fs from "node:fs";
import path from "node:path";

const outputDirectory = path.join(process.cwd(), "dist");
const errors = [];
const htmlAttributePattern = /\b(?:href|src|srcset|poster|action)\s*=\s*(["'])(.*?)\1/gi;
const cssUrlPattern = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
const ignoredProtocols = new Set(["data:", "mailto:", "tel:", "javascript:"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function isIgnoredReference(reference) {
  const value = reference.trim();

  return (
    !value ||
    value.startsWith("#") ||
    value.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(value) ||
    ignoredProtocols.has(value.toLowerCase())
  );
}

function referencesFromSrcset(value) {
  return value
    .split(",")
    .map((candidate) => candidate.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function outputCandidates(sourceFile, reference) {
  const [withoutFragment] = reference.split("#", 1);
  const [pathname] = withoutFragment.split("?", 1);
  const decodedPathname = decodeURIComponent(pathname);
  const fromRoot = decodedPathname.startsWith("/");
  const baseDirectory = fromRoot ? outputDirectory : path.dirname(sourceFile);
  const target = path.resolve(baseDirectory, `.${fromRoot ? decodedPathname : `/${decodedPathname}`}`);
  const relativeTarget = path.relative(outputDirectory, target);

  if (relativeTarget.startsWith("..") || path.isAbsolute(relativeTarget)) {
    return [];
  }

  if (path.extname(target)) {
    return [target];
  }

  return [target, `${target}.html`, path.join(target, "index.html")];
}

function verifyReference(sourceFile, reference) {
  if (isIgnoredReference(reference)) return;

  const candidates = outputCandidates(sourceFile, reference);

  if (!candidates.length || !candidates.some((candidate) => fs.existsSync(candidate))) {
    errors.push(`${path.relative(outputDirectory, sourceFile)} -> ${reference}`);
  }
}

if (!fs.existsSync(outputDirectory)) {
  console.error("No existe dist/. Ejecutá npm run build antes de validar enlaces.");
  process.exitCode = 1;
} else {
  const generatedFiles = walk(outputDirectory);

  for (const file of generatedFiles) {
    const extension = path.extname(file).toLowerCase();

    if (extension !== ".html" && extension !== ".css") continue;

    const content = fs.readFileSync(file, "utf8");
    const pattern = extension === ".html" ? htmlAttributePattern : cssUrlPattern;

    for (const match of content.matchAll(pattern)) {
      const value = match[2]?.trim() ?? "";
      const references = extension === ".html" && /\bsrcset\s*=/i.test(match[0])
        ? referencesFromSrcset(value)
        : [value];

      for (const reference of references) {
        verifyReference(file, reference);
      }
    }
  }

  if (errors.length) {
    console.error(`Referencias locales rotas (${errors.length}):\n${errors.join("\n")}`);
    process.exitCode = 1;
  } else {
    console.log("Validación correcta: no hay enlaces ni assets locales rotos en dist/.");
  }
}
