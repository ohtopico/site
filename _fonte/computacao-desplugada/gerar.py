"""Gera a página /computacao-desplugada/ e uma página por atividade em /computacao-desplugada/<slug>/.

Uso (na raiz do site):
    python _fonte/computacao-desplugada/gerar.py     páginas, indice.json e bloco do sitemap
    node _fonte/computacao-desplugada/pdf.js         PDF de cada atividade (confere se alguma folha transborda)
    python _fonte/braille/gerar.py                   versão em braille (.brf) e HTML dos moldes táteis
    node _fonte/braille/moldes.js desplugada         PDFs dos moldes táteis só destas atividades
    python _fonte/computacao-desplugada/gerar.py     de novo, para pôr os links do braille nas páginas

- O conteúdo das atividades fica em atividades.py; os desenhos em pecas.py.
- As folhas usam o estilo das fichas adaptadas (/matematica-adaptada/assets/fichas.css) e as peças de
  /computacao-adaptada/assets/computacao.css, mais desplugada.css. Folha sempre branca, cor só nos detalhes.
- A página central também lista as fichas desplugadas que já existem em /material-didatico/fichas/.
"""
import hashlib
import html
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI.parent / 'braille'))
import links as braille_links  # noqa: E402
sys.path.insert(0, str(AQUI))
from atividades import ATIVIDADES, PILARES  # noqa: E402

RAIZ = AQUI.parent.parent
MAT = AQUI.parent / 'matematica-adaptada'
COMP = AQUI.parent / 'computacao-adaptada'
SAIDA = RAIZ / 'computacao-desplugada'
SITE = 'https://ohtopico.com.br'
HUB = '/computacao-desplugada/'
PC = '/pensamento-computacional/'
OG = f'{SITE}/computacao-desplugada/og-computacao-desplugada.jpg'
esc = html.escape
HABS = {h['codigo']: h for h in json.loads((AQUI.parent / 'planejamento' / 'habilidades.json').read_text(encoding='utf-8'))['CO']}
AUTORA = {'@type': 'Person', '@id': f'{SITE}/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/'}
RODAPE = 'ohtopico.com.br/computacao-desplugada · Júlia Roberta Quoos Alves · uso livre em sala de aula'

# Fichas desplugadas que já existem no material didático (sem versão em braille): slug, título, ano, habilidade
FICHAS_EXISTENTES = [
    ('colecoes-tipos-dados', 'Coleções e tipos de dados', '6º ano', 'EF06CO01'),
    ('programando-colega-robo', 'Programando o colega robô', '6º ano', 'EF06CO02'),
    ('decompor-resolver', 'Decompor para resolver', '6º e 7º ano', 'EF06CO04'),
    ('maquinas-entrada-saida', 'Máquinas de entrada e saída', '6º ano', 'EF06CO05'),
    ('uma-receita-qualquer-numero', 'Uma receita para qualquer número', '6º ano', 'EF06CO06'),
    ('mensagem-pacotes', 'Mensagem em pacotes', '6º ao 8º ano', 'EF06CO07'),
    ('arrumando-pastas-computador', 'Arrumando as pastas do computador', '6º ano', 'EF06CO08'),
    ('a-ficha-turma-registros-vetores', 'A ficha da turma: registros e vetores', '7º ano', 'EF07CO01'),
    ('caca-aos-bugs-papel', 'Caça aos bugs no papel', '7º ano', 'EF07CO02'),
    ('fila-recursiva-fatorial', 'Fila recursiva e fatorial', '8º ano', 'EF08CO01'),
    ('a-playlist-listas-que-crescem', 'A playlist: listas que crescem', '8º ano', 'EF08CO02'),
    ('ordenar-buscar-cartoes', 'Ordenar e buscar com cartões', '8º ano', 'EF08CO03'),
    ('a-corrida-somas-paralelismo', 'A corrida das somas: paralelismo', '8º ano', 'EF08CO05'),
    ('mapa-internet-rede-redes', 'Mapa da internet: rede de redes', '8º ano', 'EF08CO06'),
    ('arvore-decisao-adivinhe-animal', 'Árvore de decisão: adivinhe o animal', '9º ano', 'EF09CO01'),
    ('maquina-estados-personagem', 'Máquina de estados do personagem', '9º ano', 'EF09CO03'),
    ('disco-cifra-cesar', 'Disco da Cifra de César', '8º e 9º ano', 'EF09CO05'),
]

GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def versao_css():
    return hashlib.md5(b''.join((p).read_bytes() for p in (MAT / 'fichas.css', MAT / 'fichas.js', COMP / 'computacao.css', AQUI / 'desplugada.css'))).hexdigest()[:10]


def topo_folha(rotulo, a):
    return f'<header class="folha-topo"><span class="nivel"><b>{rotulo}</b></span><span class="hab">{" · ".join(a["codigos"])} · Computação · {a["ano"]}º ano</span></header>'


def folhas(a):
    est = f'''<article class="folha" data-versao="Estudante" aria-label="{esc(a['titulo'])}, folha do estudante">
    {topo_folha('Folha do estudante', a)}
    <div class="aluno"><span>Nome: <i class="traco longo"></i></span><span>Data: <i class="traco"></i></span></div>
    <h2 class="folha-titulo">{esc(a['titulo'])}</h2>
    {a['estudante']}
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''
    rec = ''
    if a['recortar']:
        rec = f'''<article class="folha folha-recortar" data-versao="Recortar" aria-label="{esc(a['recortar_titulo'])}">
    {topo_folha('Para recortar', a)}
    <h2 class="folha-titulo">{esc(a['recortar_titulo'])}</h2>
    {a['recortar']}
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''
    passos = ''.join(f'<li>{esc(x)}</li>' for x in a['passos'])
    conversa = ''.join(f'<li>{esc(x)}</li>' for x in a['conversa'])
    gab = ''.join(f'<li>{esc(x)}</li>' for x in a['gabarito'])
    habs = ''.join(f'<p><b>{c}</b>: {esc(HABS[c]["texto"])}</p>' for c in a['codigos'])
    prof = f'''<article class="folha folha-prof" data-versao="Professor" aria-label="Orientações para o professor">
    <header class="folha-topo"><span class="nivel"><b>Orientações para o professor</b></span><span class="hab">{a['ano']}º ano · {esc(a['tempo'])}</span></header>
    <h2 class="folha-titulo">{esc(a['titulo'])}</h2>
    <h3>Habilidades da BNCC</h3>{habs}
    <h3>Pilar do pensamento computacional</h3><p>{PILARES[a['pilar']]}</p>
    <h3>Material</h3><p>{esc(a['material'])}</p>
    <h3>Como aplicar, sem computador</h3><ol>{passos}</ol>
    <h3>Para conversar no fim</h3><ul>{conversa}</ul>
    <h3>Gabarito</h3><ul>{gab}</ul>
    <p class="lembrete">Para estudantes cegos, use a versão em braille (.brf) e os moldes táteis da página da atividade, revisados antes pela sala de recursos ou pelo professor do AEE.</p>
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''
    return est + rec + prof


def cabeca(titulo, descricao, url, ld, v, extra_css=''):
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descricao)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="robots" content="index, follow">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(descricao)}">
<meta property="og:image" content="{OG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Card com o título Computação desplugada e a captura de uma atividade para imprimir.">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{ld}
</script>
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={v}">
<link rel="stylesheet" href="/computacao-adaptada/assets/computacao.css?v={v}">
<link rel="stylesheet" href="/computacao-desplugada/assets/desplugada.css?v={v}">{extra_css}
{GTAG}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
    <a class="marca-site" href="/">Júlia Quoos</a>
    <nav aria-label="Principal"><a href="{HUB}">Computação desplugada</a><a href="{PC}">Pensamento computacional</a><a href="/material-didatico/bncc/">BNCC Computação</a><a href="/blog/">Blog</a></nav>
</header>
'''


RODAPE_PAG = '''<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/computacao-desplugada/">Computação desplugada</a> · <a href="/pensamento-computacional/">Pensamento computacional</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/">Área de trabalho</a></p>
</footer>
'''


