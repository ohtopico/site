"""Gera a área premium protegida por senha (ohtopico.com.br/premium): uma senha por plano do Catarse e por mês.

Uso (na raiz do repositório):
    python _fonte/premium/proteger.py --site . --fontes _privado/premium                     # mantém as senhas
    python _fonte/premium/proteger.py --site . --fontes _privado/premium --completar-senhas  # cria as que faltam
    python _fonte/premium/proteger.py --site . --fontes _privado/premium --novas-senhas      # troca todas as 60

As senhas ficam só em _privado/premium/SENHAS.txt (fora do Git), 5 por mês (MESES), e o arquivo diz quando
mandar cada grupo. A senha do plano n no mês m abre o plano n e os de baixo, no mês m e nos anteriores.

Liberação por mês: cada par (mês, plano) tem uma chave aleatória (AES-256), sorteada de novo a cada execução.
Cada página e cada arquivo é criptografado (AES-GCM) com a chave do seu mês e do seu plano mínimo. A senha abre
um "chaveiro" com as chaves que ela pode usar. Assim todo o material do ano já pode estar no site, mas o de
dezembro só abre com a senha de dezembro, que a Júlia manda no dia 1. Quem cancelou não recebe a senha nova.

Planos: PLANOS. Plano e mês de cada página: PAGINAS. Plano de cada pasta de arquivos:
_privado/premium/arquivos/niveis.json, por exemplo {"slides": 3, "jogos": 4}. O mês de um arquivo é a
primeira pasta do caminho quando ela tem a forma AAAA-MM (arquivos/2026-12/jogos/x.html); senão, MESES[0].

Marcadores na fonte das páginas:
    {{TAMANHO:pasta/arq.docx}} tamanho do arquivo, por exemplo "1,2 MB"
    {{LISTA:slides}}           botões de download de todos os arquivos da pasta, agrupados por ano,
                               com os títulos de arquivos/slides/titulos.json
    {{PLANOS_JSON}}            os nomes dos planos, para a página mostrar o plano de quem entrou
    {{MESES_JSON}}             os meses e seus nomes, por exemplo {"2026-12": "dezembro de 2026"}
Os botões data-arquivo="pasta/arq" ganham data-nivel e data-mes automaticamente.
Sigilo dos meses seguintes: tudo o que é de um mês depois de MESES[0] sai com nome sorteado (premium/x/<código>/ e
premium/arquivos/x/<código>.bin), e os trechos do hub entre <!-- MES AAAA-MM alvo --> e <!-- /MES --> vão cifrados com a
chave daquele mês. Quem não tem a senha do mês não vê nem o nome do material; o trecho aparece no lugar do primeiro
bloco daquele alvo assim que a senha do mês chega. O código depende das senhas: trocar as senhas troca os endereços. Um item com data-mes="AAAA-MM"
aparece como "Libera em ..." para quem ainda não tem a senha daquele mês.
"""
import argparse, base64, getpass, hashlib, hmac, html, json, os, re, secrets
from pathlib import Path
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

AQUI = Path(__file__).resolve().parent
PLANOS = {1: 'Apoiador entusiasta', 2: 'Educador na prática', 3: 'Educador criativo',
          4: 'Educador maker', 5: 'Comunidade & mentoria'}
NOMES_MES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro',
             'outubro', 'novembro', 'dezembro']
MESES = ['2026-11', '2026-12'] + [f'2027-{m:02d}' for m in range(1, 11)]
NOME = {m: f'{NOMES_MES[int(m[5:]) - 1]} de {m[:4]}' for m in MESES}
M0 = MESES[0]
PAGINAS = {'hub.html': ('premium/index.html', 1, M0),
           'bastidores.html': ('premium/bastidores/index.html', 1, M0),
           'mesada-pro.html': ('premium/mesada-pro/index.html', 4, M0),
           'tutorial-jogos-html.html': ('premium/tutorial-jogos-html/index.html', 4, M0),
           'treine-a-maquina.html': ('premium/treine-a-maquina/index.html', 4, M0),
           'mentoria.html': ('premium/mentoria/index.html', 5, M0),
           'diagnostico.html': ('premium/diagnostico/index.html', 2, M0),
           'provas.html': ('premium/provas/index.html', 3, M0)}
