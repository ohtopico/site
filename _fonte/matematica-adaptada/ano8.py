"""Fichas do 8º ano."""
from base import ficha
from desenhos import CLARO, TRACO, svg
from desenhos2 import grafico_barras, malha, regular
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, matriz, opcoes, problema, tabela
from ano3 import frases
from ano4 import malha_eixo, n
from ano5 import empilhado
from ano6 import angulo2, fluxo_vazio
from ano7 import figura_medida, fluxo_linear, m, plano1, plano4, ret_diagonal, setores

F = 'font-family="Lexend, sans-serif"'
E = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"'
HALO = 'paint-order="stroke" stroke="#fff" stroke-width="4"'


def pilha(*linhas_):
    return '<div class="pilha-contas">' + ''.join(f'<p class="conta">{t}</p>' for t in linhas_) + '</div>'


def sup(b, e):
    return f'{b}<sup>{e}</sup>'


# ---------- desenhos do 8º ano ----------

def dois_triangulos(iguais=True):
    t1 = [(10, 90), (100, 90), (30, 20)]
    t2 = [(130, 30), (220, 30), (200, 100)] if iguais else [(130, 90), (200, 90), (200, 20)]
    pol = lambda p, cor: f'<polygon points="{" ".join(f"{x},{y}" for x, y in p)}" fill="{cor}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
    return svg(230, 110, pol(t1, CLARO['amarelo']) + pol(t2, CLARO['verde']), 'figura', 'dois triângulos ' + ('iguais, um deles girado' if iguais else 'diferentes'))


def paralelogramo_diag():
    P = {'A': (20, 100), 'B': (170, 100), 'C': (210, 20), 'D': (60, 20)}
    pts = ' '.join(f'{x},{y}' for x, y in P.values())
    inner = (f'<polygon points="{pts}" fill="#fff" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
             f'<path d="M20 100 L210 20" stroke="{TRACO}" stroke-width="2" stroke-dasharray="6 4"/>')
    off = {'A': (-12, 14), 'B': (6, 16), 'C': (8, -4), 'D': (-14, -4)}
    for k, (x, y) in P.items():
        inner += f'<text x="{x + off[k][0]}" y="{y + off[k][1]}" {F} font-size="14" font-weight="600">{k}</text>'
    return svg(232, 124, inner, 'figura', 'paralelogramo ABCD com a diagonal AC tracejada')


def segmento(com_dobra=False):
    inner = (f'<path d="M40 60 H220" stroke="{TRACO}" stroke-width="2.5"/><circle cx="40" cy="60" r="4.5" fill="{TRACO}"/><circle cx="220" cy="60" r="4.5" fill="{TRACO}"/>'
             f'<text x="34" y="84" {F} font-size="14" font-weight="600">A</text><text x="214" y="84" {F} font-size="14" font-weight="600">B</text>')
    if com_dobra:
        inner += (f'<path d="M130 6 V114" stroke="{TRACO}" stroke-width="2.2" stroke-dasharray="7 5"/>'
                  f'<circle cx="130" cy="22" r="4.5" fill="{TRACO}"/><text x="138" y="22" {F} font-size="14" font-weight="600">P</text>'
                  f'<path d="M130 22 L40 60 M130 22 L220 60" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="3 4"/>')
    return svg(260, 120, inner, 'figura', 'segmento AB' + (' com a dobra no meio e um ponto P sobre ela' if com_dobra else ''))


def tres_casas():
    casa = lambda x, y, t: (f'<path d="M{x - 14} {y} v-14 l14 -12 l14 12 v14z" fill="{CLARO["laranja"]}" {E}/>'
                            f'<text x="{x}" y="{y + 18}" text-anchor="middle" {F} font-size="13" font-weight="600">{t}</text>')
    return svg(300, 150, casa(40, 120, 'A') + casa(260, 110, 'B') + casa(140, 40, 'C'), 'figura', 'três casas A, B e C em posições diferentes')


def losango_med():
    t = f'{F} font-size="12" font-weight="600" {HALO}'
    inner = (f'<polygon points="80,6 150,56 80,106 10,56" fill="#fff" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
             f'<path d="M10 56 H150 M80 6 V106" stroke="{TRACO}" stroke-width="1.5" stroke-dasharray="5 4"/>'
             f'<text x="116" y="50" text-anchor="middle" {t}>8 cm</text><text x="86" y="88" {t}>6 cm</text>')
    return svg(160, 114, inner, 'figura', 'losango com diagonais de 8 cm e 6 cm')


def circulo_raio():
    inner = (f'<circle cx="60" cy="58" r="50" fill="#fff" stroke="{TRACO}" stroke-width="2.5"/><path d="M60 58 H110" stroke="{TRACO}" stroke-width="2"/>'
             f'<circle cx="60" cy="58" r="4" fill="{TRACO}"/><text x="85" y="52" text-anchor="middle" {F} font-size="12" font-weight="600" {HALO}>3 cm</text>')
    return svg(124, 116, inner, 'figura', 'círculo de raio 3 cm')


def bolinhas_seq(ns=(1, 3, 6), r=7):
    """Números triangulares: triângulos de bolinhas."""
    inner, x0 = '', 6
    for k in range(1, len(ns) + 1):
        for lin in range(k):
            for c in range(lin + 1):
                cx = x0 + (k - 1 - lin) * r + c * 2 * r + r
                cy = 8 + (3 - k) * 2 * r + lin * 2 * r + r
                inner += f'<circle cx="{cx}" cy="{cy}" r="{r - 1.5}" fill="{CLARO["amarelo"]}" {E}/>'
        x0 += k * 2 * r + 24
    return svg(x0, 8 + 6 * r + 10, inner, 'figura', 'triângulos de bolinhas com 1, 3 e 6 bolinhas')


# ---------- 1. potências, raízes e notação científica ----------

