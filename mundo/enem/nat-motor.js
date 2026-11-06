/* Motor dos jogos de Ciências da Natureza da Ilha ENEM (mundo/enem/nat-*.html, listados em jogos-natureza.js).
   Cada jogo chama NAT.jogo({...}) com:
     id, icone, titulo, intro, habs: ['H1', ...], area: 'fis' | 'qui' | 'bio',
     cola: [html, ...]                        cartõezinhos da "Cola rápida"
     lab: { titulo, texto, controles: [{ id, rotulo, min, max, passo, valor, unid, fmt }], desenhar(v) -> { svg, leitura } }
     desafios: [() => ({ fig, enun, certa, erradas, expl }), ...]   valores sorteados a cada rodada
   Usa o enem.js (código secreto, estrelas) e o visual do Mundo (enem.css). */
(function () {
  if (!window.ENEM) return;
  ENEM.exigir();
  if (!ENEM.liberado()) return;

  // Matriz de Referência do ENEM, Ciências da Natureza: resumo curto de cada habilidade
  const HABS = {
    H1: 'Fenômenos ondulatórios e seus usos', H2: 'Ciência e tecnologia resolvendo problemas', H3: 'Ciência x senso comum ao longo do tempo',
    H4: 'Intervenções no ambiente e biodiversidade', H5: 'Dimensionar circuitos e aparelhos elétricos', H6: 'Manuais e aparelhos do dia a dia',
    H7: 'Testes e critérios para comparar materiais', H8: 'Etapas de obtenção e reciclagem de recursos', H9: 'Ciclos biogeoquímicos e fluxo de energia',
    H10: 'Poluentes: fonte, transporte e destino', H11: 'Biotecnologia: benefícios, limites e ética', H12: 'Impactos de atividades econômicas',
    H13: 'Hereditariedade e transmissão da vida', H14: 'Equilíbrio interno, defesa e reprodução', H15: 'Modelos e experimentos em biologia',
    H16: 'Evolução e classificação dos seres vivos', H17: 'Gráficos, tabelas e fórmulas nas ciências', H18: 'Propriedades dos materiais e suas finalidades',
    H19: 'Métodos científicos para resolver problemas', H20: 'Movimento de corpos e partículas', H21: 'Termodinâmica e eletromagnetismo',
    H22: 'Radiação e matéria', H23: 'Geração e transformação de energia', H24: 'Códigos e nomenclatura da química',
    H25: 'Obtenção de materiais: etapas e rendimento', H26: 'Recursos energéticos e minerais', H27: 'Intervenções ambientais com química',
    H28: 'Adaptações e biomas brasileiros', H29: 'Técnicas com seres vivos', H30: 'Ações para melhorar a vida coletiva'
  };
  const AREA = { fis: ['Física', '#ffd58a'], qui: ['Química', '#f7a8c4'], bio: ['Biologia', '#a8e6b8'] };

  const sorteia = a => a[Math.floor(Math.random() * a.length)];
  const entre = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const num = (n, casas = 2) => (Math.round(n * 10 ** casas) / 10 ** casas).toLocaleString('pt-BR', { maximumFractionDigits: casas });
  const f = t => `<span class="formula">${t}</span>`;
  const unicos = (certa, erradas) => { const v = new Set([certa]); return erradas.filter(e => e != null && !v.has(e) && v.add(e)).slice(0, 4); };

  const CSS = `
  .formula { font-family: ui-monospace, Consolas, monospace; background: var(--pill); padding: 1px 6px; border-radius: 6px; white-space: nowrap; }
  .cola { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin: 6px 0 12px; }
  .cola div { border: 1.5px solid var(--ink); border-radius: 14px; padding: 8px 12px; background: var(--cor-area); font-size: 14.5px; }
  .cola b { font-family: var(--display); }
  .habs { display: flex; flex-wrap: wrap; gap: 6px; margin: 10px 0 4px; }
  .hab { font-size: 13px; font-weight: 600; padding: 3px 10px; border-radius: 99px; border: 2px solid rgba(0,0,0,.15); background: #fff; }
  .hab b { font-family: var(--display); }
  .fig { display: block; width: 100%; max-width: 520px; margin: 4px auto 10px; background: #fff; border: 2px solid var(--borda); border-radius: 18px; }
  .fig text { fill: var(--ink); font-family: var(--body); font-size: 13px; font-weight: 600; }
  .fig .fino { font-weight: 400; }
  .lab-ctrl { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px 18px; margin: 8px 0 6px; }
  .lab-ctrl label { display: grid; gap: 2px; font-weight: 600; font-size: 15px; }
  .lab-ctrl output { font-family: var(--display); font-size: 18px; }
  .lab-ctrl input[type=range] { width: 100%; accent-color: #2a5fa8; height: 28px; }
  .leitura { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 0; }
  .leitura .plaq { white-space: normal; font-weight: 500; display: inline-block; }
  .leitura .plaq b { font-size: 17px; }
  .abas { display: flex; gap: 8px; margin: 0 0 10px; flex-wrap: wrap; }
  .abas .hb[aria-pressed="false"] { background: #fff; color: var(--ink); border-color: var(--borda); }
  .alt.dica-txt { font-weight: 500; }`;

  window.NAT = { sorteia, entre, num, f, HABS, jogo };

  function jogo(J) {
    const est = document.createElement('style'); est.textContent = CSS; document.head.appendChild(est);
    document.documentElement.style.setProperty('--cor-area', AREA[J.area][1]);
    document.title = J.titulo + ' · Ilha ENEM';
    const $ = s => document.querySelector(s);
    ENEM.topo($('#topo'));
    const N = J.desafios.length;
    $('#jogo').innerHTML = `<div class="e-head">
        <a class="hb azul e-voltar" href="./">← Voltar à ilha</a>
        <h1>${J.icone} ${J.titulo}</h1>
        <p class="muted">${J.intro}</p>
        <div class="habs" aria-label="Habilidades da Matriz ENEM que este jogo treina">
          <span class="hab" style="background:var(--cor-area)">${AREA[J.area][0]}</span>
          ${J.habs.map(h => `<span class="hab" title="${HABS[h]}"><b>${h}</b> · ${HABS[h]}</span>`).join('')}
        </div>
      </div>
      ${J.cola ? `<details class="howto"><summary>Cola rápida</summary><div class="cola">${J.cola.map(c => `<div>${c}</div>`).join('')}</div></details>` : ''}
      ${J.lab ? `<div class="abas" role="group" aria-label="Modo"><button class="hb" type="button" id="ab-lab" aria-pressed="true">🔬 Laboratório</button><button class="hb" type="button" id="ab-des" aria-pressed="false">🎯 Desafios ENEM</button></div>` : ''}
      <div class="game-stage" id="palco" aria-live="polite"></div>`;
    const palco = $('#palco');

    /* ---------- laboratório: mexa nos controles e veja o que muda ---------- */
    function lab() {
      const L = J.lab, v = {};
      L.controles.forEach(c => v[c.id] = c.valor);
      palco.innerHTML = `<h2 style="margin-top:0">${L.titulo}</h2><p class="muted" style="margin-top:0">${L.texto}</p>
        <div id="lab-fig"></div>
        <div class="lab-ctrl">${L.controles.map(c => `<label>${c.rotulo}<output id="o-${c.id}"></output>
          <input type="range" id="c-${c.id}" min="${c.min}" max="${c.max}" step="${c.passo || 1}" value="${c.valor}"></label>`).join('')}</div>
        <div class="leitura" id="lab-leit"></div>
        <div class="btn-row" style="margin-top:16px"><button class="btn" type="button" id="ir-des">🎯 Fazer os desafios</button></div>`;
      const desenha = () => {
        L.controles.forEach(c => $('#o-' + c.id).textContent = c.fmt ? c.fmt(v[c.id]) : num(v[c.id]) + (c.unid ? ' ' + c.unid : ''));
        const r = L.desenhar(v);
        $('#lab-fig').innerHTML = r.svg;
        $('#lab-leit').innerHTML = (r.leitura || []).map(t => `<span class="plaq">${t}</span>`).join('');
      };
      L.controles.forEach(c => $('#c-' + c.id).addEventListener('input', e => { v[c.id] = +e.target.value; desenha(); }));
      desenha();
      $('#ir-des').onclick = () => modo('des');
    }

    /* ---------- desafios: rodada de N questões com valores sorteados ---------- */
    let fila = [], i = 0, acertos = 0, respondida = false, erradas = [];
    function comecar() { fila = ENEM.embaralha(J.desafios).map(g => g()); i = 0; acertos = 0; erradas = []; mostrar(); }
    function mostrar() {
      const d = fila[i]; respondida = false;
      d.alts = ENEM.embaralha([d.certa, ...unicos(d.certa, d.erradas)]);
      palco.innerHTML = `<div class="hud"><span>Desafio <b>${i + 1}</b> de ${fila.length}</span><span>Acertos <b>${acertos}</b></span>${d.hab ? `<span class="hab" title="${HABS[d.hab]}"><b>${d.hab}</b></span>` : ''}</div>
        <div class="barra"><i style="width:${i / fila.length * 100}%"></i></div>
        <div id="fig">${d.fig || ''}</div>
        <div class="q-enun">${d.enun}</div>
        <div class="alts">${d.alts.map((t, k) => `<button class="alt" type="button" data-k="${k}"><span class="letra">${'ABCDE'[k]}</span><span>${t}</span></button>`).join('')}</div>
        <div id="corr"></div><div class="btn-row" id="seguir" style="margin-top:14px"></div>`;
      palco.querySelectorAll('[data-k]').forEach(b => b.onclick = () => responder(b));
    }
    function responder(botao) {
      if (respondida) return; respondida = true;
      const d = fila[i], ok = d.alts[+botao.dataset.k] === d.certa;
      if (ok) acertos++; else erradas.push(d);
      palco.querySelectorAll('.alt').forEach(b => { b.disabled = true; if (d.alts[+b.dataset.k] === d.certa) b.classList.add('certa'); else if (b === botao) b.classList.add('errada'); });
      if (d.figDepois) $('#fig').innerHTML = d.figDepois;
      $('#corr').innerHTML = `<div class="corr ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Isso!' : 'Resposta: ' + d.certa + '.'}</b><br>${d.expl}${d.mac ? `<div class="mac">💡 ${d.mac}</div>` : ''}</div>`;
      const ultima = i === fila.length - 1;
      $('#seguir').innerHTML = `<button class="btn" type="button" id="prox">${ultima ? 'Ver resultado' : 'Próximo →'}</button>`;
      $('#prox').onclick = () => { if (ultima) fim(); else { i++; mostrar(); } };
      $('#prox').focus({ preventScroll: true });
    }
    function fim() {
      ENEM.contarFeitas(fila.length);
      const n = fila.length, e = acertos === n ? 3 : acertos >= n - 1 ? 2 : acertos >= Math.ceil(n * 0.6) ? 1 : 0;
      const novo = ENEM.darEstrelas(J.id, e);
      $('#tot-est').textContent = ENEM.totalEstrelas();
      palco.innerHTML = `<div class="fim"><div class="grande">${acertos}/${n}</div>${ENEM.estrelasHtml(e)}
        <h2 style="margin-top:10px">${e === 3 ? 'Gabaritou!' : e ? 'Boa! Cada rodada sorteia valores novos.' : 'Abra a cola rápida e o laboratório e tente de novo.'}</h2>
        ${novo ? '<p class="feedback ok">Novo recorde de estrelas!</p>' : ''}
        <div class="btn-row" style="justify-content:center;margin-top:12px"><button class="btn" type="button" id="denovo">Jogar de novo</button>
          <a class="btn ghost" href="simulado.html?area=${J.area}">Simulado de ${AREA[J.area][0]}</a><a class="btn ghost e-voltar" href="./">Voltar à ilha</a></div>
        ${erradas.length ? `<h3 style="margin-top:24px;text-align:left">O que você errou</h3><div class="lista-erros">${erradas.map(d => `<div class="corr bad">${d.enun}<br>→ <b>${d.certa}</b>. ${d.expl}</div>`).join('')}</div>` : ''}</div>`;
      $('#denovo').onclick = comecar;
    }
    document.addEventListener('keydown', e => {
      if (respondida || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      const k = e.key.toUpperCase(), idx = '12345'.indexOf(k) >= 0 ? '12345'.indexOf(k) : 'ABCDE'.indexOf(k);
      const b = idx >= 0 && palco.querySelector(`[data-k="${idx}"]`); if (b) { b.click(); e.preventDefault(); }
    });

    function modo(m) {
      if (J.lab) { $('#ab-lab').setAttribute('aria-pressed', m === 'lab'); $('#ab-des').setAttribute('aria-pressed', m === 'des'); }
      if (m === 'lab') lab(); else comecar();
    }
    if (J.lab) { $('#ab-lab').onclick = () => modo('lab'); $('#ab-des').onclick = () => modo('des'); }
    modo(J.lab && !/desafio/.test(location.hash) ? 'lab' : 'des');
  }
})();
