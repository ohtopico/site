"""Tema favorito do aluno: troca as figuras de contar e as palavras que falam delas.

O professor escolhe o tema no topo da ficha (fichas.js carrega assets/temas.js, gerado daqui).
Só mudam o desenho e o nome do objeto: os números, as versões A/B/C e o gabarito continuam iguais.
Cada palavra nova tem o mesmo gênero da original (maçã → pegada, peixe → dinossauro), para os artigos
("uma", "os") continuarem certos. Os desenhos seguem o padrão das fichas: traço preto e preenchimento
claro, caixa de 40 × 40, para a folha sair branca na impressora.
"""
import json
import math

from desenhos import CLARO, TRACO

AZUL = '#dbeafe'
CINZA = '#ececea'
T = f'stroke="{TRACO}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"'
T15 = f'stroke="{TRACO}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"'


def f(cor):
    return f'fill="{CLARO.get(cor, cor)}"'


SEM = 'fill="none"'

# ---------- dinossauros ----------

def pegada():
    dedos = ''.join(f'<ellipse cx="{x}" cy="{y}" rx="3.6" ry="6.5" transform="rotate({r} {x} {y})" {f("bege")} {T15}/>'
                    for x, y, r in ((10, 14, -28), (20, 9, 0), (30, 14, 28)))
    return dedos + f'<path d="M11 27 q9 -9 18 0 q2 9 -9 10 q-11 -1 -9 -10z" {f("bege")} {T}/>'


def samambaia():
    folhas = ''.join(f'<ellipse cx="{20 + s * 6:.1f}" cy="{y}" rx="5.5" ry="2.4" transform="rotate({-s * 25} {20 + s * 6:.1f} {y})" {f("verde")} {T15}/>'
                     for y in (11, 17, 23, 29) for s in (-1, 1))
    return f'<path d="M20 38 Q19 20 21 4" {SEM} {T}/>' + folhas


def concha():
    espiral = 'M20 20 q0 -3 3 -2 q3 2 0 6 q-5 4 -9 -1 q-4 -7 3 -11 q9 -4 13 5 q3 10 -6 14'
    return f'<circle cx="20" cy="20" r="15" {f("bege")} {T}/><path d="{espiral}" {SEM} {T15}/>'


def palmeira():
    folhas = ''.join(f'<path d="M20 12 q{dx / 2} {dy - 8} {dx} {dy}" {SEM} stroke="{TRACO}" stroke-width="4.5" stroke-linecap="round"/>'
                     f'<path d="M20 12 q{dx / 2} {dy - 8} {dx} {dy}" {SEM} stroke="{CLARO["verde"]}" stroke-width="2" stroke-linecap="round"/>'
                     for dx, dy in ((-15, 4), (15, 4), (-10, -6), (10, -6), (-16, 12), (16, 12)))
    return f'<path d="M18 38 q-1 -14 2 -26 q3 12 2 26z" {f("bege")} {T}/>' + folhas


def pena():
    return (f'<path d="M30 4 q6 14 -8 26 l-10 4 l3 -10 q8 -16 15 -20z" {f("amarelo")} {T}/>'
            f'<path d="M6 38 l24 -32 M19 21 l-4 -2 M23 16 l-4 -3 M17 25 l5 1" {SEM} {T15}/>')


def dinossauro():
    return (f'<path d="M4 31 q6 -2 10 -8 q4 -6 12 -5 q4 1 5 -5 l1 -7 q2 -3 5 -1 q2 2 0 4 l-3 2 l-1 9 q-1 9 -9 12 z" {f("verde")} {T}/>'
            f'<path d="M12 28 v8 M18 30 v6 M25 29 v7 M29 27 v8" {SEM} stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>'
            f'<circle cx="34.5" cy="5.5" r="0.9" fill="{TRACO}"/>')


# ---------- espaço ----------

def nave():
    return (f'<path d="M12 21 q8 -16 16 0z" {f(AZUL)} {T}/>'
            f'<ellipse cx="20" cy="24" rx="17" ry="6" {f(CINZA)} {T}/>'
            f'<circle cx="11" cy="24" r="1.6" fill="{TRACO}"/><circle cx="20" cy="25.5" r="1.6" fill="{TRACO}"/><circle cx="29" cy="24" r="1.6" fill="{TRACO}"/>'
            f'<path d="M12 30 l-3 6 M28 30 l3 6" {SEM} {T15}/>')


