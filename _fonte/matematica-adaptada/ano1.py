"""Fichas que completam o 1º ano (e começam habilidades do 2º)."""
from base import ficha
from desenhos import figura, grupo, quadro_dez, reta, svg
from desenhos2 import (balanca, calendario, comparar_alturas, copo, fila, grafico_barras, mesa_cena, objeto3d, pote, solido)
from fichas import VAZIO, bloco, caixa_desenho, grade, item, linhas, opcoes, problema, resposta, tabela


def quadro_cem(vazios=(), ate=100, destaque=()):
    cel = ''
    for n in range(1, ate + 1):
        classe = 'vazia' if n in vazios else ('destaque' if n in destaque else '')
        cel += f'<span class="{classe}">{"" if n in vazios else n}</span>'
    return f'<div class="quadro-cem" style="--colunas:10">{cel}</div>'


def numeros_ate_100():
    a = bloco(1, 'Conte os grupos de 10. Circule o número.', grade([
        item(quadro_dez(10, 22) + quadro_dez(3, 22), opcoes([13, 31], certa=13), exemplo=True),
        item(quadro_dez(10, 22) + quadro_dez(10, 22) + quadro_dez(5, 22), opcoes([25, 52])),
        item(quadro_dez(10, 22) + quadro_dez(8, 22), opcoes([18, 81])),
        item(quadro_dez(10, 22) + quadro_dez(10, 22), opcoes([2, 20])),
    ], 2), 'Cada quadro cheio vale 10.') + bloco(2, 'Qual é o maior número? Pinte.', grade([
        item(opcoes([12, 21], certa=21), exemplo=True), item(opcoes([9, 19])), item(opcoes([30, 13])),
    ], 3))
    b = bloco(1, 'Complete o quadro com os números que faltam.', quadro_cem(vazios=(4, 8, 13, 17, 22, 26, 29, 31, 35, 38, 40), ate=40),
              'Olhe o número de cima e o do lado.') + bloco(2, 'Escreva o número que vem antes e o que vem depois.', grade([
                  f'<p class="conta">{resposta(14)} 15 {resposta(16)}</p>', f'<p class="conta">{VAZIO} 27 {VAZIO}</p>',
                  f'<p class="conta">{VAZIO} 40 {VAZIO}</p>', f'<p class="conta">{VAZIO} 59 {VAZIO}</p>'], 2))
    c = bloco(1, 'Complete o quadro de 1 a 100.', quadro_cem(vazios=(6, 17, 23, 34, 45, 50, 51, 62, 68, 73, 79, 84, 90, 96, 99)),
              'As linhas vão de 10 em 10.') + bloco(2, 'Compare. Escreva &gt; ou &lt;.', grade([
                  f'<p class="conta">47 {VAZIO} 74</p>', f'<p class="conta">65 {VAZIO} 56</p>', f'<p class="conta">89 {VAZIO} 98</p>', f'<p class="conta">100 {VAZIO} 99</p>'], 2))
    return ficha(
        'numeros-ate-100-contar-e-comparar', 'Números até 100: contar e comparar', '1º ano',
        'Contar coleções de até 100 com grupos de dez, completar o quadro de 100 e comparar números de dois algarismos.',
        ['EF01MA04', 'EF01MA05'], '30 a 45 minutos',
        'Tampinhas ou palitos e elásticos para formar grupos de dez; o quadro de 100 impresso em tamanho grande na parede.',
        ['Peça que o estudante conte uma coleção grande de tampinhas. Quando ele se perder, mostre como formar grupos de 10.',
         'Conte os grupos de 10 em 10 e depois as tampinhas soltas.',
         'No quadro de 100, mostre que andar para baixo soma 10 e andar para o lado soma 1.',
         'Para comparar, pergunte primeiro qual número tem mais grupos de 10.',
         'Na versão C, peça que o estudante explique como achou um número que faltava.'],
        ['Use o quadro de 100 sempre no mesmo lugar da sala e aponte junto. A contagem em voz alta, de 10 em 10, pode virar música da turma.',
         'Comece pelo quadro até 40 e só depois mostre o quadro completo, para não sobrecarregar. Pinte os números que terminam em 0 para criar um padrão visual.',
         'Use o quadro de 100 grande no chão (com fita crepe) e peça que o estudante pule até o número.'],
        ['Bloco 1: 25, 18, 20. Bloco 2: 19, 30.',
         'Bloco 1: 4, 8, 13, 17, 22, 26, 29, 31, 35, 38, 40. Bloco 2: 26 e 28; 39 e 41; 58 e 60.',
         'Bloco 1: 6, 17, 23, 34, 45, 50, 51, 62, 68, 73, 79, 84, 90, 96, 99. Bloco 2: &lt;, &gt;, &lt;, &gt;.'],
        a, b, c)


