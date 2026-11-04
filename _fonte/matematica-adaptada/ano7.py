"""Fichas do 7º ano."""
import math

from base import ficha
from desenhos import CLARO, TRACO, grupo, svg
from desenhos2 import balanca_eq, barra_fracao, copo, malha, pizza_fracao, poligono_svg, regular, roleta
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, problema, seq_numeros, tabela
from ano3 import frases
from ano4 import malha_eixo, n, reta_fracao
from ano5 import empilhado
from ano6 import fluxo_vazio

F = 'font-family="Lexend, sans-serif"'
E = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round"'


def m(x):
    """Número com o sinal de menos tipográfico."""
    return str(x).replace('-', '−')


# ---------- desenhos do 7º ano ----------

def reta_int(ini, fim, marcas=None, larg=560, rotulo=None):
    """Reta dos inteiros de ini a fim; marcas: {valor: texto acima}."""
    mg, y = 20, 40
    dx = (larg - 2 * mg) / (fim - ini)
    inner = (f'<path d="M{mg - 12} {y} H{larg - mg + 12}" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<path d="M{mg - 12} {y} l8 -5 v10z M{larg - mg + 12} {y} l-8 -5 v10z" fill="{TRACO}"/>')
    for i, v in enumerate(range(ini, fim + 1)):
        x = mg + i * dx
        inner += (f'<path d="M{x:.1f} {y - 7} V{y + 7}" stroke="{TRACO}" stroke-width="{2.5 if v == 0 else 1.8}"/>'
                  f'<text x="{x:.1f}" y="{y + 26}" text-anchor="middle" {F} font-size="14" font-weight="{600 if v == 0 else 400}">{m(v)}</text>')
    for v, t in (marcas or {}).items():
        x = mg + (v - ini) * dx
        inner += f'<circle cx="{x:.1f}" cy="{y}" r="5" fill="{TRACO}"/><text x="{x:.1f}" y="{y - 14}" text-anchor="middle" {F} font-size="13" font-weight="600">{t}</text>'
    return svg(larg, 72, inner, 'reta', rotulo or f'reta numérica de {m(ini)} a {m(fim)}')


def plano4(r=4, cel=24, figuras=(), pontos=None, rotulo='plano cartesiano com os quatro quadrantes'):
    """Plano com eixos no meio, de -r a r. figuras: listas de vértices (x, y); pontos: {(x, y): rótulo}."""
    mg = 16
    lado = 2 * r * cel
    X = lambda x: mg + (x + r) * cel
    Y = lambda y: mg + (r - y) * cel
    inner = ''
    for i in range(2 * r + 1):
        inner += f'<path d="M{mg + i * cel} {mg} V{mg + lado}" stroke="#c8c8c3" stroke-width="1"/><path d="M{mg} {mg + i * cel} H{mg + lado}" stroke="#c8c8c3" stroke-width="1"/>'
    inner += f'<path d="M{mg - 6} {Y(0)} H{mg + lado + 6} M{X(0)} {mg - 6} V{mg + lado + 6}" stroke="{TRACO}" stroke-width="2.2"/>'
    for v in range(-r, r + 1):
        if v:
            inner += f'<text x="{X(v)}" y="{Y(0) + 15}" text-anchor="middle" {F} font-size="10">{m(v)}</text>'
            inner += f'<text x="{X(0) - 5}" y="{Y(v) + 4}" text-anchor="end" {F} font-size="10">{m(v)}</text>'
    inner += f'<text x="{mg + lado + 4}" y="{Y(0) - 6}" {F} font-size="12" font-weight="600">x</text><text x="{X(0) + 6}" y="{mg + 2}" {F} font-size="12" font-weight="600">y</text>'
    for fig in figuras:
        pts = ' '.join(f'{X(x)},{Y(y)}' for x, y in fig)
        inner += f'<polygon points="{pts}" fill="{CLARO["amarelo"]}" fill-opacity=".8" stroke="{TRACO}" stroke-width="2.2" stroke-linejoin="round"/>'
    for (x, y), t in (pontos or {}).items():
        inner += f'<circle cx="{X(x)}" cy="{Y(y)}" r="4.5" fill="{TRACO}"/><text x="{X(x) + 7}" y="{Y(y) - 6}" {F} font-size="13" font-weight="600">{t}</text>'
    return svg(lado + 2 * mg + 8, lado + 2 * mg, inner, 'plano', rotulo)


def plano1(colunas, linhas_, cel=30, figuras=(), pontos=None, rotulo='plano cartesiano'):
    """Primeiro quadrante com figuras (listas de vértices) e pontos {(x, y): rótulo}."""
    mg = 26
    w, h = colunas * cel, linhas_ * cel
    X = lambda x: mg + x * cel
    Y = lambda y: mg + h - y * cel
    inner = ''
    for i in range(colunas + 1):
        inner += f'<path d="M{X(i)} {mg} V{mg + h}" stroke="#c8c8c3" stroke-width="1"/><text x="{X(i)}" y="{mg + h + 17}" text-anchor="middle" {F} font-size="11">{i}</text>'
    for j in range(linhas_ + 1):
        inner += f'<path d="M{mg} {Y(j)} H{mg + w}" stroke="#c8c8c3" stroke-width="1"/><text x="{mg - 7}" y="{Y(j) + 4}" text-anchor="end" {F} font-size="11">{j}</text>'
    inner += f'<path d="M{mg} {mg + h} H{mg + w + 8} M{mg} {mg + h} V{mg - 8}" stroke="{TRACO}" stroke-width="2.2"/>'
    for fig in figuras:
        pts = ' '.join(f'{X(x)},{Y(y)}' for x, y in fig)
        inner += f'<polygon points="{pts}" fill="{CLARO["amarelo"]}" stroke="{TRACO}" stroke-width="2.2" stroke-linejoin="round"/>'
    for (x, y), t in (pontos or {}).items():
        inner += f'<circle cx="{X(x)}" cy="{Y(y)}" r="4.5" fill="{TRACO}"/><text x="{X(x) + 7}" y="{Y(y) - 6}" {F} font-size="13" font-weight="600">{t}</text>'
    return svg(w + mg + 14, h + mg + 22, inner, 'plano', rotulo)


def fluxo_linear(passos, rotulo=None):
    """Fluxograma em fila: Início, caixas de passos, Fim."""
    w, y, inner = 230, 4, ''
    nos = ['Início'] + passos + ['Fim']
    for i, t in enumerate(nos):
        if i in (0, len(nos) - 1):
            inner += f'<ellipse cx="{w / 2}" cy="{y + 16}" rx="60" ry="16" fill="{CLARO["verde"]}" {E}/>'
        else:
            inner += f'<rect x="10" y="{y}" width="{w - 20}" height="32" rx="6" fill="#fff" {E}/>'
        inner += f'<text x="{w / 2}" y="{y + 21}" text-anchor="middle" {F} font-size="13">{t}</text>'
        if i < len(nos) - 1:
            inner += f'<path d="M{w / 2} {y + 32} V{y + 48}" stroke="{TRACO}" stroke-width="2"/><path d="M{w / 2} {y + 48} l-5 -8 M{w / 2} {y + 48} l5 -8" stroke="{TRACO}" stroke-width="2"/>'
        y += 48
    return svg(w, y - 12, inner, 'fluxograma', rotulo or 'fluxograma: ' + '; '.join(passos))


def transversal(rotulos, ang=60, w=300, h=190):
    """Duas paralelas horizontais cortadas por uma transversal. rotulos: {0..7: texto};
    0 a 3 no cruzamento de cima (acima à direita, acima à esquerda, abaixo à esquerda, abaixo à direita), 4 a 7 no de baixo."""
    y1, y2 = round(h * .29), round(h * .74)
    t = math.tan(math.radians(ang))
    xc1, xc2 = w / 2 + (h / 2 - y1) / t, w / 2 + (h / 2 - y2) / t
    xa, xb = xc1 + (y1 - 6) / t, xc2 - (h - 6 - y2) / t
    inner = (f'<path d="M10 {y1} H{w - 10} M10 {y2} H{w - 10}" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<path d="M{xb:.1f} {h - 6} L{xa:.1f} 6" stroke="{TRACO}" stroke-width="2.5"/>'
             f'<text x="{w - 14}" y="{y1 - 6}" text-anchor="end" {F} font-size="12">r</text><text x="{w - 14}" y="{y2 - 6}" text-anchor="end" {F} font-size="12">s</text>')
    dirs = [ang / 2, (180 + ang) / 2, 180 + ang / 2, (360 + 180 + ang) / 2]
    for k, txt in rotulos.items():
        xc, yc = (xc1, y1) if k < 4 else (xc2, y2)
        d = math.radians(dirs[k % 4])
        dist = 26 if len(txt) <= 3 else 56
        inner += f'<text x="{xc + dist * math.cos(d):.1f}" y="{yc - dist * math.sin(d) + 5:.1f}" text-anchor="middle" {F} font-size="13" font-weight="600" paint-order="stroke" stroke="#fff" stroke-width="4">{txt}</text>'
    return svg(w, h, inner, 'transversal', 'duas retas paralelas cortadas por uma transversal, com ângulos marcados')


def palitos(lados, esc=16):
    """Palitos de tamanhos dados, um embaixo do outro, com a medida."""
    inner, y = '', 8
    for v in lados:
        inner += (f'<rect x="4" y="{y}" width="{v * esc}" height="8" rx="4" fill="{CLARO["laranja"]}" {E}/>'
                  f'<text x="{v * esc + 12}" y="{y + 9}" {F} font-size="13">{v} cm</text>')
        y += 24
    return svg(max(lados) * esc + 56, y - 4, inner, 'palitos', 'palitos de ' + ', '.join(f'{v} cm' for v in lados))


def estrutura(tipo):
    pino = lambda x, y: f'<circle cx="{x}" cy="{y}" r="5" fill="{CLARO["rosa"]}" {E}/>'
    t = f'stroke="{CLARO["laranja"]}" stroke-width="8" stroke-linecap="round"'
    c = f'stroke="{TRACO}" stroke-width="10" stroke-linecap="round"'
    if tipo == 'quadrado':
        pts = [(14, 14), (96, 14), (96, 96), (14, 96)]
        lados = ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" {c}/><path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" {t}/>' for a, b in zip(pts, pts[1:] + pts[:1]))
    else:
        pts = [(55, 14), (100, 96), (10, 96)]
        lados = ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" {c}/><path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" {t}/>' for a, b in zip(pts, pts[1:] + pts[:1]))
    return svg(112, 110, lados + ''.join(pino(x, y) for x, y in pts), 'estrutura', f'estrutura de palitos em forma de {tipo}')


