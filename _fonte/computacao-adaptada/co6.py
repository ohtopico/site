"""6º ano: fichas adaptadas das folhas para imprimir de BNCC Computação (EF06CO01 a EF06CO10)."""
from comp import (CAIXA, VAZIO, bloco, caixa_texto, caixas, cartoes, codigo, comandos, escolha, ficha, frases, grade, grafo,
                  item, labirinto, ligar, linhas, marcar, opcoes, ordenar, p, quadro_ex, resp_linha, resposta, tabela)


def tipos_de_dados():
    a = bloco(1, 'Que tipo de dado é? Circule.', escolha([
        ('"Ana"', ['texto', 'número', 'lógico'], 'texto'),
        ('12', ['texto', 'número', 'lógico'], None),
        ('verdadeiro', ['texto', 'número', 'lógico'], None),
        ('"azul"', ['texto', 'número', 'lógico'], None)]), 'Texto vem entre aspas. Número dá para fazer conta. Lógico é só verdadeiro ou falso.') + bloco(
        2, 'Ligue cada dado do pet ao tipo.', ligar([('Nome do pet: "Rex"', 'número'), ('Idade: 3', 'lógico'), ('Está vacinado? sim', 'texto')]))
    b = bloco(1, 'Escreva T (texto), N (número) ou L (lógico) em cada cartão.', grade([
        item('<b class="dado">"Ana"</b>', resposta('T'), exemplo=True), item('<b class="dado">12</b>', VAZIO), item('<b class="dado">falso</b>', VAZIO),
        item('<b class="dado">3,5</b>', VAZIO), item('<b class="dado">"gato"</b>', VAZIO), item('<b class="dado">2026</b>', VAZIO)], 3)) + bloco(
        2, 'Complete a ficha do pet.', tabela(['Informação', 'Exemplo', 'Tipo'], [
            ['Nome do pet', '"Rex"', 'texto'], ['Idade em anos', '', ''], ['Peso em kg', '', ''], ['Está vacinado?', '', '']]), 'A primeira linha é o exemplo.')
    c = bloco(1, 'Escreva T, N ou L em cada cartão.', cartoes(['"Ana" ___', '12 ___', 'verdadeiro ___', '3,5 ___', '"azul" ___', 'falso ___', '2026 ___', '"12" ___'], 4)) + bloco(
        2, 'Complete a ficha do pet.', tabela(['Informação', 'Exemplo', 'Tipo'], [
            ['Nome do pet', '', ''], ['Idade em anos', '', ''], ['Peso em kg', '', ''], ['Está vacinado?', '', ''], ['Cor do pelo', '', '']])) + bloco(
        3, 'Ache o intruso de cada coleção e diga o tipo da coleção.', frases(['7 · 15 · "sete" · 40', 'verdadeiro · falso · "falso" · verdadeiro', '"gato" · "cão" · 9 · "peixe"']),
        'Cuidado: "12" entre aspas é texto.')
    return ficha(
        'cada-dado-no-seu-pote', 'Cada dado no seu pote', 'EF06CO01',
        'Classificar informações em coleções e dizer o tipo de cada dado: texto, número ou lógico.',
        'Três potes ou caixas com as etiquetas texto, número e lógico; cartões com dados recortados.',
        ['Mostre os três potes e coloque um exemplo em cada um, dizendo por que ele vai ali.',
         'Distribua cartões e deixe cada estudante colocar um dado no pote certo antes da folha.',
         'Lembre a pista: aspas indicam texto; número permite fazer conta; lógico é sim ou não.',
         'Na versão A o estudante circula e liga; na B escreve a letra; na C também acha intrusos.'],
        ['Use cartões grandes e só três tipos por vez. Mostre o pote e diga o nome do tipo em voz alta a cada cartão.',
         'Use sempre a mesma cor para cada tipo (por exemplo, círculo, quadrado e triângulo) e mantenha o quadro com a regra na mesa.',
         'Transforme em jogo rápido de separar cartões nos potes, com tempo curto e pausa entre as rodadas.'],
        ['Bloco 1: texto; número; lógico; texto. Bloco 2: nome = texto, idade = número, vacinado = lógico.',
         'Bloco 1: T, N, L, N, T, N. Bloco 2: idade = número; peso = número; vacinado = lógico (exemplos livres).',
         'Bloco 1: T, N, L, N, T, L, N, T ("12" entre aspas é texto). Bloco 2: texto, número, número, lógico, texto. Bloco 3: "sete" (números); "falso" com aspas (lógicos); 9 (textos).'],
        a, b, c)


