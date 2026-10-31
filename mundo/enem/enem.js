/* Ilha ENEM: trava pelo código, estrelas e erros guardados só neste aparelho. */
(function () {
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const salvo = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (salvo === 'dark' || salvo === 'light') document.documentElement.dataset.theme = salvo;
  } catch (e) {}

  const CHAVE = 'ohtopico:enem';
  // SHA-256 do código, para o código não aparecer no fonte da página.
  const HASH = '7c8a9a49e351d082f49206dfd7d5612c2e4bffb234690d07f5e0c8fb701f0841';
  let mem = null;
  function ler() {
    if (mem) return mem;
    try { mem = JSON.parse(localStorage.getItem(CHAVE)); } catch (e) {}
    if (!mem || typeof mem !== 'object') mem = {};
    mem.est = mem.est || {}; mem.erros = mem.erros || []; mem.feitas = mem.feitas || 0;
    return mem;
  }
  function gravar() { try { localStorage.setItem(CHAVE, JSON.stringify(mem)); } catch (e) {} }

  async function hash(txt) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  const normaliza = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/gi, '').toUpperCase();

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.ENEM = {
    esc,
    liberado: () => !!ler().lib,
    async tentar(codigo) {
      if (!window.crypto || !crypto.subtle) return normaliza(codigo) === ['E', 'N', 'E', 'M'].join('') && this.liberar();
      if (await hash(normaliza(codigo)) !== HASH) return false;
      return this.liberar();
    },
    liberar() { ler().lib = true; gravar(); return true; },
    /* página de jogo: sem o código, volta para a porta da ilha */
    exigir() { if (!ler().lib) location.replace('./'); },
    estrelas: id => ler().est[id] || 0,
    totalEstrelas: () => Object.values(ler().est).reduce((a, b) => a + b, 0),
    darEstrelas(id, n) { const m = ler(); if (n > (m.est[id] || 0)) { m.est[id] = n; gravar(); return true; } return false; },
    estrelasHtml: (n, max = 3) => '<span class="estrelas" aria-label="' + n + ' de ' + max + ' estrelas">' +
      Array.from({ length: max }, (_, i) => '<span class="' + (i < n ? 'on' : 'off') + '">★</span>').join('') + '</span>',
    erros: () => ler().erros.slice(),
    marcarErro(id) { const m = ler(); if (!m.erros.includes(id)) { m.erros.push(id); if (m.erros.length > 300) m.erros.shift(); gravar(); } },
    tirarErro(id) { const m = ler(); const i = m.erros.indexOf(id); if (i >= 0) { m.erros.splice(i, 1); gravar(); } },
    contarFeitas(n) { ler().feitas += n; gravar(); },
    feitas: () => ler().feitas,
    embaralha(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    /* barra do topo, igual em todas as páginas da ilha */
    topo(el) {
      if (!el) return;
      el.innerHTML = '<div class="wrap"><a class="marca" href="./">🏝️ Ilha ENEM</a>' +
        '<span class="tot" title="Estrelas ganhas na ilha"><b>★</b> <span id="tot-est">' + ENEM.totalEstrelas() + '</span> · <a href="../">Mundo</a></span></div>';
    }
  };
})();
