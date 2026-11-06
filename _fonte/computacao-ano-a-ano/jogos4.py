"""Jogos do 4º ano (EF04CO01 a EF04CO08). Com leitura curta: a instrução aparece escrita e também pode ser ouvida."""
from figuras import fig

D = {'d': (1, 0), 'e': (-1, 0), 'c': (0, -1), 'b': (0, 1)}


def corredor(cols, rows, inicio, passos):
    """Paredes em todas as casas fora do caminho: o caminho fica sendo o único possível."""
    x, y = inicio
    livres = {(x, y)}
    for p in passos:
        dx, dy = D[p]
        x, y = x + dx, y + dy
        livres.add((x, y))
    return [[a, b] for b in range(rows) for a in range(cols) if (a, b) not in livres]


def txt(*ts):
    return [{'txt': t} for t in ts]


def ficha(nome_fig, campos, mostrar_fig=True):
    """Registro (ficha) em HTML: campos com nome e valor."""
    linhas = ''.join(f'<tr><th>{k}</th><td>{v}</td></tr>' for k, v in campos)
    f = f'<div style="width:64px;height:64px;margin:0 auto 6px">{fig(nome_fig)}</div>' if mostrar_fig else ''
    return f'<div class="pq-ficha">{f}<table>{linhas}</table></div>'


def tabela_codigo(letras):
    return '<div class="pq-ficha"><table><tr>' + ''.join(f'<th>{l}</th>' for l in letras) + '</tr><tr>' + ''.join(
        f'<td>{ord(l) - 64}</td>' for l in letras) + '</tr></table></div>'


CORACAO = ['B1', 'D1', 'A2', 'B2', 'C2', 'D2', 'E2', 'B3', 'C3', 'D3', 'C4']

