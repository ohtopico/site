"""Fichas do 4º ano."""
from base import ficha
from desenhos import CLARO, TRACO, dinheiro, figura, grupo, svg
from desenhos2 import angulo, balanca_eq, barra_fracao, dourado3, malha, objeto_medida, pizza_fracao, poligono_svg, regular, termometro
from fichas import VAZIO, bloco, caixa_desenho, conta, grade, item, linhas, matriz, opcoes, problema, produto, resposta, seq_numeros, tabela
from ano3 import TRAPEZIO, frases

F = 'font-family="Lexend, sans-serif"'


# ---------- desenhos próprios do 4º ano ----------

def reta_fracao(partes, marcas=None, larg=520, rotulo=None, ini='0', fim='1'):
    """Reta de 0 a 1 dividida em partes iguais; marcas: {índice: texto} escrito acima do traço."""
    m, y = 24, 44
    dx = (larg - 2 * m) / partes
    inner = f'<path d="M{m - 8} {y} H{larg - m + 8}" stroke="{TRACO}" stroke-width="2.5"/>'
    for i in range(partes + 1):
        x = m + i * dx
        alto = 10 if i in (0, partes) else 7
        inner += f'<path d="M{x:.1f} {y - alto} V{y + alto}" stroke="{TRACO}" stroke-width="2"/>'
    inner += f'<text x="{m}" y="{y + 28}" text-anchor="middle" {F} font-size="15" font-weight="600">{ini}</text>'
    inner += f'<text x="{m + partes * dx}" y="{y + 28}" text-anchor="middle" {F} font-size="15" font-weight="600">{fim}</text>'
    for i, t in (marcas or {}).items():
        x = m + i * dx
        inner += f'<circle cx="{x:.1f}" cy="{y}" r="5" fill="{TRACO}"/><text x="{x:.1f}" y="{y - 16}" text-anchor="middle" {F} font-size="14" font-weight="600">{t}</text>'
    return svg(larg, 80, inner, 'reta', rotulo or f'reta de 0 a 1 dividida em {partes} partes iguais')


LETRAS = 'ABCDEFGH'


def malha_coord(colunas, linhas_, itens=None, cel=48, rotulo='malha com colunas de letras e linhas de números'):
    """Malha com letras nas colunas e números nas linhas (como no jogo de batalha naval).
    itens: {(col, lin): tipo de figura ou texto curto}; col e lin começam em 0."""
    m = 26
    inner = ''
    for i in range(colunas):
        inner += f'<text x="{m + i * cel + cel / 2}" y="18" text-anchor="middle" {F} font-size="14" font-weight="600">{LETRAS[i]}</text>'
    for j in range(linhas_):
        inner += f'<text x="12" y="{m + j * cel + cel / 2 + 5}" text-anchor="middle" {F} font-size="14" font-weight="600">{j + 1}</text>'
    for i in range(colunas + 1):
        inner += f'<path d="M{m + i * cel} {m} V{m + linhas_ * cel}" stroke="#8a8a86" stroke-width="1.2"/>'
    for j in range(linhas_ + 1):
        inner += f'<path d="M{m} {m + j * cel} H{m + colunas * cel}" stroke="#8a8a86" stroke-width="1.2"/>'
    inner += f'<rect x="{m}" y="{m}" width="{colunas * cel}" height="{linhas_ * cel}" fill="none" stroke="{TRACO}" stroke-width="2"/>'
    for (c, l), t in (itens or {}).items():
        x, y = m + c * cel, m + l * cel
        if t in ('maca', 'estrela', 'bola', 'peixe', 'flor', 'banana', 'pao', 'suco', 'leite', 'ovo', 'lapis'):
            inner += figura(t, x + 6, y + 6, cel - 12)
        else:
            inner += f'<text x="{x + cel / 2}" y="{y + cel / 2 + 6}" text-anchor="middle" {F} font-size="{cel * .42:.0f}" font-weight="600">{t}</text>'
    return svg(m + colunas * cel + 4, m + linhas_ * cel + 4, inner, 'malha', rotulo)


def malha_eixo(colunas, linhas_, pintadas, eixo, cel=28, rotulo='malha com metade da figura e o eixo de simetria'):
    """Malha com um eixo de simetria vertical tracejado entre as colunas eixo-1 e eixo."""
    inner = ''.join(f'<rect x="{2 + c * cel}" y="{2 + l * cel}" width="{cel}" height="{cel}" fill="{CLARO["amarelo"]}"/>' for c, l in pintadas)
    for i in range(colunas + 1):
        inner += f'<path d="M{2 + i * cel} 2 V{2 + linhas_ * cel}" stroke="#8a8a86" stroke-width="1.2"/>'
    for j in range(linhas_ + 1):
        inner += f'<path d="M2 {2 + j * cel} H{2 + colunas * cel}" stroke="#8a8a86" stroke-width="1.2"/>'
    inner += f'<rect x="2" y="2" width="{colunas * cel}" height="{linhas_ * cel}" fill="none" stroke="{TRACO}" stroke-width="2"/>'
    inner += f'<path d="M{2 + eixo * cel} -2 V{6 + linhas_ * cel}" stroke="{TRACO}" stroke-width="3.5" stroke-dasharray="8 5"/>'
    return svg(colunas * cel + 4, linhas_ * cel + 8, f'<g transform="translate(0 2)">{inner}</g>', 'malha', rotulo)


def com_eixo(tipo, eixo_ok):
    """Figura com uma linha tracejada (para decidir se é eixo de simetria)."""
    tr = f'stroke="{TRACO}" stroke-width="3" stroke-dasharray="7 5"'
    est = f'fill="#fff" stroke="{TRACO}" stroke-width="2.5"'
    if tipo == 'quadrado':
        inner = f'<rect x="6" y="6" width="90" height="90" {est}/><path d="M2 2 L100 100" {tr}/>'
        w, h = 102, 102
    elif tipo == 'retangulo':
        inner = f'<rect x="6" y="16" width="130" height="70" {est}/><path d="M2 12 L140 90" {tr}/>'
        w, h = 142, 102
    else:
        inner = f'<polygon points="56,6 106,94 6,94" {est}/><path d="M56 0 V100" {tr}/>'
        w, h = 112, 102
    return svg(w, h, inner, 'simetria', f'{tipo} com uma linha tracejada')


def grafico_escala(categorias, valores=None, maximo=35, passo=5, celula=22, larg=40, gap=26, rotulo=None):
    """Gráfico de colunas em que cada quadradinho vale `passo`. Sem valores, sai vazio para pintar."""
    m = 34
    n_lin = maximo // passo
    base = n_lin * celula + 8
    w = m + gap / 2 + len(categorias) * (larg + gap)
    inner = ''
    for j in range(n_lin + 1):
        y = base - j * celula
        inner += f'<text x="{m - 6}" y="{y + 4}" text-anchor="end" {F} font-size="11">{j * passo}</text>'
    for i, cat in enumerate(categorias):
        x = m + gap / 2 + i * (larg + gap)
        v = valores[i] // passo if valores else 0
        for k in range(n_lin):
            fill = CLARO['amarelo'] if k < v else '#fff'
            inner += f'<rect x="{x}" y="{base - (k + 1) * celula}" width="{larg}" height="{celula}" fill="{fill}" stroke="{TRACO}" stroke-width="{1.4 if k < v else .8}"/>'
        inner += f'<text x="{x + larg / 2}" y="{base + 18}" text-anchor="middle" {F} font-size="12">{cat}</text>'
    inner += f'<path d="M{m} {base} H{w} M{m} {base} V2" stroke="{TRACO}" stroke-width="2"/>'
    desc = rotulo or ('gráfico de colunas: ' + ', '.join(f'{c} {v}' for c, v in zip(categorias, valores)) if valores else 'gráfico de colunas vazio para pintar')
    return svg(w + 4, base + 26, inner, 'grafico', desc)


