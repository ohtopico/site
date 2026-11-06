#!/usr/bin/env node
/* =====================================================================
   Pacote "Jogos sem internet": um .zip com todos os jogos, os recursos 3D,
   os simuladores e o Mundo, para usar no laboratório da escola sem conexão.

   Uso:  node _fonte/offline/gerar.js [pasta-de-saida]
         (padrão: _site-offline/, fora do que vai para o ar)

   O que muda em relação ao site, só dentro do pacote:
   - Sem Google Analytics e sem GoatCounter (offline não há para onde enviar,
     e nada da turma sai do computador).
   - Fontes Sniglet e Lexend locais (fontes/fontes.css), no lugar do Google Fonts.
   - O navegador não aceita módulos JavaScript abertos direto do disco (file://).
     Por isso o three.js vira um script comum (vendor/three-offline.js) e o
     lab3d.js ganha uma versão que entrega as mesmas funções por window.LAB3D.
   - offline.js: uma faixa no topo com o link para o início do pacote, e os
     links para páginas que não estão no pacote (planos, fichas, BNCC...)
     abrem no ohtopico.com.br.
   Sem dependências: só Node e o comando zip.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAIZ = path.resolve(__dirname, '..', '..');
const SAIDA = path.resolve(process.argv[2] || path.join(RAIZ, '_site-offline'));
const NOME = 'ohtopico-jogos-sem-internet';
const PACOTE = path.join(SAIDA, NOME);
const SITE = 'https://ohtopico.com.br/';

/* Pastas copiadas inteiras (caminhos relativos à raiz do site). */
const PASTAS = [
  'jogos',
  'material-didatico/jogos',
  'material-didatico/3d',
  'material-didatico/assets',
  'simuladores',
  'mundo',
  'assets',
];
/* Fica de fora: imagens de compartilhamento e arquivos que só o site usa. */
const IGNORAR = [/\/og-[^/]*\.jpg$/, /\/sw\.js$/, /\.py$/, /\.md$/, /^\/mundo\/professores\//];

function copiar(rel) {
  const de = path.join(RAIZ, rel);
  for (const nome of fs.readdirSync(de)) {
    const r = rel + '/' + nome;
    const st = fs.statSync(path.join(RAIZ, r));
    if (st.isDirectory()) { copiar(r); continue; }
    if (IGNORAR.some(re => re.test('/' + r))) continue;
    /* páginas que só redirecionam para o endereço novo */
    if (/\.html$/.test(nome) && /http-equiv="refresh"/i.test(fs.readFileSync(path.join(RAIZ, r), 'utf8'))) continue;
    fs.mkdirSync(path.join(PACOTE, rel), { recursive: true });
    fs.copyFileSync(path.join(RAIZ, r), path.join(PACOTE, r));
  }
}

function listar(dir, base = '') {
  let out = [];
  for (const nome of fs.readdirSync(dir)) {
    const p = path.join(dir, nome), r = base ? base + '/' + nome : nome;
    if (fs.statSync(p).isDirectory()) out = out.concat(listar(p, r)); else out.push(r);
  }
  return out;
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- three.js como script comum ---------- */
function threeOffline() {
  const vend = path.join(RAIZ, 'material-didatico/assets/vendor');
  let t = fs.readFileSync(path.join(vend, 'three.module.min.js'), 'utf8');
  const i = t.lastIndexOf('export{');
  if (i < 0) throw new Error('three.module.min.js: export final não encontrado');
  const fim = t.indexOf('}', i);
  const pares = t.slice(i + 7, fim).split(',').map(p => {
    const m = p.trim().match(/^(\S+)(?:\s+as\s+(\S+))?$/);
    return (m[2] || m[1]) + ':' + m[1];
  });
  t = t.slice(0, i) + 'window.THREE_OFFLINE={' + pares.join(',') + '};' + t.slice(fim + 2);
  if (/(^|[;}\s])(import|export)[\s{*]/.test(t.replace(/"[^"]*"|'[^']*'|`[^`]*`/g, ''))) {
    console.warn('Aviso: three.module.min.js ainda tem import/export depois da conversão.');
  }

  let o = fs.readFileSync(path.join(vend, 'OrbitControls.js'), 'utf8');
  o = o.replace(/^import\s*\{([^}]*)\}\s*from\s*['"][^'"]+['"];?/m, (_, nomes) => 'const {' + nomes + '} = window.THREE_OFFLINE;');
  o = o.replace(/^export\s*\{\s*OrbitControls\s*\};?/m, 'window.THREE_OFFLINE.OrbitControls = OrbitControls;');
  if (/^\s*(import|export)\b/m.test(o)) throw new Error('OrbitControls.js: import/export que o gerador não conhece');

  return '/* three.js (licença MIT, ver three-LICENSE.txt) convertido em script comum para abrir direto do disco. Gerado por _fonte/offline/gerar.js. */\n' +
    '(function(){' + t + '\n})();\n(function(){\n' + o + '\n})();\n';
}

/* ---------- lab3d.js entregando as funções por window.LAB3D ---------- */
function lab3dOffline() {
  let s = fs.readFileSync(path.join(RAIZ, 'material-didatico/assets/lab3d.js'), 'utf8');
  const nomes = [];
  s = s.replace(/^const THREE = await import\([^)]*\);/m, 'const THREE = window.THREE_OFFLINE;');
  s = s.replace(/^const \{ OrbitControls \} = await import\([^)]*\);/m, 'const { OrbitControls } = window.THREE_OFFLINE;');
  s = s.replace(/^export \{ THREE \};\s*$/m, () => { nomes.push('THREE'); return ''; });
  s = s.replace(/^export (const|function|let|class) ([A-Za-z_$][\w$]*)/gm, (_, k, n) => { nomes.push(n); return k + ' ' + n; });
  /* pré-carregamento não faz sentido no disco */
  s = s.replace(/\[\s*'\.\/vendor\/three\.module\.min\.js',\s*'\.\/vendor\/OrbitControls\.js'\s*\]\.forEach/g, '[].forEach');
  s = s.replace(/new URL\(u, import\.meta\.url\)\.href/g, 'u');
  if (/\bimport\b\s*[({.]|^\s*export\b/m.test(s.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''))) {
    throw new Error('lab3d.js: sobrou import/export que o gerador não conhece');
  }
  return '/* Versão de lab3d.js para o pacote sem internet (script comum). Gerado por _fonte/offline/gerar.js. */\n' +
    'window.LAB3D = (async () => {\n' + s + '\nreturn { ' + nomes.join(', ') + ' };\n})();\n';
}

/* ---------- ajustes em cada página ---------- */
function ajustarHtml(rel, html, tem) {
  const prof = rel.split('/').length - 1;
  const volta = '../'.repeat(prof);

  // Google Analytics
  html = html.replace(/<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*"><\/script>\s*<script>[\s\S]*?gtag\('config'[^<]*<\/script>\s*/g, '');
  // GoatCounter
  html = html.replace(/<script data-goatcounter=[^>]*><\/script>\s*/g, '');
  // Google Fonts
  html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\s*/g, '');
  html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2[^"]*" rel="stylesheet">/g, `<link rel="stylesheet" href="${volta}fontes/fontes.css">`);
  html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2[^"]*">/g, `<link rel="stylesheet" href="${volta}fontes/fontes.css">`);
  html = html.replace(/<link rel="stylesheet" href="\/assets\/fontes\/fontes\.css">/g, `<link rel="stylesheet" href="${volta}fontes/fontes.css">`);
  // links a partir da raiz do site: relativos se a página veio no pacote, senão para o ohtopico.com.br
  html = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (tudo, at, alvo) => {
    if (/^assistente\//.test(alvo)) return tudo;
    const limpo = alvo.split(/[?#]/)[0], resto = alvo.slice(limpo.length);
    const arq = limpo === '' || limpo.endsWith('/') ? limpo + 'index.html' : limpo;
    if (tem.has(arq)) return at + '="' + (path.posix.relative(path.posix.dirname(rel), arq) || 'index.html') + resto + '"';
    return at + '="' + SITE + alvo + '"';
  });
  // assistente "Pergunte ao site" precisa de internet
  html = html.replace(/<script src="\/assistente\/[^"]*"[^>]*><\/script>\s*/g, '');
  // manifest do app (só funciona com servidor)
  html = html.replace(/<link rel="manifest"[^>]*>\s*/g, '');

  // Módulos: imports do lab3d.js e do three.js viram leitura de window.LAB3D / window.THREE_OFFLINE
  let usa3d = false, usaLab = false;
  html = html.replace(/<script type="module">([\s\S]*?)<\/script>/g, (tudo, corpo) => {
    corpo = corpo.replace(/import\s*\{([^}]*)\}\s*from\s*'([^']*\/)?lab3d\.js';/g, (_, lista) => {
      usa3d = usaLab = true;
      return 'const {' + lista.replace(/\s+as\s+/g, ': ') + '} = await window.LAB3D;';
    });
    corpo = corpo.replace(/import\s*\*\s*as\s*(\w+)\s*from\s*'[^']*three\.module\.min\.js';/g, (_, n) => {
      usa3d = true;
      return 'const ' + n + ' = window.THREE_OFFLINE;';
    });
    if (/^\s*import\s/m.test(corpo)) throw new Error(rel + ': import que o gerador não conhece');
    return '<script type="module">' + corpo + '</script>';
  });
  if (usa3d) {
    const assets = path.posix.relative(path.posix.dirname(rel), 'material-didatico/assets') + '/';
    let tags = `<script src="${assets}vendor/three-offline.js"></script>\n`;
    if (usaLab) tags += `<script src="${assets}lab3d-offline.js"></script>\n`;
    html = html.replace('<script type="module">', tags + '<script type="module">');
  }

  // faixa e links do pacote
  html = html.replace(/<\/head>/i, `<script src="${volta}offline.js"></script>\n</head>`);
  return html;
}

