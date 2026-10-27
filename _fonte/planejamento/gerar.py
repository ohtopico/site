"""Planejamento anual por meses (1 aula por semana por turma).

Gera freebies/planejamento-mensal-informatica.pdf e
freebies/planejamento-mensal-matematica.pdf a partir de habilidades.json.

Uso (na raiz do repositório):
    python3 _fonte/planejamento/gerar.py          # gera os HTML em _fonte/planejamento/saida/
    node _fonte/planejamento/pdf.js               # converte em PDF (precisa do Playwright)

Para mudar o ano letivo, edite o bloco CALENDÁRIO abaixo.
habilidades.json guarda, para cada habilidade, o bimestre (o mesmo da versão
por bimestres), o texto da BNCC e os materiais do ohtopico com link.
Autora: Júlia Roberta Quoos Alves.
"""
import datetime as dt
import html
import json
import os

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, 'saida')

# ---------------------------------------------------------------- CALENDÁRIO
ANO = 2027
INICIO = dt.date(2027, 3, 1)       # segunda-feira da 1ª semana de aula
FIM = dt.date(2027, 12, 17)        # sexta-feira da última semana
RECESSO = (dt.date(2027, 7, 12), dt.date(2027, 7, 23), 'Recesso escolar de inverno')
# Primeira segunda-feira de cada bimestre (o 1º começa em INICIO)
BIMESTRES = [INICIO, dt.date(2027, 5, 10), dt.date(2027, 7, 26), dt.date(2027, 10, 4)]
FERIADOS = [
    (dt.date(2027, 3, 26), 'Sexta-feira Santa'),
    (dt.date(2027, 4, 21), 'Tiradentes'),
    (dt.date(2027, 5, 27), 'Corpus Christi'),
    (dt.date(2027, 9, 7), 'Independência'),
    (dt.date(2027, 9, 20), 'Revolução Farroupilha (RS)'),
    (dt.date(2027, 10, 12), 'Nossa Senhora Aparecida'),
    (dt.date(2027, 11, 2), 'Finados'),
    (dt.date(2027, 11, 15), 'Proclamação da República'),
]
# Feriados que caem no fim de semana em 2027 (só citados nas premissas)
FERIADOS_SABADO = '1º de maio e 20 de novembro (Consciência Negra) caem em sábado'

MESES = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
         'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb', 'dom']
COMP = {
    'CO': {'nome': 'Informática', 'arquivo': 'informatica',
           'fonte': 'Complemento à BNCC de Computação (Resolução CNE/CEB nº 1/2022), anos finais do Ensino Fundamental (EF06CO01 a EF09CO10).'},
    'MA': {'nome': 'Matemática', 'arquivo': 'matematica',
           'fonte': 'BNCC de Matemática, anos finais do Ensino Fundamental (EF06MA01 a EF09MA23). Textos das habilidades conforme o documento oficial.'},
}


def e(t):
    return html.escape(str(t))


def d(x):
    return x.strftime('%d/%m')


def semanas():
    """Lista de semanas letivas: dict(seg, sex, bim, feriados)."""
    out = []
    seg = INICIO
    while seg <= FIM:
        sex = seg + dt.timedelta(days=4)
        if not (RECESSO[0] <= seg <= RECESSO[1]):
            bim = sum(1 for b in BIMESTRES if b <= seg)
            fer = [(f, n) for f, n in FERIADOS if seg <= f <= sex]
            out.append({'seg': seg, 'sex': sex, 'bim': bim, 'fer': fer})
        seg += dt.timedelta(days=7)
    return out


def tipo(m):
    return m['t'].split(' · ')[0]


