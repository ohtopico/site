"""8º ano: fichas adaptadas das folhas para imprimir de BNCC Computação (EF08CO01 a EF08CO11)."""
from comp import (VAZIO, bloco, caixa_texto, caixas, cartoes, codigo, escolha, ficha, frases, grade, item, ligar, linhas,
                  marcar, opcoes, ordenar, p, quadro_ex, resp_linha, resposta, tabela, vetor)


def recursao():
    a = bloco(1, 'Cada boneca tem outra menor dentro. Quantas bonecas tem? Circule.', p('A boneca 3 tem a boneca 2 dentro. A boneca 2 tem a boneca 1 dentro. A boneca 1 é a menor e não abre.') + opcoes([2, 3, 4])) + bloco(
        2, 'A contagem regressiva chama a si mesma com um número menor. Complete.', '<p class="seq-num"><span class="cel">3</span><span class="cel">2</span><span class="cel vazia"></span><span class="cel">fim</span></p>', 'Ela para quando chega no 0.')
    b = bloco(1, 'Siga a função e escreva o que aparece.', codigo('função conta(n)\n    se n = 0 então mostre "fim"\n    senão\n        mostre n\n        conta(n − 1)') +
              grade([item('<b class="dado">conta(2)</b>', '<p class="legenda">2, 1, fim</p>', exemplo=True), item('<b class="dado">conta(4)</b>', '<span class="linha-resp"></span>')], 2)) + bloco(
        2, 'soma(1) = 1 e soma(n) = n + soma(n − 1). Complete.', tabela(['n', '1', '2', '3', '4'], [['soma(n)', '1', '3', '', '']]))
    c = bloco(1, 'Abra as bonecas do fatorial: fatorial(n) = n × fatorial(n − 1) e fatorial(1) = 1.', frases(['fatorial(4) = 4 × fatorial(3)', 'fatorial(3) = 3 ×', 'fatorial(2) = 2 ×', 'fatorial(1) = 1. Voltando: fatorial(4) ='])) + bloco(
        2, 'O que aparece? E o que acontece sem a linha "se n = 0"?', codigo('função conta(n)\n    se n = 0 então mostre "fim"\n    senão\n        mostre n\n        conta(n − 1)') + frases(['conta(5):', 'Sem a parada:'])) + bloco(
        3, 'Complete a tabela da soma recursiva.', tabela(['n', '1', '2', '3', '4', '5', '10'], [['soma(n)', '1', '3', '', '', '', '']]))
    return ficha(
        'bonecas-recursivas', 'Bonecas recursivas', 'EF08CO01',
        'Entender a recursão: uma função que chama a si mesma com um problema menor, até chegar ao caso que para.',
        'Bonecas russas (matrioscas) ou copos de tamanhos diferentes encaixados.',
        ['Abra as bonecas uma a uma: dentro de cada uma há outra igual, menor.',
         'Mostre que a menor não abre: é o caso de parada.',
         'Faça a contagem regressiva com a turma: cada um diz um número e passa para o próximo.',
         'Na versão A o estudante conta as bonecas; na B segue a função; na C calcula o fatorial e explica a parada.'],
        ['Use bonecas ou copos de verdade e conte em voz alta. Mostre a menor e diga: aqui para.',
         'Escreva cada chamada numa linha, sempre do mesmo jeito, e destaque a linha de parada com cor.',
         'Faça a contagem regressiva em pé, passando uma bola; quem recebe o 0 diz "fim".'],
        ['Bloco 1: 3 bonecas. Bloco 2: 1.',
         'Bloco 1: 4, 3, 2, 1, fim. Bloco 2: 6; 10.',
         'Bloco 1: fatorial(2); fatorial(1); 1; fatorial(4) = 24. Bloco 2: 5, 4, 3, 2, 1, fim; sem a parada, ela não termina nunca. Bloco 3: 6, 10, 15, 55.'],
        a, b, c)


