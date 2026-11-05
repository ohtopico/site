"""Conteúdo das atividades de computação desplugada (6º ao 9º ano).

Cada atividade tem uma folha do estudante (A4), às vezes uma folha para recortar, e a folha de orientações do professor.
As peças de folha (bloco, tabela, opções...) vêm das fichas adaptadas, para a versão em braille ler tudo igual.
Os gabaritos que dependem de conta (caminho mais curto, cabos, cores, cifras) são calculados aqui, não digitados.
"""
import itertools
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent / 'computacao-adaptada'))
from comp import (VAZIO, bloco, caixa_texto, cartoes, codigo, escolha, frases, grade, item, linhas, opcoes, p,  # noqa: E402,F401
                  quadro_ex, resposta, tabela)
import pecas as d  # noqa: E402

PILARES = {
    'decomposicao': 'Decomposição',
    'padroes': 'Reconhecimento de padrões',
    'abstracao': 'Abstração',
    'algoritmos': 'Algoritmos',
}


def atividade(**k):
    k.setdefault('tempo', '50 minutos')
    k.setdefault('recortar', None)
    return k


# ---------- contas dos gabaritos ----------

def dijkstra(arestas, origem):
    viz = {}
    for a, b, w in arestas:
        viz.setdefault(a, []).append((b, w))
        viz.setdefault(b, []).append((a, w))
    dist, ant, feitos = {origem: 0}, {origem: None}, set()
    while len(feitos) < len(viz):
        u = min((n for n in dist if n not in feitos), key=lambda n: dist[n])
        feitos.add(u)
        for v, w in viz[u]:
            if v not in dist or dist[u] + w < dist[v]:
                dist[v], ant[v] = dist[u] + w, u
    return dist, ant


def caminho(ant, fim):
    c = [fim]
    while ant[c[-1]] is not None:
        c.append(ant[c[-1]])
    return list(reversed(c))


def kruskal(nos, arestas):
    pai = {n: n for n in nos}

    def raiz(n):
        while pai[n] != n:
            n = pai[n]
        return n

    usadas = []
    for a, b, w in sorted(arestas, key=lambda e: e[2]):
        ra, rb = raiz(a), raiz(b)
        if ra != rb:
            pai[ra] = rb
            usadas.append((a, b, w))
    return usadas


def menor_coloracao(nos, arestas):
    for k in range(1, len(nos) + 1):
        for cores in itertools.product(range(1, k + 1), repeat=len(nos)):
            c = dict(zip(nos, cores))
            if all(c[a] != c[b] for a, b, *_ in arestas):
                return k, c
    return None


# =====================================================================
# 6º ano
# =====================================================================

def cartoes_de_pontos():
    cartas = [16, 8, 4, 2, 1]
    linhas_tab = [['5', '0', '0', '1', '0', '1', '00101']] + [[str(n), '', '', '', '', '', ''] for n in (9, 12, 21, 31)]
    b1 = bloco(1, 'Conte os pontos de cada cartão. Qual é a regra?',
               d.fila_cartoes(cartas, largura='80mm') +
               frases(['Compare cada cartão com o da direita. Qual é a regra?',
                       'Se existisse um cartão à esquerda do 16, quantos pontos ele teria?']))
    b2 = bloco(2, 'Escreva os números em binário: 1 para o cartão virado para cima, 0 para o cartão virado para baixo.',
               '<div class="compacta">' + tabela(['Número', '16', '8', '4', '2', '1', 'Binário'], linhas_tab) + '</div>',
               'A primeira linha é o exemplo: 5 = 4 + 1. Só os cartões 4 e 1 ficam para cima.')
    b3 = bloco(3, 'Agora ao contrário: que número cada código binário mostra?',
               frases(['01010 =', '10001 =', '11100 =']), 'Some os pontos dos cartões que estão com 1.')
    b4 = bloco(4, 'Mensagem secreta. Cada letra é a posição dela no alfabeto: A = 1, B = 2, C = 3...',
               p('<b>00010 · 01001 · 10100</b>') + frases(['Números e palavra:']))
    rec = ('<p class="intro-folha">Recorte os cinco cartões pela borda. Se quiser, cole em papelão. O verso fica em branco: '
           'é o lado virado para baixo, que vale 0.</p>' +
           '<div class="recortar-grade">' + ''.join(
               d.svg(36, 46, d.cartao_pontos(1, 1, n, 34, 44), f'cartão com {n} {"ponto" if n == 1 else "pontos"}', classe='fig-dp cartao-grande')
               for n in cartas) + '</div>')
    return atividade(
        slug='cartoes-de-pontos-binario', titulo='Cartões de pontos: números em binário', ano=6, codigos=['EF06CO08', 'EF06CO01'],
        pilar='padroes',
        resumo='Com cinco cartões de pontos, a turma descobre como o computador guarda números usando só 0 e 1.',
        material='Os cinco cartões da folha para recortar (um jogo para cada grupo de 3 ou 4 estudantes) e a folha do estudante.',
        passos=['Chame cinco estudantes à frente, cada um com um cartão, na ordem 16, 8, 4, 2, 1. Peça que a turma descubra a regra (cada cartão tem o dobro do da direita).',
                'Diga um número, por exemplo 9, e peça que os cartões certos fiquem virados para a turma. Os outros viram de costas.',
                'Mostre que cartão para cima é 1 e para baixo é 0: 9 fica 01001. Isso é o sistema binário, a forma como o computador guarda números.',
                'Nos grupos, um estudante diz um número de 0 a 31 e os colegas mostram com os cartões. Depois façam a folha.'],
        conversa=['Qual é o maior número que dá para mostrar com cinco cartões? E com seis?',
                  'Por que o computador usa só dois símbolos? (Pense em ligado e desligado, com luz e sem luz.)'],
        gabarito=['Bloco 1: cada cartão tem o dobro de pontos do cartão da direita; o próximo teria 32 pontos.',
                  'Bloco 2: 9 = 01001; 12 = 01100; 21 = 10101; 31 = 11111.',
                  'Bloco 3: 01010 = 10; 10001 = 17; 11100 = 28.',
                  'Bloco 4: 2, 9, 20 = BIT (a menor unidade de informação do computador).'],
        estudante=b1 + b2 + b3 + b4, recortar=rec, recortar_titulo='Cartões de pontos para recortar')


CASA = ['...##...', '..####..', '.######.', '########', '.#....#.', '.#.##.#.', '.#.##.#.', '.######.']
CORACAO = ['.##..##.', '########', '########', '########', '.######.', '..####..', '...##...', '........']


