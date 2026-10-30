/* Gera as páginas estáticas do material didático, para o Google conseguir ler e indexar:

   - material-didatico/planos/<slug>/   um plano de aula por página (antes só existia plano.html?id=...)
   - material-didatico/fichas/<slug>/   uma ficha para imprimir por página
   - material-didatico/listas/<slug>/   uma lista de exercícios por página
   - material-didatico/bncc/<código>/   uma página por habilidade da BNCC, com plano, slides, jogos, fichas e listas
   - nos jogos e recursos 3D: título (h1), texto para o professor, materiais relacionados e dados estruturados
     já escritos no HTML (antes vinham só do JavaScript)
   - o mapa de endereços (ESTATICAS) no fim de material-didatico/assets/dados.js
   - o bloco "material" do sitemap.xml

   As páginas de plano, ficha e lista são uma cópia de plano.html, ficha.html e lista.html com o conteúdo já
   desenhado dentro (o navegador abre a página, o script desenha de novo igual). Por isso o desenho continua
   num lugar só: mudou plano.html ou dados.js, é só rodar de novo.

     node _fonte/material/gerar.js

   Precisa de um Chromium para desenhar as páginas: usa o pacote playwright (ou playwright-core com o Chrome
   instalado na máquina, como na GitHub Action "Publicar posts agendados", que roda este script a cada push). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..', '..');
const MD = path.join(RAIZ, 'material-didatico');
const SITE = 'https://ohtopico.com.br';
const ASSINATURA = ' | Júlia Quoos';
const HOJE = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' });
const PASTAS = { plano: 'planos', ficha: 'fichas', lista: 'listas' };
const MARCA = '<!-- página gerada por _fonte/material/gerar.js: não edite à mão -->';
const OG = {
  plano: 'assets/og-planos.jpg', ficha: 'assets/og-fichas.jpg', lista: 'assets/og-listas.jpg', hab: 'assets/og-bncc.jpg',
  jogo: 'assets/og-material-didatico.jpg', '3d': 'assets/og-laboratorio-3d.jpg'
};

const ler = f => fs.readFileSync(f, 'utf8');
function escrever(f, txt) {
  const antes = fs.existsSync(f) ? ler(f) : null;
  if (antes === txt) return false;
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, txt);
  return true;
}
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-(e|de|do|da|dos|das|o|a|os|as|em|no|na|um|uma|para|com|por)(?=-)/g, '')
  .slice(0, 60).replace(/-[^-]*$/, m => (m.length > 1 ? m : '')).replace(/-+$/, '');
// corta no fim de uma palavra, sem passar de n caracteres
function cortar(txt, n) {
  txt = txt.replace(/\s+/g, ' ').trim();
  if (txt.length <= n) return txt;
  const c = txt.slice(0, n - 1);
  return c.slice(0, c.lastIndexOf(' ')).replace(/[,;:.\s–-]+$/, '') + '…';
}
// o primeiro título que cabe em 60 caracteres (o Google corta o resto)
const titulo = (...opcoes) => opcoes.find(t => t.length <= 60) || cortar(opcoes[opcoes.length - 1], 60);

/* ---------- dados ---------- */
function carregarDados() {
  const ctx = { window: {}, console };
  vm.createContext(ctx);
  for (const f of ['dados.js', 'listas.js', 'slides.js']) vm.runInContext(ler(path.join(MD, 'assets', f)), ctx);
  vm.runInContext('this.D = { HABILIDADES, HAB, RECURSOS, REC, EIXOS, COMPONENTES, TIPOS, PLANOS };', ctx);
  return { ...ctx.D, SLIDES: ctx.window.SLIDES || {} };
}
const D = carregarDados();
const anosTxt = anos => {
  if (anos.length === 1) return `${anos[0]}º ano`;
  const seq = anos.every((a, i) => i === 0 || a === anos[i - 1] + 1);
  return seq ? `${anos[0]}º ao ${anos[anos.length - 1]}º ano` : anos.map(a => a + 'º').join(', ') + ' anos';
};
const compTxt = r => r.comp.map(c => D.COMPONENTES[c].nome).join(' e ');

