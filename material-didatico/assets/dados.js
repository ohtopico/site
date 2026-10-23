/* =====================================================================
   Base de dados do repositório — edite aqui para incluir novos materiais.
   - HABILIDADES: habilidades da BNCC (textos resumidos; consulte o documento oficial).
   - RECURSOS: tudo o que aparece no catálogo (jogos, fichas e planos).
   - PLANOS: conteúdo dos planos de aula (plano.html?id=...).
   ===================================================================== */

const COMPONENTES = {
  CO: { nome: 'Computação', curto: 'Computação' },
  MA: { nome: 'Matemática', curto: 'Matemática' }
};

const TIPOS = {
  jogo:  { nome: 'Jogo',  plural: 'Jogos',  icone: '🎮' },
  ficha: { nome: 'Ficha para imprimir', plural: 'Fichas para imprimir', icone: '🖨️' },
  plano: { nome: 'Plano de aula', plural: 'Planos de aula', icone: '📋' }
};

/* Eixos (Computação) e unidades temáticas (Matemática) */
const EIXOS = {
  PC: { comp: 'CO', nome: 'Pensamento computacional' },
  MD: { comp: 'CO', nome: 'Mundo digital' },
  CD: { comp: 'CO', nome: 'Cultura digital' },
  NU: { comp: 'MA', nome: 'Números' },
  AL: { comp: 'MA', nome: 'Álgebra' },
  GE: { comp: 'MA', nome: 'Geometria' },
  PE: { comp: 'MA', nome: 'Probabilidade e estatística' }
};

