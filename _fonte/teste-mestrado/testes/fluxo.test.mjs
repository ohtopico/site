// Smoke no Chromium: a página abre sem erro, o tutorial e o início funcionam pelo teclado/leitor de tela,
// a câmera liga e os pedidos falados têm resposta.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { abrir, esperarFala, pedir } from "./navegador.mjs";

let s;
before(async () => { s = await abrir(); });
after(async () => { await s?.fechar(); });

test("abre sem erros e com o foco em Começar", async () => {
  const foco = await s.pagina.evaluate(() => document.activeElement?.id);
  assert.equal(foco, "comecar");
  assert.match(await esperarFala(s.pagina, /Assistência por voz/), /Começar/);
  assert.deepEqual(s.erros, []);
});

test("versão aparece no canto", async () => {
  assert.match(await s.pagina.textContent("#versao"), /^v\d+ · \d\d\/\d\d$/);
});

test("lista escrita de comandos tem os 8 grupos", async () => {
  assert.equal(await s.pagina.locator("#lista-comandos h3").count(), 8);
});

test("tutorial abre, põe o foco no título, fala as partes e volta", async () => {
  const p = s.pagina;
  await p.click("#tutorial");
  assert.equal(await p.evaluate(() => document.activeElement?.id), "titulo-tutorial");
  assert.equal(await p.locator("#partes li").count(), 6);
  await esperarFala(p, /Segure o celular/);
  await p.click("#tutorial-voltar");
  assert.equal(await p.isHidden("#tela-tutorial"), true);
  assert.equal(await p.evaluate(() => document.activeElement?.id), "comecar");
});

test("Começar liga a câmera e passa o foco para a tela de uso", async () => {
  const p = s.pagina;
  await p.click("#comecar");
  await p.waitForSelector("#uso:not([hidden])", { timeout: 60000 });
  assert.equal(await p.evaluate(() => document.activeElement?.id), "pausar");
  assert.equal(await p.evaluate(() => document.getElementById("video").readyState >= 2), true);
  await esperarFala(p, /^Pronto\.$/);
});

test("pedido falado: que horas são", async () => {
  assert.match(await pedir(s.pagina, "que horas são", /\d+ hora|meia-noite|meio-dia|\d+:\d+|\bhoras?\b/), /./);
});

test("pedido falado: menu e depois o nome do grupo", async () => {
  assert.match(await pedir(s.pagina, "menu", /grupos/), /rua/);
  assert.match(await pedir(s.pagina, "rua", /^Rua:/), /prédio/);
});

test("pedido falado: o que tem na minha frente (câmera falsa)", async () => {
  assert.ok(await pedir(s.pagina, "o que tem na minha frente", /./));
});

test("modo silêncio muda o rótulo do botão e volta", async () => {
  const p = s.pagina;
  await pedir(p, "silêncio", /Modo silêncio/);
  assert.match(await p.getAttribute("#pausar", "aria-label"), /silêncio/i);
  await pedir(p, "continuar", /de volta/);
  assert.match(await p.getAttribute("#pausar", "aria-label"), /ativa/i);
});

test("frase não entendida tem resposta", async () => {
  assert.ok(await pedir(s.pagina, "blá blá blá", /./));
});

test("nenhum erro na página durante o uso", () => {
  assert.deepEqual(s.erros, []);
});
