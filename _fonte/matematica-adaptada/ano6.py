"""Fichas do 6º ano."""
import math

from base import ficha
from desenhos import CLARO, TRACO, dinheiro, figura, grupo, reta, svg
from desenhos2 import barra_fracao, grafico_barras, malha, pizza_fracao, poligono_svg, pote, regular, solido
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, matriz, opcoes, problema, produto, resposta, seq_numeros, tabela
from ano3 import frases
from ano4 import n, reta_fracao, malha_coord
from ano5 import empilhado

F = 'font-family="Lexend, sans-serif"'
E = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"'


# ---------- desenhos do 6º ano ----------

def angulo2(graus, tam=120, rotulo=None, mostrar=False):
    """Ângulo com vértice embaixo; funciona também para ângulos obtusos."""
    obtuso = graus > 90
    cx, cy = (tam * .45 if obtuso else 14), tam - 14
    a = math.radians(graus)
    L = tam - 30 if not obtuso else min(tam - 30, (cx - 6) / abs(math.cos(a)))
    x2, y2 = cx + L * math.cos(a), cy - L * math.sin(a)
    inner = f'<path d="M{cx} {cy} H{tam - 4}" stroke="{TRACO}" stroke-width="2.5"/><path d="M{cx} {cy} L{x2:.1f} {y2:.1f}" stroke="{TRACO}" stroke-width="2.5"/>'
    if graus == 90:
        inner += f'<path d="M{cx} {cy - 16} h16 v16" fill="none" stroke="{TRACO}" stroke-width="1.8"/>'
    else:
        r = 22
        inner += f'<path d="M{cx + r} {cy} A{r} {r} 0 0 0 {cx + r * math.cos(a):.1f} {cy - r * math.sin(a):.1f}" fill="none" stroke="{TRACO}" stroke-width="1.8"/>'
    if mostrar:
        inner += f'<text x="{cx + 28}" y="{cy - 8}" {F} font-size="13">{graus}°</text>'
    return svg(tam, tam, inner, 'angulo', rotulo or f'ângulo de {graus} graus')


def transferidor(graus, tam=250, rotulo=None):
    """Transferidor com um ângulo marcado a partir do 0 da direita."""
    cx, cy, r = tam / 2, tam / 2 + 6, tam / 2 - 8
    inner = f'<path d="M{cx - r} {cy} A{r} {r} 0 0 1 {cx + r} {cy}z" fill="#fff" {E}/>'
    for g in range(0, 181, 10):
        a = math.radians(g)
        comp = 12 if g % 30 == 0 else 7
        x1, y1 = cx + r * math.cos(a), cy - r * math.sin(a)
        x2, y2 = cx + (r - comp) * math.cos(a), cy - (r - comp) * math.sin(a)
        inner += f'<path d="M{x1:.1f} {y1:.1f} L{x2:.1f} {y2:.1f}" stroke="{TRACO}" stroke-width="1.4"/>'
        if g % 30 == 0:
            inner += f'<text x="{cx + (r - 24) * math.cos(a):.1f}" y="{cy - (r - 24) * math.sin(a) + 4:.1f}" text-anchor="middle" {F} font-size="11">{g}</text>'
    a = math.radians(graus)
    inner += (f'<path d="M{cx} {cy} H{cx + r + 4}" stroke="{TRACO}" stroke-width="3"/>'
              f'<path d="M{cx} {cy} L{cx + (r + 4) * math.cos(a):.1f} {cy - (r + 4) * math.sin(a):.1f}" stroke="{TRACO}" stroke-width="3"/>'
              f'<circle cx="{cx}" cy="{cy}" r="4" fill="{TRACO}"/>')
    return svg(tam, tam / 2 + 14, inner, 'transferidor', rotulo or 'transferidor com um ângulo marcado')


def retas(tipo, w=170, h=100):
    t = f'stroke="{TRACO}" stroke-width="3" stroke-linecap="round"'
    if tipo == 'paralelas':
        inner = f'<path d="M8 30 L{w - 8} 12" {t}/><path d="M8 82 L{w - 8} 64" {t}/>'
    elif tipo == 'concorrentes':
        inner = f'<path d="M8 20 L{w - 8} 82" {t}/><path d="M8 88 L{w - 8} 26" {t}/>'
    else:
        inner = (f'<path d="M8 {h / 2} H{w - 8}" {t}/><path d="M{w / 2} 6 V{h - 6}" {t}/>'
                 f'<path d="M{w / 2} {h / 2 - 14} h14 v14" fill="none" stroke="{TRACO}" stroke-width="1.8"/>')
    return svg(w, h, inner, 'retas', f'retas {tipo}')