/* [código, ano, eixo, objeto de conhecimento, texto resumido] */
const HABILIDADES_RAW = [
  // ---------- Computação · 6º ano ----------
  ['EF06CO01', 6, 'PC', 'Tipos de dados', 'Classificar informações, agrupando-as em coleções (conjuntos) e associando cada coleção a um tipo de dado.'],
  ['EF06CO02', 6, 'PC', 'Linguagem de programação', 'Elaborar algoritmos com instruções sequenciais, de repetição e de seleção usando uma linguagem de programação.'],
  ['EF06CO03', 6, 'PC', 'Linguagem de programação', 'Descrever com precisão a solução de um problema, construindo o programa que implementa essa solução.'],
  ['EF06CO04', 6, 'PC', 'Decomposição', 'Construir soluções de problemas usando a técnica de decomposição e automatizá-las com uma linguagem de programação.'],
  ['EF06CO05', 6, 'PC', 'Generalização', 'Identificar as entradas e as saídas esperadas de um problema, com seus tipos de dados, e definir a solução.'],
  ['EF06CO06', 6, 'PC', 'Generalização', 'Comparar casos particulares de um mesmo problema e criar um algoritmo que resolva todos, usando variáveis (parâmetros).'],
  ['EF06CO07', 6, 'MD', 'Transmissão de dados', 'Entender como a informação é quebrada em pedaços, transmitida em pacotes por vários equipamentos e reconstruída no destino.'],
  ['EF06CO08', 6, 'MD', 'Gestão de dados', 'Compreender e utilizar formas de armazenar, manipular, compactar e recuperar arquivos, documentos e metadados.'],
  ['EF06CO09', 6, 'CD', 'Tecnologia digital e sociedade', 'Apresentar conduta e linguagem apropriadas ao se comunicar em ambiente digital, com ética e respeito.'],
  ['EF06CO10', 6, 'CD', 'Tecnologia digital e sustentabilidade', 'Analisar o consumo de tecnologia na sociedade, a produção dos recursos, a obsolescência e a sustentabilidade.'],
  // ---------- Computação · 7º ano ----------
  ['EF07CO01', 7, 'PC', 'Registros e matrizes', 'Criar soluções que usem registros e matrizes unidimensionais para descrever informações e automatizá-las com uma linguagem de programação.'],
  ['EF07CO02', 7, 'PC', 'Análise de programas', 'Analisar programas para detectar e remover erros, ampliando a confiança na sua correção.'],
  ['EF07CO03', 7, 'PC', 'Projetos com programação', 'Construir soluções computacionais de problemas de diferentes áreas, individual e colaborativamente, escolhendo estruturas de dados e técnicas adequadas.'],
  ['EF07CO04', 7, 'PC', 'Propriedades de grafos', 'Explorar propriedades básicas de grafos.'],
  ['EF07CO05', 7, 'PC', 'Reúso', 'Criar algoritmos usando decomposição e reúso, de forma colaborativa, e automatizá-los com uma linguagem de programação.'],
  ['EF07CO06', 7, 'MD', 'Protocolos de comunicação em redes', 'Compreender o papel de protocolos para a transmissão de dados.'],
  ['EF07CO07', 7, 'MD', 'Segurança cibernética', 'Identificar problemas de segurança cibernética e experimentar formas de proteção.'],
  ['EF07CO08', 7, 'CD', 'Cyberbullying', 'Demonstrar empatia sobre opiniões divergentes na web.'],
  ['EF07CO09', 7, 'CD', 'Cyberbullying', 'Reconhecer e debater sobre cyberbullying.'],
  ['EF07CO10', 7, 'CD', 'Impactos da tecnologia digital', 'Identificar os impactos ambientais do descarte de peças de computadores e eletrônicos e sua relação com a sustentabilidade.'],
  ['EF07CO11', 7, 'CD', 'Produção digital', 'Criar, documentar e publicar produtos (vídeos, podcasts, sites) usando recursos de tecnologia, individual ou colaborativamente.'],
  // ---------- Computação · 8º ano ----------
  ['EF08CO01', 8, 'PC', 'Listas e recursão', 'Construir soluções de problemas usando a técnica de recursão e automatizá-las com uma linguagem de programação.'],
  ['EF08CO02', 8, 'PC', 'Listas e recursão', 'Criar soluções que usem listas para descrever informações e automatizá-las com uma linguagem de programação.'],
  ['EF08CO03', 8, 'PC', 'Algoritmos clássicos', 'Utilizar algoritmos clássicos de manipulação sobre listas.'],
  ['EF08CO04', 8, 'PC', 'Projetos com programação', 'Construir soluções computacionais de problemas de diferentes áreas, individual e colaborativamente.'],
  ['EF08CO05', 8, 'MD', 'Sistemas distribuídos', 'Compreender os conceitos de paralelismo, concorrência e armazenamento/processamento distribuídos.'],
  ['EF08CO06', 8, 'MD', 'Internet', 'Entender como é a estrutura e o funcionamento da internet.'],
  ['EF08CO07', 8, 'CD', 'Redes sociais e segurança da informação', 'Compartilhar informações em redes sociais compreendendo sua dinâmica de funcionamento.'],
  ['EF08CO08', 8, 'CD', 'Redes sociais e segurança da informação', 'Distinguir os tipos de dados pessoais solicitados em espaços digitais e os riscos associados.'],
  ['EF08CO09', 8, 'CD', 'Redes sociais e segurança da informação', 'Analisar criticamente as políticas e os termos de uso das redes sociais e demais plataformas.'],
  ['EF08CO10', 8, 'CD', 'Segurança em ambientes virtuais', 'Discutir questões sobre segurança e privacidade relacionadas ao uso dos ambientes virtuais.'],
  ['EF08CO11', 8, 'CD', 'Uso crítico das mídias digitais', 'Avaliar precisão, relevância, adequação, abrangência e vieses de fontes de informação eletrônica.'],
  // ---------- Computação · 9º ano ----------
  ['EF09CO01', 9, 'PC', 'Grafos e árvores', 'Criar soluções que usem árvores e grafos para descrever informações e automatizá-las com uma linguagem de programação.'],
  ['EF09CO02', 9, 'PC', 'Projetos com programação', 'Construir soluções computacionais de problemas de diferentes áreas, individual e colaborativamente.'],
  ['EF09CO03', 9, 'PC', 'Autômatos e eventos', 'Usar autômatos para descrever comportamentos de forma abstrata, automatizando-os com uma linguagem de programação.'],
  ['EF09CO04', 9, 'MD', 'Segurança cibernética', 'Compreender o funcionamento de malwares e outros ataques cibernéticos.'],
  ['EF09CO05', 9, 'MD', 'Segurança cibernética', 'Analisar técnicas de criptografia para armazenamento e transmissão de dados.'],
  ['EF09CO06', 9, 'CD', 'Tecnologia digital e sociedade', 'Analisar problemas sociais da cidade e do estado a partir de ambientes digitais, propondo soluções.'],
  ['EF09CO07', 9, 'CD', 'Tecnologia digital e sociedade', 'Avaliar aplicações e implicações políticas, socioambientais e culturais das tecnologias digitais.'],
  ['EF09CO08', 9, 'CD', 'Tecnologia digital e sociedade', 'Discutir como a distribuição desigual de recursos de computação na economia global levanta questões éticas.'],
  ['EF09CO09', 9, 'CD', 'Autoria em meio digital', 'Criar ou utilizar conteúdo em meio digital compreendendo questões éticas de direitos autorais e uso de imagem.'],
  ['EF09CO10', 9, 'CD', 'Qualidade da informação', 'Avaliar a veracidade, a credibilidade e a relevância da informação em seus diferentes formatos.'],
  // ---------- Matemática (seleção ligada aos materiais) ----------
  ['EF06MA04', 6, 'NU', 'Fluxograma', 'Construir algoritmo em linguagem natural e representá-lo por fluxograma que resolva um problema simples (por exemplo, saber se um número é par).'],
  ['EF06MA07', 6, 'NU', 'Frações', 'Compreender, comparar e ordenar frações associadas a partes de inteiros e a resultados de divisão, identificando frações equivalentes.'],
  ['EF06MA16', 6, 'GE', 'Plano cartesiano', 'Associar pares ordenados a pontos do plano cartesiano do 1º quadrante, como na localização dos vértices de um polígono.'],
  ['EF06MA34', 6, 'PE', 'Fluxogramas e diagramas', 'Interpretar e desenvolver fluxogramas simples, identificando relações entre objetos (por exemplo, cidades ligadas por estradas).'],
  ['EF07MA03', 7, 'NU', 'Números inteiros', 'Comparar e ordenar números inteiros, associá-los a pontos da reta numérica e usá-los em adições e subtrações.'],
  ['EF07MA05', 7, 'NU', 'Algoritmos', 'Resolver um mesmo problema utilizando diferentes algoritmos.'],
  ['EF07MA07', 7, 'NU', 'Fluxograma', 'Representar por meio de um fluxograma os passos utilizados para resolver um grupo de problemas.'],
  ['EF07MA13', 7, 'AL', 'Variável e incógnita', 'Compreender a ideia de variável, representada por letra ou símbolo, diferenciando-a da ideia de incógnita.'],
  ['EF07MA18', 7, 'AL', 'Equações de 1º grau', 'Resolver e elaborar problemas representados por equações polinomiais de 1º grau redutíveis a ax + b = c, usando as propriedades da igualdade.'],
  ['EF07MA20', 7, 'GE', 'Simetrias no plano cartesiano', 'Reconhecer e representar, no plano cartesiano, o simétrico de figuras em relação aos eixos e à origem.'],
  ['EF08MA06', 8, 'AL', 'Valor numérico', 'Resolver e elaborar problemas que envolvam o cálculo do valor numérico de expressões algébricas, usando as propriedades das operações.'],
  ['EF08MA08', 8, 'AL', 'Sistemas de equações', 'Resolver e elaborar problemas do contexto próximo representados por sistemas de equações de 1º grau com duas incógnitas.'],
  ['EF08MA10', 8, 'AL', 'Sequências', 'Identificar a regularidade de uma sequência não recursiva e construir um fluxograma que indique os próximos termos.'],
  ['EF08MA22', 8, 'PE', 'Probabilidade', 'Calcular a probabilidade de eventos com base no espaço amostral, usando o princípio multiplicativo.']
];