def roteiro(h, n):
    """Divide os materiais de uma habilidade em n aulas: [(foco, [materiais])]."""
    mats = h['materiais']
    abre = [m for m in mats if tipo(m) in ('Slides', 'Plano de aula')]
    pratica = [m for m in mats if tipo(m) in ('Jogo', 'Recurso 3D', 'Ficha')]
    lista = [m for m in mats if tipo(m) == 'Lista']
    if n == 1:
        return [('Aula única: apresentação, prática e exercícios', mats)]
    aulas = [('Apresentação do tema', abre)]
    for m in pratica:
        aulas.append(('Atividade prática', [m]))
    fecho = ('Exercícios e fechamento', lista or abre)
    while len(aulas) + 1 < n:
        aulas.insert(len(aulas), ('Prática e aprofundamento', abre[-1:] if abre else []))
    while len(aulas) + 1 > n:  # junta as atividades práticas em excesso
        foco, ms = aulas.pop()
        aulas[-1] = (aulas[-1][0] if len(aulas) > 1 else 'Apresentação e atividade prática', aulas[-1][1] + ms)
    aulas.append(fecho)
    return aulas


def distribuir(habs, n):
    """Distribui as habilidades do bimestre em n semanas: [[(hab, foco, mats, k, total)]]."""
    k = len(habs)
    if not k:
        return [[] for _ in range(n)]
    if k <= n:
        out = []
        for i, h in enumerate(habs):
            q = n // k + (1 if i < n % k else 0)
            for j, (foco, ms) in enumerate(roteiro(h, q)):
                out.append([(h, foco, ms, j + 1, q)])
        return out
    out, i = [], 0
    for s in range(n):
        q = k // n + (1 if s < k % n else 0)
        out.append([(h, 'Aula compartilhada com a habilidade ao lado' if q > 1 else 'Aula única: apresentação, prática e exercícios',
                     h['materiais'], 1, 1) for h in habs[i:i + q]])
        i += q
    return out


def plano_ano(habs, sem):
    """Atribui conteúdo a cada semana do ano."""
    linhas = []
    for b in range(1, 5):
        ss = [s for s in sem if s['bim'] == b]
        especiais = {}
        if b == 1:
            especiais[0] = ('Acolhida e diagnóstico', 'Apresentação da disciplina, combinados da turma e atividade diagnóstica.')
        especiais[len(ss) - 1 if b < 4 else len(ss) - 2] = (f'Revisão e avaliação do {b}º bimestre', 'Retomada das habilidades do bimestre, avaliação e recuperação paralela. Também absorve aulas perdidas em feriados.')
        if b == 4:
            especiais[len(ss) - 1] = ('Recuperação e encerramento do ano', 'Recuperação final, devolutivas e fechamento do ano letivo.')
        livres = [i for i in range(len(ss)) if i not in especiais]
        hb = [h for h in habs if h['bimestre'] == b]
        dist = distribuir(hb, len(livres))
        for i, s in enumerate(ss):
            if i in especiais:
                linhas.append((s, None, especiais[i]))
            else:
                linhas.append((s, dist[livres.index(i)], None))
    return linhas


