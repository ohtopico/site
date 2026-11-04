/* Acessibilidade dos jogos, recursos 3D e simuladores (ohtopico.com.br)
   Carregado por material-didatico/assets/comum.js e simuladores/assets/sim-comum.js.

   O que faz:
   - Painel "Acessibilidade" (botão redondo no canto inferior esquerdo):
       ler em voz alta, alto contraste, letra maior, menos movimento, legendas dos sons.
   - Sempre, sem precisar ligar nada:
       atalho "Pular para o jogo", acesso por teclado (Tab + Enter/Espaço) ao que só tinha clique de mouse,
       nome acessível para botões que só têm ícone.
   API para os jogos:
       MDA.legenda('Som de acerto')   mostra a legenda de um som (para estudantes surdos)
       MDA.fala('texto')              lê em voz alta, se a leitura estiver ligada
       MDA.descreve(el, 'texto')      descrição para leitor de tela de um canvas ou desenho
       MDA.ligada('voz')              true/false
   As preferências ficam no navegador (localStorage 'ohtopico-acess-v1') e valem para todos os jogos. */
(function () {
  if (window.MDA) return;
  const CH = 'ohtopico-acess-v1';
  const PADRAO = { voz: false, contraste: false, letra: false, calmo: false, legendas: false, devagar: false };
  let P = Object.assign({}, PADRAO);
  try { Object.assign(P, JSON.parse(localStorage.getItem(CH) || '{}')); } catch (e) {}
  const salva = () => { try { localStorage.setItem(CH, JSON.stringify(P)); } catch (e) {} };
  const html = document.documentElement;
  // Glossário de Matemática e Computação com sinais em Libras (fica no painel quando existir)
  const GLOSSARIO = window.MDA_GLOSSARIO || '/material-adaptado/glossario/';

  /* ---------- Estilos ---------- */
  const css = `
  html[data-a-contraste] {
    --paper: #000 !important; --paper-2: #000 !important; --pill: #111 !important; --pill-2: #222 !important;
    --ink: #fff !important; --ink-2: #fff !important; --ink-3: #f2f2f2 !important; --line: #fff !important;
    --accent: #ffd23f !important; --accent-soft: #2b2400 !important; --co: #ffd23f !important; --co-soft: #2b2400 !important;
    --ma: #fff !important; --ma-soft: #222 !important;
    --ok: #7dffa0 !important; --ok-soft: #002b10 !important; --bad: #ffa3b4 !important; --bad-soft: #3a0010 !important;
    --warn: #fff !important; --warn-soft: #222 !important; color-scheme: dark;
  }
  html[data-a-contraste] body { background: #000 !important; color: #fff !important; }
  html[data-a-contraste] a { color: #ffd23f !important; text-decoration: underline !important; }
  html[data-a-contraste] .muted, html[data-a-contraste] .small { color: #f2f2f2 !important; }
  html[data-a-contraste] button, html[data-a-contraste] .btn { border-width: 2px !important; }
  html[data-a-contraste] input, html[data-a-contraste] select, html[data-a-contraste] textarea { background: #000 !important; color: #fff !important; border: 2px solid #fff !important; }
  html[data-a-contraste] :focus-visible, html[data-a-foco] :focus-visible { outline: 4px solid #ffd23f !important; outline-offset: 3px !important; box-shadow: 0 0 0 7px #000 !important; }
  html[data-a-letra] main { zoom: 1.2; }
  html[data-a-calmo] *, html[data-a-calmo] *::before, html[data-a-calmo] *::after {
    animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto !important; }
  .mda-pular { position: absolute; left: 12px; top: -60px; z-index: 100; background: #111; color: #fff !important; padding: 10px 16px; border-radius: 99px; font: 500 15px var(--body, system-ui); text-decoration: none; }
  .mda-pular:focus { top: 12px; }
  .mda-bt { position: fixed; left: 12px; bottom: 60px; z-index: 56; width: 46px; height: 46px; border-radius: 50%; border: 1.5px solid var(--ink, #111);
    background: var(--paper, #fff); color: var(--ink, #111); display: grid; place-items: center; cursor: pointer; box-shadow: 3px 3px 0 var(--ink, #111); padding: 0; }
  .mda-bt svg { width: 28px; height: 28px; }
  .mda-bt[aria-expanded="true"] { background: var(--accent, #166c40); color: var(--paper, #fff); }
  .mda-painel { position: fixed; left: 12px; bottom: 116px; z-index: 57; width: min(330px, calc(100vw - 24px)); max-height: calc(100vh - 140px); overflow: auto;
    background: var(--paper, #fff); color: var(--ink, #111); border: 1.5px solid var(--ink, #111); border-radius: 20px; padding: 14px 16px;
    box-shadow: 5px 5px 0 var(--ink, #111); font: 400 15px/1.4 var(--body, system-ui); }
  .mda-painel[hidden] { display: none; }
  .mda-painel h2 { font: 800 20px var(--display, system-ui); margin: 0 0 4px; }
  .mda-painel p { margin: 4px 0 10px; font-size: 13.5px; color: var(--ink-2, #444); }
  .mda-op { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; text-align: left; background: none; border: 0; border-top: 1px solid var(--line, #ddd);
    padding: 9px 2px; font: 500 15px var(--body, system-ui); color: var(--ink, #111); cursor: pointer; }
  .mda-op small { display: block; font-weight: 400; font-size: 12.5px; color: var(--ink-2, #555); }
  .mda-chave { flex: none; width: 42px; height: 24px; border-radius: 99px; border: 1.5px solid var(--ink, #111); background: var(--pill-2, #e2e2df); position: relative; }
  .mda-chave::after { content: ''; position: absolute; top: 2px; left: 2px; width: 17px; height: 17px; border-radius: 50%; background: var(--ink, #111); transition: left .15s; }
  .mda-op[aria-pressed="true"] .mda-chave { background: var(--accent, #166c40); }
  .mda-op[aria-pressed="true"] .mda-chave::after { left: 20px; background: var(--paper, #fff); }
  .mda-acoes { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 10px; border-top: 1px solid var(--line, #ddd); }
  .mda-acoes button, .mda-acoes a { font: 500 14px var(--body, system-ui); border: 1.5px solid var(--ink, #111); border-radius: 99px; padding: 6px 12px; background: var(--paper, #fff); color: var(--ink, #111); cursor: pointer; text-decoration: none; }
  .mda-legenda { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); z-index: 80; max-width: calc(100vw - 140px); background: #000; color: #fff;
    font: 600 17px/1.3 var(--body, system-ui); padding: 8px 16px; border-radius: 10px; border: 2px solid #ffd23f; pointer-events: none; text-align: center; }
  .mda-legenda[hidden] { display: none; }
  .mda-falando { outline: 3px dashed #ffd23f !important; outline-offset: 2px; }
  .mda-so-leitor { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media print { .mda-bt, .mda-painel, .mda-legenda, .mda-pular { display: none !important; } }
  `;
  const st = document.createElement('style');
  st.id = 'mda-css';
  st.textContent = css;
  (document.head || html).appendChild(st);

  function aplica() {
    ['contraste', 'letra', 'calmo'].forEach(k => { if (P[k]) html.setAttribute('data-a-' + k, ''); else html.removeAttribute('data-a-' + k); });
    if (P.voz) html.setAttribute('data-a-foco', ''); else html.removeAttribute('data-a-foco');
  }
  aplica();

  /* ---------- Voz ---------- */
  const temVoz = 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  let vozPt = null;
  function escolheVoz() {
    if (!temVoz) return;
    const vs = speechSynthesis.getVoices();
    vozPt = vs.find(v => /^pt[-_]BR/i.test(v.lang)) || vs.find(v => /^pt/i.test(v.lang)) || null;
  }
  if (temVoz) { escolheVoz(); try { speechSynthesis.addEventListener('voiceschanged', escolheVoz); } catch (e) {} }
  const limpa = t => String(t || '').replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
  let ultimo = '', ultimoT = 0, marcado = null;
  function fala(texto, opts) {
    opts = opts || {};
    if (!temVoz || (!P.voz && !opts.forca)) return;
    const t = limpa(texto);
    if (!t) return;
    const agora = Date.now();
    if (t === ultimo && agora - ultimoT < 1500) return;
    ultimo = t; ultimoT = agora;
    if (!opts.fila) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t.slice(0, 1200));
    u.lang = 'pt-BR';
    if (vozPt) u.voice = vozPt;
    u.rate = P.devagar ? 0.8 : 1;
    if (opts.el) {
      if (marcado) marcado.classList.remove('mda-falando');
      marcado = opts.el; marcado.classList.add('mda-falando');
      u.onend = u.onerror = () => { if (marcado === opts.el) { marcado.classList.remove('mda-falando'); marcado = null; } };
    }
    speechSynthesis.speak(u);
  }
  function paraFala() { if (temVoz) speechSynthesis.cancel(); if (marcado) { marcado.classList.remove('mda-falando'); marcado = null; } ultimo = ''; }

  // Nome de um elemento como um leitor de tela diria
  const PAPEL = { BUTTON: 'botão', A: 'link', SELECT: 'lista de opções', TEXTAREA: 'campo de texto', SUMMARY: 'mostrar ou esconder' };
  function nomeDe(el) {
    let n = el.getAttribute('aria-label') || '';
    const lb = el.getAttribute('aria-labelledby');
    if (!n && lb) n = lb.split(/\s+/).map(id => (document.getElementById(id) || {}).textContent || '').join(' ');
    if (!n && el.labels && el.labels.length) n = el.labels[0].textContent;
    if (!n && el.tagName === 'INPUT' && /button|submit|reset/.test(el.type)) n = el.value;
    if (!n) n = el.innerText || el.textContent || '';
    if (!n) n = el.getAttribute('title') || el.getAttribute('placeholder') || el.getAttribute('alt') || '';
    return limpa(n);
  }
  function descreveFoco(el) {
    const tag = el.tagName;
    let papel = el.getAttribute('role') === 'button' ? 'botão' : PAPEL[tag] || '';
    if (tag === 'INPUT') papel = { checkbox: 'caixa de marcar', radio: 'opção', range: 'controle deslizante', number: 'campo de número', button: 'botão', submit: 'botão' }[el.type] || 'campo de texto';
    let estado = '';
    const pr = el.getAttribute('aria-pressed');
    if (pr === 'true') estado = 'ligado'; else if (pr === 'false') estado = 'desligado';
    if (tag === 'INPUT' && (el.type === 'checkbox' || el.type === 'radio')) estado = el.checked ? 'marcado' : 'não marcado';
    if (el.disabled || el.getAttribute('aria-disabled') === 'true') estado += ' indisponível';
    let valor = '';
    if ((tag === 'INPUT' && !/button|submit|checkbox|radio/.test(el.type)) || tag === 'TEXTAREA') valor = el.value ? 'escrito: ' + el.value : '';
    if (tag === 'SELECT' && el.selectedOptions && el.selectedOptions[0]) valor = el.selectedOptions[0].textContent;
    return [nomeDe(el).slice(0, 300), papel, estado, valor].filter(Boolean).join(', ');
  }
  document.addEventListener('focusin', e => {
    if (!P.voz) return;
    const el = e.target;
    if (!el || el === document.body || !el.tagName) return;
    fala(descreveFoco(el), { el });
  });
  document.addEventListener('change', e => {
    if (!P.voz) return;
    const el = e.target;
    if (el && /INPUT|SELECT/.test(el.tagName) && /checkbox|radio|range|select/.test(el.type || 'select')) fala(descreveFoco(el));
  });

  // Avisos dos jogos (acerto, erro, pontos): tudo o que está em role="status", role="alert" ou aria-live
  const VIVO = '[aria-live]:not([aria-live="off"]), [role="status"], [role="alert"], [role="log"]';
  const lidos = new WeakMap();
  let filaAvisos = new Set(), tAviso = null;
  function anotaAviso(reg) {
    if (!reg || reg.closest('.mda-painel, .mda-legenda')) return;
    filaAvisos.add(reg);
    clearTimeout(tAviso);
    tAviso = setTimeout(leAvisos, 180);
  }
  function leAvisos() {
    const regs = [...filaAvisos]; filaAvisos = new Set();
    const textos = [];
    regs.forEach(r => {
      if (!r.isConnected || r.closest('[hidden], [aria-hidden="true"]')) return;
      const t = limpa(r.innerText || r.textContent);
      if (t && lidos.get(r) !== t) { lidos.set(r, t); textos.push(t); }
    });
    if (textos.length) fala(textos.join('. '));
  }

  /* ---------- Teclado: o que só tinha clique de mouse ---------- */
  const NATIVOS = 'a[href], button, input, select, textarea, summary, label, [tabindex]:not([tabindex="-1"]), [contenteditable], audio, video, iframe, option';
  const vistos = new WeakSet();
  function areaDoJogo() {
    const areas = [...document.querySelectorAll('.game-stage, .lab-layout, #stage')];
    return areas.length ? areas : [document.querySelector('main') || document.body];
  }
  function ativaComTeclado(el) {
    vistos.add(el);
    el.setAttribute('data-mda-teclado', '');
    el.setAttribute('tabindex', '0');
    if (!el.getAttribute('role')) el.setAttribute('role', 'button');
    if (!limpa(el.textContent) && !el.getAttribute('aria-label')) {
      const t = el.getAttribute('title') || el.getAttribute('data-nome') || el.getAttribute('data-label') || (el.querySelector('title') || {}).textContent || (el.querySelector('img[alt]') || {}).alt;
      if (t) el.setAttribute('aria-label', t);
    }
    el.addEventListener('keydown', e => {
      if (e.target !== el || (e.key !== 'Enter' && e.key !== ' ')) return;
      e.preventDefault();
      const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      const o = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
      el.dispatchEvent(new MouseEvent('click', o));
    });
  }
  function revisaTeclado() {
    let n = 0;
    areaDoJogo().forEach(area => {
      if (!area) return;
      const todos = area.querySelectorAll('div, span, li, td, th, p, img, svg, g, rect, circle, path, polygon, text, figure');
      for (const el of todos) {
        if (++n > 4000) return;
        if (vistos.has(el)) continue;
        if (el.closest(NATIVOS) || el.closest('.mda-painel') || el.closest('[aria-hidden="true"]')) { vistos.add(el); continue; }
        let cs;
        try { cs = getComputedStyle(el); } catch (e) { continue; }
        if (cs.cursor !== 'pointer' || cs.visibility === 'hidden' || cs.display === 'none' || cs.pointerEvents === 'none') continue;
        // o cursor é herdado: fica só o elemento de fora (o pai não tem a mãozinha)
        const pai = el.parentElement;
        if (pai && pai !== area && getComputedStyle(pai).cursor === 'pointer') continue;
        // classes visuais de botão usadas em etiquetas que não são clicáveis
        if (el.matches('.chip, .tag, [aria-current], [aria-disabled="true"]')) { vistos.add(el); continue; }
        // o jogo já deixou focáveis os irmãos iguais e este ficou de fora de propósito (ex.: peça que não se mexe)
        const cls = typeof el.className === 'string' ? el.className : (el.className && el.className.baseVal) || '';
        const c1 = cls.trim().split(/\s+/)[0];
        if (pai && c1 && /^[\w-]+$/.test(c1) && [...pai.children].some(x => x !== el && x.classList.contains(c1) && x.hasAttribute('tabindex') && !x.hasAttribute('data-mda-teclado'))) { vistos.add(el); continue; }
        // dentro de um svg, o próprio svg clicável já resolve
        if (el.ownerSVGElement && vistos.has(el.ownerSVGElement) && el.ownerSVGElement.getAttribute('tabindex')) continue;
        ativaComTeclado(el);
      }
    });
  }
  // Botões que só têm ícone ou emoji: usa o title como nome
  function revisaNomes() {
    document.querySelectorAll('button:not([aria-label]), a[href]:not([aria-label])').forEach(b => {
      if (!limpa(b.textContent) && b.title) b.setAttribute('aria-label', b.title);
    });
    document.querySelectorAll('canvas:not([role]):not([aria-label]):not([aria-hidden])').forEach(c => {
      const d = c.getAttribute('data-descricao');
      if (d) { c.setAttribute('role', 'img'); c.setAttribute('aria-label', d); }
    });
  }

  let tRevisa = null;
  const revisa = () => { clearTimeout(tRevisa); tRevisa = setTimeout(() => { revisaTeclado(); revisaNomes(); }, 300); };

  /* ---------- Legendas dos sons ---------- */
  let legEl = null, tLeg = null;
  function legenda(texto, ms) {
    if (!P.legendas || !texto) return;
    if (!legEl) {
      legEl = document.createElement('div');
      legEl.className = 'mda-legenda';
      legEl.setAttribute('aria-hidden', 'true');
      legEl.hidden = true;
      document.body.appendChild(legEl);
    }
    legEl.textContent = '[' + texto + ']';
    legEl.hidden = false;
    clearTimeout(tLeg);
    tLeg = setTimeout(() => { legEl.hidden = true; }, ms || 2200);
  }

  /* ---------- Painel ---------- */
  const OPCOES = [
    ['voz', 'Ler em voz alta', 'Lê botões, perguntas e os avisos de acerto e erro.'],
    ['legendas', 'Legendas dos sons', 'Mostra na tela o que cada som do jogo quer dizer.'],
    ['contraste', 'Alto contraste', 'Fundo preto, letras brancas e destaques em amarelo.'],
    ['letra', 'Letra maior', 'Aumenta o tamanho de tudo na área do jogo.'],
    ['calmo', 'Menos movimento', 'Desliga animações e transições.'],
    ['devagar', 'Voz mais devagar', 'A leitura em voz alta fica mais lenta.']
  ];
  const ICONE = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.2" r="2" fill="currentColor" stroke="none"/><path d="M4 8.5c2.6.8 5.3 1.2 8 1.2s5.4-.4 8-1.2"/><path d="M12 9.7v4.8"/><path d="M12 14.5l-3 6.5M12 14.5l3 6.5"/></svg>';
  let bt, painel;
  function montaPainel() {
    if (bt || window.MDA_SEM_PAINEL) return;
    bt = document.createElement('button');
    bt.type = 'button';
    bt.className = 'mda-bt no-print';
    bt.setAttribute('aria-label', 'Acessibilidade: leitura em voz alta, contraste, letra maior e legendas');
    bt.setAttribute('aria-expanded', 'false');
    bt.setAttribute('aria-controls', 'mda-painel');
    bt.title = 'Acessibilidade';
    bt.innerHTML = ICONE;
    painel = document.createElement('div');
    painel.className = 'mda-painel no-print';
    painel.id = 'mda-painel';
    painel.setAttribute('role', 'dialog');
    painel.setAttribute('aria-labelledby', 'mda-tit');
    painel.hidden = true;
    painel.innerHTML = `<h2 id="mda-tit">Acessibilidade</h2>
      <p>Vale para todos os jogos do site. Use Tab para passar pelos botões e Enter ou Espaço para escolher.</p>
      ${OPCOES.map(([k, t, d]) => `<button type="button" class="mda-op" data-op="${k}" aria-pressed="${!!P[k]}"><span>${t}<small>${d}</small></span><span class="mda-chave" aria-hidden="true"></span></button>`).join('')}
      <div class="mda-acoes">
        <button type="button" data-acao="ler">Ler a tela do jogo</button>
        <button type="button" data-acao="parar">Parar a leitura</button>
        ${GLOSSARIO ? `<a href="${GLOSSARIO}">Glossário em Libras</a>` : ''}
        <button type="button" data-acao="fechar">Fechar</button>
      </div>`;
    document.body.appendChild(painel);
    document.body.appendChild(bt);
    if (!temVoz) painel.querySelectorAll('[data-op="voz"], [data-op="devagar"], [data-acao="ler"], [data-acao="parar"]').forEach(b => { b.disabled = true; b.title = 'Este navegador não tem leitura em voz alta'; });
    bt.addEventListener('click', () => abre(painel.hidden));
    painel.addEventListener('click', e => {
      const op = e.target.closest('[data-op]'), ac = e.target.closest('[data-acao]');
      if (op) {
        const k = op.dataset.op;
        P[k] = !P[k]; salva(); aplica();
        op.setAttribute('aria-pressed', String(P[k]));
        const nome = OPCOES.find(o => o[0] === k)[1];
        if (k === 'voz') { if (P.voz) fala('Leitura em voz alta ligada.', { forca: true }); else { paraFala(); fala('Leitura em voz alta desligada.', { forca: true }); } }
        else fala(nome + (P[k] ? ' ligado' : ' desligado'));
        if (k === 'legendas' && P.legendas) legenda('Exemplo de legenda: som de acerto');
      }
      if (ac) {
        if (ac.dataset.acao === 'ler') leTela();
        if (ac.dataset.acao === 'parar') paraFala();
        if (ac.dataset.acao === 'fechar') abre(false);
      }
    });
    painel.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); abre(false); } });
  }
  function abre(sim) {
    painel.hidden = !sim;
    bt.setAttribute('aria-expanded', String(sim));
    if (sim) painel.querySelector('.mda-op').focus(); else bt.focus();
  }
  // Lê o texto visível da área do jogo (o leitor da pessoa, para quem não tem leitor de tela)
  function leTela() {
    const area = document.querySelector('.game-stage, .lab-layout, #stage') || document.querySelector('main') || document.body;
    const desc = [...area.querySelectorAll('canvas[aria-label], [role="img"][aria-label]')].map(c => c.getAttribute('aria-label'));
    fala([limpa(area.innerText), ...desc].join('. '), { forca: true, el: area });
  }

  /* ---------- Atalho "Pular para o jogo" ---------- */
  function montaPular() {
    const alvo = document.querySelector('.game-stage, .lab-layout, #stage');
    if (!alvo || document.querySelector('.mda-pular')) return;
    if (!alvo.id) alvo.id = 'mda-jogo';
    if (!alvo.hasAttribute('tabindex')) alvo.setAttribute('tabindex', '-1');
    const a = document.createElement('a');
    a.className = 'mda-pular';
    a.href = '#' + alvo.id;
    a.textContent = 'Pular para o jogo';
    a.addEventListener('click', e => { e.preventDefault(); alvo.focus(); alvo.scrollIntoView({ block: 'start' }); });
    document.body.insertBefore(a, document.body.firstChild);
  }

  function inicia() {
    montaPular();
    montaPainel();
    revisaTeclado();
    revisaNomes();
    new MutationObserver(ms => {
      let mudouArvore = false;
      for (const m of ms) {
        if (m.type === 'childList') mudouArvore = true;
        const alvo = m.target.nodeType === 1 ? m.target : m.target.parentElement;
        if (P.voz && alvo) {
          const reg = alvo.closest(VIVO);
          if (reg) anotaAviso(reg);
          m.addedNodes && m.addedNodes.forEach(nd => {
            if (nd.nodeType !== 1) return;
            if (nd.matches(VIVO)) anotaAviso(nd);
            nd.querySelectorAll && nd.querySelectorAll(VIVO).forEach(anotaAviso);
          });
        }
      }
      if (mudouArvore) revisa();
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicia); else inicia();

  window.MDA = {
    legenda,
    fala: (t, o) => fala(t, o),
    para: paraFala,
    ligada: k => !!P[k],
    descreve(el, texto) { if (!el) return; el.setAttribute('role', 'img'); el.setAttribute('aria-label', texto); },
    revisa
  };
})();
