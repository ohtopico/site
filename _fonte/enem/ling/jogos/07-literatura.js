const E = ['Barroco', 'Arcadismo', 'Romantismo', 'Realismo / Naturalismo', 'Parnasianismo', 'Simbolismo', 'Modernismo'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const O = (cartas, e, pede) => ({ cartas, e, pede });
const fases = [['Quinhentismo', '1500', '#f3e2b0'], ['Barroco', '1601', '#e0b0ff'], ['Arcadismo', '1768', '#a8e6b8'], ['Romantismo', '1836', '#ffb3c6'], ['Realismo', '1881', '#c7c7c7'],
  ['Parnasianismo', '1882', '#ffe08a'], ['Simbolismo', '1893', '#e8e8ff'], ['Pré-Modernismo', '1902', '#ffd0a8'], ['Modernismo', '1922', '#8fd3ef']];
const svg = `<svg viewBox="0 0 640 210" role="img" aria-label="Linha do tempo das escolas literárias no Brasil">
  <style>.t{font:700 12px Lexend,sans-serif;fill:#1d2a1f}.a{font:800 13px Sniglet,Lexend,sans-serif;fill:#1d2a1f}</style>
  <rect width="640" height="210" rx="16" fill="#fffdf6"/><path d="M20 105 H620" stroke="#1d2a1f" stroke-width="4"/>
  ${fases.map(([n, a, c], k) => { const x = 40 + k * 70, y = k % 2 ? 140 : 40; return `<circle cx="${x}" cy="105" r="9" fill="${c}" stroke="#1d2a1f" stroke-width="2.5"/>
    <rect x="${x - 34}" y="${y}" width="68" height="34" rx="8" fill="${c}" stroke="#1d2a1f" stroke-width="2"/><text class="a" x="${x}" y="${y + 14}" text-anchor="middle">${a}</text>
    <text class="t" x="${x}" y="${y + 28}" text-anchor="middle">${n.length > 11 ? n.slice(0, 10) + '.' : n}</text>`; }).join('')}
</svg>`;
module.exports = {
  id: 'ling-literatura', arquivo: 'ling-literatura.html', icone: '📜', titulo: 'Linha do tempo literária',
  resumo: 'Monte a linha do tempo das escolas literárias, reconheça cada trecho pela sua época e relacione o texto ao contexto histórico.',
  desc: 'Do Barroco ao Modernismo: ponha as escolas e as obras em ordem, descubra de que época é cada trecho e relacione a literatura com o momento histórico em que nasceu.',
  habs: ['H15', 'H16', 'H17'],
  figura: svg,
  intro: 'O ENEM não pede datas decoradas: pede que você ligue o texto ao seu contexto (Independência, abolição, República, industrialização) e reconheça as marcas de cada estilo.',
  cola: `${svg}
    <table><tr><th>Escola</th><th>Contexto</th><th>Marcas</th><th>Autores</th></tr>
    <tr><td>Barroco (séc. XVII)</td><td>Contrarreforma, açúcar</td><td>conflito fé × pecado, antíteses, paradoxos</td><td>Gregório de Matos, Pe. Antônio Vieira</td></tr>
    <tr><td>Arcadismo (1768)</td><td>Iluminismo, ouro, Inconfidência</td><td>bucolismo, pastores, <i>fugere urbem</i>, <i>carpe diem</i></td><td>Tomás A. Gonzaga, Cláudio M. da Costa</td></tr>
    <tr><td>Romantismo (1836)</td><td>pós-Independência, construir a nação</td><td>nacionalismo, índio herói, amor idealizado, morte; 3ª geração abolicionista</td><td>Gonçalves Dias, José de Alencar, Álvares de Azevedo, Castro Alves</td></tr>
    <tr><td>Realismo / Naturalismo (1881)</td><td>crise do Império, ciência, abolição</td><td>crítica social, ironia, análise psicológica; determinismo do meio</td><td>Machado de Assis, Aluísio Azevedo</td></tr>
    <tr><td>Parnasianismo</td><td>fim do século XIX</td><td>arte pela arte, soneto perfeito, rima rica</td><td>Olavo Bilac</td></tr>
    <tr><td>Simbolismo (1893)</td><td>fim do século XIX</td><td>musicalidade, sinestesia, mistério, espiritualidade</td><td>Cruz e Sousa, Alphonsus de Guimaraens</td></tr>
    <tr><td>Pré-Modernismo (1902)</td><td>República Velha, Canudos</td><td>denúncia do Brasil real, sertão, subúrbio</td><td>Euclides da Cunha, Lima Barreto, Monteiro Lobato</td></tr>
    <tr><td>Modernismo (1922)</td><td>Semana de Arte Moderna, centenário da Independência</td><td>verso livre, humor, coloquialidade, antropofagia</td><td>Oswald e Mário de Andrade; depois Drummond, Graciliano, Clarice, Guimarães Rosa</td></tr></table>`,
  etapas: [
    { tipo: 'ordenar', rotulo: 'Época', n: 2, pede: 'Toque nas cartas da mais antiga para a mais recente.', itens: [
      O(['Quinhentismo', 'Barroco', 'Arcadismo', 'Romantismo', 'Realismo'], 'Da literatura de informação dos jesuítas e viajantes (1500) ao Realismo de Machado (1881).'),
      O(['Romantismo', 'Realismo', 'Simbolismo', 'Pré-Modernismo', 'Modernismo'], 'Romantismo (1836) → Realismo (1881) → Simbolismo (1893) → Pré-Modernismo (1902) → Modernismo (1922).'),
      O(['Carta de Pero Vaz de Caminha', 'Sermões do Pe. Antônio Vieira', 'Marília de Dirceu (Gonzaga)', 'Iracema (Alencar)', 'Memórias póstumas de Brás Cubas (Machado)'], 'Quinhentismo, Barroco, Arcadismo, Romantismo e Realismo, uma obra de cada.', 'Ponha as obras em ordem cronológica.'),
      O(['O cortiço (1890)', 'Broquéis (1893)', 'Os sertões (1902)', 'Macunaíma (1928)', 'Vidas secas (1938)'], 'Naturalismo, Simbolismo, Pré-Modernismo, 1ª fase modernista e romance de 30.', 'Ponha as obras em ordem cronológica.'),
      O(['Gonçalves Dias: indianismo e pátria', 'Álvares de Azevedo: tédio, amor e morte', 'Castro Alves: poesia social e abolicionista'], 'As três gerações românticas da poesia: nacionalista-indianista, ultrarromântica e condoreira.', 'Ponha as gerações do Romantismo em ordem.')
    ] },
    { tipo: 'classificar', rotulo: 'Trecho', n: 6, pede: 'De que escola literária é este trecho ou característica?', baldes: E, itens: [
      C('🌗', '“Nasce o Sol, e não dura mais que um dia, / Depois da Luz se segue a noite escura” (Gregório de Matos)', 0, 'Contraste luz × sombra e a brevidade da vida: antítese barroca.'),
      C('🐑', '“Eu, Marília, não sou algum vaqueiro, / que viva de guardar alheio gado” (Tomás Antônio Gonzaga)', 1, 'Pastor, musa Marília, vida simples no campo: <b>Arcadismo</b>.'),
      C('🌴', '“Minha terra tem palmeiras, / Onde canta o Sabiá; / As aves, que aqui gorjeiam, / Não gorjeiam como lá.” (Gonçalves Dias)', 2, 'Saudade e exaltação da pátria: nacionalismo da 1ª geração romântica.'),
      C('🥀', '“Se eu morresse amanhã, viria ao menos / Fechar meus olhos minha triste irmã” (Álvares de Azevedo)', 2, 'Morte, melancolia e sentimentalismo: ultrarromantismo (2ª geração).'),
      C('⛓️', '“Senhor Deus dos desgraçados! / Dizei-me vós, Senhor Deus! / Se é loucura… se é verdade / Tanto horror perante os céus?!” (Castro Alves, “O navio negreiro”)', 2, 'Poesia social e abolicionista da 3ª geração romântica (condoreira).'),
      C('🪱', '“Ao verme que primeiro roeu as frias carnes do meu cadáver dedico como saudosa lembrança estas memórias póstumas.” (Machado de Assis)', 3, 'Ironia, narrador defunto e crítica: <b>Realismo</b> de Machado.'),
      C('🏚️', '“Eram cinco horas da manhã e o cortiço acordava, abrindo, não os olhos, mas a sua infinidade de portas e janelas alinhadas.” (Aluísio Azevedo)', 3, 'O cortiço vira um organismo vivo: o meio domina as pessoas, marca do <b>Naturalismo</b>.'),
      C('💎', '“Torce, aprimora, alteia, lima / A frase; e, enfim, / No verso de ouro engasta a rima, / Como um rubim.” (Olavo Bilac)', 4, 'O poeta como ourives que lapida a forma: arte pela arte, <b>Parnasianismo</b>.'),
      C('🌫️', '“Ó Formas alvas, brancas, Formas claras / De luares, de neves, de neblinas!” (Cruz e Sousa)', 5, 'Brancura, névoa, musicalidade e mistério: <b>Simbolismo</b>.'),
      C('🌳', '“No fundo do mato-virgem nasceu Macunaíma, herói de nossa gente.” (Mário de Andrade)', 6, 'Herói “sem nenhum caráter”, mistura de culturas: <b>Modernismo</b> de 1922.'),
      C('🍽️', '“Tupi, or not tupi that is the question.” (Oswald de Andrade, Manifesto Antropófago)', 6, 'Antropofagia: “devorar” a cultura estrangeira para criar algo brasileiro. <b>Modernismo</b>.'),
      C('⛪', 'Conflito entre fé e pecado, linguagem rebuscada, antíteses e paradoxos.', 0, 'Marcas do <b>Barroco</b> (cultismo e conceptismo).'),
      C('🏞️', 'Bucolismo, vida simples no campo, pastores, fugere urbem e carpe diem.', 1, 'Lemas latinos do <b>Arcadismo</b>.'),
      C('🎼', 'Sinestesia, musicalidade, espiritualidade e gosto pelo vago e pelo mistério.', 5, 'Marcas do <b>Simbolismo</b>.'),
      C('🧠', 'Determinismo: o meio, a raça e o momento explicam o comportamento das personagens, muitas vezes animalizadas.', 3, '<b>Naturalismo</b>, influenciado pela ciência do século XIX.'),
      C('✂️', 'Verso livre, humor, linguagem coloquial e ruptura com a tradição acadêmica.', 6, '<b>Modernismo</b>, a partir da Semana de 22.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 3, itens: [
      { base: '<p class="verso">Dê-me um cigarro\nDiz a gramática\nDo professor e do aluno\nE do mulato sabido\nMas o bom negro e o bom branco\nDa Nação Brasileira\nDizem todos os dias\nDeixa disso camarada\nMe dá um cigarro</p>', fonte: 'Oswald de Andrade, “Pronominais” (1925).',
        enun: 'No poema, o contraste entre “Dê-me um cigarro” e “Me dá um cigarro” revela a proposta modernista de',
        alts: ['valorizar a língua falada pelos brasileiros, em oposição à norma lusitana.', 'defender que todos aprendam a gramática normativa.', 'criticar quem fala de forma coloquial.', 'resgatar a linguagem rebuscada dos parnasianos.', 'ensinar regras de colocação pronominal.'],
        e: 'A próclise “Me dá” é o jeito brasileiro de falar. O Modernismo buscava uma língua literária brasileira, coloquial (H16).' },
      { base: '<p class="verso">Minha terra tem palmeiras,\nOnde canta o Sabiá;\nAs aves, que aqui gorjeiam,\nNão gorjeiam como lá.</p>', fonte: 'Gonçalves Dias, “Canção do exílio” (1843).',
        enun: 'Escrito cerca de vinte anos após a Independência, o poema se relaciona ao contexto histórico porque',
        alts: ['exalta a natureza da pátria, contribuindo para construir uma identidade nacional.', 'denuncia a escravidão nas lavouras de café.', 'critica a monarquia e defende a República.', 'descreve com objetividade científica a fauna brasileira.', 'imita os modelos árcades portugueses sem valorizar o Brasil.'],
        e: 'O Romantismo ajudou a “inventar” a nação recém-independente: natureza exuberante, índio herói, saudade da pátria (H15).' },
      { base: '<p>Em <i>Memórias póstumas de Brás Cubas</i>, o narrador, já morto, conta sua vida de homem rico que nunca trabalhou, não teve filhos e conclui: “Não tive filhos, não transmiti a nenhuma criatura o legado da nossa miséria.”</p>',
        enun: 'A ironia do narrador machadiano permanece atual porque',
        alts: ['expõe o egoísmo e os privilégios das elites, tema ainda presente na sociedade.', 'idealiza o amor romântico como saída para a vida.', 'valoriza a vida simples no campo, longe das cidades.', 'defende o determinismo biológico das personagens.', 'descreve a paisagem brasileira com nacionalismo.'],
        e: 'H17: valores humanos “atualizáveis”. A crítica de Machado ao egoísmo e à elite ociosa continua fazendo sentido.' },
      { base: '<p class="verso">Era um sonho dantesco… o tombadilho\nQue das luzernas avermelha o brilho,\nEm sangue a se banhar.\nTinir de ferros… estalar de açoite…\nLegiões de homens negros como a noite,\nHorrendos a dançar…</p>', fonte: 'Castro Alves, “O navio negreiro” (1869).',
        enun: 'O poema se insere no contexto do século XIX ao',
        alts: ['denunciar a violência do tráfico de escravizados, engajando-se na causa abolicionista.', 'celebrar a chegada dos imigrantes europeus ao Brasil.', 'descrever com neutralidade uma viagem marítima.', 'exaltar a figura do indígena como herói nacional.', 'defender a manutenção da escravidão na economia cafeeira.'],
        e: 'Castro Alves, o “poeta dos escravos”, usa imagens fortes (açoite, sangue, ferros) para denunciar o tráfico (H15).' }
    ] }
  ]
};
