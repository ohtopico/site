/* Arquitetura de Computadores II — unidades */
UNIDADES_POR_DISC.arq2 = [
  {
    id: 'u1', n: 1, titulo: 'Revisão: caminho de dados e pipeline', semanas: '1', sim: 'mips',
    objetivos: ['Retomar o caminho de dados do MIPS e seus sinais de controle.', 'Revisar o pipeline de 5 estágios e a classificação de conflitos.', 'Calcular o CPI efetivo de um pipeline com paradas.'],
    leitura: 'Patterson & Hennessy, cap. 4. Hennessy & Patterson (abordagem quantitativa), apêndice C.',
    secoes: [
      ['O ponto de partida', `<p>Arquitetura I terminou no <strong>pipeline escalar</strong> de 5 estágios (IF, ID, EX, MEM, WB), que idealmente conclui <strong>uma instrução por ciclo</strong> (CPI = 1). Arquitetura II estuda como ir além disso: executar várias instruções por ciclo (IPC &gt; 1), esconder a latência da memória e usar vários processadores.</p>`],
      ['Conflitos e suas soluções', `<ul><li><strong>Estruturais</strong>: recursos duplicados (memórias de instrução e de dados separadas).</li><li><strong>De dados</strong>: adiantamento; bolha para o caso load-uso; reordenação pelo compilador.</li><li><strong>De controle</strong>: resolução do desvio em ID, previsão (estática ou dinâmica de 2 bits), desvio adiado.</li></ul>`],
      ['CPI com paradas', `<p>No pipeline real, <code>CPI = 1 + ciclos de parada por instrução</code>. Exemplo: 20% das instruções são loads e metade delas é seguida por uma instrução dependente (1 bolha); 15% são desvios com penalidade de 1 ciclo. CPI = 1 + 0,20 × 0,5 × 1 + 0,15 × 1 = <strong>1,25</strong>. Para baixar o CPI abaixo de 1 é preciso <strong>emitir mais de uma instrução por ciclo</strong> — assunto das próximas unidades.</p>`]
    ],
    exercicios: [
      ['Por que o pipeline escalar não consegue CPI menor que 1?', 'Porque emite no máximo uma instrução por ciclo; mesmo sem nenhuma parada, conclui uma instrução por ciclo.'],
      ['Calcule o CPI: 25% de loads, 40% deles seguidos de uso imediato (1 bolha); 10% de desvios, 30% com previsão errada e penalidade de 2 ciclos.', '1 + 0,25×0,4×1 + 0,10×0,3×2 = 1 + 0,10 + 0,06 = 1,16.'],
      ['Classifique o conflito: duas instruções querem acessar a mesma memória única no mesmo ciclo.', 'Conflito estrutural.']
    ]
  },
  {
    id: 'u2', n: 2, titulo: 'Paralelismo em nível de instrução e superescalares', semanas: '2–3', sim: null,
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
    id: 'u3', n: 3, titulo: 'Escalonamento estático e VLIW', semanas: '4', sim: null,
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
    id: 'u4', n: 4, titulo: 'Escalonamento dinâmico: Scoreboard e Tomasulo', semanas: '5–6', sim: null,
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
    id: 'u5', n: 5, titulo: 'Hierarquia de memória e cache', semanas: '7–8', sim: 'cache',
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
    id: 'u6', n: 6, titulo: 'Memória virtual', semanas: '10', sim: null,
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
    id: 'u7', n: 7, titulo: 'Armazenamento, barramentos e E/S', semanas: '11', sim: null,
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
    id: 'u8', n: 8, titulo: 'Multiprocessadores e coerência de cache', semanas: '12–13', sim: null,
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
    id: 'u9', n: 9, titulo: 'Multithreading', semanas: '14', sim: null,
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
    id: 'u10', n: 10, titulo: 'Sistemas embarcados e tendências', semanas: '15', sim: null,
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
