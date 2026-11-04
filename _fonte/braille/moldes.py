"""Moldes táteis: cada figura da ficha ampliada, com traço grosso, sem cor (texturas no lugar das cores)
e a etiqueta braille de cada texto, mais a página de instruções de montagem. Fundo branco (vai para a impressora)."""
import html
import re

from braille import texto_braille

TEXTURAS = [  # (nome, sugestão de material); o desenho de cada uma está em linhas_textura()
    ('listras inclinadas', 'EVA'),
    ('listras cruzadas', 'lixa fina'),
    ('quadriculado', 'feltro ou tecido'),
    ('listras deitadas', 'papelão ondulado'),
    ('listras em pé', 'papel camurça'),
]

INSTRUCOES = [
    ('Material', 'Folha impressa (de preferência papel 180 g ou colada sobre papelão), cola relevo ou cola colorida em bisnaga, '
     'barbante fino, EVA, lixa, feltro, botões ou miçangas, tesoura e reglete ou rotuladora braille para as etiquetas.'),
    ('Linhas', 'Passe cola relevo por cima de cada linha grossa, ou cole barbante sobre ela. Use o mesmo material para '
     'o mesmo tipo de linha em todos os moldes: o estudante aprende o que cada textura quer dizer.'),
    ('Pontos pretos', 'Cada ponto preto vira um botão, uma miçanga ou uma gota grossa de cola relevo.'),
    ('Texturas', 'Onde a figura em tinta tinha cor, o molde tem uma textura. Recorte o material indicado na legenda '
     'no formato da área e cole por cima.'),
    ('Etiquetas', 'Cada texto da figura tem a etiqueta em braille ao lado (em cinza, só para o professor copiar). '
     'Escreva a etiqueta na reglete ou na rotuladora e cole perto do texto em tinta, sem encostar nas linhas.'),
    ('Conferir', 'Espere secar (a cola relevo leva até 24 horas) e passe o dedo: entre duas linhas precisa haver '
     'pelo menos 3 mm, e o molde não pode ter detalhes que só atrapalham. Se ficar cheio demais, tire o que não '
     'for necessário para a atividade.'),
    ('Apresentar', 'Guie a mão do estudante: primeiro o contorno inteiro, depois as partes, depois as etiquetas. '
     'Leia a descrição da figura junto. A descrição também está no arquivo braille (.brf), no mesmo número.'),
]


def _cor_rgb(c):
    c = c.strip().lower()
    nomes = {'white': 'ffffff', 'black': '000000'}
    if c in nomes:
        c = '#' + nomes[c]
    m = re.fullmatch(r'#([0-9a-f]{3}|[0-9a-f]{6})', c)
    if not m:
        return None
    h = m.group(1)
    if len(h) == 3:
        h = ''.join(x * 2 for x in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def _luz(rgb):
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]


COR_TEXTURA = {  # mesma cor, mesma textura em todos os moldes
    '#fff3a8': ('amarelo', 0), '#fff9c2': ('amarelo', 0), '#fff36b': ('amarelo', 0),
    '#fbdcd8': ('rosa', 1), '#ef8a8a': ('vermelho', 1),
    '#d8f0de': ('verde', 2), '#f1e3cf': ('bege', 3), '#ffe2c7': ('laranja', 4),
}


def linhas_textura(i, x0, y0, x1, y1, passo):
    """Desenho da textura i cobrindo o retângulo (x0, y0)-(x1, y1), como um único path (leve no PDF)."""
    d = []
    larg, alt = x1 - x0, y1 - y0
    if i == 0:  # listras inclinadas
        k = 0
        while k < larg + alt:
            d.append(f'M{x0 + k - alt:.1f} {y1:.1f}L{x0 + k:.1f} {y0:.1f}')
            k += passo
        return f'<path class="tx" d="{"".join(d)}" stroke="#000" stroke-width="{passo * .16:.2f}" fill="none"/>'
    if i == 1:  # listras cruzadas (as duas inclinações)
        k = 0
        while k < larg + alt:
            d.append(f'M{x0 + k - alt:.1f} {y1:.1f}L{x0 + k:.1f} {y0:.1f}M{x0 + k - alt:.1f} {y0:.1f}L{x0 + k:.1f} {y1:.1f}')
            k += passo * 1.2
        return f'<path class="tx" d="{"".join(d)}" stroke="#000" stroke-width="{passo * .12:.2f}" fill="none"/>'
    if i == 2:  # quadriculado
        y = y0
        while y < y1:
            d.append(f'M{x0:.1f} {y:.1f}H{x1:.1f}')
            y += passo
        x = x0
        while x < x1:
            d.append(f'M{x:.1f} {y0:.1f}V{y1:.1f}')
            x += passo
        return f'<path class="tx" d="{"".join(d)}" stroke="#000" stroke-width="{passo * .13:.2f}" fill="none"/>'
    if i == 3:  # listras deitadas
        y = y0 + passo / 3
        while y < y1:
            d.append(f'M{x0:.1f} {y:.1f}H{x1:.1f}')
            y += passo
        return f'<path class="tx" d="{"".join(d)}" stroke="#000" stroke-width="{passo * .22:.2f}" fill="none"/>'
    x = x0 + passo / 3  # listras em pé
    while x < x1:
        d.append(f'M{x:.1f} {y0:.1f}V{y1:.1f}')
        x += passo
    return f'<path class="tx" d="{"".join(d)}" stroke="#000" stroke-width="{passo * .22:.2f}" fill="none"/>'


