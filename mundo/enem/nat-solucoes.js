/* 🧃 Laboratório de soluções: concentração, diluição, ppm, solubilidade e separação de misturas. */
(function () {
  const { sorteia, num, f } = NAT;

  function bequer(m, V, rot = '') {
    const C = V ? m / V * 1000 : 0, h = 20 + V / 1000 * 140, op = Math.min(0.95, 0.08 + C / 120);
    return `<svg class="fig" viewBox="0 0 480 220" role="img" aria-label="Béquer com ${num(V)} mL de solução">
      <path d="M150 30 V190 Q150 200 160 200 H320 Q330 200 330 190 V30" fill="#fff" stroke="#1d2a1f" stroke-width="3"/>
      <rect x="152" y="${200 - h}" width="176" height="${h - 2}" fill="rgb(230,90,120)" opacity="${op}"/>
      ${[250, 500, 750, 1000].map(v => `<path d="M330 ${200 - (20 + v / 1000 * 140)} h-14" stroke="#1d2a1f" stroke-width="2"/><text x="338" y="${204 - (20 + v / 1000 * 140)}" class="fino" style="font-size:11px">${v} mL</text>`).join('')}
      <text x="80" y="110" text-anchor="middle" style="font-size:34px">🧂</text><text x="80" y="140" text-anchor="middle">${num(m)} g</text>
      ${rot ? `<text x="240" y="20" text-anchor="middle">${rot}</text>` : ''}</svg>`;
  }

  const SEPARA = [
    ['água e óleo de cozinha', 'Decantação (funil de separação)', 'Líquidos que não se misturam e têm densidades diferentes: o óleo fica por cima e a água escoa pela torneira do funil.'],
    ['areia e água', 'Filtração', 'Sólido que não dissolve num líquido: o filtro segura a areia e deixa a água passar. É a etapa final das estações de tratamento.'],
    ['sal dissolvido na água do mar, para obter água potável', 'Destilação simples', 'A água evapora, condensa e é recolhida; o sal fica no balão. É a dessalinização.'],
    ['álcool e água (líquidos miscíveis)', 'Destilação fracionada', 'Líquidos que se misturam e têm pontos de ebulição diferentes: o de menor ponto de ebulição sai primeiro pela coluna.'],
    ['os componentes do petróleo (gasolina, diesel, querosene)', 'Destilação fracionada', 'Na torre da refinaria cada fração condensa numa altura, conforme seu ponto de ebulição.'],
    ['limalha de ferro misturada com areia', 'Separação magnética', 'O ímã atrai o ferro e deixa a areia. Usado em usinas de reciclagem de lixo.'],
    ['o sal da água do mar nas salinas', 'Evaporação', 'O Sol e o vento evaporam a água e o sal cristaliza. Aqui só o sólido interessa, a água se perde.']
  ];
  const METODOS = [...new Set(SEPARA.map(x => x[1]))].concat(['Centrifugação', 'Peneiração']);

  NAT.jogo({
    id: 'nat-solucoes', area: 'qui', icone: '🧃', titulo: 'Laboratório de soluções',
    intro: 'Dissolva sal na água e mude o volume: a cor mostra se a solução está concentrada ou diluída. Depois enfrente desafios de concentração, diluição, ppm na água potável, solubilidade e separação de misturas.',
    habs: ['H7', 'H19', 'H17'],
    cola: ['<b>C = m / V</b><br>g/L: gramas de soluto por litro de solução', '<b>Diluir</b>: o soluto não muda<br>C₁·V₁ = C₂·V₂', '<b>Misturar soluções</b> do mesmo soluto<br>C = (C₁V₁ + C₂V₂) / (V₁ + V₂)',
      '<b>1 ppm</b> = 1 mg por litro (de água)<br>1 parte em 1 milhão', '<b>Solubilidade</b>: o máximo que dissolve.<br>Acima disso, o resto vai para o fundo (corpo de fundo)', '<b>1 L = 1000 mL</b> · 1 g = 1000 mg'],
    lab: {
      titulo: 'Soro caseiro no béquer', texto: 'Mais soluto, mais concentrado. Mais água com o mesmo soluto, mais diluído: a quantidade de sal não muda, mas ela se espalha num volume maior.',
      controles: [
        { id: 'm', rotulo: 'Massa de sal (soluto)', min: 0, max: 60, passo: 2, valor: 10, unid: 'g' },
        { id: 'V', rotulo: 'Volume da solução', min: 100, max: 1000, passo: 50, valor: 500, unid: 'mL' }],
      desenhar({ m, V }) {
        const C = m / V * 1000;
        return { svg: bequer(m, V), leitura: [`C = ${num(m)} g ÷ ${num(V / 1000)} L = <b>${num(C, 1)} g/L</b>`, `Em porcentagem: <b>${num(m / V * 100, 1)}%</b> (m/V)`, C > 9 && C < 10 ? 'Perto do soro fisiológico (9 g/L)!' : C > 360 ? 'Passou da solubilidade do sal (~360 g/L): sobra sal no fundo' : 'Soro fisiológico tem 9 g/L de NaCl'] };
      }
    },
    desafios: [
      () => {
        const m = sorteia([5, 10, 18, 20, 45]), V = sorteia([250, 500, 2000]);
        return { hab: 'H17', fig: bequer(m, Math.min(V, 1000), V > 1000 ? `${V} mL (desenho fora de escala)` : ''), enun: `Dissolvem-se ${m} g de sal em água até completar ${V} mL de solução. Qual a concentração em g/L?`,
          certa: num(m / V * 1000) + ' g/L', erradas: [num(m / V) + ' g/L', num(m * V / 1000) + ' g/L', num(V / m) + ' g/L', num(m * 1000 / V / 10) + ' g/L'],
          expl: `Passe o volume para litros: ${f(`${V} mL = ${num(V / 1000)} L`)}. ${f(`C = ${m} ÷ ${num(V / 1000)} = ${num(m / V * 1000)} g/L`)}.` };
      },
      () => {
        const C1 = sorteia([40, 60, 80, 100]), V1 = sorteia([100, 200, 250]), k = sorteia([2, 4, 5]), V2 = V1 * k;
        const pede = sorteia(['C', 'agua']);
        return pede === 'C'
          ? { hab: 'H17', enun: `Um suco concentrado tem ${C1} g/L de açúcar. Pegam-se ${V1} mL e completa-se com água até ${V2} mL. Qual a nova concentração?`,
            certa: num(C1 / k) + ' g/L', erradas: [num(C1 * k) + ' g/L', num(C1) + ' g/L', num(C1 - k) + ' g/L', num(C1 / (k + 1)) + ' g/L'],
            expl: `Na diluição o açúcar não muda: ${f(`C₁·V₁ = C₂·V₂ → ${C1} × ${V1} = C₂ × ${V2}`)}, então ${f(`C₂ = ${num(C1 / k)} g/L`)}. Volume ${k} vezes maior, concentração ${k} vezes menor.` }
          : { hab: 'H17', enun: `Quanto de água é preciso <b>acrescentar</b> a ${V1} mL de uma solução de ${C1} g/L para que ela fique com ${num(C1 / k)} g/L?`,
            certa: num(V2 - V1) + ' mL', erradas: [num(V2) + ' mL', num(V1 * (k + 1)) + ' mL', num(V1 / k) + ' mL', num(V1) + ' mL'],
            expl: `Volume final: ${f(`V₂ = ${C1} × ${V1} ÷ ${num(C1 / k)} = ${V2} mL`)}. Já havia ${V1} mL, então acrescentam-se ${f(`${V2} − ${V1} = ${V2 - V1} mL`)}. Pegadinha: a pergunta é o que acrescentar, não o volume final.` };
      },
      () => {
        const lim = sorteia([[1.5, 'fluoreto'], [0.01, 'chumbo'], [0.001, 'mercúrio'], [10, 'nitrato']]), V = sorteia([2, 5, 10]);
        const fator = sorteia([0.5, 2, 3]), mg = lim[0] * V * fator, ppm = mg / V, ok = ppm <= lim[0];
        return { hab: 'H7', enun: `O limite para ${lim[1]} na água potável é ${num(lim[0], 3)} mg/L (ppm). Uma amostra de ${V} L de água de um poço tem ${num(mg, 4)} mg de ${lim[1]}. O que se conclui?`,
          certa: `${num(ppm, 4)} ppm: ${ok ? 'dentro do limite, pode ser consumida' : 'acima do limite, imprópria para consumo'}`,
          erradas: [`${num(ppm, 4)} ppm: ${ok ? 'acima do limite, imprópria para consumo' : 'dentro do limite, pode ser consumida'}`, `${num(mg, 4)} ppm: ${mg <= lim[0] ? 'dentro do limite' : 'acima do limite'}`, `${num(mg * V, 4)} ppm: acima do limite`, `${num(ppm * 1000, 4)} ppm: acima do limite`],
          expl: `Concentração = ${f(`${num(mg, 4)} mg ÷ ${V} L = ${num(ppm, 4)} mg/L`)}, e mg/L na água é o mesmo que ppm. Comparando com ${num(lim[0], 3)} ppm, ${ok ? 'está dentro' : 'está acima'} do limite.` };
      },
      () => {
        const s = sorteia([36, 40, 20]), agua = sorteia([50, 100, 200]), m = sorteia([10, 30, 50, 80, 100]);
        const max = s * agua / 100, sobra = Math.max(0, m - max);
        const certa = sobra ? `Dissolvem ${num(max)} g e ${num(sobra)} g ficam no fundo (saturada com corpo de fundo)` : m === max ? 'Dissolve tudo e a solução fica exatamente saturada' : 'Dissolve tudo e a solução fica insaturada';
        return { hab: 'H17', enun: `A solubilidade de um sal é ${s} g por 100 g de água, nessa temperatura. Colocam-se ${m} g do sal em ${agua} g de água e agita-se bem. O que acontece?`,
          certa, erradas: ['Dissolve tudo e a solução fica insaturada', `Dissolvem ${num(s)} g e ${num(Math.max(0, m - s))} g ficam no fundo (saturada com corpo de fundo)`, 'Dissolve tudo e a solução fica supersaturada', 'Nada dissolve, pois passou do limite', 'Dissolve tudo e a solução fica exatamente saturada'],
          expl: `Em ${agua} g de água cabem ${f(`${s} × ${agua}/100 = ${num(max)} g`)}. ${sobra ? `Como foram ${m} g, sobram ${num(sobra)} g sem dissolver.` : `Os ${m} g cabem${m === max ? ' exatamente' : ' com folga'}.`}` };
      },
      () => {
        const [mist, met, expl] = sorteia(SEPARA);
        return { hab: 'H19', enun: `Qual o método mais adequado para separar ${mist}?`, certa: met, erradas: ENEM.embaralha(METODOS.filter(x => x !== met)), expl };
      },
      () => {
        const [C1, V1, C2, V2] = sorteia([[20, 200, 50, 300], [10, 100, 40, 200], [30, 500, 90, 250], [60, 100, 20, 300]]), C = (C1 * V1 + C2 * V2) / (V1 + V2);
        return { hab: 'H17', enun: `Misturam-se ${V1} mL de uma solução de glicose a ${C1} g/L com ${V2} mL de outra a ${C2} g/L. Qual a concentração final?`,
          certa: num(C, 1) + ' g/L', erradas: [num((C1 + C2) / 2, 1) + ' g/L', num(C1 + C2, 1) + ' g/L', num((C1 * V2 + C2 * V1) / (V1 + V2), 1) + ' g/L', num(Math.abs(C2 - C1), 1) + ' g/L'],
          expl: `Some as massas de glicose e divida pelo volume total: ${f(`(${C1}·${num(V1 / 1000)} + ${C2}·${num(V2 / 1000)}) ÷ ${num((V1 + V2) / 1000)} = ${num(C, 1)} g/L`)}.` };
      }
    ]
  });
})();
