"""Gera material-didatico/apostila-professor-bncc/index.html.

Rodar da raiz do repositório:  python _fonte/apostila-professor/gerar.py
Textos das habilidades vêm de material-didatico/assets/dados.js; títulos e
páginas das fichas seguem o sumário do PDF (cada ficha tem 3 páginas).
"""
import json
import re
from html import escape
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
SAIDA = RAIZ / 'material-didatico' / 'apostila-professor-bncc' / 'index.html'
URL = 'https://ohtopico.com.br/material-didatico/apostila-professor-bncc/'
PDF = 'apostila-professor-bncc-computacao.pdf'
PDF_MB = '4,7 MB'
PAGINAS = 153
PUBLICADO = '2026-10-30'

# Título de cada ficha, na ordem do sumário
TITULOS = {
    6: ['Organizando informações', 'Sequência, repetição e decisão', 'Do problema ao programa', 'Dividir para resolver',
        'Entradas e saídas', 'Um algoritmo para todos os casos', 'Como a mensagem viaja', 'Arquivos em ordem',
        'Do outro lado da tela tem gente', 'Quanto custa um celular?'],
    7: ['Fichas e listas', 'Caça aos bugs', 'Programar para outras matérias', 'Pontos e ligações',
        'Escreva uma vez, use sempre', 'As regras da conversa', 'Proteja sua vida digital', 'Discordar sem ferir',
        'Cyberbullying não é brincadeira', 'Para onde vai o lixo eletrônico?', 'Do roteiro à publicação'],
    8: ['Um problema dentro de outro', 'Listas que crescem', 'Buscar e ordenar', 'Um programa para outra disciplina',
        'Muitas mãos', 'Como a internet funciona', 'Por dentro das redes sociais', 'Seus dados valem muito',
        'Li e concordo?', 'Privacidade é direito', 'Checagem de fatos'],
    9: ['Árvores que decidem', 'Resolver problemas de verdade', 'Máquinas de estados', 'Como agem os ataques',
        'Segredos em código', 'Tecnologia para a nossa cidade', 'Tecnologia não é neutra', 'Desigualdade digital',
        'Isso é seu?', 'Verdade em todos os formatos'],
}
# Página do PDF (não a numeração impressa) em que começa a 1ª ficha de cada ano
INICIO = {6: 14, 7: 45, 8: 79, 9: 113}
EIXOS = {'PC': 'Pensamento computacional', 'MD': 'Mundo digital', 'CD': 'Cultura digital'}
ITENS = [
    ('O conceito', 'Explicação para o professor, com a base teórica da habilidade.'),
    ('Vocabulário', 'Os termos que os estudantes precisam dominar.'),
    ('Na sala de aula', 'Objetivos e sequência didática sugerida.'),
    ('Exemplos práticos', 'Situações prontas para repassar aos estudantes.'),
    ('Sites de apoio', 'Ferramentas e leituras, com o uso indicado.'),
    ('Equívocos comuns', 'As dúvidas mais frequentes e como intervir.'),
    ('Como avaliar', 'Rubrica em três níveis, para observação ou autoavaliação.'),
    ('Inclusão', 'Adaptações e acessibilidade.'),
    ('Aprofundamento', 'Para estudantes mais velhos ou do ensino médio.'),
    ('Conexões', 'Ligações com outros componentes curriculares.'),
]
DESCRICAO = ('Apostila gratuita em PDF para professores, com as 42 habilidades de Computação da BNCC do 6º ao 9º ano: '
             'conceito, aplicação em sala, exemplos práticos, sites de apoio, equívocos comuns, avaliação, inclusão e aprofundamento.')
