/* Ilustrações dos jogos para a página dos estudantes (/jogos/).
   Desenhos simples em SVG, traço preto e cores do site (verde, amarelo, vermelho; sem azul).
   Cada jogo novo sem desenho aqui aparece com a inicial do título. */
(function () {
  const T = 'stroke="#111" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';
  const V = '#2fa865', A = '#ffd23f', R = '#ef5a4c', B = '#fff', C = '#f2efe6';
  window.ICONES_JOGOS = {
    robo: `<line x1="32" y1="6" x2="32" y2="14" ${T}/><circle cx="32" cy="6" r="3" fill="${R}" ${T}/>
      <rect x="14" y="14" width="36" height="28" rx="8" fill="${V}" ${T}/><circle cx="25" cy="27" r="5" fill="${B}" ${T}/><circle cx="39" cy="27" r="5" fill="${B}" ${T}/>
      <circle cx="25" cy="27" r="1.8" fill="#111"/><circle cx="39" cy="27" r="1.8" fill="#111"/><path d="M26 36h12" ${T}/>
      <rect x="20" y="44" width="24" height="14" rx="4" fill="${A}" ${T}/><path d="M10 26v8M54 26v8" ${T}/>`,
    pacotes: `<path d="M8 22l24-10 24 10v24l-24 10-24-10z" fill="${A}" ${T}/><path d="M8 22l24 10 24-10M32 32v24" fill="none" ${T}/>
      <path d="M20 17l24 10v8" fill="none" stroke="${R}" stroke-width="4"/><text x="17" y="46" font-family="Sniglet,sans-serif" font-weight="800" font-size="12" fill="#111">3</text>`,
    rotas: `<path d="M10 52c8-2 6-14 16-16s10 8 18 4" fill="none" stroke="#111" stroke-width="2.5" stroke-dasharray="4 4"/>
      <circle cx="10" cy="52" r="5" fill="${V}" ${T}/><path d="M46 10c-7 0-11 5-11 10 0 8 11 18 11 18s11-10 11-18c0-5-4-10-11-10z" fill="${R}" ${T}/><circle cx="46" cy="20" r="4" fill="${B}" ${T}/>`,
    cifra: `<circle cx="26" cy="26" r="15" fill="${C}" ${T}/><path d="M37 37l15 15" stroke="#111" stroke-width="6" stroke-linecap="round"/>
      <text x="16" y="31" font-family="Sniglet,sans-serif" font-weight="800" font-size="14" fill="${V}">A</text><text x="27" y="31" font-family="Sniglet,sans-serif" font-weight="800" font-size="14" fill="${R}">D</text>`,
    golpe: `<path d="M32 6l22 8v14c0 14-10 24-22 30C20 52 10 42 10 28V14z" fill="${A}" ${T}/><path d="M32 18v16" stroke="#111" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="43" r="3" fill="#111"/>`,
    fracoes: `<circle cx="32" cy="32" r="24" fill="${B}" ${T}/><path d="M32 32V8a24 24 0 0 1 24 24z" fill="${R}" ${T}/><path d="M32 32L8 32" ${T}/><path d="M32 32V56" ${T}/>`,
    cartesiano: `<path d="M8 32h48M32 8v48" ${T}/><path d="M52 28l4 4-4 4M28 12l4-4 4 4" fill="none" ${T}/>
      <path d="M38 16l8 8M46 16l-8 8" stroke="${R}" stroke-width="4" stroke-linecap="round"/><circle cx="20" cy="44" r="4" fill="${V}" ${T}/>`,
    balanca: `<path d="M32 10v40M20 54h24" ${T}/><path d="M10 18h44" ${T}/><circle cx="32" cy="10" r="3" fill="${A}" ${T}/>
      <path d="M10 18l-6 16h12zM54 18l-6 16h12z" fill="none" ${T}/><path d="M4 34a6 4 0 0 0 12 0z" fill="${V}" ${T}/><path d="M48 34a6 4 0 0 0 12 0z" fill="${A}" ${T}/>`,
    tangram: `<rect x="10" y="10" width="44" height="44" fill="${B}" ${T}/><path d="M10 10l22 22-22 22z" fill="${V}" ${T}/><path d="M10 10h44L32 32z" fill="${A}" ${T}/>
      <path d="M54 10v22L43 21z" fill="${R}" ${T}/><path d="M32 32l11 11-11 11-11-11z" fill="${C}" ${T}/>`,
    tabuada: `<path d="M6 40l6-12h26l10 8h8v10H6z" fill="${R}" ${T}/><path d="M16 28l4-8h12l6 8" fill="${B}" ${T}/>
      <circle cx="18" cy="46" r="6" fill="#111"/><circle cx="46" cy="46" r="6" fill="#111"/><path d="M44 10l8 8M52 10l-8 8" stroke="${V}" stroke-width="4" stroke-linecap="round"/>`,
    graficos: `<path d="M8 54h48" ${T}/><rect x="12" y="34" width="9" height="20" fill="${V}" ${T}/><rect x="26" y="20" width="9" height="34" fill="${A}" ${T}/><rect x="40" y="28" width="9" height="26" fill="${R}" ${T}/>
      <circle cx="46" cy="14" r="7" fill="${B}" ${T}/><path d="M51 19l6 6" stroke="#111" stroke-width="4" stroke-linecap="round"/>`,
    wikipedia: `<path d="M6 14c10-4 18-2 26 4 8-6 16-8 26-4v38c-10-4-18-2-26 4-8-6-16-8-26-4z" fill="${B}" ${T}/><path d="M32 18v38" ${T}/>
      <text x="11" y="40" font-family="Georgia,serif" font-weight="700" font-size="17" fill="#111">W</text><path d="M40 40l4-10 4 6 4-12" fill="none" stroke="${V}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
    mesada: `<rect x="8" y="18" width="44" height="32" rx="6" fill="${V}" ${T}/><path d="M8 26h44" ${T}/><rect x="38" y="30" width="18" height="12" rx="4" fill="${A}" ${T}/><circle cx="45" cy="36" r="2.5" fill="#111"/>
      <circle cx="20" cy="12" r="6" fill="${A}" ${T}/>`,
    poupanca: `<path d="M8 54h48M8 54V10" ${T}/><path d="M12 48c10-2 18-8 24-18s10-14 16-16" fill="none" stroke="${V}" stroke-width="4" stroke-linecap="round"/>
      <path d="M44 12l9 1-2 9" fill="none" stroke="${V}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="22" cy="24" r="7" fill="${A}" ${T}/><text x="19" y="28" font-family="Sniglet,sans-serif" font-weight="800" font-size="11" fill="#111">$</text>`,
    bhaskara: `<path d="M8 32h48M32 8v48" stroke="#111" stroke-width="2" opacity=".5"/><path d="M12 10c6 30 34 30 40 0" fill="none" stroke="${R}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="18.5" cy="32" r="3.5" fill="${A}" ${T}/><circle cx="45.5" cy="32" r="3.5" fill="${A}" ${T}/><text x="38" y="58" font-family="Sniglet,sans-serif" font-weight="800" font-size="14" fill="#111">x²</text>`,
    'empresa-sucos': `<path d="M16 20h32l-4 36H20z" fill="${A}" ${T}/><path d="M17 30h30" ${T}/><path d="M36 20l6-14h6" fill="none" ${T}/>
      <circle cx="44" cy="20" r="8" fill="${V}" ${T}/><path d="M44 12v16M36 20h16" stroke="#111" stroke-width="1.5"/>`,
    angulos: `<path d="M8 46a24 24 0 0 1 48 0z" fill="${A}" ${T}/><path d="M32 46L50 18" stroke="${R}" stroke-width="4" stroke-linecap="round"/>
      <path d="M14 46a18 18 0 0 1 3-10M50 46a18 18 0 0 0-3-10M32 28v4" ${T}/><circle cx="32" cy="46" r="3" fill="#111"/>`,
    cofrinho: `<ellipse cx="32" cy="36" rx="22" ry="16" fill="#ffb3b0" ${T}/><path d="M22 23l-2-9 9 5" fill="#ffb3b0" ${T}/><rect x="26" y="20" width="12" height="3" rx="1.5" fill="#111"/>
      <path d="M20 50v6M44 50v6" ${T}/><circle cx="44" cy="32" r="2" fill="#111"/><ellipse cx="54" cy="38" rx="4" ry="5" fill="#ff9d99" ${T}/><circle cx="32" cy="8" r="6" fill="${A}" ${T}/>`,
    tabelas: `<rect x="8" y="10" width="48" height="44" rx="5" fill="${B}" ${T}/><path d="M8 22h48M8 34h48M8 46h48M24 10v44M40 10v44" ${T}/>
      <rect x="8" y="10" width="48" height="12" rx="5" fill="${V}" ${T}/><path d="M28 39l4 4 6-9" fill="none" stroke="${R}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    receitas: `<path d="M8 30h48c0 14-10 24-24 24S8 44 8 30z" fill="${R}" ${T}/><path d="M4 30h56" ${T}/>
      <path d="M40 30L52 8" stroke="#111" stroke-width="3" stroke-linecap="round"/><ellipse cx="52" cy="8" rx="3" ry="5" fill="${A}" ${T}/><circle cx="22" cy="22" r="4" fill="${V}" ${T}/><circle cx="31" cy="20" r="3" fill="${A}" ${T}/>`,
    cartao: `<rect x="6" y="14" width="52" height="36" rx="6" fill="${V}" ${T}/><path d="M6 24h52" stroke="#111" stroke-width="6"/>
      <rect x="12" y="32" width="12" height="9" rx="2" fill="${A}" ${T}/><path d="M30 42h20" ${T}/>`,
    cambio: `<circle cx="22" cy="24" r="14" fill="${A}" ${T}/><text x="15" y="30" font-family="Sniglet,sans-serif" font-weight="800" font-size="16" fill="#111">R$</text>
      <circle cx="42" cy="42" r="14" fill="${V}" ${T}/><text x="37" y="48" font-family="Sniglet,sans-serif" font-weight="800" font-size="17" fill="#111">$</text>
      <path d="M44 12c6 2 10 8 10 14M52 22l2 4 4-3" fill="none" ${T}/><path d="M20 54c-6-2-10-8-10-14M12 44l-2-4-4 3" fill="none" ${T}/>`
  };
  window.iconeJogo = function (id, titulo) {
    const s = window.ICONES_JOGOS[id];
    if (s) return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${s}</svg>`;
    return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="32" r="24" fill="#fff" ${T}/><text x="32" y="41" text-anchor="middle" font-family="Sniglet,sans-serif" font-weight="800" font-size="26" fill="#111">${String(titulo || '?')[0]}</text></svg>`;
  };
})();
