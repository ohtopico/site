/* Cartazes de Libras para a parede: filtro por área e ?termos=id1,id2. Imprime só os cartazes visíveis. */
(function () {
    const cartazes = Array.from(document.querySelectorAll('.cartaz'));
    const botoes = Array.from(document.querySelectorAll('[data-area]'));
    const aviso = document.getElementById('escolhidas');
    const contagem = document.getElementById('contagem');
    const params = new URLSearchParams(location.search);
    const escolhidos = (params.get('termos') || '').split(',').map(s => s.trim()).filter(id => id && document.getElementById(id));
    let area = 'todas';

    function aplicar() {
        let n = 0;
        cartazes.forEach(c => {
            const ok = (area === 'todas' || c.dataset.areas.split(' ').includes(area)) && (!escolhidos.length || escolhidos.includes(c.id));
            c.hidden = !ok;
            if (ok) n++;
        });
        contagem.textContent = n + (n === 1 ? ' cartaz na tela (1 folha A4).' : ' cartazes na tela (' + n + ' folhas A4).');
    }

    if (escolhidos.length) {
        aviso.hidden = false;
        aviso.innerHTML = 'Mostrando só as ' + escolhidos.length + ' palavras escolhidas. <a href="' + location.pathname + '">Ver todos os cartazes</a>';
    }
    botoes.forEach(b => b.addEventListener('click', () => {
        area = b.dataset.area;
        botoes.forEach(o => {
            o.classList.toggle('escuro', o === b);
            o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
        });
        aplicar();
    }));
    document.getElementById('imprimir').addEventListener('click', () => window.print());
    aplicar();
})();