def fluxo_par():
    caixa = lambda x, y, w, h, txt, f='#fff': (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="{f}" {E}/>'
                                                 f'<text x="{x + w / 2}" y="{y + h / 2 + 5}" text-anchor="middle" {F} font-size="13">{txt}</text>')
    seta = lambda x1, y1, x2, y2: (f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{TRACO}" stroke-width="2"/>'
                                    f'<path d="M{x2} {y2} l-5 -8 M{x2} {y2} l5 -8" stroke="{TRACO}" stroke-width="2"/>' if x1 == x2 else
                                    f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{TRACO}" stroke-width="2"/><path d="M{x2} {y2} l-8 -5 M{x2} {y2} l-8 5" stroke="{TRACO}" stroke-width="2"/>')
    inner = (f'<ellipse cx="110" cy="20" rx="56" ry="16" fill="{CLARO["verde"]}" {E}/><text x="110" y="25" text-anchor="middle" {F} font-size="13">Início</text>'
             + seta(110, 36, 110, 56) + caixa(30, 56, 160, 34, 'Pense num número') + seta(110, 90, 110, 110)
             + f'<polygon points="110,110 200,160 110,210 20,160" fill="{CLARO["amarelo"]}" {E}/>'
             f'<text x="110" y="154" text-anchor="middle" {F} font-size="11">Termina em</text><text x="110" y="170" text-anchor="middle" {F} font-size="11">0, 2, 4, 6 ou 8?</text>'
             + seta(110, 210, 110, 236) + f'<text x="118" y="228" {F} font-size="12" font-weight="600">sim</text>' + caixa(50, 236, 120, 32, 'É par')
             + seta(200, 160, 236, 160) + f'<text x="206" y="152" {F} font-size="12" font-weight="600">não</text>' + caixa(236, 144, 96, 32, 'É ímpar'))
    return svg(336, 272, inner, 'fluxograma', 'fluxograma: pense num número; se termina em 0, 2, 4, 6 ou 8, é par; se não, é ímpar')


def fluxo_vazio(n_caixas=4):
    inner = ''
    for i in range(n_caixas):
        y = 4 + i * 56
        inner += f'<rect x="4" y="{y}" width="300" height="36" rx="6" fill="#fff" {E}/>'
        if i < n_caixas - 1:
            inner += f'<path d="M154 {y + 36} V{y + 54}" stroke="{TRACO}" stroke-width="2"/><path d="M154 {y + 54} l-5 -8 M154 {y + 54} l5 -8" stroke="{TRACO}" stroke-width="2"/>'
    return svg(308, n_caixas * 56 - 12, inner, 'fluxograma', f'fluxograma com {n_caixas} caixas vazias')


def planta(comodos, colunas, linhas_, cel=34, rotulo='planta baixa de uma casa'):
    """comodos: (col, lin, largura, altura, nome)."""
    inner = ''
    for i in range(colunas + 1):
        inner += f'<path d="M{2 + i * cel} 2 V{2 + linhas_ * cel}" stroke="#d4d4cf" stroke-width="1"/>'
    for j in range(linhas_ + 1):
        inner += f'<path d="M2 {2 + j * cel} H{2 + colunas * cel}" stroke="#d4d4cf" stroke-width="1"/>'
    for c, l, w, h, nome in comodos:
        inner += (f'<rect x="{2 + c * cel}" y="{2 + l * cel}" width="{w * cel}" height="{h * cel}" fill="none" stroke="{TRACO}" stroke-width="3"/>'
                  f'<text x="{2 + (c + w / 2) * cel}" y="{2 + (l + h / 2) * cel + 5}" text-anchor="middle" {F} font-size="13" font-weight="600">{nome}</text>')
    return svg(colunas * cel + 4, linhas_ * cel + 4, inner, 'planta', rotulo)


CASA = [(0, 0, 5, 4, 'sala'), (5, 0, 3, 3, 'quarto'), (0, 4, 3, 2, 'cozinha'), (3, 4, 2, 2, 'banheiro')]


# ---------- 1. números, sistemas de numeração e arredondamento ----------

def numeros_sistemas():
    a = bloco(1, 'Qual é o maior? Circule.', grade([
        item('<p class="legenda">R$ 3,70 ou R$ 3,07</p>', opcoes(['3,7', '3,07'], certa='3,7'), exemplo=True),
        item('<p class="legenda">R$ 0,90 ou R$ 0,15</p>', opcoes(['0,15', '0,9'])),
        item('<p class="legenda">R$ 12,50 ou R$ 12,45</p>', opcoes(['12,5', '12,45'])),
    ], 3), 'Pense em dinheiro.') + bloco(2, 'O 47 está mais perto do 40 ou do 50? Circule.', item(reta(40, 50, 560, destaque=(47,)), opcoes([40, 50]))) + bloco(
        3, 'No sistema romano, X vale 10 e I vale 1. Quanto vale XII? Circule.', opcoes([12, 3]))
    b = bloco(1, 'Escreva do menor para o maior: 4,08 &nbsp; 4,8 &nbsp; 4,18 &nbsp; 4,801', seq_numeros([None] * 4)) + bloco(
        2, 'Quanto vale o algarismo 7 em cada número?', tabela(['Número', 'Valor do 7'], [[n(7052), n(7000)], ['3,75', ''], ['170', ''], ['0,07', '']]), 'A primeira linha é o exemplo.') + bloco(
        3, 'Escreva em algarismos romanos.', tabela(['Número', 'Romano'], [['15', 'XV'], ['24', ''], ['60', '']]), 'I = 1, V = 5, X = 10, L = 50, C = 100.') + bloco(
        4, 'Arredonde.', frases([f'{n(3847)} para a centena mais próxima:', f'{n(3847)} para o milhar mais próximo:', f'{n(128450)} para a dezena de milhar mais próxima:']))
    c = bloco(1, 'Compare o sistema romano com o nosso sistema decimal.', tabela(['', 'Romano', 'Decimal'], [
        ['Tem o zero?', '', ''], ['A posição muda o valor do símbolo?', '', ''], ['Quantos símbolos usa?', '', '']])) + bloco(
        2, 'Estime arredondando e depois confira na calculadora.', tabela(['Conta', 'Estimativa', 'Calculadora'], [['298 + 405 + 199', '', ''], ['52 × 19', '', ''], [f'{n(8960)} ÷ 32', '', '']])) + bloco(
        3, 'A reta vai de 2 a 3. Escreva os números marcados.', reta_fracao(4, {1: '?', 2: '?', 3: '?'}, ini='2', fim='3'))
    return ficha(
        'numeros-sistemas-de-numeracao-e-arredondamento', 'Números, sistemas de numeração e arredondamento', '6º ano',
        'Comparar naturais e decimais, entender o valor posicional, comparar o sistema decimal com o romano e arredondar para estimar.',
        ['EF06MA01', 'EF06MA02', 'EF06MA12'], '40 a 50 minutos', 'Quadro de valor com a parte decimal, dinheiro de brincadeira, calculadora e cartões com algarismos romanos.',
        ['Escreva 7, 70, 700 e 0,7 no quadro de valor e mostre que o mesmo algarismo muda de valor conforme a posição.',
         'Mostre relógios, capítulos de livros e nomes de reis com algarismos romanos.',
         'Na versão A, use o dinheiro para comparar os decimais.',
         'Na versão B, arredonde olhando a reta: qual centena está mais perto?',
         'Na versão C, a calculadora confere a estimativa: ficou perto?'],
        ['O quadro de valor e o dinheiro ficam à vista. Comparar decimais pensando em reais é mais claro que a regra.',
         'Explique as regras do sistema romano em uma tabela fixa. Avise quando houver exceções (IV, IX).',
         'Estimativas viram aposta: quem chega mais perto? A calculadora dá retorno imediato.'],
        ['Bloco 1: 0,9; 12,5. Bloco 2: 50. Bloco 3: 12.',
         f'Bloco 1: 4,08; 4,18; 4,8; 4,801. Bloco 2: 0,7; 70; 0,07. Bloco 3: XXIV; LX. Bloco 4: {n(3800)}; {n(4000)}; {n(130000)}.',
         f'Bloco 1: romano não tem zero, decimal tem; no romano a posição não dá valor de casa (só indica soma ou subtração), no decimal dá; romano usa 7 símbolos, decimal usa 10. Bloco 2: perto de 900 (902); perto de {n(1000)} (988); perto de 300 (280). Bloco 3: 2,25; 2,5; 2,75.'],
        a, b, c)


# ---------- 2. cálculo e fluxogramas ----------

def calculo_fluxogramas():
    a = bloco(1, 'Siga o fluxograma com o dedo. O que ele responde para cada número? Circule.', item(fluxo_par()) + grade([
        item('<p class="conta">14</p>', opcoes(['par', 'ímpar'], certa='par'), exemplo=True),
        item('<p class="conta">7</p>', opcoes(['par', 'ímpar'])),
        item('<p class="conta">30</p>', opcoes(['par', 'ímpar']))], 3)) + bloco(2, 'Cálculo mental. Circule.', item('<p class="conta">25 + 25 + 50</p>', opcoes([100, 75])))
    b = bloco(1, 'Estime e depois calcule.', grade([
        problema('Uma escola tem <b>18</b> turmas com <b>32</b> estudantes cada. Quantos estudantes ao todo?', '22mm', 'Estimativa: <span class="linha-resp"></span> Resposta:'),
        problema(f'Uma loja vendeu <b>{n(4567)}</b> camisetas em um mês e <b>{n(2389)}</b> no outro. Quantas ao todo?', '22mm', 'Estimativa: <span class="linha-resp"></span> Resposta:')], 1)) + bloco(
        2, 'Complete o fluxograma para descobrir se um número é múltiplo de 5.', fluxo_vazio(4), 'Use como modelo o fluxograma do par ou ímpar.')
    c = bloco(1, 'Escreva, em passos numerados, um algoritmo para calcular o troco de uma compra.', linhas(4)) + bloco(
        2, 'Leia e resolva. Use a calculadora para conferir.', grade([
            problema(f'Um show vendeu <b>{n(12480)}</b> ingressos a <b>R$ 35</b> cada. Quanto arrecadou?', '22mm'),
            problema(f'<b>{n(2025)}</b> cadeiras vão ser organizadas em <b>45</b> fileiras iguais. Quantas cadeiras por fileira?', '22mm')], 2)) + bloco(
        3, 'Quatro cidades: A liga com B, B liga com C e D, C liga com D. Desenhe o esquema e responda: para ir de A até D, por quais cidades passo?', caixa_desenho('30mm') + linhas(1))
    return ficha(
        'calculo-algoritmos-e-fluxogramas', 'Cálculo, algoritmos e fluxogramas', '6º ano',
        'Resolver problemas com números naturais, estimar, conferir na calculadora e representar passos e relações em fluxogramas.',
        ['EF06MA03', 'EF06MA04', 'EF06MA34'], '40 a 50 minutos', 'Calculadora, cartões com setas e caixas de fluxograma para montar no quadro ou na mesa.',
        ['Mostre um fluxograma do dia a dia: como atravessar a rua, como fazer um sanduíche.',
         'Siga o fluxograma do par ou ímpar com vários números, em voz alta.',
         'Na versão A, o estudante só segue as setas com o dedo.',
         'Na versão B, monte o fluxograma do múltiplo de 5 com cartões antes de escrever.',
         'Na versão C, o esquema das cidades é um fluxograma de relações: desenhe com bolinhas e linhas.'],
        ['Fluxogramas com poucos passos e cores fixas (início verde, pergunta amarela). Siga com o dedo.',
         'Algoritmos são sequências previsíveis e costumam agradar estudantes autistas. Ligue com programação, se a turma já conhece.',
         'Montar fluxogramas com cartões dá movimento. Uma etapa por vez, riscando o que já foi feito.'],
        ['Bloco 1: ímpar; par. Bloco 2: 100.', f'Bloco 1: estimativa 600, resposta 576; estimativa {n(7000)}, resposta {n(6956)}. Bloco 2: início, pense num número, termina em 0 ou 5?, sim: é múltiplo de 5 / não: não é.',
         f'Bloco 1: por exemplo, 1) veja o preço; 2) veja quanto foi pago; 3) subtraia o preço do valor pago; 4) devolva o resultado. Bloco 2: R$ {n(436800)}; 45 cadeiras. Bloco 3: A, B e D.'],
        a, b, c)


# ---------- 3. múltiplos, divisores e primos ----------

def multiplos_divisores():
    a = bloco(1, 'Separe 12 tampinhas em grupos iguais. Sobra alguma? Circule.', grade([
        item(matriz(4, 3, 20), '<p class="legenda">grupos de 3</p>' + opcoes(['sobra', 'não sobra'], certa='não sobra'), exemplo=True),
        item(matriz(2, 6, 20), '<p class="legenda">grupos de 5</p>' + opcoes(['sobra', 'não sobra'])),
        item(matriz(3, 4, 20), '<p class="legenda">grupos de 4</p>' + opcoes(['sobra', 'não sobra'])),
    ], 2), 'Se não sobra, o número do grupo é divisor de 12.') + bloco(2, 'Com 7 tampinhas, só dá para fazer uma fila de 7 ou 7 filas de 1. O 7 é primo? Circule.', item(matriz(1, 7, 24), opcoes(['sim', 'não'])),
                                                                     'Número primo tem só dois divisores: o 1 e ele mesmo.')
    b = bloco(1, 'Escreva todos os divisores.', frases(['Divisores de 18:', 'Divisores de 20:'])) + bloco(
        2, 'Circule os números primos.', ''.join(opcoes(list(range(i, min(i + 8, 31)))) for i in range(2, 31, 8)), 'Dica: risque os múltiplos de 2, 3 e 5 (menos eles mesmos).') + bloco(
        3, 'É divisível? Escreva sim ou não.', tabela(['Número', 'por 2', 'por 3', 'por 5', 'por 10'], [['135', 'não', 'sim', 'sim', 'não'], ['240', '', '', '', ''], ['98', '', '', '', '']]),
        'Por 3: some os algarismos. Se a soma é múltiplo de 3, o número também é.')
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Dois ônibus saem juntos do terminal. Um sai a cada <b>12</b> minutos e o outro a cada <b>18</b>. Depois de quantos minutos saem juntos de novo?', '22mm'),
        problema('Tenho <b>24</b> lápis e <b>36</b> canetas. Quero montar o maior número de kits iguais, sem sobrar nada. Quantos kits?', '22mm')], 2)) + bloco(
        2, 'Escreva 60 como produto de números primos.', '<p class="regra">60 = <span class="linha-resp"></span></p>') + bloco(
        3, 'Verdadeiro (V) ou falso (F)? Explique os falsos.', frases(['Todo número par é composto.', 'O 1 é primo.', 'Se um número é divisível por 10, ele é divisível por 5.']))
    return ficha(
        'multiplos-divisores-e-numeros-primos', 'Múltiplos, divisores e números primos', '6º ano',
        'Encontrar divisores com retângulos de tampinhas, reconhecer primos e compostos, usar critérios de divisibilidade e resolver problemas.',
        ['EF06MA05', 'EF06MA06'], '40 a 50 minutos', 'Tampinhas ou quadradinhos de papel, quadro de 100 para pintar e calculadora.',
        ['Peça que o estudante forme todos os retângulos possíveis com 12 tampinhas. Cada lado é um divisor.',
         'Tente com 7 tampinhas: só existe a fila. Esse é um número primo.',
         'Na versão A, monte os grupos de verdade.',
         'Na versão B, faça o crivo no quadro de 100: riscar os múltiplos de 2, 3, 5 e 7.',
         'Na versão C, liste os múltiplos de 12 e de 18 lado a lado para achar o primeiro comum.'],
        ['Os retângulos de tampinhas mostram os divisores. Deixe os critérios de divisibilidade numa tabela à vista.',
         'O crivo é um procedimento com regras claras. Use uma cor fixa para cada número riscado.',
         'O crivo pintado é rápido e visual. Divida em etapas curtas: primeiro só os múltiplos de 2.'],
        ['Bloco 1: sobra; não sobra. Bloco 2: sim.',
         'Bloco 1: 1, 2, 3, 6, 9, 18; 1, 2, 4, 5, 10, 20. Bloco 2: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Bloco 3: 240 sim, sim, sim, sim; 98 sim, não, não, não.',
         'Bloco 1: 36 minutos; 12 kits (2 lápis e 3 canetas em cada). Bloco 2: 2 × 2 × 3 × 5. Bloco 3: F (o 2 é par e é primo); F (o 1 tem só um divisor); V.'],
        a, b, c)


