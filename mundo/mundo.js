/* Mundo 3D do site: uma praça com ruas para seis bairros, e em cada bairro um prédio por página.
   Os prédios vêm dos dados que o resto do site já usa (RECURSOS em material-didatico/assets/dados.js,
   SIMULADORES em simuladores/assets/sim-comum.js e o feed do blog), então uma página nova aparece aqui
   sem mexer neste arquivo. A cena usa o lab3d do Laboratório 3D (three.js local, sem CDN). */
import { lab3d, COR } from '../material-didatico/assets/lab3d.js';

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const MD = '../material-didatico/';
const urlRec = r => (typeof recUrl === 'function' ? recUrl(r) : MD + r.url);
const anosTexto = anos => {
  if (!anos || !anos.length) return '';
  const a = [...anos].sort((x, y) => x - y);
  return a.length === 1 ? `${a[0]}º ano` : `${a[0]}º ao ${a[a.length - 1]}º ano`;
};

/* ---------- os lugares ---------- */
const REC = typeof RECURSOS !== 'undefined' ? RECURSOS : [];
const SIM = typeof SIMULADORES !== 'undefined' ? SIMULADORES : [];
const lugarRec = r => ({ titulo: r.titulo, url: urlRec(r), icone: r.icone || '📄', resumo: r.resumo || '',
  extra: [r.comp && r.comp.map(c => c === 'CO' ? 'Computação' : 'Matemática').join(' e '), anosTexto(r.anos), r.tempo ? `⏱ ${r.tempo}` : ''].filter(Boolean).join(' · ') });