/* ---------- offline.js ---------- */
function offlineJs(paginas) {
  return `/* Pacote sem internet do ohtopico.com.br. Gerado por _fonte/offline/gerar.js. */
(function () {
  var PAGINAS = ${JSON.stringify(paginas)};
  var SITE = ${JSON.stringify(SITE)};
  var tem = {}; PAGINAS.forEach(function (p) { tem[p] = 1; });
  var aqui = document.currentScript.src.replace(/offline\\.js(\\?.*)?$/, '');
  window.MD_OFFLINE = true;
  window.MD_RAIZ = aqui;
  /* caminho da página como se estivesse no site: /material-didatico/jogos/robo.html */
  window.MD_CAMINHO = function () { return location.href.indexOf(aqui) === 0 ? '/' + decodeURIComponent(location.pathname.slice(new URL(aqui).pathname.length)) : location.pathname; };

  /* Links do pacote: pasta vira index.html; página que não veio no pacote abre no site. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || a.hasAttribute('download')) return;
    var u;
    try { u = new URL(a.href); } catch (err) { return; }
    if (u.href.indexOf(aqui) !== 0) return;
    var p = decodeURIComponent(u.pathname.slice(new URL(aqui).pathname.length));
    var resto = u.search + u.hash;
    if (p === '' || p.slice(-1) === '/') {
      e.preventDefault();
      if (tem[p + 'index.html']) location.href = aqui + p + 'index.html' + resto;
      else window.open(SITE + p + resto, '_blank', 'noopener');
      return;
    }
    if (!tem[p] && (/\.html?$/.test(p) || p.indexOf('.') < 0)) {
      e.preventDefault();
      window.open(SITE + p + resto, '_blank', 'noopener');
    }
  }, true);

  function faixa() {
    /* o Mundo ocupa a tela inteira e já tem menu próprio */
    if (document.getElementById('md-offline') || window.MDA_MUNDO || /^\\/mundo\\/(index\\.html)?$/.test(MD_CAMINHO())) return;
    var d = document.createElement('div');
    d.id = 'md-offline';
    d.setAttribute('role', 'note');
    d.style.cssText = 'background:#111;color:#fff;font:500 14px/1.4 Lexend,Arial,sans-serif;padding:6px 14px;display:flex;gap:14px;flex-wrap:wrap;align-items:center;justify-content:center;position:relative;z-index:50';
    d.innerHTML = '<span>Versão sem internet</span><a href="' + aqui + 'comece-aqui.html" style="color:#fff7c2;font-weight:600">Todos os jogos do pacote</a>';
    document.body.insertBefore(d, document.body.firstChild);
  }
  if (document.body) faixa(); else document.addEventListener('DOMContentLoaded', faixa);
})();
`;
}

