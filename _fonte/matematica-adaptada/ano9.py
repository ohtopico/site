"""Fichas do 9º ano."""
import math

from base import ficha
from desenhos import CLARO, TRACO, svg
from desenhos2 import grafico_barras, malha, solido
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, problema, tabela
from ano3 import frases
from ano4 import n
from ano5 import empilhado
from ano7 import m, plano1, plano4, reta_int, transversal
from ano8 import pilha, sup

F = 'font-family="Lexend, sans-serif"'
E = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"'
HALO = 'paint-order="stroke" stroke="#fff" stroke-width="4"'


# ---------- desenhos do 9º ano ----------

def quadrado_diag(lado='1', diag='?'):
    t = f'{F} font-size="14" font-weight="600" {HALO}'
    inner = (f'<rect x="20" y="10" width="110" height="110" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<path d="M20 120 L130 10" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<text x="75" y="140" text-anchor="middle" {t}>{lado}</text><text x="8" y="70" text-anchor="middle" {t}>{lado}</text>'
             f'<text x="84" y="62" text-anchor="middle" {t}>{diag}</text>')
    return svg(150, 148, inner, 'figura', f'quadrado de lado {lado} com a diagonal marcada')


def tri_ret(a, b, c, esc=26, rot=('', '', '')):
    """Triângulo retângulo com catetos a (horizontal) e b (vertical); rot = textos dos lados (a, b, hipotenusa)."""
    w, h = a * esc, b * esc
    t = f'{F} font-size="14" font-weight="600" {HALO}'
    inner = (f'<polygon points="20,{h + 10} {w + 20},{h + 10} 20,10" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
             f'<path d="M20 {h - 4} h14 v14" fill="none" stroke="{TRACO}" stroke-width="1.6"/>'
             f'<text x="{20 + w / 2}" y="{h + 30}" text-anchor="middle" {t}>{rot[0]}</text>'
             f'<text x="12" y="{10 + h / 2}" text-anchor="end" {t}>{rot[1]}</text>'
             f'<text x="{24 + w / 2 + 10}" y="{10 + h / 2 - 4}" {t}>{rot[2]}</text>')
    return svg(w + 70, h + 38, inner, 'figura', 'triângulo retângulo com as medidas dos lados')


def semelhantes():
    t = f'{F} font-size="13" font-weight="600" {HALO}'
    inner = (f'<polygon points="10,90 90,90 10,30" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<text x="50" y="108" text-anchor="middle" {t}>4</text><text x="2" y="64" text-anchor="end" {t}>3</text><text x="56" y="56" {t}>5</text>'
             f'<polygon points="130,150 290,150 130,30" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<text x="210" y="168" text-anchor="middle" {t}>8</text><text x="122" y="94" text-anchor="end" {t}>6</text><text x="216" y="86" {t}>?</text>')
    return svg(300, 176, f'<g transform="translate(14 0)">{inner}</g>', 'figura', 'dois triângulos semelhantes: lados 3, 4 e 5 e lados 6, 8 e o terceiro desconhecido')


def circ_angulos(central=True, inscrito=True, rot_c='', rot_i=''):
    c, r = 90, 70
    P = lambda g: (c + r * math.cos(math.radians(g)), c - r * math.sin(math.radians(g)))
    A, B, V = P(-20), P(80), P(215)
    inner = f'<circle cx="{c}" cy="{c}" r="{r}" fill="#fff" stroke="{TRACO}" stroke-width="2.5"/>'
    inner += f'<path d="M{A[0]:.1f} {A[1]:.1f} A{r} {r} 0 0 0 {B[0]:.1f} {B[1]:.1f}" fill="none" stroke="{CLARO["laranja"]}" stroke-width="7"/>'
    t = f'{F} font-size="13" font-weight="600" {HALO}'
    if central:
        inner += f'<path d="M{A[0]:.1f} {A[1]:.1f} L{c} {c} L{B[0]:.1f} {B[1]:.1f}" fill="none" stroke="{TRACO}" stroke-width="2"/><circle cx="{c}" cy="{c}" r="4" fill="{TRACO}"/>'
        inner += f'<text x="{c + 22}" y="{c - 4}" {t}>{rot_c}</text>'
    if inscrito:
        inner += f'<path d="M{A[0]:.1f} {A[1]:.1f} L{V[0]:.1f} {V[1]:.1f} L{B[0]:.1f} {B[1]:.1f}" fill="none" stroke="{TRACO}" stroke-width="2" stroke-dasharray="6 4"/><circle cx="{V[0]:.1f}" cy="{V[1]:.1f}" r="4" fill="{TRACO}"/>'
        inner += f'<text x="{V[0] + 12:.1f}" y="{V[1] - 2:.1f}" {t}>{rot_i}</text>'
    for p, k in ((A, 'A'), (B, 'B')):
        inner += f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="4" fill="{TRACO}"/><text x="{p[0] + 8:.1f}" y="{p[1] - 6:.1f}" {F} font-size="13" font-weight="600">{k}</text>'
    return svg(190, 180, inner, 'figura', 'circunferência com o arco AB, o ângulo central e o ângulo inscrito')


def vista(blocos, cel=26):
    """Vista de cima/frente: lista de (col, lin) pintadas numa malha pequena."""
    cols = max(c for c, _ in blocos) + 1
    lins = max(l for _, l in blocos) + 1
    return malha(cols, lins, cel, pintadas=blocos, rotulo='vista desenhada em quadradinhos')


def grafico_enganoso():
    """Barras com o eixo começando em 90: parece que a diferença é enorme."""
    inner = (f'<path d="M40 10 V150 H260" stroke="{TRACO}" stroke-width="2" fill="none"/>'
             f'<rect x="70" y="120" width="60" height="30" fill="{CLARO["verde"]}" {E}/><rect x="170" y="20" width="60" height="130" fill="{CLARO["amarelo"]}" {E}/>'
             f'<text x="100" y="168" text-anchor="middle" {F} font-size="12">loja A</text><text x="200" y="168" text-anchor="middle" {F} font-size="12">loja B</text>'
             f'<text x="34" y="154" text-anchor="end" {F} font-size="11">90</text><text x="34" y="24" text-anchor="end" {F} font-size="11">100</text>'
             f'<text x="100" y="114" text-anchor="middle" {F} font-size="11" font-weight="600">91</text><text x="200" y="14" text-anchor="middle" {F} font-size="11" font-weight="600">99</text>')
    return svg(270, 176, inner, 'grafico', 'gráfico de barras com o eixo começando em 90: loja A com 91 e loja B com 99 vendas')