const BAIRROS = [
  { id: 'jogos', nome: 'Jogos', icone: '🎮', parede: COR.amarelo, telhado: COR.vermelho, ang: 90,
    intro: 'Jogos de Computação e Matemática para jogar no navegador.',
    lugares: [{ titulo: 'Todos os jogos', url: '../jogos/', icone: '🎮', resumo: 'A lista completa dos jogos para estudantes, por ano e por habilidade da BNCC.', portal: true },
      ...REC.filter(r => r.tipo === 'jogo').map(lugarRec)] },
  { id: 'lab3d', nome: 'Laboratório 3D', icone: '🧊', parede: COR.verde, telhado: COR.verdeEscuro, ang: 30,
    intro: 'Recursos manipuláveis em 3D: gire, aproxime e experimente.',
    lugares: [{ titulo: 'Todo o Laboratório 3D', url: MD + 'catalogo.html?tipo=3d', icone: '🧊', resumo: 'O catálogo com todos os recursos 3D de Matemática e Computação.', portal: true },
      ...REC.filter(r => r.tipo === '3d').map(lugarRec)] },
  { id: 'simuladores', nome: 'Simuladores', icone: '🧪', parede: COR.vermelhoClaro, telhado: COR.vermelho, ang: -30,
    intro: 'IA, estatística e arquitetura de computadores para mexer sem instalar nada.',
    lugares: [{ titulo: 'Todos os simuladores', url: '../simuladores/', icone: '🧪', resumo: 'A página com todos os simuladores, do Fundamental ao Superior.', portal: true },
      ...SIM.map(s => ({ titulo: s.titulo, url: '../simuladores/' + s.url, icone: s.ia ? '🧠' : '🔬', resumo: s.resumo || '', sigla: s.sigla,
        extra: (s.niveis || []).map(n => (typeof NIVEIS !== 'undefined' && NIVEIS[n]) || n).join(' · ') }))] },
  { id: 'material', nome: 'Material didático', icone: '📚', parede: COR.verdeClaro, telhado: COR.verde, ang: -90,
    intro: 'Planos de aula, fichas, listas e a BNCC de Computação e Matemática, do 6º ao 9º ano.',
    lugares: [
      { titulo: 'Material didático', url: MD, icone: '📚', resumo: 'A porta de entrada: jogos, planos, fichas, listas e slides, organizados pela BNCC.', portal: true },
      { titulo: 'Planos de aula', url: MD + 'professor.html', icone: '🧑‍🏫', resumo: 'Planos prontos, com objetivos, etapas, avaliação e acessibilidade.' },
      { titulo: 'BNCC na prática', url: MD + 'bncc.html', icone: '📋', resumo: 'Habilidade por habilidade: o que ensinar e com qual material.' },
      { titulo: 'Computação', url: MD + 'computacao/', icone: '💻', resumo: 'As habilidades de Computação da BNCC, ano a ano, com o material de cada uma.' },
      { titulo: 'Matemática', url: MD + 'matematica/', icone: '📐', resumo: 'As habilidades de Matemática trabalhadas com jogos, 3D e fichas.' },
      { titulo: 'Catálogo', url: MD + 'catalogo.html', icone: '🗂️', resumo: 'Tudo num lugar só, com filtros por tipo, ano e habilidade.' },
      { titulo: 'Fichas para imprimir', url: MD + 'catalogo.html?tipo=ficha', icone: '✏️', resumo: 'Atividades no papel, com gabarito e orientações.' },
      { titulo: 'Listas de exercícios', url: MD + 'catalogo.html?tipo=lista', icone: '📝', resumo: 'Questões por habilidade, para resolver na tela ou imprimir.' },
      { titulo: 'Missões e progresso', url: MD + 'missoes.html', icone: '🏅', resumo: 'Missões do dia, níveis e o progresso de quem joga.' },
      { titulo: 'Criador de atividades', url: MD + 'criador.html', icone: '🪄', resumo: 'Monte a sua própria atividade a partir das habilidades.' }
    ] },
  { id: 'professores', nome: 'Para professores', icone: '🍎', parede: COR.amareloClaro, telhado: COR.verdeEscuro, ang: 150,
    intro: 'Guias, prompts, formação e mentoria para usar IA e tecnologia na escola.',
    lugares: [
      { titulo: 'IA pra Prof', url: '../ia-pra-prof/', icone: '🤖', resumo: 'Guia de inteligência artificial para professores: o que é, como usar e o que evitar.', portal: true },
      { titulo: 'Tech pra Prof', url: '../tech-pra-prof/', icone: '🧰', resumo: 'Quase 50 tecnologias e sites que facilitam a vida do professor, com filtros.' },
      { titulo: 'Prompts prontos', url: '../prompts-para-professores/', icone: '📋', resumo: 'Biblioteca de prompts de IA para planejar aulas, corrigir e criar atividades.' },
      { titulo: 'Formação continuada em IA', url: '../formacao-continuada/', icone: '🎓', resumo: 'Formação de professores em IA para escolas e redes de ensino.' },
      { titulo: 'Mentoria para professores', url: '../mentoria/', icone: '🤝', resumo: 'Acompanhamento individual para levar IA e Computação para a sua aula.' },
      { titulo: 'Quiz de pensamento computacional', url: '../quiz-pensamento-computacional/', icone: '🧩', resumo: '12 perguntas sobre decomposição, padrões, abstração e algoritmos.' },
      { titulo: 'Computador para crianças', url: '../computador-para-criancas/', icone: '🧒', resumo: 'Como escolher e preparar um computador para crianças.' },
      { titulo: 'Assistente do site', url: '../assistente/', icone: '💬', resumo: 'Pergunte sobre o material e a IA responde com base nas páginas do site.' }
    ] },
  { id: 'blog', nome: 'Blog', icone: '📰', parede: COR.papel, telhado: COR.amarelo, ang: -150,
    intro: 'Textos sobre IA na escola, BNCC de Computação e Matemática.',
    lugares: [
      { titulo: 'Blog', url: '../blog/', icone: '📰', resumo: 'Todos os textos, do mais novo ao mais antigo.', portal: true },
      { titulo: 'Quem é Júlia Quoos', url: '../curriculo/', icone: '👩‍💻', resumo: 'Currículo, projetos e a história de quem faz este site.' }
    ] }
];

