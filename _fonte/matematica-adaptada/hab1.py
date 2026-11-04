"""1º ano: uma ficha por habilidade (as fichas de várias habilidades viraram fichas de revisão)."""
from base import ficha
from desenhos import dinheiro, dourado, figura, grupo, icone, nome, objeto, quadro_dez, reta, svg, uma_forma
from desenhos2 import calendario, fila, grafico_barras, mesa_cena, objeto3d, pote, solido
from fichas import VAZIO, bloco, caixa_desenho, conta, figs, grade, item, linhas, opcoes, problema, resposta, seq_numeros, tabela
from ano3 import frases


def h1(slug, titulo, cod, resumo, material, passos, perfis, gab, a, b, c, tempo='30 a 40 minutos'):
    return ficha(slug, titulo, '1º ano', resumo, [cod], tempo, material, passos, perfis, gab, a, b, c)


def fig1(t, tam=46):
    return svg(tam, tam, figura(t, 0, 0, tam), 'fig', nome(t))


def duas(x, y):
    return f'<div class="pilha-contas" style="align-items:flex-start">{x}{y}</div>'


def lado(x, sinal, y):
    return f'<div class="opcoes">{x}<span class="conta">{sinal}</span>{y}</div>'


def resp_txt():
    return resposta(largura='30mm')


# ---------- Números ----------

def numeros_contam_ordenam():
    a = bloco(1, 'Quantos tem? Circule.', grade([
        item(grupo('maca', 3, tam=34), opcoes([3, 5], certa=3), exemplo=True),
        item(grupo('bola', 4, tam=34), opcoes([2, 4])),
        item(grupo('flor', 2, tam=34), opcoes([2, 6]))], 3)) + bloco(
        2, 'O peixe é o 1º da fila. Quem é o 2º? Circule.', item(fila(['peixe', 'bola', 'flor'], 56), opcoes(['bola', 'flor'])),
        'Conte da esquerda para a direita: 1º, 2º, 3º.')
    b = bloco(1, 'Conte e escreva quantos.', grade([
        item(grupo('estrela', 6, 3, 30), resposta(6), exemplo=True),
        item(grupo('lapis', 5, 5, 30), VAZIO),
        item(grupo('ovo', 8, 4, 30), VAZIO)], 3)) + bloco(
        2, 'Pinte a 3ª bola e circule a 5ª.', item(fila(['bola'] * 6, 46)), 'Comece a contar pela esquerda.') + bloco(
        3, 'O número conta quantos tem ou mostra a ordem?', tabela(['Frase', 'Conta ou ordem?'], [
            ['Tenho 3 lápis.', 'conta'], ['Cheguei em 2º lugar.', ''], ['A casa tem 5 janelas.', '']]), 'A primeira linha é o exemplo.')
    c = bloco(1, 'Complete.', frases([
        'Na corrida, a Ana chegou logo depois do 1º lugar. Ela ficou em:',
        'A turma tem 10 meninas e 10 meninos. Quantos estudantes são?',
        'Hoje é o 3º dia do mês. Amanhã será o:'])) + bloco(
        2, 'Onde você vê números na escola? Escreva um que conta quantos tem e um que mostra a ordem.', linhas(2))
    return h1(
        'numeros-que-contam-e-numeros-que-ordenam', 'Números que contam e números que ordenam', 'EF01MA01',
        'Usar números para dizer quantos tem e para dizer a posição numa fila, em situações do dia a dia.',
        'Objetos da sala para contar, uma fila de colegas, cartões com 1º, 2º e 3º.',
        ['Conte objetos da mesa com a turma, tocando em cada um.',
         'Forme uma fila com três ou quatro colegas e pergunte quem é o 1º, o 2º e o último.',
         'Mostre a diferença: "tenho 3 lápis" conta; "fiquei em 3º" dá a ordem.',
         'Na versão A, o estudante só circula; na B, escreve; na C, resolve frases do dia a dia.'],
        ['Conte com objetos de verdade antes da folha. Toque e fale cada número em voz alta.',
         'Use sempre a mesma direção para contar a fila (da esquerda para a direita) e mostre com uma seta.',
         'Faça a fila com os próprios estudantes: quem é chamado se levanta e diz a posição.'],
        ['Bloco 1: 4; 2. Bloco 2: bola.', 'Bloco 1: 5; 8. Bloco 2: a 3ª e a 5ª bola, contando da esquerda. Bloco 3: ordem; conta.',
         'Bloco 1: 2º lugar; 20 estudantes; 4º dia. Bloco 2: resposta pessoal (por exemplo, 25 cadeiras conta; 1º da fila dá a ordem).'],
        a, b, c)


def contar_pares_grupos():
    a = bloco(1, 'Cada peixe ganha uma flor? Ligue e circule.', item(duas(fila(['peixe'] * 4, 44), fila(['flor'] * 3, 44)), opcoes(['sim', 'não'])),
              'Ligue um peixe a uma flor. Sobrou algum?') + bloco(
        2, 'Circule as estrelas de 2 em 2 e conte. Quantas são?', item(grupo('estrela', 6, 6, 36), opcoes([6, 8])), 'Conte: 2, 4, 6...')
    b = bloco(1, 'Ligue um a um. Quantos sobraram?', grade([
        item(duas(fila(['bola'] * 5, 38), fila(['estrela'] * 3, 38)), '<p class="legenda">sobraram</p>' + resposta(2), exemplo=True),
        item(duas(fila(['maca'] * 4, 38), fila(['banana'] * 6, 38)), '<p class="legenda">sobraram</p>' + VAZIO)], 2)) + bloco(
        2, 'Circule grupos de 5 e conte.', item(grupo('flor', 15, 5, 32), '<p class="legenda">são</p>' + VAZIO)) + bloco(
        3, 'Sem contar um por um: tem mais ou menos de 10?', item(grupo('ovo', 13, 7, 30), opcoes(['mais de 10', 'menos de 10'])))
    c = bloco(1, 'Estime e depois conte em grupos de 5.', grade([
        item(grupo('lapis', 18, 6, 28), f'<p>Estimei: {VAZIO} Contei: {VAZIO}</p>'),
        item(grupo('estrela', 23, 8, 26), f'<p>Estimei: {VAZIO} Contei: {VAZIO}</p>')], 2), 'Estimar é dizer mais ou menos quantos tem, sem contar.') + bloco(
        2, 'Leia e resolva.', problema('Há 7 crianças e 9 cadeiras. Cada criança senta em uma cadeira. Quantas cadeiras ficam vazias?', '24mm'))
    return h1(
        'contar-com-pares-e-grupos', 'Contar com pares e grupos', 'EF01MA02',
        'Contar de forma exata ou aproximada, ligando um a um (pareamento) e formando grupos de 2 e de 5.',
        'Tampinhas, palitos, pratinhos e copos para ligar um a um; elásticos para formar grupos.',
        ['Distribua um copo para cada prato e pergunte se sobrou algum. Isso é ligar um a um.',
         'Forme grupos de 2 e de 5 com tampinhas e conte os grupos: 5, 10, 15.',
         'Mostre uma coleção por poucos segundos e peça um palpite: mais ou menos de 10?',
         'Na versão C, compare a estimativa com a contagem e converse sobre a diferença.'],
        ['Use objetos grandes e poucos itens por vez. Ligue com o dedo antes de ligar com o lápis.',
         'Deixe claro onde começa a contagem e marque o que já foi contado (risquinho ou cor).',
         'Transforme a estimativa em jogo rápido: mostre e esconda a coleção, e todos dão um palpite.'],
        ['Bloco 1: não, sobra 1 peixe. Bloco 2: 6.', 'Bloco 1: 2 bananas. Bloco 2: 15. Bloco 3: mais de 10.',
         'Bloco 1: 18; 23 (a estimativa é pessoal). Bloco 2: 2 cadeiras.'],
        a, b, c)


