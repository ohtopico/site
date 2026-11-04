"""Gera as fichas de computação adaptada em site/computacao-adaptada/fichas/<slug>/.

Uso (na raiz do site):
    python _fonte/computacao-adaptada/gerar.py      gera as páginas, o indice.json e o bloco do sitemap
    node _fonte/computacao-adaptada/pdf.js          depois, gera um PDF por ficha (precisa do Playwright)
    python _fonte/matematica-adaptada/gerar.py      por último, atualiza a seção Computação do /material-adaptado/

- Uma ficha por habilidade de Computação da BNCC do 6º ao 9º ano (42), adaptada das folhas para imprimir
  de BNCC Computação: versões A (mais apoio), B (apoio moderado), C (apoio leve) e folha do professor.
- O conteúdo fica em co6.py, co7.py, co8.py e co9.py; as peças (código, grafo, labirinto...) em comp.py.
- As folhas usam o estilo das fichas de matemática adaptada (/matematica-adaptada/assets/fichas.css)
  e as peças extras de computacao.css. A folha é sempre branca: a cor fica só nos detalhes.
- indice.json é lido pelo gerador do /material-adaptado/ (seção Computação).
- O sitemap.xml ganha um bloco próprio entre os marcadores "computacao-adaptada".
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
import co6, co7, co8, co9  # noqa: E401,E402

RAIZ = AQUI.parent.parent
MAT = AQUI.parent / 'matematica-adaptada'
SAIDA = RAIZ / 'computacao-adaptada'
SITE = 'https://ohtopico.com.br'
HUB = '/material-adaptado/#computacao'
OG = f'{SITE}/matematica-adaptada/og-matematica-adaptada.jpg'
esc = html.escape

FICHAS = co6.FICHAS + co7.FICHAS + co8.FICHAS + co9.FICHAS
HABS = {h['codigo']: h for h in json.loads((AQUI.parent / 'planejamento' / 'habilidades.json').read_text(encoding='utf-8'))['CO']}

NIVEIS = {'A': ('Versão A', 'mais apoio', 3), 'B': ('Versão B', 'apoio moderado', 2), 'C': ('Versão C', 'apoio leve', 1)}
PERFIS = [('down', 'Síndrome de Down'), ('tea', 'Autismo (TEA)'), ('tdah', 'TDAH')]
AUTORA = {'@type': 'Person', '@id': f'{SITE}/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': f'{SITE}/'}
RODAPE = 'ohtopico.com.br/material-adaptado · Júlia Roberta Quoos Alves · uso livre em sala de aula'

GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def rotulo_versao(chave):
    nome, apoio, pontos = NIVEIS[chave]
    bolas = ''.join(f'<i class="{"cheia" if i < pontos else ""}"></i>' for i in range(3))
    return f'<span class="nivel"><b>{nome}</b> · {apoio} <span class="bolas" aria-hidden="true">{bolas}</span></span>'


def folha(f, chave, corpo):
    return f'''<article class="folha" data-versao="{chave}" aria-label="{esc(f['titulo'])}, versão {chave}">
    <header class="folha-topo">{rotulo_versao(chave)}<span class="hab">{f['codigo']} · Computação · {f['ano']}º ano</span></header>
    <div class="aluno"><span>Nome: <i class="traco longo"></i></span><span>Data: <i class="traco"></i></span></div>
    <h2 class="folha-titulo">{esc(f['titulo'])}</h2>
    {corpo}
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''


def folha_professor(f):
    passos = ''.join(f'<li>{esc(p)}</li>' for p in f['passos'])
    perfis = ''.join(f'<li><b>{n}.</b> {esc(f["perfis"][k])}</li>' for k, n in PERFIS)
    gab = ''.join(f'<li><b>Versão {k}.</b> {v}</li>' for k, v in f['gabarito'].items())
    return f'''<article class="folha folha-prof" data-versao="Professor" aria-label="Orientações para o professor">
    <header class="folha-topo"><span class="nivel"><b>Orientações para o professor</b></span><span class="hab">{f['ano']}º ano · {esc(f['tempo'])}</span></header>
    <h2 class="folha-titulo">{esc(f['titulo'])}</h2>
    <h3>Habilidade da BNCC</h3><p><b>{f['codigo']}</b> ({esc(f['eixo'])}): {esc(f['texto'])}</p>
    <h3>Material</h3><p>{esc(f['material'])}</p>
    <h3>Como aplicar</h3><ol>{passos}</ol>
    <h3>Ajustes por perfil</h3><ul>{perfis}</ul>
    <h3>Gabarito</h3><ul>{gab}</ul>
    <p class="lembrete">A versão é escolhida pelo apoio de que o estudante precisa naquele dia, e não pelo diagnóstico. Converse com a equipe do AEE e siga o plano individual (PEI) do estudante, quando houver.</p>
    <footer class="folha-rodape">{RODAPE}</footer>
</article>'''


def versao_css():
    return hashlib.md5((MAT / 'fichas.css').read_bytes() + (MAT / 'fichas.js').read_bytes() + (AQUI / 'computacao.css').read_bytes()).hexdigest()[:10]


def pagina(f, i, fichas):
    url = f'{SITE}/computacao-adaptada/fichas/{f["slug"]}/'
    titulo = f'{f["titulo"]}: computação adaptada | Júlia Quoos'
    if len(titulo) > 70:
        titulo = f'{f["titulo"]} | Júlia Quoos'
    descricao = (f'{f["resumo"]} Ficha de computação adaptada para alunos com diferentes neurodivergências, '
                 f'em três níveis de apoio, para imprimir. {f["ano"]}º ano, {f["codigo"]}.')
    pdf = f'{f["slug"]}.pdf'
    v = versao_css()
    folhas = ''.join(folha(f, k, c) for k, c in f['versoes'].items()) + folha_professor(f)
    botoes = ''.join(f'<button type="button" class="btn98" data-imprimir="{k}">Imprimir versão {k}</button>' for k in f['versoes']) + \
        '<button type="button" class="btn98" data-imprimir="Professor">Imprimir orientações</button>'
    passos = ''.join(f'<li>{esc(p)}</li>' for p in f['passos'])
    perfis = ''.join(f'<li><b>{n}.</b> {esc(f["perfis"][k])}</li>' for k, n in PERFIS)
    gab = ''.join(f'<li><b>Versão {k}.</b> {c}</li>' for k, c in f['gabarito'].items())
    ant = fichas[i - 1] if i > 0 else None
    prox = fichas[i + 1] if i + 1 < len(fichas) else None
    nav = '<nav class="vizinhas" aria-label="Outras fichas">' + (
        f'<a href="/computacao-adaptada/fichas/{ant["slug"]}/">← {esc(ant["titulo"])}</a>' if ant else '<span></span>') + (
        f'<a href="/computacao-adaptada/fichas/{prox["slug"]}/">{esc(prox["titulo"])} →</a>' if prox else '') + '</nav>'
    cod = f['codigo']
    ld = json.dumps({
        '@context': 'https://schema.org',
        '@graph': [
            {'@type': 'LearningResource', '@id': url + '#ficha', 'url': url, 'name': f['titulo'], 'description': descricao,
             'inLanguage': 'pt-BR', 'learningResourceType': 'Ficha de atividade para imprimir', 'isAccessibleForFree': True,
             'educationalLevel': f'{f["ano"]}º ano do Ensino Fundamental', 'timeRequired': f['tempo'],
             'teaches': [f'{cod}: {f["texto"]}'],
             'educationalAlignment': {'@type': 'AlignmentObject', 'alignmentType': 'teaches', 'educationalFramework': 'BNCC Computação',
                                      'targetName': cod, 'targetDescription': f['texto']},
             'audience': [{'@type': 'EducationalAudience', 'educationalRole': 'teacher'}],
             'accessibilityFeature': ['largePrint', 'highContrastDisplay', 'structuralNavigation'],
             'encoding': {'@type': 'MediaObject', 'contentUrl': url + pdf, 'encodingFormat': 'application/pdf'},
             'image': OG, 'author': AUTORA,
             'isPartOf': {'@type': 'CollectionPage', '@id': f'{SITE}/material-adaptado/#pagina'}},
            {'@type': 'BreadcrumbList', 'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': f'{SITE}/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Material adaptado', 'item': f'{SITE}/material-adaptado/'},
                {'@type': 'ListItem', 'position': 3, 'name': f['titulo'], 'item': url}]},
        ]}, ensure_ascii=False, indent=1)
    alt = 'Card com o título Material adaptado e a captura de uma ficha para imprimir com três níveis de apoio.'
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
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={v}">
<link rel="stylesheet" href="/computacao-adaptada/assets/computacao.css?v={v}">
{GTAG}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
    <a class="marca-site" href="/">Júlia Quoos</a>
    <nav aria-label="Principal"><a href="/material-adaptado/">Material adaptado</a><a href="/material-didatico/bncc/">BNCC Computação</a><a href="/blog/">Blog</a><a href="/material-didatico/">Material didático</a></nav>
</header>
<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="{HUB}">Material adaptado</a></li><li aria-current="page">{esc(f['titulo'])}</li></ol></nav>
        <p class="rotulo">Computação adaptada · {f['ano']}º ano · {cod}</p>
        <h1>{esc(f['titulo'])}</h1>
        <p class="linha-fina">{esc(f['resumo'])}</p>
        <div class="acoes">
            <a class="btn98 escuro" href="{pdf}" download>Baixar PDF</a>
            {botoes}
        </div>
        <dl class="ficha-dados">
            <dt>Tempo</dt><dd>{esc(f['tempo'])}</dd>
            <dt>Material</dt><dd>{esc(f['material'])}</dd>
            <dt>Eixo</dt><dd>{esc(f['eixo'])}</dd>
        </dl>
        <h2>Habilidade da BNCC</h2>
        <p><a href="/material-didatico/bncc/{cod.lower()}/">{cod}</a>: {esc(f['texto'])}</p>
        <p>Esta ficha adapta a folha para imprimir <b>{esc(f['original'])}</b>, da série de BNCC Computação. A versão C fica bem próxima da folha original; as versões A e B trazem a mesma ideia com mais apoio.</p>
        <h2>Três versões, a mesma atividade</h2>
        <p>A turma toda trabalha a mesma habilidade, e cada estudante recebe o apoio de que precisa:</p>
        <ul><li><b>Versão A, mais apoio</b>: poucos itens, letra grande, um exemplo resolvido e respostas de marcar, circular ou ligar.</li>
        <li><b>Versão B, apoio moderado</b>: mais itens, exemplo resolvido e respostas curtas escritas.</li>
        <li><b>Versão C, apoio leve</b>: a atividade completa, com uma pergunta para pensar ou criar no final.</li></ul>
        <h2>Como aplicar</h2>
        <ol>{passos}</ol>
        <h2>Ajustes por perfil</h2>
        <ul>{perfis}</ul>
        <p class="nota">Esses ajustes são pontos de partida. Cada estudante é único: observe o que funciona, converse com a família e com a equipe do AEE e siga o plano individual (PEI), quando houver.</p>
        <details class="gabarito"><summary>Gabarito</summary><ul>{gab}</ul></details>
        <h2 id="folhas">Folhas para imprimir</h2>
        <p>As folhas são A4, com fundo branco para economizar tinta. Imprima só a versão de que precisa ou baixe o PDF com todas, incluindo a folha de orientações.</p>
    </div>
    <div class="folhas">
{folhas}
    </div>
    <div class="texto">
        {nav}
        <p class="voltar"><a href="{HUB}">Ver todo o material adaptado de computação</a></p>
    </div>
</main>
<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/blog/">Blog</a> · <a href="/">Área de trabalho</a></p>
</footer>
<script src="/matematica-adaptada/assets/fichas.js?v={v}" defer></script>
</body>
</html>
'''


def atualizar_sitemap(slugs):
    caminho = RAIZ / 'sitemap.xml'
    xml = caminho.read_text(encoding='utf-8')
    hoje = date.today().isoformat()
    linhas = []
    for s in slugs:
        url = f'{SITE}/computacao-adaptada/fichas/{s}/'
        h = hashlib.md5((SAIDA / 'fichas' / s / 'index.html').read_bytes()).hexdigest()[:8]
        m = re.search(rf'<loc>{re.escape(url)}</loc><lastmod>([\d-]+)</lastmod><!-- h:([0-9a-f]+) -->', xml)
        lastmod = m.group(1) if m and m.group(2) == h else hoje
        linhas.append(f'  <url><loc>{url}</loc><lastmod>{lastmod}</lastmod></url><!-- h:{h} -->')
    bloco = ('  <!-- computacao-adaptada: início (gerado por _fonte/computacao-adaptada/gerar.py) -->\n' + '\n'.join(linhas)
             + '\n  <!-- computacao-adaptada: fim -->')
    if '<!-- computacao-adaptada: início' in xml:
        xml = re.sub(r'  <!-- computacao-adaptada: início.*?<!-- computacao-adaptada: fim -->', bloco, xml, flags=re.S)
    else:
        xml = xml.replace('</urlset>', bloco + '\n</urlset>')
    caminho.write_text(xml, encoding='utf-8')


REDIRECIONA = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Computação adaptada | Júlia Quoos</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="https://ohtopico.com.br/material-adaptado/">
<meta http-equiv="refresh" content="0; url=/material-adaptado/#computacao">
</head>
<body><p>As fichas de computação adaptada estão no <a href="/material-adaptado/#computacao">material adaptado</a>.</p></body>
</html>
'''


def main():
    fichas = [fn() for fn in FICHAS]
    for f in fichas:
        h = HABS[f['codigo']]
        f.update(ano=h['ano'], eixo=h['eixo'], texto=h['texto'], objeto=h['objeto'])
    fichas.sort(key=lambda f: f['codigo'])
    assert len({f['slug'] for f in fichas}) == len(fichas)
    (SAIDA / 'assets').mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'computacao.css', SAIDA / 'assets' / 'computacao.css')
    (SAIDA / 'index.html').write_text(REDIRECIONA, encoding='utf-8')
    for i, f in enumerate(fichas):
        destino = SAIDA / 'fichas' / f['slug']
        destino.mkdir(parents=True, exist_ok=True)
        texto = pagina(f, i, fichas)
        arq = destino / 'index.html'
        if not arq.exists() or arq.read_text(encoding='utf-8') != texto:
            arq.write_text(texto, encoding='utf-8')
    lista = [{'slug': f['slug'], 'titulo': f['titulo'], 'ano': f['ano'], 'codigo': f['codigo'], 'eixo': f['eixo'],
              'resumo': f['resumo'], 'versoes': list(f['versoes'])} for f in fichas]
    (AQUI / 'indice.json').write_text(json.dumps({'fichas': lista}, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    atualizar_sitemap([f['slug'] for f in fichas])
    faltam = sorted(set(HABS) - {f['codigo'] for f in fichas} - {c for c in HABS if not c.startswith('EF')})
    print(f'{len(fichas)} fichas geradas em {SAIDA / "fichas"}' + (f'; faltam {", ".join(faltam)}' if faltam else ''))


if __name__ == '__main__':
    main()
