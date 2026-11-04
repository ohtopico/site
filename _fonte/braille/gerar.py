"""Gera a versão em braille (.brf) e os moldes táteis de cada ficha adaptada (Matemática e Computação).

    python _fonte/braille/gerar.py            todas as fichas
    python _fonte/braille/gerar.py reta       só as que têm "reta" no nome
    node _fonte/braille/moldes.js             depois: imprime os moldes táteis em PDF

Rode na raiz do site, depois dos geradores das fichas (lê o HTML das páginas já geradas).
Para cada ficha escreve, na pasta da própria ficha:
  <slug>.brf                 versões A, B e C em braille grau 1 (Grafia Braille) com sinais do Código Matemático
                             Unificado, 40 celas por linha e 25 linhas por página, pronto para a impressora braille
  _fonte/braille/moldes/<slug>.html   uma figura por molde, engrossada e sem cor, para o moldes.js virar PDF
e o índice _fonte/braille/indice.json (figuras por ficha), que os geradores das páginas usam para pôr os links.
"""
import json
import re
import sys
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

from braille import DESCONHECIDOS, Documento, texto_braille
import moldes

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent.parent
PASTAS = [RAIZ / 'matematica-adaptada' / 'fichas', RAIZ / 'computacao-adaptada' / 'fichas']
LACUNA = '( )'
BLOCOS = {'div', 'p', 'section', 'table', 'pre', 'ul', 'ol', 'h2', 'h3', 'svg', 'header', 'footer', 'li'}
LETRAS_ITEM = 'abcdefghijklmnopqrstuvwxyz'

NOTA = ('Como usar esta versão: onde a atividade pede para circular, pintar, ligar, cobrir ou marcar, '
        'escreva a resposta. Os parênteses vazios ( ) marcam o lugar da resposta. Faça as contas no soroban '
        'ou na reglete. Cada figura tem um molde tátil com o mesmo número, montado pelo professor.')


def limpo(t):
    return re.sub(r'[ \t\r\n\f\u00a0]+', ' ', t).strip(' \t\r\n')


