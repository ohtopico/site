/* Arquitetura de Computadores — unidades (Parte I: interface hardware/software; Parte II: desempenho e paralelismo)
   secoes: [título, HTML]; exercicios: [pergunta (HTML), resposta (HTML)]; sim: id do simulador */
(function () {
  const parte1 = [
  {
    id: 'u1', n: 1, titulo: 'Introdução e modelo de von Neumann', sim: null,
    objetivos: ['Definir o que é um computador e seus componentes fundamentais.', 'Relacionar níveis de abstração, parte operativa e parte de controle.', 'Descrever o ciclo de instrução e comparar os modelos de von Neumann e Harvard.'],
    leitura: 'Patterson & Hennessy, cap. 1. Stallings, caps. 1 e 2.',
    secoes: [
      ['O que estudamos nesta disciplina', `<p>A <strong>Parte I</strong> trata da <strong>interface entre hardware e software</strong>: o alto nível da organização do hardware (acima das portas lógicas) e o baixo nível da programação (abaixo de linguagens como C) — como uma linha de código vira instruções de máquina e como o processador as executa. A <strong>Parte II</strong> mostra como os processadores modernos vão além: executam várias instruções por ciclo, escondem a latência da memória e usam vários núcleos.</p>`],
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
    id: 'u2', n: 2, titulo: 'Noções de desempenho', sim: null,
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
    id: 'u3', n: 3, titulo: 'Instruções de máquina e assembly MIPS', sim: 'mips',
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
    id: 'u4', n: 4, titulo: 'Endereçamento, memória e execução de programas', sim: 'mips',
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
    id: 'u5', n: 5, titulo: 'Procedimentos e pilha', sim: 'mips',
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
    id: 'u6', n: 6, titulo: 'MIPS monociclo', sim: 'logica',
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
    id: 'u7', n: 7, titulo: 'MIPS multiciclo', sim: null,
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
    id: 'u8', n: 8, titulo: 'Pipeline', sim: null,
    objetivos: ['Explicar o pipeline de 5 estágios e o ganho de vazão.', 'Identificar conflitos estruturais, de dados e de controle.', 'Aplicar adiantamento, bolhas, desvio adiado e previsão de desvios.'],
    leitura: 'Patterson & Hennessy, cap. 4.5 a 4.8.',
    secoes: [
      ['Ideia e estágios', `<p>Como numa lavanderia, cada estágio trabalha numa instrução diferente: <strong>IF</strong> (busca), <strong>ID</strong> (decodificação e leitura de registradores), <strong>EX</strong> (execução ou cálculo de endereço), <strong>MEM</strong> (acesso à memória) e <strong>WB</strong> (escrita do resultado). Registradores de pipeline (<code>IF/ID</code>, <code>ID/EX</code>, <code>EX/MEM</code>, <code>MEM/WB</code>) guardam dados e sinais de controle entre estágios.</p><p>O pipeline aumenta a <strong>vazão</strong>, não reduz a latência de cada instrução. Exemplo: monociclo com ciclo de 800 ps × pipeline com estágios de 200 ps → até 4 vezes mais vazão em sequências longas.</p>`],
      ['Conflitos (hazards)', `<ul><li><strong>Estruturais</strong>: dois estágios disputando o mesmo recurso — por isso o pipeline usa memórias separadas de instruções e dados.</li><li><strong>De dados</strong>: uma instrução precisa de um resultado ainda não escrito (<code>sub $2, $1, $3</code> seguido de <code>and $12, $2, $5</code>).</li><li><strong>De controle</strong>: o próximo PC depende de um desvio ainda não resolvido.</li></ul>`],
      ['Adiantamento e bolhas', `<p>O <strong>adiantamento</strong> (forwarding) envia o resultado de EX/MEM ou MEM/WB direto para a entrada da ULA. Condição para adiantar de EX/MEM: <code>EX/MEM.RegWrite</code> e <code>EX/MEM.rd ≠ 0</code> e <code>EX/MEM.rd = ID/EX.rs</code> (ou rt).</p><p>Um <code>lw</code> seguido de uma instrução que usa o valor carregado exige uma <strong>bolha</strong> (parada de 1 ciclo), detectada quando <code>ID/EX.MemRead</code> e <code>ID/EX.rt</code> é igual a <code>IF/ID.rs</code> ou <code>IF/ID.rt</code>. O compilador pode evitar a bolha reordenando instruções independentes.</p>`],
      ['Desvios', `<p>Técnicas para reduzir a penalidade: resolver o desvio já no estágio ID (comparador e somador dedicados); <strong>prever desvio não tomado</strong> e descartar as instruções buscadas se errar; <strong>desvio adiado</strong> (delayed branch), em que a instrução seguinte ao desvio sempre executa e o compilador coloca ali algo útil; e <strong>previsão dinâmica</strong> com 2 bits, que só muda a previsão após dois erros seguidos — bom para laços.</p>`],
      ['CPI com paradas', `<p>No pipeline real, <code>CPI = 1 + ciclos de parada por instrução</code>. Exemplo: 20% das instruções são loads e metade delas é seguida por uma instrução dependente (1 bolha); 15% são desvios com penalidade de 1 ciclo. CPI = 1 + 0,20 × 0,5 × 1 + 0,15 × 1 = <strong>1,25</strong>. Para baixar o CPI abaixo de 1 é preciso <strong>emitir mais de uma instrução por ciclo</strong> — assunto da Parte II.</p>`]
    ],
    exercicios: [
      ['Quantos ciclos levam 5 instruções sem conflitos num pipeline de 5 estágios? E 100 instruções?', '5 + 4 = 9 ciclos; 5 + 99 = 104 ciclos.'],
      ['Identifique as dependências e como resolvê-las: <code>sub $2,$1,$3</code> · <code>and $12,$2,$5</code> · <code>or $13,$6,$2</code> · <code>add $14,$2,$2</code>.', 'and, or e add dependem de $2. and recebe o valor por adiantamento de EX/MEM, or por adiantamento de MEM/WB, e add lê do banco (escrita na primeira metade do ciclo, leitura na segunda). Nenhuma bolha é necessária.'],
      ['Por que <code>lw $t0, 0($s0)</code> seguido de <code>add $t1, $t0, $t2</code> precisa de bolha mesmo com adiantamento?', 'O valor só fica disponível ao fim do estágio MEM do lw, depois do momento em que o add precisaria dele em EX; é preciso atrasar o add em 1 ciclo.'],
      ['Reordene para eliminar as bolhas: <code>lw $t1,0($t0)</code> · <code>lw $t2,4($t0)</code> · <code>add $t3,$t1,$t2</code> · <code>sw $t3,12($t0)</code> · <code>lw $t4,8($t0)</code> · <code>add $t5,$t1,$t4</code>.', 'Subir o terceiro lw: <code>lw $t1</code> · <code>lw $t2</code> · <code>lw $t4</code> · <code>add $t3,$t1,$t2</code> · <code>sw $t3</code> · <code>add $t5,$t1,$t4</code>. Nenhum add usa um valor carregado na instrução imediatamente anterior.'],
      ['Explique por que um preditor de 2 bits acerta mais que um de 1 bit em laços.', 'Com 1 bit, a saída do laço causa um erro e muda a previsão, gerando outro erro na primeira iteração seguinte. Com 2 bits, um erro isolado não inverte a previsão: só um erro por execução do laço.'],
      ['Calcule o CPI: 25% de loads, 40% deles seguidos de uso imediato (1 bolha); 10% de desvios, 30% com previsão errada e penalidade de 2 ciclos.', '1 + 0,25×0,4×1 + 0,10×0,3×2 = 1 + 0,10 + 0,06 = 1,16.']
    ]
  }
];
  const parte2 = [
  {
    id: 'u2', n: 2, titulo: 'Paralelismo em nível de instrução e superescalares', sim: null,
    objetivos: ['Diferenciar superpipeline e superescalar.', 'Identificar dependências verdadeiras, antidependências e dependências de saída.', 'Explicar renomeação de registradores, políticas de emissão e execução especulativa.'],
    leitura: 'Patterson & Hennessy, cap. 4.10. Stallings, cap. 16. Hennessy & Patterson, cap. 3.',
    secoes: [
      ['Superpipeline × superescalar', `<p><strong>Superpipeline</strong> aumenta o número de estágios para reduzir o ciclo (paralelismo <em>temporal</em>), mas esbarra no custo dos registradores de pipeline, nas penalidades de desvio maiores e no consumo de energia. <strong>Superescalar</strong> replica unidades e emite várias instruções por ciclo (paralelismo <em>espacial</em>), podendo atingir IPC &gt; 1.</p><p>Paralelismo em nível de instrução (ILP) é uma propriedade do <em>programa</em> (quantas instruções são independentes); paralelismo em nível de máquina é a capacidade do <em>processador</em> de explorá-lo.</p>`],
      ['Dependências', `<ul><li><strong>Verdadeira (RAW)</strong>: <code>add $1,$2,$3</code> → <code>sub $4,$1,$5</code> — o sub precisa do resultado.</li><li><strong>Antidependência (WAR)</strong>: <code>sub $4,$1,$5</code> → <code>add $1,$6,$7</code> — o add não pode escrever $1 antes de o sub ler.</li><li><strong>Dependência de saída (WAW)</strong>: duas instruções escrevem o mesmo registrador; a ordem final deve ser preservada.</li><li><strong>De controle</strong> e <strong>conflitos de recursos</strong>.</li></ul><p>WAR e WAW são <strong>dependências falsas</strong>: vêm do reuso de nomes de registradores e desaparecem com a <strong>renomeação</strong> (mapear registradores da arquitetura em um conjunto maior de registradores físicos).</p>`],
      ['Políticas de emissão e conclusão', `<ul><li>Emissão em ordem com conclusão em ordem: simples, mas qualquer parada trava tudo.</li><li>Emissão em ordem com conclusão fora de ordem: instruções rápidas terminam antes; surge o problema de WAW.</li><li>Emissão fora de ordem com conclusão fora de ordem: uma <strong>janela de instruções</strong> desacopla decodificação e execução; o processador escolhe instruções prontas.</li></ul><p>O <strong>buffer de reordenação (ROB)</strong> permite executar fora de ordem mas <strong>efetivar (commit) em ordem</strong>, garantindo exceções precisas.</p>`],
      ['Especulação', `<p>Na <strong>execução especulativa</strong>, o processador prevê o desvio e executa instruções do caminho previsto antes de saber se ele está certo; os resultados ficam no ROB e só são efetivados se a previsão se confirmar — caso contrário, são descartados. Isso amplia muito o ILP explorável, ao custo de hardware e energia gastos em trabalho descartado.</p>`]
    ],
    exercicios: [
      ['Identifique todas as dependências: (1) <code>lw $1,0($2)</code> (2) <code>add $3,$1,$4</code> (3) <code>sub $1,$5,$6</code> (4) <code>or $7,$1,$3</code>.', 'RAW: 1→2 ($1), 3→4 ($1), 2→4 ($3). WAR: 2→3 ($1 lido em 2 e escrito em 3). WAW: 1→3 ($1).'],
      ['Reescreva o trecho anterior com renomeação para eliminar as dependências falsas.', 'Renomeando o $1 escrito em (3) para $8: <code>sub $8,$5,$6</code> e <code>or $7,$8,$3</code>. Restam só as dependências verdadeiras.'],
      ['Diferencie paralelismo temporal e espacial.', 'Temporal: sobreposição de etapas de instruções diferentes no tempo (pipeline). Espacial: várias unidades executando instruções ao mesmo tempo (superescalar).'],
      ['Por que o commit precisa ser em ordem mesmo com execução fora de ordem?', 'Para manter o estado visível ao programa consistente com a ordem sequencial: exceções precisas e descarte correto das instruções especulativas em caso de previsão errada.']
    ]
  },
  {
    id: 'u3', n: 3, titulo: 'Escalonamento estático e VLIW', sim: null,
    objetivos: ['Explicar a emissão múltipla estática e o papel do compilador.', 'Aplicar reordenação e desenrolamento de laços para reduzir paradas.', 'Caracterizar arquiteturas VLIW e compará-las a superescalares.'],
    leitura: 'Hennessy & Patterson, cap. 3 (3.2 e 3.7). Patterson & Hennessy, cap. 4.10.',
    secoes: [
      ['Blocos básicos e janela de ILP', `<p>Um <strong>bloco básico</strong> é uma sequência de instruções sem desvios no meio (uma entrada, uma saída). Como desvios são frequentes, os blocos são pequenos e têm pouco ILP; para achar mais, o compilador (ou o hardware) precisa olhar para além dos desvios.</p>`],
      ['Emissão múltipla estática', `<p>Na emissão estática, o <strong>compilador</strong> agrupa instruções em pacotes emitidos juntos e resolve as dependências. Exemplo clássico: MIPS com emissão dupla, um pacote com uma instrução de ULA/desvio e outra de load/store. Pacotes sem instrução útil recebem <code>nop</code>.</p>`],
      ['Reordenação e desenrolamento de laços', `<p>Para <code>for (i = 999; i &gt;= 0; i--) x[i] = x[i] + s;</code> em ponto flutuante, com as latências usuais (load → FP: 1 parada; FP → store: 2; inteiro → desvio: 1):</p><ul><li>Código direto: <strong>9 ciclos</strong> por iteração (5 instruções + 4 paradas).</li><li><strong>Reordenado</strong> (mover o decremento do ponteiro para preencher paradas): <strong>7 ciclos</strong>.</li><li><strong>Desenrolado 4 vezes e reordenado</strong>: 14 instruções sem paradas para 4 elementos — <strong>3,5 ciclos por elemento</strong>.</li></ul><p>O desenrolamento elimina desvios e incrementos, expõe mais instruções independentes e exige mais registradores e código maior.</p>`],
      ['VLIW', `<p>Em <strong>VLIW</strong> (Very Long Instruction Word), cada instrução longa contém várias operações para unidades funcionais diferentes, definidas pelo compilador. O hardware é simples (sem detecção dinâmica de dependências), mas o código fica maior, depende de bons compiladores e perde compatibilidade binária entre gerações. Exemplo comercial: Intel Itanium (IA-64, com o conceito EPIC).</p><table class="tbl"><tr><th></th><th>Superescalar</th><th>VLIW</th></tr><tr><td>Quem escalona</td><td>Hardware, em tempo de execução</td><td>Compilador</td></tr><tr><td>Complexidade do hardware</td><td>Alta</td><td>Baixa</td></tr><tr><td>Código</td><td>Compatível entre gerações</td><td>Atrelado à largura da máquina</td></tr></table>`]
    ],
    exercicios: [
      ['Explique por que o laço desenrolado e reordenado gasta 3,5 ciclos por elemento.', 'Com 4 cópias do corpo, há instruções independentes suficientes para preencher todas as paradas: 4 loads, 4 somas, 4 stores, 1 decremento e 1 desvio = 14 instruções em 14 ciclos para 4 elementos.'],
      ['Quais as desvantagens do desenrolamento de laços?', 'Código maior (pior uso da cache de instruções), mais registradores necessários e tratamento extra quando o número de iterações não é múltiplo do fator de desenrolamento.'],
      ['Diferencie emissão estática e dinâmica de múltiplas instruções.', 'Na estática, o compilador decide quais instruções são emitidas juntas; na dinâmica, o hardware decide em tempo de execução, analisando dependências.'],
      ['Caracterize o paradigma VLIW quanto a formato de instrução, escalonamento, dependências e hardware.', 'Instruções longas com várias operações; escalonamento feito pelo compilador; dependências resolvidas em tempo de compilação; hardware simples, sem lógica de emissão dinâmica.']
    ]
  },
  {
    id: 'u4', n: 4, titulo: 'Escalonamento dinâmico: Scoreboard e Tomasulo', sim: null,
    objetivos: ['Explicar as fases e estruturas do Scoreboard.', 'Explicar o algoritmo de Tomasulo, estações de reserva e o barramento comum.', 'Comparar as duas abordagens.'],
    leitura: 'Hennessy & Patterson, cap. 3 (3.4 e 3.5) e apêndice C.7 (Scoreboard).',
    secoes: [
      ['Por que escalonar dinamicamente', `<p>O hardware conhece informações que o compilador não tem (resultado de desvios, faltas de cache) e pode executar instruções independentes enquanto outra espera. O código também passa a rodar bem em processadores diferentes sem recompilação.</p>`],
      ['Scoreboard (CDC 6600)', `<p>Controle <strong>centralizado</strong>. Fases: <strong>Emissão</strong> (espera se a unidade funcional estiver ocupada ou houver WAW) → <strong>Leitura de operandos</strong> (espera os operandos ficarem prontos, resolvendo RAW) → <strong>Execução</strong> → <strong>Escrita</strong> (espera se houver WAR pendente). Estruturas: status das instruções, status das unidades funcionais (Busy, Op, Fi, Fj, Fk, Qj, Qk, Rj, Rk) e status dos registradores de resultado. Como não há renomeação, dependências falsas causam paradas.</p>`],
      ['Algoritmo de Tomasulo (IBM 360/91)', `<p>Controle <strong>distribuído</strong> em <strong>estações de reserva</strong> junto a cada unidade funcional. Fases: <strong>Emissão</strong> (se houver estação livre; os operandos prontos são copiados, os não prontos ficam como a etiqueta da estação que os produzirá) → <strong>Execução</strong> (quando os operandos chegam) → <strong>Escrita</strong> (resultado difundido no <strong>barramento comum de dados — CDB</strong> para todas as estações e registradores que o aguardam).</p><p>As etiquetas das estações funcionam como <strong>renomeação de registradores</strong>, eliminando WAR e WAW. Variações do algoritmo, combinadas com o ROB, estão presentes em processadores fora de ordem atuais.</p>`],
      ['Comparação', `<table class="tbl"><tr><th></th><th>Scoreboard</th><th>Tomasulo</th></tr><tr><td>Leitura de operandos</td><td>Banco de registradores</td><td>Estações de reserva / CDB</td></tr><tr><td>Escrita de resultados</td><td>Banco de registradores</td><td>CDB (estações e registradores)</td></tr><tr><td>Conflito estrutural</td><td>Na emissão (unidade ocupada)</td><td>Na emissão (sem estação livre)</td></tr><tr><td>WAR e WAW</td><td>Causam paradas</td><td>Eliminados pela renomeação</td></tr><tr><td>Controle</td><td>Centralizado</td><td>Distribuído</td></tr></table>`]
    ],
    exercicios: [
      ['No Scoreboard, em qual fase cada conflito é tratado: estrutural, RAW, WAR e WAW?', 'Estrutural e WAW: emissão. RAW: leitura de operandos. WAR: escrita do resultado.'],
      ['Como o algoritmo de Tomasulo elimina dependências WAR e WAW?', 'Na emissão, os operandos prontos são copiados para a estação de reserva e os registradores de destino passam a apontar para a etiqueta da estação produtora; escritas posteriores no mesmo registrador não afetam valores já capturados, e só o último produtor atualiza o registrador.'],
      ['Qual o papel do barramento comum de dados (CDB)? Qual sua limitação?', 'Difundir cada resultado para todas as estações e registradores que o aguardam no mesmo ciclo. Limitação: só um resultado por ciclo por barramento, tornando-se gargalo em máquinas largas (exige vários CDBs).'],
      ['Por que o algoritmo de Tomasulo puro não garante exceções precisas, e o que resolve isso?', 'Porque as instruções terminam e escrevem fora de ordem; o buffer de reordenação (ROB) guarda os resultados e os efetiva em ordem.']
    ]
  },
  {
    id: 'u5', n: 5, titulo: 'Hierarquia de memória e cache', sim: 'cache',
    objetivos: ['Explicar a hierarquia de memória e os princípios de localidade.', 'Dividir endereços em tag, índice e deslocamento nos três tipos de mapeamento.', 'Comparar políticas de substituição e de escrita e calcular o tempo médio de acesso.'],
    leitura: 'Patterson & Hennessy, cap. 5.1 a 5.4. Stallings, cap. 4.',
    secoes: [
      ['Hierarquia e localidade', `<p>Analogia da biblioteca: em vez de ir à estante a cada consulta, o estudante leva para a mesa os livros de que vai precisar. Registradores, caches L1/L2/L3, memória principal e disco formam níveis cada vez <strong>maiores, mais lentos e mais baratos por byte</strong>. Funciona por causa da <strong>localidade temporal</strong> (o que foi usado tende a ser usado de novo) e da <strong>localidade espacial</strong> (o que está perto tende a ser usado em seguida).</p><p>Termos: <em>acerto</em> (hit), <em>falha</em> (miss), <em>taxa de acerto</em>, <em>tempo de acerto</em> e <em>penalidade de falha</em>. Processadores atuais têm caches L1 separadas de instruções e dados (Harvard modificada) e L2/L3 unificadas.</p>`],
      ['Mapeamento direto', `<p>Cada bloco tem uma única posição: <code>linha = (nº do bloco) mod (nº de linhas)</code>. O endereço é dividido em <code>tag | linha | deslocamento</code>. Exemplo: memória de 2<sup>16</sup> bytes, blocos de 16 bytes e 64 linhas → deslocamento 4 bits, linha 6 bits, tag 6 bits. A tag é guardada junto com o bloco para saber qual dos vários blocos possíveis está na linha.</p><p>É simples e rápido, mas sofre com <strong>falhas por conflito</strong> quando dois blocos usados alternadamente disputam a mesma linha.</p>`],
      ['Associativo e associativo por conjunto', `<p>No <strong>totalmente associativo</strong>, o bloco pode ir para qualquer linha: o endereço é só <code>tag | deslocamento</code> e todas as tags são comparadas em paralelo (memória associativa) — flexível, porém caro. No <strong>associativo por conjunto</strong> de <em>k</em> vias, o bloco vai para qualquer uma das <em>k</em> linhas do conjunto <code>(nº do bloco) mod (nº de conjuntos)</code>: endereço <code>tag | conjunto | deslocamento</code>. É o compromisso usado na prática.</p><p><strong>Substituição</strong> (só faz sentido com associatividade): LRU, FIFO, LFU ou aleatória. <strong>Escrita</strong>: <em>write-through</em> (escreve também na memória, com buffer de escrita) ou <em>write-back</em> (escreve ao substituir, com bit de sujo).</p>`],
      ['Desempenho', `<p><strong>AMAT = tempo de acerto + taxa de falha × penalidade de falha</strong>. Com 1 ciclo de acerto, 5% de falhas e 100 ciclos de penalidade: 6 ciclos. Falhas se classificam em <em>compulsórias</em> (primeiro acesso ao bloco), <em>de capacidade</em> (a cache não comporta o conjunto de trabalho) e <em>de conflito</em> (disputa por linha ou conjunto).</p>`]
    ],
    exercicios: [
      ['Memória de 2<sup>16</sup> bytes endereçada por byte, blocos de 8 bytes, cache de mapeamento direto com 32 linhas. Como se divide o endereço? Quantos bytes cabem na cache, com e sem as tags?', 'Deslocamento 3 bits, linha 5 bits, tag 8 bits. Dados: 32 × 8 = 256 bytes; com as tags: 32 × (8 + 1) = 288 bytes.'],
      ['Cache associativa por conjunto com 128 linhas em conjuntos de 4. Memória principal com 8K blocos de 64 palavras. Mostre o formato do endereço (por palavra).', '32 conjuntos. Endereço de 13 + 6 = 19 bits: palavra 6 bits, conjunto 5 bits, tag 8 bits.'],
      ['Por que não existe política de substituição no mapeamento direto?', 'Porque cada bloco só pode ocupar uma linha: na falha, o bloco que está nela é sempre o substituído.'],
      ['Para a sequência de blocos 0, 8, 0, 6, 8, compare uma cache de mapeamento direto com 8 linhas e uma associativa de 2 vias com 4 conjuntos (LRU).', 'Direto: 5 falhas (0 e 8 disputam a linha 0). 2 vias: falha, falha, acerto, falha, acerto — taxa de acerto de 40%. Confira no simulador.'],
      ['Se a cache e a memória principal tivessem o mesmo tempo de acesso, ainda haveria vantagem em usar cache? Justifique.', 'Não em tempo de acesso; a cache só se justifica porque é muito mais rápida que a memória principal. A localidade só traz ganho se o nível superior for mais rápido.']
    ]
  },
  {
    id: 'u6', n: 6, titulo: 'Memória virtual', sim: null,
    objetivos: ['Explicar os objetivos e o funcionamento da memória virtual.', 'Traduzir endereços com tabela de páginas e TLB.', 'Comparar paginação, segmentação e segmentação paginada.'],
    leitura: 'Patterson & Hennessy, cap. 5.7. Tanenbaum & Bos (Sistemas operacionais modernos), cap. 3.',
    secoes: [
      ['Por que memória virtual', `<p>Permite que cada processo tenha um <strong>espaço de endereçamento próprio</strong>, maior que a memória física, com <strong>proteção</strong> entre processos e realocação transparente. A memória principal funciona como uma “cache” do disco. Sistemas multiprogramados precisam disso para compartilhar a memória sem que um processo invada o outro.</p>`],
      ['Paginação', `<p>O espaço virtual é dividido em <strong>páginas</strong> e a memória física em <strong>quadros</strong> de mesmo tamanho (ex.: 4 KiB). O endereço virtual é <code>nº da página virtual | deslocamento</code>; a <strong>tabela de páginas</strong> (uma por processo) mapeia cada página em um quadro, com bit de validade, bits de proteção, bit de referência e bit de sujo.</p><p>Uma <strong>falta de página</strong> (página ausente) é tratada pelo sistema operacional, que busca a página no disco — milhões de ciclos. Por isso: páginas grandes, posicionamento totalmente associativo, substituição aproximando LRU e sempre <em>write-back</em>. A paginação elimina a fragmentação externa, mas tem fragmentação interna (sobra na última página).</p>`],
      ['TLB', `<p>Cada acesso exigiria ler a tabela de páginas na memória. A <strong>TLB</strong> (Translation Lookaside Buffer) é uma pequena cache de traduções recentes; um acerto na TLB evita o acesso extra. Uma falha na TLB pode ser tratada por hardware ou software e não significa necessariamente falta de página.</p>`],
      ['Segmentação', `<p>Divide o programa em <strong>segmentos</strong> de tamanho variável com significado lógico (código, dados, pilha), facilitando proteção e compartilhamento, mas causa fragmentação externa e exige algoritmos de alocação (first-fit, best-fit, worst-fit). A <strong>segmentação paginada</strong> combina os dois: segmentos lógicos divididos em páginas.</p>`]
    ],
    exercicios: [
      ['Endereços virtuais de 32 bits, páginas de 4 KiB e entradas de 4 bytes. Quantos bits tem o deslocamento? Qual o tamanho da tabela de páginas de um processo?', 'Deslocamento: 12 bits; página virtual: 20 bits → 2<sup>20</sup> entradas × 4 bytes = 4 MiB por processo.'],
      ['Por que a memória virtual usa write-back e não write-through?', 'Porque escrever no disco a cada store seria lentíssimo; com write-back, a página só é gravada no disco quando for substituída e estiver suja.'],
      ['Uma falha na TLB implica falta de página? Explique.', 'Não. A tradução pode não estar na TLB mas existir na tabela de páginas, com a página presente na memória; só há falta de página se a entrada da tabela estiver inválida.'],
      ['Compare fragmentação interna e externa, relacionando com paginação e segmentação.', 'Interna: espaço desperdiçado dentro de uma unidade alocada (última página — paginação). Externa: buracos livres entre áreas alocadas, pequenos demais para uso (segmentação).']
    ]
  },
  {
    id: 'u7', n: 7, titulo: 'Armazenamento, barramentos e E/S', sim: null,
    objetivos: ['Calcular o tempo de acesso a disco e comparar níveis de RAID.', 'Descrever tipos de barramento e formas de arbitragem.', 'Comparar E/S programada, por interrupção e por DMA.'],
    leitura: 'Patterson & Hennessy, caps. 5.5, 5.11 e 6 (seções sobre E/S). Stallings, caps. 3, 6 e 7.',
    secoes: [
      ['Discos e RAID', `<p>Tempo de acesso a disco = <strong>busca</strong> (mover o braço) + <strong>latência rotacional</strong> (em média meia volta) + <strong>transferência</strong> + controlador. A 7200 RPM, meia volta leva 0,5 ÷ (7200/60) s ≈ 4,17 ms. SSDs eliminam partes mecânicas, com acesso muito mais rápido.</p><p><strong>RAID</strong> combina discos para desempenho e disponibilidade: RAID 0 (distribuição, sem redundância), RAID 1 (espelhamento), RAID 4 (paridade por bloco em disco dedicado), RAID 5 (paridade distribuída entre os discos, evitando o gargalo do disco de paridade) e RAID 6 (dupla paridade, tolera duas falhas).</p>`],
      ['Barramentos', `<p>Conjuntos de linhas compartilhadas de <strong>dados, endereços e controle</strong>. Tipos: processador–memória (curtos e rápidos), de E/S (longos, padronizados) e de backplane. Comunicação <strong>síncrona</strong> (com clock) ou <strong>assíncrona</strong> (com protocolo de handshake). Quando há vários mestres, a <strong>arbitragem</strong> pode ser centralizada (em cadeia — daisy chain — ou paralela) ou distribuída. Sistemas atuais usam ligações ponto a ponto seriais de alta velocidade, como PCI Express.</p>`],
      ['Formas de E/S', `<ul><li><strong>E/S programada (polling)</strong>: a CPU consulta o status do controlador repetidamente — simples, mas desperdiça ciclos e pode perder dados (<em>overrun</em>) se demorar.</li><li><strong>Interrupção</strong>: o dispositivo sinaliza quando está pronto; a CPU termina a instrução atual, salva o contexto, executa a rotina de tratamento e retoma. Há prioridades e classes (de programa, temporizador, E/S, falha de hardware).</li><li><strong>DMA</strong>: um controlador transfere blocos direto entre dispositivo e memória, “roubando” ciclos de barramento, e interrompe a CPU só ao final.</li></ul>`]
    ],
    exercicios: [
      ['Disco de 10 000 RPM, busca média de 4 ms, transferência de 100 MB/s e 0,2 ms de controlador. Qual o tempo médio para ler um setor de 4 KB?', 'Latência rotacional: 0,5 ÷ (10 000/60) = 3 ms. Transferência: 4 KB ÷ 100 MB/s ≈ 0,04 ms. Total ≈ 4 + 3 + 0,04 + 0,2 = 7,24 ms.'],
      ['Por que o RAID 5 tem melhor desempenho de escrita que o RAID 4?', 'No RAID 4 toda escrita atualiza o mesmo disco de paridade, que vira gargalo; no RAID 5 a paridade é distribuída e escritas em blocos diferentes podem ocorrer em paralelo.'],
      ['Compare polling e interrupção quanto ao uso da CPU e à latência de atendimento.', 'Polling ocupa a CPU testando o dispositivo, mas responde rápido se o teste for frequente; interrupção libera a CPU para outras tarefas, com o custo de salvar e restaurar o contexto a cada evento.'],
      ['Liste os passos genéricos de uma transferência por DMA.', 'A CPU programa o controlador (endereço, contagem, direção); o controlador transfere os dados usando o barramento; ao terminar, interrompe a CPU, que verifica o resultado.']
    ]
  },
  {
    id: 'u8', n: 8, titulo: 'Multiprocessadores e coerência de cache', sim: null,
    objetivos: ['Classificar arquiteturas paralelas segundo Flynn e a organização da memória.', 'Explicar o problema de coerência de cache.', 'Rastrear os protocolos MSI e MESI.'],
    leitura: 'Patterson & Hennessy, cap. 6. Hennessy & Patterson, cap. 5.',
    secoes: [
      ['Classificação', `<p><strong>Flynn</strong>: SISD (monoprocessador), SIMD (uma instrução, vários dados — vetoriais, extensões multimídia, GPUs), MISD (pouco usado) e MIMD (vários processadores independentes).</p><p>Organização da memória: <strong>multiprocessadores</strong> com memória compartilhada — <em>UMA</em> (acesso uniforme, como em SMPs), <em>NUMA</em> (acesso mais rápido à memória local) e <em>COMA</em> (só caches) — e <strong>multicomputadores</strong> com memória distribuída e comunicação por <strong>troca de mensagens</strong> (clusters).</p>`],
      ['O problema da coerência', `<p>Com caches privadas, dois processadores podem ter cópias diferentes do mesmo dado: P1 e P2 leem X = 5; P1 escreve X = 7 na sua cache; P2 continua lendo 5. Inconsistências também surgem na migração de processos e em operações de E/S por DMA.</p><p>Estratégias: <strong>invalidação na escrita</strong> (write-invalidate — as outras cópias são invalidadas) ou <strong>atualização na escrita</strong> (write-update — as cópias recebem o novo valor). Implementação por <strong>snooping</strong> (cada cache escuta o barramento; bom para poucos processadores) ou por <strong>diretório</strong> (uma estrutura registra quem tem cada bloco; escala melhor).</p>`],
      ['MSI e MESI', `<p>No <strong>MSI</strong>, cada bloco está <strong>M</strong>odificado (única cópia válida, suja), <strong>S</strong>hared (compartilhado) (uma ou mais cópias limpas) ou <strong>I</strong>nválido. Uma escrita em S invalida as outras cópias e passa a M; uma leitura de outro processador de um bloco em M força a escrita de volta e ambos ficam em S.</p><p>O <strong>MESI</strong> acrescenta o estado <strong>E</strong>xclusivo (única cópia, limpa): se o processador escrever, passa a M sem gerar tráfego no barramento — vantajoso para dados privados.</p>`]
    ],
    exercicios: [
      ['Classifique segundo Flynn: (a) processador de um núcleo; (b) GPU executando a mesma operação em milhares de pixels; (c) servidor com 64 núcleos independentes.', '(a) SISD; (b) SIMD; (c) MIMD.'],
      ['Rastreie o MSI para o bloco X: P1 lê, P2 lê, P1 escreve, P2 lê. Informe o estado em cada cache após cada passo.', 'P1 lê: P1=S. P2 lê: P1=S, P2=S. P1 escreve: P1=M, P2=I. P2 lê: P1 grava X de volta e ambos ficam S.'],
      ['Qual a vantagem do estado E no MESI?', 'Quando um processador lê um bloco que nenhuma outra cache tem, ele fica em E; uma escrita posterior passa a M sem precisar invalidar ninguém no barramento.'],
      ['Por que protocolos de diretório escalam melhor que snooping?', 'Snooping difunde cada transação para todas as caches pelo barramento compartilhado, que satura com muitos processadores; o diretório envia mensagens só para as caches que têm o bloco.']
    ]
  },
  {
    id: 'u9', n: 9, titulo: 'Multithreading', sim: null,
    objetivos: ['Diferenciar multithreading de granularidade fina, grossa e simultâneo.', 'Explicar como o SMT aproveita recursos ociosos de um superescalar.', 'Relacionar multithreading e multicore.'],
    leitura: 'Patterson & Hennessy, cap. 6.4. Hennessy & Patterson, cap. 3.12. Stallings, cap. 17.',
    secoes: [
      ['Por que multithreading', `<p>Mesmo superescalares agressivos deixam unidades ociosas: o ILP de uma única thread é limitado e faltas de cache causam longas esperas. <strong>Multithreading</strong> explora o paralelismo entre threads (TLP) mantendo vários contextos (PC e registradores) no mesmo núcleo.</p>`],
      ['Três abordagens', `<ul><li><strong>Granularidade fina</strong>: alterna de thread a cada ciclo, escondendo paradas curtas e longas; atrasa a execução de cada thread individual.</li><li><strong>Granularidade grossa</strong>: troca de thread só em eventos longos (como falha na cache L2); não esconde paradas curtas e tem custo de esvaziar o pipeline na troca.</li><li><strong>Simultâneo (SMT)</strong>: em um superescalar com escalonamento dinâmico, emite no mesmo ciclo instruções de várias threads, preenchendo tanto os ciclos vazios quanto as vagas de emissão vazias. Exemplo: Hyper-Threading da Intel.</li></ul>`],
      ['Multithreading × multicore', `<p>Multicore replica núcleos inteiros; SMT compartilha os recursos de um núcleo entre threads. Processadores atuais combinam os dois (por exemplo, 8 núcleos com 2 threads cada). O ganho do SMT depende da carga: threads que disputam os mesmos recursos (como a cache) ganham pouco.</p>`]
    ],
    exercicios: [
      ['Explique a diferença entre desperdício vertical e horizontal em um superescalar e qual abordagem de multithreading ataca cada um.', 'Vertical: ciclos em que nenhuma instrução é emitida (atacado por granularidade fina, grossa e SMT). Horizontal: vagas de emissão vazias dentro de um ciclo (só o SMT ataca, emitindo de várias threads no mesmo ciclo).'],
      ['Por que o multithreading de granularidade grossa não esconde paradas curtas?', 'Porque a troca de thread esvazia e reabastece o pipeline, custando alguns ciclos; para paradas curtas, esse custo seria maior que o ganho.'],
      ['Um programa sequencial roda mais rápido num núcleo com SMT ativado? Explique.', 'Não necessariamente: com uma única thread não há outra para preencher as vagas; com o SMT dividindo recursos, pode até ficar um pouco mais lento.']
    ]
  },
  {
    id: 'u10', n: 10, titulo: 'Sistemas embarcados e tendências', sim: null,
    objetivos: ['Caracterizar sistemas embarcados e de tempo real.', 'Discutir particionamento entre hardware e software.', 'Analisar tendências: IoT, dispositivos vestíveis e computação ubíqua.'],
    leitura: 'Wolf, Computers as components, caps. 1 e 2. Stallings, cap. 1 (sistemas embarcados).',
    secoes: [
      ['O que é um sistema embarcado', `<p>Um sistema computacional <strong>dedicado</strong> a uma função específica dentro de um produto maior — de um forno de micro-ondas a um carro ou um marca-passo. Requisitos típicos: baixo custo, baixo consumo de energia, tamanho reduzido, confiabilidade e, muitas vezes, <strong>restrições de tempo real</strong> — <em>críticas</em> (hard: perder um prazo é falha, como num freio ABS) ou <em>não críticas</em> (soft: perder um prazo degrada a qualidade, como num player de vídeo).</p>`],
      ['Projeto: hardware ou software?', `<p>O <strong>projeto conjunto de hardware e software</strong> decide o que implementar em hardware dedicado (rápido e eficiente, mas caro e inflexível) e o que fica em software sobre um processador (flexível e barato de alterar). Plataformas comuns: microcontroladores (AVR, ARM Cortex-M), SoCs que integram processador, memória, rádio e periféricos num único chip (como o ESP32, com processador de dois núcleos e Wi-Fi/Bluetooth) e FPGAs.</p>`],
      ['Tendências', `<p><strong>Internet das Coisas</strong> e <strong>computação ubíqua</strong> espalham sensores e processamento pelo ambiente; dispositivos <strong>vestíveis</strong> monitoram saúde e apoiam a acessibilidade; a <strong>computação na borda</strong> (edge) leva inferência de IA para perto dos sensores, reduzindo latência e uso de rede. Arquiteturas abertas como <strong>RISC-V</strong> e aceleradores dedicados (NPUs) mostram que a especialização volta a ser o caminho para ganhar desempenho por watt.</p>`]
    ],
    exercicios: [
      ['Diferencie sistemas de tempo real críticos e não críticos com exemplos.', 'Críticos (hard): perder o prazo é falha grave — freio ABS, airbag, marca-passo. Não críticos (soft): perder o prazo degrada a qualidade — streaming de vídeo, jogos.'],
      ['Cite dois critérios para decidir se uma função de um sistema embarcado deve ir para hardware ou software.', 'Exigência de desempenho/tempo real (hardware), necessidade de alteração futura (software), consumo de energia, custo de desenvolvimento e volume de produção.'],
      ['Por que microcontroladores costumam usar arquitetura Harvard?', 'Memórias separadas permitem buscar instrução e acessar dado ao mesmo tempo com hardware simples, e o programa costuma ficar em memória flash enquanto os dados ficam em RAM.']
    ]
  }
];
  const todas = [...parte1.map(u => ({ ...u, parte: 1 })), ...parte2.map(u => ({ ...u, parte: 2 }))];
  todas.forEach((u, i) => { u.n = i + 1; u.id = 'u' + (i + 1); });
  UNIDADES_POR_DISC.arq = todas;
})();
