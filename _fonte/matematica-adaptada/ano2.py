"""Fichas do 2º ano."""
from base import ficha
from desenhos import figura, grupo, reta, svg
from desenhos2 import dourado3, mapa_bairro, objeto_medida, regua, fila
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, opcoes, problema, resposta, seq_numeros, tabela


def centenas():
    a = bloco(1, 'Placa vale 100, barra vale 10, cubinho vale 1. Circule o número.', grade([
        item(dourado3(1, 2, 3, 6), opcoes([123, 321], certa=123), exemplo=True),
        item(dourado3(1, 0, 5, 6), opcoes([15, 105])),
        item(dourado3(2, 1, 0, 6), opcoes([210, 21])),
        item(dourado3(1, 3, 0, 6), opcoes([130, 13])),
    ], 2), 'Conte as placas de 100 em 100, depois as barras de 10 em 10 e por último os cubinhos.')
    b = bloco(1, 'Escreva quantas placas, barras e cubinhos, e o número.', grade([
        item(dourado3(2, 3, 4, 5), f'<p class="du">{resposta(2)} C {resposta(3)} D {resposta(4)} U = {resposta(234)}</p>', exemplo=True),
        item(dourado3(1, 4, 2, 5), f'<p class="du">{VAZIO} C {VAZIO} D {VAZIO} U = {VAZIO}</p>'),
        item(dourado3(3, 0, 6, 5), f'<p class="du">{VAZIO} C {VAZIO} D {VAZIO} U = {VAZIO}</p>'),
        item(dourado3(2, 5, 0, 5), f'<p class="du">{VAZIO} C {VAZIO} D {VAZIO} U = {VAZIO}</p>'),
    ], 2), 'C = centena, D = dezena, U = unidade.') + bloco(2, 'Decomponha como no exemplo.', grade([
        '<p class="conta">245 = 200 + 40 + 5</p>', f'<p class="conta">368 = {VAZIO} + {VAZIO} + {VAZIO}</p>',
        f'<p class="conta">507 = {VAZIO} + {VAZIO}</p>', f'<p class="conta">190 = {VAZIO} + {VAZIO}</p>'], 2))
    c = bloco(1, 'Complete o quadro.', tabela(['Número', 'Centenas', 'Dezenas', 'Unidades', 'Por extenso'], [
        ['<b>356</b>', '3', '5', '6', 'trezentos e cinquenta e seis'], ['<b>482</b>', '', '', '', ''], ['<b>609</b>', '', '', '', ''], ['<b>770</b>', '', '', '', '']]),
        'A primeira linha é o exemplo.') + bloco(2, 'Compare. Escreva &gt;, &lt; ou =.', grade([
            f'<p class="conta">305 {VAZIO} 350</p>', f'<p class="conta">698 {VAZIO} 689</p>', f'<p class="conta">400 {VAZIO} 399</p>', f'<p class="conta">512 {VAZIO} 512</p>'], 2)) + bloco(
        3, 'Estime e depois conte: quantos feijões cabem num copinho? Conte agrupando de 10 em 10.',
        f'<p class="du">Minha estimativa: {resposta("", "22mm")} &nbsp; Contei: {resposta("", "22mm")}</p>')
    return ficha(
        'centenas-material-dourado-ate-999', 'Centenas com material dourado: números até 999', '2º ano',
        'Contar placas, barras e cubinhos, decompor números de três algarismos, comparar e estimar quantidades grandes.',
        ['EF02MA01', 'EF02MA02', 'EF02MA04'], '40 a 50 minutos',
        'Material dourado com placas; feijões ou grãos e copinhos para a estimativa; um quadro de valor (Kit de apoio visual).',
        ['Relembre a troca de 10 cubinhos por uma barra. Depois, troque 10 barras por uma placa.',
         'Monte números com o material e peça que o estudante diga quantas placas, barras e cubinhos tem.',
         'Na versão B, o estudante escreve C, D e U e depois o número. Mostre que o zero aparece quando falta uma das peças.',
         'Na versão C, a estimativa com feijões dá sentido aos números grandes: conte juntos em grupos de 10.',
         'Peça que o estudante leia em voz alta os números que formou.'],
        ['Use o material todos os dias e diga sempre a mesma frase: "dez barras formam uma placa". Mostre o zero com uma casa vazia no quadro de valor.',
         'O quadro de valor com colunas fixas (C, D, U) dá estrutura. Evite trocar a ordem das colunas entre atividades.',
         'A estimativa com feijões vira desafio: quem chega mais perto. Conte em grupos de 10 para manter o foco.'],
        ['105, 210, 130.', 'Bloco 1: 1, 4, 2 = 142; 3, 0, 6 = 306; 2, 5, 0 = 250. Bloco 2: 300 + 60 + 8; 500 + 7; 100 + 90.',
         'Bloco 1: 482 = 4, 8, 2, quatrocentos e oitenta e dois; 609 = 6, 0, 9, seiscentos e nove; 770 = 7, 7, 0, setecentos e setenta. Bloco 2: &lt;, &gt;, &gt;, =. Bloco 3: resposta pessoal.'],
        a, b, c)


