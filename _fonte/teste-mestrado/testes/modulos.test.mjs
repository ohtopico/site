// Cada arquivo .js do site é um módulo ES. `node --check` não pega erros de módulo (nome declarado duas
// vezes, import de algo que o outro arquivo não exporta): só aparecem ao carregar. Aqui cada módulo é
// importado no Node; erro de sintaxe ou de ligação reprova. Erros de execução (falta de window, câmera…)
// são normais fora do navegador e ficam para o teste no Chromium.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { SITE } from "./servidor.mjs";

const arquivos = readdirSync(SITE).filter(n => n.endsWith(".js"));

test("há módulos para testar", () => assert.ok(arquivos.length > 10, arquivos.join(", ")));

for (const nome of arquivos) {
  test(`módulo ${nome} carrega sem erro de sintaxe`, async () => {
    try {
      await import(new URL(nome, `file://${SITE}/`).href);
    } catch (erro) {
      if (erro instanceof SyntaxError) assert.fail(`${nome}: ${erro.message}`);
    }
  });
}
