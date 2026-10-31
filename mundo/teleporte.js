/* Mundos do teletransporte: perguntas de treino das 6 áreas do teste de proficiência em informática,
   separadas pelos 4 níveis do resultado. Cada pergunta: [enunciado, alternativas, índice da certa, explicação]. */
window.TELEPORTE = {
  niveis: {
    iniciante: { nome: 'Iniciante', ic: '🌱', cor: '#a8e6b8', parede: '#cdeed5' },
    basico: { nome: 'Básico', ic: '🌿', cor: '#9fd1e8', parede: '#cfe8f5' },
    intermediario: { nome: 'Intermediário', ic: '🌳', cor: '#c7b4f2', parede: '#e3d9fa' },
    avancado: { nome: 'Avançado', ic: '🚀', cor: '#f6c27a', parede: '#fde2b8' }
  },
  areas: {
    computador: { nome: 'Computador e dispositivos', ic: '🖥️', links: [['/material-didatico/jogos/partes-computador.html', 'Jogo: partes do computador'], ['/simuladores/placa-mae.html', 'Simulador: placa-mãe'], ['/material-didatico/fichas/maquinas-entrada-saida/', 'Ficha: entrada e saída']] },
    arquivos: { nome: 'Arquivos e sistema', ic: '🗂️', links: [['/material-didatico/fichas/arrumando-pastas-computador/', 'Ficha: arrumando pastas'], ['/material-didatico/planos/arquivos-ordem-pastas-compactacao-metadados/', 'Plano: arquivos e pastas'], ['/material-didatico/jogos/digitacao.html', 'Jogo: digitação']] },
    internet: { nome: 'Internet e pesquisa', ic: '🌐', links: [['/material-didatico/jogos/pacotes.html', 'Jogo: pacotes na rede'], ['/material-didatico/jogos/boato.html', 'Jogo: boato ou fato'], ['/material-didatico/planos/checagem-fatos-fontes-vieses-desinformacao/', 'Plano: checagem de fatos']] },
    seguranca: { nome: 'Segurança e privacidade', ic: '🔐', links: [['/material-didatico/jogos/senha.html', 'Jogo: senha forte'], ['/material-didatico/jogos/golpe.html', 'Jogo: é golpe?'], ['/material-didatico/fichas/detetive-golpes-senhas-fortes/', 'Ficha: detetive de golpes']] },
    aplicativos: { nome: 'Textos, planilhas e apresentações', ic: '📊', links: [['/tech-pra-prof/', 'Guia Tech pra Prof'], ['/material-didatico/jogos/tabelas.html', 'Jogo: tabelas'], ['/material-didatico/planos/projeto-nossa-producao-digital/', 'Plano: produção digital']] },
    logica: { nome: 'Lógica e programação', ic: '🧩', links: [['/material-didatico/jogos/robo.html', 'Jogo: robô'], ['/material-didatico/jogos/python.html', 'Jogo: Python'], ['/quiz-pensamento-computacional/', 'Quiz de pensamento computacional']] }
  },
  perguntas: {
    iniciante: {
      computador: [
        ['Qual destes é um dispositivo de entrada?', ['Teclado', 'Monitor', 'Caixa de som'], 0, 'O teclado manda informação para o computador. Monitor e caixa de som são de saída: mostram ou tocam o resultado.'],
        ['Para que serve o mouse?', ['Apontar e clicar nas coisas da tela', 'Guardar arquivos', 'Imprimir'], 0, 'O mouse move o ponteiro na tela e permite clicar, arrastar e selecionar.'],
        ['Qual destes mostra as imagens do computador?', ['Monitor', 'Microfone', 'Webcam'], 0, 'O monitor é a tela. Microfone e webcam são de entrada: captam som e imagem.'],
        ['O que acontece se você desligar o computador puxando o fio, sem desligar pelo sistema?', ['Pode perder o que não foi salvo', 'Nada, é o jeito certo', 'O computador fica mais rápido'], 0, 'Desligar pelo menu do sistema fecha os programas com calma e evita perder trabalho.']
      ],
      arquivos: [
        ['Para guardar um trabalho e abrir depois, o que você precisa fazer?', ['Salvar o arquivo', 'Fechar sem salvar', 'Minimizar a janela'], 0, 'Salvar grava o arquivo no armazenamento. Sem salvar, o trabalho some quando o programa fecha.'],
        ['Uma pasta no computador serve para:', ['Organizar arquivos', 'Deixar a internet mais rápida', 'Aumentar o volume'], 0, 'Pastas agrupam arquivos, como gavetas, para achar tudo depois.'],
        ['Onde vão os arquivos apagados, antes de sumirem de vez?', ['Para a lixeira', 'Para a impressora', 'Para a área de trabalho'], 0, 'Na lixeira dá para recuperar o arquivo enquanto ela não for esvaziada.'],
        ['Qual é um bom nome para o arquivo do seu trabalho de ciências?', ['trabalho-ciencias-ana', 'aaaaa', 'documento1'], 0, 'Um nome que diz o que é o arquivo e de quem é ajuda a encontrá-lo depois.']
      ],
      internet: [
        ['Para que serve um navegador, como o Chrome ou o Firefox?', ['Abrir sites da internet', 'Editar fotos', 'Desligar o computador'], 0, 'O navegador é o programa que abre as páginas da web.'],
        ['Num buscador, o que você escreve para pesquisar?', ['Palavras-chave sobre o assunto', 'Sua senha', 'O endereço da sua casa'], 0, 'Palavras-chave curtas e certeiras trazem resultados melhores. Senha e endereço nunca vão na busca.'],
        ['Você viu uma notícia muito chocante. O que fazer antes de compartilhar?', ['Conferir se outros sites confiáveis dizem o mesmo', 'Compartilhar logo', 'Mandar para todos os grupos'], 0, 'Notícia falsa costuma assustar para ser espalhada. Conferir a fonte evita boatos.'],
        ['O que é um link?', ['Um texto ou imagem que leva a outra página', 'Um vírus', 'Um tipo de teclado'], 0, 'Clicar num link abre outro endereço da web.']
      ],
      seguranca: [
        ['Qual destas senhas é mais forte?', ['Gato!Azul7Pula', '123456', 'senha'], 0, 'Senha forte é longa e mistura letras, números e símbolos. As outras estão nas listas que os golpistas testam primeiro.'],
        ['Um colega pede a sua senha da escola. O que fazer?', ['Não contar: senha é pessoal', 'Contar, porque é amigo', 'Escrever num papel e entregar'], 0, 'Senha é como a chave de casa: só sua. Quem tem a senha pode agir no seu nome.'],
        ['Chegou uma mensagem dizendo que você ganhou um prêmio e precisa clicar num link. Isso é:', ['Provavelmente golpe', 'Sempre verdade', 'Um aviso da escola'], 0, 'Prêmio que você não pediu e pressa para clicar são sinais clássicos de golpe.'],
        ['Num computador da escola, o que fazer antes de sair?', ['Sair da sua conta', 'Deixar a conta aberta', 'Salvar a senha no navegador'], 0, 'Sair da conta impede que a próxima pessoa use o seu e-mail ou suas redes.']
      ],
      aplicativos: [
        ['Qual programa é feito para escrever textos?', ['Editor de texto, como o Docs ou o Word', 'Calculadora', 'Navegador'], 0, 'O editor de texto tem ferramentas de fonte, parágrafo e correção.'],
        ['Para deixar uma palavra em negrito, você:', ['Seleciona a palavra e clica no N (ou B)', 'Apaga a palavra', 'Aumenta o volume'], 0, 'Primeiro seleciona, depois aplica a formatação.'],
        ['Uma planilha é organizada em:', ['Linhas e colunas', 'Slides', 'Pastas'], 0, 'O encontro de uma linha com uma coluna é a célula, como A1 ou B3.'],
        ['Qual programa serve para fazer slides de apresentação?', ['Apresentações, como o Slides ou o PowerPoint', 'Planilha', 'Bloco de notas'], 0, 'O programa de apresentações organiza o conteúdo em slides para mostrar à turma.']
      ],
      logica: [
        ['Um algoritmo é:', ['Uma sequência de passos para resolver algo', 'Um tipo de computador', 'Um vírus'], 0, 'Receita de bolo também é um algoritmo: passos em ordem para chegar ao resultado.'],
        ['Para escovar os dentes, o que vem primeiro?', ['Colocar a pasta na escova', 'Enxaguar a boca', 'Guardar a escova'], 0, 'A ordem dos passos importa: trocar a ordem muda o resultado.'],
        ['O robô está virado para a direita e precisa andar 3 casas para a direita. Qual comando?', ['Andar 3 vezes', 'Virar à esquerda', 'Parar'], 0, 'Ele já está na direção certa, então basta repetir o passo 3 vezes.'],
        ['Um "bug" num programa é:', ['Um erro que faz o programa funcionar errado', 'Um inseto de verdade no teclado', 'Um tipo de mouse'], 0, 'Achar e corrigir bugs se chama depuração.']
      ]
    },
    basico: {
      computador: [
        ['Qual é a diferença entre memória RAM e armazenamento (HD ou SSD)?', ['A RAM guarda o que está em uso e se apaga ao desligar; o armazenamento guarda os arquivos', 'São a mesma coisa', 'A RAM guarda as fotos para sempre'], 0, 'A RAM é rápida e temporária. O HD ou SSD é onde os arquivos ficam mesmo desligado.'],
        ['O processador (CPU) é:', ['A parte que faz os cálculos e executa os programas', 'A tela', 'O cabo de energia'], 0, 'A CPU é o "cérebro" que executa as instruções.'],
        ['Um pendrive é um dispositivo de:', ['Armazenamento', 'Saída de som', 'Entrada de texto'], 0, 'O pendrive guarda arquivos e leva de um computador para outro.'],
        ['A impressora multifuncional que copia e digitaliza é de:', ['Entrada e saída', 'Só entrada', 'Só saída'], 0, 'Imprimir é saída; digitalizar manda a imagem para o computador, que é entrada.']
      ],
      arquivos: [
        ['O que indica a extensão ".pdf" no fim do nome de um arquivo?', ['O tipo do arquivo', 'O tamanho', 'A data em que foi criado'], 0, 'A extensão diz o formato: .pdf documento, .jpg imagem, .mp3 áudio...'],
        ['Qual atalho copia o que está selecionado?', ['Ctrl + C', 'Ctrl + P', 'Ctrl + Z'], 0, 'Ctrl + C copia, Ctrl + V cola, Ctrl + Z desfaz, Ctrl + P imprime.'],
        ['Para enviar 20 fotos de uma vez por e-mail, um bom caminho é:', ['Compactar as fotos num arquivo .zip', 'Mandar 20 e-mails', 'Renomear as fotos'], 0, 'Compactar junta tudo num arquivo só e pode diminuir o tamanho.'],
        ['"Salvar como" serve para:', ['Salvar com outro nome, formato ou lugar', 'Apagar o arquivo', 'Abrir a lixeira'], 0, 'Com "Salvar como" você cria uma cópia e mantém o original.']
      ],
      internet: [
        ['O que o cadeado ao lado do endereço do site indica?', ['Que a conexão é criptografada (https)', 'Que o site é sempre confiável', 'Que o site está fechado'], 0, 'O cadeado protege os dados no caminho, mas um site de golpe também pode ter cadeado.'],
        ['Para buscar exatamente a frase "ciclo da água", você usa:', ['Aspas: "ciclo da água"', 'Ponto de exclamação', 'Só letras maiúsculas'], 0, 'As aspas pedem ao buscador a frase exata, naquela ordem.'],
        ['Qual destas é uma fonte mais confiável para um trabalho escolar?', ['Site de universidade ou órgão oficial, com autor e data', 'Um vídeo sem autor', 'Uma corrente de WhatsApp'], 0, 'Fonte confiável diz quem escreveu, quando e de onde vêm os dados.'],
        ['Na nuvem, seus arquivos ficam guardados:', ['Em servidores de uma empresa, acessados pela internet', 'Só no seu pendrive', 'No céu de verdade'], 0, 'A "nuvem" são computadores de outras empresas, ligados à internet.']
      ],
      seguranca: [
        ['O que é verificação em duas etapas?', ['Pedir a senha e mais um código, por exemplo no celular', 'Ter duas senhas iguais', 'Entrar duas vezes no site'], 0, 'Mesmo que alguém descubra a senha, ainda precisaria do segundo código.'],
        ['Phishing é:', ['Um golpe que imita uma empresa para roubar dados', 'Um jogo de pescaria', 'Um antivírus'], 0, 'O e-mail ou site falso copia a aparência do verdadeiro para você digitar a senha.'],
        ['Antes de postar uma foto, o que vale conferir?', ['Se ela mostra endereço, uniforme ou dados pessoais', 'Só se está bonita', 'Nada'], 0, 'Dados na foto ajudam desconhecidos a descobrir onde você mora ou estuda.'],
        ['Atualizar o sistema e os aplicativos é importante porque:', ['Corrige falhas de segurança', 'Deixa a tela colorida', 'Apaga vírus sozinho sempre'], 0, 'As atualizações fecham brechas que os criminosos usam.']
      ],
      aplicativos: [
        ['Na planilha, qual fórmula soma de A1 até A5?', ['=SOMA(A1:A5)', '=A1+A5', 'SOMA A1 A5'], 0, 'Os dois-pontos indicam o intervalo, de A1 até A5. A fórmula começa com =.'],
        ['Se A1 = 4 e B1 = 6, quanto dá =A1*B1?', ['24', '10', '46'], 0, 'O asterisco é a multiplicação: 4 × 6 = 24.'],
        ['Num texto longo, para o sumário se montar sozinho, você usa:', ['Estilos de título', 'Negrito em tudo', 'Muitos espaços'], 0, 'Os estilos de título (Título 1, Título 2...) organizam o texto e geram o sumário.'],
        ['Num slide para a turma, o melhor é:', ['Pouco texto, letra grande e imagens', 'Muito texto pequeno', 'Fundo e letra da mesma cor'], 0, 'Slide é apoio da fala: pouco texto e boa leitura de longe.']
      ],
      logica: [
        ['Num programa, "repita 4 vezes: ande 1 passo" faz o robô andar:', ['4 passos', '1 passo', '5 passos'], 0, 'O laço repete o mesmo comando o número de vezes indicado.'],
        ['"SE estiver chovendo ENTÃO leve guarda-chuva" é um exemplo de:', ['Condição', 'Repetição', 'Variável'], 0, 'A condição escolhe o que fazer dependendo de algo ser verdadeiro ou falso.'],
        ['Uma variável num programa serve para:', ['Guardar um valor que pode mudar', 'Desligar o computador', 'Mudar a cor da tela'], 0, 'Por exemplo, a variável "pontos" guarda a pontuação do jogo.'],
        ['Qual a sequência que continua o padrão 2, 4, 6, 8, ...?', ['10', '9', '12'], 0, 'Reconhecer padrões é parte do pensamento computacional: aqui soma 2 a cada passo.']
      ]
    },
    intermediario: {
      computador: [
        ['Um computador com mais memória RAM costuma:', ['Abrir mais programas ao mesmo tempo sem travar', 'Ter a tela maior', 'Guardar mais fotos para sempre'], 0, 'Mais RAM dá espaço para mais coisas em uso ao mesmo tempo.'],
        ['1 gigabyte (GB) tem aproximadamente:', ['1000 megabytes', '10 megabytes', '1 milhão de gigabytes'], 0, 'As unidades sobem de mil em mil: kilo, mega, giga, tera.'],
        ['O sistema operacional (Windows, Linux, Android) serve para:', ['Gerenciar o hardware e rodar os programas', 'Só desenhar o papel de parede', 'Navegar na internet sozinho'], 0, 'Ele organiza memória, arquivos, dispositivos e os programas em execução.'],
        ['Um SSD é mais rápido que um HD porque:', ['Não tem partes mecânicas girando', 'É maior', 'Usa mais cabos'], 0, 'O HD tem disco e braço que se movem; o SSD usa chips de memória.']
      ],
      arquivos: [
        ['Fazer backup significa:', ['Guardar uma cópia dos arquivos em outro lugar', 'Apagar arquivos velhos', 'Mudar o nome do arquivo'], 0, 'Se o computador quebrar ou for roubado, a cópia salva o trabalho.'],
        ['Um arquivo .txt e um arquivo .docx diferem porque:', ['O .txt guarda só o texto puro; o .docx guarda formatação também', 'São iguais', 'O .txt é uma imagem'], 0, 'Texto puro não tem negrito, fontes nem imagens.'],
        ['O caminho "Documentos/Escola/2026/ciencias.pdf" indica:', ['Pastas dentro de pastas até o arquivo', 'Quatro arquivos diferentes', 'Um site da internet'], 0, 'Cada barra é um nível a mais dentro da estrutura de pastas.'],
        ['Metadados de uma foto podem mostrar:', ['Data, aparelho e até o local onde foi tirada', 'Só as cores', 'Nada além da imagem'], 0, 'Por isso vale tirar a localização antes de publicar fotos.']
      ],
      internet: [
        ['Quando você manda uma mensagem pela internet, ela vai:', ['Dividida em pacotes que podem seguir caminhos diferentes', 'Inteira por um fio direto até a pessoa', 'Pelo satélite sempre'], 0, 'Os pacotes são remontados no destino, na ordem certa.'],
        ['O DNS serve para:', ['Traduzir nomes de sites em endereços IP', 'Deixar o Wi-Fi mais forte', 'Bloquear vírus'], 0, 'Você digita ohtopico.com.br e o DNS descobre o número (IP) do servidor.'],
        ['Um algoritmo de recomendação (vídeos, redes) tende a:', ['Mostrar mais do que você já viu e curtiu', 'Mostrar tudo de forma neutra', 'Mostrar só notícias oficiais'], 0, 'Isso pode criar uma "bolha": vale buscar outras fontes de propósito.'],
        ['Para checar se uma imagem é antiga ou tirada de contexto, use:', ['A busca reversa de imagens', 'O zoom', 'Um filtro de cor'], 0, 'A busca reversa mostra onde a imagem já apareceu antes.']
      ],
      seguranca: [
        ['Um gerenciador de senhas ajuda porque:', ['Guarda senhas fortes e diferentes para cada site', 'Usa a mesma senha em tudo', 'Mostra sua senha para os amigos'], 0, 'Senha repetida é perigosa: se um site vaza, os outros ficam expostos.'],
        ['Rede Wi-Fi pública e aberta exige cuidado porque:', ['Outras pessoas na rede podem tentar ver o tráfego', 'Ela é sempre mais lenta', 'Ela apaga arquivos'], 0, 'Evite entrar no banco ou digitar senhas em redes abertas.'],
        ['A LGPD é a lei que:', ['Protege os dados pessoais das pessoas no Brasil', 'Regula o preço da internet', 'Proíbe jogos online'], 0, 'Lei Geral de Proteção de Dados: diz como empresas e escolas podem usar dados pessoais.'],
        ['Um site com endereço "banco-do-brasil-seguro.net" pedindo sua senha é suspeito porque:', ['O domínio não é o oficial do banco', 'Tem hífen', 'É azul'], 0, 'Golpistas criam domínios parecidos com o verdadeiro. Digite o endereço oficial você mesmo.']
      ],
      aplicativos: [
        ['Na planilha, =MÉDIA(B2:B6) calcula:', ['A média dos valores de B2 até B6', 'A soma de B2 e B6', 'O maior valor'], 0, 'A média soma os valores e divide pela quantidade.'],
        ['Ao copiar =A1*2 da célula B1 para B2, a fórmula vira:', ['=A2*2', '=A1*2', '=B1*2'], 0, 'A referência é relativa: anda junto quando a fórmula é copiada.'],
        ['Para que a referência não mude ao copiar, você escreve:', ['$A$1', 'A1!', '(A1)'], 0, 'O cifrão fixa a coluna e a linha: é a referência absoluta.'],
        ['Para mostrar a evolução da temperatura ao longo da semana, o melhor gráfico é:', ['Gráfico de linhas', 'Gráfico de pizza', 'Uma tabela de nomes'], 0, 'Linhas mostram mudança ao longo do tempo; pizza mostra partes de um todo.']
      ],
      logica: [
        ['Se x = 5, o que faz "se x > 3 então escreva \'grande\' senão escreva \'pequeno\'"?', ['Escreve grande', 'Escreve pequeno', 'Não escreve nada'], 0, '5 é maior que 3, então a condição é verdadeira.'],
        ['Qual é o valor de "pontos" depois de: pontos = 0; repita 3 vezes: pontos = pontos + 5?', ['15', '5', '8'], 0, 'A cada volta do laço soma 5: 5, 10, 15.'],
        ['"VERDADEIRO E FALSO" resulta em:', ['FALSO', 'VERDADEIRO', 'Depende do dia'], 0, 'No E, as duas partes precisam ser verdadeiras.'],
        ['Dividir um problema grande em partes menores se chama:', ['Decomposição', 'Abstração', 'Compilação'], 0, 'Decompor ajuda a resolver uma parte de cada vez.']
      ]
    },
    avancado: {
      computador: [
        ['Por que um computador usa números binários (0 e 1)?', ['Os circuitos têm dois estados fáceis de distinguir: ligado e desligado', 'É mais bonito', 'Porque só existem dois números'], 0, 'Cada bit é um estado elétrico; combinando bits representamos qualquer número, letra ou cor.'],
        ['Quantos valores diferentes cabem em 1 byte (8 bits)?', ['256', '8', '16'], 0, '2 elevado a 8 é 256: de 0 a 255.'],
        ['Um processador com vários núcleos permite:', ['Executar várias tarefas em paralelo', 'Ter mais armazenamento', 'Usar menos energia sempre'], 0, 'Cada núcleo processa uma tarefa; o programa precisa saber dividir o trabalho.'],
        ['Drivers são:', ['Programas que ensinam o sistema a usar um dispositivo', 'Motoristas de entrega', 'Cabos de vídeo'], 0, 'Sem o driver certo, a impressora ou a placa de vídeo pode não funcionar.']
      ],
      arquivos: [
        ['Compactar um arquivo .zip funciona porque:', ['Ele encontra repetições e as descreve de forma mais curta', 'Ele apaga partes do arquivo', 'Ele diminui a resolução sempre'], 0, 'A compressão sem perda reconstrói o arquivo original igualzinho.'],
        ['Um JPG ocupa menos que um PNG da mesma foto porque:', ['O JPG descarta detalhes pouco percebidos (compressão com perda)', 'O JPG tem menos cores sempre', 'O PNG é um vídeo'], 0, 'Compressão com perda é ótima para fotos, mas cada salvamento perde um pouco.'],
        ['A regra 3-2-1 de backup diz:', ['3 cópias, em 2 meios diferentes, 1 fora de casa', '3 senhas, 2 e-mails, 1 pendrive', '3 pastas, 2 arquivos, 1 lixeira'], 0, 'Assim um único acidente (incêndio, roubo, defeito) não leva tudo.'],
        ['Permissões de arquivo (ler, escrever, executar) servem para:', ['Controlar quem pode fazer o que com cada arquivo', 'Deixar o arquivo menor', 'Mudar a extensão'], 0, 'Em sistemas com vários usuários, isso protege arquivos dos outros.']
      ],
      internet: [
        ['Qual a diferença entre a internet e a web?', ['A internet é a rede; a web é o serviço de páginas que roda nela', 'São a mesma coisa', 'A web é mais antiga'], 0, 'E-mail, jogos online e mensagens também usam a internet sem ser a web.'],
        ['O protocolo TCP garante que:', ['Os pacotes cheguem completos e na ordem, reenviando os perdidos', 'A internet seja grátis', 'Ninguém veja seus dados'], 0, 'Confiabilidade não é sigilo: para sigilo existe a criptografia (TLS, o "s" do https).'],
        ['Um endereço IPv4 como 192.168.0.1 tem:', ['4 números de 0 a 255', '4 letras', '8 números de 0 a 9'], 0, 'São 4 bytes; por isso cada parte vai de 0 a 255.'],
        ['Um deepfake é:', ['Vídeo ou áudio falso gerado por IA imitando uma pessoa real', 'Um site muito profundo', 'Um tipo de antivírus'], 0, 'Desconfie de vídeos chocantes de pessoas famosas e confira em fontes confiáveis.']
      ],
      seguranca: [
        ['Na criptografia de chave pública:', ['Qualquer um cifra com a chave pública, só o dono decifra com a privada', 'A chave privada é publicada', 'Não existe chave'], 0, 'É a base do https e das mensagens com criptografia de ponta a ponta.'],
        ['Ransomware é:', ['Um programa que sequestra arquivos e pede resgate', 'Um antivírus grátis', 'Um tipo de backup'], 0, 'Backup atualizado e fora do computador é a melhor defesa.'],
        ['Engenharia social é:', ['Enganar pessoas para conseguir acesso ou dados', 'Construir pontes', 'Programar redes sociais'], 0, 'O ponto fraco atacado é a confiança, não o computador.'],
        ['Um hash de senha (como SHA-256) é útil porque:', ['O site guarda só o resultado, não a senha em si', 'Deixa a senha mais curta', 'Mostra a senha para o suporte'], 0, 'Se o banco de dados vazar, as senhas originais não aparecem direto.']
      ],
      aplicativos: [
        ['=SE(B2>=6;"Aprovado";"Recuperação") faz o quê?', ['Mostra Aprovado se B2 for 6 ou mais, senão Recuperação', 'Soma B2 e 6', 'Apaga B2'], 0, 'A função SE testa uma condição e escolhe um de dois resultados.'],
        ['PROCV (ou VLOOKUP) serve para:', ['Procurar um valor numa tabela e trazer a informação da mesma linha', 'Contar palavras', 'Inserir imagens'], 0, 'Exemplo: digitar a matrícula e trazer o nome do estudante.'],
        ['Para contar quantos estudantes tiraram nota maior que 7, use:', ['=CONT.SE(B2:B30;">7")', '=SOMA(B2:B30)', '=MÁXIMO(B2:B30)'], 0, 'CONT.SE conta as células que obedecem ao critério.'],
        ['Em um documento compartilhado na nuvem, o modo sugestão serve para:', ['Propor mudanças que o autor aceita ou recusa', 'Apagar o texto dos outros', 'Bloquear o arquivo'], 0, 'Assim a turma colabora sem perder o texto original.']
      ],
      logica: [
        ['Uma função que chama a si mesma é:', ['Recursiva', 'Booleana', 'Constante'], 0, 'Precisa de um caso base para parar, senão nunca termina.'],
        ['Na busca binária numa lista ordenada de 1000 itens, no máximo quantos passos?', ['Cerca de 10', 'Cerca de 500', '1000'], 0, 'Cada passo corta a lista pela metade: 2 elevado a 10 é 1024.'],
        ['Em Python, o que imprime: for i in range(3): print(i)?', ['0, 1 e 2', '1, 2 e 3', '0, 1, 2 e 3'], 0, 'range(3) começa em 0 e para antes do 3.'],
        ['NÃO (A OU B) é o mesmo que:', ['(NÃO A) E (NÃO B)', '(NÃO A) OU (NÃO B)', 'A E B'], 0, 'É uma das leis de De Morgan, muito usada para simplificar condições.']
      ]
    }
  }
};
