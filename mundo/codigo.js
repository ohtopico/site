/* Código secreto do menu do Mundo: cada código faz aparecer uma parte escondida do Mundo.
   ENEM abre a Ilha ENEM (ao sul da Sala da Matemática); ARTE abre a Vila da Arte (a leste da Escola dos Professores).
   Os códigos não ficam no fonte: enem.js e arte/arte.js comparam o SHA-256 do que foi digitado. */
(function () {
  const f = document.getElementById('codigo-form');
  if (!f) return;
  const txt = document.getElementById('codigo-txt'), fb = document.getElementById('codigo-fb');
  const SEGREDOS = [
    [window.ENEM, '🏝️ Código aceito! Uma ilha surgiu no mar ao sul da Sala da Matemática. Indo para lá…', './?ilha'],
    [window.ARTE, '🎨 Código aceito! A Vila da Arte apareceu a leste da Escola dos Professores. Indo para lá…', './?arte']
  ].filter(s => s[0]);
  // as teclas digitadas no campo não podem mover o personagem
  txt.addEventListener('keydown', e => e.stopPropagation());
  f.addEventListener('submit', async e => {
    e.preventDefault();
    for (const [seg, msg, url] of SEGREDOS) {
      if (await seg.tentar(txt.value)) {
        // a área entra no mapa quando o Mundo é carregado de novo; o parâmetro leva o jogador direto para lá
        fb.textContent = msg;
        setTimeout(() => { location.href = url; }, 1200);
        return;
      }
    }
    fb.textContent = 'Esse código não abre nada… ainda.';
    txt.select();
  });
})();
