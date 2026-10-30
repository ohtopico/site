/* Mundo do site: um jogo 2D de vila, visto de cima, em que cada casa é uma página do site.
   As fases, as casas, as perguntas e os personagens vêm dos dados que o resto do site já usa:
   RECURSOS (dados.js), LISTAS (listas.js), SIMULADORES (sim-comum.js) e o progresso do MDP
   (progresso.js), então um jogo novo no material vira uma casa nova sem mexer aqui.
   As missões "jogar" se cumprem de verdade: a casa só fica pronta quando o jogo registra
   progresso no Meu progresso (MDP.registrar), que é o mesmo que a página do jogo usa. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MD = '../material-didatico/';
  const REC_ = typeof RECURSOS !== 'undefined' ? RECURSOS : [];
  const EST = typeof ESTATICAS !== 'undefined' ? ESTATICAS : {};
  const SIM = typeof SIMULADORES !== 'undefined' ? SIMULADORES : [];
  const LST = typeof LISTAS !== 'undefined' ? LISTAS : [];
  const urlRec = r => MD + (EST[r.id] || r.url);
  const anoDe = r => Math.min(...(r.anos || [6]));

  /* ---------- sorteio fixo: o mundo é sempre igual ---------- */
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  /* ---------- fases ---------- */
  const jogaveis = REC_.filter(r => (r.tipo === 'jogo' || r.tipo === '3d') && r.url);
  const lugarRec = r => ({ id: r.id, titulo: r.titulo, url: urlRec(r), icone: r.icone || '🎮', resumo: r.resumo || '', tipo: r.tipo, rec: r,
    extra: [r.comp && r.comp.map(c => c === 'CO' ? 'Computação' : 'Matemática').join(' e '), r.tempo ? '⏱ ' + r.tempo : ''].filter(Boolean).join(' · ') });
  const PROF = [
    { id: 'pg-ia', titulo: 'IA pra Prof', url: '../ia-pra-prof/', icone: '🤖', resumo: 'O guia de inteligência artificial para professores: o que é, como usar em aula e o que evitar.' },
    { id: 'pg-tech', titulo: 'Tech pra Prof', url: '../tech-pra-prof/', icone: '🧰', resumo: 'Quase 50 tecnologias e sites que facilitam a vida do professor, com filtros.' },
    { id: 'pg-prompts', titulo: 'Prompts prontos', url: '../prompts-para-professores/', icone: '📋', resumo: 'Biblioteca de prompts de IA para planejar aulas, corrigir e criar atividades.' },
    { id: 'pg-material', titulo: 'Material didático', url: MD, icone: '📚', resumo: 'Planos de aula, fichas, listas e slides organizados pela BNCC de Computação e Matemática.' },
    { id: 'pg-bncc', titulo: 'BNCC na prática', url: MD + 'bncc.html', icone: '📐', resumo: 'Habilidade por habilidade: o que ensinar e com qual material.' },
    { id: 'pg-planos', titulo: 'Planos de aula', url: MD + 'professor.html', icone: '🧑‍🏫', resumo: 'Planos prontos, com objetivos, etapas, avaliação e acessibilidade.' },
    { id: 'pg-formacao', titulo: 'Formação continuada em IA', url: '../formacao-continuada/', icone: '🎓', resumo: 'Formação de professores em IA para escolas e redes de ensino.' },
    { id: 'pg-mentoria', titulo: 'Mentoria para professores', url: '../mentoria/', icone: '🤝', resumo: 'Acompanhamento individual para levar IA e Computação para a sua aula.' },
    { id: 'pg-quiz', titulo: 'Quiz de pensamento computacional', url: '../quiz-pensamento-computacional/', icone: '🧩', resumo: '12 perguntas sobre decomposição, padrões, abstração e algoritmos.' },
    { id: 'pg-blog', titulo: 'Blog', url: '../blog/', icone: '📰', resumo: 'Textos sobre IA na escola, BNCC de Computação e Matemática.' },
    { id: 'pg-assistente', titulo: 'Assistente do site', url: '../assistente/', icone: '💬', resumo: 'Pergunte sobre o material e a IA responde com base nas páginas do site.' }
  ].map(p => Object.assign(p, { tipo: 'pagina', extra: 'Para professores' }));

  const FASES = [
    { id: 'vila', nome: 'Vila do Começo', sub: 'Primeiros passos · Computação do 6º ano', ano: 6, filtro: r => anoDe(r) <= 6 && r.comp.includes('CO'),
      placa: 'Bem-vindo! Cada casa desta vila é um jogo. Converse com as pessoas, responda às perguntas, pegue os itens pelo chão e entre nas casas para jogar.' },
    { id: 'praca', nome: 'Praça dos Números', sub: 'Matemática do 6º ano', ano: 6, filtro: r => anoDe(r) <= 6 && !r.comp.includes('CO'),
      placa: 'Aqui os jogos são de Matemática: frações, figuras, tabuada e muito mais.' },
    { id: 'padroes', nome: 'Bairro dos Padrões', sub: '7º ano', ano: 7, filtro: r => anoDe(r) === 7,
      placa: 'Registros, matrizes, bugs e internet: os jogos do 7º ano moram aqui.' },
    { id: 'redes', nome: 'Cidade das Redes', sub: '8º ano', ano: 8, filtro: r => anoDe(r) === 8,
      placa: 'Recursão, paralelismo, redes sociais e segurança: a cidade do 8º ano.' },
    { id: 'ia', nome: 'Vale da Inteligência', sub: '9º ano', ano: 9, filtro: r => anoDe(r) >= 9,
      placa: 'Inteligência artificial, criptografia, grafos e autômatos: o vale do 9º ano.' },
    { id: 'lab', nome: 'Laboratório dos Simuladores', sub: 'IA, estatística e arquitetura', ano: 9,
      lugares: SIM.map(s => ({ id: 'sim-' + s.id, titulo: s.titulo, url: '../simuladores/' + s.url, icone: s.ia ? '🧠' : '🔬', resumo: s.resumo || '', tipo: 'sim',
        extra: (s.niveis || []).map(n => (typeof NIVEIS !== 'undefined' && NIVEIS[n]) || n).join(' · ') })),
      placa: 'Cada prédio é um simulador: redes neurais, regressão, bases numéricas, cache, pipeline... Abra e experimente.' },
    { id: 'escola', nome: 'Escola dos Professores', sub: 'Guias, formação e mentoria', ano: 9, lugares: PROF,
      placa: 'A escola é para quem ensina: guias de IA e tecnologia, prompts, planos de aula, formação e mentoria.' }
  ];
  const NOMES = ['Professora Maria', 'Seu Antônio', 'Dona Lúcia', 'Teco', 'Bia', 'Professor Carlos', 'Nina', 'Dudu', 'Vovó Rosa', 'Léo', 'Dona Cida', 'Juca', 'Mel', 'Seu Pedro', 'Lara', 'Kauã', 'Professora Ana', 'Rafa', 'Dona Zefa', 'Gui'];
  const ROUPAS = ['#3f8fe0', '#e0564a', '#4bb259', '#f6b73c', '#9a6bd6', '#2bb3b1', '#e07bb0', '#8e8e8e'];
  const PELES = ['#f3c9a6', '#d9a579', '#a9714b', '#f6d7bd', '#6f4a2d'];
  const CABELOS = ['#3a2416', '#111', '#8a5a2b', '#d6a93b', '#5a3b2a', '#c2c2c2'];
  const ITENS = [['⭐', 'Estrela'], ['📘', 'Livro'], ['💎', 'Cristal'], ['🔑', 'Chave'], ['🍎', 'Maçã'], ['🧩', 'Peça']];

  /* perguntas de uma fase: múltipla escolha e verdadeiro ou falso das listas do mesmo ano */
  function perguntasDoAno(ano) {
    const out = [];
    for (const l of LST) {
      if (l.ano !== ano) continue;
      l.ex.forEach((e, i) => {
        if (e[0] === 'me') out.push({ id: l.id + '-' + i, enun: e[1], alts: e[2], certa: e[3], coment: e[4] || '' });
        else if (e[0] === 'vf') e[2].forEach((af, j) => out.push({ id: l.id + '-' + i + '-' + j, enun: 'Verdadeiro ou falso? ' + af[0], alts: ['Verdadeiro', 'Falso'], certa: af[1] ? 0 : 1, coment: e[3] || '' }));
      });
    }
    return out;
  }

  /* ---------- montagem do mundo ---------- */
  const SX = 270, SY = 250, CW = 150, CH = 125, MARGEM = 130, TOPO = 190, BASE = 290;
  const fases = FASES.map((f, i) => {
    const lugares = f.lugares || jogaveis.filter(f.filtro).map(lugarRec);
    const n = Math.max(1, lugares.length);
    const cols = Math.max(2, Math.min(6, Math.ceil(Math.sqrt(n * 1.5))));
    const rows = Math.ceil(n / cols);
    const w = cols * SX + MARGEM * 2, h = TOPO + rows * SY + BASE;
    const perguntas = perguntasDoAno(f.ano);
    const metaPerg = Math.min(perguntas.length, [4, 5, 6, 6, 6, 4, 3][i] || 4);
    const metaJogar = Math.min(n, f.id === 'escola' ? 3 : 3 + Math.floor(i / 2));
    const nNpc = 2 + Math.floor(i / 2);
    const nItens = 5 + i;
    return Object.assign({}, f, { idx: i, lugares, cols, rows, w, h, perguntas, metaPerg, metaJogar, nNpc, nItens });
  });
  const H = Math.max(...fases.map(f => f.h));
  const RUA_Y = H - 150;   // rua que liga as fases
  let x0 = 0;
  for (const f of fases) {
    f.x0 = x0; x0 += f.w;
    f.casas = []; f.solidos = []; f.npcs = []; f.itens = []; f.arvores = []; f.flores = []; f.ruas = []; f.manchas = [];
    const r = rng(1000 + f.idx * 77);
    // casas em fileiras, de frente para uma rua
    f.lugares.forEach((l, i) => {
      const c = i % f.cols, lin = Math.floor(i / f.cols);
      const x = f.x0 + MARGEM + c * SX + (SX - CW) / 2, y = TOPO + lin * SY;
      f.casas.push({ lugar: l, x, y, w: CW, h: CH, porta: { x: x + CW / 2, y: y + CH + 18 }, telhado: ROUPAS[(i + f.idx) % ROUPAS.length], parede: ['#f7e7c6', '#fbf1dc', '#f1dcc0', '#e8eef5'][i % 4] });
      f.solidos.push({ x: x + 6, y: y + 28, w: CW - 12, h: CH - 28 });
    });
    for (let lin = 0; lin < f.rows; lin++) f.ruas.push({ x: f.x0 + 60, y: TOPO + lin * SY + CH + 12, w: f.w - 120, h: 64 });
    f.ruas.push({ x: f.x0 + f.w / 2 - 34, y: 80, w: 68, h: RUA_Y - 80 + 70 });   // rua vertical
    f.ruas.push({ x: f.x0, y: RUA_Y, w: f.w, h: 70 });                           // rua de ligação
    // placa da fase, logo na entrada
    f.placa = { x: f.x0 + 70, y: RUA_Y - 40 };
    f.solidos.push({ x: f.placa.x - 18, y: f.placa.y - 10, w: 36, h: 22 });
    // personagens nas ruas das casas
    const nomes = NOMES.slice();
    for (let k = 0; k < f.nNpc; k++) {
      const rua = f.ruas[k % Math.max(1, f.rows)];
      const nx = rua.x + 90 + r() * (rua.w - 180), ny = rua.y + 20 + r() * 30;
      const nome = nomes.splice((f.idx * 3 + k * 5) % nomes.length, 1)[0];
      f.npcs.push({ id: f.id + '-npc' + k, nome, x: nx, y: ny, roupa: ROUPAS[(k * 3 + f.idx) % ROUPAS.length], pele: PELES[(k + f.idx) % PELES.length], cabelo: CABELOS[(k * 2 + f.idx) % CABELOS.length], prof: k === 0, fase: f });
    }
    // itens pelo chão (longe das casas)
    let tent = 0;
    while (f.itens.length < f.nItens && tent++ < 400) {
      const ix = f.x0 + 60 + r() * (f.w - 120), iy = 70 + r() * (H - 130);
      if (f.solidos.some(s => ix > s.x - 30 && ix < s.x + s.w + 30 && iy > s.y - 30 && iy < s.y + s.h + 30)) continue;
      if (f.itens.some(o => Math.hypot(o.x - ix, o.y - iy) < 120)) continue;
      const t = ITENS[(f.itens.length + f.idx) % ITENS.length];
      f.itens.push({ id: f.id + '-item' + f.itens.length, x: ix, y: iy, icone: t[0], nome: t[1] });
    }
    // árvores: cerca em volta da fase, com passagem na rua de ligação, e algumas no meio
    const arv = (ax, ay, s) => { f.arvores.push({ x: ax, y: ay, s }); f.solidos.push({ x: ax - 14 * s, y: ay - 14 * s, w: 28 * s, h: 20 * s }); };
    for (let ax = f.x0 + 30; ax < f.x0 + f.w; ax += 70) { arv(ax, 34 + r() * 14, 0.9 + r() * 0.3); arv(ax + 20, H - 30 - r() * 14, 0.9 + r() * 0.3); }
    for (let ay = 90; ay < H - 60; ay += 70) {
      if (ay > RUA_Y - 70 && ay < RUA_Y + 70) continue;       // passagem da rua
      if (f.idx === 0) arv(f.x0 + 30, ay, 1);
      arv(f.x0 + f.w - (f.idx === fases.length - 1 ? 30 : 4), ay, 1);
    }
    tent = 0;
    while (f.arvores.length < f.rows * f.cols * 0.6 + 60 && tent++ < 300) {
      const ax = f.x0 + 90 + r() * (f.w - 180), ay = 80 + r() * (H - 160);
      if (f.solidos.some(s => ax > s.x - 50 && ax < s.x + s.w + 50 && ay > s.y - 60 && ay < s.y + s.h + 50)) continue;
      if (f.ruas.some(s => ax > s.x - 30 && ax < s.x + s.w + 30 && ay > s.y - 40 && ay < s.y + s.h + 20)) continue;
      if (f.itens.some(o => Math.hypot(o.x - ax, o.y - ay) < 60) || f.npcs.some(o => Math.hypot(o.x - ax, o.y - ay) < 80)) continue;
      arv(ax, ay, 0.8 + r() * 0.6);
    }
    for (let k = 0; k < 40; k++) f.flores.push({ x: f.x0 + 40 + r() * (f.w - 80), y: 60 + r() * (H - 120), c: ['#f9d342', '#8ec7ff', '#ff9fb6', '#fff'][k % 4] });
    for (let k = 0; k < 14; k++) f.manchas.push({ x: f.x0 + r() * f.w, y: r() * H, rx: 120 + r() * 200, ry: 70 + r() * 110 });
    // portão para a próxima fase, no fim da rua de ligação
    if (f.idx < fases.length - 1) f.portao = { x: f.x0 + f.w - 22, y: RUA_Y + 35 };
  }
  const TOTAL_W = x0;
  const todosLugares = fases.flatMap(f => f.lugares);
  const faseDeX = x => fases.find(f => x >= f.x0 && x < f.x0 + f.w) || fases[fases.length - 1];

  /* ---------- estado salvo ---------- */
  const CHAVE = 'mundo-site-v1';
  const novo = () => ({ pontos: 0, acertos: 0, erros: 0, tempo: 0, itens: {}, falas: {}, resp: {}, feitos: {}, abertos: {}, concluidas: {}, x: fases[0].x0 + 150, y: RUA_Y + 35 });
  let S = novo();
  try { const v = JSON.parse(localStorage.getItem(CHAVE)); if (v && typeof v.pontos === 'number') S = Object.assign(novo(), v); } catch (e) {}
  function salvar(avisa) { try { localStorage.setItem(CHAVE, JSON.stringify(S)); if (avisa) aviso('💾 Progresso salvo!'); } catch (e) { if (avisa) aviso('Não deu para salvar neste navegador.'); } }

  /* ---------- missões ---------- */
  function missoes(f) {
    const jog = f.lugares.filter(l => S.feitos[l.id]).length;
    const perg = Object.keys(S.resp).filter(id => f.perguntas.some(p => p.id === id)).length;
    const itens = f.itens.filter(i => S.itens[i.id]).length;
    const falas = f.npcs.filter(n => S.falas[n.id]).length;
    const verbo = f.id === 'escola' ? 'Visitar' : f.id === 'lab' ? 'Experimentar' : 'Jogar';
    const coisa = f.id === 'escola' ? 'páginas' : f.id === 'lab' ? 'simuladores' : 'jogos';
    return [
      { nome: `${verbo} ${f.metaJogar} ${coisa}`, n: jog, meta: f.metaJogar },
      { nome: `Responder ${f.metaPerg} perguntas`, n: perg, meta: f.metaPerg },
      { nome: `Coletar ${f.nItens} itens`, n: itens, meta: f.nItens },
      { nome: `Conversar com ${f.nNpc} personagens`, n: falas, meta: f.nNpc }
    ].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  const concluida = f => missoes(f).every(m => m.ok);
  const liberada = f => f.idx === 0 || concluida(fases[f.idx - 1]);
  function pontos(n, txt) { S.pontos += n; if (txt) aviso(`+${n} ⭐ ${txt}`); hud(); }
  function confereFases() {
    for (const f of fases) if (concluida(f) && !S.concluidas[f.id]) {
      S.concluidas[f.id] = true;
      pontos(100, `Fase concluída: ${f.nome}!` + (f.idx < fases.length - 1 ? ` O caminho para ${fases[f.idx + 1].nome} está aberto.` : ''));
    }
    salvar();
  }
  /* jogos que registraram progresso no Meu progresso contam como feitos (é o mesmo progresso da página do jogo) */
  function confereJogos() {
    let novos = 0;
    for (const l of todosLugares) {
      if (S.feitos[l.id] || !l.rec || !window.MDP) continue;
      const r = MDP.resultado(l.id);
      if (r && r.n > 0) { S.feitos[l.id] = r.b; novos++; }
    }
    if (novos) { S.pontos += 25 * novos; aviso(novos === 1 ? '🎉 Jogo concluído! +25 ⭐' : `🎉 ${novos} jogos concluídos! +${25 * novos} ⭐`); hud(); confereFases(); }
  }

  /* ---------- canvas e câmera ---------- */
  const cv = $('#jogo'), ctx = cv.getContext('2d');
  let W = 0, HH = 0, escala = 1, dpr = 1;
  function ajusta() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; HH = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(HH * dpr);
    escala = W < 700 ? W / 620 : Math.max(0.7, Math.min(1.3, W / 1150));
  }
  window.addEventListener('resize', ajusta); ajusta();
  const cam = { x: 0, y: 0 };

  /* ---------- jogador ---------- */
  const P = { x: S.x, y: S.y, dir: 'baixo', andando: false, passo: 0, pulo: 0, vpulo: 0 };
  const teclas = {};
  let correndo = false, dialogoAberto = false, janelaAberta = null;

  function solidosPerto() {
    const f = faseDeX(P.x), out = [...f.solidos];
    const viz = fases[f.idx + 1]; if (viz) out.push(...viz.solidos.filter(s => s.x < viz.x0 + 200));
    const ant = fases[f.idx - 1]; if (ant) out.push(...ant.solidos.filter(s => s.x > ant.x0 + ant.w - 200));
    for (const g of fases) if (g.portao && !liberada(fases[g.idx + 1])) out.push({ x: g.portao.x - 12, y: g.portao.y - 50, w: 24, h: 100 });
    return out;
  }
  function move(dt) {
    let dx = 0, dy = 0;
    if (teclas.esq) dx -= 1; if (teclas.dir) dx += 1; if (teclas.cima) dy -= 1; if (teclas.baixo) dy += 1;
    P.andando = !!(dx || dy);
    if (P.andando) {
      const L = Math.hypot(dx, dy); dx /= L; dy /= L;
      const corre = correndo || teclas.correr;
      const v = (corre ? 330 : 190) * dt;
      P.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'dir' : 'esq') : (dy > 0 ? 'baixo' : 'cima');
      const sol = solidosPerto();
      const livre = (x, y) => !(x < 24 || x > TOTAL_W - 24 || y < 70 || y > H - 40) && !sol.some(s => x + 14 > s.x && x - 14 < s.x + s.w && y + 4 > s.y && y - 10 < s.y + s.h);
      if (livre(P.x + dx * v, P.y)) P.x += dx * v;
      if (livre(P.x, P.y + dy * v)) P.y += dy * v;
      P.passo += dt * (corre ? 14 : 9);
    }
    if (P.pulo > 0 || P.vpulo) { P.vpulo -= 900 * dt; P.pulo = Math.max(0, P.pulo + P.vpulo * dt); if (P.pulo === 0) P.vpulo = 0; }
    // itens: pega ao passar por cima
    const f = faseDeX(P.x);
    for (const it of f.itens) if (!S.itens[it.id] && Math.hypot(it.x - P.x, it.y - P.y) < 30) {
      S.itens[it.id] = true; pontos(5, `${it.icone} ${it.nome} coletado!`); confereFases();
    }
  }
  function alvoPerto() {
    const f = faseDeX(P.x);
    let melhor = null, dm = 72;
    const tenta = (x, y, ob) => { const d = Math.hypot(x - P.x, y - P.y); if (d < dm) { dm = d; melhor = ob; } };
    for (const c of f.casas) tenta(c.porta.x, c.porta.y, { tipo: 'casa', casa: c });
    for (const n of f.npcs) tenta(n.x, n.y, { tipo: 'npc', npc: n });
    tenta(f.placa.x, f.placa.y + 20, { tipo: 'placa', fase: f });
    if (f.portao) tenta(f.portao.x, f.portao.y, { tipo: 'portao', fase: f });
    return melhor;
  }

  /* ---------- desenho ---------- */
  const FONTE = '600 14px Lexend, system-ui, sans-serif';
  function texto(t, x, y, op = {}) {
    ctx.font = op.fonte || FONTE; ctx.textAlign = op.alinha || 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 4; ctx.strokeStyle = op.contorno || 'rgba(255,255,255,.9)'; ctx.lineJoin = 'round';
    if (op.contorno !== 'none') ctx.strokeText(t, x, y);
    ctx.fillStyle = op.cor || '#1d2a1f'; ctx.fillText(t, x, y);
  }
  function arvore(a) {
    const s = a.s;
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(a.x, a.y + 4, 22 * s, 9 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8b5a2b'; ctx.fillRect(a.x - 6 * s, a.y - 30 * s, 12 * s, 36 * s);
    ctx.fillStyle = '#2e7d3a'; ctx.beginPath(); ctx.arc(a.x, a.y - 44 * s, 26 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(a.x - 16 * s, a.y - 30 * s, 20 * s, 0, Math.PI * 2); ctx.arc(a.x + 16 * s, a.y - 30 * s, 20 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3f9a4b'; ctx.beginPath(); ctx.arc(a.x - 6 * s, a.y - 52 * s, 14 * s, 0, Math.PI * 2); ctx.fill();
  }
  function casa(c) {
    const feito = S.feitos[c.lugar.id];
    ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(c.x + c.w / 2, c.y + c.h + 6, c.w / 2 + 8, 12, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = c.parede; ctx.fillRect(c.x, c.y + 40, c.w, c.h - 40);
    ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(c.x, c.y + 40, c.w, 8);
    ctx.fillStyle = c.telhado; ctx.beginPath(); ctx.moveTo(c.x - 12, c.y + 44); ctx.lineTo(c.x + c.w / 2, c.y - 8); ctx.lineTo(c.x + c.w + 12, c.y + 44); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(c.x + c.w - 40, c.y + 2, 14, 26);
    ctx.fillStyle = '#9ed0f5'; ctx.fillRect(c.x + 18, c.y + 58, 30, 26); ctx.fillRect(c.x + c.w - 48, c.y + 58, 30, 26);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.strokeRect(c.x + 18, c.y + 58, 30, 26); ctx.strokeRect(c.x + c.w - 48, c.y + 58, 30, 26);
    ctx.fillStyle = '#9a6a3a'; ctx.beginPath(); ctx.roundRect(c.x + c.w / 2 - 16, c.y + c.h - 44, 32, 44, [8, 8, 0, 0]); ctx.fill();
    ctx.fillStyle = '#f6c84a'; ctx.beginPath(); ctx.arc(c.x + c.w / 2 + 9, c.y + c.h - 22, 3, 0, Math.PI * 2); ctx.fill();
    // ícone no telhado e nome na calçada
    ctx.font = '26px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(c.lugar.icone, c.x + c.w / 2, c.y + 24);
    texto(c.lugar.titulo.length > 22 ? c.lugar.titulo.slice(0, 21) + '…' : c.lugar.titulo, c.x + c.w / 2, c.y + c.h + 30, { fonte: '600 13px Lexend, sans-serif' });
    if (feito) { ctx.font = '22px system-ui, sans-serif'; ctx.fillText('✅', c.x + c.w - 10, c.y + 46); }
  }
  function pessoa(x, y, op) {
    const s = op.s || 1, passo = op.passo || 0, pulo = op.pulo || 0;
    ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(x, y + 2, 16 * s, 6 * s, 0, 0, Math.PI * 2); ctx.fill();
    const yy = y - pulo;
    const perna = op.andando ? Math.sin(passo) * 5 : 0;
    ctx.fillStyle = '#2f3b6b'; ctx.fillRect(x - 10 * s, yy - 20 * s + perna, 8 * s, 20 * s); ctx.fillRect(x + 2 * s, yy - 20 * s - perna, 8 * s, 20 * s);
    ctx.fillStyle = op.roupa; ctx.beginPath(); ctx.roundRect(x - 15 * s, yy - 48 * s, 30 * s, 32 * s, 8 * s); ctx.fill();
    ctx.fillStyle = op.pele; ctx.fillRect(x - 21 * s, yy - 44 * s, 6 * s, 20 * s); ctx.fillRect(x + 15 * s, yy - 44 * s, 6 * s, 20 * s);
    ctx.beginPath(); ctx.arc(x, yy - 62 * s, 17 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = op.cabelo; ctx.beginPath(); ctx.arc(x, yy - 66 * s, 17 * s, Math.PI, 0); ctx.fill(); ctx.fillRect(x - 17 * s, yy - 66 * s, 34 * s, 6 * s);
    if (op.dir !== 'cima') {
      const ox = op.dir === 'esq' ? -4 : op.dir === 'dir' ? 4 : 0;
      ctx.fillStyle = '#1d2a1f'; ctx.beginPath(); ctx.arc(x - 6 * s + ox, yy - 60 * s, 2.2 * s, 0, Math.PI * 2); ctx.arc(x + 6 * s + ox, yy - 60 * s, 2.2 * s, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#1d2a1f'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + ox, yy - 56 * s, 6 * s, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
    }
  }
  function balao(x, y, ic) {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#3f8fe0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(x - 22, y - 44, 44, 36, 10); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 6, y - 8); ctx.lineTo(x, y); ctx.lineTo(x + 6, y - 8); ctx.closePath(); ctx.fill();
    ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, x, y - 26);
  }
  let t0 = performance.now(), tempoAcum = 0;
  function desenha(now) {
    const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
    if (!dialogoAberto && !janelaAberta) move(dt);
    if (!document.hidden) { tempoAcum += dt; if (tempoAcum >= 1) { const s = Math.floor(tempoAcum); S.tempo += s; tempoAcum -= s; $('#h-tempo').textContent = fmtTempo(S.tempo); } }
    // câmera
    const vw = W / escala, vh = HH / escala;
    cam.x = Math.max(0, Math.min(TOTAL_W - vw, P.x - vw / 2)); cam.y = Math.max(0, Math.min(H - vh, P.y - vh / 2 - 20));
    ctx.setTransform(dpr * escala, 0, 0, dpr * escala, -cam.x * dpr * escala, -cam.y * dpr * escala);
    ctx.fillStyle = '#7dbd5e'; ctx.fillRect(cam.x, cam.y, vw, vh);
    const f = faseDeX(P.x);
    const visiveis = [f, fases[f.idx - 1], fases[f.idx + 1]].filter(Boolean).filter(g => g.x0 < cam.x + vw + 100 && g.x0 + g.w > cam.x - 100);
    const naTela = (x, y, m = 120) => x > cam.x - m && x < cam.x + vw + m && y > cam.y - m && y < cam.y + vh + m;
    ctx.fillStyle = 'rgba(255,255,255,.07)';
    for (const g of visiveis) for (const m of g.manchas) if (naTela(m.x, m.y, 300)) { ctx.beginPath(); ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2); ctx.fill(); }
    for (const g of visiveis) for (const r of g.ruas) { ctx.fillStyle = '#b89968'; ctx.fillRect(r.x, r.y, r.w, r.h); ctx.fillStyle = '#d2b482'; ctx.fillRect(r.x + 4, r.y + 4, r.w - 8, r.h - 8); }
    for (const g of visiveis) for (const fl of g.flores) if (naTela(fl.x, fl.y)) { ctx.fillStyle = fl.c; ctx.beginPath(); ctx.arc(fl.x, fl.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#f6a623'; ctx.beginPath(); ctx.arc(fl.x, fl.y, 1.6, 0, Math.PI * 2); ctx.fill(); }
    // placa e portão
    for (const g of visiveis) {
      ctx.fillStyle = '#8b5a2b'; ctx.fillRect(g.placa.x - 3, g.placa.y, 6, 30);
      ctx.fillStyle = '#f3d9a4'; ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(g.placa.x - 46, g.placa.y - 30, 92, 36, 8); ctx.fill(); ctx.stroke();
      texto(`Fase ${g.idx + 1}`, g.placa.x, g.placa.y - 12, { fonte: '700 13px Lexend, sans-serif', contorno: 'none' });
      if (g.portao) {
        const fechado = !liberada(fases[g.idx + 1]);
        ctx.fillStyle = fechado ? '#c4392a' : '#8b5a2b';
        for (let k = -40; k <= 40; k += 20) ctx.fillRect(g.portao.x - 4, g.portao.y + k - 10, 8, 20);
        ctx.fillRect(g.portao.x - 6, g.portao.y - 50, 12, 6); ctx.fillRect(g.portao.x - 6, g.portao.y + 44, 12, 6);
        ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#000'; ctx.fillText(fechado ? '🔒' : '🚪', g.portao.x, g.portao.y - 62);
      }
    }
    // objetos ordenados pela base (quem está mais embaixo fica na frente)
    const lista = [];
    for (const g of visiveis) {
      for (const c of g.casas) if (naTela(c.x + c.w / 2, c.y + c.h, 220)) lista.push({ y: c.y + c.h, d: () => casa(c) });
      for (const a of g.arvores) if (naTela(a.x, a.y)) lista.push({ y: a.y, d: () => arvore(a) });
      for (const n of g.npcs) if (naTela(n.x, n.y)) lista.push({ y: n.y, d: () => { pessoa(n.x, n.y, Object.assign({ dir: 'baixo', s: 0.95 }, n)); texto(n.nome, n.x, n.y + 14, { fonte: '600 12px Lexend, sans-serif' }); if (!S.falas[n.id]) balao(n.x, n.y - 86, n.prof ? '👩‍🏫' : '💬'); } });
      for (const it of g.itens) if (!S.itens[it.id] && naTela(it.x, it.y)) lista.push({ y: it.y, d: () => { const b = Math.sin(now / 300 + it.x) * 4; ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(it.x, it.y + 6, 12, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.font = '26px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(it.icone, it.x, it.y - 10 + b); } });
    }
    lista.push({ y: P.y, d: () => pessoa(P.x, P.y, { roupa: '#3f8fe0', pele: '#f3c9a6', cabelo: '#3a2416', dir: P.dir, andando: P.andando, passo: P.passo, pulo: P.pulo }) });
    lista.sort((a, b) => a.y - b.y).forEach(o => o.d());
    // dica do que dá para fazer
    const alvo = !dialogoAberto && alvoPerto();
    if (alvo) {
      const t = alvo.tipo === 'casa' ? (alvo.casa.lugar.tipo === 'pagina' ? 'E · visitar' : alvo.casa.lugar.tipo === 'sim' ? 'E · experimentar' : 'E · jogar') : alvo.tipo === 'npc' ? 'E · conversar' : alvo.tipo === 'placa' ? 'E · ler a placa' : 'E · portão';
      texto(t, P.x, P.y - 96 - P.pulo, { fonte: '700 13px Lexend, sans-serif', cor: '#fff', contorno: '#1d2a1f' });
    }
    minimapa(f);
    requestAnimationFrame(desenha);
  }
  const fmtTempo = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  /* ---------- minimapa ---------- */
  const mini = $('#mini'), mctx = mini.getContext('2d');
  let miniFase = null, miniCache = null, miniS = 1, miniOx = 0, miniOy = 0;
  function minimapa(f) {
    if (miniFase !== f || !miniCache) {
      miniFase = f; $('#mini-nome').textContent = f.nome;
      miniS = Math.min(300 / f.w, 200 / H); miniOx = (300 - f.w * miniS) / 2; miniOy = (200 - H * miniS) / 2;
      miniCache = document.createElement('canvas'); miniCache.width = 300; miniCache.height = 200;
      const c = miniCache.getContext('2d'), s = miniS;
      c.fillStyle = '#1b2531'; c.fillRect(0, 0, 300, 200);
      c.fillStyle = '#5a5a4a'; for (const r of f.ruas) c.fillRect(miniOx + (r.x - f.x0) * s, miniOy + r.y * s, r.w * s, r.h * s);
      for (const casa of f.casas) { c.fillStyle = casa.telhado; c.fillRect(miniOx + (casa.x - f.x0) * s, miniOy + casa.y * s, casa.w * s, casa.h * s); }
      c.fillStyle = '#2e7d3a'; for (const a of f.arvores) { c.beginPath(); c.arc(miniOx + (a.x - f.x0) * s, miniOy + a.y * s, 2, 0, Math.PI * 2); c.fill(); }
      hud();
    }
    const s = miniS, ox = miniOx, oy = miniOy;
    mctx.drawImage(miniCache, 0, 0);
    for (const casa of f.casas) if (S.feitos[casa.lugar.id]) { mctx.fillStyle = '#fff'; mctx.fillRect(ox + (casa.x - f.x0) * s + 2, oy + casa.y * s + 2, 4, 4); }
    mctx.fillStyle = '#f6b73c'; for (const it of f.itens) if (!S.itens[it.id]) { mctx.beginPath(); mctx.arc(ox + (it.x - f.x0) * s, oy + it.y * s, 2.5, 0, Math.PI * 2); mctx.fill(); }
    mctx.fillStyle = '#fff'; for (const n of f.npcs) if (!S.falas[n.id]) { mctx.beginPath(); mctx.arc(ox + (n.x - f.x0) * s, oy + n.y * s, 2.5, 0, Math.PI * 2); mctx.fill(); }
    mctx.fillStyle = '#e85c4a'; mctx.beginPath(); mctx.arc(ox + (P.x - f.x0) * s, oy + P.y * s, 4, 0, Math.PI * 2); mctx.fill();
  }

  /* ---------- HUD ---------- */
  function hud() {
    $('#h-pontos').textContent = S.pontos;
    $('#h-itens').textContent = Object.keys(S.itens).length;
    $('#h-acertos').textContent = `${S.acertos}/${S.acertos + S.erros}`;
    $('#h-erros').textContent = S.erros;
    $('#h-tempo').textContent = fmtTempo(S.tempo);
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    $('#h-aprend').textContent = Math.round(100 * feitos / Math.max(1, todosLugares.length)) + '%';
    const f = faseDeX(P.x), ms = missoes(f);
    $('#m-titulo').textContent = `Fase ${f.idx + 1} — ${f.sub.split(' · ')[0]}`;
    $('#m-nome').textContent = `🏘️ ${f.nome}`;
    $('#m-lista').innerHTML = ms.map(m => `<li class="${m.ok ? 'ok' : ''}"><span class="q"></span><span>${esc(m.nome)}</span><span class="n">(${m.n}/${m.meta})</span></li>`).join('');
    const tot = ms.reduce((a, m) => a + Math.min(1, m.n / m.meta), 0) / ms.length;
    $('#m-barra').style.width = Math.round(tot * 100) + '%';
  }
  let avisoT = null;
  function aviso(t) { const el = $('#aviso'); el.textContent = t; el.classList.add('mostra'); clearTimeout(avisoT); avisoT = setTimeout(() => el.classList.remove('mostra'), 3200); }

  /* ---------- diálogos ---------- */
  const D = { el: $('#dialogo'), ic: $('#d-ic'), nome: $('#d-nome'), texto: $('#d-texto'), op: $('#d-opcoes') };
  function dialogo(ic, nome, html, opcoes) {
    dialogoAberto = true; D.el.hidden = false; D.ic.textContent = ic; D.nome.textContent = nome; D.texto.innerHTML = html;
    D.op.innerHTML = '';
    opcoes.forEach((o, i) => {
      const b = document.createElement(o.href ? 'a' : 'button');
      if (o.href) { b.href = o.href; b.target = '_blank'; b.rel = 'noopener'; } else b.type = 'button';
      b.className = o.classe || ''; b.innerHTML = (i < 9 ? `<kbd>${i + 1}</kbd> ` : '') + esc(o.txt);
      b.addEventListener('click', () => { if (o.fn) o.fn(); });
      D.op.appendChild(b);
    });
    const primeiro = D.op.querySelector('button, a'); if (primeiro) primeiro.focus();
  }
  function fechaDialogo() { dialogoAberto = false; D.el.hidden = true; teclas.esq = teclas.dir = teclas.cima = teclas.baixo = false; cv.focus(); }
  $('#d-fechar').addEventListener('click', fechaDialogo);

  function abreCasa(c) {
    const l = c.lugar, feito = S.feitos[l.id];
    const verbo = l.tipo === 'pagina' ? 'Visitar' : l.tipo === 'sim' ? 'Experimentar' : 'Jogar';
    let status = '';
    if (feito) status = `<p class="muted">✅ Já feito${typeof feito === 'number' && l.rec ? ` · melhor resultado: ${feito}%` : ''}. Pode fazer de novo quando quiser.</p>`;
    else if (l.rec) status = `<p class="muted">A missão fica pronta quando você joga de verdade: a página abre em outra aba e, quando terminar uma rodada, volte aqui.</p>`;
    else status = `<p class="muted">A página abre em outra aba. Ao abrir, a missão conta como feita.</p>`;
    dialogo(l.icone, l.titulo, `<p>${esc(l.resumo)}</p>${l.extra ? `<p class="muted">${esc(l.extra)}</p>` : ''}${status}`, [
      { txt: `${verbo} agora`, href: l.url, classe: 'principal', fn: () => { S.abertos[l.id] = Date.now(); if (!l.rec && !S.feitos[l.id]) { S.feitos[l.id] = true; pontos(15, `${l.titulo}: missão feita!`); confereFases(); } salvar(); fechaDialogo(); } },
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  function falaNpc(n) {
    const f = n.fase, primeira = !S.falas[n.id];
    if (primeira) { S.falas[n.id] = true; pontos(5, `Você conheceu ${n.nome}!`); confereFases(); }
    const pendentes = f.perguntas.filter(p => !(p.id in S.resp));
    const ola = primeira ? (n.prof ? `Olá! Eu sou a ${n.nome.replace(/^Professora? /, '')}, professora aqui de ${f.nome}. ` : `Oi! Eu sou ${n.nome}. `) : 'Oi de novo! ';
    if (!pendentes.length) { dialogo('💬', n.nome, `<p>${esc(ola)}Você já respondeu todas as perguntas deste lugar. Que tal entrar nas casas e jogar?</p>`, [{ txt: 'Tchau!', fn: fechaDialogo }]); return; }
    dialogo('💬', n.nome, `<p>${esc(ola)}Posso te fazer uma pergunta de ${f.ano}º ano? Vale 10 pontos.</p>`, [
      { txt: 'Pode perguntar!', classe: 'principal', fn: () => pergunta(n, pendentes[Math.floor(Math.random() * pendentes.length)]) },
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  function pergunta(n, p) {
    dialogo('❓', n.nome, `<p>${p.enun}</p>`, p.alts.map((a, i) => ({ txt: a, fn: () => {
      if (p.id in S.resp) return;
      const certo = i === p.certa;
      S.resp[p.id] = certo;
      if (certo) { S.acertos++; pontos(10, 'Acertou!'); } else { S.erros++; hud(); }
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (j === p.certa) b.classList.add('certa'); else if (j === i) b.classList.add('errada'); });
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${p.coment || ''}</p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Continuar';
      b.addEventListener('click', fechaDialogo); D.op.appendChild(b); b.focus();
      confereFases(); salvar();
    } })));
  }
  function lePlaca(f) {
    const ms = missoes(f);
    dialogo('🪧', f.nome, `<p>${esc(f.placa)}</p><p class="muted">Missões desta fase: ${ms.map(m => `${m.ok ? '✅' : '⬜'} ${esc(m.nome)}`).join(' · ')}</p>`, [{ txt: 'Entendi', fn: fechaDialogo }]);
  }
  function portao(f) {
    const prox = fases[f.idx + 1];
    if (liberada(prox)) { dialogo('🚪', 'Portão', `<p>O caminho para <strong>${esc(prox.nome)}</strong> está aberto. Siga em frente!</p>`, [{ txt: 'Vamos', fn: fechaDialogo }]); return; }
    const falta = missoes(f).filter(m => !m.ok).map(m => `${esc(m.nome)} (${m.n}/${m.meta})`);
    dialogo('🔒', 'Portão fechado', `<p>Para seguir para <strong>${esc(prox.nome)}</strong>, complete as missões de ${esc(f.nome)}:</p><p>${falta.join('<br>')}</p>`, [{ txt: 'Vou lá!', fn: fechaDialogo }]);
  }
  function interage() {
    if (dialogoAberto || janelaAberta) return;
    const a = alvoPerto(); if (!a) return;
    if (a.tipo === 'casa') abreCasa(a.casa); else if (a.tipo === 'npc') falaNpc(a.npc); else if (a.tipo === 'placa') lePlaca(a.fase); else portao(a.fase);
  }

  /* ---------- janelas ---------- */
  function abreJanela(id) {
    fechaJanela(); janelaAberta = id; const el = $('#j-' + id); el.hidden = false;
    if (id === 'mapa') desenhaMapa(); if (id === 'inventario') inventario(); if (id === 'biblioteca') biblioteca();
    const b = el.querySelector('button, a'); if (b) b.focus();
  }
  function fechaJanela() { if (!janelaAberta) return; $('#j-' + janelaAberta).hidden = true; janelaAberta = null; teclas.esq = teclas.dir = teclas.cima = teclas.baixo = false; cv.focus(); }
  document.querySelectorAll('[data-abrir]').forEach(b => b.addEventListener('click', () => abreJanela(b.dataset.abrir)));
  document.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fechaJanela));
  function teleporta(f) { P.x = f.x0 + 150; P.y = RUA_Y + 35; fechaJanela(); hud(); aviso(`🏘️ ${f.nome}`); }
  function desenhaMapa() {
    const c = $('#mapa-cv'), k = c.getContext('2d'); k.fillStyle = '#1b2531'; k.fillRect(0, 0, c.width, c.height);
    const s = c.width / TOTAL_W, oy = (c.height - H * s) / 2 + 8;
    for (const f of fases) {
      const ok = liberada(f);
      k.fillStyle = ok ? '#4f7a3a' : '#2f3a33'; k.fillRect(f.x0 * s, oy, f.w * s - 2, H * s);
      k.fillStyle = '#8a7a5a'; for (const r of f.ruas) k.fillRect(r.x * s, oy + r.y * s, r.w * s, Math.max(2, r.h * s));
      for (const casa of f.casas) { k.fillStyle = S.feitos[casa.lugar.id] ? '#fff' : casa.telhado; k.fillRect(casa.x * s, oy + casa.y * s, Math.max(3, casa.w * s), Math.max(3, casa.h * s)); }
      k.fillStyle = '#fff'; k.font = '600 12px Lexend, sans-serif'; k.textAlign = 'center'; k.fillText(`${ok ? '' : '🔒'} ${f.idx + 1}`, (f.x0 + f.w / 2) * s, oy - 6);
    }
    k.fillStyle = '#e85c4a'; k.beginPath(); k.arc(P.x * s, oy + P.y * s, 5, 0, Math.PI * 2); k.fill();
    $('#mapa-fases').innerHTML = fases.map(f => {
      const ms = missoes(f), ok = liberada(f);
      return `<li class="${ok ? '' : 'travada'}"><span>${S.concluidas[f.id] ? '🏆' : ok ? '🏘️' : '🔒'}</span><span class="f-nome"><strong>Fase ${f.idx + 1}: ${esc(f.nome)}</strong><small>${esc(f.sub)} · ${f.lugares.length} casas · missões ${ms.filter(m => m.ok).length}/${ms.length}</small></span>${ok ? `<button type="button" class="hb azul" data-ir="${f.idx}">Ir</button>` : ''}</li>`;
    }).join('');
    $('#mapa-fases').querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => teleporta(fases[+b.dataset.ir])));
  }
  function inventario() {
    const cont = {}; for (const f of fases) for (const it of f.itens) if (S.itens[it.id]) cont[it.icone] = (cont[it.icone] || 0) + 1;
    $('#inv-itens').innerHTML = ITENS.map(([ic, nome]) => `<div class="it ${cont[ic] ? '' : 'falta'}"><span style="font-size:26px">${ic}</span><span>${nome}<br><b>${cont[ic] || 0}</b></span></div>`).join('');
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    const conq = [
      ['🥇', 'Primeira missão', feitos >= 1], ['🎮', '5 jogos feitos', feitos >= 5], ['🏅', '15 jogos feitos', feitos >= 15], ['🧠', '10 acertos', S.acertos >= 10], ['🧠', '30 acertos', S.acertos >= 30],
      ['💎', '20 itens', Object.keys(S.itens).length >= 20], ['🗣️', '10 conversas', Object.keys(S.falas).length >= 10],
      ...fases.map(f => ['🏆', f.nome, !!S.concluidas[f.id]])
    ];
    $('#inv-conq').innerHTML = conq.map(([ic, n, ok]) => `<div class="it ${ok ? '' : 'falta'}"><span style="font-size:22px">${ic}</span><span>${esc(n)}</span></div>`).join('');
  }
  function biblioteca() {
    $('#bib-lista').innerHTML = '<div class="bib">' + fases.map(f => `<h3>${f.idx + 1}. ${esc(f.nome)} <small class="muted">· ${esc(f.sub)}</small></h3><ul>${
      f.lugares.map(l => `<li class="${S.feitos[l.id] ? 'feito' : ''}"><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.icone)} ${esc(l.titulo)}</a></li>`).join('')}</ul>`).join('') +
      `<h3>📚 Mais do site</h3><ul><li><a href="../">Página inicial</a></li><li><a href="../jogos/">Todos os jogos</a></li><li><a href="${MD}catalogo.html?tipo=3d">Laboratório 3D</a></li><li><a href="../simuladores/">Simuladores</a></li><li><a href="${MD}meu-progresso.html">Meu progresso</a></li><li><a href="../curriculo/">Quem é Júlia Quoos</a></li></ul></div>`;
  }

  /* ---------- botões ---------- */
  $('#b-salvar').addEventListener('click', () => { S.x = P.x; S.y = P.y; salvar(true); });
  $('#b-reiniciar').addEventListener('click', () => {
    const f = faseDeX(P.x);
    if (!confirm(`Reiniciar a fase ${f.nome}? Itens, conversas e perguntas desta fase voltam ao começo (o progresso dos jogos fica).`)) return;
    for (const k of Object.keys(S.itens)) if (k.startsWith(f.id + '-')) delete S.itens[k];
    for (const k of Object.keys(S.falas)) if (k.startsWith(f.id + '-')) delete S.falas[k];
    for (const p of f.perguntas) delete S.resp[p.id];
    delete S.concluidas[f.id];
    teleporta(f); salvar(); aviso('🔄 Fase reiniciada');
  });
  $('#b-zerar').addEventListener('click', () => { if (!confirm('Apagar todo o progresso do mundo? (O Meu progresso dos jogos não é apagado.)')) return; S = novo(); P.x = S.x; P.y = S.y; salvar(); fechaJanela(); hud(); confereJogos(); });
  const toqueEl = $('#toque'), bToque = $('#b-toque');
  function ligaToque(liga) { toqueEl.hidden = !liga; bToque.setAttribute('aria-pressed', String(liga)); document.body.classList.toggle('com-toque', liga); }
  bToque.addEventListener('click', () => ligaToque(toqueEl.hidden));
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) ligaToque(true);
  toqueEl.querySelectorAll('[data-dir]').forEach(b => {
    const d = b.dataset.dir;
    b.addEventListener('pointerdown', ev => { ev.preventDefault(); teclas[d] = true; b.setPointerCapture(ev.pointerId); });
    const solta = () => { teclas[d] = false; };
    b.addEventListener('pointerup', solta); b.addEventListener('pointercancel', solta); b.addEventListener('lostpointercapture', solta);
  });
  $('#t-e').addEventListener('click', interage);
  $('#t-correr').addEventListener('click', () => { correndo = !correndo; $('#t-correr').setAttribute('aria-pressed', String(correndo)); });
  // clique numa casa ou pessoa perto do personagem também interage
  cv.addEventListener('click', ev => {
    if (dialogoAberto || janelaAberta) return;
    const wx = cam.x + ev.clientX / escala, wy = cam.y + ev.clientY / escala;
    const f = faseDeX(wx);
    const alvo = f.casas.find(c => wx > c.x && wx < c.x + c.w && wy > c.y && wy < c.y + c.h + 30) || f.npcs.find(n => Math.hypot(n.x - wx, n.y - wy) < 40);
    if (alvo) interage();
  });

  /* ---------- teclado ---------- */
  const MAPA_TECLAS = { ArrowUp: 'cima', ArrowDown: 'baixo', ArrowLeft: 'esq', ArrowRight: 'dir', w: 'cima', s: 'baixo', a: 'esq', d: 'dir', Shift: 'correr' };
  document.addEventListener('keydown', ev => {
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    const campo = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
    if (ev.key === 'Escape') { if (dialogoAberto) fechaDialogo(); else if (janelaAberta) fechaJanela(); else abreJanela('menu'); ev.preventDefault(); return; }
    if (dialogoAberto) {
      if (/^[1-9]$/.test(ev.key)) { const b = D.op.children[+ev.key - 1]; if (b && !b.disabled) { b.click(); ev.preventDefault(); } }
      return;
    }
    if (janelaAberta || campo) return;
    if (MAPA_TECLAS[k]) { teclas[MAPA_TECLAS[k]] = true; ev.preventDefault(); }
    else if (k === ' ') { if (P.pulo === 0) { P.vpulo = 320; P.pulo = 1; } ev.preventDefault(); }
    else if (k === 'e' || k === 'Enter') { interage(); ev.preventDefault(); }
    else if (k === 'm') abreJanela('mapa'); else if (k === 'i') abreJanela('inventario'); else if (k === 'b') abreJanela('biblioteca');
    else if (k === 'r') $('#b-reiniciar').click();
  });
  document.addEventListener('keyup', ev => { const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key; if (MAPA_TECLAS[k]) teclas[MAPA_TECLAS[k]] = false; });
  window.addEventListener('blur', () => { for (const k in teclas) teclas[k] = false; });

  /* ---------- volta do jogo: confere o progresso registrado ---------- */
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { confereJogos(); hud(); } });
  window.addEventListener('focus', () => { confereJogos(); hud(); });
  window.addEventListener('storage', ev => { if (ev.key === 'md-progresso-v1') { confereJogos(); hud(); } });
  setInterval(() => { S.x = P.x; S.y = P.y; salvar(); }, 10000);
  window.addEventListener('pagehide', () => { S.x = P.x; S.y = P.y; salvar(); });

  cv.tabIndex = 0;
  window.MUNDO_DEBUG = { P, fases, interage, S: () => S };
  if (!liberada(faseDeX(P.x))) { P.x = fases[0].x0 + 150; P.y = RUA_Y + 35; }
  hud(); confereJogos(); confereFases();
  if (!S.tempo) setTimeout(() => aviso('🌍 Explore o mundo e descubra os desafios!'), 400);
  requestAnimationFrame(desenha);
})();
