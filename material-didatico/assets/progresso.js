/* =====================================================================
   Progresso do estudante — tudo fica no navegador (localStorage), sem cadastro.
   Nenhum dado pessoal é coletado: só um apelido escolhido pelo estudante.
   Depende de dados.js (RECURSOS, REC, HABILIDADES, HAB). listas.js é opcional.

   Níveis de domínio por habilidade:
     0 Não iniciado · 1 Tentou · 2 Familiarizado (≥ 60%) · 3 Proficiente (≥ 80%)
     4 Dominado (voltou a fazer ≥ 80% pelo menos 2 dias depois de ficar proficiente)
   O teste do ano (teste-do-ano.html) registra uma nota por habilidade em p.t e conta como mais uma atividade.
   ===================================================================== */
(function () {
  const KEY = 'md-progresso-v1';
  const DIA = 864e5;
  const hoje = () => Math.floor(Date.now() / DIA);
  const SALT = 'ohtopico-progresso';

  const NIVEIS = [
    { nome: 'Não iniciado', curto: '—' },
    { nome: 'Tentou', curto: 'Tentou' },
    { nome: 'Familiarizado', curto: 'Familiar' },
    { nome: 'Proficiente', curto: 'Proficiente' },
    { nome: 'Dominado', curto: 'Dominado' }
  ];

  /* ---------- armazenamento ---------- */
  let mem = null; // cópia em memória se o navegador bloquear o localStorage
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.perfis) return s; } catch (e) {}
    return mem || { atual: null, perfis: {} };
  }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  const novoId = () => 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

  function perfilAtual(criar) {
    const s = load();
    let p = s.atual && s.perfis[s.atual];
    if (!p && criar) {
      const id = novoId();
      p = s.perfis[id] = { id, apelido: 'Estudante', ano: 6, criado: hoje(), r: {} };
      s.atual = id; save(s);
    }
    return p || null;
  }
  function salvarPerfil(p) { const s = load(); s.perfis[p.id] = p; s.atual = s.atual || p.id; save(s); }

  /* ---------- registro ---------- */
  function registrar(recId, pct) {
    if (!REC[recId]) return;
    pct = Math.max(0, Math.min(100, Math.round(Number(pct) || 0)));
    const p = perfilAtual(true);
    const r = p.r[recId] || { b: 0, n: 0, h: [] };
    r.b = Math.max(r.b, pct); r.n++;
    r.h.push([hoje(), pct]);
    // guarda o histórico essencial: a melhor nota de cada dia, no máximo 12 dias
    const porDia = {};
    r.h.forEach(([d, v]) => { porDia[d] = Math.max(porDia[d] || 0, v); });
    r.h = Object.entries(porDia).map(([d, v]) => [+d, v]).sort((a, b) => a[0] - b[0]).slice(-12);
    p.r[recId] = r;
    salvarPerfil(p);
    avisoMedalhas(p);
  }

  // melhor nota de cada dia, no máximo 12 dias
  const porDia = h => {
    const d = {};
    h.forEach(([dia, v]) => { d[dia] = Math.max(d[dia] || 0, Math.min(100, +v || 0)); });
    return Object.entries(d).map(([dia, v]) => [+dia, v]).sort((a, b) => a[0] - b[0]).slice(-12);
  };

  /* Teste do ano: notas = { habilidade: % }. Acertar tudo de uma habilidade conta como 100% nela. */
  function registrarTeste(notas) {
    const p = perfilAtual(true);
    p.t = p.t || {};
    Object.entries(notas).forEach(([c, v]) => {
      if (!HAB[c]) return;
      p.t[c] = porDia([...(p.t[c] || []), [hoje(), Math.round(v)]]);
    });
    salvarPerfil(p);
    avisoMedalhas(p);
  }

  /* ---------- domínio ---------- */
  function infoHab(codigo, p) {
    p = p || perfilAtual(false);
    if (!p) return { nivel: 0 };
    const recs = RECURSOS.filter(r => r.habs.includes(codigo) && p.r[r.id]);
    const teste = (p.t && p.t[codigo]) || [];
    if (!recs.length && !teste.length) return { nivel: 0 };
    const hist = [...recs.flatMap(r => p.r[r.id].h), ...teste].sort((a, b) => a[0] - b[0]);
    const best = Math.max(...recs.map(r => p.r[r.id].b), ...teste.map(x => x[1]));
    const ult = hist.length ? hist[hist.length - 1][0] : null;
    const prof = hist.find(([, v]) => v >= 80);
    let nivel = best >= 80 ? 3 : best >= 60 ? 2 : 1;
    if (prof && hist.some(([d, v]) => v >= 80 && d >= prof[0] + 2)) nivel = 4;
    return { nivel, best, ult, profDia: prof ? prof[0] : null };
  }
  const nivelHab = (c, p) => infoHab(c, p).nivel;

  /* Habilidades que pedem revisão: proficientes há 2+ dias (para chegar a Dominado)
     ou dominadas sem prática há 21+ dias. */
  function revisoes(p) {
    p = p || perfilAtual(false);
    if (!p) return [];
    const d = hoje();
    return HABILIDADES.map(h => ({ h, i: infoHab(h.codigo, p) }))
      .filter(({ i }) => (i.nivel === 3 && i.profDia !== null && d >= i.profDia + 2) || (i.nivel === 4 && d - i.ult >= 21))
      .map(({ h, i }) => ({ codigo: h.codigo, nivel: i.nivel }));
  }

  /* Recurso sugerido para uma habilidade: lista ou jogo ainda não feito ou com a nota mais baixa.
     Sem lista nem jogo, vale um recurso 3D (eles também contam no progresso). */
  function recursoPara(codigo, p) {
    p = p || perfilAtual(false);
    const daHab = RECURSOS.filter(r => r.habs.includes(codigo));
    let recs = daHab.filter(r => r.tipo === 'lista' || r.tipo === 'jogo');
    if (!recs.length) recs = daHab.filter(r => r.tipo === '3d');
    if (!recs.length) return null;
    const nota = r => (p && p.r[r.id]) ? p.r[r.id].b : -1;
    return recs.slice().sort((a, b) => nota(a) - nota(b) || (a.tipo === 'lista' ? -1 : 1))[0];
  }

  /* ---------- medalhas ---------- */
  const MEDALHAS = [
    { id: 'inicio', icone: '👣', nome: 'Primeiro passo', desc: 'Fez a primeira atividade.' },
    { id: 'lista1', icone: '📝', nome: 'Mão na massa', desc: 'Concluiu a primeira lista de exercícios.' },
    { id: 'jogo1', icone: '🎮', nome: 'Jogador(a)', desc: 'Terminou o primeiro jogo.' },
    { id: 'cem', icone: '💯', nome: 'Gabaritou', desc: 'Acertou 100% das questões objetivas de uma lista.' },
    { id: 'listas5', icone: '📚', nome: 'Estudioso(a)', desc: 'Fez 5 listas diferentes.' },
    { id: 'jogos5', icone: '🕹️', nome: 'Explorador(a) de jogos', desc: 'Jogou 5 jogos diferentes.' },
    { id: 'prof1', icone: '⭐', nome: 'Proficiente', desc: 'Chegou a Proficiente em uma habilidade.' },
    { id: 'dom1', icone: '🏅', nome: 'Domínio', desc: 'Dominou uma habilidade revisando dias depois.' },
    { id: 'prof10', icone: '🌟', nome: 'Constelação', desc: 'Chegou a Proficiente em 10 habilidades.' },
    { id: 'dias3', icone: '📅', nome: 'Constância', desc: 'Estudou em 3 dias diferentes.' },
    { id: 'duas', icone: '🔀', nome: 'Duas frentes', desc: 'Praticou Computação e Matemática.' },
    { id: 'ano', icone: '🏆', nome: 'Ano completo', desc: 'Proficiente em todas as habilidades de Computação de um ano.' },
    { id: 'teste', icone: '🎯', nome: 'Desafio do ano', desc: 'Fez um teste do ano.' }
  ];
  function medalhas(p) {
    p = p || perfilAtual(false);
    const ids = p ? Object.keys(p.r).filter(id => REC[id]) : [];
    const tipo = t => ids.filter(id => REC[id].tipo === t);
    const niv = {};
    HABILIDADES.forEach(h => { niv[h.codigo] = p ? nivelHab(h.codigo, p) : 0; });
    const prof = Object.values(niv).filter(n => n >= 3).length;
    const dias = new Set(ids.flatMap(id => p.r[id].h.map(x => x[0]))).size;
    const comps = new Set(ids.flatMap(id => REC[id].comp));
    const anoOk = [6, 7, 8, 9].some(a => { const hs = HABILIDADES.filter(h => h.comp === 'CO' && h.ano === a); return hs.length && hs.every(h => niv[h.codigo] >= 3); });
    const tem = {
      inicio: ids.length > 0, lista1: tipo('lista').length > 0, jogo1: tipo('jogo').length > 0,
      cem: tipo('lista').some(id => p.r[id].b === 100), listas5: tipo('lista').length >= 5, jogos5: tipo('jogo').length >= 5,
      prof1: prof >= 1, dom1: Object.values(niv).some(n => n === 4), prof10: prof >= 10, dias3: dias >= 3,
      duas: comps.has('CO') && comps.has('MA'), ano: anoOk, teste: !!(p && p.t && Object.keys(p.t).length)
    };
    return MEDALHAS.map(m => Object.assign({ tem: !!tem[m.id] }, m));
  }

  /* Aviso discreto quando uma medalha nova é conquistada */
  function avisoMedalhas(p) {
    const ganhas = medalhas(p).filter(m => m.tem).map(m => m.id);
    const vistas = p.vistas || [];
    const novas = ganhas.filter(id => !vistas.includes(id));
    if (!novas.length) return;
    p.vistas = ganhas; salvarPerfil(p);
    const m = MEDALHAS.find(x => x.id === novas[0]);
    const base = window.MD_BASE || '';
    const el = document.createElement('a');
    el.className = 'md-toast'; el.href = base + 'meu-progresso.html'; el.setAttribute('role', 'status');
    el.innerHTML = `<span class="md-toast-i">${m.icone}</span><span><strong>Medalha nova: ${m.nome}</strong><br><span class="small">${m.desc}${novas.length > 1 ? ` (+${novas.length - 1})` : ''} Ver meu progresso →</span></span>`;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('out'), 6000);
    setTimeout(() => el.remove(), 6600);
  }

  /* ---------- códigos (levar a outro aparelho / relatório) ---------- */
  const b64 = {
    enc: bytes => { let s = ''; bytes.forEach(b => { s += String.fromCharCode(b); }); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); },
    dec: str => { str = str.replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '='; const s = atob(str); return Uint8Array.from(s, c => c.charCodeAt(0)); }
  };
  async function pipe(bytes, Stream, modo) {
    const st = new Blob([bytes]).stream().pipeThrough(new Stream(modo));
    return new Uint8Array(await new Response(st).arrayBuffer());
  }
  async function empacotar(prefixo, obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    if (typeof CompressionStream !== 'undefined') return prefixo + 'z.' + b64.enc(await pipe(bytes, CompressionStream, 'deflate-raw'));
    return prefixo + 'j.' + b64.enc(bytes);
  }
  /* Descompactador "deflate" em JavaScript puro, para celulares sem DecompressionStream
     (iPhone com iOS anterior ao 16.4): sem ele, o código gerado no computador não abria no celular. */
  function inflar(src) {
    let pos = 0, bit = 0, nb = 0, out = [];
    const bits = n => { while (nb < n) { if (pos >= src.length) throw new Error('formato'); bit |= src[pos++] << nb; nb += 8; } const v = bit & ((1 << n) - 1); bit >>>= n; nb -= n; return v; };
    // tabela de Huffman canônica: quantidade de códigos por tamanho + símbolos em ordem
    const tabela = (lens, ini, n) => {
      const cont = new Uint16Array(16), offs = new Uint16Array(16), sim = new Uint16Array(n);
      for (let i = 0; i < n; i++) cont[lens[ini + i]]++;
      cont[0] = 0;
      for (let i = 1; i < 16; i++) offs[i] = offs[i - 1] + cont[i - 1];
      for (let i = 0; i < n; i++) if (lens[ini + i]) sim[offs[lens[ini + i]]++] = i;
      return { cont, sim };
    };
    const ler = t => {
      let cod = 0, primeiro = 0, idx = 0;
      for (let len = 1; len < 16; len++) {
        cod |= bits(1); const c = t.cont[len];
        if (cod - primeiro < c) return t.sim[idx + cod - primeiro];
        idx += c; primeiro = (primeiro + c) << 1; cod <<= 1;
      }
      throw new Error('formato');
    };
    const LB = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
    const LX = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
    const DB = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    const DX = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    const fixa = new Uint8Array(320);
    fixa.fill(8, 0, 144); fixa.fill(9, 144, 256); fixa.fill(7, 256, 280); fixa.fill(8, 280, 288); fixa.fill(5, 288, 320);
    const fixaL = tabela(fixa, 0, 288), fixaD = tabela(fixa, 288, 32);
    const ORDEM = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    let fim;
    do {
      fim = bits(1);
      const tipo = bits(2);
      if (tipo === 0) {
        bit = 0; nb = 0;
        const len = src[pos] | (src[pos + 1] << 8); pos += 4;
        for (let i = 0; i < len; i++) out.push(src[pos++]);
        continue;
      }
      let tl = fixaL, td = fixaD;
      if (tipo === 2) {
        const hl = bits(5) + 257, hd = bits(5) + 1, hc = bits(4) + 4;
        const cl = new Uint8Array(19);
        for (let i = 0; i < hc; i++) cl[ORDEM[i]] = bits(3);
        const tc = tabela(cl, 0, 19), lens = new Uint8Array(hl + hd);
        for (let i = 0; i < hl + hd;) {
          const s = ler(tc);
          if (s < 16) lens[i++] = s;
          else { const [rep, v] = s === 16 ? [3 + bits(2), lens[i - 1]] : s === 17 ? [3 + bits(3), 0] : [11 + bits(7), 0]; for (let k = 0; k < rep; k++) lens[i++] = v; }
        }
        tl = tabela(lens, 0, hl); td = tabela(lens, hl, hd);
      } else if (tipo !== 1) throw new Error('formato');
      for (;;) {
        const s = ler(tl);
        if (s < 256) out.push(s);
        else if (s === 256) break;
        else {
          const len = LB[s - 257] + bits(LX[s - 257]), d = ler(td), dist = DB[d] + bits(DX[d]);
          for (let i = 0; i < len; i++) out.push(out[out.length - dist]);
        }
      }
    } while (!fim);
    return new Uint8Array(out);
  }
  async function desempacotar(prefixo, code) {
    code = String(code || '').trim().replace(/\s+/g, '');
    if (!code.startsWith(prefixo)) throw new Error('formato');
    const resto = code.slice(prefixo.length), modo = resto[0], dados = resto.slice(2);
    let bytes = b64.dec(dados);
    if (modo === 'z') {
      bytes = typeof DecompressionStream === 'undefined' ? inflar(bytes) : await pipe(bytes, DecompressionStream, 'deflate-raw');
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  async function assinatura(txt) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt + '|' + SALT));
    return [...new Uint8Array(buf)].slice(0, 4).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Código completo do perfil, para continuar em outro aparelho
  async function exportar() {
    const p = perfilAtual(false);
    if (!p) return '';
    return empacotar('MDP1', { a: p.apelido, y: p.ano, c: p.criado, r: p.r, v: p.vistas || [], g: p.jg, t: p.t });
  }
  async function importar(code) {
    const o = await desempacotar('MDP1', code);
    if (!o || typeof o.r !== 'object') throw new Error('formato');
    const s = load();
    // junta com um perfil de mesmo apelido, se existir; senão cria outro
    let p = Object.values(s.perfis).find(x => x.apelido.toLowerCase() === String(o.a || '').toLowerCase());
    if (!p) { const id = novoId(); p = s.perfis[id] = { id, apelido: String(o.a || 'Estudante').slice(0, 30), ano: o.y || 6, criado: o.c || hoje(), r: {} }; }
    Object.entries(o.r).forEach(([id, r]) => {
      if (!REC[id] || !r || !Array.isArray(r.h)) return;
      const cur = p.r[id] || { b: 0, n: 0, h: [] };
      const porDia = {};
      [...cur.h, ...r.h].forEach(([d, v]) => { porDia[d] = Math.max(porDia[d] || 0, Math.min(100, +v || 0)); });
      p.r[id] = { b: Math.max(cur.b, Math.min(100, +r.b || 0)), n: Math.max(cur.n, +r.n || 0),
        h: Object.entries(porDia).map(([d, v]) => [+d, v]).sort((a, b) => a[0] - b[0]).slice(-12) };
    });
    if (o.t && typeof o.t === 'object') {
      p.t = p.t || {};
      Object.entries(o.t).forEach(([c, h]) => { if (HAB[c] && Array.isArray(h)) p.t[c] = porDia([...(p.t[c] || []), ...h]); });
    }
    p.vistas = [...new Set([...(p.vistas || []), ...(o.v || [])])];
    // missões e pontos (missoes.js): fica o registro com mais pontos
    if (o.g && typeof o.g === 'object' && (+o.g.pts || 0) > ((p.jg && p.jg.pts) || 0)) p.jg = o.g;
    s.atual = p.id; save(s);
    return p;
  }

  // relatórios antigos (sem nível) continuam conferindo
  const camposAssinados = o => o.n === undefined ? [o.a, o.y, o.d, o.l, o.r] : [o.a, o.y, o.d, o.l, o.r, o.n];

  // Relatório resumido para a professora (níveis por habilidade e notas)
  async function relatorio() {
    const p = perfilAtual(false);
    if (!p) return '';
    const l = {};
    HABILIDADES.forEach(h => { const n = nivelHab(h.codigo, p); if (n) l[h.codigo] = n; });
    const r = {};
    Object.entries(p.r).forEach(([id, x]) => { if (REC[id]) r[id] = x.b; });
    const corpo = { a: p.apelido, y: p.ano, d: hoje(), l, r };
    // nível das missões (missoes.js): a professora vê quem pode ser monitor da turma
    if (window.MDM) corpo.n = MDM.nivel(p).n;
    corpo.s = await assinatura(JSON.stringify(camposAssinados(corpo)));
    return empacotar('MDR1', corpo);
  }
  async function lerRelatorio(code) {
    const o = await desempacotar('MDR1', code);
    const ok = o.s === await assinatura(JSON.stringify(camposAssinados(o)));
    return Object.assign(o, { valido: ok });
  }

  /* ---------- perfis ---------- */
  const perfis = () => Object.values(load().perfis);
  function criar(apelido, ano) {
    const s = load(), id = novoId();
    s.perfis[id] = { id, apelido: String(apelido || 'Estudante').slice(0, 30), ano: ano || 6, criado: hoje(), r: {} };
    s.atual = id; save(s); return s.perfis[id];
  }
  function trocar(id) { const s = load(); if (s.perfis[id]) { s.atual = id; save(s); } }
  function atualizar(campos) { const p = perfilAtual(true); Object.assign(p, campos); salvarPerfil(p); return p; }
  function excluir(id) {
    const s = load(); delete s.perfis[id];
    if (s.atual === id) s.atual = Object.keys(s.perfis)[0] || null;
    save(s);
  }
  function resultado(recId) { const p = perfilAtual(false); return p && p.r[recId] ? p.r[recId] : null; }

  window.MDP = { NIVEIS, MEDALHAS, hoje, registrar, registrarTeste, resultado, infoHab, nivelHab, revisoes, recursoPara, medalhas,
    perfil: () => perfilAtual(false), perfis, _inflar: inflar, criar, trocar, atualizar, excluir, exportar, importar, relatorio, lerRelatorio,
    pacote: { empacotar, desempacotar, assinatura } };   // usado pelo Mundo (código do modo turma)
})();