def caixa(tag):
    """Retângulo aproximado que contém a forma (nas coordenadas dela)."""
    def at(n):
        m = re.search(rf'\s{n}="([\d.\-]+)"', tag)
        return float(m.group(1)) if m else 0.0
    if tag.startswith('<circle'):
        r = at('r')
        return at('cx') - r, at('cy') - r, at('cx') + r, at('cy') + r
    if tag.startswith('<ellipse'):
        return at('cx') - at('rx'), at('cy') - at('ry'), at('cx') + at('rx'), at('cy') + at('ry')
    if tag.startswith('<rect'):
        return at('x'), at('y'), at('x') + at('width'), at('y') + at('height')
    m = re.search(r'\s(?:d|points)="([^"]*)"', tag)
    nums = [float(x) for x in re.findall(r'-?\d+(?:\.\d+)?', m.group(1))] if m else []
    if not nums:
        return None
    return min(nums), min(nums), max(nums), max(nums)


def tatil(svg, prefixo='f'):
    """Devolve (svg pronto para molde, lista de (nome da cor, índice da textura) usadas).
    Cada forma colorida fica branca e ganha por cima a textura recortada no formato dela (clipPath)."""
    svg = svg.replace('viewbox=', 'viewBox=')
    vb = re.search(r'viewBox="([\d.\-]+) ([\d.\-]+) ([\d.]+) ([\d.]+)"', svg)
    vx, vy, w, h = (float(vb.group(k)) for k in range(1, 5)) if vb else (0, 0, 300, 200)
    passo = max(w / 34, 6)
    usadas, clips = [], []
    textos = [(float(a), float(b)) for a, b in re.findall(r'<text[^>]*?\sx="([\d.\-]+)"[^>]*?\sy="([\d.\-]+)"', svg)]

    def troca_forma(m):
        tag = m.group(0)
        f = re.search(r'\sfill="([^"]+)"', tag)
        if not f:
            return tag
        cor = f.group(1).strip().lower()
        rgb = _cor_rgb(cor)
        if rgb is None:
            return tag
        if _luz(rgb) > 0.98:
            return tag.replace(f.group(0), ' fill="#fff"')
        if _luz(rgb) < 0.25:
            return tag.replace(f.group(0), ' fill="#000"')
        nome, i = COR_TEXTURA.get(cor, ('colorido', 0))
        cx_ = caixa(re.sub(r'\stransform="[^"]*"', '', tag))
        if not re.search(r'\stransform=', tag) and cx_ and any(cx_[0] <= x <= cx_[2] and cx_[1] <= y <= cx_[3] for x, y in textos):
            return tag.replace(f.group(0), ' fill="#fff"')  # forma com texto dentro (caixa, nó): fica lisa para o texto ser lido
        if (nome, i) not in usadas:
            usadas.append((nome, i))
        branca = tag.replace(f.group(0), ' fill="#fff"')
        tr = re.search(r'\stransform="([^"]*)"', tag)
        forma = re.sub(r'\s(transform|stroke|stroke-width|stroke-dasharray|id|class)="[^"]*"', '', tag)
        cid = f'{prefixo}cl{len(clips)}'
        clips.append(f'<clipPath id="{cid}">{forma}</clipPath>')
        g_tr = f' transform="{tr.group(1)}"' if tr else ''
        x0, y0, x1, y1 = caixa(forma) or (vx, vy, vx + w, vy + h)
        p = min(passo, max((x1 - x0), (y1 - y0)) / 4) if x1 > x0 else passo
        return branca + f'<g clip-path="url(#{cid})"{g_tr}>{linhas_textura(i, x0 - p, y0 - p, x1 + p, y1 + p, max(p, 2))}</g>'

    s = re.sub(r'<(rect|circle|ellipse|path|polygon)\b[^>]*?(?:/>|>\s*</\1>)', troca_forma, svg)
    s = re.sub(r'(<svg[^>]*?)\s(width|height)="[^"]*"', r'\1', s)
    s = re.sub(r'(<svg[^>]*?)\s(width|height)="[^"]*"', r'\1', s)
    s = re.sub(r'(<svg[^>]*>)', lambda m: m.group(1) + f'<defs>{"".join(clips)}</defs>', s, count=1)
    return s, usadas


