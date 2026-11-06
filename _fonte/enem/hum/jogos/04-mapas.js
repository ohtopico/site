/* META {
  "id": "hum-mapas", "icone": "🧭", "titulo": "Laboratório de mapas", "tipo": "simulador",
  "intro": "Um simulador de cartografia: calcule distâncias com a escala, descubra a hora em outro país pelos fusos, ache pontos pelas coordenadas, leia climogramas e escolha a projeção certa. São as contas e leituras de mapa que mais caem em Humanas.",
  "resumo": "Escala, fusos horários, coordenadas, projeções e climogramas, com contas geradas na hora.",
  "habs": ["H6", "H26", "H29"],
  "cola": [
    ["Escala:", "1 : 100.000 quer dizer que 1 cm no mapa vale 100.000 cm = 1 km no real. Truque: corte cinco zeros do denominador e você tem quantos km vale 1 cm. Escala grande (denominador pequeno) = mais detalhe, área menor."],
    ["Fusos:", "360° ÷ 24 h = 15° por hora. A Terra gira para leste, então quem está a leste está adiantado (soma horas); a oeste, atrasado (subtrai). Brasília = UTC−3."],
    ["Coordenadas:", "latitude = norte (N) ou sul (S) do Equador, de 0° a 90°. Longitude = leste (L) ou oeste (O) de Greenwich, de 0° a 180°."],
    ["Projeções:", "Mercator (conforme) mantém as formas e infla as áreas perto dos polos. Peters (equivalente) mantém as áreas e deforma as formas. Azimutal (plana) parte de um ponto central, como a bandeira da ONU."]
  ]
} */
const { sorteia: S, mix } = HUM;
const fmt = n => n.toLocaleString('pt-BR');

/* ---------- escala (simulador com régua) ---------- */
const ESCALAS = [50000, 100000, 200000, 250000, 500000, 1000000, 2000000, 5000000];
function svgRegua(d) {
  const px = d * 38, x0 = 40;
  const marcas = Array.from({ length: d + 1 }, (_, k) => `<line x1="${x0 + k * 38}" y1="150" x2="${x0 + k * 38}" y2="${k % 5 ? 160 : 166}" stroke="#1d2a1f" stroke-width="1.5"/><text x="${x0 + k * 38}" y="180" font-size="11" text-anchor="middle" fill="#1d2a1f">${k}</text>`).join('');
  return `<svg viewBox="0 0 ${Math.max(560, px + 80)} 200" role="img" aria-label="Mapa com duas cidades e uma régua de ${d} centímetros">
    <rect width="100%" height="200" fill="#e8f4ea"/><path d="M0 70 C120 40 220 110 340 60 S520 90 ${Math.max(560, px + 80)} 50" stroke="#7cc3e8" stroke-width="10" fill="none"/>
    <path d="M${x0} 110 L${x0 + px} 110" stroke="#c4392a" stroke-width="3" stroke-dasharray="6 5"/>
    <circle cx="${x0}" cy="110" r="9" fill="#2a5fa8"/><text x="${x0}" y="95" text-anchor="middle" font-weight="700" font-size="14">A</text>
    <circle cx="${x0 + px}" cy="110" r="9" fill="#2a5fa8"/><text x="${x0 + px}" y="95" text-anchor="middle" font-weight="700" font-size="14">B</text>
    <rect x="${x0 - 6}" y="140" width="${px + 12}" height="30" rx="4" fill="#fff6dd" stroke="#1d2a1f"/>${marcas}<text x="${x0 + px + 14}" y="160" font-size="12">cm</text></svg>`;
}
const escalaSim = () => ({ tipo: 'sim', hab: 'H6', montar(el, fim) {
  const N = S(ESCALAS), d = 2 + Math.floor(Math.random() * 10), km = d * N / 100000;
  el.innerHTML = `<div class="h-fig">${svgRegua(d)}</div><div class="h-sim">
    <div class="q-enun" style="margin:0">No mapa, a distância entre as cidades A e B é de <b>${d} cm</b>. A escala é <b>1 : ${fmt(N)}</b>. Qual a distância real, em km?</div>
    <div class="btn-row" style="align-items:center"><input type="number" inputmode="decimal" step="any" id="resp" aria-label="Distância em km"> <span>km</span>
    <button class="btn" type="button" data-sim id="conf">Conferir</button></div></div>`;
  el.querySelector('#conf').onclick = () => {
    const v = parseFloat(String(el.querySelector('#resp').value).replace(',', '.')); const ok = Math.abs(v - km) <= km * 0.01;
    el.querySelector('#conf').disabled = true; el.querySelector('#resp').disabled = true;
    fim(ok, `<b>${ok ? 'Isso!' : 'Resposta: ' + fmt(km) + ' km.'}</b> 1 cm = ${fmt(N)} cm = ${fmt(N / 100000)} km (corte cinco zeros). Então ${d} cm × ${fmt(N / 100000)} km = <b>${fmt(km)} km</b>.`);
  };
} });
const escalaInv = () => { const N = S(ESCALAS), d = S([2, 4, 5, 8, 10]), km = d * N / 100000;
  return { tipo: 'mc', hab: 'H6', enun: `Duas cidades que ficam a ${fmt(km)} km uma da outra aparecem a ${d} cm de distância num mapa. A escala desse mapa é`,
    certa: `1 : ${fmt(N)}`, erradas: [`1 : ${fmt(N * 10)}`, `1 : ${fmt(N / 10)}`, `1 : ${fmt(km * d)}`, `1 : ${fmt(N * d)}`],
    expl: `Passe tudo para cm: ${fmt(km)} km = ${fmt(km * 100000)} cm. Divida pela distância no mapa: ${fmt(km * 100000)} ÷ ${d} = <b>${fmt(N)}</b>.` }; };
