"""Calendário 2027 do professor de computação.

Gera a página material-didatico/calendario-2027/index.html e o HTML de
impressão _fonte/calendario-2027/saida/calendario-2027.html a partir de
datas.json. Depois, o PDF (A4, fundo branco, uma página por semestre):

    python3 _fonte/calendario-2027/gerar.py
    node _fonte/calendario-2027/pdf.js

Para mudar uma data ou atividade, edite datas.json e rode os dois comandos.
Autora: Júlia Roberta Quoos Alves.
"""
import html
import json
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.normpath(os.path.join(AQUI, '..', '..'))
SITE = 'https://ohtopico.com.br/'
URL = SITE + 'material-didatico/calendario-2027/'
PDF = 'calendario-2027-professor-computacao.pdf'

with open(os.path.join(AQUI, 'datas.json'), encoding='utf-8') as f:
    DADOS = json.load(f)

e = html.escape
TOTAL = sum(len(s['datas']) for s in DADOS['semestres'])
TITULO = 'Calendário 2027 do professor de computação'
DESCRICAO = (f'As {TOTAL} datas de 2027 que rendem aula de computação do 6º ao 9º ano, cada uma com plano, jogo ou ficha '
             'gratuitos. Página e PDF para imprimir.')


def tipo(titulo):
    t = titulo.split(':')[0]
    return t if t in ('Plano', 'Jogo', 'Ficha', 'Recurso 3D') else None


# ---------------------------------------------------------------- página
def item_pagina(d):
    ativ = []
    for titulo, url in d['atividades']:
        t = tipo(titulo)
        nome = titulo.split(': ', 1)[1] if t else titulo
        rot = f'<span class="tag co">{e(t)}</span> ' if t else '<span class="tag">Site</span> '
        ativ.append(f'<li>{rot}<a href="/{e(url)}">{e(nome)}</a></li>')
    nota = f'<p class="cal-nota">{e(d["nota"])}</p>' if d.get('nota') else ''
    return f'''      <li class="cal-item">
        <p class="cal-data">{e(d["quando"])}</p>
        <div>
          <h3>{e(d["nome"])}</h3>
          <p class="muted">{e(d["sobre"])}</p>
          {nota}
          <ul class="cal-ativ">{"".join(ativ)}</ul>
        </div>
      </li>'''


def pagina():
    secoes = []
    for s in DADOS['semestres']:
        itens = '\n'.join(item_pagina(d) for d in s['datas'])
        secoes.append(f'''  <section class="block">
    <div class="wrap">
      <span class="eyebrow">{len(s["datas"])} datas</span>
      <h2>{e(s["nome"])}</h2>
      <ol class="cal">
{itens}
      </ol>
    </div>
  </section>''')
    ld = {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        'name': TITULO,
        'description': DESCRICAO,
        'url': URL,
        'inLanguage': 'pt-BR',
        'educationalLevel': 'Ensino Fundamental, anos finais (6º ao 9º ano)',
        'learningResourceType': 'Calendário',
        'isAccessibleForFree': True,
        'license': 'https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br',
        'datePublished': '2026-11-04',
        'author': {'@type': 'Person', '@id': SITE + '#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': SITE},
        'encoding': {'@type': 'MediaObject', 'contentUrl': URL + PDF, 'encodingFormat': 'application/pdf'},
    }
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>Calendário 2027 do professor de computação | Júlia Quoos</title>
<meta name="description" content="{e(DESCRICAO)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<link rel="canonical" href="{URL}">
<meta property="og:title" content="{TITULO}">
<meta property="og:description" content="{e(DESCRICAO)}">
<meta property="og:url" content="{URL}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="{SITE}material-didatico/assets/og-material-didatico.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="../assets/md.css">
<style>
  .hero {{ padding: 48px 0 44px; border-bottom: 1.5px solid var(--ink); }}
  .hero p.lead {{ font-size: 19px; color: var(--ink-2); max-width: 720px; }}
  .crumbs {{ font-size: 14px; color: var(--ink-2); margin: 0 0 14px; }}
  .crumbs a {{ color: var(--ink-2); }}
  .fatos {{ display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0 22px; }}
  .fatos .tag {{ font-size: 13.5px; padding: 4px 12px; }}
  .cal {{ list-style: none; margin: 18px 0 0; padding: 0; display: grid; gap: 14px; }}
  .cal-item {{ border: 1.5px solid var(--ink); border-radius: var(--radius); padding: 18px 22px; display: grid; grid-template-columns: 190px 1fr; gap: 18px; background: var(--paper); }}
  .cal-data {{ margin: 0; font-family: var(--display); font-weight: 800; font-size: 20px; line-height: 1.2; color: var(--co); }}
  .cal-item h3 {{ margin: 0 0 4px; font-size: 21px; }}
  .cal-item p {{ margin: 0 0 8px; }}
  .cal-nota {{ font-size: 15px; border-left: 4px solid var(--co); padding-left: 10px; }}
  .cal-ativ {{ list-style: none; margin: 6px 0 0; padding: 0; display: grid; gap: 6px; }}
  .cal-ativ a {{ font-weight: 600; }}
  @media (max-width: 700px) {{ .cal-item {{ grid-template-columns: 1fr; gap: 6px; padding: 16px; }} }}
