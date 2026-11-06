/* META {
  "id": "hum-raizes", "icone": "🪘", "titulo": "Raízes do Brasil",
  "intro": "De onde vem cada pedaço da cultura brasileira? Classifique costumes, palavras e festas pela matriz indígena, africana ou europeia, separe patrimônio material de imaterial e veja como as políticas de inclusão entram nas questões do ENEM.",
  "resumo": "Matrizes culturais, patrimônio material e imaterial, registros de povos antigos e políticas de inclusão.",
  "habs": ["H5", "H11", "H25"],
  "cola": [
    ["Matriz indígena:", "mandioca e farinha, rede, coivara, guaraná, banho diário, palavras tupis (caju, pipoca, Ipanema, mingau)."],
    ["Matriz africana:", "candomblé e umbanda, capoeira, samba, maracatu, acarajé, palavras bantas (cafuné, moleque, quitanda, caçula)."],
    ["Matriz europeia:", "língua portuguesa, catolicismo, festas juninas, cavalhadas, azulejos, arquitetura colonial."],
    ["Inclusão (leis):", "Lei 10.639/2003 (história e cultura afro-brasileira na escola), 11.645/2008 (inclui a indígena), Lei de Cotas 12.711/2012, Estatuto da Pessoa com Deficiência 13.146/2015, terras indígenas (art. 231) e quilombolas (art. 68 do ADCT)."]
  ]
} */
const M = ['Indígena', 'Africana', 'Europeia'];
const MATRIZ = [
  ['🫓', 'Farinha de mandioca e beiju', 0, 'A mandioca era a base da alimentação dos povos tupis; os portugueses e os africanos aprenderam a usá-la.'],
  ['🛏️', 'Dormir em rede', 0, 'A rede (ini, em tupi) espantou os europeus, que dormiam no chão ou em catres.'],
  ['🔥', 'Coivara (derrubar e queimar a mata para plantar)', 0, 'Técnica agrícola indígena de roça itinerante. Em escala grande, virou fonte de desmatamento.'],
  ['🥤', 'Guaraná', 0, 'Os Sateré-Mawé, do Amazonas, domesticaram o guaraná.'],
  ['🗣️', 'Palavras como caju, pipoca, mingau e Ipanema', 0, 'Vêm do tupi. Muitos nomes de lugares (Itaquera, Itajaí, Pindamonhangaba) também.'],
  ['🥁', 'Candomblé', 1, 'Religião de matriz africana, que cultua os orixás (iorubá). Foi perseguida pela polícia até meados do século XX.'],
  ['🤸', 'Roda de capoeira', 1, 'Criada por africanos escravizados e seus descendentes no Brasil, mistura luta, música e jogo.'],
  ['🎶', 'Samba de roda do Recôncavo Baiano', 1, 'Raiz do samba carioca, trazida pelas “tias baianas” como Tia Ciata.'],
  ['👑', 'Maracatu de Pernambuco', 1, 'Encena a coroação dos reis do Congo, eleitos pelas irmandades negras no período colonial.'],
  ['🍤', 'Acarajé', 1, 'Bolinho de feijão-fradinho frito no azeite de dendê, comida ritual ligada a Iansã.'],
  ['💬', 'Palavras como cafuné, moleque, quitanda e caçula', 1, 'Vêm das línguas bantas (quimbundo, quicongo), faladas por grande parte dos africanos trazidos ao Brasil.'],
  ['🌽', 'Festa junina com santos católicos', 2, 'Veio de Portugal (Santo Antônio, São João e São Pedro) e se adaptou ao calendário do milho.'],
  ['🐎', 'Cavalhadas (batalha entre cristãos e mouros)', 2, 'Encenam as lutas da Península Ibérica na Idade Média. Pirenópolis (GO) é a mais famosa.'],
  ['🟦', 'Fachadas com azulejos portugueses', 2, 'Herança da arquitetura lusitana, como em São Luís (MA).'],
  ['⛪', 'Procissões do catolicismo', 2, 'A religião oficial do Brasil até 1891 foi o catolicismo trazido pelos portugueses.']
];
const PAT = [
  ['⛪', 'Centro histórico de Ouro Preto (MG)', 0], ['🏚️', 'Ruínas de São Miguel das Missões (RS)', 0], ['🏛️', 'Pelourinho, em Salvador (BA)', 0],
  ['🏙️', 'Plano Piloto de Brasília', 0], ['🗿', 'Sítio arqueológico da Serra da Capivara (PI)', 0], ['⚓', 'Cais do Valongo (RJ)', 0],
  ['💃', 'Frevo de Pernambuco', 1], ['🙏', 'Círio de Nazaré, em Belém (PA)', 1], ['🍲', 'Ofício das paneleiras de Goiabeiras (ES)', 1],
  ['🎨', 'Arte Kusiwa, pintura corporal dos Wajãpi (AP)', 1], ['🧀', 'Modo artesanal de fazer queijo de Minas', 1], ['🥁', 'Matrizes do samba no Rio de Janeiro', 1]
];
const P = ['Patrimônio material (bem, lugar, construção)', 'Patrimônio imaterial (saber, celebração, expressão)'];
const INCL = [
  { hab: 'H25', texto: 'A Lei nº 12.711/2012 reserva 50% das vagas das universidades e institutos federais para estudantes de escola pública, com subcotas para pretos, pardos, indígenas, quilombolas e pessoas com deficiência, proporcionais à população de cada estado.',
    enun: 'Essa política é um exemplo de ação afirmativa porque',
    certa: 'trata de forma desigual os desiguais para corrigir desvantagens históricas no acesso ao ensino superior',
    erradas: ['elimina o vestibular e o ENEM como forma de seleção', 'garante vagas apenas por critério de renda, sem considerar raça', 'é uma medida permanente que dispensa avaliação', 'beneficia sobretudo os alunos de escolas particulares'],
    expl: '<b>Igualdade formal</b> = a mesma regra para todos. <b>Igualdade material (equidade)</b> = medidas diferentes para quem parte de condições diferentes. As cotas buscam a segunda.' },
  { hab: 'H25', texto: 'A Lei nº 10.639/2003 tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas. Em 2008, a Lei nº 11.645 incluiu a história e a cultura dos povos indígenas.',
    enun: 'O objetivo dessas leis é',
    certa: 'combater o racismo e valorizar a contribuição de africanos, afro-brasileiros e indígenas na formação do país',
    erradas: ['substituir o ensino de história europeia pelo de história africana', 'ensinar as línguas africanas como disciplina obrigatória', 'criar escolas separadas para cada grupo étnico', 'reduzir o currículo de ciências humanas'],
    expl: 'São respostas a lutas do movimento negro e indígena por representação no currículo, rompendo com uma história contada só do ponto de vista europeu.' },
  { hab: 'H25', texto: '“São reconhecidos aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam, competindo à União demarcá-las.”<cite>Constituição Federal de 1988, art. 231.</cite>',
    enun: 'Ao usar a expressão “direitos originários”, a Constituição reconhece que',
    certa: 'o direito dos indígenas à terra é anterior à formação do próprio Estado brasileiro',
    erradas: ['as terras indígenas pertencem aos estados onde estão', 'os indígenas devem ser integrados à sociedade e perder seus costumes', 'a demarcação depende da compra das terras pelos indígenas', 'só têm direito à terra os povos que já falam português'],
    expl: 'A Constituição de 1988 rompeu com a política de <b>integração/assimilação</b> e passou a garantir o direito à <b>diferença</b>. A terra é da União, com usufruto exclusivo dos povos indígenas.' },
  { hab: 'H25', texto: 'O Estatuto da Pessoa com Deficiência (Lei 13.146/2015) define a deficiência como o resultado da interação entre um impedimento de longo prazo e as barreiras que obstruem a participação plena na sociedade.',
    enun: 'Segundo essa definição, a inclusão depende principalmente de',
    certa: 'eliminar barreiras arquitetônicas, de comunicação e de atitude na sociedade',
    erradas: ['tratar a deficiência apenas como doença a ser curada', 'criar instituições separadas para pessoas com deficiência', 'adaptar a pessoa às condições existentes', 'restringir o acesso ao trabalho por segurança'],
    expl: 'É o <b>modelo social</b> da deficiência: a barreira está no ambiente (escada sem rampa, vídeo sem legenda, preconceito), e é ele que precisa mudar.' },
  { hab: 'H11', texto: 'No litoral brasileiro há montes de conchas, ossos e restos de fogueiras, alguns com mais de 20 metros de altura e milhares de anos, chamados sambaquis.',
    enun: 'Os sambaquis são registros que permitem ao historiador identificar',
    certa: 'práticas de alimentação, moradia e sepultamento de povos coletores e pescadores pré-coloniais',
    erradas: ['a presença de colonos portugueses no século XVI', 'as primeiras cidades indígenas com escrita própria', 'antigos portos de embarque de escravizados', 'aterros feitos pela urbanização do século XX'],
    expl: 'Sambaqui = “monte de conchas” em tupi. Neles se enterravam os mortos. Sem escrita, a <b>arqueologia</b> lê os vestígios materiais.' },
  { hab: 'H11', texto: 'Os quilombos, como o de Palmares (séc. XVII), reuniam africanos fugidos, indígenas e pobres livres, com plantações, comércio com vilas vizinhas e lideranças como Zumbi e Dandara.',
    enun: 'A existência dos quilombos evidencia que os escravizados',
    certa: 'resistiram ativamente à escravidão, criando formas próprias de organização social',
    erradas: ['aceitaram passivamente a escravidão até 1888', 'eram libertados pelos senhores ao completar 30 anos', 'só fugiam para outros países da América', 'viviam isolados, sem contato com outros grupos'],
    expl: 'Fugas, quilombos, revoltas (Malês, 1835), irmandades e compra de alforria mostram a <b>agência</b> dos escravizados. 20 de novembro, morte de Zumbi, é o Dia da Consciência Negra.' },
  { hab: 'H5', texto: 'A obra “Operários” (1933), de Tarsila do Amaral, mostra dezenas de rostos de diferentes origens empilhados diante de chaminés de fábricas.',
    enun: 'A pintura representa a diversidade étnica da população brasileira associada',
    certa: 'à industrialização e à formação da classe operária urbana, com migrantes e imigrantes',
    erradas: ['ao trabalho escravo nas fazendas de café', 'à vida rural nas comunidades indígenas', 'à elite agrária da República Velha', 'à colonização portuguesa do século XVI'],
    expl: 'Tarsila, depois da fase antropofágica, adota temas sociais. Os rostos variados mostram imigrantes europeus, japoneses, negros e nordestinos nas fábricas de São Paulo.' }
];
const matriz = () => { const [e, t, c, x] = HUM.sorteia(MATRIZ); return { tipo: 'bins', hab: 'H5', emo: e, item: t, pergunta: 'Qual é a principal matriz cultural de origem?', opcoes: M, certa: c, expl: x }; };
const patr = () => { const [e, t, c] = HUM.sorteia(PAT); return { tipo: 'bins', hab: 'H5', emo: e, item: t, pergunta: 'Registrado ou tombado pelo IPHAN ou pela UNESCO como:', opcoes: P, certa: c,
  expl: c ? 'É um <b>saber, ofício, celebração ou forma de expressão</b>: o que se protege é a prática viva, transmitida entre gerações.' : 'É um <b>bem material</b>: construção, conjunto urbano ou sítio, protegido por tombamento.' }; };
HUM.jogo({ id: 'hum-raizes', proximo: ['hum-conquistas.html', 'Lutas e conquistas'],
  fila: () => { const usa = new Set(), uniq = f => { let q; do { q = f(); } while (usa.has(q.item)); usa.add(q.item); return q; };
    const inc = HUM.mix(INCL).slice(0, 4).map(q => Object.assign({ tipo: 'mc' }, q));
    return [uniq(matriz), uniq(matriz), uniq(patr), inc[0], uniq(matriz), uniq(patr), inc[1], uniq(matriz), inc[2], inc[3]]; } });
