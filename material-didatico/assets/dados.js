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
  plano: { nome: 'Plano de aula', plural: 'Planos de aula', icone: '📋' },
  lista: { nome: 'Lista de exercícios', plural: 'Listas de exercícios', icone: '📝' },
  '3d':  { nome: 'Recurso 3D', plural: 'Recursos 3D', icone: '🧊' }
};

/* Jogos em dois grupos, pelo jeito de jogar (campo interacao de cada jogo):
   - 'perguntas': responder uma pergunta de cada vez (escolher, digitar ou clicar na resposta) e somar acertos.
   - 'outras': montar, programar, explorar, simular, arrastar, digitar textos etc.
   Jogo novo sem o campo entra em 'outras'. A ordem abaixo é a ordem dos grupos nas páginas. */
const INTERACOES = {
  outras: { nome: 'Montar, explorar e simular', curto: 'Outras interações',
    desc: 'Monte, programe, explore, simule e tome decisões para chegar ao objetivo.' },
  perguntas: { nome: 'Responder e ganhar pontos', curto: 'Perguntas e pontos',
    desc: 'Uma pergunta de cada vez: escolha ou digite a resposta e some acertos.' }
};
const interacaoDe = r => (r.interacao === 'perguntas' ? 'perguntas' : 'outras');

/* Eixos (Computação) e unidades temáticas (Matemática) */
const EIXOS = {
  PC: { comp: 'CO', nome: 'Pensamento computacional' },
  MD: { comp: 'CO', nome: 'Mundo digital' },
  CD: { comp: 'CO', nome: 'Cultura digital' },
  NU: { comp: 'MA', nome: 'Números' },
  AL: { comp: 'MA', nome: 'Álgebra' },
  GE: { comp: 'MA', nome: 'Geometria' },
  GM: { comp: 'MA', nome: 'Grandezas e medidas' },
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
  ['EF06MA03', 6, 'NU', 'Operações com naturais', 'Resolver e elaborar problemas com cálculos (mentais ou escritos, exatos ou aproximados) envolvendo números naturais, com ou sem calculadora.'],
  ['EF06MA04', 6, 'NU', 'Fluxograma', 'Construir algoritmo em linguagem natural e representá-lo por fluxograma que resolva um problema simples (por exemplo, saber se um número é par).'],
  ['EF06MA07', 6, 'NU', 'Frações', 'Compreender, comparar e ordenar frações associadas a partes de inteiros e a resultados de divisão, identificando frações equivalentes.'],
  ['EF06MA06', 6, 'NU', 'Múltiplos e divisores', 'Resolver e elaborar problemas que envolvam as ideias de múltiplo e de divisor.'],
  ['EF06MA16', 6, 'GE', 'Plano cartesiano', 'Associar pares ordenados a pontos do plano cartesiano do 1º quadrante, como na localização dos vértices de um polígono.'],
  ['EF06MA17', 6, 'GE', 'Prismas e pirâmides', 'Quantificar e estabelecer relações entre o número de vértices, faces e arestas de prismas e pirâmides, em função do seu polígono da base, para resolver problemas e desenvolver a percepção espacial.'],
  ['EF06MA18', 6, 'GE', 'Polígonos', 'Reconhecer, nomear e comparar polígonos considerando lados, vértices e ângulos, e classificá-los em regulares e não regulares.'],
  ['EF06MA19', 6, 'GE', 'Triângulos', 'Identificar características dos triângulos e classificá-los em relação às medidas dos lados e dos ângulos.'],
  ['EF06MA20', 6, 'GE', 'Quadriláteros', 'Identificar características dos quadriláteros, classificá-los em relação a lados e ângulos e reconhecer a inclusão e a intersecção de classes entre eles.'],
  ['EF06MA34', 6, 'PE', 'Fluxogramas e diagramas', 'Interpretar e desenvolver fluxogramas simples, identificando relações entre objetos (por exemplo, cidades ligadas por estradas).'],
  ['EF07MA03', 7, 'NU', 'Números inteiros', 'Comparar e ordenar números inteiros, associá-los a pontos da reta numérica e usá-los em adições e subtrações.'],
  ['EF07MA05', 7, 'NU', 'Algoritmos', 'Resolver um mesmo problema utilizando diferentes algoritmos.'],
  ['EF07MA07', 7, 'NU', 'Fluxograma', 'Representar por meio de um fluxograma os passos utilizados para resolver um grupo de problemas.'],
  ['EF07MA13', 7, 'AL', 'Variável e incógnita', 'Compreender a ideia de variável, representada por letra ou símbolo, diferenciando-a da ideia de incógnita.'],
  ['EF07MA18', 7, 'AL', 'Equações de 1º grau', 'Resolver e elaborar problemas representados por equações polinomiais de 1º grau redutíveis a ax + b = c, usando as propriedades da igualdade.'],
  ['EF07MA20', 7, 'GE', 'Simetrias no plano cartesiano', 'Reconhecer e representar, no plano cartesiano, o simétrico de figuras em relação aos eixos e à origem.'],
  ['EF07MA32', 7, 'GM', 'Área de figuras planas', 'Resolver e elaborar problemas de cálculo de área de figuras planas que podem ser decompostas em quadrados, retângulos e/ou triângulos, usando a equivalência entre áreas.'],
  ['EF08MA06', 8, 'AL', 'Valor numérico', 'Resolver e elaborar problemas que envolvam o cálculo do valor numérico de expressões algébricas, usando as propriedades das operações.'],
  ['EF08MA08', 8, 'AL', 'Sistemas de equações', 'Resolver e elaborar problemas do contexto próximo representados por sistemas de equações de 1º grau com duas incógnitas.'],
  ['EF08MA10', 8, 'AL', 'Sequências', 'Identificar a regularidade de uma sequência não recursiva e construir um fluxograma que indique os próximos termos.'],
  ['EF09MA06', 9, 'AL', 'Funções', 'Compreender as funções como relações de dependência unívoca entre duas variáveis e suas representações numérica, algébrica e gráfica, e utilizar esse conceito para analisar situações que envolvam relações funcionais entre duas variáveis.'],
  ['EF08MA22', 8, 'PE', 'Probabilidade', 'Calcular a probabilidade de eventos com base no espaço amostral, usando o princípio multiplicativo.'],
  // ---------- Matemática · oficinas (textos oficiais da BNCC) ----------
  ['EF06MA01', 6, 'NU', 'Sistema de numeração decimal', 'Comparar, ordenar, ler e escrever números naturais e números racionais cuja representação decimal é finita, fazendo uso da reta numérica.'],
  ['EF06MA02', 6, 'NU', 'Sistema de numeração decimal', 'Reconhecer o sistema de numeração decimal, como o que prevaleceu no mundo ocidental, e destacar semelhanças e diferenças com outros sistemas, de modo a sistematizar suas principais características (base, valor posicional e função do zero), utilizando, inclusive, a composição e decomposição de números naturais e números racionais em sua representação decimal.'],
  ['EF06MA05', 6, 'NU', 'Múltiplos e divisores', 'Classificar números naturais em primos e compostos, estabelecer relações entre números, expressas pelos termos “é múltiplo de”, “é divisor de”, “é fator de”, e estabelecer, por meio de investigações, critérios de divisibilidade por 2, 3, 4, 5, 6, 8, 9, 10, 100 e 1000.'],
  ['EF06MA08', 6, 'NU', 'Frações e decimais', 'Reconhecer que os números racionais positivos podem ser expressos nas formas fracionária e decimal, estabelecer relações entre essas representações, passando de uma representação para outra, e relacioná-los a pontos na reta numérica.'],
  ['EF06MA10', 6, 'NU', 'Frações', 'Resolver e elaborar problemas que envolvam adição ou subtração com números racionais positivos na representação fracionária.'],
  ['EF06MA11', 6, 'NU', 'Operações com racionais', 'Resolver e elaborar problemas com números racionais positivos na representação decimal, envolvendo as quatro operações fundamentais e a potenciação, por meio de estratégias diversas, utilizando estimativas e arredondamentos para verificar a razoabilidade de respostas, com e sem uso de calculadora.'],
  ['EF06MA13', 6, 'NU', 'Porcentagens', 'Resolver e elaborar problemas que envolvam porcentagens, com base na ideia de proporcionalidade, sem fazer uso da “regra de três”, utilizando estratégias pessoais, cálculo mental e calculadora, em contextos de educação financeira, entre outros.'],
  ['EF06MA14', 6, 'AL', 'Propriedades da igualdade', 'Reconhecer que a relação de igualdade matemática não se altera ao adicionar, subtrair, multiplicar ou dividir os seus dois membros por um mesmo número e utilizar essa noção para determinar valores desconhecidos na resolução de problemas.'],
  ['EF06MA15', 6, 'AL', 'Partilha e razão', 'Resolver e elaborar problemas que envolvam a partilha de uma quantidade em duas partes desiguais, envolvendo relações aditivas e multiplicativas, bem como a razão entre as partes e entre uma das partes e o todo.'],
  ['EF06MA24', 6, 'GM', 'Grandezas e medidas', 'Resolver e elaborar problemas que envolvam as grandezas comprimento, massa, tempo, temperatura, área (triângulos e retângulos), capacidade e volume (sólidos formados por blocos retangulares), sem uso de fórmulas, inseridos, sempre que possível, em contextos oriundos de situações reais e/ou relacionadas às outras áreas do conhecimento.'],
  ['EF06MA29', 6, 'GM', 'Perímetro e área do quadrado', 'Analisar e descrever mudanças que ocorrem no perímetro e na área de um quadrado ao se ampliarem ou reduzirem, igualmente, as medidas de seus lados, para compreender que o perímetro é proporcional à medida do lado, o que não ocorre com a área.'],
  ['EF07MA01', 7, 'NU', 'Múltiplos e divisores de um número natural', 'Resolver e elaborar problemas com números naturais, envolvendo as noções de divisor e de múltiplo, podendo incluir máximo divisor comum ou mínimo múltiplo comum, por meio de estratégias diversas, sem a aplicação de algoritmos.'],
  ['EF07MA04', 7, 'NU', 'Números inteiros', 'Resolver e elaborar problemas que envolvam operações com números inteiros.'],
  ['EF07MA08', 7, 'NU', 'Frações e seus significados', 'Comparar e ordenar frações associadas às ideias de partes de inteiros, resultado da divisão, razão e operador.'],
  ['EF07MA09', 7, 'NU', 'Fração e razão', 'Utilizar, na resolução de problemas, a associação entre razão e fração, como a fração 2/3 para expressar a razão de duas partes de uma grandeza para três partes da mesma ou três partes de outra grandeza.'],
  ['EF07MA10', 7, 'NU', 'Números racionais', 'Comparar e ordenar números racionais em diferentes contextos e associá-los a pontos da reta numérica.'],
  ['EF07MA11', 7, 'NU', 'Números racionais', 'Compreender e utilizar a multiplicação e a divisão de números racionais, a relação entre elas e suas propriedades operatórias.'],
  ['EF07MA12', 7, 'NU', 'Números racionais', 'Resolver e elaborar problemas que envolvam as operações com números racionais.'],
  ['EF07MA17', 7, 'AL', 'Proporcionalidade', 'Resolver e elaborar problemas que envolvam variação de proporcionalidade direta e de proporcionalidade inversa entre duas grandezas, utilizando sentença algébrica para expressar a relação entre elas.'],
  ['EF07MA23', 7, 'GE', 'Paralelas e transversal', 'Verificar relações entre os ângulos formados por retas paralelas cortadas por uma transversal, com e sem uso de softwares de geometria dinâmica.'],
  ['EF07MA24', 7, 'GE', 'Triângulos', 'Construir triângulos, usando régua e compasso, reconhecer a condição de existência do triângulo quanto à medida dos lados e verificar que a soma das medidas dos ângulos internos de um triângulo é 180°.'],
  ['EF07MA27', 7, 'GE', 'Polígonos regulares', 'Calcular medidas de ângulos internos de polígonos regulares, sem o uso de fórmulas, e estabelecer relações entre ângulos internos e externos de polígonos, preferencialmente vinculadas à construção de mosaicos e de ladrilhamentos.'],
  ['EF07MA31', 7, 'GM', 'Área de figuras planas', 'Estabelecer expressões de cálculo de área de triângulos e de quadriláteros.'],
  ['EF08MA01', 8, 'NU', 'Notação científica', 'Efetuar cálculos com potências de expoentes inteiros e aplicar esse conhecimento na representação de números em notação científica.'],
  ['EF08MA02', 8, 'NU', 'Potenciação e radiciação', 'Resolver e elaborar problemas usando a relação entre potenciação e radiciação, para representar uma raiz como potência de expoente fracionário.'],
  ['EF08MA12', 8, 'AL', 'Proporcionalidade', 'Identificar a natureza da variação de duas grandezas, diretamente, inversamente proporcionais ou não proporcionais, expressando a relação existente por meio de sentença algébrica e representá-la no plano cartesiano.'],
  ['EF08MA13', 8, 'AL', 'Proporcionalidade', 'Resolver e elaborar problemas que envolvam grandezas diretamente ou inversamente proporcionais, por meio de estratégias variadas.'],
  ['EF08MA19', 8, 'GM', 'Área de figuras planas', 'Resolver e elaborar problemas que envolvam medidas de área de figuras geométricas, utilizando expressões de cálculo de área (quadriláteros, triângulos e círculos), em situações como determinar medida de terrenos.'],
  ['EF08MA20', 8, 'GM', 'Volume de bloco retangular e capacidade', 'Reconhecer a relação entre um litro e um decímetro cúbico e a relação entre litro e metro cúbico, para resolver problemas de cálculo de capacidade de recipientes.'],
  ['EF08MA21', 8, 'GM', 'Volume de bloco retangular e capacidade', 'Resolver e elaborar problemas que envolvam o cálculo do volume de recipiente cujo formato é o de um bloco retangular.'],
  ['EF09MA03', 9, 'NU', 'Potências e raízes', 'Efetuar cálculos com números reais, inclusive potências com expoentes fracionários.'],
  ['EF09MA07', 9, 'AL', 'Razão entre grandezas de espécies diferentes', 'Resolver problemas que envolvam a razão entre duas grandezas de espécies diferentes, como velocidade e densidade demográfica.'],
  ['EF09MA08', 9, 'AL', 'Proporcionalidade', 'Resolver e elaborar problemas que envolvam relações de proporcionalidade direta e inversa entre duas ou mais grandezas, inclusive escalas, divisão em partes proporcionais e taxa de variação, em contextos socioculturais, ambientais e de outras áreas.'],
  ['EF09MA09', 9, 'AL', 'Expressões algébricas: fatoração e produtos notáveis', 'Compreender os processos de fatoração de expressões algébricas, com base em suas relações com os produtos notáveis, para resolver e elaborar problemas que possam ser representados por equações polinomiais do 2º grau.'],
  ['EF09MA10', 9, 'GE', 'Paralelas e transversal', 'Demonstrar relações simples entre os ângulos formados por retas paralelas cortadas por uma transversal.'],
  ['EF09MA12', 9, 'GE', 'Semelhança de triângulos', 'Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes.'],
  ['EF09MA14', 9, 'GE', 'Tales e Pitágoras', 'Resolver e elaborar problemas de aplicação do teorema de Pitágoras ou das relações de proporcionalidade envolvendo retas paralelas cortadas por secantes.'],
  ['EF09MA19', 9, 'GM', 'Volume de prismas e cilindros', 'Resolver e elaborar problemas que envolvam medidas de volumes de prismas e de cilindros retos, inclusive com uso de expressões de cálculo, em situações cotidianas.'],
  ["EF06MA31", 6, "PE", "Leitura de tabelas e gráficos", "Identificar as variáveis e suas frequências e os elementos constitutivos (título, eixos, legendas, fontes e datas) em diferentes tipos de gráfico."],
  ["EF06MA33", 6, "PE", "Coleta de dados e construção de gráficos", "Planejar e coletar dados de pesquisa referente a práticas sociais escolhidas pelos alunos e fazer uso de planilhas eletrônicas para registro, representação e interpretação das informações, em tabelas, vários tipos de gráficos e texto."],
  ["EF07MA02", 7, "NU", "Porcentagens: acréscimos e decréscimos", "Resolver e elaborar problemas que envolvam porcentagens, como os que lidam com acréscimos e decréscimos simples, utilizando estratégias pessoais, cálculo mental e calculadora, no contexto de educação financeira, entre outros."],
  ["EF07MA06", 7, "NU", "Problemas de mesma estrutura", "Reconhecer que as resoluções de um grupo de problemas que têm a mesma estrutura podem ser obtidas utilizando os mesmos procedimentos."],
  ["EF07MA37", 7, "PE", "Gráficos de setores", "Interpretar e analisar dados apresentados em gráfico de setores divulgados pela mídia e compreender quando é possível ou conveniente sua utilização."],
  ["EF08MA03", 8, "NU", "Princípio multiplicativo da contagem", "Resolver e elaborar problemas de contagem cuja resolução envolva a aplicação do princípio multiplicativo."],
  ["EF08MA04", 8, "NU", "Porcentagens", "Resolver e elaborar problemas, envolvendo cálculo de porcentagens, incluindo o uso de tecnologias digitais."],
  ["EF08MA23", 8, "PE", "Adequação de gráficos", "Avaliar a adequação de diferentes tipos de gráficos para representar um conjunto de dados de uma pesquisa."],
  ["EF09MA05", 9, "NU", "Percentuais sucessivos", "Resolver e elaborar problemas que envolvam porcentagens, com a ideia de aplicação de percentuais sucessivos e a determinação das taxas percentuais, preferencialmente com o uso de tecnologias digitais, no contexto da educação financeira."],
  ["EF09MA21", 9, "PE", "Gráficos que induzem a erros", "Analisar e identificar, em gráficos divulgados pela mídia, os elementos que podem induzir, às vezes propositadamente, erros de leitura, como escalas inapropriadas, legendas não explicitadas corretamente, omissão de informações importantes (fontes e datas), entre outros."],
  ["EF09MA22", 9, "PE", "Escolha do gráfico adequado", "Escolher e construir o gráfico mais adequado (colunas, setores, linhas), com ou sem uso de planilhas eletrônicas, para apresentar um determinado conjunto de dados, destacando aspectos como as medidas de tendência central."],
  ["EF06MA25", 6, "GM", "Ângulos: noção e usos", "Reconhecer a abertura do ângulo como grandeza associada às figuras geométricas."],
  ["EF06MA26", 6, "GM", "Ângulos: noção e usos", "Resolver problemas que envolvam a noção de ângulo em diferentes contextos e em situações reais, como ângulo de visão."],
  ["EF06MA27", 6, "GM", "Ângulos: medida", "Determinar medidas da abertura de ângulos, por meio de transferidor e/ou tecnologias digitais."],
  ["EF06MA32", 6, "PE", "Tabelas e gráficos", "Interpretar e resolver situações que envolvam dados de pesquisas apresentadas em tabelas e em diferentes tipos de gráficos e redigir textos para sintetizar conclusões."],
  ["EF07MA35", 7, "PE", "Média estatística", "Compreender o significado de média estatística como indicador da tendência de uma pesquisa, calcular seu valor e relacioná-lo, intuitivamente, com a amplitude do conjunto de dados."],
  ["EF07MA36", 7, "PE", "Pesquisa amostral e censitária", "Planejar e realizar pesquisa envolvendo tema da realidade social e comunicar os dados por meio de relatório escrito, tabelas e gráficos, com o apoio de planilhas eletrônicas."],
  ["EF06MA28", 6, "GE", "Plantas baixas e vistas aéreas", "Interpretar, descrever e desenhar plantas baixas simples de residências e vistas aéreas."],
  ["EF08MA25", 8, "PE", "Medidas de tendência central", "Obter os valores de medidas de tendência central de uma pesquisa estatística (média, moda e mediana) com a compreensão de seus significados e relacioná-los com a dispersão de dados, indicada pela amplitude."],
];

