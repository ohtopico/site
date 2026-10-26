/* =====================================================================
   Ensino Superior — dados das disciplinas.
   Para criar uma disciplina: adicione em DISCIPLINAS, crie o arquivo de unidades
   (assets/<nome>-unidades.js) e a pasta com index.html e unidade.html.
   ===================================================================== */

const UNIDADES_POR_DISC = {};   // preenchido pelos arquivos de unidades

const DISCIPLINAS = [
  {
    id: 'arq', sigla: 'ARQ', nome: 'Arquitetura de Computadores', status: 'disponivel', icone: '🧮', url: 'arquitetura/',
    resumo: 'Da interface entre hardware e software — von Neumann, desempenho, assembly MIPS, monociclo, multiciclo e pipeline — às técnicas dos processadores modernos: superescalares, escalonamento, hierarquia de memória, E/S, multiprocessadores e sistemas embarcados.',
    partes: [
      { n: 1, titulo: 'Parte I — Interface hardware/software', resumo: 'Do programa em alto nível às instruções de máquina e à organização do processador.' },
      { n: 2, titulo: 'Parte II — Desempenho e paralelismo', resumo: 'Como os processadores atuais executam várias instruções por ciclo, escondem a latência da memória e usam vários núcleos.' }
    ],
    projetos: [
      { titulo: 'Programa em assembly MIPS',
        descricao: 'Em duplas, desenvolver e documentar um programa em assembly MIPS que resolva um problema com dados em memória, laços, desvios, chamadas de sistema e ao menos um procedimento, testado no mini-MIPS ou no MARS e acompanhado de relatório.',
        sugestoes: ['Avaliador de expressões em notação polonesa reversa', 'Ordenação de vetor (bolha ou seleção)', 'Busca binária em vetor ordenado', 'MDC pelo algoritmo de Euclides', 'Fatorial e Fibonacci recursivos', 'Conversão de um número para outra base'],
        sim: 'mips' },
      { titulo: 'Estudo comparativo de processadores',
        descricao: 'Em duplas, escrever um artigo (modelo SBC, 4 a 6 páginas) comparando três processadores de classes diferentes — por exemplo, desktop ou servidor, dispositivo móvel e microcontrolador embarcado — com um pequeno experimento no simulador de cache relacionando configurações de cache ao desempenho.',
        sugestoes: ['Conjunto de instruções (CISC, RISC) e tamanho de palavra', 'Profundidade do pipeline e largura de emissão', 'Escalonamento em ordem ou fora de ordem', 'Hierarquia de cache e coerência', 'Núcleos e multithreading', 'Consumo de energia e área de aplicação'],
        sim: 'cache' }
    ],
    referencias: [
      'PATTERSON, D. A.; HENNESSY, J. L. Organização e projeto de computadores: a interface hardware/software. 5. ed. Rio de Janeiro: LTC, 2017.',
      'HENNESSY, J. L.; PATTERSON, D. A. Arquitetura de computadores: uma abordagem quantitativa. 6. ed. Rio de Janeiro: GEN LTC, 2019.',
      'STALLINGS, W. Arquitetura e organização de computadores. 10. ed. São Paulo: Pearson, 2017.',
      'TANENBAUM, A. S.; AUSTIN, T. Organização estruturada de computadores. 6. ed. São Paulo: Pearson, 2013.',
      'TANENBAUM, A. S.; BOS, H. Sistemas operacionais modernos. 4. ed. São Paulo: Pearson, 2016.',
      'WEBER, R. F. Fundamentos de arquitetura de computadores. 4. ed. Porto Alegre: Bookman, 2012.',
      'WOLF, M. Computers as components: principles of embedded computing system design. 4. ed. Cambridge: Morgan Kaufmann, 2016.'
    ]
  },
  {
    id: 'cd', sigla: 'CD', nome: 'Ciência de Dados', status: 'disponivel', icone: '📊', url: 'ciencia-de-dados/', construcao: true,
    resumo: 'Do problema à comunicação dos resultados: Python e pandas, coleta com arquivos, SQL e APIs, limpeza, análise exploratória, estatística descritiva, visualização e uma introdução ao aprendizado de máquina.',
    projetos: [
      { titulo: 'Análise exploratória de dados abertos',
        descricao: 'Em duplas, escolher uma base de dados aberta brasileira, formular de duas a três perguntas e respondê-las em um notebook documentado: coleta, limpeza (com as decisões justificadas), estatística descritiva, gráficos e conclusões, encerrando com um resumo de uma página para um público não técnico.',
        sugestoes: ['Censo Escolar ou Enem (INEP)', 'Indicadores municipais (IBGE)', 'Dados de saúde pública (DATASUS)', 'Gastos públicos (Portal da Transparência)', 'Clima e chuvas (INMET)', 'Mobilidade e transporte do seu município'],
        sim: 'estatistica' }
    ],
    referencias: [
      'McKINNEY, W. Python para análise de dados: tratamento de dados com pandas, NumPy & Jupyter. 3. ed. São Paulo: Novatec, 2023.',
      'BRUCE, P.; BRUCE, A. Estatística prática para cientistas de dados. Rio de Janeiro: Alta Books, 2019.',
      'VANDERPLAS, J. Python data science handbook. Sebastopol: O’Reilly, 2016. Disponível gratuitamente on-line.',
      'PROVOST, F.; FAWCETT, T. Data science para negócios. Rio de Janeiro: Alta Books, 2016.',
      'WICKHAM, H. Tidy data. Journal of Statistical Software, v. 59, n. 10, 2014.'
    ]
  },
  { id: 'bd', sigla: 'BD', nome: 'Banco de Dados', status: 'em-breve', icone: '🗄️',
    resumo: 'Modelagem conceitual e relacional, SQL, normalização e transações.' },
  { id: 'vc', sigla: 'VC', nome: 'Visão Computacional', status: 'em-breve', icone: '👁️',
    resumo: 'Processamento de imagens, redes neurais convolucionais e aplicações em acessibilidade.' }
];
const DISC = Object.fromEntries(DISCIPLINAS.map(d => [d.id, d]));