const HABILIDADES = HABILIDADES_RAW.map(([codigo, ano, eixo, objeto, texto]) => ({
  codigo, ano, eixo, objeto, texto, comp: EIXOS[eixo].comp
}));
const HAB = Object.fromEntries(HABILIDADES.map(h => [h.codigo, h]));

/* ---------------------------------------------------------------------
   RECURSOS — url é relativa à pasta material-didatico/
   --------------------------------------------------------------------- */
const RECURSOS = [
  // ---------- Jogos ----------
  { id: 'robo', tipo: 'jogo', titulo: 'Robô Coletor', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF06CO02', 'EF06CO03', 'EF06CO04', 'EF06MA04', 'EF07MA07'], tempo: '15–25 min',
    resumo: 'Monte a sequência de comandos, use a repetição e leve o robô até todas as estrelas com o menor programa possível.',
    url: 'jogos/robo.html', plano: 'p-robo', ficha: 'f-robo' },
  { id: 'pacotes', tipo: 'jogo', titulo: 'Correio de Pacotes', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF06CO07', 'EF07CO06', 'EF08CO06'], tempo: '10–15 min',
    resumo: 'As mensagens chegam picadas e fora de ordem. Remonte os pacotes pelo número e peça de novo os que se perderam no caminho.',
    url: 'jogos/pacotes.html', plano: 'p-internet', ficha: 'f-pacotes' },
  { id: 'rotas', tipo: 'jogo', titulo: 'Rota Mais Curta', comp: ['CO', 'MA'], anos: [6, 7, 9],
    habs: ['EF07CO04', 'EF09CO01', 'EF06MA34'], tempo: '15 min',
    resumo: 'Os bairros são vértices, as ruas são arestas. Encontre o caminho de menor custo e compare com a solução ótima.',
    url: 'jogos/rotas.html', plano: 'p-grafos', ficha: 'f-grafo' },
  { id: 'cifra', tipo: 'jogo', titulo: 'Detetive da Cifra', comp: ['CO'], anos: [9],
    habs: ['EF09CO05'], tempo: '15–20 min',
    resumo: 'Decifre mensagens com a Cifra de César, descubra chaves escondidas e entenda por que ela é fácil de quebrar.',
    url: 'jogos/cifra.html', plano: 'p-cripto', ficha: 'f-cesar' },
  { id: 'golpe', tipo: 'jogo', titulo: 'Golpe ou Seguro?', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF07CO07', 'EF08CO08', 'EF08CO10', 'EF09CO04'], tempo: '10 min',
    resumo: 'Mensagens, links e pedidos de dados chegam o tempo todo. Decida o que é golpe e veja os sinais que denunciam cada um.',
    url: 'jogos/golpe.html', plano: 'p-golpes', ficha: 'f-golpe' },
  { id: 'fracoes', tipo: 'jogo', titulo: 'Corrida das Frações', comp: ['MA'], anos: [6],
    habs: ['EF06MA07'], tempo: '10 min',
    resumo: 'Qual fração é maior? Compare, encontre equivalentes e mantenha a sequência de acertos — primeiro com barras, depois sem.',
    url: 'jogos/fracoes.html', plano: 'p-fracoes', ficha: 'f-fracoes' },
  { id: 'cartesiano', tipo: 'jogo', titulo: 'Tesouro Cartesiano', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA16', 'EF07MA03', 'EF07MA20'], tempo: '10–15 min',
    resumo: 'Marque pontos pelas coordenadas, avance para os quatro quadrantes e encontre os pontos simétricos em relação aos eixos.',
    url: 'jogos/cartesiano.html', plano: 'p-cartesiano', ficha: 'f-batalha' },
  { id: 'balanca', tipo: 'jogo', titulo: 'Balança das Equações', comp: ['MA'], anos: [7, 8],
    habs: ['EF07MA18', 'EF07MA13', 'EF08MA06'], tempo: '15 min',
    resumo: 'Tire o mesmo peso dos dois lados, divida por igual e descubra quanto vale cada caixa x sem desequilibrar a balança.',
    url: 'jogos/balanca.html', plano: 'p-equacoes', ficha: null },

  // ---------- Fichas para imprimir ----------
  { id: 'f-robo', tipo: 'ficha', titulo: 'Programando o colega-robô', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF06CO02', 'EF06CO03', 'EF06MA04'], tempo: '1 aula',
    resumo: 'Atividade desplugada: um aluno programa, o outro executa. Inclui malha, legenda de comandos e fluxograma de par ou ímpar para completar.',
    url: 'ficha.html?id=f-robo', plano: 'p-robo', jogo: 'robo' },
  { id: 'f-decompor', tipo: 'ficha', titulo: 'Decompor para resolver', comp: ['CO'], anos: [6, 7],
    habs: ['EF06CO04', 'EF07CO05'], tempo: '1 aula',
    resumo: 'Organizar uma feira de ciências quebrando o problema em partes menores, identificando tarefas que se repetem e podem ser reaproveitadas.',
    url: 'ficha.html?id=f-decompor', plano: 'p-robo' },
  { id: 'f-pacotes', tipo: 'ficha', titulo: 'Mensagem em pacotes', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF06CO07', 'EF07CO06'], tempo: '1 aula',
    resumo: 'Cartões recortáveis para simular a internet na sala: cada grupo envia uma mensagem em pacotes com cabeçalho e monta a do outro grupo.',
    url: 'ficha.html?id=f-pacotes', plano: 'p-internet', jogo: 'pacotes' },
  { id: 'f-cesar', tipo: 'ficha', titulo: 'Disco da Cifra de César', comp: ['CO'], anos: [8, 9],
    habs: ['EF09CO05'], tempo: '1 aula',
    resumo: 'Dois discos para recortar e montar com um colchete, mais mensagens para cifrar e decifrar em dupla.',
    url: 'ficha.html?id=f-cesar', plano: 'p-cripto', jogo: 'cifra' },
  { id: 'f-grafo', tipo: 'ficha', titulo: 'Mapa dos bairros', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF07CO04', 'EF06MA34'], tempo: '1 aula',
    resumo: 'Grafo com distâncias entre bairros: contar arestas, achar o grau de cada vértice e calcular o caminho mais curto.',
    url: 'ficha.html?id=f-grafo', plano: 'p-grafos', jogo: 'rotas' },
  { id: 'f-fracoes', tipo: 'ficha', titulo: 'Barras de frações', comp: ['MA'], anos: [6],
    habs: ['EF06MA07'], tempo: '1 aula',
    resumo: 'Pintar barras, comparar frações e encontrar equivalentes. Inclui a parede de frações para recortar.',
    url: 'ficha.html?id=f-fracoes', plano: 'p-fracoes', jogo: 'fracoes' },
  { id: 'f-batalha', tipo: 'ficha', titulo: 'Batalha naval cartesiana', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA16', 'EF07MA03'], tempo: '1 aula',
    resumo: 'Duas malhas de −5 a 5 para jogar em dupla, com regras e quadro para anotar os disparos.',
    url: 'ficha.html?id=f-batalha', plano: 'p-cartesiano', jogo: 'cartesiano' },
  { id: 'f-golpe', tipo: 'ficha', titulo: 'Meus dados, minhas regras', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF08CO08', 'EF08CO10'], tempo: '1 aula',
    resumo: 'Classificar dados pessoais por risco e usar um checklist para analisar mensagens suspeitas.',
    url: 'ficha.html?id=f-golpe', plano: 'p-golpes', jogo: 'golpe' },

  // ---------- Planos de aula ----------
  { id: 'p-robo', tipo: 'plano', titulo: 'Algoritmos: do papel ao robô', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF06CO02', 'EF06CO03', 'EF06CO04', 'EF06MA04'], tempo: '2 aulas',
    resumo: 'Sequência, repetição e decomposição com atividade desplugada, fluxograma e o jogo Robô Coletor.',
    url: 'plano.html?id=p-robo' },
  { id: 'p-internet', tipo: 'plano', titulo: 'Como uma mensagem atravessa a internet', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF06CO07', 'EF07CO06', 'EF08CO06'], tempo: '2 aulas',
    resumo: 'Simulação de pacotes na sala, protocolos como combinados e o jogo Correio de Pacotes.',
    url: 'plano.html?id=p-internet' },
  { id: 'p-grafos', tipo: 'plano', titulo: 'Grafos e o caminho mais curto', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF07CO04', 'EF06MA34'], tempo: '2 aulas',
    resumo: 'Do mapa do bairro ao grafo: vértices, arestas, grau e menor caminho.',
    url: 'plano.html?id=p-grafos' },
  { id: 'p-cripto', tipo: 'plano', titulo: 'Segredos em código: criptografia', comp: ['CO'], anos: [9],
    habs: ['EF09CO05', 'EF09CO04'], tempo: '2 aulas',
    resumo: 'Cifra de César com disco de papel, quebra por força bruta e conversa sobre criptografia no celular.',
    url: 'plano.html?id=p-cripto' },
  { id: 'p-golpes', tipo: 'plano', titulo: 'Golpes digitais e dados pessoais', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF07CO07', 'EF08CO08', 'EF08CO10', 'EF09CO04'], tempo: '2 aulas',
    resumo: 'Quais dados são sensíveis, como golpes funcionam e como se proteger, com casos fictícios.',
    url: 'plano.html?id=p-golpes' },
  { id: 'p-fracoes', tipo: 'plano', titulo: 'Comparando frações', comp: ['MA'], anos: [6],
    habs: ['EF06MA07'], tempo: '2 aulas',
    resumo: 'Parede de frações, equivalência e estratégias de comparação, com fechamento no jogo.',
    url: 'plano.html?id=p-fracoes' },
  { id: 'p-cartesiano', tipo: 'plano', titulo: 'Localização no plano cartesiano', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA16', 'EF07MA03', 'EF07MA20'], tempo: '2 aulas',
    resumo: 'Do mapa da escola ao plano cartesiano, batalha naval e simetrias.',
    url: 'plano.html?id=p-cartesiano' },
  { id: 'p-equacoes', tipo: 'plano', titulo: 'Equações com a balança', comp: ['MA'], anos: [7, 8],
    habs: ['EF07MA18', 'EF07MA13'], tempo: '2 aulas',
    resumo: 'Propriedades da igualdade com balança real ou desenhada e o jogo Balança das Equações.',
    url: 'plano.html?id=p-equacoes' }
];
/* Ícone de capa de cada material no catálogo */
const ICONES = {
  robo: '🤖', pacotes: '📦', rotas: '🗺️', cifra: '🔐', golpe: '🛡️', fracoes: '🍕', cartesiano: '🧭', balanca: '⚖️',
  'f-robo': '✏️', 'f-decompor': '🧱', 'f-pacotes': '✉️', 'f-cesar': '🎡', 'f-grafo': '📍', 'f-fracoes': '🍫', 'f-batalha': '⚓', 'f-golpe': '🔒',
  'p-robo': '🧠', 'p-internet': '🌐', 'p-grafos': '🕸️', 'p-cripto': '🗝️', 'p-golpes': '🚨', 'p-fracoes': '➗', 'p-cartesiano': '📐', 'p-equacoes': '🟰'
};
RECURSOS.forEach(r => { r.icone = r.icone || ICONES[r.id] || '📄'; });
const REC = Object.fromEntries(RECURSOS.map(r => [r.id, r]));

