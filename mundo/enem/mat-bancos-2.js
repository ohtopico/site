/* Ilha ENEM · Matemática: geradores de questões (parte 2: proporção, álgebra, gráficos, estatística e probabilidade). */
(function () {
  const { int, pick, mix, f, R, pct, svg, t, linha, rect, poli, C, INK, barras, linhas, pizza, tabela, comb, fat } = MAT;

  /* ===================== ⚖️ REGRA DE TRÊS (H15–H18) ===================== */
  function setas(a, b, mesma) {
    return svg(440, 120, t(110, 30, a, { size: 15, peso: 700 }) + t(330, 30, b, { size: 15, peso: 700 }) +
      linha(110, 45, 110, 95, { w: 3, cor: C.azul }) + poli([[102, 85], [110, 100], [118, 85]], C.azul, { cor: C.azul }) +
      linha(330, 45, 330, 95, { w: 3, cor: mesma ? C.azul : C.vermelho }) + (mesma ? poli([[322, 85], [330, 100], [338, 85]], C.azul, { cor: C.azul }) : poli([[322, 55], [330, 40], [338, 55]], C.vermelho, { cor: C.vermelho })) +
      t(220, 75, mesma ? 'diretamente proporcionais' : 'inversamente proporcionais', { size: 13, cor: '#5a6a5c' }), 'Setas da regra de três');
  }
  const proporcao = [
    () => {
      const ov = pick([2, 3, 4]), p = pick([4, 6, 8]), q = p * pick([1.5, 2, 2.5, 3]), r = ov * q / p;
      return { h: 'H16', tema: 'Regra de três direta', fig: setas('🥚 ovos', '🧑‍🤝‍🧑 pessoas', true),
        enun: `Uma receita de bolo usa <b>${ov} ovos</b> e serve <b>${p} pessoas</b>. Para servir ${q} pessoas, mantendo a proporção, serão necessários:`,
        certa: f(r) + ' ovos', erradas: [f(ov + q - p) + ' ovos', f(p * q / ov) + ' ovos', f(r * 2) + ' ovos', f(r - 1) + ' ovos', f(q / ov) + ' ovos'],
        expl: `Mais pessoas, mais ovos: direta. ${ov}/${p} = x/${q} → x = ${ov}·${q}/${p} = <b>${f(r)} ovos</b>.`,
        mac: 'Direta: multiplica cruzado. Ou ache “quanto por 1” (ovos por pessoa) e multiplique.' };
    },
    () => {
      const v1 = pick([60, 80, 90, 100]), t1 = pick([2, 3, 4, 6]), v2 = pick([40, 50, 120, 75].filter(v => v !== v1 && (v1 * t1 / v) * 60 % 1 === 0)), t2 = v1 * t1 / v2;
      const hm = h => `${Math.floor(h)} h${(h % 1) ? ' ' + Math.round(h % 1 * 60) + ' min' : ''}`;
      return { h: 'H16', tema: 'Regra de três inversa', fig: setas('🚗 velocidade', '⏱️ tempo', false),
        enun: `A ${v1} km/h, uma viagem dura <b>${t1} horas</b>. Se a velocidade média for de <b>${v2} km/h</b>, a mesma viagem vai durar:`,
        certa: hm(t2), erradas: [hm(v2 * t1 / v1), hm(t1 + (v1 - v2) / 10), hm(t2 + 1), hm(Math.max(0.5, t2 - 1)), hm(t1)],
        expl: `Mais velocidade, menos tempo: inversa. A distância (v × t) é fixa: ${v1} × ${t1} = ${v1 * t1} km. Tempo = ${v1 * t1} ÷ ${v2} = <b>${hm(t2)}</b>.`,
        mac: 'Inversa: o produto fica constante (v·t = distância; operários·dias = trabalho).' };
    },
    () => {
      const o1 = pick([4, 6, 8]), d1 = pick([10, 12, 15]), h1 = pick([6, 8]), o2 = o1 * pick([1.5, 2]), h2 = pick([6, 8, 10].filter(h => (o1 * d1 * h1) % (o2 * h) === 0)) || h1, d2 = o1 * d1 * h1 / (o2 * h2);
      return { h: 'H16', tema: 'Regra de três composta',
        enun: `${o1} pedreiros, trabalhando ${h1} horas por dia, constroem um muro em <b>${d1} dias</b>. Quantos dias ${o2} pedreiros, trabalhando ${h2} horas por dia, levam para construir um muro igual?`,
        certa: f(d2, 1) + ' dias', erradas: [f(d1 * o2 * h2 / (o1 * h1), 1) + ' dias', f(d1 * o1 / o2, 1) + ' dias', f(d1 * o2 / o1, 1) + ' dias', f(d2 + 2, 1) + ' dias', f(d1 * h2 / h1, 1) + ' dias'],
        expl: `Mais pedreiros e mais horas por dia → menos dias (as duas são inversas). Trabalho total = ${o1}·${h1}·${d1} = ${o1 * h1 * d1} “horas-pedreiro”. Dias = ${o1 * h1 * d1} ÷ (${o2}·${h2}) = <b>${f(d2, 1)}</b>.`,
        mac: 'Composta: calcule o “trabalho total” (pessoas × horas × dias) e divida pelo novo ritmo.' };
    },
    () => {
      const a = pick([2, 3, 4]), b = pick([3, 5, 6].filter(x => x !== a)), c = pick([1, 5, 7].filter(x => x !== a && x !== b)), tot = (a + b + c) * pick([1000, 1500, 2000]), u = tot / (a + b + c);
      const nomes = mix(['Ana', 'Bia', 'Caio', 'Davi', 'Edu']).slice(0, 3);
      return { h: 'H17', tema: 'Divisão proporcional', fig: pizza([[nomes[0], a], [nomes[1], b], [nomes[2], c]], { titulo: 'Quanto cada um investiu (em mil reais)', suf: '' }),
        enun: `${nomes.join(', ')} abriram um negócio investindo, respectivamente, <b>${a}, ${b} e ${c} mil reais</b>. O lucro de ${R(tot)} será dividido em partes proporcionais ao investimento. Quanto recebe ${nomes[1]}?`,
        certa: R(u * b), erradas: [R(tot / 3), R(u * a), R(u * c), R(tot * b / 10), R(u * (a + c))],
        expl: `Total de partes: ${a} + ${b} + ${c} = ${a + b + c}. Cada parte vale ${R(tot)} ÷ ${a + b + c} = ${R(u)}. ${nomes[1]} tem ${b} partes: <b>${R(u * b)}</b>.`,
        mac: 'Divisão proporcional: some as partes, ache o valor de 1 parte e multiplique.' };
    },
    () => {
      const [a, b, tipo] = pick([['número de pintores', 'tempo para pintar o muro', 'inversa'], ['quantidade de gasolina comprada', 'valor pago', 'direta'], ['velocidade do carro', 'tempo de viagem', 'inversa'],
        ['número de torneiras iguais abertas', 'tempo para encher o tanque', 'inversa'], ['lado de um quadrado', 'perímetro do quadrado', 'direta'], ['lado de um quadrado', 'área do quadrado', 'nenhuma'],
        ['idade de uma pessoa', 'altura dela', 'nenhuma'], ['quilos de carne', 'preço no açougue', 'direta'], ['número de convidados', 'fatias de pizza por pessoa (pizzas fixas)', 'inversa']]);
      const T = { direta: 'Diretamente proporcionais', inversa: 'Inversamente proporcionais', nenhuma: 'Não são proporcionais' };
      return { h: 'H15', tema: 'Tipo de proporção',
        enun: `As grandezas <b>${a}</b> e <b>${b}</b> são:`,
        certa: T[tipo], erradas: [...Object.values(T), 'Sempre iguais', 'Proporcionais só para valores pares'],
        expl: tipo === 'nenhuma' ? `Dobrar uma não dobra (nem divide pela metade) a outra${a.includes('lado') ? ': dobrar o lado quadruplica a área (cresce com o quadrado)' : ''}. <b>Não são proporcionais</b>.` : `Se uma dobra, a outra ${tipo === 'direta' ? 'também dobra' : 'cai pela metade'}: <b>${T[tipo].toLowerCase()}</b>.`,
        mac: 'Teste do dobro: dobra uma → a outra dobra (direta), cai à metade (inversa) ou nenhum dos dois (não proporcional).' };
    },
    () => {
      const emb = mix([[pick([200, 250]), null], [pick([400, 500]), null], [pick([900, 1000]), null]]).map(([g]) => [g, +(g / 100 * (1.2 + Math.random() * 0.9)).toFixed(2)]);
      const pu = emb.map(([g, p]) => p / g * 100), best = pu.indexOf(Math.min(...pu)), rot = ['A', 'B', 'C'];
      const fig = tabela(['Embalagem', 'Conteúdo', 'Preço', ''], emb.map(([g, p], i) => [rot[i], g + ' g', R(p), '🫙']), 'Café em pó no mercado');
      return { h: 'H18', tema: 'A embalagem mais vantajosa', fig,
        enun: `Um mercado vende café nas três embalagens da tabela. Qual compra sai <b>mais barata por grama</b>?`,
        certa: `Embalagem ${rot[best]}, a ${R(pu[best])} a cada 100 g`, erradas: [0, 1, 2].filter(i => i !== best).map(i => `Embalagem ${rot[i]}, a ${R(pu[i])} a cada 100 g`).concat([`Embalagem ${rot[pu.indexOf(Math.max(...pu))]}, porque é a de menor preço a cada 100 g`, 'Todas têm o mesmo preço por grama']),
        expl: `Divida preço por quantidade: ${emb.map(([g, p], i) => `${rot[i]}: ${R(p)} ÷ ${g} × 100 = ${R(pu[i])}`).join('; ')}. A menor é a <b>${rot[best]}</b>.`,
        mac: 'Compare sempre o preço da mesma quantidade (por 100 g, por litro, por unidade).' };
    },
    () => {
      const kmL = pick([10, 12, 12.5, 14, 15]), d = pick([300, 420, 450, 600]), pr = pick([5.5, 5.8, 6, 6.2]), L = d / kmL, custo = L * pr;
      return { h: 'H17', tema: 'Consumo de combustível',
        enun: `Um carro faz <b>${f(kmL)} km por litro</b>. Numa viagem de ${d} km, com gasolina a ${R(pr)} o litro, o gasto com combustível será de:`,
        certa: R(custo), erradas: [R(d * kmL * pr / 100), R(L), R(d / pr), R(custo * 1.5), R(d * pr / 10)],
        expl: `Litros = ${d} ÷ ${f(kmL)} = ${f(L, 2)} L. Custo = ${f(L, 2)} × ${R(pr)} = <b>${R(custo)}</b>.`,
        mac: 'km/L: divide a distância pelo rendimento para achar os litros.' };
    }
  ];

  /* ===================== 🧮 EQUAÇÕES DO DIA A DIA (H19, H21, H22, H23) ===================== */
  function eixosReta(fns, o = {}) {
    const W = 440, H = 230, x0 = 50, y0 = 195, xm = o.xm || 10, ym = o.ym || 100, X = x => x0 + x / xm * (W - x0 - 20), Y = y => y0 - y / ym * (y0 - 20);
    let s = linha(x0, y0, W - 10, y0) + linha(x0, 15, x0, y0) + t(W - 14, y0 - 6, o.lx || 'x', { size: 12, anchor: 'end' }) + t(x0 - 8, 10, o.ly || 'y', { size: 12, anchor: 'start' });
    for (let k = 1; k <= 5; k++) { const xv = xm * k / 5, yv = ym * k / 5; s += linha(X(xv), y0, X(xv), y0 + 5) + t(X(xv), y0 + 18, f(xv), { size: 11 }) + linha(x0 - 5, Y(yv), x0, Y(yv)) + t(x0 - 8, Y(yv) + 4, f(yv), { size: 11, anchor: 'end' }) + linha(x0, Y(yv), W - 10, Y(yv), { cor: '#f0ebdc', w: 1 }); }
    fns.forEach(([fn, cor, nome], k) => {
      const pts = []; for (let i = 0; i <= 60; i++) { const x = xm * i / 60, y = fn(x); if (y >= 0 && y <= ym * 1.02) pts.push(X(x) + ',' + Y(y)); }
      s += `<polyline fill="none" stroke="${cor}" stroke-width="3.5" points="${pts.join(' ')}"/>` + (nome ? rect(x0 + 40, 24 + k * 20, 12, 12, cor, { w: 1 }) + t(x0 + 58, 35 + k * 20, nome, { size: 12, anchor: 'start' }) : '');
    });
    return svg(W, H, s, 'Gráfico');
  }
  const algebra = [
    () => {
      const B = pick([4, 4.5, 5, 5.5, 6]), p = pick([2.5, 2.75, 3, 3.2, 3.5]);
      const ex = (a, b) => `P(x) = ${f(a)} + ${f(b)}x`;
      return { h: 'H19', tema: 'Função afim (táxi)', fig: eixosReta([[x => B + p * x, C.amarelo, 'táxi']], { xm: 10, ym: 50, lx: 'km rodados', ly: 'preço (R$)' }),
        enun: `Uma corrida de táxi custa <b>${R(B)} de bandeirada</b> mais <b>${R(p)} por quilômetro rodado</b>. A expressão do preço P, em reais, de uma corrida de x km é:`,
        certa: ex(B, p), erradas: [ex(p, B), `P(x) = ${f(B + p)}x`, `P(x) = ${f(B)}x + ${f(p)}x²`, `P(x) = ${f(B)} − ${f(p)}x`, `P(x) = ${f(B * p)}x`],
        expl: `O valor fixo (bandeirada) é o termo independente e o valor por km multiplica x: <b>${ex(B, p)}</b>. No gráfico, ${f(B)} é onde a reta corta o eixo do preço.`,
        mac: 'Função afim f(x) = ax + b: b é o fixo (corta o eixo y) e a é a taxa (quanto sobe por unidade).' };
    },
    () => {
      const F = pick([60, 70, 80, 90, 100]), a = pick([20, 25, 30, 35]), b = pick([0.25, 0.5, 0.4]), x = (F - a) / b;
      if (x % 1 || x <= 0) return algebra[1]();
      return { h: 'H23', tema: 'Qual plano compensa?', fig: eixosReta([[() => F, C.azul, 'Plano A'], [m => a + b * m, C.vermelho, 'Plano B']], { xm: Math.ceil(x * 2 / 50) * 50, ym: Math.ceil((a + b * x * 2) / 20) * 20, lx: 'minutos', ly: 'R$' }),
        enun: `Plano A: <b>${R(F)}</b> fixos por mês, ligações à vontade. Plano B: <b>${R(a)}</b> por mês mais <b>${R(b)} por minuto</b>. A partir de quantos minutos por mês o plano A passa a ser mais vantajoso?`,
        certa: `Mais de ${f(x, 0)} minutos`, erradas: [`Mais de ${f(F / b, 0)} minutos`, `Mais de ${f((F + a) / b, 0)} minutos`, `Mais de ${f(x / 2, 0)} minutos`, `Mais de ${f(F - a, 0)} minutos`, 'O plano A nunca compensa'],
        expl: `Iguale os planos: ${f(a)} + ${f(b)}m = ${f(F)} → ${f(b)}m = ${f(F - a)} → m = <b>${f(x, 0)} minutos</b>. Depois desse ponto (onde as retas se cruzam), o B fica mais caro.`,
        mac: '“A partir de quando compensa” = ponto de encontro das retas: iguale as duas expressões.' };
    },
    () => {
      const tot = pick([200, 300, 400, 500]), pi = pick([20, 30, 40]), m = int(tot * 0.2, tot * 0.6) | 0, i2 = tot - m, arr = i2 * pi + m * pi / 2;
      return { h: 'H21', tema: 'Sistema de equações',
        enun: `Num show, a inteira custava ${R(pi)} e a meia-entrada ${R(pi / 2)}. Entraram <b>${tot} pessoas</b> e foram arrecadados <b>${R(arr)}</b>. Quantas pessoas pagaram meia?`,
        certa: String(m), erradas: [String(i2), String(Math.round(arr / pi)), String(tot / 2), String(m + 20), String(Math.round(arr / (pi / 2)) - tot), String(m - 10), String(m + 10), String(2 * m)],
        expl: `i + m = ${tot} e ${f(pi)}i + ${f(pi / 2)}m = ${f(arr)}. Se todos pagassem inteira, daria ${R(tot * pi)}; faltaram ${R(tot * pi - arr)}, e cada meia “tira” ${R(pi / 2)}: m = ${f(tot * pi - arr)} ÷ ${f(pi / 2)} = <b>${m}</b>.`,
        mac: 'Truque do “e se todos fossem…”: suponha tudo de um tipo e veja quanto falta ou sobra.' };
    },
    () => {
      const b = pick([20, 24, 30, 40, 50, 60]), c = pick([0, 50, 100]), xv = b / 2, L = -xv * xv + b * xv - c;
      return { h: 'H21', tema: 'Lucro máximo (parábola)', fig: eixosReta([[x => -x * x + b * x - c, C.verde, 'lucro']], { xm: b, ym: Math.ceil(L * 1.2 / 50) * 50, lx: 'unidades', ly: 'lucro' }),
        enun: `O lucro de uma pequena fábrica, em reais, ao vender x unidades por dia, é L(x) = −x² + ${b}x${c ? ' − ' + c : ''}. Quantas unidades ela deve vender por dia para ter o <b>lucro máximo</b>?`,
        certa: `${xv} unidades`, erradas: [`${b} unidades`, `${b / 4} unidades`, `${L} unidades`, `${xv + 2} unidades`, `${b * 2} unidades`],
        expl: `O máximo está no vértice da parábola: x<sub>v</sub> = −b/(2a) = −${b}/(2·(−1)) = <b>${xv}</b>. O lucro máximo seria L(${xv}) = ${R(L)}.`,
        mac: 'Máximo ou mínimo de função do 2º grau → vértice: xᵥ = −b/2a. O valor máximo é f(xᵥ).' };
    },
    () => {
      const n0 = pick([100, 200, 500, 1000]), d = pick([1, 2, 3, 4]), tt = d * pick([3, 4, 5]), k = tt / d, N = n0 * 2 ** k;
      return { h: 'H19', tema: 'Função exponencial', fig: barras(Array.from({ length: k + 1 }, (_, i) => [`${i * d} h`, n0 * 2 ** i]), { titulo: 'Bactérias na cultura', cor: C.rosa, valores: k < 6 }),
        enun: `Uma cultura começa com <b>${n0} bactérias</b>, e a população <b>dobra a cada ${d} hora${d > 1 ? 's' : ''}</b>. Depois de ${tt} horas, quantas bactérias haverá?`,
        certa: N.toLocaleString('pt-BR'), erradas: [(n0 * 2 * k).toLocaleString('pt-BR'), (n0 * 2 ** tt).toLocaleString('pt-BR'), (n0 * k ** 2).toLocaleString('pt-BR'), (n0 * 2 ** (k - 1)).toLocaleString('pt-BR'), (n0 + 2 ** k).toLocaleString('pt-BR'), (N * 2).toLocaleString('pt-BR'), (N / 2).toLocaleString('pt-BR'), (N * 4).toLocaleString('pt-BR')],
        expl: `Em ${tt} h há ${tt}/${d} = ${k} duplicações: N = ${n0} · 2<sup>${k}</sup> = ${n0} · ${2 ** k} = <b>${N.toLocaleString('pt-BR')}</b>.`,
        mac: 'Dobra a cada período: N = N₀·2^(t/período). Meia-vida é o mesmo, com (1/2) no lugar de 2.' };
    },
    () => {
      const x = int(8, 30), a = int(2, 4), s = x + a * x + pick([0, 5, 10]), extra = s - x - a * x;
      return { h: 'H21', tema: 'Equação do 1º grau',
        enun: `Duas irmãs juntaram ${R(s)} para um presente. A mais velha deu <b>${a} vezes</b> o que a mais nova deu${extra ? ` mais ${R(extra)}` : ''}. Quanto deu a mais nova?`,
        certa: R(x), erradas: [R(s / (a + 1)), R(a * x + extra), R(s / a), R(x + extra), R(s - x), R(x + 1), R(2 * x), R(x - 2)],
        expl: `Seja x a parte da mais nova: x + (${a}x${extra ? ' + ' + extra : ''}) = ${s} → ${a + 1}x = ${s - extra} → x = <b>${R(x)}</b>.`,
        mac: 'Chame de x o que é desconhecido, escreva a frase em matemática e isole o x.' };
    },
    () => {
      const v = pick([2, 3, 4]), dd = pick([[60, 'carro A'], [80, 'carro B']]);
      const P = pick([['Se o lado de um quadrado dobra, a área dobra.', 'Se o lado de um quadrado dobra, a área fica 4 vezes maior.', 'A área é lado²: (2L)² = 4L².'],
        [`Se a velocidade de um carro triplica, o tempo de viagem triplica.`, `Se a velocidade triplica, o tempo de viagem cai para um terço.`, 'v·t = distância (fixa): grandezas inversamente proporcionais.'],
        ['Um aumento de 10% seguido de outro de 10% dá 20% de aumento.', 'Dois aumentos de 10% dão 21% de aumento.', '1,1 × 1,1 = 1,21.'],
        ['Se o raio de uma pizza dobra, ela fica com o dobro de pizza.', 'Se o raio de uma pizza dobra, a área fica 4 vezes maior.', 'A área do círculo é πr²: dobrar r multiplica por 4.'],
        ['Se a aresta de um cubo dobra, o volume dobra.', 'Se a aresta de um cubo dobra, o volume fica 8 vezes maior.', 'V = a³: (2a)³ = 8a³.']]);
      return { h: 'H22', tema: 'Argumentação algébrica',
        enun: 'Um estudante fez a afirmação: <i>“' + P[0] + '”</i>. Qual é a correção certa?',
        certa: P[1], erradas: ['A afirmação está correta.', P[1].replace(/4 vezes|8 vezes|21%|um terço/, m => ({ '4 vezes': '3 vezes', '8 vezes': '6 vezes', '21%': '22%', 'um terço': 'a metade' }[m])), P[1].replace(/4 vezes|8 vezes|21%|um terço/, m => ({ '4 vezes': '2,5 vezes', '8 vezes': '4 vezes', '21%': '19%', 'um terço': 'um nono' }[m])), 'Depende do valor inicial, não dá para saber.'],
        expl: `${P[2]} Por isso: <b>${P[1]}</b>`,
        mac: 'Na dúvida, teste com números: lado 1 → área 1; lado 2 → área 4.' };
    }
  ];

  /* ===================== 📊 LEITOR DE GRÁFICOS (H24, H25, H26) ===================== */
  const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun'];
  const graficos = [
    () => {
      let v = [int(20, 40)]; for (let i = 1; i < 6; i++) v.push(Math.max(5, v[i - 1] + int(-12, 18)));
      const dif = v.slice(1).map((x, i) => x - v[i]), mx = Math.max(...dif), im = dif.indexOf(mx);
      if (dif.filter(d => d === mx).length > 1) return graficos[0]();
      return { h: 'H24', tema: 'Maior aumento', fig: barras(MESES.map((m, i) => [m, v[i]]), { titulo: 'Vendas de bicicletas (unidades)' }),
        enun: 'O gráfico mostra as vendas de bicicletas numa loja. Entre quais meses consecutivos houve o <b>maior aumento</b> nas vendas?',
        certa: `${MESES[im]} → ${MESES[im + 1]}`, erradas: dif.map((d, i) => `${MESES[i]} → ${MESES[i + 1]}`).filter((_, i) => i !== im),
        expl: `Calcule a diferença de cada mês para o anterior: ${dif.map((d, i) => `${MESES[i + 1]}: ${d > 0 ? '+' : ''}${d}`).join(', ')}. O maior aumento é <b>+${mx}</b>, de ${MESES[im]} para ${MESES[im + 1]}.`,
        mac: '“Maior aumento” não é o mês mais alto: é o maior degrau entre duas barras vizinhas.' };
    },
    () => {
      const h = ['6h', '9h', '12h', '15h', '18h', '21h']; let v = [int(8, 14)]; v.push(v[0] + int(3, 6)); v.push(v[1] + int(3, 7)); v.push(v[2] + int(-1, 3)); v.push(v[3] - int(3, 7)); v.push(v[4] - int(2, 6));
      const amp = Math.max(...v) - Math.min(...v);
      return { h: 'H25', tema: 'Amplitude térmica', fig: linhas([{ nome: 'temp', dados: h.map((x, i) => [x, v[i]]), cor: C.vermelho }], { titulo: 'Temperatura ao longo do dia (°C)', min: 0 }),
        enun: 'O gráfico mostra a temperatura de uma cidade ao longo de um dia. A <b>amplitude térmica</b> (diferença entre a maior e a menor temperatura registradas) foi de:',
        certa: `${amp} °C`, erradas: [`${Math.max(...v)} °C`, `${v[5] - v[0]} °C`.replace('-', '−'), `${amp + 2} °C`, `${Math.abs(v[2] - v[0])} °C`, `${amp - 2} °C`],
        expl: `Maior: ${Math.max(...v)} °C. Menor: ${Math.min(...v)} °C. Amplitude = ${Math.max(...v)} − ${Math.min(...v)} = <b>${amp} °C</b>.`,
        mac: 'Amplitude = máximo − mínimo (de todo o gráfico, não só do primeiro e último ponto).' };
    },
    () => {
      const p = mix([[35, 'Moradia'], [25, 'Alimentação'], [15, 'Transporte'], [10, 'Lazer'], [15, 'Outros']]), tot = pick([2400, 3000, 3600, 4000]), alvo = pick(p);
      return { h: 'H25', tema: 'Gráfico de setores', fig: pizza(p.map(x => [x[1], x[0]]), { titulo: 'Orçamento mensal da família' }),
        enun: `Uma família tem renda de <b>${R(tot)}</b> por mês, dividida como no gráfico. Quanto ela gasta com <b>${alvo[1].toLowerCase()}</b>?`,
        certa: R(tot * alvo[0] / 100), erradas: [R(alvo[0] * 10), R(tot / p.length), R(tot * (alvo[0] + 10) / 100), R(tot * alvo[0] / 1000), R(tot - tot * alvo[0] / 100)],
        expl: `${alvo[0]}% de ${R(tot)} = ${f(alvo[0] / 100)} × ${f(tot)} = <b>${R(tot * alvo[0] / 100)}</b>.`,
        mac: 'Setores somam 100%. Ângulo do setor = porcentagem × 3,6°.' };
    },
    () => {
      const a1 = pick([200, 250, 400]), a2 = a1 * pick([1.1, 1.2, 1.25, 1.5]), b1 = pick([300, 500, 600]), b2 = b1 * pick([1.05, 1.1, 1.2, 1.4]);
      const pa = (a2 / a1 - 1) * 100, pb = (b2 / b1 - 1) * 100; if (Math.abs(pa - pb) < 1) return graficos[3]();
      const maior = pa > pb ? 'Escola A' : 'Escola B', absMaior = (a2 - a1) > (b2 - b1) ? 'A' : 'B';
      return { h: 'H26', tema: 'Crescimento absoluto x relativo', fig: tabela(['Escola', '2024', '2025', 'Aumento'], [['A', f(a1, 0), f(a2, 0), '+' + f(a2 - a1, 0)], ['B', f(b1, 0), f(b2, 0), '+' + f(b2 - b1, 0)]], 'Alunos matriculados'),
        enun: 'A tabela mostra os alunos matriculados em duas escolas. Qual escola teve o maior crescimento <b>percentual</b>?',
        certa: `${maior}, com ${pct(Math.max(pa, pb))}`, erradas: [`${maior === 'Escola A' ? 'Escola B' : 'Escola A'}, com ${pct(Math.min(pa, pb))}`, `Escola ${absMaior}, porque ganhou mais alunos`, 'As duas cresceram igual', `${maior}, com ${pct(Math.max(pa, pb) + 10)}`],
        expl: `A: ${f(a2 - a1, 0)}/${f(a1, 0)} = ${pct(pa)}. B: ${f(b2 - b1, 0)}/${f(b1, 0)} = ${pct(pb)}. Quem ganhou mais alunos nem sempre cresceu mais em porcentagem.`,
        mac: 'Crescimento percentual = aumento ÷ valor inicial. O ENEM adora confundir aumento absoluto com relativo.' };
    },
    () => {
      const v = Array.from({ length: 5 }, () => int(4, 20) * 5), m = v.reduce((a, b) => a + b, 0) / 5, d = ['seg', 'ter', 'qua', 'qui', 'sex'];
      return { h: 'H25', tema: 'Média num gráfico', fig: barras(d.map((x, i) => [x, v[i]]), { titulo: 'Garrafas recicladas por dia', cor: C.verde }),
        enun: 'Uma turma registrou quantas garrafas recolheu para reciclagem em cada dia da semana. A <b>média diária</b> foi de:',
        certa: f(m, 1) + ' garrafas', erradas: [f(v.reduce((a, b) => a + b, 0), 0) + ' garrafas', f((Math.max(...v) + Math.min(...v)) / 2, 1) + ' garrafas', f(v.slice().sort((a, b) => a - b)[2], 0) + ' garrafas', f(m + 5, 1) + ' garrafas', f(m - 5, 1) + ' garrafas', f(m + 10, 1) + ' garrafas', f(m - 10, 1) + ' garrafas'],
        expl: `Soma: ${v.join(' + ')} = ${v.reduce((a, b) => a + b, 0)}. Média = soma ÷ 5 = <b>${f(m, 1)}</b>.`,
        mac: 'Média = soma ÷ quantidade. A média fica sempre entre o menor e o maior valor.' };
    },
    () => {
      const a = [int(30, 50)], b = [int(60, 80)]; for (let i = 1; i < 6; i++) { a.push(a[i - 1] + int(4, 10)); b.push(b[i - 1] - int(1, 6)); }
      const cruza = a.findIndex((x, i) => x >= b[i]);
      const anos = ['2020', '2021', '2022', '2023', '2024', '2025'];
      const afirm = cruza >= 0 ? `A partir de ${anos[cruza]}, o uso de celular para ler notícias superou o de TV.` : 'Em todo o período, a TV foi mais usada do que o celular.';
      return { h: 'H26', tema: 'Conclusão a partir do gráfico', fig: linhas([{ nome: 'celular', dados: anos.map((x, i) => [x.slice(2), a[i]]), cor: C.azul }, { nome: 'TV', dados: anos.map((x, i) => [x.slice(2), b[i]]), cor: C.amarelo }], { titulo: '% de pessoas que se informam por cada meio', min: 0, max: 100, valores: false }),
        enun: 'O gráfico mostra a porcentagem de pessoas que se informam pelo celular e pela TV em seis anos. Qual conclusão é <b>sustentada</b> pelos dados?',
        certa: afirm, erradas: ['O uso da TV cresceu todos os anos.', 'O uso do celular diminuiu no período.', `Em ${anos[0]}, mais pessoas usavam o celular do que a TV.`, 'Os dois meios sempre tiveram a mesma porcentagem.', cruza >= 0 ? 'Em todo o período, a TV foi mais usada do que o celular.' : `A partir de ${anos[3]}, o celular superou a TV.`],
        expl: `Celular: ${a.join(', ')} (sobe). TV: ${b.join(', ')} (cai). ${cruza >= 0 ? `As linhas se cruzam em ${anos[cruza]}.` : 'As linhas não se cruzam.'} Só a afirmação “${afirm}” bate com os dados.`,
        mac: 'Nas questões de “conclusão”, elimine as alternativas que afirmam algo que o gráfico não mostra (causa, futuro, outros lugares).' };
    }
  ];

  /* ===================== 🎯 MÉDIA, MEDIANA E MODA (H27, H29) ===================== */
  const estat = [
    () => {
      const n = pick([5, 7, 6, 8]), v = Array.from({ length: n }, () => int(2, 10)), s = v.slice().sort((a, b) => a - b);
      const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
      return { h: 'H27', tema: 'Mediana', fig: svg(440, 100, v.map((x, i) => rect(20 + i * 52, 30, 44, 44, C.creme, { rx: 8 }) + t(42 + i * 52, 59, x, { size: 18, peso: 800 })).join(''), 'Gols por partida'),
        enun: `Um time marcou estes números de gols em ${n} partidas: <b>${v.join(', ')}</b>. A mediana é:`,
        certa: f(med, 1), erradas: [f(v[Math.floor(n / 2)], 1), f(v.reduce((a, b) => a + b, 0) / n, 1), f((s[0] + s[n - 1]) / 2 + 0.5, 1), f(med + 1, 1), f(s[Math.floor(n / 2) + 1] || med - 1, 1), f(med + 2, 1), f(med - 1, 1), f(med + 0.5, 1)],
        expl: `Ordene: ${s.join(', ')}. ${n % 2 ? `Com ${n} valores, a mediana é o do meio (${(n + 1) / 2}º): <b>${f(med, 1)}</b>.` : `Com ${n} valores (par), é a média dos dois do meio: (${s[n / 2 - 1]} + ${s[n / 2]}) ÷ 2 = <b>${f(med, 1)}</b>.`}`,
        mac: 'Mediana: ORDENE primeiro. Quantidade par → média dos dois centrais.' };
    },
    () => {
      const tam = [34, 35, 36, 37, 38, 39], q = tam.map(() => int(2, 12)); const mx = Math.max(...q); if (q.filter(x => x === mx).length > 1) return estat[1]();
      const moda = tam[q.indexOf(mx)];
      return { h: 'H27', tema: 'Moda', fig: barras(tam.map((x, i) => [String(x), q[i]]), { titulo: 'Pares vendidos por número', cor: C.rosa }),
        enun: 'Uma sapataria quer repor o estoque do número que <b>mais vende</b>. Pelo gráfico, a moda dos números vendidos é:',
        certa: String(moda), erradas: [String(mx), ...tam.filter(x => x !== moda).map(String)],
        expl: `Moda é o valor que mais aparece: o número <b>${moda}</b>, com ${mx} pares. (Cuidado: ${mx} é a frequência, não a moda.)`,
        mac: 'Moda = o que está “na moda”, o que mais se repete. Não confunda o valor com quantas vezes ele aparece.' };
    },
    () => {
      const notas = [int(4, 9), int(5, 10), int(3, 9)], pesos = pick([[1, 2, 3], [2, 3, 5], [1, 1, 2], [3, 3, 4]]), sp = pesos.reduce((a, b) => a + b, 0), m = notas.reduce((s, x, i) => s + x * pesos[i], 0) / sp;
      return { h: 'H27', tema: 'Média ponderada', fig: tabela(['Prova', 'Nota', 'Peso'], notas.map((x, i) => [`${i + 1}ª`, x, pesos[i]]), 'Boletim'),
        enun: 'Numa disciplina, cada prova tem um peso diferente (tabela). A média final do aluno é:',
        certa: f(m, 2), erradas: [f(notas.reduce((a, b) => a + b, 0) / 3, 2), f(notas.reduce((s, x, i) => s + x * pesos[i], 0) / 3, 2), f(m + 0.5, 2), f(m - 0.5, 2), f(notas.reduce((s, x, i) => s + x * pesos[i], 0) / 10, 2)],
        expl: `Média ponderada = (${notas.map((x, i) => `${x}·${pesos[i]}`).join(' + ')}) ÷ (${pesos.join(' + ')}) = ${notas.reduce((s, x, i) => s + x * pesos[i], 0)} ÷ ${sp} = <b>${f(m, 2)}</b>.`,
        mac: 'Ponderada: cada nota × seu peso, soma tudo e divide pela SOMA DOS PESOS.' };
    },
    () => {
      const n = pick([3, 4]), alvo = pick([6, 7]), v = Array.from({ length: n }, () => int(4, 9)), falta = alvo * (n + 1) - v.reduce((a, b) => a + b, 0);
      if (falta < 1 || falta > 10) return estat[3]();
      return { h: 'H27', tema: 'Nota que falta',
        enun: `Para passar, Júlia precisa de média ${alvo} em ${n + 1} provas. Nas ${n} primeiras ela tirou <b>${v.join(', ')}</b>. Qual a nota mínima na última prova?`,
        certa: f(falta, 1), erradas: [f(alvo, 1), f(alvo * n - v.reduce((a, b) => a + b, 0) + alvo / 2, 1), f(falta - 1, 1), f(falta + 1, 1), f(Math.min(10, falta + 2), 1)],
        expl: `A soma precisa ser ${alvo} × ${n + 1} = ${alvo * (n + 1)}. Ela tem ${v.reduce((a, b) => a + b, 0)}. Falta <b>${f(falta, 1)}</b>.`,
        mac: 'Média que se quer × número de provas = soma necessária. Desconte o que já tem.' };
    },
    () => {
      const base = int(60, 80), a = [base - 1, base, base + 1, base, base], b = [base - 12, base + 10, base - 6, base + 9, base - 1];
      const ma = a.reduce((x, y) => x + y) / 5, mb = b.reduce((x, y) => x + y) / 5;
      return { h: 'H29', tema: 'Regularidade (desvio padrão)', fig: linhas([{ nome: 'Atleta A', dados: ['1ª', '2ª', '3ª', '4ª', '5ª'].map((x, i) => [x, a[i]]), cor: C.azul }, { nome: 'Atleta B', dados: ['1ª', '2ª', '3ª', '4ª', '5ª'].map((x, i) => [x, b[i]]), cor: C.vermelho }], { titulo: 'Pontuação em cinco provas', min: base - 20, max: base + 20, valores: false }),
        enun: `Os atletas A e B tiveram médias parecidas (${f(ma, 1)} e ${f(mb, 1)}). O técnico quer o atleta <b>mais regular</b>. Ele deve escolher:`,
        certa: 'A, porque tem o menor desvio padrão', erradas: ['B, porque tem o maior desvio padrão', 'B, porque tem a maior nota isolada', 'A, porque tem a maior média', 'Qualquer um, porque as médias são parecidas'],
        expl: 'Regularidade é pouca variação em torno da média. As notas de A quase não mudam, as de B sobem e descem muito. Menor desvio padrão = <b>mais regular: A</b>.',
        mac: 'Desvio padrão (ou variância) pequeno = dados juntinhos = regular, homogêneo, constante.' };
    },
    () => {
      const sal = [1500, 1600, 1700, 1800, 1500, 1600, pick([15000, 20000, 25000])], s = sal.slice().sort((a, b) => a - b), md = s[3], mn = sal.reduce((a, b) => a + b) / 7;
      return { h: 'H29', tema: 'Média ou mediana?', fig: barras(sal.map((x, i) => [`F${i + 1}`, x / 1000]), { titulo: 'Salários de uma pequena empresa (mil R$)', cor: C.amarelo }),
        enun: `Numa empresa de 7 funcionários, um deles (o dono) ganha muito mais que os outros. Para descrever o “salário típico” da empresa, a melhor medida é:`,
        certa: `A mediana, ${R(md)}, porque não é puxada pelo valor muito alto`, erradas: [`A média, ${R(mn)}, porque usa todos os valores`, `A moda, ${R(25000)}, porque é o maior valor`, `O maior salário, porque representa o topo`, `A média, ${R(mn)}, porque é sempre a melhor medida`],
        expl: `A média (${R(mn)}) fica bem acima de quase todos, puxada pelo salário alto. A mediana (${R(md)}) representa melhor o funcionário típico.`,
        mac: 'Valor muito discrepante (outlier) puxa a média. Nesses casos, a mediana descreve melhor.' };
    }
  ];

  /* ===================== 🎲 CONTAGEM E PROBABILIDADE (H3, H28, H30) ===================== */
  const prob = [
    () => {
      const tipo = pick(['senha', 'roupa', 'placa']);
      if (tipo === 'roupa') { const c = int(3, 6), cal = int(2, 5), s = int(2, 4); return { h: 'H3', tema: 'Princípio multiplicativo', fig: svg(440, 110, t(70, 60, '👕 × ' + c, { size: 22, peso: 700 }) + t(210, 60, '👖 × ' + cal, { size: 22, peso: 700 }) + t(350, 60, '👟 × ' + s, { size: 22, peso: 700 }), 'Roupas'),
        enun: `Para a festa, Júlia tem ${c} camisetas, ${cal} calças e ${s} pares de tênis. Usando uma peça de cada tipo, de quantas maneiras diferentes ela pode se vestir?`,
        certa: String(c * cal * s), erradas: [String(c + cal + s), String(c * cal + s), String(c * cal * s * 2), String(c * cal), String((c + cal) * s)],
        expl: `Princípio multiplicativo: ${c} × ${cal} × ${s} = <b>${c * cal * s}</b> combinações.`, mac: 'Escolhas em sequência (“e”) → multiplica. Escolha de um OU outro → soma.' }; }
      if (tipo === 'senha') { const n = pick([3, 4]), rep = Math.random() < 0.5, tot = rep ? 10 ** n : fat(10) / fat(10 - n); return { h: 'H28', tema: 'Senhas',
        enun: `Uma senha tem <b>${n} algarismos</b> (de 0 a 9)${rep ? ', podendo repetir' : ', todos <b>distintos</b>'}. Quantas senhas são possíveis?`,
        certa: tot.toLocaleString('pt-BR'), erradas: [(rep ? fat(10) / fat(10 - n) : 10 ** n).toLocaleString('pt-BR'), comb(10, n).toLocaleString('pt-BR'), (10 * n).toLocaleString('pt-BR'), (9 ** n).toLocaleString('pt-BR')],
        expl: rep ? `Cada posição tem 10 opções: 10${'×10'.repeat(n - 1)} = <b>${tot.toLocaleString('pt-BR')}</b>.` : `Sem repetir: ${Array.from({ length: n }, (_, k) => 10 - k).join(' × ')} = <b>${tot.toLocaleString('pt-BR')}</b>.`,
        mac: 'Senha, placa, fila: a ordem importa → multiplica as opções de cada posição.' }; }
      const tot = 26 ** 3 * 10 ** 4; return { h: 'H28', tema: 'Placas de carro',
        enun: 'Uma placa antiga tinha 3 letras (26 opções cada) seguidas de 4 algarismos (10 opções cada), podendo repetir. Quantas placas eram possíveis?',
        certa: '26³ × 10⁴', erradas: ['26 × 3 + 10 × 4', '3²⁶ × 4¹⁰', '26 × 25 × 24 × 10⁴', '(26 + 10)⁷'],
        expl: 'Cada letra tem 26 opções e cada algarismo 10: 26·26·26·10·10·10·10 = <b>26³ × 10⁴</b> (cerca de 175 milhões).', mac: 'Posições independentes → multiplica as opções de cada uma.' };
    },
    () => {
      const n = pick([5, 6, 7, 8, 10]), k = pick([2, 3]), c = comb(n, k);
      return { h: 'H28', tema: 'Combinação (a ordem não importa)',
        enun: `De uma turma de ${n} alunos, o professor vai escolher uma <b>comissão de ${k}</b> para organizar a formatura. Quantas comissões diferentes podem ser formadas?`,
        certa: String(c), erradas: [String(fat(n) / fat(n - k)), String(n * k), String(n ** k), String(c * 2), String(n + k)],
        expl: `Na comissão a ordem não importa. C(${n},${k}) = ${n}!/(${k}!·${n - k}!) = ${fat(n) / fat(n - k)} ÷ ${fat(k)} = <b>${c}</b>.`,
        mac: 'Pergunte: trocar a ordem muda o resultado? Não muda (comissão, grupo, salada) → combinação: divida pelo fatorial de k.' };
    },
    () => {
      const tipo = pick(['soma', 'par', 'maior']);
      if (tipo === 'soma') { const s = pick([7, 6, 8, 5, 9, 10, 4]), casos = 6 - Math.abs(7 - s); return { h: 'H28', tema: 'Dois dados', fig: svg(440, 90, t(150, 62, '🎲', { size: 50 }) + t(230, 62, '🎲', { size: 50 }) + t(340, 55, `soma = ${s}?`, { size: 20, peso: 800 }), 'Dois dados'),
        enun: `Dois dados comuns são lançados. Qual a probabilidade de a soma das faces ser <b>${s}</b>?`,
        certa: MAT.frac(casos, 36), erradas: [MAT.frac(1, 11), MAT.frac(1, 6) === MAT.frac(casos, 36) ? MAT.frac(1, 12) : MAT.frac(1, 6), MAT.frac(s, 36), MAT.frac(casos, 12), MAT.frac(casos + 1, 36)],
        expl: `São 6 × 6 = 36 resultados igualmente prováveis. Somam ${s}: ${Array.from({ length: 6 }, (_, a) => a + 1).filter(a => s - a >= 1 && s - a <= 6).map(a => `(${a},${s - a})`).join(' ')} → ${casos} casos. P = ${casos}/36 = <b>${MAT.frac(casos, 36)}</b>.`,
        mac: 'Dois dados = 36 casos. A soma 7 é a mais provável (6 casos).' }; }
      const a = pick([[3, 'um número par', [2, 4, 6]], [2, 'um número maior que 4', [5, 6]], [2, 'um múltiplo de 3', [3, 6]], [3, 'um número primo', [2, 3, 5]], [4, 'um número menor que 5', [1, 2, 3, 4]]]);
      return { h: 'H28', tema: 'Um dado', enun: `Ao lançar um dado comum, qual a probabilidade de sair <b>${a[1]}</b>?`,
        certa: MAT.frac(a[0], 6), erradas: [MAT.frac(1, 6), MAT.frac(a[0], 12), MAT.frac(6 - a[0], 6), MAT.frac(a[0] + 1, 6), MAT.frac(1, a[0] + 1)].filter(x => x !== MAT.frac(a[0], 6)),
        expl: `Casos favoráveis: ${a[2].join(', ')} (${a[0]}). Possíveis: 6. P = ${a[0]}/6 = <b>${MAT.frac(a[0], 6)}</b>.`, mac: 'P = casos favoráveis ÷ casos possíveis.' };
    },
    () => {
      const az = int(2, 6), vm = int(2, 6), am = int(1, 4), tot = az + vm + am, cor = pick([['azul', az, C.azul], ['vermelha', vm, C.vermelho], ['amarela', am, C.amarelo]]);
      const bolas = [...Array(az).fill(C.azul), ...Array(vm).fill(C.vermelho), ...Array(am).fill(C.amarelo)];
      let s = `<path d="M120,30 L120,170 Q120,185 135,185 L305,185 Q320,185 320,170 L320,30" fill="#f7fbff" stroke="${INK}" stroke-width="3"/>`;
      mix(bolas).forEach((c, i) => { s += `<circle cx="${148 + (i % 6) * 29}" cy="${165 - Math.floor(i / 6) * 29}" r="13" fill="${c}" stroke="${INK}" stroke-width="1.5"/>`; });
      return { h: 'H28', tema: 'Urna', fig: svg(440, 200, s, 'Urna com bolas coloridas'),
        enun: `Uma urna tem ${az} bolas azuis, ${vm} vermelhas e ${am} amarelas. Sorteando uma bola ao acaso, qual a probabilidade de ela ser <b>${cor[0]}</b>?`,
        certa: MAT.frac(cor[1], tot), erradas: [MAT.frac(1, 3), MAT.frac(cor[1], tot - cor[1]), MAT.frac(tot - cor[1], tot), MAT.frac(1, tot), MAT.frac(cor[1] + 1, tot)],
        expl: `Total: ${tot} bolas. Bolas ${cor[0] === 'azul' ? 'azuis' : cor[0] === 'vermelha' ? 'vermelhas' : 'amarelas'}: ${cor[1]}. P = ${cor[1]}/${tot} = <b>${MAT.frac(cor[1], tot)}</b>.`,
        mac: 'Não divida por 3 só porque há 3 cores: as cores têm quantidades diferentes.' };
    },
    () => {
      const p = pick([10, 20, 30, 40, 50]), n = pick([2, 3]), r = 100 - 100 * (1 - p / 100) ** n;
      return { h: 'H28', tema: '“Pelo menos um”',
        enun: `A chance de chover em cada dia de um feriado é de <b>${p}%</b>, de forma independente. Qual a probabilidade de chover <b>em pelo menos um</b> dos ${n} dias?`,
        certa: pct(r, 1), erradas: [pct(p * n, 1), pct(100 * (p / 100) ** n, 1), pct(100 - r, 1), pct(p, 1), pct(r + 10, 1)],
        expl: `Use o complementar: P(não chover nenhum dia) = (${f(1 - p / 100)})<sup>${n}</sup> = ${f((1 - p / 100) ** n, 4)}. P(pelo menos um) = 1 − ${f((1 - p / 100) ** n, 4)} = <b>${pct(r, 1)}</b>.`,
        mac: '“Pelo menos um” → 1 − P(nenhum). Muito mais rápido que somar os casos.' };
    },
    () => {
      const [a, ta, b, tb] = pick([[5, 50, 3, 20], [2, 10, 6, 40], [4, 25, 10, 80], [3, 40, 1, 10], [6, 100, 2, 25]]), pa = a / ta, pb = b / tb;
      if (Math.abs(pa - pb) < 1e-9) return prob[5]();
      const melhor = pa > pb ? 'A' : 'B';
      return { h: 'H30', tema: 'Qual rifa dá mais chance?', fig: svg(440, 120, rect(30, 25, 170, 70, C.creme, { rx: 12 }) + t(115, 55, `Rifa A`, { size: 16, peso: 800 }) + t(115, 80, `${ta} números`, { size: 13 }) + rect(240, 25, 170, 70, '#eef6ff', { rx: 12 }) + t(325, 55, 'Rifa B', { size: 16, peso: 800 }) + t(325, 80, `${tb} números`, { size: 13 }), 'Duas rifas'),
        enun: `Uma pessoa pode comprar <b>${a} número${a > 1 ? 's' : ''}</b> da rifa A (que tem ${ta} números) ou <b>${b} número${b > 1 ? 's' : ''}</b> da rifa B (que tem ${tb} números). Cada rifa sorteia um prêmio igual. Em qual ela tem mais chance de ganhar?`,
        certa: `Na rifa ${melhor}, com ${pct(Math.max(pa, pb) * 100)} de chance`, erradas: [`Na rifa ${melhor === 'A' ? 'B' : 'A'}, com ${pct(Math.min(pa, pb) * 100)} de chance`, `Na rifa ${a > b ? 'A' : 'B'}, porque compra mais números`, 'Tanto faz, as chances são iguais', `Na rifa ${ta < tb ? 'A' : 'B'}, porque tem menos números no total`],
        expl: `A: ${a}/${ta} = ${pct(pa * 100)}. B: ${b}/${tb} = ${pct(pb * 100)}. A chance depende da <b>razão</b> entre os números comprados e o total.`,
        mac: 'Compare as frações (ou porcentagens), nunca só a quantidade comprada.' };
    }
  ];

  MAT.registrar('proporcao', { n: 8, gens: proporcao });
  MAT.registrar('algebra', { n: 8, gens: algebra });
  MAT.registrar('graficos', { n: 8, gens: graficos });
  MAT.registrar('estat', { n: 8, gens: estat });
  MAT.registrar('prob', { n: 8, gens: prob });
})();
