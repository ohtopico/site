/* META {
  "id": "hum-geopolitica", "icone": "🌍", "titulo": "Tabuleiro geopolítico",
  "intro": "Guerra Fria, conflitos atuais, blocos econômicos, refugiados e fronteiras. Classifique os blocos, descubra o lado de cada país e responda questões sobre poder entre as nações e fluxos de pessoas.",
  "resumo": "Guerra Fria, conflitos atuais, blocos econômicos, ONU, migrações e refugiados.",
  "habs": ["H7", "H8", "H9"],
  "cola": [
    ["Guerra Fria (1947–1991):", "EUA (capitalismo, OTAN, Plano Marshall) x URSS (socialismo, Pacto de Varsóvia). Conflitos indiretos: Coreia, Vietnã, Cuba (crise dos mísseis, 1962), Afeganistão. Fim com a queda do Muro (1989) e da URSS (1991)."],
    ["Blocos, do mais fraco ao mais integrado:", "zona de livre comércio (USMCA) → união aduaneira (Mercosul, com Tarifa Externa Comum) → mercado comum (circulam também pessoas e capitais) → união econômica e monetária (União Europeia, com o euro)."],
    ["Refugiado:", "quem foge de perseguição, guerra ou violação grave de direitos e tem proteção internacional (Convenção de 1951). Migrante econômico não tem o mesmo status."]
  ]
} */
const { sorteia: S, mix } = HUM;
const BLOCOS = [
  ['🇺🇸🇲🇽🇨🇦', 'USMCA (antigo Nafta): EUA, México e Canadá', 0, 'Só reduz tarifas entre os membros; cada país mantém a própria tarifa para fora. Fronteira aberta para mercadorias, não para pessoas.'],
  ['🇧🇷🇦🇷🇺🇾🇵🇾', 'Mercosul', 1, 'É uma <b>união aduaneira imperfeita</b>: tem a Tarifa Externa Comum (TEC), mas com muitas exceções.'],
  ['🇪🇺', 'União Europeia', 2, 'Moeda única (euro) em parte dos países, Banco Central Europeu, livre circulação de pessoas (Espaço Schengen). O Reino Unido saiu em 2020 (Brexit).'],
  ['🌏', 'ASEAN (Sudeste Asiático)', 0, 'Associação que funciona sobretudo como <b>área de livre comércio</b> (AFTA).'],
  ['⛰️', 'Comunidade Andina (Bolívia, Colômbia, Equador, Peru)', 1, 'Tem tarifa externa comum: é uma <b>união aduaneira</b>.']
];
const NIVEIS = ['Zona de livre comércio', 'União aduaneira (tarifa externa comum)', 'União econômica e monetária'];
const LADOS = [
  ['🇩🇪', 'Alemanha Ocidental (RFA)', 0], ['🇰🇷', 'Coreia do Sul', 0], ['🇨🇺', 'Cuba após 1959', 1], ['🇩🇪', 'Alemanha Oriental (RDA)', 1],
  ['🇵🇱', 'Polônia', 1], ['🇰🇵', 'Coreia do Norte', 1], ['🇯🇵', 'Japão', 0], ['🇻🇳', 'Vietnã do Norte', 1], ['🇧🇷', 'Brasil durante a ditadura militar', 0]
];
const LADO_EXPL = ['alinhado aos <b>EUA</b> (bloco capitalista).', 'alinhado à <b>URSS</b> (bloco socialista).'];
const QS = [
  { hab: 'H7', texto: 'O Plano Marshall (1947) emprestou cerca de 13 bilhões de dólares aos países da Europa Ocidental destruídos pela guerra.',
    enun: 'Além da reconstrução econômica, o plano tinha como objetivo político',
    certa: 'conter a expansão do socialismo na Europa, fortalecendo aliados dos EUA',
    erradas: ['financiar a reconstrução da União Soviética', 'criar uma moeda única europeia', 'punir a Alemanha pela guerra', 'garantir a independência das colônias africanas'],
    expl: 'É a <b>Doutrina Truman</b> na prática: ajuda econômica para evitar que a pobreza levasse os partidos comunistas ao poder. A URSS respondeu com o Comecon.' },
  { hab: 'H7', texto: 'Na Conferência de Berlim (1884–1885), potências europeias definiram regras para a partilha da África. Nenhum africano participou.',
    enun: 'Uma consequência dessa partilha que ainda pesa sobre conflitos africanos é',
    certa: 'a criação de fronteiras artificiais que separaram povos aparentados e juntaram grupos rivais',
    erradas: ['a formação de Estados com populações etnicamente homogêneas', 'o fim imediato do tráfico de escravizados', 'a industrialização acelerada do continente', 'a independência dos países africanos ainda no século XIX'],
    expl: 'Fronteiras traçadas com régua, segundo interesses europeus. Conflitos como o de Ruanda (1994) e guerras civis em vários países têm essa herança colonial.' },
  { hab: 'H7', texto: 'Os curdos são cerca de 30 milhões de pessoas, com língua e cultura próprias, divididas entre Turquia, Iraque, Síria e Irã.',
    enun: 'Os curdos são frequentemente citados como exemplo de',
    certa: 'nação sem Estado, cujo território foi repartido entre vários países',
    erradas: ['Estado sem nação, criado pela ONU', 'povo nômade sem identidade cultural', 'grupo que já tem Estado reconhecido pela ONU', 'minoria religiosa cristã do Oriente Médio'],
    expl: '<b>Nação</b> = povo com identidade (língua, cultura, história). <b>Estado</b> = território com governo soberano. Os curdos têm nação, mas não Estado próprio. Palestinos também lutam por um Estado plenamente reconhecido.' },
  { hab: 'H7', texto: 'O Conselho de Segurança da ONU tem 5 membros permanentes com direito a veto: EUA, Rússia, China, Reino Unido e França.',
    enun: 'Essa composição é criticada por países como o Brasil porque',
    certa: 'reflete a correlação de forças do pós-Segunda Guerra e não a ordem mundial atual',
    erradas: ['dá direito de veto a todos os países da Assembleia Geral', 'exclui as potências nucleares das decisões', 'foi criada após o fim da Guerra Fria', 'impede a ONU de enviar missões de paz'],
    expl: 'Os vencedores de 1945 ficaram com o veto. Brasil, Índia, Alemanha e Japão (G4) defendem a reforma do Conselho.' },
  { hab: 'H8', texto: 'Em 2015, milhares de sírios tentaram chegar à Europa pelo Mar Mediterrâneo. A foto do menino Alan Kurdi, morto numa praia da Turquia, correu o mundo.',
    enun: 'Pelo direito internacional, essas pessoas têm direito a pedir refúgio porque',
    certa: 'fugiam de uma guerra civil e de perseguição, com risco grave à vida',
    erradas: ['buscavam apenas salários maiores na Europa', 'tinham dupla cidadania europeia', 'eram turistas sem visto', 'foram expulsas pela ONU'],
    expl: 'Refugiado tem proteção (princípio da <b>não devolução</b>, ou <i>non-refoulement</i>). O Brasil recebeu sírios, haitianos (visto humanitário) e venezuelanos (Operação Acolhida, em Roraima).' },
  { hab: 'H8', texto: 'Entre 1880 e 1930, mais de 4 milhões de europeus e japoneses imigraram para o Brasil, muitos com passagem paga pelo governo de São Paulo.',
    enun: 'O Estado brasileiro incentivou essa imigração principalmente para',
    certa: 'substituir a mão de obra escravizada nas lavouras de café e, no discurso da época, “branquear” a população',
    erradas: ['povoar a Amazônia com colonos estrangeiros', 'formar uma elite industrial no Nordeste', 'cumprir um acordo com a Liga das Nações', 'reduzir a população das capitais'],
    expl: 'Fim do tráfico (1850) + abolição (1888) + café em expansão = demanda por trabalhadores. A <b>ideologia do branqueamento</b> fez o Estado preferir europeus aos libertos.' },
  { hab: 'H8', texto: 'Nas décadas de 1950 a 1970, milhões de nordestinos migraram para São Paulo e Rio de Janeiro, e outros foram para a construção de Brasília.',
    enun: 'Esse fluxo migratório interno se explica principalmente',
    certa: 'pela concentração industrial no Sudeste e pela concentração de terras e secas no Nordeste',
    erradas: ['pela crise da indústria no Sudeste', 'pela abertura de fronteiras agrícolas no Rio Grande do Sul', 'pela reforma agrária no Nordeste', 'pela proibição da migração para o Norte'],
    expl: 'Fatores de <b>repulsão</b> (latifúndio, seca, pobreza) e de <b>atração</b> (empregos na indústria e na construção civil). Hoje há também migração de retorno ao Nordeste.' },
  { hab: 'H9', texto: 'Desde 2009, Brasil, Rússia, Índia, China e África do Sul se reúnem no BRICS, que em 2024 ganhou novos membros, como Egito, Etiópia, Irã e Emirados Árabes.',
    enun: 'O BRICS pode ser entendido como',
    certa: 'um grupo de economias emergentes que busca mais peso na ordem internacional, sem ser um bloco econômico formal',
    erradas: ['uma união aduaneira com tarifa externa comum', 'uma aliança militar como a OTAN', 'um bloco com moeda única já em circulação', 'um acordo de livre circulação de pessoas'],
    expl: 'O BRICS é uma articulação política e financeira (criou o Novo Banco de Desenvolvimento), num mundo <b>multipolar</b>. Não tem tarifa comum nem moeda única.' },
  { hab: 'H7', texto: 'Em 1948 foi criado o Estado de Israel. Cerca de 700 mil palestinos deixaram ou foram expulsos de suas terras, episódio que eles chamam de Nakba (catástrofe).',
    enun: 'O conflito israelo-palestino envolve sobretudo a disputa',
    certa: 'por território, fronteiras, Jerusalém e o direito à autodeterminação dos dois povos',
    erradas: ['por reservas de petróleo na Faixa de Gaza', 'entre católicos e protestantes', 'pela hegemonia da URSS no Oriente Médio atual', 'pelo controle do Canal do Panamá'],
    expl: 'Ocupação da Cisjordânia, assentamentos, bloqueio de Gaza, refugiados e o status de Jerusalém estão no centro. A ONU defende a solução de dois Estados.' },
  { hab: 'H7', texto: 'Em 2014 a Rússia anexou a Crimeia e, em 2022, invadiu a Ucrânia. Entre os argumentos russos estava a expansão da OTAN para o Leste Europeu.',
    enun: 'O conflito retoma uma lógica herdada da Guerra Fria porque envolve',
    certa: 'a disputa por áreas de influência entre a Rússia e as potências ocidentais',
    erradas: ['uma guerra religiosa entre muçulmanos e cristãos', 'a disputa pelo Canal de Suez', 'o fim da União Europeia', 'a luta pela independência de colônias africanas'],
    expl: 'A Ucrânia foi parte da URSS. A OTAN incorporou ex-membros do Pacto de Varsóvia, e a Rússia vê isso como ameaça. Lógica de <b>esferas de influência</b>.' }
];
HUM.jogo({ id: 'hum-geopolitica', proximo: ['hum-planeta.html', 'Planeta em jogo'],
  fila: () => { const q = mix(QS).slice(0, 7).map(x => Object.assign({ tipo: 'mc' }, x)); const b = mix(BLOCOS), l = mix(LADOS);
    const bb = k => ({ tipo: 'bins', hab: 'H9', emo: b[k][0], item: b[k][1], pergunta: 'Que tipo de integração esse bloco tem?', opcoes: NIVEIS, certa: b[k][2], expl: b[k][3] });
    const ll = k => ({ tipo: 'bins', hab: 'H7', emo: l[k][0], item: l[k][1], pergunta: 'Na Guerra Fria, estava alinhado a qual lado?', opcoes: ['🇺🇸 Bloco capitalista (EUA)', '☭ Bloco socialista (URSS)'], certa: l[k][2], expl: `${l[k][1]}: ${LADO_EXPL[l[k][2]]}` });
    return [ll(0), q[0], bb(0), q[1], q[2], ll(1), q[3], bb(1), q[4], q[5], q[6]]; } });
