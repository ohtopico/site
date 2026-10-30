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
    digitacao: `<rect x="4" y="18" width="56" height="30" rx="6" fill="${A}" ${T}/>
      <g fill="${B}" stroke="#111" stroke-width="1.8"><rect x="9" y="23" width="8" height="7" rx="1.5"/><rect x="19" y="23" width="8" height="7" rx="1.5"/><rect x="29" y="23" width="8" height="7" rx="1.5"/><rect x="39" y="23" width="8" height="7" rx="1.5"/><rect x="49" y="23" width="6" height="7" rx="1.5"/><rect x="18" y="34" width="28" height="8" rx="1.5"/></g>
      <path d="M22 12l4-6M32 12V4M42 12l-4-6" stroke="${R}" stroke-width="3" stroke-linecap="round"/><rect x="29" y="23" width="8" height="7" rx="1.5" fill="${V}" stroke="#111" stroke-width="1.8"/>`,
    numeria: `<path d="M27 40V12l5-7 5 7v28z" fill="${B}" ${T}/><path d="M18 40h28" stroke="#111" stroke-width="6" stroke-linecap="round"/><path d="M32 44v8" stroke="#a8743f" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="56" r="3.5" fill="${A}" ${T}/>
      <path d="M44 30h16v10c0 8-5 13-8 15-3-2-8-7-8-15z" fill="${R}" ${T}/><text x="2" y="30" font-family="Sniglet,sans-serif" font-weight="800" font-size="15" fill="${V}" stroke="#111" stroke-width=".8">x²</text>`,
    impostor: `<circle cx="14" cy="22" r="7" fill="${V}" ${T}/><path d="M3 54c0-12 5-20 11-20s11 8 11 20z" fill="${V}" ${T}/>
      <circle cx="50" cy="22" r="7" fill="${A}" ${T}/><path d="M39 54c0-12 5-20 11-20s11 8 11 20z" fill="${A}" ${T}/>
      <circle cx="32" cy="18" r="8" fill="${R}" ${T}/><path d="M19 56c0-14 6-24 13-24s13 10 13 24z" fill="${R}" ${T}/>
      <text x="27" y="51" font-family="Sniglet,sans-serif" font-weight="800" font-size="15" fill="${B}">?</text>`,
    'partes-computador': `<rect x="12" y="6" width="40" height="28" rx="4" fill="${B}" ${T}/><rect x="16" y="10" width="32" height="20" rx="2" fill="#9fdab4" ${T}/>
      <circle cx="26" cy="19" r="2" fill="#111"/><circle cx="38" cy="19" r="2" fill="#111"/><path d="M27 24q5 4 10 0" fill="none" ${T}/>
      <rect x="6" y="42" width="34" height="14" rx="3" fill="${A}" ${T}/><path d="M11 47h4M18 47h4M25 47h4M32 47h4M14 52h18" ${T}/>
      <path d="M52 40c4 0 6 3 6 7v3c0 4-2 7-6 7s-6-3-6-7v-3c0-4 2-7 6-7z" fill="${R}" ${T}/>`,
    'vale-bits': `<path d="M6 54h52" ${T}/><path d="M10 54V30l12-10 12 10v24z" fill="${B}" ${T}/><path d="M8 32l14-13 14 13" fill="${R}" ${T}/>
      <rect x="18" y="40" width="8" height="14" fill="${V}" ${T}/><path d="M40 54V38M46 54V38M52 54V38M38 44h16M38 50h16" ${T}/>
      <path d="M48 8l7 7-7 7-7-7z" fill="${A}" ${T}/>`,
    'vila-cidada': `<rect x="8" y="34" width="16" height="16" fill="${V}" ${T}/><rect x="8" y="34" width="16" height="5" fill="#5fb04a" ${T}/>
      <rect x="24" y="34" width="16" height="16" fill="#8a5a36" ${T}/><rect x="24" y="34" width="16" height="5" fill="#5fb04a" ${T}/>
      <rect x="40" y="18" width="16" height="32" fill="${A}" ${T}/><rect x="45" y="24" width="6" height="6" fill="${B}" ${T}/><path d="M38 18l10-10 10 10z" fill="${R}" ${T}/>
      <rect x="16" y="14" width="10" height="10" fill="#c98e62" ${T}/><rect x="15" y="24" width="12" height="10" fill="${R}" ${T}/>`,
    python: `<rect x="6" y="10" width="52" height="38" rx="6" fill="#111" ${T}/><path d="M14 22l7 5-7 5" fill="none" stroke="${V}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M25 33h10" stroke="${A}" stroke-width="3" stroke-linecap="round"/><path d="M40 56c0-8 4-12 10-12" fill="none" stroke="#2f7a3f" stroke-width="2.5"/>
      <path d="M44 50c-6 0-8-5-8-5 5-1 8 2 8 5z" fill="${V}" ${T}/><circle cx="51" cy="42" r="5" fill="${R}" ${T}/>`,
    'cidade-blocos': `<path d="M32 30l20-10v22L32 52 12 42V20z" fill="${A}" ${T}/><path d="M12 20l20 10 20-10" fill="none" ${T}/><path d="M32 30v22" ${T}/>
      <path d="M12 20l20-10 20 10-20 10z" fill="${R}" ${T}/><ellipse cx="25" cy="18" rx="3.5" ry="1.8" fill="${B}" ${T}/><ellipse cx="39" cy="18" rx="3.5" ry="1.8" fill="${B}" ${T}/>
      <circle cx="50" cy="12" r="8" fill="${V}" ${T}/><text x="46.5" y="16.5" font-family="Sniglet,sans-serif" font-weight="800" font-size="12" fill="#fff">?</text>`,
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
      <path d="M44 12c6 2 10 8 10 14M52 22l2 4 4-3" fill="none" ${T}/><path d="M20 54c-6-2-10-8-10-14M12 44l-2-4-4 3" fill="none" ${T}/>`,
    senha: `<path d="M20 28v-8a12 12 0 0 1 24 0v8" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>
      <rect x="10" y="28" width="44" height="30" rx="7" fill="${A}" ${T}/><circle cx="21" cy="43" r="3.2" fill="#111"/><circle cx="32" cy="43" r="3.2" fill="#111"/><circle cx="43" cy="43" r="3.2" fill="#111"/>
      <path d="M48 6l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" fill="${V}" ${T}/>`,
    paridade: `<rect x="6" y="6" width="14" height="18" rx="3" fill="${A}" ${T}/><rect x="25" y="6" width="14" height="18" rx="3" fill="${B}" ${T}/><rect x="44" y="6" width="14" height="18" rx="3" fill="${B}" stroke="#111" stroke-width="2.5" stroke-dasharray="3 3"/>
      <rect x="6" y="29" width="14" height="18" rx="3" fill="${B}" ${T}/><rect x="25" y="29" width="14" height="18" rx="3" fill="${R}" ${T}/><rect x="44" y="29" width="14" height="18" rx="3" fill="${A}" stroke="#111" stroke-width="2.5" stroke-dasharray="3 3"/>
      <path d="M14 58l18-6 18 6" fill="none" stroke="${V}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    'busca-binaria': `<path d="M4 56h56" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <rect x="6" y="22" width="8" height="34" fill="${V}" ${T} opacity=".35"/><rect x="15" y="18" width="8" height="38" fill="${A}" ${T} opacity=".35"/><rect x="24" y="24" width="8" height="32" fill="${R}" ${T} opacity=".35"/>
      <rect x="33" y="12" width="9" height="44" fill="${V}" ${T}/><rect x="43" y="20" width="8" height="36" fill="${A}" ${T}/><rect x="52" y="16" width="8" height="40" fill="${R}" ${T}/>
      <path d="M37.5 4v6" stroke="#111" stroke-width="3" stroke-linecap="round"/><path d="M33 6l4.5 5 4.5-5" fill="none" ${T}/>`,
    'filas-pilhas': `<circle cx="10" cy="16" r="5" fill="${V}" ${T}/><rect x="4" y="22" width="12" height="16" rx="5" fill="${V}" ${T}/>
      <circle cx="26" cy="16" r="5" fill="${A}" ${T}/><rect x="20" y="22" width="12" height="16" rx="5" fill="${A}" ${T}/>
      <rect x="38" y="50" width="22" height="6" rx="2" fill="${R}" ${T}/><rect x="38" y="42" width="22" height="6" rx="2" fill="${A}" ${T}/><rect x="38" y="34" width="22" height="6" rx="2" fill="${V}" ${T}/>
      <path d="M38 24h22M49 16v14M44 20l5-5 5 5" fill="none" ${T}/><path d="M4 46h28" ${T}/>`,
    'linha-tempo': `<path d="M4 34h56" stroke="#111" stroke-width="3.5" stroke-linecap="round"/><path d="M52 28l8 6-8 6" fill="none" ${T}/>
      <circle cx="14" cy="34" r="5" fill="${A}" ${T}/><circle cx="32" cy="34" r="5" fill="${V}" ${T}/><circle cx="48" cy="34" r="5" fill="${R}" ${T}/>
      <rect x="6" y="8" width="16" height="14" rx="3" fill="${B}" ${T}/><path d="M10 13h8M10 17h5" ${T}/><path d="M14 22v7" ${T}/>
      <rect x="40" y="44" width="16" height="14" rx="3" fill="${B}" ${T}/><path d="M44 49h8M44 53h5" ${T}/><path d="M48 39v5" ${T}/>`,
    bingo: `<rect x="8" y="8" width="48" height="48" rx="6" fill="${B}" ${T}/><path d="M24 8v48M40 8v48M8 24h48M8 40h48" ${T}/>
      <rect x="24" y="24" width="16" height="16" fill="${A}" ${T}/><circle cx="16" cy="16" r="5" fill="none" stroke="${V}" stroke-width="3"/>
      <circle cx="48" cy="48" r="5" fill="none" stroke="${V}" stroke-width="3"/><circle cx="48" cy="16" r="5" fill="none" stroke="${R}" stroke-width="3"/>`,
    boletim: `<rect x="6" y="8" width="52" height="48" rx="5" fill="${B}" ${T}/><rect x="6" y="8" width="52" height="10" rx="5" fill="${V}" ${T}/>
      <path d="M6 30h52M6 43h52M22 18v38M40 18v38" stroke="#111" stroke-width="2"/><rect x="40" y="30" width="18" height="13" fill="${A}" ${T}/>
      <text x="9" y="16" font-family="Sniglet,sans-serif" font-weight="800" font-size="8" fill="#111">=SOMA</text>`,
    meteorologista: `<circle cx="22" cy="20" r="10" fill="${A}" ${T}/><path d="M22 4v4M8 20H4M11 9l-3-3M36 9l3-3" ${T}/>
      <path d="M20 40a10 10 0 0 1 4-19 13 13 0 0 1 24 4 8 8 0 0 1 2 15z" fill="${B}" ${T}/>
      <path d="M8 58l12-8 10 4 14-10 12 6" fill="none" stroke="${V}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="56" cy="50" r="3.5" fill="${R}" ${T}/>`,
    arquiteto: `<rect x="6" y="10" width="52" height="44" fill="${B}" stroke="#111" stroke-width="4"/><path d="M18 8h28" stroke="${V}" stroke-width="5" stroke-linecap="round"/>
      <g fill="${A}" stroke="#111" stroke-width="1.8"><rect x="12" y="24" width="8" height="7" rx="1.5"/><rect x="22" y="24" width="8" height="7" rx="1.5"/><rect x="36" y="24" width="8" height="7" rx="1.5"/><rect x="46" y="24" width="8" height="7" rx="1.5"/>
      <rect x="12" y="38" width="8" height="7" rx="1.5"/><rect x="22" y="38" width="8" height="7" rx="1.5"/><rect x="36" y="38" width="8" height="7" rx="1.5"/><rect x="46" y="38" width="8" height="7" rx="1.5"/></g>
      <path d="M4 60h24M4 57v6M28 57v6" stroke="${R}" stroke-width="2.5" stroke-linecap="round"/>`
  };
  window.iconeJogo = function (id, titulo) {
    const s = window.ICONES_JOGOS[id];
    if (s) return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">${s}</svg>`;
    return `<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><circle cx="32" cy="32" r="24" fill="#fff" ${T}/><text x="32" y="41" text-anchor="middle" font-family="Sniglet,sans-serif" font-weight="800" font-size="26" fill="#111">${String(titulo || '?')[0]}</text></svg>`;
  };
})();