def n(x):
    """Número com espaço separando os milhares (como nos livros didáticos)."""
    return f'{x:,}'.replace(',', '&#8239;')


# ---------- 1. números até 99 999 ----------

def numeros_dezena_milhar():
    quadro = lambda d: tabela(['DM', 'UM', 'C', 'D', 'U'], [list(d)])
    a = bloco(1, 'Leia o quadro de valor. Circule o número.', grade([
        item(quadro('23045'), opcoes([n(23045), n(2345)], certa=n(23045)), exemplo=True),
        item(quadro('10500'), opcoes([n(1500), n(10500)])),
        item(quadro('42130'), opcoes([n(42130), n(4213)])),
    ], 1), 'DM = dezena de milhar, UM = unidade de milhar, C = centena, D = dezena, U = unidade.') + bloco(
        2, 'Complete. A sequência vai de 10 mil em 10 mil.', seq_numeros([n(10000), n(20000), None, n(40000), None]))
    b = bloco(1, 'Decomponha como no exemplo.', '<div class="conta-menor">' + grade([
        f'<p class="conta">{n(34572)} = 3 × {n(10000)} + 4 × 1000 + 5 × 100 + 7 × 10 + 2</p>',
        f'<p class="conta">{n(21305)} = {VAZIO} × {n(10000)} + {VAZIO} × 1000 + {VAZIO} × 100 + {VAZIO}</p>',
        f'<p class="conta">{n(40060)} = {VAZIO} × {n(10000)} + {VAZIO} × 10</p>',
        f'<p class="conta">{n(18740)} = {VAZIO} × {n(10000)} + {VAZIO} × 1000 + {VAZIO} × 100 + {VAZIO} × 10</p>'], 1) + '</div>') + bloco(
        2, 'Escreva do menor para o maior.', f'<p class="conta">{n(15230)} &nbsp; {n(12530)} &nbsp; {n(15320)}</p>' + seq_numeros([None, None, None]))
    c = bloco(1, 'Escreva por extenso.', frases([f'{n(45018)}:', f'{n(70300)}:'])) + bloco(2, 'Compare. Escreva &gt;, &lt; ou =.', grade([
        f'<p class="conta">{n(45600)} {VAZIO} {n(46500)}</p>', f'<p class="conta">{n(89999)} {VAZIO} {n(90000)}</p>',
        f'<p class="conta">{n(30303)} {VAZIO} {n(30033)}</p>', f'<p class="conta">{n(72100)} {VAZIO} {n(72100)}</p>'], 2)) + bloco(
        3, 'Use os algarismos 3, 0, 7, 5 e 1, uma vez cada.', frases(['O maior número que posso formar:', 'O menor número de cinco algarismos:'])) + bloco(
        4, 'Complete.', frases([f'O número que vem logo depois de {n(39999)} é', f'O número que vem logo antes de {n(60000)} é']))
    return ficha(
        'numeros-ate-99999-dezena-de-milhar', 'Números até 99 999: a dezena de milhar', '4º ano',
        'Ler, escrever, ordenar e decompor números de cinco algarismos, com adições e multiplicações por 10, 100, 1000 e 10 000.',
        ['EF04MA01', 'EF04MA02'], '40 a 50 minutos', 'Quadro de valor com cinco colunas, cartões com algarismos e fichas sobrepostas (10 000, 1000, 100, 10, 1).',
        ['Monte números com fichas sobrepostas: a ficha de 20 000 com a de 3000 por cima e assim por diante.',
         'No quadro de valor, cada coluna vale dez vezes a da direita. Mostre a troca de 10 unidades de milhar por 1 dezena de milhar.',
         'Leia os números em voz alta, separando a classe dos milhares: "vinte e três mil e quarenta e cinco".',
         'Na versão B, a decomposição usa multiplicações: 3 × 10 000 quer dizer três dezenas de milhar.',
         'Na versão C, o desafio com os algarismos pode ser feito com cartões soltos na mesa.'],
        ['Use sempre o mesmo quadro de valor, com uma cor por coluna. O espaço entre os milhares ajuda a ler: mostre com o dedo.',
         'Regras fixas do quadro de valor dão segurança. Avise antes de mudar de quatro para cinco colunas.',
         'Os cartões com algarismos viram jogo: quem forma o maior número? Rodadas curtas.'],
        [f'Bloco 1: {n(10500)}; {n(42130)}. Bloco 2: {n(30000)} e {n(50000)}.',
         f'Bloco 1: 2, 1, 3, 5; 4, 6; 1, 8, 7, 4. Bloco 2: {n(12530)}, {n(15230)}, {n(15320)}.',
         f'Bloco 1: quarenta e cinco mil e dezoito; setenta mil e trezentos. Bloco 2: &lt;, &lt;, &gt;, =. Bloco 3: {n(75310)}; {n(10357)}. Bloco 4: {n(40000)}; {n(59999)}.'],
        a, b, c)


# ---------- 2. adição e subtração com estimativa ----------

def adicao_estimativa():
    a = bloco(1, 'A subtração desfaz a adição. Complete.', grade([
        item('<p class="conta">10 + 5 = 15</p><p class="conta">15 − 5 = ?</p>', opcoes([10, 20], certa=10), exemplo=True),
        item('<p class="conta">12 + 4 = 16</p><p class="conta">16 − 4 = ?</p>', opcoes([12, 20])),
        item('<p class="conta">20 + 7 = 27</p><p class="conta">27 − 7 = ?</p>', opcoes([34, 20])),
    ], 3), 'Use tampinhas: junte e depois tire as mesmas.') + bloco(2, 'Dá perto de quanto? Circule.', grade([
        item('<p class="conta">29 + 31</p><p class="legenda">pense em 30 + 30</p>', opcoes([60, 90])),
        item('<p class="conta">48 + 19</p><p class="legenda">pense em 50 + 20</p>', opcoes([40, 70]))], 2))
    b = bloco(1, 'Calcule.', grade([conta(n(1345), '+', n(2431)), conta(n(5280), '−', n(1150)), conta(n(3607), '+', n(1293)), conta(n(6000), '−', n(2500))], 2)) + bloco(
        2, 'Confira a primeira conta com a operação inversa.', f'<p class="conta">{VAZIO} − {n(2431)} = {n(1345)}</p>') + bloco(
        3, 'Estime antes e depois resolva.', problema(f'A escola arrecadou <b>{n(1250)}</b> latas em março e <b>980</b> em abril. Quantas latas ao todo?', '22mm',
                                                       'Estimativa: <span class="linha-resp"></span> Resposta:'))
    c = bloco(1, 'Estime e depois calcule.', tabela(['Conta', 'Estimativa', 'Resultado'], [
        [f'{n(12480)} + {n(7350)}', '', ''], [f'{n(25000)} − {n(8765)}', '', ''], [f'{n(9999)} + 1', '', '']])) + bloco(
        2, 'Use a conta pronta para responder sem calcular de novo.', '<p class="conta">356 + 244 = 600</p>' + frases(['600 − 244 =', '600 − 356 ='])) + bloco(
        3, 'Leia e resolva.', grade([
            problema(f'Um estádio tem <b>{n(42500)}</b> lugares. No jogo, <b>{n(38760)}</b> estavam ocupados. Quantos lugares ficaram vazios?', '22mm'),
            problema(f'Uma cidade tinha <b>{n(18300)}</b> habitantes e recebeu <b>{n(2450)}</b> novos moradores. Quantos habitantes tem agora?', '22mm')], 2))
    return ficha(
        'adicao-e-subtracao-com-estimativa', 'Adição e subtração com estimativa', '4º ano',
        'Calcular com números grandes, estimar antes de calcular e usar a operação inversa para conferir.',
        ['EF04MA03', 'EF04MA04', 'EF04MA13'], '40 a 50 minutos', 'Material dourado, calculadora para conferir e uma reta numérica com as dezenas exatas.',
        ['Antes de cada conta, pergunte: vai dar perto de quanto? Arredonde para a dezena, centena ou milhar mais próximo.',
         'Mostre com tampinhas que tirar o que foi colocado volta ao começo: é a operação inversa.',
         'Na versão A, o estudante pode montar as duas contas com tampinhas.',
         'Na versão B, a operação inversa serve para conferir a conta armada.',
         'Na versão C, compare a estimativa com o resultado: ficou perto?'],
        ['Arredondar na reta numérica (qual dezena está mais perto?) é mais claro que a regra falada. Use a calculadora só para conferir.',
         'A operação inversa é uma regra de conferência que dá segurança. Mostre o mesmo exemplo várias vezes.',
         'A estimativa vira aposta: quem chega mais perto? A calculadora para conferir dá retorno imediato.'],
        ['Bloco 1: 12; 20. Bloco 2: 60; 70.', f'Bloco 1: {n(3776)}, {n(4130)}, {n(4900)}, {n(3500)}. Bloco 2: {n(3776)}. Bloco 3: estimativa perto de {n(2250)}; {n(2230)} latas.',
         f'Bloco 1: estimativas pessoais; {n(19830)}, {n(16235)}, {n(10000)}. Bloco 2: 356; 244. Bloco 3: {n(3740)} lugares; {n(20750)} habitantes.'],
        a, b, c)


