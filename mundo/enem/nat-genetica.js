/* 🧬 Cruzamentos genéticos: quadro de Punnett, probabilidade, heredograma, sistema ABO, herança ligada ao X e código genético. */
(function () {
  const { sorteia, f } = NAT;

  const GEN = ['AA', 'Aa', 'aa'];
  const fr = (n, d) => { const g = (a, b) => b ? g(b, a % b) : a, k = g(n, d); return n === 0 ? '0' : n === d ? '1 (100%)' : `${n / k}/${d / k}`; };
  const pct = (n, d) => (n / d * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
  const gam = g => g.match(/X.|Y|[A-Za-z]/g);
  const junta = (a, b) => a === 'Y' ? b + a : b === 'Y' ? a + b : /^[a-z]$/.test(a) && /^[A-Z]$/.test(b) ? b + a : a + b;
  const cruz = (p, m) => { const g = []; for (const a of gam(p)) for (const b of gam(m)) g.push(junta(a, b)); return g; };

  function punnett(p, m, { oculto = false, rotP = 'pai', rotM = 'mãe', corDom = '#a8e6b8', corRec = '#f7a8c4', dom = s => /[A-Z]/.test(s), legDom = 'dominante', legRec = 'recessivo' } = {}) {
    const fp = gam(p), fm = gam(m), filhos = cruz(p, m), cel = 74;
    let s = '';
    fm.forEach((g, i) => s += `<text x="${150 + i * cel + cel / 2}" y="44" text-anchor="middle" style="font-size:20px">${g}</text>`);
    fp.forEach((g, j) => s += `<text x="132" y="${60 + j * cel + cel / 2 + 7}" text-anchor="middle" style="font-size:20px">${g}</text>`);
    filhos.forEach((g, k) => { const i = k % 2, j = Math.floor(k / 2), x = 150 + i * cel, y = 60 + j * cel;
      s += `<rect x="${x}" y="${y}" width="${cel}" height="${cel}" fill="${oculto ? '#fff' : dom(g) ? corDom : corRec}" stroke="#1d2a1f" stroke-width="2.5"/>
        <text x="${x + cel / 2}" y="${y + cel / 2 + 8}" text-anchor="middle" style="font-size:22px">${oculto ? '?' : g}</text>`; });
    return `<svg class="fig" viewBox="0 0 480 220" role="img" aria-label="Quadro de Punnett ${p} x ${m}">
      <text x="225" y="18" text-anchor="middle" class="fino">gametas da ${rotM} (${m})</text>
      <text x="60" y="130" text-anchor="middle" class="fino">gametas</text><text x="60" y="148" text-anchor="middle" class="fino">do ${rotP} (${p})</text>
      ${s}<g transform="translate(330 90)"><rect width="18" height="18" fill="${corDom}" stroke="#1d2a1f"/><text x="26" y="14" class="fino">${legDom}</text>
      <rect y="28" width="18" height="18" fill="${corRec}" stroke="#1d2a1f"/><text x="26" y="42" class="fino">${legRec}</text></g></svg>`;
  }

  NAT.jogo({
    id: 'nat-genetica', area: 'bio', icone: '🧬', titulo: 'Cruzamentos genéticos',
    intro: 'Escolha o genótipo do pai e da mãe e veja o quadro de Punnett se montar sozinho, com a chance de cada filho. Depois resolva desafios de probabilidade, heredograma, tipos sanguíneos, daltonismo e código genético.',
    habs: ['H13', 'H15'],
    cola: ['<b>AA</b> homozigoto dominante · <b>Aa</b> heterozigoto · <b>aa</b> homozigoto recessivo', '<b>Aa × Aa</b> → 1 AA : 2 Aa : 1 aa<br>3/4 dominante e 1/4 recessivo', '<b>Regra do "e"</b>: multiplica<br>menino <b>e</b> afetado = 1/2 × 1/4',
      '<b>Pais normais com filho afetado</b>: a doença é recessiva e os dois são Aa', '<b>ABO</b>: Iᴬ e Iᴮ dominam i<br>O é ii · AB é IᴬIᴮ', '<b>DNA → RNA</b>: A→U, T→A, C→G, G→C'],
    lab: {
      titulo: 'Quadro de Punnett', texto: 'Cada pai passa <b>um</b> dos seus dois alelos em cada gameta. O quadro cruza todas as combinações: cada casa vale 1/4 (25%). Aqui, A = cor normal e a = albinismo (recessivo).',
      controles: [
        { id: 'p', rotulo: 'Genótipo do pai', min: 0, max: 2, passo: 1, valor: 1, fmt: v => GEN[v] },
        { id: 'm', rotulo: 'Genótipo da mãe', min: 0, max: 2, passo: 1, valor: 1, fmt: v => GEN[v] }],
      desenhar({ p, m }) {
        const g = cruz(GEN[p], GEN[m]), n = t => g.filter(x => x === t).length, rec = n('aa');
        return { svg: punnett(GEN[p], GEN[m]), leitura: [`Genótipos: <b>${['AA', 'Aa', 'aa'].filter(t => n(t)).map(t => `${n(t)}/4 ${t}`).join(' · ')}</b>`,
          `Fenótipos: <b>${pct(4 - rec, 4)} cor normal</b> e <b>${pct(rec, 4)} albinos</b>`, rec && rec < 4 ? 'Pais podem ser normais e ter filho albino: o alelo estava "escondido" (heterozigoto).' : 'Probabilidade vale para cada filho, independente dos anteriores.'] };
      }
    },
    desafios: [
      () => {
        const [p, m] = sorteia([['Aa', 'Aa'], ['Aa', 'aa'], ['AA', 'Aa'], ['Aa', 'AA'], ['aa', 'Aa']]), g = cruz(p, m), rec = g.filter(x => x === 'aa').length;
        const pede = sorteia(['rec', 'het']), n = pede === 'rec' ? rec : g.filter(x => x === 'Aa').length;
        return { hab: 'H13', fig: punnett(p, m, { oculto: true }), figDepois: punnett(p, m), enun: `Um casal tem genótipos ${p} e ${m} para um gene em que a é recessivo. Qual a probabilidade de um filho ser ${pede === 'rec' ? 'homozigoto recessivo (aa)' : 'heterozigoto (Aa)'}?`,
          certa: fr(n, 4), erradas: ['0', '1/4', '1/2', '3/4', '1 (100%)'].filter(x => x !== fr(n, 4)),
          expl: `Monte o quadro: ${f(`${p} × ${m} → ${g.join(', ')}`)}. ${n} de 4 casas: ${f(fr(n, 4))}.` };
      },
      () => {
        const pede = sorteia(['filho', 'menina']);
        return { hab: 'H13', fig: heredograma(), enun: pede === 'filho'
          ? 'No heredograma, o casal 1 × 2 é normal e tem uma filha afetada (4). Qual a probabilidade de o próximo filho do casal ser afetado?'
          : 'No heredograma, o casal 1 × 2 é normal e tem uma filha afetada (4). Qual a probabilidade de o próximo filho ser uma <b>menina afetada</b>?',
          certa: pede === 'filho' ? '1/4' : '1/8', erradas: pede === 'filho' ? ['1/2', '3/4', '1/8', '0'] : ['1/4', '1/2', '1/16', '3/8'],
          expl: `Pais normais com filha afetada: a doença é <b>recessiva</b> e os dois pais são <b>Aa</b>. ${f('Aa × Aa → 1/4 aa')}.${pede === 'menina' ? ` Ser menina (1/2) <b>e</b> afetada (1/4): ${f('1/2 × 1/4 = 1/8')}.` : ''}` };
      },
      () => {
        const casais = [['IᴬIᴮ', 'ii', 'A ou B (50% cada)', 'O dá só i; o pai AB dá Iᴬ ou Iᴮ. Filhos: Iᴬi (A) ou Iᴮi (B). Nunca AB nem O!'],
          ['Iᴬi', 'Iᴮi', 'A, B, AB ou O (25% cada)', 'Iᴬ ou i × Iᴮ ou i → IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B) e ii (O). Casal A × B pode ter qualquer tipo!'],
          ['Iᴬi', 'Iᴬi', 'A (75%) ou O (25%)', 'Iᴬi × Iᴬi → 1 IᴬIᴬ : 2 Iᴬi : 1 ii. Três quartos do tipo A e um quarto O.'],
          ['ii', 'ii', 'Somente O', 'Os dois só têm alelo i: todos os filhos são ii, tipo O.'],
          ['IᴬIᴬ', 'Iᴮi', 'AB ou A (50% cada)', 'O pai só dá Iᴬ; a mãe dá Iᴮ ou i. Filhos IᴬIᴮ (AB) ou Iᴬi (A).']];
        const [p, m, cert, expl] = sorteia(casais);
        return { hab: 'H13', enun: `Um homem de genótipo <b>${p}</b> e uma mulher <b>${m}</b> querem saber os tipos sanguíneos possíveis dos filhos. Quais são?`,
          certa: cert, erradas: casais.map(c => c[2]).filter(x => x !== cert), expl };
      },
      () => {
        const q = sorteia([
          ['Uma pessoa com sangue tipo O negativo pode doar para todos os tipos. Por quê?', 'Suas hemácias não têm os antígenos A, B nem Rh, então não são atacadas pelos anticorpos do receptor', ['Seu plasma não tem anticorpos', 'Seu sangue tem todos os antígenos', 'O tipo O produz anticorpos que protegem o receptor'], 'Na transfusão o que importa é o <b>antígeno</b> da hemácia doada. O– não tem nenhum: doador universal. AB+ tem todos e não tem anti-A nem anti-B no plasma: receptor universal.'],
          ['Uma mulher Rh– grávida de um bebê Rh+ pode, numa segunda gestação, ter um bebê com eritroblastose fetal. Como se previne?', 'Aplicando na mãe soro anti-Rh logo após o primeiro parto', ['Fazendo transfusão de sangue Rh– no pai', 'Vacinando o bebê contra o fator Rh', 'Dando antibiótico durante a gravidez'], 'No parto, hemácias Rh+ do bebê passam para a mãe, que produz anti-Rh com memória. O soro anti-Rh destrói essas hemácias antes que ela crie memória.']]);
        return { hab: 'H13', enun: q[0], certa: q[1], erradas: q[2], expl: q[3] };
      },
      () => {
        const pede = sorteia(['filho homem', 'filha mulher', 'criança']);
        const r = { 'filho homem': '1/2', 'filha mulher': '0', criança: '1/4' }[pede];
        return { hab: 'H13', fig: punnett('XᴰY', 'XᴰXᵈ', { rotP: 'pai', rotM: 'mãe', dom: g => g.includes('Xᴰ'), legDom: 'visão normal', legRec: 'daltônico' }),
          enun: `O daltonismo é recessivo e ligado ao cromossomo X. Uma mulher portadora (XᴰXᵈ) casa com um homem de visão normal (XᴰY). Qual a probabilidade de ${pede === 'criança' ? 'uma criança qualquer' : pede === 'filho homem' ? 'um <b>filho homem</b>' : 'uma <b>filha mulher</b>'} ser daltônica?`,
          certa: r, erradas: ['0', '1/4', '1/2', '3/4', '1 (100%)'].filter(x => x !== r),
          expl: `As filhas recebem o Xᴰ do pai: nenhuma é daltônica (metade é portadora). Os filhos recebem o Y do pai e um X da mãe: ${f('metade dos meninos é XᵈY')}. Entre todas as crianças, ${f('1/4')}. Por isso o daltonismo é mais comum em homens.` };
      },
      () => {
        const BASE = ['A', 'T', 'C', 'G'], RNA = { A: 'U', T: 'A', C: 'G', G: 'C' };
        const dna = Array.from({ length: 6 }, () => sorteia(BASE)).join(''), rna = [...dna].map(b => RNA[b]).join('');
        const troca = s => [...s].map(b => ({ A: 'T', T: 'A', C: 'G', G: 'C' })[b]).join('');
        return { hab: 'H15', enun: `Um trecho da fita molde do DNA é <b>${dna}</b>. Qual é o RNA mensageiro transcrito a partir dele?`,
          certa: rna, erradas: [troca(dna), dna, rna.replace(/U/g, 'T') === troca(dna) ? [...rna].reverse().join('') : rna.replace(/U/g, 'T'), dna.replace(/T/g, 'U')],
          expl: `Na transcrição o RNA é <b>complementar</b> ao DNA molde, e no RNA não existe T: no lugar entra U. ${f('A→U, T→A, C→G, G→C')}. Cada trinca do RNA (códon) indica um aminoácido.` };
      },
      () => {
        const pede = sorteia(['aabb', 'A_B_']);
        return { hab: 'H15', enun: `Dois genes com segregação independente: A (cor) e B (forma), ambos dominantes. No cruzamento <b>AaBb × AaBb</b>, qual a proporção de descendentes ${pede === 'aabb' ? 'duplo recessivos (aabb)' : 'com os dois caracteres dominantes'}?`,
          certa: pede === 'aabb' ? '1/16' : '9/16', erradas: ['1/16', '9/16', '3/16', '1/4', '3/4'].filter(x => x !== (pede === 'aabb' ? '1/16' : '9/16')),
          expl: `Resolva cada gene separado e multiplique (regra do "e"). ${pede === 'aabb' ? f('aa: 1/4 e bb: 1/4 → 1/16') : f('A_: 3/4 e B_: 3/4 → 9/16')}. É a famosa proporção 9 : 3 : 3 : 1 de Mendel.` };
      }
    ]
  });

  function heredograma() {
    const q = (x, y, n, af) => `<rect x="${x - 16}" y="${y - 16}" width="32" height="32" fill="${af ? '#1d2a1f' : '#fff'}" stroke="#1d2a1f" stroke-width="2.5"/><text x="${x}" y="${y + 34}" text-anchor="middle">${n}</text>`;
    const c = (x, y, n, af) => `<circle cx="${x}" cy="${y}" r="17" fill="${af ? '#1d2a1f' : '#fff'}" stroke="#1d2a1f" stroke-width="2.5"/><text x="${x}" y="${y + 34}" text-anchor="middle">${n}</text>`;
    return `<svg class="fig" viewBox="0 0 480 200" role="img" aria-label="Heredograma: casal normal com filho normal e filha afetada">
      <path d="M196 50 H284 M240 50 V100 M180 100 H300 M180 100 V130 M300 100 V130" stroke="#1d2a1f" stroke-width="2.5"/>
      ${q(180, 50, 1, false)}${c(300, 50, 2, false)}${q(180, 146, 3, false)}${c(300, 146, 4, true)}
      <g transform="translate(360 120)"><rect width="16" height="16" fill="#fff" stroke="#1d2a1f"/><text x="22" y="13" class="fino">normal</text><rect y="24" width="16" height="16" fill="#1d2a1f"/><text x="22" y="37" class="fino">afetado</text></g></svg>`;
  }
})();
