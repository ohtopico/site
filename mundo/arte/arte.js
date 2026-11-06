/* Vila da Arte: área secreta do Mundo, liberada pelo código ARTE no menu 🔑 Código secreto.
   Guarda só neste aparelho que a vila foi liberada. O código não fica no fonte: comparamos o SHA-256. */
(function () {
  try {
    const t = localStorage.getItem('iapraprof:theme') || localStorage.getItem('theme');
    const salvo = t ? (t.startsWith('"') ? JSON.parse(t) : t) : null;
    if (salvo === 'dark' || salvo === 'light') document.documentElement.dataset.theme = salvo;
  } catch (e) {}
  // aberta dentro do Mundo (a casa abre a página numa janela por cima): sem o topo, o rodapé e o botão de voltar
  try { if (window.self !== window.top) document.documentElement.classList.add('no-mundo'); } catch (e) { document.documentElement.classList.add('no-mundo'); }

  const CHAVE = 'ohtopico:arte';
  const HASH = '3dadc071acafcfc090547e10c5da7b12ca0f5095a1c6d7882743b068f1288cdd';
  const ler = () => { try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { return {}; } };
  const normaliza = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]/gi, '').toUpperCase();
  async function hash(txt) {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(txt));
    return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  window.ARTE = {
    liberado: () => !!ler().lib,
    async tentar(codigo) {
      const ok = window.crypto && crypto.subtle ? await hash(normaliza(codigo)) === HASH : normaliza(codigo) === ['A', 'R', 'T', 'E'].join('');
      if (ok) this.liberar();
      return ok;
    },
    liberar() { const m = ler(); m.lib = true; try { localStorage.setItem(CHAVE, JSON.stringify(m)); } catch (e) {} return true; },
    /* página da vila: sem o código, volta para o Mundo */
    exigir() { if (!ler().lib) location.replace('../'); },
    /* rodada de perguntas na página: qs = [{ enun (html), alts, certa, coment }]; ao final, de 1 a 3 estrelas */
    quiz(palco, gerar, titulo) {
      let qs = gerar(), i = 0, acertos = 0;
      const L = 'ABCD';
      const tela = () => {
        if (i >= qs.length) {
          const est = acertos === qs.length ? 3 : acertos >= qs.length * 0.6 ? 2 : 1;
          palco.innerHTML = `<div class="fim"><p class="muted">${ARTE.esc(titulo)}</p><div class="grande">${acertos}/${qs.length}</div>` +
            `<span class="estrelas" aria-label="${est} de 3 estrelas">${[0, 1, 2].map(k => `<span class="${k < est ? 'on' : 'off'}">★</span>`).join('')}</span>` +
            `<p>${est === 3 ? 'Tudo certo!' : 'Que tal mais uma rodada? As perguntas mudam.'}</p><button type="button" class="hb" id="q-de-novo">Jogar de novo</button></div>`;
          palco.querySelector('#q-de-novo').addEventListener('click', () => { qs = gerar(); i = 0; acertos = 0; tela(); });
          return;
        }
        let q = qs[i];
        // com mais de duas alternativas, a ordem muda a cada vez (com duas, "Som 1" e "Som 2" ficam na ordem)
        if (q.alts.length > 2) { const ord = ARTE.embaralha(q.alts.map((_, k) => k)); q = Object.assign({}, q, { alts: ord.map(k => q.alts[k]), certa: ord.indexOf(q.certa) }); }
        palco.innerHTML = `<div class="barra" aria-hidden="true"><i style="width:${i / qs.length * 100}%"></i></div><p class="muted small">Pergunta ${i + 1} de ${qs.length}</p>` +
          `<div class="q-enun">${q.enun}</div><div class="alts">${q.alts.map((a, k) => `<button type="button" class="alt" data-k="${k}"><span class="letra">${L[k]}</span><span>${a}</span></button>`).join('')}</div><div id="q-corr"></div>`;
        palco.querySelectorAll('.alt').forEach(b => b.addEventListener('click', () => {
          const k = +b.dataset.k, ok = k === q.certa;
          if (ok) acertos++;
          palco.querySelectorAll('.alt').forEach((c, j) => { c.disabled = true; if (j === q.certa) c.classList.add('certa'); else if (j === k) c.classList.add('errada'); });
          const c = palco.querySelector('#q-corr');
          c.innerHTML = `<div class="corr ${ok ? 'ok' : 'bad'}" role="status"><b>${ok ? 'Isso mesmo!' : 'Não foi dessa vez.'}</b> ${q.coment || ''}</div><div class="acoes"><button type="button" class="hb" id="q-prox">${i + 1 < qs.length ? 'Próxima' : 'Ver resultado'}</button></div>`;
          c.querySelector('#q-prox').addEventListener('click', () => { i++; tela(); });
          c.querySelector('#q-prox').focus();
        }));
      };
      tela();
    },
    embaralha(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
    esc: s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  };
})();
