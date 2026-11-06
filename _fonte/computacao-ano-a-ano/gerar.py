"""Gera a seção /computacao-ano-a-ano/: um ano letivo de Computação por série (1º ao 6º), com uma página por aula.

    python _fonte/computacao-ano-a-ano/figuras.py   figuras.js dos jogos
    python _fonte/computacao-ano-a-ano/jogos.py     páginas dos jogos e bloco no dados.js
    python _fonte/computacao-ano-a-ano/gerar.py     páginas do ano e das aulas, sitemap
    node _fonte/computacao-ano-a-ano/pdf.js         caderno do estudante e guia do professor em PDF (confere se alguma folha transborda)
    node _fonte/material/gerar.js                   cabeçalho, texto do professor e dados estruturados dos jogos

Conteúdo: anoN.py (aulas), jogosN.py (jogos). Peças das folhas: folhas.py. Desenhos: figuras.py.
"""
import hashlib
import html
import importlib
import json
import re
import shutil
from datetime import date
from pathlib import Path

from jogos import JOGOS

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
MAT = AQUI.parent / 'matematica-adaptada'
SAIDA = RAIZ / 'computacao-ano-a-ano'
SITE = 'https://ohtopico.com.br'
HUB = '/computacao-ano-a-ano/'
OG = f'{SITE}/material-didatico/assets/og-bncc.jpg'
esc = html.escape
ANOS = [importlib.import_module(f'ano{n}') for n in range(1, 7) if (AQUI / f'ano{n}.py').exists()]
JOGO = {j['id']: j for j in JOGOS}
AUTORA = {'@type': 'Person', '@id': f'{SITE}/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/'}
RODAPE = 'ohtopico.com.br/computacao-ano-a-ano · Júlia Roberta Quoos Alves · uso livre em sala de aula'


def habs_texto():
    t = (RAIZ / 'material-didatico' / 'assets' / 'dados.js').read_text(encoding='utf-8')
    return {c: (int(a), o, x) for c, a, _e, o, x in re.findall(r"\['(EF0\dCO\d\d)', (\d+), '(\w+)', '([^']*)', '([^']*)'\]", t)}


HAB = habs_texto()

GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def slug(s):
    import unicodedata
    s = unicodedata.normalize('NFD', s).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s).strip('-')
    return s[:48].rstrip('-')


def aula_slug(a):
    return f'aula-{a["n"]:02d}-{slug(a["titulo"])}'


def versao():
    return hashlib.md5(b''.join(p.read_bytes() for p in (MAT / 'fichas.css', AQUI / 'ano-a-ano.css'))).hexdigest()[:10]


def cabeca(titulo, descricao, url, ld, v, robots='index, follow'):
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descricao)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(descricao)}">
<meta property="og:image" content="{OG}">
<meta property="og:image:alt" content="Card de BNCC Computação do material didático de Júlia Roberta Quoos Alves.">
<meta name="twitter:card" content="summary_large_image">
{f'<script type="application/ld+json">{chr(10)}{ld}{chr(10)}</script>' if ld else ''}
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={v}">
<link rel="stylesheet" href="/computacao-ano-a-ano/assets/ano-a-ano.css?v={v}">
{GTAG}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
    <a class="marca-site" href="/">Júlia Quoos</a>
    <nav aria-label="Principal"><a href="{HUB}">Computação ano a ano</a><a href="/material-didatico/jogos/">Jogos</a><a href="/material-didatico/bncc/">BNCC Computação</a><a href="/blog/">Blog</a></nav>
</header>
'''


RODAPE_PAG = '''<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/computacao-ano-a-ano/">Computação ano a ano</a> · <a href="/computacao-desplugada/">Computação desplugada</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/">Área de trabalho</a></p>
</footer>
<script src="/computacao-ano-a-ano/assets/ano-a-ano.js" defer></script>
'''


def topo_folha(rotulo, mod, a):
    return f'<header class="folha-topo"><span class="nivel"><b>{rotulo}</b></span><span class="hab">{" · ".join(a["habs"])} · Computação · {mod.ANO}º ano · Aula {a["n"]}</span></header>'


def folha_estudante(mod, a):
    return f'''<article class="folha" data-versao="Estudante" aria-label="{esc(a['titulo'])}, folha do estudante">
    {topo_folha('Folha do estudante', mod, a)}
    <div class="aluno"><span>Nome: <i class="traco longo"></i></span><span>Data: <i class="traco"></i></span></div>
    <h2 class="folha-titulo">{esc(a['titulo'])}</h2>
    {a['atividade']}
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''


