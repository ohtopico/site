/* Desafio da Mesada (versão completa, antes "Mesada Pro"): dois anos de escolhas.
   O 2º ano herda o dinheiro do 1º e começa com bônus ou penalidades pela diversão, pela meta e pelos bicos.
   Usado por material-didatico/jogos/mesada.html e pela área premium. Precisa dos elementos
   #mes #ok #fun (e, se existir, #ano) #poup #aplic #cart #parc #div #bar #metalbl #extrato #card #fb #actions. */
(function () {
  const $ = s => document.querySelector(s);
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const r2 = v => Math.round(v * 100) / 100;
  const R$ = v => 'R$ ' + r2(v).toLocaleString('pt-BR', { minimumFractionDigits: Number.isInteger(r2(v)) ? 0 : 2, maximumFractionDigits: 2 });
  const MESADA = 60, MESADA2 = 70, PRESENTE = 50, TAXA = 0.01, TAXA_APLIC = 0.02, PRAZO_APLIC = 3, JUROS_DIVIDA = 0.10, FEIRAS = [3, 6, 9], MAX_BICOS = 3;
  const METAS = [
    { id: 'fone', nome: 'Fone sem fio', valor: 200, txt: 'Tranquilo: dá com disciplina.' },
    { id: 'bike', nome: 'Bicicleta', valor: 450, txt: 'Exige guardar mais da metade.' },
    { id: 'viagem', nome: 'Viagem de formatura', valor: 650, txt: 'Difícil: só com a feira, bicos e aplicações.' }
  ];
  /* Situações. escolhas: custo (sai da carteira), ganho (entra na carteira), poup (entra na poupança),
     parcelas [valor, n] (cobradas nos próximos meses), fun (diversão), receber (valor que volta no mês seguinte),
     sorte [prob, prêmio], mesada (novo valor da mesada). obrig: não dá para recusar. */
  const EVENTOS = [
    { t: 'Tênis novo', p: 'O tênis custa R$ 150,00. À vista tem 10% de desconto; parcelado sai em 3 × R$ 55,00. Quanto você paga à vista?', c: 'R$ 135', e: ['R$ 140', 'R$ 165', 'R$ 15'], x: '10% de 150 é 15. À vista: 150 − 15 = 135. Parcelado: 3 × 55 = 165, ou seja, R$ 30 a mais pelo mesmo tênis.',
      escolhas: [{ l: 'Comprar à vista (R$ 135)', custo: 135, fun: 4 }, { l: 'Parcelar em 3 × R$ 55', parcelas: [55, 3], fun: 4 }, { l: 'Não comprar agora' }] },
    { t: 'Combo na lanchonete', p: 'O combo de R$ 20,00 está com 15% de desconto. Quanto ele custa?', c: 'R$ 17', e: ['R$ 15', 'R$ 18,50', 'R$ 3'], x: '10% de 20 é 2 e 5% é 1: o desconto é 3. O combo sai por 17.',
      escolhas: [{ l: 'Pedir o combo (R$ 17)', custo: 17, fun: 2 }, { l: 'Passar' }] },
    { t: 'Show na cidade', p: 'O ingresso inteiro custa R$ 80,00 e estudante paga meia-entrada (50%). Quanto você paga?', c: 'R$ 40', e: ['R$ 50', 'R$ 30', 'R$ 8'], x: 'Meia-entrada é 50%, a metade de 80: R$ 40.',
      escolhas: [{ l: 'Ir ao show (R$ 40)', custo: 40, fun: 5 }, { l: 'Ficar em casa' }] },
    { t: 'O celular quebrou', p: 'O conserto custa R$ 90,00, com 20% de desconto à vista. Quanto você paga à vista?', c: 'R$ 72', e: ['R$ 70', 'R$ 18', 'R$ 80'], x: '20% de 90 é 18 (10% é 9, vezes 2). À vista: 90 − 18 = 72. Imprevistos assim são o motivo de ter uma reserva.', obrig: true,
      escolhas: [{ l: 'Pagar à vista (R$ 72)', custo: 72 }, { l: 'Parcelar em 2 × R$ 45', parcelas: [45, 2] }] },
    { t: 'Presente coletivo', p: 'Três amigos vão dividir igualmente um presente de R$ 75,00. Quanto cada um paga?', c: 'R$ 25', e: ['R$ 15', 'R$ 35', 'R$ 37,50'], x: '75 ÷ 3 = 25. Dividir em grupo deixa o presente melhor e mais barato para cada um.',
      escolhas: [{ l: 'Entrar na vaquinha (R$ 25)', custo: 25, fun: 2 }, { l: 'Fazer um cartão à mão', fun: 1 }] },
    { t: 'Presente da avó', p: 'Sua avó te deu R$ 50,00 e sugeriu guardar 40%. Quanto vai para a poupança?', c: 'R$ 20', e: ['R$ 40', 'R$ 10', 'R$ 30'], x: '10% de 50 é 5, então 40% é 4 × 5 = 20. Os outros 30 ficam na carteira.',
      escolhas: [{ l: 'Seguir o conselho da avó', poup: 20, ganho: 30 }, { l: 'Guardar tudo', poup: 50 }] },
    { t: 'Streaming', p: 'A assinatura de R$ 25,00 por mês teve aumento de 20%. Qual é o novo preço mensal?', c: 'R$ 30', e: ['R$ 45', 'R$ 27', 'R$ 20'], x: '20% de 25 é 5. Novo preço: 30. Um gasto pequeno por mês vira R$ 360 por ano.',
      escolhas: [{ l: 'Assinar por 3 meses (3 × R$ 30)', parcelas: [30, 3], fun: 4 }, { l: 'Cancelar' }] },
    { t: 'Empréstimo para um amigo', p: 'Um amigo pede R$ 20,00 e promete devolver R$ 22,00 no mês que vem. Quantos por cento a mais ele devolve?', c: '10%', e: ['2%', '22%', '20%'], x: 'A mais são 2 reais sobre 20. Como 2 é um décimo de 20, são 10%.',
      escolhas: [{ l: 'Emprestar R$ 20', custo: 20, receber: 22 }, { l: 'Não emprestar' }] },
    { t: 'Leve 3, pague 2', p: 'O chocolate custa R$ 6,00 e está na promoção “leve 3, pague 2”. Quanto sai cada chocolate?', c: 'R$ 4', e: ['R$ 2', 'R$ 3', 'R$ 5'], x: 'Você paga 2 × 6 = 12 por 3 chocolates: 12 ÷ 3 = 4 cada. É um desconto de um terço, cerca de 33%.',
      escolhas: [{ l: 'Levar 3 (R$ 12)', custo: 12, fun: 2 }, { l: 'Passar' }] },
    { t: 'Liquidação dupla', p: 'Uma jaqueta de R$ 120,00 tem 30% de desconto e, no caixa, mais 10% sobre o novo preço. Quanto você paga?', c: 'R$ 75,60', e: ['R$ 72', 'R$ 84', 'R$ 108'], x: '120 × 0,7 = 84 e 84 × 0,9 = 75,60. Os descontos não somam 40%: o segundo incide sobre o preço já reduzido.',
      escolhas: [{ l: 'Comprar (R$ 75,60)', custo: 75.6, fun: 4 }, { l: 'Não comprar' }] },
    { t: 'Trabalho extra', p: 'O vizinho paga R$ 15,00 por lavagem do carro. Ele quer 4 lavagens este mês. Quanto você recebe?', c: 'R$ 60', e: ['R$ 45', 'R$ 19', 'R$ 75'], x: '4 × 15 = 60. É como ganhar uma mesada a mais.',
      escolhas: [{ l: 'Aceitar o trabalho', ganho: 60, fun: -1 }, { l: 'Recusar' }] },
    { t: 'Rifa da escola', p: 'A rifa tem 100 números de R$ 2,00 e o prêmio é R$ 50,00. Se você comprar 2 números, qual é a sua chance de ganhar?', c: '2%', e: ['50%', '20%', '1%'], x: '2 números em 100 dão probabilidade 2/100 = 2%. Na maioria das vezes, a rifa é um jeito de ajudar a escola, e não de ganhar dinheiro.',
      escolhas: [{ l: 'Comprar 2 números (R$ 4)', custo: 4, sorte: [0.02, 50] }, { l: 'Não comprar' }] },
    { t: 'Videogame usado', p: 'Um videogame usado custa R$ 300,00 à vista ou 6 × R$ 60,00. Quanto você paga a mais no parcelado?', c: 'R$ 60', e: ['R$ 0', 'R$ 30', 'R$ 360'], x: '6 × 60 = 360. Comparando com 300 à vista, são R$ 60 a mais, ou seja, 20% a mais.',
      escolhas: [{ l: 'Comprar à vista (R$ 300)', custo: 300, fun: 8 }, { l: 'Parcelar 6 × R$ 60', parcelas: [60, 6], fun: 8 }, { l: 'Não comprar' }] },
    { t: 'O preço do lanche subiu', p: 'O lanche da cantina passou de R$ 10,00 para R$ 12,00. De quantos por cento foi o aumento?', c: '20%', e: ['2%', '12%', '16,7%'], x: 'Aumento de 2 sobre o preço antigo, 10: 2/10 = 20%. A mesada continua a mesma, mas compra menos: isso é inflação.',
      escolhas: [{ l: 'Entendi' }] },
    { t: 'Material escolar', p: 'Você precisa de material de R$ 40,00. Um aplicativo devolve 5% do valor (cashback). Quanto volta?', c: 'R$ 2', e: ['R$ 5', 'R$ 4', 'R$ 0,50'], x: '10% de 40 é 4, e 5% é a metade: R$ 2.', obrig: true,
      escolhas: [{ l: 'Comprar pelo aplicativo (R$ 40, volta R$ 2)', custo: 40, ganho: 2 }] },
    { t: 'Promoção relâmpago', p: 'Um anúncio grita: “De R$ 100,00 por R$ 70,00, só hoje!”. De quantos por cento é o desconto?', c: '30%', e: ['70%', '3%', '43%'], x: 'O desconto é 30 sobre 100, ou seja, 30%. Pressa é a estratégia do anúncio: se você não precisava do produto ontem, talvez não precise hoje.',
      escolhas: [{ l: 'Comprar na hora (R$ 70)', custo: 70, fun: 2 }, { l: 'Esperar uma semana e decidir com calma' }] },
    { t: 'Teste grátis', p: 'Um aplicativo de música oferece 1 mês grátis e depois cobra R$ 19,90 por mês. Quanto você paga em 3 meses depois do teste?', c: 'R$ 59,70', e: ['R$ 19,90', 'R$ 57', 'R$ 79,60'], x: '3 × 19,90 = 59,70. Muita gente esquece de cancelar o teste e paga sem perceber.',
      escolhas: [{ l: 'Assinar e esquecer de cancelar', parcelas: [19.9, 3], fun: 2 }, { l: 'Assinar e cancelar antes de cobrar', fun: 1 }, { l: 'Não assinar' }] },
    { t: 'Garantia estendida', p: 'Uma caixinha de som custa R$ 80,00 e a garantia estendida custa 25% do preço. Quanto custa a garantia?', c: 'R$ 20', e: ['R$ 25', 'R$ 8', 'R$ 32'], x: '25% é um quarto: 80 ÷ 4 = 20. Com garantia, a caixinha sai por R$ 100. Vale a pena só se o risco de estragar for alto.',
      escolhas: [{ l: 'Comprar com garantia (R$ 100)', custo: 100, fun: 3 }, { l: 'Comprar sem garantia (R$ 80)', custo: 80, fun: 3 }, { l: 'Não comprar' }] },
    { t: 'Mesada reajustada', p: 'Seus responsáveis vão aumentar a mesada de R$ 60,00 em 5% a partir do mês que vem. Qual será a nova mesada?', c: 'R$ 63', e: ['R$ 65', 'R$ 60,05', 'R$ 66'], x: '10% de 60 é 6, e 5% é a metade: 3. Nova mesada: 60 + 3 = 63.',
      escolhas: [{ l: 'Combinar de guardar o aumento', mesada: 63 }] }
  ];
  const FEIRA_Q = [
    { p: 'Cada brigadeiro custa R$ 0,80 para fazer e é vendido por R$ 2,00. Qual é o lucro por brigadeiro?', c: 'R$ 1,20', e: ['R$ 2,80', 'R$ 0,80', 'R$ 1,00'], x: 'Lucro = preço de venda − custo = 2,00 − 0,80 = 1,20.' },
    { p: 'Cada brigadeiro custa R$ 0,80 e é vendido por R$ 2,00. O lucro é quantos por cento do custo?', c: '150%', e: ['60%', '120%', '40%'], x: 'O lucro de 1,20 dividido pelo custo de 0,80 dá 1,5, ou seja, 150% do custo.' },
    { p: 'Você fez 40 brigadeiros (custo de R$ 0,80 cada) e vendeu 30 a R$ 2,00. Qual foi o lucro?', c: 'R$ 28', e: ['R$ 36', 'R$ 60', 'R$ 32'], x: 'Receita: 30 × 2 = 60. Custo: 40 × 0,80 = 32, porque você pagou todos os que fez. Lucro: 60 − 32 = 28.' }
  ];
  /* Bicos: renda extra que o jogador escolhe fazer nas ações do mês (no máximo 3 no ano) */
  const BICOS = [
    { t: 'Passear com o cachorro', p: 'A vizinha paga R$ 8,00 por passeio com o cachorro. Você fez 5 passeios. Quanto recebeu?', c: 'R$ 40', e: ['R$ 13', 'R$ 45', 'R$ 35'], x: '5 × 8 = 40.', ganho: 40, fun: -1 },
    { t: 'Brechó do que não usa', p: 'Você vendeu 4 peças de roupa a R$ 12,50 cada. Quanto recebeu?', c: 'R$ 50', e: ['R$ 48', 'R$ 16,50', 'R$ 52,50'], x: '4 × 12,50 = 50. Dica: 2 × 12,50 = 25, e dobrando de novo dá 50.', ganho: 50, fun: 0 },
    { t: 'Reforço para um colega', p: 'Você deu 3 aulas de reforço de R$ 15,00 com 20% de desconto para amigos. Quanto recebeu?', c: 'R$ 36', e: ['R$ 45', 'R$ 39', 'R$ 9'], x: '3 × 15 = 45, e 20% de 45 é 9. Com desconto: 45 − 9 = 36.', ganho: 36, fun: 1 },
    { t: 'Figurinhas repetidas', p: 'Você vendeu 30 figurinhas repetidas a R$ 0,40 cada. Quanto recebeu?', c: 'R$ 12', e: ['R$ 1,20', 'R$ 120', 'R$ 30,40'], x: '30 × 0,40 = 12. Pense em 3 × 4 = 12.', ganho: 12, fun: 1 },
    { t: 'Ajudar na horta', p: 'Seu tio paga R$ 9,00 por hora para ajudar na horta. Você trabalhou 4 horas e meia. Quanto recebeu?', c: 'R$ 40,50', e: ['R$ 36', 'R$ 45', 'R$ 13,50'], x: '4 × 9 = 36 e meia hora é 4,50. Total: 36 + 4,50 = 40,50.', ganho: 40.5, fun: -1 }
  ];
  /* 2º ano: metas, situações, feira e bicos novos */
  const METAS2 = [
    { id: 'curso', nome: 'Curso de programação', valor: 600, txt: 'Tranquilo se sobrou dinheiro do 1º ano.' },
    { id: 'notebook', nome: 'Notebook para estudar', valor: 900, txt: 'Exige guardar bem e usar a sobra do 1º ano.' },
    { id: 'intercambio', nome: 'Intercâmbio de férias', valor: 1500, txt: 'Muito difícil: só com sobra, aplicações e renda extra.' }
  ];
  const EVENTOS2 = [
    { t: 'Fone com juros', p: 'Um fone de R$ 120,00 pode ser parcelado em 4 vezes com 5% de juros sobre o total. Qual é o valor de cada parcela?', c: 'R$ 31,50', e: ['R$ 30', 'R$ 35', 'R$ 126'], x: '5% de 120 é 6, então o total vai a 126. Dividindo em 4: 126 ÷ 4 = 31,50. São R$ 6 a mais só por parcelar.',
      escolhas: [{ l: 'Comprar à vista (R$ 120)', custo: 120, fun: 3 }, { l: 'Parcelar em 4 × R$ 31,50', parcelas: [31.5, 4], fun: 3 }, { l: 'Não comprar' }] },
    { t: 'Compra em site estrangeiro', p: 'Um jogo custa US$ 10,00. Com o dólar a R$ 5,00 e 20% de imposto sobre o valor em reais, quanto você paga?', c: 'R$ 60', e: ['R$ 50', 'R$ 52', 'R$ 70'], x: '10 × 5 = 50 reais. 20% de 50 é 10. Total: 50 + 10 = 60.',
      escolhas: [{ l: 'Comprar o jogo (R$ 60)', custo: 60, fun: 4 }, { l: 'Esperar uma promoção' }] },
    { t: 'Mensagem suspeita', p: 'Chega uma mensagem: “Pague R$ 15,00 de taxa e receba um prêmio de R$ 300,00”. O prêmio prometido é quantas vezes a taxa?', c: '20 vezes', e: ['15 vezes', '30 vezes', '2 vezes'], x: '300 ÷ 15 = 20. Promessa de ganho muito maior do que o pagamento é o sinal clássico de golpe: ninguém cobra taxa para entregar prêmio.',
      escolhas: [{ l: 'Apagar a mensagem e avisar a família' }, { l: 'Pagar a taxa (R$ 15)', custo: 15, msg: 'Era golpe: o prêmio nunca chegou e os R$ 15 não voltam.' }] },
    { t: 'Pacote econômico', p: 'O pacote de 500 g de biscoito custa R$ 6,00 e o de 1 kg custa R$ 10,00. Quanto custa 1 kg comprando dois pacotes pequenos?', c: 'R$ 12', e: ['R$ 6', 'R$ 10', 'R$ 16'], x: '2 × 6 = 12. O pacote grande sai R$ 2 mais barato por quilo, cerca de 17% de economia.',
      escolhas: [{ l: 'Levar o pacote de 1 kg (R$ 10)', custo: 10, fun: 1 }, { l: 'Levar dois pacotes pequenos (R$ 12)', custo: 12, fun: 1 }, { l: 'Passar' }] },
    { t: 'Viagem com a turma', p: 'A casa na praia para o fim de semana custa R$ 480,00, divididos igualmente entre 6 amigos. Quanto cada um paga?', c: 'R$ 80', e: ['R$ 60', 'R$ 96', 'R$ 48'], x: '480 ÷ 6 = 80. Dividir em grupo deixa a viagem possível para todos.',
      escolhas: [{ l: 'Ir e pagar à vista (R$ 80)', custo: 80, fun: 7 }, { l: 'Ir e pagar em 2 × R$ 40', parcelas: [40, 2], fun: 7 }, { l: 'Não ir' }] },
    { t: 'Investimento arriscado', p: 'Um colega propõe: você entrega R$ 50,00 e, com 50% de chance, recebe R$ 80,00; com 50% de chance, recebe só R$ 10,00. Em média, quanto volta?', c: 'R$ 45', e: ['R$ 80', 'R$ 50', 'R$ 90'], x: 'A média é (80 + 10) ÷ 2 = 45. Em média você perde R$ 5: risco alto sem ganho esperado não é investimento, é aposta.',
      escolhas: [{ l: 'Arriscar R$ 50', custo: 50, sorte: [0.5, 80, 10] }, { l: 'Recusar' }] },
    { t: 'Curso de inglês', p: 'O curso custa R$ 40,00 por mês. Pagando 6 meses de uma vez, há 15% de desconto. Quanto você paga pelos 6 meses?', c: 'R$ 204', e: ['R$ 225', 'R$ 240', 'R$ 36'], x: '6 × 40 = 240. 15% de 240 é 36. À vista: 240 − 36 = 204.',
      escolhas: [{ l: 'Pagar os 6 meses à vista (R$ 204)', custo: 204, fun: 2 }, { l: 'Pagar por mês (6 × R$ 40)', parcelas: [40, 6], fun: 2 }, { l: 'Não fazer o curso' }] },
    { t: 'Aumentos seguidos', p: 'O ingresso do cinema custava R$ 20,00. Subiu 10% no começo do ano e mais 10% depois. Quanto custa agora?', c: 'R$ 24,20', e: ['R$ 24', 'R$ 22', 'R$ 40'], x: '20 × 1,1 = 22 e 22 × 1,1 = 24,20. Aumentos seguidos se acumulam como juros compostos: o preço subiu 21%, não 20%.',
      escolhas: [{ l: 'Ir ao cinema (R$ 24,20)', custo: 24.2, fun: 3 }, { l: 'Ver um filme em casa', fun: 1 }] },
    { t: 'Seguro do celular', p: 'O seguro do celular custa R$ 8,00 por mês. Quanto você paga em 6 meses?', c: 'R$ 48', e: ['R$ 40', 'R$ 54', 'R$ 14'], x: '6 × 8 = 48. Compare com o conserto do ano passado (R$ 90, ou 72 à vista): seguro compensa quando o risco é alto.',
      escolhas: [{ l: 'Contratar por 6 meses (6 × R$ 8)', parcelas: [8, 6] }, { l: 'Não contratar e manter uma reserva' }] },
    { t: 'Pix com valor trocado', p: 'Você ia pagar R$ 35,00 da sua parte da pizza, mas digitou R$ 53,00. Quanto mandou a mais?', c: 'R$ 18', e: ['R$ 12', 'R$ 22', 'R$ 88'], x: '53 − 35 = 18. Conferir o valor antes de confirmar evita esse tipo de susto.',
      escolhas: [{ l: 'Pedir ao amigo para devolver R$ 18', custo: 53, receber: 18, fun: 2 }] },
    { t: 'Óculos novos', p: 'A armação custa R$ 150,00 e a ótica dá 12% de desconto à vista. Quanto você paga à vista?', c: 'R$ 132', e: ['R$ 138', 'R$ 18', 'R$ 162'], x: '10% de 150 é 15 e 2% é 3: o desconto é 18. À vista: 150 − 18 = 132.', obrig: true,
      escolhas: [{ l: 'Pagar à vista (R$ 132)', custo: 132 }, { l: 'Parcelar em 3 × R$ 50', parcelas: [50, 3] }] },
    { t: 'Taxa da formatura', p: 'A comissão de formatura cobra R$ 180,00, que podem ser pagos em 6 parcelas iguais, sem juros. Qual é o valor de cada parcela?', c: 'R$ 30', e: ['R$ 36', 'R$ 18', 'R$ 25'], x: '180 ÷ 6 = 30. Sem juros, parcelar não custa mais caro, mas compromete a mesada dos próximos meses.', obrig: true,
      escolhas: [{ l: 'Pagar à vista (R$ 180)', custo: 180, fun: 3 }, { l: 'Parcelar em 6 × R$ 30', parcelas: [30, 6], fun: 3 }] }
  ];
  /* penalidade do 2º ano para quem quase não se divertiu no 1º */
  const IMPULSO = { t: 'Compra por impulso', p: 'Depois de um ano inteiro sem lazer, você gastou tudo de uma vez: um lanche de R$ 18,00, um acessório de R$ 25,00 e um jogo de R$ 37,00. Quanto gastou?', c: 'R$ 80', e: ['R$ 70', 'R$ 62', 'R$ 90'], x: '18 + 25 + 37 = 80. Guardar tudo sem nenhum lazer costuma terminar assim: o gasto reprimido volta de uma vez. Um pouco de diversão planejada sai mais barato.', obrig: true,
    escolhas: [{ l: 'Pagar a conta (R$ 80)', custo: 80, fun: 3 }] };
  const FEIRA2_Q = [
    { p: 'Cada pulseira custa R$ 1,50 de material e é vendida por R$ 4,00. Qual é o lucro por pulseira?', c: 'R$ 2,50', e: ['R$ 5,50', 'R$ 1,50', 'R$ 3'], x: 'Lucro = preço de venda − custo = 4,00 − 1,50 = 2,50.' },
    { p: 'A banca da feira custa R$ 10,00. Com lucro de R$ 2,50 por pulseira, quantas pulseiras pagam a banca?', c: '4', e: ['3', '10', '25'], x: '10 ÷ 2,50 = 4. Esse é o ponto de equilíbrio: a partir da 5ª pulseira vendida, a banca dá lucro.' },
    { p: 'Você fez 30 pulseiras (R$ 1,50 cada), pagou R$ 10,00 de banca e vendeu 24 a R$ 4,00. Qual foi o lucro?', c: 'R$ 41', e: ['R$ 51', 'R$ 60', 'R$ 86'], x: 'Receita: 24 × 4 = 96. Custos: 30 × 1,50 = 45, mais 10 da banca, total 55. Lucro: 96 − 55 = 41.' }
  ];
  const FEIRAS_CFG = [
    { nome: 'Feira da escola', item: 'brigadeiros', custo: 0.8, preco: 2, fixo: 0, qs: [20, 40, 60] },
    { nome: 'Feira de empreendedorismo', item: 'pulseiras', custo: 1.5, preco: 4, fixo: 10, qs: [10, 20, 30] }
  ];
  const BICOS2 = [
    { t: 'Monitoria na oficina de robótica', p: 'A escola paga R$ 12,00 por hora de monitoria. Você ajudou em 3 tardes de 2 horas. Quanto recebeu?', c: 'R$ 72', e: ['R$ 36', 'R$ 24', 'R$ 60'], x: '3 × 2 = 6 horas, e 6 × 12 = 72.', ganho: 72, fun: 1 },
    { t: 'Edição de vídeo', p: 'Você cobra R$ 25,00 por vídeo e editou 2 vídeos com 10% de desconto no pacote. Quanto recebeu?', c: 'R$ 45', e: ['R$ 50', 'R$ 40', 'R$ 47,50'], x: '2 × 25 = 50, e 10% de 50 é 5. Com desconto: 50 − 5 = 45.', ganho: 45, fun: 1 },
    { t: 'Cuidar do primo', p: 'Você cuidou do primo por 5 horas a R$ 10,00 por hora e ainda ganhou R$ 5,00 de gorjeta. Quanto recebeu?', c: 'R$ 55', e: ['R$ 50', 'R$ 15', 'R$ 60'], x: '5 × 10 = 50, mais 5 de gorjeta: 55.', ganho: 55, fun: -1 },
    { t: 'Venda de mudas', p: 'Você vendeu 8 mudas de planta a R$ 6,50 cada. Quanto recebeu?', c: 'R$ 52', e: ['R$ 48', 'R$ 56', 'R$ 14,50'], x: '8 × 6 = 48 e 8 × 0,50 = 4. Total: 52.', ganho: 52, fun: 0 },
    { t: 'Entregas da padaria', p: 'A padaria paga R$ 3,50 por entrega. Você fez 14 entregas. Quanto recebeu?', c: 'R$ 49', e: ['R$ 42', 'R$ 17,50', 'R$ 52'], x: '14 × 3 = 42 e 14 × 0,50 = 7. Total: 49.', ganho: 49, fun: -1 }
  ];
  let S;
  // estilo da lista de bônus e penalidades (a página premium não tem no CSS)
  if (!document.getElementById('mesada-efeitos')) { const st = document.createElement('style'); st.id = 'mesada-efeitos';
    st.textContent = '.efeitos{list-style:none;padding:0;margin:0 0 14px;display:grid;gap:8px}.efeitos li{border:1.5px solid var(--line,#ccc);border-left-width:6px;border-radius:14px;padding:10px 12px;font-size:16px;line-height:1.45}.efeitos li.bonus{border-left-color:var(--ok,#2e7d32)}.efeitos li.penal{border-left-color:var(--bad,#c62828)}';
    document.head.appendChild(st); }
  const store2 = { get() { try { return JSON.parse(localStorage.getItem('mesadapro:melhor2')) || null; } catch (e) { return null; } }, set(v) { try { localStorage.setItem('mesadapro:melhor2', JSON.stringify(v)); } catch (e) {} } };
  const titMes = () => S.ano === 2 ? `2º ano, mês ${S.mes}` : `Mês ${S.mes}`;
  const presentes = () => { const m = 2 + Math.floor(Math.random() * 9); return { aniv: m, natal: 12 }; };
  const store = { get() { try { return JSON.parse(localStorage.getItem('mesadapro:melhor')) || null; } catch (e) { return null; } }, set(v) { try { localStorage.setItem('mesadapro:melhor', JSON.stringify(v)); } catch (e) {} } };
  const totalParcelas = () => r2(S.parcelas.reduce((a, p) => a + p.v * p.n, 0));
  const guardado = () => r2(S.poup + (S.aplic ? S.aplic.v : 0));

  function hud() {
    $('#mes').textContent = S.mes || '–'; if ($('#ano')) $('#ano').textContent = S.ano; $('#ok').textContent = S.ok; $('#fun').textContent = S.fun;
    $('#poup').textContent = R$(S.poup); $('#cart').textContent = R$(S.cart); $('#aplic').textContent = R$(S.aplic ? S.aplic.v : 0);
    $('#parc').textContent = R$(totalParcelas()); $('#div').textContent = R$(S.divida);
    if (S.meta) { $('#bar').style.width = Math.min(100, guardado() / S.meta.valor * 100) + '%'; $('#metalbl').textContent = `Meta: ${S.meta.nome} (${R$(S.meta.valor)}). Guardado na poupança e na aplicação: ${R$(guardado())}.`; }
  }
  function fb(t, c) { const el = $('#fb'); el.textContent = t; el.className = 'feedback ' + (c || ''); }
  function ext(linhas) { $('#extrato').innerHTML = linhas.map(l => `<li>${l}</li>`).join(''); }
  function acts(html) { $('#actions').innerHTML = html; }
  /* alternativas erradas a partir de um valor certo */
  const pctTxt = t => (t * 100).toLocaleString('pt-BR') + '%';
  const errados = (v, cand) => [...new Set(cand.map(r2).filter(x => x > 0 && x !== r2(v)))].slice(0, 3).map(R$);

  /* Paga um valor: carteira, depois poupança, depois vira dívida */
  function pagar(v, log) {
    const daCart = Math.min(S.cart, v); S.cart = r2(S.cart - daCart); v = r2(v - daCart);
    if (v > 0) { const daPoup = Math.min(S.poup, v); S.poup = r2(S.poup - daPoup); v = r2(v - daPoup); if (daPoup) log.push(`Faltou na carteira: ${R$(daPoup)} saíram da poupança.`); }
    if (v > 0) { S.divida = r2(S.divida + v); log.push(`Faltou dinheiro: ${R$(v)} viraram dívida no cheque especial (10% de juros ao mês).`); }
  }

  function inicio() {
    S = { mes: 0, mesada: MESADA, poup: 0, cart: 0, divida: 0, fun: 0, ok: 0, perguntas: 0, jurosGanhos: 0, jurosPagos: 0, parcelas: [], receber: 0, meta: null,
      aplic: null, bicos: 0, doado: 0, feitas: {}, ano: 1, maxBicos: MAX_BICOS, multBico: 1, pres: presentes(), fila: shuffle(EVENTOS.filter(e => !e.obrig)).slice(0, 7), fq: shuffle(FEIRA_Q), fb: shuffle(BICOS) };
    // garante dois imprevistos obrigatórios ao longo do ano
    const obr = shuffle(EVENTOS.filter(e => e.obrig)); S.fila.splice(2, 0, obr[0]); S.fila.splice(6, 0, obr[1]);
    ext([]); hud(); fb('', ''); acts('');
    const m = store.get();
    $('#card').innerHTML = `<h3>Escolha sua meta para o ano</h3><p>Você vai receber ${R$(MESADA)} por mês durante 12 meses (${R$(MESADA * 12)} no total). Qual meta você quer alcançar guardando dinheiro?</p>
      <div class="metas">${METAS.map(t => `<button type="button" data-m="${t.id}"><b>${t.nome}</b>${R$(t.valor)}<br><span class="small muted">${t.txt}</span></button>`).join('')}</div>
      ${m ? `<p class="small muted" style="margin-top:12px">Seu melhor resultado neste navegador: nota ${m.nota} (${m.meta}).</p>` : ''}`;
    $('#card').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { S.meta = METAS.find(t => t.id === b.dataset.m); novoMes(); });
  }

  function novoMes() {
    S.mes++; S.feitas = {}; const log = [];
    const juros = r2(S.poup * TAXA); if (juros) { S.poup = r2(S.poup + juros); S.jurosGanhos = r2(S.jurosGanhos + juros); log.push(`A poupança rendeu ${R$(juros)} (1% sobre o saldo).`); }
    if (S.aplic) {
      const tx = S.aplic.taxa || TAXA_APLIC, j = r2(S.aplic.v * tx); S.aplic.v = r2(S.aplic.v + j); S.aplic.n--; S.jurosGanhos = r2(S.jurosGanhos + j);
      log.push(`A aplicação rendeu ${R$(j)} (${pctTxt(tx)} sobre ${R$(S.aplic.v - j)}).`);
      if (!S.aplic.n) { S.poup = r2(S.poup + S.aplic.v); log.push(`A aplicação venceu: ${R$(S.aplic.v)} voltaram para a poupança (você aplicou ${R$(S.aplic.ini)}).`); S.aplic = null; }
    }
    if (S.divida) { const j = r2(S.divida * JUROS_DIVIDA); S.divida = r2(S.divida + j); S.jurosPagos = r2(S.jurosPagos + j); log.push(`A dívida cresceu ${R$(j)} de juros.`); }
    S.cart = r2(S.cart + S.mesada); log.push(`Chegou a mesada: ${R$(S.mesada)}.`);
    if (S.mes === S.pres.aniv) { S.cart = r2(S.cart + PRESENTE); S.presentes = r2((S.presentes || 0) + PRESENTE); log.push(`Mês do seu aniversário: seus pais deram ${R$(PRESENTE)} de presente.`); }
    if (S.mes === S.pres.natal) { S.cart = r2(S.cart + PRESENTE); S.presentes = r2((S.presentes || 0) + PRESENTE); log.push(`Natal: seus pais deram ${R$(PRESENTE)} de presente.`); }
    if (S.receber) { S.cart = r2(S.cart + S.receber); log.push(`Seu amigo devolveu ${R$(S.receber)}.`); S.receber = 0; }
    if (S.divida) { const p = Math.min(S.cart, S.divida); S.cart = r2(S.cart - p); S.divida = r2(S.divida - p); log.push(`Pagou ${R$(p)} da dívida.`); }
    const vence = r2(S.parcelas.reduce((a, p) => a + p.v, 0));
    if (vence) { log.push(`Parcelas do mês: ${R$(vence)}.`); S.parcelas.forEach(p => p.n--); S.parcelas = S.parcelas.filter(p => p.n > 0); pagar(vence, log); }
    ext(log); hud(); fb('', ''); acts('');
    $('#card').innerHTML = `<h3>${titMes()}: quanto vai para a poupança?</h3><p>Escolha uma porcentagem da mesada de ${R$(S.mesada)}. Faltam ${R$(Math.max(0, S.meta.valor - guardado()))} para a meta e ${13 - S.mes} ${S.mes === 12 ? 'mês' : 'meses'} de mesada.</p>
      <div class="row" id="pcts">${[0, 10, 20, 30, 40, 50, 60, 70, 80].map(p => `<button class="btn ghost" type="button" data-p="${p}">${p}%</button>`).join('')}</div>`;
    $('#pcts').onclick = e => { const b = e.target.closest('button'); if (b) calcPct(+b.dataset.p); };
  }

  function pergunta(titulo, Q, depois) {
    const ops = shuffle([Q.c, ...Q.e]); let feito = false;
    $('#card').innerHTML = `<h3>${titulo}</h3><p>${Q.p}</p><div class="row" id="ops">${ops.map(o => `<button class="btn ghost" type="button">${o}</button>`).join('')}</div>`;
    $('#ops').querySelectorAll('button').forEach(b => b.onclick = () => {
      if (feito) return; feito = true; S.perguntas++;
      const certo = b.textContent === Q.c; if (certo) S.ok++; else b.classList.add('wrong');
      $('#ops').querySelectorAll('button').forEach(o => o.textContent === Q.c && o.classList.add('right'));
      fb((certo ? 'Isso! ' : 'Não foi dessa vez. ') + Q.x, certo ? 'ok' : 'bad'); hud(); depois();
    });
  }

  function calcPct(pct) {
    const M = S.mesada, v = r2(M * pct / 100), dez = r2(M / 10);
    if (pct === 0) { fb('Nada para a poupança este mês. Tudo fica na carteira.', ''); return evento(); }
    pergunta(`Guardar ${pct}% de ${R$(M)}`, { p: 'Quanto vai para a poupança?', c: R$(v), e: errados(v, [v + dez, v - dez, pct, v * 2]), x: `10% de ${R$(M)} é ${R$(dez)}, então ${pct}% é ${pct / 10} × ${R$(dez)} = ${R$(v)}.` }, () => {
      const t = Math.min(v, S.cart); S.cart = r2(S.cart - t); S.poup = r2(S.poup + t); hud();
      if (t < v) fb($('#fb').textContent + ` Mas as parcelas e a dívida deste mês levaram parte da mesada: só ${R$(t)} couberam na poupança.`, 'bad');
      acts(`<button class="btn" type="button" id="nx">${FEIRAS.includes(S.mes) ? `Ir para a ${FEIRAS_CFG[S.ano - 1].nome.toLowerCase()} →` : 'Ver o que aconteceu no mês →'}</button>`); $('#nx').onclick = evento; $('#nx').focus();
    });
  }

  function evento() {
    acts('');
    if (FEIRAS.includes(S.mes)) return feira();
    const E = S.fila.shift() || (S.ano === 2 ? EVENTOS2[3] : EVENTOS[1]);
    pergunta(E.t, E, () => {
      acts(E.escolhas.map((c, i) => `<button class="btn ${i ? 'ghost' : ''}" type="button" data-i="${i}">${c.l}${c.fun > 0 ? ` · +${c.fun} de diversão` : ''}</button>`).join(''));
      $('#actions').querySelectorAll('button').forEach(b => b.onclick = () => aplicar(E.escolhas[+b.dataset.i]));
    });
  }

  function aplicar(c) {
    const log = [];
    if (c.custo) { log.push(`Gasto: ${R$(c.custo)}.`); pagar(c.custo, log); }
    if (c.ganho) { S.cart = r2(S.cart + c.ganho); log.push(`Entrou na carteira: ${R$(c.ganho)}.`); }
    if (c.poup) { S.poup = r2(S.poup + c.poup); log.push(`Foi para a poupança: ${R$(c.poup)}.`); }
    if (c.parcelas) { S.parcelas.push({ v: c.parcelas[0], n: c.parcelas[1] }); log.push(`Parcelado: ${c.parcelas[1]} × ${R$(c.parcelas[0])} a partir do próximo mês.`); }
    if (c.receber) { S.receber = r2(S.receber + c.receber); log.push(`Seu amigo promete devolver ${R$(c.receber)} no mês que vem.`); }
    if (c.sorte) {
      const g = Math.random() < c.sorte[0], inv = c.sorte.length > 2, v = g ? c.sorte[1] : inv ? c.sorte[2] : 0;
      S.cart = r2(S.cart + v);
      log.push(inv ? (g ? `Deu certo desta vez: voltaram ${R$(v)}. Mas a média continua desfavorável.` : `Não deu certo: voltaram só ${R$(v)}.`) : g ? `Você ganhou a rifa: ${R$(v)}!` : 'Não foi dessa vez na rifa, mas o dinheiro ajudou a escola.');
    }
    if (c.msg) log.push(c.msg);
    if (c.mesada) { S.mesada = c.mesada; log.push(`A partir do próximo mês, a mesada passa a ${R$(c.mesada)}.`); }
    if (c.fun) S.fun += c.fun;
    ext(log); hud(); painel();
  }

  function feira() {
    const F = FEIRAS_CFG[S.ano - 1], Q = S.fq[(FEIRAS.indexOf(S.mes)) % S.fq.length];
    const custoDe = q => r2(q * F.custo + F.fixo);
    pergunta(F.nome, Q, () => {
      acts([0, ...F.qs].map(q => `<button class="btn ghost" type="button" data-q="${q}" ${q && custoDe(q) > S.cart ? 'disabled' : ''}>${q ? `Fazer ${q} ${F.item} (custo ${R$(custoDe(q))}${F.fixo ? `, com a banca` : ''})` : 'Não participar'}</button>`).join(''));
      $('#actions').querySelectorAll('button').forEach(b => b.onclick = () => {
        const q = +b.dataset.q, log = [];
        if (q) {
          const custo = custoDe(q), vend = Math.round(q * (0.55 + Math.random() * 0.45)), rec = r2(vend * F.preco), lucro = r2(rec - custo);
          S.cart = r2(S.cart - custo + rec); S.fun += 1;
          log.push(`Você fez ${q} ${F.item} (${R$(custo)}${F.fixo ? `, já com ${R$(F.fixo)} da banca` : ''}) e vendeu ${vend} por ${R$(rec)}. ${lucro >= 0 ? `Lucro: ${R$(lucro)}.` : `Prejuízo: ${R$(-lucro)}.`}`);
          if (vend < q) log.push(`Sobraram ${q - vend} ${F.item}: o custo deles também entra na conta.`);
        } else log.push('Você não participou da feira deste trimestre.');
        ext(log); hud(); painel();
      });
    });
  }

  /* Ações do mês: o jogador decide o que mais fazer antes de passar o mês. Cada ação vale uma vez por mês. */
  function painel() {
    const A = [];
    const pode = (id, cond) => cond && !S.feitas[id];
    A.push({ id: 'dep', l: 'Guardar mais R$ 10 na poupança', d: 'Tira da carteira e põe na poupança.', ok: pode('dep', S.cart >= 10), f: depositar });
    A.push({ id: 'saq', l: 'Sacar R$ 10 da poupança', d: 'Volta para a carteira, mas deixa de render.', ok: pode('saq', S.poup >= 10), f: sacar });
    A.push({ id: 'apl', l: 'Fazer uma aplicação de 3 meses', d: S.aplic ? `Já tem uma aplicação: faltam ${S.aplic.n} ${S.aplic.n === 1 ? 'mês' : 'meses'}.` : S.mes > 9 ? 'Não dá tempo de vencer antes do fim do ano.' : 'Rende 2% ao mês (juros compostos), mas não dá para sacar antes do prazo.', ok: pode('apl', !S.aplic && S.mes <= 9 && S.cart >= 30), f: () => aplicacao(PRAZO_APLIC, TAXA_APLIC) });
    if (S.ano === 2) A.push({ id: 'apl6', l: 'Fazer uma aplicação de 6 meses', d: S.aplic ? 'Só dá para ter uma aplicação por vez.' : S.mes > 6 ? 'Não dá tempo de vencer antes do fim do ano.' : 'Rende 2,5% ao mês, mas o dinheiro fica preso por 6 meses.', ok: pode('apl6', !S.aplic && S.mes <= 6 && S.cart >= 30), f: () => aplicacao(6, 0.025) });
    if (S.parcelas.length) A.push({ id: 'ant', l: 'Antecipar as parcelas com 10% de desconto', d: `Faltam ${R$(totalParcelas())} em parcelas.`, ok: pode('ant', S.cart >= r2(totalParcelas() * 0.9)), f: antecipar });
    if (S.divida) A.push({ id: 'qui', l: 'Pagar a dívida com a poupança', d: `A dívida é de ${R$(S.divida)} e cobra 10% ao mês.`, ok: pode('qui', S.poup > 0), f: quitar });
    A.push({ id: 'bic', l: 'Fazer um bico', d: `Renda extra com uma conta para resolver. Restam ${S.maxBicos - S.bicos} no ano.${S.multBico > 1 ? ' Bônus: cada bico rende 10% a mais.' : ''}`, ok: pode('bic', S.bicos < S.maxBicos), f: bico });
    A.push({ id: 'doa', l: 'Doar R$ 5 para a campanha da escola', d: 'Ajudar os outros também faz parte do planejamento.', ok: pode('doa', S.cart >= 5), f: doar });
    $('#card').innerHTML = `<h3>Ações do ${S.ano === 2 ? '2º ano, mês' : 'mês'} ${S.mes}</h3><p>Antes de passar o mês, você pode fazer mais alguma coisa com o seu dinheiro. Tudo é opcional, e cada ação vale uma vez por mês.</p>
      <div class="acoes">${A.map((a, i) => `<button type="button" data-a="${i}" ${a.ok ? '' : 'disabled'}><b>${a.l}</b><span class="small muted">${S.feitas[a.id] ? 'Feito este mês.' : a.d}</span></button>`).join('')}</div>`;
    $('#card').querySelectorAll('[data-a]').forEach(b => b.onclick = () => { const a = A[+b.dataset.a]; S.feitas[a.id] = true; a.f(); });
    acts(`<button class="btn" type="button" id="nx">${S.mes < 12 ? 'Próximo mês →' : 'Fechar o ano'}</button>`); $('#nx').onclick = S.mes < 12 ? novoMes : fim;
  }
  function voltar(log) { ext(log); hud(); painel(); }
  function depositar() { S.cart = r2(S.cart - 10); S.poup = r2(S.poup + 10); fb('', ''); voltar(['Você guardou mais R$ 10 na poupança.']); }
  function sacar() { S.poup = r2(S.poup - 10); S.cart = r2(S.cart + 10); fb('', ''); voltar(['Você sacou R$ 10 da poupança. Dinheiro na carteira não rende juros.']); }
  function aplicacao(prazo, taxa) {
    acts(''); const id = prazo === PRAZO_APLIC ? 'apl' : 'apl6', tt = pctTxt(taxa);
    $('#card').innerHTML = `<h3>Aplicação de ${prazo} meses</h3><p>Quanto você quer aplicar? O dinheiro sai da carteira, rende ${tt} ao mês e volta para a poupança depois de ${prazo} meses.</p>
      <div class="row" id="vals">${[30, 50, 100].map(v => `<button class="btn ghost" type="button" data-v="${v}" ${v > S.cart ? 'disabled' : ''}>${R$(v)}</button>`).join('')}<button class="btn ghost" type="button" data-v="0">Desistir</button></div>`;
    $('#vals').onclick = e => {
      const b = e.target.closest('button'); if (!b) return; const v = +b.dataset.v;
      if (!v) { S.feitas[id] = false; return painel(); }
      const m1 = r2(v * (1 + taxa)), mf = r2(v * (1 + taxa) ** prazo);
      pergunta(`Aplicar ${R$(v)} a ${tt} ao mês`, { p: `Em juros compostos, cada mês rende ${tt} sobre o saldo do mês anterior. Quanto a aplicação vale depois do 1º mês?`, c: R$(m1), e: errados(m1, [v + taxa * 1000, v * (1 + taxa * 10), v + taxa, v * (1 + taxa * 3)]),
        x: `${tt} de ${R$(v)} é ${R$(v * taxa)}, então depois de 1 mês são ${R$(m1)}. No 2º mês, os ${tt} incidem sobre ${R$(m1)}, e no fim dos ${prazo} meses a aplicação vale ${R$(mf)}.` }, () => {
        S.cart = r2(S.cart - v); S.aplic = { v, ini: v, n: prazo, taxa };
        acts(`<button class="btn" type="button" id="vt">Voltar às ações do mês</button>`); $('#vt').onclick = () => voltar([`Você aplicou ${R$(v)} por ${prazo} meses.`]); $('#vt').focus();
      });
    };
  }
  function antecipar() {
    acts('');
    const t = totalParcelas(), v = r2(t * 0.9);
    pergunta('Antecipar as parcelas', { p: `Faltam ${R$(t)} em parcelas. A loja dá 10% de desconto para quitar tudo agora. Quanto você paga?`, c: R$(v), e: errados(v, [t * 0.1, t - 10, t * 0.99, t]),
      x: `10% de ${R$(t)} é ${R$(t * 0.1)}. Quitando agora: ${R$(t)} − ${R$(t * 0.1)} = ${R$(v)}.` }, () => {
      S.cart = r2(S.cart - v); S.parcelas = [];
      acts(`<button class="btn" type="button" id="vt">Voltar às ações do mês</button>`); $('#vt').onclick = () => voltar([`Parcelas quitadas por ${R$(v)}: você economizou ${R$(t - v)}.`]); $('#vt').focus();
    });
  }
  function quitar() {
    const p = Math.min(S.poup, S.divida); S.poup = r2(S.poup - p); S.divida = r2(S.divida - p);
    fb('Boa decisão: a poupança rende 1% ao mês e o cheque especial cobra 10%. Pagar a dívida primeiro quase sempre compensa.', 'ok');
    voltar([`Você usou ${R$(p)} da poupança para pagar a dívida.${S.divida ? ` Ainda faltam ${R$(S.divida)}.` : ' Dívida zerada.'}`]);
  }
  function bico() {
    acts('');
    const B = S.fb[S.bicos % S.fb.length]; S.bicos++;
    pergunta(`Bico: ${B.t}`, B, () => {
      const g = r2(B.ganho * S.multBico); S.cart = r2(S.cart + g); S.fun += B.fun;
      acts(`<button class="btn" type="button" id="vt">Voltar às ações do mês</button>`); $('#vt').onclick = () => voltar([`Você ganhou ${R$(g)} com o bico.${S.multBico > 1 ? ` (${R$(B.ganho)} + 10% de bônus pela boa fama do 1º ano.)` : ''}${B.fun < 0 ? ' Foi cansativo: menos 1 de diversão.' : ''}`]); $('#vt').focus();
    });
  }
  function doar() { S.cart = r2(S.cart - 5); S.doado += 5; S.fun += 1; fb('', ''); voltar(['Você doou R$ 5 para a campanha da escola. Mais 1 de diversão pela boa ação.']); }

  function fim() {
    // aplicação que ainda não venceu entra pelo valor atual; parcelas que faltam entram como compromisso
    if (S.aplic) { S.poup = r2(S.poup + S.aplic.v); S.aplic = null; }
    const pend = totalParcelas();
    const chegou = S.poup >= S.meta.valor, reserva = r2(S.poup + S.cart - S.meta.valor - pend - S.divida);
    const pts = S.ok / Math.max(1, S.perguntas) * 40 + (chegou ? 30 : S.poup / S.meta.valor * 20) + (chegou && reserva >= 60 ? 15 : chegou && reserva > 0 ? 8 : 0) + (S.divida ? 0 : 10) + Math.min(5, S.fun / 3);
    const nota = pts >= 85 ? 'A' : pts >= 70 ? 'B' : pts >= 55 ? 'C' : 'D';
    const st = S.ano === 2 ? store2 : store;
    const ant = st.get(); if (!ant || 'DCBA'.indexOf(nota) > 'DCBA'.indexOf(ant.nota)) st.set({ nota, meta: S.meta.nome });
    window.MDP && MDP.registrar('mesada', pts);
    const res = { nota, chegou, reserva, pend, meta: S.meta, poup: S.poup, cart: S.cart, divida: S.divida, ok: S.ok, perguntas: S.perguntas, fun: S.fun, bicos: S.bicos,
      jurosGanhos: S.jurosGanhos, jurosPagos: S.jurosPagos, doado: S.doado, presentes: S.presentes || 0 };
    ext([]); fb('', ''); hud();
    const dica = S.jurosPagos > S.jurosGanhos ? 'Você pagou mais juros do que recebeu: dívida no cheque especial custa caro e cresce mais rápido que a poupança.' : chegou && reserva >= 60 ? 'Meta alcançada e ainda sobrou uma reserva para imprevistos. É exatamente assim que se planeja.' : chegou ? 'Meta alcançada! Da próxima vez, tente guardar também uma reserva para emergências.' : S.ano === 1 && S.meta.valor / 12 > MESADA * 0.8 ? `Só com a mesada não dá para chegar a ${R$(S.meta.valor)}: é preciso guardar quase tudo e ainda somar o lucro da feira, os bicos e as aplicações. Metas grandes pedem renda extra, não apenas economia.` : `Para chegar a ${R$(S.meta.valor)}, guarde uma parte maior da mesada todo mês. Os juros, a feira e os bicos ajudam no resto.`;
    $('#card').innerHTML = `<div class="nota" aria-label="Nota ${nota}">${nota}</div><h3 style="text-align:center">${S.ano === 2 ? 'Fim do 2º ano. ' : ''}${chegou ? `Você conquistou: ${S.meta.nome}!` : `Faltaram ${R$(S.meta.valor - S.poup)} na poupança para a meta.`}</h3>
      <table class="resumo"><tbody>
        <tr><th>Poupança no fim do ano</th><td>${R$(S.poup)}</td></tr>
        <tr><th>Juros que você ganhou</th><td>${R$(S.jurosGanhos)}</td></tr>
        <tr><th>Juros que você pagou</th><td>${R$(S.jurosPagos)}</td></tr>
        <tr><th>Carteira</th><td>${R$(S.cart)}</td></tr>
        <tr><th>Parcelas que ainda faltam</th><td>${R$(pend)}</td></tr>
        <tr><th>Dívida</th><td>${R$(S.divida)}</td></tr>
        ${chegou ? `<tr><th>Sobra depois da meta (reserva)</th><td>${R$(reserva)}</td></tr>` : `<tr><th>Saldo total livre</th><td>${R$(S.poup + S.cart - pend - S.divida)}</td></tr>`}
        <tr><th>Presentes de aniversário e Natal</th><td>${R$(res.presentes)}</td></tr>
        <tr><th>Bicos feitos</th><td>${S.bicos}</td></tr>
        <tr><th>Doações</th><td>${R$(S.doado)}</td></tr>
        <tr><th>Contas certas</th><td>${S.ok} de ${S.perguntas}</td></tr>
        <tr><th>Diversão</th><td>${S.fun}</td></tr>
      </tbody></table>
      <p>${dica}</p>${S.ano === 2 ? comparar(S.a1, res) : `<p><strong>Ainda tem mais:</strong> no 2º ano você continua com o dinheiro que sobrou e enfrenta desafios novos. A diversão, a meta e os bicos deste ano viram bônus ou penalidades.</p>`}`;
    if (S.ano === 1) {
      acts(`<button class="btn" type="button" id="seg">Seguir para o 2º ano →</button><button class="btn ghost" type="button" id="again">Recomeçar o 1º ano</button>`);
      $('#seg').onclick = () => transicao(res); $('#again').onclick = inicio; $('#seg').focus();
    } else { acts(`<button class="btn" type="button" id="again">Jogar de novo desde o 1º ano</button>`); $('#again').onclick = inicio; }
  }

  /* Passagem para o 2º ano: o que sobrou, a meta e o esforço do 1º ano definem como o 2º começa */
  function transicao(r) {
    const ef = [];
    let poup = r.poup, maxBicos = MAX_BICOS, multBico = 1, impulso = false;
    if (r.chegou) { poup = r2(poup - r.meta.valor); ef.push({ b: true, t: `Meta comprada: ${r.meta.nome}`, d: `Os ${R$(r.meta.valor)} saíram da poupança para a compra. O resto continua com você.` }); }
    else ef.push({ b: false, t: 'Meta adiada', d: `A meta (${r.meta.nome}) ficou para depois. Os ${R$(r.poup)} guardados continuam na poupança para o 2º ano.` });
    if (r.chegou) { poup = r2(poup + 30); ef.push({ b: true, t: 'Prêmio pela meta', d: 'Seus pais ficaram orgulhosos da conquista e puseram R$ 30 na sua poupança.' }); }
    if (r.fun >= 18) { maxBicos += 2; ef.push({ b: true, t: 'Ano bem aproveitado', d: `Você teve ${r.fun} de diversão e começa o 2º ano com energia de sobra: pode fazer até ${maxBicos} bicos, em vez de ${MAX_BICOS}.` }); }
    else if (r.fun >= 8) { maxBicos += 1; ef.push({ b: true, t: 'Ano equilibrado', d: `Com ${r.fun} de diversão, você dividiu bem o tempo entre guardar e aproveitar: pode fazer até ${maxBicos} bicos no 2º ano.` }); }
    else { maxBicos -= 1; impulso = true; ef.push({ b: false, t: 'Ano sem lazer', d: `Com só ${r.fun} de diversão, o cansaço pesou: no 2º ano você faz no máximo ${maxBicos} bicos, e o 1º mês começa com uma compra por impulso.` }); }
    if (r.bicos >= 2) { multBico = 1.1; ef.push({ b: true, t: 'Boa fama de trabalho', d: `Você fez ${r.bicos} bicos e os clientes indicaram você: no 2º ano cada bico rende 10% a mais.` }); }
    else if (r.bicos === 0) ef.push({ b: false, t: 'Sem experiência de trabalho', d: 'Você não fez bicos no 1º ano, então ainda não tem clientes que indiquem o seu trabalho.' });
    if (r.reserva >= 60 && r.chegou) ef.push({ b: true, t: 'Reserva de emergência', d: `Sobraram ${R$(r.reserva)} além da meta: você começa o 2º ano com uma proteção contra imprevistos.` });
    if (r.divida) ef.push({ b: false, t: 'Dívida que continua', d: `Os ${R$(r.divida)} do cheque especial seguem cobrando 10% ao mês no 2º ano.` });
    if (r.pend) ef.push({ b: false, t: 'Parcelas que continuam', d: `Ainda faltam ${R$(r.pend)} em parcelas, cobradas nos primeiros meses do 2º ano.` });

    const a1 = r, parcelas = S.parcelas.slice(), receber = S.receber;
    S = { mes: 0, mesada: MESADA2, poup, cart: r.cart, divida: r.divida, fun: 0, ok: 0, perguntas: 0, jurosGanhos: 0, jurosPagos: 0, parcelas, receber, meta: null,
      aplic: null, bicos: 0, doado: 0, feitas: {}, ano: 2, maxBicos, multBico, pres: presentes(), a1, presentes: 0,
      fila: shuffle(EVENTOS2.filter(e => !e.obrig)).slice(0, impulso ? 6 : 7), fq: FEIRA2_Q.slice(), fb: shuffle(BICOS2) };
    const obr = shuffle(EVENTOS2.filter(e => e.obrig)); S.fila.splice(2, 0, obr[0]); S.fila.splice(6, 0, obr[1]);
    if (impulso) S.fila.unshift(IMPULSO);
    ext([]); hud(); fb('', ''); acts('');
    const m = store2.get();
    $('#card').innerHTML = `<h3>Começa o 2º ano</h3><p>A mesada agora é de ${R$(MESADA2)} por mês. Seus pais continuam dando presente no aniversário e no Natal. Veja o que você traz do 1º ano:</p>
      <table class="resumo"><tbody>
        <tr><th>Poupança para começar</th><td>${R$(poup)}</td></tr>
        <tr><th>Carteira</th><td>${R$(r.cart)}</td></tr>
        ${r.pend ? `<tr><th>Parcelas a pagar</th><td>${R$(r.pend)}</td></tr>` : ''}${r.divida ? `<tr><th>Dívida</th><td>${R$(r.divida)}</td></tr>` : ''}
      </tbody></table>
      <ul class="efeitos">${ef.map(e => `<li class="${e.b ? 'bonus' : 'penal'}"><b>${e.b ? 'Bônus' : 'Atenção'}: ${e.t}.</b> ${e.d}</li>`).join('')}</ul>
      <h3>Escolha a meta do 2º ano</h3>
      <div class="metas">${METAS2.map(t => `<button type="button" data-m="${t.id}"><b>${t.nome}</b>${R$(t.valor)}<br><span class="small muted">${t.txt}</span></button>`).join('')}</div>
      ${m ? `<p class="small muted" style="margin-top:12px">Seu melhor resultado no 2º ano neste navegador: nota ${m.nota} (${m.meta}).</p>` : ''}`;
    $('#card').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { S.meta = METAS2.find(t => t.id === b.dataset.m); novoMes(); });
    $('#card').scrollIntoView && $('#card').scrollIntoView({ block: 'nearest' });
  }

  /* Do 1º para o 2º ano: mostra só o que melhorou */
  function comparar(a, b) {
    const pa = a.ok / Math.max(1, a.perguntas), pb = b.ok / Math.max(1, b.perguntas), L = [];
    if ('DCBA'.indexOf(b.nota) > 'DCBA'.indexOf(a.nota)) L.push(`A nota subiu de ${a.nota} para ${b.nota}.`);
    if (pb > pa) L.push(`Acertos nas contas: de ${Math.round(pa * 100)}% para ${Math.round(pb * 100)}%.`);
    if (b.jurosGanhos > a.jurosGanhos) L.push(`Juros ganhos: de ${R$(a.jurosGanhos)} para ${R$(b.jurosGanhos)}.`);
    if (b.jurosPagos < a.jurosPagos) L.push(`Juros pagos caíram de ${R$(a.jurosPagos)} para ${R$(b.jurosPagos)}.`);
    if (b.divida < a.divida) L.push(`Dívida: de ${R$(a.divida)} para ${R$(b.divida)}.`);
    if (b.chegou && !a.chegou) L.push('Desta vez a meta foi alcançada.');
    if (b.bicos > a.bicos) L.push(`Bicos feitos: de ${a.bicos} para ${b.bicos}.`);
    if (b.fun > a.fun) L.push(`Diversão: de ${a.fun} para ${b.fun}.`);
    return `<h3>O que melhorou do 1º para o 2º ano</h3>${L.length ? `<ul class="efeitos">${L.map(l => `<li class="bonus">${l}</li>`).join('')}</ul>` : `<p>Você completou dois anos inteiros de planejamento, com ${b.ok + a.ok} contas certas no total. Na próxima partida, tente aumentar os acertos ou os juros ganhos.</p>`}`;
  }
  inicio();
})();