def mapa_escala():
    inner = (f'<rect x="4" y="4" width="292" height="112" rx="8" fill="#fff" {E}/>'
             f'<circle cx="40" cy="80" r="6" fill="{TRACO}"/><text x="40" y="102" text-anchor="middle" {F} font-size="12" font-weight="600">escola</text>'
             f'<circle cx="250" cy="40" r="6" fill="{TRACO}"/><text x="250" y="28" text-anchor="middle" {F} font-size="12" font-weight="600">praça</text>'
             f'<path d="M40 80 L250 40" stroke="{TRACO}" stroke-width="2" stroke-dasharray="6 4"/>'
             f'<path d="M180 104 h60" stroke="{TRACO}" stroke-width="3"/><path d="M180 98 v12 M240 98 v12" stroke="{TRACO}" stroke-width="2"/>'
             f'<text x="210" y="96" text-anchor="middle" {F} font-size="11">1 cm = 500 m</text>')
    return svg(300, 120, inner, 'figura', 'mapa com a escola, a praça e a escala de 1 cm para 500 m')


# ---------- 1. números irracionais ----------

def irracionais():
    a = bloco(1, 'A diagonal do quadrado de lado 1 é maior ou menor que 1? Circule.', item(quadrado_diag(), opcoes(['maior', 'menor'])), 'Meça com uma tira de papel o lado e a diagonal.') + bloco(
        2, 'Qual número tem casas decimais que não acabam e não se repetem? Circule.', grade([
            item(pilha('0,5'), opcoes(['acaba', 'não acaba'], certa='acaba'), exemplo=True),
            item(pilha('√2 = 1,41421356...'), opcoes(['acaba', 'não acaba']))], 2), 'A calculadora mostra só uma parte: os algarismos continuam.')
    b = bloco(1, 'Pelo teorema de Pitágoras, a diagonal do quadrado de lado 1 mede √2. Estime e marque na reta.', item(reta_int(0, 3, larg=420)) + frases(['√2 fica entre', '√5 fica entre', 'π fica entre'])) + bloco(
        2, 'Racional (R) ou irracional (I)?', grade([f'<p class="conta">0,25 &nbsp; {VAZIO}</p>', f'<p class="conta">√9 &nbsp; {VAZIO}</p>', f'<p class="conta">√3 &nbsp; {VAZIO}</p>', f'<p class="conta">0,333... &nbsp; {VAZIO}</p>'], 2)) + bloco(
        3, 'Calcule.', grade([f'<p class="conta">{sup(27, "1/3")} = {VAZIO}</p>', f'<p class="conta">{sup(4, "3/2")} = {VAZIO}</p>', f'<p class="conta">√2 × √8 = {VAZIO}</p>'], 3))
    c = bloco(1, 'Calcule e simplifique.', grade([f'<p class="conta">√12 + √27 = {VAZIO}</p>', f'<p class="conta">(√5)² = {VAZIO}</p>', f'<p class="conta">{sup(8, "2/3")} = {VAZIO}</p>', f'<p class="conta">√50 ÷ √2 = {VAZIO}</p>'], 2)) + bloco(
        2, 'A altura de um triângulo equilátero de lado 2 mede √3. Explique por que essa medida não pode ser escrita como fração.', linhas(2)) + bloco(
        3, 'Coloque em ordem do menor para o maior: √10, π, 3,2, 10/3.', linhas(1), 'Use a calculadora para ver as primeiras casas.')
    return ficha(
        'numeros-irracionais-e-reais', 'Números irracionais e reais', '9º ano',
        'Perceber que existem medidas que não são números racionais, como a diagonal do quadrado, localizar irracionais na reta e calcular com raízes e potências de expoente fracionário.',
        ['EF09MA01', 'EF09MA02', 'EF09MA03'], '40 a 50 minutos', 'Quadrado de papel de lado 10 cm, tiras de papel, régua, reta numérica e calculadora.',
        ['Meça a diagonal de um quadrado de papel de 10 cm: dá cerca de 14,1 cm, nunca exato.',
         'Mostre √2 na calculadora: as casas decimais não se repetem.',
         'Na versão A, a tira de papel compara o lado e a diagonal.',
         'Na versão B, use a calculadora para estimar a posição na reta.',
         'Na versão C, mostre as propriedades das raízes com exemplos numéricos antes.'],
        ['Medir o quadrado de papel dá sentido ao √2. Uma ideia por vez: primeiro medir, depois nomear.',
         'Cartão fixo com as duas definições (racional e irracional) e um exemplo de cada.',
         'Medir objetos e estimar na reta vira desafio rápido.'],
        ['Bloco 1: maior. Bloco 2: não acaba.', 'Bloco 1: 1 e 2; 2 e 3; 3 e 4. Bloco 2: R; R (√9 = 3); I; R. Bloco 3: 3; 8; 4.',
         'Bloco 1: 2√3 + 3√3 = 5√3; 5; 4; 5. Bloco 2: 3 não é um quadrado perfeito, então √3 tem casas decimais infinitas e não periódicas. Bloco 3: 3,2 &lt; π &lt; √10 &lt; 10/3.'],
        a, b, c)


# ---------- 2. números reais, notação científica e unidades ----------

