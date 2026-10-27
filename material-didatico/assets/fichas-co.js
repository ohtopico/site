/* =====================================================================
   Fichas desplugadas de Computação (BNCC Computação, 6º ao 9º ano).
   Uma ficha para cada habilidade que ainda não tinha ficha própria.
   Carregado só por ficha.html, que chama FICHAS_CO(utilidades) e junta
   o resultado às demais fichas. Cada ficha tem a folha do estudante e um
   gabarito com as orientações de condução para o professor.
   O registro no catálogo fica em dados.js (ids f-co-*).
   ===================================================================== */
window.FICHAS_CO = function ({ head, sheet, lines, malha }) {
  const tabela = (cab, linhas, cls) => `<table class="t${cls ? ' ' + cls : ''}"><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr>${linhas.map(l => `<tr>${l.map(c => c === '' ? '<td style="height:32px"></td>' : `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  const vazias = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(''));
  const check = itens => `<ul class="check">${itens.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const quadro = (h, rot) => `<div class="cut" style="height:${h}px;border-style:solid">${rot ? `<span class="small muted">${rot}</span>` : ''}</div>`;
  const pre = txt => `<pre style="font-family:ui-monospace,Consolas,monospace;font-size:14px;border:1.2px solid #111;border-radius:8px;padding:10px 12px;margin:6px 0;white-space:pre-wrap">${txt}</pre>`;
  /* caixa com texto em SVG */
  const caixa = (x, y, w, h, t, tracejada, fs) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff" stroke="#111" stroke-width="1.6"${tracejada ? ' stroke-dasharray="6 5"' : ''}/>` + (t ? `<text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="${fs || 14}">${t}</text>` : '');
  const seta = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#111" stroke-width="1.6" marker-end="url(#co-ar)"/>`;
  const defs = `<defs><marker id="co-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L10 5L0 10z" fill="#111"/></marker></defs>`;

  return {
    /* ============================ 6º ANO ============================ */
    'f-co-tipos': () => sheet(`${head('Atividade desplugada')}
      <p>Todo dado tem um <strong>tipo</strong>: texto, número inteiro, número decimal, lógico (verdadeiro ou falso) ou data. O tipo diz o que o computador pode fazer com o dado. Pergunta-chave: <em>vou fazer conta com isso?</em></p>
      <h2>1. Que tipo é?</h2>
      <p>Esta é a ficha de uma estudante. Escreva o tipo de cada informação e explique a escolha.</p>
      ${tabela(['Informação', 'Valor', 'Tipo', 'Por quê?'], [
        ['Nome', 'Ana Souza', '', ''], ['Idade', '12', '', ''], ['Nota de Ciências', '7,5', '', ''], ['Tem irmãos?', 'sim', '', ''],
        ['Telefone', '(51) 99999-0000', '', ''], ['Data de nascimento', '03/05/2014', '', ''], ['Altura', '1,52 m', '', ''], ['CEP', '95700-000', '', ''],
        ['Número de irmãos', '2', '', ''], ['Chegou atrasada hoje?', 'não', '', '']])}
      <h2>2. Coleções da turma</h2>
      <p>Imagine as fichas de todos os colegas. Agrupe as informações em quatro coleções, uma para cada tipo.</p>
      ${tabela(['Coleção de textos', 'Coleção de inteiros', 'Coleção de decimais', 'Coleção de lógicos'], vazias(3, 4))}
      <h2>3. O computador e os tipos</h2>
      <p>Para o computador, 12 + 3 = 15, mas “12” + “3” = “123”. Explique por que o resultado muda.</p>${lines(2)}
      <h2>4. Crie um cadastro</h2>
      <p>Invente o cadastro de um livro da biblioteca com cinco informações e o tipo de cada uma.</p>${lines(3)}`),
    'f-co-tipos:gab': `<p><strong>Condução (30 a 40 min):</strong> duplas. Leia em voz alta a pergunta-chave e resolva a primeira linha com a turma. Na parte 2, peça que cada dupla compare as coleções com outra dupla antes da correção.</p>
      <p><strong>Gabarito.</strong> 1) Nome: texto. Idade: inteiro. Nota: decimal. Tem irmãos: lógico. Telefone: texto (não se faz conta e tem parênteses e hífen). Data de nascimento: data. Altura: decimal. CEP: texto (é um código, o zero à esquerda importa). Número de irmãos: inteiro. Chegou atrasada: lógico. 2) Textos: nomes, telefones, CEPs; inteiros: idades, números de irmãos; decimais: notas, alturas; lógicos: tem irmãos, chegou atrasada (datas formam uma quinta coleção). 3) Números são somados; textos são juntados, um depois do outro. 4) Exemplo: título (texto), autor (texto), ano (inteiro), páginas (inteiro), disponível (lógico).</p>`,

    'f-co-maquinas': () => sheet(`${head('Atividade desplugada')}
      <p>Uma <strong>máquina</strong> recebe uma <strong>entrada</strong>, aplica uma regra e devolve uma <strong>saída</strong>. Descobrir a regra é descobrir o algoritmo.</p>
      <h2>1. Máquinas misteriosas</h2>
      <p>Descubra a regra de cada máquina, complete o que falta e escreva o tipo da entrada e da saída.</p>
      ${tabela(['Máquina', 'Exemplos (entrada → saída)', 'Complete', 'Regra', 'Tipo da entrada', 'Tipo da saída'], [
        ['A', '2 → 4 · 5 → 10 · 7 → 14', '10 → ____', '', '', ''],
        ['B', '3 → 7 · 4 → 9 · 10 → 21', '____ → 15', '', '', ''],
        ['C', '“gato” → 4 · “sol” → 3', '“computador” → ____', '', '', ''],
        ['D', '4 → verdadeiro · 7 → falso · 10 → verdadeiro', '13 → ____', '', '', '']])}
      <h2>2. Invente uma máquina</h2>
      <p>Escreva três exemplos da sua máquina e troque com outra dupla. Ela consegue descobrir a regra?</p>
      ${tabela(['Entrada', 'Saída'], vazias(3, 2))}
      <p>Regra (só mostre depois): ______________________________________________</p>
      <h2>3. Do problema à solução</h2>
      <p>Problema: calcular a média de duas notas de um estudante e dizer se ele passou (média 6 ou mais).</p>
      ${tabela(['', 'Quais são?', 'De que tipo?'], [['Entradas', '', ''], ['Saídas', '', '']])}
      <p>Passos da solução:</p>${lines(3)}`),
    'f-co-maquinas:gab': `<p><strong>Condução (30 min):</strong> comece fazendo a máquina A em voz alta: você diz a entrada e a turma tenta adivinhar a saída. Depois as duplas seguem sozinhas. A parte 3 prepara o 7º ano (registros) e o uso de variáveis.</p>
      <p><strong>Gabarito.</strong> 1) A: dobra o número, 10 → 20; inteiro → inteiro. B: dobra e soma 1, 7 → 15; inteiro → inteiro. C: conta as letras, “computador” → 10; texto → inteiro. D: diz se o número é par, 13 → falso; inteiro → lógico. 3) Entradas: nota 1 e nota 2 (decimais). Saídas: média (decimal) e “passou?” (lógico, ou o texto “Aprovado”/“Recuperação”). Passos: ler as duas notas; somar e dividir por 2; se a média for maior ou igual a 6, escrever “Aprovado”, senão “Recuperação”.</p>`,

    'f-co-generalizar': () => sheet(`${head('Generalização com parâmetros')}
      <p><strong>Generalizar</strong> é olhar vários casos parecidos e escrever um algoritmo que resolva todos. O que muda de um caso para outro vira um <strong>parâmetro</strong>.</p>
      <h2>1. Suco para quantas pessoas?</h2>
      <p>Receita para 2 pessoas: 4 laranjas, 1 colher de açúcar e 2 copos de água. Complete a tabela.</p>
      ${tabela(['Pessoas', 'Laranjas', 'Colheres de açúcar', 'Copos de água'], [['2', '4', '1', '2'], ['4', '', '', ''], ['6', '', '', ''], ['30', '', '', ''], ['<strong>p</strong>', '', '', '']])}
      <h2>2. A tartaruga que desenha</h2>
      <p>A tartaruga anda e vira. Complete os programas e descubra o padrão.</p>
      ${tabela(['Figura', 'Programa', 'Quanto vira?'], [['Triângulo', 'repita 3 vezes: ande 50, vire ____', ''], ['Quadrado', 'repita 4 vezes: ande 50, vire ____', ''], ['Pentágono', 'repita ____ vezes: ande 50, vire ____', ''], ['Hexágono', 'repita ____ vezes: ande 50, vire ____', '']])}
      <p>Agora escreva um único programa <strong>polígono(n, lado)</strong> que desenhe qualquer polígono regular:</p>
      ${pre('polígono(n, lado):\n    repita ____ vezes\n        ande ____\n        vire ____\n    fim')}
      <h2>3. Quais são os parâmetros?</h2>
      <p>a) Na receita do suco: ______________________ &nbsp; b) No programa da tartaruga: ______________________</p>
      <p>c) Dê outro exemplo do dia a dia em que um mesmo “molde” serve para vários casos.</p>${lines(2)}`),
    'f-co-generalizar:gab': `<p><strong>Condução (35 min):</strong> faça a linha de 4 pessoas no quadro e pergunte o que mudou. Na parte 2, se houver espaço, um estudante faz a tartaruga no chão e vira com o corpo. Destaque que a soma das viradas é sempre 360 graus.</p>
      <p><strong>Gabarito.</strong> 1) 4 pessoas: 8, 2, 4; 6 pessoas: 12, 3, 6; 30 pessoas: 60, 15, 30; p pessoas: 2 × p laranjas, p ÷ 2 colheres e p copos. 2) Triângulo: 120; quadrado: 90; pentágono: 5 vezes, 72; hexágono: 6 vezes, 60. Programa geral: repita n vezes, ande lado, vire 360 ÷ n. 3) a) o número de pessoas p; b) n e lado; c) exemplos: convite de aniversário (muda o nome), boletim (muda o estudante), cálculo da conta de luz (muda o consumo).</p>`,

    'f-co-arquivos': () => sheet(`${head('Organização de arquivos')}
      <p>Um computador bem organizado tem <strong>pastas</strong> com nomes claros, arquivos com <strong>nomes padronizados</strong> e cuidado com os <strong>metadados</strong>, que são dados sobre o arquivo (data, autor, local, tamanho).</p>
      <h2>1. A pasta bagunçada</h2>
      <p>Estes arquivos estão todos soltos na área de trabalho:</p>
      <p class="mono" style="letter-spacing:.02em;font-size:14px">foto1.jpg · trabalho.docx · trabalho2.docx · IMG_2034.jpg · prova mat.pdf · musica.mp3 · resumo historia.docx · video festa junina.mp4</p>
      <p>Desenhe uma árvore de pastas para organizar tudo. Escreva o nome de cada pasta e onde cada arquivo vai ficar.</p>
      ${quadro(200)}
      <h2>2. Renomeie com um padrão</h2>
      <p>Use o padrão <strong>ano-mês-dia_assunto</strong> (exemplo: 2026-10-27_resumo-historia.docx). Invente as datas.</p>
      ${tabela(['Nome antigo', 'Nome novo'], [['trabalho.docx', ''], ['trabalho2.docx', ''], ['IMG_2034.jpg', ''], ['prova mat.pdf', '']])}
      <h2>3. Metadados de uma foto</h2>
      ${tabela(['Metadado', 'Valor', 'Apagaria antes de postar? (sim ou não)'], [['Data e hora', '14/09/2026 07:42', ''], ['Localização (GPS)', 'Rua das Flores, 120', ''], ['Modelo do celular', 'Marca X, modelo 12', ''], ['Tamanho', '3,2 MB', ''], ['Autor', 'Ana Souza', '']])}
      <h2>4. Compactar</h2>
      <p>Para que serve compactar vários arquivos em um só arquivo .zip?</p>${lines(2)}`),
    'f-co-arquivos:gab': `<p><strong>Condução (35 min):</strong> mostre, se possível, o explorador de arquivos e as propriedades de uma foto. As duplas comparam as árvores: não existe uma única resposta certa, mas os nomes das pastas devem dizer o que há dentro.</p>
      <p><strong>Gabarito.</strong> 1) Exemplo: Escola (Matemática, História, Trabalhos), Fotos (Festa junina), Músicas, Vídeos. 2) Exemplo: 2026-08-10_trabalho-ciencias.docx; o padrão com ano primeiro deixa os arquivos em ordem cronológica. 3) Apagar a localização, que mostra onde a pessoa mora ou estuda; o autor e a data e hora também podem expor a rotina. 4) Ocupar menos espaço, enviar mais rápido e juntar vários arquivos num só para mandar por e-mail ou guardar.</p>`,

    'f-co-respeito': () => sheet(`${head('Convivência digital')}
      <p>Do outro lado da tela tem uma pessoa. Uma mensagem escrita não tem tom de voz nem expressão no rosto, por isso pode ser entendida de um jeito mais duro do que queríamos.</p>
      <h2>1. Reescreva com respeito</h2>
      <p>Mantenha a ideia, mas mude o jeito de dizer.</p>
      ${tabela(['Mensagem original', 'Versão com respeito'], [['“Ninguém pediu sua opinião.”', ''], ['“Responde logo!”', ''], ['“Que trabalho horrível.”', ''], ['“Sai do grupo.”', '']])}
      <h2>2. Pegada digital</h2>
      <p>Tudo o que publicamos deixa um rastro. Marque com <strong>+</strong> o que deixa uma boa pegada e com <strong>–</strong> o que pode prejudicar alguém.</p>
      ${tabela(['Ação', '+ ou –'], [['Postar print de conversa de um colega sem pedir', ''], ['Agradecer quem ajudou no trabalho em grupo', ''], ['Marcar um colega numa foto em que ele não gostou de sair', ''], ['Discordar de uma ideia explicando o motivo', ''], ['Compartilhar o endereço de alguém', ''], ['Avisar a professora sobre uma mensagem ofensiva', '']].map(l => [l[0], `<span style="display:block;width:50px"></span>`]))}
      <h2>3. Combinados da turma</h2>
      <p>Escreva três regras para os grupos de mensagem da turma.</p>${lines(3)}`),
    'f-co-respeito:gab': `<p><strong>Condução (30 min):</strong> duplas. Leia uma das mensagens com tons diferentes para mostrar como o texto escrito pode soar. Junte as regras da parte 3 num cartaz da turma.</p>
      <p><strong>Gabarito.</strong> 1) Exemplos: “Prefiro que a gente decida juntos”; “Quando puder, me responde, por favor”; “Acho que dá para melhorar a introdução”; “Esse grupo é só para o trabalho, vamos manter o assunto”. 2) – print sem pedir; + agradecer; – marcar sem permissão; + discordar com argumento; – compartilhar endereço; + avisar a professora. 3) Exemplos: pedir antes de postar foto de alguém, não usar letras maiúsculas para gritar, discordar da ideia e não da pessoa.</p>`,

    'f-co-aparelho': () => sheet(`${head('Tecnologia e sustentabilidade')}
      <p>Todo aparelho eletrônico tem uma história: começa na mineração, passa pela fábrica e pelo transporte, chega até nós e um dia vira lixo. Quanto mais tempo ele dura, menor o impacto.</p>
      <h2>1. O ciclo de vida</h2>
      <p>Escolha um aparelho de casa (celular, TV, videogame...) e complete cada etapa com uma frase.</p>
      <svg viewBox="0 0 760 150" width="100%" role="img" aria-label="Cinco etapas em sequência: materiais, fábrica, transporte, uso e descarte">${defs}
        ${['Materiais', 'Fábrica', 'Transporte', 'Uso', 'Descarte'].map((t, i) => caixa(8 + i * 152, 14, 128, 40, t) + caixa(8 + i * 152, 64, 128, 76, '', true) + (i < 4 ? seta(138 + i * 152, 34, 158 + i * 152, 34) : '')).join('')}
      </svg>
      <h2>2. O meu aparelho</h2>
      ${tabela(['Pergunta', 'Resposta'], [['Que aparelho é?', ''], ['Há quanto tempo é usado?', ''], ['Por que seria trocado?', ''], ['Ele ainda funciona?', ''], ['Dá para consertar? Onde?', '']])}
      <h2>3. Obsolescência</h2>
      <p>Obsolescência programada é quando um produto é feito para durar menos ou ser difícil de consertar. Você já viu um caso? Conte.</p>${lines(2)}
      <h2>4. Duas ações para o aparelho durar mais</h2>${lines(2)}
      <h2>5. Reduzir, reutilizar ou reciclar?</h2>
      <p>Dê um exemplo de cada um com eletrônicos.</p>${lines(3)}`),
    'f-co-aparelho:gab': `<p><strong>Condução (35 min):</strong> grupos de 3 ou 4. Antes de preencher, pergunte de onde vêm os metais de um celular. Peça que o grupo apresente o aparelho que dura há mais tempo em casa.</p>
      <p><strong>Gabarito.</strong> 1) Materiais: metais e plástico extraídos da natureza (lítio, cobre, ouro, petróleo); fábrica: montagem com muita energia e água; transporte: navios e caminhões; uso: energia elétrica e carregadores; descarte: ponto de coleta de eletrônicos, nunca o lixo comum. 3) Exemplos: bateria que não pode ser trocada, peça que não é vendida, aparelho que deixa de receber atualizações. 4) Usar capa e película, cuidar da bateria, consertar em vez de trocar, apagar o que não usa. 5) Reduzir: não trocar de celular todo ano; reutilizar: doar o aparelho antigo; reciclar: levar a um ponto de coleta.</p>`,

    /* ============================ 7º ANO ============================ */
    'f-co-registros': () => sheet(`${head('Registros e vetores')}
      <p>Um <strong>registro</strong> junta várias informações sobre uma mesma coisa (como a ficha de um estudante). Cada informação é um <strong>campo</strong>. Um <strong>vetor</strong> guarda vários valores do mesmo tipo em posições numeradas a partir de 0.</p>
      <h2>1. Desenhe a ficha</h2>
      <p>Escolha três campos para a ficha de um estudante e o tipo de cada um.</p>
      ${tabela(['Campo', 'Tipo'], vazias(3, 2))}
      <h2>2. Preencha quatro registros</h2>
      <p>Podem ser estudantes inventados.</p>
      ${tabela(['Registro', 'Campo 1:', 'Campo 2:', 'Campo 3:'], [['0', '', '', ''], ['1', '', '', ''], ['2', '', '', ''], ['3', '', '', '']])}
      <h2>3. Monte um vetor</h2>
      <p>Escolha um campo numérico e coloque os valores dos quatro registros nas posições.</p>
      <div class="boxes" style="grid-template-columns:repeat(4,1fr)">${[0, 1, 2, 3].map(i => `<span>posição ${i}</span>`).join('')}</div>
      <h2>4. Leitura de vetor</h2>
      <p>No vetor <span class="mono" style="letter-spacing:.04em">notas = [5, 9, 3, 8]</span>: o que está na posição 0? ____ &nbsp; E na posição 3? ____ &nbsp; Quantos itens ele tem? ____</p>
      <h2>5. A maior nota</h2>
      <p>Escreva em passos como encontrar a maior nota de um vetor, olhando um item de cada vez.</p>${lines(4)}`),
    'f-co-registros:gab': `<p><strong>Condução (35 min):</strong> grupos de 3. Mostre no quadro uma tabela de planilha: cada linha é um registro, cada coluna um campo. Faça a parte 5 com um vetor no quadro, com os estudantes dizendo “guardo esse” ou “troco”.</p>
      <p><strong>Gabarito.</strong> 1) Exemplo: nome (texto), idade (inteiro), nota (decimal). 3) O vetor tem um valor de cada registro, na mesma ordem. 4) Posição 0: 5; posição 3: 8; 4 itens. 5) Guardar o primeiro valor como “maior até agora”; para cada um dos outros, se ele for maior que o guardado, trocar o guardado por ele; no fim, o guardado é a maior nota (no exemplo, 9).</p>`,

    'f-co-bugs': () => sheet(`${head('Depuração de programas')}
      <p>Um <strong>bug</strong> é um erro no programa. O erro de <strong>sintaxe</strong> impede o programa de rodar; o erro de <strong>lógica</strong> deixa o programa rodar, mas com a resposta errada. Para achar bugs, fazemos o <strong>teste de mesa</strong>: seguimos o programa linha a linha anotando os valores.</p>
      <h2>1. Caça aos bugs</h2>
      <p>Cada programa tem um erro. Descreva o erro e escreva a correção.</p>
      <div class="two">
        <div><p><strong>A)</strong> Desenhar um quadrado:</p>${pre('repita 4 vezes\n    ande 10\n    vire 60\nfim')}</div>
        <div><p><strong>B)</strong> Quem tem 16 anos ou mais pode votar:</p>${pre('leia idade\nse idade > 16 então\n    escreva "pode votar"\nfim')}</div>
        <div><p><strong>C)</strong> Total da compra:</p>${pre('leia preço\ntotal ← preço × quantidade\nescreva total')}</div>
        <div><p><strong>D)</strong> Média de duas notas:</p>${pre('leia n1, n2\nmédia ← n1 + n2 / 2\nescreva média')}</div>
      </div>
      ${tabela(['Programa', 'Qual é o erro?', 'Correção'], [['A', '', ''], ['B', '', ''], ['C', '', ''], ['D', '', '']])}
      <h2>2. Teste de mesa do programa D</h2>
      ${tabela(['n1', 'n2', 'média (programa errado)', 'média (programa corrigido)'], [['6', '8', '', ''], ['10', '4', '', ''], ['7', '7', '', '']])}
      <h2>3. Por que testar com valores de borda?</h2>
      <p>No programa B, que valor de idade revela o erro? Por que é importante testar valores assim?</p>${lines(2)}`),
    'f-co-bugs:gab': `<p><strong>Condução (35 min):</strong> duplas. Faça o teste de mesa do programa A no quadro desenhando o caminho: o desenho não fecha. Lembre que na matemática a divisão é feita antes da soma, como no programa.</p>
      <p><strong>Gabarito.</strong> 1) A: vira 60 graus, o desenho não fecha; trocar por vire 90 (erro de lógica). B: quem tem exatamente 16 anos fica de fora; trocar por idade ≥ 16 (lógica). C: a quantidade nunca foi lida; acrescentar “leia quantidade” antes do cálculo (falta de entrada). D: a divisão é feita antes da soma; trocar por média ← (n1 + n2) / 2 (lógica). 2) Errado: 6 + 4 = 10; 10 + 2 = 12; 7 + 3,5 = 10,5. Corrigido: 7; 7; 7. 3) A idade 16, que fica bem no limite da condição; os erros costumam aparecer nas bordas.</p>`,

    'f-co-projeto7': () => sheet(`${head('Projeto com programação')}
      <p>Todo projeto começa com um problema e com as pessoas que vão usar a solução. Esta folha é o plano do projeto do grupo, em uma página.</p>
      ${tabela(['Item', 'O grupo decide'], [['Matéria', ''], ['Problema', ''], ['Para quem é?', ''], ['Frase do projeto', 'O programa vai ______________________ para ______________________.']])}
      <h2>1. Decomposição</h2>
      <p>Quebre o programa em 3 a 5 partes.</p>
      ${tabela(['Parte', 'O que faz', 'Responsável'], vazias(5, 3))}
      <h2>2. Estruturas que vamos usar</h2>
      ${check(['Variável (guardar um valor)', 'Lista ou vetor (vários itens do mesmo tipo)', 'Repetição (fazer várias vezes)', 'Seleção (se... senão)', 'Função ou bloco próprio (reúso)', 'Entrada do usuário (perguntar e ler a resposta)'])}
      <h2>3. Papéis no grupo</h2>
      ${tabela(['Papel', 'Nome'], [['Coordenação (organiza o tempo)', ''], ['Programação', ''], ['Testes (procura e anota bugs)', ''], ['Apresentação', '']])}
      <h2>4. Cronograma</h2>
      ${tabela(['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'], vazias(1, 4).map(l => l.map(() => '<div style="height:60px"></div>')))}`),
    'f-co-projeto7:gab': `<p><strong>Condução (40 min na primeira aula do projeto):</strong> grupos de 4. A folha é o contrato do grupo: guarde uma cópia. Exemplos de problemas: quiz de revisão de Ciências, calculadora de média para o boletim, jogo de tabuada, linha do tempo interativa de História.</p>
      <p><strong>O que conferir.</strong> A frase do projeto deve dizer o que o programa faz e para quem; as partes devem ser pequenas o suficiente para uma pessoa fazer em uma aula; deve haver pelo menos uma lista e uma repetição; o responsável pelos testes registra os bugs antes da apresentação. Avalie também a divisão justa das tarefas.</p>`,

    'f-co-seguranca7': () => sheet(`${head('Segurança cibernética')}
      <p>Golpes digitais costumam ter sinais em comum: <strong>pressa</strong>, <strong>prêmio</strong>, <strong>link estranho</strong> e <strong>pedido de senha ou código</strong>. As mensagens abaixo são inventadas.</p>
      <h2>1. Detetive de golpes</h2>
      <div class="msg"><strong>1.</strong> “Parabéns! Você ganhou um celular novo. Clique em premio-agora.top em até 10 minutos para retirar.”</div>
      <div class="msg"><strong>2.</strong> “Oi, aqui é do suporte do jogo. Me passa o código que chegou por SMS para liberar a sua conta.”</div>
      <div class="msg"><strong>3.</strong> “Escola: a reunião com as famílias será quinta-feira, às 19h, no auditório. Dúvidas na secretaria.”</div>
      <div class="msg"><strong>4.</strong> “Banco: sua conta será bloqueada HOJE. Atualize seus dados no link abaixo.”</div>
      ${tabela(['Mensagem', 'Sinais encontrados', 'Golpe ou verdadeira?'], [['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', '']])}
      <h2>2. Senha forte</h2>
      <p>Classifique as senhas como fraca ou forte e explique.</p>
      ${tabela(['Senha', 'Fraca ou forte?', 'Por quê?'], [['123456', '', ''], ['maria2012', '', ''], ['Tres-Bananas-Pulam-No-Rio!', '', ''], ['senha', '', '']])}
      <p>Crie uma senha com uma frase (só para treinar, não use de verdade): ______________________________</p>
      <h2>3. Proteção</h2>
      <p>a) O que é verificação em duas etapas? ${lines(1)}</p>
      <p>b) Por que não usar a mesma senha em todas as contas? ${lines(1)}</p>`),
    'f-co-seguranca7:gab': `<p><strong>Condução (30 min):</strong> duplas. Leia as mensagens em voz alta com tom de urgência. Combine com a turma: ninguém escreve senhas verdadeiras na folha. Complete com o jogo Golpe ou Seguro?.</p>
      <p><strong>Gabarito.</strong> 1) Mensagem 1: prêmio, pressa, link estranho, golpe. 2: pedido de código, golpe (nenhum suporte pede código). 3: não pede nada nem tem link, verdadeira. 4: pressa, ameaça, link, golpe (o banco não pede dados por link). 2) 123456: fraca, sequência óbvia; maria2012: fraca, nome e ano fáceis de adivinhar; Tres-Bananas-Pulam-No-Rio!: forte, longa, com maiúsculas, símbolos e fácil de lembrar; senha: fraca. 3a) Além da senha, um código extra que chega no celular ou num aplicativo. 3b) Se uma senha vazar, todas as contas ficam em risco.</p>`,

    'f-co-empatia': () => sheet(`${head('Empatia na web')}
      <p>Ter empatia não é concordar: é tentar entender o outro mesmo quando pensamos diferente. Numa discussão saudável, atacamos a <strong>ideia</strong>, nunca a <strong>pessoa</strong>.</p>
      <h2>1. Debate com regras</h2>
      <p>Tema: <strong>o melhor lanche é doce ou salgado?</strong> Escreva dois argumentos do seu lado. Depois, ouça o outro lado e repita com suas palavras o argumento dele antes de responder.</p>
      ${tabela(['Meu lado: ________', 'O argumento do outro lado, com as minhas palavras'], vazias(2, 2).map(l => l.map(() => '<div style="height:44px"></div>')))}
      <h2>2. Ataca a ideia ou a pessoa?</h2>
      ${tabela(['Comentário', 'Ideia ou pessoa?'], [['“Não concordo, porque o salgado sustenta mais.”', ''], ['“Só alguém sem noção gosta de doce.”', ''], ['“Você é ridículo.”', ''], ['“Entendi seu ponto, mas eu vejo diferente.”', ''], ['“Essa opinião é de quem não sabe nada.”', '']])}
      <h2>3. Reescreva</h2>
      <p>Escolha um comentário que ataca a pessoa e reescreva atacando só a ideia.</p>${lines(2)}
      <h2>4. Antes de responder um comentário</h2>
      <p>Escreva três perguntas que você pode fazer a si mesmo antes de responder alguém na internet.</p>${lines(3)}`),
    'f-co-empatia:gab': `<p><strong>Condução (35 min):</strong> divida a turma em dois lados. A regra de ouro: ninguém responde sem antes repetir o argumento do outro. No fechamento, pergunte se alguém mudou de ideia e como se sentiu quando foi bem ou mal compreendido.</p>
      <p><strong>Gabarito.</strong> 2) Ideia; pessoa; pessoa; ideia; pessoa. 3) Exemplo: “Eu prefiro salgado, mas entendo quem gosta de doce depois do almoço.” 4) Exemplos: eu li tudo e entendi? Eu diria isso cara a cara? Minha resposta ajuda a conversa ou só machuca?</p>`,

    'f-co-cyberbullying': () => sheet(`${head('Cyberbullying')}
      <p><strong>Cyberbullying</strong> é a agressão repetida pela internet: humilhar, ameaçar, excluir ou espalhar mentiras e imagens de alguém. Na brincadeira, todos se divertem; no cyberbullying, só um lado ri.</p>
      <h2>1. O que eu faria?</h2>
      <p>Situação: um meme com a foto de um colega está circulando no grupo da turma, com risadas e comentários.</p>
      ${tabela(['Papel', 'O que essa pessoa pode fazer?'], [['Quem sofre', ''], ['Quem assiste', ''], ['Quem postou', ''], ['A escola', '']].map(l => [l[0], '<div style="height:44px"></div>']))}
      <p>Qual é a melhor ação de quem assiste? Por quê?</p>${lines(2)}
      <h2>2. Brincadeira ou cyberbullying?</h2>
      ${tabela(['Situação', 'Brincadeira ou cyberbullying?'], [['Amigos trocam figurinhas engraçadas e todos riem juntos.', ''], ['Um grupo cria um perfil falso para zombar de uma colega.', ''], ['Toda semana, alguém comenta “feio” nas fotos de um colega.', ''], ['Uma turma tira o colega do grupo e espalha um print dele.', '']])}
      <h2>3. Cartaz de combinados</h2>
      <p>Escreva duas regras para o cartaz da turma.</p>${lines(2)}`),
    'f-co-cyberbullying:gab': `<p><strong>Condução (35 min):</strong> grupos. Use nomes inventados e não peça relatos pessoais em voz alta; deixe um canal para quem quiser conversar depois, em particular. Monte o cartaz com as regras dos grupos.</p>
      <p><strong>Gabarito.</strong> 1) Quem sofre: não revidar, guardar provas (prints), bloquear e contar a um adulto de confiança. Quem assiste: não rir nem compartilhar, apoiar o colega em particular e avisar um adulto; é a ação que mais muda a situação, porque o agressor perde a plateia. Quem postou: apagar, pedir desculpas e reparar. Escola: acolher, investigar e envolver as famílias, como prevê a Lei 13.185/2015 (Programa de Combate à Intimidação Sistemática). 2) Brincadeira; cyberbullying; cyberbullying; cyberbullying.</p>`,

    'f-co-descarte': () => sheet(`${head('Lixo eletrônico')}
      <p>Pilhas, baterias e placas de eletrônicos têm metais pesados que contaminam o solo e a água. Por isso o lixo eletrônico nunca vai para o lixo comum. Pela <strong>logística reversa</strong>, fabricantes e lojas recebem o produto de volta para dar o destino correto.</p>
      <h2>1. Eletrônicos parados em casa</h2>
      <p>Liste de memória os eletrônicos que estão sem uso na sua casa e decida o destino de cada um.</p>
      ${tabela(['Eletrônico', 'Funciona?', 'Consertar, doar ou reciclar?', 'Por quê?'], vazias(5, 4))}
      <h2>2. Antes de descartar um celular</h2>
      ${check(['Fazer cópia das fotos e contatos', '____________________________________', '____________________________________', 'Levar a um ponto de coleta de eletrônicos'])}
      <h2>3. Onde descartar perto da escola?</h2>
      <p>Anote o ponto de coleta pesquisado com a professora.</p>${lines(1)}
      <h2>4. Aviso para a família</h2>
      <p>Escreva um aviso curto, em até três frases, sobre o descarte correto de eletrônicos.</p>
      ${quadro(110)}`),
    'f-co-descarte:gab': `<p><strong>Condução (30 min):</strong> grupos. Antes da aula, procure um ponto de coleta no município (lojas de eletrônicos, supermercados e prefeituras costumam ter). O aviso pode virar mensagem para o grupo das famílias.</p>
      <p><strong>Gabarito.</strong> 1) Respostas pessoais; aparelhos que funcionam podem ser doados, os quebrados podem ser consertados ou reciclados. 2) Apagar os dados (restaurar o aparelho), sair das contas, tirar o chip e o cartão de memória. A logística reversa está na Política Nacional de Resíduos Sólidos (Lei 12.305/2010).</p>`,

    'f-co-roteiro': () => sheet(`${head('Produção digital')}
      <p>Produzir um vídeo, um podcast ou um site passa por quatro etapas: <strong>planejar, produzir, editar e publicar</strong>. Documentar é registrar quem fez o quê, as fontes e as licenças usadas.</p>
      <h2>1. Formato e tema</h2>
      ${check(['Vídeo curto', 'Podcast', 'Site ou blog', 'Cartaz digital'])}
      <p>Tema: ______________________________________ &nbsp; Público: ______________________</p>
      <p>Mensagem principal, em uma frase:</p>${lines(1)}
      <h2>2. Roteiro</h2>
      ${tabela(['Parte', 'O que vai aparecer ou ser dito', 'Tempo'], [['Começo', '', ''], ['Meio', '', ''], ['Fim', '', '']].map(l => [l[0], '<div style="height:48px"></div>', '']))}
      <h2>3. Papéis</h2>
      ${tabela(['Roteiro', 'Gravação', 'Edição', 'Divulgação'], vazias(1, 4))}
      <h2>4. Documentação</h2>
      ${tabela(['Material usado (imagem, música, texto)', 'Autor', 'Licença ou autorização', 'Fonte'], vazias(3, 4))}
      <h2>5. Antes de publicar</h2>
      ${check(['Todas as pessoas que aparecem autorizaram', 'Não aparecem dados pessoais (endereço, telefone, uniforme com nome)', 'Os créditos e as licenças estão certos', 'Alguém de fora do grupo revisou'])}`),
    'f-co-roteiro:gab': `<p><strong>Condução (40 min):</strong> grupos de 4. A folha serve de roteiro para a gravação na aula seguinte. Para estudantes menores de idade, a publicação fora da escola precisa da autorização das famílias.</p>
      <p><strong>O que conferir.</strong> A mensagem principal cabe em uma frase; o roteiro tem começo, meio e fim com tempo realista (vídeos de 1 a 3 minutos); cada material de terceiros tem autor e licença; o checklist da parte 5 está completo antes de publicar.</p>`,

    /* ============================ 8º ANO ============================ */
    'f-co-recursao': () => sheet(`${head('Recursão desplugada')}
      <p>Na <strong>recursão</strong>, um problema é resolvido usando o mesmo problema, só que menor. Ela sempre precisa de um <strong>caso base</strong>, a situação em que para.</p>
      <h2>1. A fila recursiva</h2>
      <p>Seis pessoas estão em fila. A última quer saber quantas pessoas há na frente dela. Cada uma só pode perguntar à pessoa da frente e responder a quem está atrás. A primeira da fila sabe que não há ninguém na frente: esse é o caso base.</p>
      ${tabela(['Pessoa', '6ª (última)', '5ª', '4ª', '3ª', '2ª', '1ª'], [['Ida: pergunta para', '5ª', '', '', '', '', 'ninguém'], ['Volta: responde', '', '', '', '', '', '0']])}
      <h2>2. Fatorial</h2>
      <p>fatorial(n) = n × fatorial(n − 1), e fatorial(1) = 1. Complete as chamadas e depois volte calculando.</p>
      ${tabela(['Chamada', 'Vira', 'Resultado na volta'], [['fatorial(5)', '5 × fatorial(4)', ''], ['fatorial(4)', '', ''], ['fatorial(3)', '', ''], ['fatorial(2)', '', ''], ['fatorial(1)', 'caso base: 1', '1']])}
      <h2>3. Escreva a sua</h2>
      <p>A função soma(n) soma todos os números de 1 até n. Complete:</p>
      ${pre('soma(n):\n    se n = 1 então\n        devolva ____\n    senão\n        devolva n + soma(____)\n    fim')}
      <p>Quanto é soma(4)? Mostre as chamadas:</p>${lines(2)}
      <h2>4. Sem caso base</h2>
      <p>O que aconteceria se a função fatorial não tivesse o caso base?</p>${lines(2)}`),
    'f-co-recursao:gab': `<p><strong>Condução (35 min):</strong> faça a fila de verdade com seis estudantes. Escreva no quadro a ida (as perguntas) e a volta (as respostas). Mostre que a resposta só aparece quando o caso base é atingido.</p>
      <p><strong>Gabarito.</strong> 1) Ida: 6ª pergunta à 5ª, 5ª à 4ª, 4ª à 3ª, 3ª à 2ª, 2ª à 1ª. Volta: 1ª responde 0, 2ª responde 1, 3ª responde 2, 4ª responde 3, 5ª responde 4, 6ª fica sabendo que há 5. 2) fatorial(4) = 4 × fatorial(3); fatorial(3) = 3 × fatorial(2); fatorial(2) = 2 × fatorial(1). Volta: 1, 2, 6, 24, 120. 3) devolva 1; soma(n − 1). soma(4) = 4 + soma(3) = 4 + 3 + soma(2) = 4 + 3 + 2 + 1 = 10. 4) A função se chamaria sem parar e o programa travaria.</p>`,

    'f-co-listas': () => sheet(`${head('Listas na programação')}
      <p>Uma <strong>lista</strong> guarda vários itens em ordem e pode crescer ou diminuir. As posições começam em 0.</p>
      <h2>1. A lista viva</h2>
      <p>A lista começa assim: <span class="mono" style="letter-spacing:.04em">[7, 3, 9, 4, 6]</span>. Execute cada comando na ordem e escreva como a lista fica.</p>
      ${tabela(['Comando', 'Lista depois do comando', 'Resposta'], [['adicionar 5 no fim', '', '—'], ['remover o 3', '', '—'], ['quem está na posição 0?', '(não muda)', ''], ['qual é o tamanho?', '(não muda)', ''], ['inserir 1 na posição 2', '', '—'], ['quem está na posição 2?', '(não muda)', '']])}
      <h2>2. A playlist</h2>
      <p>Complete o programa: começar com a lista vazia, adicionar três músicas, remover uma e mostrar todas.</p>
      ${pre('playlist ← [ ]\nadicione "__________" em playlist\nadicione "__________" em playlist\nadicione "__________" em playlist\nremova "__________" de playlist\npara cada música em playlist\n    escreva ________\nfim')}
      <p>O que o programa vai escrever?</p>${lines(2)}
      <h2>3. Desafio: a maior nota</h2>
      <p>Escreva um programa que receba a lista <span class="mono" style="letter-spacing:.04em">notas = [6.5, 9, 7, 8.5]</span> e mostre a maior nota.</p>${lines(4)}`),
    'f-co-listas:gab': `<p><strong>Condução (35 min):</strong> cinco estudantes seguram cartões com os números e se movem a cada comando. Mostre que, ao remover ou inserir, as posições dos itens seguintes mudam. Se houver computador, rode a playlist em Python ou com os blocos de lista do Scratch.</p>
      <p><strong>Gabarito.</strong> 1) [7, 3, 9, 4, 6, 5]; [7, 9, 4, 6, 5]; posição 0: 7; tamanho 5; [7, 9, 1, 4, 6, 5]; posição 2: 1. 2) Escreve as duas músicas que sobraram, uma por linha, na ordem em que foram adicionadas. 3) maior ← notas[0]; para cada nota em notas: se nota > maior, maior ← nota; escreva maior (resultado 9).</p>`,

    'f-co-ordenar': () => sheet(`${head('Algoritmos clássicos')}
      <p>Para <strong>ordenar</strong>, a ordenação por seleção acha o menor item e troca com o primeiro, depois acha o menor do resto e troca com o segundo, e assim por diante. Para <strong>buscar</strong> numa lista ordenada, a busca binária olha o meio e descarta metade a cada pergunta.</p>
      <h2>1. Ordenação por seleção</h2>
      <p>Recorte os cartões, coloque na ordem abaixo e ordene. Anote a lista depois de cada passo e se houve troca.</p>
      <div class="boxes" style="grid-template-columns:repeat(8,1fr)">${[8, 3, 6, 1, 7, 2, 5, 4].map(n => `<span style="font-size:22px;color:#111;border-style:dashed">${n}</span>`).join('')}</div>
      ${tabela(['Passo', 'Lista depois do passo', 'Houve troca?'], [['início', '8 3 6 1 7 2 5 4', '—'], ['1', '', ''], ['2', '', ''], ['3', '', ''], ['4', '', ''], ['5', '', ''], ['6', '', ''], ['7', '', '']])}
      <p>Total de trocas: ______</p>
      <h2>2. Busca binária</h2>
      <p>Na lista ordenada, procure o número 7 pela busca binária. Anote cada pergunta.</p>
      ${tabela(['Pergunta', 'Item do meio', 'É o 7? Maior ou menor?', 'Parte que sobra'], vazias(3, 4))}
      <p>Quantas perguntas a busca binária fez? ____ &nbsp; E a busca linear (do começo ao fim)? ____</p>
      <h2>3. Quanto mais itens...</h2>
      ${tabela(['Itens na lista', '8', '16', '1.000', '1.000.000'], [['Máximo de perguntas da busca binária', '3', '', '', '']])}`),
    'f-co-ordenar:gab': `<p><strong>Condução (40 min):</strong> faça primeiro com oito estudantes em fila segurando os cartões, contando as trocas em voz alta. Depois cada dupla repete com os cartões recortados.</p>
      <p><strong>Gabarito.</strong> 1) Passo 1: 1 3 6 8 7 2 5 4 (troca); 2: 1 2 6 8 7 3 5 4 (troca); 3: 1 2 3 8 7 6 5 4 (troca); 4: 1 2 3 4 7 6 5 8 (troca); 5: 1 2 3 4 5 6 7 8 (troca); 6 e 7: sem troca. Total: 5 trocas. 2) Lista 1 a 8: meio na posição 3 (o 4), 7 é maior, sobra 5 6 7 8; meio o 6, 7 é maior, sobra 7 8; meio o 7, achou. 3 perguntas pela busca binária e 7 pela linear. 3) 16: 4; 1.000: 10; 1.000.000: 20 (cada pergunta divide a lista ao meio; 2¹⁰ = 1.024 e 2²⁰ passa de um milhão).</p>`,

    'f-co-projeto8': () => sheet(`${head('Projeto com programação')}
      <p><strong>Requisitos</strong> são as coisas que o programa precisa fazer, escritas em frases simples. Comece pelo essencial: primeiro uma versão que funciona, depois os enfeites.</p>
      ${tabela(['Item', 'O grupo decide'], [['Disciplina', ''], ['Problema real', ''], ['Quem vai usar', '']])}
      <h2>1. Requisitos</h2>
      ${tabela(['Essenciais (precisa ter)', 'Desejáveis (seria bom ter)'], [['1.', '1.'], ['2.', '2.'], ['3.', '']])}
      <h2>2. Quadro de tarefas</h2>
      <p>Escreva as tarefas em papeizinhos e mova de coluna conforme o trabalho anda.</p>
      ${tabela(['A fazer', 'Fazendo', 'Feito'], [['<div style="height:120px"></div>', '', '']])}
      <h2>3. Casos de teste</h2>
      <p>Para cada requisito essencial, escreva uma entrada e a saída esperada. Exemplo para uma calculadora de descontos: entrada 80 e 25%, saída esperada 60.</p>
      ${tabela(['Requisito', 'Entrada', 'Saída esperada', 'Saída obtida', 'Passou?'], vazias(3, 5))}
      <h2>4. Teste com um usuário de fora do grupo</h2>
      <p>Quem testou? ____________ &nbsp; O que confundiu? O que vamos mudar?</p>${lines(2)}`),
    'f-co-projeto8:gab': `<p><strong>Condução (40 min na aula de planejamento):</strong> grupos de 4. Use a ficha junto com o plano de aula do projeto. Exemplos: conversor de unidades para Ciências, quiz de verbos para Língua Inglesa, calculadora de juros para Matemática, mapa interativo para Geografia.</p>
      <p><strong>O que conferir.</strong> Os requisitos essenciais são verificáveis (dá para testar se o programa faz ou não); cada essencial tem pelo menos um caso de teste com saída esperada; o quadro de tarefas é atualizado em todas as aulas; o teste com usuário de fora gera pelo menos uma mudança no programa.</p>`,

    'f-co-paralelo': () => {
      const contas = Array.from({ length: 40 }, (_, i) => `${12 + (i * 7) % 37} + ${5 + (i * 11) % 23} =`);
      return sheet(`${head('Paralelismo desplugado')}
      <p><strong>Paralelismo</strong> é dividir um trabalho para várias pessoas (ou processadores) fazerem ao mesmo tempo. Mas dividir e juntar também gasta tempo.</p>
      <h2>1. A corrida das somas</h2>
      <p>Rodada 1: uma pessoa resolve as 40 contas sozinha. Rodada 2: quatro pessoas dividem as contas (10 para cada) e depois juntam as respostas. Cronometrem as duas.</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px 14px;font-size:14px;margin:8px 0">${contas.map((c, i) => `<span>${i + 1}) ${c} ____</span>`).join('')}</div>
      ${tabela(['Rodada', 'Pessoas', 'Tempo para resolver', 'Tempo para juntar', 'Tempo total'], [['1', '1', '', '—', ''], ['2', '4', '', '', '']])}
      <p>O tempo caiu para 1/4? Por que não exatamente?</p>${lines(2)}`)
      + sheet(`
      <h2 style="margin-top:0">2. Dá para dividir?</h2>
      ${tabela(['Tarefa', 'Dá para fazer em paralelo?', 'Por quê?'], [['Corrigir 40 provas com 4 professores', '', ''], ['Misturar a massa e assar o bolo', '', ''], ['Pintar as 4 paredes de uma sala', '', ''], ['Ler um livro de suspense na ordem', '', ''], ['Lavar e secar a louça em duas pessoas', '', '']])}
      <h2>3. Concorrência</h2>
      <p>Dois colegas editam ao mesmo tempo a mesma frase de um documento compartilhado. O que pode dar errado? Como os programas resolvem isso?</p>${lines(3)}
      <h2>4. A nuvem</h2>
      <p>Quando você guarda fotos “na nuvem”, onde elas ficam de verdade?</p>${lines(2)}`);
    },
    'f-co-paralelo:gab': `<p><strong>Condução (40 min):</strong> imprima uma folha de contas por grupo. Na rodada 2, o grupo decide como dividir antes de começar o cronômetro. Compare os tempos de todos os grupos no quadro.</p>
      <p><strong>Gabarito.</strong> 1) O tempo cai, mas não para 1/4: há o tempo de dividir, de juntar e de esperar quem demora mais. 2) Provas: sim, cada uma é independente. Bolo: não, uma etapa depende da outra. Paredes: sim. Livro: não, a ordem importa. Louça: em parte, como uma linha de montagem (uma lava enquanto a outra seca a peça anterior). 3) Uma alteração pode apagar a outra; os programas travam o trecho que está sendo editado ou guardam as duas versões e mostram o conflito. 4) Em computadores de grandes centros de dados (data centers), muitas vezes copiadas em mais de um lugar: é um sistema distribuído.</p>`,

    'f-co-internet': () => {
      const nos = { casa: [70, 70, 'Casa'], provA: [250, 70, 'Provedor A'], provB: [250, 230, 'Provedor B'], ix: [450, 150, 'Ponto de troca'], escola: [70, 230, 'Escola'], site: [650, 150, 'Servidor do site'] };
      const arestas = [['casa', 'provA'], ['provA', 'ix'], ['provA', 'provB'], ['provB', 'ix'], ['escola', 'provB'], ['ix', 'site'], ['provB', 'site']];
      let g = arestas.map(([a, b]) => `<line x1="${nos[a][0]}" y1="${nos[a][1]}" x2="${nos[b][0]}" y2="${nos[b][1]}" stroke="#111" stroke-width="2.4"/>`).join('');
      g += Object.values(nos).map(([x, y, t]) => caixa(x - 62, y - 22, 124, 44, t, false, 13)).join('');
      return sheet(`${head('Estrutura da internet')}
      <p>A internet é uma <strong>rede de redes</strong>: a rede da sua casa se liga a um provedor, os provedores se ligam entre si e aos grandes cabos (backbones), e assim os dados chegam ao servidor do site. Entre os continentes, os dados passam por cabos submarinos de fibra óptica.</p>
      <h2>1. O mapa</h2>
      <svg viewBox="0 0 720 280" width="100%" role="img" aria-label="Rede com seis pontos: Casa ligada ao Provedor A; Provedor A ligado ao Ponto de troca e ao Provedor B; Escola ligada ao Provedor B; Provedor B ligado ao Ponto de troca e ao Servidor do site; Ponto de troca ligado ao Servidor do site">${g}</svg>
      <h2>2. Dois caminhos</h2>
      <p>Escreva dois caminhos diferentes para um recado sair da Casa e chegar ao Servidor do site.</p>
      <p>Caminho 1: __________________________________________________________</p>
      <p>Caminho 2: __________________________________________________________</p>
      <h2>3. Corte uma ligação</h2>
      <p>a) Se a ligação entre o Provedor A e o Ponto de troca cair, o recado ainda chega? Por onde?</p>${lines(1)}
      <p>b) Qual ligação, se cair, deixa a Casa sem internet? Por quê?</p>${lines(1)}
      <h2>4. O nome e o número</h2>
      <p>Você digita o nome de um site, mas os roteadores usam números (endereços IP). Quem faz a tradução do nome para o número?</p>${lines(1)}
      <h2>5. A internet tem dono?</h2>${lines(2)}`);
    },
    'f-co-internet:gab': `<p><strong>Condução (35 min):</strong> se possível, faça a versão com barbante: cada grupo é um ponto da rede e segura as pontas. Corte um barbante e peça que a turma encontre outro caminho. Complete com o jogo Correio de Pacotes.</p>
      <p><strong>Gabarito.</strong> 2) Exemplos: Casa, Provedor A, Ponto de troca, Servidor; Casa, Provedor A, Provedor B, Servidor; Casa, Provedor A, Provedor B, Ponto de troca, Servidor. 3a) Sim, pelo Provedor B. 3b) A ligação Casa e Provedor A, porque é o único caminho da casa (por isso redes importantes têm ligações de reserva). 4) O DNS. 5) Não: é formada por milhares de redes de empresas, governos e universidades que seguem protocolos comuns (como o TCP/IP).</p>`,

    'f-co-feed': () => {
      const posts = ['Gol de placa no campeonato da cidade', 'Receita de bolo de cenoura', 'Gato que abre a geladeira', 'Experimento de ciências com vinagre', 'Lançamento de música nova', 'Dicas para um jogo de celular', 'Obras na praça do bairro', 'Moda para o verão', 'Resenha de um livro de aventura', 'Vídeo de humor com pegadinha'];
      return sheet(`${head('Redes sociais por dentro')}
      <p>O <strong>algoritmo do feed</strong> escolhe o que aparece para você a partir do que você curte, comenta e assiste. O objetivo da plataforma é que você passe mais tempo nela.</p>
      <h2>1. O feed de papel</h2>
      <p>Marque com X os três posts de que você mais gosta.</p>
      <div class="cards" style="grid-template-columns:repeat(2,1fr)">${posts.map((p, i) => `<div class="cut" style="display:flex;justify-content:space-between;gap:8px"><span><strong>Post ${i + 1}.</strong> ${p}</span><span style="border:1.4px solid #111;width:22px;height:22px;flex:none"></span></div>`).join('')}</div>
      <h2>2. Você é o algoritmo</h2>
      <p>A Bia curtiu o post 1 e o post 6. Escolha, entre os dez, os três que o algoritmo mostraria primeiro para ela amanhã e explique.</p>${lines(2)}
      <p>Que posts provavelmente sumiriam do feed da Bia?</p>${lines(1)}
      <h2>3. A bolha</h2>
      <p>O que é uma bolha de filtro? Cite duas formas de sair dela.</p>${lines(3)}
      <h2>4. Antes de compartilhar</h2>
      ${tabela(['Pergunta', 'Por que ela importa?'], [['É verdade?', ''], ['É útil?', ''], ['Pode magoar alguém?', '']])}`);
    },
    'f-co-feed:gab': `<p><strong>Condução (35 min):</strong> imprima a folha e, na rodada 2, faça você o papel do algoritmo: recolha as marcações e devolva a cada grupo só posts parecidos com os escolhidos. Pergunte o que sumiu do feed de cada um.</p>
      <p><strong>Gabarito.</strong> 2) Posts de esporte e de jogos (por exemplo 1, 6 e o 10, se ela costuma assistir vídeos curtos); sumiriam receita, livro, obras na praça. 3) Ver só conteúdos parecidos com o que já curtimos e achar que todos pensam igual. Para sair: seguir perfis diferentes, buscar notícias em mais de uma fonte, limpar o histórico ou usar o feed em ordem cronológica. 4) Evitam espalhar boatos, poluir o feed dos outros e humilhar pessoas.</p>`,

    'f-co-termos': () => sheet(`${head('Termos de uso')}
      <p>Ao clicar em “Li e concordo”, você fecha um contrato com a plataforma. Os trechos abaixo foram inventados, mas imitam termos de uso reais.</p>
      <div class="msg"><strong>Trecho A.</strong> “Ao publicar conteúdo, você nos concede uma licença mundial, não exclusiva, gratuita e transferível para usar, reproduzir, modificar e distribuir esse conteúdo.”</div>
      <div class="msg"><strong>Trecho B.</strong> “Poderemos compartilhar informações sobre o seu uso com terceiros parceiros para fins de publicidade personalizada.”</div>
      <div class="msg"><strong>Trecho C.</strong> “Você pode solicitar a exclusão da sua conta e dos seus dados pessoais a qualquer momento, nas configurações.”</div>
      <h2>1. Glossário</h2>
      ${tabela(['Palavra difícil', 'O que significa'], [['licença', ''], ['transferível', ''], ['terceiros', ''], ['publicidade personalizada', ''], ['', '']])}
      <h2>2. Tradução para linguagem simples</h2>
      ${tabela(['Trecho', 'Em até duas frases simples', 'Bom, ruim ou neutro para quem usa?'], [['A', '', ''], ['B', '', ''], ['C', '', '']].map(l => [l[0], '<div style="height:48px"></div>', '']))}
      <h2>3. O que procurar nos termos</h2>
      <p>Escreva quatro palavras que vale a pena procurar (Ctrl + F) antes de aceitar os termos de um aplicativo.</p>${lines(1)}
      <h2>4. A lei</h2>
      <p>Que lei brasileira garante o direito de pedir a exclusão dos seus dados? Qual a idade mínima comum para ter conta nas redes sociais?</p>${lines(2)}`),
    'f-co-termos:gab': `<p><strong>Condução (35 min):</strong> grupos. Se quiser, leve também um trecho dos termos de uma plataforma que a turma usa. Cada grupo lê sua tradução em voz alta e a turma vota se é boa, ruim ou neutra.</p>
      <p><strong>Gabarito.</strong> 1) Licença: permissão de uso; transferível: pode ser passada para outras empresas; terceiros: outras empresas; publicidade personalizada: anúncios escolhidos a partir do seu perfil. 2) A: a plataforma pode usar, mudar e espalhar o que você posta, no mundo todo, sem pagar (ruim ou neutro). B: a plataforma conta para outras empresas o que você faz para mostrar anúncios (ruim). C: você pode apagar a conta e os dados quando quiser (bom). 3) Dados, terceiros, licença, excluir (também localização, anúncios, idade). 4) A LGPD, Lei 13.709/2018; a idade mínima mais comum é 13 anos.</p>`,

    'f-co-checagem8': () => sheet(`${head('Checagem de fatos')}
      <p>Antes de acreditar e compartilhar, faça as quatro perguntas: <strong>quem</strong> publicou, <strong>quando</strong>, <strong>onde mais</strong> a informação aparece e <strong>por que</strong> foi publicada. As notícias abaixo são inventadas para o exercício.</p>
      <div class="msg"><strong>Notícia 1.</strong> “URGENTE!!! Todas as escolas do RS vão ter aula aos domingos a partir de novembro. Compartilhe antes que apaguem!” (sem autor, sem data, enviada num grupo de mensagens)</div>
      <div class="msg"><strong>Notícia 2.</strong> “Prefeitura abre inscrições para oficinas gratuitas de robótica nas férias. As inscrições vão até 15 de dezembro, no site oficial do município.” (publicada no site da prefeitura, com data e contato)</div>
      <h2>1. As quatro perguntas</h2>
      ${tabela(['Pergunta', 'Notícia 1', 'Notícia 2'], [['Quem publicou?', '', ''], ['Quando?', '', ''], ['Onde mais aparece?', '', ''], ['Por que foi publicada?', '', '']])}
      <h2>2. Sinais de alerta</h2>
      <p>Marque os sinais que aparecem na notícia 1.</p>
      ${check(['Letras maiúsculas e muitos pontos de exclamação', 'Pressa para compartilhar', 'Sem autor ou sem data', 'Fonte oficial citada com link', 'Promessa de que “vão apagar”'])}
      <h2>3. Veredito</h2>
      ${tabela(['Notícia', 'Verdadeira, falsa ou enganosa?', 'Justificativa'], [['1', '', ''], ['2', '', '']])}
      <h2>4. Viés</h2>
      <p>Duas manchetes sobre o mesmo fato: “Chuva causa caos no trânsito da capital” e “Chuva alivia seca no interior”. Por que são tão diferentes? Alguma está errada?</p>${lines(2)}`),
    'f-co-checagem8:gab': `<p><strong>Condução (35 min):</strong> grupos. Se houver internet, ensine a leitura lateral: abrir outras abas para saber quem é a fonte antes de ler o texto todo. Encerre com o combinado “na dúvida, não compartilhe”.</p>
      <p><strong>Gabarito.</strong> 1) Notícia 1: autor desconhecido, sem data, só circula em grupos, objetivo de espalhar alarme. Notícia 2: prefeitura, data e prazo informados, aparece no site oficial, objetivo de informar. 2) Maiúsculas e exclamações, pressa, sem autor ou data, “vão apagar” (a fonte oficial com link não aparece). 3) Notícia 1: falsa (uma mudança desse tamanho seria anunciada pela Secretaria de Educação, com data e fonte); notícia 2: provavelmente verdadeira, conferindo no site oficial. 4) Cada manchete destaca um lado do mesmo fato, conforme o público e o interesse da fonte: isso é viés. As duas podem ser verdadeiras, mas cada uma é incompleta.</p>`,

    /* ============================ 9º ANO ============================ */
    'f-co-arvore': () => {
      let g = caixa(270, 8, 180, 40, '', true);
      [[120, 90], [480, 90]].forEach(([x, y]) => { g += `<line x1="360" y1="48" x2="${x + 70}" y2="${y}" stroke="#111" stroke-width="1.4"/>` + caixa(x, y, 140, 38, '', true); });
      [[30, 175], [210, 175], [390, 175], [570, 175]].forEach(([x, y], i) => { const px = i < 2 ? 190 : 550; g += `<line x1="${px}" y1="128" x2="${x + 60}" y2="${y}" stroke="#111" stroke-width="1.4"/>` + caixa(x, y, 120, 36, '', true); });
      for (let i = 0; i < 8; i++) { const x = 8 + i * 89, px = 90 + Math.floor(i / 2) * 180; g += `<line x1="${px}" y1="211" x2="${x + 38}" y2="262" stroke="#111" stroke-width="1.2"/>` + `<rect x="${x}" y="262" width="76" height="34" rx="17" fill="#fff" stroke="#111" stroke-width="1.4"/>`; }
      g += '<g font-size="11" fill="#555"><text x="360" y="32" text-anchor="middle">raiz: 1ª pergunta</text><text x="360" y="316" text-anchor="middle">folhas: os 8 animais</text></g>';
      return sheet(`${head('Árvores de decisão')}
      <p>Uma <strong>árvore</strong> é um grafo sem ciclos que começa numa <strong>raiz</strong> e termina nas <strong>folhas</strong>. Numa árvore de decisão, cada nó é uma pergunta de sim ou não.</p>
      <h2>1. Adivinhe o animal</h2>
      <p>Animais: <strong>cachorro, gato, baleia, golfinho, galinha, pinguim, tubarão e cobra</strong>. Monte uma árvore com perguntas de sim ou não que separe todos eles. Escreva as perguntas nos retângulos e os animais nas folhas.</p>
      <svg viewBox="0 0 720 324" width="100%" role="img" aria-label="Esqueleto de árvore de decisão com uma pergunta na raiz, duas no segundo nível, quatro no terceiro e oito folhas">${g}</svg>
      <h2>2. Teste com outro grupo</h2>
      <p>Um colega pensa num animal e responde às perguntas. Quantas perguntas foram necessárias? ____ &nbsp; Sempre foram 3? ____</p>
      <h2>3. Quantas perguntas?</h2>
      ${tabela(['Itens para separar', '2', '4', '8', '16', '32'], [['Perguntas de sim ou não necessárias', '1', '', '3', '', '']])}
      <p>Que padrão você percebe? Por quê?</p>${lines(2)}
      <h2>4. Árvore ou não?</h2>
      <p>Um mapa de bairros em que dá para sair de um bairro e voltar a ele por outro caminho é uma árvore? Explique.</p>${lines(2)}`);
    },
    'f-co-arvore:gab': `<p><strong>Condução (35 min):</strong> grupos. Jogue antes uma rodada de “adivinhe o animal” com a turma toda. Destaque que boas perguntas dividem o grupo ao meio. Complete com o jogo Rota Mais Curta, que trabalha grafos com ciclos.</p>
      <p><strong>Gabarito.</strong> 1) Exemplo: “É mamífero?” Sim: “Vive na água?” (sim: “É o maior animal do mundo?” baleia ou golfinho; não: “Late?” cachorro ou gato). Não: “Tem penas?” (sim: “Vive no gelo?” pinguim ou galinha; não: “Vive na água?” tubarão ou cobra). 2) Numa árvore equilibrada como essa, sempre 3. 3) 4: 2; 16: 4; 32: 5. A cada pergunta, o número de itens possíveis cai pela metade: com n perguntas separamos 2ⁿ itens. 4) Não: dá para sair e voltar ao mesmo bairro, então o grafo tem ciclo, e árvores não têm ciclos.</p>`,

    'f-co-prototipo': () => {
      const tela = n => `<div style="border:2px solid #111;border-radius:18px;height:260px;padding:8px;position:relative"><span class="small muted">Tela ${n}</span><span style="position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:34px;height:6px;border-radius:3px;background:#bbb"></span></div>`;
      return sheet(`${head('Protótipo de papel')}
      <p>Um <strong>protótipo</strong> é uma versão simples da solução, até de papel, para testar a ideia antes de programar. Corrigir no começo é mais rápido e mais barato.</p>
      ${tabela(['Item', 'O grupo decide'], [['Problema da escola ou do bairro', ''], ['Para quem é a solução?', ''], ['O que ela precisa fazer (3 coisas)', '1. ______________ 2. ______________ 3. ______________']])}
      <h2>1. Desenhe três telas</h2>
      <p>Desenhe as telas do aplicativo ou site: a inicial, a principal e a de resultado. Mostre botões, campos e textos.</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">${tela(1)}${tela(2)}${tela(3)}</div>
      <h2>2. Teste com outro grupo</h2>
      <p>Outro grupo “clica” com o dedo nas telas enquanto vocês trocam as folhas. Não expliquem nada: só observem.</p>
      ${tabela(['O que o testador tentou fazer', 'Onde se confundiu', 'O que vamos mudar'], vazias(3, 3))}`);
    },
    'f-co-prototipo:gab': `<p><strong>Condução (40 min):</strong> grupos de 4. Exemplos de problemas: fila do refeitório, achados e perdidos, horário do ônibus escolar, troca de livros, coleta seletiva. Um integrante do grupo faz o papel do “computador”, trocando a tela de papel quando o testador toca num botão.</p>
      <p><strong>O que conferir.</strong> O problema é real e tem público definido; as três telas formam um caminho completo; o grupo anotou pelo menos duas dificuldades do testador e uma mudança. Esse protótipo pode virar o projeto de programação do bimestre (EF09CO02) ou a proposta para a cidade (EF09CO06).</p>`,

    'f-co-estados': () => {
      const est = (x, y, t) => `<circle cx="${x}" cy="${y}" r="44" fill="#fff" stroke="#111" stroke-width="2"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="14">${t}</text>`;
      const catraca = `${defs}${est(130, 90, 'Travada')}${est(450, 90, 'Destravada')}
        <path d="M168 66 Q290 10 412 66" fill="none" stroke="#111" stroke-width="1.8" marker-end="url(#co-ar)"/><text x="290" y="30" text-anchor="middle" font-size="13">moeda</text>
        <path d="M412 114 Q290 170 168 114" fill="none" stroke="#111" stroke-width="1.8" marker-end="url(#co-ar)"/><text x="290" y="168" text-anchor="middle" font-size="13">empurrar</text>
        <path d="M100 56 C60 0 20 60 88 80" fill="none" stroke="#111" stroke-width="1.6" marker-end="url(#co-ar)"/><text x="30" y="22" font-size="13">empurrar</text>
        <path d="M480 56 C520 0 560 60 492 80" fill="none" stroke="#111" stroke-width="1.6" marker-end="url(#co-ar)"/><text x="512" y="22" font-size="13">moeda</text>`;
      return sheet(`${head('Autômatos')}
      <p>Uma <strong>máquina de estados</strong> (autômato) descreve um sistema pelos <strong>estados</strong> em que ele pode estar e pelos <strong>eventos</strong> que o fazem mudar de estado. Exemplo: a catraca do ônibus.</p>
      <svg viewBox="0 0 580 190" width="100%" style="max-width:580px" role="img" aria-label="Catraca com dois estados. Travada com moeda vai para Destravada; Destravada com empurrar vai para Travada; Travada com empurrar continua Travada; Destravada com moeda continua Destravada">${catraca}</svg>
      <h2>1. Siga a catraca</h2>
      <p>A catraca começa travada. Recebe os eventos: moeda, empurrar, empurrar, moeda, moeda, empurrar.</p>
      ${tabela(['Evento', 'moeda', 'empurrar', 'empurrar', 'moeda', 'moeda', 'empurrar'], [['Estado depois', '', '', '', '', '', '']])}
      <p>Em que estado ela termina? ______ &nbsp; Quantas pessoas passaram? ______</p>
      <h2>2. O personagem do jogo</h2>
      <p>Desenhe a máquina de estados de um personagem com quatro estados: <strong>parado, andando, pulando e caindo</strong>. Ligue os estados com setas e escreva o evento de cada seta (tecla, soltar a tecla, tocar o chão...).</p>
      ${quadro(230)}
      <h2>3. Tabela de transições</h2>
      ${tabela(['Estado atual', 'Evento', 'Próximo estado'], vazias(5, 3))}`);
    },
    'f-co-estados:gab': `<p><strong>Condução (40 min):</strong> grupos. Teste a parte 2 em voz alta: um colega diz eventos e o grupo diz em que estado o personagem está. Se houver computador, a tabela de transições vira um programa no Scratch com uma variável “estado”.</p>
      <p><strong>Gabarito.</strong> 1) Destravada, travada, travada, destravada, destravada, travada. Termina travada; passaram 2 pessoas (cada “empurrar” com a catraca destravada). 2 e 3) Exemplo: parado + seta → andando; andando + soltar a seta → parado; parado ou andando + espaço → pulando; pulando + chegar ao ponto mais alto → caindo; caindo + tocar o chão → parado. Não se pula de novo enquanto está caindo: por isso o estado importa.</p>`,

    'f-co-incidente': () => sheet(`${head('Segurança cibernética')}
      <p><strong>Malware</strong> é um programa feito para causar dano. Ataques costumam entrar por uma “porta”: um anexo, um link, uma senha fraca ou um sistema sem atualização.</p>
      <h2>1. Que ataque é?</h2>
      <p>Ligue cada nome à descrição, escrevendo a letra.</p>
      ${tabela(['Nome', 'Letra', 'Descrição'], [['Vírus', '', 'A) Trava (criptografa) os arquivos e pede resgate para liberar.'], ['Worm', '', 'B) Parece um programa útil, mas esconde código malicioso.'], ['Cavalo de Troia', '', 'C) Espiona o que a pessoa digita e envia para o atacante.'], ['Ransomware', '', 'D) Gruda em outros arquivos e se espalha quando eles são abertos.'], ['Spyware', '', 'E) Mensagem falsa que tenta enganar a pessoa para roubar senhas.'], ['Phishing', '', 'F) Se espalha sozinho pela rede, de computador em computador.']])}
      <h2>2. Análise de incidente</h2>
      <div class="msg">Caso fictício: na segunda-feira, os computadores da secretaria de uma escola amanheceram travados com a mensagem “Seus arquivos foram criptografados. Pague para recuperar”. Na sexta, uma funcionária tinha aberto um e-mail com o anexo <span class="mono" style="letter-spacing:0;font-size:14px">boletim.pdf.exe</span>. O sistema dos computadores estava sem atualizações havia dois anos e não havia cópia de segurança.</div>
      ${tabela(['Pergunta', 'Resposta do grupo'], [['Qual foi a porta de entrada provável?', ''], ['Que tipo de malware foi?', ''], ['Que pista no anexo deveria ter chamado a atenção?', ''], ['Por que o estrago foi tão grande?', '']])}
      <h2>3. Três defesas</h2>
      <p>Proponha três medidas que teriam evitado ou reduzido o estrago.</p>${lines(3)}`),
    'f-co-incidente:gab': `<p><strong>Condução (35 min):</strong> grupos. Apresente o caso como uma investigação. Reforce que a vítima de golpe não é culpada: o objetivo é aprender com o incidente. Complete com o jogo Golpe ou Seguro?.</p>
      <p><strong>Gabarito.</strong> 1) Vírus D; worm F; cavalo de Troia B; ransomware A; spyware C; phishing E. 2) Porta de entrada: o anexo do e-mail; ransomware; a extensão dupla “.pdf.exe” (é um programa disfarçado de documento); sem atualizações e sem cópia de segurança, os arquivos não puderam ser recuperados. 3) Fazer cópias de segurança (backup) fora do computador, manter o sistema e o antivírus atualizados, desconfiar de anexos inesperados, usar contas sem permissão de administrador e orientar a equipe.</p>`,

    'f-co-radar': () => sheet(`${head('Tecnologia e cidadania')}
      <p><strong>Dados abertos</strong> são dados públicos que qualquer pessoa pode usar, como os do IBGE Cidades, do Portal da Transparência e dos portais da prefeitura e do estado. Com eles, dá para entender um problema e propor soluções.</p>
      <h2>1. O problema</h2>
      ${tabela(['Item', 'O grupo decide'], [['Problema do bairro ou da cidade', ''], ['Quem é afetado?', ''], ['Desde quando acontece?', '']])}
      <h2>2. Que dados ajudariam?</h2>
      ${tabela(['Dado que ajudaria a entender o problema', 'Onde encontrar', 'Já existe ou precisa ser coletado?'], vazias(4, 3))}
      <h2>3. A solução digital</h2>
      <p>Descreva a solução em uma frase (um aplicativo, um mapa colaborativo, um formulário, um painel de dados...).</p>${lines(2)}
      <h2>4. Para quem apresentar</h2>
      ${check(['Direção da escola', 'Conselho escolar ou grêmio', 'Prefeitura ou secretaria municipal', 'Câmara de Vereadores', 'Associação de moradores'])}
      <p>Por que escolheram essa pessoa ou instituição?</p>${lines(2)}`),
    'f-co-radar:gab': `<p><strong>Condução (40 min):</strong> grupos. Se houver internet, mostre o IBGE Cidades com os dados do município da escola. Exemplos de problemas: iluminação pública, transporte escolar, alagamentos, descarte de lixo, falta de espaços de lazer.</p>
      <p><strong>O que conferir.</strong> O problema é concreto e local; os dados listados têm relação com ele e pelo menos uma fonte real foi indicada; a solução cabe numa frase e diz quem vai usar; a instituição escolhida tem poder de agir sobre o problema. As melhores propostas podem ser apresentadas ao grêmio ou à Câmara, no projeto do plano “Tecnologia para a nossa cidade”.</p>`,

    'f-co-julgamento': () => sheet(`${head('Tecnologia e sociedade')}
      <p>Nenhuma tecnologia é neutra: ela afeta grupos de pessoas de forma diferente e reflete as escolhas de quem a cria. Para analisar, use quatro perguntas.</p>
      ${tabela(['Pergunta', 'O que observar'], [['Quem ganha?', 'empresas, usuários, governo, trabalhadores'], ['Quem perde ou fica de fora?', 'grupos com menos acesso, trabalhadores substituídos'], ['O que acontece com os dados?', 'quem coleta, guarda e vende'], ['Qual é o impacto no ambiente?', 'energia, água, lixo eletrônico']])}
      <h2>1. A tecnologia do grupo</h2>
      ${check(['Reconhecimento facial em lugares públicos', 'Aplicativo de entrega', 'Inteligência artificial que gera imagens', 'Redes sociais'])}
      <h2>2. Análise</h2>
      ${tabela(['Pergunta', 'Resposta do grupo'], [['Quem ganha?', ''], ['Quem perde ou fica de fora?', ''], ['O que acontece com os dados?', ''], ['Qual é o impacto no ambiente?', '']])}
      <h2>3. Impactos</h2>
      ${tabela(['Positivos', 'Negativos'], [['1.', '1.'], ['2.', '2.']])}
      <h2>4. Uma regra mais justa</h2>
      <p>Proponha uma regra (lei, combinado ou mudança no produto) que deixaria essa tecnologia mais justa.</p>${lines(3)}`),
    'f-co-julgamento:gab': `<p><strong>Condução (40 min):</strong> faça como um julgamento: cada grupo defende ou acusa a tecnologia e a turma vota a regra mais justa. Garanta que todos os grupos tragam impactos positivos e negativos.</p>
      <p><strong>Exemplos de resposta.</strong> Reconhecimento facial: ajuda a encontrar pessoas desaparecidas, mas erra mais com pessoas negras e pode vigiar sem consentimento; regra: uso só com autorização judicial e auditoria. Aplicativo de entrega: renda rápida e comodidade, mas trabalho sem direitos; regra: seguro e pagamento mínimo por hora. IA de imagens: criatividade e acessibilidade, mas deepfakes e uso de obras sem autorização; regra: marca d'água e crédito a artistas. Redes sociais: comunicação, mas vício e desinformação; regra: feed cronológico opcional e proteção a menores.</p>`,

    'f-co-acesso': () => sheet(`${head('Desigualdade digital')}
      <p>A desigualdade digital tem três camadas: <strong>acesso</strong> (ter aparelho e internet), <strong>qualidade</strong> (internet boa e aparelho adequado) e <strong>habilidades</strong> (saber usar). A pesquisa abaixo é anônima: ninguém escreve o nome.</p>
      <h2>1. Pesquisa da turma</h2>
      <p>A turma responde levantando a mão ou em papeizinhos dobrados. Anote os totais.</p>
      ${tabela(['Pergunta', 'Sim', 'Não'], [['Tem celular próprio?', '', ''], ['Tem internet fixa (wi-fi) em casa?', '', ''], ['Tem computador ou notebook em casa?', '', ''], ['A internet do celular acaba antes do fim do mês?', '', '']])}
      <h2>2. Gráfico de barras</h2>
      <p>Faça um gráfico com as respostas “sim” de cada pergunta.</p>
      ${malha(12, 26, '')}
      <h2>3. Discussão</h2>
      <p>a) O que fica difícil para quem não tem internet ou computador em casa?</p>${lines(2)}
      <p>b) Os aparelhos são montados por trabalhadores mal pagos, e o lucro fica com poucas empresas. Por que isso é uma questão ética?</p>${lines(2)}
      <h2>4. Uma ação da escola</h2>
      <p>Proponha uma ação da escola para diminuir a diferença de acesso entre os estudantes.</p>${lines(2)}`),
    'f-co-acesso:gab': `<p><strong>Condução (35 min):</strong> cuide do anonimato: use papeizinhos dobrados se a turma tiver diferenças grandes de renda. Não exponha casos individuais. Para comparar com o Brasil, consulte a pesquisa TIC Domicílios (Cetic.br).</p>
      <p><strong>Gabarito.</strong> 3a) Fazer tarefas e pesquisas, acessar serviços públicos, procurar emprego, estudar a distância. 3b) Os benefícios e os lucros da tecnologia ficam concentrados em poucos países e empresas, enquanto a mineração e a montagem acontecem em condições ruins em outros lugares. 4) Exemplos: laboratório aberto no contraturno, empréstimo de aparelhos, wi-fi para estudantes, oficinas para as famílias, material que também funcione sem internet.</p>`,

    'f-co-creditos': () => sheet(`${head('Direitos autorais e uso de imagem')}
      <p>O direito autoral nasce com a obra: não precisa de registro. Algumas obras têm licenças <strong>Creative Commons (CC)</strong>, que dizem o que é permitido. <strong>BY</strong>: dar crédito. <strong>NC</strong>: sem uso comercial. <strong>ND</strong>: sem modificar. <strong>SA</strong>: compartilhar com a mesma licença.</p>
      <h2>1. Posso usar?</h2>
      <p>As imagens e os autores abaixo são fictícios.</p>
      ${tabela(['Imagem', 'Licença', 'Num trabalho escolar?', 'Num vídeo com anúncios?', 'Posso editar?'], [
        ['A) Foto do pôr do sol, de Ana Lima', 'CC BY 4.0', '', '', ''],
        ['B) Ilustração de um robô, de Caio Reis', 'CC BY-NC-ND 4.0', '', '', ''],
        ['C) Foto de um show, de uma agência', 'Todos os direitos reservados', '', '', ''],
        ['D) Pintura de 1850, de autor falecido em 1890', 'Domínio público', '', '', '']])}
      <h2>2. O crédito correto</h2>
      <p>Escreva o crédito da imagem A no formato: título, autor, licença e fonte.</p>${lines(1)}
      <h2>3. Uso de imagem</h2>
      <div class="msg">Caso fictício: Lucas gravou um vídeo engraçado do colega Pedro tropeçando no pátio e postou sem pedir. Pedro pediu para apagar, mas Lucas disse que o vídeo era dele, porque foi ele quem gravou.</div>
      <p>Lucas tem razão? O que ele deveria ter feito?</p>${lines(3)}
      <h2>4. E as imagens feitas por IA?</h2>
      <p>Que cuidado tomar ao usar uma imagem gerada por inteligência artificial num trabalho?</p>${lines(2)}`),
    'f-co-creditos:gab': `<p><strong>Condução (35 min):</strong> duplas. Mostre um banco de imagens com licenças abertas e onde a licença aparece. Na parte 3, conduza a conversa sem identificar estudantes reais.</p>
      <p><strong>Gabarito.</strong> 1) A: sim, sim, sim, sempre com crédito. B: sim (com crédito, sem fins comerciais), não (NC), não (ND). C: só com autorização do dono dos direitos; num trabalho escolar, no máximo a citação de um trecho com a fonte, como permite a Lei 9.610/1998. D: sim, sim, sim; o crédito é recomendado. 2) “Pôr do sol”, de Ana Lima, licença CC BY 4.0, disponível em (endereço do site). 3) Não: quem grava tem direito sobre o vídeo, mas a imagem de Pedro é dele; postar sem autorização viola o direito de imagem. Deveria ter pedido antes e apagado quando Pedro pediu. 4) Avisar que a imagem foi gerada por IA, conferir os termos da ferramenta e não criar imagens de pessoas reais sem autorização.</p>`,

    'f-co-verdade': () => sheet(`${head('Qualidade da informação')}
      <p>Toda informação, em qualquer formato, passa por três perguntas: é <strong>verdadeira</strong> (os fatos conferem)? É <strong>crível</strong> (a fonte é confiável)? É <strong>relevante</strong> (serve para o que eu preciso)? Os conteúdos abaixo são inventados.</p>
      <div class="msg"><strong>Texto.</strong> Post diz: “Cientistas comprovam que tomar água gelada depois do almoço causa câncer.” Sem link e sem nome dos cientistas.</div>
      <div class="msg"><strong>Foto.</strong> Imagem de um tubarão nadando numa rua alagada de uma cidade gaúcha, compartilhada durante uma enchente.</div>
      <div class="msg"><strong>Áudio.</strong> Áudio de um suposto médico, que não diz o nome nem onde trabalha, pedindo que ninguém leve os filhos para vacinar.</div>
      <div class="msg"><strong>Vídeo.</strong> Vídeo de uma autoridade anunciando o fim das férias escolares. A boca não acompanha bem a fala e a luz do rosto muda.</div>
      <h2>1. Laboratório de checagem</h2>
      ${tabela(['Conteúdo', 'Verdadeiro?', 'Crível?', 'Relevante?', 'Veredito e pistas'], [['Texto', '', '', '', ''], ['Foto', '', '', '', ''], ['Áudio', '', '', '', ''], ['Vídeo', '', '', '', '']])}
      <h2>2. Ferramentas</h2>
      <p>a) O que é busca reversa de imagem e em qual dos conteúdos ela ajuda?</p>${lines(2)}
      <p>b) Cite dois sinais de que uma imagem ou um vídeo pode ter sido feito ou alterado por IA.</p>${lines(2)}
      <h2>3. Desinformação ou erro?</h2>
      <p>Qual é a diferença entre desinformação e erro? Dê um exemplo de cada.</p>${lines(2)}`),
    'f-co-verdade:gab': `<p><strong>Condução (40 min):</strong> grupos, um conteúdo para cada. Cada grupo apresenta o veredito em 1 minuto. Se houver internet, faça a busca reversa ao vivo com uma imagem conhecida. Retome o combinado: na dúvida, não compartilhe.</p>
      <p><strong>Gabarito.</strong> 1) Texto: falso, sem fonte, generaliza um estudo que não é citado. Foto: falsa, montagem antiga que reaparece em várias enchentes; a busca reversa mostra que ela já circulou antes. Áudio: não crível, sem identificação, contraria as orientações oficiais de saúde; é desinformação perigosa. Vídeo: provável deepfake; conferir nos canais oficiais. 2a) Procurar onde a imagem já apareceu na internet; ajuda com a foto (e com quadros do vídeo). 2b) Mãos, dentes ou orelhas estranhos, textos sem sentido no fundo, sombras e luz incoerentes, boca fora de sincronia. 3) Desinformação é espalhada de propósito para enganar; erro é sem intenção e costuma ser corrigido pela fonte.</p>`
  };
};