def adicao_subtracao():
    a = bloco(1, 'Junte as barras e os cubinhos. Quanto dá?', grade([
        item(dourado3(0, 1, 2, 7) + '<b class="mais">+</b>' + dourado3(0, 1, 3, 7), opcoes([25, 52], certa=25), exemplo=True, classe='largo'),
        item(dourado3(0, 2, 1, 7) + '<b class="mais">+</b>' + dourado3(0, 1, 4, 7), opcoes([35, 34]), classe='largo'),
        item(dourado3(0, 3, 0, 7) + '<b class="mais">+</b>' + dourado3(0, 1, 6, 7), opcoes([46, 40]), classe='largo'),
    ], 1), 'Junte primeiro as barras, depois os cubinhos.') + bloco(2, 'Quantos a mais? Conte as figuras que sobram sem par.', grade([
        item('<div class="pares">' + grupo('maca', 6, por_linha=6, tam=40) + grupo('maca', 4, por_linha=6, tam=40) + '</div>', opcoes([2, 10])),
    ], 1))
    b = bloco(1, 'Calcule. Use o material dourado se quiser.', grade([
        conta(23, '+', 14, 37), conta(35, '+', 42), conta(56, '−', 23), conta(78, '−', 45), conta(41, '+', 27), conta(69, '−', 34)], 2), 'O primeiro é o exemplo.') + bloco(
        2, 'Quanto falta? Complete.', grade([
            f'<p class="conta">20 + {VAZIO} = 30</p>', f'<p class="conta">45 + {VAZIO} = 50</p>', f'<p class="conta">60 + {VAZIO} = 100</p>', f'<p class="conta">88 + {VAZIO} = 90</p>'], 2)) + bloco(
        3, 'Leia e resolva.', problema('Pedro tem <b>34</b> figurinhas e Ana tem <b>21</b>. Quantas figurinhas Pedro tem a mais que Ana?', '22mm'))
    c = bloco(1, 'Calcule.', grade([conta(146, '+', 231), conta(358, '+', 127), conta(475, '−', 132), conta(600, '−', 250), conta(299, '+', 1), conta(820, '−', 19)], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('A escola tem <b>235</b> estudantes de manhã e <b>187</b> à tarde. Quantos estudantes ao todo?', '24mm'),
            problema('Um livro tem <b>120</b> páginas. Júlio já leu <b>85</b>. Quantas páginas faltam?', '24mm')], 2)) + bloco(
        3, 'Cálculo mental: escreva só o resultado.', grade([f'<p class="conta">300 + 400 = {VAZIO}</p>', f'<p class="conta">90 + 10 = {VAZIO}</p>',
                                                            f'<p class="conta">500 − 200 = {VAZIO}</p>', f'<p class="conta">150 + 50 = {VAZIO}</p>'], 2))
    return ficha(
        'adicao-e-subtracao-ate-999', 'Adição e subtração até 999', '2º ano',
        'Juntar, comparar, completar e retirar com números de até três algarismos, com material dourado e cálculo mental.',
        ['EF02MA03', 'EF02MA05', 'EF02MA06'], '40 a 50 minutos', 'Material dourado; o quadro de 100; fichas com os fatos básicos (10 + 10, 50 + 50) para consulta.',
        ['Comece montando as duas parcelas com o material dourado e juntando as peças do mesmo tipo.',
         'Mostre a troca quando os cubinhos passam de 9: dez cubinhos viram uma barra.',
         'Para "quantos a mais", coloque as duas quantidades lado a lado, formando pares.',
         'Na versão B, "quanto falta" é a subtração vista como completar: conte para a frente.',
         'Na versão C, peça a estimativa antes da conta: o resultado vai dar perto de quanto?'],
        ['Mantenha o material sempre ao alcance e peça que o estudante monte antes de calcular. Fatos básicos em cartões, à vista, ajudam a memória.',
         'Armar a conta sempre no mesmo formato (unidades embaixo de unidades) dá previsibilidade. Use uma malha quadriculada para alinhar os algarismos.',
         'Cálculo mental em rodadas curtas, com resposta rápida, mantém a atenção. Alterne com contas no papel.'],
        ['Bloco 1: 35, 46. Bloco 2: 2.', 'Bloco 1: 77, 33, 33, 68, 35. Bloco 2: 10, 5, 40, 2. Bloco 3: 13.',
         'Bloco 1: 377, 485, 343, 350, 300, 801. Bloco 2: 422 estudantes; 35 páginas. Bloco 3: 700, 100, 300, 200.'],
        a, b, c)