/* ---------- página inicial do pacote ---------- */
function titulo(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const t = html.match(/<title>([^<]*)<\/title>/i);
  let s = (t ? t[1] : '').replace(/\s*\|\s*Júlia Quoos\s*$/, '').trim();
  if (!s && h1) s = h1[1].replace(/<[^>]+>/g, '').trim();
  return s;
}
function descricao(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/i);
  return m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&') : '';
}

function comeceAqui(grupos) {
  const secoes = grupos.map(g => `
  <section>
    <h2>${esc(g.titulo)} <span class="n">${g.itens.length}</span></h2>
    <p class="sub">${esc(g.sub)}</p>
    <ul class="grade">${g.itens.map(i => `
      <li><a href="${esc(i.href)}"><strong>${esc(i.nome)}</strong><span>${esc(i.desc)}</span></a></li>`).join('')}
    </ul>
  </section>`).join('\n');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Jogos sem internet | Júlia Quoos</title>
<link rel="stylesheet" href="fontes/fontes.css">
<style>
  :root { --ink: #111; --paper: #fffdf6; --ink-2: #444; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--paper); color: var(--ink); font-family: Lexend, Arial, sans-serif; line-height: 1.5; }
  .wrap { max-width: 1100px; margin: 0 auto; padding: 0 16px; }
  header { background: #fff7c2; border-bottom: 2px solid var(--ink); padding: 34px 0 28px;
    background-image: radial-gradient(rgba(0,0,0,.12) 1.2px, transparent 1.5px); background-size: 18px 18px; }
  h1, h2 { font-family: Sniglet, Lexend, Arial, sans-serif; font-weight: 800; line-height: 1.1; }
  h1 { font-size: clamp(36px, 7vw, 60px); margin: 0 0 8px; }
  header p { font-size: 18px; margin: 0 0 18px; max-width: 760px; }
  .atalhos { display: flex; flex-wrap: wrap; gap: 12px; }
  .atalhos a { display: inline-block; border: 2px solid var(--ink); border-radius: 99px; padding: 10px 22px; background: #fff;
    color: var(--ink); text-decoration: none; font-weight: 600; box-shadow: 3px 3px 0 var(--ink); }
  .atalhos a.forte { background: var(--ink); color: #fff; }
  section { padding: 26px 0 6px; }
  h2 { font-size: clamp(24px, 4vw, 30px); margin: 0 0 4px; }
  h2 .n { font-family: Lexend, Arial, sans-serif; font-weight: 500; font-size: 15px; color: var(--ink-2); }
  .sub { margin: 0 0 14px; color: var(--ink-2); }
  .grade { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px; }
  .grade a { display: flex; flex-direction: column; gap: 4px; height: 100%; border: 2px solid var(--ink); border-radius: 14px; padding: 14px 16px;
    background: #fff; color: var(--ink); text-decoration: none; box-shadow: 3px 3px 0 var(--ink); }
  .grade a:hover, .grade a:focus-visible { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--ink); }
  .grade strong { font-size: 17px; }
  .grade span { font-size: 14px; color: var(--ink-2); }
  .aviso { border: 2px solid var(--ink); border-radius: 14px; background: #c6ebd4; padding: 14px 18px; margin: 26px 0 0; }
  .aviso h2 { font-size: 22px; }
  .aviso ul { margin: 6px 0 0; padding-left: 20px; }
  footer { margin: 34px 0 0; padding: 20px 0 34px; border-top: 2px solid var(--ink); font-size: 14px; color: var(--ink-2); }
  footer a { color: var(--ink); }
</style>
</head>
<body>
<header>
  <div class="wrap">
    <h1>Jogos sem internet</h1>
    <p>Todos os jogos, recursos 3D, simuladores e o Mundo do ohtopico.com.br, para abrir direto do computador, sem conexão. Matemática e Computação do 6º ao 9º ano, alinhados à BNCC.</p>
    <div class="atalhos">
      <a class="forte" href="jogos/index.html">Jogos por ano</a>
      <a href="mundo/index.html">Mundo</a>
      <a href="material-didatico/jogos/index.html">Lista para professores</a>
      <a href="simuladores/index.html">Simuladores</a>
    </div>
  </div>
</header>
<main class="wrap">
  <div class="aviso">
    <h2>Como usar no laboratório</h2>
    <ul>
      <li>Abra este arquivo (comece-aqui.html) no Chrome, Edge ou Firefox. Não precisa instalar nada.</li>
      <li>As estrelas e o progresso ficam guardados no navegador de cada computador.</li>
      <li>Planos de aula, fichas e páginas da BNCC não vêm no pacote: os links para eles abrem no site quando houver internet.</li>
      <li>O material premium e o ranking com amigos precisam de internet.</li>
    </ul>
  </div>
${secoes}
</main>
<footer>
  <div class="wrap">
    Material de Júlia Roberta Quoos Alves, licença CC BY-NC-SA 4.0. Pacote gerado em ${new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}.
    Versão mais nova: <a href="${SITE}jogos-sem-internet/">ohtopico.com.br/jogos-sem-internet</a>.
  </div>
</footer>
</body>
</html>
`;
}

/* ---------- montagem ---------- */
function main() {
  fs.rmSync(SAIDA, { recursive: true, force: true });
  fs.mkdirSync(PACOTE, { recursive: true });
  PASTAS.forEach(copiar);

  // fontes
  fs.mkdirSync(path.join(PACOTE, 'fontes'), { recursive: true });
  for (const f of fs.readdirSync(path.join(__dirname, 'fontes'))) fs.copyFileSync(path.join(__dirname, 'fontes', f), path.join(PACOTE, 'fontes', f));

  // three.js e lab3d.js em script comum
  fs.writeFileSync(path.join(PACOTE, 'material-didatico/assets/vendor/three-offline.js'), threeOffline());
  fs.writeFileSync(path.join(PACOTE, 'material-didatico/assets/lab3d-offline.js'), lab3dOffline());

  // ajustes pontuais
  // Caminhos a partir da raiz do site ("/assets/...") e testes de location.pathname: no disco a raiz
  // é a pasta do pacote, que offline.js informa em MD_RAIZ e MD_CAMINHO().
  for (const rel of ['material-didatico/assets/comum.js', 'material-didatico/assets/missoes.js', 'simuladores/assets/sim-comum.js', 'assets/estrelas.js']) {
    const p = path.join(PACOTE, rel);
    let js = fs.readFileSync(p, 'utf8');
    js = js.replace(/\blocation\.pathname\b/g, '(window.MD_CAMINHO ? MD_CAMINHO() : location.pathname)');
    js = js.replace(/s\.src = '\/assets\//g, "s.src = (window.MD_RAIZ || '/') + 'assets/");
    fs.writeFileSync(p, js);
  }
  const enem = path.join(PACOTE, 'mundo/enem/enem.js');
  if (fs.existsSync(enem)) fs.writeFileSync(enem, fs.readFileSync(enem, 'utf8').replace(/location\.replace\('\.\/'\)/g, "location.replace('index.html')"));
  const cod = path.join(PACOTE, 'mundo/codigo.js');
  if (fs.existsSync(cod)) fs.writeFileSync(cod, fs.readFileSync(cod, 'utf8').replace(/'\.\/\?ilha'/g, "'index.html?ilha'"));

  const arquivos = listar(PACOTE);
  const paginas = arquivos.filter(f => /\.html$/.test(f)).concat(['comece-aqui.html']).sort();
  for (const rel of arquivos.filter(f => /\.html$/.test(f))) {
    const p = path.join(PACOTE, rel);
    fs.writeFileSync(p, ajustarHtml(rel, fs.readFileSync(p, 'utf8'), new Set(arquivos)));
  }
  fs.writeFileSync(path.join(PACOTE, 'offline.js'), offlineJs(paginas));

  // índice
  const grupo = (dir, tituloG, sub, pular = []) => ({
    titulo: tituloG, sub,
    itens: fs.readdirSync(path.join(PACOTE, dir)).filter(f => /\.html$/.test(f) && f !== 'index.html' && !pular.includes(f)).map(f => {
      const h = fs.readFileSync(path.join(PACOTE, dir, f), 'utf8');
      return { href: dir + '/' + f, nome: titulo(h), desc: descricao(h) };
    }).sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')),
  });
  const grupos = [
    { titulo: 'Mundo', sub: 'A vila do ohtopico: missões de Matemática e Computação andando pelo mapa.', itens: [
      { href: 'mundo/index.html', nome: 'Mundo', desc: descricao(fs.readFileSync(path.join(PACOTE, 'mundo/index.html'), 'utf8')) }] },
    grupo('material-didatico/jogos', 'Jogos', 'Jogos de Matemática e Computação do 6º ao 9º ano.'),
    grupo('material-didatico/3d', 'Recursos 3D', 'Cenas para girar, montar e manipular.'),
    grupo('simuladores', 'Simuladores', 'Por dentro do computador, dos dados e da inteligência artificial.'),
  ];
  fs.writeFileSync(path.join(PACOTE, 'comece-aqui.html'), comeceAqui(grupos));
  fs.writeFileSync(path.join(PACOTE, 'LEIA-ME.txt'),
`JOGOS SEM INTERNET - ohtopico.com.br

1. Descompacte o arquivo .zip (botão direito > Extrair tudo).
2. Abra a pasta ${NOME} e dê dois cliques em comece-aqui.html.
3. Pronto: os jogos abrem no navegador, sem internet.

Para usar em vários computadores, copie a pasta inteira para cada um
(ou deixe numa pasta da rede da escola).

As estrelas e o progresso dos estudantes ficam no navegador de cada computador.
Planos de aula, fichas e páginas da BNCC não vêm no pacote; os links abrem no site.

Versão mais nova: ${SITE}jogos-sem-internet/
Material de Júlia Roberta Quoos Alves, licença CC BY-NC-SA 4.0.
`.replace(/\n/g, '\r\n'));

  const zip = path.join(SAIDA, NOME + '.zip');
  execFileSync('zip', ['-r', '-q', '-9', '-X', zip, NOME], { cwd: SAIDA });
  const tam = fs.statSync(zip).size;
  const total = grupos.reduce((n, g) => n + g.itens.length, 0);
  fs.writeFileSync(path.join(SAIDA, 'info.json'), JSON.stringify({ arquivo: NOME + '.zip', bytes: tam, itens: total,
    grupos: grupos.map(g => ({ titulo: g.titulo, n: g.itens.length })) }, null, 2));
  console.log(`${zip}: ${(tam / 1048576).toFixed(1)} MB, ${total} itens (${grupos.map(g => g.titulo + ' ' + g.itens.length).join(', ')})`);
}

main();
