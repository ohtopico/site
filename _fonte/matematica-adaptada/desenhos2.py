"""Mais desenhos para as fichas (sólidos, cenas de localização, medidas, calendário, gráficos, malhas)."""
import calendar
import math

from desenhos import CLARO, TRACO, figura, svg

E = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"'


# ---------- sólidos geométricos (caixa 80 × 80) ----------

def _cubo(c=CLARO['amarelo']):
    return (f'<path d="M14 30 L44 30 L44 70 L14 70z" fill="{c}" {E}/><path d="M14 30 L30 14 L60 14 L44 30z" fill="#fff" {E}/>'
            f'<path d="M44 30 L60 14 L60 54 L44 70z" fill="{c}" {E} opacity=".85"/>')


def _bloco(c=CLARO['laranja']):
    return (f'<path d="M6 34 L54 34 L54 68 L6 68z" fill="{c}" {E}/><path d="M6 34 L22 20 L72 20 L54 34z" fill="#fff" {E}/>'
            f'<path d="M54 34 L72 20 L72 54 L54 68z" fill="{c}" {E}/>')


def _esfera(c=CLARO['verde']):
    return (f'<circle cx="40" cy="42" r="30" fill="{c}" {E}/><ellipse cx="40" cy="42" rx="30" ry="9" fill="none" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/>'
            f'<path d="M26 28 q6 -6 14 -6" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>')


def _cilindro(c=CLARO['rosa']):
    return (f'<path d="M16 18 V64 A24 8 0 0 0 64 64 V18" fill="{c}" {E}/><ellipse cx="40" cy="18" rx="24" ry="8" fill="#fff" {E}/>')


def _cone(c=CLARO['laranja']):
    return (f'<path d="M40 8 L66 64 A26 8 0 0 1 14 64z" fill="{c}" {E}/><path d="M14 64 A26 8 0 0 0 66 64" fill="none" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/>')


def _piramide(c=CLARO['amarelo']):
    return (f'<path d="M40 8 L12 62 L48 70z" fill="{c}" {E}/><path d="M40 8 L48 70 L70 56z" fill="{c}" {E} opacity=".8"/>'
            f'<path d="M12 62 L34 50 L70 56" fill="none" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M40 8 L34 50" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/>')


def _prisma(c=CLARO['verde']):
    return (f'<path d="M10 66 L32 30 L54 66z" fill="{c}" {E}/><path d="M32 30 L52 14 L74 50 L54 66z" fill="#fff" {E}/>'
            f'<path d="M10 66 L30 50 L52 14" fill="none" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M30 50 L74 50" stroke="{TRACO}" stroke-width="1.4" stroke-dasharray="4 3"/>')


SOLIDOS = {'cubo': _cubo, 'bloco': _bloco, 'esfera': _esfera, 'cilindro': _cilindro, 'cone': _cone, 'piramide': _piramide, 'prisma': _prisma}
NOME_SOLIDO = {'cubo': 'cubo', 'bloco': 'bloco retangular', 'esfera': 'esfera', 'cilindro': 'cilindro', 'cone': 'cone', 'piramide': 'pirâmide', 'prisma': 'prisma'}


def solido(tipo, tam=80):
    return svg(tam, tam, f'<g transform="scale({tam / 80:g})">{SOLIDOS[tipo]()}</g>', 'solido', NOME_SOLIDO[tipo])


def objeto3d(tipo, tam=80):
    """Objetos do dia a dia com forma de sólido."""
    d = {
        'bola': (f'<circle cx="40" cy="42" r="30" fill="{CLARO["verde"]}" {E}/><path d="M10 42 h60 M40 12 q-16 30 0 60 M40 12 q16 30 0 60" fill="none" stroke="{TRACO}" stroke-width="1.6"/>', 'bola'),
        'lata': (f'<path d="M20 16 V66 A20 7 0 0 0 60 66 V16" fill="{CLARO["rosa"]}" {E}/><ellipse cx="40" cy="16" rx="20" ry="7" fill="#fff" {E}/><rect x="20" y="32" width="40" height="18" fill="#fff" stroke="{TRACO}" stroke-width="1.4"/>', 'lata'),
        'dado': (_cubo('#fff') + ''.join(f'<circle cx="{x}" cy="{y}" r="3" fill="{TRACO}"/>' for x, y in ((22, 40), (36, 60), (29, 50))), 'dado'),
        'casquinha': (f'<path d="M24 34 L40 74 L56 34z" fill="{CLARO["bege"]}" {E}/><path d="M28 44 L50 40 M32 54 L47 50" stroke="{TRACO}" stroke-width="1.3"/><circle cx="40" cy="26" r="16" fill="{CLARO["rosa"]}" {E}/>', 'casquinha de sorvete'),
        'caixa': (_bloco('#fff') + f'<path d="M22 20 L22 30" stroke="{TRACO}" stroke-width="1.5"/><text x="30" y="56" text-anchor="middle" font-family="Lexend, sans-serif" font-size="9">sapato</text>', 'caixa de sapato'),
        'chapeu': (f'<path d="M40 6 L62 62 L18 62z" fill="{CLARO["amarelo"]}" {E}/><circle cx="40" cy="6" r="4" fill="{CLARO["rosa"]}" {E}/><ellipse cx="40" cy="64" rx="26" ry="6" fill="#fff" {E}/>', 'chapéu de festa'),
    }[tipo]
    return svg(tam, tam, f'<g transform="scale({tam / 80:g})">{d[0]}</g>', 'objeto', d[1])


