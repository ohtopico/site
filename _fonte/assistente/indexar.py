"""Gera o índice de busca do assistente do site (assistente/indice.json).

Lê as páginas listadas no sitemap.xml (só o que está publicado), separa cada página em trechos
por título (h1 a h4) e grava um JSON pequeno que o assistente.js consulta no navegador.
Não precisa de servidor nem de serviço externo: a busca roda toda no navegador de quem pergunta.

Uso:
    python _fonte/assistente/indexar.py --site .

Só usa a biblioteca padrão do Python (roda na GitHub Action logo depois do gerador do blog).
"""
import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

DOMINIO = 'ohtopico.com.br'
# Partes da página que não são conteúdo (menus, laterais, rodapé, scripts)
IGNORAR = {'script', 'style', 'noscript', 'nav', 'aside', 'footer', 'svg', 'template', 'button', 'select', 'form'}
VAZIAS = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
TITULOS = {'h1', 'h2', 'h3', 'h4'}
BLOCOS = {'p', 'li', 'dd', 'dt', 'tr', 'blockquote', 'figcaption', 'summary', 'pre'}
MAX_TRECHO = 700   # caracteres por trecho; trechos maiores são quebrados
MIN_TRECHO = 40


class Leitor(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titulo = ''
        self.descricao = ''
        self.secoes = []          # [ancora, titulo, [textos]]
        self.pilha = []           # tags abertas: (tag, ignorar?)
        self.em_title = False
        self.titulo_atual = None  # [tag, ancora, partes] enquanto lê um h1..h4
        self.bloco = None         # partes do bloco de texto atual
        self.secoes.append(['', '', []])

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'meta' and a.get('name') == 'description':
            self.descricao = (a.get('content') or '').strip()
        if tag == 'title':
            self.em_title = True
        if tag not in VAZIAS:
            esconder = tag in IGNORAR or a.get('aria-hidden') == 'true'
            self.pilha.append((tag, esconder, a.get('id') if tag in ('section', 'article') else None))
        if self.ignorando:
            return
        if tag in TITULOS:
            self.fechar_bloco()
            self.titulo_atual = [tag, a.get('id') or self.ancora_da_secao(), []]
        elif tag in BLOCOS:
            self.fechar_bloco()
            self.bloco = []
        elif tag in ('td', 'th') and self.bloco is not None and limpar(''.join(self.bloco)):
            self.bloco.append(' · ')   # células da mesma linha da tabela
        elif tag == 'br' and self.bloco is not None:
            self.bloco.append(' ')

    def handle_endtag(self, tag):
        if tag == 'title':
            self.em_title = False
        if any(item[0] == tag for item in self.pilha):
            while self.pilha:
                if self.pilha.pop()[0] == tag:
                    break
        if self.ignorando:
            return
        if tag in TITULOS and self.titulo_atual:
            texto = limpar(''.join(self.titulo_atual[2]))
            if texto:
                self.secoes.append([self.titulo_atual[1], texto, []])
            self.titulo_atual = None
        elif tag in BLOCOS:
            self.fechar_bloco()

    def handle_data(self, data):
        if self.em_title:
            self.titulo += data
            return
        if self.ignorando:
            return
        if self.titulo_atual is not None:
            self.titulo_atual[2].append(data)
        elif self.bloco is not None:
            self.bloco.append(data)

    @property
    def ignorando(self):
        return any(item[1] for item in self.pilha)

    def ancora_da_secao(self):
        for item in reversed(self.pilha):
            if item[2]:
                return item[2]
        return ''

    def fechar_bloco(self):
        if self.bloco is not None:
            texto = limpar(''.join(self.bloco))
            if texto:
                self.secoes[-1][2].append(texto)
        self.bloco = None


EMOJI = re.compile('[\U0001F000-\U0001FAFF\u2600-\u27BF\uFE0F\u200D]')


def limpar(t):
    return re.sub(r'\s+', ' ', EMOJI.sub('', t)).strip()


def quebrar(textos):
    """Junta parágrafos em trechos de até MAX_TRECHO caracteres sem cortar frases ao meio."""
    trechos, atual = [], ''
    for t in textos:
        frases = re.split(r'(?<=[.!?:])\s+', t) if len(t) > MAX_TRECHO else [t]
        for f in frases:
            if atual and len(atual) + len(f) + 1 > MAX_TRECHO:
                trechos.append(atual)
                atual = ''
            if atual and not re.search(r'[.!?:;]$', atual):
                atual += '.'   # separa itens de lista e linhas de tabela
            atual = f'{atual} {f}'.strip()
    if atual:
        trechos.append(atual)
    return trechos


def arquivo_da_url(site, url):
    caminho = urlparse(url).path.lstrip('/')
    if not caminho or caminho.endswith('/'):
        caminho += 'index.html'
    return site / caminho


def caminho_relativo(url):
    return urlparse(url).path or '/'


def ler_pagina(site, url):
    arq = arquivo_da_url(site, url)
    if not arq.exists():
        return None
    p = Leitor()
    p.feed(arq.read_text(encoding='utf-8', errors='ignore'))
    p.fechar_bloco()
    titulo = limpar(p.titulo).split(' · ')[0].split(' | ')[0]
    return titulo, p.descricao, p.secoes


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--site', type=Path, required=True)
    a = ap.parse_args()
    site = a.site.resolve()

    urls = re.findall(r'<loc>([^<]+)</loc>', (site / 'sitemap.xml').read_text(encoding='utf-8'))
    paginas, trechos, vistos = [], [], set()
    for url in urls:
        lida = ler_pagina(site, url)
        if not lida:
            print('sem arquivo:', url)
            continue
        titulo, descricao, secoes = lida
        pid = len(paginas)
        paginas.append({'u': caminho_relativo(url), 't': titulo, 'd': descricao})
        if descricao:
            trechos.append({'p': pid, 'h': '', 'a': '', 'x': descricao})
        for ancora, cabecalho, textos in secoes:
            for x in quebrar(textos):
                if len(x) < MIN_TRECHO and not cabecalho:
                    continue
                chave = (pid, x)
                if chave in vistos:
                    continue
                vistos.add(chave)
                trechos.append({'p': pid, 'h': cabecalho, 'a': ancora, 'x': x})

    destino = site / 'assistente' / 'indice.json'
    destino.parent.mkdir(exist_ok=True)
    novo = json.dumps({'paginas': paginas, 'trechos': trechos}, ensure_ascii=False, separators=(',', ':'))
    if not destino.exists() or destino.read_text(encoding='utf-8') != novo:
        destino.write_text(novo, encoding='utf-8')
    print(f'Assistente: {len(paginas)} páginas, {len(trechos)} trechos, {len(novo) // 1024} KB')


if __name__ == '__main__':
    main()