def folha_professor(mod, a):
    passos = ''.join(f'<li>{esc(x)}</li>' for x in a['passos'])
    gab = ''.join(f'<li>{esc(x)}</li>' for x in a['gabarito'])
    habs = ''.join(f'<p><b>{c}</b>: {esc(HAB[c][2])}</p>' for c in a['habs'])
    jogo = f'<h3>Jogo</h3><p>{esc(JOGO[a["jogo"]]["titulo"])}: ohtopico.com.br/material-didatico/jogos/{a["jogo"]}.html</p>' if a.get('jogo') else ''
    return f'''<article class="folha folha-prof" data-versao="Professor" aria-label="Orientações e gabarito">
    <header class="folha-topo"><span class="nivel"><b>Orientações e gabarito</b></span><span class="hab">{mod.ANO}º ano · Aula {a['n']} · {esc(a['tempo'])}</span></header>
    <h2 class="folha-titulo">{esc(a['titulo'])}</h2>
    <h3>Objetivo</h3><p>{esc(a['objetivo'])}</p>
    <h3>Habilidades da BNCC</h3>{habs}
    <h3>Material</h3><p>{esc(a['material'])}</p>
    <h3>Passo a passo</h3><ol>{passos}</ol>
    <h3>Texto para ler com a turma</h3><p class="texto-turma">{esc(a['turma'])}</p>
    <h3>Gabarito</h3><ul>{gab}</ul>
    <h3>Alunos com diferentes necessidades</h3><p>{esc(a['adaptar'])}</p>
    {jogo}
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''


def migalhas(itens):
    return {'@type': 'BreadcrumbList', 'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': u} for i, (n, u) in enumerate(itens)]}


def pdfs(mod):
    base = f'{HUB}{mod.ANO}-ano/'
    return (f'computacao-{mod.ANO}-ano-caderno-do-estudante.pdf', f'computacao-{mod.ANO}-ano-guia-do-professor.pdf', base)


def pagina_aula(mod, i, v):
    a = mod.AULAS[i]
    base = f'{HUB}{mod.ANO}-ano/'
    url = f'{SITE}{base}{aula_slug(a)}/'
    titulo = next((t for t in (f'{a["titulo"]}: Computação {mod.ANO}º ano | Júlia Quoos', f'{a["titulo"]} | Computação {mod.ANO}º ano',
                               f'{a["titulo"]} | Júlia Quoos') if len(t) <= 60), a['titulo'])
    desc = next((d for d in (f'Aula {a["n"]} de Computação do {mod.ANO}º ano ({", ".join(a["habs"][:3])}): {a["objetivo"]} Com folha para imprimir e gabarito.',
                             f'Aula {a["n"]} de Computação do {mod.ANO}º ano: {a["objetivo"]} Com folha e gabarito.',
                             f'{a["objetivo"]} Com folha para imprimir e gabarito.') if len(d) <= 160), a['objetivo'])
    cad, guia, _ = pdfs(mod)
    passos = ''.join(f'<li>{esc(x)}</li>' for x in a['passos'])
    gab = ''.join(f'<li>{esc(x)}</li>' for x in a['gabarito'])
    habs = ''.join(f'<li><a href="/material-didatico/catalogo.html?hab={c}">{c}</a>: {esc(HAB[c][2])}</li>' for c in a['habs'])
    bim = mod.BIMESTRES[a['bim'] - 1][0]
    jogo = ''
    if a.get('jogo'):
        j = JOGO[a['jogo']]
        jogo = (f'<h2>Jogo da aula</h2><p><a href="/material-didatico/jogos/{j["id"]}.html"><b>{esc(j["titulo"])}</b></a>: {esc(j["resumo"])}</p>')
    ant = mod.AULAS[i - 1] if i > 0 else None
    prox = mod.AULAS[i + 1] if i + 1 < len(mod.AULAS) else None
    nav = '<nav class="vizinhas" aria-label="Outras aulas">' + (
        f'<a href="{base}{aula_slug(ant)}/">← Aula {ant["n"]}: {esc(ant["titulo"])}</a>' if ant else '<span></span>') + (
        f'<a href="{base}{aula_slug(prox)}/">Aula {prox["n"]}: {esc(prox["titulo"])} →</a>' if prox else '') + '</nav>'
    ld = json.dumps({'@context': 'https://schema.org', '@graph': [
        {'@type': 'LearningResource', '@id': url + '#aula', 'url': url, 'name': f'{a["titulo"]} (Computação, {mod.ANO}º ano, aula {a["n"]})',
         'description': desc, 'inLanguage': 'pt-BR', 'learningResourceType': 'Plano de aula com atividade para imprimir', 'isAccessibleForFree': True,
         'educationalLevel': f'{mod.ANO}º ano do Ensino Fundamental', 'timeRequired': 'PT50M',
         'educationalAlignment': [{'@type': 'AlignmentObject', 'alignmentType': 'teaches', 'educationalFramework': 'BNCC Computação',
                                   'targetName': c, 'targetDescription': HAB[c][2]} for c in a['habs']],
         'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'}, 'author': AUTORA,
         'license': 'https://creativecommons.org/licenses/by-nc-sa/4.0/', 'isPartOf': {'@id': f'{SITE}{base}#curso'}},
        migalhas([('Início', f'{SITE}/'), ('Computação ano a ano', f'{SITE}{HUB}'), (f'{mod.ANO}º ano', f'{SITE}{base}'), (a['titulo'], url)])]},
        ensure_ascii=False, indent=1)
    return cabeca(titulo, desc, url, ld, v) + f'''<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="{HUB}">Computação ano a ano</a></li><li><a href="{base}">{mod.ANO}º ano</a></li><li aria-current="page">Aula {a['n']}</li></ol></nav>
        <p class="rotulo">Computação · {mod.ANO}º ano · Aula {a['n']} de {len(mod.AULAS)} · {a['bim']}º bimestre</p>
        <h1>{esc(a['titulo'])}</h1>
        <p class="linha-fina">{esc(a['objetivo'])}</p>
        <div class="acoes">
            <button type="button" class="btn98 escuro" data-imprimir="Estudante">Imprimir folha do estudante</button>
            <button type="button" class="btn98" data-imprimir="Professor">Imprimir orientações e gabarito</button>
            <a class="btn98" href="{base}{cad}" download>Caderno do ano (PDF)</a>
        </div>
        <dl class="ficha-dados">
            <dt>Tempo</dt><dd>{esc(a['tempo'])}</dd>
            <dt>Bimestre</dt><dd>{a['bim']}º: {esc(bim)}</dd>
            <dt>Material</dt><dd>{esc(a['material'])}</dd>
        </dl>
        <h2>Habilidades da BNCC</h2>
        <ul>{habs}</ul>
        <h2>Passo a passo</h2>
        <ol>{passos}</ol>
        <h2>Texto para ler com a turma</h2>
        <p class="texto-turma-pag">{esc(a['turma'])}</p>
        {jogo}
        <h2>Alunos com diferentes necessidades</h2>
        <p>{esc(a['adaptar'])}</p>
        <details class="gabarito"><summary>Gabarito</summary><ul>{gab}</ul></details>
        <h2 id="folhas">Folha para imprimir</h2>
        <p>A folha é A4 com fundo branco, para economizar tinta. A segunda folha traz as orientações e o gabarito para o professor.</p>
    </div>
    <div class="folhas">
{folha_estudante(mod, a)}
{folha_professor(mod, a)}
    </div>
    <div class="texto">
        {nav}
        <p class="voltar"><a href="{base}">Ver todas as aulas do {mod.ANO}º ano</a></p>
    </div>