# ---------- cena de localização ----------

def mesa_cena(posicoes, larg=300, alt=190):
    """posicoes: lista de (tipo, onde) com onde em 'em cima', 'embaixo', 'ao lado esquerdo', 'ao lado direito'."""
    inner = (f'<rect x="80" y="80" width="140" height="12" fill="{CLARO["bege"]}" {E}/>'
             f'<path d="M92 92 V170 M208 92 V170" stroke="{TRACO}" stroke-width="5" stroke-linecap="round"/>'
             f'<path d="M10 172 H{larg - 10}" stroke="{TRACO}" stroke-width="2"/>')
    lugares = {'em cima': (130, 38), 'embaixo': (130, 128), 'ao lado esquerdo': (20, 128), 'ao lado direito': (240, 128)}
    for tipo, onde in posicoes:
        x, y = lugares[onde]
        inner += figura(tipo, x, y, 42)
    return svg(larg, alt, inner, 'cena', 'mesa com objetos: ' + ', '.join(f'{t} {o}' for t, o in posicoes))


def fila(tipos, tam=50):
    inner = ''.join(figura(t, i * (tam + 14), 0, tam) for i, t in enumerate(tipos))
    return svg(len(tipos) * (tam + 14) - 14, tam, inner, 'fila', 'fila: ' + ', '.join(tipos))


def malha(colunas, linhas, celula=34, pintadas=(), marcas=None, caminho=None, eixos=False, rotulo='malha quadriculada'):
    """Malha quadriculada. pintadas: (col, lin); marcas: {(col, lin): texto}; caminho: lista de (col, lin) ligados por seta.
    Com eixos=True, os rótulos de coluna e linha começam em 0 (plano cartesiano, origem embaixo à esquerda)."""
    m = 26 if eixos else 2
    w, h = colunas * celula, linhas * celula
    inner = ''
    for c, l in pintadas:
        inner += f'<rect x="{m + c * celula}" y="{m + l * celula}" width="{celula}" height="{celula}" fill="{CLARO["amarelo"]}"/>'
    for i in range(colunas + 1):
        inner += f'<path d="M{m + i * celula} {m} V{m + h}" stroke="#8a8a86" stroke-width="1.2"/>'
    for j in range(linhas + 1):
        inner += f'<path d="M{m} {m + j * celula} H{m + w}" stroke="#8a8a86" stroke-width="1.2"/>'
    inner += f'<rect x="{m}" y="{m}" width="{w}" height="{h}" fill="none" stroke="{TRACO}" stroke-width="2"/>'
    if eixos:
        inner = ''
        for c, l in pintadas:
            inner += f'<circle cx="{m + c * celula}" cy="{m + h - l * celula}" r="6" fill="{CLARO["amarelo"]}" {E}/>'
        for i in range(colunas + 1):
            inner += f'<path d="M{m + i * celula} {m} V{m + h}" stroke="#b5b5b0" stroke-width="1"/>'
            inner += f'<text x="{m + i * celula}" y="{m + h + 18}" text-anchor="middle" font-family="Lexend, sans-serif" font-size="12">{i}</text>'
        for j in range(linhas + 1):
            inner += f'<path d="M{m} {m + j * celula} H{m + w}" stroke="#b5b5b0" stroke-width="1"/>'
            inner += f'<text x="{m - 8}" y="{m + h - j * celula + 4}" text-anchor="end" font-family="Lexend, sans-serif" font-size="12">{j}</text>'
        inner += f'<path d="M{m} {m + h} H{m + w + 8} M{m} {m + h} V{m - 8}" stroke="{TRACO}" stroke-width="2.2"/>'
    if marcas:
        for (c, l), t in marcas.items():
            if eixos:
                inner += f'<circle cx="{m + c * celula}" cy="{m + h - l * celula}" r="5" fill="{TRACO}"/><text x="{m + c * celula + 8}" y="{m + h - l * celula - 7}" font-family="Lexend, sans-serif" font-weight="600" font-size="14">{t}</text>'
            else:
                inner += f'<text x="{m + c * celula + celula / 2}" y="{m + l * celula + celula / 2 + 7}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="{celula * .5:.0f}">{t}</text>'
    if caminho:
        pts = ' '.join(f'{m + c * celula + celula / 2},{m + l * celula + celula / 2}' for c, l in caminho)
        inner += f'<polyline points="{pts}" fill="none" stroke="{TRACO}" stroke-width="3" stroke-dasharray="6 4" stroke-linecap="round"/>'
    extra = 30 if eixos else 4
    return svg(w + m + extra - (0 if eixos else 0), h + m + (24 if eixos else 2), inner, 'malha', rotulo)