# ---------- 3. multiplicação ----------

def multiplicacao():
    a = bloco(1, 'Conte as bolinhas em linhas e colunas. Circule.', grade([
        item(matriz(2, 4, 26), '<p class="conta">2 × 4</p>' + opcoes([8, 6], certa=8), exemplo=True),
        item(matriz(3, 5, 26), '<p class="conta">3 × 5</p>' + opcoes([15, 8])),
        item(matriz(4, 3, 26), '<p class="conta">4 × 3</p>' + opcoes([7, 12])),
    ], 3), 'Conte uma linha e depois pule de linha em linha.') + bloco(2, 'Girei a folha. A quantidade mudou?', grade([
        item(matriz(3, 4, 26), '<p class="conta">3 × 4</p>'), item(matriz(4, 3, 26), '<p class="conta">4 × 3</p>')], 2) + opcoes(['mudou', 'é igual']))
    b = bloco(1, 'Separe as dezenas e as unidades e multiplique.', grade([
        '<p class="conta">6 × 14 = 6 × 10 + 6 × 4 = 60 + 24 = 84</p>', f'<p class="conta">4 × 23 = 4 × 20 + 4 × 3 = {VAZIO}</p>',
        f'<p class="conta">5 × 16 = {VAZIO}</p>', f'<p class="conta">3 × 32 = {VAZIO}</p>'], 1), 'O primeiro é o exemplo.') + bloco(
        2, 'Cada pacote tem 6 figurinhas. Complete.', tabela(['Pacotes', '1', '2', '3', '5', '10'], [['Figurinhas', '6', '', '', '', '']]))
    c = bloco(1, 'Calcule.', grade([conta(24, '×', 3), conta(135, '×', 4), conta('2 × 7', '×', 5), conta('25 × 4', '×', 3)], 2),
              'Na terceira e na quarta, escolha a ordem que deixa a conta mais fácil.') + bloco(2, 'Leia e resolva.', grade([
                  problema('Um auditório tem <b>18</b> fileiras com <b>12</b> cadeiras em cada uma. Quantas cadeiras ao todo?', '22mm'),
                  problema('Uma receita usa <b>3</b> ovos para <b>4</b> pessoas. Quantos ovos são necessários para <b>12</b> pessoas?', '22mm')], 2)) + bloco(
        3, 'Invente um problema que se resolve com 5 × 8.', linhas(2))
    return ficha(
        'multiplicacao-estrategias-e-propriedades', 'Multiplicação: estratégias e propriedades', '4º ano',
        'Multiplicar com disposição retangular, decompor para calcular, usar a ordem dos fatores a favor e resolver problemas de proporção.',
        ['EF04MA05', 'EF04MA06'], '40 a 50 minutos', 'Malha quadriculada, tampinhas para montar linhas e colunas e a tabuada em cartões para consulta.',
        ['Monte uma disposição retangular com tampinhas e gire a mesa: 3 × 4 e 4 × 3 dão o mesmo.',
         'Na malha, mostre que 6 × 14 pode ser cortado em 6 × 10 e 6 × 4.',
         'Na versão A, deixe o estudante contar linha por linha com o dedo.',
         'Na versão B, a tabela de pacotes mostra a proporção: o dobro de pacotes, o dobro de figurinhas.',
         'Na versão C, peça que o estudante explique por que 25 × 4 primeiro deixa a conta fácil.'],
        ['A disposição retangular com objetos é o apoio principal. Deixe a tabuada à vista: decorar não é condição para resolver problemas.',
         'As propriedades são regras fixas, o que costuma ajudar. Mostre cada uma com o mesmo exemplo concreto.',
         'Use a malha para pintar retângulos rápidos e contar. Problemas curtos, um de cada vez.'],
        ['Bloco 1: 15; 12. Bloco 2: é igual.', 'Bloco 1: 92; 80; 96. Bloco 2: 12, 18, 30, 60.',
         'Bloco 1: 72; 540; 70; 300. Bloco 2: 216 cadeiras; 9 ovos. Bloco 3: resposta pessoal (o resultado é 40).'],
        a, b, c)


# ---------- 4. divisão ----------

def divisao():
    a = bloco(1, 'Reparta as barras e os cubinhos em grupos iguais. Circule quanto fica em cada grupo.', grade([
        item(dourado3(0, 2, 4, 7), '<p class="legenda">24 em 2 grupos</p>' + opcoes([12, 22], certa=12), exemplo=True),
        item(dourado3(0, 4, 6, 7), '<p class="legenda">46 em 2 grupos</p>' + opcoes([32, 23])),
        item(dourado3(0, 6, 3, 7), '<p class="legenda">63 em 3 grupos</p>' + opcoes([21, 12])),
    ], 3), 'Reparta primeiro as barras, depois os cubinhos.') + bloco(2, 'Divida por 2. Sobra alguma?', grade([
        item(grupo('bola', 8, tam=36, por_linha=4), opcoes(['sim', 'não'])), item(grupo('estrela', 9, tam=36, por_linha=5), opcoes(['sim', 'não']))], 2))
    b = bloco(1, 'Calcule.', grade([conta(84, '÷', 4, 21), conta(96, '÷', 3), conta(75, '÷', 5), conta(125, '÷', 5)], 2), 'O primeiro é o exemplo.') + bloco(
        2, 'Divida por 3 e complete.', tabela(['Número', 'Resultado', 'Resto'], [['9', '3', '0'], ['10', '', ''], ['11', '', ''], ['12', '', ''], ['13', '', '']]) +
        frases(['O que você percebeu nos restos?']))
    c = bloco(1, 'Calcule.', grade([f'<p class="conta">144 ÷ 12 = {VAZIO}</p>', f'<p class="conta">250 ÷ 25 = {VAZIO}</p>',
                                    f'<p class="conta">360 ÷ 15 = {VAZIO}</p>', f'<p class="conta">100 ÷ 11 = {VAZIO} resto {VAZIO}</p>'], 2)) + bloco(
        2, 'Escreva cinco números que, divididos por 4, deixam resto 1.', seq_numeros([None] * 5)) + bloco(
        3, 'Leia e resolva.', problema('<b>348</b> estudantes vão ao passeio em ônibus de <b>40</b> lugares. Quantos ônibus são necessários?', '24mm'))
    return ficha(
        'divisao-com-resto-e-divisor-de-dois-algarismos', 'Divisão com resto e divisor de dois algarismos', '4º ano',
        'Repartir com material dourado, dividir por números de um e dois algarismos e investigar os restos.',
        ['EF04MA07', 'EF04MA12'], '40 a 50 minutos', 'Material dourado, pratinhos de papel e a tabuada em cartões.',
        ['Reparta 46 com material dourado em dois pratos: primeiro as barras, depois os cubinhos.',
         'Quando uma barra não dá para repartir, troque por 10 cubinhos e continue.',
         'Na versão B, a tabela dos restos mostra um padrão: 0, 1, 2, 0, 1, 2. Peça que o estudante continue sem calcular.',
         'Na versão C, use a multiplicação para dividir por 12 ou 15: quantas vezes 12 cabe em 144?',
         'No problema dos ônibus, discuta o que fazer com os 28 estudantes que sobram.'],
        ['Material dourado e pratos antes da conta. Use sempre a mesma frase: "reparte, troca e continua".',
         'O padrão dos restos é uma regularidade que costuma interessar. Explique que sobrar não é erro.',
         'A tabela de restos pode ser feita em voz alta, em ritmo. Divida a folha e mostre um bloco por vez.'],
        ['Bloco 1: 23; 21. Bloco 2: não; sim.', 'Bloco 1: 32; 15; 25. Bloco 2: 10 = 3 resto 1; 11 = 3 resto 2; 12 = 4 resto 0; 13 = 4 resto 1. Os restos se repetem: 0, 1, 2.',
         'Bloco 1: 12; 10; 24; 9 resto 1. Bloco 2: por exemplo 1, 5, 9, 13, 17. Bloco 3: 9 ônibus (8 cheios e um com 28 estudantes).'],
        a, b, c)