def robo_labirinto():
    leg = '<div class="legenda-cmd"><span><span class="cmd">↑</span> anda uma casa</span><span><span class="cmd">↶</span> vira à esquerda</span><span><span class="cmd">↷</span> vira à direita</span></div>'
    lab_a = labirinto(4, {(1, 0), (1, 1), (3, 2)}, (0, 0, 'S'), (2, 0), cel=16, desc='labirinto 4 por 4 com o robô no canto e o alvo')
    a = bloco(1, 'O robô segue as setas. Ele chega ao alvo? Circule.', leg + '<div class="lado-a-lado" style="--cols:62mm 1fr">' + lab_a +
              '<div>' + comandos('FFEFFEFF') + opcoes(['chega', 'não chega']) + '</div></div>', 'O robô começa olhando para baixo.') + bloco(
        2, 'Complete o programa com a seta que falta.', '<div class="lado-a-lado" style="--cols:62mm 1fr">' + labirinto(4, {(1, 1), (2, 1)}, (0, 3, 'L'), (3, 3), cel=16, desc='labirinto com caminho reto') +
        '<div>' + comandos('FF', 1) + p('Desenhe a seta na caixa vazia.') + '</div></div>')
    b = bloco(1, 'Escreva o programa para o robô chegar ao alvo.', leg + '<div class="lado-a-lado" style="--cols:70mm 1fr">' +
              labirinto(5, {(1, 0), (1, 1), (1, 2), (3, 2), (3, 3), (3, 4)}, (0, 0, 'S'), (4, 4), cel=14, desc='labirinto 5 por 5') +
              '<div>' + p('Desenhe uma seta em cada caixa.') + comandos('FF', 14) + '</div></div>') + bloco(
        2, 'Encurte com repita.', p('O programa ↑ ↑ ↑ ↑ pode virar: <b>repita 4 vezes ↑</b>.') + quadro_ex(p('↷ ↷ ↷ vira: <b>repita 3 vezes ↷</b>')) +
        frases(['↑ ↑ ↑ ↑ ↑ vira: repita', '↶ ↶ vira: repita']))
    c = bloco(1, 'Escreva o programa mais curto que leve o robô ao alvo, passando pela moeda.', leg + '<div class="lado-a-lado" style="--cols:76mm 1fr">' +
              labirinto(6, {(1, 0), (1, 1), (1, 2), (1, 3), (3, 2), (3, 3), (3, 4), (3, 5), (5, 1)}, (0, 0, 'S'), (5, 5), cel=12.5, extras={(2, 0): '$'}, desc='labirinto 6 por 6 com uma moeda') +
              '<div>' + linhas(5) + '</div></div>', 'Use repita quando a mesma seta aparecer várias vezes seguidas.') + bloco(
        2, 'O robô vai ao lanche?', '<div class="lado-a-lado">' + codigo('moedas ← 0\nrepita 3 vezes\n    moedas ← moedas + 5\nse moedas > 12 então\n    mostre "vou ao lanche"\nsenão\n    mostre "vou guardar"') +
        '<div>' + frases(['Moedas no fim:', 'Aparece na tela:', 'E com repita 2 vezes?']) + '</div></div>')
    return ficha(
        'robo-no-labirinto', 'Robô no labirinto', 'EF06CO02',
        'Escrever algoritmos com sequência, repetição e decisão para levar um robô até o alvo.',
        'Fita crepe no chão formando uma grade, cartões grandes de seta, um colega no papel de robô.',
        ['Monte uma grade no chão e peça para um colega ser o robô, que só obedece às setas.',
         'Mostre a diferença entre andar e virar: virar não sai da casa.',
         'Escreva um programa longo e mostre como o repita encurta.',
         'Na versão A o estudante confere ou completa programas; na B escreve; na C usa repita e lê uma decisão (se, senão).'],
        ['Use cartões de seta para montar o programa na mesa antes de desenhar. Faça um movimento de cada vez, com o dedo no labirinto.',
         'Mantenha a legenda das setas sempre visível e combine que o robô sempre começa olhando para o mesmo lado indicado.',
         'Deixe o estudante ser o robô na grade do chão. Peça para testar o programa logo depois de escrever cada parte.'],
        ['Bloco 1: chega. Bloco 2: ↑ (a terceira seta para frente).',
         'Bloco 1: ↑ ↑ ↑ ↶ ↑ ↑ ↶ ↑ ↑ ↷ ↑ ↑ ↷ ↑ ↑ ↑ (outros caminhos valem se chegarem ao alvo). Bloco 2: repita 5 vezes ↑; repita 2 vezes ↶.',
         'Bloco 1: repita 4 ↑, ↶, repita 2 ↑, ↶, repita 4 ↑ (pega a moeda), ↷, repita 2 ↑, ↷, repita 5 ↑, ↶, ↑. Bloco 2: 15 moedas; "vou ao lanche"; com 2 vezes, 10 moedas e "vou guardar".'],
        a, b, c)


