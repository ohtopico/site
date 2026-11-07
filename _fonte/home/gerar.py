"""Gera, na página inicial (index.html), a janela Atualizações e a linha "Novo no site" do Leia-me a partir de
_fonte/home/novidades.json, para a home não ficar parada enquanto o site cresce.

Uso (na raiz do site):
    python _fonte/home/gerar.py          escreve os dois blocos gerados em index.html
    python _fonte/home/gerar.py --prs    antes disso, puxa dos PRs já mesclados (gh pr list) as novidades que ainda não
                                         estão no novidades.json e as acrescenta; é o que a Action "Publicar posts
                                         agendados" roda a cada push, então basta descrever a novidade no texto do PR.

Bloco no texto do PR (cada campo em uma linha; Texto e Curto são opcionais):
    Novidade: Computação do 1º ao 6º ano, um ano letivo por série
    Link: computacao-ano-a-ano/
    Texto: Cada série do 1º ao 6º ano ganhou um ano letivo completo de Computação, com 32 aulas, folhas e jogos.
    Curto: Computação ano a ano (1º ao 6º)

- Novidade é o título na janela; Curto é o nome na linha "Novo no site" (sem ele, vale a Novidade).
- Link é relativo à raiz do site (sem a barra inicial) e precisa existir; Texto aceita HTML simples com links relativos.
  Sem Texto, a janela mostra só o título com o link.
- A janela mostra as 10 novidades mais recentes; a linha "Novo no site", as 5 mais recentes. O resto fica no JSON.
- Linhas dentro de blocos de código (``` ```) no texto do PR são ignoradas: é onde cabe um exemplo do bloco.
  Uma novidade com o mesmo título e link de outra que já está no JSON também é ignorada.
- Rodar duas vezes com o mesmo JSON gera o mesmo HTML.
"""
import argparse
import html
import json
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
JSON = AQUI / 'novidades.json'
INDEX = RAIZ / 'index.html'
MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
NA_JANELA = 10
NA_LINHA = 5
MARCA = 'gerado por _fonte/home/gerar.py'


def data_extenso(iso):
    a, m, d = (int(x) for x in iso.split('-'))
    return f'{"1º" if d == 1 else d} de {MESES[m - 1]} de {a}'


def carregar():
    return json.loads(JSON.read_text(encoding='utf-8'))


