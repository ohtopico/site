"""Conteúdo das fichas de matemática adaptada.

Cada ficha tem três versões da mesma atividade, para a turma toda trabalhar o mesmo conteúdo:
  A = mais apoio (poucos itens, figuras grandes, exemplo resolvido, resposta de circular ou cobrir)
  B = apoio moderado (mais itens, exemplo, resposta escrita com apoio visual)
  C = apoio leve (números maiores, menos figuras, um problema no fim)
A versão é escolhida pelo apoio de que o estudante precisa naquele dia, e não pelo diagnóstico.
"""
from desenhos import (dinheiro, dourado, figura, grupo, icone, nome, objeto, pontilhado, quadro_dez, relogio, reta,
                      svg, uma_forma, forma, NOME_FORMA)


# ---------- peças das folhas ----------

def bloco(n, instrucao, corpo, dica=''):
    dica = f'<p class="dica">{dica}</p>' if dica else ''
    return (f'<section class="bloco"><h3 class="instrucao"><span class="num">{n}</span><span>{instrucao}</span></h3>{dica}'
            f'<div class="bloco-corpo">{corpo}</div></section>')


def grade(itens, colunas):
    return f'<div class="grade" style="--colunas:{colunas}">{"".join(itens)}</div>'


def opcoes(valores, certa=None):
    return '<div class="opcoes">' + ''.join(
        f'<span class="opcao{" texto" if isinstance(v, str) and len(v) > 3 and not v.startswith("<") else ""}{" marcada" if v == certa else ""}">{v}</span>' for v in valores) + '</div>'


def resposta(valor=None, largura=''):
    estilo = f' style="width:{largura}"' if largura else ''
    return f'<span class="resposta"{estilo}>{valor if valor is not None else ""}</span>'


def item(desenho, embaixo='', exemplo=False, classe=''):
    selo = '<span class="selo-exemplo">Exemplo</span>' if exemplo else ''
    return f'<div class="item{" exemplo" if exemplo else ""} {classe}">{selo}<div class="desenho">{desenho}</div>{embaixo}</div>'


def conta(a, op, b, valor=None):
    return f'<p class="conta">{a} {op} {b} = {resposta(valor)}</p>'


def linhas(n=2):
    return '<div class="linhas">' + '<span></span>' * n + '</div>'


def caixa_desenho(altura='34mm', rotulo=''):
    r = f'<span class="rotulo-caixa">{rotulo}</span>' if rotulo else ''
    return f'<div class="caixa-desenho" style="height:{altura}">{r}</div>'


def problema(texto, altura='30mm', resposta_txt='Resposta:'):
    return (f'<div class="problema"><p>{texto}</p>{caixa_desenho(altura, "Desenhe ou faça a conta aqui")}'
            f'<p class="resp-linha">{resposta_txt} <span class="linha-resp"></span></p></div>')


def figs(lista, tam=48, gap=10):
    """Fila de figuras diferentes (para sequências). None vira um espaço vazio para completar."""
    inner = ''
    for i, t in enumerate(lista):
        x = i * (tam + gap)
        if t is None:
            inner += f'<rect x="{x + 2}" y="2" width="{tam - 4}" height="{tam - 4}" rx="8" fill="#fff" stroke="#111" stroke-width="2" stroke-dasharray="5 4"/>'
        else:
            inner += figura(t, x, 0, tam)
    desc = 'sequência: ' + ', '.join(nome(t) if t else 'espaço vazio' for t in lista)
    return svg(len(lista) * (tam + gap) - gap, tam, inner, 'sequencia', desc)


def seq_numeros(lista):
    return '<p class="seq-num">' + ''.join(
        f'<span class="cel{" vazia" if v is None else ""}">{"" if v is None else v}</span>' for v in lista) + '</p>'


