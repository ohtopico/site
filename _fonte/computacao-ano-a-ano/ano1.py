"""1º ano: ano letivo de Computação (BNCC EF01CO01 a EF01CO07), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
As folhas do 1º ano quase não têm leitura: a professora lê a instrução em voz alta.
"""
from folhas import (bloco, lado, caixas_separar, certo_errado, circular, desenho, figs, grade_pintar, legenda, ligar, malha, numerar,
                    p, setas, vagas_setas)

ANO = 1
TITULO = 'Computação no 1º ano'
RESUMO = ('Um ano letivo completo de Computação para o 1º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, mais sete jogos que não pedem leitura.')
APRESENTACAO = [
    'No 1º ano, a Computação começa no corpo, nos objetos da sala e nas rotinas da criança. Antes de qualquer tela, a turma separa, compara, '
    'segue e cria sequências de passos, descobre que informação pode ser guardada e enviada, inventa códigos e conversa sobre as máquinas e sobre segurança.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada (sem computador), uma folha para imprimir e, em algumas, um jogo no computador, '
    'no tablet ou no celular. Os jogos não pedem leitura: funcionam com figuras, sons e uma voz opcional.',
    'As folhas são para a professora ler a instrução em voz alta. A criança responde circulando, ligando, numerando, pintando ou desenhando.',
]
BIMESTRES = [
    ('Organizar e encontrar padrões', 'Separar objetos por cor, forma, tamanho e uso, comparar semelhanças e diferenças e continuar padrões.'),
    ('Passos e algoritmos', 'Seguir, ordenar e criar sequências de passos do dia a dia e dar comandos com setas a um robô.'),
    ('Informação e códigos', 'Reconhecer a informação, guardar e enviar mensagens e representar a mesma informação com códigos diferentes.'),
    ('Tecnologia e segurança', 'Reconhecer as máquinas que ajudam as pessoas e aprender a usar a tecnologia com segurança.'),
]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