def potencias():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(pilha(sup(2, 3), '2 × 2 × 2'), opcoes([8, 6], certa=8), exemplo=True),
        item(pilha(sup(10, 2), '10 × 10'), opcoes([100, 20])),
        item(pilha(sup(5, 2), '5 × 5'), opcoes([25, 10]))], 3), 'O número pequeno diz quantas vezes multiplicar.') + bloco(
        2, 'O quadrado tem 9 quadradinhos. A raiz quadrada de 9 é a medida do lado. Circule.', item(malha(3, 3, 30, pintadas=[(c, l) for c in range(3) for l in range(3)]), opcoes([3, 9])), 'Conte os quadradinhos de um lado.')
    b = bloco(1, 'Calcule.', grade([f'<p class="conta">{sup(2, 5)} = {VAZIO}</p>', f'<p class="conta">{sup(10, m(-1))} = {VAZIO}</p>', f'<p class="conta">{sup(3, 0)} = {VAZIO}</p>', f'<p class="conta">{sup(10, m(-2))} = {VAZIO}</p>'], 2),
              'Expoente negativo vira divisão: 10<sup>−1</sup> = 1 ÷ 10.') + bloco(
        2, 'Escreva em notação científica (um número de 1 a 10 vezes uma potência de 10).', frases([f'Distância da Terra ao Sol: {n(150000000)} km =', 'Espessura de um fio de cabelo: 0,0001 m ='])) + bloco(
        3, 'Calcule.', grade([f'<p class="conta">√25 = {VAZIO}</p>', f'<p class="conta">√100 = {VAZIO}</p>', f'<p class="conta">∛8 = {VAZIO}</p>'], 3))
    c = bloco(1, 'Calcule.', grade([f'<p class="conta">{sup(2, 3)} × {sup(2, 4)} = {VAZIO}</p>', f'<p class="conta">{sup(10, 5)} ÷ {sup(10, m(-2))} = {VAZIO}</p>',
                                    f'<p class="conta">({sup(3, 2)})<sup>3</sup> = {VAZIO}</p>', f'<p class="conta">{sup(9, "1/2")} = {VAZIO}</p>'], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema(f'A luz percorre cerca de <b>3 × 10<sup>5</sup> km</b> por segundo. Quantos km em 1 minuto? Responda em notação científica.', '18mm'),
            problema(f'Um vírus mede <b>1 × 10<sup>{m(-7)}</sup> m</b>. Quantos vírus enfileirados formam 1 mm?', '18mm')], 2)) + bloco(
        3, f'Escreva {sup(8, "1/3")} e {sup(16, "1/2")} como raízes e calcule.', linhas(1))
    return ficha(
        'potencias-raizes-e-notacao-cientifica', 'Potências, raízes e notação científica', '8º ano',
        'Calcular potências com expoentes inteiros, escrever números muito grandes e muito pequenos em notação científica e relacionar raiz com potência de expoente fracionário.',
        ['EF08MA01', 'EF08MA02'], '40 a 50 minutos', 'Quadradinhos e cubinhos de montar, calculadora científica e notícias com números muito grandes ou pequenos.',
        ['Monte quadrados com 4, 9 e 16 quadradinhos. O lado é a raiz quadrada.',
         'Mostre a tabela das potências de 10: cada passo para baixo divide por 10, até chegar em 10<sup>−1</sup> e 10<sup>−2</sup>.',
         'Na versão A, a potência aparece escrita como multiplicação ao lado.',
         'Na versão B, a tabela das potências de 10 fica à vista.',
         'Na versão C, a calculadora científica confere os resultados.'],
        ['Quadradinhos de montar dão sentido à raiz. Uma potência por vez, escrita por extenso.',
         'A tabela fixa das potências de 10 mostra a regularidade. Avise que expoente negativo não deixa o número negativo.',
         'Números enormes de notícias (estrelas, vírus) chamam a atenção. Desafios curtos com a calculadora.'],
        ['Bloco 1: 100; 25. Bloco 2: 3.', f'Bloco 1: 32; 0,1; 1; 0,01. Bloco 2: 1,5 × 10<sup>8</sup> km; 1 × 10<sup>−4</sup> m. Bloco 3: 5; 10; 2.',
         f'Bloco 1: 2<sup>7</sup> = 128; 10<sup>7</sup>; 3<sup>6</sup> = 729; 3. Bloco 2: 1,8 × 10<sup>7</sup> km; 10<sup>4</sup> = {n(10000)} vírus. Bloco 3: ∛8 = 2; √16 = 4.'],
        a, b, c)


# ---------- 2. contagem e probabilidade ----------

def contagem8():
    a = bloco(1, 'Tenho 2 camisetas (branca e verde) e 2 bermudas (azul e preta). Quantas roupas diferentes posso montar? Circule.', item(
        pilha('branca + azul &nbsp; branca + preta', 'verde + azul &nbsp; verde + preta'), opcoes([4, 2])), 'Ligue cada camiseta com cada bermuda.') + bloco(
        2, 'Numa moeda, a chance de cara é 1/2 e a de coroa é 1/2. Quanto dá a soma das duas chances? Circule.', item(pilha('1/2 + 1/2'), opcoes([1, '1/4'])))
    b = bloco(1, 'Leia e resolva.', grade([
        problema('Uma senha tem 2 algarismos (de 0 a 9) e pode repetir. Quantas senhas existem?', '16mm'),
        problema('Na cantina há <b>3</b> pães, <b>4</b> recheios e <b>2</b> sucos. Quantos lanches diferentes?', '16mm')], 2), 'Multiplique as possibilidades de cada escolha.') + bloco(
        2, 'Dois dados são lançados. Complete o quadro das somas.', tabela(['+', '1', '2', '3', '4', '5', '6'], [['1', '2', '3', '4', '5', '6', '7'], ['2', '3', '', '', '', '', ''], ['3', '', '', '', '', '', ''], ['4', '', '', '', '', '', ''], ['5', '', '', '', '', '', ''], ['6', '', '', '', '', '', '']])) + bloco(
        3, 'Responda.', frases(['Quantos resultados há no total?', 'Probabilidade de a soma ser 7:', 'Probabilidade de a soma ser 12:']))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma placa tem <b>3</b> letras (de 26) e <b>4</b> algarismos. Quantas placas diferentes existem?', '18mm'),
        problema('Quantos números de 3 algarismos diferentes dá para formar com 1, 2, 3 e 4?', '18mm')], 2)) + bloco(
        2, 'Lance duas moedas.', frases(['Escreva o espaço amostral:', 'Probabilidade de duas caras:', 'Probabilidade de uma cara e uma coroa:', 'Soma das probabilidades de todos os resultados:']))
    return ficha(
        'contagem-e-probabilidade', 'Contagem e probabilidade com o princípio multiplicativo', '8º ano',
        'Resolver problemas de contagem com o princípio multiplicativo, montar o espaço amostral e calcular probabilidades, percebendo que todas somam 1.',
        ['EF08MA03', 'EF08MA22'], '40 a 50 minutos', 'Roupas de papel para combinar, moedas e dois dados de cores diferentes.',
        ['Combine roupas de papel na mesa: cada camiseta com cada bermuda.',
         'Mostre a árvore de possibilidades no quadro e conte os galhos.',
         'Na versão A, as combinações já estão escritas. O estudante conta.',
         'Na versão B, o quadro das somas dos dados organiza o espaço amostral.',
         'Na versão C, lance as moedas de verdade e compare com o calculado.'],
        ['Roupas de papel e dados de verdade antes da conta. Uma escolha por vez.',
         'A árvore e o quadro dão estrutura fixa à contagem. Use sempre a mesma ordem para listar.',
         'Lançar dados e moedas dá movimento. Registros curtos e rápidos.'],
        ['Bloco 1: 4. Bloco 2: 1.', 'Bloco 1: 100 senhas; 24 lanches. Bloco 2: quadro com as somas de 2 a 12. Bloco 3: 36; 6/36 = 1/6; 1/36.',
         f'Bloco 1: 26 × 26 × 26 × 10 × 10 × 10 × 10 = {n(175760000)}; 24. Bloco 2: cara-cara, cara-coroa, coroa-cara, coroa-coroa; 1/4; 2/4 = 1/2; 1.'],
        a, b, c)


