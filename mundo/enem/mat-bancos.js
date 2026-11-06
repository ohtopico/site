/* Ilha ENEM · Matemática: geradores de questões (parte 1: números, porcentagem, geometria e medidas).
   Cada gerador sorteia números novos e devolve { h, tema, enun, fig, certa, erradas, expl, mac }. */
(function () {
  const { int, pick, mix, f, R, pct, mmc, mdc, frac, svg, t, linha, rect, poli, C, INK } = MAT;

  /* ===================== 🔢 FEIRA DOS NÚMEROS (H1, H2, H3) ===================== */
  function pizzaFracao(a, b) {
    const cx = 110, cy = 100, r = 78; let s = '';
    for (let k = 0; k < b; k++) {
      const a0 = -Math.PI / 2 + k * 2 * Math.PI / b, a1 = a0 + 2 * Math.PI / b;
      s += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 0 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${k < a ? C.amarelo : '#fff'}" stroke="${INK}" stroke-width="2"/>`;
    }
    s += t(320, 80, `${a} de ${b} pedaços`, { size: 18, peso: 700 }) + t(320, 112, 'estão pintados', { size: 15 });
    return svg(440, 200, s, `Pizza com ${a} de ${b} pedaços pintados`);
  }
  const numeros = [
    () => { // fração → decimal → porcentagem
      const [a, b] = pick([[1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [1, 8], [3, 8], [3, 10], [7, 10], [1, 2]]), d = a / b;
      return { h: 'H1', tema: 'Fração, decimal e porcentagem', fig: pizzaFracao(a, b),
        enun: `Uma receita pede <b>${a}/${b}</b> de um pacote de farinha (a parte amarela da figura). Essa quantidade, em número decimal e em porcentagem do pacote, é:`,
        certa: `${f(d, 3)} = ${pct(d * 100)}`,
        erradas: [`${f(b / a, 3)} = ${pct(b / a * 100)}`, `0,${a}${b} = ${a}${b}%`, `${f(d / 10, 4)} = ${pct(d * 10)}`, `${f(1 - d, 3)} = ${pct((1 - d) * 100)}`, `${f(a / (a + b), 3)} = ${pct(a / (a + b) * 100)}`],
        expl: `Divida o numerador pelo denominador: ${a} ÷ ${b} = ${f(d, 3)}. Para virar porcentagem, multiplique por 100: ${pct(d * 100)}.`,
        mac: '“Por cento” é “dividido por 100”: 0,375 = 37,5/100 = 37,5%.' };
    },
    () => { // padrão de palitos
      const tri = Math.random() < 0.4, nome = tri ? 'triângulos' : 'quadrados', p = tri ? 2 : 3, q = 1, n = int(12, 60), certa = p * n + q;
      let s = '';
      [1, 2, 3].forEach((k, i) => {
        const x0 = 22 + i * 145, L = 30, y0 = 110, pal = (x1, y1, x2, y2) => linha(x1, y1, x2, y2, { cor: C.amarelo, w: 5 }) + `<circle cx="${x2}" cy="${y2}" r="3" fill="${C.vermelho}"/>`;
        s += t(x0 + 55, 150, `Figura ${k}: ${p * k + q} palitos`, { size: 12.5, peso: 600 });
        if (!tri) { for (let j = 0; j <= k; j++) s += pal(x0 + j * L, y0, x0 + j * L, y0 - L); for (let j = 0; j < k; j++) s += pal(x0 + j * L, y0, x0 + (j + 1) * L, y0) + pal(x0 + j * L, y0 - L, x0 + (j + 1) * L, y0 - L); }
        else { const h = L * 0.87; for (let j = 0; j < k; j++) { const bx = x0 + j * L / 2; if (j % 2 === 0) { s += pal(bx, y0, bx + L, y0); if (j === 0) s += pal(bx, y0, bx + L / 2, y0 - h); s += pal(bx + L, y0, bx + L / 2, y0 - h); } else { s += pal(bx, y0 - h, bx + L, y0 - h); s += pal(bx + L / 2, y0, bx + L, y0 - h); } } }
      });
      return { h: 'H2', tema: 'Padrões numéricos', fig: svg(450, 170, s, 'Sequência de figuras feitas com palitos'),
        enun: `Com palitos de fósforo, uma criança monta ${nome} lado a lado, como na figura: o lado encostado é um palito só. Quantos palitos ela usará para montar <b>${n} ${nome}</b>?`,
        certa: String(certa), erradas: [String((p + 1) * n), String(p * n), String(p * n + q + p), String(certa - 1 + p * 2), String((p + 1) * n - 1)],
        expl: `Cada figura nova acrescenta ${p} palitos e a primeira tem ${p + q}. Então o total é ${p}·n + ${q}. Para n = ${n}: ${p}·${n} + ${q} = <b>${certa}</b>.`,
        mac: 'Monte a tabelinha (1, 2, 3 figuras) e veja de quanto em quanto cresce: esse é o número que multiplica o n.' };
    },
    () => { // ordem de racionais
      const pool = mix([['0,5', 0.5], ['3/5', 0.6], ['0,45', 0.45], ['2/3', 2 / 3], ['0,7', 0.7], ['3/4', 0.75], ['0,38', 0.38], ['1/3', 1 / 3], ['0,25', 0.25], ['5/8', 0.625]]).slice(0, 4);
      const ord = pool.slice().sort((a, b) => a[1] - b[1]), str = l => l.map(x => x[0]).join(' &lt; ');
      return { h: 'H1', tema: 'Comparar racionais',
        enun: `Quatro corredores de uma maratona escolar completaram, em relação ao percurso total, ${pool.map(p => '<b>' + p[0] + '</b>').join(', ')}. A ordem crescente dessas partes é:`,
        certa: str(ord), erradas: [str(ord.slice().reverse()), str(pool), str([ord[1], ord[0], ord[2], ord[3]]), str([ord[0], ord[2], ord[1], ord[3]]), str([ord[0], ord[1], ord[3], ord[2]])],
        expl: `Passe tudo para decimal: ${ord.map(p => `${p[0]} = ${f(p[1], 3)}`).join('; ')}. Agora é só comparar.`,
        mac: 'Para comparar fração com decimal, transforme todas em decimal (ou todas em porcentagem).' };
    },
    () => { // notação científica
      const [txt, m, e, un] = pick([['150 milhões de quilômetros (distância Terra–Sol)', 1.5, 8, 'km'], ['8 bilhões de pessoas no mundo', 8, 9, 'pessoas'], ['0,000 007 m (diâmetro de uma hemácia)', 7, -6, 'm'],
        ['0,000 000 1 m (tamanho de um vírus)', 1, -7, 'm'], ['300 000 km/s (velocidade da luz)', 3, 5, 'km/s'], ['215 milhões de habitantes no Brasil', 2.15, 8, 'habitantes'], ['0,000 5 g (massa de um grão de areia fina)', 5, -4, 'g']]);
      const nc = (mm, ee) => `${f(mm, 2)} × 10<sup>${ee}</sup>`;
      return { h: 'H1', tema: 'Notação científica',
        enun: `Uma reportagem cita <b>${txt}</b>. Em notação científica, esse número é:`,
        certa: nc(m, e) + ' ' + un, erradas: [nc(m, e + 1) + ' ' + un, nc(m, e - 1) + ' ' + un, nc(m, -e) + ' ' + un, nc(m * 10, e + 1) + ' ' + un, nc(m, e + 2) + ' ' + un],
        expl: `Notação científica é um número entre 1 e 10 vezes uma potência de 10. Conte quantas casas a vírgula andou: ${e > 0 ? `para a esquerda, ${e} casas → expoente positivo` : `para a direita, ${-e} casas → expoente negativo`}.`,
        mac: 'Número grande → expoente positivo. Número pequeno (0,000…) → expoente negativo.' };
    },
    () => { // inteiros: temperatura
      const a = int(2, 9), b = int(8, 26), v = a + b;
      const fig = svg(440, 190, (() => {
        let s = ''; const y = v => 168 - (v + 10) * 3.5;
        s += rect(70, y(32), 26, y(-10) - y(32), '#fff', { rx: 13 }) + `<circle cx="83" cy="180" r="16" fill="${C.vermelho}" stroke="${INK}" stroke-width="2"/>`;
        s += rect(76, y(b), 14, 172 - y(b), C.vermelho, { w: 0 });
        for (let g = -10; g <= 30; g += 10) s += linha(96, y(g), 104, y(g)) + t(124, y(g) + 4, g + '°', { size: 12 });
        s += t(290, 70, `Madrugada: −${a} °C`, { size: 16, peso: 700, cor: C.azul }) + t(290, 108, `Tarde: ${b} °C`, { size: 16, peso: 700, cor: C.vermelho });
        return s;
      })(), 'Termômetro').replace('viewBox="0 0 440 190"', 'viewBox="0 0 440 205"').replace('height="190"', 'height="205"');
      return { h: 'H1', tema: 'Números inteiros', fig,
        enun: `Numa cidade da serra gaúcha, o termômetro marcou <b>−${a} °C</b> de madrugada e <b>${b} °C</b> à tarde. A variação de temperatura no dia foi de:`,
        certa: `${v} °C`, erradas: [`${b - a} °C`, `−${v} °C`, `${a - b} °C`, `${v + 2} °C`, `${b} °C`],
        expl: `Variação = final − inicial = ${b} − (−${a}) = ${b} + ${a} = <b>${v} °C</b>. Menos com menos vira mais.`,
        mac: 'Na reta numérica, de −a até b você anda a casas até o zero e mais b depois dele.' };
    },
    () => { // MMC
      const [a, b] = pick([[12, 18], [15, 20], [10, 25], [8, 12], [20, 30], [18, 24], [12, 16], [14, 21]]), m = mmc(a, b), hh = 6 + int(0, 3), mi = pick([0, 15, 30]);
      const hora = min => { const tot = hh * 60 + mi + min; return `${Math.floor(tot / 60)}h${String(tot % 60).padStart(2, '0')}`; };
      let s = ''; const W = 440, x0 = 30, esc = (W - 60) / (m * 1.25);
      s += linha(x0, 60, W - 20, 60) + linha(x0, 130, W - 20, 130);
      for (let k = 0; k * a <= m * 1.25; k++) s += `<circle cx="${x0 + k * a * esc}" cy="60" r="${k * a === m || k === 0 ? 9 : 6}" fill="${C.azul}" stroke="${INK}"/>`;
      for (let k = 0; k * b <= m * 1.25; k++) s += `<circle cx="${x0 + k * b * esc}" cy="130" r="${k * b === m || k === 0 ? 9 : 6}" fill="${C.amarelo}" stroke="${INK}"/>`;
      s += t(x0, 40, `Ônibus A: a cada ${a} min`, { anchor: 'start', size: 13, peso: 600 }) + t(x0, 160, `Ônibus B: a cada ${b} min`, { anchor: 'start', size: 13, peso: 600 }) + linha(x0 + m * esc, 45, x0 + m * esc, 145, { dash: '5 4', cor: C.vermelho }) + t(x0 + m * esc, 180, '?', { size: 18, peso: 700, cor: C.vermelho });
      return { h: 'H3', tema: 'MMC', fig: svg(W, 190, s, 'Linha do tempo dos ônibus'),
        enun: `Dois ônibus saem juntos da rodoviária às <b>${hora(0)}</b>. O ônibus A volta a sair a cada ${a} minutos e o B a cada ${b} minutos. Eles sairão juntos de novo às:`,
        certa: hora(m), erradas: [hora(a * b), hora(a + b), hora(mdc(a, b)), hora(m * 2), hora(Math.max(a, b))],
        expl: `“Juntos de novo” é o menor múltiplo comum: MMC(${a}, ${b}) = ${m} minutos. ${hora(0)} + ${m} min = <b>${hora(m)}</b>.`,
        mac: 'Coincidir de novo, encontrar de novo, piscar juntas → MMC. Dividir em partes iguais do maior tamanho → MDC.' };
    }
  ];

  /* ===================== 🛒 MERCADO DAS PORCENTAGENS (H3, H4, H5) ===================== */
  function etiqueta(preco, extra) {
    return svg(440, 150, poli([[30, 40], [290, 40], [330, 75], [290, 110], [30, 110]], C.creme, { w: 3 }) + `<circle cx="300" cy="75" r="7" fill="#fff" stroke="${INK}" stroke-width="2"/>` +
      t(160, 70, 'Preço', { size: 15, cor: '#5a6a5c' }) + t(160, 98, preco, { size: 26, peso: 800 }) + (extra ? rect(345, 45, 85, 60, C.vermelho, { rx: 12 }) + t(387, 82, extra, { size: 18, peso: 800, cor: '#fff' }) : ''), 'Etiqueta de preço');
  }
  const porcent = [
    () => {
      const p = pick([80, 120, 150, 200, 240, 360, 450, 1200]), d = pick([10, 15, 20, 25, 30, 35, 40]), v = p * (1 - d / 100);
      return { h: 'H3', tema: 'Desconto', fig: etiqueta(R(p), `−${d}%`),
        enun: `Na Black Friday, um tênis de ${R(p)} está com <b>${d}% de desconto</b>. Quanto ele passa a custar?`,
        certa: R(v), erradas: [R(p * d / 100), R(p - d), R(p * (1 + d / 100)), R(p * (1 - d / 1000)), R(p * (1 - 2 * d / 100))],
        expl: `Com ${d}% de desconto você paga ${100 - d}%: ${R(p)} × ${f(1 - d / 100)} = <b>${R(v)}</b>.`,
        mac: `Desconto de d%: multiplique por (1 − d/100). Aumento de a%: multiplique por (1 + a/100).` };
    },
    () => {
      const a = pick([10, 20, 25, 30, 40, 50]), net = a * a / 100;
      return { h: 'H4', tema: 'Aumento e desconto sucessivos', fig: etiqueta('R$ 100,00', `+${a}%`),
        enun: `Uma loja aumentou em <b>${a}%</b> o preço de um produto e, no mês seguinte, deu um desconto de <b>${a}%</b> sobre o novo preço. Em relação ao preço inicial, o preço final:`,
        certa: `caiu ${pct(net)}`, erradas: ['voltou a ser igual ao inicial', `subiu ${pct(net)}`, `caiu ${pct(2 * a)}`, `caiu ${pct(a)}`],
        expl: `Use um preço de R$ 100. Com +${a}%: R$ ${100 + a}. Com −${a}% sobre ${100 + a}: ${100 + a} × ${f(1 - a / 100)} = ${f((100 + a) * (1 - a / 100))}. Ficou ${pct(net)} mais barato.`,
        mac: 'Porcentagens sucessivas se multiplicam, nunca se somam. Teste sempre com R$ 100.' };
    },
    () => {
      const d1 = pick([10, 20, 30]), d2 = pick([10, 20, 25, 50]), eq = 100 - (100 - d1) * (100 - d2) / 100;
      return { h: 'H3', tema: 'Descontos sucessivos',
        enun: `Uma loja dá <b>${d1}%</b> de desconto na vitrine e mais <b>${d2}%</b> no caixa, sobre o preço já com desconto. Esses dois descontos equivalem a um desconto único de:`,
        certa: pct(eq), erradas: [pct(d1 + d2), pct(d1 * d2 / 100), pct(Math.abs(d1 - d2) || d1 / 2), pct(eq + 5), pct(100 - eq)],
        expl: `Você paga ${100 - d1}% de ${100 - d2}%: ${f(1 - d1 / 100)} × ${f(1 - d2 / 100)} = ${f((1 - d1 / 100) * (1 - d2 / 100), 4)}, ou seja, paga ${pct(100 - eq)} e o desconto total é <b>${pct(eq)}</b>.`,
        mac: 'Desconto único = 1 − (1 − d₁)(1 − d₂). Sempre dá menos que a soma.' };
    },
    () => {
      const c = pick([1000, 2000, 5000, 10000]), i = pick([10, 20]), n = pick([2, 3]), comp = c * (1 + i / 100) ** n, simp = c * (1 + i * n / 100);
      const fig = MAT.barras(Array.from({ length: n + 1 }, (_, k) => [`ano ${k}`, MAT.arred(c * (1 + i / 100) ** k, 0)]), { titulo: `Montante a ${i}% ao ano (juros compostos)`, pre: '', cor: C.verde });
      return { h: 'H3', tema: 'Juros compostos', fig,
        enun: `Uma pessoa aplica <b>${R(c)}</b> a juros compostos de <b>${i}% ao ano</b>, sem fazer retiradas. Depois de ${n} anos, o montante será:`,
        certa: R(comp), erradas: [R(simp), R(c * i * n / 100), R(comp - c), R(c * (1 + i / 100) ** (n + 1)), R(c * (1 + i / 100) * n)],
        expl: `Compostos: M = C·(1 + i)<sup>n</sup> = ${R(c)} × ${f(1 + i / 100)}<sup>${n}</sup> = <b>${R(comp)}</b>. (Nos juros simples daria ${R(simp)}.)`,
        mac: 'Juros simples crescem em linha reta (PA). Juros compostos são “juros sobre juros” e crescem como PG.' };
    },
    () => {
      const d = pick([20, 25, 30, 35, 40]), [lev, pag] = pick([[3, 2], [4, 3], [5, 4]]), db = (lev - pag) / lev * 100, preco = pick([30, 40, 60]);
      const melhor = d > db + 0.01 ? 'A' : d < db - 0.01 ? 'B' : '=';
      const certa = melhor === 'A' ? `A loja A, que dá ${d}% de desconto` : melhor === 'B' ? `A loja B, porque “leve ${lev}, pague ${pag}” equivale a ${pct(db)} de desconto` : 'Tanto faz: as duas dão o mesmo desconto';
      return { h: 'H5', tema: 'Qual oferta vale mais?',
        enun: `Camisetas custam ${R(preco)} cada. A loja A dá <b>${d}% de desconto</b> em cada peça; a loja B faz <b>“leve ${lev}, pague ${pag}”</b>. Para quem vai comprar exatamente ${lev} camisetas, a melhor opção é:`,
        certa, erradas: [`A loja A, que dá ${d}% de desconto`, `A loja B, porque “leve ${lev}, pague ${pag}” equivale a ${pct(db)} de desconto`, 'Tanto faz: as duas dão o mesmo desconto', `A loja B, porque “leve ${lev}, pague ${pag}” equivale a ${pct(100 / lev)} de desconto`, `A loja A, porque ${d}% é sempre mais que uma peça grátis`],
        expl: `Loja A: ${lev} × ${R(preco)} × ${f(1 - d / 100)} = ${R(lev * preco * (1 - d / 100))}. Loja B: paga ${pag} × ${R(preco)} = ${R(pag * preco)}. Ganhar 1 peça em ${lev} é ${pct(db)} de desconto.`,
        mac: '“Leve n, pague n−1” dá desconto de 1/n: leve 3 pague 2 = 33,3%; leve 4 pague 3 = 25%.' };
    },
    () => {
      const x = pick([40, 50, 80, 120, 200, 250]), a = pick([10, 20, 25, 30, 50, 60]), y = x * (1 + a / 100);
      return { h: 'H4', tema: 'Aumento percentual',
        enun: `O preço do quilo de um alimento subiu de <b>${R(x)}</b> para <b>${R(y)}</b>. O aumento percentual foi de:`,
        certa: pct(a), erradas: [pct((y - x) / y * 100), pct(y - x), pct(y / x * 100), pct(a / 2), pct(a + 10)],
        expl: `Aumento = ${R(y - x)}. Divida pelo valor <b>antigo</b>: ${f(y - x)} ÷ ${f(x)} = ${f(a / 100)} = <b>${pct(a)}</b>.`,
        mac: 'Variação percentual = (novo − antigo) ÷ antigo. O divisor é sempre o valor de partida.' };
    },
    () => {
      const p1 = pick([40, 50, 60, 80]), p2 = pick([10, 20, 25, 30, 50]), tot = pick([400, 500, 800, 1000, 1200]), r = p1 * p2 / 100;
      return { h: 'H3', tema: 'Porcentagem de porcentagem',
        enun: `Numa escola de ${tot} alunos, <b>${p1}%</b> estudam de manhã e, desses, <b>${p2}%</b> vão de bicicleta. Que porcentagem do total de alunos estuda de manhã e vai de bicicleta, e quantos alunos são?`,
        certa: `${pct(r)}, ou seja, ${f(tot * r / 100, 0)} alunos`, erradas: [`${pct(p1 + p2)}, ou seja, ${f(tot * (p1 + p2) / 100, 0)} alunos`, `${pct(p2)}, ou seja, ${f(tot * p2 / 100, 0)} alunos`, `${pct(p1 - p2)}, ou seja, ${f(tot * (p1 - p2) / 100, 0)} alunos`, `${pct(r * 10)}, ou seja, ${f(tot * r / 10, 0)} alunos`],
        expl: `${p2}% de ${p1}% = ${f(p2 / 100)} × ${p1}% = <b>${pct(r)}</b>. ${pct(r)} de ${tot} = ${f(tot * r / 100, 0)} alunos.`,
        mac: '“de” em porcentagem é multiplicação: 25% de 40% = 0,25 × 0,40 = 0,10 = 10%.' };
    }
  ];

  /* ===================== 🏗️ OBRA LÁ DE CASA (H8, H9, H14) ===================== */
  function planta(a, b, rot = true) {
    const k = Math.min(300 / a, 140 / b), w = a * k, h = b * k, x = (440 - w) / 2, y = 30;
    let s = rect(x, y, w, h, C.creme, { w: 3 });
    if (a <= 10) for (let i = 1; i < a * 2; i++) s += linha(x + i * k / 2, y, x + i * k / 2, y + h, { cor: '#e6d9b0', w: 1 });
    if (a <= 10) for (let j = 1; j < b * 2; j++) s += linha(x, y + j * k / 2, x + w, y + j * k / 2, { cor: '#e6d9b0', w: 1 });
    if (rot) s += t(x + w / 2, y + h + 22, f(a) + ' m', { peso: 700 }) + t(x - 10, y + h / 2 + 5, f(b) + ' m', { anchor: 'end', peso: 700 });
    return svg(440, h + 60, s, 'Planta do cômodo');
  }
  const obra = [
    () => {
      const a = int(3, 7), b = int(3, 6), cx = pick([1.5, 2, 2.5]), ar = a * b, c = Math.ceil(ar / cx);
      return { h: 'H8', tema: 'Área e caixas de piso', fig: planta(a, b),
        enun: `Uma sala retangular mede <b>${a} m × ${b} m</b>. O piso escolhido é vendido em caixas que cobrem <b>${f(cx)} m²</b> cada. Qual o menor número de caixas para cobrir o chão todo?`,
        certa: `${c} caixas`, erradas: [`${Math.floor(ar / cx) === c ? c - 1 : Math.floor(ar / cx)} caixas`, `${ar} caixas`, `${Math.ceil(2 * (a + b) / cx)} caixas`, `${c + 2} caixas`, `${Math.ceil(ar * cx)} caixas`],
        expl: `Área = ${a} × ${b} = ${ar} m². Caixas = ${ar} ÷ ${f(cx)} = ${f(ar / cx)}. Não dá para comprar caixa quebrada: arredonde <b>para cima</b>, ${c} caixas.`,
        mac: 'Material que se compra inteiro (caixa, lata, rolo, ônibus) sempre arredonda para cima.' };
    },
    () => {
      const a = int(3, 5), b = int(3, 5), h = pick([2.5, 3]), ren = pick([10, 12.5]), area = 2 * (a + b) * h, L = area / ren;
      let s = poli([[60, 160], [220, 160], [220, 60], [60, 60]], C.agua) + poli([[220, 160], [330, 120], [330, 30], [220, 60]], '#cfe9fb') + poli([[60, 60], [220, 60], [330, 30], [170, 30]], '#f4f4f4');
      s += t(140, 182, a + ' m', { peso: 700 }) + t(290, 160, b + ' m', { peso: 700 }) + t(40, 115, f(h) + ' m', { peso: 700, anchor: 'end' }) + t(390, 90, '🖌️', { size: 34 });
      return { h: 'H14', tema: 'Tinta para as paredes', fig: svg(440, 200, s, 'Quarto em perspectiva'),
        enun: `Um quarto mede ${a} m × ${b} m e tem ${f(h)} m de altura. Vão ser pintadas as <b>4 paredes</b> (ignore porta e janela). Se 1 litro de tinta pinta <b>${f(ren)} m²</b>, quantos litros são necessários?`,
        certa: f(L, 2) + ' L', erradas: [f(a * b * h / ren, 2) + ' L', f(a * b / ren, 2) + ' L', f((a + b) * h / ren, 2) + ' L', f(area / ren + a * b / ren, 2) + ' L', f(area * ren / 100, 2) + ' L'],
        expl: `Área das paredes = perímetro × altura = 2·(${a} + ${b}) × ${f(h)} = ${f(area)} m². Litros = ${f(area)} ÷ ${f(ren)} = <b>${f(L, 2)} L</b>.`,
        mac: 'Paredes = perímetro do chão × altura. Volume (comprimento × largura × altura) é para encher, não para pintar.' };
    },
    () => {
      const [p, q, r] = pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]]), k = pick([1, 0.5, 0.25]), H = p * k, B = q * k, E = r * k;
      const x0 = 80, y0 = 170, sc = 140 / Math.max(H, B);
      let s = rect(x0 - 16, 20, 16, 160, C.cinza) + linha(40, y0, 420, y0, { w: 3 }) + linha(x0, y0 - H * sc, x0 + B * sc, y0, { cor: C.amarelo, w: 7 }) + rect(x0, y0 - 14, 14, 14, 'none', { w: 1.5 });
      s += t(x0 - 26, y0 - H * sc / 2, f(H) + ' m', { anchor: 'end', peso: 700 }) + t(x0 + B * sc / 2, y0 + 20, '?', { size: 18, peso: 800, cor: C.vermelho }) + t(x0 + B * sc / 2 + 30, y0 - H * sc / 2 - 8, f(E) + ' m', { peso: 700, anchor: 'start' });
      return { h: 'H8', tema: 'Teorema de Pitágoras', fig: svg(440, 200, s, 'Escada apoiada na parede'),
        enun: `Uma escada de <b>${f(E)} m</b> está apoiada numa parede vertical e alcança a altura de <b>${f(H)} m</b>. A que distância da parede está o pé da escada?`,
        certa: f(B) + ' m', erradas: [f(E - H) + ' m', f(E + H) + ' m', f(Math.sqrt(E * E + H * H), 2) + ' m', f(B + k) + ' m', f(E * H / 2) + ' m'],
        expl: `A escada é a hipotenusa: ${f(E)}² = ${f(H)}² + d² → d² = ${f(E * E)} − ${f(H * H)} = ${f(B * B)} → d = <b>${f(B)} m</b>.`,
        mac: 'Ternos que o ENEM ama: 3-4-5, 5-12-13, 8-15-17 e seus múltiplos (6-8-10, 9-12-15…).' };
    },
    () => {
      const A = int(8, 14), B = int(6, 10), a = int(3, A - 3), b = int(2, B - 2), area = A * B - a * b;
      const k = Math.min(280 / A, 150 / B), x = 70, y = 25;
      const pts = [[x, y], [x + (A - a) * k, y], [x + (A - a) * k, y + b * k], [x + A * k, y + b * k], [x + A * k, y + B * k], [x, y + B * k]];
      let s = poli(pts, '#d8f5dc', { w: 3 }) + rect(x + (A - a) * k, y, a * k, b * k, 'none', { dash: '6 5', w: 1.5, cor: '#999' });
      s += t(x + A * k / 2, y + B * k + 22, A + ' m', { peso: 700 }) + t(x - 10, y + B * k / 2, B + ' m', { anchor: 'end', peso: 700 }) + t(x + (A - a / 2) * k, y - 6, a + ' m', { size: 13, cor: '#777' }) + t(x + A * k + 8, y + b * k / 2 + 4, b + ' m', { size: 13, anchor: 'start', cor: '#777' });
      return { h: 'H8', tema: 'Área de figura composta', fig: svg(440, B * k + 60, s, 'Terreno em forma de L'),
        enun: `O terreno da figura (em verde) é um retângulo de ${A} m × ${B} m do qual foi retirado um canto de ${a} m × ${b} m. A área do terreno é:`,
        certa: area + ' m²', erradas: [A * B + ' m²', A * B + a * b + ' m²', 2 * (A + B) + ' m²', (A - a) * (B - b) + ' m²', area - a * b + ' m²'],
        expl: `Área do retângulo inteiro menos o recorte: ${A}·${B} − ${a}·${b} = ${A * B} − ${a * b} = <b>${area} m²</b>.`,
        mac: 'Figura esquisita? Complete até virar retângulo e subtraia o que sobrou, ou corte em retângulos menores.' };
    },
    () => {
      const r = int(3, 12), area = 3 * r * r;
      let s = `<circle cx="150" cy="100" r="78" fill="#d8f5dc" stroke="${INK}" stroke-width="3"/>` + linha(150, 100, 228, 100, { w: 2.5, cor: C.vermelho }) + `<circle cx="150" cy="100" r="4" fill="${INK}"/>` + t(189, 92, r + ' m', { peso: 700 }) + t(340, 95, 'Use π ≈ 3', { size: 17, peso: 700 }) + t(340, 122, 'como o ENEM costuma pedir', { size: 12.5, cor: '#5a6a5c' });
      return { h: 'H8', tema: 'Área do círculo', fig: svg(440, 200, s, 'Praça circular'),
        enun: `Uma praça circular tem <b>${r} m de raio</b> e vai receber grama em toda a sua superfície. Usando π = 3, a área a ser gramada é:`,
        certa: area + ' m²', erradas: [6 * r + ' m²', 3 * r + ' m²', 3 * (2 * r) ** 2 + ' m²', r * r + ' m²', 3 * r * r * 2 + ' m²'],
        expl: `A = π·r² = 3 × ${r}² = 3 × ${r * r} = <b>${area} m²</b>. (O comprimento da borda seria 2πr = ${6 * r} m.)`,
        mac: 'Área do círculo: πr² (fala “pi erre dois”). Comprimento: 2πr. Não troque!' };
    },
    () => {
      const hp = pick([1.5, 1.6, 1.8, 2]), sp = pick([0.5, 0.6, 0.8, 1, 1.2]), k = pick([3, 4, 5, 6, 8]), sP = sp * k, H = hp * k;
      let s = linha(20, 170, 420, 170, { w: 3 }) + `<circle cx="400" cy="34" r="16" fill="${C.amarelo}" stroke="${INK}" stroke-width="2"/>`;
      s += rect(70, 170 - H * 13, 8, H * 13, C.cinza) + poli([[74, 170], [74 + sP * 13, 170], [74, 170 - H * 13]], 'rgba(0,0,0,.06)', { dash: '5 4', w: 1.5 }) + linha(74, 170, 74 + sP * 13, 170, { w: 6, cor: '#8a8a8a' });
      s += rect(300, 170 - hp * 13 * 1.6, 6, hp * 13 * 1.6, C.azul, { w: 1 }) + linha(303, 170, 303 + sp * 13 * 1.6, 170, { w: 6, cor: '#8a8a8a' });
      s += t(74 + sP * 6.5, 192, `sombra ${f(sP)} m`, { size: 12 }) + t(330, 192, `sombra ${f(sp)} m`, { size: 12 }) + t(60, 170 - H * 13 / 2, '?', { size: 20, peso: 800, cor: C.vermelho, anchor: 'end' }) + t(290, 170 - hp * 10, f(hp) + ' m', { size: 12, anchor: 'end', peso: 700 });
      return { h: 'H8', tema: 'Semelhança de triângulos', fig: svg(440, 205, s, 'Poste e pessoa com suas sombras'),
        enun: `No mesmo instante, uma pessoa de <b>${f(hp)} m</b> projeta uma sombra de <b>${f(sp)} m</b> e um poste projeta uma sombra de <b>${f(sP)} m</b>. A altura do poste é:`,
        certa: f(H) + ' m', erradas: [f(sP + hp - sp) + ' m', f(sP * sp / hp, 2) + ' m', f(hp * sP) + ' m', f(H / 2) + ' m', f(H + hp) + ' m'],
        expl: `Os raios de sol são paralelos, então os triângulos são semelhantes: altura/sombra é igual. ${f(hp)}/${f(sp)} = H/${f(sP)} → H = <b>${f(H)} m</b>.`,
        mac: 'Sombra, rampa, maquete: proporção entre lados correspondentes (regra de três).' };
    },
    () => {
      const a = pick([20, 25, 30, 40]), b = pick([10, 15, 20]), v = pick([3, 4]), rolo = pick([50, 100]), tot = v * 2 * (a + b), n = Math.ceil(tot / rolo);
      return { h: 'H9', tema: 'Cerca e rolos de arame', fig: planta(a, b, true),
        enun: `Um produtor quer cercar um pasto retangular de ${a} m × ${b} m com <b>${v} voltas</b> de arame. O arame é vendido em rolos de <b>${rolo} m</b>. Quantos rolos ele deve comprar?`,
        certa: n + ' rolos', erradas: [Math.ceil(2 * (a + b) / rolo) + ' rolos', Math.ceil(a * b * v / rolo) + ' rolos', Math.ceil(v * (a + b) / rolo) + ' rolos', n + 1 + ' rolos', Math.floor(tot / rolo) === n ? n - 1 + ' rolos' : Math.floor(tot / rolo) + ' rolos'],
        expl: `Perímetro = 2·(${a} + ${b}) = ${2 * (a + b)} m. Com ${v} voltas: ${tot} m. Rolos: ${tot} ÷ ${rolo} = ${f(tot / rolo)} → arredonda para cima: <b>${n} rolos</b>.`,
        mac: 'Cercar, contornar, rodapé, moldura → perímetro. Cobrir, pintar, gramar → área.' };
    }
  ];

  /* ===================== 🧊 PLANIFICAÇÕES E VISTAS (H6, H7, H8) ===================== */
  const SOLIDOS = {
    cubo: { nome: 'cubo', plan: '6 quadrados', fig: () => poli([[110, 70], [210, 70], [210, 170], [110, 170]], C.agua) + poli([[110, 70], [150, 40], [250, 40], [210, 70]], '#d6ecfb') + poli([[210, 70], [250, 40], [250, 140], [210, 170]], '#7fbde9') },
    prisma: { nome: 'prisma de base triangular', plan: '2 triângulos e 3 retângulos', fig: () => poli([[90, 160], [150, 60], [210, 160]], C.amarelo) + poli([[150, 60], [270, 45], [330, 145], [210, 160]], '#fbe1a6') + linha(210, 160, 330, 145) },
    cilindro: { nome: 'cilindro', plan: '2 círculos e 1 retângulo', fig: () => `<path d="M120,60 L120,160 A60,18 0 0 0 240,160 L240,60" fill="${C.verde}" stroke="${INK}" stroke-width="2"/><ellipse cx="180" cy="60" rx="60" ry="18" fill="#bfe8c7" stroke="${INK}" stroke-width="2"/>` },
    cone: { nome: 'cone', plan: '1 círculo e 1 setor circular', fig: () => `<path d="M180,30 L120,160 A60,18 0 0 0 240,160 Z" fill="${C.rosa}" stroke="${INK}" stroke-width="2"/><path d="M120,160 A60,18 0 0 1 240,160" fill="none" stroke="${INK}" stroke-dasharray="5 4"/>` },
    piramide: { nome: 'pirâmide de base quadrada', plan: '1 quadrado e 4 triângulos', fig: () => poli([[100, 160], [220, 160], [180, 30]], '#cdb8f0') + poli([[220, 160], [280, 130], [180, 30]], C.roxo) + linha(100, 160, 160, 130, { dash: '5 4' }) + linha(160, 130, 280, 130, { dash: '5 4' }) + linha(160, 130, 180, 30, { dash: '5 4' }) },
    hex: { nome: 'prisma de base hexagonal', plan: '2 hexágonos e 6 retângulos', fig: () => { const hx = (cx, cy) => Array.from({ length: 6 }, (_, m) => [cx + 55 * Math.cos(m * Math.PI / 3), cy + 18 * Math.sin(m * Math.PI / 3)]); return `<path d="M125,60 L125,160 L152,176 L208,176 L235,160 L235,60" fill="${C.amarelo}" stroke="${INK}" stroke-width="2"/>` + linha(152, 78, 152, 176) + linha(208, 78, 208, 176) + poli(hx(180, 60), '#fbe1a6'); } }
  };
  function pilha(alt) { // alturas[linha][coluna] vistas de cima (linha 0 = fundo)
    const n = alt.length, m = alt[0].length, s0 = 26; let s = '';
    const iso = (x, y, z) => [190 + (x - y) * s0 * 0.87, 112 + (x + y) * s0 * 0.5 - z * s0];
    const cubos = []; for (let y = 0; y < n; y++) for (let x = 0; x < m; x++) for (let z = 0; z < alt[y][x]; z++) cubos.push([x, y, z]);
    cubos.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]);
    for (const [x, y, z] of cubos) {
      const p = (a, b, c) => iso(x + a, y + b, z + c);
      s += poli([p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)], '#d6ecfb', { w: 1.5 }) + poli([p(0, 1, 1), p(1, 1, 1), p(1, 1, 0), p(0, 1, 0)], C.agua, { w: 1.5 }) + poli([p(1, 0, 1), p(1, 1, 1), p(1, 1, 0), p(1, 0, 0)], '#7fbde9', { w: 1.5 });
    }
    return s;
  }
  const solidos = [
    () => {
      const k = pick(Object.keys(SOLIDOS)), S = SOLIDOS[k];
      return { h: 'H7', tema: 'Planificação', fig: svg(440, 200, S.fig() + t(380, 105, '✂️', { size: 34 }), 'Sólido: ' + S.nome),
        enun: `Uma embalagem tem a forma do sólido da figura (${S.nome}). Ao desmontar (planificar) essa embalagem, as faces que aparecem são:`,
        certa: S.plan, erradas: mix(Object.values(SOLIDOS).filter(o => o.plan !== S.plan).map(o => o.plan)),
        expl: `O ${S.nome} planificado vira <b>${S.plan}</b>. ${k === 'cone' ? 'A lateral do cone, aberta, é um setor (pedaço de pizza) de círculo.' : k === 'cilindro' ? 'A lateral do cilindro, aberta, é um retângulo cujo comprimento é o da circunferência da base (2πr).' : 'Conte as bases e as faces laterais.'}`,
        mac: 'Prisma: 2 bases iguais + retângulos nas laterais. Pirâmide: 1 base + triângulos que se encontram no vértice.' };
    },
    () => {
      const pir = Math.random() < 0.5, n = pick([3, 4, 5, 6, 8]), nomes = { 3: 'triangular', 4: 'quadrangular', 5: 'pentagonal', 6: 'hexagonal', 8: 'octogonal' };
      const V = pir ? n + 1 : 2 * n, A = pir ? 2 * n : 3 * n, F = pir ? n + 1 : n + 2, pergunta = pick(['arestas', 'vértices']);
      const certa = pergunta === 'arestas' ? A : V;
      return { h: 'H7', tema: 'Relação de Euler',
        enun: `Uma luminária tem a forma de ${pir ? 'pirâmide' : 'prisma'} de base <b>${nomes[n]}</b> (a base tem ${n} lados) e é feita com varetas nas arestas. Quantos(as) <b>${pergunta}</b> ela tem?`,
        certa: String(certa), erradas: [String(certa + 1), String(certa - 1), String(F), String(pergunta === 'arestas' ? V : A), String(certa + n), String(2 * certa)],
        expl: `${pir ? 'Pirâmide' : 'Prisma'} de base com ${n} lados: V = ${V}, F = ${F}, A = ${A}. Confira com Euler: V − A + F = ${V} − ${A} + ${F} = 2. ✔️`,
        mac: `Prisma de n lados: V = 2n, A = 3n, F = n + 2. Pirâmide: V = n + 1, A = 2n, F = n + 1. Na dúvida: V − A + F = 2.` };
    },
    () => {
      const n = 3, m = 3, alt = Array.from({ length: n }, () => Array.from({ length: m }, () => int(0, 3)));
      alt[n - 1][0] = Math.max(1, alt[n - 1][0]);
      const tot = alt.flat().reduce((a, b) => a + b, 0), frente = Array.from({ length: m }, (_, x) => Math.max(...alt.map(l => l[x])));
      let grade = ''; alt.forEach((l, y) => l.forEach((v, x) => { grade += rect(330 + x * 30, 40 + y * 30, 30, 30, v ? C.agua : '#fff', { w: 1.5 }) + t(345 + x * 30, 60 + y * 30, v, { size: 13, peso: 700 }); }));
      grade += t(375, 30, 'vista de cima', { size: 11.5, cor: '#5a6a5c' }) + t(375, 150, '⬇ frente', { size: 11.5, cor: '#5a6a5c' });
      const str = a => a.join(' – '), q = pick(['frente', 'total']);
      if (q === 'total') return { h: 'H6', tema: 'Pilha de cubos', fig: svg(440, 210, pilha(alt) + grade, 'Pilha de cubos'),
        enun: 'A figura mostra uma pilha de cubinhos iguais e, ao lado, a vista de cima com quantos cubos há em cada coluna. Quantos cubinhos há na pilha?',
        certa: String(tot), erradas: [String(tot + 1), String(tot - 1), String(tot + 2), String(alt.flat().filter(v => v).length), String(frente.reduce((a, b) => a + b, 0))].filter(v => v !== '0'),
        expl: `Some os números da vista de cima: ${alt.flat().join(' + ')} = <b>${tot}</b>. Cubos escondidos atrás também contam.`,
        mac: 'Vista de cima com números = mapa de alturas. Total de cubos = soma de todos os números.' };
      return { h: 'H6', tema: 'Vista frontal', fig: svg(440, 210, pilha(alt) + grade, 'Pilha de cubos'),
        enun: 'Olhando a pilha <b>de frente</b>, da esquerda para a direita, qual a altura (em cubos) que se vê em cada coluna? Use a vista de cima, que mostra quantos cubos há em cada posição.',
        certa: str(frente), erradas: [str(alt[n - 1]), str(alt[0]), str(frente.slice().reverse()), str(alt.map(l => l.reduce((a, b) => a + b, 0))), str(alt.map(l => Math.max(...l))), ...frente.flatMap((v, x) => [str(frente.map((w, j) => j === x ? w + 1 : w)), str(frente.map((w, j) => j === x && w > 1 ? w - 1 : w))])],
        expl: `De frente, em cada coluna você enxerga a <b>maior</b> altura daquela coluna: ${frente.map((v, x) => `coluna ${x + 1}: máx(${alt.map(l => l[x]).join(', ')}) = ${v}`).join('; ')}.`,
        mac: 'Vista frontal = maior valor de cada coluna. Vista lateral = maior valor de cada linha.' };
    },
    () => {
      const r = pick([1, 1.5, 2]), h = pick([1, 1.5, 2, 3]), V = 3 * r * r * h;
      let s = `<path d="M110,50 L110,160 A70,20 0 0 0 250,160 L250,50" fill="${C.agua}" stroke="${INK}" stroke-width="2"/><ellipse cx="180" cy="50" rx="70" ry="20" fill="#d6ecfb" stroke="${INK}" stroke-width="2"/>` + linha(180, 50, 250, 50, { cor: C.vermelho, w: 2.5 }) + t(215, 44, f(r) + ' m', { peso: 700, size: 13 }) + linha(270, 50, 270, 160, { w: 1.5 }) + t(280, 110, f(h) + ' m', { anchor: 'start', peso: 700 }) + t(380, 100, '💧', { size: 36 });
      return { h: 'H8', tema: 'Volume do cilindro', fig: svg(440, 195, s, 'Caixa d’água cilíndrica'),
        enun: `Uma caixa d’água cilíndrica tem raio interno de <b>${f(r)} m</b> e altura de <b>${f(h)} m</b>. Usando π = 3, quantos litros ela comporta? (1 m³ = 1 000 L)`,
        certa: f(V * 1000, 0) + ' L', erradas: [f(V, 2) + ' L', f(3 * 2 * r * h * 1000, 0) + ' L', f(3 * (2 * r) ** 2 * h * 1000, 0) + ' L', f(V * 100, 0) + ' L', f(V * 10000, 0) + ' L'],
        expl: `V = π·r²·h = 3 × ${f(r)}² × ${f(h)} = ${f(V, 2)} m³. Em litros: × 1 000 = <b>${f(V * 1000, 0)} L</b>.`,
        mac: 'Volume de prisma e cilindro = área da base × altura. 1 m³ = 1 000 L; 1 dm³ = 1 L.' };
    },
    () => {
      const ruas = ['A', 'B', 'C', 'D', 'E', 'F'], x0 = int(0, 2), y0 = int(1, 3), passos = [];
      let x = x0, y = y0;
      const dirs = [['norte', 0, 1], ['leste', 1, 0], ['sul', 0, -1], ['oeste', -1, 0]];
      for (let k = 0; k < 3; k++) {
        const ops = [];
        dirs.forEach(d => [1, 2].forEach(n => { const a = x + d[1] * n, b = y + d[2] * n; if (a >= 0 && a <= 5 && b >= 1 && b <= 5) ops.push([d, n]); }));
        const [d, n] = pick(ops);
        x += d[1] * n; y += d[2] * n; passos.push(`${n} quadra${n > 1 ? 's' : ''} para o ${d[0]}`);
      }
      let s = ''; const G = (i, j) => [60 + i * 60, 185 - (j - 1) * 36];
      for (let i = 0; i <= 5; i++) { const [a] = G(i, 1); s += linha(a, 35, a, 185, { cor: '#c9c9c9', w: 6 }) + t(a, 200, ruas[i], { size: 12, peso: 700 }); }
      for (let j = 1; j <= 5; j++) { const [, b] = G(0, j); s += linha(50, b, 370, b, { cor: '#c9c9c9', w: 6 }) + t(40, b + 4, j, { size: 12, peso: 700, anchor: 'end' }); }
      const [sx, sy] = G(x0, y0); s += `<circle cx="${sx}" cy="${sy}" r="9" fill="${C.verde}" stroke="${INK}" stroke-width="2"/>` + t(410, 50, 'N', { size: 16, peso: 800 }) + linha(410, 58, 410, 90, { w: 2.5 }) + poli([[404, 64], [410, 56], [416, 64]], INK) + t(sx, sy - 14, 'você', { size: 11.5, peso: 700 });
      const fim = `esquina ${ruas[x]}${y}`, erradas = [];
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [0, 2], [1, 1], [-1, -1]]) { const a = x + dx, b = y + dy; if (a >= 0 && a <= 5 && b >= 1 && b <= 5) erradas.push(`esquina ${ruas[a]}${b}`); }
      return { h: 'H6', tema: 'Localização no mapa', fig: svg(440, 210, s, 'Mapa de quadras'),
        enun: `No mapa, as ruas verticais são A a F (de oeste para leste) e as horizontais 1 a 5 (de sul para norte). Você está no ponto verde, na <b>esquina ${ruas[x0]}${y0}</b>, e anda: ${passos.join(', depois ')}. Onde você chega?`,
        certa: fim, erradas: mix(erradas),
        expl: `Partindo de ${ruas[x0]}${y0}: norte/sul mudam o número da rua horizontal; leste/oeste mudam a letra. Fazendo os passos na ordem você para na <b>${fim}</b>.`,
        mac: 'Desenhe a rosa dos ventos no canto da prova: N para cima, L para a direita.' };
    },
    () => {
      const a = int(6, 12), b = int(3, 6), p = pick([1.2, 1.5, 1.8, 2]), V = a * b * p;
      let s = poli([[60, 80], [300, 80], [380, 40], [140, 40]], '#d6ecfb') + poli([[60, 80], [300, 80], [300, 150], [60, 150]], C.agua) + poli([[300, 80], [380, 40], [380, 110], [300, 150]], '#7fbde9');
      s += t(180, 172, a + ' m', { peso: 700 }) + t(355, 140, b + ' m', { peso: 700 }) + t(48, 120, f(p) + ' m', { anchor: 'end', peso: 700 });
      return { h: 'H8', tema: 'Volume do paralelepípedo', fig: svg(440, 190, s, 'Piscina retangular'),
        enun: `Uma piscina retangular tem ${a} m de comprimento, ${b} m de largura e ${f(p)} m de profundidade. Quantos litros de água ela comporta, cheia até a borda?`,
        certa: f(V * 1000, 0) + ' L', erradas: [f(V, 1) + ' L', f(V * 100, 0) + ' L', f(a * b * 1000, 0) + ' L', f((2 * a * p + 2 * b * p + a * b) * 1000, 0) + ' L', f(V * 10000, 0) + ' L'],
        expl: `V = ${a} × ${b} × ${f(p)} = ${f(V, 2)} m³ = <b>${f(V * 1000, 0)} litros</b>.`,
        mac: 'm³ → litros: multiplique por 1 000.' };
    }
  ];

  /* ===================== 🗺️ ESCALAS E UNIDADES (H10–H13) ===================== */
  function regua(cm, rot) {
    let s = rect(30, 110, 380, 40, '#fff6dd', { rx: 6 });
    for (let k = 0; k <= 12; k++) s += linha(45 + k * 28, 110, 45 + k * 28, 126, { w: 1.5 }) + t(45 + k * 28, 144, k, { size: 11 });
    s += `<circle cx="45" cy="70" r="9" fill="${C.verde}" stroke="${INK}" stroke-width="2"/><circle cx="${45 + cm * 28}" cy="70" r="9" fill="${C.vermelho}" stroke="${INK}" stroke-width="2"/>` + linha(45, 70, 45 + cm * 28, 70, { dash: '6 5', w: 2.5 });
    s += t(45, 50, rot[0], { size: 12.5, peso: 700 }) + t(45 + cm * 28, 50, rot[1], { size: 12.5, peso: 700 }) + t(400, 104, 'cm', { size: 12, anchor: 'end', cor: '#5a6a5c' });
    return svg(440, 165, s, 'Régua sobre o mapa');
  }
  const medidas = [
    () => {
      const cm = int(3, 11), e = pick([100000, 200000, 250000, 500000, 1000000, 2000000]), km = cm * e / 100000;
      const par = pick([['Santa Maria', 'Cachoeira do Sul'], ['casa', 'escola'], ['Porto Alegre', 'Gramado'], ['vila', 'praia']]);
      return { h: 'H11', tema: 'Escala de mapa', fig: regua(cm, par),
        enun: `Num mapa de escala <b>1 : ${e.toLocaleString('pt-BR')}</b>, a distância em linha reta entre ${par[0]} e ${par[1]} mede <b>${cm} cm</b> (veja a régua). A distância real é:`,
        certa: f(km) + ' km', erradas: [f(km * 10) + ' km', f(km / 10) + ' km', f(cm * e / 1000) + ' km', f(km * 100) + ' km', f(cm * e) + ' km'],
        expl: `1 cm no mapa = ${e.toLocaleString('pt-BR')} cm reais = ${f(e / 100000)} km. Então ${cm} cm → ${cm} × ${f(e / 100000)} = <b>${f(km)} km</b>.`,
        mac: 'Para passar cm para km, corte 5 zeros (1 km = 100 000 cm).' };
    },
    () => {
      const e = pick([50, 100, 200]), a = int(3, 8), b = int(2, 6), ra = a * e / 100, rb = b * e / 100;
      return { h: 'H11', tema: 'Escala de área (planta)', fig: planta(a, b, false).replace('</svg>', t(220, 20, `planta na escala 1 : ${e} · ${a} cm × ${b} cm no papel`, { size: 13, peso: 700 }) + '</svg>'),
        enun: `Na planta de um apartamento, feita na escala <b>1 : ${e}</b>, um quarto aparece como um retângulo de ${a} cm por ${b} cm. A área real do quarto é:`,
        certa: f(ra * rb) + ' m²', erradas: [f(a * b * e / 100) + ' m²', f(a * b) + ' m²', f(ra * rb * 100) + ' m²', f((ra + rb) * 2) + ' m²', f(a * b * e / 10000) + ' m²', f(ra * rb * 2) + ' m²', f(ra * rb / 2) + ' m²', f(ra * rb * 4) + ' m²'],
        expl: `Transforme cada lado: ${a} cm × ${e} = ${f(ra)} m e ${b} cm × ${e} = ${f(rb)} m. Área = ${f(ra)} × ${f(rb)} = <b>${f(ra * rb)} m²</b>. (A área cresce com o quadrado da escala.)`,
        mac: 'Se o comprimento aumenta k vezes, a área aumenta k² vezes e o volume k³ vezes.' };
    },
    () => {
      const tipo = pick(['vel', 'vol', 'vel2', 'ha']);
      if (tipo === 'vel') { const v = pick([36, 54, 72, 90, 108]); return { h: 'H10', tema: 'km/h e m/s',
        enun: `Um carro passa por um radar a <b>${v} km/h</b>. Essa velocidade, em metros por segundo, é:`,
        certa: f(v / 3.6) + ' m/s', erradas: [f(v * 3.6) + ' m/s', f(v / 60) + ' m/s', f(v / 36) + ' m/s', f(v * 1000 / 60) + ' m/s'],
        expl: `1 km/h = 1 000 m ÷ 3 600 s. Então divida por 3,6: ${v} ÷ 3,6 = <b>${f(v / 3.6)} m/s</b>.`, mac: 'km/h → m/s: ÷ 3,6. m/s → km/h: × 3,6.' }; }
      if (tipo === 'vel2') { const v = pick([10, 15, 20, 25, 30]); return { h: 'H10', tema: 'm/s e km/h',
        enun: `Um velocista olímpico chega a <b>${v} m/s</b> no fim da corrida. Em km/h, isso é:`,
        certa: f(v * 3.6) + ' km/h', erradas: [f(v / 3.6) + ' km/h', f(v * 60) + ' km/h', f(v * 36) + ' km/h', f(v * 3.6 / 10) + ' km/h'],
        expl: `${v} m/s × 3,6 = <b>${f(v * 3.6)} km/h</b>.`, mac: 'km/h → m/s: ÷ 3,6. m/s → km/h: × 3,6.' }; }
      if (tipo === 'vol') { const ml = pick([250, 350, 500, 600]), n = pick([12, 24, 48]), L = ml * n / 1000; return { h: 'H10', tema: 'mL, L e m³',
        enun: `Uma fábrica envasa refrigerante em latas de <b>${ml} mL</b>. Um fardo com ${n} latas contém quantos litros, no total?`,
        certa: f(L, 2) + ' L', erradas: [f(L * 10, 2) + ' L', f(L / 10, 2) + ' L', f(ml * n / 100, 2) + ' L', f(L * 1000, 0) + ' L'],
        expl: `${n} × ${ml} mL = ${(ml * n).toLocaleString('pt-BR')} mL. Divida por 1 000: <b>${f(L, 2)} L</b>.`, mac: '1 L = 1 000 mL = 1 dm³; 1 m³ = 1 000 L.' }; }
      const ha = pick([2, 3, 5, 12, 25]); return { h: 'H10', tema: 'Hectare',
        enun: `Uma propriedade rural tem <b>${ha} hectares</b>. Sabendo que 1 hectare é a área de um quadrado de 100 m de lado, a área em m² é:`,
        certa: (ha * 10000).toLocaleString('pt-BR') + ' m²', erradas: [(ha * 1000).toLocaleString('pt-BR') + ' m²', (ha * 100).toLocaleString('pt-BR') + ' m²', (ha * 100000).toLocaleString('pt-BR') + ' m²', (ha * 400).toLocaleString('pt-BR') + ' m²'],
        expl: `1 ha = 100 m × 100 m = 10 000 m². Então ${ha} ha = <b>${(ha * 10000).toLocaleString('pt-BR')} m²</b>.`, mac: '1 ha = 10 000 m² (mais ou menos um campo de futebol).' };
    },
    () => {
      const [obj, v, un, er] = pick([['a altura de uma porta', '2,1', 'm', ['21 m', '0,21 m', '210 m', '2,1 km']], ['a massa de um recém-nascido', '3,2', 'kg', ['32 kg', '0,32 kg', '320 g', '3,2 g']],
        ['a capacidade de uma garrafa de água comum', '500', 'mL', ['5 L', '50 mL', '5 mL', '50 L']], ['a espessura de uma moeda', '2', 'mm', ['2 cm', '2 dm', '0,2 mm', '20 cm']],
        ['a distância entre Santa Maria e Porto Alegre', '290', 'km', ['29 km', '2 900 km', '290 m', '29 000 km']], ['o volume de uma colher de sopa', '15', 'mL', ['15 L', '1,5 L', '150 mL', '1,5 mL']]]);
      return { h: 'H13', tema: 'Medida razoável',
        enun: `Um aluno fez uma pesquisa e precisa escrever um valor razoável para <b>${obj}</b>. Qual valor faz sentido?`,
        certa: `${v} ${un}`, erradas: er,
        expl: `O valor razoável é <b>${v} ${un}</b>. Os outros erram a unidade ou a ordem de grandeza (10, 100 ou 1 000 vezes maior ou menor).`,
        mac: 'Antes de marcar, pergunte: “isso cabe na minha mão? passa por uma porta?”. O ENEM cobra se o resultado é razoável.' };
    },
    () => {
      const d = pick([120, 150, 180, 240, 300, 360]), hh = pick([1, 2, 3]), mm = pick([0, 30, 15, 45]), tH = hh + mm / 60, v = d / tH;
      return { h: 'H12', tema: 'Velocidade média',
        enun: `Um ônibus percorreu <b>${d} km</b> em <b>${hh} h ${mm ? mm + ' min' : ''}</b>. A velocidade média foi de:`,
        certa: f(v, 1) + ' km/h', erradas: [f(d / (hh + mm / 100), 1) + ' km/h', f(d / hh, 1) + ' km/h', f(d / (hh * 60 + mm), 2) + ' km/h', f(v * 1.2, 1) + ' km/h', f(d * tH, 1) + ' km/h', f(v * 0.8, 1) + ' km/h', f(v + 10, 1) + ' km/h', f(v - 10, 1) + ' km/h'],
        expl: `${mm} min = ${f(mm / 60, 2)} h, então o tempo é ${f(tH, 2)} h (e não ${hh},${String(mm).padStart(2, '0')}). v = ${d} ÷ ${f(tH, 2)} = <b>${f(v, 1)} km/h</b>.`,
        mac: 'Cuidado: 1 h 30 min = 1,5 h, não 1,3 h. Divida os minutos por 60.' };
    },
    () => {
      const h1 = int(19, 23), m1 = pick([10, 20, 40, 50]), dur = int(150, 420), tot = h1 * 60 + m1 + dur, h2 = Math.floor(tot / 60) % 24, m2 = tot % 60;
      const hm = (h, m) => `${h}h${String(m).padStart(2, '0')}`, du = d => `${Math.floor(d / 60)} h ${d % 60} min`;
      return { h: 'H12', tema: 'Medidas de tempo',
        enun: `Um voo saiu às <b>${hm(h1, m1)}</b> e pousou às <b>${hm(h2, m2)}</b> do dia seguinte, no mesmo fuso horário. Quanto tempo durou?`,
        certa: du(dur), erradas: [du(dur + 60), du(Math.abs(dur - 40)), du(24 * 60 - dur), du(dur + 40), `${Math.floor(dur / 60)} h ${(dur % 60) + 10} min`],
        expl: `Até meia-noite: ${du(24 * 60 - h1 * 60 - m1)}. Depois, mais ${du(h2 * 60 + m2)}. Total: <b>${du(dur)}</b>.`,
        mac: 'Passou da meia-noite? Divida a conta em “até 24h00” + “depois de 0h00”.' };
    }
  ];

  MAT.registrar('numeros', { n: 8, gens: numeros });
  MAT.registrar('porcent', { n: 8, gens: porcent });
  MAT.registrar('obra', { n: 8, gens: obra });
  MAT.registrar('solidos', { n: 8, gens: solidos });
  MAT.registrar('medidas', { n: 8, gens: medidas });
})();