def dobro_metade():
    a = bloco(1, 'O dobro é o mesmo tanto de novo. Desenhe e circule.', grade([
        item(grupo('estrela', 2, tam=44) + '<b class="mais">→</b>' + grupo('estrela', 4, tam=44), opcoes([4, 3], certa=4), exemplo=True, classe='largo'),
        item(grupo('maca', 3, tam=44) + '<b class="mais">→</b>' + '<span class="caixa-vazia"></span>', opcoes([6, 5]), classe='largo'),
    ], 1)) + bloco(2, 'A metade é dividir em dois grupos iguais. Circule.', grade([
        item(grupo('bola', 4, tam=44), '<p class="legenda">metade de 4</p>' + opcoes([2, 1])),
        item(grupo('flor', 6, tam=44, por_linha=3), '<p class="legenda">metade de 6</p>' + opcoes([3, 2])),
    ], 2), 'Use um barbante para separar os dois grupos.')
    b = bloco(1, 'Complete a tabela.', tabela(['Número', 'Dobro', 'Metade'], [['<b>4</b>', '8', '2'], ['<b>6</b>', '', ''], ['<b>10</b>', '', ''], ['<b>8</b>', '', ''], ['<b>20</b>', '', '']]),
              'A primeira linha é o exemplo.') + bloco(2, 'Triplo é 3 vezes. Desenhe três grupos iguais e escreva.', grade([
                  item(caixa_desenho('26mm'), '<p class="du">Triplo de 2 = ' + VAZIO + '</p>'), item(caixa_desenho('26mm'), '<p class="du">Triplo de 4 = ' + VAZIO + '</p>')], 2))
    c = bloco(1, 'Complete a tabela.', tabela(['Número', 'Dobro', 'Triplo', 'Metade', 'Terça parte'], [
        ['<b>6</b>', '12', '18', '3', '2'], ['<b>12</b>', '', '', '', ''], ['<b>9</b>', '', '', '—', ''], ['<b>30</b>', '', '', '', '']])) + bloco(2, 'Leia e resolva.', grade([
            problema('Lia tem <b>8</b> anos. A mãe dela tem o triplo da idade de Lia. Quantos anos tem a mãe?', '22mm'),
            problema('Uma pizza tem <b>12</b> pedaços. Comemos a metade. Quantos pedaços sobraram?', '22mm'),
            problema('Dividi <b>15</b> bolinhas em 3 partes iguais. Quantas ficaram em cada parte?', '22mm'),
            problema('Paulo tem <b>7</b> carrinhos. Marcos tem o dobro. Quantos carrinhos Marcos tem?', '22mm')], 2))
    return ficha(
        'dobro-metade-triplo-e-terca-parte', 'Dobro, metade, triplo e terça parte', '2º ano',
        'Dobrar e repartir em partes iguais com figuras, tabelas e problemas do dia a dia.',
        ['EF02MA08'], '30 a 45 minutos', 'Tampinhas, barbante para separar grupos e pratinhos; espelho pequeno, se houver, para mostrar o dobro.',
        ['Mostre o dobro com tampinhas: monte um grupo e depois outro igual ao lado.',
         'Mostre a metade repartindo tampinhas em dois pratinhos, uma de cada vez, até acabar.',
         'Na versão B, o triplo é desenhado em três grupos. Na versão C, a terça parte é repartir em três pratinhos.',
         'Leia os problemas devagar e pergunte se a resposta vai ser maior ou menor que o número do problema.',
         'Ligue a atividade ao dia a dia: dividir o lanche, dobrar uma receita.'],
        ['Repartir de verdade, uma tampinha em cada prato, é mais claro que calcular. Use as palavras "dobro" e "metade" sempre com o mesmo gesto.',
         'Diga que dobro, metade e triplo são regras fixas: dobro sempre soma o mesmo número de novo. Evite misturar com outras palavras no mesmo dia.',
         'O espelho ou a dobradura do papel mostram o dobro de forma rápida e divertida.'],
        ['Bloco 1: 6. Bloco 2: 2; 3.', 'Bloco 1: 12 e 3; 20 e 5; 16 e 4; 40 e 10. Bloco 2: 6; 12.',
         'Bloco 1: 12: 24, 36, 6, 4; 9: 18, 27, terça parte 3; 30: 60, 90, 15, 10. Bloco 2: 24 anos; 6 pedaços; 5 bolinhas; 14 carrinhos.'],
        a, b, c)


