"""Acrescenta material à área premium sem trocar as senhas nem as chaves que já estão no site.

Desde 30/10/2026 cada plano tem uma senha fixa (SENHAS.txt sem mês). Rodar proteger.py de novo sorteia chaves novas
e exige todas as fontes da área premium. Este script faz o contrário: lê o chaveiro publicado em premium/index.html
com a senha do plano 5 (que guarda as chaves de todos os planos) e cifra só o que for novo com as mesmas chaves.
Todo material novo usa as chaves de novembro de 2026 (índice 0 no cabeçalho dos .bin e data-mes="2026-11" no hub),
porque são as únicas que as senhas fixas abrem. A data de liberação de um kit fica no hub, em data-libera="AAAA-MM-DD".

Uso (na raiz do repositório):
    # abre o hub publicado em texto claro, para editar
    python3 _fonte/premium/acrescentar.py --senhas _privado/premium/SENHAS.txt abrir _privado/premium/hub-publicado.html
    # cifra o hub editado, páginas novas e arquivos novos
    python3 _fonte/premium/acrescentar.py --senhas _privado/premium/SENHAS.txt publicar --fontes _privado/premium \\
        --hub _privado/premium/hub-publicado.html --pagina _privado/premium/paginas/senha-forte.html \\
        --arquivo 2026-11/pdf/senha-forte-1-desplugado.pdf --arquivo jogos/senha-forte.html [--limpar]
--pagina vira premium/<nome do arquivo>/index.html, plano 4 (mude com --plano-paginas).
--arquivo é relativo a <fontes>/arquivos e vira premium/arquivos/<mesmo caminho>.bin; o plano sai de NIVEIS pela pasta.
--limpar apaga as páginas e os .bin que nenhuma senha atual abre (restos dos meses cifrados com senhas que se perderam).
A senha também pode vir da variável OHTOPICO_SENHA_5. Autora: Júlia Roberta Quoos Alves.
"""
import argparse, base64, json, os, re
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

AQUI = Path(__file__).resolve().parent
MES = '2026-11'
MAGICO = b'OHTP3'
NIVEIS = {'pdf': 2, 'apostila': 2, 'imprimir': 2, 'planejamento': 3, 'slides': 3, 'editar': 3, 'editaveis': 3, 'jogos': 4, 'html': 4}
b64 = lambda b: base64.b64encode(b).decode()
d64 = base64.b64decode


def campo(t, nome):
    return re.search(r"\b%s = '([^']*)'" % nome, t).group(1)


def portao(site):
    """Sal, iterações e chaveiros do portão publicado (iguais em todas as páginas)."""
    t = (site / 'premium' / 'index.html').read_text(encoding='utf-8')
    return {'sal': campo(t, 'SAL'), 'iter': int(re.search(r'ITER = (\d+)', t).group(1)),
            'niveis': re.search(r'NIVEIS = (\[.*?\]),', t).group(1)}


def chaves(site, senha):
    p = portao(site)
    k = PBKDF2HMAC(hashes.SHA256(), 32, d64(p['sal']), p['iter']).derive(senha.encode())
    for n in json.loads(p['niveis']):
        try:
            ch = json.loads(AESGCM(k).decrypt(d64(n['iv']), d64(n['d']), None))
        except Exception:
            continue
        if ch['nivel'] != 5:
            raise SystemExit('Use a senha do plano 5 (Comunidade & mentoria): só ela guarda as chaves de todos os planos.')
        return {kk: d64(v) for kk, v in ch['chaves'].items()}
    raise SystemExit('Senha não confere com o chaveiro publicado em premium/index.html.')


def senha5(arq):
    if os.environ.get('OHTOPICO_SENHA_5'):
        return os.environ['OHTOPICO_SENHA_5']
    for l in Path(arq).read_text(encoding='utf-8').splitlines():
        m = re.match(r'^5 · .*: (\S+)\s*$', l)
        if m:
            return m.group(1)
    raise SystemExit(f'Não achei a linha do plano 5 em {arq}.')


def abrir_pagina(t, ch):
    k = ch.get(f"{campo(t, 'MES')}:{re.search(r'MINIMO = (\d+)', t).group(1)}")
    return AESGCM(k).decrypt(d64(campo(t, 'IV')), d64(campo(t, 'DADOS')), None).decode() if k else None