/* O feed do blog vira um quiosque por texto (só funciona com o site servido por http; sem ele, ficam os fixos) */
async function postsDoBlog() {
  try {
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 4000);
    const r = await fetch('../blog/feed.xml', { signal: ctl.signal });
    if (!r.ok) return [];
    const doc = new DOMParser().parseFromString(await r.text(), 'application/xml');
    const itens = [...doc.querySelectorAll('item, entry')].slice(0, 12);
    return itens.map(it => {
      const t = it.querySelector('title')?.textContent?.trim() || '';
      const linkEl = it.querySelector('link');
      const link = (linkEl?.getAttribute('href') || linkEl?.textContent || '').trim();
      const d = (it.querySelector('description, summary, content')?.textContent || '').replace(/<[^>]+>/g, '').trim();
      return t && link ? { titulo: t, url: link, icone: '📄', resumo: d.length > 180 ? d.slice(0, 177) + '…' : d } : null;
    }).filter(Boolean);
  } catch (e) { return []; }
}

/* ---------- a cena ---------- */
const palco = $('#palco');
const cena = lab3d(palco, { cam: [0, 9, 13], alvo: [0, 0.8, 0], min: 5, max: 30, polarMax: Math.PI * 0.46, chaoTam: 220, fov: 42 });
const T = cena && cena.THREE;
const PASSO = 3.4;                 // distância entre prédios
const PRACA = 6;                   // raio da praça
const lugares = [];                // todos os prédios, com posição no mundo
const colisoes = [];               // círculos que o personagem não atravessa: {x, z, r}
let avatar, pernas, totemTopo, chaoMesh;

const rad = g => g * Math.PI / 180;
const grau = x => (x % 360 + 360) % 360;

function predio(l, b, x, z, ang) {
  const g = new T.Group();
  const port = l.portal;
  const w = port ? 2.8 : 2.1, d = port ? 2.6 : 2.1;
  const h = port ? 2.8 : 1.5 + ((l.titulo.length * 7) % 10) / 10;   // alturas variadas, mas sempre as mesmas
  const corpo = cena.bloco(w, h, d, b.parede, { base: false });
  corpo.position.y = h / 2;
  g.add(corpo);
  // telhado: uma laje para os prédios comuns, uma pirâmide para o portal de cada bairro
  if (port) {
    const t = cena.cilindro(Math.hypot(w, d) / 2 + 0.1, 1.3, b.telhado, { rTopo: 0, seg: 4 });
    t.rotation.y = Math.PI / 4; t.position.y = h; g.add(t);
  } else {
    const t = cena.bloco(w + 0.3, 0.22, d + 0.3, b.telhado, { base: false });
    t.position.y = h + 0.11; g.add(t);
  }
  // porta, de frente para a rua
  const porta = cena.bloco(0.6, 1, 0.08, COR.tinta, { base: false, bordas: false, sombra: false });
  porta.position.set(0, 0.5, -d / 2 - 0.02); g.add(porta);
  if (l.sigla) {
    const s = cena.rotulo(l.sigla, { tam: 0.45, fundo: COR.papel, depthTest: true });
    s.position.set(0, h - 0.4, -d / 2 - 0.1); g.add(s);
  }
  g.position.set(x, 0, z);
  g.rotation.y = ang;
  g.userData.lugar = l;
  cena.add(g);
  const frente = new T.Vector3(0, 0, -1).applyAxisAngle(new T.Vector3(0, 1, 0), ang);
  const entrada = { x: x + frente.x * (d / 2 + 1.1), z: z + frente.z * (d / 2 + 1.1) };
  Object.assign(l, { bairro: b, x, z, h, grupo: g, entrada, raio: Math.hypot(w, d) / 2 });
  colisoes.push({ x, z, r: Math.max(w, d) / 2 + 0.15 });
  cena.clicavel(g, () => irPara(entrada, l));
  lugares.push(l);
}

