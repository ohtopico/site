/* Gera o README.md do repositório: um índice de aulas com links diretos para o site.
   Lê os mesmos dados que o site usa (material-didatico/assets/dados.js, listas.js e slides.js),
   então basta rodar de novo depois de incluir materiais novos:

     node _fonte/readme/gerar.js            reescreve o README.md
     node _fonte/readme/gerar.js --conferir  também confere se cada link responde no site no ar

   A GitHub Action "Publicar posts agendados" roda este script a cada push no main. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.resolve(__dirname, '..', '..');
const SITE = 'https://ohtopico.com.br';
const MD = `${SITE}/material-didatico/`;

/* ---------- dados do site ---------- */
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['dados.js', 'listas.js', 'slides.js']) {
  vm.runInContext(fs.readFileSync(path.join(RAIZ, 'material-didatico/assets', f), 'utf8'), ctx);
}
vm.runInContext('this.D = { HABILIDADES, RECURSOS, EIXOS };', ctx);
// listas.js já registra cada lista de exercícios em RECURSOS (tipo 'lista')
const { HABILIDADES, RECURSOS, EIXOS } = ctx.D;
const SLIDES = ctx.window.SLIDES;

const HAB = Object.fromEntries(HABILIDADES.map(h => [h.codigo, h]));
const url = rel => MD + rel;
const slidesUrl = c => url(`slides/bncc-${c.toLowerCase()}-slides.pdf`);
const esc = s => String(s).replace(/\|/g, '\\|');
const link = (t, u) => `[${esc(t)}](${u})`;
const NOME_TIPO = { jogo: 'Jogo', '3d': 'Recurso 3D', ficha: 'Ficha', lista: 'Lista' };
const ORDEM_TIPO = ['jogo', '3d', 'ficha', 'lista'];
const extra = (tipo, t, u) => ({ tipo, html: `${NOME_TIPO[tipo]}: ${link(t, u)}` });
const juntar = itens => itens
  .filter((i, n) => itens.findIndex(j => j.html === i.html) === n)
  .sort((a, b) => ORDEM_TIPO.indexOf(a.tipo) - ORDEM_TIPO.indexOf(b.tipo))
  .map(i => i.html).join('<br>') || '-';

/* ---------- Computação: uma linha por habilidade ---------- */
const temHab = (r, c) => (r.habs || []).includes(c);
const revisao = r => r.tipo === 'lista' && /-revisao$/.test(r.id);
function linhaCO(h) {
  const c = h.codigo;
  const planos = RECURSOS.filter(r => r.tipo === 'plano' && temHab(r, c));
  const extras = RECURSOS.filter(r => r.tipo !== 'plano' && !revisao(r) && temHab(r, c))
    .map(r => extra(r.tipo, r.titulo, url(r.url)));
  return [
    SLIDES[c] ? esc(SLIDES[c]) : '-',
    esc(h.objeto),
    `**${c}** ${esc(h.texto)}`,
    planos.map(p => link(p.titulo, url(p.url))).join('<br>') || '-',
    SLIDES[c] ? link('PDF', slidesUrl(c)) : '-',
    juntar(extras)
  ];
}

/* ---------- Matemática: uma linha por plano de aula das oficinas ---------- */
function linhaMA(p) {
  const sufixo = p.id.replace(/^p-ma-/, '');
  const ligados = RECURSOS.filter(r => r.tipo !== 'plano' && r.plano === p.id);
  const ids3d = new Set(ligados.map(r => r.jogo).filter(Boolean));
  const extras = ligados
    .concat(RECURSOS.filter(r => ids3d.has(r.id) || r.id === `l-ma-${sufixo}`))
    .map(r => extra(r.tipo, r.titulo, url(r.url)));
  return [
    esc(p.titulo),
    p.anos.map(a => `${a}º`).join(', '),
    p.habs.map(c => HAB[c] ? `**${c}**` : c).join(', '),
    link('Plano de aula', url(p.url)),
    juntar(extras)
  ];
}

const tabela = (cab, linhas) => [
  `| ${cab.join(' | ')} |`,
  `| ${cab.map(() => '---').join(' | ')} |`,
  ...linhas.map(l => `| ${l.join(' | ')} |`)
].join('\n');

const co = HABILIDADES.filter(h => h.codigo.includes('CO') && h.ano >= 6);
const anos = [...new Set(co.map(h => h.ano))];
const planosMA = RECURSOS.filter(r => r.tipo === 'plano' && r.id.startsWith('p-ma-'));

