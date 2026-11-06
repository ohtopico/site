"""4º ano: ano letivo de Computação (BNCC EF04CO01 a EF04CO08), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
No 4º ano as folhas têm instruções escritas e as respostas misturam escrita curta, tabelas, matrizes, setas e cartas de bolinhas.
"""
from folhas import (bloco, lado, cartas_binario, certo_errado, circular, desenho, escrever, figs, grade_coord, ligar, malha, numerar, setas,
                    vagas_setas, tabela)

ANO = 4
TITULO = 'Computação no 4º ano'
RESUMO = ('Um ano letivo completo de Computação para o 4º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, mais oito jogos.')
APRESENTACAO = [
    'No 4º ano, a turma descobre como o computador organiza e guarda as informações: em matrizes (linhas e colunas, como a tela e a planilha), '
    'em registros (fichas com campos), em números, em zeros e uns e em cores de luz. Também cria algoritmos com repetições dentro de repetições, '
    'produz conteúdos com ferramentas digitais, cuida dos dados das pessoas e aprende a checar se uma fonte é confiável.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada, uma folha para imprimir e, em várias, um jogo. '
    'Os jogos do 4º ano têm instruções curtas escritas, que também podem ser ouvidas pelo botão do alto-falante.',
]
BIMESTRES = [
    ('Matrizes e registros', 'Localizar e manipular elementos em matrizes por coordenadas e organizar informações em registros com campos.'),
    ('Repetições dentro de repetições', 'Criar, simular e corrigir algoritmos com repetições simples e aninhadas, definidas e indefinidas.'),
    ('Codificação da informação', 'Entender que o computador codifica tudo em números e representar informações em binário, com códigos de letras e com cores RGB.'),
    ('Criar, cuidar e checar', 'Criar conteúdos com ferramentas digitais, agir com ética com os dados das pessoas e verificar a confiabilidade das fontes.'),
]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


