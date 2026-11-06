/* Jogos de Ciências da Natureza da Ilha ENEM (lote Natureza). Cada jogo é uma página nat-*.html que usa o nat-motor.js.
   area: casa da ilha (fis, qui ou bio). habs: habilidades da Matriz de Referência do ENEM, Ciências da Natureza (H1 a H30).
   O id é também o id das estrelas em ENEM.darEstrelas. Junto com os jogos antigos (circuito, ph e balanceamento), cobre as 30 habilidades. */
window.ENEM_JOGOS = (window.ENEM_JOGOS || []).concat([
  // Física
  { id: 'nat-ondas', area: 'fis', icone: '🌊', titulo: 'Laboratório de ondas', url: 'nat-ondas.html', resumo: 'v = λ·f, espectro eletromagnético, Doppler, difração e ressonância.', habs: ['H1', 'H22', 'H17'] },
  { id: 'nat-movimento', area: 'fis', icone: '🚗', titulo: 'Pista dos movimentos', url: 'nat-movimento.html', resumo: 'Gráficos s×t e v×t, velocidade média, queda livre e leis de Newton.', habs: ['H20', 'H17'] },
  { id: 'nat-energia', area: 'fis', icone: '🏭', titulo: 'Usinas e energia', url: 'nat-energia.html', resumo: 'Energia potencial e cinética, transformações nas usinas, impactos e rendimento.', habs: ['H23', 'H26', 'H8'] },
  { id: 'nat-calor', area: 'fis', icone: '🔥', titulo: 'Cozinha do calor', url: 'nat-calor.html', resumo: 'Misturas térmicas, Q = m·c·ΔT, condução, convecção, irradiação e máquinas térmicas.', habs: ['H21', 'H7', 'H18'] },
  { id: 'nat-optica', area: 'fis', icone: '👓', titulo: 'Banco óptico', url: 'nat-optica.html', resumo: 'Lentes com raios de luz, óculos, espelhos, refração e cor dos objetos.', habs: ['H6', 'H18', 'H1'] },
  // Química
  { id: 'nat-estequiometria', area: 'qui', icone: '🍳', titulo: 'Cozinha das reações', url: 'nat-estequiometria.html', resumo: 'Massa molar, proporção, reagente limitante, rendimento e nomes das substâncias.', habs: ['H24', 'H25', 'H17'] },
  { id: 'nat-solucoes', area: 'qui', icone: '🧃', titulo: 'Laboratório de soluções', url: 'nat-solucoes.html', resumo: 'Concentração, diluição, ppm na água potável, solubilidade e separação de misturas.', habs: ['H7', 'H19', 'H17'] },
  { id: 'nat-radioatividade', area: 'qui', icone: '☢️', titulo: 'Contador de meia-vida', url: 'nat-radioatividade.html', resumo: 'Meia-vida, emissões alfa, beta e gama, usos e riscos da radiação.', habs: ['H22', 'H19', 'H26'] },
  { id: 'nat-ambiental', area: 'qui', icone: '🕵️', titulo: 'Detetive ambiental', url: 'nat-ambiental.html', resumo: 'Fonte, poluente, efeito e solução: chuva ácida, efeito estufa, eutrofização e mais.', habs: ['H10', 'H12', 'H27'] },
  // Biologia
  { id: 'nat-genetica', area: 'bio', icone: '🧬', titulo: 'Cruzamentos genéticos', url: 'nat-genetica.html', resumo: 'Quadro de Punnett, heredograma, sistema ABO, daltonismo e código genético.', habs: ['H13', 'H15'] },
  { id: 'nat-ecologia', area: 'bio', icone: '🌿', titulo: 'Teia da vida', url: 'nat-ecologia.html', resumo: 'Pirâmide de energia, magnificação trófica, ciclos, relações ecológicas e intervenções.', habs: ['H9', 'H4', 'H30'] },
  { id: 'nat-corpo', area: 'bio', icone: '🩺', titulo: 'Corpo em equilíbrio', url: 'nat-corpo.html', resumo: 'Glicemia e insulina, hormônios, vacina ou soro, prevenção de doenças e digestão.', habs: ['H14', 'H19', 'H30'] },
  { id: 'nat-evolucao', area: 'bio', icone: '🦋', titulo: 'Seleção natural', url: 'nat-evolucao.html', resumo: 'Simulador das mariposas, Lamarck x Darwin, resistência a antibióticos e biomas.', habs: ['H16', 'H3', 'H28'] },
  { id: 'nat-biotec', area: 'bio', icone: '🔬', titulo: 'Laboratório de biotecnologia', url: 'nat-biotec.html', resumo: 'PCR, teste de paternidade no gel, transgênicos, clonagem e fermentação.', habs: ['H11', 'H29', 'H2'] }
]);
