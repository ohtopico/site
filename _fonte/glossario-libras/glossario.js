/* Glossário em Libras: filtro por área, busca e ?termos=id1,id2 (vindo das fichas). Imprime só os cartões visíveis. */
(function () {
    const cartoes = Array.from(document.querySelectorAll('.cartao'));
    const grupos = Array.from(document.querySelectorAll('.grupo'));
    const botoes = Array.from(document.querySelectorAll('[data-area]'));
    const busca = document.getElementById('busca');
    const aviso = document.getElementById('escolhidas');
    const params = new URLSearchParams(location.search);
    let escolhidos = (params.get('termos') || '').split(',').map(s => s.trim()).filter(Boolean);
    escolhidos = escolhidos.filter(id => document.getElementById(id));
    let area = 'todas';

    const semAcento = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

    function aplicar() {
        const q = semAcento(busca.value.trim());
        cartoes.forEach(c => {
            const okArea = area === 'todas' || c.dataset.areas.split(' ').includes(area);
            const okBusca = !q || semAcento(c.dataset.busca).includes(q);
            const okLista = !escolhidos.length || escolhidos.includes(c.id);
            c.hidden = !(okArea && okBusca && okLista);
        });
        let primeiro = true;
        grupos.forEach(g => {
            g.hidden = !g.querySelector('.cartao:not([hidden])');
            g.classList.toggle('primeiro', !g.hidden && primeiro);
            if (!g.hidden) primeiro = false;
        });
    }

    if (escolhidos.length) {
        aviso.hidden = false;
        aviso.innerHTML = 'Mostrando só as ' + escolhidos.length + ' palavras da ficha. <a href="' + location.pathname + '">Ver o glossário completo</a>';
        document.getElementById('parede').href = 'parede/?termos=' + escolhidos.join(',');
    }

    botoes.forEach(b => b.addEventListener('click', () => {
        area = b.dataset.area;
        botoes.forEach(o => {
            const ativo = o === b;
            o.classList.toggle('escuro', ativo);
            o.setAttribute('aria-pressed', ativo ? 'true' : 'false');
        });
        aplicar();
    }));
    busca.addEventListener('input', aplicar);
    document.getElementById('imprimir').addEventListener('click', () => window.print());
    aplicar();
})();