# ---------- 5. combinações ----------

def combinacoes():
    fig = lambda t: svg(44, 44, figura(t, 0, 0, 44), 'fig', t)
    a = bloco(1, 'Cada lanche tem uma comida e uma bebida. Desenhe os lanches que faltam.', tabela(['', fig('suco'), fig('leite')], [
        [fig('pao'), fig('pao') + fig('suco'), ''], [fig('banana'), '', '']]) + opcoes([4, 2]), 'O primeiro lanche já está desenhado. Depois, circule quantos lanches são.') + bloco(
        2, 'E com três comidas e duas bebidas? Quantos lanches? Circule.', tabela(['', fig('suco'), fig('leite')], [[fig('maca'), '', ''], [fig('banana'), '', ''], [fig('pao'), '', '']]) + opcoes([5, 6]))
    b = bloco(1, 'Sorvete de morango, chocolate ou creme, na casquinha ou no copinho. Complete o quadro.', tabela(['', 'casquinha', 'copinho'], [
        ['morango', 'morango na casquinha', ''], ['chocolate', '', ''], ['creme', '', '']]) + frases(['Quantos sorvetes diferentes?'])) + bloco(
        2, 'Tenho 4 camisetas e 2 bermudas. Quantas roupas diferentes posso montar?', caixa_desenho('26mm') + '<p class="resp-linha">Resposta: <span class="linha-resp"></span></p>',
        'Faça um quadro como o de cima.')
    c = bloco(1, 'Com os algarismos 1, 2 e 3, sem repetir, escreva todos os números de dois algarismos.', seq_numeros([12] + [None] * 5)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Uma lanchonete tem <b>4</b> tipos de pão, <b>3</b> recheios e <b>2</b> sucos. Quantos lanches diferentes com um pão, um recheio e um suco?', '24mm'),
            problema('<b>4</b> amigos se encontram e cada um aperta a mão de todos os outros uma vez. Quantos apertos de mão?', '24mm')], 2), 'Desenhe ou faça uma lista para não esquecer nenhum.')
    return ficha(
        'combinacoes-quantas-possibilidades', 'Combinações: quantas possibilidades?', '4º ano',
        'Contar todas as combinações possíveis com quadros, desenhos e listas organizadas.',
        ['EF04MA08'], '30 a 45 minutos', 'Roupinhas de papel recortadas (camisetas e bermudas de cores diferentes), figuras de lanche e uma cartolina para o quadro.',
        ['Monte combinações com roupinhas de papel em cima da mesa e registre cada uma.',
         'Mostre o quadro de dupla entrada: cada linha com cada coluna forma uma combinação.',
         'Na versão A, o estudante desenha ou cola as figuras nas casas vazias do quadro.',
         'Na versão B, pergunte se dá para saber o total sem preencher tudo: 3 linhas com 2 colunas.',
         'Na versão C, a lista organizada (começando sempre pelo 1, depois pelo 2) evita esquecer combinações.'],
        ['Manusear as roupinhas e montar de verdade antes do quadro. Poucas opções no começo (2 × 2).',
         'A lista organizada é uma regra que dá segurança. Use sempre a mesma ordem para listar.',
         'Montar combinações de roupa ou de lanche é rápido e concreto. Desafie: quem acha todas primeiro?'],
        ['Bloco 1: pão e leite, banana e suco, banana e leite; 4 lanches. Bloco 2: 6.', 'Bloco 1: 6 sorvetes. Bloco 2: 8 roupas.',
         'Bloco 1: 12, 13, 21, 23, 31, 32. Bloco 2: 24 lanches; 6 apertos de mão.'],
        a, b, c)


# ---------- 6. frações unitárias ----------

def fracoes():
    a = bloco(1, 'Que parte está pintada? Circule.', grade([
        item(pizza_fracao(2, 1, 100), '<p class="legenda">metade</p>' + opcoes(['1/2', '1/4'], certa='1/2'), exemplo=True),
        item(pizza_fracao(4, 1, 100), opcoes(['1/2', '1/4'])),
        item(barra_fracao(3, 1, 200, 40), opcoes(['1/3', '1/2'])),
    ], 3), 'Conte em quantas partes iguais o inteiro foi dividido.') + bloco(2, 'Pinte uma parte. Escreva a fração.', grade([
        item(barra_fracao(2, 0, 200, 40), f'<p class="du">{VAZIO}</p>'), item(pizza_fracao(5, 0, 100), f'<p class="du">{VAZIO}</p>')], 2))
    b = bloco(1, 'Escreva a fração pintada.', grade([
        item(barra_fracao(5, 1, 200, 36), f'<p class="du">{VAZIO}</p>'), item(pizza_fracao(3, 1, 96), f'<p class="du">{VAZIO}</p>'),
        item(barra_fracao(10, 1, 240, 36), f'<p class="du">{VAZIO}</p>'), item(pizza_fracao(4, 1, 96), f'<p class="du">{VAZIO}</p>')], 2)) + bloco(
        2, 'Qual pedaço é maior? Circule.', item(pizza_fracao(2, 1, 90) + pizza_fracao(4, 1, 90), opcoes(['1/2', '1/4'])), 'Quanto mais partes, menor fica cada pedaço.') + bloco(
        3, 'Escreva 1/4 no ponto marcado da reta.', reta_fracao(4, {1: '?'}))
    c = bloco(1, 'Escreva as frações nos pontos marcados.', reta_fracao(10, {1: '?', 5: '?'}) + reta_fracao(4, {1: '?', 2: '?'})) + bloco(
        2, 'Complete.', grade([f'<p class="conta">1/2 de 20 = {VAZIO}</p>', f'<p class="conta">1/4 de 20 = {VAZIO}</p>', f'<p class="conta">1/5 de 20 = {VAZIO}</p>',
                               f'<p class="conta">1/10 de 20 = {VAZIO}</p>', f'<p class="conta">1/100 de 100 = {VAZIO}</p>'], 2)) + bloco(
        3, 'Ordene do maior para o menor: 1/3, 1/10, 1/2, 1/5.', seq_numeros([None] * 4)) + bloco(
        4, 'Leia e resolva.', problema('Uma barra de chocolate tem <b>10</b> pedaços iguais. Comi <b>1/10</b>. Quantos pedaços comi? Quantos sobraram?', '18mm'))
    return ficha(
        'fracoes-metade-terco-quarto-quinto-decimo', 'Frações: metade, terço, quarto, quinto e décimo', '4º ano',
        'Reconhecer as frações unitárias como partes iguais de um inteiro, comparar e localizar na reta numérica.',
        ['EF04MA09'], '40 a 50 minutos', 'Círculos e tiras de papel para dobrar e recortar, massinha para dividir e uma reta de 0 a 1 em papel.',
        ['Dobre uma tira de papel ao meio, depois em quatro. Pinte uma parte e diga o nome: um meio, um quarto.',
         'Mostre que as partes precisam ser iguais: uma tira cortada em pedaços diferentes não mostra quartos.',
         'Na versão A, deixe o estudante dobrar a tira de papel antes de responder.',
         'Na versão B, compare pedaços de verdade: meia pizza de papel e um quarto de pizza.',
         'Na versão C, ligue a fração de uma quantidade à divisão: 1/4 de 20 é 20 ÷ 4.'],
        ['Dobrar, cortar e repartir com as mãos. Use primeiro só metade e quarto, depois os outros nomes.',
         'Explique que 1/10 é menor que 1/2, apesar do 10 ser maior que o 2. Use o material para mostrar, e não só a regra.',
         'Dobrar tiras é rápido e dá movimento. Uma fração nova por dia, com um desafio curto.'],
        ['Bloco 1: 1/4; 1/3. Bloco 2: 1/2; 1/5.', 'Bloco 1: 1/5, 1/3, 1/10, 1/4. Bloco 2: 1/2. Bloco 3: 1/4 no primeiro traço depois do 0.',
         'Bloco 1: 1/10 e 5/10 (ou 1/2); 1/4 e 2/4 (ou 1/2). Bloco 2: 10, 5, 4, 2, 1. Bloco 3: 1/2, 1/3, 1/5, 1/10. Bloco 4: 1 pedaço; sobraram 9.'],
        a, b, c)