const escalaMaior = () => ({ tipo: 'mc', hab: 'H6', enun: 'Um engenheiro precisa de uma planta com o maior nível de detalhe possível de um bairro. Ele deve usar a escala',
  certa: '1 : 2.000', erradas: ['1 : 250.000', '1 : 1.000.000', '1 : 50.000.000', '1 : 100.000'],
  expl: '<b>Escala grande = denominador pequeno</b> = mais detalhe e área menor (planta de casa, bairro). Escala pequena = denominador grande = área maior e menos detalhe (mapa-múndi).' });

/* ---------- fusos ---------- */
const CIDADES = [['Los Angeles', -8, '🇺🇸'], ['Nova York', -5, '🇺🇸'], ['Rio Branco', -5, '🇧🇷'], ['Manaus', -4, '🇧🇷'], ['Brasília', -3, '🇧🇷'], ['Fernando de Noronha', -2, '🇧🇷'],
  ['Londres', 0, '🇬🇧'], ['Paris', 1, '🇫🇷'], ['Moscou', 3, '🇷🇺'], ['Dubai', 4, '🇦🇪'], ['Pequim', 8, '🇨🇳'], ['Tóquio', 9, '🇯🇵'], ['Sydney', 10, '🇦🇺']];
const hora = h => `${((h % 24) + 24) % 24}h`;
function svgFusos(a, b) {
  const x = o => 30 + (o + 9) * 26;
  const faixas = Array.from({ length: 20 }, (_, k) => `<rect x="${17 + k * 26}" y="40" width="26" height="70" fill="${k % 2 ? '#d7eef8' : '#bfe3f2'}"/><text x="${30 + k * 26}" y="126" font-size="11" text-anchor="middle" fill="#5a6a5c">${k - 9 > 0 ? '+' : ''}${k - 9}</text>`).join('');
  const pin = (c, y) => `<line x1="${x(c[1])}" y1="${y + 8}" x2="${x(c[1])}" y2="110" stroke="#1d2a1f" stroke-width="1.5"/><circle cx="${x(c[1])}" cy="${y}" r="8" fill="${y < 60 ? '#e85c4a' : '#2a5fa8'}"/><text x="${x(c[1])}" y="${y - 12}" font-size="15" font-weight="700" text-anchor="middle">${c[0]}</text>`;
  return `<svg viewBox="0 0 560 140" role="img" aria-label="Faixa de fusos horários com ${a[0]} e ${b[0]}"><rect width="560" height="140" fill="#fff"/>${faixas}
    <text x="20" y="22" font-size="13" fill="#5a6a5c">⟵ oeste (atrasado)</text><text x="540" y="22" font-size="13" fill="#5a6a5c" text-anchor="end">leste (adiantado) ⟶</text>
    ${pin(a, 58)}${pin(b, 86)}<text x="280" y="138" font-size="10" text-anchor="middle" fill="#5a6a5c">fuso em relação a Greenwich (UTC)</text></svg>`;
}
const fuso = () => { const a = Math.random() < .6 ? CIDADES[4] : S(CIDADES); let b; do { b = S(CIDADES); } while (b[1] === a[1]);
  const h = 6 + Math.floor(Math.random() * 12), dif = b[1] - a[1], certa = hora(h + dif);
  const voo = Math.random() < .4 ? 2 + Math.floor(Math.random() * 10) : 0;
  const enun = voo ? `Um avião sai de <b>${a[0]}</b> às <b>${h}h</b> (hora local) e o voo dura <b>${voo} horas</b>. Que horas serão em <b>${b[0]}</b> na chegada?` :
    `Quando são <b>${h}h</b> em <b>${a[0]}</b>, que horas são em <b>${b[0]}</b>?`;
  const r = hora(h + dif + voo);
  return { tipo: 'mc', hab: 'H6', fig: svgFusos(a, b), enun, certa: r, erradas: [hora(h - dif + voo), hora(h + voo), hora(h + dif + voo + 1), hora(h + dif + voo - 1), hora(h + dif)].filter(x => x !== r),
    expl: `${b[0]} está ${Math.abs(dif)} fuso${Math.abs(dif) > 1 ? 's' : ''} a ${dif > 0 ? '<b>leste</b> (adiantado, some)' : '<b>oeste</b> (atrasado, subtraia)'}: ${h}h ${dif > 0 ? '+' : '−'} ${Math.abs(dif)}h${voo ? ` + ${voo}h de voo` : ''} = <b>${r}</b>.` }; };
