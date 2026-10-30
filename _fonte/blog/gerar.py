"""Gera o blog do ohtopico (páginas estáticas no visual da janela de navegador).

Uso:
    python gerar.py --site CAMINHO_DO_SITE --imagens PASTA [PASTA ...] [--slides PASTA] [--ate AAAA-MM-DD] [--sitemap]

- Cada post de posts.json vira site/blog/<slug>/index.html, com o texto de conteudo/<slug>.html.
- site/blog/index.html lista os posts publicados (data <= --ate; sem --ate, todos).
- site/mentoria/index.html sai com noindex enquanto tiver trechos [pendentes].
- site/formacao-continuada/index.html é a página de serviço da formação continuada em IA.
- site/prompts-para-professores/index.html é a biblioteca de prompts (prompts.json + conteudo/biblioteca-prompts.html).
- site/quiz-pensamento-computacional/index.html é o quiz de pensamento computacional (quiz.json + conteudo/quiz-pensamento-computacional.html),
  com uma página por nível em resultado/<nível>/ (noindex) para o LinkedIn mostrar a imagem do nível.
- site/assistencia-por-voz/index.html apresenta o projeto de assistência por voz (teste-mestrado), com os avisos de privacidade.
- --sitemap atualiza o bloco do blog dentro de site/sitemap.xml (entre os marcadores).
- Posts com data depois de --ate não saem no site: a pasta, a imagem e os slides deles são apagados
  do site, se já existirem. Assim a automação diária (.github/workflows/publicar-blog.yml) libera
  cada post no dia certo.
- Rodar duas vezes com os mesmos arquivos gera exatamente o mesmo resultado (sem commits à toa).
"""
import argparse
import hashlib
import html
import json
import math
import re
import shutil
import unicodedata
from datetime import date
from pathlib import Path

from PIL import Image

AQUI = Path(__file__).resolve().parent
MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho',
         'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
AUTORA = {
    '@type': 'Person',
    '@id': 'https://ohtopico.com.br/#julia',
    'name': 'Júlia Roberta Quoos Alves',
    'alternateName': ['Júlia Quoos', 'Júlia Roberta Quoos', 'Quoos'],
    'url': 'https://ohtopico.com.br/',
}
FONTES = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
          '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
          '<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">')
# Tema salvo do site e aviso de que a página está dentro da janela "Busca"
SCRIPT_TOPO = ("<script>try { const t = JSON.parse(localStorage.getItem('iapraprof:theme')); if (t) document.documentElement.dataset.theme = t; } catch (e) {}\n"
               "if (window.self !== window.top) document.documentElement.classList.add('emoldurado');</script>")
# Versão dos arquivos de estilo e script: muda só quando o conteúdo deles muda
VERSAO_CSS = hashlib.md5((AQUI / 'blog.css').read_bytes() + (AQUI / 'blog.js').read_bytes()).hexdigest()[:10]
# o assistente (chatbot de busca) fica em /assistente/ na raiz do site; o índice é gerado por _fonte/assistente/indexar.py
_ASSISTENTE = AQUI.parent.parent / 'assistente'
VERSAO_ASSISTENTE = hashlib.md5(b''.join((_ASSISTENTE / n).read_bytes() for n in ('assistente.js', 'assistente.css') if (_ASSISTENTE / n).exists())).hexdigest()[:10]

esc = html.escape
# Largura das miniaturas da grade do blog (o dobro do tamanho na tela, para ficar nítida em telas de alta densidade)
MINI_LARGURA = 480


def data_extenso(d):
    a, m, dia = map(int, d.split('-'))
    return f'{dia} de {MESES[m - 1]} de {a}'


def minutos_leitura(corpo):
    palavras = len(re.sub(r'<[^>]+>', ' ', corpo).split())
    return max(1, math.ceil(palavras / 200))


def json_ld(obj):
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n</script>'