def separar_e_organizar():
    caixa = lambda r: f'<div class="caixa-grupo"><b>{r}</b><span></span></div>'
    a = bloco(1, 'Qual não é igual aos outros? Circule.', grade([
        item(fila(['maca', 'maca', 'estrela', 'maca'], 52), exemplo=True, classe='largo'),
        item(fila(['bola', 'peixe', 'bola', 'bola'], 52), classe='largo'),
        item(fila(['flor', 'flor', 'flor', 'lapis'], 52), classe='largo'),
    ], 1), 'No exemplo, a estrela é a diferente.') + bloco(2, 'Ligue cada figura à caixa da mesma cor.',
        '<div class="ligar-grupos">' + fila(['maca', 'bola', 'estrela', 'flor'], 46) + '<div class="caixas-cor"><span class="cor rosa">rosa</span><span class="cor verde">verde</span><span class="cor amarelo">amarela</span></div></div>',
        'Olhe a cor de dentro de cada figura.')
    b = bloco(1, 'Separe as figuras: recorte ou desenhe cada uma na caixa certa.',
              fila(['maca', 'estrela', 'bola', 'maca', 'peixe', 'estrela', 'maca', 'bola'], 44) + grade([caixa('Frutas'), caixa('Brinquedos'), caixa('Outros')], 3)) + bloco(
        2, 'Coloque em ordem do menor para o maior. Escreva 1, 2 e 3.',
        grade([item(svg(90, 90, figura('bola', 30, 30, 30), '', 'bola pequena'), VAZIO),
               item(svg(90, 90, figura('bola', 5, 5, 80), '', 'bola grande'), VAZIO),
               item(svg(90, 90, figura('bola', 18, 18, 54), '', 'bola média'), VAZIO)], 3))
    c = bloco(1, 'Escreva a regra que separou os grupos.', grade([
        item(fila(['maca', 'banana', 'pao'], 40) + '<span class="sep"></span>' + fila(['bola', 'lapis', 'estrela'], 40), '<p class="regra">Regra: <span class="linha-resp"></span></p>', classe='largo'),
        item(fila(['peixe', 'peixe'], 40) + '<span class="sep"></span>' + fila(['flor', 'flor', 'flor', 'flor'], 40), '<p class="regra">Regra: <span class="linha-resp"></span></p>', classe='largo'),
    ], 1)) + bloco(2, 'Complete a tabela: conte quantos de cada tipo.', fila(['maca', 'estrela', 'maca', 'bola', 'estrela', 'maca', 'bola', 'maca'], 40) +
        tabela(['Figura', 'Quantas?'], [['maçã', ''], ['estrela', ''], ['bola', '']])) + bloco(
        3, 'Invente duas caixas e uma regra. Desenhe três objetos em cada uma.', grade([caixa_desenho('30mm', 'Caixa 1'), caixa_desenho('30mm', 'Caixa 2')], 2))
    return ficha(
        'separar-e-organizar-por-atributos', 'Separar e organizar: cor, forma e tamanho', '1º ano',
        'Classificar objetos por um atributo, achar o diferente, ordenar por tamanho e descobrir a regra de um grupo.',
        ['EF01MA09'], '20 a 40 minutos', 'Objetos da sala ou blocos lógicos em cores e tamanhos diferentes; caixas ou bambolês para separar os grupos.',
        ['Espalhe objetos na mesa e peça que o estudante separe "os que são iguais". Pergunte qual foi a regra.',
         'Mostre uma regra de cada vez: primeiro cor, depois forma, depois tamanho.',
         'Na versão A, o estudante só aponta o diferente e liga por cor.',
         'Na versão B, recortar e colar ajuda quem tem dificuldade de desenhar.',
         'Na versão C, inverta: você separa e o estudante descobre a regra.'],
        ['Classificar com objetos reais e caixas de verdade antes da folha. Diga a regra em voz alta enquanto separa.',
         'A classificação costuma ser um ponto forte. Se o estudante tiver uma regra própria (por exemplo, por textura), aceite e peça que explique.',
         'Transforme em jogo de tempo: quem separa mais rápido, com a regra certa. Uma rodada curta por vez.'],
        ['Bloco 1: peixe; lápis. Bloco 2: maçã e flor na rosa, bola na verde, estrela na amarela.',
         'Bloco 1: frutas = 3 maçãs; brinquedos = 2 bolas; outros = 2 estrelas e 1 peixe (aceite outras regras explicadas). Bloco 2: pequena 1, grande 3, média 2.',
         'Bloco 1: comida e não comida; 2 e 4 (ou peixes e flores). Bloco 2: maçã 4, estrela 2, bola 2.'],
        a, b, c)


