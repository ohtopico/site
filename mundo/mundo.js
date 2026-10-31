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
  const FASES = [
    { id: 'vila', nome: 'Vila do Começo', sub: 'Primeiros passos · Computação do 6º ano', ano: 6, caminho: '#f7c6d9', marco: 'fonte', icone: '🏡', filtro: r => anoDe(r) <= 6 && r.comp.includes('CO'),
      placa: 'Bem-vindo! Cada casa desta vila é um jogo. Ela fica cinza até você jogar e vira colorida quando a atividade é concluída. Converse com as pessoas, pegue os livros e diamantes do chão e entre nas casas.' },
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
    { id: 'escola', nome: 'Escola dos Professores', sub: 'Guias, formação e mentoria', ano: 9, caminho: '#f5d6e6', marco: 'sino', icone: '🍎', lugares: PROF,
      placa: 'A escola é para quem ensina: guias de IA e tecnologia, prompts, planos de aula, formação e mentoria.' }
  ];
  const NOMES = ['Professora Maria', 'Seu Antônio', 'Dona Lúcia', 'Teco', 'Bia', 'Professor Carlos', 'Nina', 'Dudu', 'Vovó Rosa', 'Léo', 'Dona Cida', 'Juca', 'Mel', 'Seu Pedro', 'Lara', 'Kauã', 'Professora Ana', 'Rafa', 'Dona Zefa', 'Gui'];
  const PASTEIS = ['#f7a8c4', '#a8d8f7', '#c7b4f2', '#ffd58a', '#a8e6b8', '#ffb38a', '#f2e48a', '#9fe3dc'];
  const PELES = ['#f6d7bd', '#f3c9a6', '#d9a579', '#a9714b', '#6f4a2d'];
  const CABELOS = ['#3a2416', '#111111', '#8a5a2b', '#d6a93b', '#c2c2c2', '#e0564a', '#9a6bd6'];
  const ROUPAS = ['#3f8fe0', '#e0564a', '#4bb259', '#f6b73c', '#9a6bd6', '#2bb3b1', '#e07bb0', '#ffffff', '#333333'];

  /* itens do chão: livro mostra uma dica, diamante pede uma pergunta, os outros vão para o inventário */
  const ITENS = { livro: ['📘', 'Livro'], diamante: ['💎', 'Diamante'], estrela: ['⭐', 'Estrela'], maca: ['🍎', 'Maçã'], chave: ['🔑', 'Chave'], peca: ['🧩', 'Peça de quebra-cabeça'] };
  const SORTEIO_ITENS = ['livro', 'diamante', 'estrela', 'livro', 'maca', 'diamante', 'chave', 'peca'];
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
  /* perguntas de uma fase: múltipla escolha e verdadeiro ou falso das listas do mesmo ano */
  function perguntasDoAno(ano) {
    const out = [];
    for (const l of LST) {
      if (l.ano !== ano) continue;
      const eixos = eixosDe(l.habs);
      l.ex.forEach((e, i) => {
        if (e[0] === 'me') out.push({ id: l.id + '-' + i, enun: e[1], alts: e[2], certa: e[3], coment: e[4] || '', eixos });
        else if (e[0] === 'vf') e[2].forEach((af, j) => out.push({ id: l.id + '-' + i + '-' + j, enun: 'Verdadeiro ou falso? ' + af[0], alts: ['Verdadeiro', 'Falso'], certa: af[1] ? 0 : 1, coment: e[3] || '', eixos }));
      });
    }
    return out;
  }

  /* ---------- montagem do mapa (em blocos: 1 bloco = 1 unidade) ---------- */
  const T = { grama: 0, caminho: 1, praca: 2, agua: 3, areia: 4 };
  const fases = FASES.map((f, i) => {
    const lugares = f.lugares || jogaveis.filter(f.filtro).map(lugarRec);
    const n = Math.max(1, lugares.length);
    const raio = Math.max(8, Math.ceil(5 + 0.42 * n));
    const perguntas = perguntasDoAno(f.ano);
    return Object.assign({}, f, { idx: i, lugares, raio, perguntas,
      metaPerg: Math.min(perguntas.length, [4, 5, 6, 6, 6, 4, 3][i] || 4),
      metaJogar: Math.min(n, f.id === 'escola' ? 3 : 3 + Math.floor(i / 2)),
      nNpc: 2 + Math.floor(i / 2), nItens: 5 + i });
  });
  const ALT = Math.max(...fases.map(f => 2 * (f.raio + 9)));   // todas as fases têm a mesma altura
  const MEIO = Math.floor(ALT / 2);                              // a estrada que liga as fases passa no meio
  let x0 = 0;
  for (const f of fases) {
    const L = f.L = 2 * (f.raio + 9), r = rng(1000 + f.idx * 77);
    f.x0 = x0; x0 += L;
    f.tile = new Uint8Array(L * ALT);       // tipo do chão
    f.sol = new Uint8Array(L * ALT);        // 1 = não dá para passar
    f.var = new Uint8Array(L * ALT).map(() => Math.floor(r() * 4));
    const cx = L / 2, cy = MEIO + 0.5, fase0 = r() * 6;
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
    const raios = [Math.PI / 2, -Math.PI / 2].concat(f.idx % 2 ? [Math.PI / 4] : [-3 * Math.PI / 4]);
    for (const th of raios) for (let d = 3; d < raioEm(th); d += 0.4) {
      const x = Math.floor(cx + Math.cos(th) * d), y = Math.floor(cy + Math.sin(th) * d);
      if (at(x, y) && f.tile[pos(x, y)] === T.grama) f.tile[pos(x, y)] = T.caminho;
    }
    // fase 1: a casa do jogador, perto da entrada e ao norte da estrada, com um caminho até ela
    if (f.idx === 0) {
      const w = 4, d = 4;
      const cabe = (hx, hy) => { for (let j = hy - 1; j <= hy + d; j++) for (let k = hx - 1; k <= hx + w; k++) if (!at(k, j) || f.tile[pos(k, j)] !== T.grama) return false; return true; };
      let hx = 3, hy = MEIO - 2 - 2 - d;
      search: for (const yy of [hy, hy - 1, hy - 2, hy + 1]) for (const xx of [3, 4, 2, 5]) if (cabe(xx, yy)) { hx = xx; hy = yy; break search; }
      for (let j = hy; j < hy + d; j++) for (let k = hx; k < hx + w; k++) f.sol[pos(k, j)] = 1;
      for (let j = hy + d; j < MEIO - 1; j++) for (const k of [hx + 1, hx + 2]) f.tile[pos(k, j)] = T.caminho;
      f.minhaCasa = { gx: f.x0 + hx, x: hx, y: hy, w, d, porta: { x: f.x0 + hx + w / 2, y: hy + d + 0.7 } };
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
        return hy > 2 && hy + d < ALT - 2 && hx > 1 && hx + w < L - 1 && (hy > MEIO + 1 || hy + d < MEIO - 1);
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
      for (let t = 1.6; t < vl; t += 0.35) { const x = Math.floor(hcx + vx / vl * t), y = Math.floor(hcy + vy / vl * t); if (at(x, y) && f.tile[pos(x, y)] === T.grama && !f.sol[pos(x, y)]) f.tile[pos(x, y)] = T.caminho; }
      const ladoPorta = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'x+' : 'x-') : (vy > 0 ? 'y+' : 'y-');
      const porta = ladoPorta === 'x+' ? { x: casa.x + w + 0.7, y: hcy } : ladoPorta === 'x-' ? { x: casa.x - 0.7, y: hcy } : ladoPorta === 'y+' ? { x: hcx, y: casa.y + d + 0.7 } : { x: hcx, y: casa.y - 0.7 };
      Object.assign(casa, { lugar: l, porta, ladoPorta, cor: PASTEIS[(i * 3 + f.idx) % PASTEIS.length], altura: 2 + ((l.titulo.length + i) % 3) * 0.5 });
      casa.gx = f.x0 + casa.x; casa.porta.x += f.x0;
      f.casas.push(casa);
    });
    // monumento na praça
    for (let j = Math.floor(cy) - 1; j <= Math.floor(cy); j++) for (let k = Math.floor(cx) - 1; k <= Math.floor(cx); k++) f.sol[pos(k, j)] = 1;
    f.centro = { x: f.x0 + cx, y: cy };
    // lago num canto livre
    const cantos = [[0.22, 0.22], [0.78, 0.25], [0.25, 0.8], [0.78, 0.78]].sort(() => r() - 0.5);
    for (const [ux, uy] of cantos) {
      const lx = L * ux, ly = ALT * uy, ra = 2.4 + r() * 1.6, rb = 1.8 + r() * 1.2;
      let livre = true;
      for (let y = Math.floor(ly - rb - 2); y <= ly + rb + 2 && livre; y++) for (let x = Math.floor(lx - ra - 2); x <= lx + ra + 2; x++) if (!at(x, y) || f.tile[pos(x, y)] !== T.grama || f.sol[pos(x, y)]) { livre = false; break; }
      if (!livre) continue;
      for (let y = Math.floor(ly - rb - 1); y <= ly + rb + 1; y++) for (let x = Math.floor(lx - ra - 1); x <= lx + ra + 1; x++) {
        const e = ((x + 0.5 - lx) / ra) ** 2 + ((y + 0.5 - ly) / rb) ** 2;
        if (e < 1) { f.tile[pos(x, y)] = T.agua; f.sol[pos(x, y)] = 1; } else if (e < 1.7) f.tile[pos(x, y)] = T.areia;
      }
      break;
    }
    // árvores: cerca nas bordas (com a passagem da estrada) e um bosque espalhado
    f.arvores = [];
    const arvore = (x, y) => { if (!at(x, y) || f.sol[pos(x, y)] || f.tile[pos(x, y)] !== T.grama) return; f.sol[pos(x, y)] = 1; f.arvores.push({ x: f.x0 + x, y, tipo: Math.floor(r() * 3), alt: 1 + Math.floor(r() * 2) }); };
    for (let x = 0; x < L; x++) { arvore(x, 0); arvore(x, ALT - 1); if (r() < 0.6) arvore(x, 1); if (r() < 0.6) arvore(x, ALT - 2); }
    for (let y = 0; y < ALT; y++) { if (Math.abs(y - MEIO + 0.5) < 2) continue; if (f.idx === 0) { arvore(0, y); arvore(1, y); } if (f.idx === fases.length - 1) { arvore(L - 1, y); arvore(L - 2, y); } }
    const pertoDeCoisa = (x, y) => { for (let j = y - 1; j <= y + 1; j++) for (let i = x - 1; i <= x + 1; i++) if (at(i, j) && (f.tile[pos(i, j)] !== T.grama || f.sol[pos(i, j)])) return true; return false; };
    for (let k = 0; k < L * ALT * 0.05; k++) { const x = Math.floor(r() * L), y = Math.floor(r() * ALT); if (!pertoDeCoisa(x, y)) arvore(x, y); }
    // flores e enfeites (só desenho, não bloqueiam)
    f.flores = [];
    for (let k = 0; k < L * ALT * 0.06; k++) { const x = r() * L, y = r() * ALT; const t = f.tile[pos(Math.floor(x), Math.floor(y))]; if (t === T.grama && !f.sol[pos(Math.floor(x), Math.floor(y))]) f.flores.push({ x: f.x0 + x, y, c: ['#ff9fb6', '#fff27a', '#ffffff', '#c7a6ff', '#ffb36b'][k % 5] }); }
    // placa na entrada e portão no fim da estrada
    f.placa = { x: f.x0 + 3.5, y: MEIO + 1.8 };
    f.sol[pos(3, MEIO + 1)] = 1;
    if (f.idx < fases.length - 1) f.portao = { x: f.x0 + L - 0.5, y: MEIO };
    // moradores andando pelo anel
    const nomes = NOMES.slice();
    f.npcs = [];
    for (let k = 0; k < f.nNpc; k++) {
      const th = (k + 0.3) / f.nNpc * Math.PI * 2 + 0.6;
      const nome = nomes.splice((f.idx * 3 + k * 5) % nomes.length, 1)[0];
      f.npcs.push({ id: f.id + '-npc' + k, nome, th, x: f.x0 + cx + Math.cos(th) * raioEm(th), y: cy + Math.sin(th) * raioEm(th), fase: f, prof: k === 0,
        av: { pele: PELES[(k + f.idx) % PELES.length], cabelo: CABELOS[(k * 2 + f.idx) % CABELOS.length], estilo: ['curto', 'longo', 'coque', 'bone'][(k + f.idx) % 4], camisa: ROUPAS[(k * 3 + f.idx) % ROUPAS.length], calca: ['#2f3b6b', '#5a3b2a', '#333333'][k % 3] } });
    }
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
      f.itens.push({ id: `${f.id}-s${SEMANA}-${f.itens.length}`, x: f.x0 + x + 0.5, y: y + 0.5, tipo });
    }
  }
  const LARG = x0;
  const todosLugares = fases.flatMap(f => f.lugares);
  const faseDeX = x => fases.find(f => x >= f.x0 && x < f.x0 + f.L) || fases[fases.length - 1];
  function tileEm(x, y) { const f = faseDeX(x), lx = Math.floor(x - f.x0), ly = Math.floor(y); if (lx < 0 || ly < 0 || lx >= f.L || ly >= ALT) return { f, t: T.grama, sol: 1 }; return { f, t: f.tile[ly * f.L + lx], sol: f.sol[ly * f.L + lx], v: f.var[ly * f.L + lx] }; }

  /* ---------- a casa do jogador: três cômodos e móveis feitos com os itens ---------- */
  const CW = 13, CD = 9;                                     // tamanho por dentro, em blocos
  const COMODOS = [{ nome: 'Sala', x0: 0, x1: 5, chao: '#e8c79a', parede: '#fde2b8' }, { nome: 'Quarto', x0: 5, x1: 9, chao: '#f7c6d9', parede: '#f9d3e3' }, { nome: 'Cozinha', x0: 9, x1: 13, chao: '#cfe8f5', parede: '#d6f0e0' }];
  const SAIDA = { x: 2.5, y: CD - 0.5 };
  /* custo: itens do inventário; requer: móvel que precisa ter sido construído antes (um objeto libera o outro) */
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
    robo: { nome: 'Robozinho', ic: '🤖', w: 1, d: 1, custo: { diamante: 2, chave: 1 }, requer: 'luminaria', acao: 'responder ao robô', des: (x, y) => { const z = Math.abs(Math.sin(agora / 400)) * 0.06; caixa(x + 0.3, y + 0.3, z, 0.4, 0.4, 0.45, '#a8e6b8'); caixa(x + 0.32, y + 0.32, z + 0.45, 0.36, 0.36, 0.3, '#c9efd9'); naFace('y', x + 0.32, y + 0.32, 0.36, 0.36, 0.07, 0, 0.07, z + 0.6, 0.07, '#2b6cb0'); naFace('y', x + 0.32, y + 0.32, 0.36, 0.36, 0.22, 0, 0.07, z + 0.6, 0.07, '#2b6cb0'); caixa(x + 0.47, y + 0.47, z + 0.75, 0.06, 0.06, 0.2, '#888888', { blocos: false }); caixa(x + 0.44, y + 0.44, z + 0.95, 0.12, 0.12, 0.08, '#e0564a', { blocos: false }); } },
    telescopio: { nome: 'Telescópio', ic: '🔭', w: 1, d: 1, custo: { diamante: 3, estrela: 2 }, requer: 'robo', acao: 'olhar o mapa', des: (x, y) => { caixa(x + 0.45, y + 0.45, 0, 0.1, 0.1, 0.95, '#555555', { blocos: false }); caixa(x + 0.3, y + 0.35, 0.05, 0.4, 0.3, 0.05, '#555555', { blocos: false }); caixa(x + 0.38, y + 0.1, 0.95, 0.24, 0.8, 0.24, '#3f8fe0'); caixa(x + 0.35, y + 0.05, 0.92, 0.3, 0.12, 0.3, '#ffd58a'); } },
    arcade: { nome: 'Fliperama', ic: '🕹️', w: 1, d: 1, custo: { chave: 2, diamante: 2 }, requer: 'robo', acao: 'jogar', des: (x, y) => { caixa(x + 0.1, y + 0.15, 0, 0.8, 0.7, 1.75, '#9a6bd6'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.12, 0, 0.56, 1.0, 0.5, '#1b2531'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.25 + ((agora / 300 | 0) % 3) * 0.1, 0, 0.08, 1.2, 0.08, '#a8e6b8'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.2, 0, 0.1, 0.75, 0.1, '#e0564a'); naFace('y', x + 0.1, y + 0.15, 0.8, 0.7, 0.45, 0, 0.1, 0.75, 0.1, '#ffd58a'); } }
  };
  const casaNova = () => ({ cor: '#f7a8c4', guardados: {}, feitos: {}, visitou: false, dormiu: '',
    moveis: [{ id: 'estante', x: 0, y: 1 }, { id: 'computador', x: 2, y: 0 }, { id: 'bau', x: 4, y: 0 }, { id: 'espelho', x: 6, y: 0 }, { id: 'cama', x: 8, y: 0 }, { id: 'bancada', x: 10, y: 0 }] });

  /* ---------- estado salvo ---------- */
  const CHAVE = 'mundo-site-v1';
  const AV_PADRAO = { pele: PELES[1], cabelo: CABELOS[0], estilo: 'curto', camisa: '#3f8fe0', calca: '#2f3b6b', sapato: '#5a3b2a' };
  const novo = () => ({ pontos: 0, acertos: 0, erros: 0, itens: {}, cont: {}, inv: {}, falas: {}, resp: {}, feitos: {}, abertos: {}, concluidas: {}, dicas: {}, av: Object.assign({}, AV_PADRAO), casa: casaNova(), pet: null, hab: {}, amizade: {}, diaNpc: {}, recompensas: {}, gostos: {}, x: fases[0].x0 + 3.5, y: MEIO });
  let S = novo();
  try { const v = JSON.parse(localStorage.getItem(CHAVE)); if (v && typeof v.pontos === 'number') S = Object.assign(novo(), v); } catch (e) {}
  S.av = Object.assign({}, AV_PADRAO, S.av);
  S.casa = Object.assign(casaNova(), S.casa);
  // versão anterior (casas em fileiras): a posição salva não serve mais, e os itens antigos contam para a missão
  if (!S.cont || !Object.keys(S.cont).length) for (const k of Object.keys(S.itens || {})) { const fid = k.split('-')[0]; S.cont[fid] = (S.cont[fid] || 0) + 1; }
  for (const k of Object.keys(S.itens)) if (!k.includes('-s' + SEMANA + '-')) delete S.itens[k];   // só os desta semana
  if (S.versao !== 2) { S.x = fases[0].x0 + 3.5; S.y = MEIO; S.versao = 2; }
  function salvar(avisa) { try { localStorage.setItem(CHAVE, JSON.stringify(S)); if (avisa) aviso('💾 Progresso salvo!'); } catch (e) { if (avisa) aviso('Não deu para salvar neste navegador.'); } }

  /* ---------- missões ---------- */
  function missoes(f) {
    const jog = f.lugares.filter(l => S.feitos[l.id]).length;
    const perg = Object.keys(S.resp).filter(id => f.perguntas.some(p => p.id === id)).length;
    const falas = f.npcs.filter(n => S.falas[n.id]).length;
    const verbo = f.id === 'escola' ? 'Visitar' : f.id === 'lab' ? 'Experimentar' : 'Jogar';
    const coisa = f.id === 'escola' ? 'páginas' : f.id === 'lab' ? 'simuladores' : 'jogos';
    return [
      { nome: `${verbo} ${f.metaJogar} ${coisa}`, n: jog, meta: f.metaJogar },
      { nome: `Responder ${f.metaPerg} perguntas`, n: perg, meta: f.metaPerg },
      { nome: `Coletar ${f.nItens} itens`, n: S.cont[f.id] || 0, meta: f.nItens },
      { nome: `Conversar com ${f.nNpc} moradores`, n: falas, meta: f.nNpc }
    ].map(m => Object.assign(m, { ok: m.n >= m.meta }));
  }
  const concluida = f => missoes(f).every(m => m.ok);
  const liberada = f => f.idx === 0 || concluida(fases[f.idx - 1]);
  function pontos(n, txt) { S.pontos += n; if (txt) aviso(`+${n} ⭐ ${txt}`); hud(); }
  function confereFases() {
    for (const f of fases) if (concluida(f) && !S.concluidas[f.id]) {
      S.concluidas[f.id] = true;
      pontos(100, `Fase concluída: ${f.nome}!` + (f.idx < fases.length - 1 ? ` O caminho para ${fases[f.idx + 1].nome} está aberto.` : ''));
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
  }

  /* ---------- projeção isométrica ---------- */
  const TW = 64, TH = 32, BH = 30;          // largura e altura do losango do chão; altura de um bloco
  const iso = (x, y, z = 0) => [(x - y) * TW / 2, (x + y) * TH / 2 - z * BH];
  const cv = $('#jogo'), ctxJogo = cv.getContext('2d');
  let ctx = ctxJogo;
  let W = 0, HH = 0, zoom = 1, dpr = 1;
  function ajusta() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
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
  const COR_CHAO = { [T.grama]: '#a6e08f', [T.praca]: '#fdf1c7', [T.agua]: '#8fd8ea', [T.areia]: '#f8e7b5' };

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
      naFace(face, bx, by, ww, dd, 0.35, 0, 0.75, hh * 0.45, Math.min(0.6, hh * 0.35), mol); naFace(face, bx, by, ww, dd, 0.42, 0, 0.61, hh * 0.45 + 0.06, Math.min(0.48, hh * 0.3), vid);
      const portaAqui = (face === 'y' && c.ladoPorta === 'y+') || (face === 'x' && c.ladoPorta === 'x+');
      if (portaAqui) naFace(face, bx, by, ww, dd, (face === 'y' ? ww : dd) - 1.25, 0, 0.6, 0, 1.0, feito ? '#9a6a3a' : '#a5a5a0');
      else naFace(face, bx, by, ww, dd, (face === 'y' ? ww : dd) - 1.25, 0, 0.75, hh * 0.45, Math.min(0.6, hh * 0.35), vid);
    }
    // placa flutuante com o ícone (e o ✅ quando concluída)
    const topoZ = tipo === 'sim' ? 2.9 : tipo === '3d' ? 1.8 + h : tipo === 'pagina' ? h + 1.9 : h + 1.4;
    const [sx, sy] = iso(x + w / 2, y + d / 2, topoZ + 0.6 + Math.sin(agora / 500 + x) * 0.06);
    ctx.fillStyle = feito ? '#ffffff' : 'rgba(255,255,255,.75)'; ctx.strokeStyle = feito ? escuro(c.cor, 0.35) : '#9a9a95'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.globalAlpha = feito ? 1 : 0.6; ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(c.lugar.icone, sx, sy - 1); ctx.globalAlpha = 1;
    if (feito) { ctx.font = '14px system-ui, sans-serif'; ctx.fillText('✅', sx + 16, sy - 16); }
    if (perto) rotulo(c.lugar.titulo, sx, sy - 34);
  }
  /* a casa do jogador: maior, com telhado em degraus, floreiras e fumaça na chaminé */
  function desenhaMinhaCasa(c, perto) {
    const x = c.gx, y = c.y, w = c.w, d = c.d, base = S.casa.cor, telhado = escuro(base, 0.3);
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
    naFace('y', bx, by, ww, dd, ww / 2 - 0.4, 0, 0.8, 0, 1.4, '#ffffff'); naFace('y', bx, by, ww, dd, ww / 2 - 0.33, 0, 0.66, 0, 1.33, '#9a6a3a');
    naFace('y', bx, by, ww, dd, ww / 2 + 0.15, 0, 0.08, 0.65, 0.08, '#ffd58a');
    const [sx, sy] = iso(x + w / 2, y + d / 2, 4.3 + Math.sin(agora / 500) * 0.06);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = escuro(base, 0.35); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(sx - 18, sy - 18, 36, 34, 9); ctx.fill(); ctx.stroke();
    ctx.font = '20px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🏠', sx, sy - 1);
    if (perto) rotulo('Sua casa', sx, sy - 34, '#fff7e8');
  }
  function sombra(x, y, r) { const [sx, sy] = iso(x, y); ctx.fillStyle = 'rgba(40,60,40,.16)'; ctx.beginPath(); ctx.ellipse(sx, sy + 2, r * TW / 2.2, r * TH / 2.2, 0, 0, Math.PI * 2); ctx.fill(); }
  function rotulo(t, sx, sy, cor = '#ffffff', tinta = '#1d2a1f') {
    ctx.font = '600 13px Lexend, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const tw = Math.min(ctx.measureText(t).width, 260) + 18;
    ctx.fillStyle = cor; ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(sx - tw / 2, sy - 12, tw, 24, 12); ctx.fill(); ctx.stroke();
    ctx.fillStyle = tinta; ctx.fillText(t.length > 38 ? t.slice(0, 37) + '…' : t, sx, sy + 1, 250);
  }
  function desenhaArvore(a) {
    sombra(a.x + 0.5, a.y + 0.5, 0.8);
    caixa(a.x + 0.38, a.y + 0.38, 0, 0.24, 0.24, 1, '#a0703f', { blocos: false });
    const folha = ['#6fcf7f', '#8fdc78', '#f5a9c8'][a.tipo];   // uma em cada três é uma cerejeira rosa
    caixa(a.x + 0.05, a.y + 0.05, 1, 0.9, 0.9, 0.8, folha);
    if (a.alt > 1) caixa(a.x + 0.22, a.y + 0.22, 1.8, 0.56, 0.56, 0.5, claro(folha, 0.08));
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
  function desenhaPortao(f) {
    const aberto = liberada(fases[f.idx + 1]);
    const { x, y } = f.portao;
    caixa(x - 0.2, y - 1.6, 0, 0.4, 0.4, 2.2, '#f2e48a'); caixa(x - 0.2, y + 1.2, 0, 0.4, 0.4, 2.2, '#f2e48a');
    caixa(x - 0.25, y - 1.65, 2.2, 0.5, 3.3, 0.35, aberto ? '#a8e6b8' : '#f7a8c4');
    if (!aberto) for (let k = 0; k < 4; k++) caixa(x - 0.05, y - 1.1 + k * 0.6, 0, 0.1, 0.12, 1.8, '#e0564a', { blocos: false });
    const [sx, sy] = iso(x, y, 3.2);
    ctx.font = '22px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(aberto ? '🚪' : '🔒', sx, sy);
  }
  function desenhaItem(it) {
    const [ic] = ITENS[it.tipo];
    sombra(it.x, it.y, 0.35);
    const [sx, sy] = iso(it.x, it.y, 0.55 + Math.sin(agora / 300 + it.x * 3) * 0.12);
    if (it.tipo === 'diamante') { ctx.fillStyle = 'rgba(160,230,255,.35)'; ctx.beginPath(); ctx.arc(sx, sy, 17, 0, Math.PI * 2); ctx.fill(); }
    ctx.font = '24px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(ic, sx, sy);
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
  }

  /* ---------- jogador e movimento ---------- */
  const P = { x: S.x, y: S.y, dir: 'y+', andando: false, passo: 0, pulo: 0, vpulo: 0 };
  const teclas = {};
  let correndo = false, dialogoAberto = false, janelaAberta = null, destino = null, agora = 0, faseAtual = null;
  let dentro = false, colocando = null, mouse = null;   // dentro da casa; móvel sendo colocado; ponto do mouse no mapa

  function livre(x, y) {
    if (dentro) return livreCasa(x, y);
    const r = 0.22;
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) {
      const qx = x + dx, qy = y + dy;
      if (qx < 0.2 || qy < 0.2 || qx > LARG - 0.2 || qy > ALT - 0.2) return false;
      if (tileEm(qx, qy).sol) return false;
    }
    for (const g of fases) if (g.portao && !liberada(fases[g.idx + 1]) && Math.abs(x - g.portao.x) < 0.45 && Math.abs(y - g.portao.y) < 2) return false;
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
    if (dentro) { if (P.andando && my > 0 && P.y > CD - 0.55 && P.x > 1.8 && P.x < 3.4) saiCasa(); return; }   // pisou no tapete da porta
    // itens: pega ao passar por cima (o diamante pede uma pergunta antes)
    const f = faseDeX(P.x);
    for (const it of f.itens) if (!S.itens[it.id] && Math.hypot(it.x - P.x, it.y - P.y) < 0.55) { pegaItem(it, f); break; }
    if (f !== faseAtual) { faseAtual = f; hud(); if (agora > 1000) aviso(`${f.icone} ${f.nome}`); }
  }
  function alvoPerto() {
    if (dentro) return alvoCasa();
    const f = faseDeX(P.x);
    let melhor = null, dm = 1.5;
    const tenta = (x, y, ob) => { const d = Math.hypot(x - P.x, y - P.y); if (d < dm) { dm = d; melhor = ob; } };
    for (const c of f.casas) tenta(c.porta.x, c.porta.y, { tipo: 'casa', casa: c });
    if (f.minhaCasa) tenta(f.minhaCasa.porta.x, f.minhaCasa.porta.y, { tipo: 'minhacasa' });
    if (S.pet && !S.pet.dorme) tenta(PET.x, PET.y + 0.3, { tipo: 'pet' });
    for (const n of f.npcs) tenta(n.x, n.y, { tipo: 'npc', npc: n });
    tenta(f.placa.x, f.placa.y + 0.8, { tipo: 'placa', fase: f });
    if (f.portao) tenta(f.portao.x - 0.8, f.portao.y, { tipo: 'portao', fase: f });
    return melhor;
  }

  /* ---------- dentro da casa ---------- */
  const ocupado = (tx, ty) => S.casa.moveis.find(m => { const M = MOVEIS[m.id]; return !M.chao && tx >= m.x && tx < m.x + M.w && ty >= m.y && ty < m.y + M.d; });
  function livreCasa(x, y) {
    const r = 0.22;
    if (x - r < 0.05 || y - r < 0.05 || x + r > CW - 0.05 || y + r > CD - 0.02) return false;
    for (const px of [5, 9]) if (x - r < px + 0.1 && x + r > px - 0.1 && (y - r < 3 || y + r > 6)) return false;   // paredes entre os cômodos, com passagem no meio
    for (const [dx, dy] of [[-r, -r], [r, -r], [-r, r], [r, r]]) if (ocupado(Math.floor(x + dx), Math.floor(y + dy))) return false;
    return true;
  }
  /* as passagens entre os cômodos e o tapete da porta ficam sempre livres */
  const reservado = (tx, ty) => ([4, 5, 8, 9].includes(tx) && ty >= 3 && ty <= 5) || (tx === 2 && ty >= CD - 2);
  function podeColocar(id, tx, ty) {
    const M = MOVEIS[id];
    if ([5, 9].some(px => tx < px && tx + M.w > px)) return false;   // não atravessa a parede
    for (let j = ty; j < ty + M.d; j++) for (let i = tx; i < tx + M.w; i++) {
      if (i < 0 || j < 0 || i >= CW || j >= CD || reservado(i, j)) return false;
      if (M.chao ? S.casa.moveis.some(m => MOVEIS[m.id].chao && i >= m.x && i < m.x + MOVEIS[m.id].w && j >= m.y && j < m.y + MOVEIS[m.id].d) : ocupado(i, j)) return false;
      if (!M.chao && Math.abs(i + 0.5 - P.x) < 0.72 && Math.abs(j + 0.5 - P.y) < 0.72) return false;   // não em cima de você
    }
    return true;
  }
  function alvoCasa() {
    let melhor = null, dm = 1.1;
    for (const m of S.casa.moveis) {
      const M = MOVEIS[m.id]; if (M.chao) continue;
      const qx = Math.max(m.x, Math.min(m.x + M.w, P.x)), qy = Math.max(m.y, Math.min(m.y + M.d, P.y)), d = Math.hypot(qx - P.x, qy - P.y);
      if (d < dm) { dm = d; melhor = { tipo: 'movel', movel: m }; }
    }
    if (Math.hypot(SAIDA.x - P.x, SAIDA.y - P.y) < Math.min(1.3, dm + 0.3)) melhor = { tipo: 'saida' };
    if (S.pet) { const c = S.pet.dorme ? caminha() : PET, d = Math.hypot(c.x - P.x, c.y - P.y); if (d < Math.min(0.9, dm)) melhor = { tipo: 'pet' }; }
    return melhor;
  }
  const posMundo = () => dentro ? { x: fases[0].minhaCasa.porta.x, y: fases[0].minhaCasa.porta.y + 0.4 } : { x: P.x, y: P.y };
  function guardaPos() { const p = posMundo(); S.x = p.x; S.y = p.y; }
  function entraCasa() {
    fechaJanela(); destino = null; dentro = true; mouse = null;
    P.x = SAIDA.x; P.y = CD - 1.4; P.dir = 'y-'; cam.ok = false; petPerto(); hud();
    if (!S.casa.visitou) {
      S.casa.visitou = true; salvar();
      dialogo('🏠', 'Sua casa', `<p>Esta casa é sua! Tem sala, quarto e cozinha, e você decora do seu jeito.</p><p>Na <strong>bancada 🛠️</strong> da cozinha, os itens que você coleta pela vila viram móveis. Alguns móveis liberam outros: o tapete libera a poltrona, a luminária libera o robozinho...</p><p class="muted">Experimente tudo: a cama dá pontos uma vez por dia, o espelho muda o seu visual, o baú mostra o inventário e o computador lista as atividades que faltam.</p>`, [{ txt: 'Vamos decorar!', classe: 'principal', fn: fechaDialogo }]);
    } else aviso('🏠 Sua casa');
  }
  function saiCasa() {
    const p = posMundo();
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
    const guardar = M.fixo ? [] : [{ txt: 'Guardar este móvel', fn: () => { fechaDialogo(); guardaMovel(m); } }];
    const janela = { bancada: 'casa', estante: 'biblioteca', bau: 'inventario', espelho: 'avatar', quadro: 'inventario', telescopio: 'mapa' }[m.id];
    if (janela) return abreJanela(janela);
    if (m.id === 'luminaria') { m.on = !m.on; salvar(); return aviso(m.on ? '💡 Luz acesa' : 'Luz apagada'); }
    if (m.id === 'robo') return pergunta('Robozinho', '🤖', sorteiaPergunta(faseMaisAlta()));
    if (m.id === 'cama') {
      const hoje = new Date().toDateString();
      if (S.casa.dormiu !== hoje) { S.casa.dormiu = hoje; pontos(10); salvar(); return dialogo('🛏️', 'Boa noite!', '<p>Você descansou e acordou cheio de energia: <strong>+10 ⭐</strong>.</p><p class="muted">A cama dá pontos uma vez por dia. Volte amanhã!</p>', [fecha]); }
      return dialogo('🛏️', 'Cama', '<p>Você já descansou hoje. Volte amanhã para ganhar mais 10 ⭐.</p>', [fecha]);
    }
    if (m.id === 'computador') {
      const lista = faltando(false).slice(0, 6);
      return dialogo('💻', 'Computador', lista.length ? '<p>Atividades que ainda faltam nas fases abertas. Abra uma e a casa dela ganha cor:</p>' : '<p>Você já fez todas as atividades das fases abertas! 🎉 Cumpra as missões para abrir a próxima fase.</p>',
        lista.map(l => ({ txt: `${l.icone} ${l.titulo}`, href: l.url, fn: () => abriu(l) })).concat([fecha]));
    }
    if (m.id === 'arcade') {
      const js = faltando(true), l = js.length ? js[Math.floor(Math.random() * js.length)] : jogaveis.length ? lugarRec(jogaveis[Math.floor(Math.random() * jogaveis.length)]) : null;
      if (!l) return dialogo('🕹️', 'Fliperama', '<p>Nenhum jogo por aqui ainda.</p>', [fecha]);
      return dialogo('🕹️', 'Fliperama', `<p>O fliperama sorteou: <strong>${esc(l.titulo)}</strong>.</p><p class="muted">${esc(l.resumo)}</p>`, [{ txt: 'Jogar', href: l.url, classe: 'principal', fn: () => abriu(l) }, { txt: 'Sortear outro', fn: () => usaMovel(m) }, fecha, ...guardar]);
    }
    if (m.id === 'poltrona') {
      const lidas = Object.keys(S.dicas), i = lidas.length ? lidas[Math.floor(Math.random() * lidas.length)] : Math.floor(Math.random() * DICAS.length);
      return dialogo('🛋️', 'Hora da leitura', `<div class="dica-livro"><p>${DICAS[i]}</p></div><p class="muted">Na poltrona você relê as dicas dos livros que já pegou.</p>`, [fecha, ...guardar]);
    }
    if (m.id === 'geladeira') return dialogo('🧊', 'Geladeira', `<p>Você tem <strong>${S.inv.maca || 0} 🍎</strong> guardadas.</p><p class="muted">As maçãs são a comida preferida do seu pet: abra o pet com o botão 🐾 ou a tecla P.</p>`, [fecha, ...guardar]);
    if (m.id === 'aquario') return dialogo('🐠', 'Aquário', '<p>Os peixinhos entram na toca um atrás do outro: o primeiro que entra é o primeiro que sai. Isso é uma <strong>fila</strong>, uma estrutura de dados!</p>', [fecha, ...guardar]);
    dialogo(M.ic, M.nome, `<p>${m.id === 'vaso' || m.id === 'planta' ? 'Você regou a planta. Ela está linda! 🌱' : 'Ficou lindo aqui!'}</p>`, [fecha, ...guardar]);
  }
  /* oficina: construir móveis com os itens */
  const podeConstruir = id => { const M = MOVEIS[id]; return !!M.custo && (!M.requer || !!S.casa.feitos[M.requer]) && Object.entries(M.custo).every(([k, n]) => (S.inv[k] || 0) >= n); };
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
      else p[k] = Math.max(0, p[k] - cai * h * (p.dorme ? 0.5 : 1));
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
        if (p.acessorio === 'oculos') naFace(fc, hx, hy, s, s, 0.02, 0, 0.28, hz + 0.13, 0.1, 'rgba(20,20,40,.85)');
      }
      // orelhas
      const o = ax ? [[hx + 0.1, hy + 0.02], [hx + 0.1, hy + s - 0.09]] : [[hx + 0.02, hy + 0.1], [hx + s - 0.09, hy + 0.1]];
      if (p.especie === 'gato') o.forEach(([a, b]) => caixa(a, b, hz + s, 0.07, 0.07, 0.1, c, sem));
      else if (p.especie === 'coelho') o.forEach(([a, b]) => caixa(a, b, hz + s, 0.07, 0.07, 0.34, cl, sem));
      else if (p.especie === 'cachorro') (ax ? [[hx + 0.1, hy - 0.05], [hx + 0.1, hy + s - 0.01]] : [[hx - 0.05, hy + 0.1], [hx + s - 0.01, hy + 0.1]]).forEach(([a, b]) => caixa(a, b, hz + 0.08, 0.06 + (ax ? 0.06 : 0), 0.06 + (ax ? 0 : 0.06), 0.22, esc2, sem));
      else o.forEach(([a, b]) => caixa(a, b, hz + s, 0.06, 0.06, 0.12, '#ffd58a', sem));
      if (p.acessorio === 'laco') caixa(hx + 0.08, hy + 0.08, hz + s, 0.16, 0.16, 0.07, '#e0564a', sem);
      if (p.acessorio === 'chapeu') { caixa(hx - 0.03, hy - 0.03, hz + s, s + 0.06, s + 0.06, 0.03, '#3f8fe0', sem); caixa(hx + 0.06, hy + 0.06, hz + s + 0.03, 0.2, 0.2, 0.14, '#3f8fe0', sem); }
      if (p.acessorio === 'coroa') caixa(hx + 0.05, hy + 0.05, hz + s, 0.22, 0.22, 0.1, '#ffd58a', sem);
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
      ['estrela', '⭐ Petisco especial', (S.inv.estrela || 0) ? `você tem ${S.inv.estrela}` : 'precisa de uma estrela', !(S.inv.estrela || 0) || p.dorme],
      ['dormir', p.dorme ? '☀️ Acordar' : '😴 Soneca na sua casa', p.dorme ? 'ele está recuperando energia' : 'recupera a energia', false]
    ];
    const lib = ACESSORIOS.filter(a => p.nivel >= a[2]);
    el.innerHTML = `<div class="pet-topo"><canvas id="pet-preview" width="160" height="150" aria-label="${esc(p.nome)}" role="img"></canvas>
      <div><h3 style="margin-top:0">${ic} ${esc(p.nome)} <small class="muted">· nível ${p.nivel}${p.dorme ? ' · dormindo 💤' : ''}</small></h3>
      <div class="barra pet-xp" title="Experiência"><span style="width:${Math.round(100 * p.xp / (20 * p.nivel))}%"></span></div>
      ${NECESSIDADES.map(([k, ic2, nome]) => `<div class="nec"><span>${ic2} ${nome}</span><div class="barra ${p[k] < 30 ? 'baixa' : ''}"><span style="width:${Math.round(p[k])}%"></span></div></div>`).join('')}</div></div>
      <div class="pet-acoes">${acoes.map(([k, t, sub, off]) => `<button type="button" class="pet-b" data-acao="${k}" ${off ? 'disabled' : ''}><strong>${t}</strong><small>${sub}</small></button>`).join('')}</div>
      <div class="av-grupo"><h3>Acessório</h3><div class="av-cores">${ACESSORIOS.map(([k, n, nv]) => p.nivel >= nv ? `<button type="button" data-acess="${k}" aria-pressed="${p.acessorio === k}">${n}</button>` : `<button type="button" disabled title="Nível ${nv}">🔒 ${n} (nível ${nv})</button>`).join('')}</div></div>
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
    else if (k === 'dormir') { p.dorme = !p.dorme; if (!p.dorme) petPerto(); salvar(); aviso(p.dorme ? `😴 ${p.nome} foi dormir no quarto da sua casa.` : `☀️ ${p.nome} acordou!`); }
    else if (k === 'quiz') {
      fechaJanela();
      return pergunta(`Quiz com ${p.nome}`, ESPECIES[p.especie][0], sorteiaPergunta(faseMaisAlta()), certo => { mais('alegria', certo ? 30 : 10); cuidou(certo ? 5 : 1); });
    }
    janelaPet();
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
    for (const a of [0.6, 6.9, 11.9]) { naFace('y', 0, -0.25, CW, 0.25, a, 0, 1, 1, 0.9, '#ffffff'); naFace('y', 0, -0.25, CW, 0.25, a + 0.08, 0, 0.84, 1.07, 0.76, '#bfe9ff'); naFace('y', 0, -0.25, CW, 0.25, a + 0.47, 0, 0.06, 1.07, 0.76, '#ffffff'); }
    naFace('x', -0.25, 0, 0.25, CD, 4.5, 0, 1.2, 1, 0.9, '#ffffff'); naFace('x', -0.25, 0, 0.25, CD, 4.58, 0, 1.04, 1.07, 0.76, '#bfe9ff');
    for (const r of COMODOS) { const [sx, sy] = iso((r.x0 + r.x1) / 2, -0.25, 2.75); rotulo(r.nome, sx, sy, '#fff7e8'); }
    // tapete da porta
    caixa(2.1, CD - 0.9, 0, 0.8, 0.8, 0.03, '#e0564a', { blocos: false });
    { const [sx, sy] = iso(SAIDA.x, SAIDA.y, 0.1); ctx.font = '16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🚪', sx, sy); }
    // tapetes primeiro (ficam no chão), depois o resto pela profundidade
    const lista = [];
    for (const m of S.casa.moveis) { const M = MOVEIS[m.id]; if (M.chao) M.des(m.x, m.y, m); else lista.push({ k: m.x + m.y + (M.w + M.d) / 2, d: () => M.des(m.x, m.y, m) }); }
    for (const px of [5, 9]) for (let j = 0; j < CD; j++) if (j < 3 || j >= 6) lista.push({ k: px + j + 0.6, d: () => caixa(px - 0.1, j, 0, 0.2, 1, 0.9, '#fff7e8', { blocos: false }) });
    if (colocando) {
      const [tx, ty] = lugarColocar(), ok = podeColocar(colocando, tx, ty), M = MOVEIS[colocando];
      const pts = [iso(tx, ty), iso(tx + M.w, ty), iso(tx + M.w, ty + M.d), iso(tx, ty + M.d)];
      ctx.fillStyle = ok ? 'rgba(75,178,89,.3)' : 'rgba(224,86,74,.3)'; ctx.strokeStyle = ok ? '#4bb259' : '#e0564a'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); ctx.fill(); ctx.stroke();
      lista.push({ k: tx + ty + (M.w + M.d) / 2 + 0.01, d: () => { ctx.globalAlpha = 0.6; M.des(tx, ty, {}); ctx.globalAlpha = 1; } });
    }
    lista.push({ k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) });
    if (S.pet) { const c = S.pet.dorme ? caminha() : PET; lista.push({ k: c.x + c.y - (S.pet.dorme ? 0.6 : 0), d: () => desenhaPet(c.x, c.y, S.pet, { dir: PET.dir, andando: PET.andando, passo: PET.passo, dorme: S.pet.dorme }) }); }
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(80,60,90,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    const alvo = !dialogoAberto && !colocando && alvoCasa();
    if (alvo) {
      const t = alvo.tipo === 'saida' ? 'E · sair de casa' : alvo.tipo === 'pet' ? `E · cuidar de ${S.pet.nome}` : `E · ${MOVEIS[alvo.movel.id].acao || 'ver'}`;
      const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(t, sx, sy - 10, '#1d2a1f', '#ffffff');
    }
    miniCasa();
  }
  function miniCasa() {
    miniFase = null; $('#mini-nome').textContent = 'Sua casa';
    const s = Math.min(280 / CW, 180 / CD), ox = (300 - CW * s) / 2, oy = (200 - CD * s) / 2;
    mctx.fillStyle = '#1b2531'; mctx.fillRect(0, 0, 300, 200);
    for (const r of COMODOS) { mctx.fillStyle = r.chao; mctx.fillRect(ox + r.x0 * s, oy, (r.x1 - r.x0) * s, CD * s); }
    mctx.fillStyle = '#fff7e8'; for (const px of [5, 9]) { mctx.fillRect(ox + px * s - 1.5, oy, 3, 3 * s); mctx.fillRect(ox + px * s - 1.5, oy + 6 * s, 3, 3 * s); }
    for (const m of S.casa.moveis) { const M = MOVEIS[m.id]; mctx.fillStyle = M.chao ? 'rgba(199,180,242,.85)' : '#8a6a4a'; mctx.fillRect(ox + m.x * s + 1, oy + m.y * s + 1, M.w * s - 2, M.d * s - 2); }
    mctx.fillStyle = '#e0564a'; mctx.fillRect(ox + 2 * s, oy + (CD - 0.35) * s, s, 0.35 * s);
    mctx.fillStyle = '#3f8fe0'; mctx.beginPath(); mctx.arc(ox + P.x * s, oy + P.y * s, 5, 0, Math.PI * 2); mctx.fill();
  }

  /* ---------- quadro ---------- */
  let t0 = performance.now();
  function quadro(now) {
    const dt = Math.min(0.05, (now - t0) / 1000); t0 = now; agora = now;
    if (!dialogoAberto && !janelaAberta) move(dt);
    movePet(dt);
    // moradores passeiam devagar pelo anel
    for (const f of fases) for (const n of f.npcs) {
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
    if (dentro) { desenhaInterior(); requestAnimationFrame(quadro); return; }
    const ceu = ctx.createLinearGradient(0, cam.y, 0, cam.y + vh); ceu.addColorStop(0, '#cdeffa'); ceu.addColorStop(1, '#e8f7e4');
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
    for (const f of visiveisFases()) for (const fl of f.flores) { const [sx, sy] = iso(fl.x, fl.y); if (sx > cam.x - 10 && sx < cam.x + vw + 10 && sy > cam.y - 10 && sy < cam.y + vh + 10) { ctx.fillStyle = fl.c; ctx.fillRect(sx - 3, sy - 6, 6, 6); ctx.fillStyle = '#4f9a4b'; ctx.fillRect(sx - 1, sy, 2, 4); } }
    // objetos ordenados pela profundidade (x + y)
    const lista = [], naTela = (x, y, m = 160) => { const [sx, sy] = iso(x, y); return sx > cam.x - m && sx < cam.x + vw + m && sy > cam.y - m && sy < cam.y + vh + m * 2; };
    const alvo = !dialogoAberto && alvoPerto();
    for (const f of visiveisFases()) {
      if (f.minhaCasa) { const c = f.minhaCasa; lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaMinhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) }); }
      for (const c of f.casas) if (naTela(c.gx + 1.5, c.y + 1.5, 220)) lista.push({ k: c.gx + c.y + c.w / 2 + c.d / 2 + 0.6, d: () => desenhaCasa(c, Math.hypot(c.porta.x - P.x, c.porta.y - P.y) < 4) });
      for (const a of f.arvores) if (naTela(a.x, a.y)) lista.push({ k: a.x + a.y + 1, d: () => desenhaArvore(a) });
      lista.push({ k: f.centro.x + f.centro.y + 0.5, d: () => desenhaMarco(f) });
      lista.push({ k: f.placa.x + f.placa.y, d: () => desenhaPlaca(f) });
      if (f.portao) lista.push({ k: f.portao.x + f.portao.y + 1.5, d: () => desenhaPortao(f) });
      for (const n of f.npcs) if (naTela(n.x, n.y)) lista.push({ k: n.x + n.y, d: () => { desenhaPessoa(n.x, n.y, n.av, n); const [sx, sy] = iso(n.x, n.y, 1.75); if (!S.falas[n.id]) balao(sx, sy - 6, n.prof ? '👩‍🏫' : '💬'); if (Math.hypot(n.x - P.x, n.y - P.y) < 4) rotulo(n.nome + (coracoes(n) ? ` ❤️${coracoes(n)}` : ''), sx, sy - (S.falas[n.id] ? 0 : 48), '#fff7e8'); } });
      for (const it of f.itens) if (!S.itens[it.id] && naTela(it.x, it.y)) lista.push({ k: it.x + it.y, d: () => desenhaItem(it) });
    }
    lista.push({ k: P.x + P.y, d: () => desenhaPessoa(P.x, P.y, S.av, P) });
    if (S.pet && !S.pet.dorme) lista.push({ k: PET.x + PET.y, d: () => desenhaPet(PET.x, PET.y, S.pet, PET) });
    lista.sort((a, b) => a.k - b.k).forEach(o => o.d());
    if (destino) { const [sx, sy] = iso(destino.x, destino.y); ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(sx, sy, 12, 6, 0, 0, Math.PI * 2); ctx.stroke(); }
    if (alvo) {
      const t = alvo.tipo === 'minhacasa' ? 'E · entrar em casa' : alvo.tipo === 'pet' ? `E · cuidar de ${S.pet.nome}` : alvo.tipo === 'casa' ? (alvo.casa.lugar.tipo === 'pagina' ? 'E · visitar' : alvo.casa.lugar.tipo === 'sim' ? 'E · experimentar' : 'E · jogar') : alvo.tipo === 'npc' ? 'E · conversar' : alvo.tipo === 'placa' ? 'E · ler a placa' : 'E · portão';
      const [sx, sy] = iso(P.x, P.y, 1.9 + P.pulo); rotulo(t, sx, sy - 10, '#1d2a1f', '#ffffff');
    }
    minimapa(faseDeX(P.x));
    requestAnimationFrame(quadro);
  }
  function visiveisFases() { const f = faseDeX(P.x); return [fases[f.idx - 1], f, fases[f.idx + 1]].filter(Boolean); }
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
    if (comCasas) for (const casa of f.casas) { c.fillStyle = S.feitos[casa.lugar.id] ? casa.cor : '#b9b9b4'; c.fillRect(ox + casa.x * s, oy + casa.y * s, casa.w * s, casa.d * s); }
  }
  function minimapa(f) {
    if (miniFase !== f || !miniCache) {
      miniFase = f; $('#mini-nome').textContent = f.nome;
      mS = Math.min(300 / f.L, 200 / ALT); mOx = (300 - f.L * mS) / 2; mOy = (200 - ALT * mS) / 2;
      miniCache = document.createElement('canvas'); miniCache.width = 300; miniCache.height = 200;
      const c = miniCache.getContext('2d'); c.fillStyle = '#1b2531'; c.fillRect(0, 0, 300, 200);
      mapaFase(c, f, mS, mOx, mOy, false);
    }
    mctx.drawImage(miniCache, 0, 0);
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
    $('#h-acertos').textContent = `${S.acertos}/${S.acertos + S.erros}`;
    $('#h-erros').textContent = S.erros;
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    $('#h-aprend').textContent = Math.round(100 * feitos / Math.max(1, todosLugares.length)) + '%';
    const f = faseDeX(P.x), ms = dentro ? missoesCasa() : missoes(f);
    $('#m-titulo').textContent = dentro ? '🏠 Sua casa' : `Fase ${f.idx + 1} — ${f.sub.split(' · ')[0]}`;
    $('#m-nome').textContent = dentro ? 'Sala · Quarto · Cozinha' : `${f.icone} ${f.nome}`;
    $('#m-lista').innerHTML = ms.map(m => `<li class="${m.ok ? 'ok' : ''}"><span class="q"></span><span>${esc(m.nome)}</span><span class="n">(${Math.min(m.n, m.meta)}/${m.meta})</span></li>`).join('');
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
  function ganhaAmizade(n, v) {
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
  function presente(n) {
    const dia = S.diaNpc[n.id] || (S.diaNpc[n.id] = {});
    if (dia.presente === hoje()) return dialogo('🎁', n.nome, `<p>${coracoesHtml(n)}</p><p>Você já me deu um presente hoje. Volte amanhã!</p>`, [{ txt: 'Tá bom', fn: fechaDialogo }]);
    const tem = GOSTOS.filter(k => S.inv[k] > 0);
    const dica = S.gostos[n.id] ? `<p class="muted">${esc(n.nome)} adora ${ITENS[favorito(n)][0]} ${ITENS[favorito(n)][1].toLowerCase()}.</p>` : '<p class="muted">Cada morador tem um presente preferido. Descubra qual é!</p>';
    if (!tem.length) return dialogo('🎁', 'Presente', `<p>Você não tem itens para dar. Pegue maçãs, livros, estrelas, diamantes e chaves pela vila.</p>${dica}`, [{ txt: 'Ok', fn: fechaDialogo }]);
    dialogo('🎁', `Presente para ${n.nome}`, `<p>O que você quer dar?</p>${dica}`, tem.map(k => ({ txt: `${ITENS[k][0]} ${ITENS[k][1]} (${S.inv[k]})`, fn: () => {
      S.inv[k]--; dia.presente = hoje();
      const ama = k === favorito(n);
      if (ama) S.gostos[n.id] = true;
      ganhaAmizade(n, ama ? 25 : 10); salvar();
      dialogo('🎁', n.nome, `<p>${coracoesHtml(n)}</p><p>${ama ? 'Eu amei! É o meu preferido! 😍' : 'Que legal, valeu pelo presente! 😊'}</p>`, [{ txt: 'De nada!', classe: 'principal', fn: fechaDialogo }]);
    } })).concat([{ txt: 'Agora não', fn: fechaDialogo }]));
  }

  /* ---------- diálogos ---------- */
  const D = { el: $('#dialogo'), ic: $('#d-ic'), nome: $('#d-nome'), texto: $('#d-texto'), op: $('#d-opcoes') };
  let dialogoNpc = null;
  function dialogo(ic, nome, html, opcoes) {
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
  function fechaDialogo() { dialogoAberto = false; dialogoNpc = null; D.el.hidden = true; for (const k in teclas) teclas[k] = false; cv.focus(); }
  $('#d-fechar').addEventListener('click', fechaDialogo);

  function abreCasa(c) {
    const l = c.lugar, feito = S.feitos[l.id];
    const verbo = l.tipo === 'pagina' ? 'Visitar' : l.tipo === 'sim' ? 'Experimentar' : 'Jogar';
    let status;
    if (feito) status = `<p class="muted">✅ Concluída${typeof feito === 'number' && l.rec && feito > 1 ? ` · melhor resultado: ${feito}%` : ''}. A casa já ganhou cor; pode jogar de novo quando quiser.</p>`;
    else if (l.rec) status = `<p class="muted">A casa está cinza: ela ganha cor quando você terminar uma rodada do jogo. A página abre em outra aba; quando acabar, volte para cá.</p>`;
    else status = `<p class="muted">A página abre em outra aba e a casa ganha cor.</p>`;
    dialogo(l.icone, l.titulo, `<p>${esc(l.resumo)}</p>${l.extra ? `<p class="muted">${esc(l.extra)}</p>` : ''}${status}`, [
      { txt: `${verbo} agora`, href: l.url, classe: 'principal', fn: () => abriu(l) },
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  function abriu(l) { S.abertos[l.id] = Date.now(); if (!l.rec && !S.feitos[l.id]) { S.feitos[l.id] = true; pontos(15, `${l.titulo}: a casa ganhou cor!`); confereFases(); } salvar(); fechaDialogo(); }
  /* pergunta da fase: primeiro as que a pessoa errou (revisão), depois as novas */
  function sorteiaPergunta(f) {
    const erradas = f.perguntas.filter(p => S.resp[p.id] === false), novas = f.perguntas.filter(p => !(p.id in S.resp));
    const lista = erradas.length && (Math.random() < 0.6 || !novas.length) ? erradas : novas.length ? novas : f.perguntas;
    return lista[Math.floor(Math.random() * lista.length)];
  }
  function pergunta(titulo, ic, p, aoResponder) {
    dialogo(ic, titulo, `<p>${p.enun}</p>`, p.alts.map((a, i) => ({ txt: a, fn: () => {
      if (D.op.dataset.respondida) return;
      D.op.dataset.respondida = '1';
      const certo = i === p.certa, novaResp = !(p.id in S.resp) || S.resp[p.id] === false;
      S.resp[p.id] = certo;
      ganhaHabilidade(p.eixos, certo ? 10 : 2);
      if (certo) { S.acertos++; pontos(novaResp ? 10 : 5, 'Acertou!'); } else { S.erros++; hud(); }
      [...D.op.children].forEach((b, j) => { b.disabled = true; if (j === p.certa) b.classList.add('certa'); else if (j === i) b.classList.add('errada'); });
      D.texto.innerHTML += `<p><strong>${certo ? '✅ Isso mesmo!' : '❌ Não foi dessa vez.'}</strong> ${p.coment || ''}</p>`;
      if (aoResponder) aoResponder(certo);
      const b = document.createElement('button'); b.type = 'button'; b.className = 'principal'; b.textContent = 'Continuar';
      b.addEventListener('click', fechaDialogo); D.op.appendChild(b); b.focus();
      confereFases(); salvar();
    } })));
    delete D.op.dataset.respondida;
  }
  function falaNpc(n) {
    const f = n.fase, primeira = !S.falas[n.id];
    dialogoNpc = n;
    if (primeira) { S.falas[n.id] = true; pontos(5, `Você conheceu ${n.nome}!`); confereFases(); }
    const dia = S.diaNpc[n.id] || (S.diaNpc[n.id] = {});
    if (dia.fala !== hoje()) { dia.fala = hoje(); ganhaAmizade(n, 10); }
    const c = coracoes(n);
    const ola = primeira ? (n.prof ? `Olá! Eu sou a ${n.nome.replace(/^Professora? /, '')}, professora aqui de ${f.nome}. ` : `Oi! Eu sou ${n.nome}. `) : c >= 6 ? 'Que alegria te ver de novo! ' : c >= 3 ? 'Oi! Que bom que você passou aqui. ' : 'Oi de novo! ';
    const prox = PRESENTES_NPC.find(([nv]) => !S.recompensas[n.id + '-' + nv]);
    dialogo('💬', n.nome, `<p>${coracoesHtml(n)}</p><p>${esc(ola)}Posso te fazer uma pergunta de ${f.ano}º ano? Vale 10 pontos.</p><p class="muted">Conversar uma vez por dia, acertar as perguntas e dar presentes aumenta a amizade.${prox ? ` Com ${prox[0]} corações, ${esc(n.nome)} te dá ${ITENS[prox[1]][0]}.` : ''}</p>`, [
      { txt: 'Pode perguntar!', classe: 'principal', fn: () => pergunta(n.nome, '❓', sorteiaPergunta(f), certo => { if (certo) ganhaAmizade(n, 8); }) },
      { txt: '🎁 Dar um presente', fn: () => presente(n) },
      { txt: 'Agora não', fn: fechaDialogo }
    ]);
  }
  function guarda(it, f) {
    S.itens[it.id] = true; S.cont[f.id] = (S.cont[f.id] || 0) + 1; S.inv[it.tipo] = (S.inv[it.tipo] || 0) + 1;
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
    } else { guarda(it, f); pontos(5, `${ic} ${nome} no inventário!`); }
  }
  function lePlaca(f) {
    const ms = missoes(f);
    dialogo('🪧', f.nome, `<p>${esc(f.placa)}</p><p class="muted">Missões desta fase: ${ms.map(m => `${m.ok ? '✅' : '⬜'} ${esc(m.nome)}`).join(' · ')}</p><p class="muted">Os itens do chão mudam de lugar toda segunda-feira, para você voltar e revisar.</p>`, [{ txt: 'Entendi', fn: fechaDialogo }]);
  }
  function portao(f) {
    const prox = fases[f.idx + 1];
    if (liberada(prox)) { dialogo('🚪', 'Portão', `<p>O caminho para <strong>${esc(prox.nome)}</strong> está aberto. Siga em frente!</p>`, [{ txt: 'Vamos', fn: fechaDialogo }]); return; }
    const falta = missoes(f).filter(m => !m.ok).map(m => `${esc(m.nome)} (${m.n}/${m.meta})`);
    dialogo('🔒', 'Portão fechado', `<p>Para seguir para <strong>${esc(prox.nome)}</strong>, complete as missões de ${esc(f.nome)}:</p><p>${falta.join('<br>')}</p>`, [{ txt: 'Vou lá!', fn: fechaDialogo }]);
  }
  function interage() {
    if (dialogoAberto || janelaAberta) return;
    if (colocando) { colocaAqui(); return; }
    const a = alvoPerto(); if (!a) return;
    destino = null;
    if (a.tipo === 'pet') abreJanela('pet'); else if (a.tipo === 'minhacasa') entraCasa(); else if (a.tipo === 'movel') usaMovel(a.movel); else if (a.tipo === 'saida') saiCasa(); else if (a.tipo === 'casa') abreCasa(a.casa); else if (a.tipo === 'npc') falaNpc(a.npc); else if (a.tipo === 'placa') lePlaca(a.fase); else portao(a.fase);
  }

  /* ---------- janelas ---------- */
  function abreJanela(id) {
    fechaJanela(); janelaAberta = id; const el = $('#j-' + id); el.hidden = false;
    if (id === 'mapa') desenhaMapa(); if (id === 'inventario') inventario(); if (id === 'biblioteca') biblioteca(); if (id === 'avatar') editorAvatar(); if (id === 'casa') janelaCasa(); if (id === 'pet') janelaPet();
    const b = el.querySelector('button, a'); if (b) b.focus();
  }
  function fechaJanela() { if (!janelaAberta) return; $('#j-' + janelaAberta).hidden = true; janelaAberta = null; for (const k in teclas) teclas[k] = false; cv.focus(); }
  document.querySelectorAll('[data-abrir]').forEach(b => b.addEventListener('click', () => abreJanela(b.dataset.abrir)));
  document.querySelectorAll('[data-fechar]').forEach(b => b.addEventListener('click', fechaJanela));
  function teleporta(f) { dentro = false; colocando = null; P.x = f.x0 + 3.5; P.y = MEIO; petPerto(); destino = null; cam.ok = false; fechaJanela(); hud(); }
  function desenhaMapa() {
    const c = $('#mapa-cv'), k = c.getContext('2d'); k.fillStyle = '#1b2531'; k.fillRect(0, 0, c.width, c.height);
    const s = Math.min(c.width / LARG, (c.height - 24) / ALT), oy = 20 + (c.height - 24 - ALT * s) / 2, ox = (c.width - LARG * s) / 2;
    for (const f of fases) {
      mapaFase(k, f, s, ox + f.x0 * s, oy, true);
      if (!liberada(f)) { k.fillStyle = 'rgba(20,25,35,.55)'; k.fillRect(ox + f.x0 * s, oy, f.L * s, ALT * s); }
      k.fillStyle = '#fff'; k.font = '600 12px Lexend, sans-serif'; k.textAlign = 'center'; k.fillText(`${liberada(f) ? '' : '🔒 '}${f.idx + 1}`, ox + (f.x0 + f.L / 2) * s, oy - 6);
    }
    k.fillStyle = '#e85c4a'; k.beginPath(); k.arc(ox + P.x * s, oy + P.y * s, 5, 0, Math.PI * 2); k.fill();
    $('#mapa-fases').innerHTML = fases.map(f => {
      const ms = missoes(f), ok = liberada(f), cor = f.lugares.filter(l => S.feitos[l.id]).length;
      return `<li class="${ok ? '' : 'travada'}"><span>${S.concluidas[f.id] ? '🏆' : ok ? f.icone : '🔒'}</span><span class="f-nome"><strong>Fase ${f.idx + 1}: ${esc(f.nome)}</strong><small>${esc(f.sub)} · ${cor} de ${f.lugares.length} casas coloridas · missões ${ms.filter(m => m.ok).length}/${ms.length}</small></span>${ok ? `<button type="button" class="hb azul" data-ir="${f.idx}">Ir</button>` : ''}</li>`;
    }).join('');
    $('#mapa-fases').querySelectorAll('[data-ir]').forEach(b => b.addEventListener('click', () => teleporta(fases[+b.dataset.ir])));
  }
  function inventario() {
    $('#inv-itens').innerHTML = Object.entries(ITENS).map(([k, [ic, nome]]) => `<div class="it ${S.inv[k] ? '' : 'falta'}"><span style="font-size:26px">${ic}</span><span>${nome}<br><b>${S.inv[k] || 0}</b></span></div>`).join('') +
      `<p class="muted small" style="flex-basis:100%;margin:4px 0 0">Na bancada da sua casa 🏠, os itens viram móveis. Maçãs e estrelas também alimentam o seu pet 🐾. Os moradores que viram seus melhores amigos dão peças de quebra-cabeça.</p>`;
    const xp = xpHabilidades(), abertos = fases.filter(liberada).flatMap(f => f.lugares);
    $('#inv-hab').innerHTML = Object.entries(EIXOS_).map(([e, info]) => {
      const x = xp[e] || 0, n = nivelHab(x), base = custoNivel(n), prox = custoNivel(n + 1);
      const sug = abertos.find(l => l.rec && !S.feitos[l.id] && eixosDe(l.rec.habs).includes(e));
      return `<div class="hab"><span class="hab-ic">${ICONE_EIXO[e] || '⭐'}</span><span class="hab-txt"><strong>${esc(info.nome)}</strong><small class="muted hab-sub">${info.comp === 'CO' ? 'Computação' : 'Matemática'} · nível ${n}</small>
        <span class="barra"><span style="width:${n >= 10 ? 100 : Math.round(100 * (x - base) / (prox - base))}%"></span></span>
        <small>${n >= 10 ? 'Nível máximo! 🏆' : sug ? `Para subir: <a href="${esc(sug.url)}" target="_blank" rel="noopener">${esc(sug.icone)} ${esc(sug.titulo)}</a>` : 'Para subir: responda perguntas dos moradores e dos diamantes.'}</small></span></div>`;
    }).join('');
    const conhecidos = todosNpcs().filter(n => S.falas[n.id] || amizade(n));
    $('#inv-amigos').innerHTML = conhecidos.length ? conhecidos.map(n => `<div class="it"><span style="font-size:22px">${n.prof ? '👩‍🏫' : '🙂'}</span><span>${esc(n.nome)} <small class="muted">· ${esc(n.fase.nome)}</small><br>${coracoesHtml(n)}${S.gostos[n.id] ? ` <small>adora ${ITENS[favorito(n)][0]}</small>` : ''}</span></div>`).join('')
      : '<p class="muted small">Converse com os moradores da vila para fazer amigos.</p>';
    const feitos = todosLugares.filter(l => S.feitos[l.id]).length;
    const conq = [
      ['🥇', 'Primeira casa colorida', feitos >= 1], ['🎨', '5 casas coloridas', feitos >= 5], ['🏅', '15 casas coloridas', feitos >= 15], ['🧠', '10 acertos', S.acertos >= 10], ['🧠', '30 acertos', S.acertos >= 30],
      ['📘', '10 dicas lidas', Object.keys(S.dicas).length >= 10], ['💎', '10 diamantes', (S.inv.diamante || 0) >= 10], ['🗣️', '10 conversas', Object.keys(S.falas).length >= 10], ['🛋️', 'Primeiro móvel', Object.keys(S.casa.feitos).length >= 1], ['🏡', 'Casa decorada (8 móveis)', Object.keys(S.casa.feitos).length >= 8], ['🔭', 'Telescópio', !!S.casa.feitos.telescopio], ['🐾', 'Adotou um pet', !!S.pet], ['💞', 'Melhor amigo (10 corações)', todosNpcs().some(n => coracoes(n) >= 10)], ['🤝', '5 amigos com 3 corações', todosNpcs().filter(n => coracoes(n) >= 3).length >= 5], ['📈', 'Uma habilidade no nível 5', Object.values(niveisAgora()).some(v => v >= 5)], ['🏅', 'Pet nível 5', !!S.pet && S.pet.nivel >= 5],
      ...fases.map(f => ['🏆', f.nome, !!S.concluidas[f.id]])
    ];
    $('#inv-conq').innerHTML = conq.map(([ic, n, ok]) => `<div class="it ${ok ? '' : 'falta'}"><span style="font-size:22px">${ic}</span><span>${esc(n)}</span></div>`).join('');
  }
  function biblioteca() {
    $('#bib-lista').innerHTML = '<div class="bib">' + fases.map(f => `<h3>${f.icone} ${f.idx + 1}. ${esc(f.nome)} <small class="muted">· ${esc(f.sub)}</small></h3><ul>${
      f.lugares.map(l => `<li class="${S.feitos[l.id] ? 'feito' : ''}"><a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.icone)} ${esc(l.titulo)}</a></li>`).join('')}</ul>`).join('') +
      `<h3>📘 Dicas que você já leu</h3><ul>${Object.keys(S.dicas).map(i => `<li class="feito" style="grid-column:1/-1">${DICAS[i]}</li>`).join('') || '<li>Pegue os livros pelo chão para ler dicas de computação.</li>'}</ul>` +
      `<h3>📚 Mais do site</h3><ul><li><a href="../">Página inicial</a></li><li><a href="../jogos/">Todos os jogos</a></li><li><a href="${MD}catalogo.html?tipo=3d">Laboratório 3D</a></li><li><a href="../simuladores/">Simuladores</a></li><li><a href="${MD}meu-progresso.html">Meu progresso</a></li><li><a href="../curriculo/">Quem é Júlia Quoos</a></li></ul></div>`;
  }
  /* oficina da casa: construir, colocar, guardar e pintar */
  function janelaCasa() {
    $('#casa-inv').innerHTML = 'No seu inventário: ' + Object.entries(ITENS).map(([k, [ic]]) => `${ic} <b>${S.inv[k] || 0}</b>`).join(' · ');
    $('#casa-receitas').innerHTML = Object.entries(MOVEIS).filter(([, M]) => M.custo).map(([id, M]) => {
      const trava = M.requer && !S.casa.feitos[M.requer];
      const custo = Object.entries(M.custo).map(([k, n]) => `<span class="${(S.inv[k] || 0) >= n ? 'tem' : 'falta'}">${ITENS[k][0]} ${n}</span>`).join(' ');
      return `<div class="rec ${trava ? 'travada' : ''}"><span class="rec-ic">${trava ? '🔒' : M.ic}</span><span class="rec-txt"><strong>${esc(M.nome)}${S.casa.feitos[id] ? ' ✅' : ''}</strong><small>${trava ? `Construa antes: ${MOVEIS[M.requer].ic} ${esc(MOVEIS[M.requer].nome)}` : custo}</small></span><button type="button" class="hb verde" data-construir="${id}" ${podeConstruir(id) ? '' : 'disabled'}>Construir</button></div>`;
    }).join('');
    const guard = Object.entries(S.casa.guardados).filter(([, n]) => n > 0);
    $('#casa-guardados').innerHTML = guard.length ? guard.map(([id, n]) => `<div class="it"><span style="font-size:24px">${MOVEIS[id].ic}</span><span>${esc(MOVEIS[id].nome)}<br><b>${n}</b></span><button type="button" class="hb azul" data-colocar="${id}">Colocar</button></div>`).join('')
      : '<p class="muted small">Nada guardado. Construa um móvel na lista acima.</p>';
    $('#casa-postos').innerHTML = S.casa.moveis.map((m, i) => MOVEIS[m.id].fixo ? '' : `<div class="it"><span style="font-size:22px">${MOVEIS[m.id].ic}</span><span>${esc(MOVEIS[m.id].nome)}</span><button type="button" class="hb cinza" data-guardar="${i}">Guardar</button></div>`).join('');
    $('#casa-cores').innerHTML = PASTEIS.map(c => `<button type="button" data-cor="${c}" aria-pressed="${S.casa.cor === c}" aria-label="Cor ${c}" style="background:${c}"></button>`).join('');
    const j = $('#j-casa');
    j.querySelectorAll('[data-construir]').forEach(b => b.addEventListener('click', () => { construir(b.dataset.construir); janelaCasa(); }));
    j.querySelectorAll('[data-colocar]').forEach(b => b.addEventListener('click', () => comecaColocar(b.dataset.colocar)));
    j.querySelectorAll('[data-guardar]').forEach(b => b.addEventListener('click', () => { guardaMovel(S.casa.moveis[+b.dataset.guardar]); janelaCasa(); }));
    j.querySelectorAll('[data-cor]').forEach(b => b.addEventListener('click', () => { S.casa.cor = b.dataset.cor; salvar(); janelaCasa(); }));
  }
  /* editor do avatar */
  const OPCOES_AV = [
    ['pele', 'Pele', PELES], ['cabelo', 'Cor do cabelo', CABELOS],
    ['estilo', 'Cabelo', [['curto', 'Curto'], ['longo', 'Comprido'], ['coque', 'Coque'], ['bone', 'Boné']]],
    ['camisa', 'Camiseta', ROUPAS], ['calca', 'Calça', ['#2f3b6b', '#5a3b2a', '#333333', '#4bb259', '#e07bb0', '#f6b73c']]
  ];
  function editorAvatar() {
    $('#av-opcoes').innerHTML = OPCOES_AV.map(([k, nome, ops]) => `<div class="av-grupo"><h3>${nome}</h3><div class="av-cores">${ops.map(o => {
      const [v, txt] = Array.isArray(o) ? o : [o, ''];
      return `<button type="button" data-k="${k}" data-v="${v}" aria-pressed="${S.av[k] === v}" aria-label="${esc(nome)}: ${esc(txt || v)}" style="${txt ? '' : `background:${v}`}">${esc(txt)}</button>`;
    }).join('')}</div></div>`).join('');
    $('#av-opcoes').querySelectorAll('[data-k]').forEach(b => b.addEventListener('click', () => { S.av[b.dataset.k] = b.dataset.v; salvar(); editorAvatar(); }));
    previaAvatar();
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
  $('#b-zerar').addEventListener('click', () => { if (!confirm('Apagar todo o progresso do mundo? (O Meu progresso dos jogos não é apagado.)')) return; const av = S.av; S = novo(); S.av = av; dentro = false; colocando = null; S.versao = 2; P.x = S.x; P.y = S.y; cam.ok = false; salvar(); fechaJanela(); hud(); confereJogos(); });
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
    if (dentro) {
      if (colocando) { mouse = { x: wx, y: wy }; colocaAqui(); return; }
      const a = alvoCasa();
      if (a && a.tipo === 'pet') { const c = S.pet.dorme ? caminha() : PET; if (Math.hypot(wx - c.x, wy - c.y) < 0.8) return interage(); }
      if (a && a.tipo === 'movel') { const m = a.movel, M = MOVEIS[m.id]; if (wx > m.x - 0.3 && wx < m.x + M.w + 0.3 && wy > m.y - 0.3 && wy < m.y + M.d + 0.3) return interage(); }
      if (a && a.tipo === 'saida' && Math.hypot(wx - SAIDA.x, wy - SAIDA.y) < 0.8) return interage();
      destino = { x: wx, y: wy }; return;
    }
    const a = alvoPerto();
    if (a && a.tipo === 'pet' && Math.hypot(wx - PET.x, wy - PET.y) < 0.8) return interage();
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
  $('#b-casa').addEventListener('click', () => dentro ? abreJanela('casa') : entraCasa());

  /* ---------- teclado ---------- */
  const MAPA_TECLAS = { ArrowUp: 'cima', ArrowDown: 'baixo', ArrowLeft: 'esq', ArrowRight: 'dir', w: 'cima', s: 'baixo', a: 'esq', d: 'dir', Shift: 'correr' };
  document.addEventListener('keydown', ev => {
    const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key;
    const campo = /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName);
    if (ev.key === 'Escape' && colocando && !dialogoAberto && !janelaAberta) { colocando = null; mouse = null; aviso('Ok, o móvel continua guardado.'); ev.preventDefault(); return; }
    if (ev.key === 'Escape') { if (dialogoAberto) fechaDialogo(); else if (janelaAberta) fechaJanela(); else abreJanela('menu'); ev.preventDefault(); return; }
    if (dialogoAberto) {
      if (/^[1-9]$/.test(ev.key)) { const b = D.op.children[+ev.key - 1]; if (b && !b.disabled) { b.click(); ev.preventDefault(); } }
      return;
    }
    if (janelaAberta || campo) return;
    if (MAPA_TECLAS[k]) { teclas[MAPA_TECLAS[k]] = true; if (k !== 'Shift') mouse = null; ev.preventDefault(); }
    else if (k === ' ') { if (P.pulo === 0) { P.vpulo = 3.4; P.pulo = 0.01; } ev.preventDefault(); }
    else if (k === 'e' || k === 'Enter') { interage(); ev.preventDefault(); }
    else if (k === 'm') abreJanela('mapa'); else if (k === 'i') abreJanela('inventario'); else if (k === 'b') abreJanela('biblioteca'); else if (k === 'v') abreJanela('avatar'); else if (k === 'c') $('#b-casa').click(); else if (k === 'p') abreJanela('pet');
    else if (k === 'r') $('#b-reiniciar').click();
  });
  document.addEventListener('keyup', ev => { const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key; if (MAPA_TECLAS[k]) teclas[MAPA_TECLAS[k]] = false; });
  window.addEventListener('blur', () => { for (const k in teclas) teclas[k] = false; });

  /* ---------- volta do jogo: confere o progresso registrado ---------- */
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { confereJogos(); hud(); } });
  window.addEventListener('focus', () => { confereJogos(); hud(); });
  window.addEventListener('storage', ev => { if (ev.key === 'md-progresso-v1') { confereJogos(); hud(); } });
  setInterval(() => { guardaPos(); atualizaPet(); salvar(); }, 10000);
  window.addEventListener('pagehide', () => { guardaPos(); salvar(); });

  cv.tabIndex = 0;
  $('#missoes').addEventListener('click', () => $('#missoes').classList.toggle('aberta'));
  if (!liberada(faseDeX(P.x)) || !livre(P.x, P.y)) { P.x = fases[0].x0 + 3.5; P.y = MEIO; }
  window.MUNDO_DEBUG = { PET, acaoPet, atualizaPet, P, fases, interage, S: () => S, iso, _mouse: (x, y) => { mouse = { x, y }; }, entraCasa, saiCasa, construir, comecaColocar, colocaAqui, usaMovel, MOVEIS, dentro: () => dentro, alvoPerto };
  hud(); confereJogos(); confereFases();
  if (S.pet) { atualizaPet(); petPerto(); const pede = precisa(S.pet); if (pede.length) setTimeout(() => aviso(`🐾 ${S.pet.nome} precisa de você: ${pede.join(' ')}`), 1200); }
  if (!S.pontos) setTimeout(() => aviso('🌍 Explore o mundo e descubra os desafios!'), 400);
  requestAnimationFrame(quadro);
})();