def unidades_grandes():
    a = bloco(1, 'Qual é maior? Circule.', grade([
        item(pilha('1 quilômetro', 'ou 1 metro'), opcoes(['km', 'm'], certa='km'), exemplo=True),
        item(pilha('1 gigabyte', 'ou 1 megabyte'), opcoes(['GB', 'MB'])),
        item(pilha('1 milímetro', 'ou 1 micrômetro'), opcoes(['mm', 'µm']))], 3), 'Quilo, mega e giga aumentam. Mili, micro e nano diminuem.') + bloco(
        2, '10<sup>3</sup> = 10 × 10 × 10. Quanto é? Circule.', item(pilha(sup(10, 3)), opcoes([n(1000), 30])))
    b = bloco(1, 'Escreva em notação científica.', frases([f'Distância da Terra à Lua: {n(384000)} km:', 'Tamanho de uma célula: 0,00001 m:', f'Um pen drive de {n(64000000000)} bytes:'])) + bloco(
        2, 'Complete.', tabela(['Unidade', 'Vale'], [['1 quilobyte (kB)', f'{n(1000)} bytes'], ['1 megabyte (MB)', ''], ['1 gigabyte (GB)', ''], ['1 nanômetro (nm)', '']]), 'A primeira linha é o exemplo.') + bloco(
        3, 'Um arquivo de música tem 4 MB. Quantas músicas cabem em 1 GB?', linhas(1))
    c = bloco(1, 'Leia e resolva. Responda em notação científica.', grade([
        problema('A luz anda <b>3 × 10<sup>5</sup> km</b> por segundo. Quanto anda em um ano (cerca de <b>3,2 × 10<sup>7</sup> s</b>)? Isso é um ano-luz.', '18mm'),
        problema(f'Um vírus mede <b>100 nm</b>. Quantos vírus enfileirados cabem em <b>1 mm</b>?', '18mm')], 2)) + bloco(
        2, f'A distância média da Terra ao Sol é 1 unidade astronômica (UA), cerca de 1,5 × 10<sup>8</sup> km. Netuno fica a 30 UA. Quantos km?', linhas(1)) + bloco(
        3, 'Por que usamos unidades como ano-luz e nanômetro em vez de km e m?', linhas(2))
    return ficha(
        'numeros-reais-notacao-cientifica-e-unidades', 'Notação científica e unidades muito grandes ou pequenas', '9º ano',
        'Resolver problemas com números reais em notação científica e usar unidades de medidas muito grandes ou muito pequenas, como ano-luz, nanômetro e gigabyte.',
        ['EF09MA04', 'EF09MA18'], '40 a 50 minutos', 'Calculadora científica, régua milimetrada, pen drive ou celular para ver o armazenamento.',
        ['Mostre o armazenamento de um celular: GB, MB. Quantas fotos cabem?',
         'Compare na régua 1 cm e 1 mm, e conte que 1 mm tem mil micrômetros.',
         'Na versão A, os prefixos (quilo, mega, giga, mili, micro, nano) ficam num cartão.',
         'Na versão B, a tabela das unidades organiza as trocas.',
         'Na versão C, a calculadora científica faz as contas com potências.'],
        ['Objetos do dia a dia (celular, régua) dão sentido às unidades. Um prefixo por vez.',
         'O cartão fixo dos prefixos dá previsibilidade. Avise quando a unidade muda.',
         'Curiosidades sobre o espaço e os vírus chamam a atenção. Desafios curtos.'],
        ['Bloco 1: GB; mm. Bloco 2: 1&#8239;000.', f'Bloco 1: 3,84 × 10<sup>5</sup> km; 1 × 10<sup>−5</sup> m; 6,4 × 10<sup>10</sup> bytes. Bloco 2: 1 milhão de bytes; 1 bilhão de bytes; 0,000000001 m. Bloco 3: 250 músicas.',
         f'Bloco 1: cerca de 9,6 × 10<sup>12</sup> km; 10<sup>4</sup> = {n(10000)} vírus. Bloco 2: 4,5 × 10<sup>9</sup> km. Bloco 3: para não escrever números com muitos zeros.'],
        a, b, c)


# ---------- 3. porcentagens sucessivas ----------

def porcentagens_sucessivas():
    a = bloco(1, 'Um produto de R$ 100 teve 10% de aumento. Quanto ficou? Circule.', item(pilha('10% de R$ 100 = R$ 10', 'R$ 100 + R$ 10'), opcoes(['R$ 110', 'R$ 90'])), 'Aumento: some. Desconto: tire.') + bloco(
        2, 'Depois, o produto de R$ 110 teve 10% de desconto. Voltou para R$ 100? Circule.', item(pilha('10% de R$ 110 = R$ 11', 'R$ 110 − R$ 11 = R$ 99'), opcoes(['sim', 'não'])))
    b = bloco(1, 'Calcule com a calculadora.', frases(['R$ 200 com aumento de 10% e depois mais 10%:', 'R$ 500 com desconto de 20% e depois mais 10%:', 'Um aumento de 10% e outro de 10% é igual a um aumento de quanto?'])) + bloco(
        2, 'Um salário passou de R$ 2&#8239;000 para R$ 2&#8239;300. Qual foi a taxa de aumento?', linhas(1), 'Divida o aumento pelo valor antigo.') + bloco(
        3, 'Para aumentar 15%, multiplique por 1,15. Por quanto multiplicar para dar desconto de 15%?', linhas(1))
    c = bloco(1, 'Use uma planilha ou a calculadora.', grade([
        problema(f'Uma dívida de <b>R$ {n(1000)}</b> tem juros de <b>5% ao mês</b>, sobre o valor do mês anterior. Quanto será depois de 3 meses?', '20mm'),
        problema('Uma loja aumentou um preço em <b>25%</b> e depois anunciou <b>20%</b> de desconto. O preço final é maior, menor ou igual ao inicial?', '20mm')], 2)) + bloco(
        2, 'A inflação foi de 4% num ano e de 5% no outro. Qual foi a inflação acumulada nos dois anos?', linhas(1)) + bloco(
        3, 'Monte na planilha uma tabela de 12 meses com uma poupança de R$ 100 por mês, rendendo 0,5% ao mês. Escreva a fórmula que usou.', linhas(2))
    return ficha(
        'porcentagens-sucessivas-e-educacao-financeira', 'Porcentagens sucessivas e educação financeira', '9º ano',
        'Aplicar porcentagens em sequência, calcular taxas de aumento e desconto e entender juros sobre juros com calculadora e planilha.',
        ['EF09MA05'], '40 a 50 minutos', 'Calculadora, planilha eletrônica, encartes de lojas e boletos de exemplo.',
        ['Mostre um preço que aumenta 10% e depois cai 10%. Volta ao mesmo valor?',
         'Na planilha, faça uma coluna que multiplica por 1,05 a cada linha.',
         'Na versão A, as contas estão montadas passo a passo.',
         'Na versão B, use o fator (1,10, 0,80) na calculadora.',
         'Na versão C, a planilha faz o cálculo dos juros de mês a mês.'],
        ['Dinheiro de brincadeira e encartes deixam o assunto concreto. Uma porcentagem por vez.',
         'O fator de multiplicação (1,10 para aumento, 0,90 para desconto) é um procedimento fixo. Escreva num cartão.',
         'A planilha que calcula sozinha prende a atenção. Problemas curtos sobre compras reais.'],
        ['Bloco 1: R$ 110. Bloco 2: não, fica R$ 99.', 'Bloco 1: R$ 242; R$ 360; 21%. Bloco 2: 15%. Bloco 3: por 0,85.',
         f'Bloco 1: R$ {n(1157)},63; igual (1,25 × 0,80 = 1). Bloco 2: 9,2%. Bloco 3: célula do mês = (célula anterior + 100) × 1,005; cerca de R$ {n(1239)}.'],
        a, b, c)