def lua_cheia():
    crateras = ''.join(f'<circle cx="{x}" cy="{y}" r="{r}" {f(CINZA)} {T15}/>' for x, y, r in ((14, 15, 4), (25, 24, 5), (15, 28, 2.5), (27, 12, 2)))
    return f'<circle cx="20" cy="20" r="15" {f("amarelo")} {T}/>' + crateras


def galaxia():
    bracos = ''.join(f'<path d="M20 20 q{9 * math.cos(a):.1f} {9 * math.sin(a):.1f} {15 * math.cos(a + 1.2):.1f} {15 * math.sin(a + 1.2):.1f}" '
                     f'{SEM} stroke="{TRACO}" stroke-width="2" stroke-linecap="round"/>' for a in (0, 2.1, 4.2))
    return (f'<circle cx="20" cy="20" r="16" {f("rosa")} {T15}/>' + bracos +
            f'<circle cx="20" cy="20" r="4.5" {f("amarelo")} {T15}/>')


def luneta():
    return (f'<path d="M7 23 l22 -12 l3.5 6.5 l-22 12z" {f(AZUL)} {T}/>'
            f'<path d="M29 11 l3 -1.6 l3.5 6.5 l-3 1.6z" {f("amarelo")} {T15}/>'
            f'<path d="M19 22 l-7 15 M19 22 l0 15 M19 22 l7 15" {SEM} {T}/>')


def astronauta():
    return (f'<rect x="10" y="22" width="20" height="16" rx="5" {f("branco")} {T}/>'
            f'<circle cx="20" cy="15" r="11" {f("branco")} {T}/>'
            f'<rect x="12.5" y="10" width="15" height="10" rx="4.5" {f(AZUL)} {T15}/>'
            f'<rect x="16" y="27" width="8" height="5" rx="1" {f("amarelo")} {T15}/>')


# ---------- futebol ----------

def chuteira():
    travas = ''.join(f'<path d="M{x} 31 v4" {SEM} stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>' for x in (9, 17, 28, 34))
    return (f'<path d="M5 31 v-9 q0 -3 3 -4 l3 -10 h8 l2 8 q12 2 15 8 q1 5 -3 7z" {f("laranja")} {T}/>'
            f'<path d="M13 15 l4 2 M12 19 l5 2" {SEM} {T15}/>' + travas)


def taca():
    return (f'<path d="M11 6 h18 v6 q0 12 -9 13 q-9 -1 -9 -13z" {f("amarelo")} {T}/>'
            f'<path d="M11 9 h-5 q0 8 7 9 M29 9 h5 q0 8 -7 9" {SEM} {T15}/>'
            f'<path d="M20 25 v6 M13 37 h14 v-6 h-14z" {f("amarelo")} {T}/>')


def bola_futebol():
    pent = ' '.join(f'{20 + 6 * math.cos(-math.pi / 2 + i * 2 * math.pi / 5):.1f},{20 + 6 * math.sin(-math.pi / 2 + i * 2 * math.pi / 5):.1f}' for i in range(5))
    raios = ''.join(f'<path d="M{20 + 6 * math.cos(a):.1f} {20 + 6 * math.sin(a):.1f} L{20 + 15 * math.cos(a):.1f} {20 + 15 * math.sin(a):.1f}" {SEM} {T15}/>'
                    for a in (-math.pi / 2 + i * 2 * math.pi / 5 for i in range(5)))
    return f'<circle cx="20" cy="20" r="15" {f("branco")} {T}/><polygon points="{pent}" fill="{TRACO}"/>' + raios


def camisa():
    return (f'<path d="M14 5 q6 4 12 0 l10 6 l-4 8 l-4 -2 v20 h-16 v-20 l-4 2 l-4 -8z" {f("verde")} {T}/>'
            f'<text x="20" y="30" text-anchor="middle" font-family="Lexend, sans-serif" font-weight="600" font-size="12" fill="{TRACO}">10</text>')


def bandeira_escanteio():
    return (f'<path d="M12 4 v34" {SEM} stroke="{TRACO}" stroke-width="2.5" stroke-linecap="round"/>'
            f'<path d="M12 5 l20 7 l-20 7z" {f("rosa")} {T}/>'
            f'<path d="M5 38 q7 -5 14 0" {SEM} {T15}/>')