# ---------- medidas ----------

def comparar_alturas(alturas, rotulos=None, larg=60, cor=True):
    base = max(alturas) + 10
    inner = ''
    for i, a in enumerate(alturas):
        x = i * (larg + 30)
        inner += f'<rect x="{x + 10}" y="{base - a}" width="{larg - 20}" height="{a}" rx="4" fill="{("#fff" if not cor else CLARO["verde"] if i % 2 else CLARO["amarelo"])}" {E}/>'
        if rotulos:
            inner += f'<text x="{x + larg / 2}" y="{base + 20}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="16">{rotulos[i]}</text>'
    inner += f'<path d="M0 {base} H{len(alturas) * (larg + 30) - 30}" stroke="{TRACO}" stroke-width="2"/>'
    return svg(len(alturas) * (larg + 30) - 30, base + 26, inner, 'alturas', 'barras de alturas diferentes')


def balanca(esq, dir_, inclina=0):
    """esq e dir_: tipos de figura; inclina > 0 abaixa o lado esquerdo."""
    a = inclina * 10
    inner = (f'<path d="M100 40 V120 M70 122 H130" stroke="{TRACO}" stroke-width="4" stroke-linecap="round"/>'
             f'<path d="M30 {40 - a} L170 {40 + a}" stroke="{TRACO}" stroke-width="4" stroke-linecap="round"/>'
             f'<path d="M30 {40 - a} v{14} M170 {40 + a} v14" stroke="{TRACO}" stroke-width="2"/>'
             f'<path d="M6 {54 - a} H54 l-6 10 H12z" fill="#fff" {E}/><path d="M146 {54 + a} H194 l-6 10 H152z" fill="#fff" {E}/>'
             + figura(esq, 12, 18 - a, 36) + figura(dir_, 152, 18 + a, 36))
    return svg(200, 128, inner, 'balanca', 'balança com dois pratos')


def copo(nivel, tam=70, rotulo='copo'):
    """nivel de 0 a 1."""
    h = 70
    agua = h * nivel
    inner = (f'<path d="M12 6 L58 6 L52 76 L18 76z" fill="#fff" {E}/>'
             f'<path d="M{12 + 6 * (1 - (76 - agua - 6) / 70):.1f} {76 - agua:.1f} L{58 - 6 * (1 - (76 - agua - 6) / 70):.1f} {76 - agua:.1f} L52 76 L18 76z" fill="{CLARO["verde"]}" stroke="none"/>'
             f'<path d="M12 6 L58 6 L52 76 L18 76z" fill="none" {E}/>')
    return svg(tam, tam * 82 / 70, f'<g transform="scale({tam / 70:g})">{inner}</g>', 'copo', rotulo)


def regua(cm=15, larg=None, marcar=None):
    px = 30
    w = cm * px + 20
    inner = f'<rect x="1" y="1" width="{w - 2}" height="44" rx="4" fill="{CLARO["amarelo"]}" {E}/>'
    for i in range(cm * 10 + 1):
        x = 10 + i * px / 10
        alt = 16 if i % 10 == 0 else (10 if i % 5 == 0 else 6)
        inner += f'<path d="M{x:.1f} 1 v{alt}" stroke="{TRACO}" stroke-width="{1.4 if i % 10 == 0 else .8}"/>'
        if i % 10 == 0:
            inner += f'<text x="{x:.1f}" y="34" text-anchor="middle" font-family="Lexend, sans-serif" font-size="12">{i // 10}</text>'
    if marcar is not None:
        x = 10 + marcar * px
        inner += f'<path d="M{x} -4 v54" stroke="{TRACO}" stroke-width="2.5" stroke-dasharray="4 3"/>'
    return svg(w, 46, inner, 'regua', f'régua de {cm} centímetros')