def comparar_quantidades():
    g = lambda t, k, por=5: grupo(t, k, por, 28)
    a = bloco(1, 'Onde tem mais? Circule o grupo.', grade([
        item(opcoes([g('maca', 2), g('maca', 5)], certa=g('maca', 5)), exemplo=True),
        item(opcoes([g('bola', 6, 3), g('bola', 3)]))], 1)) + bloco(
        2, 'Onde tem menos? Circule o grupo.', item(opcoes([g('peixe', 4), g('peixe', 7, 4)])))
    b = bloco(1, 'Olhe rápido, sem contar: onde tem mais? Circule. Depois conte para conferir.', grade([
        item(opcoes([g('estrela', 8, 4), g('estrela', 12, 6)]), f'<p>Contei: {VAZIO} e {VAZIO}</p>'),
        item(opcoes([g('flor', 10, 5), g('flor', 6, 3)]), f'<p>Contei: {VAZIO} e {VAZIO}</p>')], 1)) + bloco(
        2, 'Quantas maçãs a mais tem a fila de cima?', item(duas(fila(['maca'] * 5, 34), fila(['maca'] * 3, 34)), VAZIO), 'Ligue uma de cima com uma de baixo.')
    c = bloco(1, 'Responda.', frases([
        'Ana tem 15 figurinhas e Beto tem 11. Quem tem mais? Quantas a mais?',
        'Na caixa A há 18 lápis e na caixa B há 20. Qual tem menos?',
        'Na fila há 9 meninas e 9 meninos. Onde tem mais?'])) + bloco(
        2, 'Leia e estime.', problema('Um pote cheio tem cerca de 10 balas. Outro pote igual está cheio só até a metade. Mais ou menos quantas balas ele tem?', '22mm'))
    return h1(
        'comparar-quantidades-onde-tem-mais', 'Comparar quantidades: onde tem mais?', 'EF01MA03',
        'Estimar e comparar duas coleções de até cerca de 20 objetos e dizer quantos tem a mais ou a menos.',
        'Dois potes transparentes, tampinhas, feijões ou blocos de montar.',
        ['Mostre dois potes com quantidades bem diferentes e pergunte onde tem mais, sem contar.',
         'Depois, aproxime as quantidades e peça que liguem um a um para conferir.',
         'Pergunte quantos a mais: os que sobraram depois de ligar um a um.',
         'Na versão C, as comparações chegam a 20 e aparecem em frases.'],
        ['Comece com diferenças grandes (2 e 8) e só depois diferenças pequenas.',
         'Use sempre as mesmas palavras: mais, menos, igual. Um cartão com as três ajuda.',
         'Faça rodadas rápidas de "onde tem mais?" com as mãos levantadas para responder.'],
        ['Bloco 1: o grupo de 6 bolas. Bloco 2: o grupo de 4 peixes.', 'Bloco 1: 8 e 12, o de 12 estrelas; 10 e 6, o de 10 flores. Bloco 2: 2.',
         'Bloco 1: Ana, 4 a mais; caixa A; é igual. Bloco 2: cerca de 5 balas.'],
        a, b, c)


def contar_ate_100():
    q = lambda d, u=0, cel=18: quadro_dez(10, cel) * d + (quadro_dez(u, cel) if u else '')
    a = bloco(1, 'Cada quadro cheio vale 10. Circule o número.', grade([
        item(q(2, cel=20), opcoes([20, 12], certa=20), exemplo=True),
        item(q(3, cel=20), opcoes([30, 13]))], 2)) + bloco(
        2, 'Qual é o nome do número? Circule.', grade([
            item('<p class="conta">10</p>', opcoes(['dez', 'dois'], certa='dez'), exemplo=True),
            item('<p class="conta">20</p>', opcoes(['doze', 'vinte']))], 2))
    b = bloco(1, 'Conte e escreva o número.', grade([
        item(q(2, 4), f'<p>{resposta(24)} vinte e quatro</p>', exemplo=True),
        item(q(3, 7), f'<p>{VAZIO}</p>'),
        item(q(4, 1), f'<p>{VAZIO}</p>')], 1)) + bloco(
        2, 'Escreva o nome do número.', tabela(['Número', 'Nome'], [['15', 'quinze'], ['50', ''], ['43', '']]), 'A primeira linha é o exemplo.')
    c = bloco(1, 'Escreva com algarismos.', frases(['sete dezenas e duas unidades:', 'cinquenta e nove:', 'noventa:', 'cem:'])) + bloco(
        2, 'Leia e resolva.', problema('A professora guardou os lápis em caixas de 10. Encheu 6 caixas e sobraram 8 lápis. Quantos lápis ela tem? Escreva com algarismos e por extenso.', '24mm'))
    return h1(
        'contar-ate-100-e-escrever-os-numeros', 'Contar até 100 e escrever os números', 'EF01MA04',
        'Contar coleções de até 100 objetos em grupos de dez e registrar o resultado com algarismos e por extenso.',
        'Palitos de picolé e elásticos para amarrar grupos de 10; cartões com números e nomes.',
        ['Peça que a turma conte uma coleção grande e mostre como amarrar grupos de 10 para não se perder.',
         'Conte os grupos de 10 em 10 e depois os soltos: 10, 20, 30, 31, 32.',
         'Escreva o número e o nome lado a lado no quadro.',
         'Na versão C, o estudante passa do nome para o número e resolve um problema.'],
        ['Conte junto, de 10 em 10, com uma música ou batendo palmas.',
         'Use sempre grupos de 10 iguais (mesmo elástico, mesma cor) para o padrão ficar claro.',
         'Deixe o estudante amarrar os grupos de 10: o movimento ajuda a manter a atenção.'],
        ['Bloco 1: 30. Bloco 2: vinte.', 'Bloco 1: 37; 41. Bloco 2: cinquenta; quarenta e três.',
         'Bloco 1: 72; 59; 90; 100. Bloco 2: 68, sessenta e oito.'],
        a, b, c)