AULAS = [
    # =================== 1º bimestre ===================
    aula(n=1, bim=1, titulo='Igual e diferente', habs=['EF01CO01'],
         objetivo='Comparar objetos e dizer o que eles têm de igual e de diferente.',
         material='Uma caixa com objetos da sala (lápis, borrachas, tampinhas, blocos, brinquedos) e a folha do estudante.',
         passos=['Roda de conversa (10 min): mostre dois objetos, por exemplo dois lápis de cores diferentes, e pergunte o que eles têm de igual e o que têm de diferente.',
                 'Jogo do par (15 min): cada criança tira um objeto da caixa e procura um colega com um objeto parecido. A dupla conta para a turma por que os objetos combinam.',
                 'Folha (15 min): leia cada instrução em voz alta e espere todos terminarem antes de passar para a próxima.',
                 'Fechamento (10 min): explique que o computador também compara coisas o tempo todo para organizar fotos, músicas e jogos.'],
         turma='Olhe bem para estes dois lápis. Os dois são lápis, os dois servem para escrever. Mas um é vermelho e o outro é azul. '
               'Quando a gente compara, descobre o que é igual e o que é diferente. O computador também faz isso: ele compara as coisas para deixar tudo organizado.',
         atividade=bloco(1, 'Circule a figura diferente em cada fila.', figs(['maca', 'maca', 'banana', 'maca'], 16) + figs(['gato', 'cachorro', 'gato', 'gato'], 16)
                         + figs(['estrela-f:amarelo', 'estrela-f:amarelo', 'estrela-f:amarelo', 'estrela-f:azul'], 16)) +
                   bloco(2, 'Ligue as figuras iguais.', ligar(['sol', 'bola', 'flor'], ['flor', 'sol', 'bola'])) +
                   bloco(3, 'Desenhe um objeto igual a este, mas de outra cor.', figs(['coracao:vermelho' if False else 'coracao'], 18) + desenho('34mm')),
         gabarito=['Bloco 1: a banana, o cachorro e a estrela azul.', 'Bloco 2: sol com sol, bola com bola, flor com flor.',
                   'Bloco 3: um coração de qualquer cor que não seja vermelha.'],
         adaptar='Para quem precisa de mais apoio, use objetos de verdade em vez da folha e peça que a criança aponte o diferente. Para quem termina antes, peça um terceiro objeto que tenha uma coisa igual e uma diferente.'),
    aula(n=2, bim=1, titulo='Separar pela cor', habs=['EF01CO01'],
         objetivo='Organizar objetos em grupos usando a cor como critério.',
         material='Objetos coloridos (tampinhas, blocos ou papéis), três caixas ou bambolês e a folha do estudante.',
         passos=['Aquecimento (5 min): peça que todos que estão de camiseta azul fiquem de pé, depois os de vermelho. Isso é separar pela cor.',
                 'Em grupos (20 min): cada grupo recebe objetos misturados e três caixas com uma etiqueta de cor. O grupo separa e confere com outro grupo.',
                 'Folha (15 min): leia as instruções e acompanhe.',
                 'Conversa (10 min): onde a gente vê coisas separadas por cor? Na lixeira de reciclagem, no semáforo, nas pastas do computador.'],
         turma='Quando a gente separa as coisas por cor, fica fácil achar o que procura. Na lixeira da reciclagem, o papel vai na azul e o plástico na vermelha. '
               'No computador também existem grupos: as fotos ficam juntas, as músicas ficam juntas. A regra que usamos para separar se chama critério.',
         atividade=bloco(1, 'Pinte as bolinhas de cada caixa com a cor da etiqueta.', caixas_separar([{'cor': 'vermelho'}, {'cor': 'azul'}, {'cor': 'amarelo'}], '30mm', 10)) +
                   bloco(2, 'Ligue cada objeto à bolinha da sua cor.', ligar(['maca', 'banana', 'arvore'], [{'cor': 'amarelo'}, {'cor': 'verde'}, {'cor': 'vermelho'}])) +
                   bloco(3, 'Desenhe na caixa duas coisas que são amarelas.', desenho('38mm')),
         gabarito=['Bloco 1: a criança desenha e pinta bolinhas da cor de cada etiqueta (vermelho, azul, amarelo).', 'Bloco 2: maçã com vermelho, banana com amarelo, árvore com verde.',
                   'Bloco 3: respostas livres, por exemplo sol, banana, estrela, pintinho.'],
         adaptar='Para estudantes com daltonismo, cole uma forma diferente em cada caixa (círculo, quadrado, triângulo) junto com a cor, para que eles também possam separar pela forma.'),
    aula(n=3, bim=1, titulo='Separar pela forma e pelo tamanho', habs=['EF01CO01'],
         objetivo='Usar outros critérios (forma e tamanho) para organizar os mesmos objetos.',
         material='Blocos lógicos ou formas recortadas em papel colorido (círculo, quadrado, triângulo, grande e pequeno) e a folha do estudante.',
         passos=['Retomada (5 min): lembre a aula passada. Pergunte: dá para separar as mesmas peças de outro jeito?',
                 'Desafio das formas (20 min): entregue as peças misturadas. Primeiro a turma separa pela forma. Depois mistura tudo e separa pelo tamanho.',
                 'Folha (15 min).',
                 'Conversa (10 min): o mesmo grupo de peças pode ser organizado de vários jeitos. Quem escolhe a regra é quem organiza.'],
         turma='Estas peças podem ser separadas pela cor. Mas também podem ser separadas pela forma: os círculos de um lado, os quadrados do outro. '
               'E também pelo tamanho: grandes aqui, pequenas ali. As mesmas coisas, organizadas de jeitos diferentes. É você quem escolhe a regra.',
         atividade=bloco(1, 'Circule todos os círculos.', figs(['circulo:vermelho', 'quadrado:azul', 'circulo:amarelo', 'triangulo:verde', 'circulo:azul', 'quadrado:amarelo'], 17)) +
                   bloco(2, 'Faça um X nos triângulos.', figs(['triangulo:azul', 'circulo:verde', 'triangulo:vermelho', 'quadrado:roxo', 'triangulo:amarelo'], 17)) +
                   bloco(3, 'Pinte de verde o maior e de amarelo o menor.', '<div class="aa-tamanhos">' + ''.join(f'<span class="aa-fig" style="--t:{t}mm">{figs(["bola"], t)}</span>' for t in (12, 26, 18)) + '</div>'),
         gabarito=['Bloco 1: os três círculos (vermelho, amarelo e azul).', 'Bloco 2: os três triângulos.', 'Bloco 3: a bola do meio é a maior (verde) e a da esquerda é a menor (amarela).'],
         adaptar='Para quem precisa de apoio motor, use peças grandes de EVA e peça que a criança empurre cada peça até o grupo certo em vez de circular na folha.'),
    aula(n=4, bim=1, titulo='Cada coisa no seu lugar', habs=['EF01CO01'],
         objetivo='Organizar objetos pelo uso e explicar o critério escolhido.',
         material='Figuras recortadas de revistas (comidas, brinquedos, roupas, material escolar), cartolina dividida em quatro e a folha do estudante.',
         passos=['Conversa (10 min): onde guardamos os lápis em casa? E as roupas? E a comida? Cada coisa tem um lugar pelo jeito como usamos.',
                 'Painel coletivo (20 min): a turma cola as figuras na cartolina em quatro grupos: comer, brincar, vestir e estudar.',
                 'Folha (15 min).',
                 'Fechamento (5 min): no celular, os aplicativos também ficam em grupos: jogos com jogos, fotos com fotos.'],
         turma='Em casa, a comida fica na cozinha, a roupa fica no armário e os brinquedos ficam na caixa. Organizar pelo uso ajuda a encontrar tudo rapidinho. '
               'O computador também guarda as coisas em pastas, como gavetas, e cada pasta tem um tipo de coisa.',
         atividade=bloco(1, 'Ligue cada objeto ao lugar onde ele é guardado.', ligar(['camiseta', 'maca', 'lapis', 'bola'], ['mochila', 'presente', 'tenis', 'geladeira'])) +
                   bloco(2, 'Circule o que não é de comer.', figs(['pao', 'banana', 'tenis', 'ovo', 'maca'], 18)) +
                   bloco(3, 'Desenhe três coisas que você guarda na mochila.', desenho('40mm')),
         gabarito=['Bloco 1: camiseta com tênis (vestir, roupas), maçã com geladeira, lápis com mochila, bola com presente (brinquedos). Aceite outras ligações se a criança explicar o critério.',
                   'Bloco 2: o tênis.', 'Bloco 3: respostas livres, como caderno, estojo, lanche.'],
         adaptar='Para estudantes que ainda não fazem o traço de ligar, use as figuras recortadas e peça que colem ao lado do lugar certo.'),
    aula(n=5, bim=1, titulo='Padrões: o que vem depois?', habs=['EF01CO01'],
         objetivo='Reconhecer uma regra que se repete (padrão) e continuar a sequência.',
         material='Palmas, blocos coloridos, a folha do estudante e lápis de cor.',
         passos=['Padrão com o corpo (10 min): bata palma, pé, palma, pé. A turma continua. Depois troque para palma, palma, pé.',
                 'Fila de cores (15 min): monte no chão uma fila de blocos vermelho, azul, vermelho, azul. Pergunte qual vem agora e por quê.',
                 'Folha (15 min).',
                 'Conversa (10 min): onde há padrões? Na calçada, no tecido da roupa, nas músicas, nos dias da semana.'],
         turma='Palma, pé, palma, pé. Você já sabe o que vem agora, não sabe? Quando uma coisa se repete sempre do mesmo jeito, a gente chama de padrão. '
               'Achar padrões ajuda a adivinhar o que vem depois. Os computadores procuram padrões para reconhecer rostos, vozes e letras.',
         atividade=bloco(1, 'Desenhe o que vem depois.', figs(['circulo:vermelho', 'quadrado:azul', 'circulo:vermelho', 'quadrado:azul', None], 17) +
                         figs(['sol', 'lua', 'sol', 'lua', None], 17)) +
                   bloco(2, 'Circule o que completa a fila.', figs(['maca', 'maca', 'banana', 'maca', 'maca', None], 15) + circular(['maca', 'banana', 'pao'], 16)) +
                   bloco(3, 'Pinte as contas do colar seguindo o padrão.', figs(['circulo:amarelo', 'circulo:verde', 'circulo:amarelo', 'circulo:verde', 'circulo:branco', 'circulo:branco', 'circulo:branco'], 14)),
         gabarito=['Bloco 1: um círculo vermelho; um sol.', 'Bloco 2: a banana.', 'Bloco 3: amarelo, verde, amarelo.'],
         jogo='caixas-arrumadas',
         adaptar='Comece com padrões de dois elementos feitos com objetos concretos. Para quem já domina, proponha padrões de três elementos (ABC) ou com duas mudanças ao mesmo tempo (cor e forma).'),
    aula(n=6, bim=1, titulo='Criando padrões', habs=['EF01CO01'],
         objetivo='Criar um padrão próprio e explicar a regra para um colega.',
         material='Massinha ou contas e barbante, carimbos ou lápis de cor e a folha do estudante.',
         passos=['Retomada (5 min): faça um padrão errado no quadro e peça que a turma encontre o erro.',
                 'Colares (20 min): cada criança cria um colar ou uma fila de massinha com um padrão. O colega ao lado tenta continuar.',
                 'Folha (15 min).',
                 'Mostra (10 min): algumas crianças apresentam o padrão e contam a regra.'],
         turma='Agora você vai ser o inventor. Escolha duas ou três coisas e uma ordem que se repete. Depois, um colega tem que descobrir a sua regra. '
               'Se ele conseguir continuar o seu padrão, é porque a regra estava clara.',
         atividade=bloco(1, 'Encontre o erro e faça um X nele.', figs(['estrela-f:amarelo', 'coracao-f:vermelho', 'estrela-f:amarelo', 'coracao-f:vermelho', 'coracao-f:vermelho', 'estrela-f:amarelo'], 16)) +
                   bloco(2, 'Crie o seu padrão. Pinte os quadrados com duas cores que se repetem.', figs(['quadrado:branco'] * 8, 14)) +
                   bloco(3, 'Desenhe um padrão com duas figuras de que você gosta.', desenho('32mm')),
         gabarito=['Bloco 1: o quinto item (coração) está errado, ali deveria vir uma estrela.', 'Bloco 2: qualquer padrão com repetição, por exemplo azul, verde, azul, verde.',
                   'Bloco 3: resposta livre, desde que a regra se repita.'],
         adaptar='Para estudantes com deficiência visual, use contas de texturas diferentes (lisa e rugosa) para montar o padrão pelo tato.'),
    aula(n=7, bim=1, titulo='Jogo: Caixas Arrumadas', habs=['EF01CO01'],
         objetivo='Usar um jogo digital para organizar objetos por critérios e continuar padrões.',
         material='Computadores, tablets ou celulares com o jogo Caixas Arrumadas aberto (pode ser em duplas) e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre o jogo no projetor ou numa tela. Toque na primeira caixa e mostre o que acontece no acerto e no erro.',
                 'Jogo em duplas (25 min): uma criança joga e a outra ajuda, depois trocam. A lâmpada mostra uma dica quando a dupla trava.',
                 'Folha de registro (10 min): cada criança registra quantas estrelas ganhou e a fase de que mais gostou.',
                 'Conversa (5 min): qual regra foi mais difícil, a da cor, da forma ou do uso?'],
         turma='Hoje o computador vai pedir para você organizar. Ele mostra um objeto e você toca na caixa certa. Se acertar, ganha uma estrela. '
               'Se errar, ele balança e você tenta de novo. Errar faz parte de aprender.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 9, 13)) +
                   bloco(2, 'Circule a caixa que foi mais difícil.', circular([{'cor': 'vermelho'}, 'triangulo:branco', 'prato'], 18)) +
                   bloco(3, 'Desenhe como você se sentiu jogando.', circular(['feliz', 'triste', 'bravo'], 16)),
         gabarito=['Bloco 1: depende de cada criança (o jogo tem 9 fases).', 'Blocos 2 e 3: respostas pessoais. Use para conversar sobre os critérios mais difíceis.'],
         jogo='caixas-arrumadas',
         adaptar='O jogo tem painel de acessibilidade com voz, alto contraste e letra maior. Para estudantes cegos, ative a voz e use a versão desplugada com objetos de texturas diferentes.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF01CO01'],
         objetivo='Verificar se a criança organiza objetos por critérios e continua padrões.',
         material='A folha de avaliação, lápis e lápis de cor.',
         passos=['Revisão (15 min): brinque de "Seu mestre mandou" com critérios: quem está de tênis branco, quem tem cabelo comprido, quem está sentado.',
                 'Avaliação (25 min): leia cada questão em voz alta e espere todos responderem.',
                 'Correção coletiva (10 min): corrija no quadro e elogie as estratégias.'],
         turma='Hoje vamos mostrar tudo o que aprendemos: separar coisas, achar o que é igual e o que é diferente e continuar padrões. Faça com calma, uma questão de cada vez.',
         atividade=bloco(1, 'Circule a figura diferente.', figs(['carro', 'carro', 'onibus', 'carro'], 18)) +
                   bloco(2, 'Ligue cada objeto ao grupo certo: comer ou brincar.', ligar(['bola', 'banana', 'videogame'], ['prato', 'presente', 'presente'])) +
                   bloco(3, 'Desenhe o que vem depois.', figs(['triangulo:azul', 'triangulo:azul', 'circulo:vermelho', 'triangulo:azul', 'triangulo:azul', None], 15)) +
                   bloco(4, 'Pinte de vermelho as coisas vermelhas e de amarelo as amarelas.', figs(['~maca', '~banana', '~sol', '~coracao'], 18)),
         gabarito=['Bloco 1: o ônibus.', 'Bloco 2: bola e videogame com o presente; banana com o prato.', 'Bloco 3: um círculo vermelho.',
                   'Bloco 4: maçã e coração de vermelho; banana e sol de amarelo.',
                   'Critério: domina se acerta 3 ou 4 blocos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique oralmente para quem precisa, com objetos de verdade. Registre a resposta da criança no lugar dela.'),

    # =================== 2º bimestre ===================
    aula(n=9, bim=2, titulo='Os passos do dia a dia', habs=['EF01CO02'],
         objetivo='Reconhecer que as tarefas do dia a dia são feitas em passos, um depois do outro.',
         material='Figuras de uma rotina (acordar, escovar os dentes, tomar café, ir para a escola) e a folha do estudante.',
         passos=['Conversa (10 min): o que você faz quando acorda? Anote os passos que as crianças dizem no quadro, com desenhos.',
                 'Teatro (15 min): uma criança faz os passos de escovar os dentes em mímica e a turma diz o nome de cada passo.',
                 'Folha (15 min).',
                 'Fechamento (10 min): uma lista de passos para resolver um problema tem um nome especial. Na próxima aula vamos conhecer.'],
         turma='Para escovar os dentes, a gente pega a escova, coloca a pasta, escova e depois enxágua a boca. Cada coisa é um passo. '
               'Quase tudo o que fazemos tem passos: tomar banho, fazer um sanduíche, ir para a escola.',
         atividade=bloco(1, 'Numere de 1 a 3 os passos para escovar os dentes.', numerar(['escova', 'pasta', 'copo'], 22)) +
                   bloco(2, 'Circule o que acontece primeiro.', circular(['ovo-frito', 'ovo', 'frigideira'], 20)) +
                   bloco(3, 'Desenhe o que você faz quando chega da escola.', desenho('40mm')),
         gabarito=['Bloco 1: pasta 1, escova 2, copo 3 (também vale escova 1 e pasta 2, se a criança explicar que pega a escova antes).',
                   'Bloco 2: o ovo.', 'Bloco 3: resposta livre.'],
         jogo='passo-a-passo',
         adaptar='Use fotos da própria rotina da criança. Para estudantes com TEA, a rotina em figuras também ajuda a prever o dia na escola.'),
    aula(n=10, bim=2, titulo='Primeiro, depois, por último', habs=['EF01CO02'],
         objetivo='Usar as palavras primeiro, depois e por último para descrever uma sequência.',
         material='Três cartões grandes com as palavras PRIMEIRO, DEPOIS e POR ÚLTIMO, figuras de histórias curtas e a folha do estudante.',
         passos=['Retomada (5 min): conte a rotina da manhã usando primeiro, depois e por último.',
                 'Fila humana (20 min): três crianças seguram figuras de uma história (semente, broto, flor). A turma organiza a fila e diz primeiro, depois, por último.',
                 'Folha (15 min).',
                 'Conversa (10 min): o que acontece se a gente trocar a ordem? Dá para enxaguar a boca antes de escovar?'],
         turma='Primeiro a gente planta a semente. Depois nasce um broto. Por último aparece a flor. Se mudar a ordem, a história não faz sentido. '
               'Em muitas tarefas, a ordem dos passos é muito importante.',
         atividade=bloco(1, 'Numere 1, 2 e 3: primeiro, depois, por último.', numerar(['flor', 'semente', 'broto'], 22)) +
                   bloco(2, 'Numere a história do bolo.', numerar(['bolo', 'ovo', 'forno'], 22)) +
                   bloco(3, 'O que vem por último? Desenhe.', figs(['despertador', 'pao', None], 22)),
         gabarito=['Bloco 1: semente 1, broto 2, flor 3.', 'Bloco 2: ovo 1, forno 2, bolo 3.', 'Bloco 3: algo que vem depois do café, como a mochila ou a escola.'],
         adaptar='Para quem não escreve números ainda, entregue adesivos de 1, 2 e 3 bolinhas para colar.'),
    aula(n=11, bim=2, titulo='O robô humano', habs=['EF01CO02'],
         objetivo='Seguir instruções exatamente como elas foram dadas.',
         material='Fita crepe para marcar um quadriculado no chão (4 por 4), cartões com setas e a folha do estudante.',
         passos=['Prepare o chão (antes da aula): marque um quadriculado com fita crepe e coloque um brinquedo numa das casas.',
                 'Brincadeira (25 min): uma criança é o robô e só anda quando recebe uma seta. A turma mostra os cartões de seta, um de cada vez, até o robô chegar ao brinquedo.',
                 'Folha (15 min).',
                 'Conversa (10 min): o robô pode andar para onde quiser? Não, ele só faz o que a instrução manda. O computador também.'],
         turma='Um robô não pensa sozinho. Ele faz exatamente o que a gente manda. Se a gente mostrar a seta para a direita, ele anda um passo para a direita. '
               'Se a instrução estiver errada, ele vai para o lugar errado. Por isso as instruções precisam ser bem claras.',
         atividade=bloco(1, 'Siga as setas com o dedo e faça um X onde o robô para.', setas(['d', 'd', 'b']) + malha(4, 3, [0, 0], cel=17)) +
                   bloco(2, 'Siga as setas e circule o que o robô pega.', setas(['b', 'b', 'd']) + malha(3, 3, [0, 0], alvos=[[1, 2]], alvo='maca', cel=17)),
         gabarito=['Bloco 1: o robô para na segunda linha, terceira coluna (duas casas para a direita e uma para baixo).', 'Bloco 2: a maçã, na última linha, coluna do meio.'],
         jogo='passo-a-passo',
         adaptar='Para estudantes cegos, use o quadriculado do chão com relevo (fita com barbante colado) e diga as setas em voz alta: direita, esquerda, frente.'),
    aula(n=12, bim=2, titulo='Jogo: Passo a Passo', habs=['EF01CO02'],
         objetivo='Seguir sequências de passos num jogo digital.',
         material='Dispositivos com o jogo Passo a Passo e a folha do estudante.',
         passos=['Apresentação (10 min): jogue a primeira fase com a turma no projetor.',
                 'Jogo em duplas (25 min).',
                 'Folha (10 min).',
                 'Conversa (5 min): em qual fase você precisou pensar mais?'],
         turma='No jogo de hoje você vai pôr histórias em ordem e ajudar um gato a chegar até o peixe. Toque nas figuras na ordem certa. '
               'Nas fases das setas, siga as setas com o dedo antes de responder.',
         atividade=bloco(1, 'Numere a história da planta.', numerar(['broto', 'flor', 'semente'], 20)) +
                   bloco(2, 'Siga as setas e circule onde o gato para.', setas(['d', 'b', 'd']) + malha(3, 3, [0, 0], pers='gato', cel=16)) +
                   bloco(3, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)),
         gabarito=['Bloco 1: semente 1, broto 2, flor 3.', 'Bloco 2: o gato para na segunda linha, última coluna.', 'Bloco 3: depende de cada criança (8 fases).'],
         jogo='passo-a-passo',
         adaptar='Ative a voz no painel de acessibilidade do jogo. Quem tem dificuldade motora pode jogar com o teclado (Tab e Enter).'),
    aula(n=13, bim=2, titulo='Passos fora de ordem', habs=['EF01CO03'],
         objetivo='Reorganizar uma sequência de passos que está fora de ordem.',
         material='Tirinhas de histórias recortadas e embaralhadas (uma por grupo) e a folha do estudante.',
         passos=['Problema (10 min): leia uma receita com os passos trocados ("asse o bolo, quebre os ovos, coma o bolo"). Pergunte o que deu errado.',
                 'Grupos (20 min): cada grupo recebe uma tirinha embaralhada e cola na ordem certa numa folha.',
                 'Folha (15 min).',
                 'Conversa (5 min): como vocês descobriram qual era o primeiro passo?'],
         turma='Imagine colocar o bolo no forno antes de misturar os ingredientes. Não ia dar certo! Quando os passos estão fora de ordem, a tarefa não funciona. '
               'Hoje vamos consertar passos bagunçados.',
         atividade=bloco(1, 'Numere os passos para lavar as mãos.', numerar(['toalha', 'torneira', 'sabonete', 'mao'], 19)) +
                   bloco(2, 'Numere os passos para regar a planta.', numerar(['broto', 'regador', 'semente', 'flor'], 19)) +
                   bloco(3, 'Circule o passo que está no lugar errado.', figs(['camiseta', 'escola', 'mochila'], 20)),
         gabarito=['Bloco 1: torneira 1, sabonete 2, mão 3 (esfregar), toalha 4.', 'Bloco 2: semente 1, regador 2, broto 3, flor 4.',
                   'Bloco 3: a escola está no lugar errado: a mochila vem antes de chegar à escola.'],
         jogo='robo-ajudante',
         adaptar='Comece com três passos para quem precisa de mais apoio e use quatro ou cinco para quem termina rápido.'),
    aula(n=14, bim=2, titulo='Algoritmo: a receita do computador', habs=['EF01CO03'],
         objetivo='Relacionar uma sequência de passos à palavra algoritmo.',
         material='Uma receita simples ilustrada (por exemplo, sanduíche), pão, recheio e a folha do estudante.',
         passos=['Receita ao vivo (15 min): monte um sanduíche seguindo o que as crianças mandam, fazendo exatamente o que dizem (se disserem "põe o queijo", ponha em cima do pacote fechado). Rindo, a turma percebe que precisa ser precisa.',
                 'A palavra nova (10 min): escreva ALGORITMO no quadro. Explique que é uma sequência de passos para resolver um problema.',
                 'Folha (15 min).',
                 'Fechamento (10 min): os jogos, os aplicativos e os robôs funcionam porque alguém escreveu algoritmos para eles.'],
         turma='Hoje você vai aprender uma palavra de gente grande: algoritmo. Algoritmo é uma sequência de passos para resolver um problema. '
               'A receita de um bolo é um algoritmo. O caminho de casa até a escola é um algoritmo. O computador só funciona porque segue algoritmos.',
         atividade=bloco(1, 'Este é o algoritmo do sanduíche. Numere os passos.', numerar(['pao', 'colher', 'prato'], 20)) +
                   bloco(2, 'Circule o que é um algoritmo.', circular(['carta-papel', 'bola', 'flor'], 18)) +
                   bloco(3, 'Desenhe os passos do seu algoritmo para ir dormir.', '<div class="aa-quadrinhos">' + desenho('30mm', '1') + desenho('30mm', '2') + desenho('30mm', '3') + '</div>'),
         gabarito=['Bloco 1: pão 1, colher (passar o recheio) 2, prato (servir) 3.', 'Bloco 2: a folha com passos escritos (uma receita).',
                   'Bloco 3: resposta livre em três passos, por exemplo vestir o pijama, escovar os dentes, deitar.'],
         jogo='robo-ajudante',
         adaptar='Para quem ainda não desenha com detalhe, ofereça figuras recortadas da rotina para colar nos quadrinhos.'),
    aula(n=15, bim=2, titulo='Criando algoritmos com setas', habs=['EF01CO03'],
         objetivo='Criar uma sequência de setas para levar um robô até um objetivo.',
         material='Quadriculado no chão, cartões de seta, dispositivos com o jogo Robô Ajudante e a folha do estudante.',
         passos=['Desplugado (15 min): agora a turma escreve o algoritmo antes: em grupo, colam as setas numa tira e só depois o robô humano anda.',
                 'Jogo (20 min): no Robô Ajudante, a dupla monta a fila de setas e aperta o botão verde.',
                 'Folha (10 min).',
                 'Conversa (5 min): o que vocês fizeram quando o robô bateu na árvore? Isso se chama corrigir o algoritmo.'],
         turma='Agora você é a programadora ou o programador. Monte o caminho do robô com setas antes de ele andar. Depois aperte o botão verde e veja se deu certo. '
               'Se não deu, não tem problema: troque uma seta e tente de novo.',
         atividade=bloco(1, 'Desenhe as setas para o robô pegar a estrela.', malha(4, 2, [0, 0], alvos=[[3, 0]], cel=16) + vagas_setas(3)) +
                   bloco(2, 'Desenhe as setas para o robô pegar a maçã sem bater na árvore.', malha(3, 3, [0, 0], alvos=[[2, 2]], paredes=[[1, 0], [1, 1]], alvo='maca', cel=16) + vagas_setas(4)),
         gabarito=['Bloco 1: → → →.', 'Bloco 2: ↓ ↓ → → (descer duas casas e andar duas para a direita).'],
         jogo='robo-ajudante',
         adaptar='Ofereça setas recortadas para colar nas vagas, no lugar de desenhar.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF01CO02', 'EF01CO03'],
         objetivo='Verificar se a criança segue, ordena e cria sequências de passos.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): brincadeira do robô humano com a turma inteira dando os comandos.',
                 'Avaliação (25 min): leia cada questão em voz alta.',
                 'Correção coletiva (10 min).'],
         turma='Hoje você vai mostrar que sabe seguir passos, arrumar passos fora de ordem e criar um algoritmo com setas.',
         atividade=bloco(1, 'Numere os passos para tomar banho.', numerar(['toalha', 'torneira', 'sabonete'], 20)) +
                   bloco(2, 'Siga as setas e faça um X onde o gato para.', setas(['b', 'd', 'd']) + malha(3, 2, [0, 0], pers='gato', cel=16)) +
                   bloco(3, 'Desenhe as setas para o robô pegar a estrela.', malha(3, 2, [0, 1], alvos=[[2, 0]], cel=16) + vagas_setas(3)) +
                   bloco(4, 'Circule o algoritmo certo para plantar.', '<div class="aa-ops-fila">' + figs(['semente', 'regador', 'flor'], 13) + figs(['flor', 'semente', 'regador'], 13) + '</div>'),
         gabarito=['Bloco 1: torneira 1, sabonete 2, toalha 3.', 'Bloco 2: o gato para na segunda linha, última coluna.', 'Bloco 3: ↑ → → (ou → → ↑).',
                   'Bloco 4: a primeira fila (semente, regador, flor).', 'Critério: domina com 3 ou 4 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Faça a avaliação no chão, com o quadriculado e os cartões de seta, para quem ainda não consegue no papel.'),

    # =================== 3º bimestre ===================
    aula(n=17, bim=3, titulo='O que é informação?', habs=['EF01CO04'],
         objetivo='Reconhecer que informação é tudo aquilo que nos conta alguma coisa.',
         material='Objetos que dão informação: relógio, calendário, semáforo de papel, termômetro, foto de família, e a folha do estudante.',
         passos=['Caixa misteriosa (15 min): tire um objeto de cada vez e pergunte o que ele conta para a gente. O relógio conta a hora, o semáforo conta se pode passar.',
                 'Caça à informação (10 min): a turma procura na sala coisas que dão informação (cartazes, chamada, calendário).',
                 'Folha (15 min).',
                 'Fechamento (10 min): o computador guarda e mostra muitas informações: fotos, músicas, mensagens.'],
         turma='O relógio conta a hora. O semáforo conta se pode atravessar. A nuvem escura conta que vai chover. Tudo isso é informação: '
               'alguma coisa que nos conta algo. A gente recebe informação o tempo todo, pelos olhos, pelos ouvidos e pelas telas.',
         atividade=bloco(1, 'Ligue cada objeto à informação que ele dá.', ligar(['relogio', 'semaforo', 'chuva'], ['guarda-chuva', 'despertador', 'carro'])) +
                   bloco(2, 'Circule o que dá informação.', circular(['calculadora', 'pedra' if False else 'bola', 'mapa', 'tv'], 16)) +
                   bloco(3, 'Desenhe uma informação sobre você (sua cor favorita, seu bicho favorito).', desenho('38mm')),
         gabarito=['Bloco 1: relógio com despertador (hora de acordar), semáforo com carro (pode passar ou não), nuvem de chuva com guarda-chuva (vai chover).',
                   'Bloco 2: calculadora, mapa e televisão dão informação; a bola não.', 'Bloco 3: resposta livre.'],
         adaptar='Para estudantes surdos, use o semáforo e o relógio como exemplos visuais e combine sinais de Libras para INFORMAÇÃO e MENSAGEM com o intérprete.'),
    aula(n=18, bim=3, titulo='Onde guardamos as informações', habs=['EF01CO04'],
         objetivo='Perceber que a informação pode ser guardada em lugares diferentes: memória, papel, foto e celular.',
         material='Um bilhete, uma foto impressa, um celular ou tablet (só para mostrar) e a folha do estudante.',
         passos=['Jogo da memória (10 min): mostre cinco objetos por um tempinho e esconda. Quem lembra? A informação ficou guardada na cabeça.',
                 'Lugares de guardar (15 min): mostre o bilhete, a foto e o celular. Todos guardam informação. Qual guarda mais? Qual dura mais?',
                 'Folha (15 min).',
                 'Conversa (10 min): o celular e o computador guardam informação na memória deles, como a nossa cabeça, mas não esquecem.'],
         turma='A gente guarda informação na cabeça, na memória. Mas às vezes esquece. Por isso também guardamos no papel, numa foto ou no celular. '
               'O computador tem uma memória que guarda fotos, músicas e mensagens por muito tempo.',
         atividade=bloco(1, 'Circule os lugares onde dá para guardar uma foto.', circular(['celular', 'banana', 'computador', 'bola', 'pendrive'], 15)) +
                   bloco(2, 'Olhe estas figuras por um tempinho. A professora vai cobrir. Depois desenhe as que você lembra.', figs(['sol', 'peixe', 'casa'], 18) + desenho('30mm')),
         gabarito=['Bloco 1: celular, computador e pendrive.', 'Bloco 2: sol, peixe e casa (as figuras lembradas, em qualquer ordem).'],
         jogo='carteiro-mensagens',
         adaptar='No bloco 2, cubra as figuras com um papel depois de 10 segundos. Para estudantes com TDAH, diga antes quantas figuras são para ajudar a atenção.'),
    aula(n=19, bim=3, titulo='Mandando mensagens', habs=['EF01CO04'],
         objetivo='Reconhecer que a informação pode ser enviada como mensagem por meios diferentes.',
         material='Papel para bilhetes, um telefone de lata (dois copos e barbante) e dispositivos com o jogo Carteiro das Mensagens.',
         passos=['Telefone sem fio (10 min): uma mensagem passa de criança em criança. Ela chega igual? O que muda?',
                 'Meios de enviar (10 min): bilhete, carta, telefone de lata, mensagem no celular. Todos levam informação de um lugar para outro.',
                 'Jogo (20 min): Carteiro das Mensagens, em duplas.',
                 'Folha (10 min).'],
         turma='Quando você conta uma novidade para a sua avó, você manda uma mensagem. Pode ser falando, escrevendo um bilhete, mandando uma carta ou pelo celular. '
               'A mensagem leva a informação de uma pessoa para outra.',
         atividade=bloco(1, 'Circule as coisas que levam mensagens.', circular(['envelope', 'celular', 'arvore', 'telefone', 'bola'], 15)) +
                   bloco(2, 'Desenhe uma mensagem para um colega, sem usar letras.', desenho('44mm')),
         gabarito=['Bloco 1: envelope, celular e telefone.', 'Bloco 2: resposta livre. Peça que o colega diga o que entendeu da mensagem.'],
         jogo='carteiro-mensagens',
         adaptar='Para estudantes surdos, o telefone sem fio pode ser feito com sinais ou desenhos passados de mão em mão.'),
    aula(n=20, bim=3, titulo='A mesma informação de jeitos diferentes', habs=['EF01CO04', 'EF01CO05'],
         objetivo='Perceber que a mesma informação pode ser contada com desenhos, números, gestos ou palavras.',
         material='Cartões de quantidade (pontinhos, dedos, desenhos), a folha do estudante.',
         passos=['Três de jeitos diferentes (10 min): mostre 3 com os dedos, 3 bolinhas desenhadas, o número 3 e a palavra TRÊS. É tudo a mesma informação.',
                 'Sinais da turma (15 min): combinem gestos para sim, não, silêncio e banheiro. É uma linguagem!',
                 'Folha (15 min).',
                 'Conversa (10 min): o computador também escreve a informação de outro jeito, com números, para conseguir guardar.'],
         turma='Três maçãs, três bolinhas, três dedos levantados. A quantidade é a mesma, só muda o jeito de mostrar. '
               'Uma informação pode ser contada com desenhos, gestos, números ou palavras. Cada jeito é uma linguagem.',
         atividade=bloco(1, 'Ligue as figuras que contam a mesma quantidade.', ligar([{'txt': '●●'}, {'txt': '●●●'}, {'txt': '●'}], [{'txt': '3'}, {'txt': '1'}, {'txt': '2'}])) +
                   bloco(2, 'Ligue cada bicho à sua sombra.', ligar(['gato', 'peixe', 'passaro'], ['passaro', 'gato', 'peixe'])) +
                   bloco(3, 'Desenhe o sinal combinado pela turma para "silêncio".', desenho('30mm')),
         gabarito=['Bloco 1: duas bolinhas com 2, três bolinhas com 3, uma bolinha com 1.', 'Bloco 2: cada bicho com a sombra dele (na folha, a sombra é o contorno escuro).',
                   'Bloco 3: o sinal combinado (por exemplo, o dedo na frente da boca).'],
         adaptar='Use a Libras como exemplo de outra linguagem: a turma aprende o sinal de alguns números e cores com o glossário em Libras do site.'),
    aula(n=21, bim=3, titulo='Códigos secretos com cores', habs=['EF01CO05'],
         objetivo='Representar informação usando um código de cores combinado.',
         material='Cartões coloridos, uma legenda grande no quadro (por exemplo, sol = amarelo, peixe = azul, gato = vermelho) e a folha do estudante.',
         passos=['O código (10 min): mostre a legenda. Mostre uma fila de cartões coloridos e decifrem juntos a mensagem.',
                 'Agentes secretos (20 min): em duplas, uma criança monta uma mensagem com cartões coloridos e a outra decifra usando a legenda.',
                 'Folha (15 min).',
                 'Conversa (5 min): por que o código só funciona se os dois conhecem a legenda?'],
         turma='Um código é um combinado. Se a gente combinar que amarelo quer dizer sol, quem conhece o combinado entende a mensagem só olhando a cor. '
               'O computador também usa códigos para guardar as coisas: tudo vira código dentro dele.',
         atividade=bloco(1, 'Use o código e desenhe a mensagem.', legenda([('sol', 'amarelo'), ('peixe', 'azul'), ('gato', 'vermelho')]) +
                         figs([{'cor': 'azul'}, {'cor': 'amarelo'}, {'cor': 'vermelho'}], 13) + figs([None, None, None], 18)) +
                   bloco(2, 'Agora ao contrário: pinte as bolinhas com o código.', figs(['gato', 'gato', 'sol'], 15) + figs(['circulo:branco'] * 3, 13)),
         gabarito=['Bloco 1: peixe, sol, gato.', 'Bloco 2: vermelho, vermelho, amarelo.'],
         jogo='codigo-cores',
         adaptar='Para estudantes com daltonismo, troque as cores por formas (círculo, quadrado, triângulo). O código continua funcionando.'),
    aula(n=22, bim=3, titulo='Pintando pelo código', habs=['EF01CO05'],
         objetivo='Seguir um código para formar uma imagem, como o computador faz com os pontinhos da tela.',
         material='A folha do estudante, lápis de cor e dispositivos com o jogo Código das Cores.',
         passos=['A tela de perto (10 min): mostre uma imagem muito ampliada no computador até aparecerem os quadradinhos. A imagem é feita de quadradinhos coloridos.',
                 'Folha (20 min): pintar pelo código.',
                 'Jogo (15 min): Código das Cores.',
                 'Conversa (5 min): o que apareceu no desenho? Como o computador sabe a cor de cada quadradinho?'],
         turma='As imagens da tela são feitas de quadradinhos bem pequenos. Cada quadradinho tem uma cor. O computador guarda um código que diz a cor de cada um. '
               'Hoje você vai fazer igual: seguir o código e descobrir o desenho.',
         atividade=bloco(1, 'Pinte cada quadradinho com a cor da forma.', legenda([('circulo', 'azul'), ('triangulo', 'vermelho'), ('quadrado', 'amarelo')]) +
                         grade_pintar(['CCTCC', 'CTTTC', 'TTTTT', 'QQQQQ', 'QQQQQ'], {'C': 'circulo', 'T': 'triangulo', 'Q': 'quadrado'}, 13)),
         gabarito=['Bloco 1: aparece uma casa: telhado vermelho em triângulo, parede amarela e céu azul.'],
         jogo='codigo-cores',
         adaptar='Para estudantes cegos, faça a grade com texturas coladas (lixa, algodão, EVA) no lugar das formas e peça que a criança diga o desenho que sentiu.'),
    aula(n=23, bim=3, titulo='O código da turma', habs=['EF01CO05'],
         objetivo='Criar um código próprio e usá-lo para registrar uma informação.',
         material='Cartolina, lápis de cor e a folha do estudante.',
         passos=['Votação (15 min): registre a fruta preferida de cada criança com um código (maçã = vermelho, banana = amarelo, uva = roxo). Cada criança pinta um quadradinho.',
                 'Leitura do código (10 min): qual cor tem mais quadradinhos? Qual a fruta preferida da turma?',
                 'Folha (15 min).',
                 'Fechamento (10 min): a turma guardou informação usando um código, como o computador.'],
         turma='Hoje a turma vai criar o próprio código. Cada fruta ganha uma cor. Cada criança pinta a cor da sua fruta preferida. '
               'No fim, olhando só as cores, a gente vai saber qual fruta a turma mais gosta.',
         atividade=bloco(1, 'Crie o seu código: pinte uma cor para cada figura.', '<div class="aa-legenda">' + ''.join(
             f'<span>{f}<b>=</b><i class="aa-cor" data-cor="branco"></i></span>' for f in (figs(['bola'], 12), figs(['flor'], 12), figs(['estrela'], 12))) + '</div>') +
                   bloco(2, 'Escreva uma mensagem com o seu código: pinte as bolinhas.', figs(['flor', 'bola', 'estrela', 'flor'], 13) + figs(['circulo:branco'] * 4, 12)) +
                   bloco(3, 'Troque a folha com um colega. Ele consegue decifrar?', circular(['certo', 'errado'], 14)),
         gabarito=['Blocos 1 e 2: as cores escolhidas pela criança. A mensagem precisa usar a mesma cor para as duas flores.', 'Bloco 3: resposta pessoal.'],
         adaptar='Ofereça um código pronto para quem tem dificuldade de escolher e um código com quatro figuras para quem quer mais desafio.'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF01CO04', 'EF01CO05'],
         objetivo='Verificar se a criança reconhece, guarda e codifica informações.',
         material='A folha de avaliação, lápis e lápis de cor.',
         passos=['Revisão (15 min): agentes secretos com cartões coloridos.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje você vai mostrar que sabe o que é informação, onde ela pode ser guardada, como mandar uma mensagem e como usar um código.',
         atividade=bloco(1, 'Circule onde dá para guardar uma mensagem.', circular(['celular', 'flor', 'carta-papel', 'bola'], 15)) +
                   bloco(2, 'Ligue a informação ao objeto que mostra.', ligar(['relogio', 'semaforo'], ['carro', 'despertador'])) +
                   bloco(3, 'Use o código e pinte as bolinhas.', legenda([('maca', 'vermelho'), ('banana', 'amarelo')]) + figs(['banana', 'maca', 'banana'], 13) + figs(['circulo:branco'] * 3, 12)) +
                   bloco(4, 'Pinte pelo código.', legenda([('circulo', 'verde'), ('quadrado', 'marrom')]) + grade_pintar(['CCC', 'CCC', ' Q '], {'C': 'circulo', 'Q': 'quadrado'}, 12)),
         gabarito=['Bloco 1: celular e folha escrita.', 'Bloco 2: relógio com despertador, semáforo com carro.', 'Bloco 3: amarelo, vermelho, amarelo.',
                   'Bloco 4: uma árvore (copa verde, tronco marrom).', 'Critério: domina com 3 ou 4 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Leia cada questão e aceite respostas orais ou apontadas.'),

    # =================== 4º bimestre ===================
    aula(n=25, bim=4, titulo='Máquinas que ajudam as pessoas', habs=['EF01CO06'],
         objetivo='Reconhecer máquinas e tecnologias que resolvem necessidades do dia a dia.',
         material='Figuras ou objetos (despertador, calculadora, controle remoto, semáforo de brinquedo) e a folha do estudante.',
         passos=['Como seria sem? (10 min): como você acordaria sem despertador? Como atravessar a rua sem semáforo?',
                 'Caça às máquinas (15 min): passeio pela escola procurando máquinas (impressora, interfone, campainha, computador). Cada uma ajuda em quê?',
                 'Folha (15 min).',
                 'Conversa (10 min): as pessoas inventam máquinas para resolver problemas.'],
         turma='O despertador ajuda a acordar na hora. A máquina de lavar ajuda a limpar a roupa. O semáforo ajuda os carros e as pessoas a não se baterem. '
               'As pessoas inventam máquinas para resolver problemas e deixar a vida mais fácil.',
         atividade=bloco(1, 'Ligue cada problema à máquina que ajuda.', ligar(['roupa-suja', 'carro', 'prato'], ['micro-ondas', 'maquina-lavar', 'semaforo'])) +
                   bloco(2, 'Desenhe uma máquina que existe na sua casa.', desenho('40mm')),
         gabarito=['Bloco 1: roupa suja com máquina de lavar, carro com semáforo, prato com micro-ondas.', 'Bloco 2: resposta livre. Peça que a criança diga para que serve.'],
         jogo='maquinas-ajudam',
         adaptar='Para estudantes com deficiência visual, leve objetos reais (despertador, controle remoto) para explorar pelo tato e pelo som.'),
    aula(n=26, bim=4, titulo='Tem um computador aqui dentro?', habs=['EF01CO06'],
         objetivo='Perceber que muitos objetos têm um pequeno computador dentro (artefatos computacionais).',
         material='Uma calculadora, um brinquedo eletrônico, um celular velho, uma bola e um livro; a folha do estudante.',
         passos=['Separando (15 min): mostre os objetos. Quais funcionam com bateria ou tomada e seguem instruções? Separe em dois grupos.',
                 'Explicação (10 min): os que seguem instruções têm um pequeno computador dentro, um chip.',
                 'Folha (15 min).',
                 'Conversa (10 min): onde mais há computadores escondidos? No micro-ondas, na máquina de lavar, no carro, no semáforo.'],
         turma='O computador não é só aquele com tela e teclado. Muitas coisas têm um computador pequenininho dentro: o celular, a calculadora, o micro-ondas, '
               'até alguns brinquedos. Eles seguem instruções, como os algoritmos que você aprendeu.',
         atividade=bloco(1, 'Circule as coisas que têm um computador dentro.', circular(['celular', 'livro', 'calculadora', 'bola', 'micro-ondas', 'flor'], 15)) +
                   bloco(2, 'Separe: desenhe um objeto em cada caixa.', caixas_separar(['chip', '!chip'], '34mm', 14)),
         gabarito=['Bloco 1: celular, calculadora e micro-ondas.', 'Bloco 2: na caixa do chip, algo como tablet ou videogame; na caixa riscada, algo como lápis ou bola.'],
         jogo='maquinas-ajudam',
         adaptar='Use objetos de verdade e deixe a criança ligar e desligar para perceber que eles respondem a comandos.'),
    aula(n=27, bim=4, titulo='Tecnologia para mim e para todos', habs=['EF01CO06'],
         objetivo='Diferenciar tecnologias de uso pessoal e de uso coletivo e explorar um jogo sobre elas.',
         material='Dispositivos com o jogo Máquinas que Ajudam e a folha do estudante.',
         passos=['Conversa (10 min): o seu fone é seu. O semáforo é de todo mundo. Que outras tecnologias são de todos? (Ônibus, elevador, computador da escola.)',
                 'Jogo (20 min): Máquinas que Ajudam, em duplas.',
                 'Folha (15 min).',
                 'Fechamento (5 min): o que é de todos precisa ser bem cuidado por todos.'],
         turma='Algumas tecnologias são só de uma pessoa, como o fone de ouvido. Outras ajudam muita gente ao mesmo tempo, como o semáforo, '
               'o ônibus e o computador da escola. O que é de todos precisa de cuidado de todos.',
         atividade=bloco(1, 'Ligue: é de uma pessoa ou de todo mundo?', ligar(['fone', 'semaforo', 'escova'], ['amigos', 'crianca', 'crianca'])) +
                   bloco(2, 'Desenhe uma máquina que você queria inventar para ajudar a escola.', desenho('44mm')),
         gabarito=['Bloco 1: fone com uma criança, semáforo com todo mundo (amigos), escova com uma criança.', 'Bloco 2: resposta livre.'],
         jogo='maquinas-ajudam',
         adaptar='No bloco 2, aceite a explicação oral da invenção e registre por escrito para a criança.'),
    aula(n=28, bim=4, titulo='Meus dados são meus', habs=['EF01CO07'],
         objetivo='Reconhecer quais informações são pessoais e não devem ser contadas a desconhecidos.',
         material='Cartões com figuras (casa, escola, foto, nome, bicho de estimação, cor favorita) e a folha do estudante.',
         passos=['Pode contar? (15 min): mostre um cartão de cada vez. Pode contar para qualquer pessoa? A cor favorita pode. O endereço da casa, não.',
                 'Explicação (10 min): dados pessoais são informações sobre a gente. Na internet, não contamos para quem não conhecemos.',
                 'Folha (15 min).',
                 'Combinado (10 min): quando alguém pedir um dado pessoal, a gente chama um adulto de confiança.'],
         turma='Seu nome completo, onde você mora, sua escola e suas fotos são dados pessoais. São informações sobre você. '
               'Na internet e no celular, a gente não conta isso para quem não conhece. Se alguém pedir, chame um adulto de confiança.',
         atividade=bloco(1, 'Circule de verde o que pode contar e faça um X vermelho no que não pode contar a desconhecidos.', circular(['casa', 'foto', 'estrela', 'escola', 'flor'], 15)) +
                   bloco(2, 'Desenhe um adulto de confiança para quem você pode pedir ajuda.', desenho('40mm')),
         gabarito=['Bloco 1: pode contar: estrela (coisa de que gosta) e flor. Não contar a desconhecidos: casa (endereço), foto e escola.', 'Bloco 2: resposta pessoal (pai, mãe, avó, professora).'],
         jogo='seguro-na-rede',
         adaptar='Use cartões grandes com figuras e respostas com placas verde e vermelha para quem não faz o traço.'),
    aula(n=29, bim=4, titulo='Senha é segredo', habs=['EF01CO07'],
         objetivo='Entender para que serve a senha e por que ela é segredo.',
         material='Um cofrinho ou caixa com cadeado de brinquedo, a folha do estudante.',
         passos=['A caixa trancada (10 min): mostre a caixa com cadeado. Só abre quem tem a chave. A senha é a chave do celular e do tablet.',
                 'Senha de gestos (15 min): a turma inventa uma senha de três gestos para abrir a porta da sala na brincadeira. Quem não sabe a senha não entra.',
                 'Folha (15 min).',
                 'Combinado (10 min): senha só a gente e a família sabem. Nem para o melhor amigo.'],
         turma='A senha é como a chave de um cadeado. Ela protege o celular, o tablet e os jogos para que só você e sua família possam abrir. '
               'Por isso a senha é segredo: não contamos nem para o melhor amigo.',
         atividade=bloco(1, 'Certo ou errado? Circule a carinha.', certo_errado([['senha', 'amigos'], ['cadeado', 'celular'], ['senha', 'familia']], 14)) +
                   bloco(2, 'Invente uma senha com três figuras. Desenhe e não mostre para ninguém.', figs([None, None, None], 20)),
         gabarito=['Bloco 1: contar a senha aos amigos: errado. Celular com senha (cadeado): certo. A família saber a senha: certo.', 'Bloco 2: resposta pessoal. Dobre a folha para guardar o segredo.'],
         jogo='seguro-na-rede',
         adaptar='Para estudantes cegos, a senha pode ser de sons (palma, estalo, batida na mesa).'),
    aula(n=30, bim=4, titulo='Quando pedir ajuda', habs=['EF01CO07'],
         objetivo='Saber o que fazer quando algo na internet incomoda, assusta ou parece perigoso.',
         material='Dispositivos com o jogo Seguro na Rede e a folha do estudante.',
         passos=['Histórias (10 min): conte situações curtas (alguém desconhecido pede foto; aparece uma imagem assustadora; um jogo pede para comprar). O que fazer?',
                 'Jogo (20 min): Seguro na Rede, em duplas.',
                 'Folha (15 min).',
                 'Combinado final (5 min): se algo incomoda, a gente para, sai e conta para um adulto. Não é culpa da criança.'],
         turma='Às vezes aparece na tela alguma coisa que deixa a gente com medo, triste ou confuso. Às vezes um desconhecido manda mensagem. '
               'Nessas horas, a regra é: parar, sair e contar para um adulto de confiança. Você nunca vai levar bronca por pedir ajuda.',
         atividade=bloco(1, 'O que fazer? Circule.', figs(['desconhecido', 'mensagem'], 15) + circular(['adulto', 'foto'], 15)) +
                   bloco(2, 'Certo ou errado?', certo_errado([['tablet', 'adulto', 'crianca'], ['desconhecido', 'presente', 'casa']], 14)) +
                   bloco(3, 'Desenhe o seu adulto de confiança.', desenho('30mm')),
         gabarito=['Bloco 1: o adulto (pedir ajuda).', 'Bloco 2: usar o tablet com um adulto: certo. Dar o endereço a um desconhecido que oferece presente: errado.', 'Bloco 3: resposta pessoal.'],
         jogo='seguro-na-rede',
         adaptar='Combine com a família o adulto de confiança da criança. Para estudantes com TEA, use uma sequência visual: parar, sair, contar.'),
    aula(n=31, bim=4, titulo='Projeto: o livro da computação', habs=['EF01CO01', 'EF01CO03', 'EF01CO05', 'EF01CO07'],
         objetivo='Retomar o que foi aprendido no ano criando uma página de um livro coletivo.',
         material='Folhas, lápis de cor, cola, figuras das aulas anteriores e a folha do estudante (uma página por criança).',
         passos=['Lembrar (10 min): mostre os cartazes e jogos do ano. O que aprendemos? Organizar, padrões, algoritmos, códigos, máquinas, segurança.',
                 'Produção (30 min): cada criança faz a sua página escolhendo um tema.',
                 'Montagem (10 min): grampeie as páginas e leia o livro com a turma.'],
         turma='Este ano você aprendeu muita coisa de Computação. Hoje cada um vai fazer uma página de um livro da turma. Escolha o que você mais gostou de aprender e desenhe.',
         atividade=bloco(1, 'Circule o tema da sua página.', circular(['caixas-placeholder' if False else 'pasta-arquivo', 'robo', 'mensagem', 'cadeado'], 16)) +
                   bloco(2, 'Desenhe a sua página do livro.', desenho('120mm')),
         gabarito=['Não há resposta única. Observe se a criança explica o tema escolhido: organizar (pasta), algoritmos (robô), informação e códigos (mensagem) ou segurança (cadeado).'],
         adaptar='A página pode ser feita com colagem, fotos ou ditada para a professora.'),
    aula(n=32, bim=4, titulo='Avaliação final e festa das estrelas', habs=['EF01CO01', 'EF01CO02', 'EF01CO03', 'EF01CO04', 'EF01CO05', 'EF01CO06', 'EF01CO07'],
         objetivo='Verificar as aprendizagens do ano e celebrar o percurso da turma.',
         material='A folha de avaliação, lápis, lápis de cor e os jogos do ano.',
         passos=['Avaliação (25 min): leia cada questão em voz alta.', 'Festa das estrelas (20 min): cada criança escolhe um jogo do ano para jogar e mostrar a um colega.',
                 'Roda final (5 min): o que você quer aprender no 2º ano?'],
         turma='Chegamos ao fim do ano. Vamos mostrar tudo o que aprendemos e depois jogar os jogos que mais gostamos.',
         atividade=lado(bloco(1, 'Circule o diferente.', figs(['quadrado:azul', 'quadrado:azul', 'circulo:azul', 'quadrado:azul'], 13)),
                             bloco(2, 'Numere os passos.', numerar(['flor', 'semente', 'broto'], 15))) +
                   bloco(3, 'Desenhe as setas até a estrela.', malha(3, 2, [0, 0], alvos=[[2, 1]], cel=14) + vagas_setas(3, 10)) +
                   lado(bloco(4, 'Use o código: pinte.', legenda([('sol', 'amarelo'), ('peixe', 'azul')]) + figs(['peixe', 'sol'], 12) + figs(['circulo:branco'] * 2, 11)),
                        bloco(5, 'Certo ou errado?', certo_errado([['senha', 'amigos'], ['celular', 'chip']], 12))),
         gabarito=['Bloco 1: o círculo.', 'Bloco 2: semente 1, broto 2, flor 3.', 'Bloco 3: → → ↓ (ou ↓ → →).', 'Bloco 4: azul, amarelo.',
                   'Bloco 5: contar a senha aos amigos: errado; celular tem um chip (computador) dentro: certo.',
                   'Critério: domina com 4 ou 5 blocos certos; em desenvolvimento com 3; precisa de retomada com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos ou individualmente para quem precisa, com objetos e respostas orais.'),
]