def circulo(r=60, raios=6, diametro=False, rotulos=True):
    c = r + 14
    inner = f'<circle cx="{c}" cy="{c}" r="{r}" fill="#fff" stroke="{TRACO}" stroke-width="2.5"/>'
    for i in range(raios):
        a = 2 * math.pi * i / raios + .3
        inner += f'<path d="M{c} {c} L{c + r * math.cos(a):.1f} {c + r * math.sin(a):.1f}" stroke="{TRACO}" stroke-width="1.6" stroke-dasharray="5 4"/><circle cx="{c + r * math.cos(a):.1f}" cy="{c + r * math.sin(a):.1f}" r="3.5" fill="{TRACO}"/>'
    if diametro:
        inner += f'<path d="M{c - r} {c} H{c + r}" stroke="{TRACO}" stroke-width="2.5"/>'
        if rotulos:
            inner += f'<text x="{c + r / 2}" y="{c - 6}" text-anchor="middle" {F} font-size="12" font-weight="600" paint-order="stroke" stroke="#fff" stroke-width="4">raio</text>'
    inner += f'<circle cx="{c}" cy="{c}" r="4" fill="{TRACO}"/>'
    if rotulos:
        inner += f'<text x="{c - 6}" y="{c + 16}" text-anchor="end" {F} font-size="12" font-weight="600" paint-order="stroke" stroke="#fff" stroke-width="4">centro</text>'
    return svg(2 * c, 2 * c, inner, 'circulo', 'circunferência com o centro e raios iguais')


def setores(dados, tam=140):
    """dados: (rótulo, porcentagem, cor). Gráfico de setores com legenda ao lado."""
    mg = 20
    c, r = tam / 2 + mg, tam / 2 - 4
    inner, a = '', -math.pi / 2
    for rot, p, cor in dados:
        b = a + 2 * math.pi * p / 100
        grande = 1 if b - a > math.pi else 0
        inner += f'<path d="M{c} {c} L{c + r * math.cos(a):.1f} {c + r * math.sin(a):.1f} A{r} {r} 0 {grande} 1 {c + r * math.cos(b):.1f} {c + r * math.sin(b):.1f}z" fill="{CLARO[cor]}" {E}/>'
        meio = (a + b) / 2
        k = .62 if p >= 15 else 1.2
        inner += f'<text x="{c + r * k * math.cos(meio):.1f}" y="{c + r * k * math.sin(meio) + 4:.1f}" text-anchor="middle" {F} font-size="12" font-weight="600">{p}%</text>'
        a = b
    x0 = tam + 2 * mg + 8
    for i, (rot, p, cor) in enumerate(dados):
        y = mg + 18 + i * 28
        inner += f'<rect x="{x0}" y="{y - 12}" width="16" height="16" rx="3" fill="{CLARO[cor]}" {E}/><text x="{x0 + 24}" y="{y + 1}" {F} font-size="13">{rot}</text>'
    return svg(x0 + 110, tam + 2 * mg, inner, 'setores', 'gráfico de setores: ' + ', '.join(f'{r} {p}%' for r, p, _ in dados))


def figura_medida(tipo):
    """Figuras com as medidas escritas (em cm)."""
    t = f'{F} font-size="12" font-weight="600"'
    if tipo == 'triangulo':
        inner = (f'<polygon points="10,100 130,100 50,20" fill="#fff" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
                 f'<path d="M50 20 V100" stroke="{TRACO}" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M50 90 h10 v10" fill="none" stroke="{TRACO}" stroke-width="1.4"/>'
                 f'<text x="70" y="118" text-anchor="middle" {t}>6 cm</text><text x="56" y="66" {t}>4 cm</text>')
        return svg(150, 124, inner, 'figura', 'triângulo de base 6 cm e altura 4 cm')
    if tipo == 'paralelogramo':
        inner = (f'<polygon points="10,90 120,90 150,20 40,20" fill="#fff" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
                 f'<path d="M40 20 V90" stroke="{TRACO}" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M40 80 h10 v10" fill="none" stroke="{TRACO}" stroke-width="1.4"/>'
                 f'<text x="65" y="108" text-anchor="middle" {t}>5 cm</text><text x="46" y="60" {t}>3 cm</text>')
        return svg(160, 114, inner, 'figura', 'paralelogramo de base 5 cm e altura 3 cm')
    inner = (f'<polygon points="10,90 150,90 115,20 40,20" fill="#fff" stroke="{TRACO}" stroke-width="2.5" stroke-linejoin="round"/>'
             f'<path d="M40 20 V90" stroke="{TRACO}" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M40 80 h10 v10" fill="none" stroke="{TRACO}" stroke-width="1.4"/>'
             f'<text x="80" y="108" text-anchor="middle" {t}>6 cm</text><text x="78" y="14" text-anchor="middle" {t}>4 cm</text><text x="46" y="60" {t}>3 cm</text>')
    return svg(160, 114, inner, 'figura', 'trapézio de bases 6 cm e 4 cm e altura 3 cm')


def ret_diagonal(c=4, l=3, cel=30):
    inner = ''.join(f'<path d="M{2 + i * cel} 2 V{2 + l * cel}" stroke="#8a8a86" stroke-width="1.1"/>' for i in range(c + 1))
    inner += ''.join(f'<path d="M2 {2 + j * cel} H{2 + c * cel}" stroke="#8a8a86" stroke-width="1.1"/>' for j in range(l + 1))
    inner = (f'<polygon points="2,{2 + l * cel} {2 + c * cel},{2 + l * cel} {2 + c * cel},2" fill="{CLARO["amarelo"]}"/>' + inner
             + f'<rect x="2" y="2" width="{c * cel}" height="{l * cel}" fill="none" stroke="{TRACO}" stroke-width="2.2"/>'
             + f'<path d="M2 {2 + l * cel} L{2 + c * cel} 2" stroke="{TRACO}" stroke-width="2.5"/>')
    return svg(c * cel + 4, l * cel + 4, inner, 'malha', f'retângulo de {c} por {l} quadradinhos cortado na diagonal; o triângulo de baixo está pintado')


def faixa_quadrados(nq=3, s=40):
    segs = [((6 + i * s, 6), (6 + i * s, 6 + s)) for i in range(nq + 1)]
    segs += [((6 + i * s, y), (6 + (i + 1) * s, y)) for i in range(nq) for y in (6, 6 + s)]
    inner = ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="{TRACO}" stroke-width="8" stroke-linecap="round"/>' for a, b in segs)
    inner += ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="{CLARO["laranja"]}" stroke-width="4.5" stroke-linecap="round"/>' for a, b in segs)
    return svg(nq * s + 12, s + 12, inner, 'palitos', f'{nq} quadrados de palitos em fila')


def mosaico(tipo, s=26):
    if tipo == 'quadrado':
        return malha(5, 3, s, pintadas=[(c, l) for c in range(5) for l in range(3) if (c + l) % 2 == 0], rotulo='chão coberto por quadrados')
    pts = []
    inner = ''
    for i in range(3):
        cx = 34 + i * 58
        p = [(cx + 30 * math.cos(math.radians(-90 + 72 * k)), 36 + 30 * math.sin(math.radians(-90 + 72 * k))) for k in range(5)]
        inner += f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in p)}" fill="{CLARO["amarelo"] if i % 2 == 0 else "#fff"}" stroke="{TRACO}" stroke-width="2.2"/>'
    del pts
    return svg(190, 72, inner, 'mosaico', 'pentágonos lado a lado deixando buracos entre eles')


def forma_l():
    c = 14
    pts = [(2, 2), (2 + 8 * c, 2), (2 + 8 * c, 2 + 3 * c), (2 + 3 * c, 2 + 3 * c), (2 + 3 * c, 2 + 7 * c), (2, 2 + 7 * c)]
    inner = (f'<polygon points="{" ".join(f"{x},{y}" for x, y in pts)}" fill="{CLARO["verde"]}" stroke="{TRACO}" stroke-width="2.2"/>'
             f'<text x="{2 + 4 * c}" y="-6" text-anchor="middle" {F} font-size="12" font-weight="600">8 m</text>'
             f'<text x="{6 + 8 * c}" y="{2 + 1.7 * c}" {F} font-size="12" font-weight="600">3 m</text>'
             f'<text x="{6 + 3 * c}" y="{2 + 5.3 * c}" {F} font-size="12" font-weight="600">4 m</text>'
             f'<text x="{2 + 1.5 * c}" y="{20 + 7 * c}" text-anchor="middle" {F} font-size="12" font-weight="600">3 m</text>')
    return svg(8 * c + 40, 7 * c + 26, f'<g transform="translate(0 16)">{inner}</g>', 'figura', 'figura em forma de L: parte de cima 8 m por 3 m e parte de baixo 3 m por 4 m')


def dois_l(espelho=False, cel=22):
    """Malha com uma forma de L e uma cópia deslocada (translação) ou espelhada."""
    base = [(0, 0), (0, 1), (0, 2), (1, 2)]
    copia = [(5 - c if espelho else c + 4, l) for c, l in base]
    return malha(7, 3, cel, pintadas=base + copia, rotulo='forma de L e a ' + ('mesma forma espelhada' if espelho else 'mesma forma deslocada para a direita'))


# ---------- 1. múltiplos, divisores e porcentagem ----------