# ---------- 7. décimos e centésimos com dinheiro ----------

def decimais_dinheiro():
    a = bloco(1, 'Quanto dinheiro tem? Circule.', grade([
        item(dinheiro([1, 0.5]), opcoes(['R$ 1,50', 'R$ 15'], certa='R$ 1,50'), exemplo=True),
        item(dinheiro([0.5, 0.25, 0.25]), opcoes(['R$ 1,00', 'R$ 3,00'])),
        item(dinheiro([0.1, 0.1, 0.1]), opcoes(['R$ 3', 'R$ 0,30'])),
    ], 1), 'Os centavos ficam depois da vírgula.') + bloco(2, 'Quantas moedas de 10 centavos formam R$ 1? Circule.', item(dinheiro([0.1] * 4), opcoes([10, 100])))
    b = bloco(1, 'Separe como no exemplo.', tabela(['Valor', 'Reais', 'Moedas de 10 centavos', 'Moedas de 1 centavo'], [
        ['R$ 2,35', '2', '3', '5'], ['R$ 1,48', '', '', ''], ['R$ 3,05', '', '', ''], ['R$ 0,72', '', '', '']])) + bloco(
        2, 'Complete.', grade([f'<p class="conta">R$ 0,10 = {VAZIO} centavos</p>', f'<p class="conta">R$ 0,01 = {VAZIO} centavo</p>',
                               f'<p class="conta">R$ 0,50 = {VAZIO} centavos</p>', f'<p class="conta">R$ 1,00 = {VAZIO} centavos</p>'], 2),
        'Um real dividido em 10 partes: cada parte é um décimo (0,1). Em 100 partes: cada parte é um centésimo (0,01).')
    c = bloco(1, 'Escreva com vírgula.', frases(['3 décimos =', '7 centésimos =', '2 inteiros e 45 centésimos ='])) + bloco(
        2, 'Compare. Escreva &gt;, &lt; ou =.', grade([f'<p class="conta">0,5 {VAZIO} 0,45</p>', f'<p class="conta">1,20 {VAZIO} 1,2</p>',
                                                       f'<p class="conta">0,09 {VAZIO} 0,1</p>', f'<p class="conta">2,7 {VAZIO} 2,07</p>'], 2), 'Pense em dinheiro: R$ 0,50 ou R$ 0,45?') + bloco(
        3, 'Leia e resolva.', problema('Comprei um caderno de <b>R$ 7,50</b> e uma caneta de <b>R$ 2,35</b>. Quanto gastei? Paguei com <b>R$ 20</b>. Qual foi o troco?', '24mm'))
    return ficha(
        'decimos-e-centesimos-com-dinheiro', 'Décimos e centésimos com dinheiro', '4º ano',
        'Usar moedas e cédulas para entender décimos e centésimos, escrever e comparar números com vírgula.',
        ['EF04MA10'], '40 a 50 minutos', 'Moedas de brincadeira (1, 10, 25 e 50 centavos e 1 real), quadro de valor com a coluna da vírgula.',
        ['Troque 1 real por 10 moedas de 10 centavos e por 100 moedas de 1 centavo (ou mostre o desenho).',
         'No quadro de valor, a vírgula separa os reais dos centavos. Cada coluna continua valendo dez vezes a da direita.',
         'Na versão A, conte o dinheiro em voz alta: um real e cinquenta centavos.',
         'Na versão B, monte cada valor com moedas antes de completar a tabela.',
         'Na versão C, use o dinheiro como apoio para comparar 0,5 e 0,45.'],
        ['O dinheiro dá sentido aos décimos e centésimos. Use poucos tipos de moeda no começo.',
         'Mostre que 1,20 e 1,2 são o mesmo valor com moedas reais. A regra da vírgula precisa de exemplos concretos.',
         'Uma lojinha com preços com centavos dá movimento e um objetivo claro. Tempo combinado por compra.'],
        ['Bloco 1: R$ 1,00; R$ 0,30. Bloco 2: 10.', 'Bloco 1: 1, 4, 8; 3, 0, 5; 0, 7, 2. Bloco 2: 10, 1, 50, 100.',
         'Bloco 1: 0,3; 0,07; 2,45. Bloco 2: &gt;, =, &lt;, &gt;. Bloco 3: gastei R$ 9,85; troco R$ 10,15.'],
        a, b, c)


# ---------- 8. múltiplos e igualdades ----------