/* ---------- endereços ---------- */
const idDaUrl = r => (r.url.match(/^(plano|ficha|lista)\.html\?id=([\w-]+)$/) || [])[2];
const estaticos = D.RECURSOS.filter(r => PASTAS[r.tipo] && idDaUrl(r) === r.id);
const EST = {};
const usados = new Set();
for (const r of estaticos) {
  let s = `${PASTAS[r.tipo]}/${slug(r.titulo) || r.id}/`;
  if (usados.has(s)) s = s.replace(/\/$/, `-${r.id}/`);
  usados.add(s);
  EST[r.id] = s;
}
const materiaisDe = c => D.RECURSOS.filter(r => (r.habs || []).includes(c) && r.url);
const habs = D.HABILIDADES.filter(h => h.ano >= 6 && (materiaisDe(h.codigo).length || D.SLIDES[h.codigo]));
for (const h of habs) EST['hab:' + h.codigo] = `bncc/${h.codigo.toLowerCase()}/`;

function gravarMapa() {
  const f = path.join(MD, 'assets', 'dados.js');
  const linhas = Object.entries(EST).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(',\n');
  const bloco = `/* estaticas: início (gerado por _fonte/material/gerar.js; não edite à mão)
   Endereço da página estática de cada plano, ficha, lista e habilidade (hab:CÓDIGO), relativo a material-didatico/. */
const ESTATICAS = {
${linhas}
};
/* estaticas: fim */`;
  let txt = ler(f);
  txt = txt.includes('/* estaticas: início')
    ? txt.replace(/\/\* estaticas: início[\s\S]*?\/\* estaticas: fim \*\//, bloco)
    : txt.replace(/\s*$/, '\n\n' + bloco + '\n');
  escrever(f, txt);
}

/* ---------- dados estruturados ---------- */
const AUTORA = { '@type': 'Person', '@id': `${SITE}/#julia`, name: 'Júlia Roberta Quoos Alves', url: `${SITE}/` };
const alinhamentos = codigos => codigos.filter(c => D.HAB[c]).map(c => ({
  '@type': 'AlignmentObject', alignmentType: 'teaches', educationalFramework: 'BNCC',
  targetName: c, targetDescription: D.HAB[c].texto
}));
const migalhas = itens => ({
  '@type': 'BreadcrumbList',
  itemListElement: itens.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item }))
});
const TIPO_LD = { plano: 'Plano de aula', ficha: 'Ficha para imprimir', lista: 'Lista de exercícios', jogo: 'Jogo educativo', '3d': 'Simulação 3D' };
function recursoLD(r, url, img) {
  return {
    '@type': 'LearningResource', name: r.titulo, description: r.resumo, url, image: img, inLanguage: 'pt-BR',
    learningResourceType: TIPO_LD[r.tipo], educationalLevel: anosTxt(r.anos) + ' do Ensino Fundamental',
    about: r.comp.map(c => D.COMPONENTES[c].nome), isAccessibleForFree: true,
    ...(r.tempo ? { timeRequired: r.tempo } : {}),
    audience: { '@type': 'EducationalAudience', educationalRole: r.tipo === 'plano' || r.tipo === 'ficha' ? 'teacher' : 'student' },
    educationalAlignment: alinhamentos(r.habs || []),
    author: AUTORA, publisher: AUTORA,
    license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
  };
}
const ld = obj => `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', ...obj })}\n</script>`;

function cabecaSEO({ title, desc, url, img, imgAlt, ldObjs }) {
  return `<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${img}">
<meta property="og:image:alt" content="${esc(imgAlt)}">
<meta name="twitter:card" content="summary_large_image">
${ldObjs.map(ld).join('\n')}`;
}