def pratos(n, k, tipo='maca'):
    """n pratos com k figuras cada (multiplicação como grupos iguais)."""
    tam, r = (42, 58) if k <= 4 else (32, 58)
    sp = 30 if k <= 4 else 25
    inner = ''
    for p in range(n):
        cx = r + p * (2 * r + 14)
        inner += f'<ellipse cx="{cx}" cy="{r}" rx="{r - 2}" ry="{r - 8}" fill="#fff" stroke="#111" stroke-width="2"/>'
        for j in range(k):
            por = 3 if k > 4 else 2
            na_linha = min(por, k - (j // por) * por)
            col, lin = j % por, j // por
            linhas_ = -(-k // por)
            fx = cx - na_linha * sp / 2 + col * sp - (tam - sp) / 2 - 1
            fy = r - linhas_ * sp / 2 + lin * sp - (tam - sp) / 2 - 2
            inner += figura(tipo, fx, fy, tam)
    return svg(n * (2 * r + 14) - 14, 2 * r, inner, 'pratos', f'{n} pratos com {k} {nome(tipo, k)} em cada')


def matriz(linhas_, colunas, tam=22):
    inner = ''.join(f'<circle cx="{c * (tam + 6) + tam / 2 + 1}" cy="{l * (tam + 6) + tam / 2 + 1}" r="{tam / 2}" fill="#fff3a8" stroke="#111" stroke-width="2"/>'
                    for l in range(linhas_) for c in range(colunas))
    return svg(colunas * (tam + 6) - 4, linhas_ * (tam + 6) - 4, inner, 'matriz', f'{linhas_} linhas com {colunas} bolinhas')


def produto(tipo, preco):
    return (f'<div class="produto">{svg(64, 64, figura(tipo, 0, 0, 64), "fig-produto", nome(tipo))}'
            f'<span class="preco">R$ {preco}</span></div>')


def tabela(cabecalho, linhas_):
    th = ''.join(f'<th>{c}</th>' for c in cabecalho)
    trs = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in l) + '</tr>' for l in linhas_)
    return f'<table class="tabela-folha"><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>'


VAZIO = resposta()


# ---------- fichas ----------

def ficha_contar():
    a = bloco(1, 'Conte as figuras. Circule o número certo.', grade([
        item(grupo('maca', 2, tam=52), opcoes([2, 4], certa=2), exemplo=True),
        item(grupo('estrela', 3, tam=52), opcoes([1, 3])),
        item(grupo('bola', 1, tam=52), opcoes([1, 5])),
        item(grupo('peixe', 4, por_linha=2, tam=52), opcoes([4, 2])),
    ], 2)) + bloco(2, 'Cubra o número com o lápis.', grade([
        item(pontilhado(n, 92), f'<div class="mini">{grupo("flor", n, por_linha=5, tam=20, gap=3)}</div>') for n in range(1, 6)
    ], 5))
    b = bloco(1, 'Conte e escreva quantos tem.', grade([
        item(grupo('maca', 3, tam=34), resposta(3), exemplo=True),
        item(grupo('estrela', 6, tam=34), VAZIO),
        item(grupo('bola', 8, tam=34), VAZIO),
        item(grupo('peixe', 5, tam=34), VAZIO),
        item(grupo('flor', 9, tam=34), VAZIO),
        item(grupo('maca', 7, tam=34), VAZIO),
    ], 3)) + bloco(2, 'Pinte as bolinhas do quadro até o número.', grade([
        item(quadro_dez(4), '<p class="legenda">4</p>', exemplo=True),
        item(quadro_dez(0), '<p class="legenda">7</p>'),
        item(quadro_dez(0), '<p class="legenda">10</p>'),
    ], 3), 'Uma bolinha em cada quadradinho, começando pela linha de cima.')
    c = bloco(1, 'Conte e escreva quantos tem.', grade([
        item(grupo('estrela', 12, tam=26, gap=5), VAZIO),
        item(grupo('bola', 15, tam=26, gap=5), VAZIO),
        item(grupo('maca', 18, tam=26, gap=5), VAZIO),
        item(grupo('peixe', 11, tam=26, gap=5), VAZIO),
    ], 2), 'Dica: as figuras estão em linhas de 5.') + bloco(2, 'Desenhe bolinhas até chegar ao número.', grade([
        item(caixa_desenho('30mm'), '<p class="legenda">6</p>'),
        item(caixa_desenho('30mm'), '<p class="legenda">13</p>'),
    ], 2)) + bloco(3, 'Qual grupo tem mais? Marque um X embaixo dele.', grade([
        item(grupo('flor', 9, tam=24, gap=5), '<span class="marcar"></span>'),
        item(grupo('flor', 12, tam=24, gap=5), '<span class="marcar"></span>'),
    ], 2))
    return dict(
        slug='contar-e-mostrar-quantidades', titulo='Contar e mostrar quantos tem', anos='1º ano',
        resumo='Contagem até 5, até 10 e até 20, com figuras, números para cobrir e o quadro de dez.',
        habilidades=[('EF01MA01', 'usar números naturais como indicador de quantidade'),
                     ('EF01MA02', 'contar de forma exata, usando pareamento e agrupamentos'),
                     ('EF01MA03', 'estimar e comparar quantidades (versão C)')],
        tempo='20 a 40 minutos', material='Tampinhas, botões ou blocos para contar; um quadro de dez desenhado ou impresso (Kit de apoio visual).',
        passos=['Comece com objetos de verdade: conte junto, tocando e afastando cada objeto contado.',
                'Mostre o exemplo resolvido da folha e faça o primeiro item junto com o estudante.',
                'Deixe as tampinhas na mesa. O estudante pode colocar uma tampinha em cima de cada figura antes de responder.',
                'Na versão B, o quadro de dez ajuda a ver o 5 e o 10 sem contar de um em um.',
                'Termine pedindo que o estudante mostre um número com os dedos ou com objetos.'],
        perfis={'down': 'Conte em voz alta junto e use o mesmo gesto para cada objeto contado. A memória visual costuma ser um ponto forte: deixe o quadro de dez à vista em todas as aulas.',
                'tea': 'Mantenha sempre a mesma ordem: exemplo, item junto, item sozinho. No nível 3 de suporte, comece só com o bloco 1 e com objetos que o estudante já gosta de manusear; no nível 1, a versão B ou C costuma funcionar com instrução por escrito.',
                'tdah': 'Dobre a folha e mostre um bloco por vez. Um item resolvido merece retorno imediato antes do próximo.'},
        gabarito={'A': 'Bloco 1: 3, 1, 4.',
                  'B': 'Bloco 1: 6, 8, 5, 9, 7. Bloco 2: 7 e 10 bolinhas pintadas.',
                  'C': 'Bloco 1: 12, 15, 18, 11. Bloco 3: o grupo da direita (12 flores).'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_juntar():
    a = bloco(1, 'Conte os dois grupos. Quantos ficam juntos? Circule.', grade([
        item(grupo('maca', 1, tam=50) + '<b class="mais">+</b>' + grupo('maca', 1, tam=50), opcoes([2, 3], certa=2), exemplo=True, classe='largo'),
        item(grupo('estrela', 2, tam=50) + '<b class="mais">+</b>' + grupo('estrela', 1, tam=50), opcoes([3, 5]), classe='largo'),
        item(grupo('bola', 2, tam=50) + '<b class="mais">+</b>' + grupo('bola', 2, tam=50), opcoes([2, 4]), classe='largo'),
        item(grupo('peixe', 3, tam=50) + '<b class="mais">+</b>' + grupo('peixe', 2, tam=50), opcoes([5, 4]), classe='largo'),
    ], 1), 'Use tampinhas: monte os dois grupos na mesa e depois empurre tudo para o meio.')
    b = bloco(1, 'Conte e escreva o resultado.', grade([
        item(grupo('flor', 3, tam=30) + '<b class="mais">+</b>' + grupo('flor', 2, tam=30), conta(3, '+', 2, 5), exemplo=True),
        item(grupo('maca', 4, tam=30) + '<b class="mais">+</b>' + grupo('maca', 3, tam=30), conta(4, '+', 3)),
        item(grupo('estrela', 5, tam=30) + '<b class="mais">+</b>' + grupo('estrela', 4, tam=30, por_linha=4), conta(5, '+', 4)),
        item(grupo('bola', 6, tam=30, por_linha=3) + '<b class="mais">+</b>' + grupo('bola', 2, tam=30), conta(6, '+', 2)),
    ], 2)) + bloco(2, 'Use a reta. Comece no primeiro número e pule para a frente.',
                   item(reta(0, 10, 640, saltos=[(4, 7)], destaque=(4, 7)), conta(4, '+', 3, 7), exemplo=True) +
                   grade([item(reta(0, 10, 300), conta(5, '+', 2)), item(reta(0, 10, 300), conta(2, '+', 6))], 2))
    c = bloco(1, 'Resolva. Se quiser, desenhe bolinhas ao lado.', grade([
        conta(8, '+', 5), conta(9, '+', 6), conta(7, '+', 7), conta(6, '+', 5), conta(12, '+', 4), conta(10, '+', 8)
    ], 2)) + bloco(2, 'Leia e resolva.', grade([
        problema('Ana tinha <b>7</b> figurinhas e ganhou mais <b>5</b>. Com quantas figurinhas ela ficou?'),
        problema('Lucas tem <b>9</b> bolinhas de gude. O primo deu mais <b>6</b>. Quantas bolinhas Lucas tem agora?'),
    ], 2)) + bloco(3, 'Complete com o número que falta.', grade([
        conta(5, '+', resposta(), 8).replace('= <span class="resposta">8</span>', '= 8'),
        conta(resposta(), '+', 4, 10).replace('= <span class="resposta">10</span>', '= 10'),
    ], 2))
    return dict(
        slug='juntar-quantidades-adicao', titulo='Juntar quantidades: adição com figuras', anos='1º ano',
        resumo='Adição com o significado de juntar, com figuras, reta numérica e problemas curtos.',
        habilidades=[('EF01MA06', 'construir fatos básicos da adição'),
                     ('EF01MA08', 'resolver problemas de juntar e acrescentar, com imagens e material manipulável')],
        tempo='30 a 45 minutos', material='Tampinhas de duas cores, uma reta numérica no chão com fita crepe ou a reta do Kit de apoio visual.',
        passos=['Monte dois grupos de objetos de cores diferentes e pergunte quantos há em cada um.',
                'Junte os grupos e conte tudo de novo. Depois, mostre que dá para continuar contando a partir do maior grupo.',
                'Faça o exemplo da folha com o estudante, falando a frase completa: "dois mais um é igual a três".',
                'Na reta numérica, deixe o estudante pular com o dedo ou com o corpo, se a reta estiver no chão.',
                'Na versão C, peça que conte como pensou antes de corrigir.'],
        perfis={'down': 'Repita a mesma frase da conta todas as vezes e use objetos antes da figura. Totais até 5 na versão A dão segurança; avance quando o estudante acertar sem contar tudo de novo.',
                'tea': 'Os dois grupos sempre do mesmo lado (primeiro à esquerda) ajudam na previsibilidade. Evite trocar o contexto do problema no meio da atividade. No nível 2 e 3 de suporte, prefira apontar a resposta a escrever.',
                'tdah': 'Use a reta no chão para dar movimento à conta. Combine quantos itens serão feitos antes de começar e risque cada um quando terminar.'},
        gabarito={'A': '3, 4, 5.', 'B': 'Bloco 1: 7, 9, 8. Bloco 2: 7 e 8.',
                  'C': 'Bloco 1: 13, 15, 14, 11, 16, 18. Bloco 2: 12 figurinhas; 15 bolinhas. Bloco 3: 3 e 6.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_tirar():
    a = bloco(1, 'Risque as figuras pedidas. Quantas sobraram? Circule.', grade([
        item(grupo('maca', 3, tam=52, riscadas=1), '<p class="legenda">Risque 1</p>' + opcoes([2, 3], certa=2), exemplo=True),
        item(grupo('estrela', 4, tam=52), '<p class="legenda">Risque 1</p>' + opcoes([3, 1])),
        item(grupo('bola', 5, tam=52), '<p class="legenda">Risque 2</p>' + opcoes([2, 3])),
        item(grupo('peixe', 3, tam=52), '<p class="legenda">Risque 2</p>' + opcoes([1, 3])),
    ], 2), 'Antes da folha, tire objetos de verdade de cima da mesa e guarde numa caixinha.')
    b = bloco(1, 'Risque e escreva quantos sobraram.', grade([
        item(grupo('flor', 7, tam=30, riscadas=3), '<p class="legenda">Risque 3</p>' + conta(7, '−', 3, 4), exemplo=True),
        item(grupo('maca', 8, tam=30, por_linha=4), '<p class="legenda">Risque 2</p>' + conta(8, '−', 2)),
        item(grupo('estrela', 9, tam=30), '<p class="legenda">Risque 4</p>' + conta(9, '−', 4)),
        item(grupo('bola', 10, tam=30), '<p class="legenda">Risque 3</p>' + conta(10, '−', 3)),
    ], 2)) + bloco(2, 'Use a reta. Comece no primeiro número e pule para trás.',
                   item(reta(0, 10, 640, saltos=[(9, 6)], destaque=(9, 6)), conta(9, '−', 3, 6), exemplo=True) +
                   grade([item(reta(0, 10, 300), conta(7, '−', 4)), item(reta(0, 10, 300), conta(6, '−', 5))], 2))
    c = bloco(1, 'Resolva. Se quiser, use a reta numérica.', grade([
        conta(15, '−', 6), conta(13, '−', 5), conta(12, '−', 8), conta(18, '−', 9), conta(20, '−', 7), conta(16, '−', 10)
    ], 2)) + item(reta(0, 20, 660), '') + bloco(2, 'Leia e resolva.', grade([
        problema('Havia <b>14</b> balões na festa. <b>6</b> estouraram. Quantos balões sobraram?'),
        problema('Mariana tinha <b>12</b> reais e gastou <b>5</b> reais. Quanto dinheiro sobrou?'),
    ], 2))
    return dict(
        slug='tirar-e-ver-quantos-sobram-subtracao', titulo='Tirar e ver quantos sobram: subtração', anos='1º ano',
        resumo='Subtração com o significado de retirar: riscar figuras, pular para trás na reta e resolver problemas.',
        habilidades=[('EF01MA08', 'resolver problemas de separar e retirar, com imagens e material manipulável')],
        tempo='30 a 45 minutos', material='Tampinhas e uma caixinha para guardar as que saem; reta numérica de 0 a 20 (Kit de apoio visual).',
        passos=['Coloque objetos na mesa, conte junto, guarde alguns na caixinha e pergunte quantos ficaram.',
                'Mostre que riscar a figura é o mesmo que guardar o objeto na caixinha.',
                'Faça o exemplo com o estudante. Na versão A, ele só risca e circula.',
                'Na reta, o pulo para trás vem depois de muitos pulos para a frente: se o estudante ainda confunde a direção, volte à ficha de adição.',
                'Na versão C, peça que confira a resposta com uma adição (8 + 7 = 15).'],
        perfis={'down': 'Riscar é mais concreto do que calcular: comece por aí e só depois mostre a conta escrita. Use sempre a palavra "sobraram" com o mesmo gesto.',
                'tea': 'Diga exatamente quantas figuras riscar e mostre onde começar (da direita para a esquerda, sempre igual). Se riscar a figura incomodar o estudante, use uma tampinha em cima no lugar do risco.',
                'tdah': 'Problemas curtos, com os números em negrito, ajudam a não perder a informação. Peça que circule os números antes de resolver.'},
        gabarito={'A': '3, 3, 1.', 'B': 'Bloco 1: 6, 5, 7. Bloco 2: 3 e 1.',
                  'C': 'Bloco 1: 9, 8, 4, 9, 13, 6. Bloco 2: 8 balões; 7 reais.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_dezenas():
    a = bloco(1, 'Cada barra vale 10. Cada cubinho vale 1. Circule o número.', grade([
        item(dourado(1, 3, 11), opcoes([13, 31], certa=13), exemplo=True),
        item(dourado(1, 2, 11), opcoes([12, 21])),
        item(dourado(2, 0, 11), opcoes([2, 20])),
        item(dourado(1, 5, 11), opcoes([15, 6])),
    ], 2), 'Conte primeiro as barras: dez, vinte... Depois continue com os cubinhos: onze, doze...')
    b = bloco(1, 'Conte as barras e os cubinhos. Escreva o número.', grade([
        item(dourado(2, 4, 8), f'<p class="du">{resposta(2)} dezenas e {resposta(4)} unidades = {resposta(24)}</p>', exemplo=True),
        item(dourado(3, 1, 8), f'<p class="du">{VAZIO} dezenas e {VAZIO} unidades = {VAZIO}</p>'),
        item(dourado(1, 8, 8), f'<p class="du">{VAZIO} dezenas e {VAZIO} unidades = {VAZIO}</p>'),
        item(dourado(4, 0, 8), f'<p class="du">{VAZIO} dezenas e {VAZIO} unidades = {VAZIO}</p>'),
    ], 2)) + bloco(2, 'Desenhe barras e cubinhos para mostrar o número.', grade([
        item(caixa_desenho('34mm'), '<p class="legenda">23</p>'),
        item(caixa_desenho('34mm'), '<p class="legenda">35</p>'),
    ], 2), 'Barra: um traço comprido. Cubinho: um quadradinho.')
    c = bloco(1, 'Complete o quadro.', tabela(['Número', 'Dezenas', 'Unidades', 'Decomposição'], [
        ['<b>47</b>', '4', '7', '40 + 7'], ['<b>62</b>', '', '', ''], ['<b>85</b>', '', '', ''], ['<b>90</b>', '', '', ''], ['<b>39</b>', '', '', '']
    ]), 'A primeira linha é o exemplo.') + bloco(2, 'Compare. Escreva &gt; (maior), &lt; (menor) ou = (igual).', grade([
        f'<p class="conta">38 {VAZIO} 83</p>', f'<p class="conta">56 {VAZIO} 65</p>', f'<p class="conta">70 {VAZIO} 69</p>', f'<p class="conta">44 {VAZIO} 44</p>'
    ], 2)) + bloco(3, 'Escreva do menor para o maior.', f'<p class="conta">45 · 54 · 15 · 51</p>' + linhas(1))
    return dict(
        slug='dezenas-e-unidades-material-dourado', titulo='Dezenas e unidades com material dourado', anos='1º e 2º ano',
        resumo='Valor posicional com barras e cubinhos: contar, desenhar, decompor e comparar números de dois algarismos.',
        habilidades=[('EF01MA07', 'compor e decompor números de até duas ordens com material manipulável'),
                     ('EF02MA01', 'comparar e ordenar números pelo valor posicional (versão C)')],
        tempo='40 a 50 minutos', material='Material dourado. Se a escola não tiver, use palitos de picolé amarrados de 10 em 10 com elástico e palitos soltos.',
        passos=['Forme uma barra de 10 com o estudante: conte 10 cubinhos ou palitos e troque pela barra ou pelo amarradinho.',
                'Mostre que a barra "guarda" dez. Conte as barras de dez em dez e depois os cubinhos de um em um.',
                'Faça o exemplo da folha montando o mesmo número com o material.',
                'Na versão B, o estudante desenha o que montou na mesa.',
                'Na versão C, o material fica disponível para conferir as comparações.'],
        perfis={'down': 'A troca de 10 cubinhos por uma barra precisa ser feita muitas vezes com as mãos antes do papel. Use cores diferentes para dezena e unidade no caderno, se ajudar.',
                'tea': 'Mostre a regra de forma visual e fixa: barras sempre à esquerda, cubinhos à direita. Alguns estudantes autistas gostam de organizar o material em fileiras: aproveite isso para contar.',
                'tdah': 'O material dourado mantém as mãos ocupadas com a própria tarefa. Dê o material só para o item da vez e recolha antes do próximo.'},
        gabarito={'A': '12, 20, 15.', 'B': 'Bloco 1: 3 e 1 = 31; 1 e 8 = 18; 4 e 0 = 40.',
                  'C': 'Bloco 1: 62 = 6 e 2, 60 + 2; 85 = 8 e 5, 80 + 5; 90 = 9 e 0, 90 + 0; 39 = 3 e 9, 30 + 9. Bloco 2: &lt;, &lt;, &gt;, =. Bloco 3: 15, 45, 51, 54.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_dinheiro():
    a = bloco(1, 'Quanto custa? Circule o dinheiro certo.', grade([
        item(produto('banana', 1), opcoes([dinheiro([1]), dinheiro([5])], certa=dinheiro([1])), exemplo=True, classe='linha-produto'),
        item(produto('pao', 2), opcoes([dinheiro([10]), dinheiro([2])]), classe='linha-produto'),
        item(produto('suco', 5), opcoes([dinheiro([5]), dinheiro([1])]), classe='linha-produto'),
    ], 1), 'Use dinheiro de brincadeira e monte uma feirinha na sala antes da folha.')
    b = bloco(1, 'Quanto dinheiro tem? Escreva.', grade([
        item(dinheiro([2, 2, 1]), f'<p class="du">R$ {resposta(5)}</p>', exemplo=True),
        item(dinheiro([5, 2]), f'<p class="du">R$ {VAZIO}</p>'),
        item(dinheiro([10, 5]), f'<p class="du">R$ {VAZIO}</p>'),
        item(dinheiro([1, 1, 1, 2]), f'<p class="du">R$ {VAZIO}</p>'),
    ], 2)) + bloco(2, 'Você tem R$ 10. Dá para comprar? Circule SIM ou NÃO.', grade([
        item(produto('leite', 8), opcoes(['SIM', 'NÃO'])),
        item(produto('suco', 12), opcoes(['SIM', 'NÃO'])),
        item(produto('pao', 10), opcoes(['SIM', 'NÃO'])),
        item(produto('ovo', 15), opcoes(['SIM', 'NÃO'])),
    ], 2))
    c = bloco(1, 'Qual é o troco?', tabela(['Comprou', 'Pagou com', 'Troco'], [
        ['Maçã, R$ 3', 'R$ 5', 'R$ 2'], ['Suco, R$ 7', 'R$ 10', 'R$ '], ['Leite, R$ 12', 'R$ 20', 'R$ '], ['Pão, R$ 6', 'R$ 10', 'R$ ']
    ]), 'A primeira linha é o exemplo.') + bloco(2, 'Lista de compras: quanto vai gastar ao todo?',
        grade([produto('leite', 4), produto('pao', 6), produto('ovo', 8)], 3) + f'<p class="conta">4 + 6 + 8 = {VAZIO}</p>') + bloco(
        3, 'Desenhe duas formas diferentes de pagar R$ 17.', grade([caixa_desenho('30mm', 'Forma 1'), caixa_desenho('30mm', 'Forma 2')], 2),
        'Pode usar moedas de R$ 1 e cédulas de R$ 2, R$ 5 e R$ 10.')
    return dict(
        slug='na-feira-moedas-e-cedulas', titulo='Na feira: moedas e cédulas', anos='1º e 2º ano',
        resumo='Sistema monetário em situações da feira: reconhecer valores, somar dinheiro, decidir se dá para comprar e calcular o troco.',
        habilidades=[('EF01MA19', 'reconhecer e relacionar valores de moedas e cédulas'),
                     ('EF02MA20', 'estabelecer a equivalência de valores entre moedas e cédulas')],
        tempo='40 a 50 minutos', material='Dinheiro de brincadeira (ou cédulas impressas e recortadas), embalagens vazias com etiquetas de preço.',
        passos=['Monte uma feirinha com embalagens vazias e preços inteiros e simples (R$ 1, R$ 2, R$ 5).',
                'Faça compras com o estudante: ele escolhe, você diz o preço, ele procura a cédula ou moeda.',
                'Depois, faça o exemplo da folha. As figuras do dinheiro são simplificadas: compare com o dinheiro de brincadeira.',
                'Na versão B, pergunte se sobra ou se falta dinheiro antes de responder SIM ou NÃO.',
                'Na versão C, o troco pode ser calculado "contando para a frente" a partir do preço.'],
        perfis={'down': 'É uma habilidade de vida diária, então vale repetir em contextos reais (cantina, mercado da escola). Comece reconhecendo uma cédula por vez.',
                'tea': 'Antecipe a feirinha: mostre os produtos e os preços antes de começar, e mantenha os mesmos preços até a habilidade estar firme. Interesses do estudante (um brinquedo, um lanche preferido) funcionam como produto.',
                'tdah': 'A feirinha com papéis (quem vende, quem compra) dá movimento e motivo para fazer a conta. Troque os papéis a cada compra.'},
        gabarito={'A': 'Pão: R$ 2. Suco: R$ 5.', 'B': 'Bloco 1: R$ 7, R$ 15, R$ 5. Bloco 2: SIM, NÃO, SIM, NÃO.',
                  'C': 'Bloco 1: R$ 3, R$ 8, R$ 4. Bloco 2: R$ 18. Bloco 3: por exemplo 10 + 5 + 2 e 10 + 5 + 1 + 1.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_horas():
    a = bloco(1, 'O que acontece em cada parte do dia? Ligue.', '<div class="ligar">' + ''.join(
        f'<div class="ligar-par"><span class="ligar-lado">{icone(i, 72, r)}<b>{r}</b></span><span class="ponto"></span>'
        f'<span></span><span class="ponto"></span><span class="ligar-lado direita">{icone(j, 72, s)}<b>{s}</b></span></div>'
        for (i, r), (j, s) in [(('sol', 'manhã'), ('lua', 'dormir')), (('prato', 'tarde'), ('escola', 'ir para a escola')), (('lua', 'noite'), ('prato', 'almoçar'))]
    ) + '</div>', 'As respostas dependem da rotina do estudante: converse antes. A ordem das figuras da direita está misturada.') + bloco(
        2, 'Primeiro, depois. Numere 1, 2 e 3.', grade([
            item(icone('sol', 70, 'acordar'), '<p class="legenda">acordar</p>' + resposta()),
            item(icone('lua', 70, 'dormir'), '<p class="legenda">dormir</p>' + resposta()),
            item(icone('banho', 70, 'tomar banho'), '<p class="legenda">tomar banho</p>' + resposta()),
        ], 3))
    b = bloco(1, 'Que horas são? Escreva.', grade([
        item(relogio(8, 0, 120), f'<p class="du">{resposta(8)} horas</p>', exemplo=True),
        item(relogio(12, 0, 120), f'<p class="du">{VAZIO} horas</p>'),
        item(relogio(3, 0, 120), f'<p class="du">{VAZIO} horas</p>'),
        item(relogio(6, 0, 120), f'<p class="du">{VAZIO} horas</p>'),
    ], 4), 'O ponteiro pequeno mostra a hora. Quando o ponteiro grande está no 12, a hora é "em ponto".') + bloco(
        2, 'Desenhe o ponteiro pequeno.', grade([
            item(relogio(None, 0, 120, so_minuto=True), '<p class="legenda">9 horas</p>'),
            item(relogio(None, 0, 120, so_minuto=True), '<p class="legenda">2 horas</p>'),
            item(relogio(None, 0, 120, so_minuto=True), '<p class="legenda">11 horas</p>'),
        ], 3)) + bloco(3, 'Que horas você...', tabela(['Momento', 'Hora'], [['Acorda', ''], ['Almoça', ''], ['Dorme', '']]))
    c = bloco(1, 'Escreva a hora como no relógio digital.', grade([
        item(relogio(7, 30, 112), '<p class="digital">07:30</p>', exemplo=True),
        item(relogio(10, 0, 112), '<p class="digital">__ : __</p>'),
        item(relogio(2, 30, 112), '<p class="digital">__ : __</p>'),
        item(relogio(11, 30, 112), '<p class="digital">__ : __</p>'),
    ], 4), 'Ponteiro grande no 6: são "e meia" (30 minutos).') + bloco(2, 'Quanto tempo durou?', grade([
        problema('A aula de Educação Física começou às <b>8 horas</b> e terminou às <b>10 horas</b>. Quanto tempo durou?', '18mm'),
        problema('O filme começou às <b>3 horas</b> da tarde e durou <b>2 horas</b>. A que horas terminou?', '18mm'),
    ], 2)) + bloco(3, 'Desenhe os dois ponteiros.', grade([
        item(relogio(None, 0, 110, rotulo='relógio sem ponteiros'), '<p class="legenda">4:00</p>'),
        item(relogio(None, 0, 110, rotulo='relógio sem ponteiros'), '<p class="legenda">9:30</p>'),
    ], 2))
    return dict(
        slug='rotina-e-horas-do-dia', titulo='Rotina e horas do dia', anos='1º ao 3º ano',
        resumo='Partes do dia e sequência da rotina, horas em ponto, horas e meia e duração de atividades.',
        habilidades=[('EF01MA16', 'relatar a sequência de acontecimentos de um dia'),
                     ('EF01MA17', 'reconhecer e relacionar períodos do dia'),
                     ('EF02MA19', 'medir a duração de um intervalo de tempo com relógio (versão C)'),
                     ('EF03MA22', 'ler e registrar horários de início e término (versão C)')],
        tempo='30 a 45 minutos', material='Um relógio de ponteiros de verdade ou de papelão com ponteiros de prender com colchete; a agenda visual da turma, se houver.',
        passos=['Comece pela rotina do próprio estudante: o que fez hoje antes de vir para a escola, o que vai fazer depois.',
                'Na versão A, as respostas do bloco 1 são conversadas. Não existe uma única resposta certa para a rotina de cada criança.',
                'Antes da versão B, gire o ponteiro pequeno no relógio de papelão e leia as horas em ponto juntos.',
                'Na versão C, use o relógio para contar a duração: gire o ponteiro e conte as voltas.',
                'Ligue a atividade à agenda do dia da turma, se ela existir.'],
        perfis={'down': 'Relacionar horários a fotos da própria rotina (lanche, recreio, saída) dá sentido à leitura das horas. Comece só com o ponteiro pequeno.',
                'tea': 'A agenda visual costuma ser parte da rotina de estudantes autistas: use as mesmas figuras da agenda da turma, se houver. No nível 3 de suporte, trabalhe só o "primeiro e depois" (bloco 2 da versão A), com cartões do Kit de apoio visual.',
                'tdah': 'Um timer visível na mesa conecta a duração com a experiência. Use-o para combinar o tempo da própria folha.'},
        gabarito={'A': 'Bloco 1: conversado com cada estudante (manhã: ir para a escola; tarde: almoçar; noite: dormir é uma possibilidade). Bloco 2: acordar 1, tomar banho 2 (ou 3), dormir 3.',
                  'B': 'Bloco 1: 12, 3, 6 horas. Bloco 2: ponteiro pequeno no 9, no 2 e no 11.',
                  'C': 'Bloco 1: 10:00, 02:30 (ou 14:30), 11:30. Bloco 2: 2 horas; 5 horas da tarde. Bloco 3: 4:00 com o grande no 12 e o pequeno no 4; 9:30 com o grande no 6 e o pequeno entre o 9 e o 10.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_padroes():
    a = bloco(1, 'O que vem depois? Circule.', grade([
        item(figs(['estrela', 'maca', 'estrela', 'maca', None], 56), opcoes([svg(48, 48, figura('estrela', 4, 4), '', 'estrela'), svg(48, 48, figura('bola', 4, 4), '', 'bola')],
                                                                              certa=svg(48, 48, figura('estrela', 4, 4), '', 'estrela')), exemplo=True, classe='largo'),
        item(figs(['bola', 'flor', 'bola', 'flor', None], 56), opcoes([svg(48, 48, figura('peixe', 4, 4), '', 'peixe'), svg(48, 48, figura('bola', 4, 4), '', 'bola')]), classe='largo'),
        item(figs(['peixe', 'peixe', 'maca', 'peixe', 'peixe', None], 56), opcoes([svg(48, 48, figura('maca', 4, 4), '', 'maçã'), svg(48, 48, figura('peixe', 4, 4), '', 'peixe')]), classe='largo'),
    ], 1), 'Leia a sequência em voz alta, batendo palmas: estrela, maçã, estrela, maçã...') + bloco(
        2, 'Continue a sequência: desenhe no espaço vazio.', item(figs(['flor', 'bola', 'flor', 'bola', None, None], 56), classe='largo'))
    b = bloco(1, 'Desenhe a figura que falta.', grade([
        item(figs(['maca', 'bola', 'bola', 'maca', 'bola', None], 44), classe='largo'),
        item(figs(['estrela', 'flor', 'peixe', 'estrela', None, 'peixe'], 44), classe='largo'),
        item(figs(['bola', None, 'peixe', 'bola', 'peixe', 'peixe'], 44), classe='largo'),
    ], 1)) + bloco(2, 'Complete com os números que faltam.',
                   seq_numeros([1, 2, 3, None, 5, None]) + seq_numeros([2, 4, 6, None, 10, None]) + seq_numeros([10, 9, 8, None, None, 5]),
                   'Olhe o que acontece de um número para o outro.') + bloco(3, 'Crie a sua sequência com duas figuras.', caixa_desenho('26mm'))
    c = bloco(1, 'Complete e escreva a regra.', ''.join(
        seq_numeros(s) + f'<p class="regra">Regra: {"<b>de 5 em 5</b>" if i == 0 else "<span class=linha-resp></span>"}</p>'
        for i, s in enumerate([[5, 10, 15, None, None, 30], [3, 6, 9, None, None, None], [20, 18, 16, None, None, None], [1, 2, 4, 7, 11, None]])),
        'A primeira é o exemplo. A última é um desafio: a diferença muda a cada passo.') + bloco(
        2, 'Quantos quadradinhos terá a próxima figura? Desenhe.', svg(560, 110, ''.join(
            f'<rect x="{10 + p * 150 + c * 22}" y="{88 - l * 22}" width="20" height="20" fill="#fff3a8" stroke="#111" stroke-width="2"/>'
            for p, n in enumerate([1, 2, 3]) for l in range(n) for c in range(n if l == 0 else 1)) +
            '<rect x="460" y="4" width="96" height="104" rx="8" fill="#fff" stroke="#111" stroke-width="2" stroke-dasharray="5 4"/>',
            'figura', 'sequência de figuras em L com 1, 3 e 5 quadradinhos') + f'<p class="du">Figura 4: {VAZIO} quadradinhos</p>')
    return dict(
        slug='sequencias-e-padroes', titulo='Sequências e padrões', anos='1º e 2º ano',
        resumo='Padrões de repetição com figuras e sequências numéricas: descobrir o que falta e explicar a regra.',
        habilidades=[('EF01MA10', 'descrever os elementos ausentes em sequências de números, objetos ou figuras'),
                     ('EF02MA10', 'descrever o padrão de sequências repetitivas e recursivas'),
                     ('EF02MA11', 'descrever os elementos ausentes em sequências repetitivas e recursivas')],
        tempo='20 a 40 minutos', material='Blocos de montar, contas de colar ou tampinhas de duas ou três cores.',
        passos=['Monte uma sequência com objetos (vermelho, azul, vermelho, azul) e pergunte qual vem depois.',
                'Leia a sequência em voz alta com ritmo, batendo palmas ou na mesa. O ritmo ajuda a perceber a repetição.',
                'Faça o exemplo da folha e depois deixe o estudante montar a próxima sequência com objetos antes de desenhar.',
                'Na versão B e C, peça que o estudante explique a regra com as próprias palavras.',
                'Termine com o estudante criando uma sequência para um colega descobrir.'],
        perfis={'down': 'Padrões com objetos e ritmo (palmas, sons) ajudam a memória. Aumente de AB para ABB só quando o AB estiver seguro.',
                'tea': 'Muitos estudantes autistas têm facilidade com padrões: aproveite como ponto de partida e para valorizar o que o estudante já faz bem. Use objetos do interesse dele para montar as sequências.',
                'tdah': 'Transforme em desafio rápido: você monta, o estudante completa, e depois trocam. Rodadas curtas funcionam melhor que uma folha longa.'},
        gabarito={'A': 'Bloco 1: bola; maçã. Bloco 2: flor, bola.', 'B': 'Bloco 1: bola; flor; peixe. Bloco 2: 4 e 6; 8 e 12; 7 e 6.',
                  'C': 'Bloco 1: 20 e 25; 12, 15 e 18 (de 3 em 3); 14, 12 e 10 (diminui 2); 16 (soma 1, 2, 3, 4, 5). Bloco 2: 7 quadradinhos.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_formas():
    def cena():
        pecas = [('circulo', 50, 50, 0), ('quadrado', 150, 60, 20), ('triangulo', 260, 50, 0), ('retangulo', 390, 55, 0), ('circulo', 520, 60, 0),
                 ('triangulo', 70, 160, 180), ('quadrado', 190, 165, 0), ('circulo', 300, 170, 0), ('triangulo', 420, 165, 30), ('quadrado', 540, 170, 45),
                 ('retangulo', 110, 260, 90), ('circulo', 230, 265, 0), ('triangulo', 340, 265, 0), ('retangulo', 480, 265, 15)]
        return svg(600, 310, ''.join(forma(t, x, y, 56, r) for t, x, y, r in pecas), 'cena', 'várias formas misturadas: círculos, quadrados, triângulos e retângulos')

    a = bloco(1, 'Circule a forma igual à primeira.', grade([
        item(uma_forma('circulo', 54) + '<b class="mais">→</b>' + opcoes([uma_forma('circulo', 38), uma_forma('triangulo', 38)],
                                                                          certa=uma_forma('circulo', 38)), exemplo=True, classe='largo'),
        item(uma_forma('quadrado', 54) + '<b class="mais">→</b>' + opcoes([uma_forma('circulo', 38), uma_forma('quadrado', 38, 20)]), classe='largo'),
        item(uma_forma('triangulo', 54) + '<b class="mais">→</b>' + opcoes([uma_forma('triangulo', 38, 180), uma_forma('quadrado', 38)]), classe='largo'),
    ], 1), 'Antes, deixe o estudante pegar blocos com essas formas e contornar com o dedo.') + bloco(
        2, 'Cubra o contorno com o lápis.', grade([
            item(svg(130, 130, f'<circle cx="65" cy="65" r="55" fill="none" stroke="#7a7a7a" stroke-width="2.5" stroke-dasharray="4 5"/>', 'forma', 'círculo pontilhado'), '<p class="legenda">círculo</p>'),
            item(svg(130, 130, f'<rect x="12" y="12" width="106" height="106" fill="none" stroke="#7a7a7a" stroke-width="2.5" stroke-dasharray="4 5"/>', 'forma', 'quadrado pontilhado'), '<p class="legenda">quadrado</p>'),
            item(svg(130, 130, f'<polygon points="65,10 122,118 8,118" fill="none" stroke="#7a7a7a" stroke-width="2.5" stroke-dasharray="4 5"/>', 'forma', 'triângulo pontilhado'), '<p class="legenda">triângulo</p>'),
        ], 3))
    b = bloco(1, 'Pinte: círculos de amarelo, quadrados de verde, triângulos de vermelho e retângulos de laranja.', cena()) + bloco(
        2, 'Conte e escreva quantas formas de cada tipo.', tabela(['Forma', 'Quantas?'], [
            [uma_forma('circulo', 22) + ' círculo', ''], [uma_forma('quadrado', 22) + ' quadrado', ''],
            [uma_forma('triangulo', 22) + ' triângulo', ''], [uma_forma('retangulo', 22) + ' retângulo', '']]), 'Marque cada forma com um pontinho quando contar.')
    c = bloco(1, 'Com que forma cada objeto se parece? Escreva.', grade([
        item(objeto(t, 78), '<p class="legenda">' + linhas(1) + '</p>') for t in ['roda', 'janela', 'placa', 'porta', 'pizza', 'envelope']
    ], 6)) + bloco(2, 'Conte os lados e os cantos (vértices).', tabela(['Forma', 'Lados', 'Cantos'], [
        [uma_forma('triangulo', 22) + ' triângulo', '', ''], [uma_forma('quadrado', 22) + ' quadrado', '', ''],
        [uma_forma('retangulo', 22) + ' retângulo', '', ''], [uma_forma('circulo', 22) + ' círculo', '', '']])) + bloco(
        3, 'Desenhe uma casa usando 1 retângulo, 2 quadrados e 1 triângulo.', caixa_desenho('52mm'))
    return dict(
        slug='formas-no-dia-a-dia', titulo='Formas no dia a dia', anos='1º e 2º ano',
        resumo='Círculo, quadrado, triângulo e retângulo: reconhecer, contornar, contar e encontrar as formas em objetos.',
        habilidades=[('EF01MA14', 'identificar e nomear figuras planas em diferentes disposições'),
                     ('EF02MA15', 'reconhecer, comparar e nomear figuras planas por características comuns')],
        tempo='30 a 45 minutos', material='Blocos lógicos ou formas recortadas em papelão; objetos da sala (relógio, porta, caderno).',
        passos=['Passeie pela sala procurando formas: o relógio, a porta, a janela, o quadro.',
                'Deixe o estudante contornar com o dedo as bordas de blocos lógicos e dizer o nome da forma.',
                'Na versão A, comece pelo contorno pontilhado com o bloco ao lado, para comparar.',
                'Na versão B, ofereça só as quatro cores pedidas, para a tarefa não virar pintura livre.',
                'Na versão C, use os blocos para contar os lados e cantos antes de escrever.'],
        perfis={'down': 'Toque e nomeie: cada forma com seu nome falado em voz alta, sempre o mesmo. A versão A pede só reconhecer, sem escrever.',
                'tea': 'Formas giradas podem confundir no início: mostre o bloco girando na mão e dizendo que continua sendo a mesma forma. Se o excesso de figuras da versão B for demais, cubra metade da cena com uma folha.',
                'tdah': 'Busca de formas pela sala antes da folha gasta energia de forma útil. Na cena da versão B, peça uma forma por vez (primeiro todos os círculos).'},
        gabarito={'A': 'Quadrado: o segundo. Triângulo: o primeiro.',
                  'B': 'Bloco 2: 4 círculos, 3 quadrados, 4 triângulos, 3 retângulos.',
                  'C': 'Bloco 1: círculo, quadrado, triângulo, retângulo, triângulo, retângulo. Bloco 2: 3 e 3; 4 e 4; 4 e 4; o círculo não tem lados retos nem cantos.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_multiplicar():
    a = bloco(1, 'Conte as maçãs dos pratos. Quantas ao todo? Circule.', grade([
        item(pratos(2, 2), f'<p class="conta">2 + 2</p>' + opcoes([4, 3], certa=4), exemplo=True, classe='largo'),
        item(pratos(3, 2), f'<p class="conta">2 + 2 + 2</p>' + opcoes([5, 6]), classe='largo'),
        item(pratos(2, 3, 'estrela'), f'<p class="conta">3 + 3</p>' + opcoes([6, 4]), classe='largo'),
    ], 1), 'Use pratinhos de papel e tampinhas: coloque a mesma quantidade em cada prato.')
    b = bloco(1, 'Grupos iguais. Complete.', grade([
        item(pratos(3, 4), f'<p class="du">4 + 4 + 4 = {resposta(12)}</p><p class="du">3 grupos de 4 = 3 × 4 = {resposta(12)}</p>', exemplo=True),
        item(pratos(4, 2, 'bola'), f'<p class="du">2 + 2 + 2 + 2 = {VAZIO}</p><p class="du">4 × 2 = {VAZIO}</p>'),
        item(pratos(2, 5, 'flor'), f'<p class="du">5 + 5 = {VAZIO}</p><p class="du">2 × 5 = {VAZIO}</p>'),
        item(pratos(3, 3, 'peixe'), f'<p class="du">3 + 3 + 3 = {VAZIO}</p><p class="du">3 × 3 = {VAZIO}</p>'),
    ], 2)) + bloco(2, 'Quantas bolinhas? Conte as linhas e as colunas.', grade([
        item(matriz(3, 5), f'<p class="du">3 linhas de 5 = {VAZIO}</p>'),
        item(matriz(2, 4), f'<p class="du">2 linhas de 4 = {VAZIO}</p>'),
    ], 2))
    c = bloco(1, 'Complete as tabuadas.', tabela(['×', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], [
        ['<b>2</b>', '2', '4', '', '', '', '', '', '', '', ''], ['<b>5</b>', '5', '', '', '', '', '', '', '', '', ''], ['<b>10</b>', '10', '', '', '', '', '', '', '', '', '']
    ]), 'Pule de 2 em 2, de 5 em 5 e de 10 em 10.') + bloco(2, 'Leia e resolva.', grade([
        problema('Na sala há <b>4</b> caixas com <b>5</b> lápis em cada uma. Quantos lápis há ao todo?', '24mm'),
        problema('Cada pacote tem <b>10</b> figurinhas. Comprei <b>3</b> pacotes. Quantas figurinhas eu tenho?', '24mm'),
    ], 2)) + bloco(3, 'Desenhe 4 linhas com 3 bolinhas em cada uma. Quantas bolinhas são?',
                   caixa_desenho('32mm') + f'<p class="du">4 × 3 = {VAZIO}</p>')
    return dict(
        slug='grupos-iguais-multiplicacao', titulo='Grupos iguais: começando a multiplicar', anos='2º e 3º ano',
        resumo='Multiplicação como soma de grupos iguais e como disposição em linhas e colunas, com pratos, bolinhas e problemas.',
        habilidades=[('EF02MA07', 'resolver problemas de multiplicação por 2, 3, 4 e 5 com a ideia de adição de parcelas iguais'),
                     ('EF03MA07', 'resolver problemas de multiplicação com parcelas iguais e disposição retangular (versão C)')],
        tempo='40 a 50 minutos', material='Pratinhos ou potes e tampinhas; uma caixa de ovos (2 linhas de 6) para mostrar linhas e colunas.',
        passos=['Distribua a mesma quantidade de tampinhas em cada pratinho e pergunte quantas há ao todo.',
                'Escreva a soma (2 + 2 + 2) e só depois mostre que "3 grupos de 2" é o mesmo que 3 × 2.',
                'Na versão A, o estudante só conta e circula. Não é preciso usar o sinal ×.',
                'Na versão B, mostre a caixa de ovos antes do bloco 2: linhas e colunas.',
                'Na versão C, deixe a tabuada como apoio na mesa, sem exigir memorização.'],
        perfis={'down': 'A multiplicação faz sentido como "grupos iguais" muito antes da tabuada. Mantenha a soma escrita ao lado do sinal ×, por bastante tempo.',
                'tea': 'Linhas e colunas bem alinhadas facilitam a contagem. Diga com clareza que × e "grupos de" significam a mesma coisa, sem trocar de palavra no meio.',
                'tdah': 'Use a tabela da versão C como desafio de tempo curto, contra o próprio tempo do estudante, e não contra os colegas.'},
        gabarito={'A': '6, 6.', 'B': 'Bloco 1: 8 e 8; 10 e 10; 9 e 9. Bloco 2: 15; 8.',
                  'C': 'Bloco 1: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20; 5, 10, 15, 20, 25, 30, 35, 40, 45, 50; 10, 20, ..., 100. Bloco 2: 20 lápis; 30 figurinhas. Bloco 3: 12.'},
        versoes={'A': a, 'B': b, 'C': c})


def ficha_kit():
    reta20 = reta(0, 20, 690, destaque=(0, 5, 10, 15, 20))
    f1 = ('<p class="intro-folha">Recorte e cole na mesa ou no caderno. Pode plastificar ou cobrir com fita larga para usar com caneta de quadro branco.</p>'
          + bloco(1, 'Reta numérica de 0 a 20', reta20 + reta20)
          + bloco(2, 'Quadros de dez', grade([quadro_dez(0, 50), quadro_dez(0, 50)], 2), 'Para contar até 10 ou, com os dois, até 20.')
          + bloco(3, 'Quadro de valor', tabela(['Dezenas', 'Unidades'], [['', ''], ['', '']]), 'Para usar com o material dourado ou com palitos.'))
    cartoes = ''.join(f'<div class="cartao-num"><b>{n}</b>{quadro_dez(n, 16)}</div>' for n in range(0, 11))
    f2 = (bloco(1, 'Primeiro e depois', '<div class="prim-dep"><div><b>Primeiro</b><span></span></div><div><b>Depois</b><span></span></div></div>',
                'Desenhe ou cole a atividade em "Primeiro" e algo de que o estudante gosta em "Depois".')
          + bloco(2, 'Minha tarefa', '<ul class="checklist"><li><span></span>Ouvi ou li o que é para fazer.</li><li><span></span>Fiz o primeiro item.</li>'
                  '<li><span></span>Fiz até o final.</li><li><span></span>Mostrei para a professora ou o professor.</li></ul>')
          + bloco(3, 'Cartões de número e quantidade (0 a 10)', f'<div class="cartoes">{cartoes}</div>', 'Recorte. Servem para jogo da memória e para ordenar.'))
    return dict(
        slug='kit-de-apoio-visual', titulo='Kit de apoio visual', anos='1º ao 5º ano',
        resumo='Reta numérica, quadros de dez, quadro de valor, cartões de número e quantidade, "primeiro e depois" e checklist da tarefa.',
        habilidades=[('EF01MA01', 'números como indicador de quantidade'), ('EF01MA07', 'compor e decompor números (quadro de valor)')],
        tempo='Uso contínuo', material='Tesoura, cola e, se possível, plástico ou fita larga para durar mais.',
        passos=['Imprima uma vez e deixe o kit sempre no mesmo lugar da mesa ou do caderno.',
                'A reta numérica e os quadros de dez servem para todas as fichas de adição e subtração.',
                'O quadro "Primeiro e depois" organiza a sequência da aula para quem precisa de previsibilidade.',
                'A checklist "Minha tarefa" ajuda a dividir a atividade em passos e a saber quando terminou.',
                'Os cartões de 0 a 10 podem virar jogo da memória (número com quantidade) ou ser colocados em ordem.'],
        perfis={'down': 'Os mesmos apoios visuais todos os dias criam referência. A reta e os cartões podem ficar colados na carteira.',
                'tea': 'O "Primeiro e depois" e a checklist são estratégias visuais muito usadas com estudantes autistas. Combine com a família e com o AEE para usar as mesmas figuras em casa e na escola.',
                'tdah': 'A checklist dá começo, meio e fim visíveis para a tarefa. Marcar cada passo é um retorno imediato.'},
        gabarito={},
        versoes={'Folha 1': f1, 'Folha 2': f2})


FICHAS = [ficha_contar, ficha_juntar, ficha_tirar, ficha_dezenas, ficha_padroes, ficha_formas, ficha_dinheiro, ficha_horas,
          ficha_multiplicar, ficha_kit]