def multiplos_igualdades():
    a = bloco(1, 'Continue pulando.', '<p class="regra">de 2 em 2</p>' + seq_numeros([0, 2, 4, None, None]) + '<p class="regra">de 5 em 5</p>' + seq_numeros([0, 5, 10, None, None])) + bloco(
        2, 'Coloquei 2 dos dois lados da balança. Continua igual? Circule.', grade([
            item(balanca_eq('5 + 3', '8'), '<p class="legenda">antes</p>'), item(balanca_eq('5 + 3 + 2', '8 + 2'), '<p class="legenda">depois</p>' + opcoes(['sim', 'não']))], 2)) + bloco(
        3, 'Qual número falta? Circule.', item(f'<p class="conta">4 + {VAZIO} = 9</p>', opcoes([5, 13])))
    b = bloco(1, 'Escreva os múltiplos.', '<p class="regra">de 3 até 30</p>' + seq_numeros([3, 6] + [None] * 3) + seq_numeros([None] * 5) + '<p class="regra">de 4 até 40</p>' + seq_numeros([4, 8] + [None] * 3) + seq_numeros([None] * 5)) + bloco(
        2, 'Circule os múltiplos de 5.', opcoes([12, 15, 20, 23, 35, 41])) + bloco(3, 'Complete para continuar igual.', grade([
            f'<p class="conta">12 + 5 + 3 = 17 + {VAZIO}</p>', f'<p class="conta">20 − 4 − 2 = 16 − {VAZIO}</p>'], 2)) + bloco(
        4, 'Qual número falta?', grade([f'<p class="conta">{VAZIO} + 15 = 40</p>', f'<p class="conta">38 − {VAZIO} = 30</p>', f'<p class="conta">{VAZIO} − 12 = 20</p>'], 3))
    c = bloco(1, 'Escreva os números até 50 que são múltiplos de 3 e também de 4.', seq_numeros([None] * 4)) + bloco(
        2, 'Qual número falta?', grade([f'<p class="conta">125 + {VAZIO} = 300</p>', f'<p class="conta">500 − {VAZIO} = 260</p>',
                                        f'<p class="conta">{VAZIO} + 48 = 100 + 20</p>', f'<p class="conta">7 × {VAZIO} = 63</p>'], 2)) + bloco(
        3, 'Leia e resolva.', grade([
            problema('Numa balança em equilíbrio, um lado tem uma caixa e <b>15</b> kg. O outro lado tem <b>40</b> kg. Quanto pesa a caixa?', '20mm'),
            problema('A sequência 7, 14, 21, 28 é de múltiplos de quanto? Qual é o 10º número dela?', '20mm')], 2))
    return ficha(
        'multiplos-e-igualdades', 'Múltiplos e igualdades', '4º ano',
        'Encontrar múltiplos em sequências, manter a igualdade fazendo o mesmo dos dois lados e descobrir o número que falta.',
        ['EF04MA11', 'EF04MA14', 'EF04MA15'], '30 a 45 minutos', 'Quadro de 100 para pintar os múltiplos, uma balança de dois pratos e tampinhas.',
        ['Pinte no quadro de 100 os múltiplos de 2, de 5 e de 10. Que desenhos aparecem?',
         'Na balança, coloque a mesma quantidade nos dois pratos e mostre que ela continua em equilíbrio.',
         'Na versão A, monte os dois lados da balança com tampinhas.',
         'Na versão B, o número que falta pode ser encontrado contando para a frente a partir do número dado.',
         'Na versão C, use a operação inversa para achar o número que falta.'],
        ['O quadro de 100 pintado deixa o padrão visível. A balança mostra o sinal = como equilíbrio.',
         'Padrões de múltiplos no quadro de 100 costumam agradar. Combine a cor de cada tabuada e mantenha.',
         'Pular de múltiplo em múltiplo na reta do chão dá movimento. Desafios curtos de "número escondido".'],
        ['Bloco 1: 6 e 8; 15 e 20. Bloco 2: sim. Bloco 3: 5.',
         'Bloco 1: 9, 12, 15, 18, 21, 24, 27, 30; 12, 16, 20, 24, 28, 32, 36, 40. Bloco 2: 15, 20, 35. Bloco 3: 3; 2. Bloco 4: 25; 8; 32.',
         'Bloco 1: 12, 24, 36, 48. Bloco 2: 175; 240; 72; 9. Bloco 3: 25 kg; múltiplos de 7, o 10º é 70.'],
        a, b, c)


# ---------- 9. localização em malhas, plantas e mapas ----------

