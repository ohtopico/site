"""Atividades desplugadas que juntam Computação e Matemática (6º ao 9º ano).

Mesmo formato das atividades de atividades.py, com area='matematica': cada uma liga habilidades da BNCC Computação (EFxxCO)
e da BNCC Matemática (EFxxMA). Os gabaritos que dependem de conta são calculados aqui, não digitados.
"""
import math
import statistics
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI))
from atividades import (atividade, bloco, caixa_texto, codigo, frases, opcoes, resposta, tabela)  # noqa: E402
from comp import caixa_desenho, marcar  # noqa: E402
import pecas as d  # noqa: E402


def integrada(**k):
    k['area'] = 'matematica'
    return atividade(**k)


def br(x):
    """Número no jeito brasileiro: vírgula decimal, sem zeros sobrando."""
    if isinstance(x, float) and x.is_integer():
        x = int(x)
    if isinstance(x, int):
        return f'{x:,}'.replace(',', '.')
    return f'{x:.2f}'.rstrip('0').rstrip('.').replace('.', ',')


def lista_br(xs, fim=' e '):
    xs = [br(x) if not isinstance(x, str) else x for x in xs]
    return ', '.join(xs[:-1]) + fim + xs[-1] if len(xs) > 1 else xs[0]


# ---------- desenhos ----------

def quadro_100(desc, largura=None):
    cel, m = 9, 1
    s = ''
    for n in range(1, 101):
        c, l = (n - 1) % 10, (n - 1) // 10
        x, y = m + c * cel, m + l * cel
        s += f'<rect x="{x}" y="{y}" width="{cel}" height="{cel}" fill="#fff" stroke="#111" stroke-width=".45"/>'
        s += d.txt(x + cel / 2, y + cel * .66, n, 3.6, peso='500')
    return d.svg(2 * m + 10 * cel, 2 * m + 10 * cel, s, desc, largura)


def palitos(n, desc, largura=None):
    """n quadrados lado a lado feitos de palitos."""
    lado, m = 12, 3
    s = ''
    for i in range(n + 1):
        x = m + i * lado
        s += f'<line x1="{x}" y1="{m}" x2="{x}" y2="{m + lado}" stroke="#111" stroke-width="1.6" stroke-linecap="round"/>'
    for i in range(n):
        x = m + i * lado
        for y in (m, m + lado):
            s += f'<line x1="{x + 1}" y1="{y}" x2="{x + lado - 1}" y2="{y}" stroke="#111" stroke-width="1.6" stroke-linecap="round"/>'
    return d.svg(2 * m + n * lado, 2 * m + lado, s, desc, largura)


def mapa_cidade(pontos, n=10, desc='mapa', largura=None):
    """Plano cartesiano de 0 a n nos dois eixos; as linhas da malha são as ruas. pontos: {rótulo: (x, y, 'casa'|'posto')}."""
    cel, mx, my = 8, 9, 3
    alto = my + n * cel
    s = ''
    for i in range(n + 1):
        s += f'<line x1="{mx + i * cel}" y1="{my}" x2="{mx + i * cel}" y2="{alto}" stroke="#9a9a9a" stroke-width=".4"/>'
        s += f'<line x1="{mx}" y1="{alto - i * cel}" x2="{mx + n * cel}" y2="{alto - i * cel}" stroke="#9a9a9a" stroke-width=".4"/>'
        s += d.txt(mx + i * cel, alto + 5, i, 3.6, peso='500') + d.txt(mx - 3.5, alto - i * cel + 1.3, i, 3.6, peso='500')
    s += (f'<line x1="{mx}" y1="{alto}" x2="{mx + n * cel}" y2="{alto}" stroke="#111" stroke-width=".9"/>'
          f'<line x1="{mx}" y1="{my}" x2="{mx}" y2="{alto}" stroke="#111" stroke-width=".9"/>')
    for rot, (x, y, tipo) in pontos.items():
        px, py = mx + x * cel, alto - y * cel
        if tipo == 'posto':
            s += f'<rect x="{px - 3.4}" y="{py - 3.4}" width="6.8" height="6.8" fill="#fff9c2" stroke="#111" stroke-width=".8"/>'
        else:
            s += f'<circle cx="{px}" cy="{py}" r="3.4" fill="#fff" stroke="#111" stroke-width=".8"/>'
        s += d.txt(px, py + 1.4, rot, 3.6)
    return d.svg(mx + n * cel + 4, alto + 8, s, desc, largura)


# =====================================================================
# 6º ano
# =====================================================================

def primos_ate(n):
    return [k for k in range(2, n + 1) if all(k % p for p in range(2, int(k ** .5) + 1))]