/* Cada bairro é uma grade de prédios de frente para a rua que vem da praça */
function bairro(b) {
  const a = rad(b.ang), dir = { x: Math.cos(a), z: -Math.sin(a) }, perp = { x: -dir.z, z: dir.x };
  const entrada = ENTRADA;                              // onde a rua chega ao bairro
  b.centro = { x: dir.x * entrada, z: dir.z * entrada };
  b.dir = dir; b.perp = perp; b.n = 0;
  // placa do bairro, na chegada da rua
  const poste = cena.cilindro(0.08, 2.6, COR.cinzaEscuro, { bordas: false });
  poste.position.set(dir.x * (entrada - 2.2) + perp.x * 1.8, 0, dir.z * (entrada - 2.2) + perp.z * 1.8);
  cena.add(poste);
  const placa = cena.rotulo(`${b.icone} ${b.nome}`, { tam: 1.1, fundo: b.parede, depthTest: false });
  placa.position.set(poste.position.x, 3, poste.position.z);
  cena.add(placa);
  // rua da praça até o bairro
  const rua = cena.bloco(2.6, 0.03, entrada - PRACA + 1, COR.cinza, { base: false, bordas: false, sombra: false });
  rua.position.set(dir.x * (PRACA + (entrada - PRACA) / 2), 0.015, dir.z * (PRACA + (entrada - PRACA) / 2));
  rua.rotation.y = a; cena.add(rua);
  b.lugares.forEach(l => adiciona(b, l));
}
/* Os bairros são fatias de 60°: cada fileira só pode ser tão larga quanto cabe na fatia àquela distância
   da praça, então as fileiras de trás são mais largas (um leque) e bairros vizinhos não se encostam. */
const ENTRADA = PRACA + 9;
const FUNDO0 = 1.5;
const cabem = lin => Math.min(9, Math.floor(2 * ((ENTRADA + FUNDO0 + lin * PASSO) * 0.5 - 1.7) / PASSO) + 1);
function adiciona(b, l) {
  let i = b.n++, lin = 0;
  while (i >= cabem(lin)) { i -= cabem(lin); lin++; }
  const cols = cabem(lin);
  const lateral = (i - (cols - 1) / 2) * PASSO;
  const fundo = FUNDO0 + lin * PASSO;
  const x = b.centro.x + b.perp.x * lateral + b.dir.x * fundo;
  const z = b.centro.z + b.perp.z * lateral + b.dir.z * fundo;
  // a porta olha para a praça: o prédio gira junto com a rua
  predio(l, b, x, z, Math.atan2(b.dir.x, b.dir.z));
}

function praca() {
  const piso = cena.cilindro(PRACA, 0.04, COR.cinza, { seg: 48, bordas: false });
  piso.receiveShadow = true; cena.add(piso);
  const base = cena.cilindro(1.1, 0.5, COR.cinzaEscuro, { seg: 8 }); cena.add(base);
  const coluna = cena.bloco(0.7, 2.4, 0.7, COR.papel, { base: false }); coluna.position.y = 0.5 + 1.2; cena.add(coluna);
  totemTopo = new T.Group();
  [[COR.verde, -0.55], [COR.amarelo, 0], [COR.vermelho, 0.55]].forEach(([c, dx]) => {
    const cubo = cena.bloco(0.5, 0.5, 0.5, c, { base: false }); cubo.position.set(dx, 0, 0); totemTopo.add(cubo);
  });
  totemTopo.position.y = 3.4; cena.add(totemTopo);
  const nome = cena.rotulo('ohtopico.com.br', { tam: 1, fundo: COR.papel, depthTest: false });
  nome.position.y = 4.6; cena.add(nome);
  colisoes.push({ x: 0, z: 0, r: 1.4 });
  // bancos e árvores em volta da praça
  for (let i = 0; i < 12; i++) {
    const a = rad(i * 30 + 15);
    if (BAIRROS.some(b => Math.abs(grau(b.ang - i * 30 - 15)) < 20 || Math.abs(grau(b.ang - i * 30 - 15)) > 340)) continue;
    arvore(Math.cos(a) * (PRACA + 1.6), -Math.sin(a) * (PRACA + 1.6), 0.9 + (i % 3) * 0.15);
  }
}
function arvore(x, z, esc = 1) {
  const g = new T.Group();
  const tronco = cena.cilindro(0.14, 0.7, COR.cinzaEscuro, { bordas: false, seg: 8 }); g.add(tronco);
  const copa = cena.cilindro(0.75, 1.5, COR.verde, { rTopo: 0, seg: 8 }); copa.position.y = 0.6; g.add(copa);
  g.position.set(x, 0, z); g.scale.setScalar(esc); cena.add(g);
  colisoes.push({ x, z, r: 0.35 * esc });
}
function arvoresSoltas() {
  // árvores espalhadas, longe das ruas e dos prédios (sorteio fixo, para o mundo ser sempre igual)
  let s = 7;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 70; i++) {
    const a = rnd() * Math.PI * 2, r = PRACA + 2 + rnd() * 34;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    const pertoRua = BAIRROS.some(b => { const d = x * b.dir.x + z * b.dir.z; return d > 0 && d < PRACA + 10 && Math.abs(x * b.perp.x + z * b.perp.z) < 2.6; });
    if (pertoRua || colisoes.some(c => Math.hypot(c.x - x, c.z - z) < c.r + 2.2)) continue;
    arvore(x, z, 0.8 + rnd() * 0.7);
  }
}

