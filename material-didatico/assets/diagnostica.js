/* =====================================================================
   Avaliações diagnósticas de Computação (BNCC, 6º ao 9º ano): montagem
   das folhas para imprimir (versões A, B e C), do gabarito com rubrica e
   do mapa da turma. Os itens ficam em diagnostica-itens.js.
     A: mais apoio (2 alternativas, letra maior, tarefas com estrutura pronta)
     B: apoio intermediário (3 alternativas, dica nas tarefas abertas)
     C: versão completa (4 alternativas)
   A numeração é a mesma nas três versões, então a rubrica e o mapa da
   turma servem para todos os estudantes.
   Autora: Júlia Roberta Quoos Alves.
   ===================================================================== */
// Fichas de computação adaptada por habilidade (cópia do mapa de avaliacao.js; atualize os dois juntos)
window.AVAL_FICHAS = window.AVAL_FICHAS || {"EF06CO01":["cada-dado-no-seu-pote","Cada dado no seu pote"],"EF06CO02":["robo-no-labirinto","Robô no labirinto"],"EF06CO03":["ditado-de-desenho","Ditado de desenho"],"EF06CO04":["divida-para-resolver","Divida para resolver"],"EF06CO05":["o-que-importa","O que importa?"],"EF06CO06":["caca-aos-padroes","Caça aos padrões"],"EF06CO07":["pacotes-embaralhados","Pacotes embaralhados"],"EF06CO08":["arquivos-em-ordem","Arquivos em ordem"],"EF06CO09":["semaforo-da-conversa","Semáforo da conversa"],"EF06CO10":["quanto-custa-um-celular","Quanto custa um celular?"],"EF07CO01":["a-ficha-da-turma","A ficha da turma"],"EF07CO02":["caca-aos-bugs","Caça aos bugs"],"EF07CO03":["do-problema-ao-projeto","Do problema ao projeto"],"EF07CO04":["pontes-e-caminhos","Pontes e caminhos"],"EF07CO05":["escreva-uma-vez-use-sempre","Escreva uma vez, use sempre"],"EF07CO06":["as-regras-da-conversa","As regras da conversa"],"EF07CO07":["detetive-de-golpes","Detetive de golpes"],"EF07CO08":["discordar-sem-ferir","Discordar sem ferir"],"EF07CO09":["cyberbullying-nao-e-brincadeira","Não é brincadeira"],"EF07CO10":["para-onde-vai-o-lixo-eletronico","Para onde vai o lixo eletrônico?"],"EF07CO11":["do-roteiro-a-publicacao","Do roteiro à publicação"],"EF08CO01":["bonecas-recursivas","Bonecas recursivas"],"EF08CO02":["listas-que-crescem","Listas que crescem"],"EF08CO03":["buscar-e-ordenar","Buscar e ordenar"],"EF08CO04":["programa-para-outra-aula","Programa para outra aula"],"EF08CO05":["muitas-maos","Muitas mãos"],"EF08CO06":["a-viagem-de-um-clique","A viagem de um clique"],"EF08CO07":["por-dentro-do-feed","Por dentro do feed"],"EF08CO08":["seus-dados-valem-muito","Seus dados valem muito"],"EF08CO09":["li-e-concordo","Li e concordo?"],"EF08CO10":["privacidade-no-controle","Privacidade no controle"],"EF08CO11":["fonte-confiavel","Fonte confiável?"],"EF09CO01":["arvores-e-grafos","Árvores e grafos"],"EF09CO02":["projeto-com-impacto","Projeto com impacto"],"EF09CO03":["maquina-de-estados","Máquina de estados"],"EF09CO04":["como-agem-os-ataques","Como agem os ataques"],"EF09CO05":["mensagens-secretas","Mensagens secretas"],"EF09CO06":["radar-do-bairro","Radar do bairro"],"EF09CO07":["tribunal-da-tecnologia","Tribunal da tecnologia"],"EF09CO08":["acesso-digital-desigual","Acesso digital desigual"],"EF09CO09":["creditos-certos","Créditos certos"],"EF09CO10":["verdade-ou-boato","Verdade ou boato?"]};