# ---------- 4. funções ----------

def funcoes():
    a = bloco(1, 'A máquina dobra o número. O que sai? Circule.', grade([
        item(pilha('entra 3', 'sai ?'), opcoes([6, 5], certa=6), exemplo=True),
        item(pilha('entra 5', 'sai ?'), opcoes([10, 7])),
        item(pilha('entra 8', 'sai ?'), opcoes([16, 10]))], 3), 'Para cada número que entra sai um só.') + bloco(
        2, 'Cada pacote de figurinhas custa R$ 2. Os pontos mostram o preço de 1, 2 e 3 pacotes. Quanto custam 4? Circule.', item(plano1(5, 8, 24, pontos={(1, 2): '', (2, 4): '', (3, 6): ''}), opcoes(['R$ 8', 'R$ 7'])))
    b = bloco(1, 'Um táxi cobra R$ 4 de bandeirada mais R$ 2 por km. O preço depende dos km.', tabela(['km (x)', '0', '1', '2', '5', '10'], [['preço (y)', '4', '', '', '', '']]) + frases(['Lei da função:'])) + bloco(
        2, 'Marque os pontos da tabela e ligue.', item(plano1(10, 8, 24, passo_y=4)), 'No eixo de pé, cada quadradinho vale R$ 4.')
    c = bloco(1, 'Para cada situação, diga se é função e escreva a lei.', frases(['Área A de um quadrado de lado L:', 'Perímetro P de um triângulo equilátero de lado L:', 'Uma pessoa e o número de seus irmãos e irmãs:'])) + bloco(
        2, 'Desenhe o gráfico de y = 2x − 1 para x de 1 a 4.', item(plano1(4, 7, 26))) + bloco(
        3, 'Uma piscina tem 10&#8239;000 litros e esvazia 500 litros por hora. Escreva a lei e diga em quantas horas esvazia.', linhas(2))
    return ficha(
        'funcoes-maquina-tabela-e-grafico', 'Funções: máquina, tabela e gráfico', '9º ano',
        'Entender a função como uma relação em que cada valor de entrada tem um único valor de saída e representar por tabela, lei e gráfico.',
        ['EF09MA06'], '40 a 50 minutos', 'Caixa de papelão como "máquina", cartões com números, malha quadriculada e planilha.',
        ['Faça uma "máquina" com uma caixa: entra um cartão com número, sai o dobro.',
         'Pergunte: para o mesmo número que entra, pode sair um número diferente?',
         'Na versão A, a máquina e os pontos já marcados são o apoio principal.',
         'Na versão B, a tabela leva à lei e ao gráfico.',
         'Na versão C, peça situações do dia a dia que são funções e que não são.'],
        ['A máquina de caixa deixa a ideia concreta. Uma regra por vez.',
         'Siga a ordem fixa: tabela, lei, gráfico. Use as mesmas cores para x e y.',
         'Brincar de máquina com os colegas dá movimento. Rodadas curtas.'],
        ['Bloco 1: 10; 16. Bloco 2: R$ 8.', 'Bloco 1: 6, 8, 14, 24; y = 4 + 2x. Bloco 2: pontos numa reta que começa em (0, 4).',
         f'Bloco 1: é função, A = L²; é função, P = 3L; não é função de um jeito único se olharmos a turma (não há regra). Bloco 2: reta pelos pontos (1, 1), (2, 3), (3, 5), (4, 7). Bloco 3: V = {n(10000)} − 500h; 20 horas.'],
        a, b, c)


# ---------- 5. razões, escalas e partes proporcionais ----------

def razoes_escalas():
    a = bloco(1, 'Um carro andou 120 km em 2 horas. Quantos km por hora? Circule.', item(pilha('120 km ÷ 2 h'), opcoes(['60 km/h', '240 km/h'])), 'Velocidade é distância dividida pelo tempo.') + bloco(
        2, 'No mapa, 1 cm vale 500 m. A escola fica a 3 cm da praça no mapa. Qual é a distância real? Circule.', item(mapa_escala(), opcoes([f'{n(1500)} m', '503 m'])))
    b = bloco(1, 'Leia e resolva.', grade([
        problema(f'Uma cidade tem <b>{n(60000)}</b> habitantes e <b>300 km²</b>. Qual é a densidade demográfica?', '16mm'),
        problema('Um ciclista faz <b>45 km</b> em <b>3 horas</b>. Qual é a velocidade média?', '16mm')], 2)) + bloco(
        2, 'Divida R$ 900 entre Ana e Beto em partes proporcionais a 2 e 3.', linhas(1), 'Some as partes: 2 + 3 = 5. Cada parte vale 900 ÷ 5.') + bloco(
        3, 'Num mapa de escala 1 : 100&#8239;000, duas cidades estão a 8 cm. Qual é a distância real em km?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Três sócios investiram R$ 2&#8239;000, R$ 3&#8239;000 e R$ 5&#8239;000. O lucro foi de R$ 4&#8239;000. Quanto recebe cada um, proporcionalmente?', '18mm'),
        problema('Um rio tem vazão de <b>20 m³</b> por segundo. Quantos litros passam em 1 minuto?', '18mm')], 2)) + bloco(
        2, 'A população de uma cidade passou de 50&#8239;000 para 56&#8239;000 em 4 anos. Qual foi a taxa média de crescimento por ano, em habitantes?', linhas(1)) + bloco(
        3, 'Uma maquete de prédio está na escala 1 : 200. A maquete tem 15 cm de altura. Qual é a altura real?', linhas(1))
    return ficha(
        'razoes-escalas-e-partes-proporcionais', 'Razões, escalas e divisão em partes proporcionais', '9º ano',
        'Resolver problemas com razões entre grandezas diferentes, como velocidade e densidade, com escalas de mapas e maquetes e com divisão em partes proporcionais.',
        ['EF09MA07', 'EF09MA08'], '40 a 50 minutos', 'Mapa da cidade com escala, régua, calculadora e dados do IBGE da cidade.',
        ['Meça no mapa a distância da escola até um lugar conhecido e use a escala.',
         'Pesquise a população e a área da cidade e calcule a densidade.',
         'Na versão A, a conta já vem montada.',
         'Na versão B, siga a dica das partes: somar, dividir, multiplicar.',
         'Na versão C, use a calculadora e dados reais.'],
        ['O mapa da própria cidade dá sentido. Uma razão por vez, com a unidade escrita.',
         'Escreva sempre a unidade junto com o número (km/h, hab/km²). A rotina da divisão em partes é fixa.',
         'Medir no mapa e calcular distâncias reais vira desafio rápido.'],
        [f'Bloco 1: 60 km/h. Bloco 2: {n(1500)} m.', 'Bloco 1: 200 habitantes por km²; 15 km/h. Bloco 2: Ana R$ 360 e Beto R$ 540. Bloco 3: 8 km.',
         f'Bloco 1: R$ 800, R$ {n(1200)} e R$ {n(2000)}; {n(1200000)} litros. Bloco 2: {n(1500)} habitantes por ano. Bloco 3: 30 m.'],
        a, b, c)


