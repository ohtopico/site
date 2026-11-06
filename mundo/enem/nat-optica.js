/* 👓 Banco óptico: lente convergente com raios, equação de Gauss, defeitos da visão, espelhos, refração e cores. */
(function () {
  const { sorteia, num, f } = NAT;

  // lente convergente no centro (x=240); 1 cm = 4 px; objeto de 40 px de altura à esquerda
  function banco(p, fo, mostrarImg = true) {
    const E = 4, L = 240, Y = 120, ho = 40, x0 = L - p * E;
    const pi = Math.abs(p - fo) < 1e-9 ? Infinity : p * fo / (p - fo), A = -pi / p, hi = A * ho;
    const xi = L + pi * E, F1 = L - fo * E, F2 = L + fo * E;
    const clip = (x, y, x2, y2) => { // reta de (x,y) passando por (x2,y2) até a borda do desenho
      const dx = x2 - x, dy = y2 - y, t = dx > 0 ? (470 - x) / dx : dx < 0 ? (10 - x) / dx : 0; return [x + dx * t, y + dy * t]; };
    // raio 1: paralelo ao eixo, refrata passando por F2; raio 2: pelo centro óptico, sem desvio
    const r1b = clip(L, Y - ho, F2, Y), r2b = clip(x0, Y - ho, L, Y);
    let raios = `<path d="M${x0} ${Y - ho} H${L} L${r1b[0]} ${r1b[1]}" stroke="#e85c4a" stroke-width="2.5" fill="none"/>
      <path d="M${x0} ${Y - ho} L${r2b[0]} ${r2b[1]}" stroke="#3f8fe0" stroke-width="2.5" fill="none"/>`;
    let img = '';
    if (mostrarImg && isFinite(pi)) {
      if (pi > 0) img = xi < 475 ? `<path d="M${xi} ${Y} V${Y - hi}" stroke="#4bb259" stroke-width="5" marker-end="url(#pt)"/>` : '';
      else { // imagem virtual: prolongamentos tracejados para trás
        raios += `<path d="M${L} ${Y - ho} L${xi} ${Y - hi}" stroke="#e85c4a" stroke-dasharray="5 5" stroke-width="2" fill="none"/><path d="M${x0} ${Y - ho} L${xi} ${Y - hi}" stroke="#3f8fe0" stroke-dasharray="5 5" stroke-width="2" fill="none"/>`;
        img = xi > 5 ? `<path d="M${xi} ${Y} V${Y - hi}" stroke="#4bb259" stroke-width="5" stroke-dasharray="6 4" marker-end="url(#pt)"/>` : '';
      }
    }
    return `<svg class="fig" viewBox="0 0 480 240" role="img" aria-label="Lente convergente com objeto a ${p} cm e foco de ${fo} cm">
      <defs><marker id="pt" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#1d2a1f"/></marker></defs>
      <path d="M10 ${Y} H470" stroke="#7c8a7e" stroke-width="1.5"/>
      <ellipse cx="${L}" cy="${Y}" rx="10" ry="90" fill="#bfe9f5" stroke="#1d2a1f" stroke-width="2.5" opacity=".9"/>
      <circle cx="${F1}" cy="${Y}" r="4"/><circle cx="${F2}" cy="${Y}" r="4"/><text x="${F1}" y="${Y + 20}" text-anchor="middle">F</text><text x="${F2}" y="${Y + 20}" text-anchor="middle">F'</text>
      ${raios}<path d="M${x0} ${Y} V${Y - ho}" stroke="#1d2a1f" stroke-width="5" marker-end="url(#pt)"/>${img}
      <text x="${x0}" y="${Y + 36}" text-anchor="middle" class="fino">objeto</text></svg>`;
  }
  const descreve = (p, fo) => {
    if (p === fo) return 'Objeto no foco: os raios saem paralelos e <b>não se forma imagem</b> (imagem imprópria). É o farol!';
    const pi = p * fo / (p - fo), A = -pi / p;
    return pi > 0 ? `Imagem <b>real e invertida</b>, ${Math.abs(A) > 1.02 ? 'maior' : Math.abs(A) < 0.98 ? 'menor' : 'do mesmo tamanho'} (${num(Math.abs(A))}×). Dá para projetar numa tela: é o projetor${Math.abs(A) < 1 ? ', a câmera e o olho' : ''}.`
      : `Imagem <b>virtual e direita</b>, ${num(Math.abs(A))}× maior. Não dá para projetar: é a lupa.`;
  };

  const VISAO = [
    ['Miopia', 'a imagem se forma <b>antes</b> da retina e a pessoa enxerga mal de longe', 'Lente divergente'],
    ['Hipermetropia', 'a imagem se formaria <b>depois</b> da retina e a pessoa enxerga mal de perto', 'Lente convergente'],
    ['Presbiopia (vista cansada)', 'o cristalino perde a flexibilidade com a idade e a pessoa passa a enxergar mal de perto', 'Lente convergente'],
    ['Astigmatismo', 'a córnea tem curvaturas diferentes em cada direção e a imagem fica distorcida', 'Lente cilíndrica']
  ];
  const SITUACOES = [
    ['Os retrovisores laterais dos carros e os espelhos de garagem mostram uma área bem maior, com imagens menores.', 'Espelho convexo', 'O convexo dá imagem virtual, direita e menor, e aumenta o campo visual.'],
    ['O espelho de maquiagem mostra o rosto ampliado quando a pessoa chega perto.', 'Espelho côncavo', 'Com o rosto entre o foco e o espelho côncavo, a imagem é virtual, direita e maior.'],
    ['Na fibra óptica, a luz segue presa dentro do fio, mesmo nas curvas, e leva internet por quilômetros.', 'Reflexão total', 'A luz bate na parede interna com ângulo maior que o limite e reflete 100%, sem escapar.'],
    ['Numa estrada quente parece haver uma poça d\'água lá na frente, que some quando se chega perto.', 'Reflexão total', 'O ar quente perto do asfalto é menos refringente; a luz do céu curva e reflete totalmente, criando a miragem.'],
    ['A piscina parece mais rasa do que realmente é.', 'Refração', 'A luz que sai da água desvia ao entrar no ar e o fundo parece mais alto.'],
    ['Depois da chuva, com o Sol atrás de você, aparece um arco-íris.', 'Dispersão', 'Cada gota de água separa a luz branca em cores, porque cada cor refrata com um ângulo diferente.']
  ];
  const CORES = ['vermelha', 'verde', 'azul'];

  NAT.jogo({
    id: 'nat-optica', area: 'fis', icone: '👓', titulo: 'Banco óptico',
    intro: 'Aproxime e afaste o objeto da lente e veja os raios de luz formarem a imagem: real como no projetor, virtual como na lupa. Depois desafios de óculos, espelhos, refração e cor dos objetos.',
    habs: ['H6', 'H18', 'H1'],
    cola: ['<b>1/f = 1/p + 1/p\'</b><br>Gauss (p\' > 0: imagem real)', '<b>A = −p\'/p</b><br>aumento (negativo: invertida)', '<b>V = 1/f</b> (f em metros)<br>dioptria = "grau" dos óculos',
      '<b>Miopia</b>: divergente<br><b>Hipermetropia/presbiopia</b>: convergente', '<b>Convexo</b>: retrovisor, campo maior<br><b>Côncavo</b>: maquiagem, farol', '<b>Cor do objeto</b>: a cor que ele reflete; sem essa cor na luz, parece preto'],
    lab: {
      titulo: 'Lente convergente (lupa)', texto: 'O raio vermelho chega paralelo e passa pelo foco F\'. O azul passa pelo centro sem desviar. Onde eles se cruzam nasce a imagem (verde).',
      controles: [
        { id: 'p', rotulo: 'Distância do objeto (p)', min: 5, max: 55, passo: 1, valor: 35, unid: 'cm' },
        { id: 'f', rotulo: 'Distância focal (f)', min: 8, max: 20, passo: 1, valor: 15, unid: 'cm' }],
      desenhar({ p, f: fo }) {
        const pi = p === fo ? Infinity : p * fo / (p - fo);
        return { svg: banco(p, fo), leitura: [descreve(p, fo), isFinite(pi) ? `p' = p·f / (p − f) = <b>${num(pi, 1)} cm</b>` : 'p\' → infinito', `Vergência V = 1/f = <b>${num(100 / fo, 1)} di</b>`] };
      }
    },
    desafios: [
      () => {
        const [p, fo] = sorteia([[15, 10], [20, 10], [30, 20], [10, 5], [30, 10], [36, 12], [60, 20]]), pi = p * fo / (p - fo);
        return { hab: 'H6', fig: banco(p, fo, false), figDepois: banco(p, fo), enun: `Num projetor, o slide fica a ${p} cm de uma lente convergente de foco ${fo} cm. A que distância da lente deve ficar a tela para a imagem sair nítida?`,
          certa: num(pi, 1) + ' cm', erradas: [num(p + fo, 1) + ' cm', num(p - fo, 1) + ' cm', num(p * fo / (p + fo), 1) + ' cm', num(fo, 1) + ' cm'],
          expl: `${f(`1/${fo} = 1/${p} + 1/p'`)} → ${f(`p' = p·f/(p − f) = ${p}·${fo}/${p - fo} = ${num(pi, 1)} cm`)}. A imagem é real e invertida (por isso o slide entra de cabeça para baixo no projetor).` };
      },
      () => {
        const [def, como, lente] = sorteia(VISAO);
        return { hab: 'H6', enun: `Na <b>${def.toLowerCase()}</b>, ${como}. Que lente corrige esse defeito?`, certa: lente, erradas: ['Lente divergente', 'Lente convergente', 'Lente cilíndrica', 'Lente plana, sem grau'].filter(x => x !== lente),
          expl: `${def}: ${lente.toLowerCase()}. Macete: <b>mío</b>pe = <b>m</b>enos (grau negativo, divergente). Hipermetropia e vista cansada: grau positivo, convergente.` };
      },
      () => {
        const [sit, cert, expl] = sorteia(SITUACOES);
        return { hab: 'H18', enun: sit + ' Que elemento ou fenômeno óptico explica isso?', certa: cert, erradas: ['Espelho côncavo', 'Espelho convexo', 'Reflexão total', 'Refração', 'Dispersão', 'Espelho plano'].filter(x => x !== cert), expl };
      },
      () => {
        const obj = sorteia([...CORES, 'branca']), luz = sorteia([...CORES, 'branca'].filter(c => c !== obj));
        const vista = obj === 'branca' ? luz : luz === 'branca' ? obj : 'preta';
        const nome = c => c === 'preta' ? 'Preta (escura)' : c[0].toUpperCase() + c.slice(1);
        return { hab: 'H1', enun: `Uma camiseta que é <b>${obj}</b> à luz do sol é levada para uma sala iluminada só com luz <b>${luz}</b>. Com que cor ela aparece?`,
          certa: nome(vista), erradas: ['Preta (escura)', 'Branca', 'Vermelha', 'Verde', 'Azul'].filter(x => x !== nome(vista)),
          expl: `O objeto só reflete a(s) cor(es) que ele "é" e absorve as outras. ${obj === 'branca' ? 'O branco reflete todas, então mostra a cor da luz.' : vista === 'preta' ? `A camiseta ${obj} só reflete ${obj}; como a luz ${luz} não tem ${obj}, nada volta ao olho e ela parece preta.` : `A luz branca contém o ${obj}, que a camiseta reflete.`}` };
      },
      () => {
        const [V, fcm] = sorteia([[2, 50], [4, 25], [-2, -50], [-4, -25], [5, 20], [-1, -100]]);
        return { hab: 'H6', enun: `A receita do oftalmologista indica lente de <b>${V > 0 ? '+' : ''}${V} di</b>. Qual a distância focal e o tipo da lente?`,
          certa: `${Math.abs(fcm)} cm, ${V > 0 ? 'convergente' : 'divergente'}`, erradas: [`${Math.abs(fcm)} cm, ${V > 0 ? 'divergente' : 'convergente'}`, `${Math.abs(V)} cm, ${V > 0 ? 'convergente' : 'divergente'}`, `${Math.abs(V) * 10} cm, ${V > 0 ? 'convergente' : 'divergente'}`, `${Math.abs(fcm) * 2} cm, ${V > 0 ? 'convergente' : 'divergente'}`],
          expl: `${f(`f = 1/V = 1/${Math.abs(V)} = ${num(Math.abs(fcm) / 100)} m = ${Math.abs(fcm)} cm`)}. Sinal ${V > 0 ? 'positivo: convergente (hipermetropia ou vista cansada)' : 'negativo: divergente (miopia)'}.` };
      },
      () => {
        const fo = sorteia([10, 15, 20]), caso = sorteia(['lupa', 'camera']), p = caso === 'lupa' ? fo / 2 : fo * 3;
        return { hab: 'H18', fig: banco(p, fo), enun: `Na figura, o objeto está ${caso === 'lupa' ? 'entre o foco e a lente' : 'bem longe da lente, além do dobro da distância focal'}. Como é a imagem formada?`,
          certa: caso === 'lupa' ? 'Virtual, direita e maior' : 'Real, invertida e menor', erradas: ['Virtual, direita e maior', 'Real, invertida e menor', 'Real, invertida e maior', 'Virtual, invertida e menor', 'Não se forma imagem'].filter(x => x !== (caso === 'lupa' ? 'Virtual, direita e maior' : 'Real, invertida e menor')),
          expl: caso === 'lupa' ? 'Objeto entre F e a lente: os raios saem abrindo e só os prolongamentos se cruzam. Imagem virtual, direita e maior: é a lupa.' : 'Objeto longe: imagem real, invertida e menor, perto do foco. É o que acontece na câmera e no olho (a retina recebe a imagem invertida e o cérebro desvira).' };
      }
    ]
  });
})();