# ---------- 3. porcentagem e dízimas ----------

def porcentagem_dizimas():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(pilha('10% de 200'), opcoes([20, 2], certa=20), exemplo=True),
        item(pilha('25% de 40'), opcoes([10, 4])),
        item(pilha('50% de 90'), opcoes([45, 9]))], 3), '10% é dividir por 10. 25% é dividir por 4. 50% é a metade.') + bloco(
        2, 'Divida 1 por 3 na calculadora. O 3 se repete sem parar? Circule.', item(pilha('1 ÷ 3 = 0,333...'), opcoes(['sim', 'não'])), 'Um número com algarismos que se repetem para sempre é uma dízima periódica.')
    b = bloco(1, 'Leia e resolva.', grade([
        problema(f'Uma TV de <b>R$ {n(2000)}</b> teve aumento de <b>12%</b>. Qual é o novo preço?', '16mm'),
        problema('Num grupo de <b>40</b> pessoas, <b>14</b> usam óculos. Qual é a porcentagem?', '16mm')], 2)) + bloco(
        2, 'Faça na calculadora e escreva a dízima.', grade([f'<p class="conta">2 ÷ 3 = {VAZIO}</p>', f'<p class="conta">5 ÷ 9 = {VAZIO}</p>', f'<p class="conta">1 ÷ 11 = {VAZIO}</p>'], 3)) + bloco(
        3, 'Descubra a fração.', grade([f'<p class="conta">0,111... = {VAZIO}</p>', f'<p class="conta">0,444... = {VAZIO}</p>', f'<p class="conta">0,777... = {VAZIO}</p>'], 3), 'Quando um algarismo se repete, a fração é esse algarismo sobre 9.')
    c = bloco(1, 'Use uma planilha ou a calculadora.', grade([
        problema(f'Um investimento de <b>R$ {n(1000)}</b> rende <b>1%</b> ao mês, juros sobre juros. Quanto terá depois de 3 meses?', '18mm'),
        problema('Um preço caiu de <b>R$ 250</b> para <b>R$ 210</b>. Qual foi a porcentagem de desconto?', '18mm')], 2)) + bloco(
        2, 'Ache a fração geratriz.', grade([f'<p class="conta">0,2727... = {VAZIO}</p>', f'<p class="conta">1,333... = {VAZIO}</p>', f'<p class="conta">0,1666... = {VAZIO}</p>'], 3)) + bloco(
        3, 'Mostre que 0,999... é igual a 1.', linhas(2))
    return ficha(
        'porcentagem-e-dizimas-periodicas', 'Porcentagem e dízimas periódicas', '8º ano',
        'Resolver problemas de porcentagem com calculadora e planilha, reconhecer dízimas periódicas e encontrar a fração geratriz.',
        ['EF08MA04', 'EF08MA05'], '40 a 50 minutos', 'Calculadora, planilha eletrônica e encartes de lojas.',
        ['Mostre na calculadora 1 ÷ 3 e 2 ÷ 3. O que acontece com os algarismos?',
         'Na planilha, monte uma coluna com um valor e outra com o valor mais 1% ao mês.',
         'Na versão A, as porcentagens são das mais simples, com dica de divisão.',
         'Na versão B, a calculadora mostra as dízimas e a regra do 9 vem pronta.',
         'Na versão C, use a planilha para o investimento.'],
        ['Encartes e calculadora dão sentido. Uma porcentagem por vez.',
         'A regra do 9 é um procedimento fixo e previsível. Avise que a calculadora corta a dízima no fim da tela.',
         'A planilha que calcula sozinha é um bom estímulo. Desafios rápidos de desconto.'],
        ['Bloco 1: 10; 45. Bloco 2: sim.', f'Bloco 1: R$ {n(2240)}; 35%. Bloco 2: 0,666...; 0,555...; 0,0909... Bloco 3: 1/9; 4/9; 7/9.',
         f'Bloco 1: R$ {n(1030)},30; 16%. Bloco 2: 27/99 = 3/11; 4/3; 1/6. Bloco 3: x = 0,999...; 10x = 9,999...; 10x − x = 9; x = 1.'],
        a, b, c)


# ---------- 4. expressões algébricas ----------