def salvar(novidades):
    JSON.write_text(json.dumps(novidades, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')


def conferir(novidades):
    for n in novidades:
        for campo in ('data', 'titulo', 'link'):
            if not n.get(campo):
                raise SystemExit(f'novidade sem {campo}: {n}')
        alvo = RAIZ / n['link'].split('#')[0].split('?')[0]
        if n['link'].startswith(('http://', 'https://')):
            continue
        if not (alvo.exists() or (alvo / 'index.html').exists()):
            raise SystemExit(f'link não existe no site: {n["link"]} ({n["titulo"]})')


def das_prs(novidades):
    """Acrescenta as novidades descritas nos PRs mesclados que ainda não estão no JSON. Precisa do gh autenticado."""
    try:
        saida = subprocess.run(['gh', 'pr', 'list', '--state', 'merged', '--base', 'main', '--limit', '40',
                                '--json', 'number,title,body,mergedAt'], capture_output=True, text=True, check=True).stdout
    except (OSError, subprocess.CalledProcessError) as e:
        print(f'aviso: não consegui listar os PRs ({e}); sigo só com o novidades.json', file=sys.stderr)
        return 0
    conhecidos = {n.get('pr') for n in novidades if n.get('pr')}
    existentes = {(n['titulo'], n['link']) for n in novidades}
    novas = 0
    for pr in sorted(json.loads(saida), key=lambda p: p['mergedAt'] or ''):
        if pr['number'] in conhecidos or not pr.get('body'):
            continue
        campos = {}
        em_codigo = False
        for linha in pr['body'].splitlines():
            # um exemplo do bloco dentro de ``` ``` (como no texto do PR #334) não é uma novidade
            if linha.strip().startswith('```'):
                em_codigo = not em_codigo
                continue
            if em_codigo:
                continue
            m = re.match(r'^\s*(Novidade|Link|Texto|Curto):\s*(.+?)\s*$', linha)
            if m:
                campos[m.group(1).lower()] = m.group(2)
        if 'novidade' not in campos or 'link' not in campos:
            continue
        if (campos['novidade'], campos['link'].lstrip('/')) in existentes:
            print(f'aviso: o PR #{pr["number"]} repete uma novidade que já está no JSON; ignorado', file=sys.stderr)
            continue
        quando = datetime.fromisoformat(pr['mergedAt'].replace('Z', '+00:00')).astimezone(ZoneInfo('America/Sao_Paulo'))
        nova = {'data': quando.strftime('%Y-%m-%d'), 'titulo': campos['novidade'], 'link': campos['link'].lstrip('/'), 'pr': pr['number']}
        if campos.get('curto'):
            nova['curto'] = campos['curto']
        if campos.get('texto'):
            nova['texto'] = campos['texto']
        novidades.append(nova)
        existentes.add((nova['titulo'], nova['link']))
        novas += 1
        print(f'novidade do PR #{pr["number"]}: {nova["titulo"]}')
    return novas


def bloco(nome, conteudo):
    return f'<!-- {nome}: início ({MARCA}) -->{conteudo}<!-- {nome}: fim -->'


def trocar_bloco(txt, nome, conteudo, onde):
    ini = re.escape(f'<!-- {nome}: início ({MARCA}) -->')
    fim = re.escape(f'<!-- {nome}: fim -->')
    novo = bloco(nome, conteudo)
    if re.search(ini, txt):
        return re.sub(ini + r'[\s\S]*?' + fim, lambda m: novo, txt, count=1)
    return onde(txt, novo)


def artigo(n):
    titulo = html.escape(n['titulo'])
    texto = n.get('texto') or f'<a href="{html.escape(n["link"])}">{titulo}</a>.'
    return (f'            <article class="post">\n'
            f'                <h3>{titulo}</h3>\n'
            f'                <p class="data">{data_extenso(n["data"])}</p>\n'
            f'                <p>{texto}</p>\n'
            f'            </article>\n')


def escrever_index(novidades):
    ordem = sorted(novidades, key=lambda n: n['data'], reverse=True)  # estável: empate mantém a ordem do JSON
    txt = INDEX.read_text(encoding='utf-8')
    janela = '\n' + ''.join(artigo(n) for n in ordem[:NA_JANELA]) + '            '
    txt = trocar_bloco(txt, 'atualizacoes', janela, lambda t, b: re.sub(
        r'(<h2 class="sr-only">Atualizações</h2>\n)[\s\S]*?(\n\s*</div>\s*</section>)', lambda m: m.group(1) + '            ' + b + m.group(2), t, count=1))
    linha = ' · '.join(f'<a href="{html.escape(n["link"])}">{html.escape(n.get("curto") or n["titulo"])}</a>' for n in ordem[:NA_LINHA])
    novo = f'<p class="novidades"><b>Novo no site:</b> {linha}</p>'
    txt = trocar_bloco(txt, 'novo-no-site', novo, lambda t, b: re.sub(r'<p class="novidades">.*?</p>', lambda m: b, t, count=1))
    if f'atualizacoes: início ({MARCA})' not in txt or f'novo-no-site: início ({MARCA})' not in txt:
        raise SystemExit('não achei na index.html a janela Atualizações ou a linha "Novo no site"')
    if txt != INDEX.read_text(encoding='utf-8'):
        INDEX.write_text(txt, encoding='utf-8')
        return True
    return False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--prs', action='store_true', help='puxa as novidades dos PRs mesclados antes de gerar')
    a = ap.parse_args()
    novidades = carregar()
    if a.prs and das_prs(novidades):
        salvar(novidades)
    conferir(novidades)
    mudou = escrever_index(novidades)
    print(f'{len(novidades)} novidades no JSON; index.html {"atualizada" if mudou else "já estava em dia"}.')


if __name__ == '__main__':
    main()
