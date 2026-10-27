/* =====================================================================
   Estrelas secretas — figurinhas de estrela escondidas pelo site.
   Cada estrela guarda uma dica de acordo com o ano do perfil do estudante
   (o mesmo perfil de material-didatico/meu-progresso.html; sem perfil = 6º ano).
     vermelho = Matemática · verde = Computação · amarelo = Desafio rápido
   Tudo fica no navegador (localStorage), separado por perfil.
   Para colocar estrelas numa página nova: incluir este script e adicionar
   o caminho em LOCAIS (o total do contador é calculado a partir dessa lista).
   ===================================================================== */
(function () {
  if (window.__estrelas || window.top !== window) return; // não roda dentro das janelas com iframe
  window.__estrelas = true;

  const KEY = 'ohtopico-estrelas-v1';
  const PERFIL_KEY = 'md-progresso-v1';
  const CORES = {
    vermelho: { nome: 'vermelha', area: 'Matemática', fill: '#e0342b' },
    verde: { nome: 'verde', area: 'Computação', fill: '#1f9d55' },
    amarelo: { nome: 'amarela', area: 'Desafio rápido', fill: '#f5c400' }
  };

  /* Onde ficam as estrelas: caminho da página (sem .html e sem index) -> cores das estrelas.
     grupo = nome mostrado no painel para dizer onde ainda faltam estrelas. */
  const LOCAIS = [
    ['/', 'Página inicial', ['amarelo', 'verde']],
    ['/blog/', 'Blog', ['vermelho']],
    ['/material-didatico/', 'Material didático', ['vermelho', 'verde']],
    ['/material-didatico/catalogo', 'Material didático', ['amarelo']],
    ['/material-didatico/matematica/', 'Material didático', ['vermelho']],
    ['/material-didatico/computacao/', 'Material didático', ['verde']],
    ['/material-didatico/bncc', 'Material didático', ['amarelo']],
    ['/material-didatico/meu-progresso', 'Material didático', ['amarelo']],
    ['/material-didatico/datas-festivas/', 'Material didático', ['vermelho']],
    ['/material-didatico/jogos/graficos', 'Jogos', ['vermelho']],
    ['/material-didatico/jogos/tabuada', 'Jogos', ['vermelho']],
    ['/material-didatico/jogos/fracoes', 'Jogos', ['vermelho']],
    ['/material-didatico/jogos/cartesiano', 'Jogos', ['vermelho']],
    ['/material-didatico/jogos/balanca', 'Jogos', ['amarelo']],
    ['/material-didatico/jogos/tangram', 'Jogos', ['amarelo']],
    ['/material-didatico/jogos/golpe', 'Jogos', ['amarelo']],
    ['/material-didatico/jogos/robo', 'Jogos', ['verde']],
    ['/material-didatico/jogos/cifra', 'Jogos', ['verde']],
    ['/material-didatico/jogos/rotas', 'Jogos', ['verde']],
    ['/material-didatico/jogos/pacotes', 'Jogos', ['verde']],
    ['/material-didatico/3d/tales', 'Laboratório 3D', ['vermelho']],
    ['/material-didatico/3d/balanca', 'Laboratório 3D', ['vermelho']],
    ['/material-didatico/3d/potencias', 'Laboratório 3D', ['amarelo']],
    ['/simuladores/', 'Simuladores', ['verde']],
    ['/simuladores/logica', 'Simuladores', ['verde']],
    ['/simuladores/bases', 'Simuladores', ['amarelo']],
    ['/escape-matematica/', 'Escape de Matemática', ['amarelo']],
    ['/freebies/', 'Materiais gratuitos', ['verde']]
  ];
  // lista plana: cada estrela tem id fixo (caminho#n) e um número dentro da sua cor (para escolher a dica)
  const ESTRELAS = [];
  const porCor = { vermelho: 0, verde: 0, amarelo: 0 };
  LOCAIS.forEach(([cam, grupo, cores]) => cores.forEach((cor, n) => {
    ESTRELAS.push({ id: cam + '#' + n, cam, grupo, cor, k: porCor[cor]++ });
  }));
  const TOTAL = ESTRELAS.length;

  /* ---------- dicas por ano ---------- */
  const DICAS = {
    6: {
      vermelho: [
        'No sistema decimal, o valor de um algarismo depende da posição: em 333, o primeiro 3 vale 300, o segundo vale 30 e o último vale 3.',
        'Um número é divisível por 3 quando a soma dos seus algarismos é divisível por 3. Exemplo: 471, porque 4 + 7 + 1 = 12.',
        'Número primo tem exatamente dois divisores: 1 e ele mesmo. Por isso o 1 não é primo, e o 2 é o único primo par.',
        'Frações equivalentes representam a mesma parte do todo: 1/2, 2/4 e 50/100 valem o mesmo.',
        'Porcentagem é uma fração com denominador 100. Calcular 10% de um valor é o mesmo que dividir por 10.',
        'Para comparar decimais, iguale as casas depois da vírgula: 0,5 = 0,50, que é maior que 0,45.',
        'Um ângulo reto mede 90 graus. Uma volta completa tem 360 graus, ou seja, quatro ângulos retos.',
        'Perímetro é a medida do contorno; área é a medida da superfície. Um quadrado de lado 3 cm tem perímetro 12 cm e área 9 cm².',
        'Todo número par termina em 0, 2, 4, 6 ou 8. Para saber se um número é divisível por 5, basta olhar se termina em 0 ou 5.',
        'Em um gráfico de colunas, comece o eixo vertical no zero: assim a altura das colunas mostra a comparação de forma honesta.'
      ],
      verde: [
        'Algoritmo é uma sequência finita e ordenada de passos para resolver um problema, como uma receita de bolo.',
        'Decompor é dividir um problema grande em partes menores. Cada parte fica mais fácil de resolver e testar.',
        'O computador guarda tudo como 0 e 1. Cada 0 ou 1 é um bit, e 8 bits formam um byte.',
        'Uma lista guarda vários valores em ordem. Em muitas linguagens, a primeira posição de uma lista é a posição 0.',
        'Senha forte é longa e difícil de adivinhar. Uma frase com várias palavras costuma ser mais segura que uma palavra curta.',
        'Uma repetição (laço) evita escrever o mesmo comando muitas vezes: "repita 4 vezes: ande e vire" desenha um quadrado.',
        'Uma condição (se... senão) faz o programa escolher um caminho: se estiver chovendo, leve guarda-chuva; senão, não leve.',
        'Antes de compartilhar uma notícia, confira a fonte, a data e se outros sites confiáveis contam a mesma coisa.',
        'Depurar é procurar e corrigir erros em um programa. Testar com exemplos pequenos ajuda a achar o erro mais rápido.',
        'Um dado pode ser número, texto ou verdadeiro/falso. O tipo do dado define o que o programa consegue fazer com ele.'
      ],
      amarelo: [
        { p: 'Quanto é 25% de 80?', r: '20. Um quarto de 80.' },
        { p: 'Qual é o menor número primo de dois algarismos?', r: '11.' },
        { p: 'Quantos bits tem um byte?', r: '8 bits.' },
        { p: 'Qual fração é maior: 2/3 ou 3/5?', r: '2/3. Com denominador 15: 10/15 contra 9/15.' },
        { p: 'Um robô anda 2 casas, vira à direita e repete isso 4 vezes. Que figura ele desenha?', r: 'Um quadrado de lado 2.' },
        { p: 'Qual é o mínimo múltiplo comum de 4 e 6?', r: '12.' },
        { p: 'Escreva 3/4 como número decimal.', r: '0,75.' },
        { p: 'Quantos ângulos retos cabem em meia volta?', r: 'Dois. Meia volta tem 180 graus.' },
        { p: 'Em binário, como se escreve o número 5?', r: '101 (4 + 0 + 1).' },
        { p: 'Um retângulo tem 6 cm por 4 cm. Qual é a sua área?', r: '24 cm².' }
      ]
    },
    7: {
      vermelho: [
        'Na reta numérica, quanto mais à esquerda, menor o número: -8 é menor que -2.',
        'Na multiplicação de inteiros, sinais iguais dão resultado positivo e sinais diferentes dão negativo: (-3) x (-4) = 12.',
        'Resolver uma equação é como equilibrar uma balança: o que você faz de um lado, faz também do outro.',
        'Razão compara duas grandezas por divisão. Em uma receita com 2 xícaras de farinha para 1 de leite, a razão é 2 para 1.',
        'Em grandezas diretamente proporcionais, dobrar uma dobra a outra. Se 3 pães custam R$ 6, 6 pães custam R$ 12.',
        'Ângulos complementares somam 90 graus; ângulos suplementares somam 180 graus.',
        'A soma dos ângulos internos de qualquer triângulo é sempre 180 graus.',
        'Ângulos opostos pelo vértice têm a mesma medida.',
        'O comprimento de uma circunferência é cerca de 3,14 vezes o seu diâmetro. Esse número é o pi.',
        'Probabilidade é casos favoráveis divididos por casos possíveis. Tirar 6 em um dado: 1 em 6.'
      ],
      verde: [
        'Automatizar é fazer o computador repetir uma tarefa sem que a pessoa precise fazer tudo à mão.',
        'Na internet, a informação viaja dividida em pequenos pacotes, que podem seguir caminhos diferentes até o destino.',
        'Um endereço IP identifica um aparelho na rede, como um endereço de casa identifica onde entregar uma carta.',
        'Uma variável é um nome que guarda um valor que pode mudar durante o programa, como a pontuação de um jogo.',
        'Reconhecer padrões ajuda a resolver problemas parecidos com a mesma estratégia.',
        'Uma função é um bloco de código com nome que pode ser usado várias vezes, sem repetir os mesmos comandos.',
        'Um registro junta informações diferentes sobre a mesma coisa, como nome, idade e turma de um estudante.',
        'Links suspeitos podem ser golpe. Desconfie de mensagens com pressa, prêmios ou pedidos de senha.',
        'Um fluxograma desenha um algoritmo com caixas e setas: retângulo para ação e losango para decisão.',
        'Pegada digital é o rastro que você deixa na internet. Pense antes de postar: o que vai para a rede pode ficar lá.'
      ],
      amarelo: [
        { p: 'Quanto é (-5) + 8?', r: '3.' },
        { p: 'Resolva: 2x + 3 = 11.', r: 'x = 4.' },
        { p: 'Um ângulo mede 35 graus. Quanto mede o seu complemento?', r: '55 graus.' },
        { p: 'Um triângulo tem ângulos de 50 e 60 graus. Quanto mede o terceiro?', r: '70 graus.' },
        { p: 'Uma receita usa 3 ovos para 2 xícaras de farinha. Quantos ovos para 6 xícaras?', r: '9 ovos.' },
        { p: 'Qual é a probabilidade de tirar cara ao lançar uma moeda?', r: '1/2, ou 50%.' },
        { p: 'Se x vale 3, quanto vale 4x - 5?', r: '7.' },
        { p: 'Um produto de R$ 50 tem desconto de 20%. Quanto custa?', r: 'R$ 40.' },
        { p: 'O programa faz: pontos = 0; repita 5 vezes: pontos = pontos + 2. Quanto vale pontos no fim?', r: '10.' },
        { p: 'Qual é o suplemento de um ângulo de 120 graus?', r: '60 graus.' }
      ]
    },
    8: {
      vermelho: [
        'Na multiplicação de potências de mesma base, somam-se os expoentes: 2³ x 2² = 2⁵.',
        'Todo número diferente de zero elevado a zero vale 1.',
        'Notação científica escreve números muito grandes ou pequenos: 300 000 000 = 3 x 10⁸.',
        'Toda dízima periódica pode ser escrita como fração: 0,333... = 1/3.',
        'Um sistema de duas equações procura os valores que servem nas duas ao mesmo tempo.',
        'A área do círculo é pi vezes o raio ao quadrado. Dobrar o raio multiplica a área por 4.',
        'Média soma tudo e divide pela quantidade; mediana é o valor do meio da lista ordenada; moda é o que mais aparece.',
        'O volume de um prisma é a área da base vezes a altura.',
        'Em uma translação, a figura desliza sem girar e sem mudar de tamanho.',
        'Raiz quadrada é a operação inversa de elevar ao quadrado: a raiz de 49 é 7, porque 7 x 7 = 49.'
      ],
      verde: [
        'Um grafo representa ligações: os pontos são vértices e as linhas são arestas. Mapas de rotas e redes sociais são grafos.',
        'Recursão é quando uma função usa a si mesma para resolver uma versão menor do mesmo problema.',
        'Uma árvore é uma estrutura de dados em que cada item tem um "pai" e pode ter vários "filhos", como pastas no computador.',
        'Criptografia embaralha a mensagem para que só quem tem a chave consiga ler.',
        'A cifra de César troca cada letra por outra algumas posições à frente no alfabeto. É simples de quebrar testando as 25 chaves.',
        'Busca binária encontra um item em uma lista ordenada cortando a lista pela metade a cada passo.',
        'Dados abertos são informações públicas que qualquer pessoa pode usar para fazer análises e gráficos.',
        'Compressão de arquivos reduz o tamanho procurando repetições nos dados.',
        'Autenticação em dois fatores pede algo que você sabe (senha) e algo que você tem (celular).',
        'Um algoritmo eficiente faz menos passos. Para listas grandes, a diferença de tempo pode ser enorme.'
      ],
      amarelo: [
        { p: 'Quanto é 2⁵?', r: '32.' },
        { p: 'Escreva 0,0004 em notação científica.', r: '4 x 10⁻⁴.' },
        { p: 'Resolva o sistema: x + y = 10 e x - y = 2.', r: 'x = 6 e y = 4.' },
        { p: 'Qual é a mediana de 3, 9, 4, 7, 5?', r: '5. Ordenando: 3, 4, 5, 7, 9.' },
        { p: 'Na cifra de César com chave 3, como fica a palavra SOL?', r: 'VRO.' },
        { p: 'Em uma lista ordenada de 16 nomes, quantas vezes no máximo a busca binária corta a lista pela metade até sobrar um nome?', r: '4 vezes: 16, 8, 4, 2, 1.' },
        { p: 'Qual fração representa 0,5555...?', r: '5/9.' },
        { p: 'Quanto é 10⁰?', r: '1.' },
        { p: 'Um cubo tem aresta de 3 cm. Qual é o seu volume?', r: '27 cm³.' },
        { p: 'Um grafo tem 4 vértices e cada um está ligado a todos os outros. Quantas arestas ele tem?', r: '6.' }
      ]
    },
    9: {
      vermelho: [
        'Números irracionais não podem ser escritos como fração. A raiz quadrada de 2 e o pi são exemplos.',
        'Teorema de Pitágoras: em um triângulo retângulo, a² = b² + c², sendo a a hipotenusa.',
        'Produto notável: (a + b)² = a² + 2ab + b². Não é só a² + b².',
        'Uma equação do 2º grau pode ter duas, uma ou nenhuma raiz real. Quem decide é o delta: b² - 4ac.',
        'Função é uma regra que liga cada valor de entrada a um único valor de saída.',
        'Juros compostos rendem juros sobre juros: R$ 100 a 10% ao mês viram R$ 110, depois R$ 121.',
        'Figuras semelhantes têm o mesmo formato e lados proporcionais, mas podem ter tamanhos diferentes.',
        'Potência com expoente fracionário é raiz: 9 elevado a 1/2 é a raiz quadrada de 9, que vale 3.',
        'Na função afim y = ax + b, o número a diz o quanto y muda quando x aumenta 1.',
        'Porcentagens sucessivas não se somam: subir 10% e depois cair 10% deixa o valor 1% menor.'
      ],
      verde: [
        'Inteligência artificial aprende padrões a partir de exemplos. Se os exemplos têm viés, o resultado também pode ter.',
        'Aprendizado de máquina treina um modelo com dados e depois testa com dados que ele nunca viu.',
        'Uma IA pode inventar respostas com segurança. Sempre confira informações importantes em fontes confiáveis.',
        'A LGPD é a lei brasileira que protege dados pessoais, como nome, foto, endereço e CPF.',
        'Programar em módulos é dividir o programa em partes independentes, cada uma com uma responsabilidade.',
        'Um banco de dados organiza informações em tabelas com linhas e colunas, para buscar e cruzar dados rapidamente.',
        'Phishing é o golpe que imita uma empresa ou pessoa conhecida para roubar senhas e dados.',
        'Algoritmos de recomendação mostram o que você provavelmente vai clicar. Isso pode criar uma bolha de informação.',
        'Testar um programa com casos extremos (zero, números negativos, listas vazias) revela erros escondidos.',
        'Software livre permite estudar, modificar e compartilhar o código. Muitos sistemas da internet funcionam assim.'
      ],
      amarelo: [
        { p: 'Um triângulo retângulo tem catetos 6 e 8. Quanto mede a hipotenusa?', r: '10.' },
        { p: 'Quais são as raízes de x² - 5x + 6 = 0?', r: '2 e 3.' },
        { p: 'Quanto é (x + 3)²?', r: 'x² + 6x + 9.' },
        { p: 'R$ 1 000 aplicados a 10% ao ano, com juros compostos, viram quanto em 2 anos?', r: 'R$ 1 210.' },
        { p: 'A raiz quadrada de 50 está entre quais números inteiros?', r: 'Entre 7 e 8.' },
        { p: 'Na função y = 2x + 1, quanto vale y quando x = 4?', r: '9.' },
        { p: 'Quanto é 8 elevado a 1/3?', r: '2, porque 2 x 2 x 2 = 8.' },
        { p: 'Uma foto de 10 cm por 15 cm é ampliada para 20 cm de largura. Qual deve ser a altura?', r: '30 cm.' },
        { p: 'Uma IA treinada só com fotos de gatos brancos erra gatos pretos. Como chama esse problema?', r: 'Viés nos dados de treinamento.' },
        { p: 'Nome, CPF e foto do rosto: quais são dados pessoais pela LGPD?', r: 'Os três.' }
      ]
    }
  };

  /* ---------- armazenamento ---------- */
  const lerJSON = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
  let mem = null;
  function load() { const s = lerJSON(KEY); return (s && s.perfis) ? s : (mem || { perfis: {} }); }
  function save(s) { mem = s; try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  // perfil do material didático (apelido e ano escolhidos ao criar a conta)
  function perfil() {
    const s = lerJSON(PERFIL_KEY);
    const p = s && s.perfis && s.atual && s.perfis[s.atual];
    return p ? { id: p.id, apelido: p.apelido, ano: [6, 7, 8, 9].includes(+p.ano) ? +p.ano : 6 } : { id: '_', apelido: null, ano: 6 };
  }
  function achadas() {
    const p = perfil(), s = load();
    // estrelas achadas antes de criar o perfil passam para o primeiro perfil criado
    if (p.id !== '_' && !s.perfis[p.id] && s.perfis._) { s.perfis[p.id] = s.perfis._; delete s.perfis._; save(s); }
    const reg = (s.perfis[p.id] || {}).a || {};
    Object.keys(reg).forEach(id => { if (!ESTRELAS.some(e => e.id === id)) delete reg[id]; });
    return reg;
  }
  function marcar(id) {
    const p = perfil(), s = load();
    const reg = s.perfis[p.id] = s.perfis[p.id] || { a: {} };
    reg.a[id] = Math.floor(Date.now() / 864e5);
    save(s);
  }
  function dica(e, ano) { const l = DICAS[ano][e.cor]; return l[e.k % l.length]; }

  /* ---------- página atual ---------- */
  function caminho() {
    let c = location.pathname.replace(/index\.html$/, '').replace(/\.html$/, '');
    if (!c.endsWith('/') && LOCAIS.some(([x]) => x === c + '/')) c += '/';
    return c || '/';
  }
  const aqui = ESTRELAS.filter(e => e.cam === caminho());
  // o contador aparece nas páginas com estrelas e nas áreas de estudante; páginas de serviços ficam sem nada
  if (!aqui.length && !/^\/(material-didatico|simuladores|blog)\//.test(location.pathname)) return;

  /* ---------- estilo ---------- */
  const css = `
  .estrela-sec { position: absolute; z-index: 40; width: 30px; height: 30px; padding: 0; margin: 0; border: 0; background: none; cursor: pointer;
    transform: rotate(var(--rot, 0deg)); opacity: .8; transition: transform .25s, opacity .25s; -webkit-tap-highlight-color: transparent; }
  .estrela-sec:hover, .estrela-sec:focus-visible { opacity: 1; transform: rotate(var(--rot, 0deg)) scale(1.25); outline: none; }
  .estrela-sec:focus-visible svg { filter: drop-shadow(0 0 0 #111) drop-shadow(0 0 3px #111); }
  .estrela-sec svg, .estrelas-cont svg, .estrelas-card svg { display: block; width: 100%; height: 100%; }
  .estrela-sec.pega { animation: estrela-pega .5s forwards; pointer-events: none; }
  @keyframes estrela-pega { to { transform: rotate(200deg) scale(2); opacity: 0; } }
  .estrelas-cont { position: fixed; left: 12px; bottom: 12px; z-index: 55; display: flex; align-items: center; gap: 6px; padding: 5px 12px 5px 7px;
    border: 1.5px solid #111; border-radius: 999px; background: #fffdf2; color: #111; font: 600 14px/1.2 Lexend, system-ui, sans-serif; cursor: pointer;
    box-shadow: 2px 2px 0 #111; }
  .estrelas-cont:hover, .estrelas-cont:focus-visible { background: #fff6bf; outline: none; }
  .estrelas-cont .ic { width: 20px; height: 20px; }
  .estrelas-cont.pulsa { animation: estrelas-pulsa .6s; }
  @keyframes estrelas-pulsa { 50% { transform: scale(1.15); } }
  .estrelas-fundo { position: fixed; inset: 0; z-index: 70; background: rgba(0,0,0,.45); display: flex; align-items: center; justify-content: center; padding: 16px; }
  .estrelas-card { position: relative; width: min(440px, 100%); max-height: calc(100vh - 32px); overflow: auto; background: #fffdf2; color: #111;
    border: 1.5px solid #111; border-radius: 14px; box-shadow: 4px 4px 0 #111; padding: 22px 22px 18px; font: 400 15px/1.5 Lexend, system-ui, sans-serif; }
  .estrelas-card h2 { margin: 0 0 4px; font: 800 21px/1.2 Sniglet, Lexend, system-ui, sans-serif; }
  .estrelas-card .sub { margin: 0 0 12px; color: #4a4a4a; font-size: 13px; }
  .estrelas-card .grande { width: 64px; height: 64px; margin: 0 auto 8px; }
  .estrelas-card .dica { margin: 0 0 14px; padding: 12px 14px; border-radius: 10px; border-left: 5px solid var(--c); background: #fff; }
  .estrelas-card .dica strong { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: #4a4a4a; margin-bottom: 2px; }
  .estrelas-card .resp { margin-top: 8px; }
  .estrelas-card button.b { min-height: 38px; padding: 6px 16px; border: 1.5px solid #111; border-radius: 999px; background: #111; color: #fff;
    font: 600 14px Lexend, system-ui, sans-serif; cursor: pointer; }
  .estrelas-card button.b.leve { background: #fff; color: #111; }
  .estrelas-card .x { position: absolute; top: 8px; right: 10px; width: 34px; height: 34px; border: 0; background: none; font-size: 24px; line-height: 1; cursor: pointer; color: #111; }
  .estrelas-card .barra { height: 10px; border: 1.5px solid #111; border-radius: 999px; overflow: hidden; background: #fff; margin: 8px 0 12px; }
  .estrelas-card .barra span { display: block; height: 100%; background: #1f9d55; }
  .estrelas-card .cores { display: flex; gap: 14px; flex-wrap: wrap; margin: 0 0 12px; font-size: 13px; }
  .estrelas-card .cores span { display: inline-flex; align-items: center; gap: 5px; }
  .estrelas-card .cores i { width: 16px; height: 16px; display: inline-block; }
  .estrelas-card ul { list-style: none; margin: 0 0 12px; padding: 0; }
  .estrelas-card li { display: flex; gap: 10px; padding: 8px 0; border-top: 1px solid #e2e2df; font-size: 14px; }
  .estrelas-card li i { flex: 0 0 18px; height: 18px; margin-top: 2px; }
  .estrelas-card .pe { font-size: 13px; color: #4a4a4a; margin: 0; }
  .estrelas-card a { color: #16703a; }
  [data-theme="dark"] .estrelas-cont, [data-theme="dark"] .estrelas-card { background: #1d1d1d; color: #f3f3f1; border-color: #f3f3f1; box-shadow: 2px 2px 0 #f3f3f1; }
  [data-theme="dark"] .estrelas-cont:hover { background: #2e2a0c; }
  [data-theme="dark"] .estrelas-card .dica, [data-theme="dark"] .estrelas-card .barra, [data-theme="dark"] .estrelas-card button.b.leve { background: #151515; color: #f3f3f1; }
  [data-theme="dark"] .estrelas-card .sub, [data-theme="dark"] .estrelas-card .pe, [data-theme="dark"] .estrelas-card .dica strong { color: #c9c9c6; }
  [data-theme="dark"] .estrelas-card button.b { background: #f3f3f1; color: #111; border-color: #f3f3f1; }
  [data-theme="dark"] .estrelas-card .x { color: #f3f3f1; }
  [data-theme="dark"] .estrelas-card li { border-color: #3a3a38; }
  [data-theme="dark"] .estrelas-card a { color: #6fd08c; }
  @media (prefers-reduced-motion: reduce) { .estrela-sec, .estrela-sec.pega, .estrelas-cont.pulsa { animation: none; transition: none; } }
  @media print { .estrela-sec, .estrelas-cont { display: none !important; } }`;

  const svgEstrela = (cor, extra = '') => `<svg viewBox="0 0 24 24" aria-hidden="true" ${extra}><path d="M12 1.8l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.6l-6.2 3.3L7 14 2 9.1l6.9-1z" fill="${cor}" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
  const svgVazia = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.8l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.6l-6.2 3.3L7 14 2 9.1l6.9-1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2.5 2" stroke-linejoin="round"/></svg>';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- posição das estrelas ----------
     Cada estrela escolhe, de forma sempre igual para a mesma página, um elemento visível do conteúdo
     e fica presa num canto dele. Se o elemento sumir (troca de tela, janela fechada), escolhe outro. */
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const ALVOS = 'main h2, main h3, main p, main li, main img, main figure, main section, main article, .card, .rc, h2, h3, p, img, li, section';
  function visivel(el) {
    if (!el.isConnected || el.closest('.estrelas-card, .estrelas-cont, nav, header, footer, [aria-hidden="true"], #taskbar')) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 120 || r.height < 18) return false;
    const st = getComputedStyle(el);
    if (st.visibility === 'hidden' || el.offsetParent === null) return false;
    // dentro de caixas com rolagem (janelas da página inicial), só vale se o elemento estiver à mostra
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      if (getComputedStyle(a).overflowY === 'visible') continue;
      const c = a.getBoundingClientRect();
      if (r.top < c.top + 10 || r.bottom > c.bottom - 10 || r.left < c.left || r.right > c.right) return false;
    }
    return true;
  }
  function escolherAlvo(e) {
    const vistos = new Set(), lista = [];
    document.querySelectorAll(ALVOS).forEach(el => { if (!vistos.has(el)) { vistos.add(el); if (visivel(el)) lista.push(el); } });
    if (!lista.length) return null;
    // evita o mesmo elemento para duas estrelas da página
    const usados = aqui.map(x => x.alvo).filter(Boolean);
    const livres = lista.filter(el => !usados.includes(el));
    const pool = livres.length ? livres : lista;
    return pool[hash(e.id) % pool.length];
  }
  function posicionar(e) {
    if (!e.btn) return;
    if (!e.alvo || !visivel(e.alvo)) e.alvo = escolherAlvo(e);
    if (!e.alvo) { e.btn.style.display = 'none'; return; }
    const r = e.alvo.getBoundingClientRect(), h = hash(e.id);
    const canto = h % 4; // 0 sup-dir, 1 inf-dir, 2 inf-esq, 3 sup-esq
    const x = (canto === 2 || canto === 3) ? r.left - 12 : r.right - 18;
    const y = (canto === 0 || canto === 3) ? r.top - 12 : r.bottom - 18;
    const maxX = document.documentElement.clientWidth - 34;
    e.btn.style.display = '';
    e.btn.style.left = Math.max(2, Math.min(maxX, x + scrollX)) + 'px';
    e.btn.style.top = Math.max(2, y + scrollY) + 'px';
    e.btn.style.setProperty('--rot', ((h >> 3) % 50 - 25) + 'deg');
  }
  let agendado = 0;
  function reposicionar() {
    if (agendado) return;
    agendado = requestAnimationFrame(() => { agendado = 0; aqui.forEach(posicionar); });
  }

  /* ---------- janela ---------- */
  let fundo = null, voltarFoco = null;
  function abrir(html, rotulo) {
    fechar();
    voltarFoco = document.activeElement;
    fundo = document.createElement('div');
    fundo.className = 'estrelas-fundo';
    fundo.innerHTML = `<div class="estrelas-card" role="dialog" aria-modal="true" aria-label="${esc(rotulo)}"><button class="x" type="button" aria-label="Fechar">&times;</button>${html}</div>`;
    fundo.addEventListener('click', ev => { if (ev.target === fundo || ev.target.closest('.x, [data-fechar]')) fechar(); });
    document.body.appendChild(fundo);
    (fundo.querySelector('[data-foco]') || fundo.querySelector('.x')).focus();
    return fundo;
  }
  function fechar() {
    if (!fundo) return;
    fundo.remove(); fundo = null;
    if (voltarFoco && voltarFoco.isConnected) voltarFoco.focus();
  }
  document.addEventListener('keydown', ev => {
    if (!fundo) return;
    if (ev.key === 'Escape') fechar();
    if (ev.key === 'Tab') { // mantém o foco dentro da janela
      const f = [...fundo.querySelectorAll('button, a[href], select')];
      if (!f.length) return;
      if (ev.shiftKey && document.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
      else if (!ev.shiftKey && document.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
    }
  });

  function blocoDica(e, ano) {
    const c = CORES[e.cor], d = dica(e, ano);
    if (typeof d === 'string') return `<div class="dica" style="--c:${c.fill}"><strong>${c.area} · ${ano}º ano</strong>${esc(d)}</div>`;
    return `<div class="dica" style="--c:${c.fill}"><strong>${c.area} · ${ano}º ano</strong>${esc(d.p)}
      <div class="resp"><button class="b leve" type="button" data-resp>Ver resposta</button><span hidden>${esc(d.r)}</span></div></div>`;
  }
  function ligarRespostas(raiz) {
    raiz.querySelectorAll('[data-resp]').forEach(b => b.onclick = () => { b.nextElementSibling.hidden = false; b.remove(); });
  }
  const linkProgresso = () => (location.pathname.startsWith('/material-didatico/meu-progresso') ? '' :
    ' <a href="/material-didatico/meu-progresso.html">Trocar o ano em Meu progresso</a>.');

  function achou(e) {
    marcar(e.id);
    e.btn.classList.add('pega');
    setTimeout(() => { e.btn.remove(); e.btn = null; }, 500);
    atualizarContador(true);
    const n = Object.keys(achadas()).length, p = perfil(), c = CORES[e.cor];
    const f = abrir(`<div class="grande">${svgEstrela(c.fill)}</div>
      <h2 style="text-align:center">Você encontrou uma estrela ${c.nome}</h2>
      <p class="sub" style="text-align:center">${n} de ${TOTAL} estrelas encontradas${p.apelido ? ' por ' + esc(p.apelido) : ''}</p>
      ${blocoDica(e, p.ano)}
      <p style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:0 0 10px">
        <button class="b" type="button" data-fechar data-foco>Continuar procurando</button>
        <button class="b leve" type="button" data-painel>Minhas estrelas</button></p>
      <p class="pe" style="text-align:center">Dicas para o ${p.ano}º ano.${linkProgresso()}</p>`, 'Estrela encontrada');
    ligarRespostas(f);
    f.querySelector('[data-painel]').onclick = painel;
  }

  function painel() {
    const reg = achadas(), p = perfil(), n = Object.keys(reg).length;
    const minhas = ESTRELAS.filter(e => reg[e.id]).sort((a, b) => reg[b.id] - reg[a.id]);
    const contaCor = cor => ESTRELAS.filter(e => e.cor === cor && reg[e.id]).length + ' de ' + ESTRELAS.filter(e => e.cor === cor).length;
    const faltam = {};
    ESTRELAS.filter(e => !reg[e.id]).forEach(e => { faltam[e.grupo] = (faltam[e.grupo] || 0) + 1; });
    const ondeFalta = Object.entries(faltam).map(([g, q]) => `${g} (${q})`).join(', ');
    const f = abrir(`<h2>Estrelas secretas</h2>
      <p class="sub">${p.apelido ? esc(p.apelido) + ' · ' : ''}dicas para o ${p.ano}º ano</p>
      <div class="barra" role="progressbar" aria-valuemin="0" aria-valuemax="${TOTAL}" aria-valuenow="${n}" aria-label="Estrelas encontradas"><span style="width:${(n / TOTAL * 100).toFixed(1)}%"></span></div>
      <p style="margin:0 0 10px"><strong>${n} de ${TOTAL}</strong> estrelas encontradas.</p>
      <div class="cores">${Object.entries(CORES).map(([k, c]) => `<span><i>${svgEstrela(c.fill)}</i>${c.area}: ${contaCor(k)}</span>`).join('')}</div>
      ${minhas.length ? `<ul>${minhas.map(e => `<li><i>${svgEstrela(CORES[e.cor].fill)}</i><div>${blocoDica(e, p.ano)}</div></li>`).join('')}</ul>`
        : '<p>Nenhuma estrela ainda. Elas estão escondidas pelas páginas do site, perto de títulos, textos e imagens. Clique nelas para ganhar dicas.</p>'}
      <p class="pe">${n === TOTAL ? 'Você encontrou todas as estrelas do site.' : 'Ainda há estrelas em: ' + ondeFalta + '.'}${linkProgresso()}</p>`, 'Estrelas secretas');
    // o estilo inline do bloco da lista substitui o da dica; a cor fica só no ícone
    f.querySelectorAll('li .dica').forEach(d => d.setAttribute('style', 'margin:0;padding:0;border:0;background:none'));
    ligarRespostas(f);
  }

  /* ---------- contador ---------- */
  let cont = null;
  function atualizarContador(pulsar) {
    if (!cont) return;
    const n = Object.keys(achadas()).length;
    cont.querySelector('.n').textContent = n + '/' + TOTAL;
    cont.setAttribute('aria-label', `Estrelas secretas: ${n} de ${TOTAL} encontradas. Abrir a lista`);
    if (pulsar) { cont.classList.remove('pulsa'); void cont.offsetWidth; cont.classList.add('pulsa'); }
  }
  function ajustarContador() {
    if (!cont) return;
    const barra = document.getElementById('taskbar'); // página inicial: fica acima da barra de tarefas
    cont.style.bottom = (barra ? barra.getBoundingClientRect().height + 10 : 12) + 'px';
  }

  function iniciar() {
    const st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    cont = document.createElement('button');
    cont.type = 'button';
    cont.className = 'estrelas-cont';
    cont.title = 'Estrelas secretas';
    cont.innerHTML = `<span class="ic">${svgEstrela('#f5c400')}</span><span class="n"></span>`;
    cont.onclick = painel;
    document.body.appendChild(cont);
    atualizarContador(false);
    ajustarContador();

    const reg = achadas();
    aqui.forEach(e => {
      if (reg[e.id]) return;
      const b = e.btn = document.createElement('button');
      b.type = 'button';
      b.className = 'estrela-sec';
      b.setAttribute('aria-label', 'Estrela ' + CORES[e.cor].nome + ' escondida');
      b.innerHTML = svgEstrela(CORES[e.cor].fill);
      b.onclick = ev => { ev.preventDefault(); ev.stopPropagation(); achou(e); };
      document.body.appendChild(b);
    });
    reposicionar();
    addEventListener('resize', () => { reposicionar(); ajustarContador(); });
    addEventListener('load', reposicionar);
    addEventListener('scroll', ev => { if (ev.target !== document) reposicionar(); }, true); // rolagem dentro de caixas
    // conteúdo montado por script (catálogo, jogos, janelas da página inicial): acompanha as mudanças
    const nosso = n => n.nodeType === 1 && n.closest('.estrela-sec, .estrelas-cont, .estrelas-fundo');
    new MutationObserver(ms => { if (ms.some(m => !nosso(m.target) && (m.type === 'attributes' || ![...m.addedNodes, ...m.removedNodes].every(nosso)))) reposicionar(); })
      .observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    // se o perfil mudar em outra aba ou na página Meu progresso, o contador acompanha
    addEventListener('storage', ev => { if (ev.key === PERFIL_KEY || ev.key === KEY) atualizarContador(false); });
  }

  window.Estrelas = { total: TOTAL, achadas: () => Object.keys(achadas()).length, painel };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
