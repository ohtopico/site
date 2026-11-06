"""Jogos de Computação do 1º ao 5º ano: um jogo por habilidade da BNCC, todos com o motor pequenos.js.

Do 1º ao 3º ano o jogo não pede leitura (leitura=False): só figuras, cores, sons e a voz opcional (campo fala).
Gera material-didatico/jogos/<id>.html e o bloco "jogos ano a ano" dentro de RECURSOS em material-didatico/assets/dados.js.
Depois rode node _fonte/material/gerar.js para escrever título, cabeçalho, texto do professor e dados estruturados.

    python _fonte/computacao-ano-a-ano/jogos.py
"""
import html
import json
import re
from pathlib import Path

from jogos1 import JOGOS1
from jogos2 import JOGOS2
from jogos3 import JOGOS3
from jogos4 import JOGOS4
from jogos5 import JOGOS5
from jogos6 import JOGOS6

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
MD = RAIZ / 'material-didatico'
SITE = 'https://ohtopico.com.br'
esc = html.escape

JOGOS = JOGOS1 + JOGOS2 + JOGOS3 + JOGOS4 + JOGOS5 + JOGOS6


GTAG = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7QDTBLC4K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Z7QDTBLC4K');
</script>'''


def pagina(j, antigo):
    url = f'{SITE}/material-didatico/jogos/{j["id"]}.html'
    titulo = f'{j["titulo"]}: jogo de Computação, {j["ano"]}º ano | Júlia Quoos'
    desc = j['resumo']
    fases = j['fases']
    if j.get('leitura'):
        # nos jogos com leitura a instrução também aparece escrita
        fases = [dict(f, pergunta=f.get('pergunta', f.get('fala', ''))) for f in fases]
    cfg = {'id': j['id'], 'leitura': j.get('leitura', False), 'fases': fases}
    for k in ('personagem', 'alvo', 'parede'):
        if k in j:
            cfg[k] = j[k]
    como = ''.join(f'<p>{esc(x)}</p>' for x in j['como'])
    aula = j.get('aula')
    link_aula = (f'<p>Este jogo faz parte do <a href="/computacao-ano-a-ano/{j["ano"]}-ano/">ano letivo de Computação do {j["ano"]}º ano</a>'
                 + (f', na aula <a href="{aula[1]}">{esc(aula[0])}</a>' if aula else '') + ', com texto, atividade para imprimir e gabarito.</p>')
    # blocos que o gerar.js escreve: preserva o que já existe na página para não mexer à toa
    def bloco(nome, padrao):
        m = re.search(rf'<!-- {nome}: início[\s\S]*?<!-- {nome}: fim -->', antigo or '')
        return m.group(0) if m else padrao
    ld = bloco('dados estruturados', '')
    cab = bloco('cab', '')
    rel = bloco('rel', '')
    prof = bloco('professor', '')
    t = f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<title>{esc(titulo)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{esc(titulo)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="https://ohtopico.com.br/material-didatico/assets/og-material-didatico.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="675">
<meta property="og:image:alt" content="Capa do Material didático de Júlia Roberta Quoos Alves: jogos, fichas e planos de aula de Computação, gratuito.">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/fontes/fontes.css">
<link rel="stylesheet" href="../assets/md.css">
<link rel="stylesheet" href="../assets/pequenos.css?v={{V}}">
{ld}
{GTAG}
</head>
<body>
<header id="topbar"></header>
<main class="wrap">
  <div class="game-head" id="game-head">{cab}</div>
  <details class="howto">
    <summary>Como jogar (para o adulto)</summary>
    {como}
    <p class="small muted">{"O jogo não pede leitura: as instruções são as figuras, os sons e a voz do botão com o alto-falante. A lâmpada mostra uma dica. Cada fase completa vira uma estrela." if not j.get("leitura") else "O botão com o alto-falante lê a instrução em voz alta e a lâmpada mostra uma dica. Cada fase completa vira uma estrela."}</p>
    {link_aula}
  </details>
  <div class="game-stage">
    <div id="pq" aria-label="Área do jogo"></div>
  </div>
  {prof}
  <h2 style="font-size:24px">Continue explorando</h2>
  <div class="related" id="related">{rel}</div>
</main>
<footer id="footer"></footer>
<script>window.MD_BASE = '../';</script>
<script src="../assets/dados.js"></script>
<script src="../assets/listas.js"></script>
<script src="../assets/progresso.js"></script>
<script src="../assets/comum.js"></script>
<script src="../assets/figuras.js?v={{V}}"></script>
<script src="../assets/pequenos.js?v={{V}}"></script>
<script>
mdTopbar('jogos'); mdFooter(); mdJogoHead('{j["id"]}');
PQ.jogo({json.dumps(cfg, ensure_ascii=False)});
</script>
</body>
</html>
'''
    return t


def recurso_js(j):
    r = {'id': j['id'], 'tipo': 'jogo', 'interacao': j.get('interacao', 'outras'), 'titulo': j['titulo'], 'comp': ['CO'],
         'anos': j.get('anos', [j['ano']]), 'habs': j['habs'], 'tempo': j.get('tempo', '10–15 min'), 'resumo': j['resumo'],
         'url': f'jogos/{j["id"]}.html', 'plano': None, 'ficha': None}
    return '  ' + json.dumps(r, ensure_ascii=False).replace('"plano": null', '"plano": null') + ','


def main():
    import hashlib
    v = hashlib.md5(b''.join(p.read_bytes() for p in (MD / 'assets' / 'pequenos.js', MD / 'assets' / 'pequenos.css', MD / 'assets' / 'figuras.js'))).hexdigest()[:8]
    for j in JOGOS:
        arq = MD / 'jogos' / f'{j["id"]}.html'
        antigo = arq.read_text(encoding='utf-8') if arq.exists() else None
        t = pagina(j, antigo).replace('{V}', v)
        if t != antigo:
            arq.write_text(t, encoding='utf-8')
    # bloco no dados.js
    dados = MD / 'assets' / 'dados.js'
    txt = dados.read_text(encoding='utf-8')
    bloco = ('  // ---------- jogos ano a ano: início (gerado por _fonte/computacao-ano-a-ano/jogos.py) ----------\n'
             + '\n'.join(recurso_js(j) for j in JOGOS) +
             '\n  // ---------- jogos ano a ano: fim ----------\n')
    if '// ---------- jogos ano a ano: início' in txt:
        txt = re.sub(r'  // ---------- jogos ano a ano: início[\s\S]*?// ---------- jogos ano a ano: fim ----------\n', lambda m: bloco, txt)
    else:
        # no fim de RECURSOS, para não passar na frente dos outros jogos nos relacionados
        i = txt.index('\n];\n/* Ícone de capa')
        txt = txt[:i + 1] + bloco + txt[i + 1:]
    dados.write_text(txt, encoding='utf-8')
    # dificuldade: os jogos dos pequenos são fáceis
    print(len(JOGOS), 'jogos')


if __name__ == '__main__':
    main()