def imagem_de_numeros():
    cod_casa = [', '.join(map(str, d.codigo_linha(l))) for l in CASA]
    cod_cor = [', '.join(map(str, d.codigo_linha(l))) for l in CORACAO]
    lista = '<ol class="codigos-linhas">' + ''.join(f'<li>{c}</li>' for c in cod_casa) + '</ol>'
    g1 = d.grade(CASA, cel=6.4, vazias=range(1, 8), desc='grade de 8 por 8 quadradinhos em branco, só a linha 1 pintada como exemplo: ' +
                 d.descrever_grade(CASA, vazias=range(1, 8)), largura='50mm')
    b0 = caixa_texto('<b>Como funciona o código:</b> cada linha da imagem vira uma lista de números. O primeiro número diz quantos quadradinhos '
                     'brancos vêm primeiro; o segundo, quantos pretos; o terceiro, quantos brancos, e assim por diante. '
                     'Se a linha começa preta, o primeiro número é 0.', 'cinza')
    b1 = bloco(1, 'Pinte a imagem seguindo o código de cada linha.',
               '<div class="lado-a-lado" style="--cols:52mm 1fr">' + g1 + '<div>' + lista + '</div></div>',
               'A linha 1 já está pintada: 3 brancos, 2 pretos, 3 brancos.')
    g2 = d.grade(CORACAO, cel=6.4, desc='imagem de 8 por 8 quadradinhos: ' + d.descrever_grade(CORACAO), largura='50mm')
    tab = tabela(['Linha', 'Código'], [['1', cod_cor[0]]] + [[str(i), ''] for i in range(2, 9)])
    b2 = bloco(2, 'Agora faça o contrário: escreva o código desta imagem.',
               '<div class="lado-a-lado" style="--cols:52mm 1fr">' + g2 + '<div class="compacta">' + tab + '</div></div>')
    b3 = bloco(3, 'O código é menor que a imagem?',
               frases(['A imagem tem quantos quadradinhos? E quantos números tem o código do bloco 2?',
                       'Que tipo de imagem deixaria o código bem comprido?']))
    total = sum(len(d.codigo_linha(l)) for l in CORACAO)
    return atividade(
        slug='imagem-feita-de-numeros', titulo='Imagem feita de números', ano=6, codigos=['EF06CO08', 'EF06CO05'], pilar='abstracao',
        resumo='A turma pinta e codifica imagens de quadradinhos e descobre como o computador guarda e compacta uma imagem.',
        material='Folha do estudante, lápis preto ou caneta. Para a versão coletiva: uma grade 8 por 8 desenhada no quadro.',
        passos=['Mostre uma foto ampliada no celular até aparecerem os quadradinhos (pixels). Explique que toda imagem digital é feita assim.',
                'Desenhe a grade no quadro e pinte a primeira linha da casa junto com a turma, lendo o código em voz alta.',
                'Em duplas, um estudante dita o código de uma imagem inventada e o outro pinta sem ver o original. Comparem no fim.',
                'Feche com o bloco 3: guardar o número de quadradinhos iguais em sequência ocupa menos espaço do que guardar um por um. É uma forma de compactar.'],
        conversa=['Por que uma imagem com fundo de uma cor só fica com arquivo pequeno?',
                  'Como seria o código de uma imagem colorida? (Cada número poderia vir junto com a cor.)'],
        gabarito=['Bloco 1: aparece uma casa com telhado, paredes, uma janela e uma porta.',
                  'Bloco 2: ' + '; '.join(f'linha {i}: {c}' for i, c in enumerate(cod_cor, 1)) + '.',
                  f'Bloco 3: 64 quadradinhos; {total} números; uma imagem com muitas trocas de cor, como um tabuleiro de xadrez, deixa o código comprido (pode ficar maior que a própria imagem).'],
        estudante=b0 + b1 + b2 + b3)


def ditado_de_figuras():
    vagas = ['Desenhe uma casa.', 'Ligue o ponto A3 ao ponto E3.']
    seg_casa = [('A3', 'E3'), ('E3', 'E6'), ('E6', 'A6'), ('A6', 'A3'), ('A3', 'C1'), ('C1', 'E3')]
    seg_bandeira = [('B6', 'B1'), ('B1', 'E2'), ('E2', 'B3')]
    b1 = bloco(1, 'Qual instrução todo mundo segue do mesmo jeito? Circule.',
               '<div class="compacta">' + escolha([('Para começar o desenho:', vagas, None),
                        ('Para fazer um lado:', ['Faça uma linha comprida.', 'Ligue o ponto B2 ao ponto B5.'], None),
                        ('Para terminar:', ['Ligue o ponto F6 ao ponto A6.', 'Feche a figura do jeito que achar melhor.'], None)]) + '</div>')
    b2 = bloco(2, 'Siga as instruções na malha de pontos.',
               '<div class="lado-a-lado" style="--cols:1fr 52mm"><ol class="passos-ditado">' +
               ''.join(f'<li>Ligue {a} a {b}.</li>' for a, b in seg_casa) + '</ol>' +
               d.malha([], desc='malha de pontos em branco, colunas A a F e linhas 1 a 6', largura='50mm') + '</div>',
               'A letra é a coluna e o número é a linha. A1 fica no alto, à esquerda.')
    b3 = bloco(3, 'Escreva as instruções para um colega desenhar esta figura sem ver.',
               '<div class="lado-a-lado" style="--cols:48mm 1fr">' +
               d.malha(seg_bandeira, desc='malha de pontos com uma bandeira: linha de B6 até B1, de B1 até E2 e de E2 até B3', largura='46mm') +
               '<div>' + linhas(4) + '</div></div>')
    return atividade(
        slug='ditado-de-figuras', titulo='Ditado de figuras: instruções precisas', ano=6, codigos=['EF06CO03', 'EF06CO02'], pilar='algoritmos',
        resumo='Em duplas, um estudante descreve uma figura e o outro desenha sem ver. A turma descobre por que um algoritmo precisa ser preciso.',
        material='Folha do estudante, lápis e um caderno ou pasta para esconder o desenho do colega.',
        passos=['Desenhe no quadro, escondido, uma figura simples. Dite com instruções vagas ("faça uma linha comprida") e peça que a turma desenhe.',
                'Mostre o original: os desenhos ficaram diferentes. Pergunte o que faltou nas instruções.',
                'Apresente a malha de pontos: com coordenadas, a instrução fica precisa. Façam o bloco 2 juntos.',
                'Em duplas, de costas um para o outro, um dita as instruções do bloco 3 e o outro desenha. Depois trocam.'],
        conversa=['O computador entende "faça bonito"? Por quê?',
                  'Qual foi a instrução mais difícil de escrever? Como deixar mais clara?'],
        gabarito=['Bloco 1: "Ligue o ponto A3 ao ponto E3."; "Ligue o ponto B2 ao ponto B5."; "Ligue o ponto F6 ao ponto A6."',
                  'Bloco 2: aparece uma casa: um retângulo de A3 a E6 com um telhado em triângulo até C1.',
                  'Bloco 3 (uma resposta possível): Ligue B6 a B1. Ligue B1 a E2. Ligue E2 a B3.'],
        estudante=b1 + b2 + b3)