def sequencias_crescentes():
    a = bloco(1, 'Continue contando. Escreva o número que vem depois.', seq_numeros([10, 11, 12, None]) + seq_numeros([20, 21, None, None]) + seq_numeros([5, 6, 7, None]),
              'Use a reta numérica ou o quadro de 100.') + bloco(2, 'Agora para trás. Qual vem antes?', seq_numeros([5, 4, 3, None]) + seq_numeros([10, 9, None, None]))
    b = bloco(1, 'Complete as sequências.', seq_numeros([30, 32, 34, None, None, 40]) + seq_numeros([15, 20, 25, None, None, 40]) +
              seq_numeros([60, 50, 40, None, None, 10]) + seq_numeros([99, 98, None, 96, None, None])) + bloco(
        2, 'De quanto em quanto? Escreva a regra.', ''.join(seq_numeros(s) + '<p class="regra">Regra: <span class="linha-resp"></span></p>'
                                                             for s in ([3, 6, 9, 12], [50, 45, 40, 35])))
    c = bloco(1, 'Complete e escreva a regra.', ''.join(seq_numeros(s) + '<p class="regra">Regra: <span class="linha-resp"></span></p>' for s in (
        [100, 200, 300, None, None, None], [250, 260, 270, None, None, None], [500, 450, 400, None, None, None], [108, 112, 116, None, None, None]))) + bloco(
        2, 'Crie uma sequência que comece no 47 e vá de 5 em 5 para a frente.', seq_numeros([47, None, None, None, None, None]))
    return ficha(
        'sequencias-crescentes-e-decrescentes', 'Sequências crescentes e decrescentes', '2º ano',
        'Contar para a frente e para trás a partir de qualquer número, de 1 em 1, 2 em 2, 5 em 5 e 10 em 10, e descobrir a regra.',
        ['EF02MA09', 'EF02MA10'], '20 a 40 minutos', 'Reta numérica no chão, o quadro de 100 e cartões com números.',
        ['Conte com a turma a partir de um número diferente de 1 (por exemplo, a partir de 17).',
         'Na reta do chão, o estudante pula para a frente e para trás enquanto fala os números.',
         'Na versão A, comece sempre de 1 em 1. Na versão B, mostre os pulos de 2, 5 e 10 no quadro de 100.',
         'Peça que o estudante descubra a regra olhando de um número para o próximo.',
         'Na versão C, o estudante cria a própria sequência e um colega descobre a regra.'],
        ['Contagens com ritmo e palmas ajudam. O quadro de 100 colado na carteira dá apoio visual fixo.',
         'Padrões numéricos costumam ser agradáveis para estudantes autistas. Use cores no quadro de 100 para mostrar as regras.',
         'A reta numérica no chão dá movimento ao conteúdo. Alterne pular e escrever.'],
        ['Bloco 1: 13; 22 e 23; 8. Bloco 2: 2; 8 e 7.', 'Bloco 1: 36 e 38; 30 e 35; 30 e 20; 97, 95 e 94. Bloco 2: de 3 em 3; diminui 5.',
         'Bloco 1: 400, 500, 600 (de 100 em 100); 280, 290, 300 (de 10 em 10); 350, 300, 250 (diminui 50); 120, 124, 128 (de 4 em 4). Bloco 2: 52, 57, 62, 67, 72.'],
        a, b, c)


