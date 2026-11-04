"""Desenhos em SVG das fichas de matemática adaptada.

Tudo é traço preto com preenchimento claro: a folha sai branca na impressora (economiza tinta)
e continua legível em preto e branco. A cor fica só nos detalhes.
"""
import math

TRACO = '#111'
CLARO = {'amarelo': '#fff3a8', 'verde': '#d8f0de', 'rosa': '#fbdcd8', 'laranja': '#ffe2c7', 'bege': '#f1e3cf', 'branco': '#ffffff'}


def svg(w, h, inner, classe='', rotulo=None):
    aria = f'role="img" aria-label="{rotulo}"' if rotulo else 'aria-hidden="true"'
    return f'<svg class="{classe}" viewBox="0 0 {w:g} {h:g}" width="{w:g}" height="{h:g}" {aria}>{inner}</svg>'


# ---------- figuras para contar (caixa 40 × 40) ----------

def _maca():
    return (f'<circle cx="20" cy="24" r="13" fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<path d="M20 11 q1 -5 4 -7" fill="none" stroke="{TRACO}" stroke-width="2" stroke-linecap="round"/>'
            f'<path d="M21 10 q7 -7 13 -2 q-6 6 -13 2z" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="1.5"/>')


def _estrela():
    pts = []
    for i in range(10):
        r = 17 if i % 2 == 0 else 7.5
        a = math.pi / 2 + i * math.pi / 5
        pts.append(f'{20 + r * math.cos(a):.1f},{21 - r * math.sin(a):.1f}')
    return f'<polygon points="{" ".join(pts)}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'


def _bola():
    return (f'<circle cx="20" cy="20" r="15" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<path d="M5 20 h30 M20 5 q-9 15 0 30 M20 5 q9 15 0 30" fill="none" stroke="{TRACO}" stroke-width="1.5"/>')


def _peixe():
    return (f'<ellipse cx="17" cy="20" rx="13" ry="9" fill="{CLARO["laranja"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<path d="M29 20 l9 -7 v14z" fill="{CLARO["laranja"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<circle cx="11" cy="18" r="1.8" fill="{TRACO}"/>')


def _flor():
    petalas = ''.join(f'<circle cx="{20 + 8 * math.cos(i * math.pi / 3):.1f}" cy="{18 + 8 * math.sin(i * math.pi / 3):.1f}" r="5.5" '
                      f'fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="1.5"/>' for i in range(6))
    return (f'<path d="M20 26 v12" stroke="{TRACO}" stroke-width="2"/>' + petalas +
            f'<circle cx="20" cy="18" r="4.5" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.5"/>')


def _banana():
    return (f'<path d="M7 9 q2 24 27 22 q-2 5 -11 6 q-20 -1 -19 -27z" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<path d="M5 9 l4 -3" stroke="{TRACO}" stroke-width="2.5" stroke-linecap="round"/>')


def _pao():
    return (f'<ellipse cx="20" cy="23" rx="17" ry="10" fill="{CLARO["bege"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<path d="M11 19 l4 7 M18 17 l4 8 M25 18 l4 7" stroke="{TRACO}" stroke-width="1.5" stroke-linecap="round"/>')


def _suco():
    return (f'<rect x="11" y="11" width="18" height="26" rx="2" fill="{CLARO["laranja"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<path d="M23 11 l3 -8 h5" fill="none" stroke="{TRACO}" stroke-width="2" stroke-linecap="round"/>'
            f'<circle cx="20" cy="25" r="5" fill="{CLARO["branco"]}" stroke="{TRACO}" stroke-width="1.5"/>')


def _leite():
    return (f'<path d="M11 16 l4 -8 h10 l4 8 v22 h-18z" fill="{CLARO["branco"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<rect x="11" y="22" width="18" height="8" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="1.5"/>')


def _ovo():
    return f'<ellipse cx="20" cy="22" rx="11" ry="14" fill="{CLARO["branco"]}" stroke="{TRACO}" stroke-width="2"/>'