# =====================================================================
# 7º ano
# =====================================================================

PARIDADE_A = ['#..#', '.##.', '#...', '###.']
BASE_B = ['#.#..', '.##.#', '#..##', '##.#.', '..###']
TROCA_B = (2, 3)  # linha e coluna (a partir de 0) do quadradinho virado


def _com_paridade(base):
    out = [l + ('#' if l.count('#') % 2 else '.') for l in base]
    return out + [''.join('#' if sum(r[c] == '#' for r in out) % 2 else '.' for c in range(len(out[0])))]


def _virar(m, li, ci):
    m = list(m)
    m[li] = m[li][:ci] + ('.' if m[li][ci] == '#' else '#') + m[li][ci + 1:]
    return m


PARIDADE_B = _virar(_com_paridade(BASE_B), *TROCA_B)


def _paridade():
    """Completa a 4x4 com linha e coluna de paridade (número par de pretos)."""
    out = []
    for l in PARIDADE_A:
        out.append(l + ('#' if l.count('#') % 2 else '.'))
    ultima = ''.join('#' if sum(r[c] == '#' for r in out) % 2 else '.' for c in range(5))
    return out + [ultima]


def _trocada():
    m = PARIDADE_B
    lin = [i for i, l in enumerate(m) if l.count('#') % 2]
    col = [c for c in range(6) if sum(r[c] == '#' for r in m) % 2]
    assert len(lin) == 1 and len(col) == 1, (lin, col)
    return lin[0], col[0]


def truque_da_paridade():
    completa = _paridade()
    desenho = [l + '?' for l in PARIDADE_A] + ['?????']
    desc1 = ('grade de 4 por 4 com uma coluna e uma linha extras tracejadas e vazias. ' + d.descrever_grade(PARIDADE_A) +
             '. A coluna 5 e a linha 5 são de paridade, para pintar')
    g1 = d.grade(desenho, cel=7, extra_col=True, extra_lin=True, desc=desc1, largura='48mm')
    b0 = caixa_texto('<b>A regra:</b> em cada linha e em cada coluna, o número de quadradinhos pretos tem que ser <b>par</b> '
                     '(0, 2, 4...). A coluna e a linha tracejadas servem só para isso: pinte ou deixe branco para a conta fechar.', 'cinza')
    b1 = bloco(1, 'Complete a coluna 5 e a linha 5 para que todas as linhas e colunas tenham um número par de pretos.',
               '<div class="lado-a-lado" style="--cols:52mm 1fr">' + g1 + '<div>' +
               p('Linha 1 tem 2 pretos: já é par, então o quadradinho da coluna 5 fica <b>branco</b>.') +
               p('Linha 3 tem 1 preto: é ímpar, então o quadradinho da coluna 5 fica <b>preto</b>.') + '</div></div>')
    lt, ct = _trocada()
    g2 = d.grade(PARIDADE_B, cel=7, extra_col=True, extra_lin=True,
                 desc='grade de 6 por 6, a última coluna e a última linha são de paridade. ' + d.descrever_grade(PARIDADE_B),
                 largura='54mm')
    b2 = bloco(2, 'Alguém virou um quadradinho escondido. Descubra qual!',
               '<div class="lado-a-lado" style="--cols:58mm 1fr">' + g2 + '<div>' +
               frases(['A linha com número ímpar de pretos é a', 'A coluna com número ímpar de pretos é a',
                       'O quadradinho virado está na linha e coluna']) + '</div></div>',
               'Conte os pretos de cada linha e de cada coluna. A linha e a coluna que ficaram ímpares se cruzam no quadradinho virado.')
    b3 = bloco(3, 'Pense e responda.',
               frases(['Por que a linha e a coluna extras ajudam a achar o erro?',
                       'Quando um arquivo viaja pela internet, para que serve um truque assim?']))
    desc_resp = '; '.join(f'linha {i}: {"preto" if l[4] == "#" else "branco"}' for i, l in enumerate(completa[:4], 1))
    linha5 = ', '.join('preto' if c == '#' else 'branco' for c in completa[4])
    return atividade(
        slug='truque-da-paridade', titulo='O truque da paridade', ano=7, codigos=['EF07CO06'], pilar='padroes',
        resumo='Com quadradinhos pretos e brancos, a turma descobre como o computador percebe e corrige um erro na transmissão de dados.',
        material='36 cartões de dois lados (um lado pintado de preto, o outro branco) ou tampinhas de duas cores, e a folha do estudante.',
        passos=['Peça que um estudante monte, no chão ou na mesa, uma grade 5 por 5 com os cartões, do jeito que quiser.',
                'Diga que vai "deixar mais difícil" e acrescente, você mesmo, uma coluna e uma linha extras, seguindo em segredo a regra do número par de pretos.',
                'Vire de costas. Um estudante troca um único cartão. Volte e ache o cartão trocado na hora, contando linhas e colunas.',
                'Repita e explique o truque: é a paridade, usada pelos protocolos para conferir se os dados chegaram certos. Façam a folha.'],
        conversa=['E se dois cartões fossem trocados ao mesmo tempo, o truque ainda funcionaria sempre?',
                  'Onde mais aparece um número que confere outro? (Dígito verificador do CPF, do código de barras, da conta do banco.)'],
        gabarito=[f'Bloco 1: coluna 5, {desc_resp}; linha 5, da esquerda para a direita: {linha5}.',
                  f'Bloco 2: linha {lt + 1} e coluna {ct + 1} ficaram ímpares; o quadradinho virado está na linha {lt + 1}, coluna {ct + 1}.',
                  'Bloco 3: um erro muda a paridade de uma linha e de uma coluna, e o cruzamento mostra onde ele está. Na internet, informações extras desse tipo permitem descobrir (e às vezes corrigir) dados que chegaram errados.'],
        estudante=b0 + b1 + b2 + b3)


