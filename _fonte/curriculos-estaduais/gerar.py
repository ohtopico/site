"""Gera material-didatico/bncc/curriculos-estaduais/index.html: o mapa dos currículos de Computação das redes estaduais.

    python3 _fonte/curriculos-estaduais/gerar.py

Para atualizar um estado, mude a linha dele em UF (status, título, texto e fontes oficiais) e a data em CONF.
status: doc (documento próprio), norma (norma do conselho estadual), comp (componente na rede, sem documento atualizado), nao (não localizado).
Se a data mudar, atualize também o lastmod da página no sitemap.xml.
"""
import json, html, sys, pathlib

RAIZ = pathlib.Path(__file__).resolve().parents[2]
SAIDA = sys.argv[1] if len(sys.argv) > 1 else RAIZ / 'material-didatico' / 'bncc' / 'curriculos-estaduais' / 'index.html'
CONF = '31/10/2026'

# status: doc (documento próprio), norma (norma do conselho estadual), comp (componente na matriz, sem documento atualizado localizado), nao (não localizado)
UF = [
 # sigla, nome, col, row, status, titulo, texto, fontes
 ('RR','Roraima',1,0,'nao',None,None,[]),
 ('AP','Amapá',3,0,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('AM','Amazonas',1,1,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('PA','Pará',2,1,'nao',None,None,[]),
 ('MA','Maranhão',3,1,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('CE','Ceará',4,1,'comp','Educação Digital na matriz do Ensino Médio noturno',
  'A matriz curricular 2026 da rede estadual inclui Educação Digital na 1ª série do Ensino Médio noturno. Não localizei um documento curricular de Computação próprio do estado.',
  [('Matrizes Curriculares 2026, Seduc CE','https://www.ce.gov.br/seduc/wp-content/uploads/sites/63/2025/12/Matrizes-Curriculares-2026-V2.pdf')]),
 ('RN','Rio Grande do Norte',5,1,'doc','Diretrizes Curriculares do Ensino de Computação na Educação Básica (DCEC/RN)',
  'Elaboradas pela Secretaria de Estado da Educação (SEEC) com a Undime-RN, da Educação Infantil ao Ensino Médio, com orientações para Educação do Campo, Quilombola, Indígena, Especial e EJA. Vários municípios já aderiram por parecer do conselho municipal.',
  [('Notícia do Consed (17/03/2026)','https://consed.org.br/noticia/rn-consolida-politica-de-educacao-digital-com-novo-curriculo-de-computacao'),
   ('Documento (Google Drive da SEEC)','https://drive.google.com/file/d/1Uowg-wGMesU8Rv4MtnyTsS7SgXQFEEuU/view')]),
 ('AC','Acre',0,2,'nao',None,None,[]),
 ('RO','Rondônia',1,2,'nao',None,None,[]),
 ('TO','Tocantins',2,2,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('PI','Piauí',3,2,'doc','Currículo de Computação do Estado do Piauí (2025)',
  'Publicado pela Seduc-PI em dois volumes, um para Educação Infantil e Ensino Fundamental e outro para o Ensino Médio. Complementa o Currículo do Piauí, aprovado pela Resolução CEE/PI nº 188/2025.',
  [('Volume Educação Infantil e Ensino Fundamental (PDF)','https://seduc.pi.gov.br/download/diretrizes/Curriculo_de_Computacao___EI_e_EF.pdf'),
   ('Volume Ensino Médio (PDF)','https://seduc.pi.gov.br/download/diretrizes/Curriculo_de_Computacao___EM.pdf')]),
 ('PE','Pernambuco',4,2,'doc','Currículo da Educação Digital e Midiática de Pernambuco (Cedim-PE)',
  'Instituído por portaria da Secretaria de Educação publicada no Diário Oficial em 3 de junho de 2026, feito com a Undime-PE. Vale para todas as etapas da Educação Básica, em escolas públicas e privadas, e complementa o currículo do estado.',
  [('Notícia do Consed (05/06/2026)','https://www.consed.org.br/noticia/pernambuco-implementa-curriculo-da-educacao-digital-e-midiatica'),
   ('Consulta pública da SEE-PE','https://portal.educacao.pe.gov.br/see-abre-consulta-publica-para-implementacao-da-bncc-computacao/')]),
 ('PB','Paraíba',5,2,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('MT','Mato Grosso',1,3,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('GO','Goiás',2,3,'nao',None,None,[]),
 ('DF','Distrito Federal',3,3,'nao',None,None,[]),
 ('BA','Bahia',4,3,'norma','Resolução CEE-BA nº 266/2025',
  'O Conselho Estadual de Educação regulamentou a BNCC Computação e a educação digital e midiática em todas as etapas (aprovada em 21/10/2025, homologada em 24/03/2026). Permite disciplina própria, tema transversal ou modelo misto e dá um ano, a partir da publicação, para as escolas incluírem a Computação no currículo. Não aprova um documento curricular próprio.',
  [('Resolução CEE-BA nº 266/2025 (PDF)','https://www.ba.gov.br/conselhodeeducacao/sites/site-cee/files/2026-04/Resolu%C3%A7%C3%A3o%20CEE%20BA%20n%C2%BA%20266%202025%20-%20PARA%20PUBLICIZA%C3%87%C3%83O.pdf')]),
 ('AL','Alagoas',5,3,'nao',None,'Está entre as 13 redes estaduais que receberam assessoria técnica para atualizar o currículo à BNCC Computação, segundo o relatório do Movimento pela Base de setembro de 2025.',[]),
 ('MS','Mato Grosso do Sul',1,4,'norma','Parecer CEE/MS CP nº 060/2025',
  'Parecer orientativo do Conselho Estadual de Educação sobre a regulamentação do currículo de Educação Digital, Midiática e Computacional (dezembro de 2025). Não localizei um documento curricular próprio da rede estadual.',
  [('Parecer CEE/MS CP nº 060/2025 (PDF)','https://www.cee.ms.gov.br/wp-content/uploads/2025/12/Par-CP-060-2025-Parecer-Orientativo-Regul.-do-Curriculo-de-E.-Digital-Midiatica-e-Computacional.pdf')]),
 ('MG','Minas Gerais',2,4,'doc','Referencial Curricular de Computação na Educação Básica em Minas Gerais',
  'Homologado pela Secretaria de Educação em dezembro de 2025 e incorporado ao Currículo Referência de Minas Gerais (CRMG). No Ensino Fundamental a Computação entra nos componentes que já existem; no Ensino Médio vira o componente Educação Digital a partir de 2026.',
  [('Agência Minas (15/12/2025)','https://agenciaminas.mg.gov.br/noticia/minas-gerais-adota-componente-curricular-inedito-de-computacao-para-o-ensino-basico-em-2026'),
   ('SRE Uberaba','https://sreuberaba.educacao.mg.gov.br/referencial-curricular-de-computacao-na-educacao-basica-em-minas-gerais/')]),
 ('ES','Espírito Santo',3,4,'doc','Currículo da Computação do Espírito Santo',
  'Publicado pela Sedu com participação do Conselho Estadual de Educação. Traz o mapa de progressão da Educação Infantil (5 anos) ao Ensino Médio e as habilidades detalhadas do 6º ao 9º ano.',
  [('Currículo, Ensino Fundamental anos finais (PDF)','https://curriculo.sedu.es.gov.br/curriculo/wp-content/uploads/2025/07/CURRICULO-COMPUTACAO-ES-ENSINO-FUNDAMENTAL-2_040725.pdf')]),
 ('SE','Sergipe',4,4,'doc','Caderno Complementar ao Currículo de Sergipe: BNCC Computação (2025) e Currículo da Computação de Sergipe (2026)',
  'A Seduc publicou primeiro um caderno complementar com a BNCC Computação, em 2025, e depois o Currículo da Computação de Sergipe, em 2026, ambos para download no site da secretaria.',
  [('Currículo da Computação de Sergipe 2026','https://seduc.se.gov.br/download/curriculo-da-computacao-de-sergipe/'),
   ('Caderno Complementar BNCC Computação 2025','https://seduc.se.gov.br/download/caderno-complementar-ao-curriculo-de-sergipe-bncc-computacao-2025/')]),
 ('SP','São Paulo',2,5,'comp','Diretrizes Curriculares de Tecnologia e Inovação (Currículo Paulista)',
  'A rede estadual tem Computação no Ensino Médio desde 2020, anterior à BNCC Computação: o componente se chamou Tecnologia e Inovação (2020 a 2023), Tecnologia e Robótica (2024) e Programação (2025). Não localizei um currículo estadual atualizado para todas as etapas.',
  [('Artigo "Seis anos do currículo de Computação no Estado de São Paulo" (SBC, EduComp)','https://sol.sbc.org.br/index.php/educomp/article/view/42667')]),
 ('PR','Paraná',1,5,'comp','Educação Digital e Programação na rede estadual',
  'A tecnologia faz parte do currículo da rede estadual desde 2020, com aulas de programação e robótica. Não localizei um documento curricular de Computação próprio do estado.',
  [('Agência Estadual de Notícias do Paraná','https://www.parana.pr.gov.br/Audio/Com-educacao-digital-integrada-ao-curriculo-Parana-se-antecipa-diretrizes-nacionais')]),
 ('RJ','Rio de Janeiro',3,5,'norma','Deliberação CEE-RJ nº 413/2025',
  'O Conselho Estadual de Educação incluiu a Computação nas diretrizes curriculares do estado, com os três eixos da BNCC Computação, de forma integrada e progressiva em todas as etapas (aprovada em 04/11/2025). A implantação vai de 2026 a 2029. Não aprova um documento curricular próprio.',
  [('Deliberação CEE-RJ nº 413/2025 (PDF)','https://www.rj.gov.br/cee/sites/default/files/arquivos-paginas/Delibera%C3%A7%C3%A3o%20CEE%20413%202025_SITE_0.pdf')]),
 ('SC','Santa Catarina',1,6,'doc','Currículo de Educação Digital de Santa Catarina (BNCC Computação)',
  'A Secretaria de Estado da Educação apresenta o Currículo de Educação Digital como o documento da BNCC Computação da rede, ao lado do Currículo Base do Território Catarinense, na página da Semana de Formação 2026.',
  [('SED/SC, Nosso currículo (Semana de Formação 2026)','https://sites.google.com/sed.sc.gov.br/semanadeformacao2026/nosso-curr%C3%ADculo')]),
 ('RS','Rio Grande do Sul',1,7,'doc','Referencial Curricular Gaúcho para Computação (RCG Computação)',
  'Complementa os Referenciais Curriculares Gaúchos, da Educação Infantil ao Ensino Médio. Validado pela Deliberação CEEd nº 1041/2025 (Diário Oficial de 19/12/2025). A Resolução CEEd nº 382/2024 já tornava a Computação obrigatória nos currículos do estado. Na rede estadual, a Computação entra de forma transversal.',
  [('RCG Computação (PDF)','https://educacao.rs.gov.br/upload/arquivos/202603/26162308-referencial-curricular-gaucho-para-a-computacao.pdf'),
   ('Deliberação CEEd nº 1041/2025 (PDF)','https://www.ceed.rs.gov.br/upload/arquivos/202512/26082857-deliberacao-1041.pdf'),
   ('Resolução CEEd nº 382','https://ceed.rs.gov.br/resolucao-n-382')]),
]

ST = {
 'doc': ('Documento próprio publicado', '✓', 'A secretaria publicou um currículo, referencial ou diretriz de Computação do estado.'),
 'norma': ('Norma do conselho, sem documento próprio', '§', 'O Conselho Estadual de Educação regulamentou a Computação, mas não localizei um documento curricular próprio.'),
 'comp': ('Componente na rede, sem documento atualizado', '~', 'A rede estadual já tem aulas ou componente de Computação, mas não localizei um currículo próprio alinhado à BNCC Computação.'),
 'nao': ('Não localizado', '·', 'Não encontrei documento ou norma estadual publicada até a data da conferência.'),
}
ORDEM = ['doc', 'norma', 'comp', 'nao']
assert len(UF) == 27 and len({u[0] for u in UF}) == 27
assert len({(u[2], u[3]) for u in UF}) == 27
cont = {s: sum(1 for u in UF if u[4] == s) for s in ORDEM}

e = html.escape

tiles = []
for sig, nome, c, r, st, *_ in UF:
    tiles.append(f'<a class="uf st-{st}" href="bncc/curriculos-estaduais/#uf-{sig.lower()}" style="grid-column:{c+1};grid-row:{r+1}" '
                 f'title="{e(nome)}: {e(ST[st][0])}" aria-label="{e(nome)}: {e(ST[st][0])}"><b>{sig}</b><i aria-hidden="true">{ST[st][1]}</i></a>')

legenda = ''.join(f'<li><span class="sw st-{s}" aria-hidden="true">{ST[s][1]}</span><span><strong>{e(ST[s][0])}</strong> ({cont[s]})<br><span class="small muted">{e(ST[s][2])}</span></span></li>' for s in ORDEM)

blocos = []
for s in ORDEM:
    us = sorted([u for u in UF if u[4] == s], key=lambda u: u[1])
    itens = []
    if s == 'nao':
        linhas = []
        for sig, nome, *_x, texto, fontes in us:
            extra = f' <span class="small muted">{e(texto)}</span>' if texto else ''
            linhas.append(f'<li id="uf-{sig.lower()}" class="estado-nao"><strong>{e(nome)} ({sig})</strong>{extra}</li>')
        blocos.append(f'<h3 class="grupo"><span class="sw st-{s}" aria-hidden="true">{ST[s][1]}</span> {e(ST[s][0])}: {cont[s]} estados</h3>\n<ul class="lista-nao">\n' + '\n'.join(linhas) + '\n</ul>')
        continue
    for sig, nome, c, r, st, titulo, texto, fontes in us:
        fs = ''.join(f'<li><a href="{e(u)}" rel="noopener" target="_blank">{e(l)}</a></li>' for l, u in fontes)
        itens.append(f'''<article class="estado st-{st}" id="uf-{sig.lower()}">
  <span class="small muted">{e(nome)} · {sig}</span>
  <h4>{e(titulo)}</h4>
  <p>{e(texto)}</p>
  <ul class="fontes small">{fs}</ul>
</article>''')
    blocos.append(f'<h3 class="grupo"><span class="sw st-{s}" aria-hidden="true">{ST[s][1]}</span> {e(ST[s][0])}: {cont[s]} {"estado" if cont[s]==1 else "estados"}</h3>\n<div class="estados">\n' + '\n'.join(itens) + '\n</div>')

docs = sorted([u for u in UF if u[4] == 'doc'], key=lambda u: u[1])
nomes_docs = ', '.join(u[1] for u in docs[:-1]) + ' e ' + docs[-1][1]

TITLE = 'Currículos de Computação por estado: mapa 2026 | Júlia Quoos'
DESC = f'Quais redes estaduais publicaram currículo próprio de Computação (BNCC Computação): mapa dos 27 estados com documento, norma do conselho e link para a fonte oficial.'
URL = 'https://ohtopico.com.br/material-didatico/bncc/curriculos-estaduais/'
IMG = 'https://ohtopico.com.br/material-didatico/assets/og-curriculos-estaduais.jpg'

ld_page = {
 '@context': 'https://schema.org', '@type': 'Article', 'headline': 'Currículos de Computação por estado: o mapa das redes estaduais',
 'description': DESC, 'url': URL, 'inLanguage': 'pt-BR', 'image': IMG, 'datePublished': '2026-10-31', 'dateModified': '2026-10-31',
 'author': {'@type': 'Person', '@id': 'https://ohtopico.com.br/#julia', 'name': 'Júlia Roberta Quoos Alves', 'url': 'https://ohtopico.com.br/'},
 'about': [{'@type': 'Thing', 'name': 'BNCC Computação'}, {'@type': 'Thing', 'name': 'Currículo de Computação'}],
 'isPartOf': {'@type': 'CollectionPage', 'url': 'https://ohtopico.com.br/material-didatico/bncc/'},
}
ld_bread = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
 {'@type': 'ListItem', 'position': 1, 'name': 'Início', 'item': 'https://ohtopico.com.br/'},
 {'@type': 'ListItem', 'position': 2, 'name': 'Material didático', 'item': 'https://ohtopico.com.br/material-didatico/'},
 {'@type': 'ListItem', 'position': 3, 'name': 'BNCC Computação', 'item': 'https://ohtopico.com.br/material-didatico/bncc/'},
 {'@type': 'ListItem', 'position': 4, 'name': 'Currículos por estado', 'item': URL}]}
faq = [
 ('Quais estados têm currículo próprio de Computação?', f'Até {CONF}, {cont["doc"]} redes estaduais publicaram um documento próprio de Computação: {nomes_docs}.'),
 ('Meu estado não tem currículo de Computação. O que vale para a escola?', 'Vale a BNCC Computação (Resolução CNE/CEB nº 1/2022), que é obrigatória para todas as redes. Enquanto o estado não publica um documento próprio, a escola pode planejar direto pelas habilidades da BNCC.'),
 ('A Computação precisa ser uma disciplina separada?', 'Não. A BNCC Computação e a maior parte dos documentos estaduais permitem trabalhar as habilidades dentro de outros componentes, em projetos ou em aulas próprias.'),
]
ld_faq = {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
 {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faq]}
j = lambda o: json.dumps(o, ensure_ascii=False)
wa = 'https://wa.me/5551999222234?text=' + __import__('urllib.parse').parse.quote('Olá, Júlia! Vim pelo site e quero avisar sobre o currículo de Computação do meu estado: ')

faq_html = '\n'.join(f'  <h3>{e(q)}</h3>\n  <p>{e(a)}</p>' for q, a in faq)

out = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<base href="/material-didatico/">
<!-- página gerada por _fonte/curriculos-estaduais/gerar.py -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{e(TITLE)}</title>
<meta name="description" content="{e(DESC)}">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="article">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Júlia Quoos">
<meta property="og:url" content="{URL}">
<meta property="og:title" content="{e(TITLE)}">
<meta property="og:description" content="{e(DESC)}">
<meta property="og:image" content="{IMG}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Mapa dos currículos de Computação das redes estaduais">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">
{j(ld_page)}
</script>
<script type="application/ld+json">
{j(ld_bread)}
</script>
<script type="application/ld+json">
{j(ld_faq)}
</script>
<meta name="author" content="Júlia Roberta Quoos Alves">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/md.css">
<style>
  .doc {{ max-width: 960px; margin: 0 auto; padding: 32px 16px 40px; }}
  .crumbs {{ font-size: 14px; margin-bottom: 18px; }}
  .crumbs a {{ color: var(--ink-2); }}
  .doc h1 {{ font-size: clamp(30px, 5vw, 46px); margin: 6px 0 10px; }}
  .doc h2 {{ font-size: 26px; margin-top: 36px; }}
  .meta {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin: 22px 0; }}
  .meta div {{ border: 1.5px solid var(--ink); border-radius: 18px; padding: 12px 14px; }}
  .meta span {{ display: block; font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--ink-2); }}
  .mapa-box {{ display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 300px); gap: 24px; align-items: start; margin: 18px 0 8px; }}
  .mapa {{ display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: repeat(8, auto); gap: 5px; max-width: 360px; }}
  .uf {{ aspect-ratio: 1; border: 1.5px solid var(--ink); border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center;
         text-decoration: none; color: var(--ink); font-family: var(--display); line-height: 1; transition: transform .12s; }}
  .uf b {{ font-size: clamp(14px, 3.6vw, 17px); }}
  .uf i, .sw {{ font-family: system-ui, sans-serif; }}
  .uf i {{ font-style: normal; font-size: 12px; margin-top: 3px; }}
  .uf:hover, .uf:focus-visible {{ transform: scale(1.08); }}
  .st-doc.uf, .sw.st-doc {{ background: var(--co); color: var(--paper); border-color: var(--co); }}
  .st-norma.uf, .sw.st-norma {{ background: var(--co-soft); border-color: var(--co); color: var(--ink); }}
  .st-comp.uf, .sw.st-comp {{ background: repeating-linear-gradient(135deg, var(--co-soft) 0 6px, var(--paper) 6px 12px); border-color: var(--co); border-style: dashed; color: var(--ink); }}
  .st-nao.uf, .sw.st-nao {{ background: var(--paper-2); border-color: var(--line); color: var(--ink-3); }}
  .uf.alvo {{ outline: 3px solid var(--ink); outline-offset: 2px; }}
  .legenda {{ list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }}
  .legenda li {{ display: grid; grid-template-columns: 30px 1fr; gap: 10px; align-items: start; font-size: 15px; line-height: 1.4; }}
  .sw {{ width: 28px; height: 28px; border: 1.5px solid; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; vertical-align: middle; }}
  .grupo {{ display: flex; align-items: center; gap: 10px; margin: 30px 0 12px; }}
  .estados {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; }}
  .estado {{ border: 1.5px solid var(--ink); border-radius: 22px; padding: 16px 18px; scroll-margin-top: 80px; }}
  .estado h4 {{ font-family: var(--display); font-size: 19px; line-height: 1.2; margin: 4px 0 8px; }}
  .estado p {{ font-size: 15px; margin-bottom: 8px; }}
  .estado.alvo, .estado-nao.alvo {{ background: var(--co-soft); }}
  .fontes {{ margin: 0; padding-left: 18px; }}
  .lista-nao {{ padding-left: 20px; }}
  .lista-nao li {{ margin-bottom: 6px; scroll-margin-top: 80px; border-radius: 8px; }}
  @media (max-width: 760px) {{ .mapa-box {{ grid-template-columns: 1fr; }} .mapa {{ margin: 0 auto; width: 100%; }} }}
