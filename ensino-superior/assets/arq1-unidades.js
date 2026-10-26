/* Arquitetura de Computadores I — unidades
   secoes: [título, HTML]; exercicios: [pergunta (HTML), resposta (HTML)]; sim: id do simulador */
UNIDADES_POR_DISC.arq1 = [
  {
    id: 'u1', n: 1, titulo: 'Introdução e modelo de von Neumann', semanas: '1–2', sim: null,
    objetivos: ['Definir o que é um computador e seus componentes fundamentais.', 'Relacionar níveis de abstração, parte operativa e parte de controle.', 'Descrever o ciclo de instrução e comparar os modelos de von Neumann e Harvard.'],
    leitura: 'Patterson & Hennessy, cap. 1. Stallings, caps. 1 e 2.',
    secoes: [
      ['O que estudamos em Arquitetura I', `<p>A disciplina trata da <strong>interface entre hardware e software</strong>: o alto nível da organização do hardware (acima das portas lógicas) e o baixo nível da programação (abaixo de linguagens como C). O objetivo é entender como uma linha de código vira instruções de máquina e como o processador executa essas instruções.</p>`],
      ['O que é um computador', `<p>Um conjunto de componentes interconectados que calcula funções por meio de algoritmos, recebendo instruções e dados. Suas funções básicas são <strong>processar, armazenar, transferir e controlar</strong> dados. Os quatro componentes fundamentais são: <strong>CPU</strong> (unidade de controle, via de dados e registradores), <strong>memória principal</strong>, <strong>entrada e saída</strong> e o <strong>sistema de interconexão</strong>.</p><p>Classes de computadores e suas prioridades: dispositivos móveis (energia e tempo real), desktops (preço/desempenho), servidores (disponibilidade e vazão), clusters e computação em escala de data center (disponibilidade e custo), supercomputadores (desempenho em ponto flutuante) e embarcados (preço, energia e tempo de resposta).</p>`],
      ['Um pouco de história', `<p>Da Máquina Diferencial de Babbage (1821) à Bombe de Turing (1939) e ao ENIAC (1946), primeiro computador eletrônico de grande escala. O computador IAS, de von Neumann (1952), introduziu o <strong>programa armazenado</strong>: instruções e dados guardados na memória da mesma forma. Desde então, a <strong>lei de Moore</strong> (dobra do número de transistores a cada ~2 anos) impulsionou o desempenho; hoje, os limites de energia e de paralelismo em nível de instrução levaram aos processadores com vários núcleos.</p>`],
      ['Níveis, parte operativa e controle', `<p>O projeto é organizado em níveis: <em>células</em> (registrador, célula de memória) formam <em>sistemas</em> (banco de registradores, sistema de memória), e assim por diante. O processador divide-se em <strong>parte operativa</strong> (via de dados: registradores, ULA, barramentos) e <strong>parte de controle</strong> (gera os sinais que comandam a via de dados).</p><p>A <strong>arquitetura do conjunto de instruções (ISA)</strong> é a abstração que separa software e hardware; a <em>implementação</em> são os detalhes de hardware que a realizam.</p>`],
      ['Ciclo de instrução', `<ol><li><strong>Busca</strong>: o PC (contador de programa) envia o endereço à memória; a instrução vai para o IR (registrador de instrução).</li><li><strong>Decodificação</strong>: a instrução é interpretada e define o fluxo de dados.</li><li><strong>Execução</strong>: a via de dados opera sobre dados vindos de registradores ou da memória.</li><li><strong>Armazenamento</strong>: o resultado é gravado em registrador ou na memória.</li></ol><p>Operações básicas: registrador-registrador (ULA), <em>load</em> (memória → registrador) e <em>store</em> (registrador → memória).</p>`],
      ['Von Neumann × Harvard', `<p>No modelo de <strong>von Neumann</strong>, instruções e dados ficam na <strong>mesma memória</strong> — o significado de cada palavra depende de como é interpretada. Na <strong>arquitetura Harvard</strong>, instruções e dados ficam em memórias separadas, permitindo buscar uma instrução e acessar um dado ao mesmo tempo (comum em microcontroladores e nas caches L1 separadas de instruções e dados).</p><p>Como a memória evoluiu mais devagar que o processador, o acesso a ela virou gargalo; as <strong>memórias cache</strong> guardam os dados usados recentemente perto do processador.</p>`]
    ],
    exercicios: [
      ['Quais são os quatro componentes fundamentais de um computador? Descreva a função de cada um.', 'CPU (controla e processa), memória principal (armazena programas e dados), E/S (comunicação com o exterior) e interconexão (barramentos que ligam os demais).'],
      ['Diferencie parte operativa e parte de controle de um processador.', 'A parte operativa (via de dados) contém registradores, ULA e caminhos por onde os dados passam; a parte de controle decodifica a instrução e gera os sinais que configuram a parte operativa em cada etapa.'],
      ['Qual a principal diferença entre os modelos de von Neumann e Harvard? Cite uma vantagem de cada.', 'Von Neumann usa uma memória única para instruções e dados (simplicidade e flexibilidade); Harvard usa memórias separadas, permitindo acesso simultâneo a instrução e dado (mais desempenho).'],
      ['Por que a lei de Moore não garante mais aumento contínuo de frequência?', 'A dissipação de potência cresce com a frequência; o limite de energia (e o de paralelismo em nível de instrução) levou a indústria a usar os transistores extras em múltiplos núcleos em vez de clocks maiores.'],
      ['Liste as prioridades de projeto de um computador embarcado e de um servidor.', 'Embarcado: baixo custo, baixo consumo e tempo de resposta. Servidor: disponibilidade, escalabilidade e vazão.']
    ]
  },
  {
    id: 'u2', n: 2, titulo: 'Noções de desempenho', semanas: '3–4', sim: null,
    objetivos: ['Diferenciar tempo de resposta e vazão.', 'Calcular tempo de CPU, CPI e desempenho relativo.', 'Aplicar a lei de Amdahl e reconhecer as limitações da métrica MIPS.'],
    leitura: 'Patterson & Hennessy, cap. 1.6 a 1.10. Stallings, cap. 2.',
    secoes: [
      ['Tempo de resposta e vazão', `<p><strong>Tempo de resposta</strong> (ou de execução) é o tempo para concluir uma tarefa; <strong>vazão</strong> (throughput) é o número de tarefas concluídas por unidade de tempo. Trocar o processador por um mais rápido melhora os dois; acrescentar processadores melhora principalmente a vazão.</p><p>Desempenho é o inverso do tempo: <code>Desempenho = 1 ÷ Tempo de execução</code>. Dizer que X é <em>n</em> vezes mais rápido que Y significa Desempenho<sub>X</sub> ÷ Desempenho<sub>Y</sub> = Tempo<sub>Y</sub> ÷ Tempo<sub>X</sub> = <em>n</em>.</p>`],
      ['Clock, CPI e tempo de CPU', `<p>O período do clock é o inverso da frequência (1 GHz → 1 ns). <strong>CPI</strong> é o número médio de ciclos por instrução. Com classes de instruções de CPI diferentes: <code>Ciclos = Σ (CPI<sub>i</sub> × C<sub>i</sub>)</code>, onde C<sub>i</sub> é quantas vezes a classe <em>i</em> é executada.</p><pre>Tempo de CPU = Nº de instruções × CPI × Período do clock
             = Nº de instruções × CPI ÷ Frequência</pre><p>Desempenho depende dos três fatores: algoritmo e compilador afetam o número de instruções e o CPI; a ISA afeta os três; a tecnologia e a organização afetam CPI e frequência.</p>`],
      ['Comparando sequências de código', `<p>Classes A, B e C com CPI 1, 2 e 3. A sequência 1 executa 2 A, 1 B e 2 C (5 instruções, 2 + 2 + 6 = <strong>10 ciclos</strong>, CPI 2,0). A sequência 2 executa 4 A, 1 B e 1 C (6 instruções, 4 + 2 + 3 = <strong>9 ciclos</strong>, CPI 1,5). A sequência 2 tem <em>mais</em> instruções e ainda assim é mais rápida.</p>`],
      ['Lei de Amdahl', `<p>A melhoria obtida com um aperfeiçoamento é limitada pela fração do tempo em que ele é usado:</p><pre>Tempo novo = Tempo afetado ÷ Melhoria + Tempo não afetado</pre><p>Exemplo: um programa leva 100 s, dos quais 80 s são multiplicações. Para ficar 4 vezes mais rápido (25 s), as multiplicações devem levar 5 s — uma melhoria de 16 vezes. Para ficar 5 vezes mais rápido (20 s) seria preciso multiplicação em 0 s: <strong>impossível</strong>. Moral: acelere o caso comum, mas lembre que o restante limita o ganho.</p>`],
      ['A métrica MIPS', `<p><code>MIPS = Nº de instruções ÷ (Tempo × 10<sup>6</sup>) = Frequência ÷ (CPI × 10<sup>6</sup>)</code>. Problemas: não considera o que cada instrução faz (não compara ISAs diferentes), varia entre programas no mesmo computador e pode até variar no sentido oposto ao desempenho real. O único indicador confiável é o <strong>tempo de execução</strong> de programas reais (benchmarks).</p>`]
    ],
    exercicios: [
      ['Um programa roda em 10 s no computador A (2 GHz). Deseja-se um computador B que rode em 6 s, mas o novo projeto exige 1,2 vez mais ciclos. Qual deve ser a frequência de B?', 'Ciclos em A = 10 × 2×10<sup>9</sup> = 20×10<sup>9</sup>. Em B: 1,2 × 20×10<sup>9</sup> = 24×10<sup>9</sup> ciclos em 6 s → 4 GHz.'],
      ['Para as classes A, B e C (CPI 1, 2 e 3), qual sequência executa mais rápido: (1) 2 A, 1 B, 2 C ou (2) 4 A, 1 B, 1 C? Qual o CPI de cada?', 'Sequência 1: 10 ciclos, CPI 2,0. Sequência 2: 9 ciclos, CPI 1,5. A sequência 2 é mais rápida, mesmo com mais instruções.'],
      ['Um programa leva 100 s, sendo 80 s de multiplicações. Quanto mais rápida deve ficar a multiplicação para o programa rodar 4 vezes mais rápido? E 5 vezes?', '4×: 25 = 80/n + 20 → n = 16. 5×: 20 = 80/n + 20 → impossível (exigiria multiplicação instantânea).'],
      ['Uma melhoria acelera em 10 vezes 40% do tempo de execução. Qual o speedup total?', '1 ÷ (0,6 + 0,4/10) = 1 ÷ 0,64 ≈ 1,56.'],
      ['Por que um computador com maior MIPS pode ser mais lento que outro?', 'Porque MIPS não considera quantas instruções cada máquina precisa para o mesmo programa nem o trabalho de cada instrução; uma ISA mais simples pode ter MIPS alto e precisar de muito mais instruções.']
    ]
  },
  {
    id: 'u3', n: 3, titulo: 'Instruções de máquina e assembly MIPS', semanas: '5–6', sim: 'mips',
    objetivos: ['Caracterizar instruções de máquina e o número de endereços por instrução.', 'Codificar e decodificar instruções MIPS nos formatos R, I e J.', 'Escrever operações aritméticas e lógicas, desvios e laços em assembly.'],
    leitura: 'Patterson & Hennessy, cap. 2.1 a 2.7. Stallings, caps. 12 e 13.',
    secoes: [
      ['Características das instruções', `<p>Uma instrução precisa especificar: o <strong>código da operação</strong>, as <strong>referências aos operandos</strong> de origem, a referência ao <strong>resultado</strong> e, implicitamente ou não, a <strong>próxima instrução</strong>. Os operandos podem estar na própria instrução (imediato), em registradores ou na memória.</p>`],
      ['Número de endereços', `<p>Para calcular <code>Y = A + B</code>:</p><ul><li><strong>3 endereços</strong>: <code>ADD Y, A, B</code></li><li><strong>2 endereços</strong>: <code>MOVE Y, A</code> · <code>ADD Y, B</code> (um operando também é o destino)</li><li><strong>1 endereço</strong> (acumulador): <code>LOAD A</code> · <code>ADD B</code> · <code>STORE Y</code></li><li><strong>0 endereço</strong> (pilha): <code>PUSH A</code> · <code>PUSH B</code> · <code>ADD</code> · <code>POP Y</code></li></ul><p>Menos endereços deixam as instruções mais curtas, mas os programas mais longos. O MIPS usa 3 operandos em registradores.</p>`],
      ['Registradores e formatos MIPS', `<p>O MIPS tem 32 registradores de 32 bits (<code>$zero</code>, <code>$t0–$t9</code>, <code>$s0–$s7</code>, <code>$a0–$a3</code>, <code>$v0–$v1</code>, <code>$sp</code>, <code>$ra</code>…). Todas as instruções têm 32 bits:</p><ul><li><strong>R</strong>: <code>op(6) rs(5) rt(5) rd(5) shamt(5) funct(6)</code></li><li><strong>I</strong>: <code>op(6) rs(5) rt(5) imediato(16)</code></li><li><strong>J</strong>: <code>op(6) endereço(26)</code></li></ul><p>Exemplo: <code>add $t0, $s1, $s2</code> → op 0, rs 17, rt 18, rd 8, shamt 0, funct 0x20:</p><pre>000000 10001 10010 01000 00000 100000 = 0x02324020</pre>`],
      ['Operações aritméticas e lógicas', `<p><code>add</code>, <code>sub</code>, <code>addi</code>; lógicas <code>and</code>, <code>or</code>, <code>nor</code>, <code>andi</code>, <code>ori</code>; deslocamentos <code>sll</code> e <code>srl</code>. Deslocar <em>i</em> bits à esquerda multiplica por 2<sup>i</sup>: <code>sll $t2, $s0, 4</code> faz $t2 = $s0 × 16. O <code>nor</code> com <code>$zero</code> implementa o NOT.</p><p>Uma expressão como <code>f = (g + h) − (i + j)</code> vira:</p><pre>add $t0, $s1, $s2    # t0 = g + h
add $t1, $s3, $s4    # t1 = i + j
sub $s0, $t0, $t1    # f = t0 - t1</pre>`],
      ['Tomada de decisão e laços', `<p><code>beq rs, rt, rótulo</code> e <code>bne rs, rt, rótulo</code> desviam se os registradores forem iguais ou diferentes; <code>slt rd, rs, rt</code> faz rd = 1 se rs &lt; rt; <code>j rótulo</code> é o desvio incondicional. Com eles montamos <em>if</em>, <em>if/else</em>, <em>while</em> e <em>for</em>:</p><pre>      bne  $s0, $s1, senao   # if (a == b)
      add  $s2, $s0, $s1     #   c = a + b
      j    fim
senao: sub  $s2, $s0, $s1     # else c = a - b
fim:</pre><p>Desvia-se quando a condição do <em>if</em> é <em>falsa</em>, pulando o bloco.</p>`]
    ],
    exercicios: [
      ['Escreva, com instruções de 1 endereço (acumulador), o cálculo de Y = (A + B) × C.', '<pre>LOAD A\nADD  B\nMUL  C\nSTORE Y</pre>'],
      ['Codifique <code>addi $t0, $t1, 5</code> e <code>lw $t0, 8($s0)</code> em hexadecimal.', 'addi: 001000 01001 01000 0000000000000101 = 0x21280005. lw: 100011 10000 01000 0000000000001000 = 0x8E080008.'],
      ['Decodifique 0x012A4022.', '000000 01001 01010 01000 00000 100010 → formato R, funct 0x22: <code>sub $t0, $t1, $t2</code>.'],
      ['Traduza <code>if (i &lt; j) k = i; else k = j;</code> com i, j, k em $s0, $s1, $s2.', '<pre>      slt  $t0, $s0, $s1\n      beq  $t0, $zero, senao\n      move $s2, $s0\n      j    fim\nsenao: move $s2, $s1\nfim:</pre>'],
      ['Usando apenas deslocamentos e somas, calcule $t0 = $s0 × 10.', '<pre>sll $t1, $s0, 3    # 8x\nsll $t2, $s0, 1    # 2x\nadd $t0, $t1, $t2  # 10x</pre>']
    ]
  },
  {
    id: 'u4', n: 4, titulo: 'Endereçamento, memória e execução de programas', semanas: '7–8', sim: 'mips',
    objetivos: ['Identificar os modos de endereçamento do MIPS.', 'Acessar vetores na memória e usar chamadas de sistema.', 'Explicar as etapas de compilação, montagem, ligação e carga.'],
    leitura: 'Patterson & Hennessy, caps. 2.9, 2.10 e 2.12; apêndice A (A.1 a A.5 e A.9).',
    secoes: [
      ['Modos de endereçamento', `<ul><li><strong>Registrador</strong>: o operando está num registrador — <code>add $t0, $t1, $t2</code></li><li><strong>Imediato</strong>: o operando é uma constante na instrução — <code>addi $t0, $t1, 5</code></li><li><strong>Base + deslocamento</strong>: endereço = registrador + constante — <code>lw $t0, 100($s2)</code> acessa Memória[$s2 + 100]</li><li><strong>Relativo ao PC</strong>: desvios condicionais — destino = PC + 4 + deslocamento × 4</li><li><strong>Pseudodireto</strong>: <code>j</code>/<code>jal</code> — 26 bits da instrução deslocados 2 à esquerda, com os 4 bits altos do PC</li></ul><p>Constantes de 32 bits são montadas em duas instruções: <code>lui</code> (16 bits altos) e <code>ori</code> (16 bits baixos).</p>`],
      ['Memória e vetores', `<p>A memória é endereçada por byte; uma palavra ocupa 4 bytes, então <code>v[i]</code> está em <em>base + 4·i</em>:</p><pre>sll  $t1, $t0, 2     # t1 = i * 4
add  $t1, $t1, $s0   # endereço de v[i]
lw   $t2, 0($t1)     # t2 = v[i]</pre><p>Convenção de uso da memória no MIPS: segmento de texto a partir de 0x00400000, dados estáticos a partir de 0x10000000 (no MARS, as variáveis de <code>.data</code> começam em 0x10010000), <em>heap</em> crescendo para cima e pilha começando no topo e crescendo para baixo.</p>`],
      ['Chamadas de sistema', `<p>A instrução <code>syscall</code> pede um serviço ao sistema operacional (ou ao simulador). O código do serviço vai em <code>$v0</code> e o argumento em <code>$a0</code>:</p><table class="tbl"><tr><th>$v0</th><th>Serviço</th></tr><tr><td>1</td><td>imprime inteiro ($a0)</td></tr><tr><td>4</td><td>imprime texto terminado em zero (endereço em $a0)</td></tr><tr><td>5</td><td>lê inteiro (resultado em $v0)</td></tr><tr><td>10</td><td>encerra o programa</td></tr><tr><td>11</td><td>imprime caractere</td></tr></table>`],
      ['Do código-fonte ao programa em execução', `<ol><li><strong>Compilador</strong>: traduz o programa em alto nível para assembly.</li><li><strong>Montador</strong>: traduz assembly para código objeto, expandindo pseudoinstruções (<code>li</code>, <code>la</code>, <code>move</code>) e gerando cabeçalho, segmentos de texto e dados, informações de relocação e tabela de símbolos.</li><li><strong>Ligador (linker)</strong>: junta os módulos objeto e bibliotecas, posiciona cada um na memória, determina os endereços dos rótulos e corrige as referências.</li><li><strong>Carregador (loader)</strong>: lê o cabeçalho do executável, cria o espaço de endereçamento, copia instruções e dados, coloca os argumentos na pilha, inicializa os registradores e salta para a rotina de início.</li></ol>`]
    ],
    exercicios: [
      ['Indique o modo de endereçamento de cada instrução: <code>lw $t0, 12($sp)</code>, <code>beq $t1, $t2, L</code>, <code>ori $t0, $t0, 0xFF</code>, <code>j L</code>.', 'Base + deslocamento; relativo ao PC; imediato (com registrador); pseudodireto.'],
      ['Escreva o código para <code>v[3] = v[1] + v[2]</code>, com a base de v em $s0.', '<pre>lw  $t0, 4($s0)\nlw  $t1, 8($s0)\nadd $t2, $t0, $t1\nsw  $t2, 12($s0)</pre>'],
      ['Como carregar a constante 0x12345678 em $t0? Por que não basta uma instrução?', '<code>lui $t0, 0x1234</code> e <code>ori $t0, $t0, 0x5678</code>. O imediato das instruções tipo I tem só 16 bits.'],
      ['Escreva um programa que leia um inteiro do teclado e imprima o dobro dele.', '<pre>li   $v0, 5\nsyscall\nadd  $a0, $v0, $v0\nli   $v0, 1\nsyscall</pre>'],
      ['Qual a função da tabela de símbolos e das informações de relocação no arquivo objeto?', 'A tabela de símbolos lista os rótulos definidos e as referências externas ainda não resolvidas; as informações de relocação indicam quais instruções e dados dependem de endereços absolutos e precisam ser corrigidos pelo ligador.']
    ]
  },
  {
    id: 'u5', n: 5, titulo: 'Procedimentos e pilha', semanas: '9', sim: 'mips',
    objetivos: ['Seguir as etapas e as convenções de chamada de procedimento no MIPS.', 'Usar a pilha para salvar registradores.', 'Implementar procedimentos recursivos.'],
    leitura: 'Patterson & Hennessy, cap. 2.8.',
    secoes: [
      ['Etapas de uma chamada', `<ol><li>Colocar os parâmetros onde o procedimento possa acessá-los (<code>$a0–$a3</code>).</li><li>Transferir o controle (<code>jal rótulo</code>, que guarda o retorno em <code>$ra</code>).</li><li>Adquirir o armazenamento necessário (pilha).</li><li>Executar a tarefa.</li><li>Colocar o resultado onde quem chamou possa acessá-lo (<code>$v0–$v1</code>).</li><li>Retornar (<code>jr $ra</code>).</li></ol>`],
      ['Convenções de registradores', `<p><code>$t0–$t9</code> são temporários e <strong>não</strong> precisam ser preservados pelo procedimento chamado; <code>$s0–$s7</code> são salvos e <strong>devem</strong> ser preservados (se o procedimento os usar, salva na pilha e restaura antes de retornar). <code>$sp</code> aponta para o topo da pilha, que cresce para endereços menores.</p><pre>addi $sp, $sp, -8    # abre espaço para 2 palavras
sw   $ra, 4($sp)     # salva o endereço de retorno
sw   $s0, 0($sp)     # salva $s0
...
lw   $s0, 0($sp)     # restaura
lw   $ra, 4($sp)
addi $sp, $sp, 8     # libera o espaço</pre>`],
      ['Recursão: fatorial', `<pre>fact: addi $sp, $sp, -8
      sw   $ra, 4($sp)
      sw   $a0, 0($sp)
      slti $t0, $a0, 1       # n < 1 ?
      beq  $t0, $zero, L1
      addi $v0, $zero, 1     # caso base: retorna 1
      addi $sp, $sp, 8
      jr   $ra
L1:   addi $a0, $a0, -1
      jal  fact              # fact(n - 1)
      lw   $a0, 0($sp)
      lw   $ra, 4($sp)
      addi $sp, $sp, 8
      mul  $v0, $a0, $v0     # n * fact(n - 1)
      jr   $ra</pre><p>Cada chamada empilha seu próprio <code>$ra</code> e seu <code>$a0</code>; sem isso, o retorno das chamadas internas destruiria os valores das externas. Experimente no mini-MIPS (exemplo “Fatorial recursivo”) e observe <code>$sp</code> diminuindo a cada chamada.</p>`]
    ],
    exercicios: [
      ['Por que um procedimento que chama outro precisa salvar <code>$ra</code>?', 'Porque o <code>jal</code> interno sobrescreve $ra; sem salvá-lo, o procedimento perde o endereço de retorno para quem o chamou.'],
      ['Um procedimento folha (que não chama ninguém) usa $t0, $t1 e $s0. Quais registradores ele precisa salvar na pilha?', 'Apenas $s0 (registradores $t não precisam ser preservados e, como é folha, $ra não é alterado).'],
      ['Ao executar fact(3), quantas vezes o procedimento é chamado e qual a profundidade máxima da pilha (em palavras)?', '4 chamadas: fact(3), fact(2), fact(1), fact(0). Cada uma empilha 2 palavras: profundidade máxima de 8 palavras.'],
      ['Escreva um procedimento <code>soma3</code> que devolve em $v0 a soma de $a0, $a1 e $a2.', '<pre>soma3: add $v0, $a0, $a1\n       add $v0, $v0, $a2\n       jr  $ra</pre>']
    ]
  },
  {
    id: 'u6', n: 6, titulo: 'MIPS monociclo', semanas: '11–12', sim: 'logica',
    objetivos: ['Identificar os componentes do caminho de dados do MIPS.', 'Montar o caminho de dados para instruções R, load/store e beq.', 'Determinar os sinais de controle e avaliar o desempenho do monociclo.'],
    leitura: 'Patterson & Hennessy, cap. 4.1 a 4.4.',
    secoes: [
      ['Componentes', `<p>Elementos combinacionais (ULA, somadores, multiplexadores, extensor de sinal) e de estado (PC, memória de instruções, banco de registradores com 2 leituras e 1 escrita, memória de dados). No monociclo, <strong>toda instrução executa em um único ciclo de clock</strong>, por isso as memórias de instruções e de dados são separadas.</p>`],
      ['Montando o caminho de dados', `<ul><li><strong>Busca</strong>: o PC endereça a memória de instruções; um somador calcula PC + 4.</li><li><strong>Tipo R</strong>: lê rs e rt no banco, a ULA opera e o resultado é escrito em rd.</li><li><strong>Load/store</strong>: a ULA soma rs ao imediato estendido; lw lê a memória e escreve em rt; sw escreve rt na memória.</li><li><strong>beq</strong>: a ULA subtrai rs − rt (sinal <em>Zero</em>); outro somador calcula PC + 4 + (imediato × 4); um multiplexador escolhe o próximo PC.</li><li><strong>j</strong>: novo PC = 4 bits altos de PC + 4 com o endereço de 26 bits deslocado 2 à esquerda.</li></ul><p>Multiplexadores escolhem: o registrador destino (rt ou rd), a segunda entrada da ULA (registrador ou imediato), o dado a escrever (ULA ou memória) e o próximo PC.</p>`],
      ['Sinais de controle', `<p>A unidade de controle principal decodifica o opcode; o controle da ULA combina <em>ALUOp</em> com o campo funct.</p><div class="tbl-wrap"><table class="tbl"><tr><th>Instrução</th><th>RegDst</th><th>ALUSrc</th><th>MemtoReg</th><th>RegWrite</th><th>MemRead</th><th>MemWrite</th><th>Branch</th><th>ALUOp</th></tr>
<tr><td>Tipo R</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>10</td></tr>
<tr><td>lw</td><td>0</td><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>00</td></tr>
<tr><td>sw</td><td>X</td><td>1</td><td>X</td><td>0</td><td>0</td><td>1</td><td>0</td><td>00</td></tr>
<tr><td>beq</td><td>X</td><td>0</td><td>X</td><td>0</td><td>0</td><td>0</td><td>1</td><td>01</td></tr></table></div>`],
      ['Por que o monociclo não é usado', `<p>O período do clock é determinado pelo caminho mais longo — a instrução <code>lw</code> (memória de instruções, banco, ULA, memória de dados e escrita). Todas as instruções passam a durar esse tempo, mesmo as rápidas. Além disso, recursos não podem ser reaproveitados dentro do ciclo (são necessários dois somadores e duas memórias). As soluções são o <strong>multiciclo</strong> e o <strong>pipeline</strong>.</p>`]
    ],
    exercicios: [
      ['Quais sinais de controle mudam entre <code>add</code> e <code>lw</code>? Explique cada diferença.', 'RegDst (rd × rt), ALUSrc (registrador × imediato), MemtoReg (ULA × memória), MemRead (0 × 1) e ALUOp (funct × soma).'],
      ['Uma instrução <code>addi</code> deve ser executada no monociclo. Que valores de controle ela usa?', 'RegDst 0, ALUSrc 1, MemtoReg 0, RegWrite 1, MemRead 0, MemWrite 0, Branch 0, ALUOp 00 (soma).'],
      ['Se o sinal RegWrite de uma instrução tipo R ficar travado em 0, o que acontece?', 'A instrução calcula o resultado, mas ele nunca é gravado no registrador destino; o programa segue com valores antigos.'],
      ['Tempos: memória 200 ps, ULA e somadores 100 ps, banco de registradores 50 ps. Qual o período mínimo do clock do monociclo?', 'Caminho do lw: 200 (instr.) + 50 (leitura) + 100 (ULA) + 200 (dados) + 50 (escrita) = 600 ps.']
    ]
  },
  {
    id: 'u7', n: 7, titulo: 'MIPS multiciclo', semanas: '13', sim: null,
    objetivos: ['Explicar a divisão da execução em etapas de um ciclo.', 'Descrever as etapas de cada classe de instrução.', 'Calcular o CPI do multiciclo e compará-lo ao monociclo.'],
    leitura: 'Patterson & Hennessy, seção online 4.15 (implementação multiciclo). Stallings, cap. 20 (controle).',
    secoes: [
      ['A ideia', `<p>A execução é dividida em etapas, cada uma com um ciclo curto. Uma instrução usa apenas as etapas de que precisa, e unidades funcionais podem ser <strong>reutilizadas</strong> em ciclos diferentes: uma única memória para instruções e dados e uma única ULA (que também calcula PC + 4 e o destino do desvio). Registradores intermediários guardam valores entre os ciclos: <code>IR</code>, <code>MDR</code>, <code>A</code>, <code>B</code> e <code>ALUOut</code>.</p>`],
      ['As etapas', `<ol><li><strong>Busca</strong>: IR ← Memória[PC]; PC ← PC + 4.</li><li><strong>Decodificação e leitura</strong>: A ← Reg[rs]; B ← Reg[rt]; ALUOut ← PC + (extensão de sinal(imediato) &lt;&lt; 2), já adiantando o destino de um possível desvio.</li><li><strong>Execução</strong>: tipo R: ALUOut ← A op B · memória: ALUOut ← A + extensão(imediato) · beq: se A = B, PC ← ALUOut · j: PC ← PC[31–28] ‖ (IR[25–0] &lt;&lt; 2).</li><li><strong>Memória ou conclusão R</strong>: tipo R: Reg[rd] ← ALUOut · lw: MDR ← Memória[ALUOut] · sw: Memória[ALUOut] ← B.</li><li><strong>Escrita do load</strong>: Reg[rt] ← MDR.</li></ol><p>Ciclos por classe: <strong>lw 5</strong>, <strong>sw 4</strong>, <strong>tipo R 4</strong>, <strong>beq 3</strong>, <strong>j 3</strong>.</p>`],
      ['Controle por máquina de estados', `<p>O controle passa a ser uma <strong>máquina de estados finitos</strong>: os dois primeiros estados (busca e decodificação) são comuns a todas as instruções; a partir do opcode, a máquina segue o ramo de cada classe e volta ao estado de busca ao final. Alternativamente, o controle pode ser microprogramado.</p>`],
      ['Desempenho', `<p>Com 25% de lw, 10% de sw, 52% de tipo R, 11% de beq e 2% de j, o CPI médio é 0,25×5 + 0,10×4 + 0,52×4 + 0,11×3 + 0,02×3 = <strong>4,12</strong>. Se o ciclo do multiciclo for 1/5 do monociclo, o ganho depende do quanto as etapas estão equilibradas — e o pipeline aproveita a mesma divisão em etapas para executar várias instruções ao mesmo tempo.</p>`]
    ],
    exercicios: [
      ['Quais recursos o multiciclo economiza em relação ao monociclo? Qual o custo adicional?', 'Economiza uma memória (instruções e dados juntos) e somadores extras (a ULA faz tudo). Exige registradores intermediários (IR, MDR, A, B, ALUOut), mais multiplexadores e um controle sequencial.'],
      ['Descreva as etapas executadas por <code>beq</code> com desvio tomado.', '1: busca e PC + 4. 2: lê rs e rt e calcula o destino em ALUOut. 3: a ULA compara A e B; como são iguais, PC ← ALUOut. Total: 3 ciclos.'],
      ['Calcule o CPI para 30% de lw, 10% de sw, 45% de tipo R e 15% de beq.', '0,3×5 + 0,1×4 + 0,45×4 + 0,15×3 = 1,5 + 0,4 + 1,8 + 0,45 = 4,15.'],
      ['Monociclo com clock de 800 ps × multiciclo com clock de 200 ps e CPI 4,12. Qual executa uma instrução média mais rápido?', 'Monociclo: 800 ps. Multiciclo: 4,12 × 200 = 824 ps. Nesse caso o monociclo é ligeiramente mais rápido; o multiciclo só vence se o ciclo puder ser menor ou se o mix tiver menos lw.']
    ]
  },
  {
    id: 'u8', n: 8, titulo: 'Pipeline', semanas: '14–15', sim: null,
    objetivos: ['Explicar o pipeline de 5 estágios e o ganho de vazão.', 'Identificar conflitos estruturais, de dados e de controle.', 'Aplicar adiantamento, bolhas, desvio adiado e previsão de desvios.'],
    leitura: 'Patterson & Hennessy, cap. 4.5 a 4.8.',
    secoes: [
      ['Ideia e estágios', `<p>Como numa lavanderia, cada estágio trabalha numa instrução diferente: <strong>IF</strong> (busca), <strong>ID</strong> (decodificação e leitura de registradores), <strong>EX</strong> (execução ou cálculo de endereço), <strong>MEM</strong> (acesso à memória) e <strong>WB</strong> (escrita do resultado). Registradores de pipeline (<code>IF/ID</code>, <code>ID/EX</code>, <code>EX/MEM</code>, <code>MEM/WB</code>) guardam dados e sinais de controle entre estágios.</p><p>O pipeline aumenta a <strong>vazão</strong>, não reduz a latência de cada instrução. Exemplo: monociclo com ciclo de 800 ps × pipeline com estágios de 200 ps → até 4 vezes mais vazão em sequências longas.</p>`],
      ['Conflitos (hazards)', `<ul><li><strong>Estruturais</strong>: dois estágios disputando o mesmo recurso — por isso o pipeline usa memórias separadas de instruções e dados.</li><li><strong>De dados</strong>: uma instrução precisa de um resultado ainda não escrito (<code>sub $2, $1, $3</code> seguido de <code>and $12, $2, $5</code>).</li><li><strong>De controle</strong>: o próximo PC depende de um desvio ainda não resolvido.</li></ul>`],
      ['Adiantamento e bolhas', `<p>O <strong>adiantamento</strong> (forwarding) envia o resultado de EX/MEM ou MEM/WB direto para a entrada da ULA. Condição para adiantar de EX/MEM: <code>EX/MEM.RegWrite</code> e <code>EX/MEM.rd ≠ 0</code> e <code>EX/MEM.rd = ID/EX.rs</code> (ou rt).</p><p>Um <code>lw</code> seguido de uma instrução que usa o valor carregado exige uma <strong>bolha</strong> (parada de 1 ciclo), detectada quando <code>ID/EX.MemRead</code> e <code>ID/EX.rt</code> é igual a <code>IF/ID.rs</code> ou <code>IF/ID.rt</code>. O compilador pode evitar a bolha reordenando instruções independentes.</p>`],
      ['Desvios', `<p>Técnicas para reduzir a penalidade: resolver o desvio já no estágio ID (comparador e somador dedicados); <strong>prever desvio não tomado</strong> e descartar as instruções buscadas se errar; <strong>desvio adiado</strong> (delayed branch), em que a instrução seguinte ao desvio sempre executa e o compilador coloca ali algo útil; e <strong>previsão dinâmica</strong> com 2 bits, que só muda a previsão após dois erros seguidos — bom para laços.</p>`]
    ],
    exercicios: [
      ['Quantos ciclos levam 5 instruções sem conflitos num pipeline de 5 estágios? E 100 instruções?', '5 + 4 = 9 ciclos; 5 + 99 = 104 ciclos.'],
      ['Identifique as dependências e como resolvê-las: <code>sub $2,$1,$3</code> · <code>and $12,$2,$5</code> · <code>or $13,$6,$2</code> · <code>add $14,$2,$2</code>.', 'and, or e add dependem de $2. and recebe o valor por adiantamento de EX/MEM, or por adiantamento de MEM/WB, e add lê do banco (escrita na primeira metade do ciclo, leitura na segunda). Nenhuma bolha é necessária.'],
      ['Por que <code>lw $t0, 0($s0)</code> seguido de <code>add $t1, $t0, $t2</code> precisa de bolha mesmo com adiantamento?', 'O valor só fica disponível ao fim do estágio MEM do lw, depois do momento em que o add precisaria dele em EX; é preciso atrasar o add em 1 ciclo.'],
      ['Reordene para eliminar as bolhas: <code>lw $t1,0($t0)</code> · <code>lw $t2,4($t0)</code> · <code>add $t3,$t1,$t2</code> · <code>sw $t3,12($t0)</code> · <code>lw $t4,8($t0)</code> · <code>add $t5,$t1,$t4</code>.', 'Subir o terceiro lw: <code>lw $t1</code> · <code>lw $t2</code> · <code>lw $t4</code> · <code>add $t3,$t1,$t2</code> · <code>sw $t3</code> · <code>add $t5,$t1,$t4</code>. Nenhum add usa um valor carregado na instrução imediatamente anterior.'],
      ['Explique por que um preditor de 2 bits acerta mais que um de 1 bit em laços.', 'Com 1 bit, a saída do laço causa um erro e muda a previsão, gerando outro erro na primeira iteração seguinte. Com 2 bits, um erro isolado não inverte a previsão: só um erro por execução do laço.']
    ]
  }
];
