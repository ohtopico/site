const B = ['Adição', 'Oposição', 'Causa', 'Conclusão', 'Condição', 'Finalidade'];
const C = (t, c, e) => ({ emo: '🔗', t, c, e });
const svg = `<svg viewBox="0 0 620 250" role="img" aria-label="Pontes entre ideias: cada conectivo é uma ponte com um sentido">
  <style>.p{stroke:#1d2a1f;stroke-width:2.5}.t{font:700 14px Lexend,sans-serif;fill:#1d2a1f}.s{font:500 12.5px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect x="0" y="0" width="620" height="250" fill="#d9f2fb"/><path d="M0 200 Q155 180 310 200 T620 200 V250 H0Z" fill="#8fd3ef"/>
  <rect class="p" x="14" y="70" width="150" height="70" rx="14" fill="#fff6dd"/><text class="t" x="89" y="100" text-anchor="middle">Ideia 1</text><text class="s" x="89" y="122" text-anchor="middle">“Estudei muito,”</text>
  <rect class="p" x="456" y="70" width="150" height="70" rx="14" fill="#fff6dd"/><text class="t" x="531" y="100" text-anchor="middle">Ideia 2</text><text class="s" x="531" y="122" text-anchor="middle">“fui bem na prova.”</text>
  <path class="p" d="M164 105 Q310 30 456 105" fill="none" stroke-width="5"/><path d="M190 96 V120 M240 75 V120 M310 66 V120 M380 75 V120 M430 96 V120" stroke="#1d2a1f" stroke-width="2"/>
  <rect class="p" x="250" y="120" width="120" height="34" rx="10" fill="#c7b4f2"/><text class="t" x="310" y="142" text-anchor="middle">por isso</text>
  <text class="s" x="310" y="178" text-anchor="middle">a ponte diz COMO as ideias se ligam: aqui, conclusão (consequência)</text>
  <text class="s" x="310" y="236" text-anchor="middle">Troque a ponte por “mas” e o sentido vira oposição: “Estudei muito, mas fui mal.”</text>
</svg>`;
module.exports = {
  id: 'ling-conectivos', arquivo: 'ling-conectivos.html', icone: '🔗', titulo: 'Ponte dos conectivos',
  resumo: 'Cada conectivo é uma ponte com um sentido. Classifique adição, oposição, causa, conclusão, condição e finalidade e ache o termo que retoma outro.',
  desc: 'Conectivos e retomadas fazem o texto andar (progressão temática). Descubra o sentido de cada ponte, ache a palavra que retoma uma ideia anterior e treine a norma-padrão que cai na prova.',
  habs: ['H18', 'H22', 'H27'],
  figura: svg,
  intro: 'O ENEM pergunta muito: “o conectivo X estabelece relação de…?” e “o termo Y retoma qual ideia?”. Leia a frase inteira antes de responder: o sentido manda mais que a palavra decorada.',
  cola: `${svg}
    <table><tr><th>Sentido</th><th>Conectivos</th></tr>
    <tr><td>Adição</td><td>e, além disso, também, não só… mas também, ademais</td></tr>
    <tr><td>Oposição (adversativa/concessiva)</td><td>mas, porém, contudo, todavia, entretanto, no entanto · embora, apesar de, ainda que, mesmo que</td></tr>
    <tr><td>Causa / explicação</td><td>porque, pois (antes do verbo), já que, visto que, uma vez que, como (no início)</td></tr>
    <tr><td>Conclusão / consequência</td><td>portanto, logo, por isso, assim, pois (depois do verbo, entre vírgulas), de modo que, tão… que</td></tr>
    <tr><td>Condição</td><td>se, caso, desde que, contanto que, a menos que</td></tr>
    <tr><td>Finalidade</td><td>para, para que, a fim de (que)</td></tr>
    <tr><td>Tempo</td><td>quando, enquanto, assim que, logo que</td></tr></table>
    <p><b>Coesão referencial:</b> pronomes (ele, isso, este, cujo), sinônimos e expressões (“o problema”, “tal medida”) retomam o que já foi dito e evitam repetição.</p>
    <p><b>Norma-padrão que mais cai:</b> “houve problemas” (haver = existir, não vai ao plural); “fazem dois anos” ✗ → “faz dois anos”; “a nível de” ✗ → “em nível de”; crase antes de palavra feminina regida por “a” (“vou à escola”, mas “vou a pé”).</p>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Ponte', n: 6, pede: 'Que sentido o conectivo destacado expressa?', baldes: B, itens: [
      C('Ela estudou a noite toda, <b>porém</b> não conseguiu terminar a revisão.', 1, '“Porém” contrasta duas ideias: <b>oposição</b> (adversativa).'),
      C('<b>Embora</b> estivesse cansada, foi à academia.', 1, '“Embora” é concessivo: admite um obstáculo que não impede o fato. Também é <b>oposição</b>.'),
      C('O rio transbordou <b>porque</b> choveu 300 mm em dois dias.', 2, '“Porque” introduz o motivo: <b>causa</b>.'),
      C('<b>Como</b> a vacina chegou tarde, o surto se espalhou.', 2, '“Como” no início da frase, antes da consequência, indica <b>causa</b>.'),
      C('O desmatamento cresceu; <b>portanto</b>, as queimadas aumentaram.', 3, '“Portanto” fecha um raciocínio: <b>conclusão</b>.'),
      C('Os preços subiram; é preciso, <b>pois</b>, rever o orçamento.', 3, '“Pois” depois do verbo e entre vírgulas = portanto: <b>conclusão</b>. Antes do verbo seria causa.'),
      C('<b>Caso</b> chova, o jogo será adiado.', 4, '“Caso” coloca uma hipótese: <b>condição</b>.'),
      C('Você só entra <b>desde que</b> apresente o documento com foto.', 4, '“Desde que” com verbo no subjuntivo = se: <b>condição</b>.'),
      C('Ela acordou às 5h <b>a fim de</b> estudar antes do trabalho.', 5, '“A fim de” indica o objetivo: <b>finalidade</b>.'),
      C('O governo criou o programa <b>para que</b> jovens de baixa renda chegassem à universidade.', 5, '“Para que” = com o objetivo de: <b>finalidade</b>.'),
      C('A reciclagem gera empregos <b>e</b>, <b>além disso</b>, reduz o lixo nos aterros.', 0, '“Além disso” acrescenta um argumento: <b>adição</b>.'),
      C('<b>Não só</b> o calor aumentou, <b>mas também</b> as chuvas ficaram mais intensas.', 0, '“Não só… mas também” soma dois fatos: <b>adição</b>, não oposição!'),
      C('<b>Visto que</b> o prazo acabou, as inscrições foram encerradas.', 2, '“Visto que” = já que: <b>causa</b>.'),
      C('Choveu muito; <b>logo</b>, as ruas alagaram.', 3, '“Logo” aqui é conclusão (= portanto), não tempo.'),
      C('A lei é boa; <b>contudo</b>, falta fiscalização.', 1, '“Contudo” = mas: <b>oposição</b>.')
    ] },
    { tipo: 'achar', rotulo: 'Retomada', n: 3, itens: [
      { pede: 'Toque na palavra que retoma “o lixo eletrônico”.', texto: 'O lixo eletrônico cresce a cada ano no Brasil. Quando descartado de forma incorreta, [[ele]] contamina o solo com metais pesados.', e: 'O pronome “ele” retoma “o lixo eletrônico” e evita a repetição: coesão referencial.' },
      { pede: 'Toque na expressão que resume a ideia da primeira frase.', texto: 'Milhões de brasileiros ainda não têm acesso à internet em casa. [[Esse problema]] afeta principalmente estudantes de baixa renda.', e: '“Esse problema” é um encapsulador: resume toda a frase anterior numa expressão nominal.' },
      { pede: 'Toque no conectivo que introduz uma ideia contrária.', texto: 'A internet democratizou o acesso à informação; [[entretanto]], também facilitou a circulação de notícias falsas.', e: '“Entretanto” = mas: liga duas ideias em oposição.' },
      { pede: 'Toque na palavra que retoma “Machado de Assis”.', texto: 'Machado de Assis nasceu no Morro do Livramento, no Rio de Janeiro. Neto de escravizados alforriados, [[o escritor]] fundou a Academia Brasileira de Letras.', e: '“O escritor” retoma Machado por uma expressão de mesmo referente (substituição lexical).' },
      { pede: 'Toque no conectivo que indica a finalidade da ação.', texto: 'Os agentes visitaram as casas [[para]] eliminar os focos do mosquito.', e: '“Para” + verbo no infinitivo indica <b>finalidade</b>.' },
      { pede: 'Toque na forma que segue a norma-padrão.', texto: 'Na reunião, {{haviam}} muitas dúvidas. Depois, [[houve]] menos reclamações.', e: 'Haver no sentido de existir é impessoal: fica no singular (“houve”, “havia muitas dúvidas”). “Haviam”, nesse sentido, foge da norma-padrão.' }
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 2, itens: [
      { base: '<p>O Brasil produz alimento suficiente para toda a sua população. <b>No entanto</b>, milhões de pessoas ainda passam fome. <b>Isso</b> mostra que o problema não é de produção, <b>mas</b> de distribuição e renda.</p>',
        enun: 'No texto, os termos destacados “No entanto”, “Isso” e “mas” estabelecem, respectivamente, relações de',
        alts: ['oposição, retomada de uma ideia anterior e oposição.', 'conclusão, adição e causa.', 'oposição, conclusão e adição.', 'causa, retomada de uma ideia anterior e condição.', 'adição, oposição e finalidade.'],
        e: '“No entanto” e “mas” são adversativos; “Isso” retoma a contradição descrita antes (comida sobra, mas há fome).' },
      { base: '<p>“Se o planeta continuar aquecendo nesse ritmo, as cidades costeiras serão afetadas. Por isso, é urgente reduzir as emissões, a fim de que as próximas gerações não paguem a conta.”</p>',
        enun: 'A progressão do texto se organiza, nessa ordem, por relações de',
        alts: ['condição, conclusão e finalidade.', 'causa, oposição e adição.', 'tempo, condição e conclusão.', 'oposição, finalidade e causa.', 'adição, causa e condição.'],
        e: '“Se” = condição; “Por isso” = conclusão; “a fim de que” = finalidade.' },
      { base: '<p>Bilhete na portaria: “Informamos que <b>fazem</b> dois anos que a piscina não passa por reforma. <b>Haverão</b> obras no próximo mês.”</p>',
        enun: 'De acordo com a norma-padrão, o bilhete deveria ser corrigido para',
        alts: ['“faz dois anos” e “Haverá obras”, porque os verbos fazer (tempo) e haver (existir) são impessoais.', '“fazem dois anos” e “Haverão obras”, que já estão corretos.', '“faz dois anos” e “Haverão obras”, porque obras está no plural.', '“fazem dois anos” e “Haverá obras”, porque dois anos é plural.', '“fizeram dois anos” e “Houveram obras”.'],
        e: 'Fazer indicando tempo e haver com sentido de existir não têm sujeito: ficam na 3ª pessoa do singular.' }
    ] }
  ]
};