const secoesCO = anos.map(a => {
  const rev = RECURSOS.find(r => revisao(r) && r.anos.includes(a) && r.comp.includes('CO'));
  return `### ${a}º ano\n\n` + tabela(
    ['Aula', 'Tema', 'Habilidade da BNCC', 'Plano de aula', 'Slides', 'Material extra'],
    co.filter(h => h.ano === a).map(linhaCO)) +
    (rev ? `\n\nPara fechar o ano: ${link(`lista de revisão do ${a}º ano`, url(rev.url))}.` : '');
}).join('\n\n');

const readme = `# Material didático de Computação e Matemática

Índice das aulas publicadas em **[ohtopico.com.br](${SITE})**, o site de Júlia Roberta Quoos Alves, professora de Computação no Rio Grande do Sul. Cada linha leva direto ao plano de aula, aos slides em PDF e aos materiais extras (jogos, fichas para imprimir, listas de exercícios e recursos 3D). Todo o material é gratuito.

- [Material didático completo](${MD})
- [Computação na BNCC (6º ao 9º ano)](${MD}computacao/)
- [Matemática](${MD}matematica/)
- [Área do professor](${MD}professor.html)
- [Catálogo de todos os materiais](${MD}catalogo.html)
- [Formação continuada de professores em IA](${SITE}/formacao-continuada/)

## Sumário

- [Computação: ${co.length} habilidades da BNCC, 6º ao 9º ano](#computação-bncc-6º-ao-9º-ano)
${anos.map(a => `  - [${a}º ano](#${a}º-ano)`).join('\n')}
- [Matemática: oficinas com metodologias ativas](#matemática-oficinas-com-metodologias-ativas)

## Computação (BNCC, 6º ao 9º ano)

Uma aula expositiva de 30 minutos para cada uma das ${co.length} habilidades de Computação dos anos finais do Ensino Fundamental, com slides prontos e roteiro para o professor. Os eixos são ${Object.values(EIXOS).filter(e => e.comp === 'CO').map(e => e.nome.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' e $1')}.

${secoesCO}

## Matemática: oficinas com metodologias ativas

Planos de aula com rotação por estações, jogos, atividades desplugadas, recursos 3D manipuláveis no navegador e listas com situações-problema da vida real.

${tabela(['Tema', 'Anos', 'Habilidades da BNCC', 'Plano de aula', 'Material extra'], planosMA.map(linhaMA))}

## Sobre

Materiais criados por Júlia Roberta Quoos Alves. Mentoria individual e formação continuada para professores: [ohtopico.com.br/mentoria](${SITE}/mentoria/).

Este README é gerado por \`_fonte/readme/gerar.js\` a partir dos dados do site. Para atualizar, rode \`node _fonte/readme/gerar.js\`.
`;

fs.writeFileSync(path.join(RAIZ, 'README.md'), readme);
const links = [...new Set([...readme.matchAll(/\]\((https:[^)\s]+)\)/g)].map(m => m[1]))];
console.log(`README.md gerado: ${co.length} habilidades de Computação, ${planosMA.length} planos de Matemática, ${links.length} links.`);

/* ---------- conferência dos links ---------- */
/* Sempre confere, sem internet, que cada link aponta para um arquivo do repositório e que os
   ids das páginas montadas no navegador (plano.html?id=..., ficha, lista) existem nos dados.
   Com --conferir, também pede cada link ao site no ar (usa o curl, que vem no Linux, no macOS
   e no Windows 10+). */
function arquivoDoLink(u) {
  let p = decodeURIComponent(new URL(u).pathname).replace(/^\//, '');
  if (p === '' || p.endsWith('/')) p += 'index.html';
  return path.join(RAIZ, p);
}
const ids = new Set(RECURSOS.map(r => r.id));
const falhas = [];
for (const u of links) {
  const id = new URL(u).searchParams.get('id');
  if (!fs.existsSync(arquivoDoLink(u))) falhas.push(`${u} (arquivo não existe no repositório)`);
  else if (id && !ids.has(id)) falhas.push(`${u} (id não existe nos dados do site)`);
}
if (process.argv.includes('--conferir')) {
  const { spawnSync } = require('child_process');
  const nulo = process.platform === 'win32' ? 'NUL' : '/dev/null';
  for (const u of links) {
    const r = spawnSync('curl', ['-s', '-o', nulo, '-L', '--max-time', '30', '-w', '%{http_code}', u], { encoding: 'utf8' });
    if (r.stdout !== '200') falhas.push(`${u} (site respondeu ${r.stdout || 'sem resposta'})`);
  }
}
if (falhas.length) {
  console.error(`Links com problema (${falhas.length}):\n` + falhas.join('\n'));
  process.exit(1);
}
console.log(`Todos os ${links.length} links conferidos${process.argv.includes('--conferir') ? ' no repositório e no site' : ' no repositório'}.`);
