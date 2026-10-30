"""Gerador de provas da área premium: junta o banco de questões (_privado/premium/banco/questoes.js) com a página
(_privado/premium/banco/provas-molde.html) e grava _privado/premium/provas.html, que o proteger.py publica cifrada.
O banco fica dentro da página cifrada, e não num arquivo aberto do site.

Uso (na raiz do repositório):
    python3 _fonte/premium/editaveis/banco.py --fontes _privado/premium
Autora: Júlia Roberta Quoos Alves.
"""
import argparse, json, re, subprocess
from pathlib import Path

ap = argparse.ArgumentParser(); ap.add_argument('--fontes', default='_privado/premium'); a = ap.parse_args()
pasta = Path(a.fontes) / 'banco'
banco = (pasta / 'questoes.js').read_text(encoding='utf-8')
# confere o banco com o Node: 4 alternativas, índice da correta válido, alternativas sem repetição
checa = banco + '''
let n = 0;
for (const [h, x] of Object.entries(BANCO)) {
  if (!/^EF0[6-9]CO\\d\\d$/.test(h)) throw new Error('código ' + h);
  for (const [t, alts, c] of x.o) { if (alts.length !== 4 || !(c >= 0 && c < 4) || new Set(alts).size !== 4 || !t) throw new Error(h + ': ' + t); n++; }
  for (const [t, e] of x.d) { if (!t || !e) throw new Error(h + ': discursiva'); n++; }
}
console.log(JSON.stringify({ habs: Object.keys(BANCO).length, n }));
'''
print('banco', subprocess.run(['node', '-e', checa], check=True, capture_output=True, text=True).stdout.strip())
molde = (pasta / 'provas-molde.html').read_text(encoding='utf-8')
(Path(a.fontes) / 'provas.html').write_text(molde.replace('/*BANCO*/', banco), encoding='utf-8')
print('ok provas.html')
