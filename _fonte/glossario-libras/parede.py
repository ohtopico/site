"""Cartazes para a parede: um termo do glossário em Libras por folha A4, fundo branco.

Gera /material-adaptado/glossario/parede/ (chamado por gerar.py; o PDF sai com node pdf.js).
- Termo grande, desenho de apoio, explicação curta, exemplo e QR code grande do sinal no Spread the Sign.
- Termo sem vídeo em Libras: o cartaz não inventa sinal; deixa um espaço para anotar o sinal combinado com a turma.
- Aceita ?termos=id1,id2 e o filtro por área, igual ao glossário. Imprime só os cartazes que estão na tela.
- A página é só para imprimir: fica fora do sitemap e com noindex.
"""
import hashlib
import shutil

from gerar import AQUI, SAIDA, URL, AREAS, GTAG, esc, qr_svg, desenho
from termos import TERMOS, GRUPOS

PAREDE = SAIDA / 'parede'
URL_PAREDE = URL + 'parede/'


def cartaz(x):
    areas = ' '.join(x['areas'])
    area = ' e '.join(AREAS[a] for a in x['areas'])
    longo = ' longo' if len(x['termo']) > 11 else ''
    if x['sinais']:
        s = x['sinais'][0]
        libras = f'''<div class="c-libras">
            {qr_svg(s["url"], "QR code do sinal de " + s["rotulo"] + " em Libras")}
            <p><b>Sinal em Libras</b>Aponte a câmera do celular para o QR code e veja o vídeo do sinal.</p>
        </div>'''
    else:
        libras = '''<div class="c-libras c-sem-sinal">
            <div class="c-anotar" aria-hidden="true"></div>
            <p><b>Sinal combinado com a turma</b>Ainda não está em dicionário público. Combine com o intérprete ou o professor surdo e anote aqui.</p>
        </div>'''
    return f'''<article class="cartaz" id="{x["id"]}" data-areas="{areas}">
        <p class="c-area c-{x["areas"][0]}">{esc(area)}</p>
        <h2 class="c-termo{longo}">{esc(x["termo"])}</h2>
        <div class="c-desenho">{desenho(x["desenho"], "Desenho de apoio: " + x["termo"])}</div>
        <p class="c-explicacao">{esc(x["explicacao"])}</p>
        <p class="c-exemplo"><b>Exemplo:</b> {esc(x["exemplo"])}</p>
        {libras}
        <p class="c-rodape">Glossário em Libras: ohtopico.com.br/material-adaptado/glossario · Sinais: Spread the Sign. Confira o sinal com o intérprete da escola.</p>
    </article>'''


def versao():
    return hashlib.md5((AQUI / 'parede.css').read_bytes() + (AQUI / 'parede.js').read_bytes()).hexdigest()[:10]


def pagina():
    total = len(TERMOS)
    com = sum(1 for x in TERMOS if x['sinais'])
    titulo = 'Cartazes de Libras para a parede | Júlia Quoos'
    descricao = (f'{total} cartazes A4 para imprimir e colar na parede, um por palavra de Matemática e Computação, '
                 'com desenho, explicação simples e QR code do sinal em Libras.')
    ordem = [g for g, _, _ in GRUPOS]
    cartazes = ''.join(cartaz(x) for x in sorted(TERMOS, key=lambda x: ordem.index(x['grupo'])))
    v = versao()
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(descricao)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="{URL_PAREDE}">
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="/matematica-adaptada/assets/fichas.css?v={v}">
<link rel="stylesheet" href="parede.css?v={v}">
{GTAG}
</head>
<body>
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo">
    <a class="marca-site" href="/">Júlia Quoos</a>
    <nav aria-label="Principal"><a href="/material-adaptado/">Material adaptado</a><a href="/material-adaptado/glossario/">Glossário em Libras</a><a href="/blog/">Blog</a></nav>
</header>
<main id="conteudo" tabindex="-1">
    <div class="texto">
        <nav class="trilha" aria-label="Você está em"><ol><li><a href="/">Início</a></li><li><a href="/material-adaptado/">Material adaptado</a></li><li><a href="/material-adaptado/glossario/">Glossário em Libras</a></li><li aria-current="page">Cartazes para a parede</li></ol></nav>
        <p class="rotulo">Material adaptado · Libras</p>
        <h1>Cartazes de Libras para a parede</h1>
        <p class="linha-fina">Um cartaz por folha A4 para cada uma das {total} palavras do <a href="/material-adaptado/glossario/">glossário</a>: a palavra em letras grandes, o desenho, a explicação em português simples e um QR code grande que abre o vídeo do sinal em Libras.</p>
        <p class="nota aviso"><b>Antes de colar na parede:</b> os sinais vêm do Spread the Sign, um dicionário público, e podem variar de região para região. Confira cada sinal com o intérprete de Libras ou com um professor surdo da escola. {total - com} palavras ainda não têm sinal nesse dicionário: o cartaz delas traz um espaço para anotar o sinal combinado com a turma.</p>
        <h2>Como imprimir</h2>
        <ol>
            <li>Escolha a área ou abra pelo link de uma ficha para ver só as palavras dela.</li>
            <li>Imprima em A4, fundo branco, sem margens extras (escala 100%). A cor fica só na faixa da área.</li>
            <li>Cole os cartazes perto do quadro ou do lugar do estudante, na altura dos olhos, para o QR code ficar fácil de ler com o celular.</li>
        </ol>
        <div class="filtros" role="group" aria-label="Filtrar palavras">
            <button type="button" class="btn98 escuro" data-area="todas" aria-pressed="true">Todas</button>
            <button type="button" class="btn98" data-area="mat" aria-pressed="false">Matemática</button>
            <button type="button" class="btn98" data-area="comp" aria-pressed="false">Computação</button>
        </div>
        <p class="escolhidas" id="escolhidas" hidden></p>
        <div class="acoes"><button type="button" class="btn98 escuro" id="imprimir">Imprimir os cartazes que estão na tela</button><a class="btn98" href="cartazes-libras-parede.pdf" download>Baixar PDF com todos os cartazes</a></div>
        <p class="contagem" id="contagem" aria-live="polite"></p>
    </div>
    <div class="parede" id="cartazes">
        {cartazes}
    </div>
    <div class="texto">
        <p class="voltar"><a href="/material-adaptado/glossario/">Voltar ao glossário em Libras</a> · <a href="/material-adaptado/">Ver todos os materiais adaptados</a></p>
    </div>
</main>
<footer class="rodape">
    <p>© 2026 Júlia Roberta Quoos Alves · professora de computação no Rio Grande do Sul</p>
    <p><a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> · <a href="/material-adaptado/">Material adaptado</a> · <a href="/blog/">Blog</a> · <a href="/">Área de trabalho</a></p>
</footer>
<script src="parede.js?v={v}" defer></script>
</body>
</html>
'''


def gerar():
    PAREDE.mkdir(parents=True, exist_ok=True)
    shutil.copy(AQUI / 'parede.css', PAREDE / 'parede.css')
    shutil.copy(AQUI / 'parede.js', PAREDE / 'parede.js')
    (PAREDE / 'index.html').write_text(pagina(), encoding='utf-8')
    print(f'parede: {len(TERMOS)} cartazes A4')