def termometro(graus, maximo=40, rotulo=None):
    h = 180
    y0 = h - 24
    nivel = y0 - (graus / maximo) * (y0 - 14)
    inner = (f'<rect x="22" y="8" width="18" height="{h - 26}" rx="9" fill="#fff" {E}/>'
             f'<rect x="27" y="{nivel:.1f}" width="8" height="{y0 - nivel + 6:.1f}" fill="{CLARO["rosa"]}" stroke="none"/>'
             f'<circle cx="31" cy="{h - 14}" r="13" fill="{CLARO["rosa"]}" {E}/>')
    for g in range(0, maximo + 1, 10):
        y = y0 - (g / maximo) * (y0 - 14)
        inner += f'<path d="M40 {y:.1f} h8" stroke="{TRACO}" stroke-width="1.5"/><text x="52" y="{y + 4:.1f}" font-family="Lexend, sans-serif" font-size="11">{g}°</text>'
    return svg(80, h, inner, 'termometro', rotulo or f'termômetro marcando {graus} graus')


# ---------- calendário ----------

DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']


def calendario(ano, mes, destaques=(), vazios=(), cel='11mm'):
    semanas = calendar.Calendar(firstweekday=6).monthdayscalendar(ano, mes)
    cab = ''.join(f'<th>{d}</th>' for d in DIAS)
    linhas = ''
    for s in semanas:
        linhas += '<tr>' + ''.join(
            f'<td class="{"destaque" if d in destaques else ""}">{"" if d == 0 or d in vazios else d}</td>' for d in s) + '</tr>'
    return (f'<table class="calendario" style="--cel:{cel}"><caption>{MESES[mes - 1]} de {ano}</caption>'
            f'<thead><tr>{cab}</tr></thead><tbody>{linhas}</tbody></table>')


# ---------- gráficos ----------

def grafico_barras(categorias, valores=None, maximo=6, icones=None, rotulo=None, celula=30, vazio=False, gap=20):
    """Gráfico de colunas em malha. Com vazio=True, só a malha para o estudante pintar."""
    n = len(categorias)
    m, base = 30, maximo * celula + 10
    w = n * (celula + gap) + m
    inner = ''
    for j in range(maximo + 1):
        y = base - j * celula
        inner += f'<path d="M{m} {y} H{w}" stroke="#c9c9c4" stroke-width="1"/><text x="{m - 8}" y="{y + 4}" text-anchor="end" font-family="Lexend, sans-serif" font-size="12">{j}</text>'
    for i, cat in enumerate(categorias):
        x = m + gap / 2 + i * (celula + gap)
        v = 0 if vazio or valores is None else valores[i]
        for k in range(maximo):
            fill = CLARO['amarelo'] if k < v else '#fff'
            inner += f'<rect x="{x}" y="{base - (k + 1) * celula}" width="{celula}" height="{celula}" fill="{fill}" stroke="{TRACO}" stroke-width="{1.6 if k < v else .8}"/>'
        if icones:
            inner += figura(icones[i], x + 2, base + 6, celula - 4)
        else:
            inner += f'<text x="{x + celula / 2}" y="{base + 20}" text-anchor="middle" font-family="Lexend, sans-serif" font-size="12">{cat}</text>'
    inner += f'<path d="M{m} {base} H{w} M{m} {base} V4" stroke="{TRACO}" stroke-width="2"/>'
    return svg(w + 4, base + (celula + 10 if icones else 28), inner, 'grafico',
               rotulo or ('gráfico de colunas: ' + ', '.join(f'{c} {v}' for c, v in zip(categorias, valores or [0] * n))))


def grafico_linha(rotulos, valores, maximo, passo=5, larg=520, alt=200, unidade=''):
    m = 40
    n = len(valores)
    dx = (larg - m - 20) / (n - 1)
    inner = ''
    for g in range(0, maximo + 1, passo):
        y = alt - 30 - g / maximo * (alt - 50)
        inner += f'<path d="M{m} {y:.1f} H{larg - 10}" stroke="#c9c9c4" stroke-width="1"/><text x="{m - 6}" y="{y + 4:.1f}" text-anchor="end" font-family="Lexend, sans-serif" font-size="11">{g}{unidade}</text>'
    pts = [(m + i * dx, alt - 30 - v / maximo * (alt - 50)) for i, v in enumerate(valores)]
    inner += f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in pts)}" fill="none" stroke="{TRACO}" stroke-width="2.5"/>'
    for (x, y), r in zip(pts, rotulos):
        inner += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="5" fill="{CLARO["amarelo"]}" {E}/><text x="{x:.1f}" y="{alt - 10}" text-anchor="middle" font-family="Lexend, sans-serif" font-size="11">{r}</text>'
    inner += f'<path d="M{m} {alt - 30} H{larg - 10} M{m} {alt - 30} V10" stroke="{TRACO}" stroke-width="2"/>'
    return svg(larg, alt, inner, 'grafico', 'gráfico de linha: ' + ', '.join(f'{r} {v}' for r, v in zip(rotulos, valores)))