def localizacao():
    a = bloco(1, 'Onde está a figura? Circule.', grade([
        item(mesa_cena([('bola', 'em cima')], 300, 190), opcoes(['em cima', 'embaixo'], certa='em cima'), exemplo=True),
        item(mesa_cena([('maca', 'embaixo')], 300, 190), opcoes(['em cima', 'embaixo'])),
        item(mesa_cena([('estrela', 'em cima')], 300, 190), opcoes(['embaixo', 'em cima'])),
        item(mesa_cena([('peixe', 'embaixo')], 300, 190), opcoes(['em cima', 'embaixo'])),
    ], 2), 'Antes da folha, coloque um objeto em cima, embaixo e ao lado da mesa da sala.')
    b = bloco(1, 'Olhe a cena e complete com: em cima, embaixo, à esquerda ou à direita.',
              item(mesa_cena([('bola', 'em cima'), ('maca', 'embaixo'), ('flor', 'ao lado esquerdo'), ('estrela', 'ao lado direito')], 300, 190)) +
              '<div class="frases">' + ''.join(f'<p>A {n} está <span class="linha-resp"></span> da mesa.</p>' for n in ('bola', 'maçã', 'flor', 'estrela')) + '</div>',
              'Esquerda e direita de quem olha a folha.') + bloco(2, 'Desenhe.', grade([
                  caixa_desenho('32mm', 'Uma flor em cima de uma caixa'), caixa_desenho('32mm', 'Uma bola entre duas árvores')], 2))
    c = bloco(1, 'Observe a fila e responda.', item(fila(['maca', 'bola', 'estrela', 'peixe', 'flor'], 56), classe='largo') +
              '<div class="frases">' + ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in (
                  'O que está entre a bola e o peixe?', 'O que está à direita do peixe?', 'O que está à esquerda da bola?', 'Qual é o 4º da fila, contando da esquerda?')) + '</div>') + bloco(
        2, 'Desenhe a sua mesa na sala e escreva quem senta à sua frente, atrás, à esquerda e à direita.', caixa_desenho('52mm'))
    return ficha(
        'onde-esta-localizacao-no-espaco', 'Onde está? Localização no espaço', '1º ano',
        'Em cima, embaixo, entre, à esquerda e à direita: descrever onde estão objetos e pessoas com pontos de referência.',
        ['EF01MA11', 'EF01MA12'], '20 a 40 minutos', 'Uma caixa, uma bola e outros objetos para posicionar; fita colorida no pulso para marcar um lado, se ajudar.',
        ['Comece com o corpo: "coloque a mão em cima da cabeça", "o pé embaixo da cadeira".',
         'Posicione objetos reais em volta de uma mesa e peça que o estudante diga onde estão.',
         'Na versão B, combine que esquerda e direita são de quem olha a folha. A fita no pulso ajuda a lembrar.',
         'Na versão C, a última pergunta trabalha o número como ordem (EF01MA01).',
         'Termine com um jogo de esconder um objeto e dar pistas de localização.'],
        ['Use sempre o mesmo par de palavras com o mesmo gesto (em cima com a mão no alto). Trabalhe esquerda e direita depois que em cima e embaixo estiverem firmes.',
         'Algumas expressões ("ao lado", "perto") são vagas. Prefira termos exatos e combine um ponto de referência claro.',
         'Peça que o estudante se movimente para os lugares ditos antes de responder na folha.'],
        ['Embaixo, em cima, embaixo.', 'Bloco 1: em cima, embaixo, à esquerda, à direita.',
         'Bloco 1: a estrela; a flor; a maçã; o peixe.'],
        a, b, c)


