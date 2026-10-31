/* Aprenda: explicação curta e ilustrada para o estudante, uma por habilidade de Computação (6º ano ao Ensino Médio).
   Lida por _fonte/material/gerar.js, que escreve material-didatico/aprenda/<código>/.

   Cada habilidade:
     t      título para o estudante (o assunto em palavras simples)
     ideia  a ideia principal, em uma frase
     texto  dois ou três parágrafos curtos (aceita <b> e <i>)
     fig    ilustração: { tipo, ..., leg }  tipos: fluxo, grupos, compara, codigo, tabela, grafo (ver gerar.js)
     ex     exemplo do dia a dia
     pal    palavras-chave: [termo, significado]
     q      pergunta para conferir: [enunciado, [opções], índice da certa, por quê]
     faca   (opcional) desafio para fazer quando a habilidade ainda não tem lista de exercícios */
module.exports = {
  /* ============================== 6º ano ============================== */
  EF06CO01: {
    t: 'Organizar informações em grupos',
    ideia: 'Computadores guardam cada informação com um tipo: número, texto ou verdadeiro/falso. Agrupar o que é parecido ajuda a escolher o tipo certo.',
    texto: [
      'Quando você arruma o material da escola, junta lápis com lápis e cadernos com cadernos. O computador faz algo parecido com as informações: separa em <b>coleções</b> (conjuntos) de coisas do mesmo tipo.',
      'Cada coleção tem um <b>tipo de dado</b>. Idades e notas são <b>números</b> (dá para somar). Nomes e cidades são <b>textos</b>. Respostas de sim ou não são <b>lógicos</b> (verdadeiro ou falso). Escolher o tipo certo evita erros, como tentar somar dois nomes.'
    ],
    fig: { tipo: 'grupos', grupos: [['Números', '🔢', ['12', '7', '30', '9,5']], ['Textos', '🔤', ['"azul"', '"Ana"', '"Porto Alegre"']], ['Lógicos', '✅', ['verdadeiro', 'falso']]], leg: 'Uma bagunça de informações separada em três coleções, cada uma com seu tipo.' },
    ex: 'No cadastro da escola: nome (texto), idade (número), usa transporte escolar? (verdadeiro ou falso).',
    pal: [['Coleção', 'um grupo de informações parecidas.'], ['Tipo de dado', 'o “jeito” da informação: número, texto ou lógico.']],
    q: ['Qual informação é melhor guardar como verdadeiro ou falso?', ['O nome do estudante', 'A idade do estudante', 'Se o estudante usa óculos', 'A cidade onde mora'], 2, 'Usar óculos só tem duas respostas possíveis: sim (verdadeiro) ou não (falso).']
  },
  EF06CO02: {
    t: 'Sequência, repetição e decisão',
    ideia: 'Todo programa é feito de três peças: fazer passos em ordem, repetir passos e escolher o que fazer conforme uma condição.',
    texto: [
      'Um <b>algoritmo</b> é uma lista de instruções para resolver um problema. Na <b>sequência</b>, os passos vêm um depois do outro e a ordem importa: calçar o tênis antes da meia não funciona.',
      'Na <b>repetição</b>, um passo acontece várias vezes (“repita 4 vezes”). Na <b>seleção</b>, o programa decide: “se estiver chovendo, leve o guarda-chuva; senão, vá sem”. Com essas três peças dá para montar qualquer programa.'
    ],
    fig: { tipo: 'codigo', linhas: ['repita 4 vezes:', '    ande 1 passo', '    vire à direita', 'se tem obstáculo na frente:', '    pule', 'senão:', '    ande 1 passo'], leg: 'Repetição (repita) e seleção (se/senão) dentro de uma sequência. O robô desenha um quadrado e depois decide se pula.' },
    ex: 'Escovar os dentes: pegar a escova, colocar pasta (sequência), escovar cada dente (repetição), se a pasta acabou, avisar alguém (seleção).',
    pal: [['Sequência', 'passos em ordem, um depois do outro.'], ['Repetição', 'fazer um passo várias vezes.'], ['Seleção', 'escolher o caminho com “se… senão”.']],
    q: ['“Se o sinal estiver vermelho, pare; senão, atravesse.” Que peça do algoritmo é essa?', ['Sequência', 'Repetição', 'Seleção', 'Variável'], 2, 'É uma decisão que depende de uma condição (a cor do sinal): seleção.']
  },
  EF06CO03: {
    t: 'Descrever a solução com precisão',
    ideia: 'O computador faz exatamente o que você manda, nem mais nem menos. Por isso a solução precisa ser descrita sem dúvidas.',
    texto: [
      'Pessoas entendem ordens vagas como “arruma a mesa”. O computador não: ele precisa de cada passo claro, na ordem certa, sem pular nada.',
      'Antes de programar, escreva a solução em frases curtas e teste “de cabeça” se alguém que não sabe nada conseguiria seguir. Depois, cada frase vira uma instrução do programa.'
    ],
    fig: { tipo: 'compara', lados: [['❌ Vago', ['Faça um sanduíche.', 'Passe um pouco de margarina.', 'Junte tudo.']], ['✅ Preciso', ['Pegue 2 fatias de pão.', 'Passe margarina em uma face de cada fatia com a faca.', 'Coloque 1 fatia de queijo sobre uma delas.', 'Cubra com a outra fatia, margarina para dentro.']]], leg: 'A mesma tarefa descrita de forma vaga e de forma precisa.' },
    ex: 'Explicar o caminho até sua casa por mensagem: “vire na segunda rua à esquerda, depois da padaria” é melhor do que “é pertinho, logo ali”.',
    pal: [['Precisão', 'cada passo claro, sem duas interpretações.'], ['Programa', 'a solução escrita numa linguagem que o computador entende.']],
    q: ['Qual instrução é mais precisa para um robô?', ['Ande um pouco', 'Ande até perto da porta', 'Ande 3 passos para a frente', 'Ande o suficiente'], 2, '“3 passos para a frente” tem quantidade e direção: não deixa dúvida.']
  },
  EF06CO04: {
    t: 'Dividir um problema grande em partes',
    ideia: 'Problemas grandes ficam fáceis quando você os quebra em pedaços menores e resolve um de cada vez.',
    texto: [
      'Essa técnica se chama <b>decomposição</b>. Em vez de pensar em “fazer um jogo”, você pensa em partes: desenhar o personagem, fazer ele andar, contar os pontos, mostrar o fim de jogo.',
      'Cada parte vira um pedaço do programa. Você testa uma parte por vez, e quando todas funcionam, junta tudo. Se der erro, fica mais fácil achar onde está.'
    ],
    fig: { tipo: 'grafo', nos: [['Festa da turma', 200, 30], ['Comida', 70, 120], ['Música', 200, 120], ['Convites', 330, 120], ['Lista', 30, 190], ['Compras', 110, 190], ['Playlist', 200, 190], ['Mensagem', 330, 190]], arestas: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [2, 6], [3, 7]], leg: 'Um problema grande (a festa) quebrado em partes menores, e cada parte em tarefas simples.' },
    ex: 'Organizar uma festa da turma: comida, música e convites podem ser feitos por grupos diferentes ao mesmo tempo.',
    pal: [['Decomposição', 'quebrar um problema em partes menores.'], ['Subproblema', 'cada uma das partes.']],
    q: ['Para criar um jogo de perguntas, qual é um bom primeiro passo de decomposição?', ['Escrever tudo de uma vez', 'Separar em: perguntas, respostas, pontuação e tela final', 'Escolher a cor do fundo', 'Pedir para outra pessoa fazer'], 1, 'Separar o jogo em partes menores é decompor o problema.']
  },
  EF06CO05: {
    t: 'Entradas e saídas de um problema',
    ideia: 'Todo problema tem o que entra (os dados que você recebe) e o que sai (o resultado que você quer). Saber os dois é o começo da solução.',
    texto: [
      'Uma calculadora recebe números e uma operação (<b>entradas</b>) e mostra o resultado (<b>saída</b>). Entre uma coisa e outra está o <b>processamento</b>: o algoritmo.',
      'Antes de resolver, pergunte: o que eu recebo? De que tipo é (número, texto, lógico)? O que preciso entregar no fim? Com isso definido, fica muito mais fácil pensar nos passos do meio.'
    ],
    fig: { tipo: 'fluxo', passos: [['📥', 'Entrada: nota 1 e nota 2 (números)'], ['⚙️', 'Processamento: somar e dividir por 2'], ['📤', 'Saída: média (número) e “aprovado?” (lógico)']], leg: 'Entrada, processamento e saída de um programa que calcula a média.' },
    ex: 'No aplicativo de mapas, a entrada é onde você está e aonde quer ir; a saída é o caminho e o tempo da viagem.',
    pal: [['Entrada', 'os dados que o programa recebe.'], ['Saída', 'o resultado que o programa entrega.'], ['Processamento', 'o que acontece no meio.']],
    q: ['Um programa converte a temperatura de Celsius para Fahrenheit. Qual é a entrada?', ['A temperatura em Fahrenheit', 'A temperatura em Celsius', 'O termômetro', 'A fórmula'], 1, 'A temperatura em Celsius é o que o programa recebe; Fahrenheit é a saída.']
  },
  EF06CO06: {
    t: 'Um algoritmo para muitos casos',
    ideia: 'Quando vários problemas são parecidos, dá para criar um só algoritmo que resolve todos, trocando apenas os valores que mudam.',
    texto: [
      'Desenhar um quadrado, um triângulo e um hexágono parece ser três problemas. Mas olhe o padrão: em todos você anda e vira, repetindo. O que muda é <b>quantos lados</b> a figura tem.',
      'Esse valor que muda vira um <b>parâmetro</b> (uma variável). Assim você escreve o algoritmo uma vez só e usa para qualquer figura. Isso é <b>generalização</b>.'
    ],
    fig: { tipo: 'codigo', linhas: ['desenhe_figura(lados):', '    repita lados vezes:', '        ande 50', '        vire 360 ÷ lados graus', '', 'desenhe_figura(3)   → triângulo', 'desenhe_figura(4)   → quadrado', 'desenhe_figura(6)   → hexágono'], leg: 'Um único algoritmo com o parâmetro “lados” desenha várias figuras.' },
    ex: 'Uma receita de bolo “para N pessoas”: você muda N e as quantidades se ajustam, sem precisar de uma receita nova.',
    pal: [['Generalização', 'resolver vários casos parecidos com uma só solução.'], ['Parâmetro', 'o valor que muda de um caso para outro.']],
    q: ['No algoritmo “desenhe_figura(lados)”, o que é “lados”?', ['Um erro', 'Um parâmetro', 'Uma saída', 'Um comentário'], 1, '“lados” é o valor que muda de uma figura para outra: o parâmetro.']
  },
  EF06CO07: {
    t: 'Como a informação viaja em pacotes',
    ideia: 'Na internet, uma mensagem é quebrada em pedaços pequenos (pacotes) que viajam separados e são montados de novo no destino.',
    texto: [
      'Uma foto que você envia não vai inteira. Ela é dividida em <b>pacotes</b>, e cada um leva o endereço de destino e um número de ordem.',
      'Os pacotes passam por vários equipamentos (roteadores) e podem até seguir caminhos diferentes. No destino, o computador usa os números para colocar tudo em ordem. Se um pacote se perde, ele é pedido de novo.'
    ],
    fig: { tipo: 'fluxo', passos: [['🖼️', 'Foto inteira'], ['✂️', 'Quebrada em pacotes 1, 2, 3'], ['📡', 'Pacotes passam por roteadores'], ['🧩', 'Destino junta 1, 2, 3 em ordem'], ['🖼️', 'Foto inteira de novo']], leg: 'O caminho de uma foto pela rede.' },
    ex: 'Mandar um quebra-cabeça pelo correio em várias caixas numeradas: quem recebe monta tudo seguindo os números.',
    pal: [['Pacote', 'um pedaço da mensagem com endereço e número.'], ['Roteador', 'equipamento que encaminha os pacotes.']],
    q: ['Por que os pacotes têm um número de ordem?', ['Para ficarem mais leves', 'Para o destino montar a mensagem na ordem certa', 'Para não serem enviados', 'Para mudar a cor'], 1, 'Os pacotes podem chegar fora de ordem; o número permite remontar a mensagem.']
  },
  EF06CO08: {
    t: 'Guardar, organizar e compactar arquivos',
    ideia: 'Arquivos ficam organizados em pastas, têm informações sobre eles mesmos (metadados) e podem ser compactados para ocupar menos espaço.',
    texto: [
      'Um <b>arquivo</b> guarda um trabalho, uma foto ou uma música. <b>Pastas</b> organizam os arquivos como gavetas. Um bom nome (“trabalho-ciencias-2026”) ajuda a achar depois.',
      'Todo arquivo tem <b>metadados</b>: data de criação, tamanho, autor, tipo. <b>Compactar</b> (como no .zip) diminui o tamanho trocando repetições por um resumo, e dá para descompactar sem perder nada.'
    ],
    fig: { tipo: 'grafo', nos: [['Documentos', 200, 30], ['Escola', 100, 110], ['Fotos', 300, 110], ['ciencias.docx', 50, 190], ['mapa.pdf', 160, 190], ['festa.jpg', 300, 190]], arestas: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]], leg: 'Pastas dentro de pastas formam uma árvore de arquivos.' },
    ex: 'A compactação troca “AAAAABBB” por “5A3B”: menos letras para guardar a mesma informação.',
    pal: [['Metadados', 'dados sobre o arquivo: data, tamanho, autor.'], ['Compactar', 'diminuir o tamanho do arquivo sem perder o conteúdo.']],
    q: ['Qual destes é um metadado de uma foto?', ['As pessoas que aparecem nela', 'A data em que foi tirada', 'As cores do céu', 'O sorriso de quem tirou'], 1, 'A data é uma informação sobre o arquivo, guardada junto com ele: metadado.']
  },
  EF06CO09: {
    t: 'Respeito e boa conduta on-line',
    ideia: 'Atrás de cada tela tem uma pessoa. O que você escreve on-line tem o mesmo peso (ou mais) do que falar pessoalmente.',
    texto: [
      'Na internet não vemos o rosto de quem lê, e é fácil esquecer que a mensagem machuca. Uma piada pode virar ofensa, e um print pode circular para sempre.',
      'Boa conduta digital é: pensar antes de postar, não expor ninguém sem permissão, usar linguagem respeitosa e discordar de ideias sem atacar pessoas.'
    ],
    fig: { tipo: 'compara', lados: [['✅ Faça', ['Pense: eu diria isso pessoalmente?', 'Peça permissão antes de postar foto de alguém.', 'Discorde da ideia, não da pessoa.']], ['❌ Evite', ['Escrever tudo em maiúsculas (parece grito).', 'Compartilhar print de conversa privada.', 'Responder no calor da raiva.']]], leg: 'Atitudes que constroem um ambiente digital melhor.' },
    ex: 'No grupo da turma, alguém errou o dia da prova. Em vez de “que burro”, “acho que a prova é na quinta, confere?”.',
    pal: [['Netiqueta', 'regras de boa educação na internet.'], ['Empatia', 'se colocar no lugar do outro.']],
    q: ['Um colega postou uma opinião diferente da sua. Qual é a melhor atitude?', ['Xingar nos comentários', 'Mandar print para todo mundo zoar', 'Responder com respeito explicando o seu ponto de vista', 'Criar um perfil falso para atacar'], 2, 'Discordar com respeito, explicando seus argumentos, é a conduta adequada.']
  },
  EF06CO10: {
    t: 'Tecnologia, consumo e meio ambiente',
    ideia: 'Celulares e computadores usam recursos naturais para serem fabricados e viram lixo quando trocamos de aparelho sem necessidade.',
    texto: [
      'Um celular tem metais retirados de minas, plástico do petróleo e muita energia na fábrica. Quando ele é trocado cedo, todo esse custo para o planeta é desperdiçado.',
      '<b>Obsolescência</b> é quando um aparelho fica “velho” rápido, por falta de peças, atualizações ou por moda. Usar por mais tempo, consertar e descartar no lugar certo são atitudes de <b>sustentabilidade</b>.'
    ],
    fig: { tipo: 'fluxo', passos: [['⛏️', 'Extração de metais'], ['🏭', 'Fabricação'], ['📱', 'Uso'], ['🔧', 'Conserto e reúso'], ['♻️', 'Reciclagem no ponto de coleta']], volta: 'Materiais reciclados voltam para a fabricação', leg: 'O ciclo de vida de um aparelho: quanto mais tempo no uso e no conserto, menos extração.' },
    ex: 'Trocar só a bateria de um celular que ainda funciona bem, em vez de comprar um novo.',
    pal: [['Obsolescência', 'quando um aparelho fica ultrapassado ou para de funcionar cedo.'], ['Sustentabilidade', 'usar recursos sem prejudicar as próximas gerações.']],
    q: ['Qual atitude é mais sustentável?', ['Trocar de celular todo ano', 'Jogar pilhas no lixo comum', 'Consertar o aparelho e usar por mais tempo', 'Deixar carregadores ligados na tomada sem uso'], 2, 'Consertar e usar mais tempo evita extrair novos recursos e gerar lixo eletrônico.']
  },

  /* ============================== 7º ano ============================== */
  EF07CO01: {
    t: 'Registros e listas de dados',
    ideia: 'Um registro junta várias informações sobre uma mesma coisa; uma matriz (vetor) guarda vários valores do mesmo tipo em sequência.',
    texto: [
      'Pense na ficha de um estudante: nome, idade, turma. Essas informações juntas formam um <b>registro</b>, e cada uma é um <b>campo</b>.',
      'Já as notas do bimestre (7, 8, 6, 9) são valores do mesmo tipo, em ordem: isso é uma <b>matriz unidimensional</b> (ou vetor). Cada valor tem uma posição, e o programa acessa “a nota da posição 2”.'
    ],
    fig: { tipo: 'tabela', cab: ['Campo', 'nome', 'idade', 'notas (vetor)'], linhas: [['Registro 1', '"Ana"', '12', '[7, 8, 6, 9]'], ['Registro 2', '"Caio"', '13', '[9, 7, 8, 10]']], leg: 'Cada linha é um registro; o campo “notas” é um vetor com 4 posições.' },
    ex: 'A tabela de classificação do campeonato: cada time é um registro (nome, pontos, vitórias) e a lista de times é ordenada.',
    pal: [['Registro', 'conjunto de campos sobre uma mesma coisa.'], ['Vetor', 'sequência de valores do mesmo tipo, cada um numa posição.']],
    q: ['Em notas = [7, 8, 6, 9], qual valor está na 3ª posição?', ['7', '8', '6', '9'], 2, 'Contando da esquerda: 7 (1ª), 8 (2ª), 6 (3ª). Atenção: em muitas linguagens a contagem começa do 0!']
  },
  EF07CO02: {
    t: 'Encontrar e corrigir erros (bugs)',
    ideia: 'Todo programador erra. O importante é ler o programa com atenção, testar e descobrir onde está o erro para corrigir.',
    texto: [
      'Um erro em programa se chama <b>bug</b>. Pode ser de digitação (esquecer um parêntese), de ordem (passos trocados) ou de lógica (o programa roda, mas dá resultado errado).',
      'Para achar o bug: execute passo a passo, “seja o computador” e anote o valor das variáveis, teste com exemplos cuja resposta você já sabe. Corrigir erros se chama <b>depurar</b>.'
    ],
    fig: { tipo: 'codigo', linhas: ['media = nota1 + nota2 / 2    # 🐞 dá 7 + 4 = 11', 'media = (nota1 + nota2) / 2  # ✅ dá (7 + 8) / 2 = 7,5'], leg: 'Um bug de lógica: sem parênteses, só a nota2 é dividida.' },
    ex: 'Seguir uma receita e o bolo não crescer: você volta nos passos e descobre que esqueceu o fermento.',
    pal: [['Bug', 'erro em um programa.'], ['Depurar', 'procurar e corrigir os erros.'], ['Teste', 'rodar o programa com casos de resposta conhecida.']],
    q: ['O programa deveria somar 2 + 3, mas mostra 23. Que tipo de erro é provável?', ['O computador quebrou', 'Os números foram tratados como texto e “colados”', 'Faltou energia', 'Não é um erro'], 1, 'Juntar “2” e “3” como texto dá “23”: o tipo de dado está errado.']
  },
  EF07CO03: {
    t: 'Projetos: escolher a melhor ferramenta',
    ideia: 'Para resolver um problema real com programação, você escolhe como guardar os dados e qual técnica usar, e trabalha em equipe.',
    texto: [
      'Um projeto começa com uma pergunta: que problema vamos resolver e para quem? Depois vem o plano: que dados precisamos (uma lista? um registro?) e que técnicas usaremos (repetição, decomposição).',
      'Em grupo, cada pessoa cuida de uma parte, mas todos conversam para que as partes se encaixem. No fim, testem com quem vai usar e melhorem.'
    ],
    fig: { tipo: 'fluxo', passos: [['❓', 'Entender o problema'], ['📝', 'Planejar dados e técnicas'], ['👩‍💻', 'Programar em partes'], ['🧪', 'Testar com usuários'], ['✨', 'Melhorar']], volta: 'Repita até ficar bom', leg: 'As etapas de um projeto com programação.' },
    ex: 'Um app de controle da cantina: lista de produtos (vetor de registros), contagem de vendas (repetição), alerta quando acaba (seleção).',
    pal: [['Estrutura de dados', 'a forma de organizar os dados no programa.'], ['Colaboração', 'trabalhar junto, dividindo e integrando as partes.']],
    q: ['Para guardar o nome e o preço de 30 produtos, qual estrutura faz mais sentido?', ['Uma única variável de texto', 'Uma lista de registros (nome, preço)', 'Um número', 'Nenhuma'], 1, 'Cada produto é um registro (nome, preço) e a lista guarda os 30.']
  },
  EF07CO04: {
    t: 'Grafos: pontos e ligações',
    ideia: 'Um grafo é um desenho de pontos (vértices) ligados por linhas (arestas). Serve para representar mapas, amizades, redes e muito mais.',
    texto: [
      'Nas linhas de ônibus, as paradas são <b>vértices</b> e os trechos entre elas são <b>arestas</b>. Numa rede social, as pessoas são vértices e as amizades, arestas.',
      'Com grafos dá para responder perguntas: qual o caminho mais curto? Quem tem mais conexões (o <b>grau</b> do vértice)? Dá para chegar de A até B? Os aplicativos de mapa usam grafos o tempo todo.'
    ],
    fig: { tipo: 'grafo', nos: [['Casa', 50, 100], ['Escola', 180, 40], ['Praça', 180, 160], ['Mercado', 320, 100]], arestas: [[0, 1, '5 min'], [0, 2, '3 min'], [1, 3, '4 min'], [2, 3, '8 min'], [1, 2, '2 min']], leg: 'Um grafo de lugares do bairro com o tempo de cada trecho. Qual o caminho mais rápido de Casa até Mercado?' },
    ex: 'De Casa ao Mercado: pela Escola leva 5 + 4 = 9 min; pela Praça leva 3 + 8 = 11 min.',
    pal: [['Vértice', 'um ponto do grafo.'], ['Aresta', 'a ligação entre dois vértices.'], ['Grau', 'quantas arestas saem de um vértice.']],
    q: ['No grafo da figura, qual é o grau da Escola?', ['1', '2', '3', '4'], 2, 'A Escola se liga a Casa, Mercado e Praça: 3 arestas.']
  },
  EF07CO05: {
    t: 'Reaproveitar partes do programa',
    ideia: 'Se uma parte do programa se repete, transforme-a num bloco com nome (função) e use quantas vezes quiser.',
    texto: [
      'Em vez de copiar e colar os mesmos passos, você cria um bloco com nome, como <b>desenhar_estrela</b>, e chama esse bloco sempre que precisar. Isso é <b>reúso</b>.',
      'Com reúso o programa fica menor e mais fácil de corrigir: arrumou o bloco, arrumou em todos os lugares. Em equipe, cada pessoa pode criar blocos que os colegas usam.'
    ],
    fig: { tipo: 'codigo', linhas: ['definir pular():', '    suba 2', '    ande 1', '    desça 2', '', 'pular()', 'ande 3', 'pular()       # reusa o mesmo bloco', 'pular()'], leg: 'O bloco “pular” é escrito uma vez e usado três vezes.' },
    ex: 'Um refrão de música: está escrito uma vez na letra, com a indicação “refrão” onde ele se repete.',
    pal: [['Função', 'um bloco de instruções com nome, que pode ser chamado.'], ['Reúso', 'usar de novo uma solução que já existe.']],
    q: ['Qual é uma vantagem de usar funções?', ['O programa fica mais lento', 'Corrigir em um só lugar vale para todos os usos', 'Não precisa testar', 'O código fica mais repetido'], 1, 'Como o bloco é um só, a correção vale para todas as chamadas.']
  },
  EF07CO06: {
    t: 'Protocolos: as regras da conversa entre computadores',
    ideia: 'Para dois computadores se entenderem, eles seguem regras combinadas chamadas protocolos.',
    texto: [
      'Numa ligação telefônica, há regras: alguém diz “alô”, o outro responde, um fala de cada vez, e no fim se despedem. Computadores também precisam de regras assim: os <b>protocolos</b>.',
      'O <b>IP</b> cuida dos endereços, o <b>TCP</b> confere se todos os pacotes chegaram, e o <b>HTTP/HTTPS</b> é o protocolo dos sites. O cadeado do HTTPS indica que a conversa é protegida.'
    ],
    fig: { tipo: 'fluxo', passos: [['💻', 'Navegador: “Olá, quero a página inicial” (HTTP)'], ['🖥️', 'Servidor: “Aqui está!” + pacotes numerados (TCP)'], ['💻', 'Navegador: “Recebi tudo, obrigado!”']], leg: 'Uma conversa simplificada entre navegador e servidor, seguindo protocolos.' },
    ex: 'Os Correios também têm protocolo: CEP, endereço no formato certo, selo. Sem isso, a carta não chega.',
    pal: [['Protocolo', 'conjunto de regras para a comunicação.'], ['IP', 'o “endereço” de cada aparelho na rede.'], ['HTTPS', 'protocolo dos sites com conexão protegida.']],
    q: ['Para que serve um protocolo de rede?', ['Para deixar o computador mais bonito', 'Para que aparelhos diferentes se comuniquem seguindo as mesmas regras', 'Para apagar vírus', 'Para carregar a bateria'], 1, 'Protocolos são regras combinadas para a comunicação dar certo.']
  },
  EF07CO07: {
    t: 'Proteger-se de golpes e ataques',
    ideia: 'Senhas fortes, desconfiança de mensagens estranhas e atualizações em dia protegem você da maioria dos ataques.',
    texto: [
      'Criminosos tentam roubar contas e dados com mensagens falsas (<b>phishing</b>), links com prêmios e pedidos urgentes (“seu perfil será apagado!”).',
      'Para se proteger: use <b>senhas longas</b> e diferentes em cada site, ative a <b>verificação em duas etapas</b>, não clique em links suspeitos e nunca passe códigos recebidos por SMS para ninguém.'
    ],
    fig: { tipo: 'compara', lados: [['🚩 Sinais de golpe', ['Urgência: “só hoje!”, “em 1 hora”.', 'Prêmio que você não pediu.', 'Pedido de senha ou código.', 'Endereço de site estranho: banco-seguro123.com']], ['🛡️ Proteção', ['Senha longa: “girafa-azul-come-pipoca-7”.', 'Verificação em duas etapas.', 'Desconfiar e confirmar por outro canal.', 'Atualizar o celular e os apps.']]], leg: 'Como reconhecer e como evitar um golpe digital.' },
    ex: 'Mensagem: “Você ganhou um celular! Clique e informe seus dados.” É golpe: ninguém ganha prêmio de concurso que não participou.',
    pal: [['Phishing', 'mensagem falsa para “pescar” seus dados.'], ['Verificação em duas etapas', 'além da senha, um segundo código para entrar.']],
    q: ['Qual senha é mais segura?', ['123456', 'seunome2013', 'girafa-azul-come-pipoca-7', 'senha'], 2, 'Senhas longas, com várias palavras, são muito mais difíceis de adivinhar.']
  },
  EF07CO08: {
    t: 'Empatia com opiniões diferentes',
    ideia: 'Na internet você encontra pessoas que pensam diferente. Dá para discordar sem desrespeitar.',
    texto: [
      'Opiniões diferentes são normais e até ajudam a aprender. O problema é quando a discussão vira ataque pessoal, deboche ou ameaça.',
      '<b>Empatia</b> é tentar entender por que o outro pensa assim. Antes de responder, leia com calma, pergunte se não entendeu, e critique argumentos, não pessoas.'
    ],
    fig: { tipo: 'compara', lados: [['💥 Ataque', ['“Só um idiota pensa isso.”', 'Responder sem ler direito.', 'Chamar amigos para atacar junto.']], ['🤝 Diálogo', ['“Eu penso diferente porque…”', '“Não entendi, pode explicar?”', '“Concordo nessa parte, mas…”']]], leg: 'Duas formas de reagir a uma opinião diferente.' },
    ex: 'Na discussão sobre qual o melhor time, dá para defender o seu sem ofender a torcida do outro.',
    pal: [['Empatia', 'se colocar no lugar do outro.'], ['Argumento', 'motivo que sustenta uma opinião.']],
    q: ['Qual resposta mostra empatia numa discussão on-line?', ['“Você não sabe de nada.”', '“Entendo seu ponto, mas vejo de outro jeito porque…”', '“Kkkk que vergonha.”', 'Bloquear e expor a pessoa'], 1, 'Reconhecer o ponto do outro e explicar o seu é discordar com empatia.']
  },
  EF07CO09: {
    t: 'O que é cyberbullying e como agir',
    ideia: 'Cyberbullying é humilhar, ameaçar ou excluir alguém repetidamente pela internet. Ninguém precisa enfrentar isso sozinho.',
    texto: [
      'Pode ser apelido maldoso em grupo, montagem com foto, perfil falso para zoar, exclusão proposital ou espalhar segredos. Como fica registrado e se espalha rápido, machuca muito.',
      'Se acontecer com você ou com alguém: <b>não responda</b> no mesmo tom, <b>guarde provas</b> (prints), <b>bloqueie e denuncie</b> na plataforma e <b>conte para um adulto</b> de confiança. Quem só assiste também pode ajudar: não compartilhe e apoie a vítima.'
    ],
    fig: { tipo: 'fluxo', passos: [['✋', 'Não revide'], ['📸', 'Guarde provas'], ['🚫', 'Bloqueie e denuncie'], ['🗣️', 'Conte a um adulto'], ['💚', 'Apoie quem sofreu']], leg: 'O que fazer diante de um caso de cyberbullying.' },
    ex: 'Alguém criou figurinhas zoando uma colega. Quem recebe pode não repassar, avisar a colega e contar para a professora.',
    pal: [['Cyberbullying', 'violência repetida contra alguém pelo meio digital.'], ['Denunciar', 'avisar a plataforma ou um adulto para tomar providências.']],
    q: ['Você recebeu um meme que humilha um colega. O que fazer?', ['Repassar porque é engraçado', 'Não repassar, apoiar o colega e avisar um adulto', 'Comentar rindo', 'Fingir que não viu e mandar para outro grupo'], 1, 'Interromper a corrente e buscar ajuda protege quem está sendo atacado.']
  },
  EF07CO10: {
    t: 'Lixo eletrônico e o meio ambiente',
    ideia: 'Aparelhos eletrônicos têm metais que poluem o solo e a água quando jogados no lixo comum. Eles precisam de descarte especial.',
    texto: [
      'Pilhas, baterias, celulares e computadores têm chumbo, mercúrio e outros metais tóxicos. No lixão, eles vazam e contaminam a terra e os rios.',
      'O certo é levar a <b>pontos de coleta</b> de lixo eletrônico (lojas e prefeituras costumam ter). Lá, as peças são separadas, e metais como cobre e ouro voltam para a indústria (<b>reciclagem</b>).'
    ],
    fig: { tipo: 'compara', lados: [['🗑️ Lixo comum', ['Metais vazam para o solo.', 'Contaminam rios e lençóis de água.', 'Materiais valiosos se perdem.']], ['♻️ Ponto de coleta', ['Peças separadas com segurança.', 'Metais reciclados voltam à indústria.', 'Menos mineração.']]], leg: 'O destino de um celular velho faz diferença para o ambiente.' },
    ex: 'Juntar as pilhas usadas da casa num pote e levar ao coletor do supermercado.',
    pal: [['Lixo eletrônico', 'aparelhos e peças eletrônicas descartados.'], ['Descarte correto', 'entregar o resíduo onde ele pode ser tratado.']],
    q: ['Onde descartar uma bateria de celular estragada?', ['No lixo do banheiro', 'No ponto de coleta de lixo eletrônico', 'Enterrada no quintal', 'No rio'], 1, 'Baterias têm metais tóxicos e precisam ir para a coleta especial.']
  },
  EF07CO11: {
    t: 'Criar e publicar conteúdo digital',
    ideia: 'Um vídeo, podcast ou site bem feito passa por etapas: planejar, produzir, revisar, publicar e documentar o que foi feito.',
    texto: [
      'Antes de gravar, faça um <b>roteiro</b>: qual a mensagem, para quem e quanto tempo. Depois produza (grave, escreva, edite) e <b>revise</b> com colegas.',
      'Ao publicar, dê créditos às músicas e imagens que usou, cuide da privacidade de quem aparece e <b>documente</b>: anote ferramentas, quem fez o quê e o que aprenderam. Isso ajuda a melhorar o próximo projeto.'
    ],
    fig: { tipo: 'fluxo', passos: [['🗒️', 'Roteiro'], ['🎙️', 'Produção'], ['✂️', 'Edição'], ['👀', 'Revisão'], ['🌐', 'Publicação com créditos']], leg: 'As etapas da produção de um conteúdo digital.' },
    ex: 'Um podcast da turma sobre a história do bairro: entrevistas, edição no celular e publicação no site da escola.',
    pal: [['Roteiro', 'o plano do que será dito e mostrado.'], ['Créditos', 'citar quem criou o material que você usou.']],
    q: ['Qual etapa deve vir antes de gravar um vídeo?', ['Publicar', 'Fazer o roteiro', 'Contar as curtidas', 'Editar'], 1, 'O roteiro organiza a ideia antes da gravação.']
  },

  /* ============================== 8º ano ============================== */
  EF08CO01: {
    t: 'Recursão: resolver usando o próprio problema',
    ideia: 'Recursão é resolver um problema usando uma versão menor dele mesmo, até chegar num caso tão pequeno que a resposta é óbvia.',
    texto: [
      'Para contar quantas pessoas há numa fila sem sair do lugar, você pergunta para quem está na sua frente: “quantas pessoas há na sua frente?”. Cada um faz a mesma pergunta para o da frente, até o primeiro responder “nenhuma”. Aí cada um soma 1 e passa a resposta de volta.',
      'Toda recursão tem duas partes: o <b>caso base</b> (a resposta direta, que para a repetição) e o <b>passo recursivo</b> (chamar a mesma solução para um problema menor). Sem caso base, o programa nunca para.'
    ],
    fig: { tipo: 'codigo', linhas: ['fatorial(n):', '    se n == 1:', '        devolva 1                # caso base', '    devolva n × fatorial(n − 1)  # passo recursivo', '', 'fatorial(4) = 4 × fatorial(3)', '            = 4 × 3 × fatorial(2)', '            = 4 × 3 × 2 × 1 = 24'], leg: 'O fatorial calculado com recursão: cada chamada resolve um problema um pouco menor.' },
    ex: 'Bonecas russas: para abrir todas, você abre uma e repete com a de dentro, até achar a menor, que não abre.',
    pal: [['Recursão', 'uma função que chama a si mesma.'], ['Caso base', 'a situação simples em que a recursão para.']],
    q: ['O que acontece com uma recursão sem caso base?', ['Ela termina mais rápido', 'Ela nunca para (ou dá erro)', 'Ela vira uma lista', 'Nada muda'], 1, 'Sem caso base, a função continua se chamando para sempre, até o programa travar.']
  },
  EF08CO02: {
    t: 'Listas: guardar muitos itens juntos',
    ideia: 'Uma lista guarda vários itens em ordem e pode crescer ou diminuir: dá para adicionar, remover e percorrer cada item.',
    texto: [
      'Na programação, uma <b>lista</b> é como a lista de compras: tem itens em ordem e você pode incluir mais (“adicionar leite”), riscar (“remover pão”) ou ler um por um.',
      'Com uma repetição, o programa <b>percorre</b> a lista e faz algo com cada item: somar preços, procurar um nome, contar quantos são maiores que 10.'
    ],
    fig: { tipo: 'codigo', linhas: ['compras = ["arroz", "feijão", "pão"]', 'compras.adicionar("leite")', 'compras.remover("pão")', '# agora: ["arroz", "feijão", "leite"]', '', 'para cada item em compras:', '    mostre item'], leg: 'Criar uma lista, mudar os itens e percorrer um por um.' },
    ex: 'A playlist do celular é uma lista: você adiciona, remove, muda a ordem e ela toca item por item.',
    pal: [['Lista', 'coleção ordenada de itens que pode mudar de tamanho.'], ['Percorrer', 'visitar cada item da lista, um de cada vez.']],
    q: ['A lista é [5, 8, 2]. Depois de adicionar 7 no fim, quantos itens ela tem?', ['3', '4', '7', '22'], 1, 'Eram 3 itens; com o 7, passam a ser 4.']
  },
  EF08CO03: {
    t: 'Ordenar e buscar em listas',
    ideia: 'Existem receitas clássicas para ordenar uma lista e para encontrar um item nela. Algumas são muito mais rápidas que outras.',
    texto: [
      'Para <b>ordenar</b>, um jeito simples é a ordenação por seleção: achar o menor, colocar no começo, e repetir com o resto. Outro é a bolha: comparar vizinhos e trocar quando estão fora de ordem.',
      'Para <b>buscar</b>, você pode olhar item por item (busca sequencial). Se a lista já estiver ordenada, use a <b>busca binária</b>: olhe o meio, descarte a metade em que o item não pode estar e repita. Em 1000 itens, ela acha em no máximo 10 tentativas.'
    ],
    fig: { tipo: 'fluxo', passos: [['🔢', '[2, 5, 8, 12, 16, 23, 38] Procurando 23'], ['🎯', 'Meio = 12. 23 é maior: fica a metade da direita'], ['🎯', '[16, 23, 38] Meio = 23'], ['✅', 'Achou em 2 tentativas!']], leg: 'Busca binária: a cada passo, metade da lista é descartada.' },
    ex: 'Procurar uma palavra no dicionário: você abre no meio e decide se vai para a frente ou para trás, sem ler página por página.',
    pal: [['Ordenação', 'colocar os itens em ordem (crescente, alfabética).'], ['Busca binária', 'busca que divide uma lista ordenada ao meio a cada passo.']],
    q: ['Qual é a condição para usar a busca binária?', ['A lista ter números pares', 'A lista estar ordenada', 'A lista ser pequena', 'A lista ter só textos'], 1, 'Só dá para descartar metade se você sabe que tudo de um lado é menor e do outro é maior.']
  },
  EF08CO04: {
    t: 'Projetos com programação em equipe',
    ideia: 'Problemas reais de outras matérias (ciências, geografia, matemática) podem ser resolvidos com um programa feito em grupo.',
    texto: [
      'Um projeto computacional une o que você já sabe: entradas e saídas, listas, repetições, funções. O desafio é escolher um problema que importa e dividir bem o trabalho.',
      'Em equipe, combinem papéis (quem programa, quem testa, quem documenta), usem um lugar comum para o código e façam pequenas entregas. Testar cedo evita surpresas no fim.'
    ],
    fig: { tipo: 'tabela', cab: ['Papel', 'Faz o quê'], linhas: [['🧭 Coordenação', 'Organiza as tarefas e os prazos'], ['👩‍💻 Programação', 'Escreve as funções combinadas'], ['🧪 Testes', 'Experimenta com casos difíceis e anota os bugs'], ['📝 Documentação', 'Explica como usar e o que foi feito']], leg: 'Uma divisão possível de papéis num projeto de programação.' },
    ex: 'Um programa que calcula quanto de água a escola gasta por mês e mostra dicas para economizar, usando dados da conta de água.',
    pal: [['Projeto', 'trabalho com objetivo, etapas e prazo.'], ['Entrega', 'uma parte pronta e testada do projeto.']],
    q: ['Por que testar o programa em pequenas partes durante o projeto?', ['Para gastar mais tempo', 'Para descobrir erros cedo, quando são fáceis de corrigir', 'Porque é obrigatório só no fim', 'Para não precisar de equipe'], 1, 'Erros encontrados cedo são menores e mais fáceis de achar.']
  },
  EF08CO05: {
    t: 'Paralelismo: várias tarefas ao mesmo tempo',
    ideia: 'Dividir o trabalho entre vários processadores ou computadores faz tudo terminar mais rápido, mas exige organização.',
    texto: [
      'Na cozinha, uma pessoa sozinha faz arroz, depois feijão, depois salada. Com três pessoas, cada uma faz um prato ao mesmo tempo: isso é <b>paralelismo</b>.',
      'Às vezes duas tarefas disputam a mesma coisa (só tem um fogão livre): isso é <b>concorrência</b> e precisa de regras de vez. Serviços como streaming guardam e processam dados em muitos computadores espalhados pelo mundo: são <b>sistemas distribuídos</b>.'
    ],
    fig: { tipo: 'tabela', cab: ['Minuto', '1', '2', '3'], linhas: [['Sozinho', '🍚 arroz', '🫘 feijão', '🥗 salada'], ['Em paralelo', '🍚 🫘 🥗 tudo junto', '✅ pronto', '—']], leg: 'Três tarefas em sequência levam 3 minutos; em paralelo, 1.' },
    ex: 'Um trabalho em grupo em que cada pessoa pesquisa um tema ao mesmo tempo e depois juntam tudo.',
    pal: [['Paralelismo', 'várias tarefas sendo feitas ao mesmo tempo.'], ['Concorrência', 'tarefas disputando o mesmo recurso.'], ['Distribuído', 'espalhado por vários computadores.']],
    q: ['Duas pessoas querem usar a mesma impressora ao mesmo tempo. Isso é um exemplo de…', ['Concorrência', 'Recursão', 'Compactação', 'Criptografia'], 0, 'Duas tarefas disputando o mesmo recurso: concorrência.']
  },
  EF08CO06: {
    t: 'Como a internet funciona',
    ideia: 'A internet é uma rede de redes: milhões de computadores ligados por cabos, antenas e roteadores, que conversam por endereços.',
    texto: [
      'Seu celular se liga ao roteador de casa (ou à antena da operadora), que se liga ao provedor de internet, que se liga a outras redes pelo mundo, inclusive por <b>cabos submarinos</b>.',
      'Cada aparelho tem um endereço <b>IP</b>. Quando você digita um site, o <b>DNS</b> funciona como uma agenda: traduz “ohtopico.com.br” para o IP do <b>servidor</b>, onde o site está guardado. Aí os pacotes viajam até você.'
    ],
    fig: { tipo: 'fluxo', passos: [['📱', 'Seu celular'], ['📶', 'Roteador / antena'], ['🏢', 'Provedor'], ['🌊', 'Cabos e outras redes'], ['🖥️', 'Servidor do site']], leg: 'O caminho de casa até o servidor de um site.' },
    ex: 'Ver um vídeo de outro país: os dados podem atravessar o oceano por um cabo no fundo do mar em menos de um segundo.',
    pal: [['Servidor', 'computador que guarda e entrega sites e serviços.'], ['DNS', 'a “agenda” que troca nomes de sites por endereços IP.'], ['Provedor', 'empresa que liga você à internet.']],
    q: ['O que o DNS faz?', ['Guarda suas fotos', 'Traduz o nome do site para o endereço IP', 'Deixa a internet mais rápida', 'Bloqueia vírus'], 1, 'O DNS é a agenda da internet: transforma nomes em números de endereço.']
  },
  EF08CO07: {
    t: 'Como as redes sociais funcionam',
    ideia: 'Redes sociais escolhem o que aparece para você com algoritmos que querem prender sua atenção. Saber disso ajuda a compartilhar com mais cuidado.',
    texto: [
      'O que você vê no feed não está em ordem de chegada. Um <b>algoritmo</b> observa o que você curte, comenta e quanto tempo olha, e mostra mais do mesmo. Assim cada pessoa vê uma “bolha” diferente.',
      'Uma postagem pode se espalhar muito rápido (<b>viralizar</b>) e sair do seu controle. Antes de compartilhar, pense: é verdade? Expõe alguém? Eu ficaria bem se meus pais ou a escola vissem?'
    ],
    fig: { tipo: 'fluxo', passos: [['👍', 'Você curte vídeos de gatos'], ['🤖', 'O algoritmo anota'], ['🐱', 'Mostra mais gatos'], ['⏳', 'Você fica mais tempo']], volta: 'E o ciclo continua', leg: 'O ciclo do feed: o que você faz alimenta o que você vê.' },
    ex: 'Duas pessoas pesquisam o mesmo assunto e recebem vídeos com opiniões opostas, cada uma reforçando o que já pensava.',
    pal: [['Algoritmo de recomendação', 'programa que escolhe o que aparece no seu feed.'], ['Bolha', 'quando você só vê conteúdos parecidos com o que já gosta.']],
    q: ['Por que o feed de duas pessoas é diferente?', ['Porque a internet é lenta', 'Porque o algoritmo mostra conteúdos conforme o que cada uma curte e assiste', 'Por sorte', 'Porque uma paga e a outra não'], 1, 'O algoritmo de recomendação personaliza o feed para cada pessoa.']
  },
  EF08CO08: {
    t: 'Seus dados pessoais valem muito',
    ideia: 'Nome, endereço, CPF, fotos e localização são dados pessoais. Entregar dados sem pensar pode levar a golpes e exposição.',
    texto: [
      '<b>Dados pessoais</b> são informações que identificam você: nome completo, CPF, telefone, endereço, rosto, escola. Alguns são <b>sensíveis</b>, como saúde, religião e biometria, e precisam de ainda mais cuidado.',
      'Antes de preencher um cadastro ou um teste divertido (“qual personagem você é?”), pergunte: por que precisam disso? Um jogo não precisa do seu CPF. Quanto menos dados você espalha, menor o risco.'
    ],
    fig: { tipo: 'grupos', grupos: [['Pode ser público', '🙂', ['Apelido', 'Time favorito', 'Gosto musical']], ['Cuidado', '⚠️', ['Nome completo', 'Escola', 'Foto do rosto', 'Data de nascimento']], ['Nunca compartilhe', '⛔', ['Senha', 'CPF', 'Endereço', 'Localização em tempo real', 'Código do SMS']]], leg: 'Dados pessoais organizados pelo nível de risco ao compartilhar.' },
    ex: 'Postar foto com o uniforme e a placa da rua mostra a qualquer pessoa onde você estuda e mora.',
    pal: [['Dado pessoal', 'informação que identifica uma pessoa.'], ['Dado sensível', 'dado pessoal que pode causar discriminação, como saúde ou religião.']],
    q: ['Um jogo on-line pede seu CPF e endereço para você ganhar moedas. O que fazer?', ['Preencher rápido', 'Não preencher: um jogo não precisa desses dados', 'Passar os dados de um amigo', 'Mandar foto do documento'], 1, 'Pedidos de dados sem necessidade são sinal de risco ou golpe.']
  },
  EF08CO09: {
    t: 'Ler os termos de uso',
    ideia: 'Ao clicar “aceito”, você fecha um acordo com a plataforma. Os termos dizem o que ela pode fazer com seus dados e com o que você posta.',
    texto: [
      'Os <b>termos de uso</b> e a <b>política de privacidade</b> explicam a idade mínima, que dados são coletados, com quem são compartilhados e quem pode usar suas fotos e vídeos.',
      'Ninguém lê tudo, mas dá para procurar o principal: idade mínima, dados coletados, compartilhamento com “parceiros”, como apagar a conta. Muitas redes exigem 13 anos ou mais.'
    ],
    fig: { tipo: 'tabela', cab: ['Procure nos termos', 'Por que importa'], linhas: [['Idade mínima', 'Abaixo dela, a conta pode ser apagada'], ['Dados coletados', 'Localização, contatos, câmera…'], ['Compartilhamento', 'Seus dados podem ir para anunciantes'], ['Direitos sobre o conteúdo', 'A plataforma pode usar o que você posta'], ['Como excluir a conta', 'Saber sair também é importante']], leg: 'Um roteiro rápido para ler termos de uso.' },
    ex: 'Um app de edição de fotos pede acesso aos contatos. Para editar fotos, ele não precisa disso.',
    pal: [['Termos de uso', 'as regras do acordo entre você e a plataforma.'], ['Política de privacidade', 'explica o que é feito com seus dados.']],
    q: ['Qual informação é mais importante procurar nos termos de uma rede social nova?', ['A cor do logotipo', 'Que dados são coletados e com quem são compartilhados', 'Quantos funcionários a empresa tem', 'O nome do criador'], 1, 'Saber o destino dos seus dados é o principal ponto dos termos.']
  },
  EF08CO10: {
    t: 'Segurança e privacidade on-line',
    ideia: 'Privacidade é decidir quem vê suas informações; segurança é impedir que alguém pegue o que não deve. As duas dependem de escolhas suas.',
    texto: [
      'Revise as <b>configurações de privacidade</b>: perfil fechado, quem pode comentar, localização desligada. Pense em quem pode ver cada postagem.',
      'Para a <b>segurança</b>: senhas diferentes, verificação em duas etapas, sair da conta em aparelhos compartilhados e cuidado com redes Wi-Fi públicas. Se algo der errado, troque a senha e avise um adulto.'
    ],
    fig: { tipo: 'compara', lados: [['🔒 Privacidade', ['Perfil fechado', 'Localização desligada', 'Escolher quem vê cada post', 'Não marcar a escola e a casa']], ['🛡️ Segurança', ['Senha longa e única', 'Duas etapas ativadas', 'Sair da conta em PC da escola', 'Atualizações em dia']]], leg: 'Privacidade e segurança: duas proteções que se completam.' },
    ex: 'Usar o computador da biblioteca e esquecer a conta aberta: a próxima pessoa pode postar em seu nome.',
    pal: [['Privacidade', 'controle sobre quem vê suas informações.'], ['Segurança', 'proteção contra acessos indevidos.']],
    q: ['Você usou o computador da escola para entrar na sua rede social. O que fazer ao terminar?', ['Deixar aberto para o colega', 'Sair da conta (logout)', 'Desligar o monitor', 'Nada'], 1, 'Sair da conta impede que outra pessoa use seu perfil.']
  },
  EF08CO11: {
    t: 'Avaliar fontes de informação',
    ideia: 'Nem tudo o que aparece on-line é preciso ou serve para o seu trabalho. Avalie quem escreveu, quando, com que objetivo e se outras fontes confirmam.',
    texto: [
      'Uma boa fonte é <b>precisa</b> (dados corretos), <b>relevante</b> (responde à sua pergunta), <b>adequada</b> (para a sua idade e objetivo) e <b>abrangente</b> (não esconde partes importantes).',
      'Toda fonte tem um ponto de vista, e algumas têm <b>vieses</b>: uma marca falando do próprio produto, por exemplo. Compare pelo menos duas fontes diferentes e prefira as que mostram de onde tiraram os dados.'
    ],
    fig: { tipo: 'tabela', cab: ['Pergunta', 'Olhe para'], linhas: [['Quem escreveu?', 'Autor, instituição, especialista?'], ['Quando?', 'Data de publicação: está atualizado?'], ['Para quê?', 'Informar, vender, convencer?'], ['Prova?', 'Cita dados, pesquisas, links?'], ['Outras fontes confirmam?', 'Busque o mesmo assunto em outro lugar']], leg: 'Cinco perguntas para avaliar uma fonte.' },
    ex: 'Um site de suplemento diz que o produto “faz crescer 10 cm”. Quem escreveu quer vender: procure fontes de saúde independentes.',
    pal: [['Fonte', 'de onde vem a informação.'], ['Viés', 'tendência que puxa a informação para um lado.']],
    q: ['Um texto sobre um refrigerante foi escrito pela própria fábrica. Qual é o principal cuidado?', ['Nenhum, é confiável', 'Pode ter viés, porque a empresa quer vender', 'É falso com certeza', 'É antigo'], 1, 'Quem tem interesse no assunto pode mostrar só o lado bom: é viés.']
  },

  /* ============================== 9º ano ============================== */
  EF09CO01: {
    t: 'Árvores e grafos na programação',
    ideia: 'Árvores e grafos organizam informações que se ligam umas às outras, e um programa pode percorrê-las para encontrar caminhos e respostas.',
    texto: [
      'Uma <b>árvore</b> é um grafo sem ciclos, com uma raiz no topo e ramos que se dividem: pastas do computador, árvore genealógica, tabela de um campeonato.',
      'Um programa guarda o grafo como uma lista de vizinhos (“A liga com B e C”) e o <b>percorre</b>: visita um nó, depois seus vizinhos, depois os vizinhos dos vizinhos. É assim que o mapa acha a rota e o jogo de “adivinhe o animal” chega à resposta.'
    ],
    fig: { tipo: 'grafo', nos: [['Tem penas?', 200, 30], ['Voa?', 100, 110], ['Tem listras?', 300, 110], ['🦜 Papagaio', 50, 190], ['🐧 Pinguim', 150, 190], ['🦓 Zebra', 260, 190], ['🐶 Cachorro', 350, 190]], arestas: [[0, 1, 'sim'], [0, 2, 'não'], [1, 3, 'sim'], [1, 4, 'não'], [2, 5, 'sim'], [2, 6, 'não']], leg: 'Uma árvore de decisão: cada pergunta divide as possibilidades até chegar à resposta.' },
    ex: 'O organograma da escola (direção, coordenação, professores) é uma árvore.',
    pal: [['Árvore', 'grafo com raiz e ramos, sem caminhos em círculo.'], ['Nó', 'cada ponto de um grafo ou árvore.'], ['Folha', 'nó da árvore que não tem filhos.']],
    q: ['Na árvore da figura, quantas perguntas são feitas para chegar ao Pinguim?', ['1', '2', '3', '4'], 1, '“Tem penas?” (sim) e “Voa?” (não): duas perguntas.']
  },
  EF09CO02: {
    t: 'Projetos computacionais completos',
    ideia: 'No 9º ano você junta tudo: entender um problema real, escolher estruturas de dados e algoritmos, programar em equipe, testar e apresentar.',
    texto: [
      'Um projeto completo começa por <b>ouvir quem tem o problema</b> (a cantina, a biblioteca, a turma) e definir o que a solução precisa fazer.',
      'Depois a equipe faz um <b>protótipo</b> simples, testa com usuários de verdade, corrige e melhora. No fim, apresenta o que fez, o que aprendeu e o que faria diferente.'
    ],
    fig: { tipo: 'fluxo', passos: [['👂', 'Ouvir usuários'], ['🎯', 'Definir requisitos'], ['🧱', 'Protótipo'], ['🧪', 'Testes com usuários'], ['🎤', 'Apresentação']], volta: 'Cada teste gera melhorias', leg: 'O ciclo de um projeto computacional.' },
    ex: 'Um sistema para a biblioteca da escola avisar por mensagem quando o prazo do livro está acabando.',
    pal: [['Requisito', 'algo que a solução precisa fazer.'], ['Protótipo', 'primeira versão simples para testar a ideia.']],
    q: ['Qual é o melhor primeiro passo de um projeto para a biblioteca?', ['Escolher a cor do app', 'Conversar com quem usa a biblioteca para entender o problema', 'Programar tudo de uma vez', 'Apresentar o resultado'], 1, 'Entender o problema com os usuários vem antes de qualquer código.']
  },
  EF09CO03: {
    t: 'Autômatos: máquinas de estados',
    ideia: 'Muitos sistemas podem ser descritos como estados e eventos: em cada estado, um evento faz o sistema mudar para outro estado.',
    texto: [
      'Um semáforo está sempre em um <b>estado</b>: verde, amarelo ou vermelho. Um <b>evento</b> (passou o tempo) faz ele mudar para o próximo estado. Esse modelo se chama <b>autômato</b> ou máquina de estados.',
      'Desenhar os estados e as setas ajuda a programar jogos (parado, correndo, pulando), robôs e máquinas de venda, sem esquecer nenhuma situação.'
    ],
    fig: { tipo: 'grafo', dir: true, nos: [['🟢 Verde', 70, 60], ['🟡 Amarelo', 330, 60], ['🔴 Vermelho', 200, 170]], arestas: [[0, 1, '30 s'], [1, 2, '5 s'], [2, 0, '40 s']], leg: 'O autômato de um semáforo: três estados e as transições entre eles.' },
    ex: 'Personagem de jogo: no estado “parado”, apertar a seta muda para “andando”; apertar pular muda para “no ar”.',
    pal: [['Estado', 'a situação atual do sistema.'], ['Evento', 'o que acontece e provoca a mudança.'], ['Transição', 'a seta de um estado para outro.']],
    q: ['Num autômato de porta automática, “aberta” e “fechada” são…', ['Eventos', 'Estados', 'Senhas', 'Pacotes'], 1, 'São as situações em que a porta pode estar: estados. “Pessoa chegou” seria um evento.']
  },
  EF09CO04: {
    t: 'Malwares e ataques cibernéticos',
    ideia: 'Malware é programa feito para causar dano: roubar dados, sequestrar arquivos ou espionar. Ele quase sempre entra porque alguém foi enganado.',
    texto: [
      'Tipos comuns: <b>vírus</b> (se espalha grudado em arquivos), <b>cavalo de Troia</b> (finge ser um app útil), <b>ransomware</b> (tranca seus arquivos e pede resgate) e <b>spyware</b> (espiona o que você faz).',
      'A porta de entrada costuma ser a <b>engenharia social</b>: enganar a pessoa para clicar, instalar ou passar a senha. Baixar apps só da loja oficial, atualizar o sistema e desconfiar de anexos evitam a maioria dos ataques.'
    ],
    fig: { tipo: 'grupos', grupos: [['Vírus', '🦠', ['Gruda em arquivos', 'Espalha ao compartilhar']], ['Cavalo de Troia', '🐴', ['Finge ser jogo ou app grátis', 'Abre a porta para invasores']], ['Ransomware', '🔐', ['Tranca seus arquivos', 'Pede resgate']], ['Spyware', '🕵️', ['Espiona telas e senhas', 'Envia para o criminoso']]], leg: 'Quatro tipos de malware e o que cada um faz.' },
    ex: 'Um site oferece “versão hackeada” de um jogo com moedas infinitas. O arquivo pode ser um cavalo de Troia.',
    pal: [['Malware', 'programa malicioso.'], ['Engenharia social', 'enganar pessoas para conseguir acesso.']],
    q: ['Um app grátis de lanterna pede acesso às suas mensagens e senhas. Isso parece…', ['Normal', 'Um possível cavalo de Troia', 'Uma atualização', 'Um antivírus'], 1, 'Uma lanterna não precisa das suas mensagens: o app pode esconder um malware.']
  },
  EF09CO05: {
    t: 'Criptografia: mensagens em código',
    ideia: 'Criptografia embaralha a mensagem com uma chave, para que só quem tem a chave consiga ler.',
    texto: [
      'Na <b>cifra de César</b>, cada letra anda algumas casas no alfabeto: com chave 3, A vira D e “OI” vira “RL”. Quem sabe a chave volta 3 casas e lê a mensagem.',
      'Hoje a criptografia usa matemática muito mais forte. Ela protege senhas guardadas, o cadeado dos sites (HTTPS) e as conversas com <b>criptografia de ponta a ponta</b>, em que nem a empresa do aplicativo consegue ler.'
    ],
    fig: { tipo: 'fluxo', passos: [['✉️', 'Mensagem: “OI”'], ['🔑', 'Cifrar com chave 3'], ['🔒', 'Viaja: “RL”'], ['🔑', 'Decifrar com chave 3'], ['✉️', 'Lê: “OI”']], leg: 'Uma mensagem cifrada só faz sentido para quem tem a chave.' },
    ex: 'O cadeado na barra do navegador indica que o que você digita no site viaja criptografado.',
    pal: [['Criptografia', 'técnica de embaralhar mensagens com uma chave.'], ['Chave', 'o segredo usado para cifrar e decifrar.']],
    q: ['Com a cifra de César de chave 1, como fica “CASA”?', ['DBTB', 'BZRZ', 'CASA', 'ASAC'], 0, 'Cada letra anda uma casa: C→D, A→B, S→T, A→B.']
  },
  EF09CO06: {
    t: 'Tecnologia para resolver problemas da cidade',
    ideia: 'Dados e ferramentas digitais ajudam a enxergar problemas da sua cidade e a propor soluções concretas.',
    texto: [
      'Buraco na rua, falta de árvores, ônibus lotado: esses problemas aparecem em <b>dados abertos</b> da prefeitura, em mapas colaborativos e em reclamações on-line.',
      'Com eles você pode investigar (onde acontece mais?), mostrar (um mapa, um gráfico) e propor (um app, uma campanha, uma carta à câmara de vereadores). Tecnologia vira ferramenta de <b>cidadania</b>.'
    ],
    fig: { tipo: 'fluxo', passos: [['🔍', 'Escolher um problema do bairro'], ['📊', 'Buscar dados abertos'], ['🗺️', 'Mostrar num mapa ou gráfico'], ['💡', 'Propor solução'], ['📣', 'Levar a quem decide']], leg: 'Do problema à proposta, com apoio de dados.' },
    ex: 'A turma mapeou no celular as calçadas sem rampa perto da escola e enviou o mapa para a prefeitura.',
    pal: [['Dados abertos', 'dados públicos que qualquer pessoa pode usar.'], ['Cidadania digital', 'participar da vida da cidade usando a tecnologia.']],
    q: ['Qual é um bom uso de dados abertos da cidade?', ['Descobrir as ruas com mais acidentes e propor faixas de pedestre', 'Espalhar boatos', 'Postar dados pessoais de vizinhos', 'Nenhum'], 0, 'Analisar dados públicos para propor melhorias é cidadania digital.']
  },
  EF09CO07: {
    t: 'Impactos da tecnologia na sociedade',
    ideia: 'Toda tecnologia traz ganhos e problemas: muda o trabalho, a política, o ambiente e a cultura. Pensar nos dois lados é essencial.',
    texto: [
      'Aplicativos de transporte facilitam a vida, mas mudam as condições de trabalho dos motoristas. Redes sociais aproximam pessoas, mas também espalham desinformação em eleições.',
      'Para analisar uma tecnologia, pergunte: quem ganha? Quem perde? Qual o impacto no ambiente e na cultura local? Quem decide como ela é usada?'
    ],
    fig: { tipo: 'compara', lados: [['➕ Ganhos', ['Acesso rápido à informação', 'Novas profissões', 'Ferramentas para a saúde e a ciência']], ['➖ Riscos', ['Desinformação e polarização', 'Trabalho precarizado', 'Consumo de energia e lixo eletrônico']]], leg: 'A mesma tecnologia pode ter efeitos positivos e negativos.' },
    ex: 'Uma inteligência artificial que ajuda médicos a ler exames, mas pode errar mais com grupos que tinham poucos dados no treino.',
    pal: [['Impacto', 'efeito de uma tecnologia na vida das pessoas.'], ['Implicação', 'consequência, às vezes não prevista.']],
    q: ['Qual pergunta ajuda a analisar o impacto de uma tecnologia?', ['Qual a cor do aplicativo?', 'Quem ganha e quem perde com ela?', 'Quantos downloads ela tem?', 'Ela é nova?'], 1, 'Olhar ganhadores e perdedores revela os efeitos sociais.']
  },
  EF09CO08: {
    t: 'Desigualdade digital no mundo',
    ideia: 'Computadores, internet e conhecimento técnico não estão distribuídos de forma igual entre países e pessoas, e isso levanta questões de justiça.',
    texto: [
      'Enquanto alguns lugares têm internet rápida em toda casa, outros não têm sinal. Muitos aparelhos são criados em países ricos, montados com trabalho barato e usam minérios extraídos em países pobres.',
      'Essa <b>desigualdade digital</b> afeta quem consegue estudar, trabalhar e participar das decisões. Discutir isso é pensar em <b>ética</b>: quem paga o custo da tecnologia que usamos?'
    ],
    fig: { tipo: 'fluxo', passos: [['⛏️', 'Minério extraído (muitas vezes em países pobres)'], ['🏭', 'Montagem com mão de obra barata'], ['🛒', 'Venda e lucro em países ricos'], ['🗑️', 'Lixo eletrônico enviado de volta']], leg: 'A cadeia global de um aparelho mostra a desigualdade na distribuição de ganhos e custos.' },
    ex: 'Na pandemia, estudantes sem internet em casa ficaram sem aulas remotas.',
    pal: [['Desigualdade digital', 'diferença no acesso à tecnologia e à internet.'], ['Ética', 'reflexão sobre o que é justo e certo.']],
    q: ['Qual situação mostra desigualdade digital?', ['Todos da turma têm internet igual', 'Parte da turma não consegue fazer a tarefa on-line por falta de internet', 'A escola tem biblioteca', 'O celular descarregou'], 1, 'A diferença de acesso afeta as oportunidades de estudo.']
  },
  EF09CO09: {
    t: 'Direitos autorais e uso de imagem',
    ideia: 'Quem cria uma obra tem direitos sobre ela, e toda pessoa tem direito sobre a própria imagem. Usar sem permissão pode ser ilegal.',
    texto: [
      'Música, foto, desenho e texto pertencem ao autor (<b>direitos autorais</b>). Para usar, procure obras com <b>licença livre</b> (como Creative Commons), peça permissão ou crie a sua, e sempre dê os créditos.',
      'O <b>direito de imagem</b> diz que ninguém pode usar sua foto ou vídeo sem autorização, e você também não pode postar a imagem de outras pessoas sem que elas aceitem.'
    ],
    fig: { tipo: 'compara', lados: [['✅ Pode', ['Usar imagens com licença Creative Commons, dando crédito', 'Citar um trecho com a fonte', 'Postar foto de um colega que autorizou']], ['❌ Não pode', ['Baixar música e publicar como sua', 'Copiar texto inteiro sem fonte', 'Postar vídeo de alguém sem permissão']]], leg: 'O que pode e o que não pode no uso de obras e imagens.' },
    ex: 'No vídeo do trabalho, a turma usou uma trilha da biblioteca gratuita de músicas e colocou o nome do autor nos créditos.',
    pal: [['Direito autoral', 'direito do criador sobre a obra.'], ['Creative Commons', 'licenças que permitem usar obras seguindo certas regras.'], ['Direito de imagem', 'direito de cada pessoa sobre a própria imagem.']],
    q: ['Você quer usar uma foto da internet no trabalho escolar. Qual a melhor atitude?', ['Usar qualquer uma, a internet é de todos', 'Procurar uma foto com licença livre e dar o crédito', 'Tirar a marca d’água', 'Dizer que a foto é sua'], 1, 'Licença livre + crédito ao autor respeita os direitos autorais.']
  },
  EF09CO10: {
    t: 'Checar se uma informação é verdadeira',
    ideia: 'Antes de acreditar ou compartilhar, verifique: quem publicou, se há provas e se fontes confiáveis dizem o mesmo.',
    texto: [
      '<b>Desinformação</b> costuma usar títulos alarmantes, pedir para “compartilhar antes que apaguem”, mostrar fotos fora de contexto ou áudios sem autor.',
      'Para checar: leia além do título, procure a mesma notícia em veículos conhecidos e em agências de checagem, faça uma <b>busca reversa da imagem</b> e confira a data. Na dúvida, não compartilhe.'
    ],
    fig: { tipo: 'fluxo', passos: [['🛑', 'Pare: não compartilhe ainda'], ['🔎', 'Quem publicou? Tem autor e data?'], ['🗞️', 'Outras fontes confiáveis confirmam?'], ['🖼️', 'Busca reversa da imagem'], ['✅', 'Decida: compartilhar ou não']], leg: 'Cinco passos para checar uma informação.' },
    ex: 'Uma foto de enchente “de hoje” circula no grupo da família. A busca reversa mostra que ela é de outro país, de 2015.',
    pal: [['Desinformação', 'informação falsa ou enganosa espalhada de propósito.'], ['Checagem', 'conferir a veracidade em outras fontes.']],
    q: ['Qual destes é um sinal de possível notícia falsa?', ['Tem autor e data', '“Compartilhe antes que apaguem!”', 'Aparece em vários jornais', 'Cita a pesquisa original'], 1, 'Pedido de pressa e alarme é uma técnica comum de desinformação.']
  },

  /* ============================== Ensino Médio ============================== */
  EM13CO01: {
    t: 'Reutilizar soluções que já existem',
    ideia: 'Bons programadores não começam do zero: reconhecem partes de soluções antigas que servem para o problema novo e as adaptam.',
    texto: [
      'Para reutilizar, você combina três ferramentas do pensamento computacional: <b>decompor</b> o problema em partes, <b>abstrair</b> (ignorar detalhes que não importam) e <b>generalizar</b> (perceber que uma parte é igual a algo que você já resolveu).',
      'Na prática isso aparece como funções próprias, bibliotecas prontas e trechos de projetos anteriores. Reutilizar economiza tempo e diminui erros, desde que você entenda o que está usando e respeite a licença.'
    ],
    fig: { tipo: 'grupos', grupos: [['Problema antigo: média da turma', '📚', ['ler notas', 'somar', 'dividir pela quantidade']], ['Problema novo: média de gols do time', '⚽', ['ler gols ✅ reuso', 'somar ✅ reuso', 'dividir ✅ reuso', 'mostrar gráfico (novo)']]], leg: 'Três partes da solução antiga servem no problema novo; só uma precisa ser criada.' },
    ex: 'Usar uma biblioteca pronta de gráficos em vez de programar o desenho de cada barra.',
    pal: [['Abstração', 'ignorar detalhes para ver o essencial.'], ['Biblioteca', 'conjunto de funções prontas para reutilizar.']],
    q: ['O que é preciso para reutilizar uma solução com segurança?', ['Copiar sem ler', 'Entender o que ela faz e respeitar a licença', 'Mudar o nome do autor', 'Nada'], 1, 'Reúso responsável exige entender o código e seguir a licença.'],
    faca: 'Escolha um programa ou planilha que você já fez. Liste três partes que poderiam ser usadas em outro problema e diga qual seria esse problema.'
  },
  EM13CO02: {
    t: 'Refinar a solução passo a passo',
    ideia: 'Uma solução complexa começa como uma ideia geral e vai sendo detalhada em camadas, até virar código.',
    texto: [
      'No <b>refinamento sucessivo</b>, você escreve primeiro o que o sistema faz em poucas linhas (alto nível de abstração). Depois detalha cada linha em passos menores, e repete até cada passo ser simples o suficiente para virar uma instrução.',
      'Cada camada é um <b>nível de abstração</b>: da <b>especificação</b> (o que fazer) à <b>implementação</b> (como fazer). Isso evita se perder em detalhes cedo demais.'
    ],
    fig: { tipo: 'codigo', linhas: ['Nível 1: organizar a gincana', 'Nível 2:   inscrever equipes · pontuar provas · mostrar ranking', 'Nível 3:     pontuar provas →', '                para cada prova: ler colocação, somar pontos', 'Nível 4:       pontos[equipe] = pontos[equipe] + tabela[colocacao]'], leg: 'A mesma tarefa descrita em quatro níveis, do geral ao código.' },
    ex: 'Planejar uma viagem: “ir à praia” → transporte, hospedagem, comida → comprar passagem no dia tal, às tantas horas.',
    pal: [['Refinamento', 'detalhar a solução aos poucos.'], ['Especificação', 'descrição do que o sistema deve fazer.'], ['Implementação', 'o código que faz acontecer.']],
    q: ['Qual frase está no nível mais alto de abstração?', ['soma = soma + x', 'Calcular a nota final de cada estudante', 'para i de 1 até 10', 'imprima(soma)'], 1, 'É uma descrição geral do objetivo, sem detalhes de código.'],
    faca: 'Escolha um app que você usa. Descreva o que ele faz em 1 frase (nível 1), depois em 4 partes (nível 2), e detalhe uma das partes em passos (nível 3).'
  },
  EM13CO03: {
    t: 'Quanto custa um algoritmo',
    ideia: 'Dois algoritmos podem dar a mesma resposta, mas um gastar muito mais tempo, memória ou energia. Comparar o custo ajuda a escolher.',
    texto: [
      'O custo é medido pelo <b>número de passos</b> em relação ao tamanho da entrada (n). A busca sequencial olha até n itens; a busca binária, só cerca de log₂ n. Com 1 milhão de itens: 1 milhão de passos contra 20.',
      'Além do <b>tempo</b>, conta a <b>memória</b> usada e a <b>energia</b> consumida, que pesa em celulares e data centers. Às vezes vale gastar mais memória para ganhar tempo, e vice-versa.'
    ],
    fig: { tipo: 'tabela', cab: ['Itens (n)', 'Busca sequencial', 'Busca binária'], linhas: [['10', '10 passos', '4 passos'], ['1.000', '1.000 passos', '10 passos'], ['1.000.000', '1.000.000 passos', '20 passos']], leg: 'Número máximo de passos para encontrar um item: a diferença cresce muito com n.' },
    ex: 'Ordenar 10 cartas na mão é rápido de qualquer jeito; ordenar 10 milhões de registros exige escolher bem o algoritmo.',
    pal: [['Complexidade', 'como o custo cresce quando a entrada cresce.'], ['Eficiência', 'resolver gastando menos recursos.']],
    q: ['Se a lista dobrar de tamanho, a busca sequencial passa a gastar…', ['O mesmo tempo', 'Cerca do dobro de passos', 'Metade dos passos', 'Um passo'], 1, 'Na busca sequencial, o número de passos cresce junto com o tamanho da lista.'],
    faca: 'Pense em dois jeitos de achar um nome numa lista de chamada de 40 estudantes. Conte quantos passos cada jeito precisa no pior caso.'
  },
  EM13CO04: {
    t: 'Programas que lidam com programas',
    ideia: 'Alguns programas recebem, transformam ou criam outros programas. É a metaprogramação, presente em compiladores, interpretadores e geradores de código.',
    texto: [
      'O código que você escreve em Python ou Scratch não é entendido direto pelo processador. Um <b>interpretador</b> lê e executa linha por linha; um <b>compilador</b> traduz o programa inteiro para linguagem de máquina antes.',
      'Há também <b>geradores de código</b>: programas que escrevem programas, como ferramentas de criar sites e assistentes de IA que sugerem código. Todos tratam o programa como um dado a ser lido e transformado.'
    ],
    fig: { tipo: 'fluxo', passos: [['📝', 'Código-fonte: print("oi")'], ['⚙️', 'Compilador ou interpretador'], ['🔢', 'Instruções de máquina: 01001…'], ['💻', 'Processador executa']], leg: 'Um programa (o compilador) recebe outro programa e o transforma.' },
    ex: 'Este site tem um gerador: um programa lê os dados das habilidades e escreve automaticamente as páginas, incluindo esta.',
    pal: [['Compilador', 'traduz o programa inteiro antes de executar.'], ['Interpretador', 'lê e executa o programa aos poucos.'], ['Metaprogramação', 'programas que trabalham sobre programas.']],
    q: ['Qual destes é um exemplo de metaprogramação?', ['Uma calculadora somando números', 'Um compilador traduzindo código C para linguagem de máquina', 'Um editor de fotos', 'Um jogo de corrida'], 1, 'O compilador recebe um programa como entrada e produz outro: metaprogramação.'],
    faca: 'Escreva, em português, as regras de um “tradutor” que transforma comandos como “ande 3” em “frente, frente, frente”. Você acabou de projetar um pequeno compilador.'
  },
  EM13CO05: {
    t: 'O que a computação não consegue fazer',
    ideia: 'Há problemas que nenhum computador resolve, outros que levariam tempo demais, e outros em que a decisão precisa ser humana.',
    texto: [
      'Alan Turing provou que não existe programa capaz de dizer, para qualquer outro programa, se ele vai parar ou rodar para sempre (o <b>problema da parada</b>). Há limites lógicos para a computação.',
      'Outros problemas têm solução, mas tão cara que é <b>intratável</b>: testar todas as rotas entre 50 cidades levaria mais que a idade do universo. E há decisões éticas que não devem ser automatizadas. A mente humana também tem limites: memória, atenção e vieses.'
    ],
    fig: { tipo: 'grupos', grupos: [['Fácil de automatizar', '🤖', ['Somar notas', 'Ordenar nomes', 'Buscar uma palavra']], ['Difícil ou caro', '⏳', ['Melhor rota entre 50 cidades', 'Quebrar criptografia forte']], ['Impossível ou não deve', '🚫', ['Prever se todo programa termina', 'Decidir sozinho uma sentença judicial']]], leg: 'Problemas organizados pelo quanto podem (ou devem) ser automatizados.' },
    ex: 'Aplicativos de entrega usam rotas “boas o bastante” (aproximações), porque a rota perfeita custaria tempo demais.',
    pal: [['Problema indecidível', 'nenhum algoritmo resolve para todos os casos.'], ['Intratável', 'tem solução, mas o custo cresce rápido demais.']],
    q: ['Por que apps de rota usam soluções aproximadas?', ['Porque são preguiçosos', 'Porque achar a rota perfeita pode levar tempo demais', 'Porque o GPS não funciona', 'Porque é proibido'], 1, 'Para muitos pontos, a busca exata é intratável; uma boa aproximação resolve na prática.'],
    faca: 'Liste três tarefas da sua rotina e classifique: pode ser automatizada? Deveria? Justifique cada resposta.'
  },
  EM13CO06: {
    t: 'Avaliar a qualidade de um software',
    ideia: 'Um bom software não é só o que funciona: ele também é rápido, fácil de usar, seguro e fácil de manter.',
    texto: [
      'Para avaliar, use critérios: <b>correção</b> (dá o resultado certo?), <b>desempenho</b> (é rápido, gasta pouca bateria?), <b>usabilidade</b> (é fácil de aprender?), <b>segurança</b> (protege os dados?) e <b>manutenção</b> (é fácil de corrigir e melhorar?).',
      'Cada critério pode ter uma <b>métrica</b>: tempo para abrir, número de toques para concluir uma tarefa, quantidade de erros encontrados em testes. Medir transforma opinião em evidência.'
    ],
    fig: { tipo: 'tabela', cab: ['Critério', 'Pergunta', 'Métrica possível'], linhas: [['Correção', 'Faz o que promete?', '% de testes que passam'], ['Desempenho', 'É rápido?', 'Segundos para abrir'], ['Usabilidade', 'É fácil?', 'Toques para concluir a tarefa'], ['Segurança', 'Protege dados?', 'Tem duas etapas? Usa HTTPS?'], ['Manutenção', 'É fácil mudar?', 'Tempo para corrigir um bug']], leg: 'Critérios e métricas para avaliar um software.' },
    ex: 'Comparar dois apps de anotações: um abre em 1 s e tem backup; o outro abre em 5 s e perde as notas se o celular reinicia.',
    pal: [['Métrica', 'medida que permite comparar.'], ['Usabilidade', 'facilidade de uso.']],
    q: ['“O app precisa de 9 toques para enviar uma foto.” Esse dado mede principalmente…', ['Segurança', 'Usabilidade', 'Correção', 'Manutenção'], 1, 'Quantos passos o usuário precisa dar mede a facilidade de uso.'],
    faca: 'Escolha dois aplicativos parecidos (de mensagens, de música…). Dê nota de 1 a 5 em cada critério da tabela e diga qual você recomendaria e por quê.'
  },
  EM13CO07: {
    t: 'Redes de computadores em grande escala',
    ideia: 'Redes usam equipamentos, protocolos e serviços organizados em camadas para atender milhões de pessoas sem cair.',
    texto: [
      'Equipamentos como <b>switches</b> (ligam aparelhos na mesma rede), <b>roteadores</b> (ligam redes diferentes) e pontos de acesso Wi-Fi formam a estrutura física. Os protocolos (IP, TCP, DNS, HTTP) cuidam de cada camada da comunicação.',
      'Para ter <b>escala</b> e <b>confiabilidade</b>, as redes usam caminhos redundantes (se um cabo cai, o tráfego desvia), vários servidores dividindo a carga e cópias do conteúdo perto dos usuários (CDN).'
    ],
    fig: { tipo: 'grafo', nos: [['Você', 40, 100], ['Roteador A', 150, 40], ['Roteador B', 150, 160], ['Roteador C', 270, 100], ['Servidor', 370, 100]], arestas: [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2], [3, 4]], leg: 'Caminhos redundantes: se o Roteador A falhar, os pacotes passam pelo B.' },
    ex: 'Na final de um campeonato, milhões assistem pela internet ao mesmo tempo porque o vídeo vem de servidores espalhados por várias cidades.',
    pal: [['Redundância', 'ter caminhos ou equipamentos de reserva.'], ['Escala', 'atender muito mais usuários sem perder qualidade.'], ['CDN', 'rede de servidores com cópias do conteúdo perto do usuário.']],
    q: ['Por que redes usam caminhos redundantes?', ['Para gastar mais cabo', 'Para que a comunicação continue se um caminho falhar', 'Para deixar o sinal mais fraco', 'Por estética'], 1, 'A redundância garante confiabilidade quando há falhas.'],
    faca: 'Desenhe a rede da sua escola ou casa: aparelhos, roteador, provedor. Marque onde uma falha deixaria todo mundo sem internet e proponha uma redundância.'
  },
  EM13CO08: {
    t: 'Novas tecnologias, novos riscos',
    ideia: 'Cada mudança tecnológica traz riscos novos à segurança e à privacidade. Reconhecer, se proteger, denunciar e pedir ajuda faz parte da vida digital.',
    texto: [
      '<b>Deepfakes</b> imitam rostos e vozes, golpes usam IA para escrever mensagens convincentes, aparelhos conectados coletam dados o tempo todo. Riscos antigos ganham novas formas.',
      'Diante de um problema (vazamento de foto, golpe, ameaça), guarde provas, <b>denuncie</b> na plataforma e em canais oficiais (como a SaferNet ou a delegacia de crimes cibernéticos) e <b>busque ajuda</b> de alguém de confiança. Não é culpa de quem foi vítima.'
    ],
    fig: { tipo: 'compara', lados: [['⚠️ Riscos novos', ['Áudio falso imitando um parente pedindo Pix', 'Deepfake com o rosto de colegas', 'Assistente de voz gravando conversas']], ['🛟 O que fazer', ['Confirmar por outro canal (ligar de volta)', 'Guardar provas e denunciar', 'Rever permissões e configurações', 'Conversar com um adulto ou com a SaferNet']]], leg: 'Riscos que surgem com novas tecnologias e como reagir.' },
    ex: 'Um áudio com a voz da tia pede dinheiro urgente. Antes de qualquer Pix, ligue para ela no número que você já tem.',
    pal: [['Deepfake', 'vídeo ou áudio falso criado com IA.'], ['Denúncia', 'comunicar o problema a quem pode agir.']],
    q: ['Você recebe um vídeo falso (deepfake) de um colega. O que fazer?', ['Compartilhar para ver se é verdade', 'Não compartilhar, avisar o colega, guardar prova e denunciar', 'Comentar rindo', 'Apagar e esquecer'], 1, 'Interromper a circulação, apoiar a vítima e denunciar são os passos certos.'],
    faca: 'Pesquise um golpe ou risco digital que surgiu nos últimos dois anos. Explique em 5 linhas como ele funciona e como se proteger.'
  },
  EM13CO09: {
    t: 'Tecnologia e o mundo do trabalho',
    ideia: 'Quase toda profissão usa tecnologia digital, e a Computação abre carreiras que nem existiam há 20 anos.',
    texto: [
      'Agricultores usam drones e sensores, médicos usam exames por imagem com IA, advogados usam sistemas de processos. Saber usar e entender tecnologia virou parte de quase todo trabalho.',
      'Há também carreiras da própria Computação: <b>desenvolvimento</b> de software, <b>ciência de dados</b>, <b>segurança da informação</b>, <b>UX</b> (experiência do usuário), redes, robótica. Muitas aceitam caminhos variados: curso técnico, graduação, cursos livres.'
    ],
    fig: { tipo: 'grupos', grupos: [['Profissões que usam tecnologia', '🧑‍🌾', ['Agricultura de precisão', 'Saúde e diagnóstico', 'Comércio on-line']], ['Carreiras da Computação', '👩‍💻', ['Desenvolvimento', 'Ciência de dados', 'Segurança', 'UX design', 'Redes']], ['Habilidades que valem em todas', '🧠', ['Resolver problemas', 'Trabalhar em equipe', 'Aprender sempre']]], leg: 'A tecnologia no mundo do trabalho.' },
    ex: 'Uma técnica de enfermagem usa um tablet para registrar a medicação de cada paciente no prontuário eletrônico.',
    pal: [['Carreira', 'caminho profissional ao longo da vida.'], ['Transformação digital', 'mudança no trabalho causada pela tecnologia.']],
    q: ['Qual afirmação é verdadeira?', ['Só programadores usam tecnologia no trabalho', 'Muitas profissões usam tecnologia digital no dia a dia', 'A tecnologia não muda profissões', 'Para trabalhar com Computação só existe um caminho'], 1, 'A tecnologia está presente em quase todas as áreas profissionais.'],
    faca: 'Entreviste um adulto sobre o trabalho dele: que tecnologias usa, o que mudou nos últimos anos e o que gostaria de saber fazer melhor.'
  },
  EM13CO10: {
    t: 'Inteligência artificial: o que é e o que não é',
    ideia: 'A inteligência artificial aprende padrões a partir de muitos exemplos. Ela é poderosa, mas não pensa como uma pessoa, erra e pode reproduzir preconceitos.',
    texto: [
      'Em vez de receber regras escritas, um sistema de <b>aprendizado de máquina</b> vê milhares de exemplos (fotos de gatos e de cachorros, por exemplo) e ajusta seus números internos até acertar. Isso é o <b>treinamento</b>.',
      'Chatbots como os assistentes de IA preveem a próxima palavra mais provável. Eles podem inventar fatos (<b>alucinação</b>), não entendem o mundo como nós e repetem os <b>vieses</b> dos dados de treino. Use como ajudante, conferindo sempre.'
    ],
    fig: { tipo: 'fluxo', passos: [['🗂️', 'Muitos exemplos com resposta (dados)'], ['🔁', 'Treinamento: ajusta, erra, ajusta de novo'], ['🧩', 'Modelo'], ['❓', 'Exemplo novo'], ['🎯', 'Previsão (pode errar!)']], leg: 'Como um modelo de IA aprende e faz previsões.' },
    ex: 'Um filtro de spam aprendeu com milhões de e-mails marcados como spam ou não, e às vezes manda um e-mail importante para o lixo.',
    pal: [['Treinamento', 'fase em que o modelo aprende com exemplos.'], ['Alucinação', 'quando a IA inventa uma resposta que parece certa.'], ['Viés', 'erro sistemático herdado dos dados.']],
    q: ['Um chatbot deu uma referência de livro que não existe. Isso é chamado de…', ['Treinamento', 'Alucinação', 'Compilação', 'Criptografia'], 1, 'A IA gerou algo plausível, mas falso: alucinação.'],
    faca: 'Faça a mesma pergunta factual a um assistente de IA e a um site confiável. Compare as respostas e anote onde a IA acertou e onde errou.'
  },
  EM13CO11: {
    t: 'Modelos e simulações',
    ideia: 'Um modelo computacional é uma versão simplificada da realidade que roda no computador para testar “e se…?” e fazer previsões.',
    texto: [
      'Para simular a propagação de uma gripe, o modelo pode ter regras simples: cada doente contagia 2 pessoas por dia, e cada um sara depois de 5 dias. O computador aplica as regras muitas vezes e mostra o que acontece.',
      'Cientistas usam <b>simulações</b> para prever o clima, testar remédios e planejar cidades. Todo modelo simplifica, então é preciso comparar com dados reais e saber o que ficou de fora.'
    ],
    fig: { tipo: 'tabela', cab: ['Dia', '1', '2', '3', '4'], linhas: [['Doentes (cada um passa para 2)', '1', '3', '9', '27'], ['Com máscara (passa para 1)', '1', '2', '4', '8']], leg: 'Uma simulação simples: mudar uma regra muda muito a previsão.' },
    ex: 'A previsão do tempo é uma simulação: o computador aplica regras da física aos dados de hoje para estimar amanhã.',
    pal: [['Modelo', 'representação simplificada da realidade.'], ['Simulação', 'executar o modelo para ver o que acontece.'], ['Variável', 'valor que muda e que você pode testar.']],
    q: ['Por que comparar uma simulação com dados reais?', ['Para deixá-la mais bonita', 'Para ver se o modelo representa bem a realidade', 'Porque o computador pede', 'Não é necessário'], 1, 'A comparação mostra se as simplificações do modelo funcionam.'],
    faca: 'Monte numa planilha a simulação da tabela acima. Mude o número de pessoas contagiadas por dia e descreva o que acontece no dia 10.'
  },
  EM13CO12: {
    t: 'Ciência de dados: perguntas respondidas com dados',
    ideia: 'Ciência de dados é transformar dados brutos em respostas: coletar, limpar, analisar, mostrar e compartilhar com responsabilidade.',
    texto: [
      'Tudo começa com uma <b>pergunta</b> (“os estudantes dormem o suficiente?”). Depois vem a <b>coleta</b> (um formulário), a <b>limpeza</b> (tirar respostas repetidas ou absurdas), a <b>análise</b> (médias, comparações) e a <b>visualização</b> (gráficos).',
      'Na hora de <b>compartilhar</b>, mostre de onde vieram os dados, quantas pessoas responderam e os limites da pesquisa. E proteja a privacidade: nada de nomes ligados a respostas.'
    ],
    fig: { tipo: 'fluxo', passos: [['❓', 'Pergunta'], ['📋', 'Coleta'], ['🧹', 'Limpeza'], ['📈', 'Análise e gráfico'], ['📣', 'Conclusão com limites']], leg: 'O caminho de um projeto de ciência de dados.' },
    ex: 'A turma pesquisou o tempo de tela de 120 estudantes, descobriu que o 9º ano dorme 1 hora a menos e levou o resultado para a reunião de pais.',
    pal: [['Dado bruto', 'dado como foi coletado, sem tratamento.'], ['Limpeza de dados', 'corrigir ou remover dados com problemas.'], ['Amostra', 'o grupo que respondeu a pesquisa.']],
    q: ['Na pesquisa, alguém respondeu que dorme 30 horas por dia. O que fazer?', ['Usar na média', 'Remover na limpeza de dados, porque é impossível', 'Dobrar o valor', 'Publicar o nome da pessoa'], 1, 'Valores impossíveis devem ser tratados na etapa de limpeza.'],
    faca: 'Crie um formulário com 3 perguntas para a turma, colete as respostas, faça um gráfico e escreva uma conclusão dizendo quantas pessoas responderam.'
  },
  EM13CO13: {
    t: 'Tabelas, bancos de dados e gráficos',
    ideia: 'Os mesmos dados podem ser guardados em tabelas, consultados em bancos de dados e mostrados em gráficos. Cada forma serve para um objetivo.',
    texto: [
      'Uma <b>tabela</b> organiza dados em linhas (registros) e colunas (campos). Um <b>banco de dados</b> guarda muitas tabelas e permite <b>consultas</b>: “mostre os estudantes do 1º ano com nota maior que 8”.',
      'Um <b>gráfico</b> mostra padrões de uma vez: barras para comparar, linhas para ver mudanças no tempo, pizza para partes de um todo. Escolher o gráfico errado (ou cortar o eixo) pode enganar quem lê.'
    ],
    fig: { tipo: 'codigo', linhas: ['SELECIONE nome, nota', 'DA TABELA estudantes', 'ONDE serie = 1 E nota > 8', 'ORDENE POR nota', '', '→  Bia  8,5', '   Davi 9,0', '   Lia  9,5'], leg: 'Uma consulta a um banco de dados, escrita em português no estilo da linguagem SQL.' },
    ex: 'Numa feira de ciências, a turma guardou as medições numa planilha, filtrou os dias de chuva e fez um gráfico de linha da temperatura.',
    pal: [['Banco de dados', 'sistema que guarda e organiza muitos dados.'], ['Consulta', 'pergunta feita ao banco de dados.'], ['Filtro', 'mostrar só os registros que atendem a uma condição.']],
    q: ['Para mostrar como a temperatura mudou ao longo do mês, qual gráfico é mais adequado?', ['Pizza', 'Linha', 'Nenhum', 'Tabela de nomes'], 1, 'Gráficos de linha mostram mudanças ao longo do tempo.'],
    faca: 'Monte uma planilha com 10 filmes (nome, ano, nota). Use um filtro para mostrar só os com nota acima de 7 e faça um gráfico de barras.'
  },
  EM13CO14: {
    t: 'Confiabilidade da informação digital',
    ideia: 'Para confiar numa informação, analise quem produziu, como está estruturada, para que foi feita e em que contexto apareceu.',
    texto: [
      '<b>Autoria</b>: quem assina? Tem formação ou experiência no assunto? <b>Estrutura</b>: cita fontes, mostra dados, separa fato de opinião? <b>Propósito</b>: informar, vender, convencer, fazer rir? <b>Contexto</b>: quando e onde foi publicada, e se foi recortada.',
      'Técnicas como a <b>leitura lateral</b> (abrir outras abas para pesquisar sobre a fonte, em vez de ficar só nela) são usadas por checadores profissionais e funcionam melhor do que analisar só a aparência do site.'
    ],
    fig: { tipo: 'grupos', grupos: [['Autoria', '✍️', ['Quem escreveu?', 'É especialista?']], ['Estrutura', '🧱', ['Cita fontes?', 'Fato ou opinião?']], ['Propósito', '🎯', ['Informar? Vender? Convencer?']], ['Contexto', '🕰️', ['Data e lugar', 'Foi recortado?']]], leg: 'Quatro lentes para avaliar a confiabilidade de uma informação.' },
    ex: 'Um vídeo curto mostra um político dizendo algo chocante. O vídeo completo mostra que ele estava citando outra pessoa: o recorte mudou o sentido.',
    pal: [['Leitura lateral', 'pesquisar sobre a fonte em outras abas.'], ['Contexto', 'circunstâncias em que a informação foi produzida.']],
    q: ['O que é leitura lateral?', ['Ler o texto de lado', 'Abrir outras fontes para checar quem é o autor ou o site', 'Ler só o título', 'Ler rápido'], 1, 'Sair da página e pesquisar sobre a fonte é a leitura lateral.'],
    faca: 'Escolha uma notícia que circulou nas redes esta semana. Analise as quatro lentes (autoria, estrutura, propósito, contexto) e dê um veredito.'
  },
  EM13CO15: {
    t: 'Interação entre pessoas e computadores',
    ideia: 'Um bom sistema é pensado para as pessoas: fácil de usar, agradável e acessível para todo mundo, inclusive pessoas com deficiência.',
    texto: [
      'A <b>experiência do usuário (UX)</b> é como a pessoa se sente usando um sistema: entende o que fazer? Erra pouco? Consegue desfazer? A <b>usabilidade</b> mede essa facilidade.',
      '<b>Acessibilidade</b> é garantir o uso por todos: textos alternativos em imagens para leitores de tela, contraste de cores, legendas em vídeos, botões grandes, navegação pelo teclado. O que é essencial para uns é melhor para todos.'
    ],
    fig: { tipo: 'compara', lados: [['😕 Difícil', ['Botão pequeno e sem nome', 'Texto cinza claro no fundo branco', 'Vídeo sem legenda', 'Erro sem explicação']], ['😊 Acessível', ['Botão grande com rótulo claro', 'Contraste forte', 'Legenda e transcrição', 'Mensagem de erro que diz como resolver']]], leg: 'Pequenas escolhas de design mudam quem consegue usar o sistema.' },
    ex: 'Uma pessoa cega usa o celular com leitor de tela; se a foto do post não tem descrição, ela não sabe o que tem na imagem.',
    pal: [['UX', 'experiência do usuário.'], ['Acessibilidade', 'possibilidade de uso por todas as pessoas.'], ['Leitor de tela', 'programa que lê em voz alta o que está na tela.']],
    q: ['Qual atitude torna um post mais acessível?', ['Usar só emojis', 'Colocar descrição (texto alternativo) na imagem', 'Escrever com letra pequena', 'Usar cores parecidas'], 1, 'A descrição permite que leitores de tela expliquem a imagem.'],
    faca: 'Teste um site ou app só com o teclado (sem mouse) ou com o leitor de tela do celular. Anote três problemas e proponha uma melhoria para cada.'
  },
  EM13CO16: {
    t: 'Robótica: sensores, programação e atuadores',
    ideia: 'Um robô percebe o mundo com sensores, decide com um programa e age com atuadores, num ciclo que se repete o tempo todo.',
    texto: [
      '<b>Sensores</b> medem o ambiente: distância, luz, temperatura, toque. O <b>programa</b> (num microcontrolador como o Arduino) lê esses valores e decide o que fazer. <b>Atuadores</b> executam: motores, LEDs, alto-falantes.',
      'Esse ciclo <b>sentir → decidir → agir</b> roda muitas vezes por segundo. Dá para começar com simuladores on-line, sem comprar peças, e depois montar com kits ou sucata.'
    ],
    fig: { tipo: 'fluxo', passos: [['👁️', 'Sensor: obstáculo a 10 cm'], ['🧠', 'Programa: se distância < 15, desviar'], ['⚙️', 'Atuador: motor vira à direita']], volta: 'Repete várias vezes por segundo', leg: 'O ciclo de controle de um robô que desvia de obstáculos.' },
    ex: 'Um aspirador robô usa sensores de batida e de queda para não cair da escada.',
    pal: [['Sensor', 'peça que mede algo do ambiente.'], ['Atuador', 'peça que faz o robô agir.'], ['Microcontrolador', 'pequeno computador que roda o programa do robô.']],
    q: ['Num robô seguidor de linha, o que é o sensor de luz?', ['Um atuador', 'Um sensor que detecta a linha escura', 'O programa', 'A bateria'], 1, 'Ele mede a luz refletida para saber se está sobre a linha.'],
    faca: 'Num simulador on-line de Arduino, programe um LED que acende quando um sensor de luz detecta escuridão. Descreva o ciclo sentir, decidir, agir.'
  },
  EM13CO17: {
    t: 'Colaborar on-line com segurança',
    ideia: 'Ferramentas de colaboração permitem criar juntos à distância. Para dar certo, combine regras, proteja o acesso e respeite a lei e as pessoas.',
    texto: [
      'Documentos compartilhados, repositórios de código, fóruns e quadros virtuais permitem que muitas pessoas trabalhem no mesmo projeto. O <b>histórico de versões</b> mostra quem fez o quê e permite voltar atrás.',
      'Para colaborar com segurança: defina <b>permissões</b> (quem edita, quem só vê), não compartilhe links com dados pessoais publicamente, dê créditos às contribuições e siga regras de convivência e a <b>LGPD</b>.'
    ],
    fig: { tipo: 'tabela', cab: ['Permissão', 'Pode', 'Use para'], linhas: [['Leitor', 'Ver', 'Público em geral'], ['Comentador', 'Ver e sugerir', 'Professores e revisores'], ['Editor', 'Mudar tudo', 'Só a equipe']], leg: 'Níveis de permissão num documento compartilhado.' },
    ex: 'A equipe do jornal da escola escreve num documento compartilhado; só os editores mudam o texto e o restante da turma comenta.',
    pal: [['Permissão', 'o que cada pessoa pode fazer no material.'], ['Histórico de versões', 'registro das mudanças ao longo do tempo.']],
    q: ['Uma planilha com telefones da turma foi compartilhada com “qualquer pessoa com o link pode editar”. Qual o problema?', ['Nenhum', 'Dados pessoais expostos e qualquer um pode alterar', 'A planilha fica lenta', 'As cores mudam'], 1, 'Dados pessoais exigem acesso restrito, e edição aberta permite estragos.'],
    faca: 'Crie com colegas um documento compartilhado para um projeto. Definam permissões, escrevam três regras de convivência e usem o histórico de versões para ver a contribuição de cada um.'
  },
  EM13CO18: {
    t: 'Planejar e gerenciar projetos',
    ideia: 'Projetos com tecnologia dão certo quando o grupo divide tarefas, define prazos e acompanha o andamento, ajustando o plano quando preciso.',
    texto: [
      'Comece pelo <b>escopo</b>: o que o projeto vai entregar (e o que não vai). Depois quebre em <b>tarefas</b>, estime o tempo e distribua entre as pessoas.',
      'Um <b>quadro kanban</b> (A fazer, Fazendo, Feito) mostra o andamento para todos. Reuniões curtas ajudam a resolver bloqueios. Métodos ágeis entregam em ciclos curtos e melhoram a cada ciclo.'
    ],
    fig: { tipo: 'tabela', cab: ['A fazer', 'Fazendo', 'Feito'], linhas: [['Gravar o vídeo', 'Programar o quiz', 'Definir o tema'], ['Testar com a turma', 'Fazer as imagens', 'Dividir as tarefas']], leg: 'Um quadro kanban de um projeto: cada cartão anda da esquerda para a direita.' },
    ex: 'A turma organizou a feira de ciências num quadro kanban on-line, com cada estande como um cartão.',
    pal: [['Escopo', 'o que o projeto vai e não vai entregar.'], ['Kanban', 'quadro para acompanhar as tarefas.'], ['Ágil', 'jeito de trabalhar em ciclos curtos com entregas frequentes.']],
    q: ['Para que serve um quadro kanban?', ['Para enfeitar a sala', 'Para todos verem o andamento das tarefas', 'Para guardar senhas', 'Para programar robôs'], 1, 'O quadro mostra o que está a fazer, em andamento e pronto.'],
    faca: 'Monte um quadro kanban (papel ou on-line) para um trabalho em grupo real. Atualize durante uma semana e conte o que mudou no plano.'
  },
  EM13CO19: {
    t: 'Apresentar e defender ideias com mídias digitais',
    ideia: 'Uma boa apresentação digital tem uma mensagem clara, apoio visual simples e argumentos preparados para perguntas e negociação.',
    texto: [
      'Comece pela mensagem principal em uma frase. Os <b>slides</b> apoiam, não substituem a fala: pouco texto, imagens e gráficos que provam o que você diz.',
      'Para <b>defender e negociar</b>, conheça o público, antecipe objeções (“quanto custa?”, “por que funciona?”) e tenha dados para responder. Ensaie e controle o tempo.'
    ],
    fig: { tipo: 'compara', lados: [['😴 Slide que cansa', ['Parágrafos inteiros', '10 cores e 5 fontes', 'Ler o slide em voz alta', 'Nenhum dado']], ['💡 Slide que convence', ['Uma ideia por slide', 'Imagem ou gráfico forte', 'Fala complementa a tela', 'Número que prova o ponto']]], leg: 'Diferença entre slides que cansam e slides que convencem.' },
    ex: 'Um pitch de 3 minutos para a direção aprovar uma horta automatizada: problema, solução, custo, benefício, pedido.',
    pal: [['Pitch', 'apresentação curta para convencer.'], ['Objeção', 'dúvida ou crítica do público.']],
    q: ['Qual é a melhor prática em slides?', ['Colocar todo o texto da fala', 'Uma ideia por slide com apoio visual', 'Usar muitas animações', 'Ler o slide de costas para o público'], 1, 'Slides limpos ajudam o público a acompanhar a ideia principal.'],
    faca: 'Prepare um pitch de 2 minutos com no máximo 5 slides para propor uma melhoria na escola. Liste duas objeções prováveis e suas respostas.'
  },
  EM13CO20: {
    t: 'Publicar on-line com responsabilidade',
    ideia: 'Ao publicar, você vira autor: o conteúdo precisa ser confiável, e as consequências da divulgação são suas também.',
    texto: [
      'Antes de publicar, <b>verifique</b> as informações, cite as fontes, peça autorização a quem aparece e pense no público que vai ver.',
      'Uma publicação pode viralizar, ser copiada e ficar para sempre (<b>pegada digital</b>). Ela pode afetar sua reputação, a de outras pessoas e até ter consequências legais, como em casos de difamação.'
    ],
    fig: { tipo: 'fluxo', passos: [['🔎', 'Informação conferida?'], ['📚', 'Fontes citadas?'], ['🙋', 'Quem aparece autorizou?'], ['🧭', 'O que pode acontecer se viralizar?'], ['🚀', 'Publicar']], leg: 'Um checklist antes de apertar “publicar”.' },
    ex: 'Uma estudante escreveu um post no blog da escola sobre a qualidade da água do rio, citando os dados da análise e as fotos com autorização.',
    pal: [['Pegada digital', 'o rastro que suas publicações deixam.'], ['Difamação', 'espalhar algo que prejudica a reputação de alguém.']],
    q: ['O que verificar antes de publicar a foto de um evento da escola?', ['Só o filtro', 'Se as pessoas que aparecem autorizaram', 'Quantas curtidas vai ter', 'Nada'], 1, 'Publicar imagem de alguém exige autorização.'],
    faca: 'Escreva um post curto sobre um assunto da sua cidade, com duas fontes citadas, e passe pelo checklist da figura antes de mostrar à turma.'
  },
  EM13CO21: {
    t: 'Explicar ideias complexas com mapas e infográficos',
    ideia: 'Mapas conceituais, infográficos e hipertextos organizam ideias complicadas de um jeito que dá para entender de relance.',
    texto: [
      'Um <b>mapa conceitual</b> liga conceitos com setas e palavras de ligação (“fotossíntese <i>produz</i> oxigênio”). Um <b>infográfico</b> junta texto curto, números e imagens. Um <b>hipertexto</b> usa links para o leitor escolher o caminho.',
      'Para criar, escolha a ideia central, selecione só o essencial, organize a hierarquia (o que vem primeiro) e teste com alguém que não conhece o assunto.'
    ],
    fig: { tipo: 'grafo', dir: true, nos: [['Computação', 200, 30], ['Pensamento computacional', 70, 120], ['Mundo digital', 200, 120], ['Cultura digital', 330, 120], ['Algoritmos', 70, 190], ['Redes', 200, 190], ['Ética', 330, 190]], arestas: [[0, 1, 'tem'], [0, 2, 'tem'], [0, 3, 'tem'], [1, 4, 'usa'], [2, 5, 'estuda'], [3, 6, 'discute']], leg: 'Um mapa conceitual: conceitos ligados por setas com palavras de ligação.' },
    ex: 'Um infográfico mostrando quanto de água se gasta para produzir um celular, com ícones e três números grandes.',
    pal: [['Mapa conceitual', 'diagrama de conceitos ligados por relações.'], ['Infográfico', 'informação explicada com imagens e pouco texto.'], ['Hipertexto', 'texto com links que levam a outros textos.']],
    q: ['Num mapa conceitual, o que vai escrito sobre a seta?', ['Nada', 'Uma palavra de ligação que explica a relação', 'O nome do autor', 'Um número de página'], 1, 'A palavra de ligação transforma a seta numa frase: “A produz B”.'],
    faca: 'Faça um mapa conceitual com pelo menos 8 conceitos sobre um tema de outra matéria que você está estudando agora.'
  },
  EM13CO22: {
    t: 'Produzir e publicar multimídia',
    ideia: 'Textos, imagens, áudios e vídeos podem ser combinados em uma produção única, usando ferramentas que integram e organizam as mídias.',
    texto: [
      'Uma produção <b>multimídia</b> une linguagens: um vídeo com narração, legenda e gráficos; um site com texto, fotos e podcast. Cada mídia precisa de cuidado: áudio limpo, imagem nítida, texto revisado.',
      'Organize os arquivos em pastas, nomeie bem, use formatos adequados (e tamanhos menores para a web) e guarde a <b>versão editável</b> além da final. Na publicação, coloque legendas e descrições para acessibilidade.'
    ],
    fig: { tipo: 'grupos', grupos: [['Texto', '📝', ['roteiro.docx', 'legendas.srt']], ['Imagem', '🖼️', ['capa.png', 'grafico.svg']], ['Áudio', '🎧', ['narracao.mp3', 'trilha-cc.mp3']], ['Vídeo', '🎬', ['cena1.mp4', 'final.mp4']]], leg: 'Os arquivos de um projeto multimídia organizados por tipo de mídia.' },
    ex: 'Um minidocumentário sobre o bairro com entrevistas, fotos antigas, trilha com licença livre e legendas.',
    pal: [['Multimídia', 'produção que combina várias mídias.'], ['Formato', 'tipo do arquivo, como .mp3, .png, .mp4.'], ['Versão editável', 'arquivo do projeto que ainda pode ser alterado.']],
    q: ['Por que guardar a versão editável do vídeo?', ['Para ocupar espaço', 'Para conseguir corrigir e atualizar depois', 'Porque é obrigatório', 'Não precisa'], 1, 'Sem o projeto editável, qualquer correção exige refazer tudo.'],
    faca: 'Produza um vídeo de até 1 minuto que una narração, imagem e legenda sobre algo que você aprendeu esta semana.'
  },
  EM13CO23: {
    t: 'Comunidades virtuais',
    ideia: 'Comunidades on-line reúnem pessoas por interesses e criam laços reais, mas também podem isolar, radicalizar ou excluir.',
    texto: [
      'Fóruns, servidores de jogos, grupos e fãs-clubes criam pertencimento: pessoas que se ajudam, aprendem juntas e se mobilizam por causas. Muitas têm regras e moderação.',
      'Ao mesmo tempo, algoritmos e grupos fechados podem formar <b>câmaras de eco</b>, onde só uma opinião circula, e algumas comunidades estimulam ódio ou desafios perigosos. Analise: quem modera? Que regras existem? Como a comunidade trata quem discorda?'
    ],
    fig: { tipo: 'compara', lados: [['🌱 Comunidade saudável', ['Regras claras e moderação', 'Ajuda mútua', 'Aceita perguntas e discordâncias', 'Respeita a privacidade']], ['🚩 Sinais de alerta', ['Pede segredo dos pais', 'Ataca quem é de fora', 'Desafios perigosos', 'Só uma opinião é permitida']]], leg: 'Como avaliar uma comunidade virtual.' },
    ex: 'Um servidor de um jogo onde jogadores experientes ensinam novatos, com moderadores que removem ofensas.',
    pal: [['Comunidade virtual', 'grupo que se relaciona principalmente on-line.'], ['Câmara de eco', 'espaço onde só circulam opiniões iguais.'], ['Moderação', 'pessoas ou regras que cuidam da convivência.']],
    q: ['Qual é um sinal de alerta numa comunidade on-line?', ['Ter regras de convivência', 'Pedir para esconder a participação dos pais', 'Ter moderadores', 'Responder dúvidas'], 1, 'Pedido de segredo é um sinal clássico de risco.'],
    faca: 'Escolha uma comunidade on-line que você conhece. Analise regras, moderação e como lida com divergências, e escreva um parágrafo com sua avaliação.'
  },
  EM13CO24: {
    t: 'Tecnologia, saúde e bem-estar',
    ideia: 'Redes sociais e telas afetam o sono, o corpo e as emoções. Hábitos simples ajudam a usar a tecnologia sem que ela use você.',
    texto: [
      'Muitos apps são desenhados para prender a atenção: rolagem infinita, notificações, curtidas que geram expectativa. Isso pode atrapalhar o <b>sono</b>, a concentração e a autoestima (comparação com vidas “perfeitas”).',
      'O corpo também sente: postura, vista cansada, sedentarismo. Hábitos que ajudam: celular fora do quarto à noite, notificações desligadas, pausas a cada hora, ver o tempo de tela da semana e buscar ajuda se o uso estiver causando sofrimento.'
    ],
    fig: { tipo: 'compara', lados: [['😵 Efeitos', ['Dormir tarde rolando o feed', 'Ansiedade por curtidas', 'Dor no pescoço', 'Comparação constante']], ['🌿 Hábitos', ['Celular fora do quarto', 'Notificações só do essencial', 'Pausas e alongamento', 'Seguir perfis que fazem bem']]], leg: 'Efeitos do uso excessivo e hábitos para um uso saudável.' },
    ex: 'Ativar o modo descanso às 22h e deixar o celular carregando na sala.',
    pal: [['Design persuasivo', 'recursos criados para prender sua atenção.'], ['Tempo de tela', 'quanto tempo você passa usando aparelhos.']],
    q: ['Qual hábito ajuda a dormir melhor?', ['Rolar o feed na cama', 'Deixar o celular fora do quarto à noite', 'Deixar todas as notificações ligadas', 'Jogar até tarde'], 1, 'A luz e os estímulos do celular atrapalham o sono.'],
    faca: 'Veja seu tempo de tela da última semana. Escolha um hábito da figura, siga por 7 dias e compare os números.'
  },
  EM13CO25: {
    t: 'Conviver on-line com respeito e segurança',
    ideia: 'Dialogar on-line exige respeito à diversidade e coragem para reconhecer e denunciar atitudes abusivas.',
    texto: [
      'A internet junta pessoas de culturas, crenças, gêneros e origens diferentes. <b>Respeitar a diversidade</b> é discutir ideias sem atacar identidades. Discurso de ódio, racismo e LGBTfobia são crimes também on-line.',
      'Atitudes abusivas incluem assédio, ameaça, perseguição (<b>stalking</b>) e pressão para enviar fotos íntimas. Ao identificar: não alimente, guarde provas, bloqueie, denuncie à plataforma e a canais como a SaferNet, e conte com alguém de confiança.'
    ],
    fig: { tipo: 'fluxo', passos: [['👀', 'Reconhecer o abuso'], ['📸', 'Guardar provas'], ['🚫', 'Bloquear'], ['📢', 'Denunciar (plataforma, SaferNet, polícia)'], ['🤝', 'Buscar apoio']], leg: 'Como reagir a uma atitude abusiva on-line.' },
    ex: 'Num jogo on-line, um jogador começa a ofender uma colega por ser menina. O time pode denunciar, apoiar a colega e não normalizar.',
    pal: [['Diversidade', 'variedade de pessoas, culturas e identidades.'], ['Discurso de ódio', 'ataque a grupos por características como raça, gênero ou religião.'], ['Stalking', 'perseguição repetida.']],
    q: ['Alguém insiste para você enviar fotos íntimas. O que fazer?', ['Enviar para parar a insistência', 'Não enviar, guardar provas, bloquear e contar a alguém de confiança', 'Ignorar e continuar conversando', 'Mandar a foto de outra pessoa'], 1, 'É uma situação de abuso: proteja-se e busque ajuda.'],
    faca: 'Escreva as regras de convivência de um grupo on-line da turma, incluindo o que fazer quando alguém desrespeitar as regras.'
  },
  EM13CO26: {
    t: 'Seus direitos no mundo digital',
    ideia: 'Leis como a LGPD, o Marco Civil da Internet e a Lei de Direitos Autorais protegem você e definem deveres no uso da tecnologia.',
    texto: [
      'A <b>LGPD</b> (Lei Geral de Proteção de Dados) diz que empresas precisam de um motivo para coletar seus dados, devem protegê-los e você pode pedir para ver, corrigir ou apagar. Dados de menores de idade exigem cuidado especial.',
      'O <b>Marco Civil da Internet</b> garante liberdade de expressão, privacidade e neutralidade da rede. A <b>Lei de Direitos Autorais</b> protege criações. Conhecer essas leis ajuda a exigir seus direitos e a agir de forma correta com os dos outros.'
    ],
    fig: { tipo: 'tabela', cab: ['Lei', 'Protege', 'Na prática'], linhas: [['LGPD (13.709/2018)', 'Dados pessoais', 'Pedir a um app que apague seus dados'], ['Marco Civil (12.965/2014)', 'Privacidade e liberdade na rede', 'Conteúdo ilegal removido por ordem judicial'], ['Direitos Autorais (9.610/1998)', 'Criações', 'Não publicar música de outro como sua']], leg: 'Três leis brasileiras importantes no mundo digital.' },
    ex: 'Você pode pedir a uma loja on-line que diga quais dados seus ela guarda e que os apague se não houver motivo para mantê-los.',
    pal: [['LGPD', 'lei que protege dados pessoais no Brasil.'], ['Marco Civil', 'lei com direitos e deveres no uso da internet no Brasil.'], ['Titular dos dados', 'a pessoa a quem os dados se referem: você.']],
    q: ['Pela LGPD, o que você pode pedir a uma empresa que guarda seus dados?', ['Nada', 'Ver, corrigir ou pedir para apagar seus dados', 'Os dados de outras pessoas', 'Dinheiro pelo cadastro'], 1, 'O titular tem direito de acesso, correção e eliminação dos dados.'],
    faca: 'Escolha um app que você usa e encontre na política de privacidade: que dados ele coleta e como pedir a exclusão. Resuma em 5 linhas.'
  }
};
