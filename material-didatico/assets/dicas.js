/* =====================================================================
   Dicas passo a passo das listas de exercícios (botão "Quero uma dica")
   Cada clique mostra uma etapa a mais, da mais leve à mais forte, sem
   entregar a resposta:
     1. Entenda a pergunta      (conforme o tipo e o enunciado)
     2. Como pensar neste tema  (COMO_PENSAR, por lista)
     3. Exemplo resolvido       (outra questão da mesma lista, com resposta e explicação)
     4. Último empurrão         (descarta alternativas, conta as verdadeiras ou organiza a resposta)
   Depende de LISTAS (listas.js). Usado por lista.html.
   ===================================================================== */
(function () {
  /* Duas etapas de raciocínio para cada lista: o caminho para resolver, não a resposta. */
  const COMO_PENSAR = {
    /* 6º ano */
    'l6-tipos': ['Pergunte: faz sentido fazer contas com esse dado? Se sim, é número (inteiro se for contagem, decimal se tiver vírgula).', 'Se só existem duas respostas possíveis (sim ou não), o dado é lógico. Códigos, nomes e palavras são texto, mesmo quando têm algarismos.'],
    'l6-linguagem': ['Lembre das três estruturas: sequência (um passo depois do outro), condição (se… então…) e repetição (repita… vezes).', 'Simule o algoritmo como se você fosse o computador: siga cada instrução na ordem, sem pular nem adivinhar.'],
    'l6-decomposicao': ['Decompor é quebrar um problema grande em partes menores, que podem ser resolvidas uma de cada vez.', 'Pense em uma tarefa do dia a dia (arrumar a mochila, fazer um bolo) e veja quais etapas ela tem. A resposta costuma seguir essa mesma ideia.'],
    'l6-generalizacao': ['Num programa, separe três coisas: entradas (o que a pessoa informa), processamento (as contas) e saídas (o que aparece no fim).', 'Generalizar é perceber o que se repete em vários casos e escrever uma solução que sirva para todos, trocando os valores fixos por variáveis.'],
    'l6-transmissao': ['Na internet, as informações viajam em pedaços (pacotes), cada um com o endereço de destino.', 'Pense no caminho: quem envia, por onde passa (cabos, roteadores, ondas de rádio) e quem recebe e remonta a mensagem.'],
    'l6-gestao': ['Organizar dados é facilitar encontrar depois: nomes de arquivo claros, pastas por assunto, datas no mesmo formato.', 'Imagine que outra pessoa vai procurar esse arquivo daqui a um ano. Qual opção ela entenderia sem precisar perguntar?'],
    'l6-sociedade': ['Pense nas pessoas envolvidas: a atitude respeita a privacidade e os sentimentos de todos?', 'Uma boa pergunta: eu faria isso se a pessoa estivesse na minha frente? E se fosse comigo?'],
    'l6-sustentabilidade': ['Pense no ciclo de vida de um aparelho: fabricação, uso, conserto e descarte.', 'Atitudes sustentáveis fazem o aparelho durar mais, gastar menos energia ou ter um descarte correto.'],
    /* 7º ano */
    'l7-registros': ['Um vetor (lista) guarda vários valores do mesmo tipo em posições numeradas; um registro junta informações diferentes de uma mesma coisa.', 'Quando houver posições, confira se a contagem começa em 0 e conte devagar, apontando cada valor.'],
    'l7-analise': ['Para analisar um programa, execute-o no papel: anote o valor de cada variável a cada linha.', 'Um bug é um erro no programa. Compare o que o programa faz com o que ele deveria fazer: onde os dois se separam?'],
    'l7-projetos': ['Todo projeto passa por etapas: entender o problema, planejar, construir, testar e melhorar.', 'Pergunte: o que precisa estar pronto antes desta etapa poder começar?'],
    'l7-grafos': ['Um grafo tem vértices (os pontos) e arestas (as ligações entre eles).', 'Desenhe o grafo num papel. Para contar, marque cada ponto ou ligação à medida que conta, para não repetir nenhum.'],
    'l7-reuso': ['Reusar é criar algo uma vez (um bloco, uma função, um procedimento) e usar várias vezes.', 'Procure o que se repete: se você copiaria o mesmo trecho mais de uma vez, ali cabe um bloco reutilizável.'],
    'l7-protocolos': ['Um protocolo é um conjunto de regras combinadas para que computadores consigam conversar.', 'Compare com uma conversa entre pessoas: quem fala primeiro, como confirma que entendeu, o que faz quando algo se perde.'],
    'l7-seguranca': ['Pense como alguém mal-intencionado: o que seria fácil de adivinhar ou de roubar?', 'Proteção boa combina senhas longas e diferentes, verificação em duas etapas e desconfiança de links e pedidos urgentes.'],
    'l7-cyberbullying': ['Cyberbullying é agressão repetida pela internet com a intenção de humilhar, ameaçar ou excluir alguém.', 'Pense no que ajuda a vítima de verdade: não compartilhar, guardar provas, bloquear e contar para um adulto de confiança.'],
    'l7-impactos': ['Toda tecnologia tem efeitos bons e ruins: na saúde, no meio ambiente, no trabalho e na convivência.', 'Procure a opção que considera as consequências, e não só a vantagem imediata.'],
    'l7-producao': ['Uma produção digital (vídeo, podcast, apresentação) começa pelo planejamento: público, objetivo e roteiro.', 'Lembre também da autoria: imagens, músicas e textos de outras pessoas precisam de permissão ou de licença livre e de crédito.'],
    /* 8º ano */
    'l8-listas': ['Numa recursão, a função chama a si mesma com um problema menor e para quando chega ao caso base.', 'Para calcular, escreva as chamadas uma embaixo da outra até o caso base e depois volte substituindo os valores.'],
    'l8-algoritmos': ['Simule o algoritmo com uma lista pequena no papel, passo a passo.', 'Na busca binária, olhe o elemento do meio e descarte a metade em que o valor não pode estar. Na ordenação, acompanhe as trocas uma por vez.'],
    'l8-projetos': ['Num projeto em grupo, cada etapa tem um objetivo: protótipo para testar ideias cedo, testes para achar erros, divisão de tarefas para todos participarem.', 'Pergunte: qual opção ajuda o grupo a errar cedo e barato, antes de investir muito tempo?'],
    'l8-distribuidos': ['Em sistemas distribuídos, vários computadores ou processadores trabalham juntos numa mesma tarefa.', 'Pense numa tarefa da turma dividida entre grupos: o que dá para fazer ao mesmo tempo e o que precisa esperar outra parte terminar?'],
    'l8-internet': ['A internet é uma rede de redes: muitas redes ligadas por roteadores, que seguem os mesmos protocolos.', 'Diferencie as coisas: a internet é a infraestrutura; a web, os aplicativos e os sites são serviços que funcionam sobre ela.'],
    'l8-redes-sociais': ['As redes sociais mostram o que os algoritmos preveem que vai prender sua atenção, usando os dados que você gera.', 'Pense: quem ganha com essa informação? Quem pode ver o que eu publico? O que acontece com meus dados?'],
    'l8-seguranca-virtual': ['Golpes costumam ter urgência ("em 1 hora"), pedem senha ou código e trazem links estranhos.', 'Na dúvida, não clique: confira pelo canal oficial (o aplicativo, o site digitado por você ou uma ligação).'],
    'l8-midias': ['Diante de uma notícia, verifique: quem publicou, quando, qual é a fonte original e se outros veículos confirmam.', 'Desconfie de títulos que provocam emoção forte. Eles são feitos para serem compartilhados antes de serem checados.'],
    /* 9º ano */
    'l9-grafos-arvores': ['Uma árvore é um grafo sem ciclos, com um caminho único entre dois pontos quaisquer.', 'Em árvores de decisão, cada pergunta de sim ou não divide as possibilidades pela metade: conte quantas divisões são necessárias.'],
    'l9-projetos': ['Num projeto com dados, siga o caminho: pergunta, coleta, organização, análise e comunicação do resultado.', 'Pergunte se os dados são confiáveis, de onde vêm e se a conclusão realmente decorre deles.'],
    'l9-automatos': ['Um autômato tem estados (como o sistema está) e transições (o evento que faz mudar de estado).', 'Desenhe os estados como círculos e as transições como setas com o nome do evento. Depois siga as setas.'],
    'l9-seguranca': ['Identifique o tipo de ameaça pelo que ela faz: sequestra arquivos, espiona, se espalha sozinha ou engana a pessoa.', 'Para proteção, pense em camadas: atualizações, cópias de segurança (backup), senhas fortes e cuidado com anexos e links.'],
    'l9-sociedade': ['Pense em quem tem e em quem não tem acesso à tecnologia, e no que isso muda na vida das pessoas.', 'Procure a opção que considera direitos, ética e as diferentes realidades, não só a novidade tecnológica.'],
    'l9-autoria': ['Estar na internet não quer dizer que é livre para usar: toda obra tem um autor e, em geral, direitos.', 'Procure a licença (por exemplo, Creative Commons), dê crédito ao autor e respeite o que a licença permite.'],
    'l9-qualidade': ['Avaliar uma informação é checar a fonte, a data, as evidências e se há interesse por trás dela.', 'Desconfie de conteúdo sem autor, sem data ou que só aparece em um lugar. Procure confirmação em fontes independentes.'],
    /* revisões do ano */
    'l6-revisao': ['Primeiro descubra de qual tema do ano é a questão: tipos de dados, algoritmos, decomposição, redes, organização de dados ou cidadania digital.', 'Depois use a ideia principal daquele tema. Se tiver dúvida, a lista do tema tem questões parecidas para revisar.'],
    'l7-revisao': ['Primeiro descubra de qual tema do ano é a questão: vetores e registros, análise de programas, grafos, reúso, redes, segurança ou cidadania digital.', 'Depois use a ideia principal daquele tema. Se envolver código ou posições, simule no papel.'],
    'l8-revisao': ['Primeiro descubra de qual tema do ano é a questão: recursão, algoritmos clássicos, projetos, sistemas distribuídos, internet, redes sociais ou mídias.', 'Depois use a ideia principal daquele tema. Se envolver cálculo ou algoritmo, escreva cada passo.'],
    'l9-revisao': ['Primeiro descubra de qual tema do ano é a questão: árvores e grafos, dados, autômatos, segurança, sociedade, autoria ou qualidade da informação.', 'Depois use a ideia principal daquele tema e confira se a opção escolhida responde exatamente o que foi perguntado.'],
    /* Matemática */
    'l-ma-decimais': ['Uma fração é uma divisão: 3/4 é 3 ÷ 4. Faça a divisão para chegar ao número decimal.', 'Para comparar, escreva tudo da mesma forma (tudo em decimal ou tudo em fração com o mesmo denominador).'],
    'l-ma-mmc': ['Quando duas coisas se repetem em intervalos diferentes e você quer saber quando coincidem, procure o MMC.', 'Liste os múltiplos de cada número até encontrar o primeiro que aparece nas duas listas.'],
    'l-ma-potencias': ['Potência é multiplicação repetida: 3⁴ = 3 × 3 × 3 × 3. Raiz quadrada é o caminho de volta: que número vezes ele mesmo dá o valor?', 'Em problemas de área de quadrado, lado × lado = área; então o lado é a raiz quadrada da área.'],
    'l-ma-area': ['Perímetro é o contorno (some todos os lados); área é a superfície de dentro (para retângulos, base × altura).', 'Leia o que o problema quer: rodapé e cerca são perímetro; piso, tinta e grama são área. Confira as unidades (m, m²).'],
    'l-ma-inteiros': ['Use a reta numérica: subir a temperatura ou ganhar é andar para a direita; descer ou dever é andar para a esquerda.', 'Na multiplicação e na divisão, sinais iguais dão positivo e sinais diferentes dão negativo.'],
    'l-ma-equacoes': ['Chame o valor desconhecido de x e traduza cada frase do problema em uma parte da equação.', 'Para resolver, desfaça as operações na ordem inversa, fazendo o mesmo dos dois lados do sinal de igual. No fim, substitua x para conferir.'],
    'l-ma-racionais': ['Para comparar frações e decimais, transforme tudo em decimal (divida o numerador pelo denominador) ou em porcentagem.', 'Em operações com frações, some só com denominadores iguais; na multiplicação, multiplique numerador com numerador e denominador com denominador.'],
    'l-ma-regra3': ['Monte uma tabela com duas colunas (por exemplo, kg e R$) e coloque os valores conhecidos e o desconhecido.', 'Pergunte: se uma grandeza aumenta, a outra aumenta (diretamente proporcional) ou diminui (inversamente)? Depois descubra quanto vale uma unidade.'],
    'l-ma-razao': ['Razão é uma comparação por divisão, na ordem pedida: "a para b" é a/b.', 'Simplifique a fração dividindo os dois números pelo mesmo valor, até não dar mais.'],
    'l-ma-proporcao': ['Em uma proporção, as duas razões são iguais: se a largura dobra, a altura também dobra.', 'Descubra o fator (por quanto foi multiplicado) em uma das medidas e aplique o mesmo fator na outra.'],
    'l-ma-produtos': ['(a + b)² = a² + 2ab + b²: o quadrado do primeiro, mais duas vezes o primeiro vezes o segundo, mais o quadrado do segundo.', 'Na dúvida, escreva (a + b)(a + b) e multiplique termo a termo. Para conferir, troque x por um número nos dois lados.'],
    'l-ma-fatoracao': ['Fatorar é o caminho de volta da multiplicação: escrever a expressão como um produto.', 'Para x² + Sx + P, procure dois números que somados dão S e multiplicados dão P. Confira multiplicando de volta.'],
    'l-ma-polinomios': ['Termos semelhantes têm a mesma parte literal (x com x, y com y, x² com x²). Só eles podem ser somados.', 'Agrupe os termos semelhantes, some os coeficientes e mantenha a parte literal. Cuidado com os sinais de menos.'],
    'l-ma-geometria': ['A soma dos ângulos internos de um triângulo é 180°. Em um polígono de n lados, é (n − 2) × 180°.', 'Faça um desenho, escreva os ângulos que você conhece e monte uma conta para o que falta.'],
    'l-ma-tales': ['Retas paralelas cortando transversais (ou sombras no mesmo horário) criam medidas proporcionais.', 'Monte a proporção com as medidas correspondentes, uma fração de cada lado, e multiplique cruzado.'],
    'l-obmep-n1-1': OBMEP(), 'l-obmep-n1-2': OBMEP(), 'l-obmep-n1-3': OBMEP(),
    'l-obmep-n2-1': OBMEP(), 'l-obmep-n2-2': OBMEP(), 'l-obmep-n2-3': OBMEP()
  };
  function OBMEP() {
    return ['Separe os dados do problema (números, unidades) e escreva com suas palavras o que se quer descobrir.', 'Escolha uma estratégia: fazer um desenho, testar com números pequenos, procurar um padrão ou trabalhar de trás para frente. No fim, confira se o resultado faz sentido.'];
  }
  const GERAL = {
    CO: ['Lembre da ideia principal do tema da lista e pense em um exemplo do dia a dia que tenha a ver com a pergunta.', 'Teste cada alternativa contra essa ideia: ela descreve o conceito do jeito certo, por inteiro?'],
    MA: ['Separe os dados do problema e escreva o que se quer descobrir.', 'Escolha a operação ou a fórmula que liga os dados ao que se quer descobrir e faça as contas com calma.']
  };

  /* de onde veio cada questão (a lista surpresa mistura questões de várias listas) */
  let ORIGEM;
  const origemDe = e => {
    if (!ORIGEM) { ORIGEM = new Map(); (typeof LISTAS !== 'undefined' ? LISTAS : []).forEach(l => l.ex.forEach((x, i) => ORIGEM.set(x, { l, i }))); }
    return ORIGEM.get(e) || null;
  };
  const letra = i => String.fromCharCode(97 + i);
  const semTags = h => String(h).replace(/<[^>]+>/g, ' ');

  /* etapa 1: conforme o tipo de questão e o que aparece no enunciado */
  function entenda(e, mat) {
    const txt = semTags(e[1]), dicas = [];
    if (e[0] === 'vf') dicas.push('Julgue uma afirmação de cada vez. Ela só é verdadeira se estiver toda certa: um detalhe errado já a torna falsa.');
    else if (e[0] === 'ab') dicas.push('Veja o que a questão pede: explicar, dar exemplo, criar, comparar? Faça uma lista de tópicos antes de escrever o texto.');
    else dicas.push('Leia o enunciado até o fim e diga com suas palavras o que ele pede, antes de olhar as alternativas.');
    if (/\b(não|NÃO|incorreta|errada|falsa)\b/.test(txt)) dicas.push('Atenção: o enunciado procura o que <strong>não</strong> vale (ou o que está errado). Não marque a primeira opção correta que encontrar.');
    if (/<pre|<code/.test(e[1])) dicas.push('Há código no enunciado: execute-o linha por linha no papel, anotando o valor de cada variável.');
    else if (mat && /\d/.test(txt)) dicas.push('Anote os números com as unidades (m, kg, R$, minutos) e circule o que se quer descobrir.');
    return dicas.map(d => `<p>${d}</p>`).join('');
  }

  /* etapa 3: outra questão de múltipla escolha da mesma lista, já resolvida */
  function exemplo(src, usadas) {
    if (!src) return '';
    const ex = src.l.ex, n = ex.length;
    for (let k = 1; k < n; k++) {
      const j = (src.i + k) % n, o = ex[j];
      if (o[0] !== 'me' || usadas.has(o)) continue;
      const mista = /revisao|obmep/.test(src.l.id);
      return `<p class="small muted">${mista ? 'Outra questão desta lista, já resolvida, para ver o raciocínio completo:' : 'Uma questão do mesmo tema, já resolvida:'}</p>
        <div class="dica-ex"><div>${o[1]}</div>
        <ul>${o[2].map((a, i) => `<li${i === o[3] ? ' class="certa"' : ''}>${letra(i)}) ${a}${i === o[3] ? ' ✓' : ''}</li>`).join('')}</ul>
        ${o[4] ? `<p><strong>Por quê:</strong> ${o[4]}</p>` : ''}</div>
        <p>Agora use o mesmo raciocínio na sua questão.</p>`;
    }
    return '';
  }

  window.MDD = {
    origemDe,
    /* Etapas de dica de uma questão já embaralhada (e) cuja origem é src.
       usadas: questões que já estão na página (não servem de exemplo). Cada etapa: { titulo, html, risca? } */
    passos(e, src, usadas) {
      const mat = src ? src.l.comp === 'MA' : false;
      const pensar = (src && COMO_PENSAR[src.l.id]) || GERAL[mat ? 'MA' : 'CO'];
      const out = [
        { titulo: 'Entenda a pergunta', html: entenda(e, mat) },
        { titulo: 'Como pensar', html: `<ol>${pensar.map(p => `<li>${p}</li>`).join('')}</ol>` }
      ];
      const ex = exemplo(src, usadas || new Set());
      if (ex) out.push({ titulo: 'Exemplo resolvido', html: ex });
      if (e[0] === 'me') {
        // descarta alternativas erradas até sobrarem duas (sempre as mesmas para a mesma questão)
        const erradas = e[2].map((_, i) => i).filter(i => i !== e[3]);
        const h = [...semTags(e[1])].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
        const risca = erradas.sort((a, b) => ((a * 7 + h) % 11) - ((b * 7 + h) % 11)).slice(0, Math.max(0, e[2].length - 2));
        if (risca.length) out.push({ titulo: 'Último empurrão', risca,
          html: `<p>Pode descartar ${risca.length > 1 ? 'as alternativas' : 'a alternativa'} ${risca.sort((a, b) => a - b).map(i => `<strong>${letra(i)})</strong>`).join(' e ')}: ${risca.length > 1 ? 'elas não respondem' : 'ela não responde'} à pergunta. Entre as que sobraram, qual combina com o raciocínio acima?</p>` });
      } else if (e[0] === 'vf') {
        const v = e[2].filter(a => a[1]).length, t = e[2].length;
        out.push({ titulo: 'Último empurrão', html: `<p>Das ${t} afirmações, ${v === 0 ? 'nenhuma é verdadeira' : v === t ? 'todas são verdadeiras' : `${v} ${v > 1 ? 'são verdadeiras' : 'é verdadeira'} e ${t - v} ${t - v > 1 ? 'são falsas' : 'é falsa'}`}. Confira se as suas respostas batem com essa conta.</p>` });
      } else {
        out.push({ titulo: 'Último empurrão', html: `<p>Organize a resposta em três partes:</p><ol><li>responda diretamente o que foi pedido;</li><li>explique o porquê, usando as palavras do tema;</li><li>dê um exemplo concreto.</li></ol><p>Depois compare com a resposta esperada.</p>` });
      }
      return out;
    }
  };
})();