def ditado_desenho():
    a = bloco(1, 'Qual instrução é precisa? Circule.', escolha([
        ('Para desenhar uma linha:', ['Faça um risco bonito.', 'Ligue o ponto A ao ponto B.'], 'Ligue o ponto A ao ponto B.'),
        ('Para desenhar um quadrado:', ['Desenhe 4 lados iguais, virando à direita.', 'Faça uma forma legal.'], None),
        ('Para pintar:', ['Pinte o que quiser.', 'Pinte o círculo de amarelo.'], None)]), 'Precisa é a instrução que todo mundo segue do mesmo jeito.') + bloco(
        2, 'Siga as instruções e desenhe aqui.', p('1. Desenhe um quadrado grande. 2. Desenhe um triângulo em cima do quadrado. 3. Desenhe uma porta no meio do quadrado.') + '<div class="caixa-desenho" style="height:62mm"></div>')
    b = bloco(1, 'Marque a instrução precisa.', marcar(['Desenhe um foguete bonito no meio.', 'Ligue o ponto 1 ao ponto 2, depois o 2 ao 3.', 'Faça uma ponta em cima e umas asas.'], ['Precisa?'], exemplo=None)) + bloco(
        2, 'Complete a descrição da casinha.', quadro_ex(p('1. Desenhe um quadrado.')) + frases(['2. Em cima do quadrado, desenhe', '3. No meio do quadrado, desenhe', '4. Ao lado da porta, desenhe']) +
        '<div class="caixa-desenho" style="height:44mm"><span class="rotulo-caixa">Agora um colega desenha seguindo sua descrição</span></div>')
    c = bloco(1, 'Escreva instruções precisas para desenhar este robô, sem mostrar o desenho.', '<div class="lado-a-lado" style="--cols:56mm 1fr">' +
              '<svg viewBox="0 0 60 60" class="grafo" role="img" aria-label="robô feito de um quadrado como cabeça, retângulo como corpo e duas antenas"><rect x="20" y="8" width="20" height="16" fill="#fff" stroke="#111" stroke-width="1.4"/><circle cx="26" cy="15" r="2" fill="#111"/><circle cx="34" cy="15" r="2" fill="#111"/><line x1="25" y1="8" x2="22" y2="2" stroke="#111" stroke-width="1.4"/><line x1="35" y1="8" x2="38" y2="2" stroke="#111" stroke-width="1.4"/><rect x="15" y="26" width="30" height="24" fill="#fff" stroke="#111" stroke-width="1.4"/><rect x="18" y="50" width="6" height="8" fill="#fff" stroke="#111" stroke-width="1.4"/><rect x="36" y="50" width="6" height="8" fill="#fff" stroke="#111" stroke-width="1.4"/></svg>' +
              '<div>' + linhas(6) + '</div></div>', 'Diga a forma, o tamanho e onde fica cada parte.') + bloco(
        2, 'O colega desenha aqui.', '<div class="caixa-desenho" style="height:44mm"></div>') + bloco(
        3, 'Os desenhos ficaram iguais? Qual instrução causou a diferença e como você reescreveria?', linhas(2))
    return ficha(
        'ditado-de-desenho', 'Ditado de desenho', 'EF06CO03',
        'Descrever uma solução com instruções precisas, que qualquer pessoa consiga seguir do mesmo jeito.',
        'Folhas em branco, lápis, um desenho simples escondido em um envelope.',
        ['Dê uma instrução vaga ("faça um desenho bonito") e mostre como cada um faz de um jeito.',
         'Depois dê instruções precisas e compare: os desenhos ficam parecidos.',
         'Explique que o computador faz exatamente o que está escrito, sem adivinhar.',
         'Na versão A o estudante escolhe e segue instruções; na B completa uma descrição; na C escreve a descrição inteira e testa com um colega.'],
        ['Leia as instruções em voz alta, uma por vez, e espere o desenho de cada passo antes de ler o próximo.',
         'Explique que a regra do jogo é seguir ao pé da letra; deixe claro quando a atividade começa e termina e quem desenha em cada rodada.',
         'Faça rodadas curtas em dupla: um descreve, o outro desenha, e trocam. Comparar os desenhos no fim é a recompensa.'],
        ['Bloco 1: Ligue o ponto A ao ponto B; Desenhe 4 lados iguais, virando à direita; Pinte o círculo de amarelo. Bloco 2: uma casa com telhado e porta.',
         'Bloco 1: a do meio (com números dos pontos). Bloco 2: por exemplo, um triângulo (telhado); uma porta (retângulo); uma janela (quadrado pequeno).',
         'Bloco 1: resposta livre, com forma, tamanho e posição (quadrado como cabeça, dois olhos, duas antenas, retângulo maior como corpo, duas pernas). Blocos 2 e 3: resposta livre.'],
        a, b, c)


