"""4º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import grupo, relogio, svg  # noqa: F401
from desenhos2 import angulo, grafico_barras, malha, planificacao, poligono_svg, pote, regular, roleta, solido, termometro
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, matriz, opcoes, pratos, problema, resposta, seq_numeros, tabela
from ano3 import frases, ligar
from ano4 import com_eixo, grafico_escala, malha_eixo, n
from hab3 import cx, fila_h, probs, quad, relogios, rot, tc


def h4(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='30 a 45 minutos'):
    return ficha(slug, titulo, '4º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ordens(linha):
    return tabela(['DM', 'UM', 'C', 'D', 'U'], [linha])


def ret(c, l):
    return [(i, j) for i in range(c) for j in range(l)]


QUAD = regular(4, 34, -45, rotulo='quadrado')
RET = poligono_svg([(4, 10), (104, 10), (104, 60), (4, 60)], rotulo='retângulo')
TRI_RET = poligono_svg([(4, 4), (4, 70), (90, 70)], rotulo='triângulo com um ângulo reto')
TRI = regular(3, 36, rotulo='triângulo')


# ---------- Números ----------

def numeros_ate_99999():
    a = bloco(1, 'Leia o quadro de ordens e circule o número.', grade([
        item(ordens(['2', '3', '4', '0', '5']), opcoes([n(23405), n(2345)], certa=n(23405)), exemplo=True),
        item(ordens(['1', '0', '6', '2', '0']), opcoes([n(10620), n(1620)]))], 2), 'DM é dezena de milhar, UM é unidade de milhar.') + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes([n(45000), n(9999)])), item(opcoes([n(30100), n(31000)]))], 2))
    b = bloco(1, 'Escreva o número por extenso.', frases([f'{n(12500)}:', f'{n(40080)}:'])) + bloco(
        2, 'Escreva &gt; ou &lt;.', grade([item(cx(f'{n(12500)} {resposta("&lt;")} {n(15200)}'), exemplo=True), item(cx(f'{n(40080)} {VAZIO} {n(40800)}')),
                                          item(cx(f'{n(67300)} {VAZIO} {n(63700)}')), item(cx(f'{n(25010)} {VAZIO} {n(25001)}'))], 2))
    c = bloco(1, 'Ordene do menor para o maior.', frases([f'{n(58230)}, {n(58320)}, {n(52830)}, {n(85230)}:'])) + bloco(
        2, 'Escreva com algarismos.', frases(['setenta mil e quinze:', 'noventa e nove mil, novecentos e nove:'])) + bloco(
        3, 'Leia e resolva.', problema(f'Um estádio tem {n(45870)} lugares e outro tem {n(45780)}. Qual tem mais lugares? Quantos a mais?', '16mm'))
    return h4(
        'ler-escrever-e-ordenar-numeros-ate-99999', 'Ler, escrever e ordenar números até 99 999', 'EF04MA01',
        'Ler, escrever, comparar e ordenar números naturais até a dezena de milhar, usando o quadro de ordens.',
        'Quadro de ordens grande, fichas com algarismos, notícias com números grandes.',
        ['Monte números no quadro de ordens com fichas.',
         'Leia em voz alta separando a classe dos milhares.',
         'Compare começando pela ordem maior.',
         'Na versão C, o estudante ordena, escreve e resolve um problema de comparação.'],
        ['Use o quadro de ordens com cores fixas. Números com poucos zeros primeiro.',
         'Escreva sempre com o espaço separando os milhares, do mesmo jeito.',
         'Faça um jogo de montar o maior número com 5 fichas sorteadas.'],
        [f'Bloco 1: {n(23405)}; {n(10620)}. Bloco 2: {n(45000)}; {n(31000)}.',
         'Bloco 1: doze mil e quinhentos; quarenta mil e oitenta. Bloco 2: &lt;; &lt;; &gt;; &gt;.',
         f'Bloco 1: {n(52830)}, {n(58230)}, {n(58320)}, {n(85230)}. Bloco 2: {n(70015)}; {n(99909)}. Bloco 3: o primeiro, 90 lugares a mais.'],
        a, b, c)


def potencias_de_dez():
    a = bloco(1, 'Junte as partes e circule o número.', grade([
        item(cx('3 × 1000 + 4 × 100 + 2 × 10 + 5'), opcoes([3425, 3542], certa=3425), exemplo=True),
        item(cx('6 × 1000 + 7 × 10'), opcoes([6070, 6700]))], 1)) + bloco(
        2, 'Quantas vezes o 10 cabe no 100? Circule.', item(opcoes([10, 100])))
    b = bloco(1, 'Decomponha com multiplicações por 10, 100, 1000 e 10 000.', frases([f'{n(4352)} =', f'{n(20715)} =', f'{n(8006)} =']),
              f'Exemplo: {n(3425)} = 3 × 1000 + 4 × 100 + 2 × 10 + 5') + bloco(
        2, 'Complete.', frases(['1 dezena de milhar = ___ milhares', '1 milhar = ___ centenas', '100 dezenas =']))
    c = bloco(1, 'Escreva o número.', frases(['5 × 10 000 + 3 × 100 + 9 =', '7 × 1000 + 12 × 10 ='])) + bloco(
        2, f'Escreva {n(36000)} de três jeitos diferentes, com multiplicações.', linhas(2)) + bloco(
        3, f'Por que o zero é importante em {n(50309)}?', linhas(1))
    return h4(
        'decompor-com-potencias-de-dez', 'Decompor com potências de dez', 'EF04MA02',
        'Mostrar que todo número pode ser escrito com adições e multiplicações por 10, 100, 1000 e 10 000.',
        'Material dourado, quadro de ordens, cédulas de brincadeira de 1, 10 e 100.',
        ['Troque 10 barras por 1 placa e 10 placas por 1 cubo grande.',
         'Escreva o número como soma de multiplicações: 3 × 1000 + 4 × 100.',
         'Mostre que cada ordem vale 10 vezes a anterior.',
         'Na versão C, o estudante decompõe o mesmo número de jeitos diferentes.'],
        ['Faça as trocas com material concreto antes de escrever.',
         'Use o mesmo quadro de ordens e o mesmo jeito de escrever a decomposição.',
         'Proponha trocas rápidas com cédulas de brincadeira.'],
        ['Bloco 1: 3425; 6070. Bloco 2: 10.',
         f'Bloco 1: 4 × 1000 + 3 × 100 + 5 × 10 + 2; 2 × 10 000 + 7 × 100 + 1 × 10 + 5; 8 × 1000 + 6. Bloco 2: 10; 10; {n(1000)}.',
         f'Bloco 1: {n(50309)}; {n(7120)}. Bloco 2: por exemplo 36 × 1000; 3 × 10 000 + 6 × 1000; 360 × 100. Bloco 3: ele guarda o lugar das ordens vazias (milhar e dezena).'],
        a, b, c)


def problemas_estimativa():
    a = bloco(1, 'Fica mais perto de qual dezena? Circule.', grade([
        item(cx('38'), opcoes([40, 30], certa=40), exemplo=True), item(cx('62'), opcoes([60, 70]))], 2)) + bloco(
        2, 'Estime: 38 + 62 dá mais ou menos: Circule.', item(opcoes([100, 50])))
    b = bloco(1, 'Estime e depois calcule.', tabela(['Conta', 'Estimativa', 'Resultado'], [
        ['298 + 405', '300 + 400 = 700', '703'], ['512 − 189', '', ''], [f'{n(1250)} + 760', '', ''], [f'{n(2000)} − {n(1395)}', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Leia e resolva.', probs([f'Uma escola tem {n(1248)} estudantes de manhã e 976 de tarde. Quantos estudantes ao todo?',
                                     f'Uma viagem tem {n(1500)} km. Já foram 865 km. Quantos quilômetros faltam?']))
    c = bloco(1, 'Leia e resolva.', probs([f'Comprei uma bicicleta de R$ {n(1289)} e um capacete de R$ 145. Paguei com R$ {n(1500)}. Quanto sobrou?',
                                          f'Uma biblioteca tinha {n(3450)} livros, recebeu {n(1275)} e doou 890. Quantos livros tem agora?'], '20mm')) + bloco(
        2, f'Antes de calcular, estime: {n(4980)} + {n(2030)} dá mais ou menos quanto? Explique.', linhas(2))
    return h4(
        'problemas-de-adicao-e-subtracao-com-estimativa', 'Problemas de adição e subtração com estimativa', 'EF04MA03',
        'Resolver e criar problemas de adição e subtração com números naturais, usando estimativa e cálculo mental.',
        'Reta numérica até 100 e até 1000, encartes de mercado.',
        ['Arredonde para a dezena ou a centena mais próxima usando a reta.',
         'Estime antes e confira depois: a conta está perto da estimativa?',
         'Use encartes para problemas reais de compra.',
         'Na versão C, o estudante resolve problemas de duas etapas e explica a estimativa.'],
        ['Use a reta para ver qual dezena está mais perto. Números pequenos primeiro.',
         'Mantenha a mesma tabela: conta, estimativa, resultado.',
         'Desafio: quem estima mais perto ganha um ponto.'],
        ['Bloco 1: 40; 60. Bloco 2: 100.',
         f'Bloco 1: 500 e 323; {n(2000)} e {n(2010)}; 600 e 605. Bloco 2: {n(2224)} estudantes; 635 km.',
         f'Bloco 1: R$ 66; {n(3835)} livros. Bloco 2: cerca de {n(7000)} (5 000 + 2 000).'],
        a, b, c)


def relacoes_operacoes():
    a = bloco(1, 'Use a conta de cima. Circule o resultado.', grade([
        item(tc('5 + 3 = 8', '8 − 3 = ?'), opcoes([5, 11], certa=5), exemplo=True),
        item(tc('4 × 2 = 8', '8 ÷ 2 = ?'), opcoes([4, 6]))], 2)) + bloco(
        2, 'Se 6 + 4 = 10, então 10 − 4 = Circule.', item(opcoes([6, 14])))
    b = bloco(1, 'Escreva a família de contas.', frases(['Com 6, 7 e 42 (multiplicação e divisão):', 'Com 25, 15 e 40 (adição e subtração):'])) + bloco(
        2, 'Complete e confira com a conta inversa.', frases(['56 ÷ 7 = ___, porque ___ × 7 = 56', '93 − 48 = ___, porque ___ + 48 = 93']))
    c = bloco(1, 'Descubra o número usando a operação inversa.', frases(['___ × 6 = 54', '___ − 125 = 300', '___ ÷ 4 = 12'])) + bloco(
        2, 'Quanto é 240 ÷ 8? Explique como você usou a multiplicação.', linhas(2))
    return h4(
        'relacoes-entre-as-operacoes', 'Relações entre as operações', 'EF04MA04',
        'Usar as relações entre adição e subtração e entre multiplicação e divisão para calcular e conferir resultados.',
        'Cartões de famílias de contas (três números), triângulos de fatos.',
        ['Monte um triângulo com 3, 5 e 8 e escreva as quatro contas da família.',
         'Mostre que a subtração desfaz a adição e a divisão desfaz a multiplicação.',
         'Confira divisões com a multiplicação.',
         'Na versão C, o estudante descobre números escondidos com a operação inversa.'],
        ['Use o triângulo de fatos recortado. Uma família por vez.',
         'Escreva as famílias sempre na mesma ordem: as duas de juntar e as duas de desfazer.',
         'Jogo rápido de cartões: mostre uma conta e peça a inversa.'],
        ['Bloco 1: 5; 4. Bloco 2: 6.',
         'Bloco 1: 6 × 7 = 42, 7 × 6 = 42, 42 ÷ 6 = 7, 42 ÷ 7 = 6; 25 + 15 = 40, 15 + 25 = 40, 40 − 15 = 25, 40 − 25 = 15. Bloco 2: 8 e 8; 45 e 45.',
         'Bloco 1: 9; 425; 48. Bloco 2: 30, porque 8 × 30 = 240.'],
        a, b, c)


def propriedades_operacoes():
    a = bloco(1, 'Mudou a ordem. O total mudou? Circule.', grade([
        item(matriz(2, 4) + cx('2 × 4 = 4 × 2'), opcoes(['igual', 'diferente'], certa='igual'), exemplo=True),
        item(cx('3 + 5 = 5 + 3'), opcoes(['igual', 'diferente']))], 2)) + bloco(
        2, 'Junte primeiro o 7 com o 3: 7 + 8 + 3 = 7 + 3 + 8. Quanto dá? Circule.', item(opcoes([18, 15])))
    b = bloco(1, 'Calcule do jeito mais fácil.', frases(['25 + 37 + 75 =', '4 × 7 × 5 =', '8 × 12 = 8 × 10 + 8 × 2 ='])) + bloco(
        2, 'Complete.', frases(['6 × 9 = 9 ×', '15 × 4 = 15 × 2 ×']))
    c = bloco(1, 'Decomponha para multiplicar.', frases(['7 × 23 = 7 × 20 + 7 × 3 =', '6 × 45 =', '9 × 102 ='])) + bloco(
        2, 'Por que 50 × 4 × 2 é fácil de calcular de cabeça?', linhas(2)) + bloco(
        3, 'Leia e resolva.', problema('Uma caixa tem 4 fileiras com 25 bombons. Quantos bombons há em 3 caixas? Calcule do jeito mais fácil.', '16mm'))
    return h4(
        'propriedades-das-operacoes-para-calcular', 'Propriedades das operações para calcular', 'EF04MA05',
        'Usar a troca de ordem, o agrupamento e a decomposição para calcular de cabeça e no papel.',
        'Tampinhas em fileiras, cartões com números, papel quadriculado.',
        ['Gire uma arrumação de 2 por 4: vira 4 por 2, o total é igual.',
         'Agrupe números que formam 10 ou 100 antes de somar.',
         'Decomponha um fator: 8 × 12 = 8 × 10 + 8 × 2.',
         'Na versão C, o estudante escolhe a estratégia e explica.'],
        ['Gire a arrumação de tampinhas de verdade. Mostre que nada mudou.',
         'Ensine uma estratégia por vez, sempre com o mesmo nome (trocar, agrupar, decompor).',
         'Desafio: quem acha o jeito mais rápido explica para a turma.'],
        ['Bloco 1: igual; igual. Bloco 2: 18.', 'Bloco 1: 137; 140; 96. Bloco 2: 6; 2.',
         'Bloco 1: 161; 270; 918. Bloco 2: 4 × 2 = 8 e 50 × 8 = 400, ou 50 × 2 = 100 e 100 × 4 = 400. Bloco 3: 4 × 25 = 100 e 3 × 100 = 300 bombons.'],
        a, b, c)


def problemas_multiplicacao():
    a = bloco(1, 'Conte as linhas e as colunas. Circule o total.', grade([
        item(matriz(3, 6), cx('3 × 6') + opcoes([18, 9], certa=18), exemplo=True),
        item(matriz(4, 5), cx('4 × 5') + opcoes([20, 9]))], 2)) + bloco(
        2, 'Um pacote tem 6 iogurtes. Quantos iogurtes há em 2 pacotes? Circule.', item(cx('6 + 6'), opcoes([12, 8])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Um teatro tem 12 fileiras com 15 cadeiras. Quantas cadeiras há?', 'Um caderno custa R$ 8. Quanto custam 7 cadernos?',
        'Uma receita usa 3 ovos para 1 bolo. Quantos ovos para 4 bolos?', 'Cada estudante ganhou 4 lápis. A turma tem 26 estudantes. Quantos lápis foram dados?']))
    c = bloco(1, 'Complete a tabela da receita.', tabela(['Bolos', '1', '2', '3', '5', '10'], [['Ovos', '3', '', '', '', '']])) + bloco(
        2, 'Leia e resolva.', probs(['Tenho 3 camisetas e 4 bermudas. Quantas combinações de roupa posso montar?', 'Um ônibus leva 42 pessoas. Quantas pessoas cabem em 6 ônibus?'])) + bloco(
        3, 'Invente um problema de multiplicação com uma receita.', linhas(2))
    return h4(
        'problemas-de-multiplicacao', 'Problemas de multiplicação', 'EF04MA06',
        'Resolver e criar problemas de multiplicação com parcelas iguais, disposição retangular e proporcionalidade.',
        'Caixas de ovos, papel quadriculado, receitas simples.',
        ['Mostre os três jeitos: grupos iguais, linhas e colunas, receita que dobra.',
         'Peça um desenho antes da conta.',
         'Monte uma tabela de proporção: 1 bolo, 2 bolos, 3 bolos.',
         'Na versão C, o estudante usa tabela de proporção e cria problemas.'],
        ['Desenhe os grupos ou a arrumação antes de calcular.',
         'Use sempre o mesmo esquema: o que se repete e quantas vezes.',
         'Use a receita da turma de verdade: o que muda se dobrarmos?'],
        ['Bloco 1: 18; 20. Bloco 2: 12.', 'Bloco 1: 180 cadeiras; R$ 56; 12 ovos; 104 lápis.',
         'Bloco 1: 6, 9, 15, 30. Bloco 2: 12 combinações; 252 pessoas. Bloco 3: resposta pessoal.'],
        a, b, c)


def divisao_dois_algarismos():
    a = bloco(1, 'Reparta igualmente. Quantos ficam em cada prato? Circule.', grade([
        item(pratos(3, 4), cx('12 ÷ 3') + opcoes([4, 3], certa=4), exemplo=True),
        item(pratos(5, 2, 'estrela'), cx('10 ÷ 5') + opcoes([2, 5]))], 2)) + bloco(
        2, 'Quanto é 20 ÷ 10? Circule.', item(cx('20 ÷ 10'), opcoes([2, 10])))
    b = bloco(1, 'Divida e escreva o resto.', tabela(['Divisão', 'Quociente', 'Resto'], [
        ['48 ÷ 4', '12', '0'], ['75 ÷ 5', '', ''], ['90 ÷ 15', '', ''], ['100 ÷ 12', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Leia e resolva.', probs(['96 figurinhas foram colocadas em pacotes de 12. Quantos pacotes?', '135 estudantes vão formar grupos de 15. Quantos grupos?']))
    c = bloco(1, 'Leia e resolva.', probs(['A escola vai levar 250 estudantes a um passeio. Cada ônibus leva 40. Quantos ônibus são necessários?',
                                          'Dividi R$ 156 igualmente entre 12 pessoas. Quanto cada uma recebeu?'], '20mm')) + bloco(
        2, 'Calcule 288 ÷ 24 e confira com a multiplicação.', linhas(2))
    return h4(
        'divisao-com-divisor-de-ate-dois-algarismos', 'Divisão com divisor de até dois algarismos', 'EF04MA07',
        'Resolver e criar problemas de divisão com divisor de até dois algarismos, por repartição e por medida.',
        'Tampinhas, saquinhos, material dourado, tabela de multiplicação.',
        ['Reparta tampinhas em grupos: quanto em cada?',
         'Agrupe de 12 em 12: quantos grupos cabem?',
         'Use a tabela de multiplicação para estimar o quociente.',
         'Na versão C, o estudante decide o que fazer com o resto.'],
        ['Reparta com objetos e saquinhos de verdade. Divisões exatas primeiro.',
         'Use sempre a mesma tabela: divisão, quociente, resto.',
         'Faça grupos com a turma em pé para dividir.'],
        ['Bloco 1: 4; 2. Bloco 2: 2.', 'Bloco 1: 15 e 0; 6 e 0; 8 e 4. Bloco 2: 8 pacotes; 9 grupos.',
         'Bloco 1: 7 ônibus (6 cheios e 1 com 10 estudantes); R$ 13. Bloco 2: 12, porque 12 × 24 = 288.'],
        a, b, c)


# ---------- Álgebra ----------

def sequencias_multiplos():
    a = bloco(1, 'Pule de 3 em 3. Qual vem depois? Circule.', grade([
        item(seq_numeros([3, 6, 9, None]), opcoes([12, 10], certa=12), exemplo=True),
        item(seq_numeros([5, 10, 15, None]), opcoes([20, 16]))], 2)) + bloco(
        2, 'O 8 está na sequência dos múltiplos de 2? Circule.', item(seq_numeros([2, 4, 6, 8, 10]), opcoes(['sim', 'não'])))
    b = bloco(1, 'Escreva os 6 primeiros múltiplos.', frases(['de 4:', 'de 6:', 'de 9:']), 'Os múltiplos de 3 são 0, 3, 6, 9, 12...') + bloco(
        2, 'Pinte os múltiplos de 5.', ''.join(seq_numeros(list(range(i, i + 6))) for i in range(1, 31, 6)))
    c = bloco(1, 'Os números 12, 24, 36 e 48 são múltiplos de quais números? Escreva pelo menos três.', linhas(1)) + bloco(
        2, 'Responda.', frases(['O 100 é múltiplo de 4? Por quê?', 'Qual o menor múltiplo de 4 e de 6 ao mesmo tempo, sem contar o zero?'])) + bloco(
        3, 'O que todos os múltiplos de 10 têm em comum?', linhas(1))
    return h4(
        'sequencias-de-multiplos', 'Sequências de múltiplos', 'EF04MA11',
        'Identificar regularidades em sequências de múltiplos de um número natural.',
        'Quadro de 100, reta numérica, tabela de multiplicação.',
        ['Pinte no quadro de 100 os múltiplos de 2, de 5 e de 10, cada um de uma cor.',
         'Observe os padrões: colunas, diagonais, o último algarismo.',
         'Mostre que os múltiplos são a tabuada continuada.',
         'Na versão C, o estudante encontra múltiplos comuns.'],
        ['Pule na reta do chão contando de 3 em 3. Use o quadro de 100 pintado.',
         'Use sempre as mesmas cores para cada número no quadro.',
         'Faça a contagem com palmas: bata palma só nos múltiplos de 3.'],
        ['Bloco 1: 12; 20. Bloco 2: sim.', 'Bloco 1: 4, 8, 12, 16, 20, 24; 6, 12, 18, 24, 30, 36; 9, 18, 27, 36, 45, 54 (começando no 4, 6 e 9). Bloco 2: 5, 10, 15, 20, 25, 30.',
         'Bloco 1: de 12, 6, 4, 3, 2 e 1. Bloco 2: sim, 4 × 25 = 100; 12. Bloco 3: terminam em 0.'],
        a, b, c)


def mesmo_resto():
    a = bloco(1, 'Faça grupos de 2. Sobrou alguma? Circule.', grade([
        item(grupo('bola', 6, 6, 30, 6), '<p class="legenda">6 bolas</p>' + opcoes(['não sobrou', 'sobrou 1'], certa='não sobrou'), exemplo=True),
        item(grupo('bola', 7, 7, 30, 6), '<p class="legenda">7 bolas</p>' + opcoes(['não sobrou', 'sobrou 1']))], 1)) + bloco(
        2, 'Os números pares não deixam resto na divisão por 2. O 10 é par? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Divida por 3 e anote o resto.', tabela(['Número', '÷ 3', 'Resto'], [['7', '2', '1'], ['10', '', ''], ['13', '', ''], ['16', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'O que você percebeu sobre os restos? Qual o próximo número que deixa resto 1 na divisão por 3?', linhas(2))
    c = bloco(1, 'Escreva 5 números que deixam resto 2 na divisão por 5.', linhas(1)) + bloco(
        2, 'Responda.', frases(['A turma tem 23 estudantes e faz grupos de 4. Quantos sobram?', 'E se fossem 27 estudantes?'])) + bloco(
        3, 'Por que 23 e 27 deixam o mesmo resto na divisão por 4?', linhas(2))
    return h4(
        'numeros-que-deixam-o-mesmo-resto', 'Números que deixam o mesmo resto', 'EF04MA12',
        'Investigar grupos de números que deixam o mesmo resto quando divididos pelo mesmo número.',
        'Tampinhas, potes para formar grupos, quadro de 100.',
        ['Forme grupos de 3 com 7, 10, 13 e 16 tampinhas: sobra sempre 1.',
         'Pinte no quadro de 100 os números que deixam resto 1 na divisão por 3.',
         'Mostre que eles aumentam de 3 em 3.',
         'Na versão C, o estudante explica por que dois números deixam o mesmo resto.'],
        ['Forme os grupos com objetos de verdade. Comece pela divisão por 2 (par e ímpar).',
         'Use a mesma tabela: número, divisão, resto.',
         'Faça a turma se dividir em grupos e contar quem sobra.'],
        ['Bloco 1: não sobrou; sobrou 1. Bloco 2: sim.', 'Bloco 1: 3 e resto 1; 4 e resto 1; 5 e resto 1. Bloco 2: todos deixam resto 1 e aumentam de 3 em 3; o próximo é 19.',
         'Bloco 1: por exemplo 2, 7, 12, 17, 22. Bloco 2: 3; 3. Bloco 3: 27 é 23 mais 4, um grupo a mais, e o resto continua igual.'],
        a, b, c)


def operacoes_inversas():
    a = bloco(1, 'Fiz uma conta e depois desfiz. Voltei ao número? Circule.', grade([
        item(tc('5 + 4 = 9', '9 − 4 = 5'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(tc('3 × 2 = 6', '6 ÷ 2 = 3'), opcoes(['sim', 'não']))], 2)) + bloco(
        2, 'O que desfaz o "+ 7"? Circule.', item(opcoes(['− 7', '× 7'])))
    b = bloco(1, 'Complete a máquina de ida e volta.', tabela(['Número', 'Ida', 'Resultado', 'Volta', 'Número de novo'], [
        ['12', '+ 8', '20', '− 8', '12'], ['15', '× 3', '', '', ''], ['40', '÷ 5', '', '', ''], ['100', '− 35', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva a operação que desfaz.', frases(['+ 25:', '× 6:', '÷ 10:']))
    c = bloco(1, 'Pensei num número, multipliquei por 4 e somei 3. Deu 31. Qual número pensei?', problema('Desfaça as contas, de trás para a frente.', '18mm')) + bloco(
        2, 'Pensei num número, tirei 12 e dividi por 2. Deu 9. Qual número pensei?', problema('Desfaça as contas, de trás para a frente.', '18mm')) + bloco(
        3, 'Invente um desafio "pensei num número" para um colega.', linhas(2))
    return h4(
        'operacoes-inversas', 'Operações inversas', 'EF04MA13',
        'Reconhecer, por investigação, que a subtração desfaz a adição e a divisão desfaz a multiplicação.',
        'Máquina de papel (caixa com entrada e saída), cartões com operações.',
        ['Brinque de máquina: o número entra, sai transformado, e outra máquina desfaz.',
         'Escreva a ida e a volta lado a lado.',
         'Resolva desafios "pensei num número" desfazendo de trás para a frente.',
         'Na versão C, o estudante desfaz duas operações em sequência.'],
        ['Use a caixa de máquina com cartões de verdade. Uma operação por vez.',
         'Use sempre setas: ida para a direita, volta para a esquerda.',
         'Os desafios "pensei num número" em dupla viram jogo.'],
        ['Bloco 1: sim; sim. Bloco 2: − 7.', 'Bloco 1: 45, ÷ 3, 15; 8, × 5, 40; 65, + 35, 100. Bloco 2: − 25; ÷ 6; × 10.',
         'Bloco 1: 31 − 3 = 28 e 28 ÷ 4 = 7. Bloco 2: 9 × 2 = 18 e 18 + 12 = 30. Bloco 3: resposta pessoal.'],
        a, b, c)


def igualdade_continua():
    a = bloco(1, 'Fiz a mesma coisa dos dois lados. Continua igual? Circule.', grade([
        item(tc('3 + 2 = 5', '3 + 2 + 2 = 5 + 2'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(tc('4 = 4', '4 + 3 = 4'), opcoes(['sim', 'não']))], 2), 'Na segunda, o 3 entrou só de um lado.') + bloco(
        2, 'Se 6 = 6, então 6 − 1 é igual a: Circule.', item(opcoes(['6 − 1', '6'])))
    b = bloco(1, 'Complete para continuar igual.', grade([
        item(cx(f'10 + 5 + 3 = 15 + {resposta(3)}'), exemplo=True), item(cx(f'20 − 4 − 2 = 16 − {VAZIO}')),
        item(cx(f'7 + 8 + 10 = 15 + {VAZIO}')), item(cx(f'9 × 2 + 5 = 18 + {VAZIO}'))], 2)) + bloco(
        2, 'Verdadeiro ou falso?', frases(['Se 12 = 12, então 12 + 5 = 12 + 5', 'Se 9 + 1 = 10, então 9 + 1 + 4 = 10 + 3']))
    c = bloco(1, 'Leia e resolva.', problema('Numa balança equilibrada, de um lado há 2 caixas iguais e 3 bolinhas; do outro, 11 bolinhas. '
                                            'Tirando 3 bolinhas dos dois lados, o que sobra? Quantas bolinhas vale cada caixa?', '22mm')) + bloco(
        2, 'Explique por que podemos tirar o mesmo número dos dois lados de uma igualdade.', linhas(2))
    return h4(
        'a-igualdade-continua-verdadeira', 'A igualdade continua verdadeira', 'EF04MA14',
        'Reconhecer que uma igualdade continua verdadeira quando somamos ou subtraímos o mesmo número dos dois lados.',
        'Balança de pratos, cubinhos, caixas pequenas.',
        ['Equilibre a balança com cubinhos dos dois lados.',
         'Coloque um cubinho de cada lado: continua equilibrada.',
         'Coloque só de um lado: desequilibra.',
         'Na versão C, o estudante usa a ideia para descobrir o valor de uma caixa.'],
        ['Use a balança de verdade. Cubinhos grandes e poucos.',
         'Repita a mesma frase: o que faço de um lado, faço do outro.',
         'Proponha desafios de equilibrar em duplas.'],
        ['Bloco 1: sim; não. Bloco 2: 6 − 1.', 'Bloco 1: 3; 2; 10; 5. Bloco 2: verdadeiro; falso.',
         'Bloco 1: sobram 2 caixas de um lado e 8 bolinhas do outro; cada caixa vale 4. Bloco 2: os dois lados mudam do mesmo jeito, então continuam iguais.'],
        a, b, c)


def numero_desconhecido():
    a = bloco(1, 'Que número falta? Circule.', grade([
        item(cx(f'3 + {resposta(2)} = 5'), opcoes([2, 8], certa=2), exemplo=True), item(cx(f'{VAZIO} + 4 = 10'), opcoes([6, 14]))], 2)) + bloco(
        2, 'Que número falta? Circule.', item(cx(f'9 − {VAZIO} = 7'), opcoes([2, 16])))
    b = bloco(1, 'Descubra o número que falta.', grade([
        item(cx(f'25 + {VAZIO} = 40')), item(cx(f'{VAZIO} − 18 = 30')), item(cx(f'63 − {VAZIO} = 20')), item(cx(f'{VAZIO} + 125 = 300'))], 2)) + bloco(
        2, 'Leia e resolva.', probs(['Tenho 48 figurinhas. Quantas faltam para 100?', 'Gastei R$ 35 e fiquei com R$ 27. Quanto eu tinha?']))
    c = bloco(1, 'Descubra o número que falta.', frases([f'345 + ___ = {n(1000)}', f'___ − {n(1250)} = {n(2750)}', f'{n(2000)} − ___ = {n(1175)}'])) + bloco(
        2, 'Leia e resolva.', problema('Um livro tem 240 páginas. Li 85 ontem e algumas hoje. Faltam 90. Quantas páginas li hoje?', '18mm')) + bloco(
        3, 'Escreva uma igualdade com um número escondido para um colega descobrir.', linhas(1))
    return h4(
        'descobrir-o-numero-que-falta', 'Descobrir o número que falta', 'EF04MA15',
        'Determinar o número desconhecido que torna verdadeira uma igualdade com adição ou subtração.',
        'Cartões com contas e um quadradinho vazio, reta numérica, balança.',
        ['Mostre 3 + ? = 5 com objetos: quantos faltam?',
         'Use a reta numérica: do 25 até o 40, quantos pulos?',
         'Use a operação inversa: ? − 18 = 30, então ? = 30 + 18.',
         'Na versão C, o estudante resolve problemas com números maiores.'],
        ['Complete com objetos antes de escrever. Números até 10 primeiro.',
         'O número escondido é sempre um quadradinho, do mesmo jeito.',
         'Faça como jogo de adivinhação em dupla.'],
        ['Bloco 1: 2; 6. Bloco 2: 2.', 'Bloco 1: 15; 48; 43; 175. Bloco 2: faltam 52; R$ 62.',
         f'Bloco 1: 655; {n(4000)}; 825. Bloco 2: 65 páginas. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- Geometria ----------

def prismas_piramides_atributos():
    a = bloco(1, 'É um prisma ou uma pirâmide? Circule.', grade([
        item(solido('prisma', 80), opcoes(['prisma', 'pirâmide'], certa='prisma'), exemplo=True), item(solido('piramide', 80), opcoes(['prisma', 'pirâmide']))], 2),
        'A pirâmide termina numa ponta.') + bloco(
        2, 'Esta planificação monta qual sólido? Circule.', item(planificacao('piramide', 22), opcoes(['pirâmide', 'cubo'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas'], [
        ['cubo', '6', '8', '12'], ['prisma de base triangular', '', '', ''], ['pirâmide de base quadrada', '', '', ''], ['pirâmide de base triangular', '', '', '']]),
        'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva o nome do sólido de cada planificação.', grade([item(planificacao('prisma', 22), resposta(largura='40mm')), item(planificacao('bloco', 22), resposta(largura='40mm'))], 2))
    c = bloco(1, 'Complete a tabela.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas'], [
        ['prisma de base pentagonal', '', '', ''], ['pirâmide de base pentagonal', '', '', ''], ['prisma de base hexagonal', '', '', '']])) + bloco(
        2, 'Some faces e vértices de cada sólido e compare com as arestas. O que você percebeu?', linhas(2)) + bloco(
        3, 'Qual a diferença entre um prisma e uma pirâmide?', linhas(1))
    return h4(
        'contar-faces-vertices-e-arestas', 'Prismas e pirâmides: faces, vértices e arestas', 'EF04MA17',
        'Associar prismas e pirâmides às suas planificações e comparar faces, vértices e arestas.',
        'Sólidos montados com palitos e massinha, planificações para recortar.',
        ['Monte prismas e pirâmides com palitos (arestas) e massinha (vértices).',
         'Conte faces, vértices e arestas e registre na tabela.',
         'Recorte e monte as planificações.',
         'Na versão C, o estudante descobre a relação entre faces, vértices e arestas.'],
        ['Monte com as mãos e marque o que já contou com adesivo.',
         'Mantenha a tabela com as mesmas colunas: faces, vértices, arestas.',
         'Montar com palitos e massinha dá ação à tarefa.'],
        ['Bloco 1: prisma; pirâmide. Bloco 2: pirâmide.', 'Bloco 1: 5, 6, 9; 5, 5, 8; 4, 4, 6. Bloco 2: prisma de base triangular; bloco retangular.',
         'Bloco 1: 7, 10, 15; 6, 6, 10; 8, 12, 18. Bloco 2: faces + vértices = arestas + 2. Bloco 3: o prisma tem duas bases iguais; a pirâmide tem uma base e um vértice no alto.'],
        a, b, c)


def angulos_retos():
    a = bloco(1, 'Este ângulo é reto? Circule.', grade([
        item(angulo(90, 100, mostrar=False), opcoes(['reto', 'não reto'], certa='reto'), exemplo=True), item(angulo(40, 100, mostrar=False), opcoes(['reto', 'não reto']))], 2),
        'Use o canto de uma folha para conferir.') + bloco(
        2, 'E este? Circule.', item(angulo(130, 100, mostrar=False), opcoes(['reto', 'não reto'])))
    b = bloco(1, 'Quantos ângulos retos tem cada figura?', grade([
        item(QUAD, resposta(largura='24mm')), item(RET, resposta(largura='24mm')), item(TRI_RET, resposta(largura='24mm')), item(TRI, resposta(largura='24mm'))], 4)) + bloco(
        2, 'Encontre 3 ângulos retos na sala e escreva onde estão.', linhas(2))
    c = bloco(1, 'Separe os ângulos usando um ângulo reto de papel dobrado.', grade([
        item(angulo(30, 90, mostrar=False), '<p class="legenda">a</p>'), item(angulo(150, 90, mostrar=False), '<p class="legenda">b</p>'),
        item(angulo(90, 90, mostrar=False), '<p class="legenda">c</p>'), item(angulo(60, 90, mostrar=False), '<p class="legenda">d</p>'),
        item(angulo(120, 90, mostrar=False), '<p class="legenda">e</p>')], 5) + frases(['Menores que o reto:', 'Iguais ao reto:', 'Maiores que o reto:'])) + bloco(
        2, 'Desenhe na malha uma figura de 4 lados com exatamente 2 ângulos retos.', malha(14, 4, 24))
    return h4(
        'angulos-retos-e-nao-retos', 'Ângulos retos e não retos', 'EF04MA18',
        'Reconhecer ângulos retos e não retos em figuras, com dobraduras, esquadros ou programas de computador.',
        'Folhas para dobrar, esquadros, canudos articulados.',
        ['Dobre uma folha duas vezes: o canto é um ângulo reto.',
         'Use o ângulo de papel para testar cantos da sala.',
         'Abra e feche canudos articulados: menor, igual ou maior que o reto.',
         'Na versão C, o estudante classifica ângulos e desenha figuras com ângulos retos.'],
        ['Use o ângulo de papel dobrado em todas as atividades.',
         'Marque o ângulo reto sempre com o quadradinho no canto.',
         'Caça aos ângulos retos pela escola, com prancheta.'],
        ['Bloco 1: reto; não reto. Bloco 2: não reto.', 'Bloco 1: 4; 4; 1; 0. Bloco 2: resposta pessoal (cantos da mesa, da porta, do quadro).',
         'Bloco 1: menores a e d; igual c; maiores b e e. Bloco 2: por exemplo, um trapézio com dois ângulos retos.'],
        a, b, c)


def simetria_reflexao():
    a = bloco(1, 'A linha divide a figura em duas partes iguais, como num espelho? Circule.', grade([
        item(com_eixo('triangulo', True), opcoes(['sim', 'não'], certa='sim'), exemplo=True), item(com_eixo('retangulo', False), opcoes(['sim', 'não']))], 2),
        'Dobre na linha: as partes se encaixam?') + bloco(
        2, 'Pinte o outro lado, como num espelho.', malha_eixo(6, 4, [(1, 1), (2, 1), (2, 2), (2, 3)], 3, 36))
    b = bloco(1, 'Complete a figura do outro lado do eixo.', malha_eixo(8, 5, [(1, 1), (2, 1), (3, 1), (3, 2), (2, 3), (3, 3)], 4, 30)) + bloco(
        2, 'Quais letras têm eixo de simetria? Circule.', item(opcoes(['A', 'F', 'H', 'R', 'M', 'J'])))
    c = bloco(1, 'Crie uma figura simétrica: pinte de um lado e depois o outro, com o eixo no meio.', malha_eixo(10, 6, [], 5, 26)) + bloco(
        2, 'Responda.', frases(['Quantos eixos de simetria tem o quadrado?', 'E o retângulo?'])) + bloco(
        3, 'As duas metades de uma figura simétrica são congruentes? Explique.', linhas(1))
    return h4(
        'simetria-de-reflexao', 'Simetria de reflexão', 'EF04MA19',
        'Reconhecer simetria de reflexão em figuras planas e usá-la para construir figuras congruentes.',
        'Espelho pequeno, papel para dobrar e recortar, tinta para carimbo dobrado.',
        ['Dobre uma folha, recorte e abra: as duas metades são iguais.',
         'Coloque o espelho na linha e veja a figura completa.',
         'Pinte com tinta de um lado, dobre e abra.',
         'Na versão C, o estudante cria figuras simétricas e conta eixos.'],
        ['O espelho e a dobradura mostram a simetria na hora. Figuras simples.',
         'O eixo é sempre a linha tracejada mais grossa.',
         'A pintura com dobra é rápida e dá resultado visível.'],
        ['Bloco 1: sim; não. Bloco 2: (3,1), (3,2), (3,3) e (4,1) pintados.', 'Bloco 1: figura espelhada do outro lado. Bloco 2: A, H e M.',
         'Bloco 1: figura pessoal. Bloco 2: 4; 2. Bloco 3: sim, uma é a outra virada, com a mesma forma e o mesmo tamanho.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def area_malha():
    a = bloco(1, 'Conte os quadradinhos. Qual é a área? Circule.', grade([
        item(quad(ret(3, 2)), opcoes([6, 5], certa=6), exemplo=True), item(quad([(0, 0), (0, 1), (0, 2), (1, 2)]), opcoes([4, 6]))], 2)) + bloco(
        2, 'Qual figura tem a maior área? Circule o número.', item(fila_h(rot(quad(ret(2, 2)), '1'), rot(quad(ret(3, 3)), '2')), opcoes(['1', '2'])))
    b = bloco(1, 'Escreva a área de cada figura, em quadradinhos.', grade([
        item(quad(ret(4, 3), 20), resposta(largura='24mm')), item(quad([(0, 0), (1, 0), (2, 0), (1, 1), (1, 2), (1, 3), (0, 3)], 20), resposta(largura='24mm')),
        item(quad(ret(5, 2), 20), resposta(largura='24mm'))], 3)) + bloco(
        2, 'Desenhe duas figuras diferentes, cada uma com área 12.', malha(16, 5, 22))
    c = bloco(1, 'Calcule a área sem contar um por um.', grade([item(quad(ret(6, 4), 16), resposta(largura='24mm')), item(quad(ret(7, 3), 16), resposta(largura='24mm'))], 2)) + bloco(
        2, 'Um retângulo tem 5 quadradinhos de largura e área 30. Quantos quadradinhos tem de altura?', linhas(1)) + bloco(
        3, 'Estime a área da capa do seu caderno em quadradinhos de 1 cm. Explique como pensou.', linhas(2))
    return h4(
        'area-na-malha-quadriculada', 'Área na malha quadriculada', 'EF04MA21',
        'Medir, comparar e estimar a área de figuras planas desenhadas em malha quadriculada, contando os quadradinhos.',
        'Malha quadriculada, quadradinhos de papel, geoplano.',
        ['Cubra a figura com quadradinhos de papel e conte.',
         'Em retângulos, conte uma linha e multiplique pelo número de linhas.',
         'Desenhe figuras diferentes com a mesma área.',
         'Na versão C, o estudante calcula a área com multiplicação.'],
        ['Cubra e conte com quadradinhos de papel. Marque o que já contou.',
         'Conte sempre linha por linha, da esquerda para a direita.',
         'Desafio: quantas figuras diferentes com área 12 a dupla consegue?'],
        ['Bloco 1: 6; 4. Bloco 2: 2.', 'Bloco 1: 12; 7; 10. Bloco 2: figuras pessoais com 12 quadradinhos.',
         'Bloco 1: 24; 21. Bloco 2: 6. Bloco 3: resposta pessoal.'],
        a, b, c)


def duracao_tempo():
    a = bloco(1, 'Quanto tempo passou? Circule.', grade([
        item(relogios(9, 0, 9, 30), opcoes(['30 minutos', '3 horas'], certa='30 minutos'), exemplo=True),
        item(relogios(1, 0, 3, 0), opcoes(['2 horas', '3 horas']))], 1)) + bloco(
        2, 'Um minuto tem: Circule.', item(opcoes(['60 segundos', '100 segundos'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Começou', 'Terminou', 'Durou'], [
        ['8:15', '9:00', '45 minutos'], ['10:40', '11:25', ''], ['14:10', '16:00', ''], ['19:30', '21:15', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Complete.', frases(['2 minutos = ___ segundos', '1 hora e meia = ___ minutos', '150 segundos = ___ minutos e ___ segundos']))
    c = bloco(1, 'Leia e resolva.', probs(['Um filme começou às 15:35 e durou 1 hora e 50 minutos. A que horas terminou?',
                                          'Numa corrida de 3 voltas, Ana fez 1 min 20 s, 1 min 15 s e 1 min 25 s. Qual foi o tempo total?'], '20mm')) + bloco(
        2, 'Monte a sua rotina da tarde com o horário de início e de fim de cada atividade.', tabela(['Atividade', 'Começa', 'Termina', 'Dura'], [['', '', '', '']] * 3))
    return h4(
        'duracao-em-horas-minutos-e-segundos', 'Duração em horas, minutos e segundos', 'EF04MA22',
        'Ler e registrar medidas de tempo em horas, minutos e segundos e resolver problemas de duração.',
        'Relógio de ponteiros de papel, cronômetro, agenda da turma.',
        ['Marque a hora de começo e de fim no relógio e conte o tempo que passou.',
         'Use o cronômetro para tarefas curtas em segundos.',
         'Transforme: 1 hora = 60 minutos, 1 minuto = 60 segundos.',
         'Na versão C, o estudante soma durações e calcula o horário de término.'],
        ['Gire os ponteiros com a mão. Horas inteiras e meias primeiro.',
         'Use uma rotina visual fixa com horários escritos.',
         'Desafios com cronômetro: quanto tempo para arrumar a mesa?'],
        ['Bloco 1: 30 minutos; 2 horas. Bloco 2: 60 segundos.', 'Bloco 1: 45 minutos; 1 hora e 50 minutos; 1 hora e 45 minutos. Bloco 2: 120; 90; 2 e 30.',
         'Bloco 1: 17:25; 4 minutos. Bloco 2: resposta pessoal.'],
        a, b, c)


def temperatura_celsius():
    t = lambda g: termometro(g, 40)
    a = bloco(1, 'Qual termômetro marca a temperatura mais alta? Circule o número.', grade([
        item(fila_h(rot(t(30), '1'), rot(t(10), '2')), opcoes(['1', '2'], certa='1'), exemplo=True),
        item(fila_h(rot(t(15), '1'), rot(t(35), '2')), opcoes(['1', '2']))], 2), 'Quanto mais alto o vermelho, mais quente.') + bloco(
        2, 'Com febre, a temperatura do corpo fica perto de: Circule.', item(opcoes(['38 °C', '10 °C'])))
    b = bloco(1, 'Leia o termômetro e escreva a temperatura.', grade([
        item(t(24), resposta(largura='18mm') + ' °C'), item(t(12), resposta(largura='18mm') + ' °C'), item(t(36), resposta(largura='18mm') + ' °C')], 3)) + bloco(
        2, 'Ligue a temperatura à situação.', ligar([('0 °C', 'dia de muito calor'), ('35 °C', 'água congelando'), ('100 °C', 'corpo de uma pessoa'), ('36 °C', 'água fervendo')]))
    c = bloco(1, 'Leia e resolva.', problema('De manhã fazia 12 °C e à tarde fazia 27 °C. Quantos graus a temperatura subiu?', '16mm')) + bloco(
        2, 'Responda.', frases(['Qual instrumento mede a temperatura?', 'Em que unidade medimos a temperatura no Brasil?'])) + bloco(
        3, 'Por que é útil saber a temperatura do dia?', linhas(2))
    return h4(
        'temperatura-em-graus-celsius', 'Temperatura em graus Celsius', 'EF04MA23',
        'Reconhecer a temperatura como grandeza e o grau Celsius como unidade, lendo termômetros.',
        'Termômetro de parede, termômetro clínico, copos com água fria e morna.',
        ['Meça a temperatura da sala e da água fria e morna.',
         'Leia o termômetro contando os tracinhos de 1 em 1 ou de 5 em 5.',
         'Relacione temperaturas a situações: gelo, corpo, dia quente.',
         'Na versão C, o estudante calcula variações de temperatura.'],
        ['Use o termômetro de verdade. Leia junto, apontando o nível.',
         'Use sempre o mesmo termômetro desenhado, com os números de 10 em 10.',
         'Medir a temperatura em vários lugares da escola dá movimento.'],
        ['Bloco 1: 1; 2. Bloco 2: 38 °C.', 'Bloco 1: 24 °C; 12 °C; 36 °C. Bloco 2: 0 °C água congelando; 35 °C dia de muito calor; 100 °C água fervendo; 36 °C corpo de uma pessoa.',
         'Bloco 1: 15 graus. Bloco 2: o termômetro; grau Celsius (°C). Bloco 3: resposta pessoal (escolher a roupa, cuidar da saúde).'],
        a, b, c)


def maximas_minimas():
    a = bloco(1, 'Temperaturas da semana. Qual dia teve a máxima mais alta? Circule.', tabela(['Dia', 'Máxima', 'Mínima'], [
        ['segunda', '28 °C', '16 °C'], ['terça', '30 °C', '18 °C'], ['quarta', '24 °C', '14 °C']]) + item(opcoes(['terça', 'quarta']))) + bloco(
        2, 'Na segunda, a temperatura mínima foi: Circule.', item(opcoes(['16 °C', '28 °C'])))
    b = bloco(1, 'Use a tabela.', tabela(['Dia', 'seg', 'ter', 'qua', 'qui', 'sex'], [['Máxima (°C)', '28', '30', '24', '26', '32'], ['Mínima (°C)', '16', '18', '14', '15', '20']]) + frases([
        'Qual a diferença entre a máxima e a mínima de segunda?', 'Qual dia teve a mínima mais baixa?'])) + bloco(
        2, 'Pinte o gráfico com as máximas. Cada quadradinho vale 2 graus.', grafico_escala(['seg', 'ter', 'qua', 'qui', 'sex'], None, 34, 2, celula=16, larg=44, gap=34))
    c = bloco(1, 'Registre a máxima e a mínima de 5 dias, pela previsão do tempo.', tabela(['Dia', 'Máxima', 'Mínima', 'Diferença'], [['', '', '', '']] * 5)) + bloco(
        2, 'Faça um gráfico de colunas duplas: uma cor para a máxima e outra para a mínima.', caixa_desenho('46mm')) + bloco(
        3, 'Qual dia teve a maior diferença entre a máxima e a mínima?', linhas(1))
    return h4(
        'temperaturas-maximas-e-minimas', 'Temperaturas máximas e mínimas', 'EF04MA24',
        'Registrar as temperaturas máxima e mínima do dia e organizar os dados em tabelas e gráficos de colunas.',
        'Previsão do tempo de jornal ou aplicativo, termômetro de parede, cartaz para a semana.',
        ['Leia a previsão do tempo: o que é máxima e mínima?',
         'Registre por uma semana num cartaz da turma.',
         'Monte o gráfico de colunas com as máximas.',
         'Na versão C, o estudante registra, faz o gráfico duplo e compara.'],
        ['Registre junto todos os dias, no mesmo horário. Use cores fixas: máxima rosa, mínima azul.',
         'Use sempre o mesmo modelo de tabela.',
         'Dê ao estudante a tarefa de consultar e anotar a previsão.'],
        ['Bloco 1: terça. Bloco 2: 16 °C.', 'Bloco 1: 12 graus; quarta (14 °C). Bloco 2: colunas com 14, 15, 12, 13 e 16 quadradinhos.',
         'Bloco 1 a 3: registro pessoal.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def eventos_provaveis():
    a = bloco(1, 'Tirando sem olhar, qual cor tem mais chance? Circule.', grade([
        item(pote(['verde'] * 8 + ['rosa'] * 2, 110, 'pote com 8 verdes e 2 rosa'), opcoes(['verde', 'rosa'], certa='verde'), exemplo=True),
        item(pote(['amarelo'] * 3 + ['rosa'] * 7, 110, 'pote com 3 amarelas e 7 rosa'), opcoes(['amarelo', 'rosa']))], 2)) + bloco(
        2, 'Chover muito amanhã no deserto é: Circule.', item(opcoes(['pouco provável', 'muito provável'])))
    b = bloco(1, 'Escreva: impossível, pouco provável, muito provável ou certo.', tabela(['Acontecimento', 'Chance'], [
        ['Amanhã ser o dia depois de hoje.', 'certo'], ['Tirar 7 num dado comum.', ''], ['Um colega usar tênis amanhã.', ''], ['Nevar na sua cidade no verão.', '']]),
        'A primeira linha é o exemplo.') + bloco(
        2, 'Olhe a roleta. Ordene as cores da mais provável para a menos provável.', item(roleta(['verde'] * 4 + ['rosa'] * 3 + ['amarelo'], 120)) + linhas(1))
    c = bloco(1, 'Num saco há 10 fichas: 5 azuis, 3 vermelhas e 2 brancas.', frases([
        'Qual cor tem mais chance de sair?', 'É possível tirar uma ficha verde?', 'Tirando 20 vezes e devolvendo, mais ou menos quantas vezes sairá azul?'])) + bloco(
        2, 'Faça o experimento com uma roleta de papel e anote 20 giros.', tabela(['Cor', 'Vezes'], [['', ''], ['', ''], ['', '']])) + bloco(
        3, 'O resultado combinou com a sua previsão?', linhas(1))
    return h4(
        'eventos-com-mais-chance-de-acontecer', 'Eventos com mais chance de acontecer', 'EF04MA26',
        'Identificar, entre eventos do dia a dia e de jogos, os que têm maior chance de acontecer.',
        'Pote com bolinhas coloridas, roletas de papel com clipe, dados.',
        ['Mostre o pote: de qual cor há mais? Qual deve sair mais?',
         'Tire bolinhas, devolva e anote. A previsão combinou?',
         'Classifique acontecimentos do dia a dia: impossível, pouco provável, muito provável, certo.',
         'Na versão C, o estudante estima quantas vezes uma cor deve sair.'],
        ['Faça o sorteio de verdade e anote junto. Poucas cores.',
         'Use sempre as mesmas quatro palavras, num cartaz.',
         'Rodadas rápidas de previsão e sorteio.'],
        ['Bloco 1: verde; rosa. Bloco 2: pouco provável.', 'Bloco 1: impossível; muito provável; pouco provável ou impossível (depende da cidade). Bloco 2: verde, rosa, amarelo.',
         'Bloco 1: azul; não, é impossível; cerca de 10 vezes. Bloco 2 e 3: registro pessoal.'],
        a, b, c)


def analisar_tabelas_graficos():
    g = grafico_barras(['maçã', 'banana', 'pão'], [4, 6, 2], 6, icones=['maca', 'banana', 'pao'], celula=30, gap=28)
    a = bloco(1, 'Lanches vendidos na cantina. Quantas bananas foram vendidas? Circule.', item(g, opcoes([6, 4]))) + bloco(
        2, 'Qual lanche vendeu menos? Circule.', item(opcoes(['pão', 'banana'])))
    b = bloco(1, 'Esporte preferido da turma. Use a tabela.', tabela(['', 'Futebol', 'Vôlei', 'Basquete'], [['Meninas', '8', '10', '6'], ['Meninos', '12', '5', '7']]) + frases([
        'Quantos estudantes escolheram futebol?', 'Qual esporte as meninas mais escolheram?', 'Quantos estudantes responderam?'])) + bloco(
        2, 'Pinte o gráfico com o total de cada esporte.', grafico_escala(['futebol', 'vôlei', 'basquete'], None, 20, 1, celula=16, larg=50, gap=50))
    c = bloco(1, 'Livros emprestados pela biblioteca.', grafico_escala(['2022', '2023', '2024', '2025'], [150, 200, 250, 350], 400, 50, celula=16, larg=40, gap=30) + frases([
        'Em que ano houve mais empréstimos?', 'Quanto aumentou de 2024 para 2025?', 'O que você acha que vai acontecer em 2026? Por quê?'])) + bloco(
        2, 'Escreva uma conclusão sobre o gráfico.', linhas(2))
    return h4(
        'analisar-tabelas-e-graficos', 'Analisar tabelas e gráficos', 'EF04MA27',
        'Analisar dados de tabelas simples ou de dupla entrada e de gráficos de colunas ou pictóricos.',
        'Gráficos de jornais, cartaz de votação da turma.',
        ['Leia o título, os eixos e a legenda antes de responder.',
         'Faça perguntas de leitura direta e de comparação.',
         'Passe os dados de uma tabela para um gráfico.',
         'Na versão C, o estudante lê um gráfico com escala e faz previsões.'],
        ['Aponte linha e coluna com os dedos. Poucos dados.',
         'Siga sempre a mesma ordem de leitura: título, legenda, dados.',
         'Use a votação da turma em pé, com post-its.'],
        ['Bloco 1: 6. Bloco 2: pão.', 'Bloco 1: 20; vôlei; 48. Bloco 2: colunas com 20, 15 e 13.',
         'Bloco 1: 2025; 100 livros; resposta pessoal (talvez continue subindo). Bloco 2: resposta pessoal.'],
        a, b, c)


def pesquisa_categorica_numerica():
    a = bloco(1, 'Pergunte a 8 colegas: quantos irmãos você tem? Faça um risquinho.', tabela(['Irmãos', 'Risquinhos', 'Total'], [
        ['0', '', ''], ['1', '', ''], ['2', '', ''], ['3 ou mais', '', '']])) + bloco(
        2, 'Pinte o gráfico.', grafico_barras(['0', '1', '2', '3 ou +'], None, 8, vazio=True, celula=20, gap=40))
    b = bloco(1, 'Pergunte a 6 colegas o esporte preferido e a idade.', tabela(['Colega', 'Esporte', 'Idade'], [['', '', '']] * 6)) + bloco(
        2, 'Conte os esportes.', tabela(['Esporte', 'Total'], [['', '']] * 3)) + bloco(
        3, 'Qual a idade que mais apareceu?', linhas(1))
    c = bloco(1, 'Planeje uma pesquisa com duas perguntas: uma de categoria e uma de número.', frases(['Pergunta de categoria (ex.: fruta preferida):', 'Pergunta de número (ex.: quantos livros leu):', 'Quantas pessoas vou entrevistar:'])) + bloco(
        2, 'Faça uma tabela e um gráfico de colunas para cada pergunta.', caixa_desenho('50mm')) + bloco(
        3, 'Escreva um texto curto sobre o que a pesquisa mostrou.', linhas(3))
    return h4(
        'pesquisa-com-categorias-e-numeros', 'Pesquisa com dados de categorias e de números', 'EF04MA28',
        'Fazer pesquisas com variáveis categóricas e numéricas e organizar os dados em tabelas e gráficos de colunas.',
        'Prancheta, lista da turma, papel quadriculado grande.',
        ['Mostre a diferença: "fruta preferida" tem nomes; "quantos irmãos" tem números.',
         'Anote as respostas, conte e passe para a tabela.',
         'Monte o gráfico de colunas com título e legenda.',
         'Na versão C, o estudante planeja as duas perguntas e escreve o texto.'],
        ['Dê a pergunta e a tabela prontas. Entrevista com ajuda.',
         'Combine antes como perguntar e anotar.',
         'Sair para entrevistar outra turma dá movimento.'],
        ['Bloco 1: registro pessoal, total 8. Bloco 2: colunas iguais aos totais.', 'Bloco 1 a 3: resposta pessoal.', 'Bloco 1 a 3: resposta pessoal.'],
        a, b, c)


FICHAS = [numeros_ate_99999, potencias_de_dez, problemas_estimativa, relacoes_operacoes, propriedades_operacoes, problemas_multiplicacao,
          divisao_dois_algarismos, sequencias_multiplos, mesmo_resto, operacoes_inversas, igualdade_continua, numero_desconhecido,
          prismas_piramides_atributos, angulos_retos, simetria_reflexao, area_malha, duracao_tempo, temperatura_celsius, maximas_minimas,
          eventos_provaveis, analisar_tabelas_graficos, pesquisa_categorica_numerica]
