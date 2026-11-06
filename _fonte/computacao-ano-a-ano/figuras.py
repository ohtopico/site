"""Figuras simples (SVG, caixa 100 x 100) usadas nos jogos dos pequenos e nas folhas para imprimir.

Fonte única: este arquivo gera material-didatico/assets/figuras.js (os jogos leem window.FIG).
As folhas para imprimir chamam fig(nome) daqui. Traço preto, cores claras, sem texto dentro do desenho.
Figuras com cor variável (formas) usam {c} no lugar da cor de preenchimento.
"""
import json
import re
from pathlib import Path

T = 'stroke="#111" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"'
AM, VM, AZ, VD, LA, RX, RS, MR, CZ, PL = '#ffd84d', '#ef6a5c', '#7cbcf0', '#7cc97e', '#ffaa55', '#b996e6', '#f7a8c8', '#b7854f', '#d6d6d2', '#f4cfa8'
BR = '#ffffff'


def r(x, y, w, h, f=BR, rx=6, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{f}" {T}{extra}/>'


def c(x, y, rr, f=BR):
    return f'<circle cx="{x}" cy="{y}" r="{rr}" fill="{f}" {T}/>'


def pth(d, f='none'):
    return f'<path d="{d}" fill="{f}" {T}/>'


def ln(x1, y1, x2, y2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" {T}/>'


def olhos(x1, x2, y, rr=4):
    return f'<circle cx="{x1}" cy="{y}" r="{rr}" fill="#111"/><circle cx="{x2}" cy="{y}" r="{rr}" fill="#111"/>'


def rosto(cx, cy, rr, cabelo='#5a3b22', pele=PL, adulto=False):
    cab = pth(f'M{cx-rr} {cy} Q{cx-rr} {cy-rr-6} {cx} {cy-rr-4} Q{cx+rr} {cy-rr-6} {cx+rr} {cy} Q{cx} {cy-rr+6} {cx-rr} {cy}Z', cabelo)
    return c(cx, cy, rr, pele) + cab + olhos(cx - rr * .38, cx + rr * .38, cy + 2, 3) + pth(f'M{cx-6} {cy+rr*.5} Q{cx} {cy+rr*.75} {cx+6} {cy+rr*.5}')


F = {
    # ---------- rotina e casa ----------
    'escova': r(14, 56, 62, 12, AZ, 6) + r(60, 40, 26, 16, BR, 4) + ''.join(ln(64 + i * 6, 40, 64 + i * 6, 30) for i in range(4)),
    'pasta': pth('M12 62 L62 50 Q74 47 76 56 Q78 66 66 68 L14 74 Z', BR) + r(76, 52, 14, 14, VM, 3) + pth('M30 60 L52 56', 'none'),
    'copo': pth('M28 22 L72 22 L66 84 L34 84 Z', BR) + pth('M31 44 L69 44 L66 84 L34 84 Z', AZ),
    'torneira': r(14, 30, 50, 16, CZ, 6) + r(50, 30, 16, 34, CZ, 4) + r(30, 18, 16, 12, VM, 3) + pth('M58 70 Q54 80 58 86 Q62 80 58 70Z', AZ),
    'sabonete': r(18, 40, 64, 36, RS, 16) + c(36, 30, 7, AZ) + c(54, 24, 5, AZ) + c(68, 32, 4, AZ),
    'toalha': r(16, 18, 68, 18, CZ, 8) + r(22, 30, 56, 56, VD, 4) + ln(22, 74, 78, 74),
    'cama': r(10, 48, 80, 22, AZ, 4) + r(10, 30, 14, 52, MR, 3) + r(76, 40, 14, 42, MR, 3) + r(26, 38, 22, 12, BR, 6),
    'despertador': c(50, 54, 30, VM) + c(50, 54, 22) + ln(50, 54, 50, 40) + ln(50, 54, 60, 58) + c(26, 24, 8, AM) + c(74, 24, 8, AM) + ln(32, 82, 26, 90) + ln(68, 82, 74, 90),
    'camiseta': pth('M30 18 L42 14 Q50 24 58 14 L70 18 L90 34 L80 46 L72 40 L72 86 L28 86 L28 40 L20 46 L10 34 Z', LA),
    'tenis': pth('M10 70 L12 44 Q30 46 40 56 L80 60 Q92 62 92 74 L92 80 L10 80 Z', AZ) + ln(10, 70, 92, 70) + ln(30, 52, 36, 46) + ln(40, 56, 46, 50),
    'mochila': r(22, 26, 56, 62, VM, 16) + pth('M36 26 Q36 10 50 10 Q64 10 64 26') + r(32, 56, 36, 22, AM, 6),
    'lapis': pth('M18 82 L22 64 L70 16 L84 30 L36 78 Z', AM) + pth('M18 82 L22 64 L36 78 Z', PL) + ln(64, 22, 78, 36),
    'livro': r(14, 20, 34, 62, AZ, 4) + r(52, 20, 34, 62, AZ, 4) + ln(22, 34, 40, 34) + ln(22, 46, 40, 46) + ln(60, 34, 78, 34) + ln(60, 46, 78, 46),
    'prato': '<ellipse cx="50" cy="56" rx="40" ry="24" fill="#fff" ' + T + '/><ellipse cx="50" cy="54" rx="24" ry="13" fill="#eee" ' + T + '/>',
    'colher': '<ellipse cx="30" cy="34" rx="14" ry="20" fill="#d6d6d2" ' + T + '/>' + ln(38, 50, 78, 88),
    'pao': pth('M14 62 Q14 30 50 30 Q86 30 86 62 L86 74 L14 74 Z', '#e8b56a') + pth('M34 44 L40 52 M50 40 L56 48 M64 44 L70 52'),
    'maca': pth('M50 32 C30 18 12 34 16 56 C20 80 38 90 50 82 C62 90 80 80 84 56 C88 34 70 18 50 32 Z', VM) + pth('M50 32 Q50 20 56 12') + pth('M54 22 Q66 12 74 18 Q64 28 54 22Z', VD),
    'banana': pth('M20 30 Q24 76 80 74 Q84 70 80 66 Q40 66 30 26 Z', AM) + ln(20, 30, 26, 22),
    'ovo': '<ellipse cx="50" cy="54" rx="26" ry="34" fill="#fff" ' + T + '/>',
    'ovo-frito': pth('M20 50 Q14 26 40 26 Q56 14 70 28 Q90 34 82 58 Q86 80 60 78 Q40 90 26 74 Q10 66 20 50Z', BR) + c(50, 52, 13, AM),
    'frigideira': '<ellipse cx="40" cy="58" rx="30" ry="20" fill="#555" ' + T + '/>' + r(68, 52, 28, 10, MR, 4),
    'semente': '<ellipse cx="50" cy="56" rx="14" ry="20" fill="' + MR + '" ' + T + ' transform="rotate(30 50 56)"/>',
    'regador': pth('M24 40 L66 40 L62 82 L28 82 Z', AZ) + pth('M66 50 L88 34 L92 40 L70 60') + pth('M30 40 Q30 24 46 24 Q60 24 60 40'),
    'broto': pth('M50 86 L50 52') + pth('M50 60 Q30 58 28 40 Q46 40 50 60Z', VD) + pth('M50 54 Q66 50 72 34 Q54 34 50 54Z', VD) + r(30, 80, 40, 10, MR, 3),
    'flor': ln(50, 56, 50, 90) + ''.join(c(50 + dx, 38 + dy, 13, RS) for dx, dy in ((0, -16), (16, 0), (0, 16), (-16, 0))) + c(50, 38, 10, AM) + pth('M50 76 Q34 72 32 62 Q46 62 50 76Z', VD),
    'vaso': pth('M26 52 L74 52 L66 88 L34 88 Z', LA) + ln(22, 52, 78, 52),
    'arvore': r(42, 58, 16, 32, MR, 3) + c(50, 40, 28, VD) + c(34, 50, 14, VD) + c(66, 50, 14, VD),
    'sol': ''.join(ln(50 + 30 * x, 50 + 30 * y, 50 + 42 * x, 50 + 42 * y) for x, y in ((1, 0), (-1, 0), (0, 1), (0, -1), (.7, .7), (-.7, .7), (.7, -.7), (-.7, -.7))) + c(50, 50, 22, AM),
    'nuvem': pth('M22 70 Q8 70 10 56 Q12 44 26 46 Q28 28 46 30 Q58 18 72 30 Q90 30 88 50 Q96 60 86 70 Z', BR),
    'chuva': pth('M22 56 Q8 56 10 42 Q12 30 26 32 Q28 14 46 16 Q58 4 72 16 Q90 16 88 36 Q96 46 86 56 Z', CZ) + ''.join(pth(f'M{x} 66 L{x - 6} 84', 'none') for x in (30, 50, 70)),
    'guarda-chuva': pth('M10 52 Q10 16 50 14 Q90 16 90 52 Q80 44 70 52 Q60 44 50 52 Q40 44 30 52 Q20 44 10 52Z', VM) + pth('M50 52 L50 82 Q50 90 42 88'),
    'lua': pth('M60 12 Q24 18 24 52 Q26 86 64 88 Q40 72 40 50 Q40 26 60 12Z', AM),
    'estrela': pth('M50 10 L61 38 L91 39 L67 58 L76 88 L50 70 L24 88 L33 58 L9 39 L39 38 Z', AM),
    'coracao': pth('M50 84 C20 62 10 46 14 32 C18 16 40 12 50 30 C60 12 82 16 86 32 C90 46 80 62 50 84Z', VM),
    'casa': pth('M14 46 L50 14 L86 46', 'none') + r(22, 44, 56, 44, AM, 2) + r(42, 62, 16, 26, MR, 2) + r(28, 52, 12, 12, AZ, 2) + pth('M14 46 L50 14 L86 46 Z', VM),
    'escola': pth('M8 44 L50 18 L92 44 Z', VM) + r(14, 44, 72, 44, AM, 2) + r(42, 64, 16, 24, MR, 2) + r(20, 52, 14, 12, AZ, 2) + r(66, 52, 14, 12, AZ, 2) + ln(50, 18, 50, 6) + pth('M50 6 L64 10 L50 14', VD),
    'carro': pth('M10 64 L14 46 L30 44 L40 30 L68 30 L78 44 L90 48 L90 64 Z', VM) + c(30, 66, 10, '#555') + c(72, 66, 10, '#555') + r(44, 34, 20, 10, AZ, 2),
    'onibus': r(10, 24, 80, 50, AM, 10) + r(18, 32, 18, 16, AZ, 2) + r(41, 32, 18, 16, AZ, 2) + r(64, 32, 18, 16, AZ, 2) + c(28, 76, 9, '#555') + c(72, 76, 9, '#555'),
    'bicicleta': c(26, 64, 18) + c(74, 64, 18) + pth('M26 64 L44 40 L66 40 L74 64 M44 40 L54 64 L66 40 M40 32 L50 32 M66 40 L62 28 L72 28'),
    'bola': c(50, 50, 34, BR) + pth('M50 30 L66 42 L60 62 L40 62 L34 42 Z', '#111') + ln(50, 30, 50, 16) + ln(66, 42, 82, 38) + ln(60, 62, 70, 78) + ln(40, 62, 30, 78) + ln(34, 42, 18, 38),
    'gato': pth('M26 40 L22 14 L42 30 Q50 28 58 30 L78 14 L74 40 Q82 52 76 66 Q66 82 50 82 Q34 82 24 66 Q18 52 26 40Z', LA) + olhos(40, 60, 52, 4) + pth('M46 62 L54 62 L50 66 Z', RS) + ln(30, 64, 14, 62) + ln(70, 64, 86, 62),
    'cachorro': c(50, 52, 28, '#e8c08a') + pth('M24 36 Q10 40 14 66 Q22 70 28 56Z', MR) + pth('M76 36 Q90 40 86 66 Q78 70 72 56Z', MR) + olhos(40, 60, 48, 4) + '<ellipse cx="50" cy="62" rx="7" ry="5" fill="#111"/>' + pth('M50 66 Q50 72 44 74 M50 66 Q50 72 56 74'),
    'peixe': pth('M14 50 Q40 20 70 40 L90 26 L88 74 L70 60 Q40 80 14 50Z', AZ) + c(32, 46, 4, '#111'),
    'passaro': c(46, 54, 26, VM) + pth('M68 46 L88 50 L68 56 Z', AM) + c(56, 44, 4, '#111') + pth('M26 54 Q36 70 52 62', 'none'),
    'borboleta': pth('M50 50 Q20 10 12 36 Q10 54 50 50 Z', RX) + pth('M50 50 Q80 10 88 36 Q90 54 50 50 Z', RX) + pth('M50 52 Q24 84 30 86 Q40 88 50 52 Z', RS) + pth('M50 52 Q76 84 70 86 Q60 88 50 52 Z', RS) + r(46, 30, 8, 50, '#111', 4),
    'presente': r(16, 40, 68, 46, VM, 4) + r(12, 30, 76, 14, VM, 4) + r(44, 30, 12, 56, AM, 0) + pth('M50 30 Q34 10 30 22 Q30 30 50 30 Q66 10 70 22 Q70 30 50 30'),
    'bolo': r(18, 50, 64, 34, RS, 6) + pth('M18 62 Q26 70 34 62 Q42 70 50 62 Q58 70 66 62 Q74 70 82 62') + r(46, 30, 8, 20, AZ, 2) + pth('M50 18 Q56 24 50 30 Q44 24 50 18Z', AM),
    'roupa-suja': pth('M30 18 L42 14 Q50 24 58 14 L70 18 L90 34 L80 46 L72 40 L72 86 L28 86 L28 40 L20 46 L10 34 Z', CZ) + c(40, 56, 5, MR) + c(60, 68, 6, MR),
    'mao': pth('M30 86 L28 52 Q28 46 34 46 L36 46 L36 20 Q36 14 42 14 Q48 14 48 20 L48 44 L50 16 Q50 10 56 10 Q62 10 62 16 L62 44 L64 22 Q64 16 70 16 Q76 16 76 22 L76 60 Q76 86 56 86 Z', PL),
    'lixeira': r(24, 30, 52, 58, VD, 4) + r(18, 20, 64, 12, VD, 4) + ln(38, 42, 38, 76) + ln(50, 42, 50, 76) + ln(62, 42, 62, 76),
    'relogio': c(50, 50, 36, BR) + ln(50, 50, 50, 26) + ln(50, 50, 68, 50) + c(50, 50, 3, '#111'),
    # ---------- pessoas ----------
    'crianca': rosto(50, 36, 20, '#5a3b22') + pth('M24 92 Q24 62 50 60 Q76 62 76 92 Z', AZ),
    'adulto': rosto(50, 30, 18, '#333') + pth('M20 94 Q20 56 50 54 Q80 56 80 94 Z', VD),
    'professora': rosto(50, 30, 18, '#7a4a2a') + pth('M32 30 Q30 50 36 56 M68 30 Q70 50 64 56') + pth('M20 94 Q20 56 50 54 Q80 56 80 94 Z', RX),
    'desconhecido': c(50, 34, 20, CZ) + pth('M20 94 Q20 60 50 58 Q80 60 80 94 Z', CZ) + pth('M44 28 Q44 20 50 20 Q58 20 58 28 Q58 34 50 36 L50 42') + c(50, 48, 1.5, '#111'),
    'familia': rosto(30, 30, 14, '#333') + pth('M10 90 Q10 50 30 48 Q50 50 50 90 Z', VD) + rosto(68, 46, 11, '#7a4a2a') + pth('M52 92 Q52 62 68 60 Q84 62 84 92 Z', AZ),
    'amigos': rosto(30, 40, 14) + pth('M10 92 Q10 60 30 58 Q50 60 50 92 Z', LA) + rosto(70, 40, 14, '#222') + pth('M50 92 Q50 60 70 58 Q90 60 90 92 Z', AZ),
    'feliz': c(50, 50, 38, AM) + olhos(38, 62, 42, 5) + pth('M32 58 Q50 78 68 58'),
    'triste': c(50, 50, 38, AZ) + olhos(38, 62, 42, 5) + pth('M32 72 Q50 56 68 72'),
    'bravo': c(50, 50, 38, VM) + olhos(38, 62, 46, 5) + ln(28, 32, 44, 38) + ln(72, 32, 56, 38) + ln(36, 68, 64, 68),
    # ---------- tecnologia ----------
    'computador': r(14, 14, 72, 50, AZ, 6) + r(20, 20, 60, 38, '#dff0ff', 2) + r(40, 64, 20, 12, CZ, 0) + r(26, 76, 48, 10, CZ, 4),
    'monitor': r(10, 14, 80, 54, '#333', 6) + r(17, 21, 66, 40, '#dff0ff', 2) + r(44, 68, 12, 10, CZ, 0) + r(30, 78, 40, 8, CZ, 4),
    'teclado': r(6, 32, 88, 40, CZ, 6) + ''.join(r(12 + i * 15, 38, 11, 9, BR, 2) for i in range(5)) + ''.join(r(12 + i * 15, 51, 11, 9, BR, 2) for i in range(5)) + r(24, 63, 52, 6, BR, 2),
    'mouse': pth('M50 16 Q76 16 76 50 Q76 86 50 86 Q24 86 24 50 Q24 16 50 16Z', CZ) + ln(24, 44, 76, 44) + ln(50, 16, 50, 44) + pth('M50 16 Q54 8 62 6'),
    'impressora': r(14, 38, 72, 32, CZ, 6) + r(26, 14, 48, 24, BR, 2) + r(26, 60, 48, 28, BR, 2) + ln(34, 70, 66, 70) + ln(34, 78, 58, 78) + c(76, 48, 3, VD),
    'fone': pth('M20 60 Q20 18 50 18 Q80 18 80 60') + r(12, 54, 18, 30, VM, 8) + r(70, 54, 18, 30, VM, 8),
    'microfone': r(36, 12, 28, 46, CZ, 14) + pth('M26 44 Q26 70 50 70 Q74 70 74 44') + ln(50, 70, 50, 86) + ln(34, 88, 66, 88),
    'caixa-som': r(26, 10, 48, 80, '#555', 8) + c(50, 34, 10, CZ) + c(50, 64, 16, CZ) + c(50, 64, 5, '#111'),
    'camera': r(10, 30, 80, 52, '#555', 8) + r(22, 20, 22, 12, '#555', 3) + c(50, 56, 18, AZ) + c(50, 56, 8, '#111') + c(78, 40, 3, AM),
    'celular': r(30, 8, 40, 84, '#333', 8) + r(35, 16, 30, 62, '#dff0ff', 2) + c(50, 85, 3, '#fff'),
    'tablet': r(14, 12, 72, 78, '#333', 8) + r(20, 18, 60, 62, '#dff0ff', 2) + c(50, 85, 3, '#fff'),
    'notebook': r(18, 18, 64, 44, '#333', 5) + r(23, 23, 54, 34, '#dff0ff', 2) + pth('M8 70 L18 62 L82 62 L92 70 Z', CZ),
    'tv': r(8, 20, 84, 56, '#333', 6) + r(15, 27, 70, 42, '#dff0ff', 2) + ln(36, 6, 50, 20) + ln(64, 6, 50, 20) + ln(30, 76, 26, 88) + ln(70, 76, 74, 88),
    'controle-remoto': r(34, 8, 32, 84, CZ, 10) + c(50, 24, 7, VM) + ''.join(c(43 + (i % 2) * 14, 44 + (i // 2) * 12, 4, BR) for i in range(6)),
    'videogame': pth('M20 36 Q10 36 8 52 Q6 80 22 80 Q30 80 36 66 L64 66 Q70 80 78 80 Q94 80 92 52 Q90 36 80 36 Z', RX) + ln(22, 50, 34, 50) + ln(28, 44, 28, 56) + c(70, 46, 4, VM) + c(78, 54, 4, AZ),
    'radio': r(10, 34, 80, 50, LA, 8) + c(34, 60, 14, CZ) + r(56, 46, 26, 10, BR, 2) + c(62, 70, 4, '#111') + c(76, 70, 4, '#111') + ln(70, 34, 84, 12),
    'micro-ondas': r(8, 22, 84, 58, CZ, 6) + r(16, 30, 50, 42, '#333', 4) + ''.join(c(78, 36 + i * 11, 3.5, BR) for i in range(4)),
    'maquina-lavar': r(16, 10, 68, 82, BR, 6) + ln(16, 26, 84, 26) + c(50, 58, 22, AZ) + c(50, 58, 12, '#dff0ff') + c(28, 18, 3, VM) + c(40, 18, 3, VD),
    'geladeira': r(22, 6, 56, 88, BR, 6) + ln(22, 38, 78, 38) + ln(30, 18, 30, 30) + ln(30, 48, 30, 62),
    'calculadora': r(22, 8, 56, 84, CZ, 8) + r(30, 16, 40, 18, '#dff0ff', 2) + ''.join(r(30 + (i % 3) * 14, 42 + (i // 3) * 14, 10, 10, BR, 2) for i in range(9)),
    'robo': r(26, 30, 48, 40, CZ, 10) + c(40, 48, 6, AZ) + c(60, 48, 6, AZ) + ln(42, 62, 58, 62) + ln(50, 30, 50, 16) + c(50, 13, 5, VM) + r(16, 42, 10, 18, CZ, 4) + r(74, 42, 10, 18, CZ, 4) + r(34, 70, 10, 16, CZ, 3) + r(56, 70, 10, 16, CZ, 3),
    'semaforo': r(34, 6, 32, 76, '#333', 8) + c(50, 22, 9, VM) + c(50, 44, 9, AM) + c(50, 66, 9, VD) + ln(50, 82, 50, 96),
    'pendrive': r(34, 30, 32, 60, AZ, 6) + r(40, 10, 20, 20, CZ, 2) + r(44, 16, 4, 6, '#111', 0) + r(52, 16, 4, 6, '#111', 0),
    'chip': r(28, 28, 44, 44, '#555', 4) + ''.join(ln(36 + i * 10, 28, 36 + i * 10, 16) + ln(36 + i * 10, 72, 36 + i * 10, 84) + ln(28, 36 + i * 10, 16, 36 + i * 10) + ln(72, 36 + i * 10, 84, 36 + i * 10) for i in range(3)),
    'nuvem-dados': pth('M22 70 Q8 70 10 56 Q12 44 26 46 Q28 28 46 30 Q58 18 72 30 Q90 30 88 50 Q96 60 86 70 Z', '#dff0ff') + pth('M50 44 L50 62 M42 54 L50 62 L58 54'),
    'wifi': pth('M14 40 Q50 8 86 40') + pth('M26 54 Q50 32 74 54') + pth('M38 68 Q50 58 62 68') + c(50, 80, 5, '#111'),
    'app': r(14, 14, 32, 32, VM, 8) + r(54, 14, 32, 32, AZ, 8) + r(14, 54, 32, 32, VD, 8) + r(54, 54, 32, 32, AM, 8),
    'jogo-tela': r(10, 14, 80, 58, '#333', 6) + r(16, 20, 68, 46, '#dff0ff', 2) + pth('M30 56 L42 36 L52 50 L60 42 L72 56 Z', VD) + c(66, 30, 5, AM),
    'mensagem': pth('M14 18 L86 18 Q90 18 90 22 L90 62 Q90 66 86 66 L40 66 L22 82 L24 66 L14 66 Q10 66 10 62 L10 22 Q10 18 14 18Z', BR) + ln(24, 34, 76, 34) + ln(24, 48, 60, 48),
    'envelope': r(10, 24, 80, 52, BR, 4) + pth('M10 28 L50 56 L90 28'),
    'telefone': pth('M24 14 Q12 18 14 32 Q22 62 50 82 Q66 92 80 84 Q88 80 84 72 L74 62 Q68 58 62 64 L56 70 Q40 60 32 46 L38 40 Q44 34 40 28 L32 16 Q28 12 24 14Z', VM),
    'carta-papel': r(22, 10, 56, 80, BR, 4) + ln(32, 26, 68, 26) + ln(32, 38, 68, 38) + ln(32, 50, 68, 50) + ln(32, 62, 54, 62),
    'foto': r(10, 20, 80, 60, BR, 6) + pth('M18 72 L40 44 L56 62 L66 52 L82 72 Z', VD) + c(68, 36, 7, AM),
    'cadeado': pth('M32 44 L32 32 Q32 14 50 14 Q68 14 68 32 L68 44') + r(22, 44, 56, 44, AM, 8) + c(50, 62, 6, '#111') + ln(50, 66, 50, 76),
    'cadeado-aberto': pth('M32 44 L32 32 Q32 14 50 14 Q68 14 68 26') + r(22, 44, 56, 44, CZ, 8) + c(50, 62, 6, '#111'),
    'chave': c(30, 50, 18, AM) + c(30, 50, 7) + pth('M48 50 L88 50 L88 62 M76 50 L76 60'),
    'senha': r(8, 32, 84, 36, BR, 10) + ''.join(f'<g transform="translate({22 + i * 18} 50)"><line x1="0" y1="-8" x2="0" y2="8" {T}/><line x1="-7" y1="-4" x2="7" y2="4" {T}/><line x1="-7" y1="4" x2="7" y2="-4" {T}/></g>' for i in range(4)),
    'escudo': pth('M50 8 L84 20 Q84 64 50 90 Q16 64 16 20 Z', VD) + pth('M34 50 L46 62 L68 38'),
    'lupa': c(42, 42, 24, '#dff0ff') + ln(60, 60, 86, 86),
    'olho': pth('M8 50 Q50 10 92 50 Q50 90 8 50Z', BR) + c(50, 50, 16, AZ) + c(50, 50, 7, '#111'),
    'mapa': pth('M10 22 L36 14 L64 24 L90 16 L90 78 L64 86 L36 76 L10 84 Z', '#fff3c4') + ln(36, 14, 36, 76) + ln(64, 24, 64, 86) + pth('M50 40 Q50 30 58 30 Q66 30 66 40 Q66 48 58 58 Q50 48 50 40Z', VM),
    'globo': c(50, 50, 36, AZ) + pth('M30 30 Q42 26 46 36 Q40 46 30 44 Q24 38 30 30Z', VD) + pth('M56 52 Q70 48 74 60 Q66 76 56 70 Q50 60 56 52Z', VD),
    'lampada': pth('M50 10 Q78 10 78 40 Q78 54 64 64 L64 74 L36 74 L36 64 Q22 54 22 40 Q22 10 50 10Z', AM) + r(38, 74, 24, 14, CZ, 3),
    'engrenagem': ''.join(f'<rect x="44" y="8" width="12" height="18" fill="{CZ}" {T} transform="rotate({a} 50 50)"/>' for a in range(0, 360, 45)) + c(50, 50, 26, CZ) + c(50, 50, 10),
    'bateria': r(10, 30, 74, 40, BR, 6) + r(84, 42, 8, 16, '#111', 2) + r(16, 36, 44, 28, VD, 2),
    'tomada': r(20, 20, 60, 60, BR, 14) + c(38, 50, 5, '#111') + c(62, 50, 5, '#111'),
    'carregador': r(30, 10, 40, 34, BR, 6) + ln(40, 10, 40, 2) + ln(60, 10, 60, 2) + pth('M50 44 Q50 70 30 80 Q20 86 22 94'),
    'lixo-eletronico': r(24, 30, 52, 58, VD, 4) + r(18, 20, 64, 12, VD, 4) + r(36, 44, 28, 22, '#333', 3) + pth('M42 74 L58 74'),
    'pasta-arquivo': pth('M8 26 L38 26 L46 34 L92 34 L92 82 L8 82 Z', AM),
    'documento': pth('M24 8 L62 8 L80 26 L80 92 L24 92 Z', BR) + pth('M62 8 L62 26 L80 26') + ln(34, 44, 70, 44) + ln(34, 56, 70, 56) + ln(34, 68, 58, 68),
    'nota-musical': c(32, 74, 12, '#111') + c(72, 64, 12, '#111') + pth('M44 74 L44 22 L84 12 L84 64') + ln(44, 32, 84, 22),
    'video': r(10, 22, 80, 56, '#333', 8) + pth('M42 36 L64 50 L42 64 Z', BR),
    'pincel': pth('M70 12 L86 28 L48 66 L34 52 Z', MR) + pth('M34 52 L48 66 Q40 86 16 86 Q16 62 34 52Z', VM),
    'bandeira': ln(22, 10, 22, 92) + pth('M22 14 L80 22 L64 36 L80 50 L22 50 Z', VM),
    'tesouro': r(16, 44, 68, 40, MR, 4) + pth('M16 44 Q16 20 50 20 Q84 20 84 44 Z', MR) + r(42, 40, 16, 18, AM, 3),
    'certo': c(50, 50, 40, VD) + pth('M28 52 L44 68 L74 34'),
    'errado': c(50, 50, 40, VM) + ln(32, 32, 68, 68) + ln(68, 32, 32, 68),
    'interrogacao': c(50, 50, 40, AM) + pth('M38 38 Q38 24 50 24 Q64 24 64 38 Q64 48 50 52 L50 60') + c(50, 72, 4, '#111'),
    'alto-falante': pth('M14 38 L32 38 L54 18 L54 82 L32 62 L14 62 Z', CZ) + pth('M66 34 Q76 50 66 66') + pth('M76 24 Q92 50 76 76'),
    'mao-levantada': pth('M30 86 L28 52 Q28 46 34 46 L36 46 L36 20 Q36 14 42 14 Q48 14 48 20 L48 44 L50 16 Q50 10 56 10 Q62 10 62 16 L62 44 L64 22 Q64 16 70 16 Q76 16 76 22 L76 60 Q76 86 56 86 Z', AM),
    'portao': r(10, 30, 80, 60, MR, 2) + ''.join(ln(22 + i * 14, 30, 22 + i * 14, 90) for i in range(5)),
    'fogo': pth('M50 10 Q66 30 62 44 Q72 36 74 28 Q90 52 80 72 Q70 92 50 92 Q30 92 20 72 Q12 52 28 34 Q30 46 38 48 Q32 28 50 10Z', LA),
    'agua-gota': pth('M50 10 Q78 48 78 62 Q78 88 50 88 Q22 88 22 62 Q22 48 50 10Z', AZ),
    'entrada': r(46, 22, 44, 56, CZ, 6) + r(52, 30, 32, 26, '#dff0ff', 2) + pth('M8 50 L40 50', 'none') + pth('M28 38 L42 50 L28 62', 'none'),
    'saida': r(10, 22, 44, 56, CZ, 6) + r(16, 30, 32, 26, '#dff0ff', 2) + pth('M58 50 L90 50', 'none') + pth('M78 38 L92 50 L78 62', 'none'),
    'navegador': r(8, 14, 84, 72, BR, 6) + r(8, 14, 84, 16, CZ, 6) + c(18, 22, 3, VM) + c(28, 22, 3, AM) + c(38, 22, 3, VD) + r(18, 38, 64, 10, BR, 5) + c(50, 68, 12, AZ),
    'grafico': ln(14, 86, 88, 86) + ln(14, 86, 14, 12) + r(22, 56, 14, 30, AZ, 2) + r(42, 34, 14, 52, VD, 2) + r(62, 46, 14, 40, AM, 2),
    'tabela': r(12, 16, 76, 68, BR, 4) + r(12, 16, 76, 16, AM, 4) + ln(12, 50, 88, 50) + ln(12, 67, 88, 67) + ln(50, 16, 50, 84),
    'forno': r(10, 14, 80, 76, CZ, 6) + r(20, 38, 60, 42, '#333', 4) + ''.join(c(26 + i * 16, 26, 4, BR) for i in range(4)),
}

# formas com cor variável (o jogo troca {c} pela cor)
FORMAS = {
    'circulo': '<circle cx="50" cy="50" r="38" fill="{c}" ' + T + '/>',
    'quadrado': '<rect x="14" y="14" width="72" height="72" rx="4" fill="{c}" ' + T + '/>',
    'triangulo': '<path d="M50 10 L90 86 L10 86 Z" fill="{c}" ' + T + '/>',
    'estrela-f': '<path d="M50 10 L61 38 L91 39 L67 58 L76 88 L50 70 L24 88 L33 58 L9 39 L39 38 Z" fill="{c}" ' + T + '/>',
    'coracao-f': '<path d="M50 84 C20 62 10 46 14 32 C18 16 40 12 50 30 C60 12 82 16 86 32 C90 46 80 62 50 84Z" fill="{c}" ' + T + '/>',
    'losango': '<path d="M50 8 L90 50 L50 92 L10 50 Z" fill="{c}" ' + T + '/>',
}
CORES = {'vermelho': VM, 'azul': AZ, 'amarelo': AM, 'verde': VD, 'laranja': LA, 'roxo': RX, 'rosa': RS, 'branco': BR, 'preto': '#333', 'marrom': MR}

SETAS = {
    'cima': '<path d="M50 12 L84 50 L62 50 L62 88 L38 88 L38 50 L16 50 Z" fill="#7cbcf0" ' + T + '/>',
}

NOMES = {
    'escova': 'escova de dentes', 'pasta': 'pasta de dentes', 'copo': 'copo de água', 'torneira': 'torneira', 'sabonete': 'sabonete',
    'toalha': 'toalha', 'cama': 'cama', 'despertador': 'despertador', 'camiseta': 'camiseta', 'tenis': 'tênis', 'mochila': 'mochila',
    'lapis': 'lápis', 'livro': 'livro', 'prato': 'prato', 'colher': 'colher', 'pao': 'pão', 'maca': 'maçã', 'banana': 'banana',
    'ovo': 'ovo', 'ovo-frito': 'ovo frito', 'frigideira': 'frigideira', 'semente': 'semente', 'regador': 'regador', 'broto': 'broto',
    'flor': 'flor', 'vaso': 'vaso', 'arvore': 'árvore', 'sol': 'sol', 'nuvem': 'nuvem', 'chuva': 'chuva', 'guarda-chuva': 'guarda-chuva',
    'lua': 'lua', 'estrela': 'estrela', 'coracao': 'coração', 'casa': 'casa', 'escola': 'escola', 'carro': 'carro', 'onibus': 'ônibus',
    'bicicleta': 'bicicleta', 'bola': 'bola', 'gato': 'gato', 'cachorro': 'cachorro', 'peixe': 'peixe', 'passaro': 'passarinho',
    'borboleta': 'borboleta', 'presente': 'presente', 'bolo': 'bolo', 'roupa-suja': 'roupa suja', 'mao': 'mão', 'lixeira': 'lixeira',
    'relogio': 'relógio', 'crianca': 'criança', 'adulto': 'adulto', 'professora': 'professora', 'desconhecido': 'pessoa desconhecida',
    'familia': 'família', 'amigos': 'amigos', 'feliz': 'rosto feliz', 'triste': 'rosto triste', 'bravo': 'rosto bravo',
    'computador': 'computador', 'monitor': 'monitor', 'teclado': 'teclado', 'mouse': 'mouse', 'impressora': 'impressora', 'fone': 'fone de ouvido',
    'microfone': 'microfone', 'caixa-som': 'caixa de som', 'camera': 'câmera', 'celular': 'celular', 'tablet': 'tablet', 'notebook': 'notebook',
    'tv': 'televisão', 'controle-remoto': 'controle remoto', 'videogame': 'controle de videogame', 'radio': 'rádio', 'micro-ondas': 'micro-ondas',
    'maquina-lavar': 'máquina de lavar', 'geladeira': 'geladeira', 'calculadora': 'calculadora', 'robo': 'robô', 'semaforo': 'semáforo',
    'pendrive': 'pendrive', 'chip': 'processador', 'nuvem-dados': 'nuvem de dados', 'wifi': 'sinal de internet', 'app': 'aplicativos',
    'jogo-tela': 'jogo na tela', 'mensagem': 'mensagem', 'envelope': 'carta', 'telefone': 'telefone', 'carta-papel': 'folha escrita',
    'foto': 'foto', 'cadeado': 'cadeado fechado', 'cadeado-aberto': 'cadeado aberto', 'chave': 'chave', 'senha': 'senha', 'escudo': 'escudo',
    'lupa': 'lupa', 'olho': 'olho', 'mapa': 'mapa', 'globo': 'globo', 'lampada': 'lâmpada', 'engrenagem': 'engrenagem', 'bateria': 'bateria',
    'tomada': 'tomada', 'carregador': 'carregador', 'lixo-eletronico': 'lixo eletrônico', 'pasta-arquivo': 'pasta', 'documento': 'documento',
    'nota-musical': 'música', 'video': 'vídeo', 'pincel': 'pincel', 'bandeira': 'bandeira', 'tesouro': 'baú do tesouro', 'certo': 'certo',
    'errado': 'errado', 'interrogacao': 'ponto de interrogação', 'alto-falante': 'som', 'mao-levantada': 'mão levantada', 'portao': 'portão',
    'fogo': 'fogo', 'agua-gota': 'gota de água', 'forno': 'fogão', 'entrada': 'entrada', 'saida': 'saída', 'navegador': 'navegador',
    'grafico': 'gráfico', 'tabela': 'tabela',
    'circulo': 'círculo', 'quadrado': 'quadrado', 'triangulo': 'triângulo', 'estrela-f': 'estrela', 'coracao-f': 'coração', 'losango': 'losango',
}


# versão clara das cores, para as folhas impressas gastarem pouca tinta (contorno preto, preenchimento suave)
CLARO = {AM: '#fff1b8', VM: '#fbd3cd', AZ: '#d9ecfb', VD: '#dcf1dc', LA: '#ffe2c6', RX: '#e9dff8', RS: '#fce3ee', MR: '#ecd9c4',
         CZ: '#eeeeec', PL: '#fcefe2', '#555': '#d9d9d9', '#333': '#d0d0d0', '#5a3b22': '#c9b19c', '#7a4a2a': '#d6bba3', '#222': '#bdbdbd',
         '#e8b56a': '#f6dfbc', '#e8c08a': '#f6e3c8', '#dff0ff': '#f2f8ff'}


def fig(nome, cor=None, tam=None, riscada=False, rot=None, claro=False, contorno=False):
    """SVG inline de uma figura. cor só vale para as formas. riscada desenha um X por cima (negação).
    claro: cores suaves (folhas impressas). contorno: tudo branco, para a criança pintar."""
    if nome in FORMAS:
        corpo = FORMAS[nome].replace('{c}', CORES.get(cor, cor or BR))
    else:
        corpo = F[nome]
    if contorno:
        corpo = re.sub(r'fill="#(?!111)[0-9a-fA-F]{3,6}"', 'fill="#fff"', corpo)
    elif claro:
        corpo = re.sub(r'fill="(#[0-9a-fA-F]{3,6})"', lambda m: f'fill="{CLARO.get(m.group(1), m.group(1))}"', corpo)
    if riscada:
        corpo += '<line x1="12" y1="12" x2="88" y2="88" stroke="#c21f3a" stroke-width="8" stroke-linecap="round"/>'
    rotulo = (rot or ((('sem ' if riscada else '') + (f'{NOMES.get(nome, nome)}' + (f' {cor}' if cor else '')))))
    w = f' width="{tam}" height="{tam}"' if tam else ''
    return f'<svg class="fg" viewBox="0 0 100 100"{w} role="img" aria-label="{rotulo}">{corpo}</svg>'


def gerar_js(destino):
    dados = {'F': F, 'FORMAS': FORMAS, 'CORES': CORES, 'NOMES': NOMES}
    txt = ('/* Figuras dos jogos dos pequenos. Gerado por _fonte/computacao-ano-a-ano/figuras.py: não edite à mão. */\n'
           'window.FIG = ' + json.dumps(dados, ensure_ascii=False, separators=(',', ':')) + ';\n')
    Path(destino).write_text(txt, encoding='utf-8')


if __name__ == '__main__':
    raiz = Path(__file__).resolve().parents[2]
    gerar_js(raiz / 'material-didatico' / 'assets' / 'figuras.js')
    # prévia de todas as figuras, para conferir o desenho
    prev = ''.join(f'<div style="display:inline-block;width:110px;text-align:center;font:11px sans-serif">{fig(n, tam=90)}<br>{n}</div>' for n in list(F) + list(FORMAS))
    Path('/tmp/claude-0/figuras.html').parent.mkdir(parents=True, exist_ok=True)
    Path('/tmp/claude-0/figuras.html').write_text(f'<html><body style="background:#fff">{prev}</body></html>', encoding='utf-8')