def formas_espaciais():
    obj = lambda t: item(objeto3d(t, 84))
    a = bloco(1, 'Circule a forma parecida com o objeto.', grade([
        item(objeto3d('bola', 66), opcoes([solido('esfera', 54), solido('cubo', 54)], certa=solido('esfera', 54)), exemplo=True, classe='largo'),
        item(objeto3d('dado', 66), opcoes([solido('cone', 54), solido('cubo', 54)]), classe='largo'),
        item(objeto3d('lata', 66), opcoes([solido('cilindro', 54), solido('esfera', 54)]), classe='largo'),
        item(objeto3d('casquinha', 66), opcoes([solido('cubo', 54), solido('cone', 54)]), classe='largo'),
    ], 1), 'Traga objetos de verdade: bola, dado, lata e chapéu de festa.')
    b = bloco(1, 'Escreva o nome da forma: esfera, cubo, cilindro, cone ou bloco retangular.', grade([
        item(objeto3d(t, 84), '<p class="legenda">' + linhas(1) + '</p>') for t in ('bola', 'dado', 'lata', 'casquinha', 'caixa', 'chapeu')], 3)) + bloco(
        2, 'Quais formas rolam? Marque com X.', grade([item(solido(t, 66), '<span class="marcar"></span>') for t in ('esfera', 'cubo', 'cilindro', 'bloco')], 4))
    c = bloco(1, 'Complete a tabela.', tabela(['Forma', 'Rola?', 'Fica em pé?', 'Um objeto parecido'], [
        [solido(t, 40), '', '', ''] for t in ('esfera', 'cubo', 'cilindro', 'cone', 'bloco', 'piramide')])) + bloco(
        2, 'Quantas faces planas tem? Use o objeto de verdade para contar.', grade([
            f'<p class="du">Cubo: {VAZIO}</p>', f'<p class="du">Cilindro: {VAZIO}</p>', f'<p class="du">Cone: {VAZIO}</p>', f'<p class="du">Esfera: {VAZIO}</p>'], 2))
    return ficha(
        'formas-espaciais-no-dia-a-dia', 'Formas espaciais: esfera, cubo, cilindro e cone', '1º e 2º ano',
        'Relacionar objetos do dia a dia a esferas, cubos, cilindros, cones e blocos retangulares, e descobrir quais rolam.',
        ['EF01MA13', 'EF02MA14', ('EF03MA13', 'versão C')], '30 a 45 minutos',
        'Objetos reais: bola, dado, caixa de sapato, lata, chapéu de festa ou casquinha; sólidos geométricos de madeira, se a escola tiver.',
        ['Coloque os objetos numa caixa e deixe o estudante tirar um por vez, sem olhar, e dizer como é.',
         'Teste com a turma: quais rolam, quais ficam em pé, quais fazem as duas coisas.',
         'Mostre o sólido de madeira (ou a figura da folha) ao lado do objeto.',
         'Na versão C, conte as faces planas com o objeto na mão, marcando cada face com um adesivo.',
         'Feche com uma caça às formas na sala ou no pátio.'],
        ['Tocar e nomear: cada forma com o objeto real e o nome dito em voz alta. Na versão A, basta reconhecer.',
         'A caixa de "pegar sem olhar" pode incomodar: deixe o objeto à vista se for o caso. Use objetos do interesse do estudante.',
         'O teste de rolar e empilhar dá movimento e uma pergunta clara para cada objeto.'],
        ['Cubo, cilindro, cone.', 'Bloco 1: esfera, cubo, cilindro, cone, bloco retangular, cone. Bloco 2: esfera e cilindro.',
         'Bloco 1: esfera rola e não fica em pé; cubo não rola e fica em pé; cilindro rola e fica em pé; cone rola (em roda) e fica em pé; bloco não rola e fica em pé; pirâmide não rola e fica em pé. Bloco 2: 6, 2, 1, 0.'],
        a, b, c)


