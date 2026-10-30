/* Simuladores — dados, tema, barra superior e rodapé.
   Cada página define window.SIM_BASE: caminho até a pasta simuladores ('' em todas as páginas atuais). */
(function () {
  const BASE = window.SIM_BASE || '';
  // Tema compartilhado com o resto do site
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const saved = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch (e) {}

  window.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* niveis: EF = Ensino Fundamental, EM = Ensino Médio, ES = Ensino Superior/técnico.
     bncc: habilidades do Ensino Fundamental que o simulador apoia; uso: parte indicada para o Fundamental. */
  window.SIMULADORES = [
    { id: 'proxima-palavra', sigla: 'GPT', titulo: 'Como a IA escolhe a próxima palavra', url: 'proxima-palavra.html', niveis: ['EF', 'EM', 'ES'], ia: true,
      resumo: 'Veja o texto virar tokens, as probabilidades das próximas palavras e o efeito da temperatura e da seed no sorteio, como num modelo de linguagem do tipo ChatGPT.',
      bncc: ['EF09CO07', 'EF09CO10'],
      uso: 'No 9º ano, use a parte de probabilidades e temperatura para discutir por que a IA responde diferente a cada vez e por que é preciso conferir o que ela escreve.' },
    { id: 'regressao', sigla: 'ŷ=a+bx', titulo: 'Regressão linear', url: 'regressao.html', niveis: ['EF', 'EM', 'ES'], ia: true,
      resumo: 'Arraste pontos e veja a reta de mínimos quadrados se ajustar, com resíduos, erro quadrático médio, R², previsões e o efeito de um ponto fora da curva.',
      bncc: ['EF09MA06'],
      uso: 'No 9º ano, use os exemplos prontos para relacionar duas grandezas, ler a reta como função e fazer previsões. R², erro quadrático e o código ficam para o Médio e o Superior.' },
    { id: 'matriz-confusao', sigla: 'VP FP', titulo: 'Matriz de confusão e métricas', url: 'matriz-confusao.html', niveis: ['EM', 'ES'], ia: true,
      resumo: 'Arraste o limiar de decisão de um classificador e veja acurácia, precisão, revocação, F1, coeficiente Dice, IoU e as curvas ROC e precisão-revocação mudarem juntas.' },
    { id: 'rede-neural', sigla: 'NN', titulo: 'Treino de rede neural', url: 'rede-neural.html', niveis: ['EM', 'ES'], ia: true,
      resumo: 'Uma rede neural pequena treinando ao vivo. Ajuste taxa de aprendizado, lote, camadas, regularização e seed, e veja nas curvas de treino e validação quando o sobreajuste começa.' },
    { id: 'significancia', sigla: 'p<0,05', titulo: 'Significância entre modelos', url: 'significancia.html', niveis: ['ES'], ia: true,
      resumo: 'Compare dois modelos treinados com 10 seeds usando teste t pareado, teste de Welch e teste de permutação, com intervalo de confiança e tamanho de efeito.' },
    { id: 'bases', sigla: '1010', titulo: 'Bases numéricas e complemento de dois', url: 'bases.html', niveis: ['EF', 'EM', 'ES'],
      resumo: 'Conversão entre as bases 2, 10 e 16, complemento de dois, overflow e ponto flutuante IEEE 754.',
      bncc: ['EF04CO04', 'EF04CO05', 'EF06MA02'],
      uso: 'Use o conversor de bases (binário, decimal e hexadecimal). Complemento de dois e IEEE 754 ficam para o Médio e o Superior.' },
    { id: 'logica', sigla: 'AND', titulo: 'Portas lógicas e circuitos', url: 'logica.html', niveis: ['EF', 'EM', 'ES'],
      resumo: 'Portas lógicas com tabela-verdade, meio somador, somador completo e multiplexador.',
      bncc: ['EF03CO01', 'EF05CO03'],
      uso: 'Use as portas NOT, AND e OR como verdadeiro/falso, negação, conjunção e disjunção. Somadores e multiplexador ficam para o Médio e o Superior.' },
    { id: 'estatistica', sigla: 'x̄', titulo: 'Estatística descritiva', url: 'estatistica.html', niveis: ['EF', 'EM', 'ES'],
      resumo: 'Cole uma lista de números e veja média, mediana, moda, desvio padrão, quartis, outliers, histograma e boxplot, com o código pandas equivalente.',
      bncc: ['EF07MA35', 'EF08MA25', 'EF09MA22'],
      uso: 'Do 7º ao 9º ano, use média, mediana, moda, amplitude e o histograma com dados coletados pela turma. Desvio padrão, quartis e pandas ficam para o Médio e o Superior.' },
    { id: 'mips', sigla: 'ASM', titulo: 'Mini-MIPS', url: 'mips.html', niveis: ['ES'],
      resumo: 'Escreva assembly MIPS, monte, execute passo a passo e veja registradores, memória e a codificação binária de cada instrução nos formatos R, I e J.' },
    { id: 'cache', sigla: 'L1', titulo: 'Memória cache', url: 'cache.html', niveis: ['ES'],
      resumo: 'Configure uma cache (mapeamento direto, associativa por conjunto ou totalmente associativa) e acompanhe acertos e falhas a cada acesso.' },
    { id: 'pipeline', sigla: 'IF ID', titulo: 'Pipeline MIPS', url: 'pipeline-mips.html', niveis: ['ES'],
      resumo: 'Veja as instruções MIPS passando pelos cinco estágios (IF, ID, EX, MEM, WB) ciclo a ciclo, com bolhas, adiantamento (forwarding) e descarte após desvios.' },
    { id: 'placa-mae', sigla: 'CPU', titulo: 'Placa-mãe em 3D', url: 'placa-mae.html', niveis: ['EF', 'EM', 'ES'],
      resumo: 'Gire uma placa-mãe em 3D, clique em cada componente para saber o que ele faz, separe as peças e acompanhe o caminho dos dados entre processador, memória, chipset e armazenamento.',
      bncc: ['EF07CO10'],
      uso: 'Use a exploração das peças e o modo Encontre a peça para conhecer processador, memória, armazenamento e conexões. Barramentos e chipset ficam para o Médio e o Superior.' },
    { id: 'cpu-por-dentro', sigla: 'ULA', titulo: 'CPU por Dentro: caminho de dados MIPS em 3D', url: 'cpu-por-dentro.html', niveis: ['ES'],
      resumo: 'Siga uma instrução MIPS pelo caminho de dados em 3D, estágio por estágio (IF, ID, EX, MEM, WB), veja quais peças ela usa e acompanhe o pipeline com cinco instruções ao mesmo tempo, bolhas, adiantamento e desvios.' }
  ];
  window.NIVEIS = { EF: 'Ensino Fundamental', EM: 'Ensino Médio', ES: 'Ensino Superior e técnico' };

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

  window.simTopbar = function (atual) {
    const el = document.getElementById('topbar'); if (!el) return;
    el.className = 'topbar';
    el.innerHTML = `
      <a class="brand" href="${BASE}../">ohtopico</a>
      <a class="brand-sub" href="${BASE}index.html">/ simuladores</a>
      <span class="spacer"></span>
      <nav class="topnav" aria-label="Seções">
        <a href="${BASE}index.html"${atual === 'inicio' ? ' aria-current="page"' : ''}>Todos os simuladores</a>
        <a href="${BASE}../material-didatico/">Material didático</a>
      </nav>
      <button class="icon-btn" id="theme-btn" aria-label="Alternar tema claro/escuro">${sun}</button>`;
    document.getElementById('theme-btn').addEventListener('click', () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('iapraprof:theme', JSON.stringify(next)); } catch (e) {}
    });
  };

  window.simFooter = function () {
    const el = document.getElementById('footer'); if (!el) return;
    el.className = 'footer';
    el.innerHTML = `<div class="wrap">
      <p>Simuladores interativos de Computação, Inteligência Artificial e Estatística, organizados por
      <a href="${BASE}../curriculo/">Júlia Roberta Quoos Alves</a>. Veja também o <a href="${BASE}../material-didatico/">material didático para o Ensino Fundamental</a>.</p>
      <p>Uso livre em aulas, com citação da fonte. Sugestões: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a></p>
    </div>`;
  };

  window.simNiveis = s => `<span class="niveis">${s.niveis.map(n => `<span class="nivel n-${n.toLowerCase()}">${NIVEIS[n]}</span>`).join('')}</span>`;

  /* Cabeçalho padrão dos simuladores */
  window.simHead = function (id) {
    const s = SIMULADORES.find(x => x.id === id), el = document.getElementById('sim-head');
    if (!s || !el) return;
    // título, cabeçalho e dados estruturados já vêm escritos no HTML (gerados por _fonte/material/gerar.js)
    el.innerHTML = `
      <div class="crumbs"><a href="${BASE}index.html">← Todos os simuladores</a></div>
      <span class="eyebrow">Simulador</span>
      <h1>${esc(s.titulo)}</h1>
      <p class="muted" style="max-width:760px">${esc(s.resumo)}</p>
      ${simNiveis(s)}
      ${s.uso ? `<p class="uso"><strong>No Ensino Fundamental:</strong> ${esc(s.uso)} <span class="muted">BNCC: ${s.bncc.join(', ')}.</span></p>` : ''}`;
  };
})();
