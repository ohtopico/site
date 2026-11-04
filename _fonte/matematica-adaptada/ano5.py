"""Fichas do 5º ano."""
from base import ficha
from desenhos import CLARO, TRACO, dinheiro, figura, grupo, svg
from desenhos2 import (balanca_eq, barra_fracao, grafico_linha, malha, objeto3d, objeto_medida, pizza_fracao, pote, regular, roleta)
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, opcoes, problema, produto, resposta, seq_numeros, tabela
from ano3 import frases
from ano4 import n, reta_fracao


def empilhado(cx, cy, cz, s=26, rotulo=None):
    """Bloco de cubinhos empilhados (cx de comprimento, cy de profundidade, cz de altura)."""
    d = s * .5
    W = cx * s + cy * d + 4
    H = cz * s + cy * d + 4
    base = H - 2
    inner = ''
    E = f'stroke="{TRACO}" stroke-width="1.6" stroke-linejoin="round"'
    for y in range(cy - 1, -1, -1):
        for z in range(cz):
            for x in range(cx):
                X, Y = 2 + x * s + y * d, base - z * s - y * d
                inner += (f'<path d="M{X} {Y - s} l{d} {-d} h{s} l{-d} {d}z" fill="#fff" {E}/>'
                          f'<path d="M{X + s} {Y} v{-s} l{d} {-d} v{s}z" fill="{CLARO["bege"]}" {E}/>'
                          f'<rect x="{X}" y="{Y - s}" width="{s}" height="{s}" fill="{CLARO["amarelo"]}" {E}/>')
    return svg(W, H, inner, 'cubos', rotulo or f'bloco de cubinhos: {cx} de comprimento, {cy} de largura e {cz} de altura')


def fig(t, tam=44):
    return svg(tam, tam, figura(t, 0, 0, tam), 'fig', t)


# ---------- 1. números grandes e decimais ----------

def numeros_decimais():
    quadro = lambda d: tabela(['CM', 'DM', 'UM', 'C', 'D', 'U'], [list(d)])
    a = bloco(1, 'Leia o quadro de valor. Circule o número.', grade([
        item(quadro('125300'), opcoes([n(125300), n(12530)], certa=n(125300)), exemplo=True),
        item(quadro('300000'), opcoes([n(30000), n(300000)])),
        item(quadro('204050'), opcoes([n(204050), n(24050)])),
    ], 2), 'CM = centena de milhar. Leia primeiro os milhares: "cento e vinte e cinco mil".') + bloco(
        2, 'A reta de 0 a 1 está dividida em 10 partes. Que número está no ponto?', item(reta_fracao(10, {3: '?'}), opcoes(['0,3', '3'])))
    b = bloco(1, 'Decomponha como no exemplo.', '<div class="conta-menor">' + grade([
        f'<p class="conta">{n(352418)} = {n(300000)} + {n(50000)} + {n(2000)} + 400 + 10 + 8</p>',
        f'<p class="conta">{n(607030)} = {VAZIO} + {VAZIO} + {VAZIO}</p>',
        f'<p class="conta">{n(120905)} = {VAZIO} + {VAZIO} + {VAZIO} + {VAZIO}</p>'], 1) + '</div>') + bloco(
        2, 'Escreva o número de cada ponto.', reta_fracao(10, {2: '?', 5: '?', 9: '?'})) + bloco(
        3, 'Escreva do menor para o maior: 0,8 &nbsp; 0,25 &nbsp; 0,5', seq_numeros([None] * 3), 'Pense em dinheiro: R$ 0,80, R$ 0,25 e R$ 0,50.')
    c = bloco(1, 'Escreva por extenso.', frases([f'{n(480016)}:'])) + bloco(
        2, 'Escreva do menor para o maior.', f'<p class="conta">{n(315000)} &nbsp; {n(351000)} &nbsp; {n(305100)}</p>' + seq_numeros([None] * 3) +
        '<p class="conta">2,5 &nbsp; 2,05 &nbsp; 2,45 &nbsp; 2,4</p>' + seq_numeros([None] * 4)) + bloco(
        3, 'A reta vai de 1 a 2. Escreva o número de cada ponto.', reta_fracao(10, {3: '?', 7: '?'}, ini='1', fim='2')) + bloco(
        4, 'Complete.', frases([f'{n(99999)} + 1 =', f'{n(500000)} − 1 =', 'O número que está no meio entre 3 e 4:']))
    return ficha(
        'numeros-ate-centenas-de-milhar-e-decimais', 'Números até centenas de milhar e números decimais', '5º ano',
        'Ler, escrever, decompor e ordenar números de seis algarismos e localizar números decimais na reta numérica.',
        ['EF05MA01', 'EF05MA02'], '40 a 50 minutos', 'Quadro de valor com seis colunas e a coluna dos décimos, fita métrica (para os decimais entre 0 e 1 metro) e dinheiro de brincadeira.',
        ['Escreva no quadro números do dia a dia: população da cidade, preço de uma casa, distâncias.',
         'No quadro de valor, mostre a classe dos milhares (CM, DM, UM) e a classe das unidades simples (C, D, U).',
         'Para os decimais, use a fita métrica: 0,3 m é 30 cm, três décimos do metro.',
         'Na versão B, compare os decimais pensando em dinheiro.',
         'Na versão C, a reta de 1 a 2 mostra que os decimais existem entre quaisquer dois números naturais.'],
        ['Leia os números grandes em partes, com a mão cobrindo a classe que ainda não foi lida. O quadro de valor fica à vista.',
         'Explique que 0,5 é maior que 0,25, apesar do 25 ser maior que o 5. Use o dinheiro como regra concreta.',
         'A fita métrica no chão dá movimento: o estudante pisa em 0,5 m, 0,8 m. Marque o tempo de cada desafio.'],
        [f'Bloco 1: {n(300000)}; {n(204050)}. Bloco 2: 0,3.',
         f'Bloco 1: {n(600000)} + {n(7000)} + 30; {n(100000)} + {n(20000)} + 900 + 5. Bloco 2: 0,2; 0,5; 0,9. Bloco 3: 0,25; 0,5; 0,8.',
         f'Bloco 1: quatrocentos e oitenta mil e dezesseis. Bloco 2: {n(305100)}, {n(315000)}, {n(351000)}; 2,05; 2,4; 2,45; 2,5. Bloco 3: 1,3; 1,7. Bloco 4: {n(100000)}; {n(499999)}; 3,5.'],
        a, b, c)


# ---------- 2. frações equivalentes e maiores que o inteiro ----------