# ---------- 6. fatoração e equações do 2º grau ----------

def fatoracao():
    a = bloco(1, 'O quadrado grande tem lado x + 2. Ele é formado por quatro partes. Some as áreas. Circule.', item(fatoracao_desenho(), opcoes(['x² + 4x + 4', 'x² + 4'])), 'Conte as partes: um quadrado x², dois retângulos 2x e um quadradinho 4.') + bloco(
        2, 'Qual número torna verdade? Circule.', item(pilha('x × (x − 3) = 0'), opcoes(['x = 0 ou x = 3', 'x = 1'])), 'Se uma multiplicação dá zero, um dos números é zero.')
    b = bloco(1, 'Desenvolva.', grade([f'<p class="conta">(x + 3)² = {VAZIO}</p>', f'<p class="conta">(x − 5)² = {VAZIO}</p>', f'<p class="conta">(x + 4)(x − 4) = {VAZIO}</p>'], 1)) + bloco(
        2, 'Fatore e resolva.', grade([f'<p class="conta">x² − 9 = 0</p>', f'<p class="conta">x² + 6x + 9 = 0</p>', f'<p class="conta">x² − 5x = 0</p>'], 3) + linhas(1)) + bloco(
        3, 'Um terreno retangular tem um lado 2 m maior que o outro e área de 48 m². Quais são as medidas?', linhas(1), 'Teste números: que dois números com diferença 2 multiplicados dão 48?')
    c = bloco(1, 'Fatore.', grade([f'<p class="conta">x² − 49 = {VAZIO}</p>', f'<p class="conta">4x² + 12x + 9 = {VAZIO}</p>', f'<p class="conta">3x² − 12x = {VAZIO}</p>'], 1)) + bloco(
        2, 'Resolva fatorando.', grade([f'<p class="conta">x² − 10x + 25 = 0</p>', f'<p class="conta">x² − 16 = 0</p>', f'<p class="conta">2x² = 8x</p>'], 3) + linhas(1)) + bloco(
        3, 'O quadrado de um número menos o seu dobro dá 15. Que número é? Escreva a equação e resolva.', linhas(2))
    return ficha(
        'fatoracao-produtos-notaveis-e-segundo-grau', 'Fatoração, produtos notáveis e equações do 2º grau', '9º ano',
        'Entender os produtos notáveis com áreas, fatorar expressões e usar a fatoração para resolver equações do 2º grau.',
        ['EF09MA09'], '40 a 50 minutos', 'Peças de papel (quadrados x², retângulos x e quadradinhos 1), tesoura e malha quadriculada.',
        ['Monte com peças de papel o quadrado de lado x + 2 e conte as peças.',
         'Mostre que, se a × b = 0, então a = 0 ou b = 0.',
         'Na versão A, o desenho mostra as quatro partes do quadrado.',
         'Na versão B, monte cada produto notável com as peças antes de escrever.',
         'Na versão C, confira as soluções substituindo na equação.'],
        ['As peças de área deixam o produto notável concreto. Um produto por vez.',
         'Cartão fixo com os três produtos notáveis. Sempre conferir a resposta substituindo.',
         'Montar o quadrado com peças é rápido e visual. Equações curtas com conferência.'],
        ['Bloco 1: x² + 4x + 4. Bloco 2: x = 0 ou x = 3.', 'Bloco 1: x² + 6x + 9; x² − 10x + 25; x² − 16. Bloco 2: x = 3 ou −3; x = −3; x = 0 ou 5. Bloco 3: 6 m e 8 m.',
         'Bloco 1: (x + 7)(x − 7); (2x + 3)²; 3x(x − 4). Bloco 2: x = 5; x = 4 ou −4; x = 0 ou 4. Bloco 3: x² − 2x = 15, (x − 5)(x + 3) = 0, x = 5 ou −3.'],
        a, b, c)


def fatoracao_desenho():
    x, u = 90, 36
    t = f'{F} font-size="14" font-weight="600" {HALO}'
    inner = (f'<rect x="20" y="10" width="{x}" height="{x}" fill="{CLARO["amarelo"]}" {E}/>'
             f'<rect x="{20 + x}" y="10" width="{u}" height="{x}" fill="{CLARO["verde"]}" {E}/>'
             f'<rect x="20" y="{10 + x}" width="{x}" height="{u}" fill="{CLARO["verde"]}" {E}/>'
             f'<rect x="{20 + x}" y="{10 + x}" width="{u}" height="{u}" fill="{CLARO["rosa"]}" {E}/>'
             f'<text x="{20 + x / 2}" y="{10 + x / 2 + 5}" text-anchor="middle" {t}>x²</text>'
             f'<text x="{20 + x + u / 2}" y="{10 + x / 2 + 5}" text-anchor="middle" {t}>2x</text>'
             f'<text x="{20 + x / 2}" y="{10 + x + u / 2 + 5}" text-anchor="middle" {t}>2x</text>'
             f'<text x="{20 + x + u / 2}" y="{10 + x + u / 2 + 5}" text-anchor="middle" {t}>4</text>'
             f'<text x="{20 + x / 2}" y="{x + u + 30}" text-anchor="middle" {t}>x</text><text x="{20 + x + u / 2}" y="{x + u + 30}" text-anchor="middle" {t}>2</text>')
    return svg(x + u + 40, x + u + 36, inner, 'figura', 'quadrado de lado x + 2 dividido em um quadrado x², dois retângulos 2x e um quadradinho de área 4')


