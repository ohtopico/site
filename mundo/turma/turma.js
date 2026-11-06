/* Página da professora: entrar, criar turmas, cadastrar alunos e imprimir os logins. */
(function () {
  const T = window.MUNDO_TURMA, $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const telas = ['sem-config', 'tela-entrar', 'tela-nova-senha', 'tela-espera', 'tela-painel'];
  const mostra = id => telas.forEach(t => { $('#' + t).hidden = t !== id; });
  const senhasNovas = {};   // senhas geradas agora (só aparecem uma vez): { alunoApelido@turma: senha }
  const traduz = e => {
    const m = String(e && e.message || e);
    if (/Invalid login credentials/i.test(m)) return 'E-mail ou senha não conferem.';
    if (/Email not confirmed/i.test(m)) return 'Confirme o e-mail primeiro: o link está na sua caixa de entrada.';
    if (/already registered|already exists/i.test(m)) return 'Esse e-mail já tem conta. Use "Entrar" ou "Esqueci a senha".';
    if (/Password should be/i.test(m)) return 'A senha precisa ter pelo menos 8 caracteres.';
    if (/rate limit|too many/i.test(m)) return 'Muitas tentativas seguidas. Espere alguns minutos.';
    if (/limite de alunos/.test(m)) return 'A turma chegou ao limite de 60 alunos.';
    if (/limite de turmas/.test(m)) return 'Você chegou ao limite de 40 turmas.';
    if (/nao aprovada/.test(m)) return 'Sua conta ainda não foi liberada.';
    if (/Failed to fetch|NetworkError/i.test(m)) return 'Sem conexão com o servidor. Confira a internet.';
    return 'Não deu certo (' + m + ').';
  };
  const ocupado = async (botao, fn) => { if (botao) botao.disabled = true; try { return await fn(); } finally { if (botao) botao.disabled = false; } };

  async function inicio() {
    if (!T.configurado()) return mostra('sem-config');
    const tipo = T.prof.usaLinkDoEmail(location.hash);
    if (tipo) history.replaceState(null, '', location.pathname);
    if (tipo === 'recovery') return mostra('tela-nova-senha');
    if (!T.prof.sessao()) return mostra('tela-entrar');
    try {
      const eu = await T.prof.eu();
      if (!eu || !eu.aprovado) { $('#esp-email').textContent = (eu && eu.email) || ''; return mostra('tela-espera'); }
      mostra('tela-painel'); await desenhaTurmas();
    } catch (e) {
      if (e.status === 401 || e.status === 403) { await T.prof.sair(); return mostra('tela-entrar'); }
      mostra('tela-entrar'); $('#e-msg').textContent = traduz(e);
    }
  }

  async function desenhaTurmas() {
    const lista = $('#lista-turmas');
    const turmas = await T.prof.turmas();
    if (!turmas.length) { lista.innerHTML = '<p class="muted">Nenhuma turma ainda.</p>'; return; }
    const alunos = await Promise.all(turmas.map(t => T.prof.alunos(t.id)));
    lista.innerHTML = turmas.map((t, i) => `
      <div class="turma" data-turma="${esc(t.id)}">
        <div class="linha" style="justify-content: space-between">
          <h2 style="margin:0">${esc(t.nome)}</h2>
          <span>Código da turma: <span class="codigo">${esc(t.codigo)}</span></span>
        </div>
        <form class="linha" data-novo style="margin-top:10px">
          <label class="sr-only" for="ap-${i}">Apelidos dos alunos</label>
          <input class="campo" id="ap-${i}" placeholder="Apelidos, separados por vírgula (ex.: Bia, Leo, Davi)" required>
          <button class="bt peq" type="submit">Cadastrar</button>
        </form>
        ${alunos[i].length ? `<table><thead><tr><th>Apelido</th><th>Senha</th><th>Pontos</th><th>Acertos</th><th>Última vez</th><th></th></tr></thead><tbody>
          ${alunos[i].map(a => {
            const s = senhasNovas[a.apelido.toLowerCase() + '@' + t.id];
            return `<tr><td>${esc(a.apelido)}</td>
              <td>${s ? `<span class="codigo" style="font-size:16px">${esc(s)}</span>` : '<span class="muted small">guardada</span>'}</td>
              <td>${a.pontos}</td><td>${a.acertos}</td>
              <td class="small">${a.atualizado ? new Date(a.atualizado).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '<span class="muted">ainda não jogou</span>'}</td>
              <td class="linha"><button class="bt claro peq" type="button" data-trocar="${esc(a.apelido)}">Nova senha</button>
                <button class="bt perigo peq" type="button" data-apagar="${esc(a.id)}" data-nome="${esc(a.apelido)}">Apagar</button></td></tr>`;
          }).join('')}</tbody></table>` : '<p class="muted small">Nenhum aluno cadastrado.</p>'}
        <div class="linha">
          <button class="bt claro peq" type="button" data-imprimir>Imprimir os logins com senha nova</button>
          <button class="bt perigo peq" type="button" data-apagar-turma>Apagar a turma</button>
        </div>
      </div>`).join('');
    lista.querySelectorAll('.turma').forEach((el, i) => {
      const t = turmas[i];
      el.querySelector('[data-novo]').addEventListener('submit', async ev => {
        ev.preventDefault();
        const campo = ev.target.querySelector('input'), nomes = [...new Set(campo.value.split(/[,;\n]/).map(s => s.trim()).filter(Boolean))];
        await ocupado(ev.target.querySelector('button'), async () => {
          try { for (const n of nomes) senhasNovas[n.slice(0, 30).toLowerCase() + '@' + t.id] = await T.prof.senhaAluno(t.id, n); campo.value = ''; $('#p-msg').textContent = ''; }
          catch (e) { $('#p-msg').textContent = traduz(e); }
          await desenhaTurmas();
        });
      });
      el.querySelectorAll('[data-trocar]').forEach(b => b.addEventListener('click', async () => {
        if (!confirm(`Criar uma senha nova para ${b.dataset.trocar}? A senha antiga deixa de funcionar.`)) return;
        await ocupado(b, async () => {
          try { senhasNovas[b.dataset.trocar.toLowerCase() + '@' + t.id] = await T.prof.senhaAluno(t.id, b.dataset.trocar); } catch (e) { $('#p-msg').textContent = traduz(e); }
          await desenhaTurmas();
        });
      }));
      el.querySelectorAll('[data-apagar]').forEach(b => b.addEventListener('click', async () => {
        if (!confirm(`Apagar ${b.dataset.nome} e todo o progresso salvo? Não dá para desfazer.`)) return;
        await ocupado(b, async () => { try { await T.prof.apagarAluno(b.dataset.apagar); } catch (e) { $('#p-msg').textContent = traduz(e); } await desenhaTurmas(); });
      }));
      el.querySelector('[data-apagar-turma]').addEventListener('click', async ev => {
        if (prompt(`Para apagar a turma ${t.nome} com todos os alunos e o progresso, digite APAGAR`) !== 'APAGAR') return;
        await ocupado(ev.target, async () => { try { await T.prof.apagarTurma(t.id); } catch (e) { $('#p-msg').textContent = traduz(e); } await desenhaTurmas(); });
      });
      el.querySelector('[data-imprimir]').addEventListener('click', () => {
        const comSenha = alunos[i].filter(a => senhasNovas[a.apelido.toLowerCase() + '@' + t.id]);
        if (!comSenha.length) { alert('As senhas só aparecem logo depois de criadas. Cadastre os alunos ou clique em "Nova senha" e depois imprima.'); return; }
        $('#cartoes').innerHTML = comSenha.map(a => `<div class="cartao">Mundo da turma: ${esc(t.nome)}<br>Entre em <b>ohtopico.com.br/mundo/entrar</b><br>
          Código da turma: <b>${esc(t.codigo)}</b><br>Apelido: <b>${esc(a.apelido)}</b><br>Senha: <b>${esc(senhasNovas[a.apelido.toLowerCase() + '@' + t.id])}</b></div>`).join('');
        window.print();
      });
    });
  }

  $('#f-entrar').addEventListener('submit', ev => {
    ev.preventDefault();
    ocupado($('#b-entrar'), async () => {
      try { await T.prof.entrar($('#e-email').value.trim(), $('#e-senha').value); $('#e-msg').textContent = ''; await inicio(); }
      catch (e) { $('#e-msg').textContent = traduz(e); }
    });
  });
  $('#f-turma').addEventListener('submit', ev => {
    ev.preventDefault();
    ocupado(ev.target.querySelector('button'), async () => {
      try { await T.prof.criarTurma($('#t-nome').value.trim()); $('#t-nome').value = ''; $('#p-msg').textContent = ''; await desenhaTurmas(); }
      catch (e) { $('#p-msg').textContent = traduz(e); }
    });
  });
  $('#b-cadastrar').addEventListener('click', () => {
    const f = $('#f-entrar'); if (!f.reportValidity()) return;
    ocupado($('#b-cadastrar'), async () => {
      try {
        const s = await T.prof.cadastrar($('#e-email').value.trim(), $('#e-senha').value);
        if (s) await inicio();
        else { $('#e-msg').className = 'ok'; $('#e-msg').textContent = 'Conta criada. Abra o e-mail que enviamos e clique no link para confirmar.'; }
      } catch (e) { $('#e-msg').className = 'erro'; $('#e-msg').textContent = traduz(e); }
    });
  });
  $('#b-esqueci').addEventListener('click', async ev => {
    ev.preventDefault();
    const email = $('#e-email').value.trim();
    if (!email) { $('#e-msg').textContent = 'Digite o seu e-mail acima e clique de novo em "Esqueci a senha".'; return; }
    try { await T.prof.esqueci(email); $('#e-msg').className = 'ok'; $('#e-msg').textContent = 'Se houver conta com esse e-mail, chega um link para criar uma senha nova.'; }
    catch (e) { $('#e-msg').className = 'erro'; $('#e-msg').textContent = traduz(e); }
  });
  $('#f-nova').addEventListener('submit', async ev => {
    ev.preventDefault();
    try { await T.prof.novaSenha($('#n-senha').value); await inicio(); } catch (e) { $('#n-msg').textContent = traduz(e); }
  });
  document.querySelectorAll('[data-sair]').forEach(b => b.addEventListener('click', async () => { await T.prof.sair(); mostra('tela-entrar'); }));
  inicio();
})();
