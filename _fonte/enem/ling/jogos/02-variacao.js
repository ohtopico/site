const B = ['Regional (lugar)', 'Social (grupo)', 'Histórica (tempo)', 'Situacional (registro)'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const svg = `<svg viewBox="0 0 620 330" role="img" aria-label="Os quatro tipos de variação linguística">
  <style>.q{stroke:#1d2a1f;stroke-width:2.5}.t{font:700 17px Lexend,sans-serif;fill:#1d2a1f}.s{font:500 13px Lexend,sans-serif;fill:#3b3b3b}.x{font:600 13px Lexend,sans-serif;fill:#6b3fb8}</style>
  <rect class="q" x="10" y="10" width="295" height="150" rx="16" fill="#a8e6b8"/><text class="t" x="28" y="42">🗺️ Regional · diatópica</text>
  <text class="s" x="28" y="68">Muda com o LUGAR.</text><text class="x" x="28" y="96">“bah, tchê” (RS) · “oxente” (NE)</text><text class="x" x="28" y="120">mandioca = aipim = macaxeira</text><text class="x" x="28" y="144">“tu vai” no Sul · R caipira</text>
  <rect class="q" x="315" y="10" width="295" height="150" rx="16" fill="#ffd58a"/><text class="t" x="333" y="42">👥 Social · diastrática</text>
  <text class="s" x="333" y="68">Muda com o GRUPO social.</text><text class="x" x="333" y="96">gíria jovem: “mó brisa”, “cringe”</text><text class="x" x="333" y="120">jargão: “paciente evoluiu bem”</text><text class="x" x="333" y="144">escolaridade: “nós vai”, “as casa”</text>
  <rect class="q" x="10" y="170" width="295" height="150" rx="16" fill="#a8d8f7"/><text class="t" x="28" y="202">⏳ Histórica · diacrônica</text>
  <text class="s" x="28" y="228">Muda com o TEMPO.</text><text class="x" x="28" y="256">vossa mercê → vosmecê → você → cê</text><text class="x" x="28" y="280">“pharmacia”, “chauffeur”, “supimpa”</text><text class="x" x="28" y="304">“broto”, “brotinho” (anos 60)</text>
  <rect class="q" x="315" y="170" width="295" height="150" rx="16" fill="#f7a8c4"/><text class="t" x="333" y="202">👔 Situacional · diafásica</text>
  <text class="s" x="333" y="228">Muda com a SITUAÇÃO (registro).</text><text class="x" x="333" y="256">entrevista de emprego × churrasco</text><text class="x" x="333" y="280">“Prezado senhor” × “E aí, mano”</text><text class="x" x="333" y="304">formal ⟷ informal</text>
</svg>`;
module.exports = {
  id: 'ling-variacao', arquivo: 'ling-variacao.html', icone: '🗺️', titulo: 'Mapa da variação',
  resumo: 'Lugar, grupo, tempo ou situação? Classifique as marcas de variação linguística e ache a palavra que denuncia cada uma.',
  desc: 'Toda língua varia, e o ENEM adora isso. Descubra se a marca é regional, social, histórica ou de registro, encontre a palavra que denuncia a variação e lembre: não existe “erro”, existe adequação.',
  habs: ['H20', 'H25', 'H26', 'H27'],
  figura: svg,
  intro: 'São quatro tipos de variação. Para o ENEM, a ideia central é: variação não é erro. O que existe é uso <b>adequado</b> ou <b>inadequado</b> à situação, e o preconceito linguístico é que é o problema.',
  cola: `${svg}
    <p><b>Adequação, não correção:</b> a norma-padrão é a variedade de prestígio, exigida em situações formais (redação do ENEM, documento oficial). Fora delas, outras variedades são legítimas.</p>
    <p><b>Preconceito linguístico</b> (Marcos Bagno): julgar uma pessoa como inferior pelo jeito que ela fala. O ENEM sempre fica do lado de quem combate esse preconceito.</p>
    <p><b>Patrimônio linguístico:</b> palavras de origem indígena (tupi: abacaxi, capivara, Ipanema, pipoca) e africana (banto e iorubá: caçula, cafuné, moleque, quitute, samba) mostram a história do povo brasileiro na língua. Línguas indígenas vivas também são patrimônio.</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Marca', n: 6, pede: 'Que tipo de variação aparece aqui?', baldes: B, itens: [
      C('🧉', 'Um gaúcho diz: “Bah, tchê, que frio! Tu vai querer um chimarrão?”', 0, '“Bah”, “tchê” e “tu vai” são marcas do falar do Sul. Variação <b>regional</b>.'),
      C('🌵', '“Oxente, menino, deixa de arrumar confusão!”', 0, '“Oxente” é marca do Nordeste: <b>regional</b>.'),
      C('🥔', 'A mesma raiz se chama mandioca em São Paulo, aipim no Rio e no Sul e macaxeira no Nordeste.', 0, 'Mesma coisa, nomes diferentes conforme o lugar: <b>regional</b>.'),
      C('🛹', '“Mano, o rolê de ontem foi mó brisa, tá ligado?”', 1, 'Gíria de um grupo (jovens): variação <b>social</b>.'),
      C('🩺', '“O paciente evoluiu com quadro de dispneia e foi encaminhado à UTI.”', 1, 'Jargão profissional da medicina: a variação ligada a um grupo é <b>social</b>.'),
      C('📜', '“Vossa mercê” virou “vosmecê”, depois “você” e hoje é “cê” na fala.', 2, 'Mudança ao longo dos séculos: <b>histórica</b>.'),
      C('💊', 'Uma placa antiga numa fachada: “PHARMACIA CENTRAL”.', 2, 'Grafia com PH, anterior às reformas ortográficas do século XX: <b>histórica</b>.'),
      C('📻', 'Um anúncio dos anos 1950: “Este broto é supimpa! Que pão!”', 2, 'Gírias de outra época (broto, supimpa, pão = bonito): <b>histórica</b>.'),
      C('💼', 'Num e-mail ao diretor: “Prezado senhor, venho por meio deste solicitar…”. No WhatsApp com a irmã: “e aí, bora?”', 3, 'A mesma pessoa muda o registro conforme a situação: <b>situacional</b> (diafásica).'),
      C('⚖️', 'Num tribunal, o advogado diz “Excelentíssimo juiz”; no bar com os amigos, “pô, cara”.', 3, 'Formal × informal na mesma pessoa: <b>situacional</b>.'),
      C('🎮', '“Ele deu ragequit depois de levar um gank no meio do farm.”', 1, 'Vocabulário de gamers, um grupo social: <b>social</b>.'),
      C('🤠', 'Um falante do interior paulista pronuncia o R de “porta” enrolado, o famoso R caipira.', 0, 'Pronúncia típica de uma região: <b>regional</b>.'),
      C('🎤', 'Numa palestra o professor diz “Gostaria de agradecer a presença”; na sala, com a turma, “gente, valeu por virem”.', 3, 'Muda a situação, muda o registro: <b>situacional</b>.'),
      C('🖋️', 'Num texto do século XIX: “Mui digno senhor, sou de V. Sa. criado e obrigado.”', 2, 'Fórmulas de tratamento que caíram em desuso: <b>histórica</b>.')
    ] },
    { tipo: 'achar', rotulo: 'Marca', n: 3, itens: [
      { pede: 'Toque na expressão que é marca de variação regional.', texto: 'Quando cheguei em Porto Alegre, o guri me olhou e disse: “[[Bah]], que calor hoje!”', e: '“Bah” é uma interjeição típica do Rio Grande do Sul. (“Guri” também é do Sul.)' },
      { pede: 'Toque na palavra que marca a variação histórica.', texto: 'No baile de 1960, ela disse ao rapaz: “Que [[supimpa]] essa música nova!”', e: '“Supimpa” (ótimo, excelente) é gíria antiga, que quase ninguém usa hoje.' },
      { pede: 'Toque na palavra que marca a variação social (jargão de um grupo).', texto: 'O técnico explicou ao cliente que o computador estava lento porque o [[HD]] estava quase cheio.', e: '“HD” é jargão da informática: pertence a um grupo profissional.' },
      { pede: 'Toque na palavra que marca o registro informal da conversa.', texto: 'Na reunião de família, a tia gritou da cozinha: “[[Bora]] comer, gente, que a comida esfria!”', e: '“Bora” (vamos embora) é marca de registro informal, de situação descontraída.' },
      { pede: 'Toque na palavra de origem tupi, patrimônio linguístico indígena.', texto: 'Depois da praia, comemos {{pão de queijo}}, tomamos suco de [[abacaxi]] e voltamos para casa.', e: '“Abacaxi” vem do tupi (ibá + cati: fruta cheirosa). Palavras indígenas e africanas guardam a memória do povo brasileiro.' },
      { pede: 'Toque na palavra de origem africana (banto) que entrou no português do Brasil.', texto: 'A avó fazia [[cafuné]] no neto enquanto contava histórias da roça.', e: '“Cafuné” vem do quimbundo, língua banto de Angola. É patrimônio linguístico afro-brasileiro.' }
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 3, itens: [
      { base: '<p>Seu Zé, pedreiro, explicou ao engenheiro: “Nós vai precisar de mais dois saco de cimento pra terminar a laje”. O engenheiro entendeu na hora e mandou comprar o material.</p>',
        enun: 'Considerando a situação de comunicação, a fala de Seu Zé',
        alts: ['cumpriu sua finalidade, pois foi compreendida, mesmo sem seguir a concordância da norma-padrão.', 'é um erro grave, pois impediu a comunicação entre os dois.', 'deveria ser corrigida pelo engenheiro para que a obra continuasse.', 'mostra que só a norma-padrão permite comunicação eficiente.', 'é típica da variação histórica, pois ninguém mais fala assim.'],
        e: 'O ENEM valoriza a <b>adequação</b>: a mensagem chegou ao interlocutor. Chamar isso de “erro grave” seria preconceito linguístico.' },
      { base: '<p><b>Candidato</b>, em entrevista de emprego: “E aí, firmeza? Então, tipo, eu manjo muito de planilha, saca?”</p>',
        enun: 'O problema da fala do candidato está relacionado',
        alts: ['à inadequação do registro informal a uma situação formal.', 'ao uso de uma variedade regional desconhecida.', 'à falta de informações sobre sua experiência.', 'ao emprego de palavras arcaicas.', 'à presença de termos técnicos de informática.'],
        e: 'Gírias não são erradas, mas a entrevista pede registro mais <b>formal</b>. Variação <b>situacional</b>.' },
      { base: '<p>Muitas palavras do nosso dia a dia, como <i>pipoca</i>, <i>capivara</i>, <i>Ipanema</i>, <i>caçula</i>, <i>moleque</i> e <i>quitute</i>, vieram de línguas indígenas e africanas. Ao estudar sua origem, conhecemos também a história de quem as falava.</p>',
        enun: 'O texto destaca que o vocabulário de origem indígena e africana',
        alts: ['é parte do patrimônio linguístico e preserva a memória da formação do povo brasileiro.', 'deve ser substituído por palavras de origem portuguesa na escrita formal.', 'pertence apenas à fala de comunidades isoladas.', 'mostra que o português do Brasil é uma língua sem regras.', 'é exemplo de variação situacional, usada só em contextos informais.'],
        e: 'É a H20: a língua guarda a história. Tupi (pipoca, capivara, Ipanema) e banto (caçula, moleque, quitute).' },
      { base: '<p>— Mãe, cê viu meu fone?<br>— Tá em cima da mesa, fio.</p><p>A mesma mãe, no trabalho, ao telefone: “Bom dia, senhor. Em que posso ajudá-lo?”</p>',
        enun: 'A diferença entre as falas da mãe ilustra',
        alts: ['a capacidade do falante de adequar o registro a cada situação comunicativa.', 'a perda de prestígio da norma-padrão nas famílias brasileiras.', 'a variação histórica, pois ela fala de modos de épocas diferentes.', 'o desconhecimento da norma-padrão em casa.', 'a variação regional entre duas cidades.'],
        e: 'Mesma falante, situações diferentes, registros diferentes: variação <b>situacional</b>.' },
      { base: '<p>“A língua que falamos não é um bloco uniforme. Considerar ‘errado’ tudo o que foge da gramática normativa é ignorar como as línguas funcionam e, muitas vezes, discriminar pessoas pela sua origem social.”</p>', fonte: 'Texto inspirado nas ideias de Marcos Bagno sobre preconceito linguístico.',
        enun: 'Segundo o texto, julgar como “errada” toda fala fora da gramática normativa',
        alts: ['é uma forma de preconceito que pode discriminar pessoas pela origem social.', 'é necessário para preservar a língua portuguesa.', 'é a única maneira de garantir a comunicação.', 'mostra que a norma-padrão não deve ser ensinada nas escolas.', 'é correto, pois a língua é um bloco uniforme.'],
        e: 'O ENEM reproduz essa visão sempre: variação é natural e o preconceito linguístico é que deve ser combatido. Mas atenção: a norma-padrão continua importante e deve ser ensinada.' }
    ] }
  ]
};
