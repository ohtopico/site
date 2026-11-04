"""9º ano: fichas adaptadas das folhas para imprimir de BNCC Computação (EF09CO01 a EF09CO10)."""
from comp import (VAZIO, bloco, caixa_texto, caixas, cartoes, codigo, escolha, ficha, frases, grade, grafo, item, ligar, linhas,
                  marcar, opcoes, ordenar, p, quadro_ex, resp_linha, resposta, tabela)


def regua(chave, ate=None, vazias=False):
    ab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    n = ate or 26
    cif = [ab[(i + chave) % 26] if not vazias or i < 3 else '' for i in range(n)]
    partes = [(0, n)] if n <= 13 else [(0, 13), (13, n)]
    return ''.join(tabela(['original'] + list(ab[i:j]), [['cifrada'] + cif[i:j]]) for i, j in partes)


def arvores():
    pastas = grafo({'Documentos': (78, 9), 'Escola': (46, 31), 'Fotos': (114, 31), 'Matemática': (22, 53), 'Ciências': (74, 53), 'Praia': (114, 53)},
                   [('Documentos', 'Escola'), ('Documentos', 'Fotos'), ('Escola', 'Matemática'), ('Escola', 'Ciências'), ('Fotos', 'Praia')], w=140, h=62, desc='árvore de pastas')
    a = bloco(1, 'A árvore de pastas. Siga as linhas e responda. Circule.', pastas + escolha([('A pasta Ciências fica dentro de:', ['Escola', 'Fotos'], 'Escola'), ('Qual é a raiz (a pasta do topo)?', ['Documentos', 'Praia'], None)], 2)) + bloco(
        2, 'Árvore de decisão: a fruta é amarela? Siga e circule a fruta.', p('Sim: é comprida? Sim = banana, Não = limão-siciliano. Não: é vermelha? Sim = morango, Não = melancia.') +
        p('Uma fruta amarela e comprida é:') + opcoes(['banana', 'morango']))
    b = bloco(1, 'A árvore de pastas.', pastas + frases(['Raiz:', 'Pastas dentro de Escola:', 'Caminho até Praia: Documentos /'])) + bloco(
        2, 'Complete a árvore de decisão para banana, limão, morango e melancia.', caixa_texto('É amarela? · Sim: é comprida? (sim: ______ · não: ______) · Não: é pequena? (sim: ______ · não: ______)'))
    c = bloco(1, 'A árvore de pastas.', pastas + frases(['Folhas (pastas sem nada dentro):', 'Caminho até Ciências:', 'Altura da árvore (níveis):'])) + bloco(
        2, 'Desenhe uma árvore de decisão que separe banana, limão, morango e melancia com perguntas de sim ou não.', '<div class="caixa-desenho" style="height:48mm"></div>') + bloco(
        3, 'Toda árvore é um grafo, mas nem todo grafo é árvore. O que um grafo precisa ter para não ser árvore?', linhas(1))
    return ficha(
        'arvores-e-grafos', 'Árvores e grafos', 'EF09CO01',
        'Usar árvores e grafos para organizar informações e decisões: pastas, perguntas de sim ou não e caminhos.',
        'Uma árvore genealógica ou um organograma impresso, cartões com nomes de pastas, frutas de verdade ou figuras.',
        ['Mostre as pastas de um computador abrindo uma dentro da outra: isso é uma árvore.',
         'Monte no chão uma árvore de decisão com cartões de pergunta e frutas nas pontas.',
         'Explique: raiz no topo, galhos, folhas nas pontas; árvore não tem ciclo.',
         'Na versão A o estudante segue a árvore; na B completa; na C desenha a própria árvore de decisão.'],
        ['Use frutas ou figuras de verdade e faça a pergunta em voz alta, seguindo o caminho com o dedo.',
         'Mostre a estrutura completa de uma árvore pronta antes e use sempre as mesmas palavras (raiz, galho, folha).',
         'Monte a árvore de decisão no chão e deixe o estudante "andar" por ela respondendo às perguntas.'],
        ['Bloco 1: Escola; Documentos. Bloco 2: banana.',
         'Bloco 1: Documentos; Matemática e Ciências; Fotos / Praia. Bloco 2: banana, limão, morango, melancia.',
         'Bloco 1: Matemática, Ciências, Praia; Documentos / Escola / Ciências; 3 níveis. Bloco 2: resposta livre. Bloco 3: um ciclo (um caminho que volta ao começo).'],
        a, b, c)


