"""Liga as fichas adaptadas ao glossário em Libras.

Os geradores das fichas (_fonte/matematica-adaptada/gerar.py e _fonte/computacao-adaptada/gerar.py) chamam
secao(ficha, area): ela procura no texto da ficha (título, resumo e versões A, B e C) as palavras do glossário e
monta a seção "Palavras desta ficha em Libras". hub() monta a seção da página /material-adaptado/.
"""
import html
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from termos import TERMOS  # noqa: E402

URL = '/material-adaptado/glossario/'
esc = html.escape
_REGEX = {x['id']: re.compile(x['busca'], re.I) for x in TERMOS}


def texto_da_ficha(f):
    partes = [f.get('titulo', ''), f.get('resumo', '')] + [str(v) for v in (f.get('versoes') or {}).values()]
    bruto = ' '.join(partes)
    bruto = re.sub(r'<(svg|style|script)\b.*?</\1>', ' ', bruto, flags=re.S | re.I)
    return html.unescape(re.sub(r'<[^>]+>', ' ', bruto))


def termos_da_ficha(f, area):
    texto = texto_da_ficha(f)
    return [x for x in TERMOS if area in x['areas'] and _REGEX[x['id']].search(texto)]


def secao(f, area):
    achados = termos_da_ficha(f, area)
    if not achados:
        return ''
    itens = []
    for x in achados:
        if x['sinais']:
            s = x['sinais'][0]
            libras = f'<a href="{s["url"]}" target="_blank" rel="noopener">ver o sinal em Libras</a>'
        else:
            libras = 'ainda sem sinal conferido em dicionário público'
        itens.append(f'<li><a href="{URL}#{x["id"]}"><b>{esc(x["termo"])}</b></a>: {esc(x["explicacao"])} ({libras})</li>')
    ids = ','.join(x['id'] for x in achados)
    return f'''<h2 id="libras">Palavras desta ficha em Libras</h2>
        <p>Para estudantes surdos: estas são as palavras de {"Matemática" if area == "mat" else "Computação"} que aparecem na ficha. Cada uma tem, no <a href="{URL}">glossário em Libras</a>, uma explicação em português simples, um desenho de apoio e, quando o sinal existe em dicionário público, um QR code que abre o vídeo dele.</p>
        <ul>{"".join(itens)}</ul>
        <div class="acoes"><a class="btn98" href="{URL}?termos={ids}">Imprimir os cartões destas palavras</a></div>
        <p class="nota">Os sinais vêm de dicionários públicos e podem variar de região para região. Antes de usar com o estudante, confira com o intérprete de Libras ou com um professor surdo da escola.</p>'''


def hub():
    """Seção da página /material-adaptado/ que apresenta o glossário."""
    com = sum(1 for x in TERMOS if x['sinais'])
    return f'''<section class="ano-secao secao-libras" id="libras"><h2>Para estudantes surdos: glossário em Libras</h2>
      <p class="intro-mapa">O <a href="{URL}">glossário de Matemática e Computação</a> tem {len(TERMOS)} palavras que aparecem nas fichas, cada uma com uma explicação em português simples, um exemplo e um desenho de apoio. {com} delas têm QR code que abre o vídeo do sinal em Libras no dicionário público Spread the Sign. Quando um termo técnico ainda não tem sinal em dicionário público, o glossário diz isso, em vez de inventar um sinal.</p>
      <p class="intro-mapa">Cada ficha lista as palavras do glossário que usa e tem um botão para imprimir só os cartões delas, em folha branca. Antes de usar com o estudante, confira os sinais com o intérprete de Libras ou com um professor surdo da escola.</p>
      <p><a class="btn98 escuro" href="{URL}">Abrir o glossário em Libras</a></p>
    </section>'''
