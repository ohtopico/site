// Teste de proficiência em informática: uma pergunta por vez, explicação depois de cada resposta,
// resultado com nível, acertos por área e materiais do site para as áreas com menos acertos.
// Usa o visual do quiz de pensamento computacional (quiz.css). Nada sai do navegador: sem cadastro e sem cookies
// (o GoatCounter só conta que alguém terminou; o último resultado fica no localStorage, só para comparar ao refazer).
(function () {
    const quiz = document.getElementById('quiz');
    if (!quiz) return;
    const AREAS = JSON.parse(quiz.dataset.areas);
    const NIVEIS = JSON.parse(quiz.dataset.niveis);
    const URL_TESTE = 'https://ohtopico.com.br/teste-proficiencia-informatica/';
    const CHAVE = 'teste-informatica-ultimo';
    const LETRAS = 'ABCD';
    const perguntas = [...quiz.querySelectorAll('.quiz-q')];
    const total = perguntas.length;
    const respostas = new Array(total).fill(null);
    const barra = document.getElementById('quiz-barra');
    const placar = document.getElementById('quiz-placar');
    const voltar = document.getElementById('quiz-voltar');
    const proxima = document.getElementById('quiz-proxima');
    const resultado = document.getElementById('quiz-resultado');
    let atual = 0;

    quiz.classList.add('quiz-js');

    const acertos = () => respostas.filter((r, i) => r === +perguntas[i].dataset.certa).length;
    const rolarPara = el => el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const juntar = l => l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1];

    function ler() { try { return JSON.parse(localStorage.getItem(CHAVE)); } catch (e) { return null; } }
    function gravar(v) { try { localStorage.setItem(CHAVE, JSON.stringify(v)); } catch (e) {} }

    function mostrar(i) {
        atual = i;
        perguntas.forEach((q, n) => q.classList.toggle('atual', n === i));
        const respondidas = respostas.filter(r => r !== null).length;
        barra.style.width = (respondidas / total * 100) + '%';
        placar.textContent = `${respondidas} de ${total} respondidas`;
        voltar.disabled = i === 0;
        proxima.disabled = respostas[i] === null;
        proxima.textContent = i === total - 1 ? 'Ver resultado' : 'Próxima';
    }

    function responder(q, i, valor) {
        if (respostas[i] !== null) return;
        respostas[i] = valor;
        const certa = +q.dataset.certa;
        q.classList.add('respondida');
        q.querySelectorAll('input').forEach(inp => { inp.disabled = true; });
        const opcoes = q.querySelectorAll('.quiz-opcao');
        opcoes[certa].classList.add('certa');
        if (valor !== certa) opcoes[valor].classList.add('errada');
        q.querySelector('.quiz-veredito').textContent = valor === certa
            ? 'Resposta certa.'
            : `A resposta esperada é a ${LETRAS[certa]}.`;
        mostrar(i);
        proxima.focus({ preventScroll: true });
    }

    perguntas.forEach((q, i) => {
        q.addEventListener('change', e => { if (e.target.name === q.id) responder(q, i, +e.target.value); });
    });

    document.getElementById('quiz-comecar').addEventListener('click', () => {
        quiz.classList.add('rodando');
        mostrar(0);
        rolarPara(quiz);
        perguntas[0].querySelector('input').focus({ preventScroll: true });
    });
    voltar.addEventListener('click', () => { if (atual > 0) mostrar(atual - 1); });
    proxima.addEventListener('click', () => {
        if (respostas[atual] === null) return;
        if (atual < total - 1) {
            mostrar(atual + 1);
            rolarPara(quiz);
            const q = perguntas[atual];
            (q.querySelector('input:not(:disabled)') || proxima).focus({ preventScroll: true });
        } else {
            terminar();
        }
    });

    function porArea() {
        const a = {};
        Object.keys(AREAS).forEach(k => { a[k] = { acertos: 0, total: 0 }; });
        perguntas.forEach((q, i) => {
            const k = q.dataset.area;
            a[k].total++;
            if (respostas[i] === +q.dataset.certa) a[k].acertos++;
        });
        return a;
    }

    function terminar() {
        const nota = acertos();
        const nivel = NIVEIS.filter(n => nota >= n.min).pop();
        const area = porArea();
        const chaves = Object.keys(area);
        const fracao = k => area[k].acertos / area[k].total;
        // as duas áreas com menos acertos (só as que não estão completas), na ordem do teste em caso de empate
        const estudar = chaves.filter(k => fracao(k) < 1).sort((x, y) => fracao(x) - fracao(y)).slice(0, 2);
        const fortes = chaves.filter(k => fracao(k) === 1);
        const anterior = ler();
        gravar({ nota, nivel: nivel.id, data: new Date().toISOString().slice(0, 10), areas: Object.fromEntries(chaves.map(k => [k, [area[k].acertos, area[k].total]])), estudar });   // o Mundo do site lê este resultado para o teletransporte

        const comparacao = anterior && anterior.nota != null
            ? `<p class="quiz-miudo">Da última vez neste navegador${anterior.data ? ` (${anterior.data.split('-').reverse().join('/')})` : ''}: ${anterior.nota} de ${total}.`
              + (nota > anterior.nota ? ` Você subiu ${nota - anterior.nota} ${nota - anterior.nota === 1 ? 'ponto' : 'pontos'}.` : '') + '</p>'
            : '';
        const fraseFortes = fortes.length === 0 ? ''
            : fortes.length === chaves.length ? 'Você acertou tudo nas seis áreas.'
            : `Acertou tudo em <strong>${esc(juntar(fortes.map(k => AREAS[k].nome)))}</strong>.`;
        const blocoEstudar = estudar.length === 0 ? '' : `
<h4 class="res-titulo">Para estudar agora</h4>
<div class="res-estudar">${estudar.map(k => `
  <div class="res-area">
    <p><strong>${esc(AREAS[k].nome)}</strong> · ${area[k].acertos} de ${area[k].total}<br><span class="quiz-miudo">${esc(AREAS[k].resumo)}</span></p>
    <ul>${AREAS[k].links.map(([h, n]) => `<li><a href="${h}">${esc(n)}</a></li>`).join('')}</ul>
  </div>`).join('')}
</div>`;
        const textoPost = `Fiz o teste de proficiência em informática da professora Júlia Roberta Quoos Alves e fiquei no nível `
            + `"${nivel.nome}", com ${nota} de ${total} acertos. São ${total} perguntas sobre computador, arquivos, internet, `
            + `segurança, planilhas e lógica, com explicação em cada resposta. Gratuito: ${URL_TESTE}`;

        resultado.innerHTML = `
<div class="res-topo">
  <div class="res-nota" aria-hidden="true"><b>${nota}</b><span>de ${total}</span></div>
  <div><p class="rotulo">Seu nível em informática</p><h3 id="res-nivel">${esc(nivel.nome)}</h3><p class="sr-only">${nota} de ${total} acertos.</p></div>
</div>
${comparacao}
<p>${esc(nivel.texto)}</p>
${fraseFortes ? `<div class="res-forte"><p>${fraseFortes}</p></div>` : ''}
<h4 class="res-titulo">Acertos por área</h4>
<ul class="res-pilares">${chaves.map(k => `
  <li class="${fracao(k) === 1 ? 'forte' : ''}"><div class="res-pilar-linha"><span>${esc(AREAS[k].nome)} <span class="quiz-miudo">· ${esc(AREAS[k].eixo)}</span></span><span>${area[k].acertos} de ${area[k].total}</span></div>
  <div class="res-pilar-barra" aria-hidden="true"><span style="width:${fracao(k) * 100}%"></span></div></li>`).join('')}
</ul>
<p class="quiz-miudo">Os eixos são os da BNCC Computação: pensamento computacional, mundo digital e cultura digital.</p>
<p><strong>Próximo passo:</strong> ${esc(nivel.proximo)}</p>
<p><a class="btn98" href="/mundo/?teleporte=1">🌀 Treinar no Mundo do site, no seu nível</a> <span class="quiz-miudo">O portal de teletransporte leva você a um mundo com as habilidades do nível ${esc(nivel.nome)}.</span></p>
${blocoEstudar}
<section class="res-compartilhar" aria-labelledby="res-comp-titulo">
  <h4 id="res-comp-titulo">Guardar e compartilhar</h4>
  <p>Imprima ou salve o resultado em PDF para mostrar ao professor, ou copie um texto pronto para compartilhar.</p>
  <div class="res-botoes">
    <button type="button" class="btn98 escuro" id="res-imprimir">Imprimir resultado</button>
    <button type="button" class="btn98" id="res-copiar">Copiar texto</button>
    <a class="btn98" id="res-linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL_TESTE)}" target="_blank" rel="noopener">Compartilhar no LinkedIn</a>
    <button type="button" class="btn98" id="res-refazer">Refazer o teste</button>
  </div>
  <p class="res-aviso" id="res-aviso" role="status"></p>
</section>`;
        quiz.classList.add('terminado');
        resultado.hidden = false;
        barra.style.width = '100%';
        rolarPara(quiz);
        resultado.focus({ preventScroll: true });

        const aviso = document.getElementById('res-aviso');
        document.getElementById('res-copiar').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(textoPost);
                aviso.textContent = 'Texto copiado.';
            } catch (e) {
                window.prompt('Copie o texto:', textoPost);
            }
        });
        document.getElementById('res-imprimir').addEventListener('click', () => window.print());
        document.getElementById('res-refazer').addEventListener('click', refazer);
        document.getElementById('res-linkedin').addEventListener('click', () => contar('teste-informatica-linkedin'));
        contar('teste-informatica-concluido-' + nivel.id);
    }

    function refazer() {
        respostas.fill(null);
        perguntas.forEach(q => {
            q.classList.remove('respondida');
            q.querySelectorAll('input').forEach(inp => { inp.disabled = false; inp.checked = false; });
            q.querySelectorAll('.quiz-opcao').forEach(o => o.classList.remove('certa', 'errada'));
            q.querySelector('.quiz-veredito').textContent = '';
        });
        resultado.hidden = true;
        resultado.innerHTML = '';
        quiz.classList.remove('terminado');
        mostrar(0);
        rolarPara(quiz);
        perguntas[0].querySelector('input').focus({ preventScroll: true });
    }

    function contar(evento) {
        try {
            if (window.goatcounter && window.goatcounter.count) {
                window.goatcounter.count({ path: evento, title: 'Teste de proficiência em informática', event: true });
            }
        } catch (e) {}
    }
})();