def cabeca(titulo, descricao, url, imagem, imagem_alt, tipo_og, extra='', robots='index, follow'):
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descricao)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{tipo_og}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(descricao)}">
<meta property="og:image" content="{imagem}">
<meta property="og:image:alt" content="{esc(imagem_alt)}">
<meta name="twitter:card" content="summary_large_image">
{extra}
{SCRIPT_TOPO}
{FONTES}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<link rel="stylesheet" href="/blog/assets/blog.css?v={VERSAO_CSS}">
<link rel="alternate" type="application/rss+xml" title="Blog de Júlia Roberta Quoos Alves" href="/blog/feed.xml">
</head>'''


CONTEXTO = {'posts': [], 'contador': None, 'agendados': []}

MENU_INICIAR = [
    ('Profissional', [
        ('fa-regular fa-file-lines', 'Leia-me', '/#abrir=win-leiame'),
        ('fa-regular fa-id-card', 'Currículo', '/curriculo/'),
        ('fa-solid fa-magnifying-glass', 'Busca no site', '/#abrir=win-navegador'),
        ('fa-solid fa-book-open', 'IA pra Prof', '/ia-pra-prof/'),
        ('fa-solid fa-toolbox', 'Tech pra Prof', '/tech-pra-prof/'),
        ('fa-solid fa-shapes', 'Material didático', '/material-didatico/'),
        ('fa-regular fa-newspaper', 'Blog', '/blog/'),
        ('fa-solid fa-chalkboard-user', 'Mentoria', '/mentoria/'),
        ('fa-solid fa-people-group', 'Formação continuada', '/formacao-continuada/'),
        ('fa-regular fa-clipboard', 'Biblioteca de prompts', '/prompts-para-professores/'),
        ('fa-solid fa-list-check', 'Quiz de pensamento computacional', '/quiz-pensamento-computacional/'),
    ]),
    ('Diversão', [
        ('fa-regular fa-star', 'Atualizações', '/#abrir=win-diario'),
        ('fa-solid fa-diagram-project', 'Interesses', '/#abrir=win-nuvem'),
        ('fa-regular fa-face-smile', 'Mascote', '/#abrir=win-pet'),
        ('fa-solid fa-music', 'Player', '/#abrir=win-player'),
        ('fa-regular fa-moon', 'Tarot', '/#abrir=win-tarot'),
        ('fa-solid fa-paintbrush', 'Paint', '/#abrir=win-paint'),
        ('fa-regular fa-heart', 'Paciência', '/#abrir=win-paciencia'),
    ]),
]


def slug_secao(s):
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')


def menu_iniciar():
    partes = []
    for i, (titulo, itens) in enumerate(MENU_INICIAR):
        if i:
            partes.append('<hr class="menu-sep">')
        partes.append(f'<p class="menu-heading">{titulo}</p>')
        for icone, nome, href in itens:
            externo = ' target="_blank" rel="noopener"' if href.startswith('http') else ''
            partes.append(f'<a class="menu-item" href="{href}"{externo}><i class="{icone}" aria-hidden="true"></i> {nome}</a>')
    return '\n    '.join(partes)


def laterais(atual):
    posts = CONTEXTO['posts']
    secoes = []
    for p in posts:
        if p['secao'] not in secoes:
            secoes.append(p['secao'])
    recentes = ''.join(f'<li><a href="/blog/{p["slug"]}/">{esc(p["titulo"])}</a></li>' for p in reversed(posts[-5:]))
    temas = ''.join(f'<li><a href="/blog/#{slug_secao(s)}">{esc(s)}</a></li>' for s in secoes)
    navegue = [('◄', 'Área de trabalho', '/', ''), ('⌂', 'Início do blog', '/blog/', 'blog'), ('✦', 'Mentoria', '/mentoria/', 'mentoria'),
               ('◆', 'Formação continuada', '/formacao-continuada/', 'formacao'),
               ('▣', 'Para escolas e redes', '/para-escolas/', 'escolas'),
               ('❖', 'Biblioteca de prompts', '/prompts-para-professores/', 'prompts'),
               ('✱', 'Quiz de pensamento computacional', '/quiz-pensamento-computacional/', 'quiz'),
               ('☺', 'Currículo', '/curriculo/', '')]
    projetos = [('▲', 'Material didático', '/material-didatico/', ''),
                ('✎', 'Guia IA pra Prof', '/ia-pra-prof/', ''),
                ('◇', 'Guia Tech pra Prof', '/tech-pra-prof/', ''),
                ('◉', 'Assistência por voz', '/assistencia-por-voz/', 'assistencia')]
    atual_attr = ' aria-current="page"'

    def lista(itens):
        return ''.join(f'<li><a href="{h}"{atual_attr if c and c == atual else ""}><span aria-hidden="true">{ic}</span> {n}</a></li>'
                       for ic, n, h, c in itens)
    nav = lista(navegue)
    esquerda = f'''<aside class="lateral lateral-esq" aria-label="Menu do blog">
            <section class="caixa caixa-amarela">
                <h2 class="caixa-titulo">★ Navegue</h2>
                <ul class="lista-menu">{nav}</ul>
                <button type="button" class="btn98 tema-btn" id="tema-btn"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg> Tema claro/escuro</button>
            </section>
            <section class="caixa">
                <h2 class="caixa-titulo">★ Temas</h2>
                <ul class="lista-menu">{temas}</ul>
            </section>
            <section class="caixa caixa-verde">
                <h2 class="caixa-titulo">★ Posts recentes</h2>
                <ul class="lista-recentes">{recentes}</ul>
            </section>
        </aside>'''
    direita = f'''<aside class="lateral lateral-dir" aria-label="Projetos e sobre a autora">
            <nav class="caixa caixa-verde caixa-projetos" aria-label="Projetos">
                <h2 class="caixa-titulo">★ Projetos</h2>
                <ul class="lista-menu">{lista(projetos)}</ul>
            </nav>
            <section class="caixa">
                <h2 class="caixa-titulo">★ Quem escreve</h2>
                <img class="foto" src="/img/perfil.jpg" alt="Foto de Júlia Roberta Quoos Alves" width="96" height="96" loading="lazy">
                <p><strong>Júlia Roberta Quoos Alves</strong>, professora de computação no RS e formadora de professores em IA.</p>
                <a class="btn98 escuro" href="/blog/quem-e-julia-quoos/">Minha história</a>
            </section>
            <section class="caixa caixa-amarela">
                <h2 class="caixa-titulo">★ Mentoria</h2>
                <p>Mentoria individual de IA para professores, coordenadores e gestores.</p>
                <a class="btn98 escuro" href="/mentoria/">Saiba mais</a>
                <p class="miudo"><a href="/formacao-continuada/">Formação continuada para escolas e redes</a></p>
            </section>
            <section class="caixa caixa-contador">
                <h2 class="caixa-titulo">★ Visitas</h2>
                <p class="contador"><span class="sr-only">Total de visitas: </span><span data-numero>------</span></p>
                <p class="miudo">Contador sem cookies e sem dados pessoais.</p>
            </section>
            <section class="caixa">
                <h2 class="caixa-titulo">★ Selos</h2>
                <ul class="selos">
                    <li class="selo selo-amarelo">feito à mão</li>
                    <li class="selo selo-verde">sem cookies</li>
                    <li class="selo selo-vermelho">♥ professores</li>
                    <li class="selo"><a href="/blog/feed.xml">RSS</a></li>
                </ul>
            </section>
        </aside>'''
    return esquerda, direita


def moldura(arquivo, endereco, voltar, conteudo, status, atual):
    esquerda, direita = laterais(atual)
    ultimo = CONTEXTO['posts'][-1] if CONTEXTO['posts'] else None
    letreiro = ''
    if ultimo:
        letreiro = (f'<a href="/blog/{ultimo["slug"]}/">✦ Post novo: {esc(ultimo["titulo"])}</a>'
                    '<a href="/mentoria/">✦ Mentoria para professores e escolas</a>'
                    '<a href="/formacao-continuada/">✦ Formação continuada em IA para escolas e redes</a>'
                    '<a href="/prompts-para-professores/">✦ Biblioteca de prompts para professores</a>'
                    '<a href="/quiz-pensamento-computacional/">✦ Quiz de pensamento computacional para professores</a>'
                    '<a href="/ia-pra-prof/">✦ Guia gratuito IA pra Prof</a>'
                    '<a href="/tech-pra-prof/">✦ Tech pra Prof: tecnologias para professores</a>')
    contador = ''
    if CONTEXTO['contador']:
        contador = (f'<script data-goatcounter="https://{CONTEXTO["contador"]}.goatcounter.com/count" '
                    'async src="//gc.zgo.at/count.js"></script>\n')

    return f'''<body data-contador="{CONTEXTO['contador'] or ''}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<div class="area">
<div class="janela">
    <div class="letreiro" aria-label="Destaques"><div class="letreiro-faixa">{letreiro}</div></div>
    <div class="corpo">
        <main class="pagina" id="conteudo" tabindex="-1">
{conteudo}
        </main>
        {esquerda}
        {direita}
        <footer class="rodape">
            <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
            <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="https://www.linkedin.com/in/ohtopico" rel="me">LinkedIn</a> · <a href="https://www.facebook.com/profile.php?id=61596036681061" rel="me">Facebook</a> · <a href="https://www.instagram.com/topico.tech/" rel="me">Instagram</a> · <a href="https://github.com/ohtopico" rel="me">GitHub</a> · <a href="/blog/feed.xml">RSS</a> · <a href="/">Área de trabalho</a></p>
        </footer>
    </div>
    <div class="status">{status}</div>