const longitude = () => { const g = S([15, 30, 45, 60, 75, 90, 120, 135]);
  return { tipo: 'mc', hab: 'H6', enun: `Duas cidades estão separadas por ${g}° de longitude. A diferença de horário entre elas, pelos fusos teóricos, é de`,
    certa: `${g / 15} h`, erradas: [`${g / 10} h`, `${g / 30} h`, `${g / 15 + 1} h`, `${g} min`].filter(x => x !== `${g / 15} h`),
    expl: `A Terra gira 360° em 24 h: <b>15° por hora</b>. ${g}° ÷ 15° = <b>${g / 15} h</b>.` }; };

/* ---------- coordenadas ---------- */
const lt = v => v === 0 ? '0°' : `${Math.abs(v)}° ${v > 0 ? 'N' : 'S'}`, lg = v => v === 0 ? '0°' : `${Math.abs(v)}° ${v > 0 ? 'L' : 'O'}`;
const coord = () => { const la = S([15, 30, 45]), lo = S([30, 45, 60, 75]);
  const pts = mix([[la, lo], [-la, lo], [la, -lo], [-la, -lo]]), alvo = S(pts), k = pts.indexOf(alvo);
  const X = v => 280 + v * 2.8, Y = v => 130 - v * 2.2;
  let g = ''; for (let v = -60; v <= 60; v += 15) g += `<line x1="28" y1="${Y(v)}" x2="532" y2="${Y(v)}" stroke="${v ? '#cfd8d2' : '#c4392a'}" stroke-width="${v ? 1 : 2}"/><text x="24" y="${Y(v) + 4}" font-size="13" text-anchor="end">${lt(v)}</text>`;
  for (let v = -90; v <= 90; v += 15) g += `<line x1="${X(v)}" y1="0" x2="${X(v)}" y2="262" stroke="${v ? '#cfd8d2' : '#2a5fa8'}" stroke-width="${v ? 1 : 2}"/>${v % 30 === 0 ? `<text x="${X(v)}" y="280" font-size="13" text-anchor="middle">${lg(v)}</text>` : ''}`;
  const p = pts.map((q, i) => `<circle cx="${X(q[1])}" cy="${Y(q[0])}" r="13" fill="#f6b73c" stroke="#1d2a1f" stroke-width="2"/><text x="${X(q[1])}" y="${Y(q[0]) + 4.5}" font-size="15" font-weight="800" text-anchor="middle">${'ABCD'[i]}</text>`).join('');
  const fig = `<svg viewBox="-22 0 582 290" role="img" aria-label="Grade de coordenadas com os pontos A, B, C e D"><rect width="560" height="284" fill="#eaf6fb"/>${g}
    <text x="536" y="${Y(0) - 5}" font-size="12" fill="#c4392a" text-anchor="end">Equador</text><text x="${X(0) + 4}" y="12" font-size="12" fill="#2a5fa8">Greenwich</text>${p}</svg>`;
  return { tipo: 'bins', hab: 'H6', fig, item: `Qual ponto está em ${lt(alvo[0])} e ${lg(alvo[1])}?`, opcoes: ['Ponto A', 'Ponto B', 'Ponto C', 'Ponto D'], certa: k,
    expl: `Primeiro a <b>latitude</b> (acima do Equador = N, abaixo = S); depois a <b>longitude</b> (à direita de Greenwich = L, à esquerda = O). ${lt(alvo[0])} e ${lg(alvo[1])} é o ponto <b>${'ABCD'[k]}</b>.` }; };