def comparar_medidas():
    a = bloco(1, 'Qual é o mais alto? Circule.', grade([
        item(comparar_alturas([40, 110], ['A', 'B']), opcoes(['A', 'B'], certa='B'), exemplo=True),
        item(comparar_alturas([120, 70], ['A', 'B']), opcoes(['A', 'B'])),
    ], 2)) + bloco(2, 'Qual é o mais pesado? Circule o lado que desceu.', grade([
        item(balanca('maca', 'estrela', 1), opcoes(['maçã', 'estrela'], certa='maçã'), exemplo=True),
        item(balanca('flor', 'bola', -1), opcoes(['flor', 'bola'])),
    ], 2), 'Na balança, o lado mais pesado fica mais baixo.')
    b = bloco(1, 'Pinte o mais comprido de amarelo e o mais curto de verde.', grade([
        item(comparar_alturas([60, 130, 95], ['A', 'B', 'C'], cor=False))], 1)) + bloco(2, 'Em qual copo tem mais água? Circule.', grade([
            item(copo(.3, 70, 'copo com pouca água') + copo(.8, 70, 'copo quase cheio') + copo(.55, 70, 'copo pela metade'), opcoes(['1', '2', '3']))], 1)) + bloco(
        3, 'Meça com palitos ou clipes e escreva.', tabela(['O que medi', 'Quantos clipes?'], [['Meu lápis', ''], ['Meu caderno', ''], ['Minha mão', '']]))
    c = bloco(1, 'Coloque em ordem do mais baixo para o mais alto. Escreva as letras.',
              item(comparar_alturas([90, 40, 130, 65], ['A', 'B', 'C', 'D'], 70), f'<p class="du">Do mais baixo ao mais alto: {VAZIO} {VAZIO} {VAZIO} {VAZIO}</p>')) + bloco(2, 'Balanças: complete com "mais pesado" ou "mais leve".',
        grade([item(balanca('pao', 'ovo', 1), '<p class="du">O pão é <span class="linha-resp"></span> que o ovo.</p>'),
               item(balanca('lapis', 'leite', -1), '<p class="du">O lápis é <span class="linha-resp"></span> que o leite.</p>')], 2)) + bloco(
        3, 'Meça com a mão (palmos) e com o pé (passos).', tabela(['O que medi', 'Palmos', 'Passos'], [['A mesa', '', '—'], ['A porta', '', '—'], ['A sala', '—', '']]))
    return ficha(
        'comparar-medidas-alto-pesado-cabe-mais', 'Mais alto, mais pesado, cabe mais', '1º ano',
        'Comparar comprimentos, massas e capacidades: quem é mais alto, o que pesa mais, onde cabe mais, e medir com clipes e palmos.',
        ['EF01MA15'], '30 a 45 minutos', 'Uma balança de dois pratos (pode ser um cabide com dois copos pendurados), copos iguais, água, clipes e palitos.',
        ['Compare a altura de dois estudantes, de costas um para o outro. Use a palavra "mais alto".',
         'Na balança de cabide, coloque dois objetos e pergunte qual desceu. Explique que o que desce é o mais pesado.',
         'Encha copos iguais com quantidades diferentes de água e compare.',
         'Na versão B e C, meça objetos da sala com clipes ou palmos e registre.',
         'Pergunte por que dois estudantes encontraram medidas diferentes com o palmo.'],
        ['Faça cada comparação primeiro com o corpo e com objetos. Use pares de palavras fixos (alto e baixo, pesado e leve).',
         'Medir com clipes enfileirados é uma tarefa com regras claras: mostre como alinhar o primeiro clipe na ponta.',
         'A balança e a água dão movimento e resultado visível na hora. Deixe o estudante fazer a experiência.'],
        ['Bloco 1: A. Bloco 2: bola.', 'Bloco 1: B amarelo, A verde. Bloco 2: copo 2.',
         'Bloco 1: B, D, A, C. Bloco 2: mais pesado; mais leve.'],
        a, b, c)


