/* 🧪 Laboratório de biotecnologia: PCR, teste de paternidade por DNA, transgênicos, clonagem, fermentação e ética. */
(function () {
  const { sorteia, num, f } = NAT;

  // gel de eletroforese: colunas com bandas em posições (0 a 9)
  function gel(colunas) {
    const w = 380 / colunas.length;
    return `<svg class="fig" viewBox="0 0 480 240" role="img" aria-label="Gel de eletroforese de DNA">
      <rect x="40" y="20" width="400" height="200" rx="10" fill="#2a3550"/>
      ${colunas.map(([rot, bandas], k) => { const x = 50 + k * w + w / 2;
        return `<rect x="${x - w * .32}" y="26" width="${w * .64}" height="8" fill="#11182a"/>${bandas.map(b => `<rect x="${x - w * .3}" y="${48 + b * 17}" width="${w * .6}" height="7" rx="3" fill="#9fe3dc"/>`).join('')}
          <text x="${x}" y="236" text-anchor="middle" style="font-size:12.5px">${rot}</text>`; }).join('')}
      <text x="20" y="40" class="fino" style="font-size:11px">−</text><text x="20" y="214" class="fino" style="font-size:11px">+</text></svg>`;
  }
  function paternidade() {
    const pos = ENEM.embaralha([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const mae = [pos[0], pos[1], pos[2]], pai = [pos[3], pos[4], pos[5]];
    const filho = [mae[0], mae[1], pai[0], pai[1]];
    const s1 = [pos[6], pos[7], pai[2]], s2 = [pos[8], pai[0], pos[9]];  // suspeitos falsos: compartilham só uma banda ou nenhuma do filho
    const suspeitos = ENEM.embaralha([['real', pai], ['f1', s1], ['f2', s2]]);
    const nomes = ['Suspeito 1', 'Suspeito 2', 'Suspeito 3'];
    const certo = nomes[suspeitos.findIndex(s => s[0] === 'real')];
    return { fig: gel([['Mãe', mae], ['Criança', filho], ...suspeitos.map((s, k) => [nomes[k].replace('Suspeito ', 'S'), s[1]])]), certo, nomes };
  }

  const TECN = [
    ['Inserir no DNA de uma bactéria o gene humano da insulina para que ela produza o hormônio em grande escala.', 'DNA recombinante (organismo transgênico)'],
    ['Transferir o núcleo de uma célula da pele para um óvulo sem núcleo e obter um animal geneticamente igual ao doador, como a ovelha Dolly.', 'Clonagem reprodutiva'],
    ['Usar células capazes de se transformar em vários tecidos para regenerar a medula de um paciente.', 'Terapia com células-tronco'],
    ['Corrigir um gene defeituoso em células de um paciente, inserindo uma cópia funcional por meio de um vírus modificado.', 'Terapia gênica'],
    ['Multiplicar milhões de vezes um pequeno trecho de DNA encontrado na cena de um crime.', 'PCR (reação em cadeia da polimerase)'],
    ['Separar fragmentos de DNA pelo tamanho num gel com corrente elétrica para comparar pessoas.', 'Eletroforese (impressão digital do DNA)']
  ];
  const USOS = [
    ['Fazer o pão crescer', 'Fungos (leveduras) que fermentam o açúcar e liberam CO₂'], ['Produzir iogurte e coalhada', 'Bactérias que transformam a lactose em ácido láctico'],
    ['Produzir etanol da cana-de-açúcar', 'Leveduras que fermentam a sacarose e liberam etanol e CO₂'], ['Limpar uma área contaminada por petróleo', 'Bactérias que degradam hidrocarbonetos (biorremediação)'],
    ['Controlar a lagarta da soja sem agrotóxico', 'Bactéria Bacillus thuringiensis ou vírus que atacam só a praga (controle biológico)'], ['Produzir antibiótico como a penicilina', 'Fungos do gênero Penicillium']
  ];

  NAT.jogo({
    id: 'nat-biotec', area: 'bio', icone: '🔬', titulo: 'Laboratório de biotecnologia',
    intro: 'Rode ciclos de PCR e veja uma única molécula de DNA virar bilhões. Depois resolva testes de paternidade no gel, identifique técnicas como transgenia, clonagem e células-tronco, e discuta benefícios e limites, como o ENEM cobra.',
    habs: ['H11', 'H29', 'H2'],
    cola: ['<b>PCR</b>: cada ciclo dobra o DNA<br>cópias = 2ⁿ', '<b>Paternidade</b>: cada banda da criança veio da mãe <b>ou</b> do pai', '<b>Transgênico</b>: recebeu gene de outra espécie',
      '<b>Clone</b>: mesmo DNA nuclear do doador', '<b>Células-tronco</b>: viram vários tecidos (embrionárias são as mais versáteis)', '<b>Fermentação</b>: sem O₂ · alcoólica (pão, etanol) · láctica (iogurte)'],
    lab: {
      titulo: 'Máquina de PCR', texto: 'Cada ciclo tem três etapas: aquecer (as fitas se separam), esfriar (os primers se encaixam) e a enzima polimerase copiar. Ao final de cada ciclo, o número de moléculas dobra.',
      controles: [
        { id: 'n', rotulo: 'Ciclos de PCR', min: 0, max: 30, passo: 1, valor: 5, unid: 'ciclos' },
        { id: 'm', rotulo: 'Moléculas de DNA no começo', min: 1, max: 10, passo: 1, valor: 1, unid: '' }],
      desenhar({ n, m }) {
        const tot = m * 2 ** n, mostra = Math.min(64, m * 2 ** Math.min(n, 6));
        let s = '';
        for (let k = 0; k < mostra; k++) { const x = 20 + (k % 16) * 28, y = 30 + Math.floor(k / 16) * 40;
          s += `<path d="M${x} ${y} q5 -8 10 0 t10 0" stroke="#e07bb0" stroke-width="3" fill="none"/><path d="M${x} ${y + 8} q5 -8 10 0 t10 0" stroke="#3f8fe0" stroke-width="3" fill="none"/>`; }
        return { svg: `<svg class="fig" viewBox="0 0 480 200" role="img" aria-label="${num(tot)} moléculas de DNA">${s}${tot > mostra ? `<text x="240" y="194" text-anchor="middle" class="fino">desenho mostra ${mostra} de ${num(tot)} moléculas</text>` : ''}</svg>`,
          leitura: [`${m} × 2<sup>${n}</sup> = <b>${num(tot)}</b> moléculas`, n >= 30 ? 'Mais de 1 bilhão: o suficiente para um exame de DNA ou um teste de covid.' : 'Com cerca de 30 ciclos já passa de 1 bilhão.'] };
      }
    },
    desafios: [
      () => {
        const t = paternidade();
        return { hab: 'H29', fig: t.fig, enun: 'O gel mostra o DNA da mãe, da criança e de três suspeitos de paternidade (S1, S2 e S3). Quem é o pai biológico?', certa: t.certo, erradas: t.nomes.filter(x => x !== t.certo).concat(['Não dá para saber sem o DNA dos avós']),
          expl: 'Primeiro risque as bandas da criança que batem com a mãe. As que sobram <b>têm</b> de vir do pai: o pai biológico é o único que tem todas elas.' };
      },
      () => {
        const n = sorteia([3, 5, 10, 20]), m = sorteia([1, 2, 5]);
        return { hab: 'H29', enun: `Uma amostra com ${m} molécula(s) de DNA passa por ${n} ciclos de PCR. Quantas moléculas se obtêm, em teoria?`,
          certa: num(m * 2 ** n), erradas: [num(m * 2 * n), num(m * n * n), num(m + 2 ** n), num(m * 2 ** (n - 1))],
          expl: `Cada ciclo dobra: ${f(`${m} × 2^${n} = ${num(m * 2 ** n)}`)}. Crescimento exponencial: por isso poucas células bastam para o exame.` };
      },
      () => {
        const [sit, cert] = sorteia(TECN);
        return { hab: 'H11', enun: sit + ' Que técnica é essa?', certa: cert, erradas: TECN.map(t => t[1]).filter(x => x !== cert), expl: `${cert}. ${cert.startsWith('DNA') ? 'Antes, a insulina vinha do pâncreas de porcos e bois; hoje bactérias transgênicas produzem insulina humana.' : cert.startsWith('Clonagem') ? 'O clone tem o DNA do núcleo do doador; o DNA mitocondrial vem do óvulo.' : 'A biotecnologia usa processos biológicos para resolver problemas de saúde, alimentação e ambiente.'}` };
      },
      () => {
        const [uso, cert] = sorteia(USOS);
        return { hab: 'H29', enun: `Qual organismo ou processo é usado para: ${uso.toLowerCase()}?`, certa: cert, erradas: USOS.map(u => u[1]).filter(x => x !== cert), expl: `${cert}. Microrganismos são "fábricas" usadas há milênios (pão, vinho, queijo) e hoje também para remédios, combustíveis e limpeza ambiental.` };
      },
      () => {
        const q = sorteia([
          ['Um risco ambiental apontado no cultivo de plantas transgênicas resistentes a insetos é…', 'o surgimento de insetos resistentes e a passagem do gene para plantas silvestres aparentadas', ['a planta transgênica deixar o consumidor transgênico', 'a planta passar a fazer quimiossíntese', 'o fim de todas as pragas do planeta'], 'Comer DNA não altera o seu DNA. Os riscos discutidos são ecológicos (fluxo gênico, insetos resistentes, efeito em polinizadores) e econômicos (dependência de sementes patenteadas).'],
          ['Qual é uma limitação ética da clonagem e do uso de células-tronco embrionárias?', 'O uso e o descarte de embriões humanos, além da proibição da clonagem reprodutiva humana', ['Clones nascem sempre com outra espécie', 'Células-tronco só viram células da pele', 'Clones têm DNA diferente do doador'], 'No Brasil, a Lei de Biossegurança permite pesquisa com embriões congelados descartados, com autorização, e proíbe a clonagem humana.'],
          ['As vacinas de RNA mensageiro, usadas na covid-19, funcionam porque…', 'as células leem o RNA e produzem uma proteína do vírus, que treina o sistema imune', ['o RNA se integra ao DNA da pessoa e muda os genes', 'o RNA contém o vírus vivo enfraquecido', 'o RNA é um antibiótico contra o vírus'], 'O mRNA fica no citoplasma, não entra no núcleo e é degradado em poucos dias. A proteína produzida (a espícula) é o antígeno que gera anticorpos e memória.']]);
        return { hab: sorteia(['H11', 'H2']), enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      },
      () => ({ hab: 'H2', enun: 'Antes dos anos 1980, pessoas com diabetes usavam insulina extraída do pâncreas de bois e porcos. Que avanço permitiu produzir insulina humana em grande escala e com menos reações alérgicas?',
        certa: 'A engenharia genética, inserindo o gene humano da insulina em bactérias', erradas: ['A clonagem de pessoas com pâncreas saudável', 'A vacina contra o diabetes', 'A seleção artificial de porcos com mais insulina', 'A destilação fracionada do sangue'],
        expl: 'Corta-se o gene humano com enzimas de restrição, cola-se num plasmídeo e coloca-se na bactéria, que se multiplica e produz a proteína. É o exemplo clássico de ciência resolvendo um problema de saúde.' })
    ]
  });
})();
