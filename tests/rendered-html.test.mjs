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
  assert.match(html, /<title>Aurevion \| Sites e sistemas para empresas<\/title>/i);
  assert.match(html, /Sites que apresentam sua empresa/i);
  assert.match(html, /Sites e sistemas para empresas/i);
  assert.match(html, /aureviontecnologia@gmail\.com/i);
  assert.doesNotMatch(html, /Tecnologia pensada para o seu negócio/i);
  assert.match(html, /Um site que explica sua empresa/i);
  assert.match(html, /Um sistema que acompanha o trabalho/i);
  assert.match(html, /Veja na prática/i);
  assert.match(html, /Informações espalhadas/i);
  assert.match(html, /Trabalho em um só lugar/i);
  assert.doesNotMatch(html, /Nota de transparência/i);
  assert.doesNotMatch(html, /Interface demonstrativa/i);
  assert.doesNotMatch(html, /Abriremos o WhatsApp/i);
  assert.doesNotMatch(html, /Regras da operação|Pausar|Reproduzir|System motion/i);
  assert.doesNotMatch(html, /Sistema organiza e encaminha/i);
  assert.match(html, /aurevion-flow-v2\.mp4/i);
  assert.match(html, /Trabalho da equipe/i);
  assert.doesNotMatch(html, /aurevion-higgs|Higgsfield/i);
  assert.match(html, /5527920026247/);
  assert.doesNotMatch(html, /[—–‑]|e-mail|92002-6247/i);
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
  assert.doesNotMatch(page, /function AurevionFlow|flow-map|system-composition|system-connector/);
  assert.match(page, /function FaqItem/);
  assert.match(page, /aria-expanded=\{isOpen\}/);
  assert.match(page, /animate=\{\{ height: isOpen \? "auto" : 0/);
  assert.doesNotMatch(page, /project\.image|aurevion-higgs|Higgsfield/i);
  assert.doesNotMatch(page, /videoPlaying|toggleVideo|film-control|site-cut|system-track|Regras da operação/i);
  assert.match(page, /aurevion-symbol-transparent\.png/);
  assert.match(page, /aurevion-flow-v2-poster\.webp/);
  assert.doesNotMatch(page, /ThemeGlyph|theme-toggle|aurevion-theme|data-theme/);
  assert.doesNotMatch(page, /[—–‑]|e-mail|92002-6247/i);
  assert.doesNotMatch(page, /service-top|project-index|trust-points|number:\s*"0[1-9]"|window-dots|system-window-bar/);
  assert.match(layout, /lang="pt-BR"/);
  assert.match(layout, /themeColor:\s*"#07101a"/);
  assert.match(layout, /application\/ld\+json/);
  assert.doesNotMatch(layout, /[—–‑]|92002-6247/i);
  assert.match(css, /color-scheme:\s*dark/);
  assert.doesNotMatch(css, /data-theme|theme-toggle|#f7f7f4|#ffffff/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.doesNotMatch(css, /text-transform:\s*uppercase/);
  assert.doesNotMatch(
    css,
    /\.section-label\s*\{[^}]*font-family:\s*var\(--font-mono\)/,
  );
  assert.doesNotMatch(css, /\.film-control|\.site-cut|\.system-track|\.integration-path/);
  assert.match(packageJson, /"motion":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
