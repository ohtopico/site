"""Desenhos (SVG) das atividades de computação desplugada. Traço preto em fundo branco, cor só em detalhes.
Cada SVG tem um aria-label que descreve tudo o que importa: é ele que vira o texto da figura na versão em braille."""
import math

F = 'font-family="Lexend" font-weight="600"'


def svg(w, h, corpo, desc, largura=None, classe='fig-dp'):
    estilo = f' style="width:{largura}"' if largura else ''
    return (f'<svg class="{classe}" viewBox="0 0 {w} {h}"{estilo} role="img" aria-label="{desc}">'
            f'{corpo}</svg>')


def txt(x, y, t, tam=5, ancora='middle', peso='600'):
    return f'<text x="{x}" y="{y}" font-size="{tam}" text-anchor="{ancora}" font-family="Lexend" font-weight="{peso}">{t}</text>'


# ---------- cartões de pontos (binário) ----------

def cartao_pontos(x, y, n, w=34, h=44, numero=True):
    s = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="#fff" stroke="#111" stroke-width="1"/>'
    cols = {1: 1, 2: 2, 4: 2, 8: 2, 16: 4, 32: 4}[n]
    lins = math.ceil(n / cols)
    area_h = h - (10 if numero else 4)
    dx, dy = w / (cols + 1), area_h / (lins + 1)
    r = min(dx, dy) * .32
    for i in range(n):
        c, l = i % cols, i // cols
        s += f'<circle cx="{x + dx * (c + 1):.2f}" cy="{y + 2 + dy * (l + 1):.2f}" r="{r:.2f}" fill="#111"/>'
    if numero:
        s += txt(x + w / 2, y + h - 3, n, 6)
    return s


def fila_cartoes(valores, numero=False, w=30, h=40, gap=5, desc=None, largura=None):
    corpo = ''.join(cartao_pontos(i * (w + gap) + 1, 1, v, w, h, numero) for i, v in enumerate(valores))
    total = len(valores) * (w + gap) - gap + 2
    desc = desc or ('cartões de pontos, da esquerda para a direita, com ' + ', '.join(str(v) for v in valores) + ' pontos')
    return svg(total, h + 2, corpo, desc, largura)


# ---------- grade de quadradinhos (pixels, paridade) ----------

def grade(linhas, cel=6, vazias=(), extra_col=False, extra_lin=False, desc='grade', numeros=True, largura=None, marcar=None):
    """linhas: lista de strings com '#' (preto) e '.' (branco). vazias: índices de linhas em branco para pintar.
    extra_col/extra_lin: coluna/linha de paridade tracejada no fim (vazia, ou preenchida se a string tiver mais letras)."""
    n_l, n_c = len(linhas), max(len(l) for l in linhas)
    m = 7 if numeros else 1
    s = ''
    for li, linha in enumerate(linhas):
        for ci in range(n_c):
            ch = linha[ci] if ci < len(linha) else '?'
            x, y = m + ci * cel, m + li * cel
            paridade = (extra_col and ci == n_c - 1) or (extra_lin and li == n_l - 1)
            preto = ch == '#' and li not in vazias
            tracejado = ' stroke-dasharray="1.2 .8"' if paridade else ''
            s += (f'<rect x="{x}" y="{y}" width="{cel}" height="{cel}" fill="{"#111" if preto else "#fff"}" '
                  f'stroke="#111" stroke-width="{.5 if not paridade else .6}"{tracejado}/>')
        if numeros:
            s += txt(m - 3.5, m + li * cel + cel * .68, li + 1, 3.6)
    if numeros:
        for ci in range(n_c):
            s += txt(m + ci * cel + cel / 2, m - 2.2, ci + 1, 3.6)
    if marcar:
        li, ci = marcar
        s += f'<circle cx="{m + ci * cel + cel / 2}" cy="{m + li * cel + cel / 2}" r="{cel * .42}" fill="none" stroke="#c0392b" stroke-width="1"/>'
    return svg(m + n_c * cel + 1, m + n_l * cel + 1, s, desc, largura)


def descrever_grade(linhas, vazias=()):
    partes = []
    for i, l in enumerate(linhas):
        if i in vazias:
            partes.append(f'linha {i + 1}: em branco, para pintar')
        else:
            partes.append(f'linha {i + 1}: ' + ' '.join('P' if c == '#' else 'B' for c in l))
    return '; '.join(partes)


def codigo_linha(linha):
    """Código de corrida: brancos, pretos, brancos... (começa com 0 se a linha começa preta)."""
    out, atual, n = [], '.', 0
    for c in linha:
        if c == atual:
            n += 1
        else:
            out.append(n)
            atual, n = c, 1
    out.append(n)
    return out


