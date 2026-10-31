"""Edita uma página já publicada da área premium sem gerar tudo de novo e sem trocar nenhuma senha.

Abre a página com uma senha que já funciona no site, troca ou acrescenta uma seção <section id="..."> e cifra de
novo com a mesma chave. Os chaveiros, as outras páginas e os arquivos ficam como estão.

Uso (na raiz do repositório):
    python _fonte/premium/editar_hub.py --pagina premium/index.html --mostrar
    python _fonte/premium/editar_hub.py --pagina premium/index.html --trecho caminho/secao.html

A senha vem da variável OHTOPICO_SENHA ou é pedida no terminal. Use a do plano mais alto, para abrir qualquer página.
--mostrar lista só os títulos e as seções da página, para conferir onde o trecho vai entrar.
O trecho precisa ser um <section ... id="nome">. Se a página já tem uma seção com esse id, ela é trocada; se não tem,
o trecho entra antes da seção indicada em --antes (id) ou, sem --antes, no fim do <main>.
"""
import argparse, base64, getpass, json, os, re
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

b64 = lambda b: base64.b64encode(b).decode()
d64 = base64.b64decode


def campo(pagina, nome, json_=False):
    m = re.search(rf"\b{nome} = ('([^']*)'|(\[.*?\]|\d+))[,;]", pagina, flags=re.S)
    if not m:
        raise SystemExit(f'Não achei {nome} na página.')
    return m.group(2) if m.group(2) is not None else (json.loads(m.group(3)) if json_ else m.group(3))


def abrir(pagina, senha):
    sal, it = d64(campo(pagina, 'SAL')), int(campo(pagina, 'ITER'))
    niveis = campo(pagina, 'NIVEIS', json_=True)
    mes, minimo = campo(pagina, 'MES'), campo(pagina, 'MINIMO')
    k = AESGCM(PBKDF2HMAC(hashes.SHA256(), 32, sal, it).derive(senha.encode()))
    for n in niveis:
        try:
            chaveiro = json.loads(k.decrypt(d64(n['iv']), d64(n['d']), None))
            break
        except Exception:
            continue
    else:
        raise SystemExit('A senha não abriu nenhum chaveiro desta página.')
    chave = chaveiro['chaves'].get(f'{mes}:{minimo}')
    if not chave:
        raise SystemExit(f'Esta senha (plano {chaveiro["nivel"]}, {chaveiro["mes"]}) não abre esta página (plano {minimo}, {mes}).')
    chave = d64(chave)
    html = AESGCM(chave).decrypt(d64(campo(pagina, 'IV')), d64(campo(pagina, 'DADOS')), None).decode()
    return chave, html


def secoes(html):
    return re.findall(r'<section\b[^>]*\bid="([^"]+)"', html)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--pagina', default='premium/index.html')
    ap.add_argument('--trecho'); ap.add_argument('--antes'); ap.add_argument('--mostrar', action='store_true')
    a = ap.parse_args()
    arq = Path(a.pagina)
    pagina = arq.read_text(encoding='utf-8')
    senha = os.environ.get('OHTOPICO_SENHA') or getpass.getpass('Senha: ')
    chave, html = abrir(pagina, senha.strip())
    if a.mostrar or not a.trecho:
        print('seções:', ', '.join(secoes(html)) or '(nenhuma com id)')
        print('títulos:', ' | '.join(re.sub(r'<[^>]+>', '', t).strip() for t in re.findall(r'<h2\b[^>]*>(.*?)</h2>', html, flags=re.S)))
        return
    trecho = re.sub(r'<!--.*?-->\s*', '', Path(a.trecho).read_text(encoding='utf-8'), flags=re.S).strip()
    m = re.match(r'<section\b[^>]*\bid="([^"]+)"', trecho)
    if not m or not trecho.endswith('</section>'):
        raise SystemExit('O trecho precisa ser um único <section id="..."> ... </section>.')
    sid = m.group(1)
    atual = re.search(rf'[ \t]*<section\b[^>]*\bid="{re.escape(sid)}".*?</section>\n?', html, flags=re.S)
    if atual:
        novo = html[:atual.start()] + trecho + '\n' + html[atual.end():]; acao = 'trocada'
    elif a.antes:
        p = re.search(rf'[ \t]*<section\b[^>]*\bid="{re.escape(a.antes)}"', html)
        if not p:
            raise SystemExit(f'Não achei a seção {a.antes}. Rode com --mostrar.')
        novo = html[:p.start()] + trecho + '\n' + html[p.start():]; acao = f'acrescentada antes de {a.antes}'
    else:
        p = html.rfind('</main>')
        if p < 0:
            raise SystemExit('A página não tem </main>. Use --antes.')
        novo = html[:p] + trecho + '\n' + html[p:]; acao = 'acrescentada no fim'
    iv = os.urandom(12)
    dados = AESGCM(chave).encrypt(iv, novo.encode(), None)
    pagina = re.sub(r"\bIV = '[^']*'", f"IV = '{b64(iv)}'", pagina, count=1)
    pagina = re.sub(r"\bDADOS = '[^']*'", f"DADOS = '{b64(dados)}'", pagina, count=1)
    arq.write_text(pagina, encoding='utf-8')
    _, conferido = abrir(pagina, senha.strip())
    assert conferido == novo
    print(f'seção {sid} {acao}; página cifrada de novo e conferida. Seções agora:', ', '.join(secoes(novo)))


if __name__ == '__main__':
    main()
