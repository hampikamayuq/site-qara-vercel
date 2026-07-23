// Substitui o bundle Worker do Cloudflare (dist/server/index.js) que os testes
// importavam. Todas as rotas do site são pré-renderizadas no build, então
// "buscar uma rota" é ler o HTML que `next build` gravou em .next/server/app.
import { readFile } from "node:fs/promises";

const APP = new URL("../.next/server/app/", import.meta.url);

function htmlPathFor(pathname) {
  const route = pathname === "/" ? "index" : pathname.replace(/^\//, "").replace(/\/$/, "");
  return new URL(`${route}.html`, APP);
}

async function fetch(request) {
  const { pathname } = new URL(request.url);
  try {
    const html = await readFile(htmlPathFor(pathname), "utf8");
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return new Response("Not found", { status: 404 });
  }
}

const prerendered = { fetch };

export default prerendered;
