/* Slides em PDF das aulas expositivas de Computação do Ensino Médio (habilidades EM13CO01 a EM13CO26).

   Mesmo formato dos slides do 6º ao 9º ano: 12 slides de 1440 x 810 px numa "janela" de programa, aula de 30 min
   (capa, pergunta, objetivos, cinco slides de explicação, atividade, confira, para levar e roteiro do professor).
   O conteúdo de cada aula está em aulas.js. Saída: material-didatico/slides/bncc-em13coXX-slides.pdf

   Uso:  node _fonte/slides-em/gerar.js            (todas)
         node _fonte/slides-em/gerar.js EM13CO10   (só uma)
   Precisa do Playwright (o mesmo de _fonte/material/gerar.js) e do pypdf, para gravar título, autora e
   palavras-chave no PDF. Autora: Júlia Roberta Quoos Alves. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..', '..');
const SAIDA = path.join(RAIZ, 'material-didatico', 'slides');
const AULAS = require('./aulas.js');
const AUTORA = 'Júlia Roberta Quoos Alves';
const EIXOS = { PC: 'Pensamento computacional', MD: 'Mundo digital', CD: 'Cultura digital' };

// textos e objetos das habilidades vêm do dados.js do site, para não ficarem diferentes
const vm = require('vm');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(RAIZ, 'material-didatico', 'assets', 'dados.js'), 'utf8') + ';this.HAB = HAB;', ctx);
const HAB = ctx.HAB;

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// **negrito** e *marca-texto* (só nos títulos)
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const tit = s => esc(s).replace(/\*(.+?)\*/g, '<mark>$1</mark>');

const CSS = `
@page { size: 1440px 810px; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; }
body { font-family: 'Lexend', sans-serif; color: #111; }
.slide { width: 1440px; height: 810px; position: relative; overflow: hidden; page-break-after: always;
  background: #f4f4f2 radial-gradient(#d9d9d4 1.4px, transparent 1.6px) 0 0 / 22px 22px; }
.jan { position: absolute; left: 80px; top: 56px; width: 1270px; height: 660px; background: #fff; border: 3px solid #111;
  border-radius: 30px; box-shadow: 18px 18px 0 #111; overflow: hidden; display: flex; flex-direction: column; }
.barra { height: 66px; border-bottom: 3px solid #111; background: #f4f4f2; display: flex; align-items: center; justify-content: space-between; padding: 0 30px 0 44px; flex: none; }
.barra .nome { font-family: 'Sniglet'; font-weight: 800; font-size: 19px; letter-spacing: .08em; text-transform: uppercase; }
.barra .bt { display: flex; gap: 12px; }
.barra .bt span { width: 30px; height: 30px; border: 2px solid #111; border-radius: 50%; display: grid; place-items: center; font-size: 14px; line-height: 1; }
.corpo { flex: 1; padding: 54px 104px 40px; display: flex; flex-direction: column; justify-content: center; }
.rodape { position: absolute; left: 84px; right: 90px; bottom: 26px; display: flex; justify-content: space-between; align-items: center; }
.rodape .aut, .rodape .pg { font-family: 'Sniglet'; font-weight: 800; font-size: 17px; letter-spacing: .1em; text-transform: uppercase; }
.rodape .site { border: 2px solid #111; border-radius: 99px; padding: 3px 18px; font-size: 17px; background: #fff; }
mark { background: #fff36b; padding: 0 12px; color: inherit; }
h1, h2 { font-family: 'Sniglet'; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; margin: 0; line-height: 1.12; }
h1 { font-size: 84px; }
h2 { font-size: 46px; margin-bottom: 30px; }
.etiqueta { display: inline-flex; align-items: center; gap: 12px; border: 2.5px solid #111; border-radius: 99px; padding: 6px 20px; font-family: 'Sniglet'; font-weight: 800;
  font-size: 17px; letter-spacing: .1em; text-transform: uppercase; align-self: flex-start; margin-bottom: 26px; }
.etiqueta i { font-style: normal; background: #fff36b; padding: 1px 10px; }
.sub { font-size: 30px; color: #333; margin: 26px 0 22px; }
.pilulas { display: flex; gap: 14px; flex-wrap: wrap; }
.pilulas span { border: 2px solid #111; border-radius: 99px; padding: 5px 18px; font-size: 19px; }
.pilulas span:nth-child(1) { background: #e3f4e8; } .pilulas span:nth-child(2) { background: #fff36b; }
.pergunta { text-align: center; align-items: center; }
.pergunta h1 { font-size: 66px; }
.pergunta p { font-size: 28px; color: #444; margin-top: 30px; }
.hab { border: 2.5px solid #111; border-radius: 22px; background: #e3f4e8; padding: 20px 26px; font-size: 25px; line-height: 1.45; margin-bottom: 30px; }
.hab b { font-family: 'Sniglet'; font-size: 24px; letter-spacing: .06em; margin-right: 12px; }
.hab small { font-family: 'Sniglet'; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; font-size: 16px; color: #333; }
.hab div { margin-top: 6px; }
.lead { font-size: 27px; font-weight: 600; margin: 0 0 14px; }
ul.q { list-style: none; padding: 0; margin: 0; font-size: 27px; line-height: 1.5; }
ul.q li { padding-left: 38px; position: relative; margin: 6px 0; }
ul.q li::before { content: ''; position: absolute; left: 4px; top: 15px; width: 13px; height: 13px; background: #157f3b; }
ol.n { margin: 0; padding-left: 44px; font-size: 27px; line-height: 1.45; }
ol.n li { margin: 10px 0; padding-left: 8px; }
.cards { display: grid; gap: 26px; }
.card { border: 2.5px solid #111; border-radius: 22px; padding: 24px 20px; text-align: center; font-size: 23px; line-height: 1.35; }
.card .big { font-family: 'Sniglet'; font-weight: 800; font-size: 38px; margin-bottom: 8px; }
.card .nm { font-weight: 600; font-size: 27px; margin-bottom: 6px; }
.c0 { background: #e3f4e8; } .c1 { background: #fff36b; } .c2 { background: #fbe6ea; } .c3 { background: #fff; }
.nota { text-align: center; font-size: 27px; color: #444; margin-top: 28px; }
.texto p { font-size: 30px; line-height: 1.5; margin: 0 0 22px; }
.duas { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.duas div { border: 2.5px solid #111; border-radius: 22px; padding: 26px 28px; font-size: 26px; line-height: 1.45; }
.duas div strong { display: block; font-family: 'Sniglet'; font-size: 30px; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 10px; }
.duas div:first-child { background: #e3f4e8; } .duas div:last-child { background: #fbe6ea; }
pre { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 24px; line-height: 1.45; background: #111; color: #f4f4f2; border-radius: 18px; padding: 22px 28px; margin: 0 0 20px; white-space: pre-wrap; }
.tempo { display: inline-block; background: #111; color: #fff; border-radius: 99px; padding: 3px 18px; font-family: 'Sniglet'; font-weight: 800; font-size: 19px; letter-spacing: .08em; vertical-align: middle; margin-left: 10px; }
.levar .prox { font-size: 26px; margin-top: 26px; color: #333; }
table { border-collapse: collapse; width: 100%; font-size: 19px; }
td { border-bottom: 1.5px solid #ccc; padding: 8px 10px; vertical-align: top; line-height: 1.35; }
td:first-child { font-family: 'Sniglet'; font-weight: 800; white-space: nowrap; width: 120px; }
td:nth-child(2) { font-weight: 600; white-space: nowrap; width: 150px; }
.resp { border: 2px solid #111; border-radius: 14px; padding: 12px 18px; font-size: 17px; line-height: 1.4; margin-top: 16px; background: #f4f4f2; }
.roteiro { padding-top: 34px; padding-bottom: 26px; }
.roteiro h2 { font-size: 38px; margin-bottom: 18px; }
`;