function personagem() {
  avatar = new T.Group();
  pernas = new T.Group();
  [-0.14, 0.14].forEach(dx => { const p = cena.cilindro(0.1, 0.35, COR.cinzaEscuro, { bordas: false, seg: 10 }); p.position.x = dx; pernas.add(p); });
  avatar.add(pernas);
  const corpo = cena.cilindro(0.32, 0.6, COR.verde, { seg: 16 }); corpo.position.y = 0.35; avatar.add(corpo);
  const cabeca = new T.Mesh(new T.SphereGeometry(0.3, 20, 14), cena.material(COR.amareloClaro));
  cabeca.castShadow = true; cabeca.position.y = 1.25; avatar.add(cabeca);
  [-0.11, 0.11].forEach(dx => {
    const olho = new T.Mesh(new T.SphereGeometry(0.045, 8, 6), cena.material(COR.tinta)); olho.position.set(dx, 1.3, -0.26); avatar.add(olho);
  });
  const bone = cena.cilindro(0.2, 0.18, COR.vermelho, { seg: 12 }); bone.position.y = 1.45; avatar.add(bone);
  avatar.position.set(2.4, 0, PRACA - 3);
  cena.add(avatar);
}

/* ---------- movimento ---------- */
const teclas = new Set();
const joy = { x: 0, z: 0, ativo: false };
let alvoCaminho = null, lugarAlvo = null, ultimo = 0, perto = null, giroTeclado = 0;
const VEL = 5.2;

function direcaoCamera() {
  const f = new T.Vector3(); cena.camera.getWorldDirection(f); f.y = 0; f.normalize();
  const r = new T.Vector3(f.z, 0, -f.x);
  return { f, r };
}
function passo(now) {
  const dt = Math.min(0.1, (now - (ultimo || now)) / 1000); ultimo = now;
  const { f, r } = direcaoCamera();
  const v = new T.Vector3();
  if (teclas.has('ArrowUp') || teclas.has('w')) v.add(f);
  if (teclas.has('ArrowDown') || teclas.has('s')) v.sub(f);
  if (teclas.has('ArrowLeft') || teclas.has('a')) v.sub(r);
  if (teclas.has('ArrowRight') || teclas.has('d')) v.add(r);
  if (joy.ativo) { v.addScaledVector(f, -joy.z); v.addScaledVector(r, joy.x); }
  if (giroTeclado) cena.girar(giroTeclado * dt * 1.6, 0);
  if (v.lengthSq() > 0) { alvoCaminho = null; lugarAlvo = null; }
  else if (alvoCaminho) {
    v.set(alvoCaminho.x - avatar.position.x, 0, alvoCaminho.z - avatar.position.z);
    if (v.length() < 0.15) { alvoCaminho = null; v.set(0, 0, 0); if (lugarAlvo) { mostrar(lugarAlvo); lugarAlvo = null; } }
  }
  let andou = false;
  if (v.lengthSq() > 0) {
    if (v.length() > 1) v.normalize();
    const p = avatar.position.clone().addScaledVector(v, VEL * dt);
    // não atravessa prédios nem árvores, e não sai do mundo
    for (const c of colisoes) {
      const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz), min = c.r + 0.38;
      if (d < min && d > 0) { p.x = c.x + dx / d * min; p.z = c.z + dz / d * min; }
    }
    const L = Math.hypot(p.x, p.z); if (L > 48) { p.x *= 48 / L; p.z *= 48 / L; }
    const delta = p.clone().sub(avatar.position);
    if (delta.lengthSq() > 1e-6) {
      avatar.position.copy(p);
      avatar.rotation.y = Math.atan2(-delta.x, -delta.z);
      cena.camera.position.add(delta);
      cena.controls.target.add(delta);
      andou = true;
    }
    pernas.rotation.x = Math.sin(now / 70) * 0.5;
    totemTopo.rotation.y += dt * 1.5;
  } else pernas.rotation.x = 0;
  cena.sol.position.set(avatar.position.x + 8, 14, avatar.position.z + 6);
  cena.sol.target.position.copy(avatar.position); cena.sol.target.updateMatrixWorld();
  if (andou) { atualizaPerto(); minimapa(); }
  return andou || v.lengthSq() > 0 || joy.ativo || !!giroTeclado;
}

