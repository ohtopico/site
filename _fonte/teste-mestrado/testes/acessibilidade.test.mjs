// Auditoria automática de acessibilidade: axe-core (WCAG 2.2 A/AA e boas práticas) em cada tela, nos temas
// claro e escuro, mais conferências que o axe não faz: foco visível, tamanho dos alvos de toque e
// controles que ficam por cima da câmera.
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { abrir } from "./navegador.mjs";

const AXE = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const REGRAS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function axe(pagina) {
  if (!(await pagina.evaluate(() => "axe" in window))) await pagina.addScriptTag({ content: AXE });
  const r = await pagina.evaluate(regras => axe.run(document, { runOnly: regras }), REGRAS);
  return r.violations.map(v => `${v.id} (${v.impact}): ${v.help} -> ${v.nodes.map(n => n.target.join(" ")).join(", ")}`);
}

const abertas = [];
after(async () => { for (const s of abertas) await s.fechar(); });
const sessao = async opcoes => { const s = await abrir(opcoes); abertas.push(s); return s; };

for (const esquema of ["light", "dark"]) {
  test(`tela inicial sem problemas de acessibilidade (${esquema})`, async () => {
    const { pagina } = await sessao({ esquema });
    await pagina.evaluate(() => document.querySelectorAll("details").forEach(d => { d.open = true; }));
    assert.deepEqual(await axe(pagina), []);
  });

  test(`tutorial sem problemas de acessibilidade (${esquema})`, async () => {
    const { pagina } = await sessao({ esquema });
    await pagina.click("#tutorial");
    assert.deepEqual(await axe(pagina), []);
  });

  test(`tela de uso, com o campo de digitar, sem problemas de acessibilidade (${esquema})`, async () => {
    const { pagina } = await sessao({ esquema, url: "?teclado" });
    await pagina.click("#comecar");
    await pagina.waitForSelector("#uso:not([hidden])", { timeout: 60000 });
    assert.deepEqual(await axe(pagina), []);
    // O rótulo "Digitar pedido" precisa de fundo próprio: por cima da câmera, o axe não consegue medir o contraste
    const fundo = await pagina.evaluate(() => getComputedStyle(document.getElementById("digitar")).backgroundColor);
    assert.notEqual(fundo, "rgba(0, 0, 0, 0)", "o campo de digitar não tem fundo");
    // A pílula da versão não pode cobrir o botão Enviar
    const [v, b] = await pagina.evaluate(() => ["versao", "digitar"].map(id => document.getElementById(id).getBoundingClientRect().toJSON()));
    const enviar = await pagina.locator("#digitar button").boundingBox();
    const cobre = v.left < enviar.x + enviar.width && v.right > enviar.x && v.top < enviar.y + enviar.height && v.bottom > enviar.y;
    assert.equal(cobre, false, `versão ${JSON.stringify(v)} cobre o Enviar ${JSON.stringify(enviar)} (form ${JSON.stringify(b)})`);
  });
}

test("alvos de toque têm pelo menos 44 × 44 px", async () => {
  const { pagina } = await sessao();
  await pagina.evaluate(() => document.querySelectorAll("details").forEach(d => { d.open = true; }));
  const pequenos = await pagina.evaluate(() => [...document.querySelectorAll("button, .pilula, input:not(.sr-only):not([type=checkbox]), summary")]
    .filter(e => e.offsetParent)
    .map(e => ({ e: e.id || e.textContent.trim().slice(0, 30), r: e.getBoundingClientRect() }))
    .filter(({ r }) => r.height < 44 && !(r.height >= 24 && r.width >= 200)) // linhas largas, como o summary, valem pelo 2.5.8
    .map(({ e, r }) => `${e}: ${Math.round(r.width)}×${Math.round(r.height)}`));
  assert.deepEqual(pequenos, []);
});

test("foco do teclado aparece em todos os controles da tela inicial", async () => {
  const { pagina } = await sessao();
  await pagina.evaluate(() => document.querySelectorAll("details").forEach(d => { d.open = true; }));
  const semFoco = [];
  await pagina.focus("#comecar");
  for (let i = 0; i < 40; i++) {
    const info = await pagina.evaluate(() => {
      const e = document.activeElement;
      // Campo de arquivo escondido: quem mostra o foco é o rótulo dele, que faz de botão
      const alvo = e.type === "file" ? document.querySelector(`label[for="${e.id}"]`) : e;
      const cs = getComputedStyle(alvo);
      return { id: e.id || e.textContent.trim().slice(0, 30), visivel: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2 || cs.boxShadow !== "none" };
    });
    if (!info.visivel) semFoco.push(info.id);
    await pagina.keyboard.press("Tab");
    if (await pagina.evaluate(() => document.activeElement === document.body)) break;
  }
  assert.deepEqual(semFoco, []);
});

test("todo botão e campo tem nome para o leitor de tela", async () => {
  const { pagina } = await sessao();
  const sem = await pagina.evaluate(() => [...document.querySelectorAll("button, input, select, textarea")]
    .filter(e => !(e.labels?.length || e.getAttribute("aria-label") || e.textContent.trim()))
    .map(e => e.id || e.outerHTML.slice(0, 60)));
  assert.deepEqual(sem, []);
});
