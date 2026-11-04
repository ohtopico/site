"""8º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos2 import barra_fracao, grafico_linha, malha, regular
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, tabela
from ano3 import frases, ligar
from ano5 import empilhado
from ano6 import angulo2, fluxo_vazio
from ano7 import figura_medida, fluxo_linear, plano1, plano4
from ano8 import circulo_raio, losango_med, segmento, sup, tres_casas
from hab3 import cx, probs


def h8(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='40 a 50 minutos'):
    return ficha(slug, titulo, '8º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ret(x, y, c, l):
    return [(i, j) for i in range(x, x + c) for j in range(y, y + l)]


def ordem(passos):
    return tabela(['Passo', 'Ordem'], passos)


# ---------- Números ----------

def potencias_notacao():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(cx(f'{sup(2, 3)} = 2 × 2 × 2'), opcoes(['8', '6'], certa='8'), exemplo=True),
        item(cx(f'{sup(10, 2)} = 10 × 10'), opcoes(['100', '20']))], 2), 'O expoente diz quantas vezes o número se multiplica.') + bloco(
        2, f'{sup(10, 3)} = 1 000. Quantos zeros tem? Circule.', item(opcoes(['3', '10'])))
    b = bloco(1, 'Calcule.', grade([item(cx(f'{sup(2, 5)} = {VAZIO}')), item(cx(f'{sup(10, "−1")} = {VAZIO}')), item(cx(f'{sup(5, 0)} = {VAZIO}')),
                                    item(cx(f'{sup(3, "−2")} = {VAZIO}')), item(cx(f'{sup(2, 3)} × {sup(2, 2)} = {VAZIO}')), item(cx(f'{sup(10, 6)} ÷ {sup(10, 4)} = {VAZIO}'))], 3)) + bloco(
        2, 'Escreva em notação científica.', frases(['300 000 =', '45 000 000 =', '0,002 =']))
    c = bloco(1, 'Resolva.', frases([
        'A distância da Terra ao Sol é cerca de 150 000 000 km. Em notação científica:',
        'Uma bactéria mede 0,000002 m. Em notação científica:',
        f'(3 × {sup(10, 4)}) × (2 × {sup(10, 3)}) =',
        f'7,2 × {sup(10, "−3")} na forma decimal:'])) + bloco(
        2, f'Por que {sup("(−2)", 2)} e −{sup(2, 2)} dão resultados diferentes?', linhas(2)) + bloco(
        3, f'Qual é maior: {sup(2, 10)} ou {sup(10, 3)}?', linhas(1))
    return h8(
        'potencias-e-notacao-cientifica', 'Potências e notação científica', 'EF08MA01',
        'Efetuar cálculos com potências de expoentes inteiros e usar esse conhecimento para escrever números em notação científica.',
        'Calculadora científica, cartões com potências de 10, notícias com números muito grandes ou muito pequenos.',
        ['Mostre a sequência 1 000, 100, 10, 1, 0,1, 0,01 e as potências de 10 correspondentes.',
         'Conclua que expoente zero dá 1 e expoente negativo vira fração.',
         'Escreva números de notícias (população, tamanho de células) em notação científica.',
         'Na versão C, o estudante calcula com notação científica e compara potências.'],
        ['Escreva a multiplicação por extenso ao lado de cada potência.',
         'Use sempre a tabela das potências de 10 fixa na mesa.',
         'Desafio: quem escreve primeiro o número da notícia em notação científica.'],
        ['Bloco 1: 8; 100. Bloco 2: 3.',
         f'Bloco 1: 32; 0,1; 1; 1/9; 32; 100. Bloco 2: 3 × {sup(10, 5)}; 4,5 × {sup(10, 7)}; 2 × {sup(10, "−3")}.',
         f'Bloco 1: 1,5 × {sup(10, 8)} km; 2 × {sup(10, "−6")} m; 6 × {sup(10, 7)}; 0,0072. Bloco 2: {sup("(−2)", 2)} = 4, porque o sinal também é elevado; −{sup(2, 2)} = −4. Bloco 3: {sup(2, 10)} = 1 024 é maior que 1 000.'],
        a, b, c)


def raiz_potencia():
    a = bloco(1, 'Qual número vezes ele mesmo dá a área do quadrado? Circule.', grade([
        item(malha(3, 3, 26, pintadas=ret(0, 0, 3, 3)), cx('□ × □ = 9') + opcoes(['3', '9'], certa='3'), exemplo=True),
        item(malha(4, 4, 26, pintadas=ret(0, 0, 4, 4)), cx('□ × □ = 16') + opcoes(['4', '8']))], 2)) + bloco(
        2, '√25 = ? Circule.', item(opcoes(['5', '12,5'])), 'A raiz quadrada é o lado do quadrado.')
    b = bloco(1, 'Calcule.', frases(['√49 =', '√100 =', '∛8 =', '∛27 ='])) + bloco(
        2, 'Complete.', frases([f'Se {sup(6, 2)} = 36, então √36 =', f'Se {sup(2, 3)} = 8, então ∛8 ='])) + bloco(
        3, 'Um quadrado tem área de 81 m². Quanto mede o lado?', linhas(1))
    c = bloco(1, 'Escreva como potência ou calcule.', frases(['√5 como potência:', '∛7 como potência:', f'{sup(9, "1/2")} =', f'{sup(8, "2/3")} ='])) + bloco(
        2, 'Leia e resolva.', probs(['Um cubo tem volume de 64 cm³. Quanto mede a aresta?',
                                     'Um terreno quadrado tem 200 m². Entre quais números inteiros está a medida do lado?'], '18mm')) + bloco(
        3, f'Explique por que {sup(9, "1/2")} = 3.', linhas(2))
    return h8(
        'raiz-como-potencia', 'Raiz como potência', 'EF08MA02',
        'Resolver e elaborar problemas usando a relação entre potenciação e radiciação, representando uma raiz como potência de expoente fracionário.',
        'Papel quadriculado, cubinhos, calculadora.',
        ['Monte quadrados com quadradinhos: a raiz quadrada da área é o lado.',
         'Monte cubos com cubinhos: a raiz cúbica do volume é a aresta.',
         'Mostre que a raiz desfaz a potência, como a subtração desfaz a adição.',
         'Na versão C, o estudante usa o expoente fracionário.'],
        ['Monte os quadrados de verdade com quadradinhos.',
         'Use a mesma tabela de quadrados perfeitos (1, 4, 9, 16...) em todas as aulas.',
         'Desafio: estimar raízes que não são exatas.'],
        ['Bloco 1: 3; 4. Bloco 2: 5.',
         'Bloco 1: 7; 10; 2; 3. Bloco 2: 6; 2. Bloco 3: 9 m.',
         f'Bloco 1: {sup(5, "1/2")}; {sup(7, "1/3")}; 3; 4. Bloco 2: 4 cm; entre 14 e 15 (cerca de 14,1 m). Bloco 3: {sup(9, "1/2")} × {sup(9, "1/2")} = {sup(9, 1)} = 9, e 3 × 3 = 9.'],
        a, b, c)


def principio_multiplicativo():
    a = bloco(1, 'Tenho 2 camisetas (azul e verde) e 3 bermudas (preta, jeans e cinza). Complete as combinações.', tabela(
        ['', 'preta', 'jeans', 'cinza'], [['azul', 'azul e preta', '', ''], ['verde', '', '', '']])) + bloco(
        2, 'Quantas roupas diferentes posso montar? Circule.', item(opcoes(['6', '5'])), '2 camisetas × 3 bermudas.')
    b = bloco(1, 'Leia e resolva.', probs([
        'Um lanche tem 3 tipos de pão, 4 recheios e 2 sucos. Quantos lanches diferentes?',
        'Uma senha tem 3 algarismos (de 0 a 9) e pode repetir. Quantas senhas existem?',
        'De quantas formas 4 amigos podem fazer uma fila?'], '16mm', 3)) + bloco(
        2, 'Desenhe a árvore de possibilidades de lançar uma moeda duas vezes.', caixa_desenho('34mm'))
    c = bloco(1, 'Leia e resolva.', probs([
        'Uma placa tem 3 letras (26 possíveis) e 4 algarismos. Quantas placas diferentes existem?',
        'Quantos números de 3 algarismos diferentes formo com 1, 2, 3, 4 e 5?',
        'Um cardápio tem 3 entradas, 5 pratos e 4 sobremesas. Quantas refeições com um item de cada?'], '16mm', 3)) + bloco(
        2, 'Crie um problema de contagem que se resolva pelo princípio multiplicativo.', linhas(2))
    return h8(
        'principio-multiplicativo', 'Princípio multiplicativo', 'EF08MA03',
        'Resolver e elaborar problemas de contagem que usem o princípio multiplicativo.',
        'Roupas recortadas em papel, fichas coloridas, papel para árvore de possibilidades.',
        ['Monte combinações de roupas de papel e conte.',
         'Organize numa tabela ou árvore para não esquecer nenhuma.',
         'Mostre que basta multiplicar as opções de cada etapa.',
         'Na versão C, o estudante resolve problemas com restrições (algarismos diferentes).'],
        ['Use as roupas de papel e monte cada combinação.',
         'Use sempre a árvore com o mesmo formato, da esquerda para a direita.',
         'Desafio: inventar um cardápio e contar as combinações.'],
        ['Bloco 1: azul e jeans, azul e cinza, verde e preta, verde e jeans, verde e cinza. Bloco 2: 6.',
         'Bloco 1: 24; 1 000; 24. Bloco 2: cara-cara, cara-coroa, coroa-cara, coroa-coroa.',
         'Bloco 1: 26 × 26 × 26 × 10 × 10 × 10 × 10 = 175 760 000; 5 × 4 × 3 = 60; 60. Bloco 2: resposta pessoal.'],
        a, b, c)


def porcentagem_tecnologia():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(barra_fracao(10, 2, 220, 28), cx('20% de 50') + opcoes(['10', '20'], certa='10'), exemplo=True),
        item(barra_fracao(4, 3, 220, 28), cx('75% de 40') + opcoes(['30', '75']))], 2)) + bloco(
        2, 'Uma geladeira custa R$ 2 000 e tem 10% de desconto. Vou pagar: Circule.', item(opcoes(['R$ 1 800', 'R$ 1 990'])))
    b = bloco(1, 'Use a calculadora: multiplique pelo número decimal.', tabela(['Situação', 'Conta', 'Resultado'], [
        ['18% de 350', '0,18 × 350', ''], ['aumento de 12% sobre R$ 1 500', '1,12 × 1 500', ''], ['desconto de 35% sobre R$ 240', '0,65 × 240', '']])) + bloco(
        2, 'Numa turma de 32 estudantes, 8 usam óculos. Que porcentagem é essa?', linhas(1))
    c = bloco(1, 'Leia e resolva com a calculadora.', probs([
        'Uma dívida de R$ 1 000 cresce 2% ao mês, sempre sobre o valor do mês anterior. Quanto será depois de 3 meses?',
        'Um produto passou de R$ 80 para R$ 92. Qual foi o aumento em porcentagem?',
        'Uma loja dá 20% de desconto e depois mais 10% sobre o novo preço. Isso é o mesmo que 30%?'], '16mm', 3)) + bloco(
        2, 'Numa planilha, calcule um salário de R$ 2 000 com aumentos de 5%, 10% e 15%.', tabela(['Aumento', '5%', '10%', '15%'], [['Novo salário', '', '', '']]))
    return h8(
        'porcentagem-com-calculadora-e-planilha', 'Porcentagem com calculadora e planilha', 'EF08MA04',
        'Resolver e elaborar problemas com cálculo de porcentagens, incluindo o uso de tecnologias digitais.',
        'Calculadora, planilha eletrônica, folhetos de lojas, contas de luz.',
        ['Relembre o cálculo mental de 10%, 25% e 50%.',
         'Mostre que aumento de 12% é multiplicar por 1,12 e desconto de 35% é multiplicar por 0,65.',
         'Monte na planilha uma coluna de preços e outra com a fórmula do desconto.',
         'Na versão C, o estudante calcula aumentos seguidos e porcentagem de variação.'],
        ['Comece com valores redondos e só depois use a calculadora.',
         'Siga sempre o mesmo roteiro: transformar a porcentagem em decimal, multiplicar, conferir.',
         'Desafio: quem monta primeiro a fórmula da planilha que funciona.'],
        ['Bloco 1: 10; 30. Bloco 2: R$ 1 800.',
         'Bloco 1: 63; R$ 1 680; R$ 156. Bloco 2: 25%.',
         'Bloco 1: R$ 1 061,21; 15%; não, é 28% (0,8 × 0,9 = 0,72). Bloco 2: R$ 2 100; R$ 2 200; R$ 2 300.'],
        a, b, c)


def dizimas():
    a = bloco(1, 'Faça a divisão na calculadora e circule o resultado.', grade([
        item(cx('1 ÷ 3'), opcoes(['0,333...', '0,3'], certa='0,333...'), exemplo=True),
        item(cx('2 ÷ 3'), opcoes(['0,666...', '0,6']))], 2), 'Os três pontinhos querem dizer que o número se repete sem parar.') + bloco(
        2, 'Em 0,444..., qual algarismo se repete? Circule.', item(opcoes(['4', '0'])))
    b = bloco(1, 'Divida na calculadora e escreva o período (o que se repete).', tabela(['Fração', 'Decimal', 'Período'], [
        ['1/9', '', ''], ['5/9', '', ''], ['2/11', '', ''], ['1/6', '', '']])) + bloco(
        2, 'Descubra a fração.', frases(['0,777... = ___/9', '0,2323... = ___/99']))
    c = bloco(1, 'Ache a fração geratriz como no exemplo: x = 0,333...; 10x = 3,333...; 10x − x = 3; 9x = 3; x = 3/9 = 1/3.', frases([
        '0,888... =', '0,1515... =', '1,222... =', '0,8333... ='])) + bloco(
        2, 'Use o mesmo método para 0,999... O que você descobre?', linhas(2))
    return h8(
        'fracao-geratriz-de-dizimas', 'Fração geratriz de dízimas', 'EF08MA05',
        'Reconhecer e usar procedimentos para obter a fração geratriz de uma dízima periódica.',
        'Calculadora, cartões com frações e decimais.',
        ['Divida frações como 1/3, 2/9 e 5/11 na calculadora e observe o que se repete.',
         'Mostre que dízimas com um algarismo repetido vêm de frações com denominador 9, e com dois, de 99.',
         'Apresente o método de multiplicar por 10 ou por 100 e subtrair.',
         'Na versão C, o estudante usa o método em dízimas compostas e em 0,999...'],
        ['Use a calculadora em todas as divisões.',
         'Mantenha o exemplo resolvido sempre visível.',
         'Desafio: achar a fração de uma dízima escolhida pelo colega.'],
        ['Bloco 1: 0,333...; 0,666... Bloco 2: 4.',
         'Bloco 1: 0,111..., 1; 0,555..., 5; 0,1818..., 18; 0,1666..., 6. Bloco 2: 7/9; 23/99.',
         'Bloco 1: 8/9; 15/99 = 5/33; 11/9; 5/6 (100x − 10x = 83,333... − 8,333... = 75; x = 75/90). Bloco 2: 9x = 9, então x = 1; 0,999... é igual a 1.'],
        a, b, c)


# ---------- Álgebra ----------

def equacao_reta():
    a = bloco(1, 'x + y = 4. Complete os pares.', tabela(['x', '0', '1', '2', '3', '4'], [['y', '4', '', '', '', '']])) + bloco(
        2, 'Marque os pontos (x, y) no plano. Eles ficam em: Circule.', item(plano1(5, 5, 30), opcoes(['uma reta', 'um círculo'])))
    b = bloco(1, 'y = 2x + 1. Complete e desenhe os pontos.', tabela(['x', '0', '1', '2', '3'], [['y', '', '', '', '']]) + item(plano1(6, 8, 24))) + bloco(
        2, 'O ponto (5, 11) está nessa reta? Por quê?', linhas(1))
    c = bloco(1, '2x + y = 6. Ache quatro soluções e desenhe a reta.', tabela(['x', '', '', '', ''], [['y', '', '', '', '']]) + item(plano4(6, 18))) + bloco(
        2, 'Onde a reta corta o eixo x? E o eixo y?', linhas(1)) + bloco(
        3, 'Quantas soluções tem uma equação com duas incógnitas? Explique.', linhas(2))
    return h8(
        'equacao-com-duas-incognitas-e-reta', 'Equação com duas incógnitas e a reta', 'EF08MA07',
        'Associar uma equação linear de 1º grau com duas incógnitas a uma reta no plano cartesiano.',
        'Papel quadriculado, régua, aplicativo de geometria dinâmica (opcional).',
        ['Peça pares de números que somam 4 e anote numa tabela.',
         'Marque os pares no plano: eles ficam alinhados.',
         'Mostre que qualquer ponto da reta é uma solução, inclusive com decimais.',
         'Na versão C, o estudante acha as soluções e os pontos de corte com os eixos.'],
        ['Use a tabela já começada e marque os pontos com adesivos.',
         'Siga sempre a ordem: escolher x, calcular y, marcar o ponto.',
         'Desafio: achar uma solução com números negativos.'],
        ['Bloco 1: 3, 2, 1, 0. Bloco 2: uma reta.',
         'Bloco 1: 1, 3, 5, 7 e pontos alinhados. Bloco 2: sim, 2 × 5 + 1 = 11.',
         'Bloco 1: por exemplo (0, 6), (1, 4), (2, 2), (3, 0). Bloco 2: no eixo x em (3, 0); no eixo y em (0, 6). Bloco 3: infinitas, uma para cada ponto da reta.'],
        a, b, c)


def sistemas_dia_a_dia():
    a = bloco(1, 'Um lanche e um suco custam R$ 10 juntos. O lanche custa R$ 4 a mais que o suco. Complete.', tabela(['Suco', 'Lanche', 'Total'], [
        ['R$ 2', 'R$ 6', 'R$ 8'], ['R$ 3', 'R$ 7', ''], ['R$ 4', 'R$ 8', '']])) + bloco(
        2, 'Qual linha dá R$ 10? Circule.', item(opcoes(['suco de R$ 3', 'suco de R$ 4'])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Num estacionamento há 20 veículos, entre carros e motos, e 70 rodas. Quantos carros e quantas motos?',
        'A soma de dois números é 30 e a diferença é 6. Quais são os números?'], '22mm')) + bloco(
        2, 'Escreva o sistema de equações do primeiro problema.', linhas(1))
    c = bloco(1, 'Resolva pelo gráfico: x + y = 5 e x − y = 1. Desenhe as duas retas.', item(plano1(6, 6, 26))) + bloco(
        2, 'Leia e resolva.', probs(['Na cantina, 2 pastéis e 1 suco custam R$ 13; 1 pastel e 2 sucos custam R$ 11. Quanto custa cada um?'], '20mm', 1)) + bloco(
        3, 'Um sistema pode não ter solução? Como ficam as retas nesse caso?', linhas(1))
    return h8(
        'sistemas-de-equacoes-no-dia-a-dia', 'Sistemas de equações no dia a dia', 'EF08MA08',
        'Resolver e elaborar problemas do contexto próximo que possam ser representados por sistemas de equações de 1º grau com duas incógnitas, inclusive pelo plano cartesiano.',
        'Dinheiro de brinquedo, cardápio da cantina, papel quadriculado.',
        ['Proponha um problema da cantina e teste valores numa tabela.',
         'Escreva as duas condições como equações.',
         'Desenhe as duas retas: o cruzamento é a resposta.',
         'Na versão C, o estudante resolve pelo gráfico e pela álgebra.'],
        ['Use dinheiro de brinquedo para testar os valores.',
         'Escreva sempre as duas equações uma embaixo da outra.',
         'Desafio: inventar um problema de cantina para o colega.'],
        ['Bloco 1: R$ 10; R$ 12. Bloco 2: suco de R$ 3.',
         'Bloco 1: 15 carros e 5 motos; 18 e 12. Bloco 2: c + m = 20 e 4c + 2m = 70.',
         'Bloco 1: as retas se cruzam em (3, 2). Bloco 2: pastel R$ 5 e suco R$ 3. Bloco 3: sim, quando as retas são paralelas.'],
        a, b, c)


def sequencia_nao_recursiva():
    a = bloco(1, 'A figura n tem 2 × n bolinhas. Complete.', tabela(['Figura', '1', '2', '3', '4'], [['Bolinhas', '2', '4', '', '']])) + bloco(
        2, 'Quantas bolinhas tem a figura 10? Circule.', item(opcoes(['20', '12'])))
    b = bloco(1, 'O termo de posição n é 3n + 2. Complete.', tabela(['n', '1', '2', '3', '4', '10'], [['Termo', '', '', '', '', '']])) + bloco(
        2, 'Complete o fluxograma que dá o termo de qualquer posição n.', item(fluxo_vazio(3)))
    c = bloco(1, 'Sequência 4, 9, 14, 19, ... Escreva a expressão do termo n e desenhe o fluxograma que dá qualquer termo.', caixa_desenho('50mm') + linhas(1)) + bloco(
        2, 'Use o fluxograma para achar o 100º termo.', linhas(1)) + bloco(
        3, 'Sequência dos quadrados: 1, 4, 9, 16, ... Qual é o termo da posição n? E o 20º termo?', linhas(1))
    return h8(
        'sequencia-nao-recursiva-e-fluxograma', 'Sequência não recursiva e fluxograma', 'EF08MA10',
        'Identificar a regularidade de uma sequência numérica ou de figuras não recursiva e construir um fluxograma que indique os termos seguintes.',
        'Palitos, bolinhas de massinha, cartões de fluxograma.',
        ['Monte uma sequência de figuras e registre numa tabela.',
         'Mostre que dá para achar a figura 100 sem desenhar as anteriores: a regra usa a posição.',
         'Transforme a regra em fluxograma: ler n, calcular, mostrar.',
         'Na versão C, o estudante descobre a expressão e cria o fluxograma.'],
        ['Monte as figuras com material concreto.',
         'Use a tabela com a posição em cima e o termo embaixo.',
         'Desafio: prever a figura 50 e conferir com a regra.'],
        ['Bloco 1: 6, 8. Bloco 2: 20.',
         'Bloco 1: 5, 8, 11, 14, 32. Bloco 2: ler n; multiplicar por 3; somar 2.',
         'Bloco 1: 5n − 1; ler n, multiplicar por 5, subtrair 1, mostrar. Bloco 2: 499. Bloco 3: n × n; 400.'],
        a, b, c)


def sequencia_recursiva_fluxo():
    a = bloco(1, 'Cada número é o dobro do anterior. Complete.', item(cx(f'1, 2, 4, 8, {VAZIO}, {VAZIO}'))) + bloco(
        2, 'Siga o fluxograma. Que número aparece no fim? Circule.', item(fluxo_linear(['Comece com 3', 'Some 5', 'Some 5', 'Some 5']), opcoes(['18', '8'])))
    b = bloco(1, 'Complete o fluxograma que gera a sequência 2, 5, 8, 11, ...', item(fluxo_vazio(4)),
              'Use: começar com 2; mostrar o número; somar 3; voltar para mostrar.') + bloco(
        2, 'Escreva os três próximos termos.', linhas(1)) + bloco(
        3, 'Qual é a diferença entre esse fluxograma e uma fórmula como 3n − 1?', linhas(2))
    c = bloco(1, 'Sequência de Fibonacci: 1, 1, 2, 3, 5, ... Desenhe um fluxograma que gere os termos (guarde os dois últimos números).', caixa_desenho('56mm')) + bloco(
        2, 'Escreva os 10 primeiros termos.', linhas(1)) + bloco(
        3, 'Uma colônia começa com 2 bactérias e triplica a cada hora. Quantas há depois de 5 horas? Explique o passo recursivo.', linhas(2))
    return h8(
        'sequencia-recursiva-e-fluxograma', 'Sequência recursiva e fluxograma', 'EF08MA11',
        'Identificar a regularidade de uma sequência numérica recursiva e construir um fluxograma que indique os números seguintes.',
        'Cartões de fluxograma, setas, calculadora.',
        ['Mostre uma sequência em que cada termo depende do anterior.',
         'Monte o fluxograma com uma seta que volta: é a repetição.',
         'Compare com a regra pela posição, da ficha de sequências não recursivas.',
         'Na versão C, o estudante cria fluxogramas que guardam mais de um número.'],
        ['Siga o fluxograma com o dedo, passo a passo.',
         'Use sempre a mesma forma para a seta que volta.',
         'Desafio: o colega inventa um número inicial e você segue o fluxograma.'],
        ['Bloco 1: 16 e 32. Bloco 2: 18.',
         'Bloco 1: começar com 2; mostrar; somar 3; voltar para mostrar. Bloco 2: 14, 17, 20. Bloco 3: o fluxograma recursivo precisa do termo anterior; a fórmula dá qualquer termo direto pela posição.',
         'Bloco 1: guardar a = 1 e b = 1; mostrar a; calcular c = a + b; a recebe b e b recebe c; voltar. Bloco 2: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55. Bloco 3: 486 (2, 6, 18, 54, 162, 486); cada hora é a anterior vezes 3.'],
        a, b, c)


def grandezas_variacao():
    a = bloco(1, 'Cada pacote custa R$ 5. Complete.', tabela(['Pacotes', '1', '2', '3', '4'], [['Preço (R$)', '5', '10', '', '']])) + bloco(
        2, 'Se eu dobro os pacotes, o preço: Circule.', item(opcoes(['dobra', 'fica igual'])))
    b = bloco(1, 'Escreva: diretamente proporcional, inversamente proporcional ou não proporcional.', frases([
        'Quantidade de pães e preço pago:', 'Velocidade e tempo de uma viagem:', 'Idade e altura de uma pessoa:', 'Número de pintores e dias para pintar um muro:'])) + bloco(
        2, 'y = 3x. Complete e marque os pontos.', tabela(['x', '1', '2', '3', '4'], [['y', '', '', '', '']]) + item(plano1(5, 6, 24, passo_y=2)))
    c = bloco(1, 'Uma viagem de 240 km. Complete.', tabela(['Velocidade (km/h)', '60', '80', '120'], [['Tempo (h)', '', '', '']])
              + frases(['Sentença que relaciona tempo t e velocidade v:'])) + bloco(
        2, 'O gráfico de velocidade e tempo é uma reta que passa pela origem? Por quê?', linhas(2)) + bloco(
        3, 'Um táxi cobra R$ 5 mais R$ 3 por quilômetro. O preço é proporcional aos quilômetros? Por quê?', linhas(2))
    return h8(
        'grandezas-proporcionais-ou-nao', 'Grandezas proporcionais ou não', 'EF08MA12',
        'Identificar se duas grandezas são direta ou inversamente proporcionais ou não proporcionais, expressar a relação por sentença algébrica e representá-la no plano cartesiano.',
        'Tabelas de preços, papel quadriculado, calculadora.',
        ['Monte tabelas com situações do dia a dia e pergunte: se uma dobra, a outra dobra, cai pela metade ou nada disso?',
         'Escreva a sentença de cada caso (y = 3x, t = 240 ÷ v).',
         'Marque os pontos no plano e compare os formatos.',
         'Na versão C, o estudante analisa gráficos e casos não proporcionais.'],
        ['Use objetos e preços reais para montar as tabelas.',
         'Use sempre as três palavras escritas em cartões: direta, inversa, não proporcional.',
         'Desafio: inventar uma situação de cada tipo.'],
        ['Bloco 1: 15, 20. Bloco 2: dobra.',
         'Bloco 1: direta; inversa; não proporcional; inversa. Bloco 2: 3, 6, 9, 12, pontos alinhados com a origem.',
         'Bloco 1: 4 h, 3 h, 2 h; t = 240 ÷ v. Bloco 2: não; é uma curva, porque quando a velocidade aumenta o tempo diminui. Bloco 3: não; P = 5 + 3k e dobrar os quilômetros não dobra o preço.'],
        a, b, c)


def problemas_proporcionais():
    a = bloco(1, 'Leia e circule.', grade([
        item(cx('1 bolo usa 2 ovos.<br>3 bolos usam:'), opcoes(['6 ovos', '5 ovos'], certa='6 ovos'), exemplo=True),
        item(cx('2 pessoas pintam o muro em 6 dias.<br>4 pessoas pintam em:'), opcoes(['3 dias', '12 dias']))], 1),
        'Mais pessoas trabalhando: menos dias.')
    b = bloco(1, 'Leia e resolva.', probs([
        '5 kg de arroz custam R$ 28. Quanto custam 8 kg?',
        'Com 4 torneiras, a caixa enche em 6 horas. Com 8 torneiras iguais?',
        'A 80 km/h, uma viagem dura 3 horas. A 60 km/h, quanto dura?',
        'Uma receita para 6 pessoas usa 300 g de farinha. Para 15 pessoas?'], '16mm'))
    c = bloco(1, 'Leia e resolva.', probs([
        '12 operários fazem uma obra em 30 dias. Em quantos dias 18 operários fazem a mesma obra?',
        'Uma impressora imprime 450 páginas em 15 minutos. Quanto tempo leva para 1 200 páginas?',
        'Num mapa de escala 1 : 50 000, 4 cm representam quantos quilômetros?'], '16mm', 3)) + bloco(
        2, 'Crie um problema com grandezas inversamente proporcionais e resolva.', linhas(2))
    return h8(
        'problemas-direta-e-inversamente-proporcionais', 'Problemas com grandezas proporcionais', 'EF08MA13',
        'Resolver e elaborar problemas com grandezas direta ou inversamente proporcionais, com estratégias variadas.',
        'Receitas, mapas com escala, calculadora.',
        ['Antes de calcular, pergunte: se uma aumenta, a outra aumenta ou diminui?',
         'Resolva pela unidade (quanto custa 1 kg) ou montando a proporção.',
         'Confira se a resposta faz sentido.',
         'Na versão C, o estudante resolve problemas com escala e cria um problema.'],
        ['Faça uma receita de verdade, dobrando as quantidades.',
         'Use sempre uma tabela de duas colunas para organizar os dados.',
         'Desafio: estimar a resposta antes de calcular.'],
        ['Bloco 1: 6 ovos; 3 dias.',
         'Bloco 1: R$ 44,80; 3 horas; 4 horas; 750 g.',
         'Bloco 1: 20 dias; 40 minutos; 2 km. Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Geometria ----------

def construcoes_geometricas():
    a = bloco(1, 'Dobre o papel para que A caia sobre B. A dobra é a: Circule.', item(segmento(True), opcoes(['mediatriz', 'diagonal']))) + bloco(
        2, 'Dobre o ângulo ao meio, juntando os dois lados. A dobra é a: Circule.', item(angulo2(60, 120), opcoes(['bissetriz', 'mediatriz'])))
    b = bloco(1, 'Construa com régua e compasso a mediatriz de um segmento de 6 cm.', caixa_desenho('56mm')) + bloco(
        2, 'Construa um ângulo de 60° com o compasso (como num triângulo equilátero) e trace a bissetriz para obter 30°.', caixa_desenho('56mm'))
    c = bloco(1, 'Construa ângulos de 90° e de 45° só com régua e compasso.', caixa_desenho('56mm')) + bloco(
        2, 'Construa um quadrado dentro de uma circunferência usando dois diâmetros perpendiculares.', caixa_desenho('60mm')) + bloco(
        3, 'Que construção (mediatriz ou bissetriz) você usou em cada passo?', linhas(2))
    return h8(
        'construcoes-mediatriz-bissetriz-e-angulos', 'Construções: mediatriz, bissetriz e ângulos', 'EF08MA15',
        'Construir, com instrumentos de desenho ou software de geometria dinâmica, mediatriz, bissetriz, ângulos de 90°, 60°, 45° e 30° e polígonos regulares.',
        'Papel para dobrar, régua, compasso, aplicativo de geometria dinâmica (opcional).',
        ['Comece com dobraduras: a dobra que leva A em B é a mediatriz; a que junta os lados do ângulo é a bissetriz.',
         'Mostre a construção com compasso passo a passo no quadro.',
         'Combine construções: a mediatriz dá 90°, a bissetriz de 90° dá 45°.',
         'Na versão C, o estudante combina construções para fazer um quadrado.'],
        ['Faça a dobradura antes de usar o compasso.',
         'Repita sempre a mesma sequência de passos, falando em voz alta.',
         'Use o aplicativo de geometria dinâmica para conferir.'],
        ['Bloco 1: mediatriz. Bloco 2: bissetriz.',
         'Bloco 1: dois arcos de mesmo raio com centro em cada ponta; a reta que liga os cruzamentos. Bloco 2: ângulo de 60° e a bissetriz formando 30°.',
         'Bloco 1: 90° pela mediatriz e 45° pela bissetriz do ângulo reto. Bloco 2: dois diâmetros perpendiculares (mediatriz de um diâmetro) e ligar as 4 pontas. Bloco 3: resposta pessoal.'],
        a, b, c)


def fluxograma_hexagono():
    a = bloco(1, 'O hexágono regular tem 6 ângulos centrais iguais. Quanto mede cada um? Circule.', item(regular(6, 50, 0), opcoes(['60°', '90°'])), '360° ÷ 6.') + bloco(
        2, 'Escreva a ordem dos passos (1, 2, 3, 4).', ordem([
            ['Traçar uma circunferência com o compasso.', '1'], ['Ligar os pontos em ordem.', ''],
            ['Marcar um ponto na circunferência.', ''], ['Com a mesma abertura, marcar 6 pontos seguidos.', '']])) + bloco(
        3, 'Siga os passos e construa o hexágono.', caixa_desenho('56mm'))
    b = bloco(1, 'Complete o fluxograma para construir um hexágono regular de lado L.', item(fluxo_vazio(5))) + bloco(
        2, 'Use o fluxograma com L = 3 cm.', caixa_desenho('56mm'))
    c = bloco(1, 'Escreva o algoritmo e o fluxograma para construir um hexágono regular usando o ângulo central de 60°, esquadros e compasso.', caixa_desenho('70mm')) + bloco(
        2, 'Para fazer um hexágono maior, o que muda no algoritmo?', linhas(1)) + bloco(
        3, 'Construa um hexágono regular de lado 4 cm.', caixa_desenho('70mm'))
    return h8(
        'fluxograma-do-hexagono-regular', 'Fluxograma do hexágono regular', 'EF08MA16',
        'Descrever por escrito e por fluxograma um algoritmo para construir um hexágono regular de qualquer área, a partir do ângulo central, com esquadros e compasso.',
        'Compasso, esquadros, transferidor, cartões de fluxograma.',
        ['Mostre que o ângulo central do hexágono mede 60°, e que os 6 triângulos são equiláteros.',
         'Construa no quadro, falando cada passo.',
         'Transforme os passos em fluxograma com repetição (marcar 6 pontos).',
         'Na versão C, o estudante generaliza para qualquer tamanho.'],
        ['Faça cada passo junto, segurando o compasso.',
         'Use sempre os mesmos nomes para os pontos (A, B, C...).',
         'Desafio: fazer uma rosácea a partir do hexágono.'],
        ['Bloco 1: 60°. Bloco 2: 1, 4, 2, 3. Bloco 3: hexágono construído.',
         'Bloco 1: traçar uma circunferência de raio L; marcar um ponto; com abertura L, marcar o próximo ponto; repetir até 6 pontos; ligar os pontos. Bloco 2: hexágono de lado 3 cm.',
         'Bloco 1: traçar a circunferência; traçar um raio; com o esquadro de 60°, traçar raios a cada 60°; marcar os 6 pontos; ligar. Bloco 2: só o raio da circunferência (igual ao lado). Bloco 3: hexágono construído.'],
        a, b, c)


def mediatriz_bissetriz_problemas():
    a = bloco(1, 'O ponto P está na dobra. Ele fica à mesma distância de A e de B? Circule.', item(segmento(True), opcoes(['sim', 'não']))) + bloco(
        2, 'Para ficar à mesma distância de duas ruas que se cruzam, fico na: Circule.', item(opcoes(['bissetriz', 'mediatriz'])))
    b = bloco(1, 'Onde construir um poço à mesma distância das casas A e B? Trace a mediatriz.', item(segmento())) + bloco(
        2, 'Ache o ponto que fica à mesma distância das três casas.', item(tres_casas()) + linhas(1))
    c = bloco(1, 'Ache o ponto que fica à mesma distância das três casas e explique como encontrou.', item(tres_casas()) + linhas(2)) + bloco(
        2, 'Um jardim fica no canto entre dois muros. Onde plantar uma árvore à mesma distância dos dois muros e a 3 m do canto? Desenhe (1 cm = 1 m).', caixa_desenho('46mm')) + bloco(
        3, 'Qual é a diferença entre a mediatriz e a bissetriz como lugares geométricos?', linhas(2))
    return h8(
        'mediatriz-e-bissetriz-em-problemas', 'Mediatriz e bissetriz em problemas', 'EF08MA17',
        'Aplicar os conceitos de mediatriz e bissetriz como lugares geométricos na resolução de problemas.',
        'Régua, compasso, mapas simples do bairro, barbante.',
        ['Meça com barbante: pontos da mediatriz ficam à mesma distância das duas pontas.',
         'Mostre que pontos da bissetriz ficam à mesma distância dos dois lados do ângulo.',
         'Resolva problemas de mapas: poço, antena, ponto de encontro.',
         'Na versão C, o estudante combina mediatrizes e bissetrizes.'],
        ['Use o barbante para conferir as distâncias.',
         'Pinte a mediatriz de uma cor e a bissetriz de outra em todas as fichas.',
         'Desafio: escolher o melhor lugar para a escola entre três bairros.'],
        ['Bloco 1: sim. Bloco 2: bissetriz.',
         'Bloco 1: na mediatriz do segmento AB. Bloco 2: no cruzamento das mediatrizes de AB, BC e AC.',
         'Bloco 1: no cruzamento das mediatrizes dos lados do triângulo formado pelas casas. Bloco 2: na bissetriz do ângulo dos muros, a 3 cm do canto no desenho. Bloco 3: a mediatriz reúne os pontos à mesma distância de dois pontos; a bissetriz, os pontos à mesma distância dos dois lados de um ângulo.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def areas_terrenos():
    a = bloco(1, 'Qual é a área? Circule.', grade([
        item(malha(5, 3, 26, pintadas=ret(0, 0, 5, 3)), cx('5 × 3') + opcoes(['15', '8'], certa='15'), exemplo=True),
        item(circulo_raio(), cx('3 × 3 × 3') + opcoes(['27', '9']))], 2), 'Para o círculo, use π ≈ 3: área ≈ 3 × raio × raio.') + bloco(
        2, 'Um terreno tem 10 m por 20 m. A área é: Circule.', item(opcoes(['200 m²', '30 m²'])))
    b = bloco(1, 'Calcule a área. Use π = 3,14.', grade([
        item(losango_med(), linhas(1)), item(circulo_raio(), linhas(1)), item(figura_medida('trapezio'), linhas(1))], 3)) + bloco(
        2, 'Um terreno retangular mede 12 m por 25 m. Qual é a área? Quanto custa a R$ 150 o metro quadrado?', linhas(2))
    c = bloco(1, 'Leia e resolva. Use π = 3,14.', probs([
        'Um terreno em forma de trapézio tem bases de 30 m e 20 m e altura de 18 m. Qual é a área?',
        'Uma praça circular tem 10 m de raio. Qual é a área?',
        'Um terreno de 20 m por 30 m tem uma piscina circular de 3 m de raio. Qual é a área sem a piscina?'], '16mm', 3)) + bloco(
        2, 'Elabore um problema sobre a área de um terreno e resolva.', linhas(2))
    return h8(
        'areas-de-terrenos', 'Áreas de terrenos', 'EF08MA19',
        'Resolver e elaborar problemas de área de quadriláteros, triângulos e círculos em situações como medir terrenos.',
        'Plantas de terrenos, anúncios de imóveis, calculadora, trena.',
        ['Meça a sala ou o pátio com a trena e calcule a área.',
         'Revise as expressões de área do retângulo, triângulo, trapézio, losango e círculo.',
         'Use anúncios reais: quanto custa o metro quadrado?',
         'Na versão C, o estudante combina figuras e cria um problema.'],
        ['Use o quadriculado para contar antes de usar a expressão.',
         'Mantenha um cartão com todas as expressões de área sobre a mesa.',
         'Desafio: comparar o preço do metro quadrado de dois anúncios.'],
        ['Bloco 1: 15; 27. Bloco 2: 200 m².',
         'Bloco 1: 24 cm²; 28,26 cm²; 15 cm². Bloco 2: 300 m²; R$ 45 000.',
         'Bloco 1: 450 m²; 314 m²; 600 − 28,26 = 571,74 m². Bloco 2: resposta pessoal.'],
        a, b, c)


def litro_dm3():
    a = bloco(1, 'Um cubo de 10 cm de aresta (1 dm³) cheio de água tem: Circule.', item(empilhado(1, 1, 1, 70), opcoes(['1 litro', '10 litros']))) + bloco(
        2, 'Uma caixa de 1 m³ guarda: Circule.', item(opcoes(['1 000 litros', '100 litros'])))
    b = bloco(1, 'Complete.', frases(['3 dm³ = ___ litros', '2,5 m³ = ___ litros', '500 mL = ___ dm³', '4 000 cm³ = ___ litros'])) + bloco(
        2, 'Uma caixa-d\'água tem 1,5 m³. Quantos litros ela guarda?', linhas(1))
    c = bloco(1, 'Leia e resolva.', probs([
        'Um aquário mede 60 cm × 30 cm × 40 cm. Quantos litros cabem?',
        'Uma casa gasta 15 m³ de água por mês. Quantos litros por dia, num mês de 30 dias?',
        'Uma garrafa de 2 litros enche quantos copos de 250 cm³?'], '16mm', 3)) + bloco(
        2, 'Explique por que 1 m³ = 1 000 litros.', linhas(2))
    return h8(
        'litro-e-decimetro-cubico', 'Litro, decímetro cúbico e metro cúbico', 'EF08MA20',
        'Reconhecer a relação entre litro e decímetro cúbico e entre litro e metro cúbico para resolver problemas de capacidade.',
        'Caixa de 10 cm × 10 cm × 10 cm, garrafa de 1 litro, conta de água.',
        ['Encha com água uma caixa de 10 cm de aresta: cabe 1 litro.',
         'Mostre que 1 m³ tem 1 000 caixas dessas.',
         'Leia uma conta de água: o consumo vem em metros cúbicos.',
         'Na versão C, o estudante converte medidas em problemas reais.'],
        ['Faça a experiência com água e a caixa de verdade.',
         'Deixe a tabela de equivalências sempre à vista.',
         'Desafio: calcular quantos litros de água a família gasta por dia.'],
        ['Bloco 1: 1 litro. Bloco 2: 1 000 litros.',
         'Bloco 1: 3; 2 500; 0,5; 4. Bloco 2: 1 500 litros.',
         'Bloco 1: 72 000 cm³ = 72 litros; 500 litros; 8 copos. Bloco 2: 1 m³ = 10 dm × 10 dm × 10 dm = 1 000 dm³, e cada dm³ é 1 litro.'],
        a, b, c)


def volume_recipientes():
    a = bloco(1, 'Quantos cubinhos cabem? Circule.', item(empilhado(4, 2, 2, 24), opcoes(['16', '8']))) + bloco(
        2, 'Uma caixa de 10 cm × 10 cm × 10 cm tem volume de: Circule.', item(opcoes(['1 000 cm³', '100 cm³'])))
    b = bloco(1, 'Complete.', tabela(['Recipiente', 'Medidas internas', 'Volume', 'Litros'], [
        ['caixa de leite', '6 cm × 9 cm × 18,5 cm', '', ''], ['aquário', '50 cm × 30 cm × 40 cm', '', ''], ['caixa-d\'água', '1 m × 1 m × 0,5 m', '', '']])) + bloco(
        2, 'O aquário de 50 cm × 30 cm × 40 cm está com água até 30 cm de altura. Quantos litros tem?', linhas(1))
    c = bloco(1, 'Leia e resolva.', probs([
        'Uma piscina de 10 m × 5 m × 1,6 m será cheia até 10 cm abaixo da borda. Quantos litros?',
        'Uma caixa de 2 m × 1 m × 1 m está cheia. Uma bomba tira 50 litros por minuto. Em quanto tempo esvazia?',
        'Quero uma caixa de 24 litros com base de 40 cm × 20 cm. Qual deve ser a altura?'], '16mm', 3)) + bloco(
        2, 'Elabore um problema sobre o volume de um recipiente e resolva.', linhas(2))
    return h8(
        'volume-de-recipientes', 'Volume de recipientes', 'EF08MA21',
        'Resolver e elaborar problemas de cálculo do volume de recipientes em forma de bloco retangular.',
        'Caixas de leite e de sapato, régua, água, copo medidor.',
        ['Meça uma caixa de leite e calcule o volume: dá quase 1 litro.',
         'Encha uma caixa com água pelo copo medidor e compare com o cálculo.',
         'Resolva problemas de piscinas, aquários e caixas-d\'água.',
         'Na versão C, o estudante calcula alturas e tempos de esvaziamento.'],
        ['Meça as caixas de verdade, com régua.',
         'Use sempre a ordem: comprimento, largura, altura, volume, litros.',
         'Desafio: projetar uma caixa com volume dado.'],
        ['Bloco 1: 16. Bloco 2: 1 000 cm³.',
         'Bloco 1: 999 cm³, cerca de 1 litro; 60 000 cm³, 60 litros; 0,5 m³, 500 litros. Bloco 2: 45 litros.',
         'Bloco 1: 75 m³ = 75 000 litros; 40 minutos (2 000 ÷ 50); 30 cm (24 000 ÷ 800). Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def espaco_amostral():
    a = bloco(1, 'Lanço uma moeda. O que pode sair? Circule.', item(opcoes(['cara ou coroa', 'só cara']))) + bloco(
        2, 'Qual é a chance de sair cara? Circule.', item(opcoes(['1/2', '1/4'])), '1 resultado bom em 2 possíveis.')
    b = bloco(1, 'Lance duas moedas. Complete o espaço amostral.', tabela(['', 'cara', 'coroa'], [['cara', 'cara, cara', ''], ['coroa', '', '']])) + bloco(
        2, 'Responda.', frases(['Quantos resultados possíveis?', 'P(duas caras) =', 'P(uma cara e uma coroa) =', 'Soma das probabilidades de todos os resultados:']))
    c = bloco(1, 'Lance dois dados. Complete com a soma.', tabela(['+', '1', '2', '3', '4', '5', '6'], [[str(i)] + [''] * 6 for i in range(1, 7)])) + bloco(
        2, 'Responda.', frases(['P(soma 7) =', 'P(soma 12) =', 'P(soma maior que 9) =', 'P(soma par) ='])) + bloco(
        3, 'Por que a soma das probabilidades de todos os resultados é 1?', linhas(1))
    return h8(
        'espaco-amostral-e-probabilidade', 'Espaço amostral e probabilidade', 'EF08MA22',
        'Calcular a probabilidade de eventos construindo o espaço amostral com o princípio multiplicativo e reconhecer que a soma das probabilidades de todos os resultados é 1.',
        'Moedas, dados, tabela de dupla entrada.',
        ['Liste todos os resultados de lançar duas moedas: são 2 × 2 = 4.',
         'Mostre a tabela de dupla entrada para dois dados: 6 × 6 = 36.',
         'Calcule probabilidades contando os resultados favoráveis.',
         'Na versão C, o estudante usa o espaço amostral de dois dados.'],
        ['Faça os lançamentos de verdade e anote.',
         'Use sempre a tabela de dupla entrada.',
         'Jogo: apostar numa soma e ver quem ganha mais vezes.'],
        ['Bloco 1: cara ou coroa. Bloco 2: 1/2.',
         'Bloco 1: cara, coroa; coroa, cara; coroa, coroa. Bloco 2: 4; 1/4; 2/4 = 1/2; 1.',
         'Bloco 1: tabela das somas de 2 a 12. Bloco 2: 6/36 = 1/6; 1/36; 6/36 = 1/6; 18/36 = 1/2. Bloco 3: porque sempre acontece um dos resultados.'],
        a, b, c)


def escolher_grafico():
    a = bloco(1, 'Este gráfico mostra a temperatura em cada dia da semana. Que tipo de gráfico é? Circule.',
              item(grafico_linha(['seg', 'ter', 'qua', 'qui', 'sex'], [20, 22, 19, 24, 23], 30, 5, 420, 170, '°'), opcoes(['gráfico de linha', 'gráfico de setores']))) + bloco(
        2, 'Para mostrar as partes de um todo (100%), uso o gráfico de: Circule.', item(opcoes(['setores', 'linha'])))
    b = bloco(1, 'Ligue os dados ao gráfico mais adequado.', ligar([
        ('Preço da gasolina em 12 meses', 'gráfico de setores'),
        ('Divisão do orçamento de uma família', 'gráfico de barras'),
        ('Número de estudantes de 5 escolas', 'gráfico de linha')])) + bloco(
        2, 'Por que o gráfico de setores não serve para a temperatura de cada dia?', linhas(2))
    c = bloco(1, 'Escolha o gráfico e justifique.', tabela(['Dados', 'Gráfico mais adequado', 'Por quê?'], [
        ['altura de 40 estudantes, em classes', '', ''], ['votos em 4 candidatos', '', ''],
        ['população do Brasil de 1950 a 2020', '', ''], ['partes do lixo de uma cidade (%)', '', '']])) + bloco(
        2, 'Um gráfico de barras começa o eixo em 90 em vez de 0. Que problema isso causa?', linhas(2)) + bloco(
        3, 'Faça na planilha dois gráficos diferentes para os mesmos dados. Qual comunica melhor? Por quê?', linhas(2))
    return h8(
        'escolher-o-grafico-adequado', 'Escolher o gráfico adequado', 'EF08MA23',
        'Avaliar a adequação de diferentes tipos de gráficos para representar os dados de uma pesquisa.',
        'Gráficos de jornais e sites, planilha eletrônica.',
        ['Mostre os mesmos dados em três gráficos diferentes e pergunte qual é mais claro.',
         'Combine regras: linha para variação no tempo, setores para partes de um todo, barras para comparar.',
         'Mostre gráficos enganosos (eixo que não começa no zero).',
         'Na versão C, o estudante escolhe, justifica e testa na planilha.'],
        ['Tenha um cartão com o desenho de cada tipo de gráfico.',
         'Use sempre a mesma pergunta: os dados mudam no tempo, são partes de um todo ou são comparações?',
         'Caça aos gráficos enganosos em notícias.'],
        ['Bloco 1: gráfico de linha. Bloco 2: setores.',
         'Bloco 1: gasolina com linha; orçamento com setores; escolas com barras. Bloco 2: as temperaturas não são partes de um todo; o que interessa é como mudam de um dia para outro.',
         'Bloco 1: histograma (barras juntas); barras ou setores; linha; setores. Bloco 2: as diferenças parecem muito maiores do que são. Bloco 3: resposta pessoal.'],
        a, b, c)


def classes_frequencia():
    a = bloco(1, 'Altura de 10 estudantes (cm): 140, 152, 148, 155, 143, 160, 150, 147, 158, 145. Separe em classes.', tabela(['Classe (cm)', 'Risquinhos', 'Quantos'], [
        ['140 a 149', '', ''], ['150 a 159', '', ''], ['160 a 169', '', '']])) + bloco(
        2, 'Qual classe tem mais estudantes? Circule.', item(opcoes(['140 a 149', '150 a 159'])))
    b = bloco(1, 'Minutos para chegar à escola de 20 estudantes: 5, 12, 8, 25, 15, 18, 7, 30, 22, 10, 14, 9, 27, 16, 11, 6, 20, 13, 24, 19.', tabela(['Classe (min)', 'Frequência'], [
        ['0 a 9', ''], ['10 a 19', ''], ['20 a 29', ''], ['30 a 39', '']])) + bloco(
        2, 'Quantos estudantes levam menos de 20 minutos?', linhas(1)) + bloco(
        3, 'Desenhe o histograma (barras juntas).', caixa_desenho('40mm'))
    c = bloco(1, 'Massa (kg) de 24 estudantes: 38, 42, 45, 51, 39, 47, 55, 60, 43, 49, 52, 41, 58, 46, 44, 50, 63, 40, 48, 53, 57, 36, 45, 62. Complete.', tabela(['Classe (kg)', 'Frequência', 'Porcentagem'], [
        ['35 a 39', '', ''], ['40 a 44', '', ''], ['45 a 49', '', ''], ['50 a 54', '', ''], ['55 a 59', '', ''], ['60 a 64', '', '']])) + bloco(
        2, 'E se as classes fossem de 2 em 2 kg? E de 20 em 20 kg? O que aconteceria?', linhas(2)) + bloco(
        3, 'A escola vai comprar uniformes em 3 tamanhos. Como as classes ajudam a decidir?', linhas(2))
    return h8(
        'classes-de-frequencia', 'Classes de frequência', 'EF08MA24',
        'Classificar as frequências de uma variável contínua em classes que resumam os dados de modo adequado para a tomada de decisões.',
        'Fita métrica, balança, planilha eletrônica.',
        ['Meça a altura da turma e anote no quadro.',
         'Mostre que, com muitos valores diferentes, agrupar em classes ajuda a ler os dados.',
         'Monte a tabela de frequências e o histograma.',
         'Na versão C, o estudante escolhe o tamanho das classes e usa porcentagem.'],
        ['Use risquinhos para contar os valores de cada classe.',
         'Mantenha as classes sempre do menor para o maior.',
         'Desafio: decidir o melhor tamanho de classe para os dados da turma.'],
        ['Bloco 1: 5; 4; 1. Bloco 2: 140 a 149.',
         'Bloco 1: 5; 9; 5; 1. Bloco 2: 14. Bloco 3: histograma com as quatro classes.',
         'Bloco 1: 3 (12,5%); 5 (20,8%); 6 (25%); 4 (16,7%); 3 (12,5%); 3 (12,5%). Bloco 2: de 2 em 2 ficariam muitas classes com poucos dados; de 20 em 20, poucas classes que escondem as diferenças. Bloco 3: mostram quantos estudantes há em cada faixa de tamanho.'],
        a, b, c)


def media_moda_mediana():
    a = bloco(1, 'Notas: 5, 7, 7, 8, 9. Circule.', grade([
        item(cx('Nota que mais aparece (moda)'), opcoes(['7', '9'])),
        item(cx('Nota do meio (mediana)'), opcoes(['7', '8'])),
        item(cx('Média: 36 ÷ 5'), opcoes(['7,2', '36']))], 1))
    b = bloco(1, 'Idades de um grupo: 12, 13, 13, 14, 15, 13, 16, 14.', frases(['Em ordem:', 'Média:', 'Moda:', 'Mediana:', 'Amplitude:'])) + bloco(
        2, 'Qual medida representa melhor a idade típica do grupo? Por quê?', linhas(2))
    c = bloco(1, 'Salários numa empresa: R$ 1 500 (5 pessoas), R$ 2 000 (3 pessoas), R$ 3 000 (1 pessoa) e R$ 15 000 (1 pessoa).', frases(['Média:', 'Moda:', 'Mediana:', 'Amplitude:'])) + bloco(
        2, 'Qual medida um sindicato usaria para mostrar que os salários são baixos? E o dono da empresa, para dizer que são altos? Por quê?', linhas(2)) + bloco(
        3, 'Os grupos A (9, 10, 11) e B (1, 10, 19) têm média 10. Compare as amplitudes. O que isso diz?', linhas(2))
    return h8(
        'media-moda-e-mediana', 'Média, moda e mediana', 'EF08MA25',
        'Obter média, moda e mediana de uma pesquisa, compreendendo seus significados, e relacioná-las com a dispersão dos dados indicada pela amplitude.',
        'Cartões com números, dados da turma, calculadora.',
        ['Peça que os estudantes se ordenem por idade ou altura: quem fica no meio é a mediana.',
         'Conte qual valor aparece mais: é a moda.',
         'Calcule a média e compare as três medidas.',
         'Na versão C, o estudante analisa um conjunto com valor extremo.'],
        ['Use cartões com os números para ordenar fisicamente.',
         'Siga sempre a mesma ordem: ordenar, moda, mediana, média, amplitude.',
         'Pesquisa relâmpago na turma e cálculo em dupla.'],
        ['Bloco 1: 7; 7; 7,2.',
         'Bloco 1: 12, 13, 13, 13, 14, 14, 15, 16; 13,75; 13; 13,5; 4. Bloco 2: moda ou mediana, porque estão no centro dos dados.',
         'Bloco 1: R$ 3 150; R$ 1 500; R$ 1 750; R$ 13 500. Bloco 2: o sindicato usaria a moda ou a mediana; o dono, a média, puxada pelo salário de R$ 15 000. Bloco 3: A tem amplitude 2 e B tem 18; em B os dados são muito mais espalhados.'],
        a, b, c)


def tipos_amostra():
    a = bloco(1, 'Para saber se a sopa está salgada, eu provo: Circule.', item(opcoes(['uma colherada', 'a panela toda'])), 'Uma parte pode representar o todo.') + bloco(
        2, 'Sortear 5 nomes de um saco com os nomes de toda a turma é: Circule.', item(opcoes(['uma amostra', 'um censo'])))
    b = bloco(1, 'Ligue cada jeito de escolher ao tipo de amostra.', ligar([
        ('Sortear 50 números da lista de estudantes', 'amostra estratificada'),
        ('Escolher 1 a cada 10 pessoas da fila', 'amostra casual simples'),
        ('Escolher estudantes de cada ano, na proporção de cada ano', 'amostra sistemática')])) + bloco(
        2, 'Dê uma razão para fazer amostra em vez de censo.', frases(['Razão econômica:', 'Razão física (o teste destrói):', 'Razão ética:']))
    c = bloco(1, 'Uma escola tem 300 estudantes: 90 no 6º ano, 80 no 7º, 70 no 8º e 60 no 9º. Monte uma amostra estratificada de 30.', tabela(['Ano', '6º', '7º', '8º', '9º'], [['Estudantes na amostra', '', '', '', '']])) + bloco(
        2, 'Como você faria uma amostra sistemática de 30 estudantes entre os 300?', linhas(2)) + bloco(
        3, 'Uma pesquisa sobre transporte público entrevistou só pessoas na saída de um shopping. Que problema essa amostra tem?', linhas(2))
    return h8(
        'tipos-de-amostra', 'Tipos de amostra', 'EF08MA26',
        'Selecionar razões econômicas, físicas ou éticas que justificam pesquisas amostrais e reconhecer amostras casual simples, sistemática e estratificada.',
        'Lista da turma, papéis para sorteio, notícias com pesquisas.',
        ['Prove uma colherada de sopa: é uma amostra.',
         'Faça os três tipos de amostra com a lista da turma: sorteio, de 3 em 3 e por grupos.',
         'Discuta quando o censo é caro, impossível ou não é ético.',
         'Na versão C, o estudante calcula a amostra estratificada e encontra viés.'],
        ['Faça o sorteio de verdade com papéis.',
         'Use os três nomes de amostra escritos em cartões fixos.',
         'Desafio: achar o problema numa pesquisa de notícia.'],
        ['Bloco 1: uma colherada. Bloco 2: uma amostra.',
         'Bloco 1: sortear com casual simples; 1 a cada 10 com sistemática; por ano com estratificada. Bloco 2: censo é mais caro e demorado; testar a resistência de todos os capacetes destruiria todos; não é certo testar um remédio novo em toda a população.',
         'Bloco 1: 9, 8, 7, 6. Bloco 2: numerar de 1 a 300, sortear um número de 1 a 10 e pegar de 10 em 10 a partir dele. Bloco 3: não representa a população; quem está no shopping pode usar menos transporte público.'],
        a, b, c)


def pesquisa_relatorio():
    a = bloco(1, 'Sorteie 10 colegas e pergunte: quantos irmãos você tem?', tabela(['Colega'] + [str(i) for i in range(1, 11)], [['Irmãos'] + [''] * 10])) + bloco(
        2, 'Qual número apareceu mais vezes?', linhas(1)) + bloco(
        3, 'Faça um gráfico de barras com as respostas.', caixa_desenho('44mm'))
    b = bloco(1, 'Planeje a pesquisa.', tabela(['Etapa', 'O que vou fazer'], [
        ['tema e pergunta', ''], ['população', ''], ['técnica de amostragem', ''], ['tamanho da amostra', '']])) + bloco(
        2, 'Resultados.', frases(['Média:', 'Moda:', 'Mediana:', 'Amplitude:'])) + bloco(
        3, 'Faça o gráfico mais adequado.', caixa_desenho('38mm'))
    c = bloco(1, 'Planeje a pesquisa.', tabela(['Etapa', 'O que vou fazer'], [
        ['tema e pergunta', ''], ['população e amostra', ''], ['técnica de amostragem e por quê', ''], ['como coletar e organizar (planilha)', ''], ['gráfico escolhido e por quê', '']])) + bloco(
        2, 'Escreva o relatório: introdução, método, resultados (medidas e gráfico) e conclusão.', linhas(6)) + bloco(
        3, 'Que limitação a sua pesquisa tem?', linhas(2))
    return h8(
        'pesquisa-amostral-e-relatorio', 'Pesquisa amostral e relatório', 'EF08MA27',
        'Planejar e executar pesquisa amostral com técnica de amostragem adequada e escrever relatório com gráficos, medidas de tendência central, amplitude e conclusões.',
        'Formulário, planilha eletrônica, lista de estudantes para sorteio.',
        ['Escolha com a turma um tema próximo (lanche, sono, uso do celular).',
         'Defina a amostra e a técnica de amostragem.',
         'Colete, organize na planilha e calcule as medidas.',
         'Na versão C, o estudante escreve o relatório completo.'],
        ['Faça a pesquisa na própria escola, com perguntas curtas.',
         'Use o mesmo roteiro de etapas, uma por aula.',
         'Divida o trabalho em tarefas curtas e bem definidas.'],
        ['Bloco 1: respostas da turma. Bloco 2: a moda. Bloco 3: gráfico de barras.',
         'Bloco 1: plano pessoal. Bloco 2: medidas calculadas com os dados. Bloco 3: gráfico escolhido.',
         'Bloco 1: plano pessoal. Bloco 2: relatório pessoal. Bloco 3: por exemplo amostra pequena ou perguntas pouco claras.'],
        a, b, c)


FICHAS = [potencias_notacao, raiz_potencia, principio_multiplicativo, porcentagem_tecnologia, dizimas,
          equacao_reta, sistemas_dia_a_dia, sequencia_nao_recursiva, sequencia_recursiva_fluxo, grandezas_variacao, problemas_proporcionais,
          construcoes_geometricas, fluxograma_hexagono, mediatriz_bissetriz_problemas,
          areas_terrenos, litro_dm3, volume_recipientes,
          espaco_amostral, escolher_grafico, classes_frequencia, media_moda_mediana, tipos_amostra, pesquisa_relatorio]
