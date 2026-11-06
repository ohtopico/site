const P = ['Esporte', 'Jogo ou brincadeira', 'Dança', 'Luta', 'Ginástica', 'Prática de aventura'];
const C = (emo, t, c, e) => ({ emo, t, c, e });
const svg = `<svg viewBox="0 0 620 230" role="img" aria-label="Recomendação da OMS: 150 a 300 minutos de atividade moderada por semana">
  <style>.t{font:700 14px Lexend,sans-serif;fill:#1d2a1f}.s{font:500 12px Lexend,sans-serif;fill:#3b3b3b}</style>
  <rect width="620" height="230" rx="16" fill="#fffdf6"/>
  <text class="t" x="20" y="30">Semana ativa (OMS, adultos): 150 a 300 min de atividade moderada</text>
  ${['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, k) => { const h = [30, 0, 30, 0, 30, 45, 15][k] * 2.4; return `<rect x="${40 + k * 80}" y="${170 - h}" width="50" height="${h}" rx="6" fill="#4bb259" stroke="#1d2a1f" stroke-width="2"/>
    <text class="s" x="${65 + k * 80}" y="190" text-anchor="middle">${d}</text><text class="s" x="${65 + k * 80}" y="${164 - h}" text-anchor="middle">${[30, 0, 30, 0, 30, 45, 15][k] || ''}</text>`; }).join('')}
  <text class="s" x="20" y="215">Exemplo: 30 + 30 + 30 + 45 + 15 = 150 min. Somar caminhada, dança, bicicleta… tudo conta. Crianças e adolescentes: 60 min por dia.</text>
</svg>`;
module.exports = {
  id: 'ling-corpo', arquivo: 'ling-corpo.html', icone: '🤸', titulo: 'Corpo em movimento',
  resumo: 'Educação física no ENEM: classifique as práticas corporais, discuta saúde, sedentarismo, inclusão e padrões de corpo.',
  desc: 'Sim, educação física cai na prova de Linguagens! Classifique as práticas corporais, entenda de onde elas vêm e responda às questões sobre saúde, inclusão, mídia e padrão de corpo.',
  habs: ['H9', 'H10', 'H11'],
  figura: svg,
  intro: 'No ENEM, o corpo é linguagem: a capoeira nasceu como resistência, a ginástica laboral responde ao trabalho sentado, o esporte paralímpico adapta regras. A pergunta é sempre sobre o sentido social do movimento.',
  cola: `${svg}
    <ul><li><b>Práticas corporais</b> (BNCC): brincadeiras e jogos, esportes, ginásticas, danças, lutas e práticas corporais de aventura.</li>
    <li><b>Origem social:</b> capoeira (resistência de africanos escravizados, luta disfarçada de dança, Patrimônio da UNESCO); frevo (Recife, passos que vêm da capoeira); jogos indígenas (corrida de tora, peteca).</li>
    <li><b>Saúde:</b> sedentarismo aumenta o risco de diabetes, hipertensão e obesidade. Ginástica laboral previne lesões por esforço repetitivo (LER/DORT). Atividade física também ajuda a saúde mental.</li>
    <li><b>Inclusão:</b> esportes adaptados (goalball para cegos, bocha paralímpica, vôlei sentado, basquete em cadeira de rodas). Adaptar regras é garantir participação, não “facilitar”.</li>
    <li><b>Mídia e corpo:</b> o culto ao corpo “perfeito” pode levar a anabolizantes, transtornos alimentares e exclusão. O ENEM sempre critica o padrão único.</li>
    <li><b>Esporte de rendimento × participação:</b> o primeiro busca vencer e recordes; o segundo busca lazer, saúde e convivência.</li></ul>`,
  etapas: [
    { tipo: 'classificar', rotulo: 'Prática', n: 5, pede: 'Que tipo de prática corporal é esta?', baldes: P, itens: [
      C('🥋', 'Capoeira: ginga, golpes e roda com berimbau e atabaque.', 3, 'É classificada como <b>luta</b> (embora tenha música e dança), criada por africanos escravizados como resistência.'),
      C('🏐', 'Vôlei com regras oficiais, quadra e placar.', 0, 'Regras institucionalizadas e competição: <b>esporte</b>.'),
      C('🪀', 'Pega-pega, queimada e amarelinha no recreio.', 1, 'Regras combinadas pelo grupo e foco no prazer: <b>jogos e brincadeiras</b>.'),
      C('🎉', 'Frevo, com sombrinha colorida e passos acrobáticos no carnaval de Recife.', 2, '<b>Dança</b> popular pernambucana, Patrimônio Imaterial da UNESCO.'),
      C('🤸', 'Exercícios de alongamento no início do expediente de uma fábrica.', 4, 'Ginástica laboral: <b>ginástica</b> voltada à saúde do trabalhador.'),
      C('🧗', 'Escalada em rocha e trilha na mata.', 5, 'Risco controlado e contato com a natureza: <b>prática de aventura</b>.'),
      C('🛹', 'Skate na praça e parkour entre os muros da cidade.', 5, 'Práticas de aventura <b>urbanas</b>.'),
      C('🤼', 'Judô, com quedas e imobilizações, e o respeito ao adversário.', 3, '<b>Luta</b> de origem japonesa.'),
      C('🪵', 'Corrida de tora dos povos Jê, em que equipes carregam troncos pesados.', 1, 'Jogo tradicional indígena com sentido ritual: está no grupo de <b>jogos</b> (os Jogos dos Povos Indígenas reúnem várias dessas práticas).'),
      C('🕺', 'Hip-hop e break dance nas batalhas da periferia.', 2, 'Dança urbana, ligada à cultura hip-hop. O breaking virou modalidade olímpica em 2024.'),
      C('🏋️', 'Musculação e treino funcional na academia.', 4, 'Ginástica de condicionamento físico.'),
      C('⚽', 'Futebol de várzea aos domingos, com amigos do bairro.', 0, 'É <b>esporte</b>, mas de participação (lazer), não de rendimento.')
    ] },
    { tipo: 'enem', rotulo: 'Questão', n: 4, itens: [
      { base: '<p>A capoeira surgiu entre africanos escravizados e seus descendentes no Brasil. Proibida no Código Penal de 1890, sobreviveu disfarçada nas rodas com música. Em 2014, a roda de capoeira foi reconhecida pela UNESCO como Patrimônio Cultural Imaterial da Humanidade.</p>',
        enun: 'A trajetória da capoeira mostra que essa prática corporal',
        alts: ['nasceu como forma de resistência cultural de um grupo oprimido e foi legitimada com o tempo.', 'sempre foi aceita e incentivada pelo Estado brasileiro.', 'é apenas uma modalidade esportiva de competição.', 'perdeu sua ligação com a cultura afro-brasileira.', 'foi trazida ao Brasil por imigrantes europeus.'],
        e: 'H9: o movimento nasce de necessidades de um grupo social. Aqui, resistência e preservação cultural.' },
      { base: '<p>Muitos brasileiros passam boa parte do dia sentados, entre trabalho, transporte e telas. Empresas têm adotado pausas para ginástica laboral, e médicos recomendam levantar a cada hora.</p>',
        enun: 'As medidas citadas buscam',
        alts: ['transformar hábitos corporais para reduzir os efeitos do sedentarismo na saúde.', 'aumentar a jornada de trabalho dos funcionários.', 'substituir a prática de esportes por pausas no trabalho.', 'formar atletas de alto rendimento nas empresas.', 'eliminar o uso de computadores no trabalho.'],
        e: 'H10: mudar hábitos corporais conforme as necessidades do corpo (evitar dores, LER/DORT, doenças do sedentarismo).' },
      { base: '<p>No goalball, esporte paralímpico criado para pessoas com deficiência visual, a bola tem guizos e todos os atletas usam vendas, para que quem enxerga um pouco não tenha vantagem. A torcida precisa ficar em silêncio durante as jogadas.</p>',
        enun: 'As regras do goalball mostram que a adaptação das práticas corporais',
        alts: ['garante condições justas de participação respeitando os limites de cada pessoa.', 'torna o esporte menos competitivo e sem valor.', 'serve apenas para reabilitação médica.', 'exclui pessoas que enxergam parcialmente.', 'impede a presença de público nas competições.'],
        e: 'H11: a linguagem corporal considera os limites de desempenho e cria alternativas de adaptação.' },
      { base: '<p>Influenciadores fitness exibem nas redes corpos com pouquíssima gordura e músculos definidos, muitas vezes com filtros. Entre jovens, cresce o uso de anabolizantes sem orientação médica para alcançar esse padrão rapidamente.</p>',
        enun: 'O texto permite criticar',
        alts: ['a imposição midiática de um padrão corporal que pode trazer riscos à saúde.', 'a prática de atividade física regular entre os jovens.', 'o trabalho de profissionais de educação física.', 'a existência de academias nas cidades.', 'a divulgação de informações científicas nas redes.'],
        e: 'O ENEM questiona o padrão único de corpo e os riscos (anabolizantes, transtornos alimentares). Isso não é crítica ao exercício em si.' },
      { base: '<p>Num torneio escolar, a professora mudou as regras do futebol: todos os alunos devem tocar na bola antes do gol, e meninos e meninas jogam no mesmo time.</p>',
        enun: 'A mudança nas regras privilegia',
        alts: ['a participação e a convivência, em vez do rendimento e da vitória a qualquer custo.', 'a formação de atletas profissionais.', 'a exclusão dos alunos menos habilidosos.', 'a separação dos alunos por sexo.', 'o cumprimento rigoroso das regras oficiais.'],
        e: 'Esporte de participação (escolar e de lazer) × esporte de rendimento: as regras se adaptam ao objetivo do grupo.' }
    ] }
  ]
};