# ---------- 4. frações e decimais ----------

def fracoes_decimais():
    a = bloco(1, 'Que parte está pintada? Circule o decimal.', grade([
        item(barra_fracao(10, 3, 150, 26), '<p class="legenda">3/10</p>' + opcoes(['0,3', '3,10'], certa='0,3'), exemplo=True),
        item(barra_fracao(2, 1, 150, 26), '<p class="legenda">1/2</p>' + opcoes(['1,2', '0,5'])),
        item(barra_fracao(4, 1, 150, 26), '<p class="legenda">1/4</p>' + opcoes(['0,25', '1,4'])),
    ], 3), 'Pense em dinheiro: metade de 1 real são 50 centavos.') + bloco(2, 'Qual é maior? Circule.', item(pizza_fracao(3, 2, 90) + pizza_fracao(4, 2, 90), '<p class="legenda">2/3 e 2/4</p>' + opcoes(['2/3', '2/4'])))
    b = bloco(1, 'Complete.', tabela(['Fração', 'Decimal'], [['3/10', '0,3'], ['7/100', ''], ['1/4', ''], ['3/4', ''], ['', '0,6'], ['', '0,45']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva do menor para o maior: 2/3 &nbsp; 1/2 &nbsp; 3/4', seq_numeros([None] * 3), 'Escreva as três com o mesmo denominador (12).') + bloco(
        3, 'Simplifique.', grade([f'<p class="conta">6/8 = {VAZIO}</p>', f'<p class="conta">10/15 = {VAZIO}</p>', f'<p class="conta">12/16 = {VAZIO}</p>'], 3))
    c = bloco(1, 'A reta vai de 0 a 2 e está dividida em quartos. Escreva o número de cada ponto, em decimal.', reta_fracao(8, {2: '?', 5: '?', 7: '?'}, fim='2')) + bloco(
        2, 'Escreva em decimal fazendo a divisão.', grade([f'<p class="conta">7/4 = 7 ÷ 4 = {VAZIO}</p>', f'<p class="conta">5/8 = {VAZIO}</p>', f'<p class="conta">9/20 = {VAZIO}</p>'], 1)) + bloco(
        3, 'Compare. Escreva &gt;, &lt; ou =.', grade([f'<p class="conta">5/8 {VAZIO} 0,6</p>', f'<p class="conta">3/5 {VAZIO} 0,6</p>', f'<p class="conta">1/3 {VAZIO} 0,3</p>'], 3))
    return ficha(
        'fracoes-e-decimais-comparar-e-converter', 'Frações e decimais: comparar e converter', '6º ano',
        'Comparar e ordenar frações, encontrar equivalentes, passar de fração para decimal e de decimal para fração e localizar na reta.',
        ['EF06MA07', 'EF06MA08'], '40 a 50 minutos', 'Tiras de frações, malha de 100 quadradinhos, calculadora e dinheiro de brincadeira.',
        ['Pinte 3 de 10 tiras e escreva 3/10 e 0,3 lado a lado.',
         'Mostre que 1/4 de real são 25 centavos, R$ 0,25.',
         'Na versão A, o dinheiro e as tiras são o apoio principal.',
         'Na versão B, escreva as frações com o mesmo denominador para comparar.',
         'Na versão C, use a calculadora para conferir as divisões.'],
        ['As tiras de frações e o dinheiro ficam na mesa. Uma conversão por vez.',
         'Mostre uma tabela fixa com as conversões mais comuns (1/2 = 0,5, 1/4 = 0,25, 3/4 = 0,75).',
         'A calculadora transforma a conversão em descoberta rápida: o que dá 1 ÷ 4?'],
        ['Bloco 1: 0,5; 0,25. Bloco 2: 2/3.', 'Bloco 1: 0,07; 0,25; 0,75; 6/10 (ou 3/5); 45/100 (ou 9/20). Bloco 2: 1/2, 2/3, 3/4. Bloco 3: 3/4; 2/3; 3/4.',
         'Bloco 1: 0,5; 1,25; 1,75. Bloco 2: 1,75; 0,625; 0,45. Bloco 3: &gt;; =; &gt;.'],
        a, b, c)


# ---------- 5. fração de quantidade, adição e subtração de frações ----------

def fracao_quantidade():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(grupo('maca', 10, tam=30, por_linha=5), '<p class="legenda">metade de 10</p>' + opcoes([5, 2], certa=5), exemplo=True),
        item(grupo('estrela', 9, tam=30, por_linha=3), '<p class="legenda">1/3 de 9</p>' + opcoes([3, 6])),
        item(grupo('bola', 8, tam=30, por_linha=4), '<p class="legenda">1/4 de 8</p>' + opcoes([4, 2])),
    ], 3), 'Separe em grupos iguais e conte um grupo.') + bloco(2, 'Junte as partes pintadas. Circule.', item(barra_fracao(4, 1, 220, 30) + barra_fracao(4, 2, 220, 30), '<p class="legenda">1/4 + 2/4</p>' + opcoes(['3/4', '3/8'])))
    b = bloco(1, 'Calcule.', grade([f'<p class="conta">2/3 de 30 = {VAZIO}</p>', f'<p class="conta">3/4 de 40 = {VAZIO}</p>', f'<p class="conta">3/5 de 25 = {VAZIO}</p>'], 3),
              'Divida pelo número de baixo e multiplique pelo de cima.') + bloco(2, 'Calcule.', grade([
                  f'<p class="conta">1/5 + 2/5 = {VAZIO}</p>', f'<p class="conta">5/6 − 1/6 = {VAZIO}</p>', f'<p class="conta">1/2 + 1/4 = {VAZIO}</p>'], 3)) + bloco(
        3, 'Leia e resolva.', problema('Li <b>2/5</b> de um livro de <b>200</b> páginas. Quantas páginas li? Quantas faltam?', '22mm'))
    c = bloco(1, 'Calcule.', grade([f'<p class="conta">1/2 + 1/3 = {VAZIO}</p>', f'<p class="conta">3/4 − 2/3 = {VAZIO}</p>', f'<p class="conta">2 − 3/5 = {VAZIO}</p>'], 3)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Ana comeu <b>1/3</b> de uma pizza e Bia comeu <b>1/4</b>. Que fração as duas comeram juntas? Que fração sobrou?', '24mm'),
            problema('<b>3/8</b> dos <b>240</b> estudantes da escola vão de ônibus. Quantos estudantes vão de ônibus?', '24mm')], 2))
    return ficha(
        'fracao-de-quantidade-e-operacoes-com-fracoes', 'Fração de uma quantidade e operações com frações', '6º ano',
        'Calcular a fração de uma quantidade e somar e subtrair frações, com mesmo denominador e com denominadores diferentes.',
        ['EF06MA09', 'EF06MA10'], '40 a 50 minutos', 'Tampinhas, tiras de frações, círculos de papel e calculadora.',
        ['Reparta 10 tampinhas em 2 grupos: metade de 10 é 5. Depois, 2/3 de 30: reparta em 3 e pegue 2 grupos.',
         'Some tiras de frações iguais (1/4 + 2/4) colocando lado a lado.',
         'Na versão A, o estudante separa as figuras com lápis em grupos iguais.',
         'Na versão B, quando os denominadores forem diferentes, troque 1/2 por 2/4 usando as tiras.',
         'Na versão C, procure um denominador comum: para 1/3 e 1/4, use doze avos.'],
        ['Repartir objetos de verdade antes da regra. Use a mesma frase: "divide pelo de baixo, multiplica pelo de cima".',
         'Siga sempre a mesma ordem: igualar os denominadores, somar os numeradores, simplificar. Mostre num cartão.',
         'As tiras de frações viram quebra-cabeça. Problemas curtos, um de cada vez.'],
        ['Bloco 1: 3; 2. Bloco 2: 3/4.', 'Bloco 1: 20; 30; 15. Bloco 2: 3/5; 4/6 (ou 2/3); 3/4. Bloco 3: 80 páginas; faltam 120.',
         'Bloco 1: 5/6; 1/12; 7/5. Bloco 2: 7/12, sobrou 5/12; 90 estudantes.'],
        a, b, c)


