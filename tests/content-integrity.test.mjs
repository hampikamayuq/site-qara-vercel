import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import test from "node:test";
import { articles } from "../app/blog/articles.ts";
import { articleContent } from "../app/blog/article-content.ts";
import { evidence } from "../app/blog/article-evidence.ts";

const fabricioProfile = "/equipe/dr-fabricio-de-andrade";
const fabricioName = "Dr. Fabrício de Andrade";

test("keeps each medical article backed by complete, attributable evidence", () => {
  const articleSlugs = articles.map(article => article.slug).sort();
  assert.deepEqual(Object.keys(evidence).sort(), articleSlugs, "every article needs exactly one evidence record");

  for (const article of articles) {
    const record = evidence[article.slug];
    assert.equal(record.sectionCitations.length, articleContent[article.slug].length, `${article.slug}: each rendered section needs a citation group`);
    assert.match(record.author.crm, /^CRM-[A-Z]{2}\s+\S+$/, `${article.slug}: author needs a CRM`);

    const isFabricioException = record.author.name === fabricioName && record.author.url === fabricioProfile;
    if (isFabricioException) {
      assert.ok(record.author.qualification, `${article.slug}: Dr. Fabrício needs a stated qualification`);
      assert.equal(record.author.rqe, undefined, `${article.slug}: do not fabricate an RQE for Dr. Fabrício`);
    } else {
      assert.match(record.author.rqe ?? "", /^RQE\s+\S+$/, `${article.slug}: author needs an RQE`);
    }

    assert.ok(record.references.length > 0, `${article.slug}: evidence needs at least one reference`);
    for (const [, url] of record.references) {
      assert.match(url, /^https?:\/\//, `${article.slug}: references must use HTTP(S)`);
    }
    for (const citations of record.sectionCitations) {
      assert.ok(citations.length > 0, `${article.slug}: each rendered section needs at least one citation`);
      for (const index of citations) {
        assert.ok(index >= 1 && index <= record.references.length, `${article.slug}: citation ${index} must resolve to a reference`);
      }
    }
  }
});

test("sets safe static security headers without an untested CSP", async () => {
  const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");

  assert.match(config, /"Strict-Transport-Security",\s*value:\s*"max-age=/);
  assert.match(config, /"X-Content-Type-Options",\s*value:\s*"nosniff"/);
  assert.match(config, /"Referrer-Policy",\s*value:\s*"strict-origin-when-cross-origin"/);
  assert.match(config, /"X-Frame-Options",\s*value:\s*"DENY"/);
  assert.match(config, /"Permissions-Policy",\s*value:\s*"camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\)"/);
  assert.match(config, /source:\s*"\/:path\*",\s*headers:\s*securityHeaders/, "a catch-all header rule is required");
  assert.doesNotMatch(config, /Content-Security-Policy/i, "CSP needs separate RSC validation before it is enabled");
});

test("redirects legacy WordPress URLs with a real 308, not a rendered page", async () => {
  const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");

  // Cada URL legada precisa estar declarada em redirects(), que responde na
  // camada de roteamento. Como page chamando permanentRedirect() a resposta
  // sai 200 com <meta refresh> — sinal fraco para o Google e a URL antiga
  // continua indexável.
  // Conferidos contra o sitemap_index.xml do WordPress: toda URL indexada lá
  // precisa de destino aqui, senão vira 404 e perde o ranking acumulado.
  for (const source of ["/psoriase22", "/psoriase-3", "/hidradenite3", "/english", "/unha", "/estetica", "/dr-miguelceccarelli", "/dermatiteatopica", "/dermatopediatria2", "/cirurgiadermatologica", "/cirurgia-dermatologica-copacabana", "/category/especialidades", "/site-clinica-qara-2", "/elementor-pagina-de-destino-277", "/elementor-pagina-de-destino-289", "/feed", "/psoriase-2", "/hidradenite2-2", "/especialista", "/servico"]) {
    assert.match(config, new RegExp(`"${source}":\\s*"`), `${source} precisa estar em legacyRedirects`);
  }
  assert.match(config, /permanent:\s*true/, "os redirects legados precisam ser permanentes (308)");

  const appEntries = await readdir(new URL("../app/", import.meta.url), { recursive: true, withFileTypes: true });
  for (const entry of appEntries) {
    if (!entry.isFile() || !entry.name.endsWith(".tsx")) continue;
    const source = await readFile(join(entry.parentPath, entry.name), "utf8");
    assert.doesNotMatch(source, /permanentRedirect\(/, `${entry.name}: use redirects() no next.config.ts`);
  }
});

test("updates the document language when international routes change", async () => {
  const [controller, layout] = await Promise.all([
    readFile(new URL("../app/document-language.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(controller, /"use client"/);
  assert.match(controller, /usePathname/);
  assert.match(controller, /pathname === "\/en" \? "en" : pathname === "\/es" \? "es" : "pt-BR"/);
  assert.match(controller, /document\.documentElement\.lang = language/);
  assert.match(layout, /import \{ DocumentLanguage \} from "\.\/document-language"/);
  assert.match(layout, /<DocumentLanguage \/>/);
});