def projeto_impacto():
    a = bloco(1, 'Que problema da escola a tecnologia pode ajudar? Ligue à solução.', ligar([('Fila grande no lanche', 'mapa de lixeiras'), ('Lixo fora do lugar', 'pedido do lanche pelo app'), ('Esquecer a lição', 'lembrete no celular')])) + bloco(
        2, 'Quem vai usar o app da lição? Circule.', opcoes(['estudantes', 'peixes']))
    b = bloco(1, 'Escreva dois problemas da escola ou do bairro e circule o escolhido.', caixas(['1', '2'], 2, '18mm')) + bloco(
        2, 'Quadro do projeto.', caixas(['Problema', 'Quem é o público', 'Nossa solução', 'Dados que vamos usar'], 2, '26mm'))
    c = bloco(1, 'Chuva de problemas: escreva quatro e circule o escolhido.', caixas(['1', '2', '3', '4'], 4, '16mm')) + bloco(
        2, 'Quadro do projeto.', caixas(['Problema', 'Público', 'Solução (site, app, jogo, painel)', 'Dados', 'Linguagem ou ferramenta', 'Como saber se deu certo'], 2, '20mm')) + bloco(
        3, 'Cronograma.', tabela(['Semana', 'O que fazer', 'Quem'], [['1', 'Pesquisar o problema e ouvir o público', ''], ['2', '', ''], ['3', '', ''], ['4', 'Testar com usuários', '']]))
    return ficha(
        'projeto-com-impacto', 'Projeto com impacto', 'EF09CO02',
        'Planejar um projeto de tecnologia para um problema real da escola ou do bairro: público, solução, dados e cronograma.',
        'Post-its, cartolina para o quadro do projeto, fotos de problemas da escola.',
        ['Caminhe pela escola com a turma e anote problemas reais.',
         'Escolha um problema e pergunte quem sofre com ele (o público).',
         'Monte o quadro do projeto na cartolina: solução, dados, ferramenta, como medir.',
         'Na versão A o estudante liga problema e solução; na B preenche o quadro; na C faz também o cronograma.'],
        ['Use fotos dos problemas da escola e soluções desenhadas. Uma escolha por vez.',
         'Dê um quadro de projeto com caixas fixas e um exemplo pronto. Combine os papéis da equipe por escrito.',
         'Divida em etapas curtas com prazo (10 minutos por caixa) e marque cada caixa concluída.'],
        ['Bloco 1: fila = pedido pelo app; lixo = mapa de lixeiras; lição = lembrete. Bloco 2: estudantes.',
         'Respostas livres; confira se o público e os dados combinam com o problema.',
         'Respostas livres; o cronograma deve ter tarefas e responsáveis em cada semana.'],
        a, b, c)


