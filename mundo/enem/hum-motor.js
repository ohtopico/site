/* Motor dos jogos de Ciências Humanas da Ilha ENEM (hum-*.html).
   Cada página chama HUM.jogo({ id, fila, proximo }) e o motor cuida do placar, da barra, das estrelas e da tela final.
   Tipos de rodada:
     mc    → { tipo:'mc', hab:'H6', texto?, fig?, enun, certa, erradas:[], expl }      (estilo ENEM, com texto-base ou figura)
     bins  → { tipo:'bins', hab, emo?, item, opcoes:[...], certa:i, expl, fig? }        (classificar em caixas)
     ordem → { tipo:'ordem', hab, enun, itens:[[rótulo, ano, emo?]], expl }           (tocar na ordem cronológica)
     sim   → { tipo:'sim', hab, montar(el, fim(ok, textoHtml)) }                        (simulador próprio da página) */
(function () {
  const $ = s => document.querySelector(s), esc = ENEM.esc, mix = ENEM.embaralha;
  const sorteia = a => a[Math.floor(Math.random() * a.length)];
  window.HUM = { sorteia, mix };

  HUM.jogo = function (cfg) {
    const palco = $('#palco');
    ENEM.topo($('#topo'));
    let fila = [], i = 0, acertos = 0, respondida = false, errosTxt = [];

    function comecar() { fila = cfg.fila(); i = 0; acertos = 0; errosTxt = []; mostrar(); }

    function cab(q) {
      return `<div class="hud"><span>Rodada <b>${i + 1}</b> de ${fila.length}</span><span>Acertos <b>${acertos}</b></span>
        ${q.hab ? `<span class="h-tag" title="Habilidade da Matriz do ENEM">${esc(q.hab)}</span>` : ''}</div>
        <div class="barra"><i style="width:${i / fila.length * 100}%"></i></div>`;
    }
    const alt = (t, k) => `<button class="alt" type="button" data-k="${k}"><span class="letra">${'ABCDE'[k]}</span><span>${t}</span></button>`;

    function mostrar() {
      const q = fila[i]; respondida = false;
      let corpo = '';
      if (q.tipo === 'mc') {
        q.alts = q.alts || mix([q.certa, ...q.erradas.filter(e => e !== q.certa).slice(0, 4)]);
        corpo = `${q.texto ? `<blockquote class="h-texto">${q.texto}</blockquote>` : ''}${q.fig ? `<div class="h-fig">${q.fig}</div>` : ''}
          <div class="q-enun">${q.enun}</div><div class="alts">${q.alts.map(alt).join('')}</div>`;
      } else if (q.tipo === 'bins') {
        corpo = `${q.fig ? `<div class="h-fig">${q.fig}</div>` : ''}<div class="h-item">${q.emo ? `<span class="emo" aria-hidden="true">${q.emo}</span>` : ''}<h2>${q.item}</h2></div>
          ${q.pergunta ? `<p class="muted" style="margin:0 0 10px">${q.pergunta}</p>` : ''}
          <div class="alts h-bins n${q.opcoes.length}">${q.opcoes.map((o, k) => `<button class="alt" type="button" data-k="${k}">${o}</button>`).join('')}</div>`;
      } else if (q.tipo === 'ordem') {
        q.emb = q.emb || mix(q.itens.map((it, k) => k));
        q.esc = [];
        corpo = `<div class="q-enun">${q.enun}</div><div class="h-ordem" id="ordem"></div>
          <div class="h-trilho" id="trilho"></div>
          <div class="btn-row" style="margin-top:10px"><button class="hb amarelo" type="button" id="desfaz">↶ Desfazer</button></div>`;
      } else if (q.tipo === 'sim') {
        corpo = `<div id="sim"></div>`;
      }
      palco.innerHTML = cab(q) + `<div id="q">${corpo}</div><div id="corr"></div><div class="btn-row" id="seguir" style="margin-top:14px"></div>`;
      if (q.tipo === 'mc' || q.tipo === 'bins') palco.querySelectorAll('[data-k]').forEach(b => b.onclick = () => responder(+b.dataset.k, b));
      if (q.tipo === 'ordem') desenharOrdem(q);
      if (q.tipo === 'sim') q.montar($('#sim'), (ok, txt) => concluir(ok, txt));
    }

    function desenharOrdem(q) {
      const ord = $('#ordem'), tri = $('#trilho');
      ord.innerHTML = q.emb.filter(k => !q.esc.includes(k)).map(k => {
        const it = q.itens[k];
        return `<button class="alt h-carta" type="button" data-o="${k}">${it[2] ? `<span class="emo">${it[2]}</span>` : ''}<span>${it[0]}</span></button>`;
      }).join('') || '<p class="muted" style="margin:0">Pronto! Confira a sua linha do tempo.</p>';
      tri.innerHTML = '<div class="h-linha"></div>' + q.itens.map((_, n) => {
        const k = q.esc[n];
        return `<div class="h-slot${k != null ? ' cheio' : ''}"><span class="n">${n + 1}º</span>${k != null ? q.itens[k][0] : ''}</div>`;
      }).join('');
      ord.querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
        if (respondida) return; q.esc.push(+b.dataset.o); desenharOrdem(q);
        if (q.esc.length === q.itens.length) conferirOrdem(q);
      });
      $('#desfaz').onclick = () => { if (!respondida && q.esc.length) { q.esc.pop(); desenharOrdem(q); } };
    }
    function conferirOrdem(q) {
      respondida = true;
      const certo = q.itens.map((it, k) => k).sort((a, b) => q.itens[a][1] - q.itens[b][1]);
      const ok = certo.every((k, n) => k === q.esc[n]);
      $('#trilho').innerHTML = '<div class="h-linha"></div>' + certo.map((k, n) => {
        const bate = q.esc[n] === k;
        return `<div class="h-slot cheio ${bate ? 'bom' : 'ruim'}"><span class="n">${fmtAno(q.itens[k][1])}</span>${q.itens[k][2] ? q.itens[k][2] + ' ' : ''}${q.itens[k][0]}</div>`;
      }).join('');
      $('#desfaz').remove();
      concluir(ok, `<b>${ok ? 'Ordem perfeita!' : 'A ordem certa está acima (verde = você acertou a posição).'}</b> ${q.expl || ''}`);
    }
    const fmtAno = a => a < 0 ? `${-a} a.C.` : String(Math.floor(a));

    function responder(k, botao) {
      if (respondida) return;
      const q = fila[i];
      const ok = q.tipo === 'mc' ? q.alts[k] === q.certa : k === q.certa;
      palco.querySelectorAll('.alt').forEach(b => {
        b.disabled = true;
        const certa = q.tipo === 'mc' ? q.alts[+b.dataset.k] === q.certa : +b.dataset.k === q.certa;
        if (certa) b.classList.add('certa'); else if (b === botao) b.classList.add('errada');
      });
      const resp = q.tipo === 'mc' ? q.certa : q.opcoes[q.certa];
      concluir(ok, `<b>${ok ? 'Isso!' : 'Resposta: ' + resp + '.'}</b><br>${q.expl}`);
    }

    function concluir(ok, txt) {
      respondida = true;
      const q = fila[i];
      if (ok) acertos++; else errosTxt.push({ hab: q.hab, txt });
      $('#corr').innerHTML = `<div class="corr ${ok ? 'ok' : 'bad'}">${txt}</div>`;
      const ultima = i === fila.length - 1;
      $('#seguir').innerHTML = `<button class="btn" type="button" id="prox">${ultima ? 'Ver resultado' : 'Próximo →'}</button>`;
      $('#prox').onclick = () => { if (ultima) fim(); else { i++; mostrar(); window.scrollTo({ top: palco.offsetTop - 70, behavior: 'smooth' }); } };
      $('#prox').focus({ preventScroll: true });
    }

    function fim() {
      ENEM.contarFeitas(fila.length);
      const n = fila.length, est = acertos >= n - 1 ? 3 : acertos >= n - 3 ? 2 : acertos >= n / 2 ? 1 : 0;
      const novo = ENEM.darEstrelas(cfg.id, est);
      const t = $('#tot-est'); if (t) t.textContent = ENEM.totalEstrelas();
      const prox = cfg.proximo ? `<a class="btn ghost" href="${cfg.proximo[0]}">${cfg.proximo[1]} →</a>` : '';
      palco.innerHTML = `<div class="fim"><div class="grande">${acertos}/${n}</div>${ENEM.estrelasHtml(est)}
        ${novo ? '<p class="feedback ok">Novo recorde de estrelas!</p>' : ''}
        <div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn" type="button" id="denovo">Jogar de novo (rodadas novas)</button>${prox}<a class="btn ghost" href="./">Voltar à ilha</a></div>
        ${errosTxt.length ? `<h2 style="margin-top:22px;text-align:left">Para revisar</h2><div class="lista-erros">${errosTxt.map(e => `<div class="corr bad">${e.hab ? `<span class="h-tag">${e.hab}</span> ` : ''}${e.txt}</div>`).join('')}</div>` : ''}</div>`;
      $('#denovo').onclick = comecar;
    }

    document.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey || e.altKey || /input|select|textarea/i.test(e.target.tagName)) return;
      if (e.key === 'Enter' && respondida) { const p = $('#prox'); if (p && document.activeElement !== p) { p.click(); e.preventDefault(); } return; }
      if (respondida) return;
      const k = e.key.toUpperCase(), idx = '12345'.indexOf(k) >= 0 ? '12345'.indexOf(k) : 'ABCDE'.indexOf(k);
      const b = idx >= 0 && palco.querySelector(`[data-k="${idx}"]`); if (b) { b.click(); e.preventDefault(); }
    });
    comecar();
  };

  /* monta a fila: n rodadas sorteadas de cada grupo, na ordem dos grupos */
  HUM.montar = (...grupos) => grupos.flatMap(([lista, n]) => mix(lista).slice(0, n)).map(q => typeof q === 'function' ? q() : Object.assign({}, q));
})();
