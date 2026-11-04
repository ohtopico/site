"""Gera o glossário de Matemática e Computação com sinais em Libras: /material-adaptado/glossario/.

Uso (na raiz do site):
    python _fonte/glossario-libras/gerar.py      página, CSS/JS e bloco do sitemap
    node _fonte/glossario-libras/pdf.js          depois, o PDF com todos os cartões (precisa do Playwright)

- Termos, explicações e links dos sinais ficam em termos.py; os desenhos, em desenhos.py.
- Os QR codes abrem a página do sinal no Spread the Sign (Libras). Termo sem vídeo em Libras não ganha QR:
  o cartão diz que ainda não há sinal conferido em dicionário público.
- A página aceita ?termos=id1,id2 para mostrar e imprimir só alguns cartões (as fichas usam isso).
- Rodar duas vezes com os mesmos arquivos gera o mesmo resultado.
"""
import hashlib
import html
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

import qrcode

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI))
from termos import TERMOS, GRUPOS, CONFERIDO  # noqa: E402
from desenhos import svg as desenho  # noqa: E402

RAIZ = AQUI.parent.parent
SAIDA = RAIZ / 'material-adaptado' / 'glossario'
SITE = 'https://ohtopico.com.br'
URL = f'{SITE}/material-adaptado/glossario/'
OG = f'{SITE}/matematica-adaptada/og-matematica-adaptada.jpg'
INES = 'https://www.ines.gov.br/dicionario-de-libras/'
esc = html.escape

GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def qr_svg(url, rotulo):
    """QR code em SVG com um caminho só (linhas de módulos juntas), fundo branco."""
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=2)
    q.add_data(url)
    q.make(fit=True)
    m = q.get_matrix()
    n = len(m)
    partes = []
    for y, linha in enumerate(m):
        x = 0
        while x < n:
            if linha[x]:
                ini = x
                while x < n and linha[x]:
                    x += 1
                partes.append(f'M{ini} {y}h{x - ini}v1h-{x - ini}z')
            else:
                x += 1
    return (f'<svg class="qr" viewBox="0 0 {n} {n}" role="img" aria-label="{esc(rotulo)}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">'
            f'<rect width="{n}" height="{n}" fill="#fff"/><path d="{"".join(partes)}" fill="#111"/></svg>')


AREAS = {'mat': 'Matemática', 'comp': 'Computação'}


def cartao(x):
    areas = ' '.join(x['areas'])
    selos = ''.join(f'<span class="selo selo-{a}">{AREAS[a]}</span>' for a in x['areas'])
    if x['sinais']:
        s = x['sinais'][0]
        outros = ''.join(f' · <a href="{o["url"]}" target="_blank" rel="noopener">{esc(o["rotulo"])}</a>' for o in x['sinais'][1:])
        libras = f'''<div class="libras">
            <a class="qr-link" href="{s["url"]}" target="_blank" rel="noopener">{qr_svg(s["url"], "QR code do sinal de " + s["rotulo"] + " em Libras")}</a>
            <p><b>Sinal em Libras</b><br>Aponte a câmera do celular para o QR code.<br><a href="{s["url"]}" target="_blank" rel="noopener">Abrir o vídeo: {esc(s["rotulo"])}</a>{outros}</p>
        </div>'''
    else:
        libras = '''<div class="libras sem-sinal">
            <p><b>Sinal em Libras</b><br>Ainda não encontramos este sinal em dicionário público. Combine o sinal com o intérprete ou com o professor surdo da escola e, até lá, use a datilologia e o desenho.</p>
        </div>'''
    return f'''<article class="cartao" id="{x["id"]}" data-areas="{areas}" data-busca="{esc(x["termo"].lower())}">
        <header><h3>{esc(x["termo"])}</h3><span class="selos">{selos}</span></header>
        <div class="desenho-termo">{desenho(x["desenho"], "Desenho de apoio: " + x["termo"])}</div>
        <p class="explicacao">{esc(x["explicacao"])}</p>
        <p class="exemplo"><b>Exemplo:</b> {esc(x["exemplo"])}</p>
        {libras}
    </article>'''


def versao():
    return hashlib.md5((AQUI / 'glossario.css').read_bytes() + (AQUI / 'glossario.js').read_bytes()).hexdigest()[:10]


def pagina():
    total = len(TERMOS)
    com = sum(1 for x in TERMOS if x['sinais'])
    titulo = 'Glossário em Libras: Matemática e Computação | Júlia Quoos'
    descricao = (f'{total} palavras de Matemática e Computação em português simples, com desenho de apoio e QR code para o sinal em Libras. '
                 'Cartões para imprimir, para estudantes surdos e alunos com diferentes necessidades.')
    grupos = []
    for g, nome, area in GRUPOS:
        cartoes = ''.join(cartao(x) for x in TERMOS if x['grupo'] == g)
        grupos.append(f'<section class="grupo" data-grupo="{g}"><h2 class="grupo-titulo">{esc(nome)}</h2><div class="cartoes">{cartoes}</div></section>')
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'DefinedTermSet', '@id': URL + '#glossario', 'url': URL, 'name': 'Glossário em Libras: Matemática e Computação',
             'description': descricao, 'inLanguage': ['pt-BR', 'bzs'], 'isAccessibleForFree': True,
             'author': {'@type': 'Person', '@id': f'{SITE}/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/'},
             'hasDefinedTerm': [{'@type': 'DefinedTerm', 'name': x['termo'], 'description': x['explicacao'], 'url': f'{URL}#{x["id"]}'} for x in TERMOS]},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{SITE}/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Material adaptado', 'item': f'{SITE}/material-adaptado/'},
                {'@type': 'ListItem', 'position': 3, 'name': 'Glossário em Libras', 'item': URL}]},
        ]}, ensure_ascii=False, indent=1)
    v = versao()
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descricao)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="{URL}">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(descricao)}">
<meta property="og:image" content="{OG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{ld}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={v}">
<link rel="stylesheet" href="glossario.css?v={v}">
{GTAG}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
    <a class="marca-site" href="/">Júlia Quoos</a>
    <nav aria-label="Principal"><a href="/material-adaptado/">Material adaptado</a><a href="/matematica-adaptada/">Como usar</a><a href="/blog/">Blog</a><a href="/material-didatico/">Material didático</a></nav>
