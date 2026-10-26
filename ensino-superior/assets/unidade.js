/* Página de unidade — usa window.DISC_ID e o parâmetro ?id= */
(function () {
  const did = window.DISC_ID, D = DISC[did], U = UNIDADES_POR_DISC[did] || [], BASE = window.ES_BASE || '';
  esTopbar(did); esFooter();
  const id = new URLSearchParams(location.search).get('id');
  const P = U.filter(x => !x.pendente), i = P.findIndex(x => x.id === id), u = P[i];
  const art = document.getElementById('art'), toc = document.getElementById('toc');
  if (!u) { art.innerHTML = `<h1>Unidade não encontrada</h1><p><a href="index.html#unidades">Ver unidades</a></p>`; return; }
  document.title = `Unidade ${u.n}: ${u.titulo} · ${D.sigla} | ohtopico`;
  const sim = u.sim && SIMULADORES.find(s => s.id === u.sim);
  const prev = P[i - 1], next = P[i + 1];
  art.innerHTML = `
    <div class="crumbs no-print"><a href="index.html#unidades">← ${esc(D.nome)} · Unidades</a></div>
    <span class="u-num">${String(u.n).padStart(2, '0')}</span>
    <h1>${esc(u.titulo)}</h1>
    <div class="meta-row"><span>${esc(D.nome)}</span>${D.partes && u.parte ? `<span>${esc(D.partes[u.parte - 1].titulo.split(' — ')[0])}</span>` : ''}<span>${u.exercicios.length} exercícios</span>${sim ? '<span>🧪 com simulador</span>' : ''}</div>
    <div class="btn-row no-print"><button class="btn ghost" type="button" id="print">🖨️ Imprimir (sem gabarito)</button></div>
    <h2 id="obj">Objetivos</h2>
    <ul>${u.objetivos.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
    ${u.secoes.map(([t, h], k) => `<h2 id="s${k}">${esc(t)}</h2>${h}`).join('')}
    ${sim ? `<div class="simbox no-print"><div><strong>${sim.icone} Experimente no simulador</strong><div class="small">${esc(sim.titulo)}</div></div><a class="btn" href="${BASE}${sim.url}">Abrir simulador →</a></div>` : ''}
    <h2 id="ex">Exercícios</h2>
    ${u.exercicios.map(([q, a], k) => `<div class="ex"><div class="q"><strong>${k + 1}.</strong> ${q}</div><details><summary>Ver resposta</summary><div class="ans">${a}</div></details></div>`).join('')}
    <h2 id="lei">Leitura recomendada</h2>
    <p>${esc(u.leitura)}</p>
    <nav class="pager no-print">
      ${prev ? `<a class="btn ghost" href="unidade.html?id=${prev.id}">← U${prev.n}: ${esc(prev.titulo)}</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="unidade.html?id=${next.id}">U${next.n}: ${esc(next.titulo)} →</a>` : ''}
    </nav>`;
  toc.innerHTML = `<strong>Nesta unidade</strong><a href="#obj">Objetivos</a>` + u.secoes.map(([t], k) => `<a href="#s${k}">${esc(t)}</a>`).join('') + `<a href="#ex">Exercícios</a><a href="#lei">Leitura</a>`;
  document.getElementById('print').onclick = () => { document.querySelectorAll('.ex details').forEach(d => d.open = false); window.print(); };
})();
