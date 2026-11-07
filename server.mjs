import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = resolve(fileURLToPath(new URL("./site/", import.meta.url)));
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp3": "audio/mpeg",
  ".glb": "model/gltf-binary",
  ".hdr": "application/octet-stream",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
};

async function fileFor(pathname) {
  const decoded = decodeURIComponent(pathname);
  const target = normalize(join(root, decoded));
  if (!target.startsWith(root)) return null;
  try {
    const info = await stat(target);
    if (info.isFile()) return target;
    if (info.isDirectory()) {
      const index = join(target, "index.html");
      if ((await stat(index).catch(() => null))?.isFile()) return index;
    }
  } catch {}
  return null;
}

async function handler(req, res) {
  const { pathname } = new URL(req.url, "http://localhost");
  let file = await fileFor(pathname);
  if (!file) {
    const knownDirs = ["/vendor/", "/js/", "/css/", "/art/", "/assets/", "/icons/", "/fonts/", "/data/", "/projects/", "/photos/"];
    for (const dir of knownDirs) {
      const idx = pathname.indexOf(dir);
      if (idx !== -1) {
        file = await fileFor(pathname.slice(idx));
        if (file) break;
      }
    }
  }
  // Client-side routes (no file extension) fall back to the app shell.
  if (!file && !extname(pathname)) file = join(root, "index.html");
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }
  try {
    let body = await readFile(file);
    const ext = extname(file).toLowerCase();
    const headers = {
      "content-type": types[ext] || "application/octet-stream",
      "cache-control": [".html", ".js", ".css", ".json"].includes(ext) ? "no-cache" : "public, max-age=3600",
    };
    const compressible = [".html", ".js", ".mjs", ".css", ".json", ".svg", ".hdr"].includes(ext);
    if (compressible && /\bgzip\b/.test(req.headers["accept-encoding"] || "")) {
      body = gzipSync(body);
      headers["content-encoding"] = "gzip";
      headers.vary = "accept-encoding";
    }
    res.writeHead(200, headers);
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(500);
    res.end("Server error");
  }
}

const ports = process.env.PORT ? [Number(process.env.PORT)] : [4173, 5000];
for (const p of ports) {
  try {
    const s = createServer(handler);
    s.on("error", (err) => {
      if (err.code !== "EADDRINUSE") console.error(`Server error on port ${p}:`, err.message);
    });
    s.listen(p, () => {
      console.log(`Moosa's Portfolio running at http://localhost:${p}`);
    });
  } catch {}
}