MAPA_NOS = {'Centro': (70, 40), 'Vila Nova': (26, 14), 'Porto': (114, 14), 'Morro': (122, 62), 'Lagoa': (70, 78), 'Campo': (18, 62)}
MAPA_ARESTAS = [('Centro', 'Vila Nova', ''), ('Centro', 'Porto', ''), ('Centro', 'Morro', ''), ('Centro', 'Lagoa', ''),
                ('Vila Nova', 'Porto', ''), ('Porto', 'Morro', ''), ('Morro', 'Lagoa', ''), ('Lagoa', 'Campo', ''), ('Campo', 'Vila Nova', '')]
PROVAS = ['Mat', 'Port', 'Ciên', 'Hist', 'Geo']
PROVAS_ARESTAS = [('Mat', 'Port', ''), ('Mat', 'Ciên', ''), ('Port', 'Hist', ''), ('Ciên', 'Hist', ''), ('Hist', 'Geo', ''), ('Mat', 'Geo', '')]


def mapa_para_colorir():
    def g(nos, ars, w, h, desc, larg):
        s = ''
        for a, b, _ in ars:
            (x1, y1), (x2, y2) = nos[a], nos[b]
            s += f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#111" stroke-width="1"/>'
        for n, (x, y) in nos.items():
            rx = max(9, len(n) * 1.55 + 3)
            s += (f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="7.5" fill="#fff" stroke="#111" stroke-width="1"/>' + d.txt(x, y + 1.6, n, 4.4)
                  + f'<rect x="{x + rx - 3}" y="{y - 11}" width="7" height="6.5" rx="1" fill="#fff" stroke="#111" stroke-width=".6" stroke-dasharray="1 .7"/>')
        return d.svg(w, h, s, desc, larg)

    viz = '; '.join(f'{a} faz divisa com {b}' for a, b, _ in MAPA_ARESTAS)
    k, cores = menor_coloracao(list(MAPA_NOS), MAPA_ARESTAS)
    b1 = bloco(1, 'Cada bolinha é um bairro e cada linha liga bairros vizinhos. Escreva um número de cor (1, 2, 3...) na caixinha de cada bairro.',
               '<div class="lado-a-lado" style="--cols:84mm 1fr">' +
               g(MAPA_NOS, MAPA_ARESTAS, 140, 88, f'grafo de 6 bairros: {viz}. Cada bairro tem uma caixinha vazia para o número da cor', '82mm') +
               '<div>' + p('Regra: bairros vizinhos não podem ter a mesma cor.') + p('Desafio: use o menor número de cores possível.') +
               frases(['Usei quantas cores?']) + '</div></div>')
    graus = tabela(['Bairro', 'Vizinhos', 'Quantos'], [['Centro', 'Vila Nova, Porto, Morro, Lagoa', '4']] +
                   [[n, '', ''] for n in MAPA_NOS if n != 'Centro'])
    b2 = bloco(2, 'Complete a tabela dos vizinhos de cada bairro.', graus,
               'Em um grafo, o número de vizinhos de um ponto se chama grau.')
    kp, cp = menor_coloracao(PROVAS, PROVAS_ARESTAS)
    nos_p = {'Mat': (40, 12), 'Port': (90, 12), 'Ciên': (20, 44), 'Hist': (65, 44), 'Geo': (110, 44)}
    desc_p = 'grafo de 5 provas: ' + '; '.join(f'{a} tem estudante em comum com {b}' for a, b, _ in PROVAS_ARESTAS)
    b3 = bloco(3, 'Semana de provas: provas ligadas têm estudantes em comum e não podem cair no mesmo dia. Quantos dias são necessários, no mínimo?',
               '<div class="lado-a-lado" style="--cols:76mm 1fr">' + g(nos_p, PROVAS_ARESTAS, 124, 54, desc_p, '74mm') +
               '<div>' + frases(['Dias:', 'Provas de cada dia:']) + '</div></div>',
               'É o mesmo problema do mapa: cada dia é uma cor.')
    nomes_cor = {}
    for n, c in cores.items():
        nomes_cor.setdefault(c, []).append(n)
    dias = {}
    for n, c in cp.items():
        dias.setdefault(c, []).append(n)
    grau = {n: [] for n in MAPA_NOS}
    for a, b, _ in MAPA_ARESTAS:
        grau[a].append(b)
        grau[b].append(a)
    return atividade(
        slug='mapa-para-colorir-grafos', titulo='Mapa para colorir com poucas cores', ano=7, codigos=['EF07CO04'], pilar='abstracao',
        resumo='A turma transforma um mapa em grafo e descobre quantas cores bastam para que vizinhos nunca fiquem iguais.',
        material='Folha do estudante e lápis de cor (ou números, para economizar tinta e para estudantes que não enxergam cores).',
        passos=['Desenhe no quadro um mapa simples de bairros. Pergunte: quantas cores precisamos para pintar sem que vizinhos fiquem iguais?',
                'Mostre como transformar o mapa em grafo: cada bairro vira uma bolinha e cada divisa vira uma linha. Isso é abstração: ficamos só com o que importa.',
                'Os estudantes resolvem o bloco 1 em duplas, tentando usar o menor número de cores.',
                'Mostre o bloco 3: o mesmo método organiza horários de provas, de turnos e de frequências de rádio.'],
        conversa=['Por que dá para trocar o mapa pelo grafo sem perder nada importante para o problema?',
                  'Que outro problema da escola dá para resolver como um mapa para colorir?'],
        gabarito=[f'Bloco 1: bastam {k} cores. Uma resposta: ' + '; '.join(f'cor {c}: {", ".join(ns)}' for c, ns in sorted(nomes_cor.items())) + '.',
                  'Bloco 2: ' + '; '.join(f'{n}: {", ".join(v)} ({len(v)})' for n, v in grau.items() if n != 'Centro') + '.',
                  f'Bloco 3: {kp} dias. Uma resposta: ' + '; '.join(f'dia {c}: {", ".join(ns)}' for c, ns in sorted(dias.items())) + '.'],
        estudante=b1 + b2 + b3)


