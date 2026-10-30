// Quiz de pensamento computacional: uma pergunta por vez, explicação depois de cada resposta,
// resultado com nível, ponto forte, botão do LinkedIn, texto pronto e imagem para baixar.
// Nada sai do navegador: sem cadastro e sem cookies (o GoatCounter só conta que alguém terminou).
(function () {
    const quiz = document.getElementById('quiz');
    if (!quiz) return;
    const PILARES = JSON.parse(quiz.dataset.pilares);
    const NIVEIS = JSON.parse(quiz.dataset.niveis);
    const SITE = 'https://ohtopico.com.br';
    const URL_QUIZ = SITE + '/quiz-pensamento-computacional/';
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

    function porPilar() {
        const p = {};
        Object.keys(PILARES).forEach(k => { p[k] = { acertos: 0, total: 0 }; });
        perguntas.forEach((q, i) => {
            const k = q.dataset.pilar;
            p[k].total++;
            if (respostas[i] === +q.dataset.certa) p[k].acertos++;
        });
        return p;
    }

    function nivelDe(nota) {
        return NIVEIS.filter(n => nota >= n.min).pop();
    }

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const juntar = l => l.length < 2 ? l.join('') : l.slice(0, -1).join(', ') + ' e ' + l[l.length - 1];

    function terminar() {
        const nota = acertos();
        const nivel = nivelDe(nota);
        const pil = porPilar();
        const max = Math.max(...Object.values(pil).map(p => p.acertos));
        const fortes = Object.keys(pil).filter(k => pil[k].acertos === max && max > 0);
        const nomesFortes = fortes.map(k => PILARES[k]);
        const urlNivel = `${URL_QUIZ}resultado/${nivel.id}/`;
        const forteTexto = fortes.length === 0 ? ''
            : fortes.length === Object.keys(pil).length ? 'os quatro pilares estão equilibrados'
            : (fortes.length === 1 ? 'meu ponto forte é ' : 'meus pontos fortes são ') + juntar(nomesFortes);
        const textoPost = `Fiz o quiz de pensamento computacional para professores, criado pela professora Júlia Roberta Quoos Alves, `
            + `e fiquei no nível "${nivel.nome}", com ${nota} de ${total} acertos`
            + (forteTexto ? `; ${forteTexto}.` : '.')
            + ` São ${total} perguntas sobre decomposição, reconhecimento de padrões, abstração e algoritmos, com a explicação de cada resposta. `
            + `Vale para quem está trabalhando a BNCC Computação na escola: ${URL_QUIZ}`;

        const fraseForte = fortes.length === 0
            ? 'Cada pilar tem uma explicação nas respostas acima: vale refazer o quiz com calma.'
            : fortes.length === Object.keys(pil).length
                ? `Os quatro pilares estão equilibrados: ${max} de 3 em cada um.`
                : `${fortes.length === 1 ? 'Seu ponto forte é' : 'Seus pontos fortes são'} <strong>${esc(juntar(nomesFortes))}</strong>, com ${max} de 3 acertos.`;

        resultado.innerHTML = `
<div class="res-topo">
  <div class="res-nota" aria-hidden="true"><b>${nota}</b><span>de ${total}</span></div>
  <div><p class="rotulo">Seu nível</p><h3 id="res-nivel">${esc(nivel.nome)}</h3><p class="sr-only">${nota} de ${total} acertos.</p></div>
</div>
<div class="res-forte"><p>${fraseForte}</p></div>
<p>${esc(nivel.texto)}</p>
<h4 class="sr-only">Acertos por pilar</h4>
<ul class="res-pilares">${Object.keys(pil).map(k => `
  <li class="${fortes.includes(k) ? 'forte' : ''}"><div class="res-pilar-linha"><span>${esc(PILARES[k])}</span><span>${pil[k].acertos} de ${pil[k].total}</span></div>
  <div class="res-pilar-barra" aria-hidden="true"><span style="width:${pil[k].acertos / pil[k].total * 100}%"></span></div></li>`).join('')}
</ul>
<p><strong>Próximo passo:</strong> ${esc(nivel.proximo)}</p>
<p class="res-mais">${nivel.links.map(([h, n]) => `<a class="btn98" href="${h}">${esc(n)}</a>`).join(' ')}</p>
<section class="res-compartilhar" aria-labelledby="res-comp-titulo">
  <h4 id="res-comp-titulo">Compartilhe o resultado</h4>
  <p>O LinkedIn mostra a imagem do seu nível. Para um post com a sua nota, copie o texto pronto e anexe a imagem do resultado.</p>
  <div class="res-botoes">
    <a class="btn98 escuro" id="res-linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlNivel)}" target="_blank" rel="noopener">Compartilhar no LinkedIn</a>
    <button type="button" class="btn98" id="res-copiar">Copiar texto do post</button>
    <button type="button" class="btn98" id="res-imagem">Baixar imagem do resultado</button>
    <button type="button" class="btn98" id="res-refazer">Refazer o quiz</button>
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
                aviso.textContent = 'Texto copiado. É só colar no LinkedIn.';
            } catch (e) {
                window.prompt('Copie o texto do post:', textoPost);
            }
        });
        document.getElementById('res-imagem').addEventListener('click', async () => {
            const nomeArquivo = `quiz-pensamento-computacional-${nivel.id}.png`;
            const url = await desenharImagem(nota, nivel, nomesFortes, max).catch(() => null);
            if (!url) { aviso.textContent = 'Não foi possível gerar a imagem neste navegador.'; return; }
            const a = document.createElement('a');
            a.href = url; a.download = nomeArquivo;
            document.body.appendChild(a); a.click(); a.remove();
            aviso.textContent = 'Imagem baixada. Anexe ao post do LinkedIn.';
        });
        document.getElementById('res-refazer').addEventListener('click', refazer);
        document.getElementById('res-linkedin').addEventListener('click', () => contar('quiz-linkedin'));
        contar('quiz-concluido-' + nivel.id);
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
                window.goatcounter.count({ path: evento, title: 'Quiz de pensamento computacional', event: true });
            }
        } catch (e) {}
    }

    // Imagem quadrada (1080 x 1080) nas cores do site, boa para o feed do LinkedIn
    async function desenharImagem(nota, nivel, fortes, max) {
        try { await Promise.all([document.fonts.load('800 40px Sniglet'), document.fonts.load('400 20px Lexend'), document.fonts.load('600 20px Lexend')]); } catch (e) {}
        const L = 1080;
        const c = document.createElement('canvas');
        c.width = L; c.height = L;
        const g = c.getContext('2d');
        const tinta = '#111111', verde = '#16703a', amarelo = '#fff36b', amareloClaro = '#fff9c2', verdeClaro = '#e3f4e8';
        const caixa = (x, y, w, h, r, fundo) => {
            g.beginPath(); g.roundRect(x, y, w, h, r);
            g.fillStyle = fundo; g.fill(); g.lineWidth = 4; g.strokeStyle = tinta; g.stroke();
        };
        const quebrar = (texto, larg) => {
            const linhas = []; let linha = '';
            texto.split(' ').forEach(p => {
                const t = linha ? linha + ' ' + p : p;
                if (g.measureText(t).width > larg && linha) { linhas.push(linha); linha = p; } else linha = t;
            });
            if (linha) linhas.push(linha);
            return linhas;
        };
        // fundo com pontinhos, como o site
        g.fillStyle = '#f4f4f2'; g.fillRect(0, 0, L, L);
        g.fillStyle = '#d9d9d6';
        for (let y = 11; y < L; y += 22) for (let x = 11; x < L; x += 22) { g.beginPath(); g.arc(x, y, 1.6, 0, 7); g.fill(); }
        caixa(60, 60, L - 120, L - 120, 44, '#ffffff');
        // faixa de título
        g.fillStyle = verde; g.font = '800 30px Sniglet, sans-serif'; g.textBaseline = 'alphabetic';
        g.fillText('QUIZ PARA PROFESSORES', 120, 150);
        g.fillStyle = tinta; g.font = '800 58px Sniglet, sans-serif';
        g.fillText('Pensamento', 120, 222);
        g.fillText('computacional', 120, 286);
        // nota
        g.beginPath(); g.arc(L - 250, 230, 120, 0, Math.PI * 2);
        g.fillStyle = amarelo; g.fill(); g.lineWidth = 4; g.strokeStyle = tinta; g.stroke();
        g.fillStyle = tinta; g.textAlign = 'center';
        g.font = '800 92px Sniglet, sans-serif'; g.fillText(String(nota), L - 250, 250);
        g.font = '400 28px Lexend, sans-serif'; g.fillText(`de ${total} acertos`, L - 250, 296);
        g.textAlign = 'left';
        // nível
        g.fillStyle = '#4a4a4a'; g.font = '400 30px Lexend, sans-serif'; g.fillText('Meu nível', 120, 410);
        g.fillStyle = tinta; g.font = '800 54px Sniglet, sans-serif';
        let y = 474;
        quebrar(nivel.nome, L - 240).forEach(l => { g.fillText(l, 120, y); y += 64; });
        // ponto forte
        y += 16;
        const forte = fortes.length === 0 ? 'Os quatro pilares em construção'
            : fortes.length === 4 ? `Os quatro pilares equilibrados (${max} de 3)`
            : (fortes.length === 1 ? 'Ponto forte: ' : 'Pontos fortes: ') + juntar(fortes);
        g.font = '600 32px Lexend, sans-serif';
        const linhasForte = quebrar(forte, L - 320);
        const hForte = 40 + linhasForte.length * 44;
        caixa(120, y, L - 240, hForte, 28, verdeClaro);
        g.fillStyle = tinta;
        linhasForte.forEach((l, i) => g.fillText(l, 160, y + 62 + i * 44));
        y += hForte + 56;
        // pilares
        g.font = '400 28px Lexend, sans-serif'; g.fillStyle = '#4a4a4a';
        quebrar(`${total} perguntas sobre decomposição, reconhecimento de padrões, abstração e algoritmos.`, L - 240).forEach(l => { g.fillText(l, 120, y); y += 40; });
        // rodapé
        caixa(120, L - 250, L - 240, 120, 28, amareloClaro);
        g.fillStyle = tinta; g.font = '600 26px Lexend, sans-serif';
        g.fillText('Faça o seu: ohtopico.com.br/quiz-pensamento-computacional', 150, L - 198, L - 300);
        g.font = '400 26px Lexend, sans-serif'; g.fillStyle = '#4a4a4a';
        g.fillText('Por Júlia Roberta Quoos Alves', 150, L - 156);
        return c.toDataURL('image/png');
    }
})();