def pote(cores, tam=110, rotulo=None):
    """Pote com bolinhas: cores é lista de 'amarelo', 'verde', 'rosa'... (para probabilidade)."""
    inner = f'<path d="M14 20 h82 l-6 82 q-35 10 -70 0z" fill="#fff" {E}/><rect x="20" y="10" width="70" height="12" rx="4" fill="{CLARO["bege"]}" {E}/>'
    for i, c in enumerate(cores):
        col, lin = i % 4, i // 4
        inner += f'<circle cx="{28 + col * 17 + (lin % 2) * 8}" cy="{88 - lin * 17}" r="8" fill="{CLARO[c]}" {E}/>'
    return svg(tam, tam, f'<g transform="scale({tam / 110:g})">{inner}</g>', 'pote', rotulo or 'pote com bolinhas')


def roleta(setores, tam=140, rotulo=None):
    """setores: lista de cores."""
    n = len(setores)
    c, r = tam / 2, tam / 2 - 6
    inner = ''
    for i, cor in enumerate(setores):
        a1, a2 = 2 * math.pi * i / n - math.pi / 2, 2 * math.pi * (i + 1) / n - math.pi / 2
        x1, y1, x2, y2 = c + r * math.cos(a1), c + r * math.sin(a1), c + r * math.cos(a2), c + r * math.sin(a2)
        inner += f'<path d="M{c} {c} L{x1:.1f} {y1:.1f} A{r} {r} 0 0 1 {x2:.1f} {y2:.1f}z" fill="{CLARO[cor]}" {E}/>'
    inner += f'<path d="M{c} {c} L{c + r * .7:.1f} {c - r * .4:.1f}" stroke="{TRACO}" stroke-width="3.5" stroke-linecap="round"/><circle cx="{c}" cy="{c}" r="5" fill="{TRACO}"/>'
    return svg(tam, tam, inner, 'roleta', rotulo or 'roleta com partes coloridas')


def barra_fracao(partes, pintadas, larg=300, alt=40, rotulo=None):
    w = larg / partes
    inner = ''.join(f'<rect x="{1 + i * w:.1f}" y="1" width="{w:.1f}" height="{alt}" fill="{CLARO["amarelo"] if i < pintadas else "#fff"}" stroke="{TRACO}" stroke-width="2"/>'
                    for i in range(partes))
    return svg(larg + 2, alt + 2, inner, 'fracao', rotulo or f'barra dividida em {partes} partes, {pintadas} pintadas')


def pizza_fracao(partes, pintadas, tam=110, rotulo=None):
    c, r = tam / 2, tam / 2 - 4
    if partes == 1:
        return svg(tam, tam, f'<circle cx="{c}" cy="{c}" r="{r}" fill="{CLARO["amarelo"] if pintadas else "#fff"}" {E}/>', 'fracao', rotulo or 'círculo inteiro')
    inner = ''
    for i in range(partes):
        a1, a2 = 2 * math.pi * i / partes - math.pi / 2, 2 * math.pi * (i + 1) / partes - math.pi / 2
        x1, y1, x2, y2 = c + r * math.cos(a1), c + r * math.sin(a1), c + r * math.cos(a2), c + r * math.sin(a2)
        grande = 1 if a2 - a1 > math.pi else 0
        inner += f'<path d="M{c} {c} L{x1:.1f} {y1:.1f} A{r} {r} 0 {grande} 1 {x2:.1f} {y2:.1f}z" fill="{CLARO["amarelo"] if i < pintadas else "#fff"}" {E}/>'
    return svg(tam, tam, inner, 'fracao', rotulo or f'círculo dividido em {partes} partes, {pintadas} pintadas')


def poligono_svg(pontos, tam=120, rotulo='polígono', preench='#fff', marcas_angulo=False):
    xs, ys = [p[0] for p in pontos], [p[1] for p in pontos]
    inner = f'<polygon points="{" ".join(f"{x},{y}" for x, y in pontos)}" fill="{preench}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
    return svg(max(xs) + 6, max(ys) + 6, inner, 'poligono', rotulo)


def regular(n, r=48, rot=-90, preench='#fff', rotulo=None):
    c = r + 4
    pts = [(round(c + r * math.cos(math.radians(rot + 360 * i / n)), 1), round(c + r * math.sin(math.radians(rot + 360 * i / n)), 1)) for i in range(n)]
    inner = f'<polygon points="{" ".join(f"{x},{y}" for x, y in pts)}" fill="{preench}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
    return svg(2 * c, 2 * c, inner, 'poligono', rotulo or f'polígono regular de {n} lados')


