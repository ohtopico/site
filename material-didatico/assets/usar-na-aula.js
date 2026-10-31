/* Botão "Usar na minha aula" dos jogos e recursos 3D: código para incorporar no Google Sites e link para o
   Google Classroom. Liberado para apoiadores do Catarse a partir do plano NIVEL, com a senha do mês da área
   premium. A senha é conferida aqui mesmo: o script lê os chaveiros cifrados do portão de /premium/ (gerado por
   _fonte/premium/proteger.py), então continua funcionando quando as senhas e as chaves mudam. */
(function () {
  if (window.__usarNaAula) return;
  window.__usarNaAula = true;
  const NIVEL = 4; // Educador maker: o plano dos jogos em HTML
  const CHAVE = 'ohtopico:premium', LEMBRA = 'ohtopico:premium-aula';
  const PLANOS_URL = 'https://www.catarse.com.br/ohtopico/plans';
  let PLANOS = { 1: 'Apoiador entusiasta', 2: 'Educador na prática', 3: 'Educador criativo', 4: 'Educador maker', 5: 'Comunidade & mentoria' };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const bin = b => Uint8Array.from(atob(b), c => c.charCodeAt(0));
  const hoje = new Date(), MES_ATUAL = hoje.getFullYear() + '-' + String(hoje.getMonth() + 1).padStart(2, '0');

  // acesso guardado: o chaveiro da sessão (o mesmo da área premium) ou o plano e o mês lembrados neste navegador
  function acesso() {
    const ler = (st, k) => { try { return JSON.parse(st.getItem(k)); } catch (e) { return null; } };
    const a = ler(sessionStorage, CHAVE) || ler(localStorage, LEMBRA);
    return a && a.nivel && a.mes ? { nivel: +a.nivel, mes: a.mes } : null;
  }
  // a senha de um mês vale até o fim daquele mês: quem cancelou o apoio não recebe a do mês seguinte
  const valido = a => a && a.mes >= MES_ATUAL;

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

  function enderecoDoJogo() {
    const c = document.querySelector('link[rel="canonical"]');
    return c ? c.href : location.href.split('#')[0];
  }
  function tituloDoJogo() {
    const h = document.querySelector('#game-head h1');
    return h ? h.textContent.trim() : document.title.split('|')[0].trim();
  }

  let caixa;
  function abrir() {
    if (!caixa) {
      caixa = document.createElement('dialog');
      caixa.className = 'usar-aula';
      caixa.setAttribute('aria-labelledby', 'usar-aula-t');
      document.body.appendChild(caixa);
      caixa.addEventListener('click', e => {
        if (e.target === caixa || e.target.closest('[data-fechar]')) caixa.close();
        const cp = e.target.closest('[data-copiar]');
        if (cp) copiar(cp);
      });
    }
    desenhar();
    caixa.showModal();
  }

  function desenhar(aviso) {
    const a = acesso();
    if (valido(a) && a.nivel >= NIVEL) return liberado();
    const plano = esc(PLANOS[NIVEL]);
    caixa.innerHTML = `
      <button class="usar-aula-x" type="button" data-fechar aria-label="Fechar">×</button>
      <h2 id="usar-aula-t">Usar na minha aula</h2>
      <p class="muted">Coloque este jogo no site da sua turma (Google Sites) ou mande para os alunos pelo Google Classroom. É um recurso para apoiadores do Catarse do plano <b>${plano}</b> ou acima.</p>
      ${aviso ? `<p class="usar-aula-aviso">${aviso}</p>` : ''}
      <form id="usar-aula-f">
        <label for="usar-aula-s">Senha do mês da área premium</label>
        <input id="usar-aula-s" type="password" autocomplete="current-password" required>
        <button class="btn" type="submit">Liberar</button>
        <p class="feedback" id="usar-aula-fb" role="status"></p>
      </form>
      <p class="small muted">Ainda não apoia ou quer mudar de plano? <a href="${PLANOS_URL}" rel="noopener" target="_blank">Veja os planos no Catarse</a>.</p>`;
    caixa.querySelector('form').onsubmit = async e => {
      e.preventDefault();
      const fb = caixa.querySelector('#usar-aula-fb');
      fb.textContent = 'Conferindo…'; fb.className = 'feedback';
      let ch;
      try { ch = await conferir(caixa.querySelector('#usar-aula-s').value); }
      catch (err) { fb.textContent = 'Não foi possível conferir agora. Verifique a internet e tente de novo.'; fb.className = 'feedback bad'; return; }
      if (!ch) { fb.textContent = 'Senha incorreta. Confira a mensagem mais recente do Catarse: as senhas mudam todo mês.'; fb.className = 'feedback bad'; return; }
      try { sessionStorage.setItem(CHAVE, JSON.stringify(ch)); } catch (err) {}
      try { localStorage.setItem(LEMBRA, JSON.stringify({ nivel: ch.nivel, mes: ch.mes })); } catch (err) {}
      if (!valido(ch)) return desenhar('Esta senha é de um mês que já passou. Use a senha que chegou no Catarse neste mês.');
      if (ch.nivel < NIVEL) return desenhar(`Seu plano é <b>${esc(PLANOS[ch.nivel])}</b>. O “Usar na minha aula” é do plano <b>${plano}</b> ou acima.`);
      liberado();
    };
    setTimeout(() => { const s = caixa.querySelector('#usar-aula-s'); if (s) s.focus(); }, 0);
  }

  function liberado() {
    const url = enderecoDoJogo(), titulo = tituloDoJogo();
    const codigo = `<iframe src="${url}" title="${esc(titulo)}" width="100%" height="720" style="border:0" allow="fullscreen; autoplay" allowfullscreen loading="lazy"></iframe>`;
    const classroom = 'https://classroom.google.com/share?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(titulo);
    caixa.innerHTML = `
      <button class="usar-aula-x" type="button" data-fechar aria-label="Fechar">×</button>
      <h2 id="usar-aula-t">Usar na minha aula</h2>
      <p class="muted"><b>${esc(titulo)}</b> pronto para a sua turma. Os alunos jogam sem cadastro e sem precisar da senha.</p>
      <h3>Google Sites</h3>
      <ol class="small">
        <li>Copie o código abaixo.</li>
        <li>No Google Sites, clique em <b>Inserir</b> › <b>Incorporar</b> › <b>Incorporar código</b> e cole.</li>
        <li>Aumente a caixa até o jogo aparecer inteiro e publique o site.</li>
      </ol>
      <textarea id="usar-aula-cod" readonly rows="4" aria-label="Código para incorporar">${esc(codigo)}</textarea>
      <div class="btn-row"><button class="btn" type="button" data-copiar="usar-aula-cod">Copiar código</button></div>
      <h3>Google Classroom</h3>
      <p class="small muted">Crie um material ou uma atividade com o link do jogo, para a turma abrir em um clique.</p>
      <input id="usar-aula-url" type="text" readonly value="${esc(url)}" aria-label="Link do jogo">
      <div class="btn-row">
        <a class="btn" href="${classroom}" target="_blank" rel="noopener">Compartilhar no Classroom</a>
        <button class="btn ghost" type="button" data-copiar="usar-aula-url">Copiar link</button>
      </div>
      <p class="small muted">Liberado pelo seu plano do Catarse até o fim do mês da sua senha.</p>`;
  }

  function copiar(botao) {
    const campo = document.getElementById(botao.dataset.copiar);
    const ok = () => { const t = botao.textContent; botao.textContent = 'Copiado!'; setTimeout(() => { botao.textContent = t; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(campo.value).then(ok, () => { campo.select(); document.execCommand('copy'); ok(); });
    else { campo.select(); document.execCommand('copy'); ok(); }
  }

  document.addEventListener('click', e => {
    if (e.target.closest('[data-usar-aula]')) { e.preventDefault(); abrir(); }
  });
})();