def expressoes():
    a = bloco(1, 'Troque a letra pelo número. Quanto dá? Circule.', grade([
        item(pilha('x + 5', 'com x = 2'), opcoes([7, 25], certa=7), exemplo=True),
        item(pilha('3 × x', 'com x = 4'), opcoes([12, 34])),
        item(pilha('x − 1', 'com x = 10'), opcoes([9, 11]))], 3), 'Escreva o número no lugar da letra e faça a conta.') + bloco(
        2, 'O lado do quadrado mede a. O perímetro é a + a + a + a. Com a = 5, quanto dá? Circule.', item(regular(4, 44, rot=-45), '<p class="legenda">cada lado mede a</p>' + opcoes([20, 25])))
    b = bloco(1, 'Calcule o valor numérico.', tabela(['Expressão', 'x = 1', 'x = 2', 'x = 5'], [['2x + 3', '5', '', ''], ['x² + 1', '', '', ''], ['10 − 3x', '', '', '']]), 'A primeira casa é o exemplo.') + bloco(
        2, 'Um táxi cobra R$ 5 fixos mais R$ 3 por quilômetro.', frases(['Expressão do preço para k quilômetros:', 'Preço para 8 km:', 'Com R$ 50, quantos km dá para andar?']))
    c = bloco(1, f'Calcule para a = {m(-2)} e b = 3.', grade([f'<p class="conta">a² + b² = {VAZIO}</p>', f'<p class="conta">3a − 2b = {VAZIO}</p>', f'<p class="conta">(a + b)² = {VAZIO}</p>', f'<p class="conta">a × b − b = {VAZIO}</p>'], 2)) + bloco(
        2, 'A área de um trapézio é (B + b) × h ÷ 2. Calcule para B = 10, b = 6 e h = 4.', linhas(1)) + bloco(
        3, 'Mostre que 2(x + 3) e 2x + 6 dão o mesmo valor.', tabela(['x', '2(x + 3)', '2x + 6'], [['0', '', ''], ['1', '', ''], ['5', '', '']]))
    return ficha(
        'expressoes-algebricas-e-valor-numerico', 'Expressões algébricas e valor numérico', '8º ano',
        'Calcular o valor numérico de expressões algébricas trocando letras por números, usar fórmulas do dia a dia e comparar expressões equivalentes.',
        ['EF08MA06'], '40 a 50 minutos', 'Cartões com letras e números para trocar, calculadora.',
        ['Escreva x + 5 no quadro e cubra o x com um cartão de número. Troque os cartões.',
         'Mostre fórmulas do dia a dia: preço do táxi, área, perímetro.',
         'Na versão A, troque a letra por um cartão de número de verdade.',
         'Na versão B, a tabela organiza as trocas.',
         'Na versão C, use parênteses ao trocar números negativos.'],
        ['Cartões de trocar deixam a substituição concreta. Uma letra por vez.',
         'Combine a rotina: escrever, trocar, calcular. A tabela dá previsibilidade.',
         'Trocar cartões rapidamente vira jogo. Contas curtas com conferência.'],
        ['Bloco 1: 12; 9. Bloco 2: 20.', 'Bloco 1: 7 e 13; 2, 5 e 26; 7, 4 e −5. Bloco 2: 5 + 3k; R$ 29; 15 km.',
         'Bloco 1: 13; −12; 1; −9. Bloco 2: 32. Bloco 3: 6, 6; 8, 8; 16, 16.'],
        a, b, c)


# ---------- 5. equações com duas incógnitas e sistemas ----------