def decomposicao():
    a = bloco(1, 'Para fazer um sanduíche, ligue cada parte à ordem.', ordenar(['Pegar o pão', 'Passar o recheio', 'Fechar o pão', 'Comer'], exemplo=(0, 1)), 'Escreva 1, 2, 3 e 4 nas caixas.') + bloco(
        2, 'A festa da turma tem três partes. Circule o que é de cada parte.', escolha([
            ('Decoração', ['balões', 'suco'], 'balões'), ('Comida', ['cartaz', 'bolo'], None), ('Música', ['caixa de som', 'pratos'], None)]))
    b = bloco(1, 'Divida a gincana da escola em partes. Escreva duas tarefas em cada parte.', caixas(['Equipes', 'Provas', 'Lanche'], 3, '34mm'), 'Exemplo para Equipes: escolher os nomes.') + bloco(
        2, 'Ligue as partes do jogo da memória ao que elas fazem.', ligar([('Embaralhar', 'conta os pontos'), ('Virar duas cartas', 'mistura as cartas no começo'), ('Placar', 'mostra as cartas escolhidas')]))
    c = bloco(1, 'Divida a gincana em partes e cada parte em tarefas menores.', caixas(['Equipes', 'Provas', 'Lanche'], 3, '36mm')) + bloco(
        2, 'Ligue as partes do jogo da memória ao que elas fazem.', ligar([('Embaralhar', 'confere se as cartas são iguais'), ('Virar duas cartas', 'conta os pontos'), ('Comparar', 'mistura as cartas no começo'), ('Placar', 'mostra as cartas escolhidas')])) + bloco(
        3, 'Divida "gravar um vídeo para a feira de ciências" em quatro partes, em ordem.', caixas(['1', '2', '3', '4'], 4, '22mm'))
    return ficha(
        'divida-para-resolver', 'Divida para resolver', 'EF06CO04',
        'Usar a decomposição: quebrar um problema grande em partes menores e mais fáceis de resolver.',
        'Uma receita simples (sanduíche ou suco), cartões com etapas, um quebra-cabeça.',
        ['Pergunte como organizar uma festa inteira de uma vez. Depois mostre como fica mais fácil por partes.',
         'Monte com a turma a lista de partes no quadro e, em cada parte, as tarefas menores.',
         'Mostre que um programa também é feito de partes (embaralhar, virar, comparar, placar).',
         'Na versão A o estudante ordena e escolhe; na B escreve tarefas; na C decompõe um problema próprio.'],
        ['Use cartões com imagens das etapas e monte a sequência na mesa antes de numerar.',
         'Apresente as partes sempre na mesma estrutura (caixas com título) e um modelo pronto. Mostre o fim esperado antes de começar.',
         'Uma parte de cada vez: quando terminar uma caixa, marque um visto e só então passe para a próxima.'],
        ['Bloco 1: 1 pegar o pão, 2 passar o recheio, 3 fechar, 4 comer. Bloco 2: balões; bolo; caixa de som.',
         'Bloco 1: resposta livre (equipes: nomes, sorteio; provas: corrida, quiz; lanche: suco, frutas). Bloco 2: embaralhar = mistura; virar = mostra; placar = conta.',
         'Bloco 1: resposta livre. Bloco 2: embaralhar = mistura; virar = mostra; comparar = confere; placar = conta. Bloco 3: por exemplo, roteiro, gravação, edição, publicação.'],
        a, b, c)


def abstracao():
    a = bloco(1, 'Para o cartaz de gata perdida, o que importa? Circule sim ou não.', escolha([
        ('Cor do pelo', ['sim', 'não'], 'sim'), ('Tem medo do aspirador', ['sim', 'não'], None), ('Coleira vermelha', ['sim', 'não'], None), ('Gosta de dormir na janela', ['sim', 'não'], None)], 2)) + bloco(
        2, 'Desenhe um sol com no máximo 5 traços.', '<div class="caixa-desenho" style="height:50mm"></div>', 'Abstrair é ficar só com o importante.')
    b = bloco(1, 'Marque o que importa em cada situação.', marcar(['Chama-se Mimi', 'Tem 3 anos', 'Pelo cinza com listras', 'Tomou as vacinas', 'Tem medo do aspirador', 'Coleira vermelha'],
                                                                 ['Veterinário', 'Cartaz'], exemplo=(2, 1), largura='30mm')) + bloco(
        2, 'Desenhe os ícones com no máximo 5 traços.', grade([item('<div class="caixa-desenho" style="height:34mm"></div>', '<p class="legenda">casa</p>'),
                                                              item('<div class="caixa-desenho" style="height:34mm"></div>', '<p class="legenda">celular</p>')], 2))
    c = bloco(1, 'Marque o que importa em cada situação. Um detalhe pode servir para as duas ou para nenhuma.',
              marcar(['Chama-se Mimi', 'Tem 3 anos', 'Pelo cinza com listras pretas', 'Pesa 4 kg', 'Gosta de dormir na janela', 'Tomou todas as vacinas', 'Tem medo do aspirador', 'Olhos verdes', 'Coleira vermelha com guizo'],
                     ['Veterinário', 'Cartaz'], largura='30mm')) + bloco(
        2, 'Desenhe três ícones com no máximo 5 traços: bicicleta, casa e celular.', grade([item('<div class="caixa-desenho" style="height:28mm"></div>') for _ in range(3)], 3)) + bloco(
        3, 'Quais são as entradas e a saída de um app que diz se a gata precisa de vacina?', frases(['Entradas:', 'Saída:']))
    return ficha(
        'o-que-importa', 'O que importa?', 'EF06CO05',
        'Usar a abstração: separar as informações importantes (entradas) das que não ajudam, para cada problema.',
        'Um mapa simples do bairro ou do metrô, fotos de objetos, cartões com detalhes de um animal.',
        ['Mostre um mapa de metrô e pergunte o que ficou de fora (prédios, árvores) e por quê.',
         'Leia a ficha da Mimi e pergunte: para o veterinário, o que importa? E para o cartaz?',
         'Explique que o importante muda conforme o problema.',
         'Na versão A o estudante decide sim ou não para uma situação; na B marca duas situações; na C também define entradas e saída.'],
        ['Mostre uma foto real da gata ao lado do cartaz, para comparar o que foi mantido. Uma situação por vez.',
         'Deixe explícita a pergunta de cada coluna ("serve para o veterinário?") e aceite que um detalhe sirva para as duas.',
         'O desafio dos 5 traços funciona bem como corrida curta; peça para um colega adivinhar o ícone.'],
        ['Bloco 1: sim; não; sim; não. Bloco 2: resposta livre.',
         'Bloco 1: veterinário: idade, vacinas (nome também ajuda); cartaz: nome, pelo, coleira. Bloco 2: resposta livre.',
         'Bloco 1: veterinário: nome, idade, peso, vacinas; cartaz: nome, pelo, olhos, coleira. Medo do aspirador e dormir na janela não servem. Bloco 3: entradas: idade, data da última vacina; saída: precisa ou não de vacina.'],
        a, b, c)