def cifrar_pagina(site, destino, html, plano, ch):
    p = portao(site)
    iv = os.urandom(12)
    dados = AESGCM(ch[f'{MES}:{plano}']).encrypt(iv, html.encode(), None)
    nivel = destino.count('/') - 1
    planos = re.search(r"PLANOS = (\{.*?\});", (site / 'premium' / 'index.html').read_text(encoding='utf-8')).group(1)
    meses = re.search(r"const MESES = (\{.*?\}), MES", (site / 'premium' / 'index.html').read_text(encoding='utf-8')).group(1)
    pagina = ((AQUI / 'portao.html').read_text(encoding='utf-8').replace('{{CSS}}', '../' * (nivel + 1) + 'material-didatico/assets/md.css')
              .replace('{{SAL}}', p['sal']).replace('{{ITER}}', str(p['iter'])).replace('{{NIVEIS}}', p['niveis'])
              .replace('{{PLANOS_JSON}}', planos).replace('{{MESES_JSON}}', meses).replace('{{MES}}', MES)
              .replace('{{MINIMO}}', str(plano)).replace('{{IV}}', b64(iv)).replace('{{DADOS}}', b64(dados)))
    out = site / destino; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(pagina, encoding='utf-8')
    print('ok', destino, '· plano', plano)


def nivel_arquivo(rel):
    partes = rel.split('/')
    pasta = partes[1] if re.fullmatch(r'\d{4}-\d{2}', partes[0]) else partes[0]
    return NIVEIS[pasta]


def cifrar_arquivo(site, fontes, rel, ch):
    plano = nivel_arquivo(rel); iv = os.urandom(12)
    dados = (fontes / 'arquivos' / rel).read_bytes()
    out = site / 'premium' / 'arquivos' / (rel + '.bin'); out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(MAGICO + bytes([plano, 0]) + iv + AESGCM(ch[f'{MES}:{plano}']).encrypt(iv, dados, None))
    print('ok', out.relative_to(site), '· plano', plano)


def limpar(site, ch):
    for pag in sorted((site / 'premium').rglob('index.html')):
        if 'arquivos' in pag.parts:
            continue
        if abrir_pagina(pag.read_text(encoding='utf-8'), ch) is None:
            pag.unlink(); print('removida', pag.relative_to(site))
            if not any(pag.parent.iterdir()):
                pag.parent.rmdir()
    for arq in sorted((site / 'premium' / 'arquivos').rglob('*.bin')):
        cab = arq.read_bytes()[:7]
        if cab[:5] != MAGICO or cab[6] != 0:
            arq.unlink(); print('removido', arq.relative_to(site))
    for d in sorted((p for p in (site / 'premium').rglob('*') if p.is_dir()), key=lambda p: -len(p.parts)):
        if not any(d.iterdir()):
            d.rmdir()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', default='.'); ap.add_argument('--senhas', default='_privado/premium/SENHAS.txt')
    sub = ap.add_subparsers(dest='cmd', required=True)
    a1 = sub.add_parser('abrir'); a1.add_argument('saida')
    a2 = sub.add_parser('publicar'); a2.add_argument('--fontes', default='_privado/premium'); a2.add_argument('--hub')
    a2.add_argument('--pagina', action='append', default=[]); a2.add_argument('--plano-paginas', type=int, default=4)
    a2.add_argument('--arquivo', action='append', default=[]); a2.add_argument('--limpar', action='store_true')
    a = ap.parse_args(); site = Path(a.site)
    ch = chaves(site, senha5(a.senhas))
    if a.cmd == 'abrir':
        Path(a.saida).write_text(abrir_pagina((site / 'premium' / 'index.html').read_text(encoding='utf-8'), ch), encoding='utf-8')
        print('ok hub aberto em', a.saida); return
    fontes = Path(a.fontes)
    for f in a.pagina:
        cifrar_pagina(site, f'premium/{Path(f).stem}/index.html', Path(f).read_text(encoding='utf-8'), a.plano_paginas, ch)
    for rel in a.arquivo:
        cifrar_arquivo(site, fontes, rel, ch)
    if a.limpar:
        limpar(site, ch)
    if a.hub:  # por último, porque o portão das outras páginas é lido do hub publicado
        cifrar_pagina(site, 'premium/index.html', Path(a.hub).read_text(encoding='utf-8'), 1, ch)


if __name__ == '__main__':
    main()
