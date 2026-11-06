const F = ['Referencial', 'Emotiva', 'Conativa (apelativa)', 'Fática', 'Metalinguística', 'Poética'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const svg = `<svg viewBox="0 0 620 300" role="img" aria-label="Esquema de Jakobson: cada elemento da comunicação tem uma função">
  <style>.b{fill:#fff6dd;stroke:#1d2a1f;stroke-width:2.5}.t{font:600 15px Lexend,sans-serif;fill:#1d2a1f}.f{font:600 13px Lexend,sans-serif;fill:#6b3fb8}.s{stroke:#1d2a1f;stroke-width:2.5;fill:none;marker-end:url(#m)}</style>
  <defs><marker id="m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#1d2a1f"/></marker></defs>
  <rect class="b" x="20" y="120" width="150" height="56" rx="12"/><text class="t" x="95" y="145" text-anchor="middle">🗣️ Emissor</text><text class="f" x="95" y="165" text-anchor="middle">EMOTIVA (eu)</text>
  <rect class="b" x="235" y="120" width="150" height="56" rx="12"/><text class="t" x="310" y="145" text-anchor="middle">✉️ Mensagem</text><text class="f" x="310" y="165" text-anchor="middle">POÉTICA (forma)</text>
  <rect class="b" x="450" y="120" width="150" height="56" rx="12"/><text class="t" x="525" y="145" text-anchor="middle">👂 Receptor</text><text class="f" x="525" y="165" text-anchor="middle">CONATIVA (você)</text>
  <path class="s" d="M170 148H233"/><path class="s" d="M385 148H448"/>
  <rect class="b" x="235" y="20" width="150" height="56" rx="12"/><text class="t" x="310" y="45" text-anchor="middle">🌍 Referente</text><text class="f" x="310" y="65" text-anchor="middle">REFERENCIAL (ele)</text>
  <rect class="b" x="110" y="225" width="170" height="56" rx="12"/><text class="t" x="195" y="250" text-anchor="middle">📞 Canal</text><text class="f" x="195" y="270" text-anchor="middle">FÁTICA (contato)</text>
  <rect class="b" x="340" y="225" width="170" height="56" rx="12"/><text class="t" x="425" y="250" text-anchor="middle">📖 Código</text><text class="f" x="425" y="270" text-anchor="middle">METALINGUÍSTICA</text>
  <path d="M310 78V118M250 178L215 223M370 178L405 223" stroke="#1d2a1f" stroke-width="2" stroke-dasharray="5 4"/>
</svg>`;
module.exports = {
  id: 'ling-funcoes', arquivo: 'ling-funcoes.html', icone: '📻', titulo: 'Rádio das funções',
  resumo: 'Sintonize a função da linguagem que domina cada texto: referencial, emotiva, conativa, fática, metalinguística ou poética.',
  desc: 'Cada texto “toca” numa frequência. Descubra qual função da linguagem predomina, olhando para qual elemento da comunicação ele está virado. No fim, questões no estilo da prova.',
  habs: ['H1', 'H18', 'H19'],
  figura: svg,
  intro: 'Toda comunicação tem seis elementos. A função da linguagem é o elemento para onde o texto está virado. Olhe o esquema e comece a sintonizar.',
  cola: `
    <p>O ENEM pergunta a função <b>predominante</b>: um texto pode ter várias, mas uma manda. Pergunte “para onde o texto está virado?”.</p>
    <table><tr><th>Função</th><th>Foco</th><th>Pistas</th><th>Onde aparece</th></tr>
    <tr><td>Referencial</td><td>o assunto</td><td>3ª pessoa, dados, objetividade</td><td>notícia, verbete, texto científico</td></tr>
    <tr><td>Emotiva</td><td>o emissor</td><td>1ª pessoa, exclamações, opinião, sentimento</td><td>diário, carta pessoal, depoimento</td></tr>
    <tr><td>Conativa</td><td>o receptor</td><td>imperativo, vocativo, 2ª pessoa (você)</td><td>propaganda, campanha, sermão</td></tr>
    <tr><td>Fática</td><td>o canal</td><td>testar o contato: “alô?”, “tá me ouvindo?”, “né?”</td><td>cumprimentos, telefonemas, “oi, sumida”</td></tr>
    <tr><td>Metalinguística</td><td>o código</td><td>linguagem explicando a própria linguagem</td><td>dicionário, gramática, poema sobre poema, filme sobre cinema</td></tr>
    <tr><td>Poética</td><td>a forma da mensagem</td><td>ritmo, rima, sonoridade, jogo de palavras</td><td>poema, slogan criativo, trava-língua</td></tr></table>
    <p><b>Pegadinha clássica:</b> poema que fala do ato de escrever poemas é <b>metalinguístico</b>, mesmo tendo rima. Propaganda cheia de rima pode ser <b>conativa</b>: o objetivo é convencer você.</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Sintonia', n: 7, pede: 'Qual função da linguagem predomina?', baldes: F, itens: [
      C('📰', '“O IBGE divulgou nesta terça que a população brasileira chegou a 203 milhões de habitantes, segundo o Censo.”', 0, 'Informação objetiva sobre um assunto, em 3ª pessoa, sem opinião: foco no <b>referente</b>.'),
      C('📔', '“Ah, que saudade eu sinto daquelas tardes na casa da vó! Até hoje me dá um aperto no peito.”', 1, '1ª pessoa, exclamação e sentimento de quem fala: foco no <b>emissor</b>.'),
      C('📣', '“Vacine seu filho. Não deixe a paralisia infantil voltar!”', 2, 'Imperativo (vacine, não deixe) dirigido a você: quer mudar o comportamento do <b>receptor</b>.'),
      C('📞', '“Alô? Alô? Tá me ouvindo? A ligação tá cortando…”', 3, 'A pessoa só testa se o canal está funcionando: função <b>fática</b>.'),
      C('📖', '“Saudade (substantivo feminino): sentimento de falta de alguém ou de algo distante.”', 4, 'É um verbete: a língua explicando uma palavra da própria língua (o <b>código</b>).'),
      C('🎶', '“O rato roeu a roupa do rei de Roma.”', 5, 'O que importa é o som repetido do R (aliteração): foco na <b>forma da mensagem</b>.'),
      C('✍️', '“Lutar com palavras / é a luta mais vã” — poema que fala da dificuldade de escrever poemas.', 4, 'Poema sobre o próprio fazer poético é <b>metalinguagem</b>. A forma poética está lá, mas o tema é a linguagem.'),
      C('🎬', 'Um filme cujo enredo mostra os bastidores da gravação de um filme.', 4, 'Cinema falando de cinema: metalinguagem não é só verbal.'),
      C('🧴', '“Você merece pele de bebê. Experimente hoje!”', 2, 'Vocativo implícito, “você” e imperativo: típico da publicidade, função <b>conativa</b>.'),
      C('💬', '“Oi, sumida! Tudo bem? Pois é, né… a gente se fala.”', 3, 'Conversa que só mantém o contato aberto, sem informação nova: <b>fática</b>.'),
      C('🧪', '“A água entra em ebulição a 100 °C ao nível do mar.”', 0, 'Dado objetivo sobre o mundo: <b>referencial</b>.'),
      C('😭', '“Hoje eu acordei sem vontade de nada. Estou exausta e ninguém entende.”', 1, 'Expressão do estado emocional de quem fala: <b>emotiva</b>.'),
      C('🌊', '“Bandeira branca, amor… / quero paz, quero paz” — o refrão repete sons e ritmo marcados.', 5, 'Repetição, ritmo e musicalidade: a <b>forma</b> chama a atenção.'),
      C('📚', '“O sujeito é o termo da oração sobre o qual se declara algo.”', 4, 'Gramática explicando a língua: <b>metalinguística</b>.'),
      C('🙏', '“Doe sangue. Um gesto seu salva até quatro vidas.”', 2, 'Apelo direto ao leitor com imperativo: <b>conativa</b>.'),
      C('🍃', '“Vozes veladas, veludosas vozes, / volúpias dos violões, vozes veladas” (Cruz e Sousa)', 5, 'Aliteração do V imitando o som do violão: a sonoridade é o centro, função <b>poética</b>.'),
      C('🎙️', '“Testando, um, dois, três… o som tá chegando aí no fundo?”', 3, 'Teste do canal: <b>fática</b>.'),
      C('🗞️', '“A enchente atingiu 400 municípios gaúchos em maio de 2024, segundo a Defesa Civil.”', 0, 'Fato com dados e fonte: <b>referencial</b>.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 3, itens: [
      { base: '<p class="verso">Catar feijão se limita com escrever:\njogam-se os grãos na água do alguidar\ne as palavras na folha de papel;\ne depois, joga-se fora o que boiar.</p>', fonte: 'João Cabral de Melo Neto, “Catar feijão” (trecho).',
        enun: 'No texto, a comparação entre catar feijão e escrever evidencia o predomínio da função',
        alts: ['metalinguística, porque o poema reflete sobre o próprio processo de escrita.', 'referencial, porque o poema ensina como se cata feijão.', 'conativa, porque o poema ordena que o leitor jogue fora os grãos.', 'fática, porque o poema testa o contato com o leitor.', 'emotiva, porque o poema expressa a tristeza do eu lírico.'],
        e: 'O assunto do poema é <b>como escrever</b>: a linguagem falando dela mesma. O feijão é só a imagem para explicar a escrita.' },
      { base: '<p><b>NÃO ESPERE O MOSQUITO VOLTAR.</b></p><p>Tire a água dos pratinhos, tampe a caixa-d’água e chame seus vizinhos. Dez minutos por semana contra a dengue.</p>', fonte: 'Campanha de saúde pública (texto adaptado).',
        enun: 'Nessa campanha, a função da linguagem predominante e um recurso que a comprova são, respectivamente,',
        alts: ['conativa, com o uso de verbos no imperativo dirigidos ao leitor.', 'referencial, com dados científicos sobre o mosquito.', 'emotiva, com o relato pessoal do autor sobre a dengue.', 'poética, com rimas que dão musicalidade ao texto.', 'fática, com expressões que testam o canal de comunicação.'],
        e: 'Tire, tampe, chame, não espere: imperativos para mudar o comportamento do leitor. Isso é função <b>conativa</b>.' },
      { base: '<p>— Alô, Joana? É a Marta. Tá me escutando? Tá ruim aqui… oi? Agora sim. Então, como eu ia dizendo…</p>',
        enun: 'Nas falas iniciais, a personagem usa expressões cuja função é principalmente',
        alts: ['verificar e manter o contato pelo canal de comunicação.', 'explicar o significado das palavras usadas na conversa.', 'convencer a interlocutora a mudar de opinião.', 'informar com objetividade um fato ocorrido.', 'chamar atenção para a sonoridade das palavras.'],
        e: '“Tá me escutando?”, “oi?”, “agora sim”: tudo serve para checar o canal. Função <b>fática</b>.' },
      { base: '<p>“Eu não sei o que é pior: a saudade ou a certeza de que ela vai passar. Escrevo porque, se não escrever, transbordo.”</p>', fonte: 'Trecho de diário.',
        enun: 'O trecho privilegia a função emotiva porque',
        alts: ['centra-se nos sentimentos e na subjetividade de quem escreve.', 'apresenta informações verificáveis sobre a saudade.', 'dirige ordens ao leitor para que deixe de sentir saudade.', 'define o termo “saudade” como faria um dicionário.', 'tem como objetivo testar se o leitor está atento.'],
        e: 'Primeira pessoa (eu, escrevo) e o mundo interior de quem fala: <b>emotiva</b>.' },
      { base: '<p><b>Nunca foi tão fácil ser feliz.</b> Crédito aprovado na hora, sem burocracia. Você sonha, a gente realiza.</p>', fonte: 'Anúncio de banco (texto adaptado).',
        enun: 'O anúncio busca convencer o consumidor principalmente ao',
        alts: ['interpelar o leitor e associar o produto à realização de seus desejos.', 'expor dados técnicos e taxas de juros do empréstimo.', 'fazer uma reflexão sobre o significado da palavra “crédito”.', 'narrar a história pessoal do presidente do banco.', 'manter o canal aberto com expressões de cumprimento.'],
        e: '“Você sonha, a gente realiza”: fala com o leitor e promete felicidade. Conativa, com estratégia de sedução.' }
    ] }
  ]
};
