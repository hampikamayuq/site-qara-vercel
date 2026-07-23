import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { brotliCompressSync } from "node:zlib";
import test from "node:test";

// O budget antes media o bundle único do vinext em dist/client/assets. O Next
// divide o runtime em chunks sob /_next/static, então medimos o que a rota
// realmente carrega: todo asset referenciado no HTML pré-renderizado.
//
// 175KB de JS é o baseline do runtime do App Router do Next 16 (~163KB) com
// folga para código da aplicação. O objetivo do teste é pegar regressão nossa,
// não o custo fixo do framework — se este número subir, investigue o que foi
// adicionado antes de aumentá-lo.
const budget = {
  javascriptBrotli: 175 * 1024,
  cssBrotli: 15 * 1024,
};

async function measureRouteBudget(route) {
  const name = route === "/" ? "index" : route.replace(/^\//, "");
  const html = await readFile(new URL(`../.next/server/app/${name}.html`, import.meta.url), "utf8");
  const assets = [...new Set([...html.matchAll(/\/_next\/static\/[^"\s>]+?\.(?:js|css)/g)].map(match => match[0]))];

  const measured = { route, javascriptBrotli: 0, cssBrotli: 0, assets: [] };
  for (const asset of assets) {
    const contents = await readFile(new URL(`../.next/${asset.slice("/_next/".length)}`, import.meta.url));
    const brotli = brotliCompressSync(contents).length;
    const type = asset.endsWith(".css") ? "css" : "javascript";
    measured.assets.push({ asset, type, brotli });
    if (type === "css") measured.cssBrotli += brotli;
    else measured.javascriptBrotli += brotli;
  }
  return measured;
}

for (const route of ["/", "/blog"]) {
  test(`keeps ${route} within the Brotli asset budget`, async () => {
    const metrics = await measureRouteBudget(route);

    assert.ok(metrics.assets.some(asset => asset.type === "javascript"), `${route} did not discover JavaScript assets`);
    assert.ok(metrics.assets.some(asset => asset.type === "css"), `${route} did not discover CSS assets`);
    assert.ok(
      metrics.javascriptBrotli <= budget.javascriptBrotli,
      `${route}: JavaScript ${(metrics.javascriptBrotli / 1024).toFixed(1)}KB excede o budget de ${budget.javascriptBrotli / 1024}KB`,
    );
    assert.ok(
      metrics.cssBrotli <= budget.cssBrotli,
      `${route}: CSS ${(metrics.cssBrotli / 1024).toFixed(1)}KB excede o budget de ${budget.cssBrotli / 1024}KB`,
    );
  });
}

test("does not retain Tailwind imports or dependencies", async () => {
  const [css, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(css, /@import\s+["']tailwindcss["']/);
  assert.doesNotMatch(packageJson, /["'](?:@tailwindcss\/postcss|tailwindcss)["']\s*:/);
});

test("keeps the minimal browser reset that the design depends on", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /\*,\s*::before,\s*::after\s*\{[^}]*box-sizing:\s*border-box/s);
  assert.match(css, /body,\s*h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6,\s*p,\s*figure,\s*blockquote,\s*dl,\s*dd\s*\{[^}]*margin:\s*0/s);
  assert.match(css, /ul,\s*ol,\s*menu\s*\{[^}]*list-style:\s*none[^}]*margin:\s*0[^}]*padding:\s*0/s);
  assert.match(css, /img,\s*svg,\s*video,\s*canvas,\s*audio,\s*iframe,\s*embed,\s*object\s*\{[^}]*display:\s*block[^}]*vertical-align:\s*middle/s);
  assert.match(css, /img,\s*video\s*\{[^}]*height:\s*auto[^}]*max-width:\s*100%/s);
  assert.match(css, /button,\s*input,\s*optgroup,\s*select,\s*textarea\s*\{[^}]*background-color:\s*transparent[^}]*border:\s*0 solid[^}]*color:\s*inherit[^}]*font:\s*inherit[^}]*letter-spacing:\s*inherit/s);
});
