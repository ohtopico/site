"""Gera a página do guia Tech pra Prof (tech-pra-prof/index.html).

O texto dos capítulos fica em modelo.html; os cartões das ferramentas ficam em ferramentas.json
e entram no lugar dos marcadores <!--FERRAMENTAS:id-do-capitulo-->. Os cartões saem em HTML
estático (e não montados por JavaScript) para o Google e o assistente do site conseguirem ler.

Uso (na raiz do repositório):
    python _fonte/tech-pra-prof/gerar.py

Ferramenta nova = nova entrada em ferramentas.json, no capítulo certo, e rodar de novo.
Só usa a biblioteca padrão do Python.
"""
import json
import re
from html import escape
from pathlib import Path

AQUI = Path(__file__).resolve().parent
SITE = AQUI.parent.parent
DESTINO = SITE / 'tech-pra-prof' / 'index.html'


def cartao(f, nomes_tags):
    tags = ''.join(f'<li class="t-{t}">{escape(nomes_tags[t])}</li>' for t in f['tags'])
    nome = escape(f['nome'])
    titulo = (f'<a href="{escape(f["url"])}" target="_blank" rel="noopener">{nome} ↗</a>'
              if f.get('url') else nome)
    return f'''<article class="tool" data-id="{f['id']}" data-nome="{nome}" data-url="{escape(f.get('url', ''))}" data-tags="{' '.join(f['tags'])}" data-para="{' '.join(f['para'])}">
          <div class="tool-top"><h4>{titulo}</h4><button class="fav-btn" type="button" data-id="{f['id']}" aria-pressed="false">Guardar</button></div>
          <ul class="tags" aria-label="Características">{tags}</ul>
          <dl><dt>Para que serve</dt><dd>{escape(f['serve'])}</dd><dt>Ideia para a aula</dt><dd>{escape(f['ideia'])}</dd><dt>Atenção</dt><dd>{escape(f['atencao'])}</dd></dl>
        </article>'''


def main():
    dados = json.loads((AQUI / 'ferramentas.json').read_text(encoding='utf-8'))
    modelo = (AQUI / 'modelo.html').read_text(encoding='utf-8')
    ids = set()
    usados = set()

    def trocar(m):
        cap = m.group(1)
        usados.add(cap)
        lista = dados['capitulos'][cap]
        for f in lista:
            assert f['id'] not in ids, f'id repetido: {f["id"]}'
            ids.add(f['id'])
            assert all(t in dados['tags'] for t in f['tags']), f'etiqueta desconhecida em {f["id"]}'
        cartoes = '\n        '.join(cartao(f, dados['tags']) for f in lista)
        return (f'<div class="tool-cards">\n        {cartoes}\n      </div>\n'
                f'      <p class="filtro-aviso" role="status"></p>')

    pagina = re.sub(r'<!--FERRAMENTAS:([\w-]+)-->', trocar, modelo)
    sobrando = set(dados['capitulos']) - usados
    assert not sobrando, f'capítulos sem marcador no modelo: {sobrando}'
    DESTINO.parent.mkdir(exist_ok=True)
    DESTINO.write_text(pagina, encoding='utf-8')
    print(f'{DESTINO.relative_to(SITE)}: {len(ids)} ferramentas em {len(usados)} capítulos')


if __name__ == '__main__':
    main()
