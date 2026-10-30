"""Treine a Máquina desplugado: PDF A4 para imprimir (plano Educador na prática da área premium).

Guia do professor, 24 cartões de fruta para recortar, gráfico para marcar os exemplos, ficha da turma e gabarito.
Os cartões usam a mesma regra do jogo: a máquina vê a cor medida e a luz da foto e decide pelos 3 vizinhos.

Uso (na raiz do repositório; precisa do Node com Playwright):
    python3 _fonte/premium/editaveis/desplugado_pdf.py --fontes CAMINHO/fontes --saida _privado/premium/arquivos/pdf
--fontes é a pasta com Lexend-400.ttf, Lexend-600.ttf e Sniglet-800.ttf.
Autora: Júlia Roberta Quoos Alves.
"""
import argparse
import os
import random
import subprocess
import tempfile

AUTORA = 'Júlia Roberta Quoos Alves'
VERDE, AMARELO, LARANJA = (74, 150, 52), (240, 196, 46), (226, 112, 38)


def fruta(r, c, luz):
    x = round(10 * c * (0.45 + 0.55 * luz)); y = round(10 * luz)
    return dict(c=c, luz=luz, x=x, y=y, madura=c > 0.5, forma=r.randrange(3), giro=r.randint(-20, 20))


def lote(r, n, luz_min, luz_max, c_min=0.08, c_max=0.92):
    out = []
    while len(out) < n:
        c = r.uniform(c_min, c_max)
        if abs(c - 0.5) < 0.08:
            continue
        out.append(fruta(r, c, r.uniform(luz_min, luz_max)))
    return out


def prever(treino, f):
    viz = sorted(treino, key=lambda t: (t['x'] - f['x']) ** 2 + (t['y'] - f['y']) ** 2)[:3]
    return sum(v['madura'] for v in viz) >= 2


def montar():
    """Procura um sorteio em que a máquina treinada só de dia erre à noite e acerte depois dos extras."""
    for semente in range(1, 5000):
        r = random.Random(semente)
        treino = lote(r, 6, 0.8, 1, 0.08, 0.45) + lote(r, 6, 0.8, 1, 0.55, 0.92)
        teste = lote(r, 4, 0.8, 1) + lote(r, 2, 0.05, 0.25, 0.6, 0.9) + lote(r, 2, 0.05, 0.25, 0.1, 0.4)
        extras = lote(r, 2, 0.05, 0.3, 0.6, 0.92) + lote(r, 2, 0.05, 0.3, 0.1, 0.4)
        pontos = {(f['x'], f['y']) for f in treino + extras}
        if len(pontos) < len(treino + extras):
            continue  # dois cartões no mesmo ponto confundem a marcação
        antes = [prever(treino, f) == f['madura'] for f in teste]
        depois = [prever(treino + extras, f) == f['madura'] for f in teste]
        if all(antes[:4]) and sum(antes[4:6]) == 0 and all(depois):
            return semente, treino, teste, extras, antes
    raise SystemExit('sem sorteio bom')


def cor(c, luz):
    mix = lambda a, b, k: [v + (w - v) * k for v, w in zip(a, b)]
    rgb = mix(VERDE, AMARELO, c / 0.6) if c < 0.6 else mix(AMARELO, LARANJA, (c - 0.6) / 0.4)
    k = 0.35 + 0.65 * luz
    return 'rgb(' + ','.join(str(round(v * k)) for v in rgb) + ')'