const HABILIDADES = HABILIDADES_RAW.map(([codigo, ano, eixo, objeto, texto]) => ({
  codigo, ano, eixo, objeto, texto, comp: EIXOS[eixo].comp
}));
const HAB = Object.fromEntries(HABILIDADES.map(h => [h.codigo, h]));

/* Anos iniciais: só as habilidades de Computação usadas pelo caderno de datas festivas.
   Ficam fora de HABILIDADES para não aparecer em Explorar a BNCC, que cobre o 6º ao 9º ano. */
[
  ['EF01CO01', 1, 'PC', 'Organização de objetos', 'Organizar objetos físicos ou digitais considerando diferentes características para esta organização, explicitando semelhanças (padrões) e diferenças.'],
  ['EF01CO02', 1, 'PC', 'Algoritmos: definição', 'Identificar e seguir sequências de passos aplicados no dia a dia para resolver problemas.'],
  ['EF01CO03', 1, 'PC', 'Algoritmos: definição', 'Reorganizar e criar sequências de passos em meios físicos ou digitais, relacionando essas sequências à palavra “algoritmos”.'],
  ['EF02CO01', 2, 'PC', 'Modelagem de objetos', 'Criar e comparar modelos (representações) de objetos, identificando padrões e atributos essenciais.'],
  ['EF02CO02', 2, 'PC', 'Algoritmos com repetição simples', 'Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, construídos como sequências de passos e com repetições simples (iterações definidas), em contextos do cotidiano.'],
  ['EF02CO03', 2, 'MD', 'Instrução de máquina', 'Identificar que máquinas diferentes executam conjuntos próprios de instruções e que podem ser usadas para definir algoritmos.'],
  ['EF02CO04', 2, 'MD', 'Hardware e software', 'Diferenciar componentes físicos (hardware) e programas que fornecem as instruções (software) para o hardware.'],
  ['EF03CO01', 3, 'PC', 'Lógica computacional', 'Associar os valores “verdadeiro” e “falso” a sentenças lógicas que dizem respeito a situações do dia a dia, fazendo uso de termos que indicam negação.'],
  ['EF03CO06', 3, 'MD', 'Interface física', 'Reconhecer que, para um computador realizar tarefas, ele se comunica com o mundo exterior com o uso de interfaces físicas (dispositivos de entrada e saída).'],
  ['EF04CO01', 4, 'PC', 'Matrizes e registros', 'Reconhecer objetos do mundo real e/ou digital que podem ser representados através de matrizes que estabelecem uma organização na qual cada componente está em uma posição definida por coordenadas, e fazer manipulações simples sobre estas matrizes.'],
  ['EF04CO04', 4, 'MD', 'Codificação da informação', 'Entender que para guardar, manipular e transmitir dados deve-se codificá-los de alguma forma que seja compreendida pela máquina (formato digital).'],
  ['EF04CO05', 4, 'MD', 'Codificação da informação', 'Codificar diferentes informações para representação em computador (binária, ASCII, atributos de pixel, como RGB etc.).'],
  ['EF05CO01', 5, 'PC', 'Listas', 'Reconhecer objetos do mundo real e/ou digital que podem ser representados através de listas que estabelecem uma organização na qual há um número variável de itens dispostos em sequência, e fazer manipulações simples sobre estas listas.'],
  ['EF05CO02', 5, 'PC', 'Grafos', 'Reconhecer objetos do mundo real e/ou digital que podem ser representados através de grafos que estabelecem uma organização com uma quantidade variável de vértices conectados por arestas, e fazer manipulações simples sobre estes grafos.'],
  ['EF05CO03', 5, 'PC', 'Lógica computacional', 'Realizar operações de negação, conjunção e disjunção sobre sentenças lógicas e valores “verdadeiro” e “falso”.'],
  ['EF05CO04', 5, 'PC', 'Algoritmos com seleção condicional', 'Criar e simular algoritmos representados em linguagem oral, escrita ou pictográfica, que incluam sequências, repetições e seleções condicionais para resolver problemas de forma independente e em colaboração.'],
].forEach(([codigo, ano, eixo, objeto, texto]) => { HAB[codigo] = { codigo, ano, eixo, objeto, texto, comp: EIXOS[eixo].comp }; });

/* ---------------------------------------------------------------------
   RECURSOS — url é relativa à pasta material-didatico/
   --------------------------------------------------------------------- */
