#!/usr/bin/env node
/* Gera as páginas dos jogos de Linguagens da Ilha ENEM (mundo/enem/ling-*.html) e o manifesto mundo/enem/jogos-ling.js.
   Fonte: um arquivo por jogo em _fonte/enem/ling/jogos/ (module.exports = { id, arquivo, ... }).
   Uso: node _fonte/enem/ling/gerar.js */
const fs = require('fs'), path = require('path');
const RAIZ = path.resolve(__dirname, '../../..'), SAIDA = path.join(RAIZ, 'mundo/enem');
const HABS = require('./habilidades.js');
const V = '20261106a';

const jogos = fs.readdirSync(path.join(__dirname, 'jogos')).filter(f => f.endsWith('.js')).sort()
  .map(f => require(path.join(__dirname, 'jogos', f)));

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const json = o => JSON.stringify(o).replace(/<\/script/gi, '<\\/script');

jogos.forEach((j, k) => {
  const prox = jogos[(k + 1) % jogos.length];
  const cfg = { id: j.id, figura: j.figura || '', intro: j.intro || '', etapas: j.etapas, fim: j.fim || '', proximo: [prox.arquivo, prox.icone + ' ' + prox.titulo] };
  const habs = j.habs.map(h => `<span class="l-hab" title="${esc(h + ': ' + HABS[h])}">${h}</span>`).join('');
  const listaHabs = j.habs.map(h => `<li><b>${h}</b>: ${esc(HABS[h])}</li>`).join('');
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(j.titulo)} · Ilha ENEM</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="../../material-didatico/assets/md.css">
<link rel="stylesheet" href="enem.css">
<link rel="stylesheet" href="ling.css?v=${V}">
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>
</head>
<body>
<!-- Gerado por _fonte/enem/ling/gerar.js a partir de _fonte/enem/ling/jogos/. Não edite à mão. -->
<header class="e-top" id="topo"></header>
<main class="wrap">
  <div class="e-head">
    <a class="hb azul e-voltar" href="./">← Voltar à ilha</a>
    <h1>${j.icone} ${esc(j.titulo)}</h1>
    <p class="muted">${j.desc}</p>
    <div class="l-habs" aria-label="Habilidades da Matriz do ENEM que este jogo treina">${habs}</div>
  </div>
  <div class="game-stage" id="palco" aria-live="polite"></div>
  <details class="howto">
    <summary>Cola: o que você precisa saber</summary>
    <div class="l-cola">${j.cola}</div>
  </details>
  <details class="howto">
    <summary>Habilidades da Matriz do ENEM treinadas aqui</summary>
    <ul class="small" style="margin:8px 0 0;padding-left:20px">${listaHabs}</ul>
  </details>
</main>
<footer class="footer"><div class="wrap">Estrelas ficam guardadas só neste aparelho.</div></footer>

<script src="enem.js"></script>
<script>ENEM.exigir();</script>
<script src="ling-motor.js?v=${V}"></script>
<script>LING.jogo(${json(cfg)});</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(SAIDA, j.arquivo), html);
});

const manifesto = jogos.map(j => ({ id: j.id, area: j.area || 'ling', icone: j.icone, titulo: j.titulo, url: j.arquivo, resumo: j.resumo, habs: j.habs }));
fs.writeFileSync(path.join(SAIDA, 'jogos-ling.js'), `/* Ilha ENEM · manifesto dos jogos de Linguagens e Redação (Matriz do ENEM, área de Linguagens, H1–H30).
   Gerado por _fonte/enem/ling/gerar.js. O id é também o id da estrela (ENEM.darEstrelas). */
window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat(${JSON.stringify(manifesto, null, 1)});
`);
const cobertas = new Set(jogos.flatMap(j => j.habs));
const faltam = Object.keys(HABS).filter(h => !cobertas.has(h));
console.log(`${jogos.length} jogos gerados. Habilidades cobertas: ${cobertas.size}/30.${faltam.length ? ' Faltam: ' + faltam.join(', ') : ''}`);
jogos.forEach(j => console.log(`  ${j.arquivo}: ${j.habs.join(' ')} · ${j.etapas.map(e => `${e.tipo} ${e.n || e.itens.length}/${e.itens.length}`).join(', ')}`));
