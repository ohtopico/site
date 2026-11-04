/* =====================================================================
   Gerador de avaliação de Computação (BNCC, 6º ao 9º ano).
   Monta uma prova para imprimir a partir das questões do teste do ano
   (teste-ano.js) e das listas de exercícios (listas.js), com gabarito e
   três versões para alunos com diferentes necessidades:
     A: mais apoio (2 alternativas, letra maior, resposta curta ou desenho)
     B: apoio intermediário (3 alternativas, dica nas dissertativas)
     C: versão completa (4 alternativas)
   As questões têm a mesma numeração nas três versões, então a correção e a
   leitura dos resultados por habilidade são iguais para toda a turma.
   Autora: Júlia Roberta Quoos Alves.
   ===================================================================== */
window.AVAL_FICHAS = {"EF06CO01":["cada-dado-no-seu-pote","Cada dado no seu pote"],"EF06CO02":["robo-no-labirinto","Robô no labirinto"],"EF06CO03":["ditado-de-desenho","Ditado de desenho"],"EF06CO04":["divida-para-resolver","Divida para resolver"],"EF06CO05":["o-que-importa","O que importa?"],"EF06CO06":["caca-aos-padroes","Caça aos padrões"],"EF06CO07":["pacotes-embaralhados","Pacotes embaralhados"],"EF06CO08":["arquivos-em-ordem","Arquivos em ordem"],"EF06CO09":["semaforo-da-conversa","Semáforo da conversa"],"EF06CO10":["quanto-custa-um-celular","Quanto custa um celular?"],"EF07CO01":["a-ficha-da-turma","A ficha da turma"],"EF07CO02":["caca-aos-bugs","Caça aos bugs"],"EF07CO03":["do-problema-ao-projeto","Do problema ao projeto"],"EF07CO04":["pontes-e-caminhos","Pontes e caminhos"],"EF07CO05":["escreva-uma-vez-use-sempre","Escreva uma vez, use sempre"],"EF07CO06":["as-regras-da-conversa","As regras da conversa"],"EF07CO07":["detetive-de-golpes","Detetive de golpes"],"EF07CO08":["discordar-sem-ferir","Discordar sem ferir"],"EF07CO09":["cyberbullying-nao-e-brincadeira","Não é brincadeira"],"EF07CO10":["para-onde-vai-o-lixo-eletronico","Para onde vai o lixo eletrônico?"],"EF07CO11":["do-roteiro-a-publicacao","Do roteiro à publicação"],"EF08CO01":["bonecas-recursivas","Bonecas recursivas"],"EF08CO02":["listas-que-crescem","Listas que crescem"],"EF08CO03":["buscar-e-ordenar","Buscar e ordenar"],"EF08CO04":["programa-para-outra-aula","Programa para outra aula"],"EF08CO05":["muitas-maos","Muitas mãos"],"EF08CO06":["a-viagem-de-um-clique","A viagem de um clique"],"EF08CO07":["por-dentro-do-feed","Por dentro do feed"],"EF08CO08":["seus-dados-valem-muito","Seus dados valem muito"],"EF08CO09":["li-e-concordo","Li e concordo?"],"EF08CO10":["privacidade-no-controle","Privacidade no controle"],"EF08CO11":["fonte-confiavel","Fonte confiável?"],"EF09CO01":["arvores-e-grafos","Árvores e grafos"],"EF09CO02":["projeto-com-impacto","Projeto com impacto"],"EF09CO03":["maquina-de-estados","Máquina de estados"],"EF09CO04":["como-agem-os-ataques","Como agem os ataques"],"EF09CO05":["mensagens-secretas","Mensagens secretas"],"EF09CO06":["radar-do-bairro","Radar do bairro"],"EF09CO07":["tribunal-da-tecnologia","Tribunal da tecnologia"],"EF09CO08":["acesso-digital-desigual","Acesso digital desigual"],"EF09CO09":["creditos-certos","Créditos certos"],"EF09CO10":["verdade-ou-boato","Verdade ou boato?"]};