def svg_fruta(f):
    fundo = round(40 + 205 * f['luz'])
    corpos = ['<ellipse cx="50" cy="56" rx="30" ry="32"/>',
              '<path d="M50 24 C74 24 82 48 78 66 C74 84 60 90 50 90 C40 90 26 84 22 66 C18 48 26 24 50 24 Z"/>',
              '<circle cx="50" cy="58" r="30"/>']
    return (f'<svg viewBox="0 0 100 100"><rect width="100" height="100" rx="8" fill="rgb({fundo},{fundo},{round(fundo * .96)})"/>'
            f'<g transform="rotate({f["giro"]} 50 56)"><g fill="{cor(f["c"], f["luz"])}" stroke="#111" stroke-width="2.5">{corpos[f["forma"]]}</g>'
            f'<path d="M50 26 L52 14" stroke="#111" stroke-width="3"/><path d="M52 18 C60 10 70 12 72 16 C64 22 56 22 52 18 Z" fill="{cor(.1, f["luz"])}" stroke="#111" stroke-width="2"/></g></svg>')


def cartao(n, f, tipo):
    rot = {'treino': ('Treino', 'Madura' if f['madura'] else 'Verde'), 'teste': ('Teste', '?'),
           'extra': ('Extra · noite', 'Madura' if f['madura'] else 'Verde')}[tipo]
    return (f'<div class="cartao {tipo}"><div class="topo"><b>{n:02d}</b><span>{rot[0]}</span></div>{svg_fruta(f)}'
            f'<div class="dados">Cor medida <b>{f["x"]}</b> · Luz <b>{f["y"]}</b></div><div class="rotulo">Rótulo: <b>{rot[1]}</b></div></div>')


def grade():
    s, m = 36, 40
    linhas = ''.join(f'<line x1="{m}" y1="{m + i * s}" x2="{m + 10 * s}" y2="{m + i * s}"/><line x1="{m + i * s}" y1="{m}" x2="{m + i * s}" y2="{m + 10 * s}"/>' for i in range(11))
    nums = ''.join(f'<text x="{m + i * s}" y="{m + 10 * s + 18}" text-anchor="middle">{i}</text><text x="{m - 10}" y="{m + (10 - i) * s + 5}" text-anchor="end">{i}</text>' for i in range(11))
    return (f'<svg viewBox="0 0 {2 * m + 10 * s} {2 * m + 10 * s + 20}" class="grade"><g stroke="#bbb" stroke-width="1">{linhas}</g>'
            f'<g font-size="13" fill="#111">{nums}</g><text x="{m + 5 * s}" y="{2 * m + 10 * s + 14}" text-anchor="middle" font-size="14">cor medida na foto →</text>'
            f'<text x="12" y="{m + 5 * s}" text-anchor="middle" font-size="14" transform="rotate(-90 12 {m + 5 * s})">luz da foto →</text></svg>')


CSS = """
@page { size: A4; margin: 14mm; }
@font-face { font-family: 'Lexend'; font-weight: 400; src: url('file://FONTES/Lexend-400.ttf'); }
@font-face { font-family: 'Lexend'; font-weight: 600; src: url('file://FONTES/Lexend-600.ttf'); }
@font-face { font-family: 'Sniglet'; font-weight: 800; src: url('file://FONTES/Sniglet-800.ttf'); }
body { font-family: 'Lexend', sans-serif; color: #111; font-size: 10.5pt; line-height: 1.45; margin: 0; }
h1, h2 { font-family: 'Sniglet', sans-serif; font-weight: 800; text-transform: uppercase; letter-spacing: .02em; margin: 0 0 3mm; }
h1 { font-size: 26pt; line-height: 1.05; } h2 { font-size: 15pt; margin-top: 5mm; }
.pag { page-break-after: always; } .pag:last-child { page-break-after: auto; }
.kicker { font-weight: 600; letter-spacing: .12em; text-transform: uppercase; font-size: 8.5pt; }
mark { background: #fff36b; padding: 0 4px; border-radius: 4px; }
.box { border: 1.5px solid #111; border-radius: 12px; padding: 3mm 4mm; margin: 3mm 0; }
.box.v { background: #e3f4e8; } .box.a { background: #fff9c4; }
ol, ul { margin: 1mm 0; padding-left: 6mm; } li { margin-bottom: 1.2mm; }
table { border-collapse: collapse; width: 100%; font-size: 10pt; }
td, th { border: 1px solid #111; padding: 2mm; text-align: center; } th { background: #f4f4f2; }
.cartoes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
.cartao { border: 1px dashed #777; padding: 2.5mm; text-align: center; font-size: 9pt; break-inside: avoid; }
.cartao .topo { display: flex; justify-content: space-between; font-size: 8.5pt; }
.cartao .topo b { font-family: 'Sniglet', sans-serif; font-size: 12pt; }
.cartao svg { width: 30mm; height: 30mm; display: block; margin: 1mm auto; }
.cartao .rotulo { border-top: 1px solid #ccc; margin-top: 1mm; padding-top: 1mm; }
.cartao.extra .topo span { background: #fbe6ea; padding: 0 4px; border-radius: 4px; }
.cartao.teste .topo span { background: #fff36b; padding: 0 4px; border-radius: 4px; }
.grade { width: 150mm; display: block; margin: 2mm auto; }
.rodape { font-size: 8pt; color: #444; margin-top: 4mm; }
.linhas div { border-bottom: 1px solid #999; height: 8mm; }
"""


