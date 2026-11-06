"""2º ano: ano letivo de Computação (BNCC EF02CO01 a EF02CO06), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
No 2º ano a leitura ainda está começando: a professora lê as instruções em voz alta e a criança responde com figuras, setas e desenhos.
"""
from folhas import (bloco, lado, caixas_separar, certo_errado, circular, desenho, figs, ligar, malha, numerar, setas, vagas_setas, tabela)

ANO = 2
TITULO = 'Computação no 2º ano'
RESUMO = ('Um ano letivo completo de Computação para o 2º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, mais seis jogos que não pedem leitura.')
APRESENTACAO = [
    'No 2º ano, a turma aprofunda o que começou no 1º: cria modelos e descobre o que é essencial em cada objeto, programa com repetições, '
    'percebe que cada máquina entende as suas próprias instruções, separa o que é peça (hardware) do que é programa (software), '
    'observa a tecnologia ao redor e aprende a cuidar dos aparelhos e de si mesma ao usá-los.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada (sem computador), uma folha para imprimir e, em algumas, um jogo no computador, '
    'no tablet ou no celular. Os jogos não pedem leitura: funcionam com figuras, sons e uma voz opcional.',
    'As folhas ainda são para a professora ler a instrução em voz alta. A criança responde circulando, ligando, numerando, desenhando setas e pintando.',
]
BIMESTRES = [
    ('Modelos e atributos', 'Criar e comparar modelos de objetos (desenhos, maquetes, sombras, mapas) e descobrir o que é essencial em cada um.'),
    ('Repetir para programar', 'Criar e simular algoritmos com repetições simples, prever o resultado e perceber como a precisão da instrução muda o que acontece.'),
    ('Máquinas, hardware e software', 'Descobrir que cada máquina entende um conjunto próprio de instruções e diferenciar as peças (hardware) dos programas (software).'),
    ('Tecnologia no dia a dia e cuidados', 'Reconhecer as tecnologias de casa, da escola e da rua e os cuidados de segurança ao usar aparelhos.'),
]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


