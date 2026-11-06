/* Portão de ferramenta premium dentro de uma página aberta (por exemplo, o gerador de avaliação).
   Uso: mdPortaoPremium({ nivel: 3, caixa: '#portao-aval', recurso: 'O gerador de avaliação' }).then(iniciar)
   A senha é conferida como no "Usar na minha aula": o script lê os chaveiros cifrados do portão de /premium/
   (gerado por _fonte/premium/proteger.py) e guarda o acesso no mesmo lugar, então quem já entrou na área
   premium ou já liberou o "Usar na minha aula" neste navegador não precisa digitar a senha de novo. */
(function () {
  const CHAVE = 'ohtopico:premium', LEMBRA = 'ohtopico:premium-aula';
  const PLANOS_URL = 'https://www.catarse.com.br/ohtopico/plans';
  let PLANOS = { 1: 'Apoiador entusiasta', 2: 'Educador na prática', 3: 'Educador criativo', 4: 'Educador maker', 5: 'Comunidade & mentoria' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const bin = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));
  const hoje = new Date(), MES_ATUAL = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0');
  // Júlia (31/10/2026): a senha de cada plano não muda todo mês enquanto o Catarse não passar de R$ 500 por mês.
  const SENHA_FIXA = true;
  const valido = a => a && (SENHA_FIXA || a.mes >= MES_ATUAL);

  function acesso() {
    const ler = (st, k) => { try { return JSON.parse(st.getItem(k)); } catch (e) { return null; } };
    const a = ler(sessionStorage, CHAVE) || ler(localStorage, LEMBRA);
    return a && a.nivel && a.mes ? { nivel: +a.nivel, mes: a.mes } : null;
  }

  async function conferir(senha) {
    const portao = await (await fetch('/premium/', { cache: 'no-cache' })).text();
    const m = portao.match(/const SAL = '([^']+)', ITER = (\d+), NIVEIS = (\[.*?\]), PLANOS = (\{.*?\});/);
    if (!m) throw new Error('portao');
    try { PLANOS = JSON.parse(m[4]); } catch (e) {}
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(senha), 'PBKDF2', false, ['deriveKey']);
    const k = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: bin(m[1]), iterations: +m[2], hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    for (const n of JSON.parse(m[3])) {
      try { return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bin(n.iv) }, k, bin(n.d)))); }
      catch (e) { /* não é o chaveiro desta senha */ }
    }
    return null;
  }

  window.mdPortaoPremium = function ({ nivel, caixa, recurso }) {
    const el = typeof caixa === 'string' ? document.querySelector(caixa) : caixa;
    return new Promise(liberar => {
      const ok = () => { el.hidden = true; document.body.classList.add('premium-liberado'); liberar(); };
      const a = acesso();
      if (valido(a) && a.nivel >= nivel) return ok();
      const desenhar = aviso => {
        const plano = esc(PLANOS[nivel]);
        el.hidden = false;
        el.innerHTML = `
          <h2>Recurso para apoiadores</h2>
          <p class="muted">${esc(recurso)} faz parte da área premium, para quem apoia o projeto no Catarse a partir do plano <b>${plano}</b>. Digite a senha do seu plano, que chegou na mensagem do Catarse.</p>
          ${aviso ? `<p class="portao-premium-aviso">${aviso}</p>` : ''}
          <form>
            <label for="portao-premium-s">Senha da área premium</label>
            <input id="portao-premium-s" type="password" autocomplete="current-password" required>
            <button class="btn" type="submit">Liberar</button>
            <p class="feedback" role="status"></p>
          </form>
          <p class="small muted">Ainda não apoia ou quer mudar de plano? <a href="${PLANOS_URL}" rel="noopener" target="_blank">Veja os planos no Catarse</a>.</p>`;
        el.querySelector('form').onsubmit = async e => {
          e.preventDefault();
          const fb = el.querySelector('.feedback');
          fb.textContent = 'Conferindo…'; fb.className = 'feedback';
          let ch;
          try { ch = await conferir(el.querySelector('#portao-premium-s').value); }
          catch (err) { fb.textContent = 'Não foi possível conferir agora. Verifique a internet e tente de novo.'; fb.className = 'feedback bad'; return; }
          if (!ch) { fb.textContent = 'Senha incorreta. Confira a senha que chegou pelo Catarse.'; fb.className = 'feedback bad'; return; }
          try { sessionStorage.setItem(CHAVE, JSON.stringify(ch)); } catch (err) {}
          try { localStorage.setItem(LEMBRA, JSON.stringify({ nivel: ch.nivel, mes: ch.mes })); } catch (err) {}
          if (!valido(ch)) return desenhar('Esta senha é de um mês que já passou. Use a senha que chegou no Catarse neste mês.');
          if (ch.nivel < nivel) return desenhar(`Seu plano é <b>${esc(PLANOS[ch.nivel])}</b>. ${esc(recurso)} é do plano <b>${plano}</b> ou acima.`);
          ok();
        };
      };
      desenhar();
    });
  };
})();