def pagina(a, i, lista, v):
    url = f'{SITE}{HUB}{a["slug"]}/'
    # o Google corta o título perto de 60 caracteres e a descrição perto de 155
    titulo = next((t for t in (f'{a["titulo"]}: computação desplugada | Júlia Quoos', f'{a["titulo"]} | Júlia Quoos')
                   if len(t) <= 60), a['titulo'])
    fim = f' {a["ano"]}º ano, {", ".join(a["codigos"])}.'
    descricao = next((d for d in (f'{a["resumo"]} Para imprimir, com gabarito e versão em braille.{fim}',
                                  f'{a["resumo"]} Com gabarito e versão em braille.{fim}', f'{a["resumo"]}{fim}')
                      if len(d) <= 155), a['resumo'])
    pdf = f'{a["slug"]}.pdf'
    botoes = '<button type="button" class="btn98" data-imprimir="Estudante">Imprimir folha do estudante</button>'
    if a['recortar']:
        botoes += '<button type="button" class="btn98" data-imprimir="Recortar">Imprimir folha para recortar</button>'
    botoes += '<button type="button" class="btn98" data-imprimir="Professor">Imprimir orientações</button>'
    passos = ''.join(f'<li>{esc(x)}</li>' for x in a['passos'])
    conversa = ''.join(f'<li>{esc(x)}</li>' for x in a['conversa'])
    gab = ''.join(f'<li>{esc(x)}</li>' for x in a['gabarito'])
    habs = ''.join(f'<li><a href="/material-didatico/bncc/{c.lower()}/">{c}</a>: {esc(HABS[c]["texto"])}</li>' for c in a['codigos'])
    ant = lista[i - 1] if i > 0 else None
    prox = lista[i + 1] if i + 1 < len(lista) else None
    nav = '<nav class="vizinhas" aria-label="Outras atividades">' + (
        f'<a href="{HUB}{ant["slug"]}/">← {esc(ant["titulo"])}</a>' if ant else '<span></span>') + (
        f'<a href="{HUB}{prox["slug"]}/">{esc(prox["titulo"])} →</a>' if prox else '') + '</nav>'
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'LearningResource', '@id': url + '#atividade', 'url': url, 'name': a['titulo'], 'description': descricao,
             'inLanguage': 'pt-BR', 'learningResourceType': 'Atividade desplugada para imprimir', 'isAccessibleForFree': True,
             'educationalLevel': f'{a["ano"]}º ano do Ensino Fundamental', 'timeRequired': a['tempo'],
             'teaches': [f'{c}: {HABS[c]["texto"]}' for c in a['codigos']] + [f'Pensamento computacional: {PILARES[a["pilar"]]}'],
             'educationalAlignment': [{'@type': 'AlignmentObject', 'alignmentType': 'teaches', 'educationalFramework': 'BNCC Computação',
                                       'targetName': c, 'targetDescription': HABS[c]['texto']} for c in a['codigos']],
             'audience': [{'@type': 'EducationalAudience', 'educationalRole': 'teacher'}],
             'accessibilityFeature': ['braille', 'tactileGraphic', 'highContrastDisplay', 'structuralNavigation'],
             'encoding': {'@type': 'MediaObject', 'contentUrl': url + pdf, 'encodingFormat': 'application/pdf'},
             'image': OG, 'author': AUTORA, 'isPartOf': {'@type': 'CollectionPage', '@id': f'{SITE}{HUB}#pagina'}},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{SITE}/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Computação desplugada', 'item': f'{SITE}{HUB}'},
                {'@type': 'ListItem', 'position': 3, 'name': a['titulo'], 'item': url}]},
        ]}, ensure_ascii=False, indent=1)
    secao_braille = braille_links.secao(a['slug']).replace('Esta ficha tem', 'Esta atividade tem').replace(
        'a partir das fichas em tinta', 'a partir das folhas em tinta').replace('versões A, B e C', 'todas as folhas do estudante')
    return cabeca(titulo, descricao, url, ld, v) + f'''<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="{HUB}">Computação desplugada</a></li><li aria-current="page">{esc(a['titulo'])}</li></ol></nav>
        <p class="rotulo">Computação desplugada · {" · ".join(a['codigos'])} · {a['ano']}º ano</p>
        <h1>{esc(a['titulo'])}</h1>
        <p class="linha-fina">{esc(a['resumo'])}</p>
        <div class="acoes">
            <a class="btn98 escuro" href="{pdf}" download>Baixar PDF</a>{braille_links.botoes(a["slug"])}
            {botoes}
        </div>
        <dl class="ficha-dados">
            <dt>Ano</dt><dd>{a['ano']}º ano</dd>
            <dt>Tempo</dt><dd>{esc(a['tempo'])}</dd>
            <dt>Pilar</dt><dd><a href="{PC}">{PILARES[a['pilar']]}</a></dd>
            <dt>Material</dt><dd>{esc(a['material'])}</dd>
        </dl>
        <h2>Habilidades da BNCC</h2>
        <ul>{habs}</ul>
        <h2>Como aplicar, sem computador</h2>
        <ol>{passos}</ol>
        <h2>Para conversar no fim</h2>
        <ul>{conversa}</ul>
        <details class="gabarito"><summary>Gabarito</summary><ul>{gab}</ul></details>
        {secao_braille}
        <h2 id="folhas">Folhas para imprimir</h2>
        <p>As folhas são A4, com fundo branco para economizar tinta. Imprima só a folha de que precisa ou baixe o PDF com todas, incluindo as orientações.</p>
    </div>
    <div class="folhas">
{folhas(a)}
    </div>
    <div class="texto">
        {nav}
        <p class="voltar"><a href="{HUB}">Ver todas as atividades de computação desplugada</a></p>
    </div>
</main>
{RODAPE_PAG}<script src="/matematica-adaptada/assets/fichas.js?v={v}" defer></script>
</body>
</html>
'''