def comparar_na_reta():
    ce = lambda x, s, y: f'<p class="conta">{x} {s} {y}</p>'
    a = bloco(1, 'Na reta, quem está mais à direita é maior. Qual é maior? Circule.', grade([
        item(reta(0, 10, 560, destaque=(3, 7)), opcoes([3, 7], certa=7), exemplo=True),
        item(reta(0, 10, 560, destaque=(5, 9)), opcoes([5, 9]))], 1)) + bloco(
        2, 'Qual é maior? Circule.', grade([item(opcoes([12, 8])), item(opcoes([15, 20]))], 2))
    b = bloco(1, 'Use a reta e responda.', item(reta(0, 20, 640)) + frases(['Entre 6 e 16, o maior é:', 'Entre 13 e 11, o maior é:'])) + bloco(
        2, 'Escreva &gt; (maior que) ou &lt; (menor que).', grade([
            item(ce(8, resposta('&lt;'), 18), exemplo=True), item(ce(25, VAZIO, 52)), item(ce(30, VAZIO, 29)), item(ce(47, VAZIO, 74))], 2),
        'A boca do sinal abre para o número maior.')
    c = bloco(1, 'Escreva em ordem, do menor para o maior.', frases(['35, 53, 30, 50:', '99, 19, 91, 9:'])) + bloco(
        2, 'Compare sem a reta. Escreva &gt; ou &lt;.', grade([item(ce(68, VAZIO, 86)), item(ce(70, VAZIO, 69)), item(ce(45, VAZIO, 54)), item(ce(100, VAZIO, 99))], 2)) + bloco(
        3, 'Leia e responda.', problema('Lia leu 28 páginas e Rui leu 32. Quem leu mais? Como você sabe?', '18mm'))
    return h1(
        'comparar-numeros-na-reta-numerica', 'Comparar números na reta numérica', 'EF01MA05',
        'Comparar números naturais de até dois algarismos, com e sem a reta numérica, e usar os sinais maior que e menor que.',
        'Uma reta numérica de 0 a 20 no chão (com fita crepe) e cartões com números.',
        ['Peça que dois estudantes fiquem em pé em dois números da reta do chão. Quem andou mais está no maior.',
         'Mostre que, na reta, o número da direita é sempre o maior.',
         'Sem a reta, compare primeiro as dezenas e, se forem iguais, as unidades.',
         'Na versão C, os números vão até 100 e o estudante explica como comparou.'],
        ['Use a reta de chão e ande sobre ela. Comece com números até 10.',
         'Mantenha a reta sempre no mesmo lugar da folha e da sala. Um cartão com os sinais e o desenho da boca ajuda.',
         'Faça corridas na reta do chão: quem chega mais longe tem o número maior.'],
        ['Bloco 1: 9. Bloco 2: 12; 20.', 'Bloco 1: 16; 13. Bloco 2: &lt;; &gt;; &lt;.',
         'Bloco 1: 30, 35, 50, 53; 9, 19, 91, 99. Bloco 2: &lt;; &gt;; &lt;; &gt;. Bloco 3: Rui, porque 3 dezenas é mais que 2 dezenas.'],
        a, b, c)


def fatos_adicao():
    falta = lambda x: f'<p class="conta">{x} + {VAZIO} = 10</p>'
    a = bloco(1, 'Junte e circule quantos são ao todo.', grade([
        item(lado(grupo('maca', 2, 5, 30), '+', grupo('maca', 1, 5, 30)), opcoes([3, 4], certa=3), exemplo=True),
        item(lado(grupo('bola', 2, 5, 30), '+', grupo('bola', 2, 5, 30)), opcoes([4, 5])),
        item(lado(grupo('flor', 3, 5, 30), '+', grupo('flor', 2, 5, 30)), opcoes([5, 6]))], 1)) + bloco(
        2, 'Complete. Use os dedos.', grade([conta(1, '+', 1, 2), conta(2, '+', 1), conta(3, '+', 2), conta(4, '+', 1)], 2), 'O primeiro é o exemplo.')
    b = bloco(1, 'Os dobros. Complete.', grade([conta(1, '+', 1, 2), conta(2, '+', 2), conta(3, '+', 3), conta(4, '+', 4), conta(5, '+', 5)], 3)) + bloco(
        2, 'Jeitos de fazer 10. Complete.', grade([falta(7), falta(6), falta(5), falta(8)], 2), 'Use os dedos das duas mãos.')
    c = bloco(1, 'Complete a tabela da adição.', tabela(['+', '1', '2', '3', '4', '5'], [
        ['1', '2', '', '', '', ''], ['2', '', '', '', '', ''], ['3', '', '', '', '', ''], ['4', '', '', '', '', '']]), 'Some o número da linha com o da coluna.') + bloco(
        2, 'Use um fato que você já sabe.', frases(['Se 5 + 5 = 10, então 5 + 6 =', 'Se 4 + 4 = 8, então 4 + 3 ='])) + bloco(
        3, 'Leia e resolva.', problema('Tenho 6 figurinhas e ganhei 7. Quantas tenho agora?', '20mm'))
    return h1(
        'fatos-basicos-da-adicao', 'Fatos básicos da adição', 'EF01MA06',
        'Construir os fatos básicos da adição (dobros, jeitos de fazer 10) e usá-los para calcular.',
        'Dedos, tampinhas, um quadro de dez e cartões com contas de adição.',
        ['Junte dois grupos de tampinhas e conte tudo. Depois, conte a partir do maior.',
         'Mostre os dobros com as mãos: 2 dedos e 2 dedos, 3 e 3.',
         'Com o quadro de dez, procure os jeitos de completar 10.',
         'Na versão C, a tabela da adição mostra que os fatos se repetem.'],
        ['Use objetos e dedos sempre. Um fato por vez, repetido em situações diferentes.',
         'Organize os fatos numa tabela fixa na parede. Avise quando passar dos dobros para o 10.',
         'Faça um jogo de cartas: vira duas cartas e diz a soma. Partidas curtas.'],
        ['Bloco 1: 4; 5. Bloco 2: 3; 5; 5.', 'Bloco 1: 4; 6; 8; 10. Bloco 2: 3; 4; 5; 2.',
         'Bloco 1: linha do 1: 2 a 6; do 2: 3 a 7; do 3: 4 a 8; do 4: 5 a 9. Bloco 2: 11; 7. Bloco 3: 13 figurinhas.'],
        a, b, c)


