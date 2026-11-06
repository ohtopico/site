"""5º ano: ano letivo de Computação (BNCC EF05CO01 a EF05CO11), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
"""
from folhas import (bloco, lado, certo_errado, circular, desenho, escrever, figs, grafo_folha, ligar, malha, numerar, setas, tabela)

ANO = 5
TITULO = 'Computação no 5º ano'
RESUMO = ('Um ano letivo completo de Computação para o 5º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, mais onze jogos.')
APRESENTACAO = [
    'No 5º ano, a turma fecha os anos iniciais organizando dados em listas e grafos, combinando frases com E, OU e NÃO, '
    'criando algoritmos com SE, ENTÃO e SENÃO, conhecendo as partes do computador, o armazenamento local e na nuvem e o sistema operacional. '
    'No último bimestre, discute fontes confiáveis, direitos autorais, as mudanças da tecnologia no trabalho e como escolher a tecnologia certa para cada problema.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada, uma folha para imprimir e, em várias, um jogo com instruções curtas escritas e voz.',
]
BIMESTRES = [
    ('Listas e grafos', 'Representar e manipular listas (itens em sequência) e grafos (pontos ligados por linhas), como filas, playlists, mapas e redes.'),
    ('Lógica e decisões', 'Operar com E, OU e NÃO e criar algoritmos com sequência, repetição e seleção condicional (SE, ENTÃO, SENÃO).'),
    ('Por dentro do computador', 'Identificar os componentes do computador, o armazenamento local e remoto e o papel do sistema operacional.'),
    ('Cidadania digital', 'Distinguir conteúdos confiáveis, respeitar direitos autorais, discutir a tecnologia no trabalho e escolher a tecnologia adequada a cada problema.'),
]

BAIRRO = {'casa': (12, 20, 'casa'), 'escola': (50, 12, 'escola'), 'parque': (88, 22, 'arvore'), 'mercado': (18, 80, 'prato'), 'biblioteca': (52, 55, 'livro'),
          'ponto': (86, 82, 'onibus')}
RUAS = [('casa', 'escola'), ('escola', 'parque'), ('casa', 'mercado'), ('escola', 'biblioteca'), ('mercado', 'biblioteca'), ('biblioteca', 'ponto'), ('parque', 'ponto')]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