def listas():
    a = bloco(1, 'A playlist começa vazia. Desenhe as músicas na ordem.', codigo('playlist ← [ ]\nadicione "Sol"\nadicione "Mar"') + vetor(['', ''], vazias=(0, 1))) + bloco(
        2, 'Qual é a maior temperatura? Circule.', vetor([18, 22, 30, 19], rotulo_indice=False) + opcoes([18, 22, 30, 19]))
    b = bloco(1, 'Siga o programa e escreva a playlist no fim.', codigo('playlist ← [ ]\nadicione "Sol"\nadicione "Mar"\nadicione "Lua"\nremova "Mar"') + resp_linha('playlist =')) + bloco(
        2, 'Percorra as temperaturas da semana.', vetor([18, 22, 25, 19, 30], rotulo_indice=False) + frases(['Maior:', 'Menor:', 'Dias acima de 20 °C:']))
    c = bloco(1, 'Siga o programa e responda.', codigo('playlist ← [ ]\nadicione "Sol"\nadicione "Mar"\nadicione "Lua"\nremova "Mar"\nadicione "Rio" no início') + frases(['playlist =', 'tamanho(playlist) ='])) + bloco(
        2, 'Percorra as temperaturas da semana.', vetor([18, 22, 25, 19, 30, 27, 21], rotulo_indice=False) + frases(['Maior e menor:', 'Média (some e divida por 7):', 'Quantos dias acima de 20 °C?'])) + bloco(
        3, 'Escreva os passos de um programa que lê produtos até a pessoa digitar "fim" e mostra quantos itens a lista tem.', linhas(3))
    return ficha(
        'listas-que-crescem', 'Listas que crescem', 'EF08CO02',
        'Usar listas que mudam de tamanho: adicionar, remover e percorrer itens para achar maior, menor e média.',
        'Cartões com nomes de músicas, uma fila de cadeiras ou caixas, um termômetro.',
        ['Monte uma playlist com cartões: adicione e remova cartões na frente da turma.',
         'Mostre que a lista cresce e diminui, e que a ordem importa.',
         'Percorra uma lista de temperaturas apontando cada item e guardando o maior.',
         'Na versão A o estudante monta a lista e escolhe o maior; na B segue um programa; na C também calcula a média e escreve um algoritmo.'],
        ['Use cartões de verdade e uma operação por vez. Leia cada linha do programa e faça o movimento com o cartão.',
         'Mantenha o desenho da lista sempre igual (caixas lado a lado) e diga antes quantas operações haverá.',
         'Deixe o estudante ser o "programa" que adiciona e remove cartões enquanto um colega lê.'],
        ['Bloco 1: Sol, Mar. Bloco 2: 30.',
         'Bloco 1: [Sol, Lua]. Bloco 2: 30; 18; 3 dias (22, 25, 30).',
         'Bloco 1: [Rio, Sol, Lua]; 3. Bloco 2: 30 e 18; 162 ÷ 7, cerca de 23,1 °C; 5 dias. Bloco 3: lista vazia; repetir: ler produto; se for "fim", parar; senão, adicionar; no fim, mostrar o tamanho.'],
        a, b, c)


def ordenar_buscar():
    a = bloco(1, 'Coloque os números em ordem, do menor para o maior.', '<p class="seq-num"><span class="cel">8</span><span class="cel">3</span><span class="cel">5</span></p>' +
              '<p class="seq-num"><span class="cel">3</span><span class="cel vazia"></span><span class="cel vazia"></span></p>', 'O primeiro já está no lugar.') + bloco(
        2, 'Adivinhe o número de 1 a 8. A cada dica, risque a metade errada.', p('Dica: é maior que 4.') + '<p class="seq-num">' + ''.join(f'<span class="cel">{n}</span>' for n in range(1, 9)) + '</p>' +
        p('Quantos números sobraram?') + opcoes([4, 8]))
    b = bloco(1, 'Ordenação por seleção: a cada passo, traga o menor para a frente.', tabela(['Passo', '1º', '2º', '3º', '4º'], [['início', '7', '2', '9', '4'], ['passo 1', '2', '7', '9', '4'], ['passo 2', '', '', '', ''], ['passo 3', '', '', '', '']]), 'O passo 1 é o exemplo.') + bloco(
        2, 'Busca binária: procure o 21. Olhe o meio e risque a metade que não serve.', '<p class="seq-num">' + ''.join(f'<span class="cel">{n}</span>' for n in [2, 5, 8, 12, 16, 21, 25]) + '</p>' + resp_linha('Quantos passos?'))
    c = bloco(1, 'Ordene por seleção, mostrando cada passo.', tabela(['Passo', '1º', '2º', '3º', '4º', '5º'], [['início', '7', '2', '9', '4', '1'], ['passo 1', '', '', '', '', ''], ['passo 2', '', '', '', '', ''], ['passo 3', '', '', '', '', ''], ['passo 4', '', '', '', '', '']])) + bloco(
        2, 'Busca binária: procure o 37. Escreva os números do meio que você olhou.', '<p class="seq-num">' + ''.join(f'<span class="cel">{n}</span>' for n in [2, 5, 8, 12, 16, 21, 25, 30, 37, 42, 48]) + '</p>' + resp_linha('Números do meio:')) + bloco(
        3, 'E com listas grandes? Complete o pior caso.', tabela(['Lista com', 'Busca linear', 'Busca binária'], [['15 itens', '15', '4'], ['1000 itens', '', ''], ['1 milhão de itens', '', '']]))
    return ficha(
        'buscar-e-ordenar', 'Buscar e ordenar', 'EF08CO03',
        'Ordenar uma lista por seleção e procurar um item com busca binária, comparando com a busca um por um.',
        'Cartas numeradas, um dicionário ou lista telefônica, cartões de 1 a 16.',
        ['Peça para a turma ordenar cartas: traga sempre a menor para a frente (seleção).',
         'Brinque de adivinhar um número de 1 a 100 com dicas "maior" ou "menor".',
         'Mostre que, com a lista ordenada, olhar o meio corta metade das opções a cada passo.',
         'Na versão A o estudante ordena três números e corta uma metade; na B faz passos guiados; na C compara as buscas.'],
        ['Use cartas grandes na mesa e mova uma por vez. Uma pergunta de cada vez.',
         'Mostre a regra de cada algoritmo em uma frase fixa e siga sempre a mesma tabela de passos.',
         'Faça a brincadeira de adivinhar o número em dupla, com tempo curto, antes da folha.'],
        ['Bloco 1: 3, 5, 8. Bloco 2: 4 (sobram 5, 6, 7 e 8).',
         'Bloco 1: passo 2: 2, 4, 9, 7; passo 3: 2, 4, 7, 9. Bloco 2: 2 passos (olha o 12, depois o 21).',
         'Bloco 1: 1 7 9 4 2 / 1 2 9 4 7 / 1 2 4 9 7 / 1 2 4 7 9. Bloco 2: 21, 37 (2 passos; também vale 21, 37 contando de outro meio). Bloco 3: 1000 e 10; 1 milhão e 20.'],
        a, b, c)


