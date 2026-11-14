/* Miniatura própria (og:image 1200 × 630) para cada página do site: a prévia que aparece quando alguém
   cola o link no WhatsApp, Instagram, Facebook, LinkedIn ou Telegram.

   As páginas que já têm imagem própria (as da lista IMAGENS de gerar.js, os posts do blog etc.) ficam
   como estão. As outras, que não tinham imagem ou usavam uma capa repetida em muitas páginas
   (habilidades da BNCC, fichas, planos, listas, matemática adaptada...), ganham uma imagem com o título
   e o resumo delas, no mesmo visual de janela das outras, salva em img/og/<caminho da página>.png
   (PNG com 32 cores, via Pillow: fica com uns 30 KB, um terço de um JPEG, e o texto sai nítido).
   O script também acerta as etiquetas og:* e twitter:* do <head>.

     node _fonte/og/paginas.js              gera o que falta ou mudou e atualiza as páginas
     node _fonte/og/paginas.js --tudo       gera todas as imagens de novo
     node _fonte/og/paginas.js --conferir   só lista o que mudaria

   Roda na Action "Publicar posts agendados" depois dos outros geradores, então página nova já sai com
   miniatura. O índice img/og/indice.json guarda o que foi desenhado em cada imagem: só gera de novo
   quando o título, o resumo ou o visual mudam. Rode na raiz do site. */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RAIZ = path.resolve(__dirname, '..', '..');
const SITE = 'https://ohtopico.com.br';
const PASTA = 'img/og';
const INDICE = path.join(RAIZ, PASTA, 'indice.json');
const VERSAO = 1; // mude quando o modelo mudar, para gerar tudo de novo

// imagens usadas por pelo menos tantas páginas são capas genéricas e dão lugar a uma miniatura própria
const REPETIDA = 5;
const IGNORAR_PASTAS = new Set(['node_modules', 'img', 'assets', 'premium/x']);
// modelos que o _fonte/material/gerar.js copia para cada plano, ficha e lista: o <head> deles não pode ganhar etiquetas
const MODELOS = new Set(['material-didatico/plano.html', 'material-didatico/ficha.html', 'material-didatico/lista.html']);

function paginas(dir = RAIZ, rel = '') {
  const out = [];
  for (const nome of fs.readdirSync(dir)) {
    if (nome.startsWith('.') || nome.startsWith('_')) continue;
    const r = rel ? `${rel}/${nome}` : nome;
    const f = path.join(dir, nome);
    const st = fs.statSync(f);
    if (st.isDirectory()) { if (!IGNORAR_PASTAS.has(r) && !IGNORAR_PASTAS.has(nome)) out.push(...paginas(f, r)); }
    else if (nome.endsWith('.html')) out.push(r);
  }
  return out;
}