/* ---------- servidor local + navegador ---------- */
const TIPOS_MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.wasm': 'application/wasm' };
function servidor() {
  return new Promise(res => {
    const srv = http.createServer((req, resp) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = path.join(RAIZ, p);
      if (!f.startsWith(RAIZ)) { resp.writeHead(403); return resp.end(); }
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
      if (!fs.existsSync(f)) { resp.writeHead(404); return resp.end(); }
      resp.writeHead(200, { 'Content-Type': TIPOS_MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(resp);
    });
    srv.listen(0, '127.0.0.1', () => res(srv));
  });
}
async function navegador() {
  try { return await require('playwright').chromium.launch(); } catch (e) { /* sem o pacote completo */ }
  return require('playwright-core').chromium.launch({ channel: 'chrome' });
}

/* Abre a página e devolve o HTML dos elementos pedidos, já desenhados pelo script da própria página */
async function desenhar(browser, url, seletores, initScript) {
  const page = await browser.newPage();
  // fontes, contador de visitas e afins não mudam o HTML: não precisa esperar por eles
  await page.route(u => !u.href.startsWith(BASE_LOCAL), r => r.abort());
  if (initScript) await page.addInitScript(initScript);
  const erros = [];
  page.on('pageerror', e => erros.push(e.message));
  await page.goto(BASE_LOCAL + url, { waitUntil: 'load' });
  const html = await page.evaluate(sels => sels.map(s => { const el = document.querySelector(s); return el ? el.innerHTML : null; }), seletores);
  await page.close();
  if (erros.length) console.warn(`  aviso em ${url}: ${erros[0]}`);
  return html;
}
let BASE_LOCAL = '';

/* ---------- planos, fichas e listas ---------- */
const DESC_TIPO = { plano: 'Plano de aula', ficha: 'Ficha para imprimir', lista: 'Lista de exercícios com gabarito' };
const NOME_TIPO = { plano: 'Plano de aula', ficha: 'Ficha para imprimir', lista: 'Lista de exercícios' };
const MIGALHA_TIPO = { plano: ['Área do professor', 'professor.html'], ficha: ['Fichas', 'catalogo.html?tipo=ficha'], lista: ['Listas', 'catalogo.html?tipo=lista'] };
const ALVO = { plano: [['#doc', 'main']], ficha: [['#fichas', 'main'], ['#gab', 'div']], lista: [['#doc', 'main']] };

function paginaEstatica(fonte, r, html) {
  const url = `${SITE}/material-didatico/${EST[r.id]}`;
  const codigos = (r.habs || []).filter(c => D.HAB[c]);
  const nome = NOME_TIPO[r.tipo];
  const title = titulo(
    `${r.titulo} · ${nome} ${codigos[0] || ''}`.trim() + ASSINATURA,
    `${r.titulo} · ${nome}${ASSINATURA}`,
    `${r.titulo} · ${nome}`,
    r.titulo + ASSINATURA, r.titulo);
  const desc = cortar(`${DESC_TIPO[r.tipo]} gratuito, ${compTxt(r)}, ${anosTxt(r.anos)}${codigos.length ? ` (BNCC ${codigos.slice(0, 3).join(', ')})` : ''}. ${r.resumo}`, 155);
  const img = `${SITE}/material-didatico/${OG[r.tipo]}`;
  const seo = cabecaSEO({
    title, desc, url, img, imgAlt: `${nome}: ${r.titulo}`,
    ldObjs: [recursoLD(r, url, img), migalhas([['Início', `${SITE}/`], ['Material didático', `${SITE}/material-didatico/`],
      [MIGALHA_TIPO[r.tipo][0], `${SITE}/material-didatico/${MIGALHA_TIPO[r.tipo][1]}`], [r.titulo, url]])]
  });
  let t = fonte
    .replace(/<meta charset="UTF-8">\n/, m => `${m}<base href="/material-didatico/">\n${MARCA}\n`)
    .replace(/<meta name="robots" content="noindex, follow">\n/, '')
    .replace(/<title>[^<]*<\/title>\n<meta name="description" content="[^"]*">/, seo)
    .replace(/<script>window\.MD_BASE = '';<\/script>/, m => `<script>window.MD_ID = window.MD_REC = ${JSON.stringify(r.id)};</script>\n${m}`);
  ALVO[r.tipo].forEach(([sel, tag], i) => {
    const id = sel.slice(1);
    const re = new RegExp(`(<${tag}\\b[^>]*\\bid="${id}"[^>]*>)(</${tag}>)`);
    if (!re.test(t)) throw new Error(`${r.tipo}: não achei <${tag} id="${id}"> na página modelo`);
    t = t.replace(re, (m, a, b) => a + html[i] + b);
  });
  if (t.includes('noindex') || !t.includes('<base href')) throw new Error(`${r.id}: modelo mudou, confira gerar.js`);
  return t;
}

/* ---------- páginas das habilidades ---------- */
const ORDEM = ['plano', 'jogo', '3d', 'ficha', 'lista'];
const ROTULO = { plano: 'Planos de aula', jogo: 'Jogos', '3d': 'Recursos 3D', ficha: 'Fichas para imprimir', lista: 'Listas de exercícios' };
const APOSTILA = { 6: 14, 7: 45, 8: 79, 9: 113 }; // página do PDF onde começa cada ano (3 páginas por habilidade)
function paginaHab(h) {
  const c = h.codigo;
  const url = `${SITE}/material-didatico/${EST['hab:' + c]}`;
  const mats = materiaisDe(c);
  const area = D.COMPONENTES[h.comp].nome;
  const eixo = D.EIXOS[h.eixo].nome;
  const slides = D.SLIDES[c];
  const tipos = ORDEM.filter(t => mats.some(r => r.tipo === t));
  const resumoMats = [slides ? 'slides em PDF' : '', ...tipos.map(t => ROTULO[t].toLowerCase())].filter(Boolean);
  const listaTxt = a => a.length > 1 ? a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1] : a[0] || 'materiais';
  const title = titulo(`${c}: ${h.objeto} (${h.ano}º ano)${ASSINATURA}`, `${c}: ${h.objeto} (${h.ano}º ano)`, `${c}: ${h.objeto}`);
  const desc = cortar(`${c} da BNCC (${area}, ${h.ano}º ano): ${listaTxt(resumoMats)} gratuitos. ${h.texto}`, 155);
  const img = `${SITE}/material-didatico/${OG.hab}`;
  const pagApostila = h.comp === 'CO' && APOSTILA[h.ano] ? APOSTILA[h.ano] + 3 * (parseInt(c.slice(-2), 10) - 1) : 0;
  const card = r => `
      <a class="card" href="${EST[r.id] || r.url}">
        <span class="small muted">${D.TIPOS[r.tipo].icone} ${D.TIPOS[r.tipo].nome} · ${anosTxt(r.anos)}${r.tempo ? ' · ' + esc(r.tempo) : ''}</span>
        <strong>${esc(r.titulo)}</strong>
        <span class="small muted">${esc(r.resumo || '')}</span>
      </a>`;
  const vizinhas = habs.filter(o => o.comp === h.comp && o.ano === h.ano && o.codigo !== c);
  const ldPagina = {
    '@type': 'CollectionPage', name: title, description: desc, url, inLanguage: 'pt-BR', image: img,
    about: { '@type': 'DefinedTerm', name: `${c}: ${h.objeto}`, description: h.texto, inDefinedTermSet: 'BNCC' },
    educationalAlignment: alinhamentos([c]), author: AUTORA,
    hasPart: mats.map(r => ({ '@type': 'LearningResource', name: r.titulo, url: `${SITE}/material-didatico/${EST[r.id] || r.url}` }))
  };
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<base href="/material-didatico/">
${MARCA}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${cabecaSEO({ title, desc, url, img, imgAlt: `Habilidade ${c} da BNCC`, ldObjs: [ldPagina, migalhas([['Início', `${SITE}/`], ['Material didático', `${SITE}/material-didatico/`], ['Explorar a BNCC', `${SITE}/material-didatico/bncc.html`], [c, url]])] })}
<meta name="author" content="Júlia Roberta Quoos Alves">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/md.css">
<style>
  .doc { max-width: 960px; margin: 0 auto; padding: 32px 16px 40px; }
  .crumbs { font-size: 14px; margin-bottom: 18px; }
  .crumbs a { color: var(--ink-2); }
  .doc h1 { font-size: clamp(30px, 5vw, 46px); margin: 6px 0 10px; }
  .doc h2 { font-size: 26px; margin-top: 36px; }
  .meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin: 22px 0; }
  .meta div { border: 1.5px solid var(--ink); border-radius: 18px; padding: 12px 14px; }
  .meta span { display: block; font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-2); }
  .vizinhas { display: flex; flex-wrap: wrap; gap: 8px; }
