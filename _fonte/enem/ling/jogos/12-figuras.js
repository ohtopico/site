const A = ['Metáfora', 'Comparação', 'Metonímia', 'Personificação'];
const B = ['Hipérbole', 'Ironia', 'Antítese', 'Eufemismo'];
const S = ['Aliteração', 'Assonância', 'Onomatopeia', 'Paradoxo'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const svg = `<svg viewBox="0 0 620 220" role="img" aria-label="Metáfora e comparação: com e sem o como">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:800 18px Fredoka,Lexend,sans-serif;fill:#1d2a1f}.s{font:500 13px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect width="620" height="220" rx="16" fill="#fffdf6"/>
  <rect class="c" x="16" y="16" width="285" height="188" rx="14" fill="#dcecff"/><text class="t" x="34" y="48">Comparação</text>
  <text x="70" y="110" style="font-size:44px">👧 = 🌹</text><text class="s" x="34" y="150">“Ela é bela COMO uma rosa.”</text><text class="s" x="34" y="176">tem o conectivo: como, feito, tal qual</text>
  <rect class="c" x="319" y="16" width="285" height="188" rx="14" fill="#ffd9e8"/><text class="t" x="337" y="48">Metáfora</text>
  <text x="400" y="110" style="font-size:44px">🌹</text><text class="s" x="337" y="150">“Ela é uma rosa.”</text><text class="s" x="337" y="176">comparação sem o “como”: identifica</text>
</svg>`;
module.exports = {
  id: 'ling-figuras', arquivo: 'ling-figuras.html', icone: '🎭', titulo: 'Caçador de figuras',
  resumo: 'Cace as figuras de linguagem: metáfora, metonímia, ironia, antítese, hipérbole, eufemismo, aliteração e outras, em poemas, canções e anúncios.',
  desc: 'As figuras de linguagem são recursos expressivos que constroem o sentido de poemas, canções, crônicas e anúncios. Identifique cada uma e entenda o efeito que ela produz.',
  habs: ['H1', 'H16', 'H18'],
  figura: svg,
  intro: 'O ENEM quase nunca pede só o nome da figura: pede o <b>efeito de sentido</b> (ênfase, humor, crítica, musicalidade, suavizar uma ideia). Mas sem reconhecer a figura, não dá para achar o efeito.',
  cola: `${svg}
    <table><tr><th>Figura</th><th>O que é</th><th>Exemplo</th></tr>
    <tr><td>Metáfora</td><td>comparação implícita</td><td>“Meu coração é um balde despejado.”</td></tr>
    <tr><td>Comparação</td><td>com conectivo (como, feito)</td><td>“Dormiu como uma pedra.”</td></tr>
    <tr><td>Metonímia</td><td>troca por proximidade (autor pela obra, marca pelo produto, parte pelo todo)</td><td>“Li Machado.” “Tomei um Danone.”</td></tr>
    <tr><td>Personificação</td><td>dá traços humanos a seres não humanos</td><td>“O vento sussurrava segredos.”</td></tr>
    <tr><td>Hipérbole</td><td>exagero</td><td>“Já te falei um milhão de vezes.”</td></tr>
    <tr><td>Ironia</td><td>diz o contrário do que pensa</td><td>“Que lindo, tirou zero!”</td></tr>
    <tr><td>Antítese</td><td>ideias opostas lado a lado</td><td>“Nasce o sol e não dura mais que um dia.”</td></tr>
    <tr><td>Paradoxo</td><td>opostos que se fundem numa ideia aparentemente absurda</td><td>“Amor é fogo que arde sem se ver.” (Camões)</td></tr>
    <tr><td>Eufemismo</td><td>suaviza</td><td>“Ele partiu desta para melhor.”</td></tr>
    <tr><td>Aliteração</td><td>repetição de consoante</td><td>“O rato roeu a roupa do rei de Roma.”</td></tr>
    <tr><td>Assonância</td><td>repetição de vogal</td><td>“Sou um mulato nato…”</td></tr>
    <tr><td>Onomatopeia</td><td>imita sons</td><td>“Tique-taque”, “Cof, cof”.</td></tr></table>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Figura', n: 4, pede: 'Que figura de linguagem aparece aqui?', baldes: A, itens: [
      C('🪨', '“Depois da prova, dormi como uma pedra.”', 1, 'Tem o “como”: <b>comparação</b>.'),
      C('🌊', '“A vida é um rio que corre sem volta.”', 0, 'Vida = rio, sem conectivo: <b>metáfora</b>.'),
      C('📚', '“Estou lendo Machado de Assis nas férias.”', 2, 'O autor no lugar da obra: <b>metonímia</b>.'),
      C('🍃', '“As árvores choravam a partida do outono.”', 3, 'Árvores com ação humana (chorar): <b>personificação</b> (prosopopeia).'),
      C('🥤', '“Me vê uma Coca bem gelada!”', 2, 'A marca no lugar do produto (refrigerante de cola): <b>metonímia</b>.'),
      C('🦁', '“Aquele zagueiro é um leão em campo.”', 0, 'Zagueiro = leão (força, coragem), sem “como”: <b>metáfora</b>.'),
      C('🌙', '“A lua, curiosa, espiava pela janela.”', 3, 'Lua curiosa que espia: <b>personificação</b>.'),
      C('🏠', '“O Brasil inteiro parou para ver a final.”', 2, '“O Brasil” no lugar dos brasileiros (lugar pelos habitantes): <b>metonímia</b>.'),
      C('🐝', '“Ela trabalha feito uma formiga.”', 1, '“Feito” é conectivo de comparação: <b>comparação</b>.'),
      C('🍷', '“Bebeu dois copos e foi embora.”', 2, 'O recipiente (copo) no lugar do conteúdo: <b>metonímia</b>.')
    ] },
    { tipo: 'classificar', rotulo: 'Figura', n: 3, pede: 'Que figura de linguagem aparece aqui?', baldes: B, itens: [
      C('📢', '“Estou morrendo de fome, comeria um boi inteiro!”', 0, 'Exagero proposital: <b>hipérbole</b>.'),
      C('🙃', 'Depois de o time perder de 7 a 1: “Que atuação brilhante, hein!”', 1, 'Diz o contrário do que pensa: <b>ironia</b>.'),
      C('☯️', '“Riso e choro, alegria e dor: tudo cabia naquela tarde.”', 2, 'Ideias opostas lado a lado: <b>antítese</b>.'),
      C('🕊️', '“Seu avô descansou ontem à noite.”', 3, '“Descansou” suaviza “morreu”: <b>eufemismo</b>.'),
      C('😤', '“Já te liguei mil vezes hoje!”', 0, '“Mil vezes” é exagero: <b>hipérbole</b>.'),
      C('🏛️', '“O político faltou com a verdade.”', 3, 'Suaviza “mentiu”: <b>eufemismo</b>.'),
      C('🌗', '“Onde uns veem o fim, outros veem o começo.”', 2, 'Fim × começo: <b>antítese</b>.'),
      C('🐌', 'Ao ver o ônibus 40 minutos atrasado: “Nossa, que pontualidade!”', 1, 'Elogio que é crítica: <b>ironia</b>.')
    ] },
    { tipo: 'classificar', rotulo: 'Figura', n: 2, pede: 'Que figura de linguagem aparece aqui?', baldes: S, itens: [
      C('🎻', '“Vozes veladas, veludosas vozes, / volúpias dos violões” (Cruz e Sousa)', 0, 'Repetição do som consonantal V: <b>aliteração</b>.'),
      C('🔔', '“Blém, blém, blém, tocava o sino da matriz.”', 2, 'Imita o som do sino: <b>onomatopeia</b>.'),
      C('🔥', '“Amor é fogo que arde sem se ver; / é ferida que dói, e não se sente” (Camões)', 3, 'Fogo que arde sem se ver, ferida que dói e não se sente: opostos fundidos, <b>paradoxo</b>.'),
      C('🎵', '“Sou Ana, da cama, da cana, fulana, bacana” — repetição do som “a”.', 1, 'Repetição de vogal: <b>assonância</b>.'),
      C('🐱', '“Miau! — reclamou o gato, de barriga vazia.”', 2, 'Imita a voz do animal: <b>onomatopeia</b>.'),
      C('🌑', '“Estou cego de tanto ver, mudo de tanto falar.”', 3, 'Ideias que se contradizem e criam um sentido novo: <b>paradoxo</b>.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 2, itens: [
      { base: '<p class="verso">Amor é fogo que arde sem se ver;\né ferida que dói, e não se sente;\né um contentamento descontente;\né dor que desatina sem doer.</p>', fonte: 'Luís de Camões.',
        enun: 'Para definir o amor, o poeta recorre principalmente a',
        alts: ['paradoxos, que expressam o caráter contraditório do sentimento amoroso.', 'onomatopeias, que reproduzem os sons do amor.', 'eufemismos, que suavizam a dor da paixão.', 'comparações explícitas com elementos da natureza.', 'ironias, que ridicularizam quem se apaixona.'],
        e: '“Contentamento descontente”, “dor que desatina sem doer”: opostos fundidos. O amor é contraditório (H16).' },
      { base: '<p>Anúncio de uma marca de colchões: “Durma nas nuvens.”</p>',
        enun: 'O efeito persuasivo do anúncio se apoia em uma',
        alts: ['metáfora, que associa o colchão à leveza e ao conforto das nuvens.', 'onomatopeia, que imita o som do sono.', 'antítese, que opõe o sono à vigília.', 'metonímia, que troca o colchão pela marca.', 'ironia, que critica quem dorme demais.'],
        e: 'Dormir “nas nuvens” = macio, leve, confortável. A metáfora seduz o consumidor (H1).' },
      { base: '<p>“Ele não era exatamente pobre: era um rico que ainda não tinha dinheiro”, brincou o cronista sobre o amigo sonhador.</p>',
        enun: 'O humor da frase do cronista se constrói por meio de',
        alts: ['um paradoxo e de um eufemismo, que suavizam a pobreza do amigo.', 'uma onomatopeia que imita a risada.', 'uma comparação explícita com o uso de “como”.', 'uma aliteração com o som do R.', 'uma hipérbole que exagera a riqueza.'],
        e: '“Rico sem dinheiro” é paradoxal e, ao mesmo tempo, um jeito suave (eufemismo) de dizer que ele é pobre.' },
      { base: '<p>Na crônica, o autor conta que a cidade “acordou mal-humorada”: os carros buzinavam, os semáforos “piscavam com preguiça” e os prédios “pareciam espreguiçar-se na neblina”.</p>',
        enun: 'Ao descrever a cidade, o cronista usa a personificação para',
        alts: ['atribuir à cidade comportamentos humanos, tornando a descrição mais expressiva.', 'informar com objetividade as condições do trânsito.', 'criticar a falta de semáforos na cidade.', 'imitar os sons das buzinas.', 'suavizar uma notícia trágica.'],
        e: 'Cidade mal-humorada, semáforos com preguiça, prédios se espreguiçando: tudo humanizado (H18).' }
    ] }
  ]
};
