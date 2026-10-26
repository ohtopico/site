/* Página de disciplina — gerada a partir de DISC[window.DISC_ID] e UNIDADES_POR_DISC. */
(function () {
  const id = window.DISC_ID, D = DISC[id], U = UNIDADES_POR_DISC[id] || [], BASE = window.ES_BASE || '';
  const app = document.getElementById('app');
  esTopbar(id); esFooter();
  if (!D) { app.innerHTML = '<div class="wrap"><h1>Disciplina não encontrada</h1></div>'; return; }
  const li = arr => arr.map(x => `<li>${esc(x)}</li>`).join('');
  const prontas = U.filter(u => !u.pendente);
  const usados = new Set(prontas.map(u => u.sim).filter(Boolean));
  const sims = SIMULADORES.filter(s => s.disc === id || usados.has(s.id));
  const nEx = prontas.reduce((s, u) => s + u.exercicios.length, 0);
  const simById = Object.fromEntries(SIMULADORES.map(s => [s.id, s]));

  const card = u => u.pendente ? `
      <article class="u-card pend">
        <span class="num">${String(u.n).padStart(2, '0')}</span>
        <h3>${esc(u.titulo)}</h3>
        <p>${esc(u.resumo || '')}</p>
        <span class="meta">Em preparação</span>
      </article>` : `
      <article class="u-card">
        <span class="num">${String(u.n).padStart(2, '0')}</span>
        <h3><a href="unidade.html?id=${u.id}">${esc(u.titulo)}</a></h3>
        <p>${esc(u.objetivos[0])}</p>
        <span class="meta">${u.exercicios.length} exercícios${u.sim ? ' · 🧪 simulador' : ''}</span>
      </article>`;
  const unidadesHTML = D.partes
    ? D.partes.map(p => `<div class="parte"><h3 class="parte-t">${esc(p.titulo)}</h3><p class="muted small">${esc(p.resumo)}</p>
        <div class="u-grid">${U.filter(u => u.parte === p.n).map(card).join('')}</div></div>`).join('')
    : `<div class="u-grid">${U.map(card).join('')}</div>`;

  app.innerHTML = `
  <section class="disc-head">
    <div class="wrap">
      <div class="crumbs"><a href="${BASE}index.html">← Ensino superior</a></div>
      <span class="eyebrow">Disciplina · Graduação em Computação${D.construcao ? ' · <span class="building">em construção</span>' : ''}</span>
      <h1>${esc(D.nome)}</h1>
      <p class="muted" style="max-width:780px">${esc(D.resumo)}</p>
      <div class="facts">${[
        `📚 ${prontas.length}${prontas.length < U.length ? ` de ${U.length}` : ''} unidades`,
        `✅ ${nEx} exercícios com gabarito`,
        `🧪 ${sims.length} simulador${sims.length === 1 ? '' : 'es'}`
      ].map(t => `<span>${t}</span>`).join('')}</div>
    </div>
  </section>
  <div class="tabs-bar"><div class="wrap"><nav class="seg" role="tablist" aria-label="Seções da disciplina" id="tabs"></nav></div></div>
  <main class="wrap">
    <section class="panel-sec" id="unidades" role="tabpanel">
      ${unidadesHTML}
    </section>

    <section class="panel-sec" id="simuladores" role="tabpanel" hidden>
      <p class="muted">Funcionam no navegador do computador ou do celular, sem cadastro. Bons para demonstração em aula e para estudo.</p>
      <div class="u-grid">${sims.map(s => {
        const uu = (UNIDADES_POR_DISC[s.disc] || []).find(u => u.id === s.unidade);
        return `<article class="u-card">
          <span class="ic">${s.icone}</span>
          <h3><a href="${BASE}${s.url}">${esc(s.titulo)}</a></h3>
          <p>${esc(s.resumo)}</p>
          <span class="meta">${s.revisao ? 'Revisão de pré-requisito' : uu ? `Unidade ${uu.n} · ${esc(uu.titulo)}` : ''}</span>
        </article>`; }).join('')}</div>
    </section>

    <section class="panel-sec" id="projetos" role="tabpanel" hidden>
      ${(D.projetos || []).map(p => `
        <div class="proj">
          <h2>${esc(p.titulo)}</h2>
          <div class="two-col">
            <p>${esc(p.descricao)}</p>
            <div class="panel"><h3>Sugestões</h3><ul>${li(p.sugestoes)}</ul>
              ${p.sim && simById[p.sim] ? `<a class="btn" href="${BASE}${simById[p.sim].url}">Abrir ${esc(simById[p.sim].titulo)} →</a>` : ''}</div>
          </div>
        </div>`).join('')}
    </section>

    <section class="panel-sec" id="referencias" role="tabpanel" hidden>
      <ul class="bib">${li(D.referencias || [])}</ul>
      <p class="small muted">Confira as edições disponíveis na biblioteca da sua instituição.</p>
    </section>
  </main>`;

  const $ = s => document.querySelector(s);
  const TABS = [['unidades', 'Unidades'], ['simuladores', 'Simuladores'], ['projetos', 'Projetos'], ['referencias', 'Referências']];
  function show(t, push) {
    if (!TABS.some(x => x[0] === t)) t = 'unidades';
    TABS.forEach(([x]) => { document.getElementById(x).hidden = x !== t; });
    $('#tabs').innerHTML = TABS.map(([x, l]) => `<a href="#${x}" role="tab" aria-selected="${x === t}" data-t="${x}">${l}</a>`).join('');
    if (push) history.replaceState(null, '', '#' + t);
  }
  $('#tabs').addEventListener('click', e => { const a = e.target.closest('a'); if (!a) return; e.preventDefault(); show(a.dataset.t, true); });
  window.addEventListener('hashchange', () => show(location.hash.slice(1)));
  show(location.hash.slice(1));
})();