def senhas_e_combinacoes():
    b1 = bloco(1, 'Um cadeado tem rodinhas com os números de 0 a 9. Quantas senhas diferentes existem?',
               tabela(['Rodinhas', 'Senhas possíveis'], [['1', '10'], ['2', ''], ['3', ''], ['4', '']]),
               'Com 2 rodinhas, as senhas vão de 00 a 99.')
    b2 = bloco(2, 'Complete a regra.', frases(['Cada rodinha a mais multiplica o número de senhas por',
                                                'Com letras de A a Z (26 letras), 2 rodinhas dão quantas senhas?']))
    b3 = bloco(3, 'Um programa tenta 10 senhas por segundo. Quanto tempo ele leva, no pior caso, para testar todas?',
               tabela(['Senha', 'Senhas possíveis', 'Tempo para testar todas'],
                      [['4 números', '10.000', '1.000 segundos (cerca de 17 minutos)'], ['6 números', '', ''], ['8 números', '', '']]))
    b4 = bloco(4, 'Qual senha é mais difícil de descobrir? Circule e explique.',
               opcoes(['1234', 'joao2012', 'lua cheia de pipoca 7']) + frases(['Por quê?']))
    return atividade(
        slug='senhas-e-combinacoes', titulo='Quantas senhas existem?', ano=7, codigos=['EF07CO07'], pilar='padroes',
        resumo='Contando as combinações de um cadeado, a turma descobre por que uma senha comprida protege mais do que uma senha curta.',
        material='Folha do estudante. Se tiver, um cadeado de segredo de verdade para mostrar.',
        passos=['Mostre um cadeado de segredo (ou desenhe as rodinhas). Pergunte quantas senhas existem com uma rodinha, depois com duas.',
                'Deixe a turma perceber o padrão: cada rodinha a mais multiplica por 10.',
                'Conte que programas de ataque testam senhas sem parar. Façam o bloco 3 e comparem os tempos.',
                'No bloco 4, mostre que uma frase comprida é fácil de lembrar e muito difícil de adivinhar. Combine com a turma: nada de data de aniversário.'],
        conversa=['Por que senhas com nome e ano de nascimento são as primeiras que um ataque testa?',
                  'Para que serve bloquear a conta depois de muitas tentativas erradas?'],
        gabarito=['Bloco 1: 10; 100; 1.000; 10.000.',
                  'Bloco 2: por 10; 26 × 26 = 676 senhas.',
                  'Bloco 3: 6 números = 1.000.000 de senhas, 100.000 segundos (pouco mais de 1 dia); 8 números = 100.000.000 de senhas, 10.000.000 de segundos (cerca de 116 dias).',
                  'Bloco 4: "lua cheia de pipoca 7". É a mais comprida e mistura palavras que não têm relação com a pessoa; 1234 e nome com ano são testados primeiro.'],
        estudante=b1 + b2 + b3 + b4)


# =====================================================================
# 8º ano
# =====================================================================

PASSOS_REDE = [[(0, 1), (2, 3)], [(0, 2), (1, 3)], [(1, 2)]]


def rede_de_ordenacao():
    ex = [9, 4, 7, 2]
    cols = d.ordenar_rede(ex, PASSOS_REDE)
    desc_rede = ('rede de ordenação com 4 fios na horizontal. Passo 1: compara fios 1 e 2, e fios 3 e 4. Passo 2: compara fios 1 e 3, e fios 2 e 4. '
                 'Passo 3: compara fios 2 e 3. Há uma caixinha em cada fio na entrada, depois de cada passo e na saída')
    r_ex = d.rede(ex, PASSOS_REDE, PASSOS_REDE, desc_rede + '. Exemplo resolvido: ' +
                  '; '.join(('entrada' if i == 0 else f'depois do passo {i}') + ': ' + ', '.join(map(str, c)) for i, c in enumerate(cols)),
                  valores=cols, largura='96mm')
    a1 = [12, 3, 8, 5]
    a2 = [6, 15, 1, 10]
    b0 = caixa_texto('<b>Como funciona:</b> os números entram pela esquerda e andam pelos fios. Em cada traço verde, os dois números se comparam: '
                     '<b>o menor sobe</b> para o fio de cima e o maior desce. Os traços do mesmo passo acontecem ao mesmo tempo.', 'cinza')
    b1 = bloco(1, 'Veja o exemplo resolvido.', r_ex)
    b2 = bloco(2, 'Agora é sua vez: escreva os números em cada caixinha.',
               '<div class="lado-a-lado">' + d.rede(a1, PASSOS_REDE, PASSOS_REDE, desc_rede + '. Entrada, de cima para baixo: ' + ', '.join(map(str, a1)), largura='86mm') +
               d.rede(a2, PASSOS_REDE, PASSOS_REDE, desc_rede + '. Entrada, de cima para baixo: ' + ', '.join(map(str, a2)), largura='86mm') + '</div>')
    b3 = bloco(3, 'Conte e compare.', frases(['Quantas comparações a rede faz ao todo?', 'Em quantos passos?',
                                               'Se uma pessoa fizesse uma comparação de cada vez, quantas rodadas levaria?']))
    s1, s2 = d.ordenar_rede(a1, PASSOS_REDE), d.ordenar_rede(a2, PASSOS_REDE)
    return atividade(
        slug='rede-de-ordenacao', titulo='Rede de ordenação no pátio', ano=8, codigos=['EF08CO03', 'EF08CO05'], pilar='algoritmos',
        resumo='A turma ordena números caminhando por uma rede desenhada no chão e descobre como o computador compara várias coisas ao mesmo tempo.',
        material='Giz ou fita crepe para desenhar a rede no pátio, cartões com números grandes e a folha do estudante.',
        passos=['Desenhe a rede no pátio, igual à da folha, mas na vertical: quatro caminhos e os pontos de encontro marcados com um círculo.',
                'Quatro estudantes recebem um cartão com número e entram pelos caminhos. Em cada círculo, os dois se encontram, comparam e o menor vai para a esquerda.',
                'Todos saem ordenados, não importa a ordem em que entraram. Repita com outros números e com tempo cronometrado.',
                'Mostre que no passo 1 duas duplas comparam ao mesmo tempo: isso é paralelismo, o que os processadores com vários núcleos fazem.'],
        conversa=['A rede funciona com qualquer quatro números? Tente achar uma ordem que dê errado.',
                  'O que aconteceria se as comparações do passo 1 fossem feitas uma de cada vez?'],
        gabarito=['Bloco 2, primeira rede: ' + '; '.join(', '.join(map(str, c)) for c in s1[1:]) + '.',
                  'Bloco 2, segunda rede: ' + '; '.join(', '.join(map(str, c)) for c in s2[1:]) + '.',
                  'Bloco 3: 5 comparações em 3 passos; uma de cada vez seriam 5 rodadas. Ganhamos tempo porque os passos 1 e 2 fazem duas comparações ao mesmo tempo.'],
        estudante=b0 + b1 + b2 + b3)