const attr = (html, re) => { const m = html.match(re); return m ? dec(m[1]) : ''; };
const dec = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ogImagem = html => attr(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
const urlDe = rel => SITE + '/' + rel.replace(/(^|\/)index\.html$/, '$1');

/* Selo acima do título e etiquetas, conforme a parte do site. As etiquetas de ano e de habilidade
   saem do título ou do resumo da página. */
const SECOES = [
  [/^material-didatico\/bncc\//, 'BNCC · habilidade por habilidade', ['Slides', 'Planos', 'Fichas']],
  [/^material-didatico\/planos\//, 'Plano de aula · BNCC', ['Objetivos', 'Etapas', 'Avaliação']],
  [/^material-didatico\/fichas\//, 'Ficha para imprimir · BNCC', ['Para imprimir', 'Gabarito']],
  [/^material-didatico\/listas\//, 'Lista de exercícios · BNCC', ['Na tela ou impressa', 'Gabarito']],
  [/^material-didatico\/jogos\//, 'Jogo · no navegador', ['Gratuito', 'Plano de aula']],
  [/^material-didatico\/3d\//, 'Laboratório 3D · no navegador', ['Gratuito', '3D']],
  [/^material-didatico\/computacao-ano-a-ano\/|^computacao-ano-a-ano\//, 'Computação ano a ano', ['Aulas', 'Folhas', 'Gabarito']],
  [/^material-didatico\//, 'Material didático · gratuito', ['BNCC', 'Computação', 'Matemática']],
  [/^matematica-adaptada\//, 'Matemática adaptada · para imprimir', ['Versões A, B e C', 'Diferentes necessidades']],
  [/^computacao-adaptada\//, 'Computação adaptada · para imprimir', ['Versões A, B e C', 'Diferentes necessidades']],
  [/^material-adaptado\//, 'Material adaptado · para imprimir', ['Diferentes necessidades', 'Gratuito']],
  [/^computacao-desplugada\//, 'Computação desplugada · sem computador', ['Para imprimir', 'Braille', 'Moldes táteis']],
  [/^simuladores\//, 'Simulador · no navegador', ['Gratuito', 'Sem instalar']],
  [/^ensino-superior\//, 'Ensino superior', ['Arquitetura', 'Dados', 'Simuladores']],
  [/^mundo\/enem\//, 'Mundo · Ilha ENEM', ['Ensino médio', 'ENEM', 'Jogo']],
  [/^mundo\/arte\//, 'Mundo · Vila da Arte', ['BNCC Arte', 'Jogo']],
  [/^mundo\//, 'Mundo do site', ['Missões', 'BNCC', 'Jogo']],
  [/^jogos\//, 'Jogo · no navegador', ['Gratuito', 'Para estudantes']],
  [/^infograficos\//, 'Infográfico · dados abertos', ['Dados', 'Gráficos']],
  [/^notebooks\//, 'Notebook · ciência de dados', ['Python', 'Dados']],
  [/^blog\//, 'Blog · para professores', ['BNCC Computação', 'IA na escola']],
  [/^premium\//, 'Área do apoiador', ['Catarse', 'Material extra']],
  [/^escape-matematica\//, 'Escape da Matemática', ['Jogo', 'Matemática']],
  [/^hora-do-codigo\//, 'Hora do Código', ['BNCC Computação', '6º ao 9º ano']],
  [/^/, 'Gratuito · para professores', ['BNCC Computação', 'IA para professores']]
];

const ASSINATURA = /\s*[|·–-]\s*(Júlia Quoos|Júlia Roberta Quoos Alves|ohtopico(\.com\.br)?)\s*$/i;

function dadosDa(rel, html) {
  let titulo = attr(html, /<title>([^<]*)<\/title>/i) || attr(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  titulo = titulo.replace(ASSINATURA, '').replace(/\s*·\s*Material didático$/, '').replace(/:\s*(computação|matemática) adaptada$/i, '');
  let desc = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i) || attr(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const [, faixaBase, pillsBase] = SECOES.find(([re]) => re.test(rel));
  // tira do fim do título o que o selo já diz ("· Ficha para imprimir", ": computação desplugada", ": Computação 6º ano")
  const original = titulo;
  const selo = faixaBase.toLowerCase();
  titulo = titulo.replace(/\s*(?:·|:)\s*([^·:]+)$/, (m, fim) => {
    const f = fim.toLowerCase().trim();
    return selo.includes(f) || /^computação \dº ano$/.test(f) || f === 'material didático' ? '' : m;
  });
  const texto = original + ' ' + desc;
  const pills = [];
  const codigo = (texto.match(/\bEF\d{2}[A-Z]{2}\d{2}\b|\bEM\d{2}[A-Z]{3}\d{2,3}\b/) || [])[0];
  let faixa = faixaBase;
  if (codigo) {
    titulo = titulo.replace(new RegExp('^' + codigo + '\\s*[:·–-]\\s*'), '').replace(new RegExp('\\s*\\(' + codigo + '\\)'), '');
    faixa = faixaBase.split(' · ')[0] + ' · ' + codigo;
    pills.push(/CO\d\d$/.test(codigo) ? 'Computação' : /MA\d\d$/.test(codigo) ? 'Matemática' : /AR\d\d$/.test(codigo) ? 'Arte' : 'BNCC');
  }
  const ano = (texto.match(/\b(\d)º(?:\s*(?:ao|e|a)\s*\d+º)?\s*ano\b/) || [])[0];
  if (ano) { pills.push(ano); titulo = titulo.replace(new RegExp('\\s*\\(' + ano.replace(/[()]/g, '') + '\\)'), ''); }
  for (const p of pillsBase) if (pills.length < 3 && !pills.includes(p)) pills.push(p);
  if (!titulo) titulo = 'ohtopico.com.br';
  if (desc.length > 150) desc = desc.slice(0, 147).replace(/\s+\S*$/, '') + '…';
  const nome = rel.replace(/(^|\/)index\.html$/, '').split('/').pop() || 'inicio';
  const janela = nome.endsWith('.html') ? nome : nome + '.html';
  const url = urlDe(rel).replace(/^https:\/\//, '').replace(/\/$/, '');
  return { titulo, desc, faixa, pills, janela, url };
}

// destaca de amarelo o fim do título (as últimas palavras, cerca de um terço)
function partes(titulo) {
  const p = titulo.split(/\s+/);
  if (p.length === 1) return ['', titulo];
  const n = Math.max(1, Math.round(p.length / 3));
  return [p.slice(0, p.length - n).join(' '), p.slice(p.length - n).join(' ')];
}

let FONTES = '';
function fontes() {
  if (FONTES) return FONTES;
  const b64 = f => fs.readFileSync(path.join(RAIZ, 'assets/fontes', f)).toString('base64');
  FONTES = [['Fredoka', 600, 'fredoka-latin-600-normal.woff2'], ['Lexend', 400, 'lexend-latin-400-normal.woff2'], ['Lexend', 500, 'lexend-latin-500-normal.woff2']]
    .map(([fam, w, f]) => `@font-face { font-family: ${fam}; font-weight: ${w}; src: url(data:font/woff2;base64,${b64(f)}) format('woff2'); }`).join('\n');
  return FONTES;
}

function modelo(o) {
  const [t1, t2] = partes(o.titulo);
  const pillCls = ['p-verde', 'p-amarelo', ''];
  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><style>
${fontes()}
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #f4f4f2 radial-gradient(#d9d9d6 1.2px, transparent 1.2px) 0 0 / 22px 22px; font-family: Lexend, sans-serif; color: #111; position: relative; overflow: hidden; }
  .win { position: absolute; left: 50px; top: 34px; width: 1090px; height: 520px; background: #fff; border: 3px solid #111; border-radius: 26px; box-shadow: 16px 16px 0 #111; overflow: hidden; }
  .bar { height: 52px; border-bottom: 3px solid #111; display: flex; align-items: center; padding: 0 26px; background: #f4f4f2; }
  .bar b { font-family: Fredoka; font-weight: 800; font-size: 18px; letter-spacing: .12em; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 900px; }
  .dots { margin-left: auto; display: flex; gap: 9px; } .dots i { width: 22px; height: 22px; border: 2.5px solid #111; border-radius: 50%; }
  .txt { padding: 26px 60px 30px; height: 462px; overflow: hidden; display: flex; flex-direction: column; justify-content: safe center; align-items: flex-start; }
  .faixa { display: inline-flex; align-items: center; gap: 10px; border: 2.5px solid #111; border-radius: 99px; padding: 6px 16px; font-family: Fredoka; font-weight: 800; font-size: 15px; letter-spacing: .1em; text-transform: uppercase; }
  .faixa i { width: 6px; height: 18px; background: #1f8a4c; border-radius: 2px; }
  h1 { font-family: Fredoka; font-weight: 800; font-size: 76px; line-height: 1.04; text-transform: uppercase; margin: 22px 0 16px; letter-spacing: .01em; overflow-wrap: anywhere; }
  h1 span { background: #fff06a; padding: 2px 12px 0; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
  p.sub { font-size: 23px; color: #4a4a4a; line-height: 1.34; max-width: 940px; }
  .pills { display: flex; gap: 10px; margin-top: 22px; flex-wrap: wrap; }
  .pills span { border: 2px solid #111; border-radius: 99px; padding: 7px 16px; font-size: 17px; font-weight: 500; }
  .p-verde { background: #dff3e6; } .p-amarelo { background: #fff06a; }
  .rod { position: absolute; left: 54px; right: 58px; bottom: 18px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
  .rod b { font-family: Fredoka; font-weight: 800; font-size: 22px; letter-spacing: .2em; text-transform: uppercase; white-space: nowrap; }
  .rod span { border: 2px solid #111; border-radius: 99px; padding: 5px 18px; font-size: 19px; background: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style></head><body>
<div class="win">
  <div class="bar"><b>${esc(o.janela)}</b><div class="dots"><i></i><i></i><i></i></div></div>
  <div class="txt">
    <div class="faixa"><i></i>${esc(o.faixa)}</div>
    <h1>${t1 ? esc(t1) + ' ' : ''}<span>${esc(t2)}</span></h1>
    ${o.desc ? `<p class="sub">${esc(o.desc)}</p>` : ''}
    <div class="pills">${o.pills.map((p, i) => `<span class="${pillCls[i] || ''}">${esc(p)}</span>`).join('')}</div>
  </div>
</div>
<div class="rod"><b>Júlia Quoos</b><span>${esc(o.url)}</span></div>
</body></html>`;
}

// diminui o título (e, se preciso, tira o resumo) até tudo caber na janela
async function desenhar(pagina, html, saida) {
  await pagina.setContent(html, { waitUntil: 'load' });
  await pagina.evaluate(async () => {
    await document.fonts.ready;
    const h1 = document.querySelector('h1'), txt = document.querySelector('.txt'), sub = document.querySelector('p.sub');
    const passa = () => txt.scrollHeight > txt.clientHeight + 1 || h1.scrollWidth > h1.clientWidth + 2;
    let t = 76;
    while (t > 44 && passa()) { t -= 2; h1.style.fontSize = t + 'px'; }
    if (passa() && sub) { sub.style.fontSize = '20px'; }
    while (passa() && sub && sub.textContent.length > 40) sub.textContent = sub.textContent.replace(/\s+\S+\s*…?$/, '') + '…';
    while (t > 30 && passa()) { t -= 2; h1.style.fontSize = t + 'px'; }
  });
  fs.mkdirSync(path.dirname(saida), { recursive: true });
  await pagina.screenshot({ path: saida, type: 'png' });
}

// troca (ou acrescenta) as etiquetas de compartilhamento no <head>
function etiquetar(html, rel, img, d) {
  const abs = SITE + '/' + img;
  const alt = d.titulo;
  const antiga = ogImagem(html);
  // os dados estruturados (JSON-LD) usam a mesma imagem
  if (antiga && antiga !== abs) html = html.split(`"image":"${antiga}"`).join(`"image":"${abs}"`);
  const tags = [
    ['property', 'og:image', abs], ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', alt], ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:image', abs]
  ];
  const novas = [];
  for (const [k, nome, valor] of tags) {
    const re = new RegExp(`<meta\\s+(?:property|name)="${nome.replace(/:/g, ':')}"\\s+content="[^"]*"\\s*/?>`, 'i');
    const tag = `<meta ${k}="${nome}" content="${esc(valor)}">`;
    if (re.test(html)) html = html.replace(re, tag); else novas.push(tag);
  }
  // título, resumo, endereço e tipo, se a página não tiver
  const titulo = attr(html, /<title>([^<]*)<\/title>/i);
  const desc = attr(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const faltam = [['og:type', 'website'], ['og:locale', 'pt_BR'], ['og:site_name', 'Júlia Quoos'], ['og:url', urlDe(rel)], ['og:title', titulo], ['og:description', desc]];
  for (const [nome, valor] of faltam) if (valor && !new RegExp(`property="${nome}"`, 'i').test(html)) novas.unshift(`<meta property="${nome}" content="${esc(valor)}">`);
  if (novas.length) {
    const ancora = html.match(/<meta\s+property="og:[^>]*>(?![\s\S]*<meta\s+property="og:)/i) || html.match(/<meta\s+name="description"[^>]*>/i) || html.match(/<\/title>/i);
    if (ancora) { const i = ancora.index + ancora[0].length; html = html.slice(0, i) + '\n' + novas.join('\n') + html.slice(i); }
    else html = html.replace(/<\/head>/i, novas.join('\n') + '\n</head>');
  }
  return html;
}

// PNG com paleta de 32 cores (as imagens só têm cores chapadas); sem o Pillow, fica o PNG original
function reduzirCores(arquivos) {
  const py = `import sys
from PIL import Image
for f in sys.stdin.read().split('\\n'):
    if f:
        Image.open(f).convert('RGB').quantize(colors=32, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).save(f, optimize=True)`;
  const r = require('child_process').spawnSync('python3', ['-c', py], { input: arquivos.join('\n'), stdio: ['pipe', 'inherit', 'inherit'] });
  if (r.status !== 0) console.warn('Não consegui reduzir as cores (falta o Pillow?): as imagens ficaram maiores.');
}

async function navegador() {
  try { return await require('playwright').chromium.launch(); } catch (e) { /* sem o pacote completo */ }
  return require('playwright-core').chromium.launch({ channel: 'chrome' });
}

async function main() {
  const tudo = process.argv.includes('--tudo'), conferir = process.argv.includes('--conferir');
  const lista = paginas().map(rel => ({ rel, html: fs.readFileSync(path.join(RAIZ, rel), 'utf8') }));
  const uso = {};
  for (const p of lista) { const i = ogImagem(p.html); if (i) uso[i] = (uso[i] || 0) + 1; }
  const indice = fs.existsSync(INDICE) ? JSON.parse(fs.readFileSync(INDICE, 'utf8')) : {};
  const novoIndice = {};
  const fila = [];
  let tocadas = 0;
  for (const p of lista) {
    const { rel, html } = p;
    if (MODELOS.has(rel) || /http-equiv="refresh"/i.test(html) || rel === '404.html' || !/<head[\s>]/i.test(html)) continue;
    const atual = ogImagem(html);
    const propria = atual && !atual.includes('/' + PASTA + '/') && uso[atual] < REPETIDA;
    if (propria) continue;
    const d = dadosDa(rel, html);
    let img = `${PASTA}/${rel.replace(/(^|\/)index\.html$/, '$1').replace(/\/$/, '').replace(/\.html$/, '') || 'inicio'}.png`;
    if (novoIndice[img] !== undefined) img = img.replace(/\.png$/, '-pagina.png'); // x.html e x/index.html
    const chave = crypto.createHash('sha1').update(JSON.stringify([VERSAO, d])).digest('hex').slice(0, 12);
    novoIndice[img] = chave;
    if (tudo || indice[img] !== chave || !fs.existsSync(path.join(RAIZ, img))) fila.push({ img, d });
    const novo = etiquetar(html, rel, img, d);
    if (novo !== html) { tocadas++; if (!conferir) fs.writeFileSync(path.join(RAIZ, rel), novo); }
  }
  console.log(`${Object.keys(novoIndice).length} páginas com miniatura própria; ${fila.length} imagens para desenhar; ${tocadas} páginas atualizadas.`);
  if (conferir) { fila.filter((f, i, a) => i === a.findIndex(g => g.img.split("/").slice(0, 4).join("/") === f.img.split("/").slice(0, 4).join("/"))).forEach(f => console.log(' ', f.img, '|', f.d.faixa, '|', f.d.titulo, '|', f.d.pills.join(', '))); return; }
  // imagens de páginas que sumiram
  for (const img of Object.keys(indice)) if (!novoIndice[img]) { fs.rmSync(path.join(RAIZ, img), { force: true }); console.log('apagada', img); }
  if (fila.length) {
    const browser = await navegador();
    try {
      const pag = await browser.newPage({ viewport: { width: 1200, height: 630 } });
      let n = 0;
      for (const f of fila) {
        await desenhar(pag, modelo(f.d), path.join(RAIZ, f.img));
        if (++n % 100 === 0) console.log(`  ${n}/${fila.length}`);
      }
    } finally { await browser.close(); }
    reduzirCores(fila.map(f => path.join(RAIZ, f.img)));
  }
  fs.mkdirSync(path.dirname(INDICE), { recursive: true });
  fs.writeFileSync(INDICE, JSON.stringify(Object.fromEntries(Object.entries(novoIndice).sort()), null, 0).replace(/,"/g, ',\n"') + '\n');
}
module.exports = { dadosDa, partes, modelo, desenhar };
if (require.main === module) main().catch(e => { console.error(e); process.exit(1); });