/* ---------- projeções ---------- */
const PROJ = [
  ['A Groenlândia parece do tamanho da América do Sul, mas é cerca de 8 vezes menor.', 0, 'Na <b>Mercator</b>, os paralelos se afastam perto dos polos e as áreas de alta latitude ficam infladas.'],
  ['Mantém os ângulos e as formas dos continentes; foi muito usada na navegação do século XVI.', 0, 'A <b>Mercator</b> (1569) é <b>conforme</b>: linhas de rumo retas, ótima para navegar. Também foi criticada por ser eurocêntrica.'],
  ['Mantém a proporção entre as áreas, mas os continentes parecem esticados na vertical perto do Equador.', 1, 'A <b>Peters</b> (1973) é <b>equivalente</b>: dá à África e à América do Sul o tamanho real, por isso é associada a uma visão terceiro-mundista.'],
  ['Foi defendida como crítica à visão eurocêntrica, por mostrar os países do Sul com seu tamanho real.', 1, 'A <b>Peters</b> privilegia as áreas e “aumenta” visualmente o hemisfério sul em relação à Mercator.'],
  ['Projeta a Terra num plano a partir de um ponto central, como na bandeira da ONU, centrada no Polo Norte.', 2, 'A <b>azimutal</b> (plana) mostra bem as distâncias a partir do centro: usada em rotas aéreas e mapas polares.'],
  ['As distâncias e direções a partir do ponto central são corretas, e a deformação aumenta para as bordas.', 2, 'Característica da projeção <b>azimutal</b>, útil para alcance de mísseis, aviões e antenas.']
];
const proj = () => { const [t, c, x] = S(PROJ); return { tipo: 'bins', hab: 'H6', emo: '🌐', item: t, pergunta: 'Qual projeção?', opcoes: ['Mercator (cilíndrica conforme)', 'Peters (cilíndrica equivalente)', 'Azimutal (plana)'], certa: c, expl: x }; };

