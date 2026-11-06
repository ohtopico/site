/* Mundo da turma (apoiadores do Catarse): conversa com o banco no Supabase, sem biblioteca externa.
   O endereço e a chave pública abaixo podem ficar no site: quem protege os dados são as regras do banco
   (_fonte/turmas/banco.sql). A chave secreta (service_role) nunca entra aqui. */
(function () {
  const CONFIG = {
    url: 'https://ahnlqrowwbtngrzlgevr.supabase.co',   // Project URL, ex.: https://abcdefgh.supabase.co
    chave: 'sb_publishable_K3YX6U-SsPXcLgEHoAHf7g_ySUWPHz7'   // chave "anon public" / "publishable"
  };
  const CH_PROF = 'mundo-turma-prof-v1', CH_ALUNO = 'mundo-turma-aluno-v1';
  const configurado = () => !!(CONFIG.url && CONFIG.chave);
  const ler = (st, k) => { try { return JSON.parse(st.getItem(k)); } catch (e) { return null; } };
  const grava = (st, k, v) => { try { v == null ? st.removeItem(k) : st.setItem(k, JSON.stringify(v)); } catch (e) {} };

  async function pede(caminho, { metodo = 'POST', corpo, token } = {}) {
    if (!configurado()) throw new Error('nao-configurado');
    const r = await fetch(CONFIG.url.replace(/\/$/, '') + caminho, {
      method: metodo,
      headers: Object.assign({ apikey: CONFIG.chave, 'Content-Type': 'application/json' }, token ? { Authorization: 'Bearer ' + token } : {}),
      body: corpo === undefined ? undefined : JSON.stringify(corpo)
    });
    const txt = await r.text(); let dados = null; try { dados = txt ? JSON.parse(txt) : null; } catch (e) { dados = txt; }
    if (!r.ok) { const e = new Error((dados && (dados.msg || dados.message || dados.error_description || dados.error)) || ('erro ' + r.status)); e.status = r.status; e.dados = dados; throw e; }
    return dados;
  }

  /* ---------- professora (conta com e-mail e senha) ---------- */
  function guardaSessao(d) {
    if (!d || !d.access_token) return null;
    const s = { access: d.access_token, refresh: d.refresh_token, expira: Date.now() + (d.expires_in || 3600) * 1000, email: d.user && d.user.email };
    grava(localStorage, CH_PROF, s); return s;
  }
  async function tokenProf() {
    let s = ler(localStorage, CH_PROF); if (!s) return null;
    if (Date.now() > s.expira - 60000) {
      try { s = guardaSessao(await pede('/auth/v1/token?grant_type=refresh_token', { corpo: { refresh_token: s.refresh } })); }
      catch (e) { grava(localStorage, CH_PROF, null); return null; }
    }
    return s && s.access;
  }
  const rpcProf = async (fn, args) => pede('/rest/v1/rpc/' + fn, { corpo: args || {}, token: await tokenProf() });
  const selProf = async q => pede('/rest/v1/' + q, { metodo: 'GET', token: await tokenProf() });
  const delProf = async q => pede('/rest/v1/' + q, { metodo: 'DELETE', token: await tokenProf() });
  const voltaPara = () => location.origin + '/mundo/turma/';

  const prof = {
    sessao: () => ler(localStorage, CH_PROF),
    async cadastrar(email, senha) {
      const d = await pede('/auth/v1/signup?redirect_to=' + encodeURIComponent(voltaPara()), { corpo: { email, password: senha } });
      return guardaSessao(d.session || d);   // null quando o Supabase pede para confirmar o e-mail
    },
    async entrar(email, senha) { return guardaSessao(await pede('/auth/v1/token?grant_type=password', { corpo: { email, password: senha } })); },
    usaLinkDoEmail(hash) {   // volta do e-mail de confirmação ou de nova senha: #access_token=...&type=...
      const p = new URLSearchParams(String(hash || '').replace(/^#/, ''));
      if (!p.get('access_token')) return null;
      guardaSessao({ access_token: p.get('access_token'), refresh_token: p.get('refresh_token'), expires_in: +p.get('expires_in') || 3600 });
      return p.get('type') || 'login';
    },
    esqueci: email => pede('/auth/v1/recover?redirect_to=' + encodeURIComponent(voltaPara()), { corpo: { email } }),
    async novaSenha(senha) { return pede('/auth/v1/user', { metodo: 'PUT', corpo: { password: senha }, token: await tokenProf() }); },
    async sair() { try { await pede('/auth/v1/logout', { token: await tokenProf() }); } catch (e) {} grava(localStorage, CH_PROF, null); },
    eu: nome => rpcProf('prof_entrar', { p_nome: nome || '' }),
    turmas: () => selProf('turmas?select=id,nome,codigo,criado&order=criado.asc'),
    aoVivo: turma => selProf('alunos?select=id,apelido,pontos,acertos,atualizado,online_em,fazendo&turma_id=eq.' + encodeURIComponent(turma) + '&order=apelido.asc'),
    alunos: turma => selProf('alunos?select=id,apelido,pontos,acertos,atualizado&turma_id=eq.' + encodeURIComponent(turma) + '&order=apelido.asc'),
    criarTurma: nome => rpcProf('prof_criar_turma', { p_nome: nome }),
    senhaAluno: (turma, apelido) => rpcProf('prof_aluno_senha', { p_turma: turma, p_apelido: apelido }),
    apagarAluno: id => delProf('alunos?id=eq.' + encodeURIComponent(id)),
    apagarTurma: id => delProf('turmas?id=eq.' + encodeURIComponent(id))
  };

  /* ---------- aluno (código da turma + apelido + senha, sem e-mail) ---------- */
  const aluno = {
    sessao: () => ler(sessionStorage, CH_ALUNO) || ler(localStorage, CH_ALUNO),
    async entrar(codigo, apelido, senha) {
      const d = await pede('/rest/v1/rpc/aluno_entrar', { corpo: { p_codigo: codigo, p_apelido: apelido, p_senha: senha } });
      if (d && d.token) grava(localStorage, CH_ALUNO, { token: d.token, apelido: d.apelido, turma: d.turma });
      return d;
    },
    async salvar(progresso, pontos, acertos) {
      const s = aluno.sessao(); if (!s) return false;
      const ok = await pede('/rest/v1/rpc/aluno_salvar', { corpo: { p_token: s.token, p_progresso: progresso, p_pontos: pontos, p_acertos: acertos } });
      if (ok === false) grava(localStorage, CH_ALUNO, null);   // sessão venceu: precisa entrar de novo
      return ok;
    },
    async ping(fazendo, pontos, acertos, ativo) {
      const s = aluno.sessao(); if (!s) return false;
      const ok = await pede('/rest/v1/rpc/aluno_ping', { corpo: { p_token: s.token, p_fazendo: fazendo, p_pontos: pontos, p_acertos: acertos, p_ativo: ativo !== false } });
      if (ok === false) grava(localStorage, CH_ALUNO, null);
      return ok;
    },
    async sair() { const s = aluno.sessao(); grava(localStorage, CH_ALUNO, null); if (s) { try { await pede('/rest/v1/rpc/aluno_sair', { corpo: { p_token: s.token } }); } catch (e) {} } }
  };

  window.MUNDO_TURMA = { CONFIG, configurado, prof, aluno, _pede: pede };
})();
