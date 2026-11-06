/* Vila da Arte dentro do Mundo: área secreta que só existe para quem digitou o código ARTE.
   Carregado pelo mundo/index.html antes do mundo.js (e só depois do código). Define window.VILA_ARTE, que o mundo.js
   acrescenta como vila a leste da Escola dos Professores, e as perguntas dos moradores (uma linguagem da Arte por morador).
   Tudo segue as habilidades de Arte da BNCC do 6º ao 9º ano (EF69AR01 a EF69AR35). */
(function () {
  if (!window.ARTE || !ARTE.liberado()) return;

  // alternativa certa em posição fixa por pergunta (o progresso de cada uma fica salvo), sem repetir alternativas
  const hash = s => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; };
  function Q(enun, certa, erradas, coment) {
    const alts = [certa];
    for (const e of erradas) if (alts.length < 4 && !alts.includes(e)) alts.push(e);
    const r = hash(enun) % alts.length, ord = alts.slice(r).concat(alts.slice(0, r));
    return { enun, alts: ord, certa: ord.indexOf(certa), coment: coment || '' };
  }

  /* ---------- perguntas dos moradores: uma linguagem por morador ---------- */
  const BANCOS = [
    { id: 'av', tema: 'Artes visuais', ic: '🖌️', habs: ['EF69AR01', 'EF69AR02', 'EF69AR04', 'EF69AR05', 'EF69AR08'], lista: [
      Q('Quais são as três cores primárias usadas na pintura com tintas, no ensino de arte?', 'Vermelho, amarelo e azul', ['Verde, laranja e roxo', 'Preto, branco e cinza', 'Rosa, marrom e bege'], 'Misturando as primárias, obtemos as secundárias: laranja, verde e roxo (violeta).'),
      Q('Misturando tinta azul com tinta amarela, que cor aparece?', 'Verde', ['Laranja', 'Roxo', 'Marrom'], 'Azul + amarelo = verde. Vermelho + amarelo = laranja. Vermelho + azul = roxo.'),
      Q('Qual é a cor complementar do vermelho no círculo cromático das tintas?', 'Verde', ['Laranja', 'Rosa', 'Amarelo'], 'Complementares ficam em lados opostos do círculo. Lado a lado, uma faz a outra parecer mais forte.'),
      Q('Qual destes grupos reúne só cores quentes?', 'Vermelho, laranja e amarelo', ['Azul, verde e roxo', 'Azul, laranja e cinza', 'Verde, amarelo e azul'], 'Cores quentes lembram fogo e sol; as frias (azul, verde, roxo) lembram água e sombra.'),
      Q('Ponto, linha, forma, cor, textura e espaço são chamados de...', 'Elementos da linguagem visual', ['Gêneros musicais', 'Fatores do movimento', 'Partes do teatro'], 'A BNCC pede que você analise esses elementos ao apreciar obras (EF69AR04).'),
      Q('Uma obra que você pode ver de todos os lados e que ocupa espaço em três dimensões é...', 'Uma escultura', ['Uma aquarela', 'Um desenho a lápis', 'Uma fotografia impressa'], 'Escultura é tridimensional: tem altura, largura e profundidade.'),
      Q('Na xilogravura, muito usada nas capas de cordel, a imagem é gravada em...', 'Madeira', ['Vidro', 'Tecido', 'Areia'], 'Xilo vem do grego e quer dizer madeira. A matriz entalhada recebe tinta e é carimbada no papel.'),
      Q('Tarsila do Amaral pintou o Abaporu em 1928. Ele é uma obra de qual movimento?', 'Modernismo brasileiro', ['Barroco mineiro', 'Renascimento italiano', 'Arte rupestre'], 'O Abaporu inspirou o Manifesto Antropófago, de Oswald de Andrade.'),
      Q('A Semana de Arte Moderna, que marcou o modernismo no Brasil, aconteceu em São Paulo no ano de...', '1922', ['1822', '1500', '1988'], 'Ela aconteceu no Theatro Municipal de São Paulo, cem anos depois da Independência.'),
      Q('Aleijadinho esculpiu os profetas em pedra-sabão de Congonhas (MG). Essa arte pertence ao...', 'Barroco mineiro', ['Modernismo', 'Grafite', 'Arte digital'], 'O barroco mineiro tem igrejas ricas em detalhes, curvas e dourados, do século 18.'),
      Q('Na cerâmica marajoara, da Ilha de Marajó (PA), o que mais chama a atenção?', 'Grafismos geométricos feitos por povos indígenas antigos', ['Fotografias coladas', 'Tinta spray', 'Letras do alfabeto latino'], 'É uma das produções artísticas mais antigas do Brasil, com mais de mil anos.'),
      Q('Quem escolhe as obras, organiza e dá sentido a uma exposição é o...', 'Curador', ['Artesão', 'Plateia', 'Bilheteiro'], 'EF69AR08 pede que você diferencie artista, artesão, curador, designer e produtor cultural.'),
      Q('Grafite, histórias em quadrinhos e arte digital são...', 'Formas de expressão das artes visuais', ['Só passatempos, não são arte', 'Gêneros de dança', 'Estilos de teatro'], 'EF69AR05 cita desenho, pintura, colagem, quadrinhos, gravura, escultura, fotografia, vídeo e arte digital.'),
      Q('Numa pintura, o que é a perspectiva?', 'Um jeito de dar sensação de profundidade numa superfície plana', ['A assinatura do artista', 'A moldura do quadro', 'O preço da obra'], 'Coisas mais distantes aparecem menores e as linhas parecem se encontrar num ponto de fuga.'),
      Q('Uma colagem é feita...', 'Juntando e colando pedaços de materiais diferentes', ['Só com tinta a óleo', 'Esculpindo pedra', 'Gravando som'], 'Revistas, tecidos, papéis e fotos podem virar uma imagem nova.'),
      Q('Escala, numa obra visual, tem a ver com...', 'O tamanho de uma coisa em relação a outra', ['A cor mais escura', 'O som do pincel', 'O nome do museu'], 'Mudar a escala (um objeto gigante, uma pessoa minúscula) muda o efeito da obra.')
    ] },
    { id: 'mu', tema: 'Música', ic: '🎵', habs: ['EF69AR16', 'EF69AR18', 'EF69AR19', 'EF69AR20', 'EF69AR21', 'EF69AR22', 'EF69AR23'], lista: [
      Q('O que diferencia um som grave de um som agudo?', 'A altura', ['A intensidade', 'O timbre', 'A duração'], 'Altura: grave ou agudo. Intensidade: forte ou fraco. Timbre: a "cor" de cada som.'),
      Q('Um som forte ou fraco: qual elemento da música é esse?', 'Intensidade', ['Altura', 'Timbre', 'Melodia'], 'Intensidade é o volume. Na partitura, f quer dizer forte e p quer dizer piano (suave).'),
      Q('Por que reconhecemos uma flauta e um violino tocando a mesma nota?', 'Porque eles têm timbres diferentes', ['Porque um é mais rápido', 'Porque a nota muda sozinha', 'Porque o violino é sempre mais grave'], 'Timbre é a qualidade que identifica a fonte sonora, como a voz de cada pessoa.'),
      Q('Andamento, na música, é...', 'A velocidade da música', ['O nome do cantor', 'A letra da canção', 'O tipo de instrumento'], 'Pode ser medido em batidas por minuto (BPM). Lento, moderado ou rápido.'),
      Q('Quantas linhas tem o pentagrama, onde se escrevem as notas?', '5', ['4', '7', '3'], 'Penta quer dizer cinco. As notas ficam nas linhas e nos espaços entre elas.'),
      Q('Quais são as sete notas musicais, na ordem?', 'Dó, ré, mi, fá, sol, lá, si', ['Dó, mi, ré, fá, lá, sol, si', 'Lá, si, dó, mi, ré, sol, fá', 'Sol, fá, mi, ré, dó, si, lá'], 'Depois do si, a sequência recomeça no dó, uma oitava acima.'),
      Q('Uma partitura criativa (ou não convencional) é...', 'Um registro do som com desenhos, cores e símbolos inventados', ['Uma partitura proibida', 'Uma música sem som', 'Um instrumento eletrônico'], 'EF69AR22 pede que você conheça a notação tradicional e também as partituras criativas.'),
      Q('Chiquinha Gonzaga compôs "Ó Abre Alas" em 1899. Ela é lembrada como...', 'A primeira mulher a reger uma orquestra no Brasil e pioneira da marchinha de carnaval', ['Inventora do violão', 'Primeira cantora de rock do mundo', 'Criadora da ópera'], 'Ela enfrentou muito preconceito para viver de música no século 19.'),
      Q('Heitor Villa-Lobos misturou música de concerto com temas brasileiros. Uma série famosa dele é...', 'Bachianas Brasileiras', ['Asa Branca', 'Garota de Ipanema', 'Aquarela do Brasil'], 'Nas Bachianas, Villa-Lobos juntou o estilo de Bach com ritmos e melodias do Brasil.'),
      Q('Luiz Gonzaga, autor de "Asa Branca", ficou conhecido como o Rei do...', 'Baião', ['Rock', 'Samba-enredo', 'Frevo'], 'Sanfona, zabumba e triângulo formam o trio típico do baião e do forró.'),
      Q('Um jingle é...', 'Uma música curta feita para propaganda', ['Uma dança em roda', 'Um tipo de partitura', 'Um instrumento de sopro'], 'EF69AR23 cita a criação de jingles, trilhas sonoras e arranjos.'),
      Q('Bater palmas, estalar os dedos e bater no peito para fazer ritmo é usar...', 'Percussão corporal', ['Notação tradicional', 'Instrumento de corda', 'Música eletrônica'], 'O corpo também é fonte sonora. Grupos como o Barbatuques são conhecidos por isso.'),
      Q('Violão, cavaquinho e violino são instrumentos de...', 'Cordas', ['Sopro', 'Percussão', 'Teclas'], 'Flauta e trompete são de sopro; zabumba e pandeiro, de percussão.'),
      Q('Uma trilha sonora num filme serve para...', 'Criar clima e emoção para as cenas', ['Mostrar os créditos', 'Substituir os atores', 'Aumentar a tela'], 'Repare como a mesma cena muda com uma música de suspense ou de comédia.'),
      Q('Rádio, plataformas de streaming, shows e escolas de música são...', 'Meios e lugares por onde a música circula', ['Gêneros musicais', 'Notas musicais', 'Instrumentos'], 'EF69AR17 pede que você analise esses meios de circulação da música.'),
      Q('A melodia de uma canção é...', 'A sequência de sons de alturas diferentes que a gente consegue cantarolar', ['Só a batida da bateria', 'O volume da música', 'O nome do compositor'], 'Ritmo organiza o tempo; melodia organiza as alturas no tempo.')
    ] },
    { id: 'da', tema: 'Dança', ic: '💃', habs: ['EF69AR09', 'EF69AR10', 'EF69AR11', 'EF69AR12', 'EF69AR13', 'EF69AR14', 'EF69AR15'], lista: [
      Q('Segundo a BNCC (EF69AR11), quais são os fatores do movimento?', 'Tempo, peso, fluência e espaço', ['Cor, linha, forma e ponto', 'Altura, timbre, ritmo e melodia', 'Figurino, cenário, luz e som'], 'São os fatores estudados por Rudolf Laban. Combinados, geram as ações do corpo.'),
      Q('Um movimento firme, como empurrar uma parede, e um leve, como soprar uma pena, diferem no fator...', 'Peso', ['Tempo', 'Fluência', 'Espaço'], 'Peso: forte (firme) ou leve.'),
      Q('Um movimento súbito ou sustentado: qual fator do movimento é esse?', 'Tempo', ['Peso', 'Espaço', 'Fluência'], 'Tempo: rápido e repentino ou lento e prolongado.'),
      Q('Dançar deitado no chão, de pé ou pulando é explorar os...', 'Níveis baixo, médio e alto', ['Fatores de timbre', 'Planos de fundo', 'Cenários'], 'Os níveis mostram a altura do corpo em relação ao chão.'),
      Q('O frevo, de Pernambuco, é dançado com...', 'Um pequeno guarda-chuva colorido', ['Uma espada', 'Patins', 'Uma bola'], 'O frevo é patrimônio cultural imaterial da humanidade pela UNESCO desde 2012.'),
      Q('A capoeira mistura luta, dança, música e jogo. Ela tem origem...', 'Afro-brasileira', ['Japonesa', 'Russa', 'Nórdica'], 'A roda de capoeira é patrimônio imaterial da humanidade pela UNESCO desde 2014.'),
      Q('O que é coreografia?', 'A sequência de movimentos organizada para uma dança', ['O figurino dos bailarinos', 'A música da dança', 'O palco'], 'Coreógrafo é quem cria ou organiza essa sequência.'),
      Q('Improvisar em dança é...', 'Criar movimentos na hora, a partir de um estímulo', ['Copiar um vídeo passo a passo', 'Ficar parado', 'Decorar uma coreografia antiga'], 'EF69AR12 pede que você improvise para criar um vocabulário de movimentos seu.'),
      Q('Figurino, iluminação, cenário e trilha sonora numa apresentação de dança fazem parte da...', 'Composição cênica', ['Notação musical', 'Escultura', 'Arquitetura'], 'EF69AR14 pede que você experimente esses elementos e também espaços não convencionais, como o pátio.'),
      Q('O Grupo Corpo, de Belo Horizonte, é conhecido por...', 'Dança contemporânea com trilhas de compositores brasileiros', ['Só balé clássico europeu', 'Teatro de bonecos', 'Pintura em murais'], 'EF69AR09 pede que você aprecie grupos brasileiros e estrangeiros de dança.'),
      Q('Quando alguém diz que "dança não é coisa de menino", isso é...', 'Um estereótipo que a gente deve questionar', ['Uma regra da dança', 'Uma lei', 'Uma técnica de alongamento'], 'EF69AR15 pede que você discuta e problematize estereótipos e preconceitos na dança.'),
      Q('Ciranda, quadrilha e coco são exemplos de...', 'Danças coletivas da cultura popular brasileira', ['Instrumentos de sopro', 'Técnicas de pintura', 'Estilos de teatro grego'], 'EF69AR13 sugere usar essas danças como ponto de partida para criar danças autorais.'),
      Q('Fluência livre é um movimento que...', 'Flui sem interrupção, difícil de parar de repente', ['Para a cada segundo', 'Fica sempre no chão', 'Usa só as mãos'], 'Fluência controlada é o contrário: dá para interromper a qualquer momento.'),
      Q('O balé clássico surgiu nas cortes da...', 'Europa, entre os séculos 15 e 17', ['Antiguidade egípcia', 'América do Sul do século 20', 'Ásia, no ano 2000'], 'Nasceu nas cortes italianas e francesas; a dança contemporânea veio muito depois e quebrou várias regras dele.')
    ] },
    { id: 'te', tema: 'Teatro', ic: '🎭', habs: ['EF69AR24', 'EF69AR25', 'EF69AR26', 'EF69AR27', 'EF69AR28', 'EF69AR29', 'EF69AR30'], lista: [
      Q('Sonoplastia, no teatro, é...', 'Os sons e ruídos que acompanham a cena', ['A roupa dos atores', 'O texto da peça', 'A bilheteria'], 'Porta rangendo, chuva, passos: tudo isso é sonoplastia (EF69AR26).'),
      Q('Os objetos que os atores usam em cena, como um chapéu, uma bengala ou uma carta, são os...', 'Adereços', ['Figurinos', 'Cenários', 'Ensaios'], 'Figurino é a roupa; adereço é o objeto; cenário é o espaço onde a cena acontece.'),
      Q('Quem escreve o texto de uma peça de teatro é o...', 'Dramaturgo', ['Iluminador', 'Cenógrafo', 'Contrarregra'], 'Dramaturgia é a escrita para a cena. Você também pode criar a sua (EF69AR27).'),
      Q('A pessoa que coordena a montagem e orienta os atores é...', 'O diretor ou a diretora', ['O figurinista', 'O público', 'O bilheteiro'], 'EF69AR28 pede que você experimente as diferentes funções teatrais.'),
      Q('No teatro grego antigo, os dois gêneros principais eram...', 'Tragédia e comédia', ['Novela e telejornal', 'Ópera e musical', 'Stand-up e circo'], 'As duas máscaras, uma triste e outra alegre, viraram símbolo do teatro.'),
      Q('Na commedia dell\'arte, da Itália, os atores...', 'Usavam máscaras e personagens fixos, improvisando a partir de um roteiro', ['Liam o texto sentados', 'Nunca falavam', 'Só cantavam ópera'], 'Arlequim e Colombina são personagens famosos dela.'),
      Q('O Teatro do Oprimido, criado por Augusto Boal, propõe que...', 'A plateia participe e entre em cena para mudar a história', ['A plateia fique em silêncio absoluto', 'Só profissionais possam atuar', 'Não haja diálogo'], 'Boal é um dos teatrólogos brasileiros mais conhecidos no mundo.'),
      Q('Improvisação teatral é...', 'Criar a cena na hora, a partir de uma situação ou estímulo', ['Ler o texto de trás para frente', 'Ensaiar por meses a mesma fala', 'Só montar o cenário'], 'EF69AR29 pede que você experimente gestos, corpo e voz no jogo cênico.'),
      Q('Teatro de rua, teatro de bonecos e teatro de sombras são...', 'Diferentes estilos e formas de fazer teatro', ['Tipos de pintura', 'Gêneros musicais', 'Passos de dança'], 'EF69AR25 pede que você identifique estilos cênicos no tempo e no espaço.'),
      Q('O mamulengo, de Pernambuco, é uma forma tradicional de teatro de...', 'Bonecos', ['Sombras chinesas', 'Ópera', 'Mímica'], 'Os bonecos de madeira contam histórias cômicas e conversam com a plateia.'),
      Q('Um espaço cênico não convencional pode ser...', 'Um pátio, uma escada ou uma praça', ['Só o palco italiano', 'Só o cinema', 'Só a televisão'], 'EF69AR27 pede que você pesquise e crie espaços cênicos novos.'),
      Q('A relação entre quem faz a cena e quem assiste se chama relação com o...', 'Espectador', ['Cenógrafo', 'Dramaturgo', 'Iluminador'], 'EF69AR30 pede que você pense nessa relação ao compor uma cena.'),
      Q('Martins Pena estreou "O Juiz de Paz da Roça" em 1838. Ele é conhecido como o criador da...', 'Comédia de costumes no Brasil', ['Tragédia grega', 'Ópera italiana', 'Novela de televisão'], 'Suas peças riam dos costumes da sociedade brasileira do século 19.'),
      Q('Mudar a voz, o jeito de andar e os gestos para viver alguém diferente de você é...', 'Construir um personagem', ['Fazer um cenário', 'Escrever uma partitura', 'Pintar um mural'], 'Corpo e voz são as primeiras ferramentas do ator e da atriz.')
    ] },
    { id: 'ai', tema: 'Arte, cultura e tecnologia', ic: '🌺', habs: ['EF69AR31', 'EF69AR32', 'EF69AR33', 'EF69AR34', 'EF69AR35'], lista: [
      Q('Patrimônio cultural imaterial é...', 'Saberes, celebrações, danças, músicas e modos de fazer de um povo', ['Só prédios antigos', 'Só obras de museus europeus', 'Objetos que podem ser vendidos'], 'Prédios e objetos são patrimônio material; festas, saberes e rituais, imaterial (EF69AR34).'),
      Q('Qual destes é patrimônio cultural imaterial do Brasil?', 'O samba de roda do Recôncavo Baiano', ['A Torre Eiffel', 'Um celular novo', 'Uma rodovia'], 'O samba de roda foi reconhecido pela UNESCO em 2005.'),
      Q('O bumba meu boi, do Maranhão, junta...', 'Dança, música, teatro e figurino numa mesma festa', ['Só pintura em tela', 'Só esporte', 'Só arquitetura'], 'É um ótimo exemplo de artes integradas: várias linguagens juntas.'),
      Q('A arte Kusiwa, dos povos Wajãpi do Amapá, é...', 'Uma pintura corporal e arte gráfica indígena', ['Uma dança de salão', 'Uma escultura de mármore', 'Um gênero de rock'], 'Foi reconhecida pela UNESCO como patrimônio imaterial em 2003.'),
      Q('Problematizar narrativas eurocêntricas na arte quer dizer...', 'Questionar a ideia de que só a arte europeia é "a verdadeira arte"', ['Proibir a arte europeia', 'Estudar só a Europa', 'Copiar obras europeias'], 'EF69AR33: a arte indígena, africana e popular também é arte, e não só "artesanato" ou "folclore".'),
      Q('Usar um aplicativo de edição para criar uma animação é um exemplo de...', 'Arte e tecnologia', ['Dança de salão', 'Teatro grego', 'Xilogravura'], 'EF69AR35 pede uso reflexivo, ético e responsável das tecnologias digitais na arte.'),
      Q('Antes de postar a foto de uma obra de outra pessoa, o que é ético fazer?', 'Dar o crédito à autora ou ao autor', ['Dizer que fui eu que fiz', 'Apagar a assinatura', 'Vender a imagem'], 'Direito autoral e crédito valem também na internet.'),
      Q('Um videoclipe junta quais linguagens?', 'Música, imagem, dança e às vezes teatro', ['Só música', 'Só escultura', 'Só arquitetura'], 'EF69AR32 pede que você analise as relações entre linguagens em projetos temáticos.'),
      Q('A festa do Círio de Nazaré, em Belém (PA), é patrimônio imaterial porque...', 'É uma celebração com saberes, música e tradição de muita gente', ['É um prédio muito alto', 'É vendida em lojas', 'Foi inventada no ano passado'], 'Celebrações são uma das categorias do patrimônio imaterial registradas pelo IPHAN.'),
      Q('Um artista que pinta um mural sobre o racismo está relacionando a arte com a dimensão...', 'Social e política', ['Só decorativa', 'Só matemática', 'Só esportiva'], 'EF69AR31: a arte se liga à vida social, cultural, política, histórica, econômica e ética.'),
      Q('Qual é o órgão federal que cuida do patrimônio histórico e artístico no Brasil?', 'IPHAN', ['INEP', 'IBGE', 'ANATEL'], 'Instituto do Patrimônio Histórico e Artístico Nacional.'),
      Q('Arte, artesanato, folclore e design: a BNCC pede que você...', 'Analise essas categorias e quem decide o que é chamado de "arte"', ['Decore uma lista de definições', 'Escolha só uma e ignore as outras', 'Considere o artesanato inferior'], 'EF69AR33 propõe discutir essas categorias, sem hierarquia automática.'),
      Q('Uma peça de teatro com música ao vivo e projeção de vídeo é um exemplo de...', 'Artes integradas', ['Escultura', 'Notação musical', 'Pintura rupestre'], 'Várias linguagens combinadas num mesmo projeto.'),
      Q('Fotografar com o celular uma apresentação da turma e compartilhar com as famílias é...', 'Registrar e compartilhar práticas artísticas', ['Proibido pela BNCC', 'Uma dança', 'Um tipo de escultura'], 'Lembre de pedir autorização para usar a imagem das pessoas.')
    ] }
  ];
  window.PERGUNTAS_NPC = window.PERGUNTAS_NPC || {};
  window.PERGUNTAS_NPC.arte = BANCOS.map(b => ({ tema: b.tema, ic: b.ic, eixos: [], habs: b.habs, lista: b.lista }));
  const perguntas = BANCOS.flatMap(b => b.lista.map((q, i) => Object.assign({ id: `arte:${b.id}:${i}`, eixos: [], habs: b.habs }, q)));

  /* ---------- o que cada morador conta numa conversa (muda a cada dia) ---------- */
  const FALAS = [
    ['Na BNCC, Arte tem quatro linguagens: artes visuais, dança, música e teatro. E ainda as artes integradas, que juntam todas elas.',
      'Antes de dizer se gosta de uma obra, tente descrever: que linhas, cores e formas você vê? Isso é apreciar.',
      'Gravura é uma técnica de cópia: você grava a matriz uma vez e imprime várias vezes. O cordel usa muito a xilogravura.',
      'Uma obra pode ser feita com qualquer material: papelão, sucata, luz, até o próprio corpo. A escolha do material também conta uma história.'],
    ['Altura, intensidade, timbre, duração: são as propriedades do som. Fecha os olhos e escuta o pátio: quantos timbres você percebe?',
      'Uma partitura não precisa ser só de bolinhas no pentagrama. Você pode inventar símbolos para os sons e ensinar a turma a ler.',
      'O samba, o baião, o funk e o rap contam a história de quem fez cada um. Música também é documento de uma época.',
      'No meu estúdio dá para montar uma batida com bumbo, caixa, chimbal e palmas. Vem experimentar!'],
    ['Tempo, peso, fluência e espaço: com esses quatro fatores dá para transformar qualquer gesto do dia a dia em dança.',
      'Escovar os dentes em câmera lenta, no nível baixo e com peso firme já vira um movimento dançado. Experimente!',
      'Ciranda, frevo, jongo, hip-hop, balé: cada dança nasceu de um lugar e de um grupo de pessoas.',
      'Na Caixa de improviso tem cartas de dança: tire uma e crie um movimento com a turma.'],
    ['Teatro não é só o ator: tem dramaturgia, direção, cenário, figurino, luz, sonoplastia e quem assiste.',
      'Um mesmo texto muda muito com outra luz ou outro figurino. Experimente ler uma fala alegre com voz triste.',
      'O teatro pode acontecer na rua, numa escada da escola ou numa praça. O espaço cênico também se inventa.',
      'Na Caixa de improviso eu sorteio personagem, lugar e problema. Vocês têm um minuto para combinar a cena!'],
    ['Patrimônio cultural não é só prédio antigo: o modo de fazer queijo, uma festa ou uma dança também são patrimônio.',
      'Quem decide o que é arte e o que é artesanato? Essa pergunta tem muita história e vale uma boa conversa.',
      'Um videoclipe junta música, imagem, dança e às vezes teatro. São as artes integradas.',
      'Usou a obra de alguém num trabalho ou numa postagem? Dê o crédito. Isso também é cuidar da arte.']
  ];

  /* ---------- casas da vila: desafios aqui mesmo no Mundo (a 1ª alternativa é a certa) e páginas da vila ---------- */
  const D = (id, titulo, icone, resumo, qs) => ({ id: 'arte-' + id, titulo, icone, resumo, tipo: 'em', desafio: { id: 'arte-' + id, titulo, icone, eixos: [], resumo, qs } });
  const P = (id, icone, titulo, url, resumo) => ({ id: 'arte-' + id, icone, titulo, url: 'arte/' + url, resumo, tipo: 'jogo' });
  const lugares = [
    P('bncc', '📚', 'Biblioteca da BNCC de Arte', 'bncc.html', 'As 35 habilidades de Arte do 6º ao 9º ano explicadas em palavras simples, com uma atividade para cada uma.'),
    P('cores', '🎨', 'Ateliê das cores', 'cores.html', 'Misture tintas, ache complementares e separe cores quentes e frias no círculo cromático.'),
    P('ritmo', '🥁', 'Estúdio de ritmo', 'ritmo.html', 'Monte uma batida com bumbo, caixa, chimbal e palmas e mude o andamento.'),
    P('improviso', '🎭', 'Caixa de improviso', 'improviso.html', 'Cartas de teatro e de dança para criar cenas e movimentos com a turma.'),
    D('av', 'Galeria de artes visuais', '🖼️', 'Elementos da linguagem visual, técnicas e artistas.', [
      { enun: 'Ao analisar uma obra, você observa linhas, cores, formas e o espaço. Que habilidade da BNCC é essa?', alts: ['Analisar os elementos constitutivos das artes visuais', 'Compor uma trilha sonora', 'Criar uma coreografia', 'Montar um cenário'], coment: 'É a EF69AR04: ponto, linha, forma, direção, cor, tom, escala, dimensão, espaço e movimento.' },
      { enun: 'Que técnica usa uma matriz de madeira entalhada para imprimir imagens, como nas capas de cordel?', alts: ['Xilogravura', 'Aquarela', 'Mosaico', 'Grafite'], coment: 'A gravura permite várias cópias da mesma matriz.' },
      { enun: 'Quem pintou o Abaporu (1928), obra símbolo do modernismo brasileiro?', alts: ['Tarsila do Amaral', 'Aleijadinho', 'Chiquinha Gonzaga', 'Augusto Boal'], coment: 'Tarsila participou do movimento antropofágico com Oswald de Andrade.' },
      { enun: 'Qual é a cor complementar do azul no círculo das tintas?', alts: ['Laranja', 'Verde', 'Roxo', 'Azul-claro'], coment: 'Complementares ficam opostas no círculo: azul e laranja, vermelho e verde, amarelo e roxo.' },
      { enun: 'Quem organiza uma exposição, escolhendo e relacionando as obras?', alts: ['Curador', 'Artesão', 'Cenógrafo', 'Dramaturgo'], coment: 'EF69AR08: artista, artesão, produtor cultural, curador e designer têm papéis diferentes.' }
    ]),
    D('mu', 'Coreto da música', '🎺', 'Propriedades do som, notação e música brasileira.', [
      { enun: 'Grave ou agudo: qual propriedade do som é essa?', alts: ['Altura', 'Intensidade', 'Timbre', 'Andamento'], coment: 'Altura diz se o som é grave ou agudo; intensidade, se é forte ou fraco.' },
      { enun: 'O que nos permite saber que uma voz é da nossa mãe, mesmo sem ver quem fala?', alts: ['O timbre', 'A altura', 'O andamento', 'A partitura'], coment: 'Timbre é a "cor" do som de cada voz ou instrumento.' },
      { enun: 'Desenhar os sons com símbolos inventados, cores e formas é fazer...', alts: ['Uma partitura criativa', 'Uma escultura', 'Um figurino', 'Uma coreografia'], coment: 'EF69AR22 inclui partituras criativas e procedimentos da música contemporânea.' },
      { enun: 'Que instrumentos formam o trio típico do baião de Luiz Gonzaga?', alts: ['Sanfona, zabumba e triângulo', 'Piano, violino e harpa', 'Guitarra, baixo e bateria', 'Flauta, oboé e fagote'], coment: 'É também a formação clássica do forró pé de serra.' },
      { enun: 'Uma música curta para propaganda se chama...', alts: ['Jingle', 'Ópera', 'Sinfonia', 'Ciranda'], coment: 'EF69AR23: improvisações, composições, arranjos, jingles e trilhas sonoras.' }
    ]),
    D('da', 'Salão de dança', '🩰', 'Fatores do movimento, níveis e danças brasileiras.', [
      { enun: 'Quais são os fatores do movimento segundo a BNCC?', alts: ['Tempo, peso, fluência e espaço', 'Cor, forma, linha e ponto', 'Altura, timbre, ritmo e melodia', 'Texto, cenário, luz e som'], coment: 'EF69AR11. Combinados, eles geram as ações corporais.' },
      { enun: 'Socar o ar com força e flutuar como uma pluma mostram diferenças de...', alts: ['Peso', 'Nível', 'Figurino', 'Timbre'], coment: 'Peso firme ou leve.' },
      { enun: 'Que dança pernambucana usa uma sombrinha colorida e é patrimônio imaterial da humanidade?', alts: ['Frevo', 'Tango', 'Valsa', 'Balé'], coment: 'O frevo foi reconhecido pela UNESCO em 2012.' },
      { enun: 'Criar movimentos na hora, a partir de uma música ou de uma palavra, é...', alts: ['Improvisar', 'Decorar', 'Copiar', 'Ensaiar o mesmo passo'], coment: 'EF69AR12: a improvisação ajuda a construir um vocabulário de movimentos próprio.' },
      { enun: 'Dançar no pátio ou na escada da escola é usar um espaço...', alts: ['Não convencional', 'Proibido', 'Só de teatro', 'Só de música'], coment: 'EF69AR14 pede espaços convencionais e não convencionais.' }
    ]),
    D('te', 'Teatrinho da vila', '🎪', 'Elementos da cena, funções teatrais e estilos.', [
      { enun: 'Os sons de chuva, passos e porta rangendo numa peça são a...', alts: ['Sonoplastia', 'Dramaturgia', 'Coreografia', 'Cenografia'], coment: 'EF69AR26: figurinos, adereços, cenário, iluminação e sonoplastia.' },
      { enun: 'Quem escreve o texto de uma peça?', alts: ['O dramaturgo', 'O iluminador', 'O figurinista', 'O espectador'], coment: 'Dramaturgia é a escrita para a cena.' },
      { enun: 'No Teatro do Oprimido, de Augusto Boal, o que a plateia pode fazer?', alts: ['Entrar em cena e propor outro final', 'Só aplaudir no final', 'Ficar de costas', 'Nada, é proibido falar'], coment: 'A plateia vira "espect-ator": quem assiste também age.' },
      { enun: 'Um chapéu, uma bengala ou uma carta que o ator usa em cena são...', alts: ['Adereços', 'Figurinos', 'Cenários', 'Roteiros'], coment: 'Figurino é a roupa; adereço é o objeto de cena.' },
      { enun: 'O mamulengo, de Pernambuco, é um teatro de...', alts: ['Bonecos', 'Sombras', 'Máscaras gregas', 'Ópera'], coment: 'EF69AR25: estilos cênicos de diferentes tempos e lugares.' }
    ]),
    D('ai', 'Casa do patrimônio', '🏺', 'Patrimônio cultural, artes integradas e tecnologia.', [
      { enun: 'Qual destes é patrimônio cultural imaterial?', alts: ['O samba de roda do Recôncavo Baiano', 'Uma ponte de concreto', 'Um quadro à venda numa loja', 'Um celular'], coment: 'EF69AR34: patrimônio material e imaterial, com matrizes indígenas, africanas e europeias.' },
      { enun: 'Bumba meu boi junta dança, música, teatro e figurino. Isso é um exemplo de...', alts: ['Artes integradas', 'Só artes visuais', 'Só música', 'Escultura'], coment: 'EF69AR32: relações entre diversas linguagens.' },
      { enun: 'Que órgão federal registra e protege o patrimônio cultural brasileiro?', alts: ['IPHAN', 'IBGE', 'INEP', 'ANATEL'], coment: 'Instituto do Patrimônio Histórico e Artístico Nacional.' },
      { enun: 'Você vai postar a foto de uma escultura de um colega. O que fazer?', alts: ['Pedir autorização e dar o crédito', 'Dizer que a obra é sua', 'Cortar a assinatura', 'Postar sem falar nada'], coment: 'EF69AR35: usar a tecnologia de modo reflexivo, ético e responsável.' },
      { enun: 'Achar que só a arte europeia é "arte de verdade" e o resto é "artesanato" é uma visão...', alts: ['Eurocêntrica, que a BNCC pede para questionar', 'Correta e científica', 'Obrigatória', 'Da dança contemporânea'], coment: 'EF69AR33: problematizar narrativas eurocêntricas e as categorizações da arte.' }
    ])
  ];

  window.VILA_ARTE = {
    id: 'arte', nome: 'Vila da Arte', sub: 'Área secreta · Arte da BNCC (6º ao 9º ano)', ano: 6, caminho: '#f6c8de', marco: 'cavalete', icone: '🎨',
    aberta: true, secreta: true, lugares, perguntasProprias: perguntas,
    metaJogar: 5, metaPerg: 10, nNpc: BANCOS.length, nItens: 8,
    nomesNpc: ['Professora Iara', 'Mestre Bento', 'Nara', 'Caio', 'Dona Ciça'],
    falasNpc: FALAS,
    placa: 'Bem-vindo à Vila da Arte, uma parte secreta do Mundo! Cada morador cuida de uma linguagem da Arte: artes visuais, música, dança, teatro e patrimônio cultural. Converse com todos, responda às perguntas e entre nas casas: tem desafios, um ateliê de cores, um estúdio de ritmo, uma caixa de improviso e a biblioteca com as habilidades de Arte da BNCC.'
  };
})();