def fracoes_equivalentes():
    a = bloco(1, 'As partes pintadas têm o mesmo tamanho? Circule.', grade([
        item(barra_fracao(2, 1, 240, 34) + barra_fracao(4, 2, 240, 34), '<p class="legenda">1/2 e 2/4</p>' + opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(barra_fracao(3, 1, 240, 34) + barra_fracao(6, 2, 240, 34), '<p class="legenda">1/3 e 2/6</p>' + opcoes(['sim', 'não'])),
        item(barra_fracao(2, 1, 240, 34) + barra_fracao(3, 1, 240, 34), '<p class="legenda">1/2 e 1/3</p>' + opcoes(['sim', 'não'])),
    ], 3), 'Coloque uma barra em cima da outra.') + bloco(2, 'Uma pizza inteira e mais um pedaço. Quantos quartos ao todo? Circule.', item(
        pizza_fracao(4, 4, 96) + pizza_fracao(4, 1, 96), opcoes(['5/4', '1/4'])))
    b = bloco(1, 'Complete as frações equivalentes.', grade([
        f'<p class="conta">1/2 = 2/4 = 3/6 = {VAZIO}/8 = 5/{VAZIO}</p>', f'<p class="conta">2/3 = 4/{VAZIO} = {VAZIO}/9</p>',
        f'<p class="conta">3/4 = 6/{VAZIO}</p>'], 1), 'Multiplique o número de cima e o de baixo pelo mesmo número.') + bloco(
        2, 'Escreva como uma fração só.', grade([
            '<p class="conta">1 inteiro e 1/2 = 3/2</p>', f'<p class="conta">2 inteiros e 1/4 = {VAZIO}</p>', f'<p class="conta">1 inteiro e 2/3 = {VAZIO}</p>'], 1)) + bloco(
        3, 'Leia e resolva.', problema('<b>3</b> pizzas foram divididas igualmente entre <b>4</b> pessoas. Que fração de pizza cada uma comeu?', '22mm'))
    c = bloco(1, 'São equivalentes? Escreva sim ou não.', grade([
        f'<p class="conta">2/5 e 4/10 {VAZIO}</p>', f'<p class="conta">3/4 e 6/10 {VAZIO}</p>', f'<p class="conta">5/10 e 1/2 {VAZIO}</p>', f'<p class="conta">2/3 e 8/12 {VAZIO}</p>'], 2)) + bloco(
        2, 'Maior, menor ou igual a um inteiro?', tabela(['Fração', 'Maior, menor ou igual a 1'], [['7/4', ''], ['3/8', ''], ['5/5', ''], ['9/6', '']])) + bloco(
        3, 'Leia e resolva.', grade([
            problema('<b>5</b> barras de chocolate divididas igualmente entre <b>2</b> crianças. Quanto cada uma recebe?', '22mm'),
            problema('Escreva três frações equivalentes a <b>3/5</b>.', '22mm')], 2))
    return ficha(
        'fracoes-equivalentes-e-maiores-que-o-inteiro', 'Frações equivalentes e maiores que o inteiro', '5º ano',
        'Comparar frações com tiras e pizzas, encontrar frações equivalentes e escrever frações maiores que a unidade e como resultado de divisão.',
        ['EF05MA03', 'EF05MA04'], '40 a 50 minutos', 'Tiras de papel do mesmo tamanho para dobrar em 2, 3, 4, 6 e 8 partes, círculos de papel e tesoura.',
        ['Dobre uma tira em 2 e outra em 4. Pinte 1/2 e 2/4 e coloque uma sobre a outra.',
         'Mostre que dividir 3 pizzas entre 4 pessoas dá 3/4 para cada: corte cada pizza em quartos e distribua.',
         'Na versão A, o estudante compara as tiras de papel de verdade.',
         'Na versão B, a regra "multiplicar em cima e embaixo pelo mesmo número" vem depois de ver com as tiras.',
         'Na versão C, peça que o estudante desenhe para justificar as respostas.'],
        ['As tiras de papel ficam na mesa como "muro das frações". Uma ideia nova por vez: primeiro metades e quartos.',
         'A regra de multiplicar em cima e embaixo é clara e previsível, mas mostre sempre o desenho junto, para dar sentido.',
         'Dobrar e recortar dá movimento. Desafie: quantas frações iguais a 1/2 você consegue escrever em 1 minuto?'],
        ['Bloco 1: sim; não. Bloco 2: 5/4.', 'Bloco 1: 4 e 10; 6 e 6; 8. Bloco 2: 9/4; 5/3. Bloco 3: 3/4 de pizza.',
         'Bloco 1: sim, não, sim, sim. Bloco 2: maior, menor, igual, maior. Bloco 3: 5/2 (duas barras e meia); por exemplo 6/10, 9/15, 12/20.'],
        a, b, c)


# ---------- 3. comparar decimais e frações, porcentagem ----------

def porcentagem():
    a = bloco(1, 'Que parte está pintada? Circule.', grade([
        item(barra_fracao(4, 2, 240, 36), '<p class="legenda">50%</p>' + opcoes(['metade', 'um quarto'], certa='metade'), exemplo=True),
        item(barra_fracao(4, 1, 240, 36), '<p class="legenda">25%</p>' + opcoes(['metade', 'um quarto'])),
        item(barra_fracao(4, 3, 240, 36), '<p class="legenda">75%</p>' + opcoes(['três quartos', 'metade'])),
        item(barra_fracao(4, 4, 240, 36), '<p class="legenda">100%</p>' + opcoes(['metade', 'o inteiro'])),
    ], 2), '100% é o inteiro.') + bloco(2, 'Qual é maior? Circule.', item(barra_fracao(10, 5, 240, 30) + barra_fracao(10, 3, 240, 30), '<p class="legenda">0,5 e 0,3</p>' + opcoes(['0,5', '0,3'])))
    b = bloco(1, 'Complete com o valor de cada porcentagem de 200.', tabela(['Porcentagem', 'É o mesmo que', 'De 200'], [
        ['10%', 'a décima parte', '20'], ['25%', 'a quarta parte', ''], ['50%', 'a metade', ''], ['75%', 'três quartos', ''], ['100%', 'o inteiro', '']])) + bloco(
        2, 'Compare. Escreva &gt;, &lt; ou =.', grade([f'<p class="conta">1/2 {VAZIO} 0,5</p>', f'<p class="conta">0,75 {VAZIO} 3/4</p>',
                                                       f'<p class="conta">1/4 {VAZIO} 0,4</p>', f'<p class="conta">0,1 {VAZIO} 1/5</p>'], 2), 'Desenhe as barras se precisar.')
    c = bloco(1, 'Escreva do menor para o maior: 0,6 &nbsp; 1/2 &nbsp; 3/4 &nbsp; 0,35', seq_numeros([None] * 4)) + bloco(
        2, 'Complete.', grade([f'<p class="conta">25% de 80 = {VAZIO}</p>', f'<p class="conta">10% de 350 = {VAZIO}</p>',
                               f'<p class="conta">75% de 40 = {VAZIO}</p>', f'<p class="conta">50% de 1 200 = {VAZIO}</p>'], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('Uma camiseta de <b>R$ 60</b> está com <b>25%</b> de desconto. Qual é o novo preço?', '20mm'),
            problema('Numa turma de <b>40</b> estudantes, <b>75%</b> vieram ao passeio. Quantos vieram?', '20mm'),
            problema('Que porcentagem de <b>20</b> é <b>5</b>?', '20mm')], 3))
    return ficha(
        'porcentagem-e-comparacao-de-decimais-e-fracoes', 'Porcentagem, decimais e frações', '5º ano',
        'Relacionar 10%, 25%, 50%, 75% e 100% com frações e comparar e ordenar números decimais e frações.',
        ['EF05MA05', 'EF05MA06'], '40 a 50 minutos', 'Malha de 10 por 10 (100 quadradinhos) para pintar, tiras de papel, folhetos de loja com descontos.',
        ['Pinte metade da malha de 100: são 50 quadradinhos, 50%. Faça o mesmo com 25 e 75.',
         'Mostre que 1/2, 0,5 e 50% são três jeitos de escrever a mesma parte.',
         'Na versão A, a barra dividida em 4 mostra quartos e porcentagens juntos.',
         'Na versão B, o estudante calcula as porcentagens dividindo: 25% é dividir por 4.',
         'Na versão C, use os folhetos de loja para inventar problemas de desconto.'],
        ['A malha de 100 pintada dá a imagem de cada porcentagem. Trabalhe só 50% e 25% antes das outras.',
         'Mostre um quadro fixo com as equivalências (1/2 = 0,5 = 50%) e deixe à vista durante a atividade.',
         'Os folhetos de loja dão um contexto real e rápido. Desafios curtos de "quanto fica com desconto?".'],
        ['Bloco 1: um quarto; três quartos; o inteiro. Bloco 2: 0,5.', 'Bloco 1: 50, 100, 150, 200. Bloco 2: =, =, &lt;, &lt;.',
         'Bloco 1: 0,35; 1/2; 0,6; 3/4. Bloco 2: 20, 35, 30, 600. Bloco 3: R$ 45; 30 estudantes; 25%.'],
        a, b, c)