def apito():
    return (f'<path d="M6 18 h20 a9 9 0 1 1 -8 12 h-12z" {f("amarelo")} {T}/>'
            f'<circle cx="26" cy="27" r="3" {f("branco")} {T15}/>'
            f'<path d="M26 18 q4 -8 10 -10" {SEM} {T15}/>')


# ---------- animais ----------

def tartaruga():
    return (f'<ellipse cx="34" cy="25" rx="4" ry="3.5" {f("verde")} {T15}/>'
            f'<path d="M9 30 v4 M16 30 v5 M24 30 v5" {SEM} stroke="{TRACO}" stroke-width="3" stroke-linecap="round"/>'
            f'<path d="M4 30 q1 -18 15 -18 q14 0 14 18z" {f("verde")} {T}/>'
            f'<path d="M12 30 l3 -9 h8 l3 9 M15 21 l-4 -5 M23 21 l3 -6" {SEM} {T15}/>'
            f'<circle cx="35" cy="24" r="0.9" fill="{TRACO}"/>')


def joaninha():
    return (f'<circle cx="20" cy="9" r="5" fill="{TRACO}"/>'
            f'<ellipse cx="20" cy="23" rx="13" ry="14" {f("rosa")} {T}/>'
            f'<path d="M20 10 v27" {SEM} {T15}/>'
            + ''.join(f'<circle cx="{x}" cy="{y}" r="2.6" fill="{TRACO}"/>' for x, y in ((13, 19), (27, 19), (14, 29), (26, 29))))


def coruja():
    return (f'<path d="M8 8 l5 5 h14 l5 -5 v20 q0 10 -12 10 q-12 0 -12 -10z" {f("bege")} {T}/>'
            f'<circle cx="14.5" cy="19" r="5" {f("branco")} {T15}/><circle cx="25.5" cy="19" r="5" {f("branco")} {T15}/>'
            f'<circle cx="14.5" cy="19" r="1.8" fill="{TRACO}"/><circle cx="25.5" cy="19" r="1.8" fill="{TRACO}"/>'
            f'<path d="M18 25 l2 3 l2 -3z" {f("amarelo")} {T15}/>')


def borboleta():
    return (f'<path d="M20 20 q-8 -16 -15 -11 q-5 7 15 11 q-14 4 -11 12 q6 4 11 -12" {f("amarelo")} {T}/>'
            f'<path d="M20 20 q8 -16 15 -11 q5 7 -15 11 q14 4 11 12 q-6 4 -11 -12" {f("rosa")} {T}/>'
            f'<path d="M20 11 v19 M20 11 l-4 -6 M20 11 l4 -6" {SEM} stroke="{TRACO}" stroke-width="2.2" stroke-linecap="round"/>')


def cobra():
    return (f'<path d="M5 32 q8 -10 14 0 q6 10 12 -2 q3 -8 -3 -12 q-6 -4 -4 -10" {SEM} stroke="{TRACO}" stroke-width="8" stroke-linecap="round"/>'
            f'<path d="M5 32 q8 -10 14 0 q6 10 12 -2 q3 -8 -3 -12 q-6 -4 -4 -10" {SEM} stroke="{CLARO["verde"]}" stroke-width="4.5" stroke-linecap="round"/>'
            f'<circle cx="23.5" cy="8" r="1" fill="{TRACO}"/><path d="M24 4 l2 -3" {SEM} {T15}/>')


def gato():
    return (f'<path d="M8 6 l7 7 h10 l7 -7 v18 q0 12 -12 12 q-12 0 -12 -12z" {f("laranja")} {T}/>'
            f'<circle cx="15" cy="21" r="1.8" fill="{TRACO}"/><circle cx="25" cy="21" r="1.8" fill="{TRACO}"/>'
            f'<path d="M18.5 26 h3 l-1.5 2z M20 28 v2 M3 24 h9 M3 29 l9 -2 M37 24 h-9 M37 29 l-9 -2" {SEM} {T15}/>')


# ---------- blocos e construção ----------

def gema():
    return (f'<path d="M8 15 l6 -8 h12 l6 8 l-12 19z" {f(AZUL)} {T}/>'
            f'<path d="M8 15 h24 M14 7 l3 8 l3 -8 l3 8 l3 -8 M17 15 l3 19 l3 -19" {SEM} {T15}/>')


def tocha():
    return (f'<rect x="17" y="17" width="6" height="21" {f("bege")} {T}/>'
            f'<path d="M14 18 h12 v-7 h-3 v-5 h-6 v5 h-3z" {f("amarelo")} {T}/>'
            f'<rect x="18" y="11" width="4" height="5" {f("laranja")} {T15}/>')