# ---------- 6. operações com decimais e potências ----------

def decimais_potencias():
    a = bloco(1, 'Quanto custa? Circule.', grade([
        item(produto('suco', '2,50') * 3, '<p class="conta">3 × R$ 2,50</p>' + opcoes(['R$ 7,50', 'R$ 6,50'], certa='R$ 7,50'), exemplo=True, classe='largo'),
        item(dinheiro([10]), '<p class="conta">R$ 10 − R$ 6,75</p>' + opcoes(['R$ 4,75', 'R$ 3,25']), classe='largo'),
    ], 1)) + bloco(2, 'O quadrado de 3 é 3 × 3. Conte os quadradinhos. Circule.', item(malha(3, 3, 34, pintadas=[(c, l) for c in range(3) for l in range(3)]), opcoes([9, 6])))
    b = bloco(1, 'Calcule.', grade([conta('4,5', '+', '2,75'), conta('10', '−', '3,8'), conta('2,4', '×', 3), conta('9,6', '÷', 4)], 2)) + bloco(
        2, 'Calcule as potências.', grade([f'<p class="conta">2³ = 2 × 2 × 2 = {VAZIO}</p>', f'<p class="conta">10² = {VAZIO}</p>', f'<p class="conta">5² = {VAZIO}</p>', f'<p class="conta">10³ = {VAZIO}</p>'], 2)) + bloco(
        3, 'Estime e depois calcule: 19,8 × 5', '<p class="du">Estimativa: ' + resposta('', '26mm') + ' &nbsp; Resultado: ' + resposta('', '26mm') + '</p>', 'Arredonde 19,8 para 20.')
    c = bloco(1, 'Calcule.', grade([conta('12,6', '×', '0,5'), conta('7,2', '÷', '0,8'), '<p class="conta">0,3² = ' + VAZIO + '</p>', '<p class="conta">1,5³ = ' + VAZIO + '</p>'], 2)) + bloco(
        2, 'Leia e resolva. Estime antes.', grade([
            problema('Um litro de combustível custa <b>R$ 6,29</b>. Quanto custam <b>40</b> litros?', '22mm'),
            problema('Uma conta de <b>R$ 157,80</b> será dividida igualmente entre <b>4</b> pessoas. Quanto cada uma paga?', '22mm')], 2))
    return ficha(
        'operacoes-com-decimais-e-potencias', 'Operações com decimais e potências', '6º ano',
        'Somar, subtrair, multiplicar e dividir números decimais, calcular potências e usar estimativas para conferir.',
        ['EF06MA11'], '40 a 50 minutos', 'Dinheiro de brincadeira, calculadora, malha quadriculada e cubinhos para mostrar quadrados e cubos.',
        ['Comece com compras: três sucos de R$ 2,50.',
         'Mostre o quadrado de 3 como um quadrado de 3 por 3 na malha e o cubo de 2 como um bloco de 2 por 2 por 2 cubinhos.',
         'Na versão A, use o dinheiro de brincadeira.',
         'Na versão B, estime arredondando antes de cada conta.',
         'Na versão C, explique por que dividir por 0,8 dá um número maior.'],
        ['Contextos de dinheiro e a malha para as potências. A calculadora pode conferir cada conta.',
         'A potência como repetição de multiplicação é uma regra clara. Escreva sempre a multiplicação por extenso antes do resultado.',
         'Estimar e conferir na calculadora dá retorno imediato. Rodadas curtas.'],
        ['Bloco 1: R$ 3,25. Bloco 2: 9.', 'Bloco 1: 7,25; 6,2; 7,2; 2,4. Bloco 2: 8; 100; 25; 1000. Bloco 3: estimativa 100; resultado 99.',
         'Bloco 1: 6,3; 9; 0,09; 3,375. Bloco 2: R$ 251,60 (estimativa perto de R$ 250); R$ 39,45.'],
        a, b, c)


# ---------- 7. porcentagem ----------

