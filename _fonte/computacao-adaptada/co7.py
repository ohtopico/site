"""7º ano: fichas adaptadas das folhas para imprimir de BNCC Computação (EF07CO01 a EF07CO11)."""
from comp import (VAZIO, bloco, caixa_texto, caixas, cartoes, codigo, escolha, ficha, frases, grade, grafo, item, ligar, linhas,
                  marcar, opcoes, ordenar, p, quadro_ex, resp_linha, resposta, tabela, vetor)


def registros():
    a = bloco(1, 'Este é o registro de um livro. Ligue cada campo ao valor.', ligar([('título', '120'), ('páginas', '"O Pequeno Príncipe"'), ('emprestado', 'verdadeiro')])) + bloco(
        2, 'O vetor guarda as notas. Que nota está na posição 2? Circule.', vetor([7, 9, 5, 10]) + opcoes([9, 5, 10]), 'A primeira posição é a 0.')
    b = bloco(1, 'Complete o registro de um livro.', tabela(['Campo', 'Valor (invente)', 'Tipo'], [['título', '"Meu livro"', 'texto'], ['autor', '', ''], ['páginas', '', ''], ['emprestado', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Leia o vetor de notas.', vetor([7, 9, 5, 10, 8]) + frases(['notas[0] =', 'notas[3] =', 'Quantas notas tem o vetor?']))
    c = bloco(1, 'Complete o registro de um livro.', tabela(['Campo', 'Valor (invente)', 'Tipo'], [['título', '', ''], ['autor', '', ''], ['páginas', '', ''], ['ano', '', ''], ['emprestado', '', '']])) + bloco(
        2, 'Leia o vetor e responda.', vetor([7, 9, 5, 10, 8]) + frases(['notas[1] + notas[4] =', 'Em que posição está a maior nota?'])) + bloco(
        3, 'O que o programa mostra?', '<div class="lado-a-lado">' + codigo('total ← 0\npara i de 0 até 4\n    total ← total + notas[i]\nmostre total / 5') + '<div>' + frases(['Total:', 'Na tela aparece:']) + '</div></div>')
    return ficha(
        'a-ficha-da-turma', 'A ficha da turma', 'EF07CO01',
        'Organizar dados em registros (campos com nome e tipo) e em vetores (listas com posições numeradas).',
        'Uma ficha de biblioteca de verdade, uma caixa de ovos ou fila de copos numerados de 0 a 4.',
        ['Mostre a ficha de um livro e leia os campos: cada campo tem um nome, um valor e um tipo.',
         'Monte um vetor com copos numerados de 0 a 4 e coloque uma nota em cada copo.',
         'Pergunte o que está no copo 2 e mostre que a contagem começa no 0.',
         'Na versão A o estudante liga e circula; na B completa e lê o vetor; na C também lê um laço que soma as notas.'],
        ['Use copos ou caixinhas de verdade para o vetor e aponte para cada posição falando o número.',
         'Explique a regra de começar no 0 antes da atividade e deixe-a escrita no alto da folha. Mantenha o mesmo modelo de tabela.',
         'Peça para o estudante montar o vetor com cartões e trocar valores de lugar; depois responda na folha.'],
        ['Bloco 1: título = "O Pequeno Príncipe"; páginas = 120; emprestado = verdadeiro. Bloco 2: 5.',
         'Bloco 1: autor = texto; páginas = número; emprestado = lógico (valores livres). Bloco 2: 7; 10; 5 notas.',
         'Bloco 1: título e autor = texto; páginas e ano = número; emprestado = lógico. Bloco 2: 9 + 8 = 17; posição 3. Bloco 3: total 39; mostra 7,8 (a média).'],
        a, b, c)


def bugs():
    a = bloco(1, 'O programa deveria somar 2 + 3. Onde está o bug? Circule a linha errada.', codigo('a ← 2\nb ← 3\nmostre a - b') + opcoes(['linha 1', 'linha 2', 'linha 3']), 'Bug é um erro no programa.') + bloco(
        2, 'O robô deveria andar 3 casas. Ele andou 2. Qual é o conserto? Circule.', codigo('repita 2 vezes\n    ande 1 casa') + opcoes(['repita 3 vezes', 'repita 1 vez']))
    b = bloco(1, 'Faça o teste de mesa: escreva o valor de soma em cada volta.', '<div class="lado-a-lado">' + codigo('soma ← 0\npara i de 1 até 3\n    soma ← soma + i\nmostre soma') +
              tabela(['volta (i)', 'soma'], [['1', '1'], ['2', ''], ['3', '']]) + '</div>', 'A primeira volta é o exemplo.') + bloco(
        2, 'Cada programa tem um bug. Escreva o conserto.', frases(['Deveria mostrar o dobro de 5: mostre 5 + 2.  Conserto:', 'Deveria dizer "aprovado" se nota ≥ 6: se nota > 6.  Conserto:']))
    c = bloco(1, 'Teste de mesa. O objetivo é mostrar 1 + 2 + 3 + 4 + 5 = 15.', '<div class="lado-a-lado">' + codigo('soma ← 0\npara i de 1 até 4\n    soma ← soma + i\nmostre soma') +
              tabela(['i', 'soma'], [['1', ''], ['2', ''], ['3', ''], ['4', '']]) + '</div>' + frases(['O programa mostra:', 'O bug e o conserto:'])) + bloco(
        2, 'Três programas, três bugs. Escreva o conserto.', frases(['Dobro de 5: mostre 5 + 2', 'Aprovado se nota ≥ 6: se nota > 6 então', 'Média de 8 e 6: mostre 8 + 6 / 2'])) + bloco(
        3, 'Escolha um conserto e escreva dois valores de teste com o resultado esperado.', linhas(2))
    return ficha(
        'caca-aos-bugs', 'Caça aos bugs', 'EF07CO02',
        'Encontrar e corrigir erros em programas usando o teste de mesa, acompanhando o valor das variáveis passo a passo.',
        'Cartões com linhas de código, tabela de teste de mesa desenhada no quadro, lápis de cor.',
        ['Conte que bug é um erro no programa e que achar erros faz parte de programar.',
         'Faça um teste de mesa no quadro: uma linha da tabela para cada volta.',
         'Compare o resultado esperado com o obtido e procure a linha que causa a diferença.',
         'Na versão A o estudante circula o erro; na B faz o teste de mesa e corrige; na C também cria testes.'],
        ['Use poucos números e uma linha de código por vez. Leia a linha em voz alta e escreva o valor da variável junto.',
         'Mostre o formato da tabela de teste de mesa antes e mantenha a mesma ordem de colunas. Errar faz parte: diga isso com clareza.',
         'Transforme em caça: cada bug achado ganha um visto. Deixe o estudante testar no computador depois.'],
        ['Bloco 1: linha 3 (deveria ser a + b). Bloco 2: repita 3 vezes.',
         'Bloco 1: 1, 3, 6. Bloco 2: mostre 5 × 2; se nota ≥ 6.',
         'Bloco 1: 1, 3, 6, 10; mostra 10; o laço deveria ir até 5. Bloco 2: 5 × 2; nota ≥ 6; (8 + 6) / 2. Bloco 3: resposta livre (por exemplo, nota 6 dá aprovado, nota 5 não).'],
        a, b, c)


def projeto():
    a = bloco(1, 'Ligue cada problema ao recurso do programa.', ligar([('Guardar as notas da turma', 'repetição'), ('Perguntar até acertar', 'vetor (lista)'), ('Dar desconto se a compra for grande', 'decisão (se)')])) + bloco(
        2, 'Um app para lembrar a lição de casa. O que ele recebe e o que mostra? Ligue.', ligar([('Entrada', 'aviso "tem lição amanhã"'), ('Saída', 'matéria e data da lição')]))
    b = bloco(1, 'Ligue cada problema ao recurso do programa.', ligar([('Guardar nome, idade e turma de um aluno', 'repetição'), ('Guardar as notas de 30 alunos', 'registro'), ('Perguntar até a resposta estar certa', 'vetor'), ('Dar desconto se a compra passar de R$ 100', 'decisão (se)')])) + bloco(
        2, 'Planeje um app de lição de casa.', caixas(['Quem vai usar', 'Entradas', 'Saídas', 'Um recurso que vai usar'], 2, '22mm'))
    c = bloco(1, 'Ligue cada problema ao recurso.', ligar([('Guardar nome, idade e turma de um aluno', 'repetição'), ('Guardar as notas de 30 alunos', 'registro'), ('Perguntar até a resposta estar certa', 'vetor'), ('Dar desconto se a compra passar de R$ 100', 'função'), ('Calcular a média em vários lugares do programa', 'decisão (se)')])) + bloco(
        2, 'Ficha do projeto da equipe: escolham um problema de outra matéria.', caixas(['Problema e matéria', 'Quem vai usar', 'Entradas', 'Saídas', 'Dados que vai guardar', 'Recursos (repetição, se, vetor, função)'], 2, '20mm'))
    return ficha(
        'do-problema-ao-projeto', 'Do problema ao projeto', 'EF07CO03',
        'Planejar um programa para resolver um problema: escolher entradas, saídas, dados e recursos (repetição, decisão, vetor, registro, função).',
        'Post-its, cartões com os nomes dos recursos, exemplos de apps simples do dia a dia.',
        ['Escolha com a turma um problema real (lembrar a lição, contar votos, um quiz).',
         'Pergunte o que o programa precisa receber (entradas) e mostrar (saídas).',
         'Apresente os recursos com cartões e pergunte qual combina com cada parte do problema.',
         'Na versão A o estudante liga; na B planeja um app dado; na C a equipe escolhe e planeja o próprio projeto.'],
        ['Dê um problema já escolhido e próximo da rotina dele. Use desenhos para entrada (seta para dentro) e saída (seta para fora).',
         'Apresente a ficha do projeto pronta, com um exemplo preenchido, e defina papéis claros na equipe.',
         'Divida o planejamento em caixas pequenas e deixe o estudante escolher por qual começar.'],
        ['Bloco 1: notas = vetor; perguntar até acertar = repetição; desconto = decisão. Bloco 2: entrada = matéria e data; saída = aviso.',
         'Bloco 1: aluno = registro; 30 notas = vetor; perguntar = repetição; desconto = decisão. Bloco 2: resposta livre.',
         'Bloco 1: registro; vetor; repetição; decisão; função. Bloco 2: resposta livre.'],
        a, b, c)


def grafos():
    nos = {'A': (10, 30), 'B': (40, 10), 'C': (40, 50), 'D': (75, 10), 'E': (75, 50), 'F': (105, 30)}
    ar = [('A', 'B', '2'), ('A', 'C', '5'), ('B', 'D', '4'), ('C', 'E', '2'), ('B', 'C', '1'), ('D', 'F', '3'), ('E', 'F', '6'), ('D', 'E', '1')]
    a = bloco(1, 'Cada bolinha é um bairro e cada linha é uma rua. Siga o caminho A, B, D, F e circule quantas ruas ele usa.',
              grafo({'A': (10, 25), 'B': (40, 8), 'D': (70, 8), 'F': (100, 25), 'C': (55, 42)}, [('A', 'B'), ('B', 'D'), ('D', 'F'), ('A', 'C'), ('C', 'F')], w=110, h=50) + opcoes([2, 3, 4])) + bloco(
        2, 'Qual caminho é mais curto de A até F? Circule.', opcoes(['A, B, D, F', 'A, C, F']), 'Conte as ruas de cada caminho.')
    b = bloco(1, 'Os números são minutos de caminhada. Complete a tabela.', grafo(nos, ar, w=115, h=60) +
              tabela(['Caminho', 'Minutos'], [['A, B, D, F', '2 + 4 + 3 = 9'], ['A, C, E, F', ''], ['A, B, C, E, D, F', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Qual é o caminho mais rápido?', resp_linha(''))
    c = bloco(1, 'Encontre o caminho mais rápido de A até F. Os números são minutos.', grafo(nos, ar, w=115, h=60) + frases(['Caminho mais rápido:', 'Tempo:', 'Se a rua B, D fechar, qual o novo caminho?'])) + bloco(
        2, 'Desenhe o grafo de amizades.', '<div class="lado-a-lado">' + p('Ana é amiga de Beto e de Caio. Beto é amigo de Duda. Caio é amigo de Duda. Duda é amiga de Eva.') +
        '<div class="caixa-desenho" style="height:44mm"></div></div>' + resp_linha('Quem tem mais amigos?'))
    return ficha(
        'pontes-e-caminhos', 'Pontes e caminhos', 'EF07CO04',
        'Representar problemas com grafos (pontos ligados por linhas) e usar o grafo para achar caminhos e o caminho mais curto.',
        'Mapa do bairro, barbante e pregadores ou fita no chão, cartões com nomes de lugares.',
        ['Desenhe no chão com fita alguns bairros e ruas; os estudantes caminham pelos caminhos.',
         'Mostre que o mapa pode virar bolinhas (lugares) e linhas (ligações): isso é um grafo.',
         'Coloque números nas linhas (minutos) e compare dois caminhos somando.',
         'Na versão A o estudante segue e compara caminhos; na B soma tempos; na C acha o mais rápido e desenha um grafo.'],
        ['Faça o grafo no chão e caminhe por ele antes do papel. Trace o caminho com o dedo e depois com lápis de cor.',
         'Explique que bolinha e linha são só símbolos para lugar e rua; use sempre as mesmas letras. Uma tabela fixa para registrar.',
         'Use lápis de cores diferentes para cada caminho e transforme em desafio: quem acha o caminho mais rápido.'],
        ['Bloco 1: 3 ruas. Bloco 2: A, C, F (2 ruas).',
         'Bloco 1: 9; 5 + 2 + 6 = 13; 2 + 1 + 2 + 1 + 3 = 9. Bloco 2: A, B, D, F ou A, B, C, E, D, F (9 minutos).',
         'Bloco 1: A, B, D, F ou A, B, C, E, D, F, com 9 minutos; sem B, D: A, B, C, E, D, F (9 minutos). Bloco 2: Ana, Beto, Caio, Duda, Eva ligados; Duda tem mais amigos (3).'],
        a, b, c)


def funcoes():
    a = bloco(1, 'A função dobro(n) devolve n + n. Circule o resultado.', escolha([('dobro(3)', [6, 5], 6), ('dobro(5)', [10, 7], None), ('dobro(1)', [2, 3], None)], 3)) + bloco(
        2, 'A função ola(nome) mostra "Olá, nome!". O que aparece? Ligue.', ligar([('ola("Ana")', '"Olá, Bia!"'), ('ola("Bia")', '"Olá, Ana!"')]))
    b = bloco(1, 'Execute as chamadas.', codigo('função triplo(n)\n    devolva n × 3') + grade([item('<b class="dado">triplo(2)</b>', resposta(6), exemplo=True), item('<b class="dado">triplo(4)</b>', VAZIO), item('<b class="dado">triplo(10)</b>', VAZIO)], 3)) + bloco(
        2, 'O código repete a mesma coisa. Complete a função.', codigo('mostre "Olá, Ana! Que bom te ver."\nmostre "Olá, Leo! Que bom te ver."') + resp_linha('função saudar(nome): mostre'))
    c = bloco(1, 'Execute as chamadas.', codigo('função pinte(n)\n    repita n vezes\n        desenhe ■\n\nfunção area(base, altura)\n    devolva base × altura') +
              frases(['pinte(3) desenha:', 'area(4, 5) =', 'area(2, 9) + area(1, 1) ='])) + bloco(
        2, 'Encontre a repetição e escreva uma função com parâmetro.', codigo('mostre "Olá, Ana! Que bom te ver."\nmostre "Olá, Leo! Que bom te ver."\nmostre "Olá, Bia! Que bom te ver."') + linhas(2)) + bloco(
        3, 'Um jogo de tabuada sorteia contas, confere a resposta e conta pontos. Dê nome a três funções e seus parâmetros.', linhas(3))
    return ficha(
        'escreva-uma-vez-use-sempre', 'Escreva uma vez, use sempre', 'EF07CO05',
        'Criar funções com parâmetros para não repetir código: escrever uma vez e chamar com valores diferentes.',
        'Uma "máquina" de caixa de papelão com entrada e saída, cartões com números.',
        ['Mostre a máquina do dobro: entra 3, sai 6. O número que entra é o parâmetro.',
         'Peça para a turma ser a máquina com outros números.',
         'Mostre um código repetido e como uma função com parâmetro resolve.',
         'Na versão A o estudante circula e liga resultados; na B executa e completa uma função; na C cria funções.'],
        ['Use a caixa-máquina de verdade: o estudante coloca o cartão e tira o resultado. Uma função por vez.',
         'Mantenha a mesma forma de escrever as funções (nome, parênteses, devolva) e explique que o nome do parâmetro é só um apelido.',
         'Deixe o estudante inventar uma função e desafiar o colega a executá-la.'],
        ['Bloco 1: 6; 10; 2. Bloco 2: ola("Ana") = "Olá, Ana!"; ola("Bia") = "Olá, Bia!".',
         'Bloco 1: 6, 12, 30. Bloco 2: mostre "Olá, " + nome + "! Que bom te ver."',
         'Bloco 1: ■■■; 20; 18 + 1 = 19. Bloco 2: função saudar(nome) com a frase; chamar saudar("Ana"), saudar("Leo"), saudar("Bia"). Bloco 3: por exemplo, sortear_conta(tabuada), conferir(resposta, certa), somar_ponto(placar).'],
        a, b, c)


def protocolos():
    a = bloco(1, 'Numere a conversa pelo rádio na ordem certa.', ordenar(['"Recebido, câmbio."', '"Base, aqui é a Equipe 1. Câmbio."', '"Equipe 1, pode falar. Câmbio."'], exemplo=(1, 1))) + bloco(
        2, 'Protocolo é um combinado para conversar. Qual é um protocolo? Circule.', opcoes(['levantar a mão para falar', 'falar todos juntos']))
    b = bloco(1, 'Numere a conversa pelo rádio na ordem certa.', ordenar(['"Recebido, câmbio e desligo."', '"Base, aqui é a Equipe 1. Câmbio."', '"A tarefa terminou. Câmbio."', '"Equipe 1, pode falar. Câmbio."'], exemplo=(1, 1))) + bloco(
        2, 'Cadê a confirmação? O pacote sem confirmação precisa ser enviado de novo.', tabela(['Pacote', 'Confirmação'], [['1', 'recebida'], ['2', 'recebida'], ['3', 'não chegou'], ['4', 'recebida']]) + resp_linha('Reenviar o pacote'))
    c = bloco(1, 'Numere a conversa pelo rádio e diga para que serve "câmbio".', ordenar(['"Recebido, câmbio e desligo."', '"Base, aqui é a Equipe 1. Câmbio."', '"A tarefa terminou. Câmbio."', '"Equipe 1, pode falar. Câmbio."'], colunas=2) + resp_linha('"Câmbio" serve para')) + bloco(
        2, 'Pacotes enviados e confirmações.', tabela(['Pacote', 'Confirmação'], [['1', 'recebida'], ['2', 'recebida'], ['3', 'não chegou'], ['4', 'recebida'], ['5', 'não chegou']]) + resp_linha('Pacotes a reenviar:')) + bloco(
        3, 'Ligue cada protocolo ao que faz.', ligar([('HTTPS', 'confere se os pacotes chegaram'), ('TCP', 'abre páginas de forma protegida'), ('DNS', 'envia e-mails'), ('SMTP', 'traduz o nome do site em número')]))
    return ficha(
        'as-regras-da-conversa', 'As regras da conversa', 'EF07CO06',
        'Entender protocolos: as regras combinadas que permitem que pessoas e computadores troquem mensagens sem confusão.',
        'Dois copos ligados por barbante ou dois rádios de brinquedo, cartões com as falas.',
        ['Peça para todos falarem ao mesmo tempo e mostre que ninguém entende nada.',
         'Combine um protocolo (levantar a mão, esperar a vez) e repita.',
         'Mostre a conversa por rádio: quem chama, quem responde, "câmbio" para passar a vez, e a confirmação.',
         'Na versão A o estudante ordena três falas; na B também acha o pacote sem confirmação; na C liga protocolos da internet.'],
        ['Encene a conversa por rádio com cartões de fala e deixe o estudante segurar o cartão da vez.',
         'Protocolos são regras previsíveis, o que costuma agradar. Mostre a sequência completa antes e mantenha-a escrita.',
         'Brinque de rádio com tempo marcado e troque os papéis a cada rodada.'],
        ['Bloco 1: chamada (1), "pode falar" (2), "recebido" (3). Bloco 2: levantar a mão para falar.',
         'Bloco 1: chamada (1), "pode falar" (2), "tarefa terminou" (3), "recebido e desligo" (4). Bloco 2: pacote 3.',
         'Bloco 1: mesma ordem da versão B; câmbio passa a vez de falar. Bloco 2: 3 e 5. Bloco 3: HTTPS = páginas protegidas; TCP = confere pacotes; DNS = traduz nome; SMTP = e-mails.'],
        a, b, c)


def golpes():
    a = bloco(1, 'Esta mensagem é golpe? Circule.', caixa_texto('"Sua conta foi BLOQUEADA! Clique aqui agora e digite sua senha."', 'cinza') + opcoes(['é golpe', 'é segura'], certa=None) +
              p('Pistas: pressa, ameaça, pede senha.')) + bloco(
        2, 'Qual senha é mais forte? Circule.', escolha([('Escolha uma:', ['123456', 'Gato#Pizza!Lua42'], None), ('Escolha uma:', ['joao2012', 'minha bicicleta azul voa 7 vezes'], None)]))
    b = bloco(1, 'Sublinhe três sinais de golpe na mensagem.', caixa_texto('SMS · Banco Seguro: Sua conta foi BLOQUEADA! Clique em bancoseguro-premio.xyz em até 10 minutos e confirme sua senha e o código que chegou por SMS.', 'cinza')) + bloco(
        2, 'Fraca, média ou forte?', marcar(['123456', 'joao2012', 'Gato#Pizza!Lua42', 'qwerty'], ['Fraca', 'Média', 'Forte'], exemplo=(0, 0), largura='20mm'))
    c = bloco(1, 'Escreva quatro sinais de golpe nesta mensagem.', caixa_texto('SMS · Banco Seguro: Sua conta foi BLOQUEADA! Clique em bancoseguro-premio.xyz em até 10 minutos e confirme sua senha e o código que chegou por SMS. Ganhe R$ 500 de bônus!', 'cinza') + linhas(2)) + bloco(
        2, 'Fraca, média ou forte?', marcar(['123456', 'joao2012', 'Bola!', 'minha bicicleta azul voa 7 vezes', 'qwerty', 'Gato#Pizza!Lua42'], ['Fraca', 'Média', 'Forte'], largura='20mm')) + bloco(
        3, 'O que é a verificação em duas etapas e por que ela protege?', linhas(2))
    return ficha(
        'detetive-de-golpes', 'Detetive de golpes', 'EF07CO07',
        'Reconhecer golpes digitais e criar senhas fortes para proteger dados e contas.',
        'Prints fictícios de mensagens de golpe, lupa de papel, cartões com senhas.',
        ['Mostre uma mensagem de golpe e procure as pistas com a turma: pressa, ameaça, prêmio, pedido de senha, link estranho.',
         'Compare senhas: tamanho, mistura de letras, números e símbolos, frases longas.',
         'Combine a regra: nunca passar senha nem código que chega por SMS.',
         'Na versão A o estudante decide e escolhe; na B sublinha pistas e classifica; na C explica a verificação em duas etapas.'],
        ['Use uma lista curta de pistas com desenhos (relógio para pressa, cadeado para senha) e procure uma pista por vez.',
         'Deixe as regras de segurança escritas de forma direta ("nunca passe sua senha"). Evite exemplos assustadores.',
         'Faça o papel de detetive com lupa de papel e um tempo curto para achar as pistas.'],
        ['Bloco 1: é golpe. Bloco 2: Gato#Pizza!Lua42; minha bicicleta azul voa 7 vezes.',
         'Bloco 1: por exemplo, ameaça (bloqueada), pressa (10 minutos), link estranho, pedido de senha e código. Bloco 2: fraca; fraca ou média; forte; fraca.',
         'Bloco 1: ameaça, pressa, link estranho, pede senha e código, prêmio. Bloco 2: fraca, média, fraca, forte, fraca, forte. Bloco 3: além da senha, pede um código no celular; quem roubar a senha não entra.'],
        a, b, c)


def discordar():
    a = bloco(1, 'É ataque à pessoa ou argumento? Circule.', escolha([
        ('"Prefiro cachorro porque gosto de passear com ele."', ['argumento', 'ataque'], 'argumento'), ('"Só um bobo acha que gato é melhor."', ['argumento', 'ataque'], None),
        ('"Ninguém liga para a tua opinião."', ['argumento', 'ataque'], None)])) + bloco(
        2, 'Complete a frase para discordar com respeito.', p('Eu entendo o que você disse, mas eu acho que') + linhas(2))
    b = bloco(1, 'Ataque à pessoa ou argumento? Marque.', marcar(['"Prefiro cachorro porque gosto de passear."', '"Só um bobo acha que gato é melhor."', '"Ninguém liga para a tua opinião."', '"Gatos são bons para apartamento pequeno."'], ['Argumento', 'Ataque'], exemplo=(0, 0), largura='26mm')) + bloco(
        2, 'Reescreva o comentário com respeito.', caixa_texto('"Que ideia ridícula, só tu mesmo para pensar isso."') + linhas(2))
    c = bloco(1, 'Ataque à pessoa ou argumento? Marque.', marcar(['"Só um bobo acha que gato é melhor que cachorro."', '"Prefiro cachorro porque gosto de passear com ele."', '"Ninguém liga para a tua opinião."', '"Gatos são bons para apartamento pequeno."', '"Tu escreve errado, então não sabe nada."'], ['Argumento', 'Ataque'], largura='26mm')) + bloco(
        2, 'Reescreva o comentário com respeito.', caixa_texto('"Que ideia ridícula, só tu mesmo para pensar isso."') + linhas(1)) + bloco(
        3, 'Tema: uniforme obrigatório na escola. Use a fórmula: eu entendo que..., mas eu penso que..., porque...', linhas(3))
    return ficha(
        'discordar-sem-ferir', 'Discordar sem ferir', 'EF07CO08',
        'Dar opinião na internet com respeito: separar argumento de ataque à pessoa e reescrever comentários agressivos.',
        'Cartões com comentários fictícios, o quadro da fórmula "eu entendo que, mas penso que, porque".',
        ['Escolha um tema leve (gato ou cachorro) e peça opiniões diferentes.',
         'Mostre a diferença: argumento fala da ideia; ataque fala da pessoa.',
         'Apresente a fórmula para discordar e pratique em voz alta.',
         'Na versão A o estudante classifica e completa a fórmula; na B reescreve; na C argumenta sobre um tema da escola.'],
        ['Leia cada frase em voz alta e pergunte: fala da ideia ou da pessoa? Use a fórmula pronta para completar.',
         'Explique concretamente por que um comentário fere, sem ironia. Deixe a fórmula escrita como modelo fixo.',
         'Faça um debate rápido em dupla com tempo curto e a regra de usar a fórmula antes de responder.'],
        ['Bloco 1: argumento; ataque; ataque. Bloco 2: resposta livre.',
         'Bloco 1: argumento; ataque; ataque; argumento. Bloco 2: por exemplo, "Não concordo com a ideia, mas posso explicar por quê."',
         'Bloco 1: ataque; argumento; ataque; argumento; ataque. Blocos 2 e 3: resposta livre.'],
        a, b, c)


def cyberbullying():
    a = bloco(1, 'Isso é cyberbullying? Circule.', escolha([
        ('Criar um perfil falso para zombar de um colega.', ['sim', 'não'], 'sim'), ('Mandar parabéns no aniversário.', ['sim', 'não'], None),
        ('Espalhar um meme humilhante de um colega, todo dia.', ['sim', 'não'], None)])) + bloco(
        2, 'Se acontecer com você, com quem pode falar? Circule.', opcoes(['um adulto de confiança', 'ninguém']))
    b = bloco(1, 'É cyberbullying? Marque.', marcar(['Criar um perfil falso para zombar de um colega.', 'Uma discussão única, e depois fazem as pazes.', 'Compartilhar várias vezes um meme humilhante.', 'Excluir sempre a mesma pessoa do grupo, de propósito.'], ['Sim', 'Não'], exemplo=(0, 0))) + bloco(
        2, 'O que o espectador pode fazer? Ligue.', ligar([('Ajuda', 'compartilhar o meme'), ('Piora', 'avisar um adulto e apoiar o colega')]))
    c = bloco(1, 'É cyberbullying? Marque e explique uma resposta.', marcar(['Criar um perfil falso para zombar de um colega.', 'Uma discussão única, e depois fazem as pazes.', 'Compartilhar várias vezes um meme humilhante.', 'Excluir sempre a mesma pessoa do grupo, de propósito.', 'Comentar "kkk" em todas as fotos de alguém para ridicularizar.'], ['Sim', 'Não']) + linhas(1)) + bloco(
        2, 'O espectador ajuda ou piora? Escreva A ou P.', frases(['Compartilhar o meme:', 'Guardar provas (prints) e avisar um adulto:', 'Mandar mensagem de apoio ao colega:', 'Rir e não falar nada:'])) + bloco(
        3, 'Escreva o nome de dois adultos de confiança, na escola e fora dela.', linhas(2))
    return ficha(
        'cyberbullying-nao-e-brincadeira', 'Não é brincadeira', 'EF07CO09',
        'Reconhecer o cyberbullying, entender o papel de quem vê e saber a quem pedir ajuda.',
        'Cartões com situações, um cartaz com a rede de apoio da escola (nomes e lugares).',
        ['Explique que cyberbullying é agressão repetida e de propósito, feita pela internet.',
         'Leia situações e decida com a turma se é ou não, e por quê.',
         'Converse sobre o espectador: quem compartilha ou ri ajuda a agressão continuar.',
         'Na versão A o estudante identifica e escolhe ajuda; na B classifica e liga; na C explica e monta a rede de apoio.'],
        ['Use situações curtas e concretas e pergunte: alguém fica triste? Repete? Termine com a pessoa de confiança.',
         'Explique a diferença entre brincadeira e agressão de forma explícita (repete, é de propósito, um lado sofre). Mantenha o cartaz da rede de apoio visível.',
         'Faça a atividade em blocos curtos e termine com uma ação concreta (escrever os nomes da rede de apoio).'],
        ['Bloco 1: sim; não; sim. Bloco 2: um adulto de confiança.',
         'Bloco 1: sim; não; sim; sim. Bloco 2: ajuda = avisar um adulto e apoiar; piora = compartilhar.',
         'Bloco 1: sim; não; sim; sim; sim. Bloco 2: P; A; A; P. Bloco 3: resposta livre.'],
        a, b, c)


def lixo():
    a = bloco(1, 'Para onde vai? Circule.', escolha([('Pilha usada', ['ponto de coleta', 'lixo comum'], 'ponto de coleta'), ('Celular velho', ['ponto de coleta', 'lixo comum'], None), ('Casca de banana', ['ponto de coleta', 'lixo comum'], None)])) + bloco(
        2, 'Certo ou errado? Circule.', escolha([('Doar o computador que ainda funciona.', ['certo', 'errado'], None), ('Queimar fios para tirar o cobre.', ['certo', 'errado'], None)]))
    b = bloco(1, 'O que tem dentro? Ligue.', ligar([('Pilhas', 'vidro e plástico'), ('Tela', 'metais tóxicos'), ('Fios', 'cobre que pode ser reciclado')])) + bloco(
        2, 'Certo ou errado? Marque.', marcar(['Jogar pilhas no lixo comum.', 'Levar o celular velho a um ponto de coleta.', 'Queimar fios para tirar o cobre.', 'Doar o computador que ainda funciona.'], ['Certo', 'Errado'], exemplo=(0, 1)))
    c = bloco(1, 'O que tem dentro? Ligue.', ligar([('Pilhas comuns', 'vidro e plástico'), ('Placa de circuito', 'pode pegar fogo se for furada'), ('Bateria do celular', 'metais tóxicos'), ('Tela', 'ouro, prata e cobre em pequena quantidade'), ('Fios e cabos', 'cobre que pode ser reciclado')])) + bloco(
        2, 'Certo ou errado? Marque.', marcar(['Jogar pilhas no lixo comum.', 'Levar o celular velho a um ponto de coleta.', 'Queimar fios para tirar o cobre.', 'Doar o computador que ainda funciona.', 'Guardar uma bateria estufada na gaveta.'], ['Certo', 'Errado'])) + bloco(
        3, 'Onde há um ponto de coleta de eletrônicos perto da escola ou de casa?', linhas(1))
    return ficha(
        'para-onde-vai-o-lixo-eletronico', 'Para onde vai o lixo eletrônico?', 'EF07CO10',
        'Saber o que há dentro dos aparelhos eletrônicos e como descartar o lixo eletrônico sem prejudicar o ambiente.',
        'Um aparelho velho desmontado (sem bateria), fotos de ponto de coleta, caixas de separação.',
        ['Mostre peças de um aparelho velho: placa, fios, tela.',
         'Explique que algumas peças têm metais tóxicos e outras podem ser recicladas.',
         'Combine as ações certas: consertar, doar, levar ao ponto de coleta.',
         'Na versão A o estudante escolhe o destino; na B liga e classifica; na C também pesquisa um ponto de coleta.'],
        ['Use objetos de verdade (sem bateria) e fotos. Separe em duas caixas: ponto de coleta e lixo comum.',
         'Dê regras claras e fixas ("pilha vai para a coleta"). Avise antes se for mostrar peças desmontadas.',
         'Proponha uma gincana de separação com cartões e depois a folha.'],
        ['Bloco 1: ponto de coleta; ponto de coleta; lixo comum (ou compostagem). Bloco 2: certo; errado.',
         'Bloco 1: pilhas = metais tóxicos; tela = vidro e plástico; fios = cobre. Bloco 2: errado; certo; errado; certo.',
         'Bloco 1: pilhas = metais tóxicos; placa = ouro, prata e cobre; bateria = pode pegar fogo; tela = vidro e plástico; fios = cobre. Bloco 2: errado; certo; errado; certo; errado. Bloco 3: resposta livre.'],
        a, b, c)


def producao():
    a = bloco(1, 'Numere as etapas do podcast.', ordenar(['Gravar', 'Escolher o tema', 'Publicar'], exemplo=(1, 1))) + bloco(
        2, 'Antes de publicar, o que é preciso? Circule.', escolha([('Autorização de quem aparece', ['precisa', 'não precisa'], 'precisa'), ('Créditos da música', ['precisa', 'não precisa'], None)]))
    b = bloco(1, 'Numere as etapas de 1 a 5.', ordenar(['Editar o áudio', 'Escolher o tema e o público', 'Publicar com título e créditos', 'Escrever o roteiro', 'Gravar'], exemplo=(1, 1))) + bloco(
        2, 'Escreva o começo do roteiro do podcast.', tabela(['Tempo', 'Quem fala', 'O que diz'], [['0:00', '', 'Abertura e apresentação'], ['0:30', '', ''], ['1:30', '', '']]))
    c = bloco(1, 'Numere as etapas de 1 a 6.', ordenar(['Editar o áudio e cortar os erros', 'Escolher o tema e o público', 'Publicar com título, descrição e créditos', 'Escrever o roteiro', 'Gravar', 'Ouvir e revisar com a equipe'], colunas=2)) + bloco(
        2, 'Roteiro do podcast da turma.', resp_linha('Tema:') + tabela(['Tempo', 'Quem fala', 'O que diz', 'Som'], [['0:00', '', 'Abertura', ''], ['0:30', '', '', ''], ['1:30', '', '', ''], ['2:30', '', 'Encerramento', '']])) + bloco(
        3, 'Escreva duas coisas a conferir antes de publicar.', linhas(2))
    return ficha(
        'do-roteiro-a-publicacao', 'Do roteiro à publicação', 'EF07CO11',
        'Planejar e produzir um conteúdo digital (podcast ou vídeo) em etapas, com roteiro, autorização e créditos.',
        'Celular para gravar, fones, um roteiro modelo impresso, cartões com as etapas.',
        ['Ouça um trecho curto de podcast e pergunte como ele foi feito.',
         'Monte com cartões as etapas: tema, roteiro, gravação, edição, revisão, publicação.',
         'Mostre um roteiro com tempos e falas e converse sobre autorização e créditos.',
         'Na versão A o estudante ordena três etapas; na B escreve o começo do roteiro; na C faz o roteiro completo.'],
        ['Grave uma fala curta de verdade antes da folha. Use cartões com desenho de cada etapa.',
         'Dê papéis fixos na equipe (quem fala, quem grava) e um roteiro com tempo marcado. Avise antes quando for gravar.',
         'Deixe o estudante com uma tarefa ativa (gravar, cronometrar) e etapas curtas com visto.'],
        ['Bloco 1: tema (1), gravar (2), publicar (3). Bloco 2: precisa; precisa.',
         'Bloco 1: tema (1), roteiro (2), gravar (3), editar (4), publicar (5). Bloco 2: resposta livre.',
         'Bloco 1: tema, roteiro, gravar, editar, revisar, publicar. Bloco 2: resposta livre. Bloco 3: por exemplo, autorização de quem fala e créditos de músicas e imagens.'],
        a, b, c)


FICHAS = [registros, bugs, projeto, grafos, funcoes, protocolos, golpes, discordar, cyberbullying, lixo, producao]
