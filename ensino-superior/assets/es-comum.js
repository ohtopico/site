/* Ensino Superior — tema, barra superior e rodapé.
   Cada página define window.ES_BASE: caminho até a pasta ensino-superior ('' na raiz, '../' nas pastas das disciplinas e em simuladores/). */
(function () {
  const BASE = window.ES_BASE || '';
  window.esStore = {
    get(k, d) { try { const v = localStorage.getItem('es-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('es-' + k, JSON.stringify(v)); } catch (e) {} }
  };
  // Tema compartilhado com o resto do site
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const saved = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch (e) {}

  window.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  window.esTopbar = function (atual) {
    const el = document.getElementById('topbar'); if (!el) return;
    const link = (id, href, txt) => `<a href="${BASE}${href}"${atual === id ? ' aria-current="page"' : ''}>${txt}</a>`;
    el.className = 'topbar';
    el.innerHTML = `
      <a class="brand" href="${BASE}../">ohtopico</a>
      <a class="brand-sub" href="${BASE}index.html">/ ensino superior</a>
      <span class="spacer"></span>
      <nav class="topnav" aria-label="Seções">
        ${link('inicio', 'index.html', 'Início')}
        ${link('arq', 'arquitetura/index.html', 'Arquitetura')}
        ${link('cd', 'ciencia-de-dados/index.html', 'Ciência de Dados')}
        ${link('sim', 'index.html#simuladores', 'Simuladores')}
        <a href="${BASE}../material-didatico/">Educação básica</a>
      </nav>
      <button class="icon-btn" id="theme-btn" aria-label="Alternar tema claro/escuro">${sun}</button>`;
    document.getElementById('theme-btn').addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('iapraprof:theme', JSON.stringify(next)); } catch (e) {}
    });
  };

  window.esFooter = function () {
    const el = document.getElementById('footer'); if (!el) return;
    el.className = 'footer';
    el.innerHTML = `<div class="wrap">
      <p>Conteúdos didáticos para o ensino superior em Computação, organizados por
      <a href="${BASE}../curriculo/">Júlia Roberta Quoos Alves</a>. Veja também o <a href="${BASE}../material-didatico/">material para os anos finais do Ensino Fundamental</a>.</p>
      <p>Uso livre em aulas, com citação da fonte. Sugestões: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
    </div>`;
  };

  /* Cabeçalho padrão dos simuladores */
  window.esSimHead = function (id) {
    const s = SIMULADORES.find(x => x.id === id), el = document.getElementById('sim-head');
    if (!s || !el) return;
    const D = DISC[s.disc], u = UNIDADES_POR_DISC[s.disc].find(x => x.id === s.unidade);
    document.title = `${s.titulo} · Simuladores | ohtopico`;
    el.innerHTML = `
      <div class="crumbs"><a href="${BASE}index.html#simuladores">← Simuladores</a> · <a href="${BASE}${D.url}index.html#simuladores">${esc(D.nome)}</a></div>
      <span class="eyebrow">Simulador · ${s.revisao ? 'revisão de pré-requisito' : `${esc(D.nome)} · unidade ${u.n}`}</span>
      <h1>${s.icone} ${esc(s.titulo)}</h1>
      <p class="muted" style="max-width:760px">${esc(s.resumo)}</p>
      <div class="btn-row"><a class="btn ghost" href="${BASE}${D.url}unidade.html?id=${u.id}">Notas da unidade ${u.n}: ${esc(u.titulo)}</a></div>`;
  };
})();