JOGOS4 = [
    dict(
        id='mapa-do-tesouro', titulo='Mapa do Tesouro', ano=4, habs=['EF04CO01'], tempo='15 min', leitura=True,
        resumo='Jogo para o 4º ano: localizar e marcar casas numa matriz pela coordenada (letra da coluna e número da linha), mover objetos e pintar uma imagem quadradinho por quadradinho.',
        como=['A grade tem letras em cima (colunas) e números do lado (linhas). A coordenada B3 é a casa da coluna B com a linha 3, como no jogo de batalha naval.',
              'Na última fase, a criança pinta casas pelas coordenadas e descobre que uma imagem digital também é uma matriz de quadradinhos.'],
        fases=[
            dict(tipo='coordenada', fala='Coloque a estrela na casa B2.', cols=4, rows=4, pedir=['B2']),
            dict(tipo='coordenada', fala='Esconda três moedas: A1, C3 e D2.', cols=4, rows=4, pedir=['A1', 'C3', 'D2'], marca='circulo:amarelo'),
            dict(tipo='coordenada', fala='Em que casa está o baú do tesouro?', cols=4, rows=4, itens={'C2': 'tesouro', 'A4': 'arvore', 'D1': 'casa'}, onde='tesouro',
                 opcoes=['C2', 'B3', 'D2'], certa=0),
            dict(tipo='coordenada', fala='O que está na casa B3?', cols=4, rows=4, itens={'B3': 'gato', 'D1': 'peixe', 'A2': 'bola'}, qual='B3', opcoes=['gato', 'peixe', 'bola'], certa=0),
            dict(tipo='coordenada', fala='O robô está em B2 e andou duas casas para a direita. Toque onde ele está agora.', cols=5, rows=4, itens={'B2': 'robo'}, pedir=['D2'], marca='robo'),
            dict(tipo='coordenada', fala='O gato desceu duas linhas a partir de C1. Toque onde ele está agora.', cols=4, rows=4, itens={'C1': 'gato'}, pedir=['C3'], marca='gato'),
            dict(tipo='coordenada', fala='Uma imagem digital é uma matriz. Pinte as casas na ordem e descubra o desenho.', cols=5, rows=4, pedir=CORACAO, cor='vermelho'),
        ]),
    dict(
        id='fichas-dos-bichos', titulo='Fichas dos Bichos', ano=4, habs=['EF04CO02'], tempo='15 min', leitura=True,
        resumo='Jogo para o 4º ano: ler e atualizar registros (fichas com campos que têm nome e valor), achar o campo que falta e descobrir de quem é cada ficha.',
        como=['Um registro é uma ficha em que cada informação tem um nome (o campo) e um valor. Na ficha do gato, o campo "patas" tem o valor 4.',
              'Depois do jogo, a turma pode criar as próprias fichas, como a ficha de cada um na biblioteca ou a ficha de um personagem de jogo.'],
        fases=[
            dict(tipo='escolha', fala='Leia a ficha. Quantas patas tem a Mimi?', html=ficha('gato', [('nome', 'Mimi'), ('animal', 'gato'), ('patas', '4'), ('come', 'ração')]),
                 opcoes=txt('4', '2', 'ração'), certa=0),
            dict(tipo='escolha', fala='Nesta ficha, qual é o valor do campo "mora"?', html=ficha('peixe', [('nome', 'Bolha'), ('animal', 'peixe'), ('mora', 'aquário'), ('patas', '0')]),
                 opcoes=txt('Bolha', 'aquário', 'peixe'), certa=1),
            dict(tipo='escolha', fala='Qual campo está faltando nesta ficha?', html=ficha('passaro', [('nome', 'Piu'), ('animal', 'pássaro'), ('come', '?')]),
                 opcoes=txt('come', 'nome', 'animal'), certa=0),
            dict(tipo='escolha', fala='Qual destas fichas é do cachorro?',
                 opcoes=[{'html': ficha('cachorro', [('patas', '4'), ('voa', 'não'), ('late', 'sim')], False)}, {'html': ficha('cachorro', [('patas', '2'), ('voa', 'sim'), ('late', 'não')], False)},
                         {'html': ficha('cachorro', [('patas', '0'), ('voa', 'não'), ('late', 'não')], False)}], certa=0),
            dict(tipo='escolha', fala='O Rex fez aniversário. Qual campo da ficha precisa mudar?', html=ficha('cachorro', [('nome', 'Rex'), ('idade', '3 anos'), ('cor', 'marrom')]),
                 opcoes=txt('nome', 'idade', 'cor'), certa=1),
            dict(tipo='pares', fala='Ligue cada campo ao valor que combina com ele.', pares=[[{'txt': 'nome'}, {'txt': 'Luna'}], [{'txt': 'idade'}, {'txt': '9 anos'}],
                                                                                          [{'txt': 'cidade'}, {'txt': 'Porto Alegre'}], [{'txt': 'cor favorita'}, {'txt': 'verde'}]]),
            dict(tipo='escolha', fala='A escola guarda uma ficha para cada estudante. O que é a ficha inteira de um estudante?', opcoes=txt('um registro', 'um campo', 'um valor'), certa=0),
        ]),
    dict(
        id='laco-dentro-de-laco', titulo='Laço Dentro de Laço', ano=4, habs=['EF04CO03'], tempo='15–20 min', leitura=True, personagem='robo', alvo='estrela', parede='arvore',
        resumo='Jogo para o 4º ano: programar o robô com repetições de grupos de blocos, repetições dentro de repetições e o bloco "até a parede", com poucos blocos.',
        como=['O botão com o número abre um grupo de repetição: os blocos que entram nele se repetem aquele número de vezes. O botão de fechar termina o grupo. Dá para abrir um grupo dentro de outro.',
              'Cada fase tem um limite de blocos, e cada grupo conta como um bloco. Para caber, é preciso achar o pedaço do caminho que se repete.'],
        fases=[
            dict(tipo='caminho', modo='prever', fala='O grupo repete duas vezes os blocos de dentro. Onde o robô para?', cols=5, rows=5, inicio=[0, 0], alvos=[],
                 programa=[{'laco': 2, 'corpo': [{'d': 'd', 'n': 2}, {'d': 'b'}]}]),
            dict(tipo='caminho', fala='Uma escada! Use um grupo de repetição. Só cabem 3 blocos.', cols=5, rows=5, inicio=[0, 4], alvos=[[4, 0]], laco=True, max=3,
                 paredes=corredor(5, 5, [0, 4], 'dcdcdcdc')),
            dict(tipo='caminho', fala='Escada de degraus grandes. Use as bolinhas dentro do grupo.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 4]], laco=True, vezes=[2, 3], max=3,
                 paredes=corredor(5, 5, [0, 0], 'ddbbddbb')),
            dict(tipo='caminho', fala='Laço dentro de laço: sem bolinhas, use um grupo dentro do outro. Só cabem 4 blocos.', cols=7, rows=3, inicio=[0, 0], alvos=[[6, 2]], laco=True, max=4,
                 paredes=corredor(7, 3, [0, 0], 'dddbdddb')),
            dict(tipo='caminho', modo='prever', fala='Um grupo dentro do outro. Siga o programa: onde o robô para?', cols=5, rows=5, inicio=[0, 4], alvos=[],
                 programa=[{'laco': 2, 'corpo': [{'laco': 2, 'corpo': [{'d': 'd'}]}, {'d': 'c'}]}]),
            dict(tipo='caminho', fala='Zigue-zague com até a parede. Repita o grupo.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 4]], laco=True, blocos=['b', 'ate'], max=5,
                 paredes=corredor(5, 5, [0, 0], 'ddddbbeeeebbdddd')),
            dict(tipo='caminho', fala='O desafio final: pegue as quatro estrelas dos cantos com poucos blocos.', cols=5, rows=5, inicio=[0, 0], alvos=[[4, 0], [4, 4], [0, 4], [0, 0]],
                 laco=True, vezes=[2, 3, 4], blocos=['f', 'gd', 'ge'], max=3),
        ]),
    dict(
        id='tudo-vira-numero', titulo='Tudo Vira Número', ano=4, habs=['EF04CO04'], tempo='15 min', leitura=True,
        resumo='Jogo para o 4º ano: descobrir que, para guardar e enviar dados, o computador codifica tudo em números, decodificando e codificando palavras com uma tabela de letras.',
        como=['A tabela de código troca cada letra por um número: A é 1, B é 2, C é 3 e assim por diante. É uma versão simples do que o computador faz com cada letra que digitamos.',
              'Converse depois: a foto vira números (as cores de cada quadradinho), a música vira números (a altura do som a cada instante).'],
        fases=[
            dict(tipo='escolha', fala='Para guardar uma foto, uma música ou um texto, o computador transforma tudo em...', opcoes=txt('números', 'desenhos', 'barulhos'), certa=0),
            dict(tipo='escolha', fala='Use a tabela. Que palavra é 7 1 20 15?', html=tabela_codigo('AEGOPRT'), opcoes=txt('GATO', 'PATO', 'RATO'), certa=0),
            dict(tipo='escolha', fala='Como fica BOLA no código?', html=tabela_codigo('ABLO'), opcoes=txt('2 15 12 1', '2 12 15 1', '1 15 12 2'), certa=0),
            dict(tipo='escolha', fala='Que palavra é 19 15 12?', html=tabela_codigo('LOSU'), opcoes=txt('LUA', 'SOL', 'SUL'), certa=1),
            dict(tipo='binario', fala='O computador escreve os números só com 0 e 1. Vire as cartas para formar o número 5.', alvo=5),
            dict(tipo='vf', fala='Um pendrive guarda as músicas como números. Verdadeiro ou falso?', cena=['pendrive', 'nota-musical'], resposta=True),
            dict(tipo='escolha', fala='Para mandar uma mensagem pelo celular, primeiro ela é...', cena=['celular', 'mensagem', 'celular'], opcoes=txt('codificada em números', 'impressa no papel', 'gravada numa fita'), certa=0),
        ]),
    dict(
        id='zeros-uns-e-cores', titulo='Zeros, Uns e Cores', ano=4, habs=['EF04CO05'], tempo='15–20 min', leitura=True,
        resumo='Jogo para o 4º ano: representar números em binário com cartas de bolinhas e formar cores misturando luzes vermelha, verde e azul (RGB), como os pixels da tela.',
        como=['Nas cartas, a de 8 bolinhas, a de 4, a de 2 e a de 1 ficam para cima (1) ou para baixo (0). O número em binário é a fila de 0 e 1 que aparece embaixo.',
              'Nas fases de luz, cada quadradinho da tela tem três luzes: vermelha, verde e azul. Misturando as três, aparece a cor do pixel. Luz é diferente de tinta: vermelho com verde dá amarelo.'],
        fases=[
            dict(tipo='binario', fala='Vire as cartas para formar o número 3.', alvo=3),
            dict(tipo='binario', fala='Agora o número 6.', alvo=6),
            dict(tipo='binario', fala='Forme o número 13.', alvo=13),
            dict(tipo='escolha', fala='Que número é 1010 em binário? (carta de 8, carta de 4, carta de 2, carta de 1)', opcoes=txt('10', '5', '12'), certa=0),
            dict(tipo='rgb', fala='Acenda as luzes para formar o amarelo.', alvo=[1, 1, 0], nome='amarelo'),
            dict(tipo='rgb', fala='Agora forme o branco.', alvo=[1, 1, 1], nome='branco'),
            dict(tipo='rgb', fala='Forme esta cor rosa-arroxeada (magenta).', alvo=[1, 0, 1], nome='magenta'),
            dict(tipo='rgb', fala='Cada luz agora tem dois níveis de força. Forme o laranja.', alvo=[2, 1, 0], niveis=2, nome='laranja'),
            dict(tipo='binario', fala='O último: forme o número 15.', alvo=15),
        ]),
    dict(
        id='estudio-de-conteudo', titulo='Estúdio de Conteúdo', ano=4, habs=['EF04CO06'], tempo='15 min', leitura=True,
        resumo='Jogo para o 4º ano: escolher a ferramenta computacional certa para criar textos, apresentações, vídeos e áudios, e organizar as etapas de uma produção.',
        como=['O jogo apresenta pedidos de conteúdo (um cartaz, um vídeo, uma apresentação) e a criança escolhe a ferramenta. Nas fases de ordem, ela organiza as etapas da produção.',
              'Use o jogo como aquecimento para uma produção de verdade: a turma escolhe um tema e cria um conteúdo com a ferramenta disponível na escola.'],
        fases=[
            dict(tipo='pares', fala='Ligue cada ferramenta ao que ela cria.', pares=[[{'txt': 'editor de texto'}, 'documento'], [{'txt': 'editor de vídeo'}, 'video'],
                                                                                   [{'txt': 'gravador de áudio'}, 'nota-musical'], [{'txt': 'programa de desenho'}, 'pincel']]),
            dict(tipo='escolha', fala='Quero mostrar a pesquisa da turma para os pais, com imagens e pouco texto, uma tela de cada vez. Qual ferramenta?',
                 opcoes=txt('programa de apresentação (slides)', 'calculadora', 'gravador de áudio'), certa=0),
            dict(tipo='escolha', fala='Quero criar um podcast com entrevistas. Qual ferramenta?', opcoes=txt('gravador de áudio', 'programa de desenho', 'planilha'), certa=0),
            dict(tipo='sequencia', fala='Coloque em ordem as etapas para fazer um vídeo.', itens=['documento', 'camera', 'computador', 'globo']),
            dict(tipo='escolha', fala='Quero escrever uma notícia para o jornal da escola. Qual ferramenta?', opcoes=txt('editor de texto', 'editor de vídeo', 'calculadora'), certa=0),
            dict(tipo='criar', fala='Monte um slide: escolha a cor do fundo, uma imagem e um ícone.', fundo=True,
                 grupos=[['circulo:azul', 'circulo:amarelo', 'circulo:verde', 'circulo:rosa'], ['globo', 'arvore', 'robo', 'livro'], ['estrela', 'lampada', 'grafico', 'coracao']]),
            dict(tipo='escolha', fala='Antes de publicar um conteúdo que você criou, o que é importante fazer?', opcoes=txt('revisar o texto e as imagens', 'publicar logo', 'apagar o rascunho'), certa=0),
        ]),
    dict(
        id='dados-com-cuidado', titulo='Dados com Cuidado', ano=4, habs=['EF04CO07'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 4º ano: decidir o que é ético na coleta, na guarda, no envio e no uso de dados, como numa pesquisa da turma.',
        como=['Cada fase traz uma situação com dados de pessoas. A criança decide se a atitude está certa ou errada, ou escolhe a melhor atitude.',
              'Princípios para combinar com a turma: pedir só os dados necessários, pedir permissão, contar para que vão ser usados, guardar com cuidado e não espalhar.'],
        fases=[
            dict(tipo='vf', fala='Para saber a fruta preferida da turma, a pesquisa pede o endereço de cada um. Está certo?', cena=['maca', 'casa', 'documento'], resposta=False),
            dict(tipo='vf', fala='Antes da pesquisa, a turma explica para que vai usar as respostas. Está certo?', cena=['professora', 'amigos', 'grafico'], resposta=True),
            dict(tipo='vf', fala='Mostrar para a turma as notas de um colega sem ele saber. Está certo?', cena=['documento', 'amigos'], resposta=False),
            dict(tipo='vf', fala='Guardar a planilha da pesquisa com senha. Está certo?', cena=['tabela', 'cadeado'], resposta=True),
            dict(tipo='escolha', fala='Qual pergunta não precisa estar numa pesquisa sobre o lanche preferido?', opcoes=txt('Qual é o seu lanche preferido?', 'Qual é o seu telefone?', 'Você traz lanche de casa?'), certa=1),
            dict(tipo='escolha', fala='Você achou no pátio a lista com os nomes e telefones da turma. O que faz?', opcoes=txt('entrego para a professora', 'tiro uma foto e mando no grupo', 'jogo no lixo'), certa=0),
            dict(tipo='vf', fala='Usar as respostas da pesquisa para outra coisa, sem avisar ninguém. Está certo?', cena=['tabela', 'interrogacao'], resposta=False),
        ]),
    dict(
        id='fonte-confiavel', titulo='Fonte Confiável?', ano=4, habs=['EF04CO08'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 4º ano: avaliar se uma informação da internet vem de uma fonte confiável, olhando quem escreveu, quando, e conferindo em outros lugares.',
        como=['Cada fase traz uma informação e de onde ela veio. A criança decide se dá para confiar ou escolhe o que fazer para conferir.',
              'Perguntas para a turma levar para a vida: quem escreveu? Quando? Outros sites sérios dizem o mesmo? O título quer me assustar?'],
        fases=[
            dict(tipo='escolha', fala='Para um trabalho sobre dinossauros, qual fonte é mais confiável?', opcoes=txt('site de um museu de ciências', 'comentário sem nome num vídeo', 'mensagem corrente no celular'), certa=0),
            dict(tipo='vf', fala='Se muita gente compartilhou, a notícia é verdadeira. Verdadeiro ou falso?', cena=['mensagem', 'amigos', 'amigos'], resposta=False),
            dict(tipo='vf', fala='Conferir a informação em mais de um site sério ajuda a saber se é verdade. Verdadeiro ou falso?', cena=['lupa', 'navegador', 'navegador'], resposta=True),
            dict(tipo='escolha', fala='Uma mensagem diz: "URGENTE! Repasse para todos!" e não tem autor nem data. O que você faz?', opcoes=txt('não repasso e confiro com um adulto', 'repasso para todos', 'acredito, porque é urgente'), certa=0),
            dict(tipo='escolha', fala='O que ajuda a saber se um texto da internet é confiável?', opcoes=txt('ter autor, data e fonte', 'ter muitas cores', 'ter letras grandes'), certa=0),
            dict(tipo='escolha', fala='Um site diz que a Lua é feita de queijo. Como conferir?', opcoes=txt('procurar em sites de ciência e livros', 'perguntar num jogo on-line', 'confiar no primeiro resultado'), certa=0),
            dict(tipo='vf', fala='Uma notícia antiga pode parecer nova e enganar. Olhar a data é importante. Verdadeiro ou falso?', cena=['documento', 'relogio'], resposta=True),
        ]),
]