</main>
{RODAPE_PAG}</body>
</html>
'''


def jogos_do_ano(mod):
    return [j for j in JOGOS if j['ano'] == mod.ANO] + getattr(mod, 'JOGOS_EXISTENTES', [])


def pagina_ano(mod, v):
    base = f'{HUB}{mod.ANO}-ano/'
    url = f'{SITE}{base}'
    titulo = f'Computação {mod.ANO}º ano: ano letivo completo BNCC | Júlia Quoos'
    if len(titulo) > 60:
        titulo = f'Computação {mod.ANO}º ano: aulas e atividades BNCC'
    desc = mod.RESUMO if len(mod.RESUMO) <= 160 else mod.RESUMO[:157].rsplit(' ', 1)[0] + '…'
    cad, guia, _ = pdfs(mod)
    habs_ano = sorted({c for a in mod.AULAS for c in a['habs'] if HAB[c][0] == mod.ANO})
    habs = ''.join(f'<li><b>{c}</b> ({esc(HAB[c][1])}): {esc(HAB[c][2])}</li>' for c in habs_ano)
    bims = ''
    for b, (nome, resumo) in enumerate(mod.BIMESTRES, 1):
        itens = ''
        for a in [x for x in mod.AULAS if x['bim'] == b]:
            jg = f' · jogo {esc(JOGO[a["jogo"]]["titulo"])}' if a.get('jogo') else ''
            itens += (f'<li><span class="n">{a["n"]}</span><a href="{aula_slug(a)}/">{esc(a["titulo"])}</a>'
                      f'<span class="meta">{" · ".join(a["habs"][:4])}{" e outras" if len(a["habs"]) > 4 else ""}{jg}</span></li>')
        bims += f'<section class="bimestre"><h3>{b}º bimestre: {esc(nome)}</h3><p>{esc(resumo)}</p><ol class="lista-aulas">{itens}</ol></section>'
    jogos = ''.join(f'<li><a href="/material-didatico/jogos/{j["id"]}.html">{esc(j["titulo"])}</a><span>{" · ".join(j["habs"])}</span><span>{esc(j["resumo"])}</span></li>'
                    for j in jogos_do_ano(mod))
    apres = ''.join(f'<p>{esc(x)}</p>' for x in mod.APRESENTACAO)
    ld = json.dumps({'@context': 'https://schema.org', '@graph': [
        {'@type': 'Course', '@id': url + '#curso', 'url': url, 'name': mod.TITULO, 'description': mod.RESUMO, 'inLanguage': 'pt-BR',
         'educationalLevel': f'{mod.ANO}º ano do Ensino Fundamental', 'isAccessibleForFree': True, 'provider': AUTORA, 'author': AUTORA,
         'teaches': [f'{c}: {HAB[c][2]}' for c in habs_ano],
         'hasCourseInstance': {'@type': 'CourseInstance', 'courseMode': 'presencial', 'courseWorkload': f'PT{len(mod.AULAS) * 50}M'},
         'offers': {'@type': 'Offer', 'price': '0', 'priceCurrency': 'BRL', 'category': 'Gratuito'},
         'hasPart': [{'@type': 'LearningResource', 'name': a['titulo'], 'url': f'{url}{aula_slug(a)}/'} for a in mod.AULAS]},
        migalhas([('Início', f'{SITE}/'), ('Computação ano a ano', f'{SITE}{HUB}'), (f'{mod.ANO}º ano', url)])]}, ensure_ascii=False, indent=1)
    outros = ''.join(f'<a class="btn98" href="{HUB}{m.ANO}-ano/">{m.ANO}º ano</a>' for m in ANOS if m is not mod)
    return cabeca(titulo, desc, url, ld, v) + f'''<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="{HUB}">Computação ano a ano</a></li><li aria-current="page">{mod.ANO}º ano</li></ol></nav>
        <p class="rotulo">BNCC Computação · {len(mod.AULAS)} aulas · {len(jogos_do_ano(mod))} jogos</p>
        <h1>{esc(mod.TITULO)}</h1>
        <p class="linha-fina">{esc(mod.RESUMO)}</p>
        <div class="acoes">
            <a class="btn98 escuro" href="{cad}" download>Caderno do estudante (PDF)</a>
            <a class="btn98" href="{guia}" download>Guia do professor com gabaritos (PDF)</a>
            {outros}
        </div>
        <h2>Como é o ano</h2>
        {apres}
        <h2>Habilidades da BNCC do {mod.ANO}º ano</h2>
        <ul>{habs}</ul>
        <h2 id="aulas">As {len(mod.AULAS)} aulas</h2>
        <p>Cada aula tem objetivo, material, passo a passo, texto para ler com a turma, sugestões para alunos com diferentes necessidades, folha para imprimir e gabarito. A última aula de cada bimestre é de revisão e avaliação.</p>
        {bims}
        <h2 id="jogos">Jogos do {mod.ANO}º ano</h2>
        <p>{"Os jogos não pedem leitura: funcionam com figuras, sons e uma voz opcional, e têm o painel de acessibilidade do site (voz, legendas dos sons, alto contraste e letra maior)." if mod.ANO <= 3 else "Os jogos têm frases curtas, voz opcional e o painel de acessibilidade do site (voz, legendas dos sons, alto contraste e letra maior)."} Funcionam no computador, no tablet e no celular, sem cadastro.</p>
        <ul class="jogos-ano">{jogos}</ul>
    </div>