class Ficha:
    def __init__(self, slug):
        self.slug = slug
        self.figuras = []        # dicts: n, svg, descricao, onde
        self._por_svg = {}
        self.onde = ''

    # ----- figuras -----
    def figura(self, svg):
        rotulo = limpo(svg.get('aria-label') or '')
        textos = []
        for t in svg.find_all('text'):
            s = limpo(t.get_text())
            if s and s not in textos:
                textos.append(s)
        desc = rotulo or 'figura'
        extra = [s for s in textos if s.lower() not in desc.lower()]
        if extra and len(extra) <= 12:
            desc += '. Escrito na figura: ' + ', '.join(extra)
        chave = str(svg)
        if chave not in self._por_svg:
            n = len(self.figuras) + 1
            self._por_svg[chave] = n
            self.figuras.append({'n': n, 'svg': chave, 'descricao': desc, 'onde': self.onde, 'textos': textos})
        n = self._por_svg[chave]
        return f'Figura {n} (molde tátil {n}): {desc}.'

    # ----- texto em linha -----
    def inline(self, el):
        if isinstance(el, NavigableString):
            return str(el)
        if not isinstance(el, Tag):
            return ''
        cl = el.get('class') or []
        if el.name == 'svg':
            return ' ' + self.figura(el) + ' '
        if el.name == 'br':
            return ' '
        if 'selo-exemplo' in cl or 'bolas' in cl or 'ponto' in cl:
            return ''
        if 'resposta' in cl:
            v = limpo(el.get_text())
            return f' {v} ' if v else f' {LACUNA} '
        if 'linha-resp' in cl or 'vazio' in cl or 'caixa-vazia' in cl or ('cel' in cl and 'vazia' in cl):
            return f' {LACUNA} '
        if 'cel' in cl:
            return limpo(el.get_text()) + '; '
        if 'traco' in cl:
            return f' {LACUNA} '
        if el.name == 'sup':
            return '^' + el.get_text()
        return ''.join((' ' + self.inline(c) + ' ') if isinstance(c, Tag) and c.get('class') else self.inline(c) for c in el.children)

    def tem_bloco(self, el):
        return any(isinstance(c, Tag) and (c.name in BLOCOS or 'opcoes' in (c.get('class') or [])) for c in el.children)

    # ----- blocos -----
    def blocos(self, el):
        """Lista de parágrafos (texto em tinta) de um elemento."""
        cl = el.get('class') or []
        if el.name == 'svg':
            return [self.figura(el)]
        if 'vetor' in cl:
            return ['Vetor: ' + '; '.join(f'posição {limpo(c.find("i").get_text())}: {limpo(c.find("b").get_text()) or LACUNA}'
                                         if c.find('i') and c.find('b') else limpo(c.get_text()) for c in el.select('.cel')) + '.']
        if 'seq-num' in cl:
            return ['; '.join(limpo(c.get_text()) or LACUNA for c in el.select('.cel'))]
        if 'opcoes' in cl:
            ops = el.select('.opcao') or [c for c in el.children if isinstance(c, Tag)]
            vals = [limpo(self.inline(o)).rstrip('.') for o in ops]
            certa = [limpo(self.inline(o)).rstrip('.') for o in ops if 'marcada' in (o.get('class') or [])]
            s = 'Opções: ' + '; '.join(v for v in vals if v) + '.'
            if certa:
                s += ' Resposta: ' + '; '.join(certa) + '.'
            return [s]
        if 'linhas' in cl:
            return [f'Resposta: {LACUNA}']
        if 'caixa-desenho' in cl:
            r = limpo(el.get_text())
            if r and 'Desenhe ou faça a conta' not in r:
                return [f'{r}: {LACUNA}']
            return []
        if 'ligar' in cl:
            pares = el.select('.ligar-par')
            esq = [limpo(p.select('.ligar-lado')[0].get_text()) for p in pares]
            dir_ = [limpo(p.select('.ligar-lado')[-1].get_text()) for p in pares]
            return (['Coluna da esquerda: ' + '; '.join(f'{i}. {t}' for i, t in enumerate(esq, 1)) + '.',
                     'Coluna da direita: ' + '; '.join(f'{LETRAS_ITEM[i]}) {t}' for i, t in enumerate(dir_)) + '.',
                     'Escreva o número e a letra que combinam, por exemplo: 1 e b.'])
        if el.name == 'table':
            return self.tabela(el)
        if el.name == 'pre':
            return [l for l in (limpo(x) for x in el.get_text().split('\n')) if l]
        if 'grade' in cl or 'ordenar' in cl or 'cartoes' in cl or 'cartoes-co' in cl or 'caixas-co' in cl:
            itens = [c for c in el.children if isinstance(c, Tag)]
            if len(itens) > 1 and 'item' in (itens[0].get('class') or []):
                saida = []
                for k, it in enumerate(itens):
                    ps = self.blocos(it)
                    if not ps:
                        continue
                    pre = f'{LETRAS_ITEM[k % 26]}) ' + ('Exemplo. ' if 'exemplo' in (it.get('class') or []) else '')
                    saida.append(('item', pre + ps[0]))
                    saida += ps[1:]
                return saida
        if 'item' in cl and 'exemplo' in cl and not el.find_parent(class_='grade'):
            ps = self.blocos_filhos(el)
            return (['Exemplo. ' + ps[0]] + ps[1:]) if ps else []
        if el.name in ('ul', 'ol'):
            return [limpo(self.inline(li)) for li in el.find_all('li', recursive=False)]
        if self.tem_bloco(el):
            return self.blocos_filhos(el)
        t = limpo(self.inline(el))
        return [t] if t else []

    def blocos_filhos(self, el):
        saida, buf = [], ''
        for c in el.children:
            if isinstance(c, Tag) and (c.name in BLOCOS or self.tem_bloco(c) or 'opcoes' in (c.get('class') or [])):
                if limpo(buf):
                    saida.append(limpo(buf))
                buf = ''
                saida += self.blocos(c)
            else:
                buf += self.inline(c)
        if limpo(buf):
            saida.append(limpo(buf))
        return saida

    def tabela(self, el):
        linhas = el.find_all('tr')
        cab = [limpo(self.inline(c)) for c in linhas[0].find_all(['th', 'td'])] if linhas and linhas[0].find('th') else []
        corpo = linhas[1:] if cab else linhas
        saida = [f'Tabela com {len(corpo)} linhas' + (': colunas ' + '; '.join(c or '(sem título)' for c in cab) + '.' if cab else '.')]
        for k, tr in enumerate(corpo, 1):
            cel = [limpo(self.inline(c)) or LACUNA for c in tr.find_all(['th', 'td'])]
            if cab and len(cab) == len(cel):
                partes = [f'{h}: {v}' if h else v for h, v in zip(cab, cel)]
            else:
                partes = cel
            saida.append(('item', f'Linha {k}. ' + '; '.join(partes) + '.'))
        return saida


def versao_doc(doc, ficha, art, ano):
    topo = art.select_one('.folha-topo')
    nivel = limpo(topo.select_one('.nivel').get_text()) if topo else ''
    hab = limpo(topo.select_one('.hab').get_text()) if topo and topo.select_one('.hab') else ''
    titulo = limpo(art.select_one('.folha-titulo').get_text())
    doc.nova_pagina()
    doc.titulo(titulo)
    doc.paragrafo((f'{nivel}. Habilidade {hab}.' if 'ano' in hab else f'{nivel}. {ano}. Habilidade {hab}.').replace('..', '.'), recuo=0)
    if art.select_one('.aluno'):
        doc.paragrafo(f'Nome: {LACUNA} Data: {LACUNA}', recuo=0)
    doc.branco()
    for el in art.children:
        if not isinstance(el, Tag) or el.name in ('header', 'footer', 'h2') or 'aluno' in (el.get('class') or []):
            continue
        if el.name == 'section' and 'bloco' in el.get('class', []):
            num = limpo(el.select_one('.instrucao .num').get_text())
            instr = limpo(ficha.inline(el.select_one('.instrucao span:not(.num)')))
            ficha.onde = f'{nivel.split(" ·")[0]}, atividade {num}'
            doc.linhas(doc_linhas(f'{num}. {instr}', 0, 3), juntas=True)
            dica = el.select_one('.dica')
            if dica:
                doc.paragrafo('Dica: ' + limpo(ficha.inline(dica)), recuo=3, deslocamento=3)
            corpo = el.select_one('.bloco-corpo')
            for p in (ficha.blocos(corpo) if corpo else []):
                if isinstance(p, tuple):
                    doc.item(p[1], deslocamento=5)
                else:
                    doc.paragrafo(p, recuo=3, deslocamento=3)
            doc.branco()
        else:
            ficha.onde = nivel.split(' ·')[0]
            for p in ficha.blocos(el):
                doc.paragrafo(p[1] if isinstance(p, tuple) else p, recuo=2)
            doc.branco()


