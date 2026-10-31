/* Mundo do site: um jogo de vila em blocos, visto em perspectiva isométrica, em que cada casa é uma página do site.
   Tudo é desenhado por código (sem imagens de terceiros). As fases, as casas, as perguntas e os personagens vêm
   dos dados que o resto do site já usa: RECURSOS (dados.js), LISTAS (listas.js), SIMULADORES (sim-comum.js) e o
   progresso do MDP (progresso.js), então um jogo novo no material vira uma casa nova sem mexer aqui.
   Uma casa fica cinza até a atividade ser concluída: nos jogos, quando o jogo registra progresso no Meu progresso
   (MDP.registrar), que é o mesmo que a página do jogo usa; nos simuladores e guias, ao abrir. */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const MD = '../material-didatico/';
  const REC_ = typeof RECURSOS !== 'undefined' ? RECURSOS : [];
  const EST = typeof ESTATICAS !== 'undefined' ? ESTATICAS : {};
  const SIM = typeof SIMULADORES !== 'undefined' ? SIMULADORES : [];
  const LST = typeof LISTAS !== 'undefined' ? LISTAS : [];
  const urlRec = r => MD + (EST[r.id] || r.url);
  const anoDe = r => Math.min(...(r.anos || [6]));

  /* sorteio fixo: o mundo é sempre igual (os itens mudam a cada semana) */
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const SEMANA = Math.floor((Date.now() / 864e5 + 3) / 7);   // muda toda segunda-feira
  const HOJE0 = (() => { const m = /[?&]data=(\d{4})-(\d{2})-(\d{2})/.exec(location.search); const d = m ? new Date(+m[1], m[2] - 1, +m[3]) : new Date(); d.setHours(0, 0, 0, 0); return d; })();
  /* estações do hemisfério sul e o clima do dia (sorteado pela data: igual para todo mundo no mesmo dia) */
  const ESTACOES = {
    verao: { nome: 'Verão', ic: '☀️', grama: '#9bdc7c', folhas: ['#4fbf5f', '#6fcf7f', '#7fd36a'], flores: 1, item: 'melancia', climas: { sol: 5, chuva: 3, nublado: 1 }, texto: 'Dias longos e quentes, com chuvas rápidas no fim da tarde. As árvores ficam bem verdes.' },
    outono: { nome: 'Outono', ic: '🍂', grama: '#b9d98a', folhas: ['#f0a040', '#e5c14a', '#d9663a'], flores: 0.5, item: 'folha', climas: { sol: 3, nublado: 3, vento: 3, chuva: 1 }, texto: 'As folhas ficam laranjas e caem com o vento. Há menos flores pela vila.' },
    inverno: { nome: 'Inverno', ic: '❄️', grama: '#b7d8a8', folhas: ['#5f9f7a', '#7fae8f', '#c9d8d0'], flores: 0.25, item: 'pinhao', climas: { sol: 3, nublado: 2, neblina: 3, chuva: 1 }, texto: 'Manhãs frias com neblina. Época de pinhão e de agasalho!' },
    primavera: { nome: 'Primavera', ic: '🌸', grama: '#a6e08f', folhas: ['#6fcf7f', '#8fdc78', '#f5a9c8'], flores: 1.4, item: 'flor', climas: { sol: 4, nublado: 2, chuva: 2, vento: 1 }, texto: 'As cerejeiras florescem e o chão se enche de flores.' }
  };
  const CLIMAS = { sol: ['☀️', 'Sol', 'O pet fica mais alegre.'], nublado: ['⛅', 'Nublado', 'Nuvens passando pela vila.'], chuva: ['🌧️', 'Chuva', 'O pet se suja mais rápido: banho nele!'], vento: ['🌬️', 'Vento', 'Folhas voando pela vila.'], neblina: ['🌫️', 'Neblina', 'Fica difícil enxergar longe.'] };
  const EST_ID = ['verao', 'verao', 'outono', 'outono', 'outono', 'inverno', 'inverno', 'inverno', 'primavera', 'primavera', 'primavera', 'verao'][HOJE0.getMonth()];
  const ESTACAO = Object.assign({ id: EST_ID, chave: `${EST_ID}-${HOJE0.getFullYear() - (EST_ID === 'verao' && HOJE0.getMonth() < 2 ? 1 : 0)}` }, ESTACOES[EST_ID]);
  const CLIMA = (() => { const r = rng(Math.round(HOJE0 / 864e5) * 97 + 13)(), tot = Object.values(ESTACAO.climas).reduce((a, b) => a + b, 0); let acc = 0; for (const [k, w] of Object.entries(ESTACAO.climas)) { acc += w / tot; if (r < acc) return Object.assign({ id: k }, { ic: CLIMAS[k][0], nome: CLIMAS[k][1], efeito: CLIMAS[k][2] }); } return { id: 'sol', ic: '☀️', nome: 'Sol', efeito: CLIMAS.sol[2] }; })();

  /* ---------- conteúdo ---------- */
  const jogaveis = REC_.filter(r => (r.tipo === 'jogo' || r.tipo === '3d') && r.url);
  const lugarRec = r => ({ id: r.id, titulo: r.titulo, url: urlRec(r), icone: r.icone || '🎮', resumo: r.resumo || '', tipo: r.tipo, rec: r,
    extra: [r.comp && r.comp.map(c => c === 'CO' ? 'Computação' : 'Matemática').join(' e '), r.tempo ? '⏱ ' + r.tempo : ''].filter(Boolean).join(' · ') });
  const PROF = [
    { id: 'pg-ia', titulo: 'IA pra Prof', url: '../ia-pra-prof/', icone: '🤖', resumo: 'O guia de inteligência artificial para professores: o que é, como usar em aula e o que evitar.' },
    { id: 'pg-tech', titulo: 'Tech pra Prof', url: '../tech-pra-prof/', icone: '🧰', resumo: 'Quase 50 tecnologias e sites que facilitam a vida do professor, com filtros.' },
    { id: 'pg-prompts', titulo: 'Prompts prontos', url: '../prompts-para-professores/', icone: '📋', resumo: 'Biblioteca de prompts de IA para planejar aulas, corrigir e criar atividades.' },
    { id: 'pg-material', titulo: 'Material didático', url: MD, icone: '📚', resumo: 'Planos de aula, fichas, listas e slides organizados pela BNCC de Computação e Matemática.' },
    { id: 'pg-bncc', titulo: 'BNCC na prática', url: MD + 'bncc.html', icone: '📐', resumo: 'Habilidade por habilidade: o que ensinar e com qual material.' },
    { id: 'pg-planos', titulo: 'Planos de aula', url: MD + 'professor.html', icone: '🧑‍🏫', resumo: 'Planos prontos, com objetivos, etapas, avaliação e acessibilidade.' },
    { id: 'pg-formacao', titulo: 'Formação continuada em IA', url: '../formacao-continuada/', icone: '🎓', resumo: 'Formação de professores em IA para escolas e redes de ensino.' },
    { id: 'pg-mentoria', titulo: 'Mentoria para professores', url: '../mentoria/', icone: '🤝', resumo: 'Acompanhamento individual para levar IA e Computação para a sua aula.' },
    { id: 'pg-quiz', titulo: 'Quiz de pensamento computacional', url: '../quiz-pensamento-computacional/', icone: '🧩', resumo: '12 perguntas sobre decomposição, padrões, abstração e algoritmos.' },
    { id: 'pg-blog', titulo: 'Blog', url: '../blog/', icone: '📰', resumo: 'Textos sobre IA na escola, BNCC de Computação e Matemática.' },
    { id: 'pg-assistente', titulo: 'Assistente do site', url: '../assistente/', icone: '💬', resumo: 'Pergunte sobre o material e a IA responde com base nas páginas do site.' }
  ].map(p => Object.assign(p, { tipo: 'pagina', extra: 'Para professores' }));

  /* caminho: cor do caminho de cada fase (tons pastel); marco: o monumento da praça */
  /* Campus do Ensino Médio: desafios dentro do próprio mundo (redes, banco de dados e IA); a 1ª alternativa é a certa */
  const TAB_ALUNOS = '<table class="em-tab"><tr><th>nome</th><th>idade</th><th>turma</th></tr><tr><td>Ana</td><td>16</td><td>2A</td></tr><tr><td>Bruno</td><td>17</td><td>3A</td></tr><tr><td>Carla</td><td>15</td><td>1A</td></tr><tr><td>Davi</td><td>17</td><td>2A</td></tr></table><p class="muted small">Tabela <code>alunos</code></p>';
  const DESAFIOS_EM = [
    { id: 'em-rotas', titulo: 'Rota do pacote', icone: '📦', eixos: ['MD'], resumo: 'Como os dados viajam pela internet: rotas, TCP, UDP e DNS.', qs: [
      { html: '<p class="em-grafo">A ─2 ms─ B ─2 ms─ D<br>A ─1 ms─ C ─5 ms─ D</p>', enun: 'Um pacote sai do roteador A e vai até D. Qual é o caminho mais rápido?', alts: ['A → B → D (4 ms)', 'A → C → D (6 ms)', 'A → D direto', 'A → C → B → D'], coment: 'Somamos os tempos de cada caminho: 2 + 2 = 4 ms contra 1 + 5 = 6 ms. Não há ligação direta A–D nem C–B.' },
      { enun: 'Qual protocolo confere se todos os pacotes chegaram e na ordem certa, pedindo de novo os que se perderam?', alts: ['TCP', 'UDP', 'HTML', 'USB'], coment: 'O TCP numera os pacotes e confirma a entrega. O UDP só envia, sem conferir.' },
      { enun: 'Para que serve o DNS?', alts: ['Traduzir nomes como ohtopico.com.br em endereços IP', 'Apagar vírus do computador', 'Guardar as senhas dos sites', 'Desenhar as páginas na tela'], coment: 'O DNS funciona como uma agenda: você sabe o nome, ele descobre o número (IP).' },
      { enun: 'Chamadas de vídeo ao vivo costumam usar UDP. Por quê?', alts: ['É mais rápido, e perder um pedacinho é melhor do que esperar', 'É mais seguro que o TCP', 'Só ele funciona no Wi-Fi', 'Ele comprime o vídeo sozinho'], coment: 'No ao vivo, esperar um pacote perdido atrasaria tudo; melhor seguir em frente.' } ] },
    { id: 'em-ip', titulo: 'Endereços e máscaras', icone: '🌐', eixos: ['MD'], resumo: 'Endereços IPv4 e IPv6, redes /24 e máscaras.', qs: [
      { enun: 'Na rede 192.168.1.0/24, qual endereço está na mesma rede que 192.168.1.10?', alts: ['192.168.1.200', '192.168.2.10', '10.0.0.10', '192.169.1.10'], coment: 'Com /24, os três primeiros números (24 bits) identificam a rede: 192.168.1.' },
      { enun: 'Quantos bits tem um endereço IPv4?', alts: ['32', '8', '64', '128'], coment: 'São 4 números de 8 bits (0 a 255): 4 × 8 = 32 bits. O IPv6 tem 128.' },
      { enun: 'Por que o IPv6 foi criado?', alts: ['Os endereços IPv4 estavam acabando', 'O IPv4 não funcionava no celular', 'Para deixar os sites coloridos', 'Para acabar com o Wi-Fi'], coment: '32 bits dão cerca de 4,3 bilhões de endereços: pouco para tantos aparelhos.' },
      { enun: 'Numa rede /24, quantos bits sobram para numerar os computadores?', alts: ['8', '24', '16', '4'], coment: '32 − 24 = 8 bits, ou seja, 256 combinações (254 aparelhos, tirando rede e broadcast).' } ] },
    { id: 'em-sql', titulo: 'Consultas SQL', icone: '🗃️', eixos: ['PC'], resumo: 'Perguntas a um banco de dados com SELECT, WHERE, COUNT e ORDER BY.', qs: [
      { html: TAB_ALUNOS, enun: 'O que esta consulta devolve? <code>SELECT nome FROM alunos WHERE idade = 17;</code>', alts: ['Bruno e Davi', 'Ana e Davi', 'Só Bruno', 'Todos os alunos'], coment: 'O WHERE filtra as linhas: só Bruno e Davi têm 17 anos.' },
      { html: TAB_ALUNOS, enun: 'E esta? <code>SELECT COUNT(*) FROM alunos WHERE turma = \'2A\';</code>', alts: ['2', '1', '3', '4'], coment: 'COUNT conta as linhas que passaram no filtro: Ana e Davi.' },
      { html: TAB_ALUNOS, enun: 'Qual consulta lista os nomes do mais novo para o mais velho?', alts: ['SELECT nome FROM alunos ORDER BY idade;', 'SELECT nome FROM alunos ORDER BY idade DESC;', 'SELECT idade FROM nome;', 'DELETE FROM alunos;'], coment: 'ORDER BY ordena em ordem crescente; DESC inverte. E cuidado: DELETE apaga!' },
      { html: TAB_ALUNOS, enun: 'O que devolve <code>SELECT nome FROM alunos WHERE idade &gt; 15 AND turma = \'2A\';</code>?', alts: ['Ana e Davi', 'Só Carla', 'Bruno e Davi', 'Só Ana'], coment: 'Com AND, as duas condições precisam valer: mais de 15 anos e turma 2A.' } ] },
    { id: 'em-chaves', titulo: 'Tabelas e chaves', icone: '🔑', eixos: ['PC', 'CD'], resumo: 'Chave primária, chave estrangeira, redundância e LGPD.', qs: [
      { enun: 'Qual coluna é a melhor chave primária para a tabela de alunos de uma escola?', alts: ['Número de matrícula', 'Nome', 'Idade', 'Turma'], coment: 'A chave primária não pode se repetir. Dois alunos podem ter o mesmo nome, mas não a mesma matrícula.' },
      { enun: 'Para que serve uma chave estrangeira?', alts: ['Ligar uma tabela a outra, apontando para a chave primária dela', 'Trancar o banco com senha', 'Traduzir os dados para outra língua', 'Apagar linhas repetidas'], coment: 'Ex.: a tabela de notas guarda a matrícula do aluno para ligar cada nota à pessoa certa.' },
      { enun: 'O nome da professora está repetido em 300 linhas e ela muda de nome. Qual é o problema?', alts: ['É preciso mudar 300 linhas, e se faltar alguma os dados ficam inconsistentes', 'Nenhum problema', 'O banco apaga a professora sozinho', 'O computador fica sem bateria'], coment: 'Por isso separamos os dados em tabelas ligadas por chaves (normalização).' },
      { enun: 'Pela LGPD, o que a escola deve fazer com os dados dos estudantes no banco de dados?', alts: ['Usar só para a finalidade informada e protegê-los', 'Vender para empresas de propaganda', 'Publicar todos na internet', 'Guardar para sempre sem cuidado'], coment: 'A Lei Geral de Proteção de Dados exige finalidade, transparência e segurança.' } ] },
    { id: 'em-knn', titulo: 'Como uma IA aprende', icone: '🧭', eixos: ['PC', 'CD'], resumo: 'Vizinhos mais próximos, treino e teste, sobreajuste e acurácia.', qs: [
      { enun: 'Um classificador k-NN com k = 3 olha as 3 frutas mais parecidas com uma fruta nova: 2 são laranjas e 1 é limão. O que ele prevê?', alts: ['Laranja', 'Limão', 'Metade de cada', 'Não dá para prever'], coment: 'O k-NN vota pela maioria dos vizinhos mais próximos.' },
      { enun: 'Por que separamos os dados em treino e teste?', alts: ['Para medir se o modelo acerta exemplos que ele nunca viu', 'Para gastar menos energia', 'Porque os dados de teste são mais bonitos', 'Para o modelo decorar as respostas'], coment: 'Testar com dados novos mostra se o modelo aprendeu ou só decorou.' },
      { enun: 'Um modelo acertou 99% no treino e só 60% no teste. Isso indica...', alts: ['Sobreajuste: ele decorou os exemplos de treino', 'Que o teste está errado', 'Que o modelo é perfeito', 'Falta de internet'], coment: 'Sobreajuste (overfitting): vai muito bem no que já viu e mal no que é novo.' },
      { enun: 'De 100 e-mails, 90 são normais e 10 são spam. Um modelo que responde "normal" para todos tem que acurácia?', alts: ['90%, mas não acha nenhum spam', '100%', '10%', '50%'], coment: 'Acurácia alta pode enganar quando as classes são desiguais. Por isso olhamos também a matriz de confusão.' } ] },
    { id: 'em-etica', titulo: 'IA responsável', icone: '⚖️', eixos: ['CD'], resumo: 'Viés, alucinação, consentimento e deepfakes.', qs: [
      { enun: 'Uma IA que escolhe estagiários foi treinada com currículos antigos, quase todos de homens. Qual é o risco?', alts: ['Repetir o viés e prejudicar as candidatas', 'Nenhum: IA é sempre neutra', 'A IA ficar mais lenta', 'Os currículos sumirem'], coment: 'A IA aprende os padrões dos dados, inclusive os injustos.' },
      { enun: 'Um chatbot inventou uma referência de livro que não existe. Como isso se chama?', alts: ['Alucinação', 'Criptografia', 'Compilação', 'Backup'], coment: 'Modelos de linguagem geram texto provável, não verificado: sempre confira as fontes.' },
      { enun: 'Antes de usar fotos de rostos de pessoas para treinar uma IA, é preciso...', alts: ['Ter o consentimento delas e seguir a LGPD', 'Só baixar da internet', 'Mudar as cores das fotos', 'Nada, foto é pública'], coment: 'Rosto é dado pessoal sensível (biométrico).' },
      { enun: 'O que é um deepfake?', alts: ['Um vídeo, áudio ou imagem falso feito com IA para parecer real', 'Um tipo de antivírus', 'Uma rede social', 'Um cabo de internet'], coment: 'Desconfie de vídeos chocantes e confira em fontes confiáveis antes de compartilhar.' } ] }
  ];
  const LUGARES_EM = DESAFIOS_EM.map(d => ({ id: d.id, titulo: d.titulo, icone: d.icone, resumo: d.resumo, tipo: 'em', desafio: d }));
  const PERGUNTAS_EM = DESAFIOS_EM.flatMap(d => d.qs.map((q, i) => ({ id: `${d.id}-${i}`, enun: (q.html || '') + q.enun, alts: q.alts, certa: 0, coment: q.coment, eixos: d.eixos })));
  const FASES = [
    { id: 'vila', nome: 'Vila do Começo', sub: 'Primeiros passos · Computação do 6º ano', ano: 6, caminho: '#f7c6d9', marco: 'fonte', icone: '🏡', filtro: r => anoDe(r) <= 6 && r.comp.includes('CO'),
      placa: 'Bem-vindo! Cada casa desta vila é um jogo. Ela fica cinza até você jogar e vira colorida quando a atividade é concluída. Converse com as pessoas, pegue os livros do chão, as maçãs das árvores e entre nas casas. Com uma picareta, as rochas dão pedra e, às vezes, diamantes.' },
    { id: 'praca', nome: 'Praça dos Números', sub: 'Matemática do 6º ano', ano: 6, caminho: '#fbe3a6', marco: 'abaco', icone: '🔢', filtro: r => anoDe(r) <= 6 && !r.comp.includes('CO'),
      placa: 'Aqui os jogos são de Matemática: frações, figuras, tabuada e muito mais.' },
    { id: 'padroes', nome: 'Bairro dos Padrões', sub: '7º ano', ano: 7, caminho: '#dccbf5', marco: 'xadrez', icone: '🧱', filtro: r => anoDe(r) === 7,
      placa: 'Registros, matrizes, bugs e internet: os jogos do 7º ano moram aqui.' },
    { id: 'redes', nome: 'Cidade das Redes', sub: '8º ano', ano: 8, caminho: '#fdd2b5', marco: 'antena', icone: '📡', filtro: r => anoDe(r) === 8,
      placa: 'Recursão, paralelismo, redes sociais e segurança: a cidade do 8º ano.' },
    { id: 'ia', nome: 'Vale da Inteligência', sub: '9º ano', ano: 9, caminho: '#c9efd9', marco: 'robo', icone: '🤖', filtro: r => anoDe(r) >= 9,
      placa: 'Inteligência artificial, criptografia, grafos e autômatos: o vale do 9º ano.' },
    { id: 'lab', nome: 'Laboratório dos Simuladores', sub: 'IA, estatística e arquitetura', ano: 9, caminho: '#c4e8f5', marco: 'cupula', icone: '🔬',
      lugares: SIM.map(s => ({ id: 'sim-' + s.id, titulo: s.titulo, url: '../simuladores/' + s.url, icone: s.ia ? '🧠' : '🔬', resumo: s.resumo || '', tipo: 'sim',
        extra: (s.niveis || []).map(n => (typeof NIVEIS !== 'undefined' && NIVEIS[n]) || n).join(' · ') })),
      placa: 'Cada prédio é um simulador: redes neurais, regressão, bases numéricas, cache, pipeline... Abra e experimente.' },
    { id: 'medio', nome: 'Campus do Ensino Médio', sub: 'Redes, banco de dados e IA', ano: 10, caminho: '#d6e4f0', marco: 'servidor', icone: '🎓', lugares: LUGARES_EM, perguntasProprias: PERGUNTAS_EM,
      placa: 'Bem-vindo ao Ensino Médio! Cada prédio é um desafio aqui mesmo no mundo: redes, banco de dados e inteligência artificial.' },
    { id: 'escola', nome: 'Escola dos Professores', sub: 'Guias, formação e mentoria', ano: 9, caminho: '#f5d6e6', marco: 'sino', icone: '🍎', lugares: PROF,
      placa: 'A escola é para quem ensina: guias de IA e tecnologia, prompts, planos de aula, formação e mentoria.' },
    // a sala do professor de Matemática: todos os jogos de Matemática do 6º ao 9º ano, aberta desde o começo (portão oeste da Vila do Começo)
    { id: 'matematica', nome: 'Sala da Matemática', sub: 'Matemática do 6º ao 9º ano', ano: 6, caminho: '#fde7b0', marco: 'abaco', icone: '📐', aberta: true,
      filtro: r => !r.comp.includes('CO'), todaMatematica: true,
      placa: 'A sala do Professor Malba: todos os jogos de Matemática do 6º ao 9º ano num lugar só. Ela fica aberta desde o começo, pelo portão oeste da Vila do Começo.' }
  ];
  const NOMES = ['Professora Maria', 'Seu Antônio', 'Dona Lúcia', 'Teco', 'Bia', 'Professor Carlos', 'Nina', 'Dudu', 'Vovó Rosa', 'Léo', 'Dona Cida', 'Juca', 'Mel', 'Seu Pedro', 'Lara', 'Kauã', 'Professora Ana', 'Rafa', 'Dona Zefa', 'Gui'];
  const PASTEIS = ['#f7a8c4', '#a8d8f7', '#c7b4f2', '#ffd58a', '#a8e6b8', '#ffb38a', '#f2e48a', '#9fe3dc'];
  const PELES = ['#f6d7bd', '#f3c9a6', '#d9a579', '#a9714b', '#6f4a2d'];
  const CABELOS = ['#3a2416', '#111111', '#8a5a2b', '#d6a93b', '#c2c2c2', '#e0564a', '#9a6bd6'];
  const ROUPAS = ['#3f8fe0', '#e0564a', '#4bb259', '#f6b73c', '#9a6bd6', '#2bb3b1', '#e07bb0', '#ffffff', '#333333'];

  /* itens do chão: livro mostra uma dica, os outros vão para o inventário (a maçã fica numa árvore; o diamante vem das rochas e pede uma pergunta) */
  const ITENS = { livro: ['📘', 'Livro'], diamante: ['💎', 'Diamante'], estrela: ['⭐', 'Estrela'], maca: ['🍎', 'Maçã'], chave: ['🔑', 'Chave'], peca: ['🧩', 'Peça de quebra-cabeça'],
    // vendidos nas lojas (só aparecem no inventário depois de comprados)
    petisco: ['🦴', 'Petisco'], sabonete: ['🧼', 'Sabonete'], brinquedo: ['🧸', 'Brinquedo'], suco: ['🧃', 'Suco'], bolo: ['🍰', 'Bolo'], sanduiche: ['🥪', 'Sanduíche'],
    panetone: ['🍞', 'Panetone'], uvas: ['🍇', 'Uvas da sorte'], picole: ['🍦', 'Picolé'], ovoChoc: ['🍫', 'Ovo de chocolate'], pipoca: ['🍿', 'Pipoca'], pirulito: ['🍭', 'Pirulito'], cupcake: ['🧁', 'Cupcake'], docinho: ['🍬', 'Doce de abóbora'],
    isca: ['🪱', 'Isca'], peixe: ['🐟', 'Peixe'], peixeColorido: ['🐠', 'Peixe colorido'], camarao: ['🦐', 'Camarão'] };
  const LOJAS = {
    roupa: { fase: 0, nome: 'Loja de Roupas', ic: '👕', cor: '#f7a8c4', toldo: '#e0564a', texto: 'Acessórios e cores novas para o seu avatar.' },
    comida: { fase: 1, nome: 'Mercadinho', ic: '🍎', cor: '#ffd58a', toldo: '#4bb259', texto: 'Comidinhas para o pet e os moradores, ferramentas para juntar madeira e pedra, e vara e iscas para pescar.' },
    pet: { fase: 2, nome: 'Pet Shop', ic: '🐾', cor: '#a8d8f7', toldo: '#3f8fe0', texto: 'Petiscos, banho e acessórios para o seu bichinho.' },
    moveis: { fase: 3, nome: 'Loja de Móveis', ic: '🛋️', cor: '#c7b4f2', toldo: '#9a6bd6', texto: 'Móveis prontos para a sua casa e 📜 plantas que ensinam a bancada a fazer móveis novos.' }
  };
  /* projetos coletivos: cada aluno doa a sua parte; quando a turma soma a meta, a professora gera o código de conclusão */
  const PROJETOS = [
    { id: 'biblioteca', nome: 'Biblioteca da turma', ic: '📚', cor: '#e07b5a', meta: { livro: 3, estrela: 1 }, texto: 'Um lugar para guardar as dicas e os livros que a turma juntou.' },
    { id: 'laboratorio', nome: 'Laboratório de computação', ic: '🔬', cor: '#3f8fe0', meta: { diamante: 2, chave: 1 }, texto: 'Computadores e robôs para a turma experimentar.' },
    { id: 'horta', nome: 'Horta da escola', ic: '🥕', cor: '#4bb259', meta: { maca: 3, estrela: 1 }, texto: 'Uma horta com sensores que regam sozinhos.' },
    { id: 'observatorio', nome: 'Observatório', ic: '🔭', cor: '#9a6bd6', meta: { diamante: 2, estrela: 2 }, texto: 'Uma cúpula para olhar o céu e medir as estrelas.' }
  ];
  Object.assign(ITENS, { madeira: ['🪵', 'Madeira'], pedra: ['🪨', 'Pedra'], tomate: ['🍅', 'Tomate da horta'], cenoura: ['🥕', 'Cenoura da horta'], alface: ['🥬', 'Alface da horta'] });   // recursos: só com o machado e a picareta da loja
  Object.assign(ITENS, { flor: ['🌸', 'Flor de primavera'], melancia: ['🍉', 'Melancia de verão'], folha: ['🍁', 'Folha de outono'], pinhao: ['🌰', 'Pinhão de inverno'] });
  const ITENS_LOJA = new Set(['tomate', 'cenoura', 'alface', 'madeira', 'pedra', 'isca', 'peixe', 'peixeColorido', 'camarao', 'flor', 'melancia', 'folha', 'pinhao', 'petisco', 'sabonete', 'brinquedo', 'suco', 'bolo', 'sanduiche', 'panetone', 'uvas', 'picole', 'ovoChoc', 'pipoca', 'pirulito', 'cupcake', 'docinho']);
  const SORTEIO_ITENS = ['livro', 'maca', 'estrela', 'livro', 'maca', 'chave', 'estrela', 'peca'];   // os diamantes saem das rochas, com a picareta
  const DICAS = [
    'O computador guarda tudo em <strong>binário</strong>: só 0 e 1. Com 8 bits (um byte) dá para escrever 256 números diferentes, de 0 a 255.',
    'Um <strong>algoritmo</strong> é uma sequência de passos bem definidos para resolver um problema. Uma receita de bolo é um algoritmo!',
    'Na internet, as mensagens viajam em <strong>pacotes</strong>. Cada pacote leva o endereço de destino, o de origem e o número de ordem.',
    'Uma <strong>senha forte</strong> é longa e misturada: uma frase com números e símbolos é mais segura que uma palavra curta.',
    '<strong>Repetição</strong> (laço) evita escrever o mesmo comando muitas vezes: “repita 4 vezes: ande e vire” desenha um quadrado.',
    'Cada cor da tela é feita de três luzes: <strong>vermelho, verde e azul (RGB)</strong>, cada uma de 0 a 255.',
    'Um <strong>bug</strong> é um erro no programa. O nome vem de uma mariposa encontrada dentro de um computador em 1947.',
    '<strong>Decompor</strong> é dividir um problema grande em partes menores, mais fáceis de resolver uma de cada vez.',
    'A <strong>Cifra de César</strong> troca cada letra pela que está algumas posições à frente no alfabeto. Com chave 3, A vira D.',
    'Uma <strong>variável</strong> é como uma caixa com nome onde o programa guarda um valor que pode mudar.',
    'A <strong>inteligência artificial</strong> aprende padrões a partir de muitos exemplos. Se os exemplos têm preconceito, ela aprende o preconceito junto.',
    'Um <strong>grafo</strong> tem vértices (pontos) e arestas (ligações). Mapas, redes sociais e a internet são grafos.',
    'A <strong>recursão</strong> acontece quando uma função chama a si mesma, com um problema menor, até chegar a um caso simples.',
    '<strong>Fila</strong>: o primeiro que entra é o primeiro que sai. <strong>Pilha</strong>: o último que entra é o primeiro que sai.',
    'Antes de compartilhar uma notícia, confira a <strong>fonte</strong>, a data e se outros sites confiáveis dizem o mesmo.',
    'O <strong>processador</strong> (CPU) executa as instruções; a <strong>memória RAM</strong> guarda o que está em uso agora; o <strong>armazenamento</strong> guarda os arquivos.',
    'Um <strong>condicional</strong> (se... senão) faz o programa escolher um caminho: se chover, leve o guarda-chuva; senão, leve o boné.',
    'Seus <strong>dados pessoais</strong> (nome, endereço, CPF, fotos) valem muito. Pense duas vezes antes de colocar em formulários e jogos.',
    'Um <strong>modelo de linguagem</strong> escolhe a próxima palavra pela probabilidade. Por isso ele pode inventar coisas: sempre confira.',
    '<strong>Paralelismo</strong> é fazer várias tarefas ao mesmo tempo, como vários cozinheiros dividindo os pedidos de um restaurante.',
    'Na <strong>busca binária</strong>, você olha o meio da lista ordenada e descarta metade a cada passo. Em 1000 itens, bastam 10 olhadas!',
    'Um <strong>autômato</strong> (máquina de estados) muda de estado conforme o que recebe, como um semáforo ou uma catraca.',
    'Lixo eletrônico tem metais tóxicos. Pilhas, celulares e computadores velhos vão para <strong>pontos de coleta</strong>, não para o lixo comum.',
    '<strong>Abstração</strong> é ignorar os detalhes que não importam. O mapa do metrô não mostra as curvas reais, só as estações e ligações.',
    'Com <strong>hexadecimal</strong> (base 16), um byte cabe em dois dígitos: 255 em decimal é FF em hexadecimal.',
    'Um <strong>registro</strong> junta informações diferentes de uma mesma coisa, como a ficha de um aluno: nome, idade e turma.',
    'Do outro lado da tela tem gente: trate os outros na internet como você gostaria de ser tratado.',
    '<strong>Backup</strong> é uma cópia de segurança. Se o computador estragar ou for atacado por vírus, os arquivos não se perdem.'
  ];

  /* habilidades: os eixos da BNCC de Computação e as unidades temáticas de Matemática (EIXOS e HAB vêm de dados.js) */
  const EIXOS_ = typeof EIXOS !== 'undefined' ? EIXOS : {};
  const HAB_ = typeof HAB !== 'undefined' ? HAB : {};
  const ICONE_EIXO = { PC: '🧩', MD: '💻', CD: '🌐', NU: '🔢', AL: '🔣', GE: '📐', GM: '📏', PE: '🎲' };
  function eixosDe(habs) { return [...new Set((habs || []).map(h => HAB_[h] && HAB_[h].eixo).filter(Boolean))]; }
  /* habilidades da BNCC (códigos como EF07CO07) de cada missão: os jogos trazem as deles, as perguntas herdam as da lista ou do
     tema do morador, e os simuladores, os desafios do Ensino Médio e o mistério usam as tabelas abaixo */
  const HABS_SIM = { 'proxima-palavra': ['EM13CO10'], regressao: ['EM13CO11', 'EM13CO12'], 'matriz-confusao': ['EM13CO10', 'EM13CO12'], 'rede-neural': ['EM13CO10'],
    significancia: ['EM13CO12'], bases: ['EF06CO08'], estatistica: ['EM13CO12', 'EF08MA25'], mips: ['EM13CO04'], cache: ['EM13CO03'], pipeline: ['EM13CO03'], 'cpu-por-dentro': ['EM13CO04'] };
  const HABS_EM = { 'em-rotas': ['EM13CO07'], 'em-ip': ['EM13CO07'], 'em-sql': ['EM13CO13'], 'em-chaves': ['EM13CO13', 'EM13CO26'], 'em-knn': ['EM13CO10', 'EM13CO12'], 'em-etica': ['EM13CO10', 'EM13CO14'] };
  const HABS_MISTERIO = ['EF07CO07', 'EF08CO10', 'EF09CO04'];
  const habsValidas = hs => (hs || []).filter(h => HAB_[h]);
  const uniao = listas => [...new Set(listas.flat())].filter(h => HAB_[h]).sort();
  const habsLugar = l => l.rec ? l.rec.habs || [] : l.tipo === 'sim' ? HABS_SIM[l.id.slice(4)] || [] : l.tipo === 'em' ? HABS_EM[l.id] || [] : [];
  const bancosDe = fid => (window.PERGUNTAS_NPC || {})[fid] || [];
  function habsPergunta(id) {
    if (id.startsWith('n:')) { const [, fid, k] = id.split(':'), b = bancosDe(fid)[+k]; return b ? b.habs || [] : []; }
    if (id.startsWith('golpe:')) return ['EF07CO07', 'EF08CO08'];
    if (id.startsWith('circ:')) return ['EF06CO01', 'EF06CO02'];
    if (id.startsWith('pixel:')) return ['EF06MA16'];
    if (id.startsWith('em-')) return HABS_EM[id.replace(/-\d+$/, '')] || [];
    const p = PERG_POR_ID.get(id); return p ? p.habs || [] : [];
  }
  /* habilidade → quantas atividades concluídas e perguntas acertadas a trabalharam (vai no código de progresso) */
  function habsTrabalhadas() {
    const c = {}, soma = hs => { for (const h of new Set(habsValidas(hs))) c[h] = (c[h] || 0) + 1; };
    for (const l of todosLugares) if (S.feitos[l.id]) soma(habsLugar(l));
    for (const [id, v] of Object.entries(S.resp)) if (v === true) soma(habsPergunta(id));
    if (S.misterio && S.misterio.resolvido) soma(HABS_MISTERIO);
    for (const m of Object.values(S.missoesProf || {})) if (Object.values(m.r).some(Boolean)) soma(m.h);
    return c;
  }
  const detalheHabs = (hs, feitas) => `<details class="habs-det"><summary>BNCC: ${hs.length} habilidade${hs.length > 1 ? 's' : ''}${feitas ? ` · ${hs.filter(h => feitas[h]).length} trabalhada${hs.filter(h => feitas[h]).length === 1 ? '' : 's'}` : ''}</summary>${chipsHabs(hs, feitas)}</details>`;
  const chipsHabs = (hs, feitas) => hs.length ? `<span class="habs">${hs.map(h => `<abbr class="hab ${feitas && feitas[h] ? 'ok' : ''}" title="${esc(HAB_[h].objeto + ': ' + HAB_[h].texto)}">${h}</abbr>`).join('')}</span>` : '';
  /* perguntas de uma fase: múltipla escolha e verdadeiro ou falso das listas do mesmo ano */
  function perguntasDoAno(ano) {
    const out = [];
    for (const l of LST) {
      if (l.ano !== ano) continue;
      const eixos = eixosDe(l.habs);
      l.ex.forEach((e, i) => {
        if (e[0] === 'me') out.push({ id: l.id + '-' + i, enun: e[1], alts: e[2], certa: e[3], coment: e[4] || '', eixos, habs: l.habs });
        else if (e[0] === 'vf') e[2].forEach((af, j) => out.push({ id: l.id + '-' + i + '-' + j, enun: 'Verdadeiro ou falso? ' + af[0], alts: ['Verdadeiro', 'Falso'], certa: af[1] ? 0 : 1, coment: e[3] || '', eixos, habs: l.habs }));
      });
    }
    return out;
  }

  /* ---------- montagem do mapa (em blocos: 1 bloco = 1 unidade) ---------- */
  const T = { grama: 0, caminho: 1, praca: 2, agua: 3, areia: 4 };
  const fases = FASES.map((f, i) => {
    const lugares = f.lugares || jogaveis.filter(f.filtro).map(lugarRec);
    const n = Math.max(1, lugares.length);
    // a Sala da Matemática tem muitas casas, mas fica do tamanho da maior vila para não mudar o mapa das outras
    const raio = Math.min(f.todaMatematica ? 15 : 99, Math.max(8, Math.ceil(5 + 0.42 * n)));
    const perguntas = f.perguntasProprias || (f.todaMatematica ? [6, 7, 8, 9].flatMap(perguntasDoAno).filter(p => (p.habs || []).some(h => /MA\d/.test(h))) : perguntasDoAno(f.ano));
    const mat = f.todaMatematica;
    return Object.assign({}, f, { idx: i, lugares, raio, perguntas,
      metaPerg: Math.min(perguntas.length, mat ? 5 : [4, 5, 6, 6, 6, 4, 6, 3][i] || 4),
      metaJogar: Math.min(n, mat ? 4 : f.id === 'escola' ? 3 : f.id === 'medio' ? 4 : 3 + Math.floor(i / 2)),
      nNpc: mat ? 3 : 2 + Math.floor(i / 2), nItens: mat ? 6 : 5 + i });
  });
  const PERG_POR_ID = new Map(fases.flatMap(f => f.perguntas.map(p => [p.id, p])));
  /* as vilas são quadradas e ficam numa grade de 3 colunas (em zigue-zague): cada uma liga-se à anterior, à seguinte e aos
     atalhos de LIGACOES por um portão no lado em que a vizinha está. Só a vila atual fica montada na memória; ao trocar de vila, a anterior é
     desmontada (ela é refeita igualzinha quando a pessoa volta, porque o sorteio é fixo). */
  const ALT = Math.max(...fases.map(f => 2 * (f.raio + 9)));
  const MEIO = Math.floor(ALT / 2);                              // as duas estradas se cruzam no meio
  const GRADE = [[0, 0], [1, 0], [2, 0], [2, 1], [1, 1], [0, 1], [0, 2], [1, 2], [-1, 0]];   // a Sala da Matemática fica a oeste da Vila do Começo
  const LADOS = { L: { x: ALT - 0.5, y: MEIO, nome: 'leste' }, O: { x: 0.5, y: MEIO, nome: 'oeste' }, S: { x: MEIO, y: ALT - 0.5, nome: 'sul' }, N: { x: MEIO, y: 0.5, nome: 'norte' } };
  // além do zigue-zague, atalhos entre vilas vizinhas na grade (Começo ↔ Laboratório, Números ↔ Inteligência ↔ Professores)
  const IDX_MAT = fases.findIndex(f => f.todaMatematica);
  const LIGACOES = fases.slice(1).map((f, i) => [i, i + 1]).filter(([, b]) => b !== IDX_MAT).concat([[0, 5], [1, 4], [4, 7], [0, IDX_MAT]]).filter(([a, b]) => a >= 0 && b >= 0 && b < fases.length);
  const ladoPara = (a, b) => { const [ax, ay] = GRADE[a], [bx, by] = GRADE[b]; return bx > ax ? 'L' : bx < ax ? 'O' : by > ay ? 'S' : 'N'; };
  for (const f of fases) {
    f.x0 = 0; f.L = ALT;
    f.portais = LIGACOES.filter(l => l.includes(f.idx)).map(l => l[0] === f.idx ? l[1] : l[0]).map(j => Object.assign({ para: j, lado: ladoPara(f.idx, j) }, LADOS[ladoPara(f.idx, j)]));
    // moradores (quem são; a posição vem da montagem)
    const nomes = NOMES.slice();
    f.npcs = [];
    for (let k = 0; k < f.nNpc; k++) {
      let nome = nomes.splice((f.idx * 3 + k * 5) % nomes.length, 1)[0];
      if (f.todaMatematica && k === 0) nome = 'Professor Malba';   // homenagem a Malba Tahan, professor de Matemática
      f.npcs.push({ id: f.id + '-npc' + k, nome, th: (k + 0.3) / f.nNpc * Math.PI * 2 + 0.6, x: 0, y: 0, fase: f, prof: k === 0, masc: f.todaMatematica && k === 0,
        av: { pele: PELES[(k + f.idx) % PELES.length], cabelo: CABELOS[(k * 2 + f.idx) % CABELOS.length], estilo: ['curto', 'longo', 'coque', 'bone'][(k + f.idx) % 4], camisa: ROUPAS[(k * 3 + f.idx) % ROUPAS.length], calca: ['#2f3b6b', '#5a3b2a', '#333333'][k % 3] } });
    }
  }
  let eventosProntos = false;   // os itens de evento só entram depois que a lista de eventos existe
  function monta(f) {
    if (f.tile) return;
    const L = f.L, r = rng(1000 + f.idx * 77);
    f.tile = new Uint8Array(L * ALT);       // tipo do chão
    f.sol = new Uint8Array(L * ALT);        // 1 = não dá para passar
    f.var = new Uint8Array(L * ALT).map(() => Math.floor(r() * 4));
    const cx = MEIO + 0.5, cy = MEIO + 0.5, fase0 = r() * 6;
    const raioEm = th => f.raio + 1.2 * Math.sin(3 * th + fase0);
    const at = (x, y) => x >= 0 && y >= 0 && x < L && y < ALT;
    const pos = (x, y) => y * L + x;
    // anel de caminho, praça no centro, estrada que atravessa e raios ligando a praça ao anel
    for (let y = 0; y < ALT; y++) for (let x = 0; x < L; x++) {
      const dx = x + 0.5 - cx, dy = y + 0.5 - cy, d = Math.hypot(dx, dy), th = Math.atan2(dy, dx);
      if (d < 3.6) f.tile[pos(x, y)] = T.praca;
      else if (Math.abs(d - raioEm(th)) < 1.0) f.tile[pos(x, y)] = T.caminho;
    }
    for (let x = 0; x < L; x++) for (const y of [MEIO - 1, MEIO]) if (f.tile[pos(x, y)] !== T.praca) f.tile[pos(x, y)] = T.caminho;
    for (let y = 0; y < ALT; y++) for (const x of [MEIO - 1, MEIO]) if (f.tile[pos(x, y)] !== T.praca) f.tile[pos(x, y)] = T.caminho;
    // onde a estrada chega na borda sem portão, uma cerca fecha a passagem
    f.cercas = [];
    for (const k of Object.keys(LADOS)) if (!f.portais.some(p => p.lado === k)) {
      const cells = k === 'L' ? [[L - 1, MEIO - 1], [L - 1, MEIO]] : k === 'O' ? [[0, MEIO - 1], [0, MEIO]] : k === 'S' ? [[MEIO - 1, ALT - 1], [MEIO, ALT - 1]] : [[MEIO - 1, 0], [MEIO, 0]];
      for (const [x, y] of cells) { f.sol[pos(x, y)] = 1; f.cercas.push({ x, y }); }
    }
    const raios = [Math.PI / 2, -Math.PI / 2].concat(f.idx % 2 ? [Math.PI / 4] : [-3 * Math.PI / 4]);
    for (const th of raios) for (let d = 3; d < raioEm(th); d += 0.4) {
      const x = Math.floor(cx + Math.cos(th) * d), y = Math.floor(cy + Math.sin(th) * d);
      if (at(x, y) && f.tile[pos(x, y)] === T.grama) f.tile[pos(x, y)] = T.caminho;
    }
    // fase 1: a casa do jogador; fase 2: a Casa do Enigma (escape room)
    if (f.idx <= 1) {
      const w = 4, d = 4;
      const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama) return false; return true; };
      let hx = 3, hy = MEIO - 2 - 2 - d;
      search: for (const yy of [hy, hy - 1, hy - 2, hy + 1]) for (const xx of [3, 4, 2, 5]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
      for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
      for (let j = hy + d; j < MEIO - 1; j++) for (const k of [hx + 1, hx + 2]) f.tile[pos(k, j)] = T.caminho;
      f[f.idx === 0 ? 'minhaCasa' : 'enigma'] = { gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } };
    }
    // Sala da Matemática: o Escape da Matemática (em cima da estrada) e o Labirinto (embaixo)
    if (f.id === 'matematica') {
      f.salas = [];
      for (const [id, cima] of [['emat', true], ['labirinto', false]]) {
        const w = 4, d = 4;
        const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama || f.sol[pos(k, j)]) return false; return true; };
        let hx = 3, hy = cima ? MEIO - 2 - 2 - d : MEIO + 3;
        search: for (const yy of cima ? [hy, hy - 1, hy - 2, hy + 1] : [hy, hy + 1, hy - 1, hy + 2]) for (const xx of [3, 4, 2, 5, 6]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
        for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
        if (cima) for (let j = hy + d; j < MEIO - 1; j++) for (const k of [hx + 1, hx + 2]) f.tile[pos(k, j)] = T.caminho;
        f.salas.push({ id, gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } });
      }
    }
    // praça dos projetos coletivos, na Vila do Começo, do lado de baixo da estrada
    if (f.idx === 0) {
      const w = 6, d = 5;
      const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama) return false; return true; };
      let hx = 3, hy = MEIO + 3;
      search: for (const yy of [MEIO + 3, MEIO + 4, MEIO + 2, MEIO + 5]) for (const xx of [3, 4, 2, 5, 6]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
      for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
      f.projetos = { gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } };
      // portal de teletransporte para os mundos do teste de proficiência, perto do começo
      const livre2 = (hx, hy) => { for (let j = hy - 1; j <= hy + 3; j++) for (let k = hx - 1; k <= hx + 2; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama || f.sol[pos(k, j)]) return false; return true; };
      let px = -1, py = -1;
      busca: for (let dy = 0; dy < 8; dy++) for (const yy of [MEIO + 2 + dy, MEIO - 5 - dy]) for (let xx = 8; xx < 18; xx++) if (livre2(xx, yy)) { px = xx; py = yy; break busca; }
      if (px >= 0) {
        for (let j = py; j < py + 2; j++) for (let k = px; k < px + 2; k++) f.sol[pos(k, j)] = 1; f.portalTele = { gx: f.x0 + px, x: px, y: py, w: 2, d: 2, porta: { x: f.x0 + px + 1, y: py + 2.7 } };
        // reserva uma folga de 2 blocos em volta e 3 na frente da porta, para nenhuma casa ficar colada no portal (liberada no fim da montagem)
        f.reserva = [];
        for (let j = py - 2; j <= py + 4; j++) for (let k = px - 2; k <= px + 3; k++) if (at(k, j) && !f.sol[pos(k, j)]) { f.sol[pos(k, j)] = 1; f.reserva.push(pos(k, j)); }
      }
      // Museu: perto do portal, com 4 × 3 blocos
      const livre3 = (hx, hy) => { for (let j = hy - 1; j <= hy + 4; j++) for (let k = hx - 1; k <= hx + 4; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama || f.sol[pos(k, j)]) return false; return true; };
      let mx = -1, my = -1;
      buscaM: for (let dy = 0; dy < 10; dy++) for (const yy of [MEIO - 6 - dy, MEIO + 2 + dy]) for (let xx = 6; xx < 22; xx++) if (livre3(xx, yy)) { mx = xx; my = yy; break buscaM; }
      if (mx >= 0) { for (let j = my; j < my + 3; j++) for (let k = mx; k < mx + 4; k++) f.sol[pos(k, j)] = 1; f.salas = [{ id: 'museu', gx: f.x0 + mx, x: mx, y: my, w: 4, d: 3, porta: { x: f.x0 + mx + 2, y: my + 3.7 } }]; }
    }
    // banco na Praça dos Números, do lado de baixo da estrada
    if (f.idx === 1) {
      const w = 4, d = 4;
      const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama) return false; return true; };
      let hx = 3, hy = MEIO + 3;
      search: for (const yy of [MEIO + 3, MEIO + 4, MEIO + 2, MEIO + 5]) for (const xx of [3, 4, 2, 5, 6]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
      for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
      f.banco = { gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } };
    }
    // uma loja em cada uma das 4 primeiras vilas, do outro lado da estrada
    const loja = Object.keys(LOJAS).find(k => LOJAS[k].fase === f.idx);
    if (loja) {
      const w = 4, d = 4;
      const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama) return false; return true; };
      let hx = L - 8, hy = MEIO - 2 - 2 - d;
      search: for (const yy of [hy, hy - 1, hy - 2, hy + 1, hy - 3]) for (const xx of [L - 8, L - 7, L - 9, L - 6, L - 10]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
      for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
      for (let j = hy + d; j < MEIO - 1; j++) for (const k of [hx + 1, hx + 2]) f.tile[pos(k, j)] = T.caminho;
      f.loja = { id: loja, gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } };
    }
    // Oficina de Robótica no Bairro dos Padrões, com 4 × 3 blocos e folga em volta
    if (f.idx === 2) {
      const livreR = (hx, hy) => { for (let j = hy - 2; j <= hy + 5; j++) for (let k = hx - 2; k <= hx + 5; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama || f.sol[pos(k, j)]) return false; return true; };
      let ox = -1, oy = -1;
      buscaR: for (let dy = 0; dy < 10; dy++) for (const yy of [MEIO + 3 + dy, MEIO - 7 - dy]) for (let xx = 4; xx < 22; xx++) if (livreR(xx, yy)) { ox = xx; oy = yy; break buscaR; }
      if (ox >= 0) { for (let j = oy; j < oy + 3; j++) for (let k = ox; k < ox + 4; k++) f.sol[pos(k, j)] = 1; f.salas = [{ id: 'robotica', gx: f.x0 + ox, x: ox, y: oy, w: 4, d: 3, porta: { x: f.x0 + ox + 2, y: oy + 3.7 } }];
        // folga em volta e na frente da porta até as casas e o bosque estarem montados (como no portal)
        f.reserva = f.reserva || [];
        for (let j = oy - 2; j <= oy + 6; j++) for (let k = ox - 2; k <= ox + 5; k++) if (at(k, j) && !f.sol[pos(k, j)]) { f.sol[pos(k, j)] = 1; f.reserva.push(pos(k, j)); }
      }
    }
    // casas em volta do anel, metade por dentro e metade por fora, longe da estrada
    f.casas = [];
    const ocupa = (x, y, w, d, m = 1) => { for (let j = y - m; j < y + d + m; j++) for (let i = x - m; i < x + w + m; i++) { if (!at(i, j) || f.sol[pos(i, j)]) return true; } return false; };
    const nIn = Math.floor(f.lugares.length / 2), nOut = f.lugares.length - nIn;
    const angulos = k => { const out = []; for (let i = 0; i < k; i++) { const t = (i + 0.5) / k; const arco = t < 0.5 ? 0.38 + t * 2 * (Math.PI - 0.76) : Math.PI + 0.38 + (t - 0.5) * 2 * (Math.PI - 0.76); out.push(arco); } return out; };
    const posicoes = angulos(nOut).map(a => [a, 1]).concat(angulos(nIn).map(a => [a + 0.2, -1]));
    f.lugares.forEach((l, i) => {
      const [th, lado] = posicoes[i];
      const w = 3, d = 3;
      let casa = null;
      const serve = (hx, hy) => {
        for (let j = hy - 1; j < hy + d + 1; j++) for (let k = hx - 1; k < hx + w + 1; k++) {
          if (!at(k, j) || f.sol[pos(k, j)]) return false;                                   // não encosta em outra casa
          const dentro = j >= hy && j < hy + d && k >= hx && k < hx + w;
          if (dentro && f.tile[pos(k, j)] !== T.grama) return false;                          // não fica em cima do caminho
        }
        return hy > 2 && hy + d < ALT - 2 && hx > 2 && hx + w < L - 2 && (hy > MEIO + 1 || hy + d < MEIO - 1) && (hx > MEIO + 1 || hx + w < MEIO - 1);
      };
      for (let extra = 0; extra < 10 && !casa; extra++) for (const dth of [0, 0.1, -0.1, 0.2, -0.2, 0.3, -0.3]) {
        const rr = raioEm(th + dth) + lado * (3.3 + extra * 0.7);
        const hx = Math.round(cx + Math.cos(th + dth) * rr - w / 2), hy = Math.round(cy + Math.sin(th + dth) * rr - d / 2);
        if (serve(hx, hy)) { casa = { x: hx, y: hy, w, d }; break; }
      }
      // último recurso: o lugar livre mais perto do anel
      if (!casa) {
        let melhor = null;
        for (let hy = 1; hy < ALT - d; hy++) for (let hx = 1; hx < L - w; hx++) {
          if (!serve(hx, hy)) continue;
          const dd = Math.abs(Math.hypot(hx + 1.5 - cx, hy + 1.5 - cy) - f.raio - 3.5);
          if (!melhor || dd < melhor.dd) melhor = { x: hx, y: hy, w, d, dd };
        }
        casa = melhor;
      }
      if (!casa) return;   // sem lugar (não acontece com os tamanhos atuais)
      for (let j = casa.y; j < casa.y + d; j++) for (let k = casa.x; k < casa.x + w; k++) f.sol[pos(k, j)] = 1;
      // porta virada para o anel e caminhozinho até ele
      const hcx = casa.x + w / 2, hcy = casa.y + d / 2, ang = Math.atan2(hcy - cy, hcx - cx);
      const alvo = { x: cx + Math.cos(ang) * raioEm(ang), y: cy + Math.sin(ang) * raioEm(ang) };
      const vx = alvo.x - hcx, vy = alvo.y - hcy, vl = Math.hypot(vx, vy) || 1;
      const pinta = (x, y) => { if (at(x, y) && f.tile[pos(x, y)] === T.grama && !f.sol[pos(x, y)]) f.tile[pos(x, y)] = T.caminho; };
      // a câmera só vê as faces x+ e y+: a porta fica sempre numa delas, para nunca ficar escondida atrás da casa
      const ladoPorta = vx <= 0 && vy <= 0 ? (Math.abs(vx) < Math.abs(vy) ? 'x+' : 'y+') : Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'x+' : 'y+') : (vy > 0 ? 'y+' : 'x+');
      const direto = (ladoPorta === 'x+' && vx > 0 && Math.abs(vx) >= Math.abs(vy)) || (ladoPorta === 'y+' && vy > 0 && Math.abs(vy) >= Math.abs(vx));
      if (direto) for (let t = 1.6; t < vl; t += 0.35) pinta(Math.floor(hcx + vx / vl * t), Math.floor(hcy + vy / vl * t));
      else {   // caminho em L: sai da porta, contorna a casa pelo lado e segue até o anel
        let x = ladoPorta === 'x+' ? casa.x + w : Math.floor(hcx), y = ladoPorta === 'y+' ? casa.y + d : Math.floor(hcy);
        const ax = Math.floor(alvo.x), ay = Math.floor(alvo.y);
        pinta(x, y);
        if (ladoPorta === 'x+') { while (y !== ay) { y += Math.sign(ay - y); pinta(x, y); } while (x !== ax) { x += Math.sign(ax - x); pinta(x, y); } }
        else { while (x !== ax) { x += Math.sign(ax - x); pinta(x, y); } while (y !== ay) { y += Math.sign(ay - y); pinta(x, y); } }
      }
      const porta = ladoPorta === 'x+' ? { x: casa.x + w + 0.7, y: hcy } : ladoPorta === 'x-' ? { x: casa.x - 0.7, y: hcy } : ladoPorta === 'y+' ? { x: hcx, y: casa.y + d + 0.7 } : { x: hcx, y: casa.y - 0.7 };
      Object.assign(casa, { lugar: l, porta, ladoPorta, cor: PASTEIS[(i * 3 + f.idx) % PASTEIS.length], altura: 2 + ((l.titulo.length + i) % 3) * 0.5 });
      casa.gx = f.x0 + casa.x; casa.porta.x += f.x0;
      f.casas.push(casa);
    });
    // monumento na praça
    for (let j = Math.floor(cy) - 1; j <= Math.floor(cy); j++) for (let k = Math.floor(cx) - 1; k <= Math.floor(cx); k++) f.sol[pos(k, j)] = 1;
    f.centro = { x: f.x0 + cx, y: cy };
    // lago num canto livre
    f.agua = [];
    const cantos = [[0.22, 0.22], [0.78, 0.25], [0.25, 0.8], [0.78, 0.78]].sort(() => r() - 0.5);
    const livreLago = (lx, ly, ra, rb, m) => { for (let y = Math.floor(ly - rb - m); y <= ly + rb + m; y++) for (let x = Math.floor(lx - ra - m); x <= lx + ra + m; x++) if (!at(x, y) || f.tile[pos(x, y)] !== T.grama || f.sol[pos(x, y)]) return false; return true; };
    const cavaLago = (lx, ly, ra, rb) => {
      for (let y = Math.floor(ly - rb - 1); y <= ly + rb + 1; y++) for (let x = Math.floor(lx - ra - 1); x <= lx + ra + 1; x++) {
        const e = ((x + 0.5 - lx) / ra) ** 2 + ((y + 0.5 - ly) / rb) ** 2;
        if (e < 1) { f.tile[pos(x, y)] = T.agua; f.sol[pos(x, y)] = 1; f.agua.push({ x: f.x0 + x, y }); } else if (e < 1.7) f.tile[pos(x, y)] = T.areia;
      }
    };
    for (const [ux, uy] of cantos) {
      const lx = L * ux, ly = ALT * uy, ra = 2.4 + r() * 1.6, rb = 1.8 + r() * 1.2;
      if (!livreLago(lx, ly, ra, rb, 2)) continue;
      cavaLago(lx, ly, ra, rb); break;
    }
    // sem canto livre, um laguinho menor onde couber (com outro sorteio, para não mudar o resto da vila)
    if (!f.agua.length) {
      const r2 = rng(5000 + f.idx), lugares = [];
      for (let y = 4; y < ALT - 4; y += 2) for (let x = 4; x < L - 4; x += 2) lugares.push([x + 0.5, y + 0.5, r2()]);
      lugares.sort((p, q) => p[2] - q[2]);
      for (const [rr, rbb] of [[2.2, 1.7], [1.7, 1.3]]) {
        const ok = lugares.find(([lx, ly]) => livreLago(lx, ly, rr, rbb, 1));
        if (ok) { cavaLago(ok[0], ok[1], rr, rbb); break; }
      }
    }
    // árvores: cerca nas bordas (com a passagem da estrada) e um bosque espalhado
    f.arvores = [];
    const arvore = (x, y) => { if (!at(x, y) || f.sol[pos(x, y)] || f.tile[pos(x, y)] !== T.grama) return; f.sol[pos(x, y)] = 1; f.arvores.push({ x: f.x0 + x, y, tipo: Math.floor(r() * 3), alt: 1 + Math.floor(r() * 2) }); };
    for (let x = 0; x < L; x++) { arvore(x, 0); arvore(x, ALT - 1); if (r() < 0.6) arvore(x, 1); if (r() < 0.6) arvore(x, ALT - 2); }
    for (let y = 0; y < ALT; y++) { arvore(0, y); arvore(L - 1, y); if (r() < 0.6) arvore(1, y); if (r() < 0.6) arvore(L - 2, y); }
    const pertoDeCoisa = (x, y) => { for (let j = y - 1; j <= y + 1; j++) for (let i = x - 1; i <= x + 1; i++) if (at(i, j) && (f.tile[pos(i, j)] !== T.grama || f.sol[pos(i, j)])) return true; return false; };
    for (let k = 0; k < L * ALT * 0.05; k++) { const x = Math.floor(r() * L), y = Math.floor(r() * ALT); if (!pertoDeCoisa(x, y)) arvore(x, y); }
    // a folga em volta do portal volta a ser chão livre (depois das casas e do bosque)
    if (f.reserva) { for (const k of f.reserva) f.sol[k] = 0; delete f.reserva; }
    // rochas: dão pedra com a picareta
    f.rochas = [];
    for (let k = 0; k < 7 + f.idx % 3; k++) { const x = 3 + Math.floor(r() * (L - 6)), y = 3 + Math.floor(r() * (ALT - 6)); if (!pertoDeCoisa(x, y)) { f.sol[pos(x, y)] = 1; f.rochas.push({ x: f.x0 + x, y, t: r() }); } }
    // flores e enfeites (só desenho, não bloqueiam)
    f.flores = [];
    for (let k = 0; k < L * ALT * 0.06 * ESTACAO.flores; k++) { const x = r() * L, y = r() * ALT; const t = f.tile[pos(Math.floor(x), Math.floor(y))]; if (t === T.grama && !f.sol[pos(Math.floor(x), Math.floor(y))]) f.flores.push({ x: f.x0 + x, y, c: ['#ff9fb6', '#fff27a', '#ffffff', '#c7a6ff', '#ffb36b'][k % 5] }); }
    // placa perto da praça
    f.placa = { x: f.x0 + MEIO + 3.5, y: MEIO + 1.8 };
    f.sol[pos(MEIO + 3, MEIO + 1)] = 1;
    // moradores andando pelo anel
    for (const n of f.npcs) { n.x = cx + Math.cos(n.th) * raioEm(n.th); n.y = cy + Math.sin(n.th) * raioEm(n.th); }
    f.raioEm = raioEm; f.cx = cx; f.cy = cy;
    // itens da semana: lugares novos a cada segunda-feira, para revisar
    const ri = rng(5000 + f.idx * 131 + SEMANA * 7919);
    f.itens = [];
    let tent = 0;
    while (f.itens.length < f.nItens && tent++ < 600) {
      const x = Math.floor(ri() * L), y = Math.floor(ri() * ALT);
      const t = f.tile[pos(x, y)];
      if (f.sol[pos(x, y)] || t === T.agua || f.itens.some(o => Math.hypot(o.x - f.x0 - x, o.y - y) < 4)) continue;
      const tipo = SORTEIO_ITENS[(f.itens.length + f.idx) % SORTEIO_ITENS.length];
      // a maçã fica pendurada numa árvore verde (as duas primeiras cores de folha); sem árvore livre, fica no chão
      const verdes = tipo === 'maca' ? f.arvores.filter(a => a.tipo < 2 && !f.itens.some(o => o.arvore === a)) : [];
      if (verdes.length) { const a = verdes[Math.floor(ri() * verdes.length)]; f.itens.push({ id: `${f.id}-s${SEMANA}-${f.itens.length}`, x: a.x + 0.5, y: a.y + 0.5, tipo, arvore: a }); continue; }
      f.itens.push({ id: `${f.id}-s${SEMANA}-${f.itens.length}`, x: f.x0 + x + 0.5, y: y + 0.5, tipo });
    }
    // dois itens da estação em cada vila
    for (let k = 0, t2 = 0; k < 2 && t2++ < 300;) {
      const x = Math.floor(ri() * L), y = Math.floor(ri() * ALT), t = f.tile[pos(x, y)];
      if (f.sol[pos(x, y)] || t === T.agua || f.itens.some(o => Math.hypot(o.x - f.x0 - x, o.y - y) < 4)) continue;
      f.itens.push({ id: `${f.id}-s${SEMANA}-${ESTACAO.id}${k}`, x: f.x0 + x + 0.5, y: y + 0.5, tipo: ESTACAO.item, estacao: true }); k++;
    }
    f.evItens = eventosProntos ? itensEvento(f) : [];
  }
  /* desmonta a vila (o que ocupa memória: chão, árvores, flores, casas, itens); moradores, portões e as casas especiais ficam */
  function desmonta(f) { for (const k of ['tile', 'sol', 'var', 'arvores', 'rochas', 'agua', 'salas', 'flores', 'casas', 'itens', 'cercas', 'evItens']) delete f[k]; }
  /* busca: guarda onde fica cada casa e prédio (a montagem é sempre igual, então a posição vale para sempre) */
  const ONDE = [];
  function rumoNaVila(f, x, y) {
    const dx = x - f.centro.x, dy = y - f.centro.y, a = Math.atan2(-dy, dx) * 180 / Math.PI, d = Math.hypot(dx, dy);
    if (d < 4) return 'na praça do centro';
    const r = ['a leste', 'a nordeste', 'ao norte', 'a noroeste', 'a oeste', 'a sudoeste', 'ao sul', 'a sudeste'][Math.round(((a + 360) % 360) / 45) % 8];
    return `${r} da praça${d > 12 ? ', mais para a borda' : ''}`;
  }
  function guardaOnde(f) {
    const add = (ic, nome, resumo, c, tipo) => { if (c && c.porta) ONDE.push({ ic, nome, resumo: resumo || '', f, porta: { x: c.porta.x, y: c.porta.y }, onde: rumoNaVila(f, c.gx + c.w / 2, c.y + c.d / 2), tipo }); };
    for (const c of f.casas || []) add(c.lugar.icone || '🏠', c.lugar.titulo, [c.lugar.resumo, c.lugar.extra].filter(Boolean).join(' · '), c, 'casa');
    if (f.minhaCasa) add('🏠', 'Sua casa', 'bancada, móveis, horta e pixel art', f.minhaCasa, 'especial');
    if (f.enigma) add('🔐', 'Casa do Enigma', 'escape room de binário e cifras', f.enigma, 'especial');
    if (f.projetos) add('🤝', 'Praça dos projetos', 'projetos coletivos da turma', f.projetos, 'especial');
    if (f.banco) add('🏦', 'Banco', 'poupança, mesada e juros', f.banco, 'especial');
    if (f.portalTele) add('🌀', 'Portal de teletransporte', 'mundos do teste de proficiência em informática', f.portalTele, 'especial');
    if (f.loja) add(LOJAS[f.loja.id].ic, LOJAS[f.loja.id].nome, LOJAS[f.loja.id].texto, f.loja, 'especial');
    for (const c of f.salas || []) { const nomes = { museu: ['🏛️', 'Museu', 'moedas, estrelas, medalhas, troféus e galeria de pixel art'], emat: ['🧮', 'Escape da Matemática', 'desafios de Matemática sem cronômetro'], labirinto: ['🌀', 'Labirinto', 'portões com perguntas de Matemática'], robotica: ['🤖', 'Oficina de Robótica', 'robótica, circuitos, eletrônica, LED, motor, sensor, bateria, lei de Ohm'] }[c.id]; if (nomes) add(nomes[0], nomes[1], nomes[2], c, 'especial'); }
  }
  for (const f of fases) { monta(f); guardaOnde(f); desmonta(f); }        // uma passada para guardar a posição das casas especiais e dos moradores
  const LARG = ALT;
  let atual = fases[0];
  const todosLugares = fases.flatMap(f => f.lugares);
  const faseDeX = () => atual;
  function tileEm(x, y) { const f = faseDeX(x), lx = Math.floor(x - f.x0), ly = Math.floor(y); if (lx < 0 || ly < 0 || lx >= f.L || ly >= ALT) return { f, t: T.grama, sol: 1 }; return { f, t: f.tile[ly * f.L + lx], sol: f.sol[ly * f.L + lx], v: f.var[ly * f.L + lx] }; }

  /* ---------- a casa do jogador: três cômodos e móveis feitos com os itens ---------- */
  let CW = 13; const CD = 9;                                 // tamanho por dentro, em blocos (a largura cresce quando a casa é ampliada)
  const COMODOS_BASE = [{ nome: 'Sala', x0: 0, x1: 5, chao: '#e8c79a', parede: '#fde2b8' }, { nome: 'Quarto', x0: 5, x1: 9, chao: '#f7c6d9', parede: '#f9d3e3' }, { nome: 'Cozinha', x0: 9, x1: 13, chao: '#cfe8f5', parede: '#d6f0e0' }];
  /* ampliações da casa: cada uma abre um cômodo de 4 blocos; liberam com vilas concluídas e custam estrelas, madeira e pedra */
  const AMPLIACOES = [
    { nome: 'Ateliê', ic: '🎨', vilas: 2, custo: { pontos: 400, madeira: 6, pedra: 4 }, chao: '#d8efc6', parede: '#e6f5d6' },
    { nome: 'Sala de jogos', ic: '🎲', vilas: 4, custo: { pontos: 800, madeira: 10, pedra: 8 }, chao: '#f6dcae', parede: '#fbe8cf' }
  ];
  let COMODOS = COMODOS_BASE, PAREDES = [5, 9];
  function ajustaCasa(amp) {   // amp: quantas ampliações a casa que está aberta tem (as dos moradores não têm)
    COMODOS = COMODOS_BASE.concat(AMPLIACOES.slice(0, amp).map((a, i) => ({ nome: a.nome, x0: 13 + 4 * i, x1: 17 + 4 * i, chao: a.chao, parede: a.parede })));
    CW = COMODOS[COMODOS.length - 1].x1; PAREDES = COMODOS.slice(1).map(r => r.x0);
  }
  const SAIDA = { x: 2.5, y: CD - 0.5 };
  /* custo: itens do inventário; requer: móvel que precisa ter sido construído antes (um objeto libera o outro) */
  const emojiMovel = (x, y, z, ic) => { const [sx, sy] = iso(x + 0.5, y + 0.5, z + Math.sin(agora / 600 + x) * 0.04); ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, sx, sy); };
  const MOVEIS = {
    bancada: { nome: 'Bancada de criação', ic: '🛠️', w: 2, d: 1, inicial: true, fixo: true, acao: 'construir', des: (x, y) => { caixa(x + 0.05, y + 0.1, 0, 1.9, 0.8, 0.75, '#c08a52'); caixa(x + 0.2, y + 0.25, 0.75, 0.45, 0.35, 0.25, '#9aa3ad'); caixa(x + 1.2, y + 0.3, 0.75, 0.55, 0.25, 0.12, '#e0564a'); caixa(x + 1.3, y + 0.35, 0.87, 0.3, 0.15, 0.1, '#ffd58a'); } },
    computador: { nome: 'Computador', ic: '💻', w: 2, d: 1, inicial: true, acao: 'usar o computador', des: (x, y) => { caixa(x + 0.1, y + 0.1, 0, 1.8, 0.8, 0.7, '#f3d9a4'); caixa(x + 0.55, y + 0.2, 0.7, 0.9, 0.15, 0.6, '#333333'); naFace('y', x + 0.55, y + 0.2, 0.9, 0.15, 0.07, 0, 0.76, 0.76, 0.48, '#7fd3f7'); caixa(x + 0.55, y + 0.5, 0.7, 0.9, 0.25, 0.04, '#e6e6e6'); } },
    estante: { nome: 'Estante de livros', ic: '📚', w: 1, d: 2, inicial: true, acao: 'ver a biblioteca', des: (x, y) => { caixa(x + 0.05, y + 0.05, 0, 0.6, 1.9, 2, '#b07a45'); for (let z = 0; z < 3; z++) ['#e0564a', '#3f8fe0', '#4bb259', '#f6b73c', '#9a6bd6'].forEach((c, i) => naFace('x', x + 0.05, y + 0.05, 0.6, 1.9, 0.12 + i * 0.33 + (z % 2) * 0.08, 0, 0.22, 0.15 + z * 0.62, 0.45, c)); } },
    bau: { nome: 'Baú', ic: '🧰', w: 1, d: 1, inicial: true, acao: 'abrir o baú', des: (x, y) => { caixa(x + 0.15, y + 0.2, 0, 0.7, 0.6, 0.45, '#a0703f'); caixa(x + 0.12, y + 0.17, 0.45, 0.76, 0.66, 0.14, '#7a5230'); naFace('y', x + 0.15, y + 0.2, 0.7, 0.6, 0.29, 0, 0.12, 0.3, 0.2, '#ffd58a'); } },
    espelho: { nome: 'Espelho', ic: '🪞', w: 1, d: 1, inicial: true, acao: 'mudar o visual', des: (x, y) => { caixa(x + 0.2, y + 0.05, 0, 0.6, 0.12, 1.7, '#f7a8c4'); naFace('y', x + 0.2, y + 0.05, 0.6, 0.12, 0.08, 0, 0.44, 0.15, 1.4, '#d8f3ff'); naFace('y', x + 0.2, y + 0.05, 0.6, 0.12, 0.14, 0, 0.08, 0.9, 0.5, '#ffffff'); } },
    cama: { nome: 'Cama', ic: '🛏️', w: 1, d: 2, inicial: true, acao: 'descansar', des: (x, y) => { caixa(x + 0.05, y + 0.02, 0, 0.9, 0.14, 0.95, '#a0703f'); caixa(x + 0.05, y + 0.1, 0, 0.9, 1.85, 0.35, '#c08a52'); caixa(x + 0.1, y + 0.15, 0.35, 0.8, 1.75, 0.15, '#ffffff'); caixa(x + 0.2, y + 0.22, 0.5, 0.6, 0.4, 0.12, '#fff7e8'); caixa(x + 0.08, y + 0.75, 0.42, 0.84, 1.2, 0.13, claro(S.casa.cor, 0.1)); } },
    vaso: { nome: 'Vaso de flores', ic: '🌷', w: 1, d: 1, custo: { estrela: 1 }, acao: 'regar', des: (x, y) => { caixa(x + 0.35, y + 0.35, 0, 0.3, 0.3, 0.35, '#e07b5a'); caixa(x + 0.45, y + 0.45, 0.35, 0.1, 0.1, 0.3, '#4f9a4b', { blocos: false }); caixa(x + 0.33, y + 0.33, 0.65, 0.34, 0.34, 0.2, '#ff9fb6'); } },
    tapete: { nome: 'Tapete', ic: '🟪', w: 2, d: 2, chao: true, custo: { estrela: 2 }, des: (x, y) => { caixa(x + 0.1, y + 0.1, 0, 1.8, 1.8, 0.04, '#c7b4f2', { blocos: false }); caixa(x + 0.4, y + 0.4, 0.04, 1.2, 1.2, 0.01, '#fff7e8', { blocos: false, contorno: false }); caixa(x + 0.7, y + 0.7, 0.05, 0.6, 0.6, 0.01, '#f7a8c4', { blocos: false, contorno: false }); } },
    quadro: { nome: 'Quadro', ic: '🖼️', w: 1, d: 1, custo: { livro: 2 }, acao: 'ver as conquistas', des: (x, y) => { caixa(x + 0.15, y + 0.02, 1.0, 0.7, 0.08, 0.6, '#a0703f', { blocos: false }); naFace('y', x + 0.15, y + 0.02, 0.7, 0.08, 0.07, 0, 0.56, 1.06, 0.48, '#a8d8f7'); naFace('y', x + 0.15, y + 0.02, 0.7, 0.08, 0.07, 0, 0.56, 1.06, 0.16, '#8fdc78'); naFace('y', x + 0.15, y + 0.02, 0.7, 0.08, 0.45, 0, 0.12, 1.36, 0.12, '#ffd58a'); } },
    planta: { nome: 'Planta grande', ic: '🪴', w: 1, d: 1, custo: { maca: 2 }, acao: 'regar', des: (x, y) => { caixa(x + 0.3, y + 0.3, 0, 0.4, 0.4, 0.4, '#f2e48a'); caixa(x + 0.15, y + 0.15, 0.4, 0.7, 0.7, 0.55, '#6fcf7f'); caixa(x + 0.3, y + 0.3, 0.95, 0.4, 0.4, 0.35, '#8fdc78'); } },
    luminaria: { nome: 'Luminária', ic: '💡', w: 1, d: 1, custo: { estrela: 1, diamante: 1 }, acao: 'acender', des: (x, y, m) => { if (m && m.on) { const [sx, sy] = iso(x + 0.5, y + 0.5, 1.2); const g = ctx.createRadialGradient(sx, sy, 4, sx, sy, 110); g.addColorStop(0, 'rgba(255,230,140,.45)'); g.addColorStop(1, 'rgba(255,230,140,0)'); ctx.fillStyle = g; ctx.fillRect(sx - 110, sy - 110, 220, 220); } caixa(x + 0.35, y + 0.35, 0, 0.3, 0.3, 0.08, '#888888', { blocos: false }); caixa(x + 0.45, y + 0.45, 0.08, 0.1, 0.1, 1.2, '#888888', { blocos: false }); caixa(x + 0.25, y + 0.25, 1.25, 0.5, 0.5, 0.4, m && m.on ? '#fff3b0' : '#ffd58a'); } },
    mesa: { nome: 'Mesa', ic: '🍽️', w: 2, d: 1, custo: { maca: 1, estrela: 1 }, des: (x, y) => { for (const [a, b] of [[0.15, 0.2], [1.75, 0.2], [0.15, 0.7], [1.75, 0.7]]) caixa(x + a, y + b, 0, 0.1, 0.1, 0.6, '#a0703f', { blocos: false }); caixa(x + 0.05, y + 0.1, 0.6, 1.9, 0.8, 0.12, '#f3d9a4'); caixa(x + 0.8, y + 0.4, 0.72, 0.3, 0.3, 0.12, '#ffffff'); } },
    poltrona: { nome: 'Poltrona', ic: '🛋️', w: 1, d: 1, custo: { estrela: 2, livro: 1 }, requer: 'tapete', acao: 'ler um pouco', des: (x, y) => { caixa(x + 0.1, y + 0.1, 0, 0.8, 0.22, 0.95, '#d0609c'); caixa(x + 0.1, y + 0.3, 0, 0.8, 0.6, 0.42, '#e07bb0'); caixa(x + 0.05, y + 0.3, 0.42, 0.15, 0.6, 0.2, '#d0609c'); caixa(x + 0.8, y + 0.3, 0.42, 0.15, 0.6, 0.2, '#d0609c'); } },
    geladeira: { nome: 'Geladeira', ic: '🧊', w: 1, d: 1, custo: { maca: 3, chave: 1 }, requer: 'mesa', acao: 'abrir a geladeira', des: (x, y) => { caixa(x + 0.1, y + 0.1, 0, 0.8, 0.8, 1.9, '#eef6fa'); naFace('y', x + 0.1, y + 0.1, 0.8, 0.8, 0, 0, 0.8, 1.3, 0.02, '#b8c4cc'); naFace('y', x + 0.1, y + 0.1, 0.8, 0.8, 0.62, 0, 0.06, 0.7, 0.4, '#9aa3ad'); naFace('y', x + 0.1, y + 0.1, 0.8, 0.8, 0.62, 0, 0.06, 1.4, 0.3, '#9aa3ad'); } },
    aquario: { nome: 'Aquário', ic: '🐠', w: 1, d: 1, custo: { diamante: 2, estrela: 1 }, requer: 'vaso', acao: 'ver os peixes', des: (x, y) => { caixa(x + 0.1, y + 0.2, 0, 0.8, 0.6, 0.5, '#5a3b2a'); caixa(x + 0.12, y + 0.22, 0.5, 0.76, 0.56, 0.55, '#9fe3f5', { blocos: false }); const k = (Math.sin(agora / 700) + 1) / 2; naFace('y', x + 0.12, y + 0.22, 0.76, 0.56, 0.1 + k * 0.45, 0, 0.14, 0.75, 0.08, '#ff8a3d'); } },
    robo: { nome: 'Robozinho', ic: '🤖', w: 1, d: 1, custo: { diamante: 2, chave: 1 }, requer: 'luminaria', acao: 'programar o robô', des: (x, y) => { const z = Math.abs(Math.sin(agora / 400)) * 0.06; caixa(x + 0.3, y + 0.3, z, 0.4, 0.4, 0.45, '#a8e6b8'); caixa(x + 0.32, y + 0.32, z + 0.45, 0.36, 0.36, 0.3, '#c9efd9'); naFace('y', x + 0.32, y + 0.32, 0.36, 0.36, 0.07, 0, 0.07, z + 0.6, 0.07, '#2b6cb0'); naFace('y', x + 0.32, y + 0.32, 0.36, 0.36, 0.22, 0, 0.07, z + 0.6, 0.07, '#2b6cb0'); caixa(x + 0.47, y + 0.47, z + 0.75, 0.06, 0.06, 0.2, '#888888', { blocos: false }); caixa(x + 0.44, y + 0.44, z + 0.95, 0.12, 0.12, 0.08, '#e0564a', { blocos: false }); } },
    telescopio: { nome: 'Telescópio', ic: '🔭', w: 1, d: 1, custo: { diamante: 3, estrela: 2 }, requer: 'robo', acao: 'olhar o mapa', des: (x, y) => { caixa(x + 0.45, y + 0.45, 0, 0.1, 0.1, 0.95, '#555555', { blocos: false }); caixa(x + 0.3, y + 0.35, 0.05, 0.4, 0.3, 0.05, '#555555', { blocos: false }); caixa(x + 0.38, y + 0.1, 0.95, 0.24, 0.8, 0.24, '#3f8fe0'); caixa(x + 0.35, y + 0.05, 0.92, 0.3, 0.12, 0.3, '#ffd58a'); } },
    arcade: { nome: 'Fliperama', ic: '🕹️', w: 1, d: 1, custo: { chave: 2, diamante: 2 }, requer: 'robo', acao: 'jogar', des: (x, y) => { caixa(x + 0.1, y + 0.15, 0, 0.8, 0.7, 1.75, '#9a6bd6'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.12, 0, 0.56, 1.0, 0.5, '#1b2531'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.25 + ((agora / 300 | 0) % 3) * 0.1, 0, 0.08, 1.2, 0.08, '#a8e6b8'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.2, 0, 0.1, 0.75, 0.1, '#e0564a'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.45, 0, 0.1, 0.75, 0.1, '#ffd58a'); } },
    // móveis que só existem na Loja de Móveis
    sofa: { nome: 'Sofá', ic: '🛋️', w: 2, d: 1, loja: true, acao: 'sentar um pouco', des: (x, y) => { caixa(x + 0.08, y + 0.1, 0, 1.84, 0.25, 1.0, '#3f8fe0'); caixa(x + 0.08, y + 0.3, 0, 1.84, 0.6, 0.45, '#6aa9ec'); caixa(x + 0.02, y + 0.3, 0.2, 0.18, 0.6, 0.45, '#3f8fe0'); caixa(x + 1.8, y + 0.3, 0.2, 0.18, 0.6, 0.45, '#3f8fe0'); caixa(x + 0.35, y + 0.18, 0.45, 0.4, 0.15, 0.35, '#ffd58a'); } },
    tv: { nome: 'Televisão', ic: '📺', w: 2, d: 1, loja: true, acao: 'ver um vídeo', des: (x, y) => { caixa(x + 0.1, y + 0.15, 0, 1.8, 0.7, 0.5, '#a0703f'); caixa(x + 0.3, y + 0.35, 0.5, 1.4, 0.12, 0.85, '#222222'); const k = Math.floor(agora / 600) % 3; naFace('y', x + 0.3, y + 0.35, 1.4, 0.12, 0.08, 0, 1.24, 0.58, 0.7, ['#7fd3f7', '#a8e6b8', '#f7a8c4'][k]); naFace('y', x + 0.3, y + 0.35, 1.4, 0.12, 0.3 + k * 0.2, 0, 0.3, 0.7, 0.25, '#ffffff'); } },
    piano: { nome: 'Piano', ic: '🎹', w: 2, d: 1, loja: true, acao: 'tocar uma música', des: (x, y) => { caixa(x + 0.1, y + 0.05, 0, 1.8, 0.45, 1.3, '#1d1d24'); caixa(x + 0.1, y + 0.5, 0.65, 1.8, 0.35, 0.1, '#1d1d24'); for (let i = 0; i < 9; i++) caixa(x + 0.14 + i * 0.19, y + 0.52, 0.75, 0.17, 0.3, 0.04, '#ffffff', { blocos: false }); for (const i of [0, 1, 3, 4, 5, 7]) caixa(x + 0.27 + i * 0.19, y + 0.52, 0.79, 0.09, 0.16, 0.04, '#111111', { blocos: false, contorno: false }); caixa(x + 0.15, y + 0.6, 0, 0.1, 0.1, 0.65, '#1d1d24'); caixa(x + 1.75, y + 0.6, 0, 0.1, 0.1, 0.65, '#1d1d24'); } },
    // itens especiais: presentes pelas estrelas secretas achadas no material didático (a contagem não é gasta)
    estatuaEstrela: { nome: 'Estátua de estrela', ic: '⭐', w: 1, d: 1, estrelas: 1, acao: 'admirar a estrela', des: (x, y) => { caixa(x + 0.25, y + 0.25, 0, 0.5, 0.5, 0.5, '#efe6d2'); emojiMovel(x, y, 1.0, '⭐'); } },
    globoEstrelas: { nome: 'Globo de estrelas', ic: '🌌', w: 1, d: 1, estrelas: 3, acao: 'girar o globo', des: (x, y) => { caixa(x + 0.3, y + 0.3, 0, 0.4, 0.4, 0.35, '#7a523a'); emojiMovel(x, y, 0.85, '🌌'); } },
    lanternaEstrela: { nome: 'Lanterna estelar', ic: '🏮', w: 1, d: 1, estrelas: 6, acao: 'acender a lanterna', des: (x, y) => { caixa(x + 0.45, y + 0.45, 0, 0.1, 0.1, 0.9, '#555555', { blocos: false }); emojiMovel(x, y, 1.15, '🏮'); } },
    mobilePlanetas: { nome: 'Móbile de planetas', ic: '🪐', w: 1, d: 1, estrelas: 10, acao: 'balançar o móbile', des: (x, y) => { caixa(x + 0.45, y + 0.45, 0, 0.1, 0.1, 1.4, '#a0703f', { blocos: false }); emojiMovel(x, y, 1.6, '🪐'); } },
    quadroCometa: { nome: 'Quadro do cometa', ic: '🌠', w: 1, d: 1, estrelas: 15, acao: 'ver o cometa', des: (x, y) => { caixa(x + 0.15, y + 0.02, 0.9, 0.7, 0.08, 0.7, '#2a2140', { blocos: false }); emojiMovel(x, y, 1.3, '🌠'); } },
    telescopioOuro: { nome: 'Luneta dourada', ic: '🔭', w: 1, d: 1, estrelas: 20, acao: 'olhar as estrelas', des: (x, y) => { caixa(x + 0.3, y + 0.3, 0, 0.4, 0.4, 0.5, '#d6a432'); emojiMovel(x, y, 1.0, '🔭'); } },
    coroaEstrelas: { nome: 'Coroa das estrelas', ic: '👑', w: 1, d: 1, estrelas: 30, acao: 'colocar a coroa', des: (x, y) => { caixa(x + 0.2, y + 0.2, 0, 0.6, 0.6, 0.6, '#c0392b'); emojiMovel(x, y, 1.1, '👑'); } },
    // móveis de madeira e pedra (os recursos vêm das árvores e das rochas, com as ferramentas do Mercadinho)
    bancoMadeira: { nome: 'Banco de madeira', ic: '🪑', w: 2, d: 1, custo: { madeira: 4 }, acao: 'descansar', des: (x, y) => { caixa(x + 0.1, y + 0.25, 0.35, 1.8, 0.5, 0.12, '#b07a45'); for (const dx of [0.15, 1.7]) caixa(x + dx, y + 0.3, 0, 0.15, 0.4, 0.35, '#8a5a2f'); } },
    lareira: { nome: 'Lareira de pedra', ic: '🔥', w: 2, d: 1, custo: { pedra: 5, madeira: 2 }, acao: 'acender a lareira', des: (x, y) => { caixa(x + 0.1, y + 0.05, 0, 1.8, 0.6, 1.3, '#9a9a96'); caixa(x + 0.55, y + 0.6, 0, 0.9, 0.06, 0.6, '#3a2a22', { blocos: false }); caixa(x + 0.7, y + 0.55, 0.05, 0.6, 0.06, 0.3, '#f08a24', { blocos: false }); caixa(x + 0.05, y, 1.3, 1.9, 0.7, 0.12, '#7d7d79'); } },
    // móveis de planta: a planta (projeto) se compra na Loja de Móveis e ensina a bancada a fazer o móvel
    escrivaninha: { nome: 'Escrivaninha', ic: '✍️', w: 2, d: 1, planta: 70, custo: { madeira: 5, livro: 1 }, acao: 'estudar um pouco', des: (x, y) => { caixa(x + 0.1, y + 0.15, 0.7, 1.8, 0.7, 0.1, '#b07a45'); for (const dx of [0.15, 1.7]) caixa(x + dx, y + 0.2, 0, 0.15, 0.6, 0.7, '#8a5a30'); caixa(x + 0.4, y + 0.3, 0.8, 0.5, 0.35, 0.05, '#fff7e8', { blocos: false }); caixa(x + 1.2, y + 0.35, 0.8, 0.12, 0.12, 0.25, '#e0564a', { blocos: false }); } },
    pingue: { nome: 'Mesa de pingue-pongue', ic: '🏓', w: 2, d: 2, planta: 120, custo: { madeira: 8 }, acao: 'jogar pingue-pongue', des: (x, y) => { for (const [a, b] of [[0.2, 0.2], [1.7, 0.2], [0.2, 1.7], [1.7, 1.7]]) caixa(x + a, y + b, 0, 0.1, 0.1, 0.6, '#555555', { blocos: false }); caixa(x + 0.1, y + 0.1, 0.6, 1.8, 1.8, 0.08, '#4bb259'); caixa(x + 0.1, y + 0.97, 0.68, 1.8, 0.06, 0.15, '#fff7e8', { blocos: false }); } },
    fonte: { nome: 'Fonte de pedra', ic: '⛲', w: 1, d: 1, planta: 90, custo: { pedra: 6 }, acao: 'ouvir a água', des: (x, y) => { caixa(x + 0.08, y + 0.08, 0, 0.84, 0.84, 0.35, '#9a9a96'); caixa(x + 0.15, y + 0.15, 0.35, 0.7, 0.7, 0.02, '#8fd8ea', { blocos: false }); caixa(x + 0.42, y + 0.42, 0.35, 0.16, 0.16, 0.45 + Math.sin(agora / 300) * 0.05, '#bfe9ff', { blocos: false }); } },
    fogao: { nome: 'Fogão a lenha', ic: '🍲', w: 1, d: 1, planta: 80, custo: { pedra: 4, madeira: 3 }, acao: 'cozinhar uma sopa', des: (x, y) => { caixa(x + 0.1, y + 0.1, 0, 0.8, 0.8, 0.75, '#c96a4a'); caixa(x + 0.1, y + 0.1, 0.75, 0.8, 0.8, 0.06, '#3a2a22'); caixa(x + 0.3, y + 0.3, 0.81, 0.4, 0.4, 0.25, '#7d8790'); caixa(x + 0.25, y + 0.88, 0.15, 0.5, 0.04, 0.3, '#f08a24', { blocos: false }); } },
    quadroPeixe: { nome: 'Quadro de peixe', ic: '🐟', w: 1, d: 1, planta: 60, custo: { peixe: 3, madeira: 1 }, acao: 'contar a história da pesca', des: (x, y) => { caixa(x + 0.15, y + 0.02, 0.9, 0.7, 0.08, 0.6, '#a0703f', { blocos: false }); naFace('y', x + 0.15, y + 0.02, 0.7, 0.08, 0.08, 0, 0.54, 1.0, 0.44, '#bfe9ff'); naFace('y', x + 0.15, y + 0.02, 0.7, 0.08, 0.2, 0, 0.3, 1.15, 0.14, '#f6b73c'); } },
    globo: { nome: 'Globo terrestre', ic: '🌍', w: 1, d: 1, planta: 100, custo: { madeira: 2, diamante: 1 }, acao: 'girar o globo', des: (x, y) => { caixa(x + 0.35, y + 0.35, 0, 0.3, 0.3, 0.08, '#a0703f'); caixa(x + 0.47, y + 0.47, 0.08, 0.06, 0.06, 0.55, '#a0703f', { blocos: false }); const [sx, sy] = iso(x + 0.5, y + 0.5, 0.85); ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(['🌍', '🌎', '🌏'][Math.floor(agora / 700) % 3], sx, sy); } },
    // móveis de evento: só se ganham completando as missões das datas comemorativas
    pinheiro: { nome: 'Árvore de Natal', ic: '🎄', w: 1, d: 1, evento: true, acao: 'acender as luzes', des: (x, y) => { caixa(x + 0.42, y + 0.42, 0, 0.16, 0.16, 0.3, '#a0703f', { blocos: false }); [[0.1, 0.3, 0.8], [0.2, 0.75, 0.6], [0.3, 1.15, 0.4]].forEach(([o, z, w]) => caixa(x + o, y + o, z, w, w, 0.45, '#3f9a5a')); caixa(x + 0.42, y + 0.42, 1.6, 0.16, 0.16, 0.16, '#ffd84a', { blocos: false }); luzinhas(x + 0.5, y + 0.5, 0.5, 1.3, 0.35); } },
    bolaEspelhada: { nome: 'Bola espelhada de Ano Novo', ic: '🪩', w: 1, d: 1, evento: true, acao: 'girar a bola', des: (x, y) => { caixa(x + 0.45, y + 0.45, 0, 0.1, 0.1, 1.1, '#888888', { blocos: false }); caixa(x + 0.25, y + 0.25, 1.1, 0.5, 0.5, 0.5, '#d9e3ea'); luzinhas(x + 0.5, y + 0.5, 1.15, 1.5, 0.3, ['#ffffff', '#c7f0ff', '#ffe9a8']); } },
    tambor: { nome: 'Tambor de Carnaval', ic: '🥁', w: 1, d: 1, evento: true, acao: 'tocar o tambor', des: (x, y) => { caixa(x + 0.2, y + 0.2, 0, 0.6, 0.6, 0.55, '#e0564a'); caixa(x + 0.18, y + 0.18, 0.55, 0.64, 0.64, 0.06, '#fff7e8'); naFace('y', x + 0.2, y + 0.2, 0.6, 0.6, 0, 0, 0.6, 0.25, 0.08, '#ffd84a'); naFace('x', x + 0.2, y + 0.2, 0.6, 0.6, 0, 0, 0.6, 0.25, 0.08, '#ffd84a'); } },
    ovao: { nome: 'Ovo de Páscoa gigante', ic: '🥚', w: 1, d: 1, evento: true, acao: 'admirar o ovo', des: (x, y) => { caixa(x + 0.25, y + 0.25, 0, 0.5, 0.5, 0.15, '#f7a8c4'); caixa(x + 0.15, y + 0.15, 0.15, 0.7, 0.7, 0.5, '#c7b4f2'); caixa(x + 0.22, y + 0.22, 0.65, 0.56, 0.56, 0.25, '#a8d8f7'); caixa(x + 0.32, y + 0.32, 0.9, 0.36, 0.36, 0.15, '#ffd58a'); } },
    balaoJunino: { nome: 'Balão de festa junina', ic: '🏮', w: 1, d: 1, evento: true, acao: 'acender o balão', des: (x, y) => { caixa(x + 0.47, y + 0.47, 0, 0.06, 0.06, 1.1, '#a0703f', { blocos: false }); caixa(x + 0.25, y + 0.25, 1.1, 0.5, 0.5, 0.5, '#f6b73c'); caixa(x + 0.3, y + 0.3, 1.6, 0.4, 0.4, 0.15, '#e0564a'); } },
    pipa: { nome: 'Pipa', ic: '🪁', w: 1, d: 1, evento: true, acao: 'brincar com a pipa', des: (x, y) => { caixa(x + 0.47, y + 0.47, 0, 0.06, 0.06, 1.2, '#a0703f', { blocos: false }); const [sx, sy] = iso(x + 0.5, y + 0.5, 1.6 + Math.sin(agora / 500) * 0.05); ctx.fillStyle = '#3f8fe0'; ctx.beginPath(); ctx.moveTo(sx, sy - 18); ctx.lineTo(sx + 12, sy); ctx.lineTo(sx, sy + 16); ctx.lineTo(sx - 12, sy); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ffd84a'; ctx.beginPath(); ctx.moveTo(sx, sy - 18); ctx.lineTo(sx + 12, sy); ctx.lineTo(sx, sy); ctx.closePath(); ctx.fill(); } },
    lousa: { nome: 'Lousa da professora', ic: '🧑‍🏫', w: 1, d: 1, evento: true, acao: 'ler a lousa', des: (x, y) => { caixa(x + 0.2, y + 0.4, 0, 0.08, 0.08, 1.2, '#a0703f', { blocos: false }); caixa(x + 0.72, y + 0.4, 0, 0.08, 0.08, 1.2, '#a0703f', { blocos: false }); caixa(x + 0.12, y + 0.35, 0.55, 0.76, 0.12, 0.65, '#2f5d46', { blocos: false }); naFace('y', x + 0.12, y + 0.35, 0.76, 0.12, 0.12, 0, 0.5, 0.95, 0.03, '#ffffff'); naFace('y', x + 0.12, y + 0.35, 0.76, 0.12, 0.12, 0, 0.35, 0.82, 0.03, '#ffffff'); } },
    abobora: { nome: 'Abóbora iluminada', ic: '🎃', w: 1, d: 1, evento: true, acao: 'acender a abóbora', des: (x, y) => { caixa(x + 0.2, y + 0.2, 0, 0.6, 0.6, 0.45, '#f08a24'); caixa(x + 0.45, y + 0.45, 0.45, 0.1, 0.1, 0.12, '#4f9a4b', { blocos: false }); naFace('y', x + 0.2, y + 0.2, 0.6, 0.6, 0.1, 0, 0.1, 0.25, 0.08, '#ffe066'); naFace('y', x + 0.2, y + 0.2, 0.6, 0.6, 0.38, 0, 0.1, 0.25, 0.08, '#ffe066'); naFace('y', x + 0.2, y + 0.2, 0.6, 0.6, 0.15, 0, 0.3, 0.1, 0.06, '#ffe066'); } }
  };
  /* pontinhos de luz piscando em volta de um objeto (árvore de Natal, enfeites) */
  function luzinhas(cx, cy, z0, z1, raio, cores = ['#ff5a5a', '#ffd84a', '#5ad1ff', '#7dff8a']) {
    for (let i = 0; i < 9; i++) {
      if ((Math.floor(agora / 400) + i) % 3 === 0) continue;
      const a = i * 2.4, z = z0 + (z1 - z0) * (i / 9), r = raio * (1 - i / 12);
      const [sx, sy] = iso(cx + Math.cos(a) * r, cy + Math.sin(a) * r, z);
      ctx.fillStyle = cores[i % cores.length]; ctx.beginPath(); ctx.arc(sx, sy, 2.6, 0, Math.PI * 2); ctx.fill();
    }
  }
  const casaNova = () => ({ cor: '#f7a8c4', guardados: {}, feitos: {}, visitou: false, dormiu: '',
    moveis: [{ id: 'estante', x: 0, y: 1 }, { id: 'computador', x: 2, y: 0 }, { id: 'bau', x: 4, y: 0 }, { id: 'espelho', x: 6, y: 0 }, { id: 'cama', x: 8, y: 0 }, { id: 'bancada', x: 10, y: 0 }] });

  const lojaNova = () => ({ tem: {}, dividas: [], compras: 0 });
  /* ---------- estado salvo ---------- */
  const CHAVE = 'mundo-site-v1';
  const AV_PADRAO = { pele: PELES[1], cabelo: CABELOS[0], estilo: 'curto', camisa: '#3f8fe0', calca: '#2f3b6b', sapato: '#5a3b2a', acessorio: 'nada' };
  const novo = () => ({ pontos: 0, acertos: 0, erros: 0, itens: {}, cont: {}, inv: {}, falas: {}, resp: {}, feitos: {}, abertos: {}, concluidas: {}, dicas: {}, av: Object.assign({}, AV_PADRAO), casa: casaNova(), pet: null, hab: {}, amizade: {}, diaNpc: {}, album: { tem: {}, paginas: {} }, recompensas: {}, gostos: {}, enigma: {}, quebra: 0, especial: 0, eventos: {}, medalhas: {}, loja: lojaNova(), turma: { nome: '', codigo: '' }, projetos: { doou: {}, prontos: {} }, prof: {}, oficina: {}, banco: { poup: 0, dia: 0, mesada: 0, meta: null, extrato: [] }, estacoes: {}, x: 3.5, y: MEIO, fase: 0, versao: 3 });
  let S = novo();
  try { const v = JSON.parse(localStorage.getItem(CHAVE)); if (v && typeof v.pontos === 'number') S = Object.assign(novo(), v); } catch (e) {}
  S.av = Object.assign({}, AV_PADRAO, S.av);
  S.casa = Object.assign(casaNova(), S.casa);
  S.loja = Object.assign(lojaNova(), S.loja);
  S.kits = S.kits || {};
  S.banco = Object.assign({ poup: 0, dia: 0, mesada: 0, meta: null, extrato: [] }, S.banco);
  // versão anterior (casas em fileiras): a posição salva não serve mais, e os itens antigos contam para a missão
  if (!S.cont || !Object.keys(S.cont).length) for (const k of Object.keys(S.itens || {})) { const fid = k.split('-')[0]; S.cont[fid] = (S.cont[fid] || 0) + 1; }
  for (const k of Object.keys(S.itens)) if (!k.includes('-s' + SEMANA + '-')) delete S.itens[k];   // só os desta semana
  if (S.versao !== 3 && S.versao !== 4) { S.x = 3.5; S.y = MEIO; S.fase = 0; S.versao = 3; }   // versão 3: vilas em grade
  if (S.versao === 3) { if (S.fase === 6) S.fase = 7; S.versao = 4; }                               // versão 4: Campus do Ensino Médio antes da escola
  let restaurando = false;   // depois de restaurar um código, nada mais pode gravar por cima antes de recarregar
  function salvar(avisa) { if (restaurando) return; sincProgresso(); try { localStorage.setItem(CHAVE, JSON.stringify(S)); if (avisa) aviso('💾 Progresso salvo!'); } catch (e) { if (avisa) aviso('Não deu para salvar neste navegador.'); } }

  /* ---------- missões ---------- */
  function missoes(f) {
    const jog = f.lugares.filter(l => S.feitos[l.id]).length;
    const perg = Object.keys(S.resp).filter(id => id.startsWith(`n:${f.id}:`) || f.perguntas.some(p => p.id === id)).length;
    const falas = f.npcs.filter(n => S.falas[n.id]).length;
    const verbo = f.id === 'escola' ? 'Visitar' : f.id === 'lab' ? 'Experimentar' : f.id === 'medio' ? 'Concluir' : 'Jogar';
    const coisa = f.id === 'escola' ? 'páginas' : f.id === 'lab' ? 'simuladores' : f.id === 'medio' ? 'desafios' : 'jogos';
    return [
      { nome: `${verbo} ${f.metaJogar} ${coisa}`, n: jog, meta: f.metaJogar, habs: uniao(f.lugares.map(habsLugar)) },
      { nome: `Responder ${f.metaPerg} perguntas`, n: perg, meta: f.metaPerg, habs: uniao(f.perguntas.map(p => p.habs || []).concat(bancosDe(f.id).map(b => b.habs || []))) },
      { nome: `Coletar ${f.nItens} itens`, n: S.cont[f.id] || 0, meta: f.nItens, habs: [] },
      { nome: `Conversar com ${f.nNpc} moradores`, n: falas, meta: f.nNpc, habs: [] }
    ].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  const concluida = f => missoes(f).every(m => m.ok);
  const liberada = f => f.idx === 0 || f.aberta || concluida(fases[f.idx - 1]);
  /* ---------- som: efeitos e música feitos na hora pelo Web Audio (sem arquivos, funcionam sem internet) ---------- */
  const SOM = (() => {
    const CH = 'mundo-som-v1';
    let pref = { efeitos: true, musica: false };
    try { pref = Object.assign(pref, JSON.parse(localStorage.getItem(CH)) || {}); } catch (e) {}
    let ac = null, mestre = null, timer = null, passo = 0;
    const guarda = () => { try { localStorage.setItem(CH, JSON.stringify(pref)); } catch (e) {} };
    function ctxAudio() {
      if (!ac) { const A = window.AudioContext || window.webkitAudioContext; if (!A) return null; ac = new A(); mestre = ac.createGain(); mestre.gain.value = 0.5; mestre.connect(ac.destination); }
      if (ac.state === 'suspended') ac.resume();
      return ac;
    }
    function nota(freq, ini, dur, tipo, vol) {
      const a = ctxAudio(); if (!a) return;
      const o = a.createOscillator(), g = a.createGain(), t = a.currentTime + ini;
      o.type = tipo || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(mestre); o.start(t); o.stop(t + dur + 0.05);
    }
    const EFEITOS = {
      acerto: () => { nota(660, 0, 0.12, 'triangle'); nota(990, 0.09, 0.2, 'triangle'); },
      erro: () => { nota(220, 0, 0.18, 'sine', 0.15); nota(185, 0.12, 0.25, 'sine', 0.12); },
      coleta: () => { nota(880, 0, 0.08, 'square', 0.06); nota(1320, 0.06, 0.12, 'square', 0.05); },
      moeda: () => { nota(1046, 0, 0.07, 'triangle', 0.12); nota(1568, 0.05, 0.15, 'triangle', 0.1); },
      portao: () => { [392, 523, 659].forEach((f, i) => nota(f, i * 0.07, 0.25, 'sine', 0.12)); },
      vitoria: () => { [523, 659, 784, 1046].forEach((f, i) => nota(f, i * 0.12, i === 3 ? 0.6 : 0.2, 'triangle', 0.16)); },
      figurinha: () => { [784, 988, 1175].forEach((f, i) => nota(f, i * 0.06, 0.18, 'triangle', 0.1)); }
    };
    // música: arpejo calmo na escala pentatônica; cada vila tem a sua nota base
    const PENTA = [0, 2, 4, 7, 9, 12, 14, 16];
    function compasso() {
      if (document.hidden) return;
      const base = 220 * Math.pow(2, ([0, 5, 7, 2, 9, 4, 11, 6, 3][(atual && atual.idx) || 0] || 0) / 12);
      const r = rng(passo * 31 + 7)(), grau = PENTA[Math.floor(r * PENTA.length)];
      nota(base * 2 * Math.pow(2, grau / 12), 0, 0.9, 'sine', 0.045);
      if (passo % 8 === 0) { nota(base, 0, 3.2, 'triangle', 0.03); nota(base * 1.5, 0, 3.2, 'sine', 0.02); }
      passo++;
    }
    function tocaMusica(liga) {
      clearInterval(timer); timer = null;
      if (liga && ctxAudio()) timer = setInterval(compasso, 480);
    }
    // o navegador só libera o som depois de um toque ou tecla
    const destrava = () => { if (pref.efeitos || pref.musica) ctxAudio(); if (pref.musica && !timer) tocaMusica(true); };
    window.addEventListener('pointerdown', destrava, { once: false, passive: true });
    window.addEventListener('keydown', destrava, { passive: true });
    return {
      toca(nome) { if (pref.efeitos && EFEITOS[nome]) try { EFEITOS[nome](); } catch (e) {} },
      pref: () => pref,
      liga(k, v) { pref[k] = v; guarda(); if (k === 'musica') tocaMusica(v); if (v) ctxAudio(); }
    };
  })();
  function pontos(n, txt) { S.pontos += n; if (txt) aviso(`+${n} ⭐ ${txt}`); if (n > 0) SOM.toca('moeda'); hud(); }
  function confereFases() {
    for (const f of fases) if (concluida(f) && !S.concluidas[f.id]) {
      S.concluidas[f.id] = true; SOM.toca('vitoria'); S.inv.peca = (S.inv.peca || 0) + 1; setTimeout(() => ganhaFigurinha(null, 'pela fase concluída'), 1800);
      pontos(100, `Fase concluída: ${f.nome}! +🧩` + (f.idx < fases.length - 1 && !fases[f.idx + 1].aberta ? ` O caminho para ${fases[f.idx + 1].nome} está aberto.` : ''));
    }
    salvar();
  }
  /* jogos que registraram progresso no Meu progresso contam como concluídos (é o mesmo progresso da página do jogo) */
  function confereJogos() {
    let novos = 0;
    const antes = niveisAgora();
    for (const l of todosLugares) {
      if (S.feitos[l.id] || !l.rec || !window.MDP) continue;
      const r = MDP.resultado(l.id);
      if (r && r.n > 0) { S.feitos[l.id] = r.b || 1; novos++; }
    }
    if (novos) comparaNiveis(antes);
    if (novos) { S.pontos += 25 * novos; aviso(novos === 1 ? '🎉 Atividade concluída! A casa ganhou cor. +25 ⭐' : `🎉 ${novos} atividades concluídas! +${25 * novos} ⭐`); hud(); confereFases(); }
    confereMissoesJogos();
  }
  /* ---------- missões dos jogos: terminar dois jogos do site que combinam libera uma roupa exclusiva e uma figurinha ---------- */
  const MISSOES_JOGOS = [
    { id: 'logica', ic: '🏭', nome: 'Engenharia lógica', jogos: ['fabrica-logica', 'robo'], premio: ['camisa', '#f28c28', 'Camiseta Fábrica Lógica'] },
    { id: 'correio', ic: '📦', nome: 'Carteiro das redes', jogos: ['pacotes', 'rotas'], premio: ['camisa', '#e8c547', 'Camiseta do Correio de Pacotes'] },
    { id: 'bits', ic: '🔢', nome: 'Mestre dos bits', jogos: ['vale-bits', 'paridade'], premio: ['calca', '#1d1d1d', 'Calça binária'] },
    { id: 'sucos', ic: '🧃', nome: 'Empreendedorismo', jogos: ['empresa-sucos', 'mesada'], premio: ['camisa', '#7bc67e', 'Camiseta da Empresa de Sucos'] },
    { id: 'juros', ic: '🪙', nome: 'Dinheiro que cresce', jogos: ['cofrinho', 'poupanca'], premio: ['calca', '#c9a227', 'Calça dourada'] },
    { id: 'seguro', ic: '🔐', nome: 'Guardião digital', jogos: ['senha', 'golpe'], premio: ['camisa', '#1f6f50', 'Camiseta do guardião digital'] },
    { id: 'codigo', ic: '🐍', nome: 'Programação', jogos: ['python', 'cidade-blocos'], premio: ['camisa', '#3b6fb6', 'Camiseta Python'] },
    { id: 'dados', ic: '🌦️', nome: 'Ciência de dados', jogos: ['meteorologista', 'chatbot'], premio: ['camisa', '#9b59b6', 'Camiseta cientista de dados'] },
    { id: 'detetive', ic: '🕵️', nome: 'Detetive da informação', jogos: ['cifra', 'boato'], premio: ['calca', '#6b4f3a', 'Calça de detetive'] }
  ];
  const lugarPorId = id => todosLugares.find(l => l.id === id);
  const missoesJogos = () => MISSOES_JOGOS.filter(m => m.jogos.every(lugarPorId));
  function confereMissoesJogos() {
    S.jogosMissao = S.jogosMissao || {};
    for (const m of missoesJogos()) if (!S.jogosMissao[m.id] && m.jogos.every(id => S.feitos[id])) {
      const [k, cor, nome] = m.premio;
      S.jogosMissao[m.id] = true; S.loja.tem[`cor:${k}:${cor}`] = true; S.medalhas['jogos-' + m.id] = { ic: m.ic, nome: m.nome };
      pontos(30, `${m.ic} Missão ${m.nome} completa! Você ganhou: ${nome}.`);
      setTimeout(() => ganhaFigurinha(null, 'pela missão dos jogos'), 1800);
      salvar();
    }
  }
  /* ---------- feira da vila: fabricar com os itens do inventário e vender; o preço segue a oferta e a procura ----------
     Cada dia sorteia a procura de cada produto (sempre a mesma para o mesmo dia). O preço de cada unidade é
     base × (0,5 + procura ÷ 12) × procura ÷ (procura + vendidas hoje): procura alta deixa o preço maior, e quanto mais você vende do mesmo produto no dia, mais barato fica. */
  const FEIRA = [
    { id: 'sucoMaca', ic: '🧃', nome: 'Suco de maçã', base: 30, receita: { maca: 2 } },
    { id: 'marcador', ic: '🔖', nome: 'Marcador de livro', base: 25, receita: { livro: 1 } },
    { id: 'pulseira', ic: '📿', nome: 'Pulseira de estrelas', base: 40, receita: { estrela: 2 } },
    { id: 'chaveiro', ic: '🗝️', nome: 'Chaveiro', base: 45, receita: { chave: 1, estrela: 1 } },
    { id: 'broche', ic: '💠', nome: 'Broche de diamante', base: 60, receita: { diamante: 1 } },
    { id: 'sazonal', ic: '🧺', nome: 'Cesta da estação', base: 50, receita: () => ({ [ESTACAO.item]: 3 }) }
  ];
  const NOTICIAS = [['☀️ Dia de calor: todo mundo quer suco!', 'sucoMaca'], ['📚 Semana da leitura na escola!', 'marcador'], ['🎉 Festa no fim de semana: enfeites em alta!', 'pulseira'], ['🏫 Volta às aulas: mochilas pedem chaveiros!', 'chaveiro'], ['💍 Feira de artesanato na praça!', 'broche'], ['🍂 Turistas visitando as vilas!', 'sazonal']];
  const receitaDe = p => typeof p.receita === 'function' ? p.receita() : p.receita;
  function diaFeira() {
    const d = diaHoje(), F = S.feira || (S.feira = { dia: d, vendidas: {}, estoque: {}, ganho: 0, vendas: 0 });
    if (F.dia !== d) { F.dia = d; F.vendidas = {}; }
    const r = rng(d * 7919 + 17), procura = {};
    for (const p of FEIRA) procura[p.id] = 2 + Math.floor(r() * 9);          // de 2 a 10
    const nt = NOTICIAS[Math.floor(r() * NOTICIAS.length)]; procura[nt[1]] += 6;
    return { F, procura, noticia: nt[0] };
  }
  const precoUnit = (p, procura, vendidas) => Math.max(1, Math.round(p.base * (0.5 + procura / 12) * procura / (procura + vendidas)));
  function janelaFeira() {
    const { F, procura, noticia } = diaFeira();
    const nivel = v => v >= 10 ? '🔥 alta' : v >= 6 ? '🙂 média' : '🧊 baixa';
    $('#feira-conteudo').innerHTML = `<p class="feira-noticia">${noticia}</p>
      <p>Fabrique produtos com os itens do inventário e venda na feira. <b>Oferta e procura:</b> cada produto tem uma procura do dia, e procura alta paga mais; quanto mais unidades do mesmo produto você vende hoje, mais o preço cai. Amanhã a procura muda.</p>
      <p class="small">Vendas: <b>${F.vendas}</b> · ganho total: <b>${F.ganho} ⭐</b></p>
      <div class="projetos">${FEIRA.map(p => {
        const rc = receitaDe(p), pode = Object.entries(rc).every(([k, n]) => (S.inv[k] || 0) >= n), est = F.estoque[p.id] || 0, v = F.vendidas[p.id] || 0, pr = precoUnit(p, procura[p.id], v);
        return `<div class="proj"><h3>${p.ic} ${esc(p.nome)}</h3>
          <p class="small">Receita: ${Object.entries(rc).map(([k, n]) => `<span class="${(S.inv[k] || 0) >= n ? 'tem' : 'falta'}">${n} ${ITENS[k][0]}</span>`).join(' + ')} · no estoque: <b>${est}</b></p>
          <p class="small">Procura hoje: ${nivel(procura[p.id])} · vendidas hoje: ${v} · <b>preço agora: ${pr} ⭐</b></p>
          <table class="em-tab"><tr><th>próxima unidade</th>${[0, 1, 2, 3, 4].map(k => `<th>${v + k + 1}ª</th>`).join('')}</tr><tr><td>preço</td>${[0, 1, 2, 3, 4].map(k => `<td>${precoUnit(p, procura[p.id], v + k)}</td>`).join('')}</tr></table>
          <div class="btn-row"><button type="button" class="hb azul" data-fab="${p.id}" ${pode ? '' : 'disabled'}>🛠️ Fabricar 1</button><button type="button" class="hb verde" data-vende="${p.id}" ${est ? '' : 'disabled'}>💰 Vender 1</button></div></div>`;
      }).join('')}</div>
      <p class="muted small">Dica: venda o produto com procura alta primeiro e guarde no estoque o que está com preço baixo para vender outro dia.</p>`;
    $('#feira-conteudo').querySelectorAll('[data-fab]').forEach(b => b.addEventListener('click', () => {
      const p = FEIRA.find(q => q.id === b.dataset.fab), rc = receitaDe(p);
      if (!Object.entries(rc).every(([k, n]) => (S.inv[k] || 0) >= n)) return;
      for (const [k, n] of Object.entries(rc)) S.inv[k] -= n;
      F.estoque[p.id] = (F.estoque[p.id] || 0) + 1; salvar(); aviso(`🛠️ ${p.ic} ${p.nome} fabricado!`); janelaFeira();
    }));
    $('#feira-conteudo').querySelectorAll('[data-vende]').forEach(b => b.addEventListener('click', () => vendeFeira(FEIRA.find(q => q.id === b.dataset.vende))));
  }
  function vendeFeira(p) {
    const { F, procura } = diaFeira(), v = F.vendidas[p.id] || 0, pr = precoUnit(p, procura[p.id], v), prox = precoUnit(p, procura[p.id], v + 1);
    if (!F.estoque[p.id]) return;
    // para vender, a pessoa calcula: ou o preço da próxima unidade, ou quanto o preço caiu
    const tipo = Math.floor(Math.random() * 2);
    const q = tipo === 0 ? { enun: `Esta unidade de ${p.nome.toLowerCase()} sai por <b>${pr} ⭐</b> e a próxima vai sair por <b>${prox} ⭐</b>, porque a oferta aumenta. Se você vender as duas, quanto recebe ao todo?`, certa: pr + prox, erradas: [pr * 2, prox * 2, pr + prox + 5, pr - prox] }
      : { enun: `Esta unidade sai por <b>${pr} ⭐</b>. Depois de vendê-la, a próxima vai custar <b>${prox} ⭐</b>. Quanto o preço vai cair?`, certa: pr - prox, erradas: [pr + prox, prox, pr - prox + 2, 1] };
    const alts = [q.certa]; for (const e of q.erradas) if (alts.length < 4 && e >= 0 && !alts.includes(e)) alts.push(e);
    alts.sort(() => Math.random() - 0.5);
    fechaJanela();
    dialogo('💰', `Vender ${p.ic} ${p.nome}`, `<p>${q.enun}</p>`, alts.map(a => ({ txt: `${a} ⭐`, fn: () => {
      if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
      const certo = a === q.certa;
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (alts[j] === q.certa) b.classList.add('certa'); else if (alts[j] === a) b.classList.add('errada'); });
      if (certo) { F.estoque[p.id]--; F.vendidas[p.id] = v + 1; F.ganho += pr; F.vendas++; pontos(pr, `${p.ic} Vendido na feira!`); ganhaHabilidade(['NU', 'AL'], 8); salvar(); }
      D.texto.innerHTML += `<p><strong>${certo ? `✅ Venda feita: +${pr} ⭐.` : '❌ A conta não bateu, e o cliente foi embora. Tente de novo.'}</strong></p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Voltar à feira';
      b.addEventListener('click', () => { fechaDialogo(); abreJanela('feira'); }); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  function janelaJogos() {
    S.jogosMissao = S.jogosMissao || {};
    $('#jogos-conteudo').innerHTML = `<p>Termine os dois jogos de cada missão para ganhar uma <b>roupa exclusiva</b> para o avatar, +30 ⭐ e uma figurinha. Os jogos abrem em outra aba, e o progresso volta para cá sozinho.</p>
      <div class="projetos">${missoesJogos().map(m => { const ok = S.jogosMissao[m.id], [, cor, nome] = m.premio; return `<div class="proj ${ok ? 'pronto' : ''}"><h3>${m.ic} ${esc(m.nome)} ${ok ? '✅' : ''}</h3>
        <ul class="etapas">${m.jogos.map(lugarPorId).map(l => `<li class="${S.feitos[l.id] ? 'ok' : ''}">${S.feitos[l.id] ? '✅' : '⬜'} <a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.icone)} ${esc(l.titulo)}</a></li>`).join('')}</ul>
        ${(hs => hs.length ? `<p class="small">BNCC: ${chipsHabs(hs)}</p>` : '')(uniao(m.jogos.map(lugarPorId).map(habsLugar)))}
        <p class="small"><span class="amostra" style="background:${cor}"></span> Prêmio: ${esc(nome)}${ok ? ' <b>(já está no seu 👤 Avatar)</b>' : ''}</p></div>`; }).join('')}</div>`;
  }

  /* ---------- projeção isométrica ---------- */
  const TW = 64, TH = 32, BH = 30;          // largura e altura do losango do chão; altura de um bloco
  const iso = (x, y, z = 0) => [(x - y) * TW / 2, (x + y) * TH / 2 - z * BH];
  const cv = $('#jogo'), ctxJogo = cv.getContext('2d');
  let ctx = ctxJogo;
  let W = 0, HH = 0, zoom = 1, dpr = 1;
  /* qualidade: começa boa e cai sozinha (menos pixels, sem flores) se o aparelho não der conta de ~30 quadros por segundo */
  const grosso = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches);
  let leve = false;
  const desempenho = { n: 0, t: 0 };
  function ajusta() {
    dpr = leve ? 1 : Math.min(window.devicePixelRatio || 1, grosso ? 1.5 : 2);
    W = cv.clientWidth; HH = cv.clientHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(HH * dpr);
    zoom = W < 700 ? 0.72 : Math.max(0.8, Math.min(1.2, W / 1300));
  }
  window.addEventListener('resize', ajusta); ajusta();
  const cam = { x: 0, y: 0 };

  /* cores */
  function mistura(hex, alvo, t) {
    const a = parseInt(hex.slice(1), 16), b = parseInt(alvo.slice(1), 16);
    const c = [16, 8, 0].map(s => Math.round(((a >> s) & 255) * (1 - t) + ((b >> s) & 255) * t));
    return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
  }
  const claro = (c, t = 0.25) => mistura(c, '#ffffff', t), escuro = (c, t = 0.2) => mistura(c, '#000000', t);

  /* chão: um losango com textura de pixels, no estilo dos jogos de blocos (feito uma vez e reaproveitado) */
  const texCache = {};
  function textura(cor, variante, extra) {
    const k = cor + variante + (extra || '');
    if (texCache[k]) return texCache[k];
    const c = document.createElement('canvas'); c.width = TW; c.height = TH;
    const g = c.getContext('2d'), r = rng(cor.length * 97 + variante * 13 + (extra ? 7 : 0) + parseInt(cor.slice(1), 16) % 1000);
    g.beginPath(); g.moveTo(TW / 2, 0); g.lineTo(TW, TH / 2); g.lineTo(TW / 2, TH); g.lineTo(0, TH / 2); g.closePath(); g.clip();
    g.fillStyle = cor; g.fillRect(0, 0, TW, TH);
    for (let i = 0; i < 26; i++) { g.fillStyle = r() < 0.5 ? claro(cor, 0.12) : escuro(cor, 0.06); g.fillRect(Math.floor(r() * 16) * 4, Math.floor(r() * 8) * 4, 4, 4); }
    if (extra === 'praca') { g.strokeStyle = escuro(cor, 0.08); g.lineWidth = 1; g.beginPath(); g.moveTo(TW / 4, TH / 4); g.lineTo(TW * 3 / 4, TH * 3 / 4); g.moveTo(TW * 3 / 4, TH / 4); g.lineTo(TW / 4, TH * 3 / 4); g.stroke(); }
    if (extra === 'agua') { g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 2; const o = variante * 8; g.beginPath(); g.moveTo(12 + o, 14); g.lineTo(22 + o, 14); g.moveTo(30 + o / 2, 20); g.lineTo(40 + o / 2, 20); g.stroke(); }
    g.strokeStyle = 'rgba(0,0,0,.05)'; g.lineWidth = 1; g.beginPath(); g.moveTo(TW / 2, 0.5); g.lineTo(TW - 0.5, TH / 2); g.lineTo(TW / 2, TH - 0.5); g.lineTo(0.5, TH / 2); g.closePath(); g.stroke();
    return (texCache[k] = c);
  }
  const COR_CHAO = { [T.grama]: ESTACAO.grama, [T.praca]: '#fdf1c7', [T.agua]: '#8fd8ea', [T.areia]: '#f8e7b5' };

  /* caixa isométrica: (x, y) canto de trás, w × d de base, de z0 até z0 + h; faces com linhas de blocos */
  function caixa(x, y, z0, w, d, h, cor, op = {}) {
    const p = (a, b, c) => iso(a, b, c);
    const z1 = z0 + h;
    const topo = [p(x, y, z1), p(x + w, y, z1), p(x + w, y + d, z1), p(x, y + d, z1)];
    const esq = [p(x, y + d, z0), p(x + w, y + d, z0), p(x + w, y + d, z1), p(x, y + d, z1)];
    const dir = [p(x + w, y, z0), p(x + w, y + d, z0), p(x + w, y + d, z1), p(x + w, y, z1)];
    const poli = (pts, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) ctx.lineTo(...pts[i]); ctx.closePath(); ctx.fill(); };
    poli(esq, op.esq || cor); poli(dir, op.dir || escuro(cor, 0.16)); poli(topo, op.topo || claro(cor, 0.22));
    if (op.blocos !== false && h >= 0.5) {
      ctx.strokeStyle = 'rgba(0,0,0,.08)'; ctx.lineWidth = 1; ctx.beginPath();
      for (let z = z0 + 0.5; z < z1 - 0.01; z += 0.5) { ctx.moveTo(...p(x, y + d, z)); ctx.lineTo(...p(x + w, y + d, z)); ctx.lineTo(...p(x + w, y, z)); }
      for (let i = x + 1; i < x + w - 0.01; i++) { ctx.moveTo(...p(i, y + d, z0)); ctx.lineTo(...p(i, y + d, z1)); }
      for (let j = y + 1; j < y + d - 0.01; j++) { ctx.moveTo(...p(x + w, j, z0)); ctx.lineTo(...p(x + w, j, z1)); }
      ctx.stroke();
    }
    if (op.contorno !== false) {
      ctx.strokeStyle = 'rgba(40,30,60,.28)'; ctx.lineWidth = 1.2; ctx.beginPath();
      ctx.moveTo(...topo[0]); ctx.lineTo(...topo[1]); ctx.lineTo(...dir[1]); ctx.lineTo(...esq[0]); ctx.lineTo(...topo[3]); ctx.closePath();
      ctx.moveTo(...topo[2]); ctx.lineTo(...esq[1]); ctx.stroke();
    }
  }
  /* janela ou porta pintada numa face: face 'y' (esquerda na tela) ou 'x' (direita) */
  function naFace(face, bx, by, w, d, a, b, larg, z0, alt, cor) {
    const pts = face === 'y'
      ? [iso(bx + a, by + d, z0), iso(bx + a + larg, by + d, z0), iso(bx + a + larg, by + d, z0 + alt), iso(bx + a, by + d, z0 + alt)]
      : [iso(bx + w, by + a, z0), iso(bx + w, by + a + larg, z0), iso(bx + w, by + a + larg, z0 + alt), iso(bx + w, by + a, z0 + alt)];
    ctx.fillStyle = cor; ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); ctx.fill();
  }

  /* ---------- desenho das coisas do mundo ---------- */
  function desenhaCasa(c, perto) {
    const feito = !!S.feitos[c.lugar.id];
    const base = feito ? c.cor : '#d4d4cf', telhado = feito ? escuro(c.cor, 0.28) : '#a8a8a2';
    const x = c.gx, y = c.y, w = c.w, d = c.d, h = c.altura, tipo = c.lugar.tipo;
    sombra(x + w / 2, y + d / 2, 1.9);
    if (tipo === 'sim') {
      caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, 1.4, base);
      const vidro = feito ? '#bdeffa' : '#e2e2de';
      caixa(x + 0.5, y + 0.5, 1.4, w - 1, d - 1, 0.5, vidro); caixa(x + 0.8, y + 0.8, 1.9, w - 1.6, d - 1.6, 0.4, vidro); caixa(x + 1.15, y + 1.15, 2.3, w - 2.3, d - 2.3, 0.35, vidro);
    } else if (tipo === '3d') {
      caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, 1.2, base);
      caixa(x + 0.7, y + 0.7, 1.2, w - 1.4, d - 1.4, h, claro(base, 0.1));
      caixa(x + 0.95, y + 0.95, 1.2 + h, w - 1.9, d - 1.9, 0.5, telhado);
    } else if (tipo === 'pagina') {
      caixa(x + 0.1, y + 0.2, 0, w - 0.2, d - 0.4, h, base);
      caixa(x, y + 0.1, h, w, d - 0.2, 0.25, telhado);
      caixa(x + w - 1.1, y + 0.4, h + 0.25, 0.8, 0.8, 1.1, base); caixa(x + w - 1.2, y + 0.3, h + 1.35, 1, 1, 0.3, telhado);
    } else {
      caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, h, base);
      caixa(x, y, h, w, d, 0.4, telhado); caixa(x + 0.45, y + 0.45, h + 0.4, w - 0.9, d - 0.9, 0.4, telhado); caixa(x + 0.9, y + 0.9, h + 0.8, w - 1.8, d - 1.8, 0.4, telhado);
      caixa(x + w - 0.9, y + 0.5, h + 0.4, 0.4, 0.4, 1, escuro(base, 0.25));   // chaminé
    }
    // janelas e porta nas faces que aparecem
    const vid = feito ? '#cfefff' : '#ececea', mol = feito ? '#ffffff' : '#bdbdb8';
    const hh = tipo === 'sim' ? 1.4 : tipo === '3d' ? 1.2 : h;
    for (const face of ['y', 'x']) {
      const bx = x + (tipo === 'pagina' ? 0.1 : 0.2), by = y + 0.2, ww = w - (tipo === 'pagina' ? 0.2 : 0.4), dd = d - 0.4;
      const portaAqui = (face === 'y' && c.ladoPorta === 'y+') || (face === 'x' && c.ladoPorta === 'x+'), comp = face === 'y' ? ww : dd;
      if (!portaAqui || comp >= 3.2) { naFace(face, bx, by, ww, dd, 0.35, 0, 0.75, hh * 0.45, Math.min(0.6, hh * 0.35), mol); naFace(face, bx, by, ww, dd, 0.42, 0, 0.61, hh * 0.45 + 0.06, Math.min(0.48, hh * 0.3), vid); }
      // porta no meio da face (onde o jogador entra), escura o bastante para aparecer também nas casas cinza
      if (portaAqui) { const o = (comp - 0.7) / 2; naFace(face, bx, by, ww, dd, o - 0.06, 0, 0.82, 0, 1.12, feito ? '#f3e2c4' : '#d8d8d2'); naFace(face, bx, by, ww, dd, o, 0, 0.7, 0, 1.05, feito ? '#8a5a2e' : '#5f5f5a'); naFace(face, bx, by, ww, dd, o + 0.52, 0, 0.09, 0.5, 0.09, '#ffd84a'); }
      else naFace(face, bx, by, ww, dd, (face === 'y' ? ww : dd) - 1.25, 0, 0.75, hh * 0.45, Math.min(0.6, hh * 0.35), vid);
    }
    // placa flutuante com o ícone (e o ✅ quando concluída)
    const topoZ = tipo === 'sim' ? 2.9 : tipo === '3d' ? 1.8 + h : tipo === 'pagina' ? h + 1.9 : h + 1.4;
    const [sx, sy] = iso(x + w / 2, y + d / 2, topoZ + 0.6 + Math.sin(agora / 500 + x) * 0.06);
    ctx.fillStyle = feito ? '#ffffff' : 'rgba(255,255,255,.75)'; ctx.strokeStyle = feito ? escuro(c.cor, 0.35) : '#9a9a95'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.globalAlpha = feito ? 1 : 0.6; ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(c.lugar.icone, sx, sy - 1); ctx.globalAlpha = 1;
    if (feito) { ctx.font = '14px system-ui, sans-serif'; ctx.fillText('✅', sx + 16, sy - 16); }
    if (DECOR.has('abobora')) { const ax = x - 0.15, ay = y + d - 0.6; caixa(ax, ay, 0, 0.45, 0.45, 0.32, '#f08a24', { blocos: false }); naFace('y', ax, ay, 0.45, 0.45, 0.08, 0, 0.08, 0.16, 0.06, '#ffe066'); naFace('y', ax, ay, 0.45, 0.45, 0.28, 0, 0.08, 0.16, 0.06, '#ffe066'); }
    if (DECOR.has('baloes') && !leve) for (let k = 0; k < 3; k++) { const [bx2, by2] = iso(x + 0.3 + k * 0.4, y + d, h + 1.2 + k * 0.25 + Math.sin(agora / 700 + k + x) * 0.1); ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx2, by2 + 9); ctx.lineTo(bx2, by2 + 30); ctx.stroke(); ctx.fillStyle = ['#e0564a', '#ffd84a', '#3f8fe0'][k]; ctx.beginPath(); ctx.ellipse(bx2, by2, 7, 9, 0, 0, Math.PI * 2); ctx.fill(); }
    if (pistaNaCasa(c) >= 0) { const z = Math.sin(agora / 300) * 3; ctx.fillStyle = '#ffe066'; ctx.strokeStyle = '#b8860b'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(sx + 26, sy - 18 + z, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.font = '15px system-ui, sans-serif'; ctx.fillStyle = '#000'; ctx.fillText('🔎', sx + 26, sy - 18 + z); }
    if (perto) rotulo(c.lugar.titulo, sx, sy - 34);
  }
  /* a casa do jogador: maior, com telhado em degraus, floreiras e fumaça na chaminé */
  function desenhaMinhaCasa(c, perto, enigma, est) {
    const st = est || (enigma ? { base: '#b9a3e8', telhado: '#5b3f8f', porta: '#e0b84a', ic: '🔐', nome: 'Casa do Enigma' } : { base: S.casa.cor, telhado: escuro(S.casa.cor, 0.3), porta: '#9a6a3a', ic: '🏠', nome: 'Sua casa' });
    const x = c.gx, y = c.y, w = c.w, d = c.d, base = st.base, telhado = st.telhado;
    sombra(x + w / 2, y + d / 2, 2.4);
    caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, 2.2, base);
    caixa(x, y, 2.2, w, d, 0.4, telhado); caixa(x + 0.5, y + 0.5, 2.6, w - 1, d - 1, 0.4, telhado); caixa(x + 1, y + 1, 3.0, w - 2, d - 2, 0.4, telhado);
    caixa(x + w - 1.1, y + 0.6, 2.6, 0.5, 0.5, 1.3, '#e6e0d4');
    for (let k = 0; k < 3; k++) { const t = ((agora / 1400 + k / 3) % 1); const [sx, sy] = iso(x + w - 0.85, y + 0.85, 3.9 + t * 1.4); ctx.fillStyle = `rgba(255,255,255,${0.7 * (1 - t)})`; ctx.beginPath(); ctx.arc(sx + t * 10, sy, 5 + t * 6, 0, Math.PI * 2); ctx.fill(); }
    const bx = x + 0.2, by = y + 0.2, ww = w - 0.4, dd = d - 0.4;
    for (const face of ['y', 'x']) for (const a of face === 'y' ? [0.3, ww - 1.1] : [0.5, dd - 1.3]) {
      naFace(face, bx, by, ww, dd, a, 0, 0.8, 1.0, 0.7, '#ffffff'); naFace(face, bx, by, ww, dd, a + 0.07, 0, 0.66, 1.06, 0.58, '#cfefff');
      naFace(face, bx, by, ww, dd, a - 0.05, 0, 0.9, 0.8, 0.2, '#8fdc78'); naFace(face, bx, by, ww, dd, a + 0.1, 0, 0.12, 0.92, 0.1, '#ff9fb6'); naFace(face, bx, by, ww, dd, a + 0.5, 0, 0.12, 0.92, 0.1, '#fff27a');
    }
    naFace('y', bx, by, ww, dd, ww / 2 - 0.4, 0, 0.8, 0, 1.4, '#ffffff'); naFace('y', bx, by, ww, dd, ww / 2 - 0.33, 0, 0.66, 0, 1.33, st.porta);
    naFace('y', bx, by, ww, dd, ww / 2 + 0.15, 0, 0.08, 0.65, 0.08, '#ffd58a');
    const [sx, sy] = iso(x + w / 2, y + d / 2, 4.3 + Math.sin(agora / 500) * 0.06);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = escuro(base, 0.35); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(st.ic, sx, sy - 1);
    if (perto) rotulo(st.nome, sx, sy - 34, '#fff7e8');
  }
  /* loja: vitrines, toldo listrado e a placa com o ícone */
  function desenhaLoja(c, perto) {
    const Lj = LOJAS[c.id], x = c.gx, y = c.y, w = c.w, d = c.d, base = Lj.cor;
    sombra(x + w / 2, y + d / 2, 2.4);
    caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, 2.4, base);
    caixa(x + 0.1, y + 0.1, 2.4, w - 0.2, d - 0.2, 0.3, escuro(base, 0.25));
    const bx = x + 0.2, by = y + 0.2, ww = w - 0.4, dd = d - 0.4;
    for (const a of [0.2, ww - 1.25]) { naFace('y', bx, by, ww, dd, a, 0, 1.05, 0.35, 1.0, '#ffffff'); naFace('y', bx, by, ww, dd, a + 0.07, 0, 0.91, 0.42, 0.86, '#cfefff'); naFace('y', bx, by, ww, dd, a + 0.25, 0, 0.5, 0.45, 0.25, Lj.toldo); }
    naFace('x', bx, by, ww, dd, 0.6, 0, 1.6, 0.6, 0.9, '#ffffff'); naFace('x', bx, by, ww, dd, 0.67, 0, 1.46, 0.67, 0.76, '#cfefff');
    naFace('y', bx, by, ww, dd, ww / 2 - 0.4, 0, 0.8, 0, 1.45, '#ffffff'); naFace('y', bx, by, ww, dd, ww / 2 - 0.33, 0, 0.66, 0, 1.38, '#9a6a3a');
    naFace('y', bx, by, ww, dd, ww / 2 + 0.15, 0, 0.08, 0.65, 0.08, '#ffd58a');
    const n = 8; for (let i = 0; i < n; i++) caixa(bx + i * ww / n, by + dd, 1.75, ww / n, 0.5, 0.12, i % 2 ? '#ffffff' : Lj.toldo, { blocos: false });
    const [sx, sy] = iso(x + w / 2, y + d / 2, 3.4 + Math.sin(agora / 500) * 0.06);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = escuro(Lj.toldo, 0.1); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(Lj.ic, sx, sy - 1);
    if (eventosAtivos.length) { ctx.font = '14px system-ui, sans-serif'; ctx.fillText(eventosAtivos[0].ic, sx + 18, sy - 16); }
    if (perto) rotulo(Lj.nome, sx, sy - 34, '#fff7e8');
  }
  /* praça dos projetos: quatro lotes; cada um sobe conforme a sua doação e fica pronto com o código da turma */
  function desenhaProjetos(c, perto) {
    const x = c.gx, y = c.y, sem = { blocos: false };
    sombra(x + c.w / 2, y + c.d / 2, 3);
    caixa(x, y, 0, c.w, c.d, 0.08, '#e6e0d4', sem);
    const lotes = [[0.25, 0.25], [3.25, 0.25], [0.25, 2.65], [3.25, 2.65]];
    PROJETOS.forEach((P, i) => {
      const [ox, oy] = lotes[i], px = x + ox, py = y + oy, pronto = S.projetos.prontos[P.id];
      if (pronto) {
        caixa(px + 0.15, py + 0.15, 0.08, 2.2, 1.8, 1.3, P.cor);
        caixa(px, py, 1.38, 2.5, 2.1, 0.25, escuro(P.cor, 0.3)); caixa(px + 0.5, py + 0.4, 1.63, 1.5, 1.3, 0.25, escuro(P.cor, 0.3));
        naFace('y', px + 0.15, py + 0.15, 2.2, 1.8, 0.85, 0, 0.5, 0.08, 0.8, '#9a6a3a');
        for (const a of [0.2, 1.5]) naFace('y', px + 0.15, py + 0.15, 2.2, 1.8, a, 0, 0.5, 0.5, 0.45, '#cfefff');
      } else {
        const f = fracProjeto(P), h = 0.15 + 1.1 * f;
        caixa(px + 0.15, py + 0.15, 0.08, 2.2, 1.8, h, claro(P.cor, 0.25), sem);
        for (const [a, b] of [[0, 0], [2.4, 0], [0, 2], [2.4, 2]]) caixa(px + a, py + b, 0.08, 0.1, 0.1, 1.7, '#c08a52', sem);
        caixa(px, py + 2, 1.5, 2.5, 0.1, 0.08, '#c08a52', sem); caixa(px + 2.4, py, 1.5, 0.1, 2.1, 0.08, '#c08a52', sem);
      }
      const [sx, sy] = iso(px + 1.25, py + 1.05, pronto ? 2.4 : 2.1);
      ctx.font = '18px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000';
      ctx.globalAlpha = pronto ? 1 : 0.75; ctx.fillText(pronto ? P.ic : '🏗️', sx, sy); ctx.globalAlpha = 1;
    });
    if (perto) { const [sx, sy] = iso(x + c.w / 2, y + c.d / 2, 3); rotulo('Projetos da turma', sx, sy - 10, '#fff7e8'); }
  }
  /* banco: prédio claro com colunas, frontão e o cofrinho na placa */
  function desenhaBanco(c, perto) {
    const x = c.gx, y = c.y, w = c.w, d = c.d;
    sombra(x + w / 2, y + d / 2, 2.4);
    caixa(x, y, 0, w, d, 0.25, '#e6e0d4');
    caixa(x + 0.3, y + 0.3, 0.25, w - 0.6, d - 1.1, 2.0, '#f3ecda');
    for (let i = 0; i < 4; i++) caixa(x + 0.35 + i * (w - 0.9) / 3, y + d - 0.75, 0.25, 0.2, 0.2, 2.0, '#ffffff');
    caixa(x + 0.1, y + 0.1, 2.25, w - 0.2, d - 0.2, 0.25, '#d9cfb6'); caixa(x + 0.5, y + 0.5, 2.5, w - 1, d - 1, 0.25, '#cfc3a5');
    naFace('y', x + 0.3, y + 0.3, w - 0.6, d - 1.1, (w - 0.6) / 2 - 0.4, 0, 0.8, 0.25, 1.3, '#4f9a6b');
    const [sx, sy] = iso(x + w / 2, y + d / 2, 3.6 + Math.sin(agora / 500) * 0.06);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#4f9a6b'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🏦', sx, sy - 1);
    if (perto) rotulo('Banco da Praça', sx, sy - 34, '#fff7e8');
  }
  function sombra(x, y, r) { const [sx, sy] = iso(x, y); ctx.fillStyle = 'rgba(40,60,40,.16)'; ctx.beginPath(); ctx.ellipse(sx, sy + 2, r * TW / 2.2, r * TH / 2.2, 0, 0, Math.PI * 2); ctx.fill(); }
  function rotulo(t, sx, sy, cor = '#ffffff', tinta = '#1d2a1f') {
    ctx.font = '600 13px Lexend, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tw = Math.min(ctx.measureText(t).width, 260) + 18;
    ctx.fillStyle = cor; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(sx - tw / 2, sy - 12, tw, 24, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = tinta; ctx.fillText(t.length > 38 ? t.slice(0, 37) + '…' : t, sx, sy + 1, 250);
  }
  function desenhaRocha(o) {
    sombra(o.x + 0.5, o.y + 0.5, 0.55);
    const cor = ['#9a9a96', '#a8a49a', '#8f949a'][Math.floor(o.t * 3)], h = 0.35 + o.t * 0.25;
    caixa(o.x + 0.15, o.y + 0.2, 0, 0.7, 0.6, h, cor); caixa(o.x + 0.3, o.y + 0.3, h, 0.4, 0.35, 0.18, claro(cor, 0.1));
  }
  function desenhaArvore(a) {
    sombra(a.x + 0.5, a.y + 0.5, 0.8);
    caixa(a.x + 0.38, a.y + 0.38, 0, 0.24, 0.24, 1, '#a0703f', { blocos: false });
    const folha = ESTACAO.folhas[a.tipo];   // as cores mudam com a estação (na primavera, uma em cada três é uma cerejeira rosa)
    caixa(a.x + 0.05, a.y + 0.05, 1, 0.9, 0.9, 0.8, folha);
    if (a.alt > 1) caixa(a.x + 0.22, a.y + 0.22, 1.8, 0.56, 0.56, 0.5, claro(folha, 0.08));
    if (DECOR.has('luzes') && !leve) luzinhas(a.x + 0.5, a.y + 0.5, 1.1, 1.8, 0.5);
  }
  function desenhaMarco(f) {
    const x = f.centro.x - 1, y = f.centro.y - 1;
    sombra(f.centro.x, f.centro.y, 1.6);
    if (f.marco === 'fonte') {
      caixa(x - 0.3, y - 0.3, 0, 2.6, 2.6, 0.45, '#e6e0d4'); caixa(x - 0.1, y - 0.1, 0.45, 2.2, 2.2, 0.02, '#8fd8ea', { blocos: false, contorno: false });
      caixa(x + 0.75, y + 0.75, 0.45, 0.5, 0.5, 1.1, '#e6e0d4'); caixa(x + 0.55, y + 0.55, 1.55, 0.9, 0.9, 0.2, '#8fd8ea');
      const [sx, sy] = iso(f.centro.x, f.centro.y, 2.1 + Math.sin(agora / 300) * 0.1); ctx.fillStyle = 'rgba(160,225,245,.85)'; ctx.beginPath(); ctx.arc(sx, sy, 6, 0, Math.PI * 2); ctx.fill();
    } else if (f.marco === 'abaco') {
      caixa(x, y, 0, 2, 2, 0.4, '#e6e0d4');
      ['#f7a8c4', '#ffd58a', '#a8d8f7', '#a8e6b8'].forEach((c, i) => caixa(x + 0.3 + (i % 2) * 0.8, y + 0.3 + Math.floor(i / 2) * 0.8, 0.4, 0.6, 0.6, 0.6 + i * 0.5, c));
    } else if (f.marco === 'xadrez') {
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) caixa(x + 0.25 + i * 0.5, y + 0.25 + j * 0.5, 0, 0.5, 0.5, 0.5 + ((i + j) % 2) * 1.2 + (i === 1 && j === 1 ? 1 : 0), (i + j) % 2 ? '#c7b4f2' : '#fff7e8');
    } else if (f.marco === 'antena') {
      caixa(x + 0.3, y + 0.3, 0, 1.4, 1.4, 0.5, '#e6e0d4'); caixa(x + 0.85, y + 0.85, 0.5, 0.3, 0.3, 3, '#ffb38a'); caixa(x + 0.6, y + 0.6, 3.5, 0.8, 0.8, 0.3, '#f7a8c4');
      const [sx, sy] = iso(f.centro.x, f.centro.y, 4); ctx.strokeStyle = 'rgba(224,123,176,.6)'; ctx.lineWidth = 2;
      for (let k = 1; k <= 3; k++) { const rr = ((agora / 25 + k * 14) % 42); ctx.beginPath(); ctx.arc(sx, sy, rr, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
    } else if (f.marco === 'robo') {
      caixa(x + 0.2, y + 0.2, 0, 1.6, 1.6, 0.4, '#e6e0d4'); caixa(x + 0.55, y + 0.55, 0.4, 0.9, 0.9, 1.2, '#a8e6b8'); caixa(x + 0.35, y + 0.75, 0.9, 0.2, 0.5, 0.6, '#9fe3dc'); caixa(x + 1.45, y + 0.75, 0.9, 0.2, 0.5, 0.6, '#9fe3dc');
      caixa(x + 0.6, y + 0.6, 1.6, 0.8, 0.8, 0.7, '#c9efd9'); naFace('y', x + 0.6, y + 0.6, 0.8, 0.8, 0.15, 0, 0.15, 1.95, 0.15, '#2b6cb0'); naFace('y', x + 0.6, y + 0.6, 0.8, 0.8, 0.5, 0, 0.15, 1.95, 0.15, '#2b6cb0');
    } else if (f.marco === 'servidor') {
      caixa(x + 0.1, y + 0.1, 0, 1.8, 1.8, 0.3, '#e6e0d4');
      for (const [a, b] of [[0.3, 0.3], [1.1, 0.3], [0.3, 1.1], [1.1, 1.1]]) { caixa(x + a, y + b, 0.3, 0.6, 0.6, 2.2, '#3a4250'); for (let k = 0; k < 4; k++) naFace('y', x + a, y + b, 0.6, 0.6, 0.1, 0, 0.4, 0.55 + k * 0.45, 0.08, (Math.floor(agora / 300) + k + a * 10) % 3 ? '#7dff8a' : '#2b6cb0'); }
    } else if (f.marco === 'cupula') {
      caixa(x, y, 0, 2, 2, 0.6, '#e6e0d4'); caixa(x + 0.3, y + 0.3, 0.6, 1.4, 1.4, 0.5, '#bdeffa'); caixa(x + 0.55, y + 0.55, 1.1, 0.9, 0.9, 0.45, '#bdeffa'); caixa(x + 0.8, y + 0.8, 1.55, 0.4, 0.4, 0.35, '#bdeffa');
    } else {
      caixa(x + 0.4, y + 0.4, 0, 1.2, 1.2, 2.4, '#f5d6e6'); caixa(x + 0.25, y + 0.25, 2.4, 1.5, 1.5, 0.3, '#e07bb0'); caixa(x + 0.75, y + 0.75, 2.7, 0.5, 0.5, 0.6, '#ffd58a');
    }
    const [sx, sy] = iso(f.centro.x, f.centro.y, 4.6);
    ctx.font = '26px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(f.icone, sx, sy + Math.sin(agora / 600) * 3);
  }
  function desenhaPlaca(f) {
    const { x, y } = f.placa;
    caixa(x - 0.06, y - 0.06, 0, 0.12, 0.12, 1, '#a0703f', { blocos: false });
    caixa(x - 0.55, y - 0.08, 0.9, 1.1, 0.16, 0.6, '#f3d9a4', { blocos: false });
    const [sx, sy] = iso(x, y + 0.1, 1.2);
    ctx.font = '700 11px Lexend, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#5a3b1a'; ctx.fillText(`Fase ${f.idx + 1}`, sx - 2, sy + 2);
  }
  /* portão na borda: nos lados leste e oeste as colunas ficam ao longo de y; no norte e no sul, ao longo de x */
  function desenhaPortao(p) {
    const aberto = liberada(fases[p.para]), { x, y } = p, emY = p.lado === 'L' || p.lado === 'O';
    const ax = emY ? 0 : 1, ay = emY ? 1 : 0;
    caixa(x - 0.2 - ax * 1.4, y - 0.2 - ay * 1.4, 0, 0.4, 0.4, 2.2, '#f2e48a'); caixa(x - 0.2 + ax * 1.4, y - 0.2 + ay * 1.4, 0, 0.4, 0.4, 2.2, '#f2e48a');
    caixa(x - 0.25 - ax * 1.45, y - 0.25 - ay * 1.45, 2.2, 0.5 + ax * 2.9, 0.5 + ay * 2.9, 0.35, aberto ? '#a8e6b8' : '#f7a8c4');
    if (!aberto) for (let k = 0; k < 4; k++) caixa(x - 0.05 - ax * (0.9 - k * 0.6), y - 0.05 - ay * (0.9 - k * 0.6), 0, 0.1, 0.1, 1.8, '#e0564a', { blocos: false });
    const [sx, sy] = iso(x, y, 3.2);
    ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(aberto ? '🚪' : '🔒', sx, sy);
    rotulo(`${fases[p.para].icone} ${fases[p.para].nome}`, sx, sy - 26, aberto ? '#fff7e8' : '#eeeeee');
  }
  function desenhaCerca(c) { caixa(c.x + 0.1, c.y + 0.1, 0, 0.8, 0.8, 0.12, '#c08a52', { blocos: false }); for (const [a, b] of [[0.15, 0.15], [0.7, 0.7], [0.15, 0.7], [0.7, 0.15]]) caixa(c.x + a, c.y + b, 0, 0.15, 0.15, 0.9, '#c08a52', { blocos: false }); caixa(c.x + 0.1, c.y + 0.1, 0.55, 0.8, 0.8, 0.12, '#e6c08a', { blocos: false }); }
  function desenhaItem(it) {
    const [ic] = ITENS[it.tipo];
    if (it.arvore) { const [sx, sy] = iso(it.x + 0.25, it.y + 0.25, 1.5 + Math.sin(agora / 500 + it.x) * 0.03); ctx.font = '26px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, sx, sy); return; }
    sombra(it.x, it.y, 0.35);
    const [sx, sy] = iso(it.x, it.y, 0.55 + Math.sin(agora / 300 + it.x * 3) * 0.12);
    if (it.tipo === 'diamante') { ctx.fillStyle = 'rgba(160,230,255,.35)'; ctx.beginPath(); ctx.arc(sx, sy, 17, 0, Math.PI * 2); ctx.fill(); }
    ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, sx, sy);
  }
  /* enfeites de cabeça, para o avatar e para o pet: medidas em fração do tamanho da cabeça (s) */
  function enfeite(k, hx, hy, hz, s, dir, topo) {
    if (!k || k === 'nada') return;
    const q = v => v * s, sem = { blocos: false }, frente = dir === 'y+' || dir === 'x+', fc = dir === 'y+' ? 'y' : 'x';
    const aba = (cor, m = 0.12) => caixa(hx - q(m), hy - q(m), topo, s + q(2 * m), s + q(2 * m), q(0.08), cor, sem);
    const bloco = (o, z, l, h, cor) => caixa(hx + q(o), hy + q(o), topo + q(z), q(l), q(l), q(h), cor, sem);
    if (k === 'oculos') { if (frente) { naFace(fc, hx, hy, s, s, q(0.05), 0, q(0.9), hz + q(0.38), q(0.28), 'rgba(20,20,40,.88)'); naFace(fc, hx, hy, s, s, q(0.15), 0, q(0.15), hz + q(0.55), q(0.06), 'rgba(255,255,255,.6)'); } }
    else if (k === 'laco') bloco(0.25, 0, 0.5, 0.22, '#e0564a');
    else if (k === 'chapeu') { aba('#3f8fe0'); bloco(0.19, 0.08, 0.62, 0.42, '#3f8fe0'); }
    else if (k === 'coroa') { bloco(0.15, 0, 0.7, 0.3, '#ffd58a'); if (frente) naFace(fc, hx + q(0.15), hy + q(0.15), q(0.7), q(0.7), q(0.28), 0, q(0.14), topo + q(0.08), q(0.12), '#e0564a'); }
    else if (k === 'cachecol' || k === 'lenco') caixa(hx - q(0.06), hy - q(0.06), hz - q(0.2), s + q(0.12), s + q(0.12), q(0.24), k === 'lenco' ? '#e0564a' : '#4bb259', sem);
    else if (k === 'gorro') { bloco(-0.05, 0, 1.1, 0.18, '#ffffff'); bloco(0.1, 0.18, 0.8, 0.3, '#e0564a'); bloco(0.28, 0.48, 0.44, 0.26, '#e0564a'); bloco(0.38, 0.74, 0.24, 0.2, '#ffffff'); }
    else if (k === 'cartola') { aba('#1d1d24', 0.16); bloco(0.15, 0.08, 0.7, 0.75, '#1d1d24'); bloco(0.14, 0.12, 0.72, 0.12, '#ffd84a'); }
    else if (k === 'mascara') { if (frente) naFace(fc, hx, hy, s, s, 0, 0, s, hz + q(0.38), q(0.26), '#9a6bd6'); bloco(0.42, 0, 0.16, 0.45, '#ffd84a'); bloco(0.22, 0, 0.14, 0.32, '#4bb259'); }
    else if (k === 'orelhas') { caixa(hx + q(0.12), hy + q(0.4), topo, q(0.18), q(0.18), q(0.75), '#ffffff', sem); caixa(hx + q(0.7), hy + q(0.4), topo, q(0.18), q(0.18), q(0.75), '#ffffff', sem); }
    else if (k === 'palha') { aba('#e8c35a', 0.3); bloco(0.15, 0.08, 0.7, 0.32, '#e8c35a'); bloco(0.14, 0.1, 0.72, 0.08, '#e0564a'); }
    else if (k === 'helice') { bloco(0, 0, 1, 0.2, '#3f8fe0'); bloco(0, 0, 0.5, 0.2, '#ffd84a'); bloco(0.45, 0.2, 0.1, 0.18, '#888888'); const [px, py] = iso(hx + s / 2, hy + s / 2, topo + q(0.4)), a = agora / 90; ctx.strokeStyle = '#e0564a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - Math.cos(a) * 9, py - Math.sin(a) * 3); ctx.lineTo(px + Math.cos(a) * 9, py + Math.sin(a) * 3); ctx.stroke(); }
    else if (k === 'capelo') { bloco(0.12, 0, 0.76, 0.22, '#1d1d24'); aba('#1d1d24', 0.22); caixa(hx + s + q(0.1), hy + q(0.5), topo - q(0.3), q(0.06), q(0.06), q(0.35), '#ffd84a', sem); }
    else if (k === 'fone') { caixa(hx - q(0.04), hy + q(0.42), topo - q(0.02), s + q(0.08), q(0.16), q(0.1), '#333333', sem); caixa(hx - q(0.12), hy + q(0.3), hz + q(0.3), q(0.14), q(0.4), q(0.4), '#e0564a', sem); caixa(hx + s - q(0.02), hy + q(0.3), hz + q(0.3), q(0.14), q(0.4), q(0.4), '#e0564a', sem); }
    else if (k === 'oculosRedondos') { if (frente) { naFace(fc, hx, hy, s, s, q(0.08), 0, q(0.34), hz + q(0.34), q(0.32), '#3a2416'); naFace(fc, hx, hy, s, s, q(0.58), 0, q(0.34), hz + q(0.34), q(0.32), '#3a2416'); naFace(fc, hx, hy, s, s, q(0.13), 0, q(0.24), hz + q(0.39), q(0.22), '#d8f3ff'); naFace(fc, hx, hy, s, s, q(0.63), 0, q(0.24), hz + q(0.39), q(0.22), '#d8f3ff'); } }
    else if (k === 'boina') { caixa(hx - q(0.12), hy - q(0.04), topo, s + q(0.16), s + q(0.08), q(0.16), '#e0564a', sem); bloco(0.45, 0.16, 0.1, 0.1, '#e0564a'); }
    else if (k === 'capacete') { aba('#f6c93c', 0.1); bloco(0.05, 0.08, 0.9, 0.3, '#f6c93c'); bloco(0.4, 0.38, 0.2, 0.08, '#f6c93c'); }
    else if (k === 'antena') { caixa(hx - q(0.04), hy + q(0.42), topo - q(0.02), s + q(0.08), q(0.16), q(0.08), '#9a6bd6', sem); caixa(hx + q(0.45), hy + q(0.45), topo, q(0.08), q(0.08), q(0.5), '#888888', sem); bloco(0.38, 0.5, 0.24, 0.2, Math.floor(agora / 500) % 2 ? '#7dff8a' : '#2bb3b1'); }
    else if (k === 'capaceteRobo') { bloco(-0.04, 0, 1.08, 0.3, '#9aa3ad'); bloco(0.1, 0.3, 0.8, 0.1, '#7c8590'); caixa(hx - q(0.14), hy + q(0.35), hz + q(0.35), q(0.14), q(0.3), q(0.3), '#5b6270', sem); caixa(hx + s, hy + q(0.35), hz + q(0.35), q(0.14), q(0.3), q(0.3), '#5b6270', sem); caixa(hx + q(0.46), hy + q(0.46), topo + q(0.4), q(0.08), q(0.08), q(0.35), '#5b6270', sem); bloco(0.4, 0.75, 0.2, 0.18, Math.floor(agora / 400) % 2 ? '#ff5252' : '#7dff8a'); }
    else if (k === 'astronauta') {   // capacete de vidro (aquário) com gola branca e luz no topo: o rosto continua aparecendo
      caixa(hx - q(0.1), hy - q(0.1), hz - q(0.16), s + q(0.2), s + q(0.2), q(0.16), '#f4f6fa', { blocos: false, contorno: false, topo: 'rgba(0,0,0,0)' });   // gola: sem a face de cima, que cobriria o rosto
      const alto = topo - hz + q(0.2);
      caixa(hx - q(0.1), hy - q(0.1), hz, s + q(0.2), s + q(0.2), alto, '#dff0ff', { blocos: false, esq: 'rgba(214,236,255,.32)', dir: 'rgba(190,220,250,.38)', topo: 'rgba(236,247,255,.55)' });
      if (frente) naFace(fc, hx - q(0.1), hy - q(0.1), s + q(0.2), s + q(0.2), q(0.12), 0, q(0.12), hz + q(0.2), alto - q(0.35), 'rgba(255,255,255,.7)');
      caixa(hx + q(0.42), hy + q(0.42), hz + alto, q(0.16), q(0.16), q(0.1), '#c7ccd6', sem);
      caixa(hx + q(0.45), hy + q(0.45), hz + alto + q(0.1), q(0.1), q(0.1), q(0.1), Math.floor(agora / 600) % 2 ? '#ff6b6b' : '#ffd84a', sem);
    }
    else if (k === 'chapeuMago') { aba('#6a1b9a', 0.22); bloco(0.12, 0.08, 0.76, 0.3, '#6a1b9a'); bloco(0.24, 0.38, 0.52, 0.3, '#6a1b9a'); bloco(0.36, 0.68, 0.28, 0.28, '#6a1b9a'); bloco(0.43, 0.96, 0.14, 0.14, '#ffd84a'); bloco(0.11, 0.1, 0.78, 0.08, '#ffd84a'); }
    else if (k === 'viseira') { caixa(hx - q(0.04), hy - q(0.04), hz + q(0.36), s + q(0.08), s + q(0.08), q(0.22), '#222222', sem); if (frente) naFace(fc, hx, hy, s, s, q(0.04), 0, q(0.92), hz + q(0.39), q(0.16), Math.floor(agora / 300) % 3 ? '#39ff88' : '#ff4fa3'); }
    else if (k === 'gorroSaci') { bloco(0, 0, 1, 0.25, '#d32f2f'); bloco(0.15, 0.25, 0.7, 0.3, '#d32f2f'); bloco(0.3, 0.55, 0.4, 0.3, '#d32f2f'); bloco(0.42, 0.85, 0.16, 0.2, '#d32f2f'); }
  }
  /* personagem de blocos: pernas, corpo, braços e cabeça cúbica; o rosto aparece na face para onde olha */
  function desenhaPessoa(px, py, av, op = {}) {
    const pulo = op.pulo || 0, dir = op.dir || 'y+', anda = op.andando ? Math.sin(op.passo || 0) * 0.08 : 0;
    sombra(px, py, 0.45);
    const eixoY = dir === 'y+' || dir === 'y-';      // olhando ao longo de y: braços nos lados de x
    const z = pulo;
    const perna = (o, s) => eixoY ? caixa(px - 0.17 + o, py - 0.09 + s, z, 0.15, 0.18, 0.42, av.calca, { blocos: false }) : caixa(px - 0.09 + s, py - 0.17 + o, z, 0.18, 0.15, 0.42, av.calca, { blocos: false });
    perna(0, anda); perna(0.19, -anda);
    const braco = lado => eixoY ? caixa(px + (lado < 0 ? -0.33 : 0.21), py - 0.08 - anda * lado, z + 0.4, 0.12, 0.16, 0.42, av.pele, { blocos: false }) : caixa(px - 0.08 - anda * lado, py + (lado < 0 ? -0.33 : 0.21), z + 0.4, 0.16, 0.12, 0.42, av.pele, { blocos: false });
    braco(-1);
    caixa(px - 0.21, py - 0.13, z + 0.42, 0.42, 0.26, 0.45, av.camisa, { blocos: false });
    braco(1);
    // cabelo comprido fica atrás da cabeça
    const hx = px - 0.2, hy = py - 0.2, hz = z + 0.87;
    if (av.estilo === 'longo') { if (dir === 'y+') caixa(hx - 0.03, hy - 0.06, hz - 0.3, 0.46, 0.12, 0.7, av.cabelo, { blocos: false }); else if (dir === 'x+') caixa(hx - 0.06, hy - 0.03, hz - 0.3, 0.12, 0.46, 0.7, av.cabelo, { blocos: false }); }
    caixa(hx, hy, hz, 0.4, 0.4, 0.4, av.pele, { blocos: false });
    // rosto
    if (dir === 'y+' || dir === 'x+') {
      const f = dir === 'y+' ? 'y' : 'x';
      naFace(f, hx, hy, 0.4, 0.4, 0.08, 0, 0.07, hz + 0.18, 0.08, '#1d2a1f'); naFace(f, hx, hy, 0.4, 0.4, 0.25, 0, 0.07, hz + 0.18, 0.08, '#1d2a1f');
      naFace(f, hx, hy, 0.4, 0.4, 0.13, 0, 0.14, hz + 0.07, 0.04, '#c0504d');
    } else {
      // de costas: o cabelo cobre a face que aparece
      naFace('y', hx, hy, 0.4, 0.4, 0, 0, 0.4, hz + 0.1, 0.3, av.cabelo); naFace('x', hx, hy, 0.4, 0.4, 0, 0, 0.4, hz + 0.1, 0.3, av.cabelo);
    }
    // cabelo / boné
    if (av.estilo === 'bone') { caixa(hx - 0.02, hy - 0.02, hz + 0.36, 0.44, 0.44, 0.12, av.cabelo, { blocos: false }); const aba = { 'y+': [hx + 0.05, hy + 0.4, 0.3, 0.16], 'y-': [hx + 0.05, hy - 0.16, 0.3, 0.16], 'x+': [hx + 0.4, hy + 0.05, 0.16, 0.3], 'x-': [hx - 0.16, hy + 0.05, 0.16, 0.3] }[dir]; caixa(aba[0], aba[1], hz + 0.36, aba[2], aba[3], 0.05, av.cabelo, { blocos: false }); }
    else { caixa(hx - 0.02, hy - 0.02, hz + 0.34, 0.44, 0.44, 0.1, av.cabelo, { blocos: false }); if (av.estilo === 'coque') caixa(hx + 0.12, hy + 0.12, hz + 0.44, 0.16, 0.16, 0.14, av.cabelo, { blocos: false }); }
    enfeite(av.acessorio, hx, hy, hz, 0.4, dir, hz + (av.estilo === 'bone' ? 0.48 : av.estilo === 'coque' ? 0.5 : 0.44));
  }

  /* ---------- jogador e movimento ---------- */
  const P = { x: S.x, y: S.y, dir: 'y+', andando: false, passo: 0, pulo: 0, vpulo: 0 };
  const teclas = {};
  let correndo = false, dialogoAberto = false, janelaAberta = null, destino = null, agora = 0, faseAtual = null;
  let dentro = false, noEnigma = false, sala = null, colocando = null, mouse = null;   // dentro da casa; móvel sendo colocado; ponto do mouse no mapa

  function livre(x, y) {
    if (noEnigma) return livreEnigma(x, y);
    if (sala) return SALAS[sala].livre(x, y);
    if (dentro) return livreCasa(x, y);
    const r = 0.22;
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
      const qx = x + dx, qy = y + dy;
      if (qx < 0.2 || qy < 0.2 || qx > LARG - 0.2 || qy > ALT - 0.2) return false;
      if (tileEm(qx, qy).sol) return false;
    }
    return true;
  }
  /* as setas andam na direção da tela: converte para as coordenadas do mapa */
  function telaParaMapa(dx, dy) { const a = dx / (TW / 2), b = dy / (TH / 2); return [(a + b) / 2, (b - a) / 2]; }
  function move(dt) {
    let sx = 0, sy = 0;
    if (teclas.esq) sx -= 1; if (teclas.dir) sx += 1; if (teclas.cima) sy -= 1; if (teclas.baixo) sy += 1;
    let mx = 0, my = 0;
    if (sx || sy) { [mx, my] = telaParaMapa(sx * TW / 2, sy * TH / 2); destino = null; }
    else if (destino) { mx = destino.x - P.x; my = destino.y - P.y; if (Math.hypot(mx, my) < 0.12) { destino = null; mx = my = 0; } }
    const L = Math.hypot(mx, my);
    P.andando = L > 0;
    if (P.andando) {
      mx /= L; my /= L;
      const corre = correndo || teclas.correr, v = (corre ? 6.2 : 3.6) * dt;
      P.dir = Math.abs(mx) > Math.abs(my) ? (mx > 0 ? 'x+' : 'x-') : (my > 0 ? 'y+' : 'y-');
      const antes = [P.x, P.y];
      if (livre(P.x + mx * v, P.y)) P.x += mx * v;
      if (livre(P.x, P.y + my * v)) P.y += my * v;
      if (destino && P.x === antes[0] && P.y === antes[1]) destino = null;   // esbarrou: para
      P.passo += dt * (corre ? 16 : 11);
    }
    if (P.pulo > 0 || P.vpulo) { P.vpulo -= 9 * dt; P.pulo = Math.max(0, P.pulo + P.vpulo * dt); if (P.pulo === 0) P.vpulo = 0; }
    if (noEnigma) { if (P.andando && my > 0 && P.y > ED - 0.55 && P.x > 2.8 && P.x < 4.2) saiEnigma(); return; }
    if (sala) { const Z = SALAS[sala]; if (P.andando && my > 0 && P.y > Z.D - 0.55 && Math.abs(P.x - Z.saida.x) < 0.7) saiSala(); return; }
    if (dentro) { if (P.andando && my > 0 && P.y > CD - 0.55 && P.x > 1.8 && P.x < 3.4) saiCasa(); return; }   // pisou no tapete da porta
    // itens: pega ao passar por cima (o diamante pede uma pergunta antes)
    const f = faseDeX(P.x);
    for (const p of f.portais) if (P.andando && Math.hypot(p.x - P.x, p.y - P.y) < 0.9 && liberada(fases[p.para])) { trocaFase(p.para, f.idx); return; }
    for (const it of f.evItens) { const E = estEv(it.ev); if (!E.itens[it.id] && Math.hypot(it.x - P.x, it.y - P.y) < 0.55) { E.itens[it.id] = true; pontos(5, `${it.ev.item[0]} ${it.ev.item[1]}! (${Object.keys(E.itens).length}/${metaItensEv()}) · ${it.ev.nome}`); salvar(); } }
    for (const it of f.itens) if (!S.itens[it.id] && Math.hypot(it.x - P.x, it.y - P.y) < (it.arvore ? 1.05 : 0.55)) { pegaItem(it, f); break; }   // a maçã da árvore se pega encostando no tronco
    if (f !== faseAtual) { faseAtual = f; hud(); if (agora > 1000) aviso(`${f.icone} ${f.nome}`); }
  }
  function alvoPerto() {
    if (noEnigma) return alvoEnigma();
    if (sala) return alvoSala();
    if (dentro) return alvoCasa();
    const f = faseDeX(P.x);
    let melhor = null, dm = 1.5;
    const tenta = (x, y, ob) => { const d = Math.hypot(x - P.x, y - P.y); if (d < dm) { dm = d; melhor = ob; } };
    for (const c of f.casas) tenta(c.porta.x, c.porta.y, { tipo: 'casa', casa: c });
    if (f.minhaCasa) tenta(f.minhaCasa.porta.x, f.minhaCasa.porta.y, { tipo: 'minhacasa' });
    if (f.enigma) tenta(f.enigma.porta.x, f.enigma.porta.y, { tipo: 'enigma' });
    for (const c of f.salas || []) tenta(c.porta.x, c.porta.y, { tipo: 'sala', sala: c });
    if (f.portalTele) tenta(f.portalTele.porta.x, f.portalTele.porta.y, { tipo: 'portalTele' });
    if (f.loja) tenta(f.loja.porta.x, f.loja.porta.y, { tipo: 'loja' });
    if (f.projetos) tenta(f.projetos.porta.x, f.projetos.porta.y, { tipo: 'projetos' });
    if (f.banco) tenta(f.banco.porta.x, f.banco.porta.y, { tipo: 'banco' });
    if (profDe(f)) { const q = posProf(f); tenta(q.x, q.y, { tipo: 'prof' }); }
    if (S.pet && !S.pet.dorme) tenta(PET.x, PET.y + 0.3, { tipo: 'pet' });
    for (const n of f.npcs) tenta(n.x, n.y, { tipo: 'npc', npc: n });
    tenta(f.placa.x, f.placa.y + 0.8, { tipo: 'placa', fase: f });
    // árvores e rochas só viram alvo bem de perto, para não roubar a vez das casas e dos moradores
    if (!melhor) for (const a of f.arvores) { const d = Math.hypot(a.x + 0.5 - P.x, a.y + 0.5 - P.y); if (d < Math.min(dm, 1.05)) { dm = d; melhor = { tipo: 'recurso', rec: 'madeira', obj: a }; } }
    if (!melhor || melhor.tipo === 'recurso') for (const o of f.rochas || []) { const d = Math.hypot(o.x + 0.5 - P.x, o.y + 0.5 - P.y); if (d < Math.min(dm, 1.05)) { dm = d; melhor = { tipo: 'recurso', rec: 'pedra', obj: o }; } }
    if (!melhor) for (const o of f.agua || []) { const d = Math.hypot(o.x + 0.5 - P.x, o.y + 0.5 - P.y); if (d < Math.min(dm, 1.2)) { dm = d; melhor = { tipo: 'pesca' }; } }
    for (const p of f.portais) tenta(p.x + (p.lado === 'L' ? -1 : p.lado === 'O' ? 1 : 0), p.y + (p.lado === 'S' ? -1 : p.lado === 'N' ? 1 : 0), { tipo: 'portao', portal: p, fase: f });
    return melhor;
  }

  /* ---------- dentro da casa ---------- */
  /* visita: com 3 corações de amizade, o morador te convida para a casa dele (mesma planta da sua, outros móveis) */
  let visita = null;
  const moveisAqui = () => visita ? casaNpc(visita).moveis : S.casa.moveis;
  const CORACOES_CASA = 3;
  function casaNpc(n) {
    if (n.casaNpc) return n.casaNpc;
    const r = rng(9000 + todosNpcs().indexOf(n) * 131), um = l => l[Math.floor(r() * l.length)];
    const pequenos = ['aquario', 'robo', 'telescopio', 'arcade', 'vaso', 'planta', 'luminaria', 'quadro', 'poltrona', 'geladeira'];
    const solto = () => pequenos.splice(Math.floor(r() * pequenos.length), 1)[0];
    n.casaNpc = { moveis: [{ id: 'tapete', x: 1, y: 4 }, { id: 'estante', x: 0, y: 1 }, { id: um(['computador', 'tv', 'piano', 'sofa']), x: 2, y: 0 }, { id: 'bau', x: 4, y: 0 },
      { id: solto(), x: 6, y: 0 }, { id: 'cama', x: 8, y: 0 }, { id: um(['mesa', 'mesa', 'sofa']), x: 10, y: 0 }, { id: solto(), x: 12, y: 0 }, { id: solto(), x: 3, y: 4 }, { id: solto(), x: 6, y: 6 }, { id: solto(), x: 11, y: 7 }] };
    return n.casaNpc;
  }
  const NPC_CASA = { x: 7.2, y: 4.4 };
  function visitaNpc(n) {
    fechaDialogo(); fechaJanela(); visita = n; ajustaCasa(0); destino = null; dentro = true; mouse = null;
    P.x = SAIDA.x; P.y = CD - 1.4; P.dir = 'y-'; cam.ok = false; hud();
    const V = S.visitas || (S.visitas = {});
    if (!V[n.id]) { V[n.id] = { vez: 1 }; pontos(20, `🏠 Primeira visita à casa de ${n.nome}!`); salvar(); }
    else aviso(`🏠 Casa de ${n.nome}`);
  }
  const ocupado = (tx, ty) => moveisAqui().find(m => { const M = MOVEIS[m.id]; return !M.chao && tx >= m.x && tx < m.x + M.w && ty >= m.y && ty < m.y + M.d; });
  function livreCasa(x, y) {
    const r = 0.22;
    if (x - r < 0.05 || y - r < 0.05 || x + r > CW - 0.05 || y + r > CD - 0.02) return false;
    for (const px of PAREDES) if (x - r < px + 0.1 && x + r > px - 0.1 && (y - r < 3 || y + r > 6)) return false;   // paredes entre os cômodos, com passagem no meio
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) if (ocupado(Math.floor(x + dx), Math.floor(y + dy))) return false;
    return true;
  }
  /* as passagens entre os cômodos e o tapete da porta ficam sempre livres */
  const reservado = (tx, ty) => (PAREDES.some(px => tx === px || tx === px - 1) && ty >= 3 && ty <= 5) || (tx === 2 && ty >= CD - 2);
  function podeColocar(id, tx, ty) {
    const M = MOVEIS[id];
    if (PAREDES.some(px => tx < px && tx + M.w > px)) return false;   // não atravessa a parede
    for (let j = ty; j < ty + M.d; j++) for (let i = tx; i < tx + M.w; i++) {
      if (i < 0 || j < 0 || i >= CW || j >= CD || reservado(i, j)) return false;
      if (M.chao ? S.casa.moveis.some(m => MOVEIS[m.id].chao && i >= m.x && i < m.x + MOVEIS[m.id].w && j >= m.y && j < m.y + MOVEIS[m.id].d) : ocupado(i, j)) return false;
      if (!M.chao && Math.abs(i + 0.5 - P.x) < 0.72 && Math.abs(j + 0.5 - P.y) < 0.72) return false;   // não em cima de você
    }
    return true;
  }
  function alvoCasa() {
    let melhor = null, dm = 1.1;
    for (const m of moveisAqui()) {
      const M = MOVEIS[m.id]; if (M.chao) continue;
      const qx = Math.max(m.x, Math.min(m.x + M.w, P.x)), qy = Math.max(m.y, Math.min(m.y + M.d, P.y)), d = Math.hypot(qx - P.x, qy - P.y);
      if (d < dm) { dm = d; melhor = { tipo: 'movel', movel: m }; }
    }
    if (Math.hypot(SAIDA.x - P.x, SAIDA.y - P.y) < Math.min(1.3, dm + 0.3)) melhor = { tipo: 'saida' };
    if (S.pet && !visita) { const c = S.pet.dorme ? caminha() : PET, d = Math.hypot(c.x - P.x, c.y - P.y); if (d < Math.min(0.9, dm)) melhor = { tipo: 'pet' }; }
    if (visita && Math.hypot(NPC_CASA.x - P.x, NPC_CASA.y - P.y) < Math.min(1.2, dm + 0.2)) melhor = { tipo: 'npc', npc: visita };
    return melhor;
  }
  const portaSala = () => { const l = SALAS[sala].local(); return { x: l.x, y: l.y }; };
  const posMundo = () => sala ? portaSala() : noEnigma ? { x: fases[1].enigma.porta.x, y: fases[1].enigma.porta.y + 0.4 } : dentro && visita ? { x: visita.x + 0.9, y: visita.y } : dentro ? { x: fases[0].minhaCasa.porta.x, y: fases[0].minhaCasa.porta.y + 0.4 } : { x: P.x, y: P.y };
  function guardaPos() { const p = posMundo(); S.x = p.x; S.y = p.y; S.fase = sala ? SALAS[sala].local().f.idx : noEnigma ? 1 : dentro && visita ? visita.fase.idx : dentro ? 0 : atual.idx; }
  function entraCasa() {
    fechaJanela(); ajustaCasa(S.casa.amp || 0); destino = null; dentro = true; mouse = null;
    P.x = SAIDA.x; P.y = CD - 1.4; P.dir = 'y-'; cam.ok = false; petPerto(); hud();
    if (!S.casa.visitou) {
      S.casa.visitou = true; salvar();
      dialogo('🏠', 'Sua casa', `<p>Esta casa é sua! Tem sala, quarto e cozinha, e você decora do seu jeito.</p><p>Na <strong>bancada 🛠️</strong> da cozinha, os itens que você coleta pela vila viram móveis. Alguns móveis liberam outros: o tapete libera a poltrona, a luminária libera o robozinho...</p><p class="muted">Experimente tudo: a cama dá pontos uma vez por dia, o espelho muda o seu visual, o baú mostra o inventário e o computador lista as atividades que faltam.</p>`, [{ txt: 'Vamos decorar!', classe: 'principal', fn: fechaDialogo }]);
    } else aviso('🏠 Sua casa');
  }
  function saiCasa() {
    const p = posMundo();
    if (visita) { visita = null; dentro = false; destino = null; mouse = null; P.x = p.x; P.y = p.y; P.dir = 'y+'; cam.ok = false; petPerto(); for (const k in teclas) teclas[k] = false; return hud(); }
    if (atual.idx !== 0) trocaFase(0);
    dentro = false; colocando = null; destino = null; mouse = null; P.x = p.x; P.y = p.y; P.dir = 'y+'; cam.ok = false; petPerto();
    for (const k in teclas) teclas[k] = false;
    hud();
  }
  const faseMaisAlta = () => fases.filter(liberada).pop();
  const faltando = soJogos => fases.filter(liberada).flatMap(f => f.lugares).filter(l => !S.feitos[l.id] && (!soJogos || l.rec));
  function guardaMovel(m) {
    const i = S.casa.moveis.indexOf(m); if (i < 0 || MOVEIS[m.id].fixo) return;
    S.casa.moveis.splice(i, 1); S.casa.guardados[m.id] = (S.casa.guardados[m.id] || 0) + 1;
    salvar(); hud(); aviso(`${MOVEIS[m.id].ic} Guardado na oficina`);
  }
  function usaMovel(m) {
    const M = MOVEIS[m.id], fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (visita) {
      const n = visita, V = S.visitas[n.id];
      if (m.id === 'bau' && !V.bau) {
        V.bau = true; const fav = favorito(n); S.inv[fav] = (S.inv[fav] || 0) + 2; salvar(); hud();
        setTimeout(() => ganhaFigurinha(pessoaNpc(n).id, `no baú de ${n.nome}`), 1200);
        return dialogo('🧰', `Baú de ${n.nome}`, `<p>“Pode abrir! Separei um presente para você.” Você ganhou 2 × ${ITENS[fav][0]} ${ITENS[fav][1]} e a figurinha de ${esc(pessoaNpc(n).nome)}, que faz aniversário no mesmo dia que ${esc(n.nome)}.</p>`, [{ txt: 'Obrigado!', classe: 'principal', fn: fechaDialogo }]);
      }
      return dialogo(M.ic, `${M.nome} de ${n.nome}`, `<p>${m.id === 'bau' ? 'O baú está vazio agora. Volte a conversar para fazer a amizade crescer!' : `“Esse é o meu ${M.nome.toLowerCase()}. Fique à vontade!”`}</p>`, [fecha]);
    }
    const guardar = M.fixo ? [] : [{ txt: 'Guardar este móvel', fn: () => { fechaDialogo(); guardaMovel(m); } }];
    const janela = { bancada: 'casa', estante: 'biblioteca', bau: 'inventario', espelho: 'avatar', quadro: 'inventario', telescopio: 'mapa' }[m.id];
    if (janela) return abreJanela(janela);
    if (m.id === 'luminaria') { m.on = !m.on; salvar(); return aviso(m.on ? '💡 Luz acesa' : 'Luz apagada'); }
    if (m.id === 'robo') return abreJanela('oficina');
    if (m.id === 'cama') {
      const hoje = new Date().toDateString();
      if (S.casa.dormiu !== hoje) { S.casa.dormiu = hoje; pontos(10); salvar(); return dialogo('🛏️', 'Boa noite!', '<p>Você descansou e acordou cheio de energia: <strong>+10 ⭐</strong>.</p><p class="muted">A cama dá pontos uma vez por dia. Volte amanhã!</p>', [fecha]); }
      return dialogo('🛏️', 'Cama', '<p>Você já descansou hoje. Volte amanhã para ganhar mais 10 ⭐.</p>', [fecha]);
    }
    if (m.id === 'computador') {
      const lista = faltando(false).slice(0, 6);
      return dialogo('💻', 'Computador', lista.length ? '<p>Atividades que ainda faltam nas fases abertas. Abra uma e a casa dela ganha cor:</p>' : '<p>Você já fez todas as atividades das fases abertas! 🎉 Cumpra as missões para abrir a próxima fase.</p>',
        lista.map(l => l.tipo === 'em' ? { txt: `${l.icone} ${l.titulo}`, fn: () => comecaEM(l) } : { txt: `${l.icone} ${l.titulo}`, fn: () => abreJogo(l) }).concat([fecha]));
    }
    if (m.id === 'arcade') {
      const js = faltando(true), l = js.length ? js[Math.floor(Math.random() * js.length)] : jogaveis.length ? lugarRec(jogaveis[Math.floor(Math.random() * jogaveis.length)]) : null;
      if (!l) return dialogo('🕹️', 'Fliperama', '<p>Nenhum jogo por aqui ainda.</p>', [fecha]);
      return dialogo('🕹️', 'Fliperama', `<p>O fliperama sorteou: <strong>${esc(l.titulo)}</strong>.</p><p class="muted">${esc(l.resumo)}</p>`, [{ txt: 'Jogar', classe: 'principal', fn: () => abreJogo(l) }, { txt: 'Sortear outro', fn: () => usaMovel(m) }, fecha, ...guardar]);
    }
    if (m.id === 'poltrona') {
      const lidas = Object.keys(S.dicas), i = lidas.length ? lidas[Math.floor(Math.random() * lidas.length)] : Math.floor(Math.random() * DICAS.length);
      return dialogo('🛋️', 'Hora da leitura', `<div class="dica-livro"><p>${DICAS[i]}</p></div><p class="muted">Na poltrona você relê as dicas dos livros que já pegou.</p>`, [fecha, ...guardar]);
    }
    if (m.id === 'geladeira') return dialogo('🧊', 'Geladeira', `<p>Você tem <strong>${S.inv.maca || 0} 🍎</strong> guardadas.</p><p class="muted">As maçãs são a comida preferida do seu pet: abra o pet com o botão 🐾 ou a tecla P.</p>`, [fecha, ...guardar]);
    if (m.id === 'aquario') return dialogo('🐠', 'Aquário', '<p>Os peixinhos entram na toca um atrás do outro: o primeiro que entra é o primeiro que sai. Isso é uma <strong>fila</strong>, uma estrutura de dados!</p>', [fecha, ...guardar]);
    dialogo(M.ic, M.nome, `<p>${M.estrelas ? `✨ Presente pela${M.estrelas > 1 ? 's' : ''} ${M.estrelas} estrela${M.estrelas > 1 ? 's' : ''} secreta${M.estrelas > 1 ? 's' : ''} que você achou no site.` : m.id === 'vaso' || m.id === 'planta' ? 'Você regou a planta. Ela está linda! 🌱' : 'Ficou lindo aqui!'}</p>`, [fecha, ...guardar]);
  }
  /* oficina: construir móveis com os itens */
  const temPlanta = id => !MOVEIS[id].planta || !!S.loja.tem['proj:' + id];
  const podeConstruir = id => { const M = MOVEIS[id]; return !!M.custo && temPlanta(id) && (!M.requer || !!S.casa.feitos[M.requer]) && Object.entries(M.custo).every(([k, n]) => (S.inv[k] || 0) >= n); };
  function construir(id) {
    if (!podeConstruir(id)) return false;
    const M = MOVEIS[id];
    for (const [k, n] of Object.entries(M.custo)) S.inv[k] -= n;
    const primeira = !S.casa.feitos[id];
    S.casa.feitos[id] = true; S.casa.guardados[id] = (S.casa.guardados[id] || 0) + 1;
    const novos = primeira ? Object.values(MOVEIS).filter(o => o.requer === id).map(o => `${o.ic} ${o.nome}`) : [];
    pontos(primeira ? 20 : 5, `${M.ic} ${M.nome} pronto!` + (novos.length ? ` Liberou: ${novos.join(', ')}.` : ''));
    salvar(); return true;
  }
  function comecaColocar(id) {
    if (!dentro) entraCasa();
    colocando = id; mouse = null; fechaJanela();
    aviso(`${MOVEIS[id].ic} Clique num lugar livre, ou ande e aperte E. ESC cancela.`);
  }
  function lugarColocar() {
    const M = MOVEIS[colocando];
    if (mouse) return [Math.floor(mouse.x - M.w / 2 + 0.5), Math.floor(mouse.y - M.d / 2 + 0.5)];
    const [dx, dy] = { 'x+': [1, 0], 'x-': [-1, 0], 'y+': [0, 1], 'y-': [0, -1] }[P.dir];
    let tx = Math.floor(P.x + dx * 1.1), ty = Math.floor(P.y + dy * 1.1);
    if (dx < 0) tx -= M.w - 1; if (dy < 0) ty -= M.d - 1;
    return [tx, ty];
  }
  function colocaAqui() {
    const [tx, ty] = lugarColocar(), M = MOVEIS[colocando];
    if (!podeColocar(colocando, tx, ty)) { aviso('Aqui não cabe. Tente outro lugar.'); return false; }
    S.casa.moveis.push({ id: colocando, x: tx, y: ty });
    if (!--S.casa.guardados[colocando]) delete S.casa.guardados[colocando];
    colocando = null; mouse = null; aviso(`${M.ic} ${M.nome} na casa!`); salvar(); hud();
    return true;
  }
  /* ---------- pet: precisa de cuidado várias vezes ao dia (as necessidades caem com o tempo, mesmo com o site fechado) ---------- */
  const ESPECIES = { gato: ['🐱', 'Gato'], cachorro: ['🐶', 'Cachorro'], coelho: ['🐰', 'Coelho'], dragao: ['🐲', 'Dragãozinho'] };
  const CORES_PET = ['#f6b26b', '#8a8a8a', '#ffffff', '#3a2416', '#f7a8c4', '#a8e6b8', '#a8d8f7', '#c7b4f2'];
  const ACESSORIOS = [['nada', 'Nada', 1], ['laco', 'Laço', 2], ['chapeu', 'Chapéu', 3], ['oculos', 'Óculos', 4], ['coroa', 'Coroa', 6]];
  const NECESSIDADES = [['fome', '🍎', 'Barriga cheia', 12], ['alegria', '🎾', 'Alegria', 8], ['energia', '⚡', 'Energia', 6], ['limpeza', '🫧', 'Limpeza', 5]];   // último: quanto cai por hora
  const PET = { x: 0, y: 0, dir: 'y+', andando: false, passo: 0, preso: 0 };
  const HORA = 36e5;
  function atualizaPet() {
    const p = S.pet; if (!p) return;
    const agoraMs = Date.now(), h = Math.max(0, Math.min(72, (agoraMs - (p.t || agoraMs)) / HORA));
    p.t = agoraMs;
    for (const [k, , , cai] of NECESSIDADES) {
      if (k === 'energia' && p.dorme) p.energia = Math.min(100, p.energia + 30 * h);
      else p[k] = Math.max(0, p[k] - cai * h * (p.dorme ? 0.5 : 1) * (CLIMA.id === 'chuva' && k === 'limpeza' ? 1.5 : CLIMA.id === 'sol' && k === 'alegria' ? 0.8 : 1));
    }
    if (p.dorme && p.energia >= 100) { p.dorme = false; aviso(`☀️ ${p.nome} acordou cheio de energia!`); }
  }
  const precisa = p => NECESSIDADES.filter(([k]) => p[k] < 30).map(n => n[1]);
  function cuidou(xp, txt) {
    const p = S.pet; p.xp += xp; p.cuidados = (p.cuidados || 0) + 1;
    let subiu = false;
    while (p.xp >= 20 * p.nivel) { p.xp -= 20 * p.nivel; p.nivel++; subiu = true; }
    if (subiu) {
      const novo = ACESSORIOS.find(a => a[2] === p.nivel);
      pontos(15, `🎉 ${p.nome} chegou ao nível ${p.nivel}!` + (novo ? ` Liberou: ${novo[1]}.` : ''));
    } else if (txt) aviso(txt);
    salvar(); hud();
  }
  function petPerto() { PET.x = P.x - 0.7; PET.y = P.y - 0.4; if (!livre(PET.x, PET.y)) { PET.x = P.x; PET.y = P.y; } }
  function movePet(dt) {
    const p = S.pet; if (!p || p.dorme) return;
    const dx = P.x - PET.x, dy = P.y - PET.y, d = Math.hypot(dx, dy);
    PET.andando = d > 1.1;
    if (d > 7) return petPerto();
    if (!PET.andando) return;
    const v = Math.min(d - 1, (d > 3 ? 6.5 : 4) * dt), mx = dx / d * v, my = dy / d * v;
    const antes = PET.x + PET.y;
    if (livre(PET.x + mx, PET.y)) PET.x += mx;
    if (livre(PET.x, PET.y + my)) PET.y += my;
    PET.preso = PET.x + PET.y === antes ? PET.preso + dt : 0;
    if (PET.preso > 1.2) { PET.preso = 0; petPerto(); }
    PET.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'x+' : 'x-') : (dy > 0 ? 'y+' : 'y-');
    PET.passo += dt * 14;
  }
  /* onde o pet dorme: um cantinho livre do quarto */
  function caminha() { for (const [x, y] of [[6, 2], [7, 2], [6, 3], [7, 4], [6, 6], [7, 7], [1, 7]]) if (!ocupado(x, y) && !reservado(x, y)) return { x: x + 0.5, y: y + 0.5 }; return { x: 6.5, y: 7.5 }; }
  /* pet de blocos: corpo, cabeça, patas e rabo; orelhas e acessórios mudam com a espécie */
  function desenhaPet(x, y, p, op = {}) {
    // desenhado 1,4× maior que a escala do mundo, a partir do ponto onde pisa
    const [ox, oy] = iso(x, y);
    ctx.save(); ctx.translate(ox, oy); ctx.scale(1.4, 1.4); ctx.translate(-ox, -oy);
    try { corpoPet(x, y, p, op); } finally { ctx.restore(); }
    const pede = precisa(p);
    if (pede.length && !op.semBalao && !op.dorme) { const [sx, sy] = iso(x, y, 1.3); balao(sx, sy, pede[0]); }
  }
  function corpoPet(x, y, p, op) {
    const c = p.cor, esc2 = escuro(c, 0.2), cl = claro(c, 0.15), sem = { blocos: false };
    sombra(x, y, 0.34);
    if (op.dorme) {
      caixa(x - 0.4, y - 0.4, 0, 0.8, 0.8, 0.1, '#f7a8c4', sem); caixa(x - 0.3, y - 0.3, 0.1, 0.6, 0.6, 0.03, '#fff7e8', sem);
      caixa(x - 0.22, y - 0.16, 0.13, 0.44, 0.32, 0.2, c, sem); caixa(x - 0.14, y + 0.02, 0.2, 0.28, 0.24, 0.18, cl, sem);
      const [sx, sy] = iso(x, y, 0.6 + (agora / 900 % 1) * 0.4); ctx.font = '600 14px Lexend, sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#6a5a8a'; ctx.fillText('z z', sx + 8, sy);
      return;
    }
    const dir = op.dir || 'y+', f = { 'x+': [1, 0], 'x-': [-1, 0], 'y+': [0, 1], 'y-': [0, -1] }[dir], ax = f[0] !== 0;
    const hop = op.andando ? Math.abs(Math.sin(op.passo || 0)) * 0.1 : Math.abs(Math.sin(agora / 600)) * 0.02;
    const [bw, bd] = ax ? [0.46, 0.28] : [0.28, 0.46];
    const corpo = () => {
      for (const [a, b] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) caixa(x + a * (bw / 2 - 0.06) - 0.04, y + b * (bd / 2 - 0.06) - 0.04, hop, 0.08, 0.08, 0.15, esc2, sem);
      caixa(x - bw / 2, y - bd / 2, 0.15 + hop, bw, bd, 0.24, c, sem);
      if (p.especie === 'dragao') { const asa = ax ? [[x - 0.12, y - bd / 2 - 0.12, 0.24, 0.12], [x - 0.12, y + bd / 2, 0.24, 0.12]] : [[x - bw / 2 - 0.12, y - 0.12, 0.12, 0.24], [x + bw / 2, y - 0.12, 0.12, 0.24]]; for (const [a, b, w, d] of asa) caixa(a, b, 0.32 + hop + Math.sin(agora / 150) * 0.03, w, d, 0.04, cl, sem); }
    };
    const rabo = () => {
      const tx = x - f[0] * 0.27, ty = y - f[1] * 0.27;
      if (p.especie === 'gato') caixa(tx - 0.03, ty - 0.03, 0.3 + hop, 0.06, 0.06, 0.32, c, sem);
      else if (p.especie === 'cachorro') caixa(tx - 0.04, ty - 0.04, 0.34 + hop, 0.08, 0.08, 0.14, c, sem);
      else if (p.especie === 'coelho') caixa(tx - 0.07, ty - 0.07, 0.25 + hop, 0.14, 0.14, 0.14, '#ffffff', sem);
      else caixa(tx - 0.05 - f[0] * 0.12, ty - 0.05 - f[1] * 0.12, 0.18 + hop, 0.1 + Math.abs(f[0]) * 0.15, 0.1 + Math.abs(f[1]) * 0.15, 0.08, c, sem);
    };
    const cabeca = () => {
      const hx = x + f[0] * 0.24 - 0.16, hy = y + f[1] * 0.24 - 0.16, hz = 0.32 + hop, s = 0.32;
      caixa(hx, hy, hz, s, s, s, c, sem);
      if (dir === 'y+' || dir === 'x+') {
        const fc = dir === 'y+' ? 'y' : 'x';
        naFace(fc, hx, hy, s, s, 0.06, 0, 0.06, hz + 0.15, 0.08, '#1d2a1f'); naFace(fc, hx, hy, s, s, 0.2, 0, 0.06, hz + 0.15, 0.08, '#1d2a1f');
        naFace(fc, hx, hy, s, s, 0.12, 0, 0.08, hz + 0.06, 0.05, p.especie === 'dragao' ? '#2e7d32' : '#e07bb0');
      }
      // orelhas
      const o = ax ? [[hx + 0.1, hy + 0.02], [hx + 0.1, hy + s - 0.09]] : [[hx + 0.02, hy + 0.1], [hx + s - 0.09, hy + 0.1]];
      if (p.especie === 'gato') o.forEach(([a, b]) => caixa(a, b, hz + s, 0.07, 0.07, 0.1, c, sem));
      else if (p.especie === 'coelho') o.forEach(([a, b]) => caixa(a, b, hz + s, 0.07, 0.07, 0.34, cl, sem));
      else if (p.especie === 'cachorro') (ax ? [[hx + 0.1, hy - 0.05], [hx + 0.1, hy + s - 0.01]] : [[hx - 0.05, hy + 0.1], [hx + s - 0.01, hy + 0.1]]).forEach(([a, b]) => caixa(a, b, hz + 0.08, 0.06 + (ax ? 0.06 : 0), 0.06 + (ax ? 0 : 0.06), 0.22, esc2, sem));
      else o.forEach(([a, b]) => caixa(a, b, hz + s, 0.06, 0.06, 0.12, '#ffd58a', sem));
      enfeite(p.acessorio, hx, hy, hz, s, dir, hz + s);
    };
    if (f[0] + f[1] < 0) { cabeca(); corpo(); rabo(); } else { rabo(); corpo(); cabeca(); }
  }
  function janelaPet() {
    const el = $('#pet-conteudo'), p = S.pet;
    if (!p) {
      el.innerHTML = `<p>Escolha um bichinho para morar com você. Ele segue você pela vila, mas precisa de cuidado várias vezes ao dia: comida, brincadeira, banho e soneca.</p>
        <div class="av-grupo"><h3>Espécie</h3><div class="av-cores">${Object.entries(ESPECIES).map(([k, [ic, n]], i) => `<button type="button" data-esp="${k}" aria-pressed="${i === 0}">${ic} ${n}</button>`).join('')}</div></div>
        <div class="av-grupo"><h3>Cor</h3><div class="av-cores">${CORES_PET.map((c, i) => `<button type="button" data-cor-pet="${c}" aria-pressed="${i === 0}" aria-label="Cor ${c}" style="background:${c}"></button>`).join('')}</div></div>
        <div class="av-grupo"><h3>Nome</h3><input id="pet-nome" class="campo" maxlength="16" value="Pixel" aria-label="Nome do pet"></div>
        <button type="button" class="hb verde" id="pet-adotar">🐾 Adotar</button>`;
      const esc2 = { especie: 'gato', cor: CORES_PET[0] };
      el.querySelectorAll('[data-esp]').forEach(b => b.addEventListener('click', () => { esc2.especie = b.dataset.esp; el.querySelectorAll('[data-esp]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); }));
      el.querySelectorAll('[data-cor-pet]').forEach(b => b.addEventListener('click', () => { esc2.cor = b.dataset.corPet; el.querySelectorAll('[data-cor-pet]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); }));
      $('#pet-adotar').addEventListener('click', () => {
        const nome = ($('#pet-nome').value || '').trim().slice(0, 16) || 'Pixel';
        S.pet = { nome, especie: esc2.especie, cor: esc2.cor, acessorio: 'nada', fome: 80, alegria: 80, energia: 80, limpeza: 80, xp: 0, nivel: 1, t: Date.now(), dorme: false, cd: {}, cuidados: 0 };
        petPerto(); pontos(20, `🐾 ${nome} agora mora com você!`); salvar(); janelaPet();
      });
      return;
    }
    atualizaPet();
    const ic = ESPECIES[p.especie][0], agoraMs = Date.now();
    const espera = (k, min) => { const falta = (p.cd[k] || 0) + min * 6e4 - agoraMs; return falta > 0 ? Math.ceil(falta / 6e4) : 0; };
    const acoes = [
      ['maca', '🍎 Dar uma maçã', (S.inv.maca || 0) ? `você tem ${S.inv.maca}` : 'pegue maçãs pela vila', !(S.inv.maca || 0) || p.dorme],
      ['racao', '🥣 Ração', espera('racao', 60) ? `de novo em ${espera('racao', 60)} min` : 'uma vez por hora', !!espera('racao', 60) || p.dorme],
      ['bola', '🎾 Brincar de bola', espera('bola', 20) ? `de novo em ${espera('bola', 20)} min` : 'gasta energia', !!espera('bola', 20) || p.dorme || p.energia < 10],
      ['quiz', '❓ Quiz com o pet', 'acerte e ele fica feliz', p.dorme],
      ['banho', '🛁 Banho', espera('banho', 30) ? `de novo em ${espera('banho', 30)} min` : 'deixa limpinho', !!espera('banho', 30) || p.dorme],
      ...Object.keys(COMIDA).concat(['sabonete', 'brinquedo']).filter(k => S.inv[k] > 0).map(k => [k, `${ITENS[k][0]} ${k === 'sabonete' ? 'Banho de espuma' : k === 'brinquedo' ? 'Brinquedo novo' : ITENS[k][1]}`, `você tem ${S.inv[k]}`, p.dorme]),
      ['estrela', '⭐ Petisco especial', (S.inv.estrela || 0) ? `você tem ${S.inv.estrela}` : 'precisa de uma estrela', !(S.inv.estrela || 0) || p.dorme],
      ['dormir', p.dorme ? '☀️ Acordar' : '😴 Soneca na sua casa', p.dorme ? 'ele está recuperando energia' : 'recupera a energia', false]
    ];
    const lib = ACESSORIOS.filter(a => p.nivel >= a[2]);
    el.innerHTML = `<div class="pet-topo"><canvas id="pet-preview" width="160" height="150" aria-label="${esc(p.nome)}" role="img"></canvas>
      <div><h3 style="margin-top:0">${ic} ${esc(p.nome)} <small class="muted">· nível ${p.nivel}${p.dorme ? ' · dormindo 💤' : ''}</small></h3>
      <div class="barra pet-xp" title="Experiência"><span style="width:${Math.round(100 * p.xp / (20 * p.nivel))}%"></span></div>
      ${NECESSIDADES.map(([k, ic2, nome]) => `<div class="nec"><span>${ic2} ${nome}</span><div class="barra ${p[k] < 30 ? 'baixa' : ''}"><span style="width:${Math.round(p[k])}%"></span></div></div>`).join('')}</div></div>
      <div class="pet-acoes">${acoes.map(([k, t, sub, off]) => `<button type="button" class="pet-b" data-acao="${k}" ${off ? 'disabled' : ''}><strong>${t}</strong><small>${sub}</small></button>`).join('')}</div>
      <div class="av-grupo"><h3>Acessório</h3><div class="av-cores">${ACESSORIOS.map(([k, n, nv]) => p.nivel >= nv ? `<button type="button" data-acess="${k}" aria-pressed="${p.acessorio === k}">${n}</button>` : `<button type="button" disabled title="Nível ${nv}">🔒 ${n} (nível ${nv})</button>`).join('')}${Object.keys(S.loja.tem).filter(c => c.startsWith('pet:')).map(c => c.slice(4)).map(k => `<button type="button" data-acess="${k}" aria-pressed="${p.acessorio === k}">🛍️ ${esc(NOMES_ENFEITE[k] || k)}</button>`).join('')}</div></div>
      <div class="av-grupo"><h3>Cor</h3><div class="av-cores">${CORES_PET.map(c => `<button type="button" data-cor-pet="${c}" aria-pressed="${p.cor === c}" aria-label="Cor ${c}" style="background:${c}"></button>`).join('')}</div></div>
      <p class="muted small">As necessidades caem com o tempo, mesmo com o site fechado. Volte algumas vezes por dia para cuidar de ${esc(p.nome)}. ${lib.length < ACESSORIOS.length ? 'Cuidando, ele sobe de nível e libera acessórios.' : ''}</p>`;
    const g = $('#pet-preview').getContext('2d');
    g.setTransform(2, 0, 0, 2, 80, 112);
    ctx = g; try { desenhaPet(0, 0, p, { dir: 'y+', dorme: p.dorme, semBalao: true }); } finally { ctx = ctxJogo; }
    el.querySelectorAll('[data-acao]').forEach(b => b.addEventListener('click', () => acaoPet(b.dataset.acao)));
    el.querySelectorAll('[data-acess]').forEach(b => b.addEventListener('click', () => { p.acessorio = b.dataset.acess; salvar(); janelaPet(); }));
    el.querySelectorAll('[data-cor-pet]').forEach(b => b.addEventListener('click', () => { p.cor = b.dataset.corPet; salvar(); janelaPet(); }));
  }
  function acaoPet(k) {
    const p = S.pet; atualizaPet();
    const mais = (n, v) => { p[n] = Math.min(100, p[n] + v); };
    if (k === 'maca' && S.inv.maca > 0) { S.inv.maca--; mais('fome', 40); mais('alegria', 5); cuidou(4, `🍎 ${p.nome} adorou a maçã!`); }
    else if (k === 'racao') { p.cd.racao = Date.now(); mais('fome', 20); cuidou(2, `🥣 ${p.nome} comeu a ração.`); }
    else if (k === 'bola') { p.cd.bola = Date.now(); mais('alegria', 25); p.energia = Math.max(0, p.energia - 10); p.fome = Math.max(0, p.fome - 5); cuidou(3, `🎾 ${p.nome} correu atrás da bola!`); }
    else if (k === 'banho') { p.cd.banho = Date.now(); p.limpeza = 100; mais('alegria', 5); cuidou(2, `🛁 ${p.nome} está cheiroso!`); }
    else if (k === 'estrela' && S.inv.estrela > 0) { S.inv.estrela--; for (const [n] of NECESSIDADES) mais(n, 15); cuidou(8, `⭐ ${p.nome} ganhou um petisco especial!`); }
    else if (k in COMIDA && S.inv[k] > 0) { S.inv[k]--; mais('fome', COMIDA[k][0]); mais('alegria', COMIDA[k][1]); cuidou(4, `${ITENS[k][0]} ${p.nome} adorou!`); }
    else if (k === 'sabonete' && S.inv.sabonete > 0) { S.inv.sabonete--; p.limpeza = 100; mais('alegria', 15); cuidou(4, `🧼 ${p.nome} ficou cheio de espuma e cheiroso!`); }
    else if (k === 'brinquedo' && S.inv.brinquedo > 0) { S.inv.brinquedo--; mais('alegria', 45); cuidou(5, `🧸 ${p.nome} amou o brinquedo novo!`); }
    else if (k === 'dormir') { p.dorme = !p.dorme; if (!p.dorme) petPerto(); salvar(); aviso(p.dorme ? `😴 ${p.nome} foi dormir no quarto da sua casa.` : `☀️ ${p.nome} acordou!`); }
    else if (k === 'quiz') {
      fechaJanela();
      return pergunta(`Quiz com ${p.nome}`, ESPECIES[p.especie][0], sorteiaPergunta(faseMaisAlta()), certo => { mais('alegria', certo ? 30 : 10); cuidou(certo ? 5 : 1); });
    }
    janelaPet();
  }
  /* ---------- lojas: as ⭐ compram coisas, mas só depois de acertar a conta ----------
     À vista tem 10% de desconto; parcelado tem 5% de juros por parcela. A primeira parcela é paga na hora
     e as outras, uma por dia. Nunca dá para gastar mais do que o saldo + o crédito que ainda sobra. */
  const COMIDA = { tomate: [20, 15], cenoura: [25, 15], alface: [20, 10], melancia: [20, 25], pinhao: [25, 15], petisco: [25, 15], suco: [15, 10], sanduiche: [40, 5], bolo: [30, 25], panetone: [35, 30], uvas: [20, 30], picole: [15, 35], ovoChoc: [25, 35], pipoca: [20, 30], pirulito: [10, 40], cupcake: [25, 30], docinho: [20, 35], peixe: [35, 15], peixeColorido: [30, 25], camarao: [25, 20] };   // [fome, alegria] para o pet
  const EXCLUSIVOS = {
    natal: [['gorro', '🎅', 'Gorro de Papai Noel'], ['panetone']], anonovo: [['cartola', '🎩', 'Cartola de Ano Novo'], ['uvas']],
    carnaval: [['mascara', '🎭', 'Máscara de Carnaval'], ['picole']], pascoa: [['orelhas', '🐰', 'Orelhas de coelho'], ['ovoChoc']],
    junina: [['palha', '👒', 'Chapéu de palha'], ['pipoca']], criancas: [['helice', '🧢', 'Boné de hélice'], ['pirulito']],
    professor: [['capelo', '🎓', 'Capelo de formatura'], ['cupcake']], saci: [['gorroSaci', '🔴', 'Gorro do Saci'], ['docinho']]
  };
  const NOMES_ENFEITE = Object.assign({ fone: 'Fone de programadora', oculosRedondos: 'Óculos de cientista', boina: 'Boina de designer', capacete: 'Capacete de técnico', antena: 'Tiara com antena', oculos: 'Óculos escuros', laco: 'Laço', chapeu: 'Chapéu azul', coroa: 'Coroa', cachecol: 'Cachecol', lenco: 'Lenço' }, ...Object.values(EXCLUSIVOS).map(([[k, , n]]) => ({ [k]: n })));
  /* ---------- kits de apoiador (Catarse): cada kit tem um código de resgate, digitado em qualquer loja.
     O código não fica no site: guardamos só o SHA-256 de 'ohtopico-kit:' + código (só letras e números, em maiúsculas).
     Trocar um código = gerar um novo hash aqui. ---------- */
  const KITS_APOIO = {
    robotica: { ic: '🤖', nome: 'Kit Robótica', curto: 'Robótica', h: 'bdcab0ed97a48208866bf3d5b6f8fddd54377247de6a419c1a7da52175e5a324',
      itens: [['av', 'capaceteRobo', '🤖'], ['pet', 'capaceteRobo', '🤖', 'Capacete de robô para o pet'], ['cor', 'camisa:#18a07a', '👕', 'Camiseta circuito'], ['cor', 'calca:#5b6270', '👖', 'Calça metálica']] },
    astronauta: { ic: '🚀', nome: 'Kit Astronauta', curto: 'Astronauta', h: 'fba3dd4647724a8860e62305a906decb46aebaf289a0321c4d451747bc24d3d8',
      itens: [['av', 'astronauta', '👩‍🚀'], ['pet', 'astronauta', '👩‍🚀', 'Capacete espacial para o pet'], ['cor', 'camisa:#1b1f4b', '👕', 'Camiseta noite estrelada'], ['cor', 'calca:#c7ccd6', '👖', 'Calça prateada']] },
    magia: { ic: '🔮', nome: 'Kit Feiticeira dos Dados', curto: 'Feiticeira', h: 'd23f00d27dc24c178391a19ffb1557407a43539ada1aff3afa961130b60508d0',
      itens: [['av', 'chapeuMago', '🧙'], ['pet', 'chapeuMago', '🧙', 'Chapéu de mago para o pet'], ['cor', 'camisa:#6a1b9a', '👕', 'Túnica roxa'], ['cor', 'calca:#d4a017', '👖', 'Calça dourada']] },
    neon: { ic: '🌈', nome: 'Kit Neon', curto: 'Neon', h: '4bb7a26e94c0b34b897e27ac2eab27c8df52e1c026146ec40de7d6915aaa9356',
      itens: [['av', 'viseira', '🥽'], ['cor', 'camisa:#39ff88', '👕', 'Camiseta neon'], ['cor', 'cabelo:#ff4fa3', '💗', 'Cabelo rosa neon'], ['cor', 'cabelo:#2fe0d0', '💎', 'Cabelo turquesa'], ['cor', 'cabelo:#a46bff', '💜', 'Cabelo lilás']] }
  };
  Object.assign(NOMES_ENFEITE, { capaceteRobo: 'Capacete de robô', astronauta: 'Capacete de astronauta', chapeuMago: 'Chapéu de mago', viseira: 'Viseira neon' });
  const LOJA_KIT = { av: 'roupa', cor: 'roupa', pet: 'pet' };
  function produtosKit(loja) {
    const out = [];
    for (const [kid, K] of Object.entries(KITS_APOIO)) for (const [tipo, id, ic, nome] of K.itens) if (LOJA_KIT[tipo] === loja) out.push({ tipo, id, ic, preco: 0, nome: nome || NOMES_ENFEITE[id], kit: kid });
    return out;
  }
  // garante que tudo dos kits resgatados está no guarda-roupa (também depois de zerar o progresso)
  function aplicaKits() { for (const kid of Object.keys(S.kits || {})) if (KITS_APOIO[kid]) for (const [tipo, id] of KITS_APOIO[kid].itens) S.loja.tem[tipo + ':' + id] = true; }
  aplicaKits();
  const normCodigo = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  async function hashKit(c) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('ohtopico-kit:' + normCodigo(c)));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  async function resgataKit(codigo) {
    if (!normCodigo(codigo)) return { ok: false, msg: 'Digite o código do kit.' };
    if (!(window.crypto && crypto.subtle)) return { ok: false, msg: 'Este navegador não consegue conferir o código. Tente em outro navegador.' };
    const h = await hashKit(codigo), kid = Object.keys(KITS_APOIO).find(k => KITS_APOIO[k].h === h);
    if (!kid) return { ok: false, msg: 'Código não encontrado. Confira as letras e os números do código que veio no Catarse.' };
    const K = KITS_APOIO[kid];
    if (S.kits[kid]) return { ok: true, kid, msg: `O ${K.ic} ${K.nome} já é seu!` };
    S.kits[kid] = Date.now(); aplicaKits();
    const av = K.itens.find(([t]) => t === 'av'); if (av) S.av.acessorio = av[1];
    const cm = K.itens.find(([t, id]) => t === 'cor' && id.startsWith('camisa:')); if (cm) S.av.camisa = cm[1].split(':')[1];
    salvar(); hud(); SOM.toca('vitoria');
    return { ok: true, kid, novo: true, msg: `🎁 ${K.ic} ${K.nome} resgatado! Já está no seu avatar; troque as peças quando quiser no 👤 Avatar${K.itens.some(([t]) => t === 'pet') ? ' e na janela do pet 🐾' : ''}.` };
  }
  function formResgate(aviso) {
    return `<details class="resgate" ${aviso ? 'open' : ''}><summary>🎁 Tenho um código de kit de apoiador</summary>
      <form id="resgate-f"><label for="resgate-c">Código do kit</label><input id="resgate-c" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD-1234-WXYZ" maxlength="24"><button type="button" class="hb verde" id="resgate-b">Resgatar</button></form>
      ${aviso ? `<p class="resgate-msg ${aviso.ok ? 'ok' : 'bad'}" role="status">${aviso.msg}</p>` : ''}
      <p class="muted small">Os kits com roupas, cores especiais e itens temáticos são para quem apoia o projeto no Catarse. Cada kit tem um código.</p></details>`;
  }
  function ligaResgate(el, refaz) {
    const b = el.querySelector('#resgate-b'), c = el.querySelector('#resgate-c');
    if (!b) return;
    const vai = async () => { b.disabled = true; let r; try { r = await resgataKit(c.value); } catch (e) { r = { ok: false, msg: 'Não deu para conferir agora. Tente de novo.' }; } refaz(r); };
    b.addEventListener('click', vai);
    c.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); vai(); } });
  }
  const caro = v => Math.round(v * 2.5 / 10) * 10;   // preços em dezenas, para o desconto de 10% dar conta exata
  function produtos(loja) {
    const base = {
      roupa: [['av', 'oculos', '🕶️', 40], ['av', 'laco', '🎀', 40], ['av', 'chapeu', '🎩', 50], ['av', 'cachecol', '🧣', 60], ['av', 'coroa', '👑', 160],
        ['cor', 'camisa:#2b2d6e', '👕', 60, 'Camiseta galáxia'], ['cor', 'camisa:#ff8fab', '👕', 60, 'Camiseta chiclete'], ['cor', 'calca:#7aa6d6', '👖', 40, 'Calça jeans clara']],
      comida: [['ferr', 'machado', '🪓', 80, 'Machado (corta madeira das árvores)'], ['ferr', 'picareta', '⛏️', 100, 'Picareta (tira pedra das rochas e, às vezes, diamantes)'], ['ferr', 'vara', '🎣', 90, 'Vara de pesca (pesque no laguinho)'], ['inv', 'isca', '🪱', 30, '5 iscas', 5], ['fig', 'pacotinho', '📒', 40, 'Pacotinho com 3 figurinhas'], ['inv', 'maca', '🍎', 20, '3 maçãs', 3], ['inv', 'suco', '🧃', 20], ['inv', 'sanduiche', '🥪', 30], ['inv', 'bolo', '🍰', 40]],
      pet: [['inv', 'petisco', '🦴', 20, '2 petiscos', 2], ['inv', 'sabonete', '🧼', 20], ['inv', 'brinquedo', '🧸', 40], ['pet', 'lenco', '🧣', 50], ['pet', 'cachecol', '🧣', 50]],
      moveis: Object.entries(MOVEIS).filter(([, M]) => M.planta).map(([id, M]) => ['proj', id, '📜', M.planta, `Planta: ${M.nome} (${M.ic})`]).concat([['movel', 'vaso', '', 40], ['movel', 'tapete', '', 60], ['movel', 'planta', '', 60], ['movel', 'mesa', '', 80], ['movel', 'luminaria', '', 80], ['movel', 'sofa', '', 100], ['movel', 'tv', '', 120], ['movel', 'piano', '', 160]])
    }[loja].map(([tipo, id, ic, preco, nome, qtd]) => ({ tipo, id, ic, preco: caro(preco), nome, qtd }));
    for (const ev of eventosAtivos) {
      const [[hat, hic, hnome], [comida]] = EXCLUSIVOS[ev.id], so = { ev };
      if (loja === 'roupa') base.unshift(Object.assign({ tipo: 'av', id: hat, ic: hic, preco: caro(80), nome: hnome }, so));
      if (loja === 'pet') base.unshift(Object.assign({ tipo: 'pet', id: hat, ic: hic, preco: caro(60), nome: hnome + ' para o pet' }, so));
      if (loja === 'comida') base.unshift(Object.assign({ tipo: 'inv', id: comida, ic: ITENS[comida][0], preco: caro(30) }, so));
      if (loja === 'moveis') base.unshift(Object.assign({ tipo: 'movel', id: ev.movel, preco: caro(200) }, so));
    }
    base.push(...produtosKit(loja));
    for (const p of base) {
      if (p.tipo === 'movel') { p.ic = MOVEIS[p.id].ic; p.nome = p.nome || MOVEIS[p.id].nome; }
      if (p.tipo === 'inv') { p.ic = p.ic || ITENS[p.id][0]; p.nome = p.nome || ITENS[p.id][1]; }
      if (p.tipo === 'av' || p.tipo === 'pet') p.nome = p.nome || NOMES_ENFEITE[p.id];
      p.chave = p.tipo + ':' + p.id;
      p.unico = p.tipo === 'av' || p.tipo === 'pet' || p.tipo === 'cor' || p.tipo === 'ferr' || p.tipo === 'proj';
    }
    return base;
  }
  const diaN = d => Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - new Date(2020, 0, 1)) / 864e5);
  const diaHoje = () => diaN(new Date(Math.max(HOJE, new Date())));
  const limiteCredito = () => 250 + 60 * Object.keys(S.concluidas).length;
  const divida = () => S.loja.dividas.reduce((a, d) => a + d.parcela * d.faltam, 0);
  const atrasada = () => S.loja.dividas.some(d => d.prox <= diaHoje());
  const credito = () => atrasada() ? 0 : Math.max(0, limiteCredito() - divida());
  /* cobra as parcelas do dia (e as atrasadas) se houver saldo; o saldo nunca fica negativo */
  function cobra() {
    const hj = diaHoje(); let pagou = 0;
    for (const d of S.loja.dividas) while (d.faltam > 0 && d.prox <= hj && S.pontos >= d.parcela) { S.pontos -= d.parcela; d.faltam--; d.prox++; pagou += d.parcela; }
    S.loja.dividas = S.loja.dividas.filter(d => d.faltam > 0);
    if (pagou) { aviso(`💳 Parcela paga: −${pagou} ⭐`); hud(); salvar(); }
    else if (atrasada() && !cobra.avisou) { cobra.avisou = true; aviso('💳 Você tem parcela atrasada. Junte ⭐ para pagar!'); }
  }
  function planos(p) {
    const vista = Math.round(p.preco * 0.9);
    const out = [{ n: 1, total: vista, agora: vista, txt: `À vista: ${vista} ⭐ (10% de desconto)` }];
    for (const n of [2, 3, 4]) { const parc = Math.ceil(p.preco * (1 + 0.05 * n) / n); out.push({ n, parcela: parc, total: parc * n, agora: parc, txt: `${n}x de ${parc} ⭐ (total ${parc * n} ⭐, juros de ${5 * n}%)` }); }
    for (const o of out) o.motivo = S.pontos < o.agora ? `faltam ${o.agora - S.pontos} ⭐ no saldo` : o.n > 1 && atrasada() ? 'pague a parcela atrasada antes' : o.n > 1 && o.total - o.agora > credito() ? `passa do seu crédito (${credito()} ⭐)` : '';
    return out;
  }
  let lojaAtual = 'roupa', lojaEscolha = null;
  function abreLoja(id) { lojaAtual = id; lojaEscolha = null; abreJanela('loja'); }
  const temProduto = p => p.unico && !!S.loja.tem[p.chave];
  function janelaLoja(avisoKit) {
    cobra();
    const Lj = LOJAS[lojaAtual], el = $('#loja-conteudo');
    $('#j-loja-t').textContent = `${Lj.ic} ${Lj.nome}`;
    const conta = `<div class="conta"><span>Saldo <b>${S.pontos} ⭐</b></span><span>Devendo <b>${divida()} ⭐</b></span><span>Crédito livre <b>${credito()} ⭐</b> <small class="muted">de ${limiteCredito()}</small></span></div>
      ${S.loja.dividas.length ? `<div class="parcelas">${S.loja.dividas.map((d, i) => `<div class="parc ${d.prox <= diaHoje() ? 'atraso' : ''}"><span>${d.ic} ${esc(d.nome)}: faltam ${d.faltam}x de ${d.parcela} ⭐${d.prox <= diaHoje() ? ' · <b>atrasada</b>' : ''}</span><button type="button" class="hb azul" data-adianta="${i}" ${S.pontos >= d.parcela ? '' : 'disabled'}>Pagar 1 parcela</button></div>`).join('')}</div>` : ''}`;
    if (lojaEscolha) {
      const p = lojaEscolha;
      el.innerHTML = conta + `<h3>${p.ic} ${esc(p.nome)} · ${p.preco} ⭐</h3><p>Como você quer pagar? Depois de escolher, responda a conta certinho para levar.</p>
        <div class="planos">${planos(p).map((o, i) => `<button type="button" class="pet-b" data-plano="${i}" ${o.motivo ? 'disabled' : ''}><strong>${o.txt}</strong><small>${o.motivo || (o.n > 1 ? `paga ${o.agora} ⭐ agora e o resto, uma parcela por dia` : 'paga tudo agora')}</small></button>`).join('')}</div>
        <button type="button" class="hb azul" id="loja-volta">← Voltar</button>`;
      el.querySelectorAll('[data-plano]').forEach(b => b.addEventListener('click', () => perguntaLoja(p, planos(p)[+b.dataset.plano])));
      $('#loja-volta').addEventListener('click', () => { lojaEscolha = null; janelaLoja(); });
    } else {
      const lista = produtos(lojaAtual);
      const meta = S.banco.meta && S.banco.meta.loja === lojaAtual ? `<p class="small">🎯 Sua meta no banco: ${S.banco.meta.ic} ${esc(S.banco.meta.nome)}. Você tem ${S.pontos} ⭐ no saldo e ${Math.floor(S.banco.poup)} ⭐ na poupança.</p>` : '';
      el.innerHTML = conta + meta + formResgate(avisoKit) + `<p class="muted small">${Lj.texto} À vista tem 10% de desconto; parcelado tem juros. Para levar, acerte a conta do pagamento.</p>
        <div class="produtos">${lista.map((p, i) => `<button type="button" class="prod ${p.ev ? 'exclusivo' : ''} ${p.kit ? 'kit' : ''}" data-prod="${i}" ${temProduto(p) ? 'disabled' : ''}>
          ${p.ev ? `<span class="selo">${p.ev.ic} Só no ${esc(p.ev.nome)}</span>` : ''}${p.kit ? `<span class="selo">${KITS_APOIO[p.kit].ic} Kit ${esc(KITS_APOIO[p.kit].curto)}</span>` : ''}<span class="p-ic">${p.ic}</span><span class="p-nome">${esc(p.nome)}</span>
          <span class="p-preco">${temProduto(p) ? '✓ Já é seu' : p.kit ? '🔒 Com código' : `${p.preco} ⭐`}</span>${p.tipo === 'inv' || p.tipo === 'movel' ? `<small class="muted">você tem ${p.tipo === 'inv' ? S.inv[p.id] || 0 : S.casa.guardados[p.id] || 0}${p.tipo === 'movel' ? ' guardado(s)' : ''}</small>` : ''}</button>`).join('')}</div>
        <p class="muted small">Crédito: 250 ⭐ + 60 por fase concluída. As parcelas são cobradas uma por dia; com parcela atrasada, só dá para comprar à vista.</p>`;
      el.querySelectorAll('[data-prod]').forEach(b => b.addEventListener('click', () => {
        const p = lista[+b.dataset.prod];
        if (p.kit) { const d = el.querySelector('.resgate'); d.open = true; el.querySelector('#resgate-c').focus(); return; }
        lojaEscolha = p; janelaLoja();
      }));
      ligaResgate(el, r => janelaLoja(r));
    }
    el.querySelectorAll('[data-adianta]').forEach(b => b.addEventListener('click', () => { const d = S.loja.dividas[+b.dataset.adianta]; if (d && S.pontos >= d.parcela) { S.pontos -= d.parcela; d.faltam--; S.loja.dividas = S.loja.dividas.filter(x => x.faltam > 0); aviso(`💳 Parcela paga: −${d.parcela} ⭐`); hud(); salvar(); janelaLoja(); } }));
  }
  /* a conta do pagamento: três alternativas, só uma certa */
  function contaLoja(p, o) {
    const r = Math.random() < 0.5;
    let enun, certa, erradas;
    if (o.n === 1) {
      if (r) { enun = `${p.ic} ${esc(p.nome)} custa <b>${p.preco} ⭐</b>. À vista tem <b>10% de desconto</b>. Quanto você vai pagar?`; certa = o.total; erradas = [p.preco, p.preco - 10, p.preco - p.preco / 5]; }
      else { enun = `${p.ic} ${esc(p.nome)} custa <b>${p.preco} ⭐</b>. Pagando à vista, você ganha <b>10% de desconto</b>. Quantas ⭐ você economiza?`; certa = p.preco - o.total; erradas = [10, certa * 2, certa + 5, 1]; }
    } else if (r) { enun = `Você vai pagar <b>${o.n} parcelas de ${o.parcela} ⭐</b>. Quanto vai pagar no total?`; certa = o.total; erradas = [p.preco, o.total + o.parcela, o.parcela + o.n, o.total - o.n]; }
    else { enun = `${p.ic} ${esc(p.nome)} custa <b>${p.preco} ⭐</b> à vista sem desconto. Em <b>${o.n}x de ${o.parcela} ⭐</b>, quanto você paga de juros?`; certa = o.total - p.preco; erradas = [o.total, o.parcela, certa + o.n, certa * 2]; }
    const alts = [certa];
    for (const e of erradas) if (alts.length < 3 && e > 0 && Number.isInteger(e) && !alts.includes(e)) alts.push(e);
    for (let k = 1; alts.length < 3; k++) if (!alts.includes(certa + k * 3)) alts.push(certa + k * 3);
    alts.sort(() => Math.random() - 0.5);
    return { enun, alts, certa: alts.indexOf(certa) };
  }
  function perguntaLoja(p, o) {
    fechaJanela();
    const q = perguntaLoja.ultima = contaLoja(p, o), Lj = LOJAS[lojaAtual];
    const volta = { txt: '🛍️ Voltar à loja', fn: () => { fechaDialogo(); lojaEscolha = null; abreJanela('loja'); } };
    dialogo(Lj.ic, Lj.nome, `<p>${q.enun}</p><p class="muted small">Dica: 10% é o mesmo que dividir por 10.</p>`, q.alts.map((a, i) => ({ txt: `${a} ⭐`, fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (j === q.certa) b.classList.add('certa'); else if (j === i) b.classList.add('errada'); });
      let msg;
      if (i !== q.certa) msg = '❌ A conta não bateu, então a loja não vende ainda. Tente de novo!';
      else if (o.motivo || S.pontos < o.agora) msg = 'Seu saldo mudou e não dá mais para pagar assim.';
      else { compra(p, o); msg = `✅ Conta certa! ${p.ic} ${esc(p.nome)} é seu${o.n > 1 ? `. Faltam ${o.n - 1} parcela(s) de ${o.parcela} ⭐, uma por dia.` : '.'} ${dicaUso(p)}`; }
      D.texto.innerHTML += `<p><strong>${msg}</strong></p>`;
      const opc = i === q.certa ? [volta] : [{ txt: 'Tentar de novo', classe: 'principal', fn: () => perguntaLoja(p, o) }, volta];
      D.op.innerHTML = ''; opc.forEach(x => { const b = document.createElement('button'); b.type = 'button'; b.className = x.classe || 'principal'; b.textContent = x.txt; b.addEventListener('click', x.fn); D.op.appendChild(b); });
      D.op.querySelector('button').focus();
    } })));
    delete D.op.dataset.respondida;
  }
  function compra(p, o) {
    S.pontos -= o.agora;
    if (o.n > 1) S.loja.dividas.push({ nome: p.nome, ic: p.ic, parcela: o.parcela, faltam: o.n - 1, prox: diaHoje() + 1 });
    if (p.unico) S.loja.tem[p.chave] = true;
    if (p.tipo === 'inv') S.inv[p.id] = (S.inv[p.id] || 0) + (p.qtd || 1);
    if (p.tipo === 'movel') { S.casa.guardados[p.id] = (S.casa.guardados[p.id] || 0) + 1; S.casa.feitos[p.id] = true; }
    if (p.tipo === 'av') S.av.acessorio = p.id;
    if (p.tipo === 'cor') { const [k, v] = p.id.split(':'); S.av[k] = v; }
    if (p.tipo === 'pet' && S.pet) S.pet.acessorio = p.id;
    if (p.tipo === 'fig') setTimeout(() => { for (let k = 0; k < 3; k++) ganhaFigurinha(null, 'no pacotinho', true); }, 600);
    S.loja.compras++;
    lojaEscolha = null; hud(); salvar();
  }
  const dicaUso = p => p.tipo === 'proj' ? `Agora a bancada 🛠️ da sua casa sabe fazer: ${MOVEIS[p.id].ic} ${MOVEIS[p.id].nome}.` : p.id === 'vara' || p.id === 'isca' ? 'Chegue na beira de um laguinho e aperte E para pescar.' : p.tipo === 'ferr' ? 'Já está com você: chegue perto de uma árvore ou rocha e aperte E.' : p.tipo === 'av' || p.tipo === 'cor' ? 'Já está no seu avatar; troque quando quiser no 👤 Avatar.' : p.tipo === 'pet' ? (S.pet ? 'Seu pet já está usando!' : 'Adote um pet para usar.') : p.tipo === 'movel' ? 'Está guardado: coloque na sua casa 🏠.' : p.id in COMIDA || p.id === 'maca' ? 'Dê ao seu pet ou de presente a um morador.' : 'Use na janela do pet 🐾.';
  /* ---------- modo turma: sem servidor, o aluno gera um código de progresso e envia para a professora,
     que cola os códigos no painel (material-didatico/turma-mundo.html) para ver o ranking e o progresso ---------- */
  function resumoTurma() {
    const x = xpHabilidades(), h = {};
    for (const k of Object.keys(x)) if (x[k] > 0) h[k] = Math.round(x[k]);
    return { a: S.turma.nome, t: S.turma.codigo, d: Math.floor(Date.now() / 864e5), p: S.pontos, c: S.acertos, e: S.erros,
      f: Object.keys(S.concluidas).length, j: Object.keys(S.feitos).length, i: Object.values(S.cont).reduce((a, b) => a + b, 0),
      h, m: Object.keys(S.medalhas).length, am: Object.values(S.amizade).reduce((a, b) => a + Math.floor(b / 10), 0), pj: S.projetos.doou, mp: resumoMissoesProf(), hb: habsTrabalhadas() };
  }
  const camposTurma = o => [o.a, o.t, o.d, o.p, o.c, o.e, o.f, o.j, o.i, o.h, o.m, o.am].concat(o.pj === undefined ? [] : [o.pj]).concat(o.mp === undefined ? [] : [o.mp]).concat(o.hb === undefined ? [] : [o.hb]);
  /* ---------- missões da professora: o painel da turma gera um código MUNQ1 assinado com as perguntas ---------- */
  const missoesProf = () => S.missoesProf || (S.missoesProf = {});
  function resumoMissoesProf() {
    const r = {};
    for (const [id, m] of Object.entries(missoesProf())) { const vs = Object.values(m.r); r[id] = [vs.filter(Boolean).length, vs.length, m.q.length, m.n.slice(0, 40)]; }
    return r;
  }
  async function lerMissaoProf(code) {
    const Pk = window.MDP && MDP.pacote;
    const o = await Pk.desempacotar('MUNQ1', code);
    if (o.s !== await Pk.assinatura(JSON.stringify([o.t, o.id, o.n, o.q, o.d].concat(o.h ? [o.h] : [])))) throw new Error('assinatura');
    return o;
  }
  function janelaMissoesProf() {
    const M = missoesProf(), T = S.turma;
    $('#mprof-conteudo').innerHTML = `<p>A sua professora ou o seu professor pode criar missões com perguntas próprias. Cole aqui o código da missão (começa com <b>MUNQ1</b>).</p>
      <textarea id="mp-cod" class="campo" rows="2" placeholder="MUNQ1z.…"></textarea>
      <div class="btn-row"><button type="button" class="hb verde" id="mp-add">➕ Adicionar missão</button></div>
      <div class="projetos">${Object.entries(M).map(([id, m]) => { const feitas = Object.keys(m.r).length, certas = Object.values(m.r).filter(Boolean).length;
        return `<div class="proj ${feitas === m.q.length ? 'pronto' : ''}"><h3>📝 ${esc(m.n)}</h3><p class="small">Turma ${esc(m.t)} · ${m.q.length} pergunta(s) · respondidas ${feitas} · certas ${certas}</p>${m.h && m.h.length ? `<p class="small">BNCC: ${chipsHabs(m.h)}</p>` : ''}
          <div class="btn-row">${feitas < m.q.length ? `<button type="button" class="hb azul" data-mp="${id}">▶️ ${feitas ? 'Continuar' : 'Começar'}</button>` : '<b>✅ Missão concluída!</b>'}</div></div>`; }).join('') || '<p class="muted small">Nenhuma missão ainda.</p>'}</div>
      <p class="muted small">Cada acerto de primeira vale 10 ⭐, e terminar a missão vale +30 ⭐ e uma figurinha. O resultado vai junto no seu código de progresso do 👥 Modo turma${T.codigo ? '' : ' (preencha lá o seu nome e o código da turma)'}.</p>`;
    $('#mp-add').addEventListener('click', async () => {
      const code = ($('#mp-cod').value.match(/MUNQ1[jz]\.[A-Za-z0-9_-]+/) || [])[0];
      if (!code) return aviso('Cole o código inteiro da missão (começa com MUNQ1).');
      try {
        const o = await lerMissaoProf(code);
        if (T.codigo && o.t !== T.codigo) return aviso(`Esta missão é da turma ${o.t}, e a sua é ${T.codigo}.`);
        if (M[o.id]) return aviso('📝 Você já tem esta missão.');
        M[o.id] = { n: o.n, t: o.t, q: o.q, r: {}, h: habsValidas(o.h) }; salvar(); aviso(`📝 Missão adicionada: ${o.n}`); janelaMissoesProf();
      } catch (e) { aviso('Código de missão inválido. Confira se copiou inteiro.'); }
    });
    $('#mprof-conteudo').querySelectorAll('[data-mp]').forEach(b => b.addEventListener('click', () => { fechaJanela(); perguntaMissao(b.dataset.mp); }));
  }
  function perguntaMissao(id) {
    const m = missoesProf()[id], i = m.q.findIndex((_, k) => !(k in m.r));
    if (i < 0) return abreJanela('mprof');
    const [enun, alts, certa, expl] = m.q[i];
    dialogo('📝', `${m.n} · ${i + 1}/${m.q.length}`, `<p>${esc(enun)}</p>`, alts.map((a, j) => ({ txt: a, fn: () => {
      if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
      const certo = j === certa; m.r[i] = certo;
      [...D.op.children].forEach((b, k) => { b.disabled = true; if (k === certa) b.classList.add('certa'); else if (k === j) b.classList.add('errada'); });
      if (certo) pontos(10, 'Acertou!');
      const fim = Object.keys(m.r).length === m.q.length;
      if (fim) { const c = Object.values(m.r).filter(Boolean).length; S.medalhas['mprof-' + id] = { ic: '📝', nome: m.n }; setTimeout(() => { pontos(30, `📝 Missão concluída: ${c} de ${m.q.length} certas!`); ganhaFigurinha(null, 'pela missão da professora'); }, 900); }
      salvar();
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${esc(expl || '')}</p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = fim ? 'Terminar' : 'Próxima';
      b.addEventListener('click', () => fim ? (fechaDialogo(), abreJanela('mprof')) : perguntaMissao(id)); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  async function codigoTurma() {
    const P = window.MDP && MDP.pacote; if (!P) throw new Error('sem pacote');
    const o = resumoTurma(); o.s = await P.assinatura(JSON.stringify(camposTurma(o)));
    return P.empacotar('MUN1', o);
  }
  const limpaTurma = t => String(t || '').toUpperCase().replace(/[^A-Z0-9º°-]/g, '').slice(0, 16);
  function janelaTurma() {
    const el = $('#turma-conteudo'), T = S.turma;
    el.innerHTML = `<p>Use o modo turma nas aulas: escreva o seu nome e o código que a professora passou (por exemplo, <b>8A-2026</b>). Depois gere o código de progresso e envie para ela pelo canal da turma.</p>
      <div class="turma-form"><label>Seu nome <input id="tu-nome" class="campo" maxlength="30" value="${esc(T.nome)}" autocomplete="off"></label>
      <label>Código da turma <input id="tu-cod" class="campo" maxlength="16" value="${esc(T.codigo)}" autocomplete="off" placeholder="8A-2026"></label></div>
      <div class="btn-row"><button type="button" class="hb verde" id="tu-gerar">📤 Gerar código de progresso</button></div>
      <div id="tu-saida" hidden><textarea id="tu-codigo" class="campo" rows="3" readonly></textarea>
      <div class="btn-row"><button type="button" class="hb azul" id="tu-copiar">📋 Copiar</button></div>
      <p class="muted small">O código leva os seus pontos, as fases e os jogos concluídos, os acertos, as habilidades da BNCC e as medalhas. Ele não atualiza sozinho: gere outro quando quiser mandar o progresso novo.</p></div>
      ${(c => { const hs = Object.keys(c).sort(); return `<details class="habs-turma"><summary>📐 Habilidades da BNCC que você já trabalhou (${hs.length})</summary>${hs.length ? `<ul class="etapas">${hs.map(h => `<li class="ok">${chipsHabs([h], c)} ${esc(HAB_[h].objeto)} <span class="muted small">(${c[h]}×)</span></li>`).join('')}</ul>` : '<p class="muted small">Ainda nenhuma: jogue as casas e responda às perguntas dos moradores.</p>'}</details>`; })(habsTrabalhadas())}
      <p class="muted small">Professora ou professor: cole os códigos dos alunos no <a href="../material-didatico/turma-mundo.html" target="_blank" rel="noopener">painel da turma do Mundo</a> para ver o ranking e o progresso de cada um.</p>`;
    $('#tu-gerar').addEventListener('click', async () => {
      const nome = $('#tu-nome').value.trim().slice(0, 30), cod = limpaTurma($('#tu-cod').value);
      if (!nome || !cod) { aviso('Escreva o seu nome e o código da turma.'); return; }
      T.nome = nome; T.codigo = cod; $('#tu-cod').value = cod; salvar();
      try { $('#tu-codigo').value = await codigoTurma(); eventoGC('mundo-turma'); $('#tu-saida').hidden = false; $('#tu-codigo').select(); }
      catch (e) { aviso('Não deu para gerar o código neste navegador.'); }
    });
    $('#tu-copiar').addEventListener('click', async () => {
      const t = $('#tu-codigo'); t.select();
      try { await navigator.clipboard.writeText(t.value); aviso('📋 Código copiado! Agora é só colar para a professora.'); }
      catch (e) { document.execCommand && document.execCommand('copy'); aviso('📋 Código selecionado: copie e envie.'); }
    });
  }
  /* ---------- ranking entre amigos: cada um gera um código MUNA1 e cola o dos amigos; tudo fica só no aparelho, sem servidor ---------- */
  const camposAmigo = o => [o.id, o.n, o.p, o.a, o.f, o.g, o.pe, o.d];
  const resumoAmigo = () => {
    if (!S.amigoId) S.amigoId = Math.random().toString(36).slice(2, 10);
    return { id: S.amigoId, n: S.apelido || '', p: S.pontos, a: S.acertos, f: Object.keys(S.concluidas).length, g: Object.values(S.album.tem).filter(n => n > 0).length, pe: (S.pesca && S.pesca.total) || 0, d: Date.now() };
  };
  async function codigoAmigo() {
    const P = window.MDP && MDP.pacote; if (!P) throw new Error('sem pacote');
    const o = resumoAmigo(); o.s = await P.assinatura(JSON.stringify(camposAmigo(o)));
    return P.empacotar('MUNA1', o);
  }
  async function leCodigosAmigos(txt) {
    const P = MDP.pacote, achou = String(txt).replace(/\s+/g, ' ').match(/MUNA1[jz]\.[A-Za-z0-9_-]+/g) || [];
    const A = S.amigos || (S.amigos = {}); let novos = 0, ruins = 0;
    for (const c of achou) {
      try {
        const o = await P.desempacotar('MUNA1', c);
        if (o.s !== await P.assinatura(JSON.stringify(camposAmigo(o))) || !o.id || o.id === S.amigoId) { ruins++; continue; }
        if (!A[o.id] || A[o.id].d < o.d) { A[o.id] = { n: String(o.n || 'Amigo').slice(0, 20), p: +o.p || 0, a: +o.a || 0, f: +o.f || 0, g: +o.g || 0, pe: +o.pe || 0, d: o.d }; novos++; }
      } catch (e) { ruins++; }
    }
    const ids = Object.keys(A).sort((x, y) => A[y].d - A[x].d); for (const k of ids.slice(40)) delete A[k];   // no máximo 40 amigos
    salvar(); return { novos, ruins, total: achou.length };
  }
  let ordemAmigos = 'p';
  function janelaAmigos() {
    const el = $('#amigos-conteudo'), A = S.amigos || {}, eu = Object.assign(resumoAmigo(), { eu: true, n: S.apelido || 'Você' });
    const lista = Object.values(A).concat([eu]).sort((x, y) => y[ordemAmigos] - x[ordemAmigos] || y.p - x.p);
    const quando = d => { const h = (Date.now() - d) / 36e5; return h < 1 ? 'agora há pouco' : h < 24 ? `há ${Math.floor(h)} h` : `há ${Math.floor(h / 24)} dia(s)`; };
    const col = (k, t) => `<th><button type="button" class="ord ${ordemAmigos === k ? 'ativa' : ''}" data-ord="${k}" aria-pressed="${ordemAmigos === k}">${t}</button></th>`;
    el.innerHTML = `<p>Compare o seu progresso com o dos seus amigos. Cada um gera o seu código e manda para os outros; você cola os códigos que recebeu aqui. Nada vai para a internet: o ranking fica só neste aparelho.</p>
      <label>Seu apelido no ranking <input id="am-apelido" class="campo" maxlength="20" value="${esc(S.apelido || '')}" autocomplete="off" placeholder="Ex.: Bia do 8A"></label>
      <p class="muted small">Use um apelido, não o nome completo.</p>
      <div class="btn-row"><button type="button" class="hb verde" id="am-gerar">📤 Gerar meu código</button></div>
      <div id="am-saida" hidden><textarea id="am-codigo" class="campo" rows="2" readonly aria-label="Seu código de amigo"></textarea>
        <div class="btn-row"><button type="button" class="hb azul" id="am-copiar">📋 Copiar</button></div>
        <p class="muted small">O código leva o apelido, os pontos, os acertos, as vilas concluídas, as figurinhas e os peixes. Gere outro quando quiser mostrar o progresso novo.</p></div>
      <h3>Códigos dos amigos</h3>
      <textarea id="am-colar" class="campo" rows="2" placeholder="Cole aqui um ou vários códigos (começam com MUNA1)" aria-label="Colar códigos dos amigos"></textarea>
      <div class="btn-row"><button type="button" class="hb verde" id="am-add">➕ Adicionar ao ranking</button></div>
      <h3>🏆 Ranking</h3>
      <div class="tabela-rolar"><table class="ranking-amigos"><thead><tr><th>#</th><th>Apelido</th>${col('p', '⭐ Pontos')}${col('a', '🧠 Acertos')}${col('f', '🏡 Vilas')}${col('g', '📒 Figurinhas')}${col('pe', '🎣 Peixes')}<th></th></tr></thead><tbody>
      ${lista.map((o, i) => `<tr class="${o.eu ? 'eu' : ''}"><td>${i < 3 ? ['🥇', '🥈', '🥉'][i] : i + 1}</td><td>${esc(o.n)}${o.eu ? ' <span class="muted small">(você)</span>' : `<br><span class="muted small">${quando(o.d)}</span>`}</td><td>${o.p}</td><td>${o.a}</td><td>${o.f}</td><td>${o.g}</td><td>${o.pe}</td><td>${o.eu ? '' : `<button type="button" class="d-x" data-tirar="${esc(Object.keys(A).find(k => A[k] === o))}" aria-label="Tirar ${esc(o.n)} do ranking">✕</button>`}</td></tr>`).join('')}
      </tbody></table></div>
      ${lista.length < 2 ? '<p class="muted small">Ainda não tem amigos no ranking: troque códigos com a turma!</p>' : ''}`;
    $('#am-apelido').addEventListener('change', e => { S.apelido = e.target.value.trim().slice(0, 20); salvar(); });
    $('#am-gerar').addEventListener('click', async () => {
      S.apelido = $('#am-apelido').value.trim().slice(0, 20);
      if (!S.apelido) { aviso('Escreva um apelido para o ranking.'); return; }
      salvar();
      try { $('#am-codigo').value = await codigoAmigo(); $('#am-saida').hidden = false; $('#am-codigo').select(); } catch (e) { aviso('Não deu para gerar o código neste navegador.'); }
    });
    $('#am-copiar').addEventListener('click', async () => { $('#am-codigo').select(); try { await navigator.clipboard.writeText($('#am-codigo').value); aviso('📋 Código copiado! Mande para os seus amigos.'); } catch (e) { document.execCommand && document.execCommand('copy'); aviso('📋 Código selecionado: copie e envie.'); } });
    $('#am-add').addEventListener('click', async () => {
      const r = await leCodigosAmigos($('#am-colar').value);
      if (!r.total) { aviso('Não achei nenhum código de amigo (começa com MUNA1).'); return; }
      janelaAmigos(); aviso(r.ruins ? `${r.novos} código(s) adicionado(s); ${r.ruins} não conferiu(ram) e ficou de fora.` : `🏆 ${r.novos} código(s) no ranking!`);
    });
    el.querySelectorAll('[data-ord]').forEach(b => b.addEventListener('click', () => { ordemAmigos = b.dataset.ord; janelaAmigos(); }));
    el.querySelectorAll('[data-tirar]').forEach(b => b.addEventListener('click', () => { delete A[b.dataset.tirar]; salvar(); janelaAmigos(); }));
  }
  /* ---------- levar para outro aparelho: o jogo inteiro (e o Meu progresso dos jogos) vira um código MUNS1 ou um arquivo ---------- */
  async function codigoSalvamento() {
    const P = window.MDP && MDP.pacote; if (!P) throw new Error('sem pacote');
    guardaPos();
    let m = ''; try { m = await MDP.exportar(); } catch (e) {}
    return P.empacotar('MUNS1', { v: 1, d: Date.now(), s: S, m });
  }
  async function restauraSalvamento(txt) {
    const code = (String(txt).match(/MUNS1[jz]\.[A-Za-z0-9_-]+/) || [])[0];
    if (!code) throw new Error('sem código');
    const o = await MDP.pacote.desempacotar('MUNS1', code);
    if (!o || !o.s || typeof o.s.pontos !== 'number') throw new Error('formato');
    const quando = new Date(o.d).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    if (!confirm(`Trocar o progresso deste aparelho pelo do código (${o.s.pontos} ⭐, salvo em ${quando})? O progresso atual deste aparelho será substituído.`)) return false;
    if (o.m) { try { await MDP.importar(o.m); } catch (e) {} }
    restaurando = true;
    localStorage.setItem(CHAVE, JSON.stringify(o.s));
    location.reload();
    return true;
  }
  function janelaLevar() {
    $('#levar-conteudo').innerHTML = `<p>O progresso fica guardado só neste navegador. Para continuar em outro computador ou celular, gere o código aqui e abra o Mundo no outro aparelho.</p>
      <h3>1. Neste aparelho</h3>
      <div class="btn-row"><button type="button" class="hb verde" id="lv-gerar">📤 Gerar código de salvamento</button></div>
      <div id="lv-saida" hidden><textarea id="lv-codigo" class="campo" rows="3" readonly aria-label="Código de salvamento"></textarea>
        <div class="btn-row"><button type="button" class="hb azul" id="lv-copiar">📋 Copiar</button><button type="button" class="hb azul" id="lv-baixar">💾 Baixar arquivo</button></div>
        <p class="muted small">Mande o código para você mesmo (e-mail, WhatsApp, pendrive) ou guarde o arquivo. Ele leva a casa, o pet, os pontos, o álbum, as missões e o Meu progresso dos jogos.</p></div>
      <h3>2. No outro aparelho</h3>
      <textarea id="lv-colar" class="campo" rows="3" placeholder="Cole aqui o código (começa com MUNS1)" aria-label="Colar código de salvamento"></textarea>
      <div class="btn-row"><button type="button" class="hb verde" id="lv-restaurar">📥 Continuar deste código</button>
        <label class="hb azul" style="cursor:pointer">📂 Abrir arquivo<input type="file" id="lv-arquivo" accept=".txt,text/plain" hidden></label></div>
      <p class="muted small">Atenção: continuar de um código substitui o progresso que está neste aparelho.</p>`;
    let atualCod = '';
    $('#lv-gerar').addEventListener('click', async () => {
      try { atualCod = await codigoSalvamento(); $('#lv-codigo').value = atualCod; $('#lv-saida').hidden = false; $('#lv-codigo').select(); }
      catch (e) { aviso('Não deu para gerar o código neste navegador.'); }
    });
    $('#lv-copiar').addEventListener('click', async () => {
      $('#lv-codigo').select();
      try { await navigator.clipboard.writeText(atualCod); aviso('📋 Código copiado!'); } catch (e) { document.execCommand && document.execCommand('copy'); aviso('📋 Código selecionado: copie e guarde.'); }
    });
    $('#lv-baixar').addEventListener('click', () => {
      const a = document.createElement('a'), nome = (S.turma.nome || 'mundo').normalize('NFD').replace(/[^\w-]+/g, '-').toLowerCase();
      a.href = URL.createObjectURL(new Blob([atualCod], { type: 'text/plain' }));
      a.download = `mundo-${nome}-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a); a.click(); a.remove();
    });
    const restaura = async txt => { try { await restauraSalvamento(txt); } catch (e) { aviso('Código de salvamento inválido. Confira se copiou inteiro.'); } };
    $('#lv-restaurar').addEventListener('click', () => restaura($('#lv-colar').value));
    $('#lv-arquivo').addEventListener('change', async e => { const f = e.target.files[0]; if (f) restaura(await f.text()); });
  }
  /* projetos coletivos: a doação de cada aluno vai no código de progresso; o painel da professora soma a turma */
  const doado = (P, k) => ((S.projetos.doou[P.id] || {})[k] || 0);
  const fracProjeto = P => { const ks = Object.keys(P.meta); return ks.reduce((a, k) => a + Math.min(1, doado(P, k) / P.meta[k]), 0) / ks.length; };
  function doa(P, k) {
    if (!(S.inv[k] > 0) || doado(P, k) >= P.meta[k] * 2) return;
    S.inv[k]--; const d = S.projetos.doou[P.id] || (S.projetos.doou[P.id] = {}); d[k] = (d[k] || 0) + 1;
    if (doado(P, k) === P.meta[k] && fracProjeto(P) >= 1) pontos(15, `${P.ic} Você completou a sua parte do projeto ${P.nome}!`); else aviso(`${ITENS[k][0]} doado para ${P.nome}`);
    salvar(); janelaProjetos();
  }
  async function conclusaoProjeto(code) {
    const Pk = window.MDP && MDP.pacote;
    const o = await Pk.desempacotar('MUNT1', code);
    if (o.s !== await Pk.assinatura(JSON.stringify([o.t, o.pj, o.d]))) throw new Error('assinatura');
    return o;
  }
  function janelaProjetos() {
    const el = $('#projetos-conteudo'), T = S.turma;
    el.innerHTML = `<p>A turma constrói junto. Cada pessoa doa a sua parte com os itens que achou na vila; quando a soma da turma chega na meta, a professora gera um <b>código de conclusão</b> e o prédio fica pronto aqui na praça.</p>
      ${T.codigo ? `<p class="muted small">Sua turma: <b>${esc(T.codigo)}</b>. Depois de doar, gere de novo o código de progresso no 👥 Modo turma e envie para a professora.</p>` : '<p class="muted small">Antes, escreva o seu nome e o código da turma no ☰ Menu → 👥 Modo turma.</p>'}
      <div class="projetos">${PROJETOS.map(P => { const pronto = S.projetos.prontos[P.id]; return `<div class="proj ${pronto ? 'pronto' : ''}">
        <h3>${P.ic} ${esc(P.nome)} ${pronto ? '<small>· concluído! 🎉</small>' : ''}</h3><p class="muted small">${esc(P.texto)}</p>
        ${pronto ? '' : `<div class="barra"><span style="width:${Math.round(100 * fracProjeto(P))}%"></span></div>
        <p class="small">Sua parte: ${Object.entries(P.meta).map(([k, n]) => `${ITENS[k][0]} ${doado(P, k)}/${n}`).join(' · ')}</p>
        <div class="btn-row">${Object.keys(P.meta).map(k => `<button type="button" class="hb azul" data-doa="${P.id}:${k}" ${S.inv[k] > 0 && doado(P, k) < P.meta[k] * 2 ? '' : 'disabled'}>Doar ${ITENS[k][0]} (tem ${S.inv[k] || 0})</button>`).join('')}</div>`}
      </div>`; }).join('')}</div>
      <div class="av-grupo"><h3>Código de conclusão da turma</h3><input id="pj-cod" class="campo" placeholder="MUNT1…" autocomplete="off" style="width:100%"><div class="btn-row"><button type="button" class="hb verde" id="pj-usar">🏗️ Usar código</button></div></div>
      <p class="muted small">Pode doar até o dobro da sua parte, para ajudar quem ainda não conseguiu.</p>`;
    el.querySelectorAll('[data-doa]').forEach(b => b.addEventListener('click', () => { const [id, k] = b.dataset.doa.split(':'); doa(PROJETOS.find(P => P.id === id), k); }));
    $('#pj-usar').addEventListener('click', async () => {
      try {
        const o = await conclusaoProjeto($('#pj-cod').value), P = PROJETOS.find(q => q.id === o.pj);
        if (!P) throw new Error('projeto');
        if (T.codigo && o.t !== T.codigo) return aviso(`Este código é da turma ${o.t}, e a sua é ${T.codigo}.`);
        if (S.projetos.prontos[P.id]) return aviso(`${P.ic} Este projeto já foi concluído.`);
        S.projetos.prontos[P.id] = true; S.medalhas['projeto-' + P.id] = { ic: P.ic, nome: `${P.nome} (turma ${o.t})` };
        pontos(40, `${P.ic} Projeto concluído pela turma ${o.t}: ${P.nome}!`); ganhaFigurinha(null, 'pelo projeto da turma'); salvar(); janelaProjetos();
      } catch (e) { aviso('Código de conclusão inválido. Confira se copiou inteiro.'); }
    });
  }
  /* ---------- profissões da computação: um profissional em cada uma das 5 primeiras vilas, com uma missão em 4 etapas ---------- */
  const PROFISSOES = [
    { fase: 0, id: 'programadora', nome: 'Lia', prof: 'Programadora', ic: '🧑‍💻', eixos: ['PC'], premio: 'fone',
      av: { pele: PELES[2], cabelo: CABELOS[6], estilo: 'longo', camisa: '#333333', calca: '#2f3b6b', acessorio: 'fone' },
      ola: 'Eu escrevo programas: passo a passo, digo ao computador exatamente o que fazer. Topa aprender como é o meu trabalho?',
      passos: [
        { tipo: 'pergunta', txt: 'Entender o que é um algoritmo', enun: 'Tudo começa com um algoritmo. O que é um algoritmo?', alts: ['Uma sequência finita de passos para resolver um problema', 'Um tipo de computador muito rápido', 'Um vírus que apaga arquivos', 'Um aplicativo de mensagens'], coment: 'Uma receita de bolo também é um algoritmo!' },
        { tipo: 'item', txt: 'Trazer 2 📘 livros para estudar lógica', item: 'livro', n: 2 },
        { tipo: 'jogos', txt: 'Concluir 2 atividades desta vila', n: 2 },
        { tipo: 'pergunta', txt: 'Resolver o desafio do laço', enun: 'Meu robô pula 4 vezes, mas eu escrevi o comando "pule" uma vez só. Que estrutura eu usei?', alts: ['Repetição (laço)', 'Condição (se/senão)', 'Variável', 'Comentário'], coment: 'Laços repetem comandos sem precisar escrever tudo de novo.' }
      ] },
    { fase: 1, id: 'dados', nome: 'Caio', prof: 'Cientista de dados', ic: '📊', eixos: ['PE'], premio: 'oculosRedondos',
      av: { pele: PELES[4], cabelo: CABELOS[1], estilo: 'curto', camisa: '#ffffff', calca: '#333333', acessorio: 'oculosRedondos' },
      ola: 'Eu transformo números em respostas: junto dados, organizo em tabelas e gráficos e descubro o que eles contam.',
      passos: [
        { tipo: 'pergunta', txt: 'Calcular uma média', enun: 'Anotei as notas 6, 8 e 10. Qual é a média dessas notas?', alts: ['8', '6', '10', '24'], coment: 'Média: some tudo (24) e divida pela quantidade (3).' },
        { tipo: 'item', txt: 'Trazer 2 🍎 maçãs para a pesquisa da feira', item: 'maca', n: 2 },
        { tipo: 'acertos', txt: 'Acertar 3 perguntas desta vila', n: 3 },
        { tipo: 'pergunta', txt: 'Ler um gráfico de barras', enun: 'Num gráfico de barras sobre as frutas preferidas da turma, a barra mais alta mostra...', alts: ['A fruta escolhida por mais pessoas', 'A fruta mais cara', 'A fruta mais pesada', 'A última fruta da lista'], coment: 'A altura da barra mostra a quantidade (a frequência).' }
      ] },
    { fase: 2, id: 'designer', nome: 'Tati', prof: 'Designer de jogos', ic: '🎨', eixos: ['MD'], premio: 'boina',
      av: { pele: PELES[0], cabelo: CABELOS[5], estilo: 'coque', camisa: '#9a6bd6', calca: '#2f3b6b', acessorio: 'boina' },
      ola: 'Eu invento jogos: as regras, as fases, os personagens e o que acontece quando a gente aperta cada botão.',
      passos: [
        { tipo: 'pergunta', txt: 'Achar o nome do problema', enun: 'No meu jogo, o personagem atravessa a parede quando não devia. Como chamamos esse erro?', alts: ['Bug', 'Pixel', 'Backup', 'Download'], coment: 'Procurar e corrigir bugs se chama depurar.' },
        { tipo: 'item', txt: 'Trazer 1 💎 diamante e 1 ⭐ estrela para o cenário', item: 'diamante', n: 1, item2: 'estrela', n2: 1 },
        { tipo: 'jogos', txt: 'Concluir 2 atividades desta vila', n: 2 },
        { tipo: 'pergunta', txt: 'Entender a imagem na tela', enun: 'As imagens do jogo na tela são formadas por pontinhos coloridos chamados...', alts: ['Pixels', 'Bytes de som', 'Pastas', 'Links'], coment: 'Cada pixel guarda uma cor, em números.' }
      ] },
    { fase: 3, id: 'redes', nome: 'Rui', prof: 'Técnico de redes', ic: '🛜', eixos: ['MD', 'CD'], premio: 'capacete',
      av: { pele: PELES[3], cabelo: CABELOS[0], estilo: 'bone', camisa: '#f6b73c', calca: '#2f3b6b', acessorio: 'capacete' },
      ola: 'Eu ligo os computadores uns aos outros: cabos, roteadores, Wi-Fi e a segurança de tudo isso.',
      passos: [
        { tipo: 'pergunta', txt: 'Descobrir como um computador é achado na rede', enun: 'Para ser encontrado numa rede, cada computador tem um número de identificação. Como ele se chama?', alts: ['Endereço IP', 'Senha do Wi-Fi', 'Nome de usuário', 'Tamanho da tela'], coment: 'O IP funciona como o endereço de uma casa na rede.' },
        { tipo: 'item', txt: 'Trazer 1 🔑 chave e 1 💎 diamante para o rack', item: 'chave', n: 1, item2: 'diamante', n2: 1 },
        { tipo: 'acertos', txt: 'Acertar 3 perguntas desta vila', n: 3 },
        { tipo: 'pergunta', txt: 'Escolher uma senha forte', enun: 'Qual destas senhas é a mais segura?', alts: ['Gat0!Azul#Pula7', '123456', 'senha', 'A data do seu aniversário'], coment: 'Senhas longas, com letras, números e símbolos, são mais difíceis de adivinhar.' }
      ] },
    { fase: 4, id: 'ia', nome: 'Nara', prof: 'Engenheira de IA', ic: '🤖', eixos: ['PC', 'CD'], premio: 'antena',
      av: { pele: PELES[1], cabelo: CABELOS[3], estilo: 'longo', camisa: '#2bb3b1', calca: '#333333', acessorio: 'antena' },
      ola: 'Eu ensino computadores a aprender com exemplos. Mas IA boa depende de dados bons e de gente cuidadosa.',
      passos: [
        { tipo: 'pergunta', txt: 'Preparar o treino de uma IA', enun: 'Para treinar uma IA que reconhece gatos em fotos, o mais importante é ter...', alts: ['Muitas fotos com e sem gatos, bem identificadas', 'Um teclado colorido', 'Uma tela bem grande', 'Nenhum exemplo, a IA já sabe'], coment: 'A IA aprende com exemplos rotulados.' },
        { tipo: 'item', txt: 'Trazer 2 📘 livros e 1 💎 diamante', item: 'livro', n: 2, item2: 'diamante', n2: 1 },
        { tipo: 'jogos', txt: 'Concluir 2 atividades desta vila', n: 2 },
        { tipo: 'pergunta', txt: 'Perceber um viés', enun: 'Se a IA só viu gatos laranja no treino, ela pode errar com gatos pretos. Isso mostra que...', alts: ['Os dados de treino precisam ser variados para evitar vieses', 'A IA nunca erra', 'Gatos pretos não são gatos', 'IA não usa dados'], coment: 'Dados pouco variados geram vieses: por isso pessoas precisam revisar a IA.' }
      ] }
  ];
  const profDe = f => PROFISSOES.find(p => p.fase === f.idx);
  const posProf = f => ({ x: f.x0 + f.cx - 2.3, y: f.cy + 2.3 });
  const estProf = p => S.prof[p.id] || (S.prof[p.id] = { passo: 0, feito: false });
  function condicaoProf(p, f) {
    const ps = p.passos[estProf(p).passo];
    if (ps.tipo === 'jogos') { const n = f.lugares.filter(l => S.feitos[l.id]).length; return [n >= ps.n, `${Math.min(n, ps.n)}/${ps.n}`]; }
    if (ps.tipo === 'acertos') { const n = f.perguntas.filter(q => S.resp[q.id] === true).length; return [n >= ps.n, `${Math.min(n, ps.n)}/${ps.n}`]; }
    if (ps.tipo === 'item') { const ok = (S.inv[ps.item] || 0) >= ps.n && (!ps.item2 || (S.inv[ps.item2] || 0) >= ps.n2); return [ok, ok ? 'você tem os itens' : 'ainda faltam itens']; }
    return [true, ''];
  }
  function avancaProf(p, f) {
    const E = estProf(p);
    E.passo++;
    if (E.passo >= p.passos.length) {
      E.feito = true; E.passo = p.passos.length - 1;
      S.loja.tem['av:' + p.premio] = true; S.medalhas['prof-' + p.id] = { ic: p.ic, nome: p.prof };
      ganhaHabilidade(p.eixos, 30); pontos(60, `${p.ic} Missão de ${p.prof} completa! Você ganhou: ${NOMES_ENFEITE[p.premio]}.`); setTimeout(() => ganhaFigurinha(null, 'pela missão de ' + p.prof), 1800);
    } else aviso(`${p.ic} Etapa concluída! (${E.passo}/${p.passos.length})`);
    salvar(); falaProf(f);
  }
  function falaProf(f) {
    const p = profDe(f), E = estProf(p), fecha = { txt: 'Até mais!', fn: fechaDialogo };
    const lista = `<ol class="etapas">${p.passos.map((ps, i) => `<li class="${E.feito || i < E.passo ? 'ok' : i === E.passo ? 'agora' : ''}">${E.feito || i < E.passo ? '✅' : i === E.passo ? '👉' : '⬜'} ${esc(ps.txt)}</li>`).join('')}</ol>`;
    if (E.feito && p.id === 'programadora') return dialogo(p.ic, `${p.nome} · ${p.prof}`, `<p>Missão cumprida! Quer treinar mais? Na oficina de código você programa o robô ou o seu pet com blocos.</p>${lista}`, [{ txt: '🧩 Abrir a oficina de código', classe: 'principal', fn: () => { fechaDialogo(); abreJanela('oficina'); } }, fecha]);
    if (E.feito) return dialogo(p.ic, `${p.nome} · ${p.prof}`, `<p>Você já sabe um pouco do meu trabalho! Continue estudando: o mundo precisa de mais gente na computação.</p>${lista}<p class="muted small">Seu prêmio, ${esc(NOMES_ENFEITE[p.premio])}, está no 🧑 Avatar.</p>`, [fecha]);
    const ps = p.passos[E.passo], [ok, prog] = condicaoProf(p, f);
    const intro = E.passo === 0 ? `<p>Oi! Eu sou ${esc(p.nome)}, ${p.prof.toLowerCase()}. ${esc(p.ola)}</p>` : '<p>Que bom te ver! Vamos para a próxima etapa?</p>';
    const ops = [];
    if (ps.tipo === 'pergunta') ops.push({ txt: 'Responder', classe: 'principal', fn: () => perguntaProf(p, f) });
    else if (ps.tipo === 'item') ops.push({ txt: ok ? `Entregar ${ITENS[ps.item][0]}${ps.item2 ? ' e ' + ITENS[ps.item2][0] : ''}` : 'Ainda não tenho', classe: ok ? 'principal' : '', fn: () => { if (!condicaoProf(p, f)[0]) return fechaDialogo(); S.inv[ps.item] -= ps.n; if (ps.item2) S.inv[ps.item2] -= ps.n2; avancaProf(p, f); } });
    else ops.push({ txt: ok ? 'Já fiz!' : 'Vou fazer', classe: ok ? 'principal' : '', fn: () => ok ? avancaProf(p, f) : fechaDialogo() });
    if (p.id === 'programadora') ops.push({ txt: '🧩 Abrir a oficina de código', fn: () => { fechaDialogo(); abreJanela('oficina'); } });
    ops.push(fecha);
    dialogo(p.ic, `${p.nome} · ${p.prof}`, `${intro}<p><strong>Missão em ${p.passos.length} etapas</strong></p>${lista}${prog && ps.tipo !== 'pergunta' ? `<p class="muted small">Agora: ${esc(ps.txt)} · ${prog}</p>` : ''}`, ops);
  }
  function perguntaProf(p, f) {
    const chB = `prof:${p.id}:${estProf(p).passo}`; if (bloqueada(chB)) return avisoBloqueio(p.ic, `${p.nome} · ${p.prof}`);
    const ps = p.passos[estProf(p).passo], ordem = ps.alts.map((a, i) => i).sort(() => Math.random() - 0.5);
    dialogo(p.ic, `${p.nome} · ${p.prof}`, `<p>${esc(ps.enun)}</p>`, ordem.map(i => ({ txt: ps.alts[i], fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = i === 0; contaResposta(); if (!certo) bloqueia(chB);
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (ordem[j] === 0) b.classList.add('certa'); else if (ordem[j] === i) b.classList.add('errada'); });
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${esc(ps.coment)}</p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = certo ? 'Continuar' : 'Entendi';
      b.addEventListener('click', () => certo ? avancaProf(p, f) : fechaDialogo()); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  /* ---------- oficina de código: programação em blocos (sequência, repetição) para o robô ou o pet ----------
     mapa: '.' chão, '#' parede, 'a' maçã para pegar, 'G' chegada, '>' 'v' '<' '^' início e direção */
  const NIVEIS_OF = [
    { par: 4, dica: 'Use ⬆️ Frente para andar até a bandeira.', mapa: ['.......', '.......', '.......', '>...G..', '.......', '.......', '.......'] },
    { par: 7, dica: 'Os blocos de virar giram o personagem sem sair do lugar.', mapa: ['.......', '.>...#.', '.....#.', '.......', '....G..', '.......', '.......'] },
    { par: 6, dica: 'Pare em cima da maçã e use 🍎 Pegar. A bandeira só conta com todas as maçãs.', mapa: ['.......', '.......', '.>.a..G', '.......', '.......', '.......', '.......'] },
    { par: 2, dica: 'Seis vezes Frente? Use 🔁 Repetir: escolha 6, coloque um Frente dentro e feche.', mapa: ['.......', '.......', '.......', '>.....G', '.......', '.......', '.......'] },
    { par: 5, dica: 'Uma escada: frente, sobe, frente, vira... O que se repete?', mapa: ['.......', '.......', '....G..', '.......', '.......', '.......', '>......'] },
    { par: 8, dica: 'Três lados iguais: andar 3, pegar e virar.', mapa: ['.......', '.>..a..', '.G.....', '.......', '.a..a..', '.......', '.......'] },
    { par: 8, dica: 'Uma maçã a cada passo: repita andar e pegar.', mapa: ['.......', '.......', '.......', '>aaaaaG', '.......', '.......', '.......'] },
    { par: 17, dica: 'Labirinto! Planeje o caminho antes e use Repetir nos trechos retos.', mapa: ['#######', '#>..#G#', '###.#.#', '#...#.#', '#.###.#', '#.....#', '#######'] },
    { par: 7, dica: 'A escada agora tem maçãs em cada degrau.', mapa: ['.......', '.......', '....aG.', '...a...', '..a....', '.a.....', '>......'] },
    { par: 7, dica: 'Desafio: um Repetir dentro de outro Repetir (laços aninhados).', mapa: ['>.a.a.a', '.......', '......a', '.......', '......a', '.......', '.....Ga'] }
  ];
  NIVEIS_OF[6].par = 4;
  const BLOCOS_OF = { f: ['⬆️', 'Frente'], e: ['↩️', 'Virar à esquerda'], d: ['↪️', 'Virar à direita'], p: ['🍎', 'Pegar'] };
  const OF = { nivel: 0, prog: [], pilha: [], rodando: false, quem: 'robo', estado: null };
  const contaBlocos = l => l.reduce((a, b) => a + 1 + (b.op === 'r' ? contaBlocos(b.corpo) : 0), 0);
  const lista_OF = () => OF.pilha.length ? OF.pilha[OF.pilha.length - 1].corpo : OF.prog;
  function inicioOF(n) {
    const M = NIVEIS_OF[n].mapa, st = { macas: new Set(), x: 0, y: 0, dir: 0, pegou: 0, total: 0 };
    M.forEach((linha, y) => [...linha].forEach((c, x) => { const d = '>v<^'.indexOf(c); if (d >= 0) Object.assign(st, { x, y, dir: d }); if (c === 'a') { st.macas.add(x + ',' + y); st.total++; } if (c === 'G') st.g = [x, y]; }));
    return st;
  }
  function passosOF(l, out = []) { for (const b of l) { if (out.length > 300) break; if (b.op === 'r') for (let i = 0; i < b.n; i++) passosOF(b.corpo, out); else out.push(b.op); } return out; }
  function desenhaOF() {
    const c = $('#of-cv'); if (!c) return;
    const g = c.getContext('2d'), M = NIVEIS_OF[OF.nivel].mapa, T = 40, st = OF.estado;
    g.clearRect(0, 0, c.width, c.height);
    M.forEach((linha, y) => [...linha].forEach((ch, x) => {
      g.fillStyle = ch === '#' ? '#7a8f6a' : (x + y) % 2 ? '#bfe3a8' : '#cdeab8'; g.fillRect(x * T, y * T, T, T);
      g.font = '24px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      if (ch === '#') g.fillText('🌳', x * T + T / 2, y * T + T / 2 + 1);
      if (ch === 'G') g.fillText('🏁', x * T + T / 2, y * T + T / 2 + 1);
      if (ch === 'a' && st.macas.has(x + ',' + y)) g.fillText('🍎', x * T + T / 2, y * T + T / 2 + 1);
    }));
    const cx = st.x * T + T / 2, cy = st.y * T + T / 2, [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][st.dir];
    g.fillStyle = '#e0564a'; g.beginPath(); g.moveTo(cx + dx * 19, cy + dy * 19); g.lineTo(cx + dx * 11 - dy * 7, cy + dy * 11 + dx * 7); g.lineTo(cx + dx * 11 + dy * 7, cy + dy * 11 - dx * 7); g.closePath(); g.fill();
    g.font = '26px system-ui, sans-serif'; g.fillText(OF.quem === 'pet' && S.pet ? ESPECIES[S.pet.especie][0] : '🤖', cx, cy + 1);
    if (st.bateu) { g.font = '18px system-ui, sans-serif'; g.fillText('💥', cx + dx * 20, cy + dy * 20); }
  }
  const progHtml = (l, nivel = 0) => l.map(b => b.op === 'r'
    ? `<div class="bl rep ${OF.pilha.includes(b) ? 'aberto' : ''}" style="margin-left:${nivel * 16}px">🔁 Repetir ${b.n}×</div>${progHtml(b.corpo, nivel + 1)}${OF.pilha.includes(b) ? `<div class="bl cursor" style="margin-left:${(nivel + 1) * 16}px">▸ blocos entram aqui</div>` : ''}<div class="bl fim" style="margin-left:${nivel * 16}px">fim do repetir</div>`
    : `<div class="bl" style="margin-left:${nivel * 16}px">${BLOCOS_OF[b.op][0]} ${BLOCOS_OF[b.op][1]}</div>`).join('');
  function janelaOficina() {
    const el = $('#oficina-conteudo'), N = NIVEIS_OF[OF.nivel], E = S.oficina, est = n => E[n] || 0;
    if (!OF.estado || OF.estado.n !== OF.nivel) { OF.estado = inicioOF(OF.nivel); OF.estado.n = OF.nivel; }
    el.innerHTML = `<div class="of-niveis">${NIVEIS_OF.map((_, i) => `<button type="button" class="of-n" data-of-n="${i}" aria-pressed="${i === OF.nivel}" ${i > 0 && !est(i - 1) ? 'disabled' : ''}>${i + 1}<small>${'⭐'.repeat(est(i)) || (i > 0 && !est(i - 1) ? '🔒' : '·')}</small></button>`).join('')}</div>
      <div class="of-area"><div><canvas id="of-cv" width="280" height="280" aria-label="Mapa do nível ${OF.nivel + 1}"></canvas>
        ${S.pet ? `<div class="btn-row"><button type="button" class="of-b" data-quem="robo" aria-pressed="${OF.quem === 'robo'}">🤖 Robô</button><button type="button" class="of-b" data-quem="pet" aria-pressed="${OF.quem === 'pet'}">${ESPECIES[S.pet.especie][0]} ${esc(S.pet.nome)}</button></div>` : ''}</div>
      <div class="of-lado"><p class="small"><b>Nível ${OF.nivel + 1}.</b> ${esc(N.dica)} <span class="muted">⭐⭐⭐ com até ${N.par} blocos.</span></p>
        <div class="of-paleta">${Object.entries(BLOCOS_OF).map(([k, [ic, n]]) => `<button type="button" class="of-b" data-bl="${k}" ${OF.rodando ? 'disabled' : ''}>${ic} ${n}</button>`).join('')}
          <span class="of-rep"><button type="button" class="of-b" data-bl="r" ${OF.rodando ? 'disabled' : ''}>🔁 Repetir</button><select id="of-vezes" aria-label="Quantas vezes">${[2, 3, 4, 5, 6].map(n => `<option>${n}</option>`).join('')}</select>×</span>
          ${OF.pilha.length ? `<button type="button" class="of-b" data-bl="fecha">✔ Fechar o repetir</button>` : ''}</div>
        <div class="of-prog" aria-live="polite">${OF.prog.length ? progHtml(OF.prog) : '<p class="muted small">Toque nos blocos para montar o programa.</p>'}</div>
        <p class="small">Blocos: <b>${contaBlocos(OF.prog)}</b></p>
        <div class="btn-row"><button type="button" class="hb verde" id="of-rodar" ${OF.rodando || !OF.prog.length ? 'disabled' : ''}>▶ Executar</button><button type="button" class="hb azul" id="of-desfaz" ${OF.rodando ? 'disabled' : ''}>⌫ Desfazer</button><button type="button" class="hb azul" id="of-limpa" ${OF.rodando ? 'disabled' : ''}>🗑 Limpar</button></div>
        <p class="of-msg" id="of-msg" role="status"></p></div></div>`;
    desenhaOF();
    el.querySelectorAll('[data-of-n]').forEach(b => b.addEventListener('click', () => { OF.nivel = +b.dataset.ofN; OF.prog = []; OF.pilha = []; OF.estado = null; janelaOficina(); }));
    el.querySelectorAll('[data-quem]').forEach(b => b.addEventListener('click', () => { OF.quem = b.dataset.quem; janelaOficina(); }));
    el.querySelectorAll('[data-bl]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.bl;
      if (k === 'fecha') OF.pilha.pop();
      else if (k === 'r') { const bl = { op: 'r', n: +$('#of-vezes').value, corpo: [] }; lista_OF().push(bl); OF.pilha.push(bl); }
      else if (contaBlocos(OF.prog) < 40) lista_OF().push({ op: k });
      OF.estado = null; janelaOficina();
    }));
    $('#of-desfaz').addEventListener('click', () => { const l = lista_OF(); if (l.length) l.pop(); else if (OF.pilha.length) { const bl = OF.pilha.pop(); const pai = lista_OF(); pai.splice(pai.indexOf(bl), 1); } OF.estado = null; janelaOficina(); });
    $('#of-limpa').addEventListener('click', () => { OF.prog = []; OF.pilha = []; OF.estado = null; janelaOficina(); });
    $('#of-rodar').addEventListener('click', rodaOF);
  }
  function rodaOF() {
    OF.pilha = []; OF.estado = inicioOF(OF.nivel); OF.estado.n = OF.nivel; OF.rodando = true; janelaOficina();
    const passos = passosOF(OF.prog), st = OF.estado, M = NIVEIS_OF[OF.nivel].mapa;
    let i = 0;
    const msg = t => { const m = $('#of-msg'); if (m) m.innerHTML = t; };
    const fim = t => { OF.rodando = false; janelaOficina(); msg(t); };
    const passo = () => {
      if (janelaAberta !== 'oficina') { OF.rodando = false; return; }
      if (i >= passos.length) {
        const venceu = st.g && st.x === st.g[0] && st.y === st.g[1] && st.pegou === st.total;
        if (!venceu) return fim(st.g && st.x === st.g[0] && st.y === st.g[1] ? `🍎 Faltou pegar ${st.total - st.pegou} maçã(s).` : '🤔 O programa acabou antes da bandeira. Ajuste e tente de novo!');
        const n = contaBlocos(OF.prog), par = NIVEIS_OF[OF.nivel].par, est = n <= par ? 3 : n <= par + 3 ? 2 : 1, antes = S.oficina[OF.nivel] || 0;
        if (!antes) { pontos(10, `🧩 Nível ${OF.nivel + 1} da oficina concluído!`); ganhaHabilidade(['PC'], 8); }
        else if (est > antes) pontos(5, `🧩 Mais estrelas no nível ${OF.nivel + 1}!`);
        S.oficina[OF.nivel] = Math.max(antes, est);
        if (NIVEIS_OF.every((_, k) => S.oficina[k]) && !S.medalhas.oficina) { S.medalhas.oficina = { ic: '🧩', nome: 'Programadora/programador da oficina' }; pontos(40, '🧩 Você terminou todos os níveis da oficina!'); setTimeout(() => ganhaFigurinha(null, 'pela oficina de código'), 1800); }
        salvar();
        return fim(`🎉 Conseguiu com ${n} bloco(s): ${'⭐'.repeat(est)}${est < 3 ? ` · Dá para fazer com ${par}?` : ''}`);
      }
      const op = passos[i++];
      if (op === 'e') st.dir = (st.dir + 3) % 4; else if (op === 'd') st.dir = (st.dir + 1) % 4;
      else if (op === 'p') { const k = st.x + ',' + st.y; if (st.macas.has(k)) { st.macas.delete(k); st.pegou++; } }
      else {
        const [dx, dy] = [[1, 0], [0, 1], [-1, 0], [0, -1]][st.dir], nx = st.x + dx, ny = st.y + dy;
        if (nx < 0 || ny < 0 || nx >= 7 || ny >= 7 || M[ny][nx] === '#') { st.bateu = true; desenhaOF(); return fim('💥 Bateu! Confira as viradas e os passos.'); }
        st.x = nx; st.y = ny;
      }
      desenhaOF(); setTimeout(passo, 280);
    };
    setTimeout(passo, 250);
  }
  /* ---------- banco: mesada diária (com uma conta de juros), poupança que rende 1% ao dia (juros compostos) e metas ---------- */
  const TAXA = 0.01;
  const mesadaHoje = () => 10 + 5 * Object.keys(S.concluidas).length;
  const anota = (ic, txt, v) => { S.banco.extrato.unshift({ ic, txt, v, d: diaHoje() }); S.banco.extrato.length = Math.min(S.banco.extrato.length, 12); };
  function rende() {
    const B = S.banco, hj = diaHoje();
    if (!B.dia) { B.dia = hj; return; }
    const n = Math.min(60, hj - B.dia); if (n <= 0) return;
    const antes = B.poup; B.poup = B.poup * Math.pow(1 + TAXA, n); B.dia = hj;
    const ganho = Math.floor(B.poup) - Math.floor(antes);
    if (ganho > 0) { anota('📈', `Rendimento de ${n} dia(s)`, ganho); aviso(`🏦 Sua poupança rendeu ${ganho} ⭐`); }
    salvar();
  }
  function metaInfo() {
    const m = S.banco.meta; if (!m) return null;
    const tem = S.pontos + Math.floor(S.banco.poup), falta = Math.max(0, m.preco - tem);
    let dias = 0, p = S.banco.poup, s2 = S.pontos;   // estimativa: guardando a mesada toda na poupança
    while (s2 + Math.floor(p) < m.preco && dias < 365) { dias++; p = (p + mesadaHoje()) * (1 + TAXA); }
    return { m, tem, falta, dias, pct: Math.min(100, Math.round(100 * tem / m.preco)) };
  }
  function janelaBanco() {
    rende();
    const B = S.banco, el = $('#banco-conteudo'), pegou = B.mesada === diaHoje(), mi = metaInfo(), poup = Math.floor(B.poup);
    const tab = [7, 30, 90].map(n => `<tr><td>${n} dias</td><td>${Math.floor(Math.max(poup, 100) * (1 + TAXA * n))}</td><td>${Math.floor(Math.max(poup, 100) * Math.pow(1 + TAXA, n))}</td></tr>`).join('');
    const todos = Object.keys(LOJAS).flatMap(l => produtos(l).filter(p => !temProduto(p)).map(p => Object.assign({ loja: l }, p)));
    el.innerHTML = `<div class="conta"><span>Saldo <b>${S.pontos} ⭐</b></span><span>Poupança <b>${poup} ⭐</b></span><span class="muted small">rende ${TAXA * 100}% ao dia</span></div>
      <div class="banco-grid">
        <div class="proj"><h3>💰 Mesada</h3><p class="small">Todo dia, ${mesadaHoje()} ⭐ (10 + 5 por fase concluída). Para receber, acerte uma conta de juros.</p>
          <button type="button" class="hb verde" id="bc-mesada" ${pegou ? 'disabled' : ''}>${pegou ? '✅ Já recebeu hoje' : 'Receber a mesada'}</button></div>
        <div class="proj"><h3>🐷 Poupança</h3><p class="small">O dinheiro guardado rende todo dia, e o rendimento também rende (juros compostos). Para gastar, saque para o saldo.</p>
          <div class="btn-row"><input id="bc-valor" class="campo" type="number" min="1" step="1" value="${Math.min(50, Math.max(1, S.pontos))}" aria-label="Valor" style="width:110px">
          <button type="button" class="hb azul" id="bc-dep" ${S.pontos > 0 ? '' : 'disabled'}>Guardar</button><button type="button" class="hb azul" id="bc-saq" ${poup > 0 ? '' : 'disabled'}>Sacar</button></div></div>
      </div>
      <div class="proj"><h3>🎯 Meta de compra</h3>${mi ? `<p class="small">${mi.m.ic} <b>${esc(mi.m.nome)}</b> (${LOJAS[mi.m.loja].ic} ${LOJAS[mi.m.loja].nome}) · ${mi.m.preco} ⭐ à vista</p>
        <div class="barra"><span style="width:${mi.pct}%"></span></div><p class="small">${mi.falta ? `Você tem ${mi.tem} ⭐ (saldo + poupança). Faltam ${mi.falta} ⭐: guardando a mesada na poupança, chega lá em uns <b>${mi.dias} dia(s)</b>.` : '🎉 Meta alcançada! Saque a poupança e vá à loja.'}</p>
        <button type="button" class="hb azul" id="bc-tira">Trocar a meta</button>` : `<p class="small">Escolha algo das lojas para juntar ⭐ até lá. O banco calcula quantos dias faltam.</p>
        <select id="bc-meta" class="campo" style="width:100%">${todos.map((p, i) => `<option value="${i}">${p.ic} ${esc(p.nome)} · ${Math.round(p.preco * 0.9)} ⭐ (${LOJAS[p.loja].nome})</option>`).join('')}</select>
        <div class="btn-row"><button type="button" class="hb verde" id="bc-poe">Definir meta</button></div>`}</div>
      <details class="proj"><summary><b>📊 Simples ou composto?</b></summary><p class="small">Com ${Math.max(poup, 100)} ⭐ guardadas a 1% ao dia:</p><table class="em-tab"><tr><th>Tempo</th><th>Juros simples</th><th>Juros compostos</th></tr>${tab}</table><p class="muted small">No composto, o rendimento de cada dia entra na conta do dia seguinte.</p></details>
      ${B.extrato.length ? `<h3>🧾 Extrato</h3><ul class="extrato">${B.extrato.map(e => `<li>${e.ic} ${esc(e.txt)} <b class="${e.v < 0 ? 'neg' : ''}">${e.v > 0 ? '+' : ''}${e.v} ⭐</b></li>`).join('')}</ul>` : ''}`;
    const valor = () => Math.max(0, Math.floor(+$('#bc-valor').value || 0));
    $('#bc-dep').addEventListener('click', () => { const v = Math.min(valor(), S.pontos); if (!v) return; S.pontos -= v; B.poup += v; anota('🐷', 'Guardou na poupança', v); hud(); salvar(); janelaBanco(); });
    $('#bc-saq').addEventListener('click', () => { const v = Math.min(valor(), Math.floor(B.poup)); if (!v) return; B.poup -= v; S.pontos += v; anota('💸', 'Sacou para o saldo', -v); hud(); salvar(); cobra(); janelaBanco(); });
    $('#bc-mesada').addEventListener('click', perguntaMesada);
    if ($('#bc-poe')) $('#bc-poe').addEventListener('click', () => { const p = todos[+$('#bc-meta').value]; if (p) { B.meta = { loja: p.loja, nome: p.nome, ic: p.ic, preco: Math.round(p.preco * 0.9) }; salvar(); janelaBanco(); } });
    if ($('#bc-tira')) $('#bc-tira').addEventListener('click', () => { B.meta = null; salvar(); janelaBanco(); });
  }
  /* a mesada vem com uma conta: rendimento de um dia, juros de dois dias ou porcentagem */
  function contaMesada() {
    const base = [100, 200, 300, 400, 500][Math.floor(Math.random() * 5)], tipo = Math.floor(Math.random() * 3);
    if (tipo === 0) return { enun: `Você tem <b>${base} ⭐</b> na poupança, que rende <b>1% ao dia</b>. Quanto ela rende hoje?`, certa: base / 100, erradas: [base / 10, 1, base / 50] };
    if (tipo === 1) { const um = base * 1.01, dois = Math.round(base * 1.0201 * 100) / 100; return { enun: `Com <b>${base} ⭐</b> rendendo <b>1% ao dia</b> em juros compostos, quanto você terá depois de 2 dias?`, certa: dois, erradas: [base * 1.02, um, base + 2] }; }
    const pct = [10, 20, 25, 50][Math.floor(Math.random() * 4)]; return { enun: `Quanto é <b>${pct}%</b> de <b>${base} ⭐</b>?`, certa: base * pct / 100, erradas: [pct, base / pct, base * pct / 10] };
  }
  function perguntaMesada() {
    if (S.banco.mesada === diaHoje()) return;
    fechaJanela();
    const q = contaMesada(), fmt = v => String(Math.round(v * 100) / 100).replace('.', ',');
    const alts = [q.certa]; for (const e of q.erradas) if (alts.length < 4 && !alts.some(a => Math.abs(a - e) < 1e-9)) alts.push(e);
    alts.sort(() => Math.random() - 0.5);
    dialogo('🏦', 'Banco da Praça', `<p>${q.enun}</p>`, alts.map(a => ({ txt: `${fmt(a)} ⭐`, fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = Math.abs(a - q.certa) < 1e-9;
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (Math.abs(alts[j] - q.certa) < 1e-9) b.classList.add('certa'); else if (alts[j] === a) b.classList.add('errada'); });
      if (certo) { S.banco.mesada = diaHoje(); S.pontos += mesadaHoje(); anota('💰', 'Mesada do dia', mesadaHoje()); hud(); salvar(); cobra(); }
      D.texto.innerHTML += `<p><strong>${certo ? `✅ Certo! A mesada de ${mesadaHoje()} ⭐ caiu no saldo.` : '❌ Não foi dessa vez. Tente outra conta!'}</strong></p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = certo ? 'Voltar ao banco' : 'Outra conta';
      b.addEventListener('click', () => { if (certo) { fechaDialogo(); abreJanela('banco'); } else perguntaMesada(); }); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  /* ---------- Casa do Enigma: um escape room sem cronômetro (código binário, Cifra de César e uma chave do inventário) ---------- */
  const EW = 7, ED = 6, ESAIDA = { x: 3.5, y: ED - 0.5 };
  const PALAVRAS = ['CHAVE', 'DADOS', 'PIXEL', 'REDES', 'TECLA', 'ROBOS', 'LOGICA', 'CODIGO'];
  const rEnigma = rng(SEMANA * 31 + 7);
  const CODIGO = [0, 0, 0].map(() => 1 + Math.floor(rEnigma() * 7));          // três números de 1 a 7: três linhas de 3 lâmpadas
  const PALAVRA = PALAVRAS[Math.floor(rEnigma() * PALAVRAS.length)];
  const cesar = (w, k) => w.replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0) - 65 + k + 26) % 26 + 65));
  const EOBJ = [
    { id: 'quadro', x: 0.8, y: 0, w: 1.4, d: 0.15, parede: true, acao: 'olhar o quadro' },
    { id: 'porta', x: 3, y: 0, w: 1, d: 0.15, parede: true, acao: 'abrir a porta dourada' },
    { id: 'cofre', x: 5, y: 0, w: 1, d: 1, acao: 'abrir o cofre' },
    { id: 'bau', x: 0, y: 3, w: 1, d: 1, acao: 'abrir o baú' },
    { id: 'tapete', x: 2, y: 2, w: 2, d: 2, chao: true, acao: 'olhar embaixo do tapete' },
    { id: 'pc', x: 6, y: 3, w: 1, d: 1, acao: 'digitar a senha' }
  ];
  const EST_E = () => { if (S.enigma.semana !== SEMANA) S.enigma = { semana: SEMANA, vitorias: S.enigma.vitorias || 0, premio: S.enigma.premio }; return S.enigma; };
  function livreEnigma(x, y) {
    const r = 0.22;
    if (x - r < 0.05 || y - r < 0.05 || x + r > EW - 0.05 || y + r > ED - 0.02) return false;
    for (const o of EOBJ) if (!o.chao && !o.parede && x + r > o.x && x - r < o.x + o.w && y + r > o.y && y - r < o.y + o.d) return false;
    return true;
  }
  function alvoEnigma() {
    let melhor = null, dm = 1.0;
    for (const o of EOBJ) {
      const qx = Math.max(o.x, Math.min(o.x + o.w, P.x)), qy = Math.max(o.y, Math.min(o.y + o.d, P.y)), d = Math.hypot(qx - P.x, qy - P.y) + (o.chao ? 0.25 : 0);
      if (d < dm) { dm = d; melhor = { tipo: 'eobj', obj: o }; }
    }
    if (Math.hypot(ESAIDA.x - P.x, ESAIDA.y - P.y) < Math.min(1.1, dm + 0.3)) melhor = { tipo: 'esaida' };
    return melhor;
  }
  function entraEnigma() {
    fechaJanela(); destino = null; noEnigma = true; EST_E();
    P.x = ESAIDA.x; P.y = ED - 1.3; P.dir = 'y-'; cam.ok = false; petPerto(); hud();
    dialogo('🔐', 'Casa do Enigma', `<p>A porta dourada desta casa está trancada. Para abri-la, descubra as pistas espalhadas pela sala: um quadro de lâmpadas, um cofre, um tapete, um computador e um baú.</p><p class="muted">Não tem cronômetro: pense com calma. Você pode sair pela porta de entrada quando quiser, e o que já descobriu fica guardado. Os códigos mudam toda segunda-feira.</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }]);
  }
  function saiEnigma() {
    const c = fases[1].enigma;
    if (atual.idx !== 1) trocaFase(1);
    noEnigma = false; destino = null; P.x = c.porta.x; P.y = c.porta.y + 0.4; P.dir = 'y+'; cam.ok = false; petPerto();
    for (const k in teclas) teclas[k] = false;
    hud();
  }
  function missoesEnigma() {
    const E = EST_E();
    return [['Descobrir o código do cofre', E.cofre], ['Ler a mensagem do tapete', E.leu], ['Descobrir a senha do computador', E.senha], ['Abrir o baú com uma chave 🔑', E.bau], ['Abrir a porta dourada', false]]
      .map(([nome, ok]) => ({ nome, n: ok ? 1 : 0, meta: 1, ok: !!ok }));
  }
  const lampadas = () => CODIGO.map(n => [4, 2, 1].map(b => (n & b ? '💡' : '⚫')).join(' ')).join('<br>');
  function tentaCampo(titulo, ic, html, certo, aoAcertar, aoErrar) {
    dialogo(ic, titulo, `${html}<p><input id="e-campo" class="campo" autocomplete="off" aria-label="Resposta"></p>`, [
      { txt: 'Tentar', classe: 'principal', fn: () => { const v = ($('#e-campo').value || '').trim().toUpperCase().normalize('NFD').replace(/[̀-ͯ\s]/g, ''); if (v === certo) aoAcertar(); else aoErrar(v); } },
      { txt: 'Fechar', fn: fechaDialogo }
    ]);
    const novaPerg = RASC.perg !== titulo + html; RASC.perg = titulo + html;
    rascunhoBotao(true, novaPerg);
    setTimeout(() => { const c = $('#e-campo'); if (c) c.focus(); }, 30);
  }
  function usaEnigma(o) {
    const E = EST_E(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (o.id === 'quadro') return dialogo('💡', 'Quadro de lâmpadas', `<p class="lampadas">${lampadas()}</p><p>Cada linha é um número escrito em <strong>binário</strong>: lâmpada acesa vale 1 e apagada vale 0. Da esquerda para a direita, as lâmpadas valem <strong>4, 2 e 1</strong>.</p><p class="muted">Exemplo: 💡 ⚫ 💡 = 4 + 0 + 1 = 5.</p>`, [fecha]);
    if (o.id === 'cofre') {
      if (E.cofre) return dialogo('🔓', 'Cofre', '<p>O cofre está aberto. Você já pegou a 🔦 lanterna que estava dentro.</p>', [fecha]);
      return tentaCampo('Cofre', '🔒', '<p>O cofre pede um código de <strong>3 algarismos</strong>. Será que tem alguma pista na parede?</p>', CODIGO.join(''),
        () => { E.cofre = true; E.lanterna = true; salvar(); hud(); pontos(10); dialogo('🔓', 'Cofre aberto!', '<p>Dentro do cofre tem uma <strong>🔦 lanterna</strong>. Talvez ela ajude a enxergar algum lugar escuro...</p>', [fecha]); },
        () => dialogo('🔒', 'Cofre', '<p>Não abriu. Confira o quadro de lâmpadas: cada linha vira um algarismo do código, de cima para baixo.</p>', [{ txt: 'Tentar de novo', classe: 'principal', fn: () => usaEnigma(o) }, fecha]));
    }
    if (o.id === 'tapete') {
      if (!E.lanterna) return dialogo('🟥', 'Tapete', '<p>Tem alguma coisa escrita no chão, embaixo do tapete, mas está escuro demais para ler. Se você tivesse uma lanterna...</p>', [fecha]);
      if (!E.leu) { E.leu = true; salvar(); hud(); }
      return dialogo('🔦', 'Embaixo do tapete', `<p>Com a lanterna, dá para ler:</p><p class="cifra">${cesar(PALAVRA, 3)}</p><p>É uma <strong>Cifra de César</strong> com chave 3: cada letra foi trocada pela que vem 3 posições depois no alfabeto. Para ler, volte 3 letras (D vira A, E vira B...).</p>`, [fecha]);
    }
    if (o.id === 'pc') {
      if (E.senha) return dialogo('💻', 'Computador', '<p>Na tela: <em>“A chave dourada está no baú. O baú abre com uma chave comum 🔑.”</em></p>', [fecha]);
      return tentaCampo('Computador', '💻', `<p>A tela pede uma <strong>senha de ${PALAVRA.length} letras</strong>.</p>${E.leu ? '' : '<p class="muted">Ainda não achou a senha? Ela está escondida em algum lugar da sala.</p>'}`, PALAVRA,
        () => { E.senha = true; salvar(); hud(); pontos(10); dialogo('💻', 'Senha certa!', '<p>Na tela aparece: <em>“A chave dourada está no baú. O baú abre com uma chave comum 🔑.”</em></p>', [fecha]); },
        () => dialogo('💻', 'Senha errada', '<p>Acesso negado. Lembre: na Cifra de César com chave 3, cada letra volta 3 posições. F vira C, K vira H...</p>', [{ txt: 'Tentar de novo', classe: 'principal', fn: () => usaEnigma(o) }, fecha]));
    }
    if (o.id === 'bau') {
      if (E.bau) return dialogo('🧰', 'Baú', '<p>O baú está aberto. Você já pegou a 🗝️ chave dourada.</p>', [fecha]);
      if (!(S.inv.chave > 0)) return dialogo('🧰', 'Baú trancado', '<p>O baú tem um cadeado comum. Você precisa de uma <strong>🔑 chave</strong> do seu inventário.</p><p class="muted">As chaves aparecem pelo chão da vila (tem uma pela Praça dos Números nesta semana?) e os amigos dão uma quando chegam a 8 corações.</p>', [fecha]);
      return dialogo('🧰', 'Baú trancado', `<p>O baú tem um cadeado comum. Usar uma 🔑 chave do seu inventário? Você tem ${S.inv.chave}.</p>`, [
        { txt: 'Usar a chave', classe: 'principal', fn: () => { S.inv.chave--; E.bau = true; E.dourada = true; salvar(); hud(); dialogo('🗝️', 'Baú aberto!', '<p>Dentro do baú está a <strong>🗝️ chave dourada</strong>!</p>', [fecha]); } }, fecha]);
    }
    if (o.id === 'porta') {
      const falta = [!E.dourada && 'a 🗝️ chave dourada', !E.senha && 'destravar o computador'].filter(Boolean);
      if (falta.length) return dialogo('🚪', 'Porta dourada', `<p>Trancada. Para abrir, falta: ${falta.join(' e ')}.</p>`, [fecha]);
      const primeira = E.premio !== SEMANA;
      E.premio = SEMANA; S.enigma = { semana: SEMANA, vitorias: (E.vitorias || 0) + 1, premio: SEMANA, fim: true };
      if (primeira) { S.inv.peca = (S.inv.peca || 0) + 1; pontos(80); } else pontos(10);
      salvar();
      return dialogo('🎉', 'Você escapou!', `<p>A porta dourada se abriu! ${primeira ? 'Prêmio: <strong>+80 ⭐ e uma 🧩 peça de quebra-cabeça</strong>.' : '+10 ⭐.'}</p><p class="muted">Você usou um <strong>código binário</strong>, uma <strong>cifra</strong> e uma <strong>chave do inventário</strong>. Os códigos mudam toda segunda-feira, volte para um enigma novo!</p>`, [{ txt: 'Sair da casa', classe: 'principal', fn: () => { fechaDialogo(); saiEnigma(); } }]);
    }
  }
  function desenhaEnigma() {
    const E = EST_E(), vw = W / zoom, vh = HH / zoom;
    ctx.fillStyle = '#2a2140'; ctx.fillRect(cam.x, cam.y, vw, vh);
    caixa(0, 0, -0.5, EW, ED, 0.5, '#5b3f8f', { blocos: false });
    for (let y = 0; y < ED; y++) for (let x = 0; x < EW; x++) { const [sx, sy] = iso(x, y); ctx.drawImage(textura((x + y) % 2 ? '#b9a3e8' : '#d6c8f5', (x * 5 + y) % 4), sx - TW / 2, sy); }
    caixa(-0.25, -0.25, 0, EW + 0.25, 0.25, 2.5, '#8f74c9', { blocos: false, topo: '#e9e0ff' });
    caixa(-0.25, 0, 0, 0.25, ED, 2.5, '#8f74c9', { blocos: false, dir: '#7d62b8', topo: '#e9e0ff' });
    naFace('y', 0, -0.25, EW, 0.25, 0, 0, EW, 0, 0.3, '#6a4fa6'); naFace('x', -0.25, 0, 0.25, ED, 0, 0, ED, 0, 0.3, '#5b3f8f');
    // quadro de lâmpadas
    naFace('y', 0, -0.25, EW, 0.25, 0.8, 0, 1.4, 0.8, 1.2, '#3b2f45');
    CODIGO.forEach((n, row) => [4, 2, 1].forEach((b, col) => naFace('y', 0, -0.25, EW, 0.25, 1.0 + col * 0.38, 0, 0.22, 1.7 - row * 0.36, 0.2, n & b ? '#ffd84a' : '#555060')));
    // porta dourada
    naFace('y', 0, -0.25, EW, 0.25, 2.9, 0, 1.2, 0, 1.9, '#fff3c4'); naFace('y', 0, -0.25, EW, 0.25, 3, 0, 1, 0, 1.8, '#e0b84a'); naFace('y', 0, -0.25, EW, 0.25, 3.75, 0, 0.1, 0.85, 0.12, '#7a5a10');
    // tapete (afastado quando já foi lido)
    const tx = E.lanterna ? 2.35 : 2; caixa(tx + 0.05, 2.05, 0, 1.9, 1.9, 0.04, '#d0506a', { blocos: false }); caixa(tx + 0.4, 2.4, 0.04, 1.2, 1.2, 0.01, '#ffd58a', { blocos: false, contorno: false });
    if (E.lanterna) { const [sx, sy] = iso(2.25, 3.2); ctx.font = '700 11px Lexend, sans-serif'; ctx.fillStyle = '#3b2f45'; ctx.textAlign = 'center'; ctx.fillText('???', sx, sy); }
    caixa(3.1, ED - 0.9, 0, 0.8, 0.8, 0.03, '#e0564a', { blocos: false });
    const lista = [
      { k: 5.5 + 0.5 + 0.5, d: () => { caixa(5.1, 0.1, 0, 0.8, 0.8, 0.95, '#7d8790'); naFace('y', 5.1, 0.1, 0.8, 0.8, 0.28, 0, 0.24, 0.38, 0.24, E.cofre ? '#2b2b2b' : '#e6e6e6'); } },
      { k: 0.5 + 3.5, d: () => { caixa(0.15, 3.2, 0, 0.7, 0.6, 0.45, '#7a5230'); caixa(0.12, 3.17, 0.45, 0.76, 0.66, 0.14, E.bau ? '#a0703f' : '#5a3b1a'); naFace('x', 0.15, 3.2, 0.7, 0.6, 0.22, 0, 0.16, 0.25, 0.2, '#ffd58a'); } },
      { k: 6.5 + 3.5, d: () => { caixa(6.1, 3.1, 0, 0.8, 0.8, 0.7, '#c08a52'); caixa(6.2, 3.3, 0.7, 0.15, 0.5, 0.45, '#333333'); naFace('x', 6.2, 3.3, 0.15, 0.5, 0.05, 0, 0.4, 0.76, 0.34, E.senha ? '#a8e6b8' : '#4bd36b'); } },
      { k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) }
    ];
    if (S.pet && !S.pet.dorme) lista.push({ k: PET.x + PET.y, d: () => desenhaPet(PET.x, PET.y, S.pet, PET) });
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    // penumbra: a sala é escura até achar a lanterna
    const [px, py] = iso(P.x, P.y, 0.6), raio = E.lanterna ? 340 : 200;
    const g = ctx.createRadialGradient(px, py, 40, px, py, raio); g.addColorStop(0, 'rgba(20,10,40,0)'); g.addColorStop(1, E.lanterna ? 'rgba(20,10,40,.35)' : 'rgba(20,10,40,.6)');
    ctx.fillStyle = g; ctx.fillRect(cam.x, cam.y, vw, vh);
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    const alvo = !dialogoAberto && alvoEnigma();
    if (alvo) { const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(alvo.tipo === 'esaida' ? 'E · sair da casa' : `E · ${alvo.obj.acao}`, sx, sy - 10, '#1d2a1f', '#ffffff'); }
    miniFase = null; $('#mini-nome').textContent = 'Casa do Enigma';
    mctx.fillStyle = '#1b2531'; mctx.fillRect(0, 0, 300, 200);
    const s = Math.min(280 / EW, 180 / ED), ox = (300 - EW * s) / 2, oy = (200 - ED * s) / 2;
    mctx.fillStyle = '#b9a3e8'; mctx.fillRect(ox, oy, EW * s, ED * s);
    mctx.fillStyle = '#5b3f8f'; for (const o of EOBJ) if (!o.chao) mctx.fillRect(ox + o.x * s, oy + o.y * s, o.w * s, Math.max(4, o.d * s));
    mctx.fillStyle = '#3f8fe0'; mctx.beginPath(); mctx.arc(ox + P.x * s, oy + P.y * s, 5, 0, Math.PI * 2); mctx.fill();
  }

  /* ---------- Sala da Matemática: o Escape da Matemática e o Labirinto, salas especiais no jeito da Casa do Enigma ---------- */
  const faseMat = () => fases.find(f => f.id === 'matematica');
  function livreObjs(Z, x, y) {
    const r = 0.22;
    if (x - r < 0.05 || y - r < 0.05 || x + r > Z.W - 0.05 || y + r > Z.D - 0.02) return false;
    for (const o of Z.objs()) if (!o.parede && x + r > o.x && x - r < o.x + o.w && y + r > o.y && y - r < o.y + o.d) return false;
    return true;
  }
  function alvoSala() {
    const Z = SALAS[sala]; let melhor = null, dm = 1.0;
    for (const o of Z.objs()) {
      if (o.semAcao) continue;
      const qx = Math.max(o.x, Math.min(o.x + o.w, P.x)), qy = Math.max(o.y, Math.min(o.y + o.d, P.y)), d = Math.hypot(qx - P.x, qy - P.y);
      if (d < dm) { dm = d; melhor = { tipo: 'sobj', obj: o }; }
    }
    if (Math.hypot(Z.saida.x - P.x, Z.saida.y - P.y) < Math.min(1.1, dm + 0.3)) melhor = { tipo: 'ssaida' };
    return melhor;
  }
  function entraSala(id) {
    const Z = SALAS[id];
    fechaJanela(); destino = null; sala = id; Z.estado();
    P.x = Z.saida.x; P.y = Z.D - 1.3; P.dir = 'y-'; cam.ok = false; hud();
    Z.boasVindas();
  }
  function saiSala() {
    if (!sala) return;
    const Z = SALAS[sala]; let l = Z.local();
    if (atual.idx !== l.f.idx) { trocaFase(l.f.idx); l = Z.local(); }
    sala = null; destino = null; P.x = l.x; P.y = l.y; P.dir = 'y+'; cam.ok = false; petPerto();
    for (const k in teclas) teclas[k] = false;
    hud();
  }
  /* desenho comum: piso, duas paredes ao fundo, o que a sala tiver, o jogador e o minimapa */
  function desenhaSala() {
    const Z = SALAS[sala], vw = W / zoom, vh = HH / zoom;
    ctx.fillStyle = Z.fundo; ctx.fillRect(cam.x, cam.y, vw, vh);
    caixa(0, 0, -0.5, Z.W, Z.D, 0.5, Z.base, { blocos: false });
    for (let y = 0; y < Z.D; y++) for (let x = 0; x < Z.W; x++) { const [sx, sy] = iso(x, y); ctx.drawImage(textura(Z.pisoEm ? Z.pisoEm(x, y) : (x + y) % 2 ? Z.piso[0] : Z.piso[1], (x * 5 + y) % 4), sx - TW / 2, sy); }
    if (!Z.aberto) {
      caixa(-0.25, -0.25, 0, Z.W + 0.25, 0.25, Z.alturaParede, Z.parede, { blocos: false, topo: '#fff7e8' });
      caixa(-0.25, 0, 0, 0.25, Z.D, Z.alturaParede, Z.parede, { blocos: false, dir: escuro(Z.parede, 0.08), topo: '#fff7e8' });
      caixa(Z.saida.x - 0.4, Z.D - 0.9, 0, 0.8, 0.8, 0.03, '#e0564a', { blocos: false });
    }
    const lista = Z.desenha();
    lista.push({ k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) });
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(80,60,90,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    const alvo = !dialogoAberto && alvoSala();
    if (alvo) { const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(alvo.tipo === 'ssaida' ? (Z.aberto ? 'E · voltar pelo portal' : 'E · sair') : `E · ${alvo.obj.acao}`, sx, sy - 10, '#1d2a1f', '#ffffff'); }
    miniFase = null; $('#mini-nome').textContent = Z.nome;
    mctx.fillStyle = '#1b2531'; mctx.fillRect(0, 0, 300, 200);
    const s = Math.min(280 / Z.W, 180 / Z.D), ox = (300 - Z.W * s) / 2, oy = (200 - Z.D * s) / 2;
    mctx.fillStyle = Z.piso[1]; mctx.fillRect(ox, oy, Z.W * s, Z.D * s);
    Z.mini(mctx, ox, oy, s);
    mctx.fillStyle = '#3f8fe0'; mctx.beginPath(); mctx.arc(ox + P.x * s, oy + P.y * s, 4, 0, Math.PI * 2); mctx.fill();
  }
  /* prêmio da semana: o primeiro final de cada semana vale mais */
  function premioSala(E, eixos) {
    const primeira = E.premio !== SEMANA;
    E.premio = SEMANA; E.fim = true; E.vitorias = (E.vitorias || 0) + 1; feitoMundo('sala');
    ganhaHabilidade(eixos, 20);
    if (primeira) { pontos(80); setTimeout(() => ganhaFigurinha(null, 'pela sala vencida'), 1600); } else pontos(10);
    SOM.toca('vitoria'); salvar(); hud();
    return primeira;
  }

  /* --- Escape da Matemática: 4 fases seguidas. Em cada uma, três desafios dão os algarismos do cofre e a porta pede mais uma conta.
     Sem cronômetro, muda toda segunda. */
  const EMAT = (() => {
    const sorteio = i => { const r = rng(SEMANA * 53 + 11 + i * 1000); return [(a, b) => a + Math.floor(r() * (b - a + 1)), l => l.map(v => [r(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1])]; };
    const fases = [];
    { // 1. Sala de aula: potência, equação, fração e porcentagem
      const [int] = sorteio(0);
      const A = int(2, 9), n = A >= 9 ? int(4, 5) : int(3, 5), m = n * n - A;
      const B = int(2, 9), k = int(2, 5), c = int(1, 9), t = k * B + c;
      const [p, q] = [[1, 2], [1, 4], [3, 4], [1, 8], [3, 8], [5, 8], [7, 8]][int(0, 6)], C = 8 - 8 * p / q;
      const [pct, preco] = [[10, 50], [20, 60], [25, 80], [50, 90], [30, 70], [40, 50]][int(0, 5)];
      fases.push({ nome: 'Sala de aula', ic: '🧮', parede: '#9fd1b0', piso: ['#cfe8d6', '#e3f3e8'], temas: ['potência', 'equação', 'fração', 'porcentagem'], lousa: `① = ${n}² − ${m}`,
        d: [
          { nome: 'Lousa', ic: '🧮', r: A, html: `<p>Na lousa está escrito:</p><p class="cifra">① = ${n}² − ${m}</p><p class="muted small">Lembre: ${n}² é ${n} × ${n}. Primeiro a potência, depois a subtração.</p>`, feito: `<p class="cifra">① = ${n}² − ${m} = ${A}</p>`, dica: `Calcule ${n} × ${n} e depois tire ${m}.` },
          { nome: 'Balança', ic: '⚖️', r: B, html: `<p>A balança está em equilíbrio. De um lado tem <b>${k} caixas iguais</b> e <b>${c} pesinhos de 1 kg</b>; do outro, <b>${t} kg</b>.</p><p class="cifra">${k}·x + ${c} = ${t}</p><p>Quanto pesa cada caixa? Esse é o algarismo ②.</p>`, feito: `<p class="cifra">${k}·x + ${c} = ${t} → x = ${B}</p>`, dica: `Tire ${c} dos dois lados e depois divida por ${k}.` },
          { nome: 'Pizza', ic: '🍕', r: C, html: `<p>A pizza tinha <b>8 fatias</b> iguais. A turma comeu <b>${p}/${q}</b> da pizza.</p><p>Quantas fatias sobraram? Esse é o algarismo ③.</p>`, feito: `<p>Sobraram <b>${C}</b> fatias.</p>`, dica: `${p}/${q} de 8 fatias é 8 ÷ ${q} × ${p}. Depois veja quanto falta para 8.` }
        ],
        porta: { r: preco - preco * pct / 100, html: `<p class="cifra">${preco} ⭐ com ${pct}% de desconto = ?</p>`, dica: `${pct}% de ${preco} é ${preco} × ${pct} ÷ 100. Depois tire esse valor de ${preco}.` } });
    }
    { // 2. Oficina de Geometria: área, ângulos de polígonos, perímetro e área do triângulo
      const [int] = sorteio(1);
      const L = int(2, 9), lados = int(3, 9), soma = (lados - 2) * 180, b2 = int(1, 9), a2 = int(2, 12), per = 2 * (a2 + b2), bt = 2 * int(2, 6), ht = int(3, 9);
      fases.push({ nome: 'Oficina de Geometria', ic: '📐', parede: '#f2c58a', piso: ['#f6e2c0', '#fbefd9'], temas: ['área', 'ângulos', 'perímetro', 'área do triângulo'], lousa: `① área ${L * L} cm²`,
        d: [
          { nome: 'Lousa', ic: '🟩', r: L, html: `<p>Na lousa tem um <b>quadrado</b> e está escrito:</p><p class="cifra">área = ${L * L} cm²</p><p>Quanto mede o lado do quadrado, em cm? Esse é o algarismo ①.</p>`, feito: `<p class="cifra">lado × lado = ${L * L} → lado = ${L} cm</p>`, dica: `Procure um número que, vezes ele mesmo, dá ${L * L}.` },
          { nome: 'Esquadro', ic: '📐', r: lados, html: `<p>Na mesa tem um polígono de papel. A etiqueta diz:</p><p class="cifra">soma dos ângulos internos = ${soma}°</p><p>Quantos lados ele tem? Esse é o algarismo ②.</p><p class="muted small">Um triângulo soma 180°; cada lado a mais acrescenta outros 180°.</p>`, feito: `<p class="cifra">${soma} ÷ 180 + 2 = ${lados} lados</p>`, dica: `Divida ${soma} por 180 e some 2.` },
          { nome: 'Tapete', ic: '🟫', r: b2, html: `<p>O tapete é um <b>retângulo</b> com perímetro de <b>${per} m</b>. Um dos lados mede <b>${a2} m</b>.</p><p>Quanto mede o outro lado? Esse é o algarismo ③.</p>`, feito: `<p class="cifra">${per} ÷ 2 − ${a2} = ${b2} m</p>`, dica: `Metade do perímetro (${per / 2}) é a soma de dois lados diferentes. Tire ${a2}.` }
        ],
        porta: { r: bt * ht / 2, html: `<p>O visor mostra um <b>triângulo</b> com base de ${bt} cm e altura de ${ht} cm.</p><p class="cifra">área do triângulo = ? cm²</p>`, dica: `Área do triângulo é base × altura ÷ 2: ${bt} × ${ht} ÷ 2.` } });
    }
    { // 3. Loja de Estatística: média, moda, mediana e proporção
      const [int, mistura] = sorteio(2);
      const md = int(3, 9), dm = int(1, Math.max(1, Math.min(md - 1, 10 - md))), notas = mistura([md - dm, md, md + dm]);
      const mo = int(1, 9), outros = mistura([1, 2, 3, 4, 5, 6, 7, 8, 9].filter(v => v !== mo)).slice(0, 4), listaMo = mistura([mo, mo, mo, ...outros]);
      const me = int(3, 7), baixo = mistura([...Array(me - 1)].map((_, i) => i + 1)).slice(0, 2), alto = mistura([...Array(6)].map((_, i) => me + 1 + i)).slice(0, 2), listaMe = mistura([me, ...baixo, ...alto]);
      const bolos = int(2, 3), ovos = int(2, 4), pedido = bolos * int(2, 4);
      fases.push({ nome: 'Loja de Estatística', ic: '📊', parede: '#e9b7c8', piso: ['#f6dbe4', '#fbecf1'], temas: ['média', 'moda', 'mediana', 'proporção'], lousa: `① notas ${notas.join(' · ')}`,
        d: [
          { nome: 'Lousa', ic: '📝', r: md, html: `<p>Na lousa estão as notas de um aluno em três provas:</p><p class="cifra">${notas.join(' · ')}</p><p>Qual é a <b>média</b> das notas? Esse é o algarismo ①.</p>`, feito: `<p class="cifra">(${notas.join(' + ')}) ÷ 3 = ${md}</p>`, dica: `Some as três notas e divida por 3.` },
          { nome: 'Cartaz', ic: '📊', r: mo, html: `<p>O cartaz mostra quantos picolés cada cliente comprou hoje:</p><p class="cifra">${listaMo.join(' · ')}</p><p>Qual é a <b>moda</b>? Esse é o algarismo ②.</p>`, feito: `<p>O ${mo} aparece mais vezes: a moda é <b>${mo}</b>.</p>`, dica: 'A moda é o valor que aparece mais vezes na lista.' },
          { nome: 'Caixa de preços', ic: '🏷️', r: me, html: `<p>Cinco produtos da loja custam (em ⭐):</p><p class="cifra">${listaMe.join(' · ')}</p><p>Qual é a <b>mediana</b> dos preços? Esse é o algarismo ③.</p>`, feito: `<p class="cifra">${[...listaMe].sort((x, y) => x - y).join(' · ')} → mediana ${me}</p>`, dica: 'Coloque os preços em ordem crescente: a mediana é o do meio.' }
        ],
        porta: { r: pedido * ovos, html: `<p>Na porta tem uma receita: <b>${bolos} bolos</b> usam <b>${bolos * ovos} ovos</b>.</p><p class="cifra">ovos para ${pedido} bolos = ?</p>`, dica: `Descubra quantos ovos vão em 1 bolo (${bolos * ovos} ÷ ${bolos}) e multiplique por ${pedido}.` } });
    }
    { // 4. Observatório dos Inteiros: números negativos, MDC e ordem das operações
      const [int] = sorteio(3);
      const fri = int(2, 8), T = int(1, 9), sobe = fri + T;
      const g = int(2, 9), [u, v] = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7], [5, 6]][int(0, 6)];
      const R = int(1, 9), y = int(2, 4), z = int(2, 5), w = int(1, 6) + Math.max(0, y * z - R), x = R + w - y * z;
      const pa = int(2, 6), pb = int(2, 6), pc = int(1, pa * pb - 1);
      fases.push({ nome: 'Observatório dos Inteiros', ic: '🔭', parede: '#c7b4f2', piso: ['#e2d8f8', '#efe9fb'], temas: ['números negativos', 'MDC', 'ordem das operações', 'regra de sinais'], lousa: `① −${fri} + ${sobe}`,
        d: [
          { nome: 'Lousa', ic: '🌡️', r: T, html: `<p>Na lousa: de madrugada o termômetro do observatório marcava <b>−${fri} °C</b>. Até o meio-dia, a temperatura subiu <b>${sobe} °C</b>.</p><p class="cifra">−${fri} + ${sobe} = ?</p><p>Quantos graus marcou ao meio-dia? Esse é o algarismo ①.</p>`, feito: `<p class="cifra">−${fri} + ${sobe} = ${T} °C</p>`, dica: `Para sair de −${fri} até 0 são ${fri} graus. O que sobrar de ${sobe} fica acima de zero.` },
          { nome: 'Cordões de luz', ic: '💡', r: g, html: `<p>Há dois cordões de luz, um de <b>${g * u} cm</b> e outro de <b>${g * v} cm</b>. Queremos cortar os dois em pedaços <b>iguais</b>, do <b>maior tamanho possível</b>, sem sobrar nada.</p><p>Quantos cm tem cada pedaço? Esse é o algarismo ②.</p>`, feito: `<p class="cifra">MDC(${g * u}, ${g * v}) = ${g}</p>`, dica: `Procure o maior número que divide ${g * u} e ${g * v} ao mesmo tempo (o MDC).` },
          { nome: 'Painel', ic: '🖥️', r: R, html: `<p>O painel do telescópio pede:</p><p class="cifra">${x} + ${y} × ${z} − ${w} = ?</p><p>Esse é o algarismo ③.</p>`, feito: `<p class="cifra">${x} + ${y * z} − ${w} = ${R}</p>`, dica: `Primeiro a multiplicação (${y} × ${z}), depois a adição e a subtração, da esquerda para a direita.` }
        ],
        porta: { r: pa * pb - pc, html: `<p class="cifra">(−${pa}) × (−${pb}) + (−${pc}) = ?</p><p class="muted small">Se der negativo, digite o sinal de menos (-) antes do número.</p>`, dica: `Menos vezes menos dá mais: (−${pa}) × (−${pb}) = ${pa * pb}. Depois some −${pc}.` } });
    }
    return fases;
  })();
  const EMOBJ = [
    { id: 'lousa', x: 0.6, y: 0, w: 2, d: 0.15, parede: true, i: 0 },
    { id: 'porta', x: 3.5, y: 0, w: 1, d: 0.15, parede: true, acao: 'abrir a porta de saída' },
    { id: 'cofre', x: 5.6, y: 0.1, w: 1, d: 1, acao: 'abrir o cofre' },
    { id: 'mesa2', x: 6.6, y: 2.6, w: 1, d: 1, i: 1 },
    { id: 'mesa3', x: 0.2, y: 2.8, w: 1, d: 1, i: 2 }
  ];
  const NUM_EM = ['①', '②', '③'];
  const EST_EM = () => {
    const E = S.emat || (S.emat = {});
    if (E.semana !== SEMANA) S.emat = { semana: SEMANA, fase: 0, vitorias: E.vitorias || 0, premio: E.premio };
    else if (E.fase === undefined) { E.fase = 0; if (E.fim) { E.fim = false; E.fase = 1; ['a', 'b', 'c', 'cofre'].forEach(k => delete E[k]); } }   // quem já tinha escapado antes das 4 fases segue para a fase 2
    return S.emat;
  };
  const faseEM = () => EMAT[Math.min(EST_EM().fase, EMAT.length - 1)];
  const objsEM = () => { const F = faseEM(); return EMOBJ.map(o => o.i === undefined ? o : Object.assign({}, o, { acao: `${o.i ? 'olhar' : 'ler'} ${o.i ? F.d[o.i].nome.toLowerCase() : 'a lousa'} ${NUM_EM[o.i]}` })); };
  function campoNumero(titulo, ic, html, certo, aoAcertar, dica, volta) {
    const fecha = { txt: 'Fechar', fn: fechaDialogo };
    tentaCampo(titulo, ic, html, String(certo), aoAcertar, () => dialogo(ic, titulo, `<p>Ainda não. ${dica}</p>`, [{ txt: 'Tentar de novo', classe: 'principal', fn: volta }, fecha]));
  }
  function usaEmat(o) {
    const E = EST_EM(), F = faseEM(), nf = E.fase + 1, fecha = { txt: 'Fechar', fn: fechaDialogo }, volta = () => usaEmat(o), chaves = ['a', 'b', 'c'];
    if (o.i !== undefined) {
      const d = F.d[o.i], ch = chaves[o.i], titulo = `${d.nome} ${NUM_EM[o.i]}`;
      if (E[ch]) return dialogo(d.ic, titulo, `${d.feito}<p>Você já resolveu esta.</p>`, [fecha]);
      return campoNumero(titulo, d.ic, d.html, d.r, () => { E[ch] = true; ganhaHabilidade(['NU', 'AL'], 10); pontos(10); salvar(); hud(); dialogo(d.ic, 'Certo!', `<p>O algarismo ${NUM_EM[o.i]} do cofre é <b>${d.r}</b>. Ele fica anotado no painel de missões.</p>`, [fecha]); }, d.dica, volta);
    }
    if (o.id === 'cofre') {
      if (E.cofre) return dialogo('🔓', 'Cofre', '<p>O cofre está aberto. Você já pegou a 🗝️ chave da porta.</p>', [fecha]);
      const falta = chaves.filter(k => !E[k]).length;
      return campoNumero('Cofre', '🔒', `<p>O cofre pede um código de <b>3 algarismos</b>, na ordem ① ② ③.</p>${falta ? `<p class="muted small">Ainda falta descobrir ${falta} algarismo(s): veja ${F.d.map(d => d.nome.toLowerCase()).join(', ').replace(/, ([^,]*)$/, ' e $1')}.</p>` : ''}`, F.d.map(d => d.r).join(''),
        () => { E.cofre = true; salvar(); hud(); pontos(10); dialogo('🔓', 'Cofre aberto!', '<p>Dentro do cofre tem uma <b>🗝️ chave</b> com uma etiqueta: <em>“A porta também tem uma conta.”</em></p>', [fecha]); },
        'Confira os três algarismos no painel de missões e digite na ordem ① ② ③.', volta);
    }
    if (o.id === 'porta') {
      if (E.fim) return dialogo('🎉', 'Porta de saída', '<p>Você já escapou das 4 fases desta semana! Os desafios mudam na segunda-feira.</p>', [{ txt: 'Sair da sala', classe: 'principal', fn: () => { fechaDialogo(); saiSala(); } }, fecha]);
      if (!E.cofre) return dialogo('🚪', 'Porta de saída', '<p>Trancada. A chave está no cofre.</p>', [fecha]);
      return campoNumero('Porta de saída', '🚪', `<p>Você girou a chave, e o visor da porta pergunta:</p>${F.porta.html}<p class="muted small">Digite só o número.</p>`, F.porta.r,
        () => {
          if (nf < EMAT.length) {
            E.fase = nf; chaves.concat('cofre').forEach(k => delete E[k]); ganhaHabilidade(['NU', 'AL'], 10); pontos(20); SOM.toca('portao'); salvar(); hud();
            P.x = SALAS.emat.saida.x; P.y = SALAS.emat.D - 1.3; P.dir = 'y-';
            const N = EMAT[nf];
            return dialogo(N.ic, `Fase ${nf + 1} de ${EMAT.length}: ${N.nome}`, `<p>A porta se abriu… para outra sala! +20 ⭐.</p><p>Você passou pela fase <b>${F.nome}</b> (${F.temas.join(', ')}). Agora os desafios são de <b>${N.temas.join(', ')}</b>.</p><p class="muted">O que você resolve fica guardado. Pode sair e voltar depois.</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }]);
          }
          const primeira = premioSala(E, ['NU', 'AL']);
          dialogo('🎉', 'Você escapou!', `<p>Você passou pelas <b>${EMAT.length} fases</b> e a última porta se abriu! ${primeira ? 'Prêmio: <b>+80 ⭐ e uma figurinha</b>.' : '+10 ⭐.'}</p><p class="muted">Você usou ${EMAT.map(f => f.temas.join(', ')).join('; ')}. Os desafios mudam toda segunda-feira.</p>`, [{ txt: 'Sair da sala', classe: 'principal', fn: () => { fechaDialogo(); saiSala(); } }, fecha]);
        }, F.porta.dica, volta);
    }
  }
  function desenhaEmat() {
    const E = EST_EM(), F = faseEM();
    naFace('y', 0, -0.25, 8, 0.25, 0.6, 0, 2, 0.8, 1.2, '#2f4a3a');   // lousa
    const [lx, ly] = iso(1.6, -0.2, 1.45); ctx.font = '700 12px Lexend, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#fff'; ctx.fillText(F.lousa, lx, ly);
    naFace('y', 0, -0.25, 8, 0.25, 3.4, 0, 1.2, 0, 1.9, '#fff3c4'); naFace('y', 0, -0.25, 8, 0.25, 3.5, 0, 1, 0, 1.8, E.fim ? '#a8e6b8' : '#4f9a6b'); naFace('y', 0, -0.25, 8, 0.25, 4.25, 0, 0.1, 0.85, 0.12, '#ffd58a');
    const mesa = (x, y, i) => { caixa(x + 0.1, y + 0.1, 0, 0.8, 0.8, 0.6, '#a0703f'); const [sx, sy] = iso(x + 0.5, y + 0.5, 1.0 + Math.sin(agora / 500 + i) * 0.05); ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(E['abc'[i]] ? '✅' : F.d[i].ic, sx, sy); };
    const primeira = E.fase === 0;
    return [
      { k: 6.1 + 0.6 + 1, d: () => { caixa(5.7, 0.2, 0, 0.8, 0.8, 0.95, '#7d8790'); naFace('y', 5.7, 0.2, 0.8, 0.8, 0.28, 0, 0.24, 0.38, 0.24, E.cofre ? '#2b2b2b' : '#e6e6e6'); } },
      { k: 7.1 + 3.1 + 1, d: () => { if (!primeira) return mesa(6.6, 2.6, 1); caixa(6.75, 2.75, 0, 0.7, 0.7, 0.5, '#c08a52'); caixa(7.05, 3.05, 0.5, 0.1, 0.1, 0.5, '#9aa3ad', { blocos: false }); caixa(6.7, 3.05, 1.0, 0.8, 0.1, 0.06, '#9aa3ad', { blocos: false }); caixa(6.72, 2.95, 0.7, 0.26, 0.3, 0.2, '#f6b73c'); caixa(7.22, 2.95, 0.7, 0.26, 0.3, 0.12, '#e0564a'); } },
      { k: 0.7 + 3.3 + 1, d: () => { if (!primeira) return mesa(0.2, 2.8, 2); caixa(0.3, 2.9, 0, 0.8, 0.8, 0.6, '#a0703f'); caixa(0.35, 2.95, 0.6, 0.7, 0.7, 0.06, '#f6b73c', { blocos: false }); caixa(0.45, 3.05, 0.66, 0.5, 0.5, 0.03, '#e0564a', { blocos: false, contorno: false }); } }
    ];
  }

  /* --- Labirinto: uma cerca viva sorteada toda semana; três portões no caminho só abrem com uma pergunta certa */
  const LAB = (() => {
    const N = 6, T2 = 2 * N + 1, r = rng(SEMANA * 97 + 5), parede = Array.from({ length: T2 }, () => Array(T2).fill(1));
    const visto = new Set(), pilha = [[0, 0]]; visto.add('0,0'); parede[1][1] = 0;
    while (pilha.length) {
      const [cx, cy] = pilha[pilha.length - 1];
      const viz = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => [cx + dx, cy + dy]).filter(([x, y]) => x >= 0 && y >= 0 && x < N && y < N && !visto.has(x + ',' + y));
      if (!viz.length) { pilha.pop(); continue; }
      const [nx, ny] = viz[Math.floor(r() * viz.length)];
      parede[cy + ny + 1][cx + nx + 1] = 0; parede[2 * ny + 1][2 * nx + 1] = 0; visto.add(nx + ',' + ny); pilha.push([nx, ny]);
    }
    parede[T2 - 1][1] = 0;                                              // entrada, embaixo à esquerda
    const ini = [1, T2 - 1], fim = [T2 - 2, 1], de = new Map([[ini.join(), null]]), fila = [ini];
    while (fila.length) {
      const [x, y] = fila.shift(); if (x === fim[0] && y === fim[1]) break;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < T2 && ny < T2 && !parede[ny][nx] && !de.has(nx + ',' + ny)) { de.set(nx + ',' + ny, [x, y]); fila.push([nx, ny]); } }
    }
    const cam2 = []; for (let c = fim; c; c = de.get(c.join())) cam2.unshift(c);
    const ligacoes = cam2.filter(([x, y], i) => i > 1 && (x % 2 === 0 || y % 2 === 0));   // portões só nas passagens entre as células
    const portoes = [0.2, 0.5, 0.8].map(f => ligacoes[Math.min(ligacoes.length - 1, Math.floor(f * ligacoes.length))]).filter((v, i, a) => a.indexOf(v) === i);
    return { T: T2, parede, portoes, fim, caminho: cam2.length };
  })();
  const EST_LAB = () => { const E = S.labirinto || (S.labirinto = {}); if (E.semana !== SEMANA) S.labirinto = { semana: SEMANA, abertos: {}, vitorias: E.vitorias || 0, premio: E.premio }; return S.labirinto; };
  const objsLab = () => {
    const E = EST_LAB(), out = LAB.portoes.map(([x, y], i) => E.abertos[i] ? null : { id: 'portao', i, x, y, w: 1, d: 1, acao: `abrir o portão ${i + 1}` }).filter(Boolean);
    out.push({ id: 'trofeu', x: LAB.fim[0] + 0.15, y: LAB.fim[1] + 0.15, w: 0.7, d: 0.7, acao: E.fim ? 'ver o troféu' : 'pegar o troféu' });
    return out;
  };
  function livreLab(x, y) {
    if (!livreObjs(SALAS.labirinto, x, y)) return false;
    const r = 0.22;
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) { const tx = Math.floor(x + dx), ty = Math.floor(y + dy); if (ty >= 0 && ty < LAB.T && tx >= 0 && tx < LAB.T && LAB.parede[ty][tx]) return false; }
    return true;
  }
  function usaLab(o) {
    const E = EST_LAB(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (o.id === 'portao') {
      return dialogo('🔒', `Portão ${o.i + 1}`, `<p>O portão tem um cadeado de números. Para abrir, acerte uma pergunta de Matemática.</p><p class="muted small">Errou? Sem problema: tente outra pergunta.</p>`, [
        { txt: 'Pode perguntar!', classe: 'principal', fn: () => pergunta(`Portão ${o.i + 1}`, '🔒', sorteiaPergunta(faseMat()), certo => {
          if (!certo) return;
          E.abertos[o.i] = true; SOM.toca('portao'); salvar(); hud();
          D.texto.innerHTML += `<p>🔓 <b>O portão ${o.i + 1} abriu!</b></p>`;
        }) }, fecha]);
    }
    if (o.id === 'trofeu') {
      if (E.fim) return dialogo('🏆', 'Troféu', '<p>Você já chegou ao centro do labirinto nesta semana. Na segunda-feira ele muda!</p>', [fecha]);
      const primeira = premioSala(E, ['NU', 'GE']);
      return dialogo('🏆', 'Você chegou!', `<p>Você atravessou o labirinto e abriu os ${LAB.portoes.length} portões! ${primeira ? 'Prêmio: <b>+80 ⭐ e uma figurinha</b>.' : '+10 ⭐.'}</p><p class="muted">O labirinto muda toda segunda-feira.</p>`, [{ txt: 'Sair do labirinto', classe: 'principal', fn: () => { fechaDialogo(); saiSala(); } }, fecha]);
    }
  }
  function desenhaLab() {
    const E = EST_LAB(), lista = [];
    for (let y = 0; y < LAB.T; y++) for (let x = 0; x < LAB.T; x++) if (LAB.parede[y][x] && naTelaSala(x, y)) lista.push({ k: x + y + 1, d: () => caixa(x + 0.04, y + 0.04, 0, 0.92, 0.92, 0.75, (x * 3 + y) % 4 ? '#5aa85a' : '#4f9a4b') });
    LAB.portoes.forEach(([x, y], i) => { if (!E.abertos[i]) lista.push({ k: x + y + 1, d: () => { caixa(x + 0.1, y + 0.1, 0, 0.8, 0.8, 0.9, '#c08a52'); const [sx, sy] = iso(x + 0.5, y + 0.5, 1.3); ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🔒', sx, sy); } }); });
    const [fx, fy] = LAB.fim;
    lista.push({ k: fx + fy + 1, d: () => { caixa(fx + 0.2, fy + 0.2, 0, 0.6, 0.6, 0.4, '#f6b73c'); const [sx, sy] = iso(fx + 0.5, fy + 0.5, 0.9 + Math.sin(agora / 400) * 0.08); ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🏆', sx, sy); } });
    return lista;
  }
  const naTelaSala = (x, y) => { const [sx, sy] = iso(x, y); return sx > cam.x - 80 && sx < cam.x + W / zoom + 80 && sy > cam.y - 120 && sy < cam.y + HH / zoom + 80; };

  const localSala = (id, f = faseMat()) => { const c = (f.salas || []).find(c => c.id === id); return c ? { f, x: c.porta.x, y: c.porta.y + 0.4 } : { f, x: 0, y: 0 }; };   // fase ainda não montada: saiSala monta e pergunta de novo
  /* --- Teletransporte: o resultado do teste de proficiência em informática (guardado neste navegador) escolhe o mundo especial do nível */
  const TP = window.TELEPORTE || { niveis: {}, areas: {}, perguntas: {} };
  const ORDEM_NIVEIS = ['iniciante', 'basico', 'intermediario', 'avancado'];
  const EIXO_AREA = { computador: ['MD'], arquivos: ['MD'], internet: ['MD', 'CD'], seguranca: ['CD'], aplicativos: ['CD'], logica: ['PC'] };
  const resultadoTeste = () => { try { const r = JSON.parse(localStorage.getItem('teste-informatica-ultimo')); return r && TP.niveis[r.nivel] ? r : null; } catch (e) { return null; } };
  let teleNivel = 'iniciante';
  const EST_TELE = () => { const T = S.tele || (S.tele = { feitos: {}, premios: {} }); return T; };
  const perguntasTele = (nv, area) => (TP.perguntas[nv] && TP.perguntas[nv][area] || []).map(([enun, alts, certa, coment], i) => ({ id: `t:${nv}:${area}:${i}`, enun, alts, certa, coment, eixos: EIXO_AREA[area] }));
  const feitasTele = (nv, area) => perguntasTele(nv, area).filter(p => S.resp[p.id] === true).length;
  /* cada nível é outro mundo, com chão, árvores, prédios e céu próprios (não é uma sala com paredes) */
  const TEMAS_TELE = {
    iniciante: { nome: 'Ilha dos Primeiros Cliques', chao: ['#c3e9a2', '#b6e094'], caminho: '#f3e3b0', fundo: '#6cc6e0', arvore: 'coqueiro', predio: ['#fbe7c0', '#d9a35a'], deco: ['🌺', '🐚', '🦀'] },
    basico: { nome: 'Floresta das Pastas', chao: ['#93c97c', '#86bd70'], caminho: '#d8b98a', fundo: '#24452f', arvore: 'pinheiro', predio: ['#c99a6b', '#7a4a2a'], deco: ['🍄', '🪵', '🦔'] },
    intermediario: { nome: 'Deserto da Conexão', chao: ['#f1dca3', '#e9d193'], caminho: '#d9b47a', fundo: '#f2a65e', arvore: 'cacto', predio: ['#e9bf90', '#c97d4a'], deco: ['🪨', '🦎', '🌵'] },
    avancado: { nome: 'Cidade de Cristal', chao: ['#eef3fa', '#e1eaf4'], caminho: '#c6cff0', fundo: '#1c2342', arvore: 'cristal', predio: ['#d6dcff', '#7b6cd6'], deco: ['❄️', '💠', '⛄'] }
  };
  const temaTele = () => TEMAS_TELE[teleNivel] || TEMAS_TELE.iniciante;
  const TW_TELE = 20, TD_TELE = 14;
  const ESTACOES_TELE = Object.keys(TP.areas).map((area, i) => ({ id: 'estacao', area, x: [2, 9, 16, 2, 16, 5][i], y: [1, 0.6, 1, 7.5, 7.5, 10][i], w: 2, d: 2, acao: `estação ${TP.areas[area].nome}` }));
  // caminhos: do portal de volta (embaixo) até a rua do meio, e de lá até a porta de cada estação
  const caminhoTele = (() => { const c = new Set(), m = (x, y) => c.add(x + ',' + y);
    for (let y = 4; y < TD_TELE; y++) { m(9, y); m(10, y); }
    for (let x = 2; x < 18; x++) { m(x, 4); m(x, 5); }
    for (const o of ESTACOES_TELE) { const px = Math.floor(o.x + 1); for (let y = Math.floor(o.y + 2); y <= (o.y + 2 < 4 ? 4 : o.y + 2); y++) m(px, y); if (o.y > 5) for (let y = 6; y <= o.y + 2.5 && y < TD_TELE; y++) m(px, y); if (o.y > 5) for (let x = Math.min(px, 9); x <= Math.max(px, 10); x++) { m(x, Math.min(TD_TELE - 1, Math.floor(o.y + 2))); } }
    return c; })();
  const naoTemCoisa = (x, y, m) => !ESTACOES_TELE.some(o => x > o.x - m && x < o.x + o.w + m && y > o.y - m && y < o.y + o.d + m + 0.6) && !caminhoTele.has(Math.floor(x) + ',' + Math.floor(y)) && Math.hypot(x - 10, y - (TD_TELE - 1)) > 2.2;
  const ENFEITES_TELE = {};
  function enfeitesTele(nv) {
    if (ENFEITES_TELE[nv]) return ENFEITES_TELE[nv];
    const r = rng(777 + ORDEM_NIVEIS.indexOf(nv) * 91), arv = [], deco = [];
    for (let t = 0; t < 400 && arv.length < 26; t++) { const x = 0.6 + r() * (TW_TELE - 1.6), y = 0.4 + r() * (TD_TELE - 1.4); if (naoTemCoisa(x, y, 0.8) && arv.every(a => Math.hypot(a.x - x, a.y - y) > 1.4)) arv.push({ id: 'arvore', x, y, w: 0.55, d: 0.55, semAcao: true, v: r() }); }
    for (let t = 0; t < 300 && deco.length < 14; t++) { const x = 0.5 + r() * (TW_TELE - 1), y = 0.5 + r() * (TD_TELE - 1); if (naoTemCoisa(x, y, 0.4) && arv.every(a => Math.hypot(a.x - x, a.y - y) > 0.9)) deco.push({ id: 'deco', x, y, w: 0.3, d: 0.3, semAcao: true, parede: true, ic: Math.floor(r() * 3) }); }
    return (ENFEITES_TELE[nv] = { arv, deco });
  }
  const objsTele = () => { const E = enfeitesTele(teleNivel); return ESTACOES_TELE.concat(E.arv, E.deco); };
  function portalTele() {
    const r = resultadoTeste(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (!r) return dialogo('🌀', 'Portal de teletransporte', '<p>Este portal leva você a um <b>mundo especial do seu nível em informática</b>, só com as habilidades que você precisa treinar.</p><p>Para descobrir o seu nível, faça antes o <b>teste de proficiência em informática</b> (24 perguntas, neste mesmo navegador). Depois volte aqui!</p>',
      [{ txt: '📝 Fazer o teste', classe: 'principal', href: '../teste-proficiencia-informatica/' }, fecha]);
    const meu = ORDEM_NIVEIS.indexOf(r.nivel), N = TP.niveis[r.nivel];
    const fracas = (r.estudar || []).filter(k => TP.areas[k]).map(k => `${TP.areas[k].ic} ${TP.areas[k].nome}`);
    dialogo('🌀', 'Portal de teletransporte', `<p>No teste${r.data ? ` de ${r.data.split('-').reverse().join('/')}` : ''}, você ficou no nível <b>${N.ic} ${N.nome}</b>, com ${r.nota} de 24 acertos.</p>${fracas.length ? `<p>No mundo do seu nível, comece por: <b>${fracas.join('</b> e <b>')}</b>.</p>` : ''}<p class="muted small">Refez o teste e subiu de nível? O portal leva você ao mundo novo. Também dá para revisar os níveis anteriores.</p>`,
      ORDEM_NIVEIS.slice(0, meu + 1).reverse().map((nv, i) => ({ txt: `${TP.niveis[nv].ic} Mundo ${TP.niveis[nv].nome}${i ? ' (revisão)' : ''}`, classe: i ? '' : 'principal', fn: () => { fechaDialogo(); entraTele(nv); } }))
        .concat([{ txt: '📝 Refazer o teste', href: '../teste-proficiencia-informatica/' }, fecha]));
  }
  function entraTele(nv) {
    teleNivel = nv;
    if (dentro) saiCasa(); if (noEnigma) saiEnigma(); if (sala) saiSala();
    if (atual.idx !== 0) trocaFase(0);
    SOM.toca('portao'); entraSala('tele');
  }
  function usaTele(o) {
    const nv = teleNivel, A = TP.areas[o.area], ps = perguntasTele(nv, o.area), feitas = feitasTele(nv, o.area), r = resultadoTeste(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    const fraca = r && r.nivel === nv && (r.estudar || []).includes(o.area);
    const prox = ps.find(p => S.resp[p.id] !== true && !bloqueada(p.id)), esperando = !prox && ps.some(p => S.resp[p.id] !== true);
    dialogo(A.ic, A.nome, `<p>${fraca ? '⭐ <b>Comece por aqui:</b> foi uma das áreas com menos acertos no seu teste. ' : ''}Nível ${TP.niveis[nv].ic} ${TP.niveis[nv].nome}: <b>${feitas} de ${ps.length}</b> perguntas certas.</p>${prox ? '' : esperando ? '<p>⏳ A pergunta que falta foi a que você errou agora há pouco. Responda uma pergunta de outra estação e volte para tentar de novo.</p>' : '<p>✅ Você completou esta estação!</p>'}<p class="muted small">Os materiais abrem em outra aba.</p>`,
      (prox ? [{ txt: 'Responder uma pergunta', classe: 'principal', fn: () => pergunta(A.nome, A.ic, embaralhaTele(prox), certo => { if (certo) confereTele(); }) }] : [])
        .concat(A.links.map(([href, nome]) => ({ txt: `📖 ${nome}`, href: '..' + href })), [fecha]));
  }
  const embaralhaTele = p => { const ordem = p.alts.map((_, i) => i).sort(() => Math.random() - 0.5); return Object.assign({}, p, { alts: ordem.map(i => p.alts[i]), certa: ordem.indexOf(p.certa) }); };
  function confereTele() {
    const nv = teleNivel, T = EST_TELE();
    if (T.premios[nv] || !Object.keys(TP.areas).every(a => feitasTele(nv, a) >= perguntasTele(nv, a).length)) return;
    T.premios[nv] = true; pontos(100); SOM.toca('vitoria'); salvar();
    setTimeout(() => { ganhaFigurinha(null, `pelo mundo ${TP.niveis[nv].nome}`); D.texto.innerHTML += `<p>🌀 <b>Você completou o mundo ${TP.niveis[nv].nome}!</b> +100 ⭐. Refaça o teste de proficiência para ver se subiu de nível.</p>`; }, 200);
  }
  function arvoreTele(a) {
    const x = a.x + a.w / 2, y = a.y + a.d / 2, tipo = temaTele().arvore, h = 1 + a.v * 0.6;
    sombra(x, y, 0.7);
    if (tipo === 'coqueiro') {
      for (let k = 0; k < 4; k++) caixa(x - 0.1 + Math.sin(k * 0.6) * 0.06 * k, y - 0.1, k * h * 0.45, 0.2, 0.2, h * 0.45, '#9a6b3f', { blocos: false });
      const [sx, sy] = iso(x + 0.15, y, h * 1.8 + 0.1);
      ctx.fillStyle = '#3fa34d'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.ellipse(sx + Math.cos(k * 1.05) * 12, sy + Math.sin(k * 1.05) * 5 + 3, 15, 5, k * 1.05, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.arc(sx - 3, sy + 4, 3, 0, 7); ctx.arc(sx + 3, sy + 5, 3, 0, 7); ctx.fill();
    } else if (tipo === 'pinheiro') {
      caixa(x - 0.1, y - 0.1, 0, 0.2, 0.2, 0.5, '#6b4628', { blocos: false });
      [[0.9, 0.5], [0.7, 0.95], [0.5, 1.35], [0.28, 1.7]].forEach(([l, z]) => caixa(x - l / 2, y - l / 2, z * h, l, l, 0.42 * h, a.v > 0.5 ? '#2f7d45' : '#367f3e', { blocos: false }));
    } else if (tipo === 'cacto') {
      caixa(x - 0.17, y - 0.17, 0, 0.34, 0.34, 1.5 * h, '#4f9a4b', { blocos: false });
      caixa(x + 0.17, y - 0.08, 0.6 * h, 0.3, 0.16, 0.16, '#4f9a4b', { blocos: false }); caixa(x + 0.33, y - 0.08, 0.6 * h, 0.16, 0.16, 0.55, '#4f9a4b', { blocos: false });
      if (a.v > 0.4) { caixa(x - 0.47, y - 0.08, 0.85 * h, 0.3, 0.16, 0.16, '#4f9a4b', { blocos: false }); caixa(x - 0.47, y - 0.08, 0.85 * h, 0.16, 0.16, 0.45, '#4f9a4b', { blocos: false }); }
      if (a.v > 0.7) { const [fx, fy] = iso(x, y, 1.5 * h + 0.1); ctx.font = '12px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🌸', fx, fy); }
    } else {
      const cores = ['#b9a8ff', '#9fe3f5', '#f7b8e6'], c = cores[Math.floor(a.v * 3)];
      ctx.globalAlpha = 0.85;
      caixa(x - 0.14, y - 0.14, 0, 0.28, 0.28, 1.9 * h, c, { blocos: false, topo: '#ffffff' });
      caixa(x + 0.1, y + 0.05, 0, 0.2, 0.2, 1.1 * h, cores[(Math.floor(a.v * 3) + 1) % 3], { blocos: false, topo: '#ffffff' });
      caixa(x - 0.32, y + 0.08, 0, 0.18, 0.18, 0.8 * h, cores[(Math.floor(a.v * 3) + 2) % 3], { blocos: false, topo: '#ffffff' });
      ctx.globalAlpha = 1;
    }
  }
  function predioTele(o) {
    const ok = feitasTele(teleNivel, o.area) >= perguntasTele(teleNivel, o.area).length, r = resultadoTeste(), fraca = r && r.nivel === teleNivel && (r.estudar || []).includes(o.area);
    const [base, teto] = temaTele().predio, tipo = temaTele().arvore, x = o.x + 0.1, y = o.y + 0.1, w = o.w - 0.2, d = o.d - 0.2;
    sombra(o.x + 1, o.y + 1, 1.5);
    if (tipo === 'cristal') { caixa(x + 0.2, y + 0.2, 0, w - 0.4, d - 0.4, 2.6, base); caixa(x + 0.4, y + 0.4, 2.6, w - 0.8, d - 0.8, 0.6, teto); }
    else if (tipo === 'cacto') { caixa(x, y, 0, w, d, 1.5, base); caixa(x - 0.05, y - 0.05, 1.5, w + 0.1, d + 0.1, 0.18, teto, { blocos: false }); }
    else { caixa(x, y, 0, w, d, 1.4, base); caixa(x - 0.15, y - 0.15, 1.4, w + 0.3, d + 0.3, 0.25, teto, { blocos: false }); caixa(x + 0.25, y + 0.25, 1.65, w - 0.5, d - 0.5, 0.3, teto, { blocos: false }); caixa(x + 0.55, y + 0.55, 1.95, w - 1.1, d - 1.1, 0.25, teto, { blocos: false }); }
    caixa(o.x + 0.8, o.y + o.d - 0.12, 0, 0.4, 0.06, 0.8, '#7a523a', { blocos: false });   // porta
    const alto = tipo === 'cristal' ? 3.6 : tipo === 'cacto' ? 2.2 : 2.6, [sx, sy] = iso(o.x + 1, o.y + 1, alto + Math.sin(agora / 500 + o.x) * 0.08);
    ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ok ? '✅' : TP.areas[o.area].ic, sx, sy);
    if (fraca && !ok) { ctx.font = '15px system-ui, sans-serif'; ctx.fillText('⭐', sx + 18, sy - 14); }
    if (Math.hypot(o.x + 1 - P.x, o.y + 2.4 - P.y) < 3.2) rotulo(TP.areas[o.area].nome, sx, sy - 22, '#fff7e8');
  }
  function desenhaTele() {
    const E = enfeitesTele(teleNivel), T2 = temaTele();
    return ESTACOES_TELE.map(o => ({ k: o.x + o.y + o.w / 2 + o.d / 2, d: () => predioTele(o) }))
      .concat(E.arv.map(a => ({ k: a.x + a.y + 0.6, d: () => arvoreTele(a) })))
      .concat(E.deco.map(o => ({ k: o.x + o.y, d: () => { const [sx, sy] = iso(o.x + 0.15, o.y + 0.15, 0.2); ctx.font = '15px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(T2.deco[o.ic], sx, sy); } })))
      .concat([{ k: 10 + TD_TELE - 1.6, d: () => { const z = SALA_TELE.saida; desenhaPortalTele({ gx: z.x - 1, y: z.y - 1.8 }, Math.hypot(z.x - P.x, z.y - P.y) < 3, 'Portal de volta para a Vila'); } }]);
  }
  function desenhaPortalTele(c, perto, txt) {
    const x = c.gx, y = c.y;
    sombra(x + 1, y + 1, 1.6);
    caixa(x + 0.1, y + 0.1, 0, 1.8, 1.8, 0.2, '#c7b4f2');
    caixa(x + 0.2, y + 0.8, 0.2, 0.3, 0.4, 2.0, '#9a6bd6'); caixa(x + 1.5, y + 0.8, 0.2, 0.3, 0.4, 2.0, '#9a6bd6'); caixa(x + 0.2, y + 0.8, 2.2, 1.6, 0.4, 0.3, '#9a6bd6');
    const [sx, sy] = iso(x + 1, y + 1, 1.2), g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 30 + Math.sin(agora / 300) * 4);
    g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.5, 'rgba(199,180,242,.7)'); g.addColorStop(1, 'rgba(199,180,242,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(sx, sy, 26, 34, 0, 0, Math.PI * 2); ctx.fill();
    const [ix, iy] = iso(x + 1, y + 1, 3.0); ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🌀', ix, iy);
    if (perto) rotulo(txt || 'Portal de teletransporte', ix, iy - 26, '#fff7e8');
  }
  const SALA_TELE = {
    aberto: true, get nome() { return temaTele().nome; }, ic: '🌀', get sub() { const N = TP.niveis[teleNivel]; return `${N.ic} Mundo do nível ${N.nome} · teste de proficiência`; }, W: TW_TELE, D: TD_TELE, saida: { x: 10, y: TD_TELE - 0.5 }, alturaParede: 0,
    get fundo() { return temaTele().fundo; }, get base() { return escuro(temaTele().chao[0], 0.25); }, parede: '#ffffff', get piso() { return temaTele().chao; },
    pisoEm: (x, y) => caminhoTele.has(x + ',' + y) ? temaTele().caminho : temaTele().chao[(x * 7 + y * 3) % 5 ? 0 : 1],
    local: () => { const c = fases[0].portalTele; return { f: fases[0], x: c ? c.porta.x : 3.5, y: c ? c.porta.y + 0.4 : MEIO }; },
    estado: EST_TELE, objs: objsTele, livre: (x, y) => livreObjs(SALA_TELE, x, y), usa: usaTele, desenha: desenhaTele,
    mini: (c, ox, oy, s) => { c.fillStyle = temaTele().caminho; for (const k of caminhoTele) { const [x, y] = k.split(',').map(Number); c.fillRect(ox + x * s, oy + y * s, s, s); } c.fillStyle = '#2f7d45'; for (const a of enfeitesTele(teleNivel).arv) c.fillRect(ox + a.x * s, oy + a.y * s, s * 0.6, s * 0.6); for (const o of ESTACOES_TELE) { c.fillStyle = feitasTele(teleNivel, o.area) >= perguntasTele(teleNivel, o.area).length ? '#4bb259' : '#9a6bd6'; c.fillRect(ox + o.x * s, oy + o.y * s, o.w * s, o.d * s); } },
    missoes: () => Object.keys(TP.areas).map(a => ({ nome: `${TP.areas[a].ic} ${TP.areas[a].nome}`, n: feitasTele(teleNivel, a), meta: perguntasTele(teleNivel, a).length, ok: feitasTele(teleNivel, a) >= perguntasTele(teleNivel, a).length })),
    boasVindas: () => { const N = TP.niveis[teleNivel], r = resultadoTeste(), fr = r && r.nivel === teleNivel ? (r.estudar || []).filter(k => TP.areas[k]) : [];
      dialogo('🌀', temaTele().nome, `<p>Bem-vindo à <b>${temaTele().nome}</b>, o mundo do nível ${N.ic} <b>${N.nome}</b>! Cada prédio é uma das 6 áreas do teste, com perguntas deste nível e materiais para estudar.</p>${fr.length ? `<p>As estações com ⭐ foram as áreas com menos acertos no seu teste: ${fr.map(k => TP.areas[k].ic + ' ' + TP.areas[k].nome).join(' e ')}.</p>` : ''}<p class="muted">Complete as 6 estações para ganhar +100 ⭐ e uma figurinha. Depois, refaça o teste!</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }]); }
  };
  /* --- Museu (Vila do Começo): expõe o que o estudante fez pelo site. As moedas do jogo Cunhe sua Própria Moeda,
     as estrelas secretas do material didático (que dão itens especiais para a casa, sem gastar a contagem), as medalhas
     do Meu progresso, os troféus e as figurinhas do Mundo. Só lê o que já está neste navegador. */
  const lerLocal = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  function estrelasSite() {
    const s = lerLocal('ohtopico-estrelas-v1'), md = lerLocal('md-progresso-v1');
    if (!s || !s.perfis) return [];
    const id = md && md.atual && md.perfis && md.perfis[md.atual] ? md.atual : '_', reg = (s.perfis[id] || s.perfis._ || {}).a || {};
    return Object.keys(reg);
  }
  const ESPECIAIS = () => Object.entries(MOVEIS).filter(([, M]) => M.estrelas).sort((a, b) => a[1].estrelas - b[1].estrelas);
  function confereEstrelasSite(avisa) {
    const n = estrelasSite().length, novos = [];
    for (const [id, M] of ESPECIAIS()) if (n >= M.estrelas && !S.casa.feitos[id]) { S.casa.feitos[id] = true; S.casa.guardados[id] = (S.casa.guardados[id] || 0) + 1; novos.push(`${M.ic} ${M.nome}`); }
    if (novos.length) { salvar(); if (avisa !== false) setTimeout(() => aviso(`🌟 Item especial pelas estrelas secretas: ${novos.join(', ')}. Está guardado na sua casa!`), 900); }
    return novos;
  }
  const moedasCunhadas = () => { const a = lerLocal('cunhe-moeda-album-v1'); return Array.isArray(a) ? a.filter(m => m && Array.isArray(m.pix)).slice(0, 12) : []; };
  const METAL_MOEDA = { cobre: ['#f6b98c', '#c8743f', '#7a3f1e'], bronze: ['#fde59a', '#d6a432', '#7f5f12'], inox: ['#ffffff', '#c3c8ce', '#6f767f'], bimetal: ['#ffffff', '#c3c8ce', '#6f767f'], aluminio: ['#f4f6f8', '#d5dade', '#8b9198'] };
  function svgMoedaMuseu(m) {   // versão simples do desenho do jogo: metal, desenho em pixels e o texto da borda
    const cor = METAL_MOEDA[m.metal] || METAL_MOEDA.bronze, anel = m.metal === 'bimetal' ? METAL_MOEDA.bronze : cor, N = Math.round(Math.sqrt(m.pix.length)) || 15, R = 46, cel = R * 1.04 / N, x0 = -R * 0.52;
    let o = `<svg viewBox="-50 -50 100 100" width="96" height="96" role="img" aria-label="Moeda ${esc(m.nome || '')}"><circle r="${R}" fill="${anel[1]}" stroke="${anel[2]}" stroke-width="1.5"/>`;
    if (m.metal === 'bimetal') o += `<circle r="${R * 0.66}" fill="${cor[1]}" stroke="${cor[2]}"/>`;
    m.pix.forEach((v, i) => { if (v) o += `<rect x="${(x0 + (i % N) * cel).toFixed(2)}" y="${(x0 + Math.floor(i / N) * cel).toFixed(2)}" width="${cel.toFixed(2)}" height="${cel.toFixed(2)}" fill="${cor[2]}" fill-opacity=".8"/>`; });
    return o + '</svg>';
  }
  const MUSEU_OBJ = [
    { id: 'moedas', x: 0.8, y: 0.6, w: 2, d: 1, ic: '🪙', cor: '#d6a432', acao: 'ver as moedas cunhadas' },
    { id: 'estrelas', x: 4, y: 0.6, w: 2, d: 1, ic: '🌟', cor: '#f5c400', acao: 'ver as estrelas secretas' },
    { id: 'medalhas', x: 7.2, y: 0.6, w: 2, d: 1, ic: '🏅', cor: '#e0564a', acao: 'ver as medalhas' },
    { id: 'trofeus', x: 0.8, y: 4, w: 1, d: 1, ic: '🏆', cor: '#9a6bd6', acao: 'ver os troféus do Mundo' },
    { id: 'figurinhas', x: 8.2, y: 4, w: 1, d: 1, ic: '📒', cor: '#4bb259', acao: 'ver o álbum de figurinhas' },
    { id: 'pixel', x: 4.5, y: 3, w: 1, d: 1, ic: '🎨', cor: '#e07a3c', acao: 'ver a galeria de pixel art' }
  ];
  const vitoriasSalas = () => ((S.emat || {}).vitorias || 0) + ((S.labirinto || {}).vitorias || 0);
  function usaMuseu(o) {
    const fecha = { txt: 'Fechar', fn: fechaDialogo }, base = '../material-didatico/';
    if (o.id === 'moedas') {
      const ms = moedasCunhadas();
      return dialogo('🪙', 'Moedas cunhadas', ms.length ? `<p>As moedas que você cunhou no jogo <b>Cunhe sua Própria Moeda</b> (as 12 mais novas):</p><div class="museu-moedas">${ms.map(m => `<figure>${svgMoedaMuseu(m)}<figcaption>${esc(m.nome || 'Sem nome')}<br><span class="muted small">${String(m.d).replace('.', ',')} mm${m.ano ? ' · ' + esc(m.ano) : ''}</span></figcaption></figure>`).join('')}</div>`
        : '<p>A vitrine ainda está vazia. Cunhe uma moeda no jogo <b>Cunhe sua Própria Moeda</b>, neste mesmo navegador, e ela aparece aqui.</p>',
        [{ txt: '🪙 Cunhar uma moeda', classe: 'principal', href: base + 'jogos/cunhe-moeda.html' }, fecha]);
    }
    if (o.id === 'estrelas') {
      confereEstrelasSite(false);
      const n = estrelasSite().length, prox = ESPECIAIS().find(([, M]) => n < M.estrelas);
      return dialogo('🌟', 'Estrelas secretas', `<p>Você já achou <b>${n}</b> estrela${n === 1 ? '' : 's'} secreta${n === 1 ? '' : 's'} escondida${n === 1 ? '' : 's'} pelas páginas do material didático. A contagem nunca zera: os itens especiais são um presente, não uma troca.</p>
        <ul class="etapas">${ESPECIAIS().map(([id, M]) => `<li class="${n >= M.estrelas ? 'ok' : ''}">${n >= M.estrelas ? M.ic : '🔒'} <b>${esc(M.nome)}</b> <span class="muted small">· ${M.estrelas} estrela${M.estrelas > 1 ? 's' : ''}</span></li>`).join('')}</ul>
        <p class="muted small">${prox ? `Faltam ${prox[1].estrelas - n} para ${prox[1].ic} ${esc(prox[1].nome)}. ` : 'Você ganhou todos os itens especiais! '}Os itens ganhos ficam guardados na sua casa (botão Casa), para colocar onde quiser.</p>`,
        [{ txt: '🔎 Procurar estrelas', classe: 'principal', href: base }, fecha]);
    }
    if (o.id === 'medalhas') {
      if (!window.MDP || !MDP.perfil()) return dialogo('🏅', 'Medalhas', '<p>As medalhas do <b>Meu progresso</b> aparecem aqui. Crie o seu perfil (só um apelido, sem cadastro) para começar a ganhar.</p>', [{ txt: '📈 Criar perfil', classe: 'principal', href: base + 'meu-progresso.html' }, fecha]);
      const md = MDP.medalhas(), tem = md.filter(m => m.tem);
      return dialogo('🏅', 'Medalhas', `<p><b>${tem.length} de ${md.length}</b> medalhas do Meu progresso. As do Mundo também contam lá.</p><ul class="etapas">${md.map(m => `<li class="${m.tem ? 'ok' : ''}">${m.tem ? m.icone : '🔒'} <b>${esc(m.nome)}</b> <span class="muted small">· ${esc(m.desc)}</span></li>`).join('')}</ul>`, [{ txt: '📈 Meu progresso', classe: 'principal', href: base + 'meu-progresso.html' }, fecha]);
    }
    if (o.id === 'trofeus') {
      const vilas = fases.filter(f => S.concluidas[f.id]), tele = Object.keys((S.tele || {}).premios || {}).filter(k => TP.niveis[k]);
      return dialogo('🏆', 'Troféus do Mundo', `<ul class="etapas">
        <li class="${vilas.length ? 'ok' : ''}">🏡 <b>${vilas.length} de ${fases.length}</b> vilas concluídas${vilas.length ? `: ${vilas.map(f => f.icone + ' ' + esc(f.nome)).join(', ')}` : ''}</li>
        <li class="${(S.emat || {}).vitorias ? 'ok' : ''}">🧮 Escape da Matemática vencido <b>${(S.emat || {}).vitorias || 0}</b> vez(es)</li>
        <li class="${(S.labirinto || {}).vitorias ? 'ok' : ''}">🌀 Labirinto vencido <b>${(S.labirinto || {}).vitorias || 0}</b> vez(es)</li>
        <li class="${tele.length ? 'ok' : ''}">🌀 Mundos do teletransporte completos: <b>${tele.length ? tele.map(k => TP.niveis[k].ic + ' ' + TP.niveis[k].nome).join(', ') : 'nenhum ainda'}</b></li>
        <li class="${S.misterio && S.misterio.resolvido ? 'ok' : ''}">🕵️ Mistério da vila ${S.misterio && S.misterio.resolvido ? 'resolvido' : 'ainda sem solução'}</li></ul>`, [fecha]);
    }
    if (o.id === 'pixel') {
      const G = EST_PX().galeria;
      return dialogo('🎨', 'Galeria de pixel art', G.length ? `<p>Desenhos que você pintou por coordenadas (os 8 mais novos):</p><div class="museu-pixel">${G.map(d => `<figure><img src="${imgPx(d.px, 96)}" alt="${esc(d.nome)}" width="96" height="96"><figcaption>${esc(d.nome)}</figcaption></figure>`).join('')}</div>` : '<p>A galeria ainda está vazia. No ateliê, você pinta desenhos de 16 × 16 quadradinhos usando <b>coordenadas</b> (x, y), como no plano cartesiano.</p>',
        [{ txt: '🎨 Abrir o ateliê', classe: 'principal', fn: () => { fechaDialogo(); abreJanela('pixel'); } }, fecha]);
    }
    if (o.id === 'figurinhas') {
      const tem = PESSOAS.filter(p => temFig(p.id)).length;
      return dialogo('📒', 'Álbum de figurinhas', `<p>Você tem <b>${tem} de ${PESSOAS.length}</b> figurinhas de pessoas importantes da Computação e da Matemática.</p>`, [{ txt: '📒 Abrir o álbum', classe: 'principal', fn: () => { fechaDialogo(); abreJanela('album'); } }, fecha]);
    }
  }
  function desenhaMuseu() {
    return MUSEU_OBJ.map(o => ({ k: o.x + o.y + o.w / 2 + o.d / 2, d: () => {
      caixa(o.x + 0.1, o.y + 0.1, 0, o.w - 0.2, o.d - 0.2, 0.55, '#efe6d2'); caixa(o.x + 0.15, o.y + 0.15, 0.55, o.w - 0.3, o.d - 0.3, 0.06, o.cor, { blocos: false });
      const [sx, sy] = iso(o.x + o.w / 2, o.y + o.d / 2, 1.15 + Math.sin(agora / 600 + o.x) * 0.05);
      ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(o.ic, sx, sy);
      if (o.id === 'pixel' && EST_PX().galeria.length) { const px = EST_PX().galeria[0].px, [qx, qy] = iso(o.x + o.w / 2, o.y + o.d / 2, 1.9); ctx.fillStyle = '#7a523a'; ctx.fillRect(qx - 19, qy - 19, 38, 38); ctx.fillStyle = '#fbf7ee'; ctx.fillRect(qx - 16, qy - 16, 32, 32); for (let i = 0; i < 256; i++) if (CORES_PX[px[i]]) { ctx.fillStyle = CORES_PX[px[i]][0]; ctx.fillRect(qx - 16 + (i % 16) * 2, qy - 16 + Math.floor(i / 16) * 2, 2, 2); } }
      if (o.id === 'moedas') moedasCunhadas().slice(0, 3).forEach((m, i) => { const c = METAL_MOEDA[m.metal] || METAL_MOEDA.bronze, [mx, my] = iso(o.x + 0.45 + i * 0.55, o.y + 0.5, 0.63); ctx.fillStyle = c[1]; ctx.strokeStyle = c[2]; ctx.beginPath(); ctx.ellipse(mx, my, 9, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); });
    } }));
  }
  /* ---------- Oficina de Robótica (Bairro dos Padrões): simulador de circuitos simples em série.
     Bateria de 5 V e 4 posições no circuito. Libera com o Kit Iniciante; os outros componentes são vendidos na Loja de Componentes, no balcão da oficina.
     Conta: corrente = (5 V − quedas dos LEDs) ÷ resistência total (lei de Ohm). LED com mais de 30 mA queima. */
  const COMP = {
    fio: { nome: 'Fio', ic: '〰️', R: 0 },
    resistor: { nome: 'Resistor 220 Ω', ic: '▭', R: 220, preco: 10 },
    ledR: { nome: 'LED vermelho', ic: '🔴', led: '#ff3b3b', Vd: 2, R: 0 },
    ledG: { nome: 'LED verde', ic: '🟢', led: '#3bdc5a', Vd: 2.1, R: 0, preco: 15 },
    ledY: { nome: 'LED amarelo', ic: '🟡', led: '#ffd23f', Vd: 2.1, R: 0, preco: 15 },
    ledB: { nome: 'LED azul', ic: '🔵', led: '#4aa3ff', Vd: 3, R: 0, preco: 20 },
    chave: { nome: 'Chave liga/desliga', ic: '🎚️', R: 0 },
    botao: { nome: 'Botão (aperte e segure)', ic: '🔘', R: 0, preco: 20 },
    buzzer: { nome: 'Buzzer (campainha)', ic: '🔔', R: 100, preco: 30 },
    motor: { nome: 'Motor com hélice', ic: '🌀', R: 30, preco: 40 },
    ldr: { nome: 'Módulo sensor de luz', ic: '🌗', R: 0, preco: 45 },
    pot: { nome: 'Potenciômetro (0 a 1000 Ω)', ic: '🎛️', R: 0, preco: 45 }
  };
  const KIT_ROBO = { preco: 120, itens: { resistor: 2, ledR: 2, chave: 1 } };
  const EXPERIMENTOS = [
    { id: 'acende', nome: 'Acenda um LED sem queimar', dica: 'LED + resistor + fios. Sem o resistor, a corrente passa de 30 mA e o LED queima.', ok: E => E.ledsAcesos >= 1 },
    { id: 'chave', nome: 'Liga e desliga com a chave', dica: 'Coloque a chave no circuito do LED e desligue e ligue de novo.', ok: E => E.ledsAcesos >= 1 && E.tem.chave && R_.ligaDesliga },
    { id: 'dois', nome: 'Dois LEDs acesos em série', dica: 'Dois LEDs e um resistor. Repare que a corrente fica menor: cada LED "gasta" uns 2 V.', ok: E => E.ledsAcesos >= 2 },
    { id: 'campainha', nome: 'Campainha de botão', dica: 'Buzzer + botão + fios: só toca enquanto o botão estiver apertado.', ok: E => E.toca && E.tem.botao },
    { id: 'ventilador', nome: 'Ventilador com chave', dica: 'Motor + chave + fios. O motor precisa de pelo menos 20 mA para girar.', ok: E => E.gira && E.tem.chave },
    { id: 'noturna', nome: 'Luz noturna automática', dica: 'O sensor de luz só deixa a corrente passar no escuro. Diminua a luz do ambiente.', ok: E => E.ledsAcesos >= 1 && E.tem.ldr },
    { id: 'dimmer', nome: 'Controle de brilho', dica: 'Potenciômetro + resistor + LED: gire o potenciômetro e veja a corrente mudar.', ok: E => E.ledsAcesos >= 1 && E.tem.pot && R_.mexeuPot },
    { id: 'azul', nome: 'Acenda o LED azul', dica: 'O LED azul precisa de 3 V. Com outro LED em série (2 V + 3 V = 5 V), não sobra nada para o resistor!', ok: E => E.acesoCor.ledB }
  ];
  const R_ = { slots: [null, null, null, null], chave: true, botao: false, luz: 80, pot: 50, ligaDesliga: false, mexeuPot: false, ultimoSom: 0 };
  const EST_ROBO = () => S.robo || (S.robo = { kit: false, tem: {}, feitos: {} });
  const temComp = k => k === 'fio' ? (EST_ROBO().kit ? 9 : 0) : (EST_ROBO().tem[k] || 0);
  function simulaRobo() {
    const ps = R_.slots.map(k => k && COMP[k] ? Object.assign({ k }, COMP[k]) : null), tem = {};
    ps.forEach(p => { if (p) tem[p.k] = (tem[p.k] || 0) + 1; });
    const E = { tem, I: 0, Rt: 0, Vd: 0, ledsAcesos: 0, acesoCor: {}, brilho: 0, gira: false, toca: false, msg: '', queimou: false };
    if (ps.some(p => !p)) { E.msg = '🔌 Circuito aberto: preencha as 4 posições (use fio onde não tiver componente).'; return E; }
    const aberto = (tem.chave && !R_.chave) ? 'a chave está desligada' : (tem.botao && !R_.botao) ? 'o botão está solto' : (tem.ldr && R_.luz >= 50) ? 'o sensor de luz está no claro (ele só conduz no escuro)' : '';
    E.Rt = ps.reduce((s, p) => s + (p.k === 'pot' ? R_.pot * 10 : p.R), 0); E.Vd = ps.reduce((s, p) => s + (p.Vd || 0), 0);
    const leds = ps.filter(p => p.led);
    if (aberto) { E.msg = `⏸️ Sem corrente: ${aberto}.`; return E; }
    if (5 <= E.Vd) { E.msg = `🪫 Os LEDs em série precisam de ${String(E.Vd).replace('.', ',')} V, e a bateria só tem 5 V: não sobra tensão para empurrar corrente.`; return E; }
    if (E.Rt < 1) { if (leds.length) { E.queimou = true; E.msg = '💥 O LED queimou! Sem resistor, a corrente fica enorme. Ainda bem que é simulação: coloque um resistor.'; } else E.msg = '⚠️ Curto-circuito: sem nada para limitar a corrente, a bateria esquenta e descarrega. Coloque um componente.'; return E; }
    E.I = (5 - E.Vd) / E.Rt * 1000;
    if (leds.length && E.I > 30) { E.queimou = true; E.msg = `💥 O LED queimou: ${Math.round(E.I)} mA, e o máximo dele é 30 mA. Aumente a resistência.`; return E; }
    if (leds.length && E.I >= 1) { E.ledsAcesos = leds.length; leds.forEach(p => { E.acesoCor[p.k] = true; }); E.brilho = Math.min(1, E.I / 20); }
    E.gira = !!tem.motor && E.I >= 20; E.toca = !!tem.buzzer && E.I >= 10;
    E.msg = `✅ Circuito fechado: ${String(Math.round(E.I * 10) / 10).replace('.', ',')} mA.${leds.length && E.I < 1 ? ' Corrente fraca demais para o LED acender.' : ''}${tem.motor && !E.gira ? ' O motor precisa de 20 mA para girar.' : ''}`;
    return E;
  }
  function svgRobo(E) {
    const on = E.I > 0, fioCor = on ? '#e8a400' : '#8c8577', P4 = [[150, 40], [330, 40], [420, 130], [240, 220]];
    const caixaComp = (k, [x, y], i) => {
      const c = k && COMP[k]; let extra = '';
      if (c && c.led && E.acesoCor[k]) extra = `<circle cx="${x}" cy="${y - 2}" r="${18 + 10 * E.brilho}" fill="${c.led}" opacity="${0.25 + 0.4 * E.brilho}"/>`;
      if (c && c.led && E.queimou) extra = `<text x="${x + 16}" y="${y - 14}" font-size="16">💥</text>`;
      const giro = k === 'motor' && E.gira ? ' class="rob-gira"' : '';
      return `${extra}<g><rect x="${x - 36}" y="${y - 20}" width="72" height="40" rx="10" fill="${c ? '#fffdf6' : '#f1e9d8'}" stroke="${c ? '#5c4a36' : '#c9bfa8'}" stroke-width="2"${c ? '' : ' stroke-dasharray="5 4"'}/><text x="${x}" y="${y + 7}" text-anchor="middle" font-size="20"${giro} style="transform-origin:${x}px ${y}px">${c ? c.ic : '?'}</text><text x="${x}" y="${y + 34}" text-anchor="middle" font-size="11" fill="#5c4a36">${i + 1}. ${c ? esc(c.nome.split(' (')[0]) : 'vazio'}</text>${k === 'buzzer' && E.toca ? `<text x="${x + 30}" y="${y - 16}" font-size="16">🔊</text>` : ''}</g>`;
    };
    return `<svg class="rob-svg" viewBox="0 0 470 270" role="img" aria-label="Circuito em série com bateria de 5 volts e 4 posições">
      <path d="M60 130 V40 H420 V220 H60 V130" fill="none" stroke="${fioCor}" stroke-width="6" stroke-linejoin="round"/>
      <g><rect x="34" y="96" width="52" height="70" rx="8" fill="#3a3a3a"/><rect x="48" y="88" width="24" height="10" rx="3" fill="#888"/><text x="60" y="128" text-anchor="middle" fill="#fff" font-size="16" font-weight="700">5 V</text><text x="60" y="150" text-anchor="middle" fill="#ffd23f" font-size="13">+ −</text></g>
      ${R_.slots.map((k, i) => caixaComp(k, P4[i], i)).join('')}
      ${on ? `<text x="240" y="262" text-anchor="middle" font-size="12" fill="#5c4a36">a corrente sai do + da bateria e volta pelo −</text>` : ''}
    </svg>`;
  }
  function janelaRobo() {
    const ER = EST_ROBO(), el = $('#rob-conteudo');
    if (!ER.kit) { el.innerHTML = '<p>A bancada está vazia. Compre o <b>🧰 Kit Iniciante</b> no balcão da <b>Loja de Componentes</b>, aqui na oficina, para começar.</p>'; return; }
    const E = simulaRobo();
    const opcoes = i => { const usados = {}; R_.slots.forEach((k, j) => { if (k && j !== i) usados[k] = (usados[k] || 0) + 1; }); return Object.keys(COMP).filter(k => temComp(k) - (usados[k] || 0) > 0 || R_.slots[i] === k); };
    el.innerHTML = `${svgRobo(E)}
      <p class="rob-msg" aria-live="polite">${E.msg}</p>
      <p class="small muted">Bateria 5 V · resistência total ${E.Rt} Ω · quedas nos LEDs ${String(E.Vd).replace('.', ',')} V · corrente = (5 − ${String(E.Vd).replace('.', ',')}) ÷ ${E.Rt || '?'} ${E.I ? `= ${String(Math.round(E.I * 10) / 10).replace('.', ',')} mA` : ''}</p>
      <div class="rob-slots">${R_.slots.map((k, i) => `<label>Posição ${i + 1}<select class="campo" data-slot="${i}"><option value="">— vazio —</option>${opcoes(i).map(c => `<option value="${c}"${c === k ? ' selected' : ''}>${COMP[c].ic} ${esc(COMP[c].nome)}</option>`).join('')}</select></label>`).join('')}</div>
      <div class="rob-controles">${E.tem.chave ? `<button type="button" class="hb ${R_.chave ? 'verde' : 'cinza'}" id="rob-chave">🎚️ Chave: ${R_.chave ? 'ligada' : 'desligada'}</button>` : ''}${E.tem.botao ? '<button type="button" class="hb amarelo" id="rob-botao">🔘 Aperte e segure</button>' : ''}${E.tem.ldr ? `<label>🌗 Luz do ambiente <input type="range" id="rob-luz" min="0" max="100" value="${R_.luz}"> ${R_.luz < 50 ? 'escuro' : 'claro'}</label>` : ''}${E.tem.pot ? `<label>🎛️ Potenciômetro <input type="range" id="rob-pot" min="0" max="100" value="${R_.pot}"> ${R_.pot * 10} Ω</label>` : ''}</div>
      <h3>🧪 Experimentos</h3><ul class="etapas">${EXPERIMENTOS.map(x => `<li class="${ER.feitos[x.id] ? 'ok' : ''}">${ER.feitos[x.id] ? '✅' : '⬜'} <b>${x.nome}</b> <span class="muted small">· ${x.dica}</span></li>`).join('')}</ul>
      <p class="muted small">Faltam componentes? Eles ficam à venda na Loja de Componentes, no balcão desta oficina.</p>`;
    el.querySelectorAll('[data-slot]').forEach(s2 => s2.addEventListener('change', () => { R_.slots[+s2.dataset.slot] = s2.value || null; janelaRobo(); }));
    const ch = $('#rob-chave'); if (ch) ch.addEventListener('click', () => { R_.chave = !R_.chave; if (R_.chave && R_.desligou) R_.ligaDesliga = true; if (!R_.chave) R_.desligou = true; janelaRobo(); });
    const bt = $('#rob-botao'); if (bt) { const set = v => { if (R_.botao === v) return; R_.botao = v; janelaRobo(); const b2 = $('#rob-botao'); if (b2 && v) b2.focus(); }; bt.addEventListener('pointerdown', () => set(true)); bt.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); set(true); } }); }
    if (R_.botao) { const solta = () => { R_.botao = false; document.removeEventListener('pointerup', solta); document.removeEventListener('keyup', solta); janelaRobo(); }; document.addEventListener('pointerup', solta); document.addEventListener('keyup', solta); }
    const lz = $('#rob-luz'); if (lz) lz.addEventListener('change', () => { R_.luz = +lz.value; janelaRobo(); });
    const pt = $('#rob-pot'); if (pt) pt.addEventListener('change', () => { R_.pot = +pt.value; R_.mexeuPot = true; janelaRobo(); });
    if (E.toca && Date.now() - R_.ultimoSom > 600) { R_.ultimoSom = Date.now(); SOM.toca('coleta'); }
    for (const x of EXPERIMENTOS) if (!ER.feitos[x.id] && x.ok(E)) {
      ER.feitos[x.id] = true; pontos(40, `🤖 Experimento: ${x.nome}!`); ganhaHabilidade(['MD', 'PC'], 10); contaResposta(); progressoMundo('robo:' + x.id, true); SOM.toca('vitoria'); salvar();
      setTimeout(janelaRobo, 50); break;
    }
  }
  function lojaComponentes() {
    const ER = EST_ROBO(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    const compra = (preco, fn, nome) => { if (S.pontos < preco) return aviso(`Faltam ${preco - S.pontos} ⭐ para comprar ${nome}.`); S.pontos -= preco; fn(); SOM.toca('moeda'); hud(); salvar(); aviso(`🛒 Comprou ${nome}!`); lojaComponentes(); };
    if (!ER.kit) return dialogo('🛒', 'Loja de Componentes', `<p>Para começar na robótica, leve o <b>🧰 Kit Iniciante</b> por <b>${KIT_ROBO.preco} ⭐</b>: bateria de 5 V, fios, 2 resistores de 220 Ω, 2 LEDs vermelhos e uma chave liga/desliga.</p><p class="muted small">Você tem ${S.pontos} ⭐. Depois do kit, cada componente novo é vendido separado, para novos experimentos.</p>`,
      [{ txt: `🧰 Comprar o Kit Iniciante (${KIT_ROBO.preco} ⭐)`, classe: 'principal', fn: () => compra(KIT_ROBO.preco, () => { ER.kit = true; for (const [k, n] of Object.entries(KIT_ROBO.itens)) ER.tem[k] = (ER.tem[k] || 0) + n; }, 'o Kit Iniciante') }, fecha]);
    const venda = Object.keys(COMP).filter(k => COMP[k].preco);
    dialogo('🛒', 'Loja de Componentes', `<p>Componentes para novos experimentos (você tem ${S.pontos} ⭐):</p><ul class="etapas">${venda.map(k => `<li>${COMP[k].ic} <b>${esc(COMP[k].nome)}</b> · ${COMP[k].preco} ⭐ <span class="muted small">(você tem ${ER.tem[k] || 0})</span></li>`).join('')}</ul>`,
      venda.map(k => ({ txt: `${COMP[k].ic} ${COMP[k].nome.split(' (')[0]} · ${COMP[k].preco} ⭐`, fn: () => compra(COMP[k].preco, () => { ER.tem[k] = (ER.tem[k] || 0) + 1; }, COMP[k].nome) })).concat([fecha]));
  }
  const ROBO_OBJ = [
    { id: 'bancada', x: 3, y: 0.6, w: 3, d: 1, ic: '🤖', cor: '#4bb259', acao: 'usar a bancada de circuitos' },
    { id: 'loja', x: 0.6, y: 2.6, w: 1, d: 2, ic: '🛒', cor: '#f6b73c', acao: 'comprar na Loja de Componentes' },
    { id: 'cartaz', x: 7.4, y: 2.6, w: 1, d: 1, ic: '📜', cor: '#c7b4f2', acao: 'ler o cartaz da lei de Ohm' }
  ];
  function usaRobo(o) {
    if (o.id === 'loja') return lojaComponentes();
    if (o.id === 'cartaz') return dialogo('📜', 'Lei de Ohm', '<p><b>Corrente = Tensão ÷ Resistência</b> (I = V ÷ R).</p><p>A bateria tem 5 V. Cada LED "gasta" uma parte da tensão (vermelho, verde e amarelo uns 2 V; azul uns 3 V). O que sobra empurra a corrente pelo resistor.</p><p>Exemplo: LED vermelho + resistor de 220 Ω → (5 − 2) ÷ 220 = 0,0136 A = <b>13,6 mA</b>. O LED aguenta até 30 mA.</p>', [{ txt: 'Entendi', classe: 'principal', fn: fechaDialogo }]);
    if (!EST_ROBO().kit) return dialogo('🤖', 'Bancada de circuitos', '<p>A bancada ainda está vazia. Compre o <b>🧰 Kit Iniciante</b> na Loja de Componentes (o balcão 🛒 aqui da oficina).</p>', [{ txt: '🛒 Ir à loja', classe: 'principal', fn: lojaComponentes }, { txt: 'Fechar', fn: fechaDialogo }]);
    fechaDialogo(); abreJanela('robotica');
  }
  function desenhaRoboSala() {
    return ROBO_OBJ.map(o => ({ k: o.x + o.y + o.w / 2 + o.d / 2, d: () => {
      caixa(o.x + 0.1, o.y + 0.1, 0, o.w - 0.2, o.d - 0.2, 0.75, '#d9cdb5'); caixa(o.x + 0.15, o.y + 0.15, 0.75, o.w - 0.3, o.d - 0.3, 0.06, o.cor, { blocos: false });
      const [sx, sy] = iso(o.x + o.w / 2, o.y + o.d / 2, 1.3 + Math.sin(agora / 600 + o.x) * 0.05);
      ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(o.ic, sx, sy);
    } }));
  }
  const EST_MUSEU = () => S.museu || (S.museu = {});
  const SALAS = {
    tele: SALA_TELE,
    museu: {
      nome: 'Museu', ic: '🏛️', sub: 'O que você fez pelo site', W: 10, D: 7, saida: { x: 5, y: 6.5 }, alturaParede: 2.6,
      fundo: '#2b2620', base: '#8a6a4a', parede: '#f0dfc0', piso: ['#e8dcc4', '#f5ecd9'],
      estilo: { base: '#f0dfc0', telhado: '#b0533c', porta: '#7a523a', ic: '🏛️', nome: 'Museu' },
      local: () => localSala('museu', fases[0]), estado: EST_MUSEU, objs: () => MUSEU_OBJ, livre: (x, y) => livreObjs(SALAS.museu, x, y), usa: usaMuseu, desenha: desenhaMuseu,
      mini: (c, ox, oy, s) => { for (const o of MUSEU_OBJ) { c.fillStyle = o.cor; c.fillRect(ox + o.x * s, oy + o.y * s, o.w * s, o.d * s); } },
      missoes: () => { const md = window.MDP && MDP.perfil() ? MDP.medalhas() : [];
        return [['🪙 Moedas cunhadas', moedasCunhadas().length, 12], ['🌟 Estrelas secretas', estrelasSite().length, ESPECIAIS().slice(-1)[0][1].estrelas], ['🏅 Medalhas', md.filter(m => m.tem).length, md.length || MDP.MEDALHAS.length], ['🏡 Vilas concluídas', Object.keys(S.concluidas).length, fases.length], ['📒 Figurinhas', PESSOAS.filter(p => temFig(p.id)).length, PESSOAS.length], ['🎨 Pixel art por coordenadas', Object.keys(EST_PX().feitos).length, MODELOS_PX.length]]
          .map(([nome, n, meta]) => ({ nome, n, meta, ok: n >= meta })); },
      boasVindas: () => { confereEstrelasSite(); dialogo('🏛️', 'Museu', '<p>Bem-vindo ao seu museu! Aqui ficam expostas as coisas que você fez pelo site: as <b>moedas que você cunhou</b>, as <b>estrelas secretas</b> que achou no material didático, as <b>medalhas</b> do Meu progresso, os <b>troféus</b> do Mundo, o seu <b>álbum de figurinhas</b> e a <b>galeria de pixel art</b> que você pinta por coordenadas.</p><p class="muted">Chegue perto de uma vitrine e aperte E. Tudo vem deste navegador: nada é enviado para a internet.</p>', [{ txt: 'Vamos ver!', classe: 'principal', fn: fechaDialogo }]); }
    },
    robotica: {
      nome: 'Oficina de Robótica', ic: '🤖', sub: 'Circuitos com bateria, LEDs, motor e sensores', W: 9, D: 6, saida: { x: 4.5, y: 5.5 }, alturaParede: 2.4,
      fundo: '#1f2a2a', base: '#5a6b6b', parede: '#d9e4e0', piso: ['#cfd8d4', '#dfe7e3'],
      estilo: { base: '#d9e4e0', telhado: '#4bb259', porta: '#5a6b6b', ic: '🤖', nome: 'Oficina de Robótica' },
      local: () => localSala('robotica', fases[2]), estado: EST_ROBO, objs: () => ROBO_OBJ, livre: (x, y) => livreObjs(SALAS.robotica, x, y), usa: usaRobo, desenha: desenhaRoboSala,
      mini: (c, ox, oy, s) => { for (const o of ROBO_OBJ) { c.fillStyle = o.cor; c.fillRect(ox + o.x * s, oy + o.y * s, o.w * s, o.d * s); } },
      missoes: () => [{ nome: '🧰 Kit Iniciante', n: EST_ROBO().kit ? 1 : 0, meta: 1, ok: EST_ROBO().kit }].concat(EXPERIMENTOS.map(x => ({ nome: '🧪 ' + x.nome, n: EST_ROBO().feitos[x.id] ? 1 : 0, meta: 1, ok: !!EST_ROBO().feitos[x.id] }))),
      boasVindas: () => dialogo('🤖', 'Oficina de Robótica', `<p>Bem-vindo à oficina! Na <b>bancada</b> você monta circuitos com bateria, LEDs, resistores, motor, campainha e sensores, e vê a corrente passar.</p><p>${EST_ROBO().kit ? 'Você já tem o kit: vá até a bancada. Componentes novos estão no balcão 🛒.' : `Para começar, compre o <b>🧰 Kit Iniciante</b> (${KIT_ROBO.preco} ⭐) no balcão 🛒 da Loja de Componentes.`}</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }])
    },
    emat: {
      nome: 'Escape da Matemática', ic: '🧮', get sub() { const F = faseEM(); return `Fase ${Math.min(EST_EM().fase, EMAT.length - 1) + 1} de ${EMAT.length}: ${F.ic} ${F.nome} · sem cronômetro`; }, W: 8, D: 6, saida: { x: 4, y: 5.5 }, alturaParede: 2.5,
      fundo: '#20302a', base: '#4f7a5f', get parede() { return faseEM().parede; }, get piso() { return faseEM().piso; },
      estilo: { base: '#a8e6b8', telhado: '#3f7a52', porta: '#f6b73c', ic: '🧮', nome: 'Escape da Matemática' },
      local: () => localSala('emat'), estado: EST_EM, objs: objsEM, livre: (x, y) => livreObjs(SALAS.emat, x, y), usa: usaEmat, desenha: desenhaEmat,
      mini: (c, ox, oy, s) => { c.fillStyle = '#3f7a52'; for (const o of EMOBJ) c.fillRect(ox + o.x * s, oy + o.y * s, o.w * s, Math.max(4, o.d * s)); },
      missoes: () => { const E = EST_EM(), F = faseEM(), nf = Math.min(E.fase, EMAT.length - 1) + 1, fase = `Fase ${nf}/${EMAT.length} · `;
        return F.d.map((d, i) => [`${fase}${NUM_EM[i]} ${d.nome}${E['abc'[i]] ? ': ' + d.r : ''}`, E['abc'[i]]]).concat([[`${fase}Abrir o cofre`, E.cofre], [`Escapar das ${EMAT.length} fases`, E.fim]]).map(([nome, ok]) => ({ nome, n: ok ? 1 : 0, meta: 1, ok: !!ok })); },
      boasVindas: () => { const E = EST_EM(), F = faseEM();
        if (E.fim) return dialogo('🧮', 'Escape da Matemática', '<p>Você já escapou das 4 fases desta semana! Pode rever os desafios. Na segunda-feira chegam desafios novos.</p>', [{ txt: 'Combinado', classe: 'principal', fn: fechaDialogo }]);
        dialogo(F.ic, `Escape da Matemática · fase ${E.fase + 1} de ${EMAT.length}`, `<p>São <b>${EMAT.length} salas</b> seguidas: ${EMAT.map((f, i) => `${i === E.fase ? '<b>' : ''}${f.ic} ${f.nome}${i === E.fase ? '</b>' : ''}`).join(', ')}.</p><p>Em cada uma, a porta está trancada e a chave está num cofre de <b>3 algarismos</b>. Cada algarismo é a resposta de um desafio: ${F.d.map((d, i) => `${d.nome.toLowerCase()} ${NUM_EM[i]}`).join(', ')}. Nesta sala: <b>${F.temas.join(', ')}</b>.</p><p class="muted">Não tem cronômetro: pense com calma e use papel se quiser. O que você descobrir fica guardado, e os desafios mudam toda segunda-feira.</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }]); }
    },
    labirinto: {
      nome: 'Labirinto', ic: '🌀', sub: 'Portões com perguntas de Matemática', W: LAB.T, D: LAB.T, saida: { x: 1.5, y: LAB.T - 0.5 }, alturaParede: 0.9,
      fundo: '#cfe9c4', base: '#8a6a4a', parede: '#5aa85a', piso: ['#e9dcb5', '#f3e8c8'],
      estilo: { base: '#c9e8a8', telhado: '#4f9a4b', porta: '#c08a52', ic: '🌀', nome: 'Labirinto' },
      local: () => localSala('labirinto'), estado: EST_LAB, objs: objsLab, livre: livreLab, usa: usaLab, desenha: desenhaLab,
      mini: (c, ox, oy, s) => { c.fillStyle = '#4f9a4b'; for (let y = 0; y < LAB.T; y++) for (let x = 0; x < LAB.T; x++) if (LAB.parede[y][x]) c.fillRect(ox + x * s, oy + y * s, Math.ceil(s), Math.ceil(s)); const E = EST_LAB(); c.fillStyle = '#c08a52'; LAB.portoes.forEach(([x, y], i) => { if (!E.abertos[i]) c.fillRect(ox + x * s, oy + y * s, Math.ceil(s), Math.ceil(s)); }); c.fillStyle = '#f6b73c'; c.fillRect(ox + LAB.fim[0] * s, oy + LAB.fim[1] * s, Math.ceil(s), Math.ceil(s)); },
      missoes: () => { const E = EST_LAB(); return LAB.portoes.map((_, i) => [`Abrir o portão ${i + 1}`, E.abertos[i]]).concat([['Chegar ao troféu 🏆', E.fim]]).map(([nome, ok]) => ({ nome, n: ok ? 1 : 0, meta: 1, ok: !!ok })); },
      boasVindas: () => dialogo('🌀', 'Labirinto', `<p>Encontre o caminho até o <b>🏆 troféu</b>. No caminho há <b>${LAB.portoes.length} portões</b> trancados: cada um abre com uma pergunta de Matemática certa.</p><p class="muted">Use o minimapa no canto. O labirinto muda toda segunda-feira.</p>`, [{ txt: 'Vamos lá!', classe: 'principal', fn: fechaDialogo }])
    }
  };
  /* ---------- quebra-cabeça: 4 peças encaixadas liberam o jogo especial (um quebra-cabeça deslizante) ---------- */
  const ESP = { pecas: [], movs: 0, img: null, fim: false };
  function imagemEspecial() {
    if (ESP.img) return ESP.img;
    const c = document.createElement('canvas'); c.width = c.height = 300;
    const g = c.getContext('2d');
    const ceu = g.createLinearGradient(0, 0, 0, 300); ceu.addColorStop(0, '#cdeffa'); ceu.addColorStop(1, '#f9d3e3'); g.fillStyle = ceu; g.fillRect(0, 0, 300, 300);
    g.fillStyle = '#ffd84a'; g.beginPath(); g.arc(245, 55, 30, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 10; i++) { g.fillStyle = i % 2 ? '#8fdc78' : '#6fcf7f'; g.fillRect(i * 30, 240, 30, 60); g.fillStyle = '#a0703f'; g.fillRect(i * 30, 280, 30, 20); }
    g.fillStyle = '#f5a9c8'; g.fillRect(20, 150, 50, 50); g.fillStyle = '#a0703f'; g.fillRect(38, 200, 14, 40);
    // robozinho
    g.fillStyle = '#a8e6b8'; g.fillRect(110, 140, 80, 90); g.fillStyle = '#c9efd9'; g.fillRect(115, 80, 70, 60);
    g.fillStyle = '#2b6cb0'; g.fillRect(130, 100, 12, 12); g.fillRect(158, 100, 12, 12); g.fillStyle = '#e0564a'; g.fillRect(138, 122, 24, 6);
    g.fillStyle = '#888'; g.fillRect(147, 55, 6, 25); g.fillStyle = '#e0564a'; g.fillRect(142, 45, 16, 12);
    g.fillStyle = '#9fe3dc'; g.fillRect(90, 150, 20, 55); g.fillRect(190, 150, 20, 55); g.fillStyle = '#4a5560'; g.fillRect(122, 230, 20, 12); g.fillRect(158, 230, 20, 12);
    g.fillStyle = '#ffffff'; g.font = '700 22px monospace'; g.fillText('0101', 125, 185); g.font = '700 26px Sniglet, sans-serif'; g.fillStyle = '#5b3f8f'; g.fillText('</>', 25, 50);
    return (ESP.img = c);
  }
  const resolvido = () => ESP.pecas.every((p, i) => p === i);
  function embaralha() {
    ESP.pecas = [0, 1, 2, 3, 4, 5, 6, 7, 8]; ESP.movs = 0; ESP.fim = false;
    let vazio = 8, ant = -1;
    for (let k = 0; k < 120; k++) {
      const viz = vizinhos(vazio).filter(v => v !== ant), v = viz[Math.floor(Math.random() * viz.length)];
      [ESP.pecas[vazio], ESP.pecas[v]] = [ESP.pecas[v], ESP.pecas[vazio]]; ant = vazio; vazio = v;
    }
    if (resolvido()) embaralha();
  }
  function vizinhos(i) { const x = i % 3, y = Math.floor(i / 3), out = []; if (x > 0) out.push(i - 1); if (x < 2) out.push(i + 1); if (y > 0) out.push(i - 3); if (y < 2) out.push(i + 3); return out; }
  function desenhaEspecial() {
    const c = $('#esp-cv'), g = c.getContext('2d'), img = imagemEspecial();
    g.fillStyle = '#3b2f45'; g.fillRect(0, 0, 300, 300);
    ESP.pecas.forEach((p, i) => {
      if (p === 8 && !ESP.fim) return;
      const dx = (i % 3) * 100, dy = Math.floor(i / 3) * 100;
      g.drawImage(img, (p % 3) * 100, Math.floor(p / 3) * 100, 100, 100, dx + 1, dy + 1, 98, 98);
      if (!ESP.fim) { g.fillStyle = 'rgba(255,255,255,.85)'; g.fillRect(dx + 4, dy + 4, 20, 18); g.fillStyle = '#3b2f45'; g.font = '700 13px Lexend, sans-serif'; g.textAlign = 'center'; g.fillText(p + 1, dx + 14, dy + 17); }
    });
    $('#esp-movs').textContent = ESP.fim ? `Resolvido em ${ESP.movs} movimentos! 🎉` : `Movimentos: ${ESP.movs}`;
  }
  function moveEspecial(i) {
    if (ESP.fim) return;
    const vazio = ESP.pecas.indexOf(8);
    if (!vizinhos(vazio).includes(i)) return;
    [ESP.pecas[vazio], ESP.pecas[i]] = [ESP.pecas[i], ESP.pecas[vazio]]; ESP.movs++;
    if (resolvido()) {
      ESP.fim = true;
      const primeira = !S.especial; S.especial = (S.especial || 0) + 1;
      if (primeira) { S.inv.diamante = (S.inv.diamante || 0) + 2; pontos(50, '🧩 Jogo especial vencido! +2 💎'); } else pontos(10, '🧩 Resolvido de novo!');
      $('#esp-fim').hidden = false; salvar();
    }
    desenhaEspecial();
  }
  function janelaEspecial() { embaralha(); $('#esp-fim').hidden = true; desenhaEspecial(); }
  function encaixaPeca() { if (!(S.inv.peca > 0) || S.quebra >= 4) return; S.inv.peca--; S.quebra++; salvar(); if (S.quebra === 4) pontos(20, '🧩 Quebra-cabeça completo! O jogo especial está liberado.'); inventario(); }
  /* ---------- datas comemorativas e aniversários da computação ----------
     Um evento começa 2 semanas antes da data e termina 1 semana depois. Para testar outra data: /mundo/?data=2026-12-20 */
  const HOJE = new Date(HOJE0);
  const DIA = 864e5, somaDias = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const ddmm = d => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
  function pascoa(Y) {   // domingo de Páscoa (algoritmo de Meeus/Jones/Butcher)
    const a = Y % 19, b = Math.floor(Y / 100), c = Y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    return new Date(Y, Math.floor((h + l - 7 * m + 114) / 31) - 1, ((h + l - 7 * m + 114) % 31) + 1);
  }
  const EVENTOS = [
    { id: 'anonovo', nome: 'Ano Novo', ic: '🎆', data: Y => new Date(Y, 0, 1), item: ['🎆', 'Estrelinha de Ano Novo'], decor: ['fogos', 'confete'], movel: 'bolaEspelhada', texto: 'Fogos no céu da vila! Junte as estrelinhas e comece o ano aprendendo.' },
    { id: 'carnaval', nome: 'Carnaval', ic: '🎭', data: Y => somaDias(pascoa(Y), -47), item: ['🎭', 'Máscara'], decor: ['confete', 'bandeiras'], movel: 'tambor', texto: 'A vila virou bloco de Carnaval! Encontre as máscaras escondidas.' },
    { id: 'pascoa', nome: 'Páscoa', ic: '🐣', data: pascoa, item: ['🥚', 'Ovo colorido'], decor: ['ovos'], movel: 'ovao', texto: 'Ovos coloridos apareceram pelas vilas. Quem acha mais?' },
    { id: 'junina', nome: 'Festa Junina', ic: '🌽', data: Y => new Date(Y, 5, 24), item: ['🌽', 'Milho'], decor: ['bandeiras', 'baloes'], movel: 'balaoJunino', texto: 'Arraiá na vila! Bandeirinhas, balões e milho para colher.' },
    { id: 'criancas', nome: 'Dia das Crianças', ic: '🪁', data: Y => new Date(Y, 9, 12), item: ['🎈', 'Balão'], decor: ['baloes', 'confete'], movel: 'pipa', texto: 'Festa das crianças: balões por todo lado!' },
    { id: 'professor', nome: 'Dia do Professor', ic: '🍎', data: Y => new Date(Y, 9, 15), item: ['✏️', 'Lápis'], decor: ['bandeiras'], movel: 'lousa', texto: 'Homenagem a quem ensina! Recolha os lápis espalhados pela vila.' },
    { id: 'saci', nome: 'Dia do Saci e Halloween', ic: '🎃', data: Y => new Date(Y, 9, 31), item: ['🎃', 'Abóbora'], decor: ['abobora', 'noite'], movel: 'abobora', texto: 'O Saci passou por aqui e espalhou abóboras pelas vilas. Ache todas!' },
    { id: 'natal', nome: 'Natal', ic: '🎄', data: Y => new Date(Y, 11, 25), item: ['🎁', 'Presente'], decor: ['luzes', 'confete'], movel: 'pinheiro', texto: 'Luzes de Natal nas árvores e presentes escondidos pelas vilas.' }
  ];
  const eventosAtivos = (() => {
    const out = [];
    for (const ev of EVENTOS) for (const Y of [HOJE.getFullYear() - 1, HOJE.getFullYear(), HOJE.getFullYear() + 1]) {
      const d = ev.data(Y), ini = somaDias(d, -14), fim = somaDias(d, 7);
      if (HOJE >= ini && HOJE <= fim) out.push(Object.assign({}, ev, { chave: `${ev.id}-${Y}`, dataEv: d, ini, fim }));
    }
    return out;
  })();
  const DECOR = new Set(eventosAtivos.flatMap(e => e.decor));
  eventosProntos = true;
  const estEv = ev => S.eventos[ev.chave] || (S.eventos[ev.chave] = { itens: {}, acertos: 0, conversas: 0, ganhou: false });
  const metaItensEv = () => Math.min(9, 3 * fases.filter(liberada).length);
  function missoesEvento(ev) {
    const E = estEv(ev);
    return [
      { nome: `Achar ${metaItensEv()} ${ev.item[0]} pelas vilas`, n: Object.keys(E.itens).length, meta: metaItensEv() },
      { nome: 'Acertar 5 perguntas', n: E.acertos, meta: 5 },
      { nome: 'Conversar com 3 moradores (um por dia cada)', n: E.conversas, meta: 3 }
    ].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  function contaEvento(campo) { for (const ev of eventosAtivos) { estEv(ev)[campo]++; } }
  function premioEvento(ev) {
    const E = estEv(ev);
    if (E.ganhou || !missoesEvento(ev).every(m => m.ok)) return;
    E.ganhou = true; S.casa.guardados[ev.movel] = (S.casa.guardados[ev.movel] || 0) + 1; S.casa.feitos[ev.movel] = true;
    S.medalhas[ev.chave] = { ic: ev.ic, nome: `${ev.nome} ${ev.dataEv.getFullYear()}` };
    pontos(50, `${ev.ic} Missão de ${ev.nome} completa! Você ganhou ${MOVEIS[ev.movel].ic} ${MOVEIS[ev.movel].nome} para a sua casa.`); setTimeout(() => ganhaFigurinha(null, 'pela missão de ' + ev.nome), 1800);
    salvar(); janelaEvento();
  }
  /* itens do evento: 3 por vila, sempre nos mesmos lugares durante o evento */
  function itensEvento(f) {
    const out = [];
    eventosAtivos.forEach((ev, e) => {
      const r = rng(7000 + f.idx * 37 + e * 991 + ev.dataEv.getFullYear());
      let tent = 0;
      while (out.filter(o => o.ev === ev).length < 3 && tent++ < 400) {
        const x = Math.floor(r() * f.L), y = Math.floor(r() * ALT), p = y * f.L + x;
        if (f.sol[p] || f.tile[p] === T.agua || out.concat(f.itens).some(o => Math.hypot(o.x - x, o.y - y) < 4)) continue;
        out.push({ id: `${f.id}-${ev.chave}-${out.length}`, x: x + 0.5, y: y + 0.5, ev });
      }
    });
    return out;
  }
  /* aniversários: um desafio de 3 perguntas no dia; acertando as três, a medalha é sua */
  const PESSOAS = [
    ['ada', 'Ada Lovelace', 1815, 12, 10, 'escreveu o primeiro algoritmo pensado para uma máquina', ['O que é um algoritmo?', ['Uma sequência de passos para resolver um problema', 'Uma peça do computador', 'Um tipo de tela'], 0]],
    ['babbage', 'Charles Babbage', 1791, 12, 26, 'projetou a Máquina Analítica, a avó dos computadores', ['O que uma máquina programável faz?', ['Segue instruções diferentes conforme o programa', 'Faz sempre a mesma coisa', 'Só funciona com eletricidade solar'], 0]],
    ['hopper', 'Grace Hopper', 1906, 12, 9, 'criou um dos primeiros compiladores e ajudou a criar a linguagem COBOL', ['O que um compilador faz?', ['Traduz o programa para a linguagem da máquina', 'Desenha a tela', 'Guarda fotos'], 0]],
    ['turing', 'Alan Turing', 1912, 6, 23, 'criou a máquina de Turing e o teste de Turing, base da computação e da IA', ['O teste de Turing verifica se...', ['uma máquina conversa como uma pessoa', 'a internet está rápida', 'o computador está quente'], 0]],
    ['bernerslee', 'Tim Berners-Lee', 1955, 6, 8, 'inventou a World Wide Web (WWW)', ['O que é um link (hiperlink)?', ['Uma ligação de uma página para outra', 'Um vírus', 'Um tipo de cabo'], 0]],
    ['hamilton', 'Margaret Hamilton', 1936, 8, 17, 'liderou o software de voo da missão Apollo 11, que levou pessoas à Lua', ['Por que testar um programa antes de usar?', ['Para achar e corrigir erros (bugs)', 'Para deixar mais lento', 'Para gastar memória'], 0]],
    ['kjohnson', 'Katherine Johnson', 1918, 8, 26, 'calculou as trajetórias de voos espaciais da NASA', ['Quanto é 25% de 80?', ['20', '25', '40'], 0]],
    ['boole', 'George Boole', 1815, 11, 2, 'criou a álgebra booleana, com verdadeiro e falso', ['Se A é verdadeiro e B é falso, “A E B” é...', ['falso', 'verdadeiro', 'as duas coisas'], 0]],
    ['shannon', 'Claude Shannon', 1916, 4, 30, 'criou a teoria da informação e mostrou o poder do bit', ['Quantos valores diferentes cabem em 3 bits?', ['8', '3', '6'], 0]],
    ['ritchie', 'Dennis Ritchie', 1941, 9, 9, 'criou a linguagem C e ajudou a criar o sistema Unix', ['Uma linguagem de programação serve para...', ['escrever instruções para o computador', 'conversar só com pessoas', 'pintar quadros'], 0]],
    ['lamarr', 'Hedy Lamarr', 1914, 11, 9, 'coinventou o salto de frequência, base de tecnologias como Wi-Fi e Bluetooth', ['O Wi-Fi transmite dados por...', ['ondas de rádio', 'canos de água', 'papel'], 0]],
    ['perlman', 'Radia Perlman', 1951, 12, 18, 'criou o protocolo STP, que organiza os caminhos dos dados nas redes', ['Na internet, os dados viajam divididos em...', ['pacotes', 'caixas de papelão', 'letras soltas'], 0]],
    ['landell', 'Roberto Landell de Moura', 1861, 1, 21, 'foi um padre gaúcho pioneiro na transmissão da voz por ondas de rádio', ['O rádio leva a voz de um lugar a outro usando...', ['ondas eletromagnéticas', 'fios de lã', 'pombos-correio'], 0]],
    ['mccarthy', 'John McCarthy', 1927, 9, 4, 'criou o termo “inteligência artificial”', ['Uma IA aprende principalmente a partir de...', ['muitos exemplos (dados)', 'sorte', 'pilhas novas'], 0]],
    ['dijkstra', 'Edsger Dijkstra', 1930, 5, 11, 'criou o famoso algoritmo do caminho mais curto', ['O GPS usa algoritmos para achar...', ['o caminho mais curto', 'a cor do carro', 'a música preferida'], 0]],
    ['liskov', 'Barbara Liskov', 1939, 11, 7, 'foi pioneira em linguagens de programação e abstração de dados', ['Abstrair é...', ['ignorar os detalhes que não importam', 'decorar tudo', 'apagar o programa'], 0]],
    ['knuth', 'Donald Knuth', 1938, 1, 10, 'escreveu a coleção “A Arte da Programação de Computadores”', ['Ordenar uma lista é...', ['colocar os itens em ordem', 'apagar a lista', 'misturar os itens'], 0]],
    ['allen', 'Frances Allen', 1932, 8, 4, 'foi a primeira mulher a ganhar o Prêmio Turing, por deixar os programas mais rápidos', ['Um programa otimizado é...', ['mais rápido ou gasta menos recursos', 'mais colorido', 'mais longo'], 0]],
    ['vaughan', 'Dorothy Vaughan', 1910, 9, 20, 'liderou matemáticas da NASA e ensinou a equipe a programar em FORTRAN', ['Quanto é 12 × 12?', ['144', '124', '132'], 0]],
    ['gwest', 'Gladys West', 1930, 10, 27, 'criou os modelos matemáticos da forma da Terra usados no GPS', ['O GPS descobre onde você está usando...', ['sinais de satélites', 'o cheiro do lugar', 'a temperatura'], 0]],
    ['vonneumann', 'John von Neumann', 1903, 12, 28, 'descreveu o computador que guarda o programa na memória, usado até hoje', ['Onde ficam os programas que estão rodando agora?', ['na memória RAM', 'no mouse', 'no teclado'], 0]],
    ['easley', 'Annie Easley', 1933, 4, 23, 'foi programadora da NASA e trabalhou no foguete Centaur', ['Um bug é...', ['um erro no programa', 'um botão novo', 'um jogo'], 0]],
    ['wozniak', 'Steve Wozniak', 1950, 8, 11, 'projetou os computadores Apple I e Apple II', ['Qual destas é uma peça de hardware?', ['Processador', 'Navegador', 'Aplicativo de mensagens'], 0]]
  ].map(([id, nome, ano, mes, dia, feito, conceito]) => ({ id, nome, ano, mes, dia, feito, conceito }));
  const aniversariantes = PESSOAS.filter(p => p.mes === HOJE.getMonth() + 1 && p.dia === HOJE.getDate());
  /* ---------- álbum de figurinhas: uma figurinha por personalidade, em páginas de 6 ----------
     Figurinhas vêm dos desafios de aniversário (a da própria pessoa), dos aniversários dos moradores, das missões
     (fases, profissões, eventos, estações, oficina, projetos) e dos pacotinhos do Mercadinho. 3 repetidas viram 1 nova. */
  const PAGINAS_ALBUM = [];
  for (let i = 0; i < PESSOAS.length; i += 6) PAGINAS_ALBUM.push(PESSOAS.slice(i, i + 6));
  const CORES_FIG = ['#ffd58a', '#c7e8a5', '#f6c1d6', '#c9d7f2', '#e3cdf5', '#ffe0b3'];
  const temFig = id => (S.album.tem[id] || 0) > 0;
  const repetidas = () => Object.values(S.album.tem).reduce((a, n) => a + Math.max(0, n - 1), 0);
  function ganhaFigurinha(id, origem, sorteio) {
    SOM.toca('figurinha');
    const faltam = PESSOAS.filter(p => !temFig(p.id));
    // nas missões vem uma figurinha que falta; no pacotinho, qualquer uma (pode vir repetida)
    const p = id ? PESSOAS.find(q => q.id === id) : sorteio || !faltam.length ? PESSOAS[Math.floor(Math.random() * PESSOAS.length)] : faltam[Math.floor(Math.random() * faltam.length)];
    const nova = !temFig(p.id);
    S.album.tem[p.id] = (S.album.tem[p.id] || 0) + 1;
    aviso(`📒 Figurinha ${nova ? 'nova' : 'repetida'} ${origem}: ${p.nome}!`);
    confereAlbum(); salvar(); if (janelaAberta === 'album') janelaAlbum();
  }
  function confereAlbum() {
    PAGINAS_ALBUM.forEach((pg, i) => {
      if (S.album.paginas[i] || !pg.every(p => temFig(p.id))) return;
      S.album.paginas[i] = true; S.medalhas['album-p' + (i + 1)] = { ic: '📒', nome: `Página ${i + 1} do álbum` };
      setTimeout(() => pontos(50, `📒 Página ${i + 1} do álbum completa!`), 1500);
    });
    if (!S.album.completo && PESSOAS.every(p => temFig(p.id))) {
      S.album.completo = true; S.medalhas.album = { ic: '🏆', nome: 'Álbum completo' };
      setTimeout(() => pontos(200, '🏆 Você completou o álbum de figurinhas!'), 3000);
    }
  }
  const iniciais = nome => nome.split(' ').filter(w => w.length > 2 && w[0] === w[0].toUpperCase()).map(w => w[0]).slice(0, 2).join('');
  function janelaAlbum() {
    const el = $('#album-conteudo'), total = PESSOAS.filter(p => temFig(p.id)).length, rep = repetidas();
    el.innerHTML = `<p>Você tem <b>${total} de ${PESSOAS.length}</b> figurinhas e <b>${rep}</b> repetida${rep === 1 ? '' : 's'}. Cada página completa vale +50 ⭐ e uma medalha; o álbum inteiro vale +200 ⭐.</p>
      <div class="btn-row"><button type="button" class="hb verde" id="al-troca" ${rep >= 3 && total < PESSOAS.length ? '' : 'disabled'}>🔁 Trocar 3 repetidas por 1 nova</button></div>
      ${PAGINAS_ALBUM.map((pg, i) => `<section class="album-pag"><h3>Página ${i + 1} ${S.album.paginas[i] ? '✅' : `<small class="muted">(${pg.filter(p => temFig(p.id)).length}/${pg.length})</small>`}</h3><div class="figs">${pg.map((p, j) => temFig(p.id)
        ? `<div class="fig" style="--c:${CORES_FIG[(i + j) % CORES_FIG.length]}"><span class="fig-rosto">${iniciais(p.nome)}</span><b>${esc(p.nome)}</b><small>${p.ano} · 🎂 ${String(p.dia).padStart(2, '0')}/${String(p.mes).padStart(2, '0')}</small><span class="fig-txt">${esc(p.feito[0].toUpperCase() + p.feito.slice(1))}.</span>${S.album.tem[p.id] > 1 ? `<span class="fig-rep">×${S.album.tem[p.id]}</span>` : ''}</div>`
        : `<div class="fig falta"><span class="fig-rosto">?</span><b>Nº ${PESSOAS.indexOf(p) + 1}</b><small>🎂 ${String(p.dia).padStart(2, '0')}/${String(p.mes).padStart(2, '0')}</small></div>`).join('')}</div></section>`).join('')}
      <p class="muted small">Como ganhar: acerte o desafio de aniversário de uma personalidade (no dia dela), dê presente a um morador no aniversário dele, complete missões de fases, profissões, eventos, estações, a oficina de código e os projetos da turma, ou compre um pacotinho no 🍎 Mercadinho.</p>`;
    const t = $('#al-troca'); if (t) t.addEventListener('click', () => {
      if (repetidas() < 3) return;
      let tirar = 3;
      for (const id of Object.keys(S.album.tem)) while (tirar && S.album.tem[id] > 1) { S.album.tem[id]--; tirar--; }
      ganhaFigurinha(null, 'na troca'); janelaAlbum();
    });
  }
  const embaralhaAlts = (alts, certa) => { const ord = alts.map((a, i) => i).sort(() => Math.random() - 0.5); return { alts: ord.map(i => alts[i]), certa: ord.indexOf(certa) }; };
  function desafioAniversario(p) {
    const outros = PESSOAS.filter(o => o !== p).sort(() => Math.random() - 0.5).slice(0, 2);
    const anos = [p.ano, p.ano + 10 + Math.floor(Math.random() * 20), p.ano - 10 - Math.floor(Math.random() * 20)].map(String);
    const qs = [
      Object.assign({ enun: `O que ${p.nome} fez?` }, embaralhaAlts([p.feito, outros[0].feito, outros[1].feito].map(t => t[0].toUpperCase() + t.slice(1)), 0)),
      Object.assign({ enun: `Em que ano ${p.nome} nasceu?` }, embaralhaAlts(anos, 0)),
      Object.assign({ enun: p.conceito[0] }, embaralhaAlts(p.conceito[1], p.conceito[2]))
    ];
    let acertos = 0;
    const passo = i => {
      if (i >= qs.length) {
        const chave = `${p.id}-${HOJE.getFullYear()}`;
        if (acertos === 3 && !S.medalhas[chave]) { S.medalhas[chave] = { ic: '🏅', nome: `${p.nome} (${ddmm(HOJE)}/${HOJE.getFullYear()})` }; pontos(40); ganhaFigurinha(p.id, 'pelo desafio de aniversário'); salvar(); }
        return dialogo(acertos === 3 ? '🏅' : '🎂', acertos === 3 ? 'Medalha conquistada!' : 'Quase!', acertos === 3 ? `<p>Você acertou as 3 e ganhou a <strong>medalha de ${esc(p.nome)}</strong> (+40 ⭐). Ela fica no seu inventário.</p>` : `<p>Você acertou ${acertos} de 3. Para ganhar a medalha, acerte as três. Pode tentar de novo hoje!</p>`,
          [{ txt: acertos === 3 ? 'Oba!' : 'Tentar de novo', classe: 'principal', fn: () => acertos === 3 ? fechaDialogo() : desafioAniversario(p) }, { txt: 'Fechar', fn: fechaDialogo }]);
      }
      const q = qs[i];
      dialogo('🎂', `Desafio de ${p.nome} · ${i + 1}/3`, `<p>${esc(q.enun)}</p>`, q.alts.map((a, j) => ({ txt: a, fn: () => {
        if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
        if (j === q.certa) acertos++;
        [...D.op.children].forEach((b, k) => { b.disabled = true; if (k === q.certa) b.classList.add('certa'); else if (k === j) b.classList.add('errada'); });
        const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Continuar'; b.addEventListener('click', () => passo(i + 1)); D.op.appendChild(b); b.focus();
      } })));
      delete D.op.dataset.respondida;
    };
    passo(0);
  }
  function janelaEvento() {
    const el = $('#evento-conteudo');
    el.innerHTML = htmlEstacao() + eventosAtivos.map(ev => {
      const ms = missoesEvento(ev), E = estEv(ev), M = MOVEIS[ev.movel];
      return `<section class="ev"><h3>${ev.ic} ${esc(ev.nome)} <small class="muted">· de ${ddmm(ev.ini)} a ${ddmm(ev.fim)}</small></h3><p>${esc(ev.texto)}</p>
        <ul class="ev-m">${ms.map(m => `<li class="${m.ok ? 'ok' : ''}">${m.ok ? '✅' : '⬜'} ${esc(m.nome)} <small>(${Math.min(m.n, m.meta)}/${m.meta})</small></li>`).join('')}</ul>
        <p class="muted small">Prêmio: ${M.ic} ${esc(M.nome)} para a sua casa, +50 ⭐ e a medalha do evento.</p>
        ${E.ganhou ? '<p><strong>✅ Prêmio recebido!</strong></p>' : `<button type="button" class="hb verde" data-premio="${ev.chave}" ${ms.every(m => m.ok) ? '' : 'disabled'}>🎁 Receber o prêmio</button>`}</section>`;
    }).join('') + aniversariantes.map(p => {
      const tem = S.medalhas[`${p.id}-${HOJE.getFullYear()}`];
      return `<section class="ev"><h3>🎂 Hoje é aniversário de ${esc(p.nome)}</h3><p>${esc(p.nome)} nasceu em ${ddmm(new Date(p.ano, p.mes - 1, p.dia))}/${p.ano} e ${esc(p.feito)}.</p>
        <p class="muted small">Desafio do dia: acerte 3 perguntas sobre essa pessoa e ganhe uma medalha que só sai hoje.</p>
        ${tem ? '<p><strong>🏅 Medalha conquistada!</strong></p>' : `<button type="button" class="hb verde" data-desafio="${p.id}">🎂 Fazer o desafio</button>`}</section>`;
    }).join('');
    el.querySelectorAll('[data-premio]').forEach(b => b.addEventListener('click', () => premioEvento(eventosAtivos.find(e => e.chave === b.dataset.premio))));
    el.querySelectorAll('[data-desafio]').forEach(b => b.addEventListener('click', () => { fechaJanela(); desafioAniversario(PESSOAS.find(p => p.id === b.dataset.desafio)); }));
    ligaEstacao(el);
  }
  /* estação: missão de coletar os itens da época e ler o boletim do tempo */
  const estEst = () => S.estacoes[ESTACAO.chave] || (S.estacoes[ESTACAO.chave] = { itens: 0, boletim: false, ganhou: false });
  function missoesEstacao() {
    const E = estEst();
    return [{ nome: `Coletar 6 ${ITENS[ESTACAO.item][0]} ${ITENS[ESTACAO.item][1].toLowerCase()} pelas vilas`, n: E.itens, meta: 6 }, { nome: 'Ler o boletim do tempo', n: E.boletim ? 1 : 0, meta: 1 }].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  function boletim() {
    const base = { verao: 28, outono: 21, inverno: 14, primavera: 23 }[ESTACAO.id], dias = ['seg', 'ter', 'qua', 'qui', 'sex'];
    const t = dias.map(() => base + Math.floor(Math.random() * 9) - 4), tipo = Math.floor(Math.random() * 3);
    const max = Math.max(...t), min = Math.min(...t), soma = t.reduce((a, b) => a + b, 0);
    if (soma % 5) t[4] += 5 - (soma % 5);   // média inteira
    const media = t.reduce((a, b) => a + b, 0) / 5, mx = Math.max(...t), mn = Math.min(...t);
    const q = [{ enun: 'Qual foi a maior temperatura da semana?', certa: mx, erradas: [mn, Math.round(media), mx + 2] },
      { enun: 'Qual é a amplitude térmica (maior menos menor temperatura)?', certa: mx - mn, erradas: [mx + mn, mx, mx - mn + 2] },
      { enun: 'Qual é a temperatura média da semana?', certa: media, erradas: [mx, mn, media + 3] }][tipo];
    const alts = [q.certa]; for (const e of q.erradas) if (alts.length < 4 && !alts.includes(e)) alts.push(e);
    alts.sort(() => Math.random() - 0.5);
    dialogo('📰', 'Boletim do tempo', `<p>Temperaturas máximas da semana (°C):</p><table class="em-tab"><tr>${dias.map(d => `<th>${d}</th>`).join('')}</tr><tr>${t.map(v => `<td>${v}</td>`).join('')}</tr></table><p>${q.enun}</p>`, alts.map(a => ({ txt: `${a} °C`, fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = a === q.certa;
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (alts[j] === q.certa) b.classList.add('certa'); else if (alts[j] === a) b.classList.add('errada'); });
      if (certo) { estEst().boletim = true; ganhaHabilidade(['PE'], 10); salvar(); }
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso! Meteorologistas usam essas contas o tempo todo.' : '❌ Não foi dessa vez. Leia a tabela com calma.'}</strong></p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = certo ? 'Voltar' : 'Outro boletim';
      b.addEventListener('click', () => { if (certo) { fechaDialogo(); abreJanela('evento'); } else boletim(); }); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  function htmlEstacao() {
    const ms = missoesEstacao(), E = estEst();
    return `<section class="ev"><h3>${ESTACAO.ic} ${ESTACAO.nome} · hoje: ${CLIMA.ic} ${CLIMA.nome}</h3><p>${esc(ESTACAO.texto)} ${esc(CLIMA.efeito)}</p>
      <ul class="ev-m">${ms.map(m => `<li class="${m.ok ? 'ok' : ''}">${m.ok ? '✅' : '⬜'} ${esc(m.nome)} <small>(${Math.min(m.n, m.meta)}/${m.meta})</small></li>`).join('')}</ul>
      <div class="btn-row">${E.boletim ? '' : '<button type="button" class="hb azul" id="b-boletim">📰 Ler o boletim do tempo</button>'}
      ${E.ganhou ? '<strong>✅ Medalha da estação recebida!</strong>' : `<button type="button" class="hb verde" id="b-premio-est" ${ms.every(m => m.ok) ? '' : 'disabled'}>🎁 Receber o prêmio</button>`}</div>
      <p class="muted small">Prêmio: +40 ⭐ e a medalha da estação. O clima muda todo dia; a estação muda a cada 3 meses (as do hemisfério sul).</p></section>`;
  }
  function ligaEstacao(el) {
    const b = el.querySelector('#b-boletim'); if (b) b.addEventListener('click', () => { fechaJanela(); boletim(); });
    const p = el.querySelector('#b-premio-est'); if (p) p.addEventListener('click', () => { const E = estEst(); if (E.ganhou || !missoesEstacao().every(m => m.ok)) return; E.ganhou = true; S.medalhas['estacao-' + ESTACAO.chave] = { ic: ESTACAO.ic, nome: `${ESTACAO.nome} ${ESTACAO.chave.split('-')[1]}` }; pontos(40, `${ESTACAO.ic} Missão do ${ESTACAO.nome.toLowerCase()} completa!`); setTimeout(() => ganhaFigurinha(null, 'pela missão da estação'), 1800); salvar(); janelaEvento(); });
  }
  /* clima por cima do mundo: chuva, nuvens, neblina, vento com folhas e um brilho de sol */
  /* acessibilidade: menos movimento (segue a preferência do sistema até a pessoa escolher), letra maior e leitor de tela */
  const ACESS = (() => { const CH = 'mundo-acess-v1', sis = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
    let p = { calmo: sis, letra: false }; try { p = Object.assign(p, JSON.parse(localStorage.getItem(CH)) || {}); } catch (e) {}
    const aplica = () => { document.body.classList.toggle('calmo', !!p.calmo); document.body.classList.toggle('letra-grande', !!p.letra); };
    aplica();
    return { p: () => p, liga(k, v) { p[k] = v; try { localStorage.setItem(CH, JSON.stringify(p)); } catch (e) {} aplica(); } };
  })();
  let semMovimento = ACESS.p().calmo;
  let ultimoAnuncio = '';
  function anuncia(txt) {   // fala para o leitor de tela o que está perto (só quando muda)
    if (txt === ultimoAnuncio) return; ultimoAnuncio = txt;
    const el = $('#leitor'); if (el) el.textContent = txt ? txt.replace(/E · /, 'Aperte E para ') : '';
  }
  function climaTela(vw, vh) {
    const id = CLIMA.id, mexe = !semMovimento;
    if (id === 'chuva') {
      ctx.fillStyle = 'rgba(60,80,110,.12)'; ctx.fillRect(cam.x, cam.y, vw, vh);
      if (mexe) { ctx.strokeStyle = 'rgba(200,220,255,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = 0, n = leve ? 30 : 90; i < n; i++) { const x = cam.x + ((i * 97 + agora * 0.25) % (vw + 60)) - 30, y = cam.y + ((i * 53 + agora * 0.9 * (1 + i % 3 / 3)) % (vh + 40)) - 20; ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 14); } ctx.stroke(); }
    } else if (id === 'nublado') {
      for (let i = 0; i < 4; i++) { const x = cam.x + ((i * 420 + agora * 0.012 * (mexe ? 1 : 0)) % (vw + 600)) - 300, y = cam.y + (i * 173) % vh; const g = ctx.createRadialGradient(x, y, 20, x, y, 260); g.addColorStop(0, 'rgba(40,50,70,.16)'); g.addColorStop(1, 'rgba(40,50,70,0)'); ctx.fillStyle = g; ctx.fillRect(x - 260, y - 260, 520, 520); }
    } else if (id === 'neblina') {
      const g = ctx.createLinearGradient(0, cam.y, 0, cam.y + vh); g.addColorStop(0, 'rgba(255,255,255,.55)'); g.addColorStop(0.5, 'rgba(255,255,255,.22)'); g.addColorStop(1, 'rgba(255,255,255,.35)'); ctx.fillStyle = g; ctx.fillRect(cam.x, cam.y, vw, vh);
    } else if (id === 'vento' && mexe) {
      for (let i = 0, n = leve ? 10 : 28; i < n; i++) { const x = cam.x + ((i * 131 + agora * 0.12 * (1 + i % 4 / 4)) % (vw + 40)) - 20, y = cam.y + ((i * 71) % vh) + Math.sin(agora / 400 + i) * 14; ctx.fillStyle = ESTACAO.folhas[i % 3]; ctx.save(); ctx.translate(x, y); ctx.rotate(agora / 300 + i); ctx.fillRect(-4, -2, 8, 4); ctx.restore(); }
    } else if (id === 'sol') {
      const g = ctx.createRadialGradient(cam.x + vw * 0.85, cam.y, 10, cam.x + vw * 0.85, cam.y, vh * 0.9); g.addColorStop(0, 'rgba(255,236,160,.28)'); g.addColorStop(1, 'rgba(255,236,160,0)'); ctx.fillStyle = g; ctx.fillRect(cam.x, cam.y, vw, vh);
    }
  }
  /* enfeites desenhados por cima do mundo, no espaço da tela */
  function enfeitesTela(vw, vh) {
    if (leve) return;
    if (DECOR.has('confete')) for (let i = 0; i < 40; i++) {
      const x = cam.x + ((i * 137 + agora * 0.03 * (1 + i % 3)) % (vw + 40)) - 20, y = cam.y + ((i * 89 + agora * 0.05 * (1 + i % 2)) % (vh + 40)) - 20;
      ctx.fillStyle = ['#ff5a8a', '#ffd84a', '#5ad1ff', '#7dff8a', '#c7a6ff'][i % 5]; ctx.fillRect(x, y, 5, 3);
    }
    if (DECOR.has('fogos')) for (let k = 0; k < 3; k++) {
      const t = ((agora / 1600) + k / 3) % 1, cx = cam.x + vw * (0.2 + 0.3 * k), cy = cam.y + vh * (0.15 + 0.08 * (k % 2));
      ctx.globalAlpha = 1 - t; ctx.fillStyle = ['#ffd84a', '#ff5a8a', '#5ad1ff'][k];
      for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 60 * t, cy + Math.sin(a) * 60 * t, 3, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
  }
  function bandeirinhas(f) {
    if (!DECOR.has('bandeiras')) return;
    const cores = ['#e0564a', '#ffd84a', '#3f8fe0', '#4bb259', '#e07bb0'];
    for (const [ax, ay, bx, by] of [[0, MEIO - 0.5, f.L, MEIO - 0.5], [MEIO - 0.5, 0, MEIO - 0.5, ALT]]) {
      const n = Math.floor(Math.hypot(bx - ax, by - ay) / 0.8);
      for (let i = 0; i < n; i++) {
        const t = i / n, x = ax + (bx - ax) * t, y = ay + (by - ay) * t, z = 2.6 - Math.abs(Math.sin(t * Math.PI * 8)) * 0.4;
        const [sx, sy] = iso(x, y, z);
        if (sx < cam.x - 20 || sx > cam.x + W / zoom + 20 || sy < cam.y - 20 || sy > cam.y + HH / zoom + 20) continue;
        ctx.fillStyle = cores[i % cores.length]; ctx.beginPath(); ctx.moveTo(sx - 5, sy); ctx.lineTo(sx + 5, sy); ctx.lineTo(sx, sy + 9); ctx.closePath(); ctx.fill();
      }
    }
  }
  function missoesCasa() {
    const feitos = Object.keys(S.casa.feitos).length, novos = S.casa.moveis.filter(m => !MOVEIS[m.id].inicial).length;
    return [
      { nome: 'Construir o primeiro móvel', n: Math.min(feitos, 1), meta: 1 },
      { nome: 'Decorar com 3 móveis novos', n: novos, meta: 3 },
      { nome: 'Construir 8 móveis diferentes', n: feitos, meta: 8 },
      { nome: 'Construir o telescópio', n: S.casa.feitos.telescopio ? 1 : 0, meta: 1 },
      { nome: 'Adotar um pet', n: S.pet ? 1 : 0, meta: 1 }
    ].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  function desenhaInterior() {
    const vw = W / zoom, vh = HH / zoom;
    const fundo = ctx.createLinearGradient(0, cam.y, 0, cam.y + vh); fundo.addColorStop(0, '#f6ecff'); fundo.addColorStop(1, '#ffe9f2');
    ctx.fillStyle = fundo; ctx.fillRect(cam.x, cam.y, vw, vh);
    // a casa vista como casa de bonecas: piso sobre uma base, duas paredes ao fundo
    caixa(0, 0, -0.5, CW, CD, 0.5, '#d9b38c', { blocos: false });
    for (let y = 0; y < CD; y++) for (let x = 0; x < CW; x++) {
      const c = COMODOS.find(r => x < r.x1), cor = c.nome === 'Cozinha' && (x + y) % 2 ? '#ffffff' : c.chao;
      const [sx, sy] = iso(x, y); ctx.drawImage(textura(cor, (x * 7 + y * 3) % 4), sx - TW / 2, sy);
    }
    for (const r of COMODOS) {
      const x = r.x0 === 0 ? -0.25 : r.x0;
      caixa(x, -0.25, 0, r.x1 - x, 0.25, 2.4, r.parede, { blocos: false, topo: '#fff7e8' });
      naFace('y', x, -0.25, r.x1 - x, 0.25, 0, 0, r.x1 - x, 0, 0.3, escuro(r.parede, 0.12));
    }
    caixa(-0.25, 0, 0, 0.25, CD, 2.4, COMODOS[0].parede, { blocos: false, dir: escuro(COMODOS[0].parede, 0.05), topo: '#fff7e8' });
    naFace('x', -0.25, 0, 0.25, CD, 0, 0, CD, 0, 0.3, escuro(COMODOS[0].parede, 0.15));
    for (const a of [0.6, 6.9, 11.9, 15.4, 19.4].filter(a => a < CW)) { naFace('y', 0, -0.25, CW, 0.25, a, 0, 1, 1, 0.9, '#ffffff'); naFace('y', 0, -0.25, CW, 0.25, a + 0.08, 0, 0.84, 1.07, 0.76, '#bfe9ff'); naFace('y', 0, -0.25, CW, 0.25, a + 0.47, 0, 0.06, 1.07, 0.76, '#ffffff'); }
    naFace('x', -0.25, 0, 0.25, CD, 4.5, 0, 1.2, 1, 0.9, '#ffffff'); naFace('x', -0.25, 0, 0.25, CD, 4.58, 0, 1.04, 1.07, 0.76, '#bfe9ff');
    for (const r of COMODOS) { const [sx, sy] = iso((r.x0 + r.x1) / 2, -0.25, 2.75); rotulo(r.nome, sx, sy, '#fff7e8'); }
    // tapete da porta
    caixa(2.1, CD - 0.9, 0, 0.8, 0.8, 0.03, '#e0564a', { blocos: false });
    { const [sx, sy] = iso(SAIDA.x, SAIDA.y, 0.1); ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🚪', sx, sy); }
    // tapetes primeiro (ficam no chão), depois o resto pela profundidade
    const lista = [];
    for (const m of moveisAqui()) { const M = MOVEIS[m.id]; if (M.chao) M.des(m.x, m.y, m); else lista.push({ k: m.x + m.y + (M.w + M.d) / 2, d: () => M.des(m.x, m.y, m) }); }
    for (const px of PAREDES) for (let j = 0; j < CD; j++) if (j < 3 || j >= 6) lista.push({ k: px + j + 0.6, d: () => caixa(px - 0.1, j, 0, 0.2, 1, 0.9, '#fff7e8', { blocos: false }) });
    if (colocando) {
      const [tx, ty] = lugarColocar(), ok = podeColocar(colocando, tx, ty), M = MOVEIS[colocando];
      const pts = [iso(tx, ty), iso(tx + M.w, ty), iso(tx + M.w, ty + M.d), iso(tx, ty + M.d)];
      ctx.fillStyle = ok ? 'rgba(75,178,89,.3)' : 'rgba(224,86,74,.3)'; ctx.strokeStyle = ok ? '#4bb259' : '#e0564a'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); ctx.fill(); ctx.stroke();
      lista.push({ k: tx + ty + (M.w + M.d) / 2 + 0.01, d: () => { ctx.globalAlpha = 0.6; M.des(tx, ty, {}); ctx.globalAlpha = 1; } });
    }
    lista.push({ k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) });
    if (visita) lista.push({ k: NPC_CASA.x + NPC_CASA.y, d: () => desenhaPessoa(NPC_CASA.x, NPC_CASA.y, visita.av, { dir: 'y+' }) });
    if (S.pet && !visita) { const c = S.pet.dorme ? caminha() : PET; lista.push({ k: c.x + c.y - (S.pet.dorme ? 0.6 : 0), d: () => desenhaPet(c.x, c.y, S.pet, { dir: PET.dir, andando: PET.andando, passo: PET.passo, dorme: S.pet.dorme }) }); }
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(80,60,90,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    const alvo = !dialogoAberto && !colocando && alvoCasa();
    if (alvo) {
      const t = alvo.tipo === 'saida' ? 'E · sair de casa' : alvo.tipo === 'npc' ? `E · conversar com ${alvo.npc.nome}` : alvo.tipo === 'pet' ? `E · cuidar de ${S.pet.nome}` : `E · ${MOVEIS[alvo.movel.id].acao || 'ver'}`;
      const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(t, sx, sy - 10, '#1d2a1f', '#ffffff');
    }
    miniCasa();
  }
  function miniCasa() {
    miniFase = null; $('#mini-nome').textContent = visita ? `Casa de ${visita.nome}` : 'Sua casa';
    const s = Math.min(280 / CW, 180 / CD), ox = (300 - CW * s) / 2, oy = (200 - CD * s) / 2;
    mctx.fillStyle = '#1b2531'; mctx.fillRect(0, 0, 300, 200);
    for (const r of COMODOS) { mctx.fillStyle = r.chao; mctx.fillRect(ox + r.x0 * s, oy, (r.x1 - r.x0) * s, CD * s); }
    mctx.fillStyle = '#fff7e8'; for (const px of PAREDES) { mctx.fillRect(ox + px * s - 1.5, oy, 3, 3 * s); mctx.fillRect(ox + px * s - 1.5, oy + 6 * s, 3, 3 * s); }
    for (const m of moveisAqui()) { const M = MOVEIS[m.id]; mctx.fillStyle = M.chao ? 'rgba(199,180,242,.85)' : '#8a6a4a'; mctx.fillRect(ox + m.x * s + 1, oy + m.y * s + 1, M.w * s - 2, M.d * s - 2); }
    mctx.fillStyle = '#e0564a'; mctx.fillRect(ox + 2 * s, oy + (CD - 0.35) * s, s, 0.35 * s);
    mctx.fillStyle = '#3f8fe0'; mctx.beginPath(); mctx.arc(ox + P.x * s, oy + P.y * s, 5, 0, Math.PI * 2); mctx.fill();
  }

  /* ---------- quadro ---------- */
  let t0 = performance.now();
  function quadro(now) {
    const dt = Math.min(0.05, (now - t0) / 1000); t0 = now; agora = now;
    if (!document.hidden && !leve && ++desempenho.n > 1) { desempenho.t += dt; if (desempenho.n >= 120) { if (desempenho.t / desempenho.n > 0.034) { leve = true; ajusta(); } desempenho.n = desempenho.t = 0; } }
    if (!dialogoAberto && !janelaAberta) move(dt);
    movePet(dt);
    // moradores passeiam devagar pelo anel
    for (const n of atual.npcs) {
      const f = atual;
      if (dialogoAberto && dialogoNpc === n) continue;
      n.th += dt * 0.025; const rr = f.raioEm(n.th);
      const nx = f.x0 + f.cx + Math.cos(n.th) * rr, ny = f.cy + Math.sin(n.th) * rr;
      n.dir = Math.abs(nx - n.x) > Math.abs(ny - n.y) ? (nx > n.x ? 'x+' : 'x-') : (ny > n.y ? 'y+' : 'y-');
      n.andando = true; n.passo = (n.passo || 0) + dt * 8; n.x = nx; n.y = ny;
    }
    const [px, py] = iso(P.x, P.y);
    const vw = W / zoom, vh = HH / zoom;
    cam.x += (px - vw / 2 - cam.x) * Math.min(1, dt * 8); cam.y += (py - vh / 2 - 30 - cam.y) * Math.min(1, dt * 8);
    if (!cam.ok) { cam.x = px - vw / 2; cam.y = py - vh / 2 - 30; cam.ok = true; }
    ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, -cam.x * dpr * zoom, -cam.y * dpr * zoom);
    if (noEnigma) { desenhaEnigma(); requestAnimationFrame(quadro); return; }
    if (sala) { desenhaSala(); requestAnimationFrame(quadro); return; }
    if (dentro) { desenhaInterior(); requestAnimationFrame(quadro); return; }
    const ceu = ctx.createLinearGradient(0, cam.y, 0, cam.y + vh); ceu.addColorStop(0, DECOR.has('noite') ? '#b9a3e8' : '#cdeffa'); ceu.addColorStop(1, DECOR.has('noite') ? '#f3d9c4' : '#e8f7e4');
    ctx.fillStyle = ceu; ctx.fillRect(cam.x, cam.y, vw, vh);
    // chão: só os losangos que aparecem na tela
    const [ax, ay] = telaParaMapa(cam.x, cam.y), [bx, by] = telaParaMapa(cam.x + vw, cam.y), [cx2, cy2] = telaParaMapa(cam.x, cam.y + vh), [dx2, dy2] = telaParaMapa(cam.x + vw, cam.y + vh);
    const xmin = Math.max(0, Math.floor(Math.min(ax, bx, cx2, dx2)) - 1), xmax = Math.min(LARG - 1, Math.ceil(Math.max(ax, bx, cx2, dx2)) + 1);
    const ymin = Math.max(0, Math.floor(Math.min(ay, by, cy2, dy2)) - 1), ymax = Math.min(ALT - 1, Math.ceil(Math.max(ay, by, cy2, dy2)) + 1);
    const ondas = Math.floor(now / 450) % 4;
    for (let y = ymin; y <= ymax; y++) for (let x = xmin; x <= xmax; x++) {
      const sxp = (x - y) * TW / 2, syp = (x + y) * TH / 2;
      if (sxp < cam.x - TW || sxp > cam.x + vw + TW || syp < cam.y - TH || syp > cam.y + vh + TH) continue;
      const { f, t, v } = tileEm(x + 0.5, y + 0.5);
      const tex = t === T.caminho ? textura(f.caminho, v) : t === T.agua ? textura(COR_CHAO[t], (v + ondas) % 4, 'agua') : t === T.praca ? textura(COR_CHAO[t], v, 'praca') : textura(COR_CHAO[t], v);
      ctx.drawImage(tex, sxp - TW / 2, syp);
    }
    // borda do mundo (um degrau de terra dos lados que aparecem)
    if (!leve) for (const f of visiveisFases()) for (const fl of f.flores) { const [sx, sy] = iso(fl.x, fl.y); if (sx > cam.x - 10 && sx < cam.x + vw + 10 && sy > cam.y - 10 && sy < cam.y + vh + 10) { if (DECOR.has('ovos')) { ctx.fillStyle = fl.c === '#ffffff' ? '#a8d8f7' : fl.c; ctx.beginPath(); ctx.ellipse(sx, sy - 4, 4, 5.5, 0, 0, Math.PI * 2); ctx.fill(); } else { ctx.fillStyle = fl.c; ctx.fillRect(sx - 3, sy - 6, 6, 6); ctx.fillStyle = '#4f9a4b'; ctx.fillRect(sx - 1, sy, 2, 4); } } }
    // objetos ordenados pela profundidade (x + y)
    const lista = [], naTela = (x, y, m = 160) => { const [sx, sy] = iso(x, y); return sx > cam.x - m && sx < cam.x + vw + m && sy > cam.y - m && sy < cam.y + vh + m * 2; };
    const alvo = !dialogoAberto && alvoPerto();
    for (const f of visiveisFases()) {
      if (f.enigma) { const c = f.enigma; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaMinhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4, true) }); }
      if (f.portalTele) { const c = f.portalTele; lista.push({ k: c.gx + c.y + 2, d: () => desenhaPortalTele(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      for (const c of f.salas || []) lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaMinhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4, false, SALAS[c.id].estilo) });
      if (f.banco) { const c = f.banco; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaBanco(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      if (f.projetos) { const c = f.projetos; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaProjetos(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      if (f.loja) { const c = f.loja; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaLoja(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      if (f.minhaCasa) { const c = f.minhaCasa; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaMinhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      for (const c of f.casas) if (naTela(c.gx + 1.5, c.y + 1.5, 220)) lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) });
      for (const a of f.arvores) if (naTela(a.x, a.y)) lista.push({ k: a.x + a.y + 1, d: () => desenhaArvore(a) });
      for (const o of f.rochas || []) if (naTela(o.x, o.y)) lista.push({ k: o.x + o.y + 1, d: () => desenhaRocha(o) });
      lista.push({ k: f.centro.x + f.centro.y + 0.5, d: () => desenhaMarco(f) });
      lista.push({ k: f.placa.x + f.placa.y, d: () => desenhaPlaca(f) });
      for (const p of f.portais) lista.push({ k: p.x + p.y + 1.5, d: () => desenhaPortao(p) });
      for (const c of f.cercas) lista.push({ k: c.x + c.y + 1, d: () => desenhaCerca(c) });
      const pf = profDe(f); if (pf) { const q = posProf(f); lista.push({ k: q.x + q.y, d: () => { desenhaPessoa(q.x, q.y, pf.av, { dir: 'y+' }); const [sx, sy] = iso(q.x, q.y, 1.75); if (!estProf(pf).feito) balao(sx, sy - 6, pf.ic); if (Math.hypot(q.x - P.x, q.y - P.y) < 4) rotulo(`${pf.nome} · ${pf.prof}`, sx, sy - 52); } }); }
      for (const n of f.npcs) if (naTela(n.x, n.y)) lista.push({ k: n.x + n.y, d: () => { desenhaPessoa(n.x, n.y, n.av, n); const [sx, sy] = iso(n.x, n.y, 1.75); if (!S.falas[n.id]) balao(sx, sy - 6, n.prof ? (n.masc ? '👨‍🏫' : '👩‍🏫') : '💬'); if (Math.hypot(n.x - P.x, n.y - P.y) < 4) rotulo(n.nome + (coracoes(n) ? ` ❤️${coracoes(n)}` : ''), sx, sy - (S.falas[n.id] ? 0 : 48), '#fff7e8'); } });
      for (const it of f.evItens) if (!estEv(it.ev).itens[it.id] && naTela(it.x, it.y)) lista.push({ k: it.x + it.y, d: () => { sombra(it.x, it.y, 0.35); const [sx, sy] = iso(it.x, it.y, 0.55 + Math.sin(agora / 300 + it.x * 3) * 0.12); ctx.fillStyle = 'rgba(255,240,170,.45)'; ctx.beginPath(); ctx.arc(sx, sy, 16, 0, Math.PI * 2); ctx.fill(); ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(it.ev.item[0], sx, sy); } });
      eventosAtivos.slice(0, 2).forEach((ev, i) => { const px = f.cx + (i ? -2.9 : 2.9), py = f.cy - 2.9; lista.push({ k: px + py, d: () => { const [ox, oy] = iso(px, py); ctx.save(); ctx.translate(ox, oy); ctx.scale(2, 2); ctx.translate(-ox, -oy); try { MOVEIS[ev.movel].des(px - 0.5, py - 0.5, { on: true }); } finally { ctx.restore(); } } }); });
      for (const it of f.itens) if (!S.itens[it.id] && naTela(it.x, it.y)) lista.push({ k: it.x + it.y + (it.arvore ? 0.05 : 0), d: () => desenhaItem(it) });
    }
    lista.push({ k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) });
    if (S.pet && !S.pet.dorme) lista.push({ k: PET.x + PET.y, d: () => desenhaPet(PET.x, PET.y, S.pet, PET) });
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    bandeirinhas(atual);
    if (DECOR.has('noite')) { ctx.fillStyle = 'rgba(60,30,90,.18)'; ctx.fillRect(cam.x, cam.y, vw, vh); }
    if (!dentro && !noEnigma && !sala) climaTela(vw, vh);
    enfeitesTela(vw, vh);
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    if (alvo) {
      const t = alvo.tipo === 'portalTele' ? 'E · usar o portal de teletransporte' : alvo.tipo === 'sala' ? `E · entrar: ${SALAS[alvo.sala.id].nome}` : alvo.tipo === 'minhacasa' ? 'E · entrar em casa' : alvo.tipo === 'loja' ? `E · fazer compras (${LOJAS[atual.loja.id].nome})` : alvo.tipo === 'projetos' ? 'E · projetos da turma' : alvo.tipo === 'banco' ? 'E · entrar no banco' : alvo.tipo === 'prof' ? `E · conversar com ${profDe(atual).nome}` : alvo.tipo === 'enigma' ? 'E · entrar na Casa do Enigma' : alvo.tipo === 'pet' ? `E · cuidar de ${S.pet.nome}` : alvo.tipo === 'casa' ? (alvo.casa.lugar.tipo === 'pagina' ? 'E · visitar' : alvo.casa.lugar.tipo === 'sim' ? 'E · experimentar' : alvo.casa.lugar.tipo === 'em' ? 'E · começar o desafio' : 'E · jogar') : alvo.tipo === 'npc' ? `E · conversar${entregaPara(alvo.npc) ? ' · 📦 entrega' : papelNpc(alvo.npc) ? ' · ' + PAPEIS[papelNpc(alvo.npc)].rotulo : ''}` : alvo.tipo === 'placa' ? 'E · ler a placa' : alvo.tipo === 'pesca' ? (S.loja.tem['ferr:vara'] ? `E · pescar (🪱 ${S.inv.isca || 0})` : 'Laguinho · precisa de 🎣 vara') : alvo.tipo === 'recurso' ? (alvo.rec === 'madeira' ? (S.loja.tem['ferr:machado'] ? 'E · cortar madeira' : 'Árvore · precisa de 🪓 machado') : (S.loja.tem['ferr:picareta'] ? 'E · tirar pedra' : 'Rocha · precisa de ⛏️ picareta')) : 'E · portão';
      const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(t, sx, sy - 10, '#1d2a1f', '#ffffff');
      anuncia((alvo.tipo === 'casa' ? alvo.casa.lugar.titulo + '. ' : '') + t);
    } else anuncia('');
    minimapa(faseDeX(P.x));
    requestAnimationFrame(quadro);
  }
  function visiveisFases() { return [atual]; }
  function balao(sx, sy, ic) {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = '#e07bb0'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 34, 36, 30, 9); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx - 5, sy - 5); ctx.lineTo(sx, sy + 2); ctx.lineTo(sx + 5, sy - 5); ctx.closePath(); ctx.fill();
    ctx.font = '18px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, sx, sy - 19);
  }

  /* ---------- minimapa (visto de cima) ---------- */
  const mini = $('#mini'), mctx = mini.getContext('2d');
  let miniFase = null, miniCache = null, mS = 1, mOx = 0, mOy = 0;
  const COR_MAPA = { [T.grama]: '#7fbf6a', [T.caminho]: '#f3d6a0', [T.praca]: '#fdf1c7', [T.agua]: '#6fc3dc', [T.areia]: '#f1dfa6' };
  function mapaFase(c, f, s, ox, oy, comCasas) {
    for (let y = 0; y < ALT; y++) for (let x = 0; x < f.L; x++) { c.fillStyle = COR_MAPA[f.tile[y * f.L + x]]; c.fillRect(ox + x * s, oy + y * s, Math.ceil(s), Math.ceil(s)); }
    c.fillStyle = '#3f8f4b'; for (const a of f.arvores) c.fillRect(ox + (a.x - f.x0) * s, oy + a.y * s, Math.ceil(s), Math.ceil(s));
    if (f.minhaCasa) { const m = f.minhaCasa; c.fillStyle = S.casa.cor; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    if (f.enigma) { const m = f.enigma; c.fillStyle = '#9a6bd6'; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    for (const m of f.salas || []) { c.fillStyle = SALAS[m.id].estilo.telhado; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    if (f.banco) { const m = f.banco; c.fillStyle = '#4f9a6b'; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    if (f.projetos) { const m = f.projetos; c.fillStyle = '#c08a52'; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    if (f.loja) { const m = f.loja; c.fillStyle = LOJAS[m.id].toldo; c.fillRect(ox + m.x * s, oy + m.y * s, m.w * s, m.d * s); }
    if (comCasas) for (const casa of f.casas) { c.fillStyle = S.feitos[casa.lugar.id] ? casa.cor : '#b9b9b4'; c.fillRect(ox + casa.x * s, oy + casa.y * s, casa.w * s, casa.d * s); }
  }
  function minimapa(f) {
    if (miniFase !== f || !miniCache) {
      miniFase = f; $('#mini-nome').textContent = `${f.nome} · ${CLIMA.ic} ${ESTACAO.ic}`;
      mS = Math.min(300 / f.L, 200 / ALT); mOx = (300 - f.L * mS) / 2; mOy = (200 - ALT * mS) / 2;
      miniCache = document.createElement('canvas'); miniCache.width = 300; miniCache.height = 200;
      const c = miniCache.getContext('2d'); c.fillStyle = '#1b2531'; c.fillRect(0, 0, 300, 200);
      mapaFase(c, f, mS, mOx, mOy, false);
    }
    mctx.drawImage(miniCache, 0, 0);
    if (f.enigma) { const m = f.enigma; mctx.fillStyle = '#9a6bd6'; mctx.fillRect(mOx + m.x * mS, mOy + m.y * mS, m.w * mS, m.d * mS); }
    if (f.minhaCasa) { const m = f.minhaCasa; mctx.fillStyle = S.casa.cor; mctx.fillRect(mOx + m.x * mS, mOy + m.y * mS, m.w * mS, m.d * mS); }
    for (const casa of f.casas) { mctx.fillStyle = S.feitos[casa.lugar.id] ? casa.cor : '#b9b9b4'; mctx.fillRect(mOx + casa.x * mS, mOy + casa.y * mS, casa.w * mS, casa.d * mS); }
    mctx.fillStyle = '#ffffff'; for (const it of f.itens) if (!S.itens[it.id]) { mctx.beginPath(); mctx.arc(mOx + (it.x - f.x0) * mS, mOy + it.y * mS, 2.5, 0, Math.PI * 2); mctx.fill(); }
    mctx.fillStyle = '#ffd58a'; for (const n of f.npcs) if (!S.falas[n.id]) { mctx.beginPath(); mctx.arc(mOx + (n.x - f.x0) * mS, mOy + n.y * mS, 2.5, 0, Math.PI * 2); mctx.fill(); }
    mctx.fillStyle = '#e85c4a'; mctx.beginPath(); mctx.arc(mOx + (P.x - f.x0) * mS, mOy + P.y * mS, 4, 0, Math.PI * 2); mctx.fill();
  }

  /* ---------- HUD ---------- */
  function hud() {
    $('#h-pontos').textContent = S.pontos;
    $('#h-itens').textContent = Object.values(S.cont).reduce((a, b) => a + b, 0);
    $('#h-acertos').textContent = S.acertos;   // só os acertos: os erros não aparecem para o estudante
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    $('#h-aprend').textContent = Math.round(100 * feitos / Math.max(1, todosLugares.length)) + '%';
    nivelHud();
    const f = faseDeX(P.x), ms = sala ? SALAS[sala].missoes() : noEnigma ? missoesEnigma() : dentro && visita ? [{ nome: 'Abrir o baú do presente', n: ((S.visitas || {})[visita.id] || {}).bau ? 1 : 0, meta: 1 }, { nome: `Chegar a 10 corações com ${visita.nome}`, n: coracoes(visita), meta: 10 }].map(m => Object.assign(m, { ok: m.n >= m.meta })) : dentro ? missoesCasa() : missoes(f);
    $('#m-titulo').textContent = sala ? `${SALAS[sala].ic} ${SALAS[sala].nome}` : noEnigma ? '🔐 Casa do Enigma' : dentro && visita ? `🏠 Casa de ${visita.nome}` : dentro ? '🏠 Sua casa' : `Fase ${f.idx + 1} — ${f.sub.split(' · ')[0]}`;
    $('#m-nome').textContent = sala ? SALAS[sala].sub : noEnigma ? 'Escape room · sem cronômetro' : dentro && visita ? `${visita.fase.icone} ${visita.fase.nome}` : dentro ? COMODOS.map(r => r.nome).join(' · ') : `${f.icone} ${f.nome}`;
    $('#m-lista').innerHTML = ms.map(m => `<li class="${m.ok ? 'ok' : ''}"${m.habs && m.habs.length ? ` title="BNCC: ${m.habs.join(', ')}"` : ''}><span class="q"></span><span>${esc(m.nome)}</span><span class="n">(${Math.min(m.n, m.meta)}/${m.meta})</span></li>`).join('');
    $('#m-barra').style.width = Math.round(ms.reduce((a, m) => a + Math.min(1, m.n / m.meta), 0) / ms.length * 100) + '%';
  }
  let avisoT = null;
  function aviso(t) { const el = $('#aviso'); el.textContent = t; el.classList.add('mostra'); clearTimeout(avisoT); avisoT = setTimeout(() => el.classList.remove('mostra'), 3200); }

  /* ---------- habilidades (sobem com as respostas e com os jogos concluídos) ---------- */
  const custoNivel = n => 15 * n * (n + 1);                  // 30, 90, 180, 300... até o nível 10
  const nivelHab = xp => { let n = 0; while (n < 10 && xp >= custoNivel(n + 1)) n++; return n; };
  function xpHabilidades() {
    const xp = Object.assign({}, S.hab);
    for (const l of todosLugares) if (S.feitos[l.id] && l.rec) for (const e of eixosDe(l.rec.habs)) xp[e] = (xp[e] || 0) + 30;
    return xp;
  }
  function niveisAgora() { const xp = xpHabilidades(); return Object.fromEntries(Object.keys(EIXOS_).map(e => [e, nivelHab(xp[e] || 0)])); }
  function comparaNiveis(antes) {
    const depois = niveisAgora(), subiu = Object.keys(depois).filter(e => depois[e] > antes[e]);
    if (subiu.length) { S.pontos += 10 * subiu.length; setTimeout(() => aviso(`📈 ${subiu.map(e => `${ICONE_EIXO[e]} ${EIXOS_[e].nome}: nível ${depois[e]}`).join(' · ')}`), 1600); hud(); }
  }
  function ganhaHabilidade(eixos, v) {
    if (!eixos || !eixos.length) return;
    const antes = niveisAgora();
    for (const e of eixos) S.hab[e] = (S.hab[e] || 0) + v;
    comparaNiveis(antes);
  }

  /* ---------- amizade com os moradores: corações sobem conversando, acertando e dando presentes ---------- */
  const GOSTOS = ['maca', 'livro', 'estrela', 'diamante', 'chave'];
  const PRESENTES_NPC = [[2, 'maca'], [4, 'estrela'], [6, 'diamante'], [8, 'chave'], [10, 'peca']];
  const hoje = () => new Date().toDateString();
  const amizade = n => S.amizade[n.id] || 0;
  const coracoes = n => Math.floor(amizade(n) / 10);
  const favorito = n => GOSTOS[(n.fase.idx * 3 + +n.id.slice(-1)) % GOSTOS.length];
  const todosNpcs = () => fases.flatMap(f => f.npcs);
  const coracoesHtml = n => '<span class="coracoes" aria-label="' + coracoes(n) + ' de 10 corações">' + '❤️'.repeat(coracoes(n)) + '🤍'.repeat(10 - coracoes(n)) + '</span>';
  /* no máximo 1 coração (10 pontos) por semana com cada morador; o presente de aniversário é um bônus fora desse limite.
     Cada morador faz aniversário no mesmo dia de uma personalidade da computação (7 e 23 não têm divisor comum, então não se repetem). */
  const LIMITE_SEMANA = 10;
  const semNpc = n => { const A = S.amizadeSem || (S.amizadeSem = {}); return A[n.id] && A[n.id].s === SEMANA ? A[n.id] : (A[n.id] = { s: SEMANA, v: 0 }); };
  const restaSemana = n => Math.max(0, LIMITE_SEMANA - semNpc(n).v);
  const pessoaNpc = n => PESSOAS[(todosNpcs().indexOf(n) * 7) % PESSOAS.length];
  const aniversarioNpc = n => { const p = pessoaNpc(n); return p.mes === HOJE.getMonth() + 1 && p.dia === HOJE.getDate(); };
  const dataNpc = n => { const p = pessoaNpc(n); return `${String(p.dia).padStart(2, '0')}/${String(p.mes).padStart(2, '0')}`; };
  function ganhaAmizade(n, v, bonus) {
    if (!bonus) { const E = semNpc(n); v = Math.min(v, LIMITE_SEMANA - E.v); if (v <= 0) return 0; E.v += v; }
    const antes = coracoes(n);
    S.amizade[n.id] = Math.min(100, amizade(n) + v);
    const depois = coracoes(n);
    if (depois <= antes) return;
    let msg = `💗 ${n.nome}: ${depois} ${depois === 1 ? 'coração' : 'corações'}!`;
    for (const [nv, item] of PRESENTES_NPC) if (depois >= nv && !S.recompensas[n.id + '-' + nv]) {
      S.recompensas[n.id + '-' + nv] = true; S.inv[item] = (S.inv[item] || 0) + 1;
      msg += ` Ganhou um presente: ${ITENS[item][0]} ${ITENS[item][1]}.`;
    }
    setTimeout(() => aviso(msg), 900); salvar();
  }
  const limiteHtml = n => restaSemana(n) ? '' : `<p class="muted small">💗 A amizade com ${esc(n.nome)} já cresceu o máximo desta semana. Volte na segunda-feira!</p>`;
  function presente(n) {
    const dia = S.diaNpc[n.id] || (S.diaNpc[n.id] = {});
    if (dia.presente === hoje()) return dialogo('🎁', n.nome, `<p>${coracoesHtml(n)}</p><p>Você já me deu um presente hoje. Volte amanhã!</p>`, [{ txt: 'Tá bom', fn: fechaDialogo }]);
    const tem = GOSTOS.concat(Object.keys(COMIDA), ['flor', 'folha']).filter(k => S.inv[k] > 0);
    const dica = S.gostos[n.id] ? `<p class="muted">${esc(n.nome)} adora ${ITENS[favorito(n)][0]} ${ITENS[favorito(n)][1].toLowerCase()}.</p>` : '<p class="muted">Cada morador tem um presente preferido. Descubra qual é!</p>';
    if (!tem.length) return dialogo('🎁', 'Presente', `<p>Você não tem itens para dar. Pegue maçãs, livros, estrelas, diamantes e chaves pela vila.</p>${dica}`, [{ txt: 'Ok', fn: fechaDialogo }]);
    dialogo('🎁', `Presente para ${n.nome}`, `<p>O que você quer dar?</p>${dica}`, tem.map(k => ({ txt: `${ITENS[k][0]} ${ITENS[k][1]} (${S.inv[k]})`, fn: () => {
      S.inv[k]--; dia.presente = hoje();
      const ama = k === favorito(n), aniv = aniversarioNpc(n) && dia.aniv !== HOJE.getFullYear();
      if (ama) S.gostos[n.id] = true;
      ganhaAmizade(n, ama ? 25 : 10);
      if (aniv) { dia.aniv = HOJE.getFullYear(); ganhaAmizade(n, ama ? 20 : 10, true); setTimeout(() => ganhaFigurinha(pessoaNpc(n).id, `pelo aniversário de ${n.nome}`), 1800); }
      salvar();
      const fala = aniv ? `Você lembrou do meu aniversário! ${ama ? 'E ainda é o meu preferido! 🥳😍' : 'Muito obrigado! 🥳'} Ganhou um bônus de amizade de ${ama ? 2 : 1} ${ama ? 'corações' : 'coração'}.` : ama ? 'Eu amei! É o meu preferido! 😍' : 'Que legal, valeu pelo presente! 😊';
      dialogo('🎁', n.nome, `<p>${coracoesHtml(n)}</p><p>${fala}</p>${aniv ? '' : limiteHtml(n)}`, [{ txt: 'De nada!', classe: 'principal', fn: fechaDialogo }]);
    } })).concat([{ txt: 'Agora não', fn: fechaDialogo }]));
  }

  /* ---------- diálogos ---------- */
  const D = { el: $('#dialogo'), ic: $('#d-ic'), nome: $('#d-nome'), texto: $('#d-texto'), op: $('#d-opcoes') };
  let dialogoNpc = null;
  /* ---------- rascunho: um quadro quadriculado para fazer contas ao responder (botão ✏️ no diálogo das perguntas) ---------- */
  const RASC = { cor: '#1d2a1f', apaga: false, risco: false, ultimo: null };
  function rascunhoBotao(mostra, limpa) {
    $('#d-rasc').hidden = !mostra;
    if (!mostra) { $('#rascunho').hidden = true; $('#d-rasc').setAttribute('aria-expanded', 'false'); }
    if (limpa) limpaRascunho();
  }
  function limpaRascunho() {
    const t = $('#rasc-txt'); if (t) t.value = '';
    const c = $('#rasc-cv'), g = c.getContext('2d');
    g.fillStyle = '#fffdf6'; g.fillRect(0, 0, c.width, c.height);
    g.strokeStyle = '#d7e3f0'; g.lineWidth = 1;
    for (let x = 20; x < c.width; x += 20) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, c.height); g.stroke(); }
    for (let y = 20; y < c.height; y += 20) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(c.width, y + 0.5); g.stroke(); }
  }
  (() => {
    const c = $('#rasc-cv'); if (!c) return; limpaRascunho();
    const ponto = ev => { const r = c.getBoundingClientRect(); return [(ev.clientX - r.left) * c.width / r.width, (ev.clientY - r.top) * c.height / r.height]; };
    c.addEventListener('pointerdown', ev => { RASC.risco = true; RASC.ultimo = ponto(ev); c.setPointerCapture(ev.pointerId); ev.preventDefault(); });
    c.addEventListener('pointermove', ev => {
      if (!RASC.risco) return; const g = c.getContext('2d'), p = ponto(ev);
      g.strokeStyle = RASC.apaga ? '#fffdf6' : RASC.cor; g.lineWidth = RASC.apaga ? 18 : 2.6; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath(); g.moveTo(...RASC.ultimo); g.lineTo(...p); g.stroke(); RASC.ultimo = p;
    });
    const solta = () => { RASC.risco = false; }; c.addEventListener('pointerup', solta); c.addEventListener('pointercancel', solta);
    $('#d-rasc').addEventListener('click', () => { const r = $('#rascunho'); r.hidden = !r.hidden; $('#d-rasc').setAttribute('aria-expanded', String(!r.hidden)); });
    $('#rasc-fechar').addEventListener('click', () => { $('#rascunho').hidden = true; $('#d-rasc').setAttribute('aria-expanded', 'false'); });
    $('#rasc-limpa').addEventListener('click', limpaRascunho);
    // dois modos: desenhar no quadriculado ou digitar (o que foi feito num modo continua lá ao trocar)
    const modo = m => { const dig = m === 'digita'; $('#rasc-cv').hidden = dig; $('#rasc-ferr').hidden = dig; $('#rasc-txt').hidden = !dig;
      document.querySelectorAll('[data-rmodo]').forEach(o => o.setAttribute('aria-pressed', String(o.dataset.rmodo === m))); if (dig) $('#rasc-txt').focus(); };
    document.querySelectorAll('[data-rmodo]').forEach(b => b.addEventListener('click', () => modo(b.dataset.rmodo)));
    document.querySelectorAll('[data-rasc]').forEach(b => b.addEventListener('click', () => { RASC.apaga = b.dataset.rasc === 'apaga'; if (!RASC.apaga) RASC.cor = b.dataset.rasc; document.querySelectorAll('[data-rasc]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); }));
  })();
  function dialogo(ic, nome, html, opcoes) {
    rascunhoBotao(false);
    dialogoAberto = true; D.el.hidden = false; D.ic.textContent = ic; D.nome.textContent = nome; D.texto.innerHTML = html;
    D.op.innerHTML = '';
    opcoes.forEach((o, i) => {
      const b = document.createElement(o.href ? 'a' : 'button');
      if (o.href) { b.href = o.href; b.target = '_blank'; b.rel = 'noopener'; } else b.type = 'button';
      b.className = o.classe || ''; b.innerHTML = (i < 9 ? `<kbd>${i + 1}</kbd> ` : '') + esc(o.txt);
      b.addEventListener('click', () => { if (o.fn) o.fn(); });
      D.op.appendChild(b);
    });
    const primeiro = D.op.querySelector('button, a'); if (primeiro) primeiro.focus();
  }
  function fechaDialogo() { rascunhoBotao(false); dialogoAberto = false; dialogoNpc = null; D.el.hidden = true; for (const k in teclas) teclas[k] = false; cv.focus(); }
  $('#d-fechar').addEventListener('click', fechaDialogo);

  function abreCasa(c) {
    const l = c.lugar, feito = S.feitos[l.id];
    if (l.tipo === 'em') return dialogo(l.icone, l.titulo, `<p>${esc(l.resumo)}</p><p class="muted">${feito ? '✅ Desafio concluído. Pode refazer quando quiser.' : `Um desafio de ${l.desafio.qs.length} perguntas aqui mesmo. Acertando todas, o prédio ganha cor.`}</p>`, [{ txt: feito ? 'Refazer' : 'Começar', classe: 'principal', fn: () => desafioEM(l, 0) }, { txt: 'Agora não', fn: fechaDialogo }]);
    const verbo = l.tipo === 'pagina' ? 'Visitar' : l.tipo === 'sim' ? 'Experimentar' : 'Jogar';
    let status;
    if (feito) status = `<p class="muted">✅ Concluída${typeof feito === 'number' && l.rec && feito > 1 ? ` · melhor resultado: ${feito}%` : ''}. A casa já ganhou cor; pode jogar de novo quando quiser.</p>`;
    else if (l.rec) status = `<p class="muted">A casa está cinza: ela ganha cor quando você terminar uma rodada do jogo. O jogo abre aqui mesmo, por cima do Mundo; quando acabar, aperte Voltar ao Mundo.</p>`;
    else status = `<p class="muted">A página abre aqui mesmo, por cima do Mundo, e a casa ganha cor.</p>`;
    dialogo(l.icone, l.titulo, `<p>${esc(l.resumo)}</p>${l.extra ? `<p class="muted">${esc(l.extra)}</p>` : ''}${status}`, [
      { txt: `${verbo} agora`, classe: 'principal', fn: () => abreJogo(l) },
      { txt: '↗ Abrir em outra aba', href: l.url, fn: () => abriu(l) },
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  function comecaEM(l) {   // começa (ou continua) pela primeira pergunta pendente que não acabou de ser errada
    const d = l.desafio, ok = desafioEM.ok || (desafioEM.ok = new Set());
    if (d.qs.every((_, j) => ok.has(`${d.id}-${j}`))) d.qs.forEach((_, j) => ok.delete(`${d.id}-${j}`));
    const j = d.qs.findIndex((_, j) => !ok.has(`${d.id}-${j}`) && !bloqueada(`${d.id}-${j}`));
    if (j < 0) return avisoBloqueio(l.icone, l.titulo);
    desafioEM(l, j);
  }
  function desafioEM(l, i) {
    const d = l.desafio, q = d.qs[i], ordem = q.alts.map((a, k) => k).sort(() => Math.random() - 0.5);
    dialogo(l.icone, `${l.titulo} · ${i + 1}/${d.qs.length}`, `${q.html || ''}<p>${q.enun}</p>`, ordem.map(k => ({ txt: q.alts[k], fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = k === 0, id = `${d.id}-${i}`; contaResposta(); if (!certo) bloqueia(id); progressoMundo(id, certo);
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (ordem[j] === 0) b.classList.add('certa'); else if (ordem[j] === k) b.classList.add('errada'); });
      if (certo) { const nova = S.resp[id] !== true; S.resp[id] = true; ganhaHabilidade(d.eixos, 10); if (nova) { S.acertos++; pontos(5); } } else { S.erros++; if (S.resp[id] !== true) S.resp[id] = false; hud(); }
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${esc(q.coment)}</p>`;
      if (certo) (desafioEM.ok = desafioEM.ok || new Set()).add(id);
      // a próxima pendente nesta rodada, sem repetir a que acabou de errar
      const pend = d.qs.map((_, j) => (i + 1 + j) % d.qs.length).filter(j => !(desafioEM.ok || new Set()).has(`${d.id}-${j}`));
      const prox = pend.find(j => !bloqueada(`${d.id}-${j}`)), ultimo = !pend.length;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = ultimo ? 'Terminar' : prox !== undefined ? 'Próxima' : 'Entendi';
      b.addEventListener('click', () => {
        if (!ultimo && prox !== undefined) return desafioEM(l, prox);
        if (!ultimo) { fechaDialogo(); return aviso('⏳ Falta a pergunta que você errou: responda outra pergunta e volte ao desafio.'); }
        if (!S.feitos[l.id]) { S.feitos[l.id] = true; pontos(20, `${l.icone} ${l.titulo}: o prédio ganhou cor!`); }
        confereFases(); salvar(); fechaDialogo();
      });
      D.op.appendChild(b); b.focus(); salvar();
    } })));
    delete D.op.dataset.respondida;
  }
  /* jogo dentro do Mundo: a página abre numa janela por cima, sem o topo, o rodapé e o "← Jogos" do site (o aluno não sai sem querer) */
  const CSS_NO_MUNDO = '#topbar, #footer, .crumbs { display: none !important; } body { padding-top: 0 !important; }';
  function abreJogo(l) {
    abriu(l);
    $('#jm-ic').textContent = l.icone || '🎮'; $('#jm-t').textContent = l.titulo; $('#jm-aba').href = l.url;
    const fr = $('#jm-if');
    fr.onload = () => { try { const d = fr.contentDocument; if (d && d.head && !d.getElementById('no-mundo')) { const st = d.createElement('style'); st.id = 'no-mundo'; st.textContent = CSS_NO_MUNDO; d.head.appendChild(st); } } catch (e) { /* outra origem: abre como está */ } };
    fr.src = l.url;
    abreJanela('jogo');
    setTimeout(() => { try { fr.focus(); } catch (e) {} }, 300);
  }
  function abriu(l) { S.abertos[l.id] = Date.now(); if (!l.rec && !S.feitos[l.id]) { S.feitos[l.id] = true; pontos(15, `${l.titulo}: a casa ganhou cor!`); confereFases(); } salvar(); fechaDialogo(); }
  /* pergunta da fase: primeiro as que a pessoa errou (revisão), depois as novas */
  /* cada morador tem a sua base de perguntas (perguntas-npc.js), com o tema da vila e 50 ou mais perguntas */
  function bancoNpc(n) {
    if (n.banco !== undefined) return n.banco;
    const bs = (window.PERGUNTAS_NPC || {})[n.fase.id] || [], k = n.fase.npcs.indexOf(n), b = bs.length ? bs[k % bs.length] : null;
    n.banco = b && Object.assign({}, b, { perguntas: b.lista.map((q, i) => Object.assign({ id: `n:${n.fase.id}:${k % bs.length}:${i}`, eixos: b.eixos }, q)) });
    return n.banco;
  }
  /* errou? a mesma pergunta só volta depois de o estudante responder outra (nada de repetir em seguida) */
  /* Meu progresso (material-didatico): com um perfil criado lá, cada resposta conta para as habilidades da BNCC da pergunta,
     os acertos dão pontos de nível (MDM.mundo) e as vilas e salas vencidas viram medalhas. Sem perfil, nada é gravado lá. */
  const perfilMD = () => window.MDP && MDP.perfil();
  function progressoMundo(id, certo) {
    if (!perfilMD()) return;
    MDP.registrarMundo(habsPergunta(id), certo);
    const subiu = window.MDM ? MDM.mundo(certo) : 0;
    if (subiu) setTimeout(() => aviso(`📈 Você chegou ao nível ${subiu} do Meu progresso!`), 1800);
    if (window.MDM && MDM.mundoMissoes) avisaMissoes(MDM.mundoMissoes());
    nivelHud();
  }
  /* missões do dia do Meu progresso que se cumprem no Mundo (horta, golpe, trem, circuito, sala, pixel, bilhete) */
  function avisaMissoes(novas) { (novas || []).forEach((m, i) => setTimeout(() => { aviso(`🎯 Missão do dia cumprida: ${m.txt} (+${m.pts} no Meu progresso)`); SOM.toca('vitoria'); }, 2400 + i * 2200)); }
  function feitoMundo(tipo) { if (!perfilMD() || !window.MDM || !MDM.mundoFeito) return; avisaMissoes(MDM.mundoFeito(tipo)); nivelHud(); }
  function lembraMissaoMundo() {
    if (!perfilMD() || !window.MDM || !MDM.missaoMundoHoje) return;
    const m = MDM.missaoMundoHoje(); if (m && !m.feita) aviso(`🎯 Missão do dia: ${m.txt} (+${m.pts})`);
  }
  let mwVisto = '';
  function sincProgresso() {
    const p = perfilMD(); if (!p) return;
    const mw = { v: Object.keys(S.concluidas || {}).length, s: ((S.emat || {}).vitorias || 0) + ((S.labirinto || {}).vitorias || 0) }, j = JSON.stringify(mw);
    if (j === mwVisto) return;
    mwVisto = j;
    if (JSON.stringify(p.mw || {}) !== j) { MDP.atualizar({ mw }); MDP.conferirMedalhas(); }
  }
  function nivelHud() {
    const el = $('#h-nivel'), a = $('#h-nivel-l'); if (!el) return;
    // sem perfil no Meu progresso, o Mundo cria um (só neste navegador, com o apelido do Mundo) para o nível aparecer e contar desde já
    if (window.MDP && window.MDM && !perfilMD()) { try { MDP.criar(S.apelido || 'Estudante', 6); } catch (e) {} }
    const p = perfilMD(), nv = p && window.MDM ? MDM.nivel(p) : null;
    el.textContent = nv ? `N${nv.n}` : '—';
    const rot = a.querySelector('span'); if (rot) rot.textContent = nv ? `📈 Nível · ${nv.nome}` : '📈 Nível';
    a.title = nv ? `Nível ${nv.n} (${nv.nome}) no Meu progresso · ${nv.total} pontos. Acertos no Mundo valem ${MDM.PONTOS.mundo} pontos (até ${MDM.MUNDO_DIA} por dia).` : 'Crie seu perfil no Meu progresso: acertos, nível e medalhas do Mundo contam lá';
  }
  const bloqueios = () => S.bloq || (S.bloq = {});
  /* eventos anônimos no GoatCounter (sem nome, apelido ou progresso): no máximo uma vez por sessão do navegador */
  function eventoGC(nome) {
    const k = 'mundo-ev:' + nome;
    try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, '1'); } catch (e) { if (eventoGC[k]) return; eventoGC[k] = 1; }
    let n = 0;
    const envia = () => { const g = window.goatcounter; if (g && g.count) g.count({ path: nome, title: 'Mundo', event: true }); else if (++n < 20) setTimeout(envia, 1500); };
    envia();
  }
  function contaResposta() { eventoGC('mundo-jogou'); S.nResp = (S.nResp || 0) + 1; const B = bloqueios(); for (const k in B) if (B[k] <= S.nResp) delete B[k]; }
  const bloqueia = ch => { bloqueios()[ch] = (S.nResp || 0) + 1; };
  const bloqueada = ch => (bloqueios()[ch] || 0) > (S.nResp || 0);
  const avisoBloqueio = (ic, titulo) => dialogo(ic, titulo, '<p>Esta pergunta fica para depois: antes de tentar de novo, responda <b>outra pergunta</b> (converse com um morador, jogue uma casa ou visite outra estação). Assim você volta com a cabeça fresca!</p>', [{ txt: 'Combinado', classe: 'principal', fn: fechaDialogo }]);
  function sorteiaPergunta(f, lista0) {
    const todas0 = lista0 || f.perguntas, livres = todas0.filter(p => !bloqueada(p.id)), todas = livres.length ? livres : todas0;
    const erradas = todas.filter(p => S.resp[p.id] === false), novas = todas.filter(p => !(p.id in S.resp));
    const lista = erradas.length && (Math.random() < 0.6 || !novas.length) ? erradas : novas.length ? novas : todas;
    return lista[Math.floor(Math.random() * lista.length)];
  }
  function pergunta(titulo, ic, p, aoResponder) {
    const novaPerg = RASC.perg !== p.id; RASC.perg = p.id;
    dialogo(ic, titulo, `<p>${p.enun}</p>`, p.alts.map((a, i) => ({ txt: a, fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = i === p.certa, novaResp = !(p.id in S.resp) || S.resp[p.id] === false;
      contaResposta(); if (!certo) bloqueia(p.id); progressoMundo(p.id, certo);
      S.resp[p.id] = certo;
      ganhaHabilidade(p.eixos, certo ? 10 : 2);
      if (certo) contaEvento('acertos');
      if (certo) { S.acertos++; pontos(novaResp ? 10 : 5, 'Acertou!'); } else { S.erros++; hud(); }
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (j === p.certa) b.classList.add('certa'); else if (j === i) b.classList.add('errada'); });
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${p.coment || ''}</p>`;
      if (aoResponder) aoResponder(certo);
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Continuar';
      b.addEventListener('click', fechaDialogo); D.op.appendChild(b); b.focus();
      confereFases(); salvar();
    } })));
    delete D.op.dataset.respondida;
    rascunhoBotao(true, novaPerg);
  }
  function falaNpc(n) {
    const f = n.fase, primeira = !S.falas[n.id];
    dialogoNpc = n;
    if (primeira) { S.falas[n.id] = true; pontos(5, `Você conheceu ${n.nome}!`); confereFases(); }
    const dia = S.diaNpc[n.id] || (S.diaNpc[n.id] = {});
    if (dia.fala !== hoje()) { dia.fala = hoje(); ganhaAmizade(n, 10); contaEvento('conversas'); }
    const c = coracoes(n);
    const ola = primeira ? (n.prof ? (n.masc ? `Olá! Eu sou o ${n.nome.replace(/^Professor /, '')}, professor aqui da ${f.nome}. ` : `Olá! Eu sou a ${n.nome.replace(/^Professora? /, '')}, professora aqui de ${f.nome}. `) : `Oi! Eu sou ${n.nome}. `) : c >= 6 ? 'Que alegria te ver de novo! ' : c >= 3 ? 'Oi! Que bom que você passou aqui. ' : 'Oi de novo! ';
    const prox = PRESENTES_NPC.find(([nv]) => !S.recompensas[n.id + '-' + nv]);
    dialogo('💬', n.nome, `<p>${coracoesHtml(n)}</p><p>${esc(ola)}${bancoNpc(n) ? `Posso te fazer uma pergunta sobre <b>${esc(bancoNpc(n).tema)}</b> ${bancoNpc(n).ic}? Vale 10 pontos.` : `Posso te fazer uma pergunta de ${f.ano}º ano? Vale 10 pontos.`}</p>${aniversarioNpc(n) ? `<p>🎂 <strong>Hoje é o meu aniversário</strong>, no mesmo dia de ${esc(pessoaNpc(n).nome)}! Um presente hoje vale um bônus de amizade.</p>` : ''}<p class="muted">Conversar uma vez por dia, acertar as perguntas e dar presentes aumenta a amizade, até 1 coração por semana.${aniversarioNpc(n) ? '' : ` Faço aniversário em ${dataNpc(n)}, no mesmo dia de ${esc(pessoaNpc(n).nome)}: presente no aniversário dá bônus.`}${prox ? ` Com ${prox[0]} corações, ${esc(n.nome)} te dá ${ITENS[prox[1]][0]}.` : ''}${coracoes(n) < CORACOES_CASA ? ` Com ${CORACOES_CASA} corações, você pode visitar a casa de ${esc(n.nome)}.` : ''}</p>${limiteHtml(n)}`, [
      { txt: 'Pode perguntar!', classe: 'principal', fn: () => pergunta(n.nome, bancoNpc(n) ? bancoNpc(n).ic : '❓', sorteiaPergunta(f, bancoNpc(n) && bancoNpc(n).perguntas), certo => { if (certo) ganhaAmizade(n, 8); }) },
      { txt: '🎁 Dar um presente', fn: () => presente(n) },
      ...(!dentro && coracoes(n) >= CORACOES_CASA ? [{ txt: `🏠 Visitar a casa de ${n.nome}`, fn: () => visitaNpc(n) }] : []),
      ...opcoesPapel(n),
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  /* ---------- funções dos moradores, além das perguntas: comprar recursos, pedir entregas e levar você a outra vila ---------- */
  const PAPEIS = {
    comprador: { rotulo: '🧺 compra peixe, madeira e pedra', botao: '🧺 Vender peixe, madeira ou pedra' },
    carteiro: { rotulo: '📦 entregas · 🕵️ golpes', botao: '📦 Fazer uma entrega' },
    guia: { rotulo: '🧭 leva você a outra vila', botao: '🧭 Me leve a outra vila' }
  };
  const papelNpc = n => n.prof ? null : ['comprador', 'carteiro', 'guia'][(n.fase.npcs.indexOf(n) - 1 + n.fase.idx) % 3];
  const opcoesPapel = n => {
    const out = [], ent = entregaPara(n);
    if (ent) out.push({ txt: `📦 Entregar o pacote de ${ent.nome}`, classe: 'principal', fn: () => entrega(n) });
    if (papelNpc(n)) out.push({ txt: PAPEIS[papelNpc(n)].botao, fn: () => ({ comprador: compraNpc, carteiro: carteiro, guia: guia })[papelNpc(n)](n) });
    if (papelNpc(n) === 'carteiro') out.push({ txt: '🕵️ Investigar mensagem suspeita', fn: () => detetive(n) });
    return out;
  };
  // comprador: o preço muda todo dia; vender tudo pede a conta da multiplicação
  const VENDE = { peixe: 12, peixeColorido: 20, camarao: 15, madeira: 8, pedra: 10 };
  const precoNpc = (n, k) => { const r = rng(diaHoje() * 13 + n.fase.idx * 7 + Object.keys(VENDE).indexOf(k)); return Math.max(2, Math.round(VENDE[k] * (0.7 + r() * 0.6))); };
  function compraNpc(n) {
    const tem = Object.keys(VENDE).filter(k => S.inv[k] > 0), volta = () => compraNpc(n);
    const tabela = Object.keys(VENDE).map(k => `${ITENS[k][0]} ${precoNpc(n, k)} ⭐`).join(' · ');
    dialogo('🧺', n.nome, `<p>Hoje eu pago: ${tabela}.</p>${tem.length ? '<p>O que você quer vender?</p>' : '<p class="muted">Você não tem peixe, madeira nem pedra agora. Pesque no laguinho e use o machado e a picareta (estão no 🍎 Mercadinho).</p>'}<p class="muted small">Os preços mudam todo dia: compare com os moradores de outras vilas!</p>`,
      tem.flatMap(k => [
        { txt: `Vender 1 ${ITENS[k][0]} por ${precoNpc(n, k)} ⭐`, fn: () => { S.inv[k]--; S.pontos += precoNpc(n, k); SOM.toca('moeda'); hud(); salvar(); volta(); } },
        ...(S.inv[k] > 1 ? [{ txt: `Vender os ${S.inv[k]} ${ITENS[k][0]}`, fn: () => vendeTudo(n, k) }] : [])
      ]).concat([{ txt: 'Fechar', fn: fechaDialogo }]));
  }
  function vendeTudo(n, k) {
    if (bloqueada(`venda:${k}`)) return dialogo('🧺', n.nome, '<p>Vamos deixar essa conta para depois: responda outra pergunta e volte. Enquanto isso, dá para vender um por vez.</p>', [{ txt: 'Vender um por vez', classe: 'principal', fn: () => compraNpc(n) }, { txt: 'Fechar', fn: fechaDialogo }]);
    const q = S.inv[k], pr = precoNpc(n, k), certo = q * pr;
    const alts = [certo, certo + pr, certo - pr, q + pr].filter((v, i, a) => v > 0 && a.indexOf(v) === i).slice(0, 4).sort(() => Math.random() - 0.5);
    dialogo('🧺', n.nome, `<p>Quanto eu te pago por <b>${q} ${ITENS[k][0]}</b> a <b>${pr} ⭐</b> cada?</p>`, alts.map(v => ({ txt: `${v} ⭐`, fn: () => {
      contaResposta();
      if (v !== certo) { bloqueia(`venda:${k}`); return dialogo('🧺', n.nome, `<p>Hmm, a conta ${q} × ${pr} não deu isso. Pense com calma e tente depois de responder outra pergunta; por enquanto, dá para vender um por vez.</p>`, [{ txt: 'Vender um por vez', classe: 'principal', fn: () => compraNpc(n) }, { txt: 'Fechar', fn: fechaDialogo }]); }
      S.inv[k] = 0; S.pontos += certo; ganhaHabilidade(['NU'], 5); SOM.toca('moeda'); hud(); salvar();
      dialogo('🧺', n.nome, `<p>✅ Isso: ${q} × ${pr} = <b>${certo} ⭐</b>. Negócio fechado!</p>`, [{ txt: 'Vender outra coisa', fn: () => compraNpc(n) }, { txt: 'Fechar', classe: 'principal', fn: fechaDialogo }]);
    } })));
  }
  // carteiro: uma entrega por dia, para um morador de uma vila já aberta
  const npcPorId = id => todosNpcs().find(m => m.id === id);
  const entregaPara = n => { const E = S.entrega; return E && E.dia === hoje() && !E.feita && E.para === n.id ? npcPorId(E.de) : null; };
  function carteiro(n) {
    const E = S.entrega, fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (E && E.dia === hoje() && E.feita) return dialogo('📦', n.nome, '<p>Valeu pela entrega de hoje! Volte amanhã que eu terei outro pacote.</p>', [fecha]);
    if (E && E.dia === hoje()) { const p = npcPorId(E.para); return dialogo('📦', n.nome, `<p>O pacote de hoje vai para <b>${esc(p.nome)}</b>, em ${p.fase.icone} ${esc(p.fase.nome)}. Fale com essa pessoa para entregar.</p>`, [fecha]); }
    const r = rng(diaHoje() * 31 + n.fase.idx), lista = todosNpcs().filter(m => m !== n && !m.prof && liberada(m.fase));
    const p = lista[Math.floor(r() * lista.length)];
    if (!p) return dialogo('📦', n.nome, '<p>Ainda não tenho entregas para você. Abra mais vilas!</p>', [fecha]);
    S.entrega = { dia: hoje(), de: n.id, para: p.id, feita: false }; salvar();
    dialogo('📦', n.nome, `<p>Você pode levar este pacote 📦 para <b>${esc(p.nome)}</b>, em ${p.fase.icone} ${esc(p.fase.nome)}? Quem recebe paga <b>30 ⭐</b> pela entrega.</p><p class="muted small">Dica: o mapa 🗺️ mostra as vilas, e os moradores com 🧭 levam você até lá.</p>`, [{ txt: 'Pode deixar!', classe: 'principal', fn: fechaDialogo }]);
  }
  function entrega(n) {
    const de = npcPorId(S.entrega.de);
    S.entrega.feita = true; pontos(30, `📦 Entrega feita para ${n.nome}!`); ganhaAmizade(n, 10); ganhaAmizade(de, 5); salvar();
    dialogo('📦', n.nome, `<p>Meu pacote de ${esc(de.nome)}! Valeu mesmo. Aqui estão os seus <b>30 ⭐</b>.</p>`, [{ txt: 'De nada!', classe: 'principal', fn: fechaDialogo }]);
  }
  /* ---------- detetive de golpes: o carteiro traz mensagens suspeitas e o aluno decide se é golpe (cidadania digital) ---------- */
  const CANAL_GOLPE = { sms: ['📱', 'SMS'], zap: ['💬', 'Mensagem'], email: ['✉️', 'E-mail'], rede: ['📸', 'Rede social'] };
  const GOLPES = [
    { id: 'pacote', c: 'sms', de: '+55 11 9xxxx-0193', txt: 'ENTREGAS: seu pacote está retido. Pague a taxa de R$ 4,90 em ate 2h ou ele será devolvido: entrega-rapida-taxa.top/pagar', golpe: true, pista: 'Pressa ("em até 2h") e um link estranho para pagar taxa', falsas: ['A mensagem fala de um pacote', 'O valor é pequeno'], expl: 'Empresas de entrega não cobram taxa por SMS com link. Pressa + link desconhecido + pagamento = golpe clássico.' },
    { id: 'premio', c: 'zap', de: 'Promoção Celular Grátis', txt: 'PARABÉNS!!! 🎉 Você foi sorteado(a) com um celular novo! Para receber, mande seu CPF, endereço e o código que vai chegar no seu celular.', golpe: true, pista: 'Pede o código que chega por SMS, além de CPF e endereço', falsas: ['Usa emojis', 'Fala de um celular'], expl: 'Ninguém ganha sorteio que não participou. E o código que chega por SMS serve para alguém entrar na sua conta: nunca passe.' },
    { id: 'parente', c: 'zap', de: 'Número desconhecido', txt: 'Oi, sou eu, troquei de número! Tô sem acesso ao banco, consegue fazer um Pix de R$ 300 pra uma conta que eu te passo? Te devolvo amanhã.', golpe: true, pista: 'Número novo pedindo Pix com urgência', falsas: ['Diz "oi"', 'Promete devolver amanhã'], expl: 'É o golpe do "troquei de número". Antes de qualquer Pix, ligue para o número antigo da pessoa ou pergunte algo que só ela sabe.' },
    { id: 'senha-escola', c: 'email', de: 'suporte@escola-login-verificacao.net', txt: 'Sua conta da escola será BLOQUEADA hoje. Confirme sua senha neste formulário para manter o acesso.', golpe: true, pista: 'Pede a senha num formulário e ameaça bloquear a conta', falsas: ['Fala da escola', 'Chegou por e-mail'], expl: 'Nenhum suporte de verdade pede sua senha. O endereço do remetente também é estranho, não é o da escola.' },
    { id: 'jogo-moedas', c: 'rede', de: '@moedas_gratis_jogo', txt: 'Gere 10.000 moedas GRÁTIS no seu jogo favorito! Só entrar com seu usuário e senha do jogo no nosso site 🔥', golpe: true, pista: 'Pede usuário e senha do jogo em outro site', falsas: ['Fala de um jogo', 'Usa um emoji de fogo'], expl: '"Gerador de moedas" é golpe para roubar contas. Só faça login no app ou site oficial do jogo.' },
    { id: 'vaga', c: 'zap', de: 'Recrutamento Online', txt: 'Ganhe R$ 500 por dia curtindo vídeos! Para começar, pague só R$ 50 de cadastro.', golpe: true, pista: 'Dinheiro fácil demais e pagamento adiantado', falsas: ['Fala de vídeos', 'Tem um valor de cadastro baixo'], expl: 'Trabalho que paga muito para quase nada e pede dinheiro antes é golpe. Quem perde é quem paga o "cadastro".' },
    { id: 'qr', c: 'email', de: 'banco-seguranca@atualiza-cadastro.info', txt: 'Detectamos um acesso estranho. Aponte a câmera para o QR Code em anexo e digite seus dados do cartão para cancelar.', golpe: true, pista: 'Pede dados do cartão por e-mail, com remetente que não é do banco', falsas: ['Fala de segurança', 'Tem um QR Code'], expl: 'Bancos não pedem dados do cartão por e-mail. Na dúvida, abra o aplicativo do banco você mesmo ou ligue para o número do cartão.' },
    { id: 'link-curto', c: 'sms', de: '28911', txt: 'Voce tem pontos que vao EXPIRAR hoje!! Troque agora: bit.ly/pontos-expiram', golpe: true, pista: 'Link encurtado e pressa ("expirar hoje")', falsas: ['Fala de pontos', 'Veio de um número curto'], expl: 'Link encurtado esconde o endereço de verdade. Para ver seus pontos, entre direto no app da loja, sem clicar.' },
    { id: 'escola-reuniao', c: 'email', de: 'secretaria@escola (o e-mail que a escola sempre usa)', txt: 'Lembrete: a reunião de pais será quinta, às 19h, no auditório. Não é preciso responder.', golpe: false, expl: 'Remetente conhecido, nenhum link, nenhum pedido de dado ou dinheiro. É só um aviso.' },
    { id: 'codigo-pedido', c: 'sms', de: 'App que você acabou de usar', txt: 'Seu código de verificação é 482913. Não compartilhe este código com ninguém.', golpe: false, expl: 'Se foi você que pediu o código agora, a mensagem é normal. E ela mesma avisa: o código é só seu.' },
    { id: 'amiga-trabalho', c: 'zap', de: 'Bia (contato salvo)', txt: 'Oi! Amanhã a gente termina o cartaz de ciências na biblioteca? Levo as canetinhas 🖍️', golpe: false, expl: 'Contato conhecido, conversa combinando algo normal, sem pedido de dinheiro, senha ou link.' },
    { id: 'professora', c: 'email', de: 'professora no ambiente da turma', txt: 'Turma, a atividade sobre algoritmos está no mural da sala virtual. Entrega até sexta.', golpe: false, expl: 'Veio pelo ambiente oficial da turma e só pede uma tarefa. Nada de dados, senhas ou pagamento.' },
    { id: 'biblioteca', c: 'sms', de: 'Biblioteca Municipal', txt: 'O livro "O Pequeno Príncipe" vence amanhã. Renove no balcão ou devolva até sexta.', golpe: false, expl: 'Um lembrete sem link e sem cobrança por mensagem: dá para resolver indo pessoalmente.' },
    { id: 'avo', c: 'zap', de: 'Vó (contato salvo de sempre)', txt: 'Bom dia, meu amor! Domingo tem bolo de cenoura aqui em casa, venha 🥕🎂', golpe: false, expl: 'Contato de sempre, convite de família, nenhum pedido. Pode confiar (e comer o bolo).' }
  ];
  const golpeDia = () => { const hj = diaHoje(), G = S.golpes || (S.golpes = { dia: hj, n: 0, ok: {} }); if (G.dia !== hj) { G.dia = hj; G.n = 0; } return G; };
  const GOLPES_DIA = 3;
  function detetive(n) {
    const G = golpeDia(), fecha = { txt: 'Fechar', fn: fechaDialogo };
    if (G.n >= GOLPES_DIA) return dialogo('🕵️', n.nome, `<p>Hoje você já investigou ${GOLPES_DIA} mensagens. Amanhã eu trago mais correspondência suspeita!</p>`, [fecha]);
    const livres = GOLPES.filter(g => !bloqueada('golpe:' + g.id)), nunca = livres.filter(g => !G.ok[g.id]);
    const lista = nunca.length ? nunca : livres;
    if (!lista.length) return avisoBloqueio('🕵️', n.nome);
    const g = lista[Math.floor(Math.random() * lista.length)], [ic, nome] = CANAL_GOLPE[g.c];
    dialogo('🕵️', n.nome, `<p>Chegou esta mensagem para alguém da vila. Você, detetive, acha que é <b>golpe</b>?</p>
      <div class="golpe-msg golpe-${g.c}"><div class="golpe-topo">${ic} ${nome} · <b>${esc(g.de)}</b></div><p>${esc(g.txt)}</p></div>`,
      [{ txt: '🚩 É golpe', fn: () => respondeGolpe(n, g, true) }, { txt: '✅ Pode confiar', fn: () => respondeGolpe(n, g, false) }]);
    delete D.op.dataset.respondida;
  }
  function respondeGolpe(n, g, disse) {
    if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
    const G = golpeDia(), certo = disse === g.golpe, id = 'golpe:' + g.id;
    contaResposta(); if (!certo) bloqueia(id); progressoMundo(id, certo); G.n++;
    ganhaHabilidade(['CD'], certo ? 10 : 2); feitoMundo('golpe');
    if (certo) { S.acertos++; contaEvento('acertos'); pontos(G.ok[g.id] ? 5 : 15, '🕵️ Boa investigação!'); G.ok[g.id] = true; ganhaAmizade(n, 5); } else hud();
    const fim = `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${g.golpe ? 'Era golpe.' : 'Era uma mensagem normal.'} ${esc(g.expl)}</p>`;
    salvar(); confereFases();
    if (certo && g.golpe) {
      const alts = [g.pista, ...g.falsas].sort(() => Math.random() - 0.5);
      dialogo('🕵️', n.nome, `${fim}<p>Pergunta bônus: <b>qual foi a principal pista</b> do golpe?</p>`, alts.map(a => ({ txt: a, fn: () => {
        if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
        const ok = a === g.pista;
        if (ok) pontos(5, '🔎 Pista certa!');
        [...D.op.children].forEach(b => { b.disabled = true; if (b.textContent.endsWith(g.pista)) b.classList.add('certa'); });
        D.texto.innerHTML += `<p>${ok ? '🔎 Exato, essa é a pista!' : `A pista principal era: <b>${esc(g.pista)}</b>. As outras coisas aparecem em mensagens normais também.`}</p>`;
        const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Continuar'; b.addEventListener('click', fechaDialogo); D.op.appendChild(b); b.focus(); salvar();
      } })));
      delete D.op.dataset.respondida; return;
    }
    dialogo('🕵️', n.nome, `${fim}<p class="muted small">${G.n < GOLPES_DIA ? `Hoje ainda tenho ${GOLPES_DIA - G.n} mensagem(ns) para você investigar.` : 'Por hoje é só. Amanhã tem mais!'} Na vida real, na dúvida: não clique, não pague e pergunte a um adulto de confiança.</p>`,
      [{ txt: 'Continuar', classe: 'principal', fn: fechaDialogo }]);
  }
  // guia: leva até qualquer vila já aberta
  function guia(n) {
    const abertas = fases.filter(f => liberada(f) && f !== n.fase);
    dialogo('🧭', n.nome, '<p>Conheço todos os atalhos! Para qual vila você quer ir?</p>', abertas.map(f => ({ txt: `${f.icone} ${f.nome}`, fn: () => { fechaDialogo(); teleporta(f); aviso(`🧭 ${n.nome} levou você até ${f.nome}.`); } })).concat([{ txt: 'Fico por aqui', fn: fechaDialogo }]));
  }
  function guarda(it, f) {
    if (it.estacao) estEst().itens++;
    S.itens[it.id] = true; SOM.toca('coleta'); S.cont[f.id] = (S.cont[f.id] || 0) + 1; S.inv[it.tipo] = (S.inv[it.tipo] || 0) + 1;
    confereFases(); hud(); salvar();
  }
  function pegaItem(it, f) {
    const [ic, nome] = ITENS[it.tipo];
    for (const k in teclas) teclas[k] = false; destino = null;
    if (it.tipo === 'livro') {
      const lidas = Object.keys(S.dicas).length, i = (lidas + f.idx * 5 + SEMANA) % DICAS.length;
      S.dicas[i] = true; guarda(it, f); pontos(5);
      dialogo('📘', 'Dica de computação', `<div class="dica-livro"><p>${DICAS[i]}</p></div><p class="muted">Você já leu ${Object.keys(S.dicas).length} de ${DICAS.length} dicas.</p>`, [{ txt: 'Legal!', classe: 'principal', fn: fechaDialogo }]);
    } else if (it.tipo === 'diamante') {
      // o diamante só vem para o inventário se a resposta estiver certa; errando, ele fica no chão para tentar de novo
      P.x += (P.x < it.x ? -0.6 : 0.6); if (!livre(P.x, P.y)) P.x += (P.x < it.x ? 1.2 : -1.2);
      pergunta('Diamante', '💎', sorteiaPergunta(f), certo => { if (certo) { guarda(it, f); aviso('💎 Diamante guardado no inventário!'); } else aviso('O diamante continua lá. Tente de novo!'); });
    } else { guarda(it, f); pontos(5, it.arvore ? `🍎 Você colheu uma maçã da árvore!` : `${ic} ${nome} no inventário!`); }
  }
  /* ---------- mistério de cibersegurança: o caso da conta invadida, no Bairro dos Padrões ----------
     Depois de abrir o caso (na placa da vila ou no Menu), aparecem lupas 🔎 em 5 casas. Cada pista só fica
     com você quando você explica o que ela mostra; com as 5, você resolve o caso. */
  const MISTERIO = {
    fase: 'padroes', casas: [1, 4, 7, 10, 13],
    pistas: [
      { ic: '📧', nome: 'O e-mail urgente', achado: 'Na caixa de entrada do Seu Juca: “URGENTE! Sua conta será bloqueada em 1 hora. Clique aqui para confirmar sua senha: bit.ly/conta-ok”.',
        enun: 'O que é mais suspeito nesse e-mail?', alts: ['A pressa e o pedido de senha por um link', 'O e-mail ter chegado de manhã', 'A palavra “conta” no texto'], certa: 0 },
      { ic: '📝', nome: 'O papel no monitor', achado: 'Colado na borda do monitor: “senha: juca1950”.',
        enun: 'Por que esse papel é um problema?', alts: ['A senha é curta, usa o ano de nascimento e está à vista de todos', 'Papel colado estraga o monitor', 'Não é problema, porque a senha tem números'], certa: 0 },
      { ic: '🕒', nome: 'O registro de acessos', achado: 'Histórico da conta: “login às 03:12, de outra cidade, num aparelho desconhecido”.',
        enun: 'O que esse registro indica?', alts: ['Alguém de fora entrou com a senha do Seu Juca', 'O Seu Juca é sonâmbulo', 'O relógio do computador está errado'], certa: 0 },
      { ic: '📨', nome: 'As mensagens dos vizinhos', achado: 'Três vizinhos receberam o mesmo e-mail “URGENTE”, palavra por palavra.',
        enun: 'O que isso mostra sobre o golpe?', alts: ['É um golpe em massa (phishing), mandado para muita gente', 'Os vizinhos combinaram uma brincadeira', 'É uma mensagem oficial, porque todos receberam'], certa: 0 },
      { ic: '🔤', nome: 'O remetente', achado: 'O e-mail veio de “suporte@banco-segur0.com”, com um zero no lugar da letra O.',
        enun: 'O que há de errado com esse endereço?', alts: ['O domínio imita o verdadeiro trocando uma letra', 'Endereços de suporte não podem ter hífen', 'Nada: “segur0” é só um apelido'], certa: 0 }
    ],
    final: [
      { enun: 'Com as 5 pistas, o que aconteceu com a conta do Seu Juca?', alts: ['Ele caiu num phishing e a senha fraca facilitou a invasão', 'Um vírus veio de um pen drive', 'O neto dele mexeu na conta', 'O site do banco saiu do ar'], certa: 0 },
      { enun: 'E agora, qual é o melhor conselho para o Seu Juca?', alts: ['Trocar a senha por uma longa, ativar a verificação em duas etapas e avisar os vizinhos', 'Apagar a conta e nunca mais usar a internet', 'Responder ao e-mail pedindo para pararem', 'Usar a mesma senha nova em todos os sites'], certa: 0 }
    ]
  };
  const estMis = () => S.misterio || (S.misterio = { aberto: false, pistas: {}, resolvido: false });
  function pistaNaCasa(c) {
    const E = estMis(); if (!E.aberto || E.resolvido || atual.id !== MISTERIO.fase) return -1;
    const k = MISTERIO.casas.findIndex(i => atual.casas[i % atual.casas.length] === c);
    return k >= 0 && !E.pistas[k] ? k : -1;
  }
  function pistaMisterio(k, c) {
    if (bloqueada(`pista:${k}`)) return avisoBloqueio(MISTERIO.pistas[k].ic, `Pista ${k + 1}: ${MISTERIO.pistas[k].nome}`);
    const P = MISTERIO.pistas[k], ordem = P.alts.map((_, i) => i).sort(() => Math.random() - 0.5);
    dialogo(P.ic, `Pista ${k + 1}: ${P.nome}`, `<p>${esc(P.achado)}</p><p><b>${esc(P.enun)}</b></p>`, ordem.map(i => ({ txt: P.alts[i], fn: () => {
      if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
      const certo = i === P.certa; contaResposta(); if (!certo) bloqueia(`pista:${k}`);
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (ordem[j] === P.certa) b.classList.add('certa'); else if (ordem[j] === i) b.classList.add('errada'); });
      if (certo) { estMis().pistas[k] = true; ganhaHabilidade(['CD', 'MD'], 10); pontos(10); salvar(); }
      const n = Object.keys(estMis().pistas).length;
      D.texto.innerHTML += `<p><strong>${certo ? `✅ Pista guardada no caderno de detetive (${n}/5).` : '❌ Ainda não. Leia a pista com calma: você pode tentar de novo depois de responder outra pergunta.'}</strong></p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = certo ? (n === 5 ? '🕵️ Resolver o caso' : 'Continuar') : 'Entendi';
      b.addEventListener('click', () => certo ? (n === 5 ? (fechaDialogo(), abreJanela('misterio')) : (fechaDialogo(), aviso(`🔎 Faltam ${5 - n} pistas.`))) : fechaDialogo()); D.op.appendChild(b); b.focus();
    } })).concat([{ txt: 'Depois', fn: fechaDialogo }]));
    delete D.op.dataset.respondida;
  }
  function concluiMisterio(i) {
    const q = MISTERIO.final[i]; if (!q) {
      const E = estMis(); E.resolvido = true; S.medalhas.misterio = { ic: '🕵️', nome: 'Detetive digital: o caso da conta invadida' };
      ganhaHabilidade(['CD', 'MD'], 30); pontos(80, '🕵️ Caso resolvido! Você é um(a) detetive digital.'); setTimeout(() => ganhaFigurinha(null, 'pelo mistério resolvido'), 1800); salvar();
      return dialogo('🕵️', 'Caso resolvido!', '<p>O Seu Juca trocou a senha, ativou a verificação em duas etapas e avisou a vizinhança. Você ganhou +80 ⭐, a medalha de detetive digital e uma figurinha.</p>', [{ txt: 'Oba!', classe: 'principal', fn: fechaDialogo }]);
    }
    if (bloqueada(`caso:${i}`)) return avisoBloqueio('🕵️', 'Resolver o caso');
    const ordem = q.alts.map((_, j) => j).sort(() => Math.random() - 0.5);
    dialogo('🕵️', `Resolver o caso · ${i + 1}/2`, `<p><b>${esc(q.enun)}</b></p>`, ordem.map(j => ({ txt: q.alts[j], fn: () => {
      if (D.op.dataset.respondida) return; D.op.dataset.respondida = '1';
      const certo = j === q.certa; contaResposta(); if (!certo) bloqueia(`caso:${i}`);
      [...D.op.children].forEach((b, m) => { b.disabled = true; if (ordem[m] === q.certa) b.classList.add('certa'); else if (ordem[m] === j) b.classList.add('errada'); });
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Releia as pistas no caderno. Você pode tentar de novo depois de responder outra pergunta.'}</strong></p>`;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = certo ? 'Continuar' : 'Entendi';
      b.addEventListener('click', () => certo ? concluiMisterio(i + 1) : fechaDialogo()); D.op.appendChild(b); b.focus();
    } })));
    delete D.op.dataset.respondida;
  }
  function janelaMisterio() {
    const E = estMis(), n = Object.keys(E.pistas).length, f = fases.find(q => q.id === MISTERIO.fase);
    $('#misterio-conteudo').innerHTML = `<p>A conta de e-mail do <b>Seu Juca</b>, no ${f.icone} ${esc(f.nome)}, foi invadida, e ele não sabe como. Procure as casas com a lupa 🔎, explique cada pista e descubra o que aconteceu.</p>
      <p class="small">BNCC: ${chipsHabs(HABS_MISTERIO, E.resolvido ? Object.fromEntries(HABS_MISTERIO.map(h => [h, 1])) : null)}</p>
      ${E.resolvido ? '<p><strong>✅ Caso resolvido! A medalha de detetive digital está no seu inventário.</strong></p>' : ''}
      <ul class="etapas">${MISTERIO.pistas.map((P, k) => `<li class="${E.pistas[k] ? 'ok' : ''}">${E.pistas[k] ? `✅ ${P.ic} <b>${esc(P.nome)}</b>: ${esc(P.achado)}` : `⬜ Pista ${k + 1}: ainda escondida`}</li>`).join('')}</ul>
      <div class="btn-row">${!E.aberto ? '<button type="button" class="hb verde" id="ms-abre">🕵️ Aceitar o caso</button>' : ''}
      ${E.aberto && !E.resolvido && atual.id !== MISTERIO.fase && liberada(f) ? `<button type="button" class="hb azul" id="ms-ir">Ir para ${esc(f.nome)}</button>` : ''}
      ${E.aberto && !E.resolvido && n === 5 ? '<button type="button" class="hb verde" id="ms-resolve">🧩 Resolver o caso</button>' : ''}</div>
      ${!liberada(f) ? `<p class="muted small">O ${esc(f.nome)} ainda está fechado: complete as missões das vilas anteriores para chegar lá.</p>` : ''}`;
    const a = $('#ms-abre'); if (a) a.addEventListener('click', () => { E.aberto = true; salvar(); aviso('🔎 Caso aceito! Procure as lupas nas casas.'); janelaMisterio(); });
    const ir = $('#ms-ir'); if (ir) ir.addEventListener('click', () => teleporta(f));
    const r = $('#ms-resolve'); if (r) r.addEventListener('click', () => { fechaJanela(); concluiMisterio(0); });
  }
  function lePlaca(f) {
    if (f.id === MISTERIO.fase && !estMis().resolvido) return abreJanela('misterio');
    const ms = missoes(f), feitas = habsTrabalhadas();
    dialogo('🪧', f.nome, `<p>${esc(FASES[f.idx].placa)}</p>${f.loja ? `<p>${LOJAS[f.loja.id].ic} Nesta vila fica a <strong>${LOJAS[f.loja.id].nome}</strong>: troque suas ⭐ por coisas novas.</p>` : ''}<p class="muted">Missões desta fase:</p><ul class="etapas">${ms.map(m => `<li class="${m.ok ? 'ok' : ''}">${m.ok ? '✅' : '⬜'} ${esc(m.nome)}${m.habs.length ? detalheHabs(m.habs, feitas) : ''}</li>`).join('')}</ul>${ms.some(m => m.habs.length) ? '<p class="muted small">Os códigos são as habilidades da BNCC que cada missão trabalha. Abra a lista e toque em um código para ler a habilidade; os verdes você já trabalhou.</p>' : ''}<p class="muted">Os itens do chão mudam de lugar toda segunda-feira, para você voltar e revisar.</p>`, [{ txt: 'Entendi', fn: fechaDialogo }]);
  }
  /* ---------- portões com portas lógicas: na primeira passagem por cada portão (e sempre nos atalhos), acenda a lâmpada do circuito ----------
     Circuito = árvore: { e: 'A' } é uma chave; { op: 'E' | 'OU' | 'NÃO', f: [...] } é uma porta; op '?' é uma porta vazia que o aluno escolhe (E ou OU).
     chaves: valor inicial (0/1) e se está travada (t). A lâmpada começa apagada. */
  const g_ = (op, ...f) => ({ op, f }), e_ = e => ({ e });
  const CIRCUITOS = [
    { dica: 'A porta NÃO inverte: entra 1, sai 0.', ch: { A: [1] }, c: g_('NÃO', e_('A')) },
    { dica: 'A porta E só acende quando as duas entradas são 1.', ch: { A: [0], B: [1] }, c: g_('E', e_('A'), e_('B')) },
    { dica: 'A porta OU acende quando pelo menos uma entrada é 1. A chave B está travada.', ch: { A: [0], B: [0, 1] }, c: g_('OU', e_('A'), e_('B')) },
    { dica: 'Combine E com NÃO: B precisa chegar invertido.', ch: { A: [0], B: [1] }, c: g_('E', e_('A'), g_('NÃO', e_('B'))) },
    { dica: 'C está travada em 0. Então o E de cima precisa acender.', ch: { A: [1], B: [0], C: [0, 1] }, c: g_('OU', g_('E', e_('A'), e_('B')), e_('C')) },
    { dica: 'As chaves estão travadas: agora você escolhe a porta. Clique no ❓ para trocar entre E e OU.', ch: { A: [1, 1], B: [0, 1] }, c: g_('?', e_('A'), e_('B')) },
    { dica: 'Quem precisa ser 1? Quem precisa ser 0? Pense de trás para a frente, a partir da lâmpada.', ch: { A: [0], B: [0], C: [1] }, c: g_('E', g_('OU', e_('A'), e_('B')), g_('NÃO', e_('C'))) },
    { dica: 'Depois da porta escolhida vem um NÃO. Que porta dá 0 com essas entradas?', ch: { A: [1, 1], B: [0, 1] }, c: g_('NÃO', g_('?', e_('A'), e_('B'))) },
    { dica: 'Escolha a porta e mexa nas chaves livres. As duas metades do E precisam dar 1.', ch: { A: [0], B: [1, 1], C: [1] }, c: g_('E', g_('?', e_('A'), e_('B')), g_('NÃO', e_('C'))) },
    { dica: 'Este circuito é o "OU exclusivo": acende quando A e B são diferentes.', ch: { A: [1], B: [1] }, c: g_('OU', g_('E', e_('A'), g_('NÃO', e_('B'))), g_('E', g_('NÃO', e_('A')), e_('B'))) }
  ];
  // qual circuito cada portão tem: o caminho principal fica mais difícil a cada vila; os atalhos têm os mais difíceis; a Sala da Matemática não tem
  const chavePortao = (a, b) => Math.min(a, b) + '-' + Math.max(a, b);
  const circuitoDo = (a, b) => {
    if (a === IDX_MAT || b === IDX_MAT) return null;
    const lo = Math.min(a, b), hi = Math.max(a, b);
    if (hi - lo === 1) return Math.min(lo, 6);
    return { '0-5': 7, '1-4': 8, '4-7': 9 }[chavePortao(a, b)] ?? null;
  };
  const valorCirc = (n, ch, slots) => {   // null = ainda tem porta ❓ sem escolher no caminho
    if (n.e) return ch[n.e];
    const op = n.op === '?' ? slots.get(n) : n.op, v = n.f.map(k => valorCirc(k, ch, slots));
    if (!op || v.includes(null)) return null;
    return op === 'NÃO' ? 1 - v[0] : op === 'E' ? v[0] & v[1] : v[0] | v[1];
  };
  function svgCirc(C, ch, slots) {
    const altura = n => n.e ? 0 : 1 + Math.max(...n.f.map(altura)), H = altura(C.c), folhas = [];
    const pos = new Map(), DX = 96, X0 = 14, DY = 46;
    const lay = (n, d) => { if (n.e) { const y = 26 + folhas.length * DY; folhas.push(n); pos.set(n, [X0, y]); return y; } const ys = n.f.map(k => lay(k, d + 1)), y = ys.reduce((s, v) => s + v, 0) / ys.length; pos.set(n, [X0 + 58 + (H - d - 1) * DX + 20, y]); return y; };
    lay(C.c, 0);
    const W = X0 + 58 + H * DX + 80, Ht = 26 + folhas.length * DY - 10, cor = v => v ? '#e8a400' : v === 0 ? '#a39d92' : '#d6cfc2';
    let fios = '', caixas = '';
    const desenha = n => {
      const [x, y] = pos.get(n), v = valorCirc(n, ch, slots);
      if (n.e) { const [, trava] = C.ch[n.e]; caixas += `<g class="circ-chave${trava ? ' trava' : ''}" data-ch="${n.e}"${trava ? '' : ' tabindex="0" role="button"'}><rect x="${x}" y="${y - 15}" width="58" height="30" rx="8" fill="${ch[n.e] ? '#ffe9a8' : '#eee8dc'}" stroke="${cor(v)}" stroke-width="3"/><text x="${x + 29}" y="${y + 5}" text-anchor="middle">${n.e} = ${ch[n.e]}${trava ? ' 🔒' : ''}</text></g>`; return; }
      for (const k of n.f) { const [kx, ky] = pos.get(k), sx = kx + (k.e ? 58 : 56), mx = (sx + x) / 2; fios += `<path d="M${sx} ${ky} H${mx} V${y + (n.f.length > 1 ? (k === n.f[0] ? -8 : 8) : 0)} H${x}" fill="none" stroke="${cor(valorCirc(k, ch, slots))}" stroke-width="4"/>`; desenha(k); }
      const rot = n.op === '?' ? (slots.get(n) ? slots.get(n) + ' ✎' : '❓') : n.op;
      caixas += `<g class="circ-porta${n.op === '?' ? ' slot' : ''}"${n.op === '?' ? ` tabindex="0" role="button" data-slot="${[...slots.keys()].indexOf(n)}"` : ''}><rect x="${x}" y="${y - 18}" width="56" height="36" rx="${n.op === 'NÃO' ? 18 : 6}" fill="#fffaf0" stroke="#5c4a36" stroke-width="2"${n.op === '?' ? ' stroke-dasharray="5 4"' : ''}/><text x="${x + 28}" y="${y + 5}" text-anchor="middle" font-weight="700">${rot}</text></g>`;
    };
    desenha(C.c);
    const [rx, ry] = pos.get(C.c), luz = valorCirc(C.c, ch, slots), lx = rx + 56 + 40;
    fios += `<path d="M${rx + 56} ${ry} H${lx - 14}" stroke="${cor(luz)}" stroke-width="4"/>`;
    caixas += `<circle cx="${lx}" cy="${ry}" r="16" fill="${luz ? '#ffd23f' : '#d8d2c6'}" stroke="#5c4a36" stroke-width="2"/>${luz ? `<circle cx="${lx}" cy="${ry}" r="24" fill="none" stroke="#ffd23f" stroke-width="3" opacity=".6"/>` : ''}<text x="${lx}" y="${ry + 34}" text-anchor="middle" font-size="12">${luz ? 'acesa!' : 'apagada'}</text>`;
    return `<svg class="circ-svg" viewBox="0 0 ${W} ${Math.max(Ht, ry + 44)}" role="img" aria-label="Circuito com portas lógicas">${fios}${caixas}</svg>`;
  }
  function circuitoPortao(f, p, aoAbrir) {
    const k = circuitoDo(f.idx, p.para), C = CIRCUITOS[k], ch = {}, slots = new Map(), prox = fases[p.para];
    for (const e in C.ch) ch[e] = C.ch[e][0];
    const acha = n => { if (n.op === '?') slots.set(n, null); (n.f || []).forEach(acha); }; acha(C.c);
    let aberto = false, foco = null;
    const desenha = () => {
      const luz = !aberto && [...slots.values()].every(Boolean) && valorCirc(C.c, ch, slots) === 1;
      dialogo('⚡', 'Portão com circuito', `<p>Este portão para <b>${esc(prox.icone)} ${esc(prox.nome)}</b> só abre com a <b>lâmpada acesa</b>. Clique nas chaves${slots.size ? ' e no ❓' : ''} para montar o circuito.</p>${svgCirc(C, ch, slots)}<p class="muted small">💡 ${esc(C.dica)} · E: 1 só se as duas forem 1 · OU: 1 se alguma for 1 · NÃO: inverte.</p>`,
        luz || aberto ? [{ txt: 'Passar pelo portão', classe: 'principal', fn: () => { fechaDialogo(); aoAbrir(); } }] : [{ txt: 'Fico aqui', fn: fechaDialogo }]);
      if (luz) {
        aberto = true; S.circ = S.circ || {}; const nova = !S.circ[chavePortao(f.idx, p.para)]; S.circ[chavePortao(f.idx, p.para)] = true;
        contaResposta(); progressoMundo('circ:' + k, true); ganhaHabilidade(['PC'], 10); feitoMundo('circuito'); if (nova) { S.acertos++; pontos(20, '⚡ Circuito montado! Portão aberto.'); } SOM.toca('portao'); salvar();
        D.texto.insertAdjacentHTML('beforeend', '<p><strong>✅ A lâmpada acendeu e o portão abriu!</strong> Ele fica aberto daqui para a frente.</p>');
        return;
      }
      const clica = (sel, fn) => D.texto.querySelectorAll(sel).forEach(el => { el.addEventListener('click', () => fn(el)); el.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); fn(el); } }); });
      clica('.circ-chave:not(.trava)', el => { ch[el.dataset.ch] ^= 1; SOM.toca('coleta'); foco = '[data-ch="' + el.dataset.ch + '"]'; desenha(); });
      clica('.circ-porta.slot', el => { const n = [...slots.keys()][+el.dataset.slot]; slots.set(n, slots.get(n) === 'E' ? 'OU' : 'E'); foco = '[data-slot="' + el.dataset.slot + '"]'; desenha(); });
      if (foco) { const el = D.texto.querySelector(foco); if (el) el.focus(); }
    };
    desenha();
  }
  function portao(f, p) {
    const prox = fases[p.para];
    if (liberada(prox) && circuitoDo(f.idx, p.para) != null && !(S.circ || {})[chavePortao(f.idx, p.para)]) return circuitoPortao(f, p, () => trocaFase(p.para, f.idx));
    if (liberada(prox)) { dialogo('🚪', 'Portão', `<p>Este portão, no lado ${LADOS[p.lado].nome}, leva para <strong>${esc(prox.icone)} ${esc(prox.nome)}</strong>.</p>`, [{ txt: 'Ir agora', classe: 'principal', fn: () => { fechaDialogo(); trocaFase(p.para, f.idx); } }, { txt: 'Fico aqui', fn: fechaDialogo }]); return; }
    const falta = missoes(f).filter(m => !m.ok).map(m => `${esc(m.nome)} (${m.n}/${m.meta})`);
    dialogo('🔒', 'Portão fechado', `<p>Para seguir para <strong>${esc(prox.nome)}</strong>, complete as missões de ${esc(f.nome)}:</p><p>${falta.join('<br>')}</p>`, [{ txt: 'Vou lá!', fn: fechaDialogo }]);
  }
  /* madeira e pedra: cada árvore ou rocha dá 1 por dia, e só com a ferramenta comprada no Mercadinho */
  const CHANCE_DIAMANTE = [1, 4];
  function juntaRecurso(a) {
    const ferr = a.rec === 'madeira' ? 'machado' : 'picareta', [fic, fnome] = ferr === 'machado' ? ['🪓', 'machado'] : ['⛏️', 'picareta'];
    if (!S.loja.tem['ferr:' + ferr]) return dialogo(fic, a.rec === 'madeira' ? 'Árvore' : 'Rocha', `<p>Para tirar ${ITENS[a.rec][0]} ${a.rec} daqui, você precisa de ${ferr === 'machado' ? 'um' : 'uma'} <b>${fnome}</b>. Compre no 🍎 Mercadinho, na Praça dos Números.</p><p class="muted small">Com madeira e pedra, a bancada da sua casa faz móveis novos.${a.rec === 'pedra' ? ' E, minerando as rochas, às vezes aparece um 💎 diamante!' : ''}</p>`, [{ txt: 'Entendi', fn: fechaDialogo }]);
    const R = S.recursos && S.recursos.dia === diaHoje() ? S.recursos : (S.recursos = { dia: diaHoje(), feitos: {} }), chave = `${atual.id}:${a.obj.x}:${a.obj.y}`;
    if (R.feitos[chave]) return aviso(a.rec === 'madeira' ? '🌳 Esta árvore já deu madeira hoje. Tente outra!' : '🪨 Esta rocha já deu pedra hoje. Tente outra!');
    R.feitos[chave] = true; S.inv[a.rec] = (S.inv[a.rec] || 0) + 1;
    SOM.toca('coleta'); aviso(`${ITENS[a.rec][0]} +1 ${ITENS[a.rec][1].toLowerCase()} (você tem ${S.inv[a.rec]})`); hud(); salvar();
    // minerando, às vezes aparece um diamante (chance de 1 em 4); ele vem para o inventário com uma resposta certa
    if (a.rec === 'pedra' && Math.random() < CHANCE_DIAMANTE[0] / CHANCE_DIAMANTE[1]) setTimeout(() => {
      const f = atual, p = sorteiaPergunta(f);
      dialogo('💎', 'Um diamante na rocha!', `<p>Junto com a pedra, apareceu um <b>💎 diamante</b>! A chance é de <b>${CHANCE_DIAMANTE[0]} em ${CHANCE_DIAMANTE[1]}</b> a cada pedra tirada.</p><p>Responda certo para levar o diamante.</p>`,
        [{ txt: 'Responder', classe: 'principal', fn: () => pergunta('Diamante', '💎', p, certo => { if (certo) { S.inv.diamante = (S.inv.diamante || 0) + 1; salvar(); hud(); aviso(`💎 Diamante guardado no inventário! (você tem ${S.inv.diamante})`); } else aviso('O diamante escorregou de volta para a rocha. Na próxima pedra, quem sabe!'); }) }, { txt: 'Deixar para lá', fn: fechaDialogo }]);
    }, 500);
  }
  // pesca: cada isca é uma tentativa; as chances de cada peixe aparecem como fração, para conversar sobre probabilidade
  const PESCA = [['peixe', 5], ['peixeColorido', 2], ['camarao', 2], ['bota', 1]];
  function pesca() {
    if (!S.loja.tem['ferr:vara']) return dialogo('🎣', 'Laguinho', '<p>Para pescar aqui, você precisa de uma <b>vara de pesca</b> e de <b>iscas</b>. As duas estão no 🍎 Mercadinho, na Praça dos Números.</p>', [{ txt: 'Entendi', fn: fechaDialogo }]);
    if (!S.inv.isca) return dialogo('🪱', 'Sem iscas', '<p>Suas iscas acabaram. Compre mais no 🍎 Mercadinho, na Praça dos Números.</p>', [{ txt: 'Entendi', fn: fechaDialogo }]);
    S.inv.isca--; salvar(); hud();
    let fisgou = false, tPuxa = null;
    const total = PESCA.reduce((a, [, n]) => a + n, 0);
    const chances = '<p class="muted small">Chances em cada isca: ' + PESCA.map(([k, n]) => `${k === 'bota' ? '🥾' : ITENS[k][0]} ${n} em ${total}`).join(' · ') + '</p>';
    const resultado = ok => {
      clearTimeout(tPuxa); if (fisgou) return; fisgou = true;
      if (!ok) return dialogo('💨', 'Escapou!', `<p>O peixe soltou a isca. Você ainda tem 🪱 ${S.inv.isca || 0}.</p>${chances}`, [...(S.inv.isca ? [{ txt: 'Pescar de novo', classe: 'principal', fn: pesca }] : []), { txt: 'Parar', fn: fechaDialogo }]);
      let sorte = Math.random() * total, k = PESCA[0][0];
      for (const [id, n] of PESCA) { if ((sorte -= n) < 0) { k = id; break; } }
      const P2 = S.pesca || (S.pesca = { total: 0, tipos: {} }); P2.total++; P2.tipos[k] = (P2.tipos[k] || 0) + 1;
      let txt;
      if (k === 'bota') { S.pontos += 5; txt = '<p>Você pescou uma 🥾 bota velha! Ela vai para a reciclagem e você ganha <b>5 ⭐</b> por limpar o laguinho.</p>'; }
      else { S.inv[k] = (S.inv[k] || 0) + 1; txt = `<p>Você pescou ${ITENS[k][0]} <b>${ITENS[k][1].toLowerCase()}</b>! Ele vai para o inventário e pode ser comida para o seu pet 🐾.</p>`; }
      SOM.toca('coleta'); hud(); salvar();
      dialogo(k === 'bota' ? '🥾' : ITENS[k][0], 'Pescou!', `${txt}<p class="small">Peixes pescados até agora: <b>${P2.total}</b> · iscas: 🪱 ${S.inv.isca || 0}</p>${chances}`, [...(S.inv.isca ? [{ txt: 'Pescar de novo', classe: 'principal', fn: pesca }] : []), { txt: 'Parar', fn: fechaDialogo }]);
    };
    dialogo('🎣', 'Pescando...', '<p>Você jogou a linha no laguinho. Espere o peixe morder a isca!</p>', [{ txt: 'Puxar', fn: () => resultado(false) }, { txt: 'Parar', fn: () => { fisgou = true; clearTimeout(tPuxa); fechaDialogo(); } }]);
    tPuxa = setTimeout(() => {
      if (fisgou || !dialogoAberto || D.nome.textContent !== 'Pescando...') return;
      // com "menos movimento" ligado, o peixe espera o tempo que for preciso
      dialogo('🐟', 'Mordeu!', '<p><b>O peixe mordeu! Puxe agora!</b></p>', [{ txt: 'Puxar!', classe: 'principal', fn: () => resultado(true) }]);
      anuncia('O peixe mordeu! Puxe agora!');
      if (!ACESS.p().calmo) tPuxa = setTimeout(() => { if (dialogoAberto && D.nome.textContent === 'Mordeu!') resultado(false); }, 2000);
    }, 1200 + Math.random() * 1800);
  }
  function interage() {
    if (dialogoAberto || janelaAberta) return;
    if (colocando) { colocaAqui(); return; }
    const a = alvoPerto(); if (!a) return;
    destino = null;
    if (a.tipo === 'recurso') return juntaRecurso(a); if (a.tipo === 'pesca') return pesca(); if (a.tipo === 'sala') return entraSala(a.sala.id); if (a.tipo === 'portalTele') return portalTele(); if (a.tipo === 'sobj') return SALAS[sala].usa(a.obj); if (a.tipo === 'ssaida') return saiSala(); if (a.tipo === 'pet') abreJanela('pet'); else if (a.tipo === 'loja') abreLoja(atual.loja.id); else if (a.tipo === 'projetos') abreJanela('projetos'); else if (a.tipo === 'banco') abreJanela('banco'); else if (a.tipo === 'prof') falaProf(atual); else if (a.tipo === 'enigma') entraEnigma(); else if (a.tipo === 'eobj') usaEnigma(a.obj); else if (a.tipo === 'esaida') saiEnigma(); else if (a.tipo === 'minhacasa') entraCasa(); else if (a.tipo === 'movel') usaMovel(a.movel); else if (a.tipo === 'saida') saiCasa(); else if (a.tipo === 'casa') (pistaNaCasa(a.casa) >= 0 ? pistaMisterio(pistaNaCasa(a.casa), a.casa) : abreCasa(a.casa)); else if (a.tipo === 'npc') falaNpc(a.npc); else if (a.tipo === 'placa') lePlaca(a.fase); else portao(a.fase, a.portal);
  }

  /* --- Horta da casa: cada semente cresce um tanto fixo de cm por dia regado (uma função afim). Para regar, o estudante calcula
     a altura de depois da rega ou quantas regas faltam; o gráfico mostra o crescimento de cada canteiro. */
  const SEMENTES = {
    girassol: { ic: '🌻', nome: 'Girassol', cm: 6, meta: 60, cor: '#e0a400' },
    tomate: { ic: '🍅', nome: 'Tomate', cm: 3, meta: 24, cor: '#e0564a', item: 'tomate', n: 3 },
    cenoura: { ic: '🥕', nome: 'Cenoura', cm: 2, meta: 14, cor: '#e07b2a', item: 'cenoura', n: 3 },
    alface: { ic: '🥬', nome: 'Alface', cm: 4, meta: 20, cor: '#4bb259', item: 'alface', n: 2 }
  };
  const EST_HORTA = () => S.horta || (S.horta = { c: [null, null, null] });
  const alturaHorta = c => c.h[c.h.length - 1][1];
  function janelaHorta() {
    const H = EST_HORTA(), hoje = diaHoje();
    $('#horta-c').innerHTML = `<div class="horta">${H.c.map((c, i) => {
      if (!c) return `<div class="canteiro vazio"><b>Canteiro ${i + 1}</b><span class="muted small">Vazio. Escolha uma semente:</span><span class="btn-row">${Object.entries(SEMENTES).map(([k, s]) => `<button type="button" class="hb verde" data-plantar="${i}:${k}" title="${s.nome}: cresce ${s.cm} cm por dia regado, colhe com ${s.meta} cm">${s.ic}</button>`).join('')}</span></div>`;
      const s = SEMENTES[c.s], h = alturaHorta(c), pronta = h >= s.meta, regou = c.ultima === hoje;
      return `<div class="canteiro"><b>${s.ic} ${s.nome}</b><span class="small">${h} cm de ${s.meta} cm · cresce ${s.cm} cm por dia regado</span>
        <span class="barra"><span style="width:${Math.min(100, Math.round(100 * h / s.meta))}%;background:${s.cor}"></span></span>
        ${pronta ? `<button type="button" class="hb verde" data-colher="${i}">🧺 Colher</button>` : regou ? '<span class="muted small">💧 Já regado hoje. Volte amanhã!</span>' : `<button type="button" class="hb azul" data-regar="${i}">💧 Regar</button>`}</div>`;
    }).join('')}</div>`;
    const j = $('#j-horta');
    j.querySelectorAll('[data-plantar]').forEach(b => b.addEventListener('click', () => { const [i, k] = b.dataset.plantar.split(':'); H.c[+i] = { s: k, h: [[hoje, 0]], ultima: null }; SOM.toca('coleta'); salvar(); janelaHorta(); }));
    j.querySelectorAll('[data-regar]').forEach(b => b.addEventListener('click', () => regaHorta(+b.dataset.regar)));
    j.querySelectorAll('[data-colher]').forEach(b => b.addEventListener('click', () => colheHorta(+b.dataset.colher)));
    graficoHorta();
  }
  function regaHorta(i) {
    const H = EST_HORTA(), c = H.c[i], s = SEMENTES[c.s], h = alturaHorta(c), falta = Math.ceil((s.meta - h) / s.cm);
    const volta = () => { fechaDialogo(); abreJanela('horta'); };
    const cresce = () => { c.h.push([diaHoje(), h + s.cm]); c.ultima = diaHoje(); feitoMundo('horta'); ganhaHabilidade(['AL', 'NU'], 6); pontos(5, `💧 ${s.nome} regado: agora com ${h + s.cm} cm!`); SOM.toca('coleta'); salvar(); volta(); };
    const tipo = c.h.length % 2 && falta > 1 ? 'falta' : 'altura';
    fechaJanela();
    if (tipo === 'altura') tentaCampo(`Regar: ${s.nome}`, s.ic, `<p>O ${s.nome.toLowerCase()} tem <b>${h} cm</b> e cresce <b>${s.cm} cm</b> a cada dia regado.</p><p class="cifra">altura depois da rega de hoje = ? cm</p><p class="muted small">Digite só o número de centímetros.</p>`, String(h + s.cm), cresce,
      () => dialogo(s.ic, 'Quase!', `<p>Some o que ele já tem (${h} cm) com o quanto cresce num dia (${s.cm} cm).</p>`, [{ txt: 'Tentar de novo', classe: 'principal', fn: () => regaHorta(i) }, { txt: 'Fechar', fn: volta }]));
    else tentaCampo(`Regar: ${s.nome}`, s.ic, `<p>O ${s.nome.toLowerCase()} tem <b>${h} cm</b>, cresce <b>${s.cm} cm</b> por dia regado e fica pronto para colher com <b>${s.meta} cm</b>.</p><p class="cifra">quantas regas faltam para colher (contando a de hoje)?</p><p class="muted small">Se a conta não der exata, arredonde para cima: a última rega passa um pouco da meta.</p>`, String(falta), cresce,
      () => dialogo(s.ic, 'Quase!', `<p>Faltam ${s.meta} − ${h} = ${s.meta - h} cm. Divida por ${s.cm} e, se sobrar resto, conte mais uma rega.</p>`, [{ txt: 'Tentar de novo', classe: 'principal', fn: () => regaHorta(i) }, { txt: 'Fechar', fn: volta }]));
  }
  function colheHorta(i) {
    const H = EST_HORTA(), c = H.c[i], s = SEMENTES[c.s];
    H.c[i] = null; H.colheitas = (H.colheitas || 0) + 1;
    if (s.item) S.inv[s.item] = (S.inv[s.item] || 0) + s.n;
    pontos(s.item ? 20 : 40, s.item ? `🧺 Colheu ${s.n} ${s.ic}! O pet vai adorar.` : `🌻 Que girassol lindo! +40 ⭐`); SOM.toca('vitoria'); salvar(); janelaHorta();
  }
  function graficoHorta() {
    const cv2 = $('#horta-graf'), g = cv2.getContext('2d'), W2 = cv2.width, H2 = cv2.height, m = { l: 40, r: 12, t: 12, b: 30 };
    const cs = EST_HORTA().c.filter(Boolean), maxD = Math.max(5, ...cs.map(c => c.h.length - 1)), maxH = Math.max(20, ...cs.map(c => SEMENTES[c.s].meta));
    g.clearRect(0, 0, W2, H2); g.fillStyle = '#fffdf6'; g.fillRect(0, 0, W2, H2);
    const X = d => m.l + d / maxD * (W2 - m.l - m.r), Y = v => H2 - m.b - v / maxH * (H2 - m.t - m.b);
    g.strokeStyle = '#d9c99a'; g.lineWidth = 1; g.font = '11px Lexend, sans-serif'; g.fillStyle = '#5a6a5c'; g.textAlign = 'right'; g.textBaseline = 'middle';
    for (let v = 0; v <= maxH; v += maxH > 40 ? 10 : 5) { g.beginPath(); g.moveTo(m.l, Y(v)); g.lineTo(W2 - m.r, Y(v)); g.stroke(); g.fillText(v, m.l - 6, Y(v)); }
    g.textAlign = 'center'; g.textBaseline = 'top'; for (let d = 0; d <= maxD; d++) g.fillText(d, X(d), H2 - m.b + 6);
    g.fillText('regas', W2 / 2 + 60, H2 - 14); g.save(); g.translate(10, H2 / 2); g.rotate(-Math.PI / 2); g.fillText('altura (cm)', 0, -4); g.restore();
    for (const c of cs) { const s = SEMENTES[c.s]; g.strokeStyle = s.cor; g.fillStyle = s.cor; g.lineWidth = 3; g.beginPath(); c.h.forEach(([, v], d) => d ? g.lineTo(X(d), Y(v)) : g.moveTo(X(d), Y(v))); g.stroke(); c.h.forEach(([, v], d) => { g.beginPath(); g.arc(X(d), Y(v), 3.5, 0, Math.PI * 2); g.fill(); }); g.setLineDash([4, 4]); g.lineWidth = 1; g.beginPath(); g.moveTo(m.l, Y(s.meta)); g.lineTo(W2 - m.r, Y(s.meta)); g.stroke(); g.setLineDash([]); }
    if (!cs.length) { g.fillStyle = '#5a6a5c'; g.font = '13px Lexend, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('Plante uma semente para ver o gráfico do crescimento.', W2 / 2, H2 / 2); }
  }
  /* --- Bilhetes secretos: o estudante cifra um bilhete com a Cifra de César e manda o código (MUNB1) para um amigo.
     A chave não vai no código: o amigo combina a chave com quem mandou ou testa as 25 possíveis (força bruta).
     O código leva só um resumo do texto, para o Mundo saber quando o bilhete foi decifrado. */
  const semAcento = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
  const cifraTexto = (t, k) => cesar(semAcento(t), k);   // a mesma cifra da Casa do Enigma, sem acentos
  const resumoTexto = t => { let h = 7; for (const ch of semAcento(t)) h = (h * 31 + ch.charCodeAt(0)) % 1000003; return h; };
  let bilheteAberto = null;
  function janelaBilhetes() {
    const B = S.bilhetes || (S.bilhetes = { lidos: {}, dia: 0, n: 0 });
    $('#bilhetes-conteudo').innerHTML = `<p>Escreva um bilhete, escolha uma <b>chave</b> de 1 a 25 e o Mundo troca cada letra pela que está tantas posições à frente no alfabeto. É a <b>Cifra de César</b>, usada há mais de 2 mil anos. Mande o código para um amigo e combine a chave com ele, ou desafie-o a descobrir!</p>
      <h3>✍️ Escrever</h3>
      <label>Seu apelido <input id="bi-de" class="campo" maxlength="20" value="${esc(S.apelido || '')}" autocomplete="off" placeholder="Ex.: Bia do 8A"></label>
      <label>Bilhete <input id="bi-txt" class="campo" maxlength="80" autocomplete="off" placeholder="Ex.: Te encontro na Sala da Matemática"></label>
      <label>Chave <select id="bi-k" class="campo">${Array.from({ length: 25 }, (_, i) => `<option value="${i + 1}"${i + 1 === 3 ? ' selected' : ''}>${i + 1}</option>`).join('')}</select></label>
      <p class="muted small">Não escreva nome completo, telefone, endereço nem senhas.</p>
      <p class="cifra" id="bi-prev">…</p>
      <div class="btn-row"><button type="button" class="hb verde" id="bi-gerar">🔐 Gerar código do bilhete</button></div>
      <div id="bi-saida" hidden><textarea id="bi-codigo" class="campo" rows="2" readonly aria-label="Código do bilhete"></textarea><div class="btn-row"><button type="button" class="hb azul" id="bi-copiar">📋 Copiar</button></div></div>
      <h3>📩 Ler um bilhete</h3>
      <textarea id="bi-colar" class="campo" rows="2" placeholder="Cole aqui o código do bilhete (começa com MUNB1)" aria-label="Colar código de bilhete"></textarea>
      <div class="btn-row"><button type="button" class="hb verde" id="bi-abrir">📬 Abrir</button></div>
      <div id="bi-ler"></div>`;
    const prev = () => { $('#bi-prev').textContent = $('#bi-txt').value ? cifraTexto($('#bi-txt').value, +$('#bi-k').value) : 'O bilhete cifrado aparece aqui.'; };
    $('#bi-txt').addEventListener('input', prev); $('#bi-k').addEventListener('change', prev); prev();
    $('#bi-gerar').addEventListener('click', async () => {
      const de = $('#bi-de').value.trim().slice(0, 20), t = $('#bi-txt').value.trim().slice(0, 80);
      if (!de || !t) return aviso('Escreva o seu apelido e o bilhete.');
      S.apelido = S.apelido || de; salvar();
      try { $('#bi-codigo').value = await MDP.pacote.empacotar('MUNB1', { de, c: cifraTexto(t, +$('#bi-k').value), h: resumoTexto(t) }); $('#bi-saida').hidden = false; $('#bi-codigo').select(); feitoMundo('bilhete'); S.bilhetes = S.bilhetes || { lidos: {}, dia: 0, n: 0 }; S.bilhetes.enviados = (S.bilhetes.enviados || 0) + 1; salvar(); } catch (e) { aviso('Não deu para gerar o código neste navegador.'); }
    });
    $('#bi-copiar').addEventListener('click', async () => { $('#bi-codigo').select(); try { await navigator.clipboard.writeText($('#bi-codigo').value); aviso('📋 Código copiado! Mande para o seu amigo.'); } catch (e) { document.execCommand('copy'); } });
    $('#bi-abrir').addEventListener('click', async () => {
      const c = (String($('#bi-colar').value).match(/MUNB1[jz]\.[A-Za-z0-9_-]+/) || [])[0];
      if (!c) return aviso('Não achei um código de bilhete (começa com MUNB1).');
      try { const o = await MDP.pacote.desempacotar('MUNB1', c); if (!o || typeof o.c !== 'string') throw 0; bilheteAberto = { de: String(o.de || 'Alguém').slice(0, 20), c: o.c.slice(0, 80), h: +o.h }; mostraBilhete(); } catch (e) { aviso('Esse código não abriu. Confira se copiou inteiro.'); }
    });
    if (bilheteAberto) mostraBilhete();
  }
  function mostraBilhete() {
    const b = bilheteAberto, B = S.bilhetes, chave = `${b.de}:${b.h}`, lido = B.lidos[chave];
    $('#bi-ler').innerHTML = `<p>✉️ Bilhete de <b>${esc(b.de)}</b>:</p><p class="cifra">${esc(b.c)}</p>
      <label>Voltar quantas posições? <input type="range" id="bi-volta" min="0" max="25" value="${lido ? lido : 0}"> <b id="bi-vk">${lido || 0}</b></label>
      <p class="cifra" id="bi-dec"></p><div class="btn-row"><button type="button" class="hb verde" id="bi-ok">🔓 É essa a mensagem!</button></div>
      <p class="muted small">Não sabe a chave? Teste uma por uma: são só 25. Isso se chama <b>força bruta</b>, e é por isso que a Cifra de César não protege segredos de verdade.</p>`;
    const dec = () => { const k = +$('#bi-volta').value; $('#bi-vk').textContent = k; $('#bi-dec').textContent = cifraTexto(b.c, -k); };
    $('#bi-volta').addEventListener('input', dec); dec();
    $('#bi-ok').addEventListener('click', () => {
      const k = +$('#bi-volta').value;
      if (resumoTexto(cifraTexto(b.c, -k)) !== b.h) return aviso('Ainda não é essa. Tente outra chave!');
      if (B.lidos[chave]) return aviso('🔓 Você já tinha decifrado este bilhete.');
      B.lidos[chave] = k || 26; feitoMundo('bilhete'); const hoje = diaHoje(); if (B.dia !== hoje) { B.dia = hoje; B.n = 0; }
      ganhaHabilidade(['PC', 'CD'], 8);
      if (B.n < 3 && b.de !== S.apelido) { B.n++; pontos(15, `🔓 Bilhete decifrado! A chave era ${k}.`); } else aviso(`🔓 Bilhete decifrado! A chave era ${k}.`);
      SOM.toca('vitoria'); salvar(); mostraBilhete();
    });
  }
  /* --- Trenzinho programável: o estudante monta a sequência de comandos (norte, sul, leste, oeste) que leva o trem da vila
     atual até o destino, pelos trilhos (as ligações entre vilas abertas). Programa errado: o trem para e mostra onde. */
  const DIRS_TREM = { N: [0, -1, '⬆️', 'norte'], S: [0, 1, '⬇️', 'sul'], L: [1, 0, '➡️', 'leste'], O: [-1, 0, '⬅️', 'oeste'] };
  const temTrilho = (a, b) => LIGACOES.some(([x, y]) => (x === a && y === b) || (x === b && y === a)) && liberada(fases[a]) && liberada(fases[b]);
  const vizinhoTrem = (i, d) => { const [dx, dy] = DIRS_TREM[d], [x, y] = GRADE[i]; return GRADE.findIndex(([gx, gy]) => gx === x + dx && gy === y + dy); };
  function menorCaminhoTrem(a, b) {
    const dist = { [a]: 0 }, fila = [a];
    while (fila.length) { const i = fila.shift(); for (const d in DIRS_TREM) { const j = vizinhoTrem(i, d); if (j >= 0 && dist[j] === undefined && temTrilho(i, j)) { dist[j] = dist[i] + 1; fila.push(j); } } }
    return dist[b];
  }
  const TREM = { prog: [], destino: null, pos: null, anim: null };
  function janelaTrem() {
    clearInterval(TREM.anim); TREM.pos = null;
    const opcoes = fases.filter(f => liberada(f) && f !== atual && menorCaminhoTrem(atual.idx, f.idx) !== undefined);
    if (!opcoes.some(f => f.idx === TREM.destino)) TREM.destino = opcoes.length ? opcoes[0].idx : null;
    $('#trem-conteudo').innerHTML = `<p>Monte o <b>programa</b> do trem: a sequência de direções que leva da vila onde você está até o destino. O trem só anda pelos trilhos entre vilas abertas.</p>
      ${opcoes.length ? `<label>Destino <select id="tr-dest" class="campo">${opcoes.map(f => `<option value="${f.idx}"${f.idx === TREM.destino ? ' selected' : ''}>${f.icone} ${esc(f.nome)}</option>`).join('')}</select></label>` : '<p class="muted">Abra mais vilas para ter para onde ir de trem!</p>'}
      <canvas id="tr-cv" width="520" height="300" aria-label="Mapa dos trilhos entre as vilas"></canvas>
      <p><b>Programa:</b> <span id="tr-prog" class="trem-prog"></span></p>
      <div class="btn-row">${Object.entries(DIRS_TREM).map(([k, [, , ic, nome]]) => `<button type="button" class="hb azul" data-dir="${k}" aria-label="${nome}">${ic} ${nome}</button>`).join('')}</div>
      <div class="btn-row"><button type="button" class="hb cinza" id="tr-apaga">⌫ Apagar o último</button><button type="button" class="hb cinza" id="tr-limpa">🗑️ Limpar</button><button type="button" class="hb verde" id="tr-vai" ${opcoes.length ? '' : 'disabled'}>🚂 Partir!</button></div>
      <p class="muted small" id="tr-msg"></p>`;
    const sel = $('#tr-dest'); if (sel) sel.addEventListener('change', () => { TREM.destino = +sel.value; desenhaTrem(); });
    $('#j-trem').querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => { if (TREM.prog.length < 12) TREM.prog.push(b.dataset.dir); desenhaTrem(); }));
    $('#tr-apaga').addEventListener('click', () => { TREM.prog.pop(); desenhaTrem(); });
    $('#tr-limpa').addEventListener('click', () => { TREM.prog = []; desenhaTrem(); });
    $('#tr-vai').addEventListener('click', partirTrem);
    desenhaTrem();
  }
  function desenhaTrem() {
    const cv2 = $('#tr-cv'); if (!cv2) return;
    const g = cv2.getContext('2d'), xs = GRADE.map(p => p[0]), x0 = Math.min(...xs), cw = cv2.width / (Math.max(...xs) - x0 + 1), ch = cv2.height / 3;
    const c = i => [(GRADE[i][0] - x0 + 0.5) * cw, (GRADE[i][1] + 0.5) * ch];
    g.fillStyle = '#cfe9c4'; g.fillRect(0, 0, cv2.width, cv2.height);
    for (const [a, b] of LIGACOES) { const [ax, ay] = c(a), [bx, by] = c(b), ok = temTrilho(a, b); g.strokeStyle = ok ? '#7a523a' : 'rgba(122,82,58,.2)'; g.lineWidth = 8; g.setLineDash(ok ? [] : [6, 6]); g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.stroke(); g.setLineDash([]);
      if (ok) { g.strokeStyle = '#d9c99a'; g.lineWidth = 2; for (let t = 0.1; t < 1; t += 0.12) { const px = ax + (bx - ax) * t, py = ay + (by - ay) * t, hor = ay === by; g.beginPath(); g.moveTo(px - (hor ? 0 : 7), py - (hor ? 7 : 0)); g.lineTo(px + (hor ? 0 : 7), py + (hor ? 7 : 0)); g.stroke(); } } }
    fases.forEach((f, i) => { const [x, y] = c(i), ok = liberada(f); g.fillStyle = i === TREM.destino ? '#f6b73c' : ok ? '#fffdf6' : '#9aa3ad'; g.strokeStyle = i === atual.idx ? '#e0564a' : '#3f8f4b'; g.lineWidth = i === atual.idx ? 4 : 2; g.beginPath(); g.arc(x, y, 26, 0, Math.PI * 2); g.fill(); g.stroke();
      g.font = '22px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#000'; g.fillText(ok ? f.icone : '🔒', x, y); g.font = '600 10px Lexend, sans-serif'; g.fillStyle = '#1d2a1f'; g.fillText(f.nome.slice(0, 22), x, y + 38); });
    const [tx, ty] = TREM.pos || c(atual.idx); g.font = '26px system-ui, sans-serif'; g.fillText('🚂', tx + (TREM.pos ? 0 : -20), ty - 22);
    $('#tr-prog').innerHTML = TREM.prog.length ? TREM.prog.map(d => `<span>${DIRS_TREM[d][2]}</span>`).join('') : '<span class="muted small">vazio: use os botões abaixo</span>';
  }
  function partirTrem() {
    if (TREM.destino === null || !TREM.prog.length) return aviso('Monte um programa com pelo menos um comando.');
    const xs = GRADE.map(p => p[0]), x0 = Math.min(...xs), cv2 = $('#tr-cv'), cw = cv2.width / (Math.max(...xs) - x0 + 1), ch = cv2.height / 3, c = i => [(GRADE[i][0] - x0 + 0.5) * cw, (GRADE[i][1] + 0.5) * ch];
    let i = atual.idx, passo = 0, t = 0, prox = null; const msg = $('#tr-msg');
    clearInterval(TREM.anim); $('#tr-vai').disabled = true;
    const fim = (txt, ok) => { clearInterval(TREM.anim); msg.innerHTML = txt; $('#tr-vai').disabled = false; if (!ok) { TREM.pos = null; setTimeout(desenhaTrem, 1500); } };
    TREM.anim = setInterval(() => {
      if (!prox) {
        if (passo >= TREM.prog.length) {
          if (i !== TREM.destino) return fim(`🛑 O programa acabou em <b>${esc(fases[i].nome)}</b>, não no destino. Ajuste os comandos e tente de novo.`);
          const menor = menorCaminhoTrem(atual.idx, TREM.destino), curto = TREM.prog.length === menor, R = S.trem && S.trem.dia === diaHoje() ? S.trem : (S.trem = { dia: diaHoje(), viagens: 0 });
          R.viagens++; ganhaHabilidade(['PC'], 8); feitoMundo('trem'); if (curto) { S.tremTotal = S.tremTotal || { curtos: 0 }; S.tremTotal.curtos++; }
          if (R.viagens <= 3) pontos(10 + (curto ? 5 : 0), curto ? 'Programa mais curto possível! 🚂' : 'Chegou de trem! 🚂'); else aviso('🚂 Chegou!');
          SOM.toca('portao'); salvar();
          fim(`✅ Chegou em <b>${esc(fases[i].nome)}</b> com ${TREM.prog.length} comando(s).${curto ? ' É o programa mais curto possível!' : ` Dava para chegar com ${menor}.`}`, true);
          const destino = fases[i]; TREM.prog = []; setTimeout(() => { TREM.pos = null; teleporta(destino); }, 1300); return;
        }
        const d = TREM.prog[passo], j = vizinhoTrem(i, d);
        if (j < 0 || !temTrilho(i, j)) return fim(`🛑 No comando ${passo + 1} (${DIRS_TREM[d][2]} ${DIRS_TREM[d][3]}), não tem trilho saindo de <b>${esc(fases[i].nome)}</b> para esse lado.`);
        prox = j; t = 0;
      }
      t += 0.1; const [ax, ay] = c(i), [bx, by] = c(prox); TREM.pos = [ax + (bx - ax) * t, ay + (by - ay) * t]; desenhaTrem();
      if (t >= 1) { i = prox; prox = null; passo++; }
    }, 40);
  }
  /* ---------- pixel art por coordenadas (plano cartesiano): 16×16, x de 0 a 15 para a direita, y de 0 a 15 para cima ----------
     Desenhos guardados como texto de 256 letras (linha de cima primeiro); '.' é vazio. Ficam expostos no Museu. */
  const CORES_PX = { r: ['#e04848', 'vermelho'], o: ['#f08a24', 'laranja'], y: ['#f5c400', 'amarelo'], g: ['#3fa34d', 'verde'], m: ['#8a5a3b', 'marrom'], k: ['#f29bb8', 'rosa'], a: ['#4a90d9', 'azul'], c: ['#9a9a9a', 'cinza'], p: ['#2b2b2b', 'preto'], b: ['#ffffff', 'branco'] };
  const PX_N = 16, PX_VAZIO = '.'.repeat(PX_N * PX_N);
  const pxDe = linhas => { const t = linhas.join(''); return t.length === PX_N * PX_N ? t : PX_VAZIO; };
  const L_ = '................';
  const MODELOS_PX = [
    { id: 'coracao', nome: 'Coração', ic: '❤️', px: pxDe([L_, L_, L_, '...rrr....rrr...', '..rrrrr..rrrrr..', '..rrrrrrrrrrrr..', '..rrrrrrrrrrrr..', '...rrrrrrrrrr...', '....rrrrrrrr....', '.....rrrrrr.....', '......rrrr......', '.......rr.......', L_, L_, L_, L_]) },
    { id: 'arvore', nome: 'Macieira', ic: '🌳', px: pxDe([L_, '......gggg......', '....gggggggg....', '...gggggrgggg...', '..gggrgggggggg..', '..gggggggggrgg..', '...gggggggggg...', '....gggrgggg....', '......gggg......', '.......mm.......', '.......mm.......', '.......mm.......', '.....mmmmmm.....', L_, L_, L_]) },
    { id: 'casa', nome: 'Casinha', ic: '🏠', px: pxDe([L_, L_, '.......rr.......', '......rrrr......', '.....rrrrrr.....', '....rrrrrrrr....', '...rrrrrrrrrr...', '....yyyyyyyy....', '....yaayyyyy....', '....yaayymmy....', '....yyyyymmy....', '....yyyyymmy....', 'gggggggggggggggg', L_, L_, L_]) },
    { id: 'peixe', nome: 'Peixe', ic: '🐟', px: pxDe([L_, L_, L_, '.......oo.......', '.....oooooo...o.', '...oooooooooooo.', '..oobpoooooooo..', '..oooooooooooo..', '...oooooooooooo.', '.....oooooo...o.', '.......oo.......', L_, L_, L_, L_, L_]) },
    { id: 'sorvete', nome: 'Sorvete', ic: '🍦', px: pxDe([L_, '......kkkk......', '.....kkkkkk.....', '....kkkrkkkk....', '....kkkkkkkk....', '....bbbbbbbb....', '....bbbbbbbb....', '.....oooooo.....', '.....omoomo.....', '......oooo......', '......omoo......', '.......oo.......', '.......o........', L_, L_, L_]) },
    { id: 'robo', nome: 'Robô', ic: '🤖', px: pxDe(['.......rr.......', '.......cc.......', '...cccccccccc...', '...cbbccccbbc...', '...cbpccccbpc...', '...cccccccccc...', '...cccppppccc...', '...cccccccccc...', '.....aaaaaa.....', '...aaaaaaaaaa...', '...aaayyyyaaa...', '...aaaaaaaaaa...', '....pp....pp....', L_, L_, L_]) }
  ];
  const EST_PX = () => S.pixel || (S.pixel = { feitos: {}, galeria: [] });
  const PX = { modelo: 0, cor: 'r', px: PX_VAZIO, pintando: false, nome: '' };   // modelo: índice em MODELOS_PX ou -1 (livre)
  const pxY = r => PX_N - 1 - r;   // linha do texto → coordenada y
  // instruções do modelo: para cada cor, os trechos de cada linha (y) com o x inicial e final
  function instrucoesPx(px) {
    const por = {};
    for (let r = 0; r < PX_N; r++) for (let x = 0; x < PX_N;) {
      const ch = px[r * PX_N + x]; if (ch === '.') { x++; continue; }
      let f = x; while (f + 1 < PX_N && px[r * PX_N + f + 1] === ch) f++;
      (por[ch] = por[ch] || []).push(x === f ? `(${x}, ${pxY(r)})` : `(${x}, ${pxY(r)}) até (${f}, ${pxY(r)})`); x = f + 1;
    }
    return por;
  }
  function imgPx(px, tam) {
    const c = document.createElement('canvas'), s = Math.max(1, Math.floor(tam / PX_N)); c.width = c.height = s * PX_N; const g = c.getContext('2d');
    g.fillStyle = '#fbf7ee'; g.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < PX_N * PX_N; i++) if (CORES_PX[px[i]]) { g.fillStyle = CORES_PX[px[i]][0]; g.fillRect((i % PX_N) * s, Math.floor(i / PX_N) * s, s, s); }
    return c.toDataURL();
  }
  function janelaPixel() {
    const M = MODELOS_PX[PX.modelo], E = EST_PX();
    const cores = M ? [...new Set(M.px.replace(/\./g, ''))] : Object.keys(CORES_PX);
    if (!cores.includes(PX.cor)) PX.cor = cores[0];
    const ins = M ? instrucoesPx(M.px) : null;
    $('#pixel-conteudo').innerHTML = `<p>Pinte quadradinhos usando <b>coordenadas</b>: o primeiro número é o <b>x</b> (anda para a direita) e o segundo é o <b>y</b> (sobe). O ponto (0, 0) fica no canto de baixo, à esquerda.</p>
      <label>Desenho <select id="px-modelo" class="campo"><option value="-1"${PX.modelo < 0 ? ' selected' : ''}>✏️ Desenho livre</option>${MODELOS_PX.map((m, i) => `<option value="${i}"${i === PX.modelo ? ' selected' : ''}>${m.ic} ${esc(m.nome)}${E.feitos[m.id] ? ' ✅' : ''}</option>`).join('')}</select></label>
      <div class="px-area"><div><canvas id="px-cv" width="392" height="392" aria-label="Quadro de pixel art 16 por 16 com coordenadas"></canvas><p class="small" id="px-coord">Passe o mouse no quadro para ver a coordenada.</p></div>
      <div class="px-lado"><div class="px-cores" role="group" aria-label="Cores">${cores.map(k => `<button type="button" class="px-cor${k === PX.cor ? ' sel' : ''}" data-cor="${k}" style="--c:${CORES_PX[k][0]}" title="${CORES_PX[k][1]}">${CORES_PX[k][1]}</button>`).join('')}<button type="button" class="px-cor${PX.cor === '.' ? ' sel' : ''}" data-cor="." style="--c:#fbf7ee">🧽 apagar</button></div>
      <p class="px-digita"><label>Pintar o ponto <input id="px-xy" class="campo" size="7" placeholder="ex.: 3, 12" inputmode="numeric"></label> <button type="button" class="hb azul" id="px-pinta">Pintar</button></p>
      ${M ? `<h3>${M.ic} Modelo: ${esc(M.nome)}</h3><ul class="px-ins">${Object.entries(ins).map(([k, l]) => `<li><span class="px-amostra" style="background:${CORES_PX[k][0]}"></span><b>${CORES_PX[k][1]}</b>: ${l.join(' · ')}</li>`).join('')}</ul>` : '<p class="muted small">Desenhe o que quiser e guarde no Museu (até 8 desenhos ficam expostos).</p><label>Nome do desenho <input id="px-nome" class="campo" maxlength="24" placeholder="Meu desenho"></label>'}
      <div class="btn-row">${M ? '<button type="button" class="hb verde" id="px-confere">✅ Conferir</button>' : '<button type="button" class="hb verde" id="px-guarda">🏛️ Guardar no Museu</button>'}<button type="button" class="hb cinza" id="px-limpa">🗑️ Limpar</button></div>
      <p id="px-msg" class="small" aria-live="polite"></p></div></div>`;
    $('#px-modelo').addEventListener('change', e => { PX.modelo = +e.target.value; PX.px = PX_VAZIO; janelaPixel(); });
    document.querySelectorAll('.px-cor').forEach(b => b.addEventListener('click', () => { PX.cor = b.dataset.cor; document.querySelectorAll('.px-cor').forEach(o => o.classList.toggle('sel', o === b)); }));
    const cv2 = $('#px-cv'), M0 = 28, T = (cv2.width - M0) / PX_N;
    const celula = ev => { const r = cv2.getBoundingClientRect(), x = Math.floor(((ev.clientX - r.left) * cv2.width / r.width - M0) / T), rr = Math.floor((ev.clientY - r.top) * cv2.height / r.height / T); return x >= 0 && x < PX_N && rr >= 0 && rr < PX_N ? [x, rr] : null; };
    const pinta = (x, r) => { const i = r * PX_N + x; if (PX.px[i] === PX.cor) return; PX.px = PX.px.slice(0, i) + PX.cor + PX.px.slice(i + 1); desenhaPixel(); };
    cv2.addEventListener('pointerdown', ev => { const c = celula(ev); if (!c) return; PX.pintando = true; cv2.setPointerCapture(ev.pointerId); pinta(...c); });
    cv2.addEventListener('pointermove', ev => { const c = celula(ev); $('#px-coord').textContent = c ? `Coordenada: (${c[0]}, ${pxY(c[1])})` : ' '; if (c && PX.pintando) pinta(...c); });
    cv2.addEventListener('pointerup', () => { PX.pintando = false; });
    const digita = () => { const m = $('#px-xy').value.match(/(-?\d+)\D+(-?\d+)/); if (!m || +m[1] < 0 || +m[1] > 15 || +m[2] < 0 || +m[2] > 15) return ($('#px-msg').textContent = 'Escreva x e y de 0 a 15, separados por vírgula. Ex.: 3, 12'); pinta(+m[1], PX_N - 1 - +m[2]); $('#px-msg').textContent = `Pintou (${+m[1]}, ${+m[2]}).`; $('#px-xy').select(); };
    $('#px-pinta').addEventListener('click', digita); $('#px-xy').addEventListener('keydown', e => { if (e.key === 'Enter') digita(); });
    $('#px-limpa').addEventListener('click', () => { PX.px = PX_VAZIO; desenhaPixel(); });
    if (M) $('#px-confere').addEventListener('click', conferePixel); else $('#px-guarda').addEventListener('click', guardaPixel);
    desenhaPixel();
  }
  function desenhaPixel() {
    const cv2 = $('#px-cv'); if (!cv2) return; const g = cv2.getContext('2d'), M0 = 28, T = (cv2.width - M0) / PX_N;
    g.clearRect(0, 0, cv2.width, cv2.height); g.fillStyle = '#fbf7ee'; g.fillRect(M0, 0, T * PX_N, T * PX_N);
    for (let i = 0; i < PX_N * PX_N; i++) { const ch = PX.px[i]; if (CORES_PX[ch]) { g.fillStyle = CORES_PX[ch][0]; g.fillRect(M0 + (i % PX_N) * T, Math.floor(i / PX_N) * T, T, T); } }
    g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 1;
    for (let k = 0; k <= PX_N; k++) { g.beginPath(); g.moveTo(M0 + k * T + 0.5, 0); g.lineTo(M0 + k * T + 0.5, T * PX_N); g.stroke(); g.beginPath(); g.moveTo(M0, k * T + 0.5); g.lineTo(M0 + T * PX_N, k * T + 0.5); g.stroke(); }
    g.fillStyle = '#5c4a36'; g.font = '11px system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    for (let k = 0; k < PX_N; k++) { g.fillText(String(k), M0 + (k + 0.5) * T, T * PX_N + 14); g.fillText(String(PX_N - 1 - k), M0 / 2, (k + 0.5) * T); }
  }
  function conferePixel() {
    const M = MODELOS_PX[PX.modelo], E = EST_PX(), msg = $('#px-msg');
    let r = 0; while (r < PX_N && PX.px.slice(r * PX_N, (r + 1) * PX_N) === M.px.slice(r * PX_N, (r + 1) * PX_N)) r++;
    if (r < PX_N) { msg.innerHTML = `Ainda não está igual ao modelo. Confira a linha <b>y = ${pxY(r)}</b>: compare cada (x, ${pxY(r)}) com as instruções.`; return; }
    const nova = !E.feitos[M.id]; E.feitos[M.id] = true;
    E.galeria = [{ nome: M.ic + ' ' + M.nome, px: M.px }].concat(E.galeria.filter(d => d.px !== M.px)).slice(0, 8);
    contaResposta(); progressoMundo('pixel:' + M.id, true); ganhaHabilidade(['GE'], nova ? 12 : 4); feitoMundo('pixel');
    if (nova) { S.acertos++; pontos(30, `🎨 ${M.nome} pintado por coordenadas!`); } else pontos(5, '🎨 Pintou de novo!');
    SOM.toca('vitoria'); salvar();
    msg.innerHTML = `✅ Igualzinho ao modelo! O desenho foi para a galeria do 🏛️ Museu.${MODELOS_PX.some(m => !E.feitos[m.id]) ? ' Escolha outro modelo no menu acima.' : ' Você pintou todos os modelos: agora crie os seus no desenho livre!'}`;
  }
  function guardaPixel() {
    const E = EST_PX(), msg = $('#px-msg');
    if (!/[^.]/.test(PX.px)) return (msg.textContent = 'Pinte pelo menos um quadradinho antes de guardar.');
    const nome = ($('#px-nome').value || 'Meu desenho').trim().slice(0, 24);
    E.galeria = [{ nome: '✏️ ' + nome, px: PX.px }].concat(E.galeria.filter(d => d.px !== PX.px)).slice(0, 8);
    if (!E.livreDia || E.livreDia !== diaHoje()) { E.livreDia = diaHoje(); pontos(10, '🎨 Desenho guardado no Museu!'); } else aviso('🎨 Desenho guardado no Museu!');
    feitoMundo('pixel'); salvar();
    msg.textContent = '✅ Guardado! Ele está exposto na galeria de pixel art do Museu.';
  }
  /* ---------- busca de conteúdos: diz em que vila e para que lado da praça fica, e leva até a porta ---------- */
  const normaliza = t => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function janelaBusca() {
    const el = $('#busca-conteudo');
    el.innerHTML = `<label class="busca-campo"><span>O que você procura?</span><input id="bu-q" class="campo" type="search" autocomplete="off" placeholder="ex.: frações, binário, senha, banco, museu"></label><div id="bu-res" aria-live="polite"></div>`;
    const q = $('#bu-q'); q.addEventListener('input', () => mostraBusca(q.value)); mostraBusca(''); setTimeout(() => q.focus(), 30);
  }
  function mostraBusca(texto) {
    const res = $('#bu-res'), termos = normaliza(texto).split(/\s+/).filter(t => t.length > 1).map(t => { const r = t.replace(/(oes|aes|ais|eis|ao|s|a|o|e)$/, ''); return r.length >= 4 ? r : t; });   // raiz: "fração" acha "frações"
    if (!termos.length) { res.innerHTML = `<p class="muted small">Digite um assunto, um jogo ou um lugar. São ${ONDE.length} casas e prédios em ${fases.length} vilas.</p>`; return; }
    const achados = ONDE.map(o => { const tt = normaliza(o.nome), tr = normaliza(o.resumo); let p = 0; for (const t of termos) { if (tt.includes(t)) p += 3; else if (tr.includes(t)) p += 1; else return null; } return [p, o]; }).filter(Boolean).sort((a, b) => b[0] - a[0]).slice(0, 12).map(x => x[1]);
    if (!achados.length) { res.innerHTML = '<p>Nada encontrado com essas palavras. Tente outra, mais curta (ex.: "fração" em vez de "frações equivalentes").</p>'; return; }
    res.innerHTML = `<ul class="busca-lista">${achados.map((o, i) => { const aberta = liberada(o.f); return `<li><span class="busca-ic">${o.ic}</span><div><b>${esc(o.nome)}</b>${o.resumo ? `<br><span class="muted small">${esc(o.resumo.length > 110 ? o.resumo.slice(0, 108).trim() + '…' : o.resumo)}</span>` : ''}<br><span class="busca-onde">📍 ${o.f.icone} ${esc(o.f.nome)}, ${o.onde}${aberta ? '' : ' · 🔒 vila ainda fechada'}</span></div>${aberta ? `<button type="button" class="hb verde" data-ir="${i}">Ir até lá</button>` : ''}</li>`; }).join('')}</ul>`;
    res.querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => irAte(achados[+b.dataset.ir])));
  }
  function irAte(o) {
    if (atual !== o.f || dentro || noEnigma || sala) { if (sala) saiSala(); teleporta(o.f); } else fechaJanela();
    P.x = o.porta.x; P.y = o.porta.y; destino = null; cam.ok = false; hud();
    setTimeout(() => aviso(`📍 Você está na porta de ${o.nome} (${o.f.nome}, ${o.onde}). Aperte E para entrar.`), 900);   // depois do aviso com o nome da vila
  }
  /* ---------- Cursos do Mundo para apoiadores do Catarse: percursos que juntam várias atividades do Mundo.
     Liberados com a senha do mês da área premium (a mesma do "Usar na minha aula", conferida aqui pelo chaveiro cifrado de /premium/).
     O acesso fica lembrado neste navegador até o fim do mês da senha. */
  const NIVEL_CURSOS = 1;   // qualquer plano do Catarse (1 = Apoiador entusiasta)
  const PREMIUM_SESSAO = 'ohtopico:premium', PREMIUM_LEMBRA = 'ohtopico:premium-aula', PLANOS_CATARSE = 'https://www.catarse.com.br/ohtopico/plans';
  const mesAtual = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'); };
  function acessoPremium() {
    const ler = (st, k) => { try { return JSON.parse(st.getItem(k)); } catch (e) { return null; } };
    const a = ler(sessionStorage, PREMIUM_SESSAO) || ler(localStorage, PREMIUM_LEMBRA);
    return a && a.nivel && a.mes && a.mes >= mesAtual() ? { nivel: +a.nivel, mes: a.mes } : null;
  }
  async function conferePremium(senha) {
    const b64 = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));
    const portao = await (await fetch('/premium/', { cache: 'no-cache' })).text();
    const m = portao.match(/const SAL = '([^']+)', ITER = (\d+), NIVEIS = (\[.*?\]), PLANOS = (\{.*?\});/);
    if (!m) throw new Error('portao');
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveKey']);
    const k = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(m[1]), iterations: +m[2], hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    for (const n of JSON.parse(m[3])) { try { return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(n.iv) }, k, b64(n.d)))); } catch (e) { /* outro chaveiro */ } }
    return null;
  }
  const estacaoCompleta = area => ORDEM_NIVEIS.some(nv => { const n = perguntasTele(nv, area).length; return n > 0 && feitasTele(nv, area) >= n; });
  const contar = o => Object.keys(o || {}).filter(k => o[k]).length;
  const CURSOS = [
    { id: 'detetive', ic: '🕵️', nome: 'Detetive Digital', tema: 'Cidadania digital e segurança', passos: [
      ['Investigue 6 mensagens suspeitas diferentes com os carteiros', () => contar((S.golpes || {}).ok), 6, 'golpe'],
      ['Decifre 2 bilhetes secretos de amigos', () => contar((S.bilhetes || {}).lidos), 2, 'bilhete'],
      ['Complete a estação 🔐 Segurança e privacidade num mundo do teletransporte', () => estacaoCompleta('seguranca') ? 1 : 0, 1, 'Portal de teletransporte'],
      ['Escape da Casa do Enigma', () => (S.enigma && S.enigma.vitorias) ? 1 : 0, 1, 'Casa do Enigma']] },
    { id: 'engenharia', ic: '⚡', nome: 'Engenharia de Circuitos', tema: 'Lógica e eletrônica', passos: [
      ['Abra 4 portões com circuito lógico', () => contar(S.circ), 4, 'portao'],
      ['Faça 4 experimentos na Oficina de Robótica', () => contar(EST_ROBO().feitos), 4, 'Oficina de Robótica'],
      ['Monte a luz noturna automática (sensor de luz)', () => EST_ROBO().feitos.noturna ? 1 : 0, 1, 'Oficina de Robótica'],
      ['Acenda o LED azul (dica: leia o cartaz da lei de Ohm)', () => EST_ROBO().feitos.azul ? 1 : 0, 1, 'Oficina de Robótica']] },
    { id: 'matematica', ic: '📐', nome: 'Matemática no Mundo', tema: 'Plano cartesiano, grandezas e cálculo', passos: [
      ['Pinte 3 modelos de pixel art por coordenadas', () => contar(EST_PX().feitos), 3, 'Museu'],
      ['Colha 2 plantas da horta da sua casa', () => (S.horta && S.horta.colheitas) || 0, 2, 'Sua casa'],
      ['Vença o Escape da Matemática', () => (S.emat && S.emat.vitorias) || 0, 1, 'Escape da Matemática'],
      ['Chegue ao centro do Labirinto', () => (S.labirinto && S.labirinto.vitorias) || 0, 1, 'Labirinto']] },
    { id: 'programacao', ic: '🧩', nome: 'Pensamento Computacional', tema: 'Algoritmos, sequências e otimização', passos: [
      ['Faça 3 viagens de trenzinho com o programa mais curto possível', () => (S.tremTotal && S.tremTotal.curtos) || 0, 3, 'trem'],
      ['Abra o portão do "OU exclusivo" (atalho entre o Vale da Inteligência e a Escola dos Professores)', () => (S.circ || {})['4-7'] ? 1 : 0, 1, 'portao'],
      ['Complete a estação 🧩 Lógica e programação num mundo do teletransporte', () => estacaoCompleta('logica') ? 1 : 0, 1, 'Portal de teletransporte'],
      ['Mande ou decifre um bilhete com a Cifra de César', () => contar((S.bilhetes || {}).lidos) + ((S.bilhetes || {}).enviados || 0), 1, 'bilhete']] }
  ];
  const EST_CURSOS = () => S.cursos || (S.cursos = { feitos: {} });
  function janelaCursos(aviso2) {
    const el = $('#cursos-conteudo'), a = acessoPremium();
    if (!a || a.nivel < NIVEL_CURSOS) {
      el.innerHTML = `<p>Os <b>cursos do Mundo</b> são percursos que juntam várias atividades: ${CURSOS.map(c => `${c.ic} ${c.nome}`).join(', ')}. Cada um termina com um selo de conclusão, 150 ⭐ e uma figurinha.</p>
        <p class="muted">São exclusivos para quem apoia o projeto no Catarse. A professora ou o professor que apoia digita a <b>senha do mês da área premium</b> uma vez neste aparelho, e ele fica liberado até o fim do mês.</p>
        ${aviso2 ? `<p class="aviso-erro">${aviso2}</p>` : ''}
        <form id="cu-form" class="btn-row"><label>Senha do mês <input id="cu-senha" class="campo" type="password" autocomplete="current-password" required></label><button type="submit" class="hb verde">Liberar</button></form>
        <p class="small" id="cu-fb" role="status"></p>
        <p class="small muted">Ainda não apoia? <a href="${PLANOS_CATARSE}" target="_blank" rel="noopener">Veja os planos no Catarse</a>.</p>`;
      $('#cu-form').addEventListener('submit', async e => {
        e.preventDefault(); const fb = $('#cu-fb'); fb.textContent = 'Conferindo…';
        let ch; try { ch = await conferePremium($('#cu-senha').value); } catch (err) { fb.textContent = 'Não deu para conferir agora. Verifique a internet e tente de novo.'; return; }
        if (!ch) { fb.textContent = 'Senha incorreta. Confira a mensagem mais recente do Catarse: a senha muda todo mês.'; return; }
        try { sessionStorage.setItem(PREMIUM_SESSAO, JSON.stringify(ch)); } catch (err) {}
        try { localStorage.setItem(PREMIUM_LEMBRA, JSON.stringify({ nivel: ch.nivel, mes: ch.mes })); } catch (err) {}
        if (!(ch.mes >= mesAtual())) return janelaCursos('Esta senha é de um mês que já passou. Use a senha deste mês.');
        janelaCursos();
      });
      return;
    }
    const C = EST_CURSOS();
    for (const c of CURSOS) if (!C.feitos[c.id] && c.passos.every(([, f, meta]) => f() >= meta)) {
      C.feitos[c.id] = new Date().toLocaleDateString('pt-BR'); pontos(150, `🎓 Curso concluído: ${c.nome}!`); ganhaHabilidade(['PC', 'CD'], 20); SOM.toca('vitoria'); salvar();
      setTimeout(() => ganhaFigurinha(null, `pelo curso ${c.nome}`), 1500);
    }
    el.innerHTML = `<p class="muted small">✨ Liberado pelo apoio no Catarse até o fim de ${a.mes.split('-').reverse().join('/')}. Obrigada por apoiar!</p>
      ${CURSOS.map(c => { const feito = C.feitos[c.id]; return `<section class="curso${feito ? ' ok' : ''}" id="curso-${c.id}"><h3>${c.ic} ${c.nome} <span class="muted small">· ${c.tema}</span></h3>
        ${feito ? `<p class="selo-curso">🏅 <b>Selo de conclusão</b>: ${esc(S.apelido || 'Estudante')} completou o percurso <b>${c.nome}</b> em ${feito}.</p>` : ''}
        <ol class="etapas">${c.passos.map(([txt, f, meta, onde], i) => { const n = Math.min(f(), meta); return `<li class="${n >= meta ? 'ok' : ''}">${n >= meta ? '✅' : '⬜'} ${txt} <b>(${n}/${meta})</b>${n < meta ? ` <button type="button" class="hb azul mini" data-cu="${c.id}:${i}">Como fazer</button>` : ''}</li>`; }).join('')}</ol></section>`; }).join('')}`;
    el.querySelectorAll('[data-cu]').forEach(b => b.addEventListener('click', () => { const [cid, i] = b.dataset.cu.split(':'), passo = CURSOS.find(c => c.id === cid).passos[+i]; comoFazer(passo[3]); }));
  }
  function comoFazer(onde) {
    const dicas = { golpe: 'Converse com os moradores que pedem entregas (📦): eles também trazem mensagens suspeitas para investigar, até 3 por dia.', bilhete: 'Abra 🔏 Bilhetes no Menu: escreva um bilhete cifrado para um amigo ou cole o código de um bilhete que recebeu.', trem: 'Abra 🚂 Trenzinho no Menu ou no mapa e monte o caminho com o menor número de comandos.', portao: 'Cada portão entre vilas abertas pede um circuito na primeira passagem. Os atalhos têm os circuitos mais difíceis.' };
    if (dicas[onde]) return dialogo('🎓', 'Como fazer', `<p>${dicas[onde]}</p>`, [{ txt: 'Entendi', classe: 'principal', fn: fechaDialogo }]);
    const o = ONDE.find(x => x.nome === onde);
    if (!o) return;
    dialogo('🎓', 'Como fazer', `<p>Isso fica em <b>${esc(o.nome)}</b>: ${o.f.icone} ${esc(o.f.nome)}, ${o.onde}.</p>${liberada(o.f) ? '' : '<p class="muted">Essa vila ainda está fechada: complete as missões das vilas anteriores.</p>'}`, (liberada(o.f) ? [{ txt: 'Ir até lá', classe: 'principal', fn: () => { fechaDialogo(); irAte(o); } }] : []).concat([{ txt: 'Fechar', fn: fechaDialogo }]));
  }
  /* ---------- janelas ---------- */
  function abreJanela(id) {
    fechaJanela(); janelaAberta = id; const el = $('#j-' + id); el.hidden = false;
    if (id === 'mapa') desenhaMapa(); if (id === 'inventario') inventario(); if (id === 'biblioteca') biblioteca(); if (id === 'avatar') editorAvatar(); if (id === 'casa') janelaCasa(); if (id === 'pet') janelaPet(); if (id === 'especial') janelaEspecial(); if (id === 'evento') janelaEvento(); if (id === 'loja') janelaLoja(); if (id === 'turma') janelaTurma(); if (id === 'projetos') janelaProjetos(); if (id === 'oficina') janelaOficina(); if (id === 'banco') janelaBanco(); if (id === 'album') janelaAlbum(); if (id === 'jogos') janelaJogos(); if (id === 'misterio') janelaMisterio(); if (id === 'feira') janelaFeira(); if (id === 'mprof') janelaMissoesProf(); if (id === 'cartao') janelaCartao(); if (id === 'levar') janelaLevar(); if (id === 'amigos') janelaAmigos(); if (id === 'horta') janelaHorta(); if (id === 'bilhetes') janelaBilhetes(); if (id === 'trem') janelaTrem(); if (id === 'pixel') janelaPixel(); if (id === 'busca') janelaBusca(); if (id === 'robotica') janelaRobo(); if (id === 'cursos') janelaCursos();
    const b = el.querySelector('button, a'); if (b) b.focus();
  }
  function fechaJanela() { if (!janelaAberta) return; if (janelaAberta === 'jogo') { $('#jm-if').src = 'about:blank'; setTimeout(() => { confereJogos(); hud(); }, 50); } $('#j-' + janelaAberta).hidden = true; janelaAberta = null; for (const k in teclas) teclas[k] = false; cv.focus(); }
  document.querySelectorAll('[data-abrir]').forEach(b => b.addEventListener('click', () => abreJanela(b.dataset.abrir)));
  document.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fechaJanela));
  /* troca de vila: desmonta a anterior, limpa as texturas guardadas e monta a nova */
  function trocaFase(i, de) {
    if (agora > 1000) SOM.toca('portao');
    const f = fases[i];
    if (atual !== f) { desmonta(atual); for (const k in texCache) delete texCache[k]; miniCache = null; miniFase = null; }
    atual = f; monta(f);
    const p = de == null ? null : f.portais.find(q => q.para === de);
    if (p) { P.x = p.x + (p.lado === 'L' ? -1.6 : p.lado === 'O' ? 1.6 : 0); P.y = p.y + (p.lado === 'S' ? -1.6 : p.lado === 'N' ? 1.6 : 0); }
    else if (i === 0) { P.x = 3.5; P.y = MEIO; }
    else { const q = f.portais.find(q2 => q2.para === i - 1) || f.portais[0]; return trocaFase(i, q.para); }
    S.fase = i; destino = null; cam.ok = false; faseAtual = null; petPerto(); hud();
    if (agora > 1000) aviso(`${f.icone} ${f.nome}`);
  }
  function teleporta(f) { dentro = false; noEnigma = false; sala = null; colocando = null; fechaJanela(); trocaFase(f.idx); }
  /* mapa do mundo: as vilas em grade, ligadas pelos portões */
  /* o que cada vila tem: as lojas (à esquerda no mapa) e os prédios especiais (à direita) */
  const lojasDaVila = f => Object.values(LOJAS).filter(l => l.fase === f.idx).map(l => ({ ic: l.ic, nome: l.nome }));
  const predios = f => f.idx === 0 ? [{ ic: '🏠', nome: 'Sua casa' }, { ic: '🏛️', nome: 'Museu' }, { ic: '🌀', nome: 'Portal de teletransporte' }, { ic: '🤝', nome: 'Praça dos projetos' }]
    : f.idx === 1 ? [{ ic: '🏦', nome: 'Banco' }, { ic: '🔐', nome: 'Casa do Enigma' }] : f.idx === 2 ? [{ ic: '🤖', nome: 'Oficina de Robótica' }] : f.id === 'matematica' ? [{ ic: '🧮', nome: 'Escape da Matemática' }, { ic: '🌀', nome: 'Labirinto' }] : [];
  function desenhaMapa() {
    const c = $('#mapa-cv'), k = c.getContext('2d'), x0 = Math.min(...GRADE.map(g => g[0])), cols = Math.max(...GRADE.map(g => g[0])) - x0 + 1;
    const gx = 24, gy = 22, cw = Math.min(200, (c.width - 20 - (cols - 1) * gx) / cols), ch = 120, ox = (c.width - cols * cw - (cols - 1) * gx) / 2 - x0 * (cw + gx), oy = 14;
    k.fillStyle = '#1b2531'; k.fillRect(0, 0, c.width, c.height);
    const centro = i => [ox + GRADE[i][0] * (cw + gx) + cw / 2, oy + GRADE[i][1] * (ch + gy) + ch / 2];
    k.strokeStyle = '#f3d6a0'; k.lineWidth = 8; k.lineCap = 'round';
    for (const [i, j] of LIGACOES) { const [a, b] = centro(i), [d, e] = centro(j); k.beginPath(); k.moveTo(a, b); k.lineTo(d, e); k.stroke(); }
    for (const f of fases) {
      const [cx, cy] = centro(f.idx), x = cx - cw / 2, y = cy - ch / 2, ok = liberada(f);
      k.fillStyle = '#7fbf6a'; k.strokeStyle = f === atual ? '#ffffff' : '#3f8f4b'; k.lineWidth = f === atual ? 4 : 2;
      k.beginPath(); k.roundRect(x, y, cw, ch, 16); k.fill(); k.stroke();
      k.fillStyle = f.caminho; k.beginPath(); k.arc(cx, cy + 6, 34, 0, Math.PI * 2); k.fill();
      k.font = '30px system-ui, sans-serif'; k.textAlign = 'center'; k.textBaseline = 'middle'; k.fillStyle = '#000'; k.fillText(f.icone, cx, cy + 6);
      k.font = '600 13px Lexend, sans-serif'; k.fillStyle = '#ffffff'; k.fillText(`${f.idx + 1}. ${f.nome}`, cx, y + 14, cw - 12);
      const cor = f.lugares.filter(l => S.feitos[l.id]).length;
      k.font = '12px Lexend, sans-serif'; k.fillText(`${cor}/${f.lugares.length} casas${S.concluidas[f.id] ? ' · 🏆' : ''}`, cx, y + ch - 12);
      k.font = '17px system-ui, sans-serif';
      lojasDaVila(f).forEach((l, i) => { k.fillStyle = 'rgba(255,253,246,.9)'; k.beginPath(); k.arc(x + 17, y + 40 + i * 24, 11, 0, Math.PI * 2); k.fill(); k.fillStyle = '#000'; k.fillText(l.ic, x + 17, y + 41 + i * 24); });
      predios(f).slice(0, 3).forEach((l, i) => { k.fillStyle = 'rgba(255,253,246,.9)'; k.beginPath(); k.arc(x + cw - 17, y + 40 + i * 24, 11, 0, Math.PI * 2); k.fill(); k.fillStyle = '#000'; k.fillText(l.ic, x + cw - 17, y + 41 + i * 24); });
      if (!ok) { k.fillStyle = 'rgba(20,25,35,.6)'; k.beginPath(); k.roundRect(x, y, cw, ch, 16); k.fill(); k.font = '28px system-ui, sans-serif'; k.fillText('🔒', cx, cy); }
      if (f === atual) { k.fillStyle = '#e85c4a'; k.beginPath(); k.arc(x + cw - 16, y + 16, 7, 0, Math.PI * 2); k.fill(); }
    }
    $('#mapa-fases').innerHTML = fases.map(f => {
      const ms = missoes(f), ok = liberada(f), cor = f.lugares.filter(l => S.feitos[l.id]).length;
      return `<li class="${ok ? '' : 'travada'}"><span>${S.concluidas[f.id] ? '🏆' : ok ? f.icone : '🔒'}</span><span class="f-nome"><strong>Fase ${f.idx + 1}: ${esc(f.nome)}</strong><small>${esc(f.sub)} · ${cor} de ${f.lugares.length} casas coloridas · missões ${ms.filter(m => m.ok).length}/${ms.length}${(hs => hs.length ? ` · BNCC: ${hs.length} habilidade${hs.length > 1 ? 's' : ''}` : '')(uniao(ms.map(m => m.habs)))}${(ls => ls.length ? `<br>${ls.map(l => `${l.ic} ${esc(l.nome)}`).join(' · ')}` : '')(lojasDaVila(f).concat(predios(f)))}</small></span>${ok ? `<button type="button" class="hb azul" data-ir="${f.idx}">Ir</button>` : ''}</li>`;
    }).join('');
    $('#mapa-fases').querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => teleporta(fases[+b.dataset.ir])));
  }
  function inventario() {
    $('#inv-itens').innerHTML = Object.entries(ITENS).filter(([k]) => !ITENS_LOJA.has(k) || S.inv[k]).map(([k, [ic, nome]]) => `<div class="it ${S.inv[k] ? '' : 'falta'}"><span style="font-size:26px">${ic}</span><span>${nome}<br><b>${S.inv[k] || 0}</b></span></div>`).join('') +
      `<p class="muted small" style="flex-basis:100%;margin:4px 0 0">Na bancada da sua casa 🏠, os itens viram móveis. Maçãs e estrelas também alimentam o seu pet 🐾. As 🔑 chaves abrem o baú da Casa do Enigma e as 🧩 peças montam o quebra-cabeça abaixo.</p>`;
    $('#inv-quebra').innerHTML = `<div class="quebra">${[0, 1, 2, 3].map(i => `<span class="q-peca ${i < S.quebra ? 'ok' : ''}" style="background-position:${i % 2 * 100}% ${Math.floor(i / 2) * 100}%">${i < S.quebra ? '' : '🧩'}</span>`).join('')}</div>
      <div><p>${S.quebra >= 4 ? 'Quebra-cabeça completo! O jogo especial está liberado.' : `Encaixe 4 peças para liberar um <strong>jogo especial</strong>. Encaixadas: ${S.quebra}/4 · no inventário: ${S.inv.peca || 0}.`}</p>
      <p class="muted small">Peças vêm do chão da vila, de cada fase concluída, da Casa do Enigma e dos amigos com 10 corações.</p>
      ${S.quebra >= 4 ? '<button type="button" class="hb verde" id="b-especial">🎮 Jogar o jogo especial</button>' : `<button type="button" class="hb azul" id="b-encaixa" ${S.inv.peca > 0 ? '' : 'disabled'}>🧩 Encaixar uma peça</button>`}</div>`;
    { const q = $('.quebra'); q.style.setProperty('--img', `url(${imagemEspecial().toDataURL()})`); }
    if ($('#b-encaixa')) $('#b-encaixa').addEventListener('click', encaixaPeca);
    if ($('#b-especial')) $('#b-especial').addEventListener('click', () => abreJanela('especial'));
    const xp = xpHabilidades(), abertos = fases.filter(liberada).flatMap(f => f.lugares);
    $('#inv-hab').innerHTML = Object.entries(EIXOS_).map(([e, info]) => {
      const x = xp[e] || 0, n = nivelHab(x), base = custoNivel(n), prox = custoNivel(n + 1);
      const sug = abertos.find(l => l.rec && !S.feitos[l.id] && eixosDe(l.rec.habs).includes(e));
      return `<div class="hab"><span class="hab-ic">${ICONE_EIXO[e] || '⭐'}</span><span class="hab-txt"><strong>${esc(info.nome)}</strong><small class="muted hab-sub">${info.comp === 'CO' ? 'Computação' : 'Matemática'} · nível ${n}</small>
        <span class="barra"><span style="width:${n >= 10 ? 100 : Math.round(100 * (x - base) / (prox - base))}%"></span></span>
        <small>${n >= 10 ? 'Nível máximo! 🏆' : sug ? `Para subir: <a href="${esc(sug.url)}" target="_blank" rel="noopener">${esc(sug.icone)} ${esc(sug.titulo)}</a>` : 'Para subir: responda perguntas dos moradores e dos diamantes.'}</small></span></div>`;
    }).join('');
    const meds = Object.values(S.medalhas);
    $('#inv-medalhas').innerHTML = meds.length ? meds.map(m => `<div class="it"><span style="font-size:24px">${m.ic}</span><span>${esc(m.nome)}</span></div>`).join('') : '<p class="muted small">Ganhe medalhas nas missões das datas comemorativas e nos desafios de aniversário de personalidades da computação.</p>';
    const conhecidos = todosNpcs().filter(n => S.falas[n.id] || amizade(n));
    $('#inv-amigos').innerHTML = conhecidos.length ? conhecidos.map(n => `<div class="it"><span style="font-size:22px">${n.prof ? (n.masc ? '👨‍🏫' : '👩‍🏫') : '🙂'}</span><span>${esc(n.nome)} <small class="muted">· ${esc(n.fase.nome)}</small><br>${coracoesHtml(n)}${S.gostos[n.id] ? ` <small>adora ${ITENS[favorito(n)][0]}</small>` : ''} <small>${aniversarioNpc(n) ? '🎂 hoje!' : '🎂 ' + dataNpc(n)}</small></span></div>`).join('')
      : '<p class="muted small">Converse com os moradores da vila para fazer amigos.</p>';
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    const conq = [
      ['🥇', 'Primeira casa colorida', feitos >= 1], ['🎨', '5 casas coloridas', feitos >= 5], ['🏅', '15 casas coloridas', feitos >= 15], ['🧠', '10 acertos', S.acertos >= 10], ['🧠', '30 acertos', S.acertos >= 30],
      ['📘', '10 dicas lidas', Object.keys(S.dicas).length >= 10], ['💎', '10 diamantes', (S.inv.diamante || 0) >= 10], ['🗣️', '10 conversas', Object.keys(S.falas).length >= 10], ['🛋️', 'Primeiro móvel', Object.keys(S.casa.feitos).length >= 1], ['🏡', 'Casa decorada (8 móveis)', Object.keys(S.casa.feitos).length >= 8], ['🔭', 'Telescópio', !!S.casa.feitos.telescopio], ['🐾', 'Adotou um pet', !!S.pet], ['🔐', 'Escapou da Casa do Enigma', !!(S.enigma.vitorias)], ['🧩', 'Jogo especial vencido', !!S.especial], ['💞', 'Melhor amigo (10 corações)', todosNpcs().some(n => coracoes(n) >= 10)], ['🤝', '5 amigos com 3 corações', todosNpcs().filter(n => coracoes(n) >= 3).length >= 5], ['📈', 'Uma habilidade no nível 5', Object.values(niveisAgora()).some(v => v >= 5)], ['🏅', 'Pet nível 5', !!S.pet && S.pet.nivel >= 5],
      ...fases.map(f => ['🏆', f.nome, !!S.concluidas[f.id]])
    ];
    $('#inv-conq').innerHTML = conq.map(([ic, n, ok]) => `<div class="it ${ok ? '' : 'falta'}"><span style="font-size:22px">${ic}</span><span>${esc(n)}</span></div>`).join('');
  }
  function biblioteca() {
    $('#bib-lista').innerHTML = '<div class="bib">' + fases.map(f => `<h3>${f.icone} ${f.idx + 1}. ${esc(f.nome)} <small class="muted">· ${esc(f.sub)}</small></h3><ul>${
      f.lugares.map(l => `<li class="${S.feitos[l.id] ? 'feito' : ''}">${l.tipo === 'em' ? `${esc(l.icone)} ${esc(l.titulo)} <small class="muted">(desafio no Campus)</small>` : `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.icone)} ${esc(l.titulo)}</a>`}</li>`).join('')}</ul>`).join('') +
      `<h3>📘 Dicas que você já leu</h3><ul>${Object.keys(S.dicas).map(i => `<li class="feito" style="grid-column:1/-1">${DICAS[i]}</li>`).join('') || '<li>Pegue os livros pelo chão para ler dicas de computação.</li>'}</ul>` +
      `<h3>📚 Mais do site</h3><ul><li><a href="../">Página inicial</a></li><li><a href="../jogos/">Todos os jogos</a></li><li><a href="${MD}catalogo.html?tipo=3d">Laboratório 3D</a></li><li><a href="../simuladores/">Simuladores</a></li><li><a href="${MD}meu-progresso.html">Meu progresso</a></li><li><a href="../curriculo/">Quem é Júlia Quoos</a></li></ul></div>`;
  }
  /* oficina da casa: construir, colocar, guardar e pintar */
  function janelaCasa() {
    $('#casa-inv').innerHTML = 'No seu inventário: ' + Object.entries(ITENS).filter(([k]) => !ITENS_LOJA.has(k)).map(([k, [ic]]) => `${ic} <b>${S.inv[k] || 0}</b>`).join(' · ');
    $('#casa-receitas').innerHTML = Object.entries(MOVEIS).filter(([, M]) => M.custo).map(([id, M]) => {
      const semPlanta = !temPlanta(id), trava = semPlanta || (M.requer && !S.casa.feitos[M.requer]);
      const custo = Object.entries(M.custo).map(([k, n]) => `<span class="${(S.inv[k] || 0) >= n ? 'tem' : 'falta'}">${ITENS[k][0]} ${n}</span>`).join(' ');
      return `<div class="rec ${trava ? 'travada' : ''}"><span class="rec-ic">${semPlanta ? '📜' : trava ? '🔒' : M.ic}</span><span class="rec-txt"><strong>${esc(M.nome)}${S.casa.feitos[id] ? ' ✅' : ''}</strong><small>${semPlanta ? `Precisa da planta, vendida na 🛋️ Loja de Móveis. Vai pedir: ${custo}` : trava ? `Construa antes: ${MOVEIS[M.requer].ic} ${esc(MOVEIS[M.requer].nome)}` : custo}</small></span><button type="button" class="hb verde" data-construir="${id}" ${podeConstruir(id) ? '' : 'disabled'}>Construir</button></div>`;
    }).join('');
    const guard = Object.entries(S.casa.guardados).filter(([, n]) => n > 0);
    $('#casa-guardados').innerHTML = guard.length ? guard.map(([id, n]) => `<div class="it"><span style="font-size:24px">${MOVEIS[id].ic}</span><span>${esc(MOVEIS[id].nome)}<br><b>${n}</b></span><button type="button" class="hb azul" data-colocar="${id}">Colocar</button></div>`).join('')
      : '<p class="muted small">Nada guardado. Construa um móvel na lista acima.</p>';
    $('#casa-postos').innerHTML = S.casa.moveis.map((m, i) => MOVEIS[m.id].fixo ? '' : `<div class="it"><span style="font-size:22px">${MOVEIS[m.id].ic}</span><span>${esc(MOVEIS[m.id].nome)}</span><button type="button" class="hb cinza" data-guardar="${i}">Guardar</button></div>`).join('');
    const amp = S.casa.amp || 0, prox = AMPLIACOES[amp], vilas = Object.keys(S.concluidas).length;
    $('#casa-ampliar').innerHTML = (amp ? `<p class="small">Sua casa já tem: ${AMPLIACOES.slice(0, amp).map(a => `${a.ic} ${a.nome}`).join(', ')}.</p>` : '') + (!prox ? '<p class="small">✅ Sua casa está no tamanho máximo.</p>' : (() => {
      const falta = Object.entries(prox.custo).filter(([k, n]) => (k === 'pontos' ? S.pontos : S.inv[k] || 0) < n), trava = vilas < prox.vilas;
      const custo = Object.entries(prox.custo).map(([k, n]) => `<span class="${(k === 'pontos' ? S.pontos : S.inv[k] || 0) >= n ? 'tem' : 'falta'}">${k === 'pontos' ? '⭐' : ITENS[k][0]} ${n}</span>`).join(' ');
      return `<div class="rec ${trava ? 'travada' : ''}"><span class="rec-ic">${trava ? '🔒' : prox.ic}</span><span class="rec-txt"><strong>Novo cômodo: ${prox.nome}</strong><small>${trava ? `Libera com ${prox.vilas} vilas concluídas (você tem ${vilas}).` : 'Mais 4 blocos de espaço para os seus móveis.'}</small><span class="custo">${custo}</span></span>
        <button type="button" class="hb verde" id="casa-amp" ${trava || falta.length ? 'disabled' : ''}>Ampliar</button></div>`;
    })());
    const bAmp = $('#casa-amp'); if (bAmp) bAmp.addEventListener('click', ampliaCasa);
    $('#casa-cores').innerHTML = PASTEIS.map(c => `<button type="button" data-cor="${c}" aria-pressed="${S.casa.cor === c}" aria-label="Cor ${c}" style="background:${c}"></button>`).join('');
    const j = $('#j-casa');
    j.querySelectorAll('[data-construir]').forEach(b => b.addEventListener('click', () => { construir(b.dataset.construir); janelaCasa(); }));
    j.querySelectorAll('[data-colocar]').forEach(b => b.addEventListener('click', () => comecaColocar(b.dataset.colocar)));
    j.querySelectorAll('[data-guardar]').forEach(b => b.addEventListener('click', () => { guardaMovel(S.casa.moveis[+b.dataset.guardar]); janelaCasa(); }));
    j.querySelectorAll('[data-cor]').forEach(b => b.addEventListener('click', () => { S.casa.cor = b.dataset.cor; salvar(); janelaCasa(); }));
  }
  function ampliaCasa() {
    const amp = S.casa.amp || 0, a = AMPLIACOES[amp]; if (!a || Object.keys(S.concluidas).length < a.vilas) return;
    if (Object.entries(a.custo).some(([k, n]) => (k === 'pontos' ? S.pontos : S.inv[k] || 0) < n)) return;
    for (const [k, n] of Object.entries(a.custo)) if (k === 'pontos') S.pontos -= n; else S.inv[k] -= n;
    S.casa.amp = amp + 1; if (dentro && !visita) ajustaCasa(S.casa.amp);
    SOM.toca('vitoria'); salvar(); hud(); janelaCasa();
    aviso(`${a.ic} Casa ampliada! Agora ela tem ${a.nome.toLowerCase() === 'ateliê' ? 'um ateliê' : 'uma sala de jogos'}.`);
  }
  /* editor do avatar */
  const OPCOES_AV = [
    ['pele', 'Pele', PELES], ['cabelo', 'Cor do cabelo', CABELOS],
    ['estilo', 'Cabelo', [['curto', 'Curto'], ['longo', 'Comprido'], ['coque', 'Coque'], ['bone', 'Boné']]],
    ['camisa', 'Camiseta', ROUPAS], ['calca', 'Calça', ['#2f3b6b', '#5a3b2a', '#333333', '#4bb259', '#e07bb0', '#f6b73c']]
  ];
  function editorAvatar() {
    const comprados = Object.keys(S.loja.tem);
    const ops = OPCOES_AV.map(([k, n, o]) => [k, n, o.concat(comprados.filter(c => c.startsWith(`cor:${k}:`)).map(c => c.split(':')[2]))]);
    const acess = comprados.filter(c => c.startsWith('av:')).map(c => c.slice(3));
    if (acess.length) ops.push(['acessorio', 'Acessório (da loja)', [['nada', 'Nada']].concat(acess.map(k => [k, NOMES_ENFEITE[k] || k]))]);
    $('#av-opcoes').innerHTML = ops.map(([k, nome, ops]) => `<div class="av-grupo"><h3>${nome}</h3><div class="av-cores">${ops.map(o => {
      const [v, txt] = Array.isArray(o) ? o : [o, ''];
      return `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${S.av[k] === v}" aria-label="${esc(nome)}: ${esc(txt || v)}" style="${txt ? '' : `background:${v}`}">${esc(txt)}</button>`;
    }).join('')}</div></div>`).join('');
    $('#av-opcoes').querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { S.av[b.dataset.k] = b.dataset.v; salvar(); editorAvatar(); }));
    previaAvatar();
  }
  /* ---------- cartão-postal: uma imagem da sua casa, do avatar e do pet com o link do site (paleta sem azul) ---------- */
  const CARTAO = { fundo1: '#ffe3ec', fundo2: '#fff3c4', destaque: '#c2185b', verde: '#2e7d32', texto: '#3a2a1a' };
  function desenhaCartao(cv2, comNome) {
    const g = cv2.getContext('2d'), W2 = cv2.width, H2 = cv2.height;
    const fundo = g.createLinearGradient(0, 0, W2, H2); fundo.addColorStop(0, CARTAO.fundo1); fundo.addColorStop(1, CARTAO.fundo2);
    g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = fundo; g.fillRect(0, 0, W2, H2);
    for (let i = 0; i < 60; i++) { g.fillStyle = ['#f48fb1', '#ffd54f', '#aed581', '#ffab91'][i % 4]; g.globalAlpha = 0.45; g.beginPath(); g.arc((i * 211) % W2, (i * 97 + 31) % H2, 3 + (i % 4), 0, Math.PI * 2); g.fill(); }
    g.globalAlpha = 1;
    // a cena isométrica: um pedaço de grama, a casa, o avatar e o pet
    const esc2 = 1.45, [cx, cy] = iso(3.2, 4);
    g.setTransform(esc2, 0, 0, esc2, 330 - cx * esc2, 330 - cy * esc2);
    ctx = g;
    try {
      for (let y = -1; y < 8; y++) for (let x = -1; x < 8; x++) { const [sx, sy] = iso(x, y); g.drawImage(textura(x === 2 && y >= 4 ? '#f7c6d9' : ESTACAO.grama, ((x + 9) * 7 + (y + 9) * 3) % 4), sx - TW / 2, sy); }
      const lista = [{ k: 1 + 1 + 4, d: () => desenhaMinhaCasa({ id: 'minhaCasa', gx: 1, y: 1, w: 4, d: 4 }, false, false) },
        { k: 2.6 + 6.2, d: () => desenhaPessoa(2.6, 6.2, S.av, { dir: 'y+' }) }];
      if (S.pet) lista.push({ k: 3.8 + 6.3, d: () => desenhaPet(3.8, 6.3, S.pet, { dir: 'y+' }) });
      for (const [x, y] of [[0, 6.5], [5.8, 1.2], [6.2, 5.4]]) lista.push({ k: x + y, d: () => { caixa(x + 0.4, y + 0.4, 0, 0.2, 0.2, 0.6, '#8a5a3a'); caixa(x + 0.05, y + 0.05, 0.6, 0.9, 0.9, 0.8, '#7cc47a'); } });
      lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    } finally { ctx = ctxJogo; }
    // o texto do cartão
    g.setTransform(1, 0, 0, 1, 0, 0); g.textAlign = 'left'; g.textBaseline = 'alphabetic';
    const x0 = 660, nome = comNome && S.turma.nome ? S.turma.nome.split(' ')[0] : '';
    g.fillStyle = 'rgba(255,255,255,.75)'; g.beginPath(); g.roundRect(x0 - 30, 60, 540, 510, 28); g.fill();
    g.fillStyle = CARTAO.destaque; g.font = '800 54px Sniglet, Lexend, sans-serif'; g.fillText(nome ? `O mundo de ${nome}` : 'Meu mundo', x0, 140, 490);
    g.fillStyle = CARTAO.texto; g.font = '500 30px Lexend, sans-serif';
    const figs = PESSOAS.filter(p => (S.album.tem[p.id] || 0) > 0).length;
    [[`⭐ ${S.pontos} pontos`], [`🏆 ${Object.keys(S.concluidas).length} de ${fases.length} vilas concluídas`], [`📒 ${figs} de ${PESSOAS.length} figurinhas`], [`🏅 ${Object.keys(S.medalhas).length} medalhas`], [S.pet ? `🐾 ${S.pet.nome}, meu pet` : '🏠 minha casa no Mundo']]
      .forEach(([t], i) => g.fillText(t, x0, 210 + i * 52, 490));
    g.fillStyle = CARTAO.verde; g.font = '600 26px Lexend, sans-serif'; g.fillText('Venha jogar e aprender computação:', x0, 490, 490);
    g.fillStyle = CARTAO.destaque; g.font = '800 34px Sniglet, Lexend, sans-serif'; g.fillText('ohtopico.com.br/mundo', x0, 535, 490);
  }
  function janelaCartao() {
    const el = $('#cartao-conteudo');
    el.innerHTML = `<p>Um cartão-postal com a sua casa, o seu avatar e o seu pet para mostrar para a família e os amigos.</p>
      <canvas id="cartao-cv" width="1200" height="630" style="width:100%;height:auto;border-radius:14px;border:2px solid var(--borda)"></canvas>
      <label class="small"><input type="checkbox" id="cartao-nome"> Mostrar o meu primeiro nome${S.turma.nome ? '' : ' (escreva o nome no 👥 Modo turma)'}</label>
      <div class="btn-row"><button type="button" class="hb verde" id="cartao-baixar">⬇️ Baixar a imagem</button><button type="button" class="hb amarelo" id="cartao-comp">📤 Compartilhar</button></div>
      <p class="muted small">O cartão não mostra fotos nem dados pessoais. Peça a um adulto antes de postar em redes sociais.</p>`;
    const cv2 = $('#cartao-cv'), nomeOk = () => $('#cartao-nome').checked;
    const desenha = () => desenhaCartao(cv2, nomeOk());
    desenha(); if (document.fonts && document.fonts.ready) document.fonts.ready.then(desenha);
    $('#cartao-nome').addEventListener('change', desenha);
    $('#cartao-baixar').addEventListener('click', () => { const a = document.createElement('a'); a.href = cv2.toDataURL('image/png'); a.download = 'meu-mundo-ohtopico.png'; document.body.appendChild(a); a.click(); a.remove(); });
    $('#cartao-comp').addEventListener('click', () => cv2.toBlob(async blob => {
      const txt = 'Olha o meu mundo! Venha jogar e aprender computação: https://ohtopico.com.br/mundo/';
      try {
        const f = new File([blob], 'meu-mundo-ohtopico.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [f] })) return await navigator.share({ files: [f], text: txt, title: 'Meu mundo' });
      } catch (e) { if (e && e.name === 'AbortError') return; }
      window.open('https://wa.me/?text=' + encodeURIComponent(txt), '_blank', 'noopener');
      aviso('Baixe a imagem e anexe na mensagem 📎');
    }, 'image/png'));
  }
  function previaAvatar() {
    const c = $('#av-preview'), pd = Math.min(window.devicePixelRatio || 1, 2);
    c.width = 220 * pd; c.height = 260 * pd;
    const g = c.getContext('2d');
    g.setTransform(pd * 2.6, 0, 0, pd * 2.6, 110 * pd, 190 * pd);
    // reaproveita o desenho do jogo trocando o contexto por um instante
    ctx = g; try { desenhaPessoa(0, 0, S.av, { dir: 'y+' }); } finally { ctx = ctxJogo; }
  }

  /* ---------- botões ---------- */
  $('#b-salvar').addEventListener('click', () => { guardaPos(); salvar(true); });
  $('#b-reiniciar').addEventListener('click', () => {
    const f = faseDeX(P.x);
    if (!confirm(`Reiniciar a fase ${f.nome}? Conversas, perguntas e itens desta fase voltam ao começo (as casas coloridas e o inventário ficam).`)) return;
    for (const k of Object.keys(S.itens)) if (k.startsWith(f.id + '-')) delete S.itens[k];
    for (const k of Object.keys(S.falas)) if (k.startsWith(f.id + '-')) delete S.falas[k];
    for (const p of f.perguntas) delete S.resp[p.id];
    delete S.concluidas[f.id]; S.cont[f.id] = 0;
    teleporta(f); salvar(); aviso('🔄 Fase reiniciada');
  });
  $('#b-zerar').addEventListener('click', () => { if (!confirm('Apagar todo o progresso do mundo? (O Meu progresso dos jogos não é apagado.)')) return; const av = S.av, kits = S.kits; S = novo(); S.av = av; S.kits = kits || {}; aplicaKits(); dentro = false; noEnigma = false; sala = null; colocando = null; trocaFase(0); S.versao = 2; P.x = S.x; P.y = S.y; cam.ok = false; salvar(); fechaJanela(); hud(); confereJogos(); });
  /* no celular os botões ficam escondidos num painel que abre pelo ☰ */
  const bMais = $('#b-mais'), painelBotoes = $('#hud-botoes');
  function painel(abre) { painelBotoes.classList.toggle('aberto', abre); bMais.setAttribute('aria-expanded', abre); bMais.textContent = abre ? '✕' : '☰'; bMais.setAttribute('aria-label', abre ? 'Esconder os botões' : 'Mostrar os botões'); }
  bMais.addEventListener('click', () => painel(!painelBotoes.classList.contains('aberto')));
  painelBotoes.addEventListener('click', e => { if (e.target.closest('button') && e.target.closest('button').id !== 'b-toque') painel(false); });
  cv.addEventListener('pointerdown', () => painel(false));
  const toqueEl = $('#toque'), bToque = $('#b-toque');
  function ligaToque(liga) { toqueEl.hidden = !liga; bToque.setAttribute('aria-pressed', String(liga)); document.body.classList.toggle('com-toque', liga); }
  bToque.addEventListener('click', () => ligaToque(toqueEl.hidden));
  if (window.matchMedia && matchMedia('(pointer: coarse)').matches) ligaToque(true);
  toqueEl.querySelectorAll('[data-dir]').forEach(b => {
    const d = b.dataset.dir;
    b.addEventListener('pointerdown', ev => { ev.preventDefault(); teclas[d] = true; b.setPointerCapture(ev.pointerId); });
    const solta = () => { teclas[d] = false; };
    b.addEventListener('pointerup', solta); b.addEventListener('pointercancel', solta); b.addEventListener('lostpointercapture', solta);
  });
  $('#t-e').addEventListener('click', interage);
  $('#t-correr').addEventListener('click', () => { correndo = !correndo; $('#t-correr').setAttribute('aria-pressed', String(correndo)); });
  // clique no chão: anda até lá; clique numa casa ou pessoa perto: interage
  cv.addEventListener('click', ev => {
    if (dialogoAberto || janelaAberta) return;
    const r = cv.getBoundingClientRect();
    const [wx, wy] = telaParaMapa(cam.x + (ev.clientX - r.left) / zoom, cam.y + (ev.clientY - r.top) / zoom);
    if (sala) {
      const a = alvoSala();
      if (a && Math.hypot(wx - P.x, wy - P.y) < 2.2) return interage();
      destino = { x: wx, y: wy }; return;
    }
    if (noEnigma) {
      const a = alvoEnigma();
      if (a && Math.hypot(wx - P.x, wy - P.y) < 2.2) return interage();
      destino = { x: wx, y: wy }; return;
    }
    if (dentro) {
      if (colocando) { mouse = { x: wx, y: wy }; colocaAqui(); return; }
      const a = alvoCasa();
      if (a && a.tipo === 'pet') { const c = S.pet.dorme ? caminha() : PET; if (Math.hypot(wx - c.x, wy - c.y) < 0.8) return interage(); }
      if (a && a.tipo === 'movel') { const m = a.movel, M = MOVEIS[m.id]; if (wx > m.x - 0.3 && wx < m.x + M.w + 0.3 && wy > m.y - 0.3 && wy < m.y + M.d + 0.3) return interage(); }
      if (a && a.tipo === 'saida' && Math.hypot(wx - SAIDA.x, wy - SAIDA.y) < 0.8) return interage();
      if (a && a.tipo === 'npc' && Math.hypot(wx - NPC_CASA.x, wy - NPC_CASA.y) < 0.8) return interage();
      destino = { x: wx, y: wy }; return;
    }
    const a = alvoPerto();
    if (a && a.tipo === 'pet' && Math.hypot(wx - PET.x, wy - PET.y) < 0.8) return interage();
    if (a && a.tipo === 'enigma') { const c = fases[1].enigma; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'portalTele') { const c = atual.portalTele; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'sala') { const c = a.sala; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'banco') { const c = atual.banco; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'projetos') { const c = atual.projetos; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'loja') { const c = atual.loja; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'minhacasa') { const c = fases[0].minhaCasa; if (wx > c.gx - 0.5 && wx < c.gx + c.w + 0.5 && wy > c.y - 0.5 && wy < c.y + c.d + 0.5) return interage(); }
    if (a && a.tipo === 'casa' && wx > a.casa.gx - 0.5 && wx < a.casa.gx + a.casa.w + 0.5 && wy > a.casa.y - 0.5 && wy < a.casa.y + a.casa.d + 0.5) return interage();
    if (a && a.tipo === 'npc' && Math.hypot(wx - a.npc.x, wy - a.npc.y) < 0.9) return interage();
    destino = { x: wx, y: wy };
  });

  cv.addEventListener('mousemove', ev => {
    if (!colocando) return;
    const r = cv.getBoundingClientRect(), [wx, wy] = telaParaMapa(cam.x + (ev.clientX - r.left) / zoom, cam.y + (ev.clientY - r.top) / zoom);
    mouse = { x: wx, y: wy };
  });
  $('#esp-cv').addEventListener('click', ev => { const r = ev.currentTarget.getBoundingClientRect(); moveEspecial(Math.floor((ev.clientY - r.top) / r.height * 3) * 3 + Math.floor((ev.clientX - r.left) / r.width * 3)); });
  $('#esp-de-novo').addEventListener('click', janelaEspecial);
  $('#b-tele').addEventListener('click', () => { fechaJanela(); portalTele(); });
  $('#b-casa').addEventListener('click', () => { if (sala) saiSala(); if (noEnigma) saiEnigma(); dentro ? abreJanela('casa') : entraCasa(); });

  /* ---------- teclado ---------- */
  const MAPA_TECLAS = { ArrowUp: 'cima', ArrowDown: 'baixo', ArrowLeft: 'esq', ArrowRight: 'dir', w: 'cima', s: 'baixo', a: 'esq', d: 'dir', Shift: 'correr' };
  document.addEventListener('keydown', ev => {
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    const campo = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
    if (ev.key === 'Escape' && colocando && !dialogoAberto && !janelaAberta) { colocando = null; mouse = null; aviso('Ok, o móvel continua guardado.'); ev.preventDefault(); return; }
    if (ev.key === 'Escape') { if (dialogoAberto) fechaDialogo(); else if (janelaAberta) fechaJanela(); else abreJanela('menu'); ev.preventDefault(); return; }
    if (dialogoAberto) {
      if (campo) { if (ev.key === 'Enter' && ev.target.id !== 'rasc-txt') { const b = D.op.querySelector('.principal'); if (b) { b.click(); ev.preventDefault(); } } return; }
      if (/^[1-9]$/.test(ev.key)) { const b = D.op.children[+ev.key - 1]; if (b && !b.disabled) { b.click(); ev.preventDefault(); } }
      return;
    }
    if (janelaAberta || campo) return;
    if (MAPA_TECLAS[k]) { teclas[MAPA_TECLAS[k]] = true; if (k !== 'Shift') mouse = null; ev.preventDefault(); }
    else if (k === ' ') { if (P.pulo === 0) { P.vpulo = 3.4; P.pulo = 0.01; } ev.preventDefault(); }
    else if (k === 'e' || k === 'Enter') { interage(); ev.preventDefault(); }
    else if (k === 'm') abreJanela('mapa'); else if (k === 'i') abreJanela('inventario'); else if (k === 'b') abreJanela('biblioteca'); else if (k === 'v') abreJanela('avatar'); else if (k === 'c') $('#b-casa').click(); else if (k === 'p') abreJanela('pet');
  });
  document.addEventListener('keyup', ev => { const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key; if (MAPA_TECLAS[k]) teclas[MAPA_TECLAS[k]] = false; });
  window.addEventListener('blur', () => { for (const k in teclas) teclas[k] = false; });

  /* ---------- volta do jogo: confere o progresso registrado ---------- */
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { confereJogos(); hud(); } });
  window.addEventListener('focus', () => { confereJogos(); hud(); });
  window.addEventListener('storage', ev => { if (ev.key === 'md-progresso-v1') { confereJogos(); hud(); } });
  setInterval(() => { guardaPos(); atualizaPet(); cobra(); rende(); salvar(); }, 10000);
  window.addEventListener('pagehide', () => { guardaPos(); salvar(); });
  $('#d-opcoes').addEventListener('click', e => { const b = e.target.closest('button'); if (b) setTimeout(() => { if (b.classList.contains('errada')) SOM.toca('erro'); else if (b.classList.contains('certa')) SOM.toca('acerto'); }, 0); });
  const rotSom = () => { const p = SOM.pref(); $('#b-efeitos').textContent = p.efeitos ? '🔊 Efeitos: ligados' : '🔇 Efeitos: desligados'; $('#b-musica').textContent = p.musica ? '🎵 Música: ligada' : '🎵 Música: desligada'; $('#b-efeitos').setAttribute('aria-pressed', p.efeitos); $('#b-musica').setAttribute('aria-pressed', p.musica); };
  $('#b-efeitos').addEventListener('click', () => { SOM.liga('efeitos', !SOM.pref().efeitos); rotSom(); SOM.toca('acerto'); });
  $('#b-musica').addEventListener('click', () => { SOM.liga('musica', !SOM.pref().musica); rotSom(); });
  rotSom();
  const rotAcess = () => { const p = ACESS.p(); $('#b-calmo').textContent = p.calmo ? '🐢 Menos movimento: ligado' : '🐢 Menos movimento: desligado'; $('#b-letra').textContent = p.letra ? '🔠 Letra maior: ligada' : '🔠 Letra maior: desligada'; $('#b-calmo').setAttribute('aria-pressed', !!p.calmo); $('#b-letra').setAttribute('aria-pressed', !!p.letra); };
  $('#b-calmo').addEventListener('click', () => { ACESS.liga('calmo', !ACESS.p().calmo); semMovimento = ACESS.p().calmo; rotAcess(); });
  $('#b-letra').addEventListener('click', () => { ACESS.liga('letra', !ACESS.p().letra); rotAcess(); });
  rotAcess();
  /* sem internet: o service worker guarda o Mundo; o botão de instalar aparece quando o navegador oferece */
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  let pedidoInstalar = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedidoInstalar = e; $('#b-instalar').hidden = false; });
  window.addEventListener('appinstalled', () => { $('#b-instalar').hidden = true; aviso('📱 Mundo instalado! Abra pelo ícone na tela inicial.'); });
  $('#b-instalar').addEventListener('click', async () => { if (!pedidoInstalar) return; pedidoInstalar.prompt(); await pedidoInstalar.userChoice.catch(() => {}); pedidoInstalar = null; $('#b-instalar').hidden = true; });
  if (/iPhone|iPad|iPod/.test(navigator.userAgent) && !navigator.standalone) { const b = $('#b-instalar'); b.hidden = false; b.addEventListener('click', () => aviso('No iPhone: toque em Compartilhar e depois em “Adicionar à Tela de Início”.')); }
  window.addEventListener('offline', () => aviso('📴 Sem internet: o Mundo continua funcionando, mas os jogos das casas precisam de conexão.'));
  window.addEventListener('online', () => aviso('📶 Internet de volta!'));

  cv.tabIndex = 0;
  $('#missoes').addEventListener('click', () => $('#missoes').classList.toggle('aberta'));
  { const i = fases[S.fase] && liberada(fases[S.fase]) ? S.fase : 0; atual = fases[i]; monta(atual); P.x = S.x; P.y = S.y; if (!livre(P.x, P.y)) trocaFase(i); }
  setTimeout(() => confereEstrelasSite(), 2500);
  setTimeout(lembraMissaoMundo, 6000);   // a missão do dia do Meu progresso que se faz no Mundo   // estrelas achadas no material didático desde a última visita
  $('#b-museu').addEventListener('click', () => { fechaJanela(); if (dentro) saiCasa(); if (noEnigma) saiEnigma(); if (sala) saiSala(); if (atual.idx !== 0) trocaFase(0); entraSala('museu'); });
  if (new URLSearchParams(location.search).has('teleporte')) { let n = 0; const t = setInterval(() => { if (!dialogoAberto && !janelaAberta) { clearInterval(t); portalTele(); } else if (++n > 60) clearInterval(t); }, 1000); }   // veio do resultado do teste: abre o portal assim que a tela estiver livre
  /* links diretos (usados na área premium): ?abrir=cursos[&curso=id], ?abrir=kits, ?kit=CÓDIGO (resgata e mostra na Loja de Roupas) */
  function linkDireto() {
    const q = new URLSearchParams(location.search), abrir = q.get('abrir'), kit = q.get('kit'), curso = q.get('curso');
    if (!abrir && !kit) return;
    if (kit) { q.delete('kit'); try { history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash); } catch (e) {} }   // o código não fica no endereço
    const vai = async () => {
      if (kit) { let r; try { r = await resgataKit(kit); } catch (e) { r = { ok: false, msg: 'Não deu para conferir o código agora. Tente de novo.' }; } lojaAtual = 'roupa'; lojaEscolha = null; abreJanela('loja'); janelaLoja(r); return; }
      if (abrir === 'kits') { abreLoja('roupa'); const d = document.querySelector('#loja-conteudo .resgate'); if (d) { d.open = true; d.scrollIntoView({ block: 'center' }); } return; }
      if (abrir === 'cursos') { abreJanela('cursos'); if (curso) setTimeout(() => { const el = document.getElementById('curso-' + curso); if (el) el.scrollIntoView({ block: 'start' }); }, 50); }
    };
    let n = 0; const t = setInterval(() => { if (!dialogoAberto && !janelaAberta) { clearInterval(t); vai(); } else if (++n > 90) clearInterval(t); }, 700);
  }
  linkDireto();
  window.MUNDO_DEBUG = { eventoGC, linkDireto, KITS_APOIO, resgataKit, hashKit, produtosKit, janelaLoja, CURSOS, janelaCursos, acessoPremium, EST_CURSOS, R_, COMP, EST_ROBO, simulaRobo, janelaRobo, lojaComponentes, usaRobo, ONDE, mostraBusca, irAte, pergunta, tentaCampo, PX, MODELOS_PX, janelaPixel, conferePixel, instrucoesPx, feitoMundo, lembraMissaoMundo, CIRCUITOS, circuitoDo, circuitoPortao, valorCirc, portao, GOLPES, detetive, respondeGolpe, TREM, janelaTrem, partirTrem, menorCaminhoTrem, cifraTexto, resumoTexto, janelaBilhetes, janelaHorta, regaHorta, colheHorta, SEMENTES, abreJogo, abreCasa, confereEstrelasSite, estrelasSite, moedasCunhadas, usaMuseu, progressoMundo, sincProgresso, bloqueada, comecaEM, sorteiaPergunta, portalTele, entraTele, resultadoTeste, papelNpc, compraNpc, carteiro, guia, entregaPara, precoNpc, temPlanta, SALAS, entraSala, saiSala, sala: () => sala, EMAT, LAB, ampliaCasa, AMPLIACOES, PAREDES: () => PAREDES, CW: () => CW, codigoAmigo, leCodigosAmigos, SOM, teleporta, desenhaMapa, monta, codigoSalvamento, restauraSalvamento, habsTrabalhadas, lePlaca, missoes, fases, desenhaCartao, lerMissaoProf, perguntaMissao, codigoTurma, FEIRA, diaFeira, precoUnit, vendeFeira, visitaNpc, casaNpc, visita: () => visita, pistaNaCasa, pistaMisterio, concluiMisterio, MISTERIO, bancoNpc, falaNpc, confereMissoesJogos, MISSOES_JOGOS, ganhaFigurinha, PAGINAS_ALBUM, ESTACAO, CLIMA, boletim, missoesEstacao, rende, perguntaMesada, contaMesada, desafioEM, LUGARES_EM, OF, NIVEIS_OF, passosOF, inicioOF, PROFISSOES, falaProf, PROJETOS, doa, codigoTurma, resumoTurma, abreLoja, cobra, produtos, planos, perguntaLoja, eventosAtivos, aniversariantes, desafioAniversario, premioEvento, HOJE, trocaFase, atual: () => atual, leve: () => leve, entraEnigma, usaEnigma, EOBJ, CODIGO, PALAVRA, moveEspecial, ESP, PET, acaoPet, atualizaPet, P, fases, interage, S: () => S, iso, _mouse: (x, y) => { mouse = { x, y }; }, entraCasa, saiCasa, construir, comecaColocar, colocaAqui, usaMovel, MOVEIS, dentro: () => dentro, alvoPerto };
  hud(); confereJogos(); confereFases(); cobra(); rende();
  { const b = $('#b-evento'); const tem = eventosAtivos.length || aniversariantes.length;
    if (!tem) { b.hidden = false; b.querySelector('.ic').textContent = ESTACAO.ic; b.querySelector('.t').textContent = ESTACAO.nome; }
    if (tem) { b.hidden = false; b.querySelector('.ic').textContent = aniversariantes.length ? '🎂' : eventosAtivos[0].ic; b.querySelector('.t').textContent = aniversariantes.length && !eventosAtivos.length ? 'Aniversário' : eventosAtivos[0].nome.split(' ')[0] === 'Dia' ? 'Evento' : eventosAtivos[0].nome;
      setTimeout(() => aviso(aniversariantes.length ? `🎂 Hoje é aniversário de ${aniversariantes[0].nome}! Desafio do dia no botão de evento.` : `${eventosAtivos[0].ic} Evento: ${eventosAtivos[0].nome}! Veja as missões especiais.`), 2600); } }
  if (S.pet) { atualizaPet(); petPerto(); const pede = precisa(S.pet); if (pede.length) setTimeout(() => aviso(`🐾 ${S.pet.nome} precisa de você: ${pede.join(' ')}`), 1200); }
  if (!S.pontos) setTimeout(() => aviso('🌍 Explore o mundo e descubra os desafios!'), 400);
  requestAnimationFrame(quadro);
})();
