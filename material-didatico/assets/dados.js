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
    url: 'plano.html?id=p-equacoes' },
  // ---------- Planos de aula · cobertura completa de Computação ----------
  { id: 'p-dados', tipo: 'plano', titulo: 'Coleções, entradas e saídas', comp: ['CO'], anos: [6],
    habs: ['EF06CO01', 'EF06CO05', 'EF06CO06'], tempo: '2 aulas',
    resumo: 'Classificar informações por tipo de dado, identificar entradas e saídas e generalizar um algoritmo com variáveis.',
    url: 'plano.html?id=p-dados' },
  { id: 'p-arquivos', tipo: 'plano', titulo: 'Arquivos em ordem: pastas, compactação e metadados', comp: ['CO'], anos: [6],
    habs: ['EF06CO08'], tempo: '2 aulas',
    resumo: 'Organizar, nomear, compactar e encontrar arquivos, entendendo o que são metadados.',
    url: 'plano.html?id=p-arquivos' },
  { id: 'p-conduta', tipo: 'plano', titulo: 'Convivência digital: respeito, empatia e cyberbullying', comp: ['CO'], anos: [6, 7],
    habs: ['EF06CO09', 'EF07CO08', 'EF07CO09'], tempo: '2 aulas',
    resumo: 'Combinados de conduta on-line, como discordar com respeito e como reconhecer e enfrentar o cyberbullying.',
    url: 'plano.html?id=p-conduta' },
  { id: 'p-lixo', tipo: 'plano', titulo: 'Do consumo ao lixo eletrônico', comp: ['CO'], anos: [6, 7],
    habs: ['EF06CO10', 'EF07CO10'], tempo: '2 aulas',
    resumo: 'O caminho de um celular da mina ao descarte: obsolescência, consumo e impactos ambientais.',
    url: 'plano.html?id=p-lixo' },
  { id: 'p-registros', tipo: 'plano', titulo: 'Registros e listas: a ficha da turma', comp: ['CO'], anos: [7],
    habs: ['EF07CO01'], tempo: '2 aulas',
    resumo: 'Representar informações em registros (campos) e matrizes unidimensionais e percorrê-las com um programa.',
    url: 'plano.html?id=p-registros' },
  { id: 'p-bugs', tipo: 'plano', titulo: 'Caça aos bugs: depuração de programas', comp: ['CO'], anos: [7],
    habs: ['EF07CO02'], tempo: '2 aulas',
    resumo: 'Ler, testar e corrigir programas com erros, usando casos de teste para ganhar confiança na solução.',
    url: 'plano.html?id=p-bugs' },
  { id: 'p-reuso', tipo: 'plano', titulo: 'Blocos que se repetem: funções e reúso', comp: ['CO', 'MA'], anos: [7],
    habs: ['EF07CO05', 'EF07MA05'], tempo: '2 aulas',
    resumo: 'Criar procedimentos reutilizáveis, desenhar figuras com eles e comparar algoritmos diferentes para o mesmo problema.',
    url: 'plano.html?id=p-reuso' },
  { id: 'p-midia', tipo: 'plano', titulo: 'Projeto: nossa produção digital', comp: ['CO'], anos: [7],
    habs: ['EF07CO03', 'EF07CO11'], tempo: '4 aulas',
    resumo: 'Em grupos, planejar, produzir, documentar e publicar um podcast, vídeo ou site sobre um tema de outra disciplina.',
    url: 'plano.html?id=p-midia' },
  { id: 'p-recursao', tipo: 'plano', titulo: 'Listas, recursão e algoritmos de ordenação', comp: ['CO', 'MA'], anos: [8],
    habs: ['EF08CO01', 'EF08CO02', 'EF08CO03', 'EF08MA10'], tempo: '3 aulas',
    resumo: 'Ordenar cartas na mão, buscar em listas e resolver problemas que contêm versões menores de si mesmos.',
    url: 'plano.html?id=p-recursao' },
  { id: 'p-paralelo', tipo: 'plano', titulo: 'Muitas mãos: paralelismo e sistemas distribuídos', comp: ['CO'], anos: [8],
    habs: ['EF08CO05'], tempo: '2 aulas',
    resumo: 'Dividir uma tarefa entre várias “máquinas”, perceber gargalos e conflitos e entender a nuvem.',
    url: 'plano.html?id=p-paralelo' },
  { id: 'p-redes', tipo: 'plano', titulo: 'Por dentro das redes sociais', comp: ['CO'], anos: [8],
    habs: ['EF08CO07', 'EF08CO09'], tempo: '2 aulas',
    resumo: 'Como o feed escolhe o que você vê, como uma postagem se espalha e o que dizem os termos de uso.',
    url: 'plano.html?id=p-redes' },
  { id: 'p-fontes', tipo: 'plano', titulo: 'Checagem de fatos: fontes, vieses e desinformação', comp: ['CO'], anos: [8, 9],
    habs: ['EF08CO11', 'EF09CO10'], tempo: '2 aulas',
    resumo: 'Método simples de checagem para notícias, imagens e vídeos, incluindo conteúdo gerado por IA.',
    url: 'plano.html?id=p-fontes' },
  { id: 'p-projeto8', tipo: 'plano', titulo: 'Projeto: um programa para outra disciplina', comp: ['CO', 'MA'], anos: [8],
    habs: ['EF08CO04', 'EF08MA06'], tempo: '4 aulas',
    resumo: 'Grupos criam um programa que resolve um problema de Matemática, Ciências ou Geografia, com teste e apresentação.',
    url: 'plano.html?id=p-projeto8' },
  { id: 'p-arvores', tipo: 'plano', titulo: 'Árvores de decisão e grafos', comp: ['CO'], anos: [9],
    habs: ['EF09CO01'], tempo: '2 aulas',
    resumo: 'Do jogo das 20 perguntas à chave de classificação: construir árvores e programá-las.',
    url: 'plano.html?id=p-arvores' },
  { id: 'p-automatos', tipo: 'plano', titulo: 'Máquinas de estados: do semáforo ao jogo', comp: ['CO'], anos: [9],
    habs: ['EF09CO03'], tempo: '2 aulas',
    resumo: 'Descrever comportamentos com estados e transições e implementá-los com programação por eventos.',
    url: 'plano.html?id=p-automatos' },
  { id: 'p-cidade', tipo: 'plano', titulo: 'Projeto: tecnologia para a nossa cidade', comp: ['CO'], anos: [9],
    habs: ['EF09CO02', 'EF09CO06'], tempo: '4 aulas',
    resumo: 'Investigar um problema real do município com dados abertos e propor uma solução computacional.',
    url: 'plano.html?id=p-cidade' },
  { id: 'p-sociedade', tipo: 'plano', titulo: 'Tecnologia, poder e desigualdade digital', comp: ['CO'], anos: [9],
    habs: ['EF09CO07', 'EF09CO08'], tempo: '2 aulas',
    resumo: 'Júri simulado sobre os impactos políticos, culturais e ambientais da tecnologia e o acesso desigual à computação.',
    url: 'plano.html?id=p-sociedade' },
  { id: 'p-autoria', tipo: 'plano', titulo: 'Autoria, direitos autorais e uso de imagem', comp: ['CO'], anos: [9],
    habs: ['EF09CO09'], tempo: '2 aulas',
    resumo: 'Quando posso usar uma imagem ou música? Licenças, créditos, direito de imagem e conteúdo feito com IA.',
    url: 'plano.html?id=p-autoria' }
];
/* Ícone de capa de cada material no catálogo */
const ICONES = {
  robo: '🤖', pacotes: '📦', rotas: '🗺️', cifra: '🔐', golpe: '🛡️', fracoes: '🍕', cartesiano: '🧭', balanca: '⚖️',
  'f-robo': '✏️', 'f-decompor': '🧱', 'f-pacotes': '✉️', 'f-cesar': '🎡', 'f-grafo': '📍', 'f-fracoes': '🍫', 'f-batalha': '⚓', 'f-golpe': '🔒',
  'p-robo': '🧠', 'p-internet': '🌐', 'p-grafos': '🕸️', 'p-cripto': '🗝️', 'p-golpes': '🚨', 'p-fracoes': '➗', 'p-cartesiano': '📐', 'p-equacoes': '🟰',
  'p-dados': '🔢', 'p-arquivos': '🗄️', 'p-conduta': '🤝', 'p-lixo': '♻️', 'p-registros': '🗃️', 'p-bugs': '🐞',
  'p-reuso': '🧩', 'p-midia': '🎙️', 'p-recursao': '🪆', 'p-paralelo': '⚙️', 'p-redes': '📱', 'p-fontes': '🔎',
  'p-projeto8': '💻', 'p-arvores': '🌳', 'p-automatos': '🚦', 'p-cidade': '🏙️', 'p-sociedade': '⚖️', 'p-autoria': '©️'
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
  ,
  /* ---------- Cobertura completa de Computação ---------- */
  'p-dados': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Agrupar informações em coleções e associar cada coleção a um tipo de dado (número, texto, verdadeiro/falso).',
      'Identificar as entradas, as saídas e os tipos de dados de um problema.',
      'Comparar casos particulares e escrever um algoritmo geral usando variáveis.'
    ],
    materiais: ['Cartões com informações variadas (idade, nome, “tem irmãos?”, altura, cor favorita…)', 'Quadro ou cartaz com três colunas', 'Scratch ou papel para o algoritmo'],
    etapas: [
      ['15 min', 'Que tipo de informação é essa?', 'Distribua os cartões e peça que os grupos os separem em montes. Depois de ouvirem os critérios, apresente três “tipos de dado”: número, texto e lógico (sim/não). Reagrupem usando esse critério e discutam casos difíceis, como CEP e telefone (números que não fazem conta).'],
      ['15 min', 'Entrada → processamento → saída', 'Proponha o problema “calcular o valor da cantina para um pedido”. Juntos, identifiquem as entradas (preço, quantidade), o processamento (multiplicar e somar) e a saída (total), e o tipo de cada um.'],
      ['20 min', 'Três casos, um algoritmo', 'Os grupos resolvem três pedidos diferentes passo a passo. Pergunta-chave: o que muda e o que se repete entre os casos? O que muda vira variável (parâmetro); o que se repete vira o algoritmo.'],
      ['35 min', 'Generalizando', 'Escrevam o algoritmo geral em linguagem natural e, se houver computadores, no Scratch usando variáveis “preço”, “quantidade” e “total”. Testem com valores novos inventados pela turma.'],
      ['15 min', 'Socialização', 'Cada grupo mostra um caso em que o algoritmo funciona e um em que “quebra” (ex.: quantidade negativa). Discuta como verificar se a entrada é válida.']
    ],
    avaliacao: 'Classificação correta dos dados por tipo; tabela de entradas e saídas com tipos; algoritmo que funciona para valores novos.',
    inclusao: 'Use cartões com textura ou cor por tipo de dado. O algoritmo pode ser montado com cartões de instrução em vez de escrito.',
    recursos: ['robo']
  },
  'p-arquivos': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Organizar arquivos em pastas com nomes significativos.',
      'Entender o que são metadados e usá-los para encontrar arquivos.',
      'Compactar e descompactar arquivos, percebendo para que serve a compactação.'
    ],
    materiais: ['Envelopes e papéis (versão desplugada)', 'Computadores com uma pasta “bagunçada” preparada pelo professor', 'Celulares para observar os detalhes de uma foto (opcional)'],
    etapas: [
      ['10 min', 'A gaveta bagunçada', 'Mostre uma pasta com 30 arquivos chamados “foto1”, “trabalho final FINAL2”, “sem título”. Peça para encontrarem o trabalho de Ciências de março. Por que demorou?'],
      ['25 min', 'Arrumando a casa', 'Em duplas, criem uma estrutura de pastas (por disciplina e bimestre) e uma regra de nomes (ex.: 2026-03_ciencias_relatorio). Reorganizem os arquivos. Sem computador, façam o mesmo com envelopes e papéis.'],
      ['15 min', 'Dados sobre os dados', 'Abra as propriedades de um arquivo e os detalhes de uma foto: data, tamanho, autor, às vezes localização. Isso é metadado. Discuta o risco de publicar fotos com localização.'],
      ['35 min', 'Compactar: o mesmo, menor', 'Atividade desplugada: escrevam uma frase repetitiva e “compactem” trocando palavras repetidas por números (“o rato roeu a roupa do rei de roma, o rato…”). Depois compactem a pasta organizada em .zip, comparem os tamanhos e descompactem.'],
      ['15 min', 'Fechamento', 'Cada dupla escreve três regras para manter os arquivos em ordem e uma situação em que compactar é útil (enviar por e-mail, guardar backup).']
    ],
    avaliacao: 'Estrutura de pastas e regra de nomes aplicadas; explicação correta de metadado e de compactação.',
    inclusao: 'Para leitores de tela, nomes de arquivos claros fazem toda a diferença — use isso como argumento. Ofereça a versão com envelopes para quem não tem computador.',
    recursos: []
  },
  'p-conduta': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Construir combinados de conduta e linguagem para ambientes digitais.',
      'Discordar de opiniões na internet com empatia e argumentos.',
      'Reconhecer situações de cyberbullying e saber como agir e onde pedir ajuda.'
    ],
    materiais: ['Cartões com situações fictícias de grupos de mensagens e comentários', 'Cartaz para os combinados da turma'],
    etapas: [
      ['10 min', 'Na tela é diferente?', 'Pergunte: você diria cara a cara tudo o que escreve num comentário? Liste no quadro o que muda na comunicação on-line (sem tom de voz, sem rosto, alcance maior, fica registrado).'],
      ['25 min', 'Reescrevendo comentários', 'Em grupos, recebam comentários agressivos fictícios sobre um assunto polêmico leve (ex.: “melhor time”, “pizza com abacaxi”). Reescrevam mantendo a opinião, mas com respeito. Comparem as versões.'],
      ['10 min', 'O que é cyberbullying', 'Apresente as características: repetição, intenção de humilhar, desequilíbrio de poder e alcance on-line. Diferencie de uma briga pontual.'],
      ['35 min', 'E se fosse com você?', 'Os grupos analisam situações fictícias (montagem com foto de colega, exclusão de grupo, perfil falso) em três papéis: quem sofre, quem pratica e quem assiste. O que cada um pode fazer? Destaque o papel de quem assiste: não compartilhar, apoiar, denunciar, contar a um adulto.'],
      ['20 min', 'Combinados da turma', 'A turma escreve de 5 a 7 combinados para os grupos de mensagens da escola e assina o cartaz.']
    ],
    avaliacao: 'Qualidade das reescritas (mantêm a opinião sem ataque pessoal) e das respostas sobre como agir em cada papel.',
    inclusao: 'Evite situações que exponham estudantes reais. Esteja atento a reações durante a aula e combine com a coordenação um encaminhamento caso surja um caso real.',
    recursos: []
  },
  'p-lixo': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Analisar o caminho de um aparelho eletrônico: extração, produção, uso e descarte.',
      'Discutir obsolescência programada e percebida e hábitos de consumo.',
      'Identificar impactos do descarte incorreto e formas adequadas de descarte.'
    ],
    materiais: ['Aparelhos velhos ou quebrados para observar (sem abrir baterias)', 'Imagens de mineração, fábricas e lixões eletrônicos', 'Folhas grandes para a linha do tempo'],
    etapas: [
      ['10 min', 'Quantos você já teve?', 'Levantamento rápido: quantos celulares a família teve nos últimos 10 anos? Por que trocaram? Separe respostas em “quebrou” e “ficou ultrapassado”.'],
      ['25 min', 'A vida de um celular', 'Em grupos, montem uma linha do tempo com as etapas: minerais (ouro, cobalto, lítio), fábrica, transporte, uso, descarte. Para cada etapa, anotem um impacto ambiental ou social.'],
      ['15 min', 'Obsolescência', 'Explique obsolescência programada (feito para durar pouco) e percebida (parece velho por causa de moda ou marketing). Os grupos classificam os motivos de troca do levantamento inicial.'],
      ['30 min', 'Para onde vai?', 'Observem um aparelho velho e identifiquem materiais. Discuta riscos do descarte no lixo comum (metais pesados, baterias) e pesquisem pontos de coleta de eletrônicos no município.'],
      ['20 min', 'Campanha', 'Cada grupo cria um cartaz com uma dica de consumo consciente (consertar, doar, usar por mais tempo) e uma informação sobre descarte correto.']
    ],
    avaliacao: 'Linha do tempo com impactos por etapa e cartaz com informações corretas sobre descarte.',
    inclusao: 'Aparelhos para tocar e desmontar (sem bateria) favorecem estudantes cegos e quem aprende melhor com materiais concretos.',
    recursos: []
  },
  'p-registros': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Representar uma entidade como registro com campos (nome, idade, turma).',
      'Guardar vários valores do mesmo tipo em uma matriz unidimensional (lista) e acessá-los por posição.',
      'Escrever um programa que percorre a lista para calcular algo (média, maior valor).'
    ],
    materiais: ['Fichas de papel em branco', 'Caixas de ovo ou copos numerados (posições da lista)', 'Scratch (listas) ou Python'],
    etapas: [
      ['15 min', 'A ficha da biblioteca', 'Cada aluno preenche uma ficha de “livro favorito” com campos fixos: título, autor, páginas, nota. Mostre que todas as fichas têm a mesma estrutura: isso é um registro.'],
      ['20 min', 'Lista de copos', 'Coloque 8 copos numerados de 0 a 7 com papéis com as notas dos livros. Peça: qual é a nota na posição 3? Troque o valor da posição 5. Some todas. Discuta por que computadores começam a contar do 0.'],
      ['10 min', 'Percorrer', 'Escreva no quadro o algoritmo “para cada posição de 0 até o fim, some o valor”. Calculem a média e encontrem a maior nota.'],
      ['40 min', 'Programando', 'No Scratch (lista “notas”) ou em Python, as duplas criam um programa que guarda as notas da turma, mostra a média e o livro mais bem avaliado. Desafio: guardar título e nota em duas listas “paralelas”.'],
      ['15 min', 'Socialização', 'Qual livro venceu? Que outros dados da escola poderiam virar registros e listas (merenda, empréstimos, temperatura)?']
    ],
    avaliacao: 'O programa armazena os dados em lista, acessa por posição e calcula a média corretamente.',
    inclusao: 'Os copos numerados funcionam como modelo tátil da lista. Para quem programa com leitor de tela, Python costuma ser mais acessível que blocos.',
    recursos: []
  },
  'p-bugs': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Ler um programa e prever o que ele faz antes de executar.',
      'Localizar e corrigir erros usando casos de teste.',
      'Reconhecer tipos comuns de erro (ordem, condição, repetição a mais ou a menos).'
    ],
    materiais: ['Programas com erros preparados no Scratch ou em papel', 'Tabela de casos de teste', 'Jogo Robô Coletor'],
    etapas: [
      ['10 min', 'O primeiro bug', 'Conte a história do inseto encontrado num computador em 1947 e por que erros se chamam bugs. Pergunte: errar faz parte de programar?'],
      ['20 min', 'Robô com defeito', 'Projete programas do Robô Coletor com um erro cada (uma seta trocada, uma repetição a mais). A turma prevê onde o robô vai bater antes de executar e propõe a correção.'],
      ['15 min', 'Casos de teste', 'Apresente um programa que diz se um aluno foi aprovado (nota ≥ 6). Montem juntos uma tabela de testes: nota 8, 6, 5,9, 0, 10. Mostre que testar o limite (6) revela o erro de usar > em vez de ≥.'],
      ['40 min', 'Oficina de conserto', 'Em duplas, cada uma recebe três programas com bugs. Para cada um: descrever o comportamento esperado, testar, encontrar o erro, corrigir e registrar o tipo de erro.'],
      ['15 min', 'Galeria de bugs', 'As duplas compartilham o bug mais difícil e a estratégia que funcionou (ler linha a linha, testar partes, explicar para o colega).']
    ],
    avaliacao: 'Tabela de casos de teste preenchida e programas corrigidos com o tipo de erro identificado.',
    inclusao: 'Explicar o código em voz alta para um colega (“depuração do patinho”) ajuda estudantes que leem com dificuldade. Ofereça os programas impressos em fonte ampliada.',
    recursos: ['robo']
  },
  'p-reuso': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Decompor um desenho ou tarefa em partes que se repetem.',
      'Criar procedimentos (blocos próprios ou funções) com parâmetros e reutilizá-los.',
      'Comparar diferentes algoritmos para resolver o mesmo problema.'
    ],
    materiais: ['Papel quadriculado', 'Scratch com a extensão Caneta (ou Python com turtle)'],
    etapas: [
      ['10 min', 'Uma casa, três desenhos', 'Desenhe uma rua com três casas iguais. Peça que um aluno dite os passos para desenhar todas. Quantas vezes ele repetiu as mesmas instruções?'],
      ['15 min', 'Criando um bloco', 'Mostre como criar o bloco “desenhar quadrado” no Scratch (Meus Blocos) e depois “desenhar quadrado de tamanho L”. O tamanho é um parâmetro.'],
      ['15 min', 'Dois caminhos', 'Proponha desenhar um quadrado de dois jeitos: quatro vezes “ande e gire” em sequência, ou “repita 4 vezes”. E um triângulo? Comparem os algoritmos: qual é mais curto, qual é mais fácil de mudar?'],
      ['45 min', 'Minha cidade', 'Em duplas, criem blocos reutilizáveis (casa, árvore, janela) e componham um bairro inteiro. Desafio: um bloco que usa outro bloco (a casa usa “janela”).'],
      ['15 min', 'Troca de blocos', 'Duplas trocam um bloco entre si e o usam no próprio desenho — é assim que programadores compartilham código.']
    ],
    avaliacao: 'Uso de pelo menos dois blocos próprios com parâmetro e comparação escrita entre dois algoritmos.',
    inclusao: 'Para estudantes com baixa visão, aumente o zoom do Scratch e use traços grossos. A versão em papel quadriculado substitui o computador.',
    recursos: ['f-decompor', 'robo']
  },
  'p-midia': {
    duracao: '4 aulas de 50 min',
    objetivos: [
      'Planejar um produto digital a partir de um problema ou tema de outra área.',
      'Produzir, documentar e publicar o produto de forma colaborativa.',
      'Distribuir papéis e etapas como em um projeto real.'
    ],
    materiais: ['Celulares ou computadores para gravação e edição', 'Ferramentas gratuitas de edição de áudio, vídeo ou criação de sites', 'Roteiro de planejamento impresso'],
    etapas: [
      ['20 min', 'Escolha do tema e do formato', 'Os grupos escolhem um tema de outra disciplina (ex.: ciclo da água, história do bairro) e o formato: podcast, vídeo curto ou site de uma página. Definam o público.'],
      ['30 min', 'Planejamento', 'Preencham o roteiro: objetivo, divisão de papéis (roteiro, gravação, edição, documentação), cronograma, materiais e fontes.'],
      ['60 min', 'Produção', 'Gravação e criação. O professor circula e faz perguntas de processo: o que está pronto? O que falta? O que mudou do plano?'],
      ['40 min', 'Edição e documentação', 'Finalizem e escrevam uma ficha técnica: créditos, fontes, ferramentas usadas, licença. Confiram se há autorização de imagem de quem aparece.'],
      ['50 min', 'Publicação e mostra', 'Publicação no ambiente da escola (blog, mural digital ou rede interna). Mostra com feedback de outro grupo usando uma rubrica simples.']
    ],
    avaliacao: 'Rubrica: planejamento cumprido, qualidade do conteúdo, documentação completa (créditos e fontes) e colaboração no grupo.',
    inclusao: 'Formatos variados permitem que cada estudante contribua no que faz melhor. Incentive legendas nos vídeos e transcrição dos podcasts — o produto fica acessível para todos.',
    recursos: []
  },
  'p-recursao': {
    duracao: '3 aulas de 50 min',
    objetivos: [
      'Manipular listas: inserir, remover, buscar e ordenar elementos.',
      'Executar algoritmos clássicos de ordenação e de busca e comparar sua eficiência.',
      'Reconhecer e construir soluções recursivas e relacioná-las a sequências numéricas.'
    ],
    materiais: ['Baralho ou cartões numerados (1 por grupo)', 'Bonecas russas ou caixas uma dentro da outra (opcional)', 'Scratch ou Python'],
    etapas: [
      ['15 min', 'Organizando a mão', 'Cada grupo embaralha 8 cartas e as ordena. Como cada um fez? Nomeie a estratégia mais comum: ordenação por inserção (pegar uma carta e encaixar na posição certa).'],
      ['25 min', 'Duas ordenações', 'Executem com as cartas a ordenação por seleção (achar a menor e colocar no início) e a por inserção, contando quantas comparações cada uma fez. Qual foi mais rápida para essas cartas?'],
      ['20 min', 'Adivinhe o número', 'Jogo: o professor pensa num número de 1 a 100 e responde “maior” ou “menor”. Comparem a busca um a um com a busca binária (sempre chutar o meio). Quantas tentativas, no máximo, em cada uma?'],
      ['20 min', 'Problemas dentro de problemas', 'Apresente a recursão com as bonecas russas e com o fatorial: 5! = 5 × 4!. Relacione com sequências: uma sequência recursiva usa o termo anterior; uma não recursiva usa uma fórmula direta (ex.: 3n + 1). Construam o fluxograma de cada uma.'],
      ['50 min', 'Programando', 'As duplas escolhem: programar a ordenação por seleção de uma lista, a busca binária ou uma função recursiva (fatorial, contagem regressiva, sequência). Testem com listas e valores diferentes.'],
      ['20 min', 'Socialização', 'Compare: com 1 milhão de nomes, quantos passos a busca binária precisaria? (cerca de 20). Por que isso importa para buscadores e aplicativos?']
    ],
    avaliacao: 'Registro das comparações nas ordenações; fluxograma de uma sequência; programa funcionando para listas ou entradas diferentes.',
    inclusao: 'As cartas com números grandes ou em braille tornam os algoritmos concretos. Permita que a ordenação seja feita em dupla, com um aluno executando e outro registrando.',
    recursos: []
  },
  'p-paralelo': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Diferenciar processamento sequencial e paralelo.',
      'Identificar problemas de concorrência quando várias partes usam o mesmo recurso.',
      'Entender armazenamento e processamento distribuídos, como na nuvem.'
    ],
    materiais: ['Pilhas de folhas para dobrar ou contar', 'Cronômetro', 'Uma única tesoura ou cola (recurso compartilhado)'],
    etapas: [
      ['10 min', 'Uma pessoa x muitas', 'Uma pessoa dobra 40 folhas sozinha enquanto a turma cronometra. Depois, 4 pessoas dividem as mesmas 40 folhas. Comparem os tempos.'],
      ['25 min', 'Linha de montagem', 'Em grupos, montem “sanduíches de papel” com etapas: cortar, colar, carimbar. Há uma só tesoura. Observem: quem fica esperando? Isso é concorrência por um recurso.'],
      ['15 min', 'Gargalos e combinados', 'Discutam soluções: uma fila para a tesoura, dividir etapas, ter mais tesouras. Relacione com computadores com vários núcleos e com várias pessoas editando o mesmo documento on-line.'],
      ['30 min', 'A nuvem não é nuvem', 'Explique que a “nuvem” são muitos computadores em datacenters, ligados em rede. Simulação: um arquivo (texto num papel) é dividido e copiado em três “servidores” (grupos). Um servidor “queima”: dá para recuperar o arquivo?'],
      ['20 min', 'Registro', 'Cada aluno explica, com um desenho, uma situação do dia a dia que funciona em paralelo e um problema de concorrência.']
    ],
    avaliacao: 'Desenho com exemplo correto de paralelismo e de concorrência; participação na discussão sobre a nuvem.',
    inclusao: 'As atividades são corporais e concretas; garanta papéis para estudantes com mobilidade reduzida (cronometrar, registrar, coordenar a fila).',
    recursos: ['pacotes']
  },
  'p-redes': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Compreender como uma postagem se espalha numa rede social e como o feed é ordenado.',
      'Compartilhar informações de forma consciente.',
      'Ler criticamente trechos de termos de uso e políticas de privacidade.'
    ],
    materiais: ['Fios de lã (para a teia de compartilhamento)', 'Trechos impressos de termos de uso de uma plataforma popular', 'Marcadores de texto'],
    etapas: [
      ['15 min', 'A teia', 'Com um rolo de lã, simule uma postagem: quem recebe e compartilha passa o fio para dois colegas. Em poucos passos, quase todos estão conectados. Por que é tão difícil “apagar” algo da internet?'],
      ['20 min', 'Quem escolhe o seu feed?', 'Explique o algoritmo de recomendação: a plataforma mostra o que acha que vai prender sua atenção, com base em curtidas, tempo de tela e seguidores. Os alunos listam o que viram por último e tentam adivinhar por que aquilo apareceu.'],
      ['15 min', 'Antes de compartilhar', 'Construam juntos um checklist de compartilhamento: é verdade? É meu para compartilhar? Expõe alguém? Para quem estou enviando?'],
      ['35 min', 'Detetives dos termos de uso', 'Em grupos, leiam trechos dos termos de uso e marquem: idade mínima, quais dados são coletados, com quem são compartilhados, de quem é o conteúdo que você posta. Apresentem a descoberta mais surpreendente.'],
      ['15 min', 'Fechamento', 'Cada aluno escreve uma mudança que vai fazer nas configurações de privacidade ou no jeito de compartilhar.']
    ],
    avaliacao: 'Respostas dos grupos sobre os termos de uso e o compromisso individual com justificativa.',
    inclusao: 'Disponibilize os trechos em fonte ampliada e com linguagem simplificada ao lado do original. A teia de lã pode ser descrita verbalmente a cada passo.',
    recursos: ['golpe']
  },
  'p-fontes': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Avaliar a credibilidade, a precisão e os vieses de uma fonte de informação.',
      'Aplicar um método de checagem a textos, imagens e vídeos.',
      'Reconhecer sinais de conteúdo manipulado ou gerado por inteligência artificial.'
    ],
    materiais: ['Seleção de manchetes e postagens (verdadeiras e falsas) preparada pelo professor', 'Computadores ou celulares para pesquisa', 'Cartaz com o método de checagem'],
    etapas: [
      ['10 min', 'Você acreditaria?', 'Mostre 4 manchetes, duas verdadeiras e duas falsas. Votação rápida. Revele as respostas: o que nos fez acreditar nas falsas?'],
      ['20 min', 'Método de checagem', 'Apresente perguntas-guia: quem publicou? Quando? Outras fontes confiáveis dizem o mesmo? O título combina com o texto? Há dados e fontes citadas? Que emoção o texto tenta provocar?'],
      ['15 min', 'Imagens e vídeos', 'Mostre como fazer busca reversa de imagem e sinais de imagem gerada por IA (mãos, textos ilegíveis, sombras incoerentes). Lembre que esses sinais estão ficando mais difíceis de ver: a origem da informação continua sendo o mais importante.'],
      ['40 min', 'Agência de checagem', 'Grupos recebem duas postagens cada, aplicam o método, pesquisam e classificam como verdadeira, falsa, enganosa ou sem evidência, com justificativa e links.'],
      ['15 min', 'Selo da turma', 'Cada grupo apresenta um caso. A turma discute vieses: até fontes confiáveis escolhem o que destacar. Como comparar diferentes fontes?']
    ],
    avaliacao: 'Fichas de checagem com classificação justificada e fontes consultadas.',
    inclusao: 'Use leitores de tela para as postagens e descreva as imagens em voz alta. Grupos heterogêneos ajudam na pesquisa.',
    recursos: ['golpe']
  },
  'p-projeto8': {
    duracao: '4 aulas de 50 min',
    objetivos: [
      'Construir, de forma colaborativa, uma solução computacional para um problema de outra área.',
      'Escolher as estruturas de dados e técnicas adequadas (variáveis, listas, condições, repetições).',
      'Testar, documentar e apresentar a solução.'
    ],
    materiais: ['Computadores com Scratch ou Python', 'Banco de problemas de outras disciplinas', 'Rubrica do projeto'],
    etapas: [
      ['20 min', 'Banco de problemas', 'Apresente problemas como: calculadora de IMC ou de área, quiz de capitais, conversor de unidades, calculadora de valor numérico de expressões. Os grupos escolhem ou propõem outro.'],
      ['30 min', 'Projeto no papel', 'Definam entradas, saídas, dados que precisam guardar e um fluxograma. O professor valida antes da programação.'],
      ['70 min', 'Programação', 'Desenvolvimento em etapas curtas: uma parte funcionando por vez. Ao fim de cada aula, cada grupo registra o que funcionou e o que vem a seguir.'],
      ['40 min', 'Testes e documentação', 'Troca de projetos entre grupos para teste. Corrigem os bugs encontrados e escrevem um manual de uso de meia página.'],
      ['40 min', 'Feira de projetos', 'Apresentação de 3 minutos por grupo: problema, solução, um desafio que enfrentaram. Convide o professor da outra disciplina.']
    ],
    avaliacao: 'Rubrica: o programa resolve o problema, usa estruturas adequadas, foi testado, está documentado e o grupo apresentou o processo.',
    inclusao: 'Distribua papéis (programador, testador, documentador, apresentador) com rodízio. Projetos podem ter versões simples e desafios extras.',
    recursos: ['balanca']
  },
  'p-arvores': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Representar informações hierárquicas e decisões com árvores.',
      'Relacionar árvores e grafos (uma árvore é um grafo sem ciclos).',
      'Programar uma árvore de decisão simples.'
    ],
    materiais: ['Cartões com imagens de animais ou objetos', 'Papel grande', 'Scratch ou Python'],
    etapas: [
      ['15 min', '20 perguntas', 'O professor pensa num animal; a turma só pode fazer perguntas de sim ou não. Registre as perguntas como galhos no quadro: aparece uma árvore.'],
      ['25 min', 'Chave de classificação', 'Em grupos, construam uma árvore de decisão que separe 8 cartões de animais até cada um ficar sozinho numa folha. Qual a menor altura possível da árvore?'],
      ['10 min', 'Árvores por toda parte', 'Mostre outros exemplos: pastas do computador, árvore genealógica, chaveamento de campeonato. Retome o grafo de rotas: o que diferencia uma árvore de um grafo qualquer? (Não tem ciclos e há um único caminho entre dois vértices.)'],
      ['35 min', 'Programando a árvore', 'As duplas transformam a chave de classificação num programa de perguntas e respostas com condições aninhadas. Outros grupos testam tentando “quebrar” o programa.'],
      ['15 min', 'Fechamento', 'Discuta: assistentes virtuais e diagnósticos usam árvores de decisão. Quais são os riscos se a árvore tiver perguntas mal escolhidas?']
    ],
    avaliacao: 'Árvore de classificação correta e programa que classifica todos os casos previstos.',
    inclusao: 'Use objetos reais ou cartões táteis para a classificação; a árvore pode ser montada no chão com barbante.',
    recursos: ['rotas', 'f-grafo']
  },
  'p-automatos': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Descrever comportamentos com estados, eventos e transições.',
      'Desenhar o diagrama de um autômato simples.',
      'Implementar um autômato com programação orientada a eventos.'
    ],
    materiais: ['Cartões com nomes de estados', 'Scratch (eventos e mensagens) ou micro:bit, se houver'],
    etapas: [
      ['10 min', 'O semáforo', 'Que “estados” tem um semáforo? O que faz ele mudar de um para outro? Desenhe juntos: verde → amarelo → vermelho → verde, com o tempo como evento.'],
      ['20 min', 'Máquinas do dia a dia', 'Em grupos, desenhem o autômato de outro objeto: catraca de ônibus (travada/livre; eventos: cartão, empurrar), porta automática, máquina de refrigerante. Atenção: todo estado precisa saber o que fazer com cada evento.'],
      ['15 min', 'Encenação', 'Um grupo encena seu autômato: um aluno é a máquina com um cartão de estado e os colegas disparam eventos. A turma verifica se as transições estão completas.'],
      ['40 min', 'Programando estados', 'No Scratch, as duplas implementam o semáforo ou um personagem com estados (parado, andando, pulando) controlado por teclas. Usem uma variável “estado” e eventos de tecla ou de mensagem.'],
      ['15 min', 'Socialização', 'Mostrem os programas. Onde mais aparecem autômatos? Jogos, elevadores, validação de senhas.']
    ],
    avaliacao: 'Diagrama com estados e transições completos e programa coerente com o diagrama.',
    inclusao: 'A encenação com cartões dá sentido concreto aos estados. No programa, use sons diferentes para cada estado, o que também ajuda estudantes com baixa visão.',
    recursos: []
  },
  'p-cidade': {
    duracao: '4 aulas de 50 min',
    objetivos: [
      'Investigar um problema social do município ou do estado usando dados e ambientes digitais.',
      'Propor e prototipar uma solução computacional colaborativa.',
      'Comunicar a proposta para a comunidade.'
    ],
    materiais: ['Computadores com acesso à internet', 'Portais de dados abertos do município, do estado ou do IBGE', 'Scratch, planilhas ou ferramenta de site simples'],
    etapas: [
      ['20 min', 'O que incomoda na nossa cidade?', 'Levantamento de problemas: transporte, lixo, segurança no trânsito, acesso à saúde, lazer. Votação para escolher de 4 a 6 temas.'],
      ['40 min', 'Investigação', 'Os grupos buscam dados em portais oficiais e notícias locais, e fazem uma pequena enquete on-line com a comunidade escolar. Organizam os dados numa planilha.'],
      ['30 min', 'Ideação', 'A partir dos dados, cada grupo propõe uma solução computacional: um mapa colaborativo, um aplicativo de avisos, um jogo educativo, um painel de dados.'],
      ['70 min', 'Protótipo', 'Construção de um protótipo funcional ou navegável (Scratch, planilha com gráficos, site de uma página). Foco no essencial.'],
      ['40 min', 'Apresentação para a comunidade', 'Pitch de 3 minutos para a turma e convidados (direção, famílias, alguém da prefeitura, se possível). Recebem perguntas e sugestões.']
    ],
    avaliacao: 'Uso de dados reais para justificar o problema, protótipo coerente com a proposta e qualidade da apresentação.',
    inclusao: 'Incentive que pelo menos um grupo trate de acessibilidade urbana; estudantes com deficiência podem trazer sua experiência como especialistas, se quiserem.',
    recursos: []
  },
  'p-sociedade': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Avaliar implicações políticas, socioambientais e culturais de tecnologias digitais.',
      'Discutir a distribuição desigual do acesso à computação no Brasil e no mundo.',
      'Argumentar com base em evidências e respeitar posições diferentes.'
    ],
    materiais: ['Dados sobre acesso à internet no Brasil (por exemplo, da pesquisa TIC Domicílios)', 'Fichas de papéis para o júri simulado'],
    etapas: [
      ['15 min', 'Quem está conectado?', 'Apresente dados sobre acesso à internet por região, renda e zona urbana/rural. O que esses números significam para estudar, trabalhar e acessar serviços públicos?'],
      ['15 min', 'Questão em julgamento', 'Escolha uma questão, como: “O reconhecimento facial deve ser usado em escolas?” ou “Datacenters devem ser instalados em regiões com falta de água?”. Divida a turma em defesa, acusação, especialistas e júri.'],
      ['25 min', 'Preparação', 'Cada grupo pesquisa argumentos e evidências: impactos na privacidade, no meio ambiente, no emprego, na cultura e em quem ganha ou perde com a tecnologia.'],
      ['30 min', 'Júri simulado', 'Apresentações, réplicas e perguntas dos especialistas. O júri delibera e justifica a decisão com os argumentos mais fortes.'],
      ['15 min', 'Desigualdade global', 'Fechamento: onde são fabricados os aparelhos, onde vai parar o lixo eletrônico e onde ficam as empresas que lucram? Que responsabilidades temos como consumidores e cidadãos?']
    ],
    avaliacao: 'Qualidade dos argumentos com evidências e respeito às regras do debate; texto curto individual com a posição do aluno.',
    inclusao: 'Distribua papéis conforme o perfil (pesquisa, fala, registro). Ofereça os dados também em formato de tabela acessível.',
    recursos: ['p-lixo']
  },
  'p-autoria': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Diferenciar conteúdo protegido por direitos autorais, licenças livres e domínio público.',
      'Dar créditos corretamente e pedir autorização de uso de imagem.',
      'Discutir questões éticas de autoria no conteúdo gerado por inteligência artificial.'
    ],
    materiais: ['Exemplos de imagens e músicas com diferentes licenças', 'Computadores para buscar bancos de conteúdo livre'],
    etapas: [
      ['10 min', 'Posso usar?', 'Apresente situações: usar uma música famosa num vídeo da escola, uma foto encontrada na busca, a foto de um colega num meme. A turma vota: pode, não pode ou depende.'],
      ['20 min', 'Direitos e licenças', 'Explique direitos autorais, domínio público e licenças Creative Commons (atribuição, não comercial, sem derivações). Mostre como achar a licença de uma imagem.'],
      ['15 min', 'Direito de imagem', 'Discuta o direito de imagem: a pessoa que aparece precisa autorizar. Para menores de idade, a autorização é dos responsáveis. Relacione com a LGPD e com montagens humilhantes.'],
      ['35 min', 'Produção com créditos', 'Em duplas, criem um cartaz digital sobre um tema escolar usando apenas imagens com licença livre ou próprias, com os créditos completos. Discutam: e se usarem uma imagem gerada por IA? Como indicar isso?'],
      ['20 min', 'Fechamento', 'Retome as situações iniciais e revote. Cada aluno escreve uma regra de autoria que vai seguir em seus trabalhos.']
    ],
    avaliacao: 'Cartaz com imagens de uso permitido e créditos corretos; mudança de respostas na revotação justificada.',
    inclusao: 'Peça descrição em texto alternativo para as imagens do cartaz: além de acessível, é parte da boa autoria digital.',
    recursos: ['p-midia']
  }
};
