/* Funções comuns: tema, barra superior, rodapé, etiquetas e blocos relacionados.
   Cada página define window.MD_BASE ('' na raiz de material-didatico, '../' nos jogos). */
(function () {
  const BASE = window.MD_BASE || '';
  const store = {
    get(k, d) { try { const v = localStorage.getItem('md-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('md-' + k, JSON.stringify(v)); } catch (e) {} }
  };
  window.mdStore = store;

  // Tema compartilhado com o resto do site (mesma chave do IA pra Prof e da página inicial)
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const saved = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch (e) {}

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  window.esc = esc;

  window.tagHab = function (codigo) {
    const h = HAB[codigo];
    const cls = h ? h.comp.toLowerCase() : '';
    const title = h ? esc(h.codigo + ' — ' + h.texto) : esc(codigo);
    return `<a class="tag code ${cls}" href="${BASE}catalogo.html?hab=${codigo}" title="${title}">${codigo}</a>`;
  };
  window.tagComp = c => `<span class="tag ${c.toLowerCase()}">${COMPONENTES[c].curto}</span>`;
  window.anosTxt = anos => {
    if (anos.length === 1) return `${anos[0]}º ano`;
    const seq = anos.every((a, i) => i === 0 || a === anos[i - 1] + 1);
    return seq ? `${anos[0]}º ao ${anos[anos.length - 1]}º ano` : anos.map(a => a + 'º').join(', ') + ' anos';
  };
  window.recUrl = r => BASE + r.url;

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  window.mdTopbar = function (atual) {
    const el = document.getElementById('topbar');
    if (!el) return;
    const link = (id, href, txt) => `<a href="${BASE}${href}"${atual === id ? ' aria-current="page"' : ''}>${txt}</a>`;
    el.className = 'topbar';
    el.innerHTML = `
      <a class="brand" href="${BASE}../">ohtopico</a>
      <a class="brand-sub" href="${BASE}index.html">/ material didático</a>
      <span class="spacer"></span>
      <nav class="topnav" aria-label="Seções">
        ${link('inicio', 'index.html', 'Início')}
        ${link('computacao', 'computacao/', 'Computação')}
        ${link('matematica', 'matematica/', 'Matemática')}
        ${link('catalogo', 'catalogo.html', 'Catálogo')}
        ${link('bncc', 'bncc.html', 'BNCC')}
        ${link('professor', 'professor.html', 'Professor')}
      </nav>
      <a class="icon-btn prog-btn" href="${BASE}meu-progresso.html"${atual === 'progresso' ? ' aria-current="page"' : ''} aria-label="Meu progresso" title="Meu progresso"><span aria-hidden="true">📈</span><span class="prog-txt">Meu progresso</span></a>
      <button class="icon-btn" id="theme-btn" aria-label="Alternar tema claro/escuro">${sun}</button>`;
    document.getElementById('theme-btn').addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('iapraprof:theme', JSON.stringify(next)); } catch (e) {}
    });
  };

  window.mdFooter = function () {
    const el = document.getElementById('footer');
    if (!el) return;
    el.className = 'footer';
    el.innerHTML = `<div class="wrap">
      <p>Material didático de Computação e Matemática para os anos finais do Ensino Fundamental, organizado por
      <a href="${BASE}../curriculo/">Júlia Roberta Quoos Alves</a>. Habilidades com base na
      <a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener">BNCC</a> e no complemento de Computação (Resolução CNE/CEB nº 1/2022); os textos das habilidades aparecem resumidos.</p>
      <p>Uso livre em sala de aula, com citação da fonte. Sugestões: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
    </div>`;
  };

  /* Cartão de material (catálogo e página inicial).
     opts.codeButtons: códigos viram botões de filtro (data-hab) em vez de links. */
  window.mdCard = function (r, opts) {
    opts = opts || {};
    const cc = r.comp.length > 1 ? 'c-coma' : 'c-' + r.comp[0].toLowerCase();
    const max = 3, extra = r.habs.length - max;
    const code = c => opts.codeButtons
      ? `<button class="tag code ${HAB[c].comp.toLowerCase()}" type="button" data-hab="${c}" title="${esc(c + ' — ' + HAB[c].texto)}">${c}</button>`
      : tagHab(c);
    const feito = window.MDP && (r.tipo === 'jogo' || r.tipo === '3d' || r.tipo === 'lista') ? MDP.resultado(r.id) : null;
    const cta = { jogo: 'Jogar', '3d': 'Explorar', ficha: 'Abrir ficha', plano: 'Ver plano', lista: 'Abrir lista' }[r.tipo];
    return `<article class="rc t-${r.tipo} ${cc}">
      <div class="rc-cover" aria-hidden="true">
        <span class="rc-type">${TIPOS[r.tipo].icone} ${TIPOS[r.tipo].nome}</span>
        <span class="rc-time">⏱ ${r.tempo}</span>
        ${feito ? `<span class="rc-done" title="Sua melhor nota neste aparelho">✓ ${feito.b}%</span>` : ''}
        <span class="rc-icon">${r.icone}</span>
      </div>
      <div class="rc-body">
        <div class="rc-meta">${r.comp.map(c => `<span class="dot ${c.toLowerCase()}"></span>${COMPONENTES[c].curto}`).join(' ')}<span class="sep">·</span>${anosTxt(r.anos)}</div>
        <h3><a href="${recUrl(r)}">${esc(r.titulo)}</a></h3>
        <p>${esc(r.resumo)}</p>
        <div class="rc-foot">
          <div class="tags">${r.habs.slice(0, max).map(code).join('')}${extra > 0 ? `<span class="tag" title="${r.habs.slice(max).join(', ')}">+${extra}</span>` : ''}</div>
          <span class="rc-cta">${cta} →</span>
        </div>
      </div>
    </article>`;
  };

  /* Bloco "habilidades + como jogar + relacionados" para as páginas de jogo */
  window.mdJogoHead = function (id) {
    const r = REC[id];
    const el = document.getElementById('game-head');
    if (!r || !el) return;
    document.title = `${r.titulo} · Material didático | ohtopico`;
    el.innerHTML = `
      <div class="tags" style="margin-bottom:12px">${r.comp.map(tagComp).join('')}<span class="tag">${anosTxt(r.anos)}</span><span class="tag">⏱ ${r.tempo}</span></div>
      <h1>${esc(r.titulo)}</h1>
      <p class="muted" style="max-width:720px">${esc(r.resumo)}</p>
      <div class="tags">${r.habs.map(tagHab).join('')}</div>`;
    const rel = document.getElementById('related');
    if (rel) {
      const itens = [];
      if (r.plano && REC[r.plano]) itens.push(REC[r.plano]);
      if (r.ficha && REC[r.ficha]) itens.push(REC[r.ficha]);
      RECURSOS.filter(o => o.tipo === (r.tipo === '3d' ? '3d' : 'jogo') && o.id !== id && o.comp.some(c => r.comp.includes(c))).slice(0, r.tipo === '3d' ? 3 : 2).forEach(o => itens.push(o));
      rel.innerHTML = itens.map(o => `
        <a class="card" href="${recUrl(o)}">
          <span class="small muted">${TIPOS[o.tipo].icone} ${TIPOS[o.tipo].nome}</span>
          <strong>${esc(o.titulo)}</strong>
          <span class="small muted">${esc(o.resumo)}</span>
        </a>`).join('');
    }
  };
})();

// Estrelas secretas do site (dicas escondidas e contador de estrelas)
(function () { const s = document.createElement('script'); s.src = '/assets/estrelas.js?v=202610270000'; s.defer = true; document.head.appendChild(s); })();
