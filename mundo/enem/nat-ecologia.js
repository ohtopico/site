/* 🌿 Teia da vida: pirâmide de energia, magnificação trófica, ciclos biogeoquímicos, relações ecológicas e intervenções. */
(function () {
  const { sorteia, num, f } = NAT;

  const NIVEIS = [['🌱', 'produtores'], ['🐛', 'consumidores primários'], ['🐸', 'consumidores secundários'], ['🐍', 'consumidores terciários'], ['🦅', 'consumidores quaternários']];
  function piramide(E0, ef, n, Hg) {
    let s = '', E = E0;
    for (let k = 0; k < n; k++) {
      const w = 440 - k * 82, y = 205 - k * 38, x = 240 - w / 2;
      const hg = Hg * Math.pow(10, k);
      s += `<rect x="${x}" y="${y - 32}" width="${w}" height="32" rx="6" fill="${['#a8e6b8', '#ffd58a', '#ffb38a', '#f7a8c4', '#c7b4f2'][k]}" stroke="#1d2a1f" stroke-width="2"/>
        <text x="${x + 8}" y="${y - 10}" style="font-size:18px">${NIVEIS[k][0]}</text><text x="${240}" y="${y - 11}" text-anchor="middle" style="font-size:12.5px">${num(E, 1)} kcal</text>
        ${Hg ? `<text x="${x + w - 6}" y="${y - 11}" text-anchor="end" style="font-size:11px;fill:#c4392a">Hg ${num(hg, 3)}</text>` : ''}`;
      E = E * ef / 100;
    }
    return `<svg class="fig" viewBox="0 0 480 215" role="img" aria-label="Pirâmide de energia com ${n} níveis tróficos">${s}</svg>`;
  }

  const CICLO = [
    ['Plantas leguminosas (feijão, soja) têm nódulos nas raízes com bactérias do gênero <i>Rhizobium</i>.', 'Fixam o N₂ do ar e o transformam em compostos que a planta usa (ciclo do nitrogênio)'],
    ['As árvores de uma floresta em crescimento absorvem gás carbônico.', 'Fazem fotossíntese, retirando CO₂ do ar e guardando carbono na biomassa (ciclo do carbono)'],
    ['Fungos e bactérias atuam sobre folhas e animais mortos no solo.', 'Decompõem a matéria orgânica e devolvem nutrientes e CO₂ ao ambiente'],
    ['Bactérias desnitrificantes vivem em solos encharcados, sem oxigênio.', 'Devolvem o nitrogênio à atmosfera na forma de N₂'],
    ['A transpiração das folhas da Amazônia forma os "rios voadores" que levam chuva ao Sudeste.', 'Devolvem água à atmosfera na forma de vapor (ciclo da água)'],
    ['A queima de carvão, petróleo e florestas aumenta a quantidade de um gás na atmosfera.', 'Liberam carbono que estava guardado, na forma de CO₂ (ciclo do carbono)']
  ];
  const RELACOES = [
    ['Líquen: um fungo e uma alga vivem juntos, a alga faz fotossíntese e o fungo protege e retém água.', 'Mutualismo'],
    ['O carrapato suga o sangue do cachorro.', 'Parasitismo'],
    ['A rêmora acompanha o tubarão e come os restos da caça dele, sem prejudicá-lo.', 'Comensalismo'],
    ['A bromélia vive sobre o tronco de uma árvore para alcançar luz, sem tirar seiva dela.', 'Inquilinismo (epifitismo)'],
    ['Onças e jaguatiricas disputam as mesmas presas na mata.', 'Competição'],
    ['A garça come peixes no banhado.', 'Predação'],
    ['Os cupins digerem madeira graças a protozoários que vivem no seu intestino, e os dois dependem um do outro.', 'Mutualismo']
  ];
  const INTERV = [
    ['Uma mata ciliar foi derrubada e o rio está assoreado.', 'Replantar a mata ciliar com espécies nativas da região', ['Canalizar o rio com concreto', 'Plantar eucalipto, que cresce rápido', 'Dragar o rio todo ano sem replantar']],
    ['Duas reservas de Mata Atlântica estão isoladas por plantações, e os micos não conseguem se reproduzir com outros grupos.', 'Criar corredores ecológicos ligando os fragmentos', ['Cercar cada fragmento', 'Levar todos os micos para um zoológico', 'Aumentar a caça de predadores']],
    ['Uma lavoura sofre com uma praga de lagartas.', 'Controle biológico, usando um inimigo natural da praga', ['Aplicar o máximo de agrotóxico possível', 'Queimar a lavoura todo ano', 'Introduzir uma espécie exótica qualquer']],
    ['Uma cidade quer reduzir a quantidade de lixo levada ao aterro.', 'Coleta seletiva, reciclagem e compostagem do lixo orgânico', ['Queimar o lixo a céu aberto', 'Enterrar o lixo em terrenos baldios', 'Jogar o lixo orgânico nos rios']],
    ['O caramujo-africano, espécie exótica, se espalhou pelas hortas.', 'Recolher e destruir os caramujos com cuidado, sem trazer outra espécie exótica', ['Soltar um predador exótico sem estudo', 'Deixar, porque toda espécie aumenta a biodiversidade', 'Espalhar sal em todo o terreno']]
  ];

  NAT.jogo({
    id: 'nat-ecologia', area: 'bio', icone: '🌿', titulo: 'Teia da vida',
    intro: 'Monte a pirâmide de energia: mude quanta energia os produtores captam e quanto passa de um nível para o outro. Ligue o mercúrio e veja ele se acumular no topo. Depois desafios de ciclos, relações ecológicas e intervenções no ambiente.',
    habs: ['H9', 'H4', 'H30'],
    cola: ['<b>Regra dos 10%</b>: só ~10% da energia passa ao nível seguinte; o resto vira calor', '<b>Pirâmide de energia</b> nunca é invertida', '<b>Magnificação trófica</b>: metal pesado e DDT se concentram no topo',
      '<b>Ciclo do N</b>: fixação (Rhizobium), nitrificação, desnitrificação', '<b>Harmônicas</b>: mutualismo, comensalismo, inquilinismo<br><b>Desarmônicas</b>: parasitismo, predação, competição', '<b>Boa intervenção</b>: espécies nativas, corredores, controle biológico'],
    lab: {
      titulo: 'Pirâmide de energia', texto: 'Cada nível gasta a maior parte da energia vivendo (respiração, movimento, calor). Por isso as cadeias raramente têm mais de 4 ou 5 níveis.',
      controles: [
        { id: 'E', rotulo: 'Energia captada pelos produtores', min: 1000, max: 20000, passo: 1000, valor: 10000, unid: 'kcal' },
        { id: 'ef', rotulo: 'Energia que passa a cada nível', min: 5, max: 20, passo: 1, valor: 10, unid: '%' },
        { id: 'n', rotulo: 'Número de níveis', min: 2, max: 5, passo: 1, valor: 4, unid: '' },
        { id: 'hg', rotulo: 'Mercúrio na água (ppm)', min: 0, max: 0.01, passo: 0.001, valor: 0, fmt: v => v ? num(v, 3) + ' ppm' : 'nenhum' }],
      desenhar({ E, ef, n, hg }) {
        const topo = E * Math.pow(ef / 100, n - 1);
        return { svg: piramide(E, ef, n, hg), leitura: [`No topo (${NIVEIS[n - 1][1]}) chegam só <b>${num(topo, 2)} kcal</b>, ${num(topo / E * 100, 3)}% do início`,
          hg ? `O mercúrio fica ~10× mais concentrado a cada nível: no topo, <b>${num(hg * 10 ** (n - 1), 3)} ppm</b>` : 'Ligue o mercúrio para ver a magnificação trófica.'] };
      }
    },
    desafios: [
      () => {
        const E = sorteia([10000, 20000, 50000]), n = sorteia([3, 4]);
        return { hab: 'H9', fig: piramide(E, 10, n, 0).replace(/>[\d.,]+ kcal<\/text>(?![\s\S]*kcal)/, '>? kcal</text>'), enun: `Os produtores de um lago captam ${num(E)} kcal. Considerando que 10% passa a cada nível, quanta energia chega aos ${NIVEIS[n - 1][1]}?`,
          certa: num(E / 10 ** (n - 1)) + ' kcal', erradas: [num(E / 10 ** n) + ' kcal', num(E / 10 ** (n - 2)) + ' kcal', num(E * 0.1 * n) + ' kcal', num(E - E * 0.1 * (n - 1)) + ' kcal'],
          expl: `Produtores → ${NIVEIS.slice(1, n).map(x => x[1]).join(' → ')}: são ${n - 1} passagens de 10%. ${f(`${num(E)} × 0,1^${n - 1} = ${num(E / 10 ** (n - 1))} kcal`)}.` };
      },
      () => {
        const q = sorteia([
          ['Peixes carnívoros de um rio contaminado por mercúrio têm muito mais mercúrio no corpo do que a água e as algas. Por quê?', 'O mercúrio não é eliminado e se acumula a cada nível da cadeia alimentar', ['Os peixes carnívoros produzem mercúrio', 'O mercúrio é absorvido pela pele e só nos peixes grandes', 'A energia aumenta a cada nível e leva o mercúrio junto'], 'Magnificação trófica: o predador come muitas presas e guarda o mercúrio de todas. A energia, ao contrário, <b>diminui</b> a cada nível.'],
          ['Do ponto de vista da energia, por que é mais eficiente alimentar a população com grãos do que com carne bovina?', 'Comendo grãos, ficamos um nível trófico mais perto dos produtores e há menos perda de energia', ['A carne não tem energia', 'O boi produz energia própria', 'Os grãos fazem fotossíntese dentro do corpo'], 'Cada passagem perde ~90% da energia. Comer o produtor direto aproveita muito mais o que a planta captou.']]);
        return { hab: 'H9', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      },
      () => {
        const [sit, cert] = sorteia(CICLO);
        return { hab: 'H9', enun: sit + ' Qual o papel desses seres ou processos nos ciclos da matéria?', certa: cert, erradas: CICLO.filter(c => c[1] !== cert).map(c => c[1]),
          expl: `${cert}. A matéria <b>circula</b> (ciclos) enquanto a energia só <b>flui</b> num sentido e se perde como calor.` };
      },
      () => {
        const [sit, cert] = sorteia(RELACOES);
        return { hab: 'H9', enun: sit + ' Que relação ecológica é essa?', certa: cert, erradas: [...new Set(RELACOES.map(r => r[1]))].filter(x => x !== cert),
          expl: `${cert}. Pergunte: alguém sai prejudicado? Se ninguém perde, é harmônica (mutualismo se os dois dependem; comensalismo se só um ganha alimento; inquilinismo se ganha abrigo ou apoio).` };
      },
      () => {
        const [sit, cert, err] = sorteia(INTERV);
        return { hab: sorteia(['H4', 'H30']), enun: sit + ' Qual a proposta mais adequada?', certa: cert, erradas: err,
          expl: 'No ENEM a melhor intervenção recupera o ambiente usando a própria natureza da região (espécies nativas, inimigos naturais, conexão entre áreas) e ataca a causa do problema.' };
      },
      () => {
        const q = sorteia([
          ['Numa rocha nua, os primeiros seres a se instalar numa sucessão ecológica costumam ser…', 'liquens, que ajudam a formar o solo', ['árvores grandes', 'mamíferos herbívoros', 'fungos decompositores de madeira'], 'As espécies pioneiras aguentam condições duras e preparam o ambiente. Com o tempo, a comunidade fica mais diversa e com mais biomassa, até o clímax.'],
          ['Numa comunidade clímax, comparada às fases iniciais da sucessão, há…', 'mais biodiversidade e mais biomassa, com teias alimentares complexas', ['menos espécies e mais luz no solo', 'só espécies pioneiras', 'produtividade líquida máxima e pouca biomassa'], 'No clímax a comunidade é estável: muita biomassa, muitas espécies e teias alimentares complexas. Quase tudo que é produzido é consumido (produtividade líquida perto de zero).']]);
        return { hab: 'H4', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      }
    ]
  });
})();
