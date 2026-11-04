"""Fichas do 3º ano."""
from base import ficha
from desenhos import dinheiro, figura, grupo, relogio, svg
from desenhos2 import CLARO, grafico_barras, malha, planificacao, poligono_svg, pote, regular, roleta, solido
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, opcoes, pratos, problema, produto, resposta, seq_numeros, tabela


def ligar(pares):
    """Duas colunas para ligar: pares é lista de (esquerda, direita), já embaralhados."""
    return '<div class="ligar">' + ''.join(
        f'<div class="ligar-par"><span class="ligar-lado"><b>{e}</b></span><span class="ponto"></span>'
        f'<span></span><span class="ponto"></span><span class="ligar-lado direita"><b>{d}</b></span></div>' for e, d in pares) + '</div>'


def frases(perguntas):
    return '<div class="frases">' + ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in perguntas) + '</div>'


def milhar(m, c, d, u):
    """Cubos grandes (1000) desenhados como cubos com o valor escrito, seguidos das placas, barras e cubinhos."""
    from desenhos2 import dourado3
    cubos = ''.join(svg(58, 70, f'<g transform="scale(.72)">{solido("cubo", 80)}</g>'
                        '<text x="29" y="68" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="13">1000</text>',
                        'cubo-mil', 'cubo grande que vale 1000') for _ in range(m))
    resto = dourado3(c, d, u, 5) if c or d or u else ''
    return cubos + resto


# ---------- 1. números até 9999 ----------

def numeros_milhar():
    a = bloco(1, 'O cubo grande vale 1000. Conte e circule o número.', grade([
        item(milhar(1, 2, 0, 0), opcoes([1200, 120], certa=1200), exemplo=True, classe='largo'),
        item(milhar(2, 0, 3, 0), opcoes([230, 2030]), classe='largo'),
        item(milhar(1, 0, 0, 5), opcoes([1005, 15]), classe='largo'),
    ], 1), 'Conte primeiro os cubos grandes, de 1000 em 1000.') + bloco(
        2, 'Complete a reta. Ela vai de 1000 em 1000.', seq_numeros([0, 1000, 2000, None, 4000, None]))
    b = bloco(1, 'Complete o quadro de valor.', tabela(['Número', 'Milhar', 'Centena', 'Dezena', 'Unidade'], [
        ['<b>2345</b>', '2', '3', '4', '5'], ['<b>1608</b>', '', '', '', ''], ['<b>3050</b>', '', '', '', ''], ['<b>4712</b>', '', '', '', '']]),
        'A primeira linha é o exemplo.') + bloco(2, 'Decomponha como no exemplo.', grade([
            '<p class="conta">2345 = 2000 + 300 + 40 + 5</p>', f'<p class="conta">1608 = {VAZIO} + {VAZIO} + {VAZIO}</p>',
            f'<p class="conta">3050 = {VAZIO} + {VAZIO}</p>', f'<p class="conta">4712 = {VAZIO} + {VAZIO} + {VAZIO} + {VAZIO}</p>'], 1)) + bloco(
        3, 'Escreva do menor para o maior.', '<p class="conta">1250 &nbsp; 1025 &nbsp; 1520</p>' + seq_numeros([None, None, None]))
    c = bloco(1, 'Escreva por extenso.', frases(['1500:', '2019:', '6340:'])) + bloco(2, 'Compare. Escreva &gt;, &lt; ou =.', grade([
        f'<p class="conta">3099 {VAZIO} 3100</p>', f'<p class="conta">5400 {VAZIO} 4500</p>', f'<p class="conta">7008 {VAZIO} 7080</p>', f'<p class="conta">9000 {VAZIO} 9000</p>'], 2)) + bloco(
        3, 'Complete a reta: ela vai de 200 em 200.', seq_numeros([5000, 5200, None, None, 5800, None])) + bloco(
        4, 'Descubra o número.', frases(['Tenho 4 milhares, 0 centenas, 7 dezenas e 2 unidades. Sou o', 'Sou o número que vem logo depois de 3999. Sou o']))
    return ficha(
        'numeros-ate-9999-milhar', 'Números até 9999: o milhar', '3º ano',
        'Contar, compor e decompor números de quatro algarismos, ler, escrever, comparar e localizar na reta numérica.',
        ['EF03MA01', 'EF03MA02', 'EF03MA04'], '40 a 50 minutos',
        'Material dourado (com o cubo grande, se houver), um quadro de valor com quatro colunas e uma reta numérica de papel no chão.',
        ['Relembre as trocas: 10 cubinhos formam uma barra, 10 barras formam uma placa. Mostre que 10 placas formam o cubo grande de 1000.',
         'Se a escola não tiver o cubo grande, empilhe 10 placas e prenda com elástico.',
         'No quadro de valor, cada coluna tem uma cor fixa. O zero aparece quando a coluna fica vazia.',
         'Na reta numérica, conte os pulos em voz alta: mil, dois mil, três mil.',
         'Na versão C, leia os números por extenso juntos antes de escrever.'],
        ['Use sempre o mesmo quadro de valor, com as mesmas cores, colado na carteira. Diga a frase "dez placas formam mil" com o gesto de empilhar.',
         'O quadro de valor dá uma regra fixa e visível. Avise antes quando a coluna do milhar entrar na atividade.',
         'Montar números grandes com o material vira desafio: um colega diz o número, o outro monta. Rodadas curtas.'],
        ['Bloco 1: 2030; 1005. Bloco 2: 3000 e 5000.',
         'Bloco 1: 1608 = 1, 6, 0, 8; 3050 = 3, 0, 5, 0; 4712 = 4, 7, 1, 2. Bloco 2: 1000 + 600 + 8; 3000 + 50; 4000 + 700 + 10 + 2. Bloco 3: 1025, 1250, 1520.',
         'Bloco 1: mil e quinhentos; dois mil e dezenove; seis mil trezentos e quarenta. Bloco 2: &lt;, &gt;, &lt;, =. Bloco 3: 5400, 5600, 6000. Bloco 4: 4072; 4000.'],
        a, b, c)


# ---------- 2. cálculo mental e problemas ----------