const RECURSOS = [
  // ---------- Jogos ----------
  { id: 'robo', tipo: 'jogo', interacao: 'outras', titulo: 'Robô Coletor', comp: ['CO', 'MA'], anos: [6, 7],
    habs: ['EF06CO02', 'EF06CO03', 'EF06CO04', 'EF06MA04', 'EF07MA07'], tempo: '15–25 min',
    resumo: 'Monte a sequência de comandos, use a repetição e leve o robô até todas as estrelas com o menor programa possível.',
    url: 'jogos/robo.html', plano: 'p-robo', ficha: 'f-robo' },
  { id: 'pacotes', tipo: 'jogo', interacao: 'outras', titulo: 'Correio de Pacotes', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF06CO07', 'EF07CO06', 'EF08CO06'], tempo: '10–15 min',
    resumo: 'As mensagens chegam picadas e fora de ordem. Remonte os pacotes pelo número e peça de novo os que se perderam no caminho.',
    url: 'jogos/pacotes.html', plano: 'p-internet', ficha: 'f-pacotes' },
  { id: 'rotas', tipo: 'jogo', interacao: 'outras', titulo: 'Rota Mais Curta', comp: ['CO', 'MA'], anos: [6, 7, 9],
    habs: ['EF07CO04', 'EF09CO01', 'EF06MA34'], tempo: '15 min',
    resumo: 'Os bairros são vértices, as ruas são arestas. Encontre o caminho de menor custo e compare com a solução ótima.',
    url: 'jogos/rotas.html', plano: 'p-grafos', ficha: 'f-grafo' },
  { id: 'cifra', tipo: 'jogo', interacao: 'perguntas', titulo: 'Detetive da Cifra', comp: ['CO'], anos: [9],
    habs: ['EF09CO05'], tempo: '15–20 min',
    resumo: 'Decifre mensagens com a Cifra de César, descubra chaves escondidas e entenda por que ela é fácil de quebrar.',
    url: 'jogos/cifra.html', plano: 'p-cripto', ficha: 'f-cesar' },
  { id: 'golpe', tipo: 'jogo', interacao: 'perguntas', titulo: 'Golpe ou Seguro?', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF07CO07', 'EF08CO08', 'EF08CO10', 'EF09CO04'], tempo: '10 min',
    resumo: 'Mensagens, links e pedidos de dados chegam o tempo todo. Decida o que é golpe e veja os sinais que denunciam cada um.',
    url: 'jogos/golpe.html', plano: 'p-golpes', ficha: 'f-golpe' },
  { id: 'fracoes', tipo: 'jogo', interacao: 'perguntas', titulo: 'Corrida das Frações', comp: ['MA'], anos: [6],
    habs: ['EF06MA07'], tempo: '10 min',
    resumo: 'Qual fração é maior? Compare, encontre equivalentes e mantenha a sequência de acertos — primeiro com barras, depois sem.',
    url: 'jogos/fracoes.html', plano: 'p-fracoes', ficha: 'f-fracoes' },
  { id: 'cartesiano', tipo: 'jogo', interacao: 'perguntas', titulo: 'Tesouro Cartesiano', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA16', 'EF07MA03', 'EF07MA20'], tempo: '10–15 min',
    resumo: 'Marque pontos pelas coordenadas, avance para os quatro quadrantes e encontre os pontos simétricos em relação aos eixos.',
    url: 'jogos/cartesiano.html', plano: 'p-cartesiano', ficha: 'f-batalha' },
  { id: 'balanca', tipo: 'jogo', interacao: 'outras', titulo: 'Balança das Equações', comp: ['MA'], anos: [7, 8],
    habs: ['EF07MA18', 'EF07MA13', 'EF08MA06'], tempo: '15 min',
    resumo: 'Tire o mesmo peso dos dois lados, divida por igual e descubra quanto vale cada caixa x sem desequilibrar a balança.',
    url: 'jogos/balanca.html', plano: 'p-equacoes', ficha: null },
  { id: 'tangram', tipo: 'jogo', interacao: 'outras', titulo: 'Tangram', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA18', 'EF06MA20', 'EF07MA32', 'EF06MA19', 'EF06MA07'], tempo: '15–20 min',
    resumo: 'Monte quadrado, triângulo, trapézio, hexágono e outras figuras com as 7 peças. Cada figura revela sua classificação, e as peças viram frações e áreas.',
    url: 'jogos/tangram.html', plano: null, ficha: null },
  { id: 'tabuada', tipo: 'jogo', interacao: 'perguntas', titulo: 'Corrida da Tabuada', comp: ['MA'], anos: [6],
    habs: ['EF06MA03', 'EF06MA06'], tempo: '5–10 min',
    resumo: 'Cada multiplicação certa acelera seu carro. Escolha as tabuadas, vença os rivais e veja no final quais fatos merecem revisão.',
    url: 'jogos/tabuada.html', plano: null, ficha: null },

  { id: 'graficos', tipo: 'jogo', interacao: 'perguntas', titulo: 'Detetive dos Gráficos', comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA31', 'EF07MA37', 'EF08MA23', 'EF09MA21'], tempo: '10–15 min',
    resumo: 'Leia gráficos de colunas e de setores, calcule porcentagens e desmascare gráficos enganosos com eixo cortado, escala torta ou sem fonte.',
    url: 'jogos/graficos.html', plano: 'p-ma-graficos', ficha: null },
  { id: 'wikipedia', tipo: 'jogo', interacao: 'perguntas', titulo: 'Qual Verbete Tem Mais Visitas?', comp: ['CO', 'MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA32', 'EF07MA36', 'EF08CO11'], tempo: '10 min',
    resumo: 'Dois verbetes da Wikipédia em português, uma escolha: qual foi mais lido no último ano? Números grandes e reais, atualizados todo mês.',
    url: 'jogos/wikipedia.html', plano: 'p-wikipedia', ficha: null },
  { id: 'mesada', tipo: 'jogo', interacao: 'outras', titulo: 'Desafio da Mesada', comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA13', 'EF07MA02', 'EF08MA04', 'EF09MA05'], tempo: '20–30 min',
    resumo: 'Dois anos de mesada para chegar às metas: poupança e aplicação com juros compostos, à vista ou parcelado, feiras, bicos, imprevistos, cheque especial e um 2º ano com bônus ou penalidades.',
    url: 'jogos/mesada.html', plano: 'p-ma-financeira', ficha: null },
  { id: 'poupanca', tipo: 'jogo', interacao: 'outras', titulo: 'Juros que Crescem', comp: ['MA'], anos: [7, 8, 9],
    habs: ['EF07MA02', 'EF08MA04', 'EF09MA05'], tempo: '10–15 min',
    resumo: 'Laboratório com gráfico e tabela para comparar juros simples e compostos na poupança, e um desafio de 6 perguntas para prever o rendimento.',
    url: 'jogos/poupanca.html', plano: 'p-ma-financeira', ficha: null },
  { id: 'bhaskara', tipo: 'jogo', interacao: 'outras', titulo: 'Bhaskara Passo a Passo', comp: ['MA'], anos: [9],
    habs: ['EF09MA09'], tempo: '15–20 min',
    resumo: 'Calculadora que resolve ax² + bx + c = 0 um passo de cada vez, com gráfico da parábola, e modo treino que corrige cada etapa e aponta o erro mais provável.',
    url: 'jogos/bhaskara.html', plano: null, ficha: null },
  { id: 'empresa-sucos', tipo: 'jogo', interacao: 'outras', titulo: 'Empresa de Sucos da Turma', comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA31', 'EF06MA32', 'EF07MA37', 'EF08MA23', 'EF09MA21'], tempo: '15–20 min',
    resumo: 'Seis meses à frente da empresa de sucos da turma: escolha estratégias e use colunas, setores e linhas para convencer os pais a investir.',
    url: 'jogos/empresa-sucos.html', plano: 'p-ma-graficos', ficha: null },
  { id: 'angulos', tipo: 'jogo', interacao: 'perguntas', titulo: 'Mira dos Ângulos', comp: ['MA'], anos: [7],
    habs: ['EF06MA25', 'EF06MA27', 'EF07MA23', 'EF07MA24', 'EF07MA27'], tempo: '15 min',
    resumo: 'Leia o transferidor para mirar o laser, classifique ângulos e descubra medidas em retas concorrentes, triângulos, paralelas e polígonos regulares.',
    url: 'jogos/angulos.html', plano: null, ficha: null },
  { id: 'cofrinho', tipo: 'jogo', interacao: 'outras', titulo: 'Cofrinho que Cresce', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA13', 'EF07MA02', 'EF09MA05'], tempo: '10–15 min',
    resumo: 'O cofrinho rende 10% ao mês. Guarde ou gaste a cada acontecimento, calcule os juros sobre juros e tente chegar à bicicleta de R$ 300.',
    url: 'jogos/cofrinho.html', plano: 'p-ma-financeira', ficha: null },
  { id: 'tabelas', tipo: 'jogo', interacao: 'perguntas', titulo: 'Gincana das Tabelas', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA31', 'EF06MA32', 'EF06MA33', 'EF07MA35', 'EF07MA36'], tempo: '10–15 min',
    resumo: 'Monte a tabela de frequência dos votos, leia tabelas de dupla entrada, ache o valor apagado pelos totais, calcule a média e cace o total errado.',
    url: 'jogos/tabelas.html', plano: null, ficha: null },
  { id: 'receitas', tipo: 'jogo', interacao: 'perguntas', titulo: 'Cozinha das Proporções', comp: ['MA'], anos: [6, 7, 8],
    habs: ['EF06MA15', 'EF07MA09', 'EF07MA17', 'EF08MA13'], tempo: '15 min',
    resumo: 'Aumente e diminua receitas sem mudar o sabor, compare qual suco ficou mais forte, simplifique razões e descubra o ingrediente que falta.',
    url: 'jogos/receitas.html', plano: 'p-ma-razao', ficha: 'f-ma-razao' },
  { id: 'cartao', tipo: 'jogo', interacao: 'outras', titulo: 'Cartão de Crédito de Treino', comp: ['MA'], anos: [7, 8, 9],
    habs: ['EF07MA02', 'EF08MA04', 'EF09MA05'], tempo: '15 min',
    resumo: 'Seis meses com um cartão de treino: limite, fatura, parcelas com e sem juros, pagamento mínimo e os juros do rotativo.',
    url: 'jogos/cartao.html', plano: 'p-ma-financeira', ficha: null },
  { id: 'cambio', tipo: 'jogo', interacao: 'perguntas', titulo: 'Viagem com Câmbio', comp: ['MA'], anos: [7, 8, 9],
    habs: ['EF07MA12', 'EF07MA17', 'EF08MA04', 'EF09MA07'], tempo: '15 min',
    resumo: 'Cinco países, cinco moedas: converta reais em dólar, euro, peso, libra e iene, compre lembranças com orçamento e compare casa de câmbio e cartão.',
    url: 'jogos/cambio.html', plano: 'p-ma-financeira', ficha: null },
  { id: 'vale-bits', tipo: 'jogo', interacao: 'outras', titulo: 'Vale dos Bits', comp: ['CO'], anos: [6, 7],
    habs: ['EF06CO01', 'EF06CO02', 'EF06CO07', 'EF06CO08', 'EF07CO07'], tempo: '20–30 min',
    resumo: 'Aventura num vale com regiões fechadas: converse com os moradores, junte fragmentos e abra os portões respondendo desafios de informática, lógica, dados, internet e algoritmos.',
    url: 'jogos/vale-bits.html', plano: 'p-dados', ficha: null },
  { id: 'vila-cidada', tipo: 'jogo', interacao: 'outras', titulo: 'Vila Cidadã', comp: ['CO'], anos: [6, 7, 8, 9],
    habs: ['EF06CO09', 'EF07CO08', 'EF07CO09', 'EF07CO10', 'EF08CO08', 'EF08CO09', 'EF09CO09', 'EF09CO10'], tempo: '20–30 min',
    resumo: 'Um mundo de blocos em 3D: ande pela vila, ajude seis moradores em situações de respeito, privacidade, autoria, checagem, bem-estar e termos de uso, e veja cada bairro ganhar uma construção nova.',
    url: 'jogos/vila-cidada.html', plano: 'p-conduta', ficha: 'f-co-cyberbullying' },
  { id: 'digitacao', tipo: 'jogo', interacao: 'outras', titulo: 'Dedos Ligeiros: Teste de Digitação', comp: ['CO'], anos: [6, 7, 8, 9],
    habs: ['EF06CO09', 'EF07CO11'], tempo: '5–10 min',
    resumo: 'Digite palavras, frases e textos em português com acentos e cedilha. Mede palavras por minuto e precisão, mostra a próxima tecla num teclado ABNT2 e guarda seus recordes.',
    url: 'jogos/digitacao.html', plano: null, ficha: null },
  { id: 'carreira', tipo: 'jogo', interacao: 'outras', titulo: 'Trilha da Carreira em Computação', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF09CO07', 'EF09CO08', 'EF06CO09'], tempo: '25–35 min',
    resumo: 'Jogo de tabuleiro sobre uma vida na computação: escola, curso técnico, graduação ou cursos livres, primeiro emprego e pós-graduação. Dado binário, desafios e escolhas entre dinheiro, bem-estar e impacto. Solo, com meta de vida, ou de 2 a 4 pessoas.',
    url: 'jogos/carreira.html', plano: 'p-sociedade', ficha: null },
  { id: 'impostor', tipo: 'jogo', interacao: 'outras', titulo: 'Impostor Digital', comp: ['CO'], anos: [6, 7, 8, 9],
    habs: ['EF06CO07', 'EF07CO07', 'EF08CO06', 'EF09CO07'], tempo: '10–20 min',
    resumo: 'Jogo de grupo para 3 a 15 pessoas na mesma sala, passando um só aparelho: todos recebem a mesma palavra de informática, menos o impostor. Conversem, votem e aprendam o significado de cada palavra.',
    url: 'jogos/impostor.html', plano: null, ficha: null },
  { id: 'python', tipo: 'jogo', interacao: 'outras', titulo: 'Horta em Python', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF06CO05', 'EF07CO02', 'EF07CO05', 'EF08CO02'], tempo: '25–40 min',
    resumo: 'Primeiros passos em Python cuidando da horta da escola: 21 missões de completar, prever a saída, montar e consertar programas com print, variáveis, input, if, for, while, listas e funções.',
    url: 'jogos/python.html', plano: 'p-bugs', ficha: null },
  { id: 'numeria', tipo: 'jogo', interacao: 'outras', titulo: 'A Lenda de Numéria', comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA03', 'EF06MA07', 'EF06MA10', 'EF07MA04', 'EF07MA18', 'EF06MA13', 'EF08MA01'], tempo: '20–40 min',
    resumo: 'RPG de matemática: crie sua personagem, atravesse cinco regiões e vença monstros e chefes respondendo contas, frações, negativos, equações, porcentagem e potências. A dificuldade segue o ano escolhido.',
    url: 'jogos/numeria.html', plano: 'p-ma-equacoes', ficha: null },
  { id: 'partes-computador', tipo: 'jogo', interacao: 'outras', titulo: 'Oficina do Computador', comp: ['CO'], anos: [1, 2, 3, 4, 5],
    habs: ['EF02CO04', 'EF03CO06'], tempo: '20–30 min',
    resumo: 'Jogo em 3D para os menores, com voz: conheça o monitor, o teclado, o mouse e as outras partes, ache cada uma, descubra para que serve e monte o computador por dentro.',
    url: 'jogos/partes-computador.html', plano: null, ficha: null },
  { id: 'senha', tipo: 'jogo', interacao: 'perguntas', titulo: 'Senha Forte', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF07CO07', 'EF08CO08'], tempo: '15 min',
    resumo: 'Descubra qual senha resiste mais, crie uma frase-senha forte para uma personagem sem usar os dados dela e aprenda os hábitos que protegem as contas.',
    url: 'jogos/senha.html', plano: 'p-golpes', ficha: 'f-co-seguranca7' },
  { id: 'paridade', tipo: 'jogo', interacao: 'outras', titulo: 'Mágica da Paridade', comp: ['CO'], anos: [6, 7],
    habs: ['EF06CO07', 'EF06CO01'], tempo: '10–15 min',
    resumo: 'Prepare a mesa de cartas com o bit de paridade e descubra qual carta o computador virou escondido. É assim que os dados com erro são detectados na transmissão.',
    url: 'jogos/paridade.html', plano: 'p-internet', ficha: null },
  { id: 'busca-binaria', tipo: 'jogo', interacao: 'outras', titulo: 'Estante da Busca Binária', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF08CO03', 'EF06CO05'], tempo: '10–15 min',
    resumo: 'Encontre o livro numa estante ordenada abrindo o menor número de livros. Compare a busca um a um com a busca pela metade e veja por que a ordem importa.',
    url: 'jogos/busca-binaria.html', plano: 'p-recursao', ficha: 'f-co-ordenar' },
  { id: 'filas-pilhas', tipo: 'jogo', interacao: 'outras', titulo: 'Refeitório das Filas e Pilhas', comp: ['CO'], anos: [7, 8],
    habs: ['EF08CO02', 'EF07CO03'], tempo: '15 min',
    resumo: 'Organize a fila do lanche e a pilha de bandejas, descubra quando usar cada estrutura e entregue os pedidos do balcão na ordem certa usando uma pilha.',
    url: 'jogos/filas-pilhas.html', plano: 'p-recursao', ficha: 'f-co-listas' },
  { id: 'linha-tempo', tipo: 'jogo', interacao: 'outras', titulo: 'Linha do Tempo da Computação', comp: ['CO'], anos: [6, 7, 8, 9],
    habs: ['EF06CO10', 'EF09CO07'], tempo: '15 min',
    resumo: 'Organize o Museu da Computação: coloque cada invenção no lugar certo da linha do tempo, da Pascalina ao Pix, com marcos do Brasil e da inteligência artificial.',
    url: 'jogos/linha-tempo.html', plano: null, ficha: null },
  { id: 'bingo', tipo: 'jogo', interacao: 'outras', titulo: 'Bingo de Informática', comp: ['CO'], anos: [6, 7, 8, 9],
    habs: ['EF06CO08', 'EF07CO07', 'EF08CO06', 'EF09CO04'], tempo: '20–30 min',
    resumo: 'Bingo para a turma toda: cartelas numeradas para imprimir, pistas sorteadas na tela, conferência de cartela e versão para marcar no celular. Hardware, internet, segurança, programação e IA.',
    url: 'jogos/bingo.html', plano: null, ficha: null },
  { id: 'cidade-blocos', tipo: 'jogo', interacao: 'perguntas', titulo: 'Cidade em Blocos', comp: ['CO'], anos: [7, 8, 9],
    habs: ['EF06CO02', 'EF07CO01', 'EF07CO02', 'EF07CO06', 'EF07CO07', 'EF08CO06', 'EF08CO08', 'EF09CO05', 'EF09CO10'], tempo: '30–40 min',
    resumo: 'Cidade de blocos de montar com seis bairros: responda os totens de desafio, junte peças, reconstrua os marcos e libere a cidade. Algoritmos, dados, depuração, redes, segurança e IA.',
    url: 'jogos/cidade-blocos.html', plano: 'p-bugs', ficha: null },
  { id: 'boletim', tipo: 'jogo', interacao: 'outras', titulo: 'Fórmulas do Boletim', comp: ['MA', 'CO'], anos: [7, 8, 9],
    habs: ['EF07MA35', 'EF07MA36', 'EF06MA33', 'EF07CO01', 'EF06CO02'], tempo: '20–30 min',
    resumo: 'Planilha eletrônica de verdade: complete o boletim de uma turma fictícia com SOMA, MÉDIA, SE, CONT.SE e MÁXIMO, copie as fórmulas para baixo e descubra quantos estudantes melhoraram.',
    url: 'jogos/boletim.html', plano: 'p-registros', ficha: null },
  { id: 'meteorologista', tipo: 'jogo', interacao: 'perguntas', titulo: 'Meteorologista de Dados', comp: ['MA'], anos: [8, 9],
    habs: ['EF07MA35', 'EF08MA25', 'EF09MA22', 'EF06MA32', 'EF06MA24'], tempo: '15 min',
    resumo: 'Temperatura e chuva de cidades do RS: leia séries, preveja a máxima de amanhã com média e tendência e confira quantas previsões acertaram.',
    url: 'jogos/meteorologista.html', plano: 'p-ma-graficos', ficha: null },
  { id: 'arquiteto', tipo: 'jogo', interacao: 'outras', titulo: 'Arquiteto da Sala', comp: ['MA'], anos: [6, 7, 8],
    habs: ['EF06MA28', 'EF06MA15', 'EF07MA17', 'EF06MA24', 'EF07MA32'], tempo: '15–20 min',
    resumo: 'Desenhe a planta baixa de uma sala de aula em escala, calcule a área, distribua as carteiras com corredores e converta as medidas para as escalas 1:50 e 1:100.',
    url: 'jogos/arquiteto.html', plano: 'p-ma-razao', ficha: null },
  { id: 'bolha', tipo: 'jogo', titulo: 'Bolha do Feed', comp: ['CO'], anos: [7, 8, 9], interacao: 'outras',
    habs: ['EF08CO07', 'EF08CO11', 'EF09CO07'], tempo: '15 min',
    resumo: 'Faça o papel do algoritmo de recomendação de uma rede social, veja a bolha do feed se formar e descubra como abrir o leque de temas sem perder o interesse do usuário.',
    url: 'jogos/bolha.html', plano: 'p-redes', ficha: 'f-co-feed' },
  { id: 'boato', tipo: 'jogo', titulo: 'Boato em Rede', comp: ['CO'], anos: [8, 9], interacao: 'outras',
    habs: ['EF07CO04', 'EF08CO11', 'EF09CO10'], tempo: '15–20 min',
    resumo: 'Um boato corre de amigo em amigo numa rede (grafo). Escolha quem checa a informação antes de repassar e veja quantas pessoas deixam de ser enganadas.',
    url: 'jogos/boato.html', plano: 'p-fontes', ficha: null },
  { id: 'chatbot', tipo: 'jogo', titulo: 'Chatbot de Regras', comp: ['CO'], anos: [8, 9], interacao: 'outras',
    habs: ['EF06CO02', 'EF09CO03', 'EF09CO07'], tempo: '20–30 min',
    resumo: 'Programe com regras SE, ENTÃO e SENÃO o atendente da secretaria da escola, teste com perguntas reais e compare com uma IA generativa: o que cada um faz bem.',
    url: 'jogos/chatbot.html', plano: 'p-automatos', ficha: null },
  { id: 'acessivel', tipo: 'jogo', titulo: 'Site para Todos', comp: ['CO'], anos: [7, 8, 9], interacao: 'outras',
    habs: ['EF06CO09', 'EF07CO11', 'EF09CO07'], tempo: '15–20 min',
    resumo: 'Encontre e corrija 9 barreiras de acessibilidade na página de uma escola e ouça como o leitor de tela lê cada parte antes e depois.',
    url: 'jogos/acessivel.html', plano: 'p-midia', ficha: null },
  // ---------- Recursos 3D (Laboratório 3D) ----------
  { id: '3d-decimais', tipo: '3d', titulo: 'Material Dourado 3D', comp: ['MA'], anos: [6],
    habs: ['EF06MA01', 'EF06MA02', 'EF06MA08', 'EF06MA11'], tempo: '15 min',
    resumo: 'Cubo, placa, barra e cubinho viram inteiro, décimo, centésimo e milésimo. Monte números decimais, faça trocas e resolva desafios.',
    url: '3d/decimais.html', plano: null, ficha: null },
  { id: '3d-fracoes', tipo: '3d', titulo: 'Barras de Frações 3D', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA07', 'EF06MA08', 'EF07MA08', 'EF07MA10'], tempo: '15 min',
    resumo: 'Duas barras de frações e uma reta numérica: compare, encontre equivalentes, passe para decimal e localize racionais negativos.',
    url: '3d/fracoes.html', plano: null, ficha: null },
  { id: '3d-mmc', tipo: '3d', titulo: 'Torres do MMC', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA05', 'EF06MA06', 'EF07MA01'], tempo: '10 min',
    resumo: 'Empilhe blocos de alturas diferentes na torre mais baixa até as torres se igualarem: a altura comum é o mmc.',
    url: '3d/mmc.html', plano: null, ficha: null },
  { id: '3d-potencias', tipo: '3d', titulo: 'Cubos das Potências', comp: ['MA'], anos: [6, 8, 9],
    habs: ['EF06MA11', 'EF08MA01', 'EF08MA02', 'EF09MA03'], tempo: '15 min',
    resumo: 'Fila, quadrado e cubo de cubinhos para potências; quadrados e cubos perfeitos para raízes exatas e aproximadas.',
    url: '3d/potencias.html', plano: null, ficha: null },
  { id: '3d-terreno', tipo: '3d', titulo: 'Terreno: Área e Perímetro', comp: ['MA'], anos: [6, 7, 8],
    habs: ['EF06MA24', 'EF06MA29', 'EF07MA31', 'EF07MA32', 'EF08MA19'], tempo: '15–20 min',
    resumo: 'Mude as medidas de um terreno cercado, recorte um canto e divida pela diagonal para comparar área e perímetro.',
    url: '3d/terreno.html', plano: null, ficha: null },
  { id: '3d-elevador', tipo: '3d', titulo: 'Elevador dos Inteiros', comp: ['MA'], anos: [7],
    habs: ['EF07MA03', 'EF07MA04'], tempo: '10–15 min',
    resumo: 'Andares positivos, térreo zero e subsolos negativos: o elevador faz somas e subtrações de inteiros, inclusive subtrair negativos.',
    url: '3d/elevador.html', plano: null, ficha: null },
  { id: '3d-balanca', tipo: '3d', titulo: 'Balança 3D das Equações', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA14', 'EF07MA18'], tempo: '15 min',
    resumo: 'Tire pesos iguais dos dois pratos ou divida os dois lados para isolar a caixa x sem desequilibrar a balança.',
    url: '3d/balanca.html', plano: null, ficha: null },
  { id: '3d-sucos', tipo: '3d', titulo: 'Laboratório de Sucos: Razão e Proporção', comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ['EF06MA15', 'EF07MA09', 'EF07MA17', 'EF08MA13', 'EF09MA08'], tempo: '15–20 min',
    resumo: 'Misture concentrado e água em duas jarras, compare sabores e use a regra de três para ampliar receitas.',
    url: '3d/sucos.html', plano: null, ficha: null },
  { id: '3d-produtos', tipo: '3d', titulo: 'Produtos Notáveis em Blocos', comp: ['MA'], anos: [8, 9],
    habs: ['EF09MA09', 'EF08MA06'], tempo: '15 min',
    resumo: 'Quadrado da soma, quadrado da diferença, produto da soma pela diferença e cubo da soma montados e separados em blocos.',
    url: '3d/produtos.html', plano: null, ficha: null },
  { id: '3d-algeblocos', tipo: '3d', titulo: 'Blocos Algébricos: Polinômios e Fatoração', comp: ['MA'], anos: [8, 9],
    habs: ['EF08MA06', 'EF09MA09'], tempo: '20 min',
    resumo: 'Some e subtraia polinômios cancelando pares zero e fatore trinômios montando retângulos com as peças x², x e 1.',
    url: '3d/algeblocos.html', plano: null, ficha: null },
  { id: '3d-tales', tipo: '3d', titulo: 'Teorema de Tales: Sombras e Paralelas', comp: ['MA'], anos: [9],
    habs: ['EF09MA14', 'EF09MA10', 'EF09MA12'], tempo: '15–20 min',
    resumo: 'Descubra a altura de um prédio pela sombra e verifique as razões entre segmentos num feixe de paralelas.',
    url: '3d/tales.html', plano: null, ficha: null },
  { id: '3d-ladrilhos', tipo: '3d', titulo: 'Ladrilhos e Ângulos', comp: ['MA'], anos: [6, 7],
    habs: ['EF07MA27', 'EF07MA24', 'EF06MA18'], tempo: '15 min',
    resumo: 'Encaixe polígonos regulares em volta de um ponto até fechar 360° e descubra a soma dos ângulos internos por triangulação.',
    url: '3d/ladrilhos.html', plano: null, ficha: null },
  { id: '3d-figuras', tipo: '3d', titulo: 'Figuras Geométricas em 3D', comp: ['MA'], anos: [6, 7],
    habs: ['EF06MA17', 'EF06MA18', 'EF06MA19', 'EF06MA20', 'EF07MA27'], tempo: '15–20 min',
    resumo: 'Polígonos, prismas, pirâmides, poliedros de Platão e corpos redondos com faces transparentes: todas as arestas aparecem, as escondidas em tracejado. Conte vértices, arestas, faces, diagonais e ângulos.',
    url: '3d/figuras.html', plano: null, ficha: null },
  { id: '3d-tanque', tipo: '3d', titulo: 'Enche o Tanque: Volume e Capacidade', comp: ['MA'], anos: [8, 9],
    habs: ['EF09MA19', 'EF08MA21', 'EF08MA20'], tempo: '15–20 min',
    resumo: 'Prismas, cilindros e cones de vidro enchendo de água. Estime quantos litros cabem ou até onde a água chega, abra a torneira e compare com a conta.',
    url: '3d/tanque.html', plano: null, ficha: null },
  // ---------- Laboratório 3D de IA, dados e computação ----------
  { id: '3d-rede-neural', tipo: '3d', titulo: 'Rede Neural por Dentro', comp: ['CO'], anos: [9],
    habs: ['EF09CO07', 'EF06CO05'], tempo: '20 min',
    resumo: 'Camadas de neurônios em 3D com o sinal acendendo da entrada até a saída. Mexa nos pesos, veja a resposta mudar e peça à rede que explique a decisão.',
    url: '3d/rede-neural.html', plano: null, ficha: null },
  { id: '3d-montanha-erro', tipo: '3d', titulo: 'Montanha do Erro: Descida do Gradiente', comp: ['CO', 'MA'], anos: [9],
    habs: ['EF09CO07', 'EF09MA06'], tempo: '15 min',
    resumo: 'Uma bolinha desce a superfície do erro, como a IA aprende. Taxa de aprendizado alta pula o vale, baixa anda devagar, e a semente muda o ponto de partida.',
    url: '3d/montanha-erro.html', plano: null, ficha: null },
  { id: '3d-cubo-rgb', tipo: '3d', titulo: 'Cubo das Cores RGB', comp: ['CO'], anos: [4, 5, 6, 7],
    habs: ['EF04CO05', 'EF04CO04', 'EF07CO01'], tempo: '15 min',
    resumo: 'Cada cor é um ponto dentro de um cubo de vermelho, verde e azul. Navegue pelo cubo, veja o código do pixel em decimal, binário e hexadecimal e acerte as cores do desafio.',
    url: '3d/cubo-rgb.html', plano: null, ficha: null },
  { id: '3d-agrupamento', tipo: '3d', titulo: 'Nuvem de Pontos e Agrupamento', comp: ['CO', 'MA'], anos: [6, 9],
    habs: ['EF06CO01', 'EF09CO07', 'EF09MA22'], tempo: '20 min',
    resumo: 'Frutas viram pontos em 3D (peso, doçura e acidez) e o algoritmo k-means separa os grupos passo a passo, com os centros se movendo até estabilizar.',
    url: '3d/agrupamento.html', plano: null, ficha: null },
  { id: '3d-grafico-enganoso', tipo: '3d', titulo: 'Gráfico 3D: Honesto ou Enganoso?', comp: ['MA', 'CO'], anos: [8, 9],
    habs: ['EF09MA21', 'EF08MA23', 'EF08CO11'], tempo: '15 min',
    resumo: 'Os mesmos dados em barras 3D vistos de ângulos diferentes. Gire a câmera, corte o eixo e acompanhe o fator de distorção: quanto o gráfico aumenta a diferença real.',
    url: '3d/grafico-enganoso.html', plano: null, ficha: null },
  { id: '3d-viagem-pacote', tipo: '3d', titulo: 'Viagem do Pacote', comp: ['CO'], anos: [6, 7, 8],
    habs: ['EF06CO07', 'EF07CO06', 'EF08CO06'], tempo: '15 min',
    resumo: 'Uma cidade em 3D com casas, roteadores e um data center. A mensagem vira pacotes que seguem caminhos diferentes, chegam fora de ordem e são remontados no destino.',
    url: '3d/viagem-pacote.html', plano: null, ficha: null },
  { id: '3d-data-center', tipo: '3d', titulo: 'Data Center por Dentro', comp: ['CO'], anos: [6, 7, 9],
    habs: ['EF06CO10', 'EF07CO10', 'EF09CO08'], tempo: '20 min',
    resumo: 'Racks, servidores, refrigeração e energia de um data center que treina IA. Ligue servidores, troque o resfriamento e veja o consumo de energia e de água.',
    url: '3d/data-center.html', plano: null, ficha: null },
  { id: '3d-torre-recursao', tipo: '3d', titulo: 'Torre da Recursão', comp: ['CO'], anos: [8],
    habs: ['EF08CO01'], tempo: '20 min',
    resumo: 'Torre de Hanói em 3D: resolva com 3, 4 e 5 discos, ensine ao robô a regra recursiva e veja ele resolver 8 discos, com a pilha de chamadas e o contador de movimentos.',
    url: '3d/torre-recursao.html', plano: 'p-recursao', ficha: 'f-co-recursao' },
  { id: '3d-cozinha-paralela', tipo: '3d', titulo: 'Cozinha Paralela', comp: ['CO'], anos: [8],
    habs: ['EF08CO05'], tempo: '20 min',
    resumo: 'Um restaurante em 3D com 1, 2 ou 4 cozinheiros-robôs. Distribua os pedidos, veja quanto o paralelismo ganha, ache o gargalo e provoque um impasse quando dois robôs querem a mesma panela.',
    url: '3d/cozinha-paralela.html', plano: 'p-paralelo', ficha: null },
  { id: '3d-cidade-infectada', tipo: '3d', titulo: 'Cidade Infectada', comp: ['CO'], anos: [8, 9],
    habs: ['EF09CO04', 'EF08CO10'], tempo: '20 min',
    resumo: 'Um bairro em 3D ligado em rede e um malware que se espalha de computador em computador. Com orçamento limitado, decida onde pôr firewall, atualização e backup.',
    url: '3d/cidade-infectada.html', plano: 'p-golpes', ficha: 'f-co-incidente' },
  { id: '3d-cofre-chaves', tipo: '3d', titulo: 'Cofre das Chaves', comp: ['CO'], anos: [8, 9],
    habs: ['EF09CO05', 'EF08CO10'], tempo: '25 min',
    resumo: 'Disco de César, caixa com dois cadeados e mistura de tintas em 3D: quebre uma cifra por força bruta e descubra como combinar uma chave secreta sem nunca enviá-la.',
    url: '3d/cofre-das-chaves.html', plano: 'p-cripto', ficha: 'f-cesar' },

  // ---------- Fichas para imprimir ----------
  { id: 'datas-festivas', tipo: 'ficha', titulo: 'Computação desplugada nas datas festivas', comp: ['CO'], anos: [1, 2, 3, 4, 5],
    habs: ['EF01CO01', 'EF01CO02', 'EF01CO03', 'EF02CO01', 'EF02CO02', 'EF02CO03', 'EF03CO01', 'EF04CO01', 'EF04CO04', 'EF04CO05', 'EF05CO01', 'EF05CO02', 'EF05CO03', 'EF05CO04'], tempo: '9 aulas',
    resumo: 'Caderno em PDF para os anos iniciais: 9 atividades sem computador, do Carnaval ao fim de ano, com ficha do professor, folhas para recortar e gabarito.',
    url: 'datas-festivas/', plano: null, ficha: null, icone: '01' },
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

  // ---------- Computação · fichas desplugadas por habilidade, 6º ao 9º ano (conteúdo em fichas-co.js) ----------
  { id: 'f-co-tipos', tipo: 'ficha', titulo: "Coleções e tipos de dados", comp: ['CO'], anos: [6],
    habs: ["EF06CO01"], tempo: '1 aula', icone: '01',
    resumo: "Classificar as informações de uma ficha por tipo de dado, agrupar em coleções e entender por que “12” + “3” dá “123”.",
    url: 'ficha.html?id=f-co-tipos', plano: 'p-dados' },
  { id: 'f-co-maquinas', tipo: 'ficha', titulo: "Máquinas de entrada e saída", comp: ['CO'], anos: [6],
    habs: ["EF06CO05"], tempo: '1 aula', icone: '05',
    resumo: "Descobrir a regra de máquinas misteriosas, identificar os tipos de entrada e de saída e planejar a solução de um problema.",
    url: 'ficha.html?id=f-co-maquinas', plano: 'p-dados' },
  { id: 'f-co-generalizar', tipo: 'ficha', titulo: "Uma receita para qualquer número", comp: ['CO'], anos: [6],
    habs: ["EF06CO06"], tempo: '1 aula', icone: '06',
    resumo: "Generalizar uma receita e os programas da tartaruga com parâmetros, até chegar a um único algoritmo para todos os casos.",
    url: 'ficha.html?id=f-co-generalizar', plano: 'p-dados' },
  { id: 'f-co-arquivos', tipo: 'ficha', titulo: "Arrumando as pastas do computador", comp: ['CO'], anos: [6],
    habs: ["EF06CO08"], tempo: '1 aula', icone: '08',
    resumo: "Organizar arquivos em pastas, renomear com padrão de data, decidir que metadados apagar e entender a compactação.",
    url: 'ficha.html?id=f-co-arquivos', plano: 'p-arquivos' },
  { id: 'f-co-respeito', tipo: 'ficha', titulo: "Do outro lado da tela tem gente", comp: ['CO'], anos: [6],
    habs: ["EF06CO09"], tempo: '1 aula', icone: '09',
    resumo: "Reescrever mensagens com respeito, avaliar a pegada digital de cada ação e criar os combinados dos grupos da turma.",
    url: 'ficha.html?id=f-co-respeito', plano: 'p-conduta' },
  { id: 'f-co-aparelho', tipo: 'ficha', titulo: "A vida do meu aparelho", comp: ['CO'], anos: [6],
    habs: ["EF06CO10"], tempo: '1 aula', icone: '10',
    resumo: "Desenhar o ciclo de vida de um eletrônico de casa, discutir obsolescência e propor ações para ele durar mais.",
    url: 'ficha.html?id=f-co-aparelho', plano: 'p-lixo' },
  { id: 'f-co-registros', tipo: 'ficha', titulo: "A ficha da turma: registros e vetores", comp: ['CO'], anos: [7],
    habs: ["EF07CO01"], tempo: '1 aula', icone: '01',
    resumo: "Criar campos e registros, montar um vetor com posições a partir de 0 e escrever o algoritmo da maior nota.",
    url: 'ficha.html?id=f-co-registros', plano: 'p-registros' },
  { id: 'f-co-bugs', tipo: 'ficha', titulo: "Caça aos bugs no papel", comp: ['CO'], anos: [7],
    habs: ["EF07CO02"], tempo: '1 aula', icone: '02',
    resumo: "Quatro programas com erros para encontrar e corrigir, com teste de mesa e valores de borda.",
    url: 'ficha.html?id=f-co-bugs', plano: 'p-bugs' },
  { id: 'f-co-projeto7', tipo: 'ficha', titulo: "Nosso projeto em uma página", comp: ['CO'], anos: [7],
    habs: ["EF07CO03"], tempo: '1 aula', icone: '03',
    resumo: "Plano do projeto de programação do grupo: problema, decomposição, estruturas, papéis e cronograma.",
    url: 'ficha.html?id=f-co-projeto7', plano: 'p-midia' },
  { id: 'f-co-seguranca7', tipo: 'ficha', titulo: "Detetive de golpes e senhas fortes", comp: ['CO'], anos: [7],
    habs: ["EF07CO07"], tempo: '1 aula', icone: '07',
    resumo: "Analisar quatro mensagens, encontrar os sinais de golpe, avaliar senhas e entender a verificação em duas etapas.",
    url: 'ficha.html?id=f-co-seguranca7', plano: 'p-golpes', jogo: 'golpe' },
  { id: 'f-co-empatia', tipo: 'ficha', titulo: "Discordar sem ferir", comp: ['CO'], anos: [7],
    habs: ["EF07CO08"], tempo: '1 aula', icone: '08',
    resumo: "Debate com regras, comentários que atacam a ideia ou a pessoa e perguntas para fazer antes de responder na internet.",
    url: 'ficha.html?id=f-co-empatia', plano: 'p-conduta' },
  { id: 'f-co-cyberbullying', tipo: 'ficha', titulo: "O que eu faria? Cyberbullying", comp: ['CO'], anos: [7],
    habs: ["EF07CO09"], tempo: '1 aula', icone: '09',
    resumo: "Uma situação no grupo da turma analisada por papéis, a diferença entre brincadeira e cyberbullying e combinados da turma.",
    url: 'ficha.html?id=f-co-cyberbullying', plano: 'p-conduta' },
  { id: 'f-co-descarte', tipo: 'ficha', titulo: "Mapa do descarte eletrônico", comp: ['CO'], anos: [7],
    habs: ["EF07CO10"], tempo: '1 aula', icone: '10',
    resumo: "Decidir o destino dos eletrônicos parados em casa, preparar um celular para o descarte e escrever um aviso para a família.",
    url: 'ficha.html?id=f-co-descarte', plano: 'p-lixo' },
  { id: 'f-co-roteiro', tipo: 'ficha', titulo: "Roteiro relâmpago de produção digital", comp: ['CO'], anos: [7],
    habs: ["EF07CO11"], tempo: '1 aula', icone: '11',
    resumo: "Planejar um vídeo, podcast ou site: mensagem, roteiro, papéis, documentação das fontes e checklist antes de publicar.",
    url: 'ficha.html?id=f-co-roteiro', plano: 'p-midia' },
  { id: 'f-co-recursao', tipo: 'ficha', titulo: "Fila recursiva e fatorial", comp: ['CO'], anos: [8],
    habs: ["EF08CO01"], tempo: '1 aula', icone: '01',
    resumo: "Uma fila que conta pessoas por recursão, o fatorial passo a passo e uma função recursiva para completar.",
    url: 'ficha.html?id=f-co-recursao', plano: 'p-recursao' },
  { id: 'f-co-listas', tipo: 'ficha', titulo: "A playlist: listas que crescem", comp: ['CO'], anos: [8],
    habs: ["EF08CO02"], tempo: '1 aula', icone: '02',
    resumo: "Executar comandos numa lista viva, completar o programa de uma playlist e achar a maior nota de uma lista.",
    url: 'ficha.html?id=f-co-listas', plano: 'p-recursao' },
  { id: 'f-co-ordenar', tipo: 'ficha', titulo: "Ordenar e buscar com cartões", comp: ['CO'], anos: [8],
    habs: ["EF08CO03"], tempo: '1 aula', icone: '03',
    resumo: "Cartões para recortar: ordenação por seleção passo a passo, busca binária e quantas perguntas ela precisa.",
    url: 'ficha.html?id=f-co-ordenar', plano: 'p-recursao' },
  { id: 'f-co-projeto8', tipo: 'ficha', titulo: "Ficha do projeto: requisitos e testes", comp: ['CO'], anos: [8],
    habs: ["EF08CO04"], tempo: '1 aula', icone: '04',
    resumo: "Requisitos essenciais e desejáveis, quadro de tarefas, casos de teste e teste com um usuário de fora do grupo.",
    url: 'ficha.html?id=f-co-projeto8', plano: 'p-projeto8' },
  { id: 'f-co-paralelo', tipo: 'ficha', titulo: "A corrida das somas: paralelismo", comp: ['CO'], anos: [8],
    habs: ["EF08CO05"], tempo: '1 aula', icone: '05',
    resumo: "Quarenta contas resolvidas por uma e por quatro pessoas, tarefas que dá ou não para dividir, concorrência e nuvem.",
    url: 'ficha.html?id=f-co-paralelo', plano: 'p-paralelo' },
  { id: 'f-co-internet', tipo: 'ficha', titulo: "Mapa da internet: rede de redes", comp: ['CO'], anos: [8],
    habs: ["EF08CO06"], tempo: '1 aula', icone: '06',
    resumo: "Um mapa com provedores, ponto de troca e servidor para traçar caminhos, cortar ligações e entender o DNS.",
    url: 'ficha.html?id=f-co-internet', plano: 'p-internet', jogo: 'pacotes' },
  { id: 'f-co-feed', tipo: 'ficha', titulo: "O feed de papel", comp: ['CO'], anos: [8],
    habs: ["EF08CO07"], tempo: '1 aula', icone: '07',
    resumo: "Dez posts para escolher, a turma no papel do algoritmo do feed, bolhas de filtro e perguntas antes de compartilhar.",
    url: 'ficha.html?id=f-co-feed', plano: 'p-redes' },
  { id: 'f-co-termos', tipo: 'ficha', titulo: "Tradutores de termos de uso", comp: ['CO'], anos: [8],
    habs: ["EF08CO09"], tempo: '1 aula', icone: '09',
    resumo: "Três trechos de termos de uso para traduzir em linguagem simples e avaliar, com glossário e a LGPD.",
    url: 'ficha.html?id=f-co-termos', plano: 'p-redes' },
  { id: 'f-co-checagem8', tipo: 'ficha', titulo: "Agência de checagem", comp: ['CO'], anos: [8],
    habs: ["EF08CO11"], tempo: '1 aula', icone: '11',
    resumo: "Duas notícias inventadas analisadas com quem, quando, onde mais e por quê, sinais de alerta e viés.",
    url: 'ficha.html?id=f-co-checagem8', plano: 'p-fontes' },
  { id: 'f-co-arvore', tipo: 'ficha', titulo: "Árvore de decisão: adivinhe o animal", comp: ['CO'], anos: [9],
    habs: ["EF09CO01"], tempo: '1 aula', icone: '01',
    resumo: "Montar uma árvore de perguntas de sim ou não que separa oito animais e descobrir a relação com as potências de 2.",
    url: 'ficha.html?id=f-co-arvore', plano: 'p-arvores', jogo: 'rotas' },
  { id: 'f-co-prototipo', tipo: 'ficha', titulo: "Protótipo de papel", comp: ['CO'], anos: [9],
    habs: ["EF09CO02"], tempo: '1 aula', icone: '02',
    resumo: "Três telas de um aplicativo desenhadas no papel e testadas por outro grupo antes de programar.",
    url: 'ficha.html?id=f-co-prototipo', plano: 'p-cidade' },
  { id: 'f-co-estados', tipo: 'ficha', titulo: "Máquina de estados do personagem", comp: ['CO'], anos: [9],
    habs: ["EF09CO03"], tempo: '1 aula', icone: '03',
    resumo: "Seguir a máquina de estados de uma catraca e desenhar a de um personagem de jogo, com tabela de transições.",
    url: 'ficha.html?id=f-co-estados', plano: 'p-automatos' },
  { id: 'f-co-incidente', tipo: 'ficha', titulo: "Análise de incidente: como agem os ataques", comp: ['CO'], anos: [9],
    habs: ["EF09CO04"], tempo: '1 aula', icone: '04',
    resumo: "Ligar tipos de malware às descrições e investigar um ataque de ransomware fictício numa escola.",
    url: 'ficha.html?id=f-co-incidente', plano: 'p-golpes', jogo: 'golpe' },
  { id: 'f-co-radar', tipo: 'ficha', titulo: "Radar do bairro: dados para a cidade", comp: ['CO'], anos: [9],
    habs: ["EF09CO06"], tempo: '1 aula', icone: '06',
    resumo: "Escolher um problema local, listar os dados abertos que ajudam a entendê-lo e propor uma solução digital.",
    url: 'ficha.html?id=f-co-radar', plano: 'p-cidade' },
  { id: 'f-co-julgamento', tipo: 'ficha', titulo: "Julgamento da tecnologia", comp: ['CO'], anos: [9],
    habs: ["EF09CO07"], tempo: '1 aula', icone: '07',
    resumo: "Quatro perguntas para analisar uma tecnologia, impactos positivos e negativos e uma regra para deixá-la mais justa.",
    url: 'ficha.html?id=f-co-julgamento', plano: 'p-sociedade' },
  { id: 'f-co-acesso', tipo: 'ficha', titulo: "Mapa do acesso digital", comp: ['CO'], anos: [9],
    habs: ["EF09CO08"], tempo: '1 aula', icone: '08',
    resumo: "Pesquisa anônima da turma, gráfico de barras e discussão sobre as camadas da desigualdade digital.",
    url: 'ficha.html?id=f-co-acesso', plano: 'p-sociedade' },
  { id: 'f-co-creditos', tipo: 'ficha', titulo: "Créditos certos: licenças e uso de imagem", comp: ['CO'], anos: [9],
    habs: ["EF09CO09"], tempo: '1 aula', icone: '09',
    resumo: "O que cada licença Creative Commons permite, como escrever o crédito e um caso de uso de imagem sem autorização.",
    url: 'ficha.html?id=f-co-creditos', plano: 'p-autoria' },
  { id: 'f-co-verdade', tipo: 'ficha', titulo: "Checagem em todos os formatos", comp: ['CO'], anos: [9],
    habs: ["EF09CO10"], tempo: '1 aula', icone: '10',
    resumo: "Um texto, uma foto, um áudio e um vídeo inventados para checar veracidade, credibilidade e relevância.",
    url: 'ficha.html?id=f-co-verdade', plano: 'p-fontes' },

  // ---------- Matemática · fichas desplugadas e planos das oficinas (gerado por oficinas_ma.py) ----------
  { id: 'f-ma-decimais', tipo: 'ficha', titulo: "Frações e decimais no metro", comp: ['MA'], anos: [6],
    habs: ["EF06MA08", "EF06MA01"], tempo: '1 aula',
    resumo: "Dobrar tiras de 1 metro em partes iguais, escrever cada parte como fração e como decimal e comparar na reta numérica.",
    url: 'ficha.html?id=f-ma-decimais', plano: 'p-ma-decimais', jogo: '3d-decimais' },
  { id: 'f-ma-mmc', tipo: 'ficha', titulo: "Corrida dos sapos: MMC", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA05", "EF06MA06", "EF07MA01"], tempo: '1 aula',
    resumo: "Uma reta numérica no chão: dois sapos pulam de tamanhos diferentes e a turma descobre onde eles se encontram.",
    url: 'ficha.html?id=f-ma-mmc', plano: 'p-ma-mmc', jogo: '3d-mmc' },
  { id: 'f-ma-potencias', tipo: 'ficha', titulo: "Quadrados de tampinhas: potência e raiz", comp: ['MA'], anos: [6, 8],
    habs: ["EF06MA11", "EF08MA02"], tempo: '1 aula',
    resumo: "Montar quadrados com tampinhas para entender “ao quadrado” e descobrir a raiz quadrada como o lado do quadrado.",
    url: 'ficha.html?id=f-ma-potencias', plano: 'p-ma-potencias', jogo: '3d-potencias' },
  { id: 'f-ma-area', tipo: 'ficha', titulo: "Hortas com a mesma cerca: área e perímetro", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA24", "EF06MA29", "EF07MA31"], tempo: '1 aula',
    resumo: "Com um barbante fixo como cerca, os estudantes desenham hortas diferentes na malha e percebem que perímetro igual não garante área igual.",
    url: 'ficha.html?id=f-ma-area', plano: 'p-ma-area', jogo: '3d-terreno' },
  { id: 'f-ma-inteiros', tipo: 'ficha', titulo: "Fichas positivas e negativas", comp: ['MA'], anos: [7],
    habs: ["EF07MA03", "EF07MA04"], tempo: '1 aula',
    resumo: "Fichas verdes (+1) e vermelhas (−1) para somar, subtrair e entender por que tirar um negativo é o mesmo que somar.",
    url: 'ficha.html?id=f-ma-inteiros', plano: 'p-ma-inteiros', jogo: '3d-elevador' },
  { id: 'f-ma-equacoes', tipo: 'ficha', titulo: "Envelopes na balança: equações", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA14", "EF07MA18"], tempo: '1 aula',
    resumo: "Envelopes com clipes escondidos num tapete-balança: o que se faz de um lado precisa ser feito do outro.",
    url: 'ficha.html?id=f-ma-equacoes', plano: 'p-ma-equacoes', jogo: '3d-balanca' },
  { id: 'f-ma-racionais', tipo: 'ficha', titulo: "Varal dos números racionais", comp: ['MA'], anos: [7],
    habs: ["EF07MA08", "EF07MA10", "EF07MA12"], tempo: '1 aula',
    resumo: "Um varal vira reta numérica coletiva: frações, decimais e negativos são pendurados e justificados em grupo.",
    url: 'ficha.html?id=f-ma-racionais', plano: 'p-ma-racionais', jogo: '3d-fracoes' },
  { id: 'f-ma-regra3', tipo: 'ficha', titulo: "Regra de três na receita", comp: ['MA'], anos: [7, 8],
    habs: ["EF07MA17", "EF08MA13"], tempo: '1 aula',
    resumo: "Ampliar e reduzir uma receita de bolo, montar a regra de três e decidir quando a proporção é direta ou inversa.",
    url: 'ficha.html?id=f-ma-regra3', plano: 'p-ma-regra3', jogo: '3d-sucos' },
  { id: 'f-ma-razao', tipo: 'ficha', titulo: "Razões no corpo e no pátio", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA15", "EF07MA09"], tempo: '1 aula',
    resumo: "Medir partes do corpo, cronometrar corridas e calcular razões entre medidas da mesma espécie e de espécies diferentes.",
    url: 'ficha.html?id=f-ma-razao', plano: 'p-ma-razao', jogo: '3d-sucos' },
  { id: 'f-ma-proporcao', tipo: 'ficha', titulo: "Ampliar sem deformar: proporção", comp: ['MA'], anos: [8, 9],
    habs: ["EF08MA12", "EF09MA08"], tempo: '1 aula',
    resumo: "Ampliar uma figura na malha, comparar lados e áreas e reconhecer quando duas grandezas são proporcionais.",
    url: 'ficha.html?id=f-ma-proporcao', plano: 'p-ma-proporcao', jogo: '3d-sucos' },
  { id: 'f-ma-produtos', tipo: 'ficha', titulo: "Quadrado recortado: produtos notáveis", comp: ['MA'], anos: [9],
    habs: ["EF09MA09"], tempo: '1 aula',
    resumo: "Recortar o quadrado de lado a + b em quatro peças e descobrir por que (a + b)² não é a² + b².",
    url: 'ficha.html?id=f-ma-produtos', plano: 'p-ma-produtos', jogo: '3d-produtos' },
  { id: 'f-ma-fatoracao', tipo: 'ficha', titulo: "Fatorar é montar retângulos", comp: ['MA'], anos: [9],
    habs: ["EF09MA09"], tempo: '1 aula',
    resumo: "Peças x², x e 1 em papel: montar retângulos com trinômios e ler a forma fatorada nos lados.",
    url: 'ficha.html?id=f-ma-fatoracao', plano: 'p-ma-fatoracao', jogo: '3d-algeblocos' },
  { id: 'f-ma-polinomios', tipo: 'ficha', titulo: "Dominó dos polinômios", comp: ['MA'], anos: [8],
    habs: ["EF08MA06"], tempo: '1 aula',
    resumo: "Dominó de expressões equivalentes para reduzir termos semelhantes, somar e subtrair polinômios e calcular valor numérico.",
    url: 'ficha.html?id=f-ma-polinomios', plano: 'p-ma-polinomios', jogo: '3d-algeblocos' },
  { id: 'f-ma-geometria', tipo: 'ficha', titulo: "Ateliê de mosaicos: ângulos e polígonos", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA18", "EF07MA24", "EF07MA27"], tempo: '1 aula',
    resumo: "Recortar polígonos regulares, descobrir quais ladrilham o plano e calcular somas de ângulos internos.",
    url: 'ficha.html?id=f-ma-geometria', plano: 'p-ma-geometria', jogo: '3d-ladrilhos' },
  { id: 'f-ma-tales', tipo: 'ficha', titulo: "Medindo com sombras: Teorema de Tales", comp: ['MA'], anos: [9],
    habs: ["EF09MA14", "EF09MA12"], tempo: '1 aula',
    resumo: "Medir a altura de postes e árvores pela sombra e dividir segmentos em partes iguais com uma folha pautada.",
    url: 'ficha.html?id=f-ma-tales', plano: 'p-ma-tales', jogo: '3d-tales' },
  { id: 'p-ma-decimais', tipo: 'plano', titulo: "Frações e decimais com o metro", comp: ['MA'], anos: [6],
    habs: ["EF06MA08", "EF06MA01"], tempo: '2 aulas',
    resumo: "Rotação por estações com tiras de 1 metro, Material Dourado 3D e reta numérica para ligar fração e decimal.",
    url: 'plano.html?id=p-ma-decimais' },
  { id: 'p-ma-mmc', tipo: 'plano', titulo: "MMC com a corrida dos sapos", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA05", "EF06MA06", "EF07MA01"], tempo: '2 aulas',
    resumo: "Jogo corporal na reta numérica do pátio e Torres do MMC 3D para descobrir múltiplos comuns sem decorar algoritmo.",
    url: 'plano.html?id=p-ma-mmc' },
  { id: 'p-ma-potencias', tipo: 'plano', titulo: "Potências e raízes com quadrados", comp: ['MA'], anos: [6, 8],
    habs: ["EF06MA11", "EF08MA02"], tempo: '2 aulas',
    resumo: "Investigação com tampinhas e cubos 3D: potência como área e volume e raiz quadrada como o lado do quadrado.",
    url: 'plano.html?id=p-ma-potencias' },
  { id: 'p-ma-area', tipo: 'plano', titulo: "A horta da escola: área e perímetro", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA24", "EF06MA29", "EF07MA31"], tempo: '2 aulas',
    resumo: "Projeto da horta da escola: barbante como cerca, malha quadriculada e o Terreno 3D para separar área de perímetro.",
    url: 'plano.html?id=p-ma-area' },
  { id: 'p-ma-inteiros', tipo: 'plano', titulo: "Operações com negativos: pares zero", comp: ['MA'], anos: [7],
    habs: ["EF07MA03", "EF07MA04"], tempo: '2 aulas',
    resumo: "Instrução por pares com fichas de duas cores e o Elevador dos Inteiros 3D para dar sentido às operações com negativos.",
    url: 'plano.html?id=p-ma-inteiros' },
  { id: 'p-ma-equacoes', tipo: 'plano', titulo: "Equações do 1º grau com envelopes misteriosos", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA14", "EF07MA18"], tempo: '2 aulas',
    resumo: "Envelopes com clipes escondidos e a Balança 3D para resolver equações usando as propriedades da igualdade.",
    url: 'plano.html?id=p-ma-equacoes' },
  { id: 'p-ma-racionais', tipo: 'plano', titulo: "O varal dos racionais", comp: ['MA'], anos: [7],
    habs: ["EF07MA08", "EF07MA10", "EF07MA12"], tempo: '2 aulas',
    resumo: "Varal coletivo de frações, decimais e negativos e as Barras de Frações 3D para comparar, ordenar e operar com racionais.",
    url: 'plano.html?id=p-ma-racionais' },
  { id: 'p-ma-regra3', tipo: 'plano', titulo: "Regra de três na cozinha", comp: ['MA'], anos: [7, 8],
    habs: ["EF07MA17", "EF08MA13"], tempo: '2 aulas',
    resumo: "Adaptar uma receita para a turma inteira, montar a regra de três e decidir quando a proporção é direta ou inversa.",
    url: 'plano.html?id=p-ma-regra3' },
  { id: 'p-ma-razao', tipo: 'plano', titulo: "Razões medidas no corpo e no pátio", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA15", "EF07MA09"], tempo: '2 aulas',
    resumo: "Medir o corpo e cronometrar corridas no pátio para calcular razões, escalas e velocidades.",
    url: 'plano.html?id=p-ma-razao' },
  { id: 'p-ma-proporcao', tipo: 'plano', titulo: "Ampliar sem deformar: proporção e escala", comp: ['MA'], anos: [8, 9],
    habs: ["EF08MA12", "EF09MA08"], tempo: '2 aulas',
    resumo: "Ampliar figuras na malha, comparar lados e áreas e usar escalas reais para reconhecer grandezas proporcionais.",
    url: 'plano.html?id=p-ma-proporcao' },
  { id: 'p-ma-produtos', tipo: 'plano', titulo: "Produtos notáveis com recortes", comp: ['MA'], anos: [9],
    habs: ["EF09MA09"], tempo: '2 aulas',
    resumo: "Sala de aula invertida com os Produtos Notáveis em Blocos e o quadrado recortado para justificar as fórmulas pela área.",
    url: 'plano.html?id=p-ma-produtos' },
  { id: 'p-ma-fatoracao', tipo: 'plano', titulo: "Fatoração com blocos algébricos", comp: ['MA'], anos: [9],
    habs: ["EF09MA09"], tempo: '2 aulas',
    resumo: "Estações com peças x², x e 1 em papel, Blocos Algébricos 3D e problemas de área para fatorar trinômios.",
    url: 'plano.html?id=p-ma-fatoracao' },
  { id: 'p-ma-polinomios', tipo: 'plano', titulo: "Polinômios com dominó de expressões", comp: ['MA'], anos: [8],
    habs: ["EF08MA06"], tempo: '2 aulas',
    resumo: "Dominó de expressões equivalentes e Blocos Algébricos 3D para reduzir, somar e subtrair polinômios e calcular valor numérico.",
    url: 'plano.html?id=p-ma-polinomios' },
  { id: 'p-ma-geometria', tipo: 'plano', titulo: "Ateliê de mosaicos: geometria plana", comp: ['MA'], anos: [6, 7],
    habs: ["EF06MA18", "EF07MA24", "EF07MA27"], tempo: '2 aulas',
    resumo: "Projeto de mosaicos: polígonos regulares recortados, Ladrilhos e Ângulos 3D e soma dos ângulos internos.",
    url: 'plano.html?id=p-ma-geometria' },
  { id: 'p-ma-tales', tipo: 'plano', titulo: "Medindo a escola com o Teorema de Tales", comp: ['MA'], anos: [9],
    habs: ["EF09MA14", "EF09MA12"], tempo: '2 aulas',
    resumo: "Aula de campo para medir alturas pela sombra, folha pautada para dividir segmentos e o recurso 3D de Tales.",
    url: 'plano.html?id=p-ma-tales' },
  { id: 'p-ma-graficos', tipo: 'plano', titulo: "Pesquisa-relâmpago: da pergunta ao gráfico", comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ["EF06MA31", "EF06MA33", "EF07MA37", "EF08MA23", "EF09MA21", "EF09MA22"], tempo: '1 aula',
    resumo: "A turma faz uma pesquisa em 10 minutos, organiza os dados em tabela, constrói gráficos em grupos e caça erros num gráfico enganoso.",
    url: 'plano.html?id=p-ma-graficos' },
  { id: 'p-ma-financeira', tipo: 'plano', titulo: "Mesada, descontos e juros: decisões com porcentagem", comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ["EF06MA13", "EF07MA02", "EF08MA04", "EF09MA05"], tempo: '1 aula',
    resumo: "Dilemas de dinheiro do dia a dia: dividir a mesada, avaliar promoções e comparar juros simples e compostos na poupança.",
    url: 'plano.html?id=p-ma-financeira' },
  { id: 'p-ma-obmep', tipo: 'plano', titulo: "Minha primeira OBMEP: estratégias para resolver problemas", comp: ['MA'], anos: [6, 7, 8, 9],
    habs: ["EF06MA03", "EF07MA05", "EF07MA06", "EF08MA03"], tempo: '1 aula',
    resumo: "Apresenta a OBMEP e treina quatro estratégias de resolução (padrão, tentativa organizada, desenho e contagem) com problemas no estilo da prova.",
    url: 'plano.html?id=p-ma-obmep' },
  // ---------- fim das oficinas de Matemática ----------
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
  { id: 'p-wikipedia', tipo: 'plano', titulo: 'A Wikipédia como base de dados', comp: ['CO', 'MA'], anos: [7, 8, 9],
    habs: ['EF07MA36', 'EF09MA22', 'EF09MA21', 'EF08CO11', 'EF09CO10'], tempo: '2 aulas',
    resumo: 'A turma faz uma pergunta, coleta as visitas de verbetes da Wikipédia, monta um gráfico de linhas na planilha e investiga o que explica cada pico.',
    url: 'plano.html?id=p-wikipedia' },
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
  robo: '🤖', pacotes: '📦', rotas: '🗺️', cifra: '🔐', golpe: '🛡️', fracoes: '🍕', cartesiano: '🧭', balanca: '⚖️', tangram: '🔷', tabuada: '🏎️',
  'f-robo': '✏️', 'f-decompor': '🧱', 'f-pacotes': '✉️', 'f-cesar': '🎡', 'f-grafo': '📍', 'f-fracoes': '🍫', 'f-batalha': '⚓', 'f-golpe': '🔒',
  'p-robo': '🧠', 'p-internet': '🌐', 'p-grafos': '🕸️', 'p-cripto': '🗝️', 'p-golpes': '🚨', 'p-fracoes': '➗', 'p-cartesiano': '📐', 'p-equacoes': '🟰',
  'p-dados': '🔢', 'p-arquivos': '🗄️', 'p-conduta': '🤝', 'p-lixo': '♻️', 'p-registros': '🗃️', 'p-bugs': '🐞',
  'p-reuso': '🧩', 'p-midia': '🎙️', 'p-recursao': '🪆', 'p-paralelo': '⚙️', 'p-redes': '📱', 'p-fontes': '🔎', 'p-wikipedia': '📈', wikipedia: '⇅',
  'p-projeto8': '💻', 'p-arvores': '🌳', 'p-automatos': '🚦', 'p-cidade': '🏙️', 'p-sociedade': '⚖️', 'p-autoria': '©️',
  bhaskara: '🧮', '3d-decimais': '🟩', '3d-fracoes': '🍫', '3d-mmc': '🏗️', '3d-potencias': '🧊', '3d-terreno': '🌱', '3d-elevador': '🛗', '3d-balanca': '⚖️', '3d-sucos': '🧃', '3d-produtos': '🟨', '3d-algeblocos': '🧩', '3d-tales': '☀️', '3d-ladrilhos': '⬡', '3d-figuras': '△', '3d-tanque': '🚰', '3d-rede-neural': '◉', '3d-montanha-erro': '⛰', '3d-cubo-rgb': '▣', '3d-agrupamento': '⁘', '3d-grafico-enganoso': '▤', '3d-viagem-pacote': '⇄', '3d-data-center': '▦', '3d-cidade-infectada': '☣', '3d-torre-recursao': '🗼', '3d-cozinha-paralela': '🍳', 'f-ma-decimais': '📏', 'p-ma-decimais': '🔟', 'f-ma-mmc': '🐸', 'p-ma-mmc': '🔁', 'f-ma-potencias': '🔲', 'p-ma-potencias': '²', 'f-ma-area': '🧵', 'p-ma-area': '🥬', 'f-ma-inteiros': '🔴', 'p-ma-inteiros': '🌡️', 'f-ma-equacoes': '✉️', 'p-ma-equacoes': '⚖️', 'f-ma-racionais': '🧺', 'p-ma-racionais': '📍', 'f-ma-regra3': '🎂', 'p-ma-regra3': '🍳', 'f-ma-razao': '📐', 'p-ma-razao': '🏃', 'f-ma-proporcao': '🖼️', 'p-ma-proporcao': '🔍', 'f-ma-produtos': '✂️', 'p-ma-produtos': '🟨', 'f-ma-fatoracao': '🧱', 'p-ma-fatoracao': '🧩', 'f-ma-polinomios': '🁢', 'p-ma-polinomios': '🎲', 'f-ma-geometria': '🎨', 'p-ma-geometria': '🔶', 'f-ma-tales': '🌤️', 'p-ma-tales': '☀️', 'p-ma-graficos': '📊', graficos: '🕵️', mesada: '🐷', poupanca: '📈', 'empresa-sucos': '▥', angulos: '∠', cofrinho: '%', tabelas: '▦', receitas: '⅔', cartao: '▭', cambio: '¤', 'vale-bits': '⌂', 'vila-cidada': '▦', 'cidade-blocos': '◫', 'partes-computador': '▣', numeria: '⚔', python: '›_', digitacao: 'Aa', carreira: '⇢', bolha: '◎', boato: '⁂', chatbot: '?:', acessivel: '◈', impostor: '?', senha: '***', paridade: '⊕', 'busca-binaria': '½', 'filas-pilhas': '⇉', 'p-ma-financeira': '💰', 'p-ma-obmep': '🏅'
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
    recursos: ['f-pacotes', 'pacotes', 'f-co-internet']
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
    recursos: ['f-cesar', 'cifra', '3d-cofre-chaves']
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
    recursos: ['f-golpe', 'golpe', 'f-co-seguranca7', 'f-co-incidente', '3d-cidade-infectada']
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
    recursos: ['robo', 'f-co-tipos', 'f-co-maquinas', 'f-co-generalizar']
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
    recursos: ['f-co-arquivos']
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
    recursos: ['f-co-respeito', 'f-co-empatia', 'f-co-cyberbullying']
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
    recursos: ['f-co-aparelho', 'f-co-descarte']
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
    recursos: ['f-co-registros']
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
    recursos: ['robo', 'f-co-bugs']
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
    recursos: ['f-co-projeto7', 'f-co-roteiro']
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
    recursos: ['f-co-recursao', 'f-co-listas', 'f-co-ordenar', '3d-torre-recursao']
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
    recursos: ['3d-cozinha-paralela', 'pacotes', 'f-co-paralelo']
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
    recursos: ['golpe', 'f-co-feed', 'f-co-termos']
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
    recursos: ['golpe', 'f-co-checagem8', 'f-co-verdade']
  },
  'p-wikipedia': {
    duracao: '2 aulas de 50 min',
    objetivos: [
      'Formular uma pergunta que possa ser respondida com dados abertos.',
      'Coletar, organizar e representar uma série temporal em gráfico de linhas, com título, eixos, fonte e data.',
      'Relacionar picos e mudanças nos dados com acontecimentos, checando as explicações em fontes confiáveis.',
      'Reconhecer limites de um conjunto de dados (o que ele mede e o que não mede).'
    ],
    materiais: ['Computadores ou celulares com internet (1 por dupla)', 'Planilha eletrônica (Google Planilhas, Excel ou LibreOffice Calc)', 'Painel https://ohtopico.com.br/interesse-por-ia/ ou a ferramenta pública https://pageviews.wmcloud.org/', 'Projetor (opcional)'],
    etapas: [
      ['10 min', 'Pergunta inicial', 'Projete o painel de interesse por IA e mostre a linha do verbete ChatGPT. Pergunte: o que aconteceu em dezembro de 2022? Por que tanta gente foi ler sobre isso? Explique que cada visita a um verbete é registrada e que esses números são públicos.'],
      ['15 min', 'Nossa pergunta', 'Cada dupla escolhe dois ou três verbetes ligados a um tema da turma (um planeta, um time, um jogo, uma doença, uma festa) e escreve uma pergunta: quando as pessoas mais procuram por isso? Esse interesse cresceu? Registre as hipóteses antes de olhar os dados.'],
      ['25 min', 'Coleta dos dados', 'Na ferramenta pageviews.wmcloud.org, escolham pt.wikipedia.org, os verbetes, o período e a opção mensal, e baixem o CSV. Quem usar o painel do site pode clicar em Baixar os dados (CSV). Abram o arquivo na planilha e confiram: cada linha é um mês, cada coluna é um verbete.'],
      ['20 min', 'Gráfico de linhas', 'Montem o gráfico de linhas. Confiram título, nome dos eixos, legenda, fonte (Wikimedia) e data da coleta. Discuta por que o gráfico de linhas combina com dados ao longo do tempo e o que mudaria se o eixo vertical não começasse no zero.'],
      ['20 min', 'Investigando os picos', 'Cada dupla marca o maior pico e procura uma explicação em duas fontes confiáveis diferentes (jornal, site oficial, a própria Wikipédia). A explicação precisa de data e fonte. Lembre: os dados mostram quando o interesse mudou, mas não dizem sozinhos por quê.'],
      ['10 min', 'Relatório e limites', 'Cada dupla escreve um parágrafo: pergunta, o que os dados mostraram, a explicação encontrada e um limite dos dados (a Wikipédia em português é lida em vários países; robôs são descontados; quem chega por outro título é contado à parte). Para fechar, joguem uma partida do jogo da Wikipédia, Qual Verbete Tem Mais Visitas.']
    ],
    avaliacao: 'O gráfico tem título, eixos, legenda, fonte e data? O relatório diferencia o que os dados mostram da explicação buscada nas fontes? A dupla aponta pelo menos um limite dos dados?',
    inclusao: 'O painel do site tem a opção Ver como tabela, que funciona com leitores de tela. Para quem precisa de mais apoio, entregue o CSV já baixado e foque na leitura do gráfico. Duplas heterogêneas ajudam na parte da planilha.',
    recursos: ['wikipedia', 'graficos']
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
    recursos: ['balanca', 'f-co-projeto8']
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
    recursos: ['rotas', 'f-grafo', 'f-co-arvore']
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
    recursos: ['f-co-estados']
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
    recursos: ['f-co-prototipo', 'f-co-radar']
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
    recursos: ['p-lixo', 'f-co-julgamento', 'f-co-acesso']
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
    recursos: ['p-midia', 'f-co-creditos']
  },
  /* ---------- Oficinas de Matemática · metodologias ativas (gerado por oficinas_ma.py) ---------- */
  'p-ma-decimais': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Rotação por estações",
      "A turma passa por três estações de 20 minutos: tiras de papel, Material Dourado 3D e reta numérica. Cada estação mostra a mesma ideia de um jeito diferente, e o grupo registra o que descobriu antes de trocar."
    ],
    "objetivos": [
      "Representar a mesma quantidade nas formas fracionária e decimal.",
      "Comparar e ordenar decimais usando a reta numérica.",
      "Relacionar décimos e centésimos com o metro, o decímetro e o centímetro."
    ],
    "materiais": [
      "Ficha “Frações e decimais no metro”",
      "Tiras de papel de 1 metro e de 20 cm, fita métrica",
      "Dispositivos com o Material Dourado 3D (1 por grupo)",
      "Fita crepe para uma reta no chão"
    ],
    "etapas": [
      [
        "10 min",
        "Situação-problema",
        "Mostre uma fita métrica e pergunte: meio metro é 0,5 ou 0,50? E 0,05? Anote as hipóteses no quadro sem corrigir."
      ],
      [
        "20 min",
        "Estação 1: tiras",
        "Os grupos dobram as tiras em 2, 4, 5 e 10 partes, pintam e escrevem cada parte como fração e como decimal (ficha, partes 1 e 2)."
      ],
      [
        "20 min",
        "Estação 2: Material Dourado 3D",
        "Representam 1,25; 0,8 e 0,08 com o cubo valendo 1 e fazem as trocas dos desafios."
      ],
      [
        "20 min",
        "Estação 3: reta no chão",
        "Cada estudante recebe um cartão (1/4, 0,3, 3/5, 0,75...) e se posiciona na reta de fita crepe. O grupo justifica a ordem."
      ],
      [
        "15 min",
        "Socialização",
        "Volte às hipóteses iniciais. Cada grupo explica uma descoberta. Pergunta de saída: o que é maior, 0,3 ou 0,25? Por quê?"
      ]
    ],
    "avaliacao": "Registro da ficha, participação nas estações e a pergunta de saída. Observe se o estudante ainda compara decimais pelo número de algarismos.",
    "inclusao": "Use tiras com texturas diferentes para cada divisão e cartões com fonte ampliada. Na estação 3D, um colega pode ler os valores em voz alta.",
    "recursos": [
      "f-ma-decimais",
      "3d-decimais",
      "l-ma-decimais"
    ]
  },
  'p-ma-mmc': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Gamificação com o corpo",
      "Os estudantes viram sapos numa reta desenhada no chão. O jogo cria a necessidade do conceito antes de qualquer algoritmo: o MMC surge como o primeiro ponto onde os dois sapos pisam."
    ],
    "objetivos": [
      "Identificar múltiplos de um número natural.",
      "Encontrar o menor múltiplo comum de dois números em situações do cotidiano.",
      "Relacionar o MMC com a decomposição em fatores primos."
    ],
    "materiais": [
      "Ficha “Corrida dos sapos: MMC”",
      "Fita crepe ou giz para uma reta de 0 a 40",
      "Fichas ou tampinhas de duas cores",
      "Dispositivos com as Torres do MMC"
    ],
    "etapas": [
      [
        "10 min",
        "Pergunta de abertura",
        "Dois ônibus saem juntos do terminal: um volta a cada 15 minutos e o outro a cada 20. Quando saem juntos de novo? Hipóteses no quadro."
      ],
      [
        "25 min",
        "Corrida dos sapos",
        "Dois estudantes pulam de 3 em 3 e de 4 em 4 na reta do chão. A turma marca as casas com fichas de cores diferentes e encontra onde as cores coincidem."
      ],
      [
        "20 min",
        "Torres do MMC 3D",
        "As duplas empilham blocos de tamanhos diferentes até as torres ficarem da mesma altura e anotam os pares testados."
      ],
      [
        "20 min",
        "Problemas da vida real",
        "Resolução das partes 2 e 3 da ficha. Cada dupla apresenta uma estratégia diferente (lista de múltiplos, desenho, fatores primos)."
      ],
      [
        "15 min",
        "Sistematização",
        "Volte ao problema dos ônibus. Registre que o MMC é o menor múltiplo comum diferente de zero e mostre a decomposição em primos como atalho."
      ]
    ],
    "avaliacao": "Resolução do problema dos ônibus com justificativa e a lista de exercícios. Valorize estratégias diferentes, como pede a EF07MA01.",
    "inclusao": "Estudantes com mobilidade reduzida podem marcar a reta com fichas em vez de pular. Ofereça a reta impressa em tamanho ampliado.",
    "recursos": [
      "f-ma-mmc",
      "3d-mmc",
      "l-ma-mmc"
    ]
  },
  'p-ma-potencias': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Investigação matemática",
      "Os grupos recebem um desafio aberto (quais quantidades de tampinhas formam um quadrado?) e constroem a regra a partir dos casos que testam, antes de qualquer definição."
    ],
    "objetivos": [
      "Calcular potências de expoente natural associando-as a quadrados e cubos.",
      "Compreender a raiz quadrada como operação inversa da potência de expoente 2.",
      "Reconhecer quadrados perfeitos e estimar raízes não exatas."
    ],
    "materiais": [
      "Ficha “Quadrados de tampinhas: potência e raiz”",
      "70 tampinhas ou grãos por grupo",
      "Cubinhos de encaixe, se houver",
      "Dispositivos com os Cubos das Potências"
    ],
    "etapas": [
      [
        "10 min",
        "Desafio aberto",
        "Com quais quantidades de tampinhas, de 1 a 70, é possível montar um quadrado cheio? Os grupos testam e anotam."
      ],
      [
        "20 min",
        "Montando quadrados",
        "Parte 1 da ficha. Pergunte por que se diz “ao quadrado” e registre 1, 4, 9, 16, 25... como potências."
      ],
      [
        "20 min",
        "Raiz como lado",
        "Parte 2 da ficha. Dada a quantidade, descobrir o lado. Introduza o símbolo √ só depois que todos explicaram com as tampinhas."
      ],
      [
        "20 min",
        "Do quadrado ao cubo",
        "Nos Cubos das Potências 3D, alternar entre os modos potência e raiz. Comparar 2³ e 3² e discutir o erro comum 2³ = 6."
      ],
      [
        "10 min",
        "Fechamento",
        "Parte 3 da ficha (cuidado com o erro) e pergunta de saída: entre quais inteiros está √50?"
      ]
    ],
    "avaliacao": "Tabela de quadrados perfeitos do grupo, a estimativa de √50 e a lista de exercícios.",
    "inclusao": "Tampinhas grandes facilitam a manipulação. Para estudantes cegos ou com baixa visão, use cubinhos de encaixe, que permitem contar pelo toque.",
    "recursos": [
      "f-ma-potencias",
      "3d-potencias",
      "l-ma-potencias"
    ]
  },
  'p-ma-area': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem baseada em projetos",
      "A turma planeja uma horta real (ou um canteiro da escola) com uma quantidade fixa de cerca. O produto final é uma planta baixa com medidas e a justificativa da escolha."
    ],
    "objetivos": [
      "Diferenciar perímetro e área em situações reais.",
      "Calcular a área de retângulos, quadrados e triângulos.",
      "Descrever como área e perímetro mudam quando as medidas são ampliadas ou reduzidas."
    ],
    "materiais": [
      "Ficha “Hortas com a mesma cerca: área e perímetro”",
      "Barbante de 24 cm por dupla",
      "Trena",
      "Dispositivos com o Terreno: Área e Perímetro"
    ],
    "etapas": [
      [
        "10 min",
        "Lançamento do projeto",
        "A escola tem 24 metros de tela para cercar uma horta. Qual formato dá mais espaço para plantar? Cada grupo faz uma aposta."
      ],
      [
        "25 min",
        "Barbante na malha",
        "Partes 1 e 2 da ficha. As duplas desenham pelo menos quatro hortas diferentes com o mesmo barbante e completam a tabela."
      ],
      [
        "20 min",
        "Terreno 3D",
        "Arrastando a estaca, os grupos testam outros formatos, inclusive em L, e comparam com a tabela feita no papel."
      ],
      [
        "20 min",
        "Medindo de verdade",
        "Com a trena, medem o espaço real disponível no pátio e ajustam o projeto."
      ],
      [
        "15 min",
        "Apresentação",
        "Cada grupo apresenta a planta da horta com área, perímetro e justificativa. A turma vota no projeto que seria levado à direção."
      ]
    ],
    "avaliacao": "Planta baixa do grupo (medidas corretas, área e perímetro calculados e justificativa) e a lista de exercícios.",
    "inclusao": "A malha pode ser feita com quadrados de EVA para contagem pelo toque. Grupos com papéis definidos garantem a participação de todos.",
    "recursos": [
      "f-ma-area",
      "3d-terreno",
      "l-ma-area"
    ]
  },
  'p-ma-inteiros': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Instrução por pares (peer instruction)",
      "O professor lança uma pergunta conceitual, os estudantes votam sozinhos, discutem em dupla para convencer o colega e votam de novo. A discussão entre pares corrige mais erros do que a explicação direta."
    ],
    "objetivos": [
      "Comparar e ordenar números inteiros na reta numérica.",
      "Somar e subtrair inteiros usando o modelo dos pares zero.",
      "Resolver problemas com temperaturas, saldos e altitudes."
    ],
    "materiais": [
      "Ficha “Fichas positivas e negativas”",
      "Fichas verdes e vermelhas recortadas",
      "Cartões de votação A, B, C e D",
      "Dispositivos com o Elevador dos Inteiros"
    ],
    "etapas": [
      [
        "10 min",
        "Votação 1",
        "Em São José dos Ausentes estava −3 °C e esfriou mais 4 °C. Qual a temperatura? A) 1 °C B) −7 °C C) 7 °C D) −1 °C. Votação individual, sem discussão."
      ],
      [
        "10 min",
        "Discussão em pares",
        "Cada estudante tenta convencer um colega que votou diferente. Nova votação. Mostre o resultado no elevador 3D."
      ],
      [
        "25 min",
        "Fichas e pares zero",
        "Partes 1 e 2 da ficha. Deixe que tentem tirar fichas que não existem e só então mostre o truque de acrescentar pares zero."
      ],
      [
        "15 min",
        "Votação 2",
        "Quanto é 5 − (−2)? Repita o ciclo votar, discutir e votar. Use as fichas para conferir."
      ],
      [
        "20 min",
        "Situações reais",
        "Parte 4 da ficha e lista de exercícios em dupla. Fechamento com a comparação entre as duas votações."
      ]
    ],
    "avaliacao": "Compare a porcentagem de acertos antes e depois da discussão em pares. Use a ficha e a lista para acompanhar cada estudante.",
    "inclusao": "As fichas de cores diferentes também podem ter formas diferentes (círculo e quadrado) para estudantes com daltonismo.",
    "recursos": [
      "f-ma-inteiros",
      "3d-elevador",
      "l-ma-inteiros"
    ]
  },
  'p-ma-equacoes': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Pensar, conversar e compartilhar (think-pair-share)",
      "Cada estudante pensa sozinho por um minuto, discute com a dupla e só depois o grupo compartilha com a turma. Ninguém fica sem tempo para pensar, e as estratégias aparecem antes da regra."
    ],
    "objetivos": [
      "Reconhecer que a igualdade se mantém quando se faz a mesma operação nos dois membros.",
      "Resolver equações do tipo ax + b = c.",
      "Traduzir situações do cotidiano em equações."
    ],
    "materiais": [
      "Ficha “Envelopes na balança: equações”",
      "Envelopes pequenos e clipes",
      "Dispositivos com a Balança 3D das Equações"
    ],
    "etapas": [
      [
        "10 min",
        "Pensar sozinho",
        "Mostre 3 envelopes iguais e 2 clipes de um lado e 14 clipes do outro, em equilíbrio. Quantos clipes há em cada envelope? Um minuto em silêncio."
      ],
      [
        "15 min",
        "Conversar em dupla",
        "As duplas comparam estratégias e testam com os envelopes da ficha (parte 1), sem abrir até o fim."
      ],
      [
        "20 min",
        "Balança 3D",
        "Na balança 3D, usar apenas os botões tirar 1, tirar x e dividir. Registrar cada passo como uma linha de equação."
      ],
      [
        "20 min",
        "Criar para o colega",
        "Parte 2 da ficha: cada dupla monta uma equação com envelopes para outra dupla resolver."
      ],
      [
        "15 min",
        "Compartilhar",
        "Parte 3 da ficha (do problema para a equação). Sistematize as propriedades da igualdade no quadro."
      ]
    ],
    "avaliacao": "Registro dos passos na balança, as equações criadas pelas duplas e a lista de exercícios.",
    "inclusao": "O tapete-balança pode ser montado em cartolina grande e os envelopes substituídos por copos opacos, mais fáceis de manusear.",
    "recursos": [
      "f-ma-equacoes",
      "3d-balanca",
      "l-ma-equacoes"
    ]
  },
  'p-ma-racionais': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem colaborativa com argumentação",
      "O varal é uma reta numérica da turma inteira. Um cartão só é pendurado quando o grupo convence os demais de que a posição está correta, o que torna o erro visível e discutível."
    ],
    "objetivos": [
      "Comparar e ordenar números racionais, inclusive negativos.",
      "Converter frações em decimais e localizar ambos na reta numérica.",
      "Resolver problemas com operações entre racionais."
    ],
    "materiais": [
      "Ficha “Varal dos números racionais”",
      "Barbante, pregadores e os cartões recortados",
      "Dispositivos com as Barras de Frações 3D"
    ],
    "etapas": [
      [
        "10 min",
        "Montagem do varal",
        "Estique o barbante e marque o 0, o 1 e o −1. Cada grupo recebe quatro cartões."
      ],
      [
        "25 min",
        "Pendurar e justificar",
        "Os grupos penduram um cartão por vez, explicando a posição. A turma pode contestar; quem contesta precisa justificar."
      ],
      [
        "20 min",
        "Barras 3D",
        "Nas Barras de Frações 3D, conferir os casos polêmicos (−1/2 e −3/4; 2/3 e 0,75) e explorar frações impróprias."
      ],
      [
        "20 min",
        "Registro",
        "Partes 2, 3 e 4 da ficha: ordem, conversão entre fração e decimal e comparação."
      ],
      [
        "15 min",
        "Problemas",
        "Parte 5 da ficha e início da lista de exercícios."
      ]
    ],
    "avaliacao": "Qualidade das justificativas no varal (registre no diário), a ficha e a lista de exercícios.",
    "inclusao": "Cartões com números grandes e alto contraste. Estudantes que preferem não falar em público podem justificar por escrito no cartão.",
    "recursos": [
      "f-ma-racionais",
      "3d-fracoes",
      "l-ma-racionais"
    ]
  },
  'p-ma-regra3': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem baseada em problemas",
      "O problema real vem primeiro: a turma precisa adaptar uma receita para a quantidade de pessoas da escola. A regra de três aparece como ferramenta para resolver o problema, não como fórmula pronta."
    ],
    "objetivos": [
      "Identificar grandezas diretamente e inversamente proporcionais.",
      "Montar e resolver a regra de três simples.",
      "Usar o fator multiplicativo como estratégia de verificação."
    ],
    "materiais": [
      "Ficha “Regra de três na receita”",
      "Receita de bolo impressa, calculadora (opcional)",
      "Copos medidores, se for preparar a receita",
      "Dispositivos com o Laboratório de Sucos"
    ],
    "etapas": [
      [
        "10 min",
        "O problema",
        "A receita serve 8 pessoas e a turma tem 28. Quanto de cada ingrediente? Os grupos estimam antes de calcular."
      ],
      [
        "25 min",
        "Bolo para a turma",
        "Parte 1 da ficha. Primeiro o fator multiplicativo (por quanto multiplico?), depois a tabela com duas colunas."
      ],
      [
        "15 min",
        "Laboratório de Sucos 3D",
        "No modo regra de três, resolver as receitas propostas e conferir na jarra."
      ],
      [
        "20 min",
        "Direta ou inversa?",
        "Parte 3 da ficha. Discutir o caso das torneiras e dos pedreiros: mais gente, menos tempo."
      ],
      [
        "20 min",
        "Fechamento",
        "Parte 2 da ficha (montar a regra de três) e lista de exercícios. Se possível, preparar a receita ampliada."
      ]
    ],
    "avaliacao": "Resolução da receita ampliada com justificativa, classificação correta das grandezas e a lista de exercícios.",
    "inclusao": "Leve os ingredientes reais ou embalagens vazias. Estudantes com dificuldade de cálculo podem usar a calculadora; o foco está no raciocínio proporcional.",
    "recursos": [
      "f-ma-regra3",
      "3d-sucos",
      "l-ma-regra3"
    ]
  },
  'p-ma-razao': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Ensino por investigação com coleta de dados",
      "Os estudantes produzem os próprios dados (medidas do corpo e tempos de corrida) e usam a razão para responder perguntas da turma. Os dados reais dão sentido ao conceito."
    ],
    "objetivos": [
      "Expressar a relação entre duas quantidades como razão e como fração.",
      "Calcular razões entre grandezas de espécies diferentes, como velocidade.",
      "Usar a razão para interpretar escalas."
    ],
    "materiais": [
      "Ficha “Razões no corpo e no pátio”",
      "Trena, cronômetro e giz",
      "Dispositivos com o Laboratório de Sucos"
    ],
    "etapas": [
      [
        "10 min",
        "Pergunta investigável",
        "Será que a altura de uma pessoa é parecida com a distância entre as pontas dos dedos de braços abertos? Registre as hipóteses."
      ],
      [
        "25 min",
        "Coleta no corpo",
        "Partes 1 e 2 da ficha, com papéis no grupo: medidor, anotador e calculador."
      ],
      [
        "20 min",
        "Coleta no pátio",
        "Parte 3: cronometrar a caminhada e a corrida de 10 metros e calcular metros por segundo."
      ],
      [
        "15 min",
        "Razão nas misturas",
        "No Laboratório de Sucos 3D, modo razão: comparar misturas e decidir qual tem gosto mais forte."
      ],
      [
        "20 min",
        "Escala e conclusão",
        "Parte 4 da ficha (escala). Os grupos comparam resultados e respondem à pergunta inicial com os dados."
      ]
    ],
    "avaliacao": "Tabela de dados do grupo, as razões calculadas e a resposta à pergunta investigável com base nos dados.",
    "inclusao": "As medidas do corpo são opcionais: o estudante pode medir um objeto ou um colega que se ofereça. Respeite quem não quer ser medido.",
    "recursos": [
      "f-ma-razao",
      "3d-sucos",
      "l-ma-razao"
    ]
  },
  'p-ma-proporcao': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem maker",
      "Os estudantes produzem uma ampliação de uma figura e verificam, no próprio produto, se ela ficou deformada. O erro na ampliação vira dado para discutir proporcionalidade."
    ],
    "objetivos": [
      "Identificar grandezas diretamente, inversamente ou não proporcionais.",
      "Resolver problemas com escala e ampliação.",
      "Perceber que, ao dobrar os lados, a área fica quatro vezes maior."
    ],
    "materiais": [
      "Ficha “Ampliar sem deformar: proporção”",
      "Régua e lápis de cor",
      "Planta baixa ou mapa do município",
      "Dispositivos com o Laboratório de Sucos"
    ],
    "etapas": [
      [
        "10 min",
        "Aposta",
        "Se dobrarmos o tamanho de um desenho, ele fica com o dobro de tinta? Votação rápida."
      ],
      [
        "25 min",
        "Ampliação na malha",
        "Parte 1 da ficha. Cada estudante amplia a figura e confere com o colega se ficou proporcional."
      ],
      [
        "15 min",
        "E a área?",
        "Parte 2 da ficha. Contar os quadradinhos e registrar a conclusão sobre a área."
      ],
      [
        "20 min",
        "É proporcional?",
        "Parte 3 em grupo: tabelas de grandezas do cotidiano para classificar como direta, inversa ou não proporcional."
      ],
      [
        "20 min",
        "Escala real",
        "Parte 4: medir distâncias no mapa do município e converter com a escala. Lista de exercícios para casa."
      ]
    ],
    "avaliacao": "A ampliação produzida (lados proporcionais e ângulos preservados), a classificação das tabelas e a lista de exercícios.",
    "inclusao": "Ofereça malhas com quadrados maiores e figuras mais simples. A ampliação pode ser feita com palitos ou fios sobre a malha.",
    "recursos": [
      "f-ma-proporcao",
      "3d-sucos",
      "l-ma-proporcao"
    ]
  },
  'p-ma-produtos': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Sala de aula invertida",
      "Em casa (ou no início da aula), os estudantes exploram os Produtos Notáveis em Blocos 3D. Em sala, o tempo é usado para recortar, montar e discutir o erro clássico (a + b)² = a² + b²."
    ],
    "objetivos": [
      "Compreender o quadrado da soma, o quadrado da diferença e o produto da soma pela diferença.",
      "Justificar os produtos notáveis por meio de áreas.",
      "Usar produtos notáveis em cálculo mental."
    ],
    "materiais": [
      "Ficha “Quadrado recortado: produtos notáveis”",
      "Tesoura e lápis de cor",
      "Dispositivos com os Produtos Notáveis em Blocos"
    ],
    "etapas": [
      [
        "Em casa",
        "Exploração prévia",
        "Explorar o modo (a + b)² dos Produtos Notáveis em Blocos e anotar uma pergunta."
      ],
      [
        "10 min",
        "Perguntas da turma",
        "Recolha as perguntas trazidas e escolha duas para guiar a aula."
      ],
      [
        "25 min",
        "Montar o quadrado grande",
        "Partes 1 e 2 da ficha. Os grupos recortam, montam e escrevem a área de cada peça. Não mostre a fórmula antes."
      ],
      [
        "20 min",
        "Diferença e soma pela diferença",
        "Partes 3 e 4. Conferir no recurso 3D com a peça que gira."
      ],
      [
        "20 min",
        "Cálculo mental",
        "Parte 5: 21², 99² e 31 × 29. Cada grupo explica uma conta no quadro."
      ],
      [
        "15 min",
        "Fechamento",
        "Registro das três fórmulas com o desenho ao lado e início da lista de exercícios."
      ]
    ],
    "avaliacao": "Explicação escrita, com desenho, de por que (a + b)² ≠ a² + b², o cálculo mental e a lista de exercícios.",
    "inclusao": "Peças de EVA em cores diferentes ajudam estudantes com dificuldade motora no recorte e permitem identificar as peças pelo toque.",
    "recursos": [
      "f-ma-produtos",
      "3d-produtos",
      "l-ma-produtos"
    ]
  },
  'p-ma-fatoracao': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Rotação por estações",
      "Três estações de 20 minutos: peças de papel, blocos algébricos 3D e problemas de área. Cada estação trabalha a fatoração como “encontrar os lados de um retângulo”."
    ],
    "objetivos": [
      "Fatorar trinômios do tipo x² + bx + c.",
      "Reconhecer a fatoração como a operação inversa da multiplicação de polinômios.",
      "Usar a fatoração para resolver equações e problemas de área."
    ],
    "materiais": [
      "Ficha “Fatorar é montar retângulos”",
      "Peças recortadas ou de EVA",
      "Dispositivos com os Blocos Algébricos"
    ],
    "etapas": [
      [
        "10 min",
        "Retomada",
        "Relembre (x + 2)(x + 3) com área. Agora o caminho inverso: dada a área, quais os lados?"
      ],
      [
        "20 min",
        "Estação 1: peças de papel",
        "Parte 1 da ficha. Formar retângulos com os quatro trinômios e registrar os lados."
      ],
      [
        "20 min",
        "Estação 2: Blocos 3D",
        "No modo fatoração, arrastar as peças até formar o retângulo. Usar “Mostrar um retângulo” só depois de tentar."
      ],
      [
        "20 min",
        "Estação 3: problemas",
        "Partes 3, 4 e 5 da ficha: quando não fecha, fatoração resolve equação e terreno."
      ],
      [
        "20 min",
        "Padrão",
        "Parte 2 da ficha com a turma: soma e produto. Fatorar sem as peças e conferir com elas."
      ]
    ],
    "avaliacao": "Registro das três estações e a fatoração sem peças (parte 2). Lista de exercícios para consolidar.",
    "inclusao": "Na estação 3D, o teclado também gira e aproxima a cena. Peças de papel cartão grosso são mais fáceis de manusear.",
    "recursos": [
      "f-ma-fatoracao",
      "3d-algeblocos",
      "l-ma-fatoracao"
    ]
  },
  'p-ma-polinomios': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Gamificação com jogo de cartas",
      "O dominó de expressões só avança quando o grupo concorda que as metades são equivalentes. A regra do jogo obriga a justificar cada passo da simplificação."
    ],
    "objetivos": [
      "Reduzir termos semelhantes.",
      "Somar e subtrair polinômios.",
      "Calcular o valor numérico de expressões algébricas em problemas."
    ],
    "materiais": [
      "Ficha “Dominó dos polinômios”",
      "Peças do dominó recortadas e embaralhadas",
      "Dispositivos com os Blocos Algébricos"
    ],
    "etapas": [
      [
        "10 min",
        "Aquecimento",
        "É verdade que x + x = x²? Votação e discussão rápida."
      ],
      [
        "25 min",
        "Dominó",
        "Grupos de 3 montam a fila do INÍCIO ao FIM. O anotador escreve a conta de cada encaixe."
      ],
      [
        "20 min",
        "Blocos 3D",
        "No modo polinômios, somar e subtrair usando pares zero. Comparar com as contas do dominó."
      ],
      [
        "20 min",
        "Termos semelhantes e valor numérico",
        "Partes 2 e 3 da ficha."
      ],
      [
        "15 min",
        "Situação real",
        "Parte 4: lucro da loja de camisetas. Os grupos trocam os dominós para conferir."
      ]
    ],
    "avaliacao": "Registro das contas do dominó, a resolução do problema do lucro e a lista de exercícios.",
    "inclusao": "As peças podem ser ampliadas e impressas em papel colorido. Permita que o grupo use os blocos 3D para conferir antes de encaixar.",
    "recursos": [
      "f-ma-polinomios",
      "3d-algeblocos",
      "l-ma-polinomios"
    ]
  },
  'p-ma-geometria': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem baseada em projetos com arte",
      "A turma produz um painel de mosaicos para expor na escola. Para que o mosaico feche sem buracos, os grupos precisam investigar os ângulos dos polígonos."
    ],
    "objetivos": [
      "Verificar que a soma dos ângulos internos de um triângulo é 180°.",
      "Calcular ângulos internos de polígonos regulares sem fórmula pronta.",
      "Identificar quais polígonos ladrilham o plano."
    ],
    "materiais": [
      "Ficha “Ateliê de mosaicos: ângulos e polígonos”",
      "Papel colorido, tesoura e cola",
      "Cartolina para o painel",
      "Dispositivos com Ladrilhos e Ângulos"
    ],
    "etapas": [
      [
        "10 min",
        "Lançamento",
        "Mostre fotos de pisos, colmeias e calçadas. Por que as abelhas usam hexágonos e não pentágonos?"
      ],
      [
        "15 min",
        "Cantos do triângulo",
        "Parte 1 da ficha: recortar os três cantos de um triângulo e juntá-los numa reta."
      ],
      [
        "25 min",
        "Ladrilhar",
        "Partes 2 e 3 em grupo, com papel e no Ladrilhos e Ângulos 3D. Registrar as combinações que fecham 360°."
      ],
      [
        "15 min",
        "Soma dos ângulos internos",
        "Parte 4 da ficha e modo soma do recurso 3D: dividir em triângulos a partir de um vértice."
      ],
      [
        "35 min",
        "Painel de mosaicos",
        "Cada grupo cria um trecho do painel com uma combinação que ladrilha e escreve a conta dos ângulos ao lado."
      ]
    ],
    "avaliacao": "O painel (combinações corretas e contas dos ângulos), a ficha e a lista de exercícios.",
    "inclusao": "Use moldes de papel cartão para traçar os polígonos. Estudantes com dificuldade motora podem montar no recurso 3D e colar peças já recortadas.",
    "recursos": [
      "f-ma-geometria",
      "3d-ladrilhos",
      "l-ma-geometria"
    ]
  },
  'p-ma-tales': {
    "duracao": "2 aulas de 50 min",
    "metodologia": [
      "Aprendizagem baseada em problemas com aula de campo",
      "O problema é medir a altura de algo que não se alcança (poste, árvore, caixa d’água). A turma vai ao pátio, mede sombras e usa a proporcionalidade para resolver."
    ],
    "objetivos": [
      "Aplicar o Teorema de Tales em situações reais.",
      "Reconhecer triângulos semelhantes pelas medidas dos ângulos.",
      "Dividir um segmento em partes iguais usando retas paralelas."
    ],
    "materiais": [
      "Ficha “Medindo com sombras: Teorema de Tales”",
      "Trena, bastão de comprimento conhecido e giz",
      "Folha de caderno pautada",
      "Dispositivos com o Teorema de Tales: Sombras e Paralelas"
    ],
    "etapas": [
      [
        "10 min",
        "O problema",
        "Qual é a altura do poste da frente da escola? Ninguém pode subir nele. As estimativas ficam registradas no quadro."
      ],
      [
        "30 min",
        "Aula de campo",
        "Partes 1 e 2 da ficha. Grupos com papéis medem a sombra do bastão e a do poste no mesmo horário."
      ],
      [
        "15 min",
        "Recurso 3D",
        "No modo sol e sombra, mover o sol e verificar que a razão entre altura e sombra se mantém."
      ],
      [
        "20 min",
        "Folha pautada",
        "Parte 3 da ficha: dividir um palito em três partes iguais. Modo paralelas do recurso 3D para formalizar o teorema."
      ],
      [
        "15 min",
        "Problema final",
        "Parte 5: a largura do rio. Comparar as estimativas iniciais com as medidas calculadas."
      ]
    ],
    "avaliacao": "Relatório do grupo com medidas, cálculos e comparação com a estimativa inicial. Lista de exercícios.",
    "inclusao": "Se não houver sol, use uma lanterna e objetos na sala. Estudantes que não podem ir ao pátio fazem a parte 3 e o recurso 3D com um colega.",
    "recursos": [
      "f-ma-tales",
      "3d-tales",
      "l-ma-tales"
    ]
  },
  "p-ma-graficos": {
    "duracao": "1 aula de 50 min",
    "metodologia": [
      "Aprendizagem baseada em investigação",
      "A própria turma é a fonte dos dados: escolhe uma pergunta, coleta as respostas, organiza em tabela e decide como mostrar o resultado. Cada grupo representa os mesmos dados com um gráfico diferente, e a comparação entre eles conduz a discussão."
    ],
    "objetivos": [
      "Organizar dados coletados em uma tabela de frequências.",
      "Construir gráficos de colunas, barras, setores ou pictóricos a partir da tabela.",
      "Identificar os elementos de um gráfico: título, eixos, legenda, fonte e data.",
      "Avaliar qual gráfico é mais adequado para um conjunto de dados e reconhecer escalas que distorcem a leitura."
    ],
    "materiais": [
      "Quadro e canetas ou giz coloridos",
      "Papel quadriculado ou cartolina (1 por grupo), régua, lápis de cor",
      "Transferidor e compasso para o grupo do gráfico de setores",
      "Um gráfico enganoso impresso ou projetado (eixo vertical que não começa no zero)",
      "Opcional: computadores com planilha eletrônica"
    ],
    "etapas": [
      [
        "5 min",
        "Gráfico enganoso",
        "Mostre dois gráficos de colunas com os mesmos números (por exemplo, vendas de 48 e 52 unidades): um com o eixo começando em 0 e outro começando em 45. Pergunte qual empresa vendeu “muito mais”. Registre as respostas sem corrigir."
      ],
      [
        "10 min",
        "Pesquisa-relâmpago",
        "A turma escolhe uma pergunta com 4 ou 5 opções (meio de transporte até a escola, esporte preferido, horas de tela por dia). Cada estudante vota e a professora faz a contagem por tracinhos no quadro. Juntos, montam a tabela com título, categorias, frequência e fonte (“Pesquisa da turma, data de hoje”)."
      ],
      [
        "15 min",
        "Um gráfico por grupo",
        "Em grupos de 4, cada um representa a mesma tabela com um tipo de gráfico: colunas, barras, pictórico ou setores. Ajuste por ano: 6º ano foca em colunas e barras com todos os elementos; 7º ano assume o de setores (porcentagem de cada fatia); 8º e 9º anos justificam por escrito se o tipo de gráfico é adequado e o 9º calcula a moda."
      ],
      [
        "10 min",
        "Galeria e checklist",
        "Os gráficos ficam expostos. Os grupos circulam com um checklist: tem título? Eixos nomeados? Legenda? Fonte e data? A escala começa no zero? Cada grupo deixa um comentário em post-it para outro."
      ],
      [
        "10 min",
        "Sistematização",
        "Volte ao gráfico enganoso: agora a turma explica o truque da escala. Discuta qual gráfico ficou mais fácil de ler e por quê, e quando o de setores não funciona (muitas categorias, dados que não somam um todo). Cada estudante escreve uma frase-conclusão sobre a pesquisa."
      ]
    ],
    "avaliacao": "Observação durante a construção, gráfico do grupo conferido com o checklist (título, eixos, legenda, fonte, data e escala) e a frase-conclusão individual, que mostra se o estudante interpreta os dados, e não só os desenha.",
    "inclusao": "Para estudantes com baixa visão, use papel quadriculado ampliado, canetas de contraste forte e colunas feitas com tiras de EVA ou blocos de montar, para que o gráfico possa ser lido pelo tato. Distribua papéis no grupo (contador, desenhista, revisor do checklist, porta-voz) para que todos participem.",
    "recursos": ["graficos"]
  },
  "p-ma-financeira": {
    "duracao": "1 aula de 50 min",
    "metodologia": [
      "Aprendizagem baseada em problemas",
      "A aula é organizada em três dilemas reais de dinheiro, do mais simples ao mais complexo. Em duplas, os estudantes decidem o que fariam, calculam para conferir e defendem a escolha. As estratégias pessoais e a calculadora vêm antes de qualquer fórmula."
    ],
    "objetivos": [
      "Calcular porcentagens de uma quantia por estratégias pessoais (10%, 50%, 25%) e com calculadora.",
      "Resolver problemas com acréscimos e descontos e avaliar se uma promoção vale a pena.",
      "Diferenciar juros simples de juros compostos e perceber o efeito dos percentuais sucessivos.",
      "Tomar decisões financeiras justificadas com cálculos."
    ],
    "materiais": [
      "Calculadoras ou celulares (1 por dupla)",
      "Folha com os três dilemas impressos",
      "Encartes de supermercado ou anúncios de promoção (opcional)",
      "Quadro para a tabela de juros"
    ],
    "etapas": [
      [
        "5 min",
        "Pergunta de abertura",
        "Pergunte: você prefere ganhar R$ 100 hoje ou R$ 110 daqui a um ano? A turma vota e alguns explicam a escolha. Guarde a votação para o final."
      ],
      [
        "15 min",
        "Dilema 1: a mesada",
        "Lucas recebe R$ 60 por mês e quer dividir em gastar, guardar e doar. As duplas criam a divisão em porcentagem (por exemplo, 50%, 40% e 10%) e calculam os valores sem regra de três: 10% é dividir por 10, 50% é a metade. Depois: quantos meses para juntar R$ 120 para um tênis? Foco no 6º ano (EF06MA13)."
      ],
      [
        "12 min",
        "Dilema 2: promoção ou cilada?",
        "Uma camiseta de R$ 80 está com 25% de desconto numa loja e por R$ 65 na outra. Qual é mais barata? Depois o preço volta a subir 25%: ele volta a R$ 80? (Não: 60 + 25% = 75.) Foco no 7º e 8º anos (EF07MA02 e EF08MA04)."
      ],
      [
        "13 min",
        "Dilema 3: a poupança",
        "Monte com a turma uma tabela de R$ 100 guardados a 1% ao mês (taxa de exemplo). Juros simples: sempre R$ 1 por mês, R$ 112 em 12 meses. Juros compostos: 1% sobre o novo saldo a cada mês, com a calculadora (×1,01), chegando a cerca de R$ 112,68. Para o 9º ano: aumentar 10% e depois descontar 10% devolve ao valor inicial? (100 → 110 → 99.) Explique que a poupança rende juros compostos e que a taxa real varia; consulte o valor atual em fontes oficiais."
      ],
      [
        "5 min",
        "Fechamento",
        "Retome a votação inicial: R$ 110 daqui a um ano é um rendimento de 10%. Vale a pena? Depende de quanto o dinheiro renderia guardado e de quanto os preços sobem. Cada dupla registra uma decisão financeira que tomaria e o cálculo que a justifica."
      ]
    ],
    "avaliacao": "Registro das duplas nos três dilemas, observando as estratégias de cálculo (não só o resultado) e a justificativa escrita da decisão final. Erros comuns a observar: achar que +25% e −25% se anulam e somar juros sempre sobre o valor inicial nos juros compostos.",
    "inclusao": "Use calculadora com voz ou leitor de tela no celular para estudantes com deficiência visual e cédulas e moedas de brinquedo para quem precisa manipular os valores. Os dilemas podem ser lidos em voz alta e os valores ajustados para números menores conforme a turma. Evite expor a realidade financeira das famílias: os dilemas usam personagens fictícios.",
    "recursos": ["mesada", "poupanca"]
  },
  "p-ma-obmep": {
    "duracao": "1 aula de 50 min",
    "metodologia": [
      "Resolução de problemas com pensar-conversar-compartilhar",
      "Cada problema passa por três momentos: o estudante pensa sozinho, conversa com a dupla e compartilha com a turma. As etapas de Polya (entender, planejar, executar, conferir) organizam o raciocínio, e o foco está na estratégia, não na resposta."
    ],
    "objetivos": [
      "Conhecer a OBMEP: público, níveis, fases e oportunidades para os estudantes.",
      "Aplicar as quatro etapas de resolução de problemas de Polya.",
      "Usar estratégias como procurar padrão, tentativa organizada, desenho e contagem sistemática.",
      "Comparar diferentes caminhos para resolver o mesmo problema."
    ],
    "materiais": [
      "Folha com os problemas da aula (1 por estudante)",
      "Quadro com as quatro etapas de Polya escritas",
      "Opcional: projetor para mostrar o site oficial (obmep.org.br) e o Banco de Questões"
    ],
    "etapas": [
      [
        "8 min",
        "O que é a OBMEP",
        "Apresente a olimpíada: é gratuita para escolas públicas e privadas, tem o Nível 1 (6º e 7º anos), o Nível 2 (8º e 9º anos) e o Nível 3 (ensino médio), uma 1ª fase de múltipla escolha e uma 2ª fase discursiva para os classificados. Mencione medalhas, menções honrosas e o Programa de Iniciação Científica Jr. Mostre onde ficam as provas anteriores e o calendário no site oficial."
      ],
      [
        "7 min",
        "Aquecimento com Polya",
        "Problema: quantos números de dois algarismos têm a soma dos algarismos igual a 5? Resolva junto com a turma, passando pelas quatro etapas no quadro. Estratégia: lista organizada (14, 23, 32, 41, 50). Resposta: 5."
      ],
      [
        "20 min",
        "Três problemas, três estratégias",
        "Em duplas, com pensar-conversar-compartilhar: (1) Padrão: qual é o algarismo das unidades de 2²⁰? As unidades se repetem em 2, 4, 8, 6; como 20 é múltiplo de 4, a resposta é 6. (2) Contagem: quantos números de três algarismos diferentes dá para formar com 1, 2 e 3? São 3 × 2 × 1 = 6. (3) Tentativa organizada: num estacionamento há carros e motos, 10 veículos e 32 rodas; quantos carros? Com tabela ou desenho, chega-se a 6 carros e 4 motos. As duplas do 6º e 7º anos podem resolver por desenho e listas; as do 8º e 9º devem apresentar dois caminhos diferentes para um dos problemas."
      ],
      [
        "10 min",
        "Socialização",
        "Duplas apresentam caminhos diferentes para o mesmo problema (o 3 rende bem: desenho, tabela ou equação). Destaque a etapa de conferir: 6 carros e 4 motos dão 24 + 8 = 32 rodas?"
      ],
      [
        "5 min",
        "Plano de treino",
        "Cada estudante anota uma estratégia que quer treinar e se compromete a resolver um problema por semana de provas anteriores do seu nível. Dica para a 1ª fase: eliminar alternativas impossíveis também é estratégia."
      ]
    ],
    "avaliacao": "Registro individual da folha de problemas, observando qual estratégia cada estudante usou e se conferiu a resposta. Na socialização, avalie a clareza ao explicar o raciocínio, que é o que a 2ª fase da OBMEP cobra.",
    "inclusao": "Disponibilize os problemas em fonte ampliada ou leitura em voz alta, e materiais concretos (tampinhas para os veículos, cartões com os algarismos 1, 2 e 3) para quem precisa manipular. Valorize qualquer estratégia correta: o desenho vale tanto quanto a equação. Estudantes com laudo têm direito a atendimento específico na prova; oriente a escola a solicitá-lo no período de inscrição.",
    "recursos": ["l-obmep-n1-1", "l-obmep-n1-2", "l-obmep-n1-3", "l-obmep-n2-1", "l-obmep-n2-2", "l-obmep-n2-3"]
  },
  /* ---------- fim das oficinas de Matemática ---------- */
};

