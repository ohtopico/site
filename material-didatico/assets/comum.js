/* Funções comuns: tema, barra superior, rodapé, etiquetas e blocos relacionados.
   Cada página define window.MD_BASE ('' na raiz de material-didatico, '../' nos jogos). */
(function () {
  const BASE = window.MD_BASE || '';
  const store = {
    get(k, d) { try { const v = localStorage.getItem('md-' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('md-' + k, JSON.stringify(v)); } catch (e) {} }
  };
  window.mdStore = store;

  // Missões do dia e níveis (missoes.js), em todas as páginas que têm o perfil do MDP
  if (window.MDP && !window.MDM && !document.querySelector('script[src$="missoes.js"]')) {
    const s = document.createElement('script');
    s.src = BASE + 'assets/missoes.js';
    document.head.appendChild(s);
  }

  // Tema compartilhado com o resto do site (mesma chave do IA pra Prof e da página inicial)
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const saved = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch (e) {}

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  window.esc = esc;

  // Endereços das páginas estáticas (planos, fichas, listas e habilidades), gerados por _fonte/material/gerar.js em dados.js
  const EST = typeof ESTATICAS !== 'undefined' ? ESTATICAS : {};
  const APRENDA_T = typeof APRENDA_TITULOS !== 'undefined' ? APRENDA_TITULOS : {};

  window.tagHab = function (codigo) {
    const h = HAB[codigo];
    const cls = h ? h.comp.toLowerCase() : '';
    const title = h ? esc(h.codigo + ' — ' + h.texto) : esc(codigo);
    return `<a class="tag code ${cls}" href="${BASE}${EST['hab:' + codigo] || 'catalogo.html?hab=' + codigo}" title="${title}">${codigo}</a>`;
  };
  window.tagComp = c => `<span class="tag ${c.toLowerCase()}">${COMPONENTES[c].curto}</span>`;
  window.anosTxt = anos => {
    const ef = anos.filter(a => a < 10), em = anos.includes(10);
    if (!ef.length) return em ? 'Ensino Médio' : '';
    const seq = ef.every((a, i) => i === 0 || a === ef[i - 1] + 1);
    const t = ef.length === 1 ? `${ef[0]}º ano` : seq ? `${ef[0]}º ao ${ef[ef.length - 1]}º ano` : ef.map(a => a + 'º').join(', ') + ' anos';
    return em ? `${t} e Ensino Médio` : t;
  };
  window.recUrl = r => BASE + (EST[r.id] || r.url);
  // explicação para o estudante (aprenda/<código>/), quando existe
  window.aprendaUrl = c => EST['aprenda:' + c] ? BASE + EST['aprenda:' + c] : '';
  // "Antes de começar, aprenda": links para as explicações das habilidades de uma atividade (até 4)
  window.aprendaLinks = codigos => {
    const cs = codigos.filter(c => EST['aprenda:' + c] && HAB[c]);
    if (!cs.length || cs.length > 4) return '';
    return `<p class="aprenda-links no-print">📖 Antes de começar, aprenda: ${cs.map(c => `<a href="${aprendaUrl(c)}">${esc(APRENDA_T[c] || HAB[c].objeto)}</a>`).join(' · ')}</p>`;
  };

  /* Ordenação das listas de jogos (/jogos/ e material-didatico/jogos/).
     Popularidade = visitas de cada página de jogo no GoatCounter, o contador de visitas do site (total desde o início da contagem). */
  window.ORDENS_JOGOS = {
    az: 'A a Z',
    ano: 'Por ano',
    populares: 'Mais jogados',
    dificuldade: 'Mais fácil primeiro'
  };
  const porNome = (a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR');
  window.mdOrdenarJogos = function (lista, ordem, visitas) {
    const v = visitas || {};
    const cmp = {
      az: porNome,
      ano: (a, b) => Math.min(...a.anos) - Math.min(...b.anos) || Math.max(...a.anos) - Math.max(...b.anos) || porNome(a, b),
      populares: (a, b) => (v[b.id] || 0) - (v[a.id] || 0) || porNome(a, b),
      dificuldade: (a, b) => dificuldadeDe(a) - dificuldadeDe(b) || porNome(a, b)
    }[ordem];
    return cmp ? lista.slice().sort(cmp) : lista.slice();
  };
  // Visitas por jogo, buscadas só quando alguém escolhe "Mais jogados"; ficam 1 hora guardadas na sessão
  let visitasPromessa = null;
  window.mdVisitasJogos = function (jogos) {
    if (visitasPromessa) return visitasPromessa;
    try {
      const c = JSON.parse(sessionStorage.getItem('md-visitas-jogos') || 'null');
      if (c && Date.now() - c.t < 3600e3) return (visitasPromessa = Promise.resolve(c.v));
    } catch (e) {}
    const um = j => {
      const caminho = new URL(recUrl(j), location.href).pathname;
      return fetch('https://ohtopico.goatcounter.com/counter/' + encodeURIComponent(caminho) + '.json')
        .then(r => (r.ok ? r.json() : r.status === 404 ? { count: '0' } : Promise.reject(r.status)))
        .then(d => [j.id, +String(d.count).replace(/\D/g, '') || 0]);
    };
    visitasPromessa = Promise.all(jogos.map(um)).then(pares => {
      const v = Object.fromEntries(pares);
      try { sessionStorage.setItem('md-visitas-jogos', JSON.stringify({ t: Date.now(), v })); } catch (e) {}
      return v;
    }, err => { visitasPromessa = null; throw err; });
    return visitasPromessa;
  };

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
        ${link('jogos', 'jogos/', 'Jogos')}
        ${link('aprenda', 'aprenda/', 'Aprenda')}
        ${link('bncc', 'bncc.html', 'BNCC')}
        ${link('professor', 'professor.html', 'Professor')}
      </nav>
      <a class="icon-btn prog-btn" href="${BASE}meu-progresso.html"${atual === 'progresso' ? ' aria-current="page"' : ''} aria-label="Meu progresso" title="Meu progresso"><span aria-hidden="true">📈</span><span class="prog-txt">Meu progresso</span></a>
      <button class="icon-btn" id="theme-btn" aria-label="Alternar tema claro/escuro">${sun}</button>
      <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="topnav-m" aria-label="Abrir o menu"><span aria-hidden="true">☰</span></button>`;
    // celular: as seções viram um menu que abre por baixo da barra
    const nav = el.querySelector('.topnav'), menu = document.getElementById('menu-btn');
    nav.id = 'topnav-m';
    const abrirMenu = abre => { el.classList.toggle('menu-aberto', abre); menu.setAttribute('aria-expanded', abre); menu.setAttribute('aria-label', abre ? 'Fechar o menu' : 'Abrir o menu'); };
    menu.addEventListener('click', () => abrirMenu(!el.classList.contains('menu-aberto')));
    document.addEventListener('click', e => { if (!el.contains(e.target)) abrirMenu(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('menu-aberto')) { abrirMenu(false); menu.focus(); } });
    document.getElementById('theme-btn').addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('iapraprof:theme', JSON.stringify(next)); } catch (e) {}
    });
    if (window.MDM) MDM.atualizarBarra();
  };

  window.mdFooter = function () {
    const el = document.getElementById('footer');
    if (!el) return;
    el.className = 'footer';
    el.innerHTML = `<div class="wrap">
      <p>Material didático de Computação e Matemática para os anos finais do Ensino Fundamental e Computação para o Ensino Médio, organizado por
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
  /* Habilidades da BNCC de uma área (páginas computacao/ e matematica/), um ano por vez,
     cada uma com os slides em PDF e os materiais que a trabalham. */
  window.mdHabArea = function (el, comp) {
    const CADERNO = 'datas-festivas/computacao-desplugada-datas-festivas.pdf';
    const APOSTILA = 'apostila-professor-bncc/apostila-professor-bncc-computacao.pdf';
    // página do PDF em que começa a ficha (3 páginas por habilidade)
    const INICIO_ANO = { 6: 14, 7: 45, 8: 79, 9: 113 };
    const fichaPag = h => comp === 'CO' && INICIO_ANO[h.ano] ? INICIO_ANO[h.ano] + 3 * (parseInt(h.codigo.slice(-2), 10) - 1) : 0;
    const todas = Object.values(HAB).filter(h => h.comp === comp);
    const anos = [...new Set(todas.map(h => h.ano))].sort((a, b) => a - b);
    const iniciais = anos.filter(a => a <= 5);
    const grupos = (iniciais.length ? [{ v: 'ai', l: '1º ao 5º ano', anos: iniciais }] : [])
      .concat(anos.filter(a => a > 5).map(a => ({ v: String(a), l: anoNome(a), anos: [a] })));
    let atual = (grupos.find(g => g.v === '6') || grupos[0]).v;
    let mostrarTodas = false;
    const sl = c => window.SLIDES && window.SLIDES[c] ? window.slidesUrl(c) : '';
    function render() {
      const g = grupos.find(x => x.v === atual);
      const habs = todas.filter(h => g.anos.includes(h.ano)).sort((a, b) => a.codigo.localeCompare(b.codigo));
      const pdfs = habs.filter(h => sl(h.codigo)).length;
      const temMat = h => sl(h.codigo) || RECURSOS.some(r => r.habs.includes(h.codigo) && r.comp.includes(comp));
      const LIMITE = 14;
      const lista = mostrarTodas ? habs : habs.filter(temMat).slice(0, LIMITE);
      const faltam = habs.length - lista.length;
      const topo = g.v === 'ai'
        ? `<div class="hab-pdf"><div><strong>Caderno de computação desplugada nas datas festivas</strong><span>Nove atividades sem computador, com ficha do professor, folhas para imprimir e gabarito.</span></div><a class="btn" href="${BASE}${CADERNO}" download type="application/pdf">Baixar o caderno (PDF)</a><a class="btn ghost" href="${BASE}datas-festivas/">Ver o caderno</a></div>`
        : comp === 'CO' && g.v !== '10' ? `<div class="hab-pdf"><div><strong>Apostila do professor: Computação na BNCC</strong><span>Uma ficha de 3 páginas para cada habilidade do 6º ao 9º ano: conceito, aplicação em sala, exemplos práticos, sites de apoio e rubrica.</span></div><a class="btn" href="${BASE}${APOSTILA}" download type="application/pdf">Baixar a apostila (PDF)</a><a class="btn ghost" href="${BASE}apostila-professor-bncc/">Ver as fichas</a></div>`
        : pdfs ? `<p class="muted hab-nota">Cada habilidade tem slides em PDF para uma aula expositiva de 30 minutos, com atividade e roteiro do professor. Clique na habilidade para ver o texto da BNCC e os jogos, fichas e planos que a trabalham.</p>`
        : `<p class="muted hab-nota">Clique na habilidade para ver o texto da BNCC e os jogos, recursos 3D, fichas e planos que a trabalham.</p>`;
      el.innerHTML = `
        <div class="hab-anos" role="group" aria-label="Ano">${grupos.map(x => `<button class="chip" type="button" data-v="${x.v}" aria-pressed="${x.v === atual}">${x.l}</button>`).join('')}</div>
        ${topo}
        <ul class="hab-area">${lista.map(h => {
          const mats = RECURSOS.filter(r => r.habs.includes(h.codigo) && r.comp.includes(comp));
          const pdf = sl(h.codigo);
          const n = mats.length;
          return `<li>
            <details>
              <summary><span class="tag code ${comp.toLowerCase()}">${h.codigo}</span><span class="hab-obj">${esc(h.objeto)}</span><span class="hab-n">${n ? n + (n > 1 ? ' materiais' : ' material') : 'Habilidade'}</span></summary>
              <div class="hab-corpo">
                <p class="hab-txt"><strong>${esc(EIXOS[h.eixo].nome)}</strong>${esc(h.texto)}</p>
                <div class="hab-mats">${mats.map(r => `<a href="${recUrl(r)}"><span>${esc(TIPOS[r.tipo].nome.split(' ')[0])}</span>${esc(r.titulo)}</a>`).join('')}${fichaPag(h) ? `<a href="${BASE}${APOSTILA}#page=${fichaPag(h)}" target="_blank" rel="noopener"><span>Apostila</span>Ficha do professor (p. ${fichaPag(h) - 1})</a>` : ''}${!n && !fichaPag(h) ? '<span class="hab-breve">Material em preparação</span>' : ''}</div>
              </div>
            </details>
            ${pdf ? `<a class="hab-baixar" href="${pdf}" download type="application/pdf" title="Baixar os slides da aula de ${h.codigo} (PDF)">Slides (PDF)</a>` : ''}
          </li>`;
        }).join('')}</ul>
        ${faltam ? `<button class="hab-todas" type="button">Mostrar todas as ${habs.length} habilidades do ${g.l}</button>` : ''}
        <p class="hab-mais"><a href="${BASE}bncc.html?comp=${comp}&amp;ano=${g.v === 'ai' ? 6 : g.v}">Abrir no Explorar a BNCC →</a></p>`;
    }
    el.addEventListener('click', e => { const b = e.target.closest('.hab-anos button'); if (b) { atual = b.dataset.v; mostrarTodas = false; render(); } if (e.target.closest('.hab-todas')) { mostrarTodas = true; render(); } });
    render();
  };

  /* Índice estático do catálogo: acrescenta jogos e recursos 3D que ainda não estão na lista escrita à mão. */
  window.mdIndiceCompleta = function (el) {
    const tem = new Set([...el.querySelectorAll('a')].map(a => a.getAttribute('href')));
    RECURSOS.filter(r => (r.tipo === 'jogo' || r.tipo === '3d') && !tem.has(r.url)).forEach(r => {
      r.comp.forEach(c => {
        const ul = el.querySelector(`ul[data-comp="${c}"][data-tipo="${r.tipo}"]`);
        if (ul) ul.insertAdjacentHTML('beforeend', `<li><a href="${recUrl(r)}">${esc(r.titulo)}</a></li>`);
      });
    });
  };

  /* Jogos e recursos 3D sobre o mesmo assunto: cada página mostra os outros do grupo em "relacionados" */
  const MESMO_ASSUNTO = [
    ['balanca', '3d-balanca'],
    ['fracoes', '3d-fracoes'],
    ['receitas', '3d-sucos'],
    ['pacotes', '3d-viagem-pacote'],
    ['graficos', '3d-grafico-enganoso'],
    ['cofrinho', 'poupanca', 'mesada', 'cartao'],
  ];

  window.mdJogoHead = function (id) {
    const r = REC[id];
    window.MD_REC = id;
    const el = document.getElementById('game-head');
    if (!r || !el) return;
    // o título já vem escrito no HTML de cada página (gerado por _fonte/material/gerar.js)
    // caminho de volta e atalhos do professor no topo, sem precisar rolar até o fim do jogo
    const volta = r.tipo === '3d' ? ['catalogo.html?tipo=3d', 'Recursos 3D'] : ['jogos/', 'Jogos'];
    const atalhos = [r.plano && REC[r.plano] ? `<a class="btn ghost" href="${recUrl(REC[r.plano])}">📋 Plano de aula</a>` : '',
      r.ficha && REC[r.ficha] ? `<a class="btn ghost" href="${recUrl(REC[r.ficha])}">🖨️ Ficha para imprimir</a>` : '',
      // código para o Google Sites e link para o Classroom (apoiadores do Catarse); some quando o jogo já está incorporado
      window.top === window ? '<button class="btn ghost" type="button" data-usar-aula>🏫 Usar na minha aula</button>' : ''].join('');
    if (window.top === window && !document.querySelector('script[src*="usar-na-aula.js"]')) {
      const s = document.createElement('script'); s.src = BASE + 'assets/usar-na-aula.js?v=202610310700'; s.defer = true; document.head.appendChild(s);
    }
    el.innerHTML = `
      <div class="crumbs no-print"><a href="${BASE}${volta[0]}">← ${volta[1]}</a></div>
      <div class="tags" style="margin-bottom:12px">${r.comp.map(tagComp).join('')}<span class="tag">${anosTxt(r.anos)}</span><span class="tag">⏱ ${r.tempo}</span></div>
      <h1>${esc(r.titulo)}</h1>
      <p class="muted" style="max-width:720px">${esc(r.resumo)}</p>
      <div class="tags">${r.habs.map(tagHab).join('')}</div>${aprendaLinks(r.habs)}${atalhos ? `
      <div class="game-acoes no-print">${atalhos}</div>` : ''}`;
    const rel = document.getElementById('related');
    if (rel) {
      const itens = [];
      if (r.plano && REC[r.plano]) itens.push(REC[r.plano]);
      if (r.ficha && REC[r.ficha]) itens.push(REC[r.ficha]);
      // o mesmo assunto em outro formato (jogo e Laboratório 3D) vem antes dos outros jogos
      const irmaos = (MESMO_ASSUNTO.find(g => g.includes(id)) || []).filter(o => o !== id && REC[o]).map(o => REC[o]);
      irmaos.forEach(o => itens.push(o));
      RECURSOS.filter(o => o.tipo === (r.tipo === '3d' ? '3d' : 'jogo') && o.id !== id && !irmaos.includes(o) && o.comp.some(c => r.comp.includes(c))).slice(0, Math.max(0, (r.tipo === '3d' ? 3 : 2) - irmaos.length)).forEach(o => itens.push(o));
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
(function () { const s = document.createElement('script'); s.src = '/assets/estrelas.js?v=202610302300'; s.defer = true; document.head.appendChild(s); })();
