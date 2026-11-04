"""7º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import grupo
from desenhos2 import barra_fracao, malha, pizza_fracao, regular
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, tabela
from ano3 import frases, ligar
from ano4 import n, reta_fracao
from ano5 import empilhado
from ano6 import fluxo_vazio
from ano7 import circulo, estrutura, faixa_quadrados, figura_medida, fluxo_linear, forma_l, mosaico, palitos, plano1, plano4, reta_int, ret_diagonal, setores
from hab3 import cx, fila_h, probs, rot


def h7(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='40 a 50 minutos'):
    return ficha(slug, titulo, '7º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ret(x, y, c, l):
    return [(i, j) for i in range(x, x + c) for j in range(y, y + l)]


# ---------- Números ----------

def mmc_mdc():
    a = bloco(1, 'Pule de 2 em 2 e de 3 em 3. Circule o número que aparece nas duas filas.', grade([
        item(cx('2, 4, <b>6</b>, 8, 10<br>3, <b>6</b>, 9, 12'), opcoes([6, 9], certa=6), exemplo=True),
        item(cx('4, 8, 12, 16, 20<br>6, 12, 18, 24'), opcoes([12, 16]))], 2), 'O número que está nas duas filas é um múltiplo comum.') + bloco(
        2, 'Quero dividir 12 balas em saquinhos iguais, sem sobrar. Em quantos saquinhos posso dividir? Circule todos os que dão certo.', item(opcoes([2, 5, 3, 7])))
    b = bloco(1, 'Complete.', frases(['Múltiplos de 4 até 40:', 'Múltiplos de 6 até 40:', 'Múltiplos comuns de 4 e 6:', 'O menor múltiplo comum:'])) + bloco(
        2, 'Leia e resolva.', probs(['Um pisca-pisca acende a cada 4 segundos e outro a cada 6. Acenderam juntos agora. Daqui a quantos segundos acendem juntos de novo?',
                                     'Tenho 18 lápis e 24 canetas. Quero montar kits iguais, sem sobrar nada. Qual é o maior número de kits?'], '20mm'))
    c = bloco(1, 'Leia e resolva sem usar o algoritmo do mmc ou do mdc.', probs([
        'Um remédio é tomado a cada 8 horas e outro a cada 12 horas. Lia tomou os dois às 6 h. A que horas vai tomar os dois juntos de novo?',
        'Uma fita de 60 cm e outra de 84 cm serão cortadas em pedaços iguais, do maior tamanho possível, sem sobrar. Quanto mede cada pedaço? Quantos pedaços ao todo?'], '24mm')) + bloco(
        2, 'Crie um problema que se resolva procurando um múltiplo comum.', linhas(2))
    return h7(
        'mmc-e-mdc-em-problemas', 'Múltiplos e divisores em problemas', 'EF07MA01',
        'Resolver e elaborar problemas com múltiplos e divisores, incluindo o mínimo múltiplo comum e o máximo divisor comum, com estratégias próprias e sem algoritmo.',
        'Tampinhas ou fichas, dois relógios de brinquedo, fitas de papel.',
        ['Faça duas filas de pulos (de 4 em 4 e de 6 em 6) no quadro e peça para achar onde se encontram.',
         'Repartir objetos em grupos iguais, sem sobrar, mostra os divisores.',
         'Leia o problema com a turma e pergunte: procuro um múltiplo (quando acontece de novo) ou um divisor (em quantas partes iguais)?',
         'Na versão C, o estudante resolve sem algoritmo e cria um problema.'],
        ['Use tampinhas para formar os grupos e conte junto.',
         'Mantenha sempre o mesmo jeito de escrever as filas de pulos, uma embaixo da outra.',
         'Proponha como corrida: quem acha primeiro o número das duas filas.'],
        ['Bloco 1: 6; 12. Bloco 2: 2 e 3.',
         'Bloco 1: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40; 6, 12, 18, 24, 30, 36; 12, 24, 36; 12. Bloco 2: 12 segundos; 6 kits (3 lápis e 4 canetas em cada um).',
         'Bloco 1: às 6 h do dia seguinte (24 horas depois); pedaços de 12 cm, 12 pedaços ao todo (5 + 7). Bloco 2: resposta pessoal.'],
        a, b, c)


def porcentagem():
    a = bloco(1, 'Quanto da barra está pintado? Circule.', grade([
        item(barra_fracao(10, 5, 240, 30), opcoes(['50%', '10%'], certa='50%'), exemplo=True),
        item(barra_fracao(10, 1, 240, 30), opcoes(['10%', '50%'])),
        item(barra_fracao(4, 1, 240, 30), opcoes(['25%', '40%']))], 3), '100% é a barra inteira. 50% é a metade.') + bloco(
        2, 'A camiseta custa R$ 40. Tem desconto de 10%, que é R$ 4. Quanto vou pagar? Circule.', item(opcoes(['R$ 36', 'R$ 44'])))
    b = bloco(1, 'Calcule de cabeça.', frases(['10% de 80 =', '50% de 120 =', '25% de 200 =', '5% de 60 ='])) + bloco(
        2, 'Complete a tabela.', tabela(['Produto', 'Preço', 'Mudança', 'Novo preço'], [
            ['tênis', 'R$ 150', 'desconto de 10%', ''], ['mochila', 'R$ 80', 'aumento de 25%', ''], ['caderno', 'R$ 20', 'desconto de 50%', '']]))
    c = bloco(1, 'Leia e resolva. Pode usar a calculadora.', probs([
        'A conta de luz era R$ 120 e aumentou 15%. Qual é o novo valor?',
        'Um celular custa R$ 900. À vista tem 20% de desconto. Quanto economizo pagando à vista?'], '20mm')) + bloco(
        2, 'Um preço subiu 10% e depois baixou 10%. Voltou ao valor de antes? Teste com R$ 100 e explique.', linhas(2))
    return h7(
        'porcentagem-acrescimo-e-desconto', 'Porcentagem: acréscimo e desconto', 'EF07MA02',
        'Resolver e elaborar problemas com porcentagens, como acréscimos e descontos simples, com cálculo mental e calculadora, no contexto de educação financeira.',
        'Folhetos de lojas, calculadora, quadro de 100 quadradinhos.',
        ['Pinte partes de um quadro de 100 para mostrar 10%, 25% e 50%.',
         'Mostre o caminho do cálculo mental: 10% é dividir por 10; 5% é a metade de 10%.',
         'Use folhetos reais e pergunte quanto se paga com o desconto.',
         'Na versão C, o estudante usa a calculadora e investiga o aumento seguido de desconto.'],
        ['Use dinheiro de brinquedo e valores redondos.',
         'Siga sempre a mesma ordem: preço, quanto é a porcentagem, somar ou tirar.',
         'Faça um jogo de loja: cada estudante calcula um preço com desconto.'],
        ['Bloco 1: 50%; 10%; 25%. Bloco 2: R$ 36.',
         'Bloco 1: 8; 60; 50; 3. Bloco 2: R$ 135; R$ 100; R$ 10.',
         'Bloco 1: R$ 138; R$ 180. Bloco 2: não; R$ 100 vai para R$ 110 e depois para R$ 99, porque os 10% do desconto são calculados sobre R$ 110.'],
        a, b, c)


def inteiros_reta():
    a = bloco(1, 'Qual número está marcado? Circule.', grade([
        item(reta_int(-5, 5, {-3: '?'}, 460), opcoes(['−3', '3'], certa='−3'), exemplo=True),
        item(reta_int(-5, 5, {-1: '?'}, 460), opcoes(['−1', '1']))], 1), 'À esquerda do zero ficam os números negativos.') + bloco(
        2, 'Qual é a temperatura mais fria? Circule.', item(opcoes(['−5 °C', '−1 °C'])))
    b = bloco(1, 'Escreva &gt; ou &lt;.', grade([item(cx(f'−4 {VAZIO} 2')), item(cx(f'−1 {VAZIO} −6')),
                                                item(cx(f'0 {VAZIO} −3')), item(cx(f'−8 {VAZIO} −5'))], 2)) + bloco(
        2, 'Ordene do menor para o maior: 3, −7, 0, −2, 5, −10.', linhas(1)) + bloco(
        3, 'A temperatura era −3 °C e subiu 5 °C. Quanto está agora?', item(reta_int(-5, 5, None, 460)) + linhas(1))
    c = bloco(1, 'Arquimedes nasceu por volta de 287 a.C. e morreu em 212 a.C. Usando números negativos para os anos antes de Cristo, quantos anos ele viveu?', linhas(2)) + bloco(
        2, 'Meu saldo era R$ 50. Gastei R$ 80 e depois recebi R$ 45. Qual é o saldo agora?', linhas(1)) + bloco(
        3, 'Escreva três situações reais em que usamos números negativos.', linhas(2))
    return h7(
        'inteiros-na-reta-e-no-dia-a-dia', 'Números inteiros na reta e no dia a dia', 'EF07MA03',
        'Comparar e ordenar números inteiros em diferentes contextos, inclusive o histórico, associá-los a pontos da reta e usá-los em adições e subtrações.',
        'Termômetro, fita com a reta numérica no chão, extrato bancário fictício.',
        ['Desenhe a reta no chão e peça para os estudantes andarem para a direita (subir) e para a esquerda (descer).',
         'Use o termômetro: quanto mais à esquerda, mais frio.',
         'Mostre uma linha do tempo com anos antes e depois de Cristo.',
         'Na versão C, o estudante calcula com contexto histórico e com saldo.'],
        ['Use a reta no chão e o termômetro para cada pergunta.',
         'Mantenha a reta sempre na mesma posição, com o zero destacado.',
         'Faça a corrida na reta: cada carta diz quantos passos andar.'],
        ['Bloco 1: −3; −1. Bloco 2: −5 °C.',
         'Bloco 1: −4 &lt; 2; −1 &gt; −6; 0 &gt; −3; −8 &lt; −5. Bloco 2: −10, −7, −2, 0, 3, 5. Bloco 3: 2 °C.',
         'Bloco 1: 75 anos (de −287 até −212). Bloco 2: R$ 15 (50 − 80 = −30; −30 + 45 = 15). Bloco 3: por exemplo temperatura abaixo de zero, saldo negativo, andar no subsolo, profundidade abaixo do nível do mar.'],
        a, b, c)


def operacoes_inteiros():
    a = bloco(1, 'Ande na reta e circule onde você para.', grade([
        item(reta_int(-5, 5, {2: 'começo'}, 460), cx('Comece no 2 e ande 5 para a esquerda.') + opcoes(['−3', '7'], certa='−3'), exemplo=True),
        item(reta_int(-5, 5, {-4: 'começo'}, 460), cx('Comece no −4 e ande 3 para a direita.') + opcoes(['−1', '−7']))], 1)) + bloco(
        2, 'Quanto é (−2) × 3? Circule.', item(opcoes(['−6', '6'])), 'Sinais diferentes: o resultado é negativo.')
    b = bloco(1, 'Calcule.', grade([item(cx(f'(−3) + 7 = {VAZIO}')), item(cx(f'(−5) − 4 = {VAZIO}')), item(cx(f'6 − 9 = {VAZIO}')),
                                    item(cx(f'(−4) × (−3) = {VAZIO}')), item(cx(f'(−20) ÷ 5 = {VAZIO}')), item(cx(f'(−2) × 6 = {VAZIO}'))], 3)) + bloco(
        2, 'Leia e resolva.', probs(['Um elevador está no 2º subsolo (−2). Sobe 7 andares. Em que andar está agora?'], '18mm', 1))
    c = bloco(1, 'Calcule.', grade([item(cx(f'(−8) + (−7) − (−5) = {VAZIO}')), item(cx(f'(−3) × (−2) × (−4) = {VAZIO}')),
                                    item(cx(f'(−36) ÷ (−9) + (−5) = {VAZIO}'))], 1)) + bloco(
        2, 'Leia e resolva.', probs(['Num jogo, ganhei 15 pontos, perdi 22, perdi 8 e ganhei 10. Qual é o meu saldo?',
                                     'Em Moscou, a temperatura caiu de 4 °C para −11 °C. Quantos graus caiu?'], '18mm')) + bloco(
        3, 'Crie um problema com números inteiros e resolva.', linhas(2))
    return h7(
        'operacoes-com-numeros-inteiros', 'Operações com números inteiros', 'EF07MA04',
        'Resolver e elaborar problemas que envolvam as quatro operações com números inteiros.',
        'Reta numérica no chão, fichas de duas cores (positivas e negativas).',
        ['Use fichas de duas cores: uma positiva e uma negativa juntas valem zero.',
         'Some e subtraia andando na reta.',
         'Mostre a regra de sinais com padrões: 3 × 2, 3 × 1, 3 × 0, 3 × (−1)...',
         'Na versão C, o estudante faz expressões e cria um problema.'],
        ['Use as fichas de duas cores em cada conta.',
         'Deixe a regra de sinais escrita sempre no mesmo canto da mesa.',
         'Jogo de cartas: cada carta é um ganho ou uma perda de pontos.'],
        ['Bloco 1: −3; −1. Bloco 2: −6.',
         'Bloco 1: 4; −9; −3; 12; −4; −12. Bloco 2: no 5º andar.',
         'Bloco 1: −10; −24; −1. Bloco 2: −5 pontos; caiu 15 °C. Bloco 3: resposta pessoal.'],
        a, b, c)


def varios_algoritmos():
    a = bloco(1, 'Dois jeitos de calcular 18 + 7. Complete.', frases(['Jeito 1: 18 + 2 = 20 e 20 + 5 =', 'Jeito 2: 10 + 7 = 17 e 17 + 8 ='])) + bloco(
        2, 'Os dois jeitos dão o mesmo resultado? Circule.', item(opcoes(['sim', 'não']))) + bloco(
        3, 'Dois jeitos de calcular 25 × 4. Complete.', frases(['Somando: 25 + 25 + 25 + 25 =', 'Dobrando duas vezes: 25 × 2 = 50 e 50 × 2 =']))
    b = bloco(1, 'Calcule 24 × 15 de três jeitos.', tabela(['Jeito', 'Conta', 'Resultado'], [
        ['decompor', '24 × 10 + 24 × 5', ''], ['metade e dobro', '12 × 30', ''], ['algoritmo usual', '', '']])) + bloco(
        2, 'Qual jeito você achou mais fácil? Por quê?', linhas(2))
    c = bloco(1, 'Resolva o problema de dois jeitos diferentes: uma escola tem 252 estudantes e vai formar grupos de 12. Quantos grupos?', grade([
        caixa_desenho('34mm', 'Jeito 1'), caixa_desenho('34mm', 'Jeito 2')], 2)) + bloco(
        2, 'Calcule 15% de 80 de dois jeitos.', frases(['10% + 5%:', '0,15 × 80:'])) + bloco(
        3, 'Por que é útil conhecer mais de um algoritmo para a mesma conta?', linhas(2))
    return h7(
        'um-problema-varios-algoritmos', 'Um problema, vários algoritmos', 'EF07MA05',
        'Resolver um mesmo problema usando diferentes algoritmos e comparar os caminhos.',
        'Calculadora para conferir, quadro dividido em colunas.',
        ['Escolha uma conta e peça que cada grupo resolva de um jeito diferente.',
         'Coloque os caminhos lado a lado no quadro e confira que o resultado é o mesmo.',
         'Discuta qual caminho é mais rápido para cada tipo de número.',
         'Na versão C, o estudante escolhe os dois caminhos e explica a vantagem de conhecer vários.'],
        ['Use material concreto para o primeiro jeito e só depois o algoritmo.',
         'Deixe os jeitos escritos em caixas com o mesmo formato.',
         'Desafio: achar um terceiro jeito para a mesma conta.'],
        ['Bloco 1: 25; 25. Bloco 2: sim. Bloco 3: 100; 100.',
         'Bloco 1: 360 nos três jeitos. Bloco 2: resposta pessoal.',
         'Bloco 1: 21 grupos (por exemplo 12 × 20 = 240 e sobram 12, mais 1 grupo; ou o algoritmo da divisão). Bloco 2: 8 + 4 = 12; 12. Bloco 3: por exemplo para escolher o mais rápido e para conferir o resultado.'],
        a, b, c)


def mesma_estrutura():
    a = bloco(1, 'Os dois problemas se resolvem com a mesma conta? Circule.', grade([
        item(cx('3 sacos com 5 balas cada. Quantas balas?<br>3 caixas com 5 lápis cada. Quantos lápis?'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(cx('Tenho 8 figurinhas e ganho 4.<br>Tenho 8 figurinhas e perco 4.'), opcoes(['sim', 'não']))], 1)) + bloco(
        2, 'São 4 mesas com 6 cadeiras em cada. Que conta resolve? Circule.', item(opcoes(['4 × 6', '4 + 6'])))
    b = bloco(1, 'Ligue cada problema à conta que o resolve.', ligar([
        ('Comprei 5 cadernos de R$ 12. Quanto gastei?', '60 ÷ 5'),
        ('Repartir 60 figurinhas entre 5 amigos.', '60 − 12'),
        ('Tinha R$ 60 e gastei R$ 12.', '5 × 12')])) + bloco(
        2, 'Escreva outro problema com a mesma estrutura deste: um carro anda 80 km em uma hora. Em 3 horas, quanto anda?', linhas(2))
    c = bloco(1, 'Separe os problemas em dois grupos que se resolvem do mesmo jeito.', frases([
        'A: uma receita usa 3 ovos para 12 bolinhos. Quantos ovos para 36 bolinhos?',
        'B: uma camiseta custava R$ 50 e subiu 10%. Qual é o novo preço?',
        'C: um carro anda 150 km em 2 horas. Quanto anda em 6 horas?',
        'D: um salário de R$ 2 000 teve aumento de 5%. Qual é o novo salário?',
        'Grupo 1:', 'Grupo 2:'])) + bloco(
        2, 'Escreva em passos o procedimento que resolve todos os problemas do grupo 2.', linhas(3))
    return h7(
        'problemas-com-a-mesma-estrutura', 'Problemas com a mesma estrutura', 'EF07MA06',
        'Reconhecer que problemas com a mesma estrutura podem ser resolvidos pelos mesmos procedimentos.',
        'Cartões com problemas curtos, duas caixas para separar.',
        ['Leia dois problemas com histórias diferentes e a mesma conta.',
         'Pergunte: o que muda e o que fica igual?',
         'Separe cartões de problemas em grupos pela conta que resolve.',
         'Na versão C, o estudante agrupa e escreve o procedimento geral.'],
        ['Use objetos para montar cada problema antes da conta.',
         'Marque em cada problema, com a mesma cor, os números e a pergunta.',
         'Jogo de memória: juntar o problema com a conta.'],
        ['Bloco 1: sim; não. Bloco 2: 4 × 6.',
         'Bloco 1: cadernos com 5 × 12; figurinhas com 60 ÷ 5; gastei com 60 − 12. Bloco 2: resposta pessoal (por exemplo, uma torneira enche 20 litros por minuto; em 5 minutos?).',
         'Bloco 1: grupo 1 com A e C (proporção: 9 ovos; 450 km); grupo 2 com B e D (porcentagem e soma: R$ 55; R$ 2 100). Bloco 2: calcular a porcentagem do valor; somar ao valor de antes; escrever a resposta.'],
        a, b, c)


def fluxograma_grupo():
    a = bloco(1, 'Siga o fluxograma com o número 4. Circule o resultado.', grade([
        item(fluxo_linear(['Pense no número 4', 'Multiplique por 2', 'Some 1']), opcoes(['9', '7'], certa='9'), exemplo=True),
        item(fluxo_linear(['Pense no número 5', 'Multiplique por 2', 'Some 1']), opcoes(['11', '10']))], 2))
    b = bloco(1, 'Complete o fluxograma que calcula o preço com 10% de desconto.', item(fluxo_vazio(3)),
              'Use: ler o preço; calcular 10% do preço; tirar esse valor do preço.') + bloco(
        2, 'Use o seu fluxograma.', frases(['Preço R$ 50:', 'Preço R$ 120:']))
    c = bloco(1, 'Desenhe um fluxograma que diga se um número é par ou ímpar. Use-o com 37 e com 50.', caixa_desenho('56mm')) + bloco(
        2, 'Desenhe um fluxograma que calcule a área de qualquer retângulo.', caixa_desenho('46mm'))
    return h7(
        'fluxograma-de-um-grupo-de-problemas', 'Fluxograma de um grupo de problemas', 'EF07MA07',
        'Representar em fluxograma os passos usados para resolver um grupo de problemas.',
        'Cartões com passos, setas de papel, fita adesiva.',
        ['Resolva dois problemas parecidos e anote os passos que se repetem.',
         'Escreva cada passo num cartão e monte o fluxograma com setas.',
         'Teste o fluxograma com números novos.',
         'Na versão C, o estudante cria fluxogramas com pergunta (sim ou não).'],
        ['Monte o fluxograma com cartões que se movem antes de escrever.',
         'Use sempre oval para início e fim e retângulo para os passos.',
         'Desafio: a turma inventa números para testar o fluxograma do colega.'],
        ['Bloco 1: 9; 11.',
         'Bloco 1: ler o preço; calcular 10%; subtrair do preço. Bloco 2: R$ 45; R$ 108.',
         'Bloco 1: ler o número; dividir por 2; o resto é 0? Sim: par. Não: ímpar. 37 é ímpar e 50 é par. Bloco 2: ler o comprimento; ler a largura; multiplicar; mostrar a área.'],
        a, b, c)


def fracoes_significados():
    a = bloco(1, 'Que fração está pintada? Circule.', grade([
        item(pizza_fracao(4, 1, 100), opcoes(['1/4', '1/3'], certa='1/4'), exemplo=True),
        item(barra_fracao(3, 2, 220, 30), opcoes(['2/3', '3/2']))], 2)) + bloco(
        2, 'Qual pedaço é maior? Circule.', item(fila_h(rot(pizza_fracao(2, 1, 90), '1/2'), rot(pizza_fracao(4, 1, 90), '1/4')), opcoes(['1/2', '1/4']))) + bloco(
        3, '3 pizzas para 4 pessoas. Cada uma recebe: Circule.', item(opcoes(['3/4', '4/3'])))
    b = bloco(1, 'Escreva o que a fração 3/5 significa em cada frase.', frases([
        'Comi 3/5 da barra de chocolate:', 'Dividi 3 pizzas entre 5 pessoas:', 'Para cada 3 meninas há 5 meninos:', '3/5 de 20 balas:'])) + bloco(
        2, 'Escreva &gt;, &lt; ou =.', grade([item(cx(f'2/3 {VAZIO} 3/4')), item(cx(f'5/10 {VAZIO} 1/2')), item(cx(f'7/8 {VAZIO} 5/6'))], 3))
    c = bloco(1, 'Ordene do menor para o maior: 3/4, 2/3, 5/8, 7/12.', linhas(1)) + bloco(
        2, 'Resolva.', frases(['2/3 de 45 =', '5 dividido por 8, em fração:', 'Razão entre 6 acertos e 9 questões, simplificada:'])) + bloco(
        3, 'Explique com um exemplo a diferença entre 3/4 como parte de um inteiro e 3/4 como resultado de uma divisão.', linhas(2))
    return h7(
        'fracoes-parte-divisao-razao-e-operador', 'Frações: parte, divisão, razão e operador', 'EF07MA08',
        'Comparar e ordenar frações associadas às ideias de parte de inteiros, resultado de divisão, razão e operador.',
        'Círculos e barras de frações, folhas para dobrar, tampinhas.',
        ['Mostre a mesma fração nas quatro ideias: parte da barra, pizzas divididas, razão entre grupos e fração de uma quantidade.',
         'Compare frações com as barras ou com frações equivalentes de mesmo denominador.',
         'Pergunte em cada frase: o que é o inteiro aqui?',
         'Na versão C, o estudante ordena, calcula e explica os significados.'],
        ['Use as barras de frações recortadas para comparar.',
         'Pinte as frações sempre da esquerda para a direita.',
         'Jogo rápido: duas cartas de frações, quem tem a maior?'],
        ['Bloco 1: 1/4; 2/3. Bloco 2: 1/2. Bloco 3: 3/4.',
         'Bloco 1: parte de um inteiro; resultado da divisão 3 ÷ 5; razão; operador (12 balas). Bloco 2: &lt;; =; &gt;.',
         'Bloco 1: 7/12, 5/8, 2/3, 3/4. Bloco 2: 30; 5/8; 2/3. Bloco 3: por exemplo, comi 3 de 4 pedaços de uma pizza (parte) e repartir 3 pizzas entre 4 pessoas (divisão).'],
        a, b, c)


def razao_fracao():
    a = bloco(1, 'Escreva a razão como fração. Circule.', grade([
        item(cx('1 copo de suco e 3 copos de água'), opcoes(['1/3', '3/1'], certa='1/3'), exemplo=True),
        item(cx('2 colheres de açúcar e 5 de farinha'), opcoes(['2/5', '5/2']))], 1), 'A razão compara duas quantidades.') + bloco(
        2, 'Com 2 copos de suco, quantos copos de água vou usar? Circule.', item(opcoes(['6', '5'])))
    b = bloco(1, 'Complete a receita.', tabela(['Suco (copos)', '1', '2', '3', '4'], [['Água (copos)', '3', '', '', '']])) + bloco(
        2, 'Uma turma tem 12 meninas e 18 meninos.', frases(['Razão entre meninas e meninos (simplificada):', 'Razão entre meninas e o total da turma:']))
    c = bloco(1, 'Leia e resolva.', probs([
        'Num mapa, 2 cm representam 3 km. Duas cidades estão a 10 cm no mapa. Qual é a distância real?',
        'Um time ganhou 2/3 dos 24 jogos. Quantos ganhou? Qual a razão entre vitórias e jogos sem vitória?'], '22mm')) + bloco(
        2, 'A fração 2/3 pode comparar duas partes de uma grandeza com três partes da mesma grandeza. Dê um exemplo com uma receita.', linhas(2))
    return h7(
        'razao-como-fracao', 'Razão escrita como fração', 'EF07MA09',
        'Usar a associação entre razão e fração em problemas, como 2/3 para expressar a razão entre duas partes e três partes de uma grandeza.',
        'Copos medidores, receitas simples, mapas com escala.',
        ['Faça um suco com 1 copo de concentrado para 3 de água e escreva a razão 1/3.',
         'Dobre a receita e mostre que a razão continua a mesma.',
         'Mostre a escala de um mapa como uma razão.',
         'Na versão C, o estudante resolve problemas de escala e de proporção.'],
        ['Faça a receita de verdade, com copos.',
         'Escreva sempre a primeira quantidade em cima e a segunda embaixo.',
         'Desafio: inventar uma receita e pedir ao colega para dobrar.'],
        ['Bloco 1: 1/3; 2/5. Bloco 2: 6.',
         'Bloco 1: 6, 9, 12. Bloco 2: 12/18 = 2/3; 12/30 = 2/5.',
         'Bloco 1: 15 km; 16 vitórias, razão 16/8 = 2/1. Bloco 2: por exemplo, 2 xícaras de açúcar para 3 xícaras de farinha.'],
        a, b, c)


def racionais_reta():
    a = bloco(1, 'Qual número está marcado? Circule.', grade([
        item(reta_fracao(4, {1: '?'}, 460), opcoes(['1/4', '1/2'], certa='1/4'), exemplo=True),
        item(reta_int(-3, 3, {-1.5: '?'}, 460), opcoes(['−1,5', '1,5']))], 1)) + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes(['0,5', '−2'])), item(opcoes(['−1', '−3']))], 2))
    b = bloco(1, 'Marque na reta: −1,5; 0,5; 2; −2,5.', item(reta_int(-3, 3, None, 520))) + bloco(
        2, 'Ordene do menor para o maior: 1/2; −0,75; 0,3; −1; 3/4.', linhas(1)) + bloco(
        3, 'Escreva &gt; ou &lt;.', grade([item(cx(f'−0,5 {VAZIO} −0,2')), item(cx(f'1/3 {VAZIO} 0,3')), item(cx(f'−2,1 {VAZIO} −2,01'))], 3))
    c = bloco(1, 'Ordene do menor para o maior: −2/3; −0,6; 1,25; 5/4; −1,1.', linhas(1)) + bloco(
        2, 'Temperaturas numa semana: −1,5; 2,3; −0,8; 0; 1,7 (em °C). Marque na reta e diga a mais baixa e a mais alta.', item(reta_int(-3, 3, None, 520)) + linhas(1)) + bloco(
        3, 'Existe um número entre −0,1 e −0,2? Dê um exemplo.', linhas(1))
    return h7(
        'racionais-na-reta', 'Números racionais na reta', 'EF07MA10',
        'Comparar e ordenar números racionais (frações e decimais, positivos e negativos) em contextos e associá-los a pontos da reta.',
        'Reta numérica no chão, termômetro, cartões com números.',
        ['Coloque cartões com frações e decimais na reta do chão.',
         'Mostre que 1/2 e 0,5 ficam no mesmo ponto.',
         'Lembre que, nos negativos, quem está mais à esquerda é menor.',
         'Na versão C, o estudante compara números com sinais e formas diferentes.'],
        ['Use a reta no chão: o estudante anda até o número.',
         'Escreva todos os números como decimais antes de comparar.',
         'Jogo: cada estudante recebe um cartão e a turma se ordena em fila.'],
        ['Bloco 1: 1/4; −1,5. Bloco 2: 0,5; −1.',
         'Bloco 1: pontos marcados na reta. Bloco 2: −1; −0,75; 0,3; 1/2; 3/4. Bloco 3: &lt;; &gt;; &lt;.',
         'Bloco 1: −1,1; −2/3; −0,6; 1,25 = 5/4. Bloco 2: a mais baixa −1,5 °C e a mais alta 2,3 °C. Bloco 3: sim, por exemplo −0,15.'],
        a, b, c)


def multiplicar_dividir_racionais():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(barra_fracao(2, 1, 220, 30), cx('1/2 de 8') + opcoes(['4', '16'], certa='4'), exemplo=True),
        item(barra_fracao(4, 1, 220, 30), cx('1/4 de 12') + opcoes(['3', '4']))], 2)) + bloco(
        2, 'Quanto é 0,5 × 10? Circule.', item(opcoes(['5', '50'])), '0,5 é a metade.')
    b = bloco(1, 'Calcule.', grade([item(cx(f'2/3 × 3/5 = {VAZIO}')), item(cx(f'0,4 × 0,3 = {VAZIO}')), item(cx(f'3/4 ÷ 1/2 = {VAZIO}')),
                                    item(cx(f'1,2 ÷ 0,4 = {VAZIO}')), item(cx(f'(−0,5) × 4 = {VAZIO}')), item(cx(f'5 ÷ 1/2 = {VAZIO}'))], 3)) + bloco(
        2, 'Dividir por 1/2 é o mesmo que multiplicar por quanto?', linhas(1))
    c = bloco(1, 'Dê um exemplo com números racionais para cada propriedade.', tabela(['Propriedade', 'Exemplo'], [
        ['a × b = b × a', ''], ['a × 1 = a', ''], ['a ÷ b = a × (inverso de b)', '']])) + bloco(
        2, 'Leia e resolva.', probs(['Uma garrafa de 1,5 L enche quantos copos de 0,25 L?', 'Comprei 2,5 kg de arroz a R$ 4,80 o quilo. Quanto paguei?'], '18mm')) + bloco(
        3, 'Multiplicar sempre aumenta o número? Dê um exemplo.', linhas(1))
    return h7(
        'multiplicar-e-dividir-racionais', 'Multiplicar e dividir racionais', 'EF07MA11',
        'Compreender e usar a multiplicação e a divisão de números racionais, a relação entre elas e suas propriedades.',
        'Barras de frações, papel para dobrar, calculadora.',
        ['Dobre uma folha ao meio e depois em três: a metade de um terço é 1/6.',
         'Mostre que dividir por 1/2 é perguntar quantas metades cabem.',
         'Compare 10 × 0,5 e 10 ÷ 0,5 com a calculadora.',
         'Na versão C, o estudante testa as propriedades e resolve problemas.'],
        ['Dobre o papel para cada fração.',
         'Escreva a regra numa ficha fixa: multiplicar de cima com cima e de baixo com baixo.',
         'Desafio: achar uma multiplicação que diminui o número.'],
        ['Bloco 1: 4; 3. Bloco 2: 5.',
         'Bloco 1: 6/15 = 2/5; 0,12; 3/2; 3; −2; 10. Bloco 2: por 2.',
         'Bloco 1: por exemplo 0,5 × 4 = 4 × 0,5 = 2; 3/4 × 1 = 3/4; 3 ÷ 1/2 = 3 × 2 = 6. Bloco 2: 6 copos; R$ 12,00. Bloco 3: não; 10 × 0,5 = 5.'],
        a, b, c)


def problemas_racionais():
    a = bloco(1, 'Quanto dá? Circule.', grade([
        item(cx('R$ 5,00 − R$ 2,50'), opcoes(['R$ 2,50', 'R$ 7,50'], certa='R$ 2,50'), exemplo=True),
        item(cx('R$ 1,50 + R$ 1,50'), opcoes(['R$ 3,00', 'R$ 2,00']))], 2)) + bloco(
        2, 'A pizza tinha 8 pedaços. Comi 3. Que fração sobrou? Circule.', item(pizza_fracao(8, 3, 110), opcoes(['5/8', '3/8'])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Uma corda de 12,6 m é cortada em 3 pedaços iguais. Quanto mede cada pedaço?',
        'Ana leu 2/5 de um livro de 200 páginas. Quantas páginas faltam?',
        'Comprei 3 cadernos de R$ 7,90 e paguei com R$ 50. Qual é o troco?',
        'Uma receita usa 3/4 de xícara de açúcar. Quanto vai em 2 receitas?'], '18mm'))
    c = bloco(1, 'Leia e resolva.', probs([
        'Um carro faz 12,5 km com um litro. O litro custa R$ 6,20. Quanto gasto para andar 250 km?',
        'Às 6 h fazia −2,5 °C. A temperatura subiu 1,5 °C por hora até as 10 h. Quanto fazia às 10 h?'], '24mm')) + bloco(
        2, 'Crie um problema com frações ou decimais e resolva.', linhas(3))
    return h7(
        'problemas-com-racionais', 'Problemas com números racionais', 'EF07MA12',
        'Resolver e elaborar problemas que envolvam as operações com números racionais.',
        'Dinheiro de brinquedo, folhetos de mercado, calculadora.',
        ['Leia o problema em voz alta e peça para circular os números e a pergunta.',
         'Pergunte qual operação resolve e por quê.',
         'Confira a resposta: ela faz sentido no contexto?',
         'Na versão C, o estudante resolve problemas de várias etapas e cria um.'],
        ['Use dinheiro de brinquedo nos problemas de compra.',
         'Use sempre o mesmo roteiro: entender, planejar, calcular, conferir.',
         'Um problema por vez, com tempo marcado e pausa entre eles.'],
        ['Bloco 1: R$ 2,50; R$ 3,00. Bloco 2: 5/8.',
         'Bloco 1: 4,2 m; 120 páginas; R$ 26,30; 6/4 = 1 e 1/2 xícara.',
         'Bloco 1: 20 litros, R$ 124,00; 3,5 °C (−2,5 + 4 × 1,5). Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Álgebra ----------

def variavel_incognita():
    a = bloco(1, 'Que número a caixa esconde? Circule.', grade([
        item(cx('□ + 3 = 7'), opcoes(['4', '10'], certa='4'), exemplo=True),
        item(cx('□ × 2 = 10'), opcoes(['5', '8']))], 2)) + bloco(
        2, 'Um ingresso custa R$ 5. Qual é o preço de n ingressos? Circule.', item(opcoes(['5 × n', '5 + n'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Ingressos (n)', '1', '2', '3', '5', '10'], [['Preço (5 × n)', '', '', '', '', '']])) + bloco(
        2, 'Em qual frase a letra pode ter vários valores (variável) e em qual tem um valor só (incógnita)?', frases(['x + 4 = 9:', 'P = 4 × l (perímetro do quadrado):'])) + bloco(
        3, 'Descubra x: 3x = 21.', linhas(1))
    c = bloco(1, 'Classifique a letra como variável ou incógnita.', tabela(['Expressão', 'Variável ou incógnita?', 'Por quê?'], [
        ['2x − 1 = 9', '', ''], ['A = b × h', '', ''], ['y = 3x + 1', '', ''], ['n + n = 14', '', '']])) + bloco(
        2, 'Um táxi cobra R$ 5 fixos mais R$ 3 por quilômetro. Escreva a fórmula do preço usando k para os quilômetros. Depois, descubra quantos quilômetros andei se paguei R$ 35.', linhas(2))
    return h7(
        'variavel-e-incognita', 'Variável e incógnita', 'EF07MA13',
        'Compreender a ideia de variável, representada por letra ou símbolo, e diferenciá-la da ideia de incógnita.',
        'Caixinhas com tampa, fichas numeradas, tabela no quadro.',
        ['Esconda fichas numa caixinha: □ + 3 = 7 tem um único valor escondido (incógnita).',
         'Monte uma tabela de preços: em 5 × n, o n pode mudar (variável).',
         'Compare as duas situações lado a lado.',
         'Na versão C, o estudante classifica e escreve uma fórmula.'],
        ['Use a caixinha de verdade e abra para conferir.',
         'Use sempre a mesma letra para a mesma ideia na aula.',
         'Jogo: um estudante esconde um número e a turma descobre.'],
        ['Bloco 1: 4; 5. Bloco 2: 5 × n.',
         'Bloco 1: 5, 10, 15, 25, 50. Bloco 2: em x + 4 = 9 a letra é incógnita (x = 5); em P = 4 × l é variável. Bloco 3: x = 7.',
         'Bloco 1: incógnita (x = 5); variáveis; variáveis; incógnita (n = 7). Bloco 2: P = 5 + 3k; 10 km.'],
        a, b, c)


def sequencias_recursivas():
    a = bloco(1, 'Continue a sequência. Cada número é o anterior mais 2.', item(cx(f'1, 3, 5, 7, {VAZIO}, {VAZIO}'))) + bloco(
        2, 'Cada figura tem uma bola a mais que a anterior. Quantas bolas terá a 4ª figura? Circule.',
        item(fila_h(rot(grupo('bola', 1, 3, 44), '1ª'), rot(grupo('bola', 2, 3, 44), '2ª'), rot(grupo('bola', 3, 3, 44), '3ª'), gap=34), opcoes(['4', '6'])))
    b = bloco(1, 'Continue e diga se a sequência é recursiva (cada termo vem do anterior).', frases([
        '2, 4, 8, 16, ___, ___:', '1, 1, 2, 3, 5, 8, ___, ___:', 'Números primos: 2, 3, 5, 7, ___:'])) + bloco(
        2, 'Escreva a regra recursiva da sequência 5, 9, 13, 17.', linhas(1))
    c = bloco(1, 'Classifique e escreva a regra.', tabela(['Sequência', 'Recursiva?', 'Regra'], [
        ['3, 6, 12, 24', '', ''], ['10, 7, 4, 1', '', ''], ['1, 4, 9, 16, 25', '', ''], ['algarismos de π: 3, 1, 4, 1, 5', '', '']])) + bloco(
        2, 'A recursão aparece também nas artes e na literatura, como uma história dentro de outra história. Desenhe 3 etapas de uma árvore em que cada galho se divide em 2.', caixa_desenho('34mm')) + bloco(
        3, 'Na árvore, a etapa 1 tem 1 galho. Quantos galhos novos aparecem na etapa 5?', linhas(1))
    return h7(
        'sequencias-recursivas', 'Sequências recursivas', 'EF07MA14',
        'Classificar sequências em recursivas e não recursivas e reconhecer a recursão na matemática, nas artes e na literatura.',
        'Palitos, imagens de árvores e de bonecas russas, livro com história dentro de história.',
        ['Mostre uma sequência e pergunte: dá para achar o próximo só olhando o anterior?',
         'Mostre exemplos de recursão: bonecas russas, espelho diante de espelho, árvore.',
         'Compare com a sequência dos números primos, que não tem regra pelo anterior.',
         'Na versão C, o estudante classifica e desenha uma árvore recursiva.'],
        ['Monte a sequência com palitos ou bolinhas, figura por figura.',
         'Escreva a regra sempre com a mesma frase: o próximo é o anterior...',
         'Desafio: criar uma sequência e pedir ao colega a regra.'],
        ['Bloco 1: 9 e 11. Bloco 2: 4.',
         'Bloco 1: 32 e 64, recursiva (dobro); 13 e 21, recursiva (soma dos dois anteriores); 11, não recursiva. Bloco 2: começa no 5 e o próximo é o anterior mais 4.',
         'Bloco 1: recursiva (dobro); recursiva (menos 3); pode ser vista dos dois jeitos (n × n, ou somar 3, 5, 7, 9 ao anterior); não recursiva. Bloco 2: desenho. Bloco 3: 16 galhos.'],
        a, b, c)


def sequencias_algebricas():
    a = bloco(1, 'Cada mesa tem 4 cadeiras. Complete.', tabela(['Mesas', '1', '2', '3', '4'], [['Cadeiras', '4', '8', '', '']])) + bloco(
        2, 'Para n mesas, quantas cadeiras? Circule.', item(opcoes(['4 × n', 'n + 4'])))
    b = bloco(1, 'Quadrados de palitos em fila. Complete.', item(faixa_quadrados(3, 54)) + tabela(
        ['Quadrados', '1', '2', '3', '4', '10'], [['Palitos', '4', '7', '10', '', '']])) + bloco(
        2, 'Escreva a expressão do número de palitos para n quadrados.', linhas(1)) + bloco(
        3, 'Escreva a expressão do termo da sequência 5, 10, 15, 20...', linhas(1))
    c = bloco(1, 'Escreva a expressão do termo de posição n.', frases(['2, 5, 8, 11, ...:', '1, 3, 5, 7, ...:', '6, 11, 16, 21, ...:', '100, 90, 80, 70, ...:'])) + bloco(
        2, 'Use a expressão para achar o 50º termo de 2, 5, 8, 11, ...', linhas(1)) + bloco(
        3, 'O número 100 está na sequência 2, 5, 8, 11, ...? Explique.', linhas(2))
    return h7(
        'sequencias-em-linguagem-algebrica', 'Sequências em linguagem algébrica', 'EF07MA15',
        'Usar a simbologia algébrica para expressar regularidades encontradas em sequências numéricas.',
        'Palitos, mesas e cadeiras desenhadas, tabela no quadro.',
        ['Monte a sequência com palitos e registre na tabela.',
         'Pergunte: quanto aumenta de uma figura para a outra? Esse número multiplica o n.',
         'Teste a expressão com uma figura que já foi montada.',
         'Na versão C, o estudante escreve expressões e as usa para prever termos.'],
        ['Monte cada figura com palitos antes de completar a tabela.',
         'Use sempre a tabela com a posição em cima e o termo embaixo.',
         'Desafio: prever a figura 100 sem desenhar.'],
        ['Bloco 1: 12 e 16. Bloco 2: 4 × n.',
         'Bloco 1: 13 e 31. Bloco 2: 3n + 1. Bloco 3: 5n.',
         'Bloco 1: 3n − 1; 2n − 1; 5n + 1; 110 − 10n. Bloco 2: 149. Bloco 3: não; 3n − 1 = 100 daria n = 101 ÷ 3, que não é inteiro.'],
        a, b, c)


def expressoes_equivalentes():
    a = bloco(1, 'As duas contas dão o mesmo resultado? Circule.', grade([
        item(cx('2 + 2 + 2 e 3 × 2'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(cx('4 × 2 e 4 + 2'), opcoes(['sim', 'não']))], 2)) + bloco(
        2, 'Para contar os palitos de 3 quadrados, Ana fez 4 + 3 + 3 e Leo fez 3 × 3 + 1. Dão o mesmo resultado? Circule.', item(faixa_quadrados(3, 54), opcoes(['sim', 'não'])))
    b = bloco(1, 'Ana escreveu 4 + 3 × (n − 1) e Leo escreveu 3n + 1 para os palitos. Teste.', tabela(['n', '1', '2', '3', '10'], [
        ['4 + 3 × (n − 1)', '', '', '', ''], ['3n + 1', '', '', '', '']])) + bloco(
        2, 'As duas expressões são equivalentes?', linhas(1)) + bloco(
        3, 'E 4n? Teste com n = 3 e responda se é equivalente.', linhas(1))
    c = bloco(1, 'Quais são equivalentes a 2(n + 3)? Responda sim ou não.', frases(['2n + 6:', '2n + 3:', 'n + n + 6:', '2 + 2n + 4:'])) + bloco(
        2, 'Para a mesma sequência, dois estudantes acharam 2n + 2 e 2(n + 1). Mostre, sem tabela, que são equivalentes.', linhas(2)) + bloco(
        3, 'Testar um só valor de n basta para garantir que duas expressões são equivalentes? Explique com um exemplo.', linhas(2))
    return h7(
        'expressoes-equivalentes-de-sequencias', 'Expressões equivalentes de uma sequência', 'EF07MA16',
        'Reconhecer se duas expressões algébricas obtidas para a mesma sequência são ou não equivalentes.',
        'Palitos, tabela no quadro, cartões com expressões.',
        ['Peça que dois grupos contem os palitos de jeitos diferentes e escrevam a expressão.',
         'Teste as duas expressões com vários valores de n numa tabela.',
         'Mostre com a propriedade distributiva que elas são iguais.',
         'Na versão C, o estudante prova a equivalência e discute por que um só teste não basta.'],
        ['Use palitos de duas cores para mostrar os dois jeitos de contar.',
         'Coloque as duas expressões sempre uma embaixo da outra na tabela.',
         'Desafio: achar uma terceira expressão equivalente.'],
        ['Bloco 1: sim; não. Bloco 2: sim, as duas dão 10.',
         'Bloco 1: 4, 7, 10, 31 nas duas linhas. Bloco 2: sim. Bloco 3: não; 4 × 3 = 12 e a figura tem 10 palitos.',
         'Bloco 1: sim; não; sim; sim. Bloco 2: 2(n + 1) = 2 × n + 2 × 1 = 2n + 2. Bloco 3: não; por exemplo 2n e n + 2 dão 4 para n = 2, mas 6 e 5 para n = 3.'],
        a, b, c)


# ---------- Geometria ----------

def multiplicar_coordenadas():
    tri = [(1, 1), (2, 1), (1, 2)]
    a = bloco(1, 'O triângulo tem vértices (1, 1), (2, 1) e (1, 2). Multiplique cada número por 2.', tabela(['Vértice', 'Vezes 2'], [
        ['(1, 1)', '(2, 2)'], ['(2, 1)', ''], ['(1, 2)', '']])) + bloco(
        2, 'Desenhe o triângulo novo.', item(plano1(6, 5, 30, figuras=[tri]))) + bloco(
        3, 'O triângulo novo ficou: Circule.', item(opcoes(['maior', 'menor'])))
    b = bloco(1, 'Multiplique as coordenadas do retângulo por 3 e desenhe o novo.', tabela(['Vértice', '(1, 1)', '(3, 1)', '(3, 2)', '(1, 2)'], [['Vezes 3', '', '', '', '']])
              + item(plano1(10, 7, 26, figuras=[[(1, 1), (3, 1), (3, 2), (1, 2)]]))) + bloco(
        2, 'Responda.', frases(['Os lados ficaram quantas vezes maiores?', 'A área ficou quantas vezes maior?']))
    c = bloco(1, 'Multiplique as coordenadas do triângulo por −1 e depois por 2. Desenhe as duas figuras.', item(plano4(6, 18, figuras=[[(1, 1), (3, 1), (1, 2)]]))) + bloco(
        2, 'Responda.', frases(['O que acontece com a figura quando multiplico por −1?', 'E quando multiplico por 2?', 'Se multiplico só o x por 2, a forma continua a mesma?']))
    return h7(
        'multiplicar-coordenadas-de-poligonos', 'Multiplicar coordenadas de polígonos', 'EF07MA19',
        'Realizar transformações de polígonos no plano cartesiano multiplicando as coordenadas dos vértices por um número inteiro.',
        'Papel quadriculado, régua, lápis de cor.',
        ['Desenhe um polígono pequeno no quadriculado e anote os vértices.',
         'Multiplique as coordenadas por 2 e desenhe a nova figura com outra cor.',
         'Compare: a forma é a mesma, o tamanho muda.',
         'Na versão C, o estudante investiga a multiplicação por número negativo.'],
        ['Marque os pontos com adesivos antes de ligar.',
         'Anote sempre primeiro o x (andar para o lado) e depois o y (subir).',
         'Desafio: adivinhar o número que transformou a figura do colega.'],
        ['Bloco 1: (4, 2); (2, 4). Bloco 2: triângulo com vértices (2, 2), (4, 2) e (2, 4). Bloco 3: maior.',
         'Bloco 1: (3, 3), (9, 3), (9, 6), (3, 6). Bloco 2: 3 vezes; 9 vezes (de 2 para 18 quadradinhos).',
         'Bloco 1: por −1: (−1, −1), (−3, −1), (−1, −2); por 2: (2, 2), (6, 2), (2, 4). Bloco 2: fica simétrica em relação à origem (gira meia volta); fica 2 vezes maior; não, a figura estica na horizontal.'],
        a, b, c)


def simetrico_plano():
    a = bloco(1, 'O eixo y é como um espelho. Qual é o ponto simétrico? Circule.', grade([
        item(plano4(4, 22, pontos={(2, 3): 'A', (-2, 3): "A'"}), opcoes(['(−2, 3)', '(2, −3)'], certa='(−2, 3)'), exemplo=True),
        item(plano4(4, 22, pontos={(3, 1): 'B'}), opcoes(['(−3, 1)', '(1, 3)']))], 2), 'No espelho do eixo y, só o sinal do x muda.')
    b = bloco(1, 'Desenhe o simétrico do triângulo em relação ao eixo x e em relação ao eixo y.', item(plano4(5, 20, figuras=[[(1, 1), (4, 1), (1, 3)]]))) + bloco(
        2, 'Complete.', tabela(['Vértice', 'Simétrico no eixo x', 'Simétrico no eixo y'], [['(1, 1)', '', ''], ['(4, 1)', '', ''], ['(1, 3)', '', '']]))
    c = bloco(1, 'Desenhe os simétricos do triângulo em relação ao eixo x, ao eixo y e à origem.', item(plano4(5, 20, figuras=[[(1, 1), (4, 1), (1, 3)]]))) + bloco(
        2, 'Escreva a regra do ponto (a, b).', frases(['Simétrico no eixo x:', 'Simétrico no eixo y:', 'Simétrico na origem:'])) + bloco(
        3, 'Um ponto é simétrico dele mesmo em relação ao eixo x. Onde ele está?', linhas(1))
    return h7(
        'simetrico-no-plano-cartesiano', 'Simétrico no plano cartesiano', 'EF07MA20',
        'Reconhecer e representar no plano cartesiano o simétrico de figuras em relação aos eixos e à origem.',
        'Papel quadriculado, espelho pequeno, papel vegetal.',
        ['Coloque um espelho sobre o eixo y e mostre o reflexo do ponto.',
         'Dobre o papel no eixo e fure o ponto com o lápis para achar o simétrico.',
         'Compare as coordenadas do ponto e do simétrico.',
         'Na versão C, o estudante chega às regras das três simetrias.'],
        ['Use o espelho ou a dobra do papel em cada ponto.',
         'Pinte o eixo que serve de espelho com uma cor só.',
         'Desafio: desenhar uma figura e pedir ao colega o simétrico.'],
        ['Bloco 1: (−2, 3); (−3, 1).',
         'Bloco 1: desenhos. Bloco 2: eixo x (1, −1), (4, −1), (1, −3); eixo y (−1, 1), (−4, 1), (−1, 3).',
         'Bloco 1: desenhos; na origem (−1, −1), (−4, −1), (−1, −3). Bloco 2: (a, −b); (−a, b); (−a, −b). Bloco 3: em cima do eixo x (y = 0).'],
        a, b, c)


def circunferencia_compasso():
    a = bloco(1, 'Todos os pontos da circunferência estão à mesma distância do ponto do meio. Esse ponto é o: Circule.', item(circulo(56, 6, rotulos=False), opcoes(['centro', 'raio']))) + bloco(
        2, 'Para desenhar uma circunferência de raio 3 cm, abro o compasso em: Circule.', item(opcoes(['3 cm', '6 cm']))) + bloco(
        3, 'Desenhe com o compasso uma circunferência de raio 3 cm.', caixa_desenho('62mm'))
    b = bloco(1, 'Desenhe duas circunferências de mesmo centro: uma de raio 2 cm e outra de raio 4 cm.', caixa_desenho('86mm')) + bloco(
        2, 'Responda.', frases(['Quanto mede o diâmetro da circunferência de raio 4 cm?', 'Um ponto a 3 cm do centro fica dentro ou fora da circunferência maior?']))
    c = bloco(1, 'Uma antena alcança 3 km. Marque o ponto A (a antena) e pinte todos os lugares atendidos. Escala: 1 cm = 1 km.', caixa_desenho('66mm')) + bloco(
        2, 'Duas casas, A e B, estão a 6 cm uma da outra. Onde pode ficar um poço que esteja a 4 cm de cada casa? Use o compasso.', caixa_desenho('64mm')) + bloco(
        3, 'Explique por que a circunferência é o conjunto de pontos que estão à mesma distância do centro.', linhas(2))
    return h7(
        'circunferencia-e-compasso', 'Circunferência e compasso', 'EF07MA22',
        'Construir circunferências com compasso, reconhecê-las como lugar geométrico e usá-las em composições e problemas com objetos à mesma distância.',
        'Compasso, barbante, alfinete, papelão.',
        ['Faça a circunferência com barbante preso num alfinete: a ponta do barbante fica sempre à mesma distância.',
         'Mostre como abrir o compasso na régua e girar sem mexer a ponta seca.',
         'Proponha uma rosácea com várias circunferências de mesmo raio.',
         'Na versão C, o estudante resolve problemas de alcance e de pontos à mesma distância.'],
        ['Use compasso com trava ou o barbante. Ajude a segurar o papel.',
         'Repita sempre os mesmos passos: abrir, apoiar a ponta, girar.',
         'Desafio: fazer uma rosácea e pintar.'],
        ['Bloco 1: centro. Bloco 2: 3 cm. Bloco 3: circunferência desenhada.',
         'Bloco 1: circunferências desenhadas. Bloco 2: 8 cm; dentro.',
         'Bloco 1: um círculo de raio 3 cm com centro em A. Bloco 2: nos dois pontos onde as circunferências de raio 4 cm com centro em A e em B se cruzam. Bloco 3: porque o compasso mantém a mesma abertura (o raio) enquanto gira.'],
        a, b, c)


def existencia_triangulo():
    a = bloco(1, 'Com estes palitos dá para fazer um triângulo? Circule.', grade([
        item(palitos([3, 4, 5]), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(palitos([2, 3, 8]), opcoes(['sim', 'não']))], 2), 'Os dois palitos menores juntos precisam ser maiores que o maior.') + bloco(
        2, 'Os três ângulos de um triângulo somam: Circule.', item(opcoes(['180°', '360°'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Lados (cm)', 'Soma dos dois menores', 'Maior lado', 'Forma triângulo?'], [
        ['3, 4, 6', '', '', ''], ['2, 5, 9', '', '', ''], ['5, 5, 10', '', '', ''], ['6, 7, 8', '', '', '']])) + bloco(
        2, 'Dois ângulos de um triângulo medem 50° e 70°. Quanto mede o terceiro?', linhas(1)) + bloco(
        3, 'Construa com régua e compasso o triângulo de lados 3 cm, 4 cm e 5 cm.', caixa_desenho('52mm'))
    c = bloco(1, 'Um triângulo tem lados de 4 cm e 7 cm. Quais medidas inteiras o terceiro lado pode ter?', linhas(1)) + bloco(
        2, 'Os ângulos de um triângulo medem 2x, 3x e 4x. Quanto vale x? Quanto mede cada ângulo?', linhas(1)) + bloco(
        3, 'Recorte os três cantos de um triângulo de papel e junte-os. Que ângulo se forma? O que isso mostra?', linhas(2)) + bloco(
        4, 'Construa com régua e compasso o triângulo de lados 5 cm, 6 cm e 7 cm.', caixa_desenho('50mm'))
    return h7(
        'condicao-de-existencia-do-triangulo', 'Quando existe um triângulo', 'EF07MA24',
        'Construir triângulos com régua e compasso, reconhecer a condição de existência pelos lados e verificar que a soma dos ângulos internos é 180°.',
        'Palitos ou canudos cortados, régua, compasso, triângulos de papel.',
        ['Dê canudos de tamanhos diferentes e peça para montar triângulos: nem sempre fecha.',
         'Registre na tabela quando fecha e quando não fecha.',
         'Recorte os cantos de um triângulo e junte: forma meia volta (180°).',
         'Na versão C, o estudante usa a condição e a soma dos ângulos em problemas.'],
        ['Use canudos coloridos com as medidas escritas.',
         'Sempre compare a soma dos dois menores com o maior, na mesma ordem.',
         'Desafio: achar três medidas que quase formam triângulo.'],
        ['Bloco 1: sim; não. Bloco 2: 180°.',
         'Bloco 1: 7 e 6, sim; 7 e 9, não; 10 e 10, não; 13 e 8, sim. Bloco 2: 60°. Bloco 3: triângulo construído.',
         'Bloco 1: de 4 cm a 10 cm (maior que 3 e menor que 11). Bloco 2: x = 20°; 40°, 60° e 80°. Bloco 3: um ângulo raso (180°); a soma dos ângulos é 180°. Bloco 4: triângulo construído.'],
        a, b, c)


def rigidez_triangulo():
    a = bloco(1, 'Qual figura de palitos não se deforma quando empurro um canto? Circule.',
              item(fila_h(rot(estrutura('quadrado'), 'quadrado'), rot(estrutura('triângulo'), 'triângulo')), opcoes(['quadrado', 'triângulo']))) + bloco(
        2, 'Para firmar o quadrado, coloco um palito: Circule.', item(opcoes(['na diagonal', 'do lado de fora'])))
    b = bloco(1, 'Monte com palitos e massinha um quadrado e um triângulo. Empurre um canto. O que acontece?', frases(['Quadrado:', 'Triângulo:'])) + bloco(
        2, 'Desenhe no portão onde colocar um palito para ele ficar firme.', item(estrutura('quadrado'))) + bloco(
        3, 'Onde você vê triângulos em construções?', linhas(1))
    c = bloco(1, 'Por que telhados, torres e pontes usam triângulos? Explique usando a ideia de rigidez.', linhas(3)) + bloco(
        2, 'Quantos palitos em diagonal, saindo do mesmo vértice, preciso para firmar um pentágono? Desenhe.', item(regular(5, 44)) + linhas(1)) + bloco(
        3, 'Procure uma obra de arte ou uma estrutura com triângulos e descreva como eles aparecem.', linhas(2))
    return h7(
        'rigidez-do-triangulo', 'A rigidez do triângulo', 'EF07MA25',
        'Reconhecer a rigidez geométrica dos triângulos e suas aplicações em estruturas, como telhados e estruturas metálicas, e nas artes.',
        'Palitos de sorvete e percevejos, ou canudos e massinha; fotos de telhados e pontes.',
        ['Monte um quadrado e um triângulo de palitos com pinos nos cantos.',
         'Empurre um canto de cada: o quadrado vira losango e o triângulo não muda.',
         'Coloque uma diagonal no quadrado e mostre que ele fica firme.',
         'Na versão C, o estudante explica e generaliza para outros polígonos.'],
        ['Monte as estruturas de verdade e deixe o estudante empurrar.',
         'Use a mesma cor para os palitos de reforço.',
         'Desafio: construir a torre de palitos mais firme do grupo.'],
        ['Bloco 1: triângulo. Bloco 2: na diagonal.',
         'Bloco 1: o quadrado se deforma (vira losango) e o triângulo fica firme. Bloco 2: um palito na diagonal. Bloco 3: por exemplo telhados, torres de energia, pontes, guindastes.',
         'Bloco 1: porque o triângulo não muda de forma quando os lados têm medida fixa; ele é rígido. Bloco 2: 2 palitos, que formam 3 triângulos. Bloco 3: resposta pessoal.'],
        a, b, c)


def fluxograma_triangulo():
    a = bloco(1, 'Para construir o triângulo de lados 5 cm, 4 cm e 3 cm, escreva a ordem dos passos (1, 2, 3, 4).', tabela(['Passo', 'Ordem'], [
        ['Desenhar com a régua o lado de 5 cm, com pontas A e B.', '1'],
        ['Com a ponta seca em B, abrir 3 cm e traçar um arco.', ''],
        ['Ligar o ponto onde os arcos se cruzam às pontas A e B.', ''],
        ['Com a ponta seca em A, abrir 4 cm e traçar um arco.', '']])) + bloco(
        2, 'Siga os passos e construa o triângulo.', caixa_desenho('56mm'))
    b = bloco(1, 'Complete o fluxograma para construir um triângulo de lados a, b e c.', item(fluxo_vazio(4))) + bloco(
        2, 'Use o fluxograma com lados 4 cm, 5 cm e 6 cm.', caixa_desenho('52mm'))
    c = bloco(1, 'Escreva o algoritmo por escrito e desenhe o fluxograma. Inclua a pergunta: as medidas formam triângulo?', caixa_desenho('76mm')) + bloco(
        2, 'Teste o seu fluxograma com 2 cm, 3 cm e 6 cm. O que acontece?', linhas(1)) + bloco(
        3, 'Construa o triângulo de lados 6 cm, 6 cm e 6 cm.', caixa_desenho('52mm'))
    return h7(
        'fluxograma-para-construir-triangulo', 'Fluxograma para construir um triângulo', 'EF07MA26',
        'Descrever por escrito e por fluxograma um algoritmo para construir um triângulo qualquer, conhecidas as medidas dos três lados.',
        'Régua, compasso, cartões com os passos.',
        ['Construa um triângulo no quadro falando cada passo em voz alta.',
         'Escreva cada passo num cartão e embaralhe: a turma reordena.',
         'Transforme os cartões em fluxograma com início e fim.',
         'Na versão C, o estudante inclui a pergunta da condição de existência.'],
        ['Faça cada passo junto, com o compasso do estudante.',
         'Use a mesma ordem sempre: régua, primeiro arco, segundo arco, ligar.',
         'Desafio: seguir o fluxograma de um colega sem ajuda.'],
        ['Bloco 1: 1, 3, 4, 2. Bloco 2: triângulo construído.',
         'Bloco 1: desenhar o lado a; abrir o compasso com a medida b e traçar um arco numa ponta; abrir com a medida c e traçar um arco na outra ponta; ligar o cruzamento às pontas. Bloco 2: triângulo construído.',
         'Bloco 1: resposta com a pergunta: a soma dos dois menores é maior que o maior? Se não, fim: não existe triângulo. Bloco 2: o fluxograma para, porque 2 + 3 é menor que 6 e os arcos não se cruzam. Bloco 3: triângulo equilátero construído.'],
        a, b, c)


def angulos_poligonos_regulares():
    a = bloco(1, 'Some os ângulos dos cantos. Circule.', grade([
        item(regular(4, 36, -45), cx('90° + 90° + 90° + 90°') + opcoes(['360°', '180°'], certa='360°'), exemplo=True),
        item(regular(3, 40), cx('60° + 60° + 60°') + opcoes(['180°', '360°']))], 2)) + bloco(
        2, 'Qual figura cobre o chão sem deixar buracos? Circule.', item(fila_h(mosaico('quadrado'), mosaico('pentagono')), opcoes(['quadrados', 'pentágonos'])))
    b = bloco(1, 'Divida cada polígono em triângulos a partir de um vértice e complete.', tabela(['Polígono regular', 'Lados', 'Triângulos', 'Soma dos ângulos', 'Cada ângulo'], [
        ['triângulo', '3', '1', '180°', '60°'], ['quadrado', '4', '', '', ''], ['pentágono', '5', '', '', ''], ['hexágono', '6', '', '', '']])) + bloco(
        2, 'O ângulo externo é 180° menos o ângulo interno. Quanto mede o ângulo externo do hexágono regular?', linhas(1))
    c = bloco(1, 'Complete.', tabela(['Polígono regular', 'Soma dos ângulos', 'Cada ângulo interno', 'Cada ângulo externo'], [
        ['pentágono', '', '', ''], ['hexágono', '', '', ''], ['octógono', '', '', '']])) + bloco(
        2, 'Para ladrilhar sem buracos, os ângulos em volta de um ponto somam 360°. Quais polígonos regulares ladrilham sozinhos? Teste.', frases(['Triângulo:', 'Quadrado:', 'Pentágono:', 'Hexágono:', 'Octógono:'])) + bloco(
        3, 'Quanto dá a soma dos ângulos externos de cada polígono da tabela?', linhas(1))
    return h7(
        'angulos-de-poligonos-regulares-e-mosaicos', 'Ângulos de polígonos regulares e mosaicos', 'EF07MA27',
        'Calcular os ângulos internos de polígonos regulares sem fórmulas e relacionar ângulos internos e externos, com mosaicos e ladrilhamentos.',
        'Polígonos regulares de papel (vários de cada), transferidor, fotos de pisos.',
        ['Divida polígonos em triângulos a partir de um vértice e conte.',
         'Cada triângulo vale 180°: multiplique pelo número de triângulos.',
         'Tente ladrilhar a mesa com cada polígono de papel.',
         'Na versão C, o estudante relaciona o ângulo interno com o ladrilhamento.'],
        ['Use polígonos de papel para ladrilhar de verdade.',
         'Mantenha a tabela sempre na mesma ordem dos polígonos.',
         'Desafio: criar um mosaico misturando dois polígonos.'],
        ['Bloco 1: 360°; 180°. Bloco 2: quadrados.',
         'Bloco 1: quadrado 2, 360°, 90°; pentágono 3, 540°, 108°; hexágono 4, 720°, 120°. Bloco 2: 60°.',
         'Bloco 1: pentágono 540°, 108°, 72°; hexágono 720°, 120°, 60°; octógono 1 080°, 135°, 45°. Bloco 2: triângulo sim (6 × 60°); quadrado sim (4 × 90°); pentágono não; hexágono sim (3 × 120°); octógono não. Bloco 3: 360°.'],
        a, b, c)


def fluxograma_poligono_regular():
    a = bloco(1, 'Para construir um quadrado de lado 4 cm, escreva a ordem dos passos (1, 2, 3, 4).', tabela(['Passo', 'Ordem'], [
        ['Desenhar com a régua um lado de 4 cm, com pontas A e B.', '1'],
        ['Ligar as pontas C e D.', ''],
        ['Em A, traçar com o esquadro um lado de 4 cm em ângulo reto (ponta D).', ''],
        ['Em B, traçar com o esquadro um lado de 4 cm em ângulo reto (ponta C).', '']])) + bloco(
        2, 'Siga os passos e construa o quadrado.', caixa_desenho('56mm'))
    b = bloco(1, 'Complete o fluxograma para construir um triângulo equilátero de lado L com régua e compasso.', item(fluxo_vazio(4))) + bloco(
        2, 'Use o fluxograma com L = 5 cm.', caixa_desenho('52mm'))
    c = bloco(1, 'Escreva o algoritmo e o fluxograma para construir um hexágono regular de lado 3 cm. Dica: o lado do hexágono é igual ao raio da circunferência.', caixa_desenho('70mm')) + bloco(
        2, 'Com transferidor, quantos graus devo virar em cada vértice para fazer um pentágono regular? E para um polígono de n lados?', linhas(2)) + bloco(
        3, 'Construa o hexágono.', caixa_desenho('50mm'))
    return h7(
        'fluxograma-para-construir-poligono-regular', 'Fluxograma para construir um polígono regular', 'EF07MA28',
        'Descrever por escrito e por fluxograma um algoritmo para construir um polígono regular, como quadrado e triângulo equilátero, conhecida a medida do lado.',
        'Régua, esquadro, compasso, transferidor, cartões com passos.',
        ['Construa um quadrado com régua e esquadro, falando cada passo.',
         'Peça que a turma escreva os passos e depois desenhe o fluxograma.',
         'Troque os fluxogramas entre grupos para testar.',
         'Na versão C, o estudante usa a circunferência e o ângulo de giro.'],
        ['Faça cada passo junto, segurando o esquadro.',
         'Use sempre os mesmos nomes para os vértices: A, B, C, D.',
         'Desafio: o fluxograma mais curto que funciona.'],
        ['Bloco 1: 1, 4, 2, 3. Bloco 2: quadrado construído.',
         'Bloco 1: desenhar o lado AB com L; abrir o compasso com L e traçar um arco com centro em A; traçar outro arco com centro em B; ligar o cruzamento C às pontas A e B. Bloco 2: triângulo construído.',
         'Bloco 1: desenhar uma circunferência de raio 3 cm; marcar um ponto nela; com a mesma abertura, marcar 6 pontos seguidos; ligar os pontos. Bloco 2: 72° (360° ÷ 5); 360° ÷ n. Bloco 3: hexágono construído.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def medidas_aproximadas():
    a = bloco(1, 'Duas pessoas mediram a mesma mesa e acharam 1,20 m e 1,21 m. As duas podem estar certas? Circule.', item(opcoes(['sim', 'não'])),
              'Toda medida feita com instrumento é aproximada.') + bloco(
        2, 'Ligue cada medida ao instrumento.', ligar([('peso de uma pessoa', 'termômetro'), ('febre', 'fita métrica'), ('altura da porta', 'balança')])) + bloco(
        3, 'Meça o seu lápis com a régua.', frases(['O lápis mede cerca de:']))
    b = bloco(1, 'Meça três vezes o comprimento do caderno.', tabela(['Medição', '1ª', '2ª', '3ª'], [['Comprimento (cm)', '', '', '']])
              + frases(['As medidas foram iguais?', 'Que valor você usaria?'])) + bloco(
        2, 'Converta.', frases(['1,5 km em metros:', '2 500 g em quilogramas:', '45 minutos em horas:']))
    c = bloco(1, 'Leia e resolva.', probs([
        'Uma corrida de 5 km tem 12 voltas e meia na pista. Quanto mede uma volta?',
        'Um xarope: 5 mL a cada 8 horas durante 7 dias. Quantos mililitros ao todo?'], '20mm')) + bloco(
        2, 'Um cronômetro marcou 10,53 s e outro marcou 10,5 s para a mesma corrida. Por que os valores são diferentes? Qual é mais preciso?', linhas(2)) + bloco(
        3, 'Por que dizemos que toda medida é aproximada? Dê um exemplo.', linhas(2))
    return h7(
        'medidas-sao-aproximadas', 'Toda medida é aproximada', 'EF07MA29',
        'Resolver e elaborar problemas com medidas de grandezas do cotidiano e de outras áreas, reconhecendo que toda medida empírica é aproximada.',
        'Régua, fita métrica, balança de cozinha, termômetro, cronômetro do celular.',
        ['Peça que vários estudantes meçam a mesma mesa e compare os resultados.',
         'Discuta por que os valores mudam um pouco: instrumento, posição, arredondamento.',
         'Resolva problemas reais de receitas, remédios e esportes.',
         'Na versão C, o estudante discute precisão e resolve problemas com conversões.'],
        ['Faça a medição de verdade, com o estudante segurando o instrumento.',
         'Anote as medidas sempre numa tabela com a unidade.',
         'Desafio: quem estima mais perto antes de medir.'],
        ['Bloco 1: sim. Bloco 2: peso com balança; febre com termômetro; altura da porta com fita métrica. Bloco 3: medida pessoal.',
         'Bloco 1: medidas pessoais; podem variar um pouco; a mais repetida ou a média. Bloco 2: 1 500 m; 2,5 kg; 0,75 h.',
         'Bloco 1: 400 m; 105 mL. Bloco 2: os instrumentos têm precisões diferentes; o de 10,53 s mede centésimos, então é mais preciso. Bloco 3: porque depende do instrumento e de quem mede; por exemplo, a régua mede até milímetros.'],
        a, b, c)


def volume_blocos():
    a = bloco(1, 'Quantos cubinhos tem cada bloco? Circule.', grade([
        item(empilhado(3, 2, 1, 24), opcoes(['6', '5'], certa='6'), exemplo=True),
        item(empilhado(2, 2, 2, 24), opcoes(['8', '6']))], 2)) + bloco(
        2, 'Cada cubinho tem 1 cm³. O bloco de 8 cubinhos tem volume de: Circule.', item(opcoes(['8 cm³', '8 cm'])))
    b = bloco(1, 'Calcule o volume: comprimento × largura × altura.', item(empilhado(4, 3, 2, 20)) + tabela(['Bloco', 'Comprimento', 'Largura', 'Altura', 'Volume'], [
        ['A', '4 cm', '3 cm', '2 cm', ''], ['B', '5 m', '2 m', '3 m', ''], ['C', '10 dm', '10 dm', '10 dm', '']])) + bloco(
        2, '1 dm³ = 1 litro. Uma caixa-d\'água de 1 m³ guarda quantos litros?', linhas(1))
    c = bloco(1, 'Leia e resolva.', probs([
        'Uma piscina mede 8 m por 4 m e tem 1,5 m de profundidade. Quantos litros de água cabem?',
        'Uma caixa mede 30 cm × 20 cm × 10 cm. Quantos cubos de 5 cm de aresta cabem dentro dela?'], '24mm')) + bloco(
        2, 'Se eu dobrar o comprimento, a largura e a altura de um bloco, o volume fica quantas vezes maior? Teste com um exemplo.', linhas(2))
    return h7(
        'volume-de-blocos-retangulares', 'Volume de blocos retangulares', 'EF07MA30',
        'Resolver e elaborar problemas de volume de blocos retangulares com metro cúbico, decímetro cúbico e centímetro cúbico.',
        'Cubinhos do material dourado, caixas de leite e de sapato, régua.',
        ['Monte blocos com cubinhos e conte quantos cabem.',
         'Mostre que contar camada por camada é o mesmo que multiplicar as três medidas.',
         'Mostre uma caixa de 1 litro: 10 cm × 10 cm × 10 cm = 1 dm³.',
         'Na versão C, o estudante converte volume em litros e investiga o que acontece ao dobrar as medidas.'],
        ['Monte o bloco com cubinhos e conte por camadas.',
         'Escreva sempre comprimento, largura e altura nessa ordem.',
         'Desafio: montar blocos diferentes com o mesmo volume.'],
        ['Bloco 1: 6; 8. Bloco 2: 8 cm³.',
         'Bloco 1: 24 cm³; 30 m³; 1 000 dm³ = 1 m³. Bloco 2: 1 000 litros.',
         'Bloco 1: 48 m³ = 48 000 litros; 48 cubos (6 × 4 × 2). Bloco 2: 8 vezes; por exemplo 1 × 1 × 1 = 1 e 2 × 2 × 2 = 8.'],
        a, b, c)


def area_triangulos_quadrilateros():
    a = bloco(1, 'O triângulo pintado é a metade do retângulo. Quantos quadradinhos ele tem? Circule.', grade([
        item(ret_diagonal(4, 3), cx('O retângulo tem 12.') + opcoes(['6', '12'], certa='6'), exemplo=True),
        item(ret_diagonal(6, 2), cx('O retângulo tem 12.') + opcoes(['6', '8']))], 2)) + bloco(
        2, 'A área do retângulo é: Circule.', item(opcoes(['base × altura', 'base + altura'])))
    b = bloco(1, 'Calcule a área de cada figura.', grade([
        item(figura_medida('triangulo'), linhas(1)), item(figura_medida('paralelogramo'), linhas(1)), item(figura_medida('trapezio'), linhas(1))], 3)) + bloco(
        2, 'Complete as expressões da área.', frases(['Retângulo: A =', 'Triângulo: A =', 'Paralelogramo: A =', 'Trapézio: A =']))
    c = bloco(1, 'Explique com um desenho por que a área do triângulo é a metade de base × altura.', caixa_desenho('36mm')) + bloco(
        2, 'Mostre com um desenho que dois trapézios iguais formam um paralelogramo. Use isso para escrever a expressão da área do trapézio.', caixa_desenho('36mm')) + bloco(
        3, 'Resolva.', frases(['Losango com diagonais de 8 cm e 6 cm. Área:', 'Terreno em forma de trapézio com bases 20 m e 12 m e altura 10 m. Área:']))
    return h7(
        'area-de-triangulos-e-quadrilateros', 'Área de triângulos e quadriláteros', 'EF07MA31',
        'Estabelecer as expressões de cálculo de área de triângulos e de quadriláteros.',
        'Papel quadriculado, tesoura, retângulos e triângulos de papel.',
        ['Corte um retângulo na diagonal: cada triângulo é a metade.',
         'Corte um triângulo do paralelogramo e cole do outro lado: vira retângulo.',
         'Junte dois trapézios iguais: forma um paralelogramo.',
         'Na versão C, o estudante explica as expressões com desenhos.'],
        ['Recorte e monte as figuras de verdade.',
         'Marque a altura sempre com linha tracejada e o canto reto.',
         'Desafio: desenhar figuras diferentes com a mesma área.'],
        ['Bloco 1: 6; 6. Bloco 2: base × altura.',
         'Bloco 1: 12 cm²; 15 cm²; 15 cm². Bloco 2: b × h; b × h ÷ 2; b × h; (B + b) × h ÷ 2.',
         'Bloco 1: dois triângulos iguais formam um retângulo (ou paralelogramo) de área b × h. Bloco 2: o paralelogramo tem base B + b e altura h; o trapézio é a metade: (B + b) × h ÷ 2. Bloco 3: 24 cm²; 160 m².'],
        a, b, c)


def areas_decomposicao():
    a = bloco(1, 'Conte os quadradinhos pintados. Circule.', grade([
        item(malha(5, 4, 26, pintadas=ret(0, 1, 2, 3) + ret(2, 3, 2, 1)), opcoes(['8', '10'], certa='8'), exemplo=True),
        item(malha(5, 3, 26, pintadas=ret(0, 1, 4, 2) + [(0, 0)]), opcoes(['9', '8']))], 2)) + bloco(
        2, 'Dividi a figura em dois retângulos. Para achar a área, eu somo as áreas dos dois? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Calcule a área da figura em forma de L dividindo-a em retângulos.', item(forma_l()) + linhas(2)) + bloco(
        2, 'Uma sala de 5 m por 4 m tem um armário embutido de 1 m por 2 m. Qual é a área livre do chão?', linhas(1)) + bloco(
        3, 'Um retângulo e um triângulo podem ter a mesma área? Dê um exemplo.', linhas(1))
    c = bloco(1, 'A fachada de uma casinha é um quadrado de 6 m de lado com um triângulo em cima, de base 6 m e altura 4 m. Qual é a área da fachada? Desenhe.', caixa_desenho('34mm') + linhas(1)) + bloco(
        2, 'Corte um triângulo do paralelogramo e cole do outro lado para formar um retângulo. Se a base é 7 cm e a altura é 4 cm, qual é a área?', linhas(1)) + bloco(
        3, 'Um piso quadrado tem 50 cm de lado. Quantas peças cobrem uma sala de 5 m por 4 m?', linhas(2))
    return h7(
        'areas-por-decomposicao', 'Áreas por decomposição', 'EF07MA32',
        'Resolver e elaborar problemas de área de figuras planas que podem ser decompostas em quadrados, retângulos e triângulos, usando a equivalência entre áreas.',
        'Papel quadriculado, tesoura, plantas de casas.',
        ['Desenhe uma figura em L no quadriculado e peça dois jeitos de dividir.',
         'Mostre que recortar e montar de outro jeito não muda a área.',
         'Use uma planta de casa real e calcule a área dos cômodos.',
         'Na versão C, o estudante decompõe figuras com triângulos e resolve problemas de piso.'],
        ['Recorte a figura em partes e conte os quadradinhos de cada uma.',
         'Pinte cada parte de uma cor antes de calcular.',
         'Desafio: o colega desenha uma figura e você calcula a área.'],
        ['Bloco 1: 8; 9. Bloco 2: sim.',
         'Bloco 1: 8 × 3 = 24 e 3 × 4 = 12, total 36 m². Bloco 2: 18 m². Bloco 3: sim, por exemplo retângulo 3 × 4 e triângulo de base 6 e altura 4 (os dois com 12).',
         'Bloco 1: 36 + 12 = 48 m². Bloco 2: 28 cm². Bloco 3: cada peça tem 0,25 m²; a sala tem 20 m²; 80 peças.'],
        a, b, c)


def numero_pi():
    a = bloco(1, 'Contorne a tampa com barbante e meça o barbante. Depois meça a largura da tampa (o diâmetro).', item(circulo(46, 0, diametro=True, rotulos=False))
              + tabela(['Objeto', 'Contorno (cm)', 'Diâmetro (cm)'], [['tampa', '', ''], ['copo', '', '']])) + bloco(
        2, 'O contorno é quase quantas vezes o diâmetro? Circule.', item(opcoes(['3 vezes', '2 vezes'])))
    b = bloco(1, 'Meça objetos redondos e complete.', tabela(['Objeto', 'Contorno C', 'Diâmetro d', 'C ÷ d'], [['', '', '', ''], ['', '', '', ''], ['', '', '', '']])) + bloco(
        2, 'O valor de C ÷ d fica perto de que número?', linhas(1)) + bloco(
        3, 'Uma roda de bicicleta tem 60 cm de diâmetro. Quanto ela anda em uma volta? Use 3,14.', linhas(1))
    c = bloco(1, 'Arquimedes mostrou que π fica entre 3 + 10/71 e 3 + 1/7. Escreva esses números em decimal com a calculadora e compare com 3,14.', linhas(2)) + bloco(
        2, 'Leia e resolva. Use 3,14.', probs([
            'Uma pista circular tem raio de 50 m. Quantos metros tem uma volta?',
            'Uma roda deu 100 voltas e andou 157 m. Qual é o diâmetro da roda?'], '20mm')) + bloco(
        3, 'Por que π é o mesmo para qualquer circunferência, pequena ou grande?', linhas(2))
    return h7(
        'o-numero-pi', 'O número π', 'EF07MA33',
        'Estabelecer o número π como a razão entre o comprimento da circunferência e o seu diâmetro, e resolver problemas, inclusive históricos.',
        'Objetos redondos (tampas, latas, pratos), barbante, fita métrica, calculadora.',
        ['Meça com barbante o contorno de vários objetos redondos e o diâmetro.',
         'Divida o contorno pelo diâmetro na calculadora: sempre dá perto de 3,14.',
         'Conte a história de Arquimedes e dos povos que estimaram π.',
         'Na versão C, o estudante usa π em problemas e na comparação histórica.'],
        ['Faça a medição de verdade, com o barbante.',
         'Registre sempre na mesma tabela: contorno, diâmetro, divisão.',
         'Desafio: quem acha o valor mais perto de 3,14 com o seu objeto.'],
        ['Bloco 1: medidas pessoais. Bloco 2: 3 vezes.',
         'Bloco 1: medidas pessoais. Bloco 2: cerca de 3,14 (o número π). Bloco 3: 188,4 cm.',
         'Bloco 1: cerca de 3,1408 e 3,1429; 3,14 fica entre os dois. Bloco 2: 314 m; 0,5 m (50 cm). Bloco 3: porque o contorno e o diâmetro aumentam na mesma proporção.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def experimentos_frequencia():
    a = bloco(1, 'Jogue uma moeda 10 vezes e marque um risquinho a cada resultado.', tabela(['Cara', 'Coroa'], [['', '']])) + bloco(
        2, 'Num dado, o que tem mais chance de sair? Circule.', item(opcoes(['número par', 'o número 6'])))
    b = bloco(1, 'Lance um dado 30 vezes e complete.', tabela(['Face', '1', '2', '3', '4', '5', '6'], [
        ['Vezes', '', '', '', '', '', ''], ['Frequência (vezes ÷ 30)', '', '', '', '', '', '']])) + bloco(
        2, 'Qual é a probabilidade de cada face sair?', linhas(1)) + bloco(
        3, 'Seus resultados ficaram perto de 5 vezes para cada face? Por que pode ser diferente?', linhas(2))
    c = bloco(1, 'Lance dois dados 36 vezes (ou simule numa planilha) e anote a soma.', tabela(['Soma', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], [['Vezes'] + [''] * 11])) + bloco(
        2, 'Qual soma saiu mais vezes? Explique contando de quantas formas cada soma pode sair.', linhas(2)) + bloco(
        3, 'Em 360 lançamentos, quantas vezes você espera a soma 7?', linhas(1))
    return h7(
        'experimentos-e-frequencia', 'Experimentos e frequência', 'EF07MA34',
        'Planejar e realizar experimentos aleatórios ou simulações que envolvam probabilidades ou estimativas pela frequência.',
        'Moedas, dados, planilha eletrônica (função ALEATÓRIOENTRE).',
        ['Pergunte antes de lançar: o que você acha que vai sair mais?',
         'Lance e registre na tabela com risquinhos.',
         'Junte os resultados da turma: com mais lançamentos, a frequência fica perto da probabilidade.',
         'Na versão C, o estudante simula na planilha e explica a soma de dois dados.'],
        ['Faça os lançamentos em dupla: um lança e o outro marca.',
         'Use a mesma tabela para todos os experimentos.',
         'Corrida de cavalos com somas de dois dados.'],
        ['Bloco 1: resultados pessoais. Bloco 2: número par (3 em 6).',
         'Bloco 1: resultados pessoais. Bloco 2: 1/6. Bloco 3: os resultados mudam porque o experimento é aleatório; com muitos lançamentos ficam mais perto.',
         'Bloco 1: resultados pessoais. Bloco 2: em geral o 7, que pode sair de 6 formas em 36. Bloco 3: cerca de 60 vezes.'],
        a, b, c)


def media_amplitude():
    a = bloco(1, 'Ana tem 4 balas e Bia tem 2. Se dividirem igualmente, cada uma fica com: Circule.',
              item(fila_h(rot(grupo('bola', 4, 4, 40), 'Ana'), rot(grupo('bola', 2, 4, 40), 'Bia'), gap=40), opcoes(['3', '6']))) + bloco(
        2, 'As notas foram 6, 8 e 10. A média é: Circule.', item(opcoes(['8', '24'])), 'Some tudo e divida pela quantidade de notas.')
    b = bloco(1, 'Temperaturas de uma semana: 18, 20, 22, 19, 21, 24 e 16 (°C).', frases(['Média:', 'Maior e menor:', 'Amplitude (maior − menor):'])) + bloco(
        2, 'Gols em 5 jogos. Time A: 2, 2, 3, 2, 1. Time B: 0, 5, 0, 4, 1.', tabela(['Time', 'Média', 'Amplitude'], [['A', '', ''], ['B', '', '']])) + bloco(
        3, 'Qual time é mais regular? Por quê?', linhas(1))
    c = bloco(1, 'As notas foram 7, 8, 6, 9 e uma quinta nota. A média ficou 7,6. Qual foi a quinta nota?', linhas(1)) + bloco(
        2, 'Salários numa empresa: R$ 1 500, R$ 1 500, R$ 1 600, R$ 1 700 e R$ 12 000. Calcule a média e a amplitude. A média representa bem a empresa? Por quê?', linhas(3)) + bloco(
        3, 'Pergunte a 5 colegas quantas horas dormem e calcule a média e a amplitude.', tabela(['Colega', '1', '2', '3', '4', '5'], [['Horas', '', '', '', '', '']]))
    return h7(
        'media-e-amplitude', 'Média e amplitude', 'EF07MA35',
        'Compreender o significado de média como indicador da tendência de uma pesquisa, calcular seu valor e relacioná-lo com a amplitude do conjunto de dados.',
        'Pilhas de cubinhos, calculadora, dados da turma (altura, idade, horas de sono).',
        ['Faça pilhas de cubinhos de alturas diferentes e nivele todas: a altura igual é a média.',
         'Mostre o cálculo: somar tudo e dividir pela quantidade.',
         'Compare dois grupos com a mesma média e amplitudes diferentes.',
         'Na versão C, o estudante discute quando a média não representa bem os dados.'],
        ['Nivele as pilhas de cubinhos antes de fazer a conta.',
         'Siga sempre a ordem: somar, contar, dividir.',
         'Pesquisa relâmpago na turma e cálculo da média em dupla.'],
        ['Bloco 1: 3. Bloco 2: 8.',
         'Bloco 1: 20 °C; 24 °C e 16 °C; 8 °C. Bloco 2: A média 2, amplitude 2; B média 2, amplitude 5. Bloco 3: o time A, porque a amplitude é menor.',
         'Bloco 1: 8 (5 × 7,6 = 38 e 38 − 30 = 8). Bloco 2: média R$ 3 660 e amplitude R$ 10 500; não, o salário muito alto puxa a média para cima. Bloco 3: resposta pessoal.'],
        a, b, c)


def pesquisa_amostra():
    a = bloco(1, 'Para saber a fruta preferida da turma, pergunto a: Circule.', item(opcoes(['todos da turma', 'só 1 colega']))) + bloco(
        2, 'Faça a pesquisa e marque um risquinho para cada voto.', tabela(['Fruta', 'Votos'], [['banana', ''], ['maçã', ''], ['uva', ''], ['outra', '']])) + bloco(
        3, 'Qual fruta ganhou?', linhas(1))
    b = bloco(1, 'Censo (todos) ou amostra (uma parte)?', frases([
        'A altura dos 30 estudantes da turma:', 'O programa preferido dos brasileiros:', 'Testar se as lâmpadas de uma fábrica duram, até queimarem:'])) + bloco(
        2, 'Planeje uma pesquisa sobre a escola.', frases(['Tema:', 'Pergunta:', 'Quem vai responder (censo ou amostra)?'])) + bloco(
        3, 'Organize os dados numa tabela e faça um gráfico na planilha. Cole ou desenhe aqui.', caixa_desenho('34mm'))
    c = bloco(1, 'Planeje uma pesquisa sobre um tema social (transporte, lixo, uso do celular, alimentação).', tabela(['Etapa', 'O que vou fazer'], [
        ['tema', ''], ['pergunta', ''], ['população e amostra', ''], ['como coletar', ''], ['tabela e gráfico na planilha', '']])) + bloco(
        2, 'Por que a amostra precisa ter pessoas de grupos diferentes?', linhas(2)) + bloco(
        3, 'Escreva o relatório da pesquisa.', linhas(5))
    return h7(
        'pesquisa-censo-ou-amostra', 'Pesquisa: censo ou amostra', 'EF07MA36',
        'Planejar e realizar pesquisa sobre um tema da realidade social, decidindo entre censo e amostra, e comunicar os dados em relatório, tabelas e gráficos com planilhas.',
        'Formulário em papel ou on-line, planilha eletrônica, notícias com pesquisas.',
        ['Mostre uma notícia com pesquisa e pergunte: quantas pessoas responderam?',
         'Explique censo (todos) e amostra (uma parte bem escolhida).',
         'Planeje com a turma: tema, pergunta, quem responde, como registrar.',
         'Na versão C, o estudante planeja, faz o gráfico na planilha e escreve o relatório.'],
        ['Faça a pesquisa na própria turma, com perguntas de sim ou não.',
         'Use sempre o mesmo roteiro de etapas, uma por vez.',
         'Divida a pesquisa em tarefas curtas: perguntar, contar, digitar.'],
        ['Bloco 1: todos da turma. Bloco 2: votos da turma. Bloco 3: resposta pessoal.',
         'Bloco 1: censo; amostra; amostra (o teste destrói as lâmpadas). Bloco 2 e 3: respostas pessoais.',
         'Bloco 1: plano pessoal. Bloco 2: para representar bem a população e não favorecer um grupo. Bloco 3: resposta pessoal.'],
        a, b, c)


def setores_midia():
    a = bloco(1, 'Esporte preferido da turma. Qual ganhou? Circule.', item(setores([('futebol', 50, 'verde'), ('vôlei', 25, 'amarelo'), ('basquete', 25, 'rosa')]),
                                                                                 opcoes(['futebol', 'vôlei']))) + bloco(
        2, 'A metade do círculo é: Circule.', item(opcoes(['50%', '25%'])))
    b = bloco(1, 'Como 200 estudantes vão à escola.', item(setores([('ônibus', 45, 'amarelo'), ('a pé', 30, 'verde'), ('carro', 15, 'rosa'), ('bicicleta', 10, 'laranja')]))
              + tabela(['Meio', 'Porcentagem', 'Estudantes'], [['ônibus', '45%', ''], ['a pé', '30%', ''], ['carro', '15%', ''], ['bicicleta', '10%', '']])) + bloco(
        2, 'Quanto dá a soma das porcentagens? Por quê?', linhas(1))
    c = bloco(1, 'Gastos de uma família com renda de R$ 4 000.', item(setores([('moradia', 35, 'amarelo'), ('alimentação', 30, 'verde'), ('transporte', 15, 'rosa'), ('outros', 20, 'laranja')]))
              + frases(['Moradia:', 'Alimentação:', 'Transporte:', 'Outros:'])) + bloco(
        2, 'Por que o gráfico de setores é bom para esses dados? Para que tipo de dado ele não serve?', linhas(2)) + bloco(
        3, 'Uma notícia mostrou um gráfico de setores com 40%, 35% e 30%. O que está errado?', linhas(1))
    return h7(
        'graficos-de-setores-na-midia', 'Gráficos de setores na mídia', 'EF07MA37',
        'Interpretar e analisar dados em gráficos de setores divulgados pela mídia e compreender quando é possível ou conveniente usá-los.',
        'Recortes de jornais e sites com gráficos de setores, transferidor, calculadora.',
        ['Mostre gráficos de setores de notícias e pergunte: qual parte é maior?',
         'Lembre que o círculo todo é 100%: metade é 50%, um quarto é 25%.',
         'Calcule quantas pessoas cada parte representa.',
         'Na versão C, o estudante analisa quando o gráfico de setores é adequado e encontra erros.'],
        ['Recorte um círculo de papel em partes e compare com o gráfico.',
         'Leia sempre na mesma ordem: título, legenda, porcentagens.',
         'Caça ao erro em gráficos de notícias.'],
        ['Bloco 1: futebol. Bloco 2: 50%.',
         'Bloco 1: 90; 60; 30; 20. Bloco 2: 100%, porque o círculo representa o total.',
         'Bloco 1: R$ 1 400; R$ 1 200; R$ 600; R$ 800. Bloco 2: mostra as partes de um todo; não serve para dados que não formam um todo ou que mudam com o tempo (nesse caso, gráfico de linha). Bloco 3: a soma dá 105%, mais que o todo.'],
        a, b, c)


FICHAS = [mmc_mdc, porcentagem, inteiros_reta, operacoes_inteiros, varios_algoritmos, mesma_estrutura, fluxograma_grupo,
          fracoes_significados, razao_fracao, racionais_reta, multiplicar_dividir_racionais, problemas_racionais,
          variavel_incognita, sequencias_recursivas, sequencias_algebricas, expressoes_equivalentes,
          multiplicar_coordenadas, simetrico_plano, circunferencia_compasso, existencia_triangulo, rigidez_triangulo,
          fluxograma_triangulo, angulos_poligonos_regulares, fluxograma_poligono_regular,
          medidas_aproximadas, volume_blocos, area_triangulos_quadrilateros, areas_decomposicao, numero_pi,
          experimentos_frequencia, media_amplitude, pesquisa_amostra, setores_midia]
