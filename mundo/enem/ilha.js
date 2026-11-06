/* Ilha ENEM dentro do Mundo: uma vila de verdade, cercada de água, que só existe para quem digitou o código ENEM.
   Carregado pelo mundo/index.html antes do mundo.js (e só depois do código). Define window.ILHA_ENEM, que o mundo.js
   acrescenta como última vila (ao sul da Sala da Matemática), e as perguntas dos moradores (uma área por morador). */
(function () {
  if (!window.ENEM || !ENEM.liberado()) return;
  const J = (id, icone, titulo, url, resumo) => ({ id: 'enem-' + id, icone, titulo, url: 'enem/' + url, resumo, tipo: 'jogo' });
  // uma sala por área (os jogos de cada área ficam dentro dela, vindos do catálogo) e os pontos especiais
  const C = window.ENEM_CATALOGO, nJogos = id => C ? C.daArea(id).length : 0;
  const sala = (id, icone, nome, temas) => {
    const n = nJogos(id);
    return J(id, icone, 'Sala de ' + nome, 'sala.html?a=' + id, temas + (n ? ' Simulado e ' + n + (n === 1 ? ' jogo' : ' jogos') + ', cada um marcado com as habilidades do ENEM que treina.' : ' Simulado da área; os jogos novos entram aqui.'));
  };
  const lugares = [
    J('misto', '🎲', 'Simulado relâmpago', 'simulado.html?area=misto', 'Dez perguntas rápidas de todas as áreas do ENEM, com explicação e macete depois de cada uma.'),
    J('dia1', '📅', 'Treino do 1º dia', 'simulado.html?area=dia1', 'Linguagens, Humanas e Redação: o que cai no domingo 8 de novembro.'),
    J('dia2', '📅', 'Treino do 2º dia', 'simulado.html?area=dia2', 'Natureza e Matemática: o que cai no domingo 15 de novembro.'),
    J('erros', '⛵', 'Barco dos erros', 'simulado.html?area=erros', 'Toda pergunta que você erra na ilha embarca aqui. Acertou na revisão, ela desembarca.'),
    sala('red', '✍️', 'Redação', 'Competências, estrutura, repertório, conectivos e proposta de intervenção.'),
    sala('ling', '📚', 'Linguagens', 'Funções da linguagem, gêneros, literatura, variação e espanhol.'),
    sala('hum', '🌎', 'Humanas', 'História, geografia, filosofia e sociologia.'),
    sala('bio', '🧬', 'Biologia', 'Ecologia, citologia, genética, fisiologia e evolução.'),
    sala('qui', '⚗️', 'Química', 'Atomística, estequiometria, soluções, pH e orgânica.'),
    sala('fis', '⚡', 'Física', 'Movimento, energia, ondas, óptica e eletricidade.'),
    sala('mat', '📐', 'Matemática', 'Proporção, porcentagem, funções, geometria e estatística.'),
    J('habs', '🗺️', 'Mapa das habilidades', 'habilidades.html', 'As 120 habilidades da Matriz do ENEM e os jogos da ilha que treinam cada uma.')
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
    placa: 'Bem-vindo à Ilha ENEM, a parte secreta do Mundo! Cada casa é a sala de uma área, cheia de jogos de revisão, e cada morador é especialista numa área: converse com todos e responda às perguntas. O que você errar nos simulados vai para o Barco dos erros. Dá para pescar em volta da ilha.'
  };
})();