def torre_de_hanoi():
    b0 = caixa_texto('<b>Regras:</b> leve todos os discos do pino A para o pino C. Mova um disco por vez e nunca coloque um disco maior sobre um menor.', 'cinza')
    b1 = bloco(1, 'Jogue com 1, 2, 3 e 4 discos e anote o menor número de movimentos.',
               '<div class="lado-a-lado" style="--cols:88mm 1fr">' +
               d.hanoi(3, 'torre de Hanói com três pinos, A, B e C. No pino A há três discos empilhados, do maior (embaixo) para o menor (em cima)', '86mm') +
               tabela(['Discos', 'Movimentos'], [['1', '1'], ['2', ''], ['3', ''], ['4', '']]) + '</div>',
               'Com 1 disco, basta um movimento: de A para C.')
    b2 = bloco(2, 'Complete a receita que funciona para qualquer número de discos.',
               '<ol class="receita">'
               '<li>Mova todos os discos, menos o maior, de A para o pino ' + resposta() + '.</li>'
               '<li>Mova o disco maior de A para o pino ' + resposta() + '.</li>'
               '<li>Mova os outros discos de B para o pino ' + resposta() + ', usando a mesma receita.</li></ol>',
               'A receita usa a própria receita no passo 1 e no passo 3. Isso é recursão.')
    b3 = bloco(3, 'Descubra o padrão: movimentos de n discos = 2 × movimentos de (n − 1) discos + 1.',
               frases(['5 discos:', '6 discos:', '10 discos:']))
    rec = ('<p class="intro-folha">Recorte os cinco discos e a base. Use 3, 4 ou 5 discos, conforme o desafio.</p>'
           '<div class="discos-recortar">' + ''.join(
               d.svg(124, 16, f'<rect x="{62 - (110 - i * 20) / 2}" y="1" width="{110 - i * 20}" height="14" rx="3" fill="#fff" stroke="#111" stroke-width="1" stroke-dasharray="2 1.4"/>'
                     + d.txt(62, 10.6, 5 - i, 7), f'disco {5 - i}, com {110 - i * 20} milímetros de largura', classe='fig-dp disco')
               for i in range(5)) + '</div>' +
           d.svg(180, 30, '<rect x="1" y="1" width="178" height="28" rx="3" fill="#fff" stroke="#111" stroke-width="1" stroke-dasharray="2 1.4"/>' +
                 ''.join(f'<circle cx="{30 + k * 60}" cy="15" r="4" fill="none" stroke="#111" stroke-width="1"/>' + d.txt(30 + k * 60, 27, n, 6)
                         for k, n in enumerate('ABC')), 'base com três lugares marcados, A, B e C', classe='fig-dp base-hanoi'))
    return atividade(
        slug='torre-de-hanoi-recursao', titulo='Torre de Hanói: recursão com discos de papel', ano=8, codigos=['EF08CO01'], pilar='decomposicao',
        resumo='Jogando a Torre de Hanói com discos de papel ou moedas, a turma descobre uma receita que usa a si mesma: a recursão.',
        material='Discos da folha para recortar (ou moedas de tamanhos diferentes) e a folha do estudante.',
        passos=['Apresente as regras com 3 discos. Deixe que joguem livremente e contem os movimentos.',
                'Peça que anotem o menor número para 1, 2, 3 e 4 discos. Escreva os resultados no quadro: 1, 3, 7, 15.',
                'Mostre a ideia: para mover 4 discos, eu movo 3 para o lado, movo o maior e depois movo os 3 de volta por cima. O problema grande usa o mesmo problema menor.',
                'Escreva a regra 2 × anterior + 1 e calculem juntos para 10 discos.'],
        conversa=['Por que a receita do bloco 2 sempre termina, mesmo chamando a si mesma?',
                  'Onde mais um problema grande se resolve com o mesmo problema em tamanho menor?'],
        gabarito=['Bloco 1: 1; 3; 7; 15.', 'Bloco 2: B; C; C.', 'Bloco 3: 31; 63; 1.023 movimentos.'],
        estudante=b0 + b1 + b2 + b3, recortar=rec, recortar_titulo='Discos para recortar')


REDE_NOS = {'Casa': (14, 40), 'R1': (50, 12), 'R2': (50, 68), 'R3': (96, 12), 'R4': (96, 68), 'Site': (134, 40)}
REDE_ARESTAS = [('Casa', 'R1', 4), ('Casa', 'R2', 2), ('R1', 'R2', 1), ('R1', 'R3', 5), ('R2', 'R4', 8), ('R3', 'R4', 3),
                ('R3', 'Site', 6), ('R4', 'Site', 2), ('R2', 'R3', 9)]


