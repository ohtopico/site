/* =====================================================================
   Jogos dos pequenos (1º ao 5º ano) — motor comum.
   Do 1º ao 3º ano o jogo não pede leitura: tudo é figura, cor, som e voz opcional.
   A instrução falada (botão do alto-falante) usa a voz do navegador; o jogo funciona sem ela.

   Uso numa página de jogo:
     <div id="pq"></div>
     <script src="../assets/figuras.js"></script><script src="../assets/pequenos.js"></script>
     <script>PQ.jogo({ id: 'id-do-recurso', leitura: false, personagem: 'robo', fases: [ { tipo: 'sequencia', ... }, ... ] });</script>

   Figura (spec): 'maca' · 'circulo:azul' (forma com cor) · '!gato' (riscada = negação) · { f, c, x } · { txt: '...' }
   Mecânicas: sequencia, faltando, classificar, escolha, vf, pares, mensagem, pintar, caminho, contar, criar,
              coordenada, binario, rgb, grafo, regras. Cada fase pode ter: fala (texto lido pela voz),
              pergunta (texto que aparece só nos jogos com leitura), e os campos da mecânica.
   ===================================================================== */
(function () {
  'use strict';
  const $ = (s, el) => (el || document).querySelector(s);
  const h = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const embaralhar = (a, fixo) => {
    const b = a.slice();
    if (fixo) return b;
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    // não deixa a ordem certa aparecer de cara
    if (b.length > 2 && b.every((x, i) => x === a[i])) return embaralhar(a);
    return b;
  };
  const igual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  const MOVIMENTO = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- figuras ---------- */
  const FG = window.FIG || { F: {}, FORMAS: {}, CORES: {}, NOMES: {} };
  function norm(s) {
    if (s && typeof s === 'object') return s;
    s = String(s);
    const o = {};
    if (s[0] === '!') { o.x = true; s = s.slice(1); }
    const [f, c] = s.split(':'); o.f = f; if (c) o.c = c;
    return o;
  }
  function nomeFig(s) {
    const o = norm(s);
    if (o.txt) return o.txt;
    if (o.cor && !o.f) return 'cor ' + o.cor;
    let n = FG.NOMES[o.f] || o.f;
    if (o.c) n += ' ' + o.c;
    return (o.x ? 'sem ' : '') + n;
  }
  function svgFig(s) {
    const o = norm(s);
    if (o.txt != null) return `<span class="pq-txt">${o.txt}</span>`;
    if (o.cor && !o.f) return `<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="cor ${o.cor}"><circle cx="50" cy="50" r="40" fill="${FG.CORES[o.cor] || o.cor}" stroke="#111" stroke-width="4"/></svg>`;
    let corpo = FG.FORMAS[o.f] ? FG.FORMAS[o.f].replace('{c}', FG.CORES[o.c] || o.c || '#fff') : (FG.F[o.f] || '');
    if (o.x) corpo += '<line x1="12" y1="12" x2="88" y2="88" stroke="#c21f3a" stroke-width="9" stroke-linecap="round"/>';
    return `<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="${nomeFig(o)}">${corpo}</svg>`;
  }
  const SETA = {
    d: 'M14 38 L56 38 L56 18 L88 50 L56 82 L56 62 L14 62 Z', e: 'M86 38 L44 38 L44 18 L12 50 L44 82 L44 62 L86 62 Z',
    c: 'M38 86 L38 44 L18 44 L50 12 L82 44 L62 44 L62 86 Z', b: 'M38 14 L38 56 L18 56 L50 88 L82 56 L62 56 L62 14 Z'
  };
  const ICONE = {
    ouvir: '<path d="M14 38 L32 38 L54 18 L54 82 L32 62 L14 62 Z" fill="#d6d6d2" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M66 34 Q76 50 66 66 M76 24 Q92 50 76 76" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>',
    dica: '<path d="M50 10 Q78 10 78 40 Q78 54 64 64 L64 74 L36 74 L36 64 Q22 54 22 40 Q22 10 50 10Z" fill="#ffd84d" stroke="#111" stroke-width="5"/><rect x="38" y="74" width="24" height="14" rx="3" fill="#d6d6d2" stroke="#111" stroke-width="5"/>',
    som: '<path d="M32 70 L32 24 L78 14 L78 60" fill="none" stroke="#111" stroke-width="6" stroke-linejoin="round"/><circle cx="24" cy="72" r="11" fill="#111"/><circle cx="70" cy="62" r="11" fill="#111"/>',
    ok: '<circle cx="50" cy="50" r="42" fill="#7cc97e" stroke="#111" stroke-width="5"/><path d="M28 52 L44 68 L74 34" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
    nao: '<circle cx="50" cy="50" r="42" fill="#ef6a5c" stroke="#111" stroke-width="5"/><path d="M32 32 L68 68 M68 32 L32 68" stroke="#111" stroke-width="8" stroke-linecap="round"/>',
    play: '<circle cx="50" cy="50" r="42" fill="#7cc97e" stroke="#111" stroke-width="5"/><path d="M40 30 L70 50 L40 70 Z" fill="#fff" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    apagar: '<path d="M30 20 L88 20 L88 80 L30 80 L8 50 Z" fill="#fff" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M44 38 L68 62 M68 38 L44 62" stroke="#c21f3a" stroke-width="7" stroke-linecap="round"/>',
    recomecar: '<path d="M78 50 A28 28 0 1 1 64 26" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round"/><path d="M56 10 L74 24 L54 36 Z" fill="#111"/>',
    estrela: '<path d="M50 6 L62 37 L95 38 L69 59 L78 92 L50 73 L22 92 L31 59 L5 38 L38 37 Z" fill="#ffd84d" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    estrelaVazia: '<path d="M50 6 L62 37 L95 38 L69 59 L78 92 L50 73 L22 92 L31 59 L5 38 L38 37 Z" fill="#fff" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    olho: '<path d="M8 50 Q50 10 92 50 Q50 90 8 50Z" fill="#fff" stroke="#111" stroke-width="5"/><circle cx="50" cy="50" r="16" fill="#7cbcf0" stroke="#111" stroke-width="5"/><circle cx="50" cy="50" r="6" fill="#111"/>',
    abre: '<path d="M30 14 L14 14 L14 86 L30 86" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
    fecha: '<path d="M70 14 L86 14 L86 86 L70 86" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
    ate: '<rect x="70" y="10" width="20" height="80" fill="#b7854f" stroke="#111" stroke-width="5"/><path d="M8 38 L40 38 L40 20 L64 50 L40 80 L40 62 L8 62 Z" fill="#7cbcf0" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    frente: '<path d="M38 86 L38 44 L18 44 L50 12 L82 44 L62 44 L62 86 Z" fill="#7cc97e" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    giraD: '<path d="M30 80 L30 50 Q30 26 54 26 L64 26" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/><path d="M60 8 L86 26 L60 44 Z" fill="#ffaa55" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    giraE: '<path d="M70 80 L70 50 Q70 26 46 26 L36 26" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/><path d="M40 8 L14 26 L40 44 Z" fill="#ffaa55" stroke="#111" stroke-width="5" stroke-linejoin="round"/>',
    desfazer: '<path d="M30 40 L70 40 Q88 40 88 60 Q88 80 68 80 L40 80" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round"/><path d="M38 20 L14 40 L38 60 Z" fill="#111"/>'
  };
  const ic = (n, rot) => `<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="${rot || n}">${ICONE[n]}</svg>`;
  const seta = (d, cor) => `<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="${{ d: 'direita', e: 'esquerda', c: 'cima', b: 'baixo' }[d]}"><path d="${SETA[d]}" fill="${cor || '#7cbcf0'}" stroke="#111" stroke-width="5" stroke-linejoin="round"/></svg>`;

  /* ---------- som e voz ---------- */
  let ctx = null, somLigado = true;
  try { somLigado = localStorage.getItem('pq-som') !== '0'; } catch (e) {}
  function tom(freq, ini, dur, tipo, vol) {
    if (!somLigado) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = tipo || 'sine'; o.frequency.value = freq;
      const t = ctx.currentTime + ini;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (e) {}
  }
  const legenda = t => { if (window.MDA && MDA.legenda) MDA.legenda(t); };
  const SOM = {
    toque() { tom(660, 0, 0.08, 'triangle', 0.08); },
    certo() { tom(660, 0, 0.12, 'triangle'); tom(990, 0.1, 0.2, 'triangle'); legenda('som de acerto'); },
    erro() { tom(220, 0, 0.18, 'sawtooth', 0.07); tom(180, 0.12, 0.22, 'sawtooth', 0.06); legenda('som de tente de novo'); },
    passo() { tom(520, 0, 0.06, 'square', 0.04); },
    bateu() { tom(140, 0, 0.25, 'square', 0.08); legenda('som de batida'); },
    fase() { [523, 659, 784, 1046].forEach((f, i) => tom(f, i * 0.11, 0.22, 'triangle')); legenda('música de fase completa'); },
    fim() { [523, 659, 784, 659, 784, 1046].forEach((f, i) => tom(f, i * 0.14, 0.3, 'triangle')); legenda('música de vitória'); }
  };
  const temVoz = 'speechSynthesis' in window;
  let voz = null;
  function escolheVoz() { const vs = speechSynthesis.getVoices(); voz = vs.find(v => /pt.BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null; }
  if (temVoz) { escolheVoz(); speechSynthesis.onvoiceschanged = escolheVoz; }
  function falar(t) {
    if (!temVoz || !t) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = 'pt-BR'; if (voz) u.voice = voz; u.rate = 0.95;
    speechSynthesis.speak(u);
  }

  /* ---------- o jogo ---------- */
  function jogo(cfg) {
    const raiz = $('#' + (cfg.el || 'pq'));
    raiz.className = 'pq';
    raiz.dataset.leitura = cfg.leitura ? '1' : '0';
    const chave = 'pq-' + cfg.id;
    let feitas = {};
    try { feitas = JSON.parse(localStorage.getItem(chave)) || {}; } catch (e) {}
    const salvar = () => { try { localStorage.setItem(chave, JSON.stringify(feitas)); } catch (e) {} };
    const barra = h('div', 'pq-barra');
    const fasesEl = h('div', 'pq-fases'); fasesEl.setAttribute('role', 'group'); fasesEl.setAttribute('aria-label', 'Fases');
    const btOuvir = h('button', 'pq-bt', ic('ouvir', 'Ouvir a instrução')); btOuvir.type = 'button'; btOuvir.title = 'Ouvir a instrução';
    const btDica = h('button', 'pq-bt', ic('dica', 'Dica')); btDica.type = 'button'; btDica.title = 'Dica';
    const btSom = h('button', 'pq-bt', ic('som', 'Sons do jogo')); btSom.type = 'button'; btSom.title = 'Ligar ou desligar os sons';
    btSom.setAttribute('aria-pressed', somLigado);
    if (!temVoz) btOuvir.hidden = true;
    barra.append(fasesEl, btOuvir, btDica, btSom);
    const pergunta = h('p', 'pq-pergunta');
    const palco = h('div', 'pq-palco');
    const status = h('p', 'sr-only'); status.setAttribute('role', 'status');
    raiz.innerHTML = ''; raiz.append(barra, pergunta, palco, status);
    let atual = 0, mec = null, ocupado = false;

    function desenharFases() {
      fasesEl.innerHTML = '';
      cfg.fases.forEach((f, i) => {
        const b = h('button', 'pq-fase' + (feitas[i] ? ' feita' : ''), feitas[i] ? ic('estrela', 'feita') : '');
        b.type = 'button'; b.setAttribute('aria-label', `Fase ${i + 1}${feitas[i] ? ', feita' : ''}`);
        if (i === atual) b.setAttribute('aria-current', 'true');
        b.onclick = () => { if (!ocupado) carregar(i); };
        fasesEl.append(b);
      });
    }
    function anunciar(t) { status.textContent = ''; setTimeout(() => { status.textContent = t; }, 30); }
    function carregar(i) {
      atual = i; ocupado = false;
      const f = cfg.fases[i];
      window.PQ.atual = { cfg, i };
      desenharFases();
      pergunta.textContent = f.pergunta || '';
      palco.innerHTML = '';
      const api = { acertou, errou, palco, fase: f, cfg, anunciar, falar };
      mec = (MEC[f.tipo] || MEC.escolha)(f, palco, api) || {};
      anunciar(`Fase ${i + 1} de ${cfg.fases.length}. ${f.fala || f.pergunta || ''}`);
      if (cfg.falarSozinho && f.fala) falar(f.fala);
    }
    function errou(el) {
      SOM.erro();
      if (el && MOVIMENTO) { el.classList.remove('pq-treme'); void el.offsetWidth; el.classList.add('pq-treme'); }
      anunciar('Ainda não. Tente de novo.');
    }
    async function acertou() {
      if (ocupado) return; ocupado = true;
      feitas[atual] = 1; salvar();
      const total = cfg.fases.length, n = Object.keys(feitas).length;
      if (window.MDP && window.REC && REC[cfg.id]) MDP.registrar(cfg.id, n / total * 100);
      SOM.fase(); anunciar('Muito bem! Fase completa.');
      const v = h('div', 'pq-vence', `<div class="estrelao">${ic('estrela', 'Estrela ganha')}</div>`);
      raiz.append(v);
      await esperar(1300);
      v.remove();
      const prox = cfg.fases.findIndex((_, k) => k > atual && !feitas[k]);
      const qualquer = cfg.fases.findIndex((_, k) => !feitas[k]);
      if (prox >= 0) carregar(prox);
      else if (qualquer >= 0) carregar(qualquer);
      else fim();
    }
    function fim() {
      ocupado = false;
      desenharFases();
      SOM.fim(); anunciar('Você completou todas as fases!');
      palco.innerHTML = '';
      pergunta.textContent = '';
      const box = h('div', 'pq-fim');
      box.append(h('div', 'estrelas', cfg.fases.map(() => ic('estrela', '')).join('')));
      const de = h('button', 'pq-bt grande ok', ic('recomecar', 'Jogar de novo')); de.type = 'button'; de.title = 'Jogar de novo';
      de.onclick = () => { feitas = {}; salvar(); carregar(0); };
      box.append(de);
      palco.append(box);
    }
    btOuvir.onclick = () => falar(cfg.fases[atual].fala || cfg.fases[atual].pergunta || '');
    btDica.onclick = () => {
      const el = mec && mec.dica && mec.dica();
      if (el) { el.classList.remove('pq-dica'); void el.offsetWidth; el.classList.add('pq-dica'); el.focus && el.focus({ preventScroll: true }); }
    };
    btSom.onclick = () => { somLigado = !somLigado; btSom.setAttribute('aria-pressed', somLigado); try { localStorage.setItem('pq-som', somLigado ? '1' : '0'); } catch (e) {} };
    const primeira = cfg.fases.findIndex((_, k) => !feitas[k]);
    carregar(primeira >= 0 ? primeira : 0);
    return { carregar };
  }

  /* ---------- peças ---------- */
  function carta(spec, cls) {
    const o = norm(spec);
    const b = h('button', 'pq-carta' + (cls ? ' ' + cls : '') + (o.txt != null ? ' txt' : ''));
    b.type = 'button';
    if (o.fila) { b.classList.add('fila'); b.innerHTML = o.fila.map(svgFig).join(''); b.setAttribute('aria-label', o.fila.map(nomeFig).join(', ')); }
    else if (o.html) { b.classList.add('txt'); b.innerHTML = o.html; }
    else if (o.txt != null) b.textContent = o.txt;
    else b.innerHTML = svgFig(o);
    if (o.sombra) b.classList.add('sombra');
    return b;
  }
  function quadro(specs, cls) {
    const q = h('div', 'pq-quadro' + (cls ? ' ' + cls : ''));
    specs.forEach(s => {
      const o = norm(s);
      if (o.op) q.append(h('span', 'op', o.op));
      else if (o.txt != null) q.append(h('span', 'op', o.txt));
      else q.insertAdjacentHTML('beforeend', svgFig(o));
    });
    return q;
  }
  function vaga(i) {
    const v = h('div', 'pq-vaga');
    v.innerHTML = `<span class="pq-num" aria-hidden="true">${'<i></i>'.repeat(i + 1)}</span>`;
    return v;
  }
  function botaoOk(rot) { const b = h('button', 'pq-bt grande ok', ic('ok', rot || 'Conferir')); b.type = 'button'; b.title = rot || 'Conferir'; return b; }

  /* ---------- mecânicas ---------- */
  const MEC = {};

  /* Pôr em ordem: itens (na ordem certa). Toque nas cartas para preencher as vagas; toque numa vaga para devolver. */
  MEC.sequencia = function (f, palco, api) {
    const n = f.itens.length;
    const vagas = h('div', 'pq-linha'), mao = h('div', 'pq-linha');
    const ordem = embaralhar(f.itens.map((_, i) => i), f.fixa);
    const posto = new Array(n).fill(null);
    const vs = f.itens.map((_, i) => { const v = vaga(i); vagas.append(v); return v; });
    if (f.inicio) for (let i = 0; i < f.inicio; i++) { posto[i] = i; vs[i].innerHTML = svgFig(f.itens[i]); vs[i].classList.add('cheia'); }
    const cartas = ordem.map(i => {
      const c = carta(f.itens[i]);
      if (posto.includes(i)) c.classList.add('usada');
      c.onclick = () => {
        const k = posto.indexOf(null); if (k < 0) return;
        SOM.toque(); posto[k] = i; c.classList.add('usada');
        vs[k].innerHTML = svgFig(f.itens[i]); vs[k].classList.add('cheia'); vs[k].setAttribute('aria-label', nomeFig(f.itens[i]));
        if (!posto.includes(null)) conferir();
      };
      mao.append(c); return c;
    });
    vs.forEach((v, k) => {
      v.tabIndex = 0; v.setAttribute('role', 'button');
      v.onclick = () => {
        if (posto[k] == null || (f.inicio && k < f.inicio)) return;
        cartas[ordem.indexOf(posto[k])].classList.remove('usada'); posto[k] = null;
        v.innerHTML = `<span class="pq-num" aria-hidden="true">${'<i></i>'.repeat(k + 1)}</span>`; v.classList.remove('cheia');
      };
    });
    async function conferir() {
      if (posto.every((x, k) => x === k || igual(f.itens[x], f.itens[k]))) return api.acertou();
      api.errou(vagas);
      await esperar(700);
      posto.forEach((x, k) => { if (x !== k && !igual(f.itens[x], f.itens[k])) vs[k].click(); });
    }
    palco.append(vagas, mao);
    return { dica: () => { const k = posto.indexOf(null); return k < 0 ? null : cartas[ordem.indexOf(k)]; } };
  };

  /* Completar: mostra a fila (seq) com null no lugar que falta; o estudante escolhe entre opcoes. certa = índice em opcoes. */
  MEC.faltando = function (f, palco, api) {
    const fila = h('div', 'pq-linha');
    f.seq.forEach((s, i) => {
      if (i) fila.insertAdjacentHTML('beforeend', f.setas === false ? '' : `<span class="pq-seta-entre">${seta('d', '#ddd')}</span>`);
      if (s == null) { const v = vaga(0); v.querySelector('.pq-num').remove(); v.innerHTML = svgFig('interrogacao'); v.classList.add('alvo'); fila.append(v); }
      else { const v = h('div', 'pq-vaga cheia', svgFig(s)); fila.append(v); }
    });
    palco.append(fila);
    return opcoes(f, palco, api, async (i, c) => {
      const v = $('.alvo', fila); v.innerHTML = svgFig(f.opcoes[i]);
    });
  };
  MEC.padrao = MEC.faltando;

  function opcoes(f, palco, api, aoAcertar) {
    const linha = h('div', 'pq-linha');
    const idx = embaralhar(f.opcoes.map((_, i) => i), f.fixa);
    const certas = [].concat(f.certa);
    const cs = idx.map(i => {
      const c = carta(f.opcoes[i], f.grandes ? '' : '');
      c.onclick = async () => {
        if (certas.includes(i)) { c.classList.add('certa'); SOM.certo(); if (aoAcertar) await aoAcertar(i, c); await esperar(250); api.acertou(); }
        else api.errou(c);
      };
      linha.append(c); return c;
    });
    palco.append(linha);
    return { dica: () => cs[idx.indexOf(certas[0])] };
  }

  /* Escolher: cena (figuras num quadro, opcional), opcoes, certa. */
  function legendaEl(leg) {
    const l = h('div', 'pq-legenda');
    Object.entries(leg).forEach(([fg, cor]) => l.insertAdjacentHTML('beforeend', `<span>${svgFig(fg)}<i style="background:${FG.CORES[cor] || cor}"></i></span>`));
    return l;
  }
  MEC.escolha = function (f, palco, api) {
    if (f.legenda) palco.append(legendaEl(f.legenda));
    if (f.cena) palco.append(quadro(f.cena, f.balao ? 'balao' : ''));
    if (f.html) palco.append(h('div', 'pq-quadro', f.html));
    return opcoes(f, palco, api);
  };

  /* Verdadeiro ou falso: cena (o que existe) e afirmacao (figuras; '!x' = não tem x). resposta: true/false. */
  MEC.vf = function (f, palco, api) {
    if (f.cena) palco.append(quadro(f.cena));
    if (f.afirmacao) {
      const linha = h('div', 'pq-linha');
      linha.insertAdjacentHTML('beforeend', `<div style="width:64px;height:64px">${svgFig(f.quem || 'crianca')}</div>`);
      linha.append(quadro(f.afirmacao, 'balao'));
      palco.append(linha);
    }
    const linha = h('div', 'pq-linha');
    const sim = h('button', 'pq-bt grande', ic('ok', 'Verdadeiro, certo')); sim.type = 'button'; sim.title = 'Verdadeiro';
    const nao = h('button', 'pq-bt grande', ic('nao', 'Falso, errado')); nao.type = 'button'; nao.title = 'Falso';
    sim.style.width = sim.style.height = nao.style.width = nao.style.height = '110px';
    sim.onclick = () => (f.resposta ? (SOM.certo(), api.acertou()) : api.errou(sim));
    nao.onclick = () => (!f.resposta ? (SOM.certo(), api.acertou()) : api.errou(nao));
    linha.append(sim, nao); palco.append(linha);
    return { dica: () => (f.resposta ? sim : nao) };
  };

  /* Separar: caixas (rótulos: figura, 'cor:azul' ou 'forma:circulo'), itens [{f, caixa}] aparecem um de cada vez. */
  function rotuloCaixa(r) {
    if (typeof r === 'string' && r.startsWith('cor:')) { const c = r.slice(4); return `<div class="rot swatch" style="background:${FG.CORES[c] || c}" role="img" aria-label="cor ${c}"></div>`; }
    if (typeof r === 'string' && r.startsWith('forma:')) return `<div class="rot">${svgFig(r.slice(6) + ':branco')}</div>`;
    if (r && r.txt) return `<div class="rot" style="width:auto;height:auto;font:700 16px var(--body);text-align:center">${r.txt}</div>`;
    if (Array.isArray(r)) return `<div class="rot" style="display:flex;width:auto;gap:2px">${r.map(x => `<div style="width:46px;height:46px">${svgFig(x)}</div>`).join('')}</div>`;
    return `<div class="rot">${svgFig(r)}</div>`;
  }
  MEC.classificar = function (f, palco, api) {
    const itens = embaralhar(f.itens, f.fixa);
    let k = 0;
    const atual = h('div', 'pq-atual');
    const caixas = h('div', 'pq-caixas');
    const cxs = f.caixas.map((r, i) => {
      const c = h('button', 'pq-caixa', rotuloCaixa(r) + '<div class="dentro"></div>'); c.type = 'button';
      c.setAttribute('aria-label', 'Caixa ' + (i + 1) + ': ' + (typeof r === 'string' ? nomeFig(r.replace(/^(cor|forma):/, '')) : (r.txt || [].concat(r).map(nomeFig).join(' e '))));
      c.onclick = () => {
        if (k >= itens.length) return;
        const it = itens[k];
        if ([].concat(it.caixa).includes(i)) {
          SOM.certo(); $('.dentro', c).insertAdjacentHTML('beforeend', svgFig(it.f)); k++;
          if (k >= itens.length) api.acertou(); else mostrar();
        } else api.errou(atual);
      };
      caixas.append(c); return c;
    });
    function mostrar() { atual.innerHTML = svgFig(itens[k].f); atual.style.animation = 'none'; void atual.offsetWidth; atual.style.animation = ''; api.anunciar(nomeFig(itens[k].f)); }
    palco.append(atual, caixas); mostrar();
    return { dica: () => cxs[[].concat(itens[k] && itens[k].caixa)[0]] };
  };

  /* Ligar pares: pares [[a, b], ...]. Toque numa figura da esquerda e depois na da direita. */
  MEC.pares = function (f, palco, api) {
    const col = h('div', 'pq-colunas');
    const esq = h('div', 'pq-linha'), dir = h('div', 'pq-linha');
    esq.style.flexDirection = dir.style.flexDirection = 'column';
    const oe = embaralhar(f.pares.map((_, i) => i), f.fixa), od = embaralhar(f.pares.map((_, i) => i));
    let sel = null, feitos = 0;
    const ce = [], cd = [];
    oe.forEach(i => { const c = carta(f.pares[i][0]); c.dataset.i = i; c.onclick = () => { if (c.disabled) return; ce.forEach(x => x.classList.remove('sel')); sel = i; c.classList.add('sel'); SOM.toque(); }; esq.append(c); ce[i] = c; });
    od.forEach(i => {
      const c = carta(f.pares[i][1]); cd[i] = c;
      c.onclick = () => {
        if (c.disabled) return;
        if (sel == null) { api.errou(esq); return; }
        if (sel === i || igual(f.pares[sel][1], f.pares[i][1])) {
          feitos++; const cls = 'par' + ((feitos - 1) % 6 + 1);
          ce[sel].classList.remove('sel'); ce[sel].classList.add(cls); c.classList.add(cls);
          ce[sel].disabled = c.disabled = true; SOM.certo(); sel = null;
          if (feitos === f.pares.length) api.acertou();
        } else api.errou(c);
      };
      dir.append(c);
    });
    col.append(esq, dir); palco.append(col);
    return { dica: () => { const i = sel != null ? sel : oe.find(j => !ce[j].disabled); return sel != null ? cd[i] : ce[i]; } };
  };

  /* Mensagem guardada: mostra msg por um tempo, esconde e o estudante remonta na ordem com as opcoes.
     Com legenda {fig: cor}, a mensagem aparece em cores (código) e o estudante traduz para figuras. */
  MEC.mensagem = function (f, palco, api) {
    const msg = f.msg;
    let m = null;
    const caixa = h('div', 'pq-linha');
    if (f.legenda) {
      const leg = h('div', 'pq-legenda');
      Object.entries(f.legenda).forEach(([fg, cor]) => leg.insertAdjacentHTML('beforeend', `<span>${svgFig(fg)}<i style="background:${FG.CORES[cor] || cor}"></i></span>`));
      palco.append(leg);
      msg.forEach(s => caixa.insertAdjacentHTML('beforeend', `<div class="pq-vaga cheia" style="background:${FG.CORES[f.legenda[s]] || f.legenda[s]}" role="img" aria-label="cor ${f.legenda[s]}"></div>`));
      palco.append(caixa);
      montar();
    } else {
      msg.forEach(s => caixa.append(h('div', 'pq-vaga cheia', svgFig(s))));
      const env = h('div', '', `<div style="width:90px;height:90px">${svgFig('envelope')}</div>`);
      palco.append(caixa);
      const olhar = h('button', 'pq-bt grande ok', ic('ok', 'Já guardei, esconder')); olhar.type = 'button'; olhar.title = 'Pronto';
      palco.append(olhar);
      let foi = false;
      const esconder = () => { if (foi) return; foi = true; caixa.remove(); olhar.remove(); palco.prepend(env); montar(); };
      olhar.onclick = esconder;
      setTimeout(esconder, f.tempo || 4000);
    }
    function montar() {
      const sub = { itens: msg, fixa: false };
      const area = h('div', 'pq-palco'); area.style.minHeight = '0';
      palco.append(area);
      const op = (f.opcoes || []).filter(o => !msg.some(x => igual(x, o)));
      m = MEC.sequencia({ itens: msg, extras: op }, area, api);
      // cartas extras (distratores)
      const mao = area.lastChild;
      op.forEach(o => { const c = carta(o); c.onclick = () => api.errou(c); mao.insertBefore(c, mao.children[Math.floor(Math.random() * (mao.children.length + 1))] || null); });
    }
    return { dica: () => m && m.dica() };
  };

  /* Pintar pelo código: grade (linhas de texto), legenda {símbolo: cor}. O estudante escolhe a cor e toca nos quadradinhos.
     simbolos: {símbolo: figura} mostra figura no quadradinho (sem leitura); sem isso, mostra o próprio símbolo (0, 1, A...). */
  MEC.pintar = function (f, palco, api) {
    const leg = h('div', 'pq-legenda');
    const sim = f.simbolos || {};
    const marca = s => sim[s] ? svgFig(sim[s]) : `<b>${s}</b>`;
    if (!f.semLegenda) Object.entries(f.legenda).forEach(([s, cor]) => leg.insertAdjacentHTML('beforeend', `<span>${marca(s)}<i style="background:${FG.CORES[cor] || cor}"></i></span>`));
    const cores = [...new Set(Object.values(f.legenda).concat(f.extras || []))];
    let cor = cores[0];
    const pal = h('div', 'pq-cores');
    const pbs = cores.map(c => {
      const b = h('button', 'pq-cor'); b.type = 'button'; b.style.background = FG.CORES[c] || c; b.setAttribute('aria-label', 'cor ' + c);
      b.setAttribute('aria-pressed', c === cor); b.onclick = () => { cor = c; pbs.forEach(x => x.setAttribute('aria-pressed', x === b)); SOM.toque(); };
      pal.append(b); return b;
    });
    const linhas = f.grade, cols = Math.max(...linhas.map(l => l.length));
    const g = h('div', 'pq-pixels'); g.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    if (cols > 8) g.style.setProperty('--pq-px', 'min(36px, calc((100vw - 90px) / ' + cols + '))');
    const pint = [], cel = [];
    linhas.forEach((l, y) => [...l.padEnd(cols, ' ')].forEach((s, x) => {
      if (s === ' ') { g.append(h('span', 'vazio')); return; }
      const b = h('button'); b.type = 'button';
      b.innerHTML = f.mostrar === false ? '' : marca(s);
      b.setAttribute('aria-label', `linha ${y + 1}, coluna ${x + 1}${sim[s] ? ', ' + nomeFig(sim[s]) : ', ' + s}`);
      const k = cel.length; cel.push({ b, s }); pint.push(f.inicial || 'branco');
      b.onclick = () => {
        pint[k] = cor; b.style.background = FG.CORES[cor] || cor; SOM.passo();
        if (cel.every((c, j) => pint[j] === f.legenda[c.s])) api.acertou();
      };
      g.append(b);
    }));
    palco.append(leg, g, pal);
    return { dica: () => { const j = cel.findIndex((c, i) => pint[i] !== f.legenda[c.s]); if (j < 0) return null; const c = f.legenda[cel[j].s]; if (cor !== c) return pbs[cores.indexOf(c)]; return cel[j].b; } };
  };

  /* Caminho: grade com personagem.
     cols, rows, inicio [x, y], alvos [[x, y]...] (pegar todos), paredes [[x, y]...], alvo (figura), parede (figura),
     modo: 'passo' (cada seta anda na hora) · 'programa' (monta e executa) · 'prever' (programa pronto: toque onde ele vai parar)
     blocos: ['c','b','e','d'] setas · 'f','gd','ge' (frente e girar: outro conjunto de instruções) · 'ate' (andar até a parede)
     vezes: [2, 3, 4] (repetição simples) · laco: true (repetir um grupo, aninhado) · etapas: true (um programa por alvo, na ordem)
     max: número máximo de blocos. programa (modo prever): lista de blocos. */
  const DIRS = { d: [1, 0], e: [-1, 0], c: [0, -1], b: [0, 1] };
  const ROT = ['d', 'b', 'e', 'c'];
  MEC.caminho = function (f, palco, api) {
    const cols = f.cols || 5, rows = f.rows || 5;
    const pers = f.personagem || api.cfg.personagem || 'robo';
    const alvoFig = f.alvo || api.cfg.alvo || 'estrela', parFig = f.parede || api.cfg.parede || 'arvore';
    const g = h('div', 'pq-grade'); g.style.setProperty('--cols', cols); g.style.setProperty('--rows', rows);
    g.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const key = (x, y) => x + ',' + y;
    const paredes = new Set((f.paredes || []).map(p => key(...p)));
    const cels = {};
    const alvos = f.etapas ? f.alvos.slice(0, 1) : f.alvos;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const c = h('div', 'cel'); cels[key(x, y)] = c;
      if (paredes.has(key(x, y))) c.innerHTML = svgFig(parFig);
      g.append(c);
    }
    const boneco = h('div', 'pq-boneco', svgFig(pers)); g.append(boneco);
    const comDir = (f.blocos || []).some(b => b === 'f');
    const setinha = h('div', 'dir', `<svg viewBox="0 0 100 100" class="fg"><path d="M20 20 L85 50 L20 80 Z" fill="#ffaa55" stroke="#111" stroke-width="7" stroke-linejoin="round"/></svg>`);
    if (comDir) boneco.append(setinha);
    let pos, dir, pegos, etapa = 0, rodando = false, prog = [], abertos = [], vez = 1;
    const partes = h('div', 'pq-partes');
    function desenharAlvos() {
      Object.values(cels).forEach(c => { if (!c.firstChild || c.dataset.alvo) { c.innerHTML = ''; delete c.dataset.alvo; } c.classList.remove('pego', 'rastro'); });
      (f.etapas ? f.alvos.slice(etapa, etapa + 1) : f.alvos).forEach((a, i) => { const c = cels[key(...a)]; c.innerHTML = svgFig(f.alvosFig ? f.alvosFig[f.etapas ? etapa : i] : alvoFig); c.dataset.alvo = 1; });
    }
    function colocar() {
      boneco.style.width = (100 / cols) + '%'; boneco.style.height = (100 / rows) + '%';
      boneco.style.left = (pos[0] * 100 / cols) + '%'; boneco.style.top = (pos[1] * 100 / rows) + '%';
      setinha.style.transform = `rotate(${dir * 90}deg)`;
      setinha.style.left = '33%'; setinha.style.top = '33%';
    }
    let inicio = f.inicio.slice();
    function reiniciar() { pos = inicio.slice(); dir = f.dir || 0; pegos = new Set(); desenharAlvos(); colocar(); }
    const alvosAtuais = () => f.etapas ? [f.alvos[etapa]] : f.alvos;
    // um passo: devolve false se bateu
    async function andar(dx, dy) {
      const nx = pos[0] + dx, ny = pos[1] + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || paredes.has(key(nx, ny))) {
        boneco.classList.remove('bateu'); void boneco.offsetWidth; boneco.classList.add('bateu'); SOM.bateu(); return false;
      }
      cels[key(...pos)].classList.add('rastro');
      pos = [nx, ny]; colocar(); SOM.passo();
      const a = alvosAtuais().findIndex(p => p[0] === nx && p[1] === ny);
      if (a >= 0 && !pegos.has(key(nx, ny))) { pegos.add(key(nx, ny)); cels[key(nx, ny)].classList.add('pego'); SOM.certo(); }
      await esperar(f.modo === 'passo' ? 60 : 330);
      return true;
    }
    const livre = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows && !paredes.has(key(x, y));
    async function executar(lista, marcar) {
      for (const b of lista) {
        if (marcar && b.el) { palco.querySelectorAll('.pq-blk.ativo').forEach(e => e.classList.remove('ativo')); b.el.classList.add('ativo'); }
        if (b.laco) { for (let r = 0; r < b.laco; r++) if (!(await executar(b.corpo, marcar))) return false; continue; }
        const n = b.n || 1;
        for (let r = 0; r < n; r++) {
          let d = b.d;
          if (d === 'gd') { dir = (dir + 1) % 4; colocar(); SOM.passo(); await esperar(250); continue; }
          if (d === 'ge') { dir = (dir + 3) % 4; colocar(); SOM.passo(); await esperar(250); continue; }
          if (d === 'f') d = ROT[dir];
          const [dx, dy] = DIRS[d];
          if (b.ate) { while (livre(pos[0] + dx, pos[1] + dy)) await andar(dx, dy); continue; }
          if (!(await andar(dx, dy))) return false;
        }
      }
      return true;
    }
    const pegouTudo = () => alvosAtuais().every(p => pegos.has(key(...p)));
    reiniciar();
    palco.append(g);
    const icBloco = b => {
      if (b.d === 'gd') return ic('giraD', 'girar para a direita');
      if (b.d === 'ge') return ic('giraE', 'girar para a esquerda');
      if (b.d === 'f') return ic('frente', 'andar para a frente');
      if (b.ate) return `<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="${{ d: 'direita', e: 'esquerda', c: 'cima', b: 'baixo' }[b.d]} até a parede" style="transform:rotate(${{ d: 0, b: 90, e: 180, c: 270 }[b.d]}deg)">${ICONE.ate}</svg>`;
      return seta(b.d);
    };
    function blocoEl(b, fixo) {
      const e = h(fixo ? 'span' : 'button', 'pq-blk', icBloco(b));
      if (!fixo) e.type = 'button';
      if (b.n > 1) { e.insertAdjacentHTML('beforeend', `<span class="vezes" aria-label="${b.n} vezes">${'<i></i>'.repeat(b.n)}</span>`); }
      b.el = e; return e;
    }
    function lacoEl(b, fixo, aberto) {
      const e = h('div', 'pq-laco' + (aberto ? ' aberto' : ''));
      e.innerHTML = `<span class="n" aria-label="repetir ${b.laco} vezes">${b.laco}×</span>`;
      b.corpo.forEach(x => e.append(x.laco ? lacoEl(x, fixo, abertos.includes(x)) : blocoEl(x, fixo)));
      return e;
    }

    if (f.modo === 'prever') {
      const p = h('div', 'pq-prog fixo');
      f.programa.forEach(b => p.append(b.laco ? lacoEl(b, true) : blocoEl(b, true)));
      palco.prepend(p);
      Object.entries(cels).forEach(([k, c]) => {
        if (paredes.has(k)) return;
        c.classList.add('toque'); c.tabIndex = 0; c.setAttribute('role', 'button'); c.setAttribute('aria-label', 'Casa ' + k);
        c.onclick = async () => {
          if (rodando) return; rodando = true;
          const [x, y] = k.split(',').map(Number);
          reiniciar(); await executar(f.programa, true);
          rodando = false;
          if (pos[0] === x && pos[1] === y) api.acertou(); else { api.errou(c); await esperar(600); reiniciar(); }
        };
      });
      return { dica: () => { const s = { pos: pos.slice() }; return null; } };
    }

    // botões de comando
    const cmds = h('div', 'pq-cmds');
    const blocos = f.blocos || ['c', 'b', 'e', 'd'];
    let vezesEl = null;
    if (f.vezes) {
      vezesEl = h('div', 'pq-cmds');
      [1].concat(f.vezes).forEach(n => {
        const b = h('button', 'pq-bt', `<span style="display:flex;gap:3px;flex-wrap:wrap;justify-content:center;width:34px">${'<i style="width:9px;height:9px;border-radius:50%;background:#111;display:block"></i>'.repeat(n)}</span>`);
        b.type = 'button'; b.setAttribute('aria-label', n + (n > 1 ? ' vezes' : ' vez')); b.setAttribute('aria-pressed', n === vez);
        b.onclick = () => { vez = n; vezesEl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); SOM.toque(); };
        vezesEl.append(b);
      });
    }
    const progEl = h('div', 'pq-prog'); progEl.setAttribute('aria-label', 'Programa'); progEl.setAttribute('aria-live', 'polite');
    function alvoLista() { return abertos.length ? abertos[abertos.length - 1].corpo : prog; }
    function contar(l) { return l.reduce((s, b) => s + (b.laco ? 1 + contar(b.corpo) : 1), 0); }
    function desenharProg() {
      progEl.innerHTML = '';
      prog.forEach((b, i) => {
        const e = b.laco ? lacoEl(b, false, abertos.includes(b)) : blocoEl(b);
        if (!b.laco) e.onclick = () => { if (!rodando) { prog.splice(i, 1); desenharProg(); } };
        else e.querySelector('.n').onclick = () => { if (!rodando) { prog.splice(i, 1); abertos = abertos.filter(x => x !== b); desenharProg(); } };
        progEl.append(e);
      });
      // blocos dentro de laços: tocar remove
      const ligar = (lista) => lista.forEach((b, i) => { if (b.laco) ligar(b.corpo); else if (b.el && lista !== prog) b.el.onclick = () => { if (!rodando) { lista.splice(i, 1); desenharProg(); } }; });
      ligar(prog);
      if (!prog.length) progEl.innerHTML = `<span style="width:52px;height:52px;opacity:.35">${seta('d', '#fff')}</span>`;
    }
    async function adicionar(b) {
      if (rodando) return;
      SOM.toque();
      if (f.modo === 'passo') {
        rodando = true;
        await executar([b]);
        rodando = false;
        if (pegouTudo()) proximaEtapa();
        return;
      }
      if (f.max && contar(prog) >= f.max) { api.errou(progEl); return; }
      alvoLista().push(Object.assign({}, b, vezesEl ? { n: vez } : {}));
      desenharProg();
    }
    blocos.forEach(d => {
      const b = d === 'ate' ? null : { d };
      if (d === 'ate') {
        ['c', 'b', 'e', 'd'].forEach(dd => { const e = h('button', 'pq-bt', icBloco({ d: dd, ate: true })); e.type = 'button'; e.onclick = () => adicionar({ d: dd, ate: true }); cmds.append(e); });
        return;
      }
      const e = h('button', 'pq-bt' + (f.modo === 'passo' ? ' grande' : ''), icBloco(b)); e.type = 'button';
      e.onclick = () => adicionar({ d });
      cmds.append(e);
    });
    if (f.laco) {
      [2, 3, 4].filter(n => !f.lacos || f.lacos.includes(n)).forEach(n => {
        const e = h('button', 'pq-bt', `<span style="font:800 22px var(--display)">${n}×</span>${''}`); e.type = 'button';
        e.setAttribute('aria-label', `repetir ${n} vezes: abre um grupo`);
        e.onclick = () => { if (rodando) return; const l = { laco: n, corpo: [] }; alvoLista().push(l); abertos.push(l); SOM.toque(); desenharProg(); };
        cmds.append(e);
      });
      const fe = h('button', 'pq-bt', ic('fecha', 'fechar o grupo')); fe.type = 'button';
      fe.onclick = () => { abertos.pop(); SOM.toque(); desenharProg(); };
      cmds.append(fe);
    }
    function proximaEtapa() {
      if (f.etapas && etapa < f.alvos.length - 1) {
        const p = h('div', 'pq-prog fixo');
        p.insertAdjacentHTML('beforeend', `<span style="width:30px;height:30px">${svgFig(f.alvosFig ? f.alvosFig[etapa] : alvoFig)}</span>`);
        prog.forEach(b => p.append(b.laco ? lacoEl(b, true) : blocoEl(b, true)));
        if (f.modo !== 'passo') partes.append(p);
        etapa++; inicio = pos.slice(); prog = []; abertos = [];
        SOM.certo(); reiniciar(); desenharProg();
        return;
      }
      api.acertou();
    }
    if (f.modo === 'passo') { palco.append(cmds); return { dica: () => cmds.firstChild }; }
    const acoes = h('div', 'pq-cmds');
    const play = h('button', 'pq-bt grande', ic('play', 'Executar o programa')); play.type = 'button'; play.title = 'Executar';
    const apaga = h('button', 'pq-bt grande', ic('apagar', 'Apagar o programa')); apaga.type = 'button'; apaga.title = 'Apagar tudo';
    play.onclick = async () => {
      if (rodando || !prog.length) { if (!prog.length) api.errou(progEl); return; }
      abertos = []; desenharProg();
      rodando = true; reiniciar();
      const ok = await executar(prog, true);
      rodando = false;
      palco.querySelectorAll('.pq-blk.ativo').forEach(e => e.classList.remove('ativo'));
      if (ok && pegouTudo()) proximaEtapa();
      else { api.errou(g); await esperar(700); reiniciar(); }
    };
    apaga.onclick = () => { if (!rodando) { prog = []; abertos = []; desenharProg(); reiniciar(); } };
    acoes.append(play, apaga);
    desenharProg();
    if (f.etapas) palco.append(partes);
    palco.append(progEl);
    if (vezesEl) palco.append(vezesEl);
    palco.append(cmds, acoes);
    return { dica: () => (prog.length ? play : cmds.firstChild) };
  };

  /* Contar e registrar: a cena tem figuras espalhadas; o estudante marca quantas há de cada (categorias) e depois responde.
     Depois do registro, pergunta: 'mais' (qual tem mais) ou 'menos'. */
  MEC.contar = function (f, palco, api) {
    const cena = h('div', 'pq-quadro');
    embaralhar(f.cena).forEach(s => cena.insertAdjacentHTML('beforeend', svgFig(s)));
    const certo = f.categorias.map(c => f.cena.filter(s => igual(norm(s), norm(c))).length);
    const cont = f.categorias.map(() => 0);
    const tab = h('div', 'pq-linha'); tab.style.alignItems = 'flex-end';
    const cols = f.categorias.map((c, i) => {
      const col = h('div', ''); col.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
      const pilha = h('div', ''); pilha.style.cssText = 'display:flex;flex-direction:column-reverse;gap:2px;min-height:40px';
      const mais = h('button', 'pq-bt', svgFig(c)); mais.type = 'button'; mais.setAttribute('aria-label', 'Marcar mais um: ' + nomeFig(c));
      const menos = h('button', 'pq-bt', ic('desfazer', 'tirar um')); menos.type = 'button'; menos.style.width = menos.style.height = '40px';
      const draw = () => { pilha.innerHTML = '<i style="display:block;width:44px;height:14px;border:2px solid #111;border-radius:4px;background:#ffd84d"></i>'.repeat(cont[i]); };
      mais.onclick = () => { cont[i]++; SOM.toque(); draw(); conferir(); };
      menos.onclick = () => { if (cont[i]) cont[i]--; draw(); };
      col.append(pilha, mais, menos); tab.append(col); return mais;
    });
    palco.append(cena, tab);
    let etapa2 = false;
    function conferir() {
      if (etapa2 || !cont.every((n, i) => n === certo[i])) { if (cont.some((n, i) => n > certo[i])) { api.errou(tab); } return; }
      etapa2 = true; SOM.certo();
      if (!f.depois) { setTimeout(api.acertou, 400); return; }
      const alvo = f.depois === 'menos' ? Math.min(...certo) : Math.max(...certo);
      const q = h('div', 'pq-linha');
      q.insertAdjacentHTML('beforeend', `<div style="width:70px;height:70px">${f.depois === 'menos' ? '<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="qual tem menos"><rect x="40" y="60" width="20" height="30" fill="#ffd84d" stroke="#111" stroke-width="5"/></svg>' : '<svg class="fg" viewBox="0 0 100 100" role="img" aria-label="qual tem mais"><rect x="40" y="10" width="20" height="80" fill="#ffd84d" stroke="#111" stroke-width="5"/></svg>'}</div>`);
      palco.append(q);
      opcoes({ opcoes: f.categorias, certa: certo.map((n, i) => n === alvo ? i : -1).filter(i => i >= 0) }, palco, api);
    }
    return { dica: () => { const i = cont.findIndex((n, k) => n < certo[k]); return i >= 0 ? cols[i] : null; } };
  };

  /* Criar: escolher uma peça de cada grupo (grupos: [[figuras]...]) e montar o cartão. Não tem resposta errada. */
  MEC.criar = function (f, palco, api) {
    const quadroEl = h('div', 'pq-quadro'); quadroEl.style.minHeight = '120px'; quadroEl.style.minWidth = '260px';
    const esc = f.grupos.map(() => null);
    palco.append(quadroEl);
    const linhas = f.grupos.map((g, gi) => {
      const l = h('div', 'pq-linha');
      g.forEach(s => { const c = carta(s); c.onclick = () => { esc[gi] = s; l.querySelectorAll('.pq-carta').forEach(x => x.classList.toggle('sel', x === c)); SOM.toque(); desenhar(); }; l.append(c); });
      palco.append(l); return l;
    });
    const ok = botaoOk('Pronto'); palco.append(ok);
    function desenhar() { quadroEl.innerHTML = ''; esc.forEach(s => s && quadroEl.insertAdjacentHTML('beforeend', svgFig(s))); if (f.fundo && esc[0]) quadroEl.style.background = FG.CORES[norm(esc[0]).c] || '#fffbe6'; }
    ok.onclick = () => { if (esc.every(Boolean)) { SOM.certo(); api.acertou(); } else api.errou(linhas[esc.indexOf(null)]); };
    return { dica: () => { const i = esc.indexOf(null); return i >= 0 ? linhas[i].firstChild : ok; } };
  };

  window.PQ = { jogo, MEC, svgFig, nomeFig, falar, SOM, ic, seta, embaralhar, h, carta, quadro, opcoes, esperar };
})();