def sistemas():
    a = bloco(1, 'A regra é x + y = 5. O par funciona? Circule.', grade([
        item(pilha('(2, 3)', '2 + 3'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(pilha('(1, 4)', '1 + 4'), opcoes(['sim', 'não'])),
        item(pilha('(4, 3)', '4 + 3'), opcoes(['sim', 'não']))], 3)) + bloco(
        2, 'Os pares que funcionam estão marcados no plano. Eles formam: Circule.', item(plano1(6, 6, 26, pontos={(0, 5): '', (1, 4): '', (2, 3): '', (3, 2): '', (4, 1): '', (5, 0): ''}), opcoes(['uma reta', 'um círculo'])))
    b = bloco(1, 'Complete a tabela de y = x + 1 e desenhe a reta.', tabela(['x', '0', '1', '2', '3'], [['y', '1', '', '', '']]) + item(plano1(5, 5, 28))) + bloco(
        2, 'Num estacionamento há carros e motos: 10 veículos e 32 rodas. Quantos carros e quantas motos?', problema('Use x para carros e y para motos: x + y = 10 e 4x + 2y = 32.', '18mm'))
    c = bloco(1, 'Resolva os sistemas.', grade([pilha('x + y = 12', 'x − y = 4'), pilha('2x + y = 11', 'x + y = 7')], 2) + linhas(1)) + bloco(
        2, 'Desenhe as retas x + y = 6 e y = x. Onde elas se cruzam?', item(plano1(6, 6, 24)) + linhas(1)) + bloco(
        3, 'Num show, o ingresso de adulto custa R$ 20 e o de criança, R$ 10. Venderam 50 ingressos e arrecadaram R$ 700. Quantos de cada?', linhas(1))
    return ficha(
        'equacoes-com-duas-incognitas-e-sistemas', 'Equações com duas incógnitas e sistemas', '8º ano',
        'Associar uma equação de 1º grau com duas incógnitas a uma reta no plano e resolver problemas com sistemas, inclusive pelo gráfico.',
        ['EF08MA07', 'EF08MA08'], '40 a 50 minutos', 'Malha quadriculada, régua, fichas de duas cores e um programa de gráficos, se possível.',
        ['Peça pares de números que somam 5. Marque todos no plano: formam uma reta.',
         'Mostre duas retas no mesmo plano: o ponto de encontro serve para as duas regras.',
         'Na versão A, o estudante confere se cada par funciona.',
         'Na versão B, a tabela ajuda a achar os pontos da reta.',
         'Na versão C, confira o sistema no gráfico.'],
        ['Fichas de duas cores representam x e y. Uma regra por vez.',
         'A tabela de valores é sempre o primeiro passo. Use cores diferentes para cada reta.',
         'Marcar pontos e ver a reta aparecer é rápido e visual. Problemas curtos.'],
        ['Bloco 1: sim; não. Bloco 2: uma reta.', 'Bloco 1: 2, 3, 4; reta que passa por (0, 1) e (3, 4). Bloco 2: 6 carros e 4 motos.',
         'Bloco 1: x = 8 e y = 4; x = 4 e y = 3. Bloco 2: no ponto (3, 3). Bloco 3: 20 adultos e 30 crianças.'],
        a, b, c)


# ---------- 6. equações do 2º grau do tipo ax² = b ----------

def segundo_grau():
    a = bloco(1, 'Qual é a medida do lado do quadrado? Circule.', grade([
        item(malha(3, 3, 24, pintadas=[(c, l) for c in range(3) for l in range(3)]), '<p class="legenda">área 9</p>' + opcoes([3, 9], certa=3), exemplo=True),
        item(malha(4, 4, 24, pintadas=[(c, l) for c in range(4) for l in range(4)]), '<p class="legenda">área 16</p>' + opcoes([4, 8]))], 2), 'O lado vezes o lado dá a área.') + bloco(
        2, 'Que número vezes ele mesmo dá 25? Circule.', item(pilha('? × ? = 25'), opcoes([5, 12])))
    b = bloco(1, 'Resolva.', grade([f'<p class="conta">x² = 49 &nbsp; x = {VAZIO}</p>', f'<p class="conta">x² = 100 &nbsp; x = {VAZIO}</p>',
                                    f'<p class="conta">2x² = 50 &nbsp; x = {VAZIO}</p>', f'<p class="conta">3x² = 27 &nbsp; x = {VAZIO}</p>'], 2), 'Há duas respostas: uma positiva e uma negativa.') + bloco(
        2, 'Leia e resolva.', grade([
            problema('Um terreno quadrado tem <b>144 m²</b>. Quanto mede o lado?', '16mm'),
            problema('O dobro da área de um quadrado é <b>72 cm²</b>. Quanto mede o lado?', '16mm')], 2))
    c = bloco(1, 'Resolva.', grade([f'<p class="conta">5x² = 80</p>', f'<p class="conta">x² − 81 = 0</p>', f'<p class="conta">4x² = 1</p>', f'<p class="conta">x² ÷ 2 = 18</p>'], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Uma pedra cai <b>d = 5t²</b> metros em t segundos. Em quanto tempo ela cai <b>45 m</b>?', '16mm'),
            problema('Com a calculadora, resolva <b>x² = 50</b> com duas casas decimais.', '16mm')], 2)) + bloco(
        3, f'Por que x² = {m(-4)} não tem solução entre os números que conhecemos?', linhas(1))
    return ficha(
        'equacoes-do-segundo-grau-ax2-b', 'Equações do 2º grau do tipo ax² = b', '8º ano',
        'Resolver equações do tipo ax² = b com a ideia de área do quadrado e raiz quadrada, com e sem calculadora.',
        ['EF08MA09'], '40 a 50 minutos', 'Quadradinhos de montar, malha quadriculada e calculadora.',
        ['Monte quadrados com 9, 16 e 25 quadradinhos. Qual é o lado de cada um?',
         'Mostre que (−3) × (−3) também dá 9: por isso há duas respostas.',
         'Na versão A, o estudante conta o lado do quadrado montado.',
         'Na versão B, primeiro divida pelo número da frente, depois tire a raiz.',
         'Na versão C, use a calculadora para raízes não exatas.'],
        ['Quadradinhos de montar dão sentido ao x². Uma equação por vez.',
         'Siga sempre a mesma ordem: isolar o x², depois a raiz. Lembre das duas respostas com um cartão fixo.',
         'Montar quadrados é rápido. Desafios de "qual número ao quadrado dá...".'],
        ['Bloco 1: 4. Bloco 2: 5.', 'Bloco 1: 7 ou −7; 10 ou −10; 5 ou −5; 3 ou −3. Bloco 2: 12 m; 6 cm.',
         'Bloco 1: 4 ou −4; 9 ou −9; 1/2 ou −1/2; 6 ou −6. Bloco 2: 3 segundos; 7,07 ou −7,07. Bloco 3: nenhum número vezes ele mesmo dá negativo.'],
        a, b, c)


# ---------- 7. sequências e fluxogramas ----------

def sequencias8():
    a = bloco(1, 'Os quadrados de bolinhas crescem assim. Quantas bolinhas terá o próximo? Circule.', item(matriz(1, 1, 18) + matriz(2, 2, 18) + matriz(3, 3, 18), opcoes([16, 12])), 'Conte o lado: 1, 2, 3... O próximo tem lado 4.') + bloco(
        2, 'Siga o fluxograma. Que número sai no fim? Circule.', item(fluxo_linear(['Comece com 1', 'Some 3', 'Some 3', 'Some 3']), opcoes([10, 7])))
    b = bloco(1, 'Sequência 5, 8, 11, 14, ...', frases(['Os dois próximos termos:', 'Termo da posição n:', 'Termo da posição 20:'])) + bloco(
        2, 'Complete o fluxograma que gera a sequência 2, 4, 8, 16, ... (cada termo é o dobro do anterior).', item(fluxo_vazio(4)))
    c = bloco(1, 'Números triangulares: 1, 3, 6, 10, ...', item(bolinhas_seq(r=11)) + frases(['Próximo termo:', 'Regra recursiva (como sai um termo do anterior):', 'Termo da posição 10:'])) + bloco(
        2, 'A sequência 1, 1, 2, 3, 5, 8, ... soma os dois anteriores. Faça um fluxograma que mostre os 10 primeiros termos.', caixa_desenho('46mm')) + bloco(
        3, 'Diga se é recursiva ou não e escreva a regra: 3, 7, 11, 15, ... e 1, 3, 9, 27, ...', linhas(2))
    return ficha(
        'sequencias-e-fluxogramas', 'Sequências e fluxogramas', '8º ano',
        'Identificar a regularidade de sequências numéricas e de figuras, recursivas ou não, e construir fluxogramas que geram os próximos termos.',
        ['EF08MA10', 'EF08MA11'], '40 a 50 minutos', 'Tampinhas para montar as figuras, cartões de fluxograma e planilha eletrônica.',
        ['Monte com tampinhas os quadrados 1, 4, 9. Qual é o próximo?',
         'Monte um fluxograma com cartões que soma 3 a cada volta.',
         'Na versão A, o fluxograma está pronto. O estudante segue com o dedo.',
         'Na versão B, separe as duas perguntas: o próximo termo e o termo da posição n.',
         'Na versão C, a planilha pode gerar a sequência sozinha com uma fórmula.'],
        ['Tampinhas deixam a sequência concreta. Uma figura por vez.',
         'O fluxograma deixa a regra sempre igual e visível. Use as mesmas formas de cartão.',
         'Montar figuras com tampinhas e prever a próxima vira desafio rápido.'],
        ['Bloco 1: 16. Bloco 2: 10.', 'Bloco 1: 17 e 20; 3n + 2; 62. Bloco 2: início, comece com 2, multiplique por 2, repita, fim.',
         'Bloco 1: 15; some a posição ao termo anterior; 55. Bloco 2: fluxograma com a soma dos dois anteriores e um contador até 10. Bloco 3: não recursiva, 4n − 1 (ou some 4); recursiva, multiplique por 3.'],
        a, b, c)


# ---------- 8. grandezas proporcionais e não proporcionais ----------

def variacao():
    a = bloco(1, 'Quando um dobra, o outro também dobra? Circule.', grade([
        item(pilha('1 kg de arroz: R$ 6', '2 kg de arroz: R$ 12'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(pilha('5 anos: 110 cm de altura', '10 anos: 140 cm de altura'), opcoes(['sim', 'não']))], 2), 'Idade e altura crescem juntas, mas não dobram juntas.') + bloco(
        2, 'Preço de chocolates: 1 custa R$ 2, 2 custam R$ 4, 3 custam R$ 6. Os pontos ficam numa reta? Circule.', item(plano1(4, 6, 28, pontos={(1, 2): '', (2, 4): '', (3, 6): ''}), opcoes(['sim', 'não'])))
    b = bloco(1, 'Escreva D (diretamente proporcional), I (inversamente) ou N (não proporcional).', frases(['Quantidade de pães e preço:', 'Velocidade e tempo de viagem:', 'Idade e altura de uma pessoa:', 'Número de pintores e tempo para pintar uma casa:'])) + bloco(
        2, 'Cada caderno custa R$ 4.', tabela(['Cadernos (x)', '1', '2', '3', '4'], [['Preço (p)', '4', '', '', '']]) + frases(['Sentença:'])) + bloco(
        3, 'Seis operários fazem um muro em 10 dias. Quatro operários fazem em quantos dias?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Um carro gasta <b>8 litros</b> em <b>100 km</b>. Quanto gasta em <b>350 km</b>?', '16mm'),
        problema('A conta de água tem taxa fixa de <b>R$ 20</b> mais <b>R$ 5</b> por m³. É proporcional? Escreva a sentença.', '16mm')], 2)) + bloco(
        2, 'Faça o gráfico de y = 12 ÷ x para x = 1, 2, 3, 4, 6 e 12. Que tipo de proporção é?', item(plano1(12, 12, 15)) + linhas(1))
    return ficha(
        'grandezas-proporcionais-e-nao-proporcionais', 'Grandezas proporcionais e não proporcionais', '8º ano',
        'Identificar se duas grandezas são direta ou inversamente proporcionais ou não proporcionais, escrever a sentença e representar no plano cartesiano.',
        ['EF08MA12', 'EF08MA13'], '40 a 50 minutos', 'Encartes de mercado, malha quadriculada e planilha eletrônica.',
        ['Pergunte: se dobro o arroz, dobra o preço? Se dobro a idade, dobra a altura?',
         'Marque os pontos de preço por quantidade no plano: formam uma reta que sai do zero.',
         'Na versão A, a pergunta "dobrou um, dobrou o outro?" é a chave.',
         'Na versão B, a tabela leva à sentença.',
         'Na versão C, compare no gráfico a reta (direta) e a curva (inversa).'],
        ['Situações concretas de mercado. Uma relação por vez.',
         'Pergunta fixa "dobrou um, dobrou o outro?". Avise que existe um terceiro tipo, o não proporcional.',
         'Marcar pontos e ver a forma do gráfico aparecer é rápido e visual.'],
        ['Bloco 1: não. Bloco 2: sim.', 'Bloco 1: D; I; N; I. Bloco 2: 8, 12, 16; p = 4x. Bloco 3: 15 dias.',
         'Bloco 1: 28 litros; não é proporcional, c = 20 + 5m. Bloco 2: pontos (1, 12), (2, 6), (3, 4), (4, 3), (6, 2), (12, 1), uma curva; inversamente proporcional.'],
        a, b, c)


