"""9º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos2 import grafico_barras, malha, solido
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, tabela
from ano3 import frases, ligar
from ano5 import empilhado
from ano6 import fluxo_vazio
from ano7 import plano1, plano4, reta_int, transversal
from ano8 import sup
from ano9 import circ_angulos, grafico_enganoso, mapa_escala, quadrado_diag, semelhantes, tri_ret, vista
from hab3 import cx, probs


def h9(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='40 a 50 minutos'):
    return ficha(slug, titulo, '9º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def ret(x, y, c, l):
    return [(i, j) for i in range(x, x + c) for j in range(y, y + l)]


def ordem(passos):
    return tabela(['Passo', 'Ordem'], passos)


# ---------- Números ----------

def segmentos_incomensuraveis():
    a = bloco(1, 'Desenhe um quadrado de 5 cm de lado e meça a diagonal com a régua.', caixa_desenho('62mm') + frases(['A diagonal mede cerca de:'])) + bloco(
        2, 'A diagonal é maior ou menor que o lado? Circule.', item(opcoes(['maior', 'menor'])))
    b = bloco(1, 'Num quadrado de lado 1, o quadrado feito sobre a diagonal d tem área 2. Então d × d = 2.', item(quadrado_diag('1', 'd')) + frases([
        'd está entre 1 e 2? Por quê?', '1,4 × 1,4 =', '1,41 × 1,41 =', '1,42 × 1,42 ='])) + bloco(
        2, 'Existe uma fração exata para d? O que isso quer dizer?', linhas(2))
    c = bloco(1, 'Tomando o lado do quadrado como unidade, a diagonal mede √2. Explique por que nenhuma fração ao quadrado dá exatamente 2 (teste 7/5 e 17/12).', linhas(3)) + bloco(
        2, 'Use Pitágoras: qual é a altura de um triângulo equilátero de lado 2?', linhas(1)) + bloco(
        3, 'Desenhe um quadrado de lado 1 sobre a reta numérica e gire a diagonal com o compasso para marcar √2.', caixa_desenho('44mm'))
    return h9(
        'segmentos-que-nao-sao-racionais', 'Segmentos que não são racionais', 'EF09MA01',
        'Reconhecer que, fixada uma unidade de comprimento, existem segmentos cuja medida não é um número racional, como a diagonal do quadrado e a altura do triângulo equilátero.',
        'Régua, compasso, papel quadriculado, calculadora.',
        ['Desenhe quadrados de vários tamanhos e meça as diagonais.',
         'Mostre que o quadrado sobre a diagonal tem o dobro da área do quadrado original.',
         'Procure um número que vezes ele mesmo dá 2: chega perto, mas nunca é exato.',
         'Na versão C, o estudante explica por que √2 não é fração e marca √2 na reta.'],
        ['Meça com a régua antes de calcular.',
         'Use o mesmo quadrado de lado 1 em todas as atividades.',
         'Desafio: chegar mais perto de √2 só multiplicando.'],
        ['Bloco 1: cerca de 7,1 cm. Bloco 2: maior.',
         'Bloco 1: sim, porque 1 × 1 = 1 e 2 × 2 = 4; 1,96; 1,9881; 2,0164. Bloco 2: não; d = √2 é um número irracional.',
         'Bloco 1: (7/5)² = 49/25 e (17/12)² = 289/144 chegam perto de 2 mas não dão 2; nenhuma fração dá. Bloco 2: √3. Bloco 3: a ponta do arco marca √2 ≈ 1,41.'],
        a, b, c)


def irracionais_reta():
    a = bloco(1, 'O número é racional ou irracional? Circule.', grade([
        item(cx('π = 3,14159265...'), opcoes(['irracional', 'racional'], certa='irracional'), exemplo=True),
        item(cx('0,5'), opcoes(['racional', 'irracional']))], 2), 'Irracional: o decimal nunca acaba e nunca se repete.') + bloco(
        2, '√2 fica entre: Circule.', item(opcoes(['1 e 2', '2 e 3'])))
    b = bloco(1, 'Escreva racional ou irracional.', frases(['0,75:', '0,333...:', '√9:', '√5:', 'π:', '1,010010001...:'])) + bloco(
        2, 'Marque aproximadamente na reta: √2 ≈ 1,41; √3 ≈ 1,73; π ≈ 3,14; −√2.', item(reta_int(-2, 4, None, 520)))
    c = bloco(1, 'Estime com uma casa decimal, sem calculadora, e depois confira.', frases(['√10 ≈', '√20 ≈', '√50 ≈'])) + bloco(
        2, 'Ordene do menor para o maior: √7; 2,6; 8/3; π; 2,65.', linhas(1)) + bloco(
        3, 'A soma de dois números irracionais pode ser racional? Dê um exemplo.', linhas(1))
    return h9(
        'irracionais-na-reta', 'Números irracionais na reta', 'EF09MA02',
        'Reconhecer um número irracional como um número real de representação decimal infinita e não periódica e estimar sua localização na reta.',
        'Calculadora, reta numérica no chão, barbante.',
        ['Mostre na calculadora √2 e π: os algarismos não se repetem.',
         'Compare com 1/3 = 0,333..., que se repete.',
         'Estime raízes por tentativa e marque na reta.',
         'Na versão C, o estudante estima, ordena e investiga somas.'],
        ['Use a calculadora para cada número.',
         'Use dois cartões fixos: racional (acaba ou repete) e irracional (não acaba e não repete).',
         'Desafio: quem estima √30 mais perto.'],
        ['Bloco 1: irracional; racional. Bloco 2: 1 e 2.',
         'Bloco 1: racional; racional; racional (é 3); irracional; irracional; irracional. Bloco 2: pontos marcados na reta.',
         'Bloco 1: 3,2; 4,5; 7,1. Bloco 2: 2,6; √7; 2,65; 8/3; π. Bloco 3: sim, por exemplo √2 + (−√2) = 0.'],
        a, b, c)


def calculos_reais():
    a = bloco(1, 'Quanto é? Circule.', grade([
        item(cx('√16 + √9'), opcoes(['7', '5'], certa='7'), exemplo=True),
        item(cx('2 × √25'), opcoes(['10', '50']))], 2), '√16 = 4 e √9 = 3.') + bloco(
        2, '√4 × √9 é igual a √36? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Calcule.', grade([item(cx(f'√50 = √25 × √2 = {VAZIO}')), item(cx(f'√12 + √3 = {VAZIO}')), item(cx(f'√8 × √2 = {VAZIO}')),
                                    item(cx(f'{sup(27, "1/3")} = {VAZIO}')), item(cx(f'{sup(16, "1/2")} = {VAZIO}')), item(cx(f'{sup(4, "3/2")} = {VAZIO}'))], 3)) + bloco(
        2, 'Com a calculadora, quanto dá 3√2, aproximadamente?', linhas(1))
    c = bloco(1, 'Calcule.', grade([item(cx(f'(√5 + 1)(√5 − 1) = {VAZIO}')), item(cx(f'2√18 − √8 = {VAZIO}')), item(cx(f'{sup(32, "2/5")} = {VAZIO}')),
                                    item(cx(f'√0,49 = {VAZIO}')), item(cx(f'1/√2 sem raiz no denominador = {VAZIO}'))], 2)) + bloco(
        2, f'Por que {sup("(−8)", "1/3")} existe nos números reais e {sup("(−4)", "1/2")} não?', linhas(2))
    return h9(
        'calculos-com-numeros-reais', 'Cálculos com números reais', 'EF09MA03',
        'Efetuar cálculos com números reais, inclusive potências com expoentes fracionários.',
        'Calculadora científica, cartões com raízes e potências.',
        ['Revise raízes exatas e potências.',
         'Mostre que √(a × b) = √a × √b com exemplos exatos.',
         'Simplifique raízes tirando fatores quadrados (√50 = 5√2).',
         'Na versão C, o estudante opera com raízes e expoentes fracionários.'],
        ['Mantenha a lista dos quadrados perfeitos à vista.',
         'Siga sempre a ordem: procurar quadrado perfeito, tirar da raiz, juntar.',
         'Desafio: conferir as respostas na calculadora.'],
        ['Bloco 1: 7; 10. Bloco 2: sim (2 × 3 = 6).',
         'Bloco 1: 5√2; 3√3; 4; 3; 4; 8. Bloco 2: cerca de 4,24.',
         'Bloco 1: 4; 4√2; 4; 0,7; √2/2. Bloco 2: (−2) × (−2) × (−2) = −8, mas nenhum número real ao quadrado dá −4.'],
        a, b, c)


def problemas_reais():
    a = bloco(1, 'A luz anda cerca de 300 000 km por segundo, que se escreve 3 × 10<sup>5</sup> km/s. Quantos zeros tem 300 000? Circule.', item(opcoes(['5', '3']))) + bloco(
        2, 'Uma pizza redonda tem 10 cm de raio. A área é π × 10 × 10, cerca de: Circule.', item(opcoes(['314 cm²', '31,4 cm²'])), 'Use π ≈ 3,14.')
    b = bloco(1, 'Leia e resolva.', probs([
        'Uma tela quadrada tem 2 m² de área. Quanto mede o lado, aproximadamente?',
        'O mundo tem cerca de 8 × 10<sup>9</sup> habitantes e o Brasil, 2,1 × 10<sup>8</sup>. Quantas vezes a população mundial é maior?',
        'Uma roda de 0,6 m de diâmetro dá 1 000 voltas. Quantos metros anda? Use π = 3,14.'], '16mm', 3))
    c = bloco(1, 'Leia e resolva.', probs([
        'A luz do Sol percorre 1,5 × 10<sup>8</sup> km até a Terra, a 3 × 10<sup>5</sup> km/s. Quanto tempo leva?',
        'Um terreno quadrado tem 50 m². Quantos metros de cerca são necessários para contorná-lo?',
        'Uma célula mede 2 × 10<sup>−5</sup> m. Quantas cabem enfileiradas em 1 cm?'], '16mm', 3)) + bloco(
        2, 'Crie um problema com notação científica e resolva.', linhas(2))
    return h9(
        'problemas-com-numeros-reais', 'Problemas com números reais', 'EF09MA04',
        'Resolver e elaborar problemas com números reais, inclusive em notação científica, envolvendo diferentes operações.',
        'Calculadora científica, notícias de ciência, trena.',
        ['Leia uma notícia com números muito grandes ou muito pequenos.',
         'Escreva os números em notação científica antes de calcular.',
         'Confira se a resposta tem um tamanho razoável.',
         'Na versão C, o estudante resolve problemas de várias etapas e cria um.'],
        ['Use a calculadora e escreva cada passo.',
         'Mantenha a tabela das potências de 10 à vista.',
         'Um problema por vez, com pausa entre eles.'],
        ['Bloco 1: 5. Bloco 2: 314 cm².',
         'Bloco 1: cerca de 1,41 m; cerca de 38 vezes; 1 884 m.',
         'Bloco 1: 500 segundos, cerca de 8 minutos e 20 segundos; o lado é √50 ≈ 7,07 m e a cerca tem cerca de 28,3 m; 500 células. Bloco 2: resposta pessoal.'],
        a, b, c)


def razoes_diferentes():
    a = bloco(1, 'Um carro andou 120 km em 2 horas. Em cada hora andou: Circule.', item(opcoes(['60 km', '240 km'])), 'Velocidade = distância ÷ tempo.') + bloco(
        2, 'Uma vila tem 1 000 pessoas em 10 km². Quantas pessoas por km²? Circule.', item(opcoes(['100', '10 000'])))
    b = bloco(1, 'Complete.', tabela(['Situação', 'Conta', 'Resultado'], [
        ['Ciclista: 45 km em 3 h', '', ''], ['Cidade: 60 000 habitantes em 200 km²', '', ''],
        ['Carro: 360 km com 30 litros', '', ''], ['Ferro: 79 g em 10 cm³', '', '']])) + bloco(
        2, 'Qual cidade é mais povoada: A (5 000 habitantes em 50 km²) ou B (8 000 habitantes em 100 km²)?', linhas(1))
    c = bloco(1, 'Leia e resolva.', probs([
        'Um avião voa 2 700 km em 3 horas. Qual é a velocidade em km/h e em m/s?',
        'Uma cidade tem cerca de 11,5 milhões de habitantes em 1 521 km². Qual é a densidade demográfica?',
        'Um bloco de madeira de 500 cm³ tem 350 g. Ele boia na água, que tem densidade de 1 g/cm³?'], '16mm', 3)) + bloco(
        2, 'Escreva outras duas razões entre grandezas diferentes que aparecem no dia a dia.', linhas(2))
    return h9(
        'razoes-entre-grandezas-diferentes', 'Razões entre grandezas diferentes', 'EF09MA07',
        'Resolver problemas com razões entre grandezas de espécies diferentes, como velocidade e densidade demográfica.',
        'Mapa com população das cidades, calculadora, balança e objetos.',
        ['Pergunte: quantos km o carro anda em uma hora? Isso é uma razão entre distância e tempo.',
         'Compare cidades pela densidade demográfica.',
         'Mostre outras razões: km por litro, preço por quilo.',
         'Na versão C, o estudante converte unidades e calcula densidade.'],
        ['Use exemplos da própria cidade.',
         'Escreva sempre a unidade junto do resultado (km/h, hab/km²).',
         'Desafio: comparar o preço por quilo de dois produtos do mercado.'],
        ['Bloco 1: 60 km. Bloco 2: 100.',
         'Bloco 1: 45 ÷ 3 = 15 km/h; 60 000 ÷ 200 = 300 hab/km²; 360 ÷ 30 = 12 km/L; 79 ÷ 10 = 7,9 g/cm³. Bloco 2: A (100 contra 80 hab/km²).',
         'Bloco 1: 900 km/h = 250 m/s; cerca de 7 560 hab/km²; densidade 0,7 g/cm³, menor que 1, então boia. Bloco 2: por exemplo preço por quilo, batimentos por minuto.'],
        a, b, c)


def proporcionalidade_escalas():
    a = bloco(1, 'No mapa, a escola e a praça estão a 4 cm uma da outra. Na realidade, estão a: Circule.', item(mapa_escala(), opcoes(['2 000 m', '4 000 m']))) + bloco(
        2, 'Dividir R$ 30 entre Ana e Bia na razão de 1 para 2. Ana recebe: Circule.', item(opcoes(['R$ 10', 'R$ 15'])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Três amigos investiram R$ 20, R$ 30 e R$ 50 e lucraram R$ 400. Dividindo de forma proporcional, quanto cada um recebe?',
        'Uma planta na escala 1 : 100 mostra uma sala de 4 cm por 5 cm. Quais são as medidas reais?',
        'Um carro gasta 8 litros a cada 100 km. Quanto gasta em 350 km?'], '16mm', 3))
    c = bloco(1, 'Leia e resolva.', probs([
        'A população de uma cidade passou de 50 000 para 56 000 em 4 anos. Qual foi a variação média por ano?',
        'Divida 120 balas em partes inversamente proporcionais às idades 2, 3 e 6 anos.',
        'Uma maquete na escala 1 : 200 tem 15 cm de altura. Qual é a altura real do prédio?'], '16mm', 3)) + bloco(
        2, 'A área desmatada de uma região passou de 400 km² para 500 km² em um ano. Qual foi o aumento em porcentagem? O que isso significa?', linhas(2))
    return h9(
        'proporcionalidade-escalas-e-partes', 'Escalas e divisão em partes proporcionais', 'EF09MA08',
        'Resolver e elaborar problemas de proporcionalidade direta e inversa, inclusive escalas, divisão em partes proporcionais e taxa de variação, em contextos sociais e ambientais.',
        'Mapas e plantas com escala, régua, calculadora, dados de população ou de meio ambiente.',
        ['Meça distâncias num mapa e converta pela escala.',
         'Divida um prêmio de forma proporcional ao que cada um investiu.',
         'Calcule a variação de dados reais (população, desmatamento) por ano.',
         'Na versão C, o estudante usa partes inversamente proporcionais e taxa de variação.'],
        ['Use a régua no mapa de verdade.',
         'Organize os dados sempre numa tabela de duas colunas.',
         'Desafio: calcular a distância real entre dois lugares da cidade no mapa.'],
        ['Bloco 1: 2 000 m. Bloco 2: R$ 10.',
         'Bloco 1: R$ 80, R$ 120 e R$ 200; 4 m por 5 m; 28 litros.',
         'Bloco 1: 1 500 habitantes por ano; 60, 40 e 20 balas; 30 m. Bloco 2: 25%; a área desmatada cresceu um quarto em um ano.'],
        a, b, c)


# ---------- Geometria ----------

def angulos_paralelas():
    a = bloco(1, 'Os dois ângulos estão na mesma posição (correspondentes). Quanto mede o ângulo com ?? Circule.', item(transversal({0: '60°', 4: '?'}), opcoes(['60°', '120°']))) + bloco(
        2, 'Os dois ângulos juntos formam meia volta (180°). Quanto mede o ângulo com ?? Circule.', item(transversal({0: '60°', 1: '?'}), opcoes(['120°', '60°'])))
    b = bloco(1, 'Ache a medida de todos os ângulos.', item(transversal({0: '60°', 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g'}))
              + frases(['a =', 'b =', 'c =', 'd, e, f, g ='])) + bloco(
        2, 'Explique por que b = 60°.', linhas(2))
    c = bloco(1, 'Demonstre que os ângulos alternos internos x e y são iguais, usando ângulos correspondentes e opostos pelo vértice.', item(transversal({3: 'x', 5: 'y'})) + linhas(3)) + bloco(
        2, 'Prove que a soma dos ângulos de um triângulo é 180°, traçando pelo vértice uma reta paralela ao lado oposto.', caixa_desenho('36mm') + linhas(2)) + bloco(
        3, 'Os ângulos 2x + 10° e 3x − 20° são alternos internos. Quanto vale x?', linhas(1))
    return h9(
        'demonstrar-angulos-de-paralelas', 'Ângulos de paralelas cortadas por transversal', 'EF09MA10',
        'Demonstrar relações simples entre os ângulos formados por retas paralelas cortadas por uma transversal.',
        'Régua, transferidor, papel vegetal para copiar e sobrepor ângulos.',
        ['Desenhe duas paralelas e uma transversal; meça os oito ângulos.',
         'Copie um ângulo no papel vegetal e deslize pela transversal: os correspondentes coincidem.',
         'Escreva as justificativas: opostos pelo vértice, suplementares, correspondentes.',
         'Na versão C, o estudante escreve demonstrações curtas.'],
        ['Pinte com a mesma cor os ângulos iguais.',
         'Use sempre os mesmos nomes (correspondentes, alternos, opostos).',
         'Desafio: achar os oito ângulos sabendo só um.'],
        ['Bloco 1: 60°. Bloco 2: 120°.',
         'Bloco 1: a = 120°; b = 60°; c = 120°; d = 60°, e = 120°, f = 60°, g = 120°. Bloco 2: b e o ângulo de 60° são opostos pelo vértice (ou: a + 60° = 180° e a + b = 180°).',
         'Bloco 1: x é oposto pelo vértice ao ângulo acima à esquerda no cruzamento de cima, que é correspondente a y; logo x = y. Bloco 2: os três ângulos no vértice formam 180° e cada um é alterno interno a um ângulo do triângulo. Bloco 3: x = 30°.'],
        a, b, c)


def arcos_angulos():
    a = bloco(1, 'O ângulo central mede 80°. O arco AB mede: Circule.', item(circ_angulos(True, False, '80°'), opcoes(['80°', '40°']))) + bloco(
        2, 'O ângulo inscrito vale a metade do ângulo central de 80°. Ele mede: Circule.', item(circ_angulos(False, True, '', '?'), opcoes(['40°', '160°'])))
    b = bloco(1, 'Complete.', tabela(['Ângulo central', 'Arco', 'Ângulo inscrito no mesmo arco'], [['100°', '', ''], ['', '60°', ''], ['', '', '35°']])) + bloco(
        2, 'Quanto mede um ângulo inscrito numa semicircunferência?', linhas(1)) + bloco(
        3, 'No software de geometria dinâmica, mova o vértice do ângulo inscrito sobre a circunferência. O que acontece com a medida?', linhas(1))
    c = bloco(1, 'Resolva.', frases([
        'Ângulo central entre o 12 e o 4 de um relógio:', 'Ângulo central de um pentágono regular inscrito:',
        'Ângulo inscrito 3x e ângulo central 4x + 20° no mesmo arco. x ='])) + bloco(
        2, 'Por que todos os ângulos inscritos no mesmo arco têm a mesma medida?', linhas(2))
    return h9(
        'arcos-e-angulos-na-circunferencia', 'Arcos e ângulos na circunferência', 'EF09MA11',
        'Resolver problemas com relações entre arcos, ângulos centrais e ângulos inscritos na circunferência, inclusive com software de geometria dinâmica.',
        'Compasso, transferidor, relógio de ponteiros, software de geometria dinâmica.',
        ['Mostre no relógio: o ângulo central tem a mesma medida do arco.',
         'Meça um ângulo inscrito e o central do mesmo arco: o inscrito é a metade.',
         'No software, mova o vértice do inscrito e veja que a medida não muda.',
         'Na versão C, o estudante resolve problemas e explica a relação.'],
        ['Pinte o arco e os dois ângulos de cores diferentes.',
         'Use sempre a frase: inscrito é a metade do central.',
         'Desafio: descobrir os ângulos do relógio em várias horas.'],
        ['Bloco 1: 80°. Bloco 2: 40°.',
         'Bloco 1: arco 100° e inscrito 50°; central 60° e inscrito 30°; central 70° e arco 70°. Bloco 2: 90°. Bloco 3: a medida não muda.',
         'Bloco 1: 120°; 72°; x = 10° (2 × 3x = 4x + 20°). Bloco 2: porque todos valem a metade do mesmo ângulo central.'],
        a, b, c)


def semelhanca_triangulos():
    a = bloco(1, 'O triângulo verde é o amarelo ampliado. Cada lado ficou: Circule.', item(semelhantes(), opcoes(['o dobro', 'o triplo']))) + bloco(
        2, 'Ao ampliar, os ângulos mudaram? Circule.', item(opcoes(['não', 'sim'])))
    b = bloco(1, 'Responda.', item(semelhantes()) + frases(['Quanto mede o lado com ??', 'Razão de semelhança (verde para amarelo):'])) + bloco(
        2, 'Os triângulos são semelhantes?', frases(['Lados 2, 3, 4 e lados 4, 6, 8:', 'Lados 3, 4, 5 e lados 6, 8, 9:', 'Ângulos 50°, 60°, 70° e ângulos 50°, 60°, 70°:']))
    c = bloco(1, 'Complete os casos de semelhança.', tabela(['Caso', 'O que precisa acontecer'], [['AA', ''], ['LLL', ''], ['LAL', '']])) + bloco(
        2, 'Uma pessoa de 1,6 m tem sombra de 2 m. No mesmo momento, um poste tem sombra de 10 m. Qual é a altura do poste? Explique a semelhança.', linhas(2)) + bloco(
        3, 'Dois retângulos são sempre semelhantes? E dois quadrados? Por quê?', linhas(2))
    return h9(
        'condicoes-de-semelhanca-de-triangulos', 'Quando dois triângulos são semelhantes', 'EF09MA12',
        'Reconhecer as condições necessárias e suficientes para que dois triângulos sejam semelhantes.',
        'Triângulos recortados em vários tamanhos, régua, transferidor, fotocópias ampliadas.',
        ['Amplie uma figura na copiadora e compare lados e ângulos.',
         'Mostre que os ângulos ficam iguais e os lados ficam proporcionais.',
         'Apresente os casos AA, LLL e LAL.',
         'Na versão C, o estudante usa a semelhança para medir alturas pela sombra.'],
        ['Sobreponha os triângulos recortados para comparar os ângulos.',
         'Escreva a razão sempre do maior para o menor.',
         'Desafio: medir a altura da escola pela sombra.'],
        ['Bloco 1: o dobro. Bloco 2: não.',
         'Bloco 1: 10; 2. Bloco 2: sim (razão 2); não (9 ÷ 5 não é 2); sim (ângulos iguais).',
         'Bloco 1: dois ângulos iguais; os três lados proporcionais; dois lados proporcionais e o ângulo entre eles igual. Bloco 2: 8 m; os raios de sol formam triângulos com ângulos iguais. Bloco 3: retângulos não (os lados podem não ser proporcionais); quadrados sim.'],
        a, b, c)


def relacoes_metricas():
    a = bloco(1, 'Some as áreas dos quadrados dos catetos: 3 × 3 + 4 × 4. Circule.', item(tri_ret(3, 4, 5, 26, ('3', '4', '5')), opcoes(['25', '12']))) + bloco(
        2, 'A hipotenusa mede 5, e 5 × 5 = 25. Deu o mesmo? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Complete.', tabela(['Catetos', 'a² + b²', 'Hipotenusa'], [['6 e 8', '', ''], ['5 e 12', '', ''], ['9 e 12', '', '']])) + bloco(
        2, 'Desenhe no quadriculado o triângulo de catetos 3 e 4 e os quadrados sobre os três lados. Conte os quadradinhos.', item(malha(14, 11, 15)))
    c = bloco(1, 'A altura h relativa à hipotenusa divide a hipotenusa a em m e n. Valem h² = m × n, b² = a × m e c² = a × n. Explique uma delas com semelhança de triângulos.', linhas(3)) + bloco(
        2, 'Se m = 9 e n = 16:', frases(['a =', 'h =', 'b (b² = a × m) =', 'c (c² = a × n) ='])) + bloco(
        3, 'Some b² = a × m com c² = a × n e mostre que b² + c² = a².', linhas(2))
    return h9(
        'relacoes-metricas-e-pitagoras', 'Relações métricas e teorema de Pitágoras', 'EF09MA13',
        'Demonstrar relações métricas do triângulo retângulo, entre elas o teorema de Pitágoras, inclusive por semelhança de triângulos.',
        'Papel quadriculado, tesoura, triângulos retângulos recortados.',
        ['Desenhe quadrados sobre os lados do triângulo 3, 4, 5 e conte os quadradinhos.',
         'Recorte os quadrados menores e cubra o maior.',
         'Mostre os três triângulos semelhantes formados pela altura.',
         'Na versão C, o estudante usa as relações e demonstra Pitágoras.'],
        ['Conte os quadradinhos antes de usar a fórmula.',
         'Pinte os catetos de uma cor e a hipotenusa de outra.',
         'Desafio: achar outros trios de números inteiros que funcionam.'],
        ['Bloco 1: 25. Bloco 2: sim.',
         'Bloco 1: 100 e 10; 169 e 13; 225 e 15. Bloco 2: 9 + 16 = 25 quadradinhos.',
         'Bloco 1: por exemplo, o triângulo menor e o maior são semelhantes, então h/m = n/h, logo h² = m × n. Bloco 2: 25; 12; 15; 20. Bloco 3: b² + c² = a × m + a × n = a × (m + n) = a × a = a².'],
        a, b, c)


def pitagoras_tales():
    a = bloco(1, 'Uma escada forma um triângulo retângulo com o chão e o muro. Quanto mede a escada? Circule.', item(tri_ret(3, 4, 5, 26, ('3 m', '4 m', '?')), opcoes(['5 m', '7 m'])),
              '3 × 3 + 4 × 4 = 25, e 5 × 5 = 25.') + bloco(
        2, 'Retas paralelas cortam duas transversais. Numa delas, os pedaços medem 2 cm e 4 cm. Na outra, o primeiro mede 3 cm. O segundo mede: Circule.', item(opcoes(['6 cm', '5 cm'])))
    b = bloco(1, 'Leia e resolva.', probs([
        'Uma escada de 5 m está encostada num muro, com o pé a 3 m do muro. A que altura ela toca o muro?',
        'Um terreno retangular mede 30 m por 40 m. Quanto mede a diagonal?',
        'Três ruas paralelas cortam duas avenidas. Numa avenida, os quarteirões medem 60 m e 90 m. Na outra, o primeiro mede 80 m. Quanto mede o segundo?'], '16mm', 3))
    c = bloco(1, 'Leia e resolva.', probs([
        'Uma TV de 50 polegadas (medida da diagonal) tem 40 polegadas de largura. Qual é a altura?',
        'Um avião sobe 3 km enquanto avança 4 km na horizontal. Que distância percorreu?',
        'Qual é a distância entre os pontos (1, 2) e (7, 10) no plano?'], '16mm', 3)) + bloco(
        2, 'Elabore um problema que use o teorema de Pitágoras ou o teorema de Tales.', linhas(2))
    return h9(
        'problemas-com-pitagoras-e-tales', 'Problemas com Pitágoras e Tales', 'EF09MA14',
        'Resolver e elaborar problemas de aplicação do teorema de Pitágoras e das relações de proporcionalidade entre retas paralelas cortadas por transversais.',
        'Trena, barbante, régua, papel pautado (as linhas são paralelas).',
        ['Meça com a trena o comprimento e a largura da sala e calcule a diagonal; depois confira medindo.',
         'Use o papel pautado: duas transversais cortadas pelas linhas mostram pedaços proporcionais.',
         'Resolva problemas de escadas, terrenos e ruas.',
         'Na versão C, o estudante resolve problemas de várias áreas e cria um.'],
        ['Desenhe o triângulo do problema antes de calcular.',
         'Marque sempre o ângulo reto e escreva qual lado é a hipotenusa.',
         'Desafio: medir a diagonal da quadra da escola.'],
        ['Bloco 1: 5 m. Bloco 2: 6 cm.',
         'Bloco 1: 4 m; 50 m; 120 m.',
         'Bloco 1: 30 polegadas; 5 km; 10 (6 na horizontal e 8 na vertical). Bloco 2: resposta pessoal.'],
        a, b, c)


def fluxograma_poligono():
    a = bloco(1, 'Para construir um triângulo equilátero de lado 5 cm, escreva a ordem dos passos (1, 2, 3, 4).', ordem([
        ['Desenhar com a régua o lado AB de 5 cm.', '1'], ['Ligar o ponto C às pontas A e B.', ''],
        ['Com centro em A e abertura de 5 cm, traçar um arco.', ''], ['Com centro em B e a mesma abertura, traçar um arco que cruza o primeiro em C.', '']])) + bloco(
        2, 'Siga os passos e construa o triângulo.', caixa_desenho('56mm'))
    b = bloco(1, 'Complete o fluxograma para construir um quadrado de lado L com régua e compasso.', item(fluxo_vazio(5))) + bloco(
        2, 'Use o fluxograma com L = 4 cm.', caixa_desenho('56mm'))
    c = bloco(1, 'Escreva o algoritmo e o fluxograma para construir um polígono regular de n lados e lado L num software de geometria dinâmica.', caixa_desenho('60mm')) + bloco(
        2, 'Para um octógono regular, qual é o ângulo de rotação em torno do centro?', linhas(1)) + bloco(
        3, 'Construa no papel um hexágono regular de lado 3 cm.', caixa_desenho('56mm'))
    return h9(
        'fluxograma-de-poligono-regular-com-compasso', 'Fluxograma de polígono regular com régua e compasso', 'EF09MA15',
        'Descrever por escrito e por fluxograma um algoritmo para construir um polígono regular de lado conhecido, com régua e compasso e com software.',
        'Régua, compasso, software de geometria dinâmica, cartões de fluxograma.',
        ['Construa um triângulo equilátero no quadro, falando cada passo.',
         'Escreva os passos em cartões e monte o fluxograma.',
         'No software, use a rotação em torno do centro para repetir os vértices.',
         'Na versão C, o estudante generaliza para n lados.'],
        ['Faça cada passo junto, segurando o compasso.',
         'Use sempre os mesmos nomes para os vértices (A, B, C...).',
         'Desafio: o fluxograma mais curto que funciona para qualquer polígono.'],
        ['Bloco 1: 1, 4, 2, 3. Bloco 2: triângulo construído.',
         'Bloco 1: desenhar o lado AB com medida L; traçar a perpendicular em A (mediatriz de um segmento que contém A) e marcar D a L de A; fazer o mesmo em B e marcar C; ligar C e D; fim. Bloco 2: quadrado construído.',
         'Bloco 1: marcar o centro; traçar a circunferência; marcar um vértice; girar o vértice 360° ÷ n em torno do centro, n − 1 vezes; ligar os vértices (com o lado L, o raio deve ser ajustado ou usar a ferramenta polígono regular). Bloco 2: 45°. Bloco 3: hexágono construído.'],
        a, b, c)


def ponto_medio_distancia():
    a = bloco(1, 'Qual é o ponto do meio entre A e B? Circule.', item(plano1(8, 4, 28, pontos={(1, 2): 'A', (7, 2): 'B'}), opcoes(['(4, 2)', '(3, 2)']))) + bloco(
        2, 'Quantos quadradinhos há de A até B? Circule.', item(opcoes(['6', '8'])))
    b = bloco(1, 'Use os pontos A, B e C.', item(plano1(7, 6, 26, pontos={(1, 1): 'A', (5, 1): 'B', (5, 4): 'C'})) + frases([
        'Ponto médio de AB:', 'Ponto médio de BC:', 'Distância AB:', 'Distância BC:', 'Distância AC (use Pitágoras):'])) + bloco(
        2, 'Qual é o perímetro do triângulo ABC?', linhas(1))
    c = bloco(1, 'Triângulo com A(−3, −2), B(3, −2) e C(3, 6).', item(plano4(6, 18, figuras=[[(-3, -2), (3, -2), (3, 6)]])) + frases([
        'Ponto médio de AC:', 'Distâncias AB, BC e AC:', 'Perímetro:', 'Área:'])) + bloco(
        2, 'Explique como você achou o ponto médio sem usar fórmula.', linhas(2))
    return h9(
        'ponto-medio-e-distancia-no-plano', 'Ponto médio e distância no plano', 'EF09MA16',
        'Determinar o ponto médio de um segmento e a distância entre dois pontos no plano cartesiano, sem fórmulas, e usar isso para calcular perímetros e áreas.',
        'Papel quadriculado, régua, barbante.',
        ['Marque dois pontos na mesma linha e conte os quadradinhos: a distância e o meio aparecem.',
         'Para pontos em diagonal, desenhe o triângulo retângulo e use Pitágoras.',
         'Calcule perímetro e área de figuras desenhadas no plano.',
         'Na versão C, o estudante trabalha com coordenadas negativas.'],
        ['Conte os quadradinhos com o dedo.',
         'Escreva sempre o x primeiro e o y depois.',
         'Desafio: desenhar uma figura com perímetro dado.'],
        ['Bloco 1: (4, 2). Bloco 2: 6.',
         'Bloco 1: (3, 1); (5; 2,5); 4; 3; 5. Bloco 2: 12.',
         'Bloco 1: (0, 2); 6, 8 e 10; 24; 24. Bloco 2: o ponto médio fica na metade do caminho em x e na metade do caminho em y.'],
        a, b, c)


def vistas_perspectiva():
    a = bloco(1, 'Qual é a vista de frente deste bloco? Circule.', item(empilhado(3, 1, 2, 26), opcoes([vista(ret(0, 0, 3, 2), 18), vista(ret(0, 0, 1, 2), 18)]))) + bloco(
        2, 'Pinte na malha a vista de cima deste bloco.', item(empilhado(3, 2, 1, 26)) + item(malha(4, 3, 24)))
    b = bloco(1, 'Pinte as vistas de frente, de cima e de lado.', item(empilhado(3, 2, 2, 24)) + grade([
        item(malha(4, 4, 18), cx('frente')), item(malha(4, 4, 18), cx('cima')), item(malha(4, 4, 18), cx('lado'))], 3))
    c = bloco(1, 'Desenhe as vistas de frente e de cima de um cilindro e de um cone.', item(solido('cilindro', 80) + solido('cone', 80)) + caixa_desenho('36mm')) + bloco(
        2, 'Um objeto tem vista de frente em forma de triângulo e vista de cima em forma de círculo. Que objeto é? Desenhe em perspectiva.', caixa_desenho('36mm')) + bloco(
        3, 'Desenhe em perspectiva um bloco de 4 × 2 × 1 cubinhos.', caixa_desenho('36mm'))
    return h9(
        'vistas-ortogonais-e-perspectiva', 'Vistas ortogonais e perspectiva', 'EF09MA17',
        'Reconhecer vistas ortogonais de figuras espaciais e usar esse conhecimento para desenhar objetos em perspectiva.',
        'Cubinhos de encaixe, objetos (latas, caixas, funil), papel quadriculado e malha pontilhada.',
        ['Monte blocos de cubinhos e olhe de frente, de cima e de lado.',
         'Desenhe cada vista na malha quadriculada.',
         'Faça o caminho contrário: das vistas para o objeto.',
         'Na versão C, o estudante desenha sólidos redondos e em perspectiva.'],
        ['Monte o bloco de verdade e gire na mão.',
         'Use sempre a mesma ordem das vistas: frente, cima, lado.',
         'Desafio: o colega monta um bloco escondido e diz as vistas; você descobre.'],
        ['Bloco 1: a primeira (3 quadradinhos por 2). Bloco 2: retângulo de 3 por 2.',
         'Bloco 1: frente 3 por 2; cima 3 por 2; lado 2 por 2.',
         'Bloco 1: cilindro: frente retângulo e cima círculo; cone: frente triângulo e cima círculo. Bloco 2: um cone. Bloco 3: desenho em perspectiva.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def unidades_extremas():
    a = bloco(1, 'Ligue cada medida à unidade usada.', ligar([
        ('distância entre cidades', 'gigabyte'), ('espaço de um celular', 'quilômetro'), ('tamanho de uma célula', 'micrômetro')])) + bloco(
        2, '1 gigabyte (GB) é maior que 1 megabyte (MB)? Circule.', item(opcoes(['sim', 'não'])))
    b = bloco(1, 'Complete.', frases(['1 km = ___ m', '1 mm = ___ m', '1 micrômetro = ___ m', '1 GB ≈ ___ MB', '1 ano-luz ≈ 9,5 × 10<sup>12</sup> km = ___ m'])) + bloco(
        2, 'Um celular tem 128 GB. Cada foto ocupa 4 MB. Quantas fotos cabem? Use 1 GB = 1 000 MB.', linhas(1))
    c = bloco(1, 'Leia e resolva.', probs([
        'Um vírus mede 100 nanômetros (1 nm = 10<sup>−9</sup> m). Quantos cabem enfileirados em 1 mm?',
        'A distância da Terra a Marte varia de 5,5 × 10<sup>7</sup> km a 4 × 10<sup>8</sup> km. Quantas vezes a maior é maior que a menor?',
        'A unidade astronômica (UA) vale 1,5 × 10<sup>8</sup> km. Júpiter está a cerca de 5,2 UA do Sol. Quantos km?'], '16mm', 3)) + bloco(
        2, 'Por que usamos unidades como o ano-luz e o nanômetro?', linhas(2))
    return h9(
        'unidades-muito-grandes-e-muito-pequenas', 'Unidades muito grandes e muito pequenas', 'EF09MA18',
        'Reconhecer e usar unidades para medidas muito grandes ou muito pequenas, como distâncias no espaço, tamanho de vírus e células e capacidade de armazenamento de computadores.',
        'Régua milimetrada, celular ou computador (ver espaço de armazenamento), imagens do sistema solar e de células.',
        ['Mostre o milímetro na régua e imagine dividi-lo em mil partes.',
         'Veja quanto espaço livre há num celular e quanto ocupa uma foto.',
         'Compare distâncias no sistema solar em km e em UA.',
         'Na versão C, o estudante converte com notação científica.'],
        ['Use exemplos concretos: o tamanho da foto no celular.',
         'Deixe a tabela de prefixos (quilo, mega, giga, mili, micro, nano) à vista.',
         'Desafio: quantas músicas cabem num pen drive.'],
        ['Bloco 1: cidades com quilômetro; celular com gigabyte; célula com micrômetro. Bloco 2: sim.',
         f'Bloco 1: 1 000; 0,001 = {sup(10, "−3")}; {sup(10, "−6")}; 1 000 (ou 1 024); 9,5 × {sup(10, 15)} m. Bloco 2: 32 000 fotos.',
         f'Bloco 1: 10 000 vírus ({sup(10, "−3")} ÷ {sup(10, "−7")}); cerca de 7,3 vezes; 7,8 × {sup(10, 8)} km. Bloco 2: para não escrever números enormes ou com muitos zeros depois da vírgula.'],
        a, b, c)


def volume_prismas_cilindros():
    a = bloco(1, 'A base tem 3 × 2 = 6 cubinhos e a altura é 2. Qual é o volume? Circule.', item(empilhado(3, 2, 2, 26), opcoes(['12', '8']))) + bloco(
        2, 'O volume do cilindro também é a área da base vezes a altura? Circule.', item(solido('cilindro', 90), opcoes(['sim', 'não'])))
    b = bloco(1, 'Complete. Use π = 3,14.', tabela(['Sólido', 'Área da base', 'Altura', 'Volume'], [
        ['prisma de base quadrada de lado 4 cm', '', '10 cm', ''], ['prisma triangular: triângulo de base 6 cm e altura 4 cm', '', '10 cm', ''],
        ['cilindro de raio 3 cm', '', '10 cm', '']])) + bloco(
        2, 'Uma lata cilíndrica tem 5 cm de raio e 12 cm de altura. Quantos mililitros cabem?', linhas(1))
    c = bloco(1, 'Leia e resolva. Use π = 3,14.', probs([
        'Uma caixa-d\'água cilíndrica tem 1 m de raio e 1,5 m de altura. Quantos litros cabem?',
        'Uma barra de chocolate é um prisma triangular: o triângulo tem base 4 cm e altura 3 cm, e a barra tem 20 cm. Qual é o volume?',
        'Se eu dobrar o raio de um cilindro e mantiver a altura, o volume fica quantas vezes maior?'], '16mm', 3)) + bloco(
        2, 'Elabore um problema com o volume de um prisma ou de um cilindro.', linhas(2))
    return h9(
        'volume-de-prismas-e-cilindros', 'Volume de prismas e cilindros', 'EF09MA19',
        'Resolver e elaborar problemas com volumes de prismas e cilindros retos, inclusive com expressões de cálculo, em situações do cotidiano.',
        'Caixas, latas, régua, copo medidor, água ou arroz.',
        ['Empilhe camadas iguais de cubinhos: volume = área da base × altura.',
         'Mostre que o cilindro também é uma pilha de camadas (moedas empilhadas).',
         'Meça uma lata, calcule o volume e confira com água.',
         'Na versão C, o estudante resolve problemas e investiga o efeito de dobrar o raio.'],
        ['Use moedas empilhadas para mostrar o cilindro.',
         'Siga sempre a ordem: área da base, altura, volume, unidade.',
         'Desafio: qual embalagem do mercado guarda mais.'],
        ['Bloco 1: 12. Bloco 2: sim.',
         'Bloco 1: 16 cm² e 160 cm³; 12 cm² e 120 cm³; 28,26 cm² e 282,6 cm³. Bloco 2: 942 mL.',
         'Bloco 1: 4,71 m³ = 4 710 litros; 120 cm³; 4 vezes. Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def eventos_dependentes():
    a = bloco(1, 'Lanço uma moeda e depois um dado. O resultado da moeda muda o do dado? Circule.', item(opcoes(['não', 'sim'])), 'Quando um não muda o outro, os eventos são independentes.') + bloco(
        2, 'Um saco tem 2 bolas vermelhas e 1 azul. Tiro uma vermelha e não devolvo. Agora o saco tem: Circule.', item(opcoes(['1 vermelha e 1 azul', '2 vermelhas e 1 azul'])))
    b = bloco(1, 'Calcule.', frases([
        'P(cara na moeda e 6 no dado) =', 'Saco com 3 vermelhas e 2 azuis. Tiro duas, devolvendo a primeira. P(duas vermelhas) =',
        'Mesmo saco, sem devolver. P(duas vermelhas) ='])) + bloco(
        2, 'Por que as duas últimas respostas são diferentes?', linhas(2))
    c = bloco(1, 'Calcule.', frases([
        'Baralho de 52 cartas com 4 ases. P(dois ases, sem devolver) =', 'P(dois ases, devolvendo) =',
        'Duas moedas. P(pelo menos uma cara) =', 'Chance de chuva: sábado 30%, domingo 40%, independentes. P(chover nos dois dias) ='])) + bloco(
        2, 'Dê um exemplo de eventos dependentes no dia a dia.', linhas(2))
    return h9(
        'eventos-dependentes-e-independentes', 'Eventos dependentes e independentes', 'EF09MA20',
        'Reconhecer em experimentos aleatórios eventos independentes e dependentes e calcular a probabilidade nos dois casos.',
        'Saco com bolas coloridas, moedas, dados, baralho.',
        ['Tire bolas de um saco devolvendo e sem devolver e compare as chances.',
         'Mostre que, sem devolver, a segunda retirada depende da primeira.',
         'Multiplique as probabilidades em cada caso.',
         'Na versão C, o estudante resolve problemas com baralho e com dados do tempo.'],
        ['Faça as retiradas de verdade e conte as bolas no saco.',
         'Desenhe a árvore de possibilidades sempre no mesmo formato.',
         'Jogo rápido: adivinhar a cor da próxima bola.'],
        ['Bloco 1: não. Bloco 2: 1 vermelha e 1 azul.',
         'Bloco 1: 1/2 × 1/6 = 1/12; 3/5 × 3/5 = 9/25; 3/5 × 2/4 = 3/10. Bloco 2: sem devolver, o saco muda e a segunda retirada depende da primeira.',
         'Bloco 1: 4/52 × 3/51 = 1/221; 4/52 × 4/52 = 1/169; 3/4; 0,3 × 0,4 = 0,12 = 12%. Bloco 2: por exemplo escolher dois representantes da turma, um depois do outro.'],
        a, b, c)


def graficos_enganam():
    a = bloco(1, 'Olhe os números. A loja B vendeu: Circule.', item(grafico_enganoso(), opcoes(['só um pouco mais', '10 vezes mais']))) + bloco(
        2, 'O eixo do gráfico começa em: Circule.', item(opcoes(['90', '0'])))
    b = bloco(1, 'Analise o gráfico.', item(grafico_enganoso()) + frases(['Diferença real de vendas:', 'Quantas vezes a barra B parece maior que a A?', 'O que deveria mudar no gráfico?'])) + bloco(
        2, 'Liste três elementos que todo gráfico de notícia deve ter.', linhas(2))
    c = bloco(1, 'Complete.', tabela(['Problema no gráfico', 'Como engana', 'Como corrigir'], [
        ['eixo que não começa em zero', '', ''], ['sem fonte e sem data', '', ''], ['legenda confusa ou ausente', '', ''], ['desenhos com tamanhos fora de proporção', '', '']])) + bloco(
        2, 'Procure um gráfico numa notícia e analise título, fonte, data, escala e legenda.', linhas(3)) + bloco(
        3, 'Redesenhe o gráfico das lojas A e B de forma correta.', caixa_desenho('40mm'))
    return h9(
        'graficos-que-enganam', 'Gráficos que enganam', 'EF09MA21',
        'Analisar em gráficos da mídia os elementos que podem induzir a erros de leitura, como escalas inadequadas, legendas incorretas e falta de fonte e data.',
        'Gráficos de jornais, sites e propagandas; papel quadriculado.',
        ['Mostre o gráfico das lojas e pergunte: quanto a mais a loja B vendeu?',
         'Redesenhe com o eixo começando em zero e compare.',
         'Faça uma lista de verificação: título, fonte, data, escala, legenda.',
         'Na versão C, o estudante analisa um gráfico real.'],
        ['Leia os números do gráfico em voz alta antes de comparar as barras.',
         'Use sempre a mesma lista de verificação.',
         'Caça aos gráficos enganosos em notícias e propagandas.'],
        ['Bloco 1: só um pouco mais. Bloco 2: 90.',
         'Bloco 1: 8 vendas (99 − 91); mais de 4 vezes; começar o eixo em zero. Bloco 2: por exemplo título, fonte, data, legenda e unidades.',
         'Bloco 1: exagera diferenças, começar em zero; não dá para conferir, informar fonte e data; não se sabe o que cada cor mostra, legenda clara; a área aumenta mais que o valor, usar barras proporcionais. Bloco 2: resposta pessoal. Bloco 3: barras de 91 e 99 com o eixo desde zero.'],
        a, b, c)


def construir_grafico():
    a = bloco(1, 'Votação do passeio: zoológico 12 votos, cinema 8, praia 5. Pinte o gráfico de colunas.', item(grafico_barras(['zoológico', 'cinema', 'praia'], None, 12, celula=13, gap=60, vazio=True))) + bloco(
        2, 'Qual passeio ganhou? Circule.', item(opcoes(['zoológico', 'praia'])))
    b = bloco(1, 'Notas de Ana em 5 provas: 6,0; 6,5; 7,0; 7,5; 8,0. Que gráfico mostra a evolução? Desenhe e marque a média.', caixa_desenho('44mm') + frases(['Gráfico escolhido:', 'Média:'])) + bloco(
        2, 'Gastos de uma família: moradia 40%, alimentação 30%, outros 30%. Que gráfico usar?', linhas(1))
    c = bloco(1, 'Chuva (mm) em seis meses.', tabela(['Mês', 'jan', 'fev', 'mar', 'abr', 'mai', 'jun'], [['Chuva', '180', '160', '120', '80', '60', '50']])
              + frases(['Gráfico mais adequado e por quê:', 'Média:', 'Mediana:', 'Amplitude:'])) + bloco(
        2, 'Faça o gráfico na planilha com a média marcada como uma linha. Desenhe aqui um esboço.', caixa_desenho('40mm')) + bloco(
        3, 'Por que o gráfico de setores não é boa escolha para esses dados?', linhas(1))
    return h9(
        'construir-o-grafico-adequado', 'Construir o gráfico adequado', 'EF09MA22',
        'Escolher e construir o gráfico mais adequado (colunas, setores, linhas), com ou sem planilha, para um conjunto de dados, destacando as medidas de tendência central.',
        'Planilha eletrônica, papel quadriculado, dados da turma.',
        ['Recolha dados da turma e pergunte que gráfico mostra melhor.',
         'Construa o gráfico na planilha e acrescente a linha da média.',
         'Compare dois gráficos dos mesmos dados.',
         'Na versão C, o estudante escolhe, constrói e justifica.'],
        ['Comece pintando o gráfico de colunas no quadriculado.',
         'Use a mesma pergunta: comparar, mostrar partes de um todo ou mostrar a evolução?',
         'Desafio: fazer o gráfico na planilha em menos de 5 minutos.'],
        ['Bloco 1: colunas de 12, 8 e 5. Bloco 2: zoológico.',
         'Bloco 1: gráfico de linha; média 7,0. Bloco 2: gráfico de setores.',
         'Bloco 1: colunas ou linha, porque comparam meses e mostram a variação; média cerca de 108,3 mm; mediana 100 mm; amplitude 130 mm. Bloco 2: esboço. Bloco 3: os meses não são partes de um todo; o que interessa é a variação.'],
        a, b, c)


def pesquisa_social():
    a = bloco(1, 'Pergunte a 10 colegas: você separa o lixo reciclável em casa?', tabela(['Colega'] + [str(i) for i in range(1, 11)], [['Sim ou não'] + [''] * 10])) + bloco(
        2, 'Quantos responderam sim? Que porcentagem é essa?', linhas(1)) + bloco(
        3, 'Faça um gráfico com as respostas.', caixa_desenho('44mm'))
    b = bloco(1, 'Planeje uma pesquisa sobre um tema social.', tabela(['Etapa', 'O que vou fazer'], [
        ['tema e pergunta', ''], ['população e amostra', ''], ['como coletar', '']])) + bloco(
        2, 'Organize na planilha e calcule.', frases(['Porcentagem de cada resposta:', 'Média (se a pergunta for numérica):', 'Amplitude:'])) + bloco(
        3, 'Faça o gráfico adequado.', caixa_desenho('38mm'))
    c = bloco(1, 'Planeje.', tabela(['Etapa', 'O que vou fazer'], [
        ['tema social e pergunta', ''], ['população, amostra e técnica de amostragem', ''], ['coleta e organização na planilha', ''], ['medidas e gráficos', '']])) + bloco(
        2, 'Escreva o relatório: objetivo, método, resultados (tabelas, gráficos, média, moda, mediana e amplitude) e conclusão.', linhas(6)) + bloco(
        3, 'Que ação a escola ou o bairro pode tomar a partir dos resultados?', linhas(2))
    return h9(
        'pesquisa-social-e-relatorio', 'Pesquisa sobre a realidade social', 'EF09MA23',
        'Planejar e executar pesquisa amostral sobre tema da realidade social e comunicar os resultados em relatório com medidas de tendência central, amplitude, tabelas e gráficos feitos em planilha.',
        'Formulário em papel ou on-line, planilha eletrônica, lista de estudantes para sorteio.',
        ['Escolha com a turma um tema social próximo (lixo, transporte, uso de telas).',
         'Defina a pergunta, a amostra e como coletar.',
         'Organize na planilha, calcule as medidas e faça os gráficos.',
         'Na versão C, o estudante escreve o relatório e propõe uma ação.'],
        ['Use perguntas de sim ou não e poucas pessoas.',
         'Siga o mesmo roteiro de etapas, uma por aula.',
         'Divida a pesquisa em tarefas curtas: perguntar, contar, digitar, desenhar.'],
        ['Bloco 1: respostas da turma. Bloco 2: por exemplo 6 de 10, 60%. Bloco 3: gráfico de colunas ou de setores.',
         'Bloco 1: plano pessoal. Bloco 2: cálculos com os dados. Bloco 3: gráfico escolhido.',
         'Bloco 1: plano pessoal. Bloco 2: relatório pessoal. Bloco 3: por exemplo uma campanha de separação do lixo.'],
        a, b, c)


FICHAS = [segmentos_incomensuraveis, irracionais_reta, calculos_reais, problemas_reais, razoes_diferentes, proporcionalidade_escalas,
          angulos_paralelas, arcos_angulos, semelhanca_triangulos, relacoes_metricas, pitagoras_tales, fluxograma_poligono,
          ponto_medio_distancia, vistas_perspectiva, unidades_extremas, volume_prismas_cilindros,
          eventos_dependentes, graficos_enganam, construir_grafico, pesquisa_social]
