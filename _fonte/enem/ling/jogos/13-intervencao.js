const E = ['Agente', 'Ação', 'Modo / meio', 'Finalidade', 'Detalhamento'];
const svg = `<svg viewBox="0 0 640 200" role="img" aria-label="Os cinco elementos da proposta de intervenção">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:800 15px Fredoka,Lexend,sans-serif;fill:#1d2a1f}.s{font:500 11.5px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect width="640" height="200" rx="16" fill="#fffdf6"/>
  ${[['👤', 'AGENTE', 'Quem?', 'Ministério da Educação', '#ffd9c7'], ['🛠️', 'AÇÃO', 'O quê?', 'criar campanhas', '#fff0b3'], ['🚌', 'MEIO', 'Como?', 'por meio das redes e da TV', '#d8f5dc'], ['🎯', 'FINALIDADE', 'Para quê?', 'a fim de reduzir…', '#dcecff'], ['🔎', 'DETALHE', '+ informação', 'sobre um dos elementos', '#f3e0ff']]
    .map(([e, n, p, x, c], k) => { const X = 12 + k * 126; return `<rect class="c" x="${X}" y="20" width="114" height="160" rx="14" fill="${c}"/><text x="${X + 57}" y="62" text-anchor="middle" style="font-size:30px">${e}</text>
    <text class="t" x="${X + 57}" y="92" text-anchor="middle">${n}</text><text class="s" x="${X + 57}" y="114" text-anchor="middle" style="font-weight:700">${p}</text>
    <text class="s" x="${X + 57}" y="140" text-anchor="middle">${x.length > 18 ? x.slice(0, 18) : x}</text><text class="s" x="${X + 57}" y="156" text-anchor="middle">${x.length > 18 ? x.slice(18) : ''}</text>`; }).join('')}
</svg>`;
module.exports = {
  id: 'ling-intervencao', arquivo: 'ling-intervencao.html', area: 'red', icone: '🛠️', titulo: 'Oficina da intervenção',
  resumo: 'Competência 5 sem mistério: encontre agente, ação, meio, finalidade e detalhamento, descubra o que falta e escolha a proposta nota 200.',
  desc: 'A competência 5 vale 200 pontos e é a mais “treinável” da redação. Desmonte propostas de intervenção, ache cada um dos cinco elementos, descubra o que está faltando e monte a proposta completa.',
  habs: ['H2', 'H18', 'H22'],
  figura: svg,
  intro: 'Proposta completa = <b>agente + ação + modo/meio + finalidade + detalhamento</b>. Cada elemento vale 40 pontos na C5. E ela precisa respeitar os direitos humanos e se ligar ao que você argumentou.',
  cola: `${svg}
    <p><b>Modelo para treinar:</b> “Portanto, cabe ao <u>Ministério da Educação</u> (agente) <u>criar um programa de educação midiática nas escolas</u> (ação), <u>por meio de oficinas semanais conduzidas por professores capacitados</u> (meio), <u>a fim de formar leitores críticos e reduzir a circulação de notícias falsas</u> (finalidade). <u>Essas oficinas, voltadas a alunos do ensino médio, devem</u>… (detalhamento).”</p>
    <p><b>Detalhamento</b> é qualquer informação a mais sobre um dos elementos: explicar quem é o agente (“órgão responsável pela educação”), como funciona o meio, para quem é a ação.</p>
    <p><b>Evite:</b> agente vago (“alguém”, “a sociedade deve se conscientizar”), proposta que fere direitos humanos (pena de morte, censura, violência) e proposta solta, que não resolve o problema que você discutiu.</p>
    <p><b>Agentes bons:</b> Ministério (da Saúde, da Educação…), Congresso Nacional, escolas, mídia, ONGs, família, empresas. Use mais de um se quiser.</p>`,
  etapas: [
    { tipo: 'achar', rotulo: 'Peça', n: 4, itens: [
      { pede: 'Toque no AGENTE da proposta.', texto: 'Cabe às [[escolas públicas]] {{promover rodas de conversa}} sobre saúde mental, {{com o apoio de psicólogos}}, {{para que os jovens saibam pedir ajuda}}.', e: 'O agente é quem executa: “as escolas públicas”.' },
      { pede: 'Toque na AÇÃO da proposta.', texto: 'O {{Congresso Nacional}} deve [[aprovar uma lei de acessibilidade digital]], {{por meio de audiências públicas com pessoas com deficiência}}, {{a fim de garantir o acesso de todos aos serviços on-line}}.', e: 'A ação é o que será feito: “aprovar uma lei de acessibilidade digital”.' },
      { pede: 'Toque no MODO / MEIO da proposta.', texto: 'A {{mídia}} deve {{divulgar campanhas contra o preconceito linguístico}}, [[por meio de vídeos curtos nas redes sociais]], {{com o objetivo de valorizar a diversidade da língua}}.', e: '“Por meio de…”, “mediante…”, “através de…” costumam introduzir o <b>meio</b>.' },
      { pede: 'Toque na FINALIDADE da proposta.', texto: 'O {{Ministério da Educação}} precisa {{ampliar o acesso à internet nas escolas}}, {{por meio de parcerias com empresas de telecomunicação}}, [[a fim de reduzir a exclusão digital dos estudantes]].', e: '“A fim de”, “para que”, “com o objetivo de” introduzem a <b>finalidade</b>.' },
      { pede: 'Toque no DETALHAMENTO (informação extra sobre um elemento).', texto: 'Cabe ao {{Ministério da Saúde}}, [[órgão responsável pelas políticas de saúde pública]], {{criar campanhas sobre vacinação}}, {{por meio da televisão e do rádio}}, {{para aumentar a cobertura vacinal}}.', e: 'O aposto explica quem é o agente: isso é <b>detalhamento</b>.' },
      { pede: 'Toque no AGENTE da proposta.', texto: '{{Para combater a insegurança alimentar}}, [[o Governo Federal]] deve {{ampliar os restaurantes populares}}, {{por meio de verbas destinadas aos municípios}}.', e: 'Quem deve ampliar? “O Governo Federal”. A finalidade veio no começo, e tudo bem.' }
    ] },
    { tipo: 'classificar', rotulo: 'Diagnóstico', n: 4, pede: 'Esta proposta perderia pontos na C5. Qual elemento está faltando?', baldes: E, itens: [
      { emo: '🩹', t: '“É preciso criar campanhas de conscientização nas redes sociais para reduzir o descarte irregular de lixo.”', c: 0, e: 'Quem vai criar? Falta o <b>agente</b> (ex.: o Ministério do Meio Ambiente).' },
      { emo: '🩹', t: '“O Ministério da Educação deve agir para resolver o problema da evasão escolar.”', c: 1, e: '“Agir” é vago: qual é a <b>ação</b> concreta? (ex.: ampliar o programa de bolsas de permanência).' },
      { emo: '🩹', t: '“As escolas devem oferecer aulas de educação financeira, a fim de reduzir o endividamento dos jovens.”', c: 2, e: 'Como as aulas vão acontecer? Falta o <b>meio</b> (ex.: por meio de uma disciplina obrigatória no ensino médio).' },
      { emo: '🩹', t: '“O Ministério da Saúde deve criar centros de atendimento psicológico gratuito, por meio de parcerias com universidades.”', c: 3, e: 'Para quê? Falta a <b>finalidade</b> (ex.: a fim de ampliar o acesso ao tratamento da ansiedade).' },
      { emo: '🩹', t: '“A mídia deve divulgar campanhas, por meio da TV, a fim de combater o racismo.”', c: 4, e: 'Tem agente, ação, meio e finalidade, mas nenhum <b>detalhamento</b> (ex.: “campanhas com depoimentos de vítimas”, “a mídia, formadora de opinião,”).' },
      { emo: '🩹', t: '“Deve-se ampliar o número de bibliotecas públicas por meio de verbas federais, para incentivar a leitura.”', c: 0, e: '“Deve-se” esconde o agente. Quem amplia? (ex.: o Ministério da Cultura).' },
      { emo: '🩹', t: '“O Congresso Nacional precisa fazer algo pela população idosa, por meio de debates.”', c: 1, e: '“Fazer algo” não é ação. Qual lei, programa ou medida?' }
    ] },
    { tipo: 'enem', rotulo: 'Escolha', n: 2, itens: [
      { base: '<p><b>Tema:</b> Desafios para combater a desinformação no Brasil.</p>',
        enun: 'Qual destas propostas de intervenção é a mais completa, com os cinco elementos e respeitando os direitos humanos?',
        alts: ['O Ministério da Educação, responsável pelo currículo nacional, deve incluir a educação midiática no ensino médio, por meio de oficinas semanais com professores capacitados, a fim de formar leitores capazes de checar informações.', 'A população precisa se conscientizar e parar de compartilhar notícias falsas.', 'O governo deve prender todos que compartilham notícias falsas, para acabar com o problema.', 'É necessário que algo seja feito urgentemente contra a desinformação.', 'As escolas devem ensinar os alunos, para combater a desinformação.'],
        e: 'A primeira tem agente (MEC), detalhamento (responsável pelo currículo), ação, meio e finalidade. “Prender todos” fere direitos humanos e zera a C5.' },
      { base: '<p><b>Tema:</b> Caminhos para valorizar os povos e comunidades tradicionais no Brasil.</p>',
        enun: 'Qual proposta seria anulada na competência 5 por desrespeitar os direitos humanos?',
        alts: ['Proibir que comunidades tradicionais mantenham seus costumes, para integrá-las à vida urbana.', 'Demarcar terras tradicionais por meio da Funai, a fim de proteger seus modos de vida.', 'Incluir a história desses povos no currículo escolar, com materiais feitos pelas comunidades.', 'Criar linhas de crédito para produtos artesanais das comunidades, por meio de bancos públicos.', 'Garantir atendimento de saúde diferenciado nas aldeias, com profissionais capacitados.'],
        e: 'Proibir costumes é violar direitos culturais. As outras valorizam as comunidades.' },
      { base: '<p>Trecho de conclusão: “Dessa forma, o Ministério da Saúde deve ampliar o programa Farmácia Popular, por meio da inclusão de novos medicamentos para doenças crônicas.”</p>',
        enun: 'Para que essa proposta fique completa, falta acrescentar principalmente',
        alts: ['a finalidade da ação, como reduzir os gastos das famílias e ampliar o acesso ao tratamento.', 'outro agente, já que o Ministério da Saúde não pode agir sozinho.', 'uma citação de filósofo para valorizar o texto.', 'uma pergunta retórica para envolver o leitor.', 'a repetição da tese apresentada na introdução.'],
        e: 'Tem agente, ação e meio. Falta “para quê” (finalidade) e, se possível, um detalhamento.' }
    ] }
  ]
};