def multiplos_porcentagem():
    a = bloco(1, 'Ana vai ao clube a cada 2 dias e Beto a cada 3 dias. Hoje os dois foram. Daqui a quantos dias vão juntos de novo? Circule.', item('<div class="pilha-contas"><p class="conta">Ana: 2, 4, <b>6</b>, 8, 10, 12</p><p class="conta">Beto: 3, <b>6</b>, 9, 12</p></div>', opcoes([6, 5])), 'Procure o primeiro número que aparece nas duas listas.') + bloco(
        2, 'Quanto é? Circule.', grade([
            item('<p class="conta">10% de R$ 100</p>', opcoes(['R$ 10', 'R$ 1'], certa='R$ 10'), exemplo=True),
            item('<p class="conta">10% de R$ 50</p>', opcoes(['R$ 5', 'R$ 40'])),
            item('<p class="conta">50% de R$ 30</p>', opcoes(['R$ 15', 'R$ 20']))], 2), 'Para 10%, divida por 10. Para 50%, pegue a metade.')
    b = bloco(1, 'Leia e resolva.', grade([
        problema('Uma lâmpada pisca a cada <b>4</b> segundos e outra a cada <b>6</b>. Elas piscaram juntas agora. Depois de quantos segundos piscam juntas de novo?', '20mm'),
        problema('Tenho <b>18</b> balas de morango e <b>24</b> de uva. Quero fazer o maior número de saquinhos iguais, sem sobrar. Quantos saquinhos?', '20mm')], 2)) + bloco(
        2, 'Calcule.', grade([f'<p class="conta">10% de 80 = {VAZIO}</p>', f'<p class="conta">25% de 80 = {VAZIO}</p>', f'<p class="conta">5% de 200 = {VAZIO}</p>', f'<p class="conta">30% de 60 = {VAZIO}</p>'], 2),
        'Comece pelos 10% e use para calcular os outros.') + bloco(
        3, 'Um tênis de <b>R$ 120</b> está com <b>15%</b> de desconto. Quanto vou pagar?', problema('', '16mm'))
    c = bloco(1, 'Leia e resolva.', grade([
        problema('Três ônibus saem juntos às 6h. Um sai a cada <b>10</b> minutos, outro a cada <b>15</b> e outro a cada <b>20</b>. A que horas saem juntos de novo?', '20mm'),
        problema(f'Um salário de <b>R$ {n(1500)}</b> teve aumento de <b>8%</b>. Depois, teve desconto de <b>8%</b> sobre o novo valor. Voltou ao valor inicial?', '20mm')], 2)) + bloco(
        2, 'Uma loja aumentou um preço de R$ 80 para R$ 92. De quanto foi o aumento, em porcentagem?', linhas(1)) + bloco(
        3, 'Escreva um problema que se resolve com o menor múltiplo comum de 4 e 10.', linhas(2))
    return ficha(
        'multiplos-divisores-e-porcentagem', 'Múltiplos, divisores e porcentagem no dia a dia', '7º ano',
        'Resolver problemas com múltiplos e divisores comuns, sem algoritmo, e com porcentagens de acréscimo e desconto.',
        ['EF07MA01', 'EF07MA02'], '40 a 50 minutos', 'Calendário, calculadora, dinheiro de brincadeira e encartes de lojas.',
        ['Mostre um calendário e marque os dias de Ana (de 2 em 2) e de Beto (de 3 em 3). Onde as marcas se encontram?',
         'Com dinheiro de brincadeira, divida R$ 100 em 10 partes: cada parte é 10%.',
         'Na versão A, as listas de múltiplos já estão escritas. O estudante só procura o número repetido.',
         'Na versão B, peça que escreva as listas antes de responder.',
         'Na versão C, use a calculadora para conferir os aumentos e descontos.'],
        ['Calendário e dinheiro de verdade dão sentido às contas. Uma pergunta por vez, com a lista à vista.',
         'Use sempre o mesmo caminho: primeiro os 10%, depois os outros. Avise que aumento e desconto de mesma porcentagem não se anulam.',
         'Encartes de lojas viram desafio rápido: quem acha o maior desconto? Pausas curtas entre os blocos.'],
        ['Bloco 1: 6. Bloco 2: R$ 5; R$ 15.', 'Bloco 1: 12 segundos; 6 saquinhos (3 de morango e 4 de uva). Bloco 2: 8; 20; 10; 18. Bloco 3: R$ 102.',
         f'Bloco 1: às 7h (60 minutos depois); não, fica R$ {n(1490)},40. Bloco 2: 15%. Bloco 3: problemas variados com resposta 20.'],
        a, b, c)


# ---------- 2. números inteiros ----------

def inteiros():
    a = bloco(1, 'Qual temperatura é mais fria? Circule.', grade([
        item(f'<p class="conta">{m(-3)} °C ou 2 °C</p>', opcoes([f'{m(-3)} °C', '2 °C'], certa=f'{m(-3)} °C'), exemplo=True),
        item(f'<p class="conta">{m(-5)} °C ou {m(-1)} °C</p>', opcoes([f'{m(-5)} °C', f'{m(-1)} °C'])),
        item(f'<p class="conta">0 °C ou {m(-2)} °C</p>', opcoes(['0 °C', f'{m(-2)} °C']))], 3), 'Abaixo de zero é mais frio. Quanto mais longe do zero para baixo, mais frio.') + bloco(
        2, f'Comece no {m(-2)} e ande 5 para a direita. Onde você chega? Circule.', item(reta_int(-5, 5, {-2: 'início'}, 520), opcoes([3, m(-7)])), 'Pule de um em um com o dedo.')
    b = bloco(1, f'Escreva do menor para o maior: 3 &nbsp; {m(-4)} &nbsp; 0 &nbsp; {m(-1)} &nbsp; 5 &nbsp; {m(-6)}', seq_numeros([None] * 6)) + bloco(
        2, f'Marque na reta os números {m(-3)}, 1 e 4.', item(reta_int(-5, 5, larg=520))) + bloco(
        3, 'Calcule.', grade([f'<p class="conta">({m(-3)}) + 5 = {VAZIO}</p>', f'<p class="conta">2 {m("-")} 6 = {VAZIO}</p>',
                              f'<p class="conta">({m(-4)}) + ({m(-2)}) = {VAZIO}</p>', f'<p class="conta">7 + ({m(-9)}) = {VAZIO}</p>'], 2), 'Use a reta: somar anda para a direita, subtrair anda para a esquerda.')
    c = bloco(1, 'Calcule.', grade([f'<p class="conta">({m(-6)}) × 3 = {VAZIO}</p>', f'<p class="conta">({m(-20)}) ÷ ({m(-4)}) = {VAZIO}</p>', f'<p class="conta">({m(-2)}) × ({m(-5)}) {m("-")} 8 = {VAZIO}</p>'], 1)) + bloco(
        2, 'Leia e resolva.', grade([
            problema(f'De manhã a temperatura era <b>{m(-4)} °C</b>. À tarde subiu <b>9</b> graus e à noite caiu <b>7</b>. Qual a temperatura à noite?', '18mm'),
            problema('Um saldo de <b>R$ 150</b> teve um débito de <b>R$ 230</b>. Qual é o novo saldo?', '18mm')], 2)) + bloco(
        3, 'Arquimedes nasceu por volta de 287 a.C. e morreu por volta de 212 a.C. Com quantos anos ele morreu, mais ou menos?', linhas(1), 'Pense nos anos antes de Cristo como números negativos.')
    return ficha(
        'numeros-inteiros-reta-e-temperatura', 'Números inteiros: reta, temperatura e saldo', '7º ano',
        'Comparar e ordenar inteiros, localizar na reta numérica e resolver problemas com as quatro operações em contextos de temperatura, saldo e história.',
        ['EF07MA03', 'EF07MA04'], '40 a 50 minutos', 'Reta numérica de chão (fita no piso), termômetro de papel e fichas de duas cores.',
        ['Monte uma reta no chão com fita, de −5 a 5. O estudante anda sobre ela.',
         'Mostre um termômetro: abaixo de zero os números ficam negativos.',
         'Na versão A, o estudante anda com o dedo na reta.',
         'Na versão B, use fichas de duas cores: cada par de cores diferentes se anula.',
         'Na versão C, use a regra dos sinais com a reta como conferência.'],
        ['A reta no chão e o termômetro tornam o número negativo concreto. Um movimento por vez.',
         'Combine as palavras fixas: "para a direita aumenta, para a esquerda diminui". Mantenha a reta sempre na mesma posição.',
         'Andar na reta do chão dá movimento. Contas curtas com resposta rápida.'],
        [f'Bloco 1: {m(-5)} °C; {m(-2)} °C. Bloco 2: 3.', f'Bloco 1: {m(-6)}, {m(-4)}, {m(-1)}, 0, 3, 5. Bloco 2: pontos marcados. Bloco 3: 2; {m(-4)}; {m(-6)}; {m(-2)}.',
         f'Bloco 1: {m(-18)}; 5; 2. Bloco 2: {m(-2)} °C; {m("-R$ 80")}. Bloco 3: cerca de 75 anos.'],
        a, b, c)


# ---------- 3. algoritmos e fluxogramas ----------

def algoritmos():
    a = bloco(1, 'Siga o fluxograma com o dedo. Que número sai no fim? Circule.', item(fluxo_linear(['Escolha um número', 'Multiplique por 2', 'Some 1'])) + grade([
        item('<p class="conta">3</p>', opcoes([7, 6], certa=7), exemplo=True), item('<p class="conta">5</p>', opcoes([11, 10])), item('<p class="conta">10</p>', opcoes([21, 12]))], 3)) + bloco(
        2, 'Dois jeitos de calcular 25 × 4. Os dois dão o mesmo resultado? Circule.', item('<div class="pilha-contas"><p class="conta">Jeito 1: 25 + 25 + 25 + 25</p><p class="conta">Jeito 2: 4 moedas de 25 centavos = 1 real</p></div>', opcoes(['sim', 'não'])))
    b = bloco(1, 'Resolva 18 × 5 de dois jeitos diferentes.', grade([caixa_desenho('24mm', 'Jeito 1'), caixa_desenho('24mm', 'Jeito 2')], 2), 'Por exemplo: 18 × 10 e depois a metade.') + bloco(
        2, 'Os dois problemas têm a mesma estrutura. Resolva e responda.', frases(['Cada caderno custa R$ 12. Quanto custam 7?', 'Cada caixa tem 12 ovos. Quantos ovos há em 7 caixas?', 'O que os dois problemas têm em comum?'])) + bloco(
        3, 'Complete o fluxograma para calcular o preço de qualquer número de cadernos de R$ 12.', item(fluxo_vazio(4)))
    c = bloco(1, 'Faça um fluxograma que decide se um ano é bissexto, usando a regra simples: é bissexto se for divisível por 4.', caixa_desenho('48mm')) + bloco(
        2, 'Calcule 1 + 2 + 3 + ... + 20 de dois jeitos diferentes.', grade([caixa_desenho('26mm', 'Jeito 1'), caixa_desenho('26mm', 'Jeito 2')], 2)) + bloco(
        3, 'Invente outro problema com a mesma estrutura de: "Uma caixa tem 6 latas. Quantas latas há em 15 caixas?"', linhas(2))
    return ficha(
        'algoritmos-e-fluxogramas-de-problemas', 'Algoritmos e fluxogramas para resolver problemas', '7º ano',
        'Resolver um problema de jeitos diferentes, reconhecer problemas com a mesma estrutura e representar os passos num fluxograma.',
        ['EF07MA05', 'EF07MA06', 'EF07MA07'], '40 a 50 minutos', 'Cartões de fluxograma (início, passo, pergunta, fim) e calculadora.',
        ['Mostre dois estudantes resolvendo a mesma conta de jeitos diferentes. Os dois estão certos?',
         'Monte um fluxograma com cartões no quadro e siga com a turma.',
         'Na versão A, o estudante só segue o fluxograma pronto.',
         'Na versão B, compare os dois problemas lado a lado: o que muda e o que fica igual.',
         'Na versão C, o estudante cria o fluxograma do zero.'],
        ['Cartões grandes de fluxograma para montar com as mãos. Uma seta por vez.',
         'O fluxograma deixa os passos sempre na mesma ordem, o que dá previsibilidade. Use as mesmas formas para as mesmas funções.',
         'Montar o fluxograma com cartões no chão e andar pelas setas dá movimento à tarefa.'],
        ['Bloco 1: 11; 21. Bloco 2: sim (100).', 'Bloco 1: 90 (por exemplo, 18 × 10 ÷ 2 ou 10 × 5 + 8 × 5). Bloco 2: R$ 84; 84 ovos; os dois são 12 × 7. Bloco 3: início, número de cadernos, multiplique por 12, fim.',
         'Bloco 1: início, ano, pergunta "divisível por 4?", sim: bissexto, não: não bissexto. Bloco 2: 210 (somar um a um ou 10 pares que somam 21). Bloco 3: problemas de multiplicação.'],
        a, b, c)