def outra_aula():
    a = bloco(1, 'Ligue cada matéria a uma ideia de programa.', ligar([('Ciências', 'quiz de capitais'), ('Geografia', 'contador de passos'), ('Educação Física', 'tabela de plantas que crescem')])) + bloco(
        2, 'O programa deve somar dois números. Ele passou no teste? Circule.', tabela(['Entrada', 'Saída esperada', 'Saída obtida'], [['2 e 3', '5', '5']]) + opcoes(['passou', 'não passou']))
    b = bloco(1, 'Ligue cada matéria a uma ideia de programa.', ligar([('Geografia', 'contar quantas palavras tem um texto'), ('Ciências', 'quiz de capitais'), ('Língua Portuguesa', 'registrar o crescimento da planta'), ('História', 'linha do tempo que ordena fatos')])) + bloco(
        2, 'Complete os casos de teste de um programa que diz se o número é par.', tabela(['Entrada', 'Saída esperada', 'Saída obtida', 'Passou?'], [['4', 'par', 'par', 'sim'], ['7', '', 'par', ''], ['10', '', 'par', '']]))
    c = bloco(1, 'Escolha uma matéria e escreva uma ideia de programa para ela.', resp_linha('Ideia:')) + bloco(
        2, 'Escreva três requisitos: o que o programa deve fazer.', frases(['O programa deve', 'O programa deve', 'O programa deve'])) + bloco(
        3, 'Escreva três casos de teste.', tabela(['Entrada', 'Saída esperada', 'Saída obtida', 'Passou?'], [['', '', '', ''], ['', '', '', ''], ['', '', '', '']]))
    return ficha(
        'programa-para-outra-aula', 'Programa para outra aula', 'EF08CO04',
        'Criar um programa que ajude em outra matéria, definindo requisitos e testando com casos de teste.',
        'Exemplos de programas simples (quiz, contador), cartões das matérias, computador para testar.',
        ['Pergunte que tarefa de outra matéria é chata ou demorada e poderia virar programa.',
         'Mostre o que é um requisito ("o programa deve...").',
         'Monte uma tabela de teste: entrada, saída esperada, saída obtida.',
         'Na versão A o estudante liga e confere um teste; na B completa testes; na C planeja o próprio programa.'],
        ['Dê ideias prontas com imagens e um teste por vez, com números pequenos.',
         'Use a mesma tabela de teste sempre e explique que um teste que falha ajuda a achar erros.',
         'Deixe o estudante testar no computador de verdade logo depois de escrever cada caso.'],
        ['Bloco 1: Ciências = plantas; Geografia = capitais; Educação Física = passos. Bloco 2: passou.',
         'Bloco 1: Geografia = capitais; Ciências = planta; Língua Portuguesa = palavras; História = linha do tempo. Bloco 2: 7 = ímpar, não passou; 10 = par, passou.',
         'Respostas livres; confira se os requisitos começam com um verbo e se cada teste tem entrada e saída esperada.'],
        a, b, c)