def crivo():
    primos = primos_ate(100)
    desc = ('quadro com os números de 1 a 100, em 10 linhas de 10 números: a linha 1 vai de 1 a 10, a linha 2 de 11 a 20, '
            'e assim até a linha 10, de 91 a 100')
    b0 = caixa_texto('<b>A receita do crivo:</b> 1. Risque o 1, que não é primo. 2. Circule o menor número que ainda não foi riscado nem circulado. '
                     '3. Risque todos os múltiplos dele que vêm depois. 4. Volte ao passo 2 até não sobrar número livre.', 'cinza')
    b1 = bloco(1, 'Siga a receita no quadro. Use uma cor para riscar cada múltiplo: do 2, do 3, do 5 e do 7.',
               quadro_100(desc, largura='84mm'), 'O 2 é o primeiro circulado. Depois risque 4, 6, 8, 10...')
    b2 = bloco(2, 'Pense no que aconteceu.',
               frases(['Quantos números ficaram circulados (primos)?',
                       'Depois do 7, a receita riscou algum número novo? Por quê?']))
    teste = [91, 97, 51]
    b3 = bloco(3, 'Complete a receita que decide se um número n até 100 é primo.',
               '<ol class="receita">'
               '<li>Se n for 1, ele ' + resposta() + ' é primo.</li>'
               '<li>Divida n por 2, 3, 5 e 7. Se alguma divisão der resto ' + resposta() + ' e n não for o próprio divisor, n é composto.</li>'
               '<li>Se nenhuma divisão der esse resto, n é ' + resposta(largura='26mm') + '.</li></ol>')
    b4 = bloco(4, 'Use a sua receita: cada número é primo ou composto?',
               tabela(['Número', 'Divisão que deu exata', 'Primo ou composto?'], [[str(t), '', ''] for t in teste]))

    def veredito(t):
        div = next((p for p in (2, 3, 5, 7) if t % p == 0 and t != p), None)
        return f'{t} = {div} × {t // div}, composto' if div else f'{t}: nenhuma divisão exata, primo'

    return integrada(
        slug='crivo-de-eratostenes-primos', titulo='O crivo de Eratóstenes: um algoritmo para achar primos', ano=6,
        codigos=['EF06CO02', 'EF06CO06', 'EF06MA05', 'EF06MA04'], pilar='algoritmos',
        resumo='Seguindo uma receita de riscar múltiplos, a turma acha todos os primos até 100 e escreve o algoritmo que decide se um número é primo.',
        material='Folha do estudante e lápis de quatro cores. Para a dinâmica, cartões com os números de 2 a 30.',
        passos=['Entregue um cartão com número (de 2 a 30) para cada estudante, todos em pé. Diga: "quem for múltiplo de 2, menos o próprio 2, senta".',
                'Repita com o 3 e com o 5. Quem ficou em pé tem um número primo. Pergunte por que não precisamos testar o 7 com números até 30.',
                'Conte que a receita tem mais de 2 mil anos e é um algoritmo: passos precisos que repetem até acabar. Façam o bloco 1 na folha.',
                'No bloco 3, a turma transforma o que fez em um algoritmo que decide um número de cada vez. É o mesmo tipo de receita que vira programa.'],
        conversa=['Qual dos dois algoritmos é melhor para achar todos os primos até 100? E para saber se um único número é primo?',
                  'Para testar números até 400, até que primo seria preciso dividir? (Pense em 19 × 19 = 361 e 23 × 23 = 529.)'],
        gabarito=[f'Bloco 1: ficam circulados {lista_br(primos)}.',
                  f'Bloco 2: {len(primos)} primos. Depois do 7 nada novo é riscado: todo composto até 100 tem divisor até 7, porque 11 × 11 = 121 já passa de 100.',
                  'Bloco 3: não é primo; resto 0; primo.',
                  'Bloco 4: ' + '; '.join(veredito(t) for t in teste) + '.'],
        estudante=[b0 + b1 + b2, b3 + b4])


TRANSPORTE = 'A O C A B O A V O A C O A B A O C A O A V A O C'.split()
NOMES_TRANSP = {'A': 'A pé', 'O': 'Ônibus', 'C': 'Carro', 'B': 'Bicicleta', 'V': 'Van escolar'}