# ---------- 4. frações e razões ----------

def fracoes_razoes():
    a = bloco(1, 'Que fração está pintada? Circule.', grade([
        item(barra_fracao(4, 3, 150, 28), opcoes(['3/4', '1/4'], certa='3/4'), exemplo=True),
        item(pizza_fracao(3, 1, 80), opcoes(['1/3', '3/1'])),
        item(barra_fracao(5, 2, 150, 28), opcoes(['2/5', '5/2']))], 3)) + bloco(
        2, 'No suco, para cada 1 copo de suco concentrado vão 2 copos de água. A razão de suco para água é: Circule.', item(
            copo(1, 56, 'copo de suco').replace(CLARO['verde'], CLARO['laranja']) + copo(1, 56, 'copo de água') + copo(1, 56, 'copo de água'), opcoes(['1 para 2', '2 para 1'])), 'Conte primeiro o suco, depois a água.')
    b = bloco(1, 'Escreva do menor para o maior: 3/4 &nbsp; 2/3 &nbsp; 5/6 &nbsp; 1/2', seq_numeros([None] * 4), 'Escreva todas com denominador 12.') + bloco(
        2, 'Complete.', frases(['7 ÷ 4 escrito como fração:', '2/3 de 24:', 'Numa turma há 12 meninas e 18 meninos. A razão entre meninas e meninos é:'])) + bloco(
        3, 'Uma receita usa 2 xícaras de farinha para 3 de leite. Complete.', tabela(['Farinha', 'Leite'], [['2', '3'], ['4', ''], ['', '9'], ['10', '']]), 'A primeira linha é o exemplo.')
    c = bloco(1, 'Compare 5/8, 0,6, 3/5 e 2/3.', frases(['Do menor para o maior:', 'Quais são iguais?'])) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Numa mistura de tinta, a razão de azul para branco é <b>2/3</b>. Com <b>12</b> latas de branco, quantas latas de azul?', '18mm'),
            problema('Num time, a razão entre vitórias e jogos é <b>3/5</b>. Em <b>20</b> jogos, quantas vitórias?', '18mm')], 2)) + bloco(
        3, 'A fração 3/4 pode ser parte de um inteiro, resultado de uma divisão, razão e operador. Dê um exemplo de cada.', linhas(4))
    return ficha(
        'fracoes-e-razoes', 'Frações e razões', '7º ano',
        'Comparar e ordenar frações nos sentidos de parte, divisão, razão e operador, e usar a razão em receitas, misturas e escalas.',
        ['EF07MA08', 'EF07MA09'], '40 a 50 minutos', 'Tiras de frações, copos de plástico, água e suco (ou papel colorido) e calculadora.',
        ['Prepare um suco na frente da turma: 1 copo de concentrado para 2 de água. Escreva 1 para 2 e 1/2.',
         'Mostre que dobrar a receita mantém a razão.',
         'Na versão A, os copos estão desenhados. O estudante conta.',
         'Na versão B, use as tiras de frações para comparar.',
         'Na versão C, use a calculadora para transformar as frações em decimais e comparar.'],
        ['Copos e tiras de verdade dão sentido à razão. Uma ideia de fração por vez.',
         'Uma tabela fixa (farinha e leite) mostra a regularidade. Avise quando a pergunta muda de sentido (parte, razão, divisão).',
         'Preparar a receita e medir com copos dá movimento. Desafios curtos de dobrar e triplicar.'],
        ['Bloco 1: 1/3; 2/5. Bloco 2: 1 para 2.', 'Bloco 1: 1/2, 2/3, 3/4, 5/6. Bloco 2: 7/4; 16; 12/18, ou seja, 2/3. Bloco 3: 6; 6; 15.',
         'Bloco 1: 3/5 = 0,6 &lt; 5/8 &lt; 2/3; 3/5 e 0,6 são iguais. Bloco 2: 8 latas; 12 vitórias. Bloco 3: por exemplo, 3 de 4 fatias; 3 ÷ 4 = 0,75; 3 meninas para 4 meninos; 3/4 de 20 = 15.'],
        a, b, c)


# ---------- 5. números racionais ----------

def racionais():
    a = bloco(1, 'Que número está no ponto? Circule.', grade([
        item(reta_fracao(2, {1: '?'}, 240), opcoes(['0,5', '5'], certa='0,5'), exemplo=True),
        item(reta_fracao(4, {3: '?'}, 240), opcoes(['0,75', '0,3']))], 2), 'A reta vai de 0 a 1.') + bloco(
        2, 'Duas pessoas vão dividir R$ 3,00 igualmente. Quanto fica para cada uma? Circule.', item('<p class="conta">R$ 3,00 ÷ 2</p>', opcoes(['R$ 1,50', 'R$ 1,05'])), 'Pense em 3 moedas de 1 real: cada pessoa fica com uma e a outra é dividida.')
    b = bloco(1, f'Marque na reta: {m(-1.5).replace(".", ",")} &nbsp; 0,5 &nbsp; 1,5 &nbsp; {m("-0,5")}', item(reta_fracao(8, larg=520, ini=m(-2), fim='2', rotulo='reta de −2 a 2 dividida em meios')), 'Cada tracinho vale 0,5. O zero fica no meio.') + bloco(
        2, 'Calcule.', grade([f'<p class="conta">0,5 × 8 = {VAZIO}</p>', f'<p class="conta">1,2 × 0,5 = {VAZIO}</p>', f'<p class="conta">4,5 ÷ 0,5 = {VAZIO}</p>', f'<p class="conta">3/4 × 8 = {VAZIO}</p>'], 2)) + bloco(
        3, 'Dividir por 0,5 é o mesmo que multiplicar por quanto? Dê um exemplo.', linhas(1))
    c = bloco(1, 'Calcule.', grade([f'<p class="conta">({m("-1,5")}) × 4 = {VAZIO}</p>', f'<p class="conta">2/3 ÷ 4 = {VAZIO}</p>', f'<p class="conta">({m("-0,8")}) ÷ ({m("-0,2")}) = {VAZIO}</p>'], 3)) + bloco(
        2, 'Leia e resolva.', grade([
            problema('Uma pizza custa <b>R$ 42,60</b> e a conta foi dividida entre <b>4</b> amigos. Quanto cada um paga?', '18mm'),
            problema('Um carro faz <b>12,5 km</b> com um litro. Quantos litros gasta em <b>300 km</b>?', '18mm')], 2)) + bloco(
        3, f'Ordene do menor para o maior: {m("-2/3")} &nbsp; {m("-0,7")} &nbsp; 0,25 &nbsp; {m("-1/4")}', linhas(1))
    return ficha(
        'numeros-racionais-reta-e-operacoes', 'Números racionais: reta e operações', '7º ano',
        'Localizar racionais positivos e negativos na reta, multiplicar e dividir decimais e frações e resolver problemas com dinheiro e medidas.',
        ['EF07MA10', 'EF07MA11', 'EF07MA12'], '40 a 50 minutos', 'Dinheiro de brincadeira, reta numérica de chão e calculadora.',
        ['Divida moedas e cédulas de brincadeira entre dois estudantes para mostrar 3 ÷ 2 = 1,5.',
         'Mostre na reta de chão onde ficam 0,5 e −0,5.',
         'Na versão A, o dinheiro é o apoio principal.',
         'Na versão B, peça que estime antes: 4,5 ÷ 0,5 dá mais ou menos que 4,5?',
         'Na versão C, a calculadora confere as contas com sinais.'],
        ['Dinheiro e reta de chão deixam o decimal concreto. Uma operação por vez.',
         'Mantenha a reta sempre igual, com o zero marcado no meio. Avise que dividir por 0,5 aumenta o número, o que costuma surpreender.',
         'Estimar antes de calcular vira jogo rápido. Use a calculadora como recompensa para conferir.'],
        ['Bloco 1: 0,75. Bloco 2: R$ 1,50.', 'Bloco 1: pontos marcados. Bloco 2: 4; 0,6; 9; 6. Bloco 3: por 2 (por exemplo, 3 ÷ 0,5 = 6 = 3 × 2).',
         f'Bloco 1: {m(-6)}; 1/6; 4. Bloco 2: R$ 10,65; 24 litros. Bloco 3: {m("-0,7")}, {m("-2/3")}, {m("-1/4")}, 0,25.'],
        a, b, c)


# ---------- 6. variável e sequências ----------

