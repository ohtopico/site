/* Mundo da Olimpíada: problemas originais no estilo das olimpíadas de matemática (como a OBMEP), em 3 níveis:
   nível 1 (6º e 7º ano), nível 2 (8º e 9º ano) e nível 3 (ensino médio). Cada problema tem 5 alternativas, como na
   primeira fase. Formato: [enunciado, alternativas, índice da certa, explicação]. Os problemas foram escritos para o
   site: não são cópias de provas. */
window.OLIMPIADA = {
  niveis: {
    n1: { nome: 'Nível 1', anos: '6º e 7º ano', ic: '🥉' },
    n2: { nome: 'Nível 2', anos: '8º e 9º ano', ic: '🥈' },
    n3: { nome: 'Nível 3', anos: 'Ensino médio', ic: '🥇' }
  },
  areas: {
    contagem: { nome: 'Contagem', ic: '🎲' },
    logica: { nome: 'Lógica', ic: '🧠' },
    numeros: { nome: 'Números', ic: '🔢' },
    geometria: { nome: 'Geometria', ic: '📐' },
    padroes: { nome: 'Padrões', ic: '🔁' },
    problemas: { nome: 'Problemas e equações', ic: '⚖️' }
  },
  perguntas: {
    n1: {
      contagem: [
        ['Ana tem 3 blusas e 4 saias. De quantas maneiras diferentes ela pode se vestir usando uma blusa e uma saia?', ['12', '7', '9', '16', '10'], 0, 'Para cada uma das 3 blusas há 4 saias: 3 × 4 = 12 combinações. Quando as escolhas são independentes, multiplicamos (princípio multiplicativo).'],
        ['Quantos números de dois algarismos têm os dois algarismos iguais, como 33?', ['9', '10', '11', '8', '99'], 0, 'São 11, 22, 33, 44, 55, 66, 77, 88 e 99. O 00 não conta, porque não é um número de dois algarismos.'],
        ['Cinco amigos se encontram e cada um aperta a mão de cada um dos outros uma única vez. Quantos apertos de mão acontecem?', ['10', '20', '25', '5', '15'], 0, 'Cada um aperta 4 mãos: 5 × 4 = 20. Mas assim cada aperto foi contado duas vezes (Ana com Beto e Beto com Ana), então são 20 ÷ 2 = 10.']
      ],
      logica: [
        ['Bia é mais alta que Caio. Caio é mais alto que Duda. Duda é mais alta que Eli. Quem é a pessoa mais baixa?', ['Eli', 'Duda', 'Caio', 'Bia', 'Não dá para saber'], 0, 'Colocando em ordem: Bia > Caio > Duda > Eli. Eli é mais baixo que todos.'],
        ['Numa gaveta escura há 6 meias azuis e 6 meias pretas, misturadas. Quantas meias, no mínimo, é preciso tirar para ter certeza de formar um par da mesma cor?', ['3', '2', '7', '6', '12'], 0, 'Com 2 meias, pode sair uma de cada cor. Com 3, pelo menos duas têm a mesma cor, porque só existem 2 cores (princípio da casa dos pombos).'],
        ['Um relógio marca 9h15. Que horas ele vai marcar daqui a 100 minutos?', ['10h55', '10h15', '11h15', '10h45', '11h05'], 0, '100 minutos = 1 hora e 40 minutos. 9h15 + 1h = 10h15; 10h15 + 40 min = 10h55.']
      ],
      numeros: [
        ['Qual é o menor número maior que zero que pode ser dividido por 2, por 3 e por 5 sem deixar resto?', ['30', '10', '15', '60', '6'], 0, 'É o MMC de 2, 3 e 5. Como são primos, basta multiplicar: 2 × 3 × 5 = 30.'],
        ['Quanto é 1 + 2 + 3 + ... + 20?', ['210', '200', '220', '190', '400'], 0, 'Junte o primeiro com o último: 1 + 20 = 21, 2 + 19 = 21, ... São 10 pares de 21: 10 × 21 = 210.'],
        ['Joana comprou 3 cadernos de R$ 12 e pagou com uma nota de R$ 50. Quanto recebeu de troco?', ['R$ 14', 'R$ 16', 'R$ 36', 'R$ 24', 'R$ 12'], 0, 'Os cadernos custaram 3 × 12 = 36 reais. Troco: 50 − 36 = 14 reais.']
      ],
      geometria: [
        ['Um quadrado tem perímetro de 36 cm. Qual é a sua área?', ['81 cm²', '36 cm²', '144 cm²', '9 cm²', '72 cm²'], 0, 'Os 4 lados são iguais: 36 ÷ 4 = 9 cm. A área é lado × lado = 9 × 9 = 81 cm².'],
        ['Quantos quadradinhos de 1 cm por 1 cm cabem dentro de um retângulo de 4 cm por 6 cm?', ['24', '20', '10', '48', '12'], 0, 'São 4 fileiras de 6 quadradinhos: 4 × 6 = 24. É a área do retângulo em cm².'],
        ['Um cubo grande de 3 × 3 × 3 é montado com 27 cubinhos. Pintamos todo o lado de fora. Quantos cubinhos ficam sem nenhuma face pintada?', ['1', '0', '8', '6', '27'], 0, 'Só o cubinho do meio, escondido no centro, não encosta em nenhuma face de fora. Os outros 26 têm pelo menos uma face pintada.']
      ],
      padroes: [
        ['Qual é o próximo número da sequência 2, 5, 8, 11, ...?', ['14', '13', '15', '16', '12'], 0, 'A sequência aumenta de 3 em 3: 11 + 3 = 14.'],
        ['A sequência ● ▲ ■ ● ▲ ■ ● ▲ ■ ... continua sempre do mesmo jeito. Qual figura está na 20ª posição?', ['▲', '●', '■', '★', 'Não dá para saber'], 0, 'O padrão se repete a cada 3 figuras. 20 ÷ 3 dá 6 e sobra 2, então a 20ª figura é a 2ª do grupo: ▲.'],
        ['Na sequência 1, 1, 2, 3, 5, 8, ..., cada número é a soma dos dois anteriores. Qual é o próximo?', ['13', '11', '12', '16', '10'], 0, '5 + 8 = 13. Essa é a famosa sequência de Fibonacci.']
      ],
      problemas: [
        ['Pensei num número, multipliquei por 3 e somei 4. Deu 31. Em que número pensei?', ['9', '11', '7', '27', '35'], 0, 'Desfaça as contas de trás para frente: 31 − 4 = 27 e 27 ÷ 3 = 9.'],
        ['Uma caneta e um caderno custam juntos R$ 11. O caderno custa R$ 10 a mais que a caneta. Quanto custa a caneta?', ['R$ 0,50', 'R$ 1,00', 'R$ 1,50', 'R$ 10,00', 'R$ 0,10'], 0, 'Se a caneta custasse R$ 1, o caderno custaria R$ 11 e o total seria R$ 12. Com a caneta a R$ 0,50, o caderno custa R$ 10,50 e o total dá R$ 11.'],
        ['Num estacionamento há 10 veículos, entre carros e motos, e 32 rodas ao todo. Quantos são os carros?', ['6', '4', '8', '5', '7'], 0, 'Se fossem 10 motos, seriam 20 rodas. Sobram 12 rodas, e cada carro tem 2 rodas a mais que uma moto: 12 ÷ 2 = 6 carros (e 4 motos: 24 + 8 = 32).']
      ]
    },
    n2: {
      contagem: [
        ['Quantos números de 3 algarismos diferentes podem ser formados usando os algarismos 1, 2, 3 e 4?', ['24', '64', '12', '81', '36'], 0, 'São 4 escolhas para a centena, 3 para a dezena e 2 para a unidade: 4 × 3 × 2 = 24.'],
        ['De quantas maneiras podemos escolher 2 representantes numa turma de 6 alunos, se a ordem não importa?', ['15', '30', '12', '36', '6'], 0, 'Com ordem seriam 6 × 5 = 30. Como "Ana e Beto" é o mesmo que "Beto e Ana", dividimos por 2: 15.'],
        ['Quantos anagramas (reordenações das letras) tem a palavra AMOR?', ['24', '12', '16', '4', '20'], 0, 'As 4 letras são diferentes: 4 × 3 × 2 × 1 = 24 (é 4 fatorial).']
      ],
      logica: [
        ['Numa ilha, os cavaleiros sempre dizem a verdade e os patifes sempre mentem. Ana diz: "Eu e Beto somos patifes". O que são Ana e Beto?', ['Ana é patife e Beto é cavaleiro', 'Os dois são patifes', 'Os dois são cavaleiros', 'Ana é cavaleira e Beto é patife', 'Não dá para saber'], 0, 'Se Ana fosse cavaleira, a frase seria verdade e ela seria patife: impossível. Então Ana é patife, e a frase é falsa: não é verdade que os dois são patifes. Logo, Beto é cavaleiro.'],
        ['Pedro tem o dobro da idade de Lia. Daqui a 10 anos, a soma das idades dos dois será 50. Quantos anos Pedro tem hoje?', ['20', '10', '30', '15', '25'], 0, 'Hoje: Lia = x e Pedro = 2x. Daqui a 10 anos: (x + 10) + (2x + 10) = 50, então 3x = 30 e x = 10. Pedro tem 20.'],
        ['Uma torneira enche um tanque em 6 horas, e outra enche o mesmo tanque em 3 horas. Abertas juntas, em quanto tempo enchem o tanque?', ['2 horas', '4 horas e meia', '9 horas', '3 horas', '1 hora e meia'], 0, 'Em 1 hora, uma enche 1/6 e a outra 1/3 = 2/6 do tanque. Juntas: 3/6 = 1/2 do tanque por hora. O tanque inteiro leva 2 horas.']
      ],
      numeros: [
        ['Qual é o algarismo das unidades de 2²⁰ (2 elevado a 20)?', ['6', '2', '4', '8', '0'], 0, 'As unidades das potências de 2 repetem 2, 4, 8, 6 a cada 4 expoentes. Como 20 é múltiplo de 4, a unidade é a mesma de 2⁴ = 16: 6.'],
        ['Quantos divisores positivos tem o número 36?', ['9', '8', '6', '12', '10'], 0, 'São 1, 2, 3, 4, 6, 9, 12, 18 e 36. Pela fatoração 36 = 2² × 3², o número de divisores é (2 + 1) × (2 + 1) = 9.'],
        ['Qual é o máximo divisor comum (MDC) de 84 e 120?', ['12', '6', '24', '4', '420'], 0, '84 = 2² × 3 × 7 e 120 = 2³ × 3 × 5. Os fatores comuns, com o menor expoente, são 2² × 3 = 12.']
      ],
      geometria: [
        ['Os ângulos internos de um triângulo medem x, 2x e 3x. Quanto mede o maior deles?', ['90°', '60°', '30°', '120°', '100°'], 0, 'A soma dos ângulos internos é 180°: x + 2x + 3x = 6x = 180°, então x = 30° e o maior é 3x = 90°.'],
        ['Um triângulo retângulo tem catetos de 6 cm e 8 cm. Quanto mede a hipotenusa?', ['10 cm', '14 cm', '12 cm', '9 cm', '48 cm'], 0, 'Pelo teorema de Pitágoras: h² = 6² + 8² = 36 + 64 = 100, então h = 10 cm.'],
        ['Quantas diagonais tem um hexágono (polígono de 6 lados)?', ['9', '6', '12', '15', '18'], 0, 'De cada vértice saem 6 − 3 = 3 diagonais: 6 × 3 = 18. Cada diagonal foi contada duas vezes (uma em cada ponta): 18 ÷ 2 = 9.']
      ],
      padroes: [
        ['Qual é o 50º termo da sequência 3, 7, 11, 15, ...?', ['199', '203', '200', '197', '150'], 0, 'Começa em 3 e soma 4 a cada passo. Do 1º ao 50º termo são 49 passos: 3 + 49 × 4 = 199.'],
        ['Com palitos de fósforo, formamos quadrados lado a lado, numa fileira (□□□...). Quantos palitos são necessários para 10 quadrados?', ['31', '40', '30', '33', '28'], 0, 'O primeiro quadrado usa 4 palitos, e cada novo quadrado aproveita um lado e usa mais 3: 4 + 9 × 3 = 31.'],
        ['Numa sequência, cada termo é o dobro do anterior: 3, 6, 12, 24, ... Qual é o 8º termo?', ['384', '192', '768', '48', '256'], 0, 'O 8º termo é 3 × 2⁷ = 3 × 128 = 384.']
      ],
      problemas: [
        ['Qual é o valor de x em 3(x − 2) = x + 8?', ['7', '5', '3', '1', '14'], 0, '3x − 6 = x + 8, então 2x = 14 e x = 7. Conferindo: 3 × 5 = 15 e 7 + 8 = 15.'],
        ['Um produto custava R$ 80. Teve um aumento de 25% e, depois, um desconto de 20%. Qual é o preço final?', ['R$ 80', 'R$ 84', 'R$ 76', 'R$ 85', 'R$ 100'], 0, 'Com o aumento: 80 × 1,25 = 100. Com o desconto: 100 × 0,8 = 80. Volta ao preço inicial, porque 1,25 × 0,8 = 1.'],
        ['A soma de dois números é 30 e a diferença entre eles é 8. Qual é o maior?', ['19', '11', '22', '15', '38'], 0, 'Somando as duas informações: (a + b) + (a − b) = 30 + 8, então 2a = 38 e a = 19. O outro é 11.']
      ]
    },
    n3: {
      contagem: [
        ['De quantas maneiras 5 pessoas podem se sentar numa fileira de 5 cadeiras?', ['120', '25', '60', '24', '3125'], 0, '5 × 4 × 3 × 2 × 1 = 5! = 120.'],
        ['Lançamos duas moedas. Qual é a probabilidade de sair pelo menos uma cara?', ['3/4', '1/2', '1/4', '2/3', '1'], 0, 'Os resultados são CC, CK, KC e KK (C = cara, K = coroa). Só KK não tem cara: 3 dos 4 casos, ou 3/4.'],
        ['Lançamos dois dados comuns. Qual é a probabilidade de a soma ser 7?', ['1/6', '7/36', '1/12', '1/7', '5/36'], 0, 'Há 36 resultados. Somam 7: (1,6), (2,5), (3,4), (4,3), (5,2) e (6,1), ou seja, 6 casos: 6/36 = 1/6.']
      ],
      logica: [
        ['Sabemos que todo A é B e que algum B é C. O que podemos garantir?', ['Nenhuma das outras afirmações', 'Algum A é C', 'Todo C é A', 'Nenhum A é C', 'Todo B é A'], 0, 'Os B que são C podem ser justamente os que não são A, ou não. Com essas informações, nenhuma das afirmações é garantida. Faça um diagrama de conjuntos para ver os dois casos.'],
        ['Um caracol está no fundo de um poço de 10 m. De dia ele sobe 3 m e, à noite, escorrega 2 m. Em que dia ele chega à borda?', ['No 8º dia', 'No 10º dia', 'No 7º dia', 'No 9º dia', 'No 5º dia'], 0, 'Ao fim de cada noite ele ganhou 1 m. Ao começar o 8º dia ele está a 7 m e, subindo 3 m, chega aos 10 m antes de escorregar.'],
        ['Num grupo, 60% gostam de futebol, 50% gostam de vôlei e 20% não gostam de nenhum dos dois. Quantos por cento gostam dos dois?', ['30%', '10%', '20%', '40%', '50%'], 0, 'Gostam de pelo menos um: 100% − 20% = 80%. Pela regra da união: 60% + 50% − ambos = 80%, então ambos = 30%.']
      ],
      numeros: [
        ['Qual é o resto da divisão de 7¹⁰⁰ por 5?', ['1', '2', '3', '4', '0'], 0, 'Os restos das potências de 7 por 5 se repetem a cada 4: 2, 4, 3, 1. Como 100 é múltiplo de 4, o resto é o mesmo de 7⁴: 1.'],
        ['Com quantos zeros termina o número 25! (25 fatorial)?', ['6', '5', '2', '25', '4'], 0, 'Cada zero vem de um par 2 × 5, e há mais fatores 2 do que 5. Contando os 5: 25 ÷ 5 = 5 múltiplos de 5, e o 25 tem um 5 a mais. Total: 6 zeros.'],
        ['A soma de três números inteiros consecutivos é 72. Qual é o maior deles?', ['25', '24', '26', '23', '27'], 0, 'O do meio é a média: 72 ÷ 3 = 24. Os números são 23, 24 e 25.']
      ],
      geometria: [
        ['Um círculo está desenhado dentro de um quadrado de lado 10 cm, tocando os 4 lados. Qual é a área do quadrado que fica fora do círculo? (Use π = 3,14)', ['21,5 cm²', '78,5 cm²', '31,4 cm²', '50 cm²', '68,6 cm²'], 0, 'O raio é 5 cm. Quadrado: 100 cm². Círculo: 3,14 × 5² = 78,5 cm². Fora do círculo: 100 − 78,5 = 21,5 cm².'],
        ['Se dobrarmos a medida da aresta de um cubo, o volume fica multiplicado por quanto?', ['8', '2', '4', '6', '16'], 0, 'O volume é aresta³. Com aresta 2a: (2a)³ = 8a³, ou seja, 8 vezes maior.'],
        ['Qual é a distância entre os pontos (1, 2) e (4, 6) no plano cartesiano?', ['5', '7', '25', '4', '6'], 0, 'As diferenças são 3 na horizontal e 4 na vertical. Por Pitágoras: √(3² + 4²) = √25 = 5.']
      ],
      padroes: [
        ['Qual é a soma dos 100 primeiros números ímpares (1 + 3 + 5 + ... + 199)?', ['10 000', '5 050', '9 900', '10 100', '20 000'], 0, 'A soma dos n primeiros ímpares é n²: 1 = 1², 1 + 3 = 2², 1 + 3 + 5 = 3²... Com n = 100: 10 000.'],
        ['Numa progressão geométrica, o primeiro termo é 2 e a razão é 3. Qual é a soma dos 5 primeiros termos?', ['242', '162', '486', '240', '122'], 0, 'Os termos são 2, 6, 18, 54 e 162. Somando: 242. Pela fórmula: 2 × (3⁵ − 1) ÷ (3 − 1) = 242.'],
        ['Quantos números de 1 a 100 são múltiplos de 3 ou de 5?', ['47', '53', '33', '50', '40'], 0, 'Múltiplos de 3: 33. Múltiplos de 5: 20. Os de 15 foram contados duas vezes: 6. Total: 33 + 20 − 6 = 47.']
      ],
      problemas: [
        ['Quais são as raízes da equação x² − 5x + 6 = 0?', ['2 e 3', '−2 e −3', '1 e 6', '−1 e 6', '5 e 6'], 0, 'Procure dois números com soma 5 e produto 6: 2 e 3. Então x² − 5x + 6 = (x − 2)(x − 3).'],
        ['Se f(x) = 2x + 3, quanto vale f(f(1))?', ['13', '5', '10', '8', '11'], 0, 'f(1) = 2 × 1 + 3 = 5. Depois, f(5) = 2 × 5 + 3 = 13.'],
        ['Uma aplicação rende 10% ao mês, com juros compostos. Quanto valem R$ 1000 depois de 2 meses?', ['R$ 1210', 'R$ 1200', 'R$ 1020', 'R$ 1100', 'R$ 1300'], 0, 'No 1º mês: 1000 × 1,1 = 1100. No 2º mês os juros incidem sobre 1100: 1100 × 1,1 = 1210.']
      ]
    }
  }
};
