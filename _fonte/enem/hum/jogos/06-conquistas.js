/* META {
  "id": "hum-conquistas", "icone": "✊", "titulo": "Lutas e conquistas",
  "intro": "Nenhum direito caiu do céu. Ligue cada lei ou conquista ao movimento social que lutou por ela, monte a linha do tempo dos direitos no Brasil e analise como a pressão popular mudou a política.",
  "resumo": "Movimentos sociais e as leis que conquistaram: voto feminino, CLT, abolição, Constituição de 1988, ECA, Maria da Penha, cotas.",
  "habs": ["H10", "H13", "H22"],
  "cola": [
    ["Trabalho:", "greves de 1917 → leis trabalhistas da Era Vargas → CLT (1943). Direitos dados “de cima” também respondiam à pressão “de baixo”."],
    ["Mulheres:", "sufragistas como Bertha Lutz → voto feminino (Código Eleitoral de 1932). Movimento feminista e o caso de Maria da Penha na OEA → Lei Maria da Penha (2006). Feminicídio virou crime qualificado em 2015."],
    ["Movimento negro:", "abolicionismo (Luís Gama, André Rebouças, José do Patrocínio) → Lei Áurea (1888). Lei Caó (1989) torna o racismo crime inafiançável; leis 10.639 (2003) e de Cotas (2012)."],
    ["Redemocratização:", "Diretas Já (1984) → Constituição Cidadã (1988), com SUS, voto facultativo aos 16 anos e aos analfabetos. Caras-pintadas → impeachment de Collor (1992)."]
  ]
} */
const { sorteia: S, mix } = HUM;
const PARES = [
  ['🗳️', 'Direito de voto para as mulheres (1932)', 'Movimento sufragista (Bertha Lutz e a Federação Brasileira pelo Progresso Feminino)'],
  ['👷', 'Consolidação das Leis do Trabalho, a CLT (1943)', 'Movimento operário (greves gerais como a de 1917)'],
  ['📜', 'Lei Áurea (1888)', 'Movimento abolicionista e fugas em massa de escravizados'],
  ['🏠', 'Lei Maria da Penha (2006)', 'Movimento feminista contra a violência doméstica'],
  ['🎓', 'Lei de Cotas nas universidades federais (2012)', 'Movimento negro'],
  ['🌾', 'Assentamentos de reforma agrária', 'Movimento dos Trabalhadores Rurais Sem Terra (MST)'],
  ['🌳', 'Criação das reservas extrativistas na Amazônia', 'Seringueiros liderados por Chico Mendes'],
  ['🏙️', 'Estatuto da Cidade e a função social da propriedade urbana (2001)', 'Movimento pela reforma urbana e de luta por moradia'],
  ['🧒', 'Estatuto da Criança e do Adolescente (1990)', 'Movimentos em defesa dos direitos da infância (como o Movimento Nacional de Meninos e Meninas de Rua)'],
  ['🏳️‍🌈', 'Reconhecimento da união estável entre pessoas do mesmo sexo pelo STF (2011)', 'Movimento LGBTQIA+'],
  ['⚓', 'Fim dos castigos com chibata na Marinha (1910)', 'Revolta dos marinheiros liderada por João Cândido'],
  ['🩺', 'Criação do SUS na Constituição de 1988', 'Movimento da Reforma Sanitária']
];
const LEIS = [['Lei Áurea', 1888, '📜'], ['Voto feminino', 1932, '🗳️'], ['CLT', 1943, '👷'], ['Estatuto da Terra', 1964, '🌾'], ['Lei da Anistia', 1979, '🕊️'],
  ['Constituição Cidadã', 1988, '📘'], ['Lei Caó (racismo é crime)', 1989, '⚖️'], ['ECA', 1990, '🧒'], ['Estatuto do Idoso', 2003, '👵'], ['Lei Maria da Penha', 2006, '🏠'], ['Lei de Cotas', 2012, '🎓'], ['Estatuto da Pessoa com Deficiência', 2015, '♿']];
