"""Faixa de rodapé das páginas de material: material gratuito, apoiar, formação e mentoria, canal no WhatsApp.

O HTML está em faixa.html e o estilo em /assets/faixa.css. O _fonte/material/gerar.js põe a mesma faixa, dentro dos
marcadores "faixa", em todas as páginas das pastas de material (roda na Action a cada push). Os geradores em Python
incluem FAIXA no modelo deles só para a saída local já sair igual à publicada.

    from faixa import FAIXA   (ou runpy.run_path(.../faixa.py)['FAIXA'])
"""
import hashlib
from pathlib import Path

_AQUI = Path(__file__).resolve().parent
_RAIZ = _AQUI.parent.parent
_VERSAO = hashlib.md5((_RAIZ / 'assets' / 'faixa.css').read_bytes()).hexdigest()[:8]
FAIXA = ('<!-- faixa: início (gerado por _fonte/material/gerar.js) -->\n'
         f'<link rel="stylesheet" href="/assets/faixa.css?v={_VERSAO}">\n'
         + (_AQUI / 'faixa.html').read_text(encoding='utf-8').strip()
         + '\n<!-- faixa: fim -->')