def caminho_mais_curto():
    dist, ant = dijkstra(REDE_ARESTAS, 'Casa')
    cam = caminho(ant, 'Site')
    quebrada = [('R4', 'Site')]
    sem = [e for e in REDE_ARESTAS if (e[0], e[1]) not in quebrada]
    dist2, ant2 = dijkstra(sem, 'Casa')
    cam2 = caminho(ant2, 'Site')
    desc = 'rede com 6 pontos: Casa, roteadores R1, R2, R3 e R4, e o Site. Ligações e tempos em milissegundos: ' + d.descrever_grafo(REDE_ARESTAS, ' ms')
    b1 = bloco(1, 'Os números são o tempo, em milissegundos, que a mensagem leva em cada ligação. Qual é o caminho mais rápido da Casa até o Site?',
               '<div class="lado-a-lado" style="--cols:92mm 1fr">' + d.grafo(REDE_NOS, REDE_ARESTAS, 148, 80, desc, '90mm') +
               '<div>' + frases(['Caminho:', 'Tempo total:']) + '</div></div>')
    b2 = bloco(2, 'Anote o menor tempo da Casa até cada roteador e de onde a mensagem veio.',
               tabela(['Ponto', 'Menor tempo desde a Casa', 'Veio de'], [['R2', '2 ms', 'Casa']] + [[n, '', ''] for n in ('R1', 'R3', 'R4', 'Site')]),
               'Comece pelo ponto mais perto da Casa e vá avançando. Um caminho com mais ligações pode ser mais rápido.')
    desc2 = desc.replace('R4 com Site: 2 ms', 'R4 com Site (quebrada)')
    b3 = bloco(3, 'A ligação entre R4 e o Site quebrou. Qual é o novo caminho mais rápido?',
               '<div class="lado-a-lado" style="--cols:72mm 1fr">' + d.grafo(REDE_NOS, REDE_ARESTAS, 148, 80, desc2, '70mm', quebradas=quebrada) +
               '<div>' + frases(['Novo caminho:', 'Tempo total:', 'Por que a internet tem mais de um caminho?']) + '</div></div>')
    return atividade(
        slug='caminho-mais-curto-na-rede', titulo='O caminho mais rápido na internet', ano=8, codigos=['EF08CO06', 'EF07CO04'], pilar='algoritmos',
        resumo='Como roteadores, os estudantes procuram o caminho mais rápido para uma mensagem e descobrem o que acontece quando uma ligação quebra.',
        material='Folha do estudante. Para a versão no pátio: barbante para as ligações e cartazes com os nomes dos roteadores.',
        passos=['Monte a rede no pátio: seis estudantes seguram cartazes (Casa, R1 a R4, Site) e barbantes com etiquetas de tempo ligam os pontos.',
                'Um estudante leva um bilhete da Casa ao Site. A turma sugere caminhos e soma os tempos no quadro.',
                'Mostre o método: anotar o menor tempo até cada ponto, começando pelo mais perto. É o que os roteadores fazem o tempo todo.',
                'Corte o barbante entre R4 e o Site e peça um novo caminho. A internet continua funcionando porque existem rotas alternativas.'],
        conversa=['O caminho com menos ligações é sempre o mais rápido?',
                  'O que acontece quando muita gente usa a mesma ligação ao mesmo tempo?'],
        gabarito=[f'Bloco 1: {" → ".join(cam)}, {dist["Site"]} ms.',
                  'Bloco 2: ' + '; '.join(f'{n}: {dist[n]} ms, veio de {ant[n]}' for n in ('R1', 'R3', 'R4', 'Site')) + '.',
                  f'Bloco 3: {" → ".join(cam2)}, {dist2["Site"]} ms. Com mais de um caminho, a rede continua funcionando quando uma ligação cai.'],
        estudante=b1 + b2 + b3)


# =====================================================================
# 9º ano
# =====================================================================

ESC_NOS = {'Sede': (74, 40), 'Norte': (30, 12), 'Rio': (118, 12), 'Sul': (118, 70), 'Serra': (30, 70), 'Vale': (8, 40)}
ESC_ARESTAS = [('Sede', 'Norte', 5), ('Sede', 'Rio', 4), ('Sede', 'Sul', 7), ('Sede', 'Serra', 3), ('Norte', 'Rio', 6),
               ('Rio', 'Sul', 2), ('Serra', 'Sul', 8), ('Norte', 'Vale', 3), ('Serra', 'Vale', 4), ('Norte', 'Serra', 9)]


def cabos_mais_baratos():
    usadas = kruskal(list(ESC_NOS), ESC_ARESTAS)
    total = sum(w for *_, w in usadas)
    todas = sum(w for *_, w in ESC_ARESTAS)
    desc = 'mapa com 6 escolas: Sede, Norte, Rio, Sul, Serra e Vale. Cabos possíveis e distâncias em quilômetros: ' + d.descrever_grafo(ESC_ARESTAS, ' km')
    ordenadas = sorted(ESC_ARESTAS, key=lambda e: e[2])
    primeira = ordenadas[0]
    linhas_tab = [[f'{primeira[0]} e {primeira[1]}', str(primeira[2]), 'sim']] + [[f'{a} e {b}', str(w), ''] for a, b, w in ordenadas[1:]]
    b1 = bloco(1, 'A prefeitura quer ligar as 6 escolas em rede, usando o mínimo de cabo. Veja os cabos possíveis.',
               d.grafo(ESC_NOS, ESC_ARESTAS, 140, 82, desc, '80mm'))
    b2 = bloco(2, 'Siga a receita: vá do cabo mais curto ao mais comprido. Use o cabo se ele ligar uma escola que ainda não está conectada às outras; se formar um círculo, pule.',
               '<div class="compacta">' + tabela(['Cabo', 'km', 'Usar?'], linhas_tab) + '</div>', 'O primeiro já está feito.')
    b3 = bloco(3, 'Confira.', frases(['Quantos cabos você usou?', 'Total de quilômetros:', 'Com 10 escolas, quantos cabos seriam necessários?']))
    return atividade(
        slug='cabos-mais-baratos-arvore', titulo='Internet nas escolas com menos cabo', ano=9, codigos=['EF09CO01', 'EF07CO04'], pilar='abstracao',
        resumo='A turma liga escolas em rede gastando o mínimo de cabo e descobre a árvore: um grafo que conecta tudo sem formar círculos.',
        material='Folha do estudante e lápis de cor para marcar os cabos escolhidos.',
        passos=['Conte a situação: a rede municipal quer ligar seis escolas e o cabo é caro. Pergunte quais ligações eles fariam.',
                'Deixe que tentem sozinhos e comparem os totais no quadro.',
                'Apresente a receita do bloco 2 (do mais curto ao mais comprido, sem fechar círculos) e façam juntos.',
                'Mostre que o resultado é uma árvore: liga as 6 escolas com 5 cabos. Uma árvore com n pontos sempre tem n − 1 ligações.'],
        conversa=['Por que um círculo de cabos seria desperdício neste problema?',
                  'E se um cabo da árvore quebrar? Que vantagem teria um cabo a mais?'],
        gabarito=['Bloco 2: usar ' + '; '.join(f'{a} e {b} ({w} km)' for a, b, w in usadas) + '. Os outros formam círculo.',
                  f'Bloco 3: {len(usadas)} cabos; {total} km (ligar todos os cabos daria {todas} km); com 10 escolas, 9 cabos.'],
        estudante=b1 + b2 + b3)