def padroes():
    a = bloco(1, 'Qual figura vem depois? Circule.', escolha([
        ('● ▲ ● ▲ ● ...', ['●', '▲'], '▲'), ('■ ■ ● ■ ■ ● ■ ■ ...', ['■', '●'], None), ('▲ ● ■ ▲ ● ■ ▲ ...', ['●', '■'], None)])) + bloco(
        2, 'Complete a sequência.', '<p class="seq-num"><span class="cel">2</span><span class="cel">4</span><span class="cel">6</span><span class="cel vazia"></span><span class="cel vazia"></span></p>', 'Cada número é 2 a mais que o anterior.')
    b = bloco(1, 'Quadrados de palitos: complete a tabela.', p('1 quadrado usa 4 palitos, 2 quadrados usam 7, 3 quadrados usam 10.') +
              tabela(['Quadrados', '1', '2', '3', '4', '5'], [['Palitos', '4', '7', '10', '', '']])) + bloco(
        2, 'A cada quadrado novo, quantos palitos entram?', resp_linha('Entram')) + bloco(
        3, 'Complete as sequências.', '<p class="seq-num"><span class="cel">2</span><span class="cel">5</span><span class="cel">8</span><span class="cel">11</span><span class="cel vazia"></span><span class="cel vazia"></span></p>' +
        p('● ▲ ■ ● ▲ ■ ● ... qual é a 10ª figura?') + resp_linha(''))
    c = bloco(1, 'Quadrados de palitos.', tabela(['Quadrados (n)', '1', '2', '3', '4', '5', '10', '50'], [['Palitos', '4', '7', '10', '', '', '', '']]) +
              resp_linha('Regra: palitos = 3 × n +')) + bloco(
        2, 'Triângulos de palitos: 1 triângulo usa 3 palitos, 2 usam 5, 3 usam 7.', tabela(['Triângulos (n)', '1', '2', '3', '4', '10', '50'], [['Palitos', '3', '5', '7', '', '', '']]) +
        resp_linha('Regra: palitos =')) + bloco(
        3, 'Escreva a regra e o 20º termo.', frases(['2, 5, 8, 11, ... regra:', '● ▲ ■ ● ▲ ■ ... a 20ª figura é:']))
    return ficha(
        'caca-aos-padroes', 'Caça aos padrões', 'EF06CO06',
        'Comparar casos parecidos, achar o que se repete e escrever uma regra que vale para todos (com uma variável).',
        'Palitos de picolé ou de fósforo usados, blocos de montar, cartões com formas.',
        ['Monte com palitos 1, 2 e 3 quadrados e conte com a turma os palitos de cada figura.',
         'Pergunte o que se repete e o que muda a cada figura nova.',
         'Mostre que a regra com n serve para qualquer número de quadrados, como uma variável num programa.',
         'Na versão A o estudante continua sequências; na B completa tabelas; na C escreve a regra com n.'],
        ['Monte as figuras com palitos de verdade e conte junto. Uma sequência de cada vez, com as figuras grandes.',
         'Use sempre a mesma tabela e destaque com cor a parte que muda. Antecipe que no fim haverá uma regra.',
         'Deixe o estudante montar a próxima figura com palitos antes de escrever; isso ajuda a manter a atenção.'],
        ['Bloco 1: ▲; ●; ●. Bloco 2: 8 e 10.',
         'Bloco 1: 13 e 16. Bloco 2: 3 palitos. Bloco 3: 14 e 17; ● (a sequência repete de 3 em 3, e 10 = 9 + 1).',
         'Bloco 1: 13, 16, 31, 151; palitos = 3 × n + 1. Bloco 2: 9, 21, 101; palitos = 2 × n + 1. Bloco 3: soma 3 a cada termo (3 × n − 1); a 20ª figura é ▲.'],
        a, b, c)