</style>
</head>
<body>
<header id="topbar"></header>
<main class="doc" id="doc">
  <div class="crumbs"><a href="bncc.html?comp=${h.comp}&amp;ano=${h.ano}">← Explorar a BNCC</a></div>
  <span class="eyebrow">${h.comp === 'CO' ? '💻' : '📐'} Habilidade da BNCC · ${area} · ${h.ano}º ano</span>
  <h1>${c}: ${esc(h.objeto)}</h1>
  <p class="lead">${esc(h.texto)}</p>
  <div class="meta">
    <div><span>Componente</span>${area}</div>
    <div><span>${h.comp === 'CO' ? 'Eixo' : 'Unidade temática'}</span>${eixo}</div>
    <div><span>Ano</span>${h.ano}º ano do Ensino Fundamental</div>
    <div><span>Materiais</span>${mats.length + (slides ? 1 : 0)} gratuitos</div>
  </div>
  <p>Nesta página estão os materiais gratuitos para trabalhar a habilidade <strong>${c}</strong> em sala de aula: ${listaTxt(resumoMats)}. Tudo funciona no navegador, sem cadastro, e pode ser impresso ou projetado.</p>
${slides || pagApostila ? `
  <h2>Aula expositiva</h2>
  <div class="btn-row">${slides ? `
    <a class="btn" href="slides/bncc-${c.toLowerCase()}-slides.pdf" download type="application/pdf">📥 Slides da aula (PDF): ${esc(slides)}</a>` : ''}${pagApostila ? `
    <a class="btn ghost" href="apostila-professor-bncc/apostila-professor-bncc-computacao.pdf#page=${pagApostila}" target="_blank" rel="noopener">📘 Ficha da habilidade na apostila do professor</a>` : ''}
  </div>` : ''}
