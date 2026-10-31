/* Código secreto do menu do Mundo: o código ENEM abre a Ilha ENEM (mundo/enem/).
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
      fb.textContent = '🏝️ Código aceito! Abrindo a Ilha ENEM…';
      setTimeout(() => { location.href = 'enem/'; }, 700);
    } else {
      fb.textContent = 'Esse código não abre nada… ainda.';
      txt.select();
    }
  });
})();