# ---------- 4. adição e subtração com decimais ----------

def adicao_decimais():
    a = bloco(1, 'Quanto custa tudo? Circule.', grade([
        item(produto('suco', '2,50') + produto('pao', '1,50'), opcoes(['R$ 4,00', 'R$ 3,00'], certa='R$ 4,00'), exemplo=True),
        item(produto('leite', '3,50') + produto('banana', '2,00'), opcoes(['R$ 1,50', 'R$ 5,50'])),
    ], 1), 'Some os reais e depois os centavos. 50 centavos mais 50 centavos dá 1 real.') + bloco(
        2, 'Paguei R$ 5 por um suco de R$ 3,50. Qual é o troco? Circule.', item(produto('suco', '3,50') + dinheiro([5]), opcoes(['R$ 1,50', 'R$ 2,50'])))
    b = bloco(1, 'Calcule. Coloque vírgula embaixo de vírgula.', grade([
        conta('12,5', '+', '3,25', '15,75'), conta('8,40', '−', '2,15'), conta('0,75', '+', '0,25'), conta('10', '−', '3,6')], 2), 'O primeiro é o exemplo. 12,5 é o mesmo que 12,50.') + bloco(
        2, 'Leia e resolva.', grade([
            problema('Ana correu <b>2,5</b> km de manhã e <b>1,75</b> km à tarde. Quantos quilômetros ela correu?', '22mm'),
            problema('Um lanche custa <b>R$ 7,80</b>. Paguei com <b>R$ 10</b>. Qual foi o troco?', '22mm')], 2))
    c = bloco(1, 'Calcule.', grade([conta('125,8', '+', '34,75'), conta('300', '−', '45,5'), conta(n(1245), '+', f'{n(3780)} + 975'), conta('9,05', '−', '0,8')], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Comprei <b>1,5</b> kg de feijão, <b>0,75</b> kg de queijo e <b>2</b> kg de arroz. Quantos quilos ao todo?', '22mm'),
            problema('Uma garrafa tem <b>2</b> L de água. Já bebi <b>0,35</b> L. Quanto resta?', '22mm')], 2)) + bloco(
        3, 'Invente um problema de compra que se resolve com 20 − 12,75.', linhas(2))
    return ficha(
        'adicao-e-subtracao-com-decimais', 'Adição e subtração com números decimais', '5º ano',
        'Somar e subtrair números decimais com dinheiro, medidas e contas armadas com vírgula embaixo de vírgula.',
        ['EF05MA07'], '40 a 50 minutos', 'Dinheiro de brincadeira com moedas, folhetos com preços, fita métrica e uma balança de cozinha.',
        ['Comece com dinheiro: R$ 2,50 + R$ 1,50. Junte as moedas e troque 2 moedas de 50 centavos por 1 real.',
         'Mostre no quadro de valor por que a vírgula fica embaixo da vírgula: décimos com décimos, centésimos com centésimos.',
         'Na versão A, use o dinheiro de brincadeira em cima da mesa para todas as contas.',
         'Na versão B, complete com zero para as casas ficarem iguais: 12,5 vira 12,50.',
         'Na versão C, o estudante inventa um problema de compra para um colega resolver.'],
        ['O dinheiro é o melhor apoio para os decimais. Use uma malha quadriculada para alinhar as vírgulas.',
         'A regra "vírgula embaixo de vírgula" é fixa. Mostre sempre o mesmo modelo de conta armada.',
         'Uma lojinha com preços com centavos dá movimento e um objetivo claro. Corrija conta por conta.'],
        ['Bloco 1: R$ 5,50. Bloco 2: R$ 1,50.', 'Bloco 1: 6,25; 1; 6,4. Bloco 2: 4,25 km; R$ 2,20.',
         f'Bloco 1: 160,55; 254,5; {n(6000)}; 8,25. Bloco 2: 4,25 kg; 1,65 L. Bloco 3: resposta pessoal (o resultado é 7,25).'],
        a, b, c)


# ---------- 5. multiplicação e divisão com decimais ----------

