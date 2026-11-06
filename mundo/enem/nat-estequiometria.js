/* 🍳 Cozinha das reações: massa molar, proporção, reagente limitante, rendimento e nomes das substâncias. */
(function () {
  const { sorteia, entre, num, f } = NAT;

  // bolinhas das moléculas: CH4 + 2 O2 → CO2 + 2 H2O
  const at = (x, y, cor, r = 9, t = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${cor}" stroke="#1d2a1f" stroke-width="1.5"/>${t ? `<text x="${x}" y="${y + 4}" text-anchor="middle" style="font-size:9px">${t}</text>` : ''}`;
  const C = '#5a6a5c', O = '#e85c4a', H = '#fff';
  const MOL = {
    CH4: (x, y) => at(x, y, C, 10) + at(x - 12, y - 9, H, 6) + at(x + 12, y - 9, H, 6) + at(x - 12, y + 9, H, 6) + at(x + 12, y + 9, H, 6),
    O2: (x, y) => at(x - 7, y, O) + at(x + 7, y, O),
    CO2: (x, y) => at(x - 15, y, O) + at(x, y, C, 10) + at(x + 15, y, O),
    H2O: (x, y) => at(x, y, O) + at(x - 11, y + 8, H, 6) + at(x + 11, y + 8, H, 6)
  };
  function grade(tipo, n, x0, y0, cols = 3, dx = 36, dy = 30) { let s = ''; for (let k = 0; k < n; k++) s += MOL[tipo](x0 + (k % cols) * dx, y0 + Math.floor(k / cols) * dy); return s; }
  function reator(nc, no) {
    const reag = Math.min(nc, Math.floor(no / 2)), sobraC = nc - reag, sobraO = no - 2 * reag;
    const svg = `<svg class="fig" viewBox="0 0 480 230" role="img" aria-label="Reação do metano com oxigênio">
      <rect x="6" y="20" width="210" height="196" rx="16" fill="#fff6dd" stroke="#d9c99a" stroke-width="2"/><rect x="262" y="20" width="212" height="196" rx="16" fill="#eef6ff" stroke="#9cc5f0" stroke-width="2"/>
      <text x="111" y="14" text-anchor="middle">antes</text><text x="368" y="14" text-anchor="middle">depois</text>
      <text x="239" y="124" text-anchor="middle" style="font-size:26px">→</text>
      ${grade('CH4', nc, 32, 46, 3, 34, 32)}${grade('O2', no, 146, 42, 2, 32, 22)}
      ${grade('CO2', reag, 296, 44, 2, 50, 30)}${grade('H2O', 2 * reag, 410, 44, 2, 32, 24)}
      ${sobraC ? grade('CH4', sobraC, 290, 196, 6, 34, 0) : ''}${sobraO ? grade('O2', Math.min(sobraO, 8), sobraC ? 300 + sobraC * 34 : 290, 198, 8, 22, 0) : ''}</svg>`;
    return { reag, sobraC, sobraO, svg };
  }

  const AM = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, Ca: 40 };
  const FORMULAS = [
    ['H₂O', { H: 2, O: 1 }, 'água'], ['CO₂', { C: 1, O: 2 }, 'dióxido de carbono'], ['CH₄', { C: 1, H: 4 }, 'metano'], ['NaCl', { Na: 1, Cl: 1 }, 'cloreto de sódio (sal de cozinha)'],
    ['C₆H₁₂O₆', { C: 6, H: 12, O: 6 }, 'glicose'], ['NH₃', { N: 1, H: 3 }, 'amônia'], ['H₂SO₄', { H: 2, S: 1, O: 4 }, 'ácido sulfúrico'], ['CaCO₃', { Ca: 1, C: 1, O: 3 }, 'carbonato de cálcio (calcário)'],
    ['NaOH', { Na: 1, O: 1, H: 1 }, 'hidróxido de sódio (soda cáustica)'], ['C₂H₆O', { C: 2, H: 6, O: 1 }, 'etanol'], ['NaHCO₃', { Na: 1, H: 1, C: 1, O: 3 }, 'bicarbonato de sódio'], ['Mg(OH)₂', { Mg: 1, O: 2, H: 2 }, 'hidróxido de magnésio (leite de magnésia)']
  ];
  const massa = c => Object.entries(c).reduce((s, [e, n]) => s + AM[e] * n, 0);
  const NOMES = [...FORMULAS.map(x => [x[0], x[2]]), ['NaClO', 'hipoclorito de sódio (água sanitária)'], ['CaO', 'óxido de cálcio (cal virgem)'], ['HCl', 'ácido clorídrico (ácido muriático)']];

  NAT.jogo({
    id: 'nat-estequiometria', area: 'qui', icone: '🍳', titulo: 'Cozinha das reações',
    intro: 'Química é receita de bolo: as moléculas reagem sempre na mesma proporção. Coloque metano e oxigênio no reator e veja o que forma e o que sobra. Depois os desafios de massa molar, regra de três, reagente limitante e rendimento.',
    habs: ['H24', 'H25', 'H17'],
    cola: ['<b>Massa molar</b>: soma das massas dos átomos<br>H 1 · C 12 · N 14 · O 16 · Na 23 · Cl 35,5', '<b>1 mol</b> = 6 × 10²³ partículas', '<b>CH₄ + 2 O₂ → CO₂ + 2 H₂O</b><br>coeficientes = proporção em mol',
      '<b>Regra de três</b> com a proporção em massa<br>16 g de CH₄ → 44 g de CO₂', '<b>Limitante</b>: o reagente que acaba primeiro', '<b>Rendimento</b> = obtido ÷ teórico × 100'],
    lab: {
      titulo: 'Reator do gás de cozinha', texto: 'Cada metano (CH₄) precisa de <b>dois</b> oxigênios (O₂) para queimar. O que não encontra par sobra no final (excesso). Cinza = carbono, vermelho = oxigênio, branco = hidrogênio.',
      controles: [
        { id: 'c', rotulo: 'Moléculas de metano (CH₄)', min: 1, max: 6, passo: 1, valor: 2, unid: '' },
        { id: 'o', rotulo: 'Moléculas de oxigênio (O₂)', min: 1, max: 12, passo: 1, valor: 4, unid: '' }],
      desenhar({ c, o }) {
        const r = reator(c, o);
        const lim = r.sobraC ? 'O oxigênio é o <b>limitante</b> (acabou primeiro)' : r.sobraO ? 'O metano é o <b>limitante</b> (acabou primeiro)' : 'Proporção perfeita: <b>nada sobra</b>';
        return { svg: r.svg, leitura: [`Formou <b>${r.reag} CO₂</b> e <b>${2 * r.reag} H₂O</b>`, lim, r.sobraC ? `Sobrou ${r.sobraC} CH₄ (combustão incompleta pode gerar CO, venenoso)` : r.sobraO ? `Sobrou ${r.sobraO} O₂ em excesso` : 'Átomos antes = átomos depois (Lavoisier)'] };
      }
    },
    desafios: [
      () => {
        const [fo, comp, nome] = sorteia(FORMULAS), M = massa(comp);
        const errada1 = Object.keys(comp).reduce((s, e) => s + AM[e], 0);
        return { hab: 'H24', enun: `Qual é a massa molar do(a) <b>${nome}</b>, ${fo}? (H = 1; C = 12; N = 14; O = 16; Na = 23; Mg = 24; S = 32; Cl = 35,5; Ca = 40)`,
          certa: num(M, 1) + ' g/mol', erradas: [num(errada1, 1) + ' g/mol', num(M + 16, 1) + ' g/mol', num(M - 1, 1) + ' g/mol', num(M * 2, 1) + ' g/mol'],
          expl: `Some cada átomo vezes quantas vezes ele aparece: ${f(Object.entries(comp).map(([e, n]) => `${n}×${num(AM[e], 1)}`).join(' + ') + ' = ' + num(M, 1))} g/mol.` };
      },
      () => {
        const m = sorteia([4, 8, 16, 32, 48, 80]);
        return { hab: 'H25', enun: `No fogão, o metano queima: CH₄ + 2 O₂ → CO₂ + 2 H₂O. Quantos gramas de CO₂ são liberados na queima de ${m} g de metano? (CH₄ = 16 g/mol; CO₂ = 44 g/mol)`,
          certa: num(m * 44 / 16) + ' g', erradas: [num(m * 16 / 44) + ' g', num(m * 2 * 44 / 16) + ' g', num(m + 44) + ' g', num(m * 44) + ' g'],
          expl: `Proporção 1 mol : 1 mol, ou seja, 16 g de CH₄ → 44 g de CO₂. Regra de três: ${f(`x = ${m} × 44 ÷ 16 = ${num(m * 44 / 16)} g`)}.` };
      },
      () => {
        const nh = entre(2, 10), no = entre(1, 6), agua = Math.min(nh, 2 * no), lim = nh < 2 * no ? 'H₂' : nh > 2 * no ? 'O₂' : null;
        return { hab: 'H25', enun: `Na reação 2 H₂ + O₂ → 2 H₂O, misturam-se ${nh} mol de H₂ com ${no} mol de O₂. Quantos mol de água se formam no máximo?`,
          certa: agua + ' mol', erradas: [nh + no + ' mol', Math.max(nh, 2 * no) + ' mol', 2 * (nh + no) + ' mol', Math.min(nh, no) + ' mol', 2 * nh + ' mol'],
          expl: `Cada 2 H₂ precisam de 1 O₂. ${no} mol de O₂ dariam para ${2 * no} mol de H₂, e temos ${nh}. ${lim ? `O limitante é o <b>${lim}</b>: ele acaba primeiro e define ${f(agua + ' mol de H₂O')}.` : 'Proporção exata, nada sobra.'}` };
      },
      () => {
        const teo = sorteia([200, 500, 800, 1000]), r = sorteia([50, 60, 75, 80, 90]), obt = teo * r / 100;
        const pede = sorteia(['r', 'obt']);
        return pede === 'r'
          ? { hab: 'H25', enun: `Pelos cálculos, a fábrica deveria produzir ${teo} kg de fertilizante, mas obteve ${num(obt)} kg. Qual foi o rendimento?`,
            certa: r + '%', erradas: [100 - r + '%', num(teo / obt * 100, 0) + '%', num(obt / 10, 0) + '%', num(teo - obt, 0) + '%'],
            expl: `${f(`rendimento = ${num(obt)} ÷ ${teo} × 100 = ${r}%`)}. Perdas acontecem por reações paralelas, impurezas e reagentes que não reagem.` }
          : { hab: 'H25', enun: `Uma reação deveria formar ${teo} g de produto, mas tem rendimento de ${r}%. Quanto se obtém de fato?`,
            certa: num(obt) + ' g', erradas: [num(teo) + ' g', num(teo * (100 - r) / 100) + ' g', num(teo / r * 100) + ' g', num(teo + obt) + ' g'],
            expl: `${f(`${teo} × ${r}/100 = ${num(obt)} g`)}.` };
      },
      () => {
        const [fo, nome] = sorteia(NOMES);
        return { hab: 'H24', enun: `Num rótulo aparece a fórmula <b>${fo}</b>. Que substância é essa?`, certa: nome[0].toUpperCase() + nome.slice(1),
          erradas: ENEM.embaralha(NOMES.filter(x => x[0] !== fo)).map(x => x[1][0].toUpperCase() + x[1].slice(1)),
          expl: `${fo} é ${nome}. Macetes: termina em "ato" (CO₃, SO₄) é sal de oxigênio; OH é base (hidróxido); começa com H, como HCl e H₂SO₄, é ácido.` };
      },
      () => {
        const n = sorteia([0.5, 2, 3, 5]), Vm = 25;
        return { hab: 'H17', enun: `Um carro libera ${num(n)} mol de CO₂ por quilômetro. Que volume esse gás ocupa, considerando o volume molar de ${Vm} L/mol nas condições do ambiente?`,
          certa: num(n * Vm) + ' L', erradas: [num(n * 22.4) + ' L', num(Vm / n) + ' L', num(n * 44) + ' L', num(n * 6) + ' L'],
          expl: `Cada mol de gás ocupa ${Vm} L (o enunciado diz qual valor usar, às vezes 22,4 L): ${f(`${num(n)} × ${Vm} = ${num(n * Vm)} L`)}.` };
      }
    ]
  });
})();
