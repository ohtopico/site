"""Seção Computação do /material-adaptado/. Chamado pelo gerar_hub() de _fonte/matematica-adaptada/gerar.py:
recebe o HTML pronto do hub e devolve com a porta, o cartão de estatística e a seção id="computacao".
Lê só indice.json (gerado por _fonte/computacao-adaptada/gerar.py)."""
import html
import json
from pathlib import Path

INDICE = Path(__file__).resolve().parent / 'indice.json'
esc = lambda t: html.escape(str(t), quote=True)  # noqa: E731

ESTILO = ('<style>.areas .area-door.computacao{grid-column:1/-1;background:var(--paper)}'
          '.area-door.computacao .mark{color:var(--ink)}.computacao-anos h3{font-size:22px;margin:22px 0 10px}.stats .stat-computacao{grid-column:1/-1}</style>')


def inserir(texto):
    if not INDICE.exists():
        return texto
    fichas = json.loads(INDICE.read_text(encoding='utf-8'))['fichas']
    n = len(fichas)
    porta = (f'''        <a class="area-door computacao" href="#computacao">
          <span class="mark">Computação · 6º ao 9º ano</span>
          <h3>Computação adaptada</h3>
          <p>As {n} habilidades de Computação da BNCC do 6º ao 9º ano, com as mesmas atividades das folhas para imprimir de BNCC Computação: algoritmos, dados, internet, segurança, cidadania digital e cultura digital.</p>
          <ul>
            <li>Versão A com marcar, circular e ligar</li>
            <li>Exemplo resolvido e letra grande</li>
            <li>Folha do professor com gabarito</li>
          </ul>
          <span class="go">Ver as fichas de computação →</span>
        </a>
''')
    stat = f'          <a class="stat stat-computacao" href="#computacao"><b>{n}</b><span>fichas de computação (6º ao 9º)</span></a>\n'

    def cartao(f):
        return (f'<li><a class="ficha-card" href="/computacao-adaptada/fichas/{f["slug"]}/">'
                f'<span class="cod">{esc(f["codigo"])} · {esc(f["eixo"])}</span><strong>{esc(f["titulo"])}</strong>'
                f'<span class="resumo">{esc(f["resumo"])}</span><span class="meta">Versões A, B e C · orientações · PDF</span></a></li>')
    anos = ''.join(f'<h3 id="computacao-{a}">{a}º ano</h3><ul class="fichas-grade">{"".join(cartao(f) for f in fichas if f["ano"] == a)}</ul>'
                   for a in sorted({f['ano'] for f in fichas}))
    secao = (f'<section class="ano-secao computacao-anos" id="computacao"><h2>Computação</h2>'
             f'<p class="intro-mapa">Uma ficha por habilidade de Computação da BNCC, do 6º ao 9º ano, adaptada das folhas para imprimir de BNCC Computação. '
             f'Cada ficha tem as versões A, B e C da mesma atividade e a folha do professor. Veja também as <a href="/material-didatico/bncc/">habilidades de Computação</a> no material didático.</p>'
             f'{anos}</section>\n    ')
    trocas = [
        ('      </div>\n      <section class="bloco-anos"', porta + '      </div>\n      <section class="bloco-anos"'),
        ('        </div>\n      </div>\n      <div class="areas">', stat + '        </div>\n      </div>\n      <div class="areas">'),
        ('<section class="ano-secao" id="mapa-bncc">', secao + '<section class="ano-secao" id="mapa-bncc">'),
        ('</main>', ESTILO + '\n</main>'),
        ('para a turma toda aprender junto.</p>', 'para a turma toda aprender junto. Também há fichas adaptadas de computação, do 6º ao 9º ano.</p>'),
    ]
    for antes, depois in trocas:
        if antes in texto:
            texto = texto.replace(antes, depois, 1)
        else:
            print(f'computacao-adaptada/hub.py: não achei o ponto de inserção {antes[:50]!r}')
    return texto