/* Simuladores compartilhados (pasta simuladores/) */
const SIMULADORES = [
  { id: 'mips', titulo: 'Mini-MIPS', icone: '🖥️', disc: 'arq', unidade: 'u3', url: 'simuladores/mips.html',
    resumo: 'Escreva assembly MIPS, monte, execute passo a passo e veja registradores, memória e a codificação binária de cada instrução nos formatos R, I e J.' },
  { id: 'cache', titulo: 'Memória cache', icone: '🗂️', disc: 'arq', unidade: 'u12', url: 'simuladores/cache.html',
    resumo: 'Configure uma cache (mapeamento direto, associativa por conjunto ou totalmente associativa) e acompanhe acertos e falhas a cada acesso.' },
  { id: 'estatistica', titulo: 'Estatística descritiva', icone: '📈', disc: 'cd', unidade: 'u5', url: 'simuladores/estatistica.html',
    resumo: 'Cole uma lista de números e veja média, mediana, moda, desvio padrão, quartis, outliers, histograma e boxplot — com o código pandas equivalente.' },
  { id: 'bases', titulo: 'Bases numéricas e complemento de dois', icone: '🔢', disc: 'arq', unidade: 'u3', url: 'simuladores/bases.html', revisao: true,
    resumo: 'Revisão de pré-requisito: conversão entre bases, complemento de dois, overflow e ponto flutuante IEEE 754.' },
  { id: 'logica', titulo: 'Portas lógicas e circuitos', icone: '🔌', disc: 'arq', unidade: 'u6', url: 'simuladores/logica.html', revisao: true,
    resumo: 'Revisão de pré-requisito: portas lógicas, somadores e multiplexador — blocos do caminho de dados.' }
];
