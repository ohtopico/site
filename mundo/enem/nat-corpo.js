/* 🩺 Corpo em equilíbrio: glicemia e insulina, hormônios, vacina x soro, doenças e prevenção, digestão. */
(function () {
  const { sorteia, num } = NAT;

  // glicemia (mg/dL) ao longo de 5 h depois de uma refeição; insulina baixa = pico maior e volta lenta
  const glic = (t, carb, ins) => { const tau = 0.45 + (1 - ins / 100) * 1.6, pico = carb * (0.55 + (1 - ins / 100) * 1.6), base = 85 + (1 - ins / 100) * 45; return base + pico * (t / tau) * Math.exp(1 - t / tau); };
  function grafGlic(series) {
    const X = t => 60 + t / 5 * 400, Y = g => 190 - (g - 50) / 250 * 170;
    const linhas = series.map(([fn, cor, rot]) => { const pts = []; for (let k = 0; k <= 50; k++) { const t = k / 10; pts.push(`${X(t).toFixed(1)},${Y(Math.min(300, fn(t))).toFixed(1)}`); }
      const [tx, ty] = pts[14].split(','); return `<polyline points="${pts.join(' ')}" fill="none" stroke="${cor}" stroke-width="4" stroke-linecap="round"/>${rot ? `<text x="${+tx + 6}" y="${+ty - 8}" style="fill:${cor};font-size:15px">${rot}</text>` : ''}`; }).join('');
    return `<svg class="fig" viewBox="0 0 480 220" role="img" aria-label="Glicemia depois de uma refeição">
      <rect x="60" y="${Y(140)}" width="400" height="${Y(70) - Y(140)}" fill="#d8f5dc"/><text x="456" y="${Y(140) + 14}" text-anchor="end" class="fino" style="font-size:11px">faixa normal (70–140)</text>
      <path d="M60 15 V190 H462" stroke="#1d2a1f" stroke-width="2" fill="none"/>
      ${[100, 200, 300].map(g => `<text x="54" y="${Y(g) + 4}" text-anchor="end" class="fino" style="font-size:11px">${g}</text>`).join('')}
      ${[0, 1, 2, 3, 4, 5].map(t => `<text x="${X(t)}" y="206" text-anchor="middle" class="fino" style="font-size:11px">${t} h</text>`).join('')}
      <text x="14" y="12" style="font-size:11px">mg/dL</text><text x="${X(0) + 4}" y="186" style="font-size:16px">🍝</text>${linhas}</svg>`;
  }

  const VS = [
    ['Uma pessoa foi picada por uma jararaca e precisa de tratamento imediato.', 'Soro antiofídico: anticorpos prontos, ação imediata e sem memória', 'O soro traz anticorpos produzidos por outro animal (cavalo). Age na hora, mas não deixa memória: é imunidade passiva.'],
    ['O posto de saúde quer proteger as crianças contra o sarampo pelos próximos anos.', 'Vacina: antígenos que fazem o corpo produzir anticorpos e células de memória', 'A vacina ensina o sistema imune: ele produz seus próprios anticorpos e guarda memória. É imunidade ativa e preventiva.'],
    ['Um trabalhador pisou num prego enferrujado, nunca tomou a vacina antitetânica e já está com sintomas.', 'Soro antitetânico: anticorpos prontos, ação imediata e sem memória', 'Com a doença já em curso, não dá para esperar o corpo produzir anticorpos: o soro neutraliza a toxina na hora. Depois, ele deve se vacinar.'],
    ['Durante a pandemia, a meta era reduzir os casos graves de covid-19 em toda a população.', 'Vacina: antígenos que fazem o corpo produzir anticorpos e células de memória', 'A vacinação em massa cria memória imunológica e reduz a circulação do vírus (imunidade coletiva).']
  ];
  const HORM = [
    ['Depois de um almoço com muito arroz, a glicose do sangue sobe. Qual hormônio, produzido no pâncreas, faz as células absorverem a glicose?', 'Insulina'],
    ['Depois de horas em jejum, a glicose do sangue cai. Qual hormônio do pâncreas manda o fígado liberar glicose?', 'Glucagon'],
    ['Num dia quente e sem beber água, a urina fica escura e em pouca quantidade. Qual hormônio faz o rim reabsorver mais água?', 'ADH (hormônio antidiurético)'],
    ['Num susto, o coração dispara, a respiração acelera e a glicose sobe. Qual hormônio, das suprarrenais, causa isso?', 'Adrenalina'],
    ['Na hora do parto, as contrações do útero ficam fortes e o leite começa a ser ejetado. Qual hormônio atua nisso?', 'Ocitocina'],
    ['No ciclo menstrual, um pico de um hormônio da hipófise provoca a ovulação. Qual é?', 'LH (hormônio luteinizante)']
  ];
  const TODOS_H = HORM.map(h => h[1]).concat(['Tiroxina', 'Testosterona']);
  const DOENCAS = [
    ['Dengue', 'Mosquito Aedes aegypti', 'Eliminar recipientes com água parada'], ['Malária', 'Mosquito Anopheles', 'Usar mosquiteiros e repelentes nas áreas de risco'],
    ['Doença de Chagas', 'Fezes do barbeiro e alimentos contaminados (caldo de cana, açaí)', 'Trocar casas de pau a pique por alvenaria e higienizar alimentos'], ['Esquistossomose', 'Larvas que saem de caramujos em água doce contaminada por fezes', 'Saneamento básico e não entrar em água parada suspeita'],
    ['Leptospirose', 'Urina de ratos na água de enchentes', 'Controlar ratos e evitar contato com água de enchente'], ['Tétano', 'Bactéria do solo que entra por ferimentos', 'Vacina antitetânica em dia'],
    ['Teníase', 'Carne de porco ou de boi crua ou malpassada com cisticercos', 'Cozinhar bem a carne e fiscalizar abatedouros'], ['HPV', 'Relação sexual sem proteção', 'Vacina contra o HPV e uso de preservativo']
  ];
  const DIGEST = [
    ['Na boca, começa a digestão do amido do pão. Qual enzima atua?', 'Amilase salivar (ptialina)'], ['No estômago, em meio ácido, começa a digestão das proteínas da carne. Qual enzima atua?', 'Pepsina'],
    ['A gordura da comida precisa ser "quebrada" em gotinhas antes de ser digerida. Quem faz essa emulsificação, sem ser enzima?', 'Bile, produzida no fígado'], ['No intestino delgado, as gorduras são digeridas por qual enzima do pâncreas?', 'Lipase pancreática']
  ];

  NAT.jogo({
    id: 'nat-corpo', area: 'bio', icone: '🩺', titulo: 'Corpo em equilíbrio',
    intro: 'Coma um prato de macarrão e acompanhe a glicose no sangue. Diminua a ação da insulina e veja a curva de uma pessoa com diabetes. Depois desafios de hormônios, vacina ou soro, prevenção de doenças e digestão.',
    habs: ['H14', 'H19', 'H30'],
    cola: ['<b>Insulina</b> baixa a glicose · <b>glucagon</b> sobe', '<b>Diabetes tipo 1</b>: não produz insulina<br><b>Tipo 2</b>: células resistentes à insulina', '<b>Vacina</b>: antígeno, ativa, previne, tem memória',
      '<b>Soro</b>: anticorpos prontos, passiva, trata, sem memória', '<b>Saneamento</b> previne esquistossomose, cólera, hepatite A, leptospirose', '<b>Mosquito</b>: dengue, zika, chikungunya, malária, febre amarela'],
    lab: {
      titulo: 'Glicemia depois do almoço', texto: 'A refeição faz a glicose subir. O pâncreas libera insulina e, em cerca de 2 horas, a glicose volta à faixa normal. Com pouca insulina (ou células resistentes), o pico é alto e demorado.',
      controles: [
        { id: 'c', rotulo: 'Carboidrato na refeição', min: 20, max: 120, passo: 10, valor: 60, unid: 'g' },
        { id: 'i', rotulo: 'Ação da insulina', min: 0, max: 100, passo: 10, valor: 100, unid: '%' }],
      desenhar({ c, i }) {
        const pico = Math.max(...Array.from({ length: 51 }, (_, k) => glic(k / 10, c, i))), g2 = glic(2, c, i);
        return { svg: grafGlic([[t => glic(t, c, 100), '#7c8a7e', i < 100 ? 'saudável' : ''], [t => glic(t, c, i), '#e85c4a', i < 100 ? 'você' : '']]),
          leitura: [`Pico: <b>${num(pico, 0)} mg/dL</b>`, `Duas horas depois: <b>${num(g2, 0)} mg/dL</b> ${g2 >= 200 ? '(acima de 200: sinal de diabetes)' : g2 > 140 ? '(acima do normal)' : '(normal)'}`, i < 60 ? 'Glicose alta por muito tempo lesa vasos, rins, olhos e nervos.' : 'A insulina faz músculo, fígado e gordura absorverem a glicose.'] };
      }
    },
    desafios: [
      () => {
        const ruim = sorteia(['A', 'B']), boa = ruim === 'A' ? 'B' : 'A', ins = sorteia([10, 30]);
        const ser = { [ruim]: t => glic(t, 70, ins), [boa]: t => glic(t, 70, 100) };
        return { hab: 'H14', fig: grafGlic([[ser.A, '#3f8fe0', 'A'], [ser.B, '#e85c4a', 'B']]), enun: 'O gráfico mostra a glicemia de duas pessoas depois da mesma refeição. O que melhor explica a curva da pessoa ' + ruim + '?',
          certa: 'Produção ou ação da insulina deficiente, como no diabetes', erradas: ['Excesso de insulina', 'Excesso de glucagon por estar em jejum', 'Comeu mais carboidrato que a outra pessoa', 'Funcionamento normal do pâncreas'],
          expl: `A pessoa ${ruim} começa mais alta, sobe muito e demora a voltar. É o padrão do diabetes: sem insulina suficiente, a glicose não entra nas células. A pessoa ${boa} volta à faixa normal em cerca de 2 h.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(VS);
        return { hab: 'H19', enun: sit + ' O que deve ser usado?', certa: cert, erradas: ['Soro antiofídico: anticorpos prontos, ação imediata e sem memória', 'Vacina: antígenos que fazem o corpo produzir anticorpos e células de memória', 'Antibiótico, que mata vírus e toxinas', 'Vacina, porque age em poucos minutos'].filter(x => x !== cert && !(cert.startsWith('Soro') && x.startsWith('Soro'))), expl };
      },
      () => {
        const [sit, cert] = sorteia(HORM);
        return { hab: 'H14', enun: sit, certa: cert, erradas: ENEM.embaralha(TODOS_H.filter(x => x !== cert)),
          expl: `${cert}. Os hormônios mantêm a <b>homeostase</b> (equilíbrio interno) com retroalimentação: quando a variável volta ao normal, a produção diminui.` };
      },
      () => {
        const [d, trans, prev] = sorteia(DOENCAS), pede = sorteia(['trans', 'prev']);
        return pede === 'trans'
          ? { hab: 'H30', enun: `Doença: <b>${d}</b>. Como ela é transmitida?`, certa: trans, erradas: ENEM.embaralha(DOENCAS.filter(x => x[0] !== d)).map(x => x[1]), expl: `${d}: ${trans.toLowerCase()}. Prevenção: ${prev.toLowerCase()}.` }
          : { hab: 'H30', enun: `Doença: <b>${d}</b>. Qual medida é a mais eficaz para preveni-la?`, certa: prev, erradas: ENEM.embaralha(DOENCAS.filter(x => x[0] !== d)).map(x => x[2]), expl: `${d}, transmissão: ${trans.toLowerCase()}. Por isso a prevenção é: ${prev.toLowerCase()}.` };
      },
      () => {
        const [sit, cert] = sorteia(DIGEST);
        return { hab: 'H14', enun: sit, certa: cert, erradas: DIGEST.map(x => x[1]).filter(x => x !== cert).concat(['Insulina']),
          expl: 'Boca: amilase (amido). Estômago: pepsina (proteína, meio ácido). Fígado: bile (emulsiona gordura, não é enzima). Pâncreas: lipase, amilase e tripsina no intestino delgado, onde os nutrientes são absorvidos.' };
      },
      () => {
        const q = sorteia([
          ['Por que antibióticos não servem para tratar gripe e resfriado?', 'Porque essas doenças são causadas por vírus, e antibióticos agem em bactérias', ['Porque o vírus é grande demais para o remédio', 'Porque o antibiótico só funciona em crianças', 'Porque a gripe é causada por fungos'], 'Antibiótico ataca estruturas de bactérias (parede celular, ribossomo). Vírus não têm essas estruturas. Usar sem necessidade seleciona bactérias resistentes.'],
          ['Uma pílula anticoncepcional combinada evita a gravidez principalmente porque…', 'seus hormônios inibem a liberação de FSH e LH pela hipófise e impedem a ovulação', ['mata os espermatozoides', 'impede a menstruação para sempre', 'protege contra infecções sexualmente transmissíveis'], 'Estrogênio e progesterona sintéticos "enganam" a hipófise, que para de liberar FSH e LH. Sem pico de LH, não há ovulação. Ela não protege contra IST: só o preservativo protege.']]);
        return { hab: 'H19', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      }
    ]
  });
})();