def hub(lista, v):
    url = f'{SITE}{HUB}'
    titulo = 'Computação desplugada para imprimir | Júlia Quoos'
    descricao = ('Atividades desplugadas de computação para imprimir, do 6º ao 9º ano (BNCC): binário, grafos, criptografia '
                 'e mais, com gabarito e braille.')
    cartoes = ''
    for ano in (6, 7, 8, 9):
        itens = ''
        for a in [x for x in lista if x['ano'] == ano]:
            br = braille_links.info(a['slug'])
            selo = '<span class="selo-br">braille</span>' if br else ''
            itens += (f'<li class="cartao-dp"><a href="{a["slug"]}/"><strong>{esc(a["titulo"])}</strong></a>'
                      f'<span class="meta">{" · ".join(a["codigos"])} · {PILARES[a["pilar"]]}</span>'
                      f'<span class="resumo">{esc(a["resumo"])}</span>{selo}</li>')
        cartoes += f'<section class="ano-dp" id="ano-{ano}"><h3>{ano}º ano</h3><ul class="lista-dp">{itens}</ul></section>'
    existentes = ''.join(f'<li><a href="/material-didatico/fichas/{s}/">{esc(t)}</a> <span class="meta">{a} · {c}</span></li>'
                         for s, t, a, c in FICHAS_EXISTENTES)
    zipar = 'computacao-desplugada-braille.zip'
    tem_zip = (SAIDA / zipar).exists()
    total_fig = sum((braille_links.info(a['slug']) or {}).get('figuras', 0) for a in lista)
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'CollectionPage', '@id': url + '#pagina', 'url': url, 'name': 'Computação desplugada', 'description': descricao,
             'inLanguage': 'pt-BR', 'isAccessibleForFree': True, 'author': AUTORA, 'image': OG,
             'about': ['Computação desplugada', 'Pensamento computacional', 'BNCC Computação'],
             'hasPart': [{'@type': 'LearningResource', 'name': a['titulo'], 'url': f'{url}{a["slug"]}/'} for a in lista]},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{SITE}/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Computação desplugada', 'item': url}]},
        ]}, ensure_ascii=False, indent=1)
    pilares = ''.join(f'<li><b>{n}</b>: ' + esc({
        'decomposicao': 'quebrar um problema grande em partes menores (Torre de Hanói).',
        'padroes': 'perceber o que se repete e virar regra (cartões de pontos, paridade, senhas).',
        'abstracao': 'ficar só com o que importa para o problema (pixels, mapas em grafos, máquina de estados).',
        'algoritmos': 'escrever passos precisos que qualquer pessoa ou máquina consegue seguir (ditado de figuras, rede de ordenação, rotas, cifras).',
    }[k]) + '</li>' for k, n in PILARES.items())
    return cabeca(titulo, descricao, url, ld, v) + f'''<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Computação desplugada</li></ol></nav>
        <p class="rotulo">6º ao 9º ano · BNCC Computação</p>
        <h1>Computação desplugada</h1>
        <p class="linha-fina">Atividades para ensinar computação sem computador, prontas para imprimir em A4 com fundo branco. Cada uma tem folha do estudante, orientações para o professor, gabarito e versão em braille.</p>
        <div class="acoes">{f'<a class="btn98 escuro" href="{zipar}" download>Baixar todas em braille (.zip)</a>' if tem_zip else ''}<a class="btn98" href="{PC}">Pensamento computacional</a><a class="btn98" href="/material-didatico/bncc/">Habilidades da BNCC</a></div>
        <h2>O que é computação desplugada</h2>
        <p>Computação desplugada é ensinar as ideias da computação com papel, cartões, giz e o corpo, sem precisar de computador ou de internet. Funciona em qualquer escola, inclusive sem laboratório, e ajuda a turma a entender o que acontece por dentro das máquinas antes de programar.</p>
        <p>As atividades trabalham os quatro pilares do <a href="{PC}">pensamento computacional</a>:</p>
        <ul>{pilares}</ul>
        <h2 id="atividades">Atividades para imprimir</h2>
        <p>São {len(lista)} atividades, três por ano. Todas trazem a dinâmica com a turma (no pátio, no chão ou na mesa), a folha do estudante e as habilidades da BNCC.</p>
    </div>
    <div class="texto largo">
        {cartoes}
    </div>
    <div class="texto">
        <h2 id="braille">Para estudantes cegos: braille e moldes táteis</h2>
        <p>Todas as atividades desta página têm versão em braille (.brf), pronta para a impressora braille da escola ou da sala de recursos: braille grau 1, 40 celas por linha e 25 linhas por página. As figuras (cartões, grades, grafos, redes) também têm moldes táteis em PDF ({total_fig} figuras no total), com fundo branco, traço grosso e instruções para montar em relevo com cola relevo, barbante, EVA ou lixa.</p>
        <p>Os arquivos de cada atividade ficam na página dela{f', e o <a href="{zipar}" download>pacote com todos os .brf</a> fica aqui' if tem_zip else ''}. O material foi gerado a partir das folhas em tinta: peça para a sala de recursos ou o professor do AEE revisar o braille e testar os moldes antes de usar com o estudante.</p>
        <p class="nota">Também há <a href="/material-adaptado/#computacao">fichas de computação adaptada</a> para alunos com diferentes necessidades, uma por habilidade do 6º ao 9º ano, em três níveis de apoio e também com versão em braille.</p>
        <h2 id="mais-fichas">Mais fichas desplugadas</h2>
        <p>O material didático tem outras fichas para fazer sem computador, organizadas pela habilidade da BNCC. Elas ainda não têm versão em braille.</p>
        <ul class="lista-existentes">{existentes}</ul>
        <p>Para ver tudo o que existe para cada habilidade (planos de aula, jogos, listas e fichas), use a página <a href="/material-didatico/bncc/">BNCC Computação</a>. Para entender como os pilares se ligam às habilidades, veja <a href="{PC}">pensamento computacional</a>.</p>
    </div>
</main>
{RODAPE_PAG}</body>
</html>
'''