def porcentagem6():
    metade = [(c, l) for c in range(10) for l in range(5)]
    quarto = [(c, l) for c in range(5) for l in range(5)]
    a = bloco(1, 'A malha tem 100 quadradinhos. Que porcentagem está pintada? Circule.', grade([
        item(malha(10, 10, 14, pintadas=metade), opcoes(['50%', '5%'], certa='50%'), exemplo=True),
        item(malha(10, 10, 14, pintadas=quarto), opcoes(['25%', '75%'])),
        item(malha(10, 10, 14, pintadas=[(c, 0) for c in range(10)]), opcoes(['1%', '10%'])),
    ], 3), 'Conte os quadradinhos pintados: cada um é 1%.') + bloco(2, 'Uma camiseta de R$ 40 está com 50% de desconto. Quanto custa agora? Circule.', opcoes(['R$ 20', 'R$ 35']))
    b = bloco(1, 'Calcule.', grade([f'<p class="conta">10% de 250 = {VAZIO}</p>', f'<p class="conta">20% de 250 = {VAZIO}</p>',
                                    f'<p class="conta">5% de 250 = {VAZIO}</p>', f'<p class="conta">15% de 80 = {VAZIO}</p>'], 2), 'Comece pelos 10% e use para calcular os outros.') + bloco(
        2, 'Leia e resolva.', grade([
            problema(f'Um celular de <b>R$ {n(1200)}</b> tem <b>10%</b> de desconto à vista. Qual é o preço à vista?', '22mm'),
            problema('<b>60%</b> dos <b>30</b> estudantes de uma turma gostam de futebol. Quantos estudantes são?', '22mm')], 2))
    c = bloco(1, 'Leia e resolva. Use a calculadora para conferir.', grade([
        problema(f'Um salário de <b>R$ {n(2000)}</b> teve aumento de <b>5%</b>. Qual é o novo salário?', '20mm'),
        problema('Um tênis custava <b>R$ 80</b> e passou a custar <b>R$ 60</b>. De quantos por cento foi o desconto?', '20mm'),
        problema('Uma compra de <b>R$ 500</b> parcelada tem acréscimo de <b>8%</b>. Qual é o valor total?', '20mm'),
        problema('A conta de luz era de <b>R$ 150</b>. A família economizou <b>20%</b>. Qual é a nova conta?', '20mm')], 2))
    return ficha(
        'porcentagem-descontos-e-acrescimos', 'Porcentagem: descontos e acréscimos', '6º ano',
        'Calcular porcentagens com a malha de 100, com 10% como ponto de partida e em problemas de educação financeira.',
        ['EF06MA13'], '40 a 50 minutos', 'Malha de 10 por 10, folhetos de loja, contas de luz ou de água (sem dados pessoais) e calculadora.',
        ['Pinte a malha de 100: cada quadradinho é 1%. Pinte 50, 25 e 10.',
         'Mostre a estratégia dos 10%: dividir por 10. Depois, 20% é o dobro, 5% é a metade.',
         'Na versão A, conte os quadradinhos pintados.',
         'Na versão B, escreva os 10% antes de cada conta.',
         'Na versão C, discuta o que vale mais a pena: pagar à vista com desconto ou parcelado com acréscimo.'],
        ['A malha de 100 pintada mostra o que é porcentagem. Use contextos de compra conhecidos.',
         'A estratégia dos 10% é um procedimento fixo. Deixe o passo a passo num cartão.',
         'Folhetos reais e calculadora dão um desafio rápido: qual é a melhor oferta?'],
        ['Bloco 1: 25%; 10%. Bloco 2: R$ 20.', f'Bloco 1: 25; 50; 12,5; 12. Bloco 2: R$ {n(1080)}; 18 estudantes.',
         f'Bloco 1: R$ {n(2100)}; 25%; R$ 540; R$ 120.'],
        a, b, c)


# ---------- 8. igualdade e partilha ----------

def igualdade_partilha():
    from desenhos2 import balanca_eq
    a = bloco(1, 'A balança está equilibrada. Quanto vale o ponto de interrogação? Circule.', grade([
        item(balanca_eq('? × 2', '10'), opcoes([5, 8], certa=5), exemplo=True),
        item(balanca_eq('? + 4', '12'), opcoes([16, 8])),
    ], 2)) + bloco(2, 'Reparta 12 balas: Ana fica com o dobro de Bia. Circule.', item(grupo('estrela', 12, tam=30, por_linha=12), opcoes(['Bia 4, Ana 8', 'Bia 6, Ana 6'])),
                   'Faça grupos de 3: um para Bia, dois para Ana. Repita até acabar.')
    b = bloco(1, 'Descubra o número que falta.', grade([f'<p class="conta">3 × ? + 4 = 19 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">? ÷ 2 − 3 = 7 &nbsp; ? = {VAZIO}</p>'], 2),
              'Desfaça as contas de trás para a frente, dos dois lados.') + bloco(2, 'Leia e resolva.', grade([
                  problema('Dois irmãos dividem <b>R$ 60</b> na razão de 1 para 2. Quanto recebe cada um?', '20mm'),
                  problema('Divida <b>45</b> em duas partes, uma com <b>9</b> a mais que a outra.', '20mm'),
                  problema('Uma receita usa <b>2</b> copos de farinha para <b>1</b> de açúcar. Ao todo são <b>9</b> copos. Quantos de cada?', '20mm')], 3))
    c = bloco(1, 'Descubra o número que falta.', grade([f'<p class="conta">5 × ? − 7 = 2 × ? + 8 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">4 × (? + 3) = 36 &nbsp; ? = {VAZIO}</p>'], 1)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('A soma das idades de uma mãe e de seu filho é <b>48</b> anos. A mãe tem o triplo da idade do filho. Quantos anos tem cada um?', '22mm'),
            problema('Um terreno de <b>120</b> m² foi dividido em duas partes. A menor é <b>2/3</b> da maior. Quanto mede cada parte? Qual é a razão entre a parte menor e o todo?', '22mm')], 2))
    return ficha(
        'igualdades-e-partilha-em-partes-desiguais', 'Igualdades e partilha em partes desiguais', '6º ano',
        'Usar as propriedades da igualdade para descobrir valores desconhecidos e repartir quantidades em partes desiguais e por razões.',
        ['EF06MA14', 'EF06MA15'], '40 a 50 minutos', 'Balança de dois pratos ou cabide com copos, tampinhas e barras de papel para representar as partes.',
        ['Equilibre a balança e faça a mesma operação dos dois lados: tirar, colocar, dobrar.',
         'Para a partilha, desenhe barras: uma barra para Bia, duas barras iguais para Ana.',
         'Na versão A, monte a balança e reparta as balas com tampinhas.',
         'Na versão B, a razão de 1 para 2 significa 3 partes iguais ao todo.',
         'Na versão C, desenhe a barra da mãe (três partes) e do filho (uma parte).'],
        ['O modelo de barras deixa a partilha visível. Use tampinhas antes do desenho.',
         'As propriedades da igualdade são regras fixas. Escreva cada passo numa linha nova, sempre igual.',
         'A balança de verdade dá movimento e expectativa. Desafios curtos de "número escondido".'],
        ['Bloco 1: 8. Bloco 2: Bia 4, Ana 8.', 'Bloco 1: 5; 20. Bloco 2: R$ 20 e R$ 40; 18 e 27; 6 copos de farinha e 3 de açúcar.',
         'Bloco 1: 5; 6. Bloco 2: filho 12 anos e mãe 36; 72 m² e 48 m², razão 48/120 = 2/5.'],
        a, b, c)


# ---------- 9. plano cartesiano e polígonos ----------

def plano_poligonos():
    a = bloco(1, 'Os pontos são os vértices de um triângulo. Qual é o par ordenado de cada um? Circule.', item(
        malha(5, 5, 40, marcas={(1, 1): 'A', (4, 1): 'B', (1, 4): 'C'}, eixos=True, rotulo='plano com os pontos A, B e C')) + grade([
            item('<p class="conta">A</p>', opcoes(['(1, 1)', '(4, 1)'], certa='(1, 1)'), exemplo=True),
            item('<p class="conta">B</p>', opcoes(['(1, 4)', '(4, 1)'])), item('<p class="conta">C</p>', opcoes(['(1, 4)', '(4, 1)']))], 3)) + bloco(
        2, 'Todos os lados e ângulos são iguais? Circule.', grade([
            item(regular(4, 40, rot=-45), opcoes(['regular', 'não regular'])), item(poligono_svg([(4, 4), (130, 4), (130, 60), (4, 60)], rotulo='retângulo'), opcoes(['regular', 'não regular']))], 2))
    b = bloco(1, 'Marque os pontos A (1, 1), B (5, 1), C (5, 3), D (1, 3) e ligue na ordem.', item(malha(6, 5, 38, eixos=True, rotulo='plano vazio')) + frases(['Que polígono você desenhou?', 'Ele é regular?'])) + bloco(
        2, 'Regular ou não regular?', tabela(['Polígono', 'Regular?'], [['quadrado', 'sim'], ['retângulo', ''], ['triângulo com 3 lados iguais', ''], ['losango que não é quadrado', ''], ['hexágono com lados e ângulos iguais', '']]))
    c = bloco(1, 'Um quadrado tem dois vértices em (1, 1) e (4, 1). Desenhe e escreva os outros dois vértices.', item(malha(6, 6, 34, eixos=True, rotulo='plano vazio')) + frases(['Os outros vértices:'])) + bloco(
        2, 'Responda.', frases(['As faces de um cubo são polígonos regulares? Quais?', 'Desenhe um pentágono não regular e explique por que ele não é regular.']) + caixa_desenho('26mm'))
    return ficha(
        'plano-cartesiano-e-poligonos', 'Plano cartesiano e polígonos', '6º ano',
        'Associar pares ordenados aos vértices de polígonos e classificar polígonos em regulares e não regulares.',
        ['EF06MA16', 'EF06MA18'], '40 a 50 minutos', 'Papel quadriculado, régua, fita crepe para eixos no chão e sólidos (cubo, prisma) para observar as faces.',
        ['Relembre: primeiro o número do eixo de baixo, depois o do eixo do lado.',
         'Marque os vértices e ligue com régua: aparece o polígono.',
         'Na versão A, passe o dedo do zero até o ponto, primeiro para a direita e depois para cima.',
         'Na versão B, meça os lados com régua para decidir se é regular.',
         'Na versão C, há duas respostas possíveis para o quadrado se o plano tivesse números negativos: discuta por que aqui só há uma.'],
        ['Use uma cor para o eixo de baixo e outra para o eixo do lado, sempre as mesmas. Régua para ligar os pontos.',
         'A ordem do par ordenado é uma regra fixa. Avise que (1, 4) e (4, 1) são pontos diferentes.',
         'O plano no chão vira jogo: um estudante fica no ponto, outro diz o par ordenado.'],
        ['Bloco 1: (4, 1); (1, 4). Bloco 2: regular; não regular.', 'Bloco 1: retângulo; não é regular. Bloco 2: não; sim; não; sim.',
         'Bloco 1: (4, 4) e (1, 4). Bloco 2: sim, quadrados; resposta pessoal (os lados ou os ângulos não são todos iguais).'],
        a, b, c)