def multiplicacao_decimais():
    a = bloco(1, 'Quanto custa? Circule.', grade([
        item(produto('suco', '1,50') + produto('suco', '1,50'), '<p class="conta">2 × R$ 1,50</p>' + opcoes(['R$ 3,00', 'R$ 2,50'], certa='R$ 3,00'), exemplo=True),
        item(produto('pao', '0,50') + produto('pao', '0,50') + produto('pao', '0,50'), '<p class="conta">3 × R$ 0,50</p>' + opcoes(['R$ 1,50', 'R$ 0,15'])),
    ], 1), 'Some o mesmo preço várias vezes.') + bloco(2, 'R$ 10 divididos igualmente entre 4 amigos. Quanto cada um recebe? Circule.', item(dinheiro([10]), opcoes(['R$ 4,00', 'R$ 2,50'])))
    b = bloco(1, 'Calcule.', grade([conta('3,5', '×', 10, 35), conta('0,25', '×', 100), conta('4,2', '×', 3), conta('7,5', '÷', 3), conta(12, '÷', 5), conta('1,2', '×', 4)], 2),
              'Multiplicar por 10 anda a vírgula uma casa para a direita.') + bloco(
        2, 'Leia e resolva.', problema('Um caderno custa <b>R$ 8,75</b>. Quanto custam <b>4</b> cadernos?', '22mm'))
    c = bloco(1, 'Calcule.', grade([conta('12,5', '×', 4), conta('2,35', '×', 6), conta(45, '÷', 4), conta(n(1250), '×', 8), conta(n(6400), '÷', 32), conta('0,8', '×', 100)], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Uma corda de <b>15</b> m será cortada em <b>6</b> pedaços iguais. Quanto mede cada pedaço?', '22mm'),
            problema('Um carro anda <b>12,5</b> km com 1 litro de combustível. Quantos quilômetros anda com <b>8</b> litros?', '22mm')], 2))
    return ficha(
        'multiplicacao-e-divisao-com-decimais', 'Multiplicação e divisão com números decimais', '5º ano',
        'Multiplicar e dividir com números naturais e decimais, por 10 e por 100, em problemas de compra e de medida.',
        ['EF05MA08'], '40 a 50 minutos', 'Dinheiro de brincadeira, calculadora para conferir, fita métrica e barbante para cortar.',
        ['Comece com dinheiro: 3 pães de R$ 0,50 são 3 moedas de 50 centavos.',
         'Use a calculadora para descobrir o que acontece com a vírgula quando se multiplica por 10 e por 100.',
         'Na versão A, monte as compras com o dinheiro de brincadeira.',
         'Na versão B, peça a estimativa antes: 4 cadernos de quase R$ 9 dão quase R$ 36.',
         'Na versão C, corte um barbante de verdade para o problema da corda.'],
        ['Dinheiro e medidas reais antes da conta. A calculadora pode ser usada para conferir sem tirar a autonomia.',
         'A regra da vírgula na multiplicação por 10 é previsível. Mostre no quadro de valor, sempre do mesmo jeito.',
         'Problemas curtos com retorno imediato pela calculadora. Alterne cálculo no papel e conferência.'],
        ['Bloco 1: R$ 1,50. Bloco 2: R$ 2,50.', 'Bloco 1: 25; 12,6; 2,5; 2,4; 4,8. Bloco 2: R$ 35.',
         f'Bloco 1: 50; 14,1; 11,25; {n(10000)}; 200; 80. Bloco 2: 2,5 m; 100 km.'],
        a, b, c)


# ---------- 6. contagem e probabilidade ----------

def contagem_probabilidade():
    a = bloco(1, 'Quantos resultados são possíveis? Circule.', grade([
        item('<p class="conta">moeda: cara ou coroa</p>', opcoes([2, 1], certa=2), exemplo=True),
        item(objeto3d('dado', 70), '<p class="legenda">um dado comum</p>' + opcoes([3, 6])),
    ], 2)) + bloco(2, 'Tiro uma bolinha sem olhar. A chance de sair a rosa é de 1 em quantas? Circule.', item(
        pote(['rosa', 'amarelo', 'amarelo', 'amarelo'], 110, 'pote com 1 bolinha rosa e 3 amarelas'), opcoes(['1 em 4', '1 em 3'])), 'Conte todas as bolinhas do pote.')
    b = bloco(1, 'Ana, Bia, Caio e Davi vão jogar em duplas. Escreva todas as duplas diferentes.', linhas(2) + frases(['Quantas duplas?']),
              'Ana e Bia é a mesma dupla que Bia e Ana.') + bloco(2, 'Jogo um dado. Qual é a chance de sair...', tabela(['Resultado', 'Chance (fração)'], [
                  ['o número 6', '1/6'], ['um número par', ''], ['um número maior que 4', ''], ['o número 7', '']]), 'A primeira linha é o exemplo.') + bloco(
        3, 'Os resultados têm a mesma chance? Circule sim ou não.', grade([
            item('<p class="legenda">cara ou coroa numa moeda</p>', opcoes(['sim', 'não'])),
            item(roleta(['verde', 'verde', 'verde', 'rosa'], 90, 'roleta com 3 partes verdes e 1 rosa'), opcoes(['sim', 'não']))], 2))
    c = bloco(1, 'Duas roletas com os números 1, 2 e 3. Giro as duas e somo. Complete o quadro das somas.', tabela(['+', '1', '2', '3'], [
        ['<b>1</b>', '2', '', ''], ['<b>2</b>', '', '', ''], ['<b>3</b>', '', '', '']]) + frases([
            'Quantos resultados são possíveis?', 'Qual soma tem mais chance?', 'Qual é a chance de a soma ser 4?'])) + bloco(
        2, 'Um pote tem 2 bolinhas verdes, 3 amarelas e 5 rosas. Qual é a chance de sair...', tabela(['Cor', 'Chance'], [['rosa', ''], ['verde', ''], ['azul', '']])) + bloco(
        3, 'Jogo duas moedas. Escreva todos os resultados possíveis.', linhas(1) + frases(['Qual é a chance de sair cara nas duas?']))
    return ficha(
        'contagem-e-probabilidade', 'Contagem e probabilidade', '5º ano',
        'Listar todos os agrupamentos e resultados possíveis, dizer se são igualmente prováveis e calcular a chance de um resultado.',
        ['EF05MA09', 'EF05MA22', 'EF05MA23'], '40 a 50 minutos', 'Dados, moedas, pote com bolinhas ou tampinhas coloridas e duas roletas de papelão com os números 1, 2 e 3.',
        ['Jogue um dado várias vezes e pergunte: o 6 sai mais que os outros? Todos têm a mesma chance.',
         'Mostre a chance como fração: 1 resultado que eu quero em 6 resultados possíveis.',
         'Na versão A, monte o pote de verdade com as mesmas bolinhas da folha.',
         'Na versão B, encene as duplas com quatro estudantes para não contar duas vezes a mesma dupla.',
         'Na versão C, gire as roletas várias vezes e anote as somas: a soma 4 aparece mais?'],
        ['Experimente com objetos reais antes da fração. Comece por moeda (2 resultados) e depois o dado.',
         'A lista organizada (sempre na mesma ordem) dá segurança. Explique que a sorte muda de jogada em jogada e isso não é erro.',
         'Jogos de dado e roleta dão movimento e expectativa. Combine o número de jogadas.'],
        ['Bloco 1: 6. Bloco 2: 1 em 4.', 'Bloco 1: Ana e Bia, Ana e Caio, Ana e Davi, Bia e Caio, Bia e Davi, Caio e Davi; 6 duplas. Bloco 2: 3/6 (ou 1/2); 2/6 (ou 1/3); 0. Bloco 3: sim; não.',
         'Bloco 1: somas 2, 3, 4 / 3, 4, 5 / 4, 5, 6; 9 resultados; a soma 4; 3/9 (ou 1/3). Bloco 2: 5/10; 2/10; 0. Bloco 3: cara e cara, cara e coroa, coroa e cara, coroa e coroa; 1/4.'],
        a, b, c)


# ---------- 7. igualdades e termo desconhecido ----------