def triangulo_ret(a, b, rot=('a', 'b', 'c'), escala=14):
    """Triângulo retângulo com catetos a (horizontal) e b (vertical), em unidades; rot = rótulos dos lados."""
    w, h = a * escala, b * escala
    m = 30
    inner = (f'<polygon points="{m},{m + h} {m + w},{m + h} {m},{m}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
             f'<path d="M{m} {m + h - 14} h14 v14" fill="none" stroke="{TRACO}" stroke-width="1.6"/>'
             f'<text x="{m + w / 2}" y="{m + h + 22}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="16">{rot[0]}</text>'
             f'<text x="{m - 10}" y="{m + h / 2 + 5}" text-anchor="end" font-family="Lexend, sans-serif" font-weight="600" font-size="16">{rot[1]}</text>'
             f'<text x="{m + w / 2 + 12}" y="{m + h / 2 - 4}" font-family="Lexend, sans-serif" font-weight="600" font-size="16">{rot[2]}</text>')
    return svg(w + m + 60, h + m + 30, inner, 'triangulo', f'triângulo retângulo com lados {rot[0]}, {rot[1]} e hipotenusa {rot[2]}')


def angulo(graus, tam=120, rotulo=None, mostrar=True):
    c = 14
    y = tam - 14
    a = math.radians(graus)
    x2, y2 = c + (tam - 30) * math.cos(a), y - (tam - 30) * math.sin(a)
    arco_r = 30
    ax, ay = c + arco_r * math.cos(a), y - arco_r * math.sin(a)
    grande = 1 if graus > 180 else 0
    inner = (f'<path d="M{c} {y} H{tam - 4}" stroke="{TRACO}" stroke-width="2.5"/><path d="M{c} {y} L{x2:.1f} {y2:.1f}" stroke="{TRACO}" stroke-width="2.5"/>')
    if graus == 90:
        inner += f'<path d="M{c} {y - 16} h16 v16" fill="none" stroke="{TRACO}" stroke-width="1.8"/>'
    else:
        inner += f'<path d="M{c + arco_r} {y} A{arco_r} {arco_r} 0 {grande} 0 {ax:.1f} {ay:.1f}" fill="none" stroke="{TRACO}" stroke-width="1.8"/>'
    if mostrar:
        inner += f'<text x="{c + 40}" y="{y - 10}" font-family="Lexend, sans-serif" font-size="13">{graus}°</text>'
    return svg(tam, tam, inner, 'angulo', rotulo or f'ângulo de {graus} graus')


def balanca_eq(esq, dir_, rotulo=None):
    """Balança em equilíbrio com textos nos pratos (equações)."""
    inner = (f'<path d="M140 30 V112 M100 114 H180" stroke="{TRACO}" stroke-width="4" stroke-linecap="round"/>'
             f'<path d="M30 30 H250" stroke="{TRACO}" stroke-width="4" stroke-linecap="round"/>'
             f'<path d="M30 30 v18 M250 30 v18" stroke="{TRACO}" stroke-width="2"/>'
             f'<path d="M-10 48 H70 l-8 12 H-2z" transform="translate(10 0)" fill="#fff" {E}/>'
             f'<path d="M210 48 H290 l-8 12 H218z" transform="translate(-10 0)" fill="#fff" {E}/>'
             f'<text x="40" y="84" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="18">{esq}</text>'
             f'<text x="240" y="84" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="18">{dir_}</text>')
    return svg(280, 120, inner, 'balanca', rotulo or f'balança em equilíbrio: {esq} de um lado e {dir_} do outro')


def caixa_x(n, tam=34):
    """Caixinhas de valor desconhecido (x) para equações."""
    inner = ''.join(f'<rect x="{i * (tam + 6)}" y="1" width="{tam}" height="{tam}" rx="4" fill="{CLARO["verde"]}" {E}/>'
                    f'<text x="{i * (tam + 6) + tam / 2}" y="{tam / 2 + 7}" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="17">x</text>' for i in range(n))
    return svg(n * (tam + 6) - 6, tam + 2, inner, 'caixas', f'{n} caixas com valor desconhecido x')


