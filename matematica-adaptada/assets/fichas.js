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
