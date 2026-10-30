// Servidor estático da raiz do repositório, para abrir /teste-mestrado/ no Chromium como no site.
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

export const RAIZ = fileURLToPath(new URL("../../../", import.meta.url)).replace(/\/$/, "");
export const SITE = join(RAIZ, "teste-mestrado");

const TIPOS = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".wasm": "application/wasm", ".png": "image/png", ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8", ".tflite": "application/octet-stream", ".onnx": "application/octet-stream",
};

/** Liga o servidor numa porta livre; devolve { url, fechar }. */
export function servir() {
  const servidor = createServer((pedido, resposta) => {
    let caminho = normalize(decodeURIComponent(new URL(pedido.url, "http://x").pathname));
    if (caminho.endsWith("/")) caminho += "index.html";
    const arquivo = join(RAIZ, caminho);
    let info;
    try { info = statSync(arquivo); } catch { info = null; }
    if (!arquivo.startsWith(RAIZ) || !info?.isFile()) {
      resposta.writeHead(404).end();
      return;
    }
    resposta.writeHead(200, { "content-type": TIPOS[extname(arquivo)] ?? "application/octet-stream", "content-length": info.size });
    createReadStream(arquivo).pipe(resposta);
  });
  return new Promise(ok => servidor.listen(0, "127.0.0.1", () => ok({
    url: `http://127.0.0.1:${servidor.address().port}/teste-mestrado/`,
    fechar: () => new Promise(f => { servidor.closeAllConnections(); servidor.close(f); }),
  })));
}
