"""Jogos do 5º ano (EF05CO01 a EF05CO11). Com leitura curta: a instrução aparece escrita e também pode ser ouvida."""


def fila(*fs):
    return {'fila': list(fs)}


def txt(*ts):
    return [{'txt': t} for t in ts]


def t(s):
    return {'txt': s}


# mapa do bairro (vértices em % da área)
BAIRRO = {'casa': [12, 20, 'casa'], 'escola': [50, 14, 'escola'], 'parque': [86, 22, 'arvore'], 'mercado': [20, 78, 'prato'],
          'biblioteca': [52, 56, 'livro'], 'ponto': [86, 80, 'onibus']}
RUAS = [['casa', 'escola'], ['escola', 'parque'], ['casa', 'mercado'], ['escola', 'biblioteca'], ['mercado', 'biblioteca'], ['biblioteca', 'ponto'], ['parque', 'ponto']]

JOGOS5 = [
    dict(
        id='listas-em-acao', titulo='Listas em Ação', ano=5, habs=['EF05CO01'], tempo='15 min', leitura=True,
        resumo='Jogo para o 5º ano: manipular listas (acrescentar, remover, achar a posição, ordenar) com itens em sequência e quantidade que muda.',
        como=['Uma lista guarda itens em sequência, e o número de itens pode mudar: dá para acrescentar, tirar e trocar de lugar. Cada item tem uma posição (1º, 2º, 3º...).',
              'Use exemplos da turma: a lista de chamada, a fila do lanche, a playlist da festa.'],
        fases=[
            dict(tipo='escolha', fala='A lista de compras é: maçã, pão, ovo. Acrescente o leite no fim. Como fica?', cena=['maca', 'pao', 'ovo'],
                 opcoes=[fila('maca', 'pao', 'ovo', 'copo'), fila('copo', 'maca', 'pao', 'ovo'), fila('maca', 'pao', 'copo')], certa=0),
            dict(tipo='escolha', fala='Remova o 2º item da lista. Como fica?', cena=['gato', 'peixe', 'bola', 'flor'],
                 opcoes=[fila('gato', 'bola', 'flor'), fila('peixe', 'bola', 'flor'), fila('gato', 'peixe', 'flor')], certa=0),
            dict(tipo='escolha', fala='Qual é o 3º item desta lista?', cena=['sol', 'lua', 'estrela', 'nuvem'], opcoes=['lua', 'estrela', 'nuvem'], certa=1),
            dict(tipo='sequencia', fala='Ordene a lista de notas do menor para o maior.', itens=txt('2', '5', '7', '9', '10')),
            dict(tipo='escolha', fala='A playlist tem 4 músicas. Duas foram tiradas e três foram acrescentadas. Quantas músicas tem agora?', cena=['nota-musical'] * 4, opcoes=txt('5', '4', '9'), certa=0),
            dict(tipo='escolha', fala='Troque de lugar o 1º e o último item. Como fica?', cena=['carro', 'onibus', 'bicicleta'],
                 opcoes=[fila('bicicleta', 'onibus', 'carro'), fila('onibus', 'carro', 'bicicleta'), fila('carro', 'bicicleta', 'onibus')], certa=0),
            dict(tipo='sequencia', fala='Ordene a fila do lanche pela ordem de chegada: quem chegou às 10h, 10h05, 10h10, 10h20.', itens=txt('10h', '10h05', '10h10', '10h20')),
            dict(tipo='vf', fala='Uma lista pode aumentar e diminuir de tamanho. Verdadeiro ou falso?', cena=['documento'], resposta=True),
        ]),
    dict(
        id='rede-de-caminhos', titulo='Rede de Caminhos', ano=5, habs=['EF05CO02'], tempo='15 min', leitura=True,
        resumo='Jogo para o 5º ano: usar grafos (pontos ligados por linhas) para achar caminhos, o caminho mais curto e montar redes de amizade e de ruas.',
        como=['Um grafo tem vértices (os pontos) e arestas (as linhas que ligam os pontos). No mapa do bairro, os lugares são vértices e as ruas são arestas.',
              'Para andar, toque no lugar vizinho, um de cada vez. Em algumas fases é preciso o caminho mais curto. Nas fases de ligar, toque num ponto e depois no outro para criar a aresta.'],
        fases=[
            dict(tipo='grafo', fala='Saia de casa e chegue à escola pelas ruas. Toque nos lugares vizinhos, um de cada vez.', vertices=BAIRRO, arestas=RUAS, origem='casa', destino='escola'),
            dict(tipo='grafo', fala='Agora vá de casa até o ponto de ônibus pelo caminho mais curto: só 3 ruas.', vertices=BAIRRO, arestas=RUAS, origem='casa', destino='ponto', max=3),
            dict(tipo='grafo', fala='Do mercado até o parque com no máximo 3 ruas.', vertices=BAIRRO, arestas=RUAS, origem='mercado', destino='parque', max=3),
            dict(tipo='grafo', fala='Monte a rede de amizades: Ana é amiga de Bia e de Caio; Caio é amigo de Davi. Ligue os amigos.',
                 vertices={'Ana': [20, 30, None], 'Bia': [70, 18, None], 'Caio': [35, 78, None], 'Davi': [82, 70, None]}, rotulos=False,
                 ligar=[['Ana', 'Bia'], ['Ana', 'Caio'], ['Caio', 'Davi']]),
            dict(tipo='grafo', fala='Na rede de amizades, a mensagem passa de amigo para amigo. Leve a mensagem da Bia até o Davi.',
                 vertices={'Ana': [20, 30, None], 'Bia': [70, 18, None], 'Caio': [35, 78, None], 'Davi': [82, 70, None]}, rotulos=False,
                 arestas=[['Ana', 'Bia'], ['Ana', 'Caio'], ['Caio', 'Davi']], origem='Bia', destino='Davi'),
            dict(tipo='grafo', fala='Ligue as cidades com as estradas que faltam: A com B, B com C, C com D e D com A.',
                 vertices={'A': [18, 22, None], 'B': [82, 22, None], 'C': [82, 80, None], 'D': [18, 80, None]}, rotulos=False,
                 ligar=[['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A']]),
            dict(tipo='escolha', fala='No mapa do bairro, quantas ruas (arestas) saem da biblioteca?', cena=['livro'], opcoes=txt('3', '2', '4'), certa=0),
        ]),
    dict(
        id='e-ou-nao', titulo='E, Ou, Não', ano=5, habs=['EF05CO03'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: decidir se frases com E (conjunção), OU (disjunção) e NÃO (negação) são verdadeiras ou falsas olhando a cena.',
        como=['Frase com E só é verdadeira se as duas partes forem verdadeiras. Frase com OU é verdadeira se pelo menos uma parte for verdadeira. O NÃO (figura riscada) inverte.',
              'Os computadores fazem essas contas o tempo todo: "se a senha está certa E o usuário existe, entra".'],
        fases=[
            dict(tipo='vf', fala='Na cena tem gato E cachorro?', cena=['gato', 'cachorro', 'bola'], afirmacao=['gato', t('E'), 'cachorro'], resposta=True),
            dict(tipo='vf', fala='Na cena tem gato E peixe?', cena=['gato', 'bola', 'flor'], afirmacao=['gato', t('E'), 'peixe'], resposta=False),
            dict(tipo='vf', fala='Na cena tem gato OU peixe?', cena=['gato', 'bola', 'flor'], afirmacao=['gato', t('OU'), 'peixe'], resposta=True),
            dict(tipo='vf', fala='Na cena tem sol OU chuva?', cena=['lua', 'estrela'], afirmacao=['sol', t('OU'), 'chuva'], resposta=False),
            dict(tipo='vf', fala='Na cena NÃO tem bola E tem flor?', cena=['flor', 'arvore'], afirmacao=['!bola', t('E'), 'flor'], resposta=True),
            dict(tipo='vf', fala='Na cena NÃO tem maçã OU NÃO tem banana?', cena=['maca', 'banana', 'pao'], afirmacao=['!maca', t('OU'), '!banana'], resposta=False),
            dict(tipo='escolha', fala='Para entrar no jogo é preciso senha certa E nome cadastrado. A Lia tem o nome cadastrado, mas errou a senha. Ela entra?',
                 cena=['senha', 'errado'], opcoes=txt('Não entra', 'Entra'), certa=0, fixa=True),
            dict(tipo='escolha', fala='O passeio acontece se fizer sol OU se o ginásio estiver livre. Está chovendo, mas o ginásio está livre. Tem passeio?',
                 cena=['chuva', 'escola'], opcoes=txt('Tem', 'Não tem'), certa=0, fixa=True),
        ]),
    dict(
        id='se-entao-senao', titulo='Se, Então, Senão', ano=5, habs=['EF05CO04'], tempo='15 min', leitura=True,
        resumo='Jogo para o 5º ano: aplicar regras de seleção condicional (SE uma condição for verdadeira, ENTÃO faça uma coisa, SENÃO faça outra) a cada item que chega.',
        como=['A regra aparece no alto: SE, ENTÃO e SENÃO. Cada item que chega deve ir para a caixa da ação certa, conforme a condição seja verdadeira ou falsa.',
              'Depois do jogo, escrevam regras da escola nesse formato: SE o sinal tocar, ENTÃO vamos para o recreio, SENÃO continuamos a aula.'],
        fases=[
            dict(tipo='regras', fala='SE estiver chovendo, ENTÃO leve o guarda-chuva, SENÃO leve a bola. Para cada tempo, escolha.', se=['chuva'], caixas=['guarda-chuva', 'bola'],
                 itens=[{'f': 'chuva', 'caixa': 0}, {'f': 'sol', 'caixa': 1}, {'f': 'nuvem', 'caixa': 1}, {'f': 'chuva', 'caixa': 0}]),
            dict(tipo='regras', fala='SE o número for par, ENTÃO vai para a caixa azul, SENÃO vai para a amarela.', se=[t('par')], caixas=['circulo:azul', 'circulo:amarelo'],
                 itens=[{'f': t('4'), 'caixa': 0}, {'f': t('7'), 'caixa': 1}, {'f': t('10'), 'caixa': 0}, {'f': t('3'), 'caixa': 1}, {'f': t('8'), 'caixa': 0}]),
            dict(tipo='regras', fala='SE for fruta, ENTÃO vai para a fruteira, SENÃO vai para o armário.', se=['maca'], caixas=['prato', 'casa'],
                 itens=[{'f': 'banana', 'caixa': 0}, {'f': 'pao', 'caixa': 1}, {'f': 'maca', 'caixa': 0}, {'f': 'ovo', 'caixa': 1}]),
            dict(tipo='regras', fala='SE o semáforo estiver vermelho, ENTÃO o carro para, SENÃO segue.', se=['circulo:vermelho'], caixas=['mao-levantada', 'carro'],
                 itens=[{'f': 'circulo:vermelho', 'caixa': 0}, {'f': 'circulo:verde', 'caixa': 1}, {'f': 'circulo:vermelho', 'caixa': 0}, {'f': 'circulo:verde', 'caixa': 1}]),
            dict(tipo='regras', fala='SE a bateria estiver fraca, ENTÃO carregue, SENÃO pode jogar. Bateria fraca é a com pouca carga (abaixo de 20).', se=[t('menos de 20')], caixas=['carregador', 'videogame'],
                 itens=[{'f': t('15'), 'caixa': 0}, {'f': t('80'), 'caixa': 1}, {'f': t('5'), 'caixa': 0}, {'f': t('50'), 'caixa': 1}]),
            dict(tipo='escolha', fala='Regra do jogo: SE o personagem tocar na moeda, ENTÃO ganha 1 ponto, SENÃO nada muda. Ele tocou em 3 moedas. Quantos pontos ganhou?', cena=['circulo:amarelo'] * 3,
                 opcoes=txt('3', '1', '0'), certa=0),
            dict(tipo='caminho', modo='prever', fala='O robô segue a regra: anda para a direita até a parede; SE achar a árvore, ENTÃO desce até a borda. Onde ele para?', personagem='robo',
                 cols=5, rows=4, inicio=[0, 0], alvos=[], paredes=[[3, 0]], programa=[{'d': 'd', 'ate': True}, {'d': 'b', 'ate': True}]),
        ]),
    dict(
        id='dentro-do-computador', titulo='Dentro do Computador', ano=5, habs=['EF05CO05'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: identificar os componentes principais de um computador (entrada, saída, processador e armazenamento) e o caminho dos dados entre eles.',
        como=['As quatro caixas são: entrada (o que leva dados para dentro), processador (o chip que faz as contas), armazenamento (onde os dados ficam guardados) e saída (o que mostra o resultado).',
              'Se houver um computador velho na escola, abra com a turma (com cuidado e desligado da tomada) e procure as peças.'],
        fases=[
            dict(tipo='classificar', fala='Separe as peças: entrada, processador, armazenamento ou saída.', caixas=['entrada', 'chip', 'pendrive', 'saida'],
                 itens=[{'f': 'teclado', 'caixa': 0}, {'f': 'monitor', 'caixa': 3}, {'f': 'chip', 'caixa': 1}, {'f': 'pendrive', 'caixa': 2}, {'f': 'mouse', 'caixa': 0},
                        {'f': 'impressora', 'caixa': 3}, {'f': 'microfone', 'caixa': 0}, {'f': 'nuvem-dados', 'caixa': 2}]),
            dict(tipo='sequencia', fala='Ponha em ordem o caminho dos dados: entra, é processado, é guardado e sai.', itens=['teclado', 'chip', 'pendrive', 'monitor']),
            dict(tipo='escolha', fala='Qual peça faz as contas e segue as instruções dos programas?', opcoes=['chip', 'monitor', 'mouse'], certa=0),
            dict(tipo='escolha', fala='Onde a foto fica guardada mesmo depois de desligar o computador?', opcoes=txt('no armazenamento (disco, pendrive)', 'na tela', 'no mouse'), certa=0),
            dict(tipo='pares', fala='Ligue cada componente à função.', pares=[['teclado', t('entrada')], ['chip', t('processar')], ['pendrive', t('guardar')], ['caixa-som', t('saída')]]),
            dict(tipo='vf', fala='O celular também tem entrada, processador, armazenamento e saída. Verdadeiro ou falso?', cena=['celular'], resposta=True),
        ]),
    dict(
        id='aqui-ou-na-nuvem', titulo='Aqui ou na Nuvem?', ano=5, habs=['EF05CO06'], tempo='10 min', leitura=True,
        resumo='Jogo para o 5º ano: reconhecer que os dados podem ficar guardados no próprio aparelho (local) ou num computador distante, acessado pela internet (remoto, a nuvem).',
        como=['Armazenamento local é dentro do aparelho ou num pendrive que está com você. Armazenamento remoto (nuvem) é num computador de uma empresa, longe, que você acessa pela internet.',
              'Converse sobre vantagens e cuidados: na nuvem dá para abrir de qualquer lugar, mas precisa de internet e de senha forte.'],
        fases=[
            dict(tipo='classificar', fala='O dado está guardado aqui (local) ou longe, na nuvem (remoto)?', caixas=['pendrive', 'nuvem-dados'],
                 itens=[{'f': t('foto no celular'), 'caixa': 0}, {'f': t('e-mail'), 'caixa': 1}, {'f': t('arquivo no pendrive'), 'caixa': 0}, {'f': t('vídeo na plataforma'), 'caixa': 1},
                        {'f': t('jogo instalado'), 'caixa': 0}]),
            dict(tipo='escolha', fala='O celular está sem internet. Qual arquivo você ainda consegue abrir?', cena=['celular', '!wifi'], opcoes=txt('a foto guardada no celular', 'a foto guardada na nuvem'), certa=0),
            dict(tipo='escolha', fala='O celular caiu na água e estragou. Onde as fotos estariam salvas?', cena=['celular', 'agua-gota'], opcoes=txt('numa cópia na nuvem', 'só no celular estragado'), certa=0),
            dict(tipo='escolha', fala='Para abrir o trabalho na escola e em casa, sem levar nada, onde guardar?', opcoes=txt('na nuvem', 'no pendrive esquecido em casa', 'na memória do computador da escola'), certa=0),
            dict(tipo='vf', fala='Para usar a nuvem, é preciso internet e uma senha. Verdadeiro ou falso?', cena=['nuvem-dados', 'wifi', 'senha'], resposta=True),
            dict(tipo='vf', fala='Guardar uma cópia em dois lugares diferentes (backup) ajuda a não perder os dados. Verdadeiro ou falso?', cena=['pendrive', 'nuvem-dados'], resposta=True),
        ]),
    dict(
        id='o-maestro', titulo='O Maestro do Computador', ano=5, habs=['EF05CO07'], tempo='10 min', leitura=True,
        resumo='Jogo para o 5º ano: entender o papel do sistema operacional, o programa que liga o computador, abre os outros programas e organiza o uso do hardware.',
        como=['O sistema operacional é como o maestro de uma orquestra: ele não toca nenhum instrumento sozinho, mas decide quem toca e quando. Ele divide a tela, a memória e o processador entre os programas.',
              'Mostre na prática: o que aparece quando o computador liga, a área de trabalho, o gerenciador de arquivos e as configurações.'],
        fases=[
            dict(tipo='sequencia', fala='Ponha em ordem: o que acontece quando ligamos o computador?', itens=txt('aperta o botão', 'sistema operacional carrega', 'aparece a área de trabalho', 'abre o jogo')),
            dict(tipo='escolha', fala='Quem decide qual programa usa a tela, o som e a memória?', opcoes=txt('o sistema operacional', 'o mouse', 'o jogo'), certa=0),
            dict(tipo='escolha', fala='Sem sistema operacional, o computador...', opcoes=txt('não consegue abrir os outros programas', 'funciona igual', 'fica mais rápido'), certa=0),
            dict(tipo='escolha', fala='Qual destes é um sistema operacional de celular ou computador?', opcoes=txt('Android', 'navegador', 'editor de texto'), certa=0),
            dict(tipo='pares', fala='Ligue cada tarefa a quem faz.', pares=[[t('organizar as pastas e arquivos'), 'pasta'], [t('mostrar o vídeo'), 'video'], [t('reconhecer o mouse que foi conectado'), 'mouse']]),
            dict(tipo='vf', fala='O sistema operacional também cuida da segurança, pedindo senha para entrar. Verdadeiro ou falso?', cena=['computador', 'senha'], resposta=True),
        ]),
    dict(
        id='confiavel-ou-nao', titulo='Confiável ou Não?', ano=5, habs=['EF05CO08'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: separar conteúdos confiáveis de não confiáveis na internet, reconhecendo sinais de boato, propaganda disfarçada e golpe.',
        como=['Cada item é um conteúdo encontrado na internet. A criança decide se é confiável ou não e, nas fases de escolha, qual sinal mostra o problema.',
              'Sinais de alerta: sem autor, sem data, título exagerado, pede para repassar, promete prêmio, pede senha ou dados.'],
        fases=[
            dict(tipo='classificar', fala='Confiável ou não confiável?', caixas=['certo', 'errado'],
                 itens=[{'f': t('site do museu com autor e data'), 'caixa': 0}, {'f': t('VOCÊ GANHOU UM CELULAR! clique'), 'caixa': 1}, {'f': t('notícia de jornal conhecido'), 'caixa': 0},
                        {'f': t('repasse para 10 amigos'), 'caixa': 1}, {'f': t('site que pede a sua senha'), 'caixa': 1}]),
            dict(tipo='escolha', fala='"Cientistas descobrem que chocolate deixa você invisível!" Qual é o sinal de alerta?', opcoes=txt('título exagerado', 'tem a palavra cientistas', 'é sobre chocolate'), certa=0),
            dict(tipo='escolha', fala='Um vídeo diz que um produto cura tudo e mostra um link para comprar. O que é?', opcoes=txt('propaganda disfarçada', 'notícia confiável', 'aula de ciências'), certa=0),
            dict(tipo='escolha', fala='Uma mensagem diz que a escola vai fechar amanhã. Como confirmar?', opcoes=txt('no site ou recado oficial da escola', 'perguntando no grupo de jogo', 'repassando para ver se alguém sabe'), certa=0),
            dict(tipo='vf', fala='Um site ser bonito e colorido garante que ele é confiável. Verdadeiro ou falso?', cena=['navegador'], resposta=False),
            dict(tipo='vf', fala='Comparar a informação em fontes diferentes é um bom jeito de checar. Verdadeiro ou falso?', cena=['lupa', 'livro', 'navegador'], resposta=True),
        ]),
    dict(
        id='pode-usar', titulo='Pode Usar?', ano=5, habs=['EF05CO09'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: reconhecer o que pode e o que não pode ser usado de imagens, músicas, vídeos e textos da internet, citando o autor e respeitando os direitos autorais.',
        como=['Quem cria uma foto, música, desenho ou texto é o autor e tem direitos sobre a obra. Para usar, é preciso permissão, uma licença livre ou que o uso seja permitido, e sempre citar o autor.',
              'Mostre bancos de imagens e músicas livres e o hábito de escrever a fonte no trabalho.'],
        fases=[
            dict(tipo='escolha', fala='Você vai usar uma foto da internet no cartaz. O que é obrigatório fazer?', opcoes=txt('citar o autor e a fonte', 'tirar o nome do autor', 'dizer que a foto é sua'), certa=0),
            dict(tipo='vf', fala='Se está na internet, é de graça e posso usar como quiser. Verdadeiro ou falso?', cena=['foto', 'globo'], resposta=False),
            dict(tipo='escolha', fala='Qual imagem é mais segura para usar no vídeo da turma?', opcoes=txt('imagem de banco com licença livre', 'foto de um artista sem permissão', 'personagem famoso de filme'), certa=0),
            dict(tipo='escolha', fala='Você quer usar o desenho de um colega no jornal da turma. O que faz?', opcoes=txt('pede permissão e coloca o nome dele', 'usa sem avisar', 'muda a cor e diz que é seu'), certa=0),
            dict(tipo='classificar', fala='Pode usar ou precisa de cuidado?', caixas=['certo', 'interrogacao'],
                 itens=[{'f': t('foto que você mesmo tirou'), 'caixa': 0}, {'f': t('música famosa no vídeo'), 'caixa': 1}, {'f': t('imagem com licença livre, citando o autor'), 'caixa': 0},
                        {'f': t('texto copiado de um site'), 'caixa': 1}]),
            dict(tipo='escolha', fala='Copiar um texto inteiro de um site e entregar como seu trabalho é...', opcoes=txt('plágio', 'pesquisa', 'resumo'), certa=0),
        ]),
    dict(
        id='ontem-e-hoje', titulo='Ontem e Hoje', ano=5, habs=['EF05CO10'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: perceber como a tecnologia mudou a comunicação, o trabalho e a vida em sociedade, comparando o antes e o agora e pensando no futuro.',
        como=['O jogo compara como as coisas eram feitas e como são hoje e discute profissões que mudaram, surgiram ou podem surgir.',
              'Proponha uma entrevista com um familiar mais velho: como era o trabalho e a comunicação quando ele tinha a idade da turma?'],
        fases=[
            dict(tipo='pares', fala='Ligue o jeito antigo ao jeito de hoje.', pares=[['carta-papel', 'mensagem'], ['telefone', 'celular'], ['mapa', 'navegador'], ['livro', 'tablet']]),
            dict(tipo='sequencia', fala='Ponha em ordem, do mais antigo para o mais novo.', itens=['carta-papel', 'telefone', 'computador', 'celular']),
            dict(tipo='escolha', fala='Qual destas profissões surgiu por causa da internet?', opcoes=txt('criador de aplicativos', 'padeiro', 'carteiro'), certa=0),
            dict(tipo='escolha', fala='O caixa automático do banco mudou o trabalho de quem?', opcoes=txt('do caixa de banco', 'do bombeiro', 'do jardineiro'), certa=0),
            dict(tipo='vf', fala='A tecnologia muda as profissões, e é importante continuar aprendendo a vida toda. Verdadeiro ou falso?', cena=['livro', 'computador', 'adulto'], resposta=True),
            dict(tipo='escolha', fala='Um robô faz parte do trabalho numa fábrica. O que as pessoas podem fazer de novo?', opcoes=txt('programar e consertar o robô', 'nada, todo trabalho acabou', 'trabalhar mais devagar'), certa=0),
        ]),
    dict(
        id='tecnologia-certa', titulo='A Tecnologia Certa', ano=5, habs=['EF05CO11'], tempo='10–15 min', leitura=True,
        resumo='Jogo para o 5º ano: escolher a tecnologia computacional mais adequada para cada problema e perceber quando uma solução simples resolve melhor.',
        como=['Cada fase traz um problema. A criança escolhe a tecnologia que resolve melhor. Algumas vezes, a melhor solução nem precisa de computador.',
              'Peça que a turma justifique: por que essa e não outra? Custo, facilidade, acesso e segurança também contam.'],
        fases=[
            dict(tipo='escolha', fala='A turma quer somar os votos de 120 pessoas e fazer um gráfico. Qual ferramenta?', opcoes=txt('planilha', 'editor de vídeo', 'gravador de áudio'), certa=0),
            dict(tipo='escolha', fala='A avó mora longe e quer ver os netos. Qual tecnologia ajuda?', opcoes=txt('videochamada', 'impressora', 'calculadora'), certa=0),
            dict(tipo='escolha', fala='Um estudante cego quer ler a página da internet. Qual tecnologia ajuda?', opcoes=txt('leitor de tela', 'mouse colorido', 'tela maior'), certa=0),
            dict(tipo='escolha', fala='Lembrar de tomar o remédio às 8h todos os dias. Qual é a solução mais simples?', opcoes=txt('alarme do celular', 'construir um robô', 'site novo'), certa=0),
            dict(tipo='escolha', fala='Para anotar a lista do mercado de três itens, o que é suficiente?', opcoes=txt('papel e lápis ou nota no celular', 'um programa caro', 'uma impressora 3D'), certa=0),
            dict(tipo='pares', fala='Ligue cada problema à tecnologia adequada.', pares=[[t('achar o caminho'), 'mapa'], [t('guardar fotos com segurança'), 'nuvem-dados'], [t('apresentar a pesquisa'), 'tv'], [t('gravar o podcast'), 'microfone']]),
        ]),
]
