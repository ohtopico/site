"""3º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import TRACO, CLARO, figura, grupo, nome, quadro_dez, relogio, reta, svg
from desenhos2 import grafico_barras, malha, objeto3d, objeto_medida, pizza_fracao, planificacao, poligono_svg, pote, regua, regular, roleta
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, matriz, opcoes, pratos, problema, resposta, seq_numeros, tabela
from ano3 import frases, ligar, milhar


def h3(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='30 a 45 minutos'):
    return ficha(slug, titulo, '3º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def cx(t):
    return f'<p class="conta">{t}</p>'


def tc(t, c):
    return f'<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><p style="margin:0">{t}</p>{cx(c)}</div>'


def fila_h(*partes, gap=18):
    return f'<div style="display:flex;gap:{gap}px;justify-content:center;align-items:flex-end;flex-wrap:wrap">{"".join(partes)}</div>'


def rot(x, t):
    return f'<div style="display:inline-flex;flex-direction:column;align-items:center;gap:4px">{x}<b>{t}</b></div>'


def pilha(*partes):
    return f'<div style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:3px">{"".join(partes)}</div>'


def probs(textos, alt='16mm', colunas=2):
    return grade([problema(t, alt) for t in textos], colunas)


def lapis(cm, px=30):
    w = cm * px
    return svg(w + 22, 22, f'<rect x="10" y="4" width="{w - 16}" height="14" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/>'
               f'<path d="M{w - 6} 4 L{w + 10} 11 L{w - 6} 18z" fill="{CLARO["bege"]}" stroke="{TRACO}" stroke-width="2"/>', 'lapis', f'lápis de {cm} cm')


def blocos(n, larg, cor='verde'):
    inner = ''.join(f'<rect x="{10 + i * larg}" y="2" width="{larg}" height="18" fill="{CLARO[cor]}" stroke="{TRACO}" stroke-width="1.6"/>' for i in range(n))
    return svg(10 + n * larg + 4, 22, inner, 'blocos', f'{n} blocos')


def linha_cm(cm):
    w = cm * 37.8
    return (f'<div class="linha-medir"><svg viewBox="0 0 {w + 4:.0f} 10" width="{w + 4:.0f}" height="10" aria-hidden="true">'
            f'<path d="M2 5 H{w + 2:.0f}" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg> {resposta()} cm</div>')


def relogios(h1, m1, h2, m2, tam=92):
    return fila_h(relogio(h1, m1, tam), '<b style="align-self:center">até</b>', relogio(h2, m2, tam), gap=12)


def quad(cels, cel=24, cols=None, lins=None):
    """Figura na malha: cels é lista de (col, lin) pintadas."""
    cols = cols or max(c for c, _ in cels) + 1
    lins = lins or max(l for _, l in cels) + 1
    return malha(cols, lins, cel, pintadas=cels, rotulo=f'figura com {len(cels)} quadradinhos')


TRAP = poligono_svg([(24, 6), (76, 6), (100, 62), (2, 62)], rotulo='trapézio')
PARAL = poligono_svg([(30, 6), (110, 6), (82, 62), (2, 62)], rotulo='paralelogramo')
RET = poligono_svg([(4, 10), (110, 10), (110, 60), (4, 60)], rotulo='retângulo')
QUAD = regular(4, 36, -45, rotulo='quadrado')
TRI = regular(3, 36, rotulo='triângulo')


# ---------- Números ----------

def numeros_ate_9999():
    a = bloco(1, 'Cada cubo grande vale 1000. Que número é? Circule.', grade([
        item(milhar(1, 2, 0, 0), opcoes([1200, 2100], certa=1200), exemplo=True),
        item(milhar(2, 0, 3, 0), opcoes([2030, 230]))], 2), 'Comece pelos cubos grandes, depois as placas, as barras e os cubinhos.') + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes([1500, 1050])), item(opcoes([3000, 999]))], 2))
    b = bloco(1, 'Escreva o número por extenso.', frases(['2 450:', '3 008:', '1 999:'])) + bloco(
        2, 'Escreva &gt; ou &lt;.', grade([item(cx(f'2 450 {resposta("&lt;")} 2 540'), exemplo=True), item(cx(f'3 008 {VAZIO} 3 080')),
                                          item(cx(f'1 999 {VAZIO} 2 000')), item(cx(f'5 100 {VAZIO} 5 010'))], 2))
    c = bloco(1, 'Ordene do maior para o menor.', frases(['4 320, 4 230, 4 302, 3 420:', '9 090, 9 900, 9 009, 990:'])) + bloco(
        2, 'Escreva com algarismos.', frases(['seis mil e quarenta:', 'oito mil, trezentos e cinco:'])) + bloco(
        3, 'Leia e responda.', problema('A cidade de Ana tem 7 856 habitantes e a de Beto tem 7 865. Qual cidade tem mais habitantes? Como você sabe?', '16mm'))
    return h3(
        'ler-escrever-e-comparar-numeros-ate-9999', 'Ler, escrever e comparar números até 9999', 'EF03MA01',
        'Ler, escrever e comparar números até a unidade de milhar, usando o material dourado e o valor de cada algarismo.',
        'Material dourado (ou cubos desenhados), fichas com números, quadro de ordens no chão.',
        ['Mostre o cubo grande: 10 placas de 100 formam 1000.',
         'Monte números com o material e escreva no quadro de ordens.',
         'Para comparar, olhe primeiro os milhares, depois as centenas.',
         'Na versão C, o estudante ordena, escreve com algarismos e explica a comparação.'],
        ['Monte o número com o material antes de escrever. Leia o número em voz alta junto.',
         'Use sempre o mesmo quadro de ordens, com as mesmas cores para cada ordem.',
         'Faça um jogo rápido de "quem tem o maior" com fichas.'],
        ['Bloco 1: 1200; 2030. Bloco 2: 1500; 3000.',
         'Bloco 1: dois mil, quatrocentos e cinquenta; três mil e oito; mil, novecentos e noventa e nove. Bloco 2: &lt;; &lt;; &gt;.',
         'Bloco 1: 4 320, 4 302, 4 230, 3 420; 9 900, 9 090, 9 009, 990. Bloco 2: 6 040; 8 305. Bloco 3: a de Beto; milhares e centenas são iguais e 6 dezenas é mais que 5.'],
        a, b, c)


def compor_decompor_milhar():
    a = bloco(1, 'Junte as partes e circule o número.', grade([
        item(cx('1000 + 300 + 20 + 5'), opcoes([1325, 5231], certa=1325), exemplo=True),
        item(cx('2000 + 400 + 6'), opcoes([2406, 2460]))], 2)) + bloco(
        2, 'Quanto vale o 3 em 3 214? Circule.', item(cx('<b>3</b> 214'), opcoes([3, 3000])), 'O 3 está na casa dos milhares.')
    b = bloco(1, 'Escreva no quadro de ordens.', tabela(['Número', 'Milhar', 'Centena', 'Dezena', 'Unidade'], [
        ['3 214', '3', '2', '1', '4'], ['5 079', '', '', '', ''], ['8 600', '', '', '', ''], ['1 005', '', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Decomponha.', frases(['4 562 =', '7 030 =', '9 108 =']))
    c = bloco(1, 'Complete.', frases(['3 450 = 3 000 + 400 + 50 = 2 000 +', '6 200 = 62 centenas = quantas dezenas?'])) + bloco(
        2, 'Descubra o número.', frases(['5 milhares, 2 centenas e 7 unidades:', '4 milhares e 13 centenas:'])) + bloco(
        3, 'Leia e resolva.', problema('Uma fábrica tem 2 caixas com 1 000 parafusos, 4 pacotes com 100 e 9 parafusos soltos. Quantos parafusos são?', '16mm'))
    return h3(
        'compor-e-decompor-numeros-de-quatro-ordens', 'Compor e decompor números de quatro ordens', 'EF03MA02',
        'Reconhecer o valor de cada algarismo e compor e decompor números de até quatro ordens de jeitos diferentes.',
        'Material dourado, quadro de ordens, fichas sobrepostas (1000, 300, 20, 5).',
        ['Monte o número com fichas sobrepostas e depois separe as partes.',
         'Escreva no quadro de ordens: cada casa guarda um algarismo.',
         'Mostre que 13 centenas são 1 milhar e 3 centenas.',
         'Na versão C, o estudante decompõe de mais de um jeito.'],
        ['Use as fichas sobrepostas: o estudante vê o número inteiro e depois as partes.',
         'Pinte cada ordem de uma cor e mantenha as cores em todas as folhas.',
         'Faça trocas rápidas com o material: 10 placas por 1 cubo grande.'],
        ['Bloco 1: 1325; 2406. Bloco 2: 3000.',
         'Bloco 1: 5, 0, 7, 9; 8, 6, 0, 0; 1, 0, 0, 5. Bloco 2: 4 000 + 500 + 60 + 2; 7 000 + 30; 9 000 + 100 + 8.',
         'Bloco 1: 1 450; 620 dezenas. Bloco 2: 5 207; 5 300. Bloco 3: 2 409 parafusos.'],
        a, b, c)


def fatos_adicao_multiplicacao():
    a = bloco(1, 'Conte os grupos. Circule o total.', grade([
        item(pratos(3, 2), cx('3 × 2') + opcoes([6, 5], certa=6), exemplo=True),
        item(pratos(2, 4, 'estrela'), cx('2 × 4') + opcoes([8, 6]))], 2)) + bloco(
        2, 'Dobro: some o número com ele mesmo. Circule.', item(cx('4 + 4'), opcoes([8, 44])))
    b = bloco(1, 'Complete.', grade([item(conta(6, '+', 6)), item(conta(7, '+', 8)), item(conta(9, '+', 9)),
                                     item(conta(5, '×', 3)), item(conta(4, '×', 4)), item(conta(2, '×', 8))], 3)) + bloco(
        2, 'Use o fato que você já sabe.', frases(['Se 5 + 5 = 10, então 5 + 6 =', 'Se 3 × 4 = 12, então 4 × 3 =']))
    c = bloco(1, 'Calcule de cabeça.', frases(['8 + 7 =', '6 × 5 =', '9 × 3 ='])) + bloco(
        2, 'Complete a tabela.', tabela(['×', '2', '3', '4', '5', '10'], [['3', '', '', '', '', ''], ['4', '', '', '', '', ''], ['6', '', '', '', '', '']])) + bloco(
        3, 'Leia e resolva.', problema('Tenho 4 caixas com 6 ovos. Ganhei mais 5 ovos. Quantos ovos tenho?', '16mm'))
    return h3(
        'fatos-basicos-de-adicao-e-multiplicacao', 'Fatos básicos de adição e de multiplicação', 'EF03MA03',
        'Construir e lembrar os fatos básicos da adição e da multiplicação para calcular de cabeça ou no papel.',
        'Cartões de fatos, dominó de contas, tabela de multiplicação de parede.',
        ['Comece pelos dobros: 4 + 4, 6 + 6.',
         'Use um fato conhecido para achar outro: 5 + 5 = 10, então 5 + 6 = 11.',
         'Mostre que 3 × 4 e 4 × 3 dão o mesmo resultado.',
         'Na versão C, o estudante completa a tabela e usa os fatos num problema.'],
        ['Poucos fatos por vez, com material concreto. Repita os mesmos cartões em dias seguidos.',
         'Mantenha a tabela de multiplicação sempre no mesmo lugar da sala.',
         'Faça rodadas curtas de cartões, com tempo marcado e pausa.'],
        ['Bloco 1: 6; 8. Bloco 2: 8.',
         'Bloco 1: 12; 15; 18; 15; 16; 16. Bloco 2: 11; 12.',
         'Bloco 1: 15; 30; 27. Bloco 2: linha 3: 6, 9, 12, 15, 30; linha 4: 8, 12, 16, 20, 40; linha 6: 12, 18, 24, 30, 60. Bloco 3: 29 ovos.'],
        a, b, c)


def reta_numerica():
    a = bloco(1, 'Dê os pulos na reta. Onde você chega? Circule.', grade([
        item(reta(0, 10, saltos=((3, 7),), destaque=(3,)), '<p class="legenda">saí do 3 e dei 4 pulos</p>' + opcoes([7, 4], certa=7), exemplo=True),
        item(reta(0, 10, saltos=((2, 8),), destaque=(2,)), '<p class="legenda">saí do 2 e dei 6 pulos</p>' + opcoes([8, 6]))], 1)) + bloco(
        2, 'Qual número fica entre 5 e 7? Circule.', item(opcoes([6, 8])))
    b = bloco(1, 'Complete a reta de 100 em 100.', seq_numeros([0, 100, 200, None, 400, None, 600, None])) + bloco(
        2, 'O número está mais perto do 300 ou do 400?', frases(['320:', '380:', '390:']))
    c = bloco(1, 'Desenhe uma reta de 1 000 a 2 000, de 100 em 100. Marque 1 500 e 1 900.', caixa_desenho('24mm')) + bloco(
        2, 'Ordene do menor para o maior.', frases(['1 250, 1 052, 1 520, 1 205:'])) + bloco(
        3, 'Responda.', frases(['Qual número fica no meio entre 2 000 e 3 000?', 'Qual número fica no meio entre 450 e 550?']))
    return h3(
        'numeros-na-reta-numerica', 'Números na reta numérica', 'EF03MA04',
        'Relacionar números naturais a pontos da reta numérica e usar a reta para ordenar e comparar.',
        'Fita crepe no chão como reta, cartões com números, pregadores.',
        ['Faça uma reta no chão e ande os pulos com o corpo.',
         'Pendure números num barbante na ordem certa.',
         'Mostre que a distância entre os números é sempre igual.',
         'Na versão C, o estudante desenha a reta com outra escala.'],
        ['Ande na reta do chão antes de usar a da folha. Pulos contados em voz alta.',
         'A reta sempre começa à esquerda. Use a mesma cor para o ponto de partida.',
         'Use a reta do chão para jogos de pulo: quem chega primeiro ao 10.'],
        ['Bloco 1: 7; 8. Bloco 2: 6.', 'Bloco 1: 300, 500, 700. Bloco 2: 300; 400; 400.',
         'Bloco 1: reta com 1 000, 1 100, ..., 2 000 e as marcas. Bloco 2: 1 052, 1 205, 1 250, 1 520. Bloco 3: 2 500; 500.'],
        a, b, c)


def calculo_adicao_subtracao():
    a = bloco(1, 'Some as dezenas e depois as unidades. Circule o total.', grade([
        item(cx('23 + 14') + '<p class="legenda">20 + 10 = 30 e 3 + 4 = 7</p>', opcoes([37, 73], certa=37), exemplo=True),
        item(cx('32 + 25') + '<p class="legenda">30 + 20 = 50 e 2 + 5 = 7</p>', opcoes([57, 75]))], 2)) + bloco(
        2, 'Tire as dezenas. Circule.', item(cx('48 − 20'), opcoes([28, 68])))
    b = bloco(1, 'Calcule.', grade([item(conta(245, '+', 132)), item(conta(368, '−', 145)), item(conta(156, '+', 27)), item(conta(400, '−', 150))], 2)) + bloco(
        2, 'Calcule de cabeça, usando o número redondo.', frases(['99 + 25 (pense em 100 + 25 − 1):', '73 − 19 (pense em 73 − 20 + 1):']))
    c = bloco(1, 'Calcule no papel e confira de cabeça.', grade([item(conta(487, '+', 256)), item(conta(702, '−', 358))], 2)) + bloco(
        2, 'Estime antes de calcular: o resultado é maior ou menor que 500?', frases(['198 + 315:', '812 − 290:'])) + bloco(
        3, 'Explique como você calcula 1 000 − 1 de cabeça.', linhas(2))
    return h3(
        'jeitos-de-calcular-adicao-e-subtracao', 'Jeitos de calcular adição e subtração', 'EF03MA05',
        'Usar cálculo mental, estimativa e o algoritmo para resolver adições e subtrações.',
        'Material dourado, reta numérica, quadro de ordens.',
        ['Mostre dois jeitos: separar dezenas e unidades, e o algoritmo no quadro de ordens.',
         'Use números redondos: 99 é quase 100.',
         'Antes de calcular, estime se o resultado é maior ou menor que um número.',
         'Na versão C, o estudante confere o algoritmo com o cálculo mental.'],
        ['Faça a conta com o material dourado ao lado. Uma conta por vez.',
         'Escreva sempre do mesmo jeito: unidades embaixo de unidades.',
         'Proponha corridas: quem estima mais perto ganha ponto.'],
        ['Bloco 1: 37; 57. Bloco 2: 28.', 'Bloco 1: 377; 223; 183; 250. Bloco 2: 124; 54.',
         'Bloco 1: 743; 344. Bloco 2: maior (513); maior (522). Bloco 3: voltar um a partir de 1 000: 999.'],
        a, b, c)


def problemas_significados():
    a = bloco(1, 'Leia e circule a resposta.', grade([
        item(tc('Tinha 12 figurinhas e ganhei 5.', '12 + 5'), opcoes([17, 7], certa=17), exemplo=True),
        item(tc('Tinha 15 balas e comi 6.', '15 − 6'), opcoes([9, 21]))], 2), 'Ganhei: somo. Comi: tiro.') + bloco(
        2, 'Tenho 7. Quantos faltam para 10? Circule.', item(quadro_dez(7), opcoes([3, 17])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Na festa havia 136 crianças e 48 adultos. Quantas pessoas havia?', 'A loja tinha 250 bonés e vendeu 120. Quantos sobraram?',
        'Lia tem 85 figurinhas e Rui tem 60. Quantas Lia tem a mais?', 'O álbum tem 200 figurinhas. Já colei 145. Quantas faltam?']))
    c = bloco(1, 'Leia e resolva.', probs([
        'Um ônibus saiu com 42 pessoas. No ponto, desceram 15 e subiram 9. Quantas pessoas estão no ônibus?',
        'Paulo tinha algumas bolinhas, ganhou 25 e ficou com 70. Quantas bolinhas ele tinha?'], '20mm')) + bloco(
        2, 'Invente um problema de comparar e outro de completar.', linhas(3))
    return h3(
        'problemas-de-juntar-tirar-comparar-e-completar', 'Problemas de juntar, tirar, comparar e completar', 'EF03MA06',
        'Resolver e criar problemas de adição e subtração com as ideias de juntar, acrescentar, retirar, comparar e completar.',
        'Fichas com problemas, material concreto, cartões com as palavras-chave.',
        ['Leia o problema em voz alta e conte a história com objetos.',
         'Pergunte: estamos juntando, tirando, comparando ou completando?',
         'Desenhe antes de fazer a conta.',
         'Na versão C, o estudante resolve problemas de duas etapas e cria os seus.'],
        ['Encene o problema com objetos de verdade. Um problema por vez.',
         'Use cartões fixos com as ideias (juntar, tirar, comparar, completar) e um desenho para cada.',
         'Leia em partes e peça para marcar os números com o lápis.'],
        ['Bloco 1: 17; 9. Bloco 2: 3.', 'Bloco 1: 184 pessoas; 130 bonés; 25 a mais; faltam 55.',
         'Bloco 1: 36 pessoas; 45 bolinhas. Bloco 2: resposta pessoal.'],
        a, b, c)


def multiplicacao_retangular():
    a = bloco(1, 'Conte as linhas e as bolinhas de cada linha. Circule o total.', grade([
        item(matriz(2, 5), cx('2 × 5') + opcoes([10, 7], certa=10), exemplo=True),
        item(matriz(3, 4), cx('3 × 4') + opcoes([12, 7]))], 2)) + bloco(
        2, 'Cada mão tem 5 dedos. Quantos dedos há em 2 mãos? Circule.', item(cx('5 + 5'), opcoes([10, 7])))
    b = bloco(1, 'Escreva a multiplicação de cada arrumação.', grade([
        item(matriz(4, 3), resposta('4 × 3 = 12', '34mm'), exemplo=True), item(matriz(5, 2), resposta(largura='34mm')), item(matriz(2, 10, 16), resposta(largura='34mm'))], 3)) + bloco(
        2, 'Leia e resolva.', probs(['Cada pacote tem 10 balas. Quantas balas há em 4 pacotes?', 'Uma caixa tem 2 fileiras com 5 ovos. Quantos ovos há na caixa?']))
    c = bloco(1, 'Desenhe a arrumação e calcule.', grade([caixa_desenho('26mm', '3 × 5'), caixa_desenho('26mm', '4 × 10')], 2)) + bloco(
        2, 'Leia e resolva.', probs(['A sala tem 4 fileiras com 5 carteiras. Chegaram mais 3 carteiras. Quantas carteiras há agora?',
                                     'Comprei 3 cadernos de R$ 10. Quanto gastei?'])) + bloco(
        3, 'Invente um problema que se resolve com 5 × 4.', linhas(2))
    return h3(
        'multiplicacao-por-2-3-4-5-e-10', 'Multiplicação por 2, 3, 4, 5 e 10', 'EF03MA07',
        'Resolver e criar problemas de multiplicação com grupos iguais e com arrumação em linhas e colunas.',
        'Tampinhas, caixas de ovos, papel quadriculado.',
        ['Arrume tampinhas em linhas iguais e conte de dois jeitos.',
         'Escreva a adição de parcelas iguais e depois a multiplicação.',
         'Mostre caixas de ovos e cartelas: linhas vezes colunas.',
         'Na versão C, o estudante desenha a arrumação e cria problemas.'],
        ['Arrume objetos de verdade antes de olhar o desenho. Conte linha por linha.',
         'Use sempre a mesma arrumação: linhas na horizontal, de cima para baixo.',
         'Faça a turma se arrumar em fileiras e contar as pessoas.'],
        ['Bloco 1: 10; 12. Bloco 2: 10.', 'Bloco 1: 4 × 3 = 12; 5 × 2 = 10; 2 × 10 = 20. Bloco 2: 40 balas; 10 ovos.',
         'Bloco 1: 15; 40. Bloco 2: 23 carteiras; R$ 30. Bloco 3: resposta pessoal.'],
        a, b, c)


def divisao_com_resto():
    a = bloco(1, 'Reparta igualmente. Quantos ficam em cada prato? Circule.', grade([
        item(pratos(2, 3), cx('6 ÷ 2') + opcoes([3, 4], certa=3), exemplo=True),
        item(pratos(4, 2, 'estrela'), cx('8 ÷ 4') + opcoes([2, 4]))], 2)) + bloco(
        2, 'São 7 bolas para 2 crianças. Cada uma ganha 3. Sobrou alguma? Circule.', item(grupo('bola', 7, 7, 34, 6), opcoes(['sobrou 1', 'não sobrou'])))
    b = bloco(1, 'Divida e diga quanto sobra.', tabela(['Divisão', 'Cada um recebe', 'Sobra'], [
        ['10 ÷ 2', '5', '0'], ['13 ÷ 3', '', ''], ['20 ÷ 5', '', ''], ['17 ÷ 4', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Leia e resolva.', probs(['Vou guardar 24 lápis em 4 estojos, a mesma quantidade em cada. Quantos lápis em cada estojo?',
                                     'Vou dividir 15 figurinhas entre 2 amigos. Quantas cada um ganha? Quantas sobram?']))
    c = bloco(1, 'Leia e resolva.', probs([
        'A turma tem 29 estudantes. Quantos grupos de 5 dá para formar? Quantos estudantes sobram?',
        'Um passeio tem 38 pessoas e cada carro leva 4. Quantos carros são necessários?'], '20mm')) + bloco(
        2, 'Invente uma divisão que tenha resto 2.', linhas(2))
    return h3(
        'divisao-com-resto-e-sem-resto', 'Divisão com resto e sem resto', 'EF03MA08',
        'Resolver e criar problemas de divisão por números até 10, com resto zero e com resto diferente de zero.',
        'Pratos de papel, tampinhas, saquinhos.',
        ['Reparta tampinhas em pratos, uma por vez em cada prato.',
         'Mostre o que sobra quando não dá para repartir igual.',
         'Escreva a divisão: total, em quantos grupos, quanto em cada um e o resto.',
         'Na versão C, o estudante decide o que fazer com o resto (o carro que leva menos pessoas).'],
        ['Reparta com objetos de verdade: um para você, um para mim. Poucos objetos.',
         'Use sempre os mesmos pratos e a mesma ordem: repartir, contar, ver o que sobrou.',
         'Faça a divisão em pé, formando grupos com a turma.'],
        ['Bloco 1: 3; 2. Bloco 2: sobrou 1.', 'Bloco 1: 4 e sobra 1; 4 e sobra 0; 4 e sobra 1. Bloco 2: 6 lápis; 7 cada um e sobra 1.',
         'Bloco 1: 5 grupos e sobram 4; 10 carros (9 cheios e 1 com 2 pessoas). Bloco 2: por exemplo, 17 ÷ 5.'],
        a, b, c)


def partes_iguais():
    a = bloco(1, 'Quanto é a metade? Circule.', grade([
        item(grupo('maca', 8, 4, 34, 6), '<p class="legenda">metade de 8</p>' + opcoes([4, 2], certa=4), exemplo=True),
        item(grupo('estrela', 6, 3, 34, 6), '<p class="legenda">metade de 6</p>' + opcoes([3, 2]))], 2)) + bloco(
        2, 'A pizza foi cortada em 4 partes iguais. Uma parte é: Circule.', item(pizza_fracao(4, 1, 100), opcoes(['um quarto', 'a metade'])))
    b = bloco(1, 'Complete.', frases(['A metade de 20 é', 'A terça parte de 12 é', 'A quarta parte de 20 é', 'A quinta parte de 15 é', 'A décima parte de 30 é'])) + bloco(
        2, 'Pinte a terça parte das bolinhas.', item(matriz(3, 3)), 'Separe as bolinhas em 3 grupos iguais.')
    c = bloco(1, 'Leia e resolva.', probs(['Uma fita de 40 cm foi cortada em 4 partes iguais. Quanto mede cada parte?',
                                          'Tenho R$ 50 e gastei a décima parte. Quanto gastei? Quanto sobrou?'])) + bloco(
        2, 'O que é maior: a metade de 18 ou a terça parte de 30? Explique.', linhas(2))
    return h3(
        'metade-terca-quarta-quinta-e-decima-parte', 'Metade, terça, quarta, quinta e décima parte', 'EF03MA09',
        'Relacionar a divisão exata às ideias de metade, terça, quarta, quinta e décima parte de uma quantidade.',
        'Tampinhas, papel para dobrar, pizza de papel.',
        ['Dobre uma folha ao meio: duas partes iguais, cada uma é a metade.',
         'Reparta 12 tampinhas em 3 grupos: cada grupo é a terça parte.',
         'Ligue as palavras às divisões: terça parte é dividir por 3.',
         'Na versão C, o estudante usa as partes em problemas e compara.'],
        ['Dobre e corte papel de verdade. Comece só pela metade.',
         'Use um cartaz fixo: metade ÷ 2, terça ÷ 3, quarta ÷ 4, quinta ÷ 5, décima ÷ 10.',
         'Reparta objetos entre grupos da turma, com movimento.'],
        ['Bloco 1: 4; 3. Bloco 2: um quarto.', 'Bloco 1: 10; 4; 5; 3; 3. Bloco 2: 3 bolinhas pintadas.',
         'Bloco 1: 10 cm; gastei R$ 5 e sobraram R$ 45. Bloco 2: a terça parte de 30 (10), porque a metade de 18 é 9.'],
        a, b, c)


# ---------- Álgebra ----------

def regularidades_numericas():
    a = bloco(1, 'Os números aumentam de 10 em 10. Qual vem depois? Circule.', grade([
        item(seq_numeros([10, 20, 30, None]), opcoes([40, 31], certa=40), exemplo=True),
        item(seq_numeros([100, 110, 120, None]), opcoes([130, 121]))], 2)) + bloco(
        2, 'Os números diminuem de 5 em 5. Qual vem depois? Circule.', item(seq_numeros([50, 45, 40, None]), opcoes([35, 39])))
    b = bloco(1, 'Complete e escreva a regra.', frases(['200, 300, 400, ___, ___. Regra:', '96, 86, 76, ___, ___. Regra:', '3, 6, 9, 12, ___, ___. Regra:'])) + bloco(
        2, 'Qual número não segue a regra? Circule e corrija.', frases(['5, 10, 15, 21, 25:', '80, 70, 60, 55, 40:']))
    c = bloco(1, 'Descubra a regra e o 10º número.', frases(['4, 8, 12, 16, ... O 10º número:', '1 000, 950, 900, 850, ... O 10º número:'])) + bloco(
        2, 'Escreva 6 números que aumentam de 25 em 25, começando no 100.', linhas(1)) + bloco(
        3, 'Na sequência 7, 14, 21, 28, ... o número 50 aparece? Por quê?', linhas(2))
    return h3(
        'regularidades-em-sequencias-numericas', 'Regularidades em sequências numéricas', 'EF03MA10',
        'Achar a regra de sequências de números que aumentam ou diminuem sempre o mesmo valor e continuar a sequência.',
        'Reta numérica, quadro de 100, cartões com números.',
        ['Pinte no quadro de 100 os números de 10 em 10 e veja o padrão.',
         'Pergunte: quanto aumentou de um número para o outro?',
         'Peça para achar o erro numa sequência.',
         'Na versão C, o estudante prevê um número distante na sequência.'],
        ['Use a reta e dê os pulos com o dedo. Sequências curtas.',
         'Escreva a regra sempre do mesmo jeito: aumenta de ___ em ___.',
         'Faça a sequência batendo palmas ou pulando.'],
        ['Bloco 1: 40; 130. Bloco 2: 35.', 'Bloco 1: 500, 600, aumenta de 100 em 100; 66, 56, diminui de 10 em 10; 15, 18, aumenta de 3 em 3. Bloco 2: 21 (o certo é 20); 55 (o certo é 50).',
         'Bloco 1: aumenta de 4 em 4, o 10º é 40; diminui de 50 em 50, o 10º é 550. Bloco 2: 100, 125, 150, 175, 200, 225. Bloco 3: não, a sequência pula do 49 para o 56.'],
        a, b, c)


def igualdades():
    a = bloco(1, 'Os dois lados dão o mesmo total? Circule sim ou não.', grade([
        item(cx('3 + 2 = 4 + 1'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(cx('5 + 1 = 3 + 2'), opcoes(['sim', 'não']))], 2)) + bloco(
        2, 'Qual conta dá o mesmo que 6 + 4? Circule.', item(opcoes(['7 + 3', '5 + 2'])))
    b = bloco(1, 'Complete para os dois lados ficarem iguais.', grade([
        item(cx(f'8 + 2 = 5 + {resposta(5)}'), exemplo=True), item(cx(f'12 + 4 = 10 + {VAZIO}')),
        item(cx(f'20 − 5 = {VAZIO} + 5')), item(cx(f'7 + 7 = {VAZIO} + 4'))], 2)) + bloco(
        2, 'Escreva três contas diferentes que dão 15.', linhas(1))
    c = bloco(1, 'Verdadeiro ou falso? Corrija as falsas.', frases(['25 + 15 = 30 + 10', '50 − 20 = 40 − 10', '3 × 4 = 2 × 6', '100 − 30 = 60 + 20'])) + bloco(
        2, 'Complete.', frases(['36 + 18 = 40 +', '75 − 28 = 77 −'])) + bloco(
        3, 'Explique por que 46 + 29 = 45 + 30.', linhas(2))
    return h3(
        'igualdades-com-o-mesmo-resultado', 'Igualdades com o mesmo resultado', 'EF03MA11',
        'Entender o sinal de igual como equilíbrio e escrever sentenças diferentes com o mesmo resultado.',
        'Balança de pratos (ou desenho), cubinhos de encaixe.',
        ['Coloque cubinhos nos dois pratos da balança: equilibrou, é igual.',
         'Mostre que 3 + 2 e 4 + 1 dão o mesmo total.',
         'Escreva sentenças com contas dos dois lados do sinal de igual.',
         'Na versão C, o estudante explica a compensação: tiro de um, ponho no outro.'],
        ['Use a balança de verdade com cubinhos. Contas com números pequenos.',
         'Explique que o igual quer dizer "vale o mesmo", não "a resposta vem agora".',
         'Faça desafios rápidos em duplas: um escreve, o outro equilibra.'],
        ['Bloco 1: sim; não. Bloco 2: 7 + 3.', 'Bloco 1: 5; 6; 10; 10. Bloco 2: por exemplo 10 + 5, 20 − 5, 3 × 5.',
         'Bloco 1: verdadeiro; verdadeiro; verdadeiro; falso (70 e 80). Bloco 2: 14; 30. Bloco 3: tirei 1 do 46 e coloquei no 29, o total não muda.'],
        a, b, c)


# ---------- Geometria ----------

def solidos_e_objetos():
    o = lambda t: objeto3d(t, 70)
    a = bloco(1, 'O objeto parece qual sólido? Circule.', grade([
        item(o('bola'), opcoes(['esfera', 'cubo'], certa='esfera'), exemplo=True), item(o('lata'), opcoes(['cilindro', 'cone'])),
        item(o('dado'), opcoes(['cubo', 'esfera']))], 2)) + bloco(
        2, 'Qual destes objetos rola? Circule.', item(opcoes([o('bola'), o('dado')])))
    b = bloco(1, 'Escreva o nome do sólido que cada objeto lembra.', grade([
        item(o('casquinha'), resposta(largura='34mm')), item(o('caixa'), resposta(largura='34mm')), item(o('chapeu'), resposta(largura='34mm')), item(o('lata'), resposta(largura='34mm'))], 4),
        'Nomes: cubo, bloco retangular, esfera, cilindro, cone.') + bloco(
        2, 'Escreva um objeto da sua casa que parece uma esfera.', linhas(1))
    c = bloco(1, 'Escreva dois objetos da escola que parecem cada sólido.', tabela(['Sólido', 'Objetos'], [
        ['cubo', ''], ['bloco retangular', ''], ['cilindro', ''], ['esfera', ''], ['cone', '']])) + bloco(
        2, 'A lata parece um cilindro. Por quê?', linhas(2))
    return h3(
        'solidos-geometricos-e-objetos-do-dia-a-dia', 'Sólidos geométricos e objetos do dia a dia', 'EF03MA13',
        'Associar figuras espaciais (cubo, bloco retangular, esfera, cilindro, cone, pirâmide) a objetos do mundo e nomeá-las.',
        'Caixa com objetos (bola, lata, dado, caixa de sapato, casquinha), sólidos de madeira ou papel.',
        ['Tire os objetos da caixa um por vez e compare com os sólidos.',
         'Pergunte: rola? Fica em pé? Tem ponta?',
         'Faça uma caça aos sólidos pela escola.',
         'Na versão C, o estudante explica a semelhança.'],
        ['Pegue e gire o objeto e o sólido juntos. Poucos sólidos por vez.',
         'Use um cartaz com cada sólido e o nome, sempre no mesmo lugar.',
         'A caça aos sólidos pela escola dá movimento à atividade.'],
        ['Bloco 1: esfera; cilindro; cubo. Bloco 2: a bola.', 'Bloco 1: cone; bloco retangular; cone; cilindro. Bloco 2: resposta pessoal (bola, laranja).',
         'Bloco 1: resposta pessoal. Bloco 2: tem duas bases redondas iguais e rola.'],
        a, b, c)


def prismas_piramides():
    a = bloco(1, 'Esta planificação monta qual sólido? Circule.', grade([
        item(planificacao('cubo', 24), opcoes(['cubo', 'cone'], certa='cubo'), exemplo=True),
        item(planificacao('cilindro', 24), opcoes(['cilindro', 'pirâmide']))], 2), 'Recorte e monte uma planificação de verdade.')
    b = bloco(1, 'Escreva o nome do sólido de cada planificação.', grade([
        item(planificacao('piramide', 22), resposta(largura='34mm')), item(planificacao('prisma', 22), resposta(largura='34mm')),
        item(planificacao('cone', 22), resposta(largura='34mm'))], 3)) + bloco(
        2, 'Complete a tabela.', tabela(['Sólido', 'Faces', 'Vértices'], [['cubo', '6', '8'], ['pirâmide de base quadrada', '', ''], ['bloco retangular', '', '']]),
        'A primeira linha é o exemplo.')
    c = bloco(1, 'Complete a tabela.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas'], [
        ['cubo', '', '', ''], ['pirâmide de base quadrada', '', '', ''], ['prisma de base triangular', '', '', '']])) + bloco(
        2, 'Qual a diferença entre um prisma e uma pirâmide?', linhas(2)) + bloco(
        3, 'Por que o cilindro e o cone rolam e o cubo não?', linhas(1))
    return h3(
        'prismas-piramides-e-planificacoes', 'Prismas, pirâmides e planificações', 'EF03MA14',
        'Descrever prismas, pirâmides, cilindros e cones e relacioná-los com as suas planificações.',
        'Caixas para desmontar, planificações para recortar, sólidos.',
        ['Desmonte uma caixa e mostre a planificação.',
         'Recorte e monte o cubo e a pirâmide.',
         'Conte faces, vértices e arestas com adesivos.',
         'Na versão C, o estudante compara prismas e pirâmides.'],
        ['Desmontar e montar com as mãos ajuda muito. Um sólido por aula.',
         'Use sempre as mesmas palavras: face, vértice, aresta, com um cartaz.',
         'Desafio: montar a caixa no menor tempo.'],
        ['Bloco 1: cubo; cilindro.', 'Bloco 1: pirâmide; prisma; cone. Bloco 2: 5 e 5; 6 e 8.',
         'Bloco 1: 6, 8, 12; 5, 5, 8; 5, 6, 9. Bloco 2: o prisma tem duas bases iguais e a pirâmide tem uma base e uma ponta. Bloco 3: têm parte redonda.'],
        a, b, c)


def classificar_figuras():
    a = bloco(1, 'Quantos lados tem a figura? Circule.', grade([
        item(TRI, opcoes([3, 4], certa=3), exemplo=True), item(QUAD, opcoes([4, 3])), item(TRAP, opcoes([4, 5]))], 3)) + bloco(
        2, 'Quantos vértices (pontas) tem o triângulo? Circule.', item(TRI, opcoes([3, 2])))
    b = bloco(1, 'Complete a tabela.', tabela(['Figura', 'Lados', 'Vértices', 'Nome'], [
        [regular(3, 20), '3', '3', 'triângulo'], [regular(4, 20, -45), '', '', ''], [poligono_svg([(14, 4), (46, 4), (60, 34), (2, 34)]), '', '', ''],
        [poligono_svg([(18, 4), (64, 4), (48, 34), (2, 34)]), '', '', ''], [poligono_svg([(2, 6), (64, 6), (64, 34), (2, 34)]), '', '', '']]),
        'Nomes: quadrado, retângulo, trapézio, paralelogramo.')
    c = bloco(1, 'Desenhe na malha um trapézio e um paralelogramo.', malha(14, 5, 26)) + bloco(
        2, 'O que o quadrado, o retângulo, o trapézio e o paralelogramo têm em comum?', linhas(1)) + bloco(
        3, 'Qual a diferença entre o quadrado e o retângulo?', linhas(2))
    return h3(
        'triangulos-e-quadrilateros-lados-e-vertices', 'Triângulos e quadriláteros: lados e vértices', 'EF03MA15',
        'Classificar e comparar triângulos, quadrados, retângulos, trapézios e paralelogramos pelos lados e vértices.',
        'Figuras de papel, canudos e massinha para montar figuras, geoplano.',
        ['Monte figuras com canudos (lados) e massinha (vértices).',
         'Conte os lados e os vértices de cada figura.',
         'Separe as figuras de 3 e de 4 lados.',
         'Na versão C, o estudante desenha e compara quadriláteros.'],
        ['Passe o dedo nos lados e conte junto. Figuras grandes, recortadas.',
         'Use um cartaz com o nome e o desenho de cada figura.',
         'Monte figuras com o corpo, em grupos, deitados no chão.'],
        ['Bloco 1: 3; 4; 4. Bloco 2: 3.', 'Bloco 1: quadrado 4 e 4; trapézio 4 e 4; paralelogramo 4 e 4; retângulo 4 e 4.',
         'Bloco 1: desenhos. Bloco 2: todos têm 4 lados e 4 vértices. Bloco 3: o quadrado tem os 4 lados iguais; o retângulo tem lados de dois tamanhos.'],
        a, b, c)


def figuras_congruentes():
    L = [(0, 0), (0, 1), (0, 2), (1, 2)]
    L2 = [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]
    a = bloco(1, 'Qual figura é igual ao modelo? Circule o número.', grade([
        item(fila_h(rot(quad(L), 'modelo'), rot(quad(L), '1'), rot(quad(L2), '2')), opcoes(['1', '2'], certa='1'), exemplo=True),
        item(fila_h(rot(quad([(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)]), 'modelo'), rot(quad([(0, 0), (1, 0), (0, 1), (1, 1)]), '1'),
                    rot(quad([(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)]), '2')), opcoes(['1', '2']))], 1),
        'Iguais: mesmo tamanho e mesma forma.')
    b = bloco(1, 'Desenhe ao lado uma figura igual à pintada.', item(malha(12, 5, 26, pintadas=[(1, 1), (2, 1), (3, 1), (1, 2), (1, 3)]))) + bloco(
        2, 'As duas figuras são iguais (congruentes)? Escreva sim ou não.', grade([
            item(fila_h(quad([(0, 0), (1, 0), (2, 0)]), quad([(0, 0), (0, 1), (0, 2)])), resposta(largura='30mm')),
            item(fila_h(quad([(0, 0), (1, 0), (0, 1), (1, 1)]), quad([(c, l) for c in range(3) for l in range(3)])), resposta(largura='30mm'))], 2),
        'Pode girar a figura.')
    c = bloco(1, 'Desenhe a figura girada, sem mudar o tamanho.', item(malha(12, 5, 26, pintadas=[(1, 1), (1, 2), (1, 3), (2, 3)]))) + bloco(
        2, 'Duas figuras com o mesmo número de quadradinhos são sempre congruentes? Explique com um desenho.', malha(14, 3, 22) + linhas(1))
    return h3(
        'figuras-congruentes', 'Figuras congruentes', 'EF03MA16',
        'Reconhecer figuras congruentes (mesma forma e mesmo tamanho) por sobreposição e desenho em malha.',
        'Figuras recortadas em pares, papel vegetal, malha quadriculada.',
        ['Recorte duas figuras e coloque uma sobre a outra.',
         'Gire uma figura e mostre que continua igual.',
         'Copie figuras na malha contando os quadradinhos.',
         'Na versão C, o estudante gira figuras e explica a diferença entre área igual e figura igual.'],
        ['Sobreponha figuras recortadas com as mãos. Poucas figuras.',
         'Conte os quadradinhos sempre na mesma ordem: de cima para baixo.',
         'Faça um jogo da memória com pares de figuras congruentes.'],
        ['Bloco 1: 1; 2.', 'Bloco 1: figura igual desenhada. Bloco 2: sim (girada); não (tamanhos diferentes).',
         'Bloco 1: figura girada com 4 quadradinhos. Bloco 2: não; 4 quadradinhos em linha e um quadrado 2 por 2 têm a mesma área, mas formas diferentes.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def medida_e_unidade():
    a = bloco(1, 'Quantos blocos cabem no lápis? Circule.', grade([
        item(pilha(lapis(6), blocos(6, 30)), '<p class="legenda">blocos pequenos</p>' + opcoes([6, 3], certa=6), exemplo=True),
        item(pilha(lapis(6), blocos(3, 60, 'rosa')), '<p class="legenda">blocos grandes</p>' + opcoes([3, 6]))], 2)) + bloco(
        2, 'O lápis é o mesmo. Com os blocos grandes, o número ficou: Circule.', item(opcoes(['menor', 'maior'])))
    b = bloco(1, 'Meça a sua carteira com três unidades.', tabela(['Unidade', 'Medida'], [['palmo', ''], ['lápis', ''], ['clipe', '']])) + bloco(
        2, 'Ana mediu a porta com 10 palmos e Rui com 12 palmos. A porta mudou? Por que os números são diferentes?', linhas(2))
    c = bloco(1, 'Responda.', frases(['Uma corda mede 6 passos de Ana ou 9 passos de Beto. Quem tem o passo maior?', 'Quanto maior a unidade, o número da medida fica'])) + bloco(
        2, 'Por que usamos o metro e não o palmo para comprar tecido?', linhas(2)) + bloco(
        3, 'Leia e resolva.', problema('Uma mesa mede 4 lápis. Cada lápis mede 15 cm. Quanto mede a mesa?', '14mm'))
    return h3(
        'a-medida-depende-da-unidade', 'A medida depende da unidade', 'EF03MA17',
        'Perceber que o número de uma medida muda quando a unidade muda, e por isso usamos unidades padronizadas.',
        'Palmos, lápis, clipes, barbantes, régua e fita métrica.',
        ['Meça a mesma mesa com palmos de duas pessoas.',
         'Compare: o palmo maior deu um número menor.',
         'Mostre a régua: todo centímetro é igual para todos.',
         'Na versão C, o estudante explica a relação entre o tamanho da unidade e o número.'],
        ['Meça de verdade, com o corpo e com objetos. Registre com ajuda.',
         'Use sempre a mesma tabela: unidade e quanto mediu.',
         'Meça coisas pela sala em duplas, com movimento.'],
        ['Bloco 1: 6; 3. Bloco 2: menor.', 'Bloco 1: resposta pessoal. Bloco 2: não mudou; os palmos têm tamanhos diferentes.',
         'Bloco 1: Ana; menor. Bloco 2: o metro é igual para todos, o palmo muda de pessoa para pessoa. Bloco 3: 60 cm.'],
        a, b, c)


def unidade_e_instrumento():
    o = lambda t: objeto_medida(t, 64)
    a = bloco(1, 'Para medir, eu uso: Circule.', grade([
        item(lapis(4), '<p class="legenda">o comprimento do lápis</p>' + opcoes(['régua', 'balança'], certa='régua'), exemplo=True),
        item(o('melancia'), '<p class="legenda">o peso da melancia</p>' + opcoes(['balança', 'régua']))], 2)) + bloco(
        2, 'Para medir a água da garrafa, eu uso: Circule.', item(o('garrafa'), opcoes(['copo medidor', 'relógio'])))
    b = bloco(1, 'Ligue o instrumento ao que ele mede.', ligar([('régua', 'o tempo do recreio'), ('balança', 'o comprimento do caderno'),
                                                                ('relógio', 'a febre'), ('termômetro', 'o peso das frutas')])) + bloco(
        2, 'Escreva a unidade: metro, centímetro, quilograma, grama, litro ou minuto.', frases([
            'A altura de uma árvore:', 'O peso de uma borracha:', 'O tempo de escovar os dentes:', 'A água de um balde:']))
    c = bloco(1, 'Complete a tabela.', tabela(['O que medir', 'Instrumento', 'Unidade'], [
        ['o comprimento da sala', '', ''], ['o peso de uma criança', '', ''], ['o suco de uma jarra', '', ''], ['a duração de um filme', '', '']])) + bloco(
        2, 'Por que não usamos a régua para medir o pátio?', linhas(2))
    return h3(
        'escolher-a-unidade-e-o-instrumento-de-medida', 'Escolher a unidade e o instrumento de medida', 'EF03MA18',
        'Escolher a unidade e o instrumento mais adequados para medir comprimento, massa, capacidade e tempo.',
        'Régua, fita métrica, balança, copo medidor, relógio, termômetro.',
        ['Mostre cada instrumento e deixe os estudantes usarem.',
         'Pergunte: o que este instrumento mede?',
         'Faça estações: em cada mesa, um instrumento e um objeto.',
         'Na versão C, o estudante escolhe o instrumento e a unidade e justifica.'],
        ['Pegue e use cada instrumento. Um de cada vez.',
         'Cole a foto do instrumento ao lado do nome, num cartaz fixo.',
         'As estações com troca de mesa dão movimento.'],
        ['Bloco 1: régua; balança. Bloco 2: copo medidor.',
         'Bloco 1: régua e caderno; balança e frutas; relógio e recreio; termômetro e febre. Bloco 2: metro; grama; minuto; litro.',
         'Bloco 1: fita métrica ou trena, metro; balança, quilograma; copo medidor, litro ou mililitro; relógio, hora ou minuto. Bloco 2: a régua é curta, demora muito; a trena é melhor.'],
        a, b, c)


def comprimentos_3ano():
    med = lambda x, r: pilha(x, r)
    a = bloco(1, 'Quanto mede o lápis? Circule.', grade([
        item(med(lapis(6), regua(10)), opcoes(['6 cm', '10 cm'], certa='6 cm'), exemplo=True),
        item(med(lapis(9), regua(10)), opcoes(['9 cm', '8 cm']))], 1), 'Comece a medir no zero.') + bloco(
        2, '1 metro tem quantos centímetros? Circule.', item(opcoes([100, 10])))
    b = bloco(1, 'Meça cada linha com a régua.', ''.join(linha_cm(cm) for cm in (4, 7, 10)), 'Coloque o zero da régua no começo da linha.') + bloco(
        2, 'Estime e depois meça.', tabela(['Objeto', 'Estimei', 'Medi'], [['a borracha', '', ''], ['o caderno', '', ''], ['a mesa', '', '']]))
    c = bloco(1, 'Complete.', frases(['3 m = ___ cm', '250 cm = ___ m e ___ cm', '4 cm = ___ mm'])) + bloco(
        2, 'Leia e resolva.', problema('Joana tem 1 m e 32 cm de altura. O irmão dela tem 1 m e 18 cm. Quantos centímetros Joana é mais alta?', '16mm')) + bloco(
        3, 'Meça um palmo seu em centímetros e estime quantos palmos tem a sua mesa.', linhas(2))
    return h3(
        'estimar-e-medir-comprimentos', 'Estimar e medir comprimentos', 'EF03MA19',
        'Estimar, medir e comparar comprimentos usando metro, centímetro e milímetro.',
        'Réguas, fita métrica, barbante de 1 metro.',
        ['Estime antes de medir e depois confira.',
         'Mostre o zero da régua e o milímetro entre os centímetros.',
         'Corte um barbante de 1 metro e meça coisas grandes.',
         'Na versão C, o estudante transforma unidades e resolve problemas.'],
        ['Ajude a colocar o zero da régua no lugar. Objetos retos e curtos.',
         'Use sempre a mesma régua e a mesma tabela: estimei e medi.',
         'Faça uma caça aos objetos de 10 cm pela sala.'],
        ['Bloco 1: 6 cm; 9 cm. Bloco 2: 100.', 'Bloco 1: 4 cm; 7 cm; 10 cm. Bloco 2: resposta pessoal.',
         'Bloco 1: 300; 2 m e 50 cm; 40 mm. Bloco 2: 14 cm. Bloco 3: resposta pessoal.'],
        a, b, c)


def capacidade_massa_3ano():
    o = lambda t: objeto_medida(t, 64)
    a = bloco(1, 'Qual é mais pesado? Circule.', grade([
        item(opcoes([o('tijolo'), o('pena')], certa=o('tijolo')), exemplo=True), item(opcoes([o('clipe'), o('melancia')]))], 2)) + bloco(
        2, 'Onde cabe mais suco? Circule.', item(opcoes([o('garrafa'), o('copinho')])))
    b = bloco(1, 'Complete.', frases(['1 kg = ___ g', '1 L = ___ mL', 'Meio quilo = ___ g'])) + bloco(
        2, 'Leia e resolva.', probs(['Quantos pacotes de 500 g formam 1 kg?', 'Quantos copinhos de 200 mL enchem uma garrafa de 1 L?']))
    c = bloco(1, 'Leia e resolva.', probs(['Uma jarra tem 2 L de suco. Quantos copos de 250 mL dá para encher?',
                                          'Comprei 3 pacotes de arroz de 2 kg e um pacote de feijão de 1 kg. Quantos quilos levei?'], '20mm')) + bloco(
        2, 'Escreva um objeto que pesa mais ou menos 1 kg e um que cabe mais ou menos 1 L.', linhas(2))
    return h3(
        'estimar-e-medir-capacidade-e-massa', 'Estimar e medir capacidade e massa', 'EF03MA20',
        'Estimar e medir capacidade e massa com litro, mililitro, quilograma e grama em situações do dia a dia.',
        'Balança de cozinha, garrafas de 1 L, copos de 200 mL, embalagens com os rótulos.',
        ['Leia os rótulos das embalagens: quilo, grama, litro, mililitro.',
         'Encha a garrafa de 1 L com copinhos de 200 mL e conte.',
         'Pese objetos na balança e compare com a estimativa.',
         'Na versão C, o estudante resolve problemas com transformação de unidades.'],
        ['Encha e pese de verdade, com ajuda. Uma grandeza por vez.',
         'Use embalagens conhecidas como referência fixa: o pacote de 1 kg, a garrafa de 1 L.',
         'Dê a tarefa de encher e pesar como estação, com papéis na equipe.'],
        ['Bloco 1: tijolo; melancia. Bloco 2: garrafa.', 'Bloco 1: 1000; 1000; 500. Bloco 2: 2 pacotes; 5 copinhos.',
         'Bloco 1: 8 copos; 7 kg. Bloco 2: resposta pessoal.'],
        a, b, c)


def comparar_areas():
    F1 = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)]
    F2 = [(0, 0), (1, 0), (0, 1), (1, 1)]
    a = bloco(1, 'Qual figura ocupa mais quadradinhos? Circule o número.', grade([
        item(fila_h(rot(quad(F1), '1'), rot(quad(F2), '2')), opcoes(['1', '2'], certa='1'), exemplo=True),
        item(fila_h(rot(quad([(0, 0), (1, 0)]), '1'), rot(quad([(0, 0), (1, 0), (2, 0), (1, 1), (1, 2)]), '2')), opcoes(['1', '2']))], 2)) + bloco(
        2, 'Conte os quadradinhos pintados. Circule.', item(malha(4, 3, 30, pintadas=[(0, 0), (1, 0), (2, 0), (0, 1), (1, 1)]), opcoes([5, 7])))
    b = bloco(1, 'Escreva quantos quadradinhos cada figura ocupa. Circule a maior.', grade([
        item(quad(F1), resposta(largura='26mm')), item(quad([(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]), resposta(largura='26mm')),
        item(quad([(c, l) for c in range(4) for l in range(2)]), resposta(largura='26mm'))], 3)) + bloco(
        2, 'Desenhe uma figura com 10 quadradinhos.', malha(12, 4, 26))
    c = bloco(1, 'Desenhe duas figuras diferentes, cada uma com 8 quadradinhos.', malha(14, 4, 26)) + bloco(
        2, 'Qual tem a maior área: a capa do caderno ou a capa do livro? Como comparar sem régua?', linhas(2)) + bloco(
        3, 'Leia e resolva.', problema('Um tapete tem 4 fileiras de 6 quadradinhos. Quantos quadradinhos ele tem?', '14mm'))
    return h3(
        'comparar-areas', 'Comparar áreas', 'EF03MA21',
        'Comparar a área de figuras e de faces de objetos, por sobreposição ou contando quadradinhos.',
        'Folhas, capas de livros, quadradinhos de papel, malha quadriculada.',
        ['Coloque uma capa sobre a outra: qual cobre mais?',
         'Cubra figuras com quadradinhos de papel e conte.',
         'Mostre que figuras diferentes podem ter a mesma área.',
         'Na versão C, o estudante cria figuras com a mesma área.'],
        ['Cubra e conte com quadradinhos de papel. Figuras pequenas.',
         'Conte sempre linha por linha, marcando com o lápis.',
         'Desafio em dupla: quem faz a figura com 10 quadradinhos mais diferente.'],
        ['Bloco 1: 1; 2. Bloco 2: 5.', 'Bloco 1: 6; 5; 8, a maior é a de 8. Bloco 2: figura com 10 quadradinhos.',
         'Bloco 1: duas figuras diferentes com 8. Bloco 2: resposta pessoal; colocar uma sobre a outra. Bloco 3: 24 quadradinhos.'],
        a, b, c)


def intervalos_tempo():
    a = bloco(1, 'A aula começou e terminou nestes horários. Quanto tempo durou? Circule.', grade([
        item(relogios(8, 0, 9, 0), opcoes(['1 hora', '2 horas'], certa='1 hora'), exemplo=True),
        item(relogios(2, 0, 4, 0), opcoes(['2 horas', '4 horas']))], 1)) + bloco(
        2, 'Meia hora tem quantos minutos? Circule.', item(opcoes([30, 50])))
    b = bloco(1, 'Complete a tabela.', tabela(['Atividade', 'Começou', 'Terminou', 'Durou'], [
        ['Recreio', '10:00', '10:20', '20 minutos'], ['Aula de artes', '13:30', '14:15', ''], ['Jogo', '15:00', '16:30', ''], ['Almoço', '11:45', '12:15', '']]),
        'A primeira linha é o exemplo.') + bloco(
        2, 'O filme começou às 3 horas e durou 2 horas. Desenhe os ponteiros na hora em que terminou.', item(relogio(None, 0, 110, rotulo='relógio sem ponteiros')))
    c = bloco(1, 'Leia e resolva.', probs(['Saí de casa às 7:15 e cheguei à escola às 7:50. Quanto tempo levei?',
                                          'A festa começou às 18:30 e durou 2 horas e meia. A que horas terminou?'])) + bloco(
        2, 'Anote o começo e o fim de três atividades do seu dia e calcule quanto duraram.', tabela(['Atividade', 'Começou', 'Terminou', 'Durou'], [['', '', '', '']] * 3))
    return h3(
        'medir-intervalos-de-tempo', 'Medir intervalos de tempo', 'EF03MA22',
        'Ler e registrar horários e calcular quanto tempo durou uma atividade, em relógios de ponteiro e digitais.',
        'Relógio de ponteiros de papel, relógio digital, cronômetro.',
        ['Marque no relógio de papel a hora de começo e a de fim.',
         'Gire o ponteiro e conte as horas ou os minutos que passaram.',
         'Registre a rotina da turma numa tabela com começo e fim.',
         'Na versão C, o estudante calcula durações com horas e minutos.'],
        ['Gire os ponteiros com a mão. Comece pelas horas inteiras.',
         'Use uma rotina visual fixa, com os horários escritos.',
         'Use o cronômetro em tarefas curtas: o tempo vira um jogo.'],
        ['Bloco 1: 1 hora; 2 horas. Bloco 2: 30.', 'Bloco 1: 45 minutos; 1 hora e 30 minutos; 30 minutos. Bloco 2: ponteiros às 5 horas.',
         'Bloco 1: 35 minutos; 21:00. Bloco 2: resposta pessoal.'],
        a, b, c)


def horas_minutos_segundos():
    a = bloco(1, 'Que horas são? Circule.', grade([
        item(relogio(3, 0, 100), opcoes(['3:00', '12:15'], certa='3:00'), exemplo=True),
        item(relogio(6, 30, 100), opcoes(['6:30', '6:00']))], 2), 'O ponteiro pequeno mostra a hora. O grande mostra os minutos.') + bloco(
        2, 'Uma hora tem quantos minutos? Circule.', item(opcoes([60, 100])))
    b = bloco(1, 'Escreva a hora como no relógio digital.', grade([
        item(relogio(2, 15, 90), resposta('2:15', '24mm'), exemplo=True), item(relogio(9, 45, 90), resposta(largura='24mm')),
        item(relogio(11, 30, 90), resposta(largura='24mm')), item(relogio(7, 20, 90), resposta(largura='24mm'))], 4)) + bloco(
        2, 'Complete.', frases(['1 hora = ___ minutos', '1 minuto = ___ segundos', 'meia hora = ___ minutos', 'um quarto de hora = ___ minutos']))
    c = bloco(1, 'Desenhe os ponteiros.', grade([
        item(relogio(None, 0, 100, rotulo='relógio sem ponteiros'), '<p class="legenda">8:40</p>'),
        item(relogio(None, 0, 100, rotulo='relógio sem ponteiros'), '<p class="legenda">1:25</p>')], 2)) + bloco(
        2, 'Complete.', frases(['2 horas = ___ minutos', '90 minutos = ___ hora e ___ minutos', '3 minutos = ___ segundos'])) + bloco(
        3, 'Dê um exemplo de algo que dura mais ou menos 1 segundo, 1 minuto e 1 hora.', linhas(2))
    return h3(
        'ler-horas-minutos-e-segundos', 'Horas, minutos e segundos', 'EF03MA23',
        'Ler horas em relógios digitais e de ponteiros e relacionar hora com minutos e minuto com segundos.',
        'Relógio de ponteiros de papel, relógio digital, cronômetro.',
        ['Mostre o ponteiro pequeno (horas) e o grande (minutos).',
         'Conte de 5 em 5 os minutos em volta do relógio.',
         'Use o cronômetro: quanto é um minuto em silêncio?',
         'Na versão C, o estudante desenha ponteiros e transforma unidades de tempo.'],
        ['Pinte o ponteiro das horas de uma cor e o dos minutos de outra. Horas inteiras e meias primeiro.',
         'Deixe na sala o mesmo relógio de papel, com os números de 5 em 5 marcados.',
         'Desafios com cronômetro: quantos pulos em 30 segundos.'],
        ['Bloco 1: 3:00; 6:30. Bloco 2: 60.', 'Bloco 1: 2:15; 9:45; 11:30; 7:20. Bloco 2: 60; 60; 30; 15.',
         'Bloco 1: ponteiros em 8:40 e 1:25. Bloco 2: 120; 1 hora e 30 minutos; 180. Bloco 3: resposta pessoal (piscar, escovar os dentes, uma aula).'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def resultados_possiveis():
    a = bloco(1, 'Girando a roleta, qual cor tem mais chance de sair? Circule.', grade([
        item(roleta(['verde', 'verde', 'verde', 'rosa'], 110), opcoes(['verde', 'rosa'], certa='verde'), exemplo=True),
        item(roleta(['amarelo', 'rosa', 'rosa', 'rosa', 'rosa', 'amarelo'], 110), opcoes(['rosa', 'amarelo']))], 2)) + bloco(
        2, 'Jogando uma moeda, pode sair: Circule.', item(opcoes(['cara ou coroa', 'só cara'])))
    b = bloco(1, 'Escreva todos os resultados possíveis.', frases(['Jogar um dado:', 'Tirar uma bolinha de um pote com verdes e amarelas:', 'Girar uma roleta azul, vermelha e branca:'])) + bloco(
        2, 'Olhe o pote e responda.', item(pote(['verde'] * 5 + ['amarelo'] * 2 + ['rosa'], 140, 'pote com 5 verdes, 2 amarelas e 1 rosa')) + frases([
            'Qual cor tem mais chance?', 'Qual cor tem menos chance?']))
    c = bloco(1, 'Jogo dois dados e somo os pontos.', frases(['Qual a menor soma possível? E a maior?', 'A soma 1 é possível? E a soma 13?'])) + bloco(
        2, 'Jogue um dado 30 vezes e anote.', tabela(['Face', '1', '2', '3', '4', '5', '6'], [['Vezes', '', '', '', '', '', '']])) + bloco(
        3, 'Alguma face saiu muito mais que as outras? Você esperava isso?', linhas(2))
    return h3(
        'resultados-possiveis-e-mais-provaveis', 'Resultados possíveis e mais prováveis', 'EF03MA25',
        'Listar os resultados possíveis de um evento aleatório e estimar quais têm mais chance de acontecer.',
        'Dados, moedas, roleta de papel com clipe, pote com bolinhas.',
        ['Jogue a moeda e o dado: quais resultados podem sair?',
         'Monte a roleta com mais partes de uma cor e pergunte qual sai mais.',
         'Registre os resultados numa tabela e compare com a previsão.',
         'Na versão C, o estudante faz o experimento e compara com o que esperava.'],
        ['Jogue de verdade e registre junto. Poucas cores.',
         'Avise antes: o resultado pode mudar a cada jogada, isso é normal.',
         'Faça rodadas rápidas de previsão e jogada.'],
        ['Bloco 1: verde; rosa. Bloco 2: cara ou coroa.', 'Bloco 1: 1, 2, 3, 4, 5, 6; verde ou amarela; azul, vermelha ou branca. Bloco 2: verde; rosa.',
         'Bloco 1: 2 e 12; não, a menor é 2 e a maior é 12. Bloco 2: registro pessoal. Bloco 3: resposta pessoal; todas as faces têm a mesma chance.'],
        a, b, c)


def problemas_tabelas_graficos():
    g = grafico_barras(['maçã', 'banana', 'pão', 'suco'], [5, 3, 2, 4], 6, icones=['maca', 'banana', 'pao', 'suco'], celula=30, gap=24)
    a = bloco(1, 'Lanche preferido da turma. Quantos preferem maçã? Circule.', item(g, opcoes([5, 3])), 'Cada quadradinho pintado é um voto.') + bloco(
        2, 'Qual lanche teve mais votos? Circule.', item(opcoes(['maçã', 'pão'])))
    b = bloco(1, 'Livros lidos pelas turmas. Use a tabela.', tabela(['', 'Março', 'Abril', 'Maio'], [['3º A', '12', '15', '9'], ['3º B', '10', '8', '13']]) + frases([
        'Quantos livros o 3º A leu nos três meses?', 'Em qual mês as duas turmas juntas leram mais?', 'Em maio, quantos livros o 3º B leu a mais que o 3º A?'])) + bloco(
        2, 'Pinte o gráfico com os livros do 3º A.', grafico_barras(['março', 'abril', 'maio'], None, 15, vazio=True, celula=13, gap=60))
    c = bloco(1, 'Visitantes da feira de ciências. Cada quadradinho vale 5 pessoas.', grafico_barras(['seg', 'ter', 'qua', 'qui', 'sex'], [4, 7, 5, 8, 6], 8, celula=20, gap=30) + frases([
        'Quantas pessoas foram na quinta?', 'Quantas pessoas a mais foram na terça do que na segunda?', 'Quantas pessoas foram na semana toda?'])) + bloco(
        2, 'Invente uma pergunta sobre o gráfico que precise de uma conta.', linhas(2))
    return h3(
        'problemas-com-tabelas-e-graficos', 'Problemas com tabelas e gráficos', 'EF03MA26',
        'Resolver problemas usando dados de tabelas de dupla entrada e de gráficos de colunas.',
        'Cartaz com tabela e gráfico, post-its para votação.',
        ['Faça uma votação com post-its e monte o gráfico no quadro.',
         'Pergunte coisas que se leem direto e coisas que pedem uma conta.',
         'Mostre a legenda quando cada quadradinho vale mais de um.',
         'Na versão C, o estudante usa a escala e cria perguntas.'],
        ['Monte o gráfico com post-its de verdade. Uma pergunta por vez.',
         'Use sempre o mesmo formato de tabela e gráfico, com títulos.',
         'A votação em pé, levando o post-it ao cartaz, dá movimento.'],
        ['Bloco 1: 5. Bloco 2: maçã.', 'Bloco 1: 36; abril (23); 4. Bloco 2: colunas com 12, 15 e 9.',
         'Bloco 1: 40; 15; 150. Bloco 2: resposta pessoal.'],
        a, b, c)


def ler_dados_texto():
    g = grafico_barras(['cachorro', 'gato', 'peixe'], [6, 4, 2], 6, celula=26, gap=44)
    a = bloco(1, 'Animais de estimação da turma. Qual animal aparece mais? Circule.', item(g, opcoes(['cachorro', 'peixe']))) + bloco(
        2, 'Circule o que é verdade.', item(opcoes(['mais cachorros que gatos', 'mais peixes que gatos'])))
    b = bloco(1, 'Fruta preferida da turma. Complete as frases.', tabela(['Fruta', 'Votos'], [['banana', '9'], ['maçã', '7'], ['uva', '5'], ['laranja', '3']]) + frases([
        'A fruta mais escolhida foi', 'A fruta menos escolhida foi', 'A diferença entre a mais e a menos escolhida é'])) + bloco(
        2, 'Escreva mais uma frase sobre os dados.', linhas(2))
    c = bloco(1, 'Brincadeira preferida no recreio.', grafico_barras(['pega-pega', 'bola', 'corda', 'esconde'], [8, 11, 4, 6], 12, celula=16, gap=56) + frases([
        'Quantos estudantes responderam?', 'Qual brincadeira teve o dobro de votos da corda?'])) + bloco(
        2, 'Escreva um texto curto sobre a pesquisa.', linhas(4), 'Diga o que foi perguntado, o mais escolhido, o menos escolhido e uma comparação.')
    return h3(
        'ler-dados-e-escrever-sobre-eles', 'Ler dados e escrever sobre eles', 'EF03MA27',
        'Ler, interpretar e comparar dados de tabelas e gráficos e escrever um texto curto sobre o que eles mostram.',
        'Gráficos de jornais e revistas infantis, cartaz de pesquisa da turma.',
        ['Leia o título do gráfico e o que cada coluna mostra.',
         'Peça frases começando com "o mais", "o menos", "a diferença".',
         'Escreva um texto coletivo sobre um gráfico.',
         'Na versão C, o estudante escreve o texto sozinho.'],
        ['Dê o começo das frases para completar. Use poucos dados.',
         'Siga sempre a mesma ordem de leitura: título, colunas, maior, menor.',
         'Faça a leitura em voz alta em duplas, um pergunta e o outro responde.'],
        ['Bloco 1: cachorro. Bloco 2: mais cachorros que gatos.', 'Bloco 1: banana; laranja; 6. Bloco 2: resposta pessoal.',
         'Bloco 1: 29; pega-pega (8 é o dobro de 4). Bloco 2: texto pessoal.'],
        a, b, c)


def pesquisa_ate_50():
    a = bloco(1, 'Pergunte a 10 colegas: qual a sua cor preferida? Faça um risquinho.', tabela(['Cor', 'Risquinhos', 'Total'], [
        ['azul', '', ''], ['verde', '', ''], ['vermelho', '', ''], ['amarelo', '', '']])) + bloco(
        2, 'Pinte o gráfico com os votos.', grafico_barras(['azul', 'verde', 'vermelho', 'amarelo'], None, 10, vazio=True, celula=18, gap=50))
    b = bloco(1, 'Faça uma pesquisa com a turma.', frases(['Pergunta:', 'Respostas possíveis:']) + tabela(['Resposta', 'Contagem', 'Total'], [['', '', '']] * 4)) + bloco(
        2, 'Faça o gráfico de colunas.', grafico_barras(['', '', '', ''], None, 12, vazio=True, celula=14, gap=50)) + bloco(
        3, 'O que a pesquisa mostrou?', linhas(1))
    c = bloco(1, 'Faça uma pesquisa com até 50 pessoas (a sua turma e outra).', frases(['Pergunta:', 'Quantas pessoas vou entrevistar:']) + tabela(['Resposta', 'Contagem', 'Total'], [['', '', '']] * 4)) + bloco(
        2, 'Faça o gráfico. Escolha a escala: cada quadradinho vale ___ pessoas.', caixa_desenho('40mm')) + bloco(
        3, 'Escreva um texto curto sobre o resultado.', linhas(3))
    return h3(
        'fazer-uma-pesquisa-e-organizar-os-dados', 'Fazer uma pesquisa e organizar os dados', 'EF03MA28',
        'Fazer uma pesquisa com até 50 pessoas e organizar os dados em listas, tabelas e gráficos de colunas.',
        'Prancheta, lista da turma, papel quadriculado grande.',
        ['Escolham juntos uma pergunta com poucas respostas possíveis.',
         'Anote com risquinhos e depois conte o total.',
         'Monte o gráfico de colunas e escreva o título.',
         'Na versão C, o estudante escolhe a escala e entrevista outra turma.'],
        ['Dê a pergunta pronta e a tabela pronta. Entrevista com ajuda de um colega.',
         'Combine antes como perguntar e anotar, com um roteiro escrito.',
         'Sair para entrevistar outra turma dá movimento à tarefa.'],
        ['Bloco 1: registro pessoal, o total é 10. Bloco 2: colunas iguais aos totais.', 'Bloco 1 a 3: resposta pessoal.',
         'Bloco 1 a 3: resposta pessoal. Com 50 pessoas, uma escala de 2 ou 5 por quadradinho cabe na folha.'],
        a, b, c)


FICHAS = [numeros_ate_9999, compor_decompor_milhar, fatos_adicao_multiplicacao, reta_numerica, calculo_adicao_subtracao, problemas_significados,
          multiplicacao_retangular, divisao_com_resto, partes_iguais, regularidades_numericas, igualdades, solidos_e_objetos, prismas_piramides,
          classificar_figuras, figuras_congruentes, medida_e_unidade, unidade_e_instrumento, comprimentos_3ano, capacidade_massa_3ano, comparar_areas,
          intervalos_tempo, horas_minutos_segundos, resultados_possiveis, problemas_tabelas_graficos, ler_dados_texto, pesquisa_ate_50]
