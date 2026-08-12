import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Aurevion conversion landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/i);
  assert.match(html, /<title>Aurevion \| Sites, sistemas e automação sob medida<\/title>/i);
  assert.match(html, /Sites que explicam o seu valor/i);
  assert.match(html, /Seu valor precisa ser entendido/i);
  assert.match(html, /O software deve se adaptar ao trabalho/i);
  assert.match(html, /Demonstração de produto/i);
  assert.match(html, /Aurevion Flow/i);
  assert.doesNotMatch(html, /Nota de transparência/i);
  assert.doesNotMatch(html, /Interface demonstrativa/i);
  assert.doesNotMatch(html, /Abriremos o WhatsApp/i);
  assert.match(html, /Visão da operação/i);
  assert.doesNotMatch(html, /aurevion-higgs|Higgsfield/i);
  assert.match(html, /5527920026247/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|Building your site/i);
});

test("keeps accessibility, motion and starter cleanup explicit", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /MotionConfig[\s\S]*?reducedMotion="user"/);
  assert.match(page, /aria-label="Navegação principal"/);
  assert.match(page, /id="site-navigation"/);
  assert.match(page, /useReducedMotion/);
  assert.match(page, /function DemoPanel/);
  assert.match(page, /function AurevionFlow/);
  assert.doesNotMatch(page, /project\.image|aurevion-higgs|Higgsfield/i);
  assert.doesNotMatch(page, /ThemeGlyph|theme-toggle|aurevion-theme|data-theme/);
  assert.doesNotMatch(page, /service-top|project-index|trust-points|number:\s*"0[1-9]"|window-dots|system-window-bar/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /themeColor:\s*"#07101a"/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /color-scheme:\s*dark/);
  assert.doesNotMatch(css, /data-theme|theme-toggle|#f7f7f4|#ffffff/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(packageJson, /"motion":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