def pesquisa_turma():
    perguntas = ['Quantos irmãos você tem?', 'Qual é a sua cor favorita?', 'Você tem animal de estimação?',
                 'Qual é a sua altura, em metros?', 'Em que dia você nasceu?']
    tipos = ['Número inteiro', 'Número com vírgula', 'Texto', 'Sim ou não', 'Data']
    colunas = ['Inteiro', 'Com vírgula', 'Texto', 'Sim ou não', 'Data']
    certos = [0, 2, 3, 1, 4]
    b1 = bloco(1, 'Cada pergunta de uma pesquisa gera um tipo de dado. Marque o tipo de cada resposta.',
               '<div class="compacta">' + marcar(perguntas, colunas, exemplo=(0, 0), largura='17mm') + '</div>',
               'O computador guarda cada tipo de um jeito: com número dá para fazer conta, com texto não.')
    b2 = bloco(2, 'A turma respondeu "Como você vem para a escola?". Conte as respostas e complete a tabela.',
               caixa_texto('<b>Respostas:</b> ' + ' · '.join(TRANSPORTE) + '<br>A = a pé · O = ônibus · C = carro · B = bicicleta · V = van escolar') +
               '<div class="compacta">' + tabela(['Transporte', 'Risquinhos', 'Frequência', 'Fração da turma'],
                                                 [[NOMES_TRANSP[k], '', '', ''] for k in 'AOCBV']) + '</div>')
    b3 = bloco(3, 'Leia a tabela.',
               frases(['Quantas pessoas responderam?', 'Qual é o transporte mais usado?',
                       'Que tipo de dado é a resposta "ônibus"? E a frequência?']))
    b4 = bloco(4, 'Faça um gráfico de colunas com a tabela. Não esqueça o título, os nomes dos eixos e a fonte dos dados.',
               caixa_desenho('52mm', 'Gráfico de colunas'))
    cont = {k: TRANSPORTE.count(k) for k in 'AOCBV'}
    total = len(TRANSPORTE)
    linhas_gab = '; '.join(f'{NOMES_TRANSP[k]}: {v} ({v}/{total}{" = " + str(v // math.gcd(v, total)) + "/" + str(total // math.gcd(v, total)) if math.gcd(v, total) > 1 else ""})'
                           for k, v in cont.items())
    mais = max(cont, key=cont.get)
    return integrada(
        slug='pesquisa-da-turma-tipos-de-dados', titulo='Pesquisa da turma: tipos de dados e tabela', ano=6,
        codigos=['EF06CO01', 'EF06MA31', 'EF06MA33'], pilar='abstracao',
        resumo='A turma faz uma pesquisa sem computador, descobre que tipo de dado cada resposta gera e organiza tudo em tabela e gráfico.',
        material='Folha do estudante, régua e lápis de cor. Para a dinâmica, papéis pequenos e uma caixa para as respostas.',
        passos=['Escreva no quadro as cinco perguntas do bloco 1 e pergunte: que tipo de resposta cada uma tem? Dá para somar as respostas? Dá para ordenar?',
                'Mostre que uma planilha ou um programa precisa saber o tipo de dado antes de guardar cada resposta.',
                'Faça a pergunta do transporte com a turma de verdade: cada um escreve a resposta num papel e coloca na caixa. Um grupo conta com risquinhos no quadro.',
                'Comparem com a tabela da folha e façam o gráfico. Se der tempo, a turma cria uma pergunta nova e decide o tipo de dado.'],
        conversa=['Por que "cor favorita" não pode virar média? Que conta faz sentido com esse tipo de dado?',
                  'Se a pergunta fosse "quantos minutos você leva até a escola?", que tipo de dado seria e que gráfico serviria?'],
        gabarito=['Bloco 1: ' + '; '.join(f'"{q}", {tipos[c].lower()}' for q, c in zip(perguntas, certos)) + '.',
                  f'Bloco 2: {linhas_gab}.',
                  f'Bloco 3: {total} pessoas; {NOMES_TRANSP[mais].lower()} ({cont[mais]}); "ônibus" é texto, a frequência é número inteiro.',
                  'Bloco 4: uma coluna por transporte, da altura da frequência, com título, nome dos eixos e fonte (pesquisa da turma, com o ano).'],
        estudante=[b1 + b2, b3 + b4])


# =====================================================================
# 7º ano
# =====================================================================