def paralelo():
    a = bloco(1, 'Encher os balões leva 12 minutos sozinho. Com 2 pessoas dividindo, leva quanto? Circule.', opcoes([6, 12, 24])) + bloco(
        2, 'Dois caixas vendem o último ingresso ao mesmo tempo. O que acontece? Circule.', opcoes(['duas pessoas com o mesmo lugar', 'tudo certo']))
    b = bloco(1, 'A festa tem 4 tarefas. Quanto tempo leva?', tabela(['Tarefa', 'Minutos'], [['Encher balões', '12'], ['Fazer o cartaz', '9'], ['Arrumar a mesa', '6'], ['Preparar o suco', '3']]) +
              frases(['Uma pessoa fazendo tudo:', 'Quatro pessoas, cada uma uma tarefa:'])) + bloco(
        2, 'Resta 1 ingresso e dois caixas vendem ao mesmo tempo. O que pode dar errado?', linhas(2))
    c = bloco(1, 'A festa da turma.', tabela(['Tarefa', 'Minutos'], [['Encher balões', '12'], ['Fazer o cartaz', '9'], ['Arrumar a mesa', '6'], ['Preparar o suco', '3']]) +
              frases(['Uma pessoa:', 'Quatro pessoas:', 'Duas pessoas, dividindo bem:'])) + bloco(
        2, 'O último ingresso: o que dá errado e como o sistema pode evitar?', linhas(2)) + bloco(
        3, 'Paralela ou distribuída? Escreva P ou D.', frases(['8 núcleos dividem os quadros de um vídeo:', 'Milhares de servidores guardam cópias das fotos na nuvem:', 'Vários computadores no mundo ajudam numa pesquisa científica:']))
    return ficha(
        'muitas-maos', 'Muitas mãos', 'EF08CO05',
        'Entender a computação paralela e distribuída: dividir tarefas entre vários processadores ou computadores, e os cuidados ao fazer isso.',
        'Cronômetro, tarefas simples para a turma (empilhar copos, separar cartões).',
        ['Peça para uma pessoa separar 40 cartões e cronometre; depois quatro pessoas dividem.',
         'Compare os tempos: dividir acelera, mas é preciso combinar.',
         'Encene dois caixas vendendo o mesmo último ingresso e mostre o problema.',
         'Na versão A o estudante escolhe respostas; na B calcula tempos; na C também diferencia paralela e distribuída.'],
        ['Faça a atividade com cartões de verdade e cronômetro. Uma pergunta por vez, com números pequenos.',
         'Explique antes a regra da divisão (cada um faz uma parte) e quem faz o quê.',
         'A corrida com cronômetro mantém a atenção; deixe o estudante cronometrar.'],
        ['Bloco 1: 6 minutos. Bloco 2: duas pessoas com o mesmo lugar.',
         'Bloco 1: 30 minutos; 12 minutos (a tarefa mais longa). Bloco 2: os dois vendem o mesmo ingresso e duas pessoas ficam com o mesmo lugar.',
         'Bloco 1: 30; 12; 15 (balões + suco = 15; cartaz + mesa = 15). Bloco 2: venda dupla; travar o ingresso enquanto um caixa vende. Bloco 3: P; D; D.'],
        a, b, c)