# ---------- malha de pontos (ditado de figuras) ----------

COLS = 'ABCDEF'


def malha(segmentos=(), n=6, cel=11, desc='malha de pontos', largura=None):
    """Pontos A1 a F6 (A1 no alto à esquerda). segmentos: lista de ('A1', 'C3')."""
    m = 8

    def pos(p):
        return m + COLS.index(p[0]) * cel, m + (int(p[1:]) - 1) * cel

    s = ''
    for a, b in segmentos:
        (x1, y1), (x2, y2) = pos(a), pos(b)
        s += f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#111" stroke-width="1.4" stroke-linecap="round"/>'
    for c in range(n):
        s += txt(m + c * cel, 3.6, COLS[c], 4)
        for l in range(n):
            s += f'<circle cx="{m + c * cel}" cy="{m + l * cel}" r="1.1" fill="#111"/>'
    for l in range(n):
        s += txt(2.2, m + l * cel + 1.4, l + 1, 4)
    t = m + (n - 1) * cel + 5
    return svg(t, t, s, desc, largura)


# ---------- grafos com peso ----------

def grafo(nos, arestas, w, h, desc, largura=None, r=6.5, fs=4.6, quebradas=()):
    """nos: {nome: (x, y)}; arestas: (a, b, peso). quebradas: pares (a, b) desenhados tracejados com X."""
    s = ''
    for a, b, p in arestas:
        (x1, y1), (x2, y2) = nos[a], nos[b]
        q = (a, b) in quebradas or (b, a) in quebradas
        s += f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#111" stroke-width="1"{" stroke-dasharray=\"2 1.6\"" if q else ""}/>'
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        rot = 'X' if q else p
        s += (f'<rect x="{mx - 3.8}" y="{my - 3}" width="7.6" height="6" rx="1.2" fill="#fff" stroke="#111" stroke-width=".5"/>'
              + txt(mx, my + 1.6, rot, 4.4))
    for nome, (x, y) in nos.items():
        rr = max(r, len(nome) * fs * .3 + 2.2)
        s += (f'<ellipse cx="{x}" cy="{y}" rx="{rr}" ry="{r}" fill="#fff9c2" stroke="#111" stroke-width="1"/>'
              + txt(x, y + fs * .36, nome, fs))
    return svg(w, h, s, desc, largura)


def descrever_grafo(arestas, unidade='', quebradas=()):
    partes = []
    for a, b, p in arestas:
        if (a, b) in quebradas or (b, a) in quebradas:
            partes.append(f'{a} com {b} (quebrada)')
        else:
            partes.append(f'{a} com {b}: {p}{unidade}')
    return '; '.join(partes)


# ---------- rede de ordenação ----------

def rede(entradas, comparadores, passos, desc, valores=None, largura=None):
    """4 fios na horizontal; comparadores (i, j) agrupados em passos. Uma coluna de caixinhas na entrada e depois de cada passo.
    valores: lista de colunas (entrada, depois de cada passo) para o exemplo resolvido; None deixa as caixas em branco."""
    n = len(entradas) if entradas else 4
    dy, caixa, zona = 13, 13, 18
    xs = [2 + k * (caixa + zona) for k in range(len(passos) + 1)]
    w = xs[-1] + caixa + 2
    h = dy * (n - 1) + 16
    s = ''
    for i in range(n):
        y = 8 + i * dy
        s += f'<line x1="{xs[0] + caixa}" y1="{y}" x2="{xs[-1]}" y2="{y}" stroke="#111" stroke-width=".9"/>'
    for c, x in enumerate(xs):
        for i in range(n):
            y = 8 + i * dy
            v = entradas[i] if c == 0 and entradas else (valores[c][i] if valores else '')
            s += f'<rect x="{x}" y="{y - 4.5}" width="{caixa}" height="9" rx="1.5" fill="#fff" stroke="#111" stroke-width=".8"/>'
            if v != '':
                s += txt(x + caixa / 2, y + 1.8, v, 5)
    for k, passo in enumerate(passos):
        meio = xs[k] + caixa + zona / 2
        base = meio - (len(passo) - 1) * 2.5
        for j, (a, b) in enumerate(passo):
            x = base + j * 5
            y1, y2 = 8 + a * dy, 8 + b * dy
            s += (f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="#16703a" stroke-width="1.4"/>'
                  f'<circle cx="{x}" cy="{y1}" r="1.6" fill="#111"/><circle cx="{x}" cy="{y2}" r="1.6" fill="#111"/>')
        s += txt(meio, h - 1, f'passo {k + 1}', 3.6, peso='400')
    return svg(w, h, s, desc, largura)