ALT_CAPA = ('Capa da apostila: janela de computador com o título "Apostila do professor" em letras pretas e destaque amarelo, '
            'selo "BNCC Computação, anos finais", subtítulo "Computação na BNCC, 6º ao 9º ano: conceitos, aplicação em sala e '
            'exemplos práticos", etiquetas verdes, amarelas e vermelhas com os itens de cada ficha, três quadros com os números '
            '42 habilidades, 3 eixos e 10 itens por habilidade, e assinatura Júlia Roberta Quoos Alves, ohtopico.com.br.')
ALT_EX1 = ('Primeira página da ficha EF06CO01, "Organizando informações": quadro verde com o texto da habilidade, '
           'seção 1 O conceito, seção 2 Vocabulário em quatro cartões verdes e início da seção 3 Na sala de aula.')
ALT_EX2 = ('Segunda página da mesma ficha, com a continuação da sequência didática, exemplos práticos e sites de apoio.')


def habilidades():
    js = (RAIZ / 'material-didatico' / 'assets' / 'dados.js').read_text(encoding='utf-8')
    hab = {}
    for cod, ano, eixo, objeto, texto in re.findall(
            r"\['(EF0[6-9]CO\d\d)', (\d), '(\w\w)', '([^']*)', '([^']*)'\]", js):
        hab[cod] = {'ano': int(ano), 'eixo': eixo, 'objeto': objeto, 'texto': texto}
    lista = []
    for ano, titulos in TITULOS.items():
        for i, titulo in enumerate(titulos):
            cod = f'EF0{ano}CO{i + 1:02d}'
            h = hab[cod]
            lista.append({**h, 'codigo': cod, 'titulo': titulo, 'pagina': INICIO[ano] + 3 * i})
    assert len(lista) == 42
    return lista


def json_ld(habs):
    alinhamentos = [{
        '@type': 'AlignmentObject', 'alignmentType': 'teaches',
        'educationalFramework': 'BNCC Computação (Resolução CNE/CEB nº 1/2022)',
        'targetName': h['codigo'], 'targetDescription': h['texto']} for h in habs]
    grafo = [
        {
            '@type': ['LearningResource', 'Book'],
            '@id': URL + '#apostila',
            'name': 'Apostila do professor: Computação na BNCC, 6º ao 9º ano',
            'alternativeHeadline': 'Conceitos, aplicação em sala e exemplos práticos para as 42 habilidades',
            'description': DESCRICAO,
            'url': URL,
            'image': URL + 'capa-apostila-professor-bncc.jpg',
            'inLanguage': 'pt-BR',
            'author': {'@id': 'https://ohtopico.com.br/#julia'},
            'creator': {'@type': 'Person', '@id': 'https://ohtopico.com.br/#julia',
                        'name': 'Júlia Roberta Quoos Alves', 'url': 'https://ohtopico.com.br/'},
            'publisher': {'@id': 'https://ohtopico.com.br/#julia'},
            'datePublished': PUBLICADO,
            'isAccessibleForFree': True,
            'license': 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br',
            'learningResourceType': ['Apostila', 'Guia do professor'],
            'educationalLevel': 'Ensino Fundamental, anos finais (6º ao 9º ano)',
            'audience': {'@type': 'EducationalAudience', 'educationalRole': 'teacher'},
            'numberOfPages': PAGINAS,
            'bookFormat': 'https://schema.org/EBook',
            'encoding': {'@type': 'MediaObject', 'contentUrl': URL + PDF, 'encodingFormat': 'application/pdf'},
            'keywords': 'BNCC Computação, apostila do professor, formação de professores, pensamento computacional, '
                        'mundo digital, cultura digital, anos finais, 6º ao 9º ano, plano de aula, rubrica',
            'accessibilityFeature': ['alternativeText', 'tableOfContents', 'printPageNumbers'],
            'educationalAlignment': alinhamentos,
            'isPartOf': {'@type': 'CreativeWork', 'name': 'Material didático de Computação e Matemática',
                         'url': 'https://ohtopico.com.br/material-didatico/'},
        },
        {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': 'https://ohtopico.com.br/'},
                {'@type': 'ListItem', 'position': 2, 'name': 'Material didático', 'item': 'https://ohtopico.com.br/material-didatico/'},
                {'@type': 'ListItem', 'position': 3, 'name': 'Apostila do professor', 'item': URL},
            ],
        },
    ]
    return json.dumps({'@context': 'https://schema.org', '@graph': grafo}, ensure_ascii=False, indent=1)