def clique():
    a = bloco(1, 'Numere a viagem de um clique de 1 a 3.', ordenar(['O navegador mostra a página.', 'Você digita o endereço do site.', 'O servidor envia a página.'], exemplo=(1, 1))) + bloco(
        2, 'O DNS é a agenda da internet. Qual é o número do site? Circule.', tabela(['Nome', 'Número (IP)'], [['escola.edu.br', '203.0.113.10'], ['jogos.net', '198.51.100.7']]) + p('jogos.net tem o número:') + opcoes(['203.0.113.10', '198.51.100.7']))
    b = bloco(1, 'Numere a viagem de 1 a 4.', ordenar(['O servidor envia a página em pacotes.', 'Você digita o endereço.', 'O navegador junta os pacotes e mostra.', 'O DNS traduz o nome em número.'], exemplo=(1, 1))) + bloco(
        2, 'Use a agenda do DNS.', tabela(['Nome', 'IP'], [['escola.edu.br', '203.0.113.10'], ['museu.gov.br', '198.51.100.42'], ['jogos.net', '198.51.100.7']]) + frases(['IP do museu:', 'Nome do 203.0.113.10:']))
    c = bloco(1, 'Numere a viagem de 1 a 5.', ordenar(['O servidor envia a página em pacotes.', 'Você digita ohtopico.com.br.', 'O navegador junta os pacotes e mostra.', 'O DNS traduz o nome em número IP.', 'O pedido passa por roteadores até o servidor.'], colunas=1)) + bloco(
        2, 'Quem é quem na internet? Ligue.', ligar([('Provedor', 'computador que guarda o site'), ('Roteador', 'liga continentes pelo fundo do mar'), ('Servidor', 'empresa que leva a internet até você'), ('Cabo submarino', 'escolhe o caminho dos pacotes')])) + bloco(
        3, 'Se o DNS parar, você ainda consegue abrir o site? Explique.', linhas(2))
    return ficha(
        'a-viagem-de-um-clique', 'A viagem de um clique', 'EF08CO06',
        'Entender o caminho de um pedido na internet: DNS, roteadores, servidor e pacotes.',
        'Cartões com as etapas, uma agenda de telefones, barbante para a rede.',
        ['Pergunte o que acontece entre digitar um endereço e ver a página.',
         'Compare o DNS com uma agenda: nome da pessoa e número do telefone.',
         'Encene a viagem: estudantes são navegador, DNS, roteadores e servidor.',
         'Na versão A o estudante ordena três etapas e consulta a agenda; na B quatro etapas; na C liga os equipamentos e explica o DNS.'],
        ['Encene com cartões nas mãos de cada estudante. Poucas etapas e uma de cada vez.',
         'Mostre a sequência completa antes e use sempre os mesmos nomes. Uma agenda real ajuda a entender o DNS.',
         'Faça a encenação em movimento: o "pacote" anda de mão em mão.'],
        ['Bloco 1: digita (1), servidor envia (2), navegador mostra (3). Bloco 2: 198.51.100.7.',
         'Bloco 1: digita (1), DNS (2), servidor (3), navegador (4). Bloco 2: 198.51.100.42; escola.edu.br.',
         'Bloco 1: digita, DNS, roteadores, servidor envia, navegador mostra. Bloco 2: provedor = leva a internet; roteador = escolhe o caminho; servidor = guarda o site; cabo = liga continentes. Bloco 3: só se souber o número IP; pelo nome, não.'],
        a, b, c)


def feed():
    a = bloco(1, 'O feed mostra primeiro o post com mais pontos. Qual aparece primeiro? Circule.', tabela(['Post', 'Pontos'], [['Gatinho', '50'], ['Receita', '20'], ['Futebol', '80']]) + opcoes(['Gatinho', 'Receita', 'Futebol'])) + bloco(
        2, 'Antes de compartilhar, o que fazer? Circule.', opcoes(['ler o post inteiro', 'compartilhar logo']))
    b = bloco(1, 'Seja o algoritmo: pontos = curtidas + 2 × comentários.', tabela(['Post', 'Curtidas', 'Comentários', 'Pontos'], [['Gatinho', '40', '5', '50'], ['Receita', '10', '20', ''], ['Futebol', '30', '2', '']]) + resp_linha('Ordem no feed:'), 'O primeiro é o exemplo.') + bloco(
        2, 'Uma pessoa só curte vídeos de futebol. O que o feed vai mostrar cada vez mais?', linhas(1))
    c = bloco(1, 'Seja o algoritmo: pontos = curtidas + 2 × comentários. Numere a ordem do feed.', tabela(['Post', 'Curtidas', 'Comentários', 'Pontos', 'Ordem'], [['Gatinho', '40', '5', '', ''], ['Receita', '10', '20', '', ''], ['Futebol', '30', '2', '', ''], ['Notícia', '15', '12', '', '']])) + bloco(
        2, 'A bolha: se uma pessoa só curte vídeos de futebol, o que o feed vai mostrar? O que pode ficar de fora?', linhas(2)) + bloco(
        3, 'Escreva três coisas a conferir antes de compartilhar.', linhas(3))
    return ficha(
        'por-dentro-do-feed', 'Por dentro do feed', 'EF08CO07',
        'Entender como algoritmos escolhem o que aparece no feed e como isso pode criar bolhas de informação.',
        'Cartões de posts fictícios com curtidas e comentários, calculadora.',
        ['Mostre cartões de posts e pergunte qual a rede mostraria primeiro.',
         'Apresente uma regra simples de pontos e calcule com a turma.',
         'Converse sobre a bolha: o feed mostra mais do mesmo e esconde o diferente.',
         'Na versão A o estudante compara pontos prontos; na B calcula; na C ordena o feed e reflete sobre a bolha.'],
        ['Use cartões grandes e números prontos. Ordene os cartões na mesa antes de escrever.',
         'Explique a regra de pontos por escrito e mostre um cálculo completo como exemplo.',
         'Transforme em jogo: cada estudante é o algoritmo e decide a ordem dos cartões no tempo marcado.'],
        ['Bloco 1: Futebol. Bloco 2: ler o post inteiro.',
         'Bloco 1: Receita 50; Futebol 34; ordem: Gatinho e Receita empatados (50), depois Futebol. Bloco 2: mais futebol.',
         'Bloco 1: Gatinho 50, Receita 50, Futebol 34, Notícia 39; ordem: Gatinho e Receita (1º e 2º), Notícia (3º), Futebol (4º). Blocos 2 e 3: resposta livre (mais futebol; outros assuntos ficam de fora; ler tudo, ver a fonte, conferir em outro lugar).'],
        a, b, c)