/* ---------------------------------------------------------------------
   PLANOS DE AULA
   etapas: [tempo, título, texto]
   --------------------------------------------------------------------- */
const PLANOS = {
  'p-robo': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Descrever uma solução como sequência precisa de instruções.',
      'Usar repetição para encurtar um algoritmo.',
      'Decompor um percurso longo em partes menores.',
      'Representar um algoritmo simples em fluxograma.'
    ],
    materiais: ['Ficha “Programando o colega-robô” impressa', 'Fita crepe para marcar uma malha no chão (opcional)', 'Computadores, tablets ou celulares para o jogo (1 por dupla)'],
    etapas: [
      ['10 min', 'Problematização', 'Peça a um voluntário que guie a turma até a porta usando só frases como “ande dois passos”. Discuta o que acontece quando a instrução é ambígua: um computador não adivinha o que queremos dizer.'],
      ['25 min', 'Colega-robô (desplugada)', 'Em duplas, com a ficha: um aluno escreve o programa com as setas, o outro executa na malha. Trocam de papel. Desafio: reescrever o mesmo programa com menos comandos usando “repetir”.'],
      ['15 min', 'Fluxograma', 'Completem juntos o fluxograma de par ou ímpar da ficha. Mostre que a decisão (losango) é a seleção do algoritmo.'],
      ['35 min', 'Jogo Robô Coletor', 'As duplas resolvem as fases do jogo e anotam quantos blocos usaram em cada uma. Quem terminar tenta bater o número mínimo de blocos indicado.'],
      ['15 min', 'Socialização', 'Duplas mostram duas soluções diferentes para a mesma fase. Pergunta-chave: o que as duas têm em comum? Onde a repetição ajudou? Como dividiram o caminho em partes?']
    ],
    avaliacao: 'Observe se os programas executam sem ambiguidade e se a dupla reduz o número de comandos com repetição. Recolha a ficha com o fluxograma completo.',
    inclusao: 'Para estudantes cegos ou com baixa visão, use uma malha tátil (barbante colado em papelão) e comandos falados; o jogo aceita teclado. Para quem precisa de mais tempo, reduza a malha para 4 × 4.',
    recursos: ['f-robo', 'f-decompor', 'robo']
  },
  'p-internet': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Explicar que mensagens viajam em pacotes numerados.',
      'Reconhecer o papel do cabeçalho (origem, destino, número, total).',
      'Entender protocolo como um combinado que todos seguem para a comunicação funcionar.'
    ],
    materiais: ['Ficha “Mensagem em pacotes” (1 por grupo)', 'Tesoura', 'Envelopes ou copos para representar roteadores', 'Dispositivos para o jogo'],
    etapas: [
      ['10 min', 'Pergunta inicial', 'Quando você manda uma foto pelo celular, como ela chega do outro lado? Registre as hipóteses no quadro.'],
      ['30 min', 'Internet na sala', 'Cada grupo escreve uma frase, divide em 8 pacotes e preenche o cabeçalho. Os pacotes passam por 2 ou 3 “roteadores” (alunos em pontos da sala) que podem embaralhar a ordem. O grupo destino remonta a mensagem. Em uma rodada, o professor “perde” um pacote de propósito.'],
      ['10 min', 'Protocolos', 'Discuta o que permitiu remontar: o número e o total no cabeçalho. Isso é um protocolo, um combinado. Relacione com o TCP, que confere se todos os pacotes chegaram e pede reenvio do que faltou.'],
      ['30 min', 'Jogo Correio de Pacotes', 'Duplas jogam as rodadas e anotam quantos pedidos de reenvio fizeram.'],
      ['20 min', 'Síntese', 'Cada aluno desenha um esquema: remetente → roteadores → destinatário, com pacotes numerados e um pacote perdido sendo reenviado.']
    ],
    avaliacao: 'O esquema final mostra pacotes numerados, caminhos diferentes e o reenvio? O aluno usa as palavras pacote, cabeçalho e protocolo com sentido?',
    inclusao: 'Os cartões podem ser escritos em letra ampliada ou braille. A simulação funciona bem com papéis definidos para estudantes que preferem tarefas estruturadas (ex.: roteador com regra fixa).',
    recursos: ['f-pacotes', 'pacotes']
  },
  'p-grafos': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Representar locais e ligações como vértices e arestas.',
      'Identificar o grau de um vértice.',
      'Encontrar o caminho de menor custo entre dois vértices.'
    ],
    materiais: ['Ficha “Mapa dos bairros”', 'Mapa impresso ou projetado do bairro da escola', 'Dispositivos para o jogo'],
    etapas: [
      ['15 min', 'Do mapa ao grafo', 'Projete o mapa do entorno da escola. Escolham 6 lugares conhecidos e desenhem bolinhas (vértices) e linhas (arestas) para as ruas que os ligam. Anote os minutos a pé em cada aresta.'],
      ['25 min', 'Ficha Mapa dos bairros', 'Em duplas: contar vértices e arestas, calcular o grau de cada vértice e achar o caminho mais curto entre dois bairros, registrando a soma.'],
      ['10 min', 'Estratégias', 'Compare as estratégias da turma. Apresente a ideia do algoritmo de Dijkstra em linguagem simples: sempre expandir o lugar mais próximo ainda não visitado.'],
      ['30 min', 'Jogo Rota Mais Curta', 'Duplas resolvem as fases e comparam o custo da rota com o ótimo mostrado pelo jogo.'],
      ['20 min', 'Aplicação', 'Onde grafos aparecem? Aplicativos de mapas, redes sociais (quem segue quem), rede elétrica. Cada dupla escreve um exemplo com vértices e arestas.']
    ],
    avaliacao: 'Na ficha: grau correto dos vértices e caminho mínimo com a soma. No jogo: número de fases resolvidas com custo ótimo.',
    inclusao: 'Use grafos táteis com tachinhas e barbante. Para quem tem dificuldade com cálculo, permita calculadora na soma dos pesos; o foco é a estratégia.',
    recursos: ['f-grafo', 'rotas']
  },
  'p-cripto': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Cifrar e decifrar mensagens com a Cifra de César.',
      'Perceber por que uma cifra com poucas chaves é fácil de quebrar (força bruta).',
      'Relacionar criptografia com a proteção de dados no dia a dia.'
    ],
    materiais: ['Ficha “Disco da Cifra de César”', 'Tesoura e colchete (bailarina)', 'Dispositivos para o jogo'],
    etapas: [
      ['10 min', 'Mensagem misteriosa', 'Escreva no quadro uma frase cifrada (ex.: “FRPSXWDFDR” com chave 3). Deixe a turma tentar descobrir.'],
      ['25 min', 'Montando o disco', 'Recortem e montem o disco. Em duplas, cada um cifra uma mensagem com uma chave secreta e troca com o colega, que decifra.'],
      ['15 min', 'Quebrando a cifra', 'Entregue uma mensagem sem chave. Quantas chaves existem? (25) Testar todas é a força bruta. Discuta: e se fossem bilhões de chaves?'],
      ['30 min', 'Jogo Detetive da Cifra', 'Duplas avançam nas fases: decifrar com chave dada, descobrir a chave e cifrar.'],
      ['20 min', 'Criptografia de verdade', 'Converse sobre o cadeado do navegador (HTTPS) e a criptografia de ponta a ponta em aplicativos de mensagens. Por que senhas fortes importam?']
    ],
    avaliacao: 'A dupla consegue cifrar e decifrar corretamente? Explica com as próprias palavras por que a Cifra de César é fraca?',
    inclusao: 'O disco pode ser ampliado em A3 ou feito com letras em relevo. No jogo, o seletor de chave funciona com as setas do teclado.',
    recursos: ['f-cesar', 'cifra']
  },
  'p-golpes': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Diferenciar dados pessoais comuns de dados sensíveis.',
      'Reconhecer sinais de golpes (urgência, link estranho, pedido de código ou senha).',
      'Propor atitudes de proteção para si e para a família.'
    ],
    materiais: ['Ficha “Meus dados, minhas regras”', 'Dispositivos para o jogo'],
    etapas: [
      ['10 min', 'Roda de conversa', 'Alguém da sua família já recebeu uma mensagem estranha pedindo dinheiro ou um código? Sem citar nomes, o que aconteceu?'],
      ['20 min', 'Classificando dados', 'Parte 1 da ficha: classificar dados (nome, CPF, foto, localização, senha, código do SMS) em baixo, médio e alto risco. Discussão sobre a LGPD em linguagem simples.'],
      ['30 min', 'Jogo Golpe ou Seguro?', 'Duplas jogam e anotam o sinal de alerta que mais apareceu.'],
      ['20 min', 'Checklist', 'Parte 2 da ficha: usar o checklist para analisar duas mensagens fictícias e justificar a decisão.'],
      ['20 min', 'Campanha', 'Grupos criam um cartaz ou áudio curto com 3 dicas para os familiares. Pode virar publicação da escola.']
    ],
    avaliacao: 'Justificativas no checklist citam sinais concretos? A campanha traz dicas corretas e acionáveis?',
    inclusao: 'As mensagens do jogo podem ser lidas pelo leitor de tela. Para estudantes com deficiência intelectual, trabalhe com 3 sinais de alerta fixos e repetidos.',
    recursos: ['f-golpe', 'golpe']
  },
  'p-fracoes': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Comparar frações usando representações em barras.',
      'Identificar frações equivalentes.',
      'Escolher estratégias de comparação (mesmo denominador, mesmo numerador, equivalência).'
    ],
    materiais: ['Ficha “Barras de frações”', 'Lápis de cor e tesoura', 'Dispositivos para o jogo'],
    etapas: [
      ['10 min', 'Situação-problema', 'Você prefere 3/4 ou 5/8 de uma pizza? Votação e justificativas.'],
      ['25 min', 'Parede de frações', 'Recortem e montem a parede de frações da ficha. Procurem peças que, juntas, têm o mesmo tamanho (equivalência).'],
      ['15 min', 'Estratégias', 'Sistematize no quadro: mesmo denominador, mesmo numerador, comparar com 1/2, transformar em equivalentes.'],
      ['30 min', 'Jogo Corrida das Frações', 'Começar no nível com barras e avançar para o nível sem barras.'],
      ['20 min', 'Registro', 'Exercícios da ficha e uma pergunta de saída: explique por que 2/3 é maior que 3/5.']
    ],
    avaliacao: 'Pergunta de saída e exercícios da ficha. No jogo, observe a maior sequência de acertos no nível sem barras.',
    inclusao: 'A parede de frações pode ser feita em EVA com texturas diferentes para cada denominador.',
    recursos: ['f-fracoes', 'fracoes']
  },
  'p-cartesiano': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Localizar e marcar pontos por pares ordenados.',
      'Estender o plano aos quatro quadrantes com números inteiros.',
      'Reconhecer pontos simétricos em relação aos eixos e à origem.'
    ],
    materiais: ['Ficha “Batalha naval cartesiana”', 'Fita crepe para um plano no chão (opcional)', 'Dispositivos para o jogo'],
    etapas: [
      ['10 min', 'Onde fica?', 'Usando as fileiras da sala como malha, peça que alunos se localizem por “fileira e carteira”. Por que a ordem importa?'],
      ['20 min', 'Primeiro quadrante', 'No quadro, marque pontos e forme um polígono a partir das coordenadas dos vértices.'],
      ['30 min', 'Batalha naval', 'Duplas jogam com a ficha nos quatro quadrantes, anotando os disparos.'],
      ['25 min', 'Jogo Tesouro Cartesiano', 'Níveis 1 e 2 para todos; nível 3 (simetria) para quem avançar.'],
      ['15 min', 'Simetria', 'Fechamento: o que acontece com as coordenadas quando refletimos um ponto no eixo x? E no eixo y? E na origem?']
    ],
    avaliacao: 'Registros da batalha naval e a regra de simetria escrita pelo aluno no fechamento.',
    inclusao: 'Use geoplano ou malha com relevo e coordenadas em braille. No jogo, as coordenadas do ponto sob o cursor aparecem em texto.',
    recursos: ['f-batalha', 'cartesiano']
  },
  'p-equacoes': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Compreender a equação como uma igualdade em equilíbrio.',
      'Usar as propriedades da igualdade para isolar a incógnita.',
      'Diferenciar incógnita (valor desconhecido) de variável.'
    ],
    materiais: ['Balança de dois pratos (ou desenho no quadro)', 'Saquinhos opacos com a mesma quantidade de feijões e feijões soltos', 'Dispositivos para o jogo'],
    etapas: [
      ['15 min', 'A balança misteriosa', 'Coloque 2 saquinhos + 3 feijões de um lado e 11 feijões do outro, em equilíbrio. Quantos feijões há em cada saquinho? Deixe a turma propor.'],
      ['20 min', 'Propriedades da igualdade', 'Registre cada ação na balança e na linguagem algébrica: tirar 3 dos dois lados (2x + 3 − 3 = 11 − 3), dividir os dois lados por 2.'],
      ['35 min', 'Jogo Balança das Equações', 'Duplas resolvem as equações do jogo, registrando no caderno cada passo em linguagem algébrica.'],
      ['15 min', 'Variável x incógnita', 'Compare 2x + 3 = 11 (um valor resolve) com P = 2x + 3 (o perímetro muda conforme x).'],
      ['15 min', 'Criação', 'Cada aluno inventa um problema de balança para o colega resolver.']
    ],
    avaliacao: 'Registro dos passos no caderno e problema criado. Corrija se as operações foram feitas nos dois lados.',
    inclusao: 'A balança física com objetos é acessível para estudantes cegos. Calculadora liberada quando o foco for o raciocínio.',
    recursos: ['balanca']
  }
};
