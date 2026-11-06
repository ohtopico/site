/* 🚗 Pista dos movimentos: gráficos s×t e v×t, velocidade média, aceleração, queda livre e leis de Newton. */
(function () {
  const { sorteia, num, f } = NAT;

  // gráfico simples: pontos [[t, y]], eixos com rótulos; area=true pinta embaixo da linha
  function grafico(pts, { tmax, ymax, ey, et = 't (s)', area = false, marcas = true, cor = '#3f8fe0' }) {
    const X = t => 60 + t / tmax * 380, Y = y => 170 - y / ymax * 140;
    const linha = pts.map(([t, y]) => `${X(t).toFixed(1)},${Y(y).toFixed(1)}`).join(' ');
    const pint = area ? `<polygon points="${X(pts[0][0])},170 ${linha} ${X(pts[pts.length - 1][0])},170" fill="#ffd58a" opacity=".8"/>` : '';
    const mk = marcas ? pts.filter((p, k) => k === 0 || k === pts.length - 1 || p.m).map(([t, y]) => `<path d="M${X(t)} 170 V${Y(y)} H60" stroke="#7c8a7e" stroke-dasharray="4 4" fill="none"/>
      <text x="${X(t)}" y="188" text-anchor="middle" class="fino">${num(t)}</text><text x="54" y="${Y(y) + 4}" text-anchor="end" class="fino">${num(y)}</text>`).join('') : '';
    return `<svg class="fig" viewBox="0 0 480 205" role="img" aria-label="Gráfico ${ey} por tempo">
      ${pint}${mk}<path d="M60 20 V170 H450" stroke="#1d2a1f" stroke-width="2.5" fill="none"/>
      <text x="14" y="16">${ey}</text><text x="452" y="186" text-anchor="end">${et}</text>
      <polyline points="${linha}" fill="none" stroke="${cor}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
  }
  // curva s(t) amostrada
  const curva = (fn, tmax, n = 40) => Array.from({ length: n + 1 }, (_, k) => [k / n * tmax, fn(k / n * tmax)]);

  const NEWTON = [
    ['No ônibus que freia de repente, os passageiros em pé são "jogados" para a frente.', '1ª lei (inércia)', 'O corpo tende a manter o movimento que tinha. O ônibus para, o passageiro continua indo para a frente. É por isso que existe cinto de segurança.'],
    ['Para andar de canoa, o remador empurra a água para trás e a canoa vai para a frente.', '3ª lei (ação e reação)', 'A canoa empurra a água (ação) e a água empurra a canoa no sentido oposto (reação), com a mesma intensidade.'],
    ['Um carrinho de supermercado vazio acelera muito mais que um cheio, com o mesmo empurrão.', '2ª lei (F = m·a)', 'Mesma força com mais massa dá menos aceleração: ' + '<span class="formula">a = F / m</span>.'],
    ['O foguete expele gases para baixo em alta velocidade e sobe.', '3ª lei (ação e reação)', 'O foguete empurra os gases para baixo e os gases empurram o foguete para cima. Funciona até no vácuo, sem ar para "apoiar".'],
    ['Puxando rápido a toalha, os pratos ficam praticamente parados sobre a mesa.', '1ª lei (inércia)', 'Os pratos tendem a continuar em repouso. Se a força de atrito age por pouco tempo, eles mal se mexem.'],
    ['O airbag aumenta o tempo da colisão e reduz a força sobre a cabeça do motorista.', '2ª lei (F = m·a)', 'A mesma variação de velocidade num tempo maior significa aceleração menor e, portanto, força menor.']
  ];

  NAT.jogo({
    id: 'nat-movimento', area: 'fis', icone: '🚗', titulo: 'Pista dos movimentos',
    intro: 'Escolha a velocidade inicial e a aceleração do carro e veja os gráficos de posição e de velocidade se desenharem. Depois resolva desafios de velocidade média, gráficos, queda livre e leis de Newton.',
    habs: ['H20', 'H17'],
    cola: ['<b>v<sub>m</sub> = Δs / Δt</b><br>km/h ÷ 3,6 = m/s', '<b>a = Δv / Δt</b><br>quanto a velocidade muda por segundo', '<b>v = v₀ + a·t</b><br><b>s = s₀ + v₀·t + a·t²/2</b>',
      '<b>Área do gráfico v×t</b> = deslocamento', '<b>Queda livre</b> (g = 10 m/s²)<br>v = 10·t e h = 5·t²', '<b>Newton</b>: 1ª inércia · 2ª F = m·a · 3ª ação e reação'],
    lab: {
      titulo: 'O carro na pista (10 segundos)', texto: 'Velocidade constante desenha uma reta no s×t. Com aceleração, a reta vira curva (parábola) e o v×t fica inclinado.',
      controles: [
        { id: 'v0', rotulo: 'Velocidade inicial (v₀)', min: 0, max: 20, passo: 1, valor: 5, unid: 'm/s' },
        { id: 'a', rotulo: 'Aceleração (a)', min: -2, max: 3, passo: 0.5, valor: 1, unid: 'm/s²' }],
      desenhar({ v0, a }) {
        const tPara = a < 0 ? Math.min(10, v0 / -a) : 10;           // freando: o carro para e fica parado
        const s = t => { const tt = Math.min(t, tPara); return v0 * tt + a * tt * tt / 2; }, v = t => t < tPara ? v0 + a * t : 0;
        const S = curva(s, 10), V = curva(v, 10), sm = Math.max(10, ...S.map(p => p[1])), vm = Math.max(5, ...V.map(p => p[1]));
        const sF = s(10), vF = v(10), pos = 30 + Math.min(1, sF / Math.max(sm, 1)) * 400;
        const pista = `<svg class="fig" viewBox="0 0 480 60" aria-hidden="true"><rect x="10" y="38" width="460" height="10" rx="5" fill="#7c8a7e"/>
          <path d="M20 43 H460" stroke="#fff" stroke-dasharray="14 10" stroke-width="2"/><text x="${pos}" y="34" text-anchor="middle" style="font-size:30px">🚗</text></svg>`;
        const tipo = a === 0 ? (v0 === 0 ? 'parado (repouso)' : 'uniforme (MU): velocidade constante') : a > 0 ? 'acelerado (MUV): a velocidade cresce' : 'retardado (MUV): o carro freia';
        return { svg: pista + grafico(S, { tmax: 10, ymax: sm * 1.1, ey: 's (m)', marcas: false }) + grafico(V, { tmax: 10, ymax: vm * 1.2, ey: 'v (m/s)', area: true, marcas: false, cor: '#e85c4a' }),
          leitura: [`Movimento ${tipo}`, `Depois de 10 s: v = <b>${num(vF)} m/s</b> (${num(vF * 3.6)} km/h)`, `Andou <b>${num(sF)} m</b>, que é a área amarela do v×t`] };
      }
    },
    desafios: [
      () => {
        const d = sorteia([120, 180, 240, 300]), t = sorteia([2, 3, 4]), p = sorteia([0.5, 1]);
        const vm = d / (t + p);
        return { hab: 'H20', enun: `Um ônibus percorre ${d} km. Ele roda ${t} h e faz uma parada de ${p === 1 ? '1 h' : '30 min'} para almoço. Qual foi a velocidade média na viagem toda?`,
          certa: num(vm, 1) + ' km/h', erradas: [num(d / t, 1) + ' km/h', num(d / (t - p), 1) + ' km/h', num(d * (t + p), 1) + ' km/h', num(vm / 3.6, 1) + ' km/h'],
          expl: `Velocidade média usa o tempo <b>total</b>, contando a parada: ${f(`v = ${d} ÷ (${t} + ${num(p)}) = ${num(vm, 1)} km/h`)}. Pegadinha clássica do ENEM: esquecer o tempo parado.` };
      },
      () => {
        const v0 = sorteia([0, 2, 4, 6]), v1 = v0 + sorteia([4, 6, 8, 10]), t = sorteia([4, 5, 8, 10]);
        const area = (v0 + v1) / 2 * t;
        return { hab: 'H17', fig: grafico([[0, v0], [t, v1]], { tmax: t * 1.15, ymax: v1 * 1.2, ey: 'v (m/s)', area: true }),
          enun: `O gráfico mostra a velocidade de uma bicicleta. Qual a distância percorrida entre 0 e ${t} s?`,
          certa: num(area) + ' m', erradas: [num(v1 * t) + ' m', num((v1 - v0) * t / 2) + ' m', num(v1 / t) + ' m', num((v1 - v0) / t) + ' m'],
          expl: `No v×t, a distância é a <b>área</b> embaixo da linha. Aqui é um trapézio: ${f(`(${v0} + ${v1}) ÷ 2 × ${t} = ${num(area)} m`)}.` };
      },
      () => {
        const dv = sorteia([10, 20, 30]), t = sorteia([2, 4, 5, 10]);
        return { hab: 'H17', fig: grafico([[0, 0], [t, dv]], { tmax: t * 1.15, ymax: dv * 1.2, ey: 'v (m/s)' }),
          enun: `Um carro parte do repouso e sua velocidade varia como no gráfico. Qual a aceleração?`,
          certa: num(dv / t) + ' m/s²', erradas: [num(dv * t) + ' m/s²', num(t / dv) + ' m/s²', num(dv * t / 2) + ' m/s²', num(dv) + ' m/s²'],
          expl: `${f(`a = Δv / Δt = ${dv} ÷ ${t} = ${num(dv / t)} m/s²`)}. No gráfico v×t, a aceleração é a <b>inclinação</b> da reta.` };
      },
      () => {
        const tipo = sorteia(['parado', 'constante', 'acelerando', 'freando']);
        const fig = {
          parado: grafico([[0, 30], [10, 30]], { tmax: 10, ymax: 40, ey: 's (m)', marcas: false }),
          constante: grafico([[0, 0], [10, 40]], { tmax: 10, ymax: 45, ey: 's (m)', marcas: false }),
          acelerando: grafico(curva(t => 0.4 * t * t, 10), { tmax: 10, ymax: 45, ey: 's (m)', marcas: false }),
          freando: grafico(curva(t => 8 * t - 0.4 * t * t, 10), { tmax: 10, ymax: 45, ey: 's (m)', marcas: false })
        }[tipo];
        const txt = { parado: 'Está parado', constante: 'Anda com velocidade constante', acelerando: 'Está acelerando', freando: 'Está freando' };
        const expl = { parado: 'A posição não muda com o tempo: linha horizontal no s×t é repouso.', constante: 'Reta inclinada no s×t: a cada segundo anda a mesma distância. É o movimento uniforme.',
          acelerando: 'A curva fica cada vez mais inclinada: a cada segundo anda mais que no anterior. É MUV acelerado (parábola).', freando: 'A curva vai ficando "deitada": a cada segundo anda menos. É MUV retardado.' }[tipo];
        return { hab: 'H17', fig, enun: 'O gráfico mostra a posição de um corredor ao longo do tempo. O que ele está fazendo?', certa: txt[tipo], erradas: Object.values(txt).filter(x => x !== txt[tipo]), expl };
      },
      () => {
        const t = sorteia([1, 2, 3, 4]), h = 5 * t * t;
        const pede = sorteia(['altura', 'velocidade']);
        return pede === 'altura'
          ? { hab: 'H20', enun: `Um celular cai de uma janela e leva ${t} s para chegar ao chão. Desprezando o ar (g = 10 m/s²), de que altura ele caiu?`,
            certa: num(h) + ' m', erradas: [num(10 * t) + ' m', num(10 * t * t) + ' m', num(5 * t) + ' m', num(h / 2) + ' m'],
            expl: `Queda livre a partir do repouso: ${f(`h = g·t²/2 = 10 × ${t}² ÷ 2 = ${h} m`)}.` }
          : { hab: 'H20', enun: `Uma pedra é solta de ${h} m de altura. Com que velocidade chega ao chão (g = 10 m/s², sem resistência do ar)?`,
            certa: num(10 * t) + ' m/s', erradas: [num(h) + ' m/s', num(10 * t * t) + ' m/s', num(h / 10) + ' m/s', num(5 * t) + ' m/s'],
            expl: `Primeiro o tempo: ${f(`${h} = 5·t²`)} → t = ${t} s. Depois ${f(`v = g·t = 10 × ${t} = ${10 * t} m/s`)}. Ou direto: ${f(`v² = 2·g·h`)}.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(NEWTON);
        return { hab: 'H20', enun: sit + ' Qual lei de Newton explica melhor a situação?', certa: cert, erradas: ['1ª lei (inércia)', '2ª lei (F = m·a)', '3ª lei (ação e reação)', 'Lei da gravitação universal'].filter(x => x !== cert), expl };
      },
      () => {
        const kmh = sorteia([36, 54, 72, 90, 108]), tr = sorteia([0.5, 1, 1.5]), v = kmh / 3.6;
        return { hab: 'H20', enun: `Um motorista a ${kmh} km/h vê um obstáculo e demora ${num(tr)} s para pisar no freio (tempo de reação). Quantos metros o carro anda antes de começar a frear?`,
          certa: num(v * tr) + ' m', erradas: [num(kmh * tr) + ' m', num(v * tr * 2) + ' m', num(v * tr / 2) + ' m', num(kmh * tr / 2) + ' m'],
          expl: `Passe para m/s: ${f(`${kmh} ÷ 3,6 = ${num(v)} m/s`)}. Durante a reação a velocidade é constante: ${f(`d = ${num(v)} × ${num(tr)} = ${num(v * tr)} m`)}. Celular ao volante aumenta o tempo de reação.` };
      }
    ]
  });
})();