${tipos.map(t => `
  <h2>${ROTULO[t]}</h2>
  <div class="related">${mats.filter(r => r.tipo === t).map(card).join('')}
  </div>`).join('\n')}
${vizinhas.length ? `
  <h2>Outras habilidades do ${h.ano}º ano</h2>
  <div class="vizinhas">${vizinhas.map(o => `<a class="tag code ${o.comp.toLowerCase()}" href="${EST['hab:' + o.codigo]}" title="${esc(o.objeto)}">${o.codigo}</a>`).join('')}</div>` : ''}
</main>
<footer id="footer"></footer>
<script>window.MD_BASE = '';</script>
<script src="assets/dados.js"></script>
<script src="assets/listas.js"></script>
<script src="assets/progresso.js"></script>
<script src="assets/comum.js"></script>
<script>mdTopbar('bncc'); mdFooter();</script>
<script data-goatcounter="https://ohtopico.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
`;
}

/* ---------- jogos e recursos 3D: conteúdo escrito no HTML ---------- */
function blocoMarcado(txt, nome, conteudo, onde) {
  const ini = `<!-- ${nome}: início (gerado por _fonte/material/gerar.js) -->`, fim = `<!-- ${nome}: fim -->`;
  const re = new RegExp(`${ini.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${fim}`);
  const bloco = `${ini}${conteudo}${fim}`;
  if (re.test(txt)) return txt.replace(re, () => bloco);
  return onde(txt, bloco);
}
function paraProfessor(r) {
  const codigos = (r.habs || []).filter(c => D.HAB[c]);
  const plano = r.plano && D.REC[r.plano], ficha = r.ficha && D.REC[r.ficha];
  const listas = D.RECURSOS.filter(o => o.tipo === 'lista' && o.habs.some(c => codigos.includes(c)) && !/-revisao$/.test(o.id)).slice(0, 3);
  const comSlides = codigos.filter(c => D.SLIDES[c]);
  return `
  <details class="prof">
    <summary>Para o professor</summary>
    <p><strong>${esc(r.titulo)}</strong> é um jogo gratuito de ${compTxt(r)} para o ${anosTxt(r.anos)}, pensado para cerca de ${esc(r.tempo)} de aula. Funciona no navegador do computador, do tablet ou do celular, sem cadastro e sem instalar nada. ${esc(r.resumo)}</p>
    <p>Habilidades da BNCC trabalhadas:</p>
    <ul>${codigos.map(c => `
      <li><a href="${EST['hab:' + c] ? '../' + EST['hab:' + c] : '../catalogo.html?hab=' + c}"><strong>${c}</strong></a>: ${esc(D.HAB[c].texto)}</li>`).join('')}
    </ul>
    <p>${[
      plano ? `Para a aula completa, use o plano <a href="../${EST[plano.id] || plano.url}">${esc(plano.titulo)}</a>, com objetivos, etapas, avaliação e acessibilidade.` : '',
      ficha ? `A ficha <a href="../${EST[ficha.id] || ficha.url}">${esc(ficha.titulo)}</a> leva a atividade para o papel.` : '',
      listas.length ? `Para fixar, há ${listas.length > 1 ? 'as listas' : 'a lista'} ${listas.map(l => `<a href="../${EST[l.id] || l.url}">${esc(l.titulo)}</a>`).join(', ')}, com gabarito.` : '',
      comSlides.length ? `Os slides da aula expositiva de ${comSlides.join(', ')} estão na página de cada habilidade.` : ''
    ].filter(Boolean).join(' ')}</p>
  </details>
  `;
}
async function jogosE3d(browser) {
  let mudou = 0;
  const lista = D.RECURSOS.filter(r => (r.tipo === 'jogo' || r.tipo === '3d') && /^(jogos|3d)\/[\w-]+\.html$/.test(r.url));
  for (const r of lista) {
    const arq = path.join(MD, r.url);
    if (!fs.existsSync(arq)) continue;
    let t = ler(arq);
    if (!t.includes('id="game-head"')) continue;
    // o título e os relacionados que mdJogoHead() desenha, já no HTML
    const [cab, rel] = await desenhar(browser, `/material-didatico/${r.url}`, ['#game-head', '#related']);
    const semComentarios = h => (h || '').replace(/<!--[\s\S]*?-->/g, '');
    t = blocoMarcado(t, 'cab', semComentarios(cab), (x, b) => x.replace(/(<div class="game-head" id="game-head">)(<\/div>)/, `$1${b}$2`));
    t = blocoMarcado(t, 'rel', semComentarios(rel), (x, b) => x.replace(/(<div class="related" id="related">)(<\/div>)/, `$1${b}$2`));
    const semBloco = t.replace(/<!-- professor: início[\s\S]*?<!-- professor: fim -->/, '');
    if (r.tipo === 'jogo' && !/<details class="prof">/.test(semBloco)) {
      // antes do título "Continue explorando" (se houver) e dos relacionados
      t = blocoMarcado(t, 'professor', paraProfessor(r),
        (x, b) => x.replace(/(\n[ \t]*(?:<h2[^>]*>Continue explorando<\/h2>\s*)?<div class="related" id="related">)/, `\n  ${b}$1`));
    }
    // título pensado para a busca: nome do jogo, o que é, para quem
    const oque = r.tipo === 'jogo' ? 'jogo de' : 'simulação 3D de';
    const novoTitulo = titulo(`${r.titulo}: ${oque} ${compTxt(r)}, ${anosTxt(r.anos)}${ASSINATURA}`,
      `${r.titulo}: ${oque} ${compTxt(r)}${ASSINATURA}`, `${r.titulo}: ${oque} ${compTxt(r)}`, r.titulo + ASSINATURA, r.titulo);
    t = t.replace(/<title>[^<]*<\/title>/, `<title>${esc(novoTitulo)}</title>`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(novoTitulo)}$2`);
    const url = `${SITE}/material-didatico/${r.url}`;
    const img = `${SITE}/material-didatico/${OG[r.tipo]}`;
    const dados = [recursoLD(r, url, img), migalhas([['Início', `${SITE}/`], ['Material didático', `${SITE}/material-didatico/`],
      r.tipo === 'jogo' ? ['Jogos', `${SITE}/material-didatico/jogos/`] : ['Laboratório 3D', `${SITE}/material-didatico/catalogo.html?tipo=3d`], [r.titulo, url]])];
    t = blocoMarcado(t, 'dados estruturados', '\n' + dados.map(ld).join('\n') + '\n', (x, b) => x.replace(/\n<\/head>/, `\n${b}\n</head>`));
    if (escrever(arq, t)) mudou++;
  }
  return mudou;
}