</style>
<script type="application/ld+json">
{json.dumps(ld, ensure_ascii=False, indent=1)}
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>
</head>
<body>
<header id="topbar"></header>
<main>
  <section class="hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Você está em"><a href="../../">Início</a> / <a href="../">Material didático</a> / Calendário 2027</nav>
      <span class="eyebrow">6º ao 9º ano · BNCC Computação</span>
      <h1>{TITULO}</h1>
      <p class="lead">As datas de 2027 que rendem uma aula de computação, do Dia da Internet Segura à Hora do Código. Cada uma vem com uma atividade gratuita do site: plano de aula, jogo ou ficha para imprimir.</p>
      <div class="fatos">
        <span class="tag co">{TOTAL} datas</span><span class="tag">2 páginas A4</span><span class="tag">Fundo branco para imprimir</span><span class="tag">Licença CC BY-NC</span>
      </div>
      <div class="btn-row">
        <a class="btn" href="{PDF}" download type="application/pdf">Baixar o calendário (PDF)</a>
        <a class="btn ghost" href="../catalogo.html">Ver todo o material</a>
      </div>
    </div>
  </section>
{chr(10).join(secoes)}
  <section class="block">
    <div class="wrap">
      <span class="eyebrow">Antes de usar</span>
      <h2>Datas que ainda vão mudar</h2>
      <p class="muted" style="max-width:760px">As inscrições da OBI, o Desafio Bebras e a semana da Hora do Código ainda não têm datas oficiais para 2027. Confira nos sites de cada iniciativa perto da data. Quando uma data cai em feriado ou fim de semana, a atividade funciona em qualquer aula da mesma semana.</p>
    </div>
  </section>
</main>

<footer class="footer"><div class="wrap">
  <p>Calendário criado por <a href="../../curriculo/">Júlia Roberta Quoos Alves</a>, professora de Computação. Uso livre em sala de aula, com citação da fonte.</p>
  <p>Sugestões de datas: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
</div></footer>

<script>window.MD_BASE = '../';</script>
<script src="../assets/dados.js"></script>
<script src="../assets/comum.js"></script>
<script>
  mdTopbar('catalogo');
</script>
<!-- Contador de visitas: GoatCounter, sem cookies -->
<script data-goatcounter="https://ohtopico.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
'''


# ---------------------------------------------------------------- impressão
def item_pdf(d):
    ativ = ''.join(
        f'<li><strong>{e(t)}</strong><span>ohtopico.com.br/{e(u)}</span></li>' for t, u in d['atividades'])
    nota = f'<p class="nota">{e(d["nota"])}</p>' if d.get('nota') else ''
    return f'''<tr>
  <td class="q">{e(d["quando"])}</td>
  <td><p class="n">{e(d["nome"])}</p><p class="s">{e(d["sobre"])}</p>{nota}</td>
  <td><ul>{ativ}</ul></td>
  <td class="ok"><span></span></td>