def estados():
    a = bloco(1, 'A catraca começa TRAVADA. Siga os eventos e circule o estado final.', p('Regras: com cartão, TRAVADA vira LIVRE. Ao passar, LIVRE vira TRAVADA.') +
              tabela(['Evento', 'Estado depois'], [['passa o cartão', 'LIVRE'], ['pessoa passa', '']]) + opcoes(['TRAVADA', 'LIVRE']), 'A primeira linha é o exemplo.') + bloco(
        2, 'Uma lâmpada tem dois estados. Ligue o evento ao novo estado.', ligar([('Apertar o botão com ela apagada', 'APAGADA'), ('Apertar o botão com ela acesa', 'ACESA')]))
    b = bloco(1, 'A catraca começa TRAVADA. Escreva o estado depois de cada evento.', p('Com cartão: TRAVADA vira LIVRE. Pessoa passa: LIVRE vira TRAVADA. Empurrar travada: continua TRAVADA.') +
              tabela(['Evento', 'Estado'], [['passa o cartão', 'LIVRE'], ['pessoa passa', ''], ['empurra sem cartão', ''], ['passa o cartão', '']])) + bloco(
        2, 'O semáforo muda: VERDE, AMARELO, VERMELHO e volta. Complete.', tabela(['Estado', 'Próximo'], [['VERDE', 'AMARELO'], ['AMARELO', ''], ['VERMELHO', '']]))
    c = bloco(1, 'A catraca começa TRAVADA. Escreva o estado depois de cada evento.', tabela(['Evento', 'Estado'], [['passa o cartão', ''], ['pessoa passa', ''], ['empurra sem cartão', ''], ['passa o cartão', ''], ['passa o cartão de novo', '']]) +
              p('Desenhe o autômato: dois círculos (estados) e setas com os eventos.') + '<div class="caixa-desenho" style="height:30mm"></div>') + bloco(
        2, 'O personagem do jogo: PARADO, ANDANDO e PULANDO. Complete a tabela.', tabela(['Estado', 'Evento', 'Novo estado'], [['PARADO', 'seta pressionada', ''], ['ANDANDO', 'seta solta', ''], ['ANDANDO', 'espaço', ''], ['PULANDO', 'tocar o chão', '']]))
    return ficha(
        'maquina-de-estados', 'Máquina de estados', 'EF09CO03',
        'Modelar sistemas com autômatos: estados, eventos e transições, como numa catraca, semáforo ou personagem de jogo.',
        'Uma lanterna ou interruptor, cartões com os estados, uma "catraca" de papelão.',
        ['Acenda e apague uma lanterna: ela tem dois estados e um evento (apertar).',
         'Encene a catraca: um estudante é a catraca, outro passa o cartão.',
         'Desenhe estados como círculos e eventos como setas.',
         'Na versão A o estudante segue dois eventos; na B completa tabelas; na C desenha o autômato e modela um jogo.'],
        ['Use a lanterna de verdade e diga o estado em voz alta a cada clique. Um evento por vez.',
         'Previsibilidade ajuda: mostre todas as regras antes, numa tabela fixa, e não mude a ordem.',
         'Encene a catraca com troca rápida de papéis e depois registre na folha.'],
        ['Bloco 1: TRAVADA. Bloco 2: apagada vira ACESA; acesa vira APAGADA.',
         'Bloco 1: LIVRE, TRAVADA, TRAVADA, LIVRE. Bloco 2: AMARELO vira VERMELHO; VERMELHO vira VERDE.',
         'Bloco 1: LIVRE, TRAVADA, TRAVADA, LIVRE, LIVRE; desenho com TRAVADA e LIVRE e setas cartão, passa e empurra. Bloco 2: ANDANDO; PARADO; PULANDO; PARADO (ou ANDANDO, se a seta continuar pressionada).'],
        a, b, c)


