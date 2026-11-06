/* Mundo da turma: quando o aluno entrou pela turma (/mundo/entrar/), o progresso vai para o banco
   a cada pouco tempo e quando a aba fecha. Sem turma, nada muda: o Mundo salva só no navegador.
   Também manda um sinal leve a cada 20 s para o painel "Aula ao vivo" da professora. */
(function () {
  const T = window.MUNDO_TURMA, D = window.MUNDO_DEBUG;
  if (!T || !D || !T.configurado() || !T.aluno.sessao()) return;
  const s = T.aluno.sessao();
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const barra = document.createElement('div');
  barra.id = 'barra-turma';
  barra.setAttribute('role', 'status');
  barra.style.cssText = 'position:fixed;right:12px;top:112px;z-index:9000;display:flex;gap:10px;align-items:center;' +
    'background:#fff;color:#222;border:1.5px solid #222;border-radius:999px;padding:6px 8px 6px 14px;font:14px Lexend,Arial,sans-serif;box-shadow:3px 3px 0 #222;max-width:calc(100vw - 24px)';
  barra.innerHTML = `<span><b>${esc(s.apelido)}</b> · ${esc(s.turma || 'turma')} · <span id="bt-estado">salvando na turma</span></span>
    <button type="button" id="bt-sair" style="border:1.5px solid #222;border-radius:999px;background:#fff;padding:4px 12px;font:inherit;cursor:pointer">Sair da turma</button>`;
  document.body.appendChild(barra);
  const estado = t => { const el = document.getElementById('bt-estado'); if (el) el.textContent = t; };

  let ultimo = '', salvando = null;
  async function enviar(forcar) {
    if (salvando) return salvando;
    salvando = (async () => {
      try {
        const codigo = await D.codigoSalvamento();
        if (!forcar && codigo === ultimo) return true;
        const st = D.S();
        const ok = await T.aluno.salvar(codigo, st.pontos | 0, st.acertos | 0);
        if (ok === false) { estado('a sessão venceu, entre de novo'); return false; }
        ultimo = codigo;
        estado('salvo às ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        return true;
      } catch (e) { estado('sem conexão, tento de novo'); return false; }
      finally { salvando = null; }
    })();
    return salvando;
  }
  setTimeout(() => enviar(true), 4000);
  setInterval(() => enviar(false), 90000);

  /* Aula ao vivo: a cada 20 s, com a aba aberta, avisa o painel da professora onde o aluno está e quantos pontos tem.
     É um aviso pequeno (uma linha de texto), o salvamento completo continua a cada 90 s. */
  const semEmoji = t => String(t || '').replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\uFE0F\u200D]/gu, '').replace(/\s+/g, ' ').trim();
  function fazendo() {
    try {
      const f = D.atual && D.atual(), sl = D.sala && D.sala(), vi = D.visita && D.visita();
      let lugar = f ? f.nome : '';
      if (sl && D.SALAS && D.SALAS[sl]) lugar = D.SALAS[sl].nome || lugar;
      else if (vi) lugar = 'Casa de ' + (vi.nome || 'um vizinho');
      else if (D.dentro && D.dentro()) lugar = 'Na própria casa';
      let ativ = '';
      const j = document.querySelector('.janela:not([hidden])');
      if (j) {
        if (j.id === 'j-jogo') ativ = 'jogando ' + semEmoji((document.getElementById('jm-t') || {}).textContent);
        else { const h = j.querySelector('h2, strong'); ativ = semEmoji(h && h.textContent); }
      }
      return (semEmoji(lugar) + (ativ ? ' · ' + ativ : '')).slice(0, 120);
    } catch (e) { return ''; }
  }
  let pingando = false;
  async function ping(ativo) {
    if (pingando) return; pingando = true;
    try { const st = D.S(); const ok = await T.aluno.ping(ativo ? fazendo() : '', st.pontos | 0, st.acertos | 0, ativo); if (ok === false) estado('a sessão venceu, entre de novo'); }
    catch (e) {} finally { pingando = false; }
  }
  setTimeout(() => ping(true), 2500);
  setInterval(() => { if (!document.hidden) ping(true); }, 20000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { enviar(false); ping(false); } else ping(true);
  });

  document.getElementById('bt-sair').addEventListener('click', async ev => {
    ev.target.disabled = true; estado('salvando antes de sair');
    const ok = await enviar(true);
    if (!ok && !confirm('Não consegui salvar agora (sem conexão?). Sair mesmo assim? O que você fez desde o último salvamento se perde.')) { ev.target.disabled = false; return; }
    D.travaSalvar();   // nada mais grava neste navegador: o próximo colega começa do zero
    await T.aluno.sair();
    ['mundo-site-v1', 'md-progresso-v1'].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    location.href = '/mundo/entrar/';
  });
})();