</tr>'''


def impressao():
    paginas = []
    for i, s in enumerate(DADOS['semestres']):
        linhas = '\n'.join(item_pdf(d) for d in s['datas'])
        topo = (f'<p class="kicker">6º ao 9º ano · BNCC Computação</p><h1>{TITULO}</h1>'
                '<p class="sub">Uma atividade gratuita do site para cada data. Marque a coluna da direita quando usar.</p>') if i == 0 else ''
        paginas.append(f'''<section class="pag">
{topo}
<h2>{e(s["nome"])}</h2>
<table>
<thead><tr><th>Quando</th><th>O que é</th><th>Atividade em ohtopico.com.br</th><th>Usei</th></tr></thead>
<tbody>
{linhas}
</tbody>
</table>
{'<p class="rod">OBI, Desafio Bebras e Hora do Código ainda sem datas oficiais para 2027: confira perto da data. Datas em feriado ou fim de semana funcionam em qualquer aula da semana.</p>' if i == len(DADOS['semestres']) - 1 else ''}
</section>''')
    return f'''<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>{TITULO}</title>
<link rel="stylesheet" href="https://ohtopico.com.br/assets/fontes/fontes.css">
<style>
@page {{ size: A4; margin: 11mm 11mm 13mm; }}
* {{ box-sizing: border-box; }}
html, body {{ background: #fff; }}
body {{ margin: 0; font-family: 'Lexend', sans-serif; font-weight: 300; color: #111; font-size: 7.7pt; line-height: 1.28; }}
.pag {{ page-break-after: always; }}
.pag:last-child {{ page-break-after: auto; }}
h1, h2 {{ font-family: 'Fredoka', sans-serif; font-weight: 800; margin: 0; }}
h1 {{ font-size: 21pt; line-height: 1.05; margin: 1mm 0 1.5mm; }}
h2 {{ font-size: 13pt; margin: 3mm 0 2mm; display: inline-block; border-bottom: 2.2pt solid #166c40; }}
.kicker {{ font-weight: 600; letter-spacing: .12em; text-transform: uppercase; font-size: 7pt; margin: 0; color: #166c40; }}
.sub {{ margin: 0; font-size: 8.6pt; font-weight: 400; }}
table {{ width: 100%; border-collapse: collapse; }}
th {{ text-align: left; font-weight: 600; font-size: 7pt; text-transform: uppercase; letter-spacing: .08em; border-bottom: 1.2pt solid #111; padding: 1.2mm 1.5mm; }}
td {{ vertical-align: top; border-bottom: .5pt solid #999; padding: 1.35mm 1.5mm; }}
tr {{ page-break-inside: avoid; }}
td.q {{ width: 25mm; font-weight: 600; color: #166c40; }}
td:nth-child(2) {{ width: 58mm; }}
td.ok {{ width: 10mm; text-align: center; }}
td.ok span {{ display: inline-block; width: 4mm; height: 4mm; border: .8pt solid #111; border-radius: 1mm; }}
.n {{ margin: 0; font-weight: 600; font-size: 8.4pt; }}
.s {{ margin: .4mm 0 0; }}
.nota {{ margin: .8mm 0 0; font-weight: 400; border-left: 1.4pt solid #166c40; padding-left: 1.5mm; }}
ul {{ list-style: none; margin: 0; padding: 0; }}
li {{ margin: 0 0 .6mm; }}
li strong {{ font-weight: 400; display: block; }}
li span {{ display: block; color: #4a4a4a; font-size: 6.6pt; word-break: break-all; }}
.rod {{ margin: 3mm 0 0; font-size: 7.4pt; color: #4a4a4a; }}
</style></head>
<body>
{chr(10).join(paginas)}
</body></html>
'''


def grava(caminho, texto):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, 'w', encoding='utf-8') as f:
        f.write(texto)
    print('ok', os.path.relpath(caminho, RAIZ))


grava(os.path.join(RAIZ, 'material-didatico', 'calendario-2027', 'index.html'), pagina())
grava(os.path.join(AQUI, 'saida', 'calendario-2027.html'), impressao())