def lanterna():
    return (f'<path d="M15 6 h10 v4 h-10z M20 2 v4" {f(CINZA)} {T}/>'
            f'<rect x="10" y="10" width="20" height="24" {f(CINZA)} {T}/>'
            f'<rect x="14" y="14" width="12" height="16" {f("amarelo")} {T15}/>'
            f'<path d="M10 34 h20 v4 h-20z" {f(CINZA)} {T}/>')


def picareta():
    return (f'<path d="M7 33 l22 -22" {SEM} stroke="{TRACO}" stroke-width="6" stroke-linecap="square"/>'
            f'<path d="M7 33 l22 -22" {SEM} stroke="{CLARO["bege"]}" stroke-width="2.5" stroke-linecap="square"/>'
            f'<path d="M10 9 q12 -6 22 0 l2 4 h-4 l-2 -2 q-8 -3 -14 0 h-4z M28 5 q6 10 0 22 l-4 2 v-4 l2 -2 q3 -8 0 -14 z" {f(AZUL)} {T15}/>')


def pa():
    return (f'<path d="M20 3 v22" {SEM} stroke="{TRACO}" stroke-width="5.5" stroke-linecap="square"/>'
            f'<path d="M20 3 v22" {SEM} stroke="{CLARO["bege"]}" stroke-width="2.2" stroke-linecap="square"/>'
            f'<path d="M12 22 h16 v9 l-8 7 l-8 -7z" {f(CINZA)} {T}/>')


def bloco():
    return (f'<path d="M20 4 l15 8 l-15 8 l-15 -8z" {f("verde")} {T}/>'
            f'<path d="M5 12 v16 l15 8 v-16z" {f("bege")} {T}/>'
            f'<path d="M35 12 v16 l-15 8 v-16z" {f("laranja")} {T}/>'
            f'<path d="M5 15 l3 2 l3 -1 l3 3 l3 0 l3 2 M35 15 l-3 2 l-3 -1 l-3 3 l-3 0 l-3 2" {SEM} {T15}/>')


# ---------- carros e trens ----------

def roda_carro():
    return (f'<circle cx="20" cy="20" r="16" {f(CINZA)} stroke="{TRACO}" stroke-width="3.5"/><circle cx="20" cy="20" r="9" {f("branco")} {T}/>'
            + ''.join(f'<circle cx="{20 + 5 * math.cos(i * math.pi * 2 / 5):.1f}" cy="{20 + 5 * math.sin(i * math.pi * 2 / 5):.1f}" r="1.3" fill="{TRACO}"/>' for i in range(5)))


def moto():
    return (f'<circle cx="9" cy="28" r="6.5" {f("branco")} stroke="{TRACO}" stroke-width="3"/>'
            f'<circle cx="31" cy="28" r="6.5" {f("branco")} stroke="{TRACO}" stroke-width="3"/>'
            f'<path d="M9 28 l8 -10 h10 l4 10 M17 18 l-2 -5 h-4 M27 18 l2 -6 h4" {SEM} {T}/>'
            f'<path d="M16 19 h12 l-2 6 h-8z" {f("rosa")} {T15}/>')


def bandeira_chegada():
    casas = ''.join(f'<rect x="{10 + c * 6}" y="{5 + l * 5}" width="6" height="5" fill="{TRACO}"/>'
                    for l in range(3) for c in range(4) if (l + c) % 2 == 0)
    return (f'<path d="M10 4 v34" {SEM} stroke="{TRACO}" stroke-width="2.5" stroke-linecap="round"/>'
            f'<rect x="10" y="5" width="24" height="15" {f("branco")} {T15}/>' + casas)


def locomotiva():
    return (f'<rect x="4" y="16" width="22" height="14" {f("rosa")} {T}/>'
            f'<rect x="24" y="8" width="12" height="22" {f("verde")} {T}/>'
            f'<rect x="27" y="11" width="6" height="6" {f("branco")} {T15}/>'
            f'<path d="M8 16 v-7 h6 v7" {f(CINZA)} {T}/>'
            f'<circle cx="11" cy="32" r="4.5" {f("branco")} {T}/><circle cx="29" cy="32" r="4.5" {f("branco")} {T}/>')