def atualizar_sitemap(urls):
    caminho = RAIZ / 'sitemap.xml'
    xml = caminho.read_text(encoding='utf-8')
    hoje = date.today().isoformat()
    linhas = []
    for url, arq in urls:
        h = hashlib.md5(arq.read_bytes()).hexdigest()[:8]
        m = re.search(rf'<loc>{re.escape(url)}</loc><lastmod>([\d-]+)</lastmod><!-- h:([0-9a-f]+) -->', xml)
        lastmod = m.group(1) if m and m.group(2) == h else hoje
        linhas.append(f'  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod></url><!-- h:{h} -->')
    bloco = ('  <!-- computacao-desplugada: início (gerado por _fonte/computacao-desplugada/gerar.py) -->\n' + '\n'.join(linhas)
             + '\n  <!-- computacao-desplugada: fim -->')
    if '<!-- computacao-desplugada: início' in xml:
        xml = re.sub(r'  <!-- computacao-desplugada: início.*?<!-- computacao-desplugada: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


def escrever(arq, texto):
    if not arq.exists() or arq.read_text(encoding='utf-8') != texto:
        arq.write_text(texto, encoding='utf-8')


def main():
    lista = [fn() for fn in ATIVIDADES]
    assert len({a['slug'] for a in lista}) == len(lista)
    for a in lista:
        for c in a['codigos']:
            assert c in HABS, c
    (SAIDA / 'assets').mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'desplugada.css', SAIDA / 'assets' / 'desplugada.css')
    v = versao_css()
    urls = []
    escrever(SAIDA / 'index.html', hub(lista, v))
    urls.append((f'{SITE}{HUB}', SAIDA / 'index.html'))
    for i, a in enumerate(lista):
        destino = SAIDA / a['slug']
        destino.mkdir(parents=True, exist_ok=True)
        escrever(destino / 'index.html', pagina(a, i, lista, v))
        urls.append((f'{SITE}{HUB}{a["slug"]}/', destino / 'index.html'))
    indice = [{'slug': a['slug'], 'titulo': a['titulo'], 'ano': a['ano'], 'codigos': a['codigos'], 'pilar': a['pilar'],
               'resumo': a['resumo']} for a in lista]
    (AQUI / 'indice.json').write_text(json.dumps({'atividades': indice}, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    atualizar_sitemap(urls)
    print(f'{len(lista)} atividades em {SAIDA}')


if __name__ == '__main__':
    main()
