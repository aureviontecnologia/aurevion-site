import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const projectRoot = process.cwd();
const outputDir = path.join(projectRoot, "vercel-static");
const clientDir = path.join(projectRoot, "dist", "client");
const workerPath = path.join(projectRoot, "dist", "server", "index.js");
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aureviontecnologia.vercel.app";

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

const workerUrl = pathToFileURL(workerPath);
workerUrl.searchParams.set("static-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

const environment = {
  ASSETS: {
    async fetch(request) {
      const url = new URL(request.url);
      const filePath = path.join(outputDir, url.pathname.replace(/^\//, ""));
      try {
        return new Response(await readFile(filePath));
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  },
};

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

async function exportRoute(route, destination) {
  const response = await worker.fetch(
    new Request(new URL(route, siteUrl), { headers: { accept: "text/html" } }),
    environment,
    executionContext,
  );

  if (!response.ok) {
    throw new Error(`Static export failed for ${route}: ${response.status}`);
  }

  await writeFile(path.join(outputDir, destination), Buffer.from(await response.arrayBuffer()));
}

await exportRoute("/", "index.html");
await exportRoute("/robots.txt", "robots.txt");
await exportRoute("/sitemap.xml", "sitemap.xml");

console.log(`Static site exported to ${outputDir}`);