def secao_ano(ano, habs):
    itens = []
    for h in habs:
        if h['ano'] != ano:
            continue
        itens.append(f'''        <li id="{h['codigo'].lower()}">
          <div class="fi-topo"><span class="tag code co">{h['codigo']}</span><span class="small muted">{EIXOS[h['eixo']]} · {escape(h['objeto'])}</span></div>
          <h4>{escape(h['titulo'])}</h4>
          <p>{escape(h['texto'])}</p>
          <a class="fi-pdf" href="{PDF}#page={h['pagina']}" target="_blank" rel="noopener">Abrir a ficha no PDF (p. {h['pagina'] - 1}) →</a>
        </li>''')
    n = len(itens)
    return f'''      <details class="ano"{' open' if ano == 6 else ''}>
        <summary><span class="ano-n">{ano}º ano</span><span class="muted">{n} habilidades</span></summary>
        <ol class="fichas">
{chr(10).join(itens)}
        </ol>
      </details>'''


def pagina():
    habs = habilidades()
    titulo = 'Apostila do professor: Computação na BNCC do 6º ao 9º ano (PDF gratuito) | ohtopico'
    og_titulo = 'Apostila do professor: Computação na BNCC, 6º ao 9º ano'
    itens = '\n'.join(f'        <li><span class="it-n" aria-hidden="true">{i}</span><div><h3>{t}</h3><p>{d}</p></div></li>'
                      for i, (t, d) in enumerate(ITENS, 1))
    anos = '\n'.join(secao_ano(a, habs) for a in (6, 7, 8, 9))
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo}</title>
<meta name="description" content="{escape(DESCRICAO)}">
<meta name="author" content="Júlia Roberta Quoos Alves">
<link rel="canonical" href="{URL}">
<meta property="og:title" content="{og_titulo}">
<meta property="og:description" content="{escape(DESCRICAO)}">
<meta property="og:url" content="{URL}">
<meta property="og:type" content="book">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="{URL}og-apostila-professor-bncc.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Apostila do professor, BNCC Computação do 6º ao 9º ano: 42 habilidades, do conceito à avaliação. PDF gratuito com 153 páginas, de Júlia Roberta Quoos Alves.">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/md.css">
<style>
  .hero {{ padding: 48px 0 44px; border-bottom: 1.5px solid var(--ink); }}
  .hero-grid {{ display: grid; grid-template-columns: 1.3fr 1fr; gap: 40px; align-items: center; }}
  .hero p.lead {{ font-size: 19px; color: var(--ink-2); max-width: 620px; }}
  .crumbs {{ font-size: 14px; color: var(--ink-2); margin: 0 0 14px; }}
  .crumbs a {{ color: var(--ink-2); }}
  .capa {{ display: block; width: 100%; max-width: 380px; margin: 0 auto; height: auto; border: 1.5px solid var(--ink); border-radius: 14px; box-shadow: 6px 6px 0 var(--ink); }}
  .fatos {{ display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0 22px; }}
  .fatos .tag {{ font-size: 13.5px; padding: 4px 12px; }}
  mark {{ background: #fff27a; color: #111; padding: 0 .15em; border-radius: 4px; }}
  .itens {{ list-style: none; margin: 20px 0 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px 28px; }}
  .itens li {{ display: grid; grid-template-columns: 40px 1fr; gap: 12px; align-items: start; padding: 12px 0; border-top: 1px solid var(--line); }}
  .it-n {{ width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid var(--ink); display: grid; place-items: center; font-family: var(--display); font-weight: 800; background: var(--co-soft); color: var(--co); }}
  .itens h3 {{ margin: 0 0 2px; font-size: 19px; }}
  .itens p {{ margin: 0; color: var(--ink-2); font-size: 15px; }}
  .exemplos {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }}
  .exemplos figure {{ margin: 0; }}
  .exemplos img {{ display: block; width: 100%; height: auto; border: 1.5px solid var(--ink); border-radius: 10px; background: #fff; }}
  .exemplos figcaption {{ font-size: 14px; color: var(--ink-2); margin-top: 8px; }}
  details.ano {{ border: 1.5px solid var(--ink); border-radius: var(--radius); margin-top: 14px; background: var(--paper); }}
  details.ano summary {{ cursor: pointer; padding: 16px 22px; display: flex; gap: 14px; align-items: baseline; }}
  .ano-n {{ font-family: var(--display); font-weight: 800; font-size: 22px; }}
  .fichas {{ list-style: none; margin: 0; padding: 0 22px 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 28px; }}
  .fichas li {{ padding: 14px 0; border-top: 1px solid var(--line); }}
  .fi-topo {{ display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }}
  .fichas h4 {{ margin: 6px 0 4px; font-size: 18px; }}
  .fichas p {{ margin: 0 0 6px; font-size: 15px; color: var(--ink-2); }}
  .fi-pdf {{ font-size: 14.5px; font-weight: 500; }}
  .duas {{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }}
  @media (max-width: 860px) {{
    .hero-grid, .duas, .exemplos {{ grid-template-columns: 1fr; gap: 28px; }}
    .itens, .fichas {{ grid-template-columns: 1fr; }}
  }}
</style>
<script type="application/ld+json">
{json_ld(habs)}
</script>
</head>
<body>
<header id="topbar"></header>
<main>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <nav class="crumbs" aria-label="Você está em"><a href="../../">Início</a> / <a href="../">Material didático</a> / Apostila do professor</nav>
        <span class="eyebrow">Anos finais · 6º ao 9º ano · BNCC Computação</span>
        <h1>Apostila do professor: Computação na BNCC</h1>
        <p class="lead">As 42 habilidades de Computação do 6º ao 9º ano explicadas para quem vai dar a aula: o <mark>conceito</mark>, como aplicar em sala, exemplos práticos para repassar aos estudantes, sites de apoio e uma rubrica de avaliação. Gratuita, em PDF.</p>
        <div class="fatos">
          <span class="tag co">42 habilidades</span><span class="tag">{PAGINAS} páginas A4</span><span class="tag">10 itens por habilidade</span><span class="tag">Acompanha os slides de aula</span><span class="tag">Licença CC BY-NC-SA</span>
        </div>
        <div class="btn-row">
          <a class="btn" href="{PDF}" download type="application/pdf">Baixar a apostila (PDF, {PDF_MB})</a>
          <a class="btn ghost" href="#fichas">Ver as 42 fichas</a>
        </div>
      </div>
      <div>
        <img class="capa" src="capa-apostila-professor-bncc.webp" width="640" height="905" alt="{escape(ALT_CAPA)}">
      </div>
    </div>
  </section>
  <section class="block">
    <div class="wrap">
      <span class="eyebrow">Para quem é</span>
      <h2>Para professores de Computação e de outros componentes</h2>
      <p style="max-width:780px">A BNCC Computação (Resolução CNE/CEB nº 1/2022) não exige uma disciplina própria: cada rede pode trabalhar as habilidades em um componente específico, de forma integrada ou em projetos. A apostila foi escrita para que qualquer professor dos anos finais consiga preparar a aula com segurança, inclusive em turmas com estudantes mais velhos ou do ensino médio. Todas as atividades propostas têm uma versão que funciona sem computador.</p>
    </div>
  </section>
  <section class="block">
    <div class="wrap">
      <span class="eyebrow">Cada ficha tem 3 páginas</span>
      <h2>Do conceito à avaliação, em 10 itens</h2>
      <ol class="itens">
{itens}
      </ol>
      <div class="exemplos">
        <figure><img src="exemplo-ficha-1.webp" width="620" height="877" loading="lazy" alt="{escape(ALT_EX1)}"><figcaption>Primeira página da ficha EF06CO01.</figcaption></figure>
        <figure><img src="exemplo-ficha-2.webp" width="620" height="877" loading="lazy" alt="{escape(ALT_EX2)}"><figcaption>Continuação da mesma ficha.</figcaption></figure>
      </div>
    </div>
  </section>
  <section class="block" id="fichas">
    <div class="wrap">
      <span class="eyebrow">Sumário</span>
      <h2>As 42 fichas, por ano</h2>
      <p class="muted" style="max-width:780px">Textos das habilidades resumidos para leitura rápida; para a redação oficial, consulte a <a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener">BNCC</a>. O link de cada ficha abre o PDF na página certa.</p>
{anos}
      <p class="small muted" style="margin-top:18px">Também no PDF: apresentação, os três eixos e a progressão do 6º ao 9º ano, quadro das 42 habilidades, orientações para a prática, glossário, sites de apoio por tema, modelo de plano de aula e ficha de observação, referências.</p>
    </div>
  </section>
  <section class="block">
    <div class="wrap duas">
      <div>
        <span class="eyebrow">Junto com os slides</span>
        <h2>Uma ficha para cada aula</h2>
        <p>Cada habilidade também tem um conjunto de <a href="../professor.html#slides">slides para aula expositiva</a> de 30 minutos, com atividade e roteiro do professor. A apostila aprofunda o que os slides apresentam, mas pode ser usada de forma independente.</p>
      </div>
      <div>
        <span class="eyebrow">Uso e citação</span>
        <h2>Livre para usar em sala</h2>
        <p>Material de Júlia Roberta Quoos Alves, professora de computação no Rio Grande do Sul, sob licença <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>: pode copiar, imprimir e adaptar, com citação da autoria, sem fins comerciais e compartilhando pela mesma licença.</p>
      </div>
    </div>
  </section>
  <section class="block">
    <div class="wrap">
      <span class="eyebrow">Para continuar</span>
      <h2>Mais material gratuito</h2>
      <div class="btn-row" style="margin-top:14px">
        <a class="btn" href="{PDF}" download type="application/pdf">Baixar a apostila (PDF)</a>
        <a class="btn ghost" href="../professor.html">Área do professor</a>
        <a class="btn ghost" href="../bncc.html">Explorar a BNCC</a>
        <a class="btn ghost" href="../../formacao-continuada/">Formação continuada</a>
      </div>
      <p class="small muted" style="margin-top:18px">Sugestões e relatos de uso: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
    </div>
  </section>
</main>
<footer class="footer"><div class="wrap">
  <p>Apostila do professor para a Computação nos anos finais do Ensino Fundamental, criada por <a href="../../curriculo/">Júlia Roberta Quoos Alves</a>. Habilidades com base no complemento de Computação à <a href="https://basenacionalcomum.mec.gov.br/" target="_blank" rel="noopener">BNCC</a> (Resolução CNE/CEB nº 1/2022).</p>
  <p>Uso livre em sala de aula, com citação da fonte. Sugestões: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
</div></footer>
<script>window.MD_BASE = '../';</script>
<script src="../assets/dados.js"></script>
<script src="../assets/comum.js"></script>
<script>
  mdTopbar('professor');
</script>
<!-- Contador de visitas: GoatCounter, sem cookies -->
<script data-goatcounter="https://ohtopico.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
'''


if __name__ == '__main__':
    SAIDA.write_text(pagina(), encoding='utf-8')
    print('ok', SAIDA.relative_to(RAIZ))
