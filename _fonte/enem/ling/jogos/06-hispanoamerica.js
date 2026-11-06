const P = ['México', 'Argentina', 'Espanha', 'Peru', 'Colômbia'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const I = ['Informar', 'Convencer', 'Instruir', 'Narrar', 'Expressar sentimentos'];
const svg = `<svg viewBox="0 0 620 300" role="img" aria-label="Mapa estilizado de países de língua espanhola">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:700 14px Lexend,sans-serif;fill:#1d2a1f}.e{font-size:24px}</style>
  <rect x="0" y="0" width="620" height="300" rx="16" fill="#8fd3ef"/>
  <path class="c" d="M40 40 L170 40 L190 80 L150 110 L120 100 L90 70 Z" fill="#9bd77a"/><text class="t" x="60" y="62">México</text><text class="e" x="120" y="96">💀🌮</text>
  <path class="c" d="M190 150 L250 140 L265 170 L235 190 L200 180 Z" fill="#ffd58a"/><text class="t" x="200" y="165">Colômbia</text><text class="e" x="270" y="160">🎺</text>
  <path class="c" d="M180 195 L230 195 L240 240 L200 260 L175 230 Z" fill="#f7a8c4"/><text class="t" x="185" y="222">Peru</text><text class="e" x="240" y="230">🦙</text>
  <path class="c" d="M255 225 L300 225 L290 290 L262 296 L250 260 Z" fill="#c7b4f2"/><text class="t" x="300" y="262">Argentina 💃🧉</text>
  <path class="c" d="M470 60 L560 55 L575 100 L520 125 L470 110 Z" fill="#ffb38a"/><text class="t" x="490" y="88">Espanha</text><text class="e" x="500" y="150">💃🏽🎸</text>
  <text class="t" x="340" y="40">21 países têm o espanhol</text><text class="t" x="340" y="60">como língua oficial</text>
</svg>`;
module.exports = {
  id: 'ling-hispano', arquivo: 'ling-hispano.html', icone: '🌎', titulo: 'Viaje por Hispanoamérica',
  resumo: 'Viaje pelos países de língua espanhola: ligue cada manifestação cultural ao seu país, descubra a intenção de cada texto e leia como no ENEM.',
  desc: 'O ENEM gosta de textos em espanhol que mostram a diversidade cultural: música, festas, literatura, comida, línguas indígenas. Descubra de onde vem cada manifestação e para que serve cada texto.',
  habs: ['H6', 'H7', 'H8'],
  figura: svg,
  intro: 'O espanhol não é uma língua só da Espanha: é falado em 21 países, com variações de vocabulário e pronúncia (vos, che, ustedes). O ENEM valoriza essa diversidade.',
  cola: `${svg}
    <ul><li><b>México:</b> Día de Muertos (patrimônio da UNESCO), mariachi, Frida Kahlo e Diego Rivera (muralismo), tacos.</li>
    <li><b>Argentina:</b> tango, Mafalda (Quino), Jorge Luis Borges, Julio Cortázar, mate, uso do “vos” (voseo).</li>
    <li><b>Espanha:</b> flamenco, Cervantes (Dom Quixote), Picasso (Guernica), Lorca, La Tomatina.</li>
    <li><b>Peru:</b> Machu Picchu, Inti Raymi (festa inca do Sol), quíchua (língua indígena oficial), ceviche.</li>
    <li><b>Colômbia:</b> Gabriel García Márquez e o realismo mágico (Cem anos de solidão), cumbia e vallenato, Botero.</li></ul>
    <p><b>Intenção do texto:</b> informar (notícia, verbete), convencer (anúncio, artigo de opinião), instruir (receita, manual: imperativo), narrar (conto, crônica), expressar (poema, carta, diário).</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Parada', n: 5, pede: 'De que país vem esta manifestação cultural?', baldes: P, itens: [
      C('💀', 'Día de Muertos: altares com fotos, velas, flores de cempasúchil e caveiras de açúcar para receber os mortos.', 0, 'Festa mexicana, de raiz indígena e católica, Patrimônio Imaterial da UNESCO.'),
      C('💃', 'O tango, dança e música nascidas nos bairros pobres de Buenos Aires no fim do século XIX.', 1, 'O tango nasceu na região do Rio da Prata (Buenos Aires e Montevidéu) e virou símbolo da <b>Argentina</b>.'),
      C('🎸', 'Flamenco: canto, violão e dança da Andaluzia, com influência cigana.', 2, 'Sul da <b>Espanha</b>, Patrimônio Imaterial da UNESCO.'),
      C('🏔️', 'Inti Raymi, a festa inca do Sol, celebrada em Cusco.', 3, 'Herança inca do <b>Peru</b>.'),
      C('📚', 'Cem anos de solidão e o realismo mágico de Gabriel García Márquez, na cidade fictícia de Macondo.', 4, 'García Márquez era <b>colombiano</b>, Nobel de 1982.'),
      C('🎨', 'Frida Kahlo e seus autorretratos com flores, macacos e roupas tehuanas.', 0, 'Pintora <b>mexicana</b>, valorizava a cultura indígena do país.'),
      C('🧒', 'Mafalda, a menina das tirinhas de Quino que questiona o mundo dos adultos.', 1, 'Quino era <b>argentino</b>. Mafalda aparece muito no ENEM!'),
      C('🐴', 'Dom Quixote e Sancho Pança, de Miguel de Cervantes.', 2, 'Clássico da literatura da <b>Espanha</b> (1605).'),
      C('🐟', 'O ceviche, peixe cru marinado no suco de limão.', 3, 'Prato símbolo do <b>Peru</b>.'),
      C('🖼️', 'As figuras volumosas e arredondadas de Fernando Botero.', 4, 'Botero era <b>colombiano</b>.'),
      C('🎺', 'Mariachis com chapéus de aba larga, violinos e trompetes.', 0, 'Música tradicional do <b>México</b>, Patrimônio da UNESCO.'),
      C('🗣️', 'O quíchua, língua indígena falada por milhões e oficial ao lado do espanhol.', 3, 'Língua dos incas, oficial no <b>Peru</b> (e na Bolívia). Diversidade linguística é H8.'),
      C('🍅', 'La Tomatina, a guerra de tomates na cidade de Buñol.', 2, 'Festa da <b>Espanha</b> (Valência).'),
      C('🥁', 'A cumbia, ritmo do litoral caribenho com tambores de origem africana e flautas indígenas.', 4, 'Nasceu na <b>Colômbia</b>, mistura africana, indígena e europeia.')
    ] },
    { tipo: 'classificar', rotulo: 'Parada', n: 3, pede: 'Qual é a intenção principal deste texto em espanhol?', baldes: I, itens: [
      C('🗞️', '“El terremoto de magnitud 6,2 afectó ayer a tres provincias del sur del país, según el Instituto Geofísico.”', 0, 'Fato, dado e fonte: notícia para <b>informar</b>.'),
      C('🛍️', '“¿Cansado de esperar? Con FibraYa navegas diez veces más rápido. ¡Contrata hoy!”', 1, 'Pergunta ao leitor e imperativo “¡Contrata!”: anúncio para <b>convencer</b>.'),
      C('🍳', '“Caliente el aceite, añada la cebolla y remueva durante cinco minutos.”', 2, 'Imperativos em sequência: receita para <b>instruir</b>.'),
      C('📖', '“Aquella mañana, cuando el tren se detuvo en medio del campo, nadie imaginaba lo que iba a pasar.”', 3, 'Tempo, personagens, suspense: <b>narrar</b>.'),
      C('💌', '“Te extraño tanto que hasta el silencio de la casa me duele.”', 4, 'Primeira pessoa e sentimento: <b>expressar</b> (função emotiva).'),
      C('🧯', '“En caso de incendio, no use el ascensor. Baje por las escaleras.”', 2, 'Aviso com instruções: <b>instruir</b>.'),
      C('🗳️', '“Leer no es un lujo: es un derecho. Por eso, cada barrio necesita una biblioteca pública.”', 1, 'Tese + argumento (“por eso”): texto para <b>convencer</b>.')
    ] },
    { tipo: 'enem', rotulo: 'Leitura', n: 2, itens: [
      { base: '<p>En el Día de Muertos, las familias mexicanas no lloran a sus difuntos: los esperan. Preparan altares con su comida favorita, fotos y flores de color naranja, porque creen que, por una noche, los muertos vuelven a visitar a los vivos.</p>',
        enun: 'O texto apresenta o Día de Muertos como uma celebração que',
        alts: ['mantém viva a memória dos mortos por meio de uma festa familiar.', 'proíbe as famílias de chorar seus parentes.', 'é dedicada apenas à culinária mexicana.', 'surgiu recentemente por influência do cinema.', 'tem o objetivo de assustar as crianças.'],
        e: '“No lloran a sus difuntos: los esperan”: a festa é de memória e afeto. Produção cultural como representação de diversidade (H8).' },
      { base: '<p>— Che, ¿vos venís al asado del domingo?<br>— ¡Obvio! Llevo el mate y unas empanadas.</p>', fonte: 'Diálogo entre dois amigos de Buenos Aires.',
        enun: 'No diálogo, o uso de “che” e “vos” revela',
        alts: ['uma variedade do espanhol típica da região do Rio da Prata.', 'um erro gramatical cometido pelos amigos.', 'a forma mais formal de tratamento em espanhol.', 'o espanhol falado na Espanha antiga.', 'palavras emprestadas do português do Brasil.'],
        e: 'O <i>voseo</i> (vos venís) e o “che” marcam o espanhol rioplatense (Argentina e Uruguai). Variação linguística também existe no espanhol!' },
      { base: '<p>En Perú, más de tres millones de personas hablan quechua. Desde hace algunos años, hay noticieros, canciones y hasta videojuegos en esa lengua, que los jóvenes usan con orgullo en las redes sociales.</p>',
        enun: 'O texto mostra que o quíchua',
        alts: ['continua vivo e ganha espaço em novos meios de comunicação.', 'está desaparecendo porque os jovens o rejeitam.', 'é falado apenas por pessoas idosas no campo.', 'foi proibido nas redes sociais peruanas.', 'substituiu o espanhol como única língua do Peru.'],
        e: 'Noticiários, músicas, games, orgulho nas redes: a língua indígena se renova. Diversidade linguística (H8) e tecnologia.' }
    ] }
  ]
};