def dados_pessoais():
    a = bloco(1, 'É dado pessoal? Circule.', escolha([('Nome completo', ['sim', 'não'], 'sim'), ('Temperatura da cidade', ['sim', 'não'], None), ('Endereço de casa', ['sim', 'não'], None), ('CPF', ['sim', 'não'], None)], 2)) + bloco(
        2, 'Um jogo de quebra-cabeça pede dados. Ele precisa do seu endereço? Circule.', opcoes(['precisa', 'não precisa']))
    b = bloco(1, 'Pessoal, sensível ou não pessoal? Marque.', p('Sensível é o dado que pode causar discriminação: saúde, religião, biometria.') +
              marcar(['Nome completo', 'Religião', 'Temperatura da cidade', 'Endereço de casa', 'Exame de saúde'], ['Pessoal', 'Sensível', 'Não pessoal'], exemplo=(0, 0), largura='24mm')) + bloco(
        2, 'Um jogo de quebra-cabeça pede dados. Marque só o que ele precisa.', marcar(['Apelido', 'CPF', 'Senha', 'Endereço', 'Localização'], ['Precisa'], largura='24mm'))
    c = bloco(1, 'Pessoal, sensível ou não pessoal? Marque.', marcar(['Nome completo', 'Religião', 'Temperatura da cidade', 'Endereço de casa', 'Exame de saúde', 'Impressão digital', 'CPF', 'Número de alunos da escola'], ['Pessoal', 'Sensível', 'Não pessoal'], largura='24mm')) + bloco(
        2, 'Ligue o dado exposto ao risco.', ligar([('Senha vazada', 'golpes e compras no seu nome'), ('CPF exposto', 'alguém sabe onde você está'), ('Localização em tempo real', 'invasão das suas contas')])) + bloco(
        3, 'Por que empresas querem tantos dados? Escreva uma razão.', linhas(1))
    return ficha(
        'seus-dados-valem-muito', 'Seus dados valem muito', 'EF08CO08',
        'Reconhecer dados pessoais e sensíveis, pedir só o necessário e entender os riscos de expor dados.',
        'Um cadastro fictício impresso, cartões com tipos de dados, marca-texto.',
        ['Mostre um cadastro de app fictício com muitos campos e pergunte quais são necessários.',
         'Explique dado pessoal (identifica alguém) e sensível (pode gerar discriminação), conforme a LGPD.',
         'Converse sobre o que pode acontecer se cada dado vazar.',
         'Na versão A o estudante identifica dados pessoais; na B classifica e escolhe; na C liga riscos e reflete.'],
        ['Use exemplos do próprio estudante (nome, escola) e duas opções por vez. Mostre com cartões.',
         'Defina cada tipo com uma frase fixa e exemplos. Fale de riscos com calma, com ações concretas de proteção.',
         'Use marca-texto para destacar no cadastro o que é desnecessário; depois a folha.'],
        ['Bloco 1: sim; não; sim; sim. Bloco 2: não precisa.',
         'Bloco 1: pessoal: nome, endereço; sensível: religião, exame de saúde; não pessoal: temperatura. Bloco 2: apelido e senha.',
         'Bloco 1: pessoal: nome, endereço, CPF; sensível: religião, exame, impressão digital; não pessoal: temperatura, número de alunos. Bloco 2: senha = invasão; CPF = golpes; localização = sabem onde você está. Bloco 3: para propaganda direcionada e para vender ou analisar dados.'],
        a, b, c)