(function () {
  const ANOS = [6, 7, 8, 9];
  const LETRAS = 'abcd';
  const ALTS = { A: 2, B: 3, C: 4 };
  const NOME_VERSAO = { A: 'mais apoio', B: 'apoio intermediário', C: 'versão completa' };
  const EIXOS = { PC: 'Pensamento computacional', MD: 'Mundo digital', CD: 'Cultura digital' };
  const NIVEIS = ['Ainda não', 'Em desenvolvimento', 'Consolidado'];
  // deslocamento da semente por ano, escolhido para as letras das respostas variarem bem nas três versões
  const SEMENTE = { 6: 1, 7: 1, 8: 4, 9: 15 };
  const URL_PAG = 'ohtopico.com.br/material-didatico/avaliacao-diagnostica.html';

  // ordem fixa das alternativas (a mesma em todas as impressões, para o gabarito valer sempre)
  function rng(seed) {
    let a = seed >>> 0;
    return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function embaralhar(a, r) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  function itens(ano) {
    return window.DIAG_ITENS[ano].itens.map((q, k) => {
      if (q.tipo !== 'me') return Object.assign({ n: k + 1 }, q);
      const perm = embaralhar([0, 1, 2, 3].slice(0, q.alts.length), rng(ano * 1000 + k * 37 + 11 + (SEMENTE[ano] || 0)));
      const ver = {};
      // índice 0 é a certa; a versão com menos alternativas fica com os primeiros distratores
      ['A', 'B', 'C'].forEach(v => { ver[v] = perm.filter(i => i < ALTS[v]); });
      return Object.assign({ n: k + 1, ver }, q);
    });
  }
  const pontos = q => q.tipo === 'me' ? 1 : 2;
  function maxPorEixo(qs) {
    const m = {}; qs.forEach(q => { m[q.eixo] = (m[q.eixo] || 0) + pontos(q); }); return m;
  }
  // faixas de leitura: menos de 40% = ainda não; de 40% a menos de 75% = em desenvolvimento; 75% ou mais = consolidado
  function faixas(max) {
    const ini = Math.ceil(max * 0.4), alto = Math.ceil(max * 0.75);
    const f = (a, b) => a === b ? `${a}` : `${a} a ${b}`;
    return [f(0, ini - 1), f(ini, alto - 1), f(alto, max)];
  }
  const codigos = q => (q.pre && q.pre.length) ? q.pre.join(', ') : '';
  const nomeHab = c => (window.HAB && HAB[c]) ? HAB[c].objeto : '';

  /* ---------- folha do estudante ---------- */
  function cabecalho(cfg) {
    const campo = (rot, val) => `<div class="cab-campo"><span>${rot}</span><b>${val ? esc(val) : ''}</b></div>`;
    return `<header class="cab">
      <div class="cab-linha">${campo('Escola', cfg.escola)}${campo('Data', cfg.data)}</div>
      <div class="cab-linha">${campo('Professor(a)', cfg.prof)}${campo('Turma', cfg.turma)}</div>
      <div class="cab-linha">${campo('Nome', '')}${campo('Nº', '')}</div>
    </header>`;
  }
  function instrucoes(v) {
    const itens = v === 'A'
      ? ['Esta atividade não vale nota. Ela mostra o que você já sabe para planejar as aulas do ano.', 'Leia uma questão de cada vez, com calma.', 'Marque um X no quadrado da resposta certa.', 'Se precisar, peça para alguém ler a questão com você.']
      : v === 'B'
        ? ['Esta atividade não vale nota. Ela mostra o que você já sabe para planejar as aulas do ano.', 'Leia cada questão com atenção antes de responder.', 'Nas questões de marcar, faça um X em uma alternativa.', 'Se tiver dúvida, sublinhe as palavras importantes do enunciado.']
        : ['Esta atividade não vale nota. Ela mostra o que você já sabe para planejar as aulas do ano.', 'Nas questões de múltipla escolha, marque apenas uma alternativa.', 'Nas tarefas da parte 2, mostre como você pensou.', 'Se não souber, escolha a resposta que parecer melhor ou escreva o que conseguir.'];
    return `<ul class="instr">${itens.map(i => `<li>${i}</li>`).join('')}</ul>`;
  }
  function topo(q, cfg) {
    const hab = cfg.cod ? `<span class="q-hab">${esc(codigos(q) || q.prep)}</span>` : '';
    return `<div class="q-topo"><span class="q-num">${q.n}</span>${hab}</div>`;
  }
  function questaoHTML(q, v, cfg) {
    if (q.tipo === 'me') {
      return `<section class="q">${topo(q, cfg)}<div class="q-enun">${q.enun}</div>
        <ol class="q-alts">${q.ver[v].map((i, j) => `<li><span class="caixa" aria-hidden="true"></span><span class="letra">${LETRAS[j]})</span><span>${q.alts[i]}</span></li>`).join('')}</ol></section>`;
    }
    if (v === 'A') {
      return `<section class="q">${topo(q, cfg)}<div class="q-enun">${q.enunA}</div>
        ${q.quadro ? '<div class="q-quadro"></div>' : '<div class="q-linhas">' + '<span></span>'.repeat(2) + '</div>'}</section>`;
    }
    const espaco = q.quadro ? '<div class="q-quadro"></div>' : `<div class="q-linhas">${'<span></span>'.repeat(q.linhas + (v === 'B' ? 1 : 0))}</div>`;
    return `<section class="q">${topo(q, cfg)}<div class="q-enun">${q.enun}</div>
      ${v === 'B' ? `<p class="q-dica">${esc(q.dicaB)}</p>` : ''}${espaco}</section>`;
  }
  function autoavaliacao(v) {
    const frases = ['Seguir e criar passos para resolver um problema.', 'Entender como funcionam o computador e a internet.', 'Usar a internet com segurança e respeito.'];
    const ops = v === 'A' ? ['Ainda não', 'Mais ou menos', 'Sim'] : ['Ainda tenho dúvidas', 'Mais ou menos', 'Me sinto seguro(a)'];
    return `<section class="q auto"><p class="parte">Para terminar (não vale ponto)</p>
      <p class="q-enun">Marque um X no que mais combina com você. Eu sei:</p>
      <table class="auto-tab"><thead><tr><th></th>${ops.map(o => `<th>${o}</th>`).join('')}</tr></thead>
      <tbody>${frases.map(f => `<tr><td>${f}</td>${ops.map(() => '<td><span class="caixa"></span></td>').join('')}</tr>`).join('')}</tbody></table></section>`;
  }
  function provaHTML(ano, v, cfg) {
    const qs = itens(ano);
    const me = qs.filter(q => q.tipo === 'me'), ab = qs.filter(q => q.tipo === 'ab');
    return `<article class="prova versao-${v}" data-versao="${v}">
      ${cabecalho(cfg)}
      <h2 class="prova-titulo">${esc(cfg.titulo || 'Avaliação diagnóstica de Computação')} · ${ano}º ano</h2>
      ${instrucoes(v)}
      <p class="parte">Parte 1: marque a resposta</p>
      <div class="questoes">${me.map(q => questaoHTML(q, v, cfg)).join('')}</div>
      <p class="parte">Parte 2: mostre como você pensa</p>
      <div class="questoes">${ab.map(q => questaoHTML(q, v, cfg)).join('')}</div>
      ${autoavaliacao(v)}
      <p class="prova-rodape">${cfg.mv ? `Modelo ${v} · ` : ''}Avaliação diagnóstica de Computação · ${URL_PAG}</p>
    </article>`;
  }

  /* ---------- gabarito e rubrica ---------- */
  function linkFicha(c) {
    const f = window.AVAL_FICHAS[c];
    const ficha = f ? `<a href="../computacao-adaptada/fichas/${f[0]}/">${esc(f[1])}</a><span class="url">ohtopico.com.br/computacao-adaptada/fichas/${f[0]}/</span>` : '';
    const aprenda = `<a href="aprenda/${c.toLowerCase()}/">Aprenda ${c}</a>`;
    return ficha ? `${ficha} ${aprenda}` : aprenda;
  }
  function gabaritoHTML(ano, cfg) {
    const qs = itens(ano), vs = cfg.v, D = window.DIAG_ITENS[ano];
    const max = maxPorEixo(qs);
    const linhas = qs.map(q => `<tr><td>${q.n}</td><td>${q.eixo}</td><td>${q.pre ? `<code>${q.pre.join(', ')}</code>` : esc(q.preTxt || '')}</td><td><code>${q.prep}</code></td>${vs.map(v => (q.tipo === 'me' ? `<td class="resp">${LETRAS[q.ver[v].indexOf(0)]}</td>` : '<td>rubrica</td>')).join('')}</tr>`).join('');
    const coment = qs.filter(q => q.tipo === 'me').map(q => `<li><b>${q.n}.</b> Resposta: <b>${q.alts[0].replace(/\.$/, '')}</b>. ${esc(q.coment || '')}</li>`).join('');
    const rubricas = qs.filter(q => q.tipo === 'ab').map(q => `
      <div class="rub">
        <p class="rub-tit"><b>Tarefa ${q.n}</b> · ${EIXOS[q.eixo]} · confere ${q.pre ? `<code>${q.pre.join(', ')}</code>` : esc(q.preTxt || '')} · prepara <code>${q.prep}</code></p>
        <table class="g-tab rub-tab"><thead><tr><th>0 · ${NIVEIS[0]}</th><th>1 · ${NIVEIS[1]}</th><th>2 · ${NIVEIS[2]}</th></tr></thead>
        <tbody><tr>${q.rub.map(t => `<td>${t}</td>`).join('')}</tr></tbody></table>
        <p class="g-nota"><b>Resposta esperada:</b> ${esc(q.esperado)}${vs.includes('A') ? ` <i>${q.rubA}</i>` : ''}</p>
      </div>`).join('');
    const faixasEixo = Object.keys(EIXOS).filter(e => max[e]).map(e => {
      const f = faixas(max[e]);
      return `<tr><td>${EIXOS[e]}</td><td>${qs.filter(q => q.eixo === e).map(q => q.n).join(', ')}</td><td>${max[e]}</td>${f.map(x => `<td>${x}</td>`).join('')}</tr>`;
    }).join('');
    const preps = [...new Set(qs.map(q => q.prep))].sort();
    const retomar = preps.map(c => `<tr><td><code>${c}</code></td><td>${esc(nomeHab(c))}</td><td>${qs.filter(q => q.prep === c).map(q => q.n).join(', ')}</td><td class="g-habs">${linkFicha(c)}</td></tr>`).join('');
    return `<article class="prova gabarito-folha">
      <h2 class="prova-titulo">Gabarito e rubrica · Avaliação diagnóstica · ${ano}º ano</h2>
      <p class="g-nota">Esta diagnóstica confere o que a turma traz do ${esc(D.origem)} e indica a habilidade do ${ano}º ano que cada item prepara. A numeração é a mesma nas versões A, B e C; muda só a quantidade de alternativas e, por isso, a letra da resposta. Questão de marcar vale 1 ponto (certa) ou 0. Tarefa aberta vale 0, 1 ou 2 pela rubrica.</p>
      <table class="g-tab"><thead><tr><th>Nº</th><th>Eixo</th><th>Confere</th><th>Prepara</th>${vs.map(v => `<th>Versão ${v}</th>`).join('')}</tr></thead><tbody>${linhas}</tbody></table>
      <h3>Respostas comentadas</h3>
      <ol class="g-coment">${coment}</ol>
      <h3>Rubricas das tarefas abertas</h3>
      ${rubricas}
      <h3>Como ler o resultado de cada estudante</h3>
      <p class="g-nota">Some os pontos de cada eixo e veja em que faixa o estudante está. Uma resposta em branco conta como "ainda não". A autoavaliação do fim da folha não vale ponto: compare com o resultado para ver quem se subestima ou se superestima.</p>
      <table class="g-tab"><thead><tr><th>Eixo</th><th>Itens</th><th>Máximo</th><th>${NIVEIS[0]}</th><th>${NIVEIS[1]}</th><th>${NIVEIS[2]}</th></tr></thead><tbody>${faixasEixo}</tbody></table>
      <ul class="g-coment encam">
        <li><b>${NIVEIS[0]}:</b> retome o pré-requisito antes de começar o conteúdo do ano. Use a ficha adaptada da habilidade, começando pela versão A, e atividades desplugadas em dupla.</li>
        <li><b>${NIVEIS[1]}:</b> comece a habilidade do ano com a versão B da ficha e retomadas curtas no início das aulas.</li>
        <li><b>${NIVEIS[2]}:</b> siga para o conteúdo do ano com a versão C e proponha desafios ou o papel de monitor em duplas.</li>
      </ul>
      <h3>Material para retomar, por habilidade do ${ano}º ano</h3>
      <table class="g-tab g-habs"><thead><tr><th>Habilidade</th><th>Objeto de conhecimento</th><th>Itens</th><th>Ficha adaptada (A, B e C) e explicação para o estudante</th></tr></thead><tbody>${retomar}</tbody></table>
      <p class="prova-rodape">Avaliação diagnóstica de Computação · ${URL_PAG}</p>
    </article>`;
  }

  /* ---------- mapa da turma ---------- */
  function mapaHTML(ano, cfg) {
    const qs = itens(ano), max = maxPorEixo(qs);
    const eixos = Object.keys(EIXOS).filter(e => max[e]);
    const linhas = Math.max(10, Math.min(40, cfg.alunos || 30));
    const cab = `<tr><th class="m-n">Nº</th><th class="m-nome">Nome</th>${qs.map(q => `<th class="m-i${q.tipo === 'ab' ? ' m-ab' : ''}">${q.n}<small>${q.eixo}</small></th>`).join('')}${eixos.map(e => `<th class="m-e">${e}<small>/${max[e]}</small></th>`).join('')}</tr>`;
    const corpo = Array.from({ length: linhas }, (_, i) => `<tr><td class="m-n">${i + 1}</td><td></td>${qs.map(q => `<td${q.tipo === 'ab' ? ' class="m-ab"' : ''}></td>`).join('')}${eixos.map(() => '<td class="m-e"></td>').join('')}</tr>`).join('');
    const total = `<tr class="m-total"><td colspan="2">Quantos fizeram 0</td>${qs.map(q => `<td${q.tipo === 'ab' ? ' class="m-ab"' : ''}></td>`).join('')}${eixos.map(() => '<td class="m-e"></td>').join('')}</tr>`;
    return `<article class="prova mapa-folha">
      <h2 class="prova-titulo">Mapa da turma · Avaliação diagnóstica · ${ano}º ano</h2>
      <div class="cab"><div class="cab-linha">${['Escola', 'Turma'].map((r, i) => `<div class="cab-campo"><span>${r}</span><b>${esc(i ? cfg.turma : cfg.escola)}</b></div>`).join('')}</div></div>
      <p class="g-nota">Anote 1 ou 0 nas questões de marcar e 0, 1 ou 2 nas tarefas abertas (colunas cinza). Some por eixo nas últimas colunas. Na última linha, conte quantos estudantes fizeram 0 em cada item: os itens com mais zeros são os pré-requisitos para retomar com a turma toda.</p>
      <table class="mapa"><thead>${cab}</thead><tbody>${corpo}${total}</tbody></table>
      <p class="g-nota">Eixos: ${eixos.map(e => `${e} = ${EIXOS[e]}`).join('; ')}. Faixas por eixo no gabarito.</p>
      <p class="prova-rodape">Avaliação diagnóstica de Computação · ${URL_PAG}</p>
    </article>`;
  }

  window.DIAG = { ANOS, NOME_VERSAO, itens, provaHTML, gabaritoHTML, mapaHTML, maxPorEixo };
})();
