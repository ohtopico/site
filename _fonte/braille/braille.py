"""Braille grau 1 em português (Grafia Braille para a Língua Portuguesa) com os sinais básicos do
Código Matemático Unificado (CMU), e saída em .brf (Braille ASCII, 40 celas por linha, 25 linhas por página).

Cobre o que aparece nas fichas do ensino fundamental: letras com acento, maiúsculas, números com vírgula
decimal e ponto separador de classes, frações simples, operações (+ - × ÷ :), =, >, <, %, R$ e pontuação.
O que o código não tem certeza de representar (ordinais, grau) vira palavra antes de traduzir, em texto_braille().
"""
import re

# pontos -> caractere Unicode (U+2800 + bits)
def cela(pontos):
    return chr(0x2800 + sum(1 << (int(p) - 1) for p in str(pontos)))


LETRAS = {
    'a': 1, 'b': 12, 'c': 14, 'd': 145, 'e': 15, 'f': 124, 'g': 1245, 'h': 125, 'i': 24, 'j': 245,
    'k': 13, 'l': 123, 'm': 134, 'n': 1345, 'o': 135, 'p': 1234, 'q': 12345, 'r': 1235, 's': 234, 't': 2345,
    'u': 136, 'v': 1236, 'w': 2456, 'x': 1346, 'y': 13456, 'z': 1356,
    'á': 12356, 'à': 1246, 'â': 16, 'ã': 345, 'é': 123456, 'ê': 126, 'è': 2346, 'í': 34, 'ó': 346, 'ô': 1456,
    'õ': 246, 'ú': 23456, 'ü': 1256, 'ç': 12346,
}
LETRAS = {k: cela(v) for k, v in LETRAS.items()}
DIGITOS = {d: LETRAS[l] for d, l in zip('1234567890', 'abcdefghij')}
# algarismos na parte inferior da cela (denominador das frações ordinárias)
DIGITOS_BAIXO = {d: cela(p) for d, p in zip('1234567890', (2, 23, 25, 256, 26, 235, 2356, 236, 35, 356))}

NUMERO = cela(3456)
MAIUSCULA = cela(46)
PREFIXO_MINUSCULA = cela(5)          # letra de a a j logo depois de um número
VIRGULA_DECIMAL = cela(2)
SEPARADOR_CLASSES = cela(3)
ESPACO = '\u2800'
DESCONHECIDOS = {}  # símbolos que ficaram de fora (o gerar.py avisa)

PONTUACAO = {
    ',': cela(2), ';': cela(23), ':': cela(25), '.': cela(3), '?': cela(26), '!': cela(235),
    '-': cela(36), '–': cela(36), '−': cela(36), '(': cela(126) + cela(3), ')': cela(6) + cela(345),
    '/': cela(6) + cela(2), '—': cela(36) * 2, '[': cela(12356), ']': cela(23456), '$': cela(56), '*': cela(35), '…': cela(3) * 3, "'": cela(3), '’': cela(3),
}
MATEMATICA = {  # sinais do CMU; vão sempre entre espaços nas fichas
    '+': cela(235), '-': cela(36), '–': cela(36), '−': cela(36), '×': cela(236), '÷': cela(256),
    '=': cela(2356), '>': cela(135), '<': cela(246), ':': cela(25), '≠': cela(45) + cela(2356),
    '≥': cela(135) + cela(2356), '≤': cela(246) + cela(2356),
}
ASPAS_ABRE, ASPAS_FECHA = cela(236), cela(356)
POR_CENTO = cela(456) + cela(356)
REAL = MAIUSCULA + LETRAS['r'] + cela(56)

ORDINAIS = {1: 'primeiro', 2: 'segundo', 3: 'terceiro', 4: 'quarto', 5: 'quinto', 6: 'sexto', 7: 'sétimo',
            8: 'oitavo', 9: 'nono', 10: 'décimo', 11: 'décimo primeiro', 12: 'décimo segundo', 13: 'décimo terceiro',
            14: 'décimo quarto', 15: 'décimo quinto', 16: 'décimo sexto', 17: 'décimo sétimo', 18: 'décimo oitavo',
            19: 'décimo nono', 20: 'vigésimo'}