def dourado3(centenas, dezenas, unidades, tam=6, rotulo=None):
    """Material dourado com placas (100), barras (10) e cubinhos (1)."""
    inner, x = '', 0
    for _ in range(centenas):
        inner += f'<rect x="{x + 1}" y="1" width="{10 * tam}" height="{10 * tam}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.6"/>'
        for k in range(1, 10):
            inner += f'<path d="M{x + 1 + k * tam} 1 v{10 * tam} M{x + 1} {1 + k * tam} h{10 * tam}" stroke="{TRACO}" stroke-width=".6"/>'
        x += 10 * tam + 8
    for _ in range(dezenas):
        inner += f'<rect x="{x + 1}" y="1" width="{tam}" height="{10 * tam}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.4"/>'
        for k in range(1, 10):
            inner += f'<path d="M{x + 1} {1 + k * tam} h{tam}" stroke="{TRACO}" stroke-width=".6"/>'
        x += tam + 5
    x += 4
    for u in range(unidades):
        cx, cy = x + (u % 3) * (tam + 4), 10 * tam - (u // 3 + 1) * (tam + 4) + 5
        inner += f'<rect x="{cx + 1}" y="{cy}" width="{tam}" height="{tam}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="1.2"/>'
    if unidades:
        x += 3 * (tam + 4)
    return svg(max(x, 10), 10 * tam + 2, inner, 'dourado', rotulo or f'{centenas} placas, {dezenas} barras e {unidades} cubinhos')


def mapa_bairro(caminho=None, rotulo='mapa de um bairro com ruas e lugares'):
    """Mapa simples em malha 8 × 6: casa, escola, praça, mercado; caminho opcional (lista de (col, lin))."""
    cel = 54
    inner = ''
    for c in range(8):
        for l in range(6):
            inner += f'<rect x="{c * cel}" y="{l * cel}" width="{cel}" height="{cel}" fill="#fff" stroke="#c9c9c4" stroke-width="1"/>'
    lugares = {(0, 5): ('Casa', CLARO['rosa']), (7, 0): ('Escola', CLARO['amarelo']), (3, 2): ('Praça', CLARO['verde']), (6, 4): ('Mercado', CLARO['laranja'])}
    for (c, l), (n, cor) in lugares.items():
        inner += (f'<rect x="{c * cel + 3}" y="{l * cel + 3}" width="{cel - 6}" height="{cel - 6}" rx="5" fill="{cor}" {E}/>'
                  f'<text x="{c * cel + cel / 2}" y="{l * cel + cel / 2 + 4}" text-anchor="middle" font-family="Lexend, sans-serif" font-size="10" font-weight="600">{n}</text>')
    if caminho:
        pts = ' '.join(f'{c * cel + cel / 2},{l * cel + cel / 2}' for c, l in caminho)
        inner += f'<polyline points="{pts}" fill="none" stroke="{TRACO}" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round" stroke-linejoin="round"/>'
    inner += f'<rect x="0" y="0" width="{8 * cel}" height="{6 * cel}" fill="none" stroke="{TRACO}" stroke-width="2"/>'
    return svg(8 * cel + 1, 6 * cel + 1, inner, 'mapa', rotulo)


def objeto_medida(tipo, tam=70):
    """Objetos para massa e capacidade: garrafa (litro), pacote (quilo), colher, seringa."""
    d = {
        'garrafa': (f'<path d="M30 4 h12 v12 q12 6 12 20 v40 h-36 v-40 q0 -14 12 -20z" fill="#fff" {E}/><rect x="18" y="40" width="36" height="18" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="1.4"/><text x="36" y="53" text-anchor="middle" font-family="Lexend, sans-serif" font-size="10" font-weight="600">1 L</text>', 'garrafa de 1 litro'),
        'pacote': (f'<path d="M12 18 h48 l-4 58 h-40z" fill="{CLARO["bege"]}" {E}/><text x="36" y="52" text-anchor="middle" font-family="Lexend, sans-serif" font-size="11" font-weight="600">1 kg</text>', 'pacote de 1 quilograma'),
        'copinho': (f'<path d="M20 30 h32 l-4 40 h-24z" fill="#fff" {E}/><text x="36" y="48" text-anchor="middle" font-family="Lexend, sans-serif" font-size="7.5" font-weight="600">200 mL</text>', 'copinho de 200 mililitros'),
        'balde': (f'<path d="M10 22 h52 l-6 52 h-40z" fill="{CLARO["amarelo"]}" {E}/><path d="M10 22 q26 -24 52 0" fill="none" {E}/><text x="36" y="54" text-anchor="middle" font-family="Lexend, sans-serif" font-size="11" font-weight="600">10 L</text>', 'balde de 10 litros'),
        'pena': (f'<path d="M14 66 Q22 20 60 8 Q48 46 14 66z" fill="#fff" {E}/><path d="M14 66 L50 20" stroke="{TRACO}" stroke-width="1.4"/>', 'pena'),
        'melancia': (f'<ellipse cx="36" cy="44" rx="30" ry="24" fill="{CLARO["verde"]}" {E}/><path d="M14 30 q22 16 0 30 M36 20 q10 24 0 48 M58 30 q-22 16 0 30" fill="none" stroke="{TRACO}" stroke-width="1.4"/>', 'melancia'),
        'clipe': (f'<path d="M30 60 V20 q0 -10 10 -10 q10 0 10 10 V54 q0 6 -6 6 q-6 0 -6 -6 V24" fill="none" stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>', 'clipe'),
        'tijolo': (f'<path d="M8 36 L48 36 L48 62 L8 62z" fill="{CLARO["rosa"]}" {E}/><path d="M8 36 L22 24 L62 24 L48 36z" fill="#fff" {E}/><path d="M48 36 L62 24 L62 50 L48 62z" fill="{CLARO["rosa"]}" {E}/>', 'tijolo'),
    }[tipo]
    return svg(tam, tam * 80 / 72, f'<g transform="scale({tam / 72:g})">{d[0]}</g>', 'objeto', d[1])


def planificacao(tipo, cel=34, rotulo=None):
    """Planificações simples: cubo (cruz), bloco, piramide (base quadrada), prisma triangular, cilindro, cone."""
    est = f'fill="#fff" stroke="{TRACO}" stroke-width="2"'
    q = lambda x, y, w=cel, h=cel, f='#fff': f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{f}" stroke="{TRACO}" stroke-width="2"/>'
    if tipo == 'cubo':
        inner = ''.join(q(cel * c, cel * l, f=CLARO['amarelo'] if (c, l) == (1, 1) else '#fff') for c, l in ((1, 0), (0, 1), (1, 1), (2, 1), (3, 1), (1, 2)))
        w, h = 4 * cel, 3 * cel
    elif tipo == 'bloco':
        a, b, c_ = cel * 1.6, cel, cel * .7
        inner = (q(c_, 0, a, c_) + q(0, c_, c_, b) + q(c_, c_, a, b, CLARO['amarelo']) + q(c_ + a, c_, c_, b) + q(2 * c_ + a, c_, a, b) + q(c_, c_ + b, a, c_))
        w, h = 2 * c_ + 2 * a, 2 * c_ + b
    elif tipo == 'piramide':
        b = cel * 1.4
        x0, y0 = b * .9, b * .9
        inner = (q(x0, y0, b, b, CLARO['amarelo']) +
                 f'<polygon points="{x0},{y0} {x0 + b},{y0} {x0 + b / 2},{y0 - b * .85}" {est}/>'
                 f'<polygon points="{x0},{y0 + b} {x0 + b},{y0 + b} {x0 + b / 2},{y0 + b + b * .85}" {est}/>'
                 f'<polygon points="{x0},{y0} {x0},{y0 + b} {x0 - b * .85},{y0 + b / 2}" {est}/>'
                 f'<polygon points="{x0 + b},{y0} {x0 + b},{y0 + b} {x0 + b + b * .85},{y0 + b / 2}" {est}/>')
        w, h = x0 * 2 + b, y0 * 2 + b
    elif tipo == 'prisma':
        a = cel * 1.2
        inner = (q(0, a * .87, a, a * 1.4) + q(a, a * .87, a, a * 1.4, CLARO['amarelo']) + q(2 * a, a * .87, a, a * 1.4) +
                 f'<polygon points="{a},{a * .87} {2 * a},{a * .87} {1.5 * a},0" {est}/>'
                 f'<polygon points="{a},{a * .87 + a * 1.4} {2 * a},{a * .87 + a * 1.4} {1.5 * a},{a * 1.74 + a * 1.4}" {est}/>')
        w, h = 3 * a, a * 1.74 + a * 1.4
    elif tipo == 'cilindro':
        r = cel * .55
        inner = (q(0, 2 * r, cel * 3.4, cel * 1.6, CLARO['amarelo']) + f'<circle cx="{cel * 1.7}" cy="{r}" r="{r}" {est}/>'
                 f'<circle cx="{cel * 1.7}" cy="{2 * r + cel * 1.6 + r}" r="{r}" {est}/>')
        w, h = cel * 3.4, 4 * r + cel * 1.6
    elif tipo == 'cone':
        R = cel * 2.4
        inner = (f'<path d="M{R} 0 L{R + R * math.sin(1.2):.1f} {R * math.cos(1.2):.1f} A{R} {R} 0 0 1 {R - R * math.sin(1.2):.1f} {R * math.cos(1.2):.1f}z" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2"/>'
                 f'<circle cx="{R}" cy="{R + cel * .7}" r="{cel * .7}" {est}/>')
        w, h = 2 * R, R + cel * 1.4
    return svg(w + 4, h + 4, f'<g transform="translate(2 2)">{inner}</g>', 'planificacao', rotulo or f'planificação do {tipo}')
