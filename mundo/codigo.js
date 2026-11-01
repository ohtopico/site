/* Código secreto do menu do Mundo: o código ENEM faz a Ilha ENEM aparecer no Mundo, ao sul da Sala da Matemática.
   O código não fica no fonte: enem.js compara o SHA-256 do que foi digitado. */
(function () {
  const f = document.getElementById('codigo-form');
  if (!f || !window.ENEM) return;
  const txt = document.getElementById('codigo-txt'), fb = document.getElementById('codigo-fb');
  // as teclas digitadas no campo não podem mover o personagem
  txt.addEventListener('keydown', e => e.stopPropagation());
  f.addEventListener('submit', async e => {
    e.preventDefault();
    if (await ENEM.tentar(txt.value)) {
      // a ilha entra no mapa quando o Mundo é carregado de novo; o ?ilha leva o jogador direto para lá
      fb.textContent = '🏝️ Código aceito! Uma ilha surgiu no mar ao sul da Sala da Matemática. Indo para lá…';
      setTimeout(() => { location.href = './?ilha'; }, 1200);
    } else {
      fb.textContent = 'Esse código não abre nada… ainda.';
      txt.select();
    }
  });
})();