(function () {
  const ANOS = [6, 7, 8, 9];
  const LETRAS = 'abcd';
  const ALTS = { A: 2, B: 3, C: 4 }; // alternativas por versão
  const VF_MAX = { A: 2, B: 3, C: 99 }; // afirmações de V ou F por versão
  const NOME_VERSAO = { A: 'mais apoio', B: 'apoio intermediário', C: 'versão completa' };

  /* ---------- banco de questões ---------- */
  // Cada item: { id, tipo: 'me'|'vf'|'ab', habs, enun, alts, certa, coment, itens, resp, linhas, lista }
  const BANCO = [];
  TESTE_ANO.forEach((q, i) => {
    if (!HAB[q[0]]) return;
    BANCO.push({ id: 't' + i, tipo: 'me', habs: [q[0]], enun: q[1], alts: q[2].map(esc), certa: q[3], coment: q[4] });
  });
  LISTAS.filter(l => !l.comp && !/revisao/.test(l.id)).forEach(l => {
    l.ex.forEach((e, k) => {
      const base = { id: l.id + '-' + k, habs: l.habs, lista: l.id, objeto: l.objeto };
      if (e[0] === 'me') BANCO.push(Object.assign(base, { tipo: 'me', enun: e[1], alts: e[2], certa: e[3], coment: e[4] }));
      else if (e[0] === 'vf') BANCO.push(Object.assign(base, { tipo: 'vf', enun: e[1], itens: e[2], coment: e[3] }));
      else if (e[0] === 'ab') BANCO.push(Object.assign(base, { tipo: 'ab', enun: e[1], resp: e[2], linhas: e[3] || 4 }));
    });
  });
  const habsDoAno = ano => Object.keys(HAB).filter(c => HAB[c].comp === 'CO' && HAB[c].ano === ano).sort();

  /* ---------- sorteio com semente (a mesma semente gera a mesma prova) ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const embaralhar = (a, r) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const novaSemente = () => Math.floor(Math.random() * 900000) + 100000;

  /* ---------- montagem da prova ---------- */
  function montar(cfg) {
    const r = rng(cfg.s);
    const sel = cfg.h;
    const usadas = new Set();
    const questoes = [];
    // múltipla escolha: n por habilidade, primeiro as que são só daquela habilidade
    sel.forEach(c => {
      const exatas = embaralhar(BANCO.filter(q => q.tipo === 'me' && q.habs.length === 1 && q.habs[0] === c), r);
      const juntas = embaralhar(BANCO.filter(q => q.tipo === 'me' && q.habs.length > 1 && q.habs.includes(c)), r);
      let n = 0;
      for (const q of exatas.concat(juntas)) {
        if (n >= cfg.n) break;
        if (usadas.has(q.id)) continue;
        usadas.add(q.id); questoes.push(Object.assign({ hab: c }, q)); n++;
      }
    });
    // verdadeiro ou falso e dissertativas: uma por lista, das listas ligadas às habilidades escolhidas
    const extra = (tipo, quantas) => {
      const cands = embaralhar(BANCO.filter(q => q.tipo === tipo && q.habs.some(c => sel.includes(c))), r);
      const listas = new Set(); const out = [];
      for (const q of cands) {
        if (out.length >= quantas) break;
        if (listas.has(q.lista)) continue;
        listas.add(q.lista); out.push(Object.assign({ hab: q.habs.find(c => sel.includes(c)) }, q));
      }
      return out.sort((a, b) => sel.indexOf(a.hab) - sel.indexOf(b.hab));
    };
    let me = questoes;
    if (cfg.m) me = embaralhar(me, r);
    const vf = extra('vf', cfg.vf), ab = extra('ab', cfg.ab);
    // alternativas: uma ordem só; as versões B e A tiram distratores sorteados
    const todas = me.concat(vf, ab).map(q => {
      if (q.tipo !== 'me') return Object.assign({ vfOrdem: q.itens ? embaralhar(q.itens.map((_, i) => i), r) : null }, q);
      const ordem = embaralhar([0, 1, 2, 3].slice(0, q.alts.length), r);
      const distr = embaralhar(ordem.filter(i => i !== q.certa), r);
      const ver = {};
      ['A', 'B', 'C'].forEach(v => {
        const fora = distr.slice(0, Math.max(0, q.alts.length - ALTS[v]));
        ver[v] = ordem.filter(i => !fora.includes(i));
      });
      return Object.assign({ ver }, q);
    });
    return todas;
  }

  /* ---------- folhas ---------- */
  const fmt = x => (Math.round(x * 100) / 100).toString().replace('.', ',');
  // valor de cada questão em décimos; a sobra vai para as últimas (as abertas ficam no fim), para a soma bater com o total
  function valorQuestao(cfg, total, k) {
    if (!(cfg.p > 0) || !total) return '';
    const dec = Math.round(cfg.p * 10), base = Math.floor(dec / total), sobra = dec - base * total;
    return fmt((base + (k >= total - sobra ? 1 : 0)) / 10);
  }

  function cabecalho(cfg, v) {
    const campo = (rot, val, cls) => `<div class="cab-campo ${cls || ''}"><span>${rot}</span><b>${val ? esc(val) : ''}</b></div>`;
    return `<header class="cab">
      <div class="cab-linha">${campo('Escola', cfg.escola, 'largo')}${campo('Data', cfg.data)}</div>
      <div class="cab-linha">${campo('Professor(a)', cfg.prof, 'largo')}${campo('Turma', cfg.turma)}</div>
      <div class="cab-linha">${campo('Nome', '', 'largo')}${cfg.p > 0 ? campo('Nota', '') : campo('Nº', '')}</div>
    </header>
    <h2 class="prova-titulo">${esc(cfg.titulo || 'Avaliação de Computação')} · ${cfg.a}º ano</h2>
    ${instrucoes(cfg, v)}`;
  }
  function instrucoes(cfg, v) {
    const itens = v === 'A'
      ? ['Leia uma questão de cada vez, com calma.', 'Marque um X no quadrado da resposta certa.', 'Se precisar, peça para alguém ler a questão com você.']
      : v === 'B'
        ? ['Leia cada questão com atenção antes de responder.', 'Nas questões de marcar, faça um X em uma alternativa.', 'Se tiver dúvida, sublinhe as palavras importantes do enunciado.']
        : ['Leia cada questão com atenção.', 'Nas questões de múltipla escolha, marque apenas uma alternativa.', 'Nas questões abertas, explique o seu raciocínio.'];
    if (cfg.p > 0) itens.push(`Valor total: ${fmt(cfg.p)} pontos.`);
    return `<ul class="instr">${itens.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }

  function questaoHTML(q, k, v, cfg, total) {
    const val = valorQuestao(cfg, total, k);
    const topo = `<div class="q-topo"><span class="q-num">${k + 1}</span>${val ? `<span class="q-valor">${val} ${val === '1' ? 'ponto' : 'pontos'}</span>` : ''}${cfg.cod ? `<span class="q-hab">${q.hab}</span>` : ''}</div>`;
    if (q.tipo === 'me') {
      return `<section class="q">${topo}<div class="q-enun">${q.enun}</div>
        <ol class="q-alts">${q.ver[v].map((i, j) => `<li><span class="caixa" aria-hidden="true"></span><span class="letra">${LETRAS[j]})</span><span>${q.alts[i]}</span></li>`).join('')}</ol></section>`;
    }
    if (q.tipo === 'vf') {
      const ordem = q.vfOrdem.slice(0, VF_MAX[v]);
      const instr = v === 'A' ? 'Circule V (verdadeiro) ou F (falso) em cada frase.' : 'Escreva V (verdadeiro) ou F (falso) em cada frase.';
      return `<section class="q">${topo}<div class="q-enun">${instr}</div>
        <ol class="q-vf">${ordem.map(i => `<li>${v === 'A' ? '<span class="vf-op">V</span><span class="vf-op">F</span>' : '<span class="vf-par">(&nbsp;&nbsp;&nbsp;&nbsp;)</span>'}<span>${q.itens[i][0]}</span></li>`).join('')}</ol></section>`;
    }
    // dissertativa
    if (v === 'A') {
      return `<section class="q">${topo}<div class="q-enun">${q.enun}</div>
        <p class="q-dica">Responda com uma frase curta ou com um desenho.</p><div class="q-quadro"></div></section>`;
    }
    const linhas = Math.max(3, Math.min(8, q.linhas + (v === 'B' ? 1 : 0)));
    return `<section class="q">${topo}<div class="q-enun">${q.enun}</div>
      ${v === 'B' ? '<p class="q-dica">Dica: responda em 2 ou 3 frases. Diga o que você pensa e explique o porquê.</p>' : ''}
      <div class="q-linhas">${'<span></span>'.repeat(linhas)}</div></section>`;
  }

  function provaHTML(prova, v, cfg) {
    return `<article class="prova versao-${v}" data-versao="${v}">
      ${cabecalho(cfg, v)}
      <div class="questoes">${prova.map((q, k) => questaoHTML(q, k, v, cfg, prova.length)).join('')}</div>
      <p class="prova-rodape">${cfg.mv ? `Modelo ${v} · ` : ''}Avaliação gerada em ohtopico.com.br/material-didatico/avaliacao.html · código ${cfg.s}</p>
    </article>`;
  }

  function respostaMe(q, v) { return LETRAS[q.ver[v].indexOf(q.certa)]; }
  function respostaVf(q, v) { return q.vfOrdem.slice(0, VF_MAX[v]).map(i => q.itens[i][1] ? 'V' : 'F').join(' '); }

  function gabaritoHTML(prova, cfg) {
    const vs = cfg.v;
    const linhas = prova.map((q, k) => `<tr><td>${k + 1}</td><td><code>${q.hab}</code></td>${vs.map(v => `<td class="resp">${q.tipo === 'me' ? respostaMe(q, v) : q.tipo === 'vf' ? respostaVf(q, v) : 'aberta'}</td>`).join('')}</tr>`).join('');
    const porHab = cfg.h.map(c => {
      const ns = prova.map((q, k) => q.hab === c || q.habs.includes(c) ? k + 1 : 0).filter(Boolean);
      const f = window.AVAL_FICHAS[c];
      return `<tr><td><code>${c}</code></td><td>${esc(HAB[c].objeto)}</td><td>${ns.length ? ns.join(', ') : '–'}</td><td>${f ? `<a href="../computacao-adaptada/fichas/${f[0]}/">${esc(f[1])}</a> <span class="url">ohtopico.com.br/computacao-adaptada/fichas/${f[0]}/</span>` : '–'}</td></tr>`;
    }).join('');
    const comentadas = prova.map((q, k) => {
      if (q.tipo === 'me') return `<li><b>${k + 1}.</b> ${q.alts[q.certa]}. ${q.coment ? esc(q.coment) : ''}</li>`;
      if (q.tipo === 'vf') return `<li><b>${k + 1}.</b> ${q.vfOrdem.map(i => `${q.itens[i][1] ? 'V' : 'F'}: ${q.itens[i][0]}`).join(' / ')}. ${q.coment ? esc(q.coment) : ''}${vs.some(v => VF_MAX[v] < q.itens.length) ? ' <i>(As versões com mais apoio usam só as primeiras frases desta lista.)</i>' : ''}</li>`;
      return `<li><b>${k + 1}.</b> Resposta esperada: ${esc(q.resp)}${vs.includes('A') ? ' <i>Na versão A, aceite resposta curta, desenho ou resposta oral registrada pelo professor.</i>' : ''}</li>`;
    }).join('');
    return `<article class="prova gabarito-folha">
      <h2 class="prova-titulo">Gabarito · ${esc(cfg.titulo || 'Avaliação de Computação')} · ${cfg.a}º ano</h2>
      <p class="g-nota">Código da prova: <b>${cfg.s}</b>. As questões têm a mesma numeração em todas as versões; só muda a quantidade de alternativas e, por isso, a letra da resposta.</p>
      <table class="g-tab"><thead><tr><th>Nº</th><th>Habilidade</th>${vs.map(v => `<th>Versão ${v}</th>`).join('')}</tr></thead><tbody>${linhas}</tbody></table>
      <h3>Respostas comentadas</h3>
      <ol class="g-coment">${comentadas}</ol>
      <h3>Resultado por habilidade e material para retomar</h3>
      <p class="g-nota">Some os acertos de cada habilidade. Quem errar a maioria das questões de uma habilidade pode retomar com a ficha adaptada (versões A, B e C) e com a página Aprenda da habilidade.</p>
      <table class="g-tab g-habs"><thead><tr><th>Habilidade</th><th>Objeto de conhecimento</th><th>Questões</th><th>Ficha adaptada para retomar</th></tr></thead><tbody>${porHab}</tbody></table>
      <p class="prova-rodape">Avaliação gerada em ohtopico.com.br/material-didatico/avaliacao.html · código ${cfg.s}</p>
    </article>`;
  }

  window.AVAL = { BANCO, habsDoAno, montar, provaHTML, gabaritoHTML, novaSemente, NOME_VERSAO, ANOS };
})();
