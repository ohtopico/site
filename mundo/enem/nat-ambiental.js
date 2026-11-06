/* 🕵️ Detetive ambiental: fonte → poluente → efeito → intervenção, nos problemas ambientais que mais caem no ENEM. */
(function () {
  const { sorteia } = NAT;

  // cada caso: [nome, fonte, poluente, efeito, intervenção, explicação]
  const CASOS = [
    ['Chuva ácida', 'Queima de carvão e de diesel em indústrias e veículos', 'Óxidos de enxofre e de nitrogênio (SO₂ e NOₓ)', 'Corrosão de monumentos de mármore e acidificação de lagos e solos', 'Catalisadores nos carros, filtros que retiram enxofre e calagem (calcário) dos solos e lagos',
      'SO₂ + água → ácido sulfuroso/sulfúrico; NOₓ → ácido nítrico. O calcário (CaCO₃) do mármore reage com o ácido. Cal ou calcário neutralizam a acidez.'],
    ['Aquecimento global', 'Queima de combustíveis fósseis, desmatamento e pecuária', 'Gás carbônico (CO₂) e metano (CH₄)', 'Intensificação do efeito estufa e aumento da temperatura média do planeta', 'Trocar combustíveis fósseis por renováveis e reflorestar áreas degradadas',
      'O efeito estufa é natural e necessário; o problema é a <b>intensificação</b>. Árvores em crescimento retiram CO₂ do ar pela fotossíntese.'],
    ['Buraco na camada de ozônio', 'Sprays e geladeiras antigos', 'Clorofluorcarbonos (CFCs)', 'Mais radiação ultravioleta chegando à superfície e mais casos de câncer de pele', 'Proibir os CFCs e trocá-los por gases que não destroem o ozônio (Protocolo de Montreal)',
      'O cloro liberado dos CFCs destrói o O₃ na estratosfera. Ozônio não tem nada a ver com aquecimento global: ele filtra UV.'],
    ['Eutrofização', 'Esgoto doméstico sem tratamento e excesso de fertilizantes', 'Fosfatos e nitratos (nutrientes em excesso)', 'Explosão de algas, falta de oxigênio na água e morte de peixes', 'Tratar o esgoto e controlar o uso de fertilizantes perto dos rios',
      'Nutriente demais → algas demais → algas morrem → bactérias aeróbias decompõem e consomem o O₂ → peixes morrem.'],
    ['Contaminação por mercúrio', 'Garimpo de ouro nos rios da Amazônia', 'Mercúrio (metal pesado)', 'Acúmulo nos peixes predadores e nas pessoas que os comem (magnificação trófica)', 'Fiscalizar o garimpo e recuperar o mercúrio em sistemas fechados (retortas)',
      'Mercúrio não é biodegradável: acumula ao longo da cadeia alimentar. Os ribeirinhos que comem peixes carnívoros são os mais afetados.'],
    ['Vazamento de petróleo no mar', 'Acidentes com navios e plataformas', 'Óleo cru (hidrocarbonetos)', 'Película na superfície que impede a passagem de luz e as trocas gasosas, e cobre aves e peixes', 'Conter com boias, recolher o óleo e usar biorremediação com microrganismos',
      'O óleo é apolar e menos denso que a água: flutua e forma uma película. Bactérias que "comem" hidrocarbonetos ajudam na limpeza (biorremediação).'],
    ['Lixão a céu aberto', 'Descarte de lixo sem tratamento', 'Chorume e gás metano', 'Contaminação do solo e do lençol freático, além de doenças', 'Aterro sanitário com manta impermeável, tratamento do chorume e queima ou uso do metano',
      'No aterro sanitário o chorume é coletado e o metano pode gerar energia. Reduzir, reutilizar e reciclar vem antes.'],
    ['Inversão térmica nas cidades', 'Fumaça de carros e indústrias em dias frios de inverno', 'Monóxido de carbono, fuligem e outros poluentes do ar', 'Poluentes presos perto do chão e aumento de doenças respiratórias', 'Rodízio de carros, transporte público e controle das emissões',
      'Normalmente o ar quente sobe e leva os poluentes. Na inversão, uma camada de ar quente fica <b>em cima</b> do ar frio e funciona como tampa.'],
    ['Descarte de pilhas e baterias no lixo comum', 'Pilhas e baterias jogadas no lixo doméstico', 'Metais pesados como chumbo, cádmio e mercúrio', 'Contaminação do solo e da água, e acúmulo nos seres vivos', 'Devolver aos pontos de coleta para reciclagem (logística reversa)',
      'Os metais pesados vazam quando a pilha corrói. A lei obriga fabricantes a receberem de volta (logística reversa).']
  ];
  const col = { fonte: 1, poluente: 2, efeito: 3, intervencao: 4 };
  const ROT = { fonte: 'Fonte', poluente: 'Poluente', efeito: 'Efeito', intervencao: 'Solução' };

  function pista(c, oculto) {
    const caixa = (k, x, cor) => `<g><rect x="${x}" y="40" width="108" height="92" rx="14" fill="${k === oculto ? '#fff' : cor}" stroke="#1d2a1f" stroke-width="2.5" ${k === oculto ? 'stroke-dasharray="7 5"' : ''}/>
      <text x="${x + 54}" y="30" text-anchor="middle">${ROT[k]}</text><text x="${x + 54}" y="${k === oculto ? 100 : 98}" text-anchor="middle" style="font-size:${k === oculto ? 40 : 30}px">${k === oculto ? '?' : { fonte: '🏭', poluente: '☁️', efeito: '⚠️', intervencao: '🛠️' }[k]}</text></g>`;
    return `<svg class="fig" viewBox="0 0 480 150" role="img" aria-label="Cadeia do problema ${c[0]}">
      ${caixa('fonte', 4, '#ffd58a')}<text x="117" y="92" style="font-size:20px">→</text>${caixa('poluente', 124, '#c7b4f2')}<text x="237" y="92" style="font-size:20px">→</text>
      ${caixa('efeito', 244, '#ffb38a')}<text x="357" y="92" style="font-size:20px">→</text>${caixa('intervencao', 364, '#a8e6b8')}</svg>`;
  }

  function pergunta(alvo, hab) {
    return () => {
      const c = sorteia(CASOS), outros = ENEM.embaralha(CASOS.filter(x => x !== c));
      const enun = {
        fonte: `Problema: <b>${c[0].toLowerCase()}</b>. Poluente envolvido: ${c[2].toLowerCase()}. Qual é a principal <b>fonte</b>?`,
        poluente: `Problema: <b>${c[0].toLowerCase()}</b>, causado por: ${c[1].toLowerCase()}. Qual é o <b>poluente</b> responsável?`,
        efeito: `Fonte: ${c[1].toLowerCase()}. Poluente liberado: ${c[2].toLowerCase()}. Qual <b>efeito</b> isso provoca no ambiente?`,
        intervencao: `Efeito observado: ${c[3].toLowerCase()}. Qual <b>intervenção</b> ataca a causa desse problema?`
      }[alvo];
      return { hab, fig: pista(c, alvo), figDepois: pista(c, null), enun, certa: c[col[alvo]], erradas: outros.map(x => x[col[alvo]]), expl: `<b>${c[0]}.</b> ${c[5]}` };
    };
  }

  NAT.jogo({
    id: 'nat-ambiental', area: 'qui', icone: '🕵️', titulo: 'Detetive ambiental',
    intro: 'Todo problema ambiental do ENEM segue a mesma pista: de onde vem (fonte), o que é (poluente), o que causa (efeito) e como resolver (intervenção). Descubra a peça que falta em cada caso.',
    habs: ['H10', 'H12', 'H27'],
    cola: ['<b>Chuva ácida</b>: SO₂ e NOₓ · corrige com calcário', '<b>Efeito estufa</b>: CO₂ e CH₄ · <b>camada de ozônio</b>: CFC (são problemas diferentes!)', '<b>Eutrofização</b>: fosfato e nitrato → algas → falta de O₂',
      '<b>Metais pesados</b> (Hg, Pb, Cd): acumulam na cadeia alimentar', '<b>Inversão térmica</b>: ar quente por cima segura a poluição', '<b>Boa intervenção</b> ataca a <b>causa</b>, não só o sintoma'],
    desafios: [pergunta('fonte', 'H10'), pergunta('poluente', 'H10'), pergunta('efeito', 'H12'), pergunta('intervencao', 'H27'), pergunta('efeito', 'H10'), pergunta('intervencao', 'H27'), pergunta('poluente', 'H12'), pergunta('intervencao', 'H27')]
  });
})();