/* ---------- sitemap ---------- */
function atualizarSitemap(urlsComHash) {
  const f = path.join(RAIZ, 'sitemap.xml');
  const xml = ler(f);
  const antigos = Object.fromEntries([...xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>(?:<!-- h:(\w+) -->)?/g)].map(m => [m[1], { d: m[2], h: m[3] }]));
  const linhas = urlsComHash.map(([u, h]) => {
    const a = antigos[u];
    const d = a && a.h === h ? a.d : HOJE;
    return `  <url><loc>${u}</loc><lastmod>${d}</lastmod></url><!-- h:${h} -->`;
  });
  const bloco = '  <!-- material: início (gerado por _fonte/material/gerar.js) -->\n' + linhas.join('\n') + '\n  <!-- material: fim -->';
  const novo = xml.includes('<!-- material: início')
    ? xml.replace(/  <!-- material: início[\s\S]*?<!-- material: fim -->/, bloco)
    : xml.replace('</urlset>', bloco + '\n</urlset>');
  escrever(f, novo);
}
const hash = t => crypto.createHash('md5').update(t).digest('hex').slice(0, 8);

/* ---------- apagar páginas que não existem mais ---------- */
function limpar() {
  const validos = new Set(Object.values(EST).map(s => path.join(MD, s)));
  for (const pasta of [...Object.values(PASTAS), 'bncc']) {
    const dir = path.join(MD, pasta);
    if (!fs.existsSync(dir)) continue;
    for (const d of fs.readdirSync(dir)) {
      const p = path.join(dir, d) + path.sep;
      const idx = path.join(p, 'index.html');
      if (!validos.has(p) && fs.existsSync(idx) && ler(idx).includes(MARCA)) {
        fs.rmSync(p, { recursive: true });
        console.log('apagada', path.relative(RAIZ, p));
      }
    }
  }
}