function irPara(p, l) { alvoCaminho = { x: p.x, z: p.z }; lugarAlvo = l || null; cena.pedeQuadro(); }

/* ---------- placa do lugar mais perto ---------- */
function bairroDe(p) {
  const L = Math.hypot(p.x, p.z);
  if (L < PRACA + 1) return null;
  const a = grau(Math.atan2(-p.z, p.x) * 180 / Math.PI);
  return BAIRROS.reduce((m, b) => { const d = Math.min(Math.abs(grau(b.ang - a)), 360 - Math.abs(grau(b.ang - a))); return !m || d < m.d ? { b, d } : m; }, null).b;
}
function atualizaPerto() {
  let melhor = null, dm = 2.6;
  for (const l of lugares) {
    const d = Math.hypot(l.x - avatar.position.x, l.z - avatar.position.z) - l.raio;
    if (d < dm) { dm = d; melhor = l; }
  }
  for (const l of lugares) {
    const d = Math.hypot(l.x - avatar.position.x, l.z - avatar.position.z);
    if (l.etiqueta) l.etiqueta.visible = d < 8 || l.portal;
    else if (d < 8 || l.portal) {
      l.etiqueta = cena.rotulo(`${l.icone} ${l.titulo}`, { tam: l.portal ? 0.9 : 0.62, depthTest: false });
      l.etiqueta.position.set(0, l.h + (l.portal ? 2 : 0.8), 0); l.grupo.add(l.etiqueta);
    }
  }
  if (melhor !== perto) {
    if (perto) cena.animar(perto.grupo, { scale: [1, 1, 1] }, 200);
    perto = melhor;
    if (perto) { cena.animar(perto.grupo, { scale: [1.07, 1.07, 1.07] }, 200); mostrar(perto); }
    else mostrarBairro(bairroDe(avatar.position));
  }
  const b = bairroDe(avatar.position);
  cena.descrever(`Mundo 3D do site. Você está ${b ? 'no bairro ' + b.nome : 'na praça central'}${perto ? ', em frente a ' + perto.titulo : ''}. Use as setas para andar.`);
}
function mostrar(l) {
  $('#lugar-bairro').textContent = `${l.bairro.icone} ${l.bairro.nome}` + (l.extra ? ' · ' + l.extra : '');
  $('#lugar-titulo').innerHTML = `<span class="ic" aria-hidden="true">${esc(l.icone)}</span>${esc(l.titulo)}`;
  $('#lugar-resumo').textContent = l.resumo || '';
  const a = $('#lugar-abrir'); a.href = l.url; a.hidden = false; a.textContent = l.portal ? 'Entrar' : 'Abrir';
  $('#fb').textContent = `Enter abre “${l.titulo}”.`;
}
function mostrarBairro(b) {
  $('#lugar-bairro').textContent = b ? `${b.icone} Bairro` : 'Praça central';
  $('#lugar-titulo').textContent = b ? b.nome : 'Bem-vindo ao mundo';
  $('#lugar-resumo').textContent = b ? `${b.intro} Chegue perto de um prédio para ver a placa dele.` : 'Siga por uma das ruas até um bairro. Perto de cada prédio, a placa dele aparece aqui, com o botão para abrir a página.';
  $('#lugar-abrir').hidden = true;
  $('#fb').textContent = '';
}

