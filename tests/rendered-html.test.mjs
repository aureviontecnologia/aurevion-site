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

test("renders clear services and contact information without client JavaScript", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="pt-BR"/);
  assert.match(html, /<title>Aurevion \| Sites e sistemas para empresas<\/title>/);
  assert.match(html, /Sites, sistemas/);
  assert.match(html, /Automações/);
  assert.match(html, /href="tel:\+5527920026247"/);
  assert.match(html, /href="mailto:aureviontecnologia@gmail\.com/);
  assert.match(html, /https:\/\/wa\.me\/5527920026247\?text=/);
  assert.match(html, /Pedir orçamento no WhatsApp/);
  assert.match(html, /techreparos-site\.jpg/);
  assert.doesNotMatch(html, /<video\b|<form\b|about:invalid|<h[1-6][^>]*>\s*<\/h[1-6]>/);
  assert.doesNotMatch(html, /Regras da operação|Sistema organiza e encaminha|codex-preview|Higgsfield/);
});

test("all internal links have real destinations and FAQ questions are server rendered", async () => {
  const response = await render();
  const html = await response.text();
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const link of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.has(link[1]), "Missing anchor: " + link[1]);
  }
  for (const id of ["inicio", "conteudo", "solucoes", "demonstracao", "processo", "duvidas", "contato"]) {
    assert.ok(ids.has(id));
  }
  const faqs = [...html.matchAll(/<details class="faq-item">([\s\S]*?)<\/details>/g)];
  assert.equal(faqs.length, 5);
  for (const faq of faqs) {
    assert.match(faq[1], /<summary><h3>[^<]+\?<\/h3>/);
    assert.match(faq[1], /class="faq-answer"><p>[^<]+<\/p>/);
  }
});

test("preserves accessible navigation, brand assets and privacy-safe event names", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /aria-label="Navegação principal"/);
  assert.match(page, /<details className="mobile-menu"/);
  assert.match(page, /event\.key !== "Escape"/);
  assert.match(page, /Pular para o conteúdo/);
  assert.match(page, /aurevion-symbol-transparent\.png/);
  assert.match(page, /trackEvent\("whatsapp_click", \{ location \}\)/);
  assert.match(page, /trackEvent\("contact_click"/);
  assert.match(layout, /NEXT_PUBLIC_GA_ID/);
  assert.match(layout, /application\/ld\+json/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /var\(--font-instrument\)/);
  assert.match(css, /var\(--font-bricolage\)/);
  assert.doesNotMatch(css, /text-transform:\s*uppercase/);
  assert.doesNotMatch(page, /DemoPanel|hero-film|menu-layer|[—–‑]|e-mail|92002-6247/);
  await access(new URL("../public/techreparos-site.jpg", import.meta.url));
  await access(new URL("../public/aurevion-symbol-transparent.png", import.meta.url));
});