AULAS = [
    # =================== 1º bimestre ===================
    aula(n=1, bim=1, titulo='Listas por toda parte', habs=['EF05CO01'],
         objetivo='Reconhecer listas: itens organizados em sequência, com quantidade que pode mudar.',
         material='Exemplos de listas (chamada, compras, playlist, fila do lanche) e a folha do estudante.',
         passos=['Roda (10 min): onde vocês usam listas? Anote no quadro.', 'Fila viva (15 min): forme uma fila de cinco crianças. Quem é o 1º? O 3º? Entra mais uma no fim. Sai a 2ª. Quantas ficaram?',
                 'Folha (20 min).', 'Fechamento (5 min): no computador, a lista de músicas, de contatos e de mensagens funcionam assim.'],
         turma='Uma lista guarda itens um depois do outro. Cada item tem uma posição: 1º, 2º, 3º. E a lista pode crescer ou diminuir: entram e saem itens. '
               'A playlist, a lista de contatos e a fila do lanche são listas.',
         atividade=bloco(1, 'A lista de compras é: arroz, feijão, ovo, pão.', '<p>a) Qual é o 3º item? ______ &nbsp; b) Quantos itens tem a lista? ______</p>') +
                   bloco(2, 'Acrescente "leite" no fim e remova "feijão". Escreva como a lista ficou.', escrever(2)) +
                   bloco(3, 'Escreva uma lista que você usa no dia a dia, com pelo menos 4 itens.', escrever(3)),
         gabarito=['Bloco 1: a) ovo; b) 4.', 'Bloco 2: arroz, ovo, pão, leite.', 'Bloco 3: resposta livre.'],
         jogo='listas-em-acao',
         adaptar='Use cartões com figuras e palavras para montar e mexer na lista sobre a mesa. Estudantes cegos podem usar objetos em sequência numa régua com encaixes.'),
    aula(n=2, bim=1, titulo='Mexendo nas listas', habs=['EF05CO01'],
         objetivo='Fazer manipulações em listas: inserir numa posição, remover, trocar e ordenar.',
         material='Cartões numerados, varal com prendedores e a folha do estudante.',
         passos=['Varal (20 min): pendure cartões no varal. Peça: insira o 7 na 2ª posição; remova o último; troque o 1º com o 3º; ordene do menor para o maior.',
                 'Folha (20 min).', 'Conversa (10 min): quando inserimos no meio, o que acontece com as posições dos itens depois?'],
         turma='Quando inserimos um item no meio da lista, os itens depois dele andam uma posição. Quando removemos, eles voltam uma posição. Ordenar é colocar a lista numa ordem combinada, como do menor para o maior.',
         atividade=bloco(1, 'Lista: 4, 9, 2, 7. Faça cada operação, uma depois da outra, e escreva a lista.',
                         tabela(['Operação', 'Lista depois'], [['Inserir 5 na 2ª posição', ''], ['Remover o último', ''], ['Trocar o 1º com o 2º', ''], ['Ordenar do menor para o maior', '']])),
         gabarito=['4, 5, 9, 2, 7 → 4, 5, 9, 2 → 5, 4, 9, 2 → 2, 4, 5, 9.'],
         jogo='listas-em-acao',
         adaptar='Faça as operações primeiro no varal, com o cartão na mão, e só depois no papel.'),
    aula(n=3, bim=1, titulo='Jogo: Listas em Ação', habs=['EF05CO01'],
         objetivo='Praticar manipulações de listas no jogo.',
         material='Dispositivos com o jogo Listas em Ação e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): que listas o celular de vocês tem?'],
         turma='No jogo, você acrescenta, remove, troca e ordena itens. Preste atenção na posição de cada um.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)) +
                   bloco(2, 'Crie a playlist da festa da turma com 5 músicas em ordem.', escrever(3)) +
                   bloco(3, 'Escreva duas operações para fazer na sua playlist e o resultado.', escrever(2)),
         gabarito=['Bloco 1: depende da criança (8 fases).', 'Blocos 2 e 3: respostas livres; confira se o resultado combina com as operações.'],
         jogo='listas-em-acao',
         adaptar='O jogo tem leitura e voz. Faça duplas de leitura quando necessário.'),
    aula(n=4, bim=1, titulo='Pontos e linhas: os grafos', habs=['EF05CO02'],
         objetivo='Reconhecer grafos (vértices ligados por arestas) em mapas, redes de amizade e jogos.',
         material='Barbante, fita crepe, cartões com nomes de lugares e a folha do estudante.',
         passos=['Grafo vivo (20 min): algumas crianças são lugares e seguram barbantes que são as ruas. Que lugares estão ligados?',
                 'Nomes (5 min): os pontos são vértices; as linhas são arestas.', 'Folha (20 min).', 'Fechamento (5 min): o aplicativo de mapas usa grafos para achar caminhos.'],
         turma='Um grafo é feito de pontos (vértices) e linhas que ligam os pontos (arestas). O mapa de um bairro é um grafo: os lugares são vértices e as ruas são arestas. '
               'Uma rede de amigos também: cada pessoa é um vértice e cada amizade é uma aresta.',
         atividade=bloco(1, 'Observe o grafo do bairro e responda.', grafo_folha(BAIRRO, RUAS, 120, 62) +
                         '<p>a) Quantos vértices? ____ &nbsp; b) Quantas arestas? ____ &nbsp; c) Quais lugares estão ligados à biblioteca? ______________</p>'),
         gabarito=['a) 6 vértices; b) 7 arestas; c) escola, mercado e ponto de ônibus.'],
         jogo='rede-de-caminhos',
         adaptar='Faça o grafo com barbante colado num papelão para estudantes cegos explorarem pelo tato.'),
    aula(n=5, bim=1, titulo='O caminho mais curto', habs=['EF05CO02'],
         objetivo='Achar caminhos num grafo e o caminho com menos arestas.',
         material='O grafo do bairro no quadro e a folha do estudante.',
         passos=['Desafio (15 min): de casa até o ponto de ônibus, quantos caminhos existem? Qual usa menos ruas?',
                 'Folha (25 min).', 'Fechamento (10 min): o aplicativo de mapas faz isso com milhões de ruas, muito rápido.'],
         turma='Num grafo, um caminho é uma sequência de vértices ligados por arestas. Muitas vezes queremos o caminho mais curto, com menos arestas. Os aplicativos de mapa calculam isso para nós.',
         atividade=bloco(1, 'No grafo do bairro, escreva dois caminhos de casa até o parque.', grafo_folha(BAIRRO, RUAS, 110, 56) + escrever(2)) +
                   bloco(2, 'Qual é o caminho mais curto do mercado até o parque? Quantas arestas?', escrever(1)),
         gabarito=['Bloco 1: casa, escola, parque; casa, mercado, biblioteca, ponto, parque (entre outros).', 'Bloco 2: mercado, biblioteca, escola, parque ou mercado, biblioteca, ponto, parque (3 arestas).'],
         jogo='rede-de-caminhos',
         adaptar='Use cores diferentes para traçar cada caminho com o dedo ou lápis.'),
    aula(n=6, bim=1, titulo='Jogo: Rede de Caminhos', habs=['EF05CO02'],
         objetivo='Percorrer e construir grafos no jogo.',
         material='Dispositivos com o jogo Rede de Caminhos e a folha do estudante.',
         passos=['Jogo (25 min).', 'Folha (15 min).', 'Conversa (10 min): onde mais existem redes assim?'],
         turma='No jogo, você anda pelo bairro de vértice em vértice, procura o caminho mais curto e monta redes de amizade e de estradas.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 12)) +
                   bloco(2, 'Desenhe o grafo da sua rede de amizades na turma (5 pessoas).', desenho('70mm')),
         gabarito=['Bloco 1: depende da criança (7 fases).', 'Bloco 2: resposta livre; os vértices são pessoas e as arestas, amizades.'],
         jogo='rede-de-caminhos',
         adaptar='Para o bloco 2, a criança pode usar iniciais ou desenhos no lugar dos nomes.'),
    aula(n=7, bim=1, titulo='Grafo da escola', habs=['EF05CO02', 'EF05CO01'],
         objetivo='Construir em grupo o grafo dos espaços da escola e uma lista de rotas.',
         material='Folhas grandes, canetas e a folha do estudante.',
         passos=['Passeio (15 min): a turma anota os espaços e por onde dá para ir de um a outro.',
                 'Construção (20 min): cada grupo desenha o grafo da escola.', 'Rotas (15 min): cada grupo escreve a lista de passos de uma rota (da sala até a quadra).'],
         turma='Agora vamos transformar a escola num grafo: os espaços são vértices e as passagens são arestas. Depois, a rota de um lugar a outro vira uma lista de vértices em ordem.',
         atividade=bloco(1, 'Desenhe o grafo da escola com pelo menos 6 espaços.', desenho('80mm')) +
                   bloco(2, 'Escreva a lista da rota da sala até a quadra.', escrever(2)),
         gabarito=['Respostas do grupo. Confira se as arestas existem de verdade e se a rota usa só arestas do grafo.'],
         adaptar='Planeje o passeio com acessibilidade. Estudantes cegos podem descrever as rotas que já conhecem pelo tato e pelos sons.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF05CO01', 'EF05CO02'],
         objetivo='Verificar se a criança manipula listas e usa grafos para representar e percorrer caminhos.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min): fila viva e grafo vivo.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre listas e grafos.',
         atividade=bloco(1, 'Lista: lápis, borracha, régua. Insira "cola" na 1ª posição e remova "régua". Como fica?', escrever(1)) +
                   bloco(2, 'Ordene do menor para o maior: 8, 3, 11, 5.', escrever(1)) +
                   bloco(3, 'Observe o grafo e responda.', grafo_folha({'A': (10, 20, None), 'B': (50, 15, None), 'C': (88, 25, None), 'D': (30, 80, None), 'E': (75, 80, None)},
                                                                       [('A', 'B'), ('B', 'C'), ('A', 'D'), ('D', 'E'), ('E', 'C'), ('B', 'E')], 100, 48) +
                         '<p>a) Vértices ligados a B: ________ &nbsp; b) Caminho mais curto de A até E: ________</p>'),
         gabarito=['Bloco 1: cola, lápis, borracha.', 'Bloco 2: 3, 5, 8, 11.', 'Bloco 3: a) A, C e E; b) A, B, E ou A, D, E (2 arestas).',
                   'Critério: domina com os 3 blocos; em desenvolvimento com 2; retomada com 0 ou 1.'],
         adaptar='Aplique com cartões e o grafo em barbante para quem precisa.'),

    # =================== 2º bimestre ===================
    aula(n=9, bim=2, titulo='E: as duas coisas', habs=['EF05CO03'],
         objetivo='Operar com a conjunção E: a frase só é verdadeira se as duas partes forem verdadeiras.',
         material='Plaquinhas V e F e a folha do estudante.',
         passos=['De pé se (15 min): fique de pé quem está de tênis E de calça. Discuta quem ficou e por quê.',
                 'Tabela (10 min): monte no quadro as 4 combinações de V e F para "A E B".', 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Com o E, as duas partes precisam ser verdadeiras. "Hoje tem aula E tem educação física": só é verdade se as duas acontecerem. Se uma for falsa, a frase inteira é falsa.',
         atividade=bloco(1, 'Complete a tabela do E.', tabela(['A', 'B', 'A E B'], [['V', 'V', ''], ['V', 'F', ''], ['F', 'V', ''], ['F', 'F', '']])) +
                   bloco(2, 'V ou F? (A Terra é redonda E o Sol é frio.) (2 + 2 = 4 E 3 é ímpar.)', escrever(1)),
         gabarito=['Bloco 1: V, F, F, F.', 'Bloco 2: F (o Sol não é frio); V.'],
         jogo='e-ou-nao',
         adaptar='Use duas lâmpadas desenhadas em série: só acende se os dois interruptores estiverem ligados.'),
    aula(n=10, bim=2, titulo='OU: pelo menos uma', habs=['EF05CO03'],
         objetivo='Operar com a disjunção OU: a frase é verdadeira se pelo menos uma parte for verdadeira.',
         material='Plaquinhas V e F e a folha do estudante.',
         passos=['De pé se (15 min): fique de pé quem tem irmão OU irmã. Compare com o E.', 'Tabela (10 min).', 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Com o OU, basta uma parte ser verdadeira. "Vou de ônibus OU de carro": se eu for de um dos dois, a frase é verdadeira. Ela só é falsa se as duas partes forem falsas.',
         atividade=bloco(1, 'Complete a tabela do OU.', tabela(['A', 'B', 'A OU B'], [['V', 'V', ''], ['V', 'F', ''], ['F', 'V', ''], ['F', 'F', '']])) +
                   bloco(2, 'A biblioteca empresta livro para quem é aluno OU professor. Quem pode pegar? (um aluno, a merendeira, a professora)', escrever(1)),
         gabarito=['Bloco 1: V, V, V, F.', 'Bloco 2: o aluno e a professora.'],
         jogo='e-ou-nao',
         adaptar='Use duas lâmpadas em paralelo: acende com qualquer um dos interruptores ligado.'),
    aula(n=11, bim=2, titulo='NÃO e as combinações', habs=['EF05CO03'],
         objetivo='Usar a negação e combinar NÃO, E e OU.',
         material='Dispositivos com o jogo E, Ou, Não e a folha do estudante.',
         passos=['Aquecimento (10 min): "fique de pé quem NÃO está de boné E está de tênis".', 'Jogo (20 min).', 'Folha (20 min).'],
         turma='O NÃO inverte: verdadeiro vira falso e falso vira verdadeiro. Misturando NÃO, E e OU, criamos regras como as dos programas: SE a senha NÃO está certa, mostre um aviso.',
         atividade=bloco(1, 'Cena: um gato e uma bola. V ou F?', figs(['gato', 'bola'], 12) +
                         tabela(['Frase', 'V ou F'], [['NÃO tem cachorro.', ''], ['Tem gato E NÃO tem bola.', ''], ['Tem peixe OU tem bola.', ''], ['NÃO tem gato OU tem bola.', '']])) +
                   bloco(2, 'Escreva uma regra da escola que use E, OU ou NÃO.', escrever(1)),
         gabarito=['Bloco 1: V; F; V; V.', 'Bloco 2: resposta livre, como "Pode ir ao pátio quem terminou a atividade E guardou o material".'],
         jogo='e-ou-nao',
         adaptar='Leia as frases em voz alta e use cartões de E, OU e NÃO para montar as frases.'),
    aula(n=12, bim=2, titulo='SE e ENTÃO', habs=['EF05CO04'],
         objetivo='Reconhecer a seleção condicional (SE uma condição for verdadeira, ENTÃO faça algo) em situações do dia a dia e nos programas.',
         material='Cartões com condições e ações e a folha do estudante.',
         passos=['Regras da vida (15 min): SE chover, ENTÃO o recreio é no ginásio. A turma cria outras.', 'Robô humano (10 min): SE houver uma cadeira na frente, ENTÃO vire à direita.',
                 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Os programas tomam decisões com SE e ENTÃO. SE a bateria estiver fraca, ENTÃO o celular mostra um aviso. A condição é uma frase que pode ser verdadeira ou falsa.',
         atividade=bloco(1, 'Complete as regras.', tabela(['SE...', 'ENTÃO...'], [['o sinal tocar', ''], ['', 'a luz acende'], ['a senha estiver errada', '']])) +
                   bloco(2, 'Escreva uma regra SE/ENTÃO de um jogo que você conhece.', escrever(2)),
         gabarito=['Bloco 1: respostas como: vamos para o recreio; SE estiver escuro (ou SE apertarmos o interruptor); mostra um aviso e não deixa entrar.', 'Bloco 2: resposta livre.'],
         jogo='se-entao-senao',
         adaptar='Use cartões de condição e ação para combinar sobre a mesa.'),
    aula(n=13, bim=2, titulo='SENÃO: o outro caminho', habs=['EF05CO04'],
         objetivo='Usar SE, ENTÃO e SENÃO para escolher entre duas ações.',
         material='Dispositivos com o jogo Se, Então, Senão e a folha do estudante.',
         passos=['Separador humano (10 min): SE o número for par, ENTÃO vá para a esquerda, SENÃO para a direita.', 'Jogo (20 min).', 'Folha (20 min).'],
         turma='O SENÃO diz o que fazer quando a condição é falsa. SE estiver chovendo, ENTÃO leve guarda-chuva, SENÃO leve boné. Sempre uma das duas ações acontece.',
         atividade=bloco(1, 'Regra: SE o número for maior que 10, ENTÃO escreva A, SENÃO escreva B.', tabela(['Número', 'A ou B'], [['15', ''], ['7', ''], ['10', ''], ['22', '']])) +
                   bloco(2, 'Escreva uma regra com SE, ENTÃO e SENÃO para a lâmpada da sala.', escrever(2)),
         gabarito=['Bloco 1: A, B, B (10 não é maior que 10), A.', 'Bloco 2: SE estiver escuro, ENTÃO acenda, SENÃO deixe apagada.'],
         jogo='se-entao-senao',
         adaptar='Para estudantes com deficiência física, a separação pode ser feita com cartões em duas caixas.'),
    aula(n=14, bim=2, titulo='Sequência, repetição e decisão', habs=['EF05CO04'],
         objetivo='Criar e simular algoritmos que juntam sequência, repetição e seleção condicional.',
         material='Malha no chão, cartões e a folha do estudante.',
         passos=['Robô aspirador (15 min): repita até acabar a sala: ande; SE bater na parede, ENTÃO gire.', 'Folha (25 min).', 'Fechamento (10 min).'],
         turma='Os programas de verdade misturam tudo: passos em sequência, repetições e decisões. O robô aspirador repete: anda, e SE bater, ENTÃO gira. Assim ele limpa a casa toda.',
         atividade=bloco(1, 'Simule: repita 4 vezes [ SE o número for par, ENTÃO some 2, SENÃO some 1 ], começando em 1. Escreva os números.', escrever(1)) +
                   bloco(2, 'O robô anda para a direita até a parede; SE achar a árvore, ENTÃO desce até a borda. Faça um X onde ele para.', malha(5, 4, [0, 0], paredes=[[3, 0]], cel=12)) +
                   bloco(3, 'Escreva um algoritmo para regar as plantas usando repetição e SE.', escrever(3)),
         gabarito=['Bloco 1: 1 → 2 → 4 → 6 → 8.', 'Bloco 2: anda até a casa antes da árvore (3ª coluna) e desce até a última linha: 4ª linha, 3ª casa.',
                   'Bloco 3: por exemplo: repita para cada vaso [ SE a terra estiver seca, ENTÃO regue, SENÃO passe para o próximo ].'],
         jogo='se-entao-senao',
         adaptar='Faça a simulação do bloco 1 com fichas numeradas.'),
    aula(n=15, bim=2, titulo='Inventando um jogo de regras', habs=['EF05CO04', 'EF05CO03'],
         objetivo='Criar em grupo um jogo de tabuleiro com regras SE, ENTÃO, SENÃO e com E/OU.',
         material='Papel, dados, tampinhas e a folha do estudante.',
         passos=['Planejar (10 min).', 'Criar (25 min): cada grupo escreve pelo menos 4 regras.', 'Testar (15 min): outro grupo joga seguindo as regras.'],
         turma='Agora vocês são os programadores de um jogo. As regras precisam ser claras para que outro grupo consiga jogar sem perguntar nada.',
         atividade=bloco(1, 'Regras do jogo do grupo.', tabela(['SE...', 'ENTÃO...', 'SENÃO...'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']])) +
                   bloco(2, 'O outro grupo conseguiu jogar? O que precisou mudar?', escrever(2)),
         gabarito=['Respostas do grupo. Confira se as condições são claras (podem ser verdadeiras ou falsas) e se há ação para os dois casos.'],
         adaptar='Divida papéis: quem escreve, quem desenha o tabuleiro, quem testa, quem lê as regras.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF05CO03', 'EF05CO04'],
         objetivo='Verificar se a criança opera com E, OU, NÃO e cria algoritmos com seleção condicional.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min).', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre lógica e decisões.',
         atividade=bloco(1, 'A = V e B = F. Calcule: A E B = ___ &nbsp; A OU B = ___ &nbsp; NÃO B = ___', '') +
                   bloco(2, 'Regra: SE o número for ímpar, ENTÃO dobre, SENÃO some 1. Aplique em 3, 4 e 7.', escrever(1)) +
                   bloco(3, 'Escreva uma regra SE, ENTÃO, SENÃO para um semáforo.', escrever(2)),
         gabarito=['Bloco 1: F; V; V.', 'Bloco 2: 6, 5 e 14.', 'Bloco 3: SE o sinal estiver vermelho, ENTÃO pare, SENÃO siga com cuidado.',
                   'Critério: domina com os 3 blocos; em desenvolvimento com 2; retomada com 0 ou 1.'],
         adaptar='Ofereça os cartões de V e F para manipular.'),

    # =================== 3º bimestre ===================
    aula(n=17, bim=3, titulo='As partes do computador', habs=['EF05CO05'],
         objetivo='Identificar os componentes principais: dispositivos de entrada e saída, processador e armazenamento.',
         material='Um computador velho aberto (desligado da tomada) ou imagens das peças, e a folha do estudante.',
         passos=['Abrindo o computador (20 min): mostre o processador, a memória e o disco. Pergunte para que serve cada um.',
                 'Folha (20 min).', 'Fechamento (10 min): celular, tablet e videogame têm as mesmas partes, só que menores.'],
         turma='Todo computador tem quatro tipos de partes: as de entrada (teclado, mouse, microfone), o processador (o chip que faz as contas), '
               'o armazenamento (onde os dados ficam guardados, como o disco e o pendrive) e as de saída (tela, caixa de som, impressora).',
         atividade=bloco(1, 'Escreva o tipo de cada peça: entrada, processador, armazenamento ou saída.',
                         tabela(['Peça', 'Tipo'], [['Teclado', ''], ['Pendrive', ''], ['Monitor', ''], ['Chip (processador)', ''], ['Microfone', ''], ['Impressora', ''], ['Disco (HD ou SSD)', '']])),
         gabarito=['Entrada, armazenamento, saída, processador, entrada, saída, armazenamento.'],
         jogo='dentro-do-computador',
         adaptar='Deixe estudantes cegos explorarem as peças pelo tato, com segurança (sem pontas e com o computador desligado).'),
    aula(n=18, bim=3, titulo='O caminho dos dados', habs=['EF05CO05'],
         objetivo='Descrever o caminho dos dados entre os componentes: entrada, processamento, armazenamento e saída.',
         material='Dispositivos com o jogo Dentro do Computador e a folha do estudante.',
         passos=['Computador humano (15 min): entrada recebe um número, processador soma 5, armazenamento anota no caderno, saída fala o resultado.',
                 'Jogo (20 min).', 'Folha (15 min).'],
         turma='Quando você tira uma foto, a câmera (entrada) capta a imagem, o processador transforma em números, o armazenamento guarda e a tela (saída) mostra.',
         atividade=bloco(1, 'Descreva o caminho dos dados quando você grava um áudio e depois escuta.', tabela(['Etapa', 'Peça'], [['Entrada', ''], ['Processamento', ''], ['Armazenamento', ''], ['Saída', '']])) +
                   bloco(2, 'Pinte uma estrela para cada fase do jogo que você terminou.', figs(['estrela-f:branco'] * 6, 12)),
         gabarito=['Bloco 1: microfone; processador; memória ou armazenamento do celular; alto-falante ou fone.', 'Bloco 2: depende da criança (6 fases).'],
         jogo='dentro-do-computador',
         adaptar='Cada papel do computador humano pode ser feito com gestos e cartões.'),
    aula(n=19, bim=3, titulo='Guardado aqui ou longe', habs=['EF05CO06'],
         objetivo='Reconhecer que os dados podem ser armazenados num dispositivo local ou remoto (nuvem).',
         material='Um pendrive, um celular e a folha do estudante.',
         passos=['Onde está a foto? (15 min): uma foto no pendrive e outra num serviço on-line. Desligue a internet: qual abre?',
                 'Folha (25 min).', 'Fechamento (10 min): a nuvem é um computador de verdade, de uma empresa, longe de nós.'],
         turma='Armazenamento local é quando os dados ficam no próprio aparelho ou num pendrive. Armazenamento remoto, a nuvem, é quando ficam num computador distante, que acessamos pela internet. '
               'A nuvem não fica no céu: são computadores enormes em prédios chamados centros de dados.',
         atividade=bloco(1, 'Local (L) ou remoto (R)?', tabela(['Onde está o dado', 'L ou R'], [['Foto na galeria do celular', ''], ['E-mail', ''], ['Arquivo no pendrive', ''], ['Vídeo numa plataforma', ''], ['Documento numa pasta on-line', '']])) +
                   bloco(2, 'Escreva uma vantagem e um cuidado da nuvem.', escrever(2)),
         gabarito=['Bloco 1: L, R, L, R, R.', 'Bloco 2: vantagem: abrir de qualquer lugar e não perder se o aparelho quebrar; cuidado: precisa de internet e de senha forte.'],
         jogo='aqui-ou-na-nuvem',
         adaptar='Mostre na prática com um aparelho, em vez de só explicar.'),
    aula(n=20, bim=3, titulo='Backup: cópia de segurança', habs=['EF05CO06'],
         objetivo='Entender a importância de guardar cópias dos dados em mais de um lugar.',
         material='Dispositivos com o jogo Aqui ou na Nuvem? e a folha do estudante.',
         passos=['História (10 min): alguém perdeu todas as fotos quando o celular caiu na água. Como evitar?', 'Jogo (20 min).', 'Folha (20 min).'],
         turma='Backup é uma cópia de segurança. Guardando os dados em dois lugares (por exemplo, no computador e na nuvem), se um falhar, o outro está lá.',
         atividade=bloco(1, 'Planeje o backup dos trabalhos da turma: onde ficam e onde fica a cópia?', escrever(2)) +
                   bloco(2, 'Certo ou errado?', tabela(['Situação', 'C ou E'], [['Guardar o trabalho só no pendrive e emprestar o pendrive.', ''], ['Ter uma cópia na nuvem e outra no computador.', ''], ['Usar senha fraca na nuvem.', '']])),
         gabarito=['Bloco 1: por exemplo: no computador da escola e uma cópia na pasta on-line da turma.', 'Bloco 2: E, C, E.'],
         jogo='aqui-ou-na-nuvem',
         adaptar='Use a analogia da chave reserva de casa para quem precisa de exemplo concreto.'),
    aula(n=21, bim=3, titulo='O sistema operacional', habs=['EF05CO07'],
         objetivo='Reconhecer a necessidade de um sistema operacional para executar programas e gerenciar o hardware.',
         material='Um computador ou celular ligado ao projetor e a folha do estudante.',
         passos=['Ligando (10 min): ligue o computador e mostre o que aparece até a área de trabalho. Quem está trabalhando ali?',
                 'O maestro (15 min): abra dois programas. Quem decide quem usa a tela? O sistema operacional.', 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='O sistema operacional é o programa principal do computador. Ele liga tudo, reconhece o teclado e a tela, abre os outros programas e divide o processador e a memória entre eles. '
               'É como o maestro de uma orquestra. Exemplos: Windows, Linux, macOS, Android e iOS.',
         atividade=bloco(1, 'Escreva três tarefas do sistema operacional.', escrever(3)) +
                   bloco(2, 'Qual é o sistema operacional do celular ou do computador que você usa? (Se não souber, pergunte a um adulto.)', escrever(1)),
         gabarito=['Bloco 1: abrir e fechar programas; reconhecer teclado, mouse e outras peças; organizar arquivos e pastas; dividir memória e processador; pedir senha.', 'Bloco 2: resposta pessoal.'],
         jogo='o-maestro',
         adaptar='Mostre os recursos de acessibilidade do sistema operacional (lupa, leitor de tela, contraste), que ajudam estudantes com diferentes necessidades.'),
    aula(n=22, bim=3, titulo='Jogo: O Maestro do Computador', habs=['EF05CO07'],
         objetivo='Consolidar o papel do sistema operacional e explorar as configurações de um dispositivo.',
         material='Dispositivos com o jogo O Maestro do Computador e a folha do estudante.',
         passos=['Jogo (20 min).', 'Explorar (15 min): com a professora, abram as configurações e encontrem: brilho, volume, acessibilidade, armazenamento.', 'Folha (15 min).'],
         turma='No jogo, você descobre o que o sistema operacional faz. Depois, vamos olhar as configurações de um aparelho: é ali que conversamos com o maestro.',
         atividade=bloco(1, 'Encontre nas configurações e anote.', tabela(['Configuração', 'O que faz'], [['Brilho', ''], ['Acessibilidade', ''], ['Armazenamento', '']])) +
                   bloco(2, 'Pinte uma estrela para cada fase do jogo que você terminou.', figs(['estrela-f:branco'] * 6, 12)),
         gabarito=['Bloco 1: brilho: claridade da tela; acessibilidade: recursos para diferentes necessidades (leitor de tela, lupa, legendas); armazenamento: espaço usado e livre.', 'Bloco 2: depende da criança.'],
         jogo='o-maestro',
         adaptar='Explore primeiro no projetor, depois em duplas.'),
    aula(n=23, bim=3, titulo='O computador da turma', habs=['EF05CO05', 'EF05CO06', 'EF05CO07'],
         objetivo='Sintetizar o bimestre montando um cartaz do computador da turma com todas as partes.',
         material='Cartolina, figuras recortadas e a folha do estudante.',
         passos=['Grupos (35 min): cada grupo faz uma parte do cartaz: entrada, processador, armazenamento (local e nuvem), saída e sistema operacional.',
                 'Apresentação (15 min).'],
         turma='Vamos juntar tudo num cartaz: as partes do computador, onde os dados ficam guardados e o maestro que organiza tudo.',
         atividade=bloco(1, 'Desenhe o computador da turma e ligue cada parte ao seu nome.', desenho('90mm')) +
                   bloco(2, 'Explique em uma frase o que o sistema operacional faz.', escrever(2)),
         gabarito=['Respostas do grupo. Confira se aparecem as quatro partes e o sistema operacional.'],
         adaptar='Use peças concretas (sucata) para quem prefere montar a desenhar.'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF05CO05', 'EF05CO06', 'EF05CO07'],
         objetivo='Verificar se a criança identifica os componentes, o armazenamento local e remoto e o papel do sistema operacional.',
         material='A folha de avaliação.',
         passos=['Revisão (15 min).', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre o computador por dentro.',
         atividade=bloco(1, 'Escreva um exemplo de: entrada ______ saída ______ armazenamento ______. Qual peça faz as contas? ______', '') +
                   bloco(2, 'Sem internet, você consegue abrir um arquivo guardado na nuvem? Por quê?', escrever(2)) +
                   bloco(3, 'Por que o computador precisa do sistema operacional?', escrever(2)),
         gabarito=['Bloco 1: teclado; monitor; pendrive ou disco; o processador.', 'Bloco 2: não, porque o arquivo está num computador distante, acessado pela internet.',
                   'Bloco 3: para abrir os programas e controlar o hardware (tela, teclado, memória).', 'Critério: domina com os 3 blocos; em desenvolvimento com 2; retomada com 0 ou 1.'],
         adaptar='Aplique oralmente para quem precisa.'),

    # =================== 4º bimestre ===================
    aula(n=25, bim=4, titulo='Confiável ou não?', habs=['EF05CO08'],
         objetivo='Acessar informações na internet de forma crítica, distinguindo conteúdos confiáveis de não confiáveis.',
         material='Exemplos impressos ou projetados de conteúdos (notícia de jornal, boato, propaganda disfarçada, golpe de prêmio) e a folha do estudante.',
         passos=['Classificar (20 min): em grupos, a turma separa os exemplos em confiável e não confiável e aponta os sinais.', 'Folha (20 min).', 'Fechamento (10 min).'],
         turma='Sinais de alerta na internet: não tem autor nem data, o título é exagerado, pede para repassar, promete prêmio, pede senha ou dados. Conteúdo confiável mostra quem fez, quando e de onde tirou a informação.',
         atividade=bloco(1, 'Escreva C (confiável) ou N (não confiável) e o sinal que você viu.',
                         tabela(['Conteúdo', 'C ou N', 'Sinal'], [['"Clique aqui e ganhe um tablet!"', '', ''], ['Reportagem com autor, data e fontes', '', ''], ['"Repasse para 20 pessoas ou terá azar"', '', ''], ['Página de museu de ciências', '', '']])),
         gabarito=['N (promete prêmio); C (autor, data, fontes); N (pede para repassar, ameaça); C (instituição responsável).'],
         jogo='confiavel-ou-nao',
         adaptar='Leia os exemplos em voz alta e use exemplos reais da faixa etária (jogos e vídeos).'),
    aula(n=26, bim=4, titulo='Jogo: Confiável ou Não?', habs=['EF05CO08'],
         objetivo='Praticar a avaliação crítica de conteúdos.',
         material='Dispositivos com o jogo Confiável ou Não? e a folha do estudante.',
         passos=['Jogo (20 min).', 'Checagem real (20 min): a turma checa uma curiosidade da internet em três fontes.', 'Folha (10 min).'],
         turma='No jogo você separa o que é confiável do que não é. Depois vamos checar uma curiosidade de verdade em mais de uma fonte.',
         atividade=bloco(1, 'Curiosidade checada: escreva a curiosidade e as três fontes que você consultou.', escrever(4)) +
                   bloco(2, 'As fontes concordam? É confiável?', escrever(1)),
         gabarito=['Respostas pessoais. Valorize fontes com autoria e instituições conhecidas.'],
         jogo='confiavel-ou-nao',
         adaptar='Duplas de leitura para a checagem.'),
    aula(n=27, bim=4, titulo='Quem criou? Direitos autorais', habs=['EF05CO09'],
         objetivo='Reconhecer que obras (fotos, músicas, textos, vídeos) têm autor e que seu uso tem regras.',
         material='Exemplos de obras com autoria e licença (Creative Commons), e a folha do estudante.',
         passos=['Minha obra (10 min): cada criança faz um desenho rápido. Se alguém copiar e disser que é seu, como você se sente?',
                 'Direitos autorais (15 min): o autor decide como a obra pode ser usada. Algumas obras têm licença livre, que permite usar citando o autor.',
                 'Folha (20 min).', 'Fechamento (5 min).'],
         turma='Toda foto, música, texto e desenho tem um autor. O autor tem direitos sobre a obra. Para usar, precisamos de permissão ou de uma licença que permita, e sempre citamos quem criou. Copiar e dizer que é seu é plágio.',
         atividade=bloco(1, 'Pode usar (P) ou precisa de permissão (PP)?', tabela(['Situação', 'P ou PP'], [['Foto que eu tirei', ''], ['Música famosa no vídeo da turma', ''], ['Imagem com licença livre, citando o autor', ''], ['Desenho do colega no jornal', '']])) +
                   bloco(2, 'Escreva como citar uma imagem que você usou num trabalho.', escrever(2)),
         gabarito=['Bloco 1: P; PP; P; PP.', 'Bloco 2: por exemplo "Imagem: nome do autor, site de onde foi tirada, licença".'],
         jogo='pode-usar',
         adaptar='Use as obras da própria turma como exemplo de autoria.'),
    aula(n=28, bim=4, titulo='Jogo: Pode Usar?', habs=['EF05CO09'],
         objetivo='Praticar decisões sobre uso de obras em diferentes mídias digitais.',
         material='Dispositivos com o jogo Pode Usar? e a folha do estudante.',
         passos=['Jogo (20 min).', 'Buscar imagens livres (20 min): a turma procura imagens com licença livre e anota autor e fonte.', 'Folha (10 min).'],
         turma='No jogo você decide se pode usar cada obra. Depois vamos procurar imagens com licença livre e anotar quem são os autores.',
         atividade=bloco(1, 'Anote 2 imagens livres que você encontrou.', tabela(['Assunto', 'Autor', 'Site', 'Licença'], [['', '', '', ''], ['', '', '', '']])),
         gabarito=['Respostas pessoais. Confira se a licença permite o uso e se o autor foi anotado.'],
         jogo='pode-usar',
         adaptar='Indique de antemão um banco de imagens livres simples de usar.'),
    aula(n=29, bim=4, titulo='Tecnologia e trabalho', habs=['EF05CO10'],
         objetivo='Expressar-se de forma crítica e criativa sobre as mudanças tecnológicas no mundo do trabalho e na sociedade.',
         material='Fotos antigas de profissões, dispositivos com o jogo Ontem e Hoje e a folha do estudante.',
         passos=['Antes e agora (15 min): mostre fotos de profissões de antigamente. Como são hoje?', 'Jogo (15 min).', 'Entrevista (tarefa): perguntar a um adulto como a tecnologia mudou o trabalho dele.', 'Folha (20 min).'],
         turma='A tecnologia muda o jeito de trabalhar. Algumas tarefas passaram a ser feitas por máquinas, outras profissões surgiram, como criador de aplicativos e analista de dados. Por isso, aprender sempre é importante.',
         atividade=bloco(1, 'Complete.', tabela(['Profissão', 'Como era', 'Como é hoje'], [['Bancário', '', ''], ['Fotógrafo', '', ''], ['Professor', '', '']])) +
                   bloco(2, 'Invente uma profissão do futuro e explique o que ela faz.', escrever(3)),
         gabarito=['Bloco 1: respostas como: contava dinheiro à mão / usa sistemas e caixas automáticos; revelava filmes / usa câmera digital e edição; só quadro e livro / também usa recursos digitais.', 'Bloco 2: resposta criativa.'],
         jogo='ontem-e-hoje',
         adaptar='A entrevista pode ser gravada em áudio ou vídeo.'),
    aula(n=30, bim=4, titulo='A tecnologia certa', habs=['EF05CO11'],
         objetivo='Identificar a adequação de diferentes tecnologias para resolver problemas.',
         material='Cartões com problemas e dispositivos com o jogo A Tecnologia Certa.',
         passos=['Problemas da escola (15 min): a turma lista problemas (barulho no refeitório, livros perdidos, lembrar de beber água).', 'Jogo (15 min).',
                 'Folha (20 min): escolher uma tecnologia para um problema e justificar.'],
         turma='Nem sempre a tecnologia mais moderna é a melhor. A tecnologia certa resolve o problema, é fácil de usar, está ao nosso alcance e é segura. Às vezes, um papel e um lápis resolvem.',
         atividade=bloco(1, 'Escolha a tecnologia e justifique.', tabela(['Problema', 'Tecnologia', 'Por quê?'], [['Organizar os livros da sala', '', ''], ['Lembrar o horário do remédio', '', ''], ['Mostrar a pesquisa para as famílias', '', '']])),
         gabarito=['Respostas como: planilha ou fichas; alarme do celular; apresentação ou cartaz. Valorize justificativas sobre custo, facilidade e acesso.'],
         jogo='tecnologia-certa',
         adaptar='Inclua tecnologias assistivas nos exemplos (leitor de tela, legendas, teclado ampliado).'),
    aula(n=31, bim=4, titulo='Projeto: feira de soluções', habs=['EF05CO11', 'EF05CO10', 'EF05CO08', 'EF05CO09'],
         objetivo='Propor em grupo uma solução tecnológica para um problema real da escola, com fontes confiáveis e respeito aos direitos autorais.',
         material='Cartolina, dispositivos para pesquisa e apresentação e a folha do estudante.',
         passos=['Escolher o problema (10 min).', 'Pesquisar e planejar (25 min): fontes confiáveis, imagens livres.', 'Apresentar na feira (15 min).'],
         turma='Cada grupo vai propor uma solução para um problema da escola. Pode ser um aplicativo imaginado, uma planilha, um cartaz com QR code ou até uma solução sem tecnologia. O importante é explicar por que a solução é adequada.',
         atividade=bloco(1, 'Ficha do projeto.', tabela(['Item', 'Resposta'], [['Problema', ''], ['Solução', ''], ['Por que é adequada', ''], ['Fontes consultadas', ''], ['Imagens usadas e autores', '']])),
         gabarito=['Respostas do grupo. Confira a justificativa, as fontes e a citação dos autores.'],
         adaptar='Organize grupos heterogêneos e papéis definidos.'),
    aula(n=32, bim=4, titulo='Avaliação final e festa dos jogos', habs=['EF05CO01', 'EF05CO02', 'EF05CO03', 'EF05CO04', 'EF05CO05', 'EF05CO06', 'EF05CO07', 'EF05CO08', 'EF05CO09'],
         objetivo='Verificar as aprendizagens do ano e celebrar o fim dos anos iniciais.',
         material='A folha de avaliação e os jogos do ano.',
         passos=['Avaliação (25 min).', 'Festa dos jogos e roda final (25 min).'],
         turma='Fim do 5º ano: mostramos o que aprendemos e depois jogamos.',
         atividade=bloco(1, 'Lista: 5, 2, 8. Insira 4 no fim e ordene: ________', '') +
                   bloco(2, 'A = V, B = F. A E B = ___ &nbsp; A OU B = ___ &nbsp; NÃO A = ___', '') +
                   bloco(3, 'SE a nota for 6 ou mais, ENTÃO "aprovado", SENÃO "estudar mais". Notas 7 e 4: ________', '') +
                   bloco(4, 'Ligue: teclado / processador / pendrive / monitor → entrada, contas, guardar, saída.', escrever(1)) +
                   bloco(5, 'Local ou remoto? Foto na galeria: ___ &nbsp; E-mail: ___', '') +
                   bloco(6, 'Cite um sinal de conteúdo não confiável e como usar uma imagem de outra pessoa.', escrever(2)),
         gabarito=['Bloco 1: 2, 4, 5, 8. Bloco 2: F, V, F. Bloco 3: aprovado; estudar mais.', 'Bloco 4: teclado-entrada, processador-contas, pendrive-guardar, monitor-saída. Bloco 5: local; remoto.', 'Bloco 6: sem autor ou data, ou título exagerado; pedir permissão ou usar licença livre e citar o autor.',
                   'Domina com 5 ou 6 acertos; retomar com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos, com leitura em voz alta para quem precisa.'),
]
