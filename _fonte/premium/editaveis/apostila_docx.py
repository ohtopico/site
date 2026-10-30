"""Apostila do professor (BNCC Computação, 6º ao 9º ano) em Word (.docx), versão editável da área premium.

Converte o miolo.html do gerador da apostila com o pandoc. O texto vem completo e editável;
a diagramação do PDF (janelas, cores) fica de fora. O sumário vira um campo do Word,
que o Word atualiza ao abrir o arquivo.

Uso:
    python3 _fonte/premium/editaveis/apostila_docx.py CAMINHO/professor-bncc/gerador/saida/miolo.html \
        _privado/premium/arquivos/apostila
Precisa do pandoc e do python-docx.
Autora: Júlia Roberta Quoos Alves.
"""
import os
import re
import subprocess
import sys
import tempfile
import zipfile

from docx import Document
from docx.shared import RGBColor

AUTORA = 'Júlia Roberta Quoos Alves'
TITULO = 'Apostila do professor: Computação na BNCC, 6º ao 9º ano'


def modelo(pasta):
    """Modelo do pandoc sem o azul padrão: títulos em preto e links em verde."""
    base = os.path.join(pasta, 'base.docx')
    with open(base, 'wb') as f:
        f.write(subprocess.run(['pandoc', '--print-default-data-file', 'reference.docx'], check=True, capture_output=True).stdout)
    d = Document(base)
    for s in d.styles:
        try:
            if s.font.color is not None and s.font.color.rgb is not None:
                s.font.color.rgb = RGBColor.from_string('111111')
        except (AttributeError, ValueError):
            pass
    d.save(base)
    saida = os.path.join(pasta, 'modelo.docx')
    with zipfile.ZipFile(base) as zin, zipfile.ZipFile(saida, 'w', zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            dados = zin.read(item.filename)
            if item.filename == 'word/theme/theme1.xml':
                t = dados.decode()
                for tag, cor in (('accent1', '157F3B'), ('hlink', '157F3B'), ('dk2', '111111')):
                    t = re.sub(rf'(<a:{tag}>\s*<a:srgbClr val=")[0-9A-Fa-f]+', rf'\g<1>{cor}', t)
                dados = t.encode()
            zout.writestr(item, dados)
    return saida


def main():
    miolo, destino = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else '_privado/premium/arquivos/apostila')
    os.makedirs(destino, exist_ok=True)
    html = open(miolo, encoding='utf-8').read()
    html = re.sub(r'<section><h2>Sumário</h2>.*?</section>', '', html, count=1, flags=re.S)  # números de página do PDF
    html = re.sub(r'<span class="n">(\d+)</span>', r'\1. ', html)  # "1. O conceito"
    html = re.sub(r'(<span class="(?:cod|eixo [A-Z]+|tag [a-z]+)">[^<]+</span>)(?=[^\s<]|<span)', r'\1 · ', html)
    aviso = (f'<p>Material criado por {AUTORA} (ohtopico.com.br). Uso livre em sala de aula, com citação da fonte. '
             'Versão editável exclusiva para apoiadores do Catarse: por favor, não redistribua.</p>')
    html = html.replace('<body>', '<body>' + aviso, 1)
    with tempfile.TemporaryDirectory() as tmp:
        fonte = os.path.join(tmp, 'miolo.html')
        open(fonte, 'w', encoding='utf-8').write(html)
        saida = os.path.join(destino, 'apostila-professor-bncc-computacao.docx')
        subprocess.run(['pandoc', fonte, '-f', 'html', '-t', 'docx', '--toc', '--toc-depth=2',
                        '--reference-doc', modelo(tmp), '-M', f'title={TITULO}', '-M', 'toc-title=Sumário', '-M', f'author={AUTORA}',
                        '-o', saida], check=True)
    print('ok', saida)


if __name__ == '__main__':
    main()