def pacotes():
    a = bloco(1, 'Os pacotes chegaram fora de ordem. Numere para montar a mensagem.', ordenar(['VIAJAM', 'OS', 'PACOTES'], exemplo=(1, 1)), 'Os números estão no cabeçalho de cada pacote.') + bloco(
        2, 'A ligação X quebrou. O pacote ainda chega ao site? Circule.', grafo({'Você': (12, 22), 'R1': (48, 8), 'R2': (48, 38), 'Site': (88, 22)},
                                                                                 [('Você', 'R1'), ('Você', 'R2'), ('R1', 'Site'), ('R2', 'Site')], w=100, h=46, marcar_x={('R1', 'Site')}, desc='rede com dois caminhos, um quebrado') +
        opcoes(['sim, por R2', 'não chega']))
    b = bloco(1, 'Monte a mensagem com os pacotes na ordem.', cartoes(['3 · VIAJAM', '1 · OS', '5 · REDE', '2 · DADOS', '4 · PELA'], 5) + resp_linha('Mensagem:')) + bloco(
        2, 'Escreva um caminho de Você até o Site sem usar a ligação X.', grafo({'Você': (10, 25), 'R1': (36, 25), 'R2': (60, 8), 'R3': (60, 42), 'Site': (90, 25)},
                                                                               [('Você', 'R1'), ('R1', 'R2'), ('R1', 'R3'), ('R2', 'Site'), ('R3', 'Site'), ('R2', 'R3')], w=100, h=50, marcar_x={('R2', 'Site')}) +
        resp_linha('Caminho: Você,'))
    c = bloco(1, 'Os pacotes chegaram assim. Monte a mensagem e descubra qual faltou.', cartoes(['5 · REDE', '2 · DADOS', '8 · PACOTES', '1 · OS', '7 · PEQUENOS', '3 · VIAJAM', '4 · PELA'], 4) +
              frases(['Mensagem:', 'Pacote que não chegou:', 'O que o computador deve pedir?'])) + bloco(
        2, 'Escreva dois caminhos de Você até o Site sem usar a ligação X.', grafo({'Você': (8, 25), 'R1': (28, 25), 'R2': (50, 8), 'R3': (50, 42), 'R4': (74, 8), 'R5': (74, 42), 'Site': (96, 25)},
                                                                                  [('Você', 'R1'), ('R1', 'R2'), ('R1', 'R3'), ('R2', 'R4'), ('R2', 'R3'), ('R3', 'R5'), ('R4', 'R5'), ('R4', 'Site'), ('R5', 'Site')], w=106, h=50, marcar_x={('R2', 'R4')}) +
        frases(['Caminho 1:', 'Caminho 2:', 'Por que é bom ter mais de um caminho?']))
    return ficha(
        'pacotes-embaralhados', 'Pacotes embaralhados', 'EF06CO07',
        'Entender como a internet manda uma mensagem em pacotes numerados, que podem seguir caminhos diferentes.',
        'Uma frase escrita em tiras de papel numeradas, envelopes, barbante para desenhar a rede no chão.',
        ['Corte uma frase em tiras numeradas, embaralhe e entregue a grupos diferentes.',
         'Peça para a turma montar a frase pela ordem dos números, como o computador faz.',
         'Desenhe a rede no quadro, quebre uma ligação e pergunte se a mensagem ainda chega.',
         'Na versão A o estudante numera e circula; na B monta e escreve um caminho; na C acha o pacote perdido e dois caminhos.'],
        ['Use tiras grandes de papel para montar a mensagem na mesa antes de escrever. Poucos pacotes por vez.',
         'Mostre o cabeçalho do pacote sempre no mesmo lugar (número à esquerda). Avise antes que alguns pacotes vêm fora de ordem.',
         'Faça a rede no chão com barbante: o estudante leva o pacote de mão em mão pelos roteadores.'],
        ['Bloco 1: OS (1), VIAJAM (2), PACOTES (3). Bloco 2: sim, por R2.',
         'Bloco 1: OS DADOS VIAJAM PELA REDE. Bloco 2: Você, R1, R3, Site (ou Você, R1, R2, R3, Site).',
         'Bloco 1: OS DADOS VIAJAM PELA REDE EM PEQUENOS PACOTES; faltou o 6 (EM); pedir o reenvio só do pacote 6. Bloco 2: por exemplo, Você, R1, R3, R5, Site e Você, R1, R2, R3, R5, R4, Site; a rede continua funcionando se uma ligação quebrar.'],
        a, b, c)