def html(treino, teste, extras, antes, fontes):
    n = 1; cartoes = []
    for tipo, grupo in (('treino', treino), ('teste', teste), ('extra', extras)):
        for f in grupo:
            cartoes.append(cartao(n, f, tipo)); f['n'] = n; n += 1
    rod = f'<p class="rodape">{AUTORA} · ohtopico.com.br · Treine a Máquina desplugado · Material exclusivo para apoiadores do Catarse. Uso livre em sala de aula, com citação da fonte.</p>'
    linhas_teste = ''.join(f'<tr><td>{f["n"]:02d}</td><td></td><td></td><td></td></tr>' for f in teste)
    gab = ''.join(f'<tr><td>{f["n"]:02d}</td><td>{f["x"]} / {f["y"]}</td><td>{"Madura" if prever(treino, f) else "Verde"}</td>'
                  f'<td>{"Madura" if f["madura"] else "Verde"}</td><td>{"acertou" if a else "<b>errou</b>"}</td>'
                  f'<td>{"Madura" if prever(treino + extras, f) else "Verde"}</td></tr>' for f, a in zip(teste, antes))
    return f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Treine a Máquina desplugado</title>
<meta name="author" content="{AUTORA}"><style>{CSS.replace('FONTES', fontes)}</style></head><body>
<section class="pag">
<div class="kicker">ohtopico · área premium · Educador na prática</div>
<h1>Treine a Máquina<br><mark>desplugado</mark></h1>
<p>Uma aula de 50 minutos, sem computador, para o 8º e o 9º ano. A turma faz o papel de uma inteligência artificial que olha a foto de uma fruta e decide se ela está madura ou verde. BNCC: EF09CO07 e EF08CO11.</p>
<div class="box v"><b>Como a "máquina" decide.</b> Cada cartão tem dois números: a <b>cor medida</b> na foto (0 = bem verde, 10 = bem laranja) e a <b>luz da foto</b> (0 = noite, 10 = dia claro). Os cartões de treino viram pontos no gráfico. Para um cartão novo, a turma marca o ponto, acha os <b>3 pontos de treino mais próximos</b> e segue a maioria. Esse método é real e se chama k vizinhos mais próximos.</div>
<h2>Material</h2>
<ul><li>Uma cópia das páginas de cartões por grupo de 4 estudantes, recortada antes da aula.</li>
<li>Uma cópia do gráfico e da ficha por grupo. Lápis de duas cores (ou bolinha e quadradinho).</li></ul>
<h2>Passo a passo</h2>
<ol><li><b>Treino (10 min).</b> Os grupos marcam os 12 cartões de treino (01 a 12) no gráfico: bolinha para madura, quadradinho para verde.</li>
<li><b>Teste (15 min).</b> Para cada cartão de teste (13 a 20), marcam o ponto com um X, acham os 3 vizinhos mais próximos e anotam a previsão na ficha. Depois a professora revela o rótulo certo.</li>
<li><b>A descoberta (10 min).</b> A máquina acerta as fotos de dia e erra fotos noturnas. Pergunta para a turma: por quê? Resposta esperada: nenhum exemplo de treino era de noite, e à noite a fruta madura parece mais escura.</li>
<li><b>O conserto (10 min).</b> Os grupos acrescentam os 4 cartões extras noturnos (21 a 24) ao treino e refazem as previsões dos cartões noturnos.</li>
<li><b>Fechamento (5 min).</b> Cada estudante escreve na ficha uma regra para quem vai treinar uma IA.</li></ol>
<div class="box a"><b>Ligação com o mundo real.</b> Sistemas de reconhecimento facial já erraram mais com alguns grupos de pessoas porque tinham poucas fotos deles no treino. O problema não estava na "inteligência" da máquina, e sim nos dados que faltavam.</div>
{rod}</section>
<section class="pag"><h2>Cartões para recortar</h2><div class="cartoes">{"".join(cartoes[:16])}</div>{rod}</section>
<section class="pag"><h2>Cartões para recortar (continuação)</h2><div class="cartoes">{"".join(cartoes[16:])}</div>
<h2>Gráfico da máquina</h2><p>Marque os cartões de treino: <b>●</b> madura, <b>■</b> verde. Marque os cartões de teste com <b>X</b>.</p>{grade()}{rod}</section>
<section class="pag"><h2>Ficha do grupo</h2><p>Grupo: ______________________________________________</p>
<table><tr><th>Cartão</th><th>3 vizinhos mais próximos (números)</th><th>Previsão da máquina</th><th>Rótulo certo</th></tr>{linhas_teste}</table>
<h2>Para pensar</h2>
<ol><li>Em quais cartões a máquina errou? O que eles têm em comum?</li><li>O que mudou quando vocês acrescentaram os cartões extras?</li>
<li>Pensem em um aplicativo de verdade. Quem pode ter ficado de fora dos dados de treino dele?</li><li>Escreva uma regra para quem vai treinar uma IA.</li></ol>
<div class="linhas"><div></div><div></div><div></div><div></div><div></div><div></div></div>{rod}</section>
<section class="pag"><h2>Gabarito do professor</h2><p>Previsões com os 12 cartões de treino e depois de acrescentar os 4 extras noturnos. Empates de distância podem mudar um vizinho; aceite a previsão quando o grupo justificar bem.</p>
<table><tr><th>Cartão</th><th>Cor / luz</th><th>Previsão só com treino de dia</th><th>Rótulo certo</th><th>Resultado</th><th>Previsão com os extras</th></tr>{gab}</table>
<p style="margin-top:4mm">Cartões 13 a 16 são fotos de dia, e cartões 17 a 20, fotos à noite.</p>{rod}</section>
</body></html>'''


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--fontes', required=True); ap.add_argument('--saida', default='_privado/premium/arquivos/pdf')
    a = ap.parse_args()
    semente, treino, teste, extras, antes = montar()
    os.makedirs(a.saida, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        fonte = os.path.join(tmp, 'desplugado.html')
        open(fonte, 'w', encoding='utf-8').write(html(treino, teste, extras, antes, os.path.abspath(a.fontes)))
        pdf = os.path.abspath(os.path.join(a.saida, 'treine-a-maquina-desplugado.pdf'))
        js = ("const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();"
              f"await p.goto('file://{fonte}');await p.evaluate(()=>document.fonts.ready);"
              f"await p.pdf({{path:'{pdf}',format:'A4',printBackground:true,tagged:true}});await b.close();}})();")
        open(os.path.join(tmp, 'pdf.js'), 'w').write(js)
        subprocess.run(['node', os.path.join(tmp, 'pdf.js')], check=True)
    print('ok', pdf, '· sorteio', semente)


if __name__ == '__main__':
    main()