def variavel_sequencias():
    a = bloco(1, 'Cada caixa tem 4 lápis. Quantos lápis? Circule.', grade([
        item(grupo('lapis', 4, 4, 30), '<p class="legenda">1 caixa</p>' + opcoes([4, 5], certa=4), exemplo=True),
        item(grupo('lapis', 8, 4, 30), '<p class="legenda">2 caixas</p>' + opcoes([8, 6])),
        item('<p class="conta">n caixas</p>', opcoes(['4 × n', 'n + 4']))], 3), 'A letra n é o número de caixas. Ele pode mudar.') + bloco(
        2, 'Continue a sequência: 2, 4, 6, 8, ... Qual vem depois? Circule.', item('<p class="conta">2, 4, 6, 8, ?</p>', opcoes([10, 9])), 'Some 2 de cada vez.')
    b = bloco(1, 'Complete a tabela da sequência 3, 6, 9, ...', tabela(['Posição', '1', '2', '3', '4', '10', 'n'], [['Termo', '3', '6', '9', '', '', '']])) + bloco(
        2, 'Escreva R se cada termo depende dos anteriores (recursiva) ou N se depende só da posição (não recursiva).', frases(['1, 1, 2, 3, 5, 8 (soma dos dois anteriores):', '1, 4, 9, 16 (posição vezes posição):'])) + bloco(
        3, 'Em x + 5 = 12, a letra é uma incógnita. Em lápis = 4 × n, a letra é uma variável. Qual é a diferença?', linhas(2))
    c = bloco(1, 'Quadrados de palitos em fila: 1 quadrado usa 4 palitos, 2 usam 7, 3 usam 10.', item(faixa_quadrados(3)) + frases([
        'Quantos palitos para 5 quadrados?', 'Escreva uma expressão para n quadrados:', 'Ana escreveu 4 + 3 × (n − 1) e Beto escreveu 3n + 1. São equivalentes? Mostre.'])) + bloco(
        2, 'A recursão aparece também na arte e na literatura. Dê um exemplo (uma espiral, uma música que repete e aumenta, uma história dentro de outra).', linhas(2))
    return ficha(
        'variavel-e-sequencias', 'Variável, incógnita e sequências', '7º ano',
        'Usar letras para representar quantidades que variam, diferenciar variável de incógnita, classificar sequências e escrever expressões equivalentes.',
        ['EF07MA13', 'EF07MA14', 'EF07MA15', 'EF07MA16'], '40 a 50 minutos', 'Caixas com lápis, palitos de picolé e cartões com números e letras.',
        ['Mostre caixas com 4 lápis. Pergunte: e se forem 10 caixas? E se forem n?',
         'Monte os quadrados de palitos na mesa, um de cada vez, e anote os totais.',
         'Na versão A, o desenho mostra as caixas. A letra aparece só no fim.',
         'Na versão B, a tabela organiza a sequência até a posição n.',
         'Na versão C, compare as expressões de dois colegas testando números.'],
        ['Caixas e palitos de verdade dão sentido à letra. Apresente a letra só depois dos números.',
         'A tabela fixa (posição e termo) dá previsibilidade. Diga claramente: a letra é um número que pode mudar.',
         'Montar os quadrados de palitos com as mãos dá movimento. Peça previsões rápidas antes de contar.'],
        ['Bloco 1: 8; 4 × n. Bloco 2: 10.', 'Bloco 1: 12; 30; 3n. Bloco 2: R; N. Bloco 3: a incógnita tem um valor certo (x = 7); a variável pode assumir vários valores.',
         'Bloco 1: 16; 3n + 1; sim, 4 + 3n − 3 = 3n + 1. Bloco 2: exemplos variados.'],
        a, b, c)


# ---------- 7. proporcionalidade direta e inversa ----------

def proporcionalidade7():
    a = bloco(1, 'Um pão custa R$ 3. Quanto custam? Circule.', grade([
        item(grupo('pao', 1, 1, 36), '<p class="legenda">1 pão</p>' + opcoes(['R$ 3', 'R$ 1'], certa='R$ 3'), exemplo=True),
        item(grupo('pao', 2, 2, 36), '<p class="legenda">2 pães</p>' + opcoes(['R$ 6', 'R$ 5'])),
        item(grupo('pao', 4, 4, 36), '<p class="legenda">4 pães</p>' + opcoes(['R$ 12', 'R$ 7']))], 3), 'Mais pães, mais dinheiro.') + bloco(
        2, '2 pessoas pintam um muro em 6 horas. Com 4 pessoas, o tempo: Circule.', item('<div class="pilha-contas"><p class="conta">2 pessoas: 6 horas</p><p class="conta">4 pessoas: ?</p></div>', opcoes(['aumenta', 'diminui'])), 'Mais gente trabalhando, menos tempo.')
    b = bloco(1, 'Complete as tabelas.', grade([
        item(tabela(['Litros', 'Preço'], [['1', 'R$ 6'], ['3', ''], ['5', '']]), '<p class="legenda">gasolina</p>'),
        item(tabela(['Pessoas', 'Dias'], [['2', '12'], ['4', ''], ['6', '']]), '<p class="legenda">comida do acampamento</p>')], 2)) + bloco(
        2, 'Escreva D (direta) ou I (inversa) e uma sentença com letras.', frases(['Preço p de x litros a R$ 6:', 'Dias d que a comida dura para n pessoas (dura 24 dias para 1 pessoa):'])) + bloco(
        3, 'Uma impressora imprime 45 páginas em 3 minutos. Quantas imprime em 10 minutos?', linhas(1))
    c = bloco(1, 'Leia e resolva. Diga se a proporção é direta ou inversa.', grade([
        problema('A <b>60 km/h</b>, uma viagem leva <b>4 horas</b>. A <b>80 km/h</b>, quanto tempo leva?', '16mm'),
        problema('Uma receita para <b>4</b> pessoas usa <b>300 g</b> de arroz. Quanto para <b>10</b> pessoas?', '16mm'),
        problema('Uma torneira enche um tanque em <b>6 horas</b>. Com <b>3</b> torneiras iguais, em quanto tempo?', '16mm'),
        problema('Com <b>R$ 90</b> compro <b>6</b> camisetas. Quantas compro com <b>R$ 150</b>?', '16mm')], 2)) + bloco(
        2, 'Escreva uma sentença com letras para o problema da viagem.', linhas(1))
    return ficha(
        'proporcionalidade-direta-e-inversa', 'Proporcionalidade direta e inversa', '7º ano',
        'Reconhecer grandezas diretamente e inversamente proporcionais, completar tabelas e escrever sentenças com letras.',
        ['EF07MA17'], '40 a 50 minutos', 'Encartes com preços, copos medidores e calculadora.',
        ['Compare: quanto mais pães, mais caro. Quanto mais pessoas pintando, menos tempo.',
         'Monte as duas tabelas no quadro e mostre o que acontece quando uma coluna dobra.',
         'Na versão A, o desenho mostra os pães. O estudante conta e soma.',
         'Na versão B, pergunte sempre: quando uma dobra, a outra dobra ou cai pela metade?',
         'Na versão C, peça a sentença com letras depois de resolver.'],
        ['Situações concretas (pão, muro) antes da tabela. Uma relação por vez.',
         'A pergunta fixa "dobra ou cai pela metade?" vira rotina. Avise que existem dois tipos diferentes.',
         'Desafios rápidos de dobrar e triplicar, em voz alta. Pausa entre os blocos.'],
        ['Bloco 1: R$ 6; R$ 12. Bloco 2: diminui (3 horas).', 'Bloco 1: R$ 18 e R$ 30; 6 e 4 dias. Bloco 2: D, p = 6 × x; I, d = 24 ÷ n. Bloco 3: 150 páginas.',
         'Bloco 1: inversa, 3 horas; direta, 750 g; inversa, 2 horas; direta, 10 camisetas. Bloco 2: t = 240 ÷ v.'],
        a, b, c)


# ---------- 8. equações do 1º grau ----------

def equacoes():
    a = bloco(1, 'A balança está equilibrada. Quanto vale o x? Circule.', grade([
        item(balanca_eq('x + 3', '8'), opcoes([5, 11], certa=5), exemplo=True),
        item(balanca_eq('2x', '12'), opcoes([6, 10]))], 2), 'Tire o mesmo dos dois lados e a balança continua equilibrada.') + bloco(
        2, 'Tire 4 dos dois lados. Quanto vale o x? Circule.', item('<div class="pilha-contas"><p class="conta">x + 4 = 10</p><p class="conta">x + 4 − 4 = 10 − 4</p></div>', opcoes(['x = 6', 'x = 14'])))
    b = bloco(1, 'Resolva.', grade([f'<p class="conta">2x + 3 = 11 &nbsp; x = {VAZIO}</p>', f'<p class="conta">5x − 4 = 21 &nbsp; x = {VAZIO}</p>',
                                    f'<p class="conta">3x = x + 10 &nbsp; x = {VAZIO}</p>', f'<p class="conta">x ÷ 4 + 2 = 5 &nbsp; x = {VAZIO}</p>'], 2), 'Faça a mesma operação dos dois lados.') + bloco(
        2, 'Escreva a equação e resolva.', grade([
            problema('Pensei num número, multipliquei por <b>3</b> e somei <b>7</b>. Deu <b>31</b>. Que número pensei?', '18mm'),
            problema('Um celular custa o triplo de uma capinha. Juntos custam <b>R$ 240</b>. Quanto custa a capinha?', '18mm')], 2))
    c = bloco(1, 'Resolva.', grade([f'<p class="conta">4(x − 2) = 2x + 6</p>', f'<p class="conta">7x − 5 = 3x + 15</p>',
                                    f'<p class="conta">(x + 1) ÷ 3 = 4</p>', f'<p class="conta">2(3x + 1) = 5x + 9</p>'], 2)) + bloco(
        2, 'Escreva a equação e resolva.', grade([
            problema('A soma de três números consecutivos é <b>63</b>. Quais são os números?', '18mm'),
            problema('Um retângulo tem perímetro de <b>40 cm</b>. O comprimento é <b>4 cm</b> maior que a largura. Quais são as medidas?', '18mm')], 2)) + bloco(
        3, 'Invente um problema que se resolve com a equação 2x + 10 = 50.', linhas(2))
    return ficha(
        'equacoes-do-primeiro-grau', 'Equações do 1º grau com a balança', '7º ano',
        'Resolver equações do tipo ax + b = c usando as propriedades da igualdade, com a balança como apoio, e escrever equações para problemas.',
        ['EF07MA18'], '40 a 50 minutos', 'Balança de dois pratos (ou desenhada no quadro), saquinhos com quantidade escondida e pesinhos.',
        ['Coloque um saquinho fechado e 3 pesinhos de um lado e 8 pesinhos do outro. Quantos tem no saquinho?',
         'Tire 3 pesinhos dos dois lados: a balança continua equilibrada.',
         'Na versão A, a balança desenhada é o apoio.',
         'Na versão B, peça que escreva ao lado de cada passo o que fez dos dois lados.',
         'Na versão C, confira cada resposta substituindo o x na equação.'],
        ['A balança de verdade mostra a igualdade. Um passo por linha, com o que foi tirado escrito ao lado.',
         'Siga sempre a mesma ordem: tirar os números soltos, depois dividir. A conferência no fim fecha a tarefa.',
         'Mexer na balança dá movimento. Equações curtas, uma de cada vez, com conferência rápida.'],
        ['Bloco 1: 6. Bloco 2: x = 6.', 'Bloco 1: 4; 5; 5; 12. Bloco 2: 3x + 7 = 31, x = 8; x + 3x = 240, a capinha custa R$ 60.',
         'Bloco 1: 7; 5; 11; 7. Bloco 2: x + (x + 1) + (x + 2) = 63, os números são 20, 21 e 22; 2x + 2(x + 4) = 40, 8 cm e 12 cm. Bloco 3: problemas com resposta 20.'],
        a, b, c)


