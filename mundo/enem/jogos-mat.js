/* Ilha ENEM · Matemática e suas Tecnologias: manifesto dos jogos (lido pela Sala de Matemática).
   O id é também o id da estrela (ENEM.estrelas(id)). habs = habilidades da Matriz de Referência do ENEM (H1 a H30). */
window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat([
  { id: 'mat-numeros', area: 'mat', icone: '🔢', titulo: 'Feira dos números', url: 'mat-quiz.html?j=numeros', habs: ['H1', 'H2', 'H3'],
    resumo: 'Frações, decimais, negativos, notação científica, MMC e padrões de sequências.' },
  { id: 'mat-porcent', area: 'mat', icone: '🛒', titulo: 'Mercado das porcentagens', url: 'mat-quiz.html?j=porcent', habs: ['H3', 'H4', 'H5'],
    resumo: 'Descontos, aumentos sucessivos, juros simples e compostos e qual oferta vale mais.' },
  { id: 'mat-obra', area: 'mat', icone: '🏗️', titulo: 'Obra lá de casa', url: 'mat-quiz.html?j=obra', habs: ['H8', 'H9', 'H14'],
    resumo: 'Piso, tinta, cerca, Pitágoras, sombras e áreas de figuras planas.' },
  { id: 'mat-solidos', area: 'mat', icone: '🧊', titulo: 'Planificações e vistas', url: 'mat-quiz.html?j=solidos', habs: ['H6', 'H7', 'H8'],
    resumo: 'Sólidos, planificações, Euler, vistas de pilhas de cubos, mapas de quadras e volumes.' },
  { id: 'mat-medidas', area: 'mat', icone: '🗺️', titulo: 'Escalas e unidades', url: 'mat-quiz.html?j=medidas', habs: ['H10', 'H11', 'H12', 'H13'],
    resumo: 'Escala de mapa e planta, litros e m³, km/h e m/s, tempo e medidas razoáveis.' },
  { id: 'mat-proporcao', area: 'mat', icone: '⚖️', titulo: 'Regra de três', url: 'mat-quiz.html?j=proporcao', habs: ['H15', 'H16', 'H17', 'H18'],
    resumo: 'Direta, inversa e composta, divisão proporcional e a embalagem mais vantajosa.' },
  { id: 'mat-algebra', area: 'mat', icone: '🧮', titulo: 'Equações do dia a dia', url: 'mat-quiz.html?j=algebra', habs: ['H19', 'H21', 'H22', 'H23'],
    resumo: 'Táxi, planos de celular, ingressos, lucro máximo e bactérias que dobram.' },
  { id: 'mat-funcoes', area: 'mat', icone: '📈', titulo: 'Laboratório de gráficos', url: 'mat-funcoes.html', habs: ['H19', 'H20', 'H21'],
    resumo: 'Simulador: mexa em a, b e c até o seu gráfico encaixar no da situação.' },
  { id: 'mat-graficos', area: 'mat', icone: '📊', titulo: 'Leitor de gráficos', url: 'mat-quiz.html?j=graficos', habs: ['H24', 'H25', 'H26'],
    resumo: 'Barras, linhas, setores e tabelas: tire conclusões como na prova.' },
  { id: 'mat-estat', area: 'mat', icone: '🎯', titulo: 'Média, mediana e moda', url: 'mat-quiz.html?j=estat', habs: ['H27', 'H29'],
    resumo: 'Tendência central, média ponderada, nota que falta e quem é mais regular.' },
  { id: 'mat-prob', area: 'mat', icone: '🎲', titulo: 'Contagem e probabilidade', url: 'mat-quiz.html?j=prob', habs: ['H3', 'H28', 'H30'],
    resumo: 'Senhas, comissões, dados, urnas, “pelo menos um” e qual rifa dá mais chance.' },
  { id: 'mat-sorte', area: 'mat', icone: '🪙', titulo: 'Simulador de sorte', url: 'mat-sorte.html', habs: ['H27', 'H28', 'H30'],
    resumo: 'Simulador: preveja o resultado, jogue dados e moedas mil vezes e compare com a teoria.' }
]);
