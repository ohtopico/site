"""6º ano: ano letivo de Computação (BNCC EF06CO01 a EF06CO10), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
Os jogos do 6º ano juntam dois jogos novos (jogos6.py) com jogos que o site já tinha (JOGOS_EXISTENTES).
"""
from folhas import (bloco, escrever, figs, malha, setas, tabela)

ANO = 6
TITULO = 'Computação no 6º ano'
RESUMO = ('Um ano letivo completo de Computação para o 6º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, com um jogo para cada habilidade.')
APRESENTACAO = [
    'No 6º ano, a turma começa os anos finais trabalhando com tipos de dados e coleções, escrevendo algoritmos com sequência, repetição e seleção, '
    'descrevendo soluções com precisão, decompondo problemas, identificando entradas e saídas e generalizando soluções com parâmetros. '
    'Depois, entende como a informação viaja pela internet em pacotes, como arquivos são guardados e compactados, '
    'e fecha o ano com conduta ética no ambiente digital e o consumo consciente de tecnologia.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada, uma folha para imprimir e, em várias, um jogo do site.',
]
BIMESTRES = [
    ('Dados e algoritmos', 'Classificar informações em coleções com tipos de dados e escrever algoritmos com sequência, repetição e seleção.'),
    ('Programar com precisão', 'Descrever soluções com precisão, decompor problemas em partes e identificar entradas, saídas e seus tipos.'),
    ('Generalizar, transmitir e guardar', 'Criar algoritmos com parâmetros, entender a transmissão em pacotes e organizar, compactar e recuperar arquivos.'),
    ('Ética e sustentabilidade', 'Comunicar-se com respeito no ambiente digital e analisar o consumo, a produção e o descarte da tecnologia.'),
]


def jogo_existente(id_, titulo, habs, resumo):
    return {'id': id_, 'titulo': titulo, 'habs': habs, 'resumo': resumo}


JOGOS_EXISTENTES = [
    jogo_existente('robo', 'Robô Coletor', ['EF06CO02', 'EF06CO03', 'EF06CO04'],
                   'Monte a sequência de comandos, use a repetição e leve o robô até todas as estrelas com o menor programa possível.'),
    jogo_existente('fabrica-logica', 'Fábrica Lógica', ['EF06CO01', 'EF06CO02', 'EF06CO05', 'EF06CO08'],
                   'Simulação de uma fábrica com um andar por setor: algoritmos, dados, planilhas e arquivos, redes e decisões.'),
    jogo_existente('pacotes', 'Correio de Pacotes', ['EF06CO07'],
                   'As mensagens chegam picadas e fora de ordem. Remonte os pacotes pelo número e peça de novo os que se perderam.'),
    jogo_existente('paridade', 'Mágica da Paridade', ['EF06CO07', 'EF06CO01'],
                   'Prepare a mesa de cartas com o bit de paridade e descubra qual carta o computador virou escondido.'),
    jogo_existente('bingo', 'Bingo de Informática', ['EF06CO08'],
                   'Bingo para a turma toda, com cartelas para imprimir e pistas na tela sobre hardware, arquivos, internet e segurança.'),
    jogo_existente('vila-cidada', 'Vila Cidadã', ['EF06CO09'],
                   'Ande pela vila em 3D e ajude moradores em situações de respeito, privacidade, autoria e checagem.'),
    jogo_existente('linha-tempo', 'Linha do Tempo da Computação', ['EF06CO10'],
                   'Coloque cada invenção no lugar certo da linha do tempo, da Pascalina ao Pix.'),
]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


def codigo(*linhas):
    return '<p style="font-family:monospace;font-size:12px;line-height:1.5;margin:2mm 0">' + '<br>'.join(linhas) + '</p>'