def igualdades():
    a = bloco(1, 'A balança está equilibrada. Quanto vale o ponto de interrogação? Circule.', grade([
        item(balanca_eq('? + 2', '6'), opcoes([4, 8], certa=4), exemplo=True),
        item(balanca_eq('? + 3', '8'), opcoes([11, 5])),
        item(balanca_eq('? + ?', '10'), opcoes([5, 10])),
    ], 2), 'Pense: quanto falta para ficar igual dos dois lados?') + bloco(2, 'Tirei 3 dos dois lados. Continua equilibrada? Circule.', item(
        balanca_eq('7 + 3 − 3', '10 − 3'), opcoes(['sim', 'não'])))
    b = bloco(1, 'Descubra o número que falta.', grade([f'<p class="conta">? + 15 = 42 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">? − 8 = 25 &nbsp; ? = {VAZIO}</p>',
                                                        f'<p class="conta">3 × ? = 24 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">? ÷ 4 = 6 &nbsp; ? = {VAZIO}</p>'], 2)) + bloco(
        2, 'Faça a mesma coisa dos dois lados.', grade([f'<p class="conta">12 + 8 − 5 = 20 − {VAZIO}</p>', f'<p class="conta">6 × 3 × 2 = 18 × {VAZIO}</p>'], 2)) + bloco(
        3, 'Leia e resolva.', problema('Pensei em um número, somei <b>12</b> e deu <b>30</b>. Em que número pensei?', '20mm'))
    c = bloco(1, 'Descubra o número que falta.', grade([f'<p class="conta">2 × ? + 5 = 17 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">45 − ? = 18 + 7 &nbsp; ? = {VAZIO}</p>',
                                                        f'<p class="conta">? × 5 = 100 − 40 &nbsp; ? = {VAZIO}</p>', f'<p class="conta">? ÷ 3 = 4 + 5 &nbsp; ? = {VAZIO}</p>'], 2)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Numa balança equilibrada, <b>3</b> caixas iguais e <b>2</b> kg estão de um lado e <b>14</b> kg do outro. Quanto pesa cada caixa?', '24mm'),
            problema('Carla tinha algumas figurinhas. Ganhou <b>25</b> e deu <b>10</b>. Ficou com <b>60</b>. Quantas tinha no começo?', '24mm')], 2)) + bloco(
        3, 'Explique: por que a balança continua equilibrada quando dobramos o que tem dos dois lados?', linhas(2))
    return ficha(
        'igualdades-e-numero-desconhecido', 'Igualdades e o número desconhecido', '5º ano',
        'Manter a igualdade fazendo a mesma operação dos dois lados e descobrir o número que falta em problemas.',
        ['EF05MA10', 'EF05MA11'], '30 a 45 minutos', 'Uma balança de dois pratos (ou um cabide com dois copos), tampinhas e caixinhas fechadas com tampinhas dentro.',
        ['Coloque tampinhas nos dois pratos até equilibrar. Tire 3 de cada lado: continua equilibrada.',
         'Esconda tampinhas numa caixinha e equilibre com tampinhas soltas. Quantas estão escondidas?',
         'Na versão A, monte cada balança da folha com tampinhas.',
         'Na versão B, use a operação inversa: se somei 15, tiro 15 para voltar.',
         'Na versão C, nos problemas de duas etapas, desfaça as operações de trás para a frente.'],
        ['A balança de verdade mostra a igualdade com as mãos. Uma operação por vez.',
         'O sinal = como equilíbrio é uma regra clara. Use o símbolo ? sempre do mesmo jeito para o número escondido.',
         'O jogo da caixinha escondida dá expectativa e retorno rápido. Rodadas curtas.'],
        ['Bloco 1: 5; 5. Bloco 2: sim.', 'Bloco 1: 27; 33; 8; 24. Bloco 2: 5; 2. Bloco 3: 18.',
         'Bloco 1: 6; 20; 12; 27. Bloco 2: 4 kg; 45 figurinhas. Bloco 3: resposta pessoal (os dois lados continuam iguais).'],
        a, b, c)


# ---------- 8. proporcionalidade e partilha ----------