# símbolos sem sinal braille seguro nas fichas: viram palavras
PALAVRAS = {
    '√': ' raiz quadrada de ', '∛': ' raiz cúbica de ', '≈': ' aproximadamente ',
    '↑': ' seta para cima ', '↓': ' seta para baixo ', '↶': ' seta curva para a esquerda ', '↷': ' seta curva para a direita ',
    '←': ' recebe ', '→': ' seta para a direita ',
    '●': ' círculo preto ', '▲': ' triângulo preto ', '■': ' quadrado preto ', '□': ' quadrado vazio ', '○': ' círculo ',
    '△': ' triângulo ', '★': ' estrela ', '•': ', ', '#': ' cerquilha ', '_': ' sublinhado ',
}


def _ordinal(m):
    n, marca = int(m.group(1)), m.group(2)
    if n not in ORDINAIS:
        return m.group(0)
    p = ORDINAIS[n]
    return p[:-1] + 'a' if marca in 'ªa' else p


def preparar(t):
    """Normaliza o texto em tinta antes de traduzir."""
    t = t.replace(' ', ' ').replace(' ', ' ')
    t = re.sub(r'(\d+)\s*([ºª])', _ordinal, t)
    t = re.sub(r'(\d)\s*°', r'\1 graus', t)
    t = t.replace('°', ' graus')
    t = re.sub(r'_{2,}', ' ( ) ', t)
    t = re.sub(r'\|+', lambda m: f' {len(m.group(0))} risquinho{"s" if len(m.group(0)) > 1 else ""} ', t)
    for simbolo, palavra in PALAVRAS.items():
        t = t.replace(simbolo, palavra)
    t = t.replace(' · ', ', ').replace('·', ',')
    t = t.replace('“', '"').replace('”', '"')
    t = re.sub(r'[ \t\r\n]+', ' ', t)
    return t.strip()


def texto_braille(t):
    """Texto em tinta -> braille Unicode."""
    t = preparar(t)
    out = []
    i, n = 0, len(t)
    aspas_abertas = False

    def anterior():
        return t[i - 1] if i > 0 else ' '

    while i < n:
        c = t[i]
        # números (com vírgula decimal, separador de classes e frações a/b)
        if c in '²³¹':
            out.append(cela(16) + NUMERO + DIGITOS[{'²': '2', '³': '3', '¹': '1'}[c]])
            i += 1
            continue
        if c == '^':
            out.append(cela(16))
            i += 1
            continue
        if c in '0123456789':
            m = re.match(r'(\d+)/(\d+)(?![\d,])', t[i:])
            if m and not (i > 0 and (t[i - 1] in '0123456789' or t[i - 1] == '/')):
                out.append(NUMERO + ''.join(DIGITOS[d] for d in m.group(1)) + ''.join(DIGITOS_BAIXO[d] for d in m.group(2)))
                i += len(m.group(0))
                continue
            m = re.match(r'\d{1,3}(?:[ .]\d{3})+(?:,\d+)?(?!\d)|\d+(?:,\d+)?', t[i:])
            num = m.group(0)
            s = NUMERO
            for ch in num:
                s += DIGITOS[ch] if ch.isdigit() else VIRGULA_DECIMAL if ch == ',' else SEPARADOR_CLASSES
            out.append(s)
            i += len(num)
            if i < n and t[i] in 'abcdefghij':
                out.append(PREFIXO_MINUSCULA)
            continue
        if t.startswith('R$', i):
            out.append(REAL)
            i += 2
            continue
        if c == '%':
            out.append(POR_CENTO)
        elif c == ' ':
            out.append(ESPACO)
        elif c == '"':
            out.append(ASPAS_FECHA if aspas_abertas else ASPAS_ABRE)
            aspas_abertas = not aspas_abertas
        elif c.isalpha():
            m = re.match(r'[^\W\d_]+', t[i:])
            palavra = m.group(0)
            if len(palavra) > 1 and palavra.isupper():
                out.append(MAIUSCULA * 2 + ''.join(LETRAS.get(ch.lower(), '') for ch in palavra))
            else:
                out.append(''.join((MAIUSCULA if ch.isupper() else '') + LETRAS.get(ch.lower(), '') for ch in palavra))
            i += len(palavra)
            continue
        elif c in MATEMATICA and (anterior() == ' ' or c in '×÷=<>≠≥≤+') and c not in '-' or (
                c in '-–−' and anterior() == ' ' and i + 1 < n and (t[i + 1] == ' ' or t[i + 1].isdigit())):
            out.append(MATEMATICA[c])
        elif c in PONTUACAO:
            out.append(PONTUACAO[c])
        elif c == ' ':
            out.append(ESPACO)
        else:
            DESCONHECIDOS[c] = DESCONHECIDOS.get(c, 0) + 1  # símbolo sem equivalente: fica de fora
        i += 1
    return ''.join(out)