AULAS = [
    # =================== 1º bimestre ===================
    aula(n=1, bim=1, titulo='Que tipo de dado é esse?', habs=['EF06CO01'],
         objetivo='Reconhecer os tipos de dados mais usados: texto, número, data e lógico (sim ou não).',
         material='Uma ficha de cadastro (biblioteca, clube ou escola) projetada ou no quadro e a folha do estudante.',
         passos=['Roda (10 min): que informações a escola guarda sobre cada estudante? Liste no quadro.',
                 'Tipos (15 min): ao lado de cada informação, a turma decide se é texto, número, data ou sim/não. Pergunte: dá para somar? dá para ordenar?',
                 'Folha (20 min).', 'Fechamento (5 min): o tipo diz ao computador o que ele pode fazer com o dado.'],
         turma='Para o computador, toda informação tem um tipo. Nome e cidade são texto. Idade e nota são números, e com eles fazemos contas. '
               'Aniversário é uma data, que dá para ordenar no calendário. E algumas respostas só podem ser sim ou não: esse é o tipo lógico.',
         atividade=bloco(1, 'Escreva o tipo de cada dado: texto (T), número (N), data (D) ou lógico (L).',
                         tabela(['Dado', 'Tipo'], [['Nome: Luiza', ''], ['Idade: 11', ''], ['Nascimento: 04/02/2015', ''], ['Usa óculos? sim', ''],
                                                   ['Altura: 1,48 m', ''], ['Cidade: Canoas', '']])) +
                   bloco(2, 'O CEP 93000-000 deve ser guardado como texto ou como número? Explique.', escrever(2)),
         gabarito=['Bloco 1: T, N, D, L, N, T.', 'Bloco 2: como texto, porque não fazemos contas com CEP e ele tem hífen (e pode começar com zero).'],
         jogo='colecoes-e-tipos',
         adaptar='Use cartões com os dados e quatro caixas com o nome de cada tipo para separar com as mãos. Para estudantes cegos, as caixas podem ter etiqueta em braille.'),
    aula(n=2, bim=1, titulo='Coleções de dados', habs=['EF06CO01'],
         objetivo='Agrupar informações em coleções (conjuntos) e associar cada coleção a um tipo de dado.',
         material='Cartões com informações misturadas (nomes, notas, datas, respostas sim/não) e a folha do estudante.',
         passos=['Mistura (15 min): distribua os cartões aos grupos. Cada grupo separa em coleções e dá um nome a cada uma.',
                 'Comparação (10 min): os grupos separaram do mesmo jeito? Qual o tipo de cada coleção?',
                 'Folha (20 min).', 'Fechamento (5 min): uma planilha também guarda cada coluna com um tipo.'],
         turma='Uma coleção junta informações parecidas: a lista de nomes da turma, as notas da prova, as datas dos aniversários. '
               'Numa boa coleção, todos os itens têm o mesmo tipo. Assim o computador sabe o que fazer: somar as notas, ordenar as datas, procurar um nome.',
         atividade=bloco(1, 'Separe em quatro coleções e dê o tipo de cada uma.',
                         '<p>Pedro · 7,5 · 12/05 · sim · Laura · 9 · 30/11 · não · Caio · 6 · 01/03 · sim</p>' +
                         tabela(['Coleção', 'Itens', 'Tipo'], [['Nomes', '', ''], ['Notas', '', ''], ['Datas', '', ''], ['Respostas', '', '']])) +
                   bloco(2, 'Com qual coleção dá para calcular a média? E qual dá para pôr em ordem alfabética?', escrever(2)),
         gabarito=['Bloco 1: nomes (Pedro, Laura, Caio), texto; notas (7,5; 9; 6), número; datas (12/05, 30/11, 01/03), data; respostas (sim, não, sim), lógico.',
                   'Bloco 2: média com as notas; ordem alfabética com os nomes.'],
         jogo='colecoes-e-tipos',
         adaptar='Ofereça os cartões já recortados e com letra ampliada. Uma dupla pode ler os cartões em voz alta.'),
    aula(n=3, bim=1, titulo='Jogo: Coleções e Tipos de Dados', habs=['EF06CO01'],
         objetivo='Praticar a classificação de dados por tipo e a montagem de coleções.',
         material='Dispositivos com o jogo Coleções e Tipos de Dados e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): que fase foi mais difícil? Por quê?'],
         turma='No jogo, cada informação vai para a coleção do seu tipo. Pense: dá para fazer conta? É uma data? Só pode ser sim ou não?',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)) +
                   bloco(2, 'Crie a ficha de cadastro de um clube com 5 campos e o tipo de cada um.', tabela(['Campo', 'Tipo'], [['', ''], ['', ''], ['', ''], ['', ''], ['', '']])),
         gabarito=['Bloco 1: depende do estudante (8 fases).', 'Bloco 2: resposta livre; confira se o tipo combina com o campo.'],
         jogo='colecoes-e-tipos',
         adaptar='O jogo tem leitura e voz. Faça duplas de leitura quando necessário.'),
    aula(n=4, bim=1, titulo='Algoritmos em sequência', habs=['EF06CO02'],
         objetivo='Escrever algoritmos com instruções em sequência numa linguagem de blocos ou de texto.',
         material='Quadro, cartões com comandos (frente, gire à direita, gire à esquerda) e a folha do estudante.',
         passos=['Robô humano (15 min): um estudante é o robô e só faz o que o comando diz. A turma programa o caminho até a porta.',
                 'Linguagem (10 min): mostre os mesmos comandos escritos em blocos e em texto, uma instrução por linha.',
                 'Folha (20 min).', 'Fechamento (5 min): a ordem importa? O que acontece se trocar duas linhas?'],
         turma='Um algoritmo é uma lista de instruções em ordem. Numa linguagem de programação, cada instrução tem um jeito certo de ser escrita, '
               'e o computador executa uma linha depois da outra, sem pular e sem adivinhar.',
         atividade=bloco(1, 'Escreva o programa que leva o robô até a estrela. Use: direita, esquerda, cima, baixo.',
                         malha(5, 4, [0, 3], [[4, 0]], paredes=[[1, 2], [2, 2], [3, 1]], cel=14)) + escrever(2) +
                   bloco(2, 'Este programa tem um erro de ordem. Qual?', codigo('pegar o lanche', 'abrir a mochila', 'comer o lanche', 'fechar a mochila')),
         gabarito=['Bloco 1: um caminho possível: cima, cima, cima, direita, direita, direita, direita (há outros; confira se desvia das árvores).',
                   'Bloco 2: é preciso abrir a mochila antes de pegar o lanche.'],
         adaptar='Use uma malha no chão com fita crepe e deixe o estudante andar o caminho antes de escrever.'),
    aula(n=5, bim=1, titulo='Repetição: o laço', habs=['EF06CO02'],
         objetivo='Usar a repetição (laço) para escrever algoritmos mais curtos.',
         material='Quadro e a folha do estudante.',
         passos=['Desafio (10 min): escreva no quadro "frente" dez vezes. Pergunte: tem jeito mais curto?',
                 'Laço (15 min): mostre "repita 10 vezes [frente]" e exemplos com dois comandos dentro do laço.',
                 'Folha (20 min).', 'Fechamento (5 min): onde o computador repete coisas? (Músicas em loop, contagem, animações.)'],
         turma='Quando um pedaço do algoritmo se repete, usamos um laço: "repita N vezes" e, dentro dele, os comandos que se repetem. '
               'O programa fica mais curto, mais fácil de ler e de mudar.',
         atividade=bloco(1, 'Reescreva usando "repita".', codigo('frente, frente, frente, frente, gire, frente, frente, frente, frente, gire')) + escrever(1) +
                   bloco(2, 'O que este programa desenha?', codigo('repita 4 vezes [', '&nbsp;&nbsp;ande 5 passos', '&nbsp;&nbsp;gire 90 graus', ']')) + escrever(1) +
                   bloco(3, 'Escreva um programa com "repita" para desenhar um triângulo.', escrever(2)),
         gabarito=['Bloco 1: repita 2 vezes [repita 4 vezes [frente], gire].', 'Bloco 2: um quadrado.', 'Bloco 3: repita 3 vezes [ande 5 passos, gire 120 graus].'],
         adaptar='Faça os desenhos andando no pátio ou com uma tartaruga de papel sobre a mesa.'),
    aula(n=6, bim=1, titulo='Seleção: SE e SENÃO', habs=['EF06CO02'],
         objetivo='Usar a seleção (se, senão) para o algoritmo decidir o que fazer.',
         material='Quadro e a folha do estudante.',
         passos=['Regras da escola (10 min): SE chover, ENTÃO o recreio é na quadra coberta, SENÃO é no pátio.',
                 'Programa (15 min): escreva com a turma um algoritmo que decide se o estudante foi aprovado, com nota de entrada.',
                 'Folha (20 min).', 'Fechamento (5 min): sequência, repetição e seleção juntas formam quase todo programa.'],
         turma='A seleção faz o programa escolher um caminho. "Se a condição for verdadeira, faça isso; senão, faça aquilo." '
               'Com sequência, repetição e seleção, dá para escrever programas para quase tudo.',
         atividade=bloco(1, 'Siga o programa para cada nota e escreva a saída.',
                         codigo('receba nota', 'se nota >= 6 então', '&nbsp;&nbsp;mostre "aprovado"', 'senão', '&nbsp;&nbsp;mostre "recuperação"') +
                         tabela(['Nota', 'Saída'], [['8', ''], ['5', ''], ['6', '']])) +
                   bloco(2, 'Escreva um programa com "se" e "senão" para a temperatura: acima de 30 graus, "ligue o ventilador".', escrever(3)),
         gabarito=['Bloco 1: aprovado; recuperação; aprovado.', 'Bloco 2: receba temperatura; se temperatura > 30 então mostre "ligue o ventilador" senão mostre "tudo certo".'],
         adaptar='Monte o programa com cartões grandes e setas no quadro antes da folha.'),
    aula(n=7, bim=1, titulo='Jogo: Robô Coletor', habs=['EF06CO02'],
         objetivo='Praticar sequência e repetição programando o robô.',
         material='Dispositivos com o jogo Robô Coletor e a folha do estudante.',
         passos=['Jogo (25 min): desafie a turma a usar o menor número de comandos.', 'Folha (15 min).', 'Conversa (10 min): onde vocês usaram repetição?'],
         turma='No Robô Coletor, você monta o programa e o robô executa. Quanto menor o programa, melhor. Procure o que se repete.',
         atividade=bloco(1, 'Anote a fase mais difícil e o programa que você usou.', escrever(3)) +
                   bloco(2, 'Reescreva este programa com repetição.', setas('ddbddbddb')) + escrever(1),
         gabarito=['Bloco 1: resposta livre.', 'Bloco 2: repita 3 vezes [direita, direita, baixo].'],
         jogo='robo',
         adaptar='Faça duplas: um lê e o outro monta o programa, trocando a cada fase.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF06CO01', 'EF06CO02'],
         objetivo='Verificar o que a turma aprendeu sobre tipos de dados e algoritmos.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min): perguntas rápidas no quadro.', 'Avaliação (30 min).', 'Correção coletiva (5 min).'],
         turma='Hoje vamos mostrar o que aprendemos: tipos de dados, coleções e algoritmos com sequência, repetição e seleção.',
         atividade=bloco(1, 'Escreva o tipo: "Maria" ___ &nbsp; 15 ___ &nbsp; 25/12/2026 ___ &nbsp; "tem irmãos? não" ___', '') +
                   bloco(2, 'Escreva o programa com repetição: frente, gire, frente, gire, frente, gire.', escrever(1)) +
                   bloco(3, 'Siga e escreva a saída para idade 10 e idade 14.', codigo('receba idade', 'se idade >= 12 então mostre "anos finais"', 'senão mostre "anos iniciais"')) + escrever(1),
         gabarito=['Bloco 1: texto; número; data; lógico.', 'Bloco 2: repita 3 vezes [frente, gire].', 'Bloco 3: anos iniciais; anos finais.',
                   'Domina com 3 acertos; em desenvolvimento com 2; retomar com 1 ou nenhum.'],
         adaptar='Leia as questões em voz alta e aceite respostas orais registradas pelo professor.'),

    # =================== 2º bimestre ===================
    aula(n=9, bim=2, titulo='Descrever com precisão', habs=['EF06CO03'],
         objetivo='Descrever a solução de um problema sem ambiguidade, para que outra pessoa (ou o computador) faça exatamente igual.',
         material='Figuras simples com formas geométricas (uma por dupla) e a folha do estudante.',
         passos=['Ditado de desenho (20 min): um estudante descreve a figura e o colega desenha sem ver. Comparem.',
                 'Conversa (5 min): que palavras causaram confusão? Como ser mais preciso?', 'Folha (20 min).',
                 'Fechamento (5 min): o computador não adivinha, por isso a descrição precisa ser exata.'],
         turma='Uma instrução é ambígua quando pode ser entendida de mais de um jeito. "Desenhe um quadrado grande" é ambígua: grande quanto? '
               'Programar é descrever com precisão: tamanho, posição, ordem e quantas vezes.',
         atividade=bloco(1, 'Reescreva cada instrução sem ambiguidade.',
                         tabela(['Instrução ambígua', 'Instrução precisa'], [['Ande um pouco.', ''], ['Pegue alguns lápis.', ''], ['Vire para o lado.', '']])) +
                   bloco(2, 'Escreva as instruções para alguém desenhar a sua inicial numa folha quadriculada.', escrever(3)),
         gabarito=['Bloco 1: exemplos: ande 3 passos; pegue 2 lápis; vire 90 graus para a direita.', 'Bloco 2: resposta livre; teste com um colega.'],
         adaptar='Use figuras em relevo ou peças de encaixe para estudantes cegos descreverem e montarem.'),
    aula(n=10, bim=2, titulo='Do problema ao programa', habs=['EF06CO03'],
         objetivo='Construir o programa que implementa uma solução descrita com precisão.',
         material='Robô Coletor (ou malha no chão) e a folha do estudante.',
         passos=['Problema (10 min): descreva no quadro o problema "o robô deve pegar as três estrelas".',
                 'Solução (15 min): a turma descreve a solução em português e depois transforma em comandos.', 'Folha (20 min).',
                 'Teste (5 min): uma dupla executa o programa da outra.'],
         turma='Primeiro descrevemos a solução em palavras. Depois traduzimos cada parte para comandos da linguagem. Por fim, testamos para ver se o programa faz o que a descrição promete.',
         atividade=bloco(1, 'Descreva em palavras como pegar as duas estrelas e depois escreva o programa.',
                         malha(5, 4, [0, 0], [[4, 0], [4, 3]], cel=14)) + escrever(3),
         gabarito=['Bloco 1: andar 4 para a direita, depois 3 para baixo; programa: repita 4 vezes [direita], repita 3 vezes [baixo].'],
         jogo='robo',
         adaptar='Permita escrever a descrição com setas desenhadas antes de usar palavras.'),
    aula(n=11, bim=2, titulo='Decompor o problema', habs=['EF06CO04'],
         objetivo='Usar a decomposição para dividir um problema grande em partes menores.',
         material='Quadro e a folha do estudante.',
         passos=['Festa da turma (15 min): como organizar? A turma divide em partes (convite, comida, música, decoração) e subpartes.',
                 'Árvore (10 min): desenhe a decomposição como uma árvore no quadro.', 'Folha (20 min).',
                 'Fechamento (5 min): cada parte pequena é mais fácil de resolver e pode virar um pedaço do programa.'],
         turma='Decompor é quebrar um problema grande em partes menores. Cada parte fica mais fácil, e dá para dividir o trabalho no grupo. Juntando as partes, o problema inteiro está resolvido.',
         atividade=bloco(1, 'Decomponha o problema "fazer um jogo de perguntas" em pelo menos 4 partes.', escrever(4)) +
                   bloco(2, 'Escolha uma das partes e decomponha de novo em 3 passos.', escrever(3)),
         gabarito=['Bloco 1: exemplos: escolher o tema, escrever as perguntas, definir a pontuação, montar a tela, testar.', 'Bloco 2: resposta livre.'],
         adaptar='Ofereça a árvore já desenhada com os galhos para completar.'),
    aula(n=12, bim=2, titulo='Decompor e automatizar', habs=['EF06CO04'],
         objetivo='Automatizar as partes de uma solução decomposta usando procedimentos (blocos com nome).',
         material='Quadro e a folha do estudante.',
         passos=['Procedimento (15 min): mostre "desenhe_quadrado" como um bloco que tem dentro "repita 4 vezes [ande, gire]".',
                 'Casa (10 min): a casa é um quadrado mais um triângulo. Escreva com a turma usando os dois procedimentos.', 'Folha (20 min).',
                 'Fechamento (5 min): cada parte vira um bloco com nome, e o programa principal só chama os blocos.'],
         turma='Depois de decompor, cada parte pode virar um procedimento: um bloco com nome que guarda os comandos daquela parte. '
               'O programa principal fica curto e fácil de ler: chama cada parte na ordem certa.',
         atividade=bloco(1, 'Complete os procedimentos.',
                         codigo('procedimento quadrado:', '&nbsp;&nbsp;repita ___ vezes [ande 50, gire ___]', 'procedimento triângulo:', '&nbsp;&nbsp;repita ___ vezes [ande 50, gire ___]')) +
                   bloco(2, 'Escreva o programa principal que desenha três quadrados lado a lado.', escrever(3)),
         gabarito=['Bloco 1: 4 e 90; 3 e 120.', 'Bloco 2: repita 3 vezes [quadrado, ande 60 sem desenhar].'],
         jogo='robo',
         adaptar='Use cartões coloridos para cada procedimento e monte o programa principal colando os cartões.'),
    aula(n=13, bim=2, titulo='Entradas e saídas', habs=['EF06CO05'],
         objetivo='Identificar as entradas e as saídas esperadas de um problema.',
         material='Quadro e a folha do estudante.',
         passos=['Máquina misteriosa (15 min): o professor é a máquina. A turma diz um número (entrada) e o professor responde (saída, o dobro). Descubram a regra.',
                 'Exemplos (10 min): calculadora, caixa eletrônico, buscador. Qual a entrada? Qual a saída?', 'Folha (20 min).',
                 'Fechamento (5 min): antes de programar, pergunte o que entra e o que deve sair.'],
         turma='Todo programa recebe entradas, faz um processamento e entrega saídas. Na calculadora, os números e a operação são as entradas e o resultado é a saída. '
               'Antes de programar, é preciso saber o que entra e o que se espera que saia.',
         atividade=bloco(1, 'Complete a tabela.', tabela(['Programa', 'Entrada', 'Saída'],
                                                           [['Média da turma', '', ''], ['Previsão do tempo', '', ''], ['Metros em centímetros', '', ''], ['Senha do celular', '', '']])) +
                   bloco(2, 'Máquina misteriosa: 2 → 7, 5 → 10, 10 → 15. Qual a regra? E a saída para 20?', escrever(1)),
         gabarito=['Bloco 1: notas → média; cidade e data → temperatura e chuva; metros → centímetros; senha digitada → desbloqueia ou não.',
                   'Bloco 2: soma 5; 25.'],
         adaptar='Faça a máquina misteriosa com objetos concretos (entram 2 tampinhas, saem 4).'),
    aula(n=14, bim=2, titulo='Os tipos das entradas e saídas', habs=['EF06CO05', 'EF06CO01'],
         objetivo='Indicar o tipo de dado de cada entrada e saída de um problema.',
         material='Quadro e a folha do estudante.',
         passos=['Retomada (10 min): os tipos de dados do 1º bimestre.', 'Análise (15 min): para o programa "aprovado ou não", a entrada nota é número e a saída é lógico.',
                 'Folha (20 min).', 'Fechamento (5 min): escolher o tipo errado causa erro (somar nomes não funciona).'],
         turma='Cada entrada e cada saída tem um tipo. Um programa que verifica se a pessoa pode votar recebe a idade (número) e devolve sim ou não (lógico). '
               'Saber os tipos ajuda a evitar erros.',
         atividade=bloco(1, 'Escreva a entrada, a saída e os tipos.', tabela(['Problema', 'Entrada (tipo)', 'Saída (tipo)'],
                                                                              [['Pode votar?', '', ''], ['Dias até o aniversário', '', ''], ['Saudação com o nome', '', '']])) +
                   bloco(2, 'O que acontece se o programa da média receber "sete" escrito em letras?', escrever(2)),
         gabarito=['Bloco 1: idade (número) → sim ou não (lógico); data de hoje e do aniversário (data) → dias (número); nome (texto) → "Olá, nome!" (texto).',
                   'Bloco 2: dá erro ou resultado errado, porque "sete" é texto e não número.'],
         adaptar='Mantenha no quadro o cartaz com os quatro tipos e um exemplo de cada.'),
    aula(n=15, bim=2, titulo='Jogo: Fábrica Lógica', habs=['EF06CO05', 'EF06CO02'],
         objetivo='Identificar entradas, processamento e saídas numa simulação.',
         material='Dispositivos com o jogo Fábrica Lógica e a folha do estudante.',
         passos=['Jogo (25 min): comece pelo andar da Fábrica.', 'Folha (15 min).', 'Conversa (10 min): o que entrava e o que saía de cada máquina?'],
         turma='Na Fábrica Lógica, cada setor recebe alguma coisa, processa e entrega outra. Observe as entradas e as saídas de cada etapa.',
         atividade=bloco(1, 'Escolha duas máquinas ou setores do jogo e complete.', tabela(['Setor', 'Entrada', 'Saída'], [['', '', ''], ['', '', '']])) +
                   bloco(2, 'Qual decisão (seleção) você precisou tomar no jogo?', escrever(2)),
         gabarito=['Blocos 1 e 2: respostas livres; confira se a entrada vem antes da saída.'],
         jogo='fabrica-logica',
         adaptar='Faça duplas e permita registrar com desenhos.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF06CO03', 'EF06CO04', 'EF06CO05'],
         objetivo='Verificar o que a turma aprendeu sobre precisão, decomposição e entradas e saídas.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min).', 'Avaliação (30 min).', 'Correção coletiva (5 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre descrever soluções, decompor problemas e identificar entradas e saídas.',
         atividade=bloco(1, 'Reescreva sem ambiguidade: "Coloque bastante água no copo."', escrever(1)) +
                   bloco(2, 'Decomponha "arrumar a mochila para a escola" em 4 partes.', escrever(2)) +
                   bloco(3, 'Programa do troco: qual a entrada, a saída e os tipos?', escrever(2)),
         gabarito=['Bloco 1: exemplo: encha o copo até a metade.', 'Bloco 2: exemplo: ver o horário, separar cadernos, guardar estojo, colocar lanche.',
                   'Bloco 3: entradas: preço e valor pago (números); saída: troco (número).', 'Domina com 3 acertos; em desenvolvimento com 2; retomar com 1 ou nenhum.'],
         adaptar='Leia as questões em voz alta e aceite respostas orais registradas pelo professor.'),

    # =================== 3º bimestre ===================
    aula(n=17, bim=3, titulo='Casos parecidos', habs=['EF06CO06'],
         objetivo='Comparar casos particulares de um mesmo problema e perceber o que fica igual e o que muda.',
         material='Palitos ou tampinhas e a folha do estudante.',
         passos=['Mesas (15 min): com palitos, montem 1, 2 e 3 mesas com 4 cadeiras cada. Anotem na tabela.',
                 'Comparação (10 min): o que fica igual em todos os casos? O que muda?', 'Folha (20 min).',
                 'Fechamento (5 min): o que muda é o que vamos chamar de parâmetro.'],
         turma='Muitos problemas são parecidos: só muda um número. Comparando os casos, descobrimos o que fica igual e o que muda. '
               'Quem descobre o padrão consegue resolver qualquer caso, até os que ainda não apareceram.',
         atividade=bloco(1, 'Complete a tabela das mesas.', tabela(['Mesas', '1', '2', '3', '4', '10'], [['Cadeiras', '4', '8', '', '', '']])) +
                   bloco(2, 'O que fica igual? O que muda?', escrever(2)),
         gabarito=['Bloco 1: 12, 16, 40.', 'Bloco 2: fica igual: 4 cadeiras por mesa; muda: o número de mesas.'],
         jogo='um-algoritmo-para-todos',
         adaptar='Monte as mesas com material concreto e conte junto com o estudante.'),
    aula(n=18, bim=3, titulo='Parâmetros: um algoritmo para todos', habs=['EF06CO06'],
         objetivo='Criar um algoritmo com parâmetro que resolve todos os casos de um problema.',
         material='Quadro e a folha do estudante.',
         passos=['Retomada (10 min): a tabela das mesas.', 'Algoritmo (15 min): "receba M; cadeiras = M × 4; mostre cadeiras". Testem com vários M.',
                 'Folha (20 min).', 'Fechamento (5 min): o parâmetro é a entrada que muda de um caso para outro.'],
         turma='Em vez de escrever um programa para cada caso, escrevemos um só, com um parâmetro. O parâmetro é a parte que muda, e o algoritmo funciona para qualquer valor que entrar nele.',
         atividade=bloco(1, 'Escreva um algoritmo para o polígono de N lados.', codigo('procedimento polígono(N):', '&nbsp;&nbsp;repita ___ vezes [ande 50, gire ___ ]')) +
                   bloco(2, 'Use o seu algoritmo: quanto gira o polígono de 3, 4, 5 e 6 lados?', tabela(['N', '3', '4', '5', '6'], [['Giro', '', '', '', '']])) +
                   bloco(3, 'Escreva um algoritmo com parâmetro para o número de fatias de pizza: 2 por pessoa.', escrever(2)),
         gabarito=['Bloco 1: repita N vezes [ande 50, gire 360 ÷ N].', 'Bloco 2: 120, 90, 72, 60.', 'Bloco 3: receba P; fatias = P × 2; mostre fatias.'],
         jogo='um-algoritmo-para-todos',
         adaptar='Permita usar calculadora para os giros e tenha os polígonos recortados em papel.'),
    aula(n=19, bim=3, titulo='Jogo: Um Algoritmo para Todos', habs=['EF06CO06'],
         objetivo='Praticar a generalização com parâmetros no jogo.',
         material='Dispositivos com o jogo Um Algoritmo para Todos e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): o que era o parâmetro em cada fase?'],
         turma='No jogo, as escadas mudam de tamanho, mas o programa é o mesmo. Descubra o que muda e use isso como parâmetro.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)) +
                   bloco(2, 'Escreva o programa da escada de N degraus.', escrever(1)) +
                   bloco(3, 'Invente um problema que tenha parâmetro e escreva o algoritmo.', escrever(3)),
         gabarito=['Bloco 1: depende do estudante (8 fases).', 'Bloco 2: repita N vezes [direita, baixo].', 'Bloco 3: resposta livre.'],
         jogo='um-algoritmo-para-todos',
         adaptar='O jogo tem leitura e voz. Faça duplas de leitura quando necessário.'),
    aula(n=20, bim=3, titulo='A informação em pedaços', habs=['EF06CO07'],
         objetivo='Entender que a informação é quebrada em pacotes numerados para viajar pela internet.',
         material='Uma frase escrita em tiras de papel (uma palavra por tira), envelopes e a folha do estudante.',
         passos=['Correio (20 min): divida uma mensagem em tiras numeradas, entregue a estudantes em lugares diferentes da sala, que passam de mão em mão até o destino.',
                 'Montagem (5 min): o destino remonta pela numeração. E se faltar uma tira?', 'Folha (20 min).',
                 'Fechamento (5 min): na internet, as mensagens, fotos e vídeos viajam assim, em pacotes.'],
         turma='Na internet, uma mensagem não vai inteira. Ela é quebrada em pacotes, cada um com número, origem e destino. Os pacotes passam por vários equipamentos, '
               'podem ir por caminhos diferentes e chegar fora de ordem. No destino, são montados pela numeração. Se faltar um, ele é pedido de novo.',
         atividade=bloco(1, 'Os pacotes chegaram fora de ordem. Monte a mensagem.',
                         tabela(['Pacote', '3', '1', '4', '2'], [['Conteúdo', 'amanhã', 'A prova', 'cedo.', 'é']])) + escrever(1) +
                   bloco(2, 'Por que cada pacote leva um número?', escrever(2)),
         gabarito=['Bloco 1: A prova é amanhã cedo.', 'Bloco 2: para o destino montar na ordem certa e perceber se algum pacote se perdeu.'],
         jogo='pacotes',
         adaptar='Use tiras com letra ampliada ou em braille e deixe o estudante ordenar com as mãos.'),
    aula(n=21, bim=3, titulo='Jogo: Correio de Pacotes', habs=['EF06CO07'],
         objetivo='Remontar mensagens e pedir de novo os pacotes perdidos.',
         material='Dispositivos com o jogo Correio de Pacotes (e, se der tempo, Mágica da Paridade) e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): como o computador sabe que um pacote se perdeu ou chegou com erro?'],
         turma='No Correio de Pacotes, as mensagens chegam picadas e fora de ordem. Use os números para montar e peça de novo o que faltar.',
         atividade=bloco(1, 'Anote uma mensagem que você montou e quantos pacotes ela tinha.', escrever(2)) +
                   bloco(2, 'Bit de paridade: escreva 0 ou 1 no fim de cada linha para que o total de 1 fique par.', tabela(['Dados', 'Paridade'], [['1 0 1 0', ''], ['1 1 1 0', ''], ['0 0 0 1', '']])),
         gabarito=['Bloco 1: resposta livre.', 'Bloco 2: 0; 1; 1.'],
         jogo='pacotes',
         adaptar='Faça duplas e permita conferir os pacotes em voz alta.'),
    aula(n=22, bim=3, titulo='Arquivos e pastas', habs=['EF06CO08'],
         objetivo='Armazenar, organizar e recuperar arquivos em pastas com nomes claros.',
         material='Computador ou celular com gerenciador de arquivos (ou cartões que simulam pastas) e a folha do estudante.',
         passos=['Bagunça (10 min): mostre uma pasta com arquivos "foto1", "novo", "trabalho final final". Dá para achar?',
                 'Organização (15 min): a turma cria pastas por disciplina e nomes com data e assunto.', 'Folha (20 min).',
                 'Fechamento (5 min): a extensão (.pdf, .jpg, .docx) diz o tipo do arquivo.'],
         turma='Um arquivo guarda um documento, uma foto, um vídeo ou uma música. Pastas organizam os arquivos como gavetas. '
               'Um bom nome diz o que é e quando foi feito. A extensão, depois do ponto, mostra o tipo do arquivo.',
         atividade=bloco(1, 'Escreva em que pasta cada arquivo vai e dê um nome melhor.',
                         tabela(['Arquivo', 'Pasta', 'Nome melhor'], [['foto1.jpg (passeio ao museu)', '', ''], ['trabalho.docx (Ciências, água)', '', ''],
                                                                      ['novo.pdf (prova de Matemática)', '', '']])) +
                   bloco(2, 'Ligue a extensão ao tipo: .mp3 / .jpg / .pdf / .mp4 → vídeo, música, documento, imagem.', escrever(1)),
         gabarito=['Bloco 1: exemplos: Passeios/2026-09-museu.jpg; Ciências/2026-05-agua.docx; Matemática/2026-06-prova.pdf.',
                   'Bloco 2: .mp3 música; .jpg imagem; .pdf documento; .mp4 vídeo.'],
         adaptar='Use pastas de papel coloridas e cartões de arquivo para organizar com as mãos.'),
    aula(n=23, bim=3, titulo='Compactar e recuperar', habs=['EF06CO08'],
         objetivo='Compreender a compactação de arquivos e formas de recuperar arquivos (lixeira, cópia, nuvem).',
         material='Quadro e a folha do estudante.',
         passos=['Compactação (15 min): escreva "AAAAABBBCCCC" e mostre "5A3B4C". Ficou menor e dá para voltar ao original.',
                 'Recuperar (10 min): o que fazer quando apagamos um arquivo sem querer? Lixeira, cópia de segurança, histórico na nuvem.',
                 'Folha (20 min).', 'Fechamento (5 min): o arquivo .zip junta e compacta vários arquivos num só.'],
         turma='Compactar é guardar a mesma informação ocupando menos espaço. Um jeito simples é contar as repetições: em vez de AAAAA, escrevemos 5A. '
               'Para recuperar arquivos, ajudam a lixeira, as cópias de segurança e as versões guardadas na nuvem.',
         atividade=bloco(1, 'Compacte contando as repetições.', tabela(['Original', 'Compactado'], [['PPPPPBBB', ''], ['AAAAAAAAOO', ''], ['XXXYYYYYYZ', '']])) +
                   bloco(2, 'Descompacte: 3B2P4B', escrever(1)) +
                   bloco(3, 'Você apagou o trabalho sem querer. Escreva dois jeitos de tentar recuperar.', escrever(2)),
         gabarito=['Bloco 1: 5P3B; 8A2O; 3X6Y1Z.', 'Bloco 2: BBBPPBBBB.', 'Bloco 3: olhar a lixeira; usar a cópia de segurança ou a versão salva na nuvem.'],
         jogo='bingo',
         adaptar='Use fichas coloridas enfileiradas para compactar e descompactar com as mãos.'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF06CO06', 'EF06CO07', 'EF06CO08'],
         objetivo='Verificar o que a turma aprendeu sobre generalização, transmissão e arquivos.',
         material='A folha de avaliação e, no fim, o Bingo de Informática.',
         passos=['Avaliação (30 min).', 'Bingo de Informática (15 min).', 'Correção coletiva (5 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre parâmetros, pacotes e arquivos. Depois, bingo.',
         atividade=bloco(1, '1 caixa tem 6 ovos, 2 caixas têm 12, 3 caixas têm 18. Escreva o algoritmo com parâmetro.', escrever(1)) +
                   bloco(2, 'Monte a mensagem: pacote 2 "chega", pacote 3 "hoje", pacote 1 "O livro".', escrever(1)) +
                   bloco(3, 'Compacte: MMMMNNN. Descompacte: 2R5S.', escrever(1)),
         gabarito=['Bloco 1: receba C; ovos = C × 6; mostre ovos.', 'Bloco 2: O livro chega hoje.', 'Bloco 3: 4M3N; RRSSSSS.',
                   'Domina com 3 acertos; em desenvolvimento com 2; retomar com 1 ou nenhum.'],
         jogo='bingo',
         adaptar='Leia as questões em voz alta e aceite respostas orais registradas pelo professor.'),

    # =================== 4º bimestre ===================
    aula(n=25, bim=4, titulo='Conversa com respeito', habs=['EF06CO09'],
         objetivo='Usar conduta e linguagem apropriadas ao se comunicar em ambiente digital.',
         material='Mensagens fictícias de grupo projetadas ou impressas e a folha do estudante.',
         passos=['Leitura (15 min): a turma lê mensagens de um grupo fictício e marca as que respeitam e as que ofendem.',
                 'Reescrita (10 min): como dizer a mesma coisa com respeito?', 'Folha (20 min).',
                 'Fechamento (5 min): do outro lado da tela tem uma pessoa.'],
         turma='No ambiente digital valem as mesmas regras de respeito da vida fora da tela. Mensagens escritas não mostram o tom de voz, '
               'por isso é preciso cuidado com as palavras, com letras maiúsculas (parecem grito) e com piadas que podem ferir.',
         atividade=bloco(1, 'Respeitosa (R) ou não (N)? Reescreva as que forem N.',
                         tabela(['Mensagem', 'R ou N', 'Como ficaria'], [['QUEM FEZ ESSE TRABALHO HORRÍVEL?', '', ''], ['Pessoal, amanhã tem prova, bons estudos!', '', ''],
                                                                          ['Ninguém chama o Léo, ele é chato.', '', '']])) +
                   bloco(2, 'Escreva três regras para o grupo de mensagens da turma.', escrever(3)),
         gabarito=['Bloco 1: N, R, N; reescritas livres (ex.: "Quem fez o trabalho? Tenho uma sugestão."; "Vamos chamar todo mundo.").', 'Bloco 2: resposta livre.'],
         adaptar='Leia as mensagens em voz alta e discuta em pequenos grupos antes de escrever.'),
    aula(n=26, bim=4, titulo='Ética, cyberbullying e privacidade', habs=['EF06CO09'],
         objetivo='Reconhecer o cyberbullying e agir com ética e cuidado com a privacidade.',
         material='Situações em cartões e a folha do estudante.',
         passos=['Situações (20 min): em grupos, cada um recebe uma situação e decide o que fazer (bloquear, guardar provas, contar a um adulto, não repassar).',
                 'Apresentação (5 min).', 'Folha (20 min).', 'Fechamento (5 min): onde pedir ajuda na escola e fora dela.'],
         turma='Cyberbullying é ofender, humilhar ou excluir alguém repetidamente pela internet. Quem vê e repassa também participa. '
               'Para ajudar: não repassar, apoiar a pessoa, guardar provas e contar a um adulto de confiança. Também não se publica foto ou dado de outra pessoa sem permissão.',
         atividade=bloco(1, 'O que você faria?', tabela(['Situação', 'O que fazer'], [['Recebi um meme zoando um colega.', ''], ['Pediram minha senha "só para ver".', ''],
                                                                                      ['Querem postar uma foto minha sem eu deixar.', '']])) +
                   bloco(2, 'Escreva uma mensagem de apoio para alguém que sofreu cyberbullying.', escrever(2)),
         gabarito=['Bloco 1: não repassar e avisar um adulto; não passar a senha; pedir para não postar e, se postarem, pedir para tirar e contar a um adulto.',
                   'Bloco 2: resposta livre, com respeito e oferta de ajuda.'],
         jogo='vila-cidada',
         adaptar='Permita respostas orais e use cartões com símbolos de ação (parar, contar, apoiar).'),
    aula(n=27, bim=4, titulo='Jogo: Vila Cidadã', habs=['EF06CO09'],
         objetivo='Praticar decisões éticas no ambiente digital.',
         material='Dispositivos com o jogo Vila Cidadã e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): qual situação do jogo já aconteceu com vocês?'],
         turma='Na Vila Cidadã, você ajuda moradores em situações de respeito, privacidade, autoria e checagem. Pense antes de escolher.',
         atividade=bloco(1, 'Escolha uma situação do jogo e escreva o que você decidiu e por quê.', escrever(3)) +
                   bloco(2, 'Crie um cartaz-regra para a convivência digital da turma.', escrever(2)),
         gabarito=['Blocos 1 e 2: respostas livres; confira se a decisão protege as pessoas envolvidas.'],
         jogo='vila-cidada',
         adaptar='Faça duplas de leitura e ofereça o cartaz com moldura pronta.'),
    aula(n=28, bim=4, titulo='De onde vem o meu celular?', habs=['EF06CO10'],
         objetivo='Analisar a produção dos recursos tecnológicos: matérias-primas, energia e trabalho.',
         material='Imagem de um celular desmontado (ou um aparelho velho) e a folha do estudante.',
         passos=['Desmontar (15 min): que materiais formam um celular? Metais, plástico, vidro, bateria.',
                 'Caminho (10 min): mineração, fábrica, transporte, loja. Quanto de energia e trabalho!', 'Folha (20 min).',
                 'Fechamento (5 min): cada aparelho novo usa muitos recursos da natureza.'],
         turma='Um celular tem dezenas de materiais, alguns retirados de minas em vários países. Para fabricar, transportar e vender, '
               'gasta-se muita energia e água. Por isso, usar o aparelho por mais tempo é uma escolha que ajuda o planeta.',
         atividade=bloco(1, 'Escreva as etapas da vida de um celular, da mina ao descarte.', escrever(3)) +
                   bloco(2, 'Escreva duas atitudes para o seu aparelho durar mais.', escrever(2)),
         gabarito=['Bloco 1: extração de matérias-primas, fabricação, transporte, venda, uso, descarte ou reciclagem.',
                   'Bloco 2: exemplos: usar capinha e película, cuidar da bateria, consertar em vez de trocar.'],
         jogo='linha-tempo',
         adaptar='Leve um aparelho velho desmontado para explorar com as mãos (sem a bateria).'),
    aula(n=29, bim=4, titulo='Obsolescência e lixo eletrônico', habs=['EF06CO10'],
         objetivo='Compreender a obsolescência e o descarte correto do lixo eletrônico.',
         material='Quadro e a folha do estudante.',
         passos=['Pergunta (10 min): por que trocamos de celular? Quebrou, ficou lento, saiu um novo?',
                 'Obsolescência (15 min): quando o aparelho fica ultrapassado (de propósito ou não) e o lixo eletrônico que isso gera.', 'Folha (20 min).',
                 'Fechamento (5 min): onde descartar pilhas, baterias e aparelhos na cidade.'],
         turma='Obsolescência é quando um aparelho fica ultrapassado: não recebe mais atualizações, não tem peça para conserto ou a moda muda. '
               'O lixo eletrônico tem metais que poluem a terra e a água. Ele deve ir para pontos de coleta, e não para o lixo comum.',
         atividade=bloco(1, 'Certo ou errado?', tabela(['Atitude', 'C ou E'], [['Jogar pilha no lixo comum.', ''], ['Levar o celular velho a um ponto de coleta.', ''],
                                                                          ['Trocar de celular todo ano só porque saiu um novo.', ''], ['Doar o computador que ainda funciona.', '']])) +
                   bloco(2, 'Pesquise ou pergunte: onde há ponto de coleta de lixo eletrônico perto da escola?', escrever(1)),
         gabarito=['Bloco 1: E, C, E, C.', 'Bloco 2: resposta conforme a cidade.'],
         jogo='linha-tempo',
         adaptar='Use imagens das atitudes e cartões C e E para levantar.'),
    aula(n=30, bim=4, titulo='Jogo: Linha do Tempo da Computação', habs=['EF06CO10'],
         objetivo='Perceber a mudança rápida da tecnologia ao longo do tempo.',
         material='Dispositivos com o jogo Linha do Tempo da Computação e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): a tecnologia muda cada vez mais rápido. E o lixo eletrônico?'],
         turma='Na Linha do Tempo, você organiza as invenções da computação. Repare como o tempo entre uma novidade e outra fica cada vez menor.',
         atividade=bloco(1, 'Escreva três invenções do jogo em ordem, com o ano.', escrever(3)) +
                   bloco(2, 'Que aparelho da sua casa já ficou ultrapassado? O que foi feito com ele?', escrever(2)),
         gabarito=['Bloco 1: confira a ordem com os anos do jogo.', 'Bloco 2: resposta livre.'],
         jogo='linha-tempo',
         adaptar='Faça duplas de leitura e use uma linha do tempo de barbante na sala.'),
    aula(n=31, bim=4, titulo='Projeto: campanha da tecnologia consciente', habs=['EF06CO09', 'EF06CO10'],
         objetivo='Criar uma campanha para a escola sobre conduta digital respeitosa e consumo consciente.',
         material='Cartolinas, canetas e a folha do estudante.',
         passos=['Planejamento (15 min): cada grupo escolhe um tema (respeito, privacidade, durabilidade, lixo eletrônico).',
                 'Produção (25 min): cartaz ou roteiro de vídeo curto.', 'Apresentação (10 min).'],
         turma='Agora é a vez de vocês ensinarem a escola. A campanha precisa ter uma mensagem curta, uma ação que as pessoas possam fazer e respeito com todos.',
         atividade=bloco(1, 'Ficha do projeto.', tabela(['Item', 'Resposta'], [['Tema', ''], ['Mensagem principal', ''], ['Ação proposta', ''], ['Público', ''], ['Formato (cartaz, vídeo)', '']])),
         gabarito=['Bloco 1: resposta livre; avalie clareza, respeito e ação possível.'],
         adaptar='Distribua papéis no grupo (escrita, desenho, apresentação) conforme as habilidades de cada um.'),
    aula(n=32, bim=4, titulo='Avaliação final e festa dos jogos', habs=['EF06CO01', 'EF06CO02', 'EF06CO03', 'EF06CO04', 'EF06CO05', 'EF06CO06', 'EF06CO07', 'EF06CO08', 'EF06CO09', 'EF06CO10'],
         objetivo='Verificar as aprendizagens do ano e jogar os jogos preferidos.',
         material='A folha de avaliação e os jogos do ano.',
         passos=['Avaliação (25 min).', 'Festa dos jogos e roda final (25 min).'],
         turma='Fim do 6º ano: mostramos o que aprendemos e depois jogamos.',
         atividade=bloco(1, 'Tipo de dado: 3,14 ___ &nbsp; "Ana" ___ &nbsp; 01/01/2027 ___ &nbsp; "chegou? sim" ___', '') +
                   bloco(2, 'Escreva com repetição: direita, baixo, direita, baixo, direita, baixo.', escrever(1)) +
                   bloco(3, 'Cada pacote de figurinhas tem 5 figurinhas. Escreva o algoritmo com parâmetro.', escrever(1)) +
                   bloco(4, 'Compacte: AAAABBBBBB.', '') +
                   bloco(5, 'Cite uma atitude de respeito na internet e uma de consumo consciente.', escrever(2)),
         gabarito=['Bloco 1: número, texto, data, lógico. Bloco 2: repita 3 vezes [direita, baixo].', 'Bloco 3: receba P; figurinhas = P × 5; mostre figurinhas. Bloco 4: 4A6B.',
                   'Bloco 5: exemplos: não repassar ofensas; consertar o aparelho em vez de trocar.', 'Domina com 4 ou 5 acertos; retomar com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos, com leitura em voz alta para quem precisa.'),
]