def trajetos():
    a = bloco(1, 'Siga o caminho tracejado. Aonde ele leva? Circule.', item(mapa_bairro([(0, 5), (1, 5), (2, 5), (3, 5), (3, 4), (3, 3), (3, 2)], 'mapa com caminho da casa até a praça')) +
              opcoes(['Escola', 'Praça', 'Mercado']), 'Passe o dedo pelo caminho, começando na Casa.') + bloco(2, 'Desenhe o caminho da Casa até o Mercado.', item(mapa_bairro()))
    b = bloco(1, 'Descreva o caminho da Casa até a Escola.', item(mapa_bairro([(0, 5), (0, 4), (0, 3), (0, 2), (0, 1), (0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (5, 0), (6, 0), (7, 0)])) +
              '<div class="frases">' + ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in ('Saio de casa e ando para', 'Ando quantos quadradinhos para cima?', 'Depois viro para a', 'E ando quantos quadradinhos?')) + '</div>',
              'Use: para cima, para baixo, para a direita, para a esquerda.')
    c = bloco(1, 'Desenhe a planta da sua sala de aula, vista de cima.', caixa_desenho('70mm'), 'Marque a porta, o quadro, a mesa do professor e a sua carteira.') + bloco(
        2, 'Responda olhando a sua planta.', '<div class="frases">' + ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in (
            'O que fica mais perto da porta?', 'Quem senta à sua direita?', 'Como você vai da porta até a sua carteira?')) + '</div>')
    return ficha(
        'trajetos-mapas-e-plantas', 'Trajetos, mapas e plantas', '2º ano',
        'Seguir e descrever caminhos em um mapa simples e desenhar a planta da sala de aula, com pontos de referência.',
        ['EF02MA12', 'EF02MA13'], '40 a 50 minutos', 'Fita crepe para montar um mapa no chão; um carrinho ou boneco para andar pelo caminho.',
        ['Monte um mapa no chão com fita crepe e quatro lugares (casa, escola, praça, mercado).',
         'O estudante anda o caminho com o corpo ou com um carrinho, enquanto descreve: "ando três para a frente, viro à direita".',
         'Na versão A, ele só segue o caminho já desenhado com o dedo.',
         'Na versão B, ajude a contar os quadradinhos de cada trecho.',
         'Na versão C, a planta da sala pode ser feita com recortes colados (mesa, porta, quadro).'],
        ['Andar o caminho de verdade antes de desenhar faz toda a diferença. Use poucos lugares no mapa e nomes conhecidos.',
         'Mapas e plantas costumam interessar muitos estudantes autistas. Combine as palavras de direção e use sempre as mesmas.',
         'O mapa no chão e o carrinho transformam a atividade em jogo. Peça desafios: o caminho mais curto.'],
        ['Bloco 1: Praça. Bloco 2: vários caminhos possíveis.', 'Bloco 1: para cima; 5; direita; 7.', 'Respostas pessoais.'],
        a, b, c)


