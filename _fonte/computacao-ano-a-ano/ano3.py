"""3º ano: ano letivo de Computação (BNCC EF03CO01 a EF03CO09), 32 aulas em 4 bimestres.

Cada aula: objetivo, material, passo a passo para o professor, texto para ler com a turma, folha do estudante e gabarito.
No 3º ano as folhas já têm instruções curtas para ler, mas a professora pode ler junto; as respostas continuam com figuras, setas, tabelas e desenhos.
"""
from folhas import (figura, bloco, lado, caixas_separar, certo_errado, circular, desenho, escrever, figs, ligar, malha, numerar, setas, vagas_setas, tabela)

ANO = 3
TITULO = 'Computação no 3º ano'
RESUMO = ('Um ano letivo completo de Computação para o 3º ano, alinhado à BNCC: 32 aulas com texto para o professor, '
          'texto para ler com a turma, folha para imprimir e gabarito, mais nove jogos que não pedem leitura.')
APRESENTACAO = [
    'No 3º ano, a turma começa a pensar como quem resolve problemas com computação: decide se uma frase é verdadeira ou falsa (inclusive com "não"), '
    'divide problemas grandes em partes, cria algoritmos que repetem até uma condição acontecer, transforma dados em informação, conhece os formatos dos arquivos '
    'e os dispositivos de entrada e saída, pesquisa na internet, se expressa com ferramentas digitais e pensa antes de compartilhar.',
    'Cada aula foi pensada para 50 minutos, com uma parte desplugada (sem computador), uma folha para imprimir e, em várias, um jogo no computador, '
    'no tablet ou no celular. Os jogos não pedem leitura: funcionam com figuras, sons e uma voz opcional.',
    'As folhas trazem instruções curtas. A professora pode ler junto com quem ainda está consolidando a leitura.',
]
BIMESTRES = [
    ('Verdadeiro, falso e partes', 'Associar verdadeiro e falso a frases do dia a dia, inclusive com negação, e dividir problemas grandes em partes menores.'),
    ('Repetir até', 'Criar, simular e corrigir algoritmos com repetição condicional, em que não se sabe de antemão quantas vezes a ação vai acontecer.'),
    ('Dados, formatos, entrada e saída', 'Relacionar dado e informação, conhecer os formatos em que os dados são guardados e os dispositivos de entrada e saída.'),
    ('Internet, expressão e responsabilidade', 'Usar navegadores e buscadores, criar em formatos digitais e reconhecer o impacto de compartilhar informações pessoais.'),
]


def aula(**k):
    k.setdefault('jogo', None)
    k.setdefault('tempo', '50 minutos')
    return k