def ataques():
    a = bloco(1, 'Ligue cada ataque ao que ele faz.', ligar([('Vírus', 'sequestra os arquivos e pede dinheiro'), ('Ransomware', 'espiona e envia seus dados'), ('Spyware', 'se gruda em arquivos e se espalha')])) + bloco(
        2, 'Qual ação protege o computador? Circule.', opcoes(['baixar de loja oficial', 'baixar "grátis" de site desconhecido']))
    b = bloco(1, 'Ligue cada malware ao jeito de agir.', ligar([('Vírus', 'sequestra os arquivos e pede resgate'), ('Worm', 'parece um programa bom, mas abre a porta'), ('Cavalo de Troia', 'se espalha sozinho pela rede'), ('Ransomware', 'se gruda em arquivos')])) + bloco(
        2, 'Análise do incidente.', caixa_texto('Lia baixou um "gerador de moedas grátis" de um site desconhecido. Dias depois, a conta do jogo dela foi roubada.', 'cinza') +
        frases(['Que tipo de malware era?', 'O que ela poderia ter feito?']))
    c = bloco(1, 'Ligue cada malware ao jeito de agir.', ligar([('Vírus', 'sequestra os arquivos e pede resgate'), ('Worm', 'espiona e envia seus dados'), ('Cavalo de Troia', 'se espalha sozinho pela rede'), ('Ransomware', 'parece bom, mas abre a porta'), ('Spyware', 'se gruda em arquivos e se espalha')])) + bloco(
        2, 'Análise do incidente.', caixa_texto('Lia baixou um "gerador de moedas grátis" para o seu jogo, de um site desconhecido. Dias depois, os amigos receberam mensagens estranhas dela e a conta do jogo foi roubada.', 'cinza') +
        frases(['Tipo de malware:', 'Como entrou:', 'O que fazer agora:'])) + bloco(
        3, 'Escreva três defesas contra malware.', linhas(2))
    return ficha(
        'como-agem-os-ataques', 'Como agem os ataques', 'EF09CO04',
        'Conhecer os tipos de malware (vírus, worm, cavalo de Troia, ransomware, spyware), como agem e como se proteger.',
        'Cartões com os tipos de malware e desenhos, uma história de incidente impressa.',
        ['Conte a história do cavalo de Troia e compare com programas que parecem bons.',
         'Apresente cada tipo de malware com um cartão e um exemplo.',
         'Leia o incidente da Lia e investigue com a turma o que aconteceu.',
         'Na versão A o estudante liga três tipos e escolhe uma defesa; na B analisa o incidente; na C cinco tipos e defesas.'],
        ['Use cartões com desenhos para cada tipo e trabalhe dois ou três tipos por vez.',
         'Fale de riscos com calma e termine com as defesas concretas, numa lista fixa.',
         'Faça o incidente como caso de detetive com perguntas curtas e tempo marcado.'],
        ['Bloco 1: vírus = se gruda e se espalha; ransomware = sequestra; spyware = espiona. Bloco 2: baixar de loja oficial.',
         'Bloco 1: vírus = se gruda; worm = se espalha sozinho; cavalo de Troia = parece bom; ransomware = sequestra. Bloco 2: cavalo de Troia (com spyware); baixar só de loja oficial e desconfiar do grátis.',
         'Bloco 1: vírus = se gruda; worm = se espalha; cavalo de Troia = parece bom; ransomware = sequestra; spyware = espiona. Bloco 2: cavalo de Troia; pelo download; trocar senhas, avisar amigos, passar antivírus. Bloco 3: atualizar, backup, lojas oficiais, antivírus.'],
        a, b, c)


def cifra():
    a = bloco(1, 'Na cifra de César com chave 1, cada letra vira a próxima. Complete.', regua(1, 8, vazias=True), 'As três primeiras são o exemplo: A vira B, B vira C.') + bloco(
        2, 'Decifre a palavra: cada letra volta uma.', '<p class="seq-num"><span class="cel">B</span><span class="cel">N</span><span class="cel">P</span><span class="cel">S</span></p>' +
        '<p class="seq-num"><span class="cel">A</span><span class="cel vazia"></span><span class="cel vazia"></span><span class="cel vazia"></span></p>')
    b = bloco(1, 'Complete a régua da chave 3.', regua(3, 13, vazias=True), 'As três primeiras são o exemplo.') + bloco(
        2, 'Decifre (volte 3 letras).', caixa_texto('<b>FDVD</b>') + resp_linha('Mensagem:')) + bloco(
        3, 'Cifre com a chave 3.', resp_linha('BOLA →'))
    c = bloco(1, 'Complete a régua da chave 3.', regua(3, 26, vazias=True)) + bloco(
        2, 'Decifre.', caixa_texto('<b>GDGRV SURWHJLGRV</b>') + resp_linha('Mensagem:')) + bloco(
        3, 'Cifre SENHA FORTE com a chave 3.', resp_linha('')) + bloco(
        4, 'Força bruta: quem não sabe a chave testa todas. Quantas chaves a cifra de César tem? E uma senha de 4 dígitos?', frases(['Cifra de César:', 'Senha de 4 dígitos:']))
    return ficha(
        'mensagens-secretas', 'Mensagens secretas', 'EF09CO05',
        'Entender a criptografia com a cifra de César: cifrar, decifrar com a chave e por que chaves maiores são mais seguras.',
        'Duas tiras de papel com o alfabeto para deslizar (régua de César) ou um disco de cifra recortado.',
        ['Mostre um bilhete "secreto" e pergunte como escondê-lo de quem não deve ler.',
         'Monte a régua de César com duas tiras e desloque 3 letras.',
         'Cifre e decifre palavras com a turma; depois converse sobre força bruta.',
         'Na versão A o estudante usa chave 1; na B chave 3 com palavras curtas; na C frases e força bruta.'],
        ['Use o disco ou as tiras de papel e uma letra por vez, apontando com o dedo.',
         'Mostre a régua completa sempre visível. A regra fixa do deslocamento costuma ser bem aceita.',
         'Proponha troca de mensagens secretas entre colegas como desafio com tempo.'],
        ['Bloco 1: B C D E F G H I. Bloco 2: AMOR.',
         'Bloco 1: D E F G H I J K L M N O P. Bloco 2: CASA. Bloco 3: EROD.',
         'Bloco 1: D a Z, depois A, B, C. Bloco 2: DADOS PROTEGIDOS. Bloco 3: VHQKD IRUWH. Bloco 4: 25 chaves úteis (26 contando a chave 0); 10 000 senhas.'],
        a, b, c)