def calculo_mental():
    a = bloco(1, 'Junte. Quanto dá? Circule.', grade([
        item(grupo('maca', 5, tam=36) + '<b class="mais">+</b>' + grupo('maca', 5, tam=36), opcoes([10, 9], certa=10), exemplo=True, classe='largo'),
        item(grupo('estrela', 6, tam=36) + '<b class="mais">+</b>' + grupo('estrela', 4, tam=36), opcoes([2, 10]), classe='largo'),
        item(grupo('flor', 7, tam=36) + '<b class="mais">+</b>' + grupo('flor', 3, tam=36), opcoes([10, 4]), classe='largo'),
    ], 1), 'Os pares que formam 10 ajudam a fazer as contas de cabeça.') + bloco(2, 'Quantas sobram? Circule.', grade([
        item(grupo('bola', 10, tam=36, riscadas=3), opcoes([7, 13])),
        item(grupo('peixe', 8, tam=36, por_linha=4, riscadas=4), opcoes([4, 12])),
    ], 2), 'As figuras riscadas foram embora.')
    b = bloco(1, 'Cálculo mental: some 10 e ajuste.', grade([
        '<p class="conta">34 + 9 = 34 + 10 − 1 = 43</p>', f'<p class="conta">25 + 9 = {VAZIO}</p>',
        f'<p class="conta">47 + 11 = {VAZIO}</p>', f'<p class="conta">60 − 9 = {VAZIO}</p>'], 2), 'O primeiro é o exemplo.') + bloco(
        2, 'Calcule.', grade([conta(125, '+', 34), conta(248, '−', 116), conta(306, '+', 52), conta(479, '−', 235)], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('Na caixa havia <b>45</b> lápis. Coloquei mais <b>18</b>. Quantos lápis tem agora?', '20mm'),
            problema('Ana tem <b>62</b> figurinhas e Bia tem <b>40</b>. Quantas Ana tem a mais?', '20mm')], 2))
    c = bloco(1, 'Calcule.', grade([conta(347, '+', 285), conta(503, '−', 178), conta(1250, '+', 750), conta(900, '−', 365)], 2)) + bloco(
        2, 'Cálculo mental: escreva só o resultado.', grade([
            f'<p class="conta">199 + 45 = {VAZIO}</p>', f'<p class="conta">1000 − 350 = {VAZIO}</p>',
            f'<p class="conta">250 + 250 = {VAZIO}</p>', f'<p class="conta">6 × 5 = {VAZIO}</p>'], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('Num ônibus havia <b>48</b> pessoas. Desceram <b>15</b> e subiram <b>9</b>. Quantas pessoas estão no ônibus agora?', '22mm'),
            problema('Quero comprar uma bicicleta de <b>R$ 420</b>. Já guardei <b>R$ 275</b>. Quanto falta?', '22mm')], 2)) + bloco(
        4, 'Invente um problema que se resolve com a conta 50 − 20.', linhas(2))
    return ficha(
        'calculo-mental-e-problemas-de-adicao-e-subtracao', 'Cálculo mental e problemas de adição e subtração', '3º ano',
        'Fatos básicos, estratégias de cálculo mental, contas armadas e problemas de juntar, acrescentar, retirar, comparar e completar.',
        ['EF03MA03', 'EF03MA05', 'EF03MA06'], '40 a 50 minutos',
        'Material dourado, quadro de dez, cartões com os pares que formam 10 e uma reta numérica.',
        ['Comece com os pares que formam 10 (5 e 5, 6 e 4, 7 e 3), usando o quadro de dez.',
         'Mostre a estratégia "some 10 e ajuste" na reta numérica: um pulo grande para a frente e um pequeno para trás.',
         'Nas contas armadas, monte com o material dourado e faça as trocas antes de registrar.',
         'Nos problemas, pergunte primeiro se a quantidade vai aumentar ou diminuir.',
         'Na versão C, o estudante inventa um problema: aceite a resposta oral e registre por ele, se precisar.'],
        ['Deixe os pares que formam 10 à vista, em cartões. Use a mesma frase para cada estratégia e repita a mesma estratégia por alguns dias.',
         'Mostre a estratégia passo a passo, sempre na mesma ordem. Explique que "a mais" e "a menos" pedem comparação, e não junção.',
         'Rodadas curtas de cálculo mental, com resposta rápida no quadro branco, mantêm a atenção. Alterne com as contas no papel.'],
        ['Bloco 1: 10; 10. Bloco 2: 7; 4.', 'Bloco 1: 34, 58, 51. Bloco 2: 159, 132, 358, 244. Bloco 3: 63 lápis; 22 figurinhas.',
         'Bloco 1: 632, 325, 2000, 535. Bloco 2: 244, 650, 500, 30. Bloco 3: 42 pessoas; R$ 145. Bloco 4: resposta pessoal (o resultado é 30).'],
        a, b, c)


# ---------- 3. divisão ----------

def divisao():
    a = bloco(1, 'Reparta igualmente nos pratos. Quantas ficam em cada prato?', grade([
        item(pratos(2, 3, 'maca'), '<p class="legenda">6 maçãs em 2 pratos</p>' + opcoes([3, 6], certa=3), exemplo=True),
        item(grupo('bola', 8, tam=34, por_linha=4) + '<p class="legenda">8 bolas em 2 pratos</p>', opcoes([6, 4])),
        item(grupo('flor', 9, tam=34, por_linha=3) + '<p class="legenda">9 flores em 3 pratos</p>', opcoes([3, 6])),
        item(grupo('estrela', 10, tam=34, por_linha=5) + '<p class="legenda">10 estrelas em 5 pratos</p>', opcoes([5, 2])),
    ], 2), 'Use tampinhas e pratinhos de verdade: uma em cada prato, até acabar.') + bloco(
        2, 'Reparta 7 peixes em 2 pratos. Sobrou algum?', item(grupo('peixe', 7, tam=40, por_linha=7), opcoes(['sim', 'não'])))
    b = bloco(1, 'Desenhe e divida.', grade([
        item(caixa_desenho('26mm'), f'<p class="conta">12 ÷ 3 = {VAZIO}</p>'), item(caixa_desenho('26mm'), f'<p class="conta">15 ÷ 5 = {VAZIO}</p>'),
        item(caixa_desenho('26mm'), f'<p class="conta">20 ÷ 4 = {VAZIO}</p>'), item(caixa_desenho('26mm'), f'<p class="conta">14 ÷ 3 = {VAZIO} e sobra {VAZIO}</p>')], 2)) + bloco(
        2, 'Complete. Dividir em partes iguais tem nomes.', tabela(['Parte', 'Conta', 'Resultado'], [
            ['metade de 12', '12 ÷ 2', '6'], ['terça parte de 12', '12 ÷ 3', ''], ['quarta parte de 12', '12 ÷ 4', ''],
            ['quinta parte de 20', '20 ÷ 5', ''], ['décima parte de 30', '30 ÷ 10', '']]), 'A primeira linha é o exemplo.')
    c = bloco(1, 'Divida e escreva o resto.', grade([
        f'<p class="conta">25 ÷ 4 = {VAZIO} resto {VAZIO}</p>', f'<p class="conta">38 ÷ 5 = {VAZIO} resto {VAZIO}</p>',
        f'<p class="conta">42 ÷ 6 = {VAZIO} resto {VAZIO}</p>', f'<p class="conta">29 ÷ 3 = {VAZIO} resto {VAZIO}</p>',
        f'<p class="conta">50 ÷ 10 = {VAZIO} resto {VAZIO}</p>', f'<p class="conta">60 ÷ 7 = {VAZIO} resto {VAZIO}</p>'], 2)) + bloco(
        2, 'Complete.', grade([f'<p class="conta">a quinta parte de 35 = {VAZIO}</p>', f'<p class="conta">a décima parte de 80 = {VAZIO}</p>'], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('Tenho <b>35</b> balas para dividir igualmente entre <b>8</b> crianças. Quantas balas cada uma ganha? Quantas sobram?', '24mm'),
            problema('Cada carro leva <b>4</b> pessoas. Quantos carros são necessários para levar <b>23</b> pessoas?', '24mm')], 2))
    return ficha(
        'divisao-repartir-em-partes-iguais', 'Divisão: repartir em partes iguais', '3º ano',
        'Repartir em partes iguais, com e sem resto, e relacionar a divisão com metade, terça, quarta, quinta e décima parte.',
        ['EF03MA08', 'EF03MA09'], '40 a 50 minutos', 'Tampinhas ou feijões, pratinhos de papel e cartões com as palavras metade, terça, quarta, quinta e décima.',
        ['Reparta tampinhas em pratinhos, uma de cada vez, até acabar. Conte quantas ficaram em cada prato.',
         'Mostre o que acontece quando não dá para repartir tudo: as que sobram são o resto.',
         'Na versão A, o estudante pode desenhar os pratos ao lado das figuras e ligar cada uma a um prato.',
         'Na versão B, relacione a quantidade de pratos com o nome da parte: 3 pratos, terça parte.',
         'No problema dos carros da versão C, discuta por que a resposta é 6 e não 5.'],
        ['Repartir de verdade é mais claro que fazer a conta. Use sempre o gesto de "uma para cada um" e a mesma frase.',
         'A regra "uma de cada vez, até acabar" é previsível. Prepare o estudante para o resto: às vezes sobra, e isso não é erro.',
         'Transforme a divisão em distribuição de cartas de um jogo. Tarefas curtas, com a contagem de cada prato no fim.'],
        ['Bloco 1: 4; 3; 2. Bloco 2: sim (3 em cada prato e sobra 1).', 'Bloco 1: 4; 3; 5; 4 e sobra 2. Bloco 2: 4, 3, 4, 3.',
         'Bloco 1: 6 resto 1; 7 resto 3; 7 resto 0; 9 resto 2; 5 resto 0; 8 resto 4. Bloco 2: 7; 8. Bloco 3: 4 balas e sobram 3; 6 carros.'],
        a, b, c)