# ---------- 7. ângulos na circunferência e paralelas ----------

def angulos_circunferencia():
    a = bloco(1, 'O ângulo inscrito (pontilhado) é a metade do ângulo central do mesmo arco. Quanto mede? Circule.', item(circ_angulos(True, True, '100°', '?'), opcoes(['50°', '200°'])), 'Os dois "olham" para o mesmo arco AB, pintado.') + bloco(
        2, 'As retas r e s são paralelas. O ângulo com o ponto de interrogação mede: Circule.', item(transversal({0: '70°', 4: '?'}, w=240, h=160), opcoes(['70°', '110°'])))
    b = bloco(1, 'Complete.', grade([item(circ_angulos(True, True, '80°', 'x'), f'<p class="du">x = {VAZIO}</p>'), item(circ_angulos(True, True, 'y', '35°'), f'<p class="du">y = {VAZIO}</p>')], 2)) + bloco(
        2, 'Num triângulo inscrito numa circunferência, um dos lados é o diâmetro. Quanto mede o ângulo oposto a ele? Por quê?', linhas(2), 'O ângulo central de um diâmetro é 180°.') + bloco(
        3, 'Ângulos alternos internos entre paralelas são iguais. Use isso para explicar por que os ângulos do triângulo somam 180°.', linhas(2))
    c = bloco(1, 'Num programa de geometria dinâmica (ou com transferidor), desenhe uma circunferência, um arco AB e três ângulos inscritos diferentes nesse arco. O que você percebe?', caixa_desenho('40mm') + linhas(1)) + bloco(
        2, 'Um quadrilátero está inscrito numa circunferência. Um dos ângulos mede 70°. Quanto mede o ângulo oposto? Explique.', linhas(2)) + bloco(
        3, 'Demonstre: duas retas paralelas cortadas por uma transversal formam ângulos correspondentes iguais. Use o que já sabe sobre ângulos opostos pelo vértice.', linhas(3))
    return ficha(
        'angulos-na-circunferencia-e-paralelas', 'Ângulos na circunferência e retas paralelas', '9º ano',
        'Relacionar arcos, ângulos centrais e ângulos inscritos e demonstrar relações entre ângulos formados por paralelas cortadas por uma transversal.',
        ['EF09MA10', 'EF09MA11'], '40 a 50 minutos', 'Compasso, transferidor, papel vegetal e, se possível, um programa de geometria dinâmica.',
        ['Desenhe um arco e o ângulo central. Depois marque vários ângulos inscritos no mesmo arco e meça.',
         'No programa de geometria dinâmica, arraste o vértice do ângulo inscrito: a medida não muda.',
         'Na versão A, o arco está pintado para mostrar qual é o arco comum.',
         'Na versão B, meça com o transferidor para conferir.',
         'Na versão C, escreva as demonstrações em passos numerados.'],
        ['Medir com transferidor antes de usar a regra. Uma relação por vez.',
         'A regra "inscrito é a metade do central" fica num cartão. Arco sempre pintado da mesma cor.',
         'Arrastar pontos no programa dá movimento e surpresa.'],
        ['Bloco 1: 50°. Bloco 2: 70°.', 'Bloco 1: x = 40°; y = 70°. Bloco 2: 90°, porque é a metade de 180°. Bloco 3: a reta paralela pelo vértice forma, com os lados, ângulos iguais aos da base; os três juntos formam meia volta.',
         'Bloco 1: todos os ângulos inscritos no mesmo arco têm a mesma medida. Bloco 2: 110°, porque os ângulos opostos somam 180° (os arcos somam 360°). Bloco 3: demonstração com ângulos opostos pelo vértice e suplementares.'],
        a, b, c)


# ---------- 8. semelhança e Pitágoras ----------

def semelhanca_pitagoras():
    a = bloco(1, 'O triângulo verde é a ampliação do amarelo: cada lado dobrou. Quanto mede o lado com o ponto de interrogação? Circule.', item(semelhantes(), opcoes([10, 7])), 'O lado de 5 dobrou.') + bloco(
        2, 'Conte os quadradinhos: 9 + 16 = 25. Qual é a medida do lado maior? Circule.', item(tri_ret(3, 4, 5, 26, ('3', '4', '?')), opcoes([5, 7])), 'O quadrado do lado maior tem 25 quadradinhos. Que número vezes ele mesmo dá 25?')
    b = bloco(1, 'Calcule o lado que falta (teorema de Pitágoras: a² = b² + c²).', grade([
        item(tri_ret(4, 3, 5, 22, ('8', '6', 'x')), f'<p class="du">x = {VAZIO}</p>'),
        item(tri_ret(4, 2.4, 5, 22, ('12', 'x', '13')), f'<p class="du">x = {VAZIO}</p>')], 2)) + bloco(
        2, 'Dois triângulos são semelhantes quando têm os mesmos ângulos e os lados proporcionais. Os triângulos de lados 3, 4, 5 e 9, 12, 15 são semelhantes? Por quê?', linhas(1)) + bloco(
        3, 'Uma escada de 5 m está encostada num muro, com o pé a 3 m do muro. Até que altura ela chega?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('A sombra de um poste mede <b>6 m</b> e, no mesmo horário, a sombra de uma pessoa de <b>1,6 m</b> mede <b>1,2 m</b>. Qual é a altura do poste?', '18mm'),
        problema('Uma TV de <b>50 polegadas</b> tem a diagonal de 50. Se a largura é 40, qual é a altura?', '18mm')], 2)) + bloco(
        2, 'Três retas paralelas cortam duas retas. Na primeira, os segmentos medem 4 e 6. Na segunda, o primeiro mede 6. Quanto mede o outro (teorema de Tales)?', linhas(1)) + bloco(
        3, 'Demonstre o teorema de Pitágoras com a altura relativa à hipotenusa e a semelhança dos três triângulos formados (ou com o quebra-cabeça dos quatro triângulos).', linhas(3))
    return ficha(
        'semelhanca-e-teorema-de-pitagoras', 'Semelhança de triângulos e teorema de Pitágoras', '9º ano',
        'Reconhecer triângulos semelhantes, demonstrar e aplicar o teorema de Pitágoras e usar a proporcionalidade de retas paralelas cortadas por secantes.',
        ['EF09MA12', 'EF09MA13', 'EF09MA14'], '40 a 50 minutos', 'Quadradinhos de papel, triângulos recortados, barbante com 12 nós (3, 4, 5) e trena.',
        ['Monte com quadradinhos os quadrados sobre os lados do triângulo 3, 4, 5: 9 + 16 = 25.',
         'Faça um triângulo com o barbante de 12 nós: ele sai com um ângulo reto.',
         'Na versão A, conte os quadradinhos antes de usar a fórmula.',
         'Na versão B, escreva sempre qual lado é a hipotenusa (oposto ao ângulo reto).',
         'Na versão C, meça sombras no pátio para o problema do poste.'],
        ['Os quadradinhos mostram o teorema com as mãos. Um triângulo por vez.',
         'Marque sempre o ângulo reto e a hipotenusa da mesma cor. A fórmula fica num cartão.',
         'Medir sombras no pátio e montar o triângulo de barbante dá movimento.'],
        ['Bloco 1: 10. Bloco 2: 5.', 'Bloco 1: 10; 5. Bloco 2: sim, cada lado foi multiplicado por 3. Bloco 3: 4 m.',
         'Bloco 1: 8 m; 30 polegadas. Bloco 2: 9. Bloco 3: demonstração com semelhança (a² = am + an) ou com a área do quadrado montado com quatro triângulos.'],
        a, b, c)