function slide(a, n, corpo, cls = '') {
  return `<section class="slide"><div class="jan"><div class="barra"><span class="nome">${a.c}.ppt</span><span class="bt"><span>-</span><span>□</span><span>✕</span></span></div>
  <div class="corpo ${cls}">${corpo}</div></div>
  <div class="rodape"><span class="aut">${AUTORA}</span><span class="pg">${n}/12</span><span class="site">ohtopico.com.br</span></div></section>`;
}

function explicacao(s) {
  const t = `<h2>${tit(s.t)}</h2>`;
  if (s.k === 'cards') return `${t}<div class="cards" style="grid-template-columns:repeat(${s.cards.length},1fr)">${s.cards.map((c, i) => `
    <div class="card c${i % 4}">${c[0] ? `<div class="big">${esc(c[0])}</div>` : ''}<div class="nm">${esc(c[1])}</div><div>${fmt(c[2])}</div></div>`).join('')}</div>${s.nota ? `<p class="nota">${fmt(s.nota)}</p>` : ''}`;
  if (s.k === 'texto') return `${t}<div class="texto">${s.p.map(p => `<p>${fmt(p)}</p>`).join('')}</div>`;
  if (s.k === 'duas') return `${t}<div class="duas"><div><strong>${esc(s.a[0])}</strong>${fmt(s.a[1])}</div><div><strong>${esc(s.b[0])}</strong>${fmt(s.b[1])}</div></div>${s.nota ? `<p class="nota">${fmt(s.nota)}</p>` : ''}`;
  if (s.k === 'lista') return `${t}<ol class="n">${s.itens.map(i => `<li>${fmt(i)}</li>`).join('')}</ol>`;
  if (s.k === 'codigo') return `${t}<pre>${esc(s.code)}</pre>${s.nota ? `<p class="nota" style="margin-top:6px">${fmt(s.nota)}</p>` : ''}`;
  throw new Error(`${s.k}: tipo de slide desconhecido`);
}