def calendario_ficha():
    a = bloco(1, 'Hoje é... Circule o dia da semana.', '<div class="opcoes opcoes-dias">' + ''.join(f'<span class="opcao">{d}</span>' for d in ('domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado')) + '</div>') + bloco(
        2, 'Complete: manhã, tarde ou noite?', '<div class="frases">' +
        ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in ('Quando o sol nasce e eu acordo é de', 'Quando eu almoço é de', 'Quando a lua aparece é de')) + '</div>',
        'O professor lê a frase. O estudante pode responder falando.') + bloco(
        3, 'Pinte no calendário o dia do seu aniversário, se for neste mês.', calendario(2026, 11, cel='13mm'))
    b = bloco(1, 'Olhe o calendário e responda.', calendario(2026, 11, destaques=(15, 20), cel='11mm') + '<div class="frases">' + ''.join(
        f'<p>{t} <span class="linha-resp"></span></p>' for t in ('Que mês é este?', 'Quantos dias tem este mês?', 'Em que dia da semana cai o dia 15?', 'Em que dia da semana cai o dia 20?')) + '</div>') + bloco(
        2, 'Escreva a data de hoje.', f'<p class="conta">{VAZIO} / {VAZIO} / {resposta("", "26mm")}</p><p class="dica">dia / mês / ano</p>')
    c = bloco(1, 'Use o calendário de novembro de 2026.', calendario(2026, 11, cel='10mm') + '<div class="frases">' + ''.join(
        f'<p>{t} <span class="linha-resp"></span></p>' for t in ('Quantos domingos tem este mês?', 'Que dia da semana é o dia 1º de dezembro?',
                                                                 'Uma viagem sai no dia 9 e volta no dia 16. Quantos dias dura?', 'Escreva a data do último dia do mês, com números.')) + '</div>') + bloco(
        2, 'Escreva os meses do ano na ordem.', '<div class="meses">' + ''.join(f'<span>{i}. <i class="linha-resp"></i></span>' for i in range(1, 13)) + '</div>')
    return ficha(
        'calendario-dias-semanas-e-meses', 'Calendário: dias, semanas e meses', '1º e 2º ano',
        'Dias da semana, partes do dia, meses do ano e leitura do calendário, com a escrita da data.',
        ['EF01MA17', 'EF01MA18', ('EF02MA18', 'versão C')], '20 a 40 minutos', 'O calendário da sala; cartões com os dias da semana; uma folha de calendário do mês atual.',
        ['Comece a aula olhando o calendário da sala: que dia é hoje, ontem e amanhã.',
         'Cante ou recite os dias da semana na ordem, apontando os cartões.',
         'Na versão A, as perguntas são lidas pelo professor e a resposta pode ser falada.',
         'Na versão B e C, localize as linhas do calendário (semanas) e as colunas (dias da semana).',
         'O calendário desta ficha é de novembro de 2026. Se aplicar em outro mês, use o calendário do mês atual e ajuste as respostas.'],
        ['A rotina do calendário todos os dias é o que fixa a habilidade. Use sempre o mesmo lugar e as mesmas palavras.',
         'O calendário costuma ser uma referência de previsibilidade muito útil para estudantes autistas. Marque nele os eventos da semana com figuras.',
         'Dê ao estudante a tarefa de atualizar o calendário da sala a cada dia.'],
        ['Respostas pessoais (dia da semana do dia de aplicação, partes do dia: manhã, tarde, noite).',
         'Bloco 1: novembro; 30; domingo; sexta-feira. Bloco 2: data do dia.',
         'Bloco 1: 5 domingos (1, 8, 15, 22 e 29); terça-feira; 7 dias; 30/11/2026. Bloco 2: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro.'],
        a, b, c)


