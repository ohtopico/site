"""Gera as fichas de matemática adaptada em site/matematica-adaptada/fichas/<slug>/.

Uso (na raiz do site):
    python _fonte/matematica-adaptada/gerar.py          gera as páginas, o indice.json e o bloco do sitemap
    node _fonte/matematica-adaptada/pdf.js              depois, gera um PDF por ficha (precisa do Playwright)

- Cada ficha vira uma página com as orientações para o professor e as folhas A4 (versões A, B e C e a folha do
  professor), prontas para imprimir. A folha é sempre branca: a cor fica só nos detalhes.
- _fonte/matematica-adaptada/indice.json lista as fichas; o _fonte/blog/gerar.py usa esse arquivo para montar os
  cartões da página /matematica-adaptada/.
- O sitemap.xml ganha um bloco próprio entre os marcadores "matematica-adaptada".
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

AQUI = Path(__file__).resolve().parent
sys.path.insert(0, str(AQUI))
from fichas import FICHAS as BASE  # noqa: E402
import ano1, ano2, ano3, ano4, ano5, ano6, ano7, ano8, ano9, hab1, hab2, hab3  # noqa: E401,E402
from bncc import habilidades, UNIDADES  # noqa: E402

FICHAS = BASE[:-1] + ano1.FICHAS + ano2.FICHAS + ano3.FICHAS + ano4.FICHAS + ano5.FICHAS + ano6.FICHAS + ano7.FICHAS + ano8.FICHAS + ano9.FICHAS + hab1.FICHAS + hab2.FICHAS + hab3.FICHAS + BASE[-1:]  # o kit de apoio visual fica por último

RAIZ = AQUI.parent.parent
SAIDA = RAIZ / 'matematica-adaptada'
SITE = 'https://ohtopico.com.br'
OG = f'{SITE}/matematica-adaptada/og-matematica-adaptada.jpg'
esc = html.escape

NIVEIS = {'A': ('Versão A', 'mais apoio', 3), 'B': ('Versão B', 'apoio moderado', 2), 'C': ('Versão C', 'apoio leve', 1)}
PERFIS = [('down', 'Síndrome de Down'), ('tea', 'Autismo (TEA)'), ('tdah', 'TDAH')]
AUTORA = {'@type': 'Person', '@id': f'{SITE}/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/'}

GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def rotulo_versao(chave):
    if chave in NIVEIS:
        nome, apoio, pontos = NIVEIS[chave]
        bolas = ''.join(f'<i class="{"cheia" if i < pontos else ""}"></i>' for i in range(3))
        return f'<span class="nivel"><b>{nome}</b> · {apoio} <span class="bolas" aria-hidden="true">{bolas}</span></span>'
    return f'<span class="nivel"><b>{chave}</b></span>'


def folha(f, chave, corpo):
    cabeca_aluno = '' if f['slug'] == 'kit-de-apoio-visual' else (
        '<div class="aluno"><span>Nome: <i class="traco longo"></i></span><span>Data: <i class="traco"></i></span></div>')
    return f'''<article class="folha" data-versao="{esc(chave)}" aria-label="{esc(f['titulo'])}, {esc(chave)}">
    <header class="folha-topo">{rotulo_versao(chave)}<span class="hab">{" · ".join(h for h, _ in f['habilidades'])}</span></header>
    {cabeca_aluno}
    <h2 class="folha-titulo">{esc(f['titulo'])}</h2>
    {corpo}
    <footer class="folha-rodape">ohtopico.com.br/matematica-adaptada · Júlia Roberta Quoos Alves · uso livre em sala de aula</footer>
</article>'''


def folha_professor(f):
    habs = ''.join(f'<li><b>{c}</b>: {esc(t)}</li>' for c, t in f['habilidades'])
    passos = ''.join(f'<li>{esc(p)}</li>' for p in f['passos'])
    perfis = ''.join(f'<li><b>{n}.</b> {esc(f["perfis"][k])}</li>' for k, n in PERFIS)
    gab = ''.join(f'<li><b>Versão {k}.</b> {v}</li>' for k, v in f['gabarito'].items())
    gab = f'<h3>Gabarito</h3><ul>{gab}</ul>' if gab else ''
    return f'''<article class="folha folha-prof" data-versao="Professor" aria-label="Orientações para o professor">
    <header class="folha-topo"><span class="nivel"><b>Orientações para o professor</b></span><span class="hab">{esc(f['anos'])} · {esc(f['tempo'])}</span></header>
    <h2 class="folha-titulo">{esc(f['titulo'])}</h2>
    <h3>Habilidades da BNCC</h3><ul>{habs}</ul>
    <h3>Material concreto</h3><p>{esc(f['material'])}</p>
    <h3>Como aplicar</h3><ol>{passos}</ol>
    <h3>Ajustes por perfil</h3><ul>{perfis}</ul>
    {gab}
    <p class="lembrete">A versão é escolhida pelo apoio de que o estudante precisa naquele dia, e não pelo diagnóstico. Converse com a equipe do AEE e siga o plano individual (PEI) do estudante, quando houver.</p>
    <footer class="folha-rodape">ohtopico.com.br/matematica-adaptada · Júlia Roberta Quoos Alves · uso livre em sala de aula</footer>
</article>'''


def versao_css():
    return hashlib.md5((AQUI / 'fichas.css').read_bytes() + (AQUI / 'fichas.js').read_bytes()).hexdigest()[:10]


def relacionadas(f):
    """Liga a ficha de revisão às fichas de cada habilidade, e cada ficha à revisão do tema."""
    rel = f.get('relacionadas') or []
    if not rel:
        return ''
    links = ''.join(f'<li><a href="/matematica-adaptada/fichas/{sl}/">{esc(t)}</a></li>' for sl, t in rel)
    if f.get('revisao'):
        return f'<p>Esta é uma ficha de revisão, que junta várias habilidades. Para trabalhar uma habilidade de cada vez, use as fichas:</p><ul>{links}</ul>'
    return f'<p>Para revisar esta habilidade junto com outras do mesmo tema, use a ficha de revisão:</p><ul>{links}</ul>'


def pagina(f, i, total):
    url = f'{SITE}/matematica-adaptada/fichas/{f["slug"]}/'
    titulo = f'{f["titulo"]}: matemática adaptada | Júlia Quoos'
    if len(titulo) > 70:
        titulo = f'{f["titulo"]} | Júlia Quoos'
    tem_versoes = 'A' in f['versoes']
    descricao = (f'{f["resumo"]} Ficha adaptada para estudantes com síndrome de Down, autismo e TDAH, em três níveis de apoio, para imprimir. {f["anos"]}.'
                 if tem_versoes else f'{f["resumo"]} Para imprimir e usar com estudantes com síndrome de Down, autismo e TDAH.')
    pdf = f'{f["slug"]}.pdf'
    folhas = ''.join(folha(f, k, v) for k, v in f['versoes'].items()) + folha_professor(f)
    botoes = ''.join(f'<button type="button" class="btn98" data-imprimir="{esc(k)}">Imprimir {esc(k if k not in NIVEIS else "versão " + k)}</button>'
                     for k in f['versoes']) + '<button type="button" class="btn98" data-imprimir="Professor">Imprimir orientações</button>'
    habs = ''.join(f'<li><a href="/material-didatico/bncc/{c.lower()}/">{c}</a>: {esc(t)}</li>' if c.lower() in BNCC_PAGINAS
                   else f'<li><b>{c}</b>: {esc(t)}</li>' for c, t in f['habilidades'])
    passos = ''.join(f'<li>{esc(p)}</li>' for p in f['passos'])
    perfis = ''.join(f'<li><b>{n}.</b> {esc(f["perfis"][k])}</li>' for k, n in PERFIS)
    gab = ''.join(f'<li><b>Versão {k}.</b> {v}</li>' for k, v in f['gabarito'].items())
    versoes_txt = ('<p>A ficha tem <b>três versões da mesma atividade</b>. Assim a turma toda trabalha o mesmo conteúdo, e cada estudante recebe o apoio de que precisa:</p>'
                   '<ul><li><b>Versão A, mais apoio</b>: poucos itens, figuras grandes, um exemplo resolvido e resposta de circular ou cobrir.</li>'
                   '<li><b>Versão B, apoio moderado</b>: mais itens, exemplo resolvido e resposta escrita, com apoio visual.</li>'
                   '<li><b>Versão C, apoio leve</b>: números maiores, menos figuras e um problema no final.</li></ul>') if tem_versoes else ''
    ant = FICHAS_INFO[i - 1] if i > 0 else None
    prox = FICHAS_INFO[i + 1] if i + 1 < total else None
    nav = '<nav class="vizinhas" aria-label="Outras fichas">' + (
        f'<a href="/matematica-adaptada/fichas/{ant["slug"]}/">← {esc(ant["titulo"])}</a>' if ant else '<span></span>') + (
        f'<a href="/matematica-adaptada/fichas/{prox["slug"]}/">{esc(prox["titulo"])} →</a>' if prox else '') + '</nav>'
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'LearningResource', '@id': url + '#ficha', 'url': url, 'name': f['titulo'], 'description': descricao,
             'inLanguage': 'pt-BR', 'learningResourceType': 'Ficha de atividade para imprimir', 'isAccessibleForFree': True,
             'educationalLevel': f['anos'], 'timeRequired': f['tempo'],
             'teaches': [f'{c}: {t}' for c, t in f['habilidades']],
             'audience': [{'@type': 'EducationalAudience', 'educationalRole': 'teacher'}],
             'accessibilityFeature': ['largePrint', 'highContrastDisplay', 'alternativeText', 'structuralNavigation'],
             'encoding': {'@type': 'MediaObject', 'contentUrl': url + pdf, 'encodingFormat': 'application/pdf'},
             'image': OG, 'author': {'@id': AUTORA['@id']},
             'isPartOf': {'@type': 'CollectionPage', '@id': f'{SITE}/material-adaptado/#pagina'}},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{SITE}/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Material adaptado', 'item': f'{SITE}/material-adaptado/'},
                {'@type': 'ListItem', 'position': 3, 'name': f['titulo'], 'item': url}]},
        ]}, ensure_ascii=False, indent=1)
    alt = 'Card com o título Matemática adaptada e a captura de uma ficha para imprimir com três níveis de apoio.'
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
<meta property="og:image:alt" content="{esc(alt)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{ld}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={versao_css()}">
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
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="/material-adaptado/">Material adaptado</a></li><li aria-current="page">{esc(f['titulo'])}</li></ol></nav>
        <p class="rotulo">Ficha adaptada · {esc(f['anos'])}</p>
        <h1>{esc(f['titulo'])}</h1>
        <p class="linha-fina">{esc(f['resumo'])}</p>
        <div class="acoes">
            <a class="btn98 escuro" href="{pdf}" download>Baixar PDF</a>
            {botoes}
        </div>
        <dl class="ficha-dados">
            <dt>Tempo</dt><dd>{esc(f['tempo'])}</dd>
            <dt>Material concreto</dt><dd>{esc(f['material'])}</dd>
        </dl>
        <h2>Habilidades da BNCC</h2>
        <ul>{habs}</ul>
        {relacionadas(f)}
        {('<h2>Três versões, a mesma atividade</h2>' + versoes_txt) if versoes_txt else ''}
        <h2>Como aplicar</h2>
        <ol>{passos}</ol>
        <h2>Ajustes por perfil</h2>
        <ul>{perfis}</ul>
        <p class="nota">Esses ajustes são pontos de partida. Cada estudante é único: observe o que funciona, converse com a família e com a equipe do AEE e siga o plano individual (PEI), quando houver.</p>
        {f'<details class="gabarito"><summary>Gabarito</summary><ul>{gab}</ul></details>' if gab else ''}
        <h2 id="folhas">Folhas para imprimir</h2>
        <p>As folhas são A4, com fundo branco para economizar tinta. Imprima só a versão de que precisa ou baixe o PDF com todas, incluindo a folha de orientações.</p>
    </div>
    <div class="folhas">
{folhas}
    </div>
    <div class="texto">
        {nav}
        <p class="voltar"><a href="/material-adaptado/">Ver todos os materiais adaptados</a> · <a href="/matematica-adaptada/">Como usar o material</a></p>
    </div>
</main>
<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/blog/">Blog</a> · <a href="/">Área de trabalho</a></p>
</footer>
<script src="/matematica-adaptada/assets/fichas.js?v={versao_css()}" defer></script>
</body>
</html>
'''


def atualizar_sitemap(slugs):
    caminho = RAIZ / 'sitemap.xml'
    xml = caminho.read_text(encoding='utf-8')
    hoje = date.today().isoformat()
    linhas = []
    for s in slugs:
        url = f'{SITE}/matematica-adaptada/fichas/{s}/'
        html_ = (SAIDA / 'fichas' / s / 'index.html').read_bytes()
        h = hashlib.md5(html_).hexdigest()[:8]
        m = re.search(rf'<loc>{re.escape(url)}</loc><lastmod>([\d-]+)</lastmod><!-- h:([0-9a-f]+) -->', xml)
        lastmod = m.group(1) if m and m.group(2) == h else hoje
        linhas.append(f'  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod></url><!-- h:{h} -->')
    bloco = ('  <!-- matematica-adaptada: início (gerado por _fonte/matematica-adaptada/gerar.py) -->\n' + '\n'.join(linhas)
             + '\n  <!-- matematica-adaptada: fim -->')
    if '<!-- matematica-adaptada: início' in xml:
        xml = re.sub(r'  <!-- matematica-adaptada: início.*?<!-- matematica-adaptada: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


def gerar_hub(fichas, mapa):
    """Página /material-adaptado/, no estilo do material didático: o repositório com todas as fichas e o mapa da BNCC."""
    def esc_(t):
        return html.escape(str(t), quote=True)
    proprias = [f for f in fichas if not f['revisao'] and f['slug'] != 'kit-de-apoio-visual']
    revisoes = [f for f in fichas if f['revisao']]
    hab_proprias = {c for f in proprias for c, _ in f['habilidades']}
    total_h = len(mapa)
    titulos = {f['slug']: f['titulo'] for f in fichas}
    eh_rev = {f['slug']: f['revisao'] for f in fichas}

    def cartao_ano(a):
        hs = [h for h in mapa if h['ano'] == a]
        feitas = sum(1 for h in hs if h['codigo'] in hab_proprias)
        n = sum(1 for f in proprias if f['ano'] == a)
        return (f'<a class="ano" href="#ano-{a}"><strong>{a}º ano</strong>'
                f'<span>{n} {"ficha" if n == 1 else "fichas"} · {feitas} de {len(hs)} habilidades</span></a>')

    def cartao(f):
        habs = ', '.join(c for c, _ in f['habilidades'])
        return (f'<li><a class="ficha-card" href="/matematica-adaptada/fichas/{f["slug"]}/">'
                f'<span class="cod">{esc_(habs)}</span><strong>{esc_(f["titulo"])}</strong>'
                f'<span class="resumo">{esc_(f["resumo"])}</span><span class="meta">{"Versões A, B e C · orientações" if "A" in f["versoes"] else str(len(f["versoes"])) + " folhas"} · PDF</span></a></li>')

    secoes = []
    for a in range(1, 10):
        un = [f for f in proprias if f['ano'] == a]
        rv = [f for f in revisoes if f['ano'] == a]
        corpo = f'<ul class="fichas-grade">{"".join(cartao(f) for f in un)}</ul>' if un else '<p class="vazio">As fichas por habilidade deste ano estão em preparação. Enquanto isso, use as fichas de revisão.</p>'
        if rv:
            corpo += (f'<details class="revisoes"{"" if un else " open"}><summary>Fichas de revisão do {a}º ano ({len(rv)}), juntando habilidades de um mesmo tema</summary>'
                      f'<ul class="fichas-grade">{"".join(cartao(f) for f in rv)}</ul></details>')
        secoes.append(f'<section class="ano-secao" id="ano-{a}"><h2>{a}º ano</h2>{corpo}</section>')
    kit = next((f for f in fichas if f['slug'] == 'kit-de-apoio-visual'), None)
    if kit:
        secoes.append(f'<section class="ano-secao" id="apoio"><h2>Para todos os anos</h2><ul class="fichas-grade">{cartao(kit).replace(esc_(", ".join(c for c, _ in kit["habilidades"])), "apoio visual")}</ul></section>')

    blocos = []
    for a in range(1, 10):
        hs = [h for h in mapa if h['ano'] == a]
        feitas = sum(1 for h in hs if h['fichas'])
        linhas_ = []
        for un in UNIDADES:
            doano = [h for h in hs if h['unidade'] == un]
            if not doano:
                continue
            linhas_.append(f'<tr class="unidade"><th colspan="3">{esc_(un)}</th></tr>')
            for h in doano:
                ordem = sorted(h['fichas'], key=lambda sl: eh_rev.get(sl, False))
                links = ', '.join(f'<a href="/matematica-adaptada/fichas/{sl}/">{esc_(titulos[sl])}</a>' + (' (revisão)' if eh_rev.get(sl) else '') for sl in ordem) or 'em preparação'
                linhas_.append(f'<tr><td><b>{h["codigo"]}</b></td><td>{esc_(h["texto"])}</td><td>{links}</td></tr>')
        blocos.append(f'<details class="mapa-ano"><summary>{a}º ano · {feitas} de {len(hs)} habilidades com ficha</summary>'
                      f'<div class="mapa-rolagem"><table class="mapa-bncc"><thead><tr><th>Código</th><th>Habilidade</th><th>Ficha</th></tr></thead>'
                      f'<tbody>{"".join(linhas_)}</tbody></table></div></details>')

    descricao = ('Fichas de matemática adaptadas para estudantes com síndrome de Down, autismo e TDAH, do 1º ao 9º ano, '
                 'uma por habilidade da BNCC, em três níveis de apoio, para imprimir. Gratuito.')
    main = f'''  <section class="hero">
    <div class="wrap">
      <div class="hero-top">
        <div>
          <span class="eyebrow">Material adaptado gratuito · BNCC</span>
          <h1>A mesma aula, <span class="marca">o apoio certo</span></h1>
          <p class="lead">Fichas de matemática para imprimir, adaptadas para estudantes com síndrome de Down, autismo em diferentes níveis de suporte e TDAH. Cada ficha tem três versões da mesma atividade, para a turma toda aprender junto.</p>
        </div>
        <div class="stats">
          <a class="stat" href="#ano-1"><b>{len(proprias)}</b><span>fichas por habilidade</span></a>
          <a class="stat" href="#mapa-bncc"><b>{len(hab_proprias)}</b><span>de {total_h} habilidades com ficha própria</span></a>
          <a class="stat" href="#ano-1"><b>{len(revisoes)}</b><span>fichas de revisão</span></a>
          <a class="stat" href="/matematica-adaptada/#como-organizado"><b>3</b><span>versões de cada ficha</span></a>
        </div>
      </div>
      <div class="areas">
        <a class="area-door co" href="#ano-1">
          <span class="mark">1º ao 5º ano</span>
          <h3>Anos iniciais</h3>
          <p>Contagem, sistema de numeração, adição e subtração, formas, medidas, dinheiro, horas e pesquisa com a turma.</p>
          <ul>
            <li>Figuras grandes e material concreto</li>
            <li>Exemplo resolvido no primeiro item</li>
            <li>Respostas de circular, ligar ou cobrir</li>
          </ul>
          <span class="go">Ver as fichas do 1º ao 5º →</span>
        </a>
        <a class="area-door ma" href="#ano-6">
          <span class="mark">6º ao 9º ano</span>
          <h3>Anos finais</h3>
          <p>Números racionais e inteiros, álgebra, proporcionalidade, geometria, medidas, estatística e probabilidade.</p>
          <ul>
            <li>Passo a passo montado na versão A</li>
            <li>Calculadora e planilha na versão C</li>
            <li>Texto da habilidade da BNCC em cada ficha</li>
          </ul>
          <span class="go">Ver as fichas do 6º ao 9º →</span>
        </a>
      </div>
      <section class="bloco-anos" aria-labelledby="por-ano">
        <h2 id="por-ano">Escolha o ano</h2>
        <p>Cada habilidade de Matemática da BNCC ganha uma ficha própria, com versões A, B e C, orientações para o professor e PDF. As fichas entram ano a ano; enquanto um ano é completado, as fichas de revisão daquele ano já cobrem todas as habilidades.</p>
        <div class="anos">{''.join(cartao_ano(a) for a in range(1, 10))}</div>
      </section>
      <nav class="atalhos" aria-label="Outros caminhos">
        <a class="atalho destaque" href="/matematica-adaptada/"><strong>Como usar o material</strong><span>Versões A, B e C, Down, autismo, TDAH e perguntas frequentes</span></a>
        <a class="atalho" href="#mapa-bncc"><strong>Mapa da BNCC</strong><span>As {total_h} habilidades e a ficha de cada uma</span></a>
        <a class="atalho" href="/matematica-adaptada/fichas/kit-de-apoio-visual/"><strong>Kit de apoio visual</strong><span>Quadros e cartões para a mesa</span></a>
        <a class="atalho" href="https://wa.me/5551999222234?text=Ol%C3%A1%2C%20J%C3%BAlia%21%20Vim%20pelo%20site%20e%20quero%20sugerir%20um%20material%20adaptado." target="_blank" rel="noopener"><strong>Sugerir um material</strong><span>Conte o conteúdo e o apoio de que o estudante precisa</span></a>
      </nav>
    </div>
  </section>
  <div class="hero-faixa"></div>
  <div class="wrap repositorio">
    <p class="como-usar">Primeira vez aqui? Leia <a href="/matematica-adaptada/">como usar o material adaptado</a>: como escolher entre as versões A, B e C e o que costuma ajudar estudantes com síndrome de Down, autismo e TDAH.</p>
    {''.join(secoes)}
    <section class="ano-secao" id="mapa-bncc"><h2>Mapa da BNCC</h2>
      <p class="intro-mapa">As {total_h} habilidades de Matemática da BNCC do 1º ao 9º ano, por unidade temática, com a ficha de cada uma. Do 1º ao 5º ano, o texto é um resumo da habilidade; do 6º ao 9º, é o texto da BNCC.</p>
      {''.join(blocos)}
    </section>
  </div>'''
    ld = json.dumps({
        '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': f'{SITE}/material-adaptado/#pagina',
        'url': f'{SITE}/material-adaptado/', 'name': 'Material adaptado: matemática do 1º ao 9º ano', 'description': descricao, 'inLanguage': 'pt-BR',
        'author': {'@type': 'Person', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/curriculo/'},
        'mainEntity': {'@type': 'ItemList', 'numberOfItems': len(fichas), 'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': f['titulo'], 'url': f'{SITE}/matematica-adaptada/fichas/{f["slug"]}/'} for i, f in enumerate(fichas)]},
    }, ensure_ascii=False)
    texto = (AQUI / 'hub.html').read_text(encoding='utf-8').replace('{{DESCRICAO}}', esc_(descricao)).replace('{{MAIN}}', main).replace(
        '{{LD}}', f'<script type="application/ld+json">{ld}</script>')
    sys.path.insert(0, str(AQUI.parent / 'computacao-adaptada'))
    import hub as computacao  # seção Computação (fichas de _fonte/computacao-adaptada/indice.json)
    texto = computacao.inserir(texto)
    destino = RAIZ / 'material-adaptado'
    destino.mkdir(exist_ok=True)
    (destino / 'index.html').write_text(texto, encoding='utf-8')


BNCC_PAGINAS = {p.name for p in (RAIZ / 'material-didatico' / 'bncc').iterdir() if p.is_dir()} if (RAIZ / 'material-didatico' / 'bncc').exists() else set()
FICHAS_INFO = []


def main():
    fichas = [fn() for fn in FICHAS]
    for f in fichas:
        f['ano'] = 0 if f['slug'] == 'kit-de-apoio-visual' else min(int(c[2:4]) for c, _ in f['habilidades'])
        # com uma ficha por habilidade, as fichas de várias habilidades viram fichas de revisão do tema
        f['revisao'] = f['slug'] != 'kit-de-apoio-visual' and len(f['habilidades']) > 1
    fichas.sort(key=lambda f: (f['ano'] or 99, f['revisao'], min(c for c, _ in f['habilidades'])))
    unica = {}
    for f in fichas:
        if not f['revisao'] and f['slug'] != 'kit-de-apoio-visual':
            for c, _ in f['habilidades']:
                unica.setdefault(c, f)
    for f in fichas:
        if f['revisao']:
            f['relacionadas'] = [(unica[c]['slug'], unica[c]['titulo']) for c, _ in f['habilidades'] if c in unica]
    for f in fichas:
        if f['revisao']:
            for sl, _ in f['relacionadas']:
                alvo = next(g for g in fichas if g['slug'] == sl)
                alvo.setdefault('relacionadas', []).append((f['slug'], f['titulo']))
    FICHAS_INFO.extend(fichas)
    (SAIDA / 'assets').mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'fichas.css', SAIDA / 'assets' / 'fichas.css')
    shutil.copy(AQUI / 'fichas.js', SAIDA / 'assets' / 'fichas.js')
    for i, f in enumerate(fichas):
        destino = SAIDA / 'fichas' / f['slug']
        destino.mkdir(parents=True, exist_ok=True)
        texto = pagina(f, i, len(fichas))
        arq = destino / 'index.html'
        if not arq.exists() or arq.read_text(encoding='utf-8') != texto:
            arq.write_text(texto, encoding='utf-8')
    lista = [{'slug': f['slug'], 'titulo': f['titulo'], 'anos': f['anos'], 'ano': f['ano'], 'resumo': f['resumo'],
              'habilidades': [c for c, _ in f['habilidades']], 'versoes': list(f['versoes']), 'revisao': f['revisao']} for f in fichas]
    cobertura = {}
    for f in fichas:
        if f['slug'] == 'kit-de-apoio-visual':
            continue
        for c, _ in f['habilidades']:
            cobertura.setdefault(c, []).append(f['slug'])
    mapa = [dict(h, fichas=cobertura.get(h['codigo'], [])) for h in habilidades()]
    indice = {'fichas': lista, 'mapa': mapa, 'unidades': UNIDADES}
    (AQUI / 'indice.json').write_text(json.dumps(indice, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    feitas = sum(1 for h in mapa if h['fichas'])
    print(f'Habilidades com ficha: {feitas} de {len(mapa)}')
    atualizar_sitemap([f['slug'] for f in fichas])
    gerar_hub(fichas, mapa)
    print(f'{len(fichas)} fichas geradas em {SAIDA / "fichas"}')


if __name__ == '__main__':
    main()