</main>
{RODAPE_PAG}</body>
</html>
'''


def pagina_impressao(mod, v, tipo):
    """Página só para o PDF: todas as folhas do estudante ou todas as orientações. Fica fora do sitemap e com noindex."""
    folhas = ''.join((folha_estudante if tipo == 'Estudante' else folha_professor)(mod, a) for a in mod.AULAS)
    nome = 'Caderno do estudante' if tipo == 'Estudante' else 'Guia do professor'
    capa = f'''<article class="folha" data-versao="{tipo}"><header class="folha-topo"><span class="nivel"><b>{nome}</b></span><span class="hab">BNCC Computação</span></header>
    <h2 class="folha-titulo" style="font-size:12mm;margin-top:40mm">{esc(mod.TITULO)}</h2><p class="txt" style="font-size:5mm">{nome}. {len(mod.AULAS)} aulas em 4 bimestres.</p>
    <ol style="font-size:3.8mm;columns:2">{''.join(f'<li>{esc(a["titulo"])}</li>' for a in mod.AULAS)}</ol>
    <p class="txt">Júlia Roberta Quoos Alves · ohtopico.com.br/computacao-ano-a-ano/{mod.ANO}-ano/ · uso livre em sala de aula (CC BY-NC-SA 4.0)</p>
    <footer class="folha-rodape">{RODAPE}</footer></article>'''
    return cabeca(f'{nome}: {mod.TITULO}', mod.RESUMO, f'{SITE}{HUB}{mod.ANO}-ano/', '', v, 'noindex, nofollow') + \
        f'<main id="conteudo"><div class="folhas">{capa}{folhas}</div></main></body></html>\n'


def hub(v):
    url = f'{SITE}{HUB}'
    titulo = 'Computação ano a ano: 1º ao 6º ano (BNCC) | Júlia Quoos'
    desc = ('Ano letivo completo de Computação do 1º ao 6º ano, alinhado à BNCC: aulas, textos, folhas para imprimir, gabaritos e jogos sem leitura para os pequenos.')
    feitos = {m.ANO: m for m in ANOS}
    cards = ''
    for n in range(1, 7):
        if n in feitos:
            m = feitos[n]
            cards += f'<li><a href="{n}-ano/"><b>{n}º ano</b><span>{len(m.AULAS)} aulas · {len(jogos_do_ano(m))} jogos</span></a></li>'
        else:
            cards += f'<li><a class="breve" aria-disabled="true"><b>{n}º ano</b><span>em preparação</span></a></li>'
    ld = json.dumps({'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', '@id': url + '#pagina', 'url': url, 'name': 'Computação ano a ano', 'description': desc, 'inLanguage': 'pt-BR',
         'isAccessibleForFree': True, 'author': AUTORA, 'hasPart': [{'@type': 'Course', 'name': m.TITULO, 'url': f'{url}{m.ANO}-ano/'} for m in ANOS]},
        migalhas([('Início', f'{SITE}/'), ('Computação ano a ano', url)])]}, ensure_ascii=False, indent=1)
    return cabeca(titulo, desc, url, ld, v) + f'''<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li aria-current="page">Computação ano a ano</li></ol></nav>
        <p class="rotulo">BNCC Computação · Ensino Fundamental</p>
        <h1>Computação ano a ano</h1>
        <p class="linha-fina">Um ano letivo inteiro de Computação para cada série, com aulas prontas, texto para ler com a turma, folhas para imprimir, gabaritos e um jogo para cada habilidade da BNCC.</p>
        <ul class="anos-grade">{cards}</ul>
        <h2>Como o material está organizado</h2>
        <p>Cada ano tem quatro bimestres. Cada aula foi pensada para 50 minutos e traz objetivo, material, passo a passo, um texto curto para ler com a turma, sugestões para alunos com diferentes necessidades, uma folha A4 com fundo branco e o gabarito. A última aula de cada bimestre é de revisão e avaliação.</p>
        <p>Do 1º ao 3º ano, as folhas quase não têm leitura (a professora lê a instrução) e os jogos funcionam só com figuras, sons e uma voz opcional. Do 4º ano em diante, aparecem frases curtas.</p>
        <p>As habilidades seguem o complemento de Computação à BNCC (Parecer CNE/CEB nº 2/2022), nos três eixos: pensamento computacional, mundo digital e cultura digital. Para o 6º ao 9º ano, também há <a href="/material-didatico/bncc/">planos e slides por habilidade</a>, <a href="/computacao-desplugada/">atividades desplugadas</a> e <a href="/material-adaptado/#computacao">fichas adaptadas</a>.</p>
    </div>
