/* Ilha ENEM dentro do Mundo: uma vila de verdade, cercada de água, que só existe para quem digitou o código ENEM.
   Carregado pelo mundo/index.html antes do mundo.js (e só depois do código). Define window.ILHA_ENEM, que o mundo.js
   acrescenta como última vila (ao sul da Sala da Matemática), e as perguntas dos moradores (uma área por morador). */
(function () {
  if (!window.ENEM || !ENEM.liberado()) return;
  const J = (id, icone, titulo, url, resumo) => ({ id: 'enem-' + id, icone, titulo, url: 'enem/' + url, resumo, tipo: 'jogo' });
  const lugares = [
    J('misto', '🎲', 'Simulado relâmpago', 'simulado.html?area=misto', 'Dez perguntas rápidas de todas as áreas do ENEM, com explicação e macete depois de cada uma.'),
    J('dia1', '📅', 'Treino do 1º dia', 'simulado.html?area=dia1', 'Linguagens, Humanas e Redação: o que cai no domingo 8 de novembro.'),
    J('dia2', '📅', 'Treino do 2º dia', 'simulado.html?area=dia2', 'Natureza e Matemática: o que cai no domingo 15 de novembro.'),
    J('erros', '⛵', 'Barco dos erros', 'simulado.html?area=erros', 'Toda pergunta que você erra na ilha embarca aqui. Acertou na revisão, ela desembarca.'),
    J('red', '✍️', 'Casa da Redação', 'simulado.html?area=red', 'Competências, estrutura, repertório, conectivos e a proposta de intervenção.'),
    J('ling', '📚', 'Casa de Linguagens', 'simulado.html?area=ling', 'Funções da linguagem, gêneros, escolas literárias, variação e espanhol.'),
    J('hum', '🌎', 'Casa de Humanas', 'simulado.html?area=hum', 'História, geografia, filosofia e sociologia.'),
    J('bio', '🧬', 'Casa de Biologia', 'simulado.html?area=bio', 'Ecologia, citologia, genética, fisiologia, imunologia e evolução.'),
    J('qui', '⚗️', 'Casa de Química', 'simulado.html?area=qui', 'Atomística, estequiometria, soluções, físico-química e orgânica.'),
    J('ph', '🧪', 'Régua do pH', 'ph.html', 'Ácido, neutro ou básico? Coloque os produtos do dia a dia na régua.'),
    J('balanc', '⚖️', 'Balança dos átomos', 'balanceamento.html', 'Ajuste os coeficientes até os átomos baterem dos dois lados.'),
    J('fis', '⚡', 'Casa de Física', 'simulado.html?area=fis', 'Cinemática, dinâmica, energia, ondas, óptica e eletricidade.'),
    J('circuito', '💡', 'Circuito da casa', 'circuito.html', 'Série, paralelo, brilho das lâmpadas, potência e conta de luz.'),
    J('mat', '📐', 'Casa de Matemática', 'simulado.html?area=mat', 'Proporção, porcentagem, funções, geometria, estatística e probabilidade.')
  ];
  // cada morador pergunta sobre uma área (o morador k usa a área k)
  const P = window.ENEM_ILHA_PERGUNTAS || {};
  const ordem = ['bio', 'qui', 'fis', 'mat', 'hum', 'ling', 'red'];
  const bancos = ordem.filter(a => P[a]).map(a => ({ tema: P[a].tema, ic: P[a].ic, eixos: [], habs: [], lista: P[a].lista }));
  window.PERGUNTAS_NPC = window.PERGUNTAS_NPC || {};
  window.PERGUNTAS_NPC.enem = bancos;
  const perguntas = ordem.filter(a => P[a]).flatMap(a => P[a].lista.slice(0, 20).map((q, i) => Object.assign({ id: `enem:${a}:${i}` }, q)));
  window.ILHA_ENEM = {
    id: 'enem', nome: 'Ilha ENEM', sub: 'Área secreta · revisão para o ENEM 2026', ano: 10, caminho: '#f8e7b5', marco: 'farol', icone: '🏝️',
    aberta: true, ilha: true, lugares, perguntasProprias: perguntas,
    metaJogar: 6, metaPerg: 10, nNpc: bancos.length || 3, nItens: 8,
    placa: 'Bem-vindo à Ilha ENEM, a parte secreta do Mundo! Cada casa é um jogo de revisão e cada morador é especialista numa área: converse com todos e responda às perguntas. O que você errar nos simulados vai para o Barco dos erros. Dá para pescar em volta da ilha.'
  };
})();