</div>
</div>
{contador}<script src="/blog/assets/blog.js?v={VERSAO_CSS}" defer></script>
<script src="/assistente/assistente.js?v={VERSAO_ASSISTENTE}" defer></script>
</body>
</html>
'''


def seletor(rotulo, padrao, nome_padrao, opcoes):
    """Botões que escolhem uma seção da página (blog: categoria; biblioteca: disciplina).
    Sem JavaScript são links para as seções, e todo o conteúdo continua na página (indexável).
    Com JavaScript (blog.js), mostram só a seção escolhida; padrao é a opção marcada ao abrir
    ('todos' mostra todas as seções, dentro do elemento id="todos")."""
    botoes = ([('todos', nome_padrao)] if nome_padrao else []) + opcoes
    itens = ''.join(f'<li><a class="botao-secao" href="#{v}" data-secao="{v}">{esc(n)}</a></li>'
                    for v, n in botoes)
    return (f'<nav class="seletor" aria-label="{esc(rotulo)}" data-seletor data-padrao="{padrao}">'
            f'<ul>{itens}</ul></nav>')


def figura(post, img_dim):
    w, h = img_dim
    return (f'<figure class="infografico">\n'
            f'<img src="/blog/img/{post["imagem"]}" width="{w}" height="{h}" alt="{esc(post["alt"])}" loading="lazy" decoding="async">\n'
            f'<figcaption>{esc(post["legenda"])} <a href="/blog/img/{post["imagem"]}" download>Baixar imagem</a></figcaption>\n'
            f'</figure>')


def inserir_imagem(corpo, post, fig):
    marca = post['imagem_depois_de']
    if marca not in corpo:
        raise SystemExit(f'Marcador da imagem não encontrado em {post["slug"]}: {marca}')
    if post.get('imagem_antes'):
        return corpo.replace(marca, fig + '\n\n' + marca, 1)
    return corpo.replace(marca, marca + '\n\n' + fig, 1)


def caixa_slides(post, tamanhos):
    s = post['slides']
    kb = round(tamanhos[s['pdf']] / 1024)
    return (f'<section class="slides-baixar" aria-labelledby="slides-titulo">\n'
            f'<h2 id="slides-titulo">Slides para a aula</h2>\n'
            f'<p>{s["quantidade"]} slides em PDF (formato 16:9), nas cores do site, seguindo o roteiro do plano acima. É só projetar.</p>\n'
            f'<a class="btn98 baixar" href="/blog/slides/{s["pdf"]}" download type="application/pdf">'
            f'<i class="fa-solid fa-download" aria-hidden="true"></i> Baixar slides (PDF, {kb} KB)</a>\n'
            f'</section>')


def sem_links_agendados(corpo):
    """Tira o link (fica só o texto) para posts que ainda não saíram: o endereço deles dá 404 até a data."""
    for p in CONTEXTO['agendados']:
        corpo = re.sub(rf'<a [^>]*href="(?:https://ohtopico\.com\.br)?/blog/{re.escape(p["slug"])}/"[^>]*>(.*?)</a>',
                       r'\1', corpo, flags=re.S)
    return corpo


def pagina_post(cfg, post, ant, prox, dims, tamanhos=None):
    site = cfg['site']
    url = f'{site}/blog/{post["slug"]}/'
    img_url = f'{site}/blog/img/{post["imagem"]}'
    corpo = sem_links_agendados((AQUI / 'conteudo' / f'{post["slug"]}.html').read_text(encoding='utf-8').strip())
    corpo = inserir_imagem(corpo, post, figura(post, dims[post['imagem']]))
    # Infográficos extras do post: lista "imagens_extra" com imagem, alt, legenda e imagem_depois_de
    for extra in post.get('imagens_extra', []):
        corpo = inserir_imagem(corpo, extra, figura(extra, dims[extra['imagem']]))
    if post.get('slides'):
        if '<!-- slides -->' not in corpo:
            raise SystemExit(f'Marcador <!-- slides --> não encontrado em {post["slug"]}')
        corpo = corpo.replace('<!-- slides -->', caixa_slides(post, tamanhos), 1)
    minutos = minutos_leitura(corpo)
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': url + '#post',
                'headline': post['titulo'],
                'description': post['descricao'],
                'url': url,
                'mainEntityOfPage': url,
                'image': {'@type': 'ImageObject', 'url': img_url, 'width': 1080, 'height': 1350},
                'datePublished': post['data'],
                'dateModified': post.get('atualizado', post['data']),
                'inLanguage': 'pt-BR',
                'keywords': post['palavras_chave'],
                'articleSection': post['secao'],
                'author': AUTORA,
                'publisher': {'@id': AUTORA['@id']},
                'isPartOf': {'@type': 'Blog', '@id': f'{site}/blog/#blog', 'name': 'Blog de Júlia Roberta Quoos Alves'},
                'timeRequired': f'PT{minutos}M',
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Blog', 'item': f'{site}/blog/'},
                    {'@type': 'ListItem', 'position': 3, 'name': post['titulo'], 'item': url},
                ],
            },
        ],
    })
    extra = (f'<meta property="article:published_time" content="{post["data"]}">\n'
             f'<meta property="article:author" content="https://ohtopico.com.br/">\n'
             f'<meta property="article:section" content="{esc(post["secao"])}">\n'
             f'<meta property="og:image:width" content="1080">\n<meta property="og:image:height" content="1350">\n' + ld)
    titulo_pagina = post['titulo_seo'] if 'Quoos' in post['titulo_seo'] else post['titulo_seo'] + ' | Júlia Quoos'
    head = cabeca(titulo_pagina, post['descricao'], url, img_url, post['alt'], 'article', extra)

    from urllib.parse import quote
    u = quote(url, safe='')
    t = quote(post['titulo'], safe='')
    vizinhos = ''
    if ant or prox:
        partes = []
        if ant:
            partes.append(f'<a class="ant" href="/blog/{ant["slug"]}/" rel="prev"><span>◄ Anterior</span>{esc(ant["titulo"])}</a>')
        if prox:
            partes.append(f'<a class="prox" href="/blog/{prox["slug"]}/" rel="next"><span>Próximo ►</span>{esc(prox["titulo"])}</a>')
        vizinhos = '<nav class="vizinhos" aria-label="Outros posts">' + ''.join(partes) + '</nav>'

    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="/blog/">Blog</a></li><li aria-current="page">{esc(post["secao"])}</li></ol></nav>
    <p class="rotulo">{esc(post["secao"])}</p>
    <h1>{esc(post["titulo"])}</h1>
    <p class="linha-fina">{esc(post["descricao"])}</p>
    <div class="meta">
        <img src="/img/perfil.jpg" alt="Foto de Júlia Roberta Quoos Alves" width="36" height="36">
        <span>Por <a href="/blog/quem-e-julia-quoos/" rel="author">Júlia Roberta Quoos Alves</a></span>
        <span><time datetime="{post["data"]}">{data_extenso(post["data"])}</time></span>
        <span>{minutos} min de leitura</span>
    </div>
    <div class="artigo">
{corpo}
    </div>
    <div class="compartilhar">
        <p>Compartilhar:</p>
        <a class="btn98" href="https://www.linkedin.com/sharing/share-offsite/?url={u}" target="_blank" rel="noopener">LinkedIn<span class="sr-only"> (abre em nova aba)</span></a>
        <a class="btn98" href="https://www.facebook.com/sharer/sharer.php?u={u}" target="_blank" rel="noopener">Facebook<span class="sr-only"> (abre em nova aba)</span></a>
        <a class="btn98" href="https://wa.me/?text={t}%20{u}" target="_blank" rel="noopener">WhatsApp<span class="sr-only"> (abre em nova aba)</span></a>
    </div>
    <aside class="autora" aria-labelledby="sobre-autora">
        <img src="/img/perfil.jpg" alt="Foto de Júlia Roberta Quoos Alves" width="72" height="72" loading="lazy">
        <div>
            <h2 id="sobre-autora">Júlia Roberta Quoos Alves</h2>
            <p>Professora de computação no RS, mestranda em Ciência da Computação na UFSM e formadora de professores em inteligência artificial.</p>
            <p class="links"><a href="/mentoria/">Mentoria para professores</a> <a href="/ia-pra-prof/">Guia IA pra Prof</a> <a href="https://www.linkedin.com/in/ohtopico" rel="me">LinkedIn</a></p>
        </div>
    </aside>
    {vizinhos}
</article>'''
    status = f'Pronto · publicado em {data_extenso(post["data"])}'
    return head + '\n' + moldura(post['arquivo_janela'], f'ohtopico.com.br/blog/{post["slug"]}', '/blog/', conteudo, status, 'blog')


def pagina_indice(cfg, publicados):
    site = cfg['site']
    url = f'{site}/blog/'
    descricao = 'Blog de Júlia Quoos sobre formação de professores em IA, prompts para planejar aulas, ética e LGPD na escola e Computação na BNCC.'
    ld = json_ld({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': url + '#blog',
        'name': 'Blog de Júlia Roberta Quoos Alves',
        'description': descricao,
        'url': url,
        'inLanguage': 'pt-BR',
        'author': AUTORA,
        'publisher': {'@id': AUTORA['@id']},
        'blogPost': [{
            '@type': 'BlogPosting',
            '@id': f'{site}/blog/{p["slug"]}/#post',
            'headline': p['titulo'],
            'url': f'{site}/blog/{p["slug"]}/',
            'datePublished': p['data'],
            'author': {'@id': AUTORA['@id']},
        } for p in publicados],
    })
    def cartao(p):
        miniatura = Path(p['imagem']).stem + '-mini.webp'
        return f'''            <li class="cartao">
                <a href="/blog/{p["slug"]}/">
                    <img src="/blog/img/{miniatura}" alt="Infográfico do post: {esc(p["legenda"])}" width="{MINI_LARGURA}" height="{round(MINI_LARGURA * 1.25)}" loading="lazy" decoding="async">
                    <h3>{esc(p["titulo"])}</h3>
                </a>
            </li>'''
    secoes = []
    for p in reversed(publicados):
        if p['secao'] not in secoes:
            secoes.append(p['secao'])
    blocos = []
    for sec in secoes:
        lista = '\n'.join(cartao(p) for p in reversed(publicados) if p['secao'] == sec)
        blocos.append(f'''    <section class="tema" id="{slug_secao(sec)}" aria-labelledby="t-{slug_secao(sec)}">
        <h2 class="tema-titulo" id="t-{slug_secao(sec)}">{esc(sec)}</h2>
        <ul class="grade-posts">
{lista}
        </ul>
    </section>''')
    conteudo = f'''<div class="texto capa">
    <p class="rotulo">Blog</p>
    <h1>Formação de professores em <span class="marca">IA</span>, na prática</h1>
    <p class="linha-fina">Textos curtos de Júlia Roberta Quoos Alves para professores, coordenadores e redes de ensino: como começar a usar inteligência artificial com segurança, prompts prontos e Computação na BNCC.</p>
{seletor('Categorias do blog', 'todos', 'Todos os posts', [(slug_secao(s), s) for s in secoes])}
    <div id="todos">
{chr(10).join(blocos)}
    </div>
    <section class="chamada" aria-labelledby="chamada-mentoria">
        <h2 id="chamada-mentoria">Quer levar isso para a sua escola?</h2>
        <p>Faço mentoria individual, oficinas para equipes e <a href="/formacao-continuada/">formação continuada para escolas e redes de ensino</a>.</p>
        <a class="btn98" href="/mentoria/">Conhecer a mentoria</a>
    </section>
</div>'''
    img = f'{site}/blog/img/{publicados[0]["imagem"]}' if publicados else f'{site}/img/perfil.jpg'
    head = cabeca('Blog da Júlia Quoos: formação de professores em IA', descricao, url, img,
                  'Infográfico do blog de Júlia Roberta Quoos Alves', 'website', ld)
    n = len(publicados)
    return head + '\n' + moldura('blog.txt', 'ohtopico.com.br/blog', '/', conteudo,
                                 f'Pronto · {n} post{"s" if n != 1 else ""}', 'blog')