def radar():
    dados = [['Buracos na rua', '42'], ['Iluminação', '28'], ['Lixo acumulado', '35'], ['Ônibus atrasado', '50']]
    a = bloco(1, 'Qual problema teve mais reclamações? Circule.', tabela(['Problema', 'Reclamações'], dados[:3]) + opcoes(['Buracos', 'Iluminação', 'Lixo'])) + bloco(
        2, 'Pinte as barras: cada quadradinho vale 10 reclamações.', tabela(['Problema', '10', '20', '30', '40'], [['Buracos (40)', '', '', '', ''], ['Iluminação (30)', '', '', '', '']]), 'Pinte da esquerda para a direita.')
    b = bloco(1, 'Leia a tabela de reclamações do mês.', tabela(['Problema', 'Reclamações'], dados) + frases(['Mais reclamado:', 'Menos reclamado:', 'Total de reclamações:'])) + bloco(
        2, 'Escolha um problema e uma solução digital (app, mapa, site).', caixas(['Problema', 'Solução'], 2, '24mm'))
    c = bloco(1, 'Reclamações do mês.', tabela(['Problema', 'Reclamações'], dados + [['Sem internet na praça', '15']]) + frases(['Total:', 'Porcentagem do ônibus atrasado:'])) + bloco(
        2, 'Desenhe o gráfico de barras.', '<div class="caixa-desenho" style="height:46mm"></div>') + bloco(
        3, 'Proposta de solução digital.', caixas(['Problema escolhido', 'Solução', 'Dados que a solução usa', 'Quem pode ajudar'], 2, '16mm'))
    return ficha(
        'radar-do-bairro', 'Radar do bairro', 'EF09CO06',
        'Usar dados da comunidade para entender problemas do bairro e propor soluções digitais.',
        'Mapa do bairro, papel quadriculado, dados de reclamações (inventados ou da própria turma).',
        ['Pergunte quais problemas a turma vê no caminho de casa até a escola.',
         'Mostre a tabela de reclamações e transforme-a num gráfico de barras com a turma.',
         'Escolha um problema e pense numa solução digital (mapa colaborativo, app, painel).',
         'Na versão A o estudante compara e pinta barras; na B lê a tabela e propõe; na C calcula, desenha o gráfico e planeja.'],
        ['Use papel quadriculado e pinte as barras contando quadradinhos. Números redondos.',
         'Dê o modelo de gráfico pronto e explique a escala antes (cada quadradinho vale 10).',
         'Faça uma votação rápida na turma e use os próprios dados no gráfico.'],
        ['Bloco 1: Buracos. Bloco 2: Buracos 4 quadradinhos; Iluminação 3.',
         'Bloco 1: ônibus atrasado; iluminação; 155. Bloco 2: resposta livre.',
         'Bloco 1: 170; 50 de 170, cerca de 29%. Bloco 2: cinco barras na escala certa. Bloco 3: resposta livre.'],
        a, b, c)