# ---------- 10. prismas e pirâmides ----------

def prismas_piramides():
    a = bloco(1, 'Quantas faces tem cada sólido? Circule.', grade([
        item(solido('cubo', 90), opcoes([6, 4], certa=6), exemplo=True),
        item(solido('piramide', 90), opcoes([5, 8])),
        item(solido('prisma', 90), opcoes([3, 5])),
    ], 3), 'Pegue um sólido de verdade e marque cada face com um adesivo.')
    b = bloco(1, 'Complete o quadro.', tabela(['Sólido', 'Polígono da base', 'Faces', 'Vértices', 'Arestas'], [
        ['prisma triangular', 'triângulo', '5', '6', '9'], ['prisma quadrangular', 'quadrado', '', '', ''], ['prisma pentagonal', 'pentágono', '', '', ''],
        ['pirâmide triangular', 'triângulo', '', '', ''], ['pirâmide quadrangular', 'quadrado', '', '', ''], ['pirâmide pentagonal', 'pentágono', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'O que você percebeu? Complete.', frases(['Num prisma, o número de vértices é o dobro de', 'Numa pirâmide, o número de faces é o número de lados da base mais']))
    c = bloco(1, 'A base tem n lados. Complete.', tabela(['', 'Faces', 'Vértices', 'Arestas'], [['prisma', '', '', ''], ['pirâmide', '', '', '']])) + bloco(
        2, 'Use o que você descobriu.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas'], [['prisma de base hexagonal', '', '', ''], ['pirâmide de base hexagonal', '', '', '']])) + bloco(
        3, 'Confira, nos sólidos das tabelas: vértices + faces − arestas dá sempre o mesmo número? Qual?', linhas(1)) + bloco(
        4, 'Leia e resolva.', problema('Um poliedro tem <b>10</b> vértices e <b>15</b> arestas. Quantas faces ele tem?', '18mm'))
    return ficha(
        'prismas-e-piramides-faces-vertices-e-arestas', 'Prismas e pirâmides: faces, vértices e arestas', '6º ano',
        'Contar faces, vértices e arestas de prismas e pirâmides e relacionar esses números com o polígono da base.',
        ['EF06MA17'], '40 a 50 minutos', 'Sólidos de madeira ou de papel, palitos e massinha para montar as arestas e os vértices.',
        ['Monte um prisma triangular com palitos (arestas) e massinha (vértices).',
         'Conte com a turma, marcando com adesivo o que já foi contado.',
         'Na versão A, use o sólido de verdade ao lado da folha.',
         'Na versão B, monte os sólidos da tabela com palitos para conferir.',
         'Na versão C, a relação V + F − A = 2 (de Euler) aparece por investigação: deixe que o estudante descubra.'],
        ['Montar com palitos e massinha mostra o que é vértice e aresta. Um sólido por vez.',
         'A tabela organizada mostra o padrão. Marcar o que já foi contado evita frustração.',
         'Montar sólidos é rápido e concreto. Desafie: quantos palitos para um prisma pentagonal?'],
        ['Bloco 1: 5; 5.', 'Bloco 1: prisma quadrangular 6, 8, 12; prisma pentagonal 7, 10, 15; pirâmide triangular 4, 4, 6; quadrangular 5, 5, 8; pentagonal 6, 6, 10. Bloco 2: o número de lados da base; 1.',
         'Bloco 1: prisma n + 2, 2n, 3n; pirâmide n + 1, n + 1, 2n. Bloco 2: prisma hexagonal 8, 12, 18; pirâmide hexagonal 7, 7, 12. Bloco 3: sim, 2. Bloco 4: 7 faces.'],
        a, b, c)


# ---------- 11. triângulos e quadriláteros ----------

ISOSCELES = [(60, 4), (112, 100), (8, 100)]
ESCALENO = [(4, 100), (130, 100), (34, 20)]
RETANGULO_T = [(4, 4), (4, 90), (110, 90)]
OBTUSO = [(4, 40), (60, 80), (160, 80)]


def triangulos_quadrilateros():
    a = bloco(1, 'Compare os lados. Circule o nome.', grade([
        item(regular(3, 50), '<p class="legenda">3 lados iguais</p>' + opcoes(['equilátero', 'escaleno'], certa='equilátero'), exemplo=True),
        item(poligono_svg(ISOSCELES, rotulo='triângulo com 2 lados iguais'), '<p class="legenda">2 lados iguais</p>' + opcoes(['isósceles', 'equilátero'])),
        item(poligono_svg(ESCALENO, rotulo='triângulo com 3 lados diferentes'), '<p class="legenda">3 lados diferentes</p>' + opcoes(['isósceles', 'escaleno'])),
    ], 2), 'Meça os lados com uma tira de papel.') + bloco(2, 'Qual é o nome? Circule.', grade([
        item(regular(4, 40, rot=-45), opcoes(['quadrado', 'retângulo'])), item(poligono_svg([(4, 4), (140, 4), (140, 64), (4, 64)], rotulo='retângulo'), opcoes(['quadrado', 'retângulo']))], 2))
    b = bloco(1, 'Classifique pelos ângulos.', grade([
        item(poligono_svg(RETANGULO_T, rotulo='triângulo com um ângulo reto'), f'<p class="du">{resposta("", "30mm")}</p>'),
        item(poligono_svg(OBTUSO, rotulo='triângulo com um ângulo obtuso'), f'<p class="du">{resposta("", "30mm")}</p>'),
        item(regular(3, 46), f'<p class="du">{resposta("", "30mm")}</p>')], 3), 'Retângulo (um ângulo reto), obtusângulo (um ângulo maior que o reto) ou acutângulo (todos menores que o reto).') + bloco(
        2, 'A soma dos ângulos de um triângulo é 180°. Descubra o ângulo que falta.', grade([f'<p class="conta">60° + 70° + {VAZIO} = 180°</p>', f'<p class="conta">90° + 35° + {VAZIO} = 180°</p>'], 2)) + bloco(
        3, 'Complete com sim ou não.', tabela(['', 'Lados opostos paralelos', '4 ângulos retos', '4 lados iguais'], [
            ['quadrado', 'sim', 'sim', 'sim'], ['retângulo', '', '', ''], ['losango', '', '', ''], ['paralelogramo', '', '', '']]))
    c = bloco(1, 'Verdadeiro (V) ou falso (F)?', frases(['Todo quadrado é um retângulo.', 'Todo retângulo é um quadrado.', 'Todo quadrado é um losango.',
                                                         'Todo losango é um paralelogramo.', 'Todo trapézio é um paralelogramo.'])) + bloco(
        2, 'Responda.', frases(['Existe triângulo com lados de 2 cm, 3 cm e 7 cm? Por quê?', 'Um triângulo retângulo e isósceles tem quais ângulos?',
                                'Num quadrilátero, três ângulos medem 90°, 90° e 120°. Quanto mede o quarto? (a soma é 360°)']))
    return ficha(
        'triangulos-e-quadrilateros', 'Triângulos e quadriláteros', '6º ano',
        'Classificar triângulos pelos lados e pelos ângulos, classificar quadriláteros e perceber que um tipo pode estar dentro de outro.',
        ['EF06MA19', 'EF06MA20'], '40 a 50 minutos', 'Tiras de papel ou palitos de tamanhos diferentes, esquadro, figuras de papel para recortar e dobrar.',
        ['Monte triângulos com palitos de tamanhos diferentes e compare os lados.',
         'Recorte um triângulo de papel, rasgue as três pontas e junte: formam meia volta (180°).',
         'Na versão A, meça os lados com uma tira de papel em vez da régua.',
         'Na versão B, use o esquadro para encontrar ângulos retos.',
         'Na versão C, organize os quadriláteros num diagrama: o quadrado fica dentro do retângulo e do losango.'],
        ['Palitos e recortes antes da classificação. Um critério por vez: primeiro os lados, depois os ângulos.',
         'Um quadro fixo com os nomes e as propriedades ajuda. A ideia de que "o quadrado também é retângulo" pode causar estranheza: mostre com as propriedades.',
         'Rasgar as pontas do triângulo é rápido e surpreendente. Desafios curtos de classificação.'],
        ['Bloco 1: isósceles; escaleno. Bloco 2: quadrado; retângulo.',
         'Bloco 1: retângulo; obtusângulo; acutângulo. Bloco 2: 50°; 55°. Bloco 3: retângulo sim, sim, não; losango sim, não, sim; paralelogramo sim, não, não.',
         'Bloco 1: V, F, V, V, F. Bloco 2: não, porque 2 + 3 é menor que 7; 90°, 45° e 45°; 60°.'],
        a, b, c)


# ---------- 12. retas, ampliação e algoritmos de construção ----------

def retas_construcoes():
    a = bloco(1, 'As retas se cruzam? Circule.', grade([
        item(retas('paralelas'), opcoes(['paralelas', 'cruzam'], certa='paralelas'), exemplo=True),
        item(retas('concorrentes'), opcoes(['paralelas', 'cruzam'])),
        item(retas('perpendiculares'), '<p class="legenda">formam ângulo reto</p>' + opcoes(['paralelas', 'perpendiculares'])),
    ], 2), 'Paralelas nunca se encontram, como os trilhos do trem.') + bloco(
        2, 'Siga os passos a partir do S: 3 para a direita, 2 para cima. Em que letra você chega? Circule.', item(
            malha_coord(5, 4, {(0, 3): 'S', (3, 1): 'A', (2, 0): 'B', (4, 3): 'C'}, 28, 'malha com S e as letras A, B e C'), opcoes(['A', 'B', 'C'])))
    b = bloco(1, 'Use régua e esquadro.', grade([
        item(svg(220, 110, f'<path d="M10 80 L210 40" stroke="{TRACO}" stroke-width="2.5"/><text x="200" y="30" {F} font-size="14">r</text><circle cx="80" cy="30" r="4" fill="{TRACO}"/><text x="88" y="24" {F} font-size="14">P</text>', 'retas', 'reta r e ponto P'),
             '<p class="legenda">Trace uma paralela a r passando por P.</p>'),
        item(svg(220, 110, f'<path d="M10 70 H210" stroke="{TRACO}" stroke-width="2.5"/><text x="200" y="60" {F} font-size="14">s</text><circle cx="110" cy="70" r="4" fill="{TRACO}"/><text x="114" y="88" {F} font-size="14">Q</text>', 'retas', 'reta s e ponto Q'),
             '<p class="legenda">Trace uma perpendicular a s passando por Q.</p>')], 2)) + bloco(
        2, 'Amplie a figura: cada lado fica com o dobro do tamanho.', grade([malha(4, 4, 24, pintadas=[(0, 2), (1, 2), (1, 1), (0, 3), (1, 3)], rotulo='figura para ampliar'), malha(8, 8, 22, rotulo='malha vazia')], 2)) + bloco(
        3, 'Escreva os passos para desenhar um quadrado de lado 4 cm com régua e esquadro.', linhas(3))
    c = bloco(1, 'Siga o algoritmo no plano e responda.', item(malha(6, 5, 34, eixos=True, rotulo='plano vazio')) + '<p class="legenda">Comece em (0, 0). Vá 3 para a direita. Suba 4. Vá 3 para a esquerda. Desça 4.</p>' +
              frases(['Que figura você desenhou?', 'Qual é o perímetro, em lados de quadradinho?', 'Quais lados são paralelos? Quais são perpendiculares?'])) + bloco(
        2, 'O triângulo tem vértices (0, 0), (2, 0) e (0, 1). Multiplique as medidas por 3. Quais são os novos vértices?', linhas(1))
    return ficha(
        'retas-paralelas-e-perpendiculares-ampliacao-e-algoritmos', 'Retas paralelas e perpendiculares, ampliação e algoritmos', '6º ano',
        'Reconhecer e traçar retas paralelas e perpendiculares, ampliar figuras em malhas e seguir e escrever algoritmos de construção.',
        ['EF06MA21', 'EF06MA22', 'EF06MA23'], '40 a 50 minutos', 'Régua, esquadro, malha quadriculada e, se possível, um programa de geometria dinâmica.',
        ['Mostre paralelas e perpendiculares na sala: as bordas do quadro, as linhas do caderno.',
         'Ensine a deslizar o esquadro sobre a régua para traçar paralelas.',
         'Na versão A, o estudante passa o dedo sobre as retas para ver se elas se encontram.',
         'Na versão B, peça que um colega siga os passos escritos para desenhar o quadrado.',
         'Na versão C, o algoritmo no plano é como programar um robô.'],
        ['Use as linhas do caderno e do quadro como exemplos fixos. Régua e esquadro com marcação colorida.',
         'Algoritmos passo a passo dão previsibilidade. Numere os passos e risque cada um ao terminar.',
         'Traçar com instrumentos dá movimento às mãos. Um traçado por vez, com tempo combinado.'],
        ['Bloco 1: cruzam; perpendiculares. Bloco 2: A.', 'Bloco 1: traçados com régua e esquadro. Bloco 2: figura com lados dobrados. Bloco 3: por exemplo, trace 4 cm, use o esquadro para subir 4 cm em cada ponta, ligue as pontas.',
         'Bloco 1: um retângulo; 14; os lados de 3 são paralelos entre si e os de 4 também; lados vizinhos são perpendiculares. Bloco 2: (0, 0), (6, 0) e (0, 3).'],
        a, b, c)


# ---------- 13. ângulos ----------

def angulos():
    a = bloco(1, 'Qual ângulo tem a abertura maior? Circule.', item(opcoes([angulo2(30, 100), angulo2(80, 100)]))) + bloco(
        2, 'Reto, agudo ou obtuso? Circule.', grade([
            item(angulo2(90, 80), opcoes(['reto', 'agudo'], certa='reto'), exemplo=True),
            item(angulo2(40, 80), opcoes(['agudo', 'obtuso'])),
            item(angulo2(130, 80), opcoes(['agudo', 'obtuso'])),
        ], 2), 'Agudo é menor que o canto de uma folha. Obtuso é maior.')
    b = bloco(1, 'Leia o transferidor. Quanto mede cada ângulo?', grade([
        item(transferidor(40, 220), f'<p class="du">{VAZIO} graus</p>'), item(transferidor(90, 220), f'<p class="du">{VAZIO} graus</p>'),
        item(transferidor(130, 220), f'<p class="du">{VAZIO} graus</p>'), item(transferidor(160, 220), f'<p class="du">{VAZIO} graus</p>')], 2), 'Comece a contar do 0 da direita.') + bloco(
        2, 'Complete.', frases(['Uma volta inteira =', 'Meia volta =', 'Um quarto de volta =']))
    c = bloco(1, 'Com o transferidor, desenhe um ângulo de 35° e outro de 150°.', caixa_desenho('40mm')) + bloco(
        2, 'Que ângulo os ponteiros do relógio formam?', tabela(['Hora', 'Ângulo'], [['3h', ''], ['2h', ''], ['6h', ''], ['4h', '']]), 'Entre dois números do relógio há 30°.') + bloco(
        3, 'Ângulo de visão: uma pessoa enxerga até 60° para cada lado de onde olha. Qual é o ângulo de visão total?', linhas(1))
    return ficha(
        'angulos-abertura-e-transferidor', 'Ângulos: abertura e transferidor', '6º ano',
        'Comparar aberturas, classificar ângulos e medir e desenhar ângulos com o transferidor, em contextos como o relógio e o ângulo de visão.',
        ['EF06MA25', 'EF06MA26', 'EF06MA27'], '40 a 50 minutos', 'Transferidor, dois palitos presos com um alfinete (para abrir e fechar), relógio de ponteiros.',
        ['Abra e feche os palitos presos: o ângulo é a abertura, e não o tamanho dos palitos.',
         'Mostre como colocar o centro do transferidor no vértice e o zero sobre um dos lados.',
         'Na versão A, compare os ângulos com o canto de uma folha.',
         'Na versão B, comece sempre a contar do 0 da direita, como na folha.',
         'Na versão C, use um relógio de ponteiros para conferir os ângulos.'],
        ['Os palitos presos mostram a abertura de forma concreta. O transferidor com o zero marcado em cor ajuda.',
         'O passo a passo do transferidor (centro, zero, leitura) é fixo. Avise que o transferidor tem duas escalas e use só uma.',
         'Abrir os palitos e girar o corpo (um quarto de volta, meia volta) dá movimento ao conteúdo.'],
        ['Bloco 1: o segundo (80°). Bloco 2: agudo; obtuso.', 'Bloco 1: 40; 90; 130; 160. Bloco 2: 360°; 180°; 90°.',
         'Bloco 1: desenhos medidos com o transferidor. Bloco 2: 90°, 60°, 180°, 120°. Bloco 3: 120°.'],
        a, b, c)


# ---------- 14. grandezas, plantas baixas e área do quadrado ----------

def plantas_areas():
    a = bloco(1, 'Esta é a planta de uma casa. Cada quadradinho vale 1 metro. Qual é o maior cômodo? Circule.', item(planta(CASA, 8, 6, 30)) + opcoes(['sala', 'cozinha', 'banheiro'])) + bloco(
        2, 'Dobrei o lado do quadrado. O que aconteceu com a área? Circule.', item(malha(2, 2, 26, pintadas=[(c, l) for c in range(2) for l in range(2)]) + malha(4, 4, 26, pintadas=[(c, l) for c in range(4) for l in range(4)]),
                                                                                  opcoes(['dobrou', 'ficou 4 vezes maior'])), 'Conte os quadradinhos dos dois.')
    b = bloco(1, 'Olhe a planta. Cada quadradinho vale 1 metro.', item(planta(CASA, 8, 6, 30)) + frases(['Área da sala:', 'Área do quarto:', 'Perímetro do quarto:', 'Área da casa toda:'])) + bloco(
        2, 'Complete.', tabela(['Lado do quadrado', '1', '2', '3', '4'], [['Perímetro', '4', '', '', ''], ['Área', '1', '', '', '']]) + frases(['Quando o lado dobra, o perímetro', 'Quando o lado dobra, a área']))
    c = bloco(1, 'Desenhe a planta baixa do seu quarto ou da sua sala de aula. Use 1 quadradinho = 1 metro.', malha(16, 7, 26, rotulo='malha vazia')) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Uma caixa-d\'água tem forma de bloco: <b>2</b> m de comprimento, <b>1</b> m de largura e <b>1</b> m de altura. Quantos metros cúbicos ela tem?', '18mm'),
            problema('Um triângulo tem base <b>6</b> m e altura <b>4</b> m. Ele é metade de um retângulo. Qual é a área do triângulo?', '18mm'),
            problema('Uma viagem saiu às <b>13:30</b> e durou <b>2 h 45 min</b>. A que horas chegou?', '18mm'),
            problema('Um quadrado tem lado de <b>5</b> cm. Se o lado triplicar, quantas vezes a área aumenta?', '18mm')], 2))
    return ficha(
        'plantas-baixas-areas-e-grandezas', 'Plantas baixas, áreas e grandezas', '6º ano',
        'Ler e desenhar plantas baixas, calcular áreas e perímetros sem fórmula e perceber o que acontece com a área quando o lado do quadrado aumenta.',
        ['EF06MA24', 'EF06MA28', 'EF06MA29'], '40 a 50 minutos', 'Malha quadriculada, trena ou fita métrica, plantas de imóveis de folhetos e cubinhos.',
        ['Mostre uma planta de folheto de imóvel e pergunte o que são os retângulos.',
         'Meça a sala com a trena e desenhe a planta com a turma, 1 quadradinho para 1 metro.',
         'Na versão A, conte os quadradinhos de cada cômodo.',
         'Na versão B, monte quadrados de lados 1, 2, 3 e 4 com quadradinhos de papel e compare.',
         'Na versão C, mostre que o triângulo é metade do retângulo recortando um retângulo de papel na diagonal.'],
        ['Planta da própria sala ou casa é mais significativa. Conte os quadradinhos com marcação.',
         'Diferencie área e perímetro com cores fixas. Avise antes de mudar a escala da malha.',
         'Medir a sala com a trena dá movimento e um objetivo claro. Divida as tarefas.'],
        ['Bloco 1: sala. Bloco 2: ficou 4 vezes maior.', 'Bloco 1: 20 m²; 9 m²; 12 m; 39 m². Bloco 2: perímetros 8, 12, 16; áreas 4, 9, 16; dobra; fica 4 vezes maior.',
         'Bloco 1: resposta pessoal. Bloco 2: 2 m³; 12 m²; 16:15; 9 vezes.'],
        a, b, c)


