/* ☢️ Contador de meia-vida: decaimento radioativo, emissões alfa, beta e gama, usos e riscos da radiação. */
(function () {
  const { sorteia, num, f } = NAT;

  // 100 átomos numa grade; os decaídos ficam cinza. A ordem dos que decaem é fixa por sessão para a animação ser estável.
  const ordem = ENEM.embaralha(Array.from({ length: 100 }, (_, k) => k));
  function grade(frac, x0 = 10) {
    const vivos = Math.round(frac * 100), vivo = new Set(ordem.slice(0, vivos));
    let s = '';
    for (let k = 0; k < 100; k++) s += `<circle cx="${x0 + 12 + (k % 10) * 19}" cy="${22 + Math.floor(k / 10) * 19}" r="7.5" fill="${vivo.has(k) ? '#4bb259' : '#d9d4c4'}" stroke="#1d2a1f" stroke-width="${vivo.has(k) ? 1.5 : .8}"/>`;
    return s;
  }
  function curva(n, rotT = 'meias-vidas') {
    const X = t => 250 + t / 6 * 210, Y = p => 200 - p * 180, pts = [];
    for (let k = 0; k <= 60; k++) { const t = k / 10; pts.push(`${X(t).toFixed(1)},${Y(Math.pow(0.5, t)).toFixed(1)}`); }
    return `<path d="M250 20 V200 H462" stroke="#1d2a1f" stroke-width="2" fill="none"/>
      ${[1, 2, 3, 4, 5, 6].map(t => `<text x="${X(t)}" y="214" text-anchor="middle" class="fino" style="font-size:11px">${t}</text>`).join('')}
      ${[1, .5, .25].map(p => `<text x="246" y="${Y(p) + 4}" text-anchor="end" class="fino" style="font-size:11px">${num(p * 100)}%</text><path d="M250 ${Y(p)} H${X(Math.log2(1 / p))}" stroke="#d9c99a" stroke-dasharray="3 3"/>`).join('')}
      <polyline points="${pts.join(' ')}" fill="none" stroke="#e07bb0" stroke-width="3.5"/>
      <circle cx="${X(n)}" cy="${Y(Math.pow(0.5, n))}" r="6" fill="#e85c4a" stroke="#1d2a1f" stroke-width="2"/>
      <text x="460" y="234" text-anchor="end" class="fino" style="font-size:11px">${rotT}</text>`;
  }
  const painel = n => `<svg class="fig" viewBox="0 0 480 240" role="img" aria-label="Decaimento depois de ${num(n)} meias-vidas">${grade(Math.pow(0.5, n))}${curva(n)}</svg>`;

  const ELEM = [[92, 238, 'U', 'urânio'], [88, 226, 'Ra', 'rádio'], [86, 222, 'Rn', 'radônio'], [84, 210, 'Po', 'polônio'], [6, 14, 'C', 'carbono'], [55, 137, 'Cs', 'césio'], [53, 131, 'I', 'iodo'], [90, 234, 'Th', 'tório']];
  const USOS = [
    ['Datar um fóssil ou um pedaço de madeira de um sítio arqueológico', 'Carbono-14, comparando quanto ainda resta com o de um ser vivo', 'Enquanto vivo, o ser absorve C-14; depois que morre, o C-14 só diminui, com meia-vida de ~5 730 anos.'],
    ['Tratar um tumor destruindo as células doentes', 'Radioterapia com raios gama (por exemplo, do cobalto-60)', 'A radiação ionizante danifica o DNA das células do tumor, que se multiplicam muito.'],
    ['Aumentar a validade de frutas e temperos', 'Irradiação com raios gama, que mata microrganismos e não deixa o alimento radioativo', 'O alimento é exposto à radiação, mas não recebe material radioativo. É <b>irradiação</b>, não contaminação.'],
    ['Fazer exame e tratamento da tireoide', 'Iodo-131, que a tireoide absorve naturalmente', 'A tireoide acumula iodo; o I-131 emite radiação ali e permite imagem ou tratamento. Meia-vida de 8 dias.'],
    ['Gerar eletricidade numa usina como Angra', 'Fissão nuclear do urânio, que aquece água e move turbinas', 'O núcleo de urânio se divide, libera muito calor e nêutrons (reação em cadeia controlada).'],
    ['Explicar a energia que o Sol emite', 'Fusão nuclear de hidrogênio formando hélio', 'Fusão junta núcleos leves; fissão quebra núcleos pesados. O Sol é fusão.']
  ];

  NAT.jogo({
    id: 'nat-radioatividade', area: 'qui', icone: '☢️', titulo: 'Contador de meia-vida',
    intro: 'Avance o tempo e veja os átomos radioativos decaírem: a cada meia-vida, metade some. Depois resolva desafios de massa restante, emissões alfa e beta, e usos e riscos da radiação.',
    habs: ['H22', 'H19', 'H26'],
    cola: ['<b>Meia-vida</b>: tempo para restar <b>metade</b><br>100% → 50% → 25% → 12,5%…', '<b>m = m₀ / 2ⁿ</b><br>n = número de meias-vidas = tempo ÷ T½', '<b>Alfa (α)</b>: ₂He⁴ · A − 4 e Z − 2<br>pouco penetrante, papel barra',
      '<b>Beta (β)</b>: elétron · A igual e Z + 1<br>alumínio fino barra', '<b>Gama (γ)</b>: onda eletromagnética<br>muito penetrante, chumbo e concreto', '<b>Fissão</b>: quebra (usina) · <b>Fusão</b>: junta (Sol)'],
    lab: {
      titulo: 'Cem átomos de césio-137 (T½ ≈ 30 anos)', texto: 'Não dá para saber qual átomo vai decair, mas dá para saber quantos: a cada meia-vida, metade dos que restam se transforma.',
      controles: [{ id: 'n', rotulo: 'Tempo passado', min: 0, max: 6, passo: 0.5, valor: 1, fmt: n => `${num(n)} meias-vidas (${num(n * 30)} anos)` }],
      desenhar({ n }) {
        const p = Math.pow(0.5, n);
        return { svg: painel(n), leitura: [`Restam <b>${num(p * 100, 1)}%</b> (≈ ${Math.round(p * 100)} átomos verdes)`, `Fórmula: 100 ÷ 2<sup>${num(n)}</sup>`, n >= 6 ? 'Depois de ~10 meias-vidas resta menos de 0,1%. Por isso o lixo radioativo exige guarda por séculos.' : 'A curva nunca chega a zero, só fica cada vez mais perto.'] };
      }
    },
    desafios: [
      () => {
        const T = sorteia([8, 30, 5, 12]), n = sorteia([2, 3, 4]), m0 = sorteia([80, 160, 200, 400, 640]), un = T === 8 ? 'dias' : 'anos';
        return { hab: 'H22', fig: painel(n), enun: `Um material tem ${m0} g de um isótopo com meia-vida de ${T} ${un}. Quanto desse isótopo resta depois de ${n * T} ${un}?`,
          certa: num(m0 / 2 ** n, 2) + ' g', erradas: [num(m0 / (2 * n), 2) + ' g', num(m0 - m0 / 2 ** n, 2) + ' g', num(m0 / n, 2) + ' g', num(m0 / 2 ** (n + 1), 2) + ' g', num(m0 / 2, 2) + ' g'],
          expl: `${n * T} ${un} ÷ ${T} = ${n} meias-vidas. ${f(`${m0} → ${Array.from({ length: n }, (_, k) => num(m0 / 2 ** (k + 1), 2)).join(' → ')} g`)}. Erro comum: dividir por ${2 * n} em vez de dividir por 2 ${n} vezes.` };
      },
      () => {
        const [p, n] = sorteia([[25, 2], [12.5, 3], [6.25, 4], [50, 1]]), T = sorteia([5730, 8, 30, 1600]), un = T === 8 ? 'dias' : 'anos';
        return { hab: 'H22', enun: `Um isótopo tem meia-vida de ${num(T)} ${un}. Quanto tempo leva para restar ${num(p)}% da quantidade inicial?`,
          certa: num(n * T) + ' ' + un, erradas: [num(T * (100 - p) / 50) + ' ' + un, num(T * 100 / p) + ' ' + un, num(T / n) + ' ' + un, num((n + 1) * T) + ' ' + un, num(T / 2) + ' ' + un, num(n * T * 2) + ' ' + un, num(n * T + T / 2) + ' ' + un],
          expl: `100% → 50% → 25% → 12,5% → 6,25%: para chegar a ${num(p)}% são ${n} meia(s)-vida(s). ${f(`${n} × ${num(T)} = ${num(n * T)} ${un}`)}.` };
      },
      () => {
        const [Z, A, s, nome] = sorteia(ELEM.filter(e => e[0] > 50)), tipo = sorteia(['alfa', 'beta']);
        const [Z2, A2] = tipo === 'alfa' ? [Z - 2, A - 4] : [Z + 1, A];
        return { hab: 'H22', enun: `O ${nome}-${A} (Z = ${Z}) emite uma partícula <b>${tipo}</b>. Qual é o número atômico (Z) e o número de massa (A) do núcleo formado?`,
          certa: `Z = ${Z2} e A = ${A2}`, erradas: [`Z = ${Z + 2} e A = ${A + 4}`, `Z = ${Z - 1} e A = ${A}`, `Z = ${Z - 4} e A = ${A - 2}`, `Z = ${Z} e A = ${A - 4}`, `Z = ${Z - 2} e A = ${A - 4}`, `Z = ${Z + 1} e A = ${A}`],
          expl: tipo === 'alfa' ? `A partícula alfa é um núcleo de hélio (2 prótons + 2 nêutrons): ${f(`Z − 2 = ${Z2} e A − 4 = ${A2}`)}.` : `Na emissão beta, um nêutron vira próton e solta um elétron: ${f(`Z + 1 = ${Z2} e A continua ${A2}`)}.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(USOS);
        return { hab: 'H19', enun: `Qual técnica nuclear serve para: ${sit.toLowerCase()}?`, certa: cert, erradas: USOS.filter(u => u[1] !== cert).map(u => u[1]), expl };
      },
      () => {
        const q = sorteia([
          ['Qual radiação precisa de paredes grossas de chumbo ou concreto para ser barrada?', 'Gama', ['Alfa', 'Beta', 'Infravermelho'], 'Gama é onda eletromagnética de altíssima energia, sem carga e sem massa: atravessa muito. Alfa é barrada por uma folha de papel; beta, por alumínio fino.'],
          ['No acidente de Goiânia (1987), pessoas tocaram e espalharam o pó de césio-137 de um aparelho abandonado. O maior problema foi…', 'a contaminação: o material radioativo grudou no corpo e nos objetos e continuou emitindo radiação', ['a irradiação de alimentos, que ficaram radioativos', 'a explosão nuclear causada pelo césio', 'a radiação de micro-ondas liberada pelo aparelho'], '<b>Contaminação</b> é ter o material radioativo em você. <b>Irradiação</b> é só ser exposto à radiação, sem ficar com o material. O césio foi espalhado e contaminou casas, pessoas e o solo.'],
          ['Um ponto positivo e um negativo da energia nuclear, comparada à termelétrica a carvão, são:', 'não emite CO₂ na geração, mas produz rejeitos radioativos de longa duração', ['é renovável, mas emite muito CO₂', 'não tem riscos, mas é cara', 'emite SO₂ e causa chuva ácida, mas é barata'], 'A usina nuclear não queima nada, então não emite gases de efeito estufa na operação. O desafio é guardar o lixo radioativo e evitar acidentes.'],
          ['Por que a radiação ionizante é perigosa para os seres vivos?', 'Porque arranca elétrons das moléculas e pode danificar o DNA, causando mutações e câncer', ['Porque aquece o corpo como um forno', 'Porque deixa o corpo magnético', 'Porque destrói os átomos e faz a matéria desaparecer'], 'Ionizar é arrancar elétron. No DNA isso quebra ligações e pode gerar mutações. Por isso o técnico de raio X sai da sala.']]);
        return { hab: 'H26', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      }
    ]
  });
})();
