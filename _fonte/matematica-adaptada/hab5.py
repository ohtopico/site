"""5º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import grupo, svg  # noqa: F401
from desenhos2 import barra_fracao, grafico_barras, grafico_linha, malha, pizza_fracao, planificacao, poligono_svg, pote, regular, roleta, solido
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, problema, resposta, tabela
from ano3 import frases, ligar
from ano4 import grafico_escala, n, reta_fracao
from ano5 import empilhado
from hab3 import cx, fila_h, pilha, probs, rot


def h5(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='30 a 45 minutos'):
    return ficha(slug, titulo, '5º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ordens6(linha):
    return tabela(['CM', 'DM', 'UM', 'C', 'D', 'U'], [linha])


def ret(x, y, c, l):
    return [(i, j) for i in range(x, x + c) for j in range(y, y + l)]


TRI = regular(3, 34, rotulo='triângulo')
QUAD = regular(4, 34, -45, rotulo='quadrado')
PENT = regular(5, 34, rotulo='pentágono')
HEX = regular(6, 34, 0, rotulo='hexágono')
RET = poligono_svg([(4, 14), (104, 14), (104, 64), (4, 64)], rotulo='retângulo')
TRAP = poligono_svg([(24, 10), (80, 10), (104, 64), (4, 64)], rotulo='trapézio')


# ---------- Números ----------

def numeros_ate_999999():
    a = bloco(1, 'Leia o quadro de ordens e circule o número.', grade([
        item(ordens6(['1', '2', '5', '3', '0', '0']), opcoes([n(125300), n(12530)], certa=n(125300)), exemplo=True),
        item(ordens6(['3', '0', '4', '0', '0', '7']), opcoes([n(304007), n(34007)]))], 1), 'CM é centena de milhar.') + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes([n(200000), n(99999)])), item(opcoes([n(450100), n(451000)]))], 2))
    b = bloco(1, 'Escreva por extenso.', frases([f'{n(250000)}:', f'{n(708040)}:'])) + bloco(
        2, 'Escreva &gt; ou &lt;.', grade([item(cx(f'{n(125000)} {resposta("&lt;")} {n(152000)}'), exemplo=True), item(cx(f'{n(390800)} {VAZIO} {n(309800)}')),
                                          item(cx(f'{n(600060)} {VAZIO} {n(606000)}')), item(cx(f'{n(99999)} {VAZIO} {n(100000)}'))], 2))
    c = bloco(1, 'Ordene do maior para o menor.', frases([f'{n(487200)}, {n(478200)}, {n(847200)}, {n(482700)}:'])) + bloco(
        2, 'Escreva com algarismos.', frases(['quinhentos mil e trinta:', 'novecentos e nove mil e noventa:'])) + bloco(
        3, 'Leia e resolva.', problema(f'Uma cidade tem {n(325480)} habitantes e outra tem {n(352480)}. Qual é maior? Quantos habitantes a mais?', '16mm'))
    return h5(
        'ler-escrever-e-ordenar-numeros-ate-999999', 'Ler, escrever e ordenar números até 999 999', 'EF05MA01',
        'Ler, escrever, comparar e ordenar números naturais até a centena de milhar, com o quadro de ordens.',
        'Quadro de ordens com 6 casas, fichas com algarismos, notícias com população de cidades.',
        ['Monte números no quadro de ordens e leia separando a classe dos milhares.',
         'Compare dois números começando pela ordem maior.',
         'Mostre que um zero no meio muda o valor do número.',
         'Na versão C, o estudante ordena, escreve com algarismos e resolve um problema.'],
        ['Use o quadro de ordens com cores fixas para cada classe. Comece com números redondos.',
         'Escreva sempre com o espaço separando os milhares. Leia junto, do mesmo jeito toda vez.',
         'Jogo rápido: sortear 6 fichas e montar o maior e o menor número possível.'],
        [f'Bloco 1: {n(125300)}; {n(304007)}. Bloco 2: {n(200000)}; {n(451000)}.',
         'Bloco 1: duzentos e cinquenta mil; setecentos e oito mil e quarenta. Bloco 2: &lt;; &gt;; &lt;; &lt;.',
         f'Bloco 1: {n(847200)}, {n(487200)}, {n(482700)}, {n(478200)}. Bloco 2: {n(500030)}; {n(909090)}. Bloco 3: a segunda, {n(27000)} habitantes a mais.'],
        a, b, c)


def decimais_reta():
    a = bloco(1, 'Qual número está marcado na reta? Circule.', grade([
        item(reta_fracao(10, {5: '?'}, 460, ini='0', fim='1'), opcoes(['0,5', '5'], certa='0,5'), exemplo=True),
        item(reta_fracao(10, {3: '?'}, 460, ini='0', fim='1'), opcoes(['0,3', '0,7']))], 1), 'Cada pedacinho vale 0,1 (um décimo).') + bloco(
        2, 'Qual é maior? Circule.', item(opcoes(['0,8', '0,2'])))
    b = bloco(1, 'Escreva os números marcados.', item(reta_fracao(10, {2: 'A', 6: 'B', 9: 'C'}, 520, ini='2', fim='3')) + frases(['A =', 'B =', 'C ='])) + bloco(
        2, 'Escreva com algarismos.', frases(['três décimos:', 'um inteiro e vinte e cinco centésimos:', 'quatro centésimos:']))
    c = bloco(1, 'Ordene do menor para o maior.', frases(['0,7; 0,07; 0,75; 0,5:'])) + bloco(
        2, 'Marque 1,5 e 2,8 na reta.', item(reta_fracao(10, None, 520, ini='1', fim='3'))) + bloco(
        3, 'Por que 0,5 é maior que 0,35, mesmo tendo menos algarismos?', linhas(2))
    return h5(
        'decimais-na-reta-numerica', 'Decimais na reta numérica', 'EF05MA02',
        'Ler, escrever e ordenar números decimais, localizando décimos e centésimos na reta numérica.',
        'Fita métrica, reta numérica grande no chão, cédulas e moedas de brincadeira.',
        ['Mostre que 1 real tem 10 moedas de 10 centavos: cada uma é 0,1 do real.',
         'Divida a reta entre 0 e 1 em 10 partes e conte os décimos.',
         'Compare decimais pelo inteiro, depois pelos décimos, depois pelos centésimos.',
         'Na versão C, o estudante ordena, marca na reta e explica uma comparação.'],
        ['Ande na reta do chão contando "zero vírgula um, zero vírgula dois...".',
         'Use sempre a mesma reta com 10 pedaços iguais. Leia a vírgula como "inteiros e décimos".',
         'Use dinheiro: 0,5 é meio real, 0,25 são 25 centavos.'],
        ['Bloco 1: 0,5; 0,3. Bloco 2: 0,8.',
         'Bloco 1: A = 2,2; B = 2,6; C = 2,9. Bloco 2: 0,3; 1,25; 0,04.',
         'Bloco 1: 0,07; 0,5; 0,7; 0,75. Bloco 2: 1,5 no meio entre 1 e 2; 2,8 perto do 3. Bloco 3: 0,5 = 0,50, e 50 centésimos é mais que 35 centésimos.'],
        a, b, c)


def fracoes_maiores_menores():
    a = bloco(1, 'A parte pintada é menor ou maior que um inteiro? Circule.', grade([
        item(pizza_fracao(4, 3, 90), '<p class="legenda">3/4</p>' + opcoes(['menor', 'maior'], certa='menor'), exemplo=True),
        item(fila_h(pizza_fracao(4, 4, 80), pizza_fracao(4, 1, 80)), '<p class="legenda">5/4</p>' + opcoes(['menor', 'maior']))], 2), 'Um inteiro é o círculo todo pintado.') + bloco(
        2, 'Quanto está pintado? Circule.', item(barra_fracao(5, 2, 260, 34), opcoes(['2/5', '5/2'])))
    b = bloco(1, 'Escreva a fração pintada.', grade([
        item(barra_fracao(3, 2, 200, 30), resposta(largura='18mm')), item(barra_fracao(6, 6, 200, 30) + barra_fracao(6, 1, 200, 30), resposta(largura='18mm')),
        item(pizza_fracao(8, 5, 80), resposta(largura='18mm'))], 3)) + bloco(
        2, 'Divisão como fração. Complete.', frases(['3 pizzas para 4 pessoas: cada uma recebe', '7 chocolates para 2 crianças: cada uma recebe'])) + bloco(
        3, 'Pinte 7/4.', item(fila_h(pizza_fracao(4, 0, 80), pizza_fracao(4, 0, 80))))
    c = bloco(1, 'Escreva menor que 1, igual a 1 ou maior que 1.', tabela(['Fração', 'Comparação com 1'], [['9/5', ''], ['4/7', ''], ['6/6', ''], ['11/3', '']])) + bloco(
        2, 'Escreva 13/4 como inteiros e fração.', linhas(1)) + bloco(
        3, 'Leia e resolva.', problema('Cinco amigos dividiram igualmente 3 barras de cereal. Que fração de barra cada um recebeu? É mais ou menos que uma barra?', '16mm'))
    return h5(
        'fracoes-menores-e-maiores-que-o-inteiro', 'Frações menores e maiores que o inteiro', 'EF05MA03',
        'Representar frações menores e maiores que a unidade, como parte de um todo e como resultado de uma divisão.',
        'Círculos e barras de papel recortados em partes iguais, massinha, pizzas de papel.',
        ['Corte círculos de papel em quartos e monte frações com os pedaços.',
         'Junte pedaços até passar de um inteiro e escreva a fração (5/4).',
         'Mostre que 3 dividido por 4 é o mesmo que 3/4.',
         'Na versão C, o estudante compara com o inteiro e resolve um problema de divisão.'],
        ['Use pedaços concretos antes do desenho. Diga "de quantas partes, quantas pintadas".',
         'Use sempre a mesma cor para o inteiro completo. Uma fração por vez.',
         'Desafio com tempo: montar a fração sorteada com os pedaços de papel.'],
        ['Bloco 1: menor; maior. Bloco 2: 2/5.',
         'Bloco 1: 2/3; 7/6; 5/8. Bloco 2: 3/4 de pizza; 7/2 (3 e meio). Bloco 3: um círculo inteiro e 3 quartos do outro.',
         'Bloco 1: maior; menor; igual; maior. Bloco 2: 3 inteiros e 1/4. Bloco 3: 3/5 de barra, menos que uma barra.'],
        a, b, c)


def equivalentes():
    a = bloco(1, 'As partes pintadas têm o mesmo tamanho? Circule.', grade([
        item(barra_fracao(2, 1, 220, 30) + barra_fracao(4, 2, 220, 30), '<p class="legenda">1/2 e 2/4</p>' + opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(barra_fracao(3, 1, 220, 30) + barra_fracao(4, 1, 220, 30), '<p class="legenda">1/3 e 1/4</p>' + opcoes(['sim', 'não']))], 2), 'Compare as barras uma em cima da outra.') + bloco(
        2, 'Pinte na segunda barra o mesmo tanto da primeira.', item(pilha(barra_fracao(3, 1, 300, 34), barra_fracao(6, 0, 300, 34))))
    b = bloco(1, 'Complete.', grade([cx(f'1/2 = {VAZIO}/6'), cx(f'2/3 = {VAZIO}/9'), cx(f'3/5 = 6/{VAZIO}'), cx(f'1/4 = {VAZIO}/8')], 2),
              'Multiplique em cima e embaixo pelo mesmo número.') + bloco(
        2, 'Ligue as frações equivalentes.', ligar([('1/2', '6/8'), ('3/4', '2/6'), ('1/3', '5/10')]))
    c = bloco(1, 'Escreva três frações equivalentes a cada uma.', frases(['2/5:', '3/4:'])) + bloco(
        2, 'Simplifique.', frases(['8/12 =', '10/15 ='])) + bloco(
        3, 'Ana comeu 2/8 da pizza e Leo comeu 1/4. Quem comeu mais? Explique.', linhas(2))
    return h5(
        'encontrar-fracoes-equivalentes', 'Encontrar frações equivalentes', 'EF05MA04',
        'Reconhecer frações que representam a mesma quantidade, com barras, dobraduras e multiplicação.',
        'Tiras de papel do mesmo tamanho para dobrar, barras de frações, lápis de cor.',
        ['Dobre uma tira ao meio e pinte metade. Dobre de novo e conte os quartos pintados.',
         'Registre: 1/2 = 2/4 = 4/8.',
         'Mostre a regra: multiplicar em cima e embaixo pelo mesmo número.',
         'Na versão C, o estudante escreve equivalentes, simplifica e compara.'],
        ['Use as tiras dobradas lado a lado, sempre do mesmo tamanho.',
         'Mostre a regra com setas e o mesmo número dos dois lados.',
         'Jogo da memória com pares de frações equivalentes.'],
        ['Bloco 1: sim; não. Bloco 2: 2 partes pintadas de 6.',
         'Bloco 1: 3; 6; 10; 2. Bloco 2: 1/2 com 5/10; 3/4 com 6/8; 1/3 com 2/6.',
         'Bloco 1: por exemplo 4/10, 6/15, 8/20; 6/8, 9/12, 12/16. Bloco 2: 2/3; 2/3. Bloco 3: comeram o mesmo, 2/8 = 1/4.'],
        a, b, c)


def comparar_fracoes_decimais():
    a = bloco(1, 'Qual é maior? Circule.', grade([
        item(barra_fracao(4, 3, 200, 30) + barra_fracao(4, 1, 200, 30), opcoes(['3/4', '1/4'], certa='3/4'), exemplo=True),
        item(barra_fracao(2, 1, 200, 30) + barra_fracao(5, 1, 200, 30), opcoes(['1/2', '1/5']))], 2), 'Compare o tamanho da parte pintada.') + bloco(
        2, 'Meio real é o mesmo que: Circule.', item(opcoes(['R$ 0,50', 'R$ 0,05'])))
    b = bloco(1, 'Escreva &gt;, &lt; ou =.', grade([item(cx(f'1/2 {resposta("=")} 0,5'), exemplo=True), item(cx(f'1/4 {VAZIO} 0,4')),
                                                item(cx(f'0,7 {VAZIO} 3/4')), item(cx(f'2/10 {VAZIO} 0,2'))], 2)) + bloco(
        2, 'Marque na reta: 0,5, 1/4 e 0,9.', item(reta_fracao(20, None, 520)))
    c = bloco(1, 'Ordene do menor para o maior.', frases(['3/4; 0,6; 1/2; 0,8:'])) + bloco(
        2, 'Leia e resolva.', problema('Bia correu 3/5 da pista e Rui correu 0,7 da pista. Quem correu mais?', '16mm')) + bloco(
        3, 'Escreva uma fração e um decimal que fiquem entre 0,3 e 0,5.', linhas(1))
    return h5(
        'comparar-fracoes-e-decimais', 'Comparar frações e decimais', 'EF05MA05',
        'Comparar e ordenar números racionais positivos escritos como fração ou decimal, usando a reta numérica.',
        'Reta numérica de 0 a 1 grande, barras de frações, moedas de brincadeira.',
        ['Mostre que 1/2, 0,5 e 50 centavos são a mesma quantidade.',
         'Coloque frações e decimais na mesma reta para comparar.',
         'Transforme a fração em décimos quando der: 3/5 = 6/10 = 0,6.',
         'Na versão C, o estudante ordena, resolve e cria números entre dois decimais.'],
        ['Comece com metades e quartos, que aparecem no dinheiro e nas receitas.',
         'Use uma reta só, sempre com 0 e 1 nas pontas e as mesmas cores.',
         'Corrida na reta do chão: quem está mais longe do zero?'],
        ['Bloco 1: 3/4; 1/2. Bloco 2: R$ 0,50.',
         'Bloco 1: =; &lt;; &lt;; =. Bloco 2: 1/4 no 5º traço, 0,5 no meio, 0,9 no 18º traço.',
         'Bloco 1: 1/2; 0,6; 3/4; 0,8. Bloco 2: Rui (0,7 &gt; 0,6). Bloco 3: por exemplo 0,4 e 2/5.'],
        a, b, c)


def porcentagens():
    a = bloco(1, 'Quanto está pintado? Circule.', grade([
        item(pizza_fracao(2, 1, 90), opcoes(['50%', '10%'], certa='50%'), exemplo=True),
        item(pizza_fracao(4, 1, 90), opcoes(['25%', '75%'])),
        item(pizza_fracao(1, 1, 90), opcoes(['100%', '50%']))], 3), '100% é o inteiro, 50% é a metade.') + bloco(
        2, 'Metade de 20 é: Circule.', item(opcoes([10, 5])))
    b = bloco(1, 'Ligue a porcentagem à fração.', ligar([('10%', '3/4'), ('25%', 'metade'), ('50%', '1/10'), ('75%', '1/4')])) + bloco(
        2, 'Calcule.', frases(['50% de 40 =', '25% de 40 =', '10% de 40 =', '75% de 40 =']))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma blusa custa R$ 80 e está com 25% de desconto. Quanto vou pagar?', '18mm'),
        problema('Na turma de 30 estudantes, 10% faltaram. Quantos vieram?', '18mm')], 2)) + bloco(
        2, 'Pinte 75% da malha.', item(malha(10, 2, 26))) + bloco(
        3, 'Explique por que 50% de 100 e 50% de 10 são diferentes.', linhas(1))
    return h5(
        'porcentagens-10-25-50-75-100', 'Porcentagens: 10%, 25%, 50%, 75% e 100%', 'EF05MA06',
        'Associar 10%, 25%, 50%, 75% e 100% à décima parte, à quarta parte, à metade, a três quartos e ao inteiro.',
        'Folhetos de mercado com descontos, círculos de papel, malha de 100 quadradinhos.',
        ['Mostre 100% como o inteiro e 50% como a metade com um círculo de papel.',
         'Dobre o círculo de novo: 25% é um quarto, 75% são três quartos.',
         'Use dinheiro: 10% de R$ 50 é a décima parte, R$ 5.',
         'Na versão C, o estudante resolve problemas de desconto e explica.'],
        ['Use o círculo de papel dobrado em todas as atividades. Uma porcentagem por vez.',
         'Mostre a tabela fixa: 100% inteiro, 50% metade, 25% quarto, 10% décimo.',
         'Mercadinho na sala com etiquetas de desconto.'],
        ['Bloco 1: 50%; 25%; 100%. Bloco 2: 10.',
         'Bloco 1: 10% = 1/10; 25% = 1/4; 50% = metade; 75% = 3/4. Bloco 2: 20; 10; 4; 30.',
         'Bloco 1: R$ 60; 27 vieram. Bloco 2: 15 quadradinhos. Bloco 3: a metade depende do total.'],
        a, b, c)


# ---------- Contagem e álgebra ----------

def agrupamentos():
    a = bloco(1, 'Sanduíche: pão branco ou integral, com queijo ou presunto. Quantos tipos? Circule.', item(tabela(['Pão', 'Recheio'], [
        ['branco', 'queijo'], ['branco', 'presunto'], ['integral', 'queijo'], ['integral', 'presunto']]), opcoes([4, 2], certa=4)), 'Cada linha é um sanduíche diferente.') + bloco(
        2, 'Com as letras A e B, quantas duplas diferentes? (AB e BA são diferentes) Circule.', item(opcoes([2, 1])))
    b = bloco(1, 'Sorvete: 3 sabores (morango, uva, coco) e 2 casquinhas (simples, chocolate). Complete a tabela.', tabela(
        ['', 'simples', 'chocolate'], [['morango', 'morango simples', ''], ['uva', '', ''], ['coco', '', '']])) + bloco(
        2, 'Quantos sorvetes diferentes?', linhas(1)) + bloco(
        3, 'Escreva todos os números de 2 algarismos diferentes com 1, 2 e 3.', linhas(1))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma loja tem 4 camisetas e 3 bermudas. Quantas roupas diferentes posso montar?', '18mm'),
        problema('Na final, 4 times jogam todos contra todos uma vez. Quantos jogos?', '18mm')], 2)) + bloco(
        2, 'Faça uma árvore de possibilidades para jogar uma moeda duas vezes.', caixa_desenho('30mm'))
    return h5(
        'listar-todos-os-agrupamentos', 'Listar todos os agrupamentos', 'EF05MA09',
        'Resolver problemas de contagem listando todas as possibilidades com tabelas, listas e árvores.',
        'Roupinhas de papel para combinar, fichas com letras e números, moedas.',
        ['Monte combinações com roupinhas de papel e registre cada uma.',
         'Organize numa tabela de dupla entrada para não esquecer nenhuma.',
         'Mostre a árvore de possibilidades e a multiplicação (3 × 2).',
         'Na versão C, o estudante resolve problemas e faz uma árvore.'],
        ['Use objetos reais e poucos itens (2 × 2). Uma combinação por linha.',
         'Siga sempre a mesma ordem para listar: fixe o primeiro e troque o segundo.',
         'Desafio: descobrir quem acha todas as combinações primeiro.'],
        ['Bloco 1: 4. Bloco 2: 2 (AB e BA).',
         'Bloco 1: 6 combinações. Bloco 2: 6. Bloco 3: 12, 13, 21, 23, 31, 32.',
         'Bloco 1: 12 roupas; 6 jogos. Bloco 2: cara-cara, cara-coroa, coroa-cara, coroa-coroa.'],
        a, b, c)


def mesma_operacao():
    a = bloco(1, 'Fiz a mesma coisa dos dois lados. Continua igual? Circule.', grade([
        item(cx('4 + 6 = 10'), '<p class="conta">4 + 6 + 3 = 10 + 3</p>' + opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(cx('5 × 2 = 10'), '<p class="conta">5 × 2 × 2 = 10</p>' + opcoes(['sim', 'não']))], 2), 'Na segunda, o × 2 entrou só de um lado.') + bloco(
        2, 'Se 8 = 8, então 8 – 2 é igual a: Circule.', item(opcoes(['8 – 2', '8'])))
    b = bloco(1, 'Complete para continuar igual.', grade([cx(f'12 + 3 = 15, então 12 + 3 + 5 = 15 + {VAZIO}'), cx(f'20 = 4 × 5, então 20 × 2 = 4 × 5 × {VAZIO}'),
                                                         cx(f'30 – 6 = 24, então 30 – 6 – 4 = 24 – {VAZIO}'), cx(f'18 = 6 × 3, então 18 ÷ 3 = 6 × 3 ÷ {VAZIO}')], 1)) + bloco(
        2, 'Verdadeiro ou falso?', frases(['Se 7 + 5 = 12, então 7 + 5 – 5 = 12 – 5', 'Se 3 × 4 = 12, então 3 × 4 × 2 = 12 × 3']))
    c = bloco(1, 'Leia e resolva.', problema('Numa balança equilibrada, de um lado há 3 sacos iguais e 4 kg; do outro, 19 kg. Tirando 4 kg dos dois lados, quanto pesa cada saco?', '20mm')) + bloco(
        2, 'Explique o que acontece com uma igualdade quando multiplicamos só um dos lados por 2.', linhas(2))
    return h5(
        'mesma-operacao-nos-dois-lados', 'Mesma operação nos dois lados', 'EF05MA10',
        'Concluir, investigando, que uma igualdade continua verdadeira quando fazemos a mesma operação nos dois lados.',
        'Balança de dois pratos (ou de cabide), pesinhos iguais, fichas com números.',
        ['Equilibre a balança e escreva a igualdade.',
         'Coloque o mesmo peso nos dois lados: continua equilibrada.',
         'Faça o teste com multiplicação e divisão: dobre os dois lados.',
         'Na versão C, o estudante usa a ideia para descobrir um valor e explica.'],
        ['Use a balança real em toda atividade. Uma operação por vez.',
         'Escreva a igualdade com as duas metades em cores diferentes, sempre iguais.',
         'Desafio: quem consegue desequilibrar e equilibrar de novo com uma só jogada?'],
        ['Bloco 1: sim; não. Bloco 2: 8 – 2.',
         'Bloco 1: 5; 2; 4; 3. Bloco 2: verdadeiro; falso.',
         'Bloco 1: 5 kg cada saco. Bloco 2: a igualdade deixa de ser verdadeira, o lado multiplicado fica maior.'],
        a, b, c)


def termo_desconhecido():
    a = bloco(1, 'Que número falta? Circule.', grade([
        item(cx(f'{resposta("6")} + 4 = 10'), opcoes([6, 14], certa=6), exemplo=True),
        item(cx(f'3 × {VAZIO} = 12'), opcoes([4, 9]))], 2)) + bloco(
        2, 'Que número falta? Circule.', item(cx(f'{VAZIO} – 5 = 10'), opcoes([15, 5])))
    b = bloco(1, 'Descubra o número que falta.', grade([cx(f'{VAZIO} + 125 = 400'), cx(f'8 × {VAZIO} = 96'), cx(f'{VAZIO} ÷ 6 = 15'), cx(f'500 – {VAZIO} = 280')], 2)) + bloco(
        2, 'Leia e resolva.', probs(['Pensei num número, somei 45 e deu 120. Que número pensei?', 'Comprei 6 cadernos iguais e paguei R$ 54. Quanto custou cada um?']))
    c = bloco(1, 'Descubra o número que falta.', frases(['2 × ___ + 5 = 31', '(___ – 10) ÷ 4 = 6'])) + bloco(
        2, 'Leia e resolva.', problema('A soma das idades de Lia e da mãe é 48. A mãe tem 36. Quantos anos tem Lia? Escreva a igualdade.', '16mm')) + bloco(
        3, 'Invente um problema com um número escondido e escreva a igualdade.', linhas(2))
    return h5(
        'igualdade-com-termo-desconhecido', 'Igualdade com termo desconhecido', 'EF05MA11',
        'Resolver problemas escritos como uma igualdade em que um dos números é desconhecido.',
        'Balança de dois pratos, caixinhas que escondem objetos, fichas com números.',
        ['Esconda fichas numa caixinha e equilibre a balança para descobrir quantas são.',
         'Escreva a igualdade com um quadradinho no lugar do número escondido.',
         'Resolva usando a operação inversa e confira colocando o número no lugar.',
         'Na versão C, o estudante resolve igualdades com duas operações e inventa um problema.'],
        ['Use a caixinha real para o número escondido. Números pequenos primeiro.',
         'O quadradinho é sempre o número escondido. Confira toda vez trocando pelo número.',
         'Jogo "pensei num número" em dupla, com tempo.'],
        ['Bloco 1: 6; 4. Bloco 2: 15.',
         'Bloco 1: 275; 12; 90; 220. Bloco 2: 75; R$ 9.',
         'Bloco 1: 13; 34. Bloco 2: 12 anos (36 + ___ = 48). Bloco 3: resposta pessoal.'],
        a, b, c)


def proporcionalidade():
    a = bloco(1, 'Dobrei a receita. Quantos ovos? Circule.', grade([
        item(fila_h(grupo('ovo', 2, 2, 34), '<b>→</b>', grupo('ovo', 4, 4, 34)), '<p class="legenda">1 bolo: 2 ovos. 2 bolos:</p>' + opcoes([4, 3], certa=4), exemplo=True),
        item(grupo('leite', 3, 3, 34), '<p class="legenda">1 bolo: 3 copos de leite. 2 bolos:</p>' + opcoes([6, 5]))], 2)) + bloco(
        2, 'Um lápis custa R$ 2. Quanto custam 3 lápis? Circule.', item(opcoes(['R$ 6', 'R$ 5'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Pacotes', '1', '2', '3', '5', '10'], [['Figurinhas', '5', '', '', '', '']])) + bloco(
        2, 'Leia e resolva.', probs(['Para 4 pessoas uso 2 xícaras de arroz. E para 8 pessoas?', 'Um carro anda 12 km com 1 litro. Quantos km com 5 litros?']))
    c = bloco(1, 'Complete a tabela da receita.', tabela(['Ingrediente', '1 receita', 'metade', '3 receitas'], [['farinha (xícaras)', '4', '', ''], ['açúcar (xícaras)', '2', '', ''], ['ovos', '6', '', '']])) + bloco(
        2, 'Leia e resolva.', problema('3 cadernos custam R$ 27. Quanto custam 7 cadernos?', '16mm')) + bloco(
        3, 'Se dobrar as pessoas, sempre dobra a comida? Dê um exemplo.', linhas(1))
    return h5(
        'proporcionalidade-direta', 'Proporcionalidade: dobro, triplo e metade', 'EF05MA12',
        'Resolver problemas em que duas grandezas aumentam ou diminuem juntas na mesma proporção, como numa receita.',
        'Receitas impressas, copos medidores, fichas de dinheiro.',
        ['Leia uma receita e pergunte: e se fizermos duas?',
         'Monte uma tabela com 1, 2, 3 receitas e veja o padrão.',
         'Mostre a metade e o triplo na mesma tabela.',
         'Na versão C, o estudante calcula metade e triplo e resolve um problema com 3 para 7.'],
        ['Use ingredientes ou fichas reais e só o dobro no começo.',
         'Use sempre a tabela com setas "× 2" entre as colunas.',
         'Cozinha de verdade: dobrar uma receita de suco na sala.'],
        ['Bloco 1: 4; 6. Bloco 2: R$ 6.',
         'Bloco 1: 10, 15, 25, 50. Bloco 2: 4 xícaras; 60 km.',
         'Bloco 1: farinha 2 e 12; açúcar 1 e 6; ovos 3 e 18. Bloco 2: R$ 63. Bloco 3: resposta pessoal (por exemplo, o tempo de forno não dobra).'],
        a, b, c)


def partilha_desigual():
    a = bloco(1, 'Lia tem o dobro de Davi. Qual divisão está certa? Circule.', grade([
        item(fila_h(rot(grupo('estrela', 4, 4, 30), 'Lia'), rot(grupo('estrela', 2, 2, 30), 'Davi')), opcoes(['certa', 'errada'], certa='certa'), exemplo=True),
        item(fila_h(rot(grupo('estrela', 3, 3, 30), 'Lia'), rot(grupo('estrela', 3, 3, 30), 'Davi')), opcoes(['certa', 'errada']))], 2), 'Dobro é duas vezes mais.') + bloco(
        2, 'Divida 9 bolinhas: Ana fica com o dobro de Rui. Quantas Ana tem? Circule.', item(grupo('bola', 9, 9, 30), opcoes([6, 3])))
    b = bloco(1, 'Complete a tabela. A parte de Bia é o dobro da de Caio.', tabela(['Total', 'Caio', 'Bia'], [['12', '4', '8'], ['15', '', ''], ['30', '', ''], ['21', '', '']]),
              'A primeira linha é o exemplo. Divida o total em 3 partes iguais.') + bloco(
        2, 'Leia e resolva.', problema('Dois irmãos dividiram R$ 40. O mais velho ficou com R$ 10 a mais. Quanto cada um recebeu?', '16mm'))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Divida 60 figurinhas entre Léo e Ana de modo que Ana fique com o triplo de Léo.', '18mm'),
        problema('Numa turma de 28, há 6 meninas a mais que meninos. Quantos meninos?', '18mm')], 2)) + bloco(
        2, 'Desenhe barras para mostrar como dividir 50 em duas partes, uma o quádruplo da outra.', caixa_desenho('26mm'))
    return h5(
        'partilha-em-partes-desiguais', 'Partilha em partes desiguais', 'EF05MA13',
        'Resolver problemas de dividir uma quantidade em duas partes desiguais, como uma o dobro da outra.',
        'Fichas, tampinhas, tiras de papel para desenhar barras.',
        ['Divida fichas entre dois estudantes: um fica com o dobro.',
         'Desenhe barras: uma parte pequena e duas iguais a ela.',
         'Mostre que o total foi dividido em 3 partes iguais.',
         'Na versão C, o estudante resolve partilhas com triplo e com diferença.'],
        ['Use fichas reais e totais pequenos (6, 9, 12).',
         'Use sempre o desenho de barras com as mesmas cores para cada pessoa.',
         'Desafio: inventar uma partilha para o colega resolver.'],
        ['Bloco 1: certa; errada. Bloco 2: 6.',
         'Bloco 1: 5 e 10; 10 e 20; 7 e 14. Bloco 2: R$ 15 e R$ 25.',
         'Bloco 1: Léo 15, Ana 45; 11 meninos. Bloco 2: 10 e 40.'],
        a, b, c)


# ---------- Geometria ----------

def localizar_mapas():
    marcas = {(1, 1): 'E', (4, 2): 'P', (2, 4): 'M'}
    a = bloco(1, 'Onde está a escola (E)? Circule.', item(malha(6, 5, 40, marcas=marcas, rotulo='malha com escola E, praça P e mercado M'),
              opcoes(['coluna 2, linha 2', 'coluna 5, linha 3'])), 'Conte as colunas da esquerda para a direita e as linhas de cima para baixo.') + bloco(
        2, 'O que está na coluna 5, linha 3? Circule.', item(opcoes(['praça', 'mercado'])))
    b = bloco(1, 'Use a malha.', item(malha(6, 5, 40, marcas=marcas, caminho=[(1, 1), (4, 1), (4, 2)], rotulo='malha com caminho da escola até a praça')) + frases([
        'Descreva o caminho tracejado da escola até a praça:', 'Desenhe um caminho do mercado até a escola. Quantos quadradinhos?'])) + bloco(
        2, 'Escreva onde está o mercado.', linhas(1))
    c = bloco(1, 'Desenhe na malha a planta da sua sala: porta, quadro e sua mesa.', item(malha(8, 5, 36))) + bloco(
        2, 'Escreva as instruções para um colega ir da porta até a sua mesa, usando direita, esquerda, frente e quantidade de quadradinhos.', linhas(2))
    return h5(
        'localizar-em-mapas-e-malhas', 'Localizar em mapas e malhas', 'EF05MA14',
        'Usar mapas, plantas e malhas quadriculadas para localizar objetos e descrever caminhos.',
        'Mapa do bairro ou da escola, malha grande no chão, fita crepe.',
        ['Monte uma malha no chão com fita e coloque objetos em algumas casas.',
         'Diga a posição: coluna e linha.',
         'Descreva um caminho com direções e número de passos.',
         'Na versão C, o estudante desenha uma planta e escreve instruções.'],
        ['Ande na malha do chão antes de usar o papel. Uma instrução por vez.',
         'Use sempre a mesma ordem: primeiro a coluna, depois a linha.',
         'Caça ao tesouro com instruções escritas.'],
        ['Bloco 1: coluna 2, linha 2. Bloco 2: praça.',
         'Bloco 1: 3 para a direita e 1 para baixo; resposta pessoal. Bloco 2: coluna 3, linha 5.',
         'Bloco 1 e 2: resposta pessoal.'],
        a, b, c)


def movimentos_plano():
    pts = {(1, 1): 'A', (4, 3): 'B'}
    a = bloco(1, 'Qual ponto está em (4, 3)? Circule.', item(malha(5, 4, 44, marcas=pts, eixos=True, rotulo='plano com os pontos A e B'), opcoes(['B', 'A'])), 'Primeiro ande para a direita, depois para cima.') + bloco(
        2, 'Onde está o ponto A? Circule.', item(opcoes(['(1, 1)', '(4, 3)'])))
    b = bloco(1, 'O robô estava em (1, 2). Andou 3 para a direita e 2 para cima. Marque e escreva onde ele parou.', item(malha(6, 5, 40, marcas={(1, 2): 'R'}, eixos=True, rotulo='plano com o robô R')) + frases(['O robô parou em:'])) + bloco(
        2, 'Descreva o movimento de (5, 4) até (2, 1).', linhas(1))
    c = bloco(1, 'Marque e ligue A (1, 1), B (4, 1), C (4, 3). Depois mova o triângulo 2 para a direita e desenhe de novo.', item(malha(8, 5, 36, eixos=True, rotulo='plano vazio'))) + bloco(
        2, 'Escreva as novas coordenadas dos vértices.', linhas(1)) + bloco(
        3, 'O que mudou e o que não mudou no triângulo?', linhas(1))
    return h5(
        'movimentos-no-plano-cartesiano', 'Movimentos no plano cartesiano', 'EF05MA15',
        'Localizar pontos e descrever movimentos de objetos no primeiro quadrante do plano cartesiano.',
        'Plano cartesiano grande no chão, um "robô" (estudante ou boneco), fichas.',
        ['Monte o plano no chão com os eixos numerados a partir do zero.',
         'Coloque o robô num ponto e diga as coordenadas.',
         'Dê comandos: 2 para a direita, 1 para cima, e registre o ponto final.',
         'Na versão C, o estudante desloca uma figura e compara as coordenadas.'],
        ['Ande no plano do chão. Uma direção por vez: primeiro a direita.',
         'Use sempre a mesma frase: "anda para a direita, depois sobe".',
         'Jogo do robô: um dá os comandos, outro anda e confere.'],
        ['Bloco 1: B. Bloco 2: (1, 1).',
         'Bloco 1: (4, 4). Bloco 2: 3 para a esquerda e 3 para baixo.',
         'Bloco 1: triângulo em (3, 1), (6, 1), (6, 3). Bloco 2: A (3, 1), B (6, 1), C (6, 3). Bloco 3: mudou a posição; forma e tamanho ficaram iguais.'],
        a, b, c)


def solidos_planificacoes():
    a = bloco(1, 'Esta planificação monta qual sólido? Circule.', grade([
        item(planificacao('cubo', 26), opcoes(['cubo', 'cone'], certa='cubo'), exemplo=True),
        item(planificacao('cilindro', 26), opcoes(['cilindro', 'cubo']))], 2), 'Imagine dobrando as partes.') + bloco(
        2, 'Qual sólido rola? Circule.', item(fila_h(rot(solido('cubo', 64), 'cubo'), rot(solido('cilindro', 64), 'cilindro')), opcoes(['cubo', 'cilindro'])))
    b = bloco(1, 'Ligue o sólido à planificação.', grade([
        item(solido('piramide', 64), '<p class="legenda">1</p>'), item(solido('cone', 64), '<p class="legenda">2</p>'), item(solido('bloco', 64), '<p class="legenda">3</p>'),
        item(planificacao('bloco', 18), '<p class="legenda">A</p>'), item(planificacao('piramide', 22), '<p class="legenda">B</p>'), item(planificacao('cone', 22), '<p class="legenda">C</p>')], 3)) + bloco(
        2, 'Escreva as ligações.', frases(['1 com', '2 com', '3 com']))
    c = bloco(1, 'Complete a tabela.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas', 'Rola?'], [['cubo', '', '', '', ''], ['pirâmide de base quadrada', '', '', '', ''], ['prisma de base triangular', '', '', '', ''], ['cilindro', '-', '-', '-', '']])) + bloco(
        2, 'Desenhe a planificação de uma caixa de sapato.', caixa_desenho('32mm'))
    return h5(
        'solidos-e-suas-planificacoes', 'Sólidos e suas planificações', 'EF05MA16',
        'Associar prismas, pirâmides, cilindros e cones às suas planificações e comparar seus atributos.',
        'Caixas e embalagens para desmontar, sólidos de madeira ou papel, tesoura e cola.',
        ['Desmonte uma caixa e mostre a planificação aberta na mesa.',
         'Monte um sólido a partir de uma planificação impressa.',
         'Conte faces, vértices e arestas e compare os sólidos.',
         'Na versão C, o estudante completa a tabela e desenha uma planificação.'],
        ['Desmonte e monte a mesma embalagem várias vezes. Um sólido por vez.',
         'Pinte as faces iguais com a mesma cor na planificação.',
         'Corrida de montagem em dupla com planificações recortadas.'],
        ['Bloco 1: cubo; cilindro. Bloco 2: cilindro.',
         'Bloco 1 e 2: 1 com B; 2 com C; 3 com A.',
         'Bloco 1: cubo 6, 8, 12, não; pirâmide 5, 5, 8, não; prisma 5, 6, 9, não; cilindro rola. Bloco 2: 6 retângulos, iguais aos pares.'],
        a, b, c)


def poligonos():
    a = bloco(1, 'Quantos lados? Circule.', grade([
        item(TRI, opcoes([3, 4], certa=3), exemplo=True), item(PENT, opcoes([5, 6])), item(HEX, opcoes([6, 5]))], 3), 'Passe o dedo em cada lado e conte.') + bloco(
        2, 'Qual figura é um quadrilátero (4 lados)? Circule.', item(fila_h(rot(TRAP, '1'), rot(TRI, '2')), opcoes(['1', '2'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Polígono', 'Lados', 'Vértices', 'Ângulos'], [['triângulo', '3', '3', '3'], ['quadrado', '', '', ''], ['pentágono', '', '', ''], ['hexágono', '', '', '']]),
              'A primeira linha é o exemplo.') + bloco(
        2, 'Desenhe na malha um quadrado e um triângulo com um ângulo reto.', item(malha(12, 5, 26)))
    c = bloco(1, 'Escreva o nome e uma característica.', grade([item(RET, linhas(1)), item(TRAP, linhas(1)), item(HEX, linhas(1))], 3)) + bloco(
        2, 'O que todo polígono tem em comum? Lados, vértices e ângulos têm que número?', linhas(2)) + bloco(
        3, 'Use régua e desenhe um polígono de 5 lados.', caixa_desenho('30mm'))
    return h5(
        'reconhecer-e-desenhar-poligonos', 'Reconhecer e desenhar polígonos', 'EF05MA17',
        'Reconhecer, nomear e comparar polígonos pelo número de lados, vértices e ângulos, e desenhá-los com régua e malha.',
        'Palitos e massinha, figuras recortadas, régua, malha quadriculada, geoplano.',
        ['Monte polígonos com palitos e massinha nos vértices.',
         'Conte lados, vértices e ângulos e veja que são o mesmo número.',
         'Desenhe polígonos na malha e com régua.',
         'Na versão C, o estudante nomeia, descreve e desenha com régua.'],
        ['Monte com palitos antes de desenhar. Um polígono por vez.',
         'Use uma tabela fixa com os nomes e o número de lados ao lado.',
         'Caça aos polígonos na sala com registro em foto ou desenho.'],
        ['Bloco 1: 3; 5; 6. Bloco 2: 1 (trapézio).',
         'Bloco 1: quadrado 4, 4, 4; pentágono 5, 5, 5; hexágono 6, 6, 6. Bloco 2: resposta pessoal.',
         'Bloco 1: retângulo, 4 ângulos retos; trapézio, 2 lados paralelos; hexágono, 6 lados. Bloco 2: o mesmo número de lados, vértices e ângulos. Bloco 3: resposta pessoal.'],
        a, b, c)


def ampliar_reduzir():
    a = bloco(1, 'Qual figura é a ampliação da primeira? Circule.', grade([
        item(fila_h(malha(2, 1, 28, ret(0, 0, 2, 1)), malha(4, 2, 28, ret(0, 0, 4, 2)), malha(4, 1, 28, ret(0, 0, 4, 1))), opcoes(['a do meio', 'a última'], certa='a do meio'), exemplo=True)], 1),
        'Na ampliação, tudo cresce do mesmo jeito.') + bloco(
        2, 'A figura grande tem o dobro de largura. E a altura? Circule.', item(opcoes(['o dobro', 'igual'])))
    b = bloco(1, 'Amplie a figura dobrando os lados.', item(fila_h(malha(3, 3, 22, [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]), malha(7, 6, 22)))) + bloco(
        2, 'Compare.', frases(['Os ângulos mudaram?', 'O lado de 3 quadradinhos ficou com quantos?']))
    c = bloco(1, 'Reduza o retângulo pela metade.', item(fila_h(malha(8, 4, 20, ret(0, 0, 8, 4)), malha(5, 3, 20)))) + bloco(
        2, 'Responda.', frases(['O retângulo original tem lados 8 e 4. E o reduzido?', 'O que acontece com os ângulos na ampliação e na redução?'])) + bloco(
        3, 'Uma foto de 10 cm por 15 cm foi ampliada para 20 cm de largura. Qual será a altura?', linhas(1))
    return h5(
        'ampliar-e-reduzir-figuras-na-malha', 'Ampliar e reduzir figuras na malha', 'EF05MA18',
        'Reconhecer que, ao ampliar ou reduzir figuras na malha, os ângulos se mantêm e os lados ficam proporcionais.',
        'Malha quadriculada de dois tamanhos, fotos em tamanhos diferentes, régua.',
        ['Mostre a mesma foto pequena e grande: a forma é a mesma.',
         'Desenhe uma figura na malha e dobre cada lado.',
         'Compare lados e ângulos das duas figuras.',
         'Na versão C, o estudante reduz uma figura e resolve um problema com foto.'],
        ['Comece com retângulos. Conte os quadradinhos de cada lado junto.',
         'Use a mesma regra sempre: "cada lado vezes 2". Uma figura por folha.',
         'Desafio: ampliar a letra inicial do nome na malha.'],
        ['Bloco 1: a do meio. Bloco 2: o dobro.',
         'Bloco 1: L com lados de 6 quadradinhos. Bloco 2: não; 6.',
         'Bloco 1: retângulo 4 por 2. Bloco 2: 4 e 2; os ângulos não mudam. Bloco 3: 30 cm.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def perimetro_area():
    a = bloco(1, 'As duas figuras têm a mesma área? Circule.', grade([
        item(fila_h(malha(4, 1, 24, ret(0, 0, 4, 1)), malha(2, 2, 24, ret(0, 0, 2, 2))), '<p class="legenda">4 quadradinhos e 4 quadradinhos</p>' + opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(fila_h(malha(3, 1, 24, ret(0, 0, 3, 1)), malha(3, 2, 24, ret(0, 0, 3, 2))), opcoes(['sim', 'não']))], 1), 'Área é quantos quadradinhos cabem dentro.') + bloco(
        2, 'Qual tem o contorno maior? Circule.', item(fila_h(rot(malha(4, 1, 24, ret(0, 0, 4, 1)), '1'), rot(malha(2, 2, 24, ret(0, 0, 2, 2)), '2')), opcoes(['1', '2'])))
    b = bloco(1, 'Complete a tabela.', tabela(['Retângulo', 'Área', 'Perímetro'], [['6 × 1', '6', '14'], ['3 × 2', '', ''], ['4 × 4', '', ''], ['8 × 2', '', '']]),
              'A primeira linha é o exemplo. Perímetro é a medida do contorno.') + bloco(
        2, 'O que você percebeu sobre 4 × 4 e 8 × 2?', linhas(1))
    c = bloco(1, 'Desenhe dois retângulos com perímetro 16 e áreas diferentes.', item(malha(14, 6, 22))) + bloco(
        2, 'Escreva as áreas.', linhas(1)) + bloco(
        3, 'Com 20 m de cerca, qual retângulo dá o maior cercado? Explique.', linhas(2))
    return h5(
        'mesmo-perimetro-areas-diferentes', 'Mesmo perímetro, áreas diferentes', 'EF05MA20',
        'Investigar que figuras com o mesmo perímetro podem ter áreas diferentes e figuras com a mesma área podem ter perímetros diferentes.',
        'Barbante de tamanho fixo, quadradinhos de papel, malha, geoplano.',
        ['Dê um barbante de 16 cm e monte vários retângulos com ele.',
         'Conte os quadradinhos de dentro de cada um.',
         'Faça o contrário: 12 quadradinhos em formas diferentes, contornos diferentes.',
         'Na versão C, o estudante desenha, compara e resolve um problema de cerca.'],
        ['Use o barbante e quadradinhos soltos. Uma medida por vez: primeiro área.',
         'Use duas cores fixas: contorno sempre de uma cor, área de outra.',
         'Desafio: montar o maior cercado possível com o mesmo barbante.'],
        ['Bloco 1: sim; não. Bloco 2: 1 (perímetro 10 contra 8).',
         'Bloco 1: 3 × 2 área 6, perímetro 10; 4 × 4 área 16, perímetro 16; 8 × 2 área 16, perímetro 20. Bloco 2: mesma área, perímetros diferentes.',
         'Bloco 1 e 2: por exemplo 7 × 1 (área 7) e 4 × 4 (área 16). Bloco 3: 5 × 5, área 25 m².'],
        a, b, c)


def volume_cubinhos():
    a = bloco(1, 'Quantos cubinhos? Circule.', grade([
        item(empilhado(2, 1, 2, 28), opcoes([4, 2], certa=4), exemplo=True), item(empilhado(3, 1, 2, 28), opcoes([6, 5]))], 2), 'Conte por camadas: de baixo para cima.') + bloco(
        2, 'Qual bloco tem mais cubinhos? Circule.', item(fila_h(rot(empilhado(2, 2, 1, 26), '1'), rot(empilhado(2, 2, 2, 26), '2')), opcoes(['1', '2'])))
    b = bloco(1, 'Escreva o volume em cubinhos.', grade([
        item(empilhado(3, 2, 1, 24), resposta(largura='18mm')), item(empilhado(2, 2, 3, 24), resposta(largura='18mm')), item(empilhado(4, 2, 2, 22), resposta(largura='18mm'))], 3)) + bloco(
        2, 'Complete.', frases(['Camada de baixo com 3 × 2 cubinhos e 4 camadas =']))
    c = bloco(1, 'Calcule o volume.', tabela(['Comprimento', 'Largura', 'Altura', 'Volume (cubinhos)'], [['5', '2', '3', ''], ['4', '4', '2', ''], ['6', '3', '1', '']])) + bloco(
        2, 'Desenhe ou descreva dois blocos diferentes com volume 12.', linhas(2)) + bloco(
        3, 'Uma caixa tem 10 cubinhos de comprimento, 5 de largura e 4 de altura. Cabem 200 cubinhos? Explique.', linhas(1))
    return h5(
        'volume-com-cubinhos', 'Volume com cubinhos', 'EF05MA21',
        'Reconhecer volume como o espaço ocupado e medir volumes empilhando cubinhos.',
        'Cubinhos de encaixe ou de madeira, caixinhas, material dourado.',
        ['Monte blocos com cubinhos e conte quantos usou.',
         'Conte por camadas: quantos na camada de baixo e quantas camadas.',
         'Relacione com a multiplicação: comprimento × largura × altura.',
         'Na versão C, o estudante calcula, cria blocos e explica.'],
        ['Use os cubinhos de verdade. Monte e conte camada por camada.',
         'Use sempre a mesma ordem: comprimento, largura, altura.',
         'Desafio: montar o maior bloco possível com 24 cubinhos de formas diferentes.'],
        ['Bloco 1: 4; 6. Bloco 2: 2.',
         'Bloco 1: 6; 12; 16. Bloco 2: 24.',
         'Bloco 1: 30; 32; 18. Bloco 2: por exemplo 3 × 2 × 2 e 6 × 2 × 1. Bloco 3: sim, 10 × 5 × 4 = 200.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def resultados_possiveis():
    a = bloco(1, 'Jogando uma moeda, o que pode sair? Circule.', grade([
        item(cx('Cara ou coroa?'), opcoes(['cara ou coroa', 'só cara'], certa='cara ou coroa'), exemplo=True)], 1)) + bloco(
        2, 'Num dado comum, pode sair o número 7? Circule.', item(opcoes(['sim', 'não']))) + bloco(
        3, 'Nesta roleta, as cores têm a mesma chance? Circule.', item(roleta(['amarelo', 'verde', 'amarelo', 'verde'], 110), opcoes(['sim', 'não'])))
    b = bloco(1, 'Escreva todos os resultados possíveis.', frases(['Jogar um dado:', 'Sortear uma letra da palavra SOL:', 'Jogar duas moedas:'])) + bloco(
        2, 'Os resultados têm a mesma chance? Escreva sim ou não.', grade([
            item(roleta(['amarelo', 'verde', 'rosa'], 100), resposta(largura='16mm')), item(roleta(['amarelo', 'amarelo', 'amarelo', 'rosa'], 100), resposta(largura='16mm'))], 2))
    c = bloco(1, 'Num saco há 2 fichas azuis e 2 vermelhas. Tiro uma, devolvo e tiro outra. Liste todos os resultados.', linhas(2)) + bloco(
        2, 'Somando dois dados, todos os totais de 2 a 12 têm a mesma chance? Faça a tabela e explique.', caixa_desenho('36mm')) + bloco(
        3, 'Invente uma roleta em que o verde tenha mais chance.', caixa_desenho('22mm'))
    return h5(
        'todos-os-resultados-possiveis', 'Todos os resultados possíveis', 'EF05MA22',
        'Listar todos os resultados possíveis de um experimento aleatório e dizer se eles têm a mesma chance.',
        'Moedas, dados, roletas de papel com clipe, sacos com fichas coloridas.',
        ['Jogue uma moeda e um dado e liste tudo o que pode sair.',
         'Faça uma roleta com partes iguais e outra com partes diferentes.',
         'Discuta: qual resultado tem mais chance? Ou todos têm a mesma?',
         'Na versão C, o estudante lista resultados de experimentos com duas etapas.'],
        ['Faça o experimento de verdade antes de responder. Um experimento por vez.',
         'Registre sempre numa lista com o mesmo formato.',
         'Campeonato de roletas: quem cria a roleta mais justa?'],
        ['Bloco 1: cara ou coroa. Bloco 2: não. Bloco 3: sim.',
         'Bloco 1: 1, 2, 3, 4, 5, 6; S, O, L; cara-cara, cara-coroa, coroa-cara, coroa-coroa. Bloco 2: sim; não.',
         'Bloco 1: azul-azul, azul-vermelha, vermelha-azul, vermelha-vermelha. Bloco 2: não, o 7 tem mais chance (6 jeitos). Bloco 3: resposta pessoal.'],
        a, b, c)


def probabilidade():
    a = bloco(1, 'Qual a chance de sair amarelo? Circule.', grade([
        item(roleta(['amarelo', 'verde'], 100), opcoes(['1 em 2', '1 em 4'], certa='1 em 2'), exemplo=True),
        item(roleta(['amarelo', 'verde', 'rosa', 'verde'], 100), opcoes(['1 em 4', '1 em 2']))], 2), 'Conte as partes: quantas amarelas de quantas ao todo.') + bloco(
        2, 'Num dado, a chance de sair 6 é: Circule.', item(opcoes(['1 em 6', '6 em 6'])))
    b = bloco(1, 'Escreva a probabilidade como fração.', grade([
        item(pote(['verde', 'verde', 'amarelo', 'rosa'], 100), '<p class="legenda">verde</p>' + resposta(largura='18mm')),
        item(pote(['amarelo'] * 3 + ['rosa'] * 5, 100), '<p class="legenda">rosa</p>' + resposta(largura='18mm'))], 2)) + bloco(
        2, 'Num dado comum, qual a probabilidade de sair:', frases(['número par?', 'número maior que 4?', 'número 7?']))
    c = bloco(1, 'Num saco há 3 fichas azuis, 5 vermelhas e 2 brancas.', frases(['Probabilidade de azul:', 'De vermelha:', 'De não sair branca:'])) + bloco(
        2, 'Escreva a probabilidade de vermelha também como porcentagem.', linhas(1)) + bloco(
        3, 'Monte um saco com 10 fichas em que a chance de azul seja 3/10 e a de verde seja a metade.', linhas(2))
    return h5(
        'calcular-probabilidade', 'Calcular a probabilidade', 'EF05MA23',
        'Determinar a probabilidade de um resultado, quando todos os resultados têm a mesma chance, e escrevê-la como fração.',
        'Roletas de papel, dados, potes com bolinhas ou fichas coloridas.',
        ['Conte as partes da roleta e quantas são da cor pedida.',
         'Escreva "1 em 4" e depois como fração: 1/4.',
         'Faça o experimento várias vezes e compare com a previsão.',
         'Na versão C, o estudante calcula, transforma em porcentagem e monta um saco.'],
        ['Use bolinhas reais no pote. Uma cor de cada vez.',
         'Sempre a mesma pergunta: "quantas desta cor, de quantas ao todo".',
         'Competição de previsões: quem chega mais perto em 20 sorteios?'],
        ['Bloco 1: 1 em 2; 1 em 4. Bloco 2: 1 em 6.',
         'Bloco 1: 2/4 (1/2); 5/8. Bloco 2: 3/6 (1/2); 2/6 (1/3); 0 (impossível).',
         'Bloco 1: 3/10; 5/10; 8/10. Bloco 2: 50%. Bloco 3: 3 azuis, 5 verdes e 2 de outra cor.'],
        a, b, c)


def interpretar_graficos():
    meses = ['mar', 'abr', 'mai', 'jun', 'jul']
    a = bloco(1, 'Frutas no lanche. Quantas maçãs? Circule.', item(grafico_barras(['maçã', 'banana', 'pão'], [5, 3, 2], 6, icones=['maca', 'banana', 'pao'], celula=26), opcoes([5, 3], certa=5)),
              'Conte os quadradinhos pintados da coluna.') + bloco(
        2, 'Qual tem menos? Circule.', item(opcoes(['pão', 'maçã'])))
    b = bloco(1, 'Chuva na cidade (mm).', item(grafico_linha(meses, [120, 90, 60, 40, 30], 140, 20, 480, 190)) + frases([
        'Em que mês choveu mais?', 'A chuva aumentou ou diminuiu?', 'Quanto choveu a menos em julho do que em março?'])) + bloco(
        2, 'Escreva uma frase sobre o gráfico.', linhas(1))
    c = bloco(1, 'Visitantes do museu (em centenas).', item(grafico_linha(['seg', 'ter', 'qua', 'qui', 'sex', 'sáb'], [2, 3, 3, 4, 6, 9], 10, 2, 480, 190)) + frases([
        'Qual o dia com mais visitantes?', 'Quantos visitantes ao todo na semana?'])) + bloco(
        2, 'Escreva um pequeno texto com três conclusões sobre o gráfico.', linhas(3))
    return h5(
        'interpretar-graficos-e-produzir-textos', 'Interpretar gráficos e produzir textos', 'EF05MA24',
        'Ler tabelas e gráficos de colunas, pictóricos e de linhas, e escrever textos com as conclusões.',
        'Gráficos de jornais e revistas, régua para ler o gráfico, marca-texto.',
        ['Leia o título e os eixos do gráfico em voz alta.',
         'Use a régua para ler o valor de cada ponto ou coluna.',
         'Pergunte: o que aumentou, o que diminuiu, qual o maior e o menor?',
         'Na versão C, o estudante calcula com os dados e escreve conclusões.'],
        ['Comece com gráfico de colunas com figuras. Uma pergunta por vez.',
         'Leia sempre na mesma ordem: título, eixos, depois os dados.',
         'Faça um "jornal da turma" com gráficos e manchetes.'],
        ['Bloco 1: 5. Bloco 2: pão.',
         'Bloco 1: março; diminuiu; 90 mm. Bloco 2: resposta pessoal.',
         'Bloco 1: sábado; 27 centenas (2 700). Bloco 2: resposta pessoal (por exemplo, o movimento cresce até o sábado).'],
        a, b, c)


def pesquisa_tecnologia():
    a = bloco(1, 'Pergunte a 8 colegas: qual sua estação do ano preferida? Faça um risquinho.', tabela(['Estação', 'Risquinhos', 'Total'], [
        ['verão', '', ''], ['outono', '', ''], ['inverno', '', ''], ['primavera', '', '']])) + bloco(
        2, 'Pinte o gráfico.', item(grafico_escala(['verão', 'outono', 'inverno', 'primav.'], None, 8, 1, celula=16, larg=40, gap=30)))
    b = bloco(1, 'Pergunte a 8 colegas a estação preferida e quantas horas dormem.', tabela(['Colega', 'Estação', 'Horas de sono'], [['', '', '']] * 8)) + bloco(
        2, 'Qual variável é categórica (nome) e qual é numérica (número)?', linhas(1)) + bloco(
        3, 'Faça a tabela no computador ou tablet (planilha) e gere o gráfico, ou desenhe em papel.', linhas(1))
    c = bloco(1, 'Planeje uma pesquisa com uma pergunta de categoria e uma de número.', frases(['Pergunta de categoria:', 'Pergunta de número:', 'Quantas pessoas:'])) + bloco(
        2, 'Organize os dados numa planilha e faça um gráfico para cada pergunta. Cole ou desenhe aqui.', caixa_desenho('42mm')) + bloco(
        3, 'Escreva um texto curto com as conclusões.', linhas(3))
    return h5(
        'pesquisa-com-planilha-e-graficos', 'Pesquisa com planilha e gráficos', 'EF05MA25',
        'Fazer uma pesquisa com variáveis de categoria e de número, organizar em tabelas e gráficos, com e sem planilha eletrônica.',
        'Prancheta, lápis de cor, computador ou tablet com planilha (opcional).',
        ['Combine a pergunta e quem será entrevistado.',
         'Registre os dados na tabela e conte os totais.',
         'Faça o gráfico no papel e, se houver computador, numa planilha.',
         'Na versão C, o estudante planeja, organiza e escreve conclusões.'],
        ['Use uma pergunta só, com poucas opções e figuras.',
         'Use a mesma tabela modelo em toda pesquisa. Explique cada passo na mesma ordem.',
         'Deixe o estudante entrevistar colegas de outras turmas, com tempo combinado.'],
        ['Bloco 1: registro pessoal, total 8. Bloco 2: colunas iguais aos totais.',
         'Bloco 1: registro pessoal. Bloco 2: estação é categórica; horas de sono é numérica. Bloco 3: resposta pessoal.',
         'Bloco 1 a 3: resposta pessoal.'],
        a, b, c)


FICHAS = [numeros_ate_999999, decimais_reta, fracoes_maiores_menores, equivalentes, comparar_fracoes_decimais, porcentagens,
          agrupamentos, mesma_operacao, termo_desconhecido, proporcionalidade, partilha_desigual,
          localizar_mapas, movimentos_plano, solidos_planificacoes, poligonos, ampliar_reduzir,
          perimetro_area, volume_cubinhos, resultados_possiveis, probabilidade, interpretar_graficos, pesquisa_tecnologia]
