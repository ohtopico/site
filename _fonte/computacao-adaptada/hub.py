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

    textos = {}
    hab = Path(__file__).resolve().parents[1] / 'planejamento' / 'habilidades.json'
    if hab.exists():
        textos = {h['codigo']: h['texto'] for h in json.loads(hab.read_text(encoding='utf-8')).get('CO', [])}
    blocos = []
    for a in sorted({f['ano'] for f in fichas}):
        doano = sorted((f for f in fichas if f['ano'] == a), key=lambda f: f['codigo'])
        linhas = []
        for eixo in dict.fromkeys(f['eixo'] for f in doano):
            linhas.append(f'<tr class="unidade"><th colspan="3">{esc(eixo)}</th></tr>')
            for f in (g for g in doano if g['eixo'] == eixo):
                linhas.append(f'<tr><td><b>{esc(f["codigo"])}</b></td><td>{esc(textos.get(f["codigo"], f["resumo"]))}</td>'
                              f'<td><a href="/computacao-adaptada/fichas/{f["slug"]}/">{esc(f["titulo"])}</a></td></tr>')
        blocos.append(f'<details class="mapa-ano" id="computacao-{a}"><summary>{a}º ano · {len(doano)} habilidades com ficha</summary>'
                      f'<div class="mapa-rolagem"><table class="mapa-bncc"><thead><tr><th>Código</th><th>Habilidade</th><th>Ficha</th></tr></thead>'
                      f'<tbody>{"".join(linhas)}</tbody></table></div></details>')
    secao = (f'<section class="ano-secao" id="computacao"><h2>Mapa da BNCC: Computação</h2>'
             f'<p class="intro-mapa">Uma ficha por habilidade de Computação da BNCC, do 6º ao 9º ano, adaptada das folhas para imprimir de BNCC Computação. '
             f'Abra o ano e escolha a habilidade: cada ficha tem as versões A, B e C da mesma atividade e a folha do professor. Veja também as <a href="/material-didatico/bncc/">habilidades de Computação</a> no material didático.</p>'
             f'{"".join(blocos)}</section>\n    ')
    trocas = [
        ('      </div>\n      <section class="bloco-anos"', porta + '      </div>\n      <section class="bloco-anos"'),
        ('        </div>\n      </div>\n      <div class="areas">', stat + '        </div>\n      </div>\n      <div class="areas">'),
        ('    </section>\n  </div>\n  <script>', '    </section>\n    ' + secao.rstrip() + '\n  </div>\n  <script>'),
        ('</main>', ESTILO + '\n</main>'),
        ('para a turma toda aprender junto.</p>', 'para a turma toda aprender junto. Também há fichas adaptadas de computação, do 6º ao 9º ano.</p>'),
    ]
    for antes, depois in trocas:
        if antes in texto:
            texto = texto.replace(antes, depois, 1)
        else:
            print(f'computacao-adaptada/hub.py: não achei o ponto de inserção {antes[:50]!r}')
    return texto