AULAS = [
    # =================== 1º bimestre ===================
    aula(n=1, bim=1, titulo='Verdadeiro ou falso?', habs=['EF03CO01'],
         objetivo='Dizer se uma frase sobre uma situação do dia a dia é verdadeira ou falsa, olhando para os fatos.',
         material='Plaquinhas com o certo (verdadeiro) e o errado (falso) para cada criança e a folha do estudante.',
         passos=['Aquecimento (10 min): diga frases sobre a sala ("A porta está aberta", "Hoje é sábado", "Tem 30 cadeiras"). A turma levanta a plaquinha e confere olhando ao redor.',
                 'Frases da turma (15 min): cada dupla inventa uma frase verdadeira e uma falsa sobre a escola. A turma descobre qual é qual.',
                 'Folha (15 min).',
                 'Fechamento (10 min): o computador também decide entre verdadeiro e falso o tempo todo, por exemplo: a senha está certa? É verdadeiro ou falso.'],
         turma='Uma frase é verdadeira quando combina com o que acontece de verdade. "Está chovendo" é verdadeira se lá fora está chovendo. Se está sol, ela é falsa. '
               'O computador decide se uma coisa é verdadeira ou falsa milhões de vezes por segundo: a senha está certa? O jogador encostou na moeda?',
         atividade=bloco(1, 'Olhe a cena. Circule V (verdadeiro) ou F (falso) para cada frase.', figs(['gato', 'gato', 'bola', 'sol'], 16) +
                         tabela(['Frase', 'V ou F'], [['Tem dois gatos.', 'V &nbsp; F'], ['Tem um cachorro.', 'V &nbsp; F'], ['É de dia.', 'V &nbsp; F'], ['Tem mais bolas do que gatos.', 'V &nbsp; F']])) +
                   bloco(2, 'Escreva uma frase verdadeira sobre a sua sala.', escrever(2)),
         gabarito=['Bloco 1: V, F, V (tem sol), F (há uma bola e dois gatos).', 'Bloco 2: resposta livre, por exemplo "A minha sala tem uma porta".'],
         jogo='e-verdade',
         adaptar='Para quem ainda não lê com autonomia, leia as frases em voz alta. Estudantes surdos podem responder com as plaquinhas e frases em Libras com o intérprete.'),
    aula(n=2, bim=1, titulo='A palavra "não"', habs=['EF03CO01'],
         objetivo='Entender como a palavra "não" muda uma frase de verdadeira para falsa (negação).',
         material='Cartões com frases, um cartão grande escrito NÃO e a folha do estudante.',
         passos=['O cartão mágico (15 min): leia "A janela está aberta" e confirme. Coloque o cartão NÃO na frente: "A janela não está aberta". O que aconteceu com a resposta?',
                 'Desenho riscado (10 min): mostre que nos jogos uma figura riscada quer dizer "não tem". Desenhe um peixe riscado no quadro.',
                 'Folha (15 min).',
                 'Conversa (10 min): onde vemos o "não" em símbolos? Na placa de proibido fumar, no "não pise na grama".'],
         turma='A palavra "não" vira a frase do avesso. Se "a porta está aberta" é verdadeira, então "a porta não está aberta" é falsa. '
               'Nas placas, o "não" aparece como um risco em cima do desenho. Os computadores também usam o "não" para tomar decisões.',
         atividade=bloco(1, 'Uma figura riscada quer dizer "não tem". Olhe a cena e circule V ou F.', figs(['maca', 'banana', 'maca'], 15) +
                         tabela(['Frase', 'V ou F'], [[figs(['!peixe'], 13), 'V &nbsp; F'], [figs(['!maca'], 13), 'V &nbsp; F'], [figs(['!banana'], 13), 'V &nbsp; F']])) +
                   bloco(2, 'Reescreva a frase com "não" para ela ficar verdadeira.', '<p>O sol está brilhando à noite.</p>' + escrever(1)) +
                   bloco(3, 'Desenhe uma placa de "não pode" que você conhece.', desenho('30mm')),
         gabarito=['Bloco 1: não tem peixe: V. Não tem maçã: F. Não tem banana: F.', 'Bloco 2: "O sol não está brilhando à noite."', 'Bloco 3: respostas livres (não fumar, não nadar, não pisar na grama).'],
         jogo='e-verdade',
         adaptar='Para estudantes com TEA, apresente a negação com objetos concretos (uma caixa com e sem bola). Estudantes cegos podem tocar a figura com um barbante colado em cima para sentir o "risco".'),
    aula(n=3, bim=1, titulo='Frases com "e" e com "não"', habs=['EF03CO01'],
         objetivo='Decidir se frases com duas partes (ligadas por "e") e com negação são verdadeiras ou falsas.',
         material='Bambolês ou cordas no chão (um para V e outro para F) e a folha do estudante.',
         passos=['Pula no certo (15 min): diga frases com duas partes ("Eu estou de tênis e de boné"). Só é verdadeira se as duas partes forem verdadeiras. Cada criança pula no bambolê certo.',
                 'Misturando com "não" (10 min): "Eu não estou de boné e estou de tênis".',
                 'Folha (15 min).',
                 'Fechamento (10 min): quando o jogo diz "você venceu se pegou todas as moedas e não bateu no monstro", ele está usando "e" e "não".'],
         turma='Quando uma frase tem duas partes ligadas por "e", ela só é verdadeira se as duas partes forem verdadeiras. '
               '"Hoje tem aula e tem recreio" é verdadeira num dia de aula. Mas se uma parte for falsa, a frase inteira fica falsa.',
         atividade=bloco(1, 'Olhe a cena e circule V ou F.', figs(['crianca', 'mochila', 'bola'], 15) +
                         tabela(['Frase', 'V ou F'], [['Tem criança e tem bola.', 'V &nbsp; F'], ['Tem criança e tem gato.', 'V &nbsp; F'], ['Não tem gato e tem mochila.', 'V &nbsp; F'], ['Não tem bola.', 'V &nbsp; F']])) +
                   bloco(2, 'Escreva uma frase com "e" que seja verdadeira sobre você.', escrever(2)),
         gabarito=['Bloco 1: V; F (não tem gato); V; F.', 'Bloco 2: resposta livre, como "Eu tenho oito anos e gosto de jogar bola".'],
         adaptar='Para quem precisa de mais tempo, trabalhe primeiro só com frases simples e depois junte as duas partes. Para estudantes com deficiência física, troque o pulo por levantar a plaquinha.'),
    aula(n=4, bim=1, titulo='Jogo: É Verdade?', habs=['EF03CO01'],
         objetivo='Usar o jogo para decidir se frases em figuras, com e sem negação, são verdadeiras ou falsas.',
         material='Dispositivos com o jogo É Verdade? e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre que a frase da menina aparece num balão e que a figura riscada quer dizer "não tem".',
                 'Jogo em duplas (25 min).',
                 'Folha (10 min).',
                 'Conversa (5 min): qual fase confundiu mais? Por quê?'],
         turma='No jogo, a menina diz uma frase em figuras. Olhe a cena e responda: é verdade ou não? Atenção às figuras riscadas!',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 9, 12)) +
                   bloco(2, 'Invente uma fase: desenhe uma cena e escreva uma frase com "não" que seja verdadeira.', desenho('44mm') + escrever(1)),
         gabarito=['Bloco 1: depende de cada criança (9 fases).', 'Bloco 2: resposta livre. Confira se a frase com "não" combina com a cena desenhada.'],
         jogo='e-verdade',
         adaptar='O jogo tem voz e pode ser usado com leitor de tela pelo painel de acessibilidade. Faça duplas em que uma criança descreve a cena e a outra responde.'),
    aula(n=5, bim=1, titulo='Um problema grande em partes', habs=['EF03CO03'],
         objetivo='Dividir um problema grande em partes menores (decomposição).',
         material='Uma imagem de uma festa ou de um passeio, papel pardo e a folha do estudante.',
         passos=['O problema grande (10 min): a turma vai organizar uma festa. Parece difícil? O que precisamos? Anote tudo no quadro.',
                 'Separar em partes (15 min): agrupe o que foi anotado em partes: comida, enfeite, música, convite. Cada parte é um problema menor.',
                 'Folha (15 min).',
                 'Fechamento (10 min): os programadores fazem isso o tempo todo. Um jogo é feito em partes: personagem, cenário, pontos, sons.'],
         turma='Quando um problema é grande demais, a gente divide em partes menores. Organizar uma festa inteira parece difícil. '
               'Mas fazer o convite, depois os enfeites, depois a comida, um de cada vez, fica possível. Isso se chama decomposição.',
         atividade=bloco(1, 'Ligue cada coisa à parte da festa.', ligar(['copo', 'bandeira', 'caixa-som', 'envelope'], ['nota-musical', 'mensagem', 'bolo', 'estrela'])) +
                   bloco(2, 'Um jogo de videogame tem partes. Escreva ou desenhe três partes de um jogo.', tabela(['Parte 1', 'Parte 2', 'Parte 3'], [['<div style="height:24mm"></div>', '', '']])),
         gabarito=['Bloco 1: copo com comida (bolo), bandeira com enfeite (estrela), caixa de som com música, envelope com convite (mensagem).',
                   'Bloco 2: respostas livres, por exemplo personagem, cenário, pontos, música, fases.'],
         adaptar='Para estudantes com TDAH ou dificuldades de organização, use um quadro visual com as partes de uma tarefa da rotina (arrumar a mochila) e vá riscando cada parte pronta.'),
    aula(n=6, bim=1, titulo='Resolver cada parte e juntar', habs=['EF03CO03'],
         objetivo='Resolver as partes de um problema separadamente e juntar as soluções.',
         material='Um desenho de robô ou casa dividido em quatro partes (cabeça, corpo, braços, pernas), papel, cola e a folha do estudante.',
         passos=['Robô em partes (25 min): cada grupo recebe a tarefa de desenhar uma parte do robô gigante da turma. No fim, junte as partes no mural.',
                 'Conversa (10 min): ficou bom? As partes combinaram? O que precisou ser combinado antes (tamanho, cores)?',
                 'Folha (15 min).'],
         turma='Depois de dividir o problema, cada parte é resolvida, e no final juntamos tudo. Mas as partes precisam combinar. '
               'Antes de cada grupo fazer a sua parte do robô, combinamos o tamanho e as cores. Assim, quando juntamos, o robô fica inteiro.',
         atividade=bloco(1, 'O robô precisa buscar a chave e depois abrir o baú. Escreva um programa para cada parte.', malha(5, 3, [0, 2], alvos=[[2, 0]], alvo='chave', paredes=[[4, 2]], parede='tesouro', cel=13) +
                         lado(figs(['chave'], 10) + vagas_setas(4, 10), figs(['tesouro'], 10) + vagas_setas(4, 10))) +
                   bloco(2, 'Numere as partes para fazer um sanduíche.', numerar(['prato', 'pao', 'ovo-frito', 'pao'], 15)),
         gabarito=['Bloco 1: parte 1, até a chave: ↑ ↑ → → (ou → → ↑ ↑). Parte 2, da chave até o baú: → → ↓ ↓ (ou ↓ ↓ → →).',
                   'Bloco 2: 1 prato, 2 pão, 3 ovo, 4 pão (a ordem pode variar se a criança explicar).'],
         jogo='uma-parte-de-cada-vez',
         adaptar='Para quem tem dificuldade motora, cada parte do robô pode ser montada com recortes prontos. Estudantes cegos podem montar o robô com peças de texturas diferentes.'),
    aula(n=7, bim=1, titulo='Jogo: Uma Parte de Cada Vez', habs=['EF03CO03'],
         objetivo='Usar a decomposição no jogo: um programa para cada parte do caminho e separar tarefas em partes.',
         material='Dispositivos com o jogo Uma Parte de Cada Vez e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre que cada parte resolvida fica guardada embaixo da malha.',
                 'Jogo (25 min).',
                 'Folha (10 min).',
                 'Conversa (5 min): ficou mais fácil fazer o caminho em partes?'],
         turma='No jogo, o robô tem que buscar várias coisas, uma de cada vez. Faça um programa pequeno para cada parte. No fim, todas as partes juntas resolvem o problema inteiro.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 12)) +
                   bloco(2, 'Divida a tarefa "arrumar o quarto" em três partes.', tabela(['Parte 1', 'Parte 2', 'Parte 3'], [['<div style="height:24mm"></div>', '', '']])) +
                   bloco(3, 'Escreva a ordem para plantar uma flor.', numerar(['flor', 'semente', 'regador'], 15)),
         gabarito=['Bloco 1: depende de cada criança (7 fases).', 'Bloco 2: respostas livres: guardar os brinquedos, arrumar a cama, pôr a roupa no cesto.',
                   'Bloco 3: semente 1, regador 2, flor 3.'],
         jogo='uma-parte-de-cada-vez',
         adaptar='Para quem precisa de apoio, jogue em trio, com uma criança responsável por cada parte do caminho.'),
    aula(n=8, bim=1, titulo='Revisão e avaliação do 1º bimestre', habs=['EF03CO01', 'EF03CO03'],
         objetivo='Verificar se a criança decide se frases (com e sem negação) são verdadeiras e se divide problemas em partes.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): pula no certo, com frases com "não" e com "e".', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos: frases verdadeiras e falsas, a palavra "não" e dividir problemas em partes.',
         atividade=bloco(1, 'Olhe a cena e circule V ou F.', figs(['peixe', 'peixe', 'sol'], 14) +
                         tabela(['Frase', 'V ou F'], [['Tem dois peixes.', 'V &nbsp; F'], ['Não tem sol.', 'V &nbsp; F'], ['Tem peixe e não tem gato.', 'V &nbsp; F']])) +
                   bloco(2, 'Reescreva com "não" para ficar verdadeira: "O peixe anda de bicicleta."', escrever(1)) +
                   bloco(3, 'Divida "ir para a escola" em três partes.', tabela(['Parte 1', 'Parte 2', 'Parte 3'], [['<div style="height:18mm"></div>', '', '']])),
         gabarito=['Bloco 1: V; F; V.', 'Bloco 2: "O peixe não anda de bicicleta."', 'Bloco 3: respostas livres, como acordar e se arrumar, tomar café, ir até a escola.',
                   'Critério: domina com os 3 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Leia as frases em voz alta para quem precisa e aceite respostas orais no bloco 2.'),

    # =================== 2º bimestre: repetir até ===================
    aula(n=9, bim=2, titulo='Repetir até', habs=['EF03CO02'],
         objetivo='Perceber que algumas repetições acontecem até uma condição ficar verdadeira, sem saber antes quantas vezes.',
         material='Espaço livre, uma bola e a folha do estudante.',
         passos=['Até eu levantar a mão (10 min): a turma bate palmas até você levantar a mão. Quantas palmas foram? Ninguém sabia antes!',
                 'Ande até a parede (10 min): uma criança anda para a frente até encostar na parede. Para quem está mais longe, são mais passos.',
                 'Comparar (5 min): "bata 5 palmas" e "bata palmas até eu levantar a mão". Qual sabemos quantas vezes?',
                 'Folha (15 min).',
                 'Fechamento (10 min): exemplos do dia a dia: mexer o suco até dissolver, regar até a terra ficar molhada.'],
         turma='Às vezes a gente repete uma coisa até alguma coisa acontecer. Mexe o suco até o açúcar sumir. Rega a planta até a terra ficar molhada. '
               'Não sabemos antes quantas vezes vamos repetir. Paramos quando a condição acontece. Os computadores fazem muito isso.',
         atividade=bloco(1, 'Ligue cada ação ao "até quando".', ligar(['regador', 'colher', 'escova'], ['sabonete', 'copo', 'vaso'])) +
                   bloco(2, 'Complete: repita ATÉ...', '<p>Pular corda até ________________.</p><p>Lavar as mãos até ________________.</p>') +
                   bloco(3, 'Circule a repetição em que você sabe quantas vezes vai repetir.', '<div class="aa-ops-fila"><p style="border:0.4mm solid #bbb;border-radius:4mm;padding:2mm">Bata 3 palmas.</p>'
                         '<p style="border:0.4mm solid #bbb;border-radius:4mm;padding:2mm">Bata palmas até a música parar.</p></div>'),
         gabarito=['Bloco 1: regar até o vaso (a terra) ficar molhado; mexer com a colher até o suco do copo misturar; escovar até os dentes ficarem limpos. Aceite outras ligações explicadas (lavar até sair o sabonete).',
                   'Bloco 2: respostas livres (até errar, até cansar; até sair toda a espuma).', 'Bloco 3: "Bata 3 palmas".'],
         adaptar='Para estudantes surdos, use um sinal visual (levantar uma plaquinha) como condição de parada. Para estudantes com deficiência física, troque andar por empurrar um carrinho.'),
    aula(n=10, bim=2, titulo='Quantas vezes? Não sei!', habs=['EF03CO02'],
         objetivo='Diferenciar repetição com número fixo (3 vezes) de repetição com condição (até acontecer algo).',
         material='Cartões de setas, cartões "3x" e cartões "até a parede", a malha no chão e a folha do estudante.',
         passos=['Dois robôs (15 min): dois alunos-robôs em pontos diferentes recebem o mesmo comando: "ande 3 passos". Depois: "ande até a parede". Quem andou mais?',
                 'O mesmo programa em lugares diferentes (10 min): o comando "até a parede" funciona de qualquer lugar. O "3 passos" só funciona de um lugar.',
                 'Folha (15 min).',
                 'Conversa (10 min): quando é melhor usar cada um?'],
         turma='"Anda 3 passos" sempre dá 3 passos. "Anda até a parede" pode dar 2 passos ou 10, depende de onde o robô está. '
               'A repetição com condição é esperta: ela funciona mesmo quando a gente não sabe a distância.',
         atividade=bloco(1, 'O bloco ⇥ faz o robô andar para a direita até a parede. Faça um X onde cada robô para.', malha(5, 1, [0, 0], cel=13) + setas(['ate-d'], tam=11) +
                         malha(5, 1, [2, 0], cel=13) + setas(['ate-d'], tam=11)) +
                   bloco(2, 'Faça um X onde o robô para com o bloco de 3 repetições.', malha(5, 1, [0, 0], cel=13) + setas([('d', 3)], tam=11)),
         gabarito=['Bloco 1: os dois robôs param na última casa, à direita, mesmo começando em lugares diferentes.', 'Bloco 2: na quarta casa (andou 3 a partir da primeira).'],
         jogo='anda-ate-bater',
         adaptar='Use a malha no chão e deixe que as crianças executem com o corpo antes de registrar no papel.'),
    aula(n=11, bim=2, titulo='Programar com "até a parede"', habs=['EF03CO02'],
         objetivo='Escrever algoritmos usando o bloco "anda até a parede" e as setas comuns.',
         material='Malha no chão com obstáculos (caixas), cartões de setas e de "até a parede" e a folha do estudante.',
         passos=['Gelo escorregadio (20 min): na malha do chão, o robô só anda escorregando até bater. A turma planeja o caminho até um objeto.',
                 'Folha (20 min).',
                 'Conversa (10 min): os obstáculos atrapalharam ou ajudaram?'],
         turma='Imagine um chão de gelo: o robô escorrega e só para quando bate numa árvore ou na borda. Com esse bloco, as árvores viram ajudantes: elas fazem o robô parar no lugar certo.',
         atividade=bloco(1, 'Escreva o programa com os blocos ⇥ ⇤ ⤒ ⤓ (até a parede) para chegar na estrela.', malha(5, 5, [0, 4], alvos=[[2, 0]], paredes=[[3, 0]], cel=13) + vagas_setas(3)) +
                   bloco(2, 'Faça um X onde o robô para.', malha(5, 4, [0, 0], paredes=[[3, 0], [2, 3]], cel=13) + setas(['ate-d', 'ate-b'], tam=11)),
         gabarito=['Bloco 1: ⤒ (sobe até o topo) e ⇥ (anda para a direita até a árvore): para na estrela.',
                   'Bloco 2: anda para a direita até a árvore (para na terceira casa da primeira linha) e desce até a árvore de baixo: para na terceira casa da terceira linha.'],
         jogo='anda-ate-bater',
         adaptar='Para estudantes cegos, faça a malha em relevo e use um carrinho que a criança empurra até encostar num obstáculo colado.'),
    aula(n=12, bim=2, titulo='Simular antes de executar', habs=['EF03CO02'],
         objetivo='Simular algoritmos com repetição condicional e prever o resultado.',
         material='Folha do estudante, uma tampinha por criança para mover na malha.',
         passos=['Aposta (10 min): mostre um programa no quadro. Cada criança marca onde acha que o robô vai parar. Depois executem juntos.',
                 'Folha em duplas (25 min): uma criança simula com a tampinha e a outra confere.',
                 'Correção (15 min).'],
         turma='Simular é fazer o programa na cabeça, ou com uma tampinha, antes de rodar no computador. Se a simulação dá certo, o programa está certo. Se dá errado, achamos o erro antes.',
         atividade=bloco(1, 'Siga o programa e faça um X onde o robô para.', malha(5, 5, [0, 0], paredes=[[4, 0], [3, 4]], cel=12) + setas(['ate-d', 'ate-b', 'ate-e'], tam=10)) +
                   bloco(2, 'Siga o programa e faça um X onde o robô para.', malha(5, 5, [4, 4], paredes=[[4, 1], [0, 2]], cel=12) + setas(['ate-c', 'ate-e', 'ate-c'], tam=10)),
         gabarito=['Bloco 1: ⇥ para na quarta casa da primeira linha (antes da árvore); ⤓ desce até a quarta linha (antes da árvore de baixo); ⇤ vai até a borda: quarta linha, primeira casa.',
                   'Bloco 2: ⤒ sobe até a terceira linha (embaixo da árvore); ⇤ anda até a segunda casa (a árvore da esquerda faz parar); ⤒ sobe até o topo: primeira linha, segunda casa.'],
         jogo='anda-ate-bater',
         adaptar='Use cores diferentes para cada bloco do programa e pinte o rastro do robô com a mesma cor. Isso ajuda quem se perde no meio da simulação.'),
    aula(n=13, bim=2, titulo='Jogo: Anda Até Bater', habs=['EF03CO02'],
         objetivo='Resolver desafios do jogo com repetição condicional e poucos blocos.',
         material='Dispositivos com o jogo Anda Até Bater e a folha do estudante.',
         passos=['Antes do jogo (10 min): mostre os blocos com a seta e a parede. Execute um e mostre o robô escorregando.',
                 'Jogo (25 min).',
                 'Registro (10 min).',
                 'Conversa (5 min): qual estratégia funcionou no labirinto de gelo?'],
         turma='Neste jogo, o robô anda até bater. Pense onde ele vai parar antes de escolher o bloco. As árvores podem ajudar!',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)) +
                   bloco(2, 'Desenhe a fase mais difícil e o programa que resolveu.', desenho('44mm') + vagas_setas(5)),
         gabarito=['Bloco 1: depende de cada criança (8 fases).', 'Bloco 2: resposta pessoal. Confira se o programa leva o robô à estrela.'],
         jogo='anda-ate-bater',
         adaptar='O jogo funciona com teclado e voz. Faça duplas: uma criança simula com a tampinha numa malha impressa e a outra monta no jogo.'),
    aula(n=14, bim=2, titulo='Algoritmo em grupo', habs=['EF03CO02'],
         objetivo='Criar em colaboração um algoritmo com repetição condicional para uma tarefa do dia a dia.',
         material='Cartolina, canetas e a folha do estudante.',
         passos=['Escolher a tarefa (5 min): cada grupo escolhe uma tarefa: lavar a louça, encher um balde, arrumar os livros.',
                 'Escrever (20 min): o grupo escreve o algoritmo com passos e pelo menos um "repita até".',
                 'Testar (15 min): outro grupo executa o algoritmo em mímica, ao pé da letra.',
                 'Folha (10 min).'],
         turma='Hoje cada grupo vai escrever um algoritmo para uma tarefa de verdade. Ele precisa ter um "repita até". '
               'Por exemplo: "Coloque água no copo até ficar cheio". Depois, outro grupo vai testar fazendo exatamente o que está escrito.',
         atividade=bloco(1, 'Escreva o algoritmo do seu grupo. Use pelo menos um "repita até".', escrever(6)) +
                   bloco(2, 'O outro grupo conseguiu fazer a tarefa seguindo o algoritmo?', circular(['certo', 'errado'], 13)) +
                   bloco(3, 'O que vocês mudariam?', escrever(2)),
         gabarito=['Bloco 1: resposta livre. Exemplo: "1. Pegue o prato sujo. 2. Esfregue com a esponja até ficar limpo. 3. Enxágue até sair a espuma. 4. Repita até acabar a louça."',
                   'Blocos 2 e 3: depende do teste. Valorize as correções do grupo.'],
         adaptar='Distribua papéis no grupo (quem escreve, quem desenha, quem testa). O algoritmo pode ser feito em desenho para quem ainda escreve com dificuldade.'),
    aula(n=15, bim=2, titulo='Achando o erro', habs=['EF03CO02'],
         objetivo='Encontrar e corrigir erros em algoritmos com repetição (depurar).',
         material='Folha do estudante e a malha no chão.',
         passos=['Robô com defeito (15 min): o professor executa um programa com erro na malha do chão. A turma descobre qual bloco está errado.',
                 'Folha (25 min).',
                 'Conversa (10 min): todo programador erra. Achar e corrigir o erro faz parte do trabalho.'],
         turma='Programas quase nunca saem perfeitos na primeira vez. Os programadores testam, encontram o erro e corrigem. Isso se chama depurar. '
               'Errar não é ruim: é o jeito de descobrir o que precisa mudar.',
         atividade=bloco(1, 'O robô deveria chegar na estrela, mas parou no lugar errado. Faça um X no bloco errado e escreva o certo.', malha(5, 3, [0, 0], alvos=[[4, 2]], cel=13) +
                         setas(['ate-d', 'ate-c'], tam=11) + vagas_setas(2)) +
                   bloco(2, 'Este algoritmo nunca para. Por quê?', '<p>1. Pegue o copo. 2. Coloque água até o copo ficar vazio.</p>' + escrever(2)),
         gabarito=['Bloco 1: o segundo bloco está errado: o robô sobe em vez de descer. O certo é ⇥ ⤓.',
                   'Bloco 2: colocar água nunca deixa o copo vazio, então a condição nunca acontece. O certo é "coloque água até o copo ficar cheio".'],
         adaptar='Para quem precisa de apoio, mostre o programa certo e o errado lado a lado para comparar.'),
    aula(n=16, bim=2, titulo='Revisão e avaliação do 2º bimestre', habs=['EF03CO02'],
         objetivo='Verificar se a criança cria, simula e corrige algoritmos com repetição condicional.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): chão de gelo na malha do chão.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre repetir até: prever onde o robô para, escrever programas e achar erros.',
         atividade=bloco(1, 'Faça um X onde o robô para.', malha(5, 3, [0, 2], paredes=[[0, 0]], cel=12) + setas(['ate-c', 'ate-d'], tam=10)) +
                   bloco(2, 'Escreva o programa para chegar na estrela.', malha(4, 4, [0, 0], alvos=[[3, 3]], cel=12) + vagas_setas(2)) +
                   bloco(3, 'Complete com uma condição: "Mexa o suco até..."', escrever(1)),
         gabarito=['Bloco 1: sobe até a casa abaixo da árvore (segunda linha) e anda até a borda direita: segunda linha, última casa.',
                   'Bloco 2: ⇥ ⤓ (ou ⤓ ⇥).', 'Bloco 3: respostas como "até o açúcar sumir", "até misturar".',
                   'Critério: domina com os 3 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique com a malha no chão para quem precisa e registre a resposta.'),

    # =================== 3º bimestre ===================
    aula(n=17, bim=3, titulo='Dado e informação', habs=['EF03CO04'],
         objetivo='Diferenciar dado (o registro solto) de informação (o que descobrimos a partir dos dados).',
         material='Um saquinho com balas ou tampinhas coloridas e a folha do estudante.',
         passos=['O saquinho (15 min): tire uma a uma as tampinhas e registre no quadro: azul, vermelha, azul... Esses são os dados.',
                 'A pergunta (10 min): qual cor tem mais? Contando, descobrimos: tem mais azul. Isso é informação.',
                 'Folha (15 min).',
                 'Fechamento (10 min): o celular guarda dados (os passos que você deu) e mostra informação (você andou mais na terça).'],
         turma='Dados são registros soltos: azul, vermelho, azul, azul. Sozinhos, eles não dizem muita coisa. '
               'Quando organizamos e contamos, descobrimos uma informação: "tem mais tampinhas azuis". Informação é o que os dados nos contam.',
         atividade=bloco(1, 'Estes são os dados das frutas do lanche. Conte e complete a tabela.', figs(['maca', 'banana', 'maca', 'pao', 'maca', 'banana'], 12) +
                         tabela(['Lanche', 'Quantos'], [[figs(['maca'], 8), ''], [figs(['banana'], 8), ''], [figs(['pao'], 8), '']])) +
                   bloco(2, 'Escreva uma informação que você descobriu.', escrever(2)),
         gabarito=['Bloco 1: maçã 3, banana 2, pão 1.', 'Bloco 2: por exemplo "A maçã foi o lanche mais trazido" ou "Só uma pessoa trouxe pão".'],
         jogo='contar-para-descobrir',
         adaptar='Para estudantes com discalculia, use tampinhas para separar por grupos antes de contar. Estudantes cegos podem usar tampinhas de tamanhos diferentes.'),
    aula(n=18, bim=3, titulo='Pesquisa na turma', habs=['EF03CO04'],
         objetivo='Coletar dados com uma pergunta e organizá-los numa tabela de contagem.',
         material='Cartolina com uma tabela, adesivos ou tracinhos e a folha do estudante.',
         passos=['A pergunta (5 min): a turma escolhe uma pergunta: qual é o seu bicho preferido?',
                 'Coleta (20 min): cada criança vota colando um adesivo ou fazendo um tracinho na tabela.',
                 'Folha (15 min).',
                 'Informação (10 min): o que os dados mostram? Qual ganhou? Quantos votaram?'],
         turma='Para descobrir uma informação, às vezes a gente precisa coletar os dados. Fazemos uma pergunta, cada pessoa responde e anotamos numa tabela. '
               'Depois, contando, descobrimos a resposta.',
         atividade=bloco(1, 'Registre os votos da turma com tracinhos.', tabela(['Bicho', 'Tracinhos', 'Total'], [[figs(['gato'], 8), '', ''], [figs(['cachorro'], 8), '', ''], [figs(['peixe'], 8), '', ''], [figs(['passaro'], 8), '', '']])) +
                   bloco(2, 'Qual bicho ganhou? Quantas pessoas votaram ao todo?', escrever(2)),
         gabarito=['Bloco 1: depende da turma.', 'Bloco 2: o bicho com mais tracinhos e a soma de todos os votos.'],
         jogo='contar-para-descobrir',
         adaptar='Faça a votação com objetos (cada um coloca uma tampinha no pote do bicho) para quem tem dificuldade com o registro escrito.'),
    aula(n=19, bim=3, titulo='O gráfico conta a história', habs=['EF03CO04'],
         objetivo='Transformar os dados de uma tabela num gráfico de colunas e tirar informações dele.',
         material='Papel quadriculado, lápis de cor, dispositivos com o jogo Contar Para Descobrir e a folha do estudante.',
         passos=['Do quadro ao gráfico (15 min): use os dados da aula passada e pinte uma coluna de quadradinhos para cada bicho.',
                 'Jogo (20 min): Contar Para Descobrir.',
                 'Folha (15 min).'],
         turma='O gráfico é um desenho dos dados. Cada coluna mostra uma resposta, e quanto mais alta a coluna, mais votos. Olhando o gráfico, a gente vê a informação num instante.',
         atividade=bloco(1, 'Pinte um quadradinho para cada voto: sol 4, chuva 1, nuvem 2.',
                         '<div class="aa-pintar" style="--cols:3;--cel:15mm">' + ''.join('<span></span>' for _ in range(15)) + ''.join(f'<span class="vazia">{figura(x)}</span>' for x in ('sol', 'chuva', 'nuvem')) + '</div>') +
                   bloco(2, 'Que tempo fez mais? E menos?', escrever(2)),
         gabarito=['Bloco 1: coluna do sol com 4 quadradinhos, da chuva com 1, da nuvem com 2 (pintados de baixo para cima).', 'Bloco 2: fez mais sol; fez menos chuva.'],
         jogo='contar-para-descobrir',
         adaptar='Para estudantes cegos, monte o gráfico com pecinhas de encaixar empilhadas, que dá para comparar pelo tato.'),
    aula(n=20, bim=3, titulo='Cada dado no seu formato', habs=['EF03CO05'],
         objetivo='Reconhecer que os dados são guardados em formatos diferentes: imagem, som, texto, tabela, vídeo.',
         material='Um celular ou computador para mostrar uma foto, um áudio, um texto e uma planilha, e a folha do estudante.',
         passos=['Mostra e conta (15 min): mostre arquivos de cada formato. Como cada um guarda a informação? Com cores, com sons, com letras, com números.',
                 'O mesmo bicho em formatos diferentes (10 min): uma foto do gato, o miado gravado, um texto sobre gatos. Tudo é informação sobre gatos.',
                 'Folha (15 min).',
                 'Fechamento (10 min): o computador precisa saber o formato para abrir o arquivo com o programa certo.'],
         turma='O computador guarda as informações em formatos diferentes. A foto é uma imagem, feita de quadradinhos coloridos. A música é som. A história é texto. '
               'A lista de votos fica numa tabela. Cada formato combina com um tipo de informação.',
         atividade=bloco(1, 'Ligue cada informação ao melhor formato.', ligar(['passaro', 'flor', 'bolo', 'grafico'], ['tabela', 'documento', 'nota-musical', 'foto'])) +
                   bloco(2, 'Escreva qual formato você usaria para guardar:', tabela(['Informação', 'Formato'], [['A sua voz cantando', ''], ['O desenho que você fez', ''], ['A lista de nomes da turma', '']])),
         gabarito=['Bloco 1: pássaro (o canto) com som; flor (a aparência) com foto; bolo (a receita) com texto; gráfico (os votos) com tabela.',
                   'Bloco 2: som (áudio); imagem (foto ou desenho digital); texto ou tabela.'],
         jogo='cada-coisa-seu-formato',
         adaptar='Estudantes cegos podem explorar o formato de áudio gravando a própria voz; estudantes surdos, o formato de vídeo com sinais.'),
    aula(n=21, bim=3, titulo='Jogo: Cada Coisa no Seu Formato', habs=['EF03CO05'],
         objetivo='Escolher o formato adequado para cada informação no jogo.',
         material='Dispositivos com o jogo Cada Coisa no Seu Formato e a folha do estudante.',
         passos=['Retomada (5 min): foto, som, texto, tabela e vídeo.', 'Jogo (25 min).', 'Folha (15 min).', 'Conversa (5 min): o vídeo junta quais formatos?'],
         turma='No jogo, você escolhe o formato certo para guardar cada informação. Pense: é para ver, para ouvir ou para ler?',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 12)) +
                   bloco(2, 'Circule de que é feito um vídeo.', circular(['foto', 'nota-musical', 'tabela'], 14)) +
                   bloco(3, 'Escolha um assunto de que você gosta e diga um formato para guardar informações sobre ele.', escrever(2)),
         gabarito=['Bloco 1: depende de cada criança (7 fases).', 'Bloco 2: imagens (foto) e som (nota musical).', 'Bloco 3: resposta livre e coerente (futebol: vídeo do gol; música: áudio).'],
         jogo='cada-coisa-seu-formato',
         adaptar='Para quem precisa de apoio, use cartões com os formatos para manipular antes de responder no jogo.'),
    aula(n=22, bim=3, titulo='Entrada e saída', habs=['EF03CO06'],
         objetivo='Reconhecer que o computador se comunica com o mundo por dispositivos de entrada e de saída.',
         material='Teclado, mouse, fone, caixa de som (ou figuras), duas caixas com setas (entrando e saindo) e a folha do estudante.',
         passos=['Como o computador sabe? (10 min): como o computador sabe o que eu digitei? E como ele me mostra a resposta?',
                 'Caixas da entrada e da saída (15 min): a turma separa as peças nas duas caixas.',
                 'Folha (15 min).',
                 'Conversa (10 min): o nosso corpo também tem entrada (olhos, ouvidos) e saída (voz, mãos).'],
         turma='Para o computador fazer uma tarefa, a informação precisa entrar nele, pelo teclado, pelo mouse, pelo microfone ou pela câmera. '
               'Depois, o resultado sai pela tela, pela impressora ou pela caixa de som. São os dispositivos de entrada e de saída.',
         atividade=bloco(1, 'Desenhe cada peça na caixa certa: teclado, tela, mouse, impressora, microfone, caixa de som.', caixas_separar(['entrada', 'saida'], '46mm', 12)) +
                   bloco(2, 'O tablet tem uma tela que você toca. Ela é de entrada, de saída ou das duas? Explique.', escrever(2)),
         gabarito=['Bloco 1: entrada: teclado, mouse, microfone. Saída: tela, impressora, caixa de som.',
                   'Bloco 2: das duas: o toque é entrada e a imagem que aparece é saída.'],
         jogo='entra-e-sai',
         adaptar='Estudantes cegos podem usar o leitor de tela como exemplo: o teclado é a entrada e a voz do computador é a saída.'),
    aula(n=23, bim=3, titulo='Jogo: Entra e Sai', habs=['EF03CO06'],
         objetivo='Separar dispositivos de entrada e saída e ordenar o caminho da informação: entra, processa, sai.',
         material='Dispositivos com o jogo Entra e Sai e a folha do estudante.',
         passos=['Computador humano (15 min): uma criança é a entrada (recebe um número escrito), outra é o processador (soma 1) e outra é a saída (fala o resultado).',
                 'Jogo (20 min).',
                 'Folha (15 min).'],
         turma='A informação entra, o computador trabalha com ela e o resultado sai. Entrada, processamento e saída. No jogo, você vai separar as peças e colocar esse caminho em ordem.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 7, 12)) +
                   bloco(2, 'Numere o caminho da informação.', numerar(['monitor', 'teclado', 'chip'], 16)) +
                   bloco(3, 'Escreva uma entrada e uma saída do celular.', escrever(2)),
         gabarito=['Bloco 1: depende de cada criança (7 fases).', 'Bloco 2: teclado 1 (entrada), chip 2 (processamento), monitor 3 (saída).',
                   'Bloco 3: entrada: tela de toque, microfone, câmera. Saída: tela, alto-falante, vibração.'],
         jogo='entra-e-sai',
         adaptar='No computador humano, cada papel pode ser feito com gestos ou cartões, incluindo estudantes que não se comunicam oralmente.'),
    aula(n=24, bim=3, titulo='Revisão e avaliação do 3º bimestre', habs=['EF03CO04', 'EF03CO05', 'EF03CO06'],
         objetivo='Verificar se a criança relaciona dado e informação, reconhece formatos e dispositivos de entrada e saída.',
         material='A folha de avaliação e lápis.',
         passos=['Revisão (15 min): votação rápida e gráfico no quadro.', 'Avaliação (25 min).', 'Correção coletiva (10 min).'],
         turma='Hoje vamos mostrar o que aprendemos sobre dados, informação, formatos e as peças de entrada e saída.',
         atividade=bloco(1, 'Conte e escreva a informação: qual brinquedo a turma prefere?', figs(['bola', 'videogame', 'bola', 'livro', 'bola'], 11) + escrever(1)) +
                   bloco(2, 'Ligue a informação ao formato.', ligar(['microfone', 'camera', 'teclado'], ['documento', 'nota-musical', 'foto'], 13)) +
                   bloco(3, 'Escreva E (entrada) ou S (saída).', tabela(['Peça', 'E ou S'], [['Teclado', ''], ['Impressora', ''], ['Microfone', ''], ['Tela', '']])),
         gabarito=['Bloco 1: a bola (3 votos).', 'Bloco 2: microfone com som, câmera com foto, teclado com texto.', 'Bloco 3: E, S, E, S.',
                   'Critério: domina com os 3 blocos certos; em desenvolvimento com 2; precisa de retomada com 0 ou 1.'],
         adaptar='Aplique com objetos e cartões para quem precisa, registrando a resposta oral.'),

    # =================== 4º bimestre ===================
    aula(n=25, bim=4, titulo='Navegadores e sites', habs=['EF03CO07'],
         objetivo='Reconhecer o navegador como o programa que abre sites e perceber que existem navegadores diferentes.',
         material='Computador com projetor e dois navegadores instalados, e a folha do estudante.',
         passos=['O que é um site? (10 min): mostre o site da escola, de um museu ou de um jogo educativo.',
                 'Dois navegadores (15 min): abra o mesmo site em dois navegadores diferentes. O que muda? O que fica igual?',
                 'Folha (15 min).',
                 'Conversa (10 min): o endereço do site é como o endereço de uma casa.'],
         turma='O navegador é o programa que abre os sites da internet. Existem vários navegadores, de empresas diferentes, mas todos fazem a mesma coisa. '
               'O endereço do site é como o endereço de uma casa: digitando o endereço certo, o navegador nos leva até lá.',
         atividade=bloco(1, 'Circule o ícone que lembra um navegador.', circular(['navegador', 'calculadora', 'camera', 'nota-musical'], 14)) +
                   bloco(2, 'Complete: o navegador serve para...', escrever(2)) +
                   bloco(3, 'Desenhe a página de um site que você gostaria de visitar.', figs(['~navegador'], 60)),
         gabarito=['Bloco 1: o navegador.', 'Bloco 2: abrir sites, ver páginas da internet.', 'Bloco 3: resposta livre.'],
         jogo='detetive-da-busca',
         adaptar='Mostre a lupa de aumento do navegador (zoom) e o leitor de tela para estudantes com baixa visão e cegos.'),
    aula(n=26, bim=4, titulo='Buscar com boas pistas', habs=['EF03CO07'],
         objetivo='Usar uma ferramenta de busca escolhendo palavras-chave e avaliar se os resultados servem.',
         material='Computador com projetor, dispositivos com o jogo Detetive da Busca e a folha do estudante.',
         passos=['Busca ao vivo (15 min): pergunte "como nasce o sapo?". Que palavras vamos digitar? Teste "sapo" e depois "sapo nascimento girino". Qual resultado foi melhor?',
                 'Jogo (20 min): Detetive da Busca.',
                 'Folha (15 min).'],
         turma='Para buscar na internet, escolhemos poucas palavras importantes, as palavras-chave. Quanto melhor a pista, melhor o resultado. '
               'E nem todo resultado serve: precisamos olhar se ele responde à nossa pergunta.',
         atividade=bloco(1, 'Circule as melhores palavras-chave para a pergunta "Quanto tempo vive uma tartaruga?".',
                         '<div class="aa-ops-fila"><p style="border:0.4mm solid #bbb;border-radius:4mm;padding:2mm">tartaruga</p><p style="border:0.4mm solid #bbb;border-radius:4mm;padding:2mm">tartaruga quanto tempo vive</p><p style="border:0.4mm solid #bbb;border-radius:4mm;padding:2mm">bicho verde</p></div>') +
                   bloco(2, 'Escreva palavras-chave para descobrir:', tabela(['Pergunta', 'Palavras-chave'], [['Qual é o maior animal do mundo?', ''], ['Como se faz um bolo de cenoura?', '']])),
         gabarito=['Bloco 1: "tartaruga quanto tempo vive".', 'Bloco 2: "maior animal do mundo"; "receita bolo de cenoura".'],
         jogo='detetive-da-busca',
         adaptar='Para quem ainda escreve com dificuldade, use a busca por voz e compare os resultados.'),
    aula(n=27, bim=4, titulo='Criar em formato digital', habs=['EF03CO08'],
         objetivo='Usar uma ferramenta digital para se expressar (desenho, áudio ou cartão).',
         material='Dispositivos com um programa de desenho ou com o jogo Ateliê Digital e a folha do estudante.',
         passos=['Inspiração (5 min): mostre cartões digitais e desenhos feitos no computador.',
                 'Ateliê (30 min): cada criança cria um cartão ou desenho digital no Ateliê Digital ou num programa de desenho.',
                 'Galeria (10 min): as crianças passeiam pelas telas dos colegas.',
                 'Folha (5 min).'],
         turma='O computador também é uma ferramenta para criar: desenhos, cartões, músicas e histórias. As imagens digitais são feitas de quadradinhos coloridos chamados pixels.',
         atividade=bloco(1, 'Planeje o seu cartão digital: para quem, o desenho e a mensagem.', tabela(['Para quem', 'Desenho', 'Mensagem'], [['<div style="height:30mm"></div>', '', '']])) +
                   bloco(2, 'Pinte o desenho de quadradinhos (pixels): C = vermelho.',
                         '<div class="aa-pintar" style="--cols:5;--cel:10mm">' + ''.join(f'<span><b>{s}</b></span>' if s == 'C' else '<span></span>' for s in 'QCQCQCCCCCCCCCCQCCCQQQCQQ') + '</div>'),
         gabarito=['Bloco 1: resposta livre.', 'Bloco 2: um coração aparece ao pintar os quadradinhos marcados com C.'],
         jogo='atelie-digital',
         adaptar='Programas de desenho com formas prontas e botões grandes ajudam quem tem dificuldade motora. Estudantes cegos podem criar um cartão em áudio.'),
    aula(n=28, bim=4, titulo='Minha apresentação digital', habs=['EF03CO08'],
         objetivo='Escolher o formato digital (imagem, áudio, vídeo, slide) mais adequado para apresentar um assunto.',
         material='Dispositivos com programa de apresentação, gravação ou o Ateliê Digital e a folha do estudante.',
         passos=['Escolher (10 min): cada dupla escolhe um assunto de que gosta e um formato.',
                 'Produzir (25 min): a dupla produz a apresentação (um slide, um áudio curto ou um desenho com legenda).',
                 'Apresentar (15 min): algumas duplas mostram para a turma.'],
         turma='Para contar alguma coisa, podemos escolher um formato: uma imagem com legenda, um áudio, um vídeo curto, um slide. '
               'O formato certo depende do que queremos mostrar e para quem.',
         atividade=bloco(1, 'Planeje a apresentação da sua dupla.', tabela(['Assunto', 'Formato', 'Por que esse formato?'], [['<div style="height:26mm"></div>', '', '']])) +
                   bloco(2, 'Desenhe como vai ficar.', desenho('60mm')),
         gabarito=['Não há resposta única. Observe se o formato combina com o assunto (um som de animal em áudio, um passo a passo em vídeo ou slides).'],
         jogo='atelie-digital',
         adaptar='Ofereça a escolha do formato conforme as potências de cada estudante: áudio para quem prefere falar, vídeo em Libras para estudantes surdos.'),
    aula(n=29, bim=4, titulo='Informação pessoal', habs=['EF03CO09'],
         objetivo='Reconhecer informações pessoais (suas e dos colegas) e por que cuidar delas na internet.',
         material='Cartões com informações (nome completo, endereço, foto, cor favorita, nome da escola, time do coração) e a folha do estudante.',
         passos=['Pode ou não pode (15 min): mostre cada cartão. Pode compartilhar na internet? Por quê?',
                 'De quem é? (10 min): a foto do colega é informação de quem? Precisamos perguntar a ele antes de mostrar.',
                 'Folha (15 min).',
                 'Combinado (10 min).'],
         turma='Informação pessoal é aquilo que identifica a gente: o nome completo, o endereço, a escola, o telefone, as fotos. '
               'Na internet, uma informação pode ser vista e copiada por muitas pessoas. Por isso cuidamos das nossas e das informações dos colegas.',
         atividade=bloco(1, 'Pinte de vermelho o que é informação pessoal e de verde o que pode compartilhar.',
                         tabela(['Informação', 'Cor'], [['Meu endereço', ''], ['Minha cor favorita', ''], ['A foto do meu amigo', ''], ['O nome da minha escola', ''], ['Meu desenho, sem meu nome completo', '']])) +
                   bloco(2, 'Antes de postar a foto de um colega, o que você precisa fazer?', escrever(2)),
         gabarito=['Bloco 1: vermelho: endereço, foto do amigo, nome da escola. Verde: cor favorita, desenho sem nome completo.',
                   'Bloco 2: perguntar se ele deixa e pedir a um adulto.'],
         jogo='pensa-antes-de-postar',
         adaptar='Use as plaquinhas verde e vermelha para responder oralmente. Para estudantes com TEA, deixe as regras escritas com imagens na mesa.'),
    aula(n=30, bim=4, titulo='Jogo: Pensa Antes de Postar', habs=['EF03CO09'],
         objetivo='Decidir no jogo se é certo compartilhar fotos e informações e o que fazer quando algo é postado sem permissão.',
         material='Dispositivos com o jogo Pensa Antes de Postar e a folha do estudante.',
         passos=['Jogo (20 min).', 'Folha (15 min).', 'Roda (15 min): alguém já postou ou mostrou algo seu sem perguntar? Como você se sentiu? (Sem citar nomes.)'],
         turma='Antes de postar, pense: essa informação é minha ou de outra pessoa? Ela mostra onde eu moro ou estudo? A pessoa da foto deixou? Se tiver dúvida, pergunte a um adulto.',
         atividade=bloco(1, 'Pinte uma estrela para cada fase que você terminou.', figs(['estrela-f:branco'] * 8, 12)) +
                   bloco(2, 'Certo ou errado? Circule.', certo_errado([['amigos', 'foto', 'celular'], ['crianca', 'interrogacao', 'amigos'], ['casa', 'foto', 'globo']], 13)) +
                   bloco(3, 'Escreva uma regra para a turma sobre compartilhar fotos.', escrever(2)),
         gabarito=['Bloco 1: depende de cada criança (8 fases).', 'Bloco 2: postar a foto do amigo sem perguntar: errado; perguntar ao amigo: certo; mostrar a casa para todo mundo: errado.',
                   'Bloco 3: resposta livre, como "Só posto foto de alguém se a pessoa deixar".'],
         jogo='pensa-antes-de-postar',
         adaptar='Acolha relatos com cuidado e encaminhe situações de exposição à coordenação. Ninguém é obrigado a contar experiências pessoais.'),
    aula(n=31, bim=4, titulo='Projeto: mural digital da turma', habs=['EF03CO08', 'EF03CO09', 'EF03CO07'],
         objetivo='Criar um mural digital (ou impresso) com produções da turma, cuidando das informações pessoais.',
         material='Dispositivos, programa de apresentação ou mural digital da escola, e a folha do estudante.',
         passos=['Planejar (10 min): o que vai no mural? Desenhos, áudios, curiosidades pesquisadas.',
                 'Produzir (25 min): cada criança faz a sua parte, buscando uma curiosidade com as palavras-chave certas.',
                 'Revisar (10 min): a turma confere: tem nome completo? Tem foto de alguém sem permissão? Tem endereço?',
                 'Publicar (5 min): com a professora, o mural vai para o espaço da escola.'],
         turma='O mural da turma vai mostrar o que aprendemos. Antes de publicar, fazemos a revisão de segurança: só o primeiro nome, nada de endereço e foto só com permissão.',
         atividade=bloco(1, 'A minha parte do mural: assunto e formato.', tabela(['Assunto', 'Formato'], [['', '']])) +
                   bloco(2, 'Uma curiosidade que eu pesquisei (e as palavras-chave que usei).', escrever(3)) +
                   bloco(3, 'Revisão de segurança: marque com X.', tabela(['Pergunta', 'Sim', 'Não'], [['Tem o meu nome completo?', '', ''], ['Aparece o meu endereço?', '', ''], ['Tem foto de alguém que não deixou?', '', '']])),
         gabarito=['Blocos 1 e 2: respostas livres.', 'Bloco 3: as três respostas devem ser "Não" para a parte ir ao mural.'],
         adaptar='Cada criança contribui no formato em que se expressa melhor. Combine com as famílias a autorização de uso de imagem antes de publicar.'),
    aula(n=32, bim=4, titulo='Avaliação final e festa dos jogos', habs=['EF03CO01', 'EF03CO02', 'EF03CO03', 'EF03CO04', 'EF03CO05', 'EF03CO06', 'EF03CO07', 'EF03CO09'],
         objetivo='Verificar as aprendizagens do ano e celebrar o percurso da turma.',
         material='A folha de avaliação, lápis e os jogos do ano.',
         passos=['Avaliação (25 min).', 'Festa dos jogos (20 min).', 'Roda final (5 min).'],
         turma='Chegamos ao fim do 3º ano. Vamos mostrar o que aprendemos e depois jogar.',
         atividade=lado(bloco(1, 'V ou F? Na cena: gato e bola.', figs(['gato', 'bola'], 11) + '<p>Não tem cachorro. ( &nbsp; )</p><p>Tem gato e tem peixe. ( &nbsp; )</p>'),
                        bloco(2, 'X onde o robô para.', malha(4, 2, [0, 1], cel=11) + setas(['ate-c', 'ate-d'], tam=9))) +
                   lado(bloco(3, 'Entrada (E) ou saída (S)?', '<p>Mouse ( &nbsp; ) &nbsp; Tela ( &nbsp; ) &nbsp; Microfone ( &nbsp; )</p>'),
                        bloco(4, 'Formato do canto do pássaro?', circular(['foto', 'nota-musical', 'documento'], 10))) +
                   bloco(5, 'Escreva palavras-chave para descobrir "o que come o panda".', escrever(1)) +
                   bloco(6, 'O que fazer antes de postar a foto de um amigo?', escrever(1)),
         gabarito=['Bloco 1: V; F.', 'Bloco 2: primeira linha, última casa.', 'Bloco 3: E, S, E. Bloco 4: a nota musical (som).',
                   'Bloco 5: "alimentação do panda". Bloco 6: perguntar se ele deixa.',
                   'Critério: domina com 5 ou 6 blocos certos; em desenvolvimento com 3 ou 4; precisa de retomada com 2 ou menos.'],
         adaptar='Aplique em pequenos grupos para quem precisa, com leitura e respostas orais.'),
]
