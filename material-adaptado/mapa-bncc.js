/* Mapa interativo da BNCC do /material-adaptado/.
   Lê as tabelas do mapa em lista (details.mapa-ano, gerado por _fonte/matematica-adaptada/gerar.py
   e _fonte/computacao-adaptada/hub.py), então cada ficha nova aparece aqui sem mudar nada.
   Sem dependências: SVG + JavaScript. Fonte: _fonte/mapa-interativo/mapa-bncc.js */
(function () {
  'use strict';
  var raiz = document.getElementById('mapa-interativo');
  if (!raiz) return;
  var NS = 'http://www.w3.org/2000/svg';

  // ---------- dados a partir das tabelas ----------
  var habs = [], unidades = [], anos = {};
  function lerTabelas(seletor, disc) {
    document.querySelectorAll(seletor).forEach(function (det) {
      var ano = parseInt(det.id.replace(/\D/g, ''), 10);
      var un = '';
      det.querySelectorAll('tbody tr').forEach(function (tr) {
        if (tr.classList.contains('unidade')) { un = tr.textContent.trim(); if (unidades.indexOf(un) < 0) unidades.push(un); return; }
        var td = tr.querySelectorAll('td');
        if (td.length < 3) return;
        var fichas = [];
        td[2].querySelectorAll('a').forEach(function (a) {
          var rev = a.nextSibling && /revis/.test(a.nextSibling.textContent || '');
          fichas.push({ titulo: a.textContent.trim(), url: a.getAttribute('href'), revisao: !!rev });
        });
        var propria = fichas.filter(function (f) { return !f.revisao; })[0];
        var cod = td[0].textContent.trim();
        habs.push({ id: 'h-' + cod, tipo: 'hab', codigo: cod, texto: td[1].textContent.trim(), fichas: fichas,
          rotulo: propria ? propria.titulo : cod, ano: ano, disc: disc, unidade: un, lista: det.id });
        anos[ano] = true;
      });
    });
  }
  lerTabelas('details.mapa-ano[id^="ano-"]', 'ma');
  lerTabelas('details.mapa-ano[id^="computacao-"]', 'co');
  if (!habs.length) return;
  var listaAnos = Object.keys(anos).map(Number).sort(function (a, b) { return a - b; });
  var NOME = { ma: 'Matemática', co: 'Computação' };
  function cor(un) { return 'u' + (unidades.indexOf(un) % 8); }

  // ---------- interface ----------
  raiz.innerHTML =
    '<div class="mi-controles">' +
      '<div class="mi-grupo" role="group" aria-label="Escolha o ano">' +
        '<button type="button" class="mi-chip" data-ano="0">Visão geral</button>' +
        listaAnos.map(function (a) { return '<button type="button" class="mi-chip" data-ano="' + a + '">' + a + 'º</button>'; }).join('') +
      '</div>' +
      '<div class="mi-grupo" role="group" aria-label="Escolha o componente">' +
        '<button type="button" class="mi-chip" data-disc="">Tudo</button>' +
        '<button type="button" class="mi-chip" data-disc="ma">Matemática</button>' +
        '<button type="button" class="mi-chip" data-disc="co">Computação</button>' +
      '</div>' +
      '<label class="mi-busca"><span>Buscar</span><input type="search" placeholder="fração, algoritmo, EF06MA01..." autocomplete="off"></label>' +
    '</div>' +
    '<div class="mi-corpo">' +
      '<div class="mi-tela">' +
        '<svg class="mi-svg" role="img" aria-label="Mapa interativo das habilidades da BNCC"></svg>' +
        '<div class="mi-zoom"><button type="button" data-z="1.3" aria-label="Aproximar">+</button><button type="button" data-z="0.77" aria-label="Afastar">&minus;</button><button type="button" data-z="0" aria-label="Centralizar o mapa">&#8634;</button></div>' +
        '<p class="mi-dica">Toque numa palavra para ver a habilidade. Arraste para mover.</p>' +
      '</div>' +
      '<aside class="mi-painel" aria-live="polite"></aside>' +
    '</div>';
  var svg = raiz.querySelector('svg'), painel = raiz.querySelector('.mi-painel'), busca = raiz.querySelector('input');
  var estado = { ano: 0, disc: '', sel: null, termo: '' };
  var vb = { x: 0, y: 0, w: 1000, h: 700 }, caixa = null;

  function el(nome, attrs, pai) {
    var e = document.createElementNS(NS, nome);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(e);
    return e;
  }
  function quebrar(t, max) {
    var pal = t.split(' '), linhas = [''];
    pal.forEach(function (p) {
      var l = linhas[linhas.length - 1];
      if (l && (l + ' ' + p).length > max) linhas.push(p); else linhas[linhas.length - 1] = l ? l + ' ' + p : p;
    });
    if (linhas.length > 3) { linhas = linhas.slice(0, 3); linhas[2] = linhas[2].replace(/\s*\S*$/, '') + '...'; }
    return linhas;
  }
  function semAcento(t) { return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }

  // ---------- grafo de cada vista ----------
  function montar() {
    var nos = [], lig = [], idx = {};
    function no(n) { if (!idx[n.id]) { idx[n.id] = n; nos.push(n); } return idx[n.id]; }
    var discs = estado.disc ? [estado.disc] : ['ma', 'co'];
    if (estado.ano === 0) {
      // visão geral: componentes, anos e unidades temáticas, ligados como uma rede
      var conta = {};
      habs.forEach(function (h) {
        if (discs.indexOf(h.disc) < 0) return;
        var d = no({ id: 'd-' + h.disc, tipo: 'disc', rotulo: NOME[h.disc], disc: h.disc, peso: 0 });
        var a = no({ id: 'a-' + h.ano, tipo: 'ano', rotulo: h.ano + 'º ano', ano: h.ano, peso: 0 });
        var u = no({ id: 'u-' + h.unidade, tipo: 'uni', rotulo: h.unidade, unidade: h.unidade, disc: h.disc, peso: 0 });
        u.peso++; a.peso++; d.peso++;
        var k1 = d.id + '|' + u.id, k2 = a.id + '|' + u.id;
        if (!conta[k1]) { conta[k1] = 1; lig.push([d, u, 1]); }
        if (!conta[k2]) { conta[k2] = { n: 0 }; lig.push([a, u, conta[k2]]); }
        conta[k2].n++;
      });
    } else {
      var centro = no({ id: 'a-' + estado.ano, tipo: 'ano', rotulo: estado.ano + 'º ano', ano: estado.ano, fixo: true, peso: 0 });
      habs.forEach(function (h) {
        if (h.ano !== estado.ano || discs.indexOf(h.disc) < 0) return;
        var u = no({ id: 'u-' + h.unidade, tipo: 'uni', rotulo: h.unidade, unidade: h.unidade, disc: h.disc, peso: 0 });
        if (u.peso++ === 0) lig.push([centro, u, 1]);
        lig.push([u, no(h), 1]);
      });
    }
    return { nos: nos, lig: lig };
  }

  // ---------- disposição: começa em círculos e ajusta com forças simples ----------
  function medir(n) {
    var f = n.tipo === 'hab' ? 15 : n.tipo === 'uni' ? (estado.ano ? 18 : 15 + Math.min(16, Math.sqrt(n.peso) * 1.4)) : n.tipo === 'ano' ? (estado.ano ? 26 : 22) : 28;
    n.fonte = f;
    n.linhas = n.tipo === 'hab' ? quebrar(n.rotulo, 16) : n.tipo === 'uni' ? quebrar(n.rotulo, 18) : [n.rotulo];
    var maior = Math.max.apply(null, n.linhas.map(function (l) { return l.length; }));
    n.w = maior * f * 0.56 + (n.tipo === 'hab' ? 14 : 30);
    n.h = n.linhas.length * f * 1.2 + (n.tipo === 'hab' ? 6 : 16);
  }
  function dispor(g) {
    var nos = g.nos;
    nos.forEach(medir);
    var vizinhos = {};
    g.lig.forEach(function (l) { (vizinhos[l[0].id] = vizinhos[l[0].id] || []).push(l[1]); });
    var N = nos.length, rr = svg.getBoundingClientRect(), estreito = rr.width && rr.width < 600;
    if (estado.ano === 0) {
      // visão geral: anos numa coluna no meio, unidades de Matemática à esquerda, eixos de Computação à direita
      var ds = nos.filter(function (n) { return n.tipo === 'disc'; }), as = nos.filter(function (n) { return n.tipo === 'ano'; });
      as.forEach(function (n, i) { n.x = 0; n.y = (i - (as.length - 1) / 2) * 74; });
      ['ma', 'co'].forEach(function (d) {
        var lado = ds.length > 1 ? (d === 'ma' ? -1 : 1) : 1;
        var grupo = nos.filter(function (n) { return n.tipo === 'uni' && n.disc === d; }), passo = Math.max(90, 600 / Math.max(1, grupo.length));
        var anosDe = {};
        g.lig.forEach(function (l) { if (l[0].tipo === 'ano') (anosDe[l[1].id] = anosDe[l[1].id] || []).push(l[0].y); });
        if (estreito) passo = Math.max(110, 560 / Math.max(1, grupo.length));
        grupo.forEach(function (n, j) { n.x = lado * (estreito ? 200 : 400); n.y = (j - (grupo.length - 1) / 2) * passo; });
        ds.filter(function (n) { return n.disc === d; }).forEach(function (n) { n.x = lado * (estreito ? 200 : 760); n.y = estreito ? -420 : 0; });
      });
    } else {
      var ex = estreito ? 0.7 : 1.25, ey = estreito ? 1.45 : 1;
      var c = nos[0]; c.x = 0; c.y = 0;
      var us2 = vizinhos[c.id] || [], total = 0;
      us2.forEach(function (u) { total += (vizinhos[u.id] || []).length + 1; });
      var acum = 0;
      us2.forEach(function (u) {
        var filhos = vizinhos[u.id] || [], fatia = 2 * Math.PI * (filhos.length + 1) / total, tu = -Math.PI / 2 + 2 * Math.PI * acum / total + fatia / 2;
        u.x = 160 * ex * Math.cos(tu); u.y = 150 * ey * Math.sin(tu);
        filhos.forEach(function (h, k) {
          var t = tu + (k - (filhos.length - 1) / 2) * fatia / (filhos.length + 1), r = 330 + (k % 2) * 70;
          h.x = r * ex * Math.cos(t); h.y = r * ey * Math.sin(t);
        });
        acum += filhos.length + 1;
      });
      // forças: molas curtas, um pouco de gravidade e colisão dos retângulos, para formar uma nuvem compacta
      for (var it = 0; it < 360; it++) {
        var alfa = 1 - it / 360;
        g.lig.forEach(function (l) {
          var a = l[0], b = l[1], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
          var alvo = a.tipo === 'ano' ? 170 : 110, k = 0.05 * alfa * (d - alvo) / d;
          if (!a.fixo) { a.x += dx * k; a.y += dy * k; }
          if (!b.fixo) { b.x -= dx * k; b.y -= dy * k; }
        });
        nos.forEach(function (n) { if (!n.fixo) { n.x *= 1 - (estreito ? 0.03 : 0.012) * alfa; n.y *= 1 - (estreito ? 0.008 : 0.016) * alfa; } });
        colidir(1);
      }
    }
    for (var k2 = 0; k2 < 60; k2++) colidir(1);
    function colidir(forca) {
      for (var i = 0; i < N; i++) for (var j = i + 1; j < N; j++) {
        var p = nos[i], q = nos[j], dx = q.x - p.x, dy = q.y - p.y;
        var ox = (p.w + q.w) / 2 + 8 - Math.abs(dx), oy = (p.h + q.h) / 2 + 6 - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          var mx = p.fixo ? 0 : q.fixo ? 1 : 0.5;
          if (ox < oy) { var sx = (dx < 0 ? -1 : 1) * ox * forca; if (!p.fixo) p.x -= sx * mx; if (!q.fixo) q.x += sx * (1 - mx); }
          else { var sy = (dy < 0 ? -1 : 1) * oy * forca; if (!p.fixo) p.y -= sy * mx; if (!q.fixo) q.y += sy * (1 - mx); }
        }
      }
    }
    var x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    nos.forEach(function (n) { x0 = Math.min(x0, n.x - n.w / 2); x1 = Math.max(x1, n.x + n.w / 2); y0 = Math.min(y0, n.y - n.h / 2); y1 = Math.max(y1, n.y + n.h / 2); });
    caixa = { x: x0 - 30, y: y0 - 40, w: x1 - x0 + 110, h: y1 - y0 + 80 };
  }

  // ---------- desenho ----------
  var grafo, porId;
  function desenhar() {
    grafo = montar(); dispor(grafo); porId = {};
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var gl = el('g', { 'class': 'mi-ligacoes' }, svg), gn = el('g', { 'class': 'mi-nos' }, svg);
    grafo.lig.forEach(function (l) {
      var a = l[0], b = l[1], w = l[2] && l[2].n ? Math.min(7, 1 + l[2].n / 3) : 1.5;
      var mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.08, my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08;
      el('path', { d: 'M' + a.x + ',' + a.y + ' Q' + mx + ',' + my + ' ' + b.x + ',' + b.y, 'class': 'mi-lig ' + (b.unidade ? cor(b.unidade) : ''), 'stroke-width': w, 'data-a': a.id, 'data-b': b.id }, gl);
    });
    grafo.nos.forEach(function (n) {
      porId[n.id] = n;
      var classe = 'mi-no mi-' + n.tipo + ' ' + (n.unidade ? cor(n.unidade) : '') + (n.disc ? ' mi-' + n.disc : '');
      var g = el('g', { 'class': classe, transform: 'translate(' + n.x + ',' + n.y + ')', tabindex: '0', role: 'button', 'data-id': n.id,
        'aria-label': rotuloAcessivel(n) }, gn);
      if (n.tipo !== 'hab') el('rect', { x: -n.w / 2, y: -n.h / 2, width: n.w, height: n.h, rx: Math.min(n.h / 2, 22) }, g);
      else el('rect', { 'class': 'mi-fundo', x: -n.w / 2, y: -n.h / 2, width: n.w, height: n.h, rx: 8 }, g);
      var t = el('text', { 'text-anchor': 'middle', 'font-size': n.fonte }, g);
      n.linhas.forEach(function (l, i) {
        var s = el('tspan', { x: 0, y: (i - (n.linhas.length - 1) / 2) * n.fonte * 1.2 + n.fonte * 0.36 }, t); s.textContent = l;
      });
      if (n.tipo === 'hab' && !n.fichas.some(function (f) { return !f.revisao; })) g.classList.add('mi-sem');
      n.g = g;
    });
    centralizar();
    marcar();
  }
  function rotuloAcessivel(n) {
    if (n.tipo === 'hab') return n.codigo + ': ' + n.rotulo;
    if (n.tipo === 'ano') return n.rotulo + (estado.ano ? '' : ', abrir o mapa do ano');
    return n.rotulo;
  }
  function aplicarVB() { svg.setAttribute('viewBox', vb.x + ' ' + vb.y + ' ' + vb.w + ' ' + vb.h); }
  function centralizar() {
    var r = svg.getBoundingClientRect(), prop = (r.height || 560) / (r.width || 900);
    var w = Math.max(caixa.w, caixa.h / prop), h = w * prop;
    vb = { x: caixa.x + caixa.w / 2 - w / 2, y: caixa.y + caixa.h / 2 - h / 2, w: w, h: h };
    aplicarVB();
  }
  function zoom(f, cx, cy) {
    if (vb.w / f < 200 || vb.w / f > caixa.w * 3) return;
    if (cx === undefined) { cx = vb.x + vb.w / 2; cy = vb.y + vb.h / 2; }
    vb.x = cx - (cx - vb.x) / f; vb.y = cy - (cy - vb.y) / f; vb.w /= f; vb.h /= f;
    aplicarVB();
  }

  // ---------- seleção, busca e painel ----------
  function marcar() {
    var termo = semAcento(estado.termo.trim()), sel = estado.sel, ligados = {};
    if (sel) {
      ligados[sel] = true;
      grafo.lig.forEach(function (l) { if (l[0].id === sel) ligados[l[1].id] = true; if (l[1].id === sel) ligados[l[0].id] = true; });
    }
    grafo.nos.forEach(function (n) {
      var achou = !termo || semAcento(n.rotulo + ' ' + (n.codigo || '') + ' ' + (n.texto || '')).indexOf(termo) >= 0;
      n.g.classList.toggle('mi-apagado', !!(termo && !achou) || !!(sel && !ligados[n.id]));
      n.g.classList.toggle('mi-achado', !!(termo && achou));
      n.g.classList.toggle('mi-sel', n.id === sel);
    });
    svg.querySelectorAll('.mi-lig').forEach(function (p) {
      p.classList.toggle('mi-forte', !!sel && (p.getAttribute('data-a') === sel || p.getAttribute('data-b') === sel));
      p.classList.toggle('mi-apagado', !!sel && p.getAttribute('data-a') !== sel && p.getAttribute('data-b') !== sel);
    });
    raiz.querySelectorAll('[data-ano]').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-ano') === estado.ano)); });
    raiz.querySelectorAll('[data-disc]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-disc') === estado.disc)); });
    mostrarPainel();
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function itemHab(h) {
    var f = h.fichas.filter(function (x) { return !x.revisao; })[0] || h.fichas[0];
    return '<li>' + (f ? '<a href="' + esc(f.url) + '">' : '') + '<b>' + esc(h.codigo) + '</b> ' + esc(f ? f.titulo : 'ficha em preparação') + (f ? '</a>' : '') + '</li>';
  }
  function mostrarPainel() {
    var n = estado.sel && porId[estado.sel], html;
    if (!n) {
      var vis = habs.filter(function (h) { return (!estado.ano || h.ano === estado.ano) && (!estado.disc || h.disc === estado.disc); });
      var termo = semAcento(estado.termo.trim()), achados = termo ? vis.filter(function (h) { return semAcento(h.rotulo + ' ' + h.codigo + ' ' + h.texto).indexOf(termo) >= 0; }) : null;
      var com = vis.filter(function (h) { return h.fichas.some(function (f) { return !f.revisao; }); }).length;
      html = '<p class="mi-titulo">' + (estado.ano ? estado.ano + 'º ano' : 'Todas as habilidades') + '</p>' +
        '<p>' + vis.length + ' habilidades, ' + com + ' com ficha própria.</p>' +
        '<p class="mi-leve">' + (estado.ano ? 'As palavras em volta do ano são as unidades temáticas e os eixos. Em volta de cada uma ficam as habilidades: toque em uma para abrir a ficha.'
          : 'Cada ano se liga às unidades temáticas e aos eixos que estuda. Quanto mais grossa a linha, mais habilidades. Toque num ano para ver as habilidades dele.') + '</p>' +
        (achados ? '<p class="mi-titulo">Busca: ' + achados.length + (achados.length === 1 ? ' habilidade' : ' habilidades') + '</p>' +
          (achados.length ? '<ul class="mi-lista">' + achados.slice(0, 40).map(function (h) { return itemHab(h).replace('<b>', '<b>' + h.ano + 'º · '); }).join('') + '</ul>' : '<p class="mi-leve">Nada encontrado. Tente outra palavra ou escolha outro ano.</p>') : '');
    } else if (n.tipo === 'hab') {
      var proprias = n.fichas.filter(function (f) { return !f.revisao; }), revs = n.fichas.filter(function (f) { return f.revisao; });
      html = '<p class="mi-cod">' + esc(n.codigo) + ' · ' + n.ano + 'º ano · ' + NOME[n.disc] + '</p>' +
        '<p class="mi-titulo">' + esc(proprias[0] ? proprias[0].titulo : n.codigo) + '</p>' +
        '<p class="mi-texto">' + esc(n.texto) + '</p>' +
        (proprias.length ? proprias.map(function (f) { return '<a class="mi-abrir" href="' + esc(f.url) + '">Abrir a ficha</a>'; }).join('') : '<p class="mi-leve">Ficha própria em preparação.</p>') +
        (revs.length ? '<p class="mi-leve">Ficha de revisão: ' + revs.map(function (f) { return '<a href="' + esc(f.url) + '">' + esc(f.titulo) + '</a>'; }).join(', ') + '</p>' : '') +
        '<p class="mi-leve">Unidade: ' + esc(n.unidade) + '</p>';
    } else if (n.tipo === 'uni') {
      var lista = habs.filter(function (h) { return h.unidade === n.unidade && (!estado.ano || h.ano === estado.ano); });
      html = '<p class="mi-cod">' + NOME[n.disc] + (estado.ano ? ' · ' + estado.ano + 'º ano' : '') + '</p><p class="mi-titulo">' + esc(n.rotulo) + '</p>' +
        (estado.ano ? '<ul class="mi-lista">' + lista.map(itemHab).join('') + '</ul>'
          : '<p>' + lista.length + ' habilidades em ' + uniq(lista.map(function (h) { return h.ano; })).length + ' anos.</p><div class="mi-anos">' +
            uniq(lista.map(function (h) { return h.ano; })).map(function (a) { return '<button type="button" class="mi-chip" data-ir="' + a + '">' + a + 'º ano</button>'; }).join('') + '</div>');
    } else if (n.tipo === 'ano') {
      html = '<p class="mi-titulo">' + esc(n.rotulo) + '</p><p>' + n.peso + ' habilidades.</p><button type="button" class="mi-abrir" data-ir="' + n.ano + '">Ver as habilidades do ' + n.ano + 'º ano</button>';
    } else {
      html = '<p class="mi-titulo">' + esc(n.rotulo) + '</p><p>' + n.peso + ' habilidades no mapa.</p>';
    }
    painel.innerHTML = html;
  }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }
  function irAno(a) { estado.ano = a; estado.sel = null; desenhar(); }

  // ---------- eventos ----------
  raiz.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-ano')) irAno(+b.getAttribute('data-ano'));
    else if (b.hasAttribute('data-disc')) { estado.disc = b.getAttribute('data-disc'); estado.sel = null; desenhar(); }
    else if (b.hasAttribute('data-ir')) { irAno(+b.getAttribute('data-ir')); raiz.scrollIntoView({ block: 'start' }); }
    else if (b.hasAttribute('data-z')) { var z = +b.getAttribute('data-z'); if (z) zoom(z); else centralizar(); }
  });
  busca.addEventListener('input', function () { estado.termo = busca.value; marcar(); });
  function escolher(id) {
    var n = porId[id];
    if (!n) return;
    if (n.tipo === 'ano' && !estado.ano) { irAno(n.ano); return; }
    estado.sel = estado.sel === id ? null : id;
    marcar();
    if (estado.sel && window.matchMedia('(max-width: 760px)').matches) painel.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  svg.addEventListener('keydown', function (e) {
    var g = e.target.closest && e.target.closest('.mi-no');
    if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); escolher(g.getAttribute('data-id')); }
  });
  // arrastar para mover (o toque vertical continua rolando a página)
  var arr = null;
  svg.addEventListener('pointerdown', function (e) {
    arr = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y, moveu: false, alvo: e.target.closest('.mi-no') };
  });
  svg.addEventListener('pointermove', function (e) {
    if (!arr) return;
    var r = svg.getBoundingClientRect(), k = vb.w / r.width, dx = e.clientX - arr.x, dy = e.clientY - arr.y;
    if (!arr.moveu && Math.abs(dx) + Math.abs(dy) < 6) return;
    if (!arr.moveu) { arr.moveu = true; try { svg.setPointerCapture(e.pointerId); } catch (_) {} }
    vb.x = arr.vx - dx * k; vb.y = arr.vy - dy * k; aplicarVB();
  });
  function soltar() {
    if (arr && !arr.moveu) {
      if (arr.alvo) escolher(arr.alvo.getAttribute('data-id'));
      else if (estado.sel) { estado.sel = null; marcar(); }
    }
    arr = null;
  }
  svg.addEventListener('pointerup', soltar);
  svg.addEventListener('pointercancel', function () { arr = null; });
  svg.addEventListener('wheel', function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    var r = svg.getBoundingClientRect();
    zoom(e.deltaY < 0 ? 1.15 : 0.87, vb.x + (e.clientX - r.left) / r.width * vb.w, vb.y + (e.clientY - r.top) / r.height * vb.h);
  }, { passive: false });
  var largura = 0;
  window.addEventListener('resize', function () { var w = svg.getBoundingClientRect().width; if (Math.abs(w - largura) > 40) { largura = w; centralizar(); } });

  // abre direto num ano quando o endereço pede (#mapa-6) ou começa pela visão geral
  var m = /^#mapa-(\d)$/.exec(location.hash);
  estado.ano = m && anos[+m[1]] ? +m[1] : 0;
  raiz.classList.add('mi-pronto');
  desenhar();
  largura = svg.getBoundingClientRect().width;
})();