CSS = """
@page { size: A4 landscape; margin: 13mm 12mm 14mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Lexend', sans-serif; font-weight: 300; color: #111; font-size: 8.6pt; line-height: 1.38; }
h1, h2, .disp { font-family: 'Sniglet', sans-serif; font-weight: 800; letter-spacing: .02em; text-transform: uppercase; }
a { color: inherit; }
.capa { height: 181mm; display: flex; flex-direction: column; page-break-after: always; }
.kicker { font-weight: 600; letter-spacing: .14em; text-transform: uppercase; font-size: 8.5pt; }
.capa h1 { font-size: 36pt; line-height: 1.02; margin: 12mm 0 4mm; }
.marca { background: #fff36b; border-radius: 8px; padding: 0 6px; }
.sub { font-size: 11pt; font-weight: 400; max-width: 235mm; margin: 0; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin-top: 9mm; }
.card { border: 1.5px solid #111; border-radius: 14px; padding: 4mm; font-size: 8.3pt; }
.card h3 { font-family: 'Sniglet', sans-serif; font-weight: 800; text-transform: uppercase; font-size: 9pt; margin: 0 0 2mm; letter-spacing: .04em; }
.card ul { margin: 0; padding-left: 4mm; }
.card li { margin-bottom: 1mm; }
.assina { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; }
.assina .disp { font-size: 13pt; }
.cal { page-break-after: always; }
.topo { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 3px solid #111; padding-bottom: 2mm; margin-bottom: 4mm; }
.topo h2 { font-size: 22pt; margin: 0; line-height: 1; padding-top: 3mm; }
.topo .dir { text-align: right; font-size: 8.5pt; }
table { width: 100%; border-collapse: collapse; }
thead th { background: #111; color: #fff; text-align: left; font-weight: 500; padding: 1.6mm 2mm; font-size: 8pt; }
td { padding: 1.8mm 2mm; border-bottom: 1px solid #d9d9d6; vertical-align: top; }
tr { break-inside: avoid; }
.resumo td:first-child { font-weight: 600; }
.resumo td.n { text-align: center; font-weight: 600; }
.mes { margin-top: 5mm; }
.pill { break-after: avoid; }
.mes:first-of-type { margin-top: 0; }
.pill { display: inline-flex; align-items: baseline; gap: 3mm; border: 1.5px solid #111; border-radius: 999px; padding: 1.2mm 5mm; background: #e3f1e8; margin-bottom: 2mm; }
.pill .disp { font-size: 11pt; }
.pill span { font-size: 8.3pt; font-weight: 400; }
.sem { width: 27mm; }
.sem b { display: block; font-weight: 600; }
.fer { display: block; margin-top: 1mm; font-size: 7.4pt; font-weight: 500; color: #8a1328; }
.cod { font-family: 'DejaVu Sans Mono', monospace; font-weight: 700; font-size: 8pt; }
.hab + .hab { margin-top: 2mm; padding-top: 2mm; border-top: 1px dashed #d9d9d6; }
.foco { width: 44mm; }
.foco b { display: block; font-weight: 600; }
.foco small { color: #4a4a4a; }
.mats { width: 66mm; }
.chip { display: block; border: 1px solid #111; border-radius: 6px; padding: .6mm 1.6mm; margin-bottom: 1mm; font-size: 7.6pt; text-decoration: none; }
.obs { width: 30mm; }
.esp td { background: #f4f4f2; }
.esp .tit { font-weight: 600; }
.recesso td { background: #fff9c4; font-weight: 500; text-align: center; }
.ano { page-break-before: always; }
.nota { font-size: 7.8pt; color: #4a4a4a; margin-top: 3mm; }
"""

RODAPE = 'Júlia Roberta Quoos Alves · ohtopico.com.br'


def chips(ms):
    ms = list({m['u']: m for m in ms}.values())
    return ''.join(f'<a class="chip" href="{e(m["u"])}">{e(m["t"])}</a>' for m in ms) or '<small>Livro didático ou material próprio</small>'