# ---------- 9. transformações no plano cartesiano ----------

def transformacoes():
    a = bloco(1, 'O ponto A está em (2, 1). Multiplique as duas coordenadas por 2. Onde fica o novo ponto? Circule.', item(plano1(5, 3, 34, pontos={(2, 1): 'A'}), opcoes(['(4, 2)', '(4, 1)'])), 'Primeiro o número de baixo (x), depois o do lado (y).') + bloco(
        2, 'B é o espelho do ponto A em relação ao eixo y (a linha de pé). Onde fica B? Circule.', item(plano4(3, 26, pontos={(2, 1): 'A'}), opcoes([f'({m(-2)}, 1)', f'(2, {m(-1)})'])))
    b = bloco(1, 'O triângulo tem vértices (1, 1), (3, 1) e (1, 2). Multiplique as coordenadas por 2 e desenhe o novo triângulo.', item(plano1(7, 5, 28, figuras=[[(1, 1), (3, 1), (1, 2)]])) + frases(['Novos vértices:', 'O que aconteceu com os lados?'])) + bloco(
        2, 'Desenhe o simétrico do triângulo em relação ao eixo y.', item(plano4(4, 22, figuras=[[(1, 1), (3, 1), (1, 3)]])) + frases(['Vértices do simétrico:']))
    c = bloco(1, 'O retângulo tem vértices A(1, 1), B(3, 1), C(3, 2) e D(1, 2). Desenhe e responda.', item(plano4(4, 24, figuras=[[(1, 1), (3, 1), (3, 2), (1, 2)]])) + frases([
        'Simétrico em relação ao eixo x:', 'Simétrico em relação à origem:', f'Multiplicando as coordenadas por {m(-1)}, a figura fica igual a qual delas?'])) + bloco(
        2, 'Multiplicar as coordenadas de um quadrado por 3 multiplica a área por quanto? Explique.', linhas(2))
    return ficha(
        'transformacoes-no-plano-cartesiano', 'Transformações no plano cartesiano', '7º ano',
        'Multiplicar as coordenadas dos vértices de um polígono por um número inteiro e desenhar figuras simétricas em relação aos eixos e à origem.',
        ['EF07MA19', 'EF07MA20'], '40 a 50 minutos', 'Malha quadriculada grande, fita crepe para os eixos no chão, espelho pequeno e régua.',
        ['Faça um plano no chão com fita. O estudante pisa no ponto (2, 1).',
         'Coloque um espelho sobre o eixo y: onde aparece o reflexo do ponto?',
         'Na versão A, o ponto já está marcado. O estudante só escolhe.',
         'Na versão B, peça que marque um vértice por vez e confira com o colega.',
         'Na versão C, compare as três figuras novas lado a lado.'],
        ['O plano no chão e o espelho deixam a ideia concreta. Um ponto por vez, sempre x antes de y.',
         'Combine a ordem fixa (primeiro x, depois y) e cores diferentes para a figura original e a nova.',
         'Pisar nos pontos do plano do chão dá movimento. Desafios curtos de "onde fica o espelho?".'],
        ['Bloco 1: (4, 2). Bloco 2: (−2, 1).', 'Bloco 1: (2, 2), (6, 2) e (2, 4); os lados dobraram. Bloco 2: (−1, 1), (−3, 1) e (−1, 3).',
         'Bloco 1: (1, −1), (3, −1), (3, −2), (1, −2); (−1, −1), (−3, −1), (−3, −2), (−1, −2); igual à simétrica em relação à origem. Bloco 2: por 9, porque cada lado fica 3 vezes maior.'],
        a, b, c)


# ---------- 10. simetrias ----------

