/* Página da professora: entrar, criar turmas, cadastrar alunos e imprimir os logins. */
(function () {
  const T = window.MUNDO_TURMA, $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const telas = ['sem-config', 'tela-entrar', 'tela-nova-senha', 'tela-espera', 'tela-painel', 'tela-aovivo'];
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
  /* mapas do Mundo que a professora pode liberar para a turma (mesmos ids de FASES em mundo/mundo.js). A Vila do Começo e a
     Sala da Matemática já ficam abertas para todos. As áreas secretas aparecem para a turma sem precisar do código. */
  const MAPAS = [
    ['praca', 'Praça dos Números', 'Matemática do 6º ano'],
    ['padroes', 'Bairro dos Padrões', '7º ano'],
    ['redes', 'Cidade das Redes', '8º ano'],
    ['ia', 'Vale da Inteligência', '9º ano'],
    ['lab', 'Laboratório dos Simuladores', 'IA, estatística e arquitetura'],
    ['medio', 'Campus do Ensino Médio', 'Redes, banco de dados e IA'],
    ['escola', 'Escola dos Professores', 'Guias, formação e mentoria'],
    ['enem', 'Ilha ENEM', 'Área secreta: revisão para o ENEM'],
    ['arte', 'Vila da Arte', 'Área secreta: Arte da BNCC, 6º ao 9º ano']
  ];
  function blocoMapas(t, i) {
    if (!Array.isArray(t.mapas)) return '';   // banco ainda sem a coluna "mapas"
    const lib = t.mapas.filter(id => MAPAS.some(m => m[0] === id));
    return `<details class="mapas" data-mapas>
      <summary><b>Mapas liberados para a turma</b> <span class="muted small">${lib.length ? lib.length + ' de ' + MAPAS.length + ' liberados' : 'nenhum: as vilas abrem na ordem das missões'}</span></summary>
      <p class="small muted">Marque os mapas que os alunos desta turma podem visitar desde já, sem cumprir as missões das vilas anteriores. A Vila do Começo e a Sala da Matemática já ficam abertas para todos. Vale só quando o aluno entra pela turma; quem já está jogando vê a mudança em até um minuto.</p>
      <div class="mapas-lista">${MAPAS.map(([id, nome, sub]) => `<label class="mapa-op"><input type="checkbox" value="${id}" ${lib.includes(id) ? 'checked' : ''}> <span><b>${esc(nome)}</b><br><span class="small muted">${esc(sub)}</span></span></label>`).join('')}</div>
      <div class="linha">
        <button class="bt peq" type="button" data-salvar-mapas>Salvar os mapas</button>
        <button class="bt claro peq" type="button" data-todos-mapas>Marcar todos</button>
        <button class="bt claro peq" type="button" data-nenhum-mapa>Desmarcar todos</button>
        <span class="small" id="mp-msg-${i}" role="status"></span>
      </div>
    </details>`;
  }
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
        ${blocoMapas(t, i)}
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
          <button class="bt peq" type="button" data-aovivo>Acompanhar a aula ao vivo</button>
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
      el.querySelector('[data-aovivo]').addEventListener('click', () => aoVivo.abre(t));
      const mp = el.querySelector('[data-mapas]');
      if (mp) {
        const caixas = () => [...mp.querySelectorAll('input[type=checkbox]')], msg = mp.querySelector('[role=status]');
        mp.querySelector('[data-todos-mapas]').addEventListener('click', () => caixas().forEach(c => { c.checked = true; }));
        mp.querySelector('[data-nenhum-mapa]').addEventListener('click', () => caixas().forEach(c => { c.checked = false; }));
        mp.querySelector('[data-salvar-mapas]').addEventListener('click', ev => ocupado(ev.target, async () => {
          try {
            t.mapas = await T.prof.mapasTurma(t.id, caixas().filter(c => c.checked).map(c => c.value)) || [];
            msg.className = 'small ok'; msg.textContent = 'Salvo.';
            const n = t.mapas.filter(id => MAPAS.some(m => m[0] === id)).length;
            mp.querySelector('summary .muted').textContent = n ? n + ' de ' + MAPAS.length + ' liberados' : 'nenhum: as vilas abrem na ordem das missões';
          } catch (e) { msg.className = 'small erro'; msg.textContent = traduz(e); }
        }));
      }
      el.querySelector('[data-imprimir]').addEventListener('click', () => {
        const comSenha = alunos[i].filter(a => senhasNovas[a.apelido.toLowerCase() + '@' + t.id]);
        if (!comSenha.length) { alert('As senhas só aparecem logo depois de criadas. Cadastre os alunos ou clique em "Nova senha" e depois imprima.'); return; }
        $('#cartoes').innerHTML = comSenha.map(a => `<div class="cartao">Mundo da turma: ${esc(t.nome)}<br>Entre em <b>ohtopico.com.br/mundo/entrar</b><br>
          Código da turma: <b>${esc(t.codigo)}</b><br>Apelido: <b>${esc(a.apelido)}</b><br>Senha: <b>${esc(senhasNovas[a.apelido.toLowerCase() + '@' + t.id])}</b></div>`).join('');
        window.print();
      });
    });
  }

  /* ---------- Aula ao vivo: lê os alunos da turma a cada 15 s ---------- */
  const aoVivo = (() => {
    const ONLINE_MS = 60000, PARADO_MS = 5 * 60000, CADA_MS = 15000;
    let turma = null, timer = null, base = {}, ultimaMudanca = {}, ultimoValor = {};
    const chBase = id => 'mundo-turma-aula-' + id;
    const leBase = id => { try { return JSON.parse(sessionStorage.getItem(chBase(id))) || null; } catch (e) { return null; } };
    const gravaBase = (id, b) => { try { sessionStorage.setItem(chBase(id), JSON.stringify(b)); } catch (e) {} };
    const ha = ms => { const s = Math.round(ms / 1000); if (s < 60) return 'há ' + s + ' s'; const m = Math.round(s / 60); return m < 60 ? 'há ' + m + ' min' : 'há ' + Math.round(m / 60) + ' h'; };

    async function atualiza() {
      if (!turma) return;
      let lista;
      try { lista = await T.prof.aoVivo(turma.id); }
      catch (e) {
        if (e.status === 401 || e.status === 403) { para(); await T.prof.sair(); mostra('tela-entrar'); return; }
        $('#av-hora').textContent = e.status === 400 ? 'O painel ao vivo ainda está sendo ativado. Tente de novo mais tarde.' : 'Sem conexão agora, tento de novo em 15 segundos.'; return;
      }
      const agora = Date.now();
      if (!base.alunos) { base = { inicio: agora, alunos: {} }; }
      lista.forEach(a => {
        if (!base.alunos[a.id]) base.alunos[a.id] = { p: a.pontos, c: a.acertos };
        const v = a.pontos + '/' + a.acertos;
        if (ultimoValor[a.id] !== v) { ultimoValor[a.id] = v; ultimaMudanca[a.id] = agora; }
      });
      gravaBase(turma.id, base);
      const com = lista.map(a => {
        const on = a.online_em && agora - new Date(a.online_em).getTime() < ONLINE_MS;
        const parado = on && agora - ultimaMudanca[a.id] > PARADO_MS;
        return Object.assign({}, a, { st: !on ? 'fora' : parado ? 'parado' : 'jogando', maisP: a.pontos - base.alunos[a.id].p, maisC: a.acertos - base.alunos[a.id].c });
      });
      const ordem = { jogando: 0, parado: 1, fora: 2 };
      com.sort((x, y) => ordem[x.st] - ordem[y.st] || x.apelido.localeCompare(y.apelido, 'pt-BR'));
      const n = st => com.filter(a => a.st === st).length;
      const totC = com.reduce((s, a) => s + Math.max(0, a.maisC), 0);
      $('#av-resumo').textContent = `${n('jogando') + n('parado')} de ${com.length} alunos com o Mundo aberto` + (n('parado') ? ` (${n('parado')} parado${n('parado') > 1 ? 's' : ''})` : '') + `. ${totC} acerto${totC === 1 ? '' : 's'} da turma nesta aula.`;
      $('#av-hora').textContent = 'Atualizado às ' + new Date(agora).toLocaleTimeString('pt-BR') + '. Contando a aula desde ' + new Date(base.inicio).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + '.';
      const rotulo = { jogando: 'Jogando agora', parado: 'Parado há mais de 5 min', fora: 'Fora do jogo' };
      $('#av-lista').innerHTML = com.length ? `<div class="av-cards">${com.map(a => `
        <div class="av-card ${a.st}">
          <h3>${esc(a.apelido)}</h3>
          <div class="av-st">${rotulo[a.st]}</div>
          <div class="av-onde">${a.st === 'fora' ? (a.atualizado ? 'Jogou pela última vez ' + esc(ha(agora - new Date(a.atualizado).getTime())) : 'Ainda não jogou') : esc(a.fazendo || 'Explorando o Mundo')}</div>
          <div class="av-num"><span>Nesta aula: <b class="av-mais">+${Math.max(0, a.maisP)}</b> pontos, <b class="av-mais">+${Math.max(0, a.maisC)}</b> acertos</span><span class="muted">Total: ${a.pontos} pontos, ${a.acertos} acertos</span></div>
        </div>`).join('')}</div>` : '<p class="muted">Nenhum aluno cadastrado nesta turma.</p>';
    }
    function para() { clearInterval(timer); timer = null; }
    function liga() { para(); timer = setInterval(() => { if (!document.hidden) atualiza(); }, CADA_MS); }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && turma) atualiza(); });
    $('#av-voltar').addEventListener('click', async () => { para(); turma = null; if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); mostra('tela-painel'); await desenhaTurmas(); });
    $('#av-zerar').addEventListener('click', () => { if (!turma) return; base = {}; atualiza(); });
    $('#av-tela').addEventListener('click', () => {
      const el = $('#tela-aovivo');
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      else if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    });
    return {
      abre(t) {
        turma = t; base = leBase(t.id) || {}; ultimaMudanca = {}; ultimoValor = {};
        $('#av-nome').textContent = t.nome; $('#av-lista').innerHTML = '<p class="muted">Carregando...</p>'; $('#av-resumo').textContent = ''; $('#av-hora').textContent = '';
        mostra('tela-aovivo'); window.scrollTo(0, 0); atualiza(); liga();
      }
    };
  })();

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
