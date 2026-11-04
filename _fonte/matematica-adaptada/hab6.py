"""6º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import grupo, svg  # noqa: F401
from desenhos2 import barra_fracao, grafico_barras, grafico_linha, malha, pizza_fracao, poligono_svg, pote, regular, roleta, solido
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, problema, resposta, tabela
from ano3 import frases, ligar
from ano4 import n, reta_fracao
from ano5 import empilhado
from ano6 import CASA, angulo2, fluxo_par, fluxo_vazio, planta, retas, transferidor
from hab3 import cx, fila_h, pilha, probs, rot


def h6(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='40 a 50 minutos'):
    return ficha(slug, titulo, '6º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ret(x, y, c, l):
    return [(i, j) for i in range(x, x + c) for j in range(y, y + l)]


def ordens(cab, linha):
    return tabela(cab, [linha])


TRI_EQ = regular(3, 36, rotulo='triângulo equilátero')
TRI_RET = poligono_svg([(4, 4), (4, 74), (94, 74)], rotulo='triângulo retângulo')
TRI_ESC = poligono_svg([(4, 70), (110, 70), (30, 8)], rotulo='triângulo escaleno')
TRI_ISO = poligono_svg([(4, 74), (84, 74), (44, 4)], rotulo='triângulo isósceles')
TRI_OBT = poligono_svg([(4, 50), (120, 50), (20, 8)], rotulo='triângulo obtusângulo')
QUAD = regular(4, 34, -45, rotulo='quadrado')
RET = poligono_svg([(4, 14), (104, 14), (104, 64), (4, 64)], rotulo='retângulo')
LOS = poligono_svg([(50, 4), (96, 44), (50, 84), (4, 44)], rotulo='losango')
PARAL = poligono_svg([(30, 8), (112, 8), (86, 64), (4, 64)], rotulo='paralelogramo')
TRAP = poligono_svg([(24, 10), (80, 10), (104, 64), (4, 64)], rotulo='trapézio')
PENT = regular(5, 34, rotulo='pentágono regular')
HEX = regular(6, 34, 0, rotulo='hexágono regular')
IRREG = poligono_svg([(4, 60), (40, 4), (100, 20), (110, 70), (50, 84)], rotulo='pentágono não regular')


# ---------- Números ----------

def naturais_decimais_reta():
    a = bloco(1, 'Qual número está marcado? Circule.', grade([
        item(reta_fracao(10, {4: '?'}, 460, ini='2', fim='3'), opcoes(['2,4', '4'], certa='2,4'), exemplo=True),
        item(reta_fracao(10, {7: '?'}, 460, ini='5', fim='6'), opcoes(['5,7', '7,5']))], 1), 'Cada pedacinho vale 0,1.') + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes(['3,5', '3,25'])), item(opcoes([n(12001), n(12100)]))], 2))
    b = bloco(1, 'Escreva &gt;, &lt; ou =.', grade([item(cx(f'4,5 {resposta("&gt;")} 4,05'), exemplo=True), item(cx(f'0,8 {VAZIO} 0,80')),
                                                item(cx(f'{n(103450)} {VAZIO} {n(130450)}')), item(cx(f'2,09 {VAZIO} 2,1'))], 2)) + bloco(
        2, 'Marque na reta: 1,2; 1,75; 2,5.', item(reta_fracao(20, None, 520, ini='1', fim='3'))) + bloco(
        3, 'Escreva por extenso: 3,45.', linhas(1))
    c = bloco(1, 'Ordene do menor para o maior.', frases(['1,08; 1,8; 1,008; 0,98; 1,1:', f'{n(2500000)}; {n(250000)}; {n(2050000)}:'])) + bloco(
        2, 'Escreva um número entre 2,3 e 2,4 e outro entre 2,35 e 2,36.', linhas(1)) + bloco(
        3, 'Ana diz que 0,125 é maior que 0,5 porque tem mais algarismos. Ela está certa? Explique.', linhas(2))
    return h6(
        'comparar-naturais-e-decimais-na-reta', 'Comparar naturais e decimais na reta', 'EF06MA01',
        'Ler, escrever, comparar e ordenar números naturais e decimais finitos, usando a reta numérica.',
        'Reta numérica grande, fita métrica, preços de folhetos de mercado.',
        ['Mostre a fita métrica: entre 1 m e 2 m há 10 decímetros e 100 centímetros.',
         'Marque decimais na reta com a turma, dividindo cada intervalo em 10.',
         'Compare decimais completando com zeros: 0,5 = 0,50 = 0,500.',
         'Na versão C, o estudante ordena, cria números entre outros e explica um erro comum.'],
        ['Use preços em reais: R$ 3,50 e R$ 3,25 deixam a comparação concreta.',
         'Use sempre a reta com 10 pedaços e o mesmo jeito de ler a vírgula.',
         'Desafio rápido: quem acha um número entre dois decimais dados.'],
        [f'Bloco 1: 2,4; 5,7. Bloco 2: 3,5; {n(12100)}.',
         'Bloco 1: &gt;; =; &lt;; &lt;. Bloco 2: cada traço vale 0,1; 1,2 no 2º traço, 1,75 no meio entre o 7º e o 8º, 2,5 no 15º. Bloco 3: três inteiros e quarenta e cinco centésimos.',
         f'Bloco 1: 0,98; 1,008; 1,08; 1,1; 1,8; {n(250000)}; {n(2050000)}; {n(2500000)}. Bloco 2: por exemplo 2,35 e 2,355. Bloco 3: não; 0,5 = 0,500, que é maior que 0,125.'],
        a, b, c)


def sistema_decimal():
    a = bloco(1, 'Quanto vale o 3 em cada número? Circule.', grade([
        item(cx('<b>3</b>52'), opcoes([300, 3], certa=300), exemplo=True), item(cx('4<b>3</b>7'), opcoes([30, 3])), item(cx('2,<b>3</b>'), opcoes(['0,3', '3']))], 3),
        'A posição muda o valor do algarismo.') + bloco(
        2, 'Em romanos, X vale: Circule.', item(opcoes([10, 5])))
    b = bloco(1, 'Decomponha.', frases([f'{n(45208)} =', '37,46 =', f'{n(100050)} ='])) + bloco(
        2, 'Escreva em algarismos indo-arábicos.', frases(['XIV =', 'XXIX =', 'CXL ='])) + bloco(
        3, 'Para que serve o zero em 405?', linhas(1))
    c = bloco(1, 'Compare o nosso sistema com o romano.', tabela(['Característica', 'Decimal (o nosso)', 'Romano'], [['Tem zero?', '', ''], ['O valor depende da posição?', '', ''], ['Agrupa de quantos em quantos?', '', '']])) + bloco(
        2, 'Escreva 2026 em números romanos e explique por que somar é mais difícil nesse sistema.', linhas(2)) + bloco(
        3, f'Escreva {n(5030,)} e 50,03 decompostos e diga o que cada zero indica.', linhas(2))
    return h6(
        'sistema-de-numeracao-decimal', 'Sistema de numeração decimal', 'EF06MA02',
        'Reconhecer as características do sistema decimal (base 10, valor posicional e zero) e compará-lo com outros sistemas, como o romano.',
        'Quadro de ordens, material dourado, relógio ou livro com números romanos.',
        ['Mostre um relógio com números romanos e pergunte como se lê.',
         'Compare: no romano não há zero e o valor não depende só da posição.',
         'Decomponha números naturais e decimais no quadro de ordens.',
         'Na versão C, o estudante compara os sistemas e explica o papel do zero.'],
        ['Use o quadro de ordens com cores fixas e o material dourado para trocar 10 por 1.',
         'Monte uma tabela fixa com os símbolos romanos (I, V, X, L, C, D, M).',
         'Desafio: escrever a data de nascimento em romanos.'],
        ['Bloco 1: 300; 30; 0,3. Bloco 2: 10.',
         f'Bloco 1: 40 000 + 5 000 + 200 + 8; 30 + 7 + 0,4 + 0,06; 100 000 + 50. Bloco 2: 14; 29; 140. Bloco 3: mostra que não há dezenas.',
         'Bloco 1: decimal tem zero, romano não; decimal sim, romano não (soma e subtrai símbolos); decimal de 10 em 10. Bloco 2: MMXXVI; não há valor posicional nem zero para alinhar as ordens. Bloco 3: 5 000 + 30 (sem centenas nem unidades); 50 + 0,03 (sem unidades nem décimos).'],
        a, b, c)


def calculos_estrategias():
    a = bloco(1, 'Calcule de cabeça. Circule.', grade([
        item(cx('99 + 45 = 100 + 44'), opcoes([144, 154], certa=144), exemplo=True), item(cx('25 × 4'), opcoes([100, 29])), item(cx('200 – 98'), opcoes([102, 98]))], 3),
        'Arredonde para um número fácil e ajuste.') + bloco(
        2, 'Qual conta dá cerca de 600? Circule.', item(opcoes(['198 + 405', '98 + 105'])))
    b = bloco(1, 'Calcule do jeito mais fácil e explique.', frases(['48 × 5 =', '397 + 286 =', '1 000 – 437 ='])) + bloco(
        2, 'Leia e resolva. Confira na calculadora.', probs([f'Uma escola tem 24 turmas de 31 estudantes. Quantos estudantes?', f'Uma loja tinha {n(1250)} camisetas e vendeu {n(876)}. Quantas restam?']))
    c = bloco(1, 'Leia e resolva.', grade([
        problema(f'Um evento teve {n(3480)} pessoas no sábado e {n(2975)} no domingo. Cada ingresso custou R$ 12. Quanto foi arrecadado?', '20mm'),
        problema(f'Um carro faz 12 km com 1 litro. Quantos litros para viajar {n(1500)} km? Estime antes.', '20mm')], 2)) + bloco(
        2, 'Invente um problema com uma multiplicação e uma subtração. Resolva de dois jeitos.', linhas(3))
    return h6(
        'calculos-com-estrategias-variadas', 'Cálculos com estratégias variadas', 'EF06MA03',
        'Resolver problemas com números naturais usando cálculo mental, escrito, exato ou aproximado, com e sem calculadora.',
        'Calculadora, folhetos de mercado, quadro para registrar estratégias.',
        ['Proponha uma conta e peça três jeitos diferentes de resolver.',
         'Registre no quadro as estratégias da turma (arredondar, decompor, compensar).',
         'Use a calculadora para conferir, não para começar.',
         'Na versão C, o estudante resolve problemas de várias etapas e cria um.'],
        ['Mostre uma estratégia por vez com exemplo resolvido ao lado.',
         'Deixe um cartaz fixo com as estratégias, sempre na mesma ordem.',
         'Corrida de cálculo mental curta, com pausa entre as rodadas.'],
        ['Bloco 1: 144; 100; 102. Bloco 2: 198 + 405.',
         f'Bloco 1: 240 (metade de 48 × 10); 683; 563. Bloco 2: 744; 374.',
         f'Bloco 1: R$ {n(77460)}; 125 litros. Bloco 2: resposta pessoal.'],
        a, b, c)


def algoritmo_fluxograma():
    a = bloco(1, 'Siga o fluxograma com o dedo. O que ele diz? Circule.', item(fluxo_par()) + grade([
        item(cx('26'), opcoes(['par', 'ímpar'], certa='par'), exemplo=True), item(cx('13'), opcoes(['par', 'ímpar'])), item(cx('100'), opcoes(['par', 'ímpar']))], 3))
    b = bloco(1, 'Escreva os passos (algoritmo) para saber se um número é múltiplo de 10.', linhas(3)) + bloco(
        2, 'Agora complete o fluxograma com esses passos.', fluxo_vazio(4))
    c = bloco(1, 'Escreva um algoritmo, em passos numerados, para descobrir se um ano tem a soma dos algarismos par.', linhas(3)) + bloco(
        2, 'Desenhe o fluxograma do seu algoritmo, com início, pergunta (losango) e fim.', caixa_desenho('50mm')) + bloco(
        3, 'Teste com 2026. O que seu fluxograma responde?', linhas(1))
    return h6(
        'algoritmo-e-fluxograma', 'Algoritmo e fluxograma', 'EF06MA04',
        'Escrever um algoritmo em linguagem natural e representá-lo por fluxograma para resolver um problema simples, como saber se um número é par.',
        'Cartões de fluxograma (início, caixa, losango, fim), setas de papel, quadro.',
        ['Mostre um algoritmo do dia a dia: escovar os dentes em passos numerados.',
         'Siga o fluxograma do par ou ímpar com vários números.',
         'Monte um fluxograma novo com cartões antes de desenhar.',
         'Na versão C, o estudante cria, desenha e testa o próprio fluxograma.'],
        ['Use poucos passos e siga com o dedo. Cores fixas: início verde, pergunta amarela.',
         'Algoritmos são previsíveis e costumam agradar. Ligue com programação, se a turma conhece.',
         'Montar o fluxograma com cartões no chão dá movimento.'],
        ['Bloco 1: par; ímpar; par.',
         'Bloco 1: 1) olhe o último algarismo; 2) se for 0, é múltiplo de 10; 3) se não, não é. Bloco 2: início, olhe o último algarismo, é 0?, sim: múltiplo de 10 / não: não é.',
         'Bloco 1 e 2: resposta pessoal (some os algarismos; o resultado termina em 0, 2, 4, 6 ou 8?). Bloco 3: 2 + 0 + 2 + 6 = 10, par.'],
        a, b, c)


def primos_divisibilidade():
    a = bloco(1, 'Dá para dividir em grupos de 2 sem sobrar? Circule.', grade([
        item(grupo('bola', 8, 8, 26), opcoes(['sim', 'não'], certa='sim'), exemplo=True), item(grupo('bola', 7, 7, 26), opcoes(['sim', 'não']))], 1),
        'Número par termina em 0, 2, 4, 6 ou 8.') + bloco(
        2, 'O 15 é divisível por 5? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Marque com X.', tabela(['Número', 'por 2', 'por 3', 'por 5', 'por 10'], [['30', 'X', 'X', 'X', 'X'], ['45', '', '', '', ''], ['72', '', '', '', ''], ['100', '', '', '', '']]),
              'A primeira linha é o exemplo. Por 3: some os algarismos.') + bloco(
        2, 'Pinte os números primos (só dividem por 1 e por ele mesmo).', grade([item(cx(str(x))) for x in (2, 4, 7, 9, 11, 15, 17, 21)], 4))
    c = bloco(1, 'Responda e justifique.', frases(['O 126 é divisível por 6?', 'O 1 236 é divisível por 4?', 'O 5 004 é divisível por 9?'])) + bloco(
        2, 'Escreva todos os divisores de 36. Ele é primo ou composto?', linhas(1)) + bloco(
        3, 'Complete com "é múltiplo de", "é divisor de" ou "é fator de".', frases(['48 ___ 6', '7 ___ 49']))
    return h6(
        'primos-compostos-e-divisibilidade', 'Primos, compostos e divisibilidade', 'EF06MA05',
        'Classificar números em primos e compostos, usar as ideias de múltiplo, divisor e fator e investigar critérios de divisibilidade.',
        'Fichas ou tampinhas para formar retângulos, tabela de 1 a 100, calculadora.',
        ['Peça para formar retângulos com 12 fichas: 1 × 12, 2 × 6, 3 × 4. Esses são os divisores.',
         'Tente com 7 fichas: só uma fila. O 7 é primo.',
         'Investigue os critérios com a calculadora: o que os múltiplos de 3 têm em comum?',
         'Na versão C, o estudante justifica critérios e usa o vocabulário.'],
        ['Use as fichas e grupos de 2 e de 5 primeiro, que são visíveis.',
         'Deixe um cartaz com os critérios em ordem fixa (2, 3, 5, 10).',
         'Crivo de Eratóstenes na tabela de 100 em dupla, com lápis de cor.'],
        ['Bloco 1: sim; não. Bloco 2: sim.',
         'Bloco 1: 45 por 3 e 5; 72 por 2 e 3; 100 por 2, 5 e 10. Bloco 2: 2, 7, 11, 17.',
         'Bloco 1: sim (par e soma 9); sim (36 é múltiplo de 4); sim (soma 9). Bloco 2: 1, 2, 3, 4, 6, 9, 12, 18, 36; composto. Bloco 3: é múltiplo de; é divisor de (ou fator de).'],
        a, b, c)


def problemas_multiplos_divisores():
    a = bloco(1, 'Quero 12 doces em pacotes iguais, sem sobrar. Dá para fazer pacotes de 4? Circule.', grade([
        item(grupo('estrela', 12, 4, 26), opcoes(['sim', 'não'], certa='sim'), exemplo=True)], 1)) + bloco(
        2, 'E pacotes de 5? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Leia e resolva.', probs(['Um ônibus passa a cada 15 min, a partir das 7h. Ele passa às 8h? E às 8h20?',
                                           'Tenho 24 lápis e 18 borrachas. Quero kits iguais, sem sobrar. Qual o maior número de kits?'])) + bloco(
        2, 'Escreva os 6 primeiros múltiplos de 4 e de 6. Qual é o menor comum (sem o zero)?', linhas(2))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Dois faróis piscam: um a cada 8 s e outro a cada 12 s. Piscaram juntos agora. Daqui a quanto tempo piscam juntos de novo?', '18mm'),
        problema('Uma fita de 60 cm e outra de 84 cm vão ser cortadas em pedaços iguais, do maior tamanho possível. Qual o tamanho?', '18mm')], 2)) + bloco(
        2, 'Invente um problema de múltiplo e outro de divisor.', linhas(2))
    return h6(
        'problemas-com-multiplos-e-divisores', 'Problemas com múltiplos e divisores', 'EF06MA06',
        'Resolver e criar problemas com as ideias de múltiplo e de divisor, como encontros que se repetem e divisões sem sobra.',
        'Fichas, relógio, calendário, fitas de papel.',
        ['Pergunte: de quantos jeitos dá para dividir 24 balas em pacotes iguais?',
         'Liste múltiplos para descobrir quando dois eventos acontecem juntos.',
         'Liste divisores para descobrir o maior pacote possível.',
         'Na versão C, o estudante resolve problemas de encontro e de corte e cria os seus.'],
        ['Use fichas para montar os pacotes. Números pequenos.',
         'Deixe claro: "quando acontece de novo" pede múltiplo; "maior pedaço" pede divisor.',
         'Problema com os horários reais do intervalo e das aulas.'],
        ['Bloco 1: sim. Bloco 2: não.',
         'Bloco 1: às 8h sim, às 8h20 não; 6 kits. Bloco 2: 4, 8, 12, 16, 20, 24 e 6, 12, 18, 24, 30, 36; 12.',
         'Bloco 1: 24 s; 12 cm. Bloco 2: resposta pessoal.'],
        a, b, c)


def fracoes_comparar():
    a = bloco(1, 'Qual fração é maior? Circule.', grade([
        item(pilha(barra_fracao(4, 3, 220, 28), barra_fracao(4, 1, 220, 28)), opcoes(['3/4', '1/4'], certa='3/4'), exemplo=True),
        item(pilha(barra_fracao(2, 1, 220, 28), barra_fracao(8, 2, 220, 28)), opcoes(['1/2', '2/8']))], 2), 'Compare o tamanho pintado.') + bloco(
        2, '6 ÷ 3 pode ser escrito como: Circule.', item(opcoes(['6/3', '3/6'])))
    b = bloco(1, 'Escreva &gt;, &lt; ou =.', grade([item(cx(f'2/3 {resposta("&gt;")} 2/5'), exemplo=True), item(cx(f'3/8 {VAZIO} 5/8')),
                                                item(cx(f'1/2 {VAZIO} 4/8')), item(cx(f'5/6 {VAZIO} 2/3'))], 2)) + bloco(
        2, 'Ordene do menor para o maior: 1/2, 1/3, 3/4, 1/6.', linhas(1)) + bloco(
        3, '3 pizzas para 4 pessoas. Que fração cada uma recebe?', linhas(1))
    c = bloco(1, 'Ordene do maior para o menor: 7/12, 2/3, 1/2, 5/6.', linhas(1)) + bloco(
        2, 'Escreva duas frações equivalentes a 4/10 e simplifique 18/24.', linhas(1)) + bloco(
        3, 'Leia e resolva.', problema('Leo comeu 3/8 de uma torta e Bia comeu 1/3 da mesma torta. Quem comeu mais? Explique.', '18mm'))
    return h6(
        'comparar-e-ordenar-fracoes', 'Comparar e ordenar frações', 'EF06MA07',
        'Comparar e ordenar frações como partes do inteiro e como resultado de divisão, reconhecendo frações equivalentes.',
        'Barras de frações, tiras de papel para dobrar, pizzas de papel.',
        ['Compare barras do mesmo tamanho divididas de formas diferentes.',
         'Mostre: com o mesmo denominador, compara o numerador; com o mesmo numerador, menos partes é maior.',
         'Use frações equivalentes para igualar os denominadores.',
         'Na versão C, o estudante ordena, simplifica e justifica.'],
        ['Use as barras lado a lado, sempre do mesmo tamanho.',
         'Ensine uma regra por vez, com um cartaz fixo.',
         'Jogo de cartas: quem tem a fração maior leva.'],
        ['Bloco 1: 3/4; 1/2. Bloco 2: 6/3.',
         'Bloco 1: &gt;; &lt;; =; &gt;. Bloco 2: 1/6, 1/3, 1/2, 3/4. Bloco 3: 3/4.',
         'Bloco 1: 5/6, 2/3, 7/12, 1/2. Bloco 2: por exemplo 2/5 e 8/20; 3/4. Bloco 3: Leo (9/24 &gt; 8/24).'],
        a, b, c)


def fracao_decimal():
    a = bloco(1, 'Ligue cada fração ao decimal.', ligar([('1/2', '0,25'), ('1/4', '0,1'), ('1/10', '0,5')]), 'Pense em dinheiro: 1/2 real são 50 centavos.') + bloco(
        2, '3/10 é igual a: Circule.', item(opcoes(['0,3', '3,10'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Fração', 'Decimal'], [['7/10', '0,7'], ['25/100', ''], ['', '0,6'], ['3/4', ''], ['1/5', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Marque na reta: 1/4, 0,5 e 3/4.', item(reta_fracao(4, None, 480)))
    c = bloco(1, 'Escreva como decimal e como porcentagem.', frases(['3/5 =', '7/20 =', '9/25 ='])) + bloco(
        2, 'Escreva como fração irredutível.', frases(['0,8 =', '0,125 =', '1,5 ='])) + bloco(
        3, 'Por que 1/3 não tem um decimal que acaba? Use a calculadora para investigar.', linhas(2))
    return h6(
        'fracao-e-decimal-sao-o-mesmo-numero', 'Fração e decimal: o mesmo número', 'EF06MA08',
        'Passar de fração para decimal e de decimal para fração e localizar esses números na reta.',
        'Moedas e cédulas de brincadeira, calculadora, reta numérica.',
        ['Mostre que 1/2 real, 0,5 real e 50 centavos são iguais.',
         'Divida na calculadora: 3 ÷ 4 = 0,75.',
         'Coloque frações e decimais na mesma reta.',
         'Na versão C, o estudante converte, simplifica e investiga dízimas.'],
        ['Use dinheiro para 1/2, 1/4 e 1/10. Uma conversão por vez.',
         'Use uma tabela fixa de pares conhecidos (1/2 = 0,5; 1/4 = 0,25).',
         'Bingo de fração e decimal.'],
        ['Bloco 1: 1/2 com 0,5; 1/4 com 0,25; 1/10 com 0,1. Bloco 2: 0,3.',
         'Bloco 1: 0,25; 6/10; 0,75; 0,2. Bloco 2: 1/4 no 1º traço, 0,5 no meio, 3/4 no 3º traço.',
         'Bloco 1: 0,6 e 60%; 0,35 e 35%; 0,36 e 36%. Bloco 2: 4/5; 1/8; 3/2. Bloco 3: 1 ÷ 3 sempre sobra 1, então o 3 se repete.'],
        a, b, c)


def fracao_de_quantidade():
    a = bloco(1, 'Quanto é a metade? Circule.', grade([
        item(grupo('maca', 8, 4, 28), '<p class="legenda">1/2 de 8</p>' + opcoes([4, 2], certa=4), exemplo=True),
        item(grupo('estrela', 9, 3, 28), '<p class="legenda">1/3 de 9</p>' + opcoes([3, 6]))], 2), 'Divida em grupos iguais.') + bloco(
        2, '1/4 de 20 é: Circule.', item(opcoes([5, 4])))
    b = bloco(1, 'Calcule.', frases(['2/3 de 18 =', '3/4 de 40 =', '2/5 de 30 =', '5/6 de 60 ='])) + bloco(
        2, 'Leia e resolva.', probs(['Uma turma tem 32 estudantes e 3/8 são meninos. Quantos meninos?', 'Paguei 2/5 de uma conta de R$ 150. Quanto paguei?']))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Um livro tem 240 páginas. Li 1/4 na segunda e 1/3 na terça. Quantas páginas faltam?', '18mm'),
        problema('Gastei 3/5 do meu dinheiro e fiquei com R$ 60. Quanto eu tinha?', '18mm')], 2)) + bloco(
        2, 'Confira um dos problemas na calculadora e explique os passos que usou.', linhas(2))
    return h6(
        'fracao-de-uma-quantidade', 'Fração de uma quantidade', 'EF06MA09',
        'Resolver problemas de calcular a fração de uma quantidade, com resultado natural, com e sem calculadora.',
        'Fichas, tampinhas, calculadora.',
        ['Divida 12 fichas em 3 grupos: 1/3 de 12 é 4.',
         'Mostre 2/3: pegue 2 desses grupos.',
         'Registre: divida pelo denominador e multiplique pelo numerador.',
         'Na versão C, o estudante resolve problemas com duas frações e o caminho inverso.'],
        ['Use fichas e frações unitárias primeiro (1/2, 1/3, 1/4).',
         'Use sempre os dois passos na mesma ordem: dividir, depois multiplicar.',
         'Problemas com o lanche da turma, divididos de verdade.'],
        ['Bloco 1: 4; 3. Bloco 2: 5.',
         'Bloco 1: 12; 30; 12; 50. Bloco 2: 12 meninos; R$ 60.',
         'Bloco 1: 100 páginas (240 – 60 – 80); R$ 150. Bloco 2: resposta pessoal.'],
        a, b, c)


def adicao_subtracao_fracoes():
    a = bloco(1, 'Junte as partes pintadas. Quanto dá? Circule.', grade([
        item(pilha(barra_fracao(5, 2, 220, 28), barra_fracao(5, 1, 220, 28)), '<p class="legenda">2/5 + 1/5</p>' + opcoes(['3/5', '3/10'], certa='3/5'), exemplo=True),
        item(pilha(barra_fracao(8, 3, 220, 28), barra_fracao(8, 4, 220, 28)), '<p class="legenda">3/8 + 4/8</p>' + opcoes(['7/8', '7/16']))], 2), 'Com partes do mesmo tamanho, some só as de cima.') + bloco(
        2, '5/6 – 2/6 é: Circule.', item(opcoes(['3/6', '3/0'])))
    b = bloco(1, 'Calcule.', frases(['1/2 + 1/4 =', '2/3 – 1/6 =', '3/4 + 1/8 =', '1 – 2/5 ='])) + bloco(
        2, 'Leia e resolva.', probs(['Bebi 1/4 do suco de manhã e 1/2 à tarde. Quanto bebi?', 'Uma fita tinha 3/4 de metro e usei 1/3 de metro. Quanto sobrou?']))
    c = bloco(1, 'Calcule e simplifique.', frases(['5/6 + 3/4 =', '7/10 – 1/4 =', '2 1/2 – 3/4 ='])) + bloco(
        2, 'Leia e resolva.', problema('Numa receita, uso 2/3 de xícara de leite e 3/4 de xícara de água. Passa de uma xícara? Quanto passa?', '18mm')) + bloco(
        3, 'Explique por que 1/2 + 1/3 não é 2/5.', linhas(2))
    return h6(
        'somar-e-subtrair-fracoes', 'Somar e subtrair frações', 'EF06MA10',
        'Resolver problemas de adição e subtração com frações, igualando os denominadores quando preciso.',
        'Barras de frações, tiras de papel, receitas, copos medidores.',
        ['Some frações com o mesmo denominador usando as barras.',
         'Mostre que 1/2 + 1/4 pede trocar 1/2 por 2/4.',
         'Registre o passo de igualar os denominadores com frações equivalentes.',
         'Na versão C, o estudante calcula com números mistos e explica um erro comum.'],
        ['Use barras do mesmo tamanho e mesmo denominador no começo.',
         'Mostre o passo a passo sempre igual: igualar, somar em cima, manter embaixo.',
         'Cozinha na sala: medir frações de xícara de verdade.'],
        ['Bloco 1: 3/5; 7/8. Bloco 2: 3/6 (1/2).',
         'Bloco 1: 3/4; 1/2; 7/8; 3/5. Bloco 2: 3/4; 5/12 de metro.',
         'Bloco 1: 19/12 (1 7/12); 9/20; 7/4 (1 3/4). Bloco 2: sim, passa 5/12 de xícara. Bloco 3: os pedaços têm tamanhos diferentes; 1/2 + 1/3 = 5/6.'],
        a, b, c)


def estimar_arredondar():
    a = bloco(1, 'Arredonde para a dezena mais próxima. Circule.', grade([
        item(cx('47'), opcoes([50, 40], certa=50), exemplo=True), item(cx('83'), opcoes([80, 90])), item(cx('25'), opcoes([30, 20]))], 3),
        'Do 5 para cima, arredonde para cima.') + bloco(
        2, 'Quantas balas há no pote, mais ou menos? Circule.', item(pote(['amarelo'] * 4 + ['verde'] * 4 + ['rosa'] * 4, 100), opcoes(['cerca de 10', 'cerca de 100'])))
    b = bloco(1, 'Arredonde.', tabela(['Número', 'dezena', 'centena', 'milhar'], [[n(4672), n(4670), n(4700), n(5000)], [n(8349), '', '', ''], [n(12505), '', '', '']]),
              'A primeira linha é o exemplo.') + bloco(
        2, 'Estime e depois calcule.', frases(['498 + 312: estimativa ___ resultado', '61 × 9: estimativa ___ resultado']))
    c = bloco(1, 'Arredonde para a potência de 10 mais próxima do jeito que fizer sentido.', frases([f'População de uma cidade: {n(48736)}', 'Preço de um celular: R$ 1 189', 'Distância: 3 865 km'])) + bloco(
        2, 'Uma página tem cerca de 40 linhas e cada linha cerca de 12 palavras. Estime as palavras de um livro de 200 páginas.', linhas(2)) + bloco(
        3, 'Quando a estimativa é suficiente e quando precisamos do número exato? Dê um exemplo de cada.', linhas(2))
    return h6(
        'estimar-e-arredondar', 'Estimar e arredondar', 'EF06MA12',
        'Fazer estimativas de quantidades e arredondar números para a dezena, centena ou milhar mais próximos.',
        'Pote com grãos ou tampinhas, notícias com números grandes, reta numérica.',
        ['Mostre um pote com objetos e peça uma estimativa antes de contar.',
         'Na reta numérica, veja de qual dezena o número está mais perto.',
         'Use arredondamento para conferir se um resultado faz sentido.',
         'Na versão C, o estudante estima em contextos reais e discute quando basta estimar.'],
        ['Use a reta numérica para ver o "mais perto". Comece pelas dezenas.',
         'Regra fixa num cartaz: do 5 para cima, sobe.',
         'Concurso de estimativa: quem chega mais perto do número de grãos.'],
        ['Bloco 1: 50; 80; 30. Bloco 2: cerca de 10.',
         f'Bloco 1: {n(8350)}, {n(8300)}, {n(8000)}; {n(12510)}, {n(12500)}, {n(13000)}. Bloco 2: 800 e 810; 540 e 549.',
         f'Bloco 1: por exemplo {n(49000)} ou {n(50000)}; R$ 1 200; 3 900 km. Bloco 2: cerca de {n(96000)} palavras. Bloco 3: resposta pessoal.'],
        a, b, c)


def igualdade_dois_membros():
    a = bloco(1, 'A balança continua equilibrada? Circule.', grade([
        item(cx('5 + 3 = 8'), '<p class="conta">5 + 3 + 2 = 8 + 2</p>' + opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(cx('10 = 2 × 5'), '<p class="conta">10 ÷ 2 = 2 × 5</p>' + opcoes(['sim', 'não']))], 2)) + bloco(
        2, 'Que número falta? Circule.', item(cx(f'{VAZIO} + 7 = 15'), opcoes([8, 22])))
    b = bloco(1, 'Descubra o valor, fazendo a mesma coisa nos dois lados.', frases(['x + 12 = 30', 'x – 8 = 25', '4 × x = 36', 'x ÷ 3 = 9']), 'Exemplo: x + 5 = 9; tiro 5 dos dois lados; x = 4.') + bloco(
        2, 'Leia e resolva.', problema('Numa balança, 3 caixas iguais equilibram 27 kg. Quanto pesa cada caixa?', '16mm'))
    c = bloco(1, 'Descubra o valor e mostre cada passo.', frases(['2x + 7 = 31', '5x – 4 = 46', '(x + 6) ÷ 2 = 10'])) + bloco(
        2, 'Leia e resolva.', problema('Somei o dobro de um número com 15 e deu 63. Que número é?', '16mm')) + bloco(
        3, 'Explique por que a igualdade não muda quando dividimos os dois lados por 3.', linhas(2))
    return h6(
        'igualdade-e-valor-desconhecido', 'Igualdade e valor desconhecido', 'EF06MA14',
        'Usar a ideia de que a igualdade se mantém ao fazer a mesma operação nos dois lados para descobrir valores desconhecidos.',
        'Balança de dois pratos, saquinhos iguais com pesos, fichas.',
        ['Equilibre a balança com saquinhos misteriosos e pesos conhecidos.',
         'Tire o mesmo peso dos dois lados até sobrar só o saquinho.',
         'Escreva cada passo como igualdade.',
         'Na versão C, o estudante resolve equações com duas operações e explica.'],
        ['Use a balança real a cada passo. Uma operação por linha.',
         'Escreva sempre "faço o mesmo dos dois lados" no mesmo lugar.',
         'Desafio: equilibrar a balança com o menor número de jogadas.'],
        ['Bloco 1: sim; não. Bloco 2: 8.',
         'Bloco 1: 18; 33; 9; 27. Bloco 2: 9 kg.',
         'Bloco 1: 12; 10; 14. Bloco 2: 24. Bloco 3: os dois lados continuam com o mesmo valor, só divididos em 3 partes iguais.'],
        a, b, c)


def partilha_razao():
    a = bloco(1, 'Para cada 1 copo de suco, 2 copos de água. Qual mistura segue a regra? Circule.', grade([
        item(fila_h(rot(grupo('suco', 2, 2, 30), 'suco'), rot(grupo('leite', 4, 4, 30), 'água')), opcoes(['segue', 'não segue'], certa='segue'), exemplo=True),
        item(fila_h(rot(grupo('suco', 3, 3, 30), 'suco'), rot(grupo('leite', 3, 3, 30), 'água')), opcoes(['segue', 'não segue']))], 1)) + bloco(
        2, 'Divida 12 em duas partes, uma o dobro da outra. Circule.', item(opcoes(['4 e 8', '6 e 6'])))
    b = bloco(1, 'Leia e resolva.', probs(['Divida R$ 90 entre Ana e Rui: Ana fica com o dobro.', 'Uma turma tem 30 estudantes; para cada 2 meninas há 3 meninos. Quantos de cada?'])) + bloco(
        2, 'Na turma acima, qual a razão entre meninas e o total?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Um prêmio de R$ 1 200 foi dividido entre duas pessoas na razão 1 para 3. Quanto cada uma recebeu?', '18mm'),
        problema('Dois irmãos têm juntos 52 figurinhas; um tem 8 a mais que o outro. Quantas cada um tem?', '18mm')], 2)) + bloco(
        2, 'Uma tinta é feita com 3 partes de azul para 5 de branco. Que fração da mistura é azul? E em 40 litros, quantos são azuis?', linhas(2))
    return h6(
        'partilha-desigual-e-razao', 'Partilha desigual e razão', 'EF06MA15',
        'Resolver problemas de dividir uma quantidade em partes desiguais, com relações aditivas, multiplicativas e de razão.',
        'Fichas de duas cores, tiras de papel para desenhar barras, receitas de mistura.',
        ['Divida fichas: uma pessoa fica com o dobro. Quantas partes iguais há?',
         'Desenhe barras com as partes de cada um.',
         'Escreva a razão: 2 para 3, e a fração do todo: 2/5.',
         'Na versão C, o estudante resolve partilhas com razão e com diferença.'],
        ['Use fichas e o desenho de barras. Totais pequenos.',
         'Use cores fixas para cada pessoa na barra.',
         'Misturas de tinta ou suco na prática.'],
        ['Bloco 1: segue; não segue. Bloco 2: 4 e 8.',
         'Bloco 1: Rui R$ 30 e Ana R$ 60; 12 meninas e 18 meninos. Bloco 2: 12/30 = 2/5.',
         'Bloco 1: R$ 300 e R$ 900; 22 e 30. Bloco 2: 3/8; 15 litros.'],
        a, b, c)


# ---------- Geometria ----------

def pares_ordenados():
    pts = {(2, 1): 'A', (5, 1): 'B', (5, 4): 'C', (2, 4): 'D'}
    a = bloco(1, 'Qual é o par ordenado do ponto A? Circule.', item(malha(6, 5, 40, marcas=pts, eixos=True, rotulo='plano com o quadrado ABCD'), opcoes(['(2, 1)', '(1, 2)'])),
              'Primeiro o número do eixo de baixo (x), depois o do lado (y).') + bloco(
        2, 'Que figura os pontos formam? Circule.', item(opcoes(['quadrado', 'triângulo'])))
    b = bloco(1, 'Escreva os pares ordenados dos vértices.', item(malha(7, 6, 36, marcas={(1, 1): 'P', (6, 1): 'Q', (3, 5): 'R'}, eixos=True, rotulo='plano com o triângulo PQR')) + frases(['P =', 'Q =', 'R ='])) + bloco(
        2, 'Que figura PQR forma?', linhas(1))
    c = bloco(1, 'Marque e ligue: A (1, 1), B (7, 1), C (6, 4), D (2, 4).', item(malha(8, 5, 36, eixos=True, rotulo='plano vazio'))) + bloco(
        2, 'Que quadrilátero você desenhou? Quais lados são paralelos?', linhas(1)) + bloco(
        3, 'Some 1 ao primeiro número de cada par e desenhe de novo. O que aconteceu com a figura?', linhas(1))
    return h6(
        'pares-ordenados-e-vertices', 'Pares ordenados e vértices', 'EF06MA16',
        'Associar pares ordenados a pontos do 1º quadrante do plano cartesiano, como os vértices de um polígono.',
        'Plano cartesiano grande no chão ou no quadro, fichas, papel quadriculado.',
        ['Monte o plano no chão e peça para cada estudante ficar num par ordenado.',
         'Marque vértices e ligue para formar polígonos.',
         'Mostre que (2, 1) e (1, 2) são pontos diferentes.',
         'Na versão C, o estudante desenha, classifica e desloca a figura.'],
        ['Use o plano do chão antes do papel. Sempre "anda, depois sobe".',
         'Cores fixas para o eixo x e o eixo y.',
         'Batalha naval no plano cartesiano em dupla.'],
        ['Bloco 1: (2, 1). Bloco 2: quadrado.',
         'Bloco 1: P (1, 1); Q (6, 1); R (3, 5). Bloco 2: triângulo.',
         'Bloco 1: figura desenhada. Bloco 2: trapézio; AB e DC são paralelos. Bloco 3: andou 1 para a direita, forma e tamanho iguais.'],
        a, b, c)


def poligonos_regulares():
    a = bloco(1, 'Todos os lados e ângulos são iguais? Circule.', grade([
        item(HEX, opcoes(['sim', 'não'], certa='sim'), exemplo=True), item(IRREG, opcoes(['sim', 'não'])), item(QUAD, opcoes(['sim', 'não']))], 3),
        'Regular: lados iguais e ângulos iguais.') + bloco(
        2, 'Quantos lados tem o pentágono? Circule.', item(PENT, opcoes([5, 6])))
    b = bloco(1, 'Complete a tabela.', tabela(['Polígono', 'Lados', 'Vértices', 'Regular?'], [['hexágono da figura', '6', '6', 'sim'], ['retângulo', '', '', ''], ['quadrado', '', '', ''], ['losango', '', '', '']]),
              'A primeira linha é o exemplo.') + bloco(
        2, 'Quais polígonos formam as faces deste sólido?', item(solido('piramide', 80)) + linhas(1))
    c = bloco(1, 'Classifique e explique.', grade([item(RET, linhas(1)), item(LOS, linhas(1)), item(PENT, linhas(1))], 3)) + bloco(
        2, 'Um retângulo tem ângulos iguais e um losango tem lados iguais. Algum deles é regular? Por quê?', linhas(2)) + bloco(
        3, 'Quais polígonos aparecem nas faces de um cubo e de um prisma de base triangular?', linhas(1))
    return h6(
        'poligonos-regulares-e-nao-regulares', 'Polígonos regulares e não regulares', 'EF06MA18',
        'Reconhecer, nomear e comparar polígonos pelos lados, vértices e ângulos, e classificá-los em regulares e não regulares, também nas faces de poliedros.',
        'Figuras recortadas, régua, transferidor, sólidos geométricos.',
        ['Meça os lados de figuras recortadas com régua.',
         'Compare ângulos sobrepondo as figuras ou com o transferidor.',
         'Encontre os polígonos nas faces de sólidos.',
         'Na versão C, o estudante explica por que retângulo e losango não são regulares.'],
        ['Use figuras recortadas para sobrepor. Um critério por vez: primeiro lados.',
         'Use uma tabela fixa com nome, lados e se é regular.',
         'Caça aos polígonos na escola com foto e classificação.'],
        ['Bloco 1: sim (regular); não (não regular); sim (regular). Bloco 2: 5.',
         'Bloco 1: retângulo 4, 4, não; quadrado 4, 4, sim; losango 4, 4, não. Bloco 2: 1 quadrado e 4 triângulos.',
         'Bloco 1: retângulo, não regular (lados diferentes); losango, não regular (ângulos diferentes); pentágono, regular. Bloco 2: nenhum, regular precisa de lados e ângulos iguais. Bloco 3: quadrados; triângulos e retângulos.'],
        a, b, c)


def classificar_triangulos():
    a = bloco(1, 'Este triângulo tem um ângulo reto? Circule.', grade([
        item(TRI_RET, opcoes(['sim', 'não'], certa='sim'), exemplo=True), item(TRI_EQ, opcoes(['sim', 'não']))], 2), 'Use o canto de uma folha para conferir.') + bloco(
        2, 'Os três lados são iguais? Circule.', item(TRI_EQ, opcoes(['sim', 'não'])))
    b = bloco(1, 'Classifique pelos lados: equilátero, isósceles ou escaleno.', grade([item(TRI_EQ, resposta(largura='26mm')), item(TRI_ISO, resposta(largura='26mm')), item(TRI_ESC, resposta(largura='26mm'))], 3),
              'Meça com a régua.') + bloco(
        2, 'Classifique pelos ângulos: acutângulo, retângulo ou obtusângulo.', grade([item(TRI_RET, resposta(largura='26mm')), item(TRI_OBT, resposta(largura='26mm')), item(TRI_EQ, resposta(largura='26mm'))], 3))
    c = bloco(1, 'Verdadeiro ou falso? Justifique.', frases(['Todo triângulo equilátero é isósceles.', 'Um triângulo pode ter dois ângulos retos.', 'Um triângulo retângulo pode ser isósceles.'])) + bloco(
        2, 'Desenhe com régua um triângulo isósceles obtusângulo.', caixa_desenho('34mm')) + bloco(
        3, 'Dá para montar um triângulo com palitos de 3 cm, 4 cm e 9 cm? Explique.', linhas(1))
    return h6(
        'classificar-triangulos', 'Classificar triângulos', 'EF06MA19',
        'Identificar características dos triângulos e classificá-los pelas medidas dos lados e dos ângulos.',
        'Palitos de tamanhos diferentes, régua, esquadro, transferidor.',
        ['Monte triângulos com palitos de vários tamanhos.',
         'Classifique pelos lados medindo com régua.',
         'Classifique pelos ângulos comparando com o canto do papel.',
         'Na versão C, o estudante justifica afirmações e testa a desigualdade dos lados.'],
        ['Use palitos de cores por tamanho. Um tipo de classificação por vez.',
         'Cartaz fixo com os nomes e um desenho de cada.',
         'Desafio: montar todos os tipos com palitos.'],
        ['Bloco 1: sim; não. Bloco 2: sim.',
         'Bloco 1: equilátero; isósceles; escaleno. Bloco 2: retângulo; obtusângulo; acutângulo.',
         'Bloco 1: verdadeiro (tem pelo menos dois lados iguais); falso (os ângulos somam 180°); verdadeiro. Bloco 2: resposta pessoal. Bloco 3: não, 3 + 4 é menor que 9.'],
        a, b, c)


def classificar_quadrilateros():
    a = bloco(1, 'Este quadrilátero tem 4 ângulos retos? Circule.', grade([
        item(RET, opcoes(['sim', 'não'], certa='sim'), exemplo=True), item(TRAP, opcoes(['sim', 'não'])), item(QUAD, opcoes(['sim', 'não']))], 3)) + bloco(
        2, 'Quantos lados tem um quadrilátero? Circule.', item(opcoes([4, 3])))
    b = bloco(1, 'Escreva o nome de cada um.', grade([item(QUAD, resposta(largura='26mm')), item(RET, resposta(largura='26mm')), item(LOS, resposta(largura='26mm')),
                                                    item(PARAL, resposta(largura='26mm')), item(TRAP, resposta(largura='26mm'))], 3)) + bloco(
        2, 'Quantos pares de lados paralelos tem o trapézio? E o paralelogramo?', linhas(1))
    c = bloco(1, 'Verdadeiro ou falso? Justifique.', frases(['Todo quadrado é retângulo.', 'Todo retângulo é quadrado.', 'Todo quadrado é losango.', 'Todo losango é paralelogramo.'])) + bloco(
        2, 'Faça um diagrama mostrando que os quadrados estão dentro dos retângulos e dos losangos.', caixa_desenho('36mm'))
    return h6(
        'classificar-quadrilateros', 'Classificar quadriláteros', 'EF06MA20',
        'Classificar quadriláteros por lados e ângulos e reconhecer que uma classe pode estar dentro de outra (todo quadrado é retângulo).',
        'Quadriláteros recortados, régua, esquadro, varetas para montar.',
        ['Separe quadriláteros recortados em grupos à escolha da turma.',
         'Procure lados paralelos, lados iguais e ângulos retos em cada um.',
         'Mostre que o quadrado cabe em mais de um grupo.',
         'Na versão C, o estudante justifica as inclusões e desenha o diagrama.'],
        ['Use figuras recortadas e um critério por vez (ângulo reto, depois lados).',
         'Cartaz fixo com o desenho e o nome de cada quadrilátero.',
         'Montar quadriláteros com varetas e mexer nos ângulos.'],
        ['Bloco 1: sim; não; sim. Bloco 2: 4.',
         'Bloco 1: quadrado; retângulo; losango; paralelogramo; trapézio. Bloco 2: um; dois.',
         'Bloco 1: verdadeiro; falso; verdadeiro; verdadeiro. Bloco 2: quadrados na intersecção de retângulos e losangos, todos dentro dos paralelogramos.'],
        a, b, c)


def figuras_semelhantes():
    a = bloco(1, 'Qual é a ampliação da figura? Circule.', grade([
        item(fila_h(malha(2, 2, 24, ret(0, 0, 2, 1) + [(0, 1)]), malha(4, 4, 24, ret(0, 0, 4, 2) + ret(0, 2, 2, 2)), malha(4, 2, 24, ret(0, 0, 4, 1) + [(0, 1)])),
             opcoes(['a do meio', 'a última'], certa='a do meio'), exemplo=True)], 1), 'Na ampliação, todos os lados crescem do mesmo jeito.') + bloco(
        2, 'Ao ampliar, os ângulos: Circule.', item(opcoes(['ficam iguais', 'aumentam'])))
    b = bloco(1, 'Amplie a figura com os lados 2 vezes maiores.', item(fila_h(malha(3, 3, 22, [(0, 0), (1, 0), (2, 0), (0, 1), (0, 2)]), malha(7, 7, 22)))) + bloco(
        2, 'Reduza a figura com os lados pela metade.', item(fila_h(malha(6, 4, 20, ret(0, 0, 6, 2) + ret(0, 2, 2, 2)), malha(4, 3, 20))))
    c = bloco(1, 'No plano, o triângulo tem vértices (1, 1), (3, 1), (1, 2). Multiplique as coordenadas por 3 e desenhe.', item(malha(10, 7, 30, eixos=True, rotulo='plano vazio'))) + bloco(
        2, 'Os triângulos são semelhantes? O que aconteceu com os lados e com os ângulos?', linhas(2)) + bloco(
        3, 'Se for possível, faça a ampliação num programa de geometria (como o GeoGebra) e compare.', linhas(1))
    return h6(
        'figuras-semelhantes-ampliar-e-reduzir', 'Figuras semelhantes: ampliar e reduzir', 'EF06MA21',
        'Construir figuras semelhantes ampliando e reduzindo na malha, no plano cartesiano ou com tecnologia.',
        'Malha quadriculada, régua, transferidor, computador com GeoGebra (opcional).',
        ['Amplie uma figura simples dobrando cada lado na malha.',
         'Compare lados (proporcionais) e ângulos (iguais).',
         'No plano, multiplique as coordenadas e veja a figura crescer.',
         'Na versão C, o estudante amplia no plano e, se possível, no computador.'],
        ['Comece com retângulos e letras simples. Conte os lados junto.',
         'Use sempre a mesma regra escrita: "cada lado vezes 2".',
         'Ampliação de um desenho da turma num cartaz.'],
        ['Bloco 1: a do meio. Bloco 2: ficam iguais.',
         'Bloco 1: L com braços de 6 quadradinhos. Bloco 2: figura 3 por 1 com uma coluna de 1 por 1 embaixo.',
         'Bloco 1: (3, 3), (9, 3), (3, 6). Bloco 2: sim; os lados ficaram 3 vezes maiores e os ângulos iguais. Bloco 3: resposta pessoal.'],
        a, b, c)


def paralelas_perpendiculares():
    a = bloco(1, 'Estas retas nunca se encontram? Circule.', grade([
        item(retas('paralelas'), opcoes(['paralelas', 'se cruzam'], certa='paralelas'), exemplo=True), item(retas('concorrentes'), opcoes(['paralelas', 'se cruzam']))], 2)) + bloco(
        2, 'Estas retas formam ângulo reto? Circule.', item(retas('perpendiculares'), opcoes(['sim', 'não'])))
    b = bloco(1, 'Escreva paralelas, perpendiculares ou concorrentes.', grade([item(retas('perpendiculares'), resposta(largura='28mm')), item(retas('paralelas'), resposta(largura='28mm')),
                                                                             item(retas('concorrentes'), resposta(largura='28mm'))], 3)) + bloco(
        2, 'Trace uma reta qualquer. Depois, com régua e esquadro, trace uma paralela e uma perpendicular a ela.', caixa_desenho('36mm'))
    c = bloco(1, 'Com régua e esquadro, construa um retângulo de 6 cm por 3 cm.', caixa_desenho('40mm')) + bloco(
        2, 'Construa um paralelogramo que não seja retângulo. Explique como usou o esquadro.', caixa_desenho('34mm') + linhas(1))
    return h6(
        'retas-paralelas-e-perpendiculares', 'Retas paralelas e perpendiculares', 'EF06MA22',
        'Usar régua, esquadro ou programas para traçar retas paralelas e perpendiculares e construir quadriláteros.',
        'Régua, esquadro, lápis, programa de geometria (opcional), mapa de ruas.',
        ['Mostre ruas paralelas e perpendiculares num mapa.',
         'Ensine a deslizar o esquadro na régua para traçar paralelas.',
         'Use o ângulo reto do esquadro para as perpendiculares.',
         'Na versão C, o estudante constrói quadriláteros com medidas dadas.'],
        ['Fixe a régua com fita adesiva. Mostre o movimento devagar, uma vez por vez.',
         'Passo a passo escrito ao lado: apoie, deslize, trace.',
         'Construções com tempo e desafio de precisão.'],
        ['Bloco 1: paralelas; se cruzam. Bloco 2: sim.',
         'Bloco 1: perpendiculares; paralelas; concorrentes. Bloco 2: construção.',
         'Bloco 1: retângulo 6 cm por 3 cm. Bloco 2: lados opostos traçados como paralelas, sem ângulo reto.'],
        a, b, c)


def algoritmo_passo_a_passo():
    a = bloco(1, 'Siga os passos na malha a partir da estrela. Onde você chega? Circule.', item(malha(6, 5, 38, marcas={(0, 4): '★', (3, 1): 'A', (3, 4): 'B'}, rotulo='malha com estrela, A e B')) + item(
        cx('3 para a direita, 3 para cima'), opcoes(['A', 'B'], certa='A'), exemplo=True)) + bloco(
        2, 'E com "3 para a direita"? Circule.', item(opcoes(['A', 'B'])))
    b = bloco(1, 'Escreva os passos para ir da casa (C) até a escola (E).', item(malha(7, 5, 36, marcas={(0, 4): 'C', (5, 1): 'E', (2, 2): 'X'}, rotulo='malha com casa C, escola E e obstáculo X')) + linhas(2),
              'X é um obstáculo: não passe por ele.') + bloco(
        2, 'Escreva os passos para dobrar uma folha e fazer um chapéu ou um barquinho.', linhas(3))
    c = bloco(1, 'Escreva um algoritmo para desenhar um quadrado de lado 3 com comandos como "ande 3", "vire à direita".', linhas(3)) + bloco(
        2, 'Agora um triângulo equilátero. De quanto é cada virada?', linhas(2)) + bloco(
        3, 'Troque de folha com um colega e siga o algoritmo dele. Funcionou?', linhas(1))
    return h6(
        'algoritmo-passo-a-passo', 'Algoritmo passo a passo', 'EF06MA23',
        'Construir algoritmos para resolver situações passo a passo, como dobraduras ou deslocamentos no plano.',
        'Malha no chão, papel para dobradura, robô de brinquedo ou ambiente de programação em blocos (opcional).',
        ['Faça uma dobradura dando instruções só faladas.',
         'Registre as instruções em passos numerados e teste com outro colega.',
         'Dê comandos de deslocamento numa malha no chão.',
         'Na versão C, o estudante escreve algoritmos de desenho com viradas.'],
        ['Use a malha do chão e poucos passos. Teste cada passo.',
         'Comandos sempre com as mesmas palavras: ande, vire à direita, vire à esquerda.',
         'Jogo do robô: um escreve, outro executa.'],
        ['Bloco 1: A. Bloco 2: B.',
         'Bloco 1: por exemplo, 5 para a direita e 3 para cima, desviando do X. Bloco 2: resposta pessoal.',
         'Bloco 1: ande 3, vire à direita, repetido 4 vezes. Bloco 2: ande 3, vire 120°, repetido 3 vezes. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def problemas_grandezas():
    a = bloco(1, 'Que unidade usar? Circule.', grade([
        item(cx('altura de uma porta'), opcoes(['metro', 'quilo'], certa='metro'), exemplo=True), item(cx('peso de um saco de arroz'), opcoes(['quilo', 'litro'])),
        item(cx('água de uma garrafa'), opcoes(['litro', 'metro']))], 1)) + bloco(
        2, 'Quantos cubinhos tem o bloco? Circule.', item(empilhado(3, 1, 2, 28), opcoes([6, 5])))
    b = bloco(1, 'Leia e resolva.', probs(['Um pacote tem 500 g. Quantos pacotes formam 3 kg?', 'Uma jarra tem 2 L. Quantos copos de 250 mL ela enche?',
                                           'A temperatura era 8 °C e subiu 15 °C. Quanto ficou?', 'Um retângulo tem 7 m por 4 m. Qual a área?'])) + bloco(
        2, 'Quantos cubinhos tem um bloco de 4 por 3 por 2?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma sala de 6 m por 5 m vai receber piso. Cada caixa cobre 2 m². Quantas caixas?', '18mm'),
        problema('Um terreno triangular é metade de um retângulo de 20 m por 12 m. Qual a área?', '18mm'),
        problema('Uma caixa-d\'água tem 2 m por 1 m por 1,5 m. Quantos litros cabem? (1 m³ = 1 000 L)', '18mm'),
        problema('Uma viagem durou 3 h 40 min e saiu às 9h35. A que horas chegou?', '18mm')], 2))
    return h6(
        'problemas-com-grandezas-e-medidas', 'Problemas com grandezas e medidas', 'EF06MA24',
        'Resolver problemas com comprimento, massa, tempo, temperatura, área, capacidade e volume, sem usar fórmulas, em contextos reais.',
        'Trena, balança, jarras e copos medidores, termômetro, cubinhos.',
        ['Meça objetos da sala com instrumentos de verdade.',
         'Converta unidades usando referências: 1 kg = 1 000 g; 1 L = 1 000 mL.',
         'Calcule áreas contando quadrados e volumes contando cubos.',
         'Na versão C, o estudante resolve problemas reais com várias etapas.'],
        ['Use instrumentos reais e uma grandeza por vez.',
         'Cartaz fixo de conversões e de unidades por grandeza.',
         'Projeto: medir e calcular a área da sala para trocar o piso.'],
        ['Bloco 1: metro; quilo; litro. Bloco 2: 6.',
         'Bloco 1: 6 pacotes; 8 copos; 23 °C; 28 m². Bloco 2: 24 cubinhos.',
         'Bloco 1: 15 caixas; 120 m²; 3 000 L; 13h15.'],
        a, b, c)


def abertura_angulo():
    a = bloco(1, 'Qual ângulo é mais aberto? Circule.', grade([
        item(fila_h(rot(angulo2(30, 90), '1'), rot(angulo2(80, 90), '2')), opcoes(['1', '2'], certa='2'), exemplo=True),
        item(fila_h(rot(angulo2(120, 100), '1'), rot(angulo2(45, 90), '2')), opcoes(['1', '2']))], 2), 'Olhe a abertura, não o tamanho das linhas.') + bloco(
        2, 'Um ângulo reto tem: Circule.', item(opcoes(['90°', '180°'])))
    b = bloco(1, 'Classifique: agudo (menor que 90°), reto ou obtuso (maior que 90°).', grade([item(angulo2(60, 100), resposta(largura='22mm')), item(angulo2(90, 100), resposta(largura='22mm')),
                                                                                          item(angulo2(140, 110), resposta(largura='22mm'))], 3)) + bloco(
        2, 'Ordene do menos aberto para o mais aberto: 135°, 45°, 90°, 20°.', linhas(1))
    c = bloco(1, 'Encontre na sala um ângulo agudo, um reto e um obtuso e descreva onde estão.', frases(['Agudo:', 'Reto:', 'Obtuso:'])) + bloco(
        2, 'Um ângulo com linhas compridas é maior que um com linhas curtas? Explique.', linhas(2)) + bloco(
        3, 'Quanto gira o ponteiro dos minutos em 15 min? E em 30 min?', linhas(1))
    return h6(
        'abertura-do-angulo', 'Abertura do ângulo', 'EF06MA25',
        'Reconhecer a abertura do ângulo como grandeza, comparando e classificando ângulos.',
        'Dois palitos presos com tachinha (ou percevejo), relógio, esquadro.',
        ['Abra e feche os palitos presos e compare as aberturas.',
         'Mostre que o tamanho dos palitos não muda o ângulo.',
         'Use o canto do papel como referência de 90°.',
         'Na versão C, o estudante procura ângulos no ambiente e relaciona com o relógio.'],
        ['Use os palitos móveis em todas as perguntas.',
         'Use sempre o canto do papel como régua de comparação.',
         'Imitar ângulos com os braços: agudo, reto, obtuso.'],
        ['Bloco 1: 2; 1. Bloco 2: 90°.',
         'Bloco 1: agudo; reto; obtuso. Bloco 2: 20°, 45°, 90°, 135°.',
         'Bloco 1: resposta pessoal. Bloco 2: não, o ângulo é a abertura. Bloco 3: 90°; 180°.'],
        a, b, c)


def angulos_situacoes_reais():
    a = bloco(1, 'Que ângulo o ponteiro faz? Circule.', grade([
        item(cx('3 horas'), opcoes(['reto (90°)', 'raso (180°)'], certa='reto (90°)'), exemplo=True), item(cx('6 horas'), opcoes(['reto (90°)', 'raso (180°)']))], 2)) + bloco(
        2, 'Uma volta inteira tem: Circule.', item(opcoes(['360°', '90°'])))
    b = bloco(1, 'Leia e resolva.', probs(['Um robô está virado para o norte e gira 90° para a direita. Para onde fica virado?',
                                           'Uma pessoa vê um quadro com ângulo de visão de 40°. Se chegar mais perto, o ângulo aumenta ou diminui?'])) + bloco(
        2, 'Quanto gira o ponteiro dos minutos em 20 minutos?', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma rampa faz 10° com o chão e outra faz 25°. Qual é mais difícil de subir? Por quê?', '16mm'),
        problema('Um skatista deu um giro de 540°. Quantas voltas e meia são?', '16mm'),
        problema('Às 2h, qual o ângulo entre os ponteiros?', '16mm'),
        problema('O olho humano vê cerca de 120° à frente. Que fração da volta é isso?', '16mm')], 2))
    return h6(
        'angulos-em-situacoes-reais', 'Ângulos em situações reais', 'EF06MA26',
        'Resolver problemas com a noção de ângulo em contextos reais, como giros, relógio, rampas e ângulo de visão.',
        'Relógio de ponteiros, bússola ou rosa dos ventos, transferidor.',
        ['Gire o corpo: um quarto de volta, meia volta, uma volta.',
         'Associe giros a graus: 90°, 180°, 360°.',
         'Discuta o ângulo de visão: de perto, o objeto ocupa mais da vista.',
         'Na versão C, o estudante resolve problemas de rampas, giros e relógio.'],
        ['Use giros do próprio corpo e o relógio de ponteiros.',
         'Cartaz fixo: 1/4 de volta = 90°, 1/2 = 180°, volta = 360°.',
         'Desafio de giros com comandos rápidos.'],
        ['Bloco 1: reto; raso. Bloco 2: 360°.',
         'Bloco 1: leste; aumenta. Bloco 2: 120°.',
         'Bloco 1: a de 25°, é mais inclinada; uma volta e meia; 60°; 1/3 da volta.'],
        a, b, c)


def medir_transferidor():
    a = bloco(1, 'Leia o transferidor. Qual é o ângulo? Circule.', grade([
        item(transferidor(60, 220), opcoes(['60°', '120°'], certa='60°'), exemplo=True), item(transferidor(90, 220), opcoes(['90°', '45°']))], 2),
        'Comece no 0 da direita.') + bloco(
        2, 'Este ângulo é maior ou menor que 90°? Circule.', item(transferidor(150, 200), opcoes(['maior', 'menor'])))
    b = bloco(1, 'Escreva a medida.', grade([item(transferidor(30, 200), resposta(largura='18mm')), item(transferidor(120, 200), resposta(largura='18mm')),
                                           item(transferidor(150, 200), resposta(largura='18mm'))], 3)) + bloco(
        2, 'Com o transferidor, desenhe ângulos de 45° e de 110°.', caixa_desenho('34mm'))
    c = bloco(1, 'Meça os ângulos com o transferidor.', grade([item(angulo2(40, 110)), item(angulo2(75, 110)), item(angulo2(135, 120))], 3) + linhas(1)) + bloco(
        2, 'Desenhe um triângulo com ângulos de 50° e 60°. Meça o terceiro ângulo.', caixa_desenho('34mm') + linhas(1)) + bloco(
        3, 'Se houver computador, meça ângulos num programa de geometria e compare.', linhas(1))
    return h6(
        'medir-angulos-com-transferidor', 'Medir ângulos com o transferidor', 'EF06MA27',
        'Medir e desenhar ângulos usando o transferidor ou programas de geometria.',
        'Transferidor transparente, régua, programa de geometria (opcional).',
        ['Mostre o centro e a linha do zero do transferidor.',
         'Coloque o centro no vértice e o zero sobre um dos lados.',
         'Leia a escala que começa no zero usado.',
         'Na versão C, o estudante mede, desenha e investiga a soma dos ângulos do triângulo.'],
        ['Marque com cor a escala que vai ser lida. Ângulos de 30 em 30 primeiro.',
         'Passo a passo fixo: centro, zero, leitura.',
         'Medir ângulos de objetos da sala com tempo.'],
        ['Bloco 1: 60°; 90°. Bloco 2: maior.',
         'Bloco 1: 30°; 120°; 150°. Bloco 2: construção.',
         'Bloco 1: 40°; 75°; 135°. Bloco 2: 70°. Bloco 3: resposta pessoal.'],
        a, b, c)


def plantas_baixas():
    a = bloco(1, 'Na planta, qual é o maior cômodo? Circule.', item(planta(CASA, 8, 6, 30), opcoes(['sala', 'banheiro'])), 'A planta é a casa vista de cima.') + bloco(
        2, 'O banheiro fica ao lado de qual cômodo? Circule.', item(opcoes(['cozinha', 'quarto'])))
    b = bloco(1, 'Cada quadradinho vale 1 m. Responda.', item(planta(CASA, 8, 6, 30)) + frases(['Medidas da sala:', 'Área do quarto:', 'Qual cômodo tem 4 m²?'])) + bloco(
        2, 'Desenhe a vista de cima da sua mesa com o estojo e o caderno.', caixa_desenho('30mm'))
    c = bloco(1, 'Desenhe a planta baixa da sua casa ou da sala de aula, com 1 quadradinho = 1 m.', item(malha(16, 7, 26, rotulo='malha vazia'))) + bloco(
        2, 'Escreva a área de dois cômodos e a área total.', linhas(2)) + bloco(
        3, 'Compare a planta com uma vista aérea (como num aplicativo de mapas). O que aparece igual?', linhas(1))
    return h6(
        'plantas-baixas-e-vistas-aereas', 'Plantas baixas e vistas aéreas', 'EF06MA28',
        'Interpretar, descrever e desenhar plantas baixas simples de casas e vistas aéreas.',
        'Plantas de folhetos de imóveis, malha quadriculada, trena, mapas com vista de satélite.',
        ['Mostre uma planta de folheto e identifique os cômodos.',
         'Mostre a sala vista de cima no mapa de satélite da escola.',
         'Meça a sala e desenhe a planta em escala na malha.',
         'Na versão C, o estudante desenha a própria planta e compara com a vista aérea.'],
        ['Use a planta da própria sala, que é conhecida. Conte os quadradinhos juntos.',
         'Use sempre 1 quadradinho = 1 metro, escrito na folha.',
         'Medir a sala com a trena em equipe.'],
        ['Bloco 1: sala. Bloco 2: cozinha.',
         'Bloco 1: 5 m por 4 m; 9 m²; banheiro. Bloco 2: resposta pessoal.',
         'Bloco 1 a 3: resposta pessoal.'],
        a, b, c)


def perimetro_area_quadrado():
    a = bloco(1, 'Dobrei o lado do quadrado. Quantos quadradinhos tem agora? Circule.', item(fila_h(malha(2, 2, 26, ret(0, 0, 2, 2)), malha(4, 4, 26, ret(0, 0, 4, 4))),
              opcoes([16, 8])), 'Conte os quadradinhos dos dois.') + bloco(
        2, 'O contorno do quadrado grande é quantas vezes o do pequeno? Circule.', item(opcoes(['2 vezes', '4 vezes'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Lado', '1', '2', '3', '4', '5'], [['Perímetro', '4', '', '', '', ''], ['Área', '1', '', '', '', '']])) + bloco(
        2, 'Responda.', frases(['Quando o lado dobra, o perímetro', 'Quando o lado dobra, a área', 'Quando o lado triplica, a área']))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Um quadrado tem lado 6 cm. Reduzindo o lado à metade, quanto ficam o perímetro e a área?', '18mm'),
        problema('Um jardim quadrado de 4 m de lado vai ter o lado ampliado para 12 m. Quantas vezes a área aumenta?', '18mm')], 2)) + bloco(
        2, 'Explique por que o perímetro é proporcional ao lado e a área não.', linhas(2))
    return h6(
        'perimetro-e-area-do-quadrado', 'Perímetro e área do quadrado', 'EF06MA29',
        'Analisar o que acontece com o perímetro e a área de um quadrado quando o lado aumenta ou diminui.',
        'Quadradinhos de papel, malha, barbante, régua.',
        ['Monte quadrados de lado 1, 2, 3 e 4 com quadradinhos.',
         'Meça o contorno com barbante e conte os quadradinhos de dentro.',
         'Registre na tabela e procure o padrão.',
         'Na versão C, o estudante resolve problemas de redução e ampliação e explica.'],
        ['Monte os quadrados com quadradinhos soltos. Uma medida por vez.',
         'Cores fixas: contorno de uma cor, área de outra.',
         'Construir o maior quadrado possível com 50 quadradinhos.'],
        ['Bloco 1: 16. Bloco 2: 2 vezes.',
         'Bloco 1: perímetros 8, 12, 16, 20; áreas 4, 9, 16, 25. Bloco 2: dobra; fica 4 vezes maior; fica 9 vezes maior.',
         'Bloco 1: perímetro 12 cm e área 9 cm²; 9 vezes. Bloco 2: o perímetro cresce junto com o lado; a área multiplica lado por lado.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def probabilidade_experimentos():
    a = bloco(1, 'Qual a chance de sair verde? Circule.', grade([
        item(roleta(['verde', 'amarelo', 'amarelo', 'amarelo'], 100), opcoes(['1 em 4', '3 em 4'], certa='1 em 4'), exemplo=True),
        item(roleta(['verde', 'verde', 'amarelo', 'amarelo'], 100), opcoes(['1 em 2', '1 em 4']))], 2), 'Conte as partes da cor e o total.') + bloco(
        2, 'Num dado, a chance de sair 3 é: Circule.', item(opcoes(['1/6', '3/6'])))
    b = bloco(1, 'Escreva a probabilidade como fração, decimal e porcentagem.', tabela(['Evento', 'Fração', 'Decimal', '%'], [
        ['cara numa moeda', '1/2', '0,5', '50%'], ['número par num dado', '', '', ''], ['bola azul (2 azuis, 3 vermelhas)', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Jogue uma moeda 20 vezes e anote. Quantas caras saíram? Ficou perto de 50%?', tabela(['Cara', 'Coroa'], [['', '']]))
    c = bloco(1, 'Num saco há 4 fichas azuis, 5 vermelhas e 1 verde.', frases(['Probabilidade de vermelha (fração, decimal e %):', 'De não sair azul:'])) + bloco(
        2, 'Faça 40 sorteios com reposição e registre. Compare a frequência com a probabilidade calculada.', tabela(['Cor', 'Vezes', 'Frequência (%)', 'Probabilidade (%)'], [['azul', '', '', ''], ['vermelha', '', '', ''], ['verde', '', '', '']])) + bloco(
        3, 'Por que, com mais sorteios, os resultados ficam mais perto da probabilidade?', linhas(1))
    return h6(
        'probabilidade-e-experimentos', 'Probabilidade e experimentos', 'EF06MA30',
        'Calcular a probabilidade de um evento como fração, decimal e porcentagem e comparar com o resultado de experimentos repetidos.',
        'Moedas, dados, sacos com fichas coloridas, planilha (opcional).',
        ['Calcule a chance antes do experimento.',
         'Faça muitos sorteios e registre as frequências.',
         'Junte os resultados da turma e compare com a probabilidade.',
         'Na versão C, o estudante compara frequência e probabilidade e explica.'],
        ['Faça o experimento com objetos reais. Uma representação por vez (fração primeiro).',
         'Tabela de registro sempre igual. Avise quantos sorteios serão.',
         'Campeonato da turma: quem chega mais perto da previsão.'],
        ['Bloco 1: 1 em 4; 1 em 2. Bloco 2: 1/6.',
         'Bloco 1: 1/2, 0,5, 50%; 2/5, 0,4, 40%. Bloco 2: registro pessoal.',
         'Bloco 1: 5/10, 0,5, 50%; 6/10 (60%). Bloco 2: registro pessoal. Bloco 3: com muitas repetições, a sorte de cada sorteio se equilibra.'],
        a, b, c)


def elementos_grafico():
    graf = grafico_barras(['carro', 'ônibus', 'a pé', 'bicicleta'], [6, 9, 12, 3], 12, celula=14, gap=60)
    a = bloco(1, 'Como os estudantes vêm à escola. Qual meio tem mais estudantes? Circule.', item(graf, opcoes(['a pé', 'carro'])), 'Fonte: pesquisa da turma, 2026.') + bloco(
        2, 'Quantos vêm de bicicleta? Circule.', item(opcoes([3, 6])))
    b = bloco(1, 'Olhe o gráfico e complete.', item(graf) + frases(['Título (escreva um):', 'Variável:', 'O que o eixo vertical mostra:', 'Frequência de ônibus:']), 'Fonte: pesquisa da turma, 2026.') + bloco(
        2, 'Quantos estudantes responderam?', linhas(1))
    c = bloco(1, 'Temperatura média (°C) em uma cidade.', item(grafico_linha(['jan', 'mar', 'mai', 'jul', 'set', 'nov'], [26, 24, 17, 13, 17, 23], 30, 5, 480, 190, '°'))) + frases([
        'Qual é a variável e qual o tipo de gráfico?', 'Que informação falta para o gráfico ficar completo?', 'Em que mês fez mais frio?']) + bloco(
        2, 'Procure um gráfico numa notícia e anote título, eixos, legenda, fonte e data.', linhas(2))
    return h6(
        'elementos-de-um-grafico', 'Elementos de um gráfico', 'EF06MA31',
        'Identificar variáveis, frequências e os elementos de um gráfico: título, eixos, legendas, fonte e data.',
        'Gráficos de jornais e revistas, marca-texto, régua.',
        ['Mostre um gráfico de notícia e marque cada elemento com uma cor.',
         'Pergunte: qual é a variável? Qual a frequência de cada categoria?',
         'Mostre um gráfico sem título e discuta o que falta.',
         'Na versão C, o estudante analisa um gráfico de linha e um de notícia.'],
        ['Comece por gráficos de colunas com poucas categorias.',
         'Use sempre a mesma lista: título, eixos, legenda, fonte, data.',
         'Caça a gráficos em jornais e revistas da biblioteca.'],
        ['Bloco 1: a pé. Bloco 2: 3.',
         'Bloco 1: por exemplo "Como vamos à escola"; meio de transporte; número de estudantes; 9. Bloco 2: 30.',
         'Bloco 1: temperatura média por mês, gráfico de linha; título com a cidade, fonte e data; julho. Bloco 2: resposta pessoal.'],
        a, b, c)


def dados_da_midia():
    a = bloco(1, 'Lixo reciclado na escola (kg). Em que mês reciclamos mais? Circule.', item(grafico_barras(['mar', 'abr', 'mai'], [4, 6, 9], 10, celula=18), opcoes(['maio', 'março'])),
              'Cada quadradinho vale 1 kg.') + bloco(
        2, 'A reciclagem aumentou ou diminuiu? Circule.', item(opcoes(['aumentou', 'diminuiu'])))
    b = bloco(1, 'Água gasta por dia numa casa (litros).', tabela(['Uso', 'Litros'], [['banho', '90'], ['descarga', '60'], ['louça', '30'], ['outros', '20']])) + frases([
        'Qual uso gasta mais?', 'Quanto a casa gasta por dia?', 'Se o banho for 5 minutos mais curto e gastar 45 L, quanto economiza por semana?']) + bloco(
        2, 'Escreva uma conclusão com uma sugestão para economizar água.', linhas(2))
    c = bloco(1, 'Acidentes de trânsito numa cidade, por ano.', item(grafico_linha(['2020', '2021', '2022', '2023', '2024', '2025'], [480, 420, 450, 390, 360, 330], 500, 100, 480, 190))) + frases([
        'O que aconteceu de 2020 a 2025?', 'Em quanto caiu, em porcentagem aproximada?']) + bloco(
        2, 'Escreva um texto curto com três conclusões e uma pergunta que o gráfico não responde.', linhas(3))
    return h6(
        'dados-da-midia-e-conclusoes', 'Dados da mídia e conclusões', 'EF06MA32',
        'Interpretar dados de pesquisas sobre meio ambiente, trânsito e consumo em tabelas e gráficos e escrever conclusões.',
        'Notícias com gráficos, contas de água e luz, calculadora.',
        ['Leve uma notícia com gráfico sobre um tema do bairro.',
         'Leia o gráfico com a turma e anote os dados principais.',
         'Discuta o que o gráfico mostra e o que ele não mostra.',
         'Na versão C, o estudante escreve conclusões e uma pergunta nova.'],
        ['Use temas do dia a dia da turma. Uma pergunta por vez.',
         'Roteiro fixo de leitura: tema, dados, maior, menor, conclusão.',
         'Debate curto: o que a escola pode fazer com esses dados?'],
        ['Bloco 1: maio. Bloco 2: aumentou.',
         'Bloco 1: banho; 200 L; 315 L por semana. Bloco 2: resposta pessoal.',
         'Bloco 1: os acidentes diminuíram, com uma alta em 2022; cerca de 30% (de 480 para 330). Bloco 2: resposta pessoal.'],
        a, b, c)


def pesquisa_planilha():
    a = bloco(1, 'Pergunte a 10 colegas: qual seu passatempo preferido? Faça um risquinho.', tabela(['Passatempo', 'Risquinhos', 'Total'], [['jogos', '', ''], ['esporte', '', ''], ['leitura', '', ''], ['música', '', '']])) + bloco(
        2, 'Pinte o gráfico com os totais.', item(grafico_barras(['jogos', 'esporte', 'leitura', 'música'], None, 10, vazio=True, celula=16, gap=40)))
    b = bloco(1, 'Planeje e registre uma pesquisa com 10 colegas: tempo de tela por dia (horas) e atividade preferida.', tabela(['Colega', 'Horas de tela', 'Atividade'], [['', '', '']] * 10)) + bloco(
        2, 'Passe os dados para uma planilha, faça um gráfico e escreva uma conclusão.', linhas(2))
    c = bloco(1, 'Planeje uma pesquisa sobre uma prática da turma ou do bairro.', frases(['Tema:', 'Perguntas (uma de categoria e uma de número):', 'Quem e quantos vão responder:'])) + bloco(
        2, 'Organize os dados numa planilha, faça dois tipos de gráfico e cole ou desenhe aqui.', caixa_desenho('44mm')) + bloco(
        3, 'Escreva o relatório da pesquisa: o que foi perguntado, o que descobriu e o que sugere.', linhas(3))
    return h6(
        'pesquisa-com-planilha-eletronica', 'Pesquisa com planilha eletrônica', 'EF06MA33',
        'Planejar e coletar dados de uma pesquisa e usar planilhas eletrônicas para organizar e representar em tabelas, gráficos e texto.',
        'Prancheta, computador ou tablet com planilha, projetor (opcional).',
        ['Escolha com a turma um tema e as perguntas.',
         'Colete os dados na tabela de papel.',
         'Digite na planilha, calcule totais e gere o gráfico.',
         'Na versão C, o estudante planeja a pesquisa inteira e escreve o relatório.'],
        ['Uma pergunta só, com poucas opções. Planilha já pronta para preencher.',
         'Mostre o passo a passo da planilha com prints, sempre na mesma ordem.',
         'Deixe cada estudante ser o entrevistador de um grupo, com tempo.'],
        ['Bloco 1: registro pessoal, total 10. Bloco 2: colunas com os totais.',
         'Bloco 1 e 2: registro e conclusão pessoais.',
         'Bloco 1 a 3: resposta pessoal.'],
        a, b, c)


def fluxograma_relacoes():
    a = bloco(1, 'A cidade A liga com B e B liga com C. Para ir de A até C, passo por qual? Circule.', grade([
        item(cx('A → B → C'), opcoes(['B', 'nenhuma'], certa='B'), exemplo=True)], 1)) + bloco(
        2, 'Na escola, quem fica acima do professor? Circule.', item(cx('diretora → coordenadora → professor'), opcoes(['coordenadora', 'estudante'])))
    b = bloco(1, 'Desenhe o esquema: A liga com B e C; B liga com D; C liga com D e E.', caixa_desenho('36mm')) + bloco(
        2, 'Responda.', frases(['Para ir de A até E, por onde passo?', 'Quantos caminhos diferentes há de A até D?']))
    c = bloco(1, 'Monte o organograma de uma empresa: 1 diretor, 2 gerentes e 2 funcionários para cada gerente.', caixa_desenho('40mm')) + bloco(
        2, 'Responda.', frases(['Quantas pessoas há na empresa?', 'Quem responde ao diretor diretamente?'])) + bloco(
        3, 'Desenhe um fluxograma da rotina da manhã com pelo menos uma pergunta (sim ou não).', caixa_desenho('34mm'))
    return h6(
        'fluxogramas-e-relacoes', 'Fluxogramas e relações', 'EF06MA34',
        'Interpretar e construir fluxogramas e esquemas simples que mostram relações, como estradas entre cidades e hierarquias.',
        'Barbante, cartões com nomes de cidades, mapa rodoviário simples.',
        ['Monte com cartões e barbante as ligações entre cidades.',
         'Pergunte: por onde passo? Quantos caminhos há?',
         'Mostre um organograma da escola.',
         'Na versão C, o estudante monta um organograma e um fluxograma de rotina.'],
        ['Use cartões e barbante. Poucas ligações.',
         'Use sempre caixas e setas do mesmo jeito.',
         'Desafio: achar o caminho mais curto entre duas cidades.'],
        ['Bloco 1: B. Bloco 2: coordenadora.',
         'Bloco 1: esquema desenhado. Bloco 2: por C; 2 caminhos (A, B, D e A, C, D).',
         'Bloco 1: diretor, 2 gerentes, 4 funcionários. Bloco 2: 7 pessoas; os 2 gerentes. Bloco 3: resposta pessoal.'],
        a, b, c)


FICHAS = [naturais_decimais_reta, sistema_decimal, calculos_estrategias, algoritmo_fluxograma, primos_divisibilidade, problemas_multiplos_divisores,
          fracoes_comparar, fracao_decimal, fracao_de_quantidade, adicao_subtracao_fracoes, estimar_arredondar, igualdade_dois_membros, partilha_razao,
          pares_ordenados, poligonos_regulares, classificar_triangulos, classificar_quadrilateros, figuras_semelhantes, paralelas_perpendiculares,
          algoritmo_passo_a_passo, problemas_grandezas, abertura_angulo, angulos_situacoes_reais, medir_transferidor, plantas_baixas,
          perimetro_area_quadrado, probabilidade_experimentos, elementos_grafico, dados_da_midia, pesquisa_planilha, fluxograma_relacoes]
