/* Fichas de matemática adaptada: encaixa as folhas A4 na largura da tela e imprime só a versão escolhida. */
(function () {
    const folhas = Array.from(document.querySelectorAll('.folha'));
    const largura = 210 * 96 / 25.4;

    function encaixar() {
        const caixa = document.querySelector('.folhas');
        if (!caixa) return;
        const z = Math.min(1, (caixa.clientWidth - 4) / largura);
        folhas.forEach(f => { f.style.zoom = z < 1 ? z.toFixed(3) : ''; });
    }
    encaixar();
    window.addEventListener('resize', encaixar);

    document.querySelectorAll('[data-imprimir]').forEach(botao => {
        botao.addEventListener('click', () => {
            const versao = botao.dataset.imprimir;
            folhas.forEach(f => f.classList.toggle('nao-imprimir', f.dataset.versao !== versao));
            window.print();
        });
    });
    window.addEventListener('afterprint', () => folhas.forEach(f => f.classList.remove('nao-imprimir')));
})();

/* Tema favorito do aluno: troca as figuras de contar e os nomes delas. Os números e o gabarito não mudam. */
(function () {
    const folhas = Array.from(document.querySelectorAll('.folha'));
    const acoes = document.querySelector('.acoes');
    if (!folhas.length || !acoes) return;

    const ORIGINAIS = ['maçãs', 'maçã', 'estrelas', 'estrela', 'bolas', 'bola', 'flores', 'flor', 'bananas', 'banana', 'peixes', 'peixe'];
    const busca = new RegExp('(^|[^\\p{L}])(' + ORIGINAIS.join('|') + ')(?![\\p{L}])', 'giu');
    const temFiguras = !!document.querySelector('.folha [data-fig]');
    const textos = [];
    const rotulos = [];
    folhas.forEach(folha => {
        const andar = document.createTreeWalker(folha, NodeFilter.SHOW_TEXT);
        let no;
        while ((no = andar.nextNode())) {
            busca.lastIndex = 0;
            if (busca.test(no.nodeValue)) textos.push({ no, original: no.nodeValue });
        }
        folha.querySelectorAll('[aria-label]').forEach(el => {
            const original = el.getAttribute('aria-label');
            busca.lastIndex = 0;
            if (busca.test(original)) rotulos.push({ el, original });
        });
    });
    const figuras = Array.from(document.querySelectorAll('.folha [data-fig]')).map(el => ({ el, original: el.innerHTML }));
    if (!temFiguras && !textos.length) return;

    function trocar(texto, palavras) {
        return texto.replace(busca, (tudo, antes, palavra) => {
            const nova = palavras[palavra.toLowerCase()];
            if (!nova) return tudo;
            const maiuscula = palavra[0] !== palavra[0].toLowerCase();
            return antes + (maiuscula ? nova[0].toUpperCase() + nova.slice(1) : nova);
        });
    }

    function aplicar(chave) {
        const tema = (window.FICHAS_TEMAS || []).find(t => t.chave === chave);
        figuras.forEach(({ el, original }) => {
            const novo = tema && tema.desenhos[el.dataset.fig];
            el.innerHTML = novo || original;
        });
        textos.forEach(({ no, original }) => { no.nodeValue = tema ? trocar(original, tema.palavras) : original; });
        rotulos.forEach(({ el, original }) => el.setAttribute('aria-label', tema ? trocar(original, tema.palavras) : original));
        try { localStorage.setItem('fichas-tema', tema ? chave : ''); } catch (e) { /* sem armazenamento */ }
    }

    function montar() {
        const temas = window.FICHAS_TEMAS || [];
        const caixa = document.createElement('div');
        caixa.className = 'tema-favorito';
        const id = 'tema-favorito';
        caixa.innerHTML = '<label for="' + id + '">Tema favorito do aluno</label><select id="' + id + '"><option value="">Padrão</option>' +
            temas.map(t => '<option value="' + t.chave + '">' + t.nome + '</option>').join('') + '</select>' +
            '<span>Troca as figuras e os nomes delas. Os números e o gabarito continuam iguais. O PDF sai no tema padrão: para imprimir no tema, use os botões de imprimir.</span>';
        acoes.insertAdjacentElement('afterend', caixa);
        const select = caixa.querySelector('select');
        let inicial = new URLSearchParams(location.search).get('tema') || '';
        if (!inicial) { try { inicial = localStorage.getItem('fichas-tema') || ''; } catch (e) { /* sem armazenamento */ } }
        if (temas.some(t => t.chave === inicial)) { select.value = inicial; aplicar(inicial); }
        select.addEventListener('change', () => aplicar(select.value));
    }

    const script = document.createElement('script');
    script.src = '/matematica-adaptada/assets/temas.js?v=__TEMAS_V__';
    script.onload = montar;
    document.head.appendChild(script);
})();