def certo_talvez_impossivel():
    op3 = opcoes(['certo', 'talvez', 'impossível'])
    a = bloco(1, 'Olhe o pote. Se eu tirar uma bolinha sem olhar...', grade([
        item(pote(['amarelo'] * 6, 110, 'pote só com bolinhas amarelas'), '<p class="legenda">sai amarela?</p>' + opcoes(['certo', 'impossível'], certa='certo'), exemplo=True, classe='largo'),
        item(pote(['verde'] * 6, 110, 'pote só com bolinhas verdes'), '<p class="legenda">sai amarela?</p>' + opcoes(['certo', 'impossível']), classe='largo'),
        item(pote(['verde', 'amarelo', 'verde', 'amarelo', 'verde', 'amarelo'], 110, 'pote com bolinhas verdes e amarelas'), '<p class="legenda">sai amarela?</p>' + opcoes(['certo', 'talvez']), classe='largo'),
    ], 1), 'Faça a experiência com um pote e bolinhas de verdade antes.')
    b = bloco(1, 'Circule: certo, talvez ou impossível.', '<div class="frases frases-op">' + ''.join(
        f'<div><p>{t}</p>{op3}</div>' for t in ('Amanhã o sol vai nascer.', 'Vai chover amanhã.', 'Um peixe vai andar de bicicleta.',
                                                 'Vou comer arroz no almoço.', 'Ao jogar um dado, sai o número 7.')) + '</div>')
    c = bloco(1, 'Escreva certo, talvez ou impossível.', '<div class="frases">' + ''.join(
        f'<p>{t} <span class="linha-resp"></span></p>' for t in ('Ao jogar um dado, sai um número menor que 7.', 'Ao jogar uma moeda, sai cara.',
                                                                   'Tirar uma bolinha verde de um pote só com bolinhas rosa.', 'Hoje vai ter recreio.')) + '</div>') + bloco(
        2, 'Pinte as bolinhas do pote para que tirar amarela seja impossível.', pote(['branco'] * 10, 130, 'pote com bolinhas para pintar')) + bloco(
        3, 'Escreva uma coisa certa, uma talvez e uma impossível para amanhã.', linhas(3))
    return ficha(
        'certo-talvez-ou-impossivel', 'Certo, talvez ou impossível', '1º e 2º ano',
        'Primeiras ideias de probabilidade: classificar acontecimentos e sorteios de bolinhas como certos, possíveis ou impossíveis.',
        ['EF01MA20', ('EF02MA21', 'versão C')], '20 a 30 minutos', 'Um pote opaco ou saquinho, bolinhas ou tampinhas de duas cores, um dado e uma moeda.',
        ['Coloque só tampinhas de uma cor no saquinho e pergunte: se eu tirar uma, de que cor vai sair?',
         'Troque a mistura e repita. Deixe o estudante tirar e conferir.',
         'Leia as frases da folha em voz alta, uma por vez.',
         'Respostas que dependem da vida do estudante ("vou comer arroz") podem ser talvez ou certo: peça que explique.',
         'Na versão C, o estudante cria o pote: é o momento de verificar se entendeu "impossível".'],
        ['A experiência com o saquinho, repetida várias vezes, vale mais que a folha. Use só duas palavras no começo: certo e impossível.',
         'Frases absurdas (peixe de bicicleta) podem ser levadas ao pé da letra ou causar incômodo. Use exemplos ligados à rotina do estudante.',
         'Sortear é motivante: faça rodadas curtas em que o estudante prevê antes de tirar.'],
        ['Impossível; talvez.', 'Certo, talvez, impossível, talvez (ou certo), impossível.',
         'Bloco 1: certo; talvez; impossível; certo (ou talvez). Bloco 2: nenhuma bolinha amarela.'],
        a, b, c)