async function main() {
  gravarMapa();
  const srv = await servidor();
  BASE_LOCAL = `http://127.0.0.1:${srv.address().port}`;
  const browser = await navegador();
  const sitemap = [];
  let novas = 0;
  try {
    const modelos = {};
    for (const r of estaticos) {
      const fonte = modelos[r.tipo] = modelos[r.tipo] || ler(path.join(MD, `${r.tipo}.html`));
      const html = await desenhar(browser, `/material-didatico/${r.tipo}.html`, ALVO[r.tipo].map(a => a[0]),
        `window.MD_ID = window.MD_REC = ${JSON.stringify(r.id)};`);
      if (html.some(h => h === null || /não encontrad/.test(h.slice(0, 200)))) throw new Error(`${r.id}: a página não desenhou o conteúdo`);
      const t = paginaEstatica(fonte, r, html);
      if (escrever(path.join(MD, EST[r.id], 'index.html'), t)) novas++;
      sitemap.push([`${SITE}/material-didatico/${EST[r.id]}`, hash(t)]);
    }
    for (const h of habs) {
      const t = paginaHab(h);
      if (escrever(path.join(MD, EST['hab:' + h.codigo], 'index.html'), t)) novas++;
      sitemap.push([`${SITE}/material-didatico/${EST['hab:' + h.codigo]}`, hash(t)]);
    }
    const jogos = await jogosE3d(browser);
    // jogos e recursos 3D que ainda não estão no sitemap (os outros têm a data escrita à mão fora do bloco gerado)
    const foraDoBloco = ler(path.join(RAIZ, 'sitemap.xml')).replace(/<!-- material: início[\s\S]*?<!-- material: fim -->/, '');
    for (const r of D.RECURSOS.filter(r => (r.tipo === 'jogo' || r.tipo === '3d') && /^(jogos|3d)\/[\w-]+\.html$/.test(r.url))) {
      const u = `${SITE}/material-didatico/${r.url}`;
      if (!foraDoBloco.includes(`<loc>${u}</loc>`) && fs.existsSync(path.join(MD, r.url))) sitemap.push([u, hash(ler(path.join(MD, r.url)))]);
    }
    console.log(`${estaticos.length} planos, fichas e listas e ${habs.length} habilidades (${novas} mudaram); ${jogos} jogos e recursos 3D atualizados.`);
  } finally {
    await browser.close();
    srv.close();
  }
  limpar();
  atualizarSitemap(sitemap);
}
main().catch(e => { console.error(e); process.exit(1); });