def termos():
    clausulas = ('<b>Termos do app Fotolândia (fictício)</b><br>1. Você precisa ter 13 anos ou mais.<br>2. As fotos que você publica podem ser usadas pelo app em propagandas.<br>'
                 '3. O app guarda sua localização o tempo todo.<br>4. Podemos compartilhar seus dados com empresas parceiras.')
    a = bloco(1, 'Leia com o professor e responda. Circule.', caixa_texto(clausulas, 'cinza') + escolha([('O app pode usar suas fotos em propagandas?', ['sim', 'não'], 'sim'), ('O app guarda sua localização?', ['sim', 'não'], None)], 2)) + bloco(
        2, 'Antes de clicar em "li e concordo", o que fazer? Circule.', opcoes(['ler os termos', 'clicar sem ler']))
    b = bloco(1, 'Leia os termos e responda.', caixa_texto(clausulas, 'cinza') + frases(['Idade mínima:', 'O que o app faz com suas fotos?', 'Com quem ele pode dividir seus dados?'])) + bloco(
        2, 'Qual cláusula você acha mais injusta? Por quê?', linhas(2))
    c = bloco(1, 'Leia os termos e responda.', caixa_texto(clausulas + '<br>5. Os termos podem mudar a qualquer momento, sem aviso.', 'cinza') + frases(['Cláusulas sobre privacidade:', 'Cláusula que pode mudar tudo:'])) + bloco(
        2, 'Reescreva a cláusula 4 com palavras simples, para um colega do 6º ano.', linhas(2)) + bloco(
        3, 'Se você fosse a empresa, que cláusula mudaria para ser mais justa? Escreva a nova versão.', linhas(2))
    return ficha(
        'li-e-concordo', 'Li e concordo?', 'EF08CO09',
        'Ler termos de uso e políticas de privacidade, entender o que se aceita e reconhecer cláusulas abusivas.',
        'Os termos fictícios impressos em letra grande, marca-texto de duas cores.',
        ['Pergunte quem já leu os termos de um app antes de aceitar.',
         'Leia os termos fictícios em voz alta, uma cláusula por vez.',
         'Marque com uma cor o que é sobre dados e com outra o que é injusto.',
         'Na versão A o estudante responde sim ou não; na B escreve respostas; na C reescreve e propõe uma cláusula justa.'],
        ['Leia junto com o estudante, uma cláusula por vez, e explique cada palavra difícil.',
         'Deixe explícito que os termos são fictícios. Use marca-texto com uma regra clara de cores.',
         'Divida a leitura em pedaços curtos e alterne com perguntas rápidas.'],
        ['Bloco 1: sim; sim. Bloco 2: ler os termos.',
         'Bloco 1: 13 anos; pode usar em propagandas; com empresas parceiras. Bloco 2: resposta livre.',
         'Bloco 1: cláusulas 2, 3 e 4; cláusula 5. Bloco 2: por exemplo, "O app pode passar o que sabe sobre você para outras empresas." Bloco 3: resposta livre.'],
        a, b, c)


