"""Gera a área premium protegida por senha (ohtopico.com.br/premium), com uma senha por plano do Catarse.

Uso (na raiz do repositório):
    python _fonte/premium/proteger.py --site . --fontes _privado/premium --novas-senhas   # troca as 5 senhas
    python _fonte/premium/proteger.py --site . --fontes _privado/premium                  # mantém as senhas

As senhas ficam só em _privado/premium/SENHAS.txt (fora do Git). Sem esse arquivo, o script lê a variável
OHTOPICO_SENHAS (5 senhas separadas por vírgula, do plano 1 ao 5) ou pergunta no terminal.
Cada senha tem pelo menos 12 caracteres e abre o próprio plano e todos os planos abaixo dele.

Como funciona: cada plano tem uma chave aleatória (AES-256), sorteada de novo a cada execução. Cada página e
cada arquivo é criptografado (AES-GCM) com a chave do plano mínimo dele. A senha de um plano abre um
"chaveiro" com as chaves do plano dele e dos planos abaixo. Assim, quem cancelou a assinatura perde o acesso
na próxima troca de senhas, e um plano mais barato não consegue abrir o conteúdo de um mais caro.

Planos: PLANOS abaixo. Plano mínimo de cada página: PAGINAS. Plano mínimo de cada pasta de arquivos:
_privado/premium/arquivos/niveis.json, por exemplo {"slides": 3, "jogos": 4}.

Marcadores na fonte das páginas:
    {{TAMANHO:pasta/arq.docx}} tamanho do arquivo, por exemplo "1,2 MB"
    {{LISTA:slides}}           botões de download de todos os arquivos da pasta, agrupados por ano,
                               com os títulos de arquivos/slides/titulos.json
    {{PLANOS_JSON}}            os nomes dos planos, para a página mostrar o plano de quem entrou
Os botões data-arquivo="pasta/arq" ganham data-nivel automaticamente.
"""
import argparse, base64, getpass, html, json, os, re, secrets
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

AQUI = Path(__file__).resolve().parent
PLANOS = {1: 'Apoiador entusiasta', 2: 'Educador na prática', 3: 'Educador criativo',
          4: 'Educador maker', 5: 'Comunidade & mentoria'}
PAGINAS = {'hub.html': ('premium/index.html', 1),
           'bastidores.html': ('premium/bastidores/index.html', 1),
           'mesada-pro.html': ('premium/mesada-pro/index.html', 4),
           'tutorial-jogos-html.html': ('premium/tutorial-jogos-html/index.html', 4),
           'treine-a-maquina.html': ('premium/treine-a-maquina/index.html', 4),
           'mentoria.html': ('premium/mentoria/index.html', 5)}
PRECOS = {1: 5, 2: 25, 3: 45, 4: 80, 5: 300}
ITER = 250000
MAGICO = b'OHTP2'  # cabeçalho dos .bin: MAGICO + plano (1 byte) + nonce (12) + dados
PORTAO = open(AQUI / 'portao.html', encoding='utf-8').read()
b64 = lambda b: base64.b64encode(b).decode()


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


def preparar(texto, fontes, niveis):
    arqs = fontes / 'arquivos'
    texto = texto.replace('{{PLANOS_JSON}}', json.dumps(PLANOS, ensure_ascii=False))
    texto = re.sub(r'\{\{TAMANHO:([^}]+)\}\}', lambda m: tamanho((arqs / m.group(1)).stat().st_size), texto)
    texto = re.sub(r'\{\{LISTA:([^}]+)\}\}', lambda m: lista(arqs / m.group(1), m.group(1)), texto)
    return re.sub(r'data-arquivo="([^"/]+)/', lambda m: f'data-nivel="{niveis[m.group(1)]}" {m.group(0)}', texto)


