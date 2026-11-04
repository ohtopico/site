"""Mapa interativo da BNCC no /material-adaptado/. Chamado pelo gerar_hub() de _fonte/matematica-adaptada/gerar.py
depois da seção Computação: coloca a seção do mapa interativo antes do mapa em lista e copia o JS e o CSS.
O mapa lê as tabelas da própria página, então fichas novas entram nele sozinhas."""
import shutil
from pathlib import Path

AQUI = Path(__file__).resolve().parent
DESTINO = AQUI.parents[1] / 'material-adaptado'
V = '1'

SECAO = ('<section class="mi-secao" id="mapa-interativo-secao" aria-labelledby="mi-h2"><h2 id="mi-h2">Mapa interativo da BNCC</h2>'
         '<p>As habilidades de Matemática e de Computação como uma rede de palavras: cada ano se liga às unidades temáticas e aos eixos, '
         'e cada um deles às suas habilidades. Escolha um ano, toque numa habilidade e abra a ficha. Logo abaixo está o mesmo mapa em lista.</p>'
         '<div id="mapa-interativo"></div>'
         '<noscript><p>O mapa interativo precisa de JavaScript. Use o mapa em lista logo abaixo.</p></noscript></section>\n    ')
ANCORA = '<section class="ano-secao" id="mapa-bncc">'


def inserir(texto):
    if 'id="mapa-interativo"' in texto:
        return texto
    if ANCORA not in texto:
        print('mapa-interativo/mapa.py: não achei o mapa em lista')
        return texto
    DESTINO.mkdir(exist_ok=True)
    shutil.copy(AQUI / 'mapa-bncc.js', DESTINO / 'mapa-bncc.js')
    shutil.copy(AQUI / 'mapa-bncc.css', DESTINO / 'mapa-bncc.css')
    texto = texto.replace(ANCORA, SECAO + ANCORA, 1)
    texto = texto.replace('</head>', f'<link rel="stylesheet" href="/material-adaptado/mapa-bncc.css?v={V}">\n</head>', 1)
    texto = texto.replace('</body>', f'<script src="/material-adaptado/mapa-bncc.js?v={V}" defer></script>\n</body>', 1)
    # atalhos da página apontam para o mapa interativo
    texto = texto.replace('<a class="atalho" href="#mapa-bncc"><strong>Mapa da BNCC</strong>',
                          '<a class="atalho" href="#mapa-interativo-secao"><strong>Mapa da BNCC</strong>', 1)
    return texto
