"""Mesada Pro em um único arquivo HTML (CSS e JavaScript embutidos), para baixar e editar.

É o exemplo usado no tutorial de jogos em HTML: abre direto no navegador, sem internet
(só as fontes vêm do Google Fonts).

Uso (na raiz do repositório):
    python3 _fonte/premium/editaveis/mesada_html.py _privado/premium/mesada-pro.html _privado/premium/arquivos/jogos
Autora: Júlia Roberta Quoos Alves.
"""
import os
import re
import sys

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))


def main():
    fonte, destino = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else '_privado/premium/arquivos/jogos')
    os.makedirs(destino, exist_ok=True)
    t = open(fonte, encoding='utf-8').read()
    css = open(os.path.join(RAIZ, 'material-didatico', 'assets', 'md.css'), encoding='utf-8').read()
    js = open(os.path.join(RAIZ, 'material-didatico', 'jogos', 'mesada.js'), encoding='utf-8').read()
    t, n1 = re.subn(r'<link rel="stylesheet" href="[^"]*md\.css">', lambda m: '<style>\n' + css + '\n</style>', t)
    t, n2 = re.subn(r'<script src="[^"]*mesada\.js"></script>', lambda m: '<script>\n' + js + '\n</script>', t)
    assert n1 == 1 and n2 == 1, 'mesada-pro.html mudou: confira os caminhos do CSS e do JS'
    t = re.sub(r'<div class="top">.*?</div>', '<div class="top"><span>Mesada Pro · ohtopico.com.br</span></div>', t, count=1, flags=re.S)
    t = t.replace('<html lang="pt-BR">', '<html lang="pt-BR">\n<!-- Jogo de Júlia Roberta Quoos Alves (ohtopico.com.br). '
                  'Uso livre em sala de aula, com citação da fonte. Veja o tutorial na área premium para editar. -->', 1)
    saida = os.path.join(destino, 'mesada-pro.html')
    open(saida, 'w', encoding='utf-8').write(t)
    print('ok', saida)


if __name__ == '__main__':
    main()
