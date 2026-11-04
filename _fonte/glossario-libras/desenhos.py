"""Desenhos simples (SVG 120 x 80) para o apoio visual de cada termo do glossário.
Traço preto grosso e cor só nos detalhes, para imprimir bem em preto e branco."""

A = '#fff36b'   # amarelo
V = '#b9e6c6'   # verde
R = '#ffd0e0'   # rosa
Z = '#cfe3ff'   # azul
K = 'stroke="#111" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"'


def tx(x, y, s, tam=18, peso=600, ancora='middle'):
    return f'<text x="{x}" y="{y}" font-size="{tam}" font-weight="{peso}" text-anchor="{ancora}" font-family="Lexend, sans-serif" fill="#111">{s}</text>'


def bolas(n, x0, y, cor=A, passo=14, r=5):
    return ''.join(f'<circle cx="{x0 + i * passo}" cy="{y}" r="{r}" fill="{cor}" {K}/>' for i in range(n))


def barra(x, y, w, h, cor):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{cor}" {K}/>'


D = {
    'numero-natural': tx(60, 50, '0 1 2 3 4 …', 24),
    'numero-par': bolas(3, 18, 30) + bolas(3, 18, 48) + bolas(3, 80, 30, V) + bolas(2, 80, 48, V)
    + tx(32, 74, 'par', 13) + tx(94, 74, 'ímpar', 13),
    'numero-negativo': f'<line x1="8" y1="40" x2="112" y2="40" {K}/>' + ''.join(
        f'<line x1="{12 + i * 16}" y1="34" x2="{12 + i * 16}" y2="46" {K}/>' + tx(12 + i * 16, 64, str(i - 3), 12, 500) for i in range(7))
    + f'<circle cx="12" cy="40" r="6" fill="{Z}" {K}/>',
    'dezena': ''.join(f'<rect x="{14 + i * 9}" y="24" width="9" height="24" fill="{A}" {K}/>' for i in range(10)) + tx(60, 72, '10 unidades', 13, 500),
    'centena': ''.join(f'<rect x="{35 + c * 5}" y="{6 + r * 5}" width="5" height="5" fill="{A}" stroke="#111" stroke-width="1"/>'
                       for c in range(10) for r in range(10)) + tx(60, 74, '100', 12, 500),
    'adicao': bolas(3, 10, 40) + tx(50, 47, '+', 22) + bolas(2, 66, 40, V) + tx(98, 47, '=', 20) + tx(112, 47, '5', 18),
    'subtracao': bolas(5, 16, 40) + ''.join(f'<line x1="{16 + i * 14 - 6}" y1="34" x2="{16 + i * 14 + 6}" y2="46" {K}/>' for i in (3, 4))
    + tx(96, 47, '= 3', 18),
    'multiplicacao': ''.join(f'<ellipse cx="{22 + i * 38}" cy="44" rx="17" ry="9" fill="#fff" {K}/>' + bolas(4, 13 + i * 38, 40, A, 6, 2.6) for i in range(3))
    + tx(60, 74, '3 × 4 = 12', 14, 500),
    'divisao': bolas(6, 25, 16, A, 14, 4.5) + ''.join(f'<rect x="{8 + i * 38}" y="40" width="28" height="22" rx="4" fill="#fff" {K}/>'
                                                      + bolas(2, 16 + i * 38, 51, A, 12, 4) for i in range(3)),
    'igual': bolas(2, 18, 40) + tx(60, 48, '=', 28) + bolas(2, 88, 40, V),
    'maior-menor': tx(30, 52, '8 &gt; 5', 22) + tx(90, 52, '2 &lt; 9', 22),
    'fracao': f'<circle cx="38" cy="40" r="28" fill="#fff" {K}/><path d="M38 40 L38 12 A28 28 0 0 1 66 40 Z" fill="{A}" {K}/>'
              f'<line x1="10" y1="40" x2="66" y2="40" {K}/><line x1="38" y1="12" x2="38" y2="68" {K}/>' + tx(94, 48, '1/4', 22),
    'metade': f'<rect x="20" y="16" width="80" height="48" rx="4" fill="#fff" {K}/><rect x="20" y="16" width="40" height="48" rx="4" fill="{A}" {K}/>'
              f'<line x1="60" y1="10" x2="60" y2="70" stroke="#111" stroke-width="2.5" stroke-dasharray="5 4"/>',
    'decimal': tx(60, 52, '2,50', 32),
    'porcentagem': ''.join(f'<rect x="{35 + c * 5}" y="{6 + r * 5}" width="5" height="5" fill="{A if c < 5 else "#fff"}" stroke="#111" stroke-width="1"/>'
                           for c in range(10) for r in range(10)) + tx(60, 74, '50%', 12, 600),
    'raiz-quadrada': ''.join(f'<rect x="{12 + c * 14}" y="{12 + r * 14}" width="14" height="14" fill="{A}" {K}/>' for c in range(3) for r in range(3))
    + tx(90, 50, '√9 = 3', 18),
    'equacao': f'<rect x="10" y="24" width="24" height="34" rx="5" fill="{A}" {K}/>' + tx(22, 49, 'x', 24) + tx(40, 49, '+ 3 = 7', 24, 600, 'start'),
    'sequencia': ''.join(f'<rect x="{8 + i * 22}" y="28" width="18" height="18" rx="3" fill="{(A, V)[i % 2]}" {K}/>' for i in range(4))
    + tx(104, 44, '…', 20),
    'variavel': f'<rect x="28" y="22" width="64" height="40" rx="5" fill="{A}" {K}/>' + tx(60, 48, 'x = 4', 20) + tx(60, 16, 'pontos', 11, 500),
    'reta': f'<line x1="8" y1="54" x2="112" y2="26" {K}/><circle cx="8" cy="54" r="3.5" fill="#111"/><circle cx="112" cy="26" r="3.5" fill="#111"/>',
    'angulo': f'<path d="M20 64 L104 64 M20 64 L72 14" fill="none" {K}/><path d="M48 64 A28 28 0 0 0 40 45" fill="none" stroke="#111" stroke-width="2.5"/>'
              f'<path d="M20 64 L48 64 A28 28 0 0 0 40 45 Z" fill="{A}" fill-opacity=".7"/>',
    'triangulo': f'<polygon points="60,10 104,68 16,68" fill="{A}" {K}/>',
    'quadrado': f'<rect x="32" y="12" width="56" height="56" fill="{V}" {K}/>',
    'retangulo': f'<rect x="14" y="20" width="92" height="44" fill="{Z}" {K}/>',
    'circulo': f'<circle cx="60" cy="40" r="30" fill="{R}" {K}/><circle cx="60" cy="40" r="2.5" fill="#111"/>',
    'cubo': f'<polygon points="36,28 76,28 76,68 36,68" fill="{A}" {K}/><polygon points="36,28 52,14 92,14 76,28" fill="#fff" {K}/>'
            f'<polygon points="76,28 92,14 92,54 76,68" fill="{V}" {K}/>',
    'esfera': f'<circle cx="60" cy="40" r="30" fill="{Z}" {K}/><ellipse cx="60" cy="40" rx="30" ry="9" fill="none" stroke="#111" stroke-width="1.6" stroke-dasharray="4 3"/>',
    'cilindro': f'<path d="M36 18 L36 62 A24 8 0 0 0 84 62 L84 18" fill="{V}" {K}/><ellipse cx="60" cy="18" rx="24" ry="8" fill="#fff" {K}/>',
    'piramide': f'<polygon points="24,62 72,70 60,12" fill="{A}" {K}/><polygon points="72,70 100,56 60,12" fill="{R}" {K}/>'
                f'<line x1="24" y1="62" x2="52" y2="52" stroke="#111" stroke-width="1.6" stroke-dasharray="4 3"/><line x1="52" y1="52" x2="100" y2="56" stroke="#111" stroke-width="1.6" stroke-dasharray="4 3"/>',
    'simetria': f'<path d="M60 40 C40 8 14 14 22 36 C14 58 40 70 60 40 Z" fill="{R}" {K}/><path d="M60 40 C80 8 106 14 98 36 C106 58 80 70 60 40 Z" fill="{R}" {K}/>'
                f'<line x1="60" y1="6" x2="60" y2="76" stroke="#111" stroke-width="2.5" stroke-dasharray="5 4"/>',
    'area': ''.join(f'<rect x="{24 + c * 18}" y="{12 + r * 18}" width="18" height="18" fill="{A}" {K}/>' for c in range(4) for r in range(3)),
    'perimetro': f'<rect x="22" y="16" width="76" height="48" fill="#fff" stroke="{"#16703a"}" stroke-width="5"/>' + tx(60, 46, '4 + 2 + 4 + 2', 11, 500),
    'medida': f'<rect x="10" y="30" width="100" height="22" fill="{A}" {K}/>' + ''.join(
        f'<line x1="{14 + i * 10}" y1="30" x2="{14 + i * 10}" y2="{40 if i % 5 == 0 else 36}" stroke="#111" stroke-width="1.6"/>' for i in range(10)),
    'metro': f'<rect x="6" y="30" width="108" height="20" fill="{A}" {K}/>' + ''.join(
        f'<line x1="{10 + i * 10}" y1="30" x2="{10 + i * 10}" y2="38" stroke="#111" stroke-width="1.6"/>' for i in range(11)) + tx(60, 70, '1 m = 100 cm', 12, 500),
    'litro': f'<path d="M48 14 L72 14 L72 22 L82 32 L82 70 L38 70 L38 32 L48 22 Z" fill="#fff" {K}/><path d="M38 44 L82 44 L82 70 L38 70 Z" fill="{Z}" {K}/>' + tx(60, 62, '1 L', 13),
    'quilograma': f'<path d="M34 30 L86 30 L98 70 L22 70 Z" fill="{A}" {K}/><circle cx="60" cy="22" r="8" fill="#fff" {K}/>' + tx(60, 58, '1 kg', 16),
    'hora': f'<circle cx="60" cy="40" r="30" fill="#fff" {K}/><line x1="60" y1="40" x2="60" y2="20" {K}/><line x1="60" y1="40" x2="76" y2="40" {K}/>' + tx(104, 76, '60 min', 11, 500),
    'relogio': f'<circle cx="60" cy="40" r="30" fill="{A}" {K}/>' + ''.join(
        f'<circle cx="{60 + 24 * __import__("math").sin(i * 0.5236):.1f}" cy="{40 - 24 * __import__("math").cos(i * 0.5236):.1f}" r="1.8" fill="#111"/>' for i in range(12))
    + f'<line x1="60" y1="40" x2="60" y2="22" {K}/><line x1="60" y1="40" x2="72" y2="46" {K}/>',
    'calendario': f'<rect x="24" y="12" width="72" height="60" rx="5" fill="#fff" {K}/><rect x="24" y="12" width="72" height="14" rx="5" fill="{R}" {K}/>' + ''.join(
        f'<rect x="{30 + c * 12}" y="{32 + r * 12}" width="8" height="8" fill="{A if (c, r) == (3, 1) else "#fff"}" stroke="#111" stroke-width="1.2"/>' for c in range(5) for r in range(3)),
    'dinheiro': f'<rect x="10" y="20" width="62" height="38" rx="4" fill="{V}" {K}/>' + tx(41, 45, 'R$ 5', 14)
    + f'<circle cx="92" cy="40" r="16" fill="{A}" {K}/>' + tx(92, 45, '1', 14),
    'tabela': f'<rect x="16" y="12" width="88" height="56" fill="#fff" {K}/><rect x="16" y="12" width="88" height="14" fill="{A}" {K}/>'
              f'<line x1="60" y1="12" x2="60" y2="68" {K}/><line x1="16" y1="40" x2="104" y2="40" {K}/><line x1="16" y1="54" x2="104" y2="54" {K}/>',
    'grafico': f'<path d="M14 10 L14 70 L110 70" fill="none" {K}/>' + barra(24, 44, 16, 26, A) + barra(48, 22, 16, 48, V) + barra(72, 34, 16, 36, R) + barra(92, 54, 12, 16, Z),
    'media': barra(20, 30, 18, 40, A) + barra(46, 50, 18, 20, A) + barra(72, 40, 18, 30, A)
    + f'<line x1="12" y1="40" x2="100" y2="40" stroke="#16703a" stroke-width="3" stroke-dasharray="6 4"/><line x1="12" y1="70" x2="100" y2="70" {K}/>',
    'probabilidade': f'<circle cx="38" cy="40" r="24" fill="{A}" {K}/>' + tx(38, 46, 'cara', 13, 500)
    + f'<circle cx="86" cy="40" r="24" fill="#fff" {K}/>' + tx(86, 46, 'coroa', 13, 500),
    'computador': f'<rect x="22" y="10" width="76" height="46" rx="4" fill="{Z}" {K}/><path d="M50 56 L46 68 L74 68 L70 56" fill="#fff" {K}/>',
    'teclado': f'<rect x="8" y="22" width="104" height="40" rx="5" fill="#fff" {K}/>' + ''.join(
        f'<rect x="{14 + c * 13}" y="{28 + r * 11}" width="9" height="7" rx="1.5" fill="{A if (r == 2 and 2 <= c <= 5) else "#fff"}" stroke="#111" stroke-width="1.3"/>' for c in range(7) for r in range(3)),
    'mouse': f'<rect x="40" y="10" width="40" height="62" rx="20" fill="#fff" {K}/><line x1="60" y1="10" x2="60" y2="34" {K}/><line x1="40" y1="34" x2="80" y2="34" {K}/>'
             f'<path d="M60 10 A20 20 0 0 0 40 30 L40 34 L60 34 Z" fill="{A}" {K}/>',
    'celular': f'<rect x="42" y="6" width="36" height="68" rx="6" fill="#fff" {K}/><rect x="47" y="14" width="26" height="46" fill="{Z}" stroke="#111" stroke-width="1.5"/>'
               f'<circle cx="60" cy="67" r="3" fill="#111"/>',
    'internet': f'<circle cx="60" cy="40" r="30" fill="{Z}" {K}/><ellipse cx="60" cy="40" rx="13" ry="30" fill="none" stroke="#111" stroke-width="2"/>'
                f'<line x1="30" y1="40" x2="90" y2="40" stroke="#111" stroke-width="2"/><path d="M35 24 L85 24 M35 56 L85 56" stroke="#111" stroke-width="2"/>',
    'rede': ''.join(f'<line x1="60" y1="40" x2="{x}" y2="{y}" {K}/>' for x, y in ((20, 16), (100, 16), (20, 64), (100, 64)))
    + ''.join(f'<rect x="{x - 12}" y="{y - 9}" width="24" height="18" rx="3" fill="{Z}" {K}/>' for x, y in ((20, 16), (100, 16), (20, 64), (100, 64)))
    + f'<circle cx="60" cy="40" r="9" fill="{A}" {K}/>',
    'arquivo': f'<path d="M36 8 L74 8 L88 22 L88 72 L36 72 Z" fill="#fff" {K}/><path d="M74 8 L74 22 L88 22" fill="{A}" {K}/>'
               + ''.join(f'<line x1="44" y1="{34 + i * 9}" x2="80" y2="{34 + i * 9}" stroke="#111" stroke-width="2"/>' for i in range(4)),
    'aplicativo': f'<rect x="42" y="6" width="36" height="68" rx="6" fill="#fff" {K}/>' + ''.join(
        f'<rect x="{47 + c * 14}" y="{14 + r * 14}" width="10" height="10" rx="3" fill="{(A, V, R, Z)[(c + r) % 4]}" stroke="#111" stroke-width="1.4"/>' for c in range(2) for r in range(3)),
    'dados': ''.join(f'<rect x="{10 + i * 36}" y="22" width="30" height="36" rx="4" fill="{(A, V, Z)[i]}" {K}/>' for i in range(3))
    + tx(25, 45, 'Ana', 11, 500) + tx(61, 45, '12', 12, 500) + tx(97, 45, 'azul', 11, 500),
    'informacao': barra(14, 40, 14, 30, A) + barra(34, 20, 14, 50, A) + barra(54, 50, 14, 20, A)
    + f'<line x1="10" y1="70" x2="74" y2="70" {K}/><circle cx="96" cy="32" r="14" fill="{V}" {K}/>' + tx(96, 38, 'i', 18, 700),
    'algoritmo': ''.join(f'<rect x="30" y="{6 + i * 24}" width="60" height="18" rx="4" fill="{(A, V, R)[i]}" {K}/>' + tx(40, 20 + i * 24, str(i + 1), 12, 700)
                         for i in range(3)) + f'<path d="M60 24 L60 30 M60 48 L60 54" {K}/>',
    'programacao': f'<rect x="12" y="10" width="96" height="60" rx="5" fill="#fff" {K}/>' + tx(22, 34, 'andar(3)', 13, 500, 'start')
    + tx(22, 54, 'virar()', 13, 500, 'start') + f'<rect x="12" y="10" width="8" height="60" fill="{A}" {K}/>',
    'codigo': tx(60, 52, '&lt;/&gt;', 34, 700),
    'decisao': f'<polygon points="60,6 96,32 60,58 24,32" fill="{A}" {K}/>' + tx(60, 37, 'se', 14)
    + f'<path d="M24 32 L10 32 L10 72 M96 32 L110 32 L110 72" fill="none" {K}/>' + tx(28, 74, 'sim', 11, 500) + tx(92, 74, 'não', 11, 500),
    'repeticao': f'<path d="M84 22 A28 22 0 1 0 90 46" fill="none" {K}/><polygon points="80,12 92,24 78,28" fill="#111"/>' + tx(60, 46, '4×', 18),
    'robo': f'<rect x="34" y="24" width="52" height="40" rx="6" fill="{Z}" {K}/><circle cx="50" cy="42" r="5" fill="#fff" {K}/><circle cx="70" cy="42" r="5" fill="#fff" {K}/>'
            f'<line x1="60" y1="24" x2="60" y2="12" {K}/><circle cx="60" cy="10" r="4" fill="{A}" {K}/><line x1="50" y1="55" x2="70" y2="55" {K}/>',
    'binario': tx(60, 50, '1 0 1', 32, 700),
    'senha': f'<rect x="32" y="36" width="56" height="36" rx="5" fill="{A}" {K}/><path d="M44 36 L44 26 A16 16 0 0 1 76 26 L76 36" fill="none" {K}/>'
             f'<circle cx="60" cy="52" r="5" fill="#111"/><line x1="60" y1="52" x2="60" y2="62" {K}/>',
    'criptografia': tx(30, 48, 'A', 26, 700) + f'<path d="M48 40 L74 40" {K}/><polygon points="72,34 82,40 72,46" fill="#111"/>' + tx(96, 48, 'D', 26, 700),
    'privacidade': f'<path d="M60 8 L94 20 L94 42 C94 60 78 70 60 76 C42 70 26 60 26 42 L26 20 Z" fill="{V}" {K}/>'
                   f'<path d="M46 42 L56 52 L76 32" fill="none" {K}/>',
}


def svg(chave, titulo):
    corpo = D[chave]
    return (f'<svg viewBox="0 0 120 80" width="120" height="80" role="img" aria-label="{titulo}" '
            f'xmlns="http://www.w3.org/2000/svg">{corpo}</svg>')