# ---------- 9. polígono regular e plano cartesiano ----------

def poligono_plano():
    a = bloco(1, 'O ponto do meio entre A(1, 2) e B(5, 2) é: Circule.', item(plano1(6, 4, 30, pontos={(1, 2): 'A', (5, 2): 'B'}), opcoes(['(3, 2)', '(4, 2)'])), 'Conte os quadradinhos de A até B e divida ao meio.') + bloco(
        2, 'Qual é a distância de A até B? Circule.', item(pilha('de 1 até 5'), opcoes([4, 6])))
    b = bloco(1, 'Calcule o ponto médio e a distância.', item(plano4(4, 22, pontos={(-3, -3): 'P', (1, 3): 'Q'}, rotulo='plano com os pontos P e Q')) + frases(['Ponto médio de P e Q:', 'Distância de P até Q (use Pitágoras com o triângulo de catetos 6 e 4):'])) + bloco(
        2, 'Escreva o algoritmo para construir um triângulo equilátero de lado 5 cm com régua e compasso.', linhas(3))
    c = bloco(1, 'O triângulo tem vértices A(0, 0), B(6, 0) e C(0, 8).', item(plano1(6, 8, 18, figuras=[[(0, 0), (6, 0), (0, 8)]])) + frases(['Medida do lado BC:', 'Perímetro:', 'Área:', 'Ponto médio de BC:'])) + bloco(
        2, 'Escreva o algoritmo e faça o fluxograma para construir um polígono regular de n lados, sabendo a medida do lado, com régua, compasso e transferidor.', linhas(2) + caixa_desenho('34mm'))
    return ficha(
        'poligono-regular-ponto-medio-e-distancia', 'Polígono regular, ponto médio e distância no plano', '9º ano',
        'Descrever algoritmos de construção de polígonos regulares e calcular, no plano cartesiano e sem fórmulas, o ponto médio, a distância entre pontos, perímetros e áreas.',
        ['EF09MA15', 'EF09MA16'], '40 a 50 minutos', 'Malha quadriculada, régua, compasso, transferidor e, se possível, um programa de geometria dinâmica.',
        ['Marque dois pontos na malha e conte os quadradinhos entre eles.',
         'Para pontos em diagonal, desenhe o triângulo retângulo e use Pitágoras.',
         'Na versão A, os pontos estão na mesma linha. Basta contar.',
         'Na versão B, desenhe o triângulo auxiliar antes de calcular.',
         'Na versão C, peça que um colega siga o algoritmo escrito.'],
        ['Contar quadradinhos antes de calcular. Um ponto por vez.',
         'Siga sempre a rotina: desenhar o triângulo, achar os catetos, aplicar Pitágoras. Algoritmos com passos numerados.',
         'Marcar pontos e construir figuras dá movimento. Use o programa como recompensa.'],
        ['Bloco 1: (3, 2). Bloco 2: 4.', 'Bloco 1: (−1, 0); √52, cerca de 7,2. Bloco 2: trace 5 cm; abra o compasso em 5 cm e faça arcos das duas pontas; ligue o cruzamento às pontas.',
         'Bloco 1: 10; 24; 24; (3, 4). Bloco 2: trace o lado; com o transferidor, marque o ângulo interno (180° − 360° ÷ n); meça o lado; repita até fechar.'],
        a, b, c)


# ---------- 10. vistas e volumes ----------