</main>
{RODAPE_PAG}</body>
</html>
'''


def escrever(arq, texto):
    arq.parent.mkdir(parents=True, exist_ok=True)
    if not arq.exists() or arq.read_text(encoding='utf-8') != texto:
        arq.write_text(texto, encoding='utf-8')


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
    bloco = ('  <!-- computacao-ano-a-ano: início (gerado por _fonte/computacao-ano-a-ano/gerar.py) -->\n' + '\n'.join(linhas)
             + '\n  <!-- computacao-ano-a-ano: fim -->')
    if '<!-- computacao-ano-a-ano: início' in xml:
        xml = re.sub(r'  <!-- computacao-ano-a-ano: início.*?<!-- computacao-ano-a-ano: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


JS = '''/* Ano a ano: encaixa as folhas A4 na largura da tela e imprime só a folha escolhida. */
(function () {
    const folhas = Array.from(document.querySelectorAll('.folha'));
    const largura = 210 * 96 / 25.4;
    function encaixar() {
        const caixa = document.querySelector('.folhas');
        if (!caixa) return;
        const z = Math.min(1, (caixa.clientWidth - 4) / largura);
        folhas.forEach(f => { f.style.zoom = z < 1 ? z.toFixed(3) : ''; });
    }
    encaixar();
    window.addEventListener('resize', encaixar);
    window.addEventListener('beforeprint', () => folhas.forEach(f => { f.style.zoom = ''; }));
    document.querySelectorAll('[data-imprimir]').forEach(botao => {
        botao.addEventListener('click', () => {
            const versao = botao.dataset.imprimir;
            folhas.forEach(f => f.classList.toggle('nao-imprimir', f.dataset.versao !== versao));
            window.print();
        });
    });
    window.addEventListener('afterprint', () => { folhas.forEach(f => f.classList.remove('nao-imprimir')); encaixar(); });
})();
'''


def main():
    v = versao()
    (SAIDA / 'assets').mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'ano-a-ano.css', SAIDA / 'assets' / 'ano-a-ano.css')
    escrever(SAIDA / 'assets' / 'ano-a-ano.js', JS)
    urls = []
    escrever(SAIDA / 'index.html', hub(v))
    urls.append((f'{SITE}{HUB}', SAIDA / 'index.html'))
    for mod in ANOS:
        assert len(mod.AULAS) == len({a['n'] for a in mod.AULAS})
        for a in mod.AULAS:
            for c in a['habs']:
                assert c in HAB, c
            if a.get('jogo'):
                assert a['jogo'] in JOGO, a['jogo']
        pasta = SAIDA / f'{mod.ANO}-ano'
        escrever(pasta / 'index.html', pagina_ano(mod, v))
        urls.append((f'{SITE}{HUB}{mod.ANO}-ano/', pasta / 'index.html'))
        escrever(pasta / 'imprimir-caderno.html', pagina_impressao(mod, v, 'Estudante'))
        escrever(pasta / 'imprimir-guia.html', pagina_impressao(mod, v, 'Professor'))
        for i, a in enumerate(mod.AULAS):
            arq = pasta / aula_slug(a) / 'index.html'
            escrever(arq, pagina_aula(mod, i, v))
            urls.append((f'{SITE}{HUB}{mod.ANO}-ano/{aula_slug(a)}/', arq))
        # apaga páginas de aulas que mudaram de nome
        validas = {aula_slug(a) for a in mod.AULAS}
        for d in pasta.iterdir():
            if d.is_dir() and d.name.startswith('aula-') and d.name not in validas:
                shutil.rmtree(d)
    atualizar_sitemap(urls)
    print(f'{len(ANOS)} anos, {sum(len(m.AULAS) for m in ANOS)} aulas em {SAIDA}')


if __name__ == '__main__':
    main()