# ---------- 9. congruência de triângulos ----------

def congruencia():
    a = bloco(1, 'Os dois triângulos são iguais (congruentes)? Recorte um e coloque em cima do outro. Circule.', grade([
        item(dois_triangulos(True), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(dois_triangulos(False), opcoes(['sim', 'não']))], 2), 'Girar não muda a forma nem o tamanho.') + bloco(
        2, 'A diagonal divide o retângulo em dois triângulos iguais? Circule.', item(ret_diagonal(5, 3, 30), opcoes(['sim', 'não'])), 'Recorte na diagonal e compare.')
    b = bloco(1, 'Estas informações garantem triângulos congruentes? Escreva sim ou não.', frases(['LLL (os três lados iguais):', 'LAL (dois lados e o ângulo entre eles):', 'AAA (os três ângulos iguais):'])) + bloco(
        2, 'No paralelogramo ABCD, a diagonal AC forma os triângulos ABC e CDA.', item(paralelogramo_diag()) + frases(['Quais lados são iguais?', 'Por qual caso os triângulos são congruentes?', 'O que isso mostra sobre os lados opostos?']))
    c = bloco(1, 'Demonstre que as diagonais de um retângulo têm a mesma medida. Use triângulos congruentes.', caixa_desenho('40mm') + linhas(3)) + bloco(
        2, 'Num losango, as diagonais se cruzam formando ângulos retos. Explique usando congruência de triângulos.', caixa_desenho('34mm') + linhas(2))
    return ficha(
        'congruencia-de-triangulos-e-quadrilateros', 'Congruência de triângulos e quadriláteros', '8º ano',
        'Reconhecer triângulos congruentes pelos casos LLL, LAL e ALA e usar essa ideia para demonstrar propriedades de paralelogramos, retângulos e losangos.',
        ['EF08MA14'], '40 a 50 minutos', 'Triângulos e quadriláteros de papel, tesoura, régua, transferidor.',
        ['Recorte dois triângulos iguais, gire um e coloque sobre o outro.',
         'Recorte um paralelogramo pela diagonal: os dois triângulos se encaixam.',
         'Na versão A, o recorte é o apoio principal.',
         'Na versão B, marque com a mesma cor os lados iguais.',
         'Na versão C, escreva a demonstração em passos numerados.'],
        ['Recortar e sobrepor mostra a congruência sem fórmula. Um caso por vez.',
         'Marcas fixas (um traço, dois traços) para lados iguais dão previsibilidade. Demonstração em passos curtos.',
         'Recortar e encaixar dá movimento. Use cores para os lados iguais.'],
        ['Bloco 1: não. Bloco 2: sim.', 'Bloco 1: sim; sim; não (os triângulos podem ter tamanhos diferentes). Bloco 2: AB = CD, BC = DA e AC é comum; LLL (ou ALA); os lados opostos são iguais.',
         'Bloco 1: os triângulos formados por dois lados e uma diagonal são congruentes por LAL (lados iguais e ângulo reto), então as diagonais são iguais. Bloco 2: os quatro triângulos têm os mesmos três lados (LLL); os ângulos no centro são iguais e somam 360°, então cada um mede 90°.'],
        a, b, c)


# ---------- 10. mediatriz, bissetriz e hexágono ----------

def construcoes():
    a = bloco(1, 'Dobre o papel para o A cair sobre o B. A dobra é a mediatriz. O ponto P na dobra está à mesma distância de A e de B? Circule.', item(segmento(True), opcoes(['sim', 'não'])), 'Meça com uma tira de papel.') + bloco(
        2, 'Dobre o ângulo ao meio. A dobra é a bissetriz. Cada metade de um ângulo de 60° mede: Circule.', item(angulo2(60, 120, mostrar=True), opcoes(['30°', '60°'])))
    b = bloco(1, 'Com régua e compasso, construa a mediatriz do segmento AB.', item(segmento()), 'Abra o compasso mais que a metade. Faça arcos a partir de A e de B. Ligue os cruzamentos.') + bloco(
        2, 'Construa a bissetriz do ângulo.', item(angulo2(70, 150))) + bloco(
        3, 'Com o compasso, construa um ângulo de 60° e depois um de 30°.', caixa_desenho('34mm'))
    c = bloco(1, 'Escreva o algoritmo para construir um hexágono regular com compasso (o ângulo central mede 60°). Depois faça o fluxograma.', linhas(3) + caixa_desenho('34mm')) + bloco(
        2, 'Três casas A, B e C. Onde fazer um poço à mesma distância das três? Explique com mediatrizes.', item(tres_casas()) + linhas(2)) + bloco(
        3, 'Como construir um ângulo de 45° com compasso?', linhas(1))
    return ficha(
        'mediatriz-bissetriz-e-hexagono-regular', 'Mediatriz, bissetriz e hexágono regular', '8º ano',
        'Construir mediatriz, bissetriz, ângulos de 90°, 60°, 45° e 30° e o hexágono regular, e usar mediatriz e bissetriz para resolver problemas de distância.',
        ['EF08MA15', 'EF08MA16', 'EF08MA17'], '40 a 50 minutos', 'Papel para dobrar, compasso, régua, esquadros e, se possível, um programa de geometria dinâmica.',
        ['Dobre um papel com dois pontos marcados até um ficar sobre o outro: a dobra é a mediatriz.',
         'Dobre um ângulo ao meio: a dobra é a bissetriz.',
         'Na versão A, as dobras de papel são o apoio principal.',
         'Na versão B, siga os passos do compasso em voz alta, um de cada vez.',
         'Na versão C, peça que um colega siga o algoritmo do hexágono.'],
        ['Dobrar papel mostra a mediatriz e a bissetriz sem compasso. Uma construção por vez.',
         'Os passos numerados do compasso são sempre os mesmos. Risque cada passo ao terminar.',
         'Dobrar e construir dá movimento. O hexágono feito com compasso é rápido e bonito.'],
        ['Bloco 1: sim. Bloco 2: 30°.', 'Bloco 1, 2 e 3: construções com compasso (60° com o triângulo equilátero e 30° com a bissetriz).',
         'Bloco 1: trace a circunferência; com a mesma abertura, marque 6 pontos seguidos na circunferência; ligue os pontos. Bloco 2: no encontro das mediatrizes de AB, BC e AC. Bloco 3: construa um ângulo reto (mediatriz) e trace a bissetriz.'],
        a, b, c)


# ---------- 11. composição de transformações ----------

def composicao():
    a = bloco(1, 'Escorregue a figura 4 quadradinhos para a direita. Pinte onde ela fica.', item(malha(8, 3, 28, pintadas=[(0, 0), (0, 1), (0, 2), (1, 2)])), 'Conte 4 quadradinhos a partir de cada parte pintada.') + bloco(
        2, 'Agora espelhe a figura do lado esquerdo na linha tracejada. Pinte.', item(malha_eixo(8, 3, [(1, 0), (1, 1), (1, 2), (2, 2)], 4, 28)), 'O espelho fica na linha. A mesma distância dos dois lados.')
    b = bloco(1, f'Faça a translação de 4 para a direita e depois a reflexão no eixo y. Escreva os vértices finais.', item(plano4(4, 22, figuras=[[(-4, 1), (-2, 1), (-4, 3)]])) + frases(['Depois da translação:', 'Depois da reflexão:'])) + bloco(
        2, 'Uma rotação de meia volta em torno da origem é igual a duas reflexões. Quais?', linhas(1))
    c = bloco(1, 'Crie um azulejo: desenhe um motivo num canto, gire 1/4 de volta três vezes e depois repita o bloco com translação.', item(malha(12, 8, 22))) + bloco(
        2, 'Duas reflexões seguidas em retas paralelas equivalem a qual movimento? E em retas que se cruzam?', linhas(2))
    return ficha(
        'composicao-de-transformacoes', 'Composição de transformações', '8º ano',
        'Construir figuras com uma transformação seguida de outra (translação, reflexão e rotação) e reconhecer composições em azulejos e padrões.',
        ['EF08MA18'], '40 a 50 minutos', 'Figuras recortadas, papel vegetal, espelho, malha quadriculada e, se possível, um programa de geometria dinâmica.',
        ['Com uma figura recortada, faça dois movimentos em sequência sobre a mesa.',
         'Mostre azulejos: um motivo que gira e depois se repete.',
         'Na versão A, um movimento por bloco, com a figura recortada na mão.',
         'Na versão B, anote os vértices depois de cada movimento.',
         'Na versão C, o azulejo pode virar um painel da turma.'],
        ['Figura recortada para mover com a mão. Um movimento de cada vez, nunca os dois juntos.',
         'Escreva a ordem dos movimentos numa tira e risque cada um ao terminar.',
         'Mover a figura e criar o azulejo dá movimento. Pintar é uma boa recompensa.'],
        ['Bloco 1: a figura nas colunas 5 e 6. Bloco 2: a figura espelhada do outro lado.', 'Bloco 1: (0, 1), (2, 1), (0, 3); depois (0, 1), (−2, 1), (0, 3). Bloco 2: no eixo x e no eixo y.',
         'Bloco 1: criação própria. Bloco 2: translação; rotação.'],
        a, b, c)


# ---------- 12. áreas, círculo e capacidade ----------

def areas_capacidade():
    a = bloco(1, 'Num cubo de 10 cm de lado cabe 1 litro. Quantos litros cabem em 3 cubos assim? Circule.', item(empilhado(3, 1, 1, 34), opcoes([3, 30])), 'Cada cubo é 1 litro.') + bloco(
        2, 'A área do retângulo é base × altura. Quanto dá? Circule.', item(malha(5, 3, 28) + pilha('5 × 3'), opcoes([15, 8])), 'Conte os quadradinhos para conferir.')
    b = bloco(1, 'Calcule a área. Use π ≈ 3,14.', grade([item(circulo_raio(), f'<p class="du">{VAZIO} cm²</p>'), item(figura_medida('trapezio'), f'<p class="du">{VAZIO} cm²</p>'), item(losango_med(), f'<p class="du">{VAZIO} cm²</p>')], 3)) + bloco(
        2, 'Leia e resolva. Lembre: 1 dm³ = 1 litro e 1 m³ = 1 000 litros.', grade([
            problema('Uma caixa-d’água tem <b>2 m</b> por <b>1 m</b> por <b>1 m</b>. Quantos litros cabem?', '16mm'),
            problema('Um aquário tem <b>40 cm</b> por <b>25 cm</b> por <b>30 cm</b>. Quantos litros cabem?', '16mm')], 2))
    c = bloco(1, 'Um terreno é formado por um retângulo de 20 m por 12 m e um semicírculo de 12 m de diâmetro encostado num dos lados de 12 m. Qual é a área? (π ≈ 3,14)', problema('', '22mm')) + bloco(
        2, 'Uma piscina tem 10 m por 5 m por 1,6 m.', frases(['Volume em m³:', 'Capacidade em litros:', 'Com uma mangueira de 20 litros por minuto, em quanto tempo enche?'])) + bloco(
        3, 'Quantos litros cabem em 1 m³? Explique por quê.', linhas(1))
    return ficha(
        'areas-circulo-e-capacidade', 'Áreas, círculo e capacidade', '8º ano',
        'Calcular áreas de quadriláteros, triângulos e círculos em terrenos e figuras, relacionar litro com dm³ e m³ e calcular a capacidade de recipientes.',
        ['EF08MA19', 'EF08MA20', 'EF08MA21'], '40 a 50 minutos', 'Cubo de 10 cm de papelão, garrafa de 1 litro, régua, trena e calculadora.',
        ['Monte um cubo de 10 cm de lado e encha com 1 litro de areia ou arroz.',
         'Meça o chão da sala com a trena e calcule a área.',
         'Na versão A, o cubo de papelão de 1 litro é o apoio principal.',
         'Na versão B, deixe as expressões de área num cartão.',
         'Na versão C, use a calculadora para as contas com π.'],
        ['O cubo de 1 litro e a garrafa deixam a relação concreta. Uma unidade por vez.',
         'Cartão fixo com as expressões de área e as relações de unidade. Avise quando muda de cm para m.',
         'Medir a sala e encher o cubo dá movimento. Problemas curtos.'],
        ['Bloco 1: 3. Bloco 2: 15.', f'Bloco 1: 28,26 cm²; 15 cm²; 24 cm². Bloco 2: {n(2000)} litros; 30 litros.',
         f'Bloco 1: 240 + 56,52 = 296,52 m². Bloco 2: 80 m³; {n(80000)} litros; {n(4000)} minutos (66 horas e 40 minutos). Bloco 3: {n(1000)}, porque 1 m³ tem 10 × 10 × 10 = {n(1000)} cubos de 1 dm³.'],
        a, b, c)


# ---------- 13. pesquisa amostral, gráficos e medidas ----------

def estatistica8():
    a = bloco(1, 'Notas da turma: 5, 7, 7, 8, 9. Qual nota aparece mais vezes (moda)? Circule.', item(pilha('5 &nbsp; 7 &nbsp; 7 &nbsp; 8 &nbsp; 9'), opcoes([7, 9]))) + bloco(
        2, 'Coloque em ordem: 9, 3, 5. O número do meio é a mediana. Circule.', item(pilha('3 &nbsp; ? &nbsp; 9'), opcoes([5, 9]))) + bloco(
        3, 'Para mostrar partes de um todo, qual gráfico é melhor? Circule.', item(setores([('sim', 50, 'verde'), ('não', 50, 'rosa')], 80) + grafico_barras(['seg', 'ter', 'qua'], [2, 4, 3], 4, celula=18), opcoes(['setores', 'barras'])))
    b = bloco(1, 'Alturas (cm) de 10 estudantes: 150, 152, 155, 158, 160, 161, 163, 165, 168, 170. Complete as classes.', tabela(['Classe (cm)', 'Frequência'], [['150 a 154', '2'], ['155 a 159', ''], ['160 a 164', ''], ['165 a 170', '']])) + bloco(
        2, 'Calcule.', frases(['Média:', 'Mediana:', 'Amplitude:'])) + bloco(
        3, 'Que gráfico usar?', frases(['Temperatura ao longo do mês:', 'Votos para representante de turma:', 'Partes do orçamento de uma família:']))
    c = bloco(1, 'Por que fazer uma pesquisa com uma amostra e não com todos? Dê uma razão física, uma econômica e uma ética.', linhas(3)) + bloco(
        2, 'Qual é o tipo de amostra?', frases(['Sortear 50 nomes da lista da escola:', 'Pegar um a cada 10 nomes da lista:', 'Escolher alguns de cada turma, proporcional ao tamanho:'])) + bloco(
        3, 'Planeje uma pesquisa amostral: tema, como escolher a amostra, que gráfico usar e que medidas calcular (média, moda, mediana, amplitude).', linhas(4))
    return ficha(
        'pesquisa-amostral-graficos-e-medidas', 'Pesquisa amostral, gráficos e medidas', '8º ano',
        'Escolher o gráfico adequado, organizar dados em classes, calcular média, moda, mediana e amplitude e planejar pesquisas com diferentes tipos de amostra.',
        ['EF08MA23', 'EF08MA24', 'EF08MA25', 'EF08MA26', 'EF08MA27'], '40 a 50 minutos', 'Fita métrica, planilha eletrônica, gráficos recortados de jornais e lista de nomes para sorteio.',
        ['Meça a altura de alguns estudantes e organize os dados no quadro.',
         'Mostre três gráficos (setores, barras, linha) com o mesmo tema. Qual mostra melhor?',
         'Na versão A, os dados já estão em ordem ou quase.',
         'Na versão B, monte as classes juntos, contando um dado por vez.',
         'Na versão C, a pesquisa pode ser feita de verdade com a planilha.'],
        ['Dados da própria turma dão sentido. Uma medida por vez, com a palavra escrita (moda, mediana).',
         'Siga sempre a ordem: organizar, contar, calcular. Um cartão com o significado de cada medida.',
         'Medir colegas e montar gráficos dá movimento. Tarefas curtas com pausa.'],
        ['Bloco 1: 7. Bloco 2: 5. Bloco 3: setores.', 'Bloco 1: 2; 3; 3. Bloco 2: 160,2 cm; 160,5 cm; 20 cm. Bloco 3: linha; barras; setores.',
         'Bloco 1: por exemplo, impossível medir todos (física), custo e tempo (econômica), não destruir ou incomodar todos (ética). Bloco 2: casual simples; sistemática; estratificada. Bloco 3: planejamento próprio.'],
        a, b, c)


FICHAS = [potencias, contagem8, porcentagem_dizimas, expressoes, sistemas, segundo_grau, sequencias8, variacao,
          congruencia, construcoes, composicao, areas_capacidade, estatistica8]