def pesquisa_da_turma():
    icones = ['maca', 'banana', 'pao']
    a = bloco(1, 'Conte e escreva quantos de cada.', grafico_barras(['maçã', 'banana', 'pão'], [3, 5, 2], 6, icones, celula=40) + grade([
        f'<p class="du">{svg(30, 30, figura(t, 0, 0, 30), "", t)} {VAZIO}</p>' for t in icones], 3), 'Cada quadrinho pintado é uma criança que escolheu aquela fruta.') + bloco(
        2, 'Qual teve mais votos? Circule.', opcoes([svg(56, 56, figura(t, 4, 4, 48), '', t) for t in icones]))
    b = bloco(1, 'Lanche preferido da turma. Pinte um quadrinho para cada voto.',
              tabela(['Lanche', 'Votos'], [['maçã', '||||'], ['banana', '||||| ||'], ['pão', '|||']]) + grafico_barras(['maçã', 'banana', 'pão'], None, 8, icones, vazio=True)) + bloco(
        2, 'Responda.', '<div class="frases">' + ''.join(f'<p>{t} <span class="linha-resp"></span></p>' for t in (
            'Qual lanche teve mais votos?', 'Qual teve menos votos?', 'Quantas crianças votaram ao todo?')) + '</div>')
    c = bloco(1, 'Faça a sua pesquisa com a turma: escolha uma pergunta e anote os votos.',
              '<p class="du">Pergunta: <span class="linha-resp"></span></p>' + tabela(['Resposta', 'Votos (tracinhos)', 'Total'], [['', '', ''], ['', '', ''], ['', '', ''], ['', '', '']]),
              'Exemplos: cor preferida, animal de estimação, como você vem para a escola.') + bloco(
        2, 'Faça o gráfico da sua pesquisa.', grafico_barras(['', '', '', ''], None, 10, vazio=True, celula=26)) + bloco(
        3, 'Escreva uma frase sobre o resultado.', linhas(2))
    return ficha(
        'pesquisa-da-turma-tabelas-e-graficos', 'Pesquisa da turma: tabelas e gráficos', '1º e 2º ano',
        'Ler um gráfico de colunas, registrar votos com tracinhos, pintar o gráfico e fazer a própria pesquisa com a turma.',
        ['EF01MA21', 'EF01MA22', ('EF02MA22', 'versão B e C'), ('EF02MA23', 'versão C')], '40 a 50 minutos',
        'Cartões ou figuras para votar; um gráfico grande no quadro ou no chão, montado com caixinhas ou blocos empilhados.',
        ['Faça uma votação real: cada estudante coloca um bloco na pilha da fruta preferida.',
         'Compare as pilhas: qual é a mais alta? Mostre que a pilha é o gráfico de colunas.',
         'Passe para a folha: cada quadrinho pintado é um bloco da pilha.',
         'Na versão B, mostre como contar os tracinhos de 5 em 5.',
         'Na versão C, o estudante escolhe a pergunta. Ajude a limitar a 3 ou 4 respostas possíveis.'],
        ['O gráfico com blocos empilhados é concreto e visual. Use as mesmas três categorias por algumas aulas.',
         'Votar e conversar com a turma pode ser difícil: o estudante pode registrar os votos que o professor diz, em vez de perguntar aos colegas.',
         'A versão C dá ao estudante a tarefa de entrevistar os colegas, com movimento e um papel claro.'],
        ['Bloco 1: maçã 3, banana 5, pão 2. Bloco 2: banana.', 'Bloco 1: maçã 4, banana 7, pão 3. Bloco 2: banana; pão; 14.',
         'Respostas pessoais, conferidas com a tabela do estudante.'],
        a, b, c)


FICHAS = [numeros_ate_100, separar_e_organizar, localizacao, formas_espaciais, comparar_medidas, calendario_ficha,
          certo_talvez_impossivel, pesquisa_da_turma]