# ---------- página braille ----------

ASCII_BRF = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)="
CELAS, LINHAS = 40, 25


def para_brf(s):
    return ''.join(ASCII_BRF[ord(c) - 0x2800] if '⠀' <= c <= '⠿' else ' ' for c in s)


def quebrar(braille, recuo=0, deslocamento=0, largura=CELAS):
    """Quebra um parágrafo em linhas de até `largura` celas.
    recuo: celas em branco na primeira linha; deslocamento: celas em branco nas linhas seguintes."""
    palavras = [p for p in braille.split(ESPACO) if p]
    linhas, atual = [], ESPACO * recuo
    margem = ESPACO * deslocamento
    for p in palavras:
        while len(p) > largura - deslocamento:  # palavra maior que a linha: quebra com hífen
            corte = largura - len(atual) - 1 if len(atual.strip(ESPACO)) else largura - deslocamento - 1
            if corte < 2:
                linhas.append(atual)
                atual = margem
                continue
            linhas.append(atual + (ESPACO if atual.strip(ESPACO) else '') + p[:corte] + cela(36))
            p, atual = p[corte:], margem
        sep = ESPACO if atual.strip(ESPACO) else ''
        if len(atual) + len(sep) + len(p) > largura:
            linhas.append(atual)
            atual = margem + p
        else:
            atual += sep + p
    if atual.strip(ESPACO):
        linhas.append(atual)
    return linhas


def centralizar(braille, largura=CELAS):
    return [ESPACO * max(0, (largura - len(l)) // 2) + l for l in quebrar(braille, largura=largura)]


class Documento:
    """Monta páginas braille: linha 1 com o número da página à direita, texto nas linhas 2 a 25."""

    def __init__(self, titulo_curto=''):
        self.paginas = [[]]
        self.titulo_curto = titulo_curto

    def _cabe(self, k):
        return len(self.paginas[-1]) + k <= LINHAS - 1

    def nova_pagina(self):
        if self.paginas[-1]:
            self.paginas.append([])

    def linhas(self, ls, juntas=False):
        if juntas and not self._cabe(len(ls)) and len(ls) < LINHAS - 1:
            self.nova_pagina()
        for l in ls:
            if not self._cabe(1):
                self.nova_pagina()
            self.paginas[-1].append(l)

    def branco(self):
        if self.paginas[-1] and self.paginas[-1][-1] != '' and self._cabe(1):
            self.paginas[-1].append('')

    def titulo(self, t):
        self.linhas(centralizar(texto_braille(t)), juntas=True)
        self.branco()

    def paragrafo(self, t, recuo=2, deslocamento=0):
        self.linhas(quebrar(texto_braille(t), recuo, deslocamento))

    def item(self, t, deslocamento=2):
        """Item de exercício: começa na margem e continua recuado (o leitor acha o começo de cada item)."""
        self.linhas(quebrar(texto_braille(t), 0, deslocamento))

    def brf(self):
        saida = []
        for k, pag in enumerate(self.paginas, 1):
            num = texto_braille(str(k))
            topo = ESPACO * (CELAS - len(num)) + num
            ls = [topo] + pag
            while ls and ls[-1] == '':
                ls.pop()
            saida.append('\r\n'.join(para_brf(l).rstrip() for l in ls))
        return '\r\n\f'.join(saida) + '\r\n'

    def unicode(self):
        return '\n\n'.join('\n'.join(p) for p in self.paginas)
