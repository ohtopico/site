/* Ilha ENEM · Matemática: motor dos jogos de perguntas geradas (mat-quiz.html?j=ID).
   Cada jogo (mat-bancos.js) é uma lista de geradores; cada gerador devolve uma questão nova a cada rodada:
   { h:'H16', tema:'Regra de três inversa', enun, fig (SVG opcional), certa, erradas:[...], expl, mac (macete opcional) }.
   Também guarda os helpers de números e de figuras SVG usados pelos geradores e pelos simuladores. */
(function () {
  const M = window.MAT = {};

  /* ---------- números ---------- */
  M.int = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  M.pick = a => a[Math.floor(Math.random() * a.length)];
  M.mix = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  M.arred = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
  M.f = (n, d = 2) => Number(M.arred(n, d)).toLocaleString('pt-BR', { maximumFractionDigits: d });
  M.R = n => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  M.pct = (n, d = 1) => M.f(n, d) + '%';
  M.mdc = (a, b) => b ? M.mdc(b, a % b) : a;
  M.mmc = (a, b) => a / M.mdc(a, b) * b;
  M.fat = n => n <= 1 ? 1 : n * M.fat(n - 1);
  M.comb = (n, k) => M.fat(n) / (M.fat(k) * M.fat(n - k));
  M.frac = (a, b) => { const g = M.mdc(a, b); return (a / g) + '/' + (b / g); };
  M.pot = (b, e) => `${b}<sup>${e}</sup>`;

  /* ---------- figuras SVG (claras, no traço do Mundo) ---------- */
  const INK = '#1d2a1f', C = { azul: '#3f8fe0', amarelo: '#f6b73c', verde: '#4bb259', vermelho: '#e85c4a', rosa: '#e07bb0', roxo: '#9a6bd6', agua: '#a8d8f7', creme: '#fff6dd', cinza: '#e7e2d2' };
  M.C = C; M.INK = INK;
  const PAL = [C.azul, C.amarelo, C.verde, C.vermelho, C.rosa, C.roxo];
  M.PAL = PAL;
  M.svg = (w, h, inner, alt = 'Figura') => `<svg class="q-fig" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${alt}" style="font-family:Lexend,system-ui,sans-serif;width:100%;height:auto">` +
    `<rect width="${w}" height="${h}" fill="#fff"/>${inner}</svg>`;
  M.t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.size || 14}" text-anchor="${o.anchor || 'middle'}" fill="${o.cor || INK}" font-weight="${o.peso || 500}"${o.extra || ''}>${s}</text>`;
  M.linha = (x1, y1, x2, y2, o = {}) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${o.cor || INK}" stroke-width="${o.w || 2}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;
  M.rect = (x, y, w, h, fill, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${o.cor || INK}" stroke-width="${o.w == null ? 2 : o.w}" rx="${o.rx || 0}"/>`;
  M.poli = (pts, fill, o = {}) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${fill}" stroke="${o.cor || INK}" stroke-width="${o.w || 2}" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;

  /* passo “redondo” para os eixos (1, 2, 2,5 ou 5 vezes uma potência de 10) */
  M.passo = bruto => { const e = 10 ** Math.floor(Math.log10(bruto || 1)); return [1, 2, 2.5, 5, 10].map(m => m * e).find(v => v >= bruto); };
  /* gráfico de barras: dados [[rótulo, valor]] */
  M.barras = (dados, o = {}) => {
    const W = 460, H = 250, x0 = 50, y0 = 210, top = 30, vmax = Math.max(...dados.map(d => d[1])), st = M.passo(vmax / 4), max = o.max || Math.ceil(vmax * 1.08 / st) * st, bw = (W - x0 - 14) / dados.length;
    const y = v => y0 - (v / max) * (y0 - top);
    let s = M.t(W / 2, 16, o.titulo || '', { size: 14, peso: 700 });
    for (let v = 0; v <= max + 1e-9; v += st) s += M.linha(x0, y(v), W - 10, y(v), { cor: '#ece6d3', w: 1 }) + M.t(x0 - 6, y(v) + 4, M.f(v, 2), { size: 11, anchor: 'end', cor: '#5a6a5c' });
    dados.forEach((d, i) => {
      const x = x0 + i * bw + bw * 0.16, w = bw * 0.68;
      s += M.rect(x, y(d[1]), w, y0 - y(d[1]), o.cores ? o.cores[i] : (o.cor || C.azul), { w: 1.5, rx: 3 });
      if (o.valores !== false) s += M.t(x + w / 2, y(d[1]) - 5, (o.pre || '') + M.f(d[1], 1) + (o.suf || ''), { size: 11.5, peso: 700 });
      s += M.t(x + w / 2, y0 + 17, d[0], { size: 12 });
    });
    s += M.linha(x0, y0, W - 10, y0) + M.linha(x0, top - 6, x0, y0);
    if (o.eixo) s += M.t(14, (top + y0) / 2, o.eixo, { size: 11, extra: ` transform="rotate(-90 14 ${(top + y0) / 2})"` });
    return M.svg(W, H, s, o.titulo || 'Gráfico de barras');
  };
  /* gráfico de linha: dados [[rótulo, valor]] (várias séries: o.series = [{nome, cor, dados}]) */
  M.linhas = (series, o = {}) => {
    const W = 460, H = 250, x0 = 46, y0 = 210, top = 30, n = series[0].dados.length;
    const todos = series.flatMap(s => s.dados.map(d => d[1])), min0 = o.min != null ? o.min : Math.min(0, ...todos), st = M.passo(((o.max || Math.max(...todos)) - min0) / 4);
    const min = Math.floor(min0 / st) * st, max = o.max || Math.ceil(Math.max(...todos) * 1.06 / st) * st;
    const x = i => x0 + 16 + i * (W - x0 - 40) / (n - 1), y = v => y0 - ((v - min) / (max - min)) * (y0 - top);
    let s = M.t(W / 2, 16, o.titulo || '', { size: 14, peso: 700 });
    for (let v = min; v <= max + 1e-9; v += st) s += M.linha(x0, y(v), W - 10, y(v), { cor: '#ece6d3', w: 1 }) + M.t(x0 - 6, y(v) + 4, M.f(v, 2), { size: 11, anchor: 'end', cor: '#5a6a5c' });
    series[0].dados.forEach((d, i) => { s += M.t(x(i), y0 + 17, d[0], { size: 11.5 }); });
    series.forEach((se, k) => {
      const cor = se.cor || PAL[k];
      s += `<polyline fill="none" stroke="${cor}" stroke-width="3" stroke-linejoin="round" points="${se.dados.map((d, i) => x(i) + ',' + y(d[1])).join(' ')}"/>`;
      se.dados.forEach((d, i) => { s += `<circle cx="${x(i)}" cy="${y(d[1])}" r="4.5" fill="#fff" stroke="${cor}" stroke-width="2.5"/>`; if (o.valores !== false) s += M.t(x(i), y(d[1]) - 9, M.f(d[1], 1), { size: 11, peso: 700 }); });
      if (series.length > 1) s += M.rect(W - 130, 30 + k * 18, 12, 12, cor, { w: 1 }) + M.t(W - 112, 41 + k * 18, se.nome, { size: 12, anchor: 'start' });
    });
    s += M.linha(x0, y0, W - 10, y0) + M.linha(x0, top - 8, x0, y0);
    return M.svg(W, H, s, o.titulo || 'Gráfico de linhas');
  };
  /* gráfico de setores: partes [[rótulo, porcentagem]] */
  M.pizza = (partes, o = {}) => {
    const W = 460, H = 240, cx = 130, cy = 128, r = 92; let a = -Math.PI / 2, s = M.t(W / 2, 18, o.titulo || '', { size: 14, peso: 700 });
    const tot = partes.reduce((t, p) => t + p[1], 0);
    partes.forEach((p, i) => {
      const da = p[1] / tot * 2 * Math.PI, b = a + da, big = da > Math.PI ? 1 : 0, cor = PAL[i % PAL.length];
      s += `<path d="M${cx},${cy} L${cx + r * Math.cos(a)},${cy + r * Math.sin(a)} A${r},${r} 0 ${big} 1 ${cx + r * Math.cos(b)},${cy + r * Math.sin(b)} Z" fill="${cor}" stroke="#fff" stroke-width="2"/>`;
      const m = (a + b) / 2; if (p[1] / tot > 0.06) s += M.t(cx + r * 0.62 * Math.cos(m), cy + r * 0.62 * Math.sin(m) + 5, M.f(p[1], 1) + (o.suf == null ? '%' : o.suf), { size: 13, peso: 700, cor: '#fff' });
      s += M.rect(260, 52 + i * 26, 16, 16, cor, { w: 1, rx: 3 }) + M.t(284, 65 + i * 26, p[0], { size: 13.5, anchor: 'start' });
      a = b;
    });
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    return M.svg(W, H, s, o.titulo || 'Gráfico de setores');
  };
  /* tabela simples: cab = [..], linhas = [[..]] */
  M.tabela = (cab, linhas, titulo) => {
    const W = 460, lh = 30, H = 40 + lh * (linhas.length + 1) + 10, cw = (W - 20) / cab.length;
    let s = M.t(W / 2, 20, titulo || '', { size: 14, peso: 700 });
    s += M.rect(10, 32, W - 20, lh, C.creme, { w: 1.5 });
    cab.forEach((c, j) => { s += M.t(10 + cw * j + cw / 2, 32 + 20, c, { size: 13, peso: 700 }); });
    linhas.forEach((l, i) => {
      s += M.rect(10, 32 + lh * (i + 1), W - 20, lh, i % 2 ? '#fbf9f2' : '#fff', { w: 1 });
      l.forEach((c, j) => { s += M.t(10 + cw * j + cw / 2, 32 + lh * (i + 1) + 20, c, { size: 13 }); });
    });
    return M.svg(W, H, s, titulo || 'Tabela');
  };

  /* ---------- alternativas ---------- */
  M.alts = (certa, erradas) => {
    const vistos = new Set([String(certa)]), out = [];
    erradas.forEach(e => { const s = String(e); if (!vistos.has(s) && s !== 'NaN' && !/undefined|NaN|Infinity/.test(s)) { vistos.add(s); out.push(s); } });
    return out.slice(0, 4);
  };

  /* Matriz de Referência do ENEM · Matemática (resumo de cada habilidade) */
  M.HABS = {
    H1: 'Reconhecer os significados dos números naturais, inteiros, racionais e reais.',
    H2: 'Identificar padrões numéricos ou princípios de contagem.',
    H3: 'Resolver situação-problema envolvendo conhecimentos numéricos.',
    H4: 'Avaliar a razoabilidade de um resultado numérico.',
    H5: 'Avaliar propostas de intervenção na realidade com conhecimentos numéricos.',
    H6: 'Interpretar a localização e a movimentação de pessoas e objetos no espaço.',
    H7: 'Identificar características de figuras planas ou espaciais.',
    H8: 'Resolver situação-problema com conhecimentos geométricos de espaço e forma.',
    H9: 'Utilizar conhecimentos geométricos para avaliar propostas de intervenção.',
    H10: 'Identificar relações entre grandezas e unidades de medida.',
    H11: 'Utilizar a noção de escalas na leitura de representações.',
    H12: 'Resolver situação-problema que envolva medidas de grandezas.',
    H13: 'Avaliar o resultado de uma medição na construção de um argumento.',
    H14: 'Avaliar propostas de intervenção com conhecimentos de grandezas e medidas.',
    H15: 'Identificar a relação de dependência entre grandezas.',
    H16: 'Resolver situação-problema com variação de grandezas, direta ou inversamente proporcionais.',
    H17: 'Analisar informações sobre variação de grandezas como recurso de argumentação.',
    H18: 'Avaliar propostas de intervenção com variação de grandezas.',
    H19: 'Identificar representações algébricas que expressem a relação entre grandezas.',
    H20: 'Interpretar gráfico cartesiano que represente relações entre grandezas.',
    H21: 'Resolver situação-problema cuja modelagem envolva conhecimentos algébricos.',
    H22: 'Utilizar conhecimentos algébricos ou geométricos como recurso de argumentação.',
    H23: 'Avaliar propostas de intervenção com conhecimentos algébricos.',
    H24: 'Utilizar informações de gráficos e tabelas para fazer inferências.',
    H25: 'Resolver problema com dados apresentados em tabelas ou gráficos.',
    H26: 'Analisar informações de gráficos ou tabelas como recurso de argumentação.',
    H27: 'Calcular medidas de tendência central ou de dispersão de dados.',
    H28: 'Resolver situação-problema com conhecimentos de estatística e probabilidade.',
    H29: 'Utilizar conhecimentos de estatística e probabilidade como recurso de argumentação.',
    H30: 'Avaliar propostas de intervenção com conhecimentos de estatística e probabilidade.'
  };

  /* ---------- o jogo ---------- */
  M.JOGOS = {};
  M.registrar = (id, cfg) => { M.JOGOS[id] = cfg; };

  M.rodar = function (palco, meta, cfg, opcoes = {}) {
    const esc = window.ENEM ? ENEM.esc : (s => s);
    const N = cfg.n || 8, $ = s => document.querySelector(s);
    let fila = [], i = 0, acertos = 0, respondida = false, erros = [];
    function nova(g) {
      for (let t = 0; t < 30; t++) {
        const q = g(); q.alts = M.mix([q.certa, ...M.alts(q.certa, q.erradas)]);
        if (q.alts.length >= 4) return q;
      }
      throw new Error('gerador sem alternativas suficientes');
    }
    function comecar() {
      // cada rodada passa por todos os geradores antes de repetir algum
      const gens = []; while (gens.length < N) gens.push(...M.mix(cfg.gens));
      fila = gens.slice(0, N).map(nova); i = 0; acertos = 0; erros = []; mostrar();
    }
    function mostrar() {
      const q = fila[i]; respondida = false;
      palco.innerHTML = `<div class="hud"><span>Questão <b>${i + 1}</b> de ${fila.length}</span><span>Acertos <b>${acertos}</b></span></div>
        <div class="barra"><i style="width:${i / fila.length * 100}%"></i></div>
        <span class="q-area" style="background:var(--mat)" title="${esc(M.HABS[q.h] || '')}">📐 ${q.h} · ${q.tema}</span>
        <div class="q-enun">${q.enun}</div>${q.fig || ''}
        <div class="alts">${q.alts.map((t, k) => `<button class="alt" type="button" data-k="${k}"><span class="letra">${'ABCDE'[k]}</span><span>${t}</span></button>`).join('')}</div>
        <div id="corr"></div><div class="btn-row" id="seguir" style="margin-top:14px"></div>`;
      palco.querySelectorAll('[data-k]').forEach(b => b.onclick = () => responder(+b.dataset.k, b));
    }
    function responder(k, botao) {
      if (respondida) return; respondida = true;
      const q = fila[i], ok = q.alts[k] === q.certa;
      palco.querySelectorAll('.alt').forEach(b => { b.disabled = true; if (q.alts[+b.dataset.k] === q.certa) b.classList.add('certa'); else if (b === botao) b.classList.add('errada'); });
      if (ok) acertos++; else erros.push(q);
      $('#corr').innerHTML = `<div class="corr ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Isso!' : 'Resposta: ' + q.certa}</b><br>${q.expl}${q.mac ? `<div class="mac">💡 <b>Macete:</b> ${q.mac}</div>` : ''}</div>`;
      const ultima = i === fila.length - 1;
      $('#seguir').innerHTML = `<button class="btn" type="button" id="prox">${ultima ? 'Ver resultado' : 'Próxima →'}</button>`;
      $('#prox').onclick = () => { if (ultima) fim(); else { i++; mostrar(); window.scrollTo({ top: palco.offsetTop - 70, behavior: 'smooth' }); } };
      $('#prox').focus({ preventScroll: true });
    }
    function fim() {
      const n = fila.length, r = acertos / n, est = r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.5 ? 1 : 0;
      let novo = false;
      if (window.ENEM) { ENEM.contarFeitas(n); novo = ENEM.darEstrelas(meta.id, est); const te = $('#tot-est'); if (te) te.textContent = ENEM.totalEstrelas(); }
      const lista = (window.ENEM_JOGOS || []).filter(j => j.area === 'mat'), pos = lista.findIndex(j => j.id === meta.id);
      const prox = lista.length > 1 ? lista[(pos + 1) % lista.length] : null;
      palco.innerHTML = `<div class="fim"><div class="grande">${acertos}/${n}</div>${window.ENEM ? ENEM.estrelasHtml(est) : ''}
        ${novo ? '<p class="feedback ok">Novo recorde de estrelas!</p>' : ''}
        <p class="muted" style="margin:8px 0 0">As questões mudam a cada partida: jogue de novo para treinar outros números.</p>
        <div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn" type="button" id="denovo">Jogar de novo</button>
        ${prox ? `<a class="btn ghost" href="${esc(prox.url)}">${prox.icone} ${esc(prox.titulo)}</a>` : ''}<a class="btn ghost" href="./">Voltar à ilha</a></div>
        <div class="lista-erros"><div class="corr"><b>Habilidades que você treinou</b>${meta.habs.map(h => `<br><b>${h}</b> · ${M.HABS[h]}`).join('')}</div>
        ${erros.map(q => `<div class="corr bad"><span class="q-area" style="background:var(--mat)">${q.h}</span> ${q.enun}<br><b>Resposta: ${q.certa}</b><br>${q.expl}</div>`).join('')}</div></div>`;
      $('#denovo').onclick = comecar;
    }
    document.addEventListener('keydown', e => {
      if (respondida || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test((e.target || {}).tagName)) return;
      const k = e.key.toUpperCase(), idx = '12345'.indexOf(k) >= 0 ? '12345'.indexOf(k) : 'ABCDE'.indexOf(k);
      const b = idx >= 0 && palco.querySelector(`[data-k="${idx}"]`); if (b) { b.click(); e.preventDefault(); }
    });
    if (opcoes.semIniciar) return { nova };
    comecar();
  };
})();
