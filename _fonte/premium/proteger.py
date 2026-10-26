"""Gera a área premium protegida por senha (ohtopico.com.br/premium).

Uso:
    python _fonte/premium/proteger.py --site . --fontes _privado/premium --senha 007

Cada página da pasta de fontes (fora do Git, ver .gitignore) é criptografada (AES-GCM, chave derivada da senha com PBKDF2)
e publicada atrás de uma tela de senha. O conteúdo não aparece no código-fonte publicado.
Para trocar a senha, rode de novo com --senha NOVA e publique.
"""
import argparse, base64, os
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

AQUI = Path(__file__).resolve().parent
PAGINAS = {'hub.html': 'premium/index.html',
           'mesada-pro.html': 'premium/mesada-pro/index.html',
           'tutorial-jogos-html.html': 'premium/tutorial-jogos-html/index.html'}
ITER = 250000
PORTAO = open(AQUI / 'portao.html', encoding='utf-8').read()

def cifra(texto, senha, sal, nonce):
    chave = PBKDF2HMAC(hashes.SHA256(), 32, sal, ITER).derive(senha.encode())
    return AESGCM(chave).encrypt(nonce, texto.encode('utf-8'), None)

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--site', required=True); ap.add_argument('--senha', required=True); ap.add_argument('--fontes', required=True)
    a = ap.parse_args()
    b64 = lambda b: base64.b64encode(b).decode()
    for fonte, destino in PAGINAS.items():
        sal, nonce = os.urandom(16), os.urandom(12)
        dados = cifra((Path(a.fontes) / fonte).read_text(encoding='utf-8'), a.senha, sal, nonce)
        nivel = destino.count('/') - 1
        css = '../' * (nivel + 1) + 'material-didatico/assets/md.css'
        html = (PORTAO.replace('{{CSS}}', css).replace('{{SAL}}', b64(sal)).replace('{{NONCE}}', b64(nonce))
                .replace('{{DADOS}}', b64(dados)).replace('{{ITER}}', str(ITER)))
        out = Path(a.site) / destino; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(html, encoding='utf-8')
        print('ok', destino)

if __name__ == '__main__':
    main()
