"""Peças das folhas para imprimir do ano a ano (A4, fundo branco, cor só nos detalhes).

Usa o estilo das fichas adaptadas (/matematica-adaptada/assets/fichas.css) e acrescenta ano-a-ano.css.
Do 1º ao 3º ano as folhas têm pouca leitura: a professora lê a instrução e a criança circula, liga, pinta, numera ou desenha.
"""
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.append(str(AQUI.parent / 'matematica-adaptada'))
from fichas import bloco, caixa_desenho, linhas, tabela  # noqa: E402,F401
from figuras import fig, NOMES  # noqa: E402


def p(t):
    return f'<p class="txt">{t}</p>'


def figs(lista, tam=22, cls=''):
    """Fila de figuras (mm). None vira um quadrado vazio para desenhar."""
    out = ''
    for s in lista:
        if s is None:
            out += f'<span class="aa-fig vazio" style="--t:{tam}mm"></span>'
        else:
            out += f'<span class="aa-fig {cls}" style="--t:{tam}mm">{figura(s)}</span>'
    return f'<div class="aa-fila">{out}</div>'


def figura(s):
    """Spec como nos jogos: 'maca', 'circulo:azul', '!gato'."""
    if isinstance(s, dict):
        if 'txt' in s:
            return f'<b class="aa-txt">{s["txt"]}</b>'
        if 'cor' in s:
            return f'<i class="aa-cor" data-cor="{s["cor"]}"></i>'
        return fig(s['f'], s.get('c'), riscada=s.get('x', False), claro=not s.get('c'))
    contorno = s.startswith('~')
    s = s.lstrip('~')
    riscada = s.startswith('!')
    s = s.lstrip('!')
    nome, _, cor = s.partition(':')
    # formas com cor pedida (código de cores) mantêm a cor; o resto sai em cores claras para gastar pouca tinta
    return fig(nome, cor or None, riscada=riscada, claro=not cor, contorno=contorno)


def circular(lista, tam=24):
    """Figuras em caixinhas, para circular a certa (ou as certas)."""
    return '<div class="aa-circular">' + ''.join(f'<span class="aa-op" style="--t:{tam}mm">{figura(s)}</span>' for s in lista) + '</div>'


def numerar(lista, tam=24):
    """Figuras com um quadradinho embaixo para numerar a ordem (1, 2, 3...)."""
    return '<div class="aa-circular">' + ''.join(
        f'<span class="aa-num" style="--t:{tam}mm">{figura(s)}<i></i></span>' for s in lista) + '</div>'


def ligar(esq, dir_, tam=20):
    """Duas colunas de figuras com pontos para ligar (já embaralhadas por quem chama)."""
    linhas_ = ''.join(f'<div class="aa-ligar-par"><span class="aa-fig" style="--t:{tam}mm">{figura(a)}</span><span class="ponto"></span>'
                      f'<span></span><span class="ponto"></span><span class="aa-fig" style="--t:{tam}mm">{figura(b)}</span></div>'
                      for a, b in zip(esq, dir_))
    return f'<div class="aa-ligar">{linhas_}</div>'


def caixas_separar(rotulos, altura='38mm', tam=14):
    """Caixas grandes com um rótulo (figura ou cor) para desenhar ou colar dentro."""
    out = ''
    for r in rotulos:
        out += f'<div class="aa-caixa" style="height:{altura}"><span class="aa-fig" style="--t:{tam}mm">{figura(r)}</span></div>'
    return f'<div class="aa-caixas" style="--n:{len(rotulos)}">{out}</div>'


def grade_pintar(grade, simbolos, cel=11):
    """Quadriculado com uma forma pequena em cada casa, para pintar pelo código."""
    cols = max(len(l) for l in grade)
    casas = ''
    for l in grade:
        for s in l.ljust(cols):
            casas += '<span class="vazia"></span>' if s == ' ' else f'<span>{figura(simbolos[s] + ":branco") if ":" not in simbolos[s] else figura(simbolos[s])}</span>' if s in simbolos else f'<span><b>{s}</b></span>'
    return f'<div class="aa-pintar" style="--cols:{cols};--cel:{cel}mm">{casas}</div>'


def legenda(pares):
    """pares: lista de (figura, cor). Mostra 'figura = bolinha da cor' com o nome da cor."""
    return '<div class="aa-legenda">' + ''.join(
        f'<span>{figura(f)}<b>=</b><i class="aa-cor" data-cor="{c}"></i><em>{c}</em></span>' for f, c in pares) + '</div>'


def malha(cols, rows, inicio, alvos=(), paredes=(), pers='robo', alvo='estrela', parede='arvore', cel=16, marcar=None):
    """Malha para programar com setas no papel."""
    casas = ''
    for y in range(rows):
        for x in range(cols):
            c = ''
            if [x, y] == list(inicio):
                c = figura(pers)
            elif [x, y] in [list(a) for a in alvos]:
                c = figura(alvo)
            elif [x, y] in [list(a) for a in paredes]:
                c = figura(parede)
            cls = ' class="marca"' if marcar and [x, y] == list(marcar) else ''
            casas += f'<span{cls}>{c}</span>'
    return f'<div class="aa-malha" style="--cols:{cols};--cel:{cel}mm">{casas}</div>'


SETA = {'d': '→', 'e': '←', 'c': '↑', 'b': '↓', 'f': '⇧', 'gd': '↻', 'ge': '↺'}


def _seta(s, tam):
    """'d' é uma seta; ('d', 3) ou 'd3' é a seta com três bolinhas embaixo (repetir 3 vezes), como no jogo."""
    if isinstance(s, str) and len(s) == 2 and s[0] in 'decb' and s[1].isdigit():
        s = (s[0], int(s[1]))
    if isinstance(s, tuple):
        d, n = s
        return f'<span class="aa-seta rep" style="--t:{tam}mm">{SETA.get(d, d)}<i>{"<b></b>" * n}</i></span>'
    return f'<span class="aa-seta" style="--t:{tam}mm">{SETA.get(s, s)}</span>'


def setas(seq, vazias=0, tam=12):
    """Fila de setas (programa). vazias = quadradinhos em branco no fim para completar."""
    out = ''.join(_seta(s, tam) for s in seq)
    out += '<span class="aa-seta vazia"></span>' * vazias
    return f'<div class="aa-setas">{out}</div>'


def vagas_setas(n, tam=12):
    return setas([], n, tam)


def certo_errado(cenas, tam=18):
    """Linhas com uma cena (figuras) e as carinhas certo/errado para circular."""
    out = ''
    for cena in cenas:
        out += (f'<div class="aa-ce"><div class="aa-fila">' + ''.join(f'<span class="aa-fig" style="--t:{tam}mm">{figura(s)}</span>' for s in cena) +
                f'</div><div class="aa-circular mini"><span class="aa-op" style="--t:13mm">{fig("certo", claro=True)}</span><span class="aa-op" style="--t:13mm">{fig("errado", claro=True)}</span></div></div>')
    return f'<div class="aa-ces">{out}</div>'


def desenho(altura='50mm', rotulo=''):
    return caixa_desenho(altura, rotulo)


def escrever(n=2):
    return linhas(n)


def lado(*blocos):
    """Blocos lado a lado (duas colunas) para a folha caber numa página."""
    return '<div class="aa-lado">' + ''.join(f'<div>{b}</div>' for b in blocos) + '</div>'
