/* 🦋 Seleção natural: simulador das mariposas, Lamarck x Darwin, resistência a antibióticos, evidências e biomas brasileiros. */
(function () {
  const { sorteia, num } = NAT;

  // frequência de mariposas escuras depois de g gerações, com tronco de escuridão e (0 a 100)
  function evolui(p0, e, g) {
    const wE = 0.55 + 0.45 * e / 100, wC = 1 - 0.45 * e / 100, hist = [p0];
    let p = p0;
    for (let k = 0; k < g; k++) { p = p * wE / (p * wE + (1 - p) * wC); hist.push(p); }
    return hist;
  }
  function cena(p, e, hist) {
    const tronco = `rgb(${Math.round(220 - 170 * e / 100)},${Math.round(205 - 165 * e / 100)},${Math.round(180 - 150 * e / 100)})`;
    const n = 30, esc = Math.round(p * n); let ms = '';
    const pos = Array.from({ length: n }, (_, k) => [30 + (k * 53) % 170, 25 + (k * 37) % 160]);
    pos.forEach(([x, y], k) => { const cor = k < esc ? '#2b2b2b' : '#efe8d6';
      ms += `<g transform="translate(${x} ${y}) scale(1.5)"><path d="M0 0 C-12 -10 -16 6 -2 6 Z M0 0 C12 -10 16 6 2 6 Z" fill="${cor}" stroke="#7c8a7e" stroke-width="1"/><rect x="-1.5" y="-4" width="3" height="11" rx="1.5" fill="#5a3a1a"/></g>`; });
    const X = g => 270 + g / (hist.length - 1 || 1) * 190, Y = q => 190 - q * 160;
    const curva = hist.map((q, g) => `${X(g).toFixed(1)},${Y(q).toFixed(1)}`).join(' ');
    return `<svg class="fig" viewBox="0 0 480 220" role="img" aria-label="Mariposas claras e escuras num tronco">
      <rect x="14" y="10" width="220" height="190" rx="14" fill="${tronco}" stroke="#1d2a1f" stroke-width="2"/>${ms}
      <path d="M270 25 V190 H462" stroke="#1d2a1f" stroke-width="2" fill="none"/><text x="266" y="34" text-anchor="end" class="fino" style="font-size:11px">100%</text><text x="266" y="194" text-anchor="end" class="fino" style="font-size:11px">0</text>
      <polyline points="${curva}" fill="none" stroke="#2b2b2b" stroke-width="3.5"/><text x="462" y="210" text-anchor="end" class="fino" style="font-size:11px">gerações</text>
      <text x="300" y="20" class="fino" style="font-size:12px">% de mariposas escuras</text></svg>`;
  }

  const BIOMAS = [
    ['Plantas com folhas transformadas em espinhos, caules que guardam água e árvores que perdem as folhas na seca', 'Caatinga'],
    ['Árvores de troncos tortuosos e casca grossa, que resistem ao fogo, e raízes muito profundas para alcançar água', 'Cerrado'],
    ['Floresta densa de folhas largas, solo pobre e nutrientes reciclados rapidamente pela decomposição da serapilheira', 'Amazônia'],
    ['Raízes que saem do solo lamacento para respirar (pneumatóforos) e plantas que toleram água salobra', 'Manguezal'],
    ['Planície que fica alagada parte do ano, com grande concentração de aves e jacarés', 'Pantanal'],
    ['Campos de gramíneas no extremo sul, com relevo suave, usados há séculos na pecuária', 'Pampa'],
    ['Floresta costeira úmida, com muitas espécies endêmicas, que já perdeu cerca de 88% da área original', 'Mata Atlântica']
  ];
  const TEORIAS = [
    ['As girafas esticavam o pescoço para alcançar folhas altas, o pescoço cresceu e elas passaram esse pescoço comprido para os filhos.', 'Lamarck: uso e desuso e herança dos caracteres adquiridos'],
    ['Entre as girafas já havia variação no pescoço; as de pescoço maior comiam melhor e deixavam mais filhos.', 'Darwin: seleção natural sobre variações que já existiam'],
    ['Um halterofilista desenvolve músculos e espera que seu filho nasça musculoso.', 'Lamarck: uso e desuso e herança dos caracteres adquiridos'],
    ['Peixes de cavernas escuras perderam os olhos porque não os usavam.', 'Lamarck: uso e desuso e herança dos caracteres adquiridos'],
    ['Mutações e recombinação geram variação; a seleção natural escolhe as mais adaptadas ao ambiente.', 'Teoria sintética (neodarwinismo)']
  ];
  const TEO = [...new Set(TEORIAS.map(t => t[1]))].concat(['Criacionismo: as espécies são fixas e imutáveis']);

  NAT.jogo({
    id: 'nat-evolucao', area: 'bio', icone: '🦋', titulo: 'Seleção natural',
    intro: 'Na Inglaterra industrial, a fuligem escureceu os troncos e as mariposas escuras ficaram mais comuns. Escureça o tronco, avance as gerações e veja a seleção natural agir. Depois desafios de Lamarck x Darwin, resistência a antibióticos e biomas brasileiros.',
    habs: ['H16', 'H3', 'H28'],
    cola: ['<b>Lamarck</b>: uso e desuso + herança do adquirido (não aceita hoje)', '<b>Darwin</b>: variação já existe → ambiente seleciona → mais aptos deixam mais filhos', '<b>Neodarwinismo</b>: mutação + recombinação + seleção',
      '<b>Antibiótico</b> não cria resistência: <b>seleciona</b> as bactérias já resistentes', '<b>Homólogos</b>: mesma origem (braço e asa de morcego)<br><b>Análogos</b>: mesma função (asa de ave e de inseto)', '<b>Especiação</b>: isolamento geográfico → isolamento reprodutivo'],
    lab: {
      titulo: 'As mariposas de Manchester', texto: 'Os pássaros comem as mariposas que eles enxergam. No tronco claro, as escuras chamam atenção; no tronco escuro, as claras. Nenhuma mariposa muda de cor: o que muda é quantas de cada cor sobrevivem e se reproduzem.',
      controles: [
        { id: 'e', rotulo: 'Escuridão do tronco (fuligem)', min: 0, max: 100, passo: 10, valor: 80, unid: '%' },
        { id: 'g', rotulo: 'Gerações que passaram', min: 0, max: 30, passo: 1, valor: 10, unid: '' },
        { id: 'p', rotulo: 'Escuras no começo', min: 2, max: 50, passo: 2, valor: 4, unid: '%' }],
      desenhar({ e, g, p }) {
        const h = evolui(p / 100, e, g), q = h[h.length - 1];
        return { svg: cena(q, e, h), leitura: [`Mariposas escuras: <b>${num(q * 100, 0)}%</b> depois de ${g} gerações`, e > 50 ? 'Tronco escuro: as escuras ficam camufladas e sobrevivem mais.' : e < 50 ? 'Tronco claro: as claras ficam camufladas.' : 'Tronco médio: nenhuma cor leva vantagem.', 'O ambiente não "cria" a cor: ele seleciona as variações que já existiam.'] };
      }
    },
    desafios: [
      () => {
        const [sit, cert] = sorteia(TEORIAS);
        return { hab: 'H3', enun: `"${sit}" Essa explicação está de acordo com qual ideia sobre a evolução?`, certa: cert, erradas: TEO.filter(x => x !== cert),
          expl: cert.startsWith('Lamarck') ? 'Característica adquirida em vida (músculo, pescoço esticado, olho atrofiado) <b>não</b> passa para os filhos, porque não altera o DNA dos gametas. Essa ideia foi descartada, mas aparece muito no senso comum.' : 'A variação vem antes; o ambiente só seleciona. Essa é a base da biologia evolutiva atual.' };
      },
      () => ({ hab: 'H16', enun: 'O uso exagerado de antibióticos fez surgir "superbactérias" nos hospitais. A explicação correta é:',
        certa: 'O antibiótico matou as bactérias sensíveis e as poucas já resistentes sobreviveram e se multiplicaram',
        erradas: ['O antibiótico fez as bactérias criarem resistência para se defender', 'As bactérias se acostumaram ao remédio com o tempo', 'O corpo do paciente ficou resistente ao antibiótico', 'O antibiótico provocou a mutação de resistência em todas as bactérias'],
        expl: 'É seleção natural em tempo real: a resistência surgiu por mutação ao acaso, antes; o antibiótico só eliminou a concorrência. Por isso não se deve parar o tratamento no meio nem usar antibiótico sem receita.' }),
      () => {
        const [car, bio] = sorteia(BIOMAS);
        return { hab: 'H28', enun: `${car}. Que bioma brasileiro é esse?`, certa: bio, erradas: ENEM.embaralha(BIOMAS.map(b => b[1]).filter(x => x !== bio)),
          expl: `${bio}. No ENEM, ligue a adaptação ao fator limitante do ambiente: falta de água (Caatinga), fogo e solo ácido (Cerrado), sal e lama sem oxigênio (Mangue), cheias (Pantanal).` };
      },
      () => {
        const q = sorteia([
          ['O braço humano, a pata do cavalo e a asa do morcego têm os mesmos ossos, com funções diferentes. São órgãos…', 'homólogos, que indicam ancestral comum', ['análogos, que indicam ancestral comum', 'análogos, resultado de convergência', 'vestigiais, sem função'], 'Mesma origem embrionária e estrutura, função diferente: homologia, evidência de <b>ancestral comum</b> (irradiação adaptativa).'],
          ['A asa da borboleta e a asa do beija-flor servem para voar, mas têm origem e estrutura totalmente diferentes. São órgãos…', 'análogos, resultado de convergência evolutiva', ['homólogos, que indicam ancestral comum', 'homólogos, resultado de convergência', 'vestigiais'], 'Mesma função, origens diferentes: analogia. Ambientes parecidos selecionaram formas parecidas (convergência).'],
          ['Uma população de lagartos foi separada por um rio que mudou de curso. Depois de milhares de anos, os dois grupos não cruzam mais entre si. Isso é…', 'especiação por isolamento geográfico', ['seleção artificial', 'herança dos caracteres adquiridos', 'mutação induzida pelo rio'], 'Separados, os grupos acumulam mutações e sofrem seleções diferentes. Quando não conseguem mais gerar descendentes férteis, são espécies diferentes (especiação alopátrica).'],
          ['Na classificação, <i>Panthera onca</i> (onça-pintada) e <i>Panthera leo</i> (leão) pertencem ao mesmo…', 'gênero, por isso são mais aparentadas entre si do que com o gato doméstico', ['espécie, porque são felinos', 'gênero, mas são de famílias diferentes', 'reino, e só isso'], 'No nome científico, a primeira palavra (com maiúscula) é o gênero e as duas juntas formam a espécie. Mesmo gênero = parentesco próximo.']]);
        return { hab: 'H16', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      },
      () => {
        const e = sorteia([0, 100]), h = evolui(0.5, e, 15);
        return { hab: 'H16', fig: cena(h[h.length - 1], e, h), enun: `Num ambiente com troncos ${e ? 'escurecidos pela fuligem' : 'claros, cobertos de liquens'}, a proporção de mariposas escuras mudou como no gráfico. O que explica isso?`,
          certa: e ? 'As escuras ficaram camufladas, foram menos comidas e deixaram mais descendentes' : 'As claras ficaram camufladas, foram menos comidas e deixaram mais descendentes',
          erradas: ['As mariposas claras escureceram para se camuflar', 'A fuligem tingiu as asas das mariposas e os filhos herdaram a cor', 'As mariposas escolheram a cor de acordo com o tronco', e ? 'As claras ficaram camufladas, foram menos comidas e deixaram mais descendentes' : 'As escuras ficaram camufladas, foram menos comidas e deixaram mais descendentes'],
          expl: 'Seleção natural: a variação de cor já existia; o predador (pássaro) eliminou mais as mariposas visíveis. Com a lei do ar limpo e o tronco clareando, as claras voltaram a predominar.' };
      },
      () => {
        const [car, bio] = sorteia(BIOMAS.filter(b => ['Caatinga', 'Cerrado', 'Manguezal'].includes(b[1])));
        const ad = { Caatinga: 'Reduzir a perda de água em um ambiente com chuvas escassas e irregulares', Cerrado: 'Resistir às queimadas frequentes e alcançar água no fundo do solo na estação seca', Manguezal: 'Obter oxigênio num solo encharcado e lidar com a água salgada' };
        return { hab: 'H28', enun: `As plantas da ${bio === 'Manguezal' ? 'vegetação de mangue' : bio} apresentam: ${car.toLowerCase()}. Essas características são adaptações para…`, certa: ad[bio], erradas: Object.values(ad).filter(x => x !== ad[bio]).concat(['Atrair polinizadores no inverno rigoroso', 'Crescer na sombra de árvores muito altas']),
          expl: `Adaptação é a característica que aumenta a sobrevivência diante do <b>fator limitante</b> do ambiente. ${bio}: ${ad[bio].toLowerCase()}.` };
      }
    ]
  });
})();