/* ---------- climogramas ---------- */
const CLIMAS = [
  ['Equatorial (Manaus)', [27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 27], [260, 290, 310, 290, 220, 110, 80, 60, 80, 110, 170, 220], 'Quente o ano todo (amplitude térmica pequena) e chuvoso em quase todos os meses: massa equatorial continental.'],
  ['Tropical (Brasília)', [22, 22, 22, 21, 20, 19, 19, 21, 22, 22, 22, 22], [210, 180, 210, 120, 40, 10, 10, 15, 50, 160, 230, 250], 'Duas estações bem definidas: <b>verão chuvoso e inverno seco</b>. É o clima do Cerrado.'],
  ['Semiárido (Petrolina)', [27, 27, 27, 26, 25, 24, 24, 25, 27, 28, 28, 28], [80, 90, 120, 60, 15, 8, 5, 3, 5, 10, 50, 70], 'Muito quente e com <b>pouca chuva, concentrada em poucos meses</b> e irregular (menos de 800 mm por ano). É o clima da Caatinga.'],
  ['Subtropical (Santa Maria, RS)', [25, 24, 22, 19, 16, 13, 13, 14, 16, 19, 21, 24], [140, 130, 120, 140, 130, 130, 140, 120, 150, 160, 120, 130], '<b>Chuva bem distribuída</b> o ano todo e <b>inverno frio</b> (grande amplitude térmica anual). Típico do Sul.'],
  ['Tropical litorâneo (Salvador)', [27, 27, 27, 26, 25, 24, 24, 24, 25, 26, 26, 26], [70, 110, 150, 300, 300, 220, 180, 120, 90, 100, 110, 100], 'Quente o ano todo, com <b>mais chuva no outono e no inverno</b> (abril a julho), trazida pela massa tropical atlântica e frentes frias. Litoral do Nordeste.']
];
function svgClima(T, P) {
  const bx = k => 50 + k * 38, py = v => 210 - v * 0.55, ty = v => 210 - v * 5.5;
  const meses = 'JFMAMJJASOND'.split('');
  const barras = P.map((v, k) => `<rect x="${bx(k) + 4}" y="${py(v)}" width="28" height="${v * 0.55}" fill="#5aa7e0"/><text x="${bx(k) + 18}" y="228" font-size="14" text-anchor="middle">${meses[k]}</text>`).join('');
  const linha = T.map((v, k) => `${bx(k) + 18},${ty(v)}`).join(' ');
  let eixos = ''; for (let v = 0; v <= 350; v += 50) eixos += `<text x="44" y="${py(v) + 4}" font-size="12" text-anchor="end">${v}</text><line x1="48" x2="508" y1="${py(v)}" y2="${py(v)}" stroke="#eee"/>`;
  for (let v = 0; v <= 35; v += 5) eixos += `<text x="514" y="${ty(v) + 4}" font-size="12" fill="#c4392a">${v}</text>`;
  return `<svg viewBox="0 0 560 240" role="img" aria-label="Climograma com chuva mensal em barras e temperatura em linha"><rect width="560" height="240" fill="#fff"/>${eixos}${barras}
    <polyline points="${linha}" fill="none" stroke="#e85c4a" stroke-width="3"/>${T.map((v, k) => `<circle cx="${bx(k) + 18}" cy="${ty(v)}" r="3.5" fill="#e85c4a"/>`).join('')}
    <text x="8" y="14" font-size="13" fill="#2a5fa8">chuva (mm)</text><text x="552" y="14" font-size="13" fill="#c4392a" text-anchor="end">temperatura (°C)</text></svg>`;
}
const clima = () => { const c = S(CLIMAS), ops = mix([c, ...mix(CLIMAS.filter(x => x !== c)).slice(0, 3)]);
  return { tipo: 'bins', hab: 'H26', fig: svgClima(c[1], c[2]), item: 'Que clima este climograma representa?', pergunta: 'Barras azuis = chuva do mês. Linha vermelha = temperatura média.', opcoes: ops.map(x => x[0]), certa: ops.indexOf(c), expl: c[3] }; };