def bicicleta():
    return (f'<circle cx="9" cy="27" r="7" {SEM} {T}/><circle cx="31" cy="27" r="7" {SEM} {T}/>'
            f'<path d="M9 27 l7 -12 h11 l4 12 M16 15 l5 12 l6 -12 M14 12 h5 M27 15 l-1 -5 h4" {SEM} {T}/>')


def carro():
    return (f'<path d="M3 28 v-7 q0 -3 4 -4 l5 -7 h14 l6 7 q5 1 5 4 v7z" {f(AZUL)} {T}/>'
            f'<path d="M13 12 h5 v6 h-9z M21 12 h4 l5 6 h-9z" {f("branco")} {T15}/>'
            f'<circle cx="11" cy="29" r="4.5" {f("branco")} stroke="{TRACO}" stroke-width="2.5"/>'
            f'<circle cx="29" cy="29" r="4.5" {f("branco")} stroke="{TRACO}" stroke-width="2.5"/>')


# Para cada tema: figura original → (desenho, singular, plural). None mantém a palavra original.
TEMAS = [
    ('dinossauros', 'Dinossauros', {
        'maca': (pegada, 'pegada', 'pegadas'), 'estrela': (samambaia, 'samambaia', 'samambaias'),
        'bola': (concha, 'concha', 'conchas'), 'flor': (palmeira, 'palmeira', 'palmeiras'),
        'banana': (pena, 'pena', 'penas'), 'peixe': (dinossauro, 'dinossauro', 'dinossauros')}),
    ('espaco', 'Espaço', {
        'maca': (nave, 'nave', 'naves'), 'bola': (lua_cheia, 'lua', 'luas'),
        'flor': (galaxia, 'galáxia', 'galáxias'), 'banana': (luneta, 'luneta', 'lunetas'),
        'peixe': (astronauta, 'astronauta', 'astronautas')}),
    ('futebol', 'Futebol', {
        'maca': (chuteira, 'chuteira', 'chuteiras'), 'estrela': (taca, 'taça', 'taças'),
        'bola': (bola_futebol, None, None), 'flor': (camisa, 'camisa', 'camisas'),
        'banana': (bandeira_escanteio, 'bandeira', 'bandeiras'), 'peixe': (apito, 'apito', 'apitos')}),
    ('animais', 'Animais', {
        'maca': (tartaruga, 'tartaruga', 'tartarugas'), 'estrela': (joaninha, 'joaninha', 'joaninhas'),
        'bola': (coruja, 'coruja', 'corujas'), 'flor': (borboleta, 'borboleta', 'borboletas'),
        'banana': (cobra, 'cobra', 'cobras'), 'peixe': (gato, 'gato', 'gatos')}),
    ('blocos', 'Blocos e construção', {
        'maca': (gema, 'gema', 'gemas'), 'estrela': (tocha, 'tocha', 'tochas'),
        'bola': (lanterna, 'lanterna', 'lanternas'), 'flor': (picareta, 'picareta', 'picaretas'),
        'banana': (pa, 'pá', 'pás'), 'peixe': (bloco, 'bloco', 'blocos')}),
    ('veiculos', 'Carros e trens', {
        'maca': (moto, 'moto', 'motos'), 'estrela': (bandeira_chegada, 'bandeira', 'bandeiras'),
        'bola': (roda_carro, 'roda', 'rodas'), 'flor': (locomotiva, 'locomotiva', 'locomotivas'),
        'banana': (bicicleta, 'bicicleta', 'bicicletas'), 'peixe': (carro, 'carro', 'carros')}),
]

ORIGINAIS = {'maca': ('maçã', 'maçãs'), 'estrela': ('estrela', 'estrelas'), 'bola': ('bola', 'bolas'),
             'flor': ('flor', 'flores'), 'banana': ('banana', 'bananas'), 'peixe': ('peixe', 'peixes')}


def dados():
    temas = []
    for chave, nome, figs in TEMAS:
        desenhos, palavras = {}, {}
        for fig, (desenho, sing, plur) in figs.items():
            desenhos[fig] = desenho()
            if sing:
                o_sing, o_plur = ORIGINAIS[fig]
                palavras[o_sing], palavras[o_plur] = sing, plur
        temas.append({'chave': chave, 'nome': nome, 'desenhos': desenhos, 'palavras': palavras})
    return temas


def js():
    return ('/* Gerado por _fonte/matematica-adaptada/temas.py. Não edite à mão. */\n'
            'window.FICHAS_TEMAS = ' + json.dumps(dados(), ensure_ascii=False, separators=(',', ':')) + ';\n')
