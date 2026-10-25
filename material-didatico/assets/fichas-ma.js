/* =====================================================================
   Fichas desplugadas de Matemática (oficinas de metodologias ativas).
   Carregado só por ficha.html, que chama FICHAS_MA(utilidades) e junta
   o resultado às fichas de Computação. Cada ficha tem a folha do estudante
   e um gabarito com as orientações de condução para o professor.
   ===================================================================== */
window.FICHAS_MA = function ({ head, sheet, lines, malha }) {
  /* reta numérica simples em SVG: de a até b, com marcas a cada passo */
  function reta(a, b, passo, rotulos, larg = 760) {
    const n = Math.round((b - a) / passo), s = (larg - 40) / n;
    let g = `<line x1="20" y1="40" x2="${larg - 20}" y2="40" stroke="#111" stroke-width="2"/>`;
    for (let i = 0; i <= n; i++) {
      const v = a + i * passo, x = 20 + i * s, forte = rotulos(v);
      g += `<line x1="${x}" y1="${forte ? 28 : 33}" x2="${x}" y2="${forte ? 52 : 47}" stroke="#111" stroke-width="${forte ? 2 : 1.2}"/>`;
      if (forte !== false && forte !== true && forte !== '') g += `<text x="${x}" y="72" font-size="13" text-anchor="middle">${forte}</text>`;
    }
    return `<svg viewBox="0 0 ${larg} 84" width="100%" role="img" aria-label="Reta numérica de ${a} a ${b}">${g}</svg>`;
  }
  /* retângulo quadriculado (peça para recortar) */
  function peca(nx, nz, cel, rot, cor) {
    let g = `<rect x="1" y="1" width="${nx * cel}" height="${nz * cel}" fill="${cor || '#fff'}" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/>`;
    for (let i = 1; i < nx; i++) g += `<line x1="${1 + i * cel}" y1="1" x2="${1 + i * cel}" y2="${1 + nz * cel}" stroke="#999" stroke-width=".8"/>`;
    for (let j = 1; j < nz; j++) g += `<line x1="1" y1="${1 + j * cel}" x2="${1 + nx * cel}" y2="${1 + j * cel}" stroke="#999" stroke-width=".8"/>`;
    g += `<text x="${1 + nx * cel / 2}" y="${1 + nz * cel / 2 + 6}" font-size="${Math.min(18, cel * 1.1)}" font-weight="700" text-anchor="middle">${rot}</text>`;
    return `<svg viewBox="0 0 ${nx * cel + 3} ${nz * cel + 3}" width="${nx * cel + 3}" style="max-width:100%" role="img" aria-label="Peça ${rot} para recortar">${g}</svg>`;
  }
  const tabela = (cab, linhas) => `<table class="t"><tr>${cab.map(c => `<th>${c}</th>`).join('')}</tr>${linhas.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
  const vazias = (n, cols) => Array.from({ length: n }, () => Array(cols).fill(''));
  /* polígono regular para recortar */
  function regular(n, lado, rot) {
    const R = lado / (2 * Math.sin(Math.PI / n)), cx = R + 4, cy = R + 4;
    const pts = Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + Math.PI / n + 2 * Math.PI * i / n; return `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}`; }).join(' ');
    return `<svg viewBox="0 0 ${2 * R + 8} ${2 * R + 8}" width="${(2 * R + 8).toFixed(0)}" style="max-width:100%" role="img" aria-label="${rot} para recortar"><polygon points="${pts}" fill="#fff" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/><text x="${cx}" y="${cy + 5}" font-size="13" text-anchor="middle">${rot}</text></svg>`;
  }

  return {
    /* 1 ------------------------------------------------------------ */
    'f-ma-decimais': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> uma tira de papel de 1 metro (ou uma fita métrica), tiras de papel de 20 cm, lápis de cor e régua.</p>
      <h2>1. Dobrando tiras</h2>
      <p>Dobre uma tira em 2 partes iguais, outra em 4, outra em 5 e outra em 10. Pinte uma parte de cada uma. Depois coloque cada tira sobre o metro e descubra quantos centímetros vale a parte pintada se a tira inteira fosse 1 metro.</p>
      ${tabela(['Fração pintada', 'Em centímetros (de 100)', 'Em decimal (de 1 metro)', 'Em porcentagem'], [['1/2', '', '', ''], ['1/4', '', '', ''], ['3/4', '', '', ''], ['1/5', '', '', ''], ['1/10', '', '', ''], ['7/10', '', '', '']])}
      <h2>2. Marque na reta de 0 a 1 metro</h2>
      <p>Marque e escreva o nome: 0,5 · 0,25 · 0,8 · 0,05 · 3/4 · 1/5</p>
      ${reta(0, 1, 0.05, v => Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? (Math.round(v * 10) / 10).toLocaleString('pt-BR') : true)}
      <h2>3. Quem é maior?</h2>
      <p>Complete com &gt;, &lt; ou =. Use a tira para provar.</p>
      <p style="font-size:18px">0,8 ___ 0,25 &nbsp;&nbsp;&nbsp; 0,5 ___ 0,50 &nbsp;&nbsp;&nbsp; 1/4 ___ 0,4 &nbsp;&nbsp;&nbsp; 0,09 ___ 0,1</p>
      <h2>4. Explique para um colega</h2>
      <p>Um estudante disse que 0,25 é maior que 0,8 “porque 25 é maior que 8”. Escreva como você mostraria, com as tiras, que ele está enganado.</p>
      ${lines(3)}`),
    'f-ma-decimais:gab': `<p><strong>Condução (40 min):</strong> grupos de 4. Cada grupo recebe um metro de papel e 4 tiras. Primeiro dobram e pintam (10 min), depois comparam no metro e preenchem a tabela (15 min). A discussão final parte da pergunta 4.</p>
      <p><strong>Gabarito.</strong> 1) 1/2 = 50 cm = 0,5 = 50%; 1/4 = 25 cm = 0,25 = 25%; 3/4 = 75 cm = 0,75 = 75%; 1/5 = 20 cm = 0,2 = 20%; 1/10 = 10 cm = 0,1 = 10%; 7/10 = 70 cm = 0,7 = 70%. 3) 0,8 &gt; 0,25; 0,5 = 0,50; 1/4 &lt; 0,4; 0,09 &lt; 0,1. 4) 0,8 são 80 cm e 0,25 são 25 cm do metro; comparar decimais é comparar as mesmas casas (décimos com décimos).</p>`,

    /* 2 ------------------------------------------------------------ */
    'f-ma-mmc': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> fita crepe para fazer uma reta de 0 a 40 no chão (um passo por número), fichas ou tampinhas de duas cores.</p>
      <h2>1. Corrida dos sapos</h2>
      <p>Dois colegas saem do 0 ao mesmo tempo. O sapo verde pula de 4 em 4 e o sapo amarelo pula de 6 em 6. Marque na reta onde cada um cai. Em qual número os dois caem no mesmo lugar pela primeira vez?</p>
      ${reta(0, 40, 1, v => v % 5 === 0 ? String(v) : true)}
      <p>Verde: __________________________ &nbsp; Amarelo: __________________________</p>
      <p>Primeiro número em comum: ______ &nbsp;&nbsp; Esse número é o <strong>mmc(4, 6)</strong>.</p>
      <h2>2. Agora vocês escolhem</h2>
      ${tabela(['Pulo do sapo 1', 'Pulo do sapo 2', 'Primeiro encontro', 'O encontro é o produto dos pulos?'], [['3', '5', '', ''], ['4', '8', '', ''], ['6', '9', '', ''], ['', '', '', '']])}
      <h2>3. Problemas da vida real</h2>
      <p>a) Um remédio é tomado de 8 em 8 horas e outro de 12 em 12 horas. Se os dois foram tomados juntos às 6h, quando serão tomados juntos de novo?</p>${lines(2)}
      <p>b) Na feira, ovos são vendidos em caixas de 6 e de 10. Qual é a menor quantidade de ovos que pode ser comprada só com caixas de 6 ou só com caixas de 10?</p>${lines(2)}
      <h2>4. Descoberta</h2>
      <p>Quando o primeiro encontro é igual ao produto dos dois pulos? Quando é igual ao maior pulo?</p>${lines(2)}`),
    'f-ma-mmc:gab': `<p><strong>Condução (45 min):</strong> faça a reta no corredor ou no pátio. Dois estudantes pulam enquanto a turma marca as fichas; depois cada dupla resolve a parte 2 desenhando os pulos na reta da folha. A BNCC (EF07MA01) pede que o mmc seja trabalhado por estratégias diversas, sem algoritmo; a decomposição em primos fica para depois.</p>
      <p><strong>Gabarito.</strong> 1) Verde: 4, 8, 12, 16...; amarelo: 6, 12, 18...; mmc(4, 6) = 12. 2) mmc(3, 5) = 15 (sim, é o produto); mmc(4, 8) = 8 (não; é o maior); mmc(6, 9) = 18 (não). 3a) mmc(8, 12) = 24 horas: às 6h do dia seguinte. 3b) mmc(6, 10) = 30 ovos. 4) É o produto quando os números não têm divisor comum além de 1; é o maior quando um é múltiplo do outro.</p>`,

    /* 3 ------------------------------------------------------------ */
    'f-ma-potencias': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> 70 tampinhas (ou grãos de feijão) por grupo e cubinhos de encaixe, se a escola tiver.</p>
      <h2>1. Montando quadrados</h2>
      <p>Monte com tampinhas quadrados de lado 1, 2, 3, 4, 5, 6, 7 e 8. Conte quantas tampinhas usou em cada um.</p>
      ${tabela(['Lado n', '1', '2', '3', '4', '5', '6', '7', '8'], [['n² (tampinhas)', '', '', '', '', '', '', '', ''], ['n³ (cubinhos, se montar cubos)', '', '', '', '', '', '', '', '']])}
      <h2>2. Raiz quadrada com tampinhas</h2>
      <p>Pegue a quantidade indicada e tente formar o maior quadrado possível. Anote o lado e quantas sobraram.</p>
      ${tabela(['Tampinhas', 'Lado do maior quadrado', 'Sobraram', 'Raiz quadrada (exata ou entre quais números?)'], [['36', '', '', ''], ['50', '', '', ''], ['64', '', '', ''], ['30', '', '', '']])}
      <h2>3. Cuidado com o erro</h2>
      <p>Um colega escreveu 2³ = 6. Monte as duas quantidades (2 × 3 e 2 × 2 × 2) e explique a diferença.</p>${lines(2)}
      <h2>4. Situação real</h2>
      <p>Uma sala quadrada tem 49 m² de piso. Quanto mede cada lado? E uma caixa cúbica que cabe 27 cubinhos de 1 cm: quanto mede a aresta?</p>${lines(2)}`),
    'f-ma-potencias:gab': `<p><strong>Condução (40 min):</strong> grupos de 3. A primeira parte é investigação livre; peça que expliquem por que o nome é “ao quadrado”. Na parte 2, o grupo só registra depois de mostrar o quadrado montado ao professor.</p>
      <p><strong>Gabarito.</strong> 1) n²: 1, 4, 9, 16, 25, 36, 49, 64; n³: 1, 8, 27, 64, 125, 216, 343, 512. 2) 36: lado 6, sobra 0, √36 = 6; 50: lado 7, sobra 1, √50 entre 7 e 8; 64: lado 8, sobra 0, √64 = 8; 30: lado 5, sobram 5, √30 entre 5 e 6. 3) 2 × 3 = 6 é uma soma de parcelas iguais (2 + 2 + 2); 2³ = 2 × 2 × 2 = 8 é uma multiplicação de fatores iguais. 4) √49 = 7 m; ∛27 = 3 cm.</p>`,

    /* 4 ------------------------------------------------------------ */
    'f-ma-area': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> barbante de 24 cm (amarre as pontas) e esta malha de quadradinhos de 1 cm. O barbante é a cerca da horta e não pode ser cortado.</p>
      <h2>1. Hortas com a mesma cerca</h2>
      <p>Use o barbante para formar retângulos na malha (lados inteiros). Desenhe pelo menos quatro e complete a tabela.</p>
      ${malha(14, 34, '')}
      ${tabela(['Largura (cm)', 'Comprimento (cm)', 'Perímetro (cm)', 'Área (cm²)'], vazias(5, 4))}
      `) + sheet(`
      <h2 style="margin-top:0">2. Descobertas</h2>
      <p>a) Todos os retângulos têm o mesmo perímetro? E a mesma área?</p>${lines(1)}
      <p>b) Qual formato dá a maior área? E a menor?</p>${lines(1)}
      <h2>3. Recortando um canto</h2>
      <p>Desenhe um retângulo 6 × 4 e tire um quadrado 2 × 2 de um canto, formando um L. Calcule a área e o perímetro do L. O que aconteceu com cada um?</p>${lines(2)}
      <h2>4. O triângulo é metade</h2>
      <p>Desenhe um retângulo 8 × 5 e trace uma diagonal. Qual é a área de cada triângulo? Escreva uma regra para a área do triângulo.</p>${lines(2)}
      <h2>5. Situação real</h2>
      <p>A escola tem 30 m de tela para cercar uma horta retangular encostada no muro (o muro é um dos lados e não precisa de tela). Quais medidas dão a maior área?</p>${lines(3)}`),
    'f-ma-area:gab': `<p><strong>Condução (50 min):</strong> duplas. O barbante evita que os estudantes confundam perímetro com área: ele é a cerca. Recolha as tabelas e monte uma tabela única no quadro, ordenada pela área. A parte 5 é um desafio para o 7º ano em diante.</p>
      <p><strong>Gabarito.</strong> 1) Com 24 cm: 1 × 11 (11 cm²), 2 × 10 (20), 3 × 9 (27), 4 × 8 (32), 5 × 7 (35), 6 × 6 (36). 2a) Mesmo perímetro, áreas diferentes. 2b) Maior: o quadrado 6 × 6; menor: 1 × 11. 3) Área 24 − 4 = 20; perímetro continua 20, porque os dois lados retirados são substituídos por dois do mesmo tamanho. 4) 40 ÷ 2 = 20 em cada triângulo; área = base × altura ÷ 2. 5) Com o muro como um lado: largura x e comprimento 30 − 2x; testando, x = 7,5 m dá 7,5 × 15 = 112,5 m², a maior área (com valores inteiros, 7 × 16 = 112 ou 8 × 14 = 112).</p>`,

    /* 5 ------------------------------------------------------------ */
    'f-ma-inteiros': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> recorte as fichas abaixo. Cada ficha verde vale <strong>+1</strong> e cada ficha vermelha vale <strong>−1</strong>. Uma verde e uma vermelha juntas formam um <strong>par zero</strong>.</p>
      <div class="cards" style="grid-template-columns:repeat(6,1fr)">${Array.from({ length: 12 }, () => '<div class="cut" style="text-align:center;font-size:22px;font-weight:700;background:#e3f4e8">+1</div>').join('')}${Array.from({ length: 12 }, () => '<div class="cut" style="text-align:center;font-size:22px;font-weight:700;background:#fbe6ea">−1</div>').join('')}</div>
      <h2>1. Somar é juntar</h2>
      <p>Represente com fichas, junte, tire os pares zero e registre o que sobrou.</p>
      ${tabela(['Operação', 'Desenho das fichas', 'Resultado'], [['(+5) + (−3)', '', ''], ['(−4) + (−2)', '', ''], ['(−6) + (+6)', '', ''], ['(+2) + (−7)', '', '']])}
      `) + sheet(`
      <h2 style="margin-top:0">2. Subtrair é tirar</h2>
      <p>Para calcular (+2) − (−3), coloque 2 fichas verdes. Não há fichas vermelhas para tirar, então acrescente 3 pares zero (o valor não muda) e depois tire as 3 vermelhas.</p>
      ${tabela(['Operação', 'Quantos pares zero precisou acrescentar?', 'Resultado'], [['(+2) − (−3)', '', ''], ['(−1) − (+4)', '', ''], ['(−5) − (−2)', '', ''], ['(+3) − (+5)', '', '']])}
      <h2>3. Compare</h2>
      <p>Calcule (+2) − (−3) e (+2) + (+3). E (−1) − (+4) e (−1) + (−4). Que regra você percebe?</p>${lines(2)}
      <h2>4. Situação real</h2>
      <p>Em Vacaria, a temperatura às 6h era −2 °C. Ao meio-dia estava 9 °C. Quantos graus a temperatura subiu? Escreva a operação.</p>${lines(2)}
      <p>Uma conta tinha saldo de −R$ 40,00. Foram depositados R$ 65,00 e depois pagos R$ 30,00. Qual é o saldo final?</p>${lines(2)}`),
    'f-ma-inteiros:gab': `<p><strong>Condução (45 min):</strong> duplas com um saquinho de fichas. Comece só com adições (parte 1). A parte 2 é o centro da aula: deixe que tentem tirar o que não existe e só então mostre o truque dos pares zero. Feche com a regra da parte 3 escrita pela turma.</p>
      <p><strong>Gabarito.</strong> 1) +2; −6; 0; −5. 2) (+2) − (−3) = +5 (3 pares zero); (−1) − (+4) = −5 (4 pares zero); (−5) − (−2) = −3 (nenhum); (+3) − (+5) = −2 (2 pares zero). 3) Os resultados são iguais: subtrair um número é somar o seu oposto. 4) 9 − (−2) = 11 °C. Saldo: −40 + 65 − 30 = −R$ 5,00.</p>`,

    /* 6 ------------------------------------------------------------ */
    'f-ma-equacoes': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> envelopes pequenos (cada um esconde a mesma quantidade de clipes), clipes soltos e o tapete-balança desenhado abaixo. O que está à esquerda pesa o mesmo que o que está à direita.</p>
      <svg viewBox="0 0 760 170" width="100%" role="img" aria-label="Tapete-balança com dois pratos iguais e um triângulo no meio">
        <path d="M380 150 l-24 -34 h48 z" fill="none" stroke="#111" stroke-width="2"/>
        <line x1="40" y1="112" x2="720" y2="112" stroke="#111" stroke-width="4"/>
        <rect x="40" y="10" width="300" height="96" rx="14" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/>
        <rect x="420" y="10" width="300" height="96" rx="14" fill="none" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="190" y="140" font-size="14" text-anchor="middle">lado esquerdo</text><text x="570" y="140" font-size="14" text-anchor="middle">lado direito</text>
      </svg>
      <h2>1. Descubra o envelope</h2>
      <p>Monte cada equação com envelopes (x) e clipes. Só vale fazer a mesma coisa dos dois lados. Registre cada passo.</p>
      ${tabela(['Equação', 'Passos (o que tirei ou dividi dos dois lados)', 'x ='], [['x + 4 = 9', '', ''], ['3x + 2 = 14', '', ''], ['2x + 5 = x + 9', '', ''], ['4x + 1 = 2x + 7', '', '']])}
      <h2>2. Crie para o colega</h2>
      <p>Esconda clipes nos envelopes, monte uma balança equilibrada e escreva a equação. Troque com outra dupla.</p>
      <p>Minha equação: ______________________ &nbsp; Solução: ______</p>
      <h2>3. Do problema para a equação</h2>
      <p>a) Três amigos dividiram igualmente uma pizza de R$ 54,00 e cada um ainda pagou R$ 4,00 de refrigerante. Quanto cada um gastou? E se você soubesse só o total pago por pessoa (R$ 22,00), qual equação daria o preço da pizza?</p>${lines(2)}
      <p>b) A mensalidade de uma academia é R$ 60,00 mais R$ 5,00 por aula. Uma pessoa pagou R$ 110,00. Quantas aulas fez?</p>${lines(2)}`),
    'f-ma-equacoes:gab': `<p><strong>Condução (45 min):</strong> prepare os envelopes antes (por exemplo, 5 clipes em cada para a equação x + 4 = 9). As duplas não podem abrir o envelope até o fim: precisam descobrir x mexendo nos dois lados. Use a pergunta “o que acontece se eu tirar só de um lado?”.</p>
      <p><strong>Gabarito.</strong> 1) x = 5; 3x = 12, x = 4; tirando x e 5 dos dois lados, x = 4; tirando 2x e 1, 2x = 6, x = 3. 3a) Cada um gastou 54 ÷ 3 + 4 = R$ 22,00; equação: p ÷ 3 + 4 = 22, então p = 54. 3b) 60 + 5a = 110, 5a = 50, a = 10 aulas.</p>`,

    /* 7 ------------------------------------------------------------ */
    'f-ma-racionais': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> um barbante esticado de parede a parede (o varal), pregadores e os cartões abaixo recortados. Marque o 0 no meio do varal.</p>
      <div class="cards" style="grid-template-columns:repeat(4,1fr)">${['−3/4', '0,5', '1 e 1/2', '−1,25', '2/3', '−0,1', '5/4', '−2', '0,75', '−1/2', '1,2', '3/8'].map(t => `<div class="cut" style="text-align:center;font-size:24px;font-weight:700;padding:16px">${t}</div>`).join('')}</div>
      <h2>1. Pendure no varal</h2>
      <p>Cada grupo recebe 3 cartões e pendura no lugar certo. A turma confere e pode mudar a posição com uma justificativa.</p>
      <h2>2. Registre a ordem</h2>
      <p>Escreva todos os números do menor para o maior:</p>${lines(1)}
      ${reta(-2, 2, 0.25, v => Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)).replace('-', '−') : true)}
      `) + sheet(`
      <h2 style="margin-top:0">3. Frações e decimais</h2>
      ${tabela(['Número', 'Na forma de fração', 'Na forma decimal'], [['−3/4', '', ''], ['1 e 1/2', '', ''], ['2/3', '', ''], ['3/8', '', ''], ['−1,25', '', '']])}
      <h2>4. Qual é maior?</h2>
      <p>−1/2 ou −3/4? Explique usando o varal.</p>${lines(2)}
      <h2>5. Situação real</h2>
      <p>a) Uma receita pede 3/4 de xícara de açúcar. Você vai fazer meia receita. Quanto açúcar usa?</p>${lines(1)}
      <p>b) Em uma prova de atletismo, os tempos foram 12,35 s, 12,4 s, 12,305 s e 12,5 s. Quem chegou primeiro? Ordene.</p>${lines(1)}
      <p>c) Uma ação na bolsa variou −0,8% na segunda e +1,25% na terça. Qual foi a variação maior em valor absoluto?</p>${lines(1)}`),
    'f-ma-racionais:gab': `<p><strong>Condução (45 min):</strong> o varal é uma reta numérica coletiva. Peça que os grupos justifiquem a posição antes de pendurar; os erros mais comuns (−1/2 à esquerda de −3/4, 2/3 depois de 0,75) viram discussão. Depois cada estudante registra na folha.</p>
      <p><strong>Gabarito.</strong> 2) −2 &lt; −1,25 &lt; −3/4 &lt; −1/2 &lt; −0,1 &lt; 3/8 &lt; 0,5 &lt; 2/3 &lt; 0,75 &lt; 1,2 &lt; 5/4 &lt; 1 e 1/2. 3) −3/4 = −0,75; 1 e 1/2 = 3/2 = 1,5; 2/3 = 0,666...; 3/8 = 0,375; −1,25 = −5/4. 4) −1/2 é maior, porque está mais perto do zero, à direita de −3/4. 5a) 3/8 de xícara. 5b) 12,305 &lt; 12,35 &lt; 12,4 &lt; 12,5; primeiro: 12,305 s. 5c) +1,25% (|1,25| &gt; |−0,8|).</p>`,

    /* 8 ------------------------------------------------------------ */
    'f-ma-regra3': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> a receita abaixo, calculadora (opcional) e copos medidores, se for preparar a receita de verdade.</p>
      <div class="msg"><strong>Bolo de cenoura (rende 8 fatias):</strong> 3 cenouras médias, 4 ovos, 2 xícaras de farinha, 1 e 1/2 xícara de açúcar, 1/2 xícara de óleo.</div>
      <h2>1. Bolo para a turma</h2>
      <p>A turma tem 32 estudantes. Complete a tabela para que cada um ganhe uma fatia.</p>
      ${tabela(['Ingrediente', 'Para 8 fatias', 'Multiplicar por', 'Para 32 fatias'], [['Cenouras', '3', '', ''], ['Ovos', '4', '', ''], ['Farinha (xícaras)', '2', '', ''], ['Açúcar (xícaras)', '1 e 1/2', '', ''], ['Óleo (xícara)', '1/2', '', '']])}
      <h2>2. Monte a regra de três</h2>
      <p>Para 20 fatias, quantos ovos? Organize as grandezas e descubra.</p>
      ${tabela(['Fatias', 'Ovos'], [['8', '4'], ['20', 'x']])}
      ${lines(2)}
      <h2>3. Direta ou inversa?</h2>
      <p>Marque D (diretamente proporcional) ou I (inversamente proporcional) e resolva.</p>
      <p>a) ( ) 5 pintores pintam a escola em 12 dias. Em quantos dias 6 pintores pintariam, no mesmo ritmo?</p>${lines(2)}
      <p>b) ( ) Um carro gasta 8 litros para andar 96 km. Quantos litros gasta em 300 km?</p>${lines(2)}
      <p>c) ( ) Uma viagem leva 3 horas a 80 km/h. Quanto tempo leva a 60 km/h?</p>${lines(2)}`),
    'f-ma-regra3:gab': `<p><strong>Condução (50 min):</strong> se possível, prepare o bolo em grupos com a receita ampliada, ou use a quantidade de ingredientes da merenda. Antes do produto cruzado, peça o fator multiplicativo (“por quanto multiplicou?”). Na parte 3, a pergunta-chave é: se uma grandeza aumenta, a outra aumenta ou diminui?</p>
      <p><strong>Gabarito.</strong> 1) Multiplicar por 4: 12 cenouras, 16 ovos, 8 xícaras de farinha, 6 xícaras de açúcar, 2 xícaras de óleo. 2) 8/20 = 4/x, x = 10 ovos (fator 2,5). 3a) I: 5 × 12 = 6 × d, d = 10 dias. 3b) D: 8/96 = x/300, x = 25 litros. 3c) I: 3 × 80 = 60 × t, t = 4 horas.</p>`,

    /* 9 ------------------------------------------------------------ */
    'f-ma-razao': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> trena ou fita métrica, cronômetro (celular) e giz para marcar 10 metros no pátio.</p>
      <h2>1. Razões na turma</h2>
      ${tabela(['Contagem', 'Quantidade', 'Razão', 'Fração simplificada'], [['Estudantes de óculos : estudantes sem óculos', '', '', ''], ['Estudantes de óculos : total da turma', '', '', ''], ['Janelas : portas da sala', '', '', '']])}
      <h2>2. Razão entre medidas do corpo</h2>
      <p>Meça a sua altura e a sua envergadura (ponta de um dedo médio à outra, braços abertos). Calcule altura ÷ envergadura.</p>
      ${tabela(['Nome', 'Altura (cm)', 'Envergadura (cm)', 'Altura ÷ envergadura'], vazias(4, 4))}
      <p>O que vocês percebem nos resultados?</p>${lines(1)}
      <h2>3. Razão entre grandezas diferentes</h2>
      <p>Cada estudante caminha 10 m e outro cronometra. Calcule a velocidade em metros por segundo.</p>
      ${tabela(['Nome', 'Distância (m)', 'Tempo (s)', 'Velocidade (m/s)'], [['', '10', '', ''], ['', '10', '', ''], ['', '10', '', '']])}
      <p>Meça a sala e calcule a densidade da turma: estudantes por metro quadrado. ___________________</p>
      <h2>4. Escala</h2>
      <p>Num mapa, 1 cm representa 50 km. Duas cidades estão a 7,5 cm no mapa. Qual é a distância real?</p>${lines(2)}`),
    'f-ma-razao:gab': `<p><strong>Condução (50 min):</strong> grupos com papéis (medidor, anotador, cronometrista, calculador). A parte 2 costuma dar resultados perto de 1, o que gera boa discussão sobre o “homem vitruviano”. A parte 3 trabalha a razão entre grandezas de espécies diferentes (EF09MA07), que tem unidade (m/s, estudantes/m²).</p>
      <p><strong>Gabarito.</strong> 1, 2 e 3 dependem das medidas da turma: confira se a razão parte : parte e parte : todo estão bem diferenciadas e se as frações foram simplificadas. Altura ÷ envergadura fica próxima de 1. 4) 7,5 × 50 = 375 km.</p>`,

    /* 10 ----------------------------------------------------------- */
    'f-ma-proporcao': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> régua, lápis de cor e esta folha. A figura da esquerda está numa malha de 1 cm; amplie para a malha maior, onde cada quadradinho tem 2 cm.</p>
      <div class="two">
        <div>${malha(6, 20, `<path d="M20 100 L20 40 L60 20 L100 40 L100 100 Z M40 100 L40 70 L60 70 L60 100" fill="none" stroke="#111" stroke-width="3"/>`)}</div>
        <div>${malha(12, 26, '')}</div>
      </div>
      <h2>1. Compare as medidas</h2>
      ${tabela(['Medida', 'Figura original (cm)', 'Figura ampliada (cm)', 'Razão ampliada : original'], [['Largura da casa', '', '', ''], ['Altura da parede', '', '', ''], ['Largura da porta', '', '', '']])}
      <p>As razões são iguais? Então as medidas formam uma <strong>proporção</strong>. Escreva uma delas: ____ / ____ = ____ / ____</p>
      `) + sheet(`
      <h2 style="margin-top:0">2. E a área?</h2>
      <p>Conte os quadradinhos de 1 cm dentro da casa original e calcule a área da ampliada. A área dobrou?</p>${lines(2)}
      <h2>3. É proporcional?</h2>
      <p>Diga se as grandezas são diretamente proporcionais, inversamente proporcionais ou não proporcionais.</p>
      <p>a) Quantidade de pães e preço pago (cada pão custa o mesmo). ______________________</p>
      <p>b) Idade e altura de uma pessoa. ______________________</p>
      <p>c) Velocidade e tempo de viagem no mesmo percurso. ______________________</p>
      <p>d) Lado de um quadrado e seu perímetro. ______________________</p>
      <h2>4. Situação real</h2>
      <p>Uma foto de 10 cm × 15 cm vai ser ampliada para um cartaz com 45 cm de altura (o lado de 15 cm). Qual será a largura do cartaz para a foto não ficar deformada?</p>${lines(2)}
      <p>Na merenda, 3 kg de arroz servem 40 estudantes. Para 250 estudantes, quantos quilos? Arredonde para cima e explique por quê.</p>${lines(2)}`),
    'f-ma-proporcao:gab': `<p><strong>Condução (45 min):</strong> trabalho individual com conferência em dupla. Peça que antecipem: se o lado dobra, a área dobra? Depois de medir e contar, a turma registra a conclusão. A parte 3 é feita em grupo, com cada grupo defendendo um item.</p>
      <p><strong>Gabarito.</strong> 1) Largura 4 → 8; parede 3 → 6; porta 1 → 2; todas as razões são 2. 2) A área fica 4 vezes maior (2 × 2). 3a) Diretamente; b) não proporcionais; c) inversamente; d) diretamente. 4) 10/15 = x/45, x = 30 cm. Arroz: 3/40 = x/250, x = 18,75 kg; compra-se 19 kg, porque faltaria comida com 18 kg.</p>`,

    /* 11 ----------------------------------------------------------- */
    'f-ma-produtos': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> tesoura e lápis de cor. Recorte as peças pela linha tracejada. Elas representam um quadrado de lado a + b, com a = 5 e b = 3 (cada quadradinho é 1 unidade).</p>
      <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start">
        ${peca(5, 5, 22, 'a²', '#e3f4e8')}${peca(3, 5, 22, 'ab', '#fff9c9')}${peca(5, 3, 22, 'ab', '#fff9c9')}${peca(3, 3, 22, 'b²', '#fbe6ea')}
      </div>
      <h2>1. Monte o quadrado grande</h2>
      <p>Junte as 4 peças para formar um quadrado. Quanto mede o lado? Qual é a área total contando os quadradinhos?</p>${lines(1)}
      <p>Escreva a área como soma das peças: (a + b)² = _____ + _____ + _____ + _____ = __________</p>
      <h2>2. A armadilha</h2>
      <p>Um colega disse que (5 + 3)² = 5² + 3². Calcule os dois lados e mostre com as peças o que ficou faltando.</p>${lines(2)}
      `) + sheet(`
      <h2 style="margin-top:0">3. Quadrado da diferença</h2>
      <p>Pegue só a peça a² (5 × 5). Recorte dela uma faixa de largura 3 em um lado e outra faixa de largura 3 no lado vizinho. O quadrado que sobra tem lado a − b = 2. Explique por que (a − b)² = a² − 2ab + b².</p>${lines(3)}
      <h2>4. Produto da soma pela diferença</h2>
      <p>Desenhe na malha um quadrado 5 × 5 e retire um quadrado 3 × 3 de um canto. Corte o que sobrou em dois retângulos e monte um retângulo só. Quais são os lados? Compare com a² − b².</p>
      ${malha(10, 26, '')}
      <h2>5. Cálculo mental</h2>
      <p>Use os produtos notáveis: 21² = (20 + 1)² = ______ &nbsp;&nbsp; 49² = (50 − 1)² = ______ &nbsp;&nbsp; 31 × 29 = ______</p>`),
    'f-ma-produtos:gab': `<p><strong>Condução (50 min):</strong> grupos de 3 com uma folha por grupo. Não mostre a fórmula antes: deixe que montem o quadrado e escrevam a soma. A parte 2 é a discussão principal. Para o 9º ano, generalize com letras no fim.</p>
      <p><strong>Gabarito.</strong> 1) Lado 8, área 64 = 25 + 15 + 15 + 9; (a + b)² = a² + 2ab + b². 2) (5 + 3)² = 64 e 5² + 3² = 34; faltam os dois retângulos ab = 30. 3) Tirando as duas faixas a × b, o quadradinho b² do canto foi tirado duas vezes; por isso se soma b² de volta: (a − b)² = a² − 2ab + b² = 25 − 30 + 9 = 4. 4) Os lados ficam (a + b) e (a − b) = 8 × 2 = 16 = 25 − 9. 5) 441; 2401; (30 + 1)(30 − 1) = 900 − 1 = 899.</p>`,

    /* 12 ----------------------------------------------------------- */
    'f-ma-fatoracao': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> recorte as peças. O quadrado grande vale <strong>x²</strong>, a barra vale <strong>x</strong> (tem o mesmo comprimento do lado do quadrado grande e largura 1) e o quadradinho vale <strong>1</strong>. Faça pelo menos 2 quadrados x², 8 barras e 12 quadradinhos por dupla.</p>
      <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:flex-start">
        ${[0, 1].map(() => peca(1, 1, 92, 'x²', '#e3f4e8')).join('')}
        ${Array.from({ length: 8 }, () => `<svg viewBox="0 0 30 95" width="30" role="img" aria-label="Barra x para recortar"><rect x="1" y="1" width="27" height="92" fill="#fff9c9" stroke="#111" stroke-width="2" stroke-dasharray="6 4"/><text x="15" y="52" font-size="14" font-weight="700" text-anchor="middle">x</text></svg>`).join('')}
        ${Array.from({ length: 12 }, () => `<svg viewBox="0 0 30 30" width="30" role="img" aria-label="Quadradinho 1 para recortar"><rect x="1" y="1" width="27" height="27" fill="#fbe6ea" stroke="#111" stroke-width="2" stroke-dasharray="5 3"/><text x="15" y="20" font-size="12" font-weight="700" text-anchor="middle">1</text></svg>`).join('')}
      </div>
      <h2>1. Forme retângulos</h2>
      <p>Pegue as peças de cada trinômio e monte um retângulo sem buracos. Desenhe como ficou e escreva os lados.</p>
      ${tabela(['Trinômio', 'Peças', 'Lados do retângulo', 'Forma fatorada'], [['x² + 3x + 2', '1 x², 3 x, 2 unidades', '', ''], ['x² + 5x + 6', '1 x², 5 x, 6 unidades', '', ''], ['x² + 6x + 9', '1 x², 6 x, 9 unidades', '', ''], ['x² + 7x + 12', '1 x², 7 x, 12 unidades', '', '']])}
      `) + sheet(`
      <h2 style="margin-top:0">2. Padrão</h2>
      <p>Em x² + 5x + 6 = (x + 2)(x + 3), qual relação existe entre 2, 3, 5 e 6? Use o padrão para fatorar sem as peças:</p>
      <p style="font-size:18px">x² + 8x + 15 = __________ &nbsp;&nbsp; x² + 9x + 20 = __________ &nbsp;&nbsp; x² + 10x + 25 = __________</p>
      <h2>3. Quando não fecha</h2>
      <p>Tente montar x² + 3x + 4. O que acontece? O que isso diz sobre a fatoração?</p>${lines(2)}
      <h2>4. Fatoração resolve equação</h2>
      <p>Se (x + 2)(x + 3) = 0, quais valores de x tornam a igualdade verdadeira? Por quê?</p>${lines(2)}
      <h2>5. Situação real</h2>
      <p>Um terreno retangular tem área x² + 7x + 12 metros quadrados. Quais expressões representam os lados? Se x = 10 m, quais são as medidas reais?</p>${lines(2)}`),
    'f-ma-fatoracao:gab': `<p><strong>Condução (50 min):</strong> as duplas recortam as peças nos primeiros 10 minutos (ou use EVA preparado antes). Circule perguntando: onde fica o x²? Para onde vão as barras? A parte 2 é a generalização: só faça depois que todos montaram pelo menos três retângulos.</p>
      <p><strong>Gabarito.</strong> 1) (x + 1)(x + 2); (x + 2)(x + 3); (x + 3)(x + 3) = (x + 3)²; (x + 3)(x + 4). 2) 2 + 3 = 5 e 2 × 3 = 6; (x + 3)(x + 5); (x + 4)(x + 5); (x + 5)². 3) Não fecha: não há dois inteiros com soma 3 e produto 4; o trinômio não se fatora assim nos inteiros. 4) x = −2 ou x = −3, porque um produto só é zero quando um dos fatores é zero. 5) (x + 3) e (x + 4); com x = 10: 13 m e 14 m (área 182 m²).</p>`,

    /* 13 ----------------------------------------------------------- */
    'f-ma-polinomios': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> recorte as 12 peças de dominó. Em cada peça, a metade da direita é uma expressão e a da esquerda é outra. Uma peça só encosta na outra quando as duas metades que se tocam são <strong>equivalentes</strong>.</p>
      <div class="cards" style="grid-template-columns:repeat(3,1fr)">
        ${[['INÍCIO', '2(x + 3)'], ['2x + 6', 'x + x + x'], ['3x', '5x − 2x + 4'], ['3x + 4', 'x² + x² '], ['2x²', '(x + 1) + (x − 1)'], ['2x', '4x − (x + 1)'], ['3x − 1', 'x · x'], ['x²', '2x + 3x − x'], ['4x', '3(x − 2)'], ['3x − 6', '−x + 5 + 2x'], ['x + 5', '(2x + 1) − (x − 4) + 2'], ['x + 7', 'FIM']]
          .map(([a, b]) => `<div class="cut" style="display:grid;grid-template-columns:1fr 1fr;padding:0"><div style="padding:12px 6px;text-align:center;font-weight:600;border-right:2px dashed #111">${a}</div><div style="padding:12px 6px;text-align:center;font-weight:600">${b}</div></div>`).join('')}
      </div>
      <p class="small">As peças acima estão em ordem. Recorte e embaralhe antes de jogar.</p>
      <h2>1. Monte a fila do dominó</h2>
      <p>Comece pela peça INÍCIO e termine na FIM. Para cada encaixe, escreva a conta que prova a equivalência.</p>${lines(4)}
      `) + sheet(`
      <h2 style="margin-top:0">2. Termos semelhantes</h2>
      <p>Simplifique: a) 3x + 5 − x + 2 = ________ &nbsp; b) 2x² + 3x − x² + x = ________ &nbsp; c) (4x² − x + 3) + (−x² + 5x − 7) = ________</p>
      <p>d) (3x² + 2x − 1) − (x² − 4x + 2) = ________ &nbsp; e) 2x · 3x = ________ &nbsp; f) x(x + 4) = ________</p>
      <h2>3. Valor numérico</h2>
      <p>Calcule o valor de 2x² − 3x + 1 para x = 0, x = 2 e x = −1.</p>${lines(2)}
      <h2>4. Situação real</h2>
      <p>Uma loja de camisetas tem custo fixo mensal de R$ 800,00 e gasta R$ 15,00 por camiseta. Cada camiseta é vendida por R$ 35,00. Escreva o polinômio do lucro L(x) para x camisetas vendidas. Quantas camisetas precisa vender para não ter prejuízo?</p>${lines(3)}
      <p>O perímetro de um retângulo de lados (2x + 3) e (x − 1) é ________. A área é ________.</p>`),
    'f-ma-polinomios:gab': `<p><strong>Condução (45 min):</strong> grupos de 3 com um jogo de peças embaralhado. O grupo só pode encaixar uma peça quando todos concordam e o anotador escreve a conta. Termina quem chegar ao FIM; depois os grupos trocam de jogo para conferir.</p>
      <p><strong>Gabarito.</strong> 1) Ordem: INÍCIO → 2(x + 3) = 2x + 6 → x + x + x = 3x → 5x − 2x + 4 = 3x + 4 → x² + x² = 2x² → (x + 1) + (x − 1) = 2x → 4x − (x + 1) = 3x − 1 → x · x = x² → 2x + 3x − x = 4x → 3(x − 2) = 3x − 6 → −x + 5 + 2x = x + 5 → (2x + 1) − (x − 4) + 2 = x + 7 → FIM. 2a) 2x + 7; b) x² + 4x; c) 3x² + 4x − 4; d) 2x² + 6x − 3; e) 6x²; f) x² + 4x. 3) Para x = 0: 1; x = 2: 3; x = −1: 6. 4) L(x) = 35x − 15x − 800 = 20x − 800; sem prejuízo a partir de 40 camisetas. Perímetro 6x + 4; área 2x² + x − 3.</p>`,

    /* 14 ----------------------------------------------------------- */
    'f-ma-geometria': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> tesoura, papel colorido e cola. Recorte os polígonos abaixo (todos têm o mesmo lado). Faça várias cópias de cada um.</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center">${[[3, 'triângulo'], [4, 'quadrado'], [5, 'pentágono'], [6, 'hexágono'], [8, 'octógono']].map(([n, t]) => regular(n, 60, t)).join('')}</div>
      <h2>1. Os cantos do triângulo</h2>
      <p>Desenhe um triângulo qualquer em papel colorido, recorte, pinte os três cantos e rasgue-os. Junte os três cantos lado a lado, com as pontas no mesmo ponto. Que ângulo eles formam? Repita com um quadrilátero.</p>${lines(2)}
      <h2>2. Ladrilhar</h2>
      <p>Encaixe cópias do mesmo polígono em volta de um ponto, sem buracos e sem sobrepor.</p>
      ${tabela(['Polígono', 'Ângulo interno', 'Quantos cabem em volta do ponto?', 'Ladrilha o plano?'], [['Triângulo', '60°', '', ''], ['Quadrado', '90°', '', ''], ['Pentágono', '108°', '', ''], ['Hexágono', '120°', '', ''], ['Octógono', '135°', '', '']])}
      `) + sheet(`
      <h2 style="margin-top:0">3. Misturando polígonos</h2>
      <p>Encontre duas combinações de polígonos diferentes que fecham 360° em volta de um ponto. Desenhe e escreva a soma.</p>${lines(3)}
      <h2>4. Soma dos ângulos internos</h2>
      <p>Divida cada polígono em triângulos traçando diagonais a partir de um só vértice.</p>
      ${tabela(['Polígono', 'Número de lados', 'Número de triângulos', 'Soma dos ângulos internos'], [['Quadrilátero', '4', '', ''], ['Pentágono', '5', '', ''], ['Hexágono', '6', '', ''], ['Polígono de n lados', 'n', '', '']])}
      <h2>5. Situação real</h2>
      <p>Um piso de banheiro usa ladrilhos octogonais e pequenos quadrados. Explique, com os ângulos, por que essa combinação funciona.</p>${lines(2)}
      <p>Por que estruturas de telhados e pontes usam tantos triângulos? (Dica: tente deformar um quadrado e um triângulo feitos de palitos e massinha.)</p>${lines(2)}`),
    'f-ma-geometria:gab': `<p><strong>Condução (50 min):</strong> grupos de 4. Prepare cópias dos polígonos em papel cartão para economizar tempo. A parte 1 é individual e rápida; a parte 2 vira um painel coletivo de mosaicos para expor (ligação com Arte, EF07MA27). Se der tempo, faça a investigação dos palitos (rigidez do triângulo, EF07MA25).</p>
      <p><strong>Gabarito.</strong> 1) Os cantos do triângulo formam um ângulo raso (180°); os do quadrilátero formam uma volta inteira (360°). 2) Triângulo: 6, sim; quadrado: 4, sim; pentágono: não fecha (3 × 108 = 324, 4 × 108 = 432); hexágono: 3, sim; octógono: não fecha sozinho. 3) Exemplos: 2 octógonos + 1 quadrado (135 + 135 + 90); 3 triângulos + 2 quadrados (180 + 180); 1 hexágono + 2 quadrados + 1 triângulo (120 + 180 + 60). 4) 2 triângulos, 360°; 3, 540°; 4, 720°; n − 2 triângulos, (n − 2) × 180°. 5) 135 + 135 + 90 = 360. O triângulo é rígido: não muda de forma sem mudar o comprimento dos lados.</p>`,

    /* 15 ----------------------------------------------------------- */
    'f-ma-tales': () => sheet(`${head('Atividade desplugada')}
      <p><strong>Material:</strong> trena, um cabo de vassoura (ou cano) de comprimento conhecido, giz e um dia de sol. Para a parte 3, uma folha de caderno pautada.</p>
      <h2>1. Medindo pela sombra</h2>
      <p>Coloque o bastão em pé, bem reto. No mesmo momento, meça a sombra do bastão e a sombra de algo alto (poste, árvore, parede da escola).</p>
      ${tabela(['Objeto', 'Altura (m)', 'Sombra (m)', 'Altura ÷ sombra'], [['Bastão', '', '', ''], ['', '?', '', '']])}
      <p>Como os raios de sol são paralelos, a razão altura ÷ sombra é a mesma. Calcule a altura desconhecida:</p>${lines(3)}
      <h2>2. Repita meia hora depois</h2>
      <p>As sombras mudaram? A altura calculada mudou? Explique.</p>${lines(2)}
      `) + sheet(`
      <h2 style="margin-top:0">3. Dividir um segmento com a folha pautada</h2>
      <p>As linhas do caderno são paralelas e igualmente espaçadas. Coloque uma tira de papel de 13 cm atravessada sobre 5 espaços, com uma ponta na primeira linha e a outra na sexta. Marque onde as linhas cortam a tira. Meça os pedaços.</p>
      ${tabela(['Pedaço', '1º', '2º', '3º', '4º', '5º'], [['Medida (cm)', '', '', '', '', '']])}
      <p>Por que os pedaços ficaram iguais, mesmo com a tira inclinada?</p>${lines(2)}
      <h2>4. Teorema de Tales</h2>
      <p>Três ruas paralelas são cortadas por duas avenidas. Na avenida A, os quarteirões entre as ruas medem 60 m e 90 m. Na avenida B, o primeiro quarteirão mede 80 m. Quanto mede o segundo?</p>
      <svg viewBox="0 0 520 220" width="100%" style="max-width:520px" role="img" aria-label="Três retas paralelas horizontais cortadas por duas avenidas inclinadas, com as medidas 60 m e 90 m na avenida A e 80 m e x na avenida B">
        <g stroke="#111" stroke-width="2"><line x1="20" y1="30" x2="500" y2="30"/><line x1="20" y1="100" x2="500" y2="100"/><line x1="20" y1="205" x2="500" y2="205"/>
        <line x1="90" y1="10" x2="170" y2="215" stroke-width="3"/><line x1="300" y1="10" x2="460" y2="215" stroke-width="3"/></g>
        <g font-size="14"><text x="100" y="72">60 m</text><text x="140" y="160">90 m</text><text x="350" y="72">80 m</text><text x="410" y="160">x</text><text x="60" y="20">A</text><text x="285" y="20">B</text></g>
      </svg>
      ${lines(2)}
      <h2>5. A largura do rio</h2>
      <p>Pesquise ou invente um modo de medir a largura de um rio sem atravessá-lo, usando estacas e triângulos semelhantes. Faça um desenho.</p>${lines(3)}`),
    'f-ma-tales:gab': `<p><strong>Condução (50 min, com saída ao pátio):</strong> grupos de 4 com papéis (segura o bastão, mede, anota, calcula). Combine o horário: entre 9h e 10h ou entre 14h e 15h as sombras ficam fáceis de medir. Se estiver nublado, faça a parte 3 e a 4 em sala e use o recurso 3D Teorema de Tales para a parte 1.</p>
      <p><strong>Gabarito.</strong> 1) Altura = altura do bastão × sombra do objeto ÷ sombra do bastão (exemplo: bastão de 1,2 m com sombra de 0,8 m e poste com sombra de 4 m: 1,2 × 4 ÷ 0,8 = 6 m). 2) As sombras mudam, mas a razão continua igual para os dois no mesmo instante, então a altura calculada se mantém. 3) Cada pedaço mede 13 ÷ 5 = 2,6 cm: paralelas igualmente espaçadas determinam segmentos iguais em qualquer transversal. 4) 60/90 = 80/x, x = 120 m (EF09MA14). 5) Resposta aberta: espera-se a construção de dois triângulos semelhantes com estacas na margem e a proporção entre os lados correspondentes.</p>`
  };
};