def _lapis():
    return (f'<path d="M6 30 l22 -22 l6 6 l-22 22 l-8 2z" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<path d="M6 30 l6 6" stroke="{TRACO}" stroke-width="2"/>')


FIGURAS = {'maca': _maca, 'estrela': _estrela, 'bola': _bola, 'peixe': _peixe, 'flor': _flor, 'banana': _banana,
           'pao': _pao, 'suco': _suco, 'leite': _leite, 'ovo': _ovo, 'lapis': _lapis}
NOMES = {'maca': 'maçã', 'estrela': 'estrela', 'bola': 'bola', 'peixe': 'peixe', 'flor': 'flor', 'banana': 'banana',
         'pao': 'pão', 'suco': 'suco', 'leite': 'leite', 'ovo': 'ovo', 'lapis': 'lápis'}
PLURAL = {'maca': 'maçãs', 'pao': 'pães', 'lapis': 'lápis', 'flor': 'flores'}


def nome(tipo, n=1):
    return NOMES[tipo] if n == 1 else PLURAL.get(tipo, NOMES[tipo] + 's')


def figura(tipo, x=0, y=0, tam=40, riscada=False):
    s = tam / 40
    risco = (f'<path d="M4 4 L36 36 M36 4 L4 36" stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>' if riscada else '')
    return f'<g transform="translate({x:g} {y:g}) scale({s:g})">{FIGURAS[tipo]()}{risco}</g>'