def compor_decompor():
    dec = lambda x, d=None, u=None: f'<p class="conta">{x} = {resposta(d) if d else VAZIO} + {resposta(u) if u else VAZIO}</p>'
    a = bloco(1, 'Cada barra vale 10 e cada cubinho vale 1. Circule o número.', grade([
        item(dourado(2, 3), opcoes([23, 32], certa=23), exemplo=True),
        item(dourado(1, 5), opcoes([15, 51])),
        item(dourado(3, 0), opcoes([3, 30]))], 3)) + bloco(
        2, '1 barra e 4 cubinhos. Complete.', item(dourado(1, 4) + f'<p class="conta">10 + 4 = {VAZIO}</p>'))
    b = bloco(1, 'Separe em dezenas e unidades.', grade([item(dec(34, 30, 4), exemplo=True), item(dec(47)), item(dec(52)), item(dec(86))], 2)) + bloco(
        2, 'Desenhe as barras e os cubinhos do número 26.', caixa_desenho('30mm'))
    c = bloco(1, 'Escreva o número de outro jeito.', frases(['25 = 20 + 5 = 10 +', '38 = 30 + 8 = 20 +', '61 = 60 + 1 = 50 +'])) + bloco(
        2, 'Junte e escreva o número.', frases(['7 dezenas e 3 unidades:', '4 dezenas e 12 unidades:'])) + bloco(
        3, 'Leia e resolva.', problema('Tenho 3 pacotes com 10 balas e 9 balas soltas. Ganhei mais 1 bala. Quantos pacotes de 10 posso montar agora?', '20mm'))
    return h1(
        'compor-e-decompor-dezenas-e-unidades', 'Compor e decompor dezenas e unidades', 'EF01MA07',
        'Montar e desmontar números de dois algarismos em dezenas e unidades, com material dourado e palitos.',
        'Material dourado (barras e cubinhos) ou palitos amarrados de 10 em 10.',
        ['Mostre uma barra e conte os 10 cubinhos dela. A barra vale 10.',
         'Monte números com barras e cubinhos e peça que a turma diga o número.',
         'Desmonte: 34 é 3 barras e 4 cubinhos, ou 30 + 4.',
         'Na versão C, troque uma barra por 10 cubinhos e mostre outros jeitos de escrever o número.'],
        ['Use o material dourado de verdade antes da folha. Troque 10 cubinhos por uma barra junto com o estudante.',
         'Use um quadro com duas colunas fixas: dezenas à esquerda, unidades à direita.',
         'Faça trocas rápidas em dupla: um monta, o outro diz o número.'],
        ['Bloco 1: 15; 30. Bloco 2: 14.', 'Bloco 1: 40 + 7; 50 + 2; 80 + 6. Bloco 2: 2 barras e 6 cubinhos.',
         'Bloco 1: 15; 18; 11. Bloco 2: 73; 52. Bloco 3: 4 pacotes (40 balas).'],
        a, b, c)


# ---------- Álgebra ----------

def o_que_falta():
    a = bloco(1, 'O que falta? Circule.', grade([
        item(figs(['maca', 'bola', 'maca', 'bola', None], 44), opcoes([fig1('maca'), fig1('bola')], certa=fig1('maca')), exemplo=True),
        item(figs(['flor', 'flor', 'peixe', 'flor', 'flor', None], 44), opcoes([fig1('peixe'), fig1('flor')]))], 1)) + bloco(
        2, 'Que número falta? Circule.', item(seq_numeros([1, 2, 3, None, 5]), opcoes([4, 6])))
    b = bloco(1, 'Desenhe o que falta.', grade([
        item(figs(['estrela', 'estrela', 'bola', None, 'estrela', 'bola'], 42)),
        item(figs(['maca', 'banana', 'pao', None, 'banana', 'pao'], 42))], 1)) + bloco(
        2, 'Complete os números.', seq_numeros([2, 4, None, 8, None]) + seq_numeros([5, 10, None, 20, None]) + seq_numeros([10, 9, None, 7, None]))
    c = bloco(1, 'Complete e escreva a regra.', frases(['3, 6, 9, ___, 15. Regra:', '20, 30, 40, ___, 60. Regra:', '50, 45, 40, ___, 30. Regra:'])) + bloco(
        2, 'Invente uma sequência de figuras com uma regra. Desenhe e deixe um espaço para um colega completar.', caixa_desenho('30mm'))
    return h1(
        'o-que-falta-na-sequencia', 'O que falta na sequência?', 'EF01MA10',
        'Descobrir a regra de sequências de figuras e de números e completar os elementos que faltam.',
        'Blocos coloridos, contas para colar, cartões com números.',
        ['Monte uma fila de blocos com padrão (vermelho, azul, vermelho, azul) e pergunte qual vem depois.',
         'Esconda um bloco do meio e peça que descubram qual falta.',
         'Faça o mesmo com números: 2, 4, _, 8.',
         'Na versão C, o estudante escreve a regra e cria a própria sequência.'],
        ['Fale o padrão em voz alta, como uma música: maçã, bola, maçã, bola.',
         'Comece com padrões de dois elementos e só depois três. Avise quando o padrão mudar.',
         'Deixe o estudante montar o padrão com o corpo (palma, pé, palma, pé).'],
        ['Bloco 1: peixe. Bloco 2: 4.', 'Bloco 1: estrela; maçã. Bloco 2: 6 e 10; 15 e 25; 8 e 6.',
         'Bloco 1: 12, de 3 em 3; 50, de 10 em 10; 35, diminui 5. Bloco 2: resposta pessoal.'],
        a, b, c)


# ---------- Geometria ----------

def direita_esquerda():
    a = bloco(1, 'O que está à direita da bola? Circule.', item(fila(['maca', 'bola', 'flor'], 54), opcoes(['maçã', 'flor'], certa='flor'), exemplo=True),
              'Levante a mão direita. A direita é o lado dela.') + bloco(
        2, 'O que está à esquerda do peixe? Circule.', item(fila(['estrela', 'peixe', 'banana'], 54), opcoes(['estrela', 'banana']))) + bloco(
        3, 'A fila anda para a direita. Quem está na frente da maçã? Circule.', item(fila(['bola', 'maca', 'peixe'], 50) + '<p class="legenda">a fila anda para cá →</p>', opcoes(['bola', 'peixe'])))
    b = bloco(1, 'Olhe a fila e complete.', item(fila(['flor', 'bola', 'maca', 'peixe', 'estrela'], 46)) + frases([
        'À direita da maçã está:', 'À esquerda da bola está:', 'Na ponta da direita está:'])) + bloco(
        2, 'Desenhe uma bola à esquerda da maçã e uma estrela à direita dela.', item(fila(['maca'], 50) + caixa_desenho('22mm')))
    c = bloco(1, 'Siga as ordens e desenhe: uma casa no meio; uma árvore à direita da casa; um carro à esquerda; uma pessoa na frente da casa.', caixa_desenho('48mm')) + bloco(
        2, 'Na sua sala, a partir do seu lugar, escreva onde está:', frases(['O quadro está', 'A porta está', 'O colega ao seu lado está']))
    return h1(
        'direita-esquerda-frente-e-atras', 'Direita, esquerda, frente e atrás', 'EF01MA11',
        'Descrever onde estão pessoas e objetos usando direita, esquerda, frente e atrás.',
        'Pulseira ou fita na mão direita, objetos da sala, fila de colegas.',
        ['Coloque uma fita na mão direita dos estudantes e brinque de "mão direita para cima".',
         'Faça uma fila e pergunte quem está na frente e quem está atrás de cada um.',
         'Na folha, combine que a direita é o lado da mão com a fita.',
         'Na versão C, o estudante segue ordens para desenhar e descreve a própria sala.'],
        ['Use a fita no pulso direito por alguns dias. Sempre o corpo antes da folha.',
         'Use a mesma palavra para a mesma ideia e mostre o gesto junto. Evite "pra lá" e "pra cá".',
         'Faça um circuito com ordens curtas: dois passos para a frente, vire para a direita.'],
        ['Bloco 1: flor. Bloco 2: estrela. Bloco 3: peixe.', 'Bloco 1: peixe; flor; estrela. Bloco 2: bola do lado esquerdo e estrela do lado direito da maçã.',
         'Bloco 1: confira as posições. Bloco 2: resposta pessoal; confira direita e esquerda a partir do estudante.'],
        a, b, c)


