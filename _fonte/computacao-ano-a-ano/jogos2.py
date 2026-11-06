"""Jogos do 2º ano (EF02CO01 a EF02CO06). Sem leitura: figuras, cores, sons e voz opcional."""


def cor(c):
    return {'cor': c}


def prog(*ds):
    return [{'d': d[0], 'n': int(d[1:]) if len(d) > 1 else 1} for d in ds]


def sombra(f):
    return {'f': f, 'sombra': True}


JOGOS2 = [
    dict(
        id='modelos-e-sombras', titulo='Modelos e Sombras', ano=2, habs=['EF02CO01'], tempo='10–15 min',
        resumo='Jogo sem leitura para o 2º ano: reconhecer objetos pelo contorno, separar por dois atributos ao mesmo tempo e achar o que tem o atributo essencial.',
        como=['A criança liga cada objeto à sua sombra, escolhe o modelo certo e separa formas em quatro caixas, cada uma com uma cor e uma forma.',
              'Converse depois: a sombra não tem cor nem detalhes, mas a gente ainda reconhece o objeto. Ela é um modelo, que guarda só o que é essencial.'],
        fases=[
            dict(tipo='pares', fala='Ligue cada objeto à sua sombra.', pares=[['casa', sombra('casa')], ['bicicleta', sombra('bicicleta')], ['gato', sombra('gato')], ['guarda-chuva', sombra('guarda-chuva')]]),
            dict(tipo='escolha', fala='Qual sombra é deste bicho?', cena=['cachorro'], opcoes=[sombra('cachorro'), sombra('gato'), sombra('passaro')], certa=0),
            dict(tipo='escolha', fala='E desta máquina?', cena=['impressora'], opcoes=[sombra('computador'), sombra('impressora'), sombra('radio')], certa=1),
            dict(tipo='classificar', fala='Cada caixa tem uma cor e uma forma. Guarde cada peça na caixa certa.',
                 caixas=[[cor('azul'), 'circulo:branco'], [cor('azul'), 'quadrado:branco'], [cor('vermelho'), 'circulo:branco'], [cor('vermelho'), 'quadrado:branco']],
                 itens=[{'f': 'circulo:azul', 'caixa': 0}, {'f': 'quadrado:vermelho', 'caixa': 3}, {'f': 'quadrado:azul', 'caixa': 1}, {'f': 'circulo:vermelho', 'caixa': 2},
                        {'f': 'quadrado:azul', 'caixa': 1}, {'f': 'circulo:azul', 'caixa': 0}, {'f': 'circulo:vermelho', 'caixa': 2}, {'f': 'quadrado:vermelho', 'caixa': 3}]),
            dict(tipo='escolha', fala='Três destes são animais. Qual não é?', opcoes=['peixe', 'passaro', 'carro', 'gato'], certa=2),
            dict(tipo='pares', fala='Ligue cada objeto à forma que lembra ele.', pares=[['bola', 'circulo:branco'], ['tv', 'quadrado:branco'], ['estrela', 'estrela-f:branco'], ['coracao', 'coracao-f:branco']]),
            dict(tipo='faltando', fala='A forma e a cor mudam juntas. O que vem agora?',
                 seq=['circulo:azul', 'quadrado:vermelho', 'triangulo:amarelo', 'circulo:azul', 'quadrado:vermelho', None],
                 opcoes=['triangulo:amarelo', 'circulo:amarelo', 'triangulo:azul'], certa=0),
            dict(tipo='classificar', fala='Agora separe pela cor e pela forma de novo, com estrelas e corações.',
                 caixas=[[cor('amarelo'), 'estrela-f:branco'], [cor('amarelo'), 'coracao-f:branco'], [cor('verde'), 'estrela-f:branco'], [cor('verde'), 'coracao-f:branco']],
                 itens=[{'f': 'estrela-f:verde', 'caixa': 2}, {'f': 'coracao-f:amarelo', 'caixa': 1}, {'f': 'estrela-f:amarelo', 'caixa': 0}, {'f': 'coracao-f:verde', 'caixa': 3},
                        {'f': 'coracao-f:amarelo', 'caixa': 1}, {'f': 'estrela-f:verde', 'caixa': 2}]),
        ]),
    dict(
        id='repete-repete', titulo='Repete, Repete', ano=2, habs=['EF02CO02'], tempo='15 min', personagem='cachorro', alvo='bola', parede='arvore',
        resumo='Jogo sem leitura para o 2º ano: programar o cachorro com setas e repetições, prever onde ele para e usar menos blocos repetindo o mesmo passo.',
        como=['Os botões de bolinhas escolhem quantas vezes a próxima seta se repete (uma, duas, três ou quatro vezes). Depois a criança toca na seta e o bloco entra no programa com as bolinhas em cima.',
              'Algumas fases têm limite de blocos: só cabe resolver usando repetição. Nas fases de prever, ela segue o programa pronto e toca na casa onde o cachorro vai parar.'],
        fases=[
            dict(tipo='caminho', modo='prever', fala='Cada bolinha em cima da seta é uma repetição. Onde o cachorro para?', cols=5, rows=2, inicio=[0, 0], alvos=[], programa=prog('d3')),
            dict(tipo='caminho', modo='prever', fala='Siga o programa e toque onde o cachorro para.', cols=5, rows=4, inicio=[0, 0], alvos=[], programa=prog('d2', 'b3', 'd2')),
            dict(tipo='caminho', fala='Escolha as bolinhas, depois a seta. Só cabe um bloco!', cols=5, rows=2, inicio=[0, 0], alvos=[[4, 0]], vezes=[2, 3, 4], max=1),
            dict(tipo='caminho', fala='Agora com dois blocos. Use as repetições.', cols=5, rows=5, inicio=[0, 4], alvos=[[4, 0]], vezes=[2, 3, 4], max=2),
            dict(tipo='caminho', fala='Desvie das árvores com poucos blocos.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 4]], paredes=[[1, 0], [1, 1], [1, 2], [1, 3]],
                 vezes=[2, 3, 4], max=3),
            dict(tipo='caminho', fala='Duas bolas para pegar. Pense numa escada.', cols=5, rows=5, inicio=[0, 4], alvos=[[2, 2], [4, 0]], vezes=[2, 3, 4], max=4),
            dict(tipo='caminho', fala='O último caminho. Um zigue-zague.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 4]], paredes=[[0, 1], [1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3], [4, 3]],
                 vezes=[2, 3, 4], max=5),
        ]),
    dict(
        id='cada-maquina-seu-jeito', titulo='Cada Máquina do Seu Jeito', ano=2, habs=['EF02CO03'], tempo='15 min', alvo='estrela', parede='arvore',
        resumo='Jogo sem leitura para o 2º ano: programar duas máquinas que entendem instruções diferentes (setas ou andar e girar) e ligar cada máquina ao que ela faz.',
        como=['O carro entende setas: cima, baixo, esquerda e direita. O robô só entende três ordens: andar para a frente, girar para a direita e girar para a esquerda. O mesmo caminho vira programas diferentes em cada máquina.',
              'O triângulo laranja no robô mostra para onde ele está virado. Nas fases de ligar, a criança junta cada máquina ao que ela produz.'],
        fases=[
            dict(tipo='pares', fala='Cada máquina faz uma coisa. Ligue a máquina ao que ela faz.', pares=[['maquina-lavar', 'camiseta'], ['impressora', 'documento'], ['camera', 'foto'], ['micro-ondas', 'prato']]),
            dict(tipo='caminho', personagem='carro', fala='O carro entende setas. Leve o carro até a estrela.', cols=4, rows=3, inicio=[0, 2], alvos=[[3, 0]]),
            dict(tipo='caminho', personagem='robo', blocos=['f', 'gd', 'ge'], fala='O robô só anda para a frente e gira. Leve o robô até a estrela.', cols=4, rows=1, inicio=[0, 0], alvos=[[3, 0]]),
            dict(tipo='caminho', personagem='robo', blocos=['f', 'gd', 'ge'], fala='Agora ele precisa virar. Gire e ande.', cols=3, rows=3, inicio=[0, 0], alvos=[[0, 2]]),
            dict(tipo='caminho', personagem='robo', blocos=['f', 'gd', 'ge'], fala='Um caminho com curva para os dois lados.', cols=4, rows=3, inicio=[0, 2], alvos=[[3, 0]], paredes=[[1, 2], [2, 2], [3, 2], [0, 0], [1, 0]]),
            dict(tipo='caminho', personagem='carro', fala='O mesmo caminho com o carro. Ficou diferente?', cols=4, rows=3, inicio=[0, 2], alvos=[[3, 0]], paredes=[[1, 2], [2, 2], [3, 2], [0, 0], [1, 0]]),
            dict(tipo='pares', fala='Cada máquina tem os seus botões. Ligue a máquina ao jeito de dar ordens para ela.', pares=[['tv', 'controle-remoto'], ['computador', 'teclado'], ['videogame', 'jogo-tela']]),
        ]),
    dict(
        id='toca-ou-nao-toca', titulo='Toca ou Não Toca?', ano=2, habs=['EF02CO04'], tempo='10 min',
        resumo='Jogo sem leitura para o 2º ano: separar o que é hardware (dá para tocar) do que é software (programas e arquivos) e ligar cada aparelho ao programa que ele usa.',
        como=['A caixa com a mão é para as peças que dá para tocar: hardware. A caixa com os quadradinhos coloridos é para programas e arquivos que ficam dentro do aparelho: software.',
              'Vale combinar antes: a música, o jogo, o vídeo e a mensagem são software. O fone, o teclado e a impressora são hardware.'],
        fases=[
            dict(tipo='classificar', fala='Dá para tocar? Vai na caixa da mão. É programa ou arquivo? Vai na caixa dos aplicativos.', caixas=['mao', 'app'],
                 itens=[{'f': 'teclado', 'caixa': 0}, {'f': 'jogo-tela', 'caixa': 1}, {'f': 'mouse', 'caixa': 0}, {'f': 'nota-musical', 'caixa': 1}, {'f': 'monitor', 'caixa': 0},
                        {'f': 'video', 'caixa': 1}]),
            dict(tipo='classificar', fala='Mais coisas para separar: hardware ou software?', caixas=['mao', 'app'],
                 itens=[{'f': 'impressora', 'caixa': 0}, {'f': 'mensagem', 'caixa': 1}, {'f': 'fone', 'caixa': 0}, {'f': 'foto', 'caixa': 1}, {'f': 'pendrive', 'caixa': 0},
                        {'f': 'documento', 'caixa': 1}, {'f': 'chip', 'caixa': 0}]),
            dict(tipo='pares', fala='Cada aparelho usa um programa. Ligue os dois.', pares=[['caixa-som', 'nota-musical'], ['impressora', 'documento'], ['camera', 'foto'], ['tv', 'video']]),
            dict(tipo='escolha', fala='Qual destes é um programa, e não uma peça?', opcoes=['teclado', 'mouse', 'jogo-tela', 'impressora'], certa=2),
            dict(tipo='escolha', fala='Qual destes é uma peça que dá para tocar?', opcoes=['mensagem', 'nota-musical', 'mouse', 'video'], certa=2),
            dict(tipo='escolha', fala='O computador sem programa nenhum consegue mostrar um jogo? Toque no certo ou no errado.', cena=['computador', '!app'],
                 opcoes=['certo', 'errado'], certa=1, fixa=True),
        ]),
    dict(
        id='tecnologia-por-perto', titulo='Tecnologia por Perto', ano=2, habs=['EF02CO05'], tempo='10 min',
        resumo='Jogo sem leitura para o 2º ano: descobrir as tecnologias que usamos em casa, na escola e na rua, e separar os aparelhos pelas suas características.',
        como=['Nas fases de escolha, a criança vê um lugar ou uma situação e escolhe a tecnologia que ajuda ali. Nas de separar, ela observa uma característica do aparelho, como ter tela ou não.',
              'Depois do jogo, faça uma lista com a turma das tecnologias da escola e de casa e de quem usa cada uma.'],
        fases=[
            dict(tipo='escolha', fala='Na escola, a professora quer mostrar um vídeo para a turma. Qual tecnologia ajuda?', cena=['escola', 'professora'], opcoes=['tv', 'maquina-lavar', 'geladeira'], certa=0),
            dict(tipo='escolha', fala='Em casa, a roupa está suja. Qual tecnologia ajuda?', cena=['casa', 'roupa-suja'], opcoes=['impressora', 'maquina-lavar', 'calculadora'], certa=1),
            dict(tipo='escolha', fala='Na rua, as pessoas querem atravessar com segurança. Qual tecnologia ajuda?', cena=['carro', 'amigos'], opcoes=['fone', 'radio', 'semaforo'], certa=2),
            dict(tipo='classificar', fala='Este aparelho tem tela? Separe: com tela de um lado, sem tela do outro.', caixas=['monitor', '!monitor'],
                 itens=[{'f': 'celular', 'caixa': 0}, {'f': 'caixa-som', 'caixa': 1}, {'f': 'tablet', 'caixa': 0}, {'f': 'fone', 'caixa': 1}, {'f': 'notebook', 'caixa': 0},
                        {'f': 'microfone', 'caixa': 1}]),
            dict(tipo='classificar', fala='Onde a gente mais vê cada tecnologia? Na escola ou em casa?', caixas=['escola', 'casa'],
                 itens=[{'f': 'impressora', 'caixa': [0, 1]}, {'f': 'geladeira', 'caixa': 1}, {'f': 'maquina-lavar', 'caixa': 1}, {'f': 'micro-ondas', 'caixa': 1},
                        {'f': 'computador', 'caixa': [0, 1]}, {'f': 'tv', 'caixa': [0, 1]}]),
            dict(tipo='pares', fala='Ligue cada tecnologia ao que ela faz por nós.', pares=[['despertador', 'cama'], ['celular', 'familia'], ['mapa', 'carro'], ['calculadora', 'documento']]),
        ]),
    dict(
        id='cuidado-com-o-aparelho', titulo='Cuidado com o Aparelho', ano=2, habs=['EF02CO06'], tempo='10 min',
        resumo='Jogo sem leitura para o 2º ano: decidir se cada atitude com celular, tablet e computador é segura ou não, com água, tomada, volume, tempo de tela e senha.',
        como=['Cada fase mostra uma cena com figuras. A criança responde com o certo (seguro) ou o errado (perigoso). A voz do alto-falante conta a cena.',
              'Converse sobre cada uma: água e aparelho não combinam, tomada é com um adulto, volume alto machuca o ouvido, tela antes de dormir atrapalha o sono.'],
        fases=[
            dict(tipo='vf', fala='Usar o celular perto da água da pia. É seguro?', cena=['celular', 'torneira', 'agua-gota'], resposta=False),
            dict(tipo='vf', fala='Um adulto liga o carregador na tomada. É seguro?', cena=['adulto', 'carregador', 'tomada'], resposta=True),
            dict(tipo='vf', fala='Mexer na tomada com a mão molhada. É seguro?', cena=['mao', 'agua-gota', 'tomada'], resposta=False),
            dict(tipo='vf', fala='Ouvir música no fone com o volume bem alto. Faz bem?', cena=['fone', 'alto-falante', 'alto-falante'], resposta=False),
            dict(tipo='vf', fala='Usar o tablet um pouco e depois fazer uma pausa. Está certo?', cena=['tablet', 'relogio', 'bola'], resposta=True),
            dict(tipo='vf', fala='Jogar no celular na cama, no escuro, antes de dormir. Faz bem?', cena=['celular', 'cama', 'lua'], resposta=False),
            dict(tipo='vf', fala='Guardar o notebook fechado longe do lanche. Está certo?', cena=['notebook', 'mochila'], resposta=True),
            dict(tipo='escolha', fala='O tablet caiu e a tela quebrou. O que você faz?', cena=['tablet', 'errado'], opcoes=['adulto', 'mao'], certa=0),
        ]),
]