def simetrias():
    a = bloco(1, 'Complete o desenho do outro lado do espelho (a linha tracejada).', item(malha_eixo(8, 4, [(1, 0), (2, 0), (3, 0), (3, 1), (2, 2), (3, 2), (3, 3)], 4, 30)), 'Conte os quadradinhos a partir da linha.') + bloco(
        2, 'A figura só escorregou para o lado, sem virar (translação)? Circule.', grade([
            item(dois_l(False), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
            item(dois_l(True), opcoes(['sim', 'não']))], 2))
    b = bloco(1, 'Desenhe a figura depois de cada movimento.', grade([
        item(malha(8, 4, 20, pintadas=[(0, 1), (1, 1), (1, 2)]), '<p class="legenda">translação: 4 para a direita</p>'),
        item(malha_eixo(8, 4, [(2, 1), (3, 1), (3, 2)], 4, 20), '<p class="legenda">reflexão na linha</p>'),
        item(malha(6, 6, 20, pintadas=[(3, 0), (3, 1), (3, 2), (4, 0)], marcas={(2, 2): '•'}), '<p class="legenda">rotação de 1/4 de volta em torno do ponto</p>')], 3)) + bloco(
        2, 'Onde você vê simetria? Escreva um exemplo.', frases(['Numa bandeira:', 'Num prédio, igreja ou ponte:', 'Num azulejo, tapete ou obra de arte:']))
    c = bloco(1, 'Crie uma faixa decorativa: desenhe um motivo e repita com translação.', item(malha(16, 3, 22))) + bloco(
        2, 'Faça uma rosácea: desenhe um motivo e gire 1/4 de volta três vezes em torno do centro.', item(malha(8, 8, 22, marcas={(3, 3): '•'}))) + bloco(
        3, 'Que movimento aparece num caleidoscópio? E numa roda-gigante?', linhas(1))
    return ficha(
        'simetrias-translacao-rotacao-reflexao', 'Simetrias: translação, rotação e reflexão', '7º ano',
        'Reconhecer e construir figuras por translação, rotação e reflexão em malhas e relacionar com bandeiras, arquitetura, azulejos e obras de arte.',
        ['EF07MA21'], '40 a 50 minutos', 'Espelho pequeno, papel vegetal, malha quadriculada, figuras recortadas e fotos de azulejos e fachadas.',
        ['Mostre fotos de azulejos portugueses, fachadas e bandeiras. Pergunte onde há repetição.',
         'Com uma figura recortada, faça os três movimentos sobre a mesa: escorregar, virar e girar.',
         'Na versão A, o estudante usa o espelho sobre a linha para completar o desenho.',
         'Na versão B, o papel vegetal ajuda: copie, mova e cole.',
         'Na versão C, a faixa e a rosácea podem virar um painel da turma.'],
        ['A figura recortada mostra o movimento com as mãos. Um movimento por vez, com o nome escrito.',
         'Use cartões fixos com o desenho de cada movimento. A malha dá contorno claro para a tarefa.',
         'Recortar, mover e pintar dá movimento. A produção artística no fim é uma boa recompensa.'],
        ['Bloco 1: figura espelhada. Bloco 2: não (está espelhada).', 'Bloco 1: figuras desenhadas. Bloco 2: exemplos variados.', 'Bloco 1 e 2: criações próprias. Bloco 3: reflexão; rotação.'],
        a, b, c)


# ---------- 11. circunferência e pi ----------

def circunferencia():
    a = bloco(1, 'Todos os pontos da circunferência estão à mesma distância do centro? Circule.', item(circulo(60), opcoes(['sim', 'não'])), 'Meça com uma tira de papel do centro até cada ponto.') + bloco(
        2, 'O diâmetro é o dobro do raio. Quanto mede o diâmetro? Circule.', grade([
            item(circulo(42, 0, True), '<p class="legenda">raio de 3 cm</p>' + opcoes(['6 cm', '3 cm'], certa='6 cm'), exemplo=True),
            item(circulo(42, 0, True), '<p class="legenda">raio de 5 cm</p>' + opcoes(['10 cm', '5 cm']))], 2))
    b = bloco(1, 'Meça objetos redondos: o contorno com um barbante e o diâmetro com a régua.', tabela(['Objeto', 'Contorno (C)', 'Diâmetro (d)', 'C ÷ d'], [['tampa', '', '', ''], ['copo', '', '', ''], ['prato', '', '', '']]),
              'Use a calculadora para dividir. O resultado fica sempre perto de 3,14, o número π (pi).') + bloco(
        2, 'Com o compasso, desenhe uma circunferência de raio 3 cm. Marque o centro, um raio e um diâmetro.', caixa_desenho('50mm'))
    c = bloco(1, 'Use π ≈ 3,14.', frases(['Contorno de uma roda de diâmetro 50 cm:', 'Diâmetro de uma praça circular com contorno de 157 m:', 'Quantas voltas a roda de 50 cm dá em 314 m?'])) + bloco(
        2, 'Dois postes estão a 6 m um do outro. Desenhe, com o compasso (1 cm = 1 m), os pontos que ficam a 4 m dos dois postes.', caixa_desenho('40mm')) + bloco(
        3, 'Faça uma composição com circunferências, como uma flor de seis pétalas (todas com o mesmo raio).', caixa_desenho('38mm'))
    return ficha(
        'circunferencia-compasso-e-pi', 'Circunferência, compasso e o número π', '7º ano',
        'Construir circunferências com compasso, reconhecer centro, raio e diâmetro, descobrir o π medindo objetos e resolver problemas de distância.',
        ['EF07MA22', 'EF07MA33'], '40 a 50 minutos', 'Compasso, barbante, régua, objetos redondos (tampas, copos, pratos) e calculadora.',
        ['Amarre um barbante num lápis e prenda a outra ponta: girando, sai uma circunferência.',
         'Meça com a turma o contorno e o diâmetro de várias tampas e divida.',
         'Na versão A, use uma tira de papel para comparar as distâncias.',
         'Na versão B, a tabela organiza as medições. A calculadora faz as divisões.',
         'Na versão C, as composições com compasso podem virar um painel.'],
        ['O barbante preso deixa a definição concreta: todos os pontos à mesma distância. O compasso pode ser trocado por barbante e lápis.',
         'A tabela de medições dá rotina. Avise que as medidas nunca dão exatamente 3,14, porque toda medida é aproximada.',
         'Medir objetos pela sala dá movimento. A flor de seis pétalas é rápida e satisfatória.'],
        ['Bloco 1: sim. Bloco 2: 10 cm.', 'Bloco 1: divisões perto de 3,14. Bloco 2: desenho com compasso.',
         'Bloco 1: 157 cm; 50 m; 200 voltas. Bloco 2: os dois pontos onde as circunferências de raio 4 cm se cruzam. Bloco 3: criação própria.'],
        a, b, c)


# ---------- 12. retas paralelas e transversal ----------

def paralelas_transversal():
    a = bloco(1, 'As retas r e s são paralelas. Os ângulos na mesma posição são iguais. Quanto mede o ângulo com o ponto de interrogação? Circule.',
              item(transversal({0: '60°', 4: '?'}), opcoes(['60°', '120°'])), 'Recorte um ângulo de papel e coloque em cima do outro.') + bloco(
        2, 'O ângulo marcado é agudo ou obtuso? Circule.', grade([
            item(transversal({0: '●'}, w=220, h=150), opcoes(['agudo', 'obtuso'], certa='agudo'), exemplo=True),
            item(transversal({1: '●'}, w=220, h=150), opcoes(['agudo', 'obtuso']))], 2))
    b = bloco(1, 'Um ângulo mede 60°. Descubra os outros.', item(transversal({0: '60°', 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g'})) +
              tabela(['a', 'b', 'c', 'd', 'e', 'f', 'g'], [['', '', '', '', '', '', '']]), 'Dois ângulos vizinhos na mesma reta somam 180°.') + bloco(
        2, 'Complete.', frases(['Ângulos correspondentes (na mesma posição) são', 'Ângulos alternos internos (entre as paralelas, em lados opostos) são', 'Dois ângulos vizinhos na mesma reta somam']))
    c = bloco(1, 'Descubra o valor de x.', grade([
        item(transversal({0: '2x + 10°', 4: '70°'}, w=260, h=170), f'<p class="du">x = {VAZIO}</p>'),
        item(transversal({0: '3x', 5: 'x + 20°'}, w=260, h=170), f'<p class="du">x = {VAZIO}</p>')], 2)) + bloco(
        2, 'Desenhe um triângulo e uma reta paralela a um dos lados passando pelo vértice oposto. Use os ângulos alternos para mostrar que a soma dos ângulos do triângulo é 180°.', caixa_desenho('42mm') + linhas(2))
    return ficha(
        'retas-paralelas-e-transversal', 'Retas paralelas cortadas por uma transversal', '7º ano',
        'Verificar as relações entre os ângulos formados por duas paralelas e uma transversal e usar essas relações para descobrir medidas.',
        ['EF07MA23'], '40 a 50 minutos', 'Transferidor, papel vegetal, régua e, se possível, um programa de geometria dinâmica.',
        ['Desenhe duas paralelas e uma transversal no quadro. Copie um ângulo em papel vegetal e arraste até o outro cruzamento.',
         'Mostre que o ângulo se encaixa na mesma posição: são correspondentes.',
         'Na versão A, o papel recortado sobreposto é o apoio principal.',
         'Na versão B, pinte da mesma cor os ângulos iguais antes de escrever.',
         'Na versão C, escreva a equação que relaciona os ângulos.'],
        ['O papel vegetal mostra que os ângulos são iguais sem precisar medir. Duas cores apenas: agudos e obtusos.',
         'Pinte sempre os agudos de uma cor e os obtusos de outra. A regra "agudo + obtuso = 180°" fica escrita à vista.',
         'Arrastar o ângulo de papel ou mexer no programa dá movimento. Descobertas curtas.'],
        ['Bloco 1: 60°. Bloco 2: obtuso.', 'Bloco 1: a = 120°, b = 60°, c = 120°, d = 60°, e = 120°, f = 60°, g = 120°. Bloco 2: iguais; iguais; 180°.',
         'Bloco 1: x = 30; x = 40. Bloco 2: os dois ângulos da base aparecem no vértice de cima, ao lado do terceiro, formando meia volta (180°).'],
        a, b, c)


# ---------- 13. triângulos ----------

def triangulos7():
    a = bloco(1, 'Com estes palitos dá para fazer um triângulo? Circule.', grade([
        item(palitos([3, 4, 5]), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
        item(palitos([2, 2, 6]), opcoes(['sim', 'não'])),
        item(palitos([4, 4, 4]), opcoes(['sim', 'não']))], 3), 'Monte com palitos de verdade. Os dois menores juntos precisam passar do maior.') + bloco(
        2, 'Qual estrutura não entorta quando empurramos o canto? Circule.', item(estrutura('quadrado') + '&nbsp;&nbsp;&nbsp;' + estrutura('triângulo'), opcoes(['quadrado', 'triângulo'])), 'Teste com palitos e massinha.')
    b = bloco(1, 'Existe o triângulo? Escreva sim ou não e explique.', frases(['5 cm, 6 cm e 8 cm:', '3 cm, 4 cm e 9 cm:', '7 cm, 7 cm e 14 cm:'])) + bloco(
        2, 'Construa com régua e compasso um triângulo de lados 5 cm, 4 cm e 3 cm.', caixa_desenho('44mm'), 'Trace o lado de 5 cm. Abra o compasso em 4 cm numa ponta e em 3 cm na outra.') + bloco(
        3, 'Dois ângulos do triângulo medem 50° e 65°. Quanto mede o terceiro?', linhas(1))
    c = bloco(1, 'Escreva, em passos numerados, o algoritmo para construir um triângulo de lados a, b e c com régua e compasso.', linhas(4)) + bloco(
        2, 'Faça o fluxograma desse algoritmo, com uma pergunta: os lados formam um triângulo?', caixa_desenho('48mm')) + bloco(
        3, 'Por que portões, telhados e torres de energia usam triângulos nas estruturas?', linhas(2))
    return ficha(
        'triangulos-construcao-e-rigidez', 'Triângulos: construção, existência e rigidez', '7º ano',
        'Verificar quando três medidas formam um triângulo, construir com régua e compasso, perceber a rigidez do triângulo e descrever o algoritmo de construção.',
        ['EF07MA24', 'EF07MA25', 'EF07MA26'], '40 a 50 minutos', 'Palitos de tamanhos diferentes, massinha ou percevejos, régua e compasso.',
        ['Dê palitos de 2, 2 e 6 cm. Dá para fechar o triângulo?',
         'Monte um quadrado e um triângulo com palitos e massinha. Empurre os cantos.',
         'Na versão A, monte os palitos de verdade antes de circular.',
         'Na versão B, siga a dica do compasso passo a passo, em voz alta.',
         'Na versão C, um colega segue o algoritmo escrito para conferir se funciona.'],
        ['Palitos e massinha antes do papel. Uma construção por vez.',
         'O algoritmo numerado dá previsibilidade. Risque cada passo ao terminar.',
         'Montar estruturas e testar com a mão dá movimento. O teste de empurrar o quadrado é rápido e marcante.'],
        ['Bloco 1: não; sim. Bloco 2: triângulo.', 'Bloco 1: sim; não, porque 3 + 4 é menor que 9; não, porque 7 + 7 é igual a 14. Bloco 2: construção. Bloco 3: 65°.',
         'Bloco 1: trace o lado a; abra o compasso com a medida b numa ponta e c na outra; marque onde os arcos se cruzam; ligue as pontas. Bloco 2: fluxograma com a pergunta (a soma dos dois menores é maior que o maior?). Bloco 3: porque o triângulo não muda de forma (é rígido).'],
        a, b, c)


# ---------- 14. polígonos regulares e mosaicos ----------

def poligonos_mosaicos():
    a = bloco(1, 'Quantos lados? Circule.', grade([
        item(regular(3, 40), opcoes([3, 4], certa=3), exemplo=True),
        item(regular(5, 40), opcoes([5, 6])),
        item(regular(6, 40), opcoes([6, 8]))], 3), 'Marque cada lado com um risquinho enquanto conta.') + bloco(
        2, 'Estes ladrilhos cobrem o chão sem deixar buracos? Circule.', grade([
            item(mosaico('quadrado'), opcoes(['sim', 'não'], certa='sim'), exemplo=True),
            item(mosaico('pentagono'), opcoes(['sim', 'não']))], 2))
    b = bloco(1, 'Divida cada polígono em triângulos a partir de um vértice e complete.', grade([item(regular(4, 34)), item(regular(5, 34)), item(regular(6, 34))], 3) +
              tabela(['Polígono', 'Lados', 'Triângulos', 'Soma dos ângulos', 'Cada ângulo'], [['triângulo', '3', '1', '180°', '60°'], ['quadrado', '4', '', '', ''], ['pentágono', '5', '', '', ''], ['hexágono', '6', '', '', '']]),
              'Cada triângulo vale 180°. A primeira linha é o exemplo.') + bloco(
        2, 'Quantos hexágonos regulares se encontram em cada vértice de um mosaico? Por quê?', linhas(1))
    c = bloco(1, 'O ângulo externo de um polígono regular é 360° dividido pelo número de lados. Complete.', tabela(['Polígono', 'Ângulo externo', 'Ângulo interno'], [['triângulo', '', ''], ['quadrado', '', ''], ['octógono', '', '']])) + bloco(
        2, 'Escreva o algoritmo para construir um quadrado de lado 5 cm com régua e esquadro. Depois faça o fluxograma.', linhas(3) + caixa_desenho('34mm')) + bloco(
        3, 'Octógonos regulares e quadrados formam um mosaico juntos? Mostre com os ângulos.', linhas(1))
    return ficha(
        'poligonos-regulares-e-mosaicos', 'Polígonos regulares, ângulos e mosaicos', '7º ano',
        'Calcular ângulos internos e externos de polígonos regulares dividindo em triângulos, entender quais formam mosaicos e descrever algoritmos de construção.',
        ['EF07MA27', 'EF07MA28'], '40 a 50 minutos', 'Polígonos regulares de papel (vários de cada), régua, esquadro e transferidor.',
        ['Dê vários quadrados, triângulos, pentágonos e hexágonos de papel. Quais cobrem a mesa sem buracos?',
         'Junte os cantos dos polígonos num ponto: só fecha quando soma 360°.',
         'Na versão A, monte os mosaicos com as peças de papel.',
         'Na versão B, risque os triângulos com cores diferentes.',
         'Na versão C, peça que um colega siga o algoritmo do quadrado.'],
        ['As peças de papel mostram o mosaico na hora. Um polígono por vez.',
         'A tabela fixa mostra a regularidade: cada lado a mais, mais um triângulo. Cores fixas para cada polígono.',
         'Montar mosaicos é rápido e visual. Use as peças como recompensa entre os blocos.'],
        ['Bloco 1: 5; 6. Bloco 2: não.', 'Bloco 1: quadrado 2, 360°, 90°; pentágono 3, 540°, 108°; hexágono 4, 720°, 120°. Bloco 2: 3, porque 3 × 120° = 360°.',
         'Bloco 1: 120° e 60°; 90° e 90°; 45° e 135°. Bloco 2: trace 5 cm; com o esquadro, levante 5 cm em cada ponta; ligue as pontas. Bloco 3: sim, 135° + 135° + 90° = 360°.'],
        a, b, c)


# ---------- 15. medidas, volume e área ----------

def volume_areas():
    a = bloco(1, 'Quantos cubinhos tem o bloco? Circule.', grade([
        item(empilhado(2, 2, 1), opcoes([4, 6], certa=4), exemplo=True),
        item(empilhado(3, 2, 2), opcoes([12, 7]))], 2), 'Conte uma camada e multiplique pelo número de camadas.') + bloco(
        2, 'O triângulo pintado é a metade do retângulo. Conte os quadradinhos do retângulo. Qual é a área do triângulo? Circule.', item(ret_diagonal(), opcoes([6, 12])))
    b = bloco(1, 'Calcule o volume.', grade([
        problema('Uma caixa de <b>5 cm</b> por <b>4 cm</b> por <b>3 cm</b>.', '16mm'),
        problema('Um aquário de <b>50 cm</b> por <b>30 cm</b> por <b>40 cm</b>. Quantos litros cabem? (1 litro = 1 000 cm³)', '16mm')], 2)) + bloco(
        2, 'Calcule a área.', grade([item(figura_medida('triangulo'), f'<p class="du">{VAZIO} cm²</p>'), item(figura_medida('paralelogramo'), f'<p class="du">{VAZIO} cm²</p>'), item(figura_medida('trapezio'), f'<p class="du">{VAZIO} cm²</p>')], 3)) + bloco(
        3, 'Medi minha mesa três vezes: 119,5 cm, 120 cm e 120,3 cm. Por que deu diferente?', linhas(1))
    c = bloco(1, 'Escreva a expressão da área.', frases(['Retângulo de lados b e h:', 'Triângulo de base b e altura h:', 'Losango de diagonais D e d:', 'Trapézio de bases B e b e altura h:'])) + bloco(
        2, 'Calcule a área da figura em forma de L.', grade([item(forma_l()), problema('Divida em retângulos.', '22mm')], 2)) + bloco(
        3, 'Uma piscina tem 8 m por 4 m por 1,5 m. Quantos metros cúbicos de água cabem? E quantos litros?', linhas(1))
    return ficha(
        'volume-e-areas', 'Volume de blocos e áreas de figuras planas', '7º ano',
        'Calcular o volume de blocos retangulares, chegar às expressões de área de triângulos e quadriláteros, decompor figuras e perceber que toda medida é aproximada.',
        ['EF07MA29', 'EF07MA30', 'EF07MA31', 'EF07MA32'], '40 a 50 minutos', 'Cubinhos de montar, caixas de papelão, malha quadriculada, tesoura e régua.',
        ['Monte um bloco com cubinhos: conte uma camada e multiplique pelas camadas.',
         'Recorte um retângulo de papel pela diagonal: cada triângulo é a metade.',
         'Na versão A, os cubinhos de verdade são o apoio principal.',
         'Na versão B, recorte o paralelogramo e o trapézio para virar retângulos.',
         'Na versão C, peça que o estudante explique de onde vem cada expressão.'],
        ['Cubinhos e recortes antes da conta. Uma figura por vez.',
         'Mantenha as expressões de área num cartão fixo. Avise que medir de novo pode dar um número um pouco diferente.',
         'Montar e recortar dá movimento. Medir objetos da sala vira desafio rápido.'],
        ['Bloco 1: 12. Bloco 2: 6.', f'Bloco 1: 60 cm³; {n(60000)} cm³ = 60 litros. Bloco 2: 12 cm²; 15 cm²; 15 cm². Bloco 3: toda medida é aproximada (régua, posição, quem mede).',
         f'Bloco 1: b × h; b × h ÷ 2; D × d ÷ 2; (B + b) × h ÷ 2. Bloco 2: 8 × 3 + 3 × 4 = 36 m². Bloco 3: 48 m³; {n(48000)} litros.'],
        a, b, c)


# ---------- 16. probabilidade, média, pesquisa e gráfico de setores ----------

def estatistica7():
    a = bloco(1, 'A roleta tem 4 partes iguais. Uma é verde. Qual é a chance de sair verde? Circule.', item(roleta(['verde', 'amarelo', 'rosa', 'laranja'], 84), opcoes(['1/4', '1/2']))) + bloco(
        2, 'As notas de Ana foram 6, 8 e 10. Some e divida por 3. Qual é a média? Circule.', item('<div class="pilha-contas"><p class="conta">6 + 8 + 10 = 24</p><p class="conta">24 ÷ 3 = ?</p></div>', opcoes([8, 24]))) + bloco(
        3, 'O gráfico mostra a fruta preferida da turma. Qual teve mais votos? Circule.', item(setores([('banana', 50, 'amarelo'), ('maçã', 25, 'rosa'), ('uva', 25, 'verde')], 96), opcoes(['banana', 'uva'])))
    b = bloco(1, 'Jogue uma moeda 20 vezes e anote.', tabela(['', 'Cara', 'Coroa'], [['Quantas vezes saiu', '', ''], ['Fração das 20 vezes', '', ''], ['Esperado pela probabilidade', '10', '10']])) + bloco(
        2, 'Gols de um time em 5 jogos: 2, 0, 3, 1 e 4.', frases(['Média de gols:', 'Amplitude (maior menos menor):'])) + bloco(
        3, 'Como os estudantes vão à escola.', item(setores([('a pé', 50, 'verde'), ('ônibus', 25, 'amarelo'), ('carro', 15, 'rosa'), ('bicicleta', 10, 'laranja')], 130)) +
        frases(['Qual é o meio mais usado?', 'Numa escola de 400 estudantes, quantos vão de ônibus?']))
    c = bloco(1, 'Você quer saber o lanche preferido dos 600 estudantes da escola. Vai perguntar a todos (censo) ou a uma parte (amostra)? Por quê? Como escolheria a amostra?', linhas(3)) + bloco(
        2, 'Temperaturas de uma semana: 18, 21, 19, 24, 23, 17 e 18 graus.', frases(['Média:', 'Amplitude:', 'A média representa bem a semana? Por quê?'])) + bloco(
        3, 'Um jornal publicou um gráfico de setores com as fatias 45%, 35% e 30%. O que está errado?', linhas(1)) + bloco(
        4, 'Planeje uma pesquisa sobre um tema da sua comunidade. Escreva a pergunta, quem vai responder e como vai mostrar os dados (tabela, gráfico, planilha).', linhas(3))
    return ficha(
        'probabilidade-media-e-graficos-de-setores', 'Probabilidade, média, pesquisa e gráfico de setores', '7º ano',
        'Fazer experimentos de probabilidade, calcular média e amplitude, planejar pesquisas com censo ou amostra e ler gráficos de setores.',
        ['EF07MA34', 'EF07MA35', 'EF07MA36', 'EF07MA37'], '40 a 50 minutos', 'Moedas, dados, roleta de papel, planilha eletrônica e gráficos recortados de jornais.',
        ['Jogue uma moeda com a turma 20 vezes e anote no quadro. Compare com o esperado.',
         'Mostre um gráfico de setores de jornal: o que cada fatia significa?',
         'Na versão A, a conta da média já vem montada.',
         'Na versão B, o experimento da moeda é feito em dupla.',
         'Na versão C, a pesquisa pode ser feita de verdade e o gráfico montado na planilha.'],
        ['Experimentos com moeda e roleta deixam a chance concreta. Uma pergunta por vez.',
         'A tabela de registro dá rotina ao experimento. Avise que o resultado pode ser diferente do esperado e que isso é normal.',
         'Jogar moedas e girar a roleta dá movimento. Registros curtos e rápidos.'],
        ['Bloco 1: 1/4. Bloco 2: 8. Bloco 3: banana.', 'Bloco 1: resultados do experimento, perto de 10 e 10. Bloco 2: 2 gols; 4. Bloco 3: a pé; 100 estudantes.',
         'Bloco 1: amostra, porque perguntar a todos leva muito tempo; sortear estudantes de todas as turmas. Bloco 2: 20 graus; 7 graus; sim, as temperaturas ficam perto da média. Bloco 3: a soma passa de 100% (dá 110%). Bloco 4: planejamento próprio.'],
        a, b, c)


FICHAS = [multiplos_porcentagem, inteiros, algoritmos, fracoes_razoes, racionais, variavel_sequencias, proporcionalidade7, equacoes,
          transformacoes, simetrias, circunferencia, paralelas_transversal, triangulos7, poligonos_mosaicos, volume_areas, estatistica7]