def pagina_mentoria(cfg, dims):
    site = cfg['site']
    url = f'{site}/mentoria/'
    corpo = (AQUI / 'conteudo' / 'mentoria.html').read_text(encoding='utf-8').strip()
    m = cfg.get('mentoria', {})
    fig = figura({'imagem': 'dia07-mentoria.png',
                  'alt': 'Os três formatos: professor, mentoria individual, sai com um banco de prompts da sua disciplina; '
                         'escola, oficina para a equipe, cada professor sai com um material pronto; '
                         'rede, formação continuada, com diagnóstico, oficinas e retorno em 30 dias.',
                  'legenda': 'Os três formatos. A mentoria é o individual; para escolas e redes, veja a formação continuada.'}, dims['dia07-mentoria.png'])
    corpo = corpo.replace('<!--IMAGEM-->', fig)
    pendente = 'class="pendente"' in corpo
    descricao = ('Mentoria para professores em IA com Júlia Quoos: encontros on-line individuais para professores, '
                 'coordenadores e gestores usarem IA com ética e segurança.')
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': url + '#servico',
                'name': 'Mentoria para professores em IA',
                'alternateName': 'Mentoria individual de IA para professores',
                'serviceType': 'Mentoria individual em inteligência artificial para professores',
                'description': descricao,
                'url': url,
                'provider': AUTORA,
                'areaServed': {'@type': 'State', 'name': 'Rio Grande do Sul'},
                'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
                'availableChannel': {'@type': 'ServiceChannel', 'serviceUrl': url, 'availableLanguage': 'pt-BR'},
                'isRelatedTo': {'@type': 'Service', '@id': f'{site}/formacao-continuada/#servico',
                                'name': 'Formação continuada de professores em IA'},
                'inLanguage': 'pt-BR',
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': q,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for q, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Mentoria', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Mentoria</li></ol></nav>
    <p class="rotulo">Mentoria</p>
    <h1>Mentoria para professores em <span class="marca">IA</span></h1>
    <p class="linha-fina">Mentoria individual e on-line para professores, coordenadores e gestores: encontros para você usar inteligência artificial com segurança, ética e propósito pedagógico. Sem promessas mágicas e sem lista de ferramentas da moda: fundamentos, prática com o seu material real e acompanhamento.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="conversar">
        <h2 id="conversar">Vamos conversar</h2>
        <p>Conte um pouco sobre a sua disciplina ou função e eu respondo com uma proposta.</p>
        <a class="btn98" href="mailto:contato@ohtopico.com.br?subject=Mentoria%20de%20IA%20para%20professores">Falar com Júlia Roberta Quoos Alves</a>
    </section>
</article>'''
    robots = 'noindex, follow' if pendente else 'index, follow'
    head = cabeca('Mentoria para professores: IA na prática | Júlia Quoos', descricao, url,
                  f'{site}/blog/img/dia07-mentoria.png', 'Os três formatos da mentoria', 'website', ld, robots)
    return head + '\n' + moldura('mentoria.exe', 'ohtopico.com.br/mentoria', '/', conteudo, 'Pronto', 'mentoria'), pendente


FORMACAO_IMAGEM = 'dia30-guia.png'
DIAGNOSTICO_IMAGEM = 'dia02-diagnostico.png'


def perguntas_frequentes(corpo):
    """Pares (pergunta, resposta) da seção Perguntas frequentes, para o FAQPage."""
    secao = corpo.split('<h2>Perguntas frequentes</h2>', 1)[1]
    limpar = lambda t: html.unescape(re.sub(r'<[^>]+>', '', t)).strip()
    return [(limpar(q), limpar(r)) for q, r in re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>', secao, re.S)]


def pagina_formacao(cfg, dims):
    site = cfg['site']
    url = f'{site}/formacao-continuada/'
    corpo = (AQUI / 'conteudo' / 'formacao-continuada.html').read_text(encoding='utf-8').strip()
    alt = ('Card com o título Formação continuada em IA: o caminho, e cinco etapas numeradas: 1, Diagnóstico: o que a equipe '
           'já usa e o que preocupa; 2, Formato: oficina, curso ou mentoria, critérios para escolher; 3, Regras: pacto da escola, '
           'LGPD e as diretrizes nacionais; 4, Prática com apoio: tarefas reais da semana, com acompanhamento; 5, Avaliação: '
           'reação, aprendizagem, uso e resultado. No rodapé: Formação é processo, não evento. Assinatura Júlia Roberta Quoos Alves, ohtopico.com.br.')
    fig = figura({'imagem': FORMACAO_IMAGEM, 'alt': alt,
                  'legenda': 'O caminho da formação continuada em IA, em cinco etapas.'}, dims[FORMACAO_IMAGEM])
    corpo = corpo.replace('<!--IMAGEM-->', fig)
    corpo = corpo.replace('<!--DIAGNOSTICO-->', figura({
        'imagem': DIAGNOSTICO_IMAGEM,
        'alt': 'Cartão para enviar à equipe antes do primeiro encontro, com as mesmas 5 perguntas de diagnóstico da lista acima '
               'e a frase: as respostas dizem a primeira tarefa.',
        'legenda': 'Salve o cartão e mande para a equipe antes do primeiro encontro.'}, dims[DIAGNOSTICO_IMAGEM]))
    titulo = 'Formação continuada de professores em IA'
    descricao = 'Formação de professores em IA para escolas e redes de ensino do RS, em cinco etapas: diagnóstico, formato, regras, prática com apoio e avaliação.'
    w, h = dims[FORMACAO_IMAGEM]
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': url + '#pagina',
                'url': url,
                'name': titulo,
                'description': descricao,
                'inLanguage': 'pt-BR',
                'primaryImageOfPage': {'@type': 'ImageObject', 'url': f'{site}/blog/img/{FORMACAO_IMAGEM}', 'width': w, 'height': h},
                'about': {'@id': url + '#servico'},
                'author': {'@id': AUTORA['@id']},
            },
            {
                '@type': 'Service',
                '@id': url + '#servico',
                'name': titulo,
                'serviceType': 'Formação continuada de professores em inteligência artificial',
                'description': descricao,
                'url': url,
                'provider': AUTORA,
                'areaServed': {'@type': 'State', 'name': 'Rio Grande do Sul'},
                'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
                'availableChannel': {'@type': 'ServiceChannel', 'serviceUrl': url,
                                     'availableLanguage': 'pt-BR'},
                'isRelatedTo': {'@type': 'Service', '@id': f'{site}/mentoria/#servico', 'name': 'Mentoria para professores em IA'},
                'offers': {'@type': 'Offer', 'priceCurrency': 'BRL',
                           'priceSpecification': {'@type': 'UnitPriceSpecification', 'price': 200, 'priceCurrency': 'BRL',
                                                  'unitText': 'hora de formação'},
                           'description': 'Deslocamento, alimentação e hospedagem, quando aplicáveis, são cobrados à parte.'},
                'inLanguage': 'pt-BR',
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': q,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for q, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Formação continuada', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Formação continuada</li></ol></nav>
    <p class="rotulo">Formação continuada</p>
    <h1>Formação continuada de professores em <span class="marca">IA</span></h1>
    <p class="linha-fina">Formação de professores em IA para escolas, secretarias de educação e redes de ensino que querem usar inteligência artificial com segurança, ética e propósito pedagógico. Uma formação com diagnóstico, prática com o material real da escola e acompanhamento depois dos encontros.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="planejar">
        <h2 id="planejar">Planejar a formação da sua equipe</h2>
        <p>Conte o tamanho da equipe, as etapas de ensino e o que já foi feito com IA na escola ou na rede. A resposta vem com uma proposta de formato e de cronograma.</p>
        <a class="btn98" href="mailto:contato@ohtopico.com.br?subject=Forma%C3%A7%C3%A3o%20continuada%20de%20professores%20em%20IA">Falar com Júlia Roberta Quoos Alves</a>
    </section>
</article>'''
    head = cabeca('Formação de professores em IA para escolas | Júlia Quoos', descricao, url, f'{site}/blog/img/{FORMACAO_IMAGEM}', alt, 'website',
                  f'<meta property="og:image:width" content="{w}">\n<meta property="og:image:height" content="{h}">\n' + ld)
    return head + '\n' + moldura('guia-formacao.html', 'ohtopico.com.br/formacao-continuada', '/', conteudo, 'Pronto', 'formacao')