/* ---------- minimapa ---------- */
const mcv = $('#mini-cv'), mctx = mcv.getContext('2d');
const ESCALA = 150 / 100;   // 100 unidades do mundo cabem no minimapa
function minimapa() {
  const c = 75;
  mctx.clearRect(0, 0, 150, 150);
  mctx.fillStyle = COR.cinza; mctx.beginPath(); mctx.arc(c, c, PRACA * ESCALA, 0, Math.PI * 2); mctx.fill();
  for (const b of BAIRROS) {
    mctx.strokeStyle = COR.cinza; mctx.lineWidth = 3; mctx.beginPath(); mctx.moveTo(c, c); mctx.lineTo(c + b.centro.x * ESCALA, c + b.centro.z * ESCALA); mctx.stroke();
  }
  for (const l of lugares) {
    mctx.fillStyle = l.bairro.parede; mctx.strokeStyle = COR.tinta; mctx.lineWidth = 0.6;
    mctx.beginPath(); mctx.rect(c + l.x * ESCALA - 2, c + l.z * ESCALA - 2, 4, 4); mctx.fill(); mctx.stroke();
  }
  const { f } = direcaoCamera();
  const ax = c + avatar.position.x * ESCALA, az = c + avatar.position.z * ESCALA;
  mctx.strokeStyle = COR.vermelho; mctx.lineWidth = 2; mctx.beginPath(); mctx.moveTo(ax, az); mctx.lineTo(ax + f.x * 9, az + f.z * 9); mctx.stroke();
  mctx.fillStyle = COR.vermelho; mctx.beginPath(); mctx.arc(ax, az, 3.5, 0, Math.PI * 2); mctx.fill();
}
mcv.addEventListener('click', ev => {
  const r = mcv.getBoundingClientRect();
  const x = ((ev.clientX - r.left) / r.width * 150 - 75) / ESCALA, z = ((ev.clientY - r.top) / r.height * 150 - 75) / ESCALA;
  irPara({ x, z });
});

/* ---------- controles ---------- */
const MOV = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'q', 'e'];
const emCampo = el => el && /^(INPUT|SELECT|TEXTAREA|BUTTON|A)$/.test(el.tagName);
document.addEventListener('keydown', ev => {
  if (!cena || emCampo(ev.target) || ev.ctrlKey || ev.metaKey || ev.altKey) return;
  const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
  if (MOV.includes(k)) {
    // as setas andam (e não giram a câmera, como nos outros laboratórios)
    ev.preventDefault(); ev.stopImmediatePropagation();
    if (k === 'q' || k === 'e') giroTeclado = k === 'q' ? 1 : -1; else teclas.add(k);
    cena.pedeQuadro();
  } else if (ev.key === 'Enter' && perto) { ev.preventDefault(); location.href = perto.url; }
}, true);
document.addEventListener('keyup', ev => {
  const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
  if (k === 'q' || k === 'e') giroTeclado = 0; else teclas.delete(k);
});
window.addEventListener('blur', () => { teclas.clear(); giroTeclado = 0; });

// direcional de toque
const joyEl = $('#joy'), nub = $('#joy-nub');
let joyId = null;
joyEl.addEventListener('pointerdown', ev => { joyId = ev.pointerId; joyEl.setPointerCapture(joyId); moveJoy(ev); });
joyEl.addEventListener('pointermove', ev => { if (ev.pointerId === joyId) moveJoy(ev); });
const soltaJoy = ev => { if (ev.pointerId !== joyId) return; joyId = null; joy.ativo = false; joy.x = joy.z = 0; nub.style.transform = ''; };
joyEl.addEventListener('pointerup', soltaJoy); joyEl.addEventListener('pointercancel', soltaJoy);
function moveJoy(ev) {
  const r = joyEl.getBoundingClientRect();
  let dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
  const L = Math.hypot(dx, dy), max = r.width / 2 - 12;
  if (L > max) { dx *= max / L; dy *= max / L; }
  nub.style.transform = `translate(${dx}px, ${dy}px)`;
  joy.x = dx / max; joy.z = dy / max; joy.ativo = true;
  cena.pedeQuadro();
}

