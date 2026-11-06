const B = ['Meme', 'Podcast', 'Hipertexto', 'Infográfico', 'Fio (thread)', 'Emoji / hashtag'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const O = (cartas, e, pede) => ({ cartas, e, pede });
const marcos = [['✍️', 'Escrita', '3200 a.C.'], ['🖨️', 'Prensa', '1450'], ['📠', 'Telégrafo', '1840'], ['📻', 'Rádio', '1920'], ['📺', 'TV', '1950'], ['🌐', 'Internet', '1990'], ['📱', 'Smartphone', '2007'], ['🤖', 'IA', '2022']];
const svg = `<svg viewBox="0 0 640 170" role="img" aria-label="Linha do tempo das tecnologias da comunicação">
  <rect width="640" height="170" rx="16" fill="#fffdf6"/><path d="M24 92 H616" stroke="#1d2a1f" stroke-width="4"/>
  ${marcos.map(([e, n, a], k) => { const x = 50 + k * 77; return `<circle cx="${x}" cy="92" r="24" fill="${k % 2 ? '#c7b4f2' : '#9fe3dc'}" stroke="#1d2a1f" stroke-width="2.5"/><text x="${x}" y="101" text-anchor="middle" style="font-size:24px">${e}</text>
    <text x="${x}" y="44" text-anchor="middle" style="font:700 13px Lexend,sans-serif;fill:#1d2a1f">${n}</text><text x="${x}" y="140" text-anchor="middle" style="font:600 12px Lexend,sans-serif;fill:#5a6a5c">${a}</text>`; }).join('')}
</svg>`;
module.exports = {
  id: 'ling-tecnologias', arquivo: 'ling-tecnologias.html', icone: '💻', titulo: 'Rede das tecnologias',
  resumo: 'Da escrita à inteligência artificial: monte a linha do tempo, reconheça os gêneros digitais pela linguagem e discuta o impacto das tecnologias na sociedade.',
  desc: 'Cada tecnologia da comunicação mudou o jeito de as sociedades produzirem conhecimento. Ponha as invenções em ordem, reconheça os gêneros digitais pela sua linguagem e analise seus impactos.',
  habs: ['H28', 'H29', 'H30'],
  figura: svg,
  intro: 'O ENEM pergunta o que cada tecnologia mudou: a prensa espalhou livros, o rádio integrou o país, a internet tornou todo mundo produtor de conteúdo. E cobra os gêneros digitais (meme, podcast, fio, hipertexto).',
  cola: `${svg}
    <ul><li><b>Prensa de Gutenberg</b> (c. 1450): livros mais baratos, difusão da Reforma Protestante e da ciência.</li>
    <li><b>Rádio</b> (anos 1920–50 no Brasil): integração nacional, radionovelas, uso político na Era Vargas (“A Voz do Brasil”, 1935).</li>
    <li><b>TV</b>: cultura de massa, telenovela, publicidade.</li>
    <li><b>Internet</b>: comunicação em rede, hipertexto, interatividade, todo usuário pode ser produtor (“prosumidor”).</li>
    <li><b>Desafios:</b> exclusão digital, bolhas de algoritmo, privacidade de dados (LGPD, 2018), desinformação, uso da IA.</li></ul>
    <p><b>Gêneros digitais:</b> meme (imagem + texto, humor, intertextualidade, viraliza), podcast (áudio sob demanda, em episódios), hipertexto (links que permitem leitura não linear), infográfico (dados + imagens), fio/thread (sequência de posts numerados), hashtag (#) para indexar e mobilizar.</p>`,
  etapas: [
    { tipo: 'ordenar', rotulo: 'Invenção', n: 2, pede: 'Toque nas tecnologias da mais antiga para a mais recente.', itens: [
      O(['Escrita cuneiforme', 'Prensa de Gutenberg', 'Telégrafo', 'Rádio', 'Internet'], 'Mesopotâmia (c. 3200 a.C.), 1450, 1840, anos 1920 (no Brasil) e anos 1990 (internet comercial).'),
      O(['Jornal impresso', 'Telefone', 'Televisão', 'Correio eletrônico (e-mail)', 'Smartphone'], 'Séc. XVII, 1876, anos 1950 (no Brasil), anos 1970–90 e 2007.'),
      O(['Rádio', 'Televisão', 'Internet', 'Redes sociais', 'Inteligência artificial generativa'], 'Rádio → TV → internet → redes sociais (anos 2000) → IA generativa (anos 2020).')
    ] },
    { tipo: 'classificar', rotulo: 'Gênero', n: 5, pede: 'Que gênero ou recurso digital é este, pela sua linguagem?', baldes: B, itens: [
      C('🐸', 'Uma foto famosa de um gato assustado com a legenda: “Eu quando abro o gabarito do ENEM”.', 0, 'Imagem conhecida + texto curto + humor e identificação: <b>meme</b>.'),
      C('🎧', 'Episódio 42: “Dicas de redação nota mil”. Disponível no Spotify, 35 minutos, ouça quando quiser.', 1, 'Áudio em episódios, sob demanda: <b>podcast</b>.'),
      C('🔗', 'Um verbete da Wikipédia em que cada palavra azul leva a outra página, e o leitor escolhe o caminho.', 2, 'Leitura não linear por links: <b>hipertexto</b>.'),
      C('📊', 'Um quadro com ícones, gráficos de pizza e números sobre o consumo de água no Brasil.', 3, 'Dados + recursos visuais: <b>infográfico</b>.'),
      C('🧵', '“1/7 Vou explicar por que a seca no Pantanal está pior este ano. Segue o fio 👇”', 4, 'Sequência numerada de posts: <b>fio (thread)</b>.'),
      C('#️⃣', '#VacinaSim aparece em milhares de posts e entra nos assuntos mais comentados do dia.', 5, 'A <b>hashtag</b> agrupa posts e serve para mobilização.'),
      C('😂', 'Uma mensagem só com 😂😂😂👏 em resposta a uma piada no grupo.', 5, 'Emojis substituem expressões faciais e gestos na escrita digital.'),
      C('🎙️', 'Duas jornalistas conversam sobre política em um programa gravado, publicado toda sexta, com vinheta de abertura.', 1, 'Programa de áudio periódico distribuído pela internet: <b>podcast</b>.'),
      C('🖼️', 'A mesma cena de novela aparece com legendas diferentes, cada uma comentando um assunto do momento.', 0, 'Reaproveitamento da mesma imagem com novos textos: <b>meme</b>.'),
      C('🗺️', 'Mapa do Brasil colorido por estado, com ícones e a porcentagem de casas com internet.', 3, 'Dados visualizados: <b>infográfico</b>.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 3, itens: [
      { base: '<p>Por volta de 1450, Gutenberg criou a prensa de tipos móveis. Em poucas décadas, milhões de livros circulavam na Europa. Antes, cada exemplar era copiado à mão, em geral por monges.</p>',
        enun: 'A invenção da prensa transformou a sociedade da época porque',
        alts: ['ampliou e barateou o acesso aos textos, favorecendo a difusão de ideias e do conhecimento.', 'acabou com o analfabetismo na Europa.', 'aumentou o poder dos monges copistas.', 'impediu a circulação de ideias religiosas.', 'substituiu imediatamente a comunicação oral.'],
        e: 'H30: tecnologias ligadas ao desenvolvimento das sociedades. A prensa ajudou a Reforma, o Renascimento e a ciência moderna.' },
      { base: '<p>Nos anos 1940, o rádio era o principal meio de comunicação do Brasil. Radionovelas paravam o país, e o governo Vargas criou um programa diário obrigatório em todas as emissoras para divulgar seus atos.</p>',
        enun: 'O texto mostra que o rádio teve papel social de',
        alts: ['integrar o país e também servir como instrumento de propaganda política.', 'ser usado somente para fins de entretenimento.', 'atingir apenas a elite letrada das capitais.', 'combater a centralização do poder.', 'substituir a imprensa escrita por completo.'],
        e: 'O rádio chegava a quem não lia e integrava o território; Vargas usou isso politicamente (“A Voz do Brasil”). H28.' },
      { base: '<p>Pesquisas mostram que milhões de brasileiros ainda acessam a internet apenas pelo celular, com pacote de dados limitado. Durante o ensino remoto na pandemia, muitos estudantes não conseguiram acompanhar as aulas.</p>',
        enun: 'O texto discute um impacto social das tecnologias da comunicação relacionado à',
        alts: ['exclusão digital, que aprofunda desigualdades educacionais.', 'universalização do acesso à internet de qualidade.', 'substituição definitiva da escola presencial.', 'redução do uso de celulares entre jovens.', 'falta de interesse dos estudantes pelas aulas.'],
        e: 'Ter celular não é o mesmo que ter acesso de qualidade. A exclusão digital aumenta a desigualdade (H28).' },
      { base: '<p>Num hipertexto, o leitor não segue uma única linha: clica em links, abre janelas, volta, escolhe o próprio percurso. Cada leitura pode ser diferente da outra.</p>',
        enun: 'A característica do hipertexto destacada no texto é a',
        alts: ['leitura não linear, construída pelas escolhas do leitor.', 'proibição de imagens e sons.', 'ordem fixa e obrigatória de leitura.', 'ausência de interatividade.', 'exigência de impressão em papel.'],
        e: 'H29: identificar a tecnologia pela sua linguagem. O hipertexto é não linear e interativo.' },
      { base: '<p>As plataformas usam algoritmos que mostram a cada pessoa os conteúdos com mais chance de prender sua atenção. Com o tempo, o usuário vê principalmente opiniões parecidas com as suas.</p>',
        enun: 'O fenômeno descrito, conhecido como “bolha”, pode',
        alts: ['reforçar crenças e dificultar o contato com pontos de vista diferentes.', 'garantir acesso equilibrado a todas as opiniões.', 'eliminar a circulação de notícias falsas.', 'tornar o usuário mais crítico automaticamente.', 'impedir que as plataformas lucrem com publicidade.'],
        e: 'Algoritmos de recomendação criam bolhas e polarização: impacto social das TICs (H28, H30).' }
    ] }
  ]
};