def entre_acima_abaixo():
    a = bloco(1, 'O que está em cima da mesa? Circule.', item(mesa_cena([('maca', 'em cima'), ('bola', 'embaixo')]), opcoes(['maçã', 'bola'], certa='maçã'), exemplo=True)) + bloco(
        2, 'O que está embaixo da mesa? Circule.', item(mesa_cena([('flor', 'em cima'), ('bola', 'embaixo')]), opcoes(['flor', 'bola']))) + bloco(
        3, 'O que está entre a maçã e a flor? Circule.', item(fila(['maca', 'estrela', 'flor'], 50), opcoes(['estrela', 'bola'])))
    b = bloco(1, 'Olhe a cena e complete com em cima, embaixo ou ao lado.', item(mesa_cena([('maca', 'em cima'), ('bola', 'embaixo'), ('flor', 'ao lado direito')])) + frases([
        'A maçã está', 'A bola está', 'A flor está'])) + bloco(
        2, 'Pinte o que está entre o peixe e a banana.', item(fila(['peixe', 'ovo', 'banana', 'lapis'], 48)))
    c = bloco(1, 'Desenhe: um sol acima da casa, uma flor abaixo da janela e um gato entre a casa e a árvore.', caixa_desenho('48mm')) + bloco(
        2, 'Onde fica o seu lugar na sala? Escreva usando um ponto de referência.', linhas(2), 'Use palavras como perto de, entre, ao lado de.')
    return h1(
        'entre-acima-e-abaixo', 'Entre, acima e abaixo: onde está?', 'EF01MA12',
        'Descrever a localização de objetos usando pontos de referência e as palavras entre, acima, abaixo, em cima e embaixo.',
        'Uma mesa, uma caixa e objetos pequenos; cartões com as palavras de posição.',
        ['Coloque objetos em cima e embaixo da mesa e peça que a turma diga onde estão.',
         'Coloque um objeto entre dois outros e pergunte o que está no meio.',
         'Escolha um ponto de referência (a porta, o quadro) e descreva a posição de colegas.',
         'Na versão C, o estudante desenha seguindo as ordens e descreve o próprio lugar.'],
        ['Faça com objetos reais e com o próprio corpo: mão em cima da cabeça, pé embaixo da mesa.',
         'Mostre cartões com a palavra e um desenho para cada posição, sempre os mesmos.',
         'Esconda um objeto na sala e dê pistas de posição para a turma encontrar.'],
        ['Bloco 1: maçã. Bloco 2: bola. Bloco 3: estrela.', 'Bloco 1: em cima da mesa; embaixo da mesa; ao lado da mesa. Bloco 2: o ovo.',
         'Bloco 1: confira as posições. Bloco 2: resposta pessoal, com um ponto de referência.'],
        a, b, c)


def solidos_objetos():
    a = bloco(1, 'Com que forma o objeto parece? Circule.', grade([
        item(objeto3d('bola', 70), opcoes(['esfera', 'cubo'], certa='esfera'), exemplo=True),
        item(objeto3d('dado', 70), opcoes(['cubo', 'cone'])),
        item(objeto3d('lata', 70), opcoes(['cilindro', 'esfera']))], 2)) + bloco(
        2, 'Qual rola? Circule.', item(opcoes([solido('esfera', 64), solido('cubo', 64)])))
    b = bloco(1, 'Escreva o nome do sólido de cada objeto.', grade([
        item(objeto3d('casquinha', 66), resposta('cone', '30mm'), exemplo=True), item(objeto3d('caixa', 66), resp_txt()),
        item(objeto3d('chapeu', 66), resp_txt()), item(objeto3d('lata', 66), resp_txt())], 4), 'Palavras: cone, cilindro, bloco retangular.') + bloco(
        2, 'Circule os sólidos que rolam.', item(opcoes([solido(t, 56) for t in ('cubo', 'esfera', 'cilindro', 'bloco', 'cone')])))
    c = bloco(1, 'Procure na sala um objeto parecido com cada sólido.', tabela(['Sólido', 'Objeto da sala'], [
        ['esfera', ''], ['cubo', ''], ['cilindro', ''], ['cone', ''], ['bloco retangular', '']])) + bloco(
        2, 'Qual é a diferença entre o cubo e a esfera?', linhas(2))
    return h1(
        'solidos-e-objetos-do-dia-a-dia', 'Sólidos e objetos do dia a dia', 'EF01MA13',
        'Relacionar o cubo, a esfera, o cilindro, o cone e o bloco retangular a objetos do mundo físico.',
        'Bola, dado, lata, casquinha, caixa de sapato e chapéu de festa (ou embalagens trazidas de casa).',
        ['Coloque os objetos numa caixa. O estudante tira um, apalpa e diz com que sólido parece.',
         'Teste na mesa: quais rolam e quais não rolam?',
         'Mostre os sólidos de madeira ou de papel ao lado dos objetos.',
         'Na versão C, a turma procura sólidos pela sala.'],
        ['Deixe tocar e girar cada objeto. Um nome por vez, sempre com o objeto na mão.',
         'Use os mesmos objetos todas as vezes e um cartão com a foto e o nome de cada sólido.',
         'Faça uma caça aos sólidos pela escola com tempo marcado.'],
        ['Bloco 1: cubo; cilindro. Bloco 2: a esfera.', 'Bloco 1: bloco retangular; cone; cilindro. Bloco 2: esfera, cilindro e cone.',
         'Bloco 1: resposta pessoal. Bloco 2: o cubo tem faces planas e cantos e não rola; a esfera é toda arredondada e rola.'],
        a, b, c)