def malha_plantas():
    itens_a = {(1, 1): 'estrela', (2, 2): 'maca', (0, 3): 'peixe'}
    a = bloco(1, 'Onde está cada figura? Circule.', item(malha_coord(4, 4, itens_a, 52, 'malha com estrela em B2, maçã em C3 e peixe em A4')) + grade([
        item(svg(40, 40, figura('estrela', 0, 0, 40), 'fig', 'estrela'), opcoes(['B2', 'C3'], certa='B2'), exemplo=True),
        item(svg(40, 40, figura('maca', 0, 0, 40), 'fig', 'maçã'), opcoes(['A1', 'C3'])),
        item(svg(40, 40, figura('peixe', 0, 0, 40), 'fig', 'peixe'), opcoes(['A4', 'D4']))], 3), 'Primeiro a letra da coluna, depois o número da linha.')
    b = bloco(1, 'Desenhe e escreva.', item(malha_coord(5, 4, {(1, 0): 'estrela', (4, 2): 'peixe'}, 46, 'malha com estrela em B1 e peixe em E3')) + frases([
        'Desenhe uma bola em A3 e uma flor em D1.', 'Onde está a estrela?', 'Onde está o peixe?'])) + bloco(
        2, 'Escreva o caminho da estrela até o peixe.', '<p class="regra">Caminho: <span class="linha-resp"></span></p>', 'Use: para a direita, para a esquerda, para cima, para baixo, e quantos quadradinhos.')
    planta = {(0, 0): 'B', (4, 0): 'Q', (2, 2): 'P', (5, 3): 'R', (0, 4): 'S'}
    c = bloco(1, 'Esta é a planta de uma escola, vista de cima.', item(malha_coord(6, 5, planta, 46, 'planta da escola com biblioteca, quadra, pátio, refeitório e secretaria')) +
              '<p class="legenda">B = biblioteca · Q = quadra · P = pátio · R = refeitório · S = secretaria</p>' + frases([
                  'Em que casa fica o refeitório?', 'O que fica em E1?', 'Descreva um caminho da secretaria até a quadra:'])) + bloco(
        2, 'Desenhe a planta do seu quarto ou da sua sala de aula numa malha e marque três objetos com letras e números.', caixa_desenho('40mm'))
    return ficha(
        'localizacao-em-malhas-plantas-e-mapas', 'Localização em malhas, plantas e mapas', '4º ano',
        'Localizar e descrever posições com letras e números, descrever deslocamentos e ler a planta de uma escola.',
        ['EF04MA16'], '40 a 50 minutos', 'Fita crepe para fazer uma malha com letras e números no chão, objetos pequenos e um jogo de batalha naval de papel.',
        ['Faça uma malha no chão com letras e números. O estudante fica em uma casa e diz onde está: "estou em C2".',
         'Brinque de batalha naval: um esconde objetos, o outro procura dizendo letra e número.',
         'Na versão A, passe o dedo pela coluna de cima para baixo e pela linha da esquerda para a direita até o encontro.',
         'Na versão B, conte os quadradinhos de cada trecho do caminho.',
         'Na versão C, compare a planta da folha com a planta da própria escola.'],
        ['Andar na malha do chão antes da folha ajuda muito. Use uma régua para seguir a linha e a coluna.',
         'A regra "letra primeiro, número depois" é fixa e previsível. Mostre com o mesmo exemplo sempre que errar.',
         'A batalha naval tem regras claras e rodadas curtas. Marque o tempo de cada rodada.'],
        ['Bloco 1: C3; A4.', 'Bloco 1: desenho; B1; E3. Bloco 2: por exemplo, 3 para a direita e 2 para baixo.',
         'Bloco 1: F4; a quadra; por exemplo, 4 para cima e 4 para a direita. Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- 10. ângulos retos e simetria ----------

def angulos_simetria():
    meia_a = [(2, 0), (1, 1), (2, 1), (0, 2), (1, 2), (2, 2), (2, 3)]
    a = bloco(1, 'É um canto reto, como o canto de uma folha? Circule.', grade([
        item(angulo(90, 100, mostrar=False), opcoes(['reto', 'não reto'], certa='reto'), exemplo=True),
        item(angulo(40, 100, mostrar=False), opcoes(['reto', 'não reto'])),
        item(angulo(60, 100, mostrar=False), opcoes(['reto', 'não reto'])),
        item(angulo(90, 100, mostrar=False), opcoes(['reto', 'não reto'])),
    ], 2), 'Encoste o canto de uma folha de papel no desenho para conferir.') + bloco(
        2, 'Complete a figura do outro lado da linha, como num espelho.', malha_eixo(6, 4, meia_a, 3, 40), 'Dobre a folha na linha tracejada para conferir.')
    b = bloco(1, 'Quantos ângulos retos cada figura tem?', grade([
        item(regular(4, 36, rot=-45), f'<p class="du">{VAZIO}</p>'), item(poligono_svg([(4, 4), (110, 4), (110, 60), (4, 60)], rotulo='retângulo'), f'<p class="du">{VAZIO}</p>'),
        item(poligono_svg([(4, 4), (4, 70), (90, 70)], rotulo='triângulo com um canto reto'), f'<p class="du">{VAZIO}</p>'),
        item(poligono_svg([(p[0] * .8, p[1] * .8) for p in TRAPEZIO], rotulo='trapézio'), f'<p class="du">{VAZIO}</p>')], 4), 'Use o esquadro ou o canto de uma folha.') + bloco(
        2, 'A linha tracejada é um eixo de simetria? Dobre e confira. Circule.', grade([
            item(com_eixo('quadrado', True), opcoes(['sim', 'não'])), item(com_eixo('retangulo', False), opcoes(['sim', 'não'])),
            item(com_eixo('triangulo', True), opcoes(['sim', 'não']))], 3))
    meia_c = [(3, 0), (2, 1), (3, 1), (1, 2), (2, 2), (3, 2), (0, 3), (3, 3), (2, 4), (3, 4)]
    c = bloco(1, 'Complete a figura simétrica.', malha_eixo(8, 5, meia_c, 4, 32)) + bloco(2, 'Quantos eixos de simetria?', tabela(['Figura', 'Eixos'], [
        ['quadrado', ''], ['retângulo', ''], ['triângulo com os 3 lados iguais', '']]), 'Recorte as figuras e dobre de vários jeitos.') + bloco(
        3, 'Quais letras têm eixo de simetria? Circule.', opcoes(['A', 'B', 'F', 'M', 'R', 'T'])) + bloco(
        4, 'Procure três ângulos retos na sala de aula e escreva onde estão.', linhas(2))
    return ficha(
        'angulos-retos-e-simetria', 'Ângulos retos e simetria', '4º ano',
        'Reconhecer ângulos retos com dobraduras e esquadros, encontrar eixos de simetria e completar figuras simétricas.',
        ['EF04MA18', 'EF04MA19'], '40 a 50 minutos', 'Folhas para dobrar, esquadro, espelho pequeno, tesoura e figuras de papel.',
        ['Dobre uma folha duas vezes para fazer um "medidor de canto reto". Procure ângulos retos na sala.',
         'Faça uma mancha de tinta numa folha e dobre ao meio: a figura dos dois lados é simétrica.',
         'Na versão A, o estudante encosta o canto da folha em cada desenho.',
         'Na versão B, recorte o retângulo e dobre na diagonal: as partes não coincidem.',
         'Na versão C, use um espelho em pé na linha tracejada para conferir a figura completa.'],
        ['Dobrar e recortar com as mãos. O medidor de canto reto de papel fica na mesa durante a atividade.',
         'A simetria é um padrão visual que costuma agradar. Avise se a tinta ou a cola tiverem textura incômoda e ofereça outra opção.',
         'A caça aos ângulos retos pela sala dá movimento. Combine quantos o estudante vai encontrar.'],
        ['Bloco 1: não reto; não reto; reto. Bloco 2: a figura espelhada do outro lado da linha.',
         'Bloco 1: 4; 4; 1; 0. Bloco 2: sim; não; sim.',
         'Bloco 1: a figura espelhada. Bloco 2: 4; 2; 3. Bloco 3: A, B, M, T. Bloco 4: resposta pessoal.'],
        a, b, c)


# ---------- 11. perímetro, massa e capacidade ----------

def perimetro_medidas():
    a = bloco(1, 'Conte os lados de quadradinho em volta da figura. Circule.', grade([
        item(malha(5, 4, 34, pintadas=[(1, 1), (2, 1), (3, 1), (1, 2), (2, 2), (3, 2)]), opcoes([10, 6], certa=10), exemplo=True),
        item(malha(5, 4, 34, pintadas=[(1, 1), (2, 1), (1, 2), (2, 2)]), opcoes([4, 8])),
        item(malha(5, 4, 34, pintadas=[(0, 1), (1, 1), (2, 1), (3, 1)]), opcoes([10, 4])),
    ], 3), 'Passe o lápis em volta da figura e conte cada risquinho.') + bloco(2, 'Pesa mais de um quilo ou menos? Circule.', grade([
        item(objeto_medida('melancia', 70), opcoes(['mais', 'menos'])), item(objeto_medida('clipe', 70), opcoes(['mais', 'menos']))], 2))
    b = bloco(1, 'Calcule o perímetro: some todos os lados.', grade([
        item(poligono_svg([(4, 4), (154, 4), (154, 94), (4, 94)], rotulo='retângulo de 5 cm por 3 cm'), '<p class="legenda">5 cm e 3 cm</p>' + f'<p class="du">{VAZIO} cm</p>'),
        item(regular(4, 52, rot=-45), '<p class="legenda">lados de 4 cm</p>' + f'<p class="du">{VAZIO} cm</p>'),
        item(poligono_svg([(4, 4), (4, 94), (124, 94)], rotulo='triângulo de lados 3, 4 e 5 cm'), '<p class="legenda">3 cm, 4 cm e 5 cm</p>' + f'<p class="du">{VAZIO} cm</p>')], 3)) + bloco(
        2, 'Complete.', grade([f'<p class="conta">1 kg = {VAZIO} g</p>', f'<p class="conta">2 L = {VAZIO} mL</p>', f'<p class="conta">1 m = {VAZIO} cm</p>',
                               f'<p class="conta">1 km = {VAZIO} m</p>'], 2)) + bloco(
        3, 'Meça o contorno da sua mesa com uma fita métrica.', '<p class="du">Estimativa: ' + resposta('', '24mm') + ' cm &nbsp; Medida: ' + resposta('', '24mm') + ' cm</p>')
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Uma horta retangular mede <b>8</b> m por <b>5</b> m. Quantos metros de cerca são necessários para contornar a horta?', '22mm'),
        problema('Um quadrado tem perímetro de <b>36</b> cm. Quanto mede cada lado?', '22mm'),
        problema('Comprei <b>3</b> garrafas de <b>1,5</b> L de suco. Quantos litros comprei?', '22mm'),
        problema('Quantos pacotes de <b>500</b> g formam <b>2</b> kg?', '22mm')], 2)) + bloco(
        2, 'Desenhe na malha dois retângulos diferentes com perímetro de 12 lados de quadradinho.', malha(14, 5, 30, rotulo='malha vazia'))
    return ficha(
        'perimetro-massa-e-capacidade', 'Perímetro, massa e capacidade', '4º ano',
        'Medir e calcular o contorno de figuras, estimar massas e capacidades e converter unidades em problemas do dia a dia.',
        ['EF04MA20'], '40 a 50 minutos', 'Fita métrica, barbante, régua, balança de cozinha, pacotes de 500 g e 1 kg e garrafas de 1 L e 1,5 L.',
        ['Contorne a mesa com um barbante, estique e meça: isso é o perímetro.',
         'Na malha, passe o lápis em volta da figura e conte os lados dos quadradinhos.',
         'Na versão A, segure os objetos de verdade para decidir se pesam mais ou menos de um quilo.',
         'Na versão B, mostre que no quadrado basta multiplicar um lado por 4.',
         'Na versão C, faça o problema da horta com barbante na malha do chão.'],
        ['O barbante em volta do objeto mostra o que é perímetro antes da conta. Segurar pacotes de 1 kg dá referência para a massa.',
         'Diferencie bem perímetro (contorno) e área (o que cobre) com cores diferentes, sempre as mesmas.',
         'Medir o contorno de objetos pela sala dá movimento. Dê uma lista curta e um tempo combinado.'],
        ['Bloco 1: 8; 10. Bloco 2: mais (melancia); menos (clipe).', 'Bloco 1: 16 cm; 16 cm; 12 cm. Bloco 2: 1000, 2000, 100, 1000. Bloco 3: resposta pessoal.',
         'Bloco 1: 26 m; 9 cm; 4,5 L; 4 pacotes. Bloco 2: por exemplo, 1 por 5 e 2 por 4 (também vale 3 por 3, um quadrado).'],
        a, b, c)


# ---------- 12. temperatura ----------

