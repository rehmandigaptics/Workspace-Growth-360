import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const htmlRoot = path.resolve(root, "../Workspace-Growth-360-html");
const outDir = path.join(root, "content");

const pages = [
  { file: "index.html", route: "home", out: "home" },
  { file: "about.html", route: "about", out: "about" },
  { file: "services.html", route: "services", out: "services" },
  { file: "crm.html", route: "crm", out: "crm" },
  { file: "lead-generation.html", route: "lead-generation", out: "lead-generation" },
  { file: "n8n-automation.html", route: "n8n-automation", out: "n8n-automation" },
  { file: "gohighlevel.html", route: "gohighlevel", out: "gohighlevel" },
  { file: "features.html", route: "features", out: "features" },
  { file: "integrations.html", route: "integrations", out: "integrations" },
  { file: "pricing.html", route: "pricing", out: "pricing" },
  { file: "how-it-works.html", route: "how-it-works", out: "how-it-works" },
  { file: "contact.html", route: "contact", out: "contact" },
  { file: "workspaces.html", route: "workspaces", out: "workspaces" },
];

const linkMap = [
  ["index.html", "/"],
  ["about.html", "/about"],
  ["services.html", "/services"],
  ["crm.html", "/crm"],
  ["lead-generation.html", "/lead-generation"],
  ["n8n-automation.html", "/n8n-automation"],
  ["gohighlevel.html", "/gohighlevel"],
  ["features.html", "/features"],
  ["integrations.html", "/integrations"],
  ["pricing.html", "/pricing"],
  ["how-it-works.html", "/how-it-works"],
  ["contact.html", "/contact"],
  ["workspaces.html", "/workspaces"],
];

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMeta(html) {
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [, ""])[1];
  const descMatch =
    html.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
    ) ||
    html.match(
      /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i,
    );
  return {
    title: decodeEntities(title.trim()),
    description: decodeEntities((descMatch?.[1] || "").trim()),
  };
}

function extractMain(html) {
  // Prefer outermost content between header mount and footer mount
  const withoutHeader = html.replace(
    /<div id="site-header"><\/div>/i,
    "",
  );
  const beforeFooter = withoutHeader.split(/<div id="site-footer"><\/div>/i)[0];
  // Drop head
  let body = beforeFooter;
  const bodyIdx = body.search(/<body[^>]*>/i);
  if (bodyIdx >= 0) {
    body = body.slice(body.indexOf(">", bodyIdx) + 1);
  }
  // Remove scripts
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  return body.trim();
}

function rewrite(html) {
  let out = html;
  // asset paths
  out = out.replace(/(src|href)=(["'])assets\//gi, "$1=$2/assets/");
  out = out.replace(/url\((['"]?)assets\//gi, "url($1/assets/");
  // html links (href only)
  for (const [from, to] of linkMap) {
    const re = new RegExp(`(href=["'])${from.replace(".", "\\.")}(["'])`, "gi");
    out = out.replace(re, `$1${to}$2`);
  }
  return out;
}

fs.mkdirSync(outDir, { recursive: true });

const manifest = {};

for (const page of pages) {
  const raw = fs.readFileSync(path.join(htmlRoot, page.file), "utf8");
  const meta = extractMeta(raw);
  let main = rewrite(extractMain(raw));
  // Flatten accidental nested <main><main>
  main = main.replace(/<main>\s*<main/i, "<main").replace(/<\/main>\s*<\/main>/i, "</main>");

  const ts = `/* Auto-generated from ${page.file} — do not edit by hand */\nexport const title = ${JSON.stringify(meta.title)};\nexport const description = ${JSON.stringify(meta.description)};\nexport const html = ${JSON.stringify(main)};\n`;
  fs.writeFileSync(path.join(outDir, `${page.out}.ts`), ts);
  manifest[page.out] = meta;
  console.log("wrote", page.out, meta.title.slice(0, 50));
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log("done");