# ---------- 4. regularidades e igualdades ----------

def regularidades():
    a = bloco(1, 'Continue a sequência. Some sempre 2.', seq_numeros([2, 4, 6, None]) + seq_numeros([10, 12, None, None]), 'Use a reta numérica: pule de 2 em 2.') + bloco(
        2, 'Os dois lados dão o mesmo resultado? Circule sim ou não.', grade([
            item('<p class="conta">3 + 2 = 4 + 1</p>', opcoes(['sim', 'não'], certa='sim'), exemplo=True),
            item('<p class="conta">5 + 1 = 2 + 2</p>', opcoes(['sim', 'não'])),
            item('<p class="conta">6 + 0 = 3 + 3</p>', opcoes(['sim', 'não'])),
        ], 1), 'Faça cada lado com tampinhas e compare.')
    b = bloco(1, 'Complete e escreva a regra.', ''.join(seq_numeros(s) + '<p class="regra">Regra: <span class="linha-resp"></span></p>' for s in (
        [5, 8, 11, None, None], [40, 36, 32, None, None], [100, 110, 120, None, None]))) + bloco(
        2, 'Complete para ficar igual.', grade([
            '<p class="conta">10 = 5 + 5</p>', f'<p class="conta">10 = 6 + {VAZIO}</p>', f'<p class="conta">10 = {VAZIO} + 2</p>',
            f'<p class="conta">4 + 4 = 6 + {VAZIO}</p>', f'<p class="conta">7 + 3 = 5 + {VAZIO}</p>', f'<p class="conta">9 − 1 = 4 + {VAZIO}</p>'], 3))
    c = bloco(1, 'Complete e escreva a regra.', ''.join(seq_numeros(s) + '<p class="regra">Regra: <span class="linha-resp"></span></p>' for s in (
        [7, 14, 21, None, None], [250, 225, 200, None, None], [13, 24, 35, None, None]))) + bloco(
        2, 'Escreva três contas diferentes que dão 24.', linhas(3)) + bloco(3, 'Verdadeiro (V) ou falso (F)?', grade([
            f'<p class="conta">15 + 5 = 10 + 10 &nbsp; {VAZIO}</p>', f'<p class="conta">20 − 5 = 10 + 4 &nbsp; {VAZIO}</p>',
            f'<p class="conta">3 × 4 = 6 + 6 &nbsp; {VAZIO}</p>', f'<p class="conta">50 − 25 = 20 + 5 &nbsp; {VAZIO}</p>'], 2))
    return ficha(
        'regularidades-e-igualdades', 'Regularidades em sequências e igualdades', '3º ano',
        'Descobrir a regra de sequências com adições e subtrações e escrever contas diferentes com o mesmo resultado.',
        ['EF03MA10', 'EF03MA11'], '30 a 45 minutos', 'Reta numérica, tampinhas e uma balança de dois pratos, se houver.',
        ['Mostre uma sequência na reta numérica e pergunte: de quanto em quanto ela pula?',
         'Para a igualdade, monte os dois lados com tampinhas e coloque em dois pratos. O sinal = quer dizer "vale o mesmo".',
         'Na versão A, o estudante pode montar e contar os dois lados antes de responder.',
         'Na versão B, peça que o estudante explique como achou o número que falta.',
         'Na versão C, compare as contas que os colegas escreveram para o 24.'],
        ['Use a balança ou dois pratos para mostrar que o sinal = é equilíbrio, e não "a resposta vem agora".',
         'Sequências e regras costumam agradar estudantes autistas. Deixe que o estudante crie as próprias sequências para os colegas.',
         'Transforme as igualdades em desafio de duplas: um escreve um lado, o outro completa.'],
        ['Bloco 1: 8; 14 e 16. Bloco 2: não; sim.', 'Bloco 1: 14 e 17 (soma 3); 28 e 24 (tira 4); 130 e 140 (soma 10). Bloco 2: 4, 8, 2, 5, 4.',
         'Bloco 1: 28 e 35 (soma 7); 175 e 150 (tira 25); 46 e 57 (soma 11). Bloco 2: respostas pessoais. Bloco 3: V, F, V, V.'],
        a, b, c)


# ---------- 5. movimentação na malha ----------