/* estaticas: início (gerado por _fonte/material/gerar.js; não edite à mão)
   Endereço da página estática de cada plano, ficha, lista e habilidade (hab:CÓDIGO), relativo a material-didatico/. */
const ESTATICAS = {
  "f-robo": "fichas/programando-colega-robo/",
  "f-decompor": "fichas/decompor-resolver/",
  "f-pacotes": "fichas/mensagem-pacotes/",
  "f-cesar": "fichas/disco-cifra-cesar/",
  "f-grafo": "fichas/mapa-bairros/",
  "f-fracoes": "fichas/barras-fracoes/",
  "f-batalha": "fichas/batalha-naval-cartesiana/",
  "f-golpe": "fichas/meus-dados-minhas-regras/",
  "f-co-tipos": "fichas/colecoes-tipos-dados/",
  "f-co-maquinas": "fichas/maquinas-entrada-saida/",
  "f-co-generalizar": "fichas/uma-receita-qualquer-numero/",
  "f-co-arquivos": "fichas/arrumando-pastas-computador/",
  "f-co-respeito": "fichas/do-outro-lado-tela-tem-gente/",
  "f-co-aparelho": "fichas/a-vida-meu-aparelho/",
  "f-co-registros": "fichas/a-ficha-turma-registros-vetores/",
  "f-co-bugs": "fichas/caca-aos-bugs-papel/",
  "f-co-projeto7": "fichas/nosso-projeto-pagina/",
  "f-co-seguranca7": "fichas/detetive-golpes-senhas-fortes/",
  "f-co-empatia": "fichas/discordar-sem-ferir/",
  "f-co-cyberbullying": "fichas/o-que-eu-faria-cyberbullying/",
  "f-co-descarte": "fichas/mapa-descarte-eletronico/",
  "f-co-roteiro": "fichas/roteiro-relampago-producao-digital/",
  "f-co-recursao": "fichas/fila-recursiva-fatorial/",
  "f-co-listas": "fichas/a-playlist-listas-que-crescem/",
  "f-co-ordenar": "fichas/ordenar-buscar-cartoes/",
  "f-co-projeto8": "fichas/ficha-projeto-requisitos-testes/",
  "f-co-paralelo": "fichas/a-corrida-somas-paralelismo/",
  "f-co-internet": "fichas/mapa-internet-rede-redes/",
  "f-co-feed": "fichas/o-feed-papel/",
  "f-co-termos": "fichas/tradutores-termos-uso/",
  "f-co-checagem8": "fichas/agencia-checagem/",
  "f-co-arvore": "fichas/arvore-decisao-adivinhe-animal/",
  "f-co-prototipo": "fichas/prototipo-papel/",
  "f-co-estados": "fichas/maquina-estados-personagem/",
  "f-co-incidente": "fichas/analise-incidente-como-agem-ataques/",
  "f-co-radar": "fichas/radar-bairro-dados-cidade/",
  "f-co-julgamento": "fichas/julgamento-tecnologia/",
  "f-co-acesso": "fichas/mapa-acesso-digital/",
  "f-co-creditos": "fichas/creditos-certos-licencas-uso-imagem/",
  "f-co-verdade": "fichas/checagem-todos-formatos/",
  "f-ma-decimais": "fichas/fracoes-decimais-metro/",
  "f-ma-mmc": "fichas/corrida-sapos-mmc/",
  "f-ma-potencias": "fichas/quadrados-tampinhas-potencia-raiz/",
  "f-ma-area": "fichas/hortas-mesma-cerca-area-perimetro/",
  "f-ma-inteiros": "fichas/fichas-positivas-negativas/",
  "f-ma-equacoes": "fichas/envelopes-balanca-equacoes/",
  "f-ma-racionais": "fichas/varal-numeros-racionais/",
  "f-ma-regra3": "fichas/regra-tres-receita/",
  "f-ma-razao": "fichas/razoes-corpo-patio/",
  "f-ma-proporcao": "fichas/ampliar-sem-deformar-proporcao/",
  "f-ma-produtos": "fichas/quadrado-recortado-produtos-notaveis/",
  "f-ma-fatoracao": "fichas/fatorar-montar-retangulos/",
  "f-ma-polinomios": "fichas/domino-polinomios/",
  "f-ma-geometria": "fichas/atelie-mosaicos-angulos-poligonos/",
  "f-ma-tales": "fichas/medindo-sombras-teorema-tales/",
  "p-ma-decimais": "planos/fracoes-decimais-metro/",
  "p-ma-mmc": "planos/mmc-corrida-sapos/",
  "p-ma-potencias": "planos/potencias-raizes-quadrados/",
  "p-ma-area": "planos/a-horta-escola-area-perimetro/",
  "p-ma-inteiros": "planos/operacoes-negativos-pares-zero/",
  "p-ma-equacoes": "planos/equacoes-1-grau-envelopes-misteriosos/",
  "p-ma-racionais": "planos/o-varal-racionais/",
  "p-ma-regra3": "planos/regra-tres-cozinha/",
  "p-ma-razao": "planos/razoes-medidas-corpo-patio/",
  "p-ma-proporcao": "planos/ampliar-sem-deformar-proporcao-escala/",
  "p-ma-produtos": "planos/produtos-notaveis-recortes/",
  "p-ma-fatoracao": "planos/fatoracao-blocos-algebricos/",
  "p-ma-polinomios": "planos/polinomios-domino-expressoes/",
  "p-ma-geometria": "planos/atelie-mosaicos-geometria-plana/",
  "p-ma-tales": "planos/medindo-escola-teorema-tales/",
  "p-ma-graficos": "planos/pesquisa-relampago-pergunta-ao-grafico/",
  "p-ma-financeira": "planos/mesada-descontos-juros-decisoes-porcentagem/",
  "p-ma-obmep": "planos/minha-primeira-obmep-estrategias-resolver-problemas/",
  "p-robo": "planos/algoritmos-papel-ao-robo/",
  "p-internet": "planos/como-mensagem-atravessa-internet/",
  "p-grafos": "planos/grafos-caminho-mais-curto/",
  "p-cripto": "planos/segredos-codigo-criptografia/",
  "p-golpes": "planos/golpes-digitais-dados-pessoais/",
  "p-fracoes": "planos/comparando-fracoes/",
  "p-cartesiano": "planos/localizacao-plano-cartesiano/",
  "p-equacoes": "planos/equacoes-balanca/",
  "p-dados": "planos/colecoes-entradas-saidas/",
  "p-arquivos": "planos/arquivos-ordem-pastas-compactacao-metadados/",
  "p-conduta": "planos/convivencia-digital-respeito-empatia-cyberbullying/",
  "p-lixo": "planos/do-consumo-ao-lixo-eletronico/",
  "p-registros": "planos/registros-listas-ficha-turma/",
  "p-bugs": "planos/caca-aos-bugs-depuracao-programas/",
  "p-reuso": "planos/blocos-que-se-repetem-funcoes-reuso/",
  "p-midia": "planos/projeto-nossa-producao-digital/",
  "p-recursao": "planos/listas-recursao-algoritmos-ordenacao/",
  "p-paralelo": "planos/muitas-maos-paralelismo-sistemas-distribuidos/",
  "p-redes": "planos/por-dentro-redes-sociais/",
  "p-fontes": "planos/checagem-fatos-fontes-vieses-desinformacao/",
  "p-wikipedia": "planos/a-wikipedia-como-base-dados/",
  "p-projeto8": "planos/projeto-programa-outra-disciplina/",
  "p-arvores": "planos/arvores-decisao-grafos/",
  "p-automatos": "planos/maquinas-estados-semaforo-ao-jogo/",
  "p-cidade": "planos/projeto-tecnologia-nossa-cidade/",
  "p-sociedade": "planos/tecnologia-poder-desigualdade-digital/",
  "p-autoria": "planos/autoria-direitos-autorais-uso-imagem/",
  "l6-tipos": "listas/tipos-dados-6-ano/",
  "l6-linguagem": "listas/linguagem-programacao-6-ano/",
  "l6-decomposicao": "listas/decomposicao-6-ano/",
  "l6-generalizacao": "listas/generalizacao-6-ano/",
  "l6-transmissao": "listas/transmissao-dados-6-ano/",
  "l6-gestao": "listas/gestao-dados-6-ano/",
  "l6-sociedade": "listas/tecnologia-digital-sociedade-6-ano/",
  "l6-sustentabilidade": "listas/tecnologia-digital-sustentabilidade-6-ano/",
  "l7-registros": "listas/registros-matrizes-7-ano/",
  "l7-analise": "listas/analise-programas-7-ano/",
  "l7-projetos": "listas/projetos-programacao-7-ano/",
  "l7-grafos": "listas/propriedades-grafos-7-ano/",
  "l7-reuso": "listas/reuso-7-ano/",
  "l7-protocolos": "listas/protocolos-comunicacao-redes-7-ano/",
  "l7-seguranca": "listas/seguranca-cibernetica-7-ano/",
  "l7-cyberbullying": "listas/cyberbullying-7-ano/",
  "l7-impactos": "listas/impactos-tecnologia-digital-7-ano/",
  "l7-producao": "listas/producao-digital-7-ano/",
  "l8-listas": "listas/listas-recursao-8-ano/",
  "l8-algoritmos": "listas/algoritmos-classicos-8-ano/",
  "l8-projetos": "listas/projetos-programacao-8-ano/",
  "l8-distribuidos": "listas/sistemas-distribuidos-8-ano/",
  "l8-internet": "listas/internet-8-ano/",
  "l8-redes-sociais": "listas/redes-sociais-seguranca-informacao-8-ano/",
  "l8-seguranca-virtual": "listas/seguranca-ambientes-virtuais-8-ano/",
  "l8-midias": "listas/uso-critico-midias-digitais-8-ano/",
  "l9-grafos-arvores": "listas/grafos-arvores-9-ano/",
  "l9-projetos": "listas/projetos-programacao-9-ano/",
  "l9-automatos": "listas/automatos-eventos-9-ano/",
  "l9-seguranca": "listas/seguranca-cibernetica-9-ano/",
  "l9-sociedade": "listas/tecnologia-digital-sociedade-9-ano/",
  "l9-autoria": "listas/autoria-meio-digital-9-ano/",
  "l9-qualidade": "listas/qualidade-informacao-9-ano/",
  "l6-revisao": "listas/revisao-ano-6-ano/",
  "l7-revisao": "listas/revisao-ano-7-ano/",
  "l8-revisao": "listas/revisao-ano-8-ano/",
  "l9-revisao": "listas/revisao-ano-9-ano/",
  "l-ma-decimais": "listas/fracoes-numeros-decimais-6-ano/",
  "l-ma-mmc": "listas/mmc-multiplos-6-ano/",
  "l-ma-potencias": "listas/potenciacao-radiciacao-8-ano/",
  "l-ma-area": "listas/area-perimetro-6-ano/",
  "l-ma-inteiros": "listas/operacoes-numeros-negativos-7-ano/",
  "l-ma-equacoes": "listas/equacoes-primeiro-grau-7-ano/",
  "l-ma-racionais": "listas/fracoes-numeros-racionais-7-ano/",
  "l-ma-regra3": "listas/regra-tres-7-ano/",
  "l-ma-razao": "listas/razao-7-ano/",
  "l-ma-proporcao": "listas/proporcao-8-ano/",
  "l-ma-produtos": "listas/produtos-notaveis-9-ano/",
  "l-ma-fatoracao": "listas/fatoracao-9-ano/",
  "l-ma-polinomios": "listas/polinomios-8-ano/",
  "l-ma-geometria": "listas/geometria-plana-angulos-poligonos-7-ano/",
  "l-ma-tales": "listas/teorema-tales-9-ano/",
  "l-obmep-n1-1": "listas/simulado-obmep-nivel-1-n-1/",
  "l-obmep-n1-2": "listas/simulado-obmep-nivel-1-n-2/",
  "l-obmep-n1-3": "listas/simulado-obmep-nivel-1-n-3/",
  "l-obmep-n2-1": "listas/simulado-obmep-nivel-2-n-1/",
  "l-obmep-n2-2": "listas/simulado-obmep-nivel-2-n-2/",
  "l-obmep-n2-3": "listas/simulado-obmep-nivel-2-n-3/",
  "hab:EF06CO01": "bncc/ef06co01/",
  "hab:EF06CO02": "bncc/ef06co02/",
  "hab:EF06CO03": "bncc/ef06co03/",
  "hab:EF06CO04": "bncc/ef06co04/",
  "hab:EF06CO05": "bncc/ef06co05/",
  "hab:EF06CO06": "bncc/ef06co06/",
  "hab:EF06CO07": "bncc/ef06co07/",
  "hab:EF06CO08": "bncc/ef06co08/",
  "hab:EF06CO09": "bncc/ef06co09/",
  "hab:EF06CO10": "bncc/ef06co10/",
  "hab:EF07CO01": "bncc/ef07co01/",
  "hab:EF07CO02": "bncc/ef07co02/",
  "hab:EF07CO03": "bncc/ef07co03/",
  "hab:EF07CO04": "bncc/ef07co04/",
  "hab:EF07CO05": "bncc/ef07co05/",
  "hab:EF07CO06": "bncc/ef07co06/",
  "hab:EF07CO07": "bncc/ef07co07/",
  "hab:EF07CO08": "bncc/ef07co08/",
  "hab:EF07CO09": "bncc/ef07co09/",
  "hab:EF07CO10": "bncc/ef07co10/",
  "hab:EF07CO11": "bncc/ef07co11/",
  "hab:EF08CO01": "bncc/ef08co01/",
  "hab:EF08CO02": "bncc/ef08co02/",
  "hab:EF08CO03": "bncc/ef08co03/",
  "hab:EF08CO04": "bncc/ef08co04/",
  "hab:EF08CO05": "bncc/ef08co05/",
  "hab:EF08CO06": "bncc/ef08co06/",
  "hab:EF08CO07": "bncc/ef08co07/",
  "hab:EF08CO08": "bncc/ef08co08/",
  "hab:EF08CO09": "bncc/ef08co09/",
  "hab:EF08CO10": "bncc/ef08co10/",
  "hab:EF08CO11": "bncc/ef08co11/",
  "hab:EF09CO01": "bncc/ef09co01/",
  "hab:EF09CO02": "bncc/ef09co02/",
  "hab:EF09CO03": "bncc/ef09co03/",
  "hab:EF09CO04": "bncc/ef09co04/",
  "hab:EF09CO05": "bncc/ef09co05/",
  "hab:EF09CO06": "bncc/ef09co06/",
  "hab:EF09CO07": "bncc/ef09co07/",
  "hab:EF09CO08": "bncc/ef09co08/",
  "hab:EF09CO09": "bncc/ef09co09/",
  "hab:EF09CO10": "bncc/ef09co10/",
  "hab:EF06MA03": "bncc/ef06ma03/",
  "hab:EF06MA04": "bncc/ef06ma04/",
  "hab:EF06MA07": "bncc/ef06ma07/",
  "hab:EF06MA06": "bncc/ef06ma06/",
  "hab:EF06MA16": "bncc/ef06ma16/",
  "hab:EF06MA17": "bncc/ef06ma17/",
  "hab:EF06MA18": "bncc/ef06ma18/",
  "hab:EF06MA19": "bncc/ef06ma19/",
  "hab:EF06MA20": "bncc/ef06ma20/",
  "hab:EF06MA34": "bncc/ef06ma34/",
  "hab:EF07MA03": "bncc/ef07ma03/",
  "hab:EF07MA05": "bncc/ef07ma05/",
  "hab:EF07MA07": "bncc/ef07ma07/",
  "hab:EF07MA13": "bncc/ef07ma13/",
  "hab:EF07MA18": "bncc/ef07ma18/",
  "hab:EF07MA20": "bncc/ef07ma20/",
  "hab:EF07MA32": "bncc/ef07ma32/",
  "hab:EF08MA06": "bncc/ef08ma06/",
  "hab:EF08MA10": "bncc/ef08ma10/",
  "hab:EF09MA06": "bncc/ef09ma06/",
  "hab:EF08MA22": "bncc/ef08ma22/",
  "hab:EF06MA01": "bncc/ef06ma01/",
  "hab:EF06MA02": "bncc/ef06ma02/",
  "hab:EF06MA05": "bncc/ef06ma05/",
  "hab:EF06MA08": "bncc/ef06ma08/",
  "hab:EF06MA10": "bncc/ef06ma10/",
  "hab:EF06MA11": "bncc/ef06ma11/",
  "hab:EF06MA13": "bncc/ef06ma13/",
  "hab:EF06MA14": "bncc/ef06ma14/",
  "hab:EF06MA15": "bncc/ef06ma15/",
  "hab:EF06MA24": "bncc/ef06ma24/",
  "hab:EF06MA29": "bncc/ef06ma29/",
  "hab:EF07MA01": "bncc/ef07ma01/",
  "hab:EF07MA04": "bncc/ef07ma04/",
  "hab:EF07MA08": "bncc/ef07ma08/",
  "hab:EF07MA09": "bncc/ef07ma09/",
  "hab:EF07MA10": "bncc/ef07ma10/",
  "hab:EF07MA12": "bncc/ef07ma12/",
  "hab:EF07MA17": "bncc/ef07ma17/",
  "hab:EF07MA23": "bncc/ef07ma23/",
  "hab:EF07MA24": "bncc/ef07ma24/",
  "hab:EF07MA27": "bncc/ef07ma27/",
  "hab:EF07MA31": "bncc/ef07ma31/",
  "hab:EF08MA01": "bncc/ef08ma01/",
  "hab:EF08MA02": "bncc/ef08ma02/",
  "hab:EF08MA12": "bncc/ef08ma12/",
  "hab:EF08MA13": "bncc/ef08ma13/",
  "hab:EF08MA19": "bncc/ef08ma19/",
  "hab:EF08MA20": "bncc/ef08ma20/",
  "hab:EF08MA21": "bncc/ef08ma21/",
  "hab:EF09MA03": "bncc/ef09ma03/",
  "hab:EF09MA07": "bncc/ef09ma07/",
  "hab:EF09MA08": "bncc/ef09ma08/",
  "hab:EF09MA09": "bncc/ef09ma09/",
  "hab:EF09MA10": "bncc/ef09ma10/",
  "hab:EF09MA12": "bncc/ef09ma12/",
  "hab:EF09MA14": "bncc/ef09ma14/",
  "hab:EF09MA19": "bncc/ef09ma19/",
  "hab:EF06MA31": "bncc/ef06ma31/",
  "hab:EF06MA33": "bncc/ef06ma33/",
  "hab:EF07MA02": "bncc/ef07ma02/",
  "hab:EF07MA06": "bncc/ef07ma06/",
  "hab:EF07MA37": "bncc/ef07ma37/",
  "hab:EF08MA03": "bncc/ef08ma03/",
  "hab:EF08MA04": "bncc/ef08ma04/",
  "hab:EF08MA23": "bncc/ef08ma23/",
  "hab:EF09MA05": "bncc/ef09ma05/",
  "hab:EF09MA21": "bncc/ef09ma21/",
  "hab:EF09MA22": "bncc/ef09ma22/",
  "hab:EF06MA25": "bncc/ef06ma25/",
  "hab:EF06MA27": "bncc/ef06ma27/",
  "hab:EF06MA32": "bncc/ef06ma32/",
  "hab:EF07MA35": "bncc/ef07ma35/",
  "hab:EF07MA36": "bncc/ef07ma36/",
  "hab:EF06MA28": "bncc/ef06ma28/",
  "hab:EF08MA25": "bncc/ef08ma25/"
};
/* estaticas: fim */