def medir_comprimento():
    a = bloco(1, 'Quantos clipes mede cada lápis? Conte e circule.', grade([
        item(svg(300, 40, ''.join(f'<rect x="{i * 50 + 2}" y="22" width="46" height="14" rx="7" fill="#fff" stroke="#111" stroke-width="2"/>' for i in range(3)) +
                 '<rect x="2" y="2" width="150" height="14" rx="3" fill="#fff3a8" stroke="#111" stroke-width="2"/>', 'regua', 'lápis do tamanho de 3 clipes'), opcoes([3, 5], certa=3), exemplo=True),
        item(svg(300, 40, ''.join(f'<rect x="{i * 50 + 2}" y="22" width="46" height="14" rx="7" fill="#fff" stroke="#111" stroke-width="2"/>' for i in range(5)) +
                 '<rect x="2" y="2" width="250" height="14" rx="3" fill="#fff3a8" stroke="#111" stroke-width="2"/>', 'regua', 'lápis do tamanho de 5 clipes'), opcoes([4, 5])),
        item(svg(300, 40, ''.join(f'<rect x="{i * 50 + 2}" y="22" width="46" height="14" rx="7" fill="#fff" stroke="#111" stroke-width="2"/>' for i in range(2)) +
                 '<rect x="2" y="2" width="100" height="14" rx="3" fill="#fff3a8" stroke="#111" stroke-width="2"/>', 'regua', 'lápis do tamanho de 2 clipes'), opcoes([2, 6])),
    ], 1), 'Use clipes de verdade em cima da folha.')
    b = bloco(1, 'Meça cada linha com a régua. Escreva em centímetros.', ''.join(
        f'<div class="linha-medir"><svg viewBox="0 0 {cm * 37.8 + 4:.0f} 10" width="{cm * 37.8 + 4:.0f}" height="10" aria-hidden="true"><path d="M2 5 H{cm * 37.8 + 2:.0f}" stroke="#111" stroke-width="3" stroke-linecap="round"/></svg> {resposta()} cm</div>'
        for cm in (5, 8, 3, 12)), 'Coloque o zero da régua no começo da linha.') + bloco(2, 'O que você mediria com cada um? Ligue.', tabela(['Instrumento', 'Objeto'], [
            ['régua', 'o comprimento da sala'], ['fita métrica', 'uma borracha'], ['trena', 'a sua cintura']]))
    c = bloco(1, 'Meça e registre.', tabela(['Objeto', 'Estimativa', 'Medida'], [['Meu lápis', ' cm', ' cm'], ['Meu caderno', ' cm', ' cm'], ['A porta (altura)', ' m', ' m'], ['Meu palmo', ' cm', ' cm']]),
              'Primeiro estime, depois meça.') + bloco(2, 'Complete.', grade([f'<p class="conta">1 m = {VAZIO} cm</p>', f'<p class="conta">1 cm = {VAZIO} mm</p>',
                                                                              f'<p class="conta">2 m = {VAZIO} cm</p>', f'<p class="conta">50 cm + 50 cm = {VAZIO} m</p>'], 2)) + bloco(
        3, 'Leia e resolva.', problema('Uma fita tem <b>80</b> cm. Cortei <b>35</b> cm. Quantos centímetros sobraram?', '20mm'))
    return ficha(
        'medir-comprimentos-metro-e-centimetro', 'Medir comprimentos: metro e centímetro', '2º e 3º ano',
        'Medir com clipes, palmos e régua, escolher o instrumento certo e relacionar metro, centímetro e milímetro.',
        ['EF02MA16', ('EF03MA18', 'versão B'), ('EF03MA19', 'versão C')], '40 a 50 minutos',
        'Clipes do mesmo tamanho, régua de 30 cm, fita métrica de costura e trena; barbante.',
        ['Meça a mesa com palmos de dois estudantes diferentes. Por que deu diferente? Apresente a régua.',
         'Mostre como colocar o zero da régua na ponta do objeto. Este é o erro mais comum.',
         'Na versão A, os clipes ficam alinhados embaixo do lápis desenhado: o estudante conta.',
         'Na versão B, as linhas da folha têm 5, 8, 3 e 12 cm quando a folha é impressa sem ajuste de tamanho ("tamanho real").',
         'Na versão C, a estimativa antes da medida desenvolve a noção de tamanho.'],
        ['Comece com clipes e só depois a régua. Marque o zero da régua com uma cor.',
         'Medir tem regras claras (zero no começo, régua reta), o que pode deixar a atividade confortável. Mostre a regra com um exemplo e repita.',
         'Medir objetos pela sala dá movimento. Dê uma lista curta de objetos e um tempo combinado.'],
        ['Bloco 1: 5; 2.', 'Bloco 1: 5, 8, 3 e 12 cm (com a folha em tamanho real). Bloco 2: régua com borracha, fita métrica com cintura, trena com sala.',
         'Bloco 1: respostas pessoais. Bloco 2: 100, 10, 200, 1. Bloco 3: 45 cm.'],
        a, b, c)