# ---------- 15. probabilidade e gráficos ----------

def probabilidade_graficos():
    graf = grafico_barras(['papel', 'plástico', 'metal'], [6, 4, 2], maximo=7, celula=26, gap=40, rotulo='gráfico de colunas: papel 6, plástico 4, metal 2')
    a = bloco(1, 'Qual é a chance? Circule.', grade([
        item('<p class="legenda">sair cara numa moeda</p>', opcoes(['1/2', '1/3'], certa='1/2'), exemplo=True),
        item('<p class="legenda">sair 3 num dado</p>', opcoes(['1/6', '1/3'])),
    ], 2)) + bloco(2, 'Lixo reciclado na escola, em quilos.', item(graf) + grade([
        item('<p class="legenda">Qual material foi mais reciclado?</p>', opcoes(['papel', 'metal'])), item('<p class="legenda">Quantos quilos de plástico?</p>', opcoes([4, 6]))], 2))
    b = bloco(1, 'Um pote tem 2 bolinhas verdes, 3 amarelas e 5 rosas. Complete.', item(pote(['verde'] * 2 + ['amarelo'] * 3 + ['rosa'] * 5, 110, 'pote com 2 verdes, 3 amarelas e 5 rosas')) +
              tabela(['Cor', 'Fração', 'Decimal', 'Porcentagem'], [['rosa', '5/10', '0,5', '50%'], ['verde', '', '', ''], ['amarela', '', '', '']])) + bloco(
        2, 'Jogue um dado 30 vezes e conte quantas vezes saiu o 6.', '<p class="du">Saiu o 6: ' + resposta('', '22mm') + ' vezes. Pela probabilidade, o esperado era perto de ' + resposta('', '22mm') + ' vezes.</p>') + bloco(
        3, 'Escolha um gráfico de um livro ou de uma notícia e escreva:', frases(['O título:', 'O que mostra o eixo de baixo:', 'O que mostra o eixo do lado:']))
    c = bloco(1, 'Como os 300 estudantes de uma escola chegam à escola.', tabela(['Meio de transporte', 'Estudantes', 'Porcentagem'], [
        ['a pé', '120', ''], ['ônibus', '90', ''], ['carro', '60', ''], ['bicicleta', '30', '']]) + frases(['Que meio de transporte é mais usado?', 'Escreva uma sugestão para a escola com base nos dados.'])) + bloco(
        2, 'Planeje uma pesquisa sobre um hábito da turma (sono, tela, transporte, lanche).', frases(['Pergunta:', 'Quem vai responder:', 'Que gráfico vai usar:']), 'Registre numa planilha e faça o gráfico no computador, se possível.') + bloco(
        3, 'Probabilidade: numa roleta com 8 partes iguais, 2 são azuis. Qual é a chance de parar no azul, em fração e em porcentagem?', linhas(1))
    return ficha(
        'probabilidade-graficos-e-pesquisa', 'Probabilidade, gráficos e pesquisa', '6º ano',
        'Calcular probabilidades em fração, decimal e porcentagem, comparar com experimentos, ler os elementos de um gráfico e planejar uma pesquisa com planilha.',
        ['EF06MA30', 'EF06MA31', 'EF06MA32', 'EF06MA33'], '50 minutos ou duas aulas', 'Dados, pote com bolinhas, roleta de papelão, gráficos de jornal ou de sites e computador com planilha, se houver.',
        ['Comece com a moeda e o dado: quantos resultados possíveis, quantos eu quero.',
         'Faça o experimento com a turma e compare com a probabilidade: deu perto?',
         'Na versão A, monte o pote e jogue o dado de verdade.',
         'Na versão B, mostre que 5/10, 0,5 e 50% são a mesma chance.',
         'Na versão C, a turma escolhe o tema da pesquisa e registra numa planilha.'],
        ['Experimentos concretos antes da fração. Gráficos com poucas categorias e títulos claros.',
         'Explique que o experimento nem sempre dá o resultado esperado e que isso faz parte. Mostre os elementos do gráfico sempre na mesma ordem.',
         'Jogar o dado e marcar os resultados dá movimento. A planilha dá retorno visual rápido.'],
        ['Bloco 1: 1/6. Bloco 2: papel; 4.', 'Bloco 1: verde 2/10, 0,2, 20%; amarela 3/10, 0,3, 30%. Bloco 2: resposta pessoal; perto de 5 vezes. Bloco 3: lixo reciclado na escola; o material; os quilos.',
         'Bloco 1: 40%, 30%, 20%, 10%; a pé; resposta pessoal. Bloco 2: resposta pessoal. Bloco 3: 2/8 = 1/4 = 25%.'],
        a, b, c)


FICHAS = [numeros_sistemas, calculo_fluxogramas, multiplos_divisores, fracoes_decimais, fracao_quantidade, decimais_potencias, porcentagem6, igualdade_partilha,
          plano_poligonos, prismas_piramides, triangulos_quadrilateros, retas_construcoes, angulos, plantas_areas, probabilidade_graficos]