def arquivos():
    a = bloco(1, 'Em que pasta vai cada arquivo? Ligue.', ligar([('foto_zoologico.jpg', 'Matemática'), ('tabuada_do_7.xlsx', 'Fotos'), ('video_girafa.mp4', 'Vídeos')])) + bloco(
        2, 'O que faz o backup? Circule.', opcoes(['guarda uma cópia em outro lugar', 'apaga o arquivo']), 'Backup evita perder o trabalho se o computador estragar.')
    b = bloco(1, 'Escreva o número de cada arquivo na pasta certa.', p('1. prova_fracoes.pdf · 2. foto_zoologico.jpg · 3. experiencia_feijao.docx · 4. tabuada_do_7.xlsx · 5. video_girafa.mp4') +
              caixas(['Matemática', 'Ciências', 'Fotos e vídeos'], 3, '22mm')) + bloco(
        2, 'Leia os dados do arquivo e responda.', caixa_texto('<b>trabalho_final.docx</b><br>Tamanho: 2 MB · Criado em: 12/03 · Autor: Ana', 'cinza') +
        frases(['Qual é a extensão?', 'Quem é o autor?', 'Um nome melhor para o arquivo:']))
    c = bloco(1, 'Escreva o número de cada arquivo na pasta certa.', p('1. prova_fracoes.pdf · 2. foto_zoologico_01.jpg · 3. experiencia_feijao.docx · 4. tabuada_do_7.xlsx · 5. video_girafa.mp4 · 6. relatorio_plantas.docx') +
              caixas(['Matemática', 'Ciências', 'Fotos da excursão'], 3, '22mm')) + bloco(
        2, 'Leia os metadados e responda.', caixa_texto('<b>trabalho_final_v3.docx</b> · documento de texto · 2,4 MB<br>Criado em 12/03/2026 · Modificado em 20/03/2026 · Autor: Ana Souza', 'cinza') +
        frases(['Dias entre a criação e a última mudança:', 'Compactado em .zip ficou com 0,6 MB. Diminuiu:', 'Um nome melhor para o arquivo:'])) + bloco(
        3, 'Por que guardar um backup em outro lugar, e não no mesmo computador?', linhas(2))
    return ficha(
        'arquivos-em-ordem', 'Arquivos em ordem', 'EF06CO08',
        'Organizar arquivos em pastas, dar bons nomes, ler a extensão e os metadados e entender compactação e backup.',
        'Pastas de papel com etiquetas, cartões com nomes de arquivos, um computador para mostrar as propriedades de um arquivo.',
        ['Mostre uma mesa bagunçada de papéis e pergunte como achar a prova de frações.',
         'Separe os cartões nas pastas de papel com a turma, explicando a extensão (.pdf, .jpg, .mp4).',
         'No computador, abra as propriedades de um arquivo e leia os metadados juntos.',
         'Na versão A o estudante liga e circula; na B organiza e lê metadados; na C calcula e explica o backup.'],
        ['Use pastas de papel coloridas e cartões grandes. Separe primeiro só por tipo: foto, vídeo, texto.',
         'Mostre a regra do nome bom (o que é + data ou número) com um modelo fixo e mantenha-o na mesa.',
         'Transforme a separação em corrida curta; depois peça para renomear um arquivo de verdade no computador.'],
        ['Bloco 1: foto = Fotos; tabuada = Matemática; vídeo = Vídeos. Bloco 2: guarda uma cópia em outro lugar.',
         'Bloco 1: Matemática: 1 e 4; Ciências: 3; Fotos e vídeos: 2 e 5. Bloco 2: .docx; Ana; por exemplo, historia_trabalho_final_ana.docx.',
         'Bloco 1: Matemática: 1 e 4; Ciências: 3 e 6; Fotos: 2 e 5. Bloco 2: 8 dias; 1,8 MB; nome que diga o conteúdo. Bloco 3: se o computador estragar ou for roubado, a cópia no mesmo lugar também se perde.'],
        a, b, c)


def conversa():
    a = bloco(1, 'Posso mandar essa mensagem? Circule.', escolha([
        ('"Parabéns pela apresentação!"', ['siga', 'pare'], 'siga'), ('"Quem votar no Lucas é burro."', ['siga', 'pare'], None),
        ('"Alguém sabe o tema de Ciências?"', ['siga', 'pare'], None), ('Foto do colega dormindo, sem ele saber', ['siga', 'pare'], None)])) + bloco(
        2, 'Do outro lado da tela tem uma pessoa. Circule a mensagem mais gentil.', opcoes(['"Teu trabalho ficou horrível."', '"Dá para melhorar a introdução. Quer ajuda?"']))
    b = bloco(1, 'Siga, pense ou pare? Marque.', marcar(['"Alguém sabe a página do tema?"', '"Olha a foto do Pedro dormindo, kkk"', '"VOCÊS NUNCA RESPONDEM NADA!!!"', '"Quem votar no Lucas é burro."', '"Passa a senha do teu jogo?"'],
                                                         ['Siga', 'Pense', 'Pare'], exemplo=(0, 0), largura='18mm')) + bloco(
        2, 'Reescreva com respeito.', caixa_texto('"Teu trabalho ficou horrível, refaz tudo."') + linhas(2))
    c = bloco(1, 'Siga, pense ou pare? Marque.', marcar(['"Alguém sabe a página do tema de Ciências?"', '"Olha a foto que tirei do Pedro dormindo, kkk"', '"Parabéns pela apresentação!"', '"Quem votar no Lucas é burro."',
                                                        '"Não concordo, acho o museu melhor."', '"Passa a senha do teu jogo?"', '"VOCÊS NUNCA RESPONDEM NADA!!!"', '"A Júlia falou mal de vocês" (sem certeza)'],
                                                       ['Siga', 'Pense', 'Pare'], largura='18mm')) + bloco(
        2, 'Reescreva com respeito.', caixa_texto('"Teu trabalho ficou horrível, refaz tudo."') + linhas(1)) + bloco(
        3, 'Escreva três combinados para o grupo da turma na internet.', linhas(3))
    return ficha(
        'semaforo-da-conversa', 'Semáforo da conversa', 'EF06CO09',
        'Pensar antes de enviar: reconhecer mensagens respeitosas, as que pedem cuidado e as que ofendem ou expõem alguém.',
        'Três cartões grandes (verde siga, amarelo pense, vermelho pare), prints fictícios de mensagens.',
        ['Mostre os três cartões do semáforo e combine o que cada cor quer dizer.',
         'Leia mensagens em voz alta e peça para a turma levantar a cor.',
         'Converse sobre o que se perde na tela: rosto, tom de voz, e que o que se publica pode ser copiado.',
         'Na versão A o estudante escolhe entre siga e pare; na B usa as três cores e reescreve; na C também cria combinados.'],
        ['Use só duas opções no começo (siga e pare) e cartões com cores. Leia cada mensagem junto e pergunte: isso deixa alguém triste?',
         'Explique de forma concreta por que cada mensagem fere (expõe, xinga, mente). Combine as regras por escrito, sem ironia.',
         'Faça como jogo de semáforo com os cartões, rodadas curtas, e termine com a reescrita de uma mensagem só.'],
        ['Bloco 1: siga; pare; siga; pare. Bloco 2: "Dá para melhorar a introdução. Quer ajuda?".',
         'Bloco 1: siga; pare; pense; pare; pare. Bloco 2: por exemplo, "Acho que dá para melhorar algumas partes. Quer ajuda?".',
         'Bloco 1: siga: página do tema, parabéns, discordar com argumento; pense: maiúsculas; pare: foto do Pedro, chamar de burro, pedir senha, espalhar sem certeza. Blocos 2 e 3: resposta livre.'],
        a, b, c)