def vistas_volumes():
    a = bloco(1, 'Olhe o bloco de cima. Quantos quadradinhos você vê? Circule.', item(empilhado(3, 2, 2, 26), opcoes([6, 12])), 'De cima, só se vê a camada de cima.') + bloco(
        2, 'Qual sólido tem a vista de cima em forma de círculo? Circule.', item(solido('cilindro', 70) + '&nbsp;&nbsp;&nbsp;' + solido('cubo', 70), opcoes(['cilindro', 'cubo'])))
    b = bloco(1, 'Desenhe as vistas do bloco: de frente e de cima.', item(empilhado(3, 2, 2, 26)) + grade([caixa_desenho('26mm', 'de frente'), caixa_desenho('26mm', 'de cima')], 2)) + bloco(
        2, 'Calcule o volume. Use π ≈ 3,14.', grade([
            problema('Uma caixa de leite tem base de <b>7 cm</b> por <b>7 cm</b> e altura de <b>20 cm</b>.', '14mm'),
            problema('Uma lata tem raio de <b>5 cm</b> e altura de <b>10 cm</b>.', '14mm')], 2), 'Volume = área da base × altura.')
    c = bloco(1, 'Desenhe em perspectiva um objeto com estas vistas: de frente um retângulo, de lado um retângulo e de cima um círculo.', caixa_desenho('34mm')) + bloco(
        2, 'Leia e resolva. Use π ≈ 3,14.', grade([
            problema('Uma caixa-d’água cilíndrica tem <b>1 m</b> de diâmetro e <b>1,2 m</b> de altura. Quantos litros cabem?', '18mm'),
            problema('Um prisma de base triangular tem base com <b>6 cm</b> e altura <b>4 cm</b>, e o prisma tem <b>10 cm</b> de comprimento. Qual o volume?', '18mm')], 2)) + bloco(
        3, 'Duas latas têm o mesmo volume. Uma tem o dobro do raio da outra. Quantas vezes a mais baixa é menor em altura?', linhas(1))
    return ficha(
        'vistas-ortogonais-e-volumes', 'Vistas ortogonais e volumes de prismas e cilindros', '9º ano',
        'Reconhecer e desenhar as vistas de frente, de lado e de cima de objetos, desenhar em perspectiva e calcular volumes de prismas e cilindros.',
        ['EF09MA17', 'EF09MA19'], '40 a 50 minutos', 'Cubinhos de montar, embalagens (caixa de leite, lata), régua e calculadora.',
        ['Monte um bloco com cubinhos e olhe de frente, de lado e de cima, abaixando a cabeça até a altura da mesa.',
         'Meça uma caixa de leite e uma lata e calcule o volume. Compare com o que está escrito na embalagem.',
         'Na versão A, o estudante olha o bloco de verdade de cima.',
         'Na versão B, monte o bloco com cubinhos antes de desenhar as vistas.',
         'Na versão C, as embalagens reais conferem os cálculos.'],
        ['Cubinhos e embalagens de verdade. Uma vista por vez.',
         'Combine a ordem fixa das vistas: frente, lado, cima. A expressão do volume fica num cartão.',
         'Montar blocos e medir embalagens dá movimento.'],
        ['Bloco 1: 6. Bloco 2: cilindro.', 'Bloco 1: frente com 3 por 2 quadradinhos; de cima com 3 por 2. Bloco 2: 980 cm³ (quase 1 litro); 785 cm³.',
         'Bloco 1: um cilindro deitado ou de pé. Bloco 2: cerca de 0,942 m³, ou seja, 942 litros; 120 cm³. Bloco 3: 4 vezes mais baixa.'],
        a, b, c)


# ---------- 11. probabilidade, gráficos e pesquisa ----------

def estatistica9():
    a = bloco(1, 'Num saco há 2 bolas verdes e 2 amarelas. Tiro uma, não devolvo, e tiro outra. A segunda depende da primeira? Circule.', item(pilha('sem devolver'), opcoes(['depende', 'não depende'])), 'Se não devolvo, o saco muda.') + bloco(
        2, 'O gráfico parece mostrar que a loja B vendeu muito mais. Olhe os números. A diferença é grande? Circule.', item(grafico_enganoso(), opcoes(['sim', 'não'])), 'O eixo começa em 90, e não em 0.')
    b = bloco(1, 'Calcule.', frases(['Lanço uma moeda e um dado. Probabilidade de cara e 6:', 'Tiro duas cartas de 10 numeradas de 1 a 10, sem devolver. Probabilidade de as duas serem pares:'])) + bloco(
        2, 'O que está errado ou faltando no gráfico?', item(grafico_enganoso()) + linhas(2)) + bloco(
        3, 'Que gráfico usar?', frases(['Evolução das vendas em 12 meses:', 'Notas de cinco turmas:', 'Parte de cada despesa no orçamento:']))
    c = bloco(1, 'Eventos independentes ou dependentes? Calcule.', frases(['Lançar dois dados e sair 6 nos dois:', 'Sortear 2 estudantes de uma turma de 30 (15 meninas) e as duas serem meninas:'])) + bloco(
        2, 'Escolha uma notícia com gráfico. Verifique a escala, a legenda, a fonte e a data. Escreva o que encontrou.', linhas(3)) + bloco(
        3, 'Planeje uma pesquisa amostral sobre um tema da sua comunidade e o relatório: amostra, tabela, gráfico, média, moda, mediana e amplitude, feitos com planilha.', linhas(4))
    return ficha(
        'probabilidade-graficos-e-pesquisa-amostral', 'Probabilidade, gráficos enganosos e pesquisa amostral', '9º ano',
        'Calcular probabilidades de eventos dependentes e independentes, identificar gráficos que enganam, escolher o gráfico adequado e planejar uma pesquisa amostral com relatório.',
        ['EF09MA20', 'EF09MA21', 'EF09MA22', 'EF09MA23'], '40 a 50 minutos', 'Saco com bolas coloridas, moedas, dados, notícias com gráficos e planilha eletrônica.',
        ['Tire bolas de um saco com e sem devolver. O que muda na segunda tirada?',
         'Mostre o mesmo dado em dois gráficos, um com o eixo começando em zero e outro não.',
         'Na versão A, o saco de bolas de verdade é o apoio principal.',
         'Na versão B, compare os gráficos lado a lado.',
         'Na versão C, a pesquisa pode ser feita de verdade com a planilha.'],
        ['Sacos e bolas de verdade dão sentido à dependência. Uma tirada por vez.',
         'Um roteiro fixo para analisar gráficos: escala, legenda, fonte, data. Checar item por item.',
         'Caçar gráficos enganosos em notícias vira desafio. Experimentos curtos.'],
        ['Bloco 1: depende. Bloco 2: não, foram 91 e 99 vendas.', 'Bloco 1: 1/2 × 1/6 = 1/12; 5/10 × 4/9 = 2/9. Bloco 2: o eixo começa em 90, falta título, fonte e data. Bloco 3: linha; barras (colunas); setores.',
         'Bloco 1: independentes, 1/36; dependentes, 15/30 × 14/29 = 7/29. Bloco 2: análise própria. Bloco 3: planejamento próprio.'],
        a, b, c)


FICHAS = [irracionais, unidades_grandes, porcentagens_sucessivas, funcoes, razoes_escalas, fatoracao, angulos_circunferencia,
          semelhanca_pitagoras, poligono_plano, vistas_volumes, estatistica9]