def html_comp(comp, dados):
    c = COMP[comp]
    sem = semanas()
    total = len(sem)
    meses = []
    for s in sem:
        if not meses or meses[-1][0] != s['seg'].month:
            meses.append((s['seg'].month, []))
        meses[-1][1].append(s)
    p = []
    p.append(f"""<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8">
<title>Planejamento anual de {c['nome']} por meses · {ANO}</title>
<meta name="author" content="Júlia Roberta Quoos Alves">
<link href="https://fonts.googleapis.com/css2?family=Sniglet:wght@400;800&family=Lexend:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>""")
    # ------------------------------------------------------------ capa
    habs_n = len(dados)
    p.append(f"""<section class="capa">
<div class="kicker">ohtopico · material didático</div>
<h1>Planejamento anual<br>de <span class="marca">{e(c['nome'])}</span> por meses</h1>
<p class="sub">6º ao 9º ano do Ensino Fundamental · {habs_n} habilidades da BNCC distribuídas semana a semana, com 1 aula por semana por turma, de março a meados de dezembro de {ANO}.</p>
<div class="cards">
<div class="card"><h3>Como usar</h3><ul>
<li>Cada ano tem uma tabela por mês. Cada linha é uma semana, ou seja, uma aula da turma.</li>
<li>As habilidades seguem os mesmos bimestres da versão por bimestres.</li>
<li>Se a aula cair em feriado, passe o conteúdo para a semana seguinte. A semana de revisão do bimestre absorve o atraso.</li></ul></div>
<div class="card"><h3>Calendário considerado</h3><ul>
<li>Início em {d(INICIO)} e término em {d(FIM)}/{ANO}, {total} semanas letivas.</li>
<li>{RECESSO[2]} de {d(RECESSO[0])} a {d(RECESSO[1])}.</li>
<li>Bimestres: {d(BIMESTRES[0])}, {d(BIMESTRES[1])}, {d(BIMESTRES[2])} e {d(BIMESTRES[3])}.</li>
<li>Confira o calendário oficial da sua rede ou escola e ajuste as datas.</li></ul></div>
<div class="card"><h3>Feriados sem aula</h3><ul>
{''.join(f'<li>{d(f)} ({DIAS[f.weekday()]}) · {e(n)}</li>' for f, n in FERIADOS)}
<li>{FERIADOS_SABADO}.</li></ul></div>
<div class="card"><h3>Fonte</h3><p style="margin:0 0 2mm">{e(c['fonte'])}</p><p style="margin:0">Os materiais citados são gratuitos e cada um é um link clicável no PDF.</p></div>
</div>
<div class="assina"><div><div class="disp">Júlia Roberta Quoos Alves</div>ohtopico.com.br/material-didatico · contato@ohtopico.com.br</div>
<div>Uso livre em sala de aula, com citação da fonte.</div></div>
</section>""")
    # ------------------------------------------------------------ calendário
    linhas = []
    for m, ss in meses:
        bims = sorted({s['bim'] for s in ss})
        fer = [f'{d(f)} ({DIAS[f.weekday()]})' for s in ss for f, _ in s['fer']]
        obs = ''
        if m == 7:
            obs = f'{RECESSO[2]}: {d(RECESSO[0])} a {d(RECESSO[1])}'
        linhas.append(f"<tr><td>{MESES[m]}</td><td class='n'>{len(ss)}</td><td>{d(ss[0]['seg'])} a {d(ss[-1]['sex'])}</td>"
                      f"<td>{' e '.join(f'{b}º' for b in bims)}</td><td>{', '.join(fer) or '–'}</td><td>{obs}</td></tr>")
    cont = [sum(1 for f, _ in FERIADOS if f.weekday() == i) for i in range(5)]
    nomes = ['segunda', 'terça', 'quarta', 'quinta', 'sexta']
    perdas = ', '.join(f'{nomes[i]} {cont[i]}' for i in range(5))
    por_bim = [sum(1 for s in sem if s['bim'] == b) for b in range(1, 5)]
    p.append(f"""<section class="cal">
<div class="topo"><h2>Calendário de {ANO}</h2><div class="dir">{total} semanas letivas · 1 aula por semana por turma<br>{RODAPE}</div></div>
<table class="resumo"><thead><tr><th>Mês</th><th style="text-align:center">Aulas por turma</th><th>Semanas</th><th>Bimestre</th><th>Feriados em dia de semana</th><th>Observação</th></tr></thead>
<tbody>{''.join(linhas)}<tr><td>Total</td><td class='n'>{total}</td><td colspan="4">Semanas por bimestre: {', '.join(f'{b + 1}º = {n}' for b, n in enumerate(por_bim))}</td></tr></tbody></table>
<p class="nota">Cada feriado em dia de semana tira uma aula apenas das turmas que têm aula naquele dia. Em {ANO}, as aulas perdidas por dia da semana são: {perdas}.
Por isso cada bimestre termina com uma semana de revisão e avaliação, que serve de folga para recuperar o conteúdo.
A primeira semana do ano é de acolhida e diagnóstico, e a última de recuperação e encerramento.</p>
</section>""")
    # ------------------------------------------------------------ anos
    for ano in (6, 7, 8, 9):
        habs = [h for h in dados if h['ano'] == ano]
        plano = plano_ano(habs, sem)
        p.append(f"""<section class="ano"><div class="topo"><h2>{ano}º ano · {e(c['nome'])}</h2>
<div class="dir">Planejamento por meses · {len(habs)} habilidades em {total} aulas<br>{RODAPE}</div></div>""")
        for m, ss in meses:
            bims = sorted({s['bim'] for s in ss})
            p.append(f"""<div class="mes"><div class="pill"><span class="disp">{MESES[m]}</span><span>{len(ss)} aulas · {' e '.join(f'{b}º' for b in bims)} bimestre</span></div>
<table><thead><tr><th>Semana</th><th>Habilidade da BNCC</th><th>Foco da aula</th><th>Materiais do ohtopico</th><th>Observações</th></tr></thead><tbody>""")
            for s, itens, esp in plano:
                if s['seg'].month != m:
                    continue
                n = sem.index(s) + 1
                fer = ''.join(f'<span class="fer">Feriado {DIAS[f.weekday()]} {d(f)}: {e(nm)}</span>' for f, nm in s['fer'])
                semc = f'<td class="sem"><b>Aula {n}</b>{d(s["seg"])} a {d(s["sex"])}{fer}</td>'
                if m == 7 and s['seg'] > RECESSO[1] and sem[n - 2]['seg'] < RECESSO[0]:
                    p.append(f'<tr class="recesso"><td colspan="5">{RECESSO[2]}: {d(RECESSO[0])} a {d(RECESSO[1])}</td></tr>')
                if s['bim'] > 1 and s['seg'] == BIMESTRES[s['bim'] - 1]:
                    p.append(f'<tr class="recesso"><td colspan="5">Início do {s["bim"]}º bimestre</td></tr>')
                if esp:
                    p.append(f'<tr class="esp">{semc}<td colspan="2"><span class="tit">{e(esp[0])}</span><br>{e(esp[1])}</td><td class="mats"></td><td class="obs"></td></tr>')
                    continue
                hab = ''.join(f'<div class="hab"><span class="cod">{h["codigo"]}</span> '
                              + (e(h['texto']) if k == 1 else f'<small>continuação · {e(h["objeto"])}</small>') + '</div>'
                              for h, _, _, k, _ in itens)
                h, foco, ms, k, q = itens[0]
                if len(itens) > 1:
                    foco_html = f'<b>{len(itens)} habilidades na mesma aula</b><small>Trabalhe as duas a partir de um problema comum.</small>'
                    ms = [m2 for it in itens for m2 in it[2]]
                else:
                    foco_html = f'<b>{e(foco)}</b><small>{"Aula " + str(k) + " de " + str(q) + " desta habilidade" if q > 1 else "Uma aula para esta habilidade"}</small>'
                p.append(f'<tr>{semc}<td>{hab}</td><td class="foco">{foco_html}</td><td class="mats">{chips(ms)}</td><td class="obs"></td></tr>')
            p.append('</tbody></table></div>')
        p.append('</section>')
    p.append('</body></html>')
    return ''.join(p)


def main():
    os.makedirs(SAIDA, exist_ok=True)
    dados = json.load(open(os.path.join(AQUI, 'habilidades.json'), encoding='utf-8'))
    for comp, c in COMP.items():
        caminho = os.path.join(SAIDA, f"planejamento-mensal-{c['arquivo']}.html")
        with open(caminho, 'w', encoding='utf-8') as f:
            f.write(html_comp(comp, dados[comp]))
        print(caminho)


if __name__ == '__main__':
    main()