const QS = [
  { hab: 'H13', texto: 'Entre 1983 e 1984, milhões de pessoas foram às ruas pedir eleição direta para presidente. A emenda Dante de Oliveira foi rejeitada no Congresso, e o presidente seguinte, Tancredo Neves, foi eleito pelo Colégio Eleitoral.',
    enun: 'Mesmo com a derrota da emenda, a campanha das Diretas Já',
    certa: 'acelerou o fim da ditadura e fortaleceu a participação popular na redemocratização',
    erradas: ['garantiu a eleição direta de Tancredo Neves', 'foi organizada pelos militares para legitimar o regime', 'não teve nenhum efeito político', 'levou ao fechamento do Congresso Nacional'],
    expl: 'Movimento social também vence “perdendo”: a pressão mostrou que o regime não tinha mais apoio. A eleição direta veio em 1989, garantida pela Constituição de 1988.' },
  { hab: 'H13', texto: 'Em 1992, estudantes com o rosto pintado de verde e amarelo foram às ruas pedir a saída do presidente Fernando Collor, acusado de corrupção.',
    enun: 'O movimento dos caras-pintadas é um exemplo de',
    certa: 'participação da sociedade civil que pressionou o Congresso a abrir o processo de impeachment',
    erradas: ['golpe militar contra um presidente eleito', 'revolta armada contra a Constituição', 'movimento a favor da volta da monarquia', 'greve geral pela reforma agrária'],
    expl: 'O impeachment seguiu as regras da Constituição: Câmara autoriza, Senado julga. As ruas pressionaram, as instituições decidiram.' },
  { hab: 'H22', texto: '“Art. 5º (...) XLII – a prática do racismo constitui crime inafiançável e imprescritível, sujeito à pena de reclusão.”<cite>Constituição Federal de 1988.</cite>',
    enun: 'A inclusão desse inciso na Constituição está ligada',
    certa: 'à atuação do movimento negro na Assembleia Constituinte, que denunciava o mito da democracia racial',
    erradas: ['à exigência de organismos internacionais de comércio', 'a uma lei herdada do período imperial', 'à proposta dos militares no fim da ditadura', 'à ausência de racismo no Brasil da época'],
    expl: 'Antes, o racismo era só contravenção (Lei Afonso Arinos, 1951). A Lei Caó (1989) regulamentou o crime. A ideia de que no Brasil “não há racismo” é o <b>mito da democracia racial</b>.' },
  { hab: 'H10', texto: 'O Movimento dos Trabalhadores Rurais Sem Terra (MST), criado em 1984, ocupa latifúndios considerados improdutivos para pressionar pela reforma agrária, apoiado no artigo da Constituição sobre a função social da propriedade.',
    enun: 'A estratégia de ocupação do MST se baseia no argumento de que',
    certa: 'a terra que não cumpre função social pode ser desapropriada para a reforma agrária',
    erradas: ['toda propriedade privada deve ser abolida pela Constituição', 'apenas o Estado pode ser dono de terras no Brasil', 'as terras produtivas devem ser divididas primeiro', 'a reforma agrária foi concluída em 1964'],
    expl: 'A Constituição (art. 184 a 186) permite desapropriar o imóvel rural que não cumpre sua função social. O Brasil tem uma das maiores concentrações de terra do mundo.' },
  { hab: 'H10', texto: 'Na década de 1950, Rosa Parks se recusou a ceder seu lugar a um branco num ônibus em Montgomery (EUA). Seguiu-se um boicote de mais de um ano, liderado por Martin Luther King.',
    enun: 'A estratégia do movimento pelos direitos civis nos EUA se caracterizou',
    certa: 'pela desobediência civil não violenta e pela mobilização coletiva',
    erradas: ['pela luta armada e pela guerrilha urbana', 'pelo apoio do governo às leis de segregação', 'pela defesa da separação entre brancos e negros', 'pela recusa em usar os tribunais'],
    expl: 'Boicotes, marchas (Washington, 1963) e ações na Justiça levaram ao <b>Civil Rights Act</b> (1964) e ao Voting Rights Act (1965), que derrubaram a segregação legal.' },
  { hab: 'H22', texto: 'A Constituição de 1988 ampliou o voto: tornou-o facultativo para analfabetos e jovens de 16 e 17 anos e obrigatório dos 18 aos 70 anos.',
    enun: 'Comparada às constituições anteriores, essa mudança representou',
    certa: 'a ampliação da cidadania política a grupos antes excluídos do voto',
    erradas: ['a restrição do voto a quem sabe ler e escrever', 'a volta do voto censitário, por renda', 'o fim do voto secreto', 'a proibição do voto feminino'],
    expl: 'Desde a Lei Saraiva (1881), os analfabetos estavam proibidos de votar. Em 1985 uma emenda já os incluía, e a Constituição de 1988 consolidou o direito.' },
  { hab: 'H13', texto: 'Em 1910, marinheiros, em sua maioria negros, tomaram navios de guerra na Baía de Guanabara e apontaram os canhões para o Rio de Janeiro, exigindo o fim dos castigos físicos.',
    enun: 'A Revolta da Chibata revela que, na Primeira República,',
    certa: 'práticas herdadas da escravidão permaneciam nas instituições mesmo após a abolição',
    erradas: ['a Marinha era formada apenas pela elite branca', 'os castigos físicos tinham sido abolidos antes da escravidão', 'os revoltosos queriam a volta da monarquia', 'o governo atendeu a todos os pedidos e anistiou os líderes para sempre'],
    expl: 'O governo aprovou a anistia e acabou com a chibata, mas depois prendeu e expulsou muitos marinheiros. João Cândido ficou conhecido como o “Almirante Negro”.' }
];
const par = () => { const p = S(PARES); return { tipo: 'mc', hab: 'H22', enun: `${p[0]} <b>${p[1]}</b>: qual movimento social lutou por essa conquista?`,
  certa: p[2], erradas: mix(PARES.filter(x => x !== p)).slice(0, 3).map(x => x[2]), expl: `${p[1]} ← ${p[2]}. Leis e políticas públicas costumam ser respostas a <b>lutas coletivas</b> organizadas.` }; };
const ordemLeis = () => ({ tipo: 'ordem', hab: 'H22', enun: 'Ponha as conquistas de direitos no Brasil em ordem, da mais antiga para a mais recente.', itens: mix(LEIS).slice(0, 5),
  expl: 'Repare: depois de 1988 a lista de direitos cresce rápido. A Constituição Cidadã abriu caminho para estatutos e leis específicas.' });
HUM.jogo({ id: 'hum-conquistas', proximo: ['hum-manchete.html', 'Manchete na mira'],
  fila: () => { const q = mix(QS).slice(0, 5).map(x => Object.assign({ tipo: 'mc' }, x)); const usa = new Set(); const p = [];
    while (p.length < 3) { const x = par(); if (!usa.has(x.certa)) { usa.add(x.certa); p.push(x); } }
    return [p[0], q[0], ordemLeis(), q[1], p[1], q[2], ordemLeis(), q[3], p[2], q[4]]; } });
