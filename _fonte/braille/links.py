"""Links da versão em braille e dos moldes táteis, usados pelos geradores das páginas das fichas.
Lê _fonte/braille/indice.json (escrito por _fonte/braille/gerar.py); se a ficha não estiver lá, não põe nada."""
import json
from pathlib import Path

_ARQ = Path(__file__).resolve().parent / 'indice.json'
_INDICE = json.loads(_ARQ.read_text(encoding='utf-8')) if _ARQ.exists() else {}


def info(slug):
    return _INDICE.get(slug)


def botoes(slug):
    i = info(slug)
    if not i:
        return ''
    b = f'<a class="btn98" href="{slug}.brf" download>Baixar braille (.brf)</a>'
    if i['figuras']:
        b += f'<a class="btn98" href="{slug}-moldes-tateis.pdf" download>Moldes táteis (PDF)</a>'
    return b


def secao(slug):
    i = info(slug)
    if not i:
        return ''
    moldes = (f' e <a href="{slug}-moldes-tateis.pdf" download>{i["figuras"]} {"molde tátil" if i["figuras"] == 1 else "moldes táteis"} '
              f'para imprimir</a> (PDF, fundo branco)' if i['figuras'] else '')
    passo_molde = ('<li>Monte os moldes táteis seguindo a primeira página do PDF: cola relevo ou barbante nas linhas, '
                   'botões nos pontos e EVA ou lixa nas texturas. Cada molde tem o número da figura que aparece no texto em braille.</li>'
                   if i['figuras'] else '')
    return f'''<h2 id="braille">Para estudantes cegos: braille e moldes táteis</h2>
        <p>Esta ficha tem <a href="{slug}.brf" download>versão em braille</a> ({i["paginas_braille"]} página{"s" if i["paginas_braille"] > 1 else ""} braille, versões A, B e C){moldes}.</p>
        <ol><li>Envie o arquivo .brf para a impressora braille da escola ou da sala de recursos. Ele já vem com 40 celas por linha e 25 linhas por página, em braille grau 1 e com os sinais do Código Matemático Unificado.</li>{passo_molde}<li>Onde a folha em tinta pede para circular, pintar ou ligar, a versão em braille pede para escrever a resposta, e as contas podem ser feitas no soroban.</li></ol>
        <p class="nota">Este material foi gerado a partir das fichas em tinta e precisa ser revisado pela sala de recursos ou pelo professor do AEE antes de chegar ao estudante.</p>'''


def hub():
    """Seção da página /material-adaptado/ com os pacotes em braille por ano."""
    if not _INDICE:
        return ''
    import re
    total = len(_INDICE)
    figuras = sum(i['figuras'] for i in _INDICE.values())
    grupos = []
    for area, nome in (('matematica', 'Matemática'), ('computacao', 'Computação')):
        anos = sorted({int(m.group(1)) for i in _INDICE.values() if i['area'] == area for m in [re.match(r'(\d+)', i['ano'])] if m})
        cartoes = ''
        for a in anos:
            n = sum(1 for i in _INDICE.values() if i['area'] == area and i['ano'].startswith(f'{a}º'))
            cartoes += (f'<a class="ano" href="/material-adaptado/braille/{area}-{a}-ano-braille.zip" download>'
                        f'<strong>{a}º ano</strong><span>{n} fichas (zip)</span></a>')
        grupos.append(f'<h3 class="pacotes-area">{nome}</h3><div class="anos">{cartoes}</div>')
    return f'''<section class="ano-secao secao-braille" id="braille"><h2>Para estudantes cegos: braille e moldes táteis</h2>
      <p class="intro-mapa">Todas as {total} fichas de Matemática e Computação têm versão em braille (.brf), pronta para a impressora braille da escola ou da sala de recursos: braille grau 1, sinais do Código Matemático Unificado, 40 celas por linha e 25 linhas por página. As fichas com figuras também têm moldes táteis em PDF ({figuras} figuras no total), com fundo branco, traço grosso e texturas no lugar das cores, e instruções para montar em relevo com cola relevo, barbante, EVA ou lixa. Os arquivos de cada ficha ficam na página dela; aqui estão os pacotes com todos os .brf de cada ano.</p>
      {''.join(grupos)}
      <p class="intro-mapa">O material foi gerado a partir das fichas em tinta. Antes de chegar ao estudante, peça para a sala de recursos ou o professor do AEE revisar o braille e testar os moldes.</p>
    </section>'''