$('#girar-esq').onclick = () => cena.girar(0.35, 0);
$('#girar-dir').onclick = () => cena.girar(-0.35, 0);
$('#aproximar').onclick = () => cena.zoom(0.8);
$('#afastar').onclick = () => cena.zoom(1.25);
$('#praca').onclick = () => teleporte({ x: 2.4, z: PRACA - 3 }, null);

function teleporte(p, b) {
  const delta = new T.Vector3(p.x - avatar.position.x, 0, p.z - avatar.position.z);
  avatar.position.x = p.x; avatar.position.z = p.z;
  cena.camera.position.add(delta); cena.controls.target.add(delta);
  if (b) {
    // câmera atrás do personagem, olhando para o bairro
    const d = cena.camera.position.distanceTo(cena.controls.target);
    cena.camera.position.set(p.x - b.dir.x * d * 0.75, cena.controls.target.y + d * 0.65, p.z - b.dir.z * d * 0.75);
    avatar.rotation.y = Math.atan2(-b.dir.x, -b.dir.z);
  }
  alvoCaminho = null; cena.controls.update(); atualizaPerto(); minimapa(); cena.pedeQuadro();
}

/* ---------- lista em texto e menu "Ir para" ---------- */
function listas() {
  $('#mapa-listas').innerHTML = BAIRROS.map(b => `<h3 id="bairro-${b.id}">${esc(b.icone)} ${esc(b.nome)}</h3><p class="small muted" style="margin:0 0 8px">${esc(b.intro)}</p><ul>${
    b.lugares.map(l => `<li><span class="ic" aria-hidden="true">${esc(l.icone)}</span><a href="${esc(l.url)}">${esc(l.titulo)}</a></li>`).join('')}</ul>`).join('');
  $('#contagem').textContent = `${lugares.length} lugares em ${BAIRROS.length} bairros.`;
}
const sel = $('#ir');
sel.innerHTML += BAIRROS.map(b => `<option value="${b.id}">${esc(b.icone)} ${esc(b.nome)} (${b.lugares.length})</option>`).join('');
sel.addEventListener('change', () => {
  const b = BAIRROS.find(x => x.id === sel.value); if (!b || !cena) return;
  teleporte({ x: b.centro.x - b.dir.x * 1.5, z: b.centro.z - b.dir.z * 1.5 }, b);
  sel.value = '';
});

/* ---------- tema (névoa da cor do papel) e montagem ---------- */
function tema() {
  const cor = getComputedStyle(document.documentElement).getPropertyValue('--paper-2').trim() || '#f4f4f2';
  cena.scene.fog = new T.Fog(new T.Color(cor), 26, 70);
  chaoMesh.material.color.set(cor);
  cena.pedeQuadro();
}

if (cena) {
  chaoMesh = new T.Mesh(new T.CircleGeometry(80, 64), cena.material('#f4f4f2', { roughness: 1 }));
  chaoMesh.rotation.x = -Math.PI / 2; chaoMesh.position.y = -0.02; chaoMesh.receiveShadow = true;
  cena.add(chaoMesh);
  cena.clicavel(chaoMesh, (ob, ponto) => irPara({ x: ponto.x, z: ponto.z }));
  cena.scene.add(cena.sol.target);
  praca();
  BAIRROS.forEach(bairro);
  arvoresSoltas();
  personagem();
  listas();
  tema();
  new MutationObserver(tema).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.matchMedia && matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', tema);
  atualizaPerto(); minimapa();
  cena.loop(passo);
  // os textos do blog chegam depois, pelo feed
  postsDoBlog().then(posts => {
    if (!posts.length) return;
    const b = BAIRROS.find(x => x.id === 'blog');
    posts.forEach(p => { b.lugares.push(p); adiciona(b, p); });
    listas(); minimapa(); cena.pedeQuadro();
    sel.querySelector('[value="blog"]').textContent = `${b.icone} ${b.nome} (${b.lugares.length})`;
  });
} else {
  listas();
  $('#lugar-resumo').textContent = 'Este navegador não abriu a cena 3D, mas todos os lugares estão na lista abaixo.';
}