def escrever(destino, titulo, ano, figuras, area):
    e = html.escape
    cartoes = ''
    for f in figuras:
        svg, usadas = tatil(f['svg'], f'm{f["n"]}')
        legenda = ''.join(f'<li><span class="amostra"><svg viewBox="0 0 30 18"><defs><clipPath id="am{f["n"]}-{i}"><rect x="1" y="1" width="28" height="16"/></clipPath></defs>'
                          f'<g clip-path="url(#am{f["n"]}-{i})">{linhas_textura(i, 0, 0, 30, 18, 6)}</g>'
                          f'<rect x="1" y="1" width="28" height="16" fill="none" stroke="#000" stroke-width="1.5"/></svg></span>'
                          f'{e(cor)} na folha em tinta: {e(TEXTURAS[i][0])}, use {e(TEXTURAS[i][1])}</li>' for cor, i in usadas)
        etiquetas = ''.join(f'<li><b>{e(t)}</b> <span class="br">{texto_braille(t)}</span></li>' for t in f['textos'][:24])
        cartoes += f'''<section class="molde">
  <h2>Molde tátil {f["n"]}</h2>
  <p class="onde">{e(f["onde"])}</p>
  <div class="fig">{svg}</div>
  <p class="desc"><b>Descrição:</b> {e(f["descricao"])}.</p>
  {f'<ul class="legenda">{legenda}</ul>' if legenda else ''}
  {f'<p class="sub">Etiquetas em braille</p><ul class="etiquetas">{etiquetas}</ul>' if etiquetas else ''}
</section>
'''
    passos = ''.join(f'<li><b>{e(t)}.</b> {e(x)}</li>' for t, x in INSTRUCOES)
    pagina = f'''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Moldes táteis: {e(titulo)}</title>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@800&family=Lexend:wght@400;600&display=swap" rel="stylesheet">
<style>
@page {{ size: A4; margin: 14mm 15mm 14mm; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; background: #fff; color: #000; font: 11pt/1.45 Lexend, sans-serif; }}
h1, h2 {{ font-family: Sniglet, Lexend, sans-serif; font-weight: 800; margin: 0 0 2mm; }}
h1 {{ font-size: 22pt; line-height: 1.15; }}
h2 {{ font-size: 15pt; }}
.capa .rot {{ font-weight: 600; margin: 0 0 1mm; }}
.capa ol {{ padding-left: 5mm; }} .capa li {{ margin: 0 0 2mm; }}
.aviso {{ border: 1.5px solid #000; border-radius: 3mm; padding: 3mm 4mm; margin-top: 4mm; }}
.capa {{ break-after: page; }}
.molde {{ break-inside: avoid; border: 1.5px solid #000; border-radius: 3mm; padding: 4mm 5mm; margin: 0 0 6mm; }}
.onde {{ margin: 0 0 3mm; font-size: 9.5pt; }}
.fig {{ display: flex; justify-content: center; }}
.fig svg {{ width: 100%; max-width: 175mm; max-height: 92mm; height: auto; overflow: visible; }}
.fig svg [stroke]:not(.tx):not([stroke="none"]):not([stroke="#fff"]):not([stroke="#ffffff"]):not([stroke="white"]) {{
  stroke: #000 !important; stroke-width: 1.3mm !important; vector-effect: non-scaling-stroke; }}
.fig svg text {{ font-family: Lexend, sans-serif; font-weight: 600; fill: #000; }}
.desc {{ margin: 3mm 0 1mm; }}
.sub {{ font-weight: 600; margin: 2mm 0 1mm; }}
ul.legenda, ul.etiquetas {{ list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 1mm 6mm; font-size: 10pt; }}
.amostra svg {{ width: 9mm; height: 5.4mm; vertical-align: middle; margin-right: 1.5mm; }}
.br {{ font-family: 'DejaVu Sans', sans-serif; color: #666; font-size: 13pt; letter-spacing: .5pt; }}
.rodape {{ font-size: 8.5pt; margin-top: 6mm; }}
</style></head>
<body>
<section class="capa">
  <p class="rot">Moldes táteis · {e(ano)}</p>
  <h1>{e(titulo)}</h1>
  <p>Este arquivo tem {len(figuras)} {"molde tátil" if len(figuras) == 1 else "moldes táteis"}, um para cada figura da ficha, com o mesmo número usado na versão em braille (.brf). As figuras estão ampliadas, com traço grosso e sem cores, para virar relevo.</p>
  <h2>Como montar</h2>
  <ol>{passos}</ol>
  <p class="aviso"><b>Antes de usar com a turma:</b> este material foi gerado a partir das fichas em tinta e ainda precisa ser validado com a sala de recursos ou com o professor do AEE. Teste o molde com o estudante e ajuste o que for preciso.</p>
  <p class="rodape">ohtopico.com.br/material-adaptado · Júlia Roberta Quoos Alves · uso livre em sala de aula</p>
</section>
{cartoes}
</body></html>
'''
    destino.write_text(pagina, encoding='utf-8')
