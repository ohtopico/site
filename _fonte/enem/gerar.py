"""Gera o banco de perguntas da Ilha ENEM (mundo/enem/banco.js) a partir dos cartões dos baralhos Anki.

Uso (na raiz do repositório):
    python _fonte/enem/gerar.py

Os cartões ficam em _fonte/enem/cards/ (um arquivo por área, mais um arquivo "b" de atividades).
Formato de cada linha (o mesmo do gerador dos baralhos):
    frente || verso                      pergunta simples (conceito e explicação)
    R: termo || definição                mão dupla (tratado como pergunta simples)
    +: frente || macete || [img:nome]    macete da pergunta simples de mesma frente (vira dica na correção)
    D: pergunta || resposta || explicação
    C: texto com {{c1::lacuna}}
    V: afirmação || **Certo.**/**Errado.** explicação
    F: [img:nome] pergunta || resposta
As figuras saem de _fonte/enem/img/ e são copiadas para mundo/enem/img/ (só as usadas).
"""
import html, json, re, shutil
from pathlib import Path

RAIZ = Path(__file__).resolve().parents[2]
AQUI = Path(__file__).resolve().parent
CARDS, IMG = AQUI / 'cards', AQUI / 'img'
SAIDA = RAIZ / 'mundo' / 'enem'

AREAS = [  # id, prefixo dos arquivos, nome, ícone
    ('bio', '01', 'Biologia', '🧬'), ('qui', '02', 'Química', '⚗️'), ('fis', '03', 'Física', '⚡'),
    ('mat', '04', 'Matemática', '📐'), ('red', '05', 'Redação', '✍️'), ('ling', '06', 'Linguagens', '📚'),
    ('hum', '07', 'Humanas', '🌎'),
]
usadas = set()


def fmt(s):
    s = html.escape(s.strip(), quote=False)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    return s.replace('\\n', '<br>')


def tira_img(s):
    """Separa as marcações [img:nome] do texto. Devolve (texto, nome ou '')."""
    nomes = re.findall(r'\[img:([^\]]+)\]', s)
    for n in nomes:
        if not (IMG / (n.strip() + '.png')).exists():
            raise SystemExit(f'figura inexistente: {n}')
        usadas.add(n.strip())
    return re.sub(r'\s*\[img:[^\]]+\]\s*', ' ', s).strip(), (nomes[0].strip() if nomes else '')


def ler(area_pref):
    cards, macetes = [], {}
    for arq in sorted(CARDS.glob(area_pref + '*.txt')):
        topico = ''
        for linha in arq.read_text(encoding='utf-8').splitlines():
            linha = linha.strip()
            if not linha or linha.startswith('# '):
                continue
            if linha.startswith('## '):
                topico = linha[3:].strip(); continue
            m = re.match(r'^([+A-Z]): ', linha)
            tipo = m.group(1) if m else ''
            if m:
                linha = linha[m.end():]
            partes = [p.strip() for p in linha.split('||')]
            if tipo == '+':
                txt, img = tira_img(' '.join(partes[1:]))
                macetes[partes[0]] = {'m': fmt(txt), 'img': img}
            elif tipo in ('', 'R'):
                cards.append({'t': 'R' if tipo == 'R' else 'P', 'top': topico, 'f': fmt(partes[0]), 'v': fmt(partes[1]), 'k': partes[0]})
            elif tipo == 'D':
                cards.append({'t': 'D', 'top': topico, 'f': fmt(partes[0]), 'v': fmt(partes[1]),
                              'x': fmt(partes[2]) if len(partes) > 2 else ''})
            elif tipo == 'C':
                lac = [(int(n), r) for n, r in re.findall(r'\{\{c(\d+)::([^}]*?)\}\}', partes[0])]
                cards.append({'t': 'C', 'top': topico, 'f': fmt(re.sub(r'\{\{c(\d+)::([^}]*?)\}\}', r'⟦\1⟧', partes[0])),
                              'l': {str(n): fmt(r) for n, r in lac}})
            elif tipo == 'V':
                verso = partes[1]
                cards.append({'t': 'V', 'top': topico, 'f': fmt(partes[0]), 'ok': verso.startswith('**Certo'),
                              'x': fmt(re.sub(r'^\*\*(Certo|Errado)\.\*\*\s*', '', verso))})
            elif tipo == 'F':
                frente, img = tira_img(partes[0])
                cards.append({'t': 'F', 'top': topico, 'f': fmt(frente), 'v': fmt(partes[1]), 'img': img})
    for c in cards:  # o macete vira dica na correção da pergunta simples de mesma frente
        if c['t'] in ('P', 'R'):
            k = c.pop('k')
            mac = macetes.get(k) or next((v for mk, v in macetes.items() if k.startswith(mk) or mk.startswith(k)), None)
            if mac:
                c['m'] = mac['m']
                if mac['img']:
                    c['img'] = mac['img']
    return cards