def ordenar_rede(entradas, passos):
    cols = [list(entradas)]
    v = list(entradas)
    for passo in passos:
        for a, b in passo:
            if v[a] > v[b]:
                v[a], v[b] = v[b], v[a]
        cols.append(list(v))
    return cols


# ---------- torre de Hanói ----------

def hanoi(discos=3, desc='torre de Hanói', largura=None):
    w, h = 150, 50
    s = f'<rect x="4" y="{h - 8}" width="{w - 8}" height="5" rx="1.5" fill="#fff" stroke="#111" stroke-width="1"/>'
    for k, nome in enumerate('ABC'):
        x = 28 + k * 47
        s += f'<rect x="{x - 1.4}" y="8" width="2.8" height="{h - 16}" fill="#111"/>' + txt(x, 6, nome, 5)
    for d in range(discos):
        larg = 34 - d * 8
        y = h - 8 - (d + 1) * 7
        s += (f'<rect x="{28 - larg / 2}" y="{y}" width="{larg}" height="6.4" rx="2" fill="#fff36b" stroke="#111" stroke-width="1"/>'
              + txt(28, y + 4.8, discos - d, 4.4))
    return svg(w, h, s, desc, largura)


# ---------- autômato ----------

def automato(desc, largura=None):
    """Fechadura com dois botões, A e B: abre quando a última sequência apertada é A e depois B."""
    est = {'Fechada': (26, 44), 'Quase': (86, 44), 'Aberta': (146, 44)}
    s = ('<defs><marker id="seta-dp" viewBox="0 0 6 6" refX="5.4" refY="3" markerWidth="5" markerHeight="5" orient="auto">'
         '<path d="M0 0 L6 3 L0 6 Z" fill="#111"/></marker></defs>')
    r = 13

    def arco(d, rot, tx, ty):
        return (f'<path d="{d}" fill="none" stroke="#111" stroke-width="1" marker-end="url(#seta-dp)"/>'
                f'<rect x="{tx - 4}" y="{ty - 4.2}" width="8" height="6.4" rx="1.4" fill="#fff" stroke="#111" stroke-width=".5"/>'
                + txt(tx, ty + .9, rot, 4.6))

    (x0, y0), (x1, y1), (x2, y2) = est['Fechada'], est['Quase'], est['Aberta']
    s += arco(f'M{x0 + r} {y0 - 3} L{x1 - r} {y1 - 3}', 'A', (x0 + x1) / 2, y0 - 3)
    s += arco(f'M{x1 + r} {y1 - 3} L{x2 - r} {y2 - 3}', 'B', (x1 + x2) / 2, y1 - 3)
    s += arco(f'M{x2 - r + 2} {y2 + 7} Q{(x1 + x2) / 2} {y2 + 22} {x1 + r - 2} {y1 + 7}', 'A', (x1 + x2) / 2, y1 + 15)
    s += arco(f'M{x2 - 4} {y2 + r - 1} Q{x1} {y2 + 52} {x0 + 4} {y0 + r - 1}', 'B', x1, y1 + 27.5)
    s += arco(f'M{x0 - 6} {y0 - r + 1} C{x0 - 18} {y0 - 36} {x0 + 18} {y0 - 36} {x0 + 6} {y0 - r + 1}', 'B', x0, y0 - 27)
    s += arco(f'M{x1 - 6} {y1 - r + 1} C{x1 - 18} {y1 - 36} {x1 + 18} {y1 - 36} {x1 + 6} {y1 - r + 1}', 'A', x1, y1 - 27)
    s += f'<path d="M2 {y0} L{x0 - r} {y0}" stroke="#111" stroke-width="1" marker-end="url(#seta-dp)"/>'
    for nome, (x, y) in est.items():
        s += f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff9c2" stroke="#111" stroke-width="1"/>'
        if nome == 'Aberta':
            s += f'<circle cx="{x}" cy="{y}" r="{r - 2.2}" fill="none" stroke="#111" stroke-width=".8"/>'
        s += txt(x, y + 1.7, nome, 4.8)
    return svg(172, 86, s, desc, largura)


# ---------- régua do alfabeto ----------

ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


def regua_alfabeto():
    cab = ''.join(f'<th>{c}</th>' for c in ALFABETO)
    num = ''.join(f'<td>{i}</td>' for i in range(26))
    return f'<table class="regua-alfabeto"><tbody><tr>{cab}</tr><tr>{num}</tr></tbody></table>'


def vigenere(texto, chave, sinal=1):
    out = []
    for i, c in enumerate(texto):
        k = ALFABETO.index(chave[i % len(chave)])
        out.append(ALFABETO[(ALFABETO.index(c) + sinal * k) % 26])
    return ''.join(out)