def tribunal():
    a = bloco(1, 'Benefício ou risco? Circule.', escolha([('App de entrega leva comida rápido.', ['benefício', 'risco'], 'benefício'), ('Câmera reconhece o rosto de todo mundo na rua.', ['benefício', 'risco'], None), ('Robô faz um trabalho perigoso no lugar de uma pessoa.', ['benefício', 'risco'], None)])) + bloco(
        2, 'Uma tecnologia pode ter benefícios e riscos ao mesmo tempo? Circule.', opcoes(['sim', 'não']))
    b = bloco(1, 'Escreva um benefício e um risco.', tabela(['Tecnologia', 'Benefício', 'Risco'], [['App de entrega', 'comida rápida', 'entregador sem direitos'], ['Reconhecimento facial', '', ''], ['Carro sem motorista', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'A escola deve usar câmeras com reconhecimento facial? Escolha um lado e dê um motivo.', opcoes(['a favor', 'contra']) + linhas(2))
    c = bloco(1, 'Julgue as tecnologias.', tabela(['Tecnologia', 'Benefícios', 'Riscos', 'Quem ganha e quem perde?'], [['Reconhecimento facial nas ruas', '', '', ''], ['Aplicativos de entrega', '', '', ''], ['Inteligência artificial que corrige provas', '', '', '']])) + bloco(
        2, 'A cidade deve instalar câmeras com reconhecimento facial em todas as ruas? Escolha um lado e escreva dois argumentos.', linhas(3)) + bloco(
        3, 'Que argumento o outro lado usaria? Como você responderia?', linhas(2))
    return ficha(
        'tribunal-da-tecnologia', 'Tribunal da tecnologia', 'EF09CO07',
        'Avaliar impactos da tecnologia na sociedade: benefícios, riscos e quem ganha ou perde com cada uma.',
        'Cartões com tecnologias, um "martelo de juiz" de papel, tempo marcado para cada lado.',
        ['Apresente uma tecnologia e peça benefícios e riscos.',
         'Organize o tribunal: defesa, acusação e júri.',
         'Combine as regras: cada lado fala em sua vez, com argumentos, sem ataques.',
         'Na versão A o estudante classifica; na B preenche e escolhe um lado; na C argumenta e antecipa o outro lado.'],
        ['Use imagens das tecnologias e uma pergunta por vez. Aceite respostas faladas registradas pelo professor.',
         'Explique as regras e a ordem das falas antes, por escrito, e dê um papel fixo no tribunal.',
         'Dê papéis ativos (júri que marca pontos, cronometrista) e falas curtas.'],
        ['Bloco 1: benefício; risco; benefício. Bloco 2: sim.',
         'Bloco 1: resposta livre (segurança e privacidade; menos acidentes e perda de empregos). Bloco 2: resposta livre.',
         'Respostas livres; confira se há benefícios, riscos e argumentos com motivo.'],
        a, b, c)


def acesso():
    a = bloco(1, 'Para estudar online, o que é preciso? Circule duas coisas.', opcoes(['internet', 'aparelho', 'guarda-chuva'])) + bloco(
        2, 'Um colega não tem internet em casa. O que a escola pode fazer? Circule.', opcoes(['emprestar tablet e liberar o laboratório', 'nada']))
    b = bloco(1, 'Pesquisa na turma: levantem a mão e completem.', tabela(['Pergunta', 'Quantos?'], [['Tem celular próprio', ''], ['Tem computador em casa', ''], ['Tem internet em casa', ''], ['Divide o aparelho com a família', '']])) + bloco(
        2, 'Proponha uma ação para quem não tem acesso.', linhas(2))
    c = bloco(1, 'Pesquisa na turma.', tabela(['Pergunta', 'Quantos?', 'Porcentagem'], [['Tem celular próprio', '', ''], ['Tem computador em casa', '', ''], ['Tem internet em casa', '', ''], ['Divide o aparelho com a família', '', '']])) + bloco(
        2, 'Os minérios de um celular podem vir de minas com trabalho infantil, e o aparelho velho pode virar lixo em outro país. Quem tem responsabilidade e o que cada um pode fazer?', linhas(3)) + bloco(
        3, 'Proponha uma ação para diminuir a desigualdade de acesso na escola.', linhas(2))
    return ficha(
        'acesso-digital-desigual', 'Acesso digital desigual', 'EF09CO08',
        'Discutir a desigualdade de acesso à tecnologia e os problemas éticos na cadeia de produção dos aparelhos.',
        'Dados da própria turma, mapa-múndi, fotos de lugares com e sem internet.',
        ['Faça a pesquisa da turma com as mãos levantadas, sem expor ninguém.',
         'Converse sobre o que muda na vida de quem não tem acesso.',
         'Mostre a cadeia do celular, da mina ao lixo, e quem é afetado.',
         'Na versão A o estudante identifica o necessário e uma solução; na B faz a pesquisa e propõe; na C também calcula e discute a cadeia.'],
        ['Use imagens de aparelhos e de internet. Perguntas de sim ou não, sem expor a situação do estudante.',
         'Avise que a pesquisa é anônima e explique cada pergunta antes. Mantenha a tabela fixa.',
         'Deixe o estudante contar as mãos e registrar os números da turma.'],
        ['Bloco 1: internet e aparelho. Bloco 2: emprestar tablet e liberar o laboratório.',
         'Bloco 1: dados da turma. Bloco 2: resposta livre.',
         'Bloco 1: dados e porcentagens da turma. Blocos 2 e 3: resposta livre (empresas, governos e consumidores; empréstimo de aparelhos, internet na escola).'],
        a, b, c)


def creditos():
    a = bloco(1, 'Pode ou não pode? Circule.', escolha([('Usar uma foto livre, citando a autora.', ['pode', 'não pode'], 'pode'), ('Postar a foto de um colega sem perguntar.', ['pode', 'não pode'], None), ('Copiar o texto de um site e dizer que é seu.', ['pode', 'não pode'], None)])) + bloco(
        2, 'O que é dar crédito? Circule.', opcoes(['dizer quem fez', 'apagar o nome do autor']))
    b = bloco(1, 'Pode ou não pode? Marque.', marcar(['Usar música famosa num vídeo público.', 'Usar uma foto CC BY, citando a autora.', 'Postar a foto de um colega sem perguntar.', 'Usar uma imagem de domínio público.'], ['Pode', 'Não pode'], exemplo=(1, 0))) + bloco(
        2, 'Escreva o crédito da foto.', caixa_texto('Foto "Pôr do sol no Guaíba", de Maria Lima, Wikimedia Commons, licença CC BY.', 'cinza') + quadro_ex(p('Modelo: "Título", autor, onde está, licença.')) + linhas(1))
    c = bloco(1, 'Pode ou não pode? Marque e justifique uma.', marcar(['Usar música famosa de fundo em vídeo publicado.', 'Usar uma foto CC BY, citando a autora.', 'Postar a foto de um colega sem perguntar.', 'Usar imagem de domínio público.', 'Usar foto CC BY-NC num anúncio pago.'], ['Pode', 'Não pode']) + linhas(1)) + bloco(
        2, 'Escreva o crédito completo da foto.', caixa_texto('Foto "Pôr do sol no Guaíba", tirada por Maria Lima, publicada no Wikimedia Commons, licença CC BY 4.0.', 'cinza') + linhas(1)) + bloco(
        3, 'Ligue cada licença ao que ela deixa fazer.', ligar([('CC BY', 'pode usar, mas sem alterar'), ('CC BY-NC', 'pode usar e alterar, citando o autor'), ('CC BY-ND', 'pode usar, mas sem fins comerciais'), ('Todos os direitos reservados', 'precisa pedir permissão')]))
    return ficha(
        'creditos-certos', 'Créditos certos', 'EF09CO09',
        'Respeitar direitos autorais e de imagem: dar crédito, conhecer licenças Creative Commons e pedir permissão.',
        'Fotos impressas com e sem licença, cartões com os símbolos Creative Commons.',
        ['Mostre um trabalho com uma foto sem crédito e pergunte de quem é a foto.',
         'Apresente as licenças Creative Commons com os símbolos.',
         'Monte com a turma o modelo de crédito: título, autor, onde está, licença.',
         'Na versão A o estudante decide pode ou não pode; na B marca e escreve um crédito; na C também liga as licenças.'],
        ['Use exemplos com fotos da própria turma (com autorização) e duas opções por vez.',
         'Dê o modelo de crédito escrito e fixo. Explique as regras das licenças de forma literal.',
         'Proponha uma busca rápida de imagens livres no computador e registre o crédito de uma.'],
        ['Bloco 1: pode; não pode; não pode. Bloco 2: dizer quem fez.',
         'Bloco 1: não pode; pode; não pode; pode. Bloco 2: "Pôr do sol no Guaíba", Maria Lima, Wikimedia Commons, CC BY.',
         'Bloco 1: não pode; pode; não pode; pode; não pode. Bloco 2: "Pôr do sol no Guaíba", Maria Lima, Wikimedia Commons, CC BY 4.0. Bloco 3: CC BY = usar e alterar citando; BY-NC = sem fins comerciais; BY-ND = sem alterar; todos os direitos = pedir permissão.'],
        a, b, c)


def boato():
    post = 'URGENTE!!! Compartilhe antes que apaguem: cientistas confirmam que beber água gelada causa gripe. Mande para 10 grupos!'
    a = bloco(1, 'Este post parece boato? Circule.', caixa_texto(post, 'cinza') + opcoes(['parece boato', 'parece confiável'])) + bloco(
        2, 'O que fazer antes de compartilhar? Circule.', opcoes(['procurar em um site de checagem', 'mandar para 10 grupos']))
    b = bloco(1, 'Sublinhe três sinais de boato.', caixa_texto(post, 'cinza')) + bloco(
        2, 'Numere os passos da checagem de 1 a 4.', ordenar(['Procurar a notícia em veículos confiáveis', 'Ler além do título', 'Decidir se compartilha', 'Ver quem publicou e quando'], exemplo=(1, 1)))
    c = bloco(1, 'Analise o post: escreva os sinais de boato e onde checar.', caixa_texto(post + ' (sem autor, sem data, com uma foto de laboratório)', 'cinza') + linhas(2)) + bloco(
        2, 'Numere os passos da checagem de 1 a 6.', ordenar(['Procurar a mesma notícia em veículos confiáveis', 'Ler além do título', 'Decidir se compartilha', 'Ver quem publicou e quando', 'Fazer a busca reversa da imagem', 'Consultar um site de checagem'], colunas=2)) + bloco(
        3, 'Ligue cada formato ao jeito de checar.', ligar([('Foto', 'observar boca e voz que não combinam'), ('Deepfake', 'fazer busca reversa da imagem'), ('Áudio de mensagem', 'procurar a fonte original')]))
    return ficha(
        'verdade-ou-boato', 'Verdade ou boato?', 'EF09CO10',
        'Checar informações antes de compartilhar: sinais de boato, passos da checagem e cuidados com fotos, áudios e deepfakes.',
        'Posts fictícios impressos, acesso a um site de checagem (Agência Lupa, Aos Fatos, Fato ou Fake), lupa de papel.',
        ['Mostre um post fictício e procure sinais de boato: urgência, sem autor, pedido para espalhar.',
         'Faça com a turma os passos da checagem num site de verdade.',
         'Mostre exemplos de deepfake e busca reversa de imagens.',
         'Na versão A o estudante decide e escolhe a ação; na B sublinha e ordena; na C analisa e liga formatos.'],
        ['Use um post curto lido em voz alta e uma pergunta por vez: tem autor? tem data?',
         'Dê a lista de passos da checagem sempre na mesma ordem, como roteiro fixo.',
         'Faça a checagem como corrida de detetives em dupla, com tempo marcado.'],
        ['Bloco 1: parece boato. Bloco 2: procurar em um site de checagem.',
         'Bloco 1: URGENTE e pressa, "antes que apaguem", sem fonte, pedido para mandar a 10 grupos. Bloco 2: ler além do título (1), ver quem publicou (2), procurar em veículos confiáveis (3), decidir (4).',
         'Bloco 1: urgência, sem autor e data, pedido para espalhar, "cientistas" sem nome. Bloco 2: ler além do título, ver quem publicou, busca reversa, veículos confiáveis, site de checagem, decidir (a ordem do meio pode variar). Bloco 3: foto = busca reversa; deepfake = boca e voz; áudio = fonte original.'],
        a, b, c)


FICHAS = [arvores, projeto_impacto, estados, ataques, cifra, radar, tribunal, acesso, creditos, boato]
