const M = ['Barroco', 'Impressionismo', 'Expressionismo', 'Cubismo', 'Surrealismo', 'Arte contemporânea'];
const F = ['Denúncia social', 'Devoção religiosa', 'Identidade e ritual de um povo', 'Questionar o que é arte'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const quadro = (x, nome, corpo) => `<g transform="translate(${x} 14)"><rect width="92" height="92" rx="6" fill="#fff" stroke="#8a5a2b" stroke-width="7"/>
  <svg x="6" y="6" width="80" height="80" viewBox="0 0 80 80">${corpo}</svg><text x="46" y="118" text-anchor="middle" style="font:700 11.5px Lexend,sans-serif;fill:#1d2a1f">${nome}</text></g>`;
const svg = `<svg viewBox="0 0 640 140" role="img" aria-label="Seis quadrinhos, um em cada estilo: barroco, impressionismo, expressionismo, cubismo, surrealismo e arte contemporânea">
  <rect width="640" height="140" rx="16" fill="#fff6dd"/>
  ${quadro(10, 'Barroco', '<rect width="80" height="80" fill="#3a2410"/><path d="M40 8 L66 30 V74 H14 V30Z" fill="#d9a520" stroke="#ffe08a" stroke-width="2"/><path d="M40 14 V28 M33 21 H47" stroke="#fff6dd" stroke-width="3"/><circle cx="40" cy="48" r="10" fill="#ffe08a"/><path d="M20 74 Q40 56 60 74" fill="#a06b1a"/>')}
  ${quadro(115, 'Impressionismo', '<rect width="80" height="80" fill="#bfe3f5"/>' + Array.from({ length: 70 }, (_, k) => `<circle cx="${(k * 37) % 80}" cy="${40 + ((k * 53) % 40)}" r="3.4" fill="${['#7cc0e0', '#f6c86b', '#9bd77a', '#e88fb0'][k % 4]}" opacity=".85"/>`).join('') + '<circle cx="60" cy="18" r="9" fill="#ffb347" opacity=".8"/>')}
  ${quadro(220, 'Expressionismo', '<rect width="80" height="80" fill="#f26b3a"/><path d="M0 20 Q20 5 40 22 T80 18 M0 34 Q25 22 45 36 T80 30" stroke="#ffd23f" stroke-width="5" fill="none"/><ellipse cx="40" cy="56" rx="11" ry="16" fill="#e8d6a0"/><ellipse cx="36" cy="52" rx="2" ry="3"/><ellipse cx="44" cy="52" rx="2" ry="3"/><ellipse cx="40" cy="62" rx="3" ry="5"/><path d="M27 52 Q20 60 29 70 M53 52 Q60 60 51 70" stroke="#1d2a1f" stroke-width="2.5" fill="none"/>')}
  ${quadro(325, 'Cubismo', '<rect width="80" height="80" fill="#c9b48a"/><path d="M16 10 L50 6 L62 40 L44 72 L14 60Z" fill="#8a6f4a"/><path d="M30 14 L56 24 L46 54 L24 44Z" fill="#e2cfa3"/><path d="M32 26 L42 22 L40 32Z" fill="#1d2a1f"/><rect x="44" y="34" width="9" height="6" fill="#1d2a1f"/><path d="M28 50 L44 48 L36 58Z" fill="#a03a2a"/>')}
  ${quadro(430, 'Surrealismo', '<rect width="80" height="80" fill="#f4d27a"/><rect y="56" width="80" height="24" fill="#c9883a"/><path d="M20 30 Q42 26 46 40 Q48 56 40 66 Q38 52 26 48 Q16 44 20 30Z" fill="#eee" stroke="#1d2a1f" stroke-width="2"/><path d="M33 38 L33 33 M33 38 L38 40" stroke="#1d2a1f" stroke-width="2"/><path d="M58 20 V56" stroke="#5a3a1a" stroke-width="3"/><ellipse cx="62" cy="18" rx="8" ry="5" fill="#9bd77a"/>')}
  ${quadro(535, 'Contemporânea', '<rect width="80" height="80" fill="#f1f1f1"/><rect x="24" y="52" width="32" height="26" fill="#d9d9d9" stroke="#1d2a1f" stroke-width="1.5"/><path d="M26 30 Q40 22 54 30 L50 50 H30Z" fill="#fff" stroke="#1d2a1f" stroke-width="2"/><text x="40" y="44" text-anchor="middle" style="font:700 7px Lexend,sans-serif">R. Mutt</text>')}
</svg>`;
module.exports = {
  id: 'ling-arte', arquivo: 'ling-arte.html', icone: '🎨', titulo: 'Galeria de arte',
  resumo: 'Seja curadora da galeria: reconheça o estilo de cada obra, descubra para que ela serve e discuta beleza, preconceito e diversidade na arte.',
  desc: 'Você é a curadora de uma galeria. Pendure cada obra na sala do seu estilo, explique a função dela (denúncia, fé, ritual, provocação) e responda às questões sobre arte, cultura e preconceito.',
  habs: ['H12', 'H13', 'H14'],
  figura: svg,
  intro: 'Seis salas, seis jeitos de pintar o mundo. No ENEM, a arte aparece ligada ao contexto: quem fez, para quem, para quê e o que ela revela sobre padrões de beleza e preconceitos.',
  cola: `${svg}
    <ul><li><b>Barroco</b> (séc. XVII–XVIII): exagero, dourado, drama religioso. No Brasil: Aleijadinho (os profetas de Congonhas) e Mestre Ataíde.</li>
    <li><b>Impressionismo</b> (1870): pinceladas soltas, luz natural, pintura ao ar livre (Monet, Renoir).</li>
    <li><b>Expressionismo</b>: deformação e cores fortes para expressar angústia (Munch, “O grito”; no Brasil, Anita Malfatti e Lasar Segall).</li>
    <li><b>Cubismo</b>: formas geométricas, vários pontos de vista ao mesmo tempo, inspirado nas máscaras africanas (Picasso, Braque).</li>
    <li><b>Surrealismo</b>: sonho e inconsciente (Dalí, relógios derretidos; Magritte).</li>
    <li><b>Arte contemporânea</b>: ready-made (Duchamp, “A fonte”), instalação, performance, arte participativa (Hélio Oiticica, Parangolés; Lygia Clark, Bichos), grafite (Os Gêmeos, Kobra).</li></ul>
    <p><b>Semana de Arte Moderna (1922):</b> Anita Malfatti, Di Cavalcanti, Villa-Lobos, Mário e Oswald. Depois, Tarsila do Amaral pinta o <i>Abaporu</i> (1928), que inspira o Manifesto Antropófago.</p>
    <p><b>Arte e diversidade:</b> grafismo <i>Kusiwa</i> dos Wajãpi (Amapá) é Patrimônio Imaterial; arte popular, indígena e afro-brasileira têm o mesmo valor que a arte “de museu”. Em 1917, Monteiro Lobato atacou a exposição de Anita Malfatti no artigo “Paranoia ou mistificação?”, exemplo de preconceito contra o novo.</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Obra', n: 5, pede: 'Em qual sala da galeria esta obra deve ficar?', baldes: M, itens: [
      C('⛪', 'Os doze profetas de pedra-sabão de Aleijadinho, no santuário de Congonhas (MG), cheios de drama e movimento.', 0, 'Barroco mineiro, século XVIII, ligado ao ciclo do ouro e à fé católica.'),
      C('🌅', 'Monet pinta o mesmo lago com nenúfares em várias horas do dia, com pinceladas rápidas, para captar a luz.', 1, 'Luz natural e pincelada solta: <b>Impressionismo</b>.'),
      C('😱', 'Uma figura de rosto deformado grita sob um céu de ondas vermelhas e laranja (Munch).', 2, '“O grito”: angústia expressa pela deformação e pela cor. <b>Expressionismo</b>.'),
      C('🧩', 'Picasso pinta mulheres com rostos de frente e de perfil ao mesmo tempo, com formas geométricas inspiradas em máscaras africanas.', 3, '“Les demoiselles d’Avignon” (1907) inaugura o <b>Cubismo</b>.'),
      C('🕰️', 'Relógios moles derretem sobre galhos secos numa paisagem de sonho (Dalí).', 4, '“A persistência da memória”: sonho e inconsciente, <b>Surrealismo</b>.'),
      C('🚽', 'Duchamp assina um mictório industrial com o nome “R. Mutt” e o leva para uma exposição.', 5, '“A fonte” (1917), ready-made: o artista escolhe o objeto e muda o olhar sobre ele. Raiz da <b>arte contemporânea</b>.'),
      C('🧥', 'Hélio Oiticica cria capas coloridas, os Parangolés, que só “acontecem” quando alguém veste e dança com elas.', 5, 'O público participa da obra: arte participativa, <b>contemporânea</b>.'),
      C('🎨', 'Paredes enormes de prédios em São Paulo pintadas com personagens amarelos pelos irmãos Os Gêmeos.', 5, 'Grafite: arte urbana, hoje exposta em museus do mundo todo.'),
      C('👁️', 'Magritte pinta um cachimbo e escreve embaixo: “Isto não é um cachimbo”.', 4, 'Provoca o pensamento sobre imagem e realidade: <b>Surrealismo</b>.'),
      C('🖤', 'Lasar Segall retrata imigrantes num navio, com rostos tristes e alongados e cores sombrias.', 2, '“Navio de emigrantes”: emoção e deformação, <b>Expressionismo</b>.'),
      C('🌻', 'Renoir pinta um baile ao ar livre, com manchas de sol entre as árvores sobre as roupas das pessoas.', 1, '“Baile no Moulin de la Galette”: luz e cor, <b>Impressionismo</b>.'),
      C('✨', 'Igreja coberta de talha dourada, anjos e colunas retorcidas, para impressionar os fiéis.', 0, 'Ornamentação exagerada e emoção religiosa: <b>Barroco</b>.')
    ] },
    { tipo: 'classificar', rotulo: 'Obra', n: 3, pede: 'Qual é a principal função desta produção artística?', baldes: F, itens: [
      C('🏜️', 'Portinari pinta “Retirantes”: uma família magra e cadavérica fugindo da seca nordestina.', 0, 'Denuncia a miséria e a migração forçada.'),
      C('💣', 'Picasso pinta “Guernica” após o bombardeio de uma cidade basca na Guerra Civil Espanhola.', 0, 'Protesto contra a violência da guerra.'),
      C('🙏', 'Mestre Ataíde pinta o forro da igreja de São Francisco, em Ouro Preto, com a Virgem cercada de anjos mestiços.', 1, 'Arte sacra barroca para a fé. (Os anjos mestiços também mostram a cara do Brasil colonial.)'),
      C('🖌️', 'Os Wajãpi, do Amapá, pintam o corpo com o grafismo Kusiwa, que conta sua visão de mundo.', 2, 'Arte como identidade e ritual. É Patrimônio Imaterial do Brasil e da UNESCO.'),
      C('🎭', 'Máscaras africanas usadas em cerimônias para representar ancestrais.', 2, 'Função ritual e religiosa de um povo, não decorativa. Influenciaram o Cubismo.'),
      C('🚽', 'Duchamp expõe um mictório como obra de arte.', 3, 'Provoca: o que torna algo arte? O objeto ou o olhar?'),
      C('🥫', 'Andy Warhol repete latas de sopa industrial em série, como um produto de supermercado.', 3, 'Pop art: discute arte, consumo e cultura de massa.'),
      C('🐂', 'O bumba-meu-boi do Maranhão, com música, dança, teatro e bordados, conta a morte e a ressurreição do boi.', 2, 'Manifestação popular que une arte, festa e identidade de uma comunidade.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 3, itens: [
      { base: '<p>Em 1928, Tarsila do Amaral pintou o <i>Abaporu</i> (em tupi, “homem que come gente”): uma figura de pés e mãos enormes e cabeça minúscula, sentada ao lado de um cacto, sob um sol forte. A tela inspirou o Manifesto Antropófago, de Oswald de Andrade.</p>',
        enun: 'A proposta antropofágica associada ao <i>Abaporu</i> defendia',
        alts: ['“devorar” as influências estrangeiras e transformá-las numa arte genuinamente brasileira.', 'copiar fielmente as vanguardas europeias.', 'rejeitar qualquer contato com a cultura de outros países.', 'retomar os padrões acadêmicos de beleza do século XIX.', 'representar o corpo humano com proporções realistas.'],
        e: 'Antropofagia cultural: absorver o estrangeiro e misturar com o nacional (indígena, popular) para criar algo novo.' },
      { base: '<p>Em 1917, após visitar a exposição de Anita Malfatti, com cores fortes e figuras deformadas, Monteiro Lobato escreveu o artigo “Paranoia ou mistificação?”, comparando aquelas obras a desenhos de internos de manicômio.</p>',
        enun: 'A reação de Monteiro Lobato revela',
        alts: ['a resistência de parte da elite cultural às inovações estéticas das vanguardas.', 'o apoio dos críticos da época à arte moderna.', 'que Anita Malfatti pintava de acordo com a tradição acadêmica.', 'a valorização da loucura como tema artístico.', 'o fim do Modernismo no Brasil.'],
        e: 'O episódio mostra o preconceito contra o novo (H13) e virou estopim da Semana de 22.' },
      { base: '<p>A Vênus de Willendorf, estatueta de cerca de 25 mil anos, tem quadris e seios volumosos. Já as revistas do século XXI mostram, em geral, corpos magros e retocados por aplicativos.</p>',
        enun: 'A comparação entre as duas representações do corpo feminino mostra que',
        alts: ['os padrões de beleza são construções culturais que mudam com o tempo.', 'existe um padrão universal e eterno de beleza.', 'a arte pré-histórica não tinha valor estético.', 'o corpo magro sempre foi o ideal de beleza.', 'as revistas representam a diversidade real dos corpos.'],
        e: 'H13: a arte revela padrões de beleza de cada cultura e época, e também os preconceitos ligados a eles.' },
      { base: '<p>Durante muito tempo, o grafite foi tratado como vandalismo. Hoje, artistas como Os Gêmeos e Eduardo Kobra expõem em museus internacionais, e cidades criam festivais de arte urbana.</p>',
        enun: 'A mudança na forma de ver o grafite indica que',
        alts: ['a legitimação de uma prática artística depende de valores sociais que se transformam.', 'o grafite só se tornou arte quando saiu das ruas.', 'toda pichação é considerada arte de museu.', 'a arte urbana perdeu seu caráter crítico.', 'os museus deixaram de expor pintura tradicional.'],
        e: 'O que é considerado arte muda com a sociedade. O ENEM valoriza a diversidade de linguagens artísticas (H14).' },
      { base: '<p>O grafismo <i>Kusiwa</i>, usado pelos Wajãpi do Amapá na pintura corporal e em objetos, foi registrado como Patrimônio Imaterial pelo IPHAN e reconhecido pela UNESCO. Os desenhos representam elementos como a cobra, a borboleta e o peixe.</p>',
        enun: 'O reconhecimento do <i>Kusiwa</i> como patrimônio',
        alts: ['valoriza a arte indígena como expressão de conhecimentos e da identidade de um povo.', 'transforma a pintura corporal em produto para turistas.', 'mostra que a arte indígena é inferior à arte europeia.', 'proíbe os Wajãpi de modificar seus desenhos.', 'indica que os grafismos são apenas decorativos.'],
        e: 'H14: a diversidade artística dos grupos étnicos tem valor próprio; o grafismo carrega saberes e visão de mundo.' }
    ] }
  ]
};
