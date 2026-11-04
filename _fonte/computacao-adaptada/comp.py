"""Peças das fichas de computação adaptada. Reaproveita as peças das fichas de matemática adaptada
(bloco, grade, item, opcoes, tabela...) e acrescenta as de computação: código, grafo, labirinto, cartões, marcar."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'matematica-adaptada'))
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, resposta, tabela  # noqa: E402,F401
from ano3 import frases, ligar  # noqa: E402,F401

CAIXA = '<span class="marcar"></span>'


def ficha(slug, titulo, cod, resumo, material, passos, perfis, gabarito, A, B, C, tempo='40 a 50 minutos', origem=None):
    """Uma ficha por habilidade. perfis = (down, tea, tdah); gabarito = (A, B, C)."""
    return dict(slug=slug, titulo=titulo, codigo=cod, resumo=resumo, tempo=tempo, material=material, passos=passos,
                perfis=dict(zip(('down', 'tea', 'tdah'), perfis)), gabarito=dict(zip('ABC', gabarito)),
                versoes={'A': A, 'B': B, 'C': C}, original=origem or titulo)


def p(t, classe=''):
    return f'<p class="txt{" " + classe if classe else ""}">{t}</p>'


def caixa_texto(t, classe=''):
    """Quadro com um texto para ler (mensagem, post, cláusula...)."""
    return f'<div class="quadro-texto {classe}">{t}</div>'


def codigo(t):
    linhas_ = t.strip('\n').split('\n')
    return '<pre class="codigo">' + '\n'.join(l.replace('&', '&amp;').replace('<', '&lt;') for l in linhas_) + '</pre>'


def cartoes(lista, colunas=4, classe=''):
    return f'<div class="cartoes-co {classe}" style="--colunas:{colunas}">' + ''.join(f'<span>{t}</span>' for t in lista) + '</div>'


def marcar(frases_, colunas, exemplo=None, largura='22mm'):
    """Tabela de marcar: cada frase numa linha, uma caixinha por coluna. exemplo=(linha, coluna) já marcado."""
    th = '<th>Frase</th>' + ''.join(f'<th style="width:{largura}">{c}</th>' for c in colunas)
    trs = ''
    for i, f in enumerate(frases_):
        cel = ''
        for j, _ in enumerate(colunas):
            marcado = exemplo is not None and exemplo == (i, j)
            cel += f'<td class="centro"><span class="marcar{" feito" if marcado else ""}"></span></td>'
        trs += f'<tr{" class=\"ex\"" if exemplo is not None and exemplo[0] == i else ""}><td>{f}</td>{cel}</tr>'
    return f'<table class="tabela-folha marcar-tab"><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>'


def ordenar(itens, exemplo=None, colunas=1):
    """Itens para numerar na ordem. exemplo=(índice, número) já preenchido."""
    li = ''
    for i, t in enumerate(itens):
        v = exemplo[1] if exemplo and exemplo[0] == i else None
        li += f'<div class="ordem">{resposta(v)}<span>{t}</span></div>'
    return f'<div class="ordenar" style="--colunas:{colunas}">{li}</div>'


def escolha(perguntas, colunas=1):
    """Lista de (pergunta, [opções], certa_ou_None): circular a resposta."""
    return f'<div class="escolhas" style="--colunas:{colunas}">' + ''.join(
        f'<div class="escolha"><p>{q}</p>{opcoes(op, certa=c)}</div>' for q, op, c in perguntas) + '</div>'


def resp_linha(rotulo=''):
    return f'<p class="resp-co">{rotulo} <span class="linha-resp"></span></p>'


def caixas(rotulos, colunas=2, altura='26mm'):
    return f'<div class="caixas-co" style="--colunas:{colunas}">' + ''.join(
        f'<div class="caixa-co" style="min-height:{altura}"><b>{r}</b></div>' for r in rotulos) + '</div>'


def vetor(valores, rotulo_indice=True, vazias=()):
    cel = ''.join(f'<span class="cel{" vazia" if i in vazias else ""}"><b>{"" if i in vazias else v}</b>'
                  f'{f"<i>{i}</i>" if rotulo_indice else ""}</span>' for i, v in enumerate(valores))
    return f'<div class="vetor">{cel}</div>'


def grafo(nos, arestas, w=120, h=60, r=7.5, fs=6, marcar_x=(), desc='grafo'):
    """nos: {nome: (x, y)}; arestas: lista de (a, b) ou (a, b, rótulo). marcar_x: arestas quebradas."""
    s = ''
    for a in arestas:
        x1, y1 = nos[a[0]]
        x2, y2 = nos[a[1]]
        quebrada = (a[0], a[1]) in marcar_x
        s += (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="#111" stroke-width="1"'
              f'{" stroke-dasharray=\"2 1.6\"" if quebrada else ""}/>')
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        if len(a) > 2 and a[2]:
            s += (f'<rect x="{mx - 3.6}" y="{my - 2.8}" width="7.2" height="5.6" rx="1.2" fill="#fff" stroke="#111" stroke-width=".5"/>'
                  f'<text x="{mx}" y="{my + 1.5}" font-size="4.6" text-anchor="middle" font-family="Lexend" font-weight="600">{a[2]}</text>')
        if quebrada:
            s += f'<text x="{mx}" y="{my + 2.2}" font-size="7" text-anchor="middle" font-family="Lexend" font-weight="600">X</text>'
    for n, (x, y) in nos.items():
        rr = max(r, len(n) * fs * .33 + 2)
        s += (f'<ellipse cx="{x}" cy="{y}" rx="{rr}" ry="{r}" fill="#fff9c2" stroke="#111" stroke-width="1"/>'
              f'<text x="{x}" y="{y + fs * .36}" font-size="{fs}" text-anchor="middle" font-family="Lexend" font-weight="600">{n}</text>')
    return f'<svg class="grafo" viewBox="0 0 {w} {h}" role="img" aria-label="{desc}">{s}</svg>'


def labirinto(n, paredes, robo, alvo, cel=13, extras=None, desc='labirinto'):
    """Grade n x n. paredes: células bloqueadas (col, lin). robo: (col, lin, direção) com direção em 'NSLO'.
    alvo: (col, lin). extras: {(col, lin): 'texto'}."""
    s = ''
    for c in range(n):
        for l in range(n):
            x, y = c * cel, l * cel
            fill = '#111' if (c, l) in paredes else '#fff'
            s += f'<rect x="{x}" y="{y}" width="{cel}" height="{cel}" fill="{fill}" stroke="#111" stroke-width=".6"/>'
    ax, ay = alvo
    s += (f'<circle cx="{ax * cel + cel / 2}" cy="{ay * cel + cel / 2}" r="{cel * .32}" fill="#fff36b" stroke="#111" stroke-width=".8"/>'
          f'<circle cx="{ax * cel + cel / 2}" cy="{ay * cel + cel / 2}" r="{cel * .12}" fill="#111"/>')
    for (c, l), t in (extras or {}).items():
        s += f'<text x="{c * cel + cel / 2}" y="{l * cel + cel * .66}" font-size="{cel * .5}" text-anchor="middle" font-family="Lexend" font-weight="600">{t}</text>'
    rc, rl, d = robo
    cx, cy = rc * cel + cel / 2, rl * cel + cel / 2
    ang = {'L': 0, 'S': 90, 'O': 180, 'N': 270}[d]
    k = cel * .36
    s += (f'<g transform="translate({cx} {cy}) rotate({ang})"><rect x="{-k}" y="{-k}" width="{2 * k}" height="{2 * k}" rx="1.6" fill="#fff" stroke="#111" stroke-width=".9"/>'
          f'<path d="M{-k * .3} {-k * .55} L{k * .75} 0 L{-k * .3} {k * .55} Z" fill="#111"/></g>')
    t = n * cel
    return f'<svg class="labirinto" viewBox="-1 -1 {t + 2} {t + 2}" role="img" aria-label="{desc}">{s}</svg>'


def seta(d):
    """Cartão de comando com seta: F (frente), E (vira à esquerda), D (vira à direita)."""
    simb = {'F': '↑', 'E': '↶', 'D': '↷'}[d]
    return f'<span class="cmd">{simb}</span>'


def comandos(seq, vazios=0):
    return '<div class="cmds">' + ''.join(seta(c) for c in seq) + '<span class="cmd vazio"></span>' * vazios + '</div>'


def quadro_ex(conteudo):
    """Exemplo resolvido destacado (borda tracejada e selo)."""
    return f'<div class="item exemplo ex-co"><span class="selo-exemplo">Exemplo</span>{conteudo}</div>'
