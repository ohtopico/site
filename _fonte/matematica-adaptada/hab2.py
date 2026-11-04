"""2º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import TRACO, CLARO, dinheiro, figura, grupo, nome, svg, uma_forma
from desenhos2 import calendario, dourado3, fila, grafico_barras, malha, mapa_bairro, objeto_medida, pote, regua, regular, solido
from fichas import VAZIO, bloco, caixa_desenho, conta, figs, grade, item, linhas, opcoes, pratos, problema, resposta, seq_numeros, tabela
from ano3 import frases


def h2(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='30 a 45 minutos'):
    return ficha(slug, titulo, '2º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def fig1(t, tam=46):
    return svg(tam, tam, figura(t, 0, 0, tam), 'fig', nome(t))


def duas(x, y):
    return f'<div class="pilha-contas" style="align-items:flex-start">{x}{y}</div>'


def ce(x, s, y):
    return f'<p class="conta">{x} {s} {y}</p>'


def digital(t, tam=1):
    w, h = 118 * tam, 50 * tam
    inner = (f'<rect x="2" y="2" width="{w - 4}" height="{h - 4}" rx="10" fill="#fff" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<rect x="10" y="9" width="{w - 20}" height="{h - 18}" rx="5" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="1.2"/>'
             f'<text x="{w / 2}" y="{h / 2 + 9 * tam}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="{26 * tam}">{t}</text>')
    return svg(w, h, inner, 'digital', f'relógio digital marcando {t}')


def resp_txt():
    return resposta(largura='30mm')


# ---------- Números ----------

def comparar_ordenar_999():
    a = bloco(1, 'Placa vale 100, barra vale 10, cubinho vale 1. Qual número é maior? Circule.', grade([
        item(duas(dourado3(1, 5, 0, 6), dourado3(1, 0, 5, 6)), opcoes([150, 105], certa=150), exemplo=True),
        item(duas(dourado3(2, 0, 3, 6), dourado3(1, 3, 2, 6)), opcoes([203, 132]))], 2), 'Olhe primeiro as placas. Quem tem mais placas é maior.') + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes([310, 301])), item(opcoes([99, 100]))], 2))
    b = bloco(1, 'Escreva no quadro de ordens.', tabela(['Número', 'Centenas', 'Dezenas', 'Unidades'], [
        ['254', '2', '5', '4'], ['407', '', '', ''], ['740', '', '', ''], ['74', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva &gt; ou &lt;.', grade([item(ce(254, resposta('&lt;'), 407), exemplo=True), item(ce(740, VAZIO, 407)), item(ce(74, VAZIO, 740)), item(ce(399, VAZIO, 401))], 2))
    c = bloco(1, 'Ordene do menor para o maior.', frases(['508, 580, 85, 805:', '999, 909, 990, 99:'])) + bloco(
        2, 'O zero muda o número? Responda.', frases(['Quanto vale o 3 em 305?', 'Quanto vale o 3 em 35?', 'Qual é maior, 305 ou 35? Por quê?'])) + bloco(
        3, 'Leia e responda.', problema('Uma escola tem 418 estudantes e outra tem 481. Qual escola tem mais estudantes? Como você comparou?', '18mm'))
    return h2(
        'comparar-e-ordenar-numeros-ate-999', 'Comparar e ordenar números até 999', 'EF02MA01',
        'Comparar e ordenar números de até três algarismos pelo valor de cada algarismo, entendendo a função do zero.',
        'Material dourado (placas, barras e cubinhos), cartões com números, quadro de ordens.',
        ['Monte dois números com material dourado e pergunte qual é maior. Compare primeiro as placas.',
         'Se as placas forem iguais, compare as barras; se as barras forem iguais, os cubinhos.',
         'Mostre 305 e 35 no quadro de ordens: o zero guarda o lugar das dezenas.',
         'Na versão C, o estudante ordena números parecidos e explica.'],
        ['Use o material dourado em cima do quadro de ordens, sempre na mesma ordem: centenas, dezenas, unidades.',
         'Dê um roteiro fixo para comparar: placas, depois barras, depois cubinhos.',
         'Faça um jogo de cartas: cada um vira três cartas, monta o maior número possível e compara.'],
        ['Bloco 1: 203. Bloco 2: 310; 100.', 'Bloco 1: 4, 0, 7; 7, 4, 0; 0, 7, 4. Bloco 2: &gt;; &lt;; &lt;.',
         'Bloco 1: 85, 508, 580, 805; 99, 909, 990, 999. Bloco 2: 300; 30; 305, porque tem 3 centenas. Bloco 3: a segunda escola (481); as duas têm 4 centenas, e 8 dezenas é mais que 1.'],
        a, b, c)


def contar_ate_1000():
    a = bloco(1, 'Cada placa vale 100. Quanto é? Circule.', grade([
        item(dourado3(2, 0, 0, 6), opcoes([200, 20], certa=200), exemplo=True),
        item(dourado3(3, 0, 0, 6), opcoes([3, 300])),
        item(dourado3(5, 0, 0, 5), opcoes([500, 50]))], 3)) + bloco(
        2, '10 barras de 10 formam uma placa. Quanto vale a placa? Circule.', item(dourado3(0, 10, 0, 5), opcoes([100, 10])))
    b = bloco(1, 'Conte as placas, as barras e os cubinhos. Escreva o número.', grade([
        item(dourado3(1, 3, 4, 6), resposta(134), exemplo=True), item(dourado3(2, 4, 1, 6), VAZIO), item(dourado3(3, 0, 6, 6), VAZIO)], 3)) + bloco(
        2, 'Estime: mais ou menos quantos?', frases(['Uma caixa tem 10 pacotes com 10 lápis em cada um. Quantos lápis?', 'Um pote tem 3 pacotes de 100 balas e mais um pouco. Mais ou menos de 300 balas?']))
    c = bloco(1, 'Agrupe e conte.', frases(['5 placas, 2 barras e 8 cubinhos:', '9 placas e 10 barras:', 'Quantas placas formam 1000?'])) + bloco(
        2, 'Leia e estime.', problema('Um livro tem cerca de 100 páginas. A estante da sala tem 8 livros desse tamanho. Mais ou menos quantas páginas há na estante?', '20mm')) + bloco(
        3, 'Escolha uma coleção grande da escola (feijões, tampinhas, palitos). Como você contaria até 1000 sem se perder?', linhas(2))
    return h2(
        'estimar-e-contar-ate-1000', 'Estimar e contar até 1000 agrupando', 'EF02MA02',
        'Contar e estimar coleções de até 1000 objetos formando grupos de 10 e de 100.',
        'Palitos e elásticos, saquinhos para grupos de 10 e caixas para grupos de 100; material dourado.',
        ['Conte uma coleção grande com a turma, formando saquinhos de 10.',
         'Junte 10 saquinhos numa caixa: a caixa tem 100.',
         'Antes de contar, peça uma estimativa; depois compare.',
         'Na versão C, o estudante estima coleções grandes e explica como contaria.'],
        ['Use objetos de verdade e um grupo por vez. Repita "10 de 10 é 100".',
         'Use embalagens fixas para cada grupo (saquinho para 10, caixa para 100), sempre iguais.',
         'Divida a contagem entre duplas: cada dupla forma grupos de 10 e entrega para o "caixa de 100".'],
        ['Bloco 1: 300; 500. Bloco 2: 100.', 'Bloco 1: 241; 306. Bloco 2: 100 lápis; mais de 300.',
         'Bloco 1: 528; 1000; 10 placas. Bloco 2: cerca de 800 páginas. Bloco 3: resposta pessoal (formando grupos de 10 e de 100).'],
        a, b, c)


def comparar_diferenca():
    a = bloco(1, 'Ligue um a um. Quantos a mais tem a fila de cima? Circule.', grade([
        item(duas(fila(['estrela'] * 6, 34), fila(['estrela'] * 4, 34)), opcoes([2, 4], certa=2), exemplo=True),
        item(duas(fila(['maca'] * 7, 34), fila(['maca'] * 4, 34)), opcoes([3, 11]))], 1)) + bloco(
        2, 'Tem a mesma quantidade? Circule.', item(duas(fila(['bola'] * 5, 34), fila(['bola'] * 5, 34)), opcoes(['sim', 'não'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Ana tem', 'Beto tem', 'Quem tem mais?', 'Quantos a mais?'], [
        ['12 figurinhas', '9 figurinhas', 'Ana', '3'], ['15 bolinhas', '20 bolinhas', '', ''], ['30 lápis', '30 lápis', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Quantos faltam para ficar igual?', item(duas(fila(['flor'] * 8, 32), fila(['flor'] * 5, 32)), VAZIO))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('O 2º A tem 28 estudantes e o 2º B tem 23. Quantos estudantes o 2º A tem a mais?', '18mm'),
        problema('Lia tem 45 figurinhas. Rui tem 60. Quantas Lia precisa ganhar para ficar com a mesma quantidade de Rui?', '18mm')], 2)) + bloco(
        2, 'Invente um problema que pergunte "quantos a mais".', linhas(2))
    return h2(
        'comparar-quantidades-e-achar-a-diferenca', 'Comparar quantidades e achar a diferença', 'EF02MA03',
        'Comparar duas coleções, dizer se uma tem mais, menos ou a mesma quantidade e calcular quantos a mais.',
        'Tampinhas de duas cores, pratos, blocos para empilhar e comparar torres.',
        ['Monte duas torres de blocos e compare as alturas. Quantos blocos a mais?',
         'Ligue um a um os objetos das duas coleções: os que sobram são a diferença.',
         'Mostre que a diferença também é quanto falta para ficar igual.',
         'Na versão C, a diferença aparece em problemas com números até 60.'],
        ['Use objetos e ligue com o dedo. Comece com diferenças pequenas (1 ou 2).',
         'Mantenha as duas filas sempre alinhadas pela esquerda para comparar com facilidade.',
         'Faça um desafio de torres em dupla: quem montar a torre com 3 a mais ganha um ponto.'],
        ['Bloco 1: 3. Bloco 2: sim.', 'Bloco 1: Beto, 5; ninguém, é a mesma quantidade. Bloco 2: 3.',
         'Bloco 1: 5 estudantes; 15 figurinhas. Bloco 2: resposta pessoal.'],
        a, b, c)


def compor_decompor_999():
    dec = lambda x, vals=None: f'<p class="conta">{x} = ' + ' + '.join(resposta(v) if vals else VAZIO for v in (vals or (0, 0, 0))) + '</p>'
    a = bloco(1, 'Escreva quanto vale cada parte e circule o número.', grade([
        item(dourado3(1, 2, 3, 6), '<p class="conta">100 + 20 + 3</p>' + opcoes([123, 321], certa=123), exemplo=True),
        item(dourado3(2, 1, 4, 6), '<p class="conta">200 + 10 + 4</p>' + opcoes([214, 241]))], 2)) + bloco(
        2, 'Complete.', item(f'<p class="conta">300 + 50 + 2 = {VAZIO}</p>'))
    b = bloco(1, 'Decomponha.', grade([item(dec(456, (400, 50, 6)), exemplo=True), item(dec(372)), item(dec(608)), item(dec(915))], 2), 'Centenas + dezenas + unidades.') + bloco(
        2, 'Componha.', grade([conta(500, '+', 70), conta(800, '+', 9), f'<p class="conta">200 + 30 + 5 = {VAZIO}</p>', f'<p class="conta">600 + 40 = {VAZIO}</p>'], 2))
    c = bloco(1, 'Escreva de outro jeito.', frases(['345 = 300 + 45 = 200 +', '520 = 500 + 20 = 400 +', '707 = 700 + 7 = 600 +'])) + bloco(
        2, 'Descubra o número.', frases(['Tenho 4 centenas, 0 dezenas e 9 unidades:', 'Tenho 3 centenas e 15 dezenas:'])) + bloco(
        3, 'Leia e resolva.', problema('Uma loja tem 2 caixas com 100 parafusos, 6 pacotes com 10 e 7 parafusos soltos. Quantos parafusos ela tem?', '18mm'))
    return h2(
        'compor-e-decompor-numeros-ate-999', 'Compor e decompor números até 999', 'EF02MA04',
        'Montar e desmontar números de três algarismos em centenas, dezenas e unidades, usando adições.',
        'Material dourado, fichas sobrepostas (100, 20, 3 que se encaixam formando 123).',
        ['Monte um número com material dourado e escreva a adição: 100 + 20 + 3.',
         'Use as fichas sobrepostas: coloque 3 sobre 20 e sobre 100 e veja aparecer 123.',
         'Desmonte números com zero: 608 = 600 + 8.',
         'Na versão C, mostre outras decomposições, trocando uma placa por 10 barras.'],
        ['Use as fichas sobrepostas, que mostram o número aparecendo. Uma ordem por vez.',
         'Use sempre a mesma cor para cada ordem (centenas, dezenas, unidades) na folha e no material.',
         'Faça um jogo de "monte o número" com tempo: um diz a adição, o outro monta com o material.'],
        ['Bloco 1: 214. Bloco 2: 352.', 'Bloco 1: 300 + 70 + 2; 600 + 0 + 8; 900 + 10 + 5. Bloco 2: 570; 809; 235; 640.',
         'Bloco 1: 145; 120; 107. Bloco 2: 409; 450. Bloco 3: 267 parafusos.'],
        a, b, c)


def fatos_adicao_subtracao():
    junta = lambda t, x, y: f'<div class="opcoes">{grupo(t, x, 5, 28)}<span class="conta">+</span>{grupo(t, y, 5, 28)}</div>'
    a = bloco(1, 'Junte e circule o total.', grade([
        item(junta('maca', 5, 3), opcoes([8, 7], certa=8), exemplo=True), item(junta('bola', 4, 4), opcoes([8, 9]))], 2)) + bloco(
        2, 'Risque e conte quantos sobram. Circule.', grade([
            item(grupo('flor', 8, 4, 30, riscadas=3), '<p class="conta">8 − 3</p>' + opcoes([5, 11], certa=5), exemplo=True),
            item(grupo('estrela', 9, 5, 30, riscadas=4), '<p class="conta">9 − 4</p>' + opcoes([5, 4]))], 2))
    b = bloco(1, 'Complete a família de fatos.', grade([conta(3, '+', 5, 8), conta(5, '+', 3), conta(8, '−', 3), conta(8, '−', 5)], 2), 'Os mesmos três números: 3, 5 e 8.') + bloco(
        2, 'Complete.', grade([conta(6, '+', 7), conta(9, '+', 4), conta(13, '−', 6), conta(15, '−', 8), conta(7, '+', 8), conta(12, '−', 9)], 3))
    c = bloco(1, 'Calcule de cabeça.', grade([conta(40, '+', 30), conta(90, '−', 50), conta(25, '+', 5), conta(60, '−', 15)], 2)) + bloco(
        2, 'Use o 10 para ajudar.', frases(['17 − 9: primeiro tiro 7 e depois mais 2. Resultado:', '8 + 6: completo 10 e somo o resto. Resultado:'])) + bloco(
        3, 'Escreva a família de fatos de 4, 9 e 13.', linhas(2))
    return h2(
        'fatos-de-adicao-e-subtracao', 'Fatos de adição e de subtração', 'EF02MA05',
        'Construir os fatos básicos da adição e da subtração e usá-los no cálculo mental e escrito.',
        'Tampinhas, quadro de dez duplo, cartões de fatos e dados.',
        ['Junte e separe tampinhas e escreva as contas: 3 + 5 = 8 e 8 − 5 = 3.',
         'Mostre a família de fatos: os mesmos três números em quatro contas.',
         'Use o 10 como apoio: 8 + 6 = 8 + 2 + 4.',
         'Na versão C, o estudante calcula de cabeça com dezenas inteiras.'],
        ['Use objetos e o quadro de dez. Um fato por vez, repetido em situações diferentes.',
         'Organize a família de fatos sempre no mesmo desenho (um triângulo com os três números).',
         'Faça partidas curtas com dados: joga dois dados, soma e diz o fato da subtração.'],
        ['Bloco 1: 8. Bloco 2: 5.', 'Bloco 1: 8; 5; 3. Bloco 2: 13; 13; 7; 7; 15; 3.',
         'Bloco 1: 70; 40; 30; 45. Bloco 2: 8; 14. Bloco 3: 4 + 9 = 13; 9 + 4 = 13; 13 − 4 = 9; 13 − 9 = 4.'],
        a, b, c)


def problemas_adicao_subtracao():
    a = bloco(1, 'Leia e circule a resposta.', grade([
        item('<p>Tinha 20 balas e ganhei 10.</p><p class="conta">20 + 10</p>', opcoes([30, 10], certa=30), exemplo=True),
        item('<p>Tinha 50 figurinhas e dei 20.</p><p class="conta">50 − 20</p>', opcoes([30, 70]))], 2), 'Ganhei: somo. Dei: tiro.') + bloco(
        2, 'Juntei 100 tampinhas com mais 100. Quantas são? Circule.', item(dourado3(1, 0, 0, 6) + dourado3(1, 0, 0, 6), opcoes([200, 110])))
    b = bloco(1, 'Leia e resolva.', grade([
        problema('Na escola há 125 meninas e 132 meninos. Quantos estudantes há ao todo?', '18mm'),
        problema('Um ônibus levava 48 pessoas. Desceram 15. Quantas ficaram?', '18mm'),
        problema('Paulo tinha R$ 70 e gastou R$ 35. Quanto sobrou?', '18mm'),
        problema('Uma corda tem 250 cm. Outra tem 100 cm a mais. Quanto mede a outra?', '18mm')], 2))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma biblioteca tinha 346 livros. Ganhou 128 e emprestou 90. Com quantos livros ficou?', '22mm'),
        problema('Faltam 75 dias para as férias. Já passaram 18 dias desde que comecei a contar. De quantos dias era a contagem?', '22mm')], 2)) + bloco(
        2, 'Invente um problema de adição e outro de subtração com números até 999 e resolva.', linhas(3))
    return h2(
        'problemas-de-adicao-e-subtracao-ate-999', 'Problemas de adição e subtração até 999', 'EF02MA06',
        'Resolver e criar problemas de juntar, acrescentar, separar e retirar com números de até três algarismos.',
        'Material dourado, dinheiro de brincadeira, folha para desenhar a situação.',
        ['Leia o problema em voz alta e pergunte: a quantidade vai aumentar ou diminuir?',
         'Represente com material dourado ou com desenho antes da conta.',
         'Resolva e confira se a resposta faz sentido na história.',
         'Na versão C, o problema tem duas etapas e o estudante cria os próprios.'],
        ['Leia junto e sublinhe os números e a pergunta. Use material dourado para cada número.',
         'Use um roteiro fixo: entender, desenhar, calcular, responder com uma frase.',
         'Problemas com o nome dos colegas e situações da escola prendem a atenção. Um por vez.'],
        ['Bloco 1: 30. Bloco 2: 200.', 'Bloco 1: 257; 33; R$ 35; 350 cm.', 'Bloco 1: 384 livros; 93 dias. Bloco 2: resposta pessoal.'],
        a, b, c)


def multiplicar_2_a_5():
    a = bloco(1, 'Conte os pratos e as frutas. Quantas frutas ao todo? Circule.', grade([
        item(pratos(2, 3, 'maca'), '<p class="conta">3 + 3</p>' + opcoes([6, 5], certa=6), exemplo=True),
        item(pratos(3, 2, 'banana'), '<p class="conta">2 + 2 + 2</p>' + opcoes([6, 5]))], 1)) + bloco(
        2, 'Quantas rodas têm 2 bicicletas? Circule.', item('<p class="conta">2 + 2</p>', opcoes([4, 3])))
    b = bloco(1, 'Escreva a adição e a multiplicação.', grade([
        item(pratos(4, 3, 'ovo'), f'<p class="conta">3 + 3 + 3 + 3 = {resposta(12)}</p><p class="conta">4 × 3 = {resposta(12)}</p>', exemplo=True),
        item(pratos(3, 5, 'estrela'), f'<p class="conta">{VAZIO}</p><p class="conta">3 × 5 = {VAZIO}</p>')], 1)) + bloco(
        2, 'Complete.', grade([conta(2, '×', 4), conta(3, '×', 3), conta(5, '×', 2), conta(4, '×', 5)], 2))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma caixa tem 4 lápis. Quantos lápis há em 5 caixas?', '18mm'),
        problema('Cada carro tem 4 rodas. Quantas rodas há em 3 carros?', '18mm'),
        problema('Comprei 3 pacotes de figurinhas com 5 em cada. Quantas figurinhas?', '18mm')], 3)) + bloco(
        2, 'Complete a tabela.', tabela(['×', '1', '2', '3', '4', '5'], [['2', '', '', '', '', ''], ['3', '', '', '', '', ''], ['4', '', '', '', '', ''], ['5', '', '', '', '', '']])) + bloco(
        3, 'Invente um problema de grupos iguais.', linhas(2))
    return h2(
        'multiplicar-por-2-3-4-e-5', 'Multiplicar por 2, 3, 4 e 5', 'EF02MA07',
        'Resolver e criar problemas de multiplicação por 2, 3, 4 e 5 com a ideia de somar parcelas iguais.',
        'Pratos e tampinhas, caixas de ovos, figurinhas, blocos de montar.',
        ['Monte grupos iguais com pratos e tampinhas e conte tudo.',
         'Escreva a adição de parcelas iguais e mostre que 4 × 3 é o mesmo que 3 + 3 + 3 + 3.',
         'Procure grupos iguais no dia a dia: rodas de carro, dedos de uma mão, pés de mesa.',
         'Na versão C, o estudante completa a tabela e cria um problema.'],
        ['Monte os grupos com objetos antes da folha. Fale "3 grupos de 2".',
         'Use sempre a mesma organização (pratos em linha) e a mesma frase: tantos grupos de tantos.',
         'Faça um jogo com dados: um dado diz quantos grupos, o outro quantos em cada um.'],
        ['Bloco 1: 6. Bloco 2: 4.', 'Bloco 1: 5 + 5 + 5 = 15; 15. Bloco 2: 8; 9; 10; 20.',
         'Bloco 1: 20 lápis; 12 rodas; 15 figurinhas. Bloco 2: linha do 2: 2, 4, 6, 8, 10; do 3: 3, 6, 9, 12, 15; do 4: 4, 8, 12, 16, 20; do 5: 5, 10, 15, 20, 25. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- Álgebra ----------

def sequencias_com_regra():
    a = bloco(1, 'Os números aumentam de 2 em 2. Qual vem depois? Circule.', grade([
        item(seq_numeros([2, 4, 6, None]), opcoes([8, 7], certa=8), exemplo=True), item(seq_numeros([10, 12, 14, None]), opcoes([15, 16]))], 1)) + bloco(
        2, 'Os números diminuem de 1 em 1. Qual vem depois? Circule.', item(seq_numeros([9, 8, 7, None]), opcoes([6, 10])))
    b = bloco(1, 'Complete. É crescente ou decrescente?', grade([
        item(seq_numeros([5, 10, 15, None, None]), opcoes(['crescente', 'decrescente'])),
        item(seq_numeros([50, 40, 30, None, None]), opcoes(['crescente', 'decrescente'])),
        item(seq_numeros([100, 200, None, 400, None]), opcoes(['crescente', 'decrescente']))], 1))
    c = bloco(1, 'Complete e escreva a regra.', frases(['3, 6, 9, ___, ___. Regra:', '95, 90, 85, ___, ___. Regra:', '120, 130, 140, ___, ___. Regra:'])) + bloco(
        2, 'Crie uma sequência crescente de 4 em 4, começando no 4, e uma decrescente de 10 em 10, começando no 100.', linhas(2))
    return h2(
        'sequencias-crescentes-e-decrescentes-com-regra', 'Sequências crescentes e decrescentes', 'EF02MA09',
        'Construir sequências de números que aumentam ou diminuem sempre do mesmo jeito e dizer a regra.',
        'Reta numérica no chão, fichas numeradas, um sapo de brinquedo para pular na reta.',
        ['Na reta do chão, pule de 2 em 2 e diga os números em voz alta.',
         'Depois pule para trás: a sequência agora é decrescente.',
         'Pergunte qual é a regra: quanto aumenta ou diminui a cada pulo?',
         'Na versão C, o estudante cria as próprias sequências.'],
        ['Use a reta do chão e pule de verdade. Uma regra por vez.',
         'Combine sempre as mesmas palavras: crescente (sobe) e decrescente (desce). Mostre uma seta para cada.',
         'Faça a contagem em roda: cada estudante diz o próximo número da sequência.'],
        ['Bloco 1: 16. Bloco 2: 6.', 'Bloco 1: 20 e 25, crescente; 20 e 10, decrescente; 300 e 500, crescente.',
         'Bloco 1: 12 e 15, de 3 em 3; 80 e 75, diminui 5; 150 e 160, de 10 em 10. Bloco 2: 4, 8, 12, 16...; 100, 90, 80, 70...'],
        a, b, c)


def descrever_padrao():
    a = bloco(1, 'Qual parte se repete? Circule a parte.', grade([
        item(figs(['maca', 'bola', 'maca', 'bola', 'maca', 'bola'], 40), opcoes([figs(['maca', 'bola'], 34), figs(['maca', 'maca'], 34)], certa=figs(['maca', 'bola'], 34)), exemplo=True),
        item(figs(['flor', 'flor', 'estrela', 'flor', 'flor', 'estrela'], 40), opcoes([figs(['flor', 'estrela'], 34), figs(['flor', 'flor', 'estrela'], 34)]))], 1))
    b = bloco(1, 'Descreva o padrão com palavras.', grade([
        item(figs(['peixe', 'peixe', 'bola', 'peixe', 'peixe', 'bola'], 40), '<p>dois peixes e uma bola, e repete</p>', exemplo=True),
        item(figs(['estrela', 'maca', 'flor', 'estrela', 'maca', 'flor'], 40), linhas(1))], 1)) + bloco(
        2, 'A cada passo aumenta uma bolinha. Desenhe o passo 4 e diga a regra.', item(
            f'<div class="opcoes">{grupo("bola", 1, 1, 24)}{grupo("bola", 2, 2, 24)}{grupo("bola", 3, 3, 24)}</div>' + caixa_desenho('18mm')) + linhas(1))
    c = bloco(1, 'Escreva o padrão com letras. Exemplo: maçã, bola, maçã, bola é A B A B.', frases([
        'flor, flor, peixe, flor, flor, peixe:', 'vermelho, azul, verde, vermelho, azul, verde:'])) + bloco(
        2, 'A sequência 1, 3, 5, 7 aumenta sempre igual. Descreva a regra e escreva os próximos três.', linhas(2)) + bloco(
        3, 'Invente um padrão com símbolos (como ○ △ ○ △) e descreva em palavras.', linhas(2))
    return h2(
        'descrever-o-padrao-de-uma-sequencia', 'Descrever o padrão de uma sequência', 'EF02MA10',
        'Descrever com palavras, letras ou desenhos o que se repete numa sequência e como ela cresce.',
        'Contas para colar, blocos coloridos, palmas e batidas de pé.',
        ['Monte um colar com padrão e peça que a turma diga qual parte se repete.',
         'Faça o padrão com o corpo (palma, palma, pé) e depois registre com letras: A A B.',
         'Mostre uma sequência que cresce: a cada passo, uma bolinha a mais.',
         'Na versão C, o estudante usa letras e símbolos para descrever e cria padrões.'],
        ['Use objetos e o corpo antes do papel. Marque com uma cor a parte que se repete.',
         'Circule sempre a unidade que se repete com a mesma cor. Avise quando o padrão for de crescer.',
         'Padrões de palmas e batidas em grupo funcionam bem. Cada estudante faz a sua parte.'],
        ['Bloco 1: flor, flor, estrela.', 'Bloco 1: estrela, maçã e flor, e repete. Bloco 2: quatro bolinhas; aumenta uma a cada passo.',
         'Bloco 1: A A B; A B C. Bloco 2: aumenta 2; 9, 11, 13. Bloco 3: resposta pessoal.'],
        a, b, c)


def falta_na_sequencia():
    a = bloco(1, 'O que falta no meio? Circule.', grade([
        item(figs(['bola', 'estrela', None, 'estrela', 'bola', 'estrela'], 40), opcoes([fig1('bola'), fig1('flor')], certa=fig1('bola')), exemplo=True),
        item(figs(['maca', 'maca', 'peixe', 'maca', None, 'peixe'], 40), opcoes([fig1('peixe'), fig1('maca')]))], 1)) + bloco(
        2, 'Que número falta? Circule.', item(seq_numeros([10, 20, None, 40]), opcoes([30, 25])))
    b = bloco(1, 'Complete os números que faltam.', seq_numeros([3, None, 7, 9, None]) + seq_numeros([50, 45, None, 35, None]) + seq_numeros([1, 2, 4, None, 16]),
              'Na última, cada número é o dobro do anterior.') + bloco(
        2, 'Desenhe o que falta.', item(figs(['flor', 'bola', 'bola', None, 'bola', 'bola'], 40)))
    c = bloco(1, 'Complete e explique a regra.', frases(['2, 5, ___, 11, 14. Regra:', '64, 32, ___, 8, 4. Regra:', '1, 3, 6, ___, 15. Regra:'])) + bloco(
        2, 'Crie uma sequência com dois números faltando para um colega completar.', linhas(2))
    return h2(
        'o-que-falta-em-sequencias-repetitivas-e-recursivas', 'O que falta em sequências repetitivas e recursivas', 'EF02MA11',
        'Encontrar os elementos que faltam em sequências que se repetem e em sequências que crescem por uma regra.',
        'Blocos coloridos, cartões numerados, um pano para esconder um elemento.',
        ['Monte uma sequência com blocos e esconda um do meio com um pano. Qual está escondido?',
         'Faça o mesmo com cartões numerados.',
         'Mostre que, para achar o que falta, é preciso descobrir a regra primeiro.',
         'Na versão C, as regras mudam (soma 3, metade, aumenta cada vez mais).'],
        ['Fale a sequência em voz alta e pare no espaço vazio. Use poucas figuras.',
         'Marque sempre o espaço vazio do mesmo jeito (quadrado tracejado), como na folha.',
         'Transforme em jogo de adivinhar: um esconde, o outro descobre.'],
        ['Bloco 1: maçã. Bloco 2: 30.', 'Bloco 1: 5 e 11; 40 e 30; 8. Bloco 2: flor.',
         'Bloco 1: 8, soma 3; 16, metade; 10, soma 2, 3, 4, 5... Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Geometria ----------

def localizar_no_mapa():
    cam = [(0.5, 5), (1, 5), (2, 5), (3, 5), (3, 4), (3, 2.5)]
    a = bloco(1, 'Siga o caminho tracejado. Aonde ele leva? Circule.', item(mapa_bairro(cam, 'mapa com caminho da casa até a praça'), opcoes(['Escola', 'Praça']))) + bloco(
        2, 'O que fica no canto de cima, à direita? Circule.', item(opcoes(['Escola', 'Casa'])))
    b = bloco(1, 'Responda olhando o mapa.', item(mapa_bairro()) + frases([
        'Quantos quadradinhos para a direita a Escola fica da Casa?', 'O Mercado fica à direita ou à esquerda da Praça?', 'Quantos quadradinhos para cima a Escola fica da Casa?'])) + bloco(
        2, 'Desenhe no mapa um caminho da Praça até o Mercado.', '', 'Use o mapa de cima.')
    c = bloco(1, 'Escreva o caminho da Casa até o Mercado, com as direções e os quadradinhos.', item(mapa_bairro()) + linhas(2), 'Use: para cima, para baixo, para a direita, para a esquerda.') + bloco(
        2, 'Escreva um caminho da Escola até a Praça que passe pelo Mercado.', linhas(2))
    return h2(
        'localizar-e-se-deslocar-num-mapa', 'Localizar e se deslocar num mapa', 'EF02MA12',
        'Dizer onde ficam lugares num mapa simples e descrever caminhos com direções e pontos de referência.',
        'Mapa do bairro desenhado no chão com fita crepe, carrinho, setas de papel.',
        ['Monte o mapa no chão e ande pelos caminhos com um carrinho.',
         'Descreva: saio da Casa, ando 3 para a direita, viro e ando 3 para cima.',
         'Use pontos de referência: a Praça fica perto do meio.',
         'Na versão C, o estudante descreve caminhos com várias etapas.'],
        ['Andar o caminho de verdade antes de desenhar faz diferença. Poucos lugares, nomes conhecidos.',
         'Combine as palavras de direção e use setas de papel iguais às da folha.',
         'Faça desafios no mapa do chão: o caminho mais curto até a Escola.'],
        ['Bloco 1: Praça. Bloco 2: Escola.', 'Bloco 1: 7 quadradinhos; à direita; 5 quadradinhos. Bloco 2: vários caminhos possíveis.',
         'Bloco 1: por exemplo, 6 para a direita e 1 para cima. Bloco 2: resposta pessoal, passando pelo Mercado.'],
        a, b, c)


def plantas_simples():
    sala = malha(6, 4, 40, pintadas=((0, 0), (5, 3)), marcas={(0, 0): 'P', (5, 0): 'Q', (2, 2): 'M', (5, 3): 'J'}, rotulo='planta de uma sala: P porta, Q quadro, M mesa, J janela')
    a = bloco(1, 'Esta é a planta de uma sala, vista de cima. P é a porta, Q é o quadro, M é a mesa, J é a janela. O que fica perto da porta? Circule.',
              item(sala, opcoes(['quadro', 'janela'])), 'P e Q estão na mesma linha de cima.') + bloco(
        2, 'A mesa está no meio ou no canto? Circule.', item(opcoes(['meio', 'canto'])))
    b = bloco(1, 'Olhe a planta e responda.', item(sala) + frases(['O que fica no canto de baixo, à direita?', 'Quantos quadradinhos você anda da porta até o quadro, na linha de cima?'])) + bloco(
        2, 'Desenhe a planta do seu quarto, vista de cima. Marque a porta, a cama e a janela.', caixa_desenho('40mm'))
    c = bloco(1, 'Desenhe a planta da sua sala de aula com pontos de referência: porta, quadro, janela e a sua carteira.', caixa_desenho('56mm')) + bloco(
        2, 'Escreva o roteiro da porta da escola até a sua sala.', linhas(3))
    return h2(
        'plantas-e-roteiros-de-lugares-conhecidos', 'Plantas e roteiros de lugares conhecidos', 'EF02MA13',
        'Desenhar plantas simples de lugares conhecidos, vistos de cima, e escrever roteiros com pontos de referência.',
        'Caixa de sapato e miniaturas para montar uma sala; folha quadriculada.',
        ['Monte uma sala de miniatura na caixa e olhe de cima: o que se vê?',
         'Desenhe o que se vê de cima: a mesa vira um retângulo.',
         'Combine letras ou símbolos para cada objeto (legenda).',
         'Na versão C, o estudante desenha a própria sala e escreve um roteiro.'],
        ['Olhe a maquete de cima, de pé na cadeira. Poucos objetos na planta.',
         'Use uma legenda fixa (P porta, J janela), sempre igual em todas as plantas.',
         'Faça uma caça ao tesouro com a planta da sala.'],
        ['Bloco 1: quadro. Bloco 2: meio.', 'Bloco 1: a janela; 5 quadradinhos. Bloco 2: resposta pessoal.',
         'Respostas pessoais, com pontos de referência.'],
        a, b, c)


def comparar_solidos():
    a = bloco(1, 'Circule o sólido pedido.', grade([
        item(opcoes([solido('cubo', 58), solido('esfera', 58)], certa=solido('cubo', 58)), '<p class="legenda">cubo</p>', exemplo=True),
        item(opcoes([solido('cone', 58), solido('piramide', 58)]), '<p class="legenda">pirâmide</p>'),
        item(opcoes([solido('cilindro', 58), solido('bloco', 58)]), '<p class="legenda">cilindro</p>')], 1))
    b = bloco(1, 'Complete a tabela.', tabela(['Sólido', 'Nome', 'Rola?', 'Tem ponta?'], [
        [solido('cone', 46), 'cone', 'sim', 'sim'], [solido('cubo', 46), '', '', ''], [solido('esfera', 46), '', '', ''], [solido('piramide', 46), '', '', ''], [solido('cilindro', 46), '', '', '']]),
        'A primeira linha é o exemplo.')
    c = bloco(1, 'Compare e escreva uma semelhança e uma diferença.', frases(['Cubo e bloco retangular:', 'Cone e pirâmide:', 'Cilindro e esfera:'])) + bloco(
        2, 'Quais sólidos ficam em pé sem rolar, apoiados em qualquer face? Explique.', linhas(2))
    return h2(
        'comparar-solidos-geometricos', 'Comparar sólidos geométricos', 'EF02MA14',
        'Reconhecer, nomear e comparar cubo, bloco retangular, pirâmide, cone, cilindro e esfera.',
        'Sólidos de madeira ou embalagens (caixas, latas, bolas, chapéus de festa).',
        ['Passe os sólidos de mão em mão. Quais rolam? Quais têm ponta?',
         'Compare dois sólidos parecidos: o cubo e o bloco, o cone e a pirâmide.',
         'Faça um quadro na lousa com as características.',
         'Na versão C, o estudante escreve semelhanças e diferenças.'],
        ['Deixe tocar e girar. Comece com três sólidos e acrescente aos poucos.',
         'Use um cartão com a foto e o nome de cada sólido. As perguntas sempre na mesma ordem: rola? tem ponta?',
         'Faça o teste na rampa: quais rolam? O estudante anota na tabela.'],
        ['Bloco 1: a pirâmide; o cilindro.', 'Bloco 1: cubo, não rola, tem pontas (cantos); esfera, rola, não tem ponta; pirâmide, não rola, tem ponta; cilindro, rola deitado, não tem ponta.',
         'Bloco 1: por exemplo, os dois têm 6 faces planas, mas no cubo todas são quadrados iguais; os dois têm ponta, mas o cone tem uma parte arredondada; os dois rolam, mas o cilindro tem faces planas. Bloco 2: o cubo, o bloco retangular e a pirâmide.'],
        a, b, c)


def comparar_figuras_planas():
    f = lambda t, tam=48: uma_forma(t, tam)
    a = bloco(1, 'Circule todos os triângulos.', item(opcoes([f('triangulo'), f('quadrado'), f('triangulo', 40), f('circulo'), regular(3, 26, rot=90)]))) + bloco(
        2, 'Quantos lados tem o quadrado? Circule.', item(f('quadrado', 60), opcoes([4, 3])))
    b = bloco(1, 'Separe as figuras pelo número de lados.', item(opcoes([f('triangulo'), regular(5, 26), f('quadrado'), regular(6, 26), f('retangulo'), regular(3, 26)])) +
              tabela(['3 lados', '4 lados', 'mais de 4 lados'], [['', '', '']])) + bloco(
        2, 'Escreva o nome.', grade([item(f('circulo', 50), resp_txt()), item(f('retangulo', 50), resp_txt()), item(regular(6, 26), resp_txt())], 3), 'A última tem 6 lados: é um hexágono.')
    c = bloco(1, 'Compare e escreva.', frases(['O que o quadrado e o retângulo têm de parecido?', 'E de diferente?', 'Por que o círculo não tem lados?'])) + bloco(
        2, 'Desenhe uma figura com 5 lados e outra com 6 lados.', grade([caixa_desenho('26mm'), caixa_desenho('26mm')], 2))
    return h2(
        'comparar-figuras-planas-pelos-lados', 'Comparar figuras planas pelos lados', 'EF02MA15',
        'Reconhecer, nomear e comparar figuras planas pelo número de lados e pelos cantos.',
        'Formas em EVA, palitos e massinha para montar figuras, geoplano.',
        ['Monte figuras com palitos e massinha e conte os lados.',
         'Separe as formas em grupos: 3 lados, 4 lados, mais lados, nenhum lado reto.',
         'Compare o quadrado com o retângulo: os dois têm 4 lados, mas no quadrado são todos iguais.',
         'Na versão C, o estudante explica semelhanças e diferenças.'],
        ['Monte as figuras com palitos para contar os lados com a mão. Poucas formas por vez.',
         'Use sempre a mesma cor para o mesmo número de lados.',
         'O geoplano com elásticos é ótimo: o estudante monta, desmonta e conta.'],
        ['Bloco 1: os três triângulos. Bloco 2: 4.', 'Bloco 1: 3 lados: os dois triângulos; 4 lados: quadrado e retângulo; mais de 4: pentágono e hexágono. Bloco 2: círculo; retângulo; hexágono.',
         'Bloco 1: os dois têm 4 lados e 4 cantos retos; no quadrado os lados são iguais; porque a borda é toda curva. Bloco 2: desenho com 5 e 6 lados.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def medir_comprimentos():
    med = lambda x, r: f'<div style="display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px">{x}{r}</div>'
    lapis = lambda cm: svg(cm * 30 + 22, 22, f'<rect x="10" y="4" width="{cm * 30 - 16}" height="14" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/><path d="M{cm * 30 - 6} 4 L{cm * 30 + 10} 11 L{cm * 30 - 6} 18z" fill="{CLARO["bege"]}" stroke="{TRACO}" stroke-width="2"/>', 'lapis', f'lápis de {cm} cm')
    a = bloco(1, 'Quanto mede o lápis? Circule.', grade([
        item(med(lapis(5), regua(8)), opcoes(['5 cm', '8 cm'], certa='5 cm'), exemplo=True),
        item(med(lapis(7), regua(8)), opcoes(['7 cm', '4 cm']))], 1), 'Comece a medir no zero.') + bloco(
        2, 'Qual é mais comprido? Circule.', item(opcoes(['a porta', 'o lápis'])))
    b = bloco(1, 'Estime e depois meça com a régua.', tabela(['Objeto', 'Estimei', 'Medi'], [['borracha', '', ''], ['caderno', '', ''], ['seu palmo', '', '']])) + bloco(
        2, 'Qual unidade usar: metro ou centímetro?', frases(['A altura da porta:', 'O tamanho de uma borracha:', 'O comprimento do pátio:']))
    c = bloco(1, 'Complete.', frases(['1 metro tem quantos centímetros?', '2 metros e 30 centímetros são quantos centímetros?', '1 centímetro tem quantos milímetros?'])) + bloco(
        2, 'Leia e resolva.', problema('A mesa mede 120 cm e a janela mede 1 metro. Qual é maior? Quantos centímetros a mais?', '18mm')) + bloco(
        3, 'Meça a sua sala com passos e depois com uma fita métrica. Por que os resultados são diferentes?', linhas(2))
    return h2(
        'medir-comprimentos-metro-centimetro-e-milimetro', 'Medir comprimentos: metro, centímetro e milímetro', 'EF02MA16',
        'Estimar, medir e comparar comprimentos com palmos e passos e com metro, centímetro e milímetro.',
        'Régua, fita métrica, barbante, objetos da sala.',
        ['Meça a mesa com palmos de estudantes diferentes. Por que deu diferente?',
         'Apresente a régua e mostre que a medida começa no zero.',
         'Meça objetos e anote: primeiro estime, depois meça.',
         'Na versão C, o estudante relaciona metro, centímetro e milímetro.'],
        ['Use a régua com o zero bem marcado. Prenda o objeto na mesa para não escorregar.',
         'Dê um roteiro fixo: encosta no zero, olha onde termina, lê o número.',
         'Faça uma caça às medidas: encontrar algo com 10 cm, com 1 metro.'],
        ['Bloco 1: 7 cm. Bloco 2: a porta.', 'Bloco 1: estimativas pessoais; medidas reais. Bloco 2: metro; centímetro; metro.',
         'Bloco 1: 100; 230; 10. Bloco 2: a mesa, 20 cm a mais. Bloco 3: porque o passo de cada pessoa tem um tamanho.'],
        a, b, c)


def massa_capacidade():
    o = lambda t: objeto_medida(t, 64)
    a = bloco(1, 'Qual é mais pesado? Circule.', grade([
        item(opcoes([o('melancia'), o('pena')], certa=o('melancia')), exemplo=True), item(opcoes([o('clipe'), o('tijolo')]))], 2)) + bloco(
        2, 'Onde cabe mais água? Circule.', item(opcoes([o('copinho'), o('balde')])))
    b = bloco(1, 'Escreva a unidade: quilograma (kg), grama (g), litro (L) ou mililitro (mL).', frases([
        'Um saco de arroz: 5', 'Uma garrafa de suco: 1', 'Um pacote de bala: 200', 'Uma colher de xarope: 5'])) + bloco(
        2, 'Quantos copinhos de 200 mL enchem uma garrafa de 1 litro?', item(o('garrafa') + o('copinho')) + linhas(1), '1 litro tem 1000 mL.')
    c = bloco(1, 'Complete.', frases(['1 kg = ___ g', '2 L = ___ mL', 'Meio quilo = ___ g', 'Meio litro = ___ mL'])) + bloco(
        2, 'Leia e resolva.', problema('Uma receita usa 500 g de farinha. Tenho um pacote de 1 kg. Dá para fazer quantas receitas?', '18mm')) + bloco(
        3, 'Ordene do mais leve para o mais pesado: uma pena, um tijolo, uma maçã, um caderno.', linhas(1))
    return h2(
        'massa-e-capacidade-kg-g-litro-e-ml', 'Massa e capacidade: kg, g, litro e mL', 'EF02MA17',
        'Estimar, medir e comparar massas e capacidades com quilograma, grama, litro e mililitro.',
        'Balança de cozinha, embalagens vazias (1 kg, 500 g, 1 L, 200 mL), copos e garrafas com água.',
        ['Segure dois objetos, um em cada mão: qual é mais pesado? Confira na balança.',
         'Encha copinhos com a água de uma garrafa de 1 litro e conte.',
         'Leia as embalagens: onde aparece kg, g, L e mL?',
         'Na versão C, o estudante faz trocas entre as unidades.'],
        ['Use embalagens reais e a balança. Uma grandeza por vez: primeiro massa, depois capacidade.',
         'Separe as embalagens em duas caixas fixas: "pesa" (kg, g) e "cabe" (L, mL).',
         'Encher e esvaziar copos de água mantém a atenção. Faça na pia ou no pátio.'],
        ['Bloco 1: o tijolo. Bloco 2: o balde.', 'Bloco 1: kg; L; g; mL. Bloco 2: 5 copinhos.',
         'Bloco 1: 1000; 2000; 500; 500. Bloco 2: 2 receitas. Bloco 3: pena, maçã, caderno, tijolo (a ordem entre maçã e caderno pode variar).'],
        a, b, c)


def intervalos_datas():
    a = bloco(1, 'Do dia 3 ao dia 5, quantos dias se passam? Circule.', item(calendario(2026, 11, destaques=(3, 5), cel='10mm'), opcoes([2, 5])),
              'Pule de um dia para o outro: 3 para 4, 4 para 5.') + bloco(
        2, 'Uma semana tem quantos dias? Circule.', item(opcoes([7, 5])))
    b = bloco(1, 'Use o calendário e responda.', calendario(2026, 11, destaques=(9, 16, 23), cel='10mm') + frases([
        'Do dia 9 ao dia 16, quantos dias?', 'Do dia 9 ao dia 23, quantas semanas?', 'A festa é no dia 20. Hoje é dia 12. Quantos dias faltam?']))
    c = bloco(1, 'Use os calendários de novembro e dezembro de 2026.', grade([calendario(2026, 11, cel='8mm'), calendario(2026, 12, cel='8mm')], 2) + frases([
        'Do dia 25 de novembro ao dia 5 de dezembro, quantos dias?', 'Do dia 1º de dezembro ao Natal, quantas semanas e quantos dias?'])) + bloco(
        2, 'Leia e resolva.', problema('As férias começam em 18 de dezembro. Hoje é 30 de novembro. Quantos dias faltam?', '18mm'))
    return h2(
        'quanto-tempo-entre-duas-datas', 'Quanto tempo entre duas datas?', 'EF02MA18',
        'Contar os dias e as semanas entre duas datas, usando o calendário.',
        'Calendário grande do mês, pregadores ou adesivos para marcar os dias.',
        ['Marque no calendário uma data especial e conte com a turma quantos dias faltam.',
         'Mostre que pular uma linha do calendário é andar uma semana (7 dias).',
         'Conte os dias de uma data até outra pulando de dia em dia.',
         'Na versão C, o intervalo passa de um mês para o outro.'],
        ['Conte os dias marcando com o dedo ou com adesivos. Intervalos curtos primeiro.',
         'Use o calendário da sala todos os dias e risque cada dia que passa.',
         'Faça a contagem regressiva para um evento da turma, com um estudante responsável.'],
        ['Bloco 1: 2 dias. Bloco 2: 7.', 'Bloco 1: 7 dias; 2 semanas; 8 dias.', 'Bloco 1: 10 dias; 3 semanas e 3 dias (24 dias). Bloco 2: 18 dias.'],
        a, b, c)


def duracao_relogio():
    par = lambda i, f: f'<div class="opcoes">{digital(i)}<span class="conta">até</span>{digital(f)}</div>'
    a = bloco(1, 'A aula começou e terminou nestes horários. Quanto tempo durou? Circule.', grade([
        item(par('8:00', '9:00'), opcoes(['1 hora', '9 horas'], certa='1 hora'), exemplo=True),
        item(par('10:00', '12:00'), opcoes(['2 horas', '12 horas']))], 1)) + bloco(
        2, 'O recreio dura meia hora. Começa às 10:00. Termina às: Circule.', item(digital('10:00'), opcoes(['10:30', '11:30'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Atividade', 'Começou', 'Terminou', 'Durou'], [
        ['Aula de música', '8:00', '8:30', '30 minutos'], ['Almoço', '12:00', '12:45', ''], ['Filme', '14:00', '15:30', ''], ['Educação física', '9:15', '10:00', '']]),
        'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva o horário de agora no relógio digital.', item(digital('__:__')))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Um jogo começou às 15:20 e terminou às 16:05. Quanto tempo durou?', '18mm'),
        problema('O ônibus sai às 7:40 e a viagem dura 35 minutos. A que horas ele chega?', '18mm')], 2)) + bloco(
        2, 'Cronometre quanto tempo você leva para escrever o seu nome 5 vezes. Anote o início e o fim.', frases(['Começou:', 'Terminou:', 'Durou:']))
    return h2(
        'duracao-de-atividades-no-relogio-digital', 'Duração de atividades no relógio digital', 'EF02MA19',
        'Ler horários no relógio digital, registrar o início e o fim de uma atividade e calcular quanto tempo durou.',
        'Relógio digital ou celular, cronômetro, cartões com horários.',
        ['Anote no quadro a hora em que a aula começou. No fim, anote a hora de terminar.',
         'Calcule com a turma quanto tempo passou: primeiro as horas inteiras, depois os minutos.',
         'Use o cronômetro para medir atividades curtas.',
         'Na versão C, os horários têm minutos quebrados.'],
        ['Use horas inteiras primeiro, depois meia hora. Mostre o relógio digital da sala.',
         'A agenda do dia com os horários de início e fim de cada atividade ajuda a prever o que vem.',
         'Desafios com cronômetro (quanto tempo para arrumar a mochila?) mantêm o interesse.'],
        ['Bloco 1: 2 horas. Bloco 2: 10:30.', 'Bloco 1: 45 minutos; 1 hora e 30 minutos; 45 minutos. Bloco 2: o horário real.',
         'Bloco 1: 45 minutos; às 8:15. Bloco 2: resposta pessoal.'],
        a, b, c)


def equivalencia_dinheiro():
    d = lambda *v: dinheiro(list(v))
    a = bloco(1, 'Vale o mesmo? Circule sim ou não.', grade([
        item(f'<div class="opcoes">{d(5, 5)}<span class="conta">=</span>{d(10)}</div>', opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(f'<div class="opcoes">{d(2, 2)}<span class="conta">=</span>{d(5)}</div>', opcoes(['sim', 'não']))], 1)) + bloco(
        2, 'Duas moedas de 50 centavos valem: Circule.', item(d(0.5, 0.5), opcoes(['R$ 1', 'R$ 2'])))
    b = bloco(1, 'Complete as trocas.', frases(['Uma cédula de R$ 10 vale quantas de R$ 2?', 'Uma cédula de R$ 20 vale quantas de R$ 5?', 'R$ 1 vale quantas moedas de 25 centavos?', 'Uma cédula de R$ 50 vale quantas de R$ 10?'])) + bloco(
        2, 'Quanto tem? Escreva.', grade([item(d(10, 5, 2), VAZIO), item(d(20, 1, 0.5), VAZIO)], 2))
    c = bloco(1, 'Mostre três jeitos de formar R$ 20 com moedas e cédulas.', linhas(3)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Um brinquedo custa R$ 17. Paguei com uma cédula de R$ 20. Que moedas ou cédulas posso receber de troco?', '18mm'),
            problema('Tenho 3 cédulas de R$ 5 e 4 moedas de R$ 1. Dá para comprar um livro de R$ 18?', '18mm')], 2))
    return h2(
        'trocas-entre-moedas-e-cedulas', 'Trocas entre moedas e cédulas', 'EF02MA20',
        'Descobrir quantas moedas ou cédulas de um valor equivalem a outra e usar isso em compras e trocos.',
        'Dinheiro de brincadeira, produtos com preço, caixinha para o troco.',
        ['Troque uma cédula de R$ 10 por cédulas de R$ 2 com a turma, contando de 2 em 2.',
         'Mostre que valores diferentes podem formar o mesmo total.',
         'Monte um mercadinho com troco.',
         'Na versão C, o estudante escolhe jeitos de pagar e de dar troco.'],
        ['Faça as trocas com o dinheiro de brincadeira na mão, uma troca por vez.',
         'Organize o dinheiro sempre do mesmo jeito, do menor para o maior valor.',
         'O mercadinho com papéis de caixa e cliente mantém a atenção.'],
        ['Bloco 1: não (R$ 4 e R$ 5). Bloco 2: R$ 1.', 'Bloco 1: 5; 4; 4; 5. Bloco 2: R$ 17; R$ 21,50.',
         'Bloco 1: por exemplo, uma de 20; duas de 10; quatro de 5. Bloco 2: R$ 3 (uma de 2 e uma de 1, ou três de 1); sim, tenho R$ 19.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def muito_pouco_provavel():
    a = bloco(1, 'Tirando uma bolinha sem olhar, sair verde é: Circule.', grade([
        item(pote(['verde'] * 9 + ['rosa'], 100, 'pote com 9 verdes e 1 rosa'), opcoes(['muito provável', 'pouco provável'], certa='muito provável'), exemplo=True),
        item(pote(['rosa'] * 9 + ['verde'], 100, 'pote com 9 rosa e 1 verde'), opcoes(['muito provável', 'pouco provável']))], 1)) + bloco(
        2, 'Num pote só com bolinhas rosa, sair verde é: Circule.', item(pote(['rosa'] * 8, 90, 'pote só com bolinhas rosa'), opcoes(['impossível', 'muito provável'])))
    b = bloco(1, 'Escreva: muito provável, pouco provável ou impossível.', tabela(['Acontecimento', 'Chance'], [
        ['Chover num dia de céu azul, sem nuvens.', 'pouco provável'], ['Um colega faltar à aula amanhã.', ''], ['Ter aula num domingo de manhã.', ''], ['Um peixe andar de bicicleta.', ''], ['O sol aparecer amanhã durante o dia.', '']]),
        'A primeira linha é o exemplo. A resposta pode mudar conforme a turma: converse.') + bloco(
        2, 'Pinte o pote para que sair amarela seja pouco provável.', item(pote(['branco'] * 10, 120, 'pote com bolinhas para pintar')))
    c = bloco(1, 'Num pote há 6 bolinhas verdes, 3 amarelas e 1 rosa.', frases(['Qual cor é mais provável sair?', 'Qual cor é menos provável?', 'É possível sair azul?'])) + bloco(
        2, 'Faça o experimento: tire uma bolinha, anote e devolva, 20 vezes. O resultado combinou com o que você pensou?', tabela(['Cor', 'Vezes'], [['verde', ''], ['amarela', ''], ['rosa', '']])) + bloco(
        3, 'Escreva um acontecimento muito provável e um pouco provável da sua semana.', linhas(2))
    return h2(
        'muito-provavel-pouco-provavel-ou-impossivel', 'Muito provável, pouco provável ou impossível', 'EF02MA21',
        'Classificar acontecimentos do dia a dia e sorteios como muito prováveis, pouco prováveis, improváveis ou impossíveis.',
        'Saco opaco com bolinhas ou tampinhas de cores diferentes, folha para anotar.',
        ['Coloque 9 bolinhas verdes e 1 rosa no saco. Qual cor deve sair? Sorteie várias vezes.',
         'Troque as quantidades e pergunte de novo.',
         'Converse sobre acontecimentos da semana e classifique com a turma.',
         'Na versão C, o estudante faz o experimento e compara com a previsão.'],
        ['Faça o sorteio de verdade. Duas cores e diferenças grandes (9 e 1) primeiro.',
         'Use cartões fixos com as palavras e uma escala desenhada do impossível ao certo.',
         'Deixe o estudante sortear e marcar o resultado no quadro.'],
        ['Bloco 1: pouco provável. Bloco 2: impossível.', 'Bloco 1: pouco provável (depende da turma); impossível ou pouco provável; impossível; muito provável. Bloco 2: pintar poucas amarelas (1 ou 2) e muitas de outra cor.',
         'Bloco 1: verde; rosa; não. Bloco 2: resultado do experimento (a verde deve aparecer mais). Bloco 3: resposta pessoal.'],
        a, b, c)


def tabelas_dupla_entrada():
    t = tabela(['', 'Futebol', 'Pega-pega', 'Amarelinha'], [['Turma A', '8', '5', '7'], ['Turma B', '6', '9', '5']])
    a = bloco(1, 'Brincadeira preferida de duas turmas. Quantos da Turma A preferem futebol? Circule.', item(t, opcoes([8, 6])),
              'Ache a linha da Turma A e a coluna do futebol. O número fica no encontro.') + bloco(
        2, 'Na Turma B, qual brincadeira tem 9 votos? Circule.', item(opcoes(['pega-pega', 'futebol'])))
    b = bloco(1, 'Use a tabela.', t + frases(['Quantos preferem amarelinha nas duas turmas juntas?', 'Em qual turma o pega-pega foi mais votado?', 'Quantos estudantes tem a Turma A?'])) + bloco(
        2, 'Pinte o gráfico com os votos da Turma B.', grafico_barras(['futebol', 'pega-pega', 'amarelinha'], None, 10, vazio=True, celula=24, gap=60))
    c = bloco(1, 'Leia o gráfico: estudantes que leram um livro no mês, por turma.', grafico_barras(['Turma A', 'Turma B'], [12, 15], 16, celula=18, gap=50) + frases([
        'Qual turma leu mais? Quantos a mais?', 'Quantos leram nas duas turmas juntas?'])) + bloco(
        2, 'Complete a tabela de dupla entrada. Turma A: 7 meninas e 5 meninos leram. Turma B: 8 meninas e 7 meninos leram.',
        tabela(['', 'Meninas', 'Meninos', 'Total'], [['Turma A', '', '', ''], ['Turma B', '', '', '']])) + bloco(
        3, 'A tabela combina com o gráfico? Escreva uma conclusão.', linhas(1))
    return h2(
        'tabelas-de-dupla-entrada-e-graficos', 'Tabelas de dupla entrada e gráficos', 'EF02MA22',
        'Ler e comparar informações em tabelas de dupla entrada e em gráficos de colunas.',
        'Tabela grande no quadro, post-its para votação de duas turmas.',
        ['Faça uma votação com duas turmas (ou meninos e meninas da mesma turma).',
         'Monte a tabela de dupla entrada: linhas para os grupos, colunas para as respostas.',
         'Mostre como achar um número: a linha e a coluna se encontram.',
         'Na versão C, o estudante passa dados de uma frase para a tabela.'],
        ['Use as duas mãos para achar o encontro da linha e da coluna. Pinte a linha e a coluna com cores.',
         'Use sempre o mesmo formato de tabela. Avise quando passar da tabela para o gráfico.',
         'A votação em pé, indo até o cartaz, ajuda quem precisa se mexer.'],
        ['Bloco 1: 8. Bloco 2: pega-pega.', 'Bloco 1: 12; na Turma B; 20 estudantes. Bloco 2: 6, 9 e 5 quadradinhos.',
         'Bloco 1: a Turma B, 3 a mais; 27. Bloco 2: Turma A 7, 5, total 12; Turma B 8, 7, total 15. Bloco 3: sim, os totais são 12 e 15, iguais ao gráfico.'],
        a, b, c)


def pesquisa_tres_variaveis():
    a = bloco(1, 'Pergunte a 6 colegas: qual a sua fruta preferida? Faça um risquinho.', tabela(['Fruta', 'Risquinhos', 'Total'], [['maçã', '', ''], ['banana', '', ''], ['uva', '', '']])) + bloco(
        2, 'Qual fruta teve mais votos? Circule.', item(opcoes(['maçã', 'banana', 'uva'])))
    b = bloco(1, 'Pesquisa com a turma: fruta preferida, cor preferida e animal preferido. Anote as respostas de 5 colegas.', tabela(['Colega', 'Fruta', 'Cor', 'Animal'], [['', '', '', '']] * 5)) + bloco(
        2, 'Faça o gráfico de uma das perguntas.', grafico_barras(['', '', ''], None, 6, vazio=True, celula=26))
    c = bloco(1, 'Planeje uma pesquisa com três perguntas sobre a turma.', frases(['Pergunta 1:', 'Pergunta 2:', 'Pergunta 3:', 'Quantos colegas vou entrevistar?'])) + bloco(
        2, 'Organize os dados numa lista, numa tabela e num gráfico.', caixa_desenho('44mm')) + bloco(
        3, 'O que a pesquisa mostrou?', linhas(2))
    return h2(
        'pesquisa-com-tres-perguntas', 'Pesquisa com três perguntas', 'EF02MA23',
        'Fazer uma pesquisa com até três perguntas, organizar os dados em listas, tabelas e gráficos e contar o que descobriu.',
        'Prancheta, folha de registro, post-its para o gráfico coletivo.',
        ['Escolha com a turma perguntas com poucas opções de resposta.',
         'Mostre como anotar a resposta de cada colega numa linha.',
         'Conte as respostas de uma pergunta e faça o gráfico.',
         'Na versão C, o estudante planeja a pesquisa e organiza os dados de três jeitos.'],
        ['Faça a pesquisa em dupla, com uma pergunta por vez.',
         'Dê um roteiro fixo: perguntar, anotar, contar, desenhar o gráfico.',
         'Deixe o estudante circular pela sala entrevistando colegas.'],
        ['Bloco 1 e 2: resultado da turma.', 'Bloco 1 e 2: resultado da turma; o gráfico deve ter os nomes das respostas embaixo.',
         'Bloco 1 a 3: respostas pessoais; confira se a lista, a tabela e o gráfico mostram os mesmos números.'],
        a, b, c)


FICHAS = [comparar_ordenar_999, contar_ate_1000, comparar_diferenca, compor_decompor_999, fatos_adicao_subtracao, problemas_adicao_subtracao,
          multiplicar_2_a_5, sequencias_com_regra, descrever_padrao, falta_na_sequencia, localizar_no_mapa, plantas_simples, comparar_solidos,
          comparar_figuras_planas, medir_comprimentos, massa_capacidade, intervalos_datas, duracao_relogio, equivalencia_dinheiro,
          muito_pouco_provavel, tabelas_dupla_entrada, pesquisa_tres_variaveis]
