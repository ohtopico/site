(() => {
  // Tema e campos personalizados são os mesmos do IA pra Prof (chave iapraprof:); o resto é desta página
  const guardar = prefixo => ({
    get(k, d) { try { const v = localStorage.getItem(prefixo + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(prefixo + k, JSON.stringify(v)); } catch (e) {} }
  });
  const serie = guardar('iapraprof:'), store = guardar('promptspraprof:');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 1800);
  }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (e2) {}
      ta.remove(); return ok;
    }
  }

  // ---------- tema ----------
  $('#theme-btn').addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark' ||
      (!document.documentElement.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    const next = isDark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next; serie.set('theme', next);
  });

  // ---------- capítulos / navegação ----------
  const chapters = $$('.chapter');
  const ids = chapters.map(c => c.id);
  const tocLinks = $$('.toc a[data-ch]');
  let visited = new Set(store.get('visited', []));
  const countable = ids.filter(id => id !== 'inicio');

  function updateProgress() {
    const n = countable.filter(id => visited.has(id)).length;
    const pct = Math.round(n / countable.length * 100);
    $('#pbar').style.width = pct + '%';
    $('#pct-label').textContent = pct + '% visto';
    $('.progress').setAttribute('aria-valuenow', pct);
    tocLinks.forEach(a => a.classList.toggle('done', visited.has(a.dataset.ch)));
    const startBtn = $('#start-btn');
    const last = store.get('last', null);
    if (startBtn && last && last !== 'inicio' && ids.includes(last)) {
      startBtn.textContent = 'Continuar de onde parei →';
      startBtn.setAttribute('href', '#/' + last);
    }
  }

  const titleOf = id => document.getElementById(id).dataset.title || id;

  function show(id, alvo) {
    if (!ids.includes(id)) id = 'inicio';
    chapters.forEach(c => c.classList.toggle('active', c.id === id));
    tocLinks.forEach(a => { if (a.dataset.ch === id) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const i = ids.indexOf(id);
    const prev = ids[i - 1], next = ids[i + 1];
    $('#pager').innerHTML =
      (prev ? `<a class="prev" href="#/${prev}"><small>← Anterior</small>${titleOf(prev)}</a>` : '') +
      (next ? `<a class="next" href="#/${next}"><small>Próximo →</small>${titleOf(next)}</a>` : '');
    if (id !== 'inicio') { visited.add(id); store.set('visited', [...visited]); store.set('last', id); }
    updateProgress();
    document.title = (id === 'inicio' ? '' : titleOf(id) + ' · ') + 'Prompts pra Prof';
    closeToc();
    if (alvo) alvo.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (id === 'buscar') setTimeout(() => $('#busca').focus(), 30);
  }

  // #/capitulo, e também os endereços antigos: #capitulo, #id-do-prompt e ?disciplina=
  function route() {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    const el = h && document.getElementById(h);
    if (el && el.classList.contains('prompt')) return show(el.closest('.chapter').id, el);
    const d = new URLSearchParams(location.search).get('disciplina');
    show(h || (ids.includes(d) ? d : 'inicio'));
  }
  window.addEventListener('hashchange', route);

  // ---------- sumário mobile ----------
  const toc = $('#toc'), scrim = $('#scrim'), tocBtn = $('#toc-btn');
  function openToc() { toc.classList.add('open'); scrim.classList.add('open'); tocBtn.setAttribute('aria-expanded', 'true'); }
  function closeToc() { toc.classList.remove('open'); scrim.classList.remove('open'); tocBtn.setAttribute('aria-expanded', 'false'); }
  tocBtn.addEventListener('click', () => toc.classList.contains('open') ? closeToc() : openToc());
  scrim.addEventListener('click', closeToc);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeToc(); closePerso(); }
    if (e.target.matches('input, textarea, select')) return;
    const i = ids.indexOf(document.querySelector('.chapter.active')?.id);
    if (e.key === 'ArrowRight' && ids[i + 1]) location.hash = '#/' + ids[i + 1];
    if (e.key === 'ArrowLeft' && ids[i - 1]) location.hash = '#/' + ids[i - 1];
  });

  // ---------- prompts: placeholders destacados + botão copiar ----------
  const KEYS = ['tema', 'ano', 'componente', 'idade'];
  const prompts = $$('.prompt');
  const normalizar = t => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  prompts.forEach(fig => {
    fig.dataset.texto = normalizar(fig.textContent);
    const body = fig.querySelector('.body');
    body.innerHTML = body.innerHTML.replace(/\[([^\]]*)\]/g, (m, inner) => {
      const k = KEYS.includes(inner.toLowerCase().trim()) ? inner.toLowerCase().trim() : null;
      return `<span class="ph"${k ? ` data-k="${k}"` : ''} data-orig="${m.replace(/"/g, '&quot;')}">${m}</span>`;
    });
    const btn = document.createElement('button');
    btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = 'Copiar';
    btn.setAttribute('aria-label', 'Copiar prompt: ' + fig.querySelector('figcaption').textContent.trim());
    fig.querySelector('figcaption').appendChild(btn);
  });
  // Delegado, para valer também nas cópias da busca
  document.addEventListener('click', async e => {
    const btn = e.target.closest('.copy-btn'); if (!btn) return;
    const ok = await copyText(btn.closest('.prompt').querySelector('.body').innerText.trim());
    btn.textContent = ok ? 'Copiado!' : 'Erro'; btn.classList.toggle('copied', ok);
    if (ok) toast('Prompt copiado. Cole na sua IA e ajuste o que estiver entre [ ].');
    setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 1600);
  });

  // ---------- personalizar e filtrar ----------
  let vals = serie.get('vals', {});
  let filtro = store.get('filtro', {});
  const q = new URLSearchParams(location.search);
  ['etapa', 'tipo'].forEach(k => { if (q.get(k)) filtro[k] = q.get(k); });
  const perso = $('#personalize'), persoBtn = $('#perso-btn');
  function openPerso() { perso.classList.add('open'); persoBtn.setAttribute('aria-expanded', 'true'); setTimeout(() => $('#f-etapa').focus(), 30); }
  function closePerso() { perso.classList.remove('open'); persoBtn.setAttribute('aria-expanded', 'false'); }
  persoBtn.addEventListener('click', () => perso.classList.contains('open') ? closePerso() : openPerso());
  $('#perso-close').addEventListener('click', closePerso);
  $('#perso-done').addEventListener('click', () => { closePerso(); toast('Prompts ajustados'); });
  $('#perso-clear').addEventListener('click', () => {
    vals = {}; filtro = {}; serie.set('vals', vals); store.set('filtro', filtro);
    $$('#personalize input, #personalize select').forEach(i => i.value = '');
    aplicar();
  });
  $$('#personalize input').forEach(inp => {
    inp.value = vals[inp.dataset.key] || '';
    inp.addEventListener('input', () => { vals[inp.dataset.key] = inp.value.trim(); serie.set('vals', vals); aplicar(); });
  });
  $$('#personalize select').forEach(sel => {
    if ([...sel.options].some(o => o.value === filtro[sel.dataset.key])) sel.value = filtro[sel.dataset.key];
    else delete filtro[sel.dataset.key];
    sel.addEventListener('change', () => { filtro[sel.dataset.key] = sel.value; store.set('filtro', filtro); aplicar(); });
  });

  const passa = fig => (!filtro.etapa || fig.dataset.etapas.split(' ').includes(filtro.etapa)) &&
    (!filtro.tipo || fig.dataset.tipo === filtro.tipo);

  function preencher(raiz) {
    $$('.ph[data-k]', raiz).forEach(s => {
      const v = vals[s.dataset.k];
      s.textContent = v || s.dataset.orig; s.classList.toggle('filled', !!v);
    });
  }

  function aplicar() {
    preencher(document);
    prompts.forEach(fig => fig.classList.toggle('oculto', !passa(fig)));
    $$('.chapter').forEach(ch => {
      const aviso = $('.filtro-aviso', ch); if (!aviso) return;
      const todos = $$('.prompt', ch), escondidos = todos.filter(f => f.classList.contains('oculto')).length;
      aviso.classList.toggle('show', escondidos > 0);
      aviso.textContent = escondidos === todos.length
        ? 'Nenhum prompt desta disciplina combina com os filtros. Mude em Personalizar prompts, no topo.'
        : `${escondidos} prompt${escondidos > 1 ? 's' : ''} escondido${escondidos > 1 ? 's' : ''} pelos filtros.`;
    });
    const n = KEYS.filter(k => vals[k]).length + ['etapa', 'tipo'].filter(k => filtro[k]).length;
    persoBtn.querySelector('.lbl').textContent = n ? `Personalizado (${n})` : 'Personalizar prompts';
    buscar();
  }

  // ---------- buscar em todas as disciplinas ----------
  const busca = $('#busca');
  function buscar() {
    const palavras = normalizar(busca.value).split(/\s+/).filter(Boolean);
    const achados = prompts.filter(f => passa(f) && palavras.every(p => f.dataset.texto.includes(p)));
    const n = achados.length === 1 ? '1 prompt' : `${achados.length} prompts`;
    const comFiltro = filtro.etapa || filtro.tipo ? ' com os filtros de Personalizar prompts' : '';
    $('#busca-status').textContent = palavras.length || comFiltro ? `${n} encontrado${achados.length === 1 ? '' : 's'}${comFiltro}.` : `${n} na biblioteca.`;
    const out = $('#busca-resultado'); out.innerHTML = '';
    let grupo = null;
    achados.forEach(f => {
      const ch = f.closest('.chapter');
      if (ch !== grupo) {
        grupo = ch;
        const h = document.createElement('h3'); h.className = 'busca-grupo';
        h.innerHTML = `<a href="#/${ch.id}">${ch.dataset.title}</a>`;
        out.appendChild(h);
      }
      const c = f.cloneNode(true); c.removeAttribute('id'); out.appendChild(c);
    });
  }
  busca.addEventListener('input', buscar);
  $('#busca-limpar').addEventListener('click', () => { busca.value = ''; buscar(); busca.focus(); });

  aplicar();
  route();
})();