/* ---------- ocupação e recursos ---------- */
const OCUP = [
  { hab: 'H26', texto: '“Sendo grandes conquistadores de terras, não se aproveitam delas, mas contentam-se de as andar arranhando ao longo do mar como caranguejos.”<cite>Frei Vicente do Salvador, <i>História do Brasil</i>, 1627.</cite>',
    enun: 'O padrão de ocupação descrito pelo frei explica-se principalmente',
    certa: 'pela economia voltada à exportação, que precisava dos portos, e pela dificuldade de penetrar no interior',
    erradas: ['pela proibição indígena de ocupar o litoral', 'pela ausência de terras férteis perto da costa', 'pela industrialização das cidades litorâneas', 'pelo interesse dos colonos na mineração do litoral'],
    expl: 'O açúcar seguia para a Europa pelos portos, e a Serra do Mar dificultava a entrada. Só com o ouro (séc. XVIII), as bandeiras e o gado a ocupação avançou para o interior. Até hoje a população se concentra perto do litoral.' },
  { hab: 'H29', texto: 'Cerca de 60% da eletricidade brasileira vem de usinas hidrelétricas, que aproveitam os rios de planalto. Eólica e solar crescem rápido, sobretudo no Nordeste.',
    enun: 'Um impacto socioespacial típico da construção de grandes hidrelétricas, como Belo Monte (PA), é',
    certa: 'o alagamento de áreas e o deslocamento de ribeirinhos e povos indígenas',
    erradas: ['a emissão de grandes quantidades de enxofre na atmosfera', 'o risco de vazamento radioativo', 'o esgotamento rápido do recurso hídrico', 'a desertificação imediata da bacia do rio'],
    expl: 'Hidrelétrica é <b>renovável</b>, mas não sem impacto: o reservatório inunda florestas e terras, altera a pesca e expulsa populações. Chuva fraca também ameaça a geração (crise hídrica).' },
  { hab: 'H29', texto: 'A cidade de Parauapebas (PA) cresceu de um povoado para mais de 250 mil habitantes depois da instalação da mina de Carajás, uma das maiores reservas de minério de ferro do mundo.',
    enun: 'O caso mostra que os recursos naturais',
    certa: 'atraem investimentos, migrantes e infraestrutura, reorganizando o espaço geográfico',
    erradas: ['não têm relação com a urbanização', 'só geram riqueza quando o recurso é renovável', 'impedem a formação de cidades por causa da poluição', 'são explorados sem nenhuma alteração da paisagem'],
    expl: 'A mineração trouxe ferrovia (Carajás–São Luís), migrantes e cidades novas, mas também desmatamento e conflitos por terra. Recurso natural <b>produz espaço</b>.' },
  { hab: 'H26', texto: 'Muitas cidades brasileiras, como São Paulo, Recife e Porto Alegre, nasceram às margens de rios. Com o crescimento, esses rios foram retificados, canalizados e cobertos por avenidas.',
    enun: 'Uma consequência dessa forma de ocupação é',
    certa: 'o aumento das enchentes, porque a água da chuva escoa mais rápido e as várzeas foram ocupadas',
    erradas: ['a diminuição das enchentes, já que o rio ficou escondido', 'o aumento da infiltração da água no solo', 'a recuperação da mata ciliar', 'a redução da temperatura nas áreas centrais'],
    expl: 'Asfalto e concreto <b>impermeabilizam</b> o solo; a várzea, que é o espaço natural de cheia do rio, virou rua e casa. Resultado: alagamento.' }
];
HUM.jogo({ id: 'hum-mapas', proximo: ['hum-geopolitica.html', 'Tabuleiro geopolítico'],
  fila: () => { const o = mix(OCUP).slice(0, 2).map(q => Object.assign({ tipo: 'mc' }, q));
    return [escalaSim(), fuso(), coord(), clima(), proj(), o[0], escalaSim(), fuso(), S([escalaInv, escalaMaior, longitude])(), clima(), o[1]]; } });
