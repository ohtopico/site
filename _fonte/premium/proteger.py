"""Gera a área premium protegida por senha (ohtopico.com.br/premium).

Uso (na raiz do repositório):
    python _fonte/premium/proteger.py --site . --fontes _privado/premium

A senha é pedida no terminal (ou lida da variável de ambiente OHTOPICO_SENHA) e nunca
fica escrita em arquivo do repositório. Use pelo menos 12 caracteres.

Cada página da pasta de fontes (fora do Git, ver .gitignore) é criptografada (AES-GCM, chave derivada
da senha com PBKDF2) e publicada atrás de uma tela de senha. O conteúdo não aparece no código-fonte publicado.
Os arquivos de _privado/premium/arquivos/ (Word, PowerPoint, HTML) viram premium/arquivos/<nome>.bin,
também criptografados; a página da área premium decifra cada um na hora do download.

Marcadores na fonte das páginas:
    {{ITER}}                   número de iterações do PBKDF2 (para o download no navegador)
    {{TAMANHO:pasta/arq.docx}} tamanho do arquivo, por exemplo "1,2 MB"
    {{LISTA:slides}}           botões de download de todos os arquivos da pasta, agrupados por ano,
                               com os títulos de arquivos/slides/titulos.json
Para trocar a senha, rode de novo com a senha nova e publique.
"""
import argparse, base64, getpass, html, json, os, re
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

AQUI = Path(__file__).resolve().parent
PAGINAS = {'hub.html': 'premium/index.html',
           'mesada-pro.html': 'premium/mesada-pro/index.html',
           'tutorial-jogos-html.html': 'premium/tutorial-jogos-html/index.html'}
ITER = 250000
MAGICO = b'OHTP1'  # cabeçalho dos arquivos .bin: MAGICO + sal (16) + nonce (12) + dados
PORTAO = open(AQUI / 'portao.html', encoding='utf-8').read()


def cifra(dados, senha, sal, nonce):
    chave = PBKDF2HMAC(hashes.SHA256(), 32, sal, ITER).derive(senha.encode())
    return AESGCM(chave).encrypt(nonce, dados, None)


def tamanho(n):
    if n < 1024 * 1024:
        return f'{max(1, round(n / 1024))} KB'
    return f'{n / 1024 / 1024:.1f} MB'.replace('.', ',')


def lista(pasta, rel):
    """Botões de download de uma pasta de arquivos, agrupados pelo ano do código BNCC (EF06 = 6º ano)."""
    titulos = json.loads((pasta / 'titulos.json').read_text(encoding='utf-8')) if (pasta / 'titulos.json').exists() else {}
    grupos = {}
    for arq in sorted(pasta.iterdir()):
        if arq.name == 'titulos.json':
            continue
        m = re.search(r'ef0(\d)', arq.name)
        grupos.setdefault(m.group(1) + 'º ano' if m else 'Outros', []).append(arq)
    out = []
    for g, arqs in grupos.items():
        botoes = ''.join(
            f'<li><button class="baixar" type="button" data-arquivo="{rel}/{a.name}">'
            f'<b>{html.escape(a.stem.split("-")[1].upper() if "-" in a.stem else a.stem)}</b> '
            f'{html.escape(titulos.get(a.name, a.stem))} <small>{tamanho(a.stat().st_size)}</small></button></li>'
            for a in arqs)
        out.append(f'<details class="ano"><summary>{g} <small>{len(arqs)} aulas</small></summary><ul class="lista">{botoes}</ul></details>')
    return ''.join(out)


def preparar(texto, fontes):
    arqs = fontes / 'arquivos'
    texto = texto.replace('{{ITER}}', str(ITER))
    texto = re.sub(r'\{\{TAMANHO:([^}]+)\}\}', lambda m: tamanho((arqs / m.group(1)).stat().st_size), texto)
    return re.sub(r'\{\{LISTA:([^}]+)\}\}', lambda m: lista(arqs / m.group(1), m.group(1)), texto)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--site', required=True); ap.add_argument('--fontes', required=True)
    a = ap.parse_args()
    senha = os.environ.get('OHTOPICO_SENHA') or getpass.getpass('Senha da área premium: ')
    if len(senha) < 12:
        raise SystemExit('Use uma senha com pelo menos 12 caracteres.')
    if not os.environ.get('OHTOPICO_SENHA') and getpass.getpass('Repita a senha: ') != senha:
        raise SystemExit('As senhas não conferem.')
    fontes, site = Path(a.fontes), Path(a.site)
    b64 = lambda b: base64.b64encode(b).decode()
    for fonte, destino in PAGINAS.items():
        sal, nonce = os.urandom(16), os.urandom(12)
        dados = cifra(preparar((fontes / fonte).read_text(encoding='utf-8'), fontes).encode('utf-8'), senha, sal, nonce)
        nivel = destino.count('/') - 1
        css = '../' * (nivel + 1) + 'material-didatico/assets/md.css'
        pagina = (PORTAO.replace('{{CSS}}', css).replace('{{SAL}}', b64(sal)).replace('{{NONCE}}', b64(nonce))
                  .replace('{{DADOS}}', b64(dados)).replace('{{ITER}}', str(ITER)))
        out = site / destino; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(pagina, encoding='utf-8')
        print('ok', destino)
    origem, saida = fontes / 'arquivos', site / 'premium' / 'arquivos'
    feitos = set()
    for arq in sorted(p for p in origem.rglob('*') if p.is_file() and p.name != 'titulos.json'):
        rel = arq.relative_to(origem).as_posix()
        sal, nonce = os.urandom(16), os.urandom(12)
        out = saida / (rel + '.bin'); out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(MAGICO + sal + nonce + cifra(arq.read_bytes(), senha, sal, nonce))
        feitos.add(out)
    for velho in saida.rglob('*.bin'):
        if velho not in feitos:
            velho.unlink(); print('removido', velho.relative_to(site))
    print('ok', len(feitos), 'arquivos em premium/arquivos/')


if __name__ == '__main__':
    main()
