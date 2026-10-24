// Blog do ohtopico: barra do navegador, menu Iniciar, relógio, tema, contador e "copiar prompt"
(function () {
    const raiz = document.documentElement;
    const emoldurado = raiz.classList.contains('emoldurado');

    // Voltar: usa o histórico quando houver; senão segue o link
    const voltar = document.querySelector('[data-voltar]');
    if (voltar && history.length > 1) {
        voltar.addEventListener('click', e => { e.preventDefault(); history.back(); });
    }

    // Dentro da janela Busca do site, acompanha o tema escolhido lá
    if (emoldurado) {
        window.addEventListener('message', e => {
            if (e.origin === location.origin && e.data && e.data.tipo === 'tema') raiz.dataset.theme = e.data.tema;
        });
    }

    // Tema claro/escuro (o mesmo do site e do IA pra Prof)
    const temaBtn = document.getElementById('tema-btn');
    if (temaBtn) temaBtn.addEventListener('click', () => {
        const escuro = raiz.dataset.theme === 'dark' ||
            (!raiz.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
        const proximo = escuro ? 'light' : 'dark';
        raiz.dataset.theme = proximo;
        try { localStorage.setItem('iapraprof:theme', JSON.stringify(proximo)); } catch (e) {}
    });

    // Menu Iniciar
    const menu = document.getElementById('start-menu');
    const iniciar = document.querySelector('.start-btn');
    function abrirMenu(aberto, focar = true) {
        if (!menu || !iniciar) return;
        menu.hidden = !aberto;
        iniciar.setAttribute('aria-expanded', String(aberto));
        if (aberto && focar) menu.querySelector('.menu-item').focus();
    }
    if (iniciar) iniciar.addEventListener('click', () => abrirMenu(menu.hidden));
    document.addEventListener('click', e => {
        if (menu && !menu.hidden && !menu.contains(e.target) && !e.target.closest('.start-btn')) abrirMenu(false, false);
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu && !menu.hidden) { abrirMenu(false); iniciar.focus(); }
    });

    // Relógio da barra de tarefas
    const relogio = document.getElementById('relogio');
    function hora() {
        if (relogio) relogio.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    hora();
    setInterval(hora, 30000);

    // Contador de visitas (GoatCounter: sem cookies e sem dados pessoais)
    const codigo = document.body.dataset.contador;
    const numero = document.querySelector('[data-numero]');
    function mostrar(n) {
        if (!numero) return;
        const txt = String(n).padStart(6, '0');
        numero.innerHTML = [...txt].map(d => `<span class="digito">${d}</span>`).join('');
    }
    if (codigo && numero) {
        fetch(`https://${codigo}.goatcounter.com/counter/TOTAL.json`)
            .then(r => r.ok ? r.json() : Promise.reject(r.status))
            .then(d => mostrar(String(d.count).replace(/\D/g, '') || '0'))
            .catch(() => {});
    }

    // Botão de copiar embaixo de cada prompt
    document.querySelectorAll('.artigo pre').forEach(pre => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn98 copiar';
        b.setAttribute('aria-live', 'polite');
        b.textContent = 'Copiar prompt';
        b.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(pre.textContent);
                b.textContent = 'Copiado!';
            } catch (err) {
                b.textContent = 'Selecione e copie (Ctrl+C)';
            }
            setTimeout(() => { b.textContent = 'Copiar prompt'; }, 2500);
        });
        pre.after(b);
    });
})();