def main():
    banco = []
    for aid, pref, nome, ic in AREAS:
        cards = ler(pref)
        for i, c in enumerate(cards):
            c['id'] = f'{aid}{i}'
        banco.append({'id': aid, 'nome': nome, 'ic': ic, 'cards': cards})
        print(f'{nome}: {len(cards)} cartões')
    (SAIDA / 'img').mkdir(parents=True, exist_ok=True)
    for n in sorted(usadas):
        shutil.copyfile(IMG / (n + '.png'), SAIDA / 'img' / (n + '.png'))
    js = ('/* gerado por _fonte/enem/gerar.py a partir de _fonte/enem/cards: não edite à mão */\n'
          'window.ENEM_BANCO = ' + json.dumps(banco, ensure_ascii=False, separators=(',', ':')) + ';\n')
    (SAIDA / 'banco.js').write_text(js, encoding='utf-8')
    print(f'{sum(len(a["cards"]) for a in banco)} cartões, {len(usadas)} figuras → mundo/enem/banco.js')
    perguntas_ilha(banco)


def texto(s):
    """HTML simples → texto (os botões de resposta do Mundo mostram texto puro)."""
    return html.unescape(re.sub(r'<br>', ' ', re.sub(r'<(?!br)[^>]+>', '', s))).strip()


def perguntas_ilha(banco, por_area=60):
    """Perguntas de múltipla escolha para os moradores da Ilha ENEM dentro do Mundo (mundo/enem/ilha-perguntas.js).
    Sorteio com semente fixa: as perguntas são sempre as mesmas e o progresso de cada uma fica salvo no Mundo."""
    import random
    saida = {}
    for a in banco:
        rnd = random.Random('ilha-' + a['id'])
        cards, lista = a['cards'], []
        def alts(certa, candidatos):
            vistos, out = {certa.lower()}, [certa]
            for c in candidatos:
                if c and c.lower() not in vistos and len(out) < 4:
                    vistos.add(c.lower()); out.append(c)
            rnd.shuffle(out)
            return out, out.index(certa)
        def mesmo_topico(c, tipos):
            outros = [o for o in cards if o is not c and o['t'] in tipos]
            rnd.shuffle(outros)
            return sorted(outros, key=lambda o: o['top'] != c['top'])
        for c in cards:
            if c['t'] == 'V':
                q = {'enun': 'Certo ou errado? ' + c['f'], 'alts': ['Certo', 'Errado'], 'certa': 0 if c['ok'] else 1, 'coment': c['x']}
            elif c['t'] == 'D':
                al, k = alts(texto(c['v']), [texto(o['v']) for o in mesmo_topico(c, ('D',))])
                if len(al) < 3: continue
                q = {'enun': c['f'], 'alts': al, 'certa': k, 'coment': c.get('x', '')}
            elif c['t'] == 'C':
                n = sorted(c['l'])[0]
                certa = texto(c['l'][n])
                enun = re.sub(r'⟦(\d+)⟧', lambda m: '_____' if m.group(1) == n else c['l'][m.group(1)], c['f'])
                cand = [texto(r) for o in mesmo_topico(c, ('C',)) for r in o['l'].values()]
                num = bool(re.search(r'\d', certa))
                cand = [r for r in cand if bool(re.search(r'\d', r)) == num] + cand
                al, k = alts(certa, cand)
                q = {'enun': 'Complete: ' + enun, 'alts': al, 'certa': k, 'coment': re.sub(r'⟦(\d+)⟧', lambda m: '<b>' + c['l'][m.group(1)] + '</b>', c['f'])}
            elif c['t'] in ('P', 'R'):
                tam = len(texto(c['v']))
                cand = sorted(mesmo_topico(c, (c['t'],)), key=lambda o: (o['top'] != c['top'], abs(len(texto(o['v'])) - tam) > tam))
                al, k = alts(texto(c['v']), [texto(o['v']) for o in cand])
                if len(al) < 3: continue
                q = {'enun': f'Qual alternativa explica <b>{c["f"].rstrip("?")}</b>?', 'alts': al, 'certa': k, 'coment': ('💡 ' + c['m']) if c.get('m') else ''}
            else:
                continue
            lista.append(q)
        rnd.shuffle(lista)
        saida[a['id']] = {'tema': a['nome'], 'ic': a['ic'], 'lista': lista[:por_area]}
    js = ('/* gerado por _fonte/enem/gerar.py: perguntas dos moradores da Ilha ENEM no Mundo. Não edite à mão. */\n'
          'window.ENEM_ILHA_PERGUNTAS = ' + json.dumps(saida, ensure_ascii=False, separators=(',', ':')) + ';\n')
    (SAIDA / 'ilha-perguntas.js').write_text(js, encoding='utf-8')
    print(f'{sum(len(v["lista"]) for v in saida.values())} perguntas → mundo/enem/ilha-perguntas.js')


if __name__ == '__main__':
    main()
