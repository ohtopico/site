/* ⚡ Usinas e energia: conservação da energia mecânica, transformações nas usinas, impactos e rendimento. */
(function () {
  const { sorteia, num, f } = NAT;

  function rampa(h, atr, v) {
    const H = 30 + h * 3.4, topo = 180 - H;
    const ep = 100, ec = 100 - atr, x = 80 + Math.min(1, v / 40) * 0;
    return `<svg class="fig" viewBox="0 0 480 230" role="img" aria-label="Skatista descendo uma rampa de ${h} metros">
      <path d="M30 ${topo} Q150 ${topo} 200 180 L360 180" fill="none" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
      <path d="M30 ${topo} Q150 ${topo} 200 180 L360 180 L360 200 L30 200 Z" fill="#f3e2b0" opacity=".7"/>
      <text x="40" y="${topo - 8}" style="font-size:28px">🛹</text><text x="320" y="174" style="font-size:28px">🛹</text>
      <path d="M20 ${topo} V180" stroke="#2a5fa8" stroke-width="2" stroke-dasharray="4 4"/><text x="14" y="${(topo + 180) / 2}" text-anchor="end" style="fill:#2a5fa8">h</text>
      <g transform="translate(390 40)">
        <text x="14" y="-6" text-anchor="middle" class="fino" style="font-size:12px">alto</text><rect x="0" y="0" width="28" height="140" rx="4" fill="#e7e2d2"/><rect x="0" y="${140 - ep * 1.4}" width="28" height="${ep * 1.4}" rx="4" fill="#3f8fe0"/>
        <text x="14" y="156" text-anchor="middle" style="font-size:11px">Ep</text>
        <text x="58" y="-6" text-anchor="middle" class="fino" style="font-size:12px">baixo</text><rect x="44" y="0" width="28" height="140" rx="4" fill="#e7e2d2"/><rect x="44" y="${140 - ec * 1.4}" width="28" height="${ec * 1.4}" rx="4" fill="#e85c4a"/>
        ${atr ? `<rect x="44" y="${140 - 140}" width="28" height="${atr * 1.4}" rx="4" fill="#f6b73c"/>` : ''}
        <text x="58" y="156" text-anchor="middle" style="font-size:11px">Ec${atr ? '+calor' : ''}</text></g></svg>`;
  }

  const USINAS = {
    'Hidrelétrica': ['potencial gravitacional → cinética → elétrica', 'Alagamento de grandes áreas, perda de habitat e deslocamento de populações ribeirinhas', true],
    'Termelétrica a carvão': ['química → térmica → cinética → elétrica', 'Emissão de CO₂ (efeito estufa) e de SO₂, que causa chuva ácida', false],
    'Usina nuclear': ['nuclear → térmica → cinética → elétrica', 'Produção de lixo radioativo que precisa ser guardado por séculos', false],
    'Usina eólica': ['cinética (do vento) → elétrica', 'Ruído, impacto na paisagem e risco de colisão de aves', true],
    'Usina solar fotovoltaica': ['luminosa → elétrica', 'Ocupação de grandes áreas e descarte dos painéis; só gera de dia', true],
    'Termelétrica a biomassa (bagaço de cana)': ['química → térmica → cinética → elétrica', 'Emissão de poluentes na queima, mas o CO₂ é reabsorvido pela próxima safra', true]
  };
  const NOMES = Object.keys(USINAS);

  NAT.jogo({
    id: 'nat-energia', area: 'fis', icone: '🏭', titulo: 'Usinas e energia',
    intro: 'Solte o skatista de alturas diferentes e veja a energia potencial virar energia de movimento (e um pouco de calor, se tiver atrito). Depois monte a cadeia de transformações de cada usina e avalie os impactos, como o ENEM gosta.',
    habs: ['H23', 'H26', 'H8'],
    cola: ['<b>E<sub>p</sub> = m·g·h</b><br>energia guardada na altura', '<b>E<sub>c</sub> = m·v²/2</b><br>energia do movimento', '<b>Sem atrito</b>: E<sub>p</sub> vira E<sub>c</sub><br>v = √(2·g·h)',
      '<b>Potência</b> P = E / Δt<br>1 W = 1 J/s', '<b>Rendimento</b> η = útil / total<br>sempre menor que 100%', '<b>Gerador</b>: turbina gira um ímã numa bobina (indução)'],
    lab: {
      titulo: 'Skatista na rampa', texto: 'A energia não some: ela muda de forma. O atrito transforma parte da energia em calor (energia "dissipada").',
      controles: [
        { id: 'h', rotulo: 'Altura da rampa (h)', min: 1, max: 40, passo: 1, valor: 5, unid: 'm' },
        { id: 'm', rotulo: 'Massa do skatista', min: 30, max: 90, passo: 10, valor: 60, unid: 'kg' },
        { id: 'atr', rotulo: 'Energia perdida no atrito', min: 0, max: 60, passo: 10, valor: 0, unid: '%' }],
      desenhar({ h, m, atr }) {
        const ep = m * 10 * h, ec = ep * (1 - atr / 100), v = Math.sqrt(2 * ec / m);
        return { svg: rampa(h, atr, v), leitura: [`E<sub>p</sub> = ${m} × 10 × ${h} = <b>${num(ep)} J</b>`, `E<sub>c</sub> embaixo = <b>${num(ec)} J</b>`, `Velocidade embaixo ≈ <b>${num(v, 1)} m/s</b> (${num(v * 3.6, 0)} km/h)`,
          atr ? `${num(ep - ec)} J viraram calor no atrito` : 'Repare: a massa não muda a velocidade final, só a energia!'] };
      }
    },
    desafios: [
      () => {
        const [h, v] = sorteia([[5, 10], [20, 20], [45, 30], [80, 40], [1.25, 5]]);
        return { hab: 'H23', fig: rampa(Math.min(h, 40), 0, v), enun: `Um carrinho de montanha-russa parte do repouso de ${num(h)} m de altura. Sem atrito (g = 10 m/s²), com que velocidade ele passa pelo ponto mais baixo?`,
          certa: num(v) + ' m/s', erradas: [num(2 * 10 * h) + ' m/s', num(10 * h) + ' m/s', num(v / 2) + ' m/s', num(v * 2) + ' m/s'],
          expl: `Toda a energia potencial vira cinética: ${f('m·g·h = m·v²/2')} → ${f(`v = √(2 × 10 × ${num(h)}) = √${num(20 * h)} = ${v} m/s`)}. A massa cancela!` };
      },
      () => {
        const u = sorteia(NOMES);
        return { hab: 'H8', enun: `Qual sequência de transformações de energia acontece numa <b>${u.toLowerCase()}</b>?`,
          certa: USINAS[u][0], erradas: [...new Set(NOMES.map(n => USINAS[n][0]))].filter(x => x !== USINAS[u][0]).concat(['elétrica → térmica → química']),
          expl: `${u}: ${USINAS[u][0]}. Quase toda usina termina numa turbina que gira um gerador; a diferença é o que faz a turbina girar (água, vapor ou vento). A fotovoltaica é a exceção: a luz vira eletricidade direto na placa.` };
      },
      () => {
        const u = sorteia(NOMES.slice(0, 5));
        return { hab: 'H26', enun: `Qual é o principal impacto ambiental associado a uma <b>${u.toLowerCase()}</b>?`,
          certa: USINAS[u][1], erradas: NOMES.slice(0, 5).filter(n => n !== u).map(n => USINAS[n][1]),
          expl: `${u}: ${USINAS[u][1].toLowerCase()}. No ENEM, nenhuma fonte é "impacto zero": a resposta certa costuma reconhecer a vantagem <b>e</b> o problema de cada uma.` };
      },
      () => {
        const ren = sorteia(NOMES.filter(n => USINAS[n][2] && n !== 'Termelétrica a biomassa (bagaço de cana)')), nao = ['Termelétrica a carvão', 'Usina nuclear', 'Termelétrica a gás natural', 'Termelétrica a óleo diesel'];
        return { hab: 'H26', enun: 'Um país quer aumentar a participação de fontes <b>renováveis</b> na sua matriz elétrica. Qual opção atende a essa meta?',
          certa: ren, erradas: nao,
          expl: `Renovável é a fonte que se repõe na escala humana: água dos rios, vento, Sol, biomassa. Carvão, petróleo, gás natural e urânio são estoques que acabam. O Brasil tem matriz elétrica muito renovável por causa das hidrelétricas.` };
      },
      () => {
        const tot = sorteia([200, 500, 1000, 2000]), r = sorteia([20, 25, 30, 40, 80]), util = tot * r / 100;
        const ap = sorteia([['um motor elétrico', 'trabalho mecânico'], ['uma lâmpada', 'luz'], ['um motor a gasolina', 'movimento do carro']]);
        return { hab: 'H23', enun: `${ap[0][0].toUpperCase() + ap[0].slice(1)} recebe ${tot} J de energia e transforma ${num(util)} J em ${ap[1]}. Qual o rendimento?`,
          certa: r + '%', erradas: [100 - r + '%', num(tot / util * 100, 0) + '%', num(util / 10, 0) + '%', '100%'],
          expl: `${f(`η = útil ÷ total = ${num(util)} ÷ ${tot} = ${num(r / 100)} = ${r}%`)}. O resto (${num(tot - util)} J) é dissipado, quase sempre como calor.` };
      },
      () => {
        const m = sorteia([1000, 2000, 5000]), h = sorteia([10, 20, 50, 100]), t = sorteia([10, 20, 50]);
        const E = m * 10 * h;
        return { hab: 'H23', enun: `Numa pequena hidrelétrica, ${num(m)} kg de água caem de ${h} m a cada ${t} s. Qual a potência disponível (g = 10 m/s²)?`,
          certa: num(E / t / 1000) + ' kW', erradas: [num(E / 1000) + ' kW', num(E * t / 1000) + ' kW', num(m * h / t / 1000) + ' kW', num(E / t) + ' kW'],
          expl: `Energia: ${f(`E = m·g·h = ${num(m)} × 10 × ${h} = ${num(E)} J`)}. Potência: ${f(`P = E/Δt = ${num(E)} ÷ ${t} = ${num(E / t)} W = ${num(E / t / 1000)} kW`)}.` };
      }
    ]
  });
})();