function html(a) {
  const h = HAB[a.c];
  if (!h) throw new Error(`${a.c} não está no dados.js`);
  if (a.s.length !== 5) throw new Error(`${a.c}: são 5 slides de explicação, há ${a.s.length}`);
  const sl = [];
  sl.push(slide(a, 1, `<span class="etiqueta">▮▮▮ BNCC Computação · Ensino Médio <i>${a.c}</i></span>
    <h1>${tit(a.t)}</h1><p class="sub">${esc(a.sub)}</p>
    <div class="pilulas"><span>${EIXOS[h.eixo]}</span><span>${esc(h.objeto)}</span><span>Aula expositiva · 30 min</span></div>`));
  sl.push(slide(a, 2, `<h1>${esc(a.q)}</h1><p>Pense antes de passar o slide.</p>`, 'pergunta'));
  sl.push(slide(a, 3, `<h2>O que vamos <mark>aprender</mark></h2>
    <div class="hab"><b>${a.c}</b><small>${esc(h.objeto)}</small><div>${esc(h.texto)}</div></div>
    <p class="lead">Ao final da aula, você vai conseguir:</p><ul class="q">${a.obj.map(o => `<li>${fmt(o)}</li>`).join('')}</ul>`));
  a.s.forEach((s, i) => sl.push(slide(a, 4 + i, explicacao(s))));
  sl.push(slide(a, 9, `<h2>${tit(a.atv.t)} <span class="tempo">⏱ ${a.atv.min} min</span></h2><ol class="n">${a.atv.passos.map(p => `<li>${fmt(p)}</li>`).join('')}</ol>`));
  sl.push(slide(a, 10, `<h2>Confira: <mark>responda rápido</mark> <span class="tempo">⏱ 4 min</span></h2><ol class="n">${a.conf.map(p => `<li>${fmt(p)}</li>`).join('')}</ol>`));
  sl.push(slide(a, 11, `<h2>Para <mark>levar</mark></h2><ul class="q">${a.levar.map(p => `<li>${fmt(p)}</li>`).join('')}</ul><p class="prox">${fmt(a.prox)}</p>`, 'levar'));
  const rot = [['0–3 min', 'Abertura', a.rot[0]], ['3–5 min', 'Objetivos', 'Leia a habilidade e os objetivos em voz alta.'],
    ['5–17 min', 'Explicação', a.rot[1]], ['17–24 min', 'Atividade', a.rot[2]],
    ['24–28 min', 'Confira', 'Perguntas rápidas: respostas no caderno ou em voz alta.'], ['28–30 min', 'Fechamento', 'Retome os três pontos do “Para levar”.']];
  sl.push(slide(a, 12, `<h2>Roteiro do <mark>professor</mark> · 30 min</h2>
    <table>${rot.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${fmt(r[2])}</td></tr>`).join('')}</table>
    <div class="resp"><b>Respostas do “Confira”:</b> ${a.resp.map((r, i) => `<b>${i + 1}.</b> ${fmt(r)}`).join(' ')}</div>`, 'roteiro'));
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body>${sl.join('\n')}</body></html>`;
}

function titulo(a) { return a.t.replace(/\*/g, ''); }

async function main() {
  const so = process.argv.slice(2);
  const lista = AULAS.filter(a => !so.length || so.includes(a.c));
  let chromium;
  try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('playwright-core')); }
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 } });
  const meta = [];
  for (const a of lista) {
    await page.setContent(html(a), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // nenhum texto pode vazar da janela
    const vaza = await page.evaluate(() => [...document.querySelectorAll('.corpo')].map((c, i) => c.scrollHeight > c.clientHeight + 2 ? i + 1 : 0).filter(Boolean));
    if (vaza.length) console.warn(`${a.c}: texto passa da janela nos slides ${vaza.join(', ')}`);
    const arq = path.join(SAIDA, `bncc-${a.c.toLowerCase()}-slides.pdf`);
    await page.pdf({ path: arq, width: '1440px', height: '810px', printBackground: true, preferCSSPageSize: true });
    const h = HAB[a.c];
    meta.push({ arq, title: `BNCC Computação ${a.c} — ${titulo(a)} (slides)`, subject: `${a.c}: ${h.texto}`,
      keywords: `BNCC Computação, ${a.c}, ${h.objeto}, Ensino Médio, aula expositiva 30 minutos, ohtopico.com.br` });
    console.log('ok', a.c, titulo(a));
  }
  await browser.close();
  // metadados do PDF (título, autora, assunto, palavras-chave), como nos slides do Fundamental
  execFileSync('python3', ['-c', `
import json, sys
from pypdf import PdfReader, PdfWriter
for m in json.load(sys.stdin):
    r = PdfReader(m['arq']); w = PdfWriter(); w.append(r)
    w.add_metadata({'/Title': m['title'], '/Author': '${AUTORA}', '/Subject': m['subject'], '/Keywords': m['keywords']})
    with open(m['arq'], 'wb') as f: w.write(f)
`], { input: JSON.stringify(meta) });
}
main().catch(e => { console.error(e); process.exit(1); });
