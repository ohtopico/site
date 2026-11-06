"""Jogos do 1º ano (EF01CO01 a EF01CO07). Sem leitura: figuras, cores, sons e voz opcional."""


def fila(*s):
    return {'fila': list(s)}


def cor(c):
    return {'cor': c}


def prog(*ds):
    return [{'d': d} for d in ds]


JOGOS1 = [
    dict(
        id='caixas-arrumadas', titulo='Caixas Arrumadas', ano=1, habs=['EF01CO01'], tempo='10–15 min',
        resumo='Jogo sem leitura para o 1º ano: separar objetos pela cor, pela forma e pelo uso, completar padrões e achar o diferente.',
        como=['A criança vê um objeto de cada vez e toca na caixa certa. A caixa mostra o critério: uma cor, uma forma ou um desenho que representa o grupo.',
              'Nas fases com ponto de interrogação, ela descobre o padrão da fila e escolhe a figura que falta. Nas últimas, acha a figura diferente das outras.'],
        fases=[
            dict(tipo='classificar', fala='Guarde cada objeto na caixa da mesma cor.', caixas=['cor:vermelho', 'cor:azul'],
                 itens=[{'f': 'circulo:vermelho', 'caixa': 0}, {'f': 'estrela-f:azul', 'caixa': 1}, {'f': 'quadrado:vermelho', 'caixa': 0},
                        {'f': 'coracao-f:azul', 'caixa': 1}, {'f': 'triangulo:azul', 'caixa': 1}, {'f': 'estrela-f:vermelho', 'caixa': 0}]),
            dict(tipo='classificar', fala='Agora guarde pela forma: os círculos numa caixa, os triângulos na outra.', caixas=['forma:circulo', 'forma:triangulo'],
                 itens=[{'f': 'circulo:amarelo', 'caixa': 0}, {'f': 'triangulo:verde', 'caixa': 1}, {'f': 'circulo:roxo', 'caixa': 0},
                        {'f': 'triangulo:vermelho', 'caixa': 1}, {'f': 'circulo:azul', 'caixa': 0}, {'f': 'triangulo:amarelo', 'caixa': 1}]),
            dict(tipo='classificar', fala='O que é de comer vai no prato. O que é de brincar vai no presente.', caixas=['prato', 'presente'],
                 itens=[{'f': 'maca', 'caixa': 0}, {'f': 'bola', 'caixa': 1}, {'f': 'banana', 'caixa': 0}, {'f': 'videogame', 'caixa': 1},
                        {'f': 'pao', 'caixa': 0}, {'f': 'bicicleta', 'caixa': 1}]),
            dict(tipo='classificar', fala='Três caixas, três cores. Guarde cada coisa na caixa da sua cor.', caixas=['cor:amarelo', 'cor:verde', 'cor:vermelho'],
                 itens=[{'f': 'banana', 'caixa': 0}, {'f': 'arvore', 'caixa': 1}, {'f': 'maca', 'caixa': 2}, {'f': 'sol', 'caixa': 0},
                        {'f': 'coracao', 'caixa': 2}, {'f': 'toalha', 'caixa': 1}, {'f': 'estrela', 'caixa': 0}]),
            dict(tipo='faltando', fala='Olhe a fila. O que vem no lugar da interrogação?',
                 seq=['circulo:vermelho', 'quadrado:azul', 'circulo:vermelho', 'quadrado:azul', 'circulo:vermelho', None],
                 opcoes=['quadrado:azul', 'circulo:vermelho', 'triangulo:verde'], certa=0),
            dict(tipo='faltando', fala='Descubra o padrão e escolha o que falta.', seq=['maca', 'banana', 'pao', 'maca', 'banana', None],
                 opcoes=['pao', 'maca', 'ovo'], certa=0),
            dict(tipo='escolha', fala='Uma destas figuras é diferente. Qual?', opcoes=['estrela-f:amarelo', 'estrela-f:amarelo', 'estrela-f:amarelo', 'circulo:amarelo'], certa=3),
            dict(tipo='escolha', fala='Qual é diferente das outras?', opcoes=['triangulo:verde', 'triangulo:verde', 'triangulo:vermelho', 'triangulo:verde'], certa=2),
            dict(tipo='faltando', fala='Este padrão é mais difícil. O que vem agora?',
                 seq=['estrela-f:amarelo', 'estrela-f:amarelo', 'coracao-f:vermelho', 'estrela-f:amarelo', 'estrela-f:amarelo', None],
                 opcoes=['estrela-f:amarelo', 'coracao-f:vermelho', 'coracao-f:azul'], certa=1),
        ]),
    dict(
        id='passo-a-passo', titulo='Passo a Passo', ano=1, habs=['EF01CO02'], tempo='10–15 min', personagem='gato', alvo='peixe', parede='vaso',
        resumo='Jogo sem leitura para o 1º ano: pôr em ordem os passos do dia a dia, achar o passo que falta e seguir setas como um robô.',
        como=['Nas fases com quadrinhos vazios, a criança toca nas figuras na ordem em que as coisas acontecem. Os pontinhos em cima de cada vaga mostram a ordem: primeiro, segundo, terceiro.',
              'Nas fases com setas prontas, ela segue as setas com o dedo e toca na casa onde o gato vai parar. Depois ela leva o gato até o peixe, uma seta de cada vez.'],
        fases=[
            dict(tipo='sequencia', fala='A planta cresce. Toque nas figuras na ordem certa.', itens=['semente', 'broto', 'flor']),
            dict(tipo='sequencia', fala='Vamos fazer um ovo frito. O que vem primeiro?', itens=['ovo', 'frigideira', 'ovo-frito']),
            dict(tipo='faltando', fala='Acordar, depois o quê, depois a mochila e a escola?', seq=['despertador', None, 'mochila', 'escola'],
                 opcoes=['escova', 'lua', 'bolo'], certa=0),
            dict(tipo='faltando', fala='Lavar as mãos: torneira, sabonete e depois?', seq=['torneira', 'sabonete', None], opcoes=['toalha', 'bola', 'pao'], certa=0),
            dict(tipo='caminho', modo='prever', fala='Siga as setas. Toque na casa onde o gato vai parar.', cols=4, rows=3, inicio=[0, 1], alvos=[], programa=prog('d', 'd')),
            dict(tipo='caminho', modo='prever', fala='Siga as setas de novo. Onde o gato para?', cols=4, rows=4, inicio=[0, 0], alvos=[], programa=prog('d', 'd', 'b', 'b')),
            dict(tipo='caminho', modo='passo', fala='Leve o gato até o peixe. Cada seta é um passo.', cols=4, rows=4, inicio=[0, 3], alvos=[[3, 0]], paredes=[[1, 2], [2, 2]]),
            dict(tipo='sequencia', fala='Um dia inteiro. Ponha em ordem, do começo ao fim.', itens=['despertador', 'pao', 'escola', 'lua']),
        ]),
    dict(
        id='robo-ajudante', titulo='Robô Ajudante', ano=1, habs=['EF01CO03'], tempo='15 min', personagem='robo', alvo='maca', parede='arvore',
        resumo='Jogo sem leitura para o 1º ano: organizar os passos de uma tarefa e criar o primeiro algoritmo com setas para o robô buscar as maçãs.',
        como=['Primeiro a criança arruma os passos de tarefas conhecidas, como lavar as mãos. Depois monta uma fila de setas (o algoritmo) e aperta o botão verde para o robô seguir.',
              'Se o robô bater numa árvore ou não pegar todas as maçãs, ele volta ao começo e a fila de setas continua lá para ser corrigida. Tocar numa seta da fila apaga só ela.'],
        fases=[
            dict(tipo='sequencia', fala='Ensine o robô a lavar as mãos. Ponha os passos em ordem.', itens=['torneira', 'sabonete', 'mao', 'toalha']),
            dict(tipo='sequencia', fala='Agora ensine a plantar uma flor.', itens=['semente', 'regador', 'broto', 'flor']),
            dict(tipo='sequencia', fala='E a escovar os dentes.', itens=['pasta', 'escova', 'copo']),
            dict(tipo='caminho', fala='Monte as setas e aperte o botão verde. O robô vai buscar a maçã.', cols=4, rows=3, inicio=[0, 1], alvos=[[3, 1]]),
            dict(tipo='caminho', fala='Cuidado com a árvore. Monte o caminho até a maçã.', cols=4, rows=3, inicio=[0, 2], alvos=[[3, 0]], paredes=[[1, 2], [1, 1]]),
            dict(tipo='caminho', fala='Agora são duas maçãs. Pegue as duas.', cols=4, rows=4, inicio=[0, 0], alvos=[[2, 0], [2, 3]], paredes=[[1, 1], [1, 2]]),
            dict(tipo='caminho', fala='Um caminho maior. Pense antes de montar.', cols=5, rows=5, inicio=[0, 4], alvos=[[4, 0], [0, 0]],
                 paredes=[[1, 3], [2, 3], [3, 3], [1, 1], [2, 1], [3, 1]]),
            dict(tipo='sequencia', fala='Para terminar: o robô vai à escola. O que ele faz primeiro?', itens=['despertador', 'camiseta', 'mochila', 'escola']),
        ]),
    dict(
        id='carteiro-mensagens', titulo='Carteiro das Mensagens', ano=1, habs=['EF01CO04'], tempo='10–15 min',
        resumo='Jogo sem leitura para o 1º ano: guardar uma mensagem de figuras e mandar igual, ligar a mesma informação escrita de jeitos diferentes e descobrir onde ela fica guardada.',
        como=['Nas fases do envelope, a criança olha a mensagem de figuras, guarda na memória e, quando ela some, remonta na mesma ordem. É assim que a informação é guardada e enviada.',
              'Nas fases de ligar, ela junta a mesma informação mostrada de dois jeitos (a figura e a sombra, as frutas e as bolinhas). Nas outras, escolhe onde guardar uma foto e como mandar um recado para longe.'],
        fases=[
            dict(tipo='mensagem', fala='Olhe a mensagem e guarde na memória. Depois mande igualzinha.', msg=['sol', 'gato'], opcoes=['lua', 'cachorro'], tempo=4000),
            dict(tipo='mensagem', fala='Uma mensagem maior. Guarde bem.', msg=['maca', 'bola', 'flor'], opcoes=['banana', 'estrela'], tempo=5000),
            dict(tipo='pares', fala='Ligue cada figura à sua sombra. É a mesma informação de outro jeito.',
                 pares=[['gato', {'f': 'gato', 'sombra': True}], ['passaro', {'f': 'passaro', 'sombra': True}], ['carro', {'f': 'carro', 'sombra': True}],
                        ['arvore', {'f': 'arvore', 'sombra': True}]]),
            dict(tipo='pares', fala='Ligue as frutas às bolinhas com a mesma quantidade.',
                 pares=[[fila('maca', 'maca', 'maca'), fila('circulo:preto', 'circulo:preto', 'circulo:preto')],
                        [fila('maca'), fila('circulo:preto')], [fila('maca', 'maca'), fila('circulo:preto', 'circulo:preto')]]),
            dict(tipo='escolha', fala='Onde dá para guardar esta foto?', cena=['foto'], opcoes=['celular', 'banana', 'sol'], certa=0),
            dict(tipo='escolha', fala='A vovó mora longe. Como mandar um recado para ela? Tem dois jeitos certos.', cena=['familia'],
                 opcoes=['celular', 'envelope', 'bola', 'cama'], certa=[0, 1]),
            dict(tipo='mensagem', fala='A última mensagem tem quatro figuras.', msg=['estrela', 'coracao', 'sol', 'lua'], opcoes=['maca'], tempo=6000),
        ]),
    dict(
        id='codigo-cores', titulo='Código das Cores', ano=1, habs=['EF01CO05'], tempo='15 min',
        resumo='Jogo sem leitura para o 1º ano: pintar desenhos seguindo um código de formas e cores e traduzir mensagens escritas em cores.',
        como=['No alto aparece o código: cada forma vale uma cor. A criança escolhe a cor embaixo e toca nos quadradinhos com aquela forma até aparecer o desenho.',
              'Nas fases de mensagem secreta, as figuras viraram cores. Usando o código, ela troca cada cor pela figura certa.'],
        fases=[
            dict(tipo='pintar', fala='Cada forma tem uma cor. Pinte os quadradinhos seguindo o código.', legenda={'C': 'vermelho', 'Q': 'amarelo'},
                 simbolos={'C': 'circulo', 'Q': 'quadrado'}, grade=['QCQ', 'CCC', 'QCQ']),
            dict(tipo='pintar', fala='Pinte e descubra o desenho.', legenda={'T': 'vermelho', 'Q': 'amarelo', 'C': 'azul', 'L': 'marrom'},
                 simbolos={'T': 'triangulo', 'Q': 'quadrado', 'C': 'circulo', 'L': 'losango'}, grade=['CCTCC', 'CTTTC', 'TTTTT', 'QQQQQ', 'QQLQQ']),
            dict(tipo='mensagem', fala='Uma mensagem secreta em cores. Use o código e troque cada cor pela figura.', legenda={'gato': 'vermelho', 'sol': 'amarelo', 'peixe': 'azul'},
                 msg=['gato', 'sol']),
            dict(tipo='mensagem', fala='Outra mensagem secreta.', legenda={'gato': 'vermelho', 'sol': 'amarelo', 'peixe': 'azul'}, msg=['peixe', 'gato', 'sol']),
            dict(tipo='escolha', fala='Agora ao contrário. Qual fila de cores guarda estas frutas?', legenda={'maca': 'vermelho', 'banana': 'amarelo'},
                 cena=['maca', 'banana', 'maca'], opcoes=[fila(cor('vermelho'), cor('amarelo'), cor('vermelho')), fila(cor('amarelo'), cor('vermelho'), cor('amarelo')),
                                                       fila(cor('vermelho'), cor('vermelho'), cor('amarelo'))], certa=0),
            dict(tipo='pintar', fala='Um desenho maior. Siga o código.', legenda={'C': 'azul', 'T': 'laranja', 'E': 'branco'},
                 simbolos={'C': 'circulo', 'T': 'triangulo', 'E': 'estrela-f'}, grade=['CCCCCC', 'CTTTCT', 'TTETTT', 'CTTTCT', 'CCCCCC']),
            dict(tipo='pintar', fala='O último desenho. Capriche.', legenda={'Q': 'verde', 'C': 'marrom', 'E': 'amarelo', 'T': 'azul'},
                 simbolos={'Q': 'quadrado', 'C': 'circulo', 'E': 'estrela-f', 'T': 'triangulo'}, grade=['TTETT', 'TQQQT', 'QQQQQ', 'TQQQT', 'TTCTT', 'TTCTT']),
        ]),
    dict(
        id='maquinas-ajudam', titulo='Máquinas que Ajudam', ano=1, habs=['EF01CO06'], tempo='10 min',
        resumo='Jogo sem leitura para o 1º ano: ligar cada necessidade à máquina que ajuda e descobrir quais objetos têm um computador dentro.',
        como=['Nas fases de ligar, a criança toca numa figura da esquerda (uma necessidade, como roupa suja) e depois na máquina da direita que ajuda a resolver.',
              'Nas fases de escolha, ela acha o objeto que tem um computador pequeno dentro e a máquina que ajuda em cada situação. Vale conversar depois: quem usa cada máquina, só uma pessoa ou muitas?'],
        fases=[
            dict(tipo='pares', fala='Ligue cada coisa à máquina que ajuda.', pares=[['roupa-suja', 'maquina-lavar'], ['prato', 'micro-ondas'], ['carro', 'semaforo']]),
            dict(tipo='pares', fala='Mais máquinas. Ligue cada uma.', pares=[['familia', 'celular'], ['tv', 'controle-remoto'], ['nota-musical', 'fone']]),
            dict(tipo='escolha', fala='Qual destes tem um computador pequenininho dentro?', opcoes=['celular', 'bola', 'livro', 'arvore'], certa=0),
            dict(tipo='escolha', fala='E agora? Qual tem um computador dentro?', opcoes=['calculadora', 'lapis', 'pao', 'flor'], certa=0),
            dict(tipo='escolha', fala='É de noite e amanhã tem aula. Qual máquina vai acordar você?', cena=['lua', 'cama'], opcoes=['despertador', 'bola', 'banana'], certa=0),
            dict(tipo='escolha', fala='Muita gente quer atravessar a rua. Qual máquina ajuda todo mundo?', cena=['carro', 'amigos'], opcoes=['semaforo', 'fone', 'flor'], certa=0),
            dict(tipo='pares', fala='Para terminar, ligue mais três.', pares=[['foto', 'camera'], ['documento', 'impressora'], ['carta-papel', 'computador']]),
        ]),
    dict(
        id='seguro-na-rede', titulo='Seguro na Rede', ano=1, habs=['EF01CO07'], tempo='10 min',
        resumo='Jogo sem leitura para o 1º ano: decidir o que é seguro ao usar celular e tablet, proteger a senha e pedir ajuda a um adulto.',
        como=['Cada fase mostra uma situação em figuras. Nas fases com o certo e o errado, a criança responde se aquilo é seguro (certo) ou não (errado). Nas outras, escolhe o que fazer.',
              'A voz do alto-falante conta a situação. Vale ler em voz alta para a turma e conversar sobre cada uma: quem é de confiança, o que é dado pessoal, por que a senha é segredo.'],
        fases=[
            dict(tipo='escolha', fala='Uma pessoa que você não conhece pede uma foto sua pela internet. O que você faz?', cena=['desconhecido', 'mensagem', 'foto'],
                 opcoes=['adulto', 'foto'], certa=0),
            dict(tipo='vf', fala='Contar a senha do tablet para os amigos. Pode? Certo ou errado?', cena=['senha', 'amigos'], resposta=False),
            dict(tipo='vf', fala='Usar o tablet junto com um adulto da família. Certo ou errado?', cena=['tablet', 'adulto', 'crianca'], resposta=True),
            dict(tipo='escolha', fala='Alguém que você não conhece pergunta onde você mora. O que fazer?', cena=['desconhecido', 'casa', 'interrogacao'],
                 opcoes=['adulto', 'casa'], certa=0),
            dict(tipo='vf', fala='Colocar senha no celular, como um cadeado. Certo ou errado?', cena=['cadeado', 'celular'], resposta=True),
            dict(tipo='vf', fala='Um desconhecido oferece um presente pela internet e pede seu endereço. Aceitar é certo ou errado?', cena=['desconhecido', 'presente', 'casa'], resposta=False),
            dict(tipo='escolha', fala='Chegou uma mensagem que deixou você triste. O que fazer?', cena=['triste', 'mensagem'], opcoes=['adulto', 'bravo'], certa=0),
        ]),
]