def temperatura():
    dias = ['seg', 'ter', 'qua', 'qui', 'sex']
    a = bloco(1, 'Que temperatura o termômetro marca? Circule.', grade([
        item(termometro(20, 40), opcoes(['20°', '40°'], certa='20°'), exemplo=True),
        item(termometro(30, 40), opcoes(['10°', '30°'])),
        item(termometro(10, 40), opcoes(['10°', '30°'])),
    ], 3), 'Siga o topo da coluna até o número do lado.') + bloco(2, 'Que roupa combina com o dia? Circule.', grade([
        item('<p class="conta">35 °C</p>', opcoes(['bermuda', 'casaco'])), item('<p class="conta">8 °C</p>', opcoes(['bermuda', 'casaco']))], 2))
    b = bloco(1, 'Temperaturas de uma semana, em graus Celsius.', tabela(['Dia', 'Máxima', 'Mínima'], [
        ['segunda', '25 °C', '15 °C'], ['terça', '30 °C', '18 °C'], ['quarta', '25 °C', '14 °C'], ['quinta', '20 °C', '12 °C'], ['sexta', '25 °C', '16 °C']]) + frases([
            'Qual foi o dia mais quente?', 'Qual foi a menor temperatura da semana?', 'Na segunda, quantos graus a máxima passou da mínima?'])) + bloco(
        2, 'Pinte o gráfico das máximas. Cada quadradinho vale 5 graus.', grafico_escala(dias, None, 35, 5))
    maximas = [20, 25, 15, 30, 25]
    c = bloco(1, 'Leia o gráfico das máximas de uma semana.', grafico_escala(dias, maximas, 35, 5, rotulo='gráfico de colunas das máximas: seg 20, ter 25, qua 15, qui 30, sex 25') + frases([
        'Qual dia foi o mais quente?', 'Quantos graus a quinta foi mais quente que a quarta?'])) + bloco(
        2, 'Registre a máxima e a mínima de cinco dias (pela previsão do tempo ou por um termômetro).', tabela(['Dia', 'Máxima', 'Mínima'], [['', '', '']] * 5)) + bloco(
        3, 'Pesquisa: pergunte a 10 colegas quantos irmãos eles têm. Organize os dados.', tabela(['Irmãos', '0', '1', '2', '3 ou mais'], [['Colegas', '', '', '', '']]) +
        frases(['Qual resposta apareceu mais?']))
    return ficha(
        'temperatura-graus-celsius-e-graficos', 'Temperatura: graus Celsius e gráficos', '4º ano',
        'Ler termômetros, registrar máximas e mínimas, ler e construir gráficos de colunas e fazer uma pesquisa com dados numéricos.',
        ['EF04MA23', 'EF04MA24', 'EF04MA28'], '40 a 50 minutos, mais o registro em casa',
        'Termômetro de parede ou culinário, previsão do tempo impressa ou no celular, cartolina com malha.',
        ['Mostre um termômetro de verdade e peça que o estudante encoste a mão no bulbo: a coluna sobe.',
         'Leia a previsão do tempo do dia com a turma e anote a máxima e a mínima.',
         'Na versão A, ligue a temperatura à roupa e à sensação: quente, frio.',
         'Na versão B, cada quadradinho do gráfico vale 5 graus: pinte 5 quadradinhos para 25 graus.',
         'Na versão C, a pesquisa dos irmãos usa números, e não nomes: compare com a pesquisa de preferências.'],
        ['Relacione a temperatura com o que o estudante sente e veste. Use sempre o mesmo termômetro grande e claro.',
         'O registro diário da temperatura vira rotina previsível. Avise se o termômetro gelado ou quente puder incomodar.',
         'O registro diário dá uma tarefa curta e repetida. A pesquisa pela sala dá movimento.'],
        ['Bloco 1: 30°; 10°. Bloco 2: bermuda; casaco.', 'Bloco 1: terça; 12 °C; 10 graus. Bloco 2: seg 5, ter 6, qua 5, qui 4 e sex 5 quadradinhos.',
         'Bloco 1: quinta; 15 graus. Bloco 2 e 3: respostas pessoais.'],
        a, b, c)


# ---------- 13. formas de pagamento, troco e desconto ----------

def pagamento_troco():
    a = bloco(1, 'Paguei com R$ 10. Qual é o troco? Circule.', grade([
        item(produto('suco', '8') + dinheiro([10]), opcoes([2, 18], certa=2), exemplo=True),
        item(produto('pao', '7') + dinheiro([10]), opcoes([3, 17])),
        item(produto('leite', '5') + dinheiro([10]), opcoes([5, 15])),
    ], 1), 'Conte do preço até 10.') + bloco(2, 'Um brinquedo custa R$ 20. Vou pagar em 2 vezes iguais. Quanto pago cada vez? Circule.', opcoes([10, 2]))
    b = bloco(1, 'À vista ou parcelado?', tabela(['Produto', 'À vista', 'Parcelado', 'Total parcelado'], [
        ['Bicicleta', 'R$ 300', '3 vezes de R$ 110', ''], ['Tênis', 'R$ 150', '2 vezes de R$ 75', '']]) + frases([
            'Na bicicleta, quanto se paga a mais no parcelado?', 'No tênis, o parcelado custa mais?'])) + bloco(
        2, 'Calcule.', grade([
            f'<p class="conta">Camiseta de R$ 40 com desconto de R$ 8: R$ {VAZIO}</p>', f'<p class="conta">Compra de R$ 37 paga com R$ 50. Troco: R$ {VAZIO}</p>'], 1))
    c = bloco(1, 'Calcule o preço com desconto.', tabela(['Produto', 'Preço', 'Desconto', 'Preço final'], [
        ['Mochila', 'R$ 80', '10% (a décima parte)', ''], ['Jogo', 'R$ 64', 'metade do preço', ''], ['Livro', 'R$ 45', 'R$ 9', '']])) + bloco(
        2, 'Leia e resolva.', grade([
            problema(f'Uma TV custa <b>R$ {n(1200)}</b> à vista ou <b>10</b> vezes de <b>R$ 130</b>. Quanto custa a mais no parcelado?', '22mm'),
            problema('Comprei <b>3</b> cadernos de <b>R$ 12,50</b> e paguei com <b>R$ 50</b>. Qual foi o troco?', '22mm')], 2)) + bloco(
        3, 'Escreva três formas de pagar uma compra.', linhas(2))
    return ficha(
        'formas-de-pagamento-troco-e-desconto', 'Formas de pagamento, troco e desconto', '4º ano',
        'Calcular troco, comparar pagamento à vista e parcelado e calcular descontos em situações de compra.',
        ['EF04MA25'], '40 a 50 minutos', 'Dinheiro de brincadeira, folhetos de supermercado ou de loja com preços e uma calculadora para conferir.',
        ['Monte uma loja com folhetos de propaganda. O estudante escolhe um produto e paga com dinheiro de brincadeira.',
         'Para o troco, conte do preço até o valor pago, como faz o caixa da loja.',
         'Na versão A, use cédulas de brincadeira de verdade em cima da mesa.',
         'Na versão B, mostre que o parcelado pode custar mais: some as parcelas.',
         'Na versão C, a décima parte de um preço é o mesmo que 10% de desconto.'],
        ['Situações de compra conhecidas (lanche, mercado) dão sentido ao cálculo. Um valor por vez, com o dinheiro na mão.',
         'Explique as palavras "à vista", "parcelado", "troco" e "desconto" com exemplos concretos antes da folha. Mantenha as mesmas palavras.',
         'A lojinha dá movimento e papéis claros. Alterne caixa e cliente a cada rodada.'],
        ['Bloco 1: 3; 5. Bloco 2: 10.', 'Bloco 1: R$ 330; R$ 150; R$ 30 a mais; não. Bloco 2: R$ 32; R$ 13.',
         f'Bloco 1: R$ 72; R$ 32; R$ 36. Bloco 2: R$ 100 a mais (R$ {n(1300)} parcelado); troco de R$ 12,50. Bloco 3: por exemplo, dinheiro, cartão e pix.'],
        a, b, c)


FICHAS = [numeros_dezena_milhar, adicao_estimativa, multiplicacao, divisao, combinacoes, fracoes, decimais_dinheiro, multiplos_igualdades,
          malha_plantas, angulos_simetria, perimetro_medidas, temperatura, pagamento_troco]
