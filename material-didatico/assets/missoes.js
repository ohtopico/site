/* =====================================================================
   Missões do dia, pontos e níveis — para quem tem perfil no Meu progresso.
   Tudo fica no navegador, dentro do perfil do MDP (campo jg). Sem cadastro.
   Depende de dados.js e progresso.js. comum.js carrega este arquivo sozinho;
   páginas que usam window.MDM logo de cara incluem o <script> direto.

   Pontos = atividades diferentes feitas + medalhas + estrelas secretas + missões.
   Seções travadas por nível: qualquer elemento com data-nivel="N" fica bloqueado
   até o estudante chegar ao nível N (MDM.travar() aplica; roda sozinho no carregamento).
   ===================================================================== */
(function () {
  if (window.MDM || !window.MDP || typeof REC === 'undefined') return;
  const BASE = window.MD_BASE || '';
  const hoje = MDP.hoje;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const PONTOS = { atividade: 5, medalha: 20, estrela: 10, bonus: 15 };

  /* Níveis com nomes de unidades de informação, na linha da série Bit a Bit */
  const NIVEIS = [
    { n: 1, nome: 'Bit', min: 0 },
    { n: 2, nome: 'Nibble', min: 60 },
    { n: 3, nome: 'Byte', min: 150 },
    { n: 4, nome: 'Kilobyte', min: 280 },
    { n: 5, nome: 'Megabyte', min: 450 },
    { n: 6, nome: 'Gigabyte', min: 680 },
    { n: 7, nome: 'Terabyte', min: 960 },
    { n: 8, nome: 'Petabyte', min: 1300 }
  ];

  /* O que cada nível libera. emBreve: seção ainda em preparação. */
  const DESBLOQUEIOS = [
    { nivel: 2, id: 'cor', nome: 'Cor do perfil', desc: 'Escolha verde, vermelho ou amarelo para o seu cartão de missões.' },
    { nivel: 3, id: 'extra', nome: 'Missão extra', desc: 'Uma quarta missão por dia, mais difícil, que vale 30 pontos.' },
    { nivel: 4, id: 'trocar', nome: 'Trocar missão', desc: 'Troque uma missão do dia por outra, uma vez por dia.' },
    { nivel: 5, id: 'sala', nome: 'Sala dos desafios', desc: 'Uma seção do site só para quem chegou ao nível Megabyte.', emBreve: true },
    { nivel: 6, id: 'antecipado', nome: 'Acesso antecipado', desc: 'Jogos e simuladores novos antes de todo mundo.', emBreve: true }
  ];

  const CORES = [
    { id: 'verde', nome: 'Verde', cor: '#166c40', txt: '#ffffff' },
    { id: 'vermelho', nome: 'Vermelho', cor: '#c21f3a', txt: '#ffffff' },
    { id: 'amarelo', nome: 'Amarelo', cor: '#f2c230', txt: '#111111' }
  ];

  /* ---------- missões ----------
     ok(a, p): a = atividade do dia ({ regs: [{ rec, pct, novo }], vis: [rec] }) */
  const tem = (a, f) => a.regs.some(f);
  const MISSOES = [
    { id: 'jogo', pts: 10, txt: 'Jogue um jogo até o fim', link: 'catalogo.html?tipo=jogo', ok: a => tem(a, x => x.rec.tipo === 'jogo') },
    { id: 'lista', pts: 15, txt: 'Responda uma lista de exercícios', link: 'catalogo.html?tipo=lista', ok: a => tem(a, x => x.rec.tipo === 'lista') },
    { id: 'nota80', pts: 20, txt: 'Tire 80% ou mais em um jogo ou lista', link: 'catalogo.html?tipo=lista', ok: a => tem(a, x => x.pct >= 80) },
    { id: 'novo', pts: 15, txt: 'Faça uma atividade que você nunca tinha feito', link: 'catalogo.html', ok: a => tem(a, x => x.novo) },
    { id: 'refazer', pts: 15, txt: 'Refaça uma atividade de outro dia', link: 'meu-progresso.html', ok: a => tem(a, x => !x.novo) },
    { id: 'lab3d', pts: 10, txt: 'Explore um recurso 3D', link: 'catalogo.html?tipo=3d', ok: a => a.vis.some(r => r.tipo === '3d') },
    { id: 'co', pts: 10, txt: 'Pratique Computação em um jogo ou lista', link: 'computacao/', ok: a => tem(a, x => x.rec.comp.includes('CO')) },
    { id: 'ma', pts: 10, txt: 'Pratique Matemática em um jogo ou lista', link: 'matematica/', ok: a => tem(a, x => x.rec.comp.includes('MA')) },
    { id: 'duas', pts: 15, txt: 'Faça duas atividades diferentes', link: 'catalogo.html', ok: a => a.regs.length >= 2 },
    { id: 'ano', pts: 10, txt: 'Faça uma atividade do seu ano', link: p => `catalogo.html?ano=${p.ano || 6}`, ok: (a, p) => tem(a, x => x.rec.anos.includes(p.ano || 6)) }
  ];
  const EXTRAS = [
    { id: 'x-tres', pts: 30, extra: true, txt: 'Faça três atividades diferentes', link: 'catalogo.html', ok: a => a.regs.length >= 3 },
    { id: 'x-cem', pts: 30, extra: true, txt: 'Acerte 100% de uma lista de exercícios', link: 'catalogo.html?tipo=lista', ok: a => tem(a, x => x.rec.tipo === 'lista' && x.pct >= 100) },
    { id: 'x-dupla', pts: 30, extra: true, txt: 'Pratique Computação e Matemática no mesmo dia', link: 'catalogo.html', ok: a => tem(a, x => x.rec.comp.includes('CO')) && tem(a, x => x.rec.comp.includes('MA')) },
    { id: 'x-tres3d', pts: 30, extra: true, txt: 'Explore três recursos 3D diferentes', link: 'catalogo.html?tipo=3d', ok: a => new Set(a.vis.filter(r => r.tipo === '3d').map(r => r.id)).size >= 3 }
  ];
  const TODAS = {}; MISSOES.concat(EXTRAS).forEach(m => { TODAS[m.id] = m; });

  /* sorteio estável: o mesmo perfil vê as mesmas missões o dia todo */
  function sorteio(semente) {
    let h = 2166136261;
    for (const c of semente) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; };
  }
  function embaralhar(lista, rnd) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }

  /* ---------- estado no perfil ---------- */
  function jgDe(p) {
    const jg = p.jg || {};
    return {
      desde: jg.desde || hoje(), pts: jg.pts || 0, dias: jg.dias || {}, vd: jg.vd || {},
      tr: jg.tr || {}, nv: jg.nv || 0, cor: jg.cor || ''
    };
  }
  function salvar(jg) { MDP.atualizar({ jg }); }

  function missoesDoDia(p, d, nivelN) {
    const jg = jgDe(p);
    const rnd = sorteio(p.id + ':' + d);
    const base = embaralhar(MISSOES, rnd);
    let lista = base.slice(0, 3);
    const t = jg.tr[d];
    if (t && TODAS[t.para]) lista = lista.map(m => (m.id === t.de ? TODAS[t.para] : m));
    if ((nivelN || nivel(p).n) >= 3) lista.push(EXTRAS[Math.floor(rnd() * EXTRAS.length)]);
    return lista;
  }

  function atividadeDia(p, d) {
    const regs = [];
    Object.entries(p.r || {}).forEach(([id, r]) => {
      if (!REC[id] || !r || !Array.isArray(r.h)) return;
      const e = r.h.find(x => x[0] === d);
      if (e) regs.push({ rec: REC[id], pct: e[1], novo: r.h[0][0] === d });
    });
    const vis = (jgDe(p).vd[d] || []).filter(id => REC[id]).map(id => REC[id]);
    return { regs, vis };
  }

  /* ---------- pontos e nível ---------- */
  function estrelas(p) {
    try {
      const s = JSON.parse(localStorage.getItem('ohtopico-estrelas-v1'));
      return Object.keys(((s && s.perfis && s.perfis[p.id]) || {}).a || {}).length;
    } catch (e) { return 0; }
  }
  function pontos(p) {
    p = p || MDP.perfil();
    if (!p) return { atividades: 0, medalhas: 0, estrelas: 0, missoes: 0, total: 0, n: { atividades: 0, medalhas: 0, estrelas: 0 } };
    const n = {
      atividades: Object.keys(p.r || {}).filter(id => REC[id]).length,
      medalhas: MDP.medalhas(p).filter(m => m.tem).length,
      estrelas: estrelas(p)
    };
    const o = {
      atividades: n.atividades * PONTOS.atividade, medalhas: n.medalhas * PONTOS.medalha,
      estrelas: n.estrelas * PONTOS.estrela, missoes: jgDe(p).pts, n
    };
    o.total = o.atividades + o.medalhas + o.estrelas + o.missoes;
    return o;
  }
  function nivelPorPontos(total) {
    let i = 0;
    NIVEIS.forEach((l, k) => { if (total >= l.min) i = k; });
    const atual = NIVEIS[i], prox = NIVEIS[i + 1] || null;
    return Object.assign({}, atual, {
      total, prox,
      falta: prox ? prox.min - total : 0,
      pct: prox ? Math.round((total - atual.min) / (prox.min - atual.min) * 100) : 100
    });
  }
  function nivel(p) { return nivelPorPontos(pontos(p).total); }

  /* ---------- avaliação: credita missões cumpridas (hoje e até 6 dias para trás) ---------- */
  function verificar(silencioso) {
    const p = MDP.perfil();
    if (!p) return { novas: [], bonus: false };
    const jg = jgDe(p);
    const d = hoje(), nv = nivel(p).n;
    const novas = []; let bonus = false;
    for (let dia = Math.max(jg.desde, d - 6); dia <= d; dia++) {
      const lista = missoesDoDia(Object.assign({}, p, { jg }), dia, nv);
      const a = atividadeDia(Object.assign({}, p, { jg }), dia);
      const reg = jg.dias[dia] || { ok: [] };
      lista.forEach(m => {
        if (!reg.ok.includes(m.id) && m.ok(a, p)) { reg.ok.push(m.id); jg.pts += m.pts; if (dia === d) novas.push(m); }
      });
      if (!reg.b && lista.every(m => reg.ok.includes(m.id))) { reg.b = 1; jg.pts += PONTOS.bonus; if (dia === d) bonus = true; }
      if (reg.ok.length) jg.dias[dia] = reg;
    }
    // limpa o que não é mais usado
    Object.keys(jg.dias).forEach(k => { if (+k < d - 400) delete jg.dias[k]; });
    Object.keys(jg.vd).forEach(k => { if (+k < d - 7) delete jg.vd[k]; });
    Object.keys(jg.tr).forEach(k => { if (+k < d - 7) delete jg.tr[k]; });
    const pAtual = Object.assign({}, p, { jg });
    const nvNovo = nivel(pAtual).n;
    const subiu = jg.nv && nvNovo > jg.nv ? nvNovo : 0;
    jg.nv = nvNovo;
    if (!p.jg || novas.length || bonus || subiu || JSON.stringify(p.jg) !== JSON.stringify(jg)) salvar(jg);
    if (!silencioso) {
      if (novas.length) aviso(`+${novas.reduce((s, m) => s + m.pts, 0) + (bonus ? PONTOS.bonus : 0)}`,
        `Missão cumprida: ${novas[0].txt}${novas.length > 1 ? ` (+${novas.length - 1})` : ''}`,
        bonus ? `Todas as missões de hoje feitas: +${PONTOS.bonus} de bônus.` : 'Ver minhas missões');
      if (subiu) {
        const l = NIVEIS[subiu - 1], lib = DESBLOQUEIOS.filter(x => x.nivel === subiu);
        aviso(`N${subiu}`, `Você chegou ao nível ${l.nome}`, lib.length ? `Desbloqueado: ${lib.map(x => x.nome).join(', ')}.` : 'Ver minhas missões');
      }
      atualizarBarra();
    }
    return { novas, bonus, subiu };
  }

  /* Visita a uma página de recurso (3D, plano, ficha, lista, jogo) */
  function visitar(id) {
    const p = MDP.perfil();
    if (!p || !id || !REC[id]) return;
    const jg = jgDe(p), d = hoje();
    const v = jg.vd[d] || [];
    if (!v.includes(id)) { v.push(id); jg.vd[d] = v; salvar(jg); }
  }

  /* Troca uma missão de hoje que ainda não foi cumprida (nível 4) */
  function trocar(idMissao) {
    const p = MDP.perfil();
    if (!p || nivel(p).n < 4) return false;
    const jg = jgDe(p), d = hoje();
    if (jg.tr[d] || (jg.dias[d] && jg.dias[d].ok.includes(idMissao))) return false;
    const atuais = missoesDoDia(p, d).map(m => m.id);
    const opcoes = MISSOES.filter(m => !atuais.includes(m.id));
    if (!opcoes.length) return false;
    const para = opcoes[Math.floor(sorteio(p.id + ':troca:' + d)() * opcoes.length)];
    jg.tr[d] = { de: idMissao, para: para.id };
    salvar(jg);
    verificar();
    return true;
  }

  function escolherCor(id) {
    const p = MDP.perfil();
    if (!p || nivel(p).n < 2) return false;
    const jg = jgDe(p); jg.cor = CORES.some(c => c.id === id) ? id : ''; salvar(jg);
    return true;
  }

  function sequencia(p) {
    const jg = jgDe(p), d = hoje();
    let k = jg.dias[d] && jg.dias[d].ok.length ? d : d - 1, n = 0;
    while (jg.dias[k] && jg.dias[k].ok.length) { n++; k--; }
    return n;
  }

  /* Resumo para as páginas */
  function estado() {
    const p = MDP.perfil();
    if (!p) return null;
    const jg = jgDe(p), d = hoje(), pts = pontos(p), nv = nivelPorPontos(pts.total);
    const reg = jg.dias[d] || { ok: [] };
    const lista = missoesDoDia(p, d, nv.n).map(m => Object.assign({}, m, {
      feita: reg.ok.includes(m.id), url: BASE + (typeof m.link === 'function' ? m.link(p) : m.link)
    }));
    return {
      perfil: p, pontos: pts, nivel: nv, missoes: lista, bonus: !!reg.b, sequencia: sequencia(p),
      trocou: !!jg.tr[d], cor: CORES.find(c => c.id === jg.cor) || null,
      desbloqueios: DESBLOQUEIOS.map(x => Object.assign({ livre: nv.n >= x.nivel }, x))
    };
  }

  /* ---------- seções travadas por nível ---------- */
  function travar(raiz) {
    const p = MDP.perfil(), n = p ? nivel(p).n : 0;
    (raiz || document).querySelectorAll('[data-nivel]').forEach(el => {
      const req = +el.dataset.nivel || 1, livre = n >= req;
      el.classList.toggle('md-travado', !livre);
      let selo = el.querySelector(':scope > .md-trava');
      if (livre) { if (selo) selo.remove(); el.removeAttribute('aria-disabled'); return; }
      el.setAttribute('aria-disabled', 'true');
      if (!selo) {
        selo = document.createElement('a');
        selo.className = 'md-trava';
        selo.href = BASE + 'missoes.html';
        el.prepend(selo);
      }
      selo.textContent = `Desbloqueia no nível ${req} (${NIVEIS[req - 1].nome})${p ? '' : ': crie seu perfil'}`;
    });
  }
  document.addEventListener('click', e => {
    const el = e.target.closest('.md-travado');
    if (el && !e.target.closest('.md-trava')) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  /* ---------- avisos e barra superior ---------- */
  function aviso(selo, titulo, sub) {
    const el = document.createElement('a');
    el.className = 'md-toast md-toast-mis'; el.href = BASE + 'missoes.html'; el.setAttribute('role', 'status');
    el.innerHTML = `<span class="md-toast-pts">${esc(selo)}</span><span><strong>${esc(titulo)}</strong><br><span class="small">${esc(sub)}</span></span>`;
    document.body.appendChild(el);
    // empilha acima de outros avisos (medalhas)
    let base = 16;
    document.querySelectorAll('.md-toast').forEach(t => { if (t !== el) base = Math.max(base, window.innerHeight - t.getBoundingClientRect().top + 10); });
    el.style.bottom = base + 'px';
    setTimeout(() => el.classList.add('out'), 6000);
    setTimeout(() => el.remove(), 6600);
  }

  function atualizarBarra() {
    const bar = document.getElementById('topbar');
    if (!bar || !bar.innerHTML) return;
    let a = bar.querySelector('.mis-btn');
    if (!a) {
      a = document.createElement('a');
      a.className = 'icon-btn mis-btn';
      a.href = BASE + 'missoes.html';
      const ref = bar.querySelector('.prog-btn');
      ref ? bar.insertBefore(a, ref) : bar.appendChild(a);
    }
    if (location.pathname.endsWith('/missoes.html')) a.setAttribute('aria-current', 'page');
    const e = estado();
    if (!e) { a.innerHTML = 'Missões'; a.setAttribute('aria-label', 'Missões do dia'); a.title = 'Missões do dia'; return; }
    const feitas = e.missoes.filter(m => m.feita).length;
    a.innerHTML = `<span class="mis-nv">N${e.nivel.n}</span><span class="mis-txt">${feitas}/${e.missoes.length} missões</span>`;
    a.setAttribute('aria-label', `Nível ${e.nivel.n}, ${e.nivel.nome}. ${feitas} de ${e.missoes.length} missões de hoje feitas`);
    a.title = `Nível ${e.nivel.n} · ${e.nivel.nome} · ${e.pontos.total} pontos`;
    if (e.cor) { a.style.setProperty('--mis-cor', e.cor.cor); a.style.setProperty('--mis-txt', e.cor.txt); }
  }

  /* jogos e listas chamam MDP.registrar no fim: confere as missões logo depois */
  const registrarOriginal = MDP.registrar;
  MDP.registrar = function () { const r = registrarOriginal.apply(this, arguments); verificar(); return r; };

  window.MDM = { NIVEIS, DESBLOQUEIOS, CORES, PONTOS, MISSOES, EXTRAS, pontos, nivel, nivelPorPontos, estado,
    verificar, visitar, trocar, escolherCor, travar, atualizarBarra };

  function iniciar() {
    const rec = window.MD_REC || (/\/(lista|ficha|plano)\.html$/.test(location.pathname) && new URLSearchParams(location.search).get('id'));
    if (rec) visitar(rec);
    verificar();
    travar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