def formas_planas():
    f = lambda t, tam=50: uma_forma(t, tam)
    a = bloco(1, 'Circule a forma pedida.', grade([
        item('<p class="legenda">círculo</p>' + opcoes([f('circulo'), f('quadrado')], certa=f('circulo')), exemplo=True),
        item('<p class="legenda">triângulo</p>' + opcoes([f('quadrado'), f('triangulo')])),
        item('<p class="legenda">retângulo</p>' + opcoes([f('circulo'), f('retangulo')]))], 3)) + bloco(
        2, 'A janela parece com qual forma? Circule.', item(objeto('janela', 70), opcoes(['quadrado', 'círculo'])))
    b = bloco(1, 'Escreva o nome e quantos lados tem.', tabela(['Forma', 'Nome', 'Lados'], [
        [f('triangulo', 40), 'triângulo', '3'], [f('quadrado', 40), '', ''], [f('retangulo', 40), '', ''], [f('circulo', 40), '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Escreva a forma de cada objeto.', grade([item(objeto(t, 62), resp_txt()) for t in ('roda', 'placa', 'porta', 'envelope')], 4))
    c = bloco(1, 'Desenhe uma casa usando só quadrados, retângulos, triângulos e círculos. Depois conte.', caixa_desenho('40mm') + frases(['Quadrados:', 'Triângulos:', 'Círculos:'])) + bloco(
        2, 'Qual é a diferença entre o quadrado e o retângulo?', linhas(2))
    return h1(
        'circulo-quadrado-retangulo-e-triangulo', 'Círculo, quadrado, retângulo e triângulo', 'EF01MA14',
        'Reconhecer e nomear o círculo, o quadrado, o retângulo e o triângulo em desenhos e em objetos.',
        'Formas recortadas em EVA ou papel, objetos da sala (porta, relógio, janela).',
        ['Passe as formas de mão em mão e conte os lados com o dedo.',
         'Carimbe a face de caixas e latas no papel: o que aparece?',
         'Procure as formas em objetos da sala.',
         'Na versão C, o estudante monta um desenho só com formas e compara o quadrado com o retângulo.'],
        ['Use formas grandes e coloridas para tocar. Um nome de cada vez.',
         'Mantenha um cartaz fixo com as quatro formas e os nomes. Use sempre a mesma cor para cada forma.',
         'Brinque de "corre para a forma": cada forma fica num canto da sala.'],
        ['Bloco 1: triângulo; retângulo. Bloco 2: quadrado.', 'Bloco 1: quadrado, 4; retângulo, 4; círculo, nenhum lado reto. Bloco 2: círculo; triângulo; retângulo; retângulo.',
         'Bloco 1: resposta pessoal. Bloco 2: no quadrado os 4 lados são iguais; no retângulo, dois lados são mais compridos.'],
        a, b, c)


# ---------- Grandezas e medidas ----------

def o_que_vem_primeiro():
    ic = lambda t: icone(t, 56)
    a = bloco(1, 'O que vem primeiro no dia? Circule.', grade([
        item('<p class="legenda">acordar ou dormir?</p>' + opcoes([ic('sol'), ic('lua')], certa=ic('sol')), exemplo=True),
        item('<p class="legenda">ir para a escola ou dormir?</p>' + opcoes([ic('lua'), ic('escola')]))], 2)) + bloco(
        2, 'Escreva 1 no que vem primeiro e 2 no que vem depois.', grade([item(ic('banho'), VAZIO), item(ic('lua'), VAZIO)], 2), 'Tomar banho e ir dormir.')
    b = bloco(1, 'Numere de 1 a 4 na ordem do seu dia.', grade([item(ic(t), VAZIO) for t in ('escola', 'lua', 'sol', 'prato')], 4),
              'Sol: acordar. Escola: aula. Prato: almoço. Lua: dormir.') + bloco(
        2, 'Complete com antes ou depois.', frases(['Eu acordo ___ de tomar o café da manhã.', 'Eu durmo ___ de jantar.']))
    c = bloco(1, 'Escreva a sua rotina com os horários.', tabela(['Hora', 'O que eu faço'], [['7h', 'acordo'], ['', ''], ['', ''], ['', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Conte o que você fez ontem, em ordem. Use primeiro, depois e por fim.', linhas(3))
    return h1(
        'o-que-acontece-primeiro-no-dia', 'O que acontece primeiro no dia?', 'EF01MA16',
        'Contar a sequência de acontecimentos de um dia, usando primeiro, depois, antes e por fim, e os horários quando possível.',
        'Fotos ou desenhos da rotina da turma, um relógio de parede.',
        ['Mostre fotos da rotina da escola fora de ordem e organize com a turma.',
         'Use as palavras primeiro, depois, antes e por fim.',
         'Mostre no relógio a hora de algumas atividades (entrada, lanche, saída).',
         'Na versão C, o estudante escreve a própria rotina com horários.'],
        ['Use a agenda visual da sala, com fotos reais da rotina. Retome a ordem no começo de cada dia.',
         'A rotina em figuras dá previsibilidade. Avise antes de qualquer mudança e mostre na agenda.',
         'Dê ao estudante a tarefa de virar a figura da agenda quando uma atividade termina.'],
        ['Bloco 1: escola. Bloco 2: banho 1; dormir 2.',
         'Bloco 1: sol 1, escola 2, prato 3, lua 4 (se o estudante estuda à tarde, o almoço vem antes da escola). Bloco 2: antes; depois.',
         'Bloco 1 e 2: resposta pessoal, com a ordem e os horários coerentes.'],
        a, b, c)


def periodos_semana_meses():
    dias = ['dom', 'seg', None, 'qua', None, 'sex', None]
    a = bloco(1, 'É de dia ou de noite? Circule.', grade([
        item(icone('sol', 56), opcoes(['dia', 'noite'], certa='dia'), exemplo=True),
        item(icone('lua', 56), opcoes(['dia', 'noite']))], 2)) + bloco(
        2, 'Que dia vem depois de segunda-feira? Circule.', item(opcoes(['terça', 'domingo'])))
    b = bloco(1, 'Complete os dias da semana.', seq_numeros(dias)) + bloco(
        2, 'Escreva manhã, tarde ou noite.', frases(['Eu durmo à', 'Eu acordo de', 'O almoço é no começo da']))
    c = bloco(1, 'Use o calendário de novembro de 2026.', calendario(2026, 11, cel='10mm') + frases([
        'Quantos dias tem novembro?', 'Quantos sábados tem novembro?', 'Que mês vem depois de novembro?'])) + bloco(
        2, 'Escreva os 12 meses do ano em ordem.', linhas(3))
    return h1(
        'periodos-do-dia-semana-e-meses', 'Períodos do dia, semana e meses', 'EF01MA17',
        'Reconhecer manhã, tarde e noite, os dias da semana e os meses do ano, usando o calendário.',
        'Calendário grande da sala, cartões com os dias da semana e os meses.',
        ['Comece o dia marcando no calendário: hoje é que dia da semana?',
         'Cante ou recite os dias da semana e os meses com a turma.',
         'Converse sobre o que fazemos de manhã, de tarde e de noite.',
         'Na versão C, o estudante consulta o calendário para responder.'],
        ['Use o calendário todos os dias, sempre no mesmo horário. Uma cor para cada dia da semana ajuda.',
         'A rotina do calendário no início da aula dá previsibilidade. Mostre o dia seguinte antes de terminar.',
         'Deixe o estudante ser o responsável por virar o dia no calendário.'],
        ['Bloco 1: noite. Bloco 2: terça.', 'Bloco 1: ter, qui, sáb. Bloco 2: noite; manhã; tarde.',
         'Bloco 1: 30 dias; 4 sábados; dezembro. Bloco 2: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro.'],
        a, b, c)


def escrever_data():
    a = bloco(1, 'Que dia da semana é o dia 10? Circule.', item(calendario(2026, 11, destaques=(10,), cel='11mm'), opcoes(['terça', 'sexta'])),
              'Siga a coluna do dia 10 até o alto.') + bloco(
        2, 'Complete a data de hoje.', f'<p class="conta">{VAZIO} / {VAZIO} / 2026</p>', 'dia / mês / ano')
    b = bloco(1, 'Olhe o calendário e responda.', calendario(2026, 11, destaques=(15, 25), cel='10mm') + frases([
        'O dia 15 é que dia da semana?', 'O dia 25 é que dia da semana?', 'Escreva o dia 25 de novembro com números:'])) + bloco(
        2, 'Escreva a data do seu aniversário.', frases(['Dia:', 'Mês:', 'Com números:']))
    c = bloco(1, 'Use o calendário de dezembro de 2026.', calendario(2026, 12, cel='10mm') + frases([
        'Que dia da semana é o Natal, 25/12/2026?', 'Escreva 31 de dezembro de 2026 com números:', 'Quantos dias faltam do dia 10 até o Natal?'])) + bloco(
        2, 'Escreva três datas importantes para você e o dia da semana de cada uma.', tabela(['Data importante', 'Data', 'Dia da semana'], [['', '', ''], ['', '', ''], ['', '', '']]))
    return h1(
        'escrever-a-data-e-o-dia-da-semana', 'Escrever a data e o dia da semana', 'EF01MA18',
        'Escrever uma data com dia, mês e ano e encontrar o dia da semana no calendário.',
        'Calendário do mês, cartões com dia, mês e ano para montar a data.',
        ['Escreva a data no quadro todos os dias, com a turma: dia, mês e ano.',
         'Mostre como achar o dia da semana: a coluna do número até o nome lá em cima.',
         'Escreva a mesma data com palavras e com números: 4 de novembro de 2026, 4/11/2026.',
         'Na versão C, o estudante conta quantos dias faltam para uma data.'],
        ['Monte a data com cartões móveis (dia, mês, ano), sempre na mesma ordem.',
         'Use o mesmo modelo de data todos os dias. Avise quando o mês mudar.',
         'Deixe o estudante escrever a data no quadro para a turma.'],
        ['Bloco 1: terça. Bloco 2: a data do dia.', 'Bloco 1: domingo; quarta-feira; 25/11/2026. Bloco 2: resposta pessoal.',
         'Bloco 1: sexta-feira; 31/12/2026; 15 dias. Bloco 2: resposta pessoal.'],
        a, b, c)


def moedas_cedulas():
    d = lambda *v: dinheiro(list(v))
    a = bloco(1, 'Circule o dinheiro pedido.', grade([
        item(opcoes([d(1), d(10)], certa=d(1)), '<p class="legenda">1 real</p>', exemplo=True),
        item(opcoes([d(2), d(5)]), '<p class="legenda">5 reais</p>'),
        item(opcoes([d(10), d(50)]), '<p class="legenda">10 reais</p>')], 1)) + bloco(
        2, 'É moeda ou cédula? Circule.', grade([
            item(d(20), opcoes(['moeda', 'cédula'], certa='cédula'), exemplo=True), item(d(0.5), opcoes(['moeda', 'cédula']))], 2))
    b = bloco(1, 'Quanto dinheiro tem? Escreva.', grade([
        item(d(1, 1, 1), resposta('R$ 3'), exemplo=True), item(d(2, 2), VAZIO), item(d(5, 1), VAZIO), item(d(10, 5), VAZIO)], 2)) + bloco(
        2, 'Qual vale mais? Circule.', grade([item(opcoes([d(2), d(1)])), item(opcoes([d(5), d(10)]))], 2))
    c = bloco(1, 'Desenhe dois jeitos diferentes de ter R$ 10.', grade([caixa_desenho('28mm'), caixa_desenho('28mm')], 2)) + bloco(
        2, 'Leia e resolva.', problema('Um caderno custa R$ 7. Paguei com uma cédula de R$ 10. Quanto recebi de troco?', '20mm')) + bloco(
        3, 'Quais cédulas existem no Brasil? Escreva os valores.', linhas(1))
    return h1(
        'moedas-e-cedulas-do-real', 'Moedas e cédulas do real', 'EF01MA19',
        'Reconhecer moedas e cédulas do real, dizer quanto valem e juntar valores pequenos em situações de compra.',
        'Dinheiro de brincadeira (moedas e cédulas), produtos com preço para um mercadinho da sala.',
        ['Mostre moedas e cédulas de brincadeira e diga o valor de cada uma.',
         'Separe em moedas e cédulas.',
         'Monte um mercadinho: o estudante paga com o dinheiro certo.',
         'Na versão C, o estudante calcula o troco e procura jeitos diferentes de pagar.'],
        ['Use dinheiro de brincadeira grande, com o valor bem visível. Comece com 1, 2 e 5 reais.',
         'Organize o dinheiro sempre do mesmo jeito: moedas de um lado, cédulas do outro, do menor para o maior.',
         'O mercadinho com papéis (caixa e cliente) mantém a atenção. Troque os papéis a cada compra.'],
        ['Bloco 1: R$ 5; R$ 10. Bloco 2: moeda.', 'Bloco 1: R$ 4; R$ 6; R$ 15. Bloco 2: R$ 2; R$ 10.',
         'Bloco 1: por exemplo, uma cédula de 10; duas de 5; 5 + 2 + 2 + 1. Bloco 2: R$ 3. Bloco 3: 2, 5, 10, 20, 50, 100 e 200 reais.'],
        a, b, c)


# ---------- Probabilidade e estatística ----------

def certo_talvez():
    a = bloco(1, 'Vai sair bolinha verde? Circule.', grade([
        item(pote(['verde'] * 6, 100, 'pote só com bolinhas verdes'), opcoes(['certo', 'impossível'], certa='certo'), exemplo=True),
        item(pote(['rosa'] * 6, 100, 'pote só com bolinhas rosa'), opcoes(['certo', 'impossível'])),
        item(pote(['verde', 'rosa'] * 3, 100, 'pote com bolinhas verdes e rosa'), opcoes(['talvez', 'impossível']))], 2)) + bloco(
        2, 'Amanhã o sol vai nascer? Circule.', item(icone('sol', 56), opcoes(['certo', 'impossível'])))
    b = bloco(1, 'Escreva certo, talvez ou impossível.', tabela(['Acontecimento', 'Chance'], [
        ['Amanhã vai chover.', 'talvez'], ['Um gato vai voar sozinho.', ''], ['Depois de segunda-feira vem terça-feira.', ''], ['Vou ganhar um presente hoje.', '']]),
        'A primeira linha é o exemplo.') + bloco(
        2, 'Pinte as bolinhas para que tirar uma amarela seja talvez.', item(pote(['branco'] * 8, 120, 'pote com bolinhas para pintar')))
    c = bloco(1, 'Escreva um exemplo de cada.', frases(['Com certeza vai acontecer:', 'Talvez aconteça:', 'É impossível acontecer:'])) + bloco(
        2, 'Num pote há 3 bolinhas verdes e 1 rosa. É mais fácil sair verde ou rosa? Por quê?', linhas(2))
    return h1(
        'vai-acontecer-certo-talvez-ou-impossivel', 'Vai acontecer? Certo, talvez ou impossível', 'EF01MA20',
        'Classificar acontecimentos do dia a dia e sorteios simples como certos, possíveis (talvez) ou impossíveis.',
        'Um pote ou saco opaco e bolinhas ou tampinhas de duas cores.',
        ['Coloque só bolinhas verdes no saco e pergunte se vai sair verde. Tire e confira.',
         'Troque por bolinhas de duas cores e pergunte de novo: agora é talvez.',
         'Converse sobre acontecimentos do dia: vai chover? o recreio vai acontecer?',
         'Na versão C, o estudante cria exemplos e compara chances.'],
        ['Faça o sorteio de verdade várias vezes. Use só duas cores.',
         'Use três cartões fixos com as palavras certo, talvez e impossível, sempre na mesma ordem.',
         'Deixe o estudante sortear e anunciar o resultado para a turma.'],
        ['Bloco 1: impossível; talvez. Bloco 2: certo.', 'Bloco 1: impossível; certo; talvez. Bloco 2: pintar algumas amarelas e algumas de outra cor.',
         'Bloco 1: resposta pessoal. Bloco 2: verde, porque há mais bolinhas verdes.'],
        a, b, c)


def ler_tabelas_graficos():
    lanches = ['maca', 'banana', 'pao', 'suco']
    a = bloco(1, 'Fruta preferida da turma. Qual teve mais votos? Circule.', item(
        grafico_barras(['maçã', 'banana', 'pão'], [2, 5, 3], 6, ['maca', 'banana', 'pao'], celula=36), opcoes(['maçã', 'banana'])),
        'Cada quadradinho pintado é um voto.') + bloco(
        2, 'Quantos votaram na maçã? Circule.', item(opcoes([2, 5])))
    b = bloco(1, 'Lanche preferido da turma.', grafico_barras(['maçã', 'banana', 'pão', 'suco'], [4, 6, 2, 5], 7, lanches, celula=32) + frases([
        'Quantos escolheram suco?', 'Qual lanche teve menos votos?', 'Quantos votos a banana teve a mais que o pão?'])) + bloco(
        2, 'Leia a tabela.', tabela(['Brinquedo', 'Crianças'], [['bola', '7'], ['boneca', '4'], ['carrinho', '5']]) + frases([
            'Qual brinquedo tem mais crianças?', 'Quantas crianças ao todo?']))
    c = bloco(1, 'Livros emprestados na biblioteca.', grafico_barras(['seg', 'ter', 'qua', 'qui', 'sex'], [3, 5, 2, 6, 4], 7, celula=30) + frases([
        'Em que dia saíram mais livros?', 'Quantos livros na semana toda?', 'Quantos livros a mais na quinta do que na quarta?'])) + bloco(
        2, 'Escreva uma pergunta que o gráfico responde.', linhas(1))
    return h1(
        'ler-tabelas-e-graficos-de-colunas', 'Ler tabelas e gráficos de colunas', 'EF01MA21',
        'Ler dados em tabelas simples e em gráficos de colunas: qual tem mais, qual tem menos e quantos tem.',
        'Um gráfico de colunas grande feito com a turma (com post-its ou quadrados de papel).',
        ['Faça uma votação rápida e monte o gráfico com post-its no quadro.',
         'Pergunte qual coluna é a mais alta e o que isso quer dizer.',
         'Conte os quadradinhos de cada coluna e escreva numa tabela.',
         'Na versão C, o estudante soma os dados e compara colunas.'],
        ['Monte o gráfico com objetos reais (blocos empilhados) antes do papel.',
         'Use sempre o mesmo formato de gráfico, com as figuras embaixo de cada coluna.',
         'A votação em pé, indo até a coluna escolhida, ajuda quem precisa se mexer.'],
        ['Bloco 1: banana. Bloco 2: 2.', 'Bloco 1: 5; pão; 4. Bloco 2: bola; 16.', 'Bloco 1: quinta; 20 livros; 4. Bloco 2: resposta pessoal.'],
        a, b, c)


def fazer_pesquisa():
    a = bloco(1, 'Pergunte a 5 colegas: gato ou cachorro? Pinte um quadradinho para cada resposta.', item(
        grafico_barras(['gato', 'cachorro'], None, 6, vazio=True, celula=36)), 'Pinte de baixo para cima.') + bloco(
        2, 'Qual teve mais votos? Circule.', item(opcoes(['gato', 'cachorro'])))
    b = bloco(1, 'Pesquisa com a turma: fruta preferida. Faça um risquinho para cada voto.', tabela(['Fruta', 'Risquinhos', 'Total'], [
        ['maçã', '', ''], ['banana', '', ''], ['uva', '', '']])) + bloco(
        2, 'Agora pinte o gráfico.', grafico_barras(['maçã', 'banana', 'uva'], None, 10, vazio=True, celula=26)) + bloco(
        3, 'Responda.', frases(['A fruta mais votada foi:']))
    c = bloco(1, 'Pesquisa com duas perguntas: qual bicho você prefere (gato ou cachorro)? Você tem bicho em casa (sim ou não)? Marque cada colega.', tabela(
        ['', 'gato', 'cachorro'], [['tem bicho', '', ''], ['não tem bicho', '', '']])) + bloco(
        2, 'Mostre o resultado do seu jeito: desenho, gráfico ou lista.', caixa_desenho('36mm')) + bloco(
        3, 'O que você descobriu?', linhas(2))
    return h1(
        'fazer-uma-pesquisa-com-a-turma', 'Fazer uma pesquisa com a turma', 'EF01MA22',
        'Fazer uma pesquisa com até duas perguntas, anotar as respostas e mostrar o resultado do seu jeito.',
        'Prancheta ou folha, lápis, post-its para o gráfico coletivo.',
        ['Escolha com a turma uma pergunta com poucas respostas (gato ou cachorro?).',
         'Mostre como fazer um risquinho para cada resposta e contar no fim.',
         'Organize o resultado numa tabela e num gráfico.',
         'Na versão C, a pesquisa tem duas perguntas e o estudante escolhe como mostrar.'],
        ['Faça a pesquisa em dupla com um colega que ajude a perguntar. Duas opções de resposta.',
         'Dê um roteiro fixo: perguntar, marcar, contar, pintar. Um passo de cada vez.',
         'Deixe o estudante circular pela sala fazendo as perguntas.'],
        ['Bloco 1 e 2: resultado da turma.', 'Bloco 1 a 3: resultado da turma; o total é o número de risquinhos.',
         'Bloco 1 a 3: resultado da turma; confira se cada colega foi marcado uma vez.'],
        a, b, c)


FICHAS = [numeros_contam_ordenam, contar_pares_grupos, comparar_quantidades, contar_ate_100, comparar_na_reta, fatos_adicao, compor_decompor,
          o_que_falta, direita_esquerda, entre_acima_abaixo, solidos_objetos, formas_planas, o_que_vem_primeiro, periodos_semana_meses,
          escrever_data, moedas_cedulas, certo_talvez, ler_tabelas_graficos, fazer_pesquisa]