AULAS = [
    # =================== 1º bimestre ===================
    aula(n=1, bim=1, titulo='Linhas e colunas', habs=['EF04CO01'],
         objetivo='Reconhecer uma matriz (organização em linhas e colunas) e localizar elementos por coordenadas.',
         material='Fita crepe para marcar uma grade no chão ou a disposição das carteiras, cartões com letras e números e a folha do estudante.',
         passos=['A sala é uma matriz (15 min): nomeie as filas de carteiras com letras e as posições com números. Cada criança diz a sua coordenada (C2, por exemplo).',
                 'Troca-troca (10 min): chame "B3 troca com D1". As crianças trocam de lugar.',
                 'Folha (15 min).',
                 'Fechamento (10 min): onde mais existem matrizes? Calendário, tabuleiro de xadrez, planilha, a tela do celular.'],
         turma='Uma matriz organiza as coisas em linhas e colunas. Cada lugar tem um endereço, a coordenada: a letra da coluna e o número da linha. '
               'O calendário, o tabuleiro e a planilha são matrizes. A tela do computador também: ela é feita de milhões de quadradinhos, cada um no seu lugar.',
         atividade=bloco(1, 'Escreva a coordenada de cada figura.', grade_coord(4, 4, {'B1': 'gato', 'D3': 'bola', 'A4': 'flor', 'C2': 'sol'}) +
                         tabela(['Figura', 'Coordenada'], [[figs(['gato'], 8), ''], [figs(['bola'], 8), ''], [figs(['flor'], 8), ''], [figs(['sol'], 8), '']])) +
                   bloco(2, 'Desenhe uma estrela em C4 e um coração em A2 na matriz acima.', ''),
         gabarito=['Bloco 1: gato B1, bola D3, flor A4, sol C2.', 'Bloco 2: estrela na coluna C, linha 4; coração na coluna A, linha 2.'],
         jogo='mapa-do-tesouro',
         adaptar='Para estudantes cegos, use uma grade em relevo (EVA colado) com letras e números em braille ou em alto-relevo. Para quem confunde linha e coluna, pinte a linha de uma cor e a coluna de outra.'),
    aula(n=2, bim=1, titulo='Jogo: Mapa do Tesouro', habs=['EF04CO01'],
         objetivo='Localizar, marcar e identificar elementos de uma matriz pelas coordenadas.',
         material='Dispositivos com o jogo Mapa do Tesouro, folha do estudante e lápis.',
         passos=['Batalha naval de papel (15 min): em duplas, cada um esconde três barcos na matriz da folha. Os dois tentam acertar dizendo coordenadas.',
                 'Jogo (25 min): Mapa do Tesouro.',
                 'Conversa (10 min): qual estratégia ajudou a achar os barcos mais rápido?'],
         turma='Na batalha naval, você não vê os barcos do colega. Mas, dizendo a coordenada, descobre se acertou. No jogo do tesouro, você usa as coordenadas para marcar, achar e mover objetos.',
         atividade=bloco(1, 'Esconda 3 barcos (pinte 3 casas). Marque com X as coordenadas que o colega disser.', grade_coord(5, 5, cel=13)) +
                   bloco(2, 'Anote as coordenadas que você tentou.', escrever(2)),
         gabarito=['Não há resposta única. Observe se a criança marca as casas certas para cada coordenada dita.'],
         jogo='mapa-do-tesouro',
         adaptar='Em duplas mistas, uma criança lê a coordenada e a outra marca. A batalha pode ser feita com tampinhas numa grade em relevo.'),
    aula(n=3, bim=1, titulo='Mexendo na matriz', habs=['EF04CO01'],
         objetivo='Fazer manipulações simples numa matriz: mover, trocar e preencher elementos.',
         material='Grade no chão ou no quadro, objetos pequenos e a folha do estudante.',
         passos=['Instruções de movimento (15 min): o gato está em A1. Ande 2 colunas para a direita. Onde ele está? (C1). Faça várias rodadas.',
                 'Trocar (10 min): troque o conteúdo de B2 com D4. O que mudou?',
                 'Folha (15 min).',
                 'Fechamento (10 min): nos jogos, quando o personagem anda, o computador muda a coordenada dele na matriz.'],
         turma='Num jogo, o personagem anda pela tela. Para o computador, isso é mudar a coordenada dele: andar para a direita é ir para a próxima coluna; descer é ir para a próxima linha.',
         atividade=bloco(1, 'O robô está em A1. Siga as ordens e escreva onde ele termina.', grade_coord(5, 4, {'A1': 'robo'}, cel=12) +
                         tabela(['Ordem', 'Onde está'], [['2 colunas para a direita', ''], ['2 linhas para baixo', ''], ['1 coluna para a esquerda', '']])) +
                   bloco(2, 'Troque: o que estava em B2 vai para D3, e o que estava em D3 vai para B2. Desenhe como fica.', grade_coord(4, 3, {'B2': 'peixe', 'D3': 'maca'}, cel=12) +
                         grade_coord(4, 3, cel=12)),
         gabarito=['Bloco 1: C1, depois C3, depois B3.', 'Bloco 2: a maçã em B2 e o peixe em D3.'],
         jogo='mapa-do-tesouro',
         adaptar='Use um objeto de verdade sobre a grade do chão para quem precisa de apoio concreto. Leia as ordens em voz alta uma de cada vez.'),
    aula(n=4, bim=1, titulo='A imagem é uma matriz', habs=['EF04CO01', 'EF04CO05'],
         objetivo='Perceber que uma imagem digital é uma matriz de pixels e criar uma imagem a partir de coordenadas.',
         material='Papel quadriculado, lápis de cor, uma imagem ampliada até aparecerem os quadradinhos e a folha do estudante.',
         passos=['De perto (10 min): mostre uma imagem ampliada no computador até aparecerem os quadradinhos (pixels).',
                 'Pintar por coordenadas (25 min): a turma pinta a folha seguindo a lista.',
                 'Criar (10 min): cada criança cria um desenho e escreve a lista de coordenadas para um colega.',
                 'Fechamento (5 min): cada pixel tem uma posição e uma cor.'],
         turma='Quando aproximamos muito uma foto no computador, vemos que ela é feita de quadradinhos coloridos, os pixels. '
               'Cada pixel tem uma posição na matriz (a coordenada) e uma cor. Guardar uma imagem é guardar a cor de cada pixel.',
         atividade=bloco(1, 'Pinte de vermelho: B1, D1, A2, B2, C2, D2, E2, B3, C3, D3, C4.', grade_coord(5, 4, cel=14)) +
                   bloco(2, 'Que desenho apareceu?', escrever(1)) +
                   bloco(3, 'Crie o seu desenho com 6 pixels e escreva as coordenadas.', escrever(2)),
         gabarito=['Bloco 1 e 2: aparece um coração.', 'Bloco 3: resposta livre; confira se as coordenadas correspondem ao desenho.'],
         jogo='mapa-do-tesouro',
         adaptar='Para estudantes com baixa visão, use quadrados de 2 cm e canetas grossas. Estudantes cegos podem colar bolinhas de papel nas casas indicadas.'),
    aula(n=5, bim=1, titulo='Fichas e registros', habs=['EF04CO02'],
         objetivo='Reconhecer registros: fichas em que cada informação tem um nome (campo) e um valor.',
         material='Exemplos de fichas (de biblioteca, de cadastro, figurinha com dados de jogador) e a folha do estudante.',
         passos=['Fichas da vida real (15 min): mostre as fichas. O que elas têm em comum? Cada informação tem um nome: nome, idade, altura.',
                 'Campo e valor (10 min): no quadro, monte a ficha de um personagem conhecido. "nome" é o campo; "Mônica" é o valor.',
                 'Folha (15 min).',
                 'Fechamento (10 min): o computador guarda o cadastro de cada aluno da escola como um registro.'],
         turma='Uma ficha guarda informações sobre uma coisa ou uma pessoa. Cada informação tem um nome, que chamamos de campo, e um valor. '
               'No campo "idade" da ficha da Ana, o valor é 9. O conjunto de campos de uma ficha é um registro. O computador usa registros o tempo todo.',
         atividade=bloco(1, 'Leia o registro e responda.', tabela(['Campo', 'Valor'], [['nome', 'Bolinha'], ['animal', 'tartaruga'], ['idade', '12 anos'], ['come', 'folhas e frutas']]) +
                         '<p>a) Qual é o valor do campo "animal"? ______________</p><p>b) Qual campo tem o valor "12 anos"? ______________</p>') +
                   bloco(2, 'Preencha o seu registro.', tabela(['Campo', 'Valor'], [['nome', ''], ['idade', ''], ['comida preferida', ''], ['brincadeira preferida', '']])),
         gabarito=['Bloco 1: a) tartaruga; b) idade.', 'Bloco 2: respostas pessoais. Confira se cada valor está no campo certo.'],
         jogo='fichas-dos-bichos',
         adaptar='Fichas com figuras ao lado de cada campo ajudam quem ainda lê com dificuldade. Estudantes surdos podem ter um campo "sinal" com o sinal do nome em Libras.'),
    aula(n=6, bim=1, titulo='Criando registros', habs=['EF04CO02'],
         objetivo='Definir campos e criar registros para um conjunto de objetos.',
         material='Cartões em branco, figuras de animais ou personagens e dispositivos com o jogo Fichas dos Bichos.',
         passos=['Escolher os campos (10 min): a turma vai fazer fichas dos bichos. Que campos todas as fichas devem ter?',
                 'Produção (15 min): cada dupla preenche duas fichas com os mesmos campos.',
                 'Jogo (15 min): Fichas dos Bichos.',
                 'Conversa (10 min): por que é importante que todas as fichas tenham os mesmos campos?'],
         turma='Quando todas as fichas têm os mesmos campos, fica fácil comparar e procurar. Se a ficha do gato tem "patas" e a do peixe não tem, como sabemos quem tem mais patas?',
         atividade=bloco(1, 'Escolha 4 campos e preencha dois registros de bichos.', tabela(['Campo', 'Bicho 1', 'Bicho 2'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']])) +
                   bloco(2, 'Escreva uma pergunta que dá para responder olhando os seus registros.', escrever(2)),
         gabarito=['Bloco 1: resposta livre. Campos possíveis: nome, patas, onde mora, o que come, tamanho.', 'Bloco 2: por exemplo "Qual bicho tem mais patas?".'],
         jogo='fichas-dos-bichos',
         adaptar='Ofereça uma lista de campos para escolher, para quem tem dificuldade em criar do zero.'),
    aula(n=7, bim=1, titulo='Procurar e atualizar registros', habs=['EF04CO02'],
         objetivo='Buscar informações em um conjunto de registros e atualizar valores.',
         material='Fichas da biblioteca da sala (livros com título, autor, emprestado para) e a folha do estudante.',
         passos=['Biblioteca da turma (20 min): cada livro tem uma ficha. A turma faz empréstimos e atualiza o campo "emprestado para".',
                 'Buscas (10 min): quais livros estão emprestados? Quem pegou o livro de dinossauros?',
                 'Folha (15 min).',
                 'Fechamento (5 min): o sistema da biblioteca faz a mesma coisa no computador.'],
         turma='Quando alguém pega um livro, o valor do campo "emprestado para" muda. Isso é atualizar o registro. '
               'Com os registros organizados, dá para responder perguntas rapidinho: quem está com tal livro? Quais livros estão na estante?',
         atividade=bloco(1, 'Registros da biblioteca.', tabela(['título', 'autor', 'emprestado para'], [['O Robô Azul', 'Lia Prado', '—'], ['Bichos do Mar', 'Rui Costa', 'Ana'], ['A Lua e Eu', 'Lia Prado', 'Theo']]) +
                         '<p>a) Quem está com "Bichos do Mar"? __________</p><p>b) Quais livros são da autora Lia Prado? __________________</p>') +
                   bloco(2, 'O Theo devolveu "A Lua e Eu" e a Bia pegou "O Robô Azul". Reescreva o campo "emprestado para" dos três livros.', escrever(3)),
         gabarito=['Bloco 1: a) Ana; b) O Robô Azul e A Lua e Eu.', 'Bloco 2: O Robô Azul: Bia; Bichos do Mar: Ana; A Lua e Eu: — (ninguém).'],
         jogo='fichas-dos-bichos',
         adaptar='Use fichas grandes recortadas para manipular, trocando o cartão do valor. Leia a tabela junto com quem precisa.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF04CO01', 'EF04CO02'],
         objetivo='Verificar se a criança localiza e manipula elementos numa matriz e lê e atualiza registros.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min): troca-troca na grade da sala.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre matrizes e registros.',
         atividade=bloco(1, 'Escreva a coordenada do peixe e da estrela.', grade_coord(4, 3, {'C1': 'peixe', 'A3': 'estrela'}, cel=12) + escrever(1)) +
                   bloco(2, 'A estrela andou 2 colunas para a direita. Qual é a nova coordenada?', escrever(1)) +
                   bloco(3, 'Leia o registro e responda.', tabela(['Campo', 'Valor'], [['nome', 'Kiko'], ['cor', 'verde'], ['patas', '2']]) +
                         '<p>Qual é o valor do campo "cor"? ______ &nbsp; Que campo tem o valor 2? ______</p>') +
                   bloco(4, 'Kiko aprendeu a falar "oi". Crie um novo campo e o valor.', escrever(1)),
         gabarito=['Bloco 1: peixe C1, estrela A3.', 'Bloco 2: C3.', 'Bloco 3: verde; patas.', 'Bloco 4: por exemplo campo "fala", valor "oi".',
                   'Critério: domina com 4 blocos certos; em desenvolvimento com 2 ou 3; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique com a grade em relevo e leitura em voz alta para quem precisa.'),

    # =================== 2º bimestre ===================
    aula(n=9, bim=2, titulo='Lembrando as repetições', habs=['EF04CO03'],
         objetivo='Retomar repetição definida (n vezes) e indefinida (até uma condição) e usar as duas num mesmo algoritmo.',
         material='Malha no chão, cartões de setas, cartões "3x" e "até a parede", e a folha do estudante.',
         passos=['Robô humano (15 min): monte programas que misturam "3 vezes" e "até a parede".',
                 'Comparar (10 min): em que situação cada uma é melhor?',
                 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Já conhecemos dois jeitos de repetir: "repita 3 vezes", quando sabemos quantas vezes, e "repita até", quando paramos numa condição. Agora vamos usar os dois no mesmo programa.',
         atividade=bloco(1, 'Escreva se a repetição é DEFINIDA (sabe quantas vezes) ou INDEFINIDA (até uma condição).',
                         tabela(['Repetição', 'Tipo'], [['Pular corda 10 vezes.', ''], ['Mexer o bolo até ficar liso.', ''], ['Dar 3 voltas na quadra.', ''], ['Ler até o fim do capítulo.', '']])) +
                   bloco(2, 'Faça um X onde o robô para.', malha(5, 4, [0, 0], paredes=[[4, 2]], cel=12) + setas([('d', 2), 'ate-b', 'ate-d'], tam=10)),
         gabarito=['Bloco 1: definida, indefinida, definida, indefinida.', 'Bloco 2: anda 2 (terceira coluna), desce até a borda (última linha) e vai para a direita até a borda: última linha, última casa.'],
         adaptar='Retome com o corpo antes do papel para quem precisa. Para estudantes com deficiência física, use um carrinho ou um boneco na malha.'),
    aula(n=10, bim=2, titulo='Repetir um grupo de passos', habs=['EF04CO03'],
         objetivo='Usar a repetição de um grupo de instruções (laço) para encurtar algoritmos.',
         material='Cartões de setas e cartões grandes de "repita __ vezes" com um espaço dentro, malha no chão e a folha do estudante.',
         passos=['A escada (15 min): o robô sobe uma escada: direita, cima, direita, cima... Qual grupo se repete? Coloque o grupo dentro do cartão "repita 4 vezes".',
                 'Danças (10 min): uma sequência de passos que se repete inteira (palma, pé, giro) vezes 3.',
                 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Às vezes não é um passo só que se repete, mas um grupo de passos. Direita e cima, direita e cima, direita e cima. '
               'Colocamos o grupo dentro de um laço: "repita 3 vezes: direita, cima". O laço deixa o programa curto e fácil de mudar.',
         atividade=bloco(1, 'Qual grupo se repete? Reescreva usando "repita __ vezes [ ]".', setas(['d', 'c', 'd', 'c', 'd', 'c'], tam=10) + escrever(1)) +
                   bloco(2, 'Escreva o programa com um laço para o robô subir a escada.', malha(5, 5, [0, 4], alvos=[[4, 0]], paredes=[[x, y] for y in range(5) for x in range(5) if (x, y) not in
                                                                                                                                  [(0, 4), (1, 4), (1, 3), (2, 3), (2, 2), (3, 2), (3, 1), (4, 1), (4, 0)]], cel=12) + escrever(1)),
         gabarito=['Bloco 1: repita 3 vezes [→ ↑].', 'Bloco 2: repita 4 vezes [→ ↑].'],
         jogo='laco-dentro-de-laco',
         adaptar='Use um barbante para "abraçar" os cartões que se repetem na mesa. Isso torna o laço concreto.'),
    aula(n=11, bim=2, titulo='Laço dentro de laço', habs=['EF04CO03'],
         objetivo='Reconhecer e criar repetições aninhadas (um laço dentro de outro).',
         material='Música com refrão, cartões de laço e a folha do estudante.',
         passos=['Dança aninhada (15 min): "repita 2 vezes [bata 3 palmas, gire]". Quantas palmas no total? E giros?',
                 'No papel (10 min): desenhe no quadro o laço de dentro e o de fora com cores diferentes.',
                 'Folha (20 min).', 'Fechamento (5 min): um relógio tem laços aninhados: 60 segundos dentro de cada minuto, 60 minutos dentro de cada hora.'],
         turma='Um laço pode ficar dentro de outro. "Repita 2 vezes: [bata 3 palmas e gire]". O laço de dentro faz as 3 palmas. O laço de fora repete tudo 2 vezes. '
               'No total, são 6 palmas e 2 giros. O relógio é assim: os segundos giram dentro de cada minuto.',
         atividade=bloco(1, 'Conte: "repita 3 vezes [ repita 2 vezes [palma] , pulo ]". Quantas palmas? Quantos pulos?', escrever(1)) +
                   bloco(2, 'Escreva com laço dentro de laço: → → → ↓ → → → ↓', escrever(2)) +
                   bloco(3, 'Invente uma dança com um laço dentro de outro.', escrever(2)),
         gabarito=['Bloco 1: 6 palmas e 3 pulos.', 'Bloco 2: repita 2 vezes [ repita 3 vezes [→] , ↓ ].', 'Bloco 3: resposta livre; confira se há um laço dentro do outro.'],
         jogo='laco-dentro-de-laco',
         adaptar='Use duas cores de barbante, uma para cada laço. Para estudantes surdos, as palmas podem virar sinais.'),
    aula(n=12, bim=2, titulo='Simular laços', habs=['EF04CO03'],
         objetivo='Simular algoritmos com laços (simples e aninhados) e prever o resultado.',
         material='A folha do estudante e uma tampinha por criança.',
         passos=['Aposta (10 min): projete um programa com laço e peça a previsão antes de executar.',
                 'Folha em duplas (30 min): um simula, o outro confere, depois trocam.',
                 'Correção (10 min).'],
         turma='Simular um laço é contar com cuidado: quantas vezes o grupo de dentro acontece? Use a tampinha e conte nos dedos as voltas do laço.',
         atividade=bloco(1, 'Faça um X onde o robô para: repita 2 vezes [→ → ↓].', malha(5, 4, [0, 0], cel=12)) +
                   bloco(2, 'Faça um X onde o robô para: repita 2 vezes [ repita 2 vezes [→] , ↑ ].', malha(5, 4, [0, 3], cel=12)) +
                   bloco(3, 'Quantas setas o robô executa no bloco 2?', escrever(1)),
         gabarito=['Bloco 1: anda 2 e desce 1, duas vezes: terceira linha, quinta casa.',
                   'Bloco 2: anda 2 e sobe 1, duas vezes: segunda linha, quinta casa.', 'Bloco 3: 6 setas (4 para a direita e 2 para cima).'],
         jogo='laco-dentro-de-laco',
         adaptar='Para quem se perde, risque cada volta do laço numa tabelinha ao lado (1ª volta, 2ª volta).'),
    aula(n=13, bim=2, titulo='Jogo: Laço Dentro de Laço', habs=['EF04CO03'],
         objetivo='Resolver desafios de programação com laços e limite de blocos.',
         material='Dispositivos com o jogo Laço Dentro de Laço e a folha do estudante.',
         passos=['Demonstração (10 min): mostre como abrir um grupo, colocar blocos dentro e fechar.',
                 'Jogo (25 min).', 'Registro (10 min).', 'Conversa (5 min): qual fase pediu laço dentro de laço?'],
         turma='No jogo, cada grupo de repetição conta como um bloco. Para caber no limite, encontre o pedaço do caminho que se repete.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 12)) +
                   bloco(2, 'Escreva o programa da fase mais difícil.', escrever(3)),
         gabarito=['Bloco 1: depende da criança (7 fases).', 'Bloco 2: resposta pessoal. A última fase pode ser: repita 4 vezes [ frente 4 vezes, girar para a direita ].'],
         jogo='laco-dentro-de-laco',
         adaptar='Em duplas, uma criança planeja no papel e a outra monta no jogo.'),
    aula(n=14, bim=2, titulo='Desenhar com laços', habs=['EF04CO03'],
         objetivo='Criar, em grupo, algoritmos com laços aninhados para desenhar figuras.',
         material='Papel quadriculado grande, canetas, e a folha do estudante.',
         passos=['Desafio (10 min): como desenhar um quadrado com "ande 3 quadradinhos" e "vire à direita"? Repita 4 vezes!',
                 'Grupos (25 min): cada grupo cria um algoritmo para uma figura (escada, ziguezague, quadrados lado a lado) com laços.',
                 'Troca (15 min): outro grupo executa no quadriculado.'],
         turma='Um quadrado é "ande 3, vire à direita", repetido 4 vezes. E se quisermos 3 quadrados? Colocamos esse laço dentro de outro. Assim desenham os programas de desenho.',
         atividade=bloco(1, 'Começando no lápis e andando para cima, desenhe: repita 4 vezes [ande 3 quadradinhos, vire à direita].', malha(10, 7, [1, 5], pers='lapis', cel=8)) +
                   bloco(2, 'Escreva o algoritmo do seu grupo.', escrever(4)),
         gabarito=['Bloco 1: um quadrado de lado 3.', 'Bloco 2: resposta do grupo; confira se o laço aninhado gera a figura combinada.'],
         adaptar='Estudantes cegos podem executar o algoritmo com o corpo num tapete quadriculado ou com um carrinho numa grade em relevo.'),
    aula(n=15, bim=2, titulo='Consertando laços', habs=['EF04CO03'],
         objetivo='Encontrar e corrigir erros em algoritmos com laços.',
         material='A folha do estudante.',
         passos=['Erro no quadro (15 min): mostre um laço que devia fazer um quadrado mas faz uma linha. O que falta?',
                 'Folha (25 min).', 'Correção (10 min).'],
         turma='Um erro dentro de um laço se repete todas as vezes. Por isso, é importante testar uma volta antes de repetir. Se uma volta dá certo, as outras também dão.',
         atividade=bloco(1, 'Este programa devia desenhar um quadrado: repita 4 vezes [ande 3]. O que falta? Corrija.', escrever(2)) +
                   bloco(2, 'O robô devia subir a escada de 3 degraus, mas o programa é: repita 3 vezes [→ ↓]. Qual é o erro?', escrever(2)) +
                   bloco(3, 'Este laço nunca termina: repita até o copo encher [beba um gole]. Por quê?', escrever(2)),
         gabarito=['Bloco 1: falta virar: repita 4 vezes [ande 3, vire à direita].', 'Bloco 2: a seta para baixo devia ser para cima: repita 3 vezes [→ ↑].',
                   'Bloco 3: beber esvazia o copo, então ele nunca enche: a condição nunca acontece.'],
         adaptar='Para quem precisa, ofereça três alternativas de correção para escolher em vez de escrever.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF04CO03'],
         objetivo='Verificar se a criança cria, simula e corrige algoritmos com repetições simples e aninhadas.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min): dança aninhada.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre laços.',
         atividade=bloco(1, 'Reescreva com um laço: ↑ → ↑ → ↑ →', escrever(1)) +
                   bloco(2, '"repita 3 vezes [ repita 2 vezes [palma], pulo ]". Quantas palmas e quantos pulos?', escrever(1)) +
                   bloco(3, 'Faça um X onde o robô para: repita 2 vezes [→ ↓ ↓].', malha(4, 5, [0, 0], cel=11)) +
                   bloco(4, 'Corrija: "repita até a garrafa encher [tire água]".', escrever(1)),
         gabarito=['Bloco 1: repita 3 vezes [↑ →].', 'Bloco 2: 6 palmas e 3 pulos.', 'Bloco 3: anda 2 colunas e desce 4 linhas: última linha, terceira casa.',
                   'Bloco 4: repita até a garrafa encher [coloque água].', 'Critério: domina com 4 certos; em desenvolvimento com 2 ou 3; retomada com 0 ou 1.'],
         adaptar='Aplique com cartões e malha no chão para quem precisa.'),

    # =================== 3º bimestre ===================
    aula(n=17, bim=3, titulo='Tudo vira número', habs=['EF04CO04'],
         objetivo='Entender que, para guardar, manipular e transmitir dados, o computador os codifica em números (formato digital).',
         material='Um cartão com um código combinado (por exemplo, 1 = sim, 2 = não, 3 = talvez) e a folha do estudante.',
         passos=['Código da turma (15 min): combine números para respostas. Faça perguntas e a turma responde só com números.',
                 'Por quê? (10 min): o computador só entende números. Para guardar uma foto, um texto ou uma música, ele combina um código.',
                 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='O computador não guarda a foto como um papel, nem a música como um disco. Ele transforma tudo em números, usando um código combinado. '
               'Para mandar uma mensagem, os números viajam pelo cabo ou pelo ar e, do outro lado, são decodificados de novo.',
         atividade=bloco(1, 'Use o código: 1 = sol, 2 = chuva, 3 = nuvem. Codifique o tempo da semana.', figs(['sol', 'sol', 'chuva', 'nuvem', 'sol'], 11) + escrever(1)) +
                   bloco(2, 'Decodifique: 3 3 1 2 1. Desenhe.', desenho('24mm')) +
                   bloco(3, 'Por que o computador precisa codificar as informações?', escrever(2)),
         gabarito=['Bloco 1: 1 1 2 3 1.', 'Bloco 2: nuvem, nuvem, sol, chuva, sol.', 'Bloco 3: porque ele só guarda e envia números; o código transforma a informação em números e de volta.'],
         jogo='tudo-vira-numero',
         adaptar='Para estudantes com deficiência visual, use o código com sons (1 palma = sol, 2 palmas = chuva).'),
    aula(n=18, bim=3, titulo='O código das letras', habs=['EF04CO04', 'EF04CO05'],
         objetivo='Codificar e decodificar palavras com uma tabela de letras e números, como o computador faz (ideia do código ASCII).',
         material='Tabela A = 1 até Z = 26 e dispositivos com o jogo Tudo Vira Número.',
         passos=['Mensagem secreta (15 min): escreva no quadro uma mensagem em números para a turma decodificar.',
                 'Jogo (20 min): Tudo Vira Número.', 'Folha (15 min).'],
         turma='Quando você digita a letra A, o computador guarda um número. Cada letra tem o seu número numa tabela que todos os computadores conhecem. '
               'Por isso uma mensagem escrita num celular aparece igualzinha no outro.',
         atividade=bloco(1, 'Tabela: A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 I=9 J=10 K=11 L=12 M=13 N=14 O=15 P=16 Q=17 R=18 S=19 T=20 U=21 V=22 W=23 X=24 Y=25 Z=26. Decodifique: 2 15 12 1 &nbsp;|&nbsp; 3 1 19 1', escrever(1)) +
                   bloco(2, 'Codifique o seu primeiro nome.', escrever(1)) +
                   bloco(3, 'Escreva uma mensagem curta em código para um colega decodificar.', escrever(2)),
         gabarito=['Bloco 1: BOLA e CASA.', 'Bloco 2: depende do nome (ANA = 1 14 1).', 'Bloco 3: resposta livre; o colega deve conseguir decodificar.'],
         jogo='tudo-vira-numero',
         adaptar='Estudantes cegos podem usar a tabela em braille. Para quem tem dificuldade, use palavras de três letras.'),
    aula(n=19, bim=3, titulo='Zeros e uns', habs=['EF04CO05'],
         objetivo='Representar números com as cartas de bolinhas (8, 4, 2, 1) e escrever em binário (só com 0 e 1).',
         material='Cartas de bolinhas grandes (1, 2, 4, 8) para o quadro, um jogo de cartas por dupla e a folha do estudante.',
         passos=['Cartas no quadro (15 min): quatro crianças seguram as cartas. Carta virada para a turma vale 1, de costas vale 0. Forme 5: cartas 4 e 1. Em binário: 0101.',
                 'Duplas (15 min): uma diz um número até 15, a outra forma com as cartas.',
                 'Folha (15 min).', 'Fechamento (5 min): o computador guarda tudo com luzinhas acesas (1) e apagadas (0).'],
         turma='O computador guarda tudo usando só dois sinais: ligado e desligado, 1 e 0. Com as cartas de 8, 4, 2 e 1 bolinhas dá para formar qualquer número de 0 a 15. '
               'Carta para cima vale 1 e conta as bolinhas; carta para baixo vale 0. Isso é o sistema binário.',
         atividade=bloco(1, 'Escreva 1 nas cartas que ficam para cima para formar 6.', cartas_binario()) +
                   bloco(2, 'Que número é este?', cartas_binario('1011') + escrever(1)) +
                   bloco(3, 'Escreva em binário (4 dígitos): 3 = ______ &nbsp; 9 = ______ &nbsp; 15 = ______', ''),
         gabarito=['Bloco 1: 0 1 1 0 (cartas de 4 e de 2).', 'Bloco 2: 8 + 2 + 1 = 11.', 'Bloco 3: 3 = 0011; 9 = 1001; 15 = 1111.'],
         jogo='zeros-uns-e-cores',
         adaptar='Faça cartas com bolinhas em relevo (cola quente) para estudantes cegos. Para quem tem dificuldade, comece só com as cartas de 1, 2 e 4.'),
    aula(n=20, bim=3, titulo='Contando em binário', habs=['EF04CO05'],
         objetivo='Contar de 0 a 15 em binário e perceber o padrão.',
         material='Cartas de bolinhas e a folha do estudante.',
         passos=['Contagem coletiva (15 min): 0000, 0001, 0010, 0011... Qual carta vira a cada número? A de 1 vira sempre!',
                 'Folha (25 min).', 'Fechamento (10 min): com mais cartas (16, 32, 64...), o computador forma números enormes.'],
         turma='Contar em binário tem um padrão: a carta de 1 vira toda vez; a de 2 vira a cada dois números; a de 4, a cada quatro. Com mais cartas, formamos números maiores.',
         atividade=bloco(1, 'Complete a tabela.', tabela(['Número', '8', '4', '2', '1'], [['0', '0', '0', '0', '0'], ['1', '0', '0', '0', '1'], ['2', '', '', '', ''], ['3', '', '', '', ''],
                                                                                           ['4', '', '', '', ''], ['5', '', '', '', ''], ['7', '', '', '', ''], ['8', '', '', '', ''], ['12', '', '', '', '']])) +
                   bloco(2, 'Qual é o maior número com 4 cartas? E com 5 cartas (16, 8, 4, 2, 1)?', escrever(1)),
         gabarito=['Bloco 1: 2 = 0010; 3 = 0011; 4 = 0100; 5 = 0101; 7 = 0111; 8 = 1000; 12 = 1100.', 'Bloco 2: 15 com quatro cartas; 31 com cinco.'],
         jogo='zeros-uns-e-cores',
         adaptar='Deixe a tabela parcialmente preenchida para quem precisa e use as cartas concretas.'),
    aula(n=21, bim=3, titulo='Pixels e cores de luz', habs=['EF04CO05'],
         objetivo='Entender que cada pixel da tela tem três luzes (vermelha, verde e azul) e que as cores são codificadas pela força de cada luz (RGB).',
         material='Três lanternas cobertas com papel celofane vermelho, verde e azul (se possível), uma lupa para olhar a tela e a folha do estudante.',
         passos=['Lupa na tela (10 min): olhe a tela com a lupa: aparecem pontinhos vermelhos, verdes e azuis.',
                 'Misturar luzes (15 min): no escuro, sobreponha as lanternas na parede. Vermelho + verde = amarelo. As três = branco.',
                 'Folha (20 min).', 'Fechamento (5 min): o computador guarda a cor de cada pixel como três números.'],
         turma='Cada pixel da tela tem três luzinhas: vermelha, verde e azul. Misturando as luzes, aparecem todas as cores. '
               'Luz é diferente de tinta: luz vermelha com luz verde dá amarelo, e as três juntas dão branco. O computador guarda cada cor como três números: R, G e B.',
         atividade=bloco(1, 'Complete com as luzes acesas (1) e apagadas (0).', tabela(['Cor', 'R (vermelho)', 'G (verde)', 'B (azul)'], [['vermelho', '1', '0', '0'], ['amarelo', '', '', ''], ['branco', '', '', ''],
                                                                                                                                 ['preto', '', '', ''], ['ciano (azul-claro)', '', '', '']])) +
                   bloco(2, 'Que cor aparece com R = 1, G = 0, B = 1?', escrever(1)),
         gabarito=['Bloco 1: amarelo 1 1 0; branco 1 1 1; preto 0 0 0; ciano 0 1 1.', 'Bloco 2: magenta (rosa-arroxeado).'],
         jogo='zeros-uns-e-cores',
         adaptar='Se não houver lanternas, use o jogo Zeros, Uns e Cores no projetor. Estudantes com daltonismo podem participar pelos números (0 e 1) da tabela.'),
    aula(n=22, bim=3, titulo='Jogo: Zeros, Uns e Cores', habs=['EF04CO05'],
         objetivo='Praticar binário e RGB no jogo.',
         material='Dispositivos com o jogo Zeros, Uns e Cores e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): por que vermelho e verde dão amarelo na luz e não na tinta?'],
         turma='No jogo você vira as cartas para formar números e acende luzes para formar cores. Tudo isso é o computador codificando a informação.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 9, 12)) +
                   bloco(2, 'Escreva em binário a sua idade.', escrever(1)) +
                   bloco(3, 'Invente uma cor: escolha R, G e B com níveis de 0 a 2 e pinte como acha que fica.', tabela(['R', 'G', 'B', 'Cor'], [['', '', '', '<div style="height:16mm"></div>']])),
         gabarito=['Bloco 1: depende da criança (9 fases).', 'Bloco 2: 9 anos = 1001; 10 anos = 1010.', 'Bloco 3: resposta livre; confira no jogo.'],
         jogo='zeros-uns-e-cores',
         adaptar='Duplas: uma criança lê o número ou a cor, a outra manipula. O jogo funciona com leitor de tela.'),
    aula(n=23, bim=3, titulo='Mensagem em binário', habs=['EF04CO04', 'EF04CO05'],
         objetivo='Codificar e transmitir uma mensagem curta usando números em binário (luzes, palmas ou desenhos).',
         material='Lanterna ou cartões preto e branco e a folha do estudante.',
         passos=['Planejar (10 min): cada letra vira um número (A=1...) e cada número vira binário.',
                 'Transmitir (25 min): grupos mandam uma palavra curta piscando a lanterna (acesa = 1, apagada = 0) ou levantando cartões.',
                 'Folha (15 min).'],
         turma='Agora você vai ser um computador mandando mensagens. Cada letra vira número, cada número vira zeros e uns. Do outro lado, o grupo decodifica. Foi assim que surgiram as primeiras comunicações digitais.',
         atividade=bloco(1, 'Codifique a palavra OI. O = 15, I = 9. Escreva em binário de 4 dígitos.', escrever(1)) +
                   bloco(2, 'Com 5 cartas (16, 8, 4, 2, 1), decodifique: 00011 00001 10011 00001.', escrever(1)) +
                   bloco(3, 'Escreva a palavra que o seu grupo transmitiu e a que recebeu.', escrever(2)),
         gabarito=['Bloco 1: O = 1111, I = 1001.', 'Bloco 2: 3, 1, 19, 1 = CASA.', 'Bloco 3: depende dos grupos.'],
         adaptar='Estudantes surdos podem transmitir com luz; estudantes cegos, com sons (palma = 1, silêncio = 0).'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF04CO04', 'EF04CO05'],
         objetivo='Verificar se a criança entende a codificação digital e representa informações em binário, com códigos de letras e RGB.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min): cartas de bolinhas no quadro.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre como o computador codifica as informações.',
         atividade=bloco(1, 'Por que o computador codifica as informações em números?', escrever(2)) +
                   bloco(2, 'Que número é? &nbsp; 0110 = ____ &nbsp; 1001 = ____ &nbsp; 1111 = ____', '') +
                   bloco(3, 'Escreva 10 em binário.', escrever(1)) +
                   bloco(4, 'Com A=1, B=2... qual palavra é 12 21 1?', escrever(1)) +
                   bloco(5, 'Qual cor tem R = 1, G = 1, B = 0?', escrever(1)),
         gabarito=['Bloco 1: porque ele só guarda e envia números (0 e 1).', 'Bloco 2: 6, 9 e 15.', 'Bloco 3: 1010.', 'Bloco 4: LUA.', 'Bloco 5: amarelo.',
                   'Critério: domina com 4 ou 5 certos; em desenvolvimento com 3; retomada com 2 ou menos.'],
         adaptar='Ofereça as cartas concretas e a tabela de letras durante a avaliação para quem precisa.'),

    # =================== 4º bimestre ===================
    aula(n=25, bim=4, titulo='Ferramentas para criar', habs=['EF04CO06'],
         objetivo='Conhecer ferramentas computacionais para criar textos, apresentações, vídeos e áudios e escolher a adequada.',
         material='Computadores ou tablets com editor de texto, apresentação e gravador; dispositivos com o jogo Estúdio de Conteúdo.',
         passos=['Tour (15 min): mostre cada ferramenta e um exemplo do que ela cria.', 'Jogo (20 min): Estúdio de Conteúdo.', 'Folha (15 min).'],
         turma='Cada ferramenta é boa para um tipo de conteúdo: o editor de texto para escrever, a apresentação para mostrar ideias em telas, o editor de vídeo para juntar imagens e sons, o gravador para áudio.',
         atividade=bloco(1, 'Escreva a ferramenta que você usaria.', tabela(['Quero...', 'Ferramenta'], [['escrever uma carta', ''], ['mostrar a pesquisa para a turma', ''], ['gravar uma entrevista', ''], ['fazer um vídeo de receita', '']])) +
                   bloco(2, 'Qual ferramenta você já usou? O que criou?', escrever(2)),
         gabarito=['Bloco 1: editor de texto; apresentação (slides); gravador de áudio; câmera e editor de vídeo.', 'Bloco 2: resposta pessoal.'],
         jogo='estudio-de-conteudo',
         adaptar='Apresente recursos de acessibilidade das ferramentas: ditado por voz, leitor de tela, legendas automáticas.'),
    aula(n=26, bim=4, titulo='Do roteiro ao conteúdo', habs=['EF04CO06'],
         objetivo='Planejar e produzir um conteúdo digital em etapas (roteiro, produção, revisão, publicação).',
         material='Dispositivos com as ferramentas disponíveis e a folha do estudante.',
         passos=['Roteiro (15 min): cada grupo escolhe um tema e o formato e preenche o roteiro.',
                 'Produção (25 min).', 'Revisão (10 min): outro grupo assiste e sugere melhorias.'],
         turma='Todo conteúdo bom começa com um plano: o roteiro. Depois vem a produção, a revisão e, só então, a publicação.',
         atividade=bloco(1, 'Roteiro do grupo.', tabela(['Etapa', 'O que vamos fazer'], [['Tema', ''], ['Formato e ferramenta', ''], ['Cena ou tela 1', ''], ['Cena ou tela 2', ''], ['Cena ou tela 3', ''], ['Quem faz o quê', '']])) +
                   bloco(2, 'O que o outro grupo sugeriu?', escrever(2)),
         gabarito=['Respostas do grupo. Observe se o formato combina com o tema e se as etapas foram seguidas.'],
         jogo='estudio-de-conteudo',
         adaptar='Distribua papéis conforme as potências (roteirista, apresentador, editor, revisor).'),
    aula(n=27, bim=4, titulo='Coletar dados com ética', habs=['EF04CO07'],
         objetivo='Planejar uma pesquisa pedindo só os dados necessários, com permissão e explicando o uso.',
         material='Dispositivos com o jogo Dados com Cuidado e a folha do estudante.',
         passos=['Planejar uma pesquisa (15 min): sobre o esporte preferido. Que perguntas são necessárias? Precisa do nome? Do endereço?',
                 'Jogo (20 min): Dados com Cuidado.', 'Folha (15 min).'],
         turma='Quando coletamos dados de pessoas, temos responsabilidade. Pedimos só o que é necessário, explicamos para que vamos usar e pedimos permissão. Dados de pessoas não são brinquedo.',
         atividade=bloco(1, 'Pesquisa sobre o esporte preferido. Marque as perguntas necessárias.', tabela(['Pergunta', 'Necessária?'], [['Qual é o seu esporte preferido?', ''], ['Qual é o seu endereço?', ''], ['Você pratica algum esporte?', ''], ['Qual é o telefone dos seus pais?', '']])) +
                   bloco(2, 'Escreva o aviso que você daria antes da pesquisa.', escrever(2)),
         gabarito=['Bloco 1: necessárias: esporte preferido e se pratica. Endereço e telefone não.', 'Bloco 2: por exemplo "As respostas vão virar um gráfico da turma. Não vamos mostrar nomes."'],
         jogo='dados-com-cuidado',
         adaptar='Use exemplos concretos da escola. Para estudantes com TEA, deixe regras claras e escritas: só o necessário, pedir, explicar, guardar.'),
    aula(n=28, bim=4, titulo='Guardar, enviar e usar dados', habs=['EF04CO07'],
         objetivo='Reconhecer atitudes éticas ao guardar, transferir e usar dados de outras pessoas.',
         material='Cartões com situações e a folha do estudante.',
         passos=['Situações (20 min): em grupos, a turma decide o que fazer em cada situação (achar a lista de telefones, receber a foto de um colega, emprestar o login).',
                 'Folha (20 min).', 'Combinado da turma (10 min).'],
         turma='Os dados das pessoas precisam ser guardados com senha, enviados só para quem precisa e usados só para o que foi combinado. Se encontrar dados de alguém, entregue a um adulto.',
         atividade=bloco(1, 'Certo ou errado? Justifique.', tabela(['Situação', 'C ou E', 'Por quê?<div style="width:55mm"></div>'], [['Guardar a planilha da pesquisa com senha.', '', ''], ['Mandar a foto de um colega para outro grupo sem perguntar.', '', ''],
                                                                                                     ['Usar os e-mails da pesquisa para mandar propaganda.', '', ''], ['Apagar os dados quando a pesquisa terminou.', '', '']])),
         gabarito=['Certo; errado (precisa de permissão); errado (uso diferente do combinado); certo.'],
         jogo='dados-com-cuidado',
         adaptar='Faça as situações como teatro curto para quem compreende melhor com ação.'),
    aula(n=29, bim=4, titulo='Fonte confiável?', habs=['EF04CO08'],
         objetivo='Reconhecer a importância de verificar a confiabilidade das fontes de informação na internet.',
         material='Dois sites sobre o mesmo assunto (um de instituição e um sem autor), dispositivos com o jogo Fonte Confiável? e a folha do estudante.',
         passos=['Comparar (15 min): projete os dois sites. Quem escreveu? Quando? Tem fontes?',
                 'Jogo (20 min): Fonte Confiável?', 'Folha (15 min).'],
         turma='Na internet, qualquer pessoa pode publicar. Por isso, antes de acreditar, perguntamos: quem escreveu? Quando? Outros sites sérios dizem o mesmo? O título quer me assustar ou me fazer clicar?',
         atividade=bloco(1, 'Lista de checagem. Escreva as quatro perguntas antes de confiar.', escrever(4)) +
                   bloco(2, 'Qual fonte é mais confiável para um trabalho sobre abelhas? Por quê?', '<p>a) Vídeo de um canal sem nome. b) Site de uma universidade. c) Mensagem encaminhada.</p>' + escrever(2)),
         gabarito=['Bloco 1: Quem escreveu? Quando? Tem fontes? Outros sites sérios confirmam?', 'Bloco 2: b, porque tem autoria identificada e responsável.'],
         jogo='fonte-confiavel',
         adaptar='Leia os sites junto com quem precisa e destaque autor e data com marcador.'),
    aula(n=30, bim=4, titulo='Checando uma notícia', habs=['EF04CO08'],
         objetivo='Verificar uma notícia em mais de uma fonte antes de compartilhar.',
         material='Duas ou três "notícias" preparadas pela professora (uma verdadeira e uma falsa sobre a escola ou a cidade) e a folha do estudante.',
         passos=['Detetives (25 min): em grupos, a turma checa cada notícia com a lista de perguntas.', 'Folha (15 min).', 'Fechamento (10 min): na dúvida, não compartilhe.'],
         turma='Uma notícia falsa pode parecer verdadeira. Antes de compartilhar, faça como um detetive: procure em outras fontes, veja a data, desconfie de títulos muito exagerados.',
         atividade=bloco(1, 'Preencha a checagem da notícia do seu grupo.', tabela(['Pergunta', 'Resposta'], [['Quem escreveu?', ''], ['Quando?', ''], ['Outras fontes confirmam?', ''], ['O título exagera?', ''], ['É confiável?', '']])) +
                   bloco(2, 'O que você faz se não conseguir confirmar uma notícia?', escrever(2)),
         gabarito=['Bloco 1: depende da notícia.', 'Bloco 2: não compartilha e pergunta a um adulto.'],
         jogo='fonte-confiavel',
         adaptar='Ofereça a notícia em áudio para quem tem dificuldade de leitura.'),
    aula(n=31, bim=4, titulo='Projeto: jornal digital da turma', habs=['EF04CO06', 'EF04CO07', 'EF04CO08'],
         objetivo='Produzir um jornal digital com textos, imagens e dados da turma, usando fontes confiáveis e cuidando dos dados das pessoas.',
         material='Dispositivos com editor de texto ou apresentação e a folha do estudante.',
         passos=['Pautas (10 min): cada grupo escolhe uma seção (notícia da escola, pesquisa da turma, curiosidade checada, entrevista).',
                 'Produção (30 min).', 'Revisão final (10 min): fontes, dados pessoais e permissões.'],
         turma='O jornal da turma vai mostrar o que aprendemos: escolher a ferramenta, checar as fontes e cuidar dos dados das pessoas.',
         atividade=bloco(1, 'A matéria do meu grupo.', tabela(['Seção', 'Ferramenta', 'Fonte (se houver)'], [['', '', '']])) +
                   bloco(2, 'Revisão: marque com X.', tabela(['Pergunta', 'Sim', 'Não'], [['A fonte é confiável?', '', ''], ['Tem dado pessoal sem permissão?', '', ''], ['Revisamos o texto?', '', '']])) +
                   bloco(3, 'Escreva o título da matéria.', escrever(1)),
         gabarito=['Respostas do grupo. Para publicar: fonte confiável (sim), dado pessoal sem permissão (não), texto revisado (sim).'],
         adaptar='Cada estudante participa no formato em que se expressa melhor (texto, desenho, áudio, vídeo em Libras).'),
    aula(n=32, bim=4, titulo='Avaliação final e festa dos jogos', habs=['EF04CO01', 'EF04CO02', 'EF04CO03', 'EF04CO04', 'EF04CO05', 'EF04CO07', 'EF04CO08'],
         objetivo='Verificar as aprendizagens do ano e celebrar o percurso da turma.',
         material='A folha de avaliação e os jogos do ano.',
         passos=['Avaliação (25 min).', 'Festa dos jogos (20 min).', 'Roda final (5 min).'],
         turma='Chegamos ao fim do 4º ano. Vamos mostrar o que aprendemos e depois jogar.',
         atividade=lado(bloco(1, 'Coordenada do gato?', grade_coord(3, 3, {'B3': 'gato'}, cel=10) + escrever(1)),
                        bloco(2, 'Valor do campo "idade"?', tabela(['Campo', 'Valor'], [['nome', 'Léo'], ['idade', '9']]))) +
                   bloco(3, 'Reescreva com laço: → ↓ → ↓ → ↓', escrever(1)) +
                   lado(bloco(4, 'Binário: 0101 = ____ &nbsp; 12 = ________', ''),
                        bloco(5, 'R=0, G=1, B=1 é que cor?', escrever(1))) +
                   bloco(6, 'Cite um cuidado ao coletar dados das pessoas e um jeito de checar uma fonte.', escrever(2)),
         gabarito=['Bloco 1: B3.', 'Bloco 2: 9.', 'Bloco 3: repita 3 vezes [→ ↓].', 'Bloco 4: 5; 1100.', 'Bloco 5: ciano (azul-claro).',
                   'Bloco 6: pedir só o necessário ou pedir permissão; ver quem escreveu ou conferir em outras fontes.',
                   'Critério: domina com 5 ou 6 certos; em desenvolvimento com 3 ou 4; retomada com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos, com leitura e materiais concretos para quem precisa.'),
]
