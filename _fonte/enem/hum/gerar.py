#!/usr/bin/env python3
"""Gera os jogos de Ciências Humanas da Ilha ENEM.

Cada arquivo em _fonte/enem/hum/jogos/*.js começa com um comentário  /* META {json} */  e o resto é o código do jogo.
Saída: mundo/enem/hum-<id>.html (uma página por jogo) e mundo/enem/jogos-hum.js (manifesto lido pelas salas da ilha).
Uso: python _fonte/enem/hum/gerar.py
"""
import html, json, pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parents[3]
FONTE = pathlib.Path(__file__).resolve().parent / 'jogos'
SAIDA = RAIZ / 'mundo' / 'enem'

MODELO = '''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo} · Ilha ENEM</title>
<meta name="robots" content="noindex, nofollow">
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="../../material-didatico/assets/md.css">
<link rel="stylesheet" href="enem.css">
<link rel="stylesheet" href="hum.css">
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
<!-- Gerado por _fonte/enem/hum/gerar.py a partir de _fonte/enem/hum/jogos/{arquivo}. Edite a fonte, não esta página. -->
<header class="e-top" id="topo"></header>
<main class="wrap">
  <div class="e-head">
    <a class="hb azul e-voltar" href="./">← Voltar à ilha</a>
    <h1>{icone} {titulo}</h1>
    <p class="muted">{intro}</p>
    <div class="h-habs">{habs}</div>
  </div>
  <div class="game-stage" id="palco" aria-live="polite"></div>
  <details class="howto">
    <summary>Cola rápida</summary>
    {cola}
  </details>
</main>
<footer class="footer"><div class="wrap">Estrelas ficam guardadas só neste aparelho. Matriz de Referência do ENEM, Ciências Humanas: {habs_txt}.</div></footer>

<script src="enem.js"></script>
<script>ENEM.exigir();</script>
<script src="hum-motor.js"></script>
<script>
{codigo}
</script>
</body>
</html>
'''

HABS = {
    'H1': 'Interpretar historicamente fontes documentais sobre patrimônio material e imaterial',
    'H2': 'Analisar a produção da memória pelas sociedades humanas',
    'H3': 'Associar manifestações culturais do presente aos seus processos históricos',
    'H4': 'Comparar pontos de vista sobre situações de natureza histórico-geográfica',
    'H5': 'Identificar manifestações ou representações da diversidade do patrimônio cultural e artístico',
    'H6': 'Interpretar diferentes representações gráficas e cartográficas dos espaços geográficos',
    'H7': 'Identificar os significados histórico-geográficos das relações de poder entre as nações',
    'H8': 'Analisar a ação dos estados nacionais no que se refere à dinâmica dos fluxos populacionais e no enfrentamento de problemas',
    'H9': 'Comparar o significado histórico-geográfico das organizações políticas e socioeconômicas em escala local, regional ou mundial',
    'H10': 'Reconhecer a dinâmica da organização dos movimentos sociais e a importância da participação da coletividade',
    'H11': 'Identificar registros de práticas de grupos sociais no tempo e no espaço',
    'H12': 'Analisar o papel da justiça como instituição na organização das sociedades',
    'H13': 'Analisar a atuação dos movimentos sociais que contribuíram para mudanças ou rupturas em processos de disputa pelo poder',
    'H14': 'Comparar diferentes pontos de vista, presentes em textos analíticos e interpretativos, sobre situação ou fatos histórico-geográficos',
    'H15': 'Avaliar criticamente conflitos culturais, sociais, políticos, econômicos ou ambientais ao longo da história',
    'H16': 'Identificar registros sobre o papel das técnicas e tecnologias na organização do trabalho e/ou da vida social',
    'H17': 'Analisar fatores que explicam o impacto das novas tecnologias no processo de territorialização da produção',
    'H18': 'Analisar diferentes processos de produção ou circulação de riquezas e suas implicações sócio-espaciais',
    'H19': 'Reconhecer as transformações técnicas e tecnológicas que determinam as várias formas de uso e apropriação dos espaços rural e urbano',
    'H20': 'Selecionar argumentos favoráveis ou contrários às modificações impostas pelas novas tecnologias à vida social e ao mundo do trabalho',
    'H21': 'Identificar o papel dos meios de comunicação na construção da vida social',
    'H22': 'Analisar as lutas sociais e conquistas obtidas no que se refere às mudanças nas legislações ou nas políticas públicas',
    'H23': 'Analisar a importância dos valores éticos na estruturação política das sociedades',
    'H24': 'Relacionar cidadania e democracia na organização das sociedades',
    'H25': 'Identificar estratégias que promovam formas de inclusão social',
    'H26': 'Identificar em fontes diversas o processo de ocupação dos meios físicos e as relações da vida humana com a paisagem',
    'H27': 'Analisar de maneira crítica as interações da sociedade com o meio físico, levando em consideração aspectos históricos e/ou geográficos',
    'H28': 'Relacionar o uso das tecnologias com os impactos sócio-ambientais em diferentes contextos histórico-geográficos',
    'H29': 'Reconhecer a função dos recursos naturais na produção do espaço geográfico, relacionando-os com as mudanças provocadas pelas ações humanas',
    'H30': 'Avaliar as relações entre preservação e degradação da vida no planeta nas diferentes escalas',
}


def main():
    manifesto, cobertura = [], {}
    for arq in sorted(FONTE.glob('*.js')):
        txt = arq.read_text(encoding='utf-8')
        m = re.match(r'\s*/\*\s*META\s*(\{.*?\})\s*\*/\s*', txt, re.S)
        if not m:
            raise SystemExit(f'{arq.name}: falta o comentário META no topo')
        meta, codigo = json.loads(m.group(1)), txt[m.end():]
        jid = meta['id']
        assert jid.startswith('hum-'), jid
        for h in meta['habs']:
            assert h in HABS, (jid, h)
            cobertura.setdefault(h, []).append(jid)
        habs = ''.join(f'<span class="h-tag" title="{html.escape(HABS[h])}">{h}</span>' for h in meta['habs'])
        cola = ''.join(f'<p><b>{t}</b> {c}</p>' for t, c in meta['cola'])
        pagina = MODELO.format(titulo=html.escape(meta['titulo']), icone=meta['icone'], intro=meta['intro'], habs=habs,
                               habs_txt=', '.join(meta['habs']), cola=cola, codigo=codigo.strip(), arquivo=arq.name)
        (SAIDA / f'{jid}.html').write_text(pagina, encoding='utf-8')
        manifesto.append({'id': jid, 'area': 'hum', 'icone': meta['icone'], 'titulo': meta['titulo'], 'url': f'{jid}.html',
                          'resumo': meta['resumo'], 'habs': meta['habs'], 'tipo': meta.get('tipo', 'jogo')})
    faltam = [h for h in HABS if h not in cobertura]
    js = ('/* Jogos de Ciências Humanas da Ilha ENEM. Gerado por _fonte/enem/hum/gerar.py: não edite à mão.\n'
          '   As salas da ilha leem window.ENEM_JOGOS e filtram por área. habs = habilidades da Matriz do ENEM (Humanas). */\n'
          'window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat(' + json.dumps(manifesto, ensure_ascii=False, indent=1) + ');\n')
    (SAIDA / 'jogos-hum.js').write_text(js, encoding='utf-8')
    print(f'{len(manifesto)} jogos gerados.')
    for h in HABS:
        print(f'  {h:>3}: {", ".join(cobertura.get(h, ["—"]))}')
    if faltam:
        print('ATENÇÃO, habilidades sem jogo:', ', '.join(faltam))


if __name__ == '__main__':
    main()