def proporcionalidade():
    a = bloco(1, 'Um bolo usa 2 ovos. Quantos ovos para fazer mais bolos? Circule.', grade([
        item(grupo('ovo', 2, tam=36), '<p class="legenda">1 bolo</p>' + opcoes([2, 1], certa=2), exemplo=True),
        item(caixa_desenho('18mm'), '<p class="legenda">2 bolos</p>' + opcoes([4, 3])),
        item(caixa_desenho('18mm'), '<p class="legenda">3 bolos</p>' + opcoes([5, 6])),
    ], 3), 'Desenhe os ovos de cada bolo.') + bloco(2, 'Reparta 9 figurinhas: Ana fica com o dobro de Bia. Circule.', item(
        grupo('estrela', 9, tam=34, por_linha=9), opcoes(['Bia 3, Ana 6', 'Bia 4, Ana 5'])), 'Faça grupos de 3: um grupo para Bia, dois para Ana.')
    b = bloco(1, 'A receita serve 4 pessoas. Complete.', tabela(['Ingrediente', '4 pessoas', '8 pessoas', '2 pessoas'], [
        ['farinha (xícaras)', '2', '4', '1'], ['ovos', '4', '', ''], ['leite (xícaras)', '1', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Leia e resolva.', grade([
            problema('Dois irmãos vão dividir <b>R$ 30</b>. O mais velho recebe o dobro do mais novo. Quanto recebe cada um?', '22mm'),
            problema('<b>24</b> bolinhas foram colocadas em duas caixas. Uma ficou com <b>4</b> a mais que a outra. Quantas em cada caixa?', '22mm')], 2))
    c = bloco(1, 'Complete a tabela de preços.', tabela(['Laranjas (kg)', '1', '2', '5', '10', '12'], [['Preço (R$)', '4', '', '', '', '']])) + bloco(
        2, 'Leia e resolva.', grade([
            problema('<b>3</b> cadernos custam <b>R$ 18</b>. Quanto custam <b>7</b> cadernos?', '20mm'),
            problema('Um ônibus anda <b>240</b> km em <b>3</b> horas, sempre na mesma velocidade. Quanto anda em <b>5</b> horas?', '20mm'),
            problema('Duas turmas têm <b>60</b> estudantes ao todo. A turma A tem o dobro da turma B. Quantos estudantes tem cada turma?', '20mm'),
            problema('Divida <b>45</b> em duas partes, uma com <b>5</b> a mais que a outra.', '20mm')], 2))
    return ficha(
        'proporcionalidade-e-partilha', 'Proporcionalidade e partilha', '5º ano',
        'Dobrar e reduzir receitas, completar tabelas de proporção e repartir uma quantidade em partes desiguais.',
        ['EF05MA12', 'EF05MA13'], '40 a 50 minutos', 'Uma receita simples impressa, tampinhas ou figurinhas para repartir e copos medidores.',
        ['Leia uma receita com a turma e pergunte: e se viessem o dobro de pessoas?',
         'Monte a tabela no quadro: quando uma coluna dobra, a outra também dobra.',
         'Na versão A, o estudante desenha os ovos de cada bolo e conta.',
         'Na versão B, reparta tampinhas: uma para o mais novo, duas para o mais velho, até acabar.',
         'Na versão C, peça que o estudante explique a estratégia de cada problema.'],
        ['Receitas e lanches são contextos conhecidos. Reparta com tampinhas de verdade antes de calcular.',
         'Tabelas de proporção dão organização. Mantenha o mesmo formato de tabela em todos os exercícios.',
         'Fazer a receita de verdade (ou de brincadeira) dá movimento e um objetivo. Divida em etapas curtas.'],
        ['Bloco 1: 4; 6. Bloco 2: Bia 3, Ana 6.', 'Bloco 1: ovos 8 e 2; leite 2 e meia xícara. Bloco 2: R$ 10 e R$ 20; 10 e 14 bolinhas.',
         'Bloco 1: 8, 20, 40, 48. Bloco 2: R$ 42; 400 km; turma A 40 e turma B 20; 20 e 25.'],
        a, b, c)


# ---------- 9. plano cartesiano ----------

def plano_cartesiano():
    pts_a = {(2, 3): 'A', (4, 1): 'B', (1, 1): 'C'}
    a = bloco(1, 'Qual ponto está em cada lugar? Circule.', item(malha(5, 4, 44, marcas=pts_a, eixos=True, rotulo='plano com os pontos A, B e C')) + grade([
        item('<p class="conta">(2, 3)</p>', opcoes(['A', 'B', 'C'], certa='A'), exemplo=True),
        item('<p class="conta">(4, 1)</p>', opcoes(['A', 'B', 'C'])),
        item('<p class="conta">(1, 1)</p>', opcoes(['A', 'B', 'C']))], 2), 'Primeiro ande para a direita, depois para cima.')
    pts_b = {(1, 4): 'G', (5, 2): 'H', (3, 0): 'I'}
    b = bloco(1, 'Escreva onde está cada ponto.', item(malha(6, 5, 40, marcas=pts_b, eixos=True, rotulo='plano com os pontos G, H e I')) + frases(['G = (&nbsp;&nbsp;,&nbsp;&nbsp;)', 'H =', 'I ='])) + bloco(
        2, 'Marque os pontos D (3, 2), E (0, 4) e F (5, 5).', item(malha(6, 5, 40, eixos=True, rotulo='plano vazio')))
    c = bloco(1, 'Marque e ligue os pontos na ordem: A (1, 1), B (5, 1), C (5, 4), D (1, 4) e volte ao A.', item(malha(7, 5, 40, eixos=True, rotulo='plano vazio')) + frases([
        'Que figura você desenhou?', 'O ponto P (2, 3) andou 3 para a direita e 1 para baixo. Para onde ele foi?'])) + bloco(
        2, 'Desenhe uma figura no plano e escreva as coordenadas dos vértices para um colega copiar.', linhas(2))
    return ficha(
        'plano-cartesiano-coordenadas', 'Plano cartesiano: coordenadas', '5º ano',
        'Localizar e marcar pontos com duas coordenadas, descrever movimentos e desenhar figuras no plano cartesiano.',
        ['EF05MA14', 'EF05MA15'], '40 a 50 minutos', 'Fita crepe para fazer dois eixos no chão, cartões com pares de números e papel quadriculado.',
        ['Faça os eixos no chão com fita crepe. O estudante sai do zero, anda para a direita e depois para a frente.',
         'Mostre que (2, 3) e (3, 2) são lugares diferentes: a ordem importa.',
         'Na versão A, passe o dedo pelo eixo de baixo até o primeiro número e depois suba.',
         'Na versão B, marque os pontos com lápis e confira com um colega.',
         'Na versão C, o colega copia a figura só pelas coordenadas: deu a mesma figura?'],
        ['Andar no plano do chão antes do papel. Use cores diferentes para o eixo de baixo e o eixo do lado.',
         'A regra "primeiro para a direita, depois para cima" é fixa. Escreva a regra num cartão perto da folha.',
         'O plano no chão vira jogo: "vá para (3, 1)". Rodadas curtas com troca de papéis.'],
        ['Bloco 1: B; C.', 'Bloco 1: G (1, 4); H (5, 2); I (3, 0). Bloco 2: pontos marcados.',
         'Bloco 1: um retângulo; P foi para (5, 2). Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- 10. polígonos, ampliação e redução ----------

def poligonos_ampliacao():
    peq = [(1, 1), (2, 1)]
    dobro = [(c, l) for c in range(0, 4) for l in range(0, 2)]
    errada = [(c, 0) for c in range(4)]
    a = bloco(1, 'Conte os lados. Circule o nome.', grade([
        item(regular(3, 44), opcoes(['triângulo', 'quadrado'], certa='triângulo'), exemplo=True),
        item(regular(5, 44), opcoes(['pentágono', 'hexágono'])),
        item(regular(6, 44), opcoes(['pentágono', 'hexágono'])),
    ], 2)) + bloco(2, 'Qual é a ampliação do retângulo pequeno, com o dobro do tamanho? Circule.', item(
        malha(4, 3, 30, pintadas=peq, rotulo='retângulo pequeno de 2 por 1'), opcoes([malha(5, 3, 18, pintadas=dobro, rotulo='retângulo de 4 por 2'), malha(5, 3, 18, pintadas=errada, rotulo='retângulo de 4 por 1')])),
        'Na ampliação, a figura fica maior sem mudar a forma.')
    b = bloco(1, 'Complete o quadro.', tabela(['Figura', 'Nome', 'Lados', 'Vértices', 'Ângulos'], [
        [regular(3, 22), 'triângulo', '3', '3', '3'], [regular(4, 22, rot=-45), '', '', '', ''], [regular(5, 22), '', '', '', ''], [regular(6, 22), '', '', '', ''], [regular(8, 22), '', '', '', '']])) + bloco(
        2, 'Amplie a figura: cada quadradinho vira 2 por 2.', grade([malha(4, 4, 26, pintadas=[(0, 0), (1, 0), (0, 1)], rotulo='figura em L'), malha(8, 8, 24, rotulo='malha vazia')], 2))
    c = bloco(1, 'Amplie a figura três vezes e reduza à metade a outra.', grade([
        item(malha(3, 3, 24, pintadas=[(0, 0), (1, 0), (1, 1)], rotulo='figura para ampliar'), '<p class="legenda">ampliar 3 vezes</p>'),
        item(malha(9, 6, 20, rotulo='malha vazia')),
        item(malha(5, 3, 24, pintadas=[(c, l) for c in range(4) for l in range(2)], rotulo='retângulo de 4 por 2'), '<p class="legenda">reduzir à metade</p>'),
        item(malha(5, 3, 20, rotulo='malha vazia'))], 2)) + bloco(2, 'Responda.', frases([
            'Na ampliação, o que acontece com os lados?', 'E com os ângulos?'])) + bloco(
        3, 'Desenhe um pentágono com pelo menos um ângulo reto.', caixa_desenho('30mm'))
    return ficha(
        'poligonos-ampliacao-e-reducao', 'Polígonos, ampliação e redução', '5º ano',
        'Nomear e comparar polígonos pelos lados, vértices e ângulos e ampliar e reduzir figuras em malhas.',
        ['EF05MA17', 'EF05MA18'], '40 a 50 minutos', 'Malha quadriculada de dois tamanhos, palitos e massinha, régua e esquadro.',
        ['Monte polígonos com palitos e massinha e conte lados, vértices e ângulos.',
         'Mostre uma foto ampliada no celular: a imagem fica maior, mas a forma não muda.',
         'Na versão A, compare as figuras colocando uma em cima da outra na malha.',
         'Na versão B, cada quadradinho pintado vira um quadrado de 2 por 2 quadradinhos.',
         'Na versão C, meça os ângulos das duas figuras com o esquadro: continuam iguais.'],
        ['Montar o polígono com palitos ajuda a fixar os nomes. Um nome novo por dia.',
         'A ampliação tem uma regra fixa e visível na malha. Avise antes de trocar o tamanho da malha.',
         'Ampliar figuras na malha é rápido e dá um resultado visível. Proponha desenhos de personagens em malha.'],
        ['Bloco 1: pentágono; hexágono. Bloco 2: o retângulo de 4 por 2.',
         'Bloco 1: quadrado 4, 4, 4; pentágono 5, 5, 5; hexágono 6, 6, 6; octógono 8, 8, 8. Bloco 2: figura em L com o dobro dos lados.',
         'Bloco 1: figura com lados três vezes maiores; retângulo de 2 por 1. Bloco 2: os lados aumentam na mesma proporção; os ângulos não mudam. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- 11. medidas e transformação de unidades ----------

def medidas_unidades():
    a = bloco(1, 'Qual é a unidade certa? Circule.', grade([
        item(objeto_medida('garrafa', 64), '<p class="legenda">suco: 1</p>' + opcoes(['L', 'kg'], certa='L'), exemplo=True),
        item(objeto_medida('pacote', 64), '<p class="legenda">arroz: 5</p>' + opcoes(['kg', 'm'])),
        item(fig('lapis', 64), '<p class="legenda">lápis: 15</p>' + opcoes(['cm', 'km'])),
        item(objeto_medida('melancia', 64), '<p class="legenda">melancia: 4</p>' + opcoes(['L', 'kg'])),
    ], 2), 'Pergunte: isso se pesa, se mede com régua ou se despeja?') + bloco(2, 'Complete. Circule.', grade([
        item('<p class="conta">1 m = ? cm</p>', opcoes([100, 10])), item('<p class="conta">1 hora = ? minutos</p>', opcoes([100, 60]))], 2))
    b = bloco(1, 'Transforme.', grade([f'<p class="conta">2 m = {VAZIO} cm</p>', f'<p class="conta">3,5 kg = {VAZIO} g</p>', f'<p class="conta">1,5 L = {VAZIO} mL</p>',
                                       f'<p class="conta">2 h = {VAZIO} min</p>', f'<p class="conta">1 km = {VAZIO} m</p>', f'<p class="conta">250 cm = {VAZIO} m</p>'], 2)) + bloco(
        2, 'Leia e resolva.', problema('Um filme dura <b>135</b> minutos. Quantas horas e minutos são?', '20mm'))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma garrafa de <b>2</b> L enche quantos copos de <b>250</b> mL?', '18mm'),
        problema('Mariana tem <b>1,45</b> m de altura e o irmão tem <b>98</b> cm. Quantos centímetros Mariana é mais alta?', '18mm'),
        problema('De manhã fazia <b>12 °C</b>. À tarde a temperatura subiu <b>9</b> graus. Qual foi a temperatura à tarde?', '18mm'),
        problema('Uma sala retangular mede <b>5</b> m por <b>4</b> m. Qual é a área da sala?', '18mm'),
        problema('Quantos gramas tem <b>0,75</b> kg de queijo?', '18mm'),
        problema('A aula começou às <b>13:40</b> e durou <b>1 h 35 min</b>. A que horas terminou?', '18mm')], 2))
    return ficha(
        'medidas-transformar-unidades', 'Medidas: transformar unidades', '5º ano',
        'Escolher a unidade, transformar metros, quilos, litros e horas e resolver problemas com comprimento, área, massa, tempo, temperatura e capacidade.',
        ['EF05MA19'], '40 a 50 minutos', 'Régua, fita métrica, balança de cozinha, garrafas e copos medidores, relógio e termômetro.',
        ['Monte estações de medida na sala: comprimento, massa, capacidade e tempo.',
         'Faça um quadro com as relações principais (1 m = 100 cm, 1 kg = 1000 g, 1 L = 1000 mL, 1 h = 60 min) e deixe à vista.',
         'Na versão A, segure os objetos de verdade para escolher a unidade.',
         'Na versão B, use o quadro de valor para transformar: 3,5 kg vira 3500 g.',
         'Na versão C, peça que o estudante diga qual grandeza cada problema mede antes de resolver.'],
        ['Medir com instrumentos reais. O quadro das relações fica sempre no mesmo lugar.',
         'As relações entre unidades são regras fixas. Avise que o tempo é diferente: 1 hora tem 60 minutos, e não 100.',
         'Estações de medida dão movimento. Cada estação com uma tarefa curta e um tempo combinado.'],
        ['Bloco 1: kg; cm; kg. Bloco 2: 100; 60.', 'Bloco 1: 200, 3500, 1500, 120, 1000, 2,5. Bloco 2: 2 horas e 15 minutos.',
         'Bloco 1: 8 copos; 47 cm; 21 °C; 20 m²; 750 g; 15:15.'],
        a, b, c)


# ---------- 12. perímetro, área e volume ----------

def perimetro_area_volume():
    a = bloco(1, 'As duas figuras têm o mesmo contorno (10 lados de quadradinho). Quantos quadradinhos cada uma cobre? Circule.', grade([
        item(malha(6, 3, 30, pintadas=[(c, 1) for c in range(1, 5)], rotulo='retângulo de 4 por 1'), opcoes([4, 10], certa=4), exemplo=True),
        item(malha(6, 3, 30, pintadas=[(c, l) for c in range(1, 4) for l in range(0, 2)], rotulo='retângulo de 3 por 2'), opcoes([10, 6])),
    ], 2), 'Mesmo contorno não quer dizer mesma área.') + bloco(2, 'Quantos cubinhos tem cada bloco? Circule.', grade([
        item(empilhado(2, 1, 2), opcoes([4, 2], certa=4), exemplo=True), item(empilhado(3, 1, 2), opcoes([5, 6])), item(empilhado(4, 1, 1), opcoes([4, 8]))], 3),
        'Monte com cubinhos de verdade.')
    b = bloco(1, 'Calcule o perímetro e a área.', tabela(['Retângulo', 'Perímetro', 'Área'], [
        ['6 por 1', '14', '6'], ['5 por 2', '', ''], ['4 por 3', '', '']]) + frases(['O que você percebeu?']), 'Desenhe na malha se precisar. A primeira linha é o exemplo.') + bloco(
        2, 'Quantos cubinhos? Conte também os escondidos.', grade([
            item(empilhado(2, 2, 2), f'<p class="du">{VAZIO}</p>'), item(empilhado(3, 2, 2), f'<p class="du">{VAZIO}</p>'), item(empilhado(4, 2, 1), f'<p class="du">{VAZIO}</p>')], 3))
    c = bloco(1, 'Desenhe três retângulos com área 12 e escreva o perímetro de cada um.', malha(16, 5, 26, rotulo='malha vazia')) + bloco(
        2, 'Qual é o volume, em cubinhos?', grade([item(empilhado(4, 3, 2), f'<p class="du">{VAZIO}</p>'), item(empilhado(3, 3, 3), f'<p class="du">{VAZIO}</p>')], 2)) + bloco(
        3, 'Leia e resolva.', problema('Uma caixa tem <b>5</b> cubinhos de comprimento, <b>2</b> de largura e <b>3</b> de altura. Quantos cubinhos cabem nela?', '18mm'))
    return ficha(
        'perimetro-area-e-volume', 'Perímetro, área e volume', '5º ano',
        'Investigar figuras com o mesmo perímetro e áreas diferentes e medir volumes contando cubinhos empilhados.',
        ['EF05MA20', 'EF05MA21'], '40 a 50 minutos', 'Cubinhos de encaixar ou material dourado (cubinhos), caixas pequenas, barbante e malha quadriculada.',
        ['Com um barbante de 12 palmos, forme retângulos diferentes no chão. O contorno é o mesmo, mas a área muda.',
         'Encha uma caixa pequena com cubinhos e conte: isso é o volume da caixa.',
         'Na versão A, monte os blocos com cubinhos de verdade antes de responder.',
         'Na versão B, mostre que os cubinhos de trás existem: monte e desmonte o bloco.',
         'Na versão C, mostre que o volume pode ser calculado: comprimento × largura × altura.'],
        ['Barbante e cubinhos de verdade antes da folha. Use uma cor para perímetro e outra para área.',
         'Explique as palavras perímetro, área e volume com um gesto cada (contornar, cobrir, encher) e mantenha.',
         'Montar blocos com cubinhos é rápido e concreto. Desafie: quem monta um bloco com 12 cubinhos de jeitos diferentes?'],
        ['Bloco 1: 6. Bloco 2: 6; 4.', 'Bloco 1: 5 por 2: 14 e 10; 4 por 3: 14 e 12. Mesmo perímetro, áreas diferentes. Bloco 2: 8; 12; 8.',
         'Bloco 1: 1 por 12 (perímetro 26), 2 por 6 (16), 3 por 4 (14). Bloco 2: 24; 27. Bloco 3: 30 cubinhos.'],
        a, b, c)


# ---------- 13. gráficos de linha e pesquisa ----------

def graficos_linha():
    a = bloco(1, 'A altura de uma planta, em centímetros, semana a semana.', item(grafico_linha(['1', '2', '3', '4', '5'], [2, 4, 6, 8, 10], 10, 2, 440, 200, ' cm')),
              'Cada ponto é a medida de uma semana.') + bloco(2, 'Responda. Circule.', grade([
                  item('<p class="legenda">Na semana 3, qual era a altura?</p>', opcoes(['6 cm', '8 cm'])),
                  item('<p class="legenda">A planta cresceu ou diminuiu?</p>', opcoes(['cresceu', 'diminuiu']))], 2))
    b = bloco(1, 'A temperatura ao longo de um dia.', item(grafico_linha(['6h', '9h', '12h', '15h', '18h'], [12, 16, 22, 24, 18], 30, 5, 480, 200, '°')) + frases([
        'Qual foi a temperatura mais alta? Em que horário?', 'Quantos graus a temperatura subiu das 6h às 12h?', 'O que aconteceu depois das 15h?'])) + bloco(
        2, 'Escreva um texto curto contando o que o gráfico mostra.', linhas(3))
    c = bloco(1, 'Venda de sorvetes de uma sorveteria, por mês.', item(grafico_linha(['jan', 'fev', 'mar', 'abr', 'mai', 'jun'], [50, 45, 30, 20, 15, 10], 50, 10, 500, 200)) + frases([
        'Em que mês vendeu mais?', 'De janeiro a junho, a venda aumentou ou diminuiu? Por que você acha que isso aconteceu?'])) + bloco(
        2, 'Pesquisa: pergunte a 10 colegas quantas horas dormem por noite. Organize numa tabela e faça um gráfico, no papel ou numa planilha.',
        tabela(['Horas de sono', '7 ou menos', '8', '9', '10 ou mais'], [['Colegas', '', '', '', '']]) + caixa_desenho('34mm', 'gráfico')) + bloco(
        3, 'Escreva uma conclusão da pesquisa.', linhas(2))
    return ficha(
        'graficos-de-linha-e-pesquisa', 'Gráficos de linha e pesquisa', '5º ano',
        'Ler gráficos de linha, escrever textos sobre os dados e fazer uma pesquisa com dados numéricos, no papel ou numa planilha.',
        ['EF05MA24', 'EF05MA25'], '40 a 50 minutos, mais a pesquisa', 'Régua para seguir as linhas do gráfico, papel quadriculado e, se possível, computador ou celular com planilha.',
        ['Mostre como seguir um ponto do gráfico até o eixo de baixo e até o eixo do lado, com uma régua.',
         'Explique que o gráfico de linha mostra como algo muda com o tempo: sobe, desce ou fica igual.',
         'Na versão A, o estudante passa o dedo pela linha e diz se ela sobe ou desce.',
         'Na versão B, o texto pode começar com uma frase modelo: "O gráfico mostra que...".',
         'Na versão C, se houver computador, monte a tabela numa planilha e gere o gráfico.'],
        ['Use dados da própria turma ou de uma planta da sala. A régua para seguir as linhas evita confusão.',
         'Gráficos são organizados e previsíveis. Ofereça a frase modelo para o texto e aceite respostas curtas.',
         'A pesquisa pela sala dá movimento. A planilha dá retorno rápido e visual.'],
        ['Bloco 2: 6 cm; cresceu.', 'Bloco 1: 24 graus, às 15h; 10 graus; a temperatura baixou. Bloco 2: resposta pessoal.',
         'Bloco 1: janeiro; diminuiu (por exemplo, porque ficou mais frio). Bloco 2 e 3: respostas pessoais.'],
        a, b, c)


FICHAS = [numeros_decimais, fracoes_equivalentes, porcentagem, adicao_decimais, multiplicacao_decimais, contagem_probabilidade, igualdades,
          proporcionalidade, plano_cartesiano, poligonos_ampliacao, medidas_unidades, perimetro_area_volume, graficos_linha]
