const B = ['Sedução', 'Comoção', 'Intimidação', 'Chantagem', 'Autoridade'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
// cartaz desenhado: fundo, emoji grande, título e subtítulo
const cartaz = (fundo, emo, titulo, sub, cor = '#1d2a1f') => `<svg viewBox="0 0 520 300" role="img" aria-label="${titulo.replace(/"/g, '')}">
  <rect x="4" y="4" width="512" height="292" rx="18" fill="${fundo}" stroke="#1d2a1f" stroke-width="4"/>
  <text x="96" y="190" text-anchor="middle" style="font-size:120px">${emo}</text>
  ${titulo.split('|').map((l, k) => `<text x="190" y="${70 + k * 40}" style="font:800 32px Fredoka,Lexend,sans-serif;fill:${cor}">${l}</text>`).join('')}
  ${sub.split('|').map((l, k) => `<text x="190" y="${200 + k * 24}" style="font:500 17px Lexend,sans-serif;fill:${cor}">${l}</text>`).join('')}
</svg>`;
const svg = `<svg viewBox="0 0 620 230" role="img" aria-label="Estratégias de convencimento">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:700 15px Lexend,sans-serif;fill:#1d2a1f}.s{font:500 12px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect class="c" x="8" y="10" width="190" height="100" rx="14" fill="#ffd1e6"/><text class="t" x="22" y="38">😍 Sedução</text><text class="s" x="22" y="62">promete prazer, beleza,</text><text class="s" x="22" y="80">sucesso, felicidade</text>
  <rect class="c" x="215" y="10" width="190" height="100" rx="14" fill="#c7e0ff"/><text class="t" x="229" y="38">🥺 Comoção</text><text class="s" x="229" y="62">toca na emoção, pena,</text><text class="s" x="229" y="80">solidariedade, culpa</text>
  <rect class="c" x="422" y="10" width="190" height="100" rx="14" fill="#ffd9c7"/><text class="t" x="436" y="38">😱 Intimidação</text><text class="s" x="436" y="62">medo das consequências:</text><text class="s" x="436" y="80">acidente, doença, morte</text>
  <rect class="c" x="110" y="122" width="190" height="100" rx="14" fill="#fff0b3"/><text class="t" x="124" y="150">🤝 Chantagem</text><text class="s" x="124" y="174">troca condicionada:</text><text class="s" x="124" y="192">“se não fizer, perde”</text>
  <rect class="c" x="318" y="122" width="190" height="100" rx="14" fill="#d8f5dc"/><text class="t" x="332" y="150">🥼 Autoridade</text><text class="s" x="332" y="174">especialista, famoso ou</text><text class="s" x="332" y="192">dado “garante” a ideia</text>
</svg>`;
module.exports = {
  id: 'ling-propaganda', arquivo: 'ling-propaganda.html', icone: '📢', titulo: 'Agência de propaganda',
  resumo: 'Você é o estrategista da agência: descubra se o anúncio usa sedução, comoção, intimidação, chantagem ou autoridade, e para quem ele foi feito.',
  desc: 'Você trabalha numa agência e precisa explicar ao cliente como cada peça convence. Identifique a estratégia, o objetivo e o público-alvo, olhando a linguagem verbal e a imagem.',
  habs: ['H21', 'H23', 'H24'],
  figura: svg,
  intro: 'Todo anúncio quer mudar um comportamento (comprar, votar, vacinar, doar). A pergunta do ENEM é sempre: <b>como</b> ele tenta convencer e <b>quem</b> ele quer convencer.',
  cola: `${svg}
    <p><b>Pistas do público-alvo:</b> vocabulário (gíria → jovens; termos técnicos → especialistas), imagens (criança, idoso, atleta), o veículo (revista de negócios, rede social) e o problema citado.</p>
    <p><b>Recursos verbais:</b> imperativo, vocativo, “você”, perguntas retóricas, trocadilhos, rima. <b>Recursos não verbais:</b> cores, imagem, tamanho da letra, rosto olhando para o leitor.</p>
    <p><b>Campanha × propaganda comercial:</b> campanha de utilidade pública quer mudar um hábito (não beber e dirigir); propaganda comercial quer vender. As duas usam função conativa.</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Peça', n: 6, pede: 'Qual estratégia de convencimento domina a peça?', baldes: B, itens: [
      C('🌴', '“Feche os olhos e sinta: areia branca, mar azul e você sem pressa nenhuma. Pacotes para o Caribe em 10 vezes.”', 0, 'Promete prazer e descanso, faz o leitor se imaginar lá: <b>sedução</b>.'),
      C('🚗', '“Bebeu e dirigiu? Você pode não voltar para casa.” (foto de carro destruído)', 2, 'Medo da morte e do acidente: <b>intimidação</b>.'),
      C('🐶', '“Ele esperou na chuva por um dono que nunca voltou. Adote. Ele ainda acredita em você.”', 1, 'Desperta pena e afeto pelo animal: <b>comoção</b>.'),
      C('📺', '“Só até meia-noite! Se não assinar hoje, você perde o desconto para sempre.”', 3, 'Condiciona: se não fizer, perde. É <b>chantagem</b> (com urgência).'),
      C('🦷', '“9 em cada 10 dentistas recomendam o creme dental Brilho.”', 4, 'Usa a voz de especialistas como garantia: <b>autoridade</b>.'),
      C('⚽', 'Um jogador famoso aparece segurando o tênis e diz: “É o que eu uso em campo.”', 4, 'Testemunho de celebridade: argumento de <b>autoridade</b> (ou testemunhal).'),
      C('🚭', 'Embalagem de cigarro com foto de pulmão doente: “Fumar causa câncer”.', 2, 'Imagem chocante e ameaça de doença: <b>intimidação</b>.'),
      C('💄', '“Batom Veludo: o olhar de todos vai seguir você.”', 0, 'Promete admiração e beleza: <b>sedução</b>.'),
      C('🧒', '“Com R$ 1 por dia você garante a merenda de uma criança que hoje só come na escola.”', 1, 'Mobiliza a solidariedade pelo sofrimento alheio: <b>comoção</b>.'),
      C('📱', '“Quem não tem o novo modelo está ficando para trás. Não seja o último.”', 3, 'Pressão: se você não comprar, será excluído. Chantagem emocional.'),
      C('🩺', '“A Sociedade Brasileira de Pediatria alerta: telas antes dos 2 anos atrapalham o desenvolvimento.”', 4, 'Uma instituição especializada dá peso ao argumento: <b>autoridade</b>.'),
      C('🦟', '“Um mosquito pode matar. Não deixe água parada.”', 2, 'Ameaça de morte para mudar um hábito: <b>intimidação</b>.')
    ] },
    { tipo: 'enem', rotulo: 'Peça', n: 4, itens: [
      { base: cartaz('#ffe7a8', '🛵', 'VAI ENTREGAR?|VAI DE CAPACETE.', 'Pressa não traz ninguém de volta.|Campanha de trânsito seguro.'),
        enun: 'Nessa campanha, a associação entre a imagem e o texto verbal tem como objetivo principal',
        alts: ['convencer entregadores a usar o capacete, alertando para o risco de morte no trânsito.', 'vender um modelo novo de capacete para motociclistas.', 'informar a quantidade de acidentes com motos no Brasil.', 'criticar as empresas de entrega por exigirem pressa.', 'divertir o leitor com um trocadilho sobre entregas.'],
        e: 'O público-alvo (entregadores) está na pergunta “Vai entregar?”. “Pressa não traz ninguém de volta” usa intimidação para mudar um comportamento.' },
      { base: cartaz('#d8f5dc', '👵', 'A VOVÓ JÁ|SE VACINOU.', 'E você, vai deixar ela esperando?|Campanha de vacinação.'),
        enun: 'A estratégia argumentativa da peça consiste em',
        alts: ['mobilizar o afeto pela família para despertar no leitor a responsabilidade de se vacinar.', 'apresentar dados técnicos sobre a eficácia da vacina.', 'ameaçar o leitor com multa caso não se vacine.', 'oferecer um prêmio em troca da vacinação.', 'usar a fala de um médico para dar credibilidade à campanha.'],
        e: 'A avó, o “deixar ela esperando”: apela ao sentimento e à culpa (comoção) para mudar um hábito.' },
      { base: cartaz('#c7e0ff', '🎮', 'LVL UP NA|SUA CARREIRA.', 'Curso de programação: sai do tutorial|e entra no jogo de verdade.'),
        enun: 'O vocabulário do anúncio indica que o público-alvo é formado principalmente por',
        alts: ['jovens familiarizados com a linguagem dos videogames.', 'idosos que querem voltar ao mercado de trabalho.', 'empresários que procuram contratar programadores.', 'professores de informática de escolas públicas.', 'pais preocupados com o tempo de tela dos filhos.'],
        e: '“LVL UP”, “tutorial”, “entra no jogo”: termos dos games. O público é jovem e gamer (H23).' },
      { base: '<p><b>Você sabia?</b> Um banho de 15 minutos gasta até 135 litros de água. Fechando o registro enquanto se ensaboa e saindo em 5 minutos, o gasto cai para cerca de 45 litros. <b>O planeta agradece. A sua conta também.</b></p>',
        enun: 'Para convencer o leitor a mudar de hábito, o texto combina',
        alts: ['um dado numérico com o apelo a benefícios coletivos e individuais.', 'uma ameaça de multa com a fala de uma autoridade.', 'a narrativa de uma tragédia com a promessa de prêmio.', 'termos técnicos de engenharia com humor.', 'uma crítica ao governo com um pedido de doação.'],
        e: 'Os dados (135 e 45 litros) informam; “o planeta agradece” (coletivo) e “a sua conta também” (individual) convencem.' },
      { base: '<p>“Crianças que leem 20 minutos por dia têm contato com cerca de 1,8 milhão de palavras por ano. Que tal começar hoje, na hora de dormir?”</p>', fonte: 'Folheto distribuído numa reunião de pais.',
        enun: 'O folheto se dirige a pais e mães e procura convencê-los a',
        alts: ['ler com os filhos, usando um dado impactante e uma sugestão prática.', 'comprar livros de uma editora específica.', 'trocar a escola dos filhos por uma melhor.', 'proibir as crianças de dormir tarde.', 'matricular os filhos em aulas particulares.'],
        e: 'O dado convence; a pergunta “Que tal começar hoje?” sugere a ação. Público e objetivo saem do contexto (reunião de pais).' }
    ] }
  ]
};
