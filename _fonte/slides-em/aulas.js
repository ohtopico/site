/* Conteúdo das 26 aulas expositivas de Computação no Ensino Médio (slides em PDF, 30 min cada).
   Cada aula: c = código, t = título (*palavra* = marca-texto), sub = subtítulo, q = pergunta de abertura,
   obj = 3 objetivos, s = 5 slides de explicação, atv = atividade, conf = 3 perguntas do Confira, resp = respostas,
   levar = 3 pontos, prox = próximo passo, rot = [abertura, explicação, atividade] do roteiro do professor.
   Tipos de slide de explicação: cards (2 a 4 caixas), texto, duas (duas colunas), lista, codigo.
   Use **negrito** nos textos. Autora: Júlia Roberta Quoos Alves. */
module.exports = [
  {
    c: 'EM13CO01', t: 'Não reinvente *a roda*', sub: 'Reaproveitar partes de soluções que já existem',
    q: 'Por que ninguém escreve do zero um aplicativo de mensagens?',
    obj: ['reconhecer partes de um problema que já têm solução pronta;', 'reaproveitar funções e bibliotecas em um programa novo;', 'avaliar se uma solução pronta serve para o seu caso.'],
    s: [
      { k: 'cards', t: 'Três ideias que *ajudam a reaproveitar*', cards: [['🧩', 'Decompor', 'quebrar o problema em partes menores'], ['🔁', 'Generalizar', 'perceber que uma parte se repete em outros problemas'], ['🎯', 'Abstrair', 'esconder os detalhes e usar só o que importa']] },
      { k: 'texto', t: 'Quem já *resolveu isso?*', p: ['Um app de entregas precisa de mapa, pagamento, login e notificações. Nenhuma empresa cria tudo isso do zero: usa **bibliotecas** e **serviços** prontos.', 'Programar bem é saber **juntar peças** confiáveis e escrever só o que é novo.'] },
      { k: 'codigo', t: 'Reúso em *Python*', code: 'import random\n\nnomes = ["Ana", "Bia", "Caio", "Davi", "Eli", "Fê"]\nrandom.shuffle(nomes)          # função pronta\ngrupos = [nomes[i:i+3] for i in range(0, len(nomes), 3)]\nprint(grupos)', nota: 'Duas linhas de código novo; o embaralhamento já existia.' },
      { k: 'duas', t: 'Antes de *reaproveitar*', a: ['Vale a pena', 'a solução é conhecida, testada, tem documentação e licença que permite o uso.'], b: ['Cuidado', 'código de origem duvidosa, sem manutenção, com licença proibida ou que você não entende.'] },
      { k: 'lista', t: 'Como reaproveitar *com critério*', itens: ['Descreva o problema com suas palavras.', 'Separe as partes: o que é novo e o que é comum?', 'Procure uma função, biblioteca ou exemplo para as partes comuns.', 'Teste a peça sozinha antes de encaixar.', 'Dê crédito e respeite a licença.'] }
    ],
    atv: { t: 'Atividade: *monte com peças*', min: 7, passos: ['Em duplas, escolham um problema: sorteador de grupos, calculadora de média ou quiz.', 'Listem as partes da solução.', 'Marquem quais partes já existem prontas (funções do Python, planilha, site).', 'Escrevam o que falta criar e apresentem em 1 minuto.'] },
    conf: ['O que é reaproveitar uma solução?', 'Cite uma função pronta do Python.', 'Dê um cuidado ao usar código de outra pessoa.'],
    resp: ['usar partes que já existem e funcionam em um problema novo.', 'print, len, sorted, random.shuffle, entre outras.', 'conferir a licença, dar crédito, testar e entender o que o código faz.'],
    levar: ['Decompor ajuda a achar partes que já têm solução.', 'Bibliotecas e funções prontas economizam tempo e erros.', 'Reaproveitar exige testar, entender e dar crédito.'],
    prox: 'Próximo passo: refinar uma solução em etapas, da ideia ao código (EM13CO02).',
    rot: ['Pergunte quantas pessoas criaram o WhatsApp do zero. Ouça hipóteses.', 'Decompor, generalizar e abstrair; exemplo do app de entregas; código do sorteador; critérios (slides 4 a 8).', 'Monte com peças; cada dupla apresenta em 1 minuto.']
  },
  {
    c: 'EM13CO02', t: 'Da ideia *ao código*', sub: 'Refinamentos sucessivos e níveis de abstração',
    q: 'Como explicar a alguém que nunca cozinhou como fazer um bolo?',
    obj: ['descrever uma solução em níveis, do geral ao detalhe;', 'refinar cada passo até ele virar instrução de computador;', 'relacionar níveis de abstração a funções.'],
    s: [
      { k: 'cards', t: 'Três *níveis* de uma solução', cards: [['1', 'O quê', '“organizar a festa da turma”'], ['2', 'Como', 'convidar, arrecadar, comprar, montar'], ['3', 'Detalhe', '“enviar mensagem no grupo até sexta às 18h”']], nota: 'Cada nível é uma **abstração** do nível de baixo.' },
      { k: 'texto', t: 'Refinamento *sucessivo*', p: ['Começamos pelo objetivo e vamos quebrando cada passo em passos menores, **um nível de cada vez**.', 'Paramos quando cada passo é simples o bastante para ser escrito em código, sem dúvida.'] },
      { k: 'lista', t: 'Exemplo: *calcular a média da turma*', itens: ['Ler as notas.', 'Somar as notas → **para cada nota, acumular na soma**.', 'Dividir pela quantidade → **len(notas)**.', 'Mostrar o resultado com uma casa decimal.'] },
      { k: 'codigo', t: 'Cada nível *vira função*', code: 'def ler_notas():\n    return [float(x) for x in input("Notas: ").split()]\n\ndef media(notas):\n    return sum(notas) / len(notas)\n\nnotas = ler_notas()\nprint(f"Média: {media(notas):.1f}")', nota: 'O programa principal lê como o nível 2; os detalhes ficam dentro das funções.' },
      { k: 'duas', t: 'Especificação *e implementação*', a: ['Especificação', 'o que o programa deve fazer: entradas, saídas e regras. Escrita em português.'], b: ['Implementação', 'como o programa faz: o código. Pode mudar sem mudar a especificação.'] }
    ],
    atv: { t: 'Atividade: *três níveis*', min: 7, passos: ['Em trios, escolham: cadastro na biblioteca, controle de presença ou placar de jogo.', 'Escrevam o nível 1 (uma frase) e o nível 2 (3 a 5 passos).', 'Refinem um dos passos até o nível 3, quase em código.', 'Troquem com outro trio e confiram se dá para seguir sem perguntar.'] },
    conf: ['O que é refinamento sucessivo?', 'Qual a diferença entre especificação e implementação?', 'Por que transformar um passo em função ajuda?'],
    resp: ['detalhar a solução aos poucos, um nível de cada vez.', 'especificação diz o que fazer; implementação é o código que faz.', 'esconde detalhes, deixa o programa legível e permite reaproveitar.'],
    levar: ['Comece pelo objetivo e desça um nível de cada vez.', 'Pare quando cada passo couber numa instrução clara.', 'Funções guardam os detalhes de cada nível.'],
    prox: 'Próximo passo: medir o custo de um algoritmo em tempo, memória e energia (EM13CO03).',
    rot: ['Peça a receita de bolo para quem nunca cozinhou. Mostre que precisa de vários níveis de detalhe.', 'Três níveis, refinamento, exemplo da média, funções, especificação x implementação (slides 4 a 8).', 'Três níveis em trios; troca entre trios.']
  },
  {
    c: 'EM13CO03', t: 'Quanto custa *um algoritmo?*', sub: 'Tempo, memória e energia',
    q: 'Achar um nome numa lista de 10 ou de 1 milhão leva o mesmo tempo?',
    obj: ['comparar algoritmos pelo número de passos;', 'perceber como o custo cresce quando a entrada cresce;', 'relacionar algoritmos a memória e consumo de energia.'],
    s: [
      { k: 'cards', t: 'Três *custos*', cards: [['⏱', 'Tempo', 'quantos passos o algoritmo executa'], ['🧠', 'Memória', 'quanto espaço ele ocupa enquanto roda'], ['⚡', 'Energia', 'quanta eletricidade gasta, do celular ao data center']] },
      { k: 'duas', t: 'Busca: *duas estratégias*', a: ['Busca linear', 'olha um por um. Com 1 milhão de nomes, até **1 milhão** de passos.'], b: ['Busca binária', 'lista ordenada, olha o meio e descarta metade. No máximo **20** passos.'] },
      { k: 'cards', t: 'Como o custo *cresce*', cards: [['log n', 'Logarítmico', 'busca binária: dobra a entrada, +1 passo'], ['n', 'Linear', 'busca linear: dobra a entrada, dobra o tempo'], ['n²', 'Quadrático', 'ordenação por bolha: dobra a entrada, 4× o tempo']] },
      { k: 'texto', t: 'Memória *também custa*', p: ['Para buscar rápido, às vezes guardamos a lista **ordenada** ou um **índice**. Ganhamos tempo, gastamos memória.', 'Escolher um algoritmo é escolher **o que trocar** por o quê.'] },
      { k: 'texto', t: 'Energia: *o custo invisível*', p: ['Cada operação gasta energia. Em escala, isso pesa: data centers consomem uma fatia crescente da eletricidade mundial e usam água para resfriar servidores.', 'Um algoritmo mais eficiente economiza **bateria** no celular e **energia** no planeta.'] }
    ],
    atv: { t: 'Atividade: *corrida da busca*', min: 7, passos: ['Em duplas, um embaralha 16 cartas numeradas, o outro ordena outras 16.', 'Sorteiem um número e procurem: linear na pilha embaralhada, binária na ordenada.', 'Contem os passos de cada busca. Repitam 3 vezes.', 'Calculem: e com 1.000 cartas?'] },
    conf: ['Cite os três custos de um algoritmo.', 'Por que a busca binária é mais rápida?', 'O que a ordenação por bolha tem de ruim com listas grandes?'],
    resp: ['tempo, memória e energia.', 'descarta metade da lista a cada passo, mas exige lista ordenada.', 'o tempo cresce com o quadrado do tamanho da lista.'],
    levar: ['Algoritmos diferentes podem ter custos muito diferentes.', 'O que importa é como o custo cresce com a entrada.', 'Eficiência economiza tempo, memória e energia.'],
    prox: 'Próximo passo: programas que recebem ou criam outros programas (EM13CO04).',
    rot: ['Pergunte quanto tempo leva achar um nome numa lista grande. Registre palpites.', 'Três custos, busca linear x binária, crescimento, memória, energia (slides 4 a 8).', 'Corrida da busca com cartas; comparar passos.']
  },
  {
    c: 'EM13CO04', t: 'Programas que *escrevem programas*', sub: 'Metaprogramação: compiladores, interpretadores e geradores de código',
    q: 'Quem traduz o código que você escreve para a linguagem do processador?',
    obj: ['explicar o que é um programa que recebe ou produz outro programa;', 'diferenciar compilador e interpretador;', 'reconhecer geradores de código, inclusive os de IA.'],
    s: [
      { k: 'texto', t: 'O que é *metaprogramação*', p: ['É quando um programa trata **outro programa como dado**: lê, analisa, transforma ou cria código.', 'Parece coisa de outro mundo, mas você usa todos os dias.'] },
      { k: 'duas', t: 'Compilador *e interpretador*', a: ['Compilador', 'traduz o programa inteiro antes de rodar e gera um executável. Ex.: C, Rust.'], b: ['Interpretador', 'lê e executa linha a linha enquanto roda. Ex.: Python, JavaScript no navegador.'] },
      { k: 'codigo', t: 'Um gerador *em Python*', code: 'perguntas = ["Capital do RS?", "2 + 2?"]\ncodigo = ""\nfor p in perguntas:\n    codigo += f\'input("{p} ")\\n\'\n\nprint(codigo)   # mostra o programa gerado\nexec(codigo)    # executa o programa gerado', nota: 'O programa monta o texto de outro programa e depois o executa.' },
      { k: 'cards', t: 'Onde *você já viu*', cards: [['🌐', 'Navegador', 'interpreta o JavaScript dos sites'], ['📊', 'Planilha', 'fórmulas são programas que a planilha executa'], ['🤖', 'IA', 'assistentes geram código a partir de texto']] },
      { k: 'texto', t: 'Código gerado *precisa de revisão*', p: ['Um gerador de código, inclusive uma IA, pode produzir algo que **parece certo e não funciona**, ou que tem falhas de segurança.', 'Quem usa continua responsável: **ler, testar e entender** o que foi gerado.'] }
    ],
    atv: { t: 'Atividade: *quem gera quem?*', min: 7, passos: ['Em duplas, recebam 6 situações (fórmula de planilha, site abrindo, app instalado, código feito por IA, macro do editor, tradução de Python).', 'Para cada uma, digam: qual programa recebe ou produz outro programa?', 'Classifiquem como compilação, interpretação ou geração.', 'Escolham uma e expliquem para a turma.'] },
    conf: ['O que é metaprogramação?', 'Qual a diferença entre compilador e interpretador?', 'Por que revisar código gerado por IA?'],
    resp: ['programa que lê, transforma ou cria outro programa.', 'compilador traduz tudo antes; interpretador executa linha a linha.', 'pode ter erros ou falhas de segurança, e quem usa é responsável.'],
    levar: ['Programas podem ser dados para outros programas.', 'Compiladores e interpretadores são metaprogramas.', 'Código gerado sempre precisa ser lido e testado.'],
    prox: 'Próximo passo: o que a computação consegue e o que não consegue resolver (EM13CO05).',
    rot: ['Pergunte como o Python entende o que escrevemos. Ouça hipóteses.', 'Definição, compilador x interpretador, gerador em Python, exemplos do dia a dia, revisão (slides 4 a 8).', 'Quem gera quem; cada dupla explica uma situação.']
  },
  {
    c: 'EM13CO05', t: 'Os limites *da computação*', sub: 'O que dá, o que não dá e o que não deve ser automatizado',
    q: 'Existe algum problema que nenhum computador do mundo consegue resolver?',
    obj: ['diferenciar problemas fáceis, difíceis e impossíveis de computar;', 'explicar a explosão de combinações;', 'reconhecer decisões que exigem julgamento humano.'],
    s: [
      { k: 'cards', t: 'Quatro *tipos* de problema', cards: [['✅', 'Rápido', 'ordenar uma lista, buscar um nome'], ['🐢', 'Inviável', 'possível, mas levaria séculos'], ['🚫', 'Impossível', 'nenhum algoritmo resolve sempre'], ['🧑‍⚖️', 'Humano', 'pede valores, ética, contexto']] },
      { k: 'texto', t: 'A *explosão* de combinações', p: ['Qual a menor rota que passa por 30 cidades? Há mais combinações do que átomos em muitos planetas.', 'Testar todas é **inviável**. Por isso usamos atalhos (heurísticas) que dão boas respostas, **não perfeitas**.'] },
      { k: 'texto', t: 'O problema *da parada*', p: ['Alan Turing provou em 1936: não existe um programa que diga, para **qualquer** programa, se ele vai terminar ou travar para sempre.', 'Alguns problemas são **impossíveis** de computar, não importa a velocidade do computador.'] },
      { k: 'duas', t: 'E a *mente humana?*', a: ['O computador vence', 'cálculos repetitivos, memória exata, milhões de dados por segundo.'], b: ['A pessoa vence', 'entender contexto, criar, ter empatia, decidir com valores. E também erra e se cansa.'] },
      { k: 'lista', t: 'Antes de *automatizar*, pergunte', itens: ['O problema tem regras claras?', 'Os erros podem prejudicar alguém?', 'Quem revisa a decisão da máquina?', 'A pessoa afetada pode contestar?'] }
    ],
    atv: { t: 'Atividade: *dá para automatizar?*', min: 7, passos: ['Em grupos, recebam 8 cartões: corrigir prova de múltipla escolha, escolher bolsista, prever o tempo, achar a rota de 50 entregas, decidir uma pena, traduzir, compor música, detectar spam.', 'Classifiquem em: rápido, inviável, impossível, exige pessoa.', 'Justifiquem dois cartões em que o grupo discordou.'] },
    conf: ['Dê um exemplo de problema inviável.', 'O que Turing provou sobre o problema da parada?', 'Cite uma decisão que deve ter revisão humana.'],
    resp: ['a menor rota passando por muitas cidades.', 'que nenhum programa decide se qualquer outro programa vai terminar.', 'escolha de bolsistas, sentenças, contratações, diagnósticos.'],
    levar: ['Velocidade não resolve tudo: há problemas inviáveis e impossíveis.', 'Heurísticas dão boas respostas quando a perfeita custa demais.', 'Decisões que afetam pessoas pedem revisão humana.'],
    prox: 'Próximo passo: avaliar um software com métricas (EM13CO06).',
    rot: ['Pergunte se existe problema que nenhum computador resolve. Registre as respostas.', 'Tipos de problema, explosão de combinações, parada, humano x máquina, perguntas (slides 4 a 8).', 'Dá para automatizar? Discussão dos cartões polêmicos.']
  },
  {
    c: 'EM13CO06', t: 'Este app *é bom?*', sub: 'Avaliar software com características e métricas',
    q: 'O que faz você desinstalar um aplicativo?',
    obj: ['listar características de qualidade de um software;', 'escolher métricas mensuráveis para avaliá-lo;', 'comparar dois softwares com evidências.'],
    s: [
      { k: 'cards', t: 'Qualidade *tem várias faces*', cards: [['✔', 'Correção', 'faz o que promete, sem erros'], ['⚡', 'Desempenho', 'rápido, leve, pouca bateria'], ['🙂', 'Usabilidade', 'fácil de aprender e usar'], ['🔒', 'Segurança', 'protege dados e conta']] },
      { k: 'cards', t: 'E mais *duas*', cards: [['♿', 'Acessibilidade', 'funciona para pessoas com deficiência'], ['🛠', 'Manutenção', 'fácil de corrigir e atualizar']], nota: 'Nenhum software é ótimo em tudo: há **escolhas**.' },
      { k: 'lista', t: 'Métricas *que dá para medir*', itens: ['Tempo para concluir uma tarefa (segundos).', 'Número de erros ou toques a mais.', 'Nota de satisfação de 1 a 5.', 'Tamanho do app e uso de bateria.', 'Quantas permissões ele pede.'] },
      { k: 'texto', t: 'Opinião x *evidência*', p: ['“Esse app é ruim” é opinião. “Levou 2 minutos e 3 erros para pagar um boleto” é **evidência**.', 'Empresas testam com usuários reais e medem antes de mudar.'] },
      { k: 'duas', t: 'Exemplo: *dois apps de nota*', a: ['App A', 'tarefa em 20 s, 0 erros, 12 permissões, nota 4.'], b: ['App B', 'tarefa em 45 s, 2 erros, 3 permissões, nota 3.'], nota: 'Qual é melhor? Depende do que você **prioriza**.' }
    ],
    atv: { t: 'Atividade: *teste relâmpago*', min: 7, passos: ['Em trios, escolham dois apps parecidos que estejam nos celulares.', 'Definam uma tarefa e três métricas.', 'Um usa, outro cronometra, outro anota erros. Façam nos dois apps.', 'Digam qual venceu e em qual critério.'] },
    conf: ['Cite três características de qualidade de software.', 'Dê um exemplo de métrica mensurável.', 'Por que medir é melhor que opinar?'],
    resp: ['correção, desempenho, usabilidade, segurança, acessibilidade, manutenção.', 'tempo de tarefa, número de erros, nota de satisfação, permissões.', 'permite comparar e decidir com base em dados, não em gosto.'],
    levar: ['Qualidade de software tem várias dimensões.', 'Métricas transformam opinião em evidência.', 'Escolher software é decidir o que priorizar.'],
    prox: 'Próximo passo: como as redes de computadores funcionam (EM13CO07).',
    rot: ['Pergunte por que já desinstalaram um app. Agrupe as respostas em critérios.', 'Características, métricas, opinião x evidência, exemplo dos dois apps (slides 4 a 8).', 'Teste relâmpago em trios.']
  },
  {
    c: 'EM13CO07', t: 'Redes *por dentro*', sub: 'Equipamentos, protocolos e serviços',
    q: 'O que acontece entre você tocar em “enviar” e a mensagem chegar?',
    obj: ['identificar os equipamentos de uma rede;', 'explicar o papel dos protocolos IP, TCP, DNS e HTTPS;', 'relacionar redundância à confiabilidade da internet.'],
    s: [
      { k: 'cards', t: 'Os *equipamentos*', cards: [['📶', 'Ponto de acesso', 'liga o celular ao Wi-Fi'], ['🔀', 'Roteador', 'escolhe o caminho dos pacotes'], ['🗄', 'Servidor', 'guarda e entrega os dados'], ['🌊', 'Cabos', 'fibra óptica, até no fundo do mar']] },
      { k: 'cards', t: 'Os *protocolos*', cards: [['IP', 'Endereço', 'cada aparelho tem um número na rede'], ['TCP', 'Entrega', 'confere se todos os pacotes chegaram'], ['DNS', 'Agenda', 'traduz nome do site em endereço IP'], ['HTTPS', 'Cadeado', 'criptografa a conversa com o site']] },
      { k: 'texto', t: 'Tudo vira *pacote*', p: ['A mensagem é quebrada em **pacotes** numerados. Cada um pode ir por um caminho diferente.', 'No destino, o TCP monta tudo na ordem e pede de novo o que se perdeu.'] },
      { k: 'texto', t: 'Por que a internet *não cai?*', p: ['Ela foi feita com **redundância**: muitos caminhos entre dois pontos. Se um roteador cai, os pacotes desviam.', 'Serviços grandes copiam os dados em vários data centers para aguentar bilhões de acessos.'] },
      { k: 'lista', t: 'Serviços *de rede* que você usa', itens: ['Web (HTTP/HTTPS): abrir sites.', 'E-mail (SMTP, IMAP).', 'Streaming de vídeo e música.', 'Nuvem: arquivos guardados em servidores.', 'Pix e bancos: transações seguras pela rede.'] }
    ],
    atv: { t: 'Atividade: *a sala é a internet*', min: 7, passos: ['Cada fileira é uma rede; um estudante por fileira é o roteador.', 'Escrevam uma frase em 4 papéis numerados (pacotes) com endereço de destino.', 'Os roteadores passam os pacotes até o destino; o professor “derruba” um roteador no meio.', 'O destino monta a frase. O que aconteceu com o pacote perdido?'] },
    conf: ['O que faz um roteador?', 'Para que serve o DNS?', 'O que é redundância numa rede?'],
    resp: ['escolhe o caminho e encaminha os pacotes.', 'traduz o nome do site em endereço IP.', 'ter vários caminhos ou cópias para a rede continuar se uma parte falhar.'],
    levar: ['Equipamentos e protocolos trabalham juntos.', 'Mensagens viajam em pacotes por vários caminhos.', 'Redundância dá escala e confiabilidade.'],
    prox: 'Próximo passo: como novas tecnologias mudam a segurança e a privacidade (EM13CO08).',
    rot: ['Pergunte o caminho de uma mensagem. Desenhe no quadro as ideias.', 'Equipamentos, protocolos, pacotes, redundância, serviços (slides 4 a 8).', 'A sala é a internet; derrubar um roteador.']
  },
  {
    c: 'EM13CO08', t: 'Tecnologia nova, *risco novo*', sub: 'Segurança, privacidade e como pedir ajuda',
    q: 'Que golpe existe hoje que não existia quando seus pais tinham a sua idade?',
    obj: ['relacionar mudanças tecnológicas a novos riscos;', 'adotar medidas de proteção de dados e contas;', 'saber onde denunciar e pedir ajuda.'],
    s: [
      { k: 'cards', t: 'Cada tecnologia, *um risco*', cards: [['💸', 'Pix', 'golpes de transferência instantânea'], ['🗣', 'IA de voz', 'voz clonada pedindo dinheiro'], ['📷', 'Câmera conectada', 'invasão e vigilância'], ['📍', 'Localização', 'apps que rastreiam sem avisar']] },
      { k: 'texto', t: 'Segurança *e* privacidade', p: ['**Segurança** é proteger contas, aparelhos e dados contra ataques.', '**Privacidade** é decidir quem sabe o quê sobre você. Um app pode ser seguro e ainda assim coletar dados demais.'] },
      { k: 'lista', t: 'Proteção *básica*', itens: ['Senhas longas e diferentes, com gerenciador.', 'Verificação em duas etapas em tudo que for possível.', 'Atualizar sistema e apps.', 'Desconfiar de urgência: “só hoje”, “seu filho foi preso”.', 'Revisar permissões dos aplicativos.'] },
      { k: 'texto', t: 'A *LGPD* protege você', p: ['A Lei Geral de Proteção de Dados (Lei 13.709/2018) diz que empresas precisam de **motivo** e **transparência** para usar seus dados.', 'Você pode pedir para ver, corrigir e apagar seus dados. A ANPD fiscaliza.'] },
      { k: 'cards', t: 'Onde *pedir ajuda*', cards: [['🛟', 'SaferNet', 'denúncia de crimes na internet e apoio'], ['🚓', 'Delegacia', 'crimes cibernéticos, boletim on-line'], ['🏦', 'Banco', 'golpe financeiro: avise na hora'], ['🧑‍🏫', 'Escola e família', 'adultos de confiança']] }
    ],
    atv: { t: 'Atividade: *análise de caso*', min: 7, passos: ['Em grupos, recebam um caso: Pix falso, vazamento de app, voz clonada, câmera invadida.', 'Respondam: que tecnologia mudou? Qual o risco novo?', 'Proponham duas proteções e um canal de denúncia.', 'Apresentem em 1 minuto.'] },
    conf: ['Qual a diferença entre segurança e privacidade?', 'Cite duas medidas de proteção.', 'Onde denunciar um crime na internet?'],
    resp: ['segurança protege contra ataques; privacidade é controlar quem sabe o quê sobre você.', 'senha forte, duas etapas, atualizar, desconfiar de urgência, revisar permissões.', 'SaferNet, delegacia de crimes cibernéticos, e avisar o banco em golpes financeiros.'],
    levar: ['Cada nova tecnologia traz riscos novos.', 'Hábitos simples protegem a maior parte dos ataques.', 'Denunciar e pedir ajuda é parte da segurança.'],
    prox: 'Próximo passo: a tecnologia no mundo do trabalho (EM13CO09).',
    rot: ['Pergunte que golpes eles conhecem. Liste no quadro.', 'Riscos novos, segurança x privacidade, proteção, LGPD, canais de ajuda (slides 4 a 8).', 'Análise de caso em grupos.']
  },
  {
    c: 'EM13CO09', t: 'Tecnologia *no trabalho*', sub: 'Profissões que mudam, surgem e se transformam',
    q: 'Que profissão vai existir quando você tiver 30 anos e ainda não tem nome?',
    obj: ['identificar tecnologias digitais em diferentes profissões;', 'diferenciar tarefas automatizáveis de tarefas humanas;', 'conhecer carreiras ligadas à Computação.'],
    s: [
      { k: 'cards', t: 'Tecnologia *em todo lugar*', cards: [['🌾', 'Agro', 'drones, sensores e mapas de solo'], ['🏥', 'Saúde', 'prontuário digital e exames com IA'], ['🛒', 'Comércio', 'loja on-line, estoque e entregas'], ['🎨', 'Criação', 'design, vídeo e música digitais']] },
      { k: 'duas', t: 'Tarefas, *não profissões*', a: ['Automatizáveis', 'repetitivas, com regras claras: digitar dados, conferir notas, separar pedidos.'], b: ['Humanas', 'cuidar, negociar, criar, ensinar, decidir em situações novas.'], nota: 'A maioria das profissões **muda**: perde umas tarefas e ganha outras.' },
      { k: 'cards', t: 'Carreiras *em Computação*', cards: [['💻', 'Desenvolvimento', 'cria sites, apps e sistemas'], ['📊', 'Dados', 'analisa dados para decidir'], ['🔐', 'Segurança', 'protege redes e sistemas'], ['🎮', 'Jogos e UX', 'projeta experiências']] },
      { k: 'lista', t: 'Caminhos *para chegar lá*', itens: ['Curso técnico integrado ao médio.', 'Graduação (Ciência da Computação, Sistemas, Engenharia, licenciatura).', 'Cursos livres e certificações.', 'Projetos próprios e portfólio no GitHub.', 'Olimpíadas e maratonas de programação.'] },
      { k: 'texto', t: 'O que *vale sempre*', p: ['Ferramentas mudam rápido. O que dura é **aprender a aprender**, resolver problemas, comunicar e trabalhar em equipe.', 'Saber usar tecnologia com **ética** também é competência profissional.'] }
    ],
    atv: { t: 'Atividade: *raio X da profissão*', min: 7, passos: ['Em duplas, escolham uma profissão de alguém da família ou da cidade.', 'Listem três tecnologias digitais usadas nela.', 'Separem uma tarefa que pode ser automatizada e uma que continua humana.', 'Digam que nova habilidade essa profissão vai pedir.'] },
    conf: ['Cite uma tecnologia digital usada no agro ou na saúde.', 'Dê um exemplo de tarefa automatizável.', 'Cite uma carreira ligada à Computação.'],
    resp: ['drones, sensores, prontuário eletrônico, exames com IA.', 'digitação de dados, conferência de notas, separação de pedidos.', 'desenvolvimento, dados, segurança, jogos, UX, ensino de Computação.'],
    levar: ['Tecnologia digital está em quase todas as profissões.', 'Automatizam-se tarefas; profissões se transformam.', 'Aprender a aprender é a habilidade que mais dura.'],
    prox: 'Próximo passo: os fundamentos da inteligência artificial (EM13CO10).',
    rot: ['Peça palpites de profissões do futuro. Anote as mais criativas.', 'Tecnologia por setor, tarefas, carreiras, caminhos, o que vale sempre (slides 4 a 8).', 'Raio X da profissão em duplas.']
  },
  {
    c: 'EM13CO10', t: 'Como a *IA aprende*', sub: 'Fundamentos, comparação com a inteligência humana, riscos e limites',
    q: 'A inteligência artificial pensa como uma pessoa?',
    obj: ['explicar que a IA aprende padrões a partir de dados;', 'comparar IA e inteligência humana;', 'discutir potenciais, riscos e limites da IA.'],
    s: [
      { k: 'cards', t: 'Três jeitos *de fazer IA*', cards: [['📏', 'Regras', 'pessoas escrevem SE… ENTÃO…'], ['📚', 'Aprendizado de máquina', 'o programa encontra padrões em exemplos'], ['🧠', 'Redes neurais', 'camadas de “neurônios” ajustam pesos']] },
      { k: 'lista', t: 'Como uma rede *é treinada*', itens: ['Recebe milhares de exemplos com a resposta certa.', 'Dá um palpite e mede o erro.', 'Ajusta os pesos para errar menos.', 'Repete milhões de vezes.', 'É testada em exemplos que nunca viu.'] },
      { k: 'texto', t: 'IA que *escreve*', p: ['Modelos de linguagem, como o ChatGPT, preveem a **próxima palavra provável** com base em muito texto.', 'Por isso escrevem bem, mas podem **inventar fatos** com toda a confiança. Sempre confira.'] },
      { k: 'duas', t: 'IA x *pessoa*', a: ['A IA faz bem', 'achar padrões em muitos dados, traduzir, resumir, reconhecer imagens, rapidez.'], b: ['A pessoa faz bem', 'entender contexto, ter valores, criar o novo, aprender com poucos exemplos, assumir responsabilidade.'] },
      { k: 'cards', t: 'Riscos *e limites*', cards: [['⚖', 'Vieses', 'aprende os preconceitos dos dados'], ['🎭', 'Invenções', 'respostas falsas que parecem certas'], ['🔍', 'Opacidade', 'difícil explicar por que decidiu'], ['🌍', 'Energia', 'treinar modelos gasta muita energia e água']] }
    ],
    atv: { t: 'Atividade: *treinador de IA*', min: 7, passos: ['No simulador Treino de rede neural (ohtopico.com.br/simuladores), mudem a taxa de aprendizado e o número de camadas.', 'Anotem o que acontece com o erro de treino e de validação.', 'Expliquem o sobreajuste com um exemplo da escola.', 'Sem computador: classifiquem 10 frases como “IA faz bem” ou “pessoa faz bem”.'] },
    conf: ['O que significa dizer que a IA aprende com dados?', 'Por que um modelo de linguagem pode inventar fatos?', 'Cite um risco da IA.'],
    resp: ['ela ajusta seus parâmetros para acertar exemplos, encontrando padrões.', 'ele escolhe palavras prováveis, sem verificar se são verdadeiras.', 'vieses, invenções, falta de explicação, consumo de energia, uso para enganar.'],
    levar: ['IA aprende padrões a partir de dados, não “pensa” como pessoa.', 'Ela é poderosa para algumas tarefas e frágil em outras.', 'Use, confira e questione: a responsabilidade é humana.'],
    prox: 'Próximo passo: criar modelos para simular e prever (EM13CO11).',
    rot: ['Pergunte se a IA pensa. Registre respostas para retomar no fim.', 'Tipos de IA, treino, modelos de linguagem, IA x pessoa, riscos (slides 4 a 8).', 'Treinador de IA no simulador ou classificação desplugada.']
  },
  {
    c: 'EM13CO11', t: 'Modelos *que preveem*', sub: 'Modelagem e simulação computacional na ciência',
    q: 'Como a previsão do tempo sabe que vai chover amanhã?',
    obj: ['explicar o que é um modelo computacional;', 'criar um modelo simples para simular uma situação;', 'reconhecer limites e incertezas de uma previsão.'],
    s: [
      { k: 'texto', t: 'O que é *um modelo*', p: ['Um modelo é uma **versão simplificada** da realidade que guarda só o que importa para uma pergunta.', 'No computador, o modelo vira regras e números que podemos **rodar muitas vezes**.'] },
      { k: 'cards', t: 'Modelos *na ciência*', cards: [['🌦', 'Clima', 'prevê chuva e temperatura'], ['🦠', 'Epidemias', 'simula como uma doença se espalha'], ['🚗', 'Trânsito', 'testa semáforos antes de mudar a rua'], ['🌱', 'Ecologia', 'população de presas e predadores']] },
      { k: 'codigo', t: 'Um modelo *de epidemia*', code: 'infectados, saudaveis = 1, 99\ntaxa = 0.3   # chance de contágio por encontro\nfor dia in range(1, 11):\n    novos = round(infectados * taxa * saudaveis / 100)\n    infectados += novos\n    saudaveis -= novos\n    print(dia, infectados)', nota: 'Mude a taxa e veja a curva mudar: é uma **simulação**.' },
      { k: 'lista', t: 'Como *construir* um modelo', itens: ['Defina a pergunta.', 'Escolha as variáveis que importam.', 'Escreva as regras de como elas mudam.', 'Rode e compare com dados reais.', 'Ajuste e repita.'] },
      { k: 'duas', t: 'Todo modelo *erra*', a: ['Por quê', 'simplifica a realidade e depende dos dados de entrada.'], b: ['Então', 'apresente a previsão com margem de incerteza e teste com dados novos.'], nota: '“Todos os modelos estão errados, mas alguns são úteis.” (George Box)' }
    ],
    atv: { t: 'Atividade: *simule a fila da cantina*', min: 7, passos: ['Em grupos, definam variáveis: pessoas chegando por minuto, tempo de atendimento, número de caixas.', 'Simulem 10 minutos com dados (sorteio) ou planilha.', 'Anotem o tamanho da fila a cada minuto.', 'Testem com 2 caixas: o que muda?'] },
    conf: ['O que é um modelo computacional?', 'Cite um uso de simulação na ciência.', 'Por que toda previsão tem incerteza?'],
    resp: ['uma representação simplificada da realidade, com regras que o computador executa.', 'clima, epidemias, trânsito, ecologia, engenharia.', 'porque o modelo simplifica e os dados de entrada não são perfeitos.'],
    levar: ['Modelos simplificam para responder uma pergunta.', 'Simular é rodar o modelo muitas vezes mudando valores.', 'Previsões vêm com incerteza e precisam ser testadas.'],
    prox: 'Próximo passo: produzir e analisar informação com dados (EM13CO12).',
    rot: ['Pergunte como funciona a previsão do tempo. Ouça hipóteses.', 'Modelo, exemplos, código da epidemia, construção, incerteza (slides 4 a 8).', 'Simulação da fila da cantina.']
  },
  {
    c: 'EM13CO12', t: 'Ciência *de dados*', sub: 'Da pergunta à decisão',
    q: 'Quantas horas por dia a turma passa no celular? Como descobrir sem chutar?',
    obj: ['percorrer o ciclo da ciência de dados;', 'limpar e organizar dados em tabela;', 'comunicar uma conclusão honesta.'],
    s: [
      { k: 'lista', t: 'O ciclo *dos dados*', itens: ['**Pergunta**: o que queremos saber?', '**Coleta**: questionário, sensor, base pública.', '**Limpeza**: tirar erros e repetidos.', '**Análise**: médias, gráficos, comparações.', '**Comunicação**: conclusão clara e honesta.'] },
      { k: 'cards', t: 'Dados *sujos*', cards: [['“dez”', 'Formato', 'texto onde devia ser número'], ['999', 'Erro', 'valor impossível'], ['—', 'Ausente', 'pessoa não respondeu'], ['2×', 'Repetido', 'mesma resposta duas vezes']], nota: 'Limpar dados costuma levar **a maior parte** do tempo.' },
      { k: 'cards', t: 'Resumir *os dados*', cards: [['x̄', 'Média', 'soma dividida pela quantidade'], ['Md', 'Mediana', 'o valor do meio, resiste a extremos'], ['σ', 'Desvio', 'quanto os dados se espalham']] },
      { k: 'texto', t: 'Gerir *e compartilhar*', p: ['Dados precisam de **nome claro**, data, fonte e responsável. Assim outra pessoa entende e reaproveita.', 'Dados de pessoas exigem **anonimização** e cuidado: a LGPD vale também para pesquisas.'] },
      { k: 'duas', t: 'Conclusão *honesta*', a: ['Pode dizer', '“Nesta turma, quem dorme menos usa mais o celular à noite.”'], b: ['Não pode dizer', '“O celular causa insônia em todos os jovens.” Correlação não é causa; amostra pequena.'] }
    ],
    atv: { t: 'Atividade: *mini pesquisa*', min: 7, passos: ['A turma responde em papel: horas de sono e horas de celular ontem.', 'Em grupos, passem os dados para uma tabela e limpem erros.', 'Calculem média e mediana de cada coluna.', 'Escrevam uma conclusão que pode e uma que não pode ser dita.'] },
    conf: ['Cite as etapas do ciclo de dados.', 'Por que a mediana pode ser melhor que a média?', 'O que significa “correlação não é causa”?'],
    resp: ['pergunta, coleta, limpeza, análise e comunicação.', 'porque não é puxada por valores extremos.', 'duas coisas andarem juntas não prova que uma provoca a outra.'],
    levar: ['Ciência de dados começa por uma boa pergunta.', 'Limpar e documentar dados é parte central do trabalho.', 'Conclusões honestas dizem também o que os dados não mostram.'],
    prox: 'Próximo passo: representar e consultar dados em pesquisas (EM13CO13).',
    rot: ['Peça palpites de horas de celular e mostre que palpite não é dado.', 'Ciclo, dados sujos, resumos, gestão, conclusão honesta (slides 4 a 8).', 'Mini pesquisa com dados da turma.']
  },
  {
    c: 'EM13CO13', t: 'Perguntar *aos dados*', sub: 'Tabelas, bancos de dados, consultas e gráficos',
    q: 'Como o site da escola acha suas notas entre milhares de alunos em um segundo?',
    obj: ['representar dados em tabelas com colunas bem definidas;', 'fazer consultas com filtro, ordenação e agrupamento;', 'escolher o gráfico adequado para a pergunta.'],
    s: [
      { k: 'texto', t: 'Tabela *bem feita*', p: ['Cada **linha** é um registro (um aluno, uma medição). Cada **coluna** é um atributo (nome, turma, nota) com um tipo só.', 'Um **banco de dados** guarda várias tabelas ligadas por códigos.'] },
      { k: 'codigo', t: 'Uma consulta *em SQL*', code: 'SELECT turma, AVG(nota) AS media\nFROM notas\nWHERE disciplina = \'Computação\'\nGROUP BY turma\nORDER BY media DESC;', nota: 'Filtrar (WHERE), agrupar (GROUP BY) e ordenar (ORDER BY).' },
      { k: 'cards', t: 'O mesmo *na planilha*', cards: [['🔽', 'Filtro', 'mostra só as linhas que interessam'], ['↕', 'Ordenar', 'do maior para o menor'], ['🧮', 'Tabela dinâmica', 'agrupa e calcula médias e totais']] },
      { k: 'cards', t: 'Qual *gráfico?*', cards: [['📊', 'Barras', 'comparar categorias'], ['📈', 'Linhas', 'mudança ao longo do tempo'], ['⚬', 'Dispersão', 'relação entre duas variáveis'], ['🗺', 'Mapa', 'dados por lugar']] },
      { k: 'texto', t: 'Gráfico *também engana*', p: ['Eixo que não começa no zero, 3D que distorce, escala escondida: o mesmo dado pode parecer enorme ou pequeno.', 'Ao ler um gráfico numa pesquisa, confira **eixos, fonte e escala**.'] }
    ],
    atv: { t: 'Atividade: *detetive de dados*', min: 7, passos: ['Em duplas, recebam uma tabela com 20 municípios (população, escolas, internet).', 'Respondam com filtro e ordenação: qual tem mais escolas? Quantos têm mais de 80% com internet?', 'Escolham um gráfico para comparar duas cidades e desenhem.', 'Escrevam a “consulta” em português.'] },
    conf: ['O que é uma linha e uma coluna numa tabela de dados?', 'Para que serve o GROUP BY?', 'Que gráfico usar para mostrar mudança no tempo?'],
    resp: ['linha é um registro; coluna é um atributo.', 'para agrupar registros e calcular algo por grupo, como a média por turma.', 'gráfico de linhas.'],
    levar: ['Dados bem organizados respondem perguntas rápido.', 'Consultas filtram, ordenam e agrupam.', 'O gráfico certo depende da pergunta, e precisa ser honesto.'],
    prox: 'Próximo passo: avaliar a confiabilidade das informações digitais (EM13CO14).',
    rot: ['Pergunte como um sistema acha uma nota entre milhares. Ouça ideias.', 'Tabela, SQL, planilha, tipos de gráfico, gráficos enganosos (slides 4 a 8).', 'Detetive de dados em duplas.']
  },
  {
    c: 'EM13CO14', t: 'Dá para *confiar?*', sub: 'Autoria, estrutura, propósito e contexto da informação',
    q: 'Você já compartilhou algo que depois descobriu ser falso?',
    obj: ['avaliar autoria, data e fonte de um conteúdo;', 'identificar o propósito de quem publicou;', 'aplicar técnicas simples de checagem.'],
    s: [
      { k: 'cards', t: 'Quatro *perguntas*', cards: [['👤', 'Autoria', 'quem escreveu? É especialista? Dá para achar?'], ['🧱', 'Estrutura', 'tem fontes, datas, dados, links?'], ['🎯', 'Propósito', 'informar, vender, convencer, enganar?'], ['🕰', 'Contexto', 'quando e onde foi publicado?']] },
      { k: 'lista', t: 'Checagem *em 5 passos*', itens: ['Leia além do título.', 'Procure a mesma notícia em outros veículos.', 'Faça busca reversa da imagem.', 'Confira a data: é antiga?', 'Consulte agências de checagem (Lupa, Aos Fatos, Comprova).'] },
      { k: 'cards', t: 'Tipos de *desinformação*', cards: [['❌', 'Falso', 'inventado'], ['✂', 'Fora de contexto', 'verdadeiro, mas de outro tempo ou lugar'], ['🎭', 'Sátira', 'piada que parece notícia'], ['🤖', 'Feito com IA', 'imagem, voz ou vídeo sintético']] },
      { k: 'texto', t: 'Conteúdo *feito com IA*', p: ['Imagens e vídeos gerados por IA estão cada vez mais realistas. Detalhes estranhos (mãos, textos, sombras) ajudam, mas **nem sempre** aparecem.', 'O melhor sinal continua sendo a **fonte**: quem publicou primeiro?'] },
      { k: 'texto', t: 'Por que *cai* em boato', p: ['Notícias que provocam **raiva ou medo** se espalham mais. Os algoritmos das redes priorizam o que gera reação.', 'Desconfie mais quando o conteúdo **confirma** o que você já pensa.'] }
    ],
    atv: { t: 'Atividade: *agência de checagem*', min: 7, passos: ['Em grupos, recebam um conteúdo viral impresso.', 'Apliquem as quatro perguntas e os 5 passos (com celular, se possível).', 'Deem o veredito: verdadeiro, falso, fora de contexto, sátira ou sem provas.', 'Mostrem a evidência mais forte.'] },
    conf: ['Cite as quatro perguntas para avaliar um conteúdo.', 'O que é conteúdo fora de contexto?', 'Para que serve a busca reversa de imagem?'],
    resp: ['autoria, estrutura, propósito e contexto.', 'algo verdadeiro mostrado como se fosse de outro tempo, lugar ou situação.', 'descobrir onde e quando a imagem apareceu antes.'],
    levar: ['Pergunte quem, como, por que e quando.', 'Confirme em mais de uma fonte antes de compartilhar.', 'Emoção forte é sinal para checar com mais cuidado.'],
    prox: 'Próximo passo: a interação entre pessoas e computadores (EM13CO15).',
    rot: ['Pergunte quem já compartilhou algo falso, sem expor ninguém. Peça exemplos genéricos.', 'Quatro perguntas, checagem, tipos de desinformação, IA, emoção (slides 4 a 8).', 'Agência de checagem em grupos.']
  },
  {
    c: 'EM13CO15', t: 'Feito *para pessoas*', sub: 'Interação humano-computador, experiência do usuário e acessibilidade',
    q: 'Qual foi o último aplicativo que te deixou irritado? Por quê?',
    obj: ['explicar o que é experiência do usuário;', 'aplicar princípios simples de usabilidade;', 'identificar barreiras de acessibilidade.'],
    s: [
      { k: 'texto', t: 'Interação *humano-computador*', p: ['É a área que estuda como as pessoas usam a tecnologia: o que entendem, onde erram, o que sentem.', 'Um sistema pode funcionar perfeitamente e mesmo assim ser **difícil de usar**.'] },
      { k: 'cards', t: 'Princípios *de usabilidade*', cards: [['👀', 'Visibilidade', 'o que dá para fazer está à vista'], ['💬', 'Retorno', 'o sistema mostra o que aconteceu'], ['🔁', 'Consistência', 'botões iguais fazem coisas iguais'], ['↩', 'Desfazer', 'errar sem medo']] },
      { k: 'cards', t: 'Acessibilidade', cards: [['🔊', 'Leitor de tela', 'imagens precisam de texto alternativo'], ['⌨', 'Teclado', 'tudo deve funcionar sem mouse'], ['🌓', 'Contraste', 'texto legível para baixa visão'], ['🎬', 'Legendas', 'vídeos para pessoas surdas']], nota: 'No Brasil, a **Lei Brasileira de Inclusão** (13.146/2015) exige sites acessíveis.' },
      { k: 'texto', t: 'Experiência *do usuário* (UX)', p: ['Vai além da tela: inclui a **emoção**, a confiança e o contexto. Pagar um boleto no ônibus com uma mão é diferente de pagar no computador.', 'Por isso designers **observam pessoas reais** usando o produto.'] },
      { k: 'texto', t: 'Padrões *enganosos*', p: ['Alguns apps usam o design contra você: botão de cancelar escondido, contagem regressiva falsa, assinatura difícil de sair.', 'Esses **dark patterns** são um problema ético e, às vezes, ilegal.'] }
    ],
    atv: { t: 'Atividade: *caça às barreiras*', min: 7, passos: ['Em duplas, escolham um site ou app que usam muito.', 'Tentem usar só com o zoom no máximo ou só com o teclado.', 'Anotem três barreiras e um princípio de usabilidade que falha.', 'Proponham uma melhoria desenhada no papel.'] },
    conf: ['O que é experiência do usuário?', 'Cite dois princípios de usabilidade.', 'Dê um exemplo de barreira de acessibilidade.'],
    resp: ['tudo o que a pessoa sente e vive ao usar um produto, não só a tela.', 'visibilidade, retorno, consistência, poder desfazer.', 'imagem sem texto alternativo, pouco contraste, vídeo sem legenda, não funcionar no teclado.'],
    levar: ['Funcionar não basta: precisa ser fácil de usar.', 'Acessibilidade é direito e requisito.', 'Design pode ajudar ou manipular as pessoas.'],
    prox: 'Próximo passo: projetos de robótica com sensores e atuadores (EM13CO16).',
    rot: ['Peça exemplos de apps irritantes. Agrupe os motivos.', 'IHC, princípios, acessibilidade, UX, dark patterns (slides 4 a 8).', 'Caça às barreiras em duplas.']
  },
  {
    c: 'EM13CO16', t: 'Robôs que *sentem e agem*', sub: 'Projetos de robótica com sensores, atuadores e programação',
    q: 'O que um robô aspirador precisa “saber” para não cair da escada?',
    obj: ['identificar sensores, controlador e atuadores num robô;', 'programar uma regra de decisão com sensor;', 'planejar um protótipo físico ou simulado.'],
    s: [
      { k: 'cards', t: 'As *três partes* de um robô', cards: [['👁', 'Sensores', 'luz, distância, temperatura, toque'], ['🧠', 'Controlador', 'placa que roda o programa (Arduino, micro:bit)'], ['⚙', 'Atuadores', 'motores, LEDs, buzina, servo']] },
      { k: 'lista', t: 'O ciclo *do robô*', itens: ['**Sentir**: ler o sensor.', '**Pensar**: comparar com uma regra.', '**Agir**: ligar o motor ou o LED.', 'Repetir muitas vezes por segundo.'] },
      { k: 'codigo', t: 'Uma regra *com sensor*', code: 'enquanto verdadeiro:\n    distancia = ler_sensor_ultrassom()\n    se distancia < 10:      # obstáculo perto (cm)\n        parar_motores()\n        girar_direita()\n    senão:\n        andar_frente()', nota: 'Pseudocódigo; em Arduino ou micro:bit é a mesma lógica.' },
      { k: 'duas', t: 'Físico *ou simulado?*', a: ['Kit físico', 'experiência real com peças; precisa de material e tempo de montagem.'], b: ['Simulador', 'Tinkercad, Wokwi: gratuito, no navegador, sem queimar nada.'] },
      { k: 'cards', t: 'Ideias *de projeto*', cards: [['💡', 'Luz automática', 'acende quando escurece'], ['🌱', 'Rega da horta', 'sensor de umidade liga a bomba'], ['🔊', 'Medidor de ruído', 'alerta na biblioteca'], ['🚗', 'Carrinho', 'desvia de obstáculos']] }
    ],
    atv: { t: 'Atividade: *projete seu robô*', min: 7, passos: ['Em grupos, escolham um problema da escola.', 'Desenhem o robô: que sensor, que atuador, onde fica.', 'Escrevam a regra em pseudocódigo (SE… ENTÃO… SENÃO…).', 'Apresentem o desenho em 1 minuto.'] },
    conf: ['Cite as três partes de um robô.', 'O que faz um atuador?', 'Descreva o ciclo sentir, pensar e agir.'],
    resp: ['sensores, controlador e atuadores.', 'executa a ação no mundo: move, acende, apita.', 'lê o sensor, decide pela regra e age, repetindo sempre.'],
    levar: ['Robôs juntam sensores, programa e atuadores.', 'A lógica é sentir, pensar e agir em ciclo.', 'Simuladores permitem prototipar sem kit.'],
    prox: 'Próximo passo: redes virtuais de colaboração seguras (EM13CO17).',
    rot: ['Pergunte como o robô aspirador evita a escada. Ouça hipóteses.', 'Partes, ciclo, regra com sensor, físico x simulado, ideias (slides 4 a 8).', 'Projete seu robô em grupos.']
  },
  {
    c: 'EM13CO17', t: 'Colaborar *em rede*', sub: 'Ambientes virtuais de colaboração seguros, legais e éticos',
    q: 'Como cinco pessoas escrevem o mesmo trabalho sem uma apagar o texto da outra?',
    obj: ['escolher ferramentas de colaboração on-line;', 'configurar acesso e permissões com segurança;', 'combinar regras de convivência e respeito à lei.'],
    s: [
      { k: 'cards', t: 'Ferramentas *de colaboração*', cards: [['📝', 'Documentos', 'edição ao mesmo tempo, histórico'], ['📋', 'Quadros', 'tarefas em colunas (Kanban)'], ['💬', 'Chat e vídeo', 'conversa da equipe'], ['🗂', 'Repositório', 'arquivos e versões (GitHub, Drive)']] },
      { k: 'lista', t: 'Permissões *com cuidado*', itens: ['Compartilhe com pessoas, não com “qualquer um com o link”.', 'Dê só o acesso necessário: ver, comentar ou editar.', 'Revise quem tem acesso ao fim do projeto.', 'Use o histórico para recuperar versões.'] },
      { k: 'texto', t: 'Ética *na equipe*', p: ['Colaborar on-line também é conviver: responder no prazo, avisar quando não puder, **dar crédito** a quem fez.', 'Discordar da ideia, nunca atacar a pessoa.'] },
      { k: 'duas', t: 'O que diz *a lei*', a: ['Direitos autorais', 'material de terceiros precisa de licença e crédito (Lei 9.610/1998).'], b: ['Dados pessoais', 'não exponha dados de colegas sem consentimento (LGPD).'] },
      { k: 'cards', t: 'Riscos *comuns*', cards: [['🔗', 'Link aberto', 'qualquer pessoa entra e edita'], ['🗑', 'Apagão', 'alguém apaga tudo sem querer'], ['🎣', 'Golpe', 'convite falso para roubar conta']] }
    ],
    atv: { t: 'Atividade: *monte a sala virtual*', min: 7, passos: ['Em grupos, escolham uma ferramenta para um trabalho de 4 semanas.', 'Definam quem tem cada permissão e por quê.', 'Escrevam 5 combinados de convivência da equipe.', 'Listem um risco e como evitá-lo.'] },
    conf: ['Cite duas ferramentas de colaboração on-line.', 'Por que evitar “qualquer pessoa com o link”?', 'Que lei protege os direitos autorais?'],
    resp: ['documentos compartilhados, quadros de tarefas, chat, repositórios.', 'porque qualquer um pode entrar, copiar ou apagar.', 'Lei 9.610/1998 (Lei de Direitos Autorais).'],
    levar: ['A ferramenta certa organiza o trabalho em equipe.', 'Permissões mínimas protegem o projeto.', 'Respeito, crédito e lei valem também on-line.'],
    prox: 'Próximo passo: planejar e gerenciar projetos (EM13CO18).',
    rot: ['Pergunte como escrevem trabalhos em grupo. Ouça problemas que já tiveram.', 'Ferramentas, permissões, ética, lei, riscos (slides 4 a 8).', 'Monte a sala virtual em grupos.']
  },
  {
    c: 'EM13CO18', t: 'Projeto *do começo ao fim*', sub: 'Planejar e gerenciar projetos colaborativos com outras áreas',
    q: 'Por que tantos trabalhos em grupo terminam na véspera, com uma pessoa fazendo tudo?',
    obj: ['definir escopo, tarefas, responsáveis e prazos;', 'acompanhar o projeto com um quadro de tarefas;', 'integrar Computação a outra área do conhecimento.'],
    s: [
      { k: 'cards', t: 'As *fases* de um projeto', cards: [['1', 'Ideia', 'problema e objetivo'], ['2', 'Plano', 'tarefas, prazos, responsáveis'], ['3', 'Execução', 'fazer, testar, ajustar'], ['4', 'Entrega', 'apresentar e avaliar']] },
      { k: 'texto', t: 'Escopo: *o que entra e o que não entra*', p: ['Projeto bom é projeto **possível**. Defina o produto mínimo que dá para entregar no prazo.', 'Ideias extras vão para uma lista de “se der tempo”.'] },
      { k: 'cards', t: 'Quadro *Kanban*', cards: [['📥', 'A fazer', 'todas as tarefas, com dono'], ['🔨', 'Fazendo', 'no máximo 2 por pessoa'], ['✅', 'Feito', 'conferido por outra pessoa']] },
      { k: 'lista', t: 'Rituais *que funcionam*', itens: ['Reunião em pé de 5 minutos: o que fiz, o que farei, o que me trava.', 'Entregas pequenas toda semana.', 'Revisão por um colega antes de marcar “feito”.', 'Retrospectiva no fim: o que repetir, o que mudar.'] },
      { k: 'cards', t: 'Computação *com outras áreas*', cards: [['🧪', 'Ciências', 'sensor de qualidade da água'], ['📐', 'Matemática', 'simulação de juros ou epidemia'], ['🗺', 'Geografia', 'mapa de dados do bairro'], ['📚', 'Linguagens', 'jornal digital da escola']] }
    ],
    atv: { t: 'Atividade: *quadro em 7 minutos*', min: 7, passos: ['Em grupos, escolham um projeto de 4 semanas integrado a outra área.', 'Escrevam o objetivo em uma frase e o produto mínimo.', 'Listem 8 tarefas com responsável e semana.', 'Montem o quadro com post-its ou on-line.'] },
    conf: ['Quais são as fases de um projeto?', 'O que é escopo?', 'Para que serve a reunião em pé?'],
    resp: ['ideia, plano, execução e entrega.', 'o que o projeto vai e o que não vai entregar.', 'alinhar a equipe e descobrir rápido o que está travado.'],
    levar: ['Planejar evita a correria da véspera.', 'Escopo pequeno e possível vence escopo grande.', 'Quadro de tarefas mostra quem faz o quê.'],
    prox: 'Próximo passo: apresentar e defender propostas com mídias digitais (EM13CO19).',
    rot: ['Pergunte por que trabalhos em grupo dão errado. Liste causas.', 'Fases, escopo, Kanban, rituais, integração com áreas (slides 4 a 8).', 'Quadro em 7 minutos.']
  },
  {
    c: 'EM13CO19', t: 'Convença *em 3 minutos*', sub: 'Apresentar, defender e negociar ideias com mídias digitais',
    q: 'O que faz você prestar atenção numa apresentação?',
    obj: ['estruturar um pitch curto e claro;', 'usar slides e mídias que ajudam, não atrapalham;', 'responder perguntas e negociar com argumentos.'],
    s: [
      { k: 'lista', t: 'Estrutura *de pitch*', itens: ['**Problema**: quem sofre com o quê?', '**Solução**: o que vocês propõem?', '**Prova**: dado, teste ou protótipo.', '**Pedido**: o que precisam (apoio, verba, tempo)?'] },
      { k: 'duas', t: 'Slides *que ajudam*', a: ['Faça', 'uma ideia por slide, letra grande, imagem que explica, número que impressiona.'], b: ['Evite', 'parágrafos para ler, 10 cores, animação que distrai, fonte pequena.'] },
      { k: 'cards', t: 'Outras *mídias*', cards: [['🎥', 'Vídeo curto', 'mostra o protótipo funcionando'], ['📊', 'Infográfico', 'resume dados num olhar'], ['🧪', 'Demonstração', 'ao vivo, se for seguro']] },
      { k: 'texto', t: 'Defender *e negociar*', p: ['Ouça a pergunta inteira, agradeça e responda com **dado ou exemplo**. Se não souber, diga que vai verificar.', 'Negociar é buscar o que os dois lados querem: talvez o projeto comece menor.'] },
      { k: 'texto', t: 'Acessível *para todos*', p: ['Contraste alto, legendas no vídeo e descrição das imagens em voz alta.', 'Ensaiem com cronômetro: **3 minutos** passam rápido.'] }
    ],
    atv: { t: 'Atividade: *pitch relâmpago*', min: 7, passos: ['Em duplas, escolham uma ideia para melhorar a escola.', 'Escrevam o pitch em 4 frases: problema, solução, prova, pedido.', 'Façam um único slide no papel.', 'Apresentem em 1 minuto; a turma faz uma pergunta.'] },
    conf: ['Quais são as partes de um pitch?', 'Cite um erro comum em slides.', 'Como responder uma pergunta difícil?'],
    resp: ['problema, solução, prova e pedido.', 'muito texto, letra pequena, cores demais, animações que distraem.', 'ouvir, responder com dado ou exemplo e, se não souber, dizer que vai verificar.'],
    levar: ['Um pitch claro tem problema, solução, prova e pedido.', 'Mídia boa reforça a ideia, não compete com ela.', 'Responder com dados ajuda a negociar.'],
    prox: 'Próximo passo: criar conteúdos para publicação on-line (EM13CO20).',
    rot: ['Pergunte o que prende a atenção numa apresentação. Liste.', 'Estrutura, slides, mídias, defesa e negociação, acessibilidade (slides 4 a 8).', 'Pitch relâmpago em duplas.']
  },
  {
    c: 'EM13CO20', t: 'Antes *de postar*', sub: 'Criar conteúdo on-line confiável e pensar nas consequências',
    q: 'Um post pode ser apagado da internet de verdade?',
    obj: ['planejar um conteúdo on-line com fontes confiáveis;', 'prever as consequências de uma publicação;', 'usar créditos e licenças corretamente.'],
    s: [
      { k: 'lista', t: 'Do rascunho *à publicação*', itens: ['Público: para quem é?', 'Mensagem: o que quero que entendam?', 'Fontes: de onde vêm os dados?', 'Formato: texto, imagem, vídeo, podcast.', 'Revisão: alguém leu antes?'] },
      { k: 'texto', t: 'A internet *não esquece*', p: ['Prints, cópias e arquivos guardam o que foi apagado. Um post pode ser visto por futuros colegas, empregadores e pela família.', 'Pergunte: **eu diria isso em público, com meu nome?**'] },
      { k: 'cards', t: 'Checklist *de publicação*', cards: [['🔎', 'Confiável', 'fontes conferidas'], ['🙋', 'Consentimento', 'pessoas na foto concordaram'], ['©', 'Créditos', 'imagens e músicas com licença'], ['💭', 'Impacto', 'pode ferir ou expor alguém?']] },
      { k: 'duas', t: 'Licenças *de uso*', a: ['Pode usar', 'conteúdo seu, domínio público, Creative Commons respeitando as regras, bancos gratuitos.'], b: ['Não pode', 'baixar do Google e usar sem permissão, música de artista em vídeo monetizado sem licença.'] },
      { k: 'texto', t: 'Conteúdo *feito com IA*', p: ['Se usou IA para gerar texto, imagem ou voz, **avise**. Confira fatos e não use rosto ou voz de pessoas reais sem autorização.', 'Transparência aumenta a confiança no que você publica.'] }
    ],
    atv: { t: 'Atividade: *post responsável*', min: 7, passos: ['Em duplas, planejem um post sobre um tema da escola.', 'Preencham: público, mensagem, fontes, formato.', 'Apliquem o checklist de publicação.', 'Digam uma consequência boa e uma ruim que o post poderia ter.'] },
    conf: ['Por que dizer que a internet não esquece?', 'Cite dois itens do checklist de publicação.', 'O que fazer ao usar IA num conteúdo?'],
    resp: ['prints e cópias guardam o que foi apagado.', 'fontes confiáveis, consentimento, créditos, impacto.', 'avisar que usou IA e conferir os fatos.'],
    levar: ['Planeje público, mensagem e fontes.', 'Antes de postar, pense em quem pode ser afetado.', 'Créditos, licenças e transparência sempre.'],
    prox: 'Próximo passo: comunicar ideias complexas com infográficos e mapas (EM13CO21).',
    rot: ['Pergunte se é possível apagar algo da internet. Discuta exemplos.', 'Planejamento, memória da internet, checklist, licenças, IA (slides 4 a 8).', 'Post responsável em duplas.']
  },
  {
    c: 'EM13CO21', t: 'Ideias complexas *num olhar*', sub: 'Mapas conceituais, infográficos e hipertextos',
    q: 'Como explicar o sistema solar inteiro numa única página?',
    obj: ['construir um mapa conceitual com conceitos e ligações;', 'planejar um infográfico com dados e hierarquia visual;', 'organizar informação em hipertexto.'],
    s: [
      { k: 'cards', t: 'Três *ferramentas*', cards: [['🕸', 'Mapa conceitual', 'conceitos ligados por frases'], ['📊', 'Infográfico', 'dados e imagens que contam uma história'], ['🔗', 'Hipertexto', 'textos ligados por links']] },
      { k: 'texto', t: 'Mapa *conceitual*', p: ['Conceitos dentro de caixas, ligados por setas com **verbos**: “Internet → é formada por → redes”.', 'Leia em voz alta: cada ligação deve formar uma frase verdadeira.'] },
      { k: 'lista', t: 'Infográfico *que funciona*', itens: ['Uma pergunta central no título.', 'Poucos dados, os mais importantes, em destaque.', 'Ordem de leitura clara (de cima para baixo ou em Z).', 'Ícones simples e cores com significado.', 'Fonte dos dados no rodapé.'] },
      { k: 'texto', t: 'Hipertexto', p: ['Em vez de um texto longo, páginas curtas ligadas por **links**: o leitor escolhe o caminho.', 'A Wikipédia é um grande hipertexto. Um site de projeto também pode ser.'] },
      { k: 'cards', t: 'Ferramentas *gratuitas*', cards: [['🧭', 'Mapas', 'CmapTools, Miro, papel'], ['🎨', 'Infográficos', 'Canva, Google Desenhos'], ['🌐', 'Hipertexto', 'Google Sites, wiki da turma']] }
    ],
    atv: { t: 'Atividade: *mapa em 7 minutos*', min: 7, passos: ['Em grupos, escolham um tema estudado neste ano.', 'Listem 8 conceitos principais.', 'Montem o mapa com setas e verbos.', 'Leiam três ligações em voz alta: formam frases verdadeiras?'] },
    conf: ['O que liga os conceitos num mapa conceitual?', 'Cite uma característica de um bom infográfico.', 'O que é hipertexto?'],
    resp: ['setas com verbos ou frases de ligação.', 'pergunta central, poucos dados em destaque, ordem de leitura, fonte.', 'conjunto de textos ligados por links, em que o leitor escolhe o caminho.'],
    levar: ['Mapas mostram relações entre ideias.', 'Infográficos contam uma história com poucos dados.', 'Hipertextos deixam o leitor escolher o caminho.'],
    prox: 'Próximo passo: produzir e publicar textos, imagens, áudios e vídeos (EM13CO22).',
    rot: ['Pergunte como resumir um tema enorme numa página. Mostre um exemplo de infográfico.', 'Ferramentas, mapa conceitual, infográfico, hipertexto, ferramentas gratuitas (slides 4 a 8).', 'Mapa em 7 minutos.']
  },
  {
    c: 'EM13CO22', t: 'Produção *multimídia*', sub: 'Texto, imagem, áudio e vídeo integrados',
    q: 'Do que você precisa para fazer um vídeo de 1 minuto que as pessoas assistam até o fim?',
    obj: ['planejar uma produção multimídia com roteiro;', 'combinar texto, imagem, áudio e vídeo;', 'organizar e publicar os arquivos com cuidado.'],
    s: [
      { k: 'lista', t: 'Etapas *da produção*', itens: ['**Roteiro**: o que vai ser dito e mostrado.', '**Captação**: fotos, gravação de voz e vídeo.', '**Edição**: cortar, juntar, legendar.', '**Revisão**: alguém assiste antes.', '**Publicação**: formato e lugar certos.'] },
      { k: 'cards', t: 'Cada mídia *tem uma força*', cards: [['📝', 'Texto', 'precisão e detalhe'], ['🖼', 'Imagem', 'impacto imediato'], ['🎧', 'Áudio', 'emoção e companhia'], ['🎬', 'Vídeo', 'mostrar como se faz']] },
      { k: 'lista', t: 'Dicas *de captação*', itens: ['Grave na horizontal se for para tela grande.', 'Luz de frente, nunca contra a janela.', 'Microfone perto da boca, lugar silencioso.', 'Planos curtos de 3 a 5 segundos.'] },
      { k: 'texto', t: 'Organizar *os arquivos*', p: ['Uma pasta por projeto, com subpastas: roteiro, brutos, editado, final. Nomes com data: **2026-11-10_entrevista.mp4**.', 'Guarde cópia na nuvem e **um backup**.'] },
      { k: 'cards', t: 'Ferramentas *gratuitas*', cards: [['✂', 'Vídeo', 'CapCut, Clipchamp, Shotcut'], ['🎙', 'Áudio', 'Audacity, gravador do celular'], ['🖌', 'Imagem', 'Canva, GIMP, Photopea']], nota: 'Legendas e descrição das imagens tornam o conteúdo **acessível**.' }
    ],
    atv: { t: 'Atividade: *roteiro de 60 segundos*', min: 7, passos: ['Em grupos, escolham um tema da escola.', 'Escrevam um roteiro em 6 cenas: o que aparece e o que se fala.', 'Decidam que mídia usar em cada cena.', 'Leiam o roteiro cronometrando: cabe em 60 s?'] },
    conf: ['Quais são as etapas da produção multimídia?', 'Cite uma dica de gravação.', 'Por que organizar os arquivos em pastas?'],
    resp: ['roteiro, captação, edição, revisão e publicação.', 'luz de frente, microfone perto, lugar silencioso, planos curtos.', 'para achar tudo rápido, não perder material e trabalhar em equipe.'],
    levar: ['Roteiro primeiro, câmera depois.', 'Cada mídia tem uma força: combine.', 'Arquivos organizados e com backup salvam o projeto.'],
    prox: 'Próximo passo: comunidades virtuais e seus impactos (EM13CO23).',
    rot: ['Pergunte o que faz um vídeo prender a atenção. Liste.', 'Etapas, forças das mídias, captação, organização, ferramentas (slides 4 a 8).', 'Roteiro de 60 segundos.']
  },
  {
    c: 'EM13CO23', t: 'Comunidades *virtuais*', sub: 'Como se formam, o que as sustenta e que impactos têm',
    q: 'De quais comunidades on-line você participa? O que faz você ficar?',
    obj: ['identificar características de comunidades virtuais;', 'analisar relações de poder e regras nessas comunidades;', 'avaliar impactos positivos e negativos na sociedade.'],
    s: [
      { k: 'cards', t: 'Tipos *de comunidade*', cards: [['🎮', 'Jogos', 'clãs, servidores, guildas'], ['⭐', 'Fãs', 'fandoms de séries e artistas'], ['📚', 'Estudo', 'grupos de vestibular, fóruns'], ['🤝', 'Causas', 'movimentos sociais e voluntariado']] },
      { k: 'lista', t: 'O que *sustenta* uma comunidade', itens: ['Interesse comum.', 'Regras (escritas ou não).', 'Moderadores e líderes.', 'Sentimento de pertencimento.', 'Algoritmos da plataforma que mostram ou escondem conteúdo.'] },
      { k: 'duas', t: 'Impactos', a: ['Positivos', 'apoio a pessoas isoladas, aprendizado, organização de causas, amizades.'], b: ['Negativos', 'bolhas, radicalização, assédio em grupo, desinformação, exclusão.'] },
      { k: 'texto', t: 'Bolhas *e algoritmos*', p: ['As plataformas mostram mais do que você já curte. Com o tempo, a comunidade pode só ouvir **quem pensa igual**.', 'Isso facilita a radicalização e dificulta o diálogo.'] },
      { k: 'texto', t: 'Do on-line *para o mundo*', p: ['Comunidades virtuais já elegeram políticos, organizaram doações em enchentes e também espalharam ataques.', 'Participar com **senso crítico** é escolher que impacto você ajuda a criar.'] }
    ],
    atv: { t: 'Atividade: *raio X da comunidade*', min: 7, passos: ['Em grupos, escolham uma comunidade on-line conhecida (sem expor ninguém).', 'Descrevam: interesse, regras, moderação, quem tem poder.', 'Listem um impacto positivo e um negativo.', 'Proponham uma regra que a deixaria mais saudável.'] },
    conf: ['O que sustenta uma comunidade virtual?', 'O que é uma bolha?', 'Cite um impacto positivo de comunidades on-line.'],
    resp: ['interesse comum, regras, moderação, pertencimento e o algoritmo.', 'grupo que só vê e ouve quem pensa igual.', 'apoio, aprendizado, organização de causas, amizades.'],
    levar: ['Comunidades virtuais têm regras, poder e algoritmos.', 'Podem apoiar ou excluir, informar ou radicalizar.', 'Participar com senso crítico muda o impacto.'],
    prox: 'Próximo passo: como as redes afetam a saúde física e mental (EM13CO24).',
    rot: ['Peça que listem comunidades de que participam, sem identificar ninguém.', 'Tipos, o que sustenta, impactos, bolhas, do on-line ao mundo (slides 4 a 8).', 'Raio X da comunidade em grupos.']
  },
  {
    c: 'EM13CO24', t: 'Telas *e saúde*', sub: 'Efeitos das redes e dos aparelhos no corpo e na mente',
    q: 'Quanto tempo você acha que passou no celular ontem? Quer conferir?',
    obj: ['reconhecer efeitos das telas na saúde física;', 'identificar efeitos das redes sociais na saúde mental;', 'propor hábitos de uso mais saudáveis.'],
    s: [
      { k: 'cards', t: 'O corpo *sente*', cards: [['😴', 'Sono', 'luz e notificações atrasam o sono'], ['🦴', 'Postura', 'pescoço curvado, dor nas costas'], ['👁', 'Olhos', 'cansaço e vista seca'], ['🏃', 'Movimento', 'menos atividade física']] },
      { k: 'cards', t: 'A mente *também*', cards: [['🪞', 'Comparação', 'vidas editadas parecem perfeitas'], ['🔔', 'Ansiedade', 'medo de ficar de fora'], ['🎰', 'Recompensa', 'curtidas viciam como jogo']] },
      { k: 'texto', t: 'Feito *para prender*', p: ['Rolagem infinita, vídeo que começa sozinho, notificação vermelha: as plataformas são **projetadas** para você ficar mais tempo.', 'Não é falta de força de vontade: é design. Saber disso ajuda a escolher.'] },
      { k: 'lista', t: 'Hábitos *possíveis*', itens: ['Celular fora do quarto na hora de dormir.', 'Desligar notificações que não são de pessoas.', 'Usar o limite de tempo do próprio celular.', 'Seguir perfis que fazem bem, deixar os que fazem mal.', 'Pausas: regra 20-20-20 para os olhos.'] },
      { k: 'texto', t: 'Quando *pedir ajuda*', p: ['Se o uso atrapalha sono, estudo ou relações, ou se aparecem tristeza e ansiedade fortes, converse com alguém de confiança.', 'O **CVV** atende pelo telefone **188**, gratuito, 24 horas.'] }
    ],
    atv: { t: 'Atividade: *meu plano digital*', min: 7, passos: ['Quem quiser confere o tempo de tela no próprio celular (ninguém precisa mostrar).', 'Cada um escreve: o que as telas me dão de bom e o que me tiram.', 'Escolha dois hábitos da lista para testar por uma semana.', 'Em duplas, combinem como vão se lembrar.'] },
    conf: ['Cite dois efeitos das telas no corpo.', 'Por que as redes sociais prendem a atenção?', 'Dê um hábito saudável de uso.'],
    resp: ['sono pior, dor nas costas e no pescoço, olhos cansados, menos movimento.', 'são projetadas com rolagem infinita, notificações e recompensas.', 'celular fora do quarto, menos notificações, limite de tempo, pausas.'],
    levar: ['Telas afetam sono, corpo e emoções.', 'O design das plataformas é feito para prender.', 'Pequenos hábitos fazem diferença, e pedir ajuda é força.'],
    prox: 'Próximo passo: dialogar on-line com respeito e segurança (EM13CO25).',
    rot: ['Peça palpites de tempo de tela, sem obrigar ninguém a mostrar.', 'Corpo, mente, design que prende, hábitos, ajuda (slides 4 a 8).', 'Meu plano digital, individual e em duplas.']
  },
  {
    c: 'EM13CO25', t: 'Conversar *sem ferir*', sub: 'Diálogo on-line com segurança e respeito à diversidade',
    q: 'Por que é mais fácil ofender alguém pela internet do que pessoalmente?',
    obj: ['argumentar on-line com respeito, mesmo discordando;', 'reconhecer discurso de ódio e atitudes abusivas;', 'saber como denunciar e apoiar quem é atacado.'],
    s: [
      { k: 'texto', t: 'O efeito *da tela*', p: ['Sem ver o rosto da outra pessoa, perdemos sinais de dor e empatia. O anonimato dá **falsa coragem**.', 'Do outro lado da tela tem sempre **uma pessoa**.'] },
      { k: 'duas', t: 'Discordar *x atacar*', a: ['Discordar', '“Não concordo, porque os dados mostram…”'], b: ['Atacar', '“Só um idiota pensa isso.” Mira a pessoa, não a ideia.'] },
      { k: 'cards', t: 'Atitudes *abusivas*', cards: [['💬', 'Discurso de ódio', 'ataca raça, gênero, religião, deficiência, orientação'], ['👥', 'Cyberbullying', 'humilhação repetida em grupo'], ['📸', 'Exposição', 'divulgar imagens íntimas ou dados'], ['🎯', 'Perseguição', 'mensagens insistentes, ameaças']] },
      { k: 'texto', t: 'É *crime*', p: ['Racismo e injúria racial são crimes também na internet. A **Lei 14.811/2024** incluiu o cyberbullying no Código Penal.', 'Divulgar imagem íntima sem consentimento também é crime.'] },
      { k: 'lista', t: 'Se *acontecer*', itens: ['Não responda no calor do momento.', 'Faça print com data e link.', 'Denuncie na plataforma e bloqueie.', 'Conte para um adulto de confiança.', 'Denuncie na SaferNet ou na delegacia. Apoie quem foi atacado.'] }
    ],
    atv: { t: 'Atividade: *reescreva a mensagem*', min: 7, passos: ['Em duplas, recebam 5 comentários agressivos de uma discussão on-line fictícia.', 'Identifiquem: é discordância, ataque ou discurso de ódio?', 'Reescrevam os ataques mantendo a opinião, sem ferir.', 'Digam o que fariam se fossem o alvo.'] },
    conf: ['Qual a diferença entre discordar e atacar?', 'Cite uma atitude abusiva on-line.', 'O que fazer se for vítima de ataque?'],
    resp: ['discordar critica a ideia com argumentos; atacar mira a pessoa.', 'discurso de ódio, cyberbullying, exposição, perseguição.', 'não responder, guardar prints, denunciar, bloquear, contar a um adulto.'],
    levar: ['Na tela também há uma pessoa.', 'Critique ideias, respeite pessoas e a diversidade.', 'Guardar provas, denunciar e apoiar são atitudes de segurança.'],
    prox: 'Próximo passo: direito digital na prática (EM13CO26).',
    rot: ['Pergunte por que se ofende mais on-line. Ouça hipóteses.', 'Efeito da tela, discordar x atacar, abusos, lei, o que fazer (slides 4 a 8).', 'Reescreva a mensagem em duplas.']
  },
  {
    c: 'EM13CO26', t: 'Direito *digital*', sub: 'LGPD, Marco Civil, direitos autorais e a sua conduta',
    q: 'Você leu os termos de uso do último app que instalou?',
    obj: ['conhecer as principais leis do mundo digital no Brasil;', 'aplicar essas leis em situações do dia a dia;', 'agir com responsabilidade no uso de tecnologias.'],
    s: [
      { k: 'cards', t: 'Leis *que você precisa conhecer*', cards: [['🌐', 'Marco Civil', 'Lei 12.965/2014: direitos e deveres na internet'], ['🔐', 'LGPD', 'Lei 13.709/2018: proteção de dados pessoais'], ['©', 'Direitos autorais', 'Lei 9.610/1998: obras e criações'], ['🧒', 'ECA Digital', 'Lei 15.211/2025: proteção de crianças e adolescentes on-line']] },
      { k: 'texto', t: 'Marco *Civil da Internet*', p: ['Garante **liberdade de expressão**, privacidade e **neutralidade da rede** (o provedor não pode favorecer um site).', 'Plataformas guardam registros de acesso, que a Justiça pode pedir para investigar crimes.'] },
      { k: 'lista', t: 'Seus direitos *na LGPD*', itens: ['Saber quais dados uma empresa tem sobre você.', 'Corrigir dados errados.', 'Pedir para apagar dados desnecessários.', 'Revogar o consentimento.', 'Dados de menores de idade exigem cuidado especial.'] },
      { k: 'duas', t: 'Direitos *autorais*', a: ['Pode', 'citar trechos com crédito, usar obras em domínio público e com licença Creative Commons.'], b: ['Não pode', 'copiar trabalho e entregar como seu, piratear filmes e jogos, usar música sem licença em vídeo monetizado.'] },
      { k: 'texto', t: 'Sua *conduta*', p: ['Anonimato não protege de responsabilidade: perfis falsos e ataques podem ser rastreados.', 'Compartilhar é publicar: quem repassa conteúdo ilegal também pode responder.'] }
    ],
    atv: { t: 'Atividade: *tribunal digital*', min: 7, passos: ['Em grupos, recebam um caso: app que vende dados, vídeo de colega sem autorização, trabalho copiado, perfil falso que difama.', 'Identifiquem a lei envolvida e quem tem responsabilidade.', 'Decidam uma reparação justa.', 'Apresentem o veredito em 1 minuto.'] },
    conf: ['O que protege a LGPD?', 'O que é neutralidade da rede?', 'Pode usar uma música famosa num vídeo monetizado sem licença?'],
    resp: ['os dados pessoais e os direitos dos titulares sobre eles.', 'o provedor não pode favorecer ou bloquear sites ou serviços.', 'não; precisa de licença ou autorização do titular.'],
    levar: ['A internet tem leis: Marco Civil, LGPD, direitos autorais e ECA Digital.', 'Você tem direitos sobre seus dados.', 'Anonimato não apaga responsabilidade.'],
    prox: 'Fim da sequência do Ensino Médio. Que tal um projeto integrador juntando várias dessas habilidades?',
    rot: ['Pergunte quem leu termos de uso. Mostre o tamanho de um termo real.', 'Leis, Marco Civil, LGPD, direitos autorais, conduta (slides 4 a 8).', 'Tribunal digital em grupos.']
  }
];