</header>
<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="/material-adaptado/">Material adaptado</a></li><li aria-current="page">Glossário em Libras</li></ol></nav>
        <p class="rotulo">Material adaptado · Libras</p>
        <h1>Glossário em Libras: Matemática e Computação</h1>
        <p class="linha-fina">{total} palavras que aparecem nas fichas adaptadas, explicadas em português simples, com um exemplo, um desenho de apoio e, quando existe, um QR code que abre o vídeo do sinal em Libras.</p>
        <p class="nota aviso"><b>Antes de usar com o estudante:</b> os sinais vêm de um dicionário público e podem variar de região para região. Confira cada sinal com o intérprete de Libras ou com um professor surdo da escola. Este glossário ainda não foi validado por um profissional surdo.</p>
        <h2>Como usar</h2>
        <ol>
            <li>Escolha as palavras da aula. Cada ficha adaptada tem um botão que abre este glossário só com as palavras dela.</li>
            <li>Imprima os cartões (folha branca, para economizar tinta) e deixe na mesa do estudante ou na parede da sala.</li>
            <li>O estudante aponta a câmera do celular ou do tablet para o QR code e vê o sinal em vídeo. A explicação curta e o desenho ajudam a ligar o sinal à ideia.</li>
            <li>Quando a palavra ainda não tem sinal em dicionário público, o cartão diz isso. Combine um sinal com o intérprete e o estudante, use a datilologia enquanto isso e anote o sinal combinado no cartão.</li>
        </ol>
        <h2>De onde vêm os sinais</h2>
        <p>Os QR codes abrem o sinal no <a href="https://www.spreadthesign.com/pt.br/" target="_blank" rel="noopener">Spread the Sign</a>, um dicionário internacional e gratuito de línguas de sinais que tem vídeos em Libras. Conferimos um por um, em {CONFERIDO}, se a página de cada palavra tem o vídeo em Libras: {com} das {total} palavras têm. As outras {total - com} ainda não têm sinal nesse dicionário, e o cartão não inventa um. Para conferir outras variantes, use também o <a href="{INES}" target="_blank" rel="noopener">Dicionário da Língua Brasileira de Sinais do INES</a>, que não tem um endereço próprio para cada sinal.</p>
        <div class="filtros" role="group" aria-label="Filtrar palavras">
            <button type="button" class="btn98 escuro" data-area="todas" aria-pressed="true">Todas</button>
            <button type="button" class="btn98" data-area="mat" aria-pressed="false">Matemática</button>
            <button type="button" class="btn98" data-area="comp" aria-pressed="false">Computação</button>
            <label class="busca">Procurar <input type="search" id="busca" autocomplete="off" placeholder="ex.: fração"></label>
        </div>
        <p class="escolhidas" id="escolhidas" hidden></p>
        <div class="acoes"><button type="button" class="btn98 escuro" id="imprimir">Imprimir os cartões que estão na tela</button><a class="btn98" href="glossario-libras.pdf" download>Baixar PDF com todos os cartões</a></div>
    </div>
    <div class="glossario" id="cartoes">
        {"".join(grupos)}
    </div>
    <div class="texto">
        <p class="voltar"><a href="/material-adaptado/">Ver todos os materiais adaptados</a> · <a href="/material-adaptado/#braille">Braille e moldes táteis</a></p>
    </div>
</main>
<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/blog/">Blog</a> · <a href="/">Área de trabalho</a></p>
</footer>
<script src="glossario.js?v={v}" defer></script>
</body>
</html>
'''


def atualizar_sitemap():
    caminho = RAIZ / 'sitemap.xml'
    xml = caminho.read_text(encoding='utf-8')
    h = hashlib.md5((SAIDA / 'index.html').read_bytes()).hexdigest()[:8]
    m = re.search(rf'<loc>{re.escape(URL)}</loc><lastmod>([\d-]+)</lastmod><!-- h:([0-9a-f]+) -->', xml)
    lastmod = m.group(1) if m and m.group(2) == h else date.today().isoformat()
    bloco = ('  <!-- glossario-libras: início (gerado por _fonte/glossario-libras/gerar.py) -->\n'
             f'  <url><loc>{URL}</loc><lastmod>{lastmod}</lastmod></url><!-- h:{h} -->\n'
             '  <!-- glossario-libras: fim -->')
    if '<!-- glossario-libras: início' in xml:
        xml = re.sub(r'  <!-- glossario-libras: início.*?<!-- glossario-libras: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'glossario.css', SAIDA / 'glossario.css')
    shutil.copy(AQUI / 'glossario.js', SAIDA / 'glossario.js')
    (SAIDA / 'index.html').write_text(pagina(), encoding='utf-8')
    atualizar_sitemap()
    com = sum(1 for x in TERMOS if x['sinais'])
    print(f'glossário: {len(TERMOS)} termos, {com} com sinal em Libras, {len(TERMOS) - com} sem')


if __name__ == '__main__':
    main()