def ler_senhas(fontes, novas):
    arq = fontes / 'SENHAS.txt'
    if novas:
        senhas = ['-'.join(''.join(secrets.choice('abcdefghjkmnpqrstuvwxyz23456789') for _ in range(4)) for _ in range(4))
                  for _ in PLANOS]
        linhas = [f'{n} · {PLANOS[n]} (R$ {PRECOS[n]}): {s}' for n, s in zip(PLANOS, senhas)]
        arq.write_text('Senhas da área premium, uma por plano. Cada senha abre o próprio plano e os de baixo.\n'
                       'Mande cada uma só para os apoiadores daquele plano. Este arquivo fica fora do Git.\n\n'
                       + '\n'.join(linhas) + '\n', encoding='utf-8')
        print('senhas novas em', arq)
    elif arq.exists():
        senhas = [l.rsplit(': ', 1)[1].strip() for l in arq.read_text(encoding='utf-8').splitlines() if re.match(r'^\d · ', l)]
    elif os.environ.get('OHTOPICO_SENHAS'):
        senhas = [s.strip() for s in os.environ['OHTOPICO_SENHAS'].split(',')]
    else:
        senhas = [getpass.getpass(f'Senha do plano {n} ({PLANOS[n]}): ') for n in PLANOS]
    if len(senhas) != len(PLANOS) or len(set(senhas)) != len(senhas) or min(map(len, senhas)) < 12:
        raise SystemExit('São 5 senhas diferentes, com pelo menos 12 caracteres cada.')
    return senhas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True); ap.add_argument('--fontes', required=True)
    ap.add_argument('--novas-senhas', action='store_true', help='sorteia 5 senhas novas e grava em SENHAS.txt')
    a = ap.parse_args()
    fontes, site = Path(a.fontes), Path(a.site)
    senhas = ler_senhas(fontes, a.novas_senhas)
    chaves = {n: AESGCM.generate_key(256) for n in PLANOS}
    sal = os.urandom(16)
    # chaveiros: a senha do plano n abre as chaves dos planos 1..n
    niveis_js = []
    for n, senha in zip(PLANOS, senhas):
        k = PBKDF2HMAC(hashes.SHA256(), 32, sal, ITER).derive(senha.encode())
        chaveiro = json.dumps({'nivel': n, 'chaves': {str(i): b64(chaves[i]) for i in PLANOS if i <= n}}).encode()
        iv = os.urandom(12)
        niveis_js.append({'iv': b64(iv), 'd': b64(AESGCM(k).encrypt(iv, chaveiro, None))})
    secrets.SystemRandom().shuffle(niveis_js)  # a ordem não revela qual chaveiro é de qual plano
    niveis = json.loads((fontes / 'arquivos' / 'niveis.json').read_text(encoding='utf-8'))
    for fonte, (destino, minimo) in PAGINAS.items():
        iv = os.urandom(12)
        dados = AESGCM(chaves[minimo]).encrypt(iv, preparar((fontes / fonte).read_text(encoding='utf-8'), fontes, niveis).encode(), None)
        nivel = destino.count('/') - 1
        css = '../' * (nivel + 1) + 'material-didatico/assets/md.css'
        pagina = (PORTAO.replace('{{CSS}}', css).replace('{{SAL}}', b64(sal)).replace('{{ITER}}', str(ITER))
                  .replace('{{NIVEIS}}', json.dumps(niveis_js)).replace('{{PLANOS_JSON}}', json.dumps(PLANOS, ensure_ascii=False))
                  .replace('{{MINIMO}}', str(minimo)).replace('{{IV}}', b64(iv)).replace('{{DADOS}}', b64(dados)))
        out = site / destino; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(pagina, encoding='utf-8')
        print('ok', destino, '· plano', minimo)
    origem, saida = fontes / 'arquivos', site / 'premium' / 'arquivos'
    feitos = set()
    for arq in sorted(p for p in origem.rglob('*') if p.is_file() and p.name not in ('titulos.json', 'niveis.json')):
        rel = arq.relative_to(origem).as_posix()
        minimo = niveis[rel.split('/')[0]]
        iv = os.urandom(12)
        out = saida / (rel + '.bin'); out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(MAGICO + bytes([minimo]) + iv + AESGCM(chaves[minimo]).encrypt(iv, arq.read_bytes(), None))
        feitos.add(out)
    for velho in saida.rglob('*.bin'):
        if velho not in feitos:
            velho.unlink(); print('removido', velho.relative_to(site))
    print('ok', len(feitos), 'arquivos em premium/arquivos/')


if __name__ == '__main__':
    main()