AULAS = [
    # =================== 1º bimestre: modelos ===================
    aula(n=1, bim=1, titulo='O que é um modelo', habs=['EF02CO01'],
         objetivo='Perceber que um modelo é uma representação de um objeto de verdade, como um desenho, um brinquedo ou uma maquete.',
         material='Um carrinho de brinquedo, uma boneca, um mapa simples, um globo (se houver), fotos de objetos e a folha do estudante.',
         passos=['Roda (10 min): mostre o carrinho. Ele é um carro? Não, mas representa um carro. É um modelo. Faça o mesmo com a boneca e o globo.',
                 'Caça aos modelos (15 min): em grupos, a turma procura na sala coisas que representam outras (o mapa, o calendário, o desenho no cartaz, o brinquedo).',
                 'Folha (15 min): leia cada instrução em voz alta.',
                 'Fechamento (10 min): o computador também usa modelos: o jogo de corrida tem um modelo de carro, o mapa do celular tem um modelo da cidade.'],
         turma='Este carrinho não anda na rua e ninguém cabe dentro dele. Mas, quando eu olho para ele, sei que é um carro. Ele é um modelo: uma representação do carro de verdade. '
               'Um desenho, um brinquedo, um mapa e uma maquete são modelos. O computador também usa modelos para mostrar carros, casas e cidades nos jogos.',
         atividade=bloco(1, 'Ligue cada objeto de verdade ao seu modelo (o desenho só com o contorno).', ligar(['casa', 'carro', 'arvore', 'peixe'], ['~peixe', '~casa', '~arvore', '~carro'])) +
                   bloco(2, 'Circule os que são modelos de outra coisa.', circular(['mapa', 'globo', 'banana', 'foto'], 17)) +
                   bloco(3, 'Desenhe um modelo da sua casa.', desenho('40mm')),
         gabarito=['Bloco 1: casa com o contorno da casa, carro com o contorno do carro, árvore com a árvore, peixe com o peixe.',
                   'Bloco 2: mapa (modelo de um lugar), globo (modelo da Terra) e foto (representação de uma cena). A banana é uma fruta de verdade.',
                   'Bloco 3: resposta livre. Valorize porta, janela e telhado, que são atributos essenciais de uma casa.'],
         adaptar='Para estudantes cegos ou com baixa visão, use objetos de verdade e miniaturas para comparar pelo tato (uma colher e uma colher de brinquedo). Para quem termina antes, peça um modelo da escola.'),
    aula(n=2, bim=1, titulo='O que não pode faltar', habs=['EF02CO01'],
         objetivo='Identificar os atributos essenciais de um objeto, aqueles sem os quais ele não seria reconhecido.',
         material='Desenhos incompletos no quadro (uma bicicleta sem rodas, um gato sem orelhas, uma casa sem telhado) e a folha do estudante.',
         passos=['Desenho mistério (15 min): desenhe no quadro aos poucos. A cada traço, a turma tenta adivinhar o que é. Qual traço fez todo mundo descobrir?',
                 'O que falta? (10 min): mostre os desenhos incompletos. A turma diz o que está faltando e por que aquilo é importante.',
                 'Folha (15 min).',
                 'Conversa (10 min): atributo é uma característica. Alguns atributos são essenciais (a roda da bicicleta), outros não (a cor da bicicleta).'],
         turma='Uma bicicleta pode ser azul, vermelha ou verde. A cor muda, mas continua sendo bicicleta. Agora, se tirar as rodas, ela deixa de ser bicicleta. '
               'As rodas são um atributo essencial. Quando a gente faz um modelo, precisa manter os atributos essenciais. O resto pode mudar.',
         atividade=bloco(1, 'Olhe o gato. Circule o que não pode faltar num desenho de gato.', figs(['gato'], 18) + circular(['olho', 'mochila', 'chave', 'tenis'], 15)) +
                   bloco(2, 'A cor muda, mas é a mesma coisa? Circule o certo ou o errado.', certo_errado([['estrela-f:azul', 'estrela-f:amarelo'], ['coracao-f:vermelho', 'coracao-f:verde']], 15)) +
                   bloco(3, 'Desenhe uma bicicleta bem simples, só com o que não pode faltar.', desenho('40mm')),
         gabarito=['Bloco 1: o olho. Mochila, chave e tênis não são partes de um gato.',
                   'Bloco 2: as duas são certas: a estrela azul e a amarela continuam sendo estrelas, e os dois corações continuam sendo corações. Mudar a cor não muda o objeto.',
                   'Bloco 3: o desenho precisa ter as duas rodas, o guidão e o banco (ou o quadro). A cor e os enfeites não são essenciais.'],
         adaptar='Para quem precisa de mais apoio, use um quebra-cabeça de duas ou três peças: falta uma peça, qual? Para estudantes com deficiência visual, use objetos montáveis (um carrinho sem as rodas).'),
    aula(n=3, bim=1, titulo='Comparando modelos', habs=['EF02CO01'],
         objetivo='Comparar dois modelos do mesmo objeto e dizer o que cada um mostra e o que deixa de fora.',
         material='Dois desenhos da mesma coisa (um detalhado e um simples), um brinquedo e uma foto do mesmo animal, e a folha do estudante.',
         passos=['Dois desenhos (10 min): mostre o cachorro detalhado e o cachorro de palitinho. Os dois são cachorros? O que um tem e o outro não?',
                 'Detetives (15 min): em duplas, a turma compara a foto e o brinquedo do mesmo animal e conta três diferenças e três coisas iguais.',
                 'Folha (15 min).',
                 'Fechamento (10 min): o modelo bom depende do uso. Para brincar, serve o brinquedo. Para reconhecer de longe, serve o contorno.'],
         turma='Dois desenhos podem mostrar o mesmo cachorro. Um tem pelo, coleira e manchas. O outro é feito só com risquinhos. Os dois são modelos do cachorro. '
               'Um mostra mais detalhes, o outro é mais rápido de fazer. Cada modelo serve para uma coisa.',
         atividade=bloco(1, 'Os dois desenhos são do mesmo bicho? Ligue os iguais.', ligar(['cachorro', 'passaro', 'gato'], ['~gato', '~cachorro', '~passaro'])) +
                   bloco(2, 'Pinte a flor com as cores que você quiser. Ela continua sendo uma flor?', figs(['~flor'], 30) + circular(['certo', 'errado'], 12)) +
                   bloco(3, 'Desenhe o mesmo peixe de dois jeitos: com detalhes e só com o contorno.', lado(desenho('34mm', 'Com detalhes'), desenho('34mm', 'Só o contorno'))),
         gabarito=['Bloco 1: cachorro com cachorro, pássaro com pássaro, gato com gato.', 'Bloco 2: qualquer cor serve, e a flor continua sendo flor (certo): a cor não é um atributo essencial.',
                   'Bloco 3: respostas livres. No contorno, o peixe deve continuar reconhecível (cauda, corpo, olho).'],
         adaptar='Para estudantes com TEA, apresente os dois modelos lado a lado com um quadro "igual" e "diferente" para colar figuras. Para quem avança, proponha um terceiro modelo, como o peixe feito de formas geométricas.'),
    aula(n=4, bim=1, titulo='Sombras e contornos', habs=['EF02CO01'],
         objetivo='Reconhecer objetos pela sombra, um modelo que guarda só a forma.',
         material='Uma lanterna, objetos da sala, um lençol ou parede clara e a folha do estudante.',
         passos=['Teatro de sombras (20 min): apague a luz, ligue a lanterna e faça a sombra de objetos. A turma adivinha. Qual foi difícil? Por quê?',
                 'Conversa (5 min): a sombra não tem cor nem desenho, só a forma. Mesmo assim reconhecemos o objeto.',
                 'Folha (15 min).',
                 'Fechamento (10 min): os ícones do celular (a casinha, a lupa, o envelope) também são modelos simples assim.'],
         turma='A sombra de uma tesoura não tem cor, não tem brilho e não tem desenho. Só tem a forma. E mesmo assim todo mundo sabe que é uma tesoura. '
               'A sombra é um modelo que guarda só o essencial. Os ícones do celular funcionam do mesmo jeito: são desenhos simples que a gente reconhece rapidinho.',
         atividade=bloco(1, 'Ligue cada objeto ao seu contorno.', ligar(['guarda-chuva', 'bicicleta', 'casa'], ['~casa', '~guarda-chuva', '~bicicleta'])) +
                   bloco(2, 'Pinte de preto o contorno para virar sombra.', figs(['~estrela', '~coracao', '~maca'], 18)) +
                   bloco(3, 'Estes são ícones do celular. Ligue cada ícone ao que ele faz.', ligar(['camera', 'envelope', 'nota-musical'], ['fone', 'foto', 'mensagem'])),
         gabarito=['Bloco 1: guarda-chuva, bicicleta e casa com os seus contornos.', 'Bloco 2: as três figuras pintadas de preto por dentro.',
                   'Bloco 3: câmera com a foto, envelope com a mensagem, nota musical com o fone.'],
         jogo='modelos-e-sombras',
         adaptar='Para estudantes cegos, recorte as formas em papelão e peça que reconheçam pelo tato; a forma recortada é a "sombra" que se toca.'),
    aula(n=5, bim=1, titulo='Dois atributos ao mesmo tempo', habs=['EF02CO01'],
         objetivo='Organizar objetos olhando dois atributos de uma vez (cor e forma).',
         material='Blocos lógicos ou formas de papel em duas cores, fita crepe para fazer uma tabela no chão e a folha do estudante.',
         passos=['Tabela no chão (20 min): faça no chão uma tabela com duas linhas (azul, vermelho) e duas colunas (círculo, quadrado). Cada criança coloca uma peça na casa certa.',
                 'Pergunte (5 min): onde vai o quadrado vermelho? Por que não pode ir na casa do quadrado azul?',
                 'Folha (15 min).',
                 'Conversa (10 min): o computador também organiza com mais de um atributo, como as fotos por data e por lugar.'],
         turma='Até agora, a gente separava por uma coisa só: pela cor ou pela forma. Agora vamos olhar as duas ao mesmo tempo. '
               'Esta casa é dos círculos azuis. Esta é dos quadrados vermelhos. Para achar o lugar certo, a peça precisa combinar nas duas coisas.',
         atividade=bloco(1, 'Desenhe cada peça na casa certa da tabela.', figs(['circulo:azul', 'quadrado:vermelho', 'quadrado:azul', 'circulo:vermelho'], 14) +
                         tabela(['', 'Círculo', 'Quadrado'], [['Azul', '', ''], ['Vermelho', '', '']])) +
                   bloco(2, 'Circule a peça que é amarela e é estrela.', circular(['estrela-f:azul', 'coracao-f:amarelo', 'estrela-f:amarelo', 'circulo:amarelo'], 15)),
         gabarito=['Bloco 1: círculo azul na casa azul e círculo; quadrado vermelho na casa vermelho e quadrado; quadrado azul na casa azul e quadrado; círculo vermelho na casa vermelho e círculo.',
                   'Bloco 2: a estrela amarela (a terceira).'],
         jogo='modelos-e-sombras',
         adaptar='Para estudantes com daltonismo, troque a cor por tamanho (grande e pequeno). Para quem tem dificuldade motora, use peças grandes e a tabela no chão em vez da folha.'),
    aula(n=6, bim=1, titulo='Jogo: Modelos e Sombras', habs=['EF02CO01'],
         objetivo='Usar um jogo digital para reconhecer modelos, comparar atributos e separar por dois critérios.',
         material='Computadores, tablets ou celulares com o jogo Modelos e Sombras (em duplas) e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre a primeira fase no projetor. Mostre o botão do alto-falante, que fala a instrução, e a lâmpada da dica.',
                 'Jogo em duplas (25 min): uma criança joga e a outra ajuda; trocam a cada fase.',
                 'Registro (10 min): folha do estudante.',
                 'Conversa (5 min): qual sombra foi mais difícil de reconhecer? Por quê?'],
         turma='Hoje o jogo vai mostrar objetos e sombras. Você liga cada objeto à sua sombra e separa as peças nas caixas certas. Cada caixa tem duas regras: uma cor e uma forma.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 13)) +
                   bloco(2, 'Desenhe a sombra que foi mais difícil.', desenho('36mm')) +
                   bloco(3, 'Em que caixa vai o coração verde? Circule.', '<div class="aa-ops-fila">' + figs([{'cor': 'amarelo'}, 'estrela-f:branco'], 12) + figs([{'cor': 'verde'}, 'coracao-f:branco'], 12) + figs([{'cor': 'amarelo'}, 'coracao-f:branco'], 12) + '</div>'),
         gabarito=['Bloco 1: depende de cada criança (o jogo tem 8 fases).', 'Bloco 2: resposta pessoal.', 'Bloco 3: a caixa verde com o coração (a do meio).'],
         jogo='modelos-e-sombras',
         adaptar='O jogo funciona com voz e figuras grandes. Para estudantes cegos, ative a leitura do painel de acessibilidade e jogue junto, descrevendo as figuras.'),
    aula(n=7, bim=1, titulo='Maquete da sala', habs=['EF02CO01'],
         objetivo='Criar um modelo de um lugar (planta da sala) e comparar com o lugar de verdade.',
         material='Caixinhas de fósforo, tampinhas, papel quadriculado grande, cola e a folha do estudante.',
         passos=['Olhar de cima (10 min): como um passarinho veria a sala lá do teto? A mesa vira um retângulo, a cadeira vira um quadradinho.',
                 'Maquete (25 min): em grupos, a turma monta a planta da sala com caixinhas e tampinhas no papel.',
                 'Comparar (10 min): as maquetes dos grupos são iguais? O que todas têm (porta, quadro, mesas) e o que muda?',
                 'Folha (5 min, pode terminar em casa).'],
         turma='Um mapa é um modelo de um lugar visto de cima. Na planta da nossa sala, cada mesa vira um retângulo e cada cadeira vira um quadrado. '
               'Não precisa desenhar tudo, só o que é importante para alguém se localizar: a porta, o quadro, as mesas e a janela.',
         atividade=bloco(1, 'Esta é a planta de uma sala vista de cima. Circule a porta.', malha(5, 3, [0, 2], alvos=[[4, 0]], paredes=[[1, 1], [2, 1], [3, 1]], pers='portao', alvo='tv', parede='quadrado:branco', cel=15)) +
                   bloco(2, 'Desenhe a planta da sua sala: porta, quadro, mesa da professora e as mesas.', desenho('66mm')),
         gabarito=['Bloco 1: o portão no canto de baixo à esquerda é a porta. A tela no alto é o quadro e os quadrados do meio são mesas.',
                   'Bloco 2: resposta livre. A planta deve mostrar a porta, o quadro e as mesas nos lugares certos em relação uns aos outros.'],
         adaptar='Para estudantes cegos, monte a maquete com peças de texturas diferentes coladas numa base firme e percorra com a mão junto com a criança.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF02CO01'],
         objetivo='Verificar se a criança reconhece modelos, identifica atributos essenciais e organiza por dois atributos.',
         material='A folha de avaliação, lápis e lápis de cor.',
         passos=['Revisão (15 min): jogo do desenho mistério com a turma: quem adivinha com menos traços?',
                 'Avaliação (25 min): leia cada questão em voz alta e espere todos responderem.',
                 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre modelos: desenhos, sombras, mapas e o que não pode faltar em cada coisa. Faça com calma.',
         atividade=bloco(1, 'Ligue o objeto ao contorno.', ligar(['bicicleta', 'gato', 'casa'], ['~gato', '~casa', '~bicicleta'], 16)) +
                   lado(bloco(2, 'Circule o contorno do carro.', circular(['~onibus', '~carro', '~bicicleta'], 14)),
                        bloco(3, 'Circule o que é amarelo e é círculo.', circular(['circulo:azul', 'quadrado:amarelo', 'circulo:amarelo'], 13))) +
                   bloco(4, 'Desenhe um modelo simples de uma árvore, só com o contorno.', desenho('34mm')),
         gabarito=['Bloco 1: cada objeto com o seu contorno.', 'Bloco 2: o contorno do meio (o carro).',
                   'Bloco 3: o círculo amarelo.', 'Bloco 4: uma árvore reconhecível (tronco e copa).',
                   'Critério: domina se acerta 3 ou 4 blocos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique oralmente com objetos e miniaturas para quem precisa e registre a resposta da criança.'),

    # =================== 2º bimestre: repetição ===================
    aula(n=9, bim=2, titulo='Repetir com o corpo', habs=['EF02CO02'],
         objetivo='Perceber que algumas ações se repetem e que dá para dizer "repita 3 vezes" em vez de falar a mesma coisa muitas vezes.',
         material='Espaço livre, música animada e a folha do estudante.',
         passos=['Dança das repetições (15 min): dê comandos longos ("pula, pula, pula, palma, palma"). Depois troque por "pula 3 vezes, palma 2 vezes". Qual é mais rápido de dizer?',
                 'Turma cria (15 min): grupos inventam uma dança com repetições e ensinam para a turma.',
                 'Folha (15 min).',
                 'Fechamento (5 min): o computador adora repetir. Ele faz a mesma coisa mil vezes sem cansar e sem errar.'],
         turma='Pula, pula, pula. Eu falei pula três vezes. Fica mais fácil dizer: pula 3 vezes. Isso é uma repetição. '
               'Quando a gente programa um computador, também diz quantas vezes ele vai repetir uma ação, em vez de escrever tudo de novo.',
         atividade=bloco(1, 'Conte quantas vezes se repete e pinte o número de bolinhas.', figs(['mao', 'mao', 'mao'], 13) + figs(['circulo:branco'] * 5, 9) +
                         figs(['estrela', 'estrela'], 13) + figs(['circulo:branco'] * 5, 9)) +
                   bloco(2, 'Cada bolinha embaixo da seta é uma repetição. Desenhe as setas por extenso.', setas([('d', 3)]) + vagas_setas(4)) +
                   bloco(3, 'Desenhe uma dança com repetição: um movimento e quantas vezes ele se repete.', desenho('34mm')),
         gabarito=['Bloco 1: três bolinhas na linha das mãos; duas bolinhas na linha das estrelas.', 'Bloco 2: → → → (três setas). O quarto quadradinho fica em branco.',
                   'Bloco 3: resposta livre, por exemplo um desenho de pular e três tracinhos.'],
         adaptar='Para estudantes com deficiência física, troque pular por bater na mesa ou piscar. Para estudantes surdos, mostre a quantidade com os dedos junto com o movimento.'),
    aula(n=10, bim=2, titulo='Instrução bem clara', habs=['EF02CO02'],
         objetivo='Perceber que uma instrução pouco precisa faz o algoritmo dar errado.',
         material='Pão, geleia ou outro recheio de mentira (ou papel), uma faca sem ponta de brinquedo e a folha do estudante.',
         passos=['O robô literal (20 min): você é o robô e faz exatamente o que a turma manda para montar um sanduíche. "Passa a geleia" e você passa no prato. A turma corrige a instrução.',
                 'Conversa (10 min): por que deu errado? O que faltou dizer? Quantas vezes passar a faca?',
                 'Folha (15 min).',
                 'Fechamento (5 min): o computador é como o robô literal. Ele faz exatamente o que mandamos, nem mais, nem menos.'],
         turma='O robô só faz o que a gente manda, do jeitinho que a gente fala. Se eu disser "anda", ele não sabe para onde nem quantos passos. '
               'Por isso a instrução precisa ser clara: para onde, quanto e quantas vezes. Uma instrução precisa faz o algoritmo dar certo.',
         atividade=bloco(1, 'O robô precisa chegar na estrela. Qual programa está certo? Circule.', malha(4, 1, [0, 0], alvos=[[3, 0]], cel=14) +
                         '<div class="aa-ops-fila">' + setas([('d', 2)]) + setas([('d', 3)]) + setas([('d', 4)]) + '</div>') +
                   bloco(2, 'Este programa tem um erro. Faça um X na seta errada.', malha(3, 3, [0, 0], alvos=[[2, 2]], cel=13) + setas(['d', 'd', 'c', 'b', 'b'])),
         gabarito=['Bloco 1: a seta para a direita com três bolinhas (o robô anda 3 casas).',
                   'Bloco 2: a seta para cima (terceira) está errada: o robô sairia da malha. O programa certo é → → ↓ ↓.'],
         adaptar='Para estudantes com TEA, a brincadeira do robô literal pode gerar riso ou estranhamento: avise antes que você vai fazer de propósito tudo ao pé da letra.'),
    aula(n=11, bim=2, titulo='Setas que se repetem', habs=['EF02CO02'],
         objetivo='Escrever programas com setas usando repetição (a seta com bolinhas).',
         material='Uma malha no chão (fita crepe), cartões de setas e cartões de bolinhas, e a folha do estudante.',
         passos=['Malha no chão (20 min): uma criança é o robô. A turma monta o programa com os cartões. Quando a mesma seta aparece várias vezes, troque por uma seta e bolinhas.',
                 'Comparar (5 min): qual programa tem menos cartões? Os dois levam o robô ao mesmo lugar?',
                 'Folha (20 min).',
                 'Fechamento (5 min): repetir deixa o programa mais curto e mais fácil de ler.'],
         turma='Para andar quatro casas, posso usar quatro setas. Ou posso usar uma seta só com quatro bolinhas embaixo. O robô faz a mesma coisa. '
               'O segundo programa é mais curto. Os programadores usam a repetição para não escrever a mesma coisa muitas vezes.',
         atividade=bloco(1, 'Escreva o programa usando bolinhas: desenhe a seta e pinte as bolinhas.', malha(5, 2, [0, 0], alvos=[[4, 1]], pers='cachorro', alvo='bola', cel=14) + vagas_setas(3)) +
                   bloco(2, 'Ligue o programa comprido ao programa curto que faz a mesma coisa.',
                         '<div class="aa-ligar" style="max-width:150mm">' + ''.join(f'<div class="aa-ligar-par">{setas(a, tam=10)}<span class="ponto"></span><span></span><span class="ponto"></span>{setas(b, tam=10)}</div>'
                                                                         for a, b in [(['b', 'b', 'b'], [('d', 2)]), (['d', 'd'], [('c', 2)]), (['c', 'c'], [('b', 3)])]) + '</div>'),
         gabarito=['Bloco 1: → com quatro bolinhas e ↓ com uma bolinha (ou ↓ e depois → com quatro bolinhas).',
                   'Bloco 2: ↓ ↓ ↓ com ↓ de três bolinhas; → → com → de duas bolinhas; ↑ ↑ com ↑ de duas bolinhas.'],
         jogo='repete-repete',
         adaptar='Para quem tem dificuldade com a quantidade, use tampinhas no lugar das bolinhas para contar. Para estudantes cegos, use setas em relevo e botões colados.'),
    aula(n=12, bim=2, titulo='Programas mais curtos', habs=['EF02CO02'],
         objetivo='Reescrever programas longos usando repetição e contar quantos blocos foram economizados.',
         material='Cartões de setas, a folha do estudante e lápis.',
         passos=['Desafio (15 min): escreva no quadro um programa com dez setas. Quem consegue escrever o mesmo com menos cartões?',
                 'Duplas (15 min): uma criança cria um caminho comprido na malha; a outra encurta o programa.',
                 'Folha (15 min).',
                 'Conversa (5 min): o programa curto e o comprido dão o mesmo resultado?'],
         turma='Um programa com muitas setas iguais seguidas pode ficar mais curto. Junte as setas iguais numa só e coloque as bolinhas. '
               'Mas atenção: só dá para juntar setas iguais que estão uma do lado da outra.',
         atividade=bloco(1, 'Reescreva cada programa usando bolinhas.', setas(['d', 'd', 'd', 'b', 'b'], tam=10) + vagas_setas(2) + setas(['c', 'c', 'e', 'e', 'e', 'e'], tam=10) + vagas_setas(2)) +
                   bloco(2, 'Conte as setas. Qual programa é mais curto? Circule.', '<div class="aa-ops-fila">' + setas(['d', 'd', 'd', 'd'], tam=10) + setas([('d', 4)], tam=10) + '</div>') +
                   bloco(3, 'Dá para juntar as duas setas para a direita deste programa? Circule.', setas(['d', 'b', 'd'], tam=11) + circular(['certo', 'errado'], 12)),
         gabarito=['Bloco 1: → com três bolinhas e ↓ com duas; ↑ com duas bolinhas e ← com quatro.', 'Bloco 2: a seta com quatro bolinhas (um bloco só).',
                   'Bloco 3: errado. As duas setas para a direita estão separadas pela seta para baixo, então não dá para juntar.'],
         jogo='repete-repete',
         adaptar='Para estudantes com discalculia, deixe que contem com material concreto antes de pintar as bolinhas.'),
    aula(n=13, bim=2, titulo='Onde o robô vai parar?', habs=['EF02CO02'],
         objetivo='Simular um algoritmo com repetições e prever o resultado antes de executar.',
         material='A malha no chão, cartões de setas com bolinhas e a folha do estudante.',
         passos=['Aposta (15 min): monte um programa com os cartões. Antes de o robô andar, cada criança aponta onde acha que ele vai parar. Depois o robô anda.',
                 'Discussão (10 min): quem acertou? Como fez para descobrir? Contou com o dedo?',
                 'Folha (20 min).',
                 'Fechamento (5 min): prever é simular o programa na cabeça. Os programadores fazem isso o tempo todo.'],
         turma='Antes de apertar o botão, um bom programador pensa: onde o robô vai parar? Siga as setas com o dedo, contando as bolinhas. '
               'Se a sua previsão estiver certa, você entendeu o programa.',
         atividade=bloco(1, 'Siga o programa e faça um X onde o cachorro para.', malha(5, 3, [0, 0], pers='cachorro', cel=13) + setas([('d', 3), ('b', 2)], tam=11)) +
                   bloco(2, 'Siga o programa e faça um X onde o robô para.', malha(5, 3, [0, 2], cel=13) + setas([('c', 2), ('d', 4), 'b'], tam=11)),
         gabarito=['Bloco 1: três casas para a direita e duas para baixo: última linha, quarta casa.', 'Bloco 2: sobe duas (primeira linha), anda quatro para a direita (última coluna) e desce uma: linha do meio, última casa.'],
         jogo='repete-repete',
         adaptar='Para quem precisa de apoio, entregue uma tampinha para mover na malha a cada passo. Para quem avança, peça que invente um programa e o colega preveja.'),
    aula(n=14, bim=2, titulo='Jogo: Repete, Repete', habs=['EF02CO02'],
         objetivo='Programar com repetições no jogo e resolver fases com poucos blocos.',
         material='Dispositivos com o jogo Repete, Repete (em duplas) e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre como escolher as bolinhas e depois a seta. Mostre o limite de blocos.',
                 'Jogo (25 min): em duplas, trocando a cada fase.',
                 'Registro (10 min).',
                 'Conversa (5 min): qual fase pediu mais pensamento? Por quê?'],
         turma='No jogo, o cachorro quer pegar a bola. Escolha quantas vezes ele repete o passo e depois escolha a seta. Em algumas fases só cabem poucos blocos: use as repetições!',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 13)) +
                   bloco(2, 'Escreva com bolinhas o programa da fase que você mais gostou.', vagas_setas(5)) +
                   bloco(3, 'Escreva com poucas setas o programa para o cachorro pegar a bola.', malha(5, 5, [0, 4], alvos=[[4, 0]], pers='cachorro', alvo='bola', cel=12) + vagas_setas(2)),
         gabarito=['Bloco 1: depende de cada criança (7 fases).', 'Bloco 2: resposta pessoal.', 'Bloco 3: ↑ com quatro bolinhas e → com quatro bolinhas (ou → e depois ↑).'],
         jogo='repete-repete',
         adaptar='O jogo também funciona com teclado e leitor de tela pelo painel de acessibilidade. Combine duplas em que uma criança lê a malha e a outra monta o programa.'),
    aula(n=15, bim=2, titulo='Criando algoritmos com repetição', habs=['EF02CO02'],
         objetivo='Criar um algoritmo próprio com repetições e testá-lo com um colega.',
         material='Papel quadriculado, lápis de cor e a folha do estudante.',
         passos=['Desenho programado (10 min): no quadriculado do quadro, siga o programa "pinte 3 para a direita, 2 para baixo" e mostre o desenho que aparece.',
                 'Criar (20 min): cada criança cria um caminho na malha da folha e escreve o programa com bolinhas.',
                 'Testar (15 min): troca de folhas. O colega segue o programa. Chegou no mesmo lugar?',
                 'Fechamento (5 min): quando não chegou, onde estava o erro? Na instrução ou em quem seguiu?'],
         turma='Agora você é o programador. Desenhe um tesouro na malha e escreva o caminho com setas e bolinhas. Depois, um colega vai seguir o seu programa. '
               'Se ele chegar ao tesouro, o seu algoritmo funcionou.',
         atividade=bloco(1, 'Desenhe um tesouro em uma casa. Escreva o programa para o robô chegar até ele.', malha(5, 4, [0, 0], cel=15) + vagas_setas(4)) +
                   bloco(2, 'O colega seguiu o seu programa e chegou no tesouro? Circule.', circular(['certo', 'errado'], 14)) +
                   bloco(3, 'Se não chegou, desenhe aqui o programa consertado.', vagas_setas(4)),
         gabarito=['Bloco 1: resposta livre. Confira se as setas e as bolinhas levam o robô até a casa do tesouro.', 'Blocos 2 e 3: depende do teste. Valorize a correção do programa, porque consertar erros (depurar) faz parte de programar.'],
         adaptar='Para estudantes com deficiência visual, use a malha em relevo do bloco 1 com cola quente e um objeto como tesouro.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF02CO02'],
         objetivo='Verificar se a criança cria, simula e corrige algoritmos com repetição.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): dança das repetições, agora com a turma escolhendo os números.',
                 'Avaliação (25 min): leia cada questão em voz alta.',
                 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre repetição: escrever programas curtos, prever onde o robô para e achar erros.',
         atividade=bloco(1, 'Escreva o programa curto, com bolinhas.', setas(['d', 'd', 'd', 'b', 'b'], tam=10) + vagas_setas(2)) +
                   bloco(2, 'Faça um X onde o robô para.', malha(4, 3, [0, 0], cel=13) + setas([('b', 2), ('d', 3)], tam=11)) +
                   bloco(3, 'Escreva o programa para o cachorro pegar a bola.', malha(4, 2, [0, 1], alvos=[[3, 0]], pers='cachorro', alvo='bola', cel=13) + vagas_setas(3)),
         gabarito=['Bloco 1: → com três bolinhas e ↓ com duas.', 'Bloco 2: desce duas e anda três: última linha, última casa.',
                   'Bloco 3: ↑ uma vez e → com três bolinhas (ou → com três bolinhas e ↑).',
                   'Critério: domina com os 3 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique com a malha no chão e cartões para quem precisa, registrando a resposta.'),

    # =================== 3º bimestre: máquinas, hardware e software ===================
    aula(n=17, bim=3, titulo='Cada máquina entende um jeito', habs=['EF02CO03'],
         objetivo='Perceber que cada máquina tem os seus próprios comandos (os seus botões e as suas instruções).',
         material='Controles remotos, um teclado velho, fotos de painéis de micro-ondas e de máquina de lavar e a folha do estudante.',
         passos=['Os botões (15 min): passe os controles e os teclados pela roda. O que cada botão manda a máquina fazer?',
                 'Trocar o controle (10 min): o controle da TV liga o micro-ondas? Por quê?',
                 'Folha (15 min).',
                 'Fechamento (10 min): cada máquina entende um conjunto de instruções. O programa de uma não funciona na outra.'],
         turma='O controle da TV muda o canal e aumenta o volume. Mas ele não esquenta a comida do micro-ondas. Cada máquina entende as suas próprias instruções. '
               'Quando a gente programa uma máquina, precisa usar as instruções que ela entende.',
         atividade=bloco(1, 'Ligue cada máquina ao jeito de dar ordens para ela.', ligar(['tv', 'computador', 'tablet'], ['mouse', 'mao', 'controle-remoto'])) +
                   bloco(2, 'Ligue cada máquina ao que ela faz.', ligar(['maquina-lavar', 'impressora', 'micro-ondas'], ['documento', 'prato', 'camiseta'])),
         gabarito=['Bloco 1: TV com o controle remoto, computador com o mouse, tablet com a mão (toque na tela). Aceite outras ligações explicadas, como computador e teclado.',
                   'Bloco 2: máquina de lavar com a camiseta, impressora com o documento, micro-ondas com o prato.'],
         jogo='cada-maquina-seu-jeito',
         adaptar='Deixe estudantes cegos explorarem os botões pelo tato e perceberem que cada controle tem um formato diferente.'),
    aula(n=18, bim=3, titulo='O robô que anda e gira', habs=['EF02CO03'],
         objetivo='Programar uma máquina com outro conjunto de instruções: andar para a frente, girar para a direita e girar para a esquerda.',
         material='Cartões com ⇧ (frente), ↻ (girar para a direita) e ↺ (girar para a esquerda), malha no chão e a folha do estudante.',
         passos=['Robô de frente (20 min): uma criança é o robô e só entende três ordens: anda para a frente, gira para a direita e gira para a esquerda. A turma leva o robô até um objeto.',
                 'Comparação (10 min): com as setas, falávamos "vai para a direita". Agora o robô precisa primeiro girar e depois andar.',
                 'Folha (15 min).',
                 'Fechamento (5 min): muitos robôs de verdade, como o aspirador robô, funcionam assim.'],
         turma='Este robô é diferente. Ele não entende "vai para a direita". Ele só sabe andar para a frente e girar. Para ir para a direita, ele gira e depois anda. '
               'É outra máquina, então é outro jeito de dar ordens.',
         atividade=bloco(1, 'O robô olha para a direita. Siga o programa e faça um X onde ele para.', malha(4, 3, [0, 0], cel=13) + setas(['f', 'f', 'gd', 'f', 'f'], tam=11)) +
                   bloco(2, 'O robô olha para a direita. Escreva o programa com ⇧, ↻ e ↺ para chegar na estrela.', malha(3, 2, [0, 0], alvos=[[2, 1]], cel=13) + vagas_setas(5)),
         gabarito=['Bloco 1: anda duas casas para a direita, gira para a direita (agora olha para baixo) e anda duas: última linha, terceira casa.',
                   'Bloco 2: ⇧ ⇧ ↻ ⇧ (anda duas, gira para a direita e desce uma). Outra resposta: ↻ ⇧ ↺ ⇧ ⇧.'],
         jogo='cada-maquina-seu-jeito',
         adaptar='Use um boné com aba para mostrar para onde o robô humano está olhando. Para estudantes com lateralidade em construção, cole uma fita vermelha na mão direita.'),
    aula(n=19, bim=3, titulo='Jogo: Cada Máquina do Seu Jeito', habs=['EF02CO03'],
         objetivo='Programar duas máquinas diferentes para fazer o mesmo caminho e comparar os programas.',
         material='Dispositivos com o jogo Cada Máquina do Seu Jeito e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre o carro (setas) e o robô (frente e girar). O triângulo laranja mostra para onde o robô olha.',
                 'Jogo (25 min): em duplas.',
                 'Registro (10 min).',
                 'Conversa (5 min): o mesmo caminho precisou de quantos blocos no carro? E no robô?'],
         turma='No jogo há duas máquinas. O carro entende setas. O robô só entende andar e girar. Leve as duas até a estrela e veja como os programas ficam diferentes.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 13)) +
                   bloco(2, 'O mesmo caminho. Escreva o programa do carro (setas) e do robô (⇧ ↻ ↺). O robô olha para a direita.',
                         malha(3, 2, [0, 1], alvos=[[2, 0]], pers='carro', cel=13) + lado(figs(['carro'], 10) + vagas_setas(4), figs(['robo'], 10) + vagas_setas(5))),
         gabarito=['Bloco 1: depende de cada criança (7 fases).',
                   'Bloco 2: carro: ↑ → → (ou → → ↑). Robô olhando para a direita: ⇧ ⇧ ↺ ⇧ (anda duas, gira para a esquerda e sobe). O robô precisou de um bloco a mais por causa do giro.'],
         jogo='cada-maquina-seu-jeito',
         adaptar='Para quem precisa de apoio, jogue primeiro só as fases do carro e depois as do robô, com o boné do robô humano por perto.'),
    aula(n=20, bim=3, titulo='Hardware: as peças que tocamos', habs=['EF02CO04'],
         objetivo='Reconhecer o hardware: as partes físicas do computador e de outros aparelhos.',
         material='Um computador ou peças velhas (teclado, mouse, fone, pendrive), sucata e a folha do estudante.',
         passos=['Caixa misteriosa (15 min): coloque peças numa caixa. Cada criança pega uma sem olhar, adivinha pelo tato e diz para que serve.',
                 'Nome novo (10 min): todas essas peças que a gente pode tocar se chamam hardware.',
                 'Folha (15 min).',
                 'Conversa (10 min): no celular, onde está o hardware? A tela, o botão, a câmera, a bateria.'],
         turma='O teclado, o mouse, a tela e o fone são peças que a gente pode pegar com a mão. Todas essas peças juntas se chamam hardware. '
               'Dentro do computador também há peças, como o chip, que é o cérebro da máquina.',
         atividade=bloco(1, 'Circule as peças que dá para tocar (hardware).', circular(['teclado', 'nota-musical', 'mouse', 'fone', 'video'], 15)) +
                   bloco(2, 'Ligue cada peça ao que ela faz.', ligar(['fone', 'teclado', 'camera', 'impressora'], ['documento', 'foto', 'nota-musical', 'mensagem'])),
         gabarito=['Bloco 1: teclado, mouse e fone. A música e o vídeo não dá para pegar com a mão.',
                   'Bloco 2: fone com a música, teclado com a mensagem (digitar), câmera com a foto, impressora com o documento.'],
         jogo='toca-ou-nao-toca',
         adaptar='A caixa misteriosa é ótima para estudantes cegos. Para estudantes surdos, combine sinais para TECLADO, MOUSE e TELA com o intérprete.'),
    aula(n=21, bim=3, titulo='Software: os programas', habs=['EF02CO04'],
         objetivo='Reconhecer o software: os programas e arquivos que dão as instruções para o hardware.',
         material='Um computador, tablet ou celular ligado ao projetor e a folha do estudante.',
         passos=['O que tem dentro (15 min): abra no aparelho um jogo, um desenho, uma música e um vídeo. Dá para pegar o jogo com a mão? Não: ele é software.',
                 'O aparelho desligado (5 min): desligue a tela. O hardware continua ali, mas sem programa ele não faz nada.',
                 'Folha (20 min).',
                 'Fechamento (10 min): o hardware é o corpo e o software são as ideias e as instruções.'],
         turma='O jogo, a música, as fotos e o aplicativo de desenhar ficam dentro do aparelho, mas a gente não consegue pegar com a mão. Eles são software: programas e arquivos. '
               'O software diz para o hardware o que fazer. Sem software, o computador não sabe fazer nada.',
         atividade=bloco(1, 'Circule o que é software (programa ou arquivo).', circular(['jogo-tela', 'mouse', 'foto', 'fone', 'nota-musical'], 15)) +
                   bloco(2, 'Desenhe na caixa da mão as peças e na caixa do aplicativo os programas: mouse, jogo, fone, vídeo.', caixas_separar(['mao', 'app'], '40mm', 12)),
         gabarito=['Bloco 1: jogo, foto e música.', 'Bloco 2: mão (hardware): mouse e fone. Aplicativo (software): jogo e vídeo.'],
         jogo='toca-ou-nao-toca',
         adaptar='Para estudantes com dificuldade de abstração, use a comparação do rádio: o aparelho é hardware e a música que sai dele é software.'),
    aula(n=22, bim=3, titulo='Jogo: Toca ou Não Toca?', habs=['EF02CO04'],
         objetivo='Separar hardware e software no jogo e explicar por que um precisa do outro.',
         material='Dispositivos com o jogo Toca ou Não Toca? e a folha do estudante.',
         passos=['Retomada (5 min): mostre a caixa da mão (hardware) e a caixa do aplicativo (software).',
                 'Jogo (25 min): em duplas.',
                 'Folha (15 min).',
                 'Conversa (5 min): o fone toca a música sozinho? O que ele precisa?'],
         turma='No jogo, toque nas caixas: a da mão é para o que dá para pegar, a dos quadradinhos é para os programas e arquivos. Pense: dá para tocar?',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 6, 13)) +
                   bloco(2, 'Ligue cada peça ao programa que ela usa.', ligar(['caixa-som', 'camera', 'tv'], ['video', 'nota-musical', 'foto'])) +
                   bloco(3, 'O computador sem nenhum programa mostra um jogo? Circule.', certo_errado([['computador', '!app', 'jogo-tela']], 14)),
         gabarito=['Bloco 1: depende de cada criança (6 fases).', 'Bloco 2: caixa de som com a música, câmera com a foto, TV com o vídeo.',
                   'Bloco 3: errado. Sem software, o hardware não faz nada.'],
         jogo='toca-ou-nao-toca',
         adaptar='Para quem precisa de apoio, faça a separação com objetos de verdade e cartões antes do jogo.'),
    aula(n=23, bim=3, titulo='Computador de sucata', habs=['EF02CO04', 'EF02CO03'],
         objetivo='Montar um modelo de computador com sucata, nomeando as peças (hardware) e inventando os programas (software).',
         material='Caixas, tampinhas, rolos, cola, tesoura sem ponta, canetinhas e a folha do estudante.',
         passos=['Planejar (10 min): que peças o nosso computador vai ter? Tela, teclado, mouse, caixa de som.',
                 'Montar (25 min): em grupos, a turma constrói o computador com sucata.',
                 'Programas (10 min): cada grupo desenha na tela os aplicativos que o computador terá.',
                 'Folha (5 min).'],
         turma='Hoje vamos construir um computador de sucata. As caixas e as tampinhas vão ser o hardware. E os desenhos na tela vão ser os programas, o software. '
               'Lembre: o computador só funciona quando tem as duas coisas.',
         atividade=bloco(1, 'Desenhe o computador do seu grupo e circule de vermelho o hardware.', desenho('64mm')) +
                   bloco(2, 'Desenhe na tela os programas que o seu computador tem.', figs(['~monitor'], 70)),
         gabarito=['Bloco 1: o desenho deve ter peças como tela, teclado e mouse circuladas.', 'Bloco 2: resposta livre: jogos, desenho, música, vídeo.'],
         adaptar='Divida as tarefas no grupo conforme as habilidades de cada um: recortar, colar, desenhar, explicar. Estudantes cegos podem montar e nomear as peças pelo tato.'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF02CO03', 'EF02CO04'],
         objetivo='Verificar se a criança reconhece que cada máquina tem as suas instruções e diferencia hardware e software.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): robô humano com frente e giro, depois a caixa misteriosa de hardware.',
                 'Avaliação (25 min).',
                 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre as máquinas: cada uma tem os seus comandos, e todas têm peças (hardware) e programas (software).',
         atividade=bloco(1, 'Ligue a máquina ao que ela faz.', ligar(['impressora', 'maquina-lavar', 'camera'], ['foto', 'documento', 'camiseta'], 15)) +
                   bloco(2, 'O robô olha para a direita. Faça um X onde ele para.', malha(3, 3, [0, 0], cel=12) + setas(['f', 'gd', 'f', 'f'], tam=10)) +
                   lado(bloco(3, 'Circule o hardware.', circular(['mouse', 'foto', 'fone'], 12)),
                        bloco(4, 'Circule o software.', circular(['teclado', 'jogo-tela', 'monitor'], 12))),
         gabarito=['Bloco 1: impressora com documento, máquina de lavar com camiseta, câmera com foto.',
                   'Bloco 2: anda uma para a direita, gira (olha para baixo) e desce duas: última linha, casa do meio.',
                   'Bloco 3: mouse e fone.', 'Bloco 4: o jogo.',
                   'Critério: domina com 4 blocos certos; em desenvolvimento com 2 ou 3; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique com objetos reais (mouse, fone, uma foto impressa) para quem precisa, registrando a resposta oral.'),

    # =================== 4º bimestre: tecnologia no dia a dia e cuidados ===================
    aula(n=25, bim=4, titulo='Tecnologias da nossa casa', habs=['EF02CO05'],
         objetivo='Reconhecer as tecnologias computacionais usadas em casa e para que servem.',
         material='Figuras de aparelhos de casa (recortadas de folhetos), cartolina e a folha do estudante.',
         passos=['Passeio pela casa (10 min): imagine que estamos entrando na casa. Na cozinha, o que tem? Na sala? No quarto?',
                 'Painel (20 min): a turma cola as figuras numa casa desenhada na cartolina, cada aparelho no seu cômodo.',
                 'Folha (15 min).',
                 'Conversa (5 min): quais desses aparelhos têm um computadorzinho (chip) dentro?'],
         turma='Em casa usamos muitas tecnologias: a geladeira guarda a comida gelada, o micro-ondas esquenta, a TV mostra desenhos e o celular manda mensagens para a vovó. '
               'Muitos desses aparelhos têm um pequeno computador dentro, um chip, que segue um programa.',
         atividade=bloco(1, 'Ligue cada tecnologia ao lugar da casa onde ela costuma ficar.', ligar(['geladeira', 'tv', 'despertador'], ['cama', 'prato', 'familia'])) +
                   bloco(2, 'Desenhe as tecnologias que você tem na sua casa.', desenho('56mm')),
         gabarito=['Bloco 1: geladeira com a cozinha (prato), TV com a sala (família), despertador com o quarto (cama). Aceite outras explicações.',
                   'Bloco 2: resposta pessoal. Acolha as diferentes realidades das famílias: não é preciso ter muitos aparelhos.'],
         adaptar='Atenção às diferenças de realidade: proponha "tecnologias que você conhece" em vez de "que você tem" se houver crianças em situação de vulnerabilidade.'),
    aula(n=26, bim=4, titulo='Tecnologia na escola e na rua', habs=['EF02CO05'],
         objetivo='Reconhecer as tecnologias computacionais da escola e da rua e quem as usa.',
         material='Passeio pela escola, prancheta, dispositivos com o jogo Tecnologia por Perto e a folha do estudante.',
         passos=['Passeio (20 min): percorra a escola procurando tecnologias: computador da secretaria, impressora, caixa de som, sinal, câmera.',
                 'Jogo (15 min): Tecnologia por Perto, em duplas.',
                 'Folha (10 min).',
                 'Conversa (5 min): e na rua? Semáforo, ônibus, caixa do mercado.'],
         turma='Na escola, a secretária usa o computador para guardar os nomes da turma. Na rua, o semáforo tem um programa que troca as cores na hora certa. '
               'A tecnologia está em todo lugar, ajudando as pessoas.',
         atividade=bloco(1, 'Circule as tecnologias que você viu na escola.', circular(['computador', 'impressora', 'caixa-som', 'maquina-lavar', 'tv'], 14)) +
                   bloco(2, 'Ligue cada situação à tecnologia que ajuda.', ligar(['carro', 'roupa-suja', 'professora'], ['tv', 'semaforo', 'maquina-lavar']))
                   + bloco(3, 'Desenhe uma tecnologia que você vê na rua.', desenho('30mm')),
         gabarito=['Bloco 1: depende da escola. Em geral: computador, impressora, caixa de som e TV.',
                   'Bloco 2: carro (atravessar a rua) com o semáforo, roupa suja com a máquina de lavar, professora (mostrar um vídeo) com a TV.',
                   'Bloco 3: resposta livre: semáforo, ônibus, câmera, caixa do mercado.'],
         jogo='tecnologia-por-perto',
         adaptar='Para estudantes com deficiência física, planeje o trajeto do passeio com acessibilidade. Para estudantes cegos, explore os sons das tecnologias (o sinal, a impressora).'),
    aula(n=27, bim=4, titulo='Com tela e sem tela', habs=['EF02CO05'],
         objetivo='Observar as características das tecnologias (tela, som, botões, bateria) e organizar os aparelhos por elas.',
         material='Aparelhos ou figuras de aparelhos, duas caixas e a folha do estudante.',
         passos=['Observar (10 min): passe os aparelhos (ou as figuras). Tem tela? Tem botões? Faz som? Precisa de tomada ou de bateria?',
                 'Separar (15 min): em grupos, a turma separa os aparelhos com tela e sem tela. Depois os que fazem som e os que não fazem.',
                 'Folha (15 min).',
                 'Conversa (10 min): por que alguns aparelhos têm tela e outros não precisam?'],
         turma='Cada tecnologia tem as suas características. O celular tem tela, faz som e tem bateria. A caixa de som faz som, mas não tem tela. '
               'Observar as características ajuda a escolher o aparelho certo para cada coisa.',
         atividade=bloco(1, 'Desenhe na caixa certa: celular, fone, tablet, caixa de som.', caixas_separar(['monitor', '!monitor'], '40mm', 12)) +
                   bloco(2, 'Circule os que precisam de bateria ou tomada.', circular(['celular', 'livro', 'tablet', 'bola', 'radio'], 14)),
         gabarito=['Bloco 1: com tela: celular e tablet. Sem tela: fone e caixa de som.', 'Bloco 2: celular, tablet e rádio.'],
         jogo='tecnologia-por-perto',
         adaptar='Para estudantes cegos, troque "tem tela" por "faz som" ou "vibra", que dá para perceber sem enxergar.'),
    aula(n=28, bim=4, titulo='Água e eletricidade', habs=['EF02CO06'],
         objetivo='Reconhecer os cuidados de segurança com água, tomada e carregador ao usar aparelhos.',
         material='Figuras de situações (celular na pia, carregador na tomada, criança com a mão molhada) e a folha do estudante.',
         passos=['Seguro ou perigoso (15 min): mostre as figuras. A turma levanta o polegar para seguro e cruza os braços para perigoso. Por quê?',
                 'Combinados (10 min): água longe dos aparelhos, tomada é com um adulto, não usar o celular carregando na cama.',
                 'Folha (15 min).',
                 'Cartaz (10 min): a turma desenha os combinados para pendurar na sala.'],
         turma='Água e aparelhos eletrônicos não combinam. Se o celular molhar, pode estragar, e a água com eletricidade pode dar choque. '
               'A tomada e o carregador são com um adulto. Esses cuidados protegem a gente e o aparelho.',
         atividade=bloco(1, 'É seguro? Circule o certo ou o errado.', certo_errado([['celular', 'torneira', 'agua-gota'], ['adulto', 'carregador', 'tomada'], ['mao', 'agua-gota', 'tomada']], 14)) +
                   bloco(2, 'Desenhe um combinado de cuidado com os aparelhos.', desenho('36mm')),
         gabarito=['Bloco 1: celular perto da água: errado. Adulto ligando o carregador: certo. Mão molhada na tomada: errado.', 'Bloco 2: resposta livre.'],
         jogo='cuidado-com-o-aparelho',
         adaptar='Use placas de "seguro" e "perigoso" grandes com cores e formas diferentes (círculo verde e quadrado vermelho) para quem não percebe bem as cores.'),
    aula(n=29, bim=4, titulo='Cuidar do corpo ao usar telas', habs=['EF02CO06'],
         objetivo='Reconhecer cuidados com o corpo ao usar aparelhos: volume, postura, distância da tela, pausas e sono.',
         material='Um fone, um tablet, um relógio de areia ou cronômetro, dispositivos com o jogo Cuidado com o Aparelho e a folha do estudante.',
         passos=['Corpo e tela (10 min): mostre como sentar, a distância da tela e o volume baixo no fone. Faça uma pausa de alongamento.',
                 'Jogo (20 min): Cuidado com o Aparelho, em duplas.',
                 'Folha (15 min).',
                 'Conversa (5 min): por que não usar tela antes de dormir?'],
         turma='Usar tela demais cansa os olhos e o corpo. Volume alto no fone machuca o ouvido. Tela antes de dormir atrapalha o sono. '
               'Por isso a gente senta direito, faz pausas para brincar e se mexer, usa o volume baixo e desliga a tela antes de dormir.',
         atividade=bloco(1, 'Faz bem ou não faz bem? Circule.', certo_errado([['fone', 'alto-falante', 'alto-falante'], ['tablet', 'relogio', 'bola'], ['celular', 'cama', 'lua']], 14)) +
                   bloco(2, 'Desenhe uma brincadeira para fazer na pausa da tela.', desenho('36mm')),
         gabarito=['Bloco 1: volume muito alto: errado. Usar o tablet e depois fazer uma pausa: certo. Celular na cama de noite: errado.', 'Bloco 2: resposta livre.'],
         jogo='cuidado-com-o-aparelho',
         adaptar='Para estudantes com TDAH, combine pausas de movimento também na aula. Converse com as famílias sobre os combinados de tela em casa, sem julgar.'),
    aula(n=30, bim=4, titulo='Cuidar do aparelho', habs=['EF02CO06'],
         objetivo='Reconhecer cuidados para conservar os aparelhos: guardar, não derrubar, não comer perto e pedir ajuda quando quebra.',
         material='Um tablet ou notebook da escola (só para mostrar), uma capa ou caixa e a folha do estudante.',
         passos=['Como guardar (10 min): mostre como carregar o tablet com as duas mãos, fechar o notebook e guardar na capa.',
                 'O que fazer se... (15 min): o tablet caiu, a tela trincou, o lanche caiu no teclado. A resposta é sempre: avisar um adulto.',
                 'Folha (15 min).',
                 'Combinado (10 min): os aparelhos da escola são de todos, por isso cuidamos juntos.'],
         turma='O tablet da escola é usado por muitas crianças. Para ele durar, a gente carrega com as duas mãos, não come perto e guarda na capa. '
               'Se ele cair ou quebrar, não tem problema contar: a gente avisa um adulto, que sabe o que fazer.',
         atividade=bloco(1, 'Certo ou errado? Circule.', certo_errado([['notebook', 'mochila'], ['tablet', 'pao'], ['tablet', 'errado', 'adulto']], 14)) +
                   bloco(2, 'Numere: o jeito certo de usar o tablet da escola.', numerar(['tablet', 'mao', 'mochila'], 16)),
         gabarito=['Bloco 1: guardar o notebook fechado na mochila: certo. Comer em cima do tablet: errado. Avisar um adulto quando o tablet quebra: certo.',
                   'Bloco 2: 1 pegar com as mãos (mão), 2 usar (tablet), 3 guardar (mochila). Aceite outras ordens explicadas.'],
         jogo='cuidado-com-o-aparelho',
         adaptar='Para estudantes com deficiência motora, mostre um suporte ou capa com alça que facilite segurar o aparelho.'),
    aula(n=31, bim=4, titulo='Projeto: guia de cuidados da turma', habs=['EF02CO05', 'EF02CO06'],
         objetivo='Criar um guia ilustrado com tecnologias do dia a dia e os cuidados ao usá-las, para levar para casa.',
         material='Folhas, lápis de cor, cola, figuras das aulas anteriores e a folha do estudante.',
         passos=['Planejar (10 min): que tecnologias e que cuidados vão entrar no guia?',
                 'Produção (30 min): cada criança faz uma página: uma tecnologia, para que serve e um cuidado.',
                 'Montagem (10 min): junte as páginas e leia o guia com a turma. Ele pode ir para casa, uma família por semana.'],
         turma='Vamos fazer o guia de cuidados da nossa turma. Cada um escolhe uma tecnologia, desenha para que ela serve e desenha um cuidado que a gente precisa ter. '
               'Depois o guia vai para casa, para as famílias conhecerem.',
         atividade=bloco(1, 'Circule a tecnologia da sua página.', circular(['celular', 'tablet', 'tv', 'computador', 'fone'], 14)) +
                   bloco(2, 'Desenhe para que ela serve.', desenho('44mm')) +
                   bloco(3, 'Desenhe um cuidado ao usar essa tecnologia.', desenho('44mm')),
         gabarito=['Não há resposta única. Observe se a criança relaciona a tecnologia a um uso real e a um cuidado coerente (volume baixo no fone, pausa no tablet, água longe do celular).'],
         adaptar='A página pode ser feita com colagem ou ditada para a professora. Estudantes cegos podem gravar um áudio explicando o cuidado.'),
    aula(n=32, bim=4, titulo='Avaliação final e festa dos jogos', habs=['EF02CO01', 'EF02CO02', 'EF02CO03', 'EF02CO04', 'EF02CO05', 'EF02CO06'],
         objetivo='Verificar as aprendizagens do ano e celebrar o percurso da turma.',
         material='A folha de avaliação, lápis, lápis de cor e os jogos do ano.',
         passos=['Avaliação (25 min): leia cada questão em voz alta.', 'Festa dos jogos (20 min): cada criança escolhe um jogo do ano para jogar e ensinar a um colega.',
                 'Roda final (5 min): o que você quer aprender no 3º ano?'],
         turma='Chegamos ao fim do 2º ano. Vamos mostrar tudo o que aprendemos e depois jogar os jogos de que mais gostamos.',
         atividade=lado(bloco(1, 'Ligue ao contorno.', ligar(['gato', 'casa'], ['~casa', '~gato'], 15)),
                        bloco(2, 'Escreva curto, com bolinhas.', setas(['d', 'd', 'd'], tam=11) + vagas_setas(1, 11))) +
                   lado(bloco(3, 'Faça um X onde o robô para.', malha(4, 2, [0, 0], cel=14) + setas([('d', 2), 'b'], tam=11)),
                        bloco(4, 'Circule o software.', circular(['mouse', 'jogo-tela', 'fone'], 14))) +
                   bloco(5, 'Certo ou errado?', certo_errado([['celular', 'agua-gota'], ['tablet', 'relogio', 'bola']], 14)),
         gabarito=['Bloco 1: gato com gato, casa com casa.', 'Bloco 2: → com três bolinhas.', 'Bloco 3: anda duas e desce uma: segunda linha, terceira casa.',
                   'Bloco 4: o jogo.', 'Bloco 5: celular com água: errado; tablet com pausa para brincar: certo.',
                   'Critério: domina com 4 ou 5 blocos certos; em desenvolvimento com 3; precisa de retomada com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos ou individualmente para quem precisa, com objetos e respostas orais.'),
]
