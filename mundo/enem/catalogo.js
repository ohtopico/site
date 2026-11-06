/* Catálogo dos jogos da Ilha ENEM.
   Cada área tem um manifesto próprio (jogos-natureza.js, jogos-mat.js, jogos-hum.js, jogos-ling.js) que faz
     window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat([{ id, area, icone, titulo, url, resumo, habs: ['H1', ...] }]);
   area é a da ilha (bio, qui, fis, mat, hum, ling, red); habs são as habilidades da Matriz ENEM daquela área (matriz.js).
   O id do jogo é também o id das estrelas (ENEM.darEstrelas). Manifesto que ainda não existe é ignorado. */
(function () {
  window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat([
    { id: 'circuito', area: 'fis', icone: '💡', titulo: 'Circuito da casa', url: 'circuito.html', resumo: 'Série, paralelo, brilho das lâmpadas, potência e conta de luz.', habs: ['H5', 'H6', 'H7'] },
    { id: 'ph', area: 'qui', icone: '🧪', titulo: 'Régua do pH', url: 'ph.html', resumo: 'Ácido, neutro ou básico? Coloque os produtos do dia a dia na régua.', habs: ['H24', 'H27', 'H30'] },
    { id: 'balanc', area: 'qui', icone: '⚖️', titulo: 'Balança dos átomos', url: 'balanceamento.html', resumo: 'Ajuste os coeficientes até os átomos baterem dos dois lados.', habs: ['H24', 'H25', 'H26'] }
  ]);

  const MANIFESTOS = ['jogos-natureza.js', 'jogos-mat.js', 'jogos-hum.js', 'jogos-ling.js'];
  const base = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '');

  const AREAS = {
    red: { nome: 'Redação', ic: '✍️', cor: '#ffb38a', dia: 1 },
    ling: { nome: 'Linguagens', ic: '📚', cor: '#c7b4f2', dia: 1 },
    hum: { nome: 'Humanas', ic: '🌎', cor: '#9fe3dc', dia: 1 },
    bio: { nome: 'Biologia', ic: '🧬', cor: '#a8e6b8', dia: 2 },
    qui: { nome: 'Química', ic: '⚗️', cor: '#f7a8c4', dia: 2 },
    fis: { nome: 'Física', ic: '⚡', cor: '#ffd58a', dia: 2 },
    mat: { nome: 'Matemática', ic: '📐', cor: '#a8d8f7', dia: 2 }
  };

  let pronto = null;
  window.ENEM_CATALOGO = {
    AREAS,
    /* carrega os manifestos das áreas (os que existirem) e devolve a lista sem repetidos */
    carregar() {
      if (!pronto) pronto = Promise.all(MANIFESTOS.map(f => new Promise(ok => {
        const s = document.createElement('script');
        s.src = base + f;
        s.onload = s.onerror = () => ok();
        document.head.appendChild(s);
      }))).then(() => this.jogos());
      return pronto;
    },
    jogos() {
      const vistos = new Set();
      return (window.ENEM_JOGOS || []).filter(j => j && j.id && j.url && AREAS[j.area] && !vistos.has(j.id) && vistos.add(j.id))
        .map(j => Object.assign({ icone: '🎮', resumo: '', habs: [] }, j));
    },
    daArea(area) { return this.jogos().filter(j => j.area === area); },
    /* área da Matriz (cn, mt, ch, lc) → { H1: [jogos], ... } */
    cobertura(m) {
      const mapa = window.MATRIZ ? window.MATRIZ.daArea : { bio: 'cn', qui: 'cn', fis: 'cn', mat: 'mt', hum: 'ch', ling: 'lc', red: 'lc' };
      const r = {};
      for (let i = 1; i <= 30; i++) r['H' + i] = [];
      for (const j of this.jogos()) if (mapa[j.area] === m) for (const h of j.habs) if (r[h]) r[h].push(j);
      return r;
    }
  };
})();