def massa_capacidade():
    a = bloco(1, 'Qual é mais pesado? Circule.', grade([
        item(objeto_medida('melancia', 70) + objeto_medida('pena', 70), opcoes(['melancia', 'pena'], certa='melancia'), exemplo=True),
        item(objeto_medida('clipe', 70) + objeto_medida('tijolo', 70), opcoes(['clipe', 'tijolo'])),
    ], 2)) + bloco(2, 'Onde cabe mais água? Circule.', grade([
        item(objeto_medida('balde', 70) + objeto_medida('copinho', 70), opcoes(['balde', 'copinho'])),
        item(objeto_medida('garrafa', 70) + objeto_medida('copinho', 70), opcoes(['garrafa', 'copinho'])),
    ], 2), 'Experimente com água de verdade: encha o copinho e despeje na garrafa.')
    b = bloco(1, 'Usamos quilo (kg) para massa e litro (L) para capacidade. Escreva kg ou L.', grade([
        item(objeto_medida('pacote', 64), f'<p class="du">arroz: 1 {VAZIO}</p>'), item(objeto_medida('garrafa', 64), f'<p class="du">suco: 1 {VAZIO}</p>'),
        item(objeto_medida('balde', 64), f'<p class="du">água: 10 {VAZIO}</p>'), item(objeto_medida('melancia', 64), f'<p class="du">melancia: 5 {VAZIO}</p>')], 4)) + bloco(
        2, 'Quantos copinhos de 200 mL enchem uma garrafa de 1 litro? Faça a experiência.', f'<p class="du">Copinhos: {VAZIO}</p>') + bloco(
        3, 'Ordene do mais leve para o mais pesado: escreva 1, 2 e 3.', grade([item(objeto_medida('pena', 60), VAZIO), item(objeto_medida('tijolo', 60), VAZIO), item(objeto_medida('clipe', 60), VAZIO)], 3))
    c = bloco(1, 'Complete.', grade([f'<p class="conta">1 kg = {VAZIO} g</p>', f'<p class="conta">1 L = {VAZIO} mL</p>',
                                     f'<p class="conta">meio quilo = {VAZIO} g</p>', f'<p class="conta">meio litro = {VAZIO} mL</p>'], 2)) + bloco(
        2, 'Escolha a unidade: g, kg, mL ou L.', tabela(['O quê', 'Medida', 'Unidade'], [
            ['Uma colher de açúcar', '10', ''], ['Uma criança', '30', ''], ['Uma piscina', '5000', ''], ['Uma xícara de leite', '200', '']])) + bloco(
        3, 'Leia e resolva.', grade([problema('Uma receita usa <b>2</b> litros de leite. Tenho garrafas de <b>1</b> litro. Quantas garrafas preciso para fazer a receita duas vezes?', '20mm'),
                                     problema('Comprei <b>3</b> pacotes de <b>1</b> kg de farinha e usei <b>1</b> kg. Quantos quilos sobraram?', '20mm')], 2))
    return ficha(
        'massa-e-capacidade-quilo-e-litro', 'Massa e capacidade: quilo e litro', '2º e 3º ano',
        'Comparar o que é mais pesado e onde cabe mais, usar quilo, grama, litro e mililitro e resolver problemas de cozinha e mercado.',
        ['EF02MA17', ('EF03MA20', 'versão C')], '40 a 50 minutos',
        'Balança de cozinha ou de dois pratos, pacotes de 1 kg, garrafa de 1 litro, copinhos de 200 mL, água e um funil.',
        ['Deixe o estudante segurar objetos nas duas mãos e dizer qual pesa mais.',
         'Use a balança para conferir. Mostre o pacote de 1 kg como referência.',
         'Encha uma garrafa de 1 litro com copinhos de 200 mL, contando juntos.',
         'Na versão B, o estudante decide entre kg e L: pergunte se é algo que se pesa ou que se despeja.',
         'Na versão C, use embalagens reais para ler as medidas escritas.'],
        ['Segurar, pesar e despejar com as próprias mãos. Embalagens de casa (arroz, leite) dão contexto conhecido.',
         'Experiências com água podem ser muito agradáveis ou incômodas, dependendo da sensibilidade do estudante. Combine antes e tenha uma toalha à mão.',
         'A experiência de encher a garrafa dá um objetivo claro e movimento. Peça que o estudante registre cada copinho com um risco.'],
        ['Bloco 1: tijolo. Bloco 2: balde; garrafa.', 'Bloco 1: kg, L, L, kg. Bloco 2: 5 copinhos. Bloco 3: pena 1, clipe 2, tijolo 3.',
         'Bloco 1: 1000, 1000, 500, 500. Bloco 2: g, kg, L, mL. Bloco 3: 4 garrafas; 2 kg.'],
        a, b, c)


FICHAS = [centenas, adicao_subtracao, dobro_metade, sequencias_crescentes, trajetos, medir_comprimento, massa_capacidade]
