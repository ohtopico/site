"""Jogos da área premium em um único arquivo HTML (CSS e JavaScript embutidos), para baixar e editar.

Abre direto no navegador, sem internet (só as fontes vêm do Google Fonts). O Mesada Pro é o exemplo
usado no tutorial de jogos em HTML.

Uso (na raiz do repositório):
    python3 _fonte/premium/editaveis/jogo_html.py _privado/premium/arquivos/jogos \
        _privado/premium/mesada-pro.html _privado/premium/treine-a-maquina.html
Autora: Júlia Roberta Quoos Alves.
"""
import os
import re
import sys

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
MD = os.path.join(RAIZ, 'material-didatico')


def arquivo_unico(fonte):
    t = open(fonte, encoding='utf-8').read()
    css = open(os.path.join(MD, 'assets', 'md.css'), encoding='utf-8').read()
    t, n = re.subn(r'<link rel="stylesheet" href="[^"]*md\.css">', lambda m: '<style>\n' + css + '\n</style>', t)
    assert n == 1, f'{fonte}: não achei o link do md.css'
    # scripts locais do material didático (ex.: jogos/mesada.js)
    t = re.sub(r'<script src="(?:\.\./)+material-didatico/([^"]+)"></script>',
               lambda m: '<script>\n' + open(os.path.join(MD, m.group(1)), encoding='utf-8').read() + '\n</script>', t)
    assert 'src="../' not in t, f'{fonte}: sobrou um script com caminho relativo'
    t = re.sub(r'<div class="top">.*?</div>', '<div class="top"><span>ohtopico.com.br · área premium</span></div>', t, count=1, flags=re.S)
    return t.replace('<html lang="pt-BR">', '<html lang="pt-BR">\n<!-- Jogo de Júlia Roberta Quoos Alves (ohtopico.com.br). '
                     'Uso livre em sala de aula, com citação da fonte. Veja o tutorial na área premium para editar. -->', 1)


def main():
    destino, fontes = sys.argv[1], sys.argv[2:]
    os.makedirs(destino, exist_ok=True)
    for fonte in fontes:
        saida = os.path.join(destino, os.path.basename(fonte))
        open(saida, 'w', encoding='utf-8').write(arquivo_unico(fonte))
        print('ok', saida)


if __name__ == '__main__':
    main()
