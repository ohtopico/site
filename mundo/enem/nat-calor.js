/* 🔥 Cozinha do calor: misturas térmicas, Q = m·c·ΔT, propagação do calor, materiais e máquinas térmicas. */
(function () {
  const { sorteia, num, f } = NAT;

  const corT = T => { const t = Math.max(0, Math.min(100, T)) / 100; return `rgb(${Math.round(80 + 175 * t)},${Math.round(150 - 60 * t)},${Math.round(240 - 190 * t)})`; };
  function copo(x, m, T, rot, oculta) {
    const h = 30 + Math.min(m, 1000) / 1000 * 90;
    return `<g><path d="M${x} 40 L${x + 8} 170 H${x + 92} L${x + 100} 40" fill="#fff" stroke="#1d2a1f" stroke-width="3"/>
      <path d="M${x + 8 - 8 * (1 - h / 130)} ${170 - h} L${x + 8} 168 H${x + 92} L${x + 92 + 8 * (1 - h / 130)} ${170 - h} Z" fill="${oculta ? '#9aa6b8' : corT(T)}" opacity=".85"/>
      <text x="${x + 50}" y="192" text-anchor="middle">${rot}</text><text x="${x + 50}" y="${165 - h / 2}" text-anchor="middle" style="fill:#fff;font-size:15px">${oculta ? '?' : num(T, 1)} °C</text>
      <text x="${x + 50}" y="34" text-anchor="middle" class="fino">${num(m)} g</text></g>`;
  }
  const mistura = (m1, T1, m2, T2, oculta) => {
    const Tf = (m1 * T1 + m2 * T2) / (m1 + m2);
    return { Tf, svg: `<svg class="fig" viewBox="0 0 480 200" role="img" aria-label="Mistura de duas porções de água">${copo(10, m1, T1, 'água 1')}<text x="128" y="110" style="font-size:26px">+</text>
      ${copo(150, m2, T2, 'água 2')}<text x="268" y="110" style="font-size:26px">=</text>${copo(330, m1 + m2, Tf, 'mistura', oculta)}</svg>` };
  };

  const PROPAGA = [
    ['O congelador fica na parte de cima da geladeira.', 'Convecção', 'O ar frio, mais denso, desce e o ar quente sobe: forma-se uma corrente de convecção que resfria a geladeira toda.'],
    ['A garrafa térmica tem paredes espelhadas por dentro.', 'Irradiação', 'O espelho reflete a radiação infravermelha de volta, evitando a perda por irradiação. O vácuo entre as paredes corta condução e convecção.'],
    ['O cabo da panela é de madeira ou de plástico.', 'Condução', 'Madeira e plástico conduzem mal o calor (são isolantes), então a mão não se queima por condução.'],
    ['Durante o dia, a brisa sopra do mar para a terra.', 'Convecção', 'A terra esquenta mais rápido, o ar sobre ela sobe e o ar mais frio do mar vem ocupar o lugar: convecção.'],
    ['O calor do Sol chega à Terra atravessando o espaço vazio.', 'Irradiação', 'No vácuo não há matéria para conduzir nem para circular. Só ondas eletromagnéticas passam: irradiação.'],
    ['O ar-condicionado é instalado no alto da parede.', 'Convecção', 'O ar frio que sai lá de cima desce, empurra o ar quente para cima e o ambiente todo se mistura.'],
    ['Encostar a mão numa grade de ferro gelada de manhã dá sensação de frio.', 'Condução', 'O metal conduz bem e tira calor da sua mão depressa. Por isso parece mais frio que a madeira, mesmo estando à mesma temperatura.']
  ];
  const MATERIAIS = [
    ['o fundo de uma panela, para aquecer a comida rápido', 'Cobre ou alumínio (bons condutores)', ['Isopor', 'Madeira', 'Lã']],
    ['a parede de uma caixa térmica para levar gelo à praia', 'Isopor, que tem muito ar preso (isolante)', ['Alumínio', 'Cobre', 'Vidro fino']],
    ['um agasalho para o inverno do Sul', 'Lã, que prende ar entre as fibras', ['Tecido metálico', 'Plástico fino', 'Papel alumínio']],
    ['o telhado de uma casa no sertão, para esquentar menos', 'Telha clara, que reflete mais a radiação do Sol', ['Telha preta, que absorve mais radiação', 'Telha de metal escuro', 'Qualquer cor, a cor não interfere']]
  ];

  NAT.jogo({
    id: 'nat-calor', area: 'fis', icone: '🔥', titulo: 'Cozinha do calor',
    intro: 'Misture água quente com água fria e descubra a temperatura final. Depois enfrente desafios de quantidade de calor, condução, convecção, irradiação, escolha de materiais e máquinas térmicas.',
    habs: ['H21', 'H7', 'H18'],
    cola: ['<b>Q = m · c · ΔT</b><br>água: c = 1 cal/g·°C', '<b>Mistura de águas</b>: T<sub>f</sub> é a média ponderada pelas massas', '<b>Condução</b>: de molécula em molécula (sólidos, metais)',
      '<b>Convecção</b>: correntes em líquidos e gases (quente sobe)', '<b>Irradiação</b>: ondas (infravermelho), passa no vácuo', '<b>Máquina térmica</b>: η = W / Q<sub>quente</sub>, nunca 100% (2ª lei)'],
    lab: {
      titulo: 'Misture as águas', texto: 'O calor passa da água quente para a fria até as duas ficarem com a mesma temperatura (equilíbrio térmico). Quem tem mais massa "puxa" o resultado para o seu lado.',
      controles: [
        { id: 'm1', rotulo: 'Massa da água 1', min: 100, max: 900, passo: 100, valor: 300, unid: 'g' },
        { id: 'T1', rotulo: 'Temperatura da água 1', min: 0, max: 100, passo: 5, valor: 80, unid: '°C' },
        { id: 'm2', rotulo: 'Massa da água 2', min: 100, max: 900, passo: 100, valor: 300, unid: 'g' },
        { id: 'T2', rotulo: 'Temperatura da água 2', min: 0, max: 100, passo: 5, valor: 20, unid: '°C' }],
      desenhar({ m1, T1, m2, T2 }) {
        const r = mistura(m1, T1, m2, T2), Q = m1 * Math.abs(T1 - r.Tf);
        return { svg: r.svg, leitura: [`T<sub>f</sub> = (${m1}·${T1} + ${m2}·${T2}) ÷ ${m1 + m2} = <b>${num(r.Tf, 1)} °C</b>`, `Calor trocado: <b>${num(Q, 0)} cal</b>`, 'O calor que um perde é o calor que o outro ganha.'] };
      }
    },
    desafios: [
      () => {
        const [m1, m2] = sorteia([[200, 200], [100, 300], [300, 100], [200, 600], [400, 100]]), T1 = sorteia([80, 90, 100]), T2 = sorteia([10, 20, 30]);
        const r = mistura(m1, T1, m2, T2, true);
        return { hab: 'H21', fig: r.svg, figDepois: mistura(m1, T1, m2, T2).svg, enun: `Para o banho do bebê, misturam-se ${m1} g de água a ${T1} °C com ${m2} g de água a ${T2} °C. Sem perdas para o ambiente, qual a temperatura final?`,
          certa: num(r.Tf, 1) + ' °C', erradas: [num((T1 + T2) / 2, 1) + ' °C', num((m2 * T1 + m1 * T2) / (m1 + m2), 1) + ' °C', num(T1 - T2, 1) + ' °C', num(T1 + T2, 1) + ' °C', num(r.Tf + 10, 1) + ' °C', num(Math.abs(m1 * T1 - m2 * T2) / (m1 + m2), 1) + ' °C'],
          expl: `Média ponderada pelas massas: ${f(`(${m1}·${T1} + ${m2}·${T2}) ÷ (${m1} + ${m2}) = ${num(r.Tf, 1)} °C`)}. Só é a média simples quando as massas são iguais.` };
      },
      () => {
        const m = sorteia([200, 500, 1000, 2000]), dT = sorteia([20, 30, 50, 80]);
        return { hab: 'H21', enun: `Quanto calor é preciso para aquecer ${m} g de água de 20 °C para ${20 + dT} °C? (c = 1 cal/g·°C)`,
          certa: num(m * dT / 1000) + ' kcal', erradas: [num(m * (20 + dT) / 1000) + ' kcal', num(m / dT / 1000, 3) + ' kcal', num(m * dT) + ' kcal', num(dT / 1000 * 1, 3) + ' kcal'],
          expl: `${f(`Q = m·c·ΔT = ${m} × 1 × ${dT} = ${num(m * dT)} cal = ${num(m * dT / 1000)} kcal`)}. Atenção: ΔT é a <b>variação</b> (${dT} °C), não a temperatura final.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(PROPAGA);
        return { hab: 'H21', enun: sit + ' Qual processo de propagação do calor explica isso?', certa: cert, erradas: ['Condução', 'Convecção', 'Irradiação', 'Dilatação'].filter(x => x !== cert), expl };
      },
      () => {
        const [uso, cert, err] = sorteia(MATERIAIS);
        return { hab: 'H7', enun: `Qual material é mais indicado para ${uso}?`, certa: cert, erradas: err,
          expl: 'Bom condutor (metais) leva o calor depressa; isolante (ar preso no isopor, na lã, madeira, plástico) segura o calor. Cores claras refletem a radiação; escuras absorvem.' };
      },
      () => {
        const Q = sorteia([1000, 2000, 4000, 5000]), r = sorteia([20, 25, 30, 40]), W = Q * r / 100;
        return { hab: 'H21', enun: `O motor de um carro recebe ${num(Q)} J da queima do combustível e realiza ${num(W)} J de trabalho. Qual o rendimento e para onde vai o resto?`,
          certa: `${r}%; o resto sai como calor pelo escapamento e pelo radiador`, erradas: [`${100 - r}%; o resto sai como calor`, `${r}%; o resto é destruído na combustão`, '100%; toda a energia vira movimento', `${r}%; o resto volta para o tanque`],
          expl: `${f(`η = W / Q = ${num(W)} / ${num(Q)} = ${r}%`)}. Pela 2ª lei da termodinâmica nenhuma máquina térmica transforma todo o calor em trabalho; a energia não some, sai como calor para a fonte fria.` };
      },
      () => {
        const q = sorteia([
          ['Por que a panela de pressão cozinha mais rápido?', 'A pressão maior aumenta a temperatura de ebulição da água, que passa de 100 °C', ['A água ferve a uma temperatura menor', 'A pressão cria calor sozinha', 'O vapor escapa mais rápido'], 'Mais pressão, maior temperatura de ebulição (cerca de 120 °C). No alto de uma montanha é o contrário: a água ferve abaixo de 100 °C e o feijão demora.'],
          ['Por que os trilhos de trem têm pequenos espaços entre as barras?', 'Para que o metal possa dilatar no calor sem entortar', ['Para escoar a água da chuva', 'Para economizar ferro', 'Para o trem fazer barulho e avisar que vem'], 'Os sólidos <b>dilatam</b> quando aquecem. Sem a folga, os trilhos se empurrariam e empenariam num dia quente.'],
          ['Uma tampa de metal emperrada no vidro solta mais fácil depois de passar água quente nela porque…', 'o metal dilata mais que o vidro', ['o vidro dilata mais que o metal', 'a água quente lubrifica a rosca', 'o metal contrai com o calor'], 'Cada material dilata de um jeito (coeficiente de dilatação). O metal dilata mais que o vidro e a tampa "folga".'],
          ['Na geladeira, o gás refrigerante retira calor de dentro e joga para fora. Para isso…', 'é preciso gastar energia elétrica no compressor', ['não é preciso energia, o calor vai sozinho do frio para o quente', 'o gás cria frio', 'a geladeira destrói o calor'], 'O calor só vai sozinho do quente para o frio. Para levar do frio para o quente, a geladeira gasta trabalho (2ª lei da termodinâmica). Por isso a grade atrás esquenta.']]);
        return { hab: 'H18', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      }
    ]
  });
})();