def euclides(a, b):
    passos = []
    while b:
        passos.append((a, b, a // b, a % b))
        a, b = b, a % b
    return a, passos


def divisores(n):
    return [k for k in range(1, n + 1) if n % k == 0]


def duas_receitas_mdc():
    b0 = caixa_texto('<b>Receita 1, lista de divisores:</b> escreva todos os divisores dos dois números e procure o maior que aparece nas duas listas.<br>'
                     '<b>Receita 2, de Euclides:</b> divida o maior pelo menor. Troque o maior pelo menor e o menor pelo resto. '
                     'Repita até o resto dar 0. O último divisor usado é o MDC.', 'cinza')
    b1 = bloco(1, 'Use a receita 1 para achar o MDC de 24 e 36.',
               frases(['Divisores de 24:', 'Divisores de 36:', 'MDC(24, 36) =']))
    mdc1, p1 = euclides(84, 36)
    mdc2, p2 = euclides(270, 192)
    lin = [[str(p1[0][0]), str(p1[0][1]), str(p1[0][2]), str(p1[0][3])]] + [['', '', '', ''] for _ in range(len(p1) - 1)]
    b2 = bloco(2, 'Use a receita 2. A primeira linha já está feita.',
               '<div class="lado-a-lado"><div><p class="txt"><b>MDC(84, 36)</b></p>' + tabela(['Maior', 'Menor', 'Quociente', 'Resto'], lin) +
               '</div><div><p class="txt"><b>MDC(270, 192)</b></p>' + tabela(['Maior', 'Menor', 'Quociente', 'Resto'], [['', '', '', ''] for _ in p2]) + '</div></div>')
    b3 = bloco(3, 'Caça ao erro. Um colega escreveu a receita 2 assim e o resultado saiu errado. Circule o passo com erro e corrija.',
               '<ol class="receita"><li>Divida o maior número pelo menor.</li>'
               '<li>Troque o maior pelo menor e o menor pelo quociente.</li>'
               '<li>Repita até o resto dar 0.</li></ol>' + frases(['Correção:']))
    b4 = bloco(4, 'Duas fitas, uma de 84 cm e outra de 36 cm, vão ser cortadas em pedaços iguais, do maior tamanho possível, sem sobrar fita.',
               frases(['Tamanho de cada pedaço:', 'Quantos pedaços no total:', 'Qual receita você usou e por quê?']))
    return integrada(
        slug='duas-receitas-para-o-mdc', titulo='Duas receitas para o MDC', ano=7,
        codigos=['EF07CO02', 'EF07CO05', 'EF07MA05', 'EF07MA01'], pilar='algoritmos',
        resumo='A turma resolve o mesmo problema com dois algoritmos diferentes, compara o trabalho de cada um e caça o erro numa receita.',
        material='Folha do estudante. Para a dinâmica, duas tiras de papel (84 cm e 36 cm, ou 42 cm e 18 cm, na metade) e tesoura.',
        passos=['Mostre as duas tiras e proponha o problema do bloco 4: qual é o maior pedaço igual que serve para cortar as duas sem sobrar?',
                'Metade da turma resolve com a receita 1 (lista de divisores) e a outra metade com a receita 2 (Euclides). Cronometre.',
                'Comparem: as duas chegam ao mesmo número? Qual teve mais contas? Com números grandes, como 270 e 192, a diferença aparece.',
                'Leia a receita com erro do bloco 3 em voz alta. A turma segue os passos com 84 e 36 até ver onde o resultado sai errado.'],
        conversa=['Por que dizemos que as duas receitas são algoritmos, mesmo sendo diferentes?',
                  'Como você testaria se uma receita está certa antes de confiar nela? (Teste com números de resposta conhecida.)'],
        gabarito=[f'Bloco 1: divisores de 24: {lista_br(divisores(24))}; divisores de 36: {lista_br(divisores(36))}; MDC = 12.',
                  'Bloco 2, MDC(84, 36): ' + '; '.join(f'{a} ÷ {b} dá {q}, resto {r}' for a, b, q, r in p1) + f'; MDC = {mdc1}.',
                  'Bloco 2, MDC(270, 192): ' + '; '.join(f'{a} ÷ {b} dá {q}, resto {r}' for a, b, q, r in p2) + f'; MDC = {mdc2}, em {len(p2)} divisões.',
                  'Bloco 3: o erro está no passo 2. O menor tem de ser trocado pelo resto, não pelo quociente.',
                  f'Bloco 4: pedaços de {mdc1} cm; {84 // mdc1} + {36 // mdc1} = {84 // mdc1 + 36 // mdc1} pedaços. Qualquer receita serve; a de Euclides tem menos contas.'],
        estudante=[b0 + b1 + b2, b3 + b4])


NOTAS = [7, 5, 9, 6, 8]


def teste_de_mesa_media():
    prog = codigo(f'''notas ← [{", ".join(map(str, NOTAS))}]
soma ← 0
para cada nota em notas:
    soma ← soma + nota
media ← soma / {len(NOTAS)}
mostre media''')
    somas, s = [], 0
    for n in NOTAS:
        s += n
        somas.append(s)
    lin = [['1', str(NOTAS[0]), str(somas[0])]] + [[str(i + 1), '', ''] for i in range(1, len(NOTAS))]
    b0 = caixa_texto('<b>Teste de mesa</b> é executar um programa no papel, linha por linha, anotando o valor de cada variável. '
                     'A seta ← quer dizer "guarde na caixinha": <b>soma ← soma + nota</b> pega o valor da soma, junta a nota e guarda de novo na soma.', 'cinza')
    b1 = bloco(1, 'Faça o teste de mesa deste programa.',
               '<div class="lado-a-lado" style="--cols:1fr 62mm">' + prog + '<div class="compacta">' +
               tabela(['Volta', 'nota', 'soma'], lin) + '</div></div>', 'A primeira volta já está feita.')
    b2 = bloco(2, 'Agora responda.', frases(['O programa mostra:', 'Se a nota 5 virar 10, o programa mostra:']))
    b3 = bloco(3, 'Caça ao erro. Neste programa, a linha soma ← 0 foi parar dentro da repetição. O que ele mostra? Por quê?',
               codigo(f'''notas ← [{", ".join(map(str, NOTAS))}]
para cada nota em notas:
    soma ← 0
    soma ← soma + nota
media ← soma / {len(NOTAS)}
mostre media''') + frases(['Mostra:', 'Por quê?']))
    b4 = bloco(4, 'Variável ou incógnita? Circule.',
               '<div class="compacta">' + tabela(['Situação', 'A letra é'], [
                   ['Na equação x + 3 = 10, o x é', opcoes(['variável', 'incógnita'])],
                   ['No programa, a soma é', opcoes(['variável', 'incógnita'])],
                   ['Na regra "preço = 4 × n", com n pães, o n é', opcoes(['variável', 'incógnita'])]]) + '</div>')
    media = sum(NOTAS) / len(NOTAS)
    nova = (sum(NOTAS) - 5 + 10) / len(NOTAS)
    return integrada(
        slug='teste-de-mesa-media-da-turma', titulo='Teste de mesa: a média das notas', ano=7,
        codigos=['EF07CO01', 'EF07CO02', 'EF07MA13', 'EF07MA35'], pilar='abstracao',
        resumo='Executando um programa no papel, a turma calcula uma média, entende o que é uma variável e acha o erro de um programa.',
        material='Folha do estudante. Para a dinâmica, um envelope com a etiqueta "soma", cartões com as cinco notas e um cartão em branco.',
        passos=['Escolha um estudante para ser a variável soma: ele segura o envelope com um cartão escrito 0.',
                'Outro estudante entrega as notas uma de cada vez. A cada nota, a "soma" apaga o valor do cartão, escreve o novo e mostra para a turma.',
                'No fim, a turma divide a soma pelo número de notas e acha a média. Mostre o programa da folha: foi exatamente isso que fizemos.',
                'No bloco 3, repita a dinâmica com a "soma" zerando o cartão a cada nota. A turma vê o erro acontecendo antes de explicar.'],
        conversa=['Por que o computador precisa de uma caixinha (variável) para guardar a soma enquanto lê as notas?',
                  'A média 7 quer dizer que alguém tirou 7? O que a média diz e o que ela esconde?'],
        gabarito=['Bloco 1: ' + '; '.join(f'volta {i + 1}: nota {n}, soma {s}' for i, (n, s) in enumerate(zip(NOTAS, somas))) + '.',
                  f'Bloco 2: {br(media)}; com a nota 10 no lugar do 5, mostra {br(nova)}.',
                  f'Bloco 3: mostra {br(NOTAS[-1] / len(NOTAS))}, porque a soma volta a 0 em cada volta e no fim guarda só a última nota ({NOTAS[-1]}); {NOTAS[-1]} ÷ {len(NOTAS)} = {br(NOTAS[-1] / len(NOTAS))}.',
                  'Bloco 4: incógnita (tem um único valor que resolve, 7); variável (muda a cada volta); variável (pode ser qualquer número de pães).'],
        estudante=[b0 + b1 + b2, b3 + b4])


# =====================================================================
# 8º ano
# =====================================================================

def sequencia_palitos():
    figs = ''.join(f'<div class="item"><div class="desenho">{palitos(n, f"figura {n}: {n} {"quadrado feito" if n == 1 else "quadrados feitos"} de palitos, lado a lado, dividindo os palitos do meio", largura=f"{10 + n * 9}mm")}</div><p class="txt centro">Figura {n}</p></div>'
                   for n in (1, 2, 3))
    b1 = bloco(1, 'Conte os palitos de cada figura e continue a tabela.',
               f'<div class="grade" style="--colunas:3">{figs}</div><div class="compacta">' +
               tabela(['Figura', '1', '2', '3', '4', '5', '6', '10'], [['Palitos', '4', '', '', '', '', '', '']]) + '</div>')
    b2 = bloco(2, 'Receita 1, recursiva: cada figura usa a anterior.',
               '<ol class="receita"><li>A figura 1 tem ' + resposta() + ' palitos.</li>'
               '<li>Para fazer a próxima figura, pegue a anterior e some ' + resposta() + ' palitos.</li></ol>' +
               frases(['Para saber a figura 50 com esta receita, quantas contas eu faço?']))
    b3 = bloco(3, 'Receita 2, direta: vai do número da figura (n) até os palitos, sem passar pelas outras.',
               frases(['Palitos da figura n =', 'Figura 50 =', 'Teste a sua fórmula na figura 3:']))
    b4 = bloco(4, 'Outra sequência: 1, 3, 6, 10, 15... (pontos arrumados em triângulo).',
               frases(['Os dois próximos números:', 'Ela é recursiva? Qual é a regra?', 'Por que esta é mais difícil de escrever numa receita direta?']))
    tab = [3 * n + 1 for n in (1, 2, 3, 4, 5, 6, 10)]
    return integrada(
        slug='sequencia-de-palitos-recursao', titulo='Sequência de palitos: duas receitas', ano=8,
        codigos=['EF08CO01', 'EF08MA10', 'EF08MA11'], pilar='padroes',
        resumo='Montando quadrados com palitos, a turma descreve a mesma sequência de dois jeitos: pela figura anterior (recursão) e por uma fórmula direta.',
        material='Palitos de sorvete ou de fósforo usados (cerca de 30 por grupo) e a folha do estudante.',
        passos=['Monte no quadro (ou com palitos na mesa) as figuras 1, 2 e 3. Os grupos montam a figura 4 e contam os palitos.',
                'Pergunte: como eu faço a próxima figura? A turma chega na receita "a anterior mais 3". Isso é uma receita recursiva: precisa da figura anterior.',
                'Desafie: quantos palitos tem a figura 50? Com a receita recursiva, são 49 somas. Peça que procurem um atalho que use só o número da figura.',
                'Escreva as duas receitas no quadro, lado a lado. Mostre que os programas também podem resolver de um jeito ou de outro.'],
        conversa=['As duas receitas dão o mesmo resultado. Em que situação cada uma é mais útil?',
                  'Onde mais aparece uma regra recursiva? (Juntar a anterior: poupança que rende, bactérias que dobram, pastas dentro de pastas.)'],
        gabarito=['Bloco 1: ' + ', '.join(map(str, tab[:6])) + f'; figura 10 = {tab[6]} palitos.',
                  'Bloco 2: 4 palitos; some 3. Para a figura 50 são 49 somas.',
                  f'Bloco 3: 3 × n + 1; figura 50 = {3 * 50 + 1}; figura 3 = 3 × 3 + 1 = 10, igual à contagem.',
                  'Bloco 4: 21 e 28. É recursiva: cada número é o anterior mais a posição dele (+2, +3, +4...). A soma cresce a cada passo, então não é só multiplicar e somar sempre o mesmo número '
                  '(a fórmula direta existe, n × (n + 1) ÷ 2, mas é mais difícil de descobrir).'],
        estudante=b1 + b2 + b3 + b4)


URNAS = {'Grupo 1': [10, 15, 15, 20, 40], 'Grupo 2': [5, 10, 10, 25], 'Grupo 3': [10, 20, 30, 30, 30, 60]}


def apuracao_distribuida():
    b0 = caixa_texto('<b>A pesquisa:</b> quantos minutos cada estudante leva de casa até a escola. As respostas ficaram em três urnas, '
                     'e cada grupo apura só a sua, ao mesmo tempo. Depois, a central junta tudo.', 'cinza')
    lin = [[g, ', '.join(map(str, v)), '', '', '', ''] for g, v in URNAS.items()]
    b1 = bloco(1, 'Cada grupo apura a sua urna. Complete a tabela.',
               '<div class="compacta">' + tabela(['Urna', 'Respostas (minutos)', 'Quantidade', 'Soma', 'Média', 'Mediana'], lin) + '</div>',
               'Mediana: coloque em ordem e pegue o do meio. Se forem dois no meio, faça a média dos dois.')
    b2 = bloco(2, 'A central só recebe o que os grupos mandam. Calcule a média de toda a turma de dois jeitos.',
               frases(['Jeito A, média das três médias:', 'Jeito B, soma de todas as somas ÷ total de estudantes:', 'Qual está certo? Por quê?']))
    b3 = bloco(3, 'Agora a mediana da turma.',
               frases(['Mediana das três medianas:', 'Mediana de verdade (todas as 15 respostas em ordem):',
                       'Para calcular a mediana certa, o que os grupos precisam mandar para a central?']))
    b4 = bloco(4, 'Qual é a moda da turma (o tempo que mais aparece)? A moda de cada grupo ajuda a achar?', frases(['Moda da turma:', 'Explique:']))
    todos = sorted(x for v in URNAS.values() for x in v)
    medias = {g: sum(v) / len(v) for g, v in URNAS.items()}
    medianas = {g: statistics.median(v) for g, v in URNAS.items()}
    modas = {g: statistics.mode(v) for g, v in URNAS.items()}
    media_medias = sum(medias.values()) / len(medias)
    total, soma = len(todos), sum(todos)
    moda = statistics.mode(todos)
    assert abs(media_medias - soma / total) > .5 and statistics.median(list(medianas.values())) != statistics.median(todos)
    return integrada(
        slug='apuracao-distribuida-media-mediana', titulo='Apuração em paralelo: média, moda e mediana', ano=8,
        codigos=['EF08CO05', 'EF08CO02', 'EF08MA25'], pilar='decomposicao',
        resumo='Três grupos apuram partes de uma pesquisa ao mesmo tempo e descobrem que só algumas contas podem ser juntadas depois, como num sistema distribuído.',
        material='Folha do estudante. Para a dinâmica, três envelopes (urnas) com as respostas escritas em papeizinhos, uma por papel.',
        passos=['Divida a turma em três grupos e entregue uma urna para cada um. Cada grupo é um computador: apura só a sua parte, ao mesmo tempo que os outros.',
                'Um estudante é a central: não vê os papeizinhos, só o bilhete que cada grupo manda.',
                'Primeiro, os grupos mandam só a média. A central tira a média das médias. Depois, conte tudo junto no quadro e compare: não bate.',
                'Discuta o que cada grupo deveria mandar para a central acertar (soma e quantidade). Apurações de eleição funcionam assim.'],
        conversa=['Por que a média das médias erra com grupos de tamanhos diferentes?',
                  'Dividir o trabalho deixou a apuração mais rápida. O que se perde quando cada grupo manda só um número?'],
        gabarito=['Bloco 1: ' + '; '.join(f'{g}: {len(v)} respostas, soma {sum(v)}, média {br(medias[g])}, mediana {br(medianas[g])}' for g, v in URNAS.items()) + '.',
                  f'Bloco 2: jeito A dá {br(round(media_medias, 2))} (cerca de); jeito B dá {soma} ÷ {total} = {br(soma / total)}. O B está certo: a média das médias dá o mesmo peso a um grupo de 4 e a um de 6.',
                  f'Bloco 3: mediana das medianas = {br(statistics.median(list(medianas.values())))}; mediana de verdade = {br(statistics.median(todos))} '
                  f'(a 8ª de {lista_br(todos)}). Os grupos precisam mandar todas as respostas, ou quantas vezes apareceu cada tempo.',
                  f'Bloco 4: moda da turma = {moda} minutos (aparece {todos.count(moda)} vezes). As modas dos grupos ({lista_br([modas[g] for g in URNAS])}) '
                  f'não bastam: cada grupo precisa mandar a contagem de cada tempo.'],
        estudante=[b0 + b1 + b2, b3 + b4])


# =====================================================================
# 9º ano
# =====================================================================

CASAS = {'A': (2, 3), 'B': (6, 1)}
POSTOS = {'P1': (5, 7), 'P2': (8, 3), 'P3': (1, 9)}


def dist_reta(p, q):
    return math.hypot(p[0] - q[0], p[1] - q[1])


def dist_ruas(p, q):
    return abs(p[0] - q[0]) + abs(p[1] - q[1])


def mais_perto():
    pts = {k: (*v, 'casa') for k, v in CASAS.items()} | {k: (*v, 'posto') for k, v in POSTOS.items()}
    desc = ('mapa da cidade num plano cartesiano com os eixos x e y de 0 a 10; as linhas da malha são as ruas. Casas (círculos): '
            + ', '.join(f'{k} no ponto ({x}, {y})' for k, (x, y) in CASAS.items()) + '. Postos de saúde (quadrados): '
            + ', '.join(f'{k} no ponto ({x}, {y})' for k, (x, y) in POSTOS.items()))
    b0 = caixa_texto('<b>Duas distâncias:</b> em linha reta (como um drone voa), use o teorema de Pitágoras. '
                     'Pelas ruas (como a ambulância anda), some quantas quadras anda na horizontal com quantas anda na vertical.', 'cinza')
    a = CASAS['A']
    lin = [[k, f'{abs(a[0] - x)} e {abs(a[1] - y)}', '', ''] for k, (x, y) in POSTOS.items()]
    lin[0][2], lin[0][3] = f'√({abs(a[0]-5)}² + {abs(a[1]-7)}²) = {br(dist_reta(a, POSTOS["P1"]))}', str(dist_ruas(a, POSTOS['P1']))
    b1 = bloco(1, 'Encontre no mapa a casa A e os três postos de saúde.',
               '<div class="lado-a-lado" style="--cols:76mm 1fr">' + mapa_cidade(pts, desc=desc, largura='76mm') +
               '<div><p class="txt"><b>Distâncias da casa A (em quadras)</b></p><div class="compacta">' +
               tabela(['Posto', 'Anda em x e em y', 'Em linha reta', 'Pelas ruas'], lin) + '</div></div></div>',
               'O P1 já está feito. Se a raiz não for exata, use a calculadora ou estime com uma casa depois da vírgula.')
    b2 = bloco(2, 'Qual posto é o mais perto da casa A?', frases(['Em linha reta:', 'Pelas ruas:', 'Para a ambulância, qual resposta vale?']))
    b3 = bloco(3, 'Complete o algoritmo do "vizinho mais próximo", que um aplicativo de mapa usa.',
               '<ol class="receita"><li>Para cada posto, calcule a ' + resposta(largura='30mm') + ' até a casa.</li>'
               '<li>Guarde o posto com a ' + resposta(largura='30mm') + ' distância.</li>'
               '<li>Mostre esse posto para a pessoa.</li></ol>' + frases(['Use o algoritmo para a casa B, pelas ruas. Posto escolhido:']))
    b4 = bloco(4, 'A prefeitura quer pôr um ponto de ônibus exatamente no meio do caminho entre a casa A e o posto P1.',
               frases(['Coordenadas do ponto médio:', 'Ele fica numa esquina do mapa? Explique:']))
    pa = {k: (dist_reta(a, p), dist_ruas(a, p)) for k, p in POSTOS.items()}
    reta_a = min(pa, key=lambda k: pa[k][0])
    ruas_a = min(pa, key=lambda k: pa[k][1])
    b = CASAS['B']
    pb = {k: dist_ruas(b, p) for k, p in POSTOS.items()}
    ruas_b = min(pb, key=pb.get)
    assert reta_a != ruas_a
    pm = ((a[0] + POSTOS['P1'][0]) / 2, (a[1] + POSTOS['P1'][1]) / 2)
    return integrada(
        slug='mais-perto-distancias-no-mapa', titulo='Mais perto de quem? Distâncias no mapa', ano=9,
        codigos=['EF09CO06', 'EF09MA16', 'EF09MA14'], pilar='abstracao',
        resumo='Num mapa feito de plano cartesiano, a turma compara distância em linha reta e pelas ruas e segue o algoritmo que escolhe o posto de saúde mais perto.',
        material='Folha do estudante, régua e calculadora (opcional). Para a dinâmica, giz ou fita crepe para desenhar uma malha no pátio.',
        passos=['Desenhe uma malha no pátio (ou use o piso quadriculado). Marque uma casa e dois postos com cartazes.',
                'Um estudante é o drone e anda em linha reta até cada posto; outro é a ambulância e só anda pelas linhas. A turma conta os passos.',
                'Na folha, a turma calcula as duas distâncias: Pitágoras para a linha reta e a soma das quadras para as ruas.',
                'Mostre que aplicativos de mapa fazem isso: transformam a cidade em pontos e distâncias e seguem um algoritmo.'],
        conversa=['Por que a resposta muda conforme o jeito de medir? Que distância um aplicativo de transporte deveria usar?',
                  'Que problema do nosso bairro poderia ser resolvido com este algoritmo (posto, escola, ponto de coleta de lixo)?'],
        gabarito=['Bloco 1: ' + '; '.join(f'{k}: anda {abs(a[0] - p[0])} e {abs(a[1] - p[1])}, em linha reta {br(round(pa[k][0], 1))}, pelas ruas {pa[k][1]}'
                                          for k, p in POSTOS.items()) + ' (quadras).',
                  f'Bloco 2: em linha reta, {reta_a}; pelas ruas, {ruas_a}. Para a ambulância vale pelas ruas.',
                  f'Bloco 3: distância; menor. Casa B pelas ruas: ' + ', '.join(f'{k} = {v}' for k, v in pb.items()) + f'; escolhe {ruas_b}.',
                  f'Bloco 4: ({br(pm[0])}; {br(pm[1])}), a média dos x e a média dos y. Não fica numa esquina: {br(pm[0])} não é inteiro.'],
        estudante=[b0 + b1 + b2, b3 + b4])


def poligonos_tartaruga():
    quad = codigo('''repita 4 vezes:
    avance 4 cm
    gire 90° à direita''')
    lados = [3, 4, 5, 6, 8, 10]
    b0 = caixa_texto('<b>A tartaruga</b> só entende dois comandos: <b>avance</b> (anda reto, deixando um traço) e <b>gire</b> (vira no lugar). '
                     'Para desenhar no papel, use a régua para avançar e o transferidor para girar.', 'cinza')
    b1 = bloco(1, 'Execute o programa e desenhe. Comece no canto de baixo à esquerda do quadro, virado para a direita.',
               '<div class="lado-a-lado" style="--cols:70mm 1fr">' + quad + caixa_desenho('70mm', 'Desenho') + '</div>')
    b2 = bloco(2, 'Para fechar um polígono regular, a tartaruga gira 360° no total. Complete.',
               '<div class="compacta">' + tabela(['Lados (n)'] + [str(n) for n in lados],
                                                 [['Giro em cada canto', '120°'] + [''] * (len(lados) - 1),
                                                  ['Ângulo interno', '60°'] + [''] * (len(lados) - 1)]) + '</div>' +
               frases(['A regra do giro, para n lados:']))
    b3 = bloco(3, 'Escreva o programa de um hexágono regular com lados de 3 cm.', caixa_desenho('34mm', 'Programa') + caixa_desenho('62mm', 'Desenho do hexágono'))
    b4 = bloco(4, 'Caça ao erro. Os dois programas deviam desenhar um hexágono. O que sai e como corrigir?',
               '<div class="lado-a-lado">' + codigo('''repita 5 vezes:
    avance 3 cm
    gire 60°''') + codigo('''repita 6 vezes:
    avance 3 cm
    gire 72°''') + '</div>' + frases(['Primeiro:', 'Segundo:']))
    giro = {n: 360 / n for n in lados}
    return integrada(
        slug='poligonos-com-passos-de-tartaruga', titulo='Polígonos com passos de tartaruga', ano=9,
        codigos=['EF09CO02', 'EF09MA15', 'EF09MA06'], pilar='algoritmos',
        resumo='Com régua, transferidor e só dois comandos, a turma escreve e executa programas que desenham polígonos regulares e descobre a regra do giro.',
        material='Folha do estudante, régua e transferidor. Para a dinâmica, giz no pátio ou fita crepe no chão da sala.',
        passos=['No pátio, um estudante é a tartaruga. A turma dita: "avance 3 passos, gire 90° para a direita", quatro vezes. Ele volta ao ponto de partida?',
                'Peça um triângulo com lados iguais. A turma costuma dizer "gire 60°" e a figura não fecha. Deixe testar até chegar em 120°.',
                'Na folha, cada estudante executa o programa do quadrado com régua e transferidor e completa a tabela dos giros.',
                'Mostre que a regra 360 ÷ n é uma função: para cada número de lados existe um único giro. Ligue com o ângulo interno: 180° menos o giro.'],
        conversa=['Por que o giro da tartaruga não é o ângulo interno do polígono?',
                  'O que acontece com o desenho quando o número de lados fica muito grande, como 360?'],
        gabarito=['Bloco 1: um quadrado com lados de 4 cm.',
                  'Bloco 2: ' + '; '.join(f'{n} lados: giro {br(giro[n])}°, interno {br(180 - giro[n])}°' for n in lados) + '. Regra: giro = 360° ÷ n.',
                  'Bloco 3: repita 6 vezes: avance 3 cm, gire 60°.',
                  'Bloco 4: o primeiro desenha só 5 lados e o hexágono fica aberto; corrija para repita 6 vezes. O segundo gira 72° (giro do pentágono) '
                  'e a figura não fecha depois de 6 lados; corrija para gire 60°.'],
        estudante=[b0 + b1 + b2, b3 + b4])


INTEGRADAS = [crivo, pesquisa_turma, duas_receitas_mdc, teste_de_mesa_media,
              sequencia_palitos, apuracao_distribuida, mais_perto, poligonos_tartaruga]