# jogos dos próximos meses: _privado/premium/meses/AAAA-MM/<nome>.html -> premium/<nome>/index.html, plano 4
JOGO_DO_MES = 4
PRECOS = {1: 5, 2: 25, 3: 45, 4: 80, 5: 300}
ITER = 250000
MAGICO = b'OHTP3'  # cabeçalho dos .bin: MAGICO + plano (1 byte) + mês (índice em MESES, 1 byte) + nonce (12) + dados
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


def codigo(segredo, nome):
    """Nome sorteado e estável de um arquivo ou página de mês futuro (muda só se as senhas mudarem)."""
    return hmac.new(segredo, nome.encode(), hashlib.sha256).hexdigest()[:20]


def preparar(texto, fontes, niveis, segredo=b'', chaves=None, slugs=()):
    arqs = fontes / 'arquivos'
    texto = texto.replace('{{PLANOS_JSON}}', json.dumps(PLANOS, ensure_ascii=False)).replace('{{MESES_JSON}}', json.dumps(NOME, ensure_ascii=False))
    texto = re.sub(r'\{\{TAMANHO:([^}]+)\}\}', lambda m: tamanho((arqs / m.group(1)).stat().st_size), texto)
    texto = re.sub(r'\{\{LISTA:([^}]+)\}\}', lambda m: lista(arqs / m.group(1), m.group(1)), texto)
    def marca(m):
        mes, pasta, resto = m.group(1) or M0, m.group(2), m.group(3)
        rel = f'{mes}/{pasta}/{resto}' if m.group(1) else f'{pasta}/{resto}'
        if mes != M0:  # mês futuro: o endereço não revela o nome do arquivo
            return f'data-nivel="{niveis[pasta]}" data-mes="{mes}" data-nome="{resto.split("/")[-1]}" data-arquivo="x/{codigo(segredo, "arq:" + rel)}"'
        return f'data-nivel="{niveis[pasta]}" data-mes="{mes}" data-arquivo="{rel}"'
    texto = re.sub(r'data-arquivo="(?:(\d{4}-\d{2})/)?([^"/]+)/([^"]+)"', marca, texto)
    for slug in slugs:
        texto = texto.replace(f'href="{slug}/"', f'href="x/{codigo(segredo, "pag:" + slug)}/"')
    cofres, lugares = [], {}
    def cofre(m):
        mes, alvo, corpo = m.group(1), m.group(2), m.group(3)
        if mes == M0 or chaves is None:
            return corpo
        iv = os.urandom(12)
        dado = json.dumps({'mes': mes, 'alvo': alvo, 'html': corpo}, ensure_ascii=False).encode()
        cofres.append({'iv': b64(iv), 'd': b64(AESGCM(chaves[(mes, 1)]).encrypt(iv, dado, None))})
        if alvo in lugares:
            return ''
        lugares[alvo] = True
        return f'<span data-cofre="{alvo}" hidden></span>'
    texto = re.sub(r'[ \t]*<!-- MES (\d{4}-\d{2}) (\w+) -->\n(.*?)[ \t]*<!-- /MES -->\n?', cofre, texto, flags=re.S)
    secrets.SystemRandom().shuffle(cofres)  # a ordem não revela o mês de cada trecho
    return texto.replace('{{COFRES}}', json.dumps(cofres))


def sortear():
    return '-'.join(''.join(secrets.choice('abcdefghjkmnpqrstuvwxyz23456789') for _ in range(4)) for _ in range(4))