def movimentacao():
    marcas_a = {(0, 3): 'R', (3, 0): 'A', (2, 1): 'B', (4, 3): 'C'}
    a = bloco(1, 'O robô R seguiu o caminho tracejado. Aonde ele chegou? Circule.', item(
        malha(5, 4, 48, marcas=marcas_a, caminho=[(0, 3), (1, 3), (2, 3), (3, 3), (3, 2), (3, 1), (3, 0)], rotulo='malha com o robô R e as letras A, B e C'),
        '<p class="conta">→ → → ↑ ↑ ↑</p>' + opcoes(['A', 'B', 'C'], certa='A'), exemplo=True), 'Passe o dedo pelo caminho, começando no R.') + bloco(
        2, 'Agora siga as setas com o dedo. Aonde o robô chega?', item(malha(5, 4, 48, marcas=marcas_a, rotulo='malha com o robô R e as letras A, B e C'),
                                                                  '<p class="conta">↑ ↑ → →</p>' + opcoes(['A', 'B', 'C'])))
    marcas_b = {(0, 4): 'R', (2, 2): 'D', (3, 2): 'E', (2, 3): 'F', (5, 0): '★'}
    b = bloco(1, 'Siga: 3 para a direita, 2 para cima, 1 para a esquerda. Aonde o robô chega?', item(
        malha(6, 5, 42, marcas=marcas_b, rotulo='malha com o robô R, as letras D, E e F e uma estrela'), opcoes(['D', 'E', 'F'])), 'Conte um quadradinho por vez.') + bloco(
        2, 'Escreva o caminho do robô R até a estrela, usando setas.', '<p class="regra">Caminho: <span class="linha-resp"></span></p>')
    marcas_c = {(0, 4): 'R', (3, 3): 'G', (3, 1): 'H', (1, 2): 'J'}
    c = bloco(1, 'O robô R está olhando para cima. Siga as ordens. Aonde ele chega?', item(
        malha(6, 5, 42, marcas=marcas_c, rotulo='malha com o robô R e as letras G, H e J'),
        '<p class="conta">anda 2, vira à direita, anda 3, vira à direita, anda 1</p>' + opcoes(['G', 'H', 'J'])),
        'Quando o robô vira, o lado para onde ele olha muda. Gire a folha ou o corpo se ajudar.') + bloco(
        2, 'Escreva ordens para o robô R ir até a letra J. Use "anda" e "vira à direita" ou "vira à esquerda".', linhas(2)) + bloco(
        3, 'Descreva o caminho da porta da sala até a sua carteira. Use frente, direita e esquerda.', linhas(2))
    return ficha(
        'movimentacao-na-malha-e-mudancas-de-direcao', 'Movimentação na malha e mudanças de direção', '3º ano',
        'Seguir e escrever caminhos na malha quadriculada com setas e com ordens de andar e virar, como um robô.',
        ['EF03MA12'], '30 a 45 minutos', 'Fita crepe para fazer uma malha no chão, um carrinho ou boneco e cartões com setas.',
        ['Faça uma malha no chão com fita crepe. O estudante é o robô e anda um quadrado por vez, seguindo as setas.',
         'Mostre a diferença entre "para a direita" na folha e "vira à direita", que depende de para onde o robô está olhando.',
         'Na versão A, o caminho já está desenhado: o estudante só confirma com o dedo.',
         'Na versão B, o estudante conta os quadradinhos de cada trecho e escreve as setas.',
         'Na versão C, um colega segue as ordens que o estudante escreveu, para conferir.'],
        ['Andar o caminho com o próprio corpo antes da folha faz muita diferença. Use poucas ordens por vez.',
         'Combine as palavras de direção e não troque durante a atividade. A programação de robôs costuma interessar estudantes autistas.',
         'A malha no chão dá movimento. Peça que o estudante seja o robô e depois o programador.'],
        ['Bloco 1: A. Bloco 2: B.', 'Bloco 1: D. Bloco 2: → → → → → ↑ ↑ ↑ ↑ (ou outro caminho que chegue à estrela).',
         'Bloco 1: G. Bloco 2: por exemplo, anda 2, vira à direita, anda 1. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- 6. sólidos e planificações ----------

def solidos_planificacoes():
    a = bloco(1, 'Qual é a planificação do sólido? Circule.', grade([
        item(solido('cubo', 90), opcoes([planificacao('cubo', 18), planificacao('cilindro', 18)], certa=planificacao('cubo', 18)), exemplo=True),
        item(solido('cilindro', 90), opcoes([planificacao('cone', 16), planificacao('cilindro', 18)])),
        item(solido('piramide', 90), opcoes([planificacao('piramide', 18), planificacao('cubo', 18)])),
    ], 1), 'Abra uma caixa de verdade para ver a planificação.')
    b = bloco(1, 'Conte e complete o quadro.', tabela(['Sólido', 'Faces', 'Vértices', 'Arestas'], [
        [solido('cubo', 56), '6', '8', '12'], [solido('bloco', 56), '', '', ''], [solido('piramide', 56), '', '', ''], [solido('prisma', 56), '', '', '']]),
        'Face é cada lado plano, vértice é cada ponta, aresta é cada linha onde duas faces se encontram.') + bloco(
        2, 'Quais rolam? Circule.', opcoes([solido(s, 60) for s in ('cubo', 'cilindro', 'piramide', 'cone')]))
    c = bloco(1, 'Escreva o nome do sólido de cada planificação.', grade([
        item(planificacao(t, 24), '<p class="regra"><span class="linha-resp"></span></p>') for t in ('bloco', 'prisma', 'cone', 'piramide')], 2)) + bloco(
        2, 'Compare a pirâmide de base quadrada e o prisma de base triangular.', tabela(['', 'Pirâmide', 'Prisma'], [
            ['Quantas faces?', '', ''], ['Quantos vértices?', '', ''], ['Quantas arestas?', '', ''], ['A base tem forma de', '', '']])) + bloco(
        3, 'Desenhe uma planificação do cubo diferente da cruz.', caixa_desenho('40mm'), 'Recorte e monte para conferir.')
    return ficha(
        'solidos-geometricos-e-planificacoes', 'Sólidos geométricos e planificações', '3º ao 5º ano',
        'Reconhecer prismas, pirâmides, cilindros e cones, contar faces, vértices e arestas e associar cada sólido à sua planificação.',
        ['EF03MA14', ('EF04MA17', 'versão C'), ('EF05MA16', 'versão C')], '40 a 50 minutos',
        'Caixas de papelão (de creme dental, de sapato), latas, casquinhas e moldes de planificação para recortar e montar.',
        ['Desmonte uma caixa com a turma e mostre a planificação aberta na mesa. Depois, monte de novo.',
         'Passe o dedo nas faces, nas arestas e nos vértices de um sólido de verdade, dizendo o nome de cada parte.',
         'Na versão A, deixe o sólido de verdade ao lado da folha.',
         'Na versão B, marque com adesivo cada vértice já contado, para não contar duas vezes.',
         'Na versão C, recorte a planificação desenhada pelo estudante e monte para ver se fecha.'],
        ['Manusear e montar o sólido vale mais que a figura. Use os mesmos três nomes (face, aresta, vértice) com o mesmo gesto.',
         'A contagem organizada (marcar o que já foi contado) ajuda a evitar a frustração do erro. Avise se o recorte e a cola tiverem textura incômoda.',
         'Montar e desmontar caixas dá movimento. Proponha a caça aos sólidos na sala, com tempo combinado.'],
        ['Bloco 1: a planificação do cilindro; a da pirâmide.',
         'Bloco 1: bloco 6, 8, 12; pirâmide 5, 5, 8; prisma 5, 6, 9. Bloco 2: cilindro e cone.',
         'Bloco 1: bloco retangular, prisma de base triangular, cone, pirâmide de base quadrada. Bloco 2: pirâmide 5 faces, 5 vértices, 8 arestas, base quadrada; prisma 5 faces, 6 vértices, 9 arestas, base triangular. Bloco 3: várias respostas (há 11 planificações do cubo).'],
        a, b, c)


# ---------- 7. polígonos e figuras congruentes ----------

TRAPEZIO = [(30, 4), (100, 4), (126, 70), (4, 70)]
PARALELO = [(34, 4), (126, 4), (96, 70), (4, 70)]
RETANGULO = [(4, 4), (130, 4), (130, 66), (4, 66)]


def poligonos():
    a = bloco(1, 'Conte os lados. Circule o número.', grade([
        item(regular(3, 46), opcoes([3, 4], certa=3), exemplo=True),
        item(regular(4, 46, rot=-45), opcoes([4, 5])),
        item(poligono_svg(TRAPEZIO, rotulo='trapézio'), opcoes([3, 4])),
        item(regular(6, 46), opcoes([5, 6])),
    ], 2), 'Passe o dedo em cada lado e faça um risquinho.') + bloco(2, 'Qual é igual ao modelo? Circule.', item(
        regular(3, 40, preench=CLARO['amarelo'], rotulo='modelo: triângulo'),
        opcoes([regular(3, 40, rot=90), regular(3, 24), regular(4, 40, rot=-45)])), 'Recorte o modelo e coloque por cima para conferir.')
    b = bloco(1, 'Complete o quadro.', tabela(['Figura', 'Nome', 'Lados', 'Vértices'], [
        [regular(3, 26), 'triângulo', '3', '3'], [regular(4, 26, rot=-45), '', '', ''], [poligono_svg([(p[0] * .5, p[1] * .5) for p in RETANGULO], rotulo='retângulo'), '', '', ''],
        [poligono_svg([(p[0] * .5, p[1] * .5) for p in TRAPEZIO], rotulo='trapézio'), '', '', ''], [poligono_svg([(p[0] * .5, p[1] * .5) for p in PARALELO], rotulo='paralelogramo'), '', '', '']]),
        'Nomes: quadrado, retângulo, trapézio, paralelogramo.') + bloco(2, 'Copie a figura na malha ao lado.', grade([
            malha(6, 5, 30, pintadas=[(1, 1), (2, 1), (3, 1), (1, 2), (2, 2), (1, 3)], rotulo='figura pintada na malha'), malha(6, 5, 30, rotulo='malha vazia')], 2))
    c = bloco(1, 'Responda olhando as figuras.', grade([
        item(regular(4, 32, rot=-45)), item(poligono_svg([(p[0] * .6, p[1] * .6) for p in RETANGULO], rotulo='retângulo')),
        item(poligono_svg([(p[0] * .6, p[1] * .6) for p in TRAPEZIO], rotulo='trapézio')), item(poligono_svg([(p[0] * .6, p[1] * .6) for p in PARALELO], rotulo='paralelogramo'))], 4) +
        frases(['Todas têm quantos lados?', 'Quais têm os 4 lados do mesmo tamanho?', 'Quais têm dois pares de lados paralelos?'])) + bloco(
        2, 'Desenhe na malha ao lado uma figura congruente à do modelo, mas virada.', grade([
            malha(6, 5, 30, pintadas=[(0, 0), (1, 0), (2, 0), (2, 1), (2, 2), (3, 2)], rotulo='figura pintada na malha'), malha(6, 5, 30, rotulo='malha vazia')], 2),
        'Congruente quer dizer com a mesma forma e o mesmo tamanho.')
    return ficha(
        'poligonos-e-figuras-congruentes', 'Polígonos e figuras congruentes', '3º ano',
        'Contar lados e vértices, nomear triângulo, quadrado, retângulo, trapézio e paralelogramo e reconhecer figuras congruentes.',
        ['EF03MA15', 'EF03MA16'], '40 a 50 minutos', 'Figuras de papel para recortar e sobrepor, palitos e massinha para montar polígonos, malha quadriculada.',
        ['Monte polígonos com palitos e massinha: cada palito é um lado, cada bolinha é um vértice.',
         'Mostre que girar uma figura não muda a forma nem o tamanho. Faça com uma figura de papel.',
         'Na versão A, o estudante recorta o modelo e sobrepõe às opções.',
         'Na versão B, conte os quadradinhos de cada linha da figura antes de copiar.',
         'Na versão C, pergunte se o quadrado também é um retângulo e deixe a turma discutir.'],
        ['Montar a figura com palitos antes de desenhar ajuda a fixar os nomes. Apresente um nome novo por vez.',
         'Sobrepor figuras dá uma regra clara de conferência. Avise antes de girar a folha, porque a mudança pode incomodar.',
         'Recortar e sobrepor dá movimento. A cópia na malha pode virar jogo de duplas.'],
        ['Bloco 1: 4; 4; 6. Bloco 2: o primeiro triângulo (virado, do mesmo tamanho).',
         'Bloco 1: quadrado 4 e 4; retângulo 4 e 4; trapézio 4 e 4; paralelogramo 4 e 4. Bloco 2: cópia da figura.',
         'Bloco 1: 4 lados; o quadrado; quadrado, retângulo e paralelogramo. Bloco 2: a mesma figura girada ou virada.'],
        a, b, c)


# ---------- 8. medidas e áreas ----------

def areas():
    f6 = [(0, 0), (1, 0), (2, 0), (0, 1), (1, 1), (2, 1)]
    a = bloco(1, 'Conte os quadradinhos pintados. Circule.', grade([
        item(malha(4, 3, 34, pintadas=f6), opcoes([6, 4], certa=6), exemplo=True),
        item(malha(4, 3, 34, pintadas=[(0, 0), (1, 0), (0, 1), (1, 1)]), opcoes([4, 8])),
        item(malha(4, 3, 34, pintadas=[(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1), (2, 1), (3, 1)]), opcoes([6, 8])),
    ], 3)) + bloco(2, 'Qual figura cobre mais quadradinhos? Circule a letra.', grade([
        item(malha(4, 3, 34, pintadas=[(0, 0), (1, 0), (2, 0), (0, 1), (1, 1)], marcas={(3, 2): 'A'})),
        item(malha(4, 3, 34, pintadas=[(0, 0), (1, 0), (0, 1)], marcas={(3, 2): 'B'}))], 2) + opcoes(['A', 'B']), 'A letra mostra o nome da figura.')
    b = bloco(1, 'Meça a sua mesa com palmos e com lápis.', tabela(['Medida com', 'Quantos?'], [['palmos', ''], ['lápis', ''], ['palmos de um colega', '']]) +
              frases(['Por que os números ficaram diferentes?']), 'A medida depende da unidade que você usa.') + bloco(
        2, 'Quantos quadradinhos cada figura cobre?', grade([
            item(malha(5, 3, 30, pintadas=[(0, 0), (1, 0), (2, 0), (3, 0), (0, 1), (1, 1)]), f'<p class="du">{VAZIO} quadradinhos</p>'),
            item(malha(5, 3, 30, pintadas=[(1, 0), (0, 1), (1, 1), (2, 1), (1, 2)]), f'<p class="du">{VAZIO} quadradinhos</p>'),
            item(malha(5, 3, 30, pintadas=[(c, l) for c in range(5) for l in range(2)]), f'<p class="du">{VAZIO} quadradinhos</p>')], 3)) + bloco(
        3, 'Qual cobre mais: a capa do caderno ou a capa do livro? Coloque uma em cima da outra e escreva.', '<p class="regra"><span class="linha-resp"></span></p>')
    c = bloco(1, 'Escreva a área de cada figura, em quadradinhos.', grade([
        item(malha(5, 4, 28, pintadas=[(c, l) for c in range(3) for l in range(3)]), f'<p class="du">{VAZIO}</p>'),
        item(malha(5, 4, 28, pintadas=[(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (0, 1), (0, 2), (0, 3)]), f'<p class="du">{VAZIO}</p>'),
        item(malha(5, 4, 28, pintadas=[(1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2), (2, 2), (1, 3), (2, 3)]), f'<p class="du">{VAZIO}</p>')], 3)) + bloco(
        2, 'Desenhe duas figuras diferentes, cada uma com área de 8 quadradinhos.', malha(14, 5, 30, rotulo='malha vazia')) + bloco(
        3, 'Leia e resolva.', problema('Um tapete cobre <b>4</b> fileiras de <b>5</b> quadrados do piso. Quantos quadrados ele cobre?', '20mm'))
    return ficha(
        'medidas-e-areas-com-quadradinhos', 'Medidas e áreas com quadradinhos', '3º e 4º ano',
        'Medir com unidades diferentes, comparar superfícies por sobreposição e medir a área de figuras contando quadradinhos.',
        ['EF03MA17', 'EF03MA21', ('EF04MA21', 'versão C')], '40 a 50 minutos',
        'Quadrados de papel do mesmo tamanho, malha quadriculada, capas de caderno e de livro para sobrepor.',
        ['Meça a mesa com palmos de dois estudantes e com lápis. Pergunte por que os números são diferentes.',
         'Cubra uma capa de caderno com quadrados de papel e conte. Explique que área é quanto a figura cobre.',
         'Na versão A, o estudante pode pintar com o dedo cada quadradinho enquanto conta.',
         'Na versão B, compare as capas colocando uma em cima da outra.',
         'Na versão C, mostre que figuras diferentes podem ter a mesma área.'],
        ['Cobrir de verdade com quadrados de papel antes da malha. Conte junto, marcando cada quadradinho com um ponto.',
         'Marcar o que já foi contado dá ordem à contagem. Evite malhas muito pequenas ou com muitas cores.',
         'Medir objetos pela sala dá movimento. Na malha, peça que o estudante crie figuras para o colega descobrir a área.'],
        ['Bloco 1: 4; 8. Bloco 2: A.', 'Bloco 1: respostas pessoais (a unidade muda o número). Bloco 2: 6, 5, 10. Bloco 3: resposta pessoal.',
         'Bloco 1: 9, 8, 10. Bloco 2: respostas pessoais. Bloco 3: 20 quadrados.'],
        a, b, c)


# ---------- 9. horas, minutos e segundos ----------

def horas_minutos():
    a = bloco(1, 'Que horas são? Circule.', grade([
        item(relogio(3, 0, 110), opcoes(['3 horas', '9 horas'], certa='3 horas'), exemplo=True),
        item(relogio(7, 0, 110), opcoes(['12 horas', '7 horas'])),
        item(relogio(10, 30, 110), opcoes(['10 e meia', '6 horas'])),
    ], 2), 'O ponteiro pequeno mostra a hora. O grande mostra os minutos.') + bloco(
        2, 'Circule o relógio que marca a mesma hora.', item('<p class="digital">08:00</p>', opcoes([relogio(8, 0, 100), relogio(4, 0, 100)])))
    b = bloco(1, 'Complete.', grade([f'<p class="conta">1 hora = {VAZIO} minutos</p>', f'<p class="conta">1 minuto = {VAZIO} segundos</p>',
                                     f'<p class="conta">meia hora = {VAZIO} minutos</p>', f'<p class="conta">2 horas = {VAZIO} minutos</p>'], 2)) + bloco(
        2, 'Escreva a hora como no relógio digital.', grade([
            item(relogio(2, 15, 104), '<p class="digital">02:15</p>', exemplo=True), item(relogio(6, 45, 104), '<p class="digital">__ : __</p>'),
            item(relogio(9, 20, 104), '<p class="digital">__ : __</p>'), item(relogio(11, 5, 104), '<p class="digital">__ : __</p>')], 4)) + bloco(
        3, 'Quanto tempo dura? Ligue.', ligar([('um piscar de olhos', '1 hora'), ('escovar os dentes', '1 segundo'), ('uma aula de Educação Física', '2 minutos')]))
    c = bloco(1, 'Complete.', grade([f'<p class="conta">3 horas = {VAZIO} minutos</p>', f'<p class="conta">90 minutos = {VAZIO} hora e {VAZIO} minutos</p>',
                                     f'<p class="conta">3 minutos = {VAZIO} segundos</p>', f'<p class="conta">120 segundos = {VAZIO} minutos</p>'], 1)) + bloco(
        2, 'Escreva a hora de dois jeitos.', grade([
            item(relogio(4, 50, 100), '<p class="digital">__ : __</p><p class="du">10 para as ' + VAZIO + '</p>'),
            item(relogio(1, 40, 100), '<p class="digital">__ : __</p><p class="du">20 para as ' + VAZIO + '</p>')], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('O filme começou às <b>14:30</b> e terminou às <b>16:10</b>. Quanto tempo durou?', '20mm'),
            problema('A aula começa às <b>7:30</b> e dura <b>50</b> minutos. A que horas termina?', '20mm')], 2))
    return ficha(
        'horas-minutos-e-segundos', 'Horas, minutos e segundos', '3º e 4º ano',
        'Ler horas em relógios de ponteiro e digitais, relacionar hora, minuto e segundo e calcular quanto tempo dura uma atividade.',
        ['EF03MA23', ('EF04MA22', 'versão C')], '40 a 50 minutos', 'Relógio de ponteiros de papelão (Kit de apoio visual), um relógio digital ou celular e um cronômetro.',
        ['Comece pelo relógio de papelão: mexa só o ponteiro grande e conte os minutos de 5 em 5.',
         'Com o cronômetro, faça a turma sentir quanto é um segundo e quanto é um minuto (ficar em silêncio, bater palmas).',
         'Na versão A, só horas exatas e "e meia".',
         'Na versão B, mostre que cada número do relógio vale 5 minutos para o ponteiro grande.',
         'Na versão C, use uma reta do tempo para calcular a duração do filme: de 14:30 até 15:00, até 16:00, até 16:10.'],
        ['Ligue as horas à rotina do estudante (entrada, recreio, saída) e deixe um relógio de papelão na mesa. Só um tipo de hora por dia.',
         'Uma rotina visual com horários na parede dá previsibilidade. Avise que relógios digitais e de ponteiro mostram a mesma hora de jeitos diferentes.',
         'Use o cronômetro em desafios curtos: quantas palmas em 10 segundos? O tempo marcado ajuda a organizar a tarefa.'],
        ['Bloco 1: 7 horas; 10 e meia. Bloco 2: o primeiro relógio (8 horas).',
         'Bloco 1: 60, 60, 30, 120. Bloco 2: 06:45, 09:20, 11:05. Bloco 3: piscar 1 segundo; escovar 2 minutos; Educação Física 1 hora.',
         'Bloco 1: 180; 1 hora e 30 minutos; 180; 2. Bloco 2: 04:50, 10 para as 5; 01:40, 20 para as 2. Bloco 3: 1 hora e 40 minutos; 8:20.'],
        a, b, c)


# ---------- 10. compra, venda e troca ----------

def compra_venda():
    a = bloco(1, 'Quanto dinheiro tem? Circule.', grade([
        item(dinheiro([5, 2]), opcoes([7, 5], certa=7), exemplo=True),
        item(dinheiro([10, 5]), opcoes([15, 10])),
        item(dinheiro([2, 2, 1]), opcoes([3, 5])),
    ], 1), 'Comece pela cédula de maior valor.') + bloco(2, 'Você tem R$ 10. Dá para comprar? Circule sim ou não.', grade([
        item(produto('suco', '4'), opcoes(['sim', 'não'])), item(produto('pao', '12'), opcoes(['sim', 'não']))], 2))
    b = bloco(1, 'Quanto custa? Some.', grade([
        item(produto('suco', '4') + produto('pao', '3'), f'<p class="conta">4 + 3 = {resposta("7")}</p>', exemplo=True),
        item(produto('leite', '5') + produto('banana', '6'), f'<p class="conta">{VAZIO}</p>'),
        item(produto('ovo', '9') + produto('maca', '2'), f'<p class="conta">{VAZIO}</p>')], 1)) + bloco(
        2, 'Qual é o troco?', grade([
            f'<p class="conta">Paguei R$ 10 por um suco de R$ 4. Troco: R$ {VAZIO}</p>', f'<p class="conta">Paguei R$ 20 por um livro de R$ 15. Troco: R$ {VAZIO}</p>'], 1)) + bloco(
        3, 'Troque.', grade([f'<p class="conta">1 cédula de R$ 10 = {VAZIO} cédulas de R$ 2</p>', f'<p class="conta">1 cédula de R$ 20 = {VAZIO} cédulas de R$ 5</p>'], 1))
    c = bloco(1, 'Complete a lista de compras.', tabela(['Produto', 'Preço', 'Quantidade', 'Total'], [
        ['Caderno', 'R$ 12', '2', 'R$ 24'], ['Lápis', 'R$ 3', '4', ''], ['Borracha', 'R$ 2', '3', ''], ['Mochila', 'R$ 45', '1', ''], ['<b>Total da compra</b>', '', '', '']]),
        'A primeira linha é o exemplo.') + bloco(2, 'Leia e resolva.', grade([
            problema('Paguei a compra acima com <b>R$ 100</b>. Quanto recebi de troco?', '20mm'),
            problema('Lia tem <b>R$ 30</b> e quer comprar dois livros de <b>R$ 14</b>. O dinheiro dá? Sobra quanto?', '20mm')], 2)) + bloco(
        3, 'Escreva três jeitos diferentes de pagar R$ 20 com cédulas e moedas.', linhas(3))
    return ficha(
        'compra-venda-e-troca-com-dinheiro', 'Compra, venda e troca com dinheiro', '3º ano',
        'Contar dinheiro, decidir se dá para comprar, calcular o total e o troco e trocar cédulas de valores diferentes.',
        ['EF03MA24'], '40 a 50 minutos', 'Dinheiro de brincadeira, embalagens vazias com preços e uma "feirinha" montada na sala.',
        ['Monte uma feirinha com embalagens e preços. Os estudantes compram e vendem com dinheiro de brincadeira.',
         'Ao contar dinheiro, comece pela cédula de maior valor e diga o total a cada nota.',
         'Para o troco, conte do preço até o valor pago: do 4 até o 10 faltam 6.',
         'Na versão B, faça as trocas com as cédulas de verdade em cima da mesa.',
         'Na versão C, peça que o estudante confira a soma da lista com a calculadora, depois de fazer no papel.'],
        ['Dinheiro de brincadeira em situações de vida diária (lanche, mercado) dá sentido ao cálculo. Use poucos valores por vez.',
         'Combine as regras da feirinha antes (quem vende, quem compra, quanto tempo) e mantenha os preços fixos.',
         'A feirinha dá movimento e papéis claros. Alterne vendedor e comprador a cada rodada.'],
        ['Bloco 1: 15; 5. Bloco 2: sim; não.', 'Bloco 1: 11; 11. Bloco 2: R$ 6; R$ 5. Bloco 3: 5; 4.',
         'Bloco 1: lápis R$ 12; borracha R$ 6; mochila R$ 45; total R$ 87. Bloco 2: R$ 13; dá, e sobram R$ 2. Bloco 3: respostas pessoais.'],
        a, b, c)


# ---------- 11. chances ----------

def chances():
    a = bloco(1, 'Sem olhar, tiro uma bolinha do pote. Qual cor tem mais chance de sair? Circule.', grade([
        item(pote(['amarelo'] * 6 + ['verde'] * 2, 120, 'pote com 6 bolinhas amarelas e 2 verdes'), opcoes(['amarela', 'verde'], certa='amarela'), exemplo=True),
        item(pote(['rosa'] * 2 + ['verde'] * 7, 120, 'pote com 2 bolinhas rosas e 7 verdes'), opcoes(['rosa', 'verde'])),
    ], 2), 'Pinte as bolinhas com as cores do pote se a folha for impressa em preto e branco.') + bloco(
        2, 'Gire a roleta. Em que cor ela para mais vezes?', item(roleta(['amarelo', 'amarelo', 'amarelo', 'verde'], 130, 'roleta com 3 partes amarelas e 1 verde'), opcoes(['amarela', 'verde'])))
    b = bloco(1, 'Escreva todos os resultados possíveis.', frases(['Jogar uma moeda:', 'Jogar um dado:', 'Tirar uma bolinha de um pote com bolinhas amarelas e verdes:'])) + bloco(
        2, 'Jogue uma moeda 10 vezes. Faça um risquinho a cada jogada.', tabela(['Resultado', 'Risquinhos', 'Total'], [['cara', '', ''], ['coroa', '', '']])) + bloco(
        3, 'Qual tem mais chance? Circule.', grade([
            item(pote(['amarelo'] * 5 + ['rosa'] * 3, 110, 'pote com 5 bolinhas amarelas e 3 rosas'), opcoes(['amarela', 'rosa'])),
            item(roleta(['verde', 'rosa', 'verde', 'rosa', 'verde', 'verde'], 110, 'roleta com 4 partes verdes e 2 rosas'), opcoes(['verde', 'rosa']))], 2))
    c = bloco(1, 'Um pote tem 5 bolinhas amarelas, 3 verdes e 1 rosa. Ordene da cor mais provável para a menos provável.', seq_numeros([None, None, None])) + bloco(
        2, 'Classifique: vai acontecer com certeza, tem muita chance, tem pouca chance ou é impossível?', tabela(['Acontecimento', 'Chance'], [
            ['O sol nascer amanhã', ''], ['Chover no Rio Grande do Sul em algum dia do ano', ''], ['Tirar 7 num dado comum', ''], ['Tirar 6 num dado na primeira jogada', '']])) + bloco(
        3, 'Faça a experiência: tire uma bolinha, anote e devolva ao pote. Repita 20 vezes.', tabela(['Cor', 'Risquinhos', 'Total'], [['amarela', '', ''], ['verde', '', ''], ['rosa', '', '']]) +
        frases(['A cor que saiu mais foi a que você esperava?']))
    return ficha(
        'chances-o-que-e-mais-provavel', 'Chances: o que é mais provável?', '3º e 4º ano',
        'Listar os resultados possíveis de jogos de moeda, dado, pote e roleta, estimar o mais provável e conferir com experiências.',
        ['EF03MA25', ('EF04MA26', 'versão C')], '30 a 45 minutos', 'Moedas, dados, um pote opaco com bolinhas ou tampinhas coloridas e uma roleta de papelão com clipe.',
        ['Mostre o pote e pergunte: se eu tirar sem olhar, qual cor deve sair? Depois tire e confira.',
         'Repita a experiência várias vezes e anote no quadro com risquinhos.',
         'Na versão A, monte o pote de verdade com as mesmas quantidades da folha.',
         'Na versão B, cada estudante joga a moeda e a turma junta os resultados.',
         'Na versão C, compare a previsão com o resultado da experiência: nem sempre sai o mais provável.'],
        ['Experimente com objetos reais, poucas cores e quantidades bem diferentes (6 e 2) antes de quantidades parecidas.',
         'A incerteza pode incomodar. Explique antes que o resultado pode variar e que isso faz parte do jogo, e não é erro.',
         'Jogos de sorte dão movimento e expectativa. Combine a quantidade de jogadas e risque cada uma.'],
        ['Bloco 1: verde. Bloco 2: amarela.', 'Bloco 1: cara ou coroa; 1, 2, 3, 4, 5 ou 6; amarela ou verde. Bloco 2: resposta pessoal. Bloco 3: amarela; verde.',
         'Bloco 1: amarela, verde, rosa. Bloco 2: com certeza; muita chance; impossível; pouca chance. Bloco 3: resposta pessoal.'],
        a, b, c)


# ---------- 12. tabelas e gráficos ----------

def tabelas_graficos():
    graf = grafico_barras(['maçã', 'banana', 'suco'], [5, 3, 2], maximo=6, icones=['maca', 'banana', 'suco'], celula=36,
                          rotulo='gráfico de colunas: maçã 5, banana 3, suco 2')
    fig = lambda t: svg(44, 44, figura(t, 0, 0, 44), 'fig', t)
    a = bloco(1, 'A turma votou no lanche preferido. Olhe o gráfico.', item(graf), 'Cada quadradinho pintado é um voto.') + bloco(
        2, 'Responda. Circule.', grade([
            item('<p class="legenda">Qual lanche teve mais votos?</p>', opcoes([fig('maca'), fig('banana'), fig('suco')])),
            item('<p class="legenda">Quantos votos teve a banana?</p>', opcoes([3, 5]))], 2))
    linhas_tab = [['pega-pega', '6', '4'], ['futebol', '5', '7'], ['amarelinha', '3', '2']]
    b = bloco(1, 'Brincadeira preferida de duas turmas.', tabela(['Brincadeira', 'Turma A', 'Turma B'], linhas_tab) + frases([
        'Quantos estudantes da Turma B preferem futebol?', 'Qual brincadeira a Turma A mais gosta?', 'Quantos estudantes, das duas turmas, preferem pega-pega?'])) + bloco(
        2, 'Pinte o gráfico da Turma A.', grafico_barras(['pega-pega', 'futebol', 'amarelinha'], maximo=7, celula=28, vazio=True, gap=56, rotulo='gráfico vazio para pintar'))
    c = bloco(1, 'Faça uma pesquisa com a turma.', frases(['Pergunta da pesquisa:', 'Opções de resposta:']) +
              tabela(['Opção', 'Contagem', 'Total'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']])) + bloco(
        2, 'Faça o gráfico de colunas com os resultados.', grafico_barras(['', '', '', ''], maximo=8, celula=26, vazio=True, rotulo='gráfico vazio para pintar'),
        'Escreva o nome de cada opção embaixo da coluna.') + bloco(
        3, 'Escreva um texto curto sobre o resultado.', linhas(3), 'Diga qual opção ganhou, qual teve menos votos e quantas pessoas responderam.')
    return ficha(
        'tabelas-graficos-e-pesquisa-da-turma', 'Tabelas, gráficos e pesquisa da turma', '3º e 4º ano',
        'Ler gráficos de colunas e tabelas de dupla entrada, construir um gráfico e fazer uma pesquisa com a turma.',
        ['EF03MA26', 'EF03MA27', 'EF03MA28', ('EF04MA27', 'versão B')], '50 minutos ou duas aulas',
        'Cartões ou prendedores para a votação, cartolina com uma malha grande e lápis de cor.',
        ['Faça uma votação de verdade: cada estudante coloca um prendedor na coluna da opção que escolheu.',
         'Mostre que cada quadradinho do gráfico é uma pessoa. Conte a coluna inteira junto.',
         'Na versão A, o gráfico já vem pintado. O estudante só lê e circula.',
         'Na versão B, leia a tabela linha por linha com uma régua embaixo da linha.',
         'Na versão C, o estudante escolhe a pergunta, pesquisa, faz o gráfico e escreve o texto. Pode levar duas aulas.'],
        ['A votação com o próprio corpo (ficar na fila da opção escolhida) mostra a coluna do gráfico de verdade. Use poucas opções.',
         'Tabelas e gráficos dão organização e costumam agradar. Combine uma pergunta com respostas claras e sem ambiguidade.',
         'A pesquisa pela sala dá movimento. Defina o tempo e quantas pessoas o estudante vai entrevistar.'],
        ['Bloco 2: maçã; 3.', 'Bloco 1: 7; pega-pega; 10. Bloco 2: pega-pega 6, futebol 5, amarelinha 3.', 'Respostas pessoais.'],
        a, b, c)


FICHAS = [numeros_milhar, calculo_mental, divisao, regularidades, movimentacao, solidos_planificacoes, poligonos, areas,
          horas_minutos, compra_venda, chances, tabelas_graficos]
