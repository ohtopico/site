// Blog do ohtopico: botões da barra do navegador e "copiar prompt"
(function () {
    const emoldurado = document.documentElement.classList.contains('emoldurado');

    // Voltar: dentro da janela Busca usa o histórico; aberto direto, segue o link
    const voltar = document.querySelector('[data-voltar]');
    if (voltar && history.length > 1) {
        voltar.addEventListener('click', e => { e.preventDefault(); history.back(); });
    }

    // Dentro da janela Busca, "Busca" volta para o navegador em vez da área de trabalho
    if (emoldurado) {
        document.querySelectorAll('[data-busca]').forEach(a => { a.href = '/navegador.html'; });
        window.addEventListener('message', e => {
            if (e.origin === location.origin && e.data && e.data.tipo === 'tema') document.documentElement.dataset.theme = e.data.tema;
        });
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