def pagina_assistencia(cfg):
    site = cfg['site']
    url = f'{site}/assistencia-por-voz/'
    corpo = (AQUI / 'conteudo' / 'assistencia-por-voz.html').read_text(encoding='utf-8').strip()
    titulo = 'Assistência por voz para pessoas cegas'
    descricao = 'Protótipo do mestrado de Júlia Quoos: um site para celular que reconhece objetos, obstáculos, lugares e textos pela câmera e responde por voz.'
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': url + '#pagina',
                'url': url,
                'name': titulo,
                'description': descricao,
                'inLanguage': 'pt-BR',
                'about': {'@id': url + '#app'},
                'author': {'@id': AUTORA['@id']},
            },
            {
                '@type': 'WebApplication',
                '@id': url + '#app',
                'name': 'Assistência por voz',
                'url': f'{site}/teste-mestrado/',
                'applicationCategory': 'AccessibilityApplication',
                'operatingSystem': 'Navegador do celular (Android e iPhone)',
                'isAccessibleForFree': True,
                'offers': {'@type': 'Offer', 'price': 0, 'priceCurrency': 'BRL'},
                'author': AUTORA,
                'inLanguage': 'pt-BR',
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': q,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for q, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Assistência por voz', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Assistência por voz</li></ol></nav>
    <p class="rotulo">Projeto pessoal</p>
    <h1>Assistência por voz para pessoas <span class="marca">cegas</span></h1>
    <p class="linha-fina">Um site para o celular que olha pela câmera e responde por voz: onde está a xícara, se o caminho está livre, o que diz uma placa, como chegar a um prédio. Gratuito, de código aberto e ainda em fase de testes.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="abrir-experimento">
        <h2 id="abrir-experimento">Abrir o experimento</h2>
        <p>Ao tocar em Começar, o navegador pede acesso à câmera e ao microfone. Nos pedidos de rua, também pede a localização. Leia antes o <a href="#aviso-seguranca">aviso sobre o protótipo</a> e <a href="#privacidade">o que acontece com os dados</a>.</p>
        <a class="btn98" href="/teste-mestrado/">Abrir a assistência por voz</a>
    </section>
</article>'''
    alt = 'Foto de Júlia Roberta Quoos Alves'
    head = cabeca(titulo + ' | Júlia Quoos', descricao, url, f'{site}/img/perfil.jpg', alt, 'website', ld)
    return head + '\n' + moldura('assistencia.exe', 'ohtopico.com.br/assistencia-por-voz', '/', conteudo, 'Pronto', 'assistencia')


PARA_ESCOLAS_IMAGEM = 'para-escolas/og-para-escolas.jpg'


def pagina_para_escolas(cfg):
    site = cfg['site']
    url = f'{site}/para-escolas/'
    corpo = (AQUI / 'conteudo' / 'para-escolas.html').read_text(encoding='utf-8').strip()
    titulo = 'Computação e IA para escolas e redes de ensino'
    descricao = ('Material gratuito de Computação da BNCC, guia de implantação e formação de professores em IA '
                 'para escolas, secretarias e redes de ensino.')
    imagem = f'{site}/{PARA_ESCOLAS_IMAGEM}'
    alt = ('Card com o título Escolas e redes: material gratuito da BNCC Computação, guia de implantação '
           'e formação de professores, com a página das habilidades da BNCC ao lado.')
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': url + '#pagina',
                'url': url,
                'name': titulo,
                'description': descricao,
                'inLanguage': 'pt-BR',
                'primaryImageOfPage': {'@type': 'ImageObject', 'url': imagem, 'width': 1200, 'height': 630},
                'audience': {'@type': 'EducationalAudience', 'educationalRole': 'administrator'},
                'author': {'@id': AUTORA['@id']},
                'relatedLink': [f'{site}/material-didatico/bncc/', f'{site}/computacao-na-escola/',
                                f'{site}/formacao-continuada/', f'{site}/mentoria/'],
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': q,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for q, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Para escolas e redes', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Para escolas e redes</li></ol></nav>
    <p class="rotulo">Para escolas e redes</p>
    <h1>Computação e IA para escolas e <span class="marca">redes de ensino</span></h1>
    <p class="linha-fina">Para direções, coordenações e secretarias de educação que precisam colocar a Computação da BNCC em prática: material gratuito para as aulas, um guia de implantação e formação para os professores.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="conversar">
        <h2 id="conversar">Conversar sobre a sua escola ou rede</h2>
        <p>Conte quantas escolas e professores são, as etapas de ensino e o que já foi feito com Computação e IA. A resposta vem com uma sugestão de por onde começar.</p>
        <a class="btn98" href="mailto:contato@ohtopico.com.br?subject=Computa%C3%A7%C3%A3o%20e%20IA%20para%20escolas%20e%20redes">Falar com Júlia Roberta Quoos Alves</a>
    </section>
</article>'''
    head = cabeca('Computação e IA para escolas e redes | Júlia Quoos', descricao, url, imagem, alt, 'website',
                  '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' + ld)
    return head + '\n' + moldura('para-escolas.html', 'ohtopico.com.br/para-escolas', '/', conteudo, 'Pronto', 'escolas')


PROMPTS_IMAGEM = 'dia03-pacto.png'


def pagina_prompts(cfg):
    site = cfg['site']
    url = f'{site}/prompts-para-professores/'
    bib = json.loads((AQUI / 'prompts.json').read_text(encoding='utf-8'))
    etapas, tipos = bib['etapas'], bib['tipos']
    total = sum(len(g['prompts']) for g in bib['grupos'])
    opcoes = lambda pares: ''.join(f'<option value="{v}">{esc(n)}</option>' for v, n in pares)
    disciplinas = [(slug_secao(g['disciplina']), g['disciplina']) for g in bib['grupos']]
    filtros = f'''<div class="filtros" id="filtros" role="search" aria-label="Filtrar prompts da disciplina" hidden>
<div class="filtros-campos">
<label for="f-etapa">Etapa<select id="f-etapa"><option value="">Todas</option>{opcoes(etapas.items())}</select></label>
<label for="f-tipo">Para quê<select id="f-tipo"><option value="">Tudo</option>{opcoes(tipos.items())}</select></label>
<label for="f-busca">Palavra-chave<input type="search" id="f-busca" placeholder="busca em todas as disciplinas" autocomplete="off"></label>
</div>
<div class="filtros-rodape"><p id="f-status" aria-live="polite">{total} prompts encontrados</p><button type="button" class="btn98" id="f-limpar">Limpar filtros</button></div>
</div>'''
    # A disciplina se escolhe primeiro; a padrão é a primeira do prompts.json ("Para todas as disciplinas")
    sumario = ('<h2 class="seletor-titulo" id="escolha-disciplina">Escolha a disciplina</h2>\n'
               + seletor('Disciplinas da biblioteca', disciplinas[0][0], None, disciplinas))
    secoes, itens_ld = [], []
    for g in bib['grupos']:
        gid = slug_secao(g['disciplina'])
        artigos = []
        for pr in g['prompts']:
            etiquetas = (''.join(f'<li class="etapa">{esc(etapas[e])}</li>' for e in pr['etapas'])
                         + f'<li class="tipo">{esc(tipos[pr["tipo"]])}</li>')
            artigos.append(f'''<article class="prompt-item" id="{pr['id']}" data-etapas="{' '.join(pr['etapas'])}" data-tipo="{pr['tipo']}">
<h3>{esc(pr['titulo'])}</h3>
<ul class="etiquetas" aria-label="Etapa e uso">{etiquetas}</ul>
<pre>{esc(pr['texto'])}</pre>
</article>''')
            itens_ld.append({
                '@type': 'ListItem', 'position': len(itens_ld) + 1,
                'item': {'@type': 'CreativeWork', '@id': f'{url}#{pr["id"]}', 'url': f'{url}#{pr["id"]}',
                         'name': f'{pr["titulo"]} ({g["disciplina"]})', 'text': pr['texto'],
                         'learningResourceType': 'Prompt de IA', 'about': g['disciplina'],
                         'educationalLevel': [etapas[e] for e in pr['etapas']],
                         'inLanguage': 'pt-BR', 'isAccessibleForFree': True},
            })
        secoes.append(f'<section class="grupo-prompts" id="{gid}" aria-labelledby="{gid}-titulo">\n'
                      f'<h2 id="{gid}-titulo">{esc(g["disciplina"])}</h2>\n' + '\n'.join(artigos) + '\n</section>')
    bloco = (sumario + '\n' + filtros + '\n<p class="sem-resultado" id="f-vazio" hidden>Nenhum prompt com esses filtros. '
             'Tente outra etapa ou limpe os filtros.</p>\n' + '\n'.join(secoes))
    corpo = (AQUI / 'conteudo' / 'biblioteca-prompts.html').read_text(encoding='utf-8').strip().replace('<!--PROMPTS-->', bloco)
    titulo = 'Biblioteca de prompts para professores'
    descricao = f'{total} prompts de IA prontos para professores, por disciplina e etapa de ensino, da Educação Infantil ao ensino médio, com orientações de LGPD.'
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CollectionPage',
                '@id': url + '#pagina',
                'url': url,
                'name': titulo,
                'description': descricao,
                'inLanguage': 'pt-BR',
                'isAccessibleForFree': True,
                'keywords': ['prompts para professores', 'prompts de IA para professores', 'IA na educação',
                             'planejamento de aulas com IA', 'formação de professores em IA'],
                'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
                'author': AUTORA,
                'publisher': {'@id': AUTORA['@id']},
                'primaryImageOfPage': {'@type': 'ImageObject', 'url': f'{site}/blog/img/{PROMPTS_IMAGEM}', 'width': 1080, 'height': 1350},
                'mainEntity': {'@id': url + '#prompts'},
                'relatedLink': [f'{site}/formacao-continuada/', f'{site}/mentoria/', f'{site}/blog/prompts-para-professores-planejar-aulas/'],
            },
            {
                '@type': 'ItemList',
                '@id': url + '#prompts',
                'name': titulo,
                'numberOfItems': total,
                'itemListElement': itens_ld,
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': q,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for q, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Biblioteca de prompts', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Biblioteca de prompts</li></ol></nav>
    <p class="rotulo">Biblioteca de prompts</p>
    <h1>Biblioteca de prompts para <span class="marca">professores</span></h1>
    <p class="linha-fina">{total} prompts de inteligência artificial prontos para copiar, organizados por disciplina e etapa de ensino: planejamento, atividades, avaliação, inclusão e comunicação com as famílias.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="levar-escola">
        <h2 id="levar-escola">Levar a biblioteca para a sua escola</h2>
        <p>Na <a href="/formacao-continuada/">formação continuada de professores em IA</a>, cada área monta e testa os próprios prompts com as tarefas reais da semana. Para um acompanhamento individual, há a <a href="/mentoria/">mentoria</a>.</p>
        <a class="btn98" href="mailto:contato@ohtopico.com.br?subject=Biblioteca%20de%20prompts%20para%20professores">Falar com Júlia Roberta Quoos Alves</a>
    </section>
</article>'''
    alt = 'Exemplo de prompt com cada parte da fórmula P.A.C.T.O. marcada em uma cor: papel, alvo, comando, tom e formato, observações.'
    head = cabeca(titulo + ' | Júlia Quoos', descricao, url, f'{site}/blog/img/{PROMPTS_IMAGEM}', alt, 'website', ld)
    return head + '\n' + moldura('prompts.txt', 'ohtopico.com.br/prompts-para-professores', '/', conteudo,
                                 f'Pronto · {total} prompts', 'prompts')


QUIZ_DIR = 'quiz-pensamento-computacional'
# quiz.js e quiz.css ficam direto na pasta do quiz (não são gerados); a versão muda quando eles mudam
_QUIZ_ASSETS = AQUI.parent.parent / QUIZ_DIR / 'assets'
VERSAO_QUIZ = hashlib.md5(b''.join((_QUIZ_ASSETS / n).read_bytes() for n in ('quiz.js', 'quiz.css') if (_QUIZ_ASSETS / n).exists())).hexdigest()[:10]
QUIZ_TITULO = 'Quiz de pensamento computacional para professores'
# título da aba curto: com a assinatura, fica dentro dos 60 caracteres
QUIZ_TITULO_ABA = 'Quiz: pensamento computacional do professor'
QUIZ_IMAGEM_ALT = ('Capa do quiz de pensamento computacional para professores, de Júlia Roberta Quoos Alves: '
                   '12 perguntas sobre decomposição, reconhecimento de padrões, abstração e algoritmos.')


def quiz_dados():
    return json.loads((AQUI / 'quiz.json').read_text(encoding='utf-8'))


def pagina_quiz(cfg):
    site = cfg['site']
    url = f'{site}/{QUIZ_DIR}/'
    q = quiz_dados()
    pilares, perguntas = q['pilares'], q['perguntas']
    total = len(perguntas)
    letras = 'ABCD'
    blocos = []
    for n, p in enumerate(perguntas, 1):
        opcoes = ''.join(f'<li><label class="quiz-opcao"><input type="radio" name="{p["id"]}" value="{i}">'
                         f'<span class="quiz-letra" aria-hidden="true">{letras[i]}</span><span>{esc(o)}</span></label></li>'
                         for i, o in enumerate(p['opcoes']))
        blocos.append(f'''<fieldset class="quiz-q" id="{p['id']}" data-pilar="{p['pilar']}" data-certa="{p['certa']}">
<legend><span class="quiz-num">Pergunta {n} de {total}</span> {esc(p['enunciado'])}</legend>
<ul class="quiz-opcoes">{opcoes}</ul>
<div class="quiz-explica" role="status"><p class="quiz-veredito"></p><p><strong>Pilar: {esc(pilares[p['pilar']]['nome'])}.</strong> {esc(p['explica'])}</p></div>
</fieldset>''')
    pil_json = esc(json.dumps({k: v['nome'] for k, v in pilares.items()}, ensure_ascii=False))
    niv_json = esc(json.dumps(q['niveis'], ensure_ascii=False))
    quiz = f'''<section class="quiz" id="quiz" aria-labelledby="quiz-titulo" data-pilares="{pil_json}" data-niveis="{niv_json}">
<h2 id="quiz-titulo" class="sr-only">Quiz</h2>
<div class="quiz-capa" id="quiz-capa">
<ul class="quiz-fatos"><li><strong>{total}</strong> perguntas</li><li><strong>4</strong> pilares</li><li><strong>5</strong> minutos</li></ul>
<p>Situações reais de sala de aula e pequenos desafios. Depois de cada resposta, você vê a explicação. No fim, recebe o seu nível, o seu ponto forte e uma imagem para compartilhar no LinkedIn.</p>
<p class="quiz-miudo">Sem cadastro e sem cookies: as respostas ficam só no seu navegador.</p>
<button type="button" class="btn98 escuro quiz-grande" id="quiz-comecar">Começar o quiz</button>
</div>
<form class="quiz-form" id="quiz-form" aria-label="Perguntas do quiz">
<div class="quiz-barra" aria-hidden="true"><span id="quiz-barra"></span></div>
{chr(10).join(blocos)}
<div class="quiz-nav">
<button type="button" class="btn98" id="quiz-voltar">Anterior</button>
<p class="quiz-placar" id="quiz-placar" aria-live="polite"></p>
<button type="button" class="btn98 escuro" id="quiz-proxima" disabled>Próxima</button>
</div>
</form>
<section class="quiz-resultado" id="quiz-resultado" aria-labelledby="res-nivel" tabindex="-1" hidden></section>
</section>'''
    corpo = (AQUI / 'conteudo' / 'quiz-pensamento-computacional.html').read_text(encoding='utf-8').strip().replace('<!--QUIZ-->', quiz)
    descricao = 'Quiz gratuito de pensamento computacional para professores: 12 perguntas sobre decomposição, padrões, abstração e algoritmos, com resultado para compartilhar.'
    imagem = f'{site}/{QUIZ_DIR}/img/quiz-pensamento-computacional.png'
    ld = json_ld({
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Quiz',
                '@id': url + '#quiz',
                'url': url,
                'name': QUIZ_TITULO,
                'description': descricao,
                'inLanguage': 'pt-BR',
                'isAccessibleForFree': True,
                'educationalLevel': 'Formação de professores',
                'learningResourceType': 'Quiz',
                'timeRequired': 'PT5M',
                'about': [{'@type': 'Thing', 'name': 'Pensamento computacional'}]
                         + [{'@type': 'Thing', 'name': v['nome'], 'description': v['resumo']} for v in pilares.values()],
                'educationalAlignment': {'@type': 'AlignmentObject', 'alignmentType': 'educationalSubject',
                                         'targetName': 'BNCC Computação: eixo Pensamento computacional'},
                'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
                'author': AUTORA,
                'publisher': {'@id': AUTORA['@id']},
                'image': imagem,
                'hasPart': [{'@type': 'Question', 'eduQuestionType': 'Multiple choice', 'name': p['enunciado'],
                             'acceptedAnswer': {'@type': 'Answer', 'text': p['opcoes'][p['certa']]},
                             'suggestedAnswer': [{'@type': 'Answer', 'text': o} for i, o in enumerate(p['opcoes']) if i != p['certa']]}
                            for p in perguntas],
            },
            {
                '@type': 'FAQPage',
                '@id': url + '#perguntas',
                'mainEntity': [{'@type': 'Question', 'name': pq,
                                'acceptedAnswer': {'@type': 'Answer', 'text': r}} for pq, r in perguntas_frequentes(corpo)],
            },
            {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                    {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{site}/'},
                    {'@type': 'ListItem', 'position': 2, 'name': 'Quiz de pensamento computacional', 'item': url},
                ],
            },
        ],
    })
    conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Quiz de pensamento computacional</li></ol></nav>
    <p class="rotulo">Quiz para professores</p>
    <h1>Quiz de pensamento computacional para <span class="marca">professores</span></h1>
    <p class="linha-fina">Quanto você já usa decomposição, padrões, abstração e algoritmos no dia a dia da escola? Responda {total} perguntas curtas e descubra o seu nível.</p>
    <div class="artigo">
{corpo}
    </div>
    <section class="chamada" aria-labelledby="levar-escola">
        <h2 id="levar-escola">Levar o pensamento computacional para a sua escola</h2>
        <p>Na <a href="/formacao-continuada/">formação continuada de professores</a>, cada área planeja atividades de pensamento computacional e de IA com o material real da escola. Para um acompanhamento individual, há a <a href="/mentoria/">mentoria</a>.</p>
        <a class="btn98" href="mailto:contato@ohtopico.com.br?subject=Pensamento%20computacional%20na%20escola">Falar com Júlia Roberta Quoos Alves</a>
    </section>
</article>'''
    extra = ('<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' + ld
             + f'\n<link rel="stylesheet" href="/{QUIZ_DIR}/assets/quiz.css?v={VERSAO_QUIZ}">')
    head = cabeca(QUIZ_TITULO_ABA + ' | Júlia Quoos', descricao, url, imagem, QUIZ_IMAGEM_ALT, 'website', extra)
    pagina = moldura('quiz.exe', f'ohtopico.com.br/{QUIZ_DIR}', '/', conteudo, f'Pronto · {total} perguntas', 'quiz')
    return head + '\n' + pagina.replace('</body>', f'<script src="/{QUIZ_DIR}/assets/quiz.js?v={VERSAO_QUIZ}" defer></script>\n</body>')


def paginas_resultado_quiz(cfg):
    """Uma página por nível, só para o LinkedIn mostrar a imagem do nível ao compartilhar (noindex)."""
    site = cfg['site']
    q = quiz_dados()
    paginas = {}
    for nv in q['niveis']:
        url = f'{site}/{QUIZ_DIR}/resultado/{nv["id"]}/'
        titulo = f'Meu nível no quiz de pensamento computacional: {nv["nome"]}'
        descricao = f'{nv["texto"]} Faça também o quiz gratuito para professores, com 12 perguntas e explicação em cada resposta.'
        alt = f'Resultado do quiz de pensamento computacional para professores: nível {nv["nome"]}.'
        conteudo = f'''<article class="texto">
    <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="/{QUIZ_DIR}/">Quiz de pensamento computacional</a></li><li aria-current="page">{esc(nv['nome'])}</li></ol></nav>
    <p class="rotulo">Resultado do quiz</p>
    <h1>{esc(nv['nome'])}</h1>
    <p class="linha-fina">Este é um dos quatro níveis do quiz de pensamento computacional para professores.</p>
    <figure class="infografico"><img src="/{QUIZ_DIR}/img/resultado-{nv['id']}.png" width="1200" height="630" alt="{esc(alt)}" decoding="async"></figure>
    <div class="artigo">
<p>{esc(nv['texto'])}</p>
    </div>
    <section class="chamada" aria-labelledby="fazer-quiz">
        <h2 id="fazer-quiz">Qual é o seu nível?</h2>
        <p>São 12 perguntas sobre decomposição, reconhecimento de padrões, abstração e algoritmos, com a explicação de cada resposta. Leva cerca de cinco minutos.</p>
        <a class="btn98 escuro" href="/{QUIZ_DIR}/">Fazer o quiz</a>
    </section>
</article>'''
        extra = '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">'
        head = cabeca(titulo, descricao, url, f'{site}/{QUIZ_DIR}/img/resultado-{nv["id"]}.png', alt, 'website', extra,
                      robots='noindex, follow')
        paginas[f'{QUIZ_DIR}/resultado/{nv["id"]}'] = head + '\n' + moldura('quiz.exe', f'ohtopico.com.br/{QUIZ_DIR}/resultado', f'/{QUIZ_DIR}/',
                                                                           conteudo, 'Pronto', 'quiz')
    return paginas


def pagina_movida(cfg, para):
    """Post que foi juntado a outra página: o endereço antigo continua funcionando e manda para o novo."""
    canonico = cfg['site'] + para.split('#')[0]
    return f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Página movida | Júlia Quoos</title><meta name="robots" content="noindex">
<link rel="canonical" href="{canonico}">
<meta http-equiv="refresh" content="0; url={para}">
<script>location.replace('{para}');</script></head>
<body style="font-family:system-ui,sans-serif;padding:24px">Esta página mudou de endereço: <a href="{para}">continuar</a>.</body></html>
'''


def feed(cfg, publicados):
    site = cfg['site']
    itens = ''.join(f'''
  <item>
    <title>{esc(p["titulo"])}</title>
    <link>{site}/blog/{p["slug"]}/</link>
    <guid>{site}/blog/{p["slug"]}/</guid>
    <pubDate>{date.fromisoformat(p["data"]).strftime("%a, %d %b %Y")} 09:00:00 -0300</pubDate>
    <description>{esc(p["descricao"])}</description>
  </item>''' for p in reversed(publicados))
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Blog de Júlia Roberta Quoos Alves</title>
  <link>{site}/blog/</link>
  <description>Formação de professores em IA, na prática.</description>
  <language>pt-BR</language>{itens}
</channel>
</rss>
'''


def lastmod_atual(xml, url):
    m = re.search(rf'<loc>{re.escape(url)}</loc><lastmod>([\d-]+)</lastmod>', xml)
    return m.group(1) if m else None


def atualizar_sitemap(site_dir, cfg, publicados, mentoria_pronta, hoje, mudaram):
    """hoje: data da publicação (lastmod no futuro faz o Google desconfiar do sitemap).
    mudaram: páginas fixas ('mentoria', 'formacao-continuada', 'para-escolas', 'prompts-para-professores', 'assistencia-por-voz', QUIZ_DIR) cujo HTML mudou nesta execução;
    as outras mantêm o lastmod que já estava no sitemap."""
    caminho = site_dir / 'sitemap.xml'
    xml = caminho.read_text(encoding='utf-8')
    linhas = [f'  <url><loc>{cfg["site"]}/blog/</loc><lastmod>{min(max(p["data"] for p in publicados), hoje)}</lastmod></url>']
    linhas += [f'  <url><loc>{cfg["site"]}/blog/{p["slug"]}/</loc><lastmod>{min(p.get("atualizado", p["data"]), hoje)}</lastmod></url>' for p in publicados]
    fixas = (['mentoria'] if mentoria_pronta else []) + ['formacao-continuada', 'para-escolas', 'prompts-para-professores', 'assistencia-por-voz', QUIZ_DIR]
    for pagina in fixas:
        url = f'{cfg["site"]}/{pagina}/'
        lastmod = hoje if pagina in mudaram else (lastmod_atual(xml, url) or hoje)
        linhas.append(f'  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod></url>')
    bloco = '  <!-- blog: início (gerado por gerar.py) -->\n' + '\n'.join(linhas) + '\n  <!-- blog: fim -->'
    if '<!-- blog: início' in xml:
        xml = re.sub(r'  <!-- blog: início.*?<!-- blog: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True, type=Path)
    ap.add_argument('--imagens', required=True, type=Path, nargs='+', help='pastas onde procurar as imagens, em ordem')
    ap.add_argument('--slides', type=Path, help='pasta com os PDFs de slides dos posts')
    ap.add_argument('--ate', help='publica só posts com data até este dia (AAAA-MM-DD)')
    ap.add_argument('--sitemap', action='store_true', help='atualiza o bloco do blog no sitemap.xml')
    a = ap.parse_args()

    cfg = json.loads((AQUI / 'posts.json').read_text(encoding='utf-8'))
    posts = sorted(cfg['posts'], key=lambda p: p['data'])
    publicados = [p for p in posts if not a.ate or p['data'] <= a.ate]
    agendados = [p for p in posts if p not in publicados]
    hoje = a.ate or date.today().isoformat()
    CONTEXTO['posts'] = publicados
    CONTEXTO['contador'] = cfg.get('contador')
    CONTEXTO['agendados'] = agendados

    blog = a.site / 'blog'
    (blog / 'assets').mkdir(parents=True, exist_ok=True)
    (blog / 'img').mkdir(exist_ok=True)
    shutil.copy(AQUI / 'blog.css', blog / 'assets' / 'blog.css')
    shutil.copy(AQUI / 'blog.js', blog / 'assets' / 'blog.js')

    # Posts agendados: nada deles pode ficar no site antes da data
    imagens_do = lambda p: [p['imagem']] + [e['imagem'] for e in p.get('imagens_extra', [])]
    fixas = ['dia07-mentoria.png', FORMACAO_IMAGEM, DIAGNOSTICO_IMAGEM, PROMPTS_IMAGEM]
    em_uso = {i for p in publicados for i in imagens_do(p)} | set(fixas)
    for p in agendados:
        shutil.rmtree(blog / p['slug'], ignore_errors=True)
        for img in imagens_do(p):
            if img not in em_uso:
                (blog / 'img' / img).unlink(missing_ok=True)
                (blog / 'img' / (Path(img).stem + '-mini.webp')).unlink(missing_ok=True)
        if p.get('slides'):
            (blog / 'slides' / p['slides']['pdf']).unlink(missing_ok=True)

    dims = {}
    for nome in dict.fromkeys([i for p in publicados for i in imagens_do(p)] + fixas):
        origem = next((d / nome for d in a.imagens if (d / nome).exists()), None)
        if origem is None:
            raise SystemExit(f'Imagem não encontrada: {nome}')
        destino, mini = blog / 'img' / nome, blog / 'img' / (Path(nome).stem + '-mini.webp')
        # Só refaz a miniatura quando a imagem muda (o WEBP não sai igual byte a byte em toda versão do Pillow)
        mudou = not destino.exists() or destino.read_bytes() != origem.read_bytes()
        if mudou:
            shutil.copy(origem, destino)
        with Image.open(origem) as im:
            dims[nome] = im.size
            refazer = mudou or not mini.exists()
            if not refazer:
                with Image.open(mini) as m:
                    refazer = m.width != MINI_LARGURA
            if refazer:
                im.convert('RGB').resize((MINI_LARGURA, round(MINI_LARGURA * im.size[1] / im.size[0])), Image.LANCZOS).save(mini, 'WEBP', quality=80)

    tamanhos = {}
    for p in publicados:
        if p.get('slides'):
            if not a.slides:
                raise SystemExit(f'{p["slug"]} tem slides: informe --slides')
            (blog / 'slides').mkdir(exist_ok=True)
            pdf = a.slides / p['slides']['pdf']
            shutil.copy(pdf, blog / 'slides' / pdf.name)
            tamanhos[pdf.name] = pdf.stat().st_size

    for i, p in enumerate(publicados):
        ant = publicados[i - 1] if i > 0 else None
        prox = publicados[i + 1] if i + 1 < len(publicados) else None
        destino = blog / p['slug']
        destino.mkdir(exist_ok=True)
        (destino / 'index.html').write_text(pagina_post(cfg, p, ant, prox, dims, tamanhos), encoding='utf-8')

    for m in cfg.get('movidos', []):
        destino = blog / m['slug']
        destino.mkdir(exist_ok=True)
        (destino / 'index.html').write_text(pagina_movida(cfg, m['para']), encoding='utf-8')

    (blog / 'index.html').write_text(pagina_indice(cfg, publicados), encoding='utf-8')
    (blog / 'feed.xml').write_text(feed(cfg, publicados), encoding='utf-8')

    mentoria, pendente = pagina_mentoria(cfg, dims)
    mudaram = set()
    for pagina, texto in (('mentoria', mentoria), ('formacao-continuada', pagina_formacao(cfg, dims)),
                          ('para-escolas', pagina_para_escolas(cfg)),
                          ('prompts-para-professores', pagina_prompts(cfg)),
                          ('assistencia-por-voz', pagina_assistencia(cfg)), (QUIZ_DIR, pagina_quiz(cfg)),
                          *paginas_resultado_quiz(cfg).items()):
        caminho = a.site / pagina / 'index.html'
        caminho.parent.mkdir(parents=True, exist_ok=True)
        if not caminho.exists() or caminho.read_text(encoding='utf-8') != texto:
            caminho.write_text(texto, encoding='utf-8')
            mudaram.add(pagina)

    if a.sitemap:
        atualizar_sitemap(a.site, cfg, publicados, not pendente, hoje, mudaram)

    print(f'{len(publicados)} posts gerados em {blog}; {len(agendados)} agendados')
    if pendente:
        print('Mentoria: há trechos [pendentes]; a página saiu com noindex e fora do sitemap.')


if __name__ == '__main__':
    main()
