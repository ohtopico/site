/* META {
  "id": "hum-campo-cidade", "icone": "🏙️", "titulo": "Campo e cidade", "tipo": "simulador",
  "intro": "Você é a prefeita: a cidade alaga, esquenta e cresce para a periferia, e o campo se mecaniza. Escolha as medidas que resolvem cada problema no simulador e responda às questões sobre urbanização, agronegócio e tecnologia no espaço.",
  "resumo": "Simulador de problemas urbanos e rurais: enchentes, ilha de calor, segregação, êxodo rural, Revolução Verde e agronegócio.",
  "habs": ["H18", "H19", "H28"],
  "cola": [
    ["Problemas urbanos:", "ilha de calor (asfalto e concreto, pouco verde), inversão térmica (no inverno o ar frio com poluição fica preso embaixo), enchentes (solo impermeável, rios canalizados, várzeas ocupadas), segregação socioespacial (periferias pobres longe do emprego)."],
    ["Urbanização brasileira:", "rápida e concentrada entre 1950 e 1980, puxada pela industrialização e pelo êxodo rural. Metropolização, conurbação, favelização. Hoje mais de 85% da população é urbana."],
    ["Campo:", "Revolução Verde (sementes melhoradas, adubo químico, agrotóxico, máquinas) aumentou a produtividade, mas concentrou terras e expulsou trabalhadores. Agronegócio exporta commodities (soja, milho, carne); a agricultura familiar produz grande parte dos alimentos do mercado interno."]
  ]
} */
const { sorteia: S, mix } = HUM;
const CENAS = [
  { hab: 'H19', emo: '🌧️', titulo: 'A Avenida do Rio alaga a cada chuva forte', cor: '#7cc3e8',
    boas: [['Construir piscinões (reservatórios de retenção)', 'Guardam a água da chuva e soltam devagar.'], ['Trocar calçadas por piso permeável e criar jardins de chuva', 'A água volta a infiltrar no solo.'], ['Criar um parque linear às margens do córrego', 'Devolve a várzea ao rio, onde a cheia é natural.']],
    ruins: [['Canalizar o córrego e cobrir com mais uma avenida', 'A água corre mais rápido e o problema vai para o bairro de baixo.'], ['Liberar a construção de prédios na várzea', 'É ocupar o espaço da cheia.'], ['Asfaltar as ruas de terra do bairro', 'Mais impermeabilização, mais enxurrada.']],
    fim: 'Enchente urbana é sobretudo um problema de <b>impermeabilização</b> do solo e de ocupação das <b>várzeas</b>.' },
  { hab: 'H28', emo: '🔥', titulo: 'O centro está 5 °C mais quente que a zona rural', cor: '#f7a07a',
    boas: [['Plantar árvores nas calçadas e praças', 'Sombra e evapotranspiração resfriam o ar.'], ['Incentivar telhados verdes e telhados claros', 'Superfícies claras refletem a radiação solar.'], ['Criar parques e manter áreas verdes', 'Quebram a mancha contínua de concreto.']],
    ruins: [['Cobrir as praças com concreto para facilitar a limpeza', 'Concreto acumula calor de dia e solta à noite.'], ['Estimular mais carros no centro', 'Motores e ar-condicionado aquecem ainda mais.'], ['Cortar árvores para alargar ruas', 'Menos verde = mais calor.']],
    fim: 'É a <b>ilha de calor</b>: materiais que absorvem calor, pouca vegetação, prédios que barram o vento e calor dos motores.' },
  { hab: 'H28', emo: '🌫️', titulo: 'Em julho, uma névoa cinza cobre a cidade de manhã e os hospitais lotam', cor: '#b9b9b9',
    boas: [['Investir em metrô e ônibus elétricos', 'Menos queima de combustível, menos poluente.'], ['Fazer rodízio de veículos nos dias críticos', 'Reduz emissões quando o ar está parado.'], ['Fiscalizar a fumaça das chaminés das indústrias', 'Controle das fontes fixas.']],
    ruins: [['Construir mais viadutos para os carros', 'Atrai mais carros.'], ['Liberar as queimadas no entorno da cidade', 'Mais fumaça presa no ar.'], ['Desativar as estações que medem a qualidade do ar', 'Esconde o problema, não resolve.']],
    fim: 'É a <b>inversão térmica</b>, comum no inverno: uma camada de ar quente por cima prende o ar frio e poluído perto do chão. O fenômeno é natural; o perigo vem da poluição.' },
  { hab: 'H19', emo: '🚌', titulo: 'Os trabalhadores levam 3 horas por dia no ônibus da periferia até o centro', cor: '#f6d36b',
    boas: [['Levar empregos, escolas e hospitais para os bairros periféricos', 'Aproxima moradia e trabalho.'], ['Construir moradia popular em áreas centrais com infraestrutura', 'Usa imóveis vazios (função social da propriedade).'], ['Criar corredores exclusivos de ônibus', 'Prioriza o transporte coletivo.']],
    ruins: [['Construir conjuntos habitacionais ainda mais longe do centro', 'Amplia a segregação.'], ['Remover favelas sem oferecer moradia próxima', 'Empurra os pobres para mais longe.'], ['Aumentar a tarifa para reduzir passageiros', 'Exclui quem mais precisa.']],
    fim: '<b>Segregação socioespacial</b>: os pobres são empurrados para periferias com pouca infraestrutura, longe dos empregos. Condomínios fechados de alto padrão são a autossegregação dos ricos.' },
  { hab: 'H28', emo: '🌾', titulo: 'No campo, o solo da lavoura está sendo levado pela chuva e o rio está assoreado', cor: '#c9a26b',
    boas: [['Plantar em curvas de nível e fazer terraços', 'Freiam a enxurrada no terreno inclinado.'], ['Recompor a mata ciliar na beira do rio', 'Segura a margem e filtra a terra.'], ['Usar plantio direto e rotação de culturas', 'A palha protege o solo.']],
    ruins: [['Desmatar até a beira do rio para plantar mais', 'Sem mata ciliar, a terra cai no rio.'], ['Queimar a palha depois da colheita', 'Deixa o solo nu.'], ['Arar morro abaixo, no sentido da descida', 'Cria canais para a enxurrada.']],
    fim: 'Erosão + <b>assoreamento</b>: sem cobertura vegetal, a chuva arrasta o solo para os rios, que ficam rasos e transbordam mais.' }
];
function cena(c) {
  return { tipo: 'sim', hab: c.hab, montar(el, fim) {
    const ops = mix([...c.boas.map(x => [...x, 1]), ...c.ruins.map(x => [...x, 0])]); const marc = new Set();
    el.innerHTML = `<div class="h-item"><span class="emo" aria-hidden="true">${c.emo}</span><h2>${c.titulo}</h2></div>
      <p class="muted" style="margin:0 0 10px">Escolha as <b>3 medidas</b> que realmente resolvem e toque em Aplicar.</p>
      <div class="alts">${ops.map((o, k) => `<button class="alt" type="button" data-m="${k}" aria-pressed="false"><span class="letra">${k + 1}</span><span>${o[0]}</span></button>`).join('')}</div>
      <div class="btn-row" style="margin-top:12px"><button class="btn" type="button" id="aplicar" data-sim disabled>Aplicar medidas</button></div>`;
    const bt = el.querySelector('#aplicar');
    el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { const k = +b.dataset.m;
      if (marc.has(k)) marc.delete(k); else if (marc.size < 3) marc.add(k);
      el.querySelectorAll('[data-m]').forEach(x => { const on = marc.has(+x.dataset.m); x.style.background = on ? '#fff6dd' : ''; x.style.borderWidth = on ? '3px' : ''; x.setAttribute('aria-pressed', on); });
      bt.disabled = marc.size !== 3; });
    bt.onclick = () => {
      if (marc.size !== 3) { const r = mix(ops.map((o, k) => k).filter(k => !marc.has(k))); while (marc.size < 3) marc.add(r.pop()); }
      bt.disabled = true; let certas = 0;
      el.querySelectorAll('[data-m]').forEach(x => { const k = +x.dataset.m, o = ops[k]; x.disabled = true; x.style.background = ''; x.style.borderWidth = '';
        if (o[2]) x.classList.add('certa'); else if (marc.has(k)) x.classList.add('errada');
        if (marc.has(k) && o[2]) certas++;
        x.querySelector('span:last-child').innerHTML = `${o[0]}<br><small style="color:var(--ink-2)">${o[1]}</small>`; });
      fim(certas === 3, `<b>${certas === 3 ? 'Cidade salva! 3 de 3 medidas certas.' : `Você acertou ${certas} de 3. As verdes são as que funcionam.`}</b> ${c.fim}`);
    };
  } };
}
const QS = [
  { hab: 'H19', texto: 'Entre 1960 e 1980, a mecanização das lavouras e a expansão da soja no Sul e no Centro-Oeste foram acompanhadas pela saída de milhões de pessoas do campo.',
    enun: 'Esse processo é conhecido como modernização conservadora porque',
    certa: 'modernizou a técnica sem mudar a estrutura fundiária, mantendo a concentração de terras',
    erradas: ['distribuiu terras aos pequenos agricultores', 'proibiu o uso de máquinas nas grandes fazendas', 'aumentou a população rural do país', 'acabou com as exportações agrícolas'],
    expl: 'Trator, crédito e adubo foram para os grandes proprietários. Pequenos produtores e trabalhadores perderam espaço e migraram para as cidades: <b>êxodo rural</b>.' },
  { hab: 'H28', texto: 'A Revolução Verde, a partir dos anos 1950–60, levou ao mundo sementes de alta produtividade, fertilizantes químicos, agrotóxicos, irrigação e máquinas.',
    enun: 'Um efeito socioambiental negativo associado a esse modelo é',
    certa: 'a contaminação de solos e águas por agrotóxicos e a perda de biodiversidade com a monocultura',
    erradas: ['a queda da produção mundial de grãos', 'o aumento das áreas de floresta nativa', 'a volta da agricultura de subsistência', 'o fim do uso de máquinas no campo'],
    expl: 'A produtividade subiu muito (ponto positivo), mas vieram dependência de insumos caros, agrotóxicos, monocultura e endividamento de pequenos agricultores.' },
  { hab: 'H18', texto: 'O Brasil é um dos maiores exportadores mundiais de soja, carne e minério de ferro. Esses produtos são vendidos a preços definidos nas bolsas internacionais.',
    enun: 'Uma fragilidade de uma economia muito apoiada na exportação de commodities é',
    certa: 'a dependência das oscilações de preço no mercado internacional e da demanda de poucos compradores',
    erradas: ['a impossibilidade de exportar para a China', 'a alta tecnologia embutida nos produtos', 'a falta de terras para a agropecuária', 'o controle total do país sobre os preços'],
    expl: '<b>Commodity</b> = produto primário padronizado, com preço cotado globalmente. Se o preço cai, as exportações e a arrecadação caem juntas. Agregar valor (industrializar) reduz essa fragilidade.' },
  { hab: 'H18', texto: 'Quando um bairro popular perto do centro recebe metrô, cafés e prédios novos, os aluguéis sobem e os antigos moradores se mudam para áreas mais distantes.',
    enun: 'Esse processo é chamado de',
    certa: 'gentrificação', erradas: ['conurbação', 'êxodo rural', 'metropolização', 'macrocefalia urbana'],
    expl: '<b>Gentrificação</b>: a valorização imobiliária expulsa os moradores de baixa renda. <b>Conurbação</b>: cidades que crescem até se juntar. <b>Macrocefalia</b>: crescimento desproporcional das grandes cidades.' },
  { hab: 'H19', texto: 'São Paulo, Guarulhos, Osasco e Santo André cresceram tanto que hoje não se percebe onde termina uma cidade e começa outra.',
    enun: 'O fenômeno descrito é a',
    certa: 'conurbação', erradas: ['gentrificação', 'desmetropolização', 'favelização', 'periferização rural'],
    expl: '<b>Conurbação</b> = a mancha urbana de municípios vizinhos se une. A região metropolitana é a forma institucional de planejar juntos transporte, lixo e água.' },
  { hab: 'H18', texto: 'A região conhecida como Matopiba (Maranhão, Tocantins, Piauí e Bahia) se tornou, nos anos 2000, a nova fronteira da soja no Cerrado.',
    enun: 'A expansão do agronegócio no Matopiba trouxe como consequência socioespacial',
    certa: 'o crescimento de cidades ligadas ao agronegócio e conflitos com comunidades tradicionais pela terra e pela água',
    erradas: ['a redução das exportações de grãos', 'a recuperação do Cerrado nativo', 'a desconcentração fundiária na região', 'o fim da migração para a região'],
    expl: 'Terra barata e plana, chuva regular e logística atraíram grandes produtores. Vieram cidades novas, mas também desmatamento do Cerrado e pressão sobre povos tradicionais.' }
];
HUM.jogo({ id: 'hum-campo-cidade', proximo: ['hum-fabrica.html', 'Fábrica do tempo'],
  fila: () => { const c = mix(CENAS).slice(0, 4).map(cena), q = mix(QS).slice(0, 5).map(x => Object.assign({ tipo: 'mc' }, x));
    return [c[0], q[0], q[1], c[1], q[2], c[2], q[3], c[3], q[4]]; } });