def doc_linhas(t, recuo, desl):
    from braille import quebrar
    return quebrar(texto_braille(t), recuo, desl)


def gerar_ficha(pasta, slug):
    html = (pasta / slug / 'index.html').read_text(encoding='utf-8')
    s = BeautifulSoup(html, 'html.parser')
    arts = [a for a in s.select('article.folha') if a.get('data-versao') != 'Professor']
    if not arts:
        return None
    titulo = limpo(s.select_one('h1').get_text())
    rot = s.select_one('.rotulo')
    ano = limpo(rot.get_text()).split('·')[-1].strip() if rot else ''
    if 'ano' not in ano:
        m = re.search(r'\d+º ano|ensino médio', html)
        ano = m.group(0) if m else ''
    ficha = Ficha(slug)
    doc = Documento()
    doc.titulo(titulo)
    doc.paragrafo('Ficha adaptada em braille. ' + ano + '. ohtopico.com.br, Júlia Roberta Quoos Alves.', recuo=0)
    doc.branco()
    doc.paragrafo(NOTA)
    for art in arts:
        versao_doc(doc, ficha, art, ano)
    (pasta / slug / f'{slug}.brf').write_text(doc.brf(), encoding='ascii', newline='')
    area = 'matematica' if 'matematica' in str(pasta) else 'computacao'
    if ficha.figuras:
        moldes.escrever(AQUI / 'moldes' / f'{slug}.html', titulo, ano, ficha.figuras, area)
    return {'slug': slug, 'area': area, 'titulo': titulo, 'ano': ano, 'figuras': len(ficha.figuras),
            'paginas_braille': len(doc.paginas)}, doc


def pacotes(indice):
    """Um zip com todos os .brf de cada ano, em material-adaptado/braille/."""
    import zipfile
    destino = RAIZ / 'material-adaptado' / 'braille'
    destino.mkdir(parents=True, exist_ok=True)
    grupos = {}
    for slug, i in indice.items():
        m = re.match(r'(\d+)', i['ano'])
        if m:
            grupos.setdefault(f"{i['area']}-{m.group(1)}-ano-braille.zip", []).append(slug)
    for nome, slugs in grupos.items():
        with zipfile.ZipFile(destino / nome, 'w', zipfile.ZIP_DEFLATED) as z:
            for slug in sorted(slugs):
                area = 'computacao-adaptada' if indice[slug]['area'] == 'computacao' else 'matematica-adaptada'
                info = zipfile.ZipInfo(f'{slug}.brf', date_time=(2026, 11, 4, 0, 0, 0))
                info.compress_type = zipfile.ZIP_DEFLATED
                z.writestr(info, (RAIZ / area / 'fichas' / slug / f'{slug}.brf').read_bytes())


def main():
    filtro = next((a for a in sys.argv[1:] if not a.startswith('--')), None)
    previa = '--previa' in sys.argv
    (AQUI / 'moldes').mkdir(exist_ok=True)
    indice = {}
    arq_indice = AQUI / 'indice.json'
    if filtro and arq_indice.exists():
        indice = json.loads(arq_indice.read_text(encoding='utf-8'))
    for pasta in PASTAS:
        for d in sorted(pasta.iterdir()):
            if not d.is_dir() or (filtro and filtro not in d.name):
                continue
            r = gerar_ficha(pasta, d.name)
            if not r:
                continue
            info, doc = r
            indice[d.name] = info
            if previa:
                (AQUI / 'previa').mkdir(exist_ok=True)
                (AQUI / 'previa' / f'{d.name}.txt').write_text(doc.unicode(), encoding='utf-8')
    if not filtro:
        pacotes(indice)
    arq_indice.write_text(json.dumps(dict(sorted(indice.items())), ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'{len(indice)} fichas em braille, {sum(1 for v in indice.values() if v["figuras"])} com moldes táteis, '
          f'{sum(v["figuras"] for v in indice.values())} figuras')
    if DESCONHECIDOS:
        print('Símbolos sem braille (ficaram de fora):', ' '.join(f'{c!r}×{k}' for c, k in sorted(DESCONHECIDOS.items(), key=lambda x: -x[1])))


if __name__ == '__main__':
    main()