def grupo(tipo, n, por_linha=5, tam=40, gap=8, riscadas=0, rotulo=None):
    """n figuras em linhas de por_linha; as últimas `riscadas` saem com um X (subtração)."""
    linhas = max(1, math.ceil(n / por_linha))
    colunas = min(n, por_linha) if n else 1
    w = colunas * tam + (colunas - 1) * gap
    h = linhas * tam + (linhas - 1) * gap
    inner = ''.join(figura(tipo, (i % por_linha) * (tam + gap), (i // por_linha) * (tam + gap), tam, riscada=i >= n - riscadas)
                    for i in range(n))
    return svg(w, h, inner, 'grupo', rotulo or f'{n} {nome(tipo, n)}')


# ---------- quadro de dez, números pontilhados, reta numérica ----------

def quadro_dez(n=0, celula=34, rotulo=None):
    inner = ''
    for i in range(10):
        x, y = (i % 5) * celula, (i // 5) * celula
        inner += f'<rect x="{x + 1}" y="{y + 1}" width="{celula}" height="{celula}" fill="#fff" stroke="{TRACO}" stroke-width="2"/>'
        if i < n:
            inner += f'<circle cx="{x + 1 + celula / 2}" cy="{y + 1 + celula / 2}" r="{celula * .32:.1f}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/>'
    return svg(5 * celula + 2, 2 * celula + 2, inner, 'quadro-dez', rotulo or (f'quadro de dez com {n} bolinhas' if n else 'quadro de dez vazio'))


def pontilhado(texto, tam=86):
    w = tam * .62 * len(str(texto)) + 8
    inner = (f'<text x="{w / 2:g}" y="{tam * .84:g}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="400" '
             f'font-size="{tam}" fill="none" stroke="#7a7a7a" stroke-width="2.2" stroke-dasharray="3 4" stroke-linecap="round">{texto}</text>')
    return svg(w, tam, inner, 'pontilhado', f'número {texto} pontilhado para cobrir')


def reta(ini, fim, largura=660, saltos=(), destaque=(), rotulo=None):
    passos = fim - ini
    m = 22
    dx = (largura - 2 * m) / passos
    y = 62
    inner = f'<path d="M{m - 10} {y} H{largura - m + 10}" stroke="{TRACO}" stroke-width="2.5"/>'
    for i in range(passos + 1):
        x = m + i * dx
        v = ini + i
        inner += f'<path d="M{x:.1f} {y - 7} V{y + 7}" stroke="{TRACO}" stroke-width="2"/>'
        peso = '600' if v in destaque else '400'
        inner += f'<text x="{x:.1f}" y="{y + 26}" text-anchor="middle" font-family="Lexend, sans-serif" font-size="15" font-weight="{peso}">{v}</text>'
    for a, b in saltos:
        for k in range(a, b) if b > a else range(a, b, -1):
            x1 = m + (k - ini) * dx
            x2 = m + ((k + 1 if b > a else k - 1) - ini) * dx
            meio = (x1 + x2) / 2
            inner += (f'<path d="M{x1:.1f} {y - 9} Q{meio:.1f} {y - 42} {x2:.1f} {y - 9}" fill="none" stroke="{TRACO}" stroke-width="2"/>'
                      f'<path d="M{x2:.1f} {y - 9} l{-6 if b > a else 6} -7 M{x2:.1f} {y - 9} l{-1 if b > a else 1} -9" stroke="{TRACO}" stroke-width="2" stroke-linecap="round"/>')
    return svg(largura, 96, inner, 'reta', rotulo or f'reta numérica de {ini} a {fim}')


# ---------- material dourado ----------

def dourado(dezenas, unidades, tam=9, rotulo=None):
    inner = ''
    x = 0
    for _ in range(dezenas):
        for k in range(10):
            inner += f'<rect x="{x + 1}" y="{1 + k * tam}" width="{tam}" height="{tam}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.5"/>'
        x += tam + 9
    x += 6
    for u in range(unidades):
        cx = x + (u % 2) * (tam + 6)
        cy = 10 * tam - (u // 2 + 1) * (tam + 6) + 6
        inner += f'<rect x="{cx + 1}" y="{cy}" width="{tam}" height="{tam}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.5"/>'
    if unidades:
        x += 2 * (tam + 6)
    return svg(max(x, tam + 2), 10 * tam + 2, inner, 'dourado', rotulo or f'{dezenas} barras e {unidades} cubinhos')


# ---------- relógio ----------

def relogio(h=None, m=0, tam=130, so_minuto=False, rotulo=None):
    c = tam / 2
    r = c - 4
    inner = f'<circle cx="{c}" cy="{c}" r="{r}" fill="#fff" stroke="{TRACO}" stroke-width="3"/>'
    for i in range(1, 13):
        a = math.radians(i * 30 - 90)
        inner += (f'<text x="{c + (r - 16) * math.cos(a):.1f}" y="{c + (r - 16) * math.sin(a) + 5:.1f}" text-anchor="middle" '
                  f'font-family="Lexend, sans-serif" font-size="{tam * .11:.0f}">{i}</text>')
    if h is not None or so_minuto:
        am = math.radians(m * 6 - 90)
        inner += f'<path d="M{c} {c} L{c + (r - 12) * math.cos(am):.1f} {c + (r - 12) * math.sin(am):.1f}" stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>'
    if h is not None:
        ah = math.radians((h % 12) * 30 + m * .5 - 90)
        inner += f'<path d="M{c} {c} L{c + (r - 30) * math.cos(ah):.1f} {c + (r - 30) * math.sin(ah):.1f}" stroke="{TRACO}" stroke-width="5" stroke-linecap="round"/>'
    inner += f'<circle cx="{c}" cy="{c}" r="4" fill="{TRACO}"/>'
    desc = rotulo or (f'relógio marcando {h} horas' + (f' e {m} minutos' if m else '') if h is not None else 'relógio sem o ponteiro das horas')
    return svg(tam, tam, inner, 'relogio', desc)


# ---------- dinheiro (desenho simplificado, não é reprodução das cédulas) ----------

POR_EXTENSO = {1: 'um real', 2: 'dois reais', 5: 'cinco reais', 10: 'dez reais', 20: 'vinte reais', 50: 'cinquenta reais'}


def moeda(valor=1, x=0, y=0):
    texto = 'R$ 1' if valor == 1 else f'{int(valor * 100)} c'
    cor = CLARO['amarelo'] if valor == 1 else CLARO['bege']
    return (f'<g transform="translate({x} {y})"><circle cx="26" cy="26" r="24" fill="{cor}" stroke="{TRACO}" stroke-width="2"/>'
            f'<circle cx="26" cy="26" r="19" fill="none" stroke="{TRACO}" stroke-width="1" stroke-dasharray="2 2"/>'
            f'<text x="26" y="31" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="14">{texto}</text></g>')


def cedula(valor, x=0, y=0):
    return (f'<g transform="translate({x} {y})"><rect x="1" y="1" width="112" height="54" rx="6" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2"/>'
            f'<rect x="7" y="7" width="100" height="42" rx="3" fill="none" stroke="{TRACO}" stroke-width="1" stroke-dasharray="3 2"/>'
            f'<text x="57" y="34" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="22">R$ {valor}</text>'
            f'<text x="57" y="46" text-anchor="middle" font-family="Lexend, sans-serif" font-size="8.5">{POR_EXTENSO.get(valor, "")}</text></g>')


def dinheiro(valores, por_linha=4):
    """Lista de valores; 1 e centavos viram moeda, o resto cédula."""
    inner, x, y, alt = '', 0, 0, 0
    w_max = 0
    for i, v in enumerate(valores):
        if i and i % por_linha == 0:
            x, y = 0, y + alt + 8
            alt = 0
        if v <= 1:
            inner += moeda(v, x, y + 2)
            x += 60
            alt = max(alt, 56)
        else:
            inner += cedula(v, x, y)
            x += 122
            alt = max(alt, 56)
        w_max = max(w_max, x)
    desc = 'dinheiro: ' + ', '.join(f'R$ {v}' if v >= 1 else f'{int(v * 100)} centavos' for v in valores)
    return svg(w_max - 8, y + alt + 2, inner, 'dinheiro', desc)


# ---------- períodos do dia ----------

def _sol():
    raios = ''.join(f'<path d="M{20 + 13 * math.cos(i * math.pi / 4):.1f} {20 + 13 * math.sin(i * math.pi / 4):.1f} '
                    f'L{20 + 18 * math.cos(i * math.pi / 4):.1f} {20 + 18 * math.sin(i * math.pi / 4):.1f}" stroke="{TRACO}" stroke-width="2" stroke-linecap="round"/>'
                    for i in range(8))
    return raios + f'<circle cx="20" cy="20" r="9" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/>'


def _prato():
    return (f'<circle cx="22" cy="21" r="14" fill="#fff" stroke="{TRACO}" stroke-width="2"/>'
            f'<circle cx="22" cy="21" r="8" fill="{CLARO["laranja"]}" stroke="{TRACO}" stroke-width="1.5"/>'
            f'<path d="M4 8 v26 M2 8 v7 q2 3 4 0 v-7" fill="none" stroke="{TRACO}" stroke-width="1.8" stroke-linecap="round"/>')


def _lua():
    return (f'<path d="M26 5 a15 15 0 1 0 9 26 a12 12 0 1 1 -9 -26z" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<path d="M8 8 l1.5 3 3 1.5 -3 1.5 -1.5 3 -1.5 -3 -3 -1.5 3 -1.5z" fill="{TRACO}"/>')


def _escola():
    return (f'<path d="M5 18 l15 -11 l15 11 v18 h-30z" fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<rect x="16" y="24" width="8" height="12" fill="#fff" stroke="{TRACO}" stroke-width="1.5"/>'
            f'<circle cx="20" cy="16" r="3" fill="#fff" stroke="{TRACO}" stroke-width="1.5"/>')


def _banho():
    gotas = ''.join(f'<path d="M{x} {y} q-2 4 0 5 q2 -1 0 -5z" fill="{TRACO}"/>' for x, y in ((12, 18), (19, 22), (26, 18), (15, 28), (23, 29)))
    return (f'<path d="M8 12 q12 -10 24 0z" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"/>'
            f'<path d="M20 3 v4" stroke="{TRACO}" stroke-width="2"/>' + gotas)


ICONES = {'sol': _sol, 'prato': _prato, 'lua': _lua, 'escola': _escola, 'banho': _banho}


def icone(tipo, tam=64, rotulo=None):
    return svg(tam, tam, f'<g transform="scale({tam / 40:g})">{ICONES[tipo]()}</g>', 'icone', rotulo or tipo)


# ---------- formas geométricas ----------

def forma(tipo, cx, cy, tam=40, rot=0, preenchimento='#fff'):
    est = f'fill="{preenchimento}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"'
    t = f'transform="rotate({rot} {cx} {cy})"'
    h = tam / 2
    if tipo == 'circulo':
        return f'<circle cx="{cx}" cy="{cy}" r="{h}" {est}/>'
    if tipo == 'quadrado':
        return f'<rect x="{cx - h}" y="{cy - h}" width="{tam}" height="{tam}" {est} {t}/>'
    if tipo == 'retangulo':
        return f'<rect x="{cx - h * 1.5}" y="{cy - h * .75}" width="{tam * 1.5}" height="{tam * .75}" {est} {t}/>'
    if tipo == 'triangulo':
        return f'<polygon points="{cx},{cy - h} {cx + h * 1.1},{cy + h * .8} {cx - h * 1.1},{cy + h * .8}" {est} {t}/>'
    raise ValueError(tipo)


def uma_forma(tipo, tam=60, rot=0, preenchimento='#fff'):
    lado = tam * 1.7
    return svg(lado, lado, forma(tipo, lado / 2, lado / 2, tam, rot, preenchimento), 'forma', NOME_FORMA[tipo])


NOME_FORMA = {'circulo': 'círculo', 'quadrado': 'quadrado', 'retangulo': 'retângulo', 'triangulo': 'triângulo'}


def objeto(tipo, tam=90):
    """Objetos do dia a dia que lembram uma forma plana."""
    d = {
        'roda': (f'<circle cx="45" cy="45" r="36" fill="#fff" stroke="{TRACO}" stroke-width="3"/><circle cx="45" cy="45" r="8" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/>'
                 + ''.join(f'<path d="M45 45 L{45 + 33 * math.cos(i * math.pi / 3):.1f} {45 + 33 * math.sin(i * math.pi / 3):.1f}" stroke="{TRACO}" stroke-width="2"/>' for i in range(6)), 'roda de bicicleta'),
        'janela': (f'<rect x="12" y="12" width="66" height="66" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="3"/><path d="M45 12 V78 M12 45 H78" stroke="{TRACO}" stroke-width="3"/>', 'janela'),
        'placa': (f'<polygon points="45,8 84,76 6,76" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="3" stroke-linejoin="round"/><text x="45" y="66" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="34">!</text>', 'placa de trânsito'),
        'porta': (f'<rect x="24" y="6" width="42" height="78" fill="{CLARO["bege"]}" stroke="{TRACO}" stroke-width="3"/><circle cx="57" cy="47" r="3.5" fill="{TRACO}"/>', 'porta'),
        'moeda': (f'<circle cx="45" cy="45" r="30" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="3"/><text x="45" y="53" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="22">R$ 1</text>', 'moeda'),
        'envelope': (f'<rect x="6" y="22" width="78" height="48" fill="#fff" stroke="{TRACO}" stroke-width="3"/><path d="M6 22 L45 50 L84 22" fill="none" stroke="{TRACO}" stroke-width="2.5"/>', 'envelope'),
        'pizza': (f'<path d="M45 10 L78 76 Q45 88 12 76z" fill="{CLARO["laranja"]}" stroke="{TRACO}" stroke-width="3" stroke-linejoin="round"/><circle cx="45" cy="44" r="5" fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="1.5"/><circle cx="36" cy="64" r="5" fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="1.5"/><circle cx="56" cy="66" r="5" fill="{CLARO["rosa"]}" stroke="{TRACO}" stroke-width="1.5"/>', 'fatia de pizza'),
        'tela': (f'<rect x="6" y="16" width="78" height="50" rx="3" fill="#fff" stroke="{TRACO}" stroke-width="3"/><path d="M36 66 l-4 12 h26 l-4 -12" fill="none" stroke="{TRACO}" stroke-width="2.5"/>', 'tela de computador'),
    }[tipo]
    return svg(tam, tam, f'<g transform="scale({tam / 90:g})">{d[0]}</g>', 'objeto', d[1])