def cifra_palavra_chave():
    msg, chave = 'ESCOLA', 'LUA'
    cif = d.vigenere(msg, chave)
    ch2, plano2 = 'SOL', 'DADOS'
    cif2 = d.vigenere(plano2, ch2)
    b0 = caixa_texto('<b>Como cifrar:</b> escreva a palavra-chave embaixo da mensagem, repetindo quantas vezes for preciso. '
                     'Some o número da letra da mensagem com o da letra da chave. Se passar de 25, tire 26. O resultado é a letra cifrada.', 'cinza')
    b1 = bloco(1, 'Use a régua para trocar letras por números.', d.regua_alfabeto())
    tab1 = tabela(['', *range(1, len(msg) + 1)],
                  [['Mensagem', *msg], ['Chave', *(chave * 2)[:len(msg)]], ['Conta', f'4 + 11 = 15', *[''] * (len(msg) - 1)],
                   ['Cifrada', cif[0], *[''] * (len(msg) - 1)]])
    b2 = bloco(2, f'Cifre a palavra {msg} com a chave {chave}.', tab1, 'A primeira coluna é o exemplo: E (4) + L (11) = 15, que é P.')
    tab2 = tabela(['', *range(1, len(cif2) + 1)], [['Cifrada', *cif2], ['Chave', *(ch2 * 2)[:len(cif2)]], ['Mensagem', *[''] * len(cif2)]])
    b3 = bloco(3, f'Decifre a mensagem com a chave {ch2}: agora é tirar o número da chave.', tab2, 'Se der negativo, some 26.')
    b4 = bloco(4, 'Compare com a Cifra de César.', frases(['Na palavra ESCOLA cifrada, a letra A virou sempre a mesma letra?',
                                                           'Por que essa cifra é mais difícil de quebrar do que a de César?']))
    return atividade(
        slug='cifra-com-palavra-chave', titulo='Cifra com palavra-chave', ano=9, codigos=['EF09CO05'], pilar='algoritmos',
        resumo='Com uma régua de letras e números, a turma cifra e decifra mensagens com uma palavra-chave e compara com a Cifra de César.',
        material='Folha do estudante. Para a versão coletiva: a régua do alfabeto ampliada no quadro.',
        passos=['Relembre a Cifra de César: todas as letras andam o mesmo número de casas. Pergunte por que ela é fácil de quebrar (só 25 chaves).',
                'Apresente a ideia da palavra-chave: cada letra anda um número diferente, dado pela letra da chave.',
                'Façam juntos a primeira coluna do bloco 2, com a régua. Depois as duplas terminam e trocam mensagens cifradas.',
                'Converse sobre criptografia de hoje: a chave é muito mais longa e as contas são feitas pelo computador, mas a ideia de misturar a mensagem com uma chave continua.'],
        conversa=['Se alguém descobrir a palavra-chave, o que acontece com as mensagens?',
                  'Como combinar a chave com um colega sem que outras pessoas fiquem sabendo?'],
        gabarito=[f'Bloco 2: {cif}.', f'Bloco 3: {plano2}.',
                  'Bloco 4: não; a mesma letra vira letras diferentes conforme a letra da chave, então contar as letras mais frequentes não ajuda tanto, e há muito mais chaves possíveis.'],
        estudante=b0 + b1 + b2 + b3 + b4)


def fechadura_automato():
    def seguir(seq):
        tr = {('Fechada', 'A'): 'Quase', ('Fechada', 'B'): 'Fechada', ('Quase', 'A'): 'Quase', ('Quase', 'B'): 'Aberta',
              ('Aberta', 'A'): 'Quase', ('Aberta', 'B'): 'Fechada'}
        e, rastro = 'Fechada', []
        for c in seq:
            e = tr[(e, c)]
            rastro.append(e)
        return rastro

    desc = ('máquina de estados com três estados: Fechada, Quase e Aberta. Começa em Fechada. '
            'De Fechada: A vai para Quase, B fica em Fechada. De Quase: A fica em Quase, B vai para Aberta. '
            'De Aberta: A vai para Quase, B vai para Fechada. Aberta tem círculo duplo: é o estado em que a porta abre')
    seqs = ['BAB', 'AAB', 'ABB', 'BBA', 'ABAB']
    b0 = caixa_texto('<b>A fechadura</b> tem dois botões, A e B. Ela lembra só o que importa e muda de estado a cada botão apertado. '
                     'Siga as setas a partir de <b>Fechada</b>.', 'cinza')
    b1 = bloco(1, 'Veja a máquina de estados da fechadura.', d.automato(desc, '120mm'))
    linhas_tab = [['B A B', 'Fechada → Quase → Aberta', 'sim']] + [[' '.join(s), '', ''] for s in seqs[1:]]
    b2 = bloco(2, 'Siga cada sequência de botões e diga se a porta abre no fim.', tabela(['Botões', 'Estados depois de cada botão', 'Abre?'], linhas_tab),
               'Na primeira linha, o primeiro B deixa a fechadura em Fechada.')
    b3 = bloco(3, 'Descreva com suas palavras.', frases(['Que sequência abre a porta?', 'Por que a fechadura não precisa lembrar de todos os botões apertados?']))
    resp = [f'{" ".join(s)}: {" → ".join(seguir(s))}, {"abre" if seguir(s)[-1] == "Aberta" else "não abre"}' for s in seqs[1:]]
    return atividade(
        slug='fechadura-maquina-de-estados', titulo='A fechadura que lê botões', ano=9, codigos=['EF09CO03'], pilar='abstracao',
        resumo='Seguindo as setas de uma máquina de estados, a turma descobre como um aparelho decide o que fazer lembrando só o necessário.',
        material='Folha do estudante. Para a versão no chão: três bambolês ou círculos de giz e setas de papel com as letras A e B.',
        passos=['Desenhe os três estados no chão, com as setas. Um estudante é a fechadura e fica em pé no estado Fechada.',
                'A turma "aperta botões" dizendo A ou B. O estudante anda pela seta da letra dita. Quando chega em Aberta, a turma comemora.',
                'Pergunte: o que a fechadura precisa lembrar? Só o último passo importante. Isso é abstração.',
                'Mostre outras máquinas de estados do dia a dia: semáforo, catraca, máquina de lanche, personagem de jogo.'],
        conversa=['Que estados tem uma catraca de ônibus? E quais botões (entradas) mudam o estado?',
                  'Como seria a máquina de uma fechadura que abre com A, A, B?'],
        gabarito=['Bloco 2: ' + '; '.join(resp) + '.',
                  'Bloco 3: abre quando os dois últimos botões são A e depois B. A fechadura só precisa saber em que estado está, não a lista inteira de botões.'],
        estudante=b0 + b1 + b2 + b3)


ATIVIDADES = [cartoes_de_pontos, imagem_de_numeros, ditado_de_figuras,
              truque_da_paridade, mapa_para_colorir, senhas_e_combinacoes,
              rede_de_ordenacao, torre_de_hanoi, caminho_mais_curto,
              cabos_mais_baratos, cifra_palavra_chave, fechadura_automato]
