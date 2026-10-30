/* Gera as imagens de compartilhamento (1200 x 630) do quiz de pensamento computacional:
   a capa do quiz e uma imagem por nível, usada pelas páginas resultado/<nível>/ no LinkedIn.
   Cores do site: verde, amarelo e vermelho (sem azul).

     node _fonte/blog/quiz-imagens.js

   Precisa do Playwright com o Chromium. Rode de novo só se mudar o quiz.json ou o desenho. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const SAIDA = path.join(RAIZ, 'quiz-pensamento-computacional', 'img');
const quiz = JSON.parse(fs.readFileSync(path.join(__dirname, 'quiz.json'), 'utf8'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const PILARES = [['Decomposição', '#b9e6c6'], ['Padrões', '#fff36b'], ['Abstração', '#f6c3c0'], ['Algoritmos', '#b9e6c6']];

const base = corpo => `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@800&family=Lexend:wght@400;600&display=block" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: #f4f4f2; background-image: radial-gradient(#d9d9d6 1.6px, transparent 1.6px);
  background-size: 22px 22px; font-family: Lexend, sans-serif; color: #111; padding: 40px; }
.card { background: #fff; border: 4px solid #111; border-radius: 40px; height: 100%; padding: 46px 56px; display: flex; gap: 40px; position: relative; }
.esq { flex: 1; display: flex; flex-direction: column; }
.rotulo { color: #16703a; font: 800 26px Sniglet; letter-spacing: .08em; text-transform: uppercase; }
h1 { font: 800 66px/1.02 Sniglet; margin-top: 14px; }
h1 .marca { background: #fff36b; border-radius: 12px; padding: 0 10px; }
.sub { color: #4a4a4a; font-size: 25px; line-height: 1.4; margin-top: 18px; }
.rodape { margin-top: auto; font-size: 22px; color: #4a4a4a; }
.rodape b { color: #111; font-weight: 600; }
.dir { width: 330px; display: flex; flex-direction: column; justify-content: center; gap: 14px; }
.pilar { border: 4px solid #111; border-radius: 99px; font: 600 26px Lexend; padding: 12px 24px; display: flex; align-items: center; gap: 14px; }
.pilar i { width: 34px; height: 34px; border-radius: 50%; background: #fff; border: 3px solid #111; font: 800 18px Sniglet; font-style: normal; display: flex; align-items: center; justify-content: center; }
.escada { display: flex; flex-direction: column-reverse; gap: 12px; }
.degrau { border: 4px solid #111; border-radius: 22px; padding: 12px 20px; font: 600 21px/1.2 Lexend; background: #fff; color: #6b6b6b; }
.degrau.atual { background: #fff36b; color: #111; transform: translateX(-18px); box-shadow: 6px 6px 0 #16703a; }
.nivel { font: 800 58px/1.05 Sniglet; margin-top: 14px; }
.nivel span { background: #b9e6c6; border-radius: 12px; padding: 0 10px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
</style></head><body><div class="card">${corpo}</div></body></html>`;

const capa = base(`<div class="esq">
  <p class="rotulo">Quiz para professores</p>
  <h1>Pensamento<br><span class="marca">computacional</span></h1>
  <p class="sub">12 perguntas de sala de aula, explicação em cada resposta e o seu nível no final.</p>
  <p class="rodape"><b>ohtopico.com.br</b> · Júlia Roberta Quoos Alves</p>
</div>
<div class="dir">${PILARES.map(([n, cor], i) => `<div class="pilar" style="background:${cor}"><i>${i + 1}</i>${n}</div>`).join('')}</div>`);

const nivel = nv => base(`<div class="esq">
  <p class="rotulo">Meu nível no quiz</p>
  <p class="sub" style="margin-top:6px">Pensamento computacional para professores</p>
  <p class="nivel"><span>${esc(nv.nome)}</span></p>
  <p class="rodape"><b>Faça o seu em ohtopico.com.br</b><br>Quiz de Júlia Roberta Quoos Alves</p>
</div>
<div class="dir"><div class="escada">${quiz.niveis.map(n => `<div class="degrau${n.id === nv.id ? ' atual' : ''}">${esc(n.nome)}</div>`).join('')}</div></div>`);

(async () => {
  fs.mkdirSync(SAIDA, { recursive: true });
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
  const gerar = async (html, nome) => {
    await pagina.setContent(html, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.screenshot({ path: path.join(SAIDA, nome) });
    console.log('ok', nome);
  };
  await gerar(capa, 'quiz-pensamento-computacional.png');
  for (const nv of quiz.niveis) await gerar(nivel(nv), `resultado-${nv.id}.png`);
  await navegador.close();
})();