def ler_senhas(fontes, novas, completar):
    """{(mês, plano): senha}. Linhas de SENHAS.txt: 'AAAA-MM · n · Nome (R$ x): senha' (sem mês = MESES[0])."""
    arq = fontes / 'SENHAS.txt'
    senhas = {}
    if arq.exists() and not novas:
        for l in arq.read_text(encoding='utf-8').splitlines():
            m = re.match(r'^(?:(\d{4}-\d{2}) · )?(\d) · .*: (\S+)\s*$', l)
            if m:
                senhas[(m.group(1) or M0, int(m.group(2)))] = m.group(3)
    elif os.environ.get('OHTOPICO_SENHAS') and not novas:
        lista = [s.strip() for s in os.environ['OHTOPICO_SENHAS'].split(',')]
        senhas = {(mes, n): lista[i * len(PLANOS) + n - 1] for i, mes in enumerate(MESES) for n in PLANOS
                  if i * len(PLANOS) + n - 1 < len(lista)}
    faltam = [(mes, n) for mes in MESES for n in PLANOS if (mes, n) not in senhas]
    if faltam and (novas or completar):
        for k in faltam:
            senhas[k] = sortear()
        linhas = ['Senhas da área premium: 5 por mês, uma por plano. Cada senha abre o próprio plano e os de baixo,',
                  'no mês dela e nos anteriores. No dia 1 de cada mês, mande a senha de cada plano só para os apoiadores',
                  'daquele plano. Este arquivo fica fora do Git.', '']
        for mes in MESES:
            linhas += ['', f'{NOME[mes].capitalize()} (mandar no dia 1/{int(mes[5:])})']
            linhas += [f'{mes} · {n} · {PLANOS[n]} (R$ {PRECOS[n]}): {senhas[(mes, n)]}' for n in PLANOS]
        arq.write_text('\n'.join(linhas) + '\n', encoding='utf-8')
        print('senhas gravadas em', arq, '·', len(faltam), 'novas')
    elif faltam:
        raise SystemExit(f'Faltam {len(faltam)} senhas em SENHAS.txt. Rode com --completar-senhas.')
    todas = list(senhas.values())
    if len(set(todas)) != len(todas) or min(map(len, todas)) < 12:
        raise SystemExit('As senhas precisam ser todas diferentes, com pelo menos 12 caracteres cada.')
    return senhas