def privacidade():
    a = bloco(1, 'A permissão faz sentido? Circule.', escolha([('Lanterna pede seus contatos.', ['faz sentido', 'não faz'], 'não faz'), ('Mapa pede sua localização.', ['faz sentido', 'não faz'], None), ('Calculadora pede a câmera.', ['faz sentido', 'não faz'], None)])) + bloco(
        2, 'Qual foto é mais segura para postar? Circule.', opcoes(['foto com o uniforme e o nome da escola', 'foto do seu desenho']))
    b = bloco(1, 'O app precisa dessa permissão? Escreva sim ou não.', tabela(['Aplicativo', 'Pede acesso a', 'Precisa?'], [['Lanterna', 'contatos', 'não'], ['Mapa', 'localização', ''], ['Câmera de fotos', 'câmera', ''], ['Jogo de cartas', 'microfone', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'Numa foto pública, o que pode revelar onde você estuda ou mora? Marque.', marcar(['Uniforme da escola', 'Placa da rua', 'Um desenho seu', 'Localização marcada'], ['Revela'], largura='22mm'))
    c = bloco(1, 'A permissão faz sentido? Explique.', tabela(['Aplicativo', 'Pede acesso a', 'Precisa?', 'Por quê?'], [['Lanterna', 'contatos', '', ''], ['Mapa', 'localização', '', ''], ['Câmera de fotos', 'câmera', '', ''], ['Jogo de cartas', 'microfone', '', '']])) + bloco(
        2, 'Numa foto pública, o que pode revelar onde você estuda, mora ou estará?', linhas(2)) + bloco(
        3, 'Escreva três ações para proteger sua privacidade no celular ou nas redes.', linhas(3))
    return ficha(
        'privacidade-no-controle', 'Privacidade no controle', 'EF08CO10',
        'Controlar a própria privacidade: conferir permissões de apps e o que fotos e perfis públicos revelam.',
        'Um celular (do professor) para mostrar as permissões dos apps, fotos fictícias.',
        ['Abra as configurações de um app e mostre as permissões pedidas.',
         'Pergunte para cada uma: o app precisa disso para funcionar?',
         'Mostre uma foto fictícia e procure com a turma pistas de onde a pessoa está.',
         'Na versão A o estudante decide se faz sentido; na B completa a tabela e marca pistas; na C explica e faz um plano.'],
        ['Mostre a tela de permissões de verdade e decida uma por vez. Use exemplos com imagens.',
         'Use uma pergunta fixa ("o app precisa disso para funcionar?") e mantenha-a escrita na mesa.',
         'Transforme a foto em jogo de detetive: achar três pistas em pouco tempo.'],
        ['Bloco 1: não faz; faz sentido; não faz. Bloco 2: foto do seu desenho.',
         'Bloco 1: sim; sim; não. Bloco 2: uniforme, placa da rua e localização marcada.',
         'Bloco 1: lanterna não precisa de contatos; mapa precisa da localização para guiar; câmera precisa da câmera; jogo de cartas não precisa do microfone. Blocos 2 e 3: resposta livre (uniforme, placa, localização; revisar permissões, perfil privado, não marcar local).'],
        a, b, c)


def fontes():
    a = bloco(1, 'Para um trabalho sobre a dengue, qual fonte é confiável? Circule.', escolha([('Escolha uma:', ['site do Ministério da Saúde', 'mensagem sem autor no grupo'], 'site do Ministério da Saúde'), ('Escolha uma:', ['vídeo de "remédio milagroso"', 'livro de Ciências'], None)])) + bloco(
        2, 'O que olhar numa fonte? Circule as duas pistas certas.', opcoes(['quem escreveu', 'a data', 'a cor do site']))
    b = bloco(1, 'Escreva S (sim) ou N (não).', tabela(['Fonte', 'Tem autor?', 'Tem data?', 'Confiável?'], [['Site do Ministério da Saúde', 'S', 'S', 'S'], ['Mensagem sem autor no grupo', '', '', ''], ['Livro de Ciências da escola', '', '', '']]), 'A primeira linha é o exemplo.') + bloco(
        2, 'O mesmo fato, dois títulos. Qual puxa para um lado?', caixa_texto('A: "Prefeitura corta 20% da verba da merenda" · B: "Prefeitura muda 20% da verba da merenda para reformar cozinhas"') + resp_linha(''))
    c = bloco(1, 'Trabalho sobre a dengue: escreva S ou N.', tabela(['Fonte', 'Autor?', 'Data?', 'Confiável?'], [['Site do Ministério da Saúde', '', '', ''], ['Mensagem sem autor no grupo', '', '', ''], ['Vídeo sobre remédio milagroso', '', '', ''], ['Livro de Ciências', '', '', '']])) + bloco(
        2, 'O mesmo fato, dois títulos. Qual tem viés? Por quê?', caixa_texto('A: "Prefeitura corta 20% da verba da merenda" · B: "Prefeitura muda 20% da verba da merenda para reformar cozinhas"') + linhas(2)) + bloco(
        3, 'Ligue cada critério ao significado.', ligar([('Precisão', 'cobre o assunto por inteiro'), ('Abrangência', 'puxa a informação para um lado'), ('Viés', 'a informação está correta')]))
    return ficha(
        'fonte-confiavel', 'Fonte confiável?', 'EF08CO11',
        'Avaliar fontes de informação: autor, data, precisão, abrangência e viés.',
        'Exemplos impressos de fontes (site oficial, mensagem de grupo, livro), lupa de papel.',
        ['Mostre três fontes sobre o mesmo tema e pergunte em qual confiar.',
         'Crie com a turma as perguntas: quem escreveu? quando? onde mais aparece?',
         'Compare dois títulos sobre o mesmo fato e converse sobre viés.',
         'Na versão A o estudante escolhe a fonte e as pistas; na B preenche a tabela; na C analisa viés e critérios.'],
        ['Use fontes impressas de verdade e compare duas por vez. Aponte onde fica o autor e a data.',
         'Dê as perguntas da checagem numa lista fixa, sempre na mesma ordem.',
         'Use a lupa de papel e um tempo curto para achar autor e data em cada fonte.'],
        ['Bloco 1: Ministério da Saúde; livro de Ciências. Bloco 2: quem escreveu; a data.',
         'Bloco 1: mensagem: N, N, N; livro: S, S, S. Bloco 2: o título A puxa para um lado (só fala do corte).',
         'Bloco 1: Ministério: S S S; mensagem: N N N; vídeo: depende, mas N; livro: S S S. Bloco 2: A tem viés, omite o motivo. Bloco 3: precisão = correta; abrangência = cobre por inteiro; viés = puxa para um lado.'],
        a, b, c)


FICHAS = [recursao, listas, ordenar_buscar, outra_aula, paralelo, clique, feed, dados_pessoais, termos, privacidade, fontes]