def celular():
    a = bloco(1, 'O celular ainda funciona. O que é melhor fazer? Circule.', escolha([
        ('A tela quebrou.', ['consertar', 'jogar no lixo'], 'consertar'), ('Comprei um novo e o velho funciona.', ['doar', 'jogar no lixo'], None),
        ('Não funciona mais.', ['levar à coleta', 'jogar no lixo'], None)])) + bloco(
        2, 'Numere a vida do celular de 1 a 3.', ordenar(['Uso por muitos anos', 'Fábrica', 'Reciclagem'], exemplo=(1, 1)))
    b = bloco(1, 'Numere a vida de um celular de 1 a 5.', ordenar(['Uso por muitos anos', 'Extração de minérios', 'Montagem na fábrica', 'Reciclagem em ponto de coleta', 'Venda na loja'], exemplo=(1, 1))) + bloco(
        2, 'Programada ou percebida? Marque.', p('Programada: feito para durar pouco. Percebida: ainda funciona, mas a propaganda faz achar velho.') +
        marcar(['A bateria para em 2 anos e não pode ser trocada.', 'Trocar de celular por causa de uma cor nova.', 'Achar o celular feio depois de uma propaganda.'], ['Programada', 'Percebida'], exemplo=(0, 0), largura='26mm'))
    c = bloco(1, 'Numere a vida de um celular de 1 a 6.', ordenar(['Uso por muitos anos', 'Extração de minérios', 'Montagem na fábrica', 'Reciclagem em ponto de coleta', 'Transporte e venda na loja', 'Conserto quando a tela quebra'], colunas=2)) + bloco(
        2, 'Programada ou percebida? Marque.', marcar(['A bateria para em 2 anos e não pode ser trocada.', 'Trocar de celular porque saiu uma cor nova.', 'A impressora trava depois de um número fixo de páginas.', 'Achar o celular feio depois de uma propaganda.'], ['Programada', 'Percebida'], largura='26mm')) + bloco(
        3, 'Que recursos da natureza um celular usa para ser fabricado? Cite dois e diga uma forma de economizá-los.', linhas(2))
    return ficha(
        'quanto-custa-um-celular', 'Quanto custa um celular?', 'EF06CO10',
        'Perceber o custo ambiental de um celular e diferenciar obsolescência programada e percebida.',
        'Um celular velho (desligado) para mostrar, fotos de mineração e de ponto de coleta, cartões com as etapas.',
        ['Mostre um celular velho e pergunte do que ele é feito e de onde vêm esses materiais.',
         'Monte no quadro a linha da vida do celular com os cartões.',
         'Explique programada (feito para durar pouco) e percebida (a propaganda faz achar velho) com exemplos do dia a dia.',
         'Na versão A o estudante escolhe a melhor ação; na B ordena e classifica; na C também explica o uso de recursos.'],
        ['Use fotos de cada etapa e um celular de verdade. Poucas etapas e uma escolha por vez.',
         'Defina programada e percebida com uma frase fixa cada uma e deixe à vista. Aceite que conserto e uso possam trocar de ordem.',
         'Peça para montar a linha da vida com cartões no chão e depois copiar a ordem para a folha.'],
        ['Bloco 1: consertar; doar; levar à coleta. Bloco 2: fábrica (1), uso (2), reciclagem (3).',
         'Bloco 1: extração (1), montagem (2), venda (3), uso (4), reciclagem (5). Bloco 2: programada; percebida; percebida.',
         'Bloco 1: extração, montagem, transporte e venda, uso, conserto, reciclagem (uso e conserto podem se alternar). Bloco 2: programada; percebida; programada; percebida. Bloco 3: metais, água, energia; usar por mais tempo, consertar, doar.'],
        a, b, c)


FICHAS = [tipos_de_dados, robo_labirinto, ditado_desenho, decomposicao, abstracao, padroes, pacotes, arquivos, conversa, celular]