def paginas(fontes, segredo):
    """PAGINAS mais os jogos dos próximos meses em _privado/premium/meses/AAAA-MM/<nome>.html."""
    todas = {fontes / f: v for f, v in PAGINAS.items()}
    for f in sorted((fontes / 'meses').glob('*/*.html')):
        if f.parent.name not in MESES:
            raise SystemExit(f'{f}: a pasta precisa ser um mês de MESES ({MESES[0]} a {MESES[-1]})')
        nome = f.stem if f.parent.name == M0 else 'x/' + codigo(segredo, 'pag:' + f.stem)
        todas[f] = (f'premium/{nome}/index.html', JOGO_DO_MES, f.parent.name)
    return todas


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--site', required=True); ap.add_argument('--fontes', required=True)
    ap.add_argument('--novas-senhas', action='store_true', help='sorteia todas as 60 senhas de novo')
    ap.add_argument('--completar-senhas', action='store_true', help='sorteia só as senhas que faltam em SENHAS.txt')
    a = ap.parse_args()
    fontes, site = Path(a.fontes), Path(a.site)
    senhas = ler_senhas(fontes, a.novas_senhas, a.completar_senhas)
    segredo = hashlib.sha256(('|'.join(f'{k[0]}:{k[1]}:{v}' for k, v in sorted(senhas.items()))).encode()).digest()
    slugs = [f.stem for f in (fontes / 'meses').glob('*/*.html') if f.parent.name != M0]
    chaves = {(mes, n): AESGCM.generate_key(256) for mes in MESES for n in PLANOS}
    sal = os.urandom(16)
    # chaveiros: a senha (mês m, plano n) abre as chaves dos meses até m e dos planos até n
    niveis_js = []
    for (mes, n), senha in senhas.items():
        k = PBKDF2HMAC(hashes.SHA256(), 32, sal, ITER).derive(senha.encode())
        acesso = {f'{mm}:{i}': b64(chaves[(mm, i)]) for mm in MESES if mm <= mes for i in PLANOS if i <= n}
        chaveiro = json.dumps({'nivel': n, 'mes': mes, 'chaves': acesso}).encode()
        iv = os.urandom(12)
        niveis_js.append({'iv': b64(iv), 'd': b64(AESGCM(k).encrypt(iv, chaveiro, None))})
    secrets.SystemRandom().shuffle(niveis_js)  # a ordem não revela qual chaveiro é de qual plano ou mês
    niveis = json.loads((fontes / 'arquivos' / 'niveis.json').read_text(encoding='utf-8'))
    feitas = set()
    for fonte, (destino, minimo, mes) in paginas(fontes, segredo).items():
        iv = os.urandom(12)
        dados = AESGCM(chaves[(mes, minimo)]).encrypt(iv, preparar(fonte.read_text(encoding='utf-8'), fontes, niveis, segredo, chaves, slugs).encode(), None)
        feitas.add((site / destino).resolve())
        nivel = destino.count('/') - 1
        css = '../' * (nivel + 1) + 'material-didatico/assets/md.css'
        pagina = (PORTAO.replace('{{CSS}}', css).replace('{{SAL}}', b64(sal)).replace('{{ITER}}', str(ITER))
                  .replace('{{NIVEIS}}', json.dumps(niveis_js)).replace('{{PLANOS_JSON}}', json.dumps(PLANOS, ensure_ascii=False))
                  .replace('{{MESES_JSON}}', json.dumps(NOME, ensure_ascii=False)).replace('{{MES}}', mes)
                  .replace('{{MINIMO}}', str(minimo)).replace('{{IV}}', b64(iv)).replace('{{DADOS}}', b64(dados)))
        out = site / destino; out.parent.mkdir(parents=True, exist_ok=True); out.write_text(pagina, encoding='utf-8')
        print('ok', destino, '· plano', minimo, '·', mes)
    for velha in (site / 'premium').rglob('index.html'):
        if 'arquivos' not in velha.parts and velha.resolve() not in feitas:
            velha.unlink(); print('removida', velha.relative_to(site))
            for d in (velha.parent, velha.parent.parent):
                if d != site / 'premium' and d.is_dir() and not any(d.iterdir()):
                    d.rmdir()
    origem, saida = fontes / 'arquivos', site / 'premium' / 'arquivos'
    feitos = set()
    for arq in sorted(p for p in origem.rglob('*') if p.is_file() and p.name not in ('titulos.json', 'niveis.json')):
        partes = arq.relative_to(origem).parts
        mes = partes[0] if re.fullmatch(r'\d{4}-\d{2}', partes[0]) else M0
        pasta = partes[1] if mes == partes[0] else partes[0]
        minimo = niveis[pasta]
        iv = os.urandom(12)
        rel = arq.relative_to(origem).as_posix()
        out = saida / ((rel if mes == M0 else 'x/' + codigo(segredo, 'arq:' + rel)) + '.bin'); out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(MAGICO + bytes([minimo, MESES.index(mes)]) + iv + AESGCM(chaves[(mes, minimo)]).encrypt(iv, arq.read_bytes(), None))
        feitos.add(out)
    for velho in saida.rglob('*.bin'):
        if velho not in feitos:
            velho.unlink(); print('removido', velho.relative_to(site))
    for d in sorted((p for p in saida.rglob('*') if p.is_dir()), key=lambda p: -len(p.parts)):
        if not any(d.iterdir()):
            d.rmdir()
    print('ok', len(feitos), 'arquivos em premium/arquivos/')


if __name__ == '__main__':
    main()
