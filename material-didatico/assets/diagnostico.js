/* =====================================================================
   Diagnóstico da turma (Computação, 6º ao 9º ano) — questões e códigos.
   A professora cria a turma no painel da área premium: ele sorteia uma chave e uma senha simples
   para cada estudante e gera o link da turma (material-didatico/diagnostico.html#DT1...).
   O link leva só o ano, o nome da turma, a chave e um resumo (hash) de cada senha: nenhum nome de estudante.
   O estudante digita a senha, responde e recebe um código de resposta (DR1...) para enviar à professora.
   O código é assinado com a chave da turma e a senha, então só confere no painel de quem criou a turma.
   Autora: Júlia Roberta Quoos Alves.
   ===================================================================== */
(function () {
  /* [habilidade, enunciado, alternativas, índice da correta]. Duas questões por habilidade, do 6º ao 9º ano. */
  const QUESTOES = [
    // ---------- 6º ano ----------
    ['EF06CO01', 'Uma lista tem: 12, "azul", 7, "verde", 30. Qual separação faz mais sentido?', ['Números grandes e números pequenos', 'Números (12, 7, 30) e palavras ("azul", "verde")', 'Itens do começo e itens do fim', 'Não dá para separar'], 1],
    ['EF06CO01', 'Num cadastro, qual informação é melhor guardar como verdadeiro ou falso?', ['O nome do aluno', 'A idade do aluno', 'Se o aluno usa o transporte escolar', 'O endereço do aluno'], 2],
    ['EF06CO02', 'Um robô deve regar 5 vasos iguais em fila. Qual instrução deixa o programa mais curto?', ['Escrever "regar e andar" cinco vezes', 'Repetir 5 vezes: regar e andar', 'Regar só o primeiro vaso', 'Andar até o fim e regar uma vez'], 1],
    ['EF06CO02', '"Se estiver chovendo, leve o guarda-chuva; senão, leve o boné." Que tipo de instrução é essa?', ['Repetição', 'Sequência sem escolha', 'Seleção (decisão)', 'Variável'], 2],
    ['EF06CO03', 'Qual instrução é precisa o bastante para um computador?', ['Ande um pouco para a frente', 'Vire para o lado certo', 'Ande 3 passos e vire 90 graus à direita', 'Vá até onde der'], 2],
    ['EF06CO03', 'Um colega seguiu sua receita de sanduíche e esqueceu o pão. O que isso mostra?', ['Que o colega errou de propósito', 'Que faltou um passo na descrição da solução', 'Que receitas não são algoritmos', 'Que o sanduíche não tinha recheio'], 1],
    ['EF06CO04', 'Para organizar uma festa da turma, o que é decompor o problema?', ['Desistir da festa', 'Dividir em partes menores: comida, música, convites e decoração', 'Fazer tudo de uma vez só', 'Pedir para outra turma fazer'], 1],
    ['EF06CO04', 'Por que dividir um problema grande em partes ajuda?', ['Porque cada parte fica mais simples de resolver e testar', 'Porque o problema desaparece', 'Porque assim não é preciso pensar', 'Porque o computador só aceita problemas pequenos'], 0],
    ['EF06CO05', 'Numa calculadora de média de notas, quais são as entradas?', ['A média final', 'As notas do aluno', 'A cor da tela', 'O nome da escola'], 1],
    ['EF06CO05', 'Num programa que converte metros em centímetros, qual é a saída esperada para 2 metros?', ['2', '20', '200', '2000'], 2],
    ['EF06CO06', 'Calcular a área de um quadrado de lado 3, de lado 5 e de lado 8. O que muda de um caso para o outro?', ['A fórmula', 'Só o valor do lado, que pode virar uma variável', 'A forma da figura', 'Nada muda'], 1],
    ['EF06CO06', 'Um programa diz "Olá, Ana" e outro diz "Olá, Bruno". Como fazer um só programa para todos?', ['Escrever um programa para cada nome', 'Usar uma variável nome e mostrar "Olá, " + nome', 'Mostrar sempre "Olá, Ana"', 'Não é possível'], 1],
    ['EF06CO07', 'Como uma foto viaja pela internet de um celular para outro?', ['Inteira, de uma só vez, por um fio direto', 'Dividida em pacotes que podem seguir caminhos diferentes e são juntados no destino', 'Pelo ar, sem passar por nenhum equipamento', 'Impressa e escaneada'], 1],
    ['EF06CO07', 'Se um pacote de dados se perde no caminho, o que costuma acontecer?', ['A mensagem inteira é apagada para sempre', 'O pacote que faltou é enviado de novo', 'O celular desliga', 'A internet para no mundo todo'], 1],
    ['EF06CO08', 'Para enviar 20 fotos por e-mail com menos espaço, o que ajuda?', ['Compactar as fotos num arquivo .zip', 'Mudar o nome das fotos', 'Mandar uma de cada vez sem anexo', 'Apagar as fotos'], 0],
    ['EF06CO08', 'A data em que uma foto foi tirada, guardada junto com o arquivo, é um exemplo de:', ['Vírus', 'Metadado', 'Senha', 'Hardware'], 1],
    ['EF06CO09', 'Num grupo da turma, um colega erra uma palavra. Qual é a atitude mais adequada?', ['Mandar print para outros grupos', 'Fazer piada até ele sair do grupo', 'Ignorar o erro ou ajudar com respeito, em particular', 'Escrever tudo em letras maiúsculas'], 2],
    ['EF06CO09', 'Escrever uma mensagem toda em LETRAS MAIÚSCULAS costuma passar a ideia de:', ['Calma', 'Grito', 'Segredo', 'Elogio'], 1],
    ['EF06CO10', 'O que é obsolescência programada?', ['Quando um produto é feito para durar pouco e ser trocado logo', 'Quando um programa é escrito em blocos', 'Quando a bateria carrega rápido', 'Quando o celular recebe atualização'], 0],
    ['EF06CO10', 'Qual destino é melhor para um celular velho que não funciona mais?', ['Lixo comum', 'Rio ou terreno baldio', 'Ponto de coleta de lixo eletrônico', 'Gaveta para sempre'], 2],
    // ---------- 7º ano ----------
    ['EF07CO01', 'Para guardar a temperatura de cada dia da semana, o que é mais adequado?', ['Uma única variável que muda todo dia', 'Uma lista (vetor) com 7 posições', 'Um texto com o nome da cidade', 'Nenhuma estrutura'], 1],
    ['EF07CO01', 'Uma ficha com nome, idade e turma de um aluno é um exemplo de:', ['Registro', 'Laço de repetição', 'Vírus', 'Senha'], 0],
    ['EF07CO02', 'O programa deveria mostrar a soma 2 + 3, mas mostra 23. Qual é o erro mais provável?', ['O computador está quebrado', 'Os números foram tratados como texto e juntados', 'A conta 2 + 3 dá 23', 'Faltou energia'], 1],
    ['EF07CO02', 'Qual é a melhor forma de encontrar um erro num programa?', ['Apagar tudo e começar de novo', 'Testar parte por parte e comparar o resultado com o esperado', 'Esperar o erro sumir', 'Pedir que o computador adivinhe'], 1],
    ['EF07CO03', 'A turma vai criar um quiz digital em grupo. Qual é um bom primeiro passo?', ['Cada um começar sem combinar nada', 'Combinar o objetivo e dividir as tarefas', 'Escolher só as cores', 'Copiar um quiz pronto'], 1],
    ['EF07CO03', 'Para guardar a nota de 30 alunos, o que é melhor do que 30 variáveis separadas?', ['Uma lista de notas', 'Um desenho', 'Uma senha', 'Um texto longo'], 0],
    ['EF07CO04', 'Num mapa de cidades ligadas por estradas, as cidades e as estradas são, num grafo:', ['Cores e números', 'Vértices e arestas', 'Entradas e saídas', 'Linhas e colunas'], 1],
    ['EF07CO04', 'Num grafo de amizades, o que significa uma pessoa ter muitas arestas?', ['Que ela tem muitas conexões', 'Que ela não tem amigos', 'Que ela é a mais velha', 'Nada'], 0],
    ['EF07CO05', 'Você escreveu um bloco que desenha um quadrado. Para desenhar 4 quadrados, o melhor é:', ['Reescrever o bloco 4 vezes', 'Reutilizar o mesmo bloco (função) 4 vezes', 'Desenhar só um', 'Desenhar um círculo'], 1],
    ['EF07CO05', 'Qual é uma vantagem de reutilizar partes de um programa?', ['O programa fica mais curto e é mais fácil de corrigir', 'O programa fica mais lento', 'O programa deixa de funcionar', 'Não há vantagem'], 0],
    ['EF07CO06', 'O que é um protocolo de comunicação?', ['Um conjunto de regras que os computadores seguem para trocar dados', 'Um tipo de cabo', 'Um jogo on-line', 'Uma marca de celular'], 0],
    ['EF07CO06', 'Quando você abre um site com "https", o "s" indica que:', ['O site é sobre esportes', 'A comunicação é protegida por criptografia', 'O site é mais rápido', 'O site é gratuito'], 1],
    ['EF07CO07', 'Qual destas senhas é mais segura?', ['123456', 'seu nome', 'Uma frase longa misturando palavras, números e símbolos', 'a data do seu aniversário'], 2],
    ['EF07CO07', 'Chegou uma mensagem: "Você ganhou um prêmio, clique aqui e informe sua senha". O que fazer?', ['Clicar e informar a senha', 'Repassar para os amigos', 'Não clicar e avisar um adulto: pode ser golpe', 'Responder com seus dados'], 2],
    ['EF07CO08', 'Num debate on-line, alguém pensa diferente de você. Qual atitude mostra empatia?', ['Ofender para ganhar a discussão', 'Ler com atenção e responder com respeito, mesmo discordando', 'Bloquear todo mundo', 'Inventar mentiras sobre a pessoa'], 1],
    ['EF07CO08', 'Antes de comentar num post polêmico, é bom perguntar a si mesmo:', ['Como meu comentário vai fazer a outra pessoa se sentir?', 'Quantas curtidas vou ganhar?', 'Quem eu posso atacar?', 'Nada, é só comentar'], 0],
    ['EF07CO09', 'Qual situação é cyberbullying?', ['Elogiar o trabalho de um colega', 'Postar montagens repetidas para humilhar um colega', 'Mandar a tarefa para o grupo', 'Combinar um trabalho on-line'], 1],
    ['EF07CO09', 'Se você vê um colega sofrendo cyberbullying, o que é mais adequado?', ['Compartilhar a postagem', 'Rir junto', 'Não espalhar, guardar provas e avisar um adulto de confiança', 'Responder com mais ofensas'], 2],
    // ---------- 8º ano ----------
    ['EF08CO01', 'Uma boneca russa tem outra igual dentro, que tem outra dentro... até a menor. Essa ideia lembra:', ['Recursão', 'Criptografia', 'Compactação', 'Hardware'], 0],
    ['EF08CO01', 'Numa solução recursiva, por que é preciso um caso base?', ['Para o programa saber quando parar', 'Para deixar o programa colorido', 'Para o programa nunca parar', 'Não é preciso'], 0],
    ['EF08CO02', 'Para guardar a lista de compras e poder incluir e tirar itens, o melhor é usar:', ['Uma lista', 'Um único número', 'Uma senha', 'Uma imagem'], 0],
    ['EF08CO02', 'Numa lista [10, 20, 30], ao incluir 40 no fim, a lista fica:', ['[40, 10, 20, 30]', '[10, 20, 30, 40]', '[10, 40]', '[40]'], 1],
    ['EF08CO03', 'Para achar um nome numa lista telefônica em ordem alfabética, o método mais rápido é:', ['Ler nome por nome desde o começo', 'Abrir no meio e descartar a metade que não serve, repetindo', 'Escolher uma página ao acaso', 'Ler de trás para a frente'], 1],
    ['EF08CO03', 'Ordenar [5, 2, 8, 1] em ordem crescente dá:', ['[8, 5, 2, 1]', '[1, 2, 5, 8]', '[5, 2, 8, 1]', '[2, 5, 1, 8]'], 1],
    ['EF08CO04', 'Num projeto de app para a escola, o que vem antes de programar?', ['Entender o problema e quem vai usar o app', 'Escolher o ícone', 'Publicar na loja', 'Fazer propaganda'], 0],
    ['EF08CO04', 'Por que testar o app com colegas antes de terminar?', ['Para descobrir problemas e melhorar a solução', 'Para perder tempo', 'Porque é obrigatório na loja', 'Não é preciso testar'], 0],
    ['EF08CO05', 'Quatro pessoas dobrando 100 folhas ao mesmo tempo, cada uma com 25, é um exemplo de:', ['Processamento paralelo', 'Compactação', 'Recursão', 'Criptografia'], 0],
    ['EF08CO05', 'Guardar fotos "na nuvem" significa guardá-las:', ['Só no seu celular', 'Em computadores de empresas, ligados pela internet', 'No céu, literalmente', 'Num pen drive'], 1],
    ['EF08CO06', 'O que faz um servidor DNS?', ['Traduz o nome de um site (como escola.com.br) para o endereço numérico do computador', 'Fabrica cabos', 'Apaga vírus', 'Carrega a bateria'], 0],
    ['EF08CO06', 'A internet é:', ['Um único computador gigante', 'Uma rede de muitas redes ligadas no mundo todo', 'Um aplicativo de celular', 'Uma marca de roteador'], 1],
    ['EF08CO07', 'Por que uma rede social mostra mais posts de certos assuntos para você?', ['Por acaso', 'Porque um algoritmo usa o que você curte e assiste para escolher o que mostrar', 'Porque todos veem as mesmas coisas', 'Porque os amigos escolhem'], 1],
    ['EF08CO07', 'Antes de compartilhar uma notícia surpreendente, é bom:', ['Compartilhar logo, para ser o primeiro', 'Conferir a fonte e procurar se outros sites confiáveis publicaram', 'Mudar o título', 'Mandar só para a família'], 1],
    ['EF08CO08', 'Qual destes é um dado pessoal sensível?', ['Sua cor favorita', 'Seu dado de saúde', 'O nome do seu time', 'O jogo de que você gosta'], 1],
    ['EF08CO08', 'Um joguinho grátis pede acesso aos seus contatos e à localização. O que fazer?', ['Aceitar tudo sem ler', 'Pensar se o jogo precisa disso e negar o que não for necessário', 'Mandar os contatos por mensagem', 'Desligar o celular'], 1],
    ['EF08CO09', 'Os termos de uso de uma plataforma dizem:', ['As regras do serviço e o que a empresa faz com seus dados', 'A senha do Wi-Fi', 'Os números da sorte', 'A previsão do tempo'], 0],
    ['EF08CO09', 'Muitas redes sociais pedem idade mínima de 13 anos nos termos. Isso existe para:', ['Proteger crianças de riscos e do uso dos seus dados', 'Vender mais celulares', 'Deixar a rede mais lenta', 'Nada, é enfeite'], 0],
    // ---------- 9º ano ----------
    ['EF09CO01', 'A árvore genealógica de uma família é um exemplo de estrutura de:', ['Árvore', 'Lista simples', 'Senha', 'Pacote'], 0],
    ['EF09CO01', 'O mapa do metrô, com estações e ligações, pode ser representado como:', ['Um grafo', 'Uma senha', 'Um número', 'Uma cor'], 0],
    ['EF09CO02', 'Num projeto em grupo para resolver um problema do bairro, o que ajuda a dividir o trabalho?', ['Separar as tarefas e combinar prazos', 'Cada um fazer tudo', 'Esperar o último dia', 'Deixar para o professor'], 0],
    ['EF09CO02', 'Depois de entregar a primeira versão de um projeto, o melhor é:', ['Nunca mais mexer', 'Ouvir quem usou e melhorar', 'Apagar tudo', 'Esconder os erros'], 1],
    ['EF09CO03', 'Um semáforo passa de verde para amarelo e de amarelo para vermelho. Isso pode ser descrito como:', ['Um autômato, com estados e transições', 'Uma lista de compras', 'Uma senha', 'Um vírus'], 0],
    ['EF09CO03', 'Numa máquina de refrigerante, inserir a moeda faz a máquina mudar de estado. A moeda é:', ['Um evento que causa a transição', 'Um estado final', 'Um protocolo de rede', 'Um metadado'], 0],
    ['EF09CO04', 'O que é ransomware?', ['Um programa que sequestra arquivos e pede pagamento para devolver', 'Um antivírus', 'Um tipo de cabo', 'Um jogo educativo'], 0],
    ['EF09CO04', 'Qual hábito mais protege contra ataques?', ['Nunca atualizar o sistema', 'Manter sistema e apps atualizados e fazer cópia de segurança', 'Usar a mesma senha em tudo', 'Baixar programas de qualquer site'], 1],
    ['EF09CO05', 'Trocar cada letra pela seguinte do alfabeto (A vira B, B vira C) é um exemplo de:', ['Criptografia', 'Compactação', 'Recursão', 'Ordenação'], 0],
    ['EF09CO05', 'Por que aplicativos de mensagem usam criptografia de ponta a ponta?', ['Para só quem envia e quem recebe conseguir ler', 'Para as mensagens chegarem coloridas', 'Para gastar menos bateria', 'Para apagar as mensagens'], 0],
    ['EF09CO06', 'A turma quer mapear buracos nas ruas do bairro. Qual ferramenta digital ajuda?', ['Um formulário com foto e localização, que gera um mapa', 'Um jogo de corrida', 'Um papel de parede', 'Uma calculadora'], 0],
    ['EF09CO06', 'Dados abertos da prefeitura sobre a coleta de lixo podem servir para:', ['Propor melhorias com base em evidências', 'Nada', 'Descobrir senhas', 'Fazer spam'], 0],
    ['EF09CO07', 'Uma câmera com reconhecimento facial na escola levanta qual questão?', ['Privacidade e uso dos dados das pessoas', 'A cor da câmera', 'O preço da merenda', 'Nenhuma'], 0],
    ['EF09CO07', 'Qual é um impacto socioambiental das tecnologias digitais?', ['O consumo de energia e água dos data centers', 'A cor dos aplicativos', 'O nome dos sites', 'O tamanho da fonte'], 0],
    ['EF09CO08', 'Por que nem todas as escolas do país têm a mesma internet e os mesmos computadores?', ['Porque os recursos de computação são distribuídos de forma desigual', 'Porque algumas escolas não querem', 'Porque internet é proibida', 'Porque é tudo igual'], 0],
    ['EF09CO08', 'Uma ação que diminui a desigualdade digital é:', ['Levar internet e formação para comunidades sem acesso', 'Cobrar mais caro pela internet', 'Fechar laboratórios', 'Proibir celulares para sempre'], 0],
    ['EF09CO09', 'Posso usar qualquer imagem da internet no meu trabalho publicado?', ['Sim, tudo na internet é livre', 'Depende da licença: é preciso ver se o uso é permitido e citar a autoria', 'Sim, se eu mudar a cor', 'Só de madrugada'], 1],
    ['EF09CO09', 'Postar a foto de um colega sem a autorização dele:', ['Não tem problema', 'Desrespeita o direito de imagem da pessoa', 'É obrigatório', 'Melhora a foto'], 1]
  ];

  const ANOS = [6, 7, 8, 9];
  /* Ordem oficial das alternativas (a mesma da versão em papel e das letras do código de resposta): cada questão gira as
     alternativas em (i * 3 + 1) % 4 posições, para a correta não ficar quase sempre em a ou b. */
  const girar = (q, i) => { const k = (i * 3 + 1) % 4; return { alts: q[2].map((_, j) => q[2][(j + k) % 4]), c: (q[3] - k + 4) % 4 }; };
  const doAno = ano => QUESTOES.map((q, i) => ({ i, hab: q[0], txt: q[1], ...girar(q, i) })).filter(q => +q.hab.slice(3, 4) === +ano);
  const habsDoAno = ano => [...new Set(doAno(ano).map(q => q.hab))];

  /* ---------- base64url e resumo ---------- */
  const b64 = {
    enc: bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''),
    dec: str => { str = str.replace(/-/g, '+').replace(/_/g, '/'); while (str.length % 4) str += '='; return Uint8Array.from(atob(str), c => c.charCodeAt(0)); }
  };
  async function sha(txt) { return new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt))); }
  const hex = b => [...b].map(x => x.toString(16).padStart(2, '0')).join('');
  const normal = s => String(s || '').trim().toLowerCase().replace(/\s+/g, '');

  /* Resumo de 2 bytes de cada senha, para o link da turma reconhecer o estudante sem levar o nome dele. */
  async function resumoSenha(chave, senha) { const h = await sha('dt1|' + chave + '|' + normal(senha)); return [h[0], h[1]]; }

  /* ---------- link da turma: DT1.<bytes>: versão, ano, 6 bytes de chave, n, 2 bytes por estudante, nome da turma ---------- */
  async function codigoTurma(t) { // t = {ano, nome, chave (12 hex), senhas: []}
    const nome = new TextEncoder().encode(String(t.nome || '').slice(0, 30));
    const bytes = [1, +t.ano, ...t.chave.match(/../g).map(x => parseInt(x, 16)), t.senhas.length];
    for (const s of t.senhas) bytes.push(...await resumoSenha(t.chave, s));
    return 'DT1.' + b64.enc(Uint8Array.from([...bytes, ...nome]));
  }
  function lerTurma(code) {
    code = String(code || '').trim().replace(/^#/, '').replace(/\s+/g, '');
    if (!code.startsWith('DT1.')) throw new Error('formato');
    const b = b64.dec(code.slice(4));
    if (b[0] !== 1 || !ANOS.includes(b[1])) throw new Error('formato');
    const chave = hex(b.slice(2, 8)), n = b[8], resumos = [];
    for (let i = 0; i < n; i++) resumos.push([b[9 + 2 * i], b[10 + 2 * i]]);
    const nome = new TextDecoder().decode(b.slice(9 + 2 * n));
    return { ano: b[1], chave, n, resumos, nome };
  }
  /* Número do estudante (1, 2, ...) pela senha, ou 0 se a senha não é desta turma. */
  async function numeroDaSenha(turma, senha) {
    const r = await resumoSenha(turma.chave, senha);
    const i = turma.resumos.findIndex(x => x[0] === r[0] && x[1] === r[1]);
    return i + 1;
  }

  /* ---------- código de resposta: DR1.<json> assinado com a chave da turma e a senha ---------- */
  const DIA = 864e5;
  async function assinar(chave, senha, n, d, resp) { return hex((await sha(['dr1', chave, normal(senha), n, d, resp].join('|'))).slice(0, 4)); }
  async function codigoResposta(turma, senha, n, resp) {
    const d = Math.floor(Date.now() / DIA);
    const s = await assinar(turma.chave, senha, n, d, resp);
    return 'DR1.' + b64.enc(new TextEncoder().encode(JSON.stringify({ k: turma.chave.slice(0, 4), n, d, r: resp, s })));
  }
  function lerResposta(code) {
    const o = JSON.parse(new TextDecoder().decode(b64.dec(String(code).trim().slice(4))));
    if (!o || typeof o.r !== 'string' || !o.n) throw new Error('formato');
    return o;
  }

  /* ---------- correção: acertos por habilidade (0, 1 ou 2) ---------- */
  function corrigir(ano, resp) {
    const qs = doAno(ano), porHab = {};
    qs.forEach((q, j) => { porHab[q.hab] = porHab[q.hab] || { ac: 0, tot: 0 }; porHab[q.hab].tot++; if (resp[j] === 'abcd'[q.c]) porHab[q.hab].ac++; });
    const acertos = qs.filter((q, j) => resp[j] === 'abcd'[q.c]).length;
    return { porHab, acertos, total: qs.length };
  }
  const SITUACAO = [
    { nome: 'Vamos começar', curto: 'Começar' },
    { nome: 'Em desenvolvimento', curto: 'Desenvolvendo' },
    { nome: 'Já sabe', curto: 'Já sabe' }
  ];

  /* Palavras simples para as senhas (sem acento, fáceis de ditar). */
  const PALAVRAS = ['lua', 'sol', 'mar', 'rio', 'flor', 'gato', 'pato', 'bola', 'casa', 'pipa', 'uva', 'kiwi', 'coco', 'mel', 'onda', 'nuvem', 'vento', 'chuva',
    'pao', 'leite', 'trem', 'barco', 'ponte', 'livro', 'lapis', 'tinta', 'cubo', 'dado', 'robo', 'chip', 'bit', 'pixel', 'tigre', 'urso', 'sapo', 'peixe', 'abelha',
    'folha', 'pedra', 'ilha', 'monte', 'estrela', 'cometa', 'radio', 'mapa', 'remo', 'vela', 'sino'];
  function senhaSimples(usadas) {
    const rnd = n => crypto.getRandomValues(new Uint32Array(1))[0] % n;
    for (;;) { const s = PALAVRAS[rnd(PALAVRAS.length)] + (10 + rnd(90)); if (!usadas.has(s)) return s; }
  }
  const novaChave = () => hex(crypto.getRandomValues(new Uint8Array(6)));

  window.MDD = { QUESTOES, ANOS, doAno, habsDoAno, codigoTurma, lerTurma, numeroDaSenha, resumoSenha, codigoResposta, lerResposta, assinar, corrigir,
    SITUACAO, senhaSimples, novaChave, normal };
})();
