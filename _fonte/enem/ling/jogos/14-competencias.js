const K = ['C1 · Norma-padrão', 'C2 · Tema e repertório', 'C3 · Argumentação', 'C4 · Coesão', 'C5 · Intervenção'];
const C = (t, c, e) => ({ emo: '📝', t, c, e });
const O = (cartas, e, pede) => ({ cartas, e, pede });
const svg = `<svg viewBox="0 0 640 220" role="img" aria-label="Estrutura da redação do ENEM em quatro parágrafos">
  <style>.c{stroke:#1d2a1f;stroke-width:2.5}.t{font:800 15px Sniglet,Lexend,sans-serif;fill:#1d2a1f}.s{font:500 12px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect width="640" height="220" rx="16" fill="#fffdf6"/>
  ${[['1º · Introdução', 'repertório + contexto + TESE', '+ anuncia os 2 argumentos', '#ffd9c7'], ['2º · Desenvolvimento 1', 'tópico frasal (argumento 1)', '+ repertório + análise', '#fff0b3'], ['3º · Desenvolvimento 2', 'tópico frasal (argumento 2)', '+ repertório + análise', '#d8f5dc'], ['4º · Conclusão', 'retoma a tese', '+ proposta de intervenção (5 elementos)', '#dcecff']]
    .map(([n, a, b, c], k) => `<rect class="c" x="20" y="${14 + k * 50}" width="600" height="42" rx="10" fill="${c}"/><text class="t" x="34" y="${40 + k * 50}">${n}</text><text class="s" x="250" y="${32 + k * 50}">${a}</text><text class="s" x="250" y="${48 + k * 50}">${b}</text>`).join('')}
</svg>`;
module.exports = {
  id: 'ling-competencias', arquivo: 'ling-competencias.html', area: 'red', icone: '🧩', titulo: 'Corretora por um dia',
  resumo: 'Vire corretora do ENEM: descubra em que competência cada falha tira ponto, monte a introdução na ordem certa e escolha o repertório produtivo.',
  desc: 'Você está na banca de correção. Para cada problema encontrado, decida qual das cinco competências perde ponto, monte parágrafos na ordem certa e escolha o repertório que realmente ajuda o texto.',
  habs: ['H18', 'H22', 'H27'],
  figura: svg,
  intro: 'São 5 competências de 200 pontos. Saber <b>onde</b> cada erro pesa ajuda a revisar a própria redação nos últimos minutos da prova.',
  cola: `${svg}
    <table><tr><th>Competência</th><th>O que avalia</th><th>Erros típicos</th></tr>
    <tr><td>C1</td><td>norma-padrão da escrita</td><td>acentuação, crase, concordância, regência, pontuação, gíria</td></tr>
    <tr><td>C2</td><td>entender o tema, tipo dissertativo-argumentativo, repertório</td><td>tangenciar o tema, narrar, repertório solto ou “de bolso” sem ligação</td></tr>
    <tr><td>C3</td><td>selecionar e organizar argumentos (projeto de texto)</td><td>argumento só citado e não explicado, contradição, texto sem tese</td></tr>
    <tr><td>C4</td><td>coesão: conectivos e retomadas</td><td>repetir palavras, parágrafo sem conectivo, conectivo com sentido errado</td></tr>
    <tr><td>C5</td><td>proposta de intervenção</td><td>faltar agente, ação, meio, finalidade ou detalhamento; ferir direitos humanos</td></tr></table>
    <p><b>Repertório produtivo</b> = legitimado (fonte reconhecida: lei, dado, autor, fato histórico) + pertinente ao tema + <b>usado</b> no argumento, não só citado.</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Correção', n: 6, pede: 'Em qual competência este problema tira pontos?', baldes: K, itens: [
      C('“Haviam muitas pessoas que não tem acesso a internet.”', 0, 'Haver = existir fica no singular (“havia”), “têm” no plural leva acento e “à internet” tem crase. Tudo isso é <b>C1</b>.'),
      C('Tema: “Desafios da saúde mental dos jovens”. A redação fala só da saúde pública em geral, sem falar de jovens nem de saúde mental.', 1, 'Tangenciou o tema: perde na <b>C2</b> (e por consequência nas outras).'),
      C('A redação conta a história de uma jovem que perdeu o emprego, com começo, meio e fim.', 1, 'Fugiu do tipo dissertativo-argumentativo (virou narração): <b>C2</b>.'),
      C('O aluno cita Bauman e a “modernidade líquida”, mas não explica a relação com o tema e passa para outro assunto.', 2, 'Repertório jogado sem análise enfraquece o argumento: <b>C3</b> (e o repertório deixa de ser produtivo na C2).'),
      C('O 2º parágrafo defende que a tecnologia isola as pessoas; o 3º, que a tecnologia só aproxima. A conclusão não resolve a contradição.', 2, 'Projeto de texto incoerente: <b>C3</b>.'),
      C('“A internet é importante. A internet ajuda as pessoas. A internet também traz riscos.”', 3, 'Repetição sem retomadas (ela, essa ferramenta) e sem conectivos: <b>C4</b>.'),
      C('O aluno começa o parágrafo com “Portanto,” mas ainda está apresentando o primeiro argumento.', 3, 'Conectivo de conclusão usado com sentido errado: <b>C4</b>.'),
      C('“Para resolver isso, a sociedade precisa se conscientizar.”', 4, 'Sem agente claro, sem ação concreta, sem meio e finalidade: <b>C5</b> fraca.'),
      C('A proposta sugere “castigar fisicamente quem pratica bullying”.', 4, 'Fere os direitos humanos: a <b>C5</b> fica zerada.'),
      C('“Os jovem de hoje tão muito ansioso por causa das rede social.”', 0, 'Concordância e registro informal (“tão”): <b>C1</b>.'),
      C('Os parágrafos de desenvolvimento começam sempre com “Além disso” e não há conectivos entre as frases.', 3, 'Pouca variedade de articuladores: <b>C4</b>.')
    ] },
    { tipo: 'ordenar', rotulo: 'Montagem', n: 2, pede: 'Monte a introdução: toque nas frases na ordem em que elas devem aparecer.', itens: [
      O(['A Constituição de 1988 garante a todos o direito à educação.', 'Na prática, porém, milhões de jovens abandonam a escola antes de concluir o ensino médio.', 'Esse cenário se explica pela necessidade de trabalhar cedo e pela falta de apoio pedagógico.'], 'Repertório (lei) → contraste com a realidade (“porém”) → tese com os dois argumentos que serão desenvolvidos.'),
      O(['Na obra 1984, George Orwell imagina uma sociedade em que o governo controla as informações.', 'Fora da ficção, a disseminação de notícias falsas também ameaça o acesso à verdade no Brasil.', 'Isso ocorre devido à lógica dos algoritmos e à baixa educação midiática da população.'], 'Repertório (livro) → ponte com o tema (“Fora da ficção”) → tese com os dois argumentos.'),
      O(['Em primeiro lugar, a falta de acesso à internet impede que muitos estudantes acompanhem atividades on-line.', 'Segundo a pesquisa TIC Domicílios, milhões de brasileiros ainda não têm internet em casa.', 'Assim, a exclusão digital aprofunda as desigualdades educacionais.'], 'Parágrafo de desenvolvimento: tópico frasal → repertório (dado) → análise / fechamento.', 'Monte o parágrafo de desenvolvimento na ordem certa.')
    ] },
    { tipo: 'enem', rotulo: 'Repertório', n: 2, itens: [
      { base: '<p><b>Tema:</b> O desafio de reduzir a violência contra a mulher no Brasil.</p>',
        enun: 'Qual repertório é mais produtivo para esse tema?',
        alts: ['A Lei Maria da Penha (2006), relacionando-a à falta de delegacias especializadas em muitas cidades.', 'Um ditado popular como “em briga de marido e mulher, ninguém mete a colher”, sem análise.', 'A teoria da relatividade de Einstein.', 'Uma frase motivacional de autor desconhecido.', 'O enredo completo de uma novela, contado em detalhes.'],
        e: 'A lei é legitimada, pertinente e foi <b>usada</b> num argumento (a falta de delegacias). O ditado poderia até servir, mas só se fosse criticado e analisado.' },
      { base: '<p><b>Tema:</b> Caminhos para combater a insegurança alimentar no Brasil.</p>',
        enun: 'Qual uso de repertório mostra produtividade, e não apenas citação?',
        alts: ['“Josué de Castro já denunciava em Geografia da fome que a fome é um problema social, não natural; hoje, a concentração de renda confirma essa análise.”', '“Como disse Aristóteles, o homem é um animal político.”', '“Segundo a Bíblia, devemos amar ao próximo.”', '“A fome é muito triste, como todo mundo sabe.”', '“De acordo com especialistas, a fome existe.”'],
        e: 'Autor pertinente (Josué de Castro) + ligação com a atualidade (renda). As outras ou não têm relação com o tema ou não têm fonte.' }
    ] }
  ]
};
