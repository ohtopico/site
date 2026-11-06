/* 🌊 Laboratório de ondas: v = λ·f, espectro eletromagnético e fenômenos ondulatórios. */
(function () {
  const { sorteia, num, f } = NAT;

  // desenha uma onda com n ciclos ao longo de L metros (régua embaixo)
  function onda(ciclos, amp, L, extra = '') {
    const W = 480, x0 = 30, x1 = 450, y0 = 95, A = 12 + amp * 10, pts = [];
    for (let k = 0; k <= 240; k++) { const t = k / 240; pts.push(`${(x0 + t * (x1 - x0)).toFixed(1)},${(y0 - A * Math.sin(2 * Math.PI * ciclos * t)).toFixed(1)}`); }
    const lam = (x1 - x0) / ciclos, marca = ciclos >= 0.6 ? `<path d="M${x0} 30 H${x0 + lam}" stroke="#2a5fa8" stroke-width="2.5" marker-end="url(#seta)" marker-start="url(#seta)"/>
      <text x="${x0 + lam / 2}" y="24" text-anchor="middle" style="fill:#2a5fa8">λ</text>` : '';
    const regua = Array.from({ length: 11 }, (_, k) => `<path d="M${x0 + k * (x1 - x0) / 10} 160 v8" stroke="#1d2a1f" stroke-width="2"/>`).join('');
    return `<svg class="fig" viewBox="0 0 ${W} 200" role="img" aria-label="Onda com ${num(ciclos)} comprimentos de onda em ${L} metros">
      <defs><marker id="seta" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#2a5fa8"/></marker></defs>
      <path d="M${x0} ${y0} H${x1}" stroke="#d9c99a" stroke-dasharray="5 5" stroke-width="2"/>
      <polyline points="${pts.join(' ')}" fill="none" stroke="#e07bb0" stroke-width="4" stroke-linecap="round"/>
      ${marca}<path d="M${x0} 164 H${x1}" stroke="#1d2a1f" stroke-width="2"/>${regua}
      <text x="${x0}" y="188" class="fino">0</text><text x="${x1}" y="188" text-anchor="end" class="fino">${num(L)} m</text>${extra}</svg>`;
  }

  // espectro eletromagnético, da menor para a maior frequência
  const ESPECTRO = ['ondas de rádio', 'micro-ondas', 'infravermelho', 'luz visível', 'ultravioleta', 'raios X', 'raios gama'];
  const USO = { 'ondas de rádio': 'rádio FM e TV aberta', 'micro-ondas': 'forno de micro-ondas e Wi-Fi', infravermelho: 'controle remoto e câmera térmica',
    'luz visível': 'fotossíntese e visão', ultravioleta: 'bronzeamento e esterilização de água', 'raios X': 'radiografia dos ossos', 'raios gama': 'radioterapia contra o câncer' };
  function espectro(marcar) {
    const cores = ['#c7b4f2', '#a8d8f7', '#ffb38a', 'url(#arco)', '#c7b4f2', '#9fe3dc', '#a8e6b8'];
    return `<svg class="fig" viewBox="0 0 480 120" role="img" aria-label="Espectro eletromagnético">
      <defs><linearGradient id="arco"><stop offset="0" stop-color="#e85c4a"/><stop offset=".25" stop-color="#f6b73c"/><stop offset=".5" stop-color="#4bb259"/><stop offset=".75" stop-color="#3f8fe0"/><stop offset="1" stop-color="#9a6bd6"/></linearGradient></defs>
      ${ESPECTRO.map((n, k) => `<rect x="${10 + k * 66}" y="20" width="64" height="46" rx="6" fill="${cores[k]}" stroke="${marcar === n ? '#c4392a' : '#1d2a1f'}" stroke-width="${marcar === n ? 4 : 2}"/>
        <text x="${42 + k * 66}" y="${k % 2 ? 84 : 98}" text-anchor="middle" style="font-size:11.5px">${n}</text>`).join('')}
      <path d="M20 112 H460" stroke="#1d2a1f" stroke-width="2" marker-end="url(#s2)"/><defs><marker id="s2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z"/></marker></defs>
      <text x="240" y="14" text-anchor="middle" class="fino" style="font-size:12px">→ mais frequência, mais energia, menor λ</text></svg>`;
  }

  const FENOMENOS = [
    ['A sirene da ambulância fica mais aguda quando ela se aproxima e mais grave quando se afasta.', 'Efeito Doppler', 'A frequência percebida muda com o movimento da fonte: aproximando, as frentes de onda chegam mais "apertadas" (frequência maior, som agudo).'],
    ['Você ouve a conversa na sala ao lado mesmo com a porta só entreaberta, sem enxergar as pessoas.', 'Difração', 'Difração é a onda contornar obstáculos. O som (λ de centímetros a metros) contorna a porta; a luz (λ minúsculo) não.'],
    ['Um canudo dentro do copo d\'água parece quebrado.', 'Refração', 'A luz muda de velocidade e de direção ao passar da água para o ar. Mudou de meio, é refração.'],
    ['Uma taça de cristal estoura quando uma cantora sustenta uma nota com a mesma frequência natural da taça.', 'Ressonância', 'Ressonância: a fonte vibra na frequência natural do objeto, que absorve energia e oscila cada vez mais forte.'],
    ['Fones com cancelamento de ruído emitem um som "invertido" que anula o barulho de fora.', 'Interferência', 'Crista encontrando vale se anula: é interferência destrutiva.'],
    ['Óculos de sol com lentes especiais tiram o reflexo ofuscante da água e do asfalto.', 'Polarização', 'Polarizar é deixar passar só uma direção de vibração. Só ondas transversais (como a luz) podem ser polarizadas.'],
    ['O morcego emite ultrassom e calcula a distância da presa pelo tempo que o eco leva para voltar.', 'Reflexão', 'Eco é reflexão do som. O mesmo princípio vale para o sonar e a ultrassonografia.'],
    ['A luz branca atravessa um prisma e sai separada nas cores do arco-íris.', 'Dispersão', 'Cada cor tem um índice de refração um pouco diferente e desvia um ângulo diferente: é a dispersão.']
  ];
  const TODOS_FEN = [...new Set(FENOMENOS.map(x => x[1]))];

  NAT.jogo({
    id: 'nat-ondas', area: 'fis', icone: '🌊', titulo: 'Laboratório de ondas',
    intro: 'Mexa na frequência e na velocidade e veja o comprimento de onda mudar. Depois encare desafios de v = λ·f, espectro eletromagnético e fenômenos como Doppler, difração e ressonância.',
    habs: ['H1', 'H22', 'H17'],
    cola: ['<b>v = λ · f</b><br>velocidade = comprimento de onda × frequência', '<b>T = 1 / f</b><br>período é o inverso da frequência (Hz = 1/s)',
      '<b>Luz no vácuo</b>: c = 3 × 10⁸ m/s<br>todas as ondas eletromagnéticas', '<b>Som</b>: onda mecânica, precisa de meio.<br>No ar ≈ 340 m/s, não passa no vácuo',
      '<b>Mudou de meio</b>: muda v e λ,<br>a frequência <b>não muda</b>', '<b>Mais frequência</b> = mais energia.<br>UV, X e gama são ionizantes'],
    lab: {
      titulo: 'Uma corda de 10 metros', texto: 'A mão do lado esquerdo sacode a corda. A frequência é quantas sacudidas por segundo; a velocidade depende da corda (mais esticada, mais rápida).',
      controles: [
        { id: 'f', rotulo: 'Frequência (f)', min: 0.5, max: 5, passo: 0.5, valor: 1, unid: 'Hz' },
        { id: 'v', rotulo: 'Velocidade na corda (v)', min: 2, max: 10, passo: 1, valor: 4, unid: 'm/s' },
        { id: 'a', rotulo: 'Amplitude', min: 1, max: 5, passo: 1, valor: 3, unid: '' }],
      desenhar(v) {
        const lam = v.v / v.f;
        return { svg: onda(10 / lam, v.a, 10), leitura: [`λ = v ÷ f = ${num(v.v)} ÷ ${num(v.f)} = <b>${num(lam)} m</b>`, `Período T = 1/f = <b>${num(1 / v.f)} s</b>`, `Cabem <b>${num(10 / lam)}</b> ondas na corda`, 'A amplitude não muda λ nem v: ela muda a energia (o volume, no som).'] };
      }
    },
    desafios: [
      () => {
        const n = sorteia([2, 3, 4, 5]), L = n * sorteia([1, 2, 3]), fr = sorteia([2, 5, 10, 20]), lam = L / n;
        return { hab: 'H17', fig: onda(n, 3, L), enun: `A figura mostra uma corda de ${L} m vibrando com frequência de ${fr} Hz. Qual a velocidade da onda na corda?`,
          certa: num(lam * fr) + ' m/s', erradas: [num(L * fr) + ' m/s', num(fr / lam) + ' m/s', num(lam / fr) + ' m/s', num(n * fr) + ' m/s'],
          expl: `Conte as ondas completas: ${n} em ${L} m, então ${f(`λ = ${L} ÷ ${n} = ${num(lam)} m`)}. Depois ${f(`v = λ · f = ${num(lam)} × ${fr} = ${num(lam * fr)} m/s`)}.` };
      },
      () => {
        const fr = sorteia([60, 75, 100, 150, 300]);
        return { hab: 'H1', enun: `Uma emissora transmite com frequência de ${fr} MHz (${fr} × 10⁶ Hz). Sendo a velocidade das ondas de rádio 3 × 10⁸ m/s, qual é o comprimento de onda?`,
          certa: num(300 / fr) + ' m', erradas: [num(3000 / fr) + ' m', num(fr / 300) + ' m', num(30 / fr) + ' m', num(300 * fr) + ' m'],
          expl: `${f('λ = v ÷ f = 3 × 10⁸ ÷ (' + fr + ' × 10⁶)')} = ${f(num(300 / fr) + ' m')}. Macete: em MHz, λ (em metros) = 300 ÷ f.` };
      },
      () => {
        const a = Math.floor(Math.random() * 6), b = a + 1 + Math.floor(Math.random() * (6 - a));
        const pergunta = sorteia(['maior frequência', 'maior comprimento de onda']);
        const certa = pergunta === 'maior frequência' ? ESPECTRO[b] : ESPECTRO[a];
        return { hab: 'H22', fig: espectro(), enun: `Entre <b>${ESPECTRO[a]}</b> (usadas em ${USO[ESPECTRO[a]]}) e <b>${ESPECTRO[b]}</b> (usados em ${USO[ESPECTRO[b]]}), qual tem <b>${pergunta}</b>?`,
          certa: certa[0].toUpperCase() + certa.slice(1), erradas: [(certa === ESPECTRO[a] ? ESPECTRO[b] : ESPECTRO[a]).replace(/^./, c => c.toUpperCase()), 'As duas são iguais, pois têm a mesma velocidade no vácuo'],
          expl: `No espectro, da esquerda para a direita a frequência aumenta e o comprimento de onda diminui (todas viajam a 3 × 10⁸ m/s, então ${f('λ = c / f')}). ${ESPECTRO[b][0].toUpperCase() + ESPECTRO[b].slice(1)} fica mais à direita.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(FENOMENOS);
        return { hab: 'H1', enun: sit + ' Que fenômeno ondulatório explica isso?', certa: cert, erradas: ENEM.embaralha(TODOS_FEN.filter(x => x !== cert)), expl };
      },
      () => {
        const q = sorteia([
          ['Um astronauta na Lua bate um martelo numa pedra. O colega a 5 m, sem rádio, ouve o som?', 'Não, porque o som precisa de um meio material para se propagar', ['Sim, mas mais fraco, porque a Lua tem pouca gravidade', 'Sim, porque o som se propaga melhor no vácuo', 'Não, porque o som é uma onda eletromagnética'], 'Som é onda <b>mecânica</b>: é a vibração do ar, da água ou do sólido. Sem matéria, não há som. A luz e o rádio (ondas eletromagnéticas) passam pelo vácuo.'],
          ['Qual radiação é <b>ionizante</b>, isto é, tem energia para arrancar elétrons e danificar o DNA?', 'Raios X', ['Ondas de rádio', 'Micro-ondas', 'Infravermelho'], 'Ionizantes são as de alta frequência: ultravioleta (parte), raios X e gama. Rádio, micro-ondas e infravermelho só aquecem.'],
          ['O forno de micro-ondas aquece a comida porque as micro-ondas…', 'fazem as moléculas de água vibrar, e essa agitação vira calor', ['deixam a comida radioativa', 'são raios X de baixa potência', 'aquecem primeiro o prato, que passa o calor à comida'], 'A frequência das micro-ondas agita as moléculas de água (polares). Elas não são ionizantes e não deixam nada radioativo.'],
          ['Ao passar do ar para a água, uma onda sonora tem a velocidade aumentada. O que acontece com a frequência e o comprimento de onda?', 'A frequência não muda e o comprimento de onda aumenta', ['A frequência aumenta e o comprimento de onda não muda', 'Os dois aumentam', 'A frequência diminui e o comprimento de onda aumenta'], 'Quem define a frequência é a fonte, então ela não muda na troca de meio. Com v maior e f igual, ' + f('λ = v / f') + ' aumenta.'],
          ['Na ultrassonografia, o aparelho forma a imagem a partir…', 'dos ecos do ultrassom refletidos nas fronteiras entre tecidos', ['de raios X que atravessam o corpo', 'da luz infravermelha emitida pelo corpo', 'do campo magnético dos órgãos'], 'Ultrassom é som de frequência acima de 20 000 Hz. Ele reflete onde o tecido muda, e o tempo do eco dá a profundidade. Não usa radiação ionizante, por isso é seguro na gravidez.']]);
        return { hab: q[0].includes('ionizante') ? 'H22' : 'H1', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      },
      () => {
        const d = sorteia([170, 340, 680, 1020]);
        return { hab: 'H17', enun: `Durante uma tempestade, você vê o relâmpago e ouve o trovão ${d / 340} s depois. Com o som a 340 m/s no ar, a que distância caiu o raio?`,
          certa: num(d) + ' m', erradas: [num(340 / (d / 340)) + ' m', num(d * 2) + ' m', num(d / 2) + ' m', '0 m, pois luz e som chegam juntos'],
          expl: `A luz chega praticamente na hora. O som demora: ${f(`d = v · t = 340 × ${d / 340} = ${d} m`)}. Macete: cada 3 segundos ≈ 1 km.` };
      }
    ]
  });
})();