</style>
</head>
<body>
<header id="topbar"></header>
<main class="doc" id="doc">
  <div class="crumbs"><a href="bncc/">← BNCC Computação</a></div>
  <span class="eyebrow">🗺️ BNCC Computação · redes estaduais</span>
  <h1>Currículos de Computação por estado: quem já publicou o seu</h1>
  <p class="lead">A BNCC Computação vale para todo o país, mas cada rede estadual pode publicar o próprio currículo, referencial ou diretriz de Computação, como o Referencial Curricular Gaúcho para Computação. Este mapa mostra em que pé está cada um dos 27 estados, com link para a fonte oficial.</p>
  <div class="meta">
    <div><span>Documento próprio</span>{cont["doc"]} estados</div>
    <div><span>Norma do conselho</span>{cont["norma"]} estados</div>
    <div><span>Componente sem documento</span>{cont["comp"]} estados</div>
    <div><span>Conferido em</span>{CONF}</div>
  </div>

  <h2>Mapa das redes estaduais</h2>
  <p class="small muted">Cada quadrado é um estado, na posição aproximada do mapa do Brasil. Toque em um estado para ver o documento e a fonte.</p>
  <div class="mapa-box">
    <nav class="mapa" aria-label="Mapa dos estados">
      {"".join(tiles)}
    </nav>
    <ul class="legenda">{legenda}</ul>
  </div>

  <h2>Estado por estado</h2>
  <p>A lista considera a <strong>rede estadual</strong> de cada UF. Municípios também podem ter currículo próprio, aprovado pelo conselho municipal ou por adesão ao documento do estado; nesses casos vale o que a secretaria municipal publicou.</p>
{chr(10).join(blocos)}

  <h2>Como usar no planejamento</h2>
  <p>Mesmo onde o estado já tem documento próprio, as habilidades de referência continuam sendo as da BNCC Computação (EF06CO01 a EF09CO10 no Fundamental e EM13CO01 a EM13CO26 no Médio). Os documentos estaduais organizam, distribuem por ano e às vezes acrescentam habilidades, mas partem desses códigos. Por isso o caminho mais rápido é:</p>
  <ol>
    <li>Abrir o documento do seu estado e ver em que ano e componente cada habilidade foi colocada.</li>
    <li>Procurar a habilidade na <a href="bncc/">página da BNCC Computação</a>, que tem plano de aula, slides, jogos, fichas e listas prontos para cada código.</li>
    <li>Se a escola ainda não decidiu o formato (disciplina própria, dentro de outros componentes ou em projetos), seguir o guia <a href="/computacao-na-escola/">como implantar Computação na escola</a>.</li>
  </ol>

  <h2>Perguntas frequentes</h2>
{faq_html}

  <h2>Como este mapa foi feito</h2>
  <p>Conferi, em {CONF}, os sites das secretarias estaduais de educação, dos conselhos estaduais, do Consed e das agências oficiais de notícias, além do relatório <a href="https://observatorio.movimentopelabase.org.br/wp-content/uploads/2025/09/curriculos-de-computacao-resumo-executivo--set-25.pdf" rel="noopener" target="_blank">Currículos de Computação (Movimento pela Base e Fundação Telefônica Vivo, 2025)</a> e da coletânea de currículos estaduais e municipais da <a href="https://www.profcomp.com.br/curriculos" rel="noopener" target="_blank">ProfComp</a>. "Não localizado" quer dizer que não encontrei documento publicado, não que o estado esteja parado: várias redes estão em elaboração ou consulta pública.</p>
  <p>Seu estado publicou um documento que não está aqui, ou algo mudou? <a href="{e(wa)}" rel="noopener" target="_blank">Me avise pelo WhatsApp</a> com o link da fonte oficial e eu atualizo o mapa.</p>

  <h2>Para levar a BNCC Computação à sua escola</h2>
  <p>A <a href="/formacao-continuada/">formação de professores em IA e Computação</a> ajuda escolas e redes a planejar o ano com essas habilidades, mesmo sem professor da área ou laboratório.</p>
</main>
<footer id="footer"></footer>
<script>window.MD_BASE = '';</script>
<script src="assets/dados.js"></script>
<script src="assets/progresso.js"></script>
<script src="assets/comum.js"></script>
<script>mdTopbar('bncc'); mdFooter();</script>
<script>
  // destaca o estado escolhido no mapa e na lista
  (function () {{
    function marcar() {{
      document.querySelectorAll('.alvo').forEach(function (el) {{ el.classList.remove('alvo'); }});
      var id = location.hash.slice(1);
      if (!/^uf-[a-z]{{2}}$/.test(id)) return;
      var item = document.getElementById(id);
      if (item) item.classList.add('alvo');
      var tile = document.querySelector('.uf[href$="#' + id + '"]');
      if (tile) tile.classList.add('alvo');
    }}
    window.addEventListener('hashchange', marcar);
    marcar();
  }})();
</script>
<script data-goatcounter="https://ohtopico.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
</body>
</html>
'''
open(SAIDA, 'w', encoding='utf-8').write(out)
print('ok', cont)
