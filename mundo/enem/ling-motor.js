/* Ilha ENEM · Linguagens: motor dos jogos de Linguagens (H1–H30 da Matriz do ENEM).
   Cada página chama LING.jogo(config). Uma rodada junta etapas de tipos diferentes:
   - classificar: um item e alguns "baldes" (ex.: as seis funções da linguagem)
   - achar: toque na palavra ou expressão pedida dentro do texto ([[certa]] , {{grupo de palavras}})
   - parear: ligue cada termo ao seu par (ex.: falsos amigos do espanhol)
   - ordenar: toque nas cartas na ordem certa (ex.: linha do tempo das escolas literárias)
   - enem: texto-base + enunciado + cinco alternativas (a primeira da lista é a certa; o motor embaralha)
   As fontes ficam em _fonte/enem/ling/ e as páginas são geradas por _fonte/enem/ling/gerar.js. */
(function () {
  const $ = s => document.querySelector(s);
  const mix = a => ENEM.embaralha(a);
  const LETRAS = 'ABCDE';

  function jogo(cfg) {
    const palco = $('#palco');
    ENEM.topo($('#topo'));
    let fila = [], i = 0, acertos = 0, pontos = 0, respondida = false;

    function comecar() {
      fila = [];
      cfg.etapas.forEach(et => mix(et.itens).slice(0, et.n || et.itens.length).forEach(it => fila.push({ et, it })));
      i = 0; acertos = 0; pontos = 0; mostrar();
    }

    const hud = rot => `<div class="hud"><span>${rot} <b>${i + 1}</b> de ${fila.length}</span><span>Acertos <b>${acertos}</b></span></div>
      <div class="barra"><i style="width:${i / fila.length * 100}%"></i></div>`;

    function mostrar() {
      const { et, it } = fila[i]; respondida = false;
      const pede = it.pede || et.pede || '';
      let corpo = '';
      if (et.tipo === 'classificar') {
        corpo = `${et.figura ? `<div class="l-fig">${et.figura}</div>` : ''}<p class="l-pede">${pede}</p>
          <div class="l-item">${it.emo ? `<span class="emo" aria-hidden="true">${it.emo}</span>` : ''}<div>${it.t}</div></div>
          <div class="alts l-baldes${et.baldes.length === 3 ? ' tres' : et.baldes.length === 2 ? ' dois' : ''}">${et.baldes.map((b, k) => `<button class="alt" type="button" data-k="${k}">${b}</button>`).join('')}</div>`;
      } else if (et.tipo === 'enem') {
        it._alts = it._alts || mix(it.alts.map((t, k) => ({ t, certa: k === 0 })));
        corpo = `${it.base ? `<div class="l-base">${it.base}${it.fonte ? `<p class="l-fonte">${it.fonte}</p>` : ''}</div>` : ''}
          <div class="q-enun">${it.enun}</div>
          <div class="alts">${it._alts.map((a, k) => `<button class="alt" type="button" data-k="${k}"><span class="letra">${LETRAS[k]}</span><span>${a.t}</span></button>`).join('')}</div>`;
      } else if (et.tipo === 'achar') {
        corpo = `<p class="l-pede">${pede}</p><div class="l-texto">${tokens(it.texto)}</div>`;
      } else if (et.tipo === 'parear') {
        it._esq = mix(it.pares.map((p, k) => ({ t: p[0], k }))); it._dir = mix(it.pares.map((p, k) => ({ t: p[1], k })));
        corpo = `<p class="l-pede">${pede}</p><div class="l-pares"><div>${it._esq.map(p => `<button class="l-p" type="button" data-lado="e" data-par="${p.k}">${p.t}</button>`).join('')}</div>
          <div>${it._dir.map(p => `<button class="l-p" type="button" data-lado="d" data-par="${p.k}">${p.t}</button>`).join('')}</div></div>`;
      } else if (et.tipo === 'ordenar') {
        it._cartas = it._cartas || mix(it.cartas.map((t, k) => ({ t, k })));
        corpo = `<p class="l-pede">${pede}</p><ol class="l-ordem" id="ordem">${it.cartas.map(() => '<li class="vazio">…</li>').join('')}</ol>
          <div class="l-cartas">${it._cartas.map((c, k) => `<button class="l-carta" type="button" data-c="${k}">${c.t}</button>`).join('')}</div>
          <div class="btn-row" style="margin-top:10px"><button class="btn ghost" type="button" id="desfaz">↩ Desfazer</button></div>`;
      }
      palco.innerHTML = hud(et.rotulo || 'Desafio') + `<div id="q">${corpo}</div><div id="corr"></div><div class="btn-row" id="seguir" style="margin-top:14px"></div>`;
      ligar(et, it);
    }

    function tokens(txt) {
      // [[certa]] = alvo; {{várias palavras}} = um só toque; o resto, palavra por palavra
      const out = [];
      txt.split(/(\[\[.+?\]\]|\{\{.+?\}\}|\n)/).forEach(parte => {
        if (!parte) return;
        if (parte === '\n') { out.push('<br>'); return; }
        const alvo = parte.startsWith('[['), grupo = parte.startsWith('{{');
        if (alvo || grupo) { out.push(`<span class="l-w" role="button" tabindex="0" data-ok="${alvo ? 1 : 0}">${parte.slice(2, -2)}</span>`); return; }
        parte.split(/(\s+)/).forEach(w => {
          if (!w.trim()) { out.push(w); return; }
          const m = w.match(/^([«“"'(¿¡—–-]*)(.*?)([.,;:!?»”"')…]*)$/);
          if (!m[2]) { out.push(w); return; }
          out.push(`${m[1]}<span class="l-w" role="button" tabindex="0" data-ok="0">${m[2]}</span>${m[3]}`);
        });
      });
      return out.join('');
    }

    function ligar(et, it) {
      if (et.tipo === 'classificar' || et.tipo === 'enem') palco.querySelectorAll('.alt').forEach(b => b.onclick = () => {
        if (respondida) return;
        const k = +b.dataset.k, certo = et.tipo === 'enem' ? it._alts.findIndex(a => a.certa) : it.c;
        palco.querySelectorAll('.alt').forEach(x => { x.disabled = true; if (+x.dataset.k === certo) x.classList.add('certa'); else if (x === b) x.classList.add('errada'); });
        const ok = k === certo;
        const resp = et.tipo === 'enem' ? `Resposta: ${LETRAS[certo]}.` : `Resposta: ${et.baldes[certo]}.`;
        fechar(ok, (ok ? '<b>Isso!</b> ' : `<b>${resp}</b> `) + (it.e || ''), ok ? 1 : 0);
      });
      if (et.tipo === 'achar') palco.querySelectorAll('.l-w').forEach(b => {
        b.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); b.click(); } };
        b.onclick = () => {
        if (respondida) return;
        const ok = b.dataset.ok === '1';
        palco.querySelectorAll('.l-w').forEach(x => { x.classList.add('feito'); x.removeAttribute('tabindex'); if (x.dataset.ok === '1') x.classList.add('certa'); });
        if (!ok) b.classList.add('errada');
        const alvo = [...palco.querySelectorAll('.l-w[data-ok="1"]')].map(x => '“' + x.textContent + '”').join(' e ');
        fechar(ok, (ok ? '<b>Isso!</b> ' : `<b>Era ${alvo}.</b> `) + (it.e || ''), ok ? 1 : 0);
      }; });
      if (et.tipo === 'parear') {
        let sel = null, erros = 0, feitos = 0;
        palco.querySelectorAll('.l-p').forEach(b => b.onclick = () => {
          if (respondida || b.classList.contains('certa')) return;
          if (!sel || sel.dataset.lado === b.dataset.lado) { if (sel) sel.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
          if (sel.dataset.par === b.dataset.par) {
            const cor = 'c' + (feitos++ % 6);
            [sel, b].forEach(x => { x.classList.remove('sel'); x.classList.add('certa', cor); x.disabled = true; });
            sel = null;
            if (feitos === it.pares.length) {
              const ok = erros <= 1;
              fechar(ok, `<b>${erros === 0 ? 'Sem nenhum erro!' : erros === 1 ? 'Só um erro, conta como acerto.' : erros + ' tentativas erradas.'}</b> ` + (it.e || it.pares.map(p => `<b>${p[0]}</b> = ${p[1]}`).join(' · ')), ok ? 1 : 0);
            }
          } else {
            erros++; const a = sel; a.classList.add('errada'); b.classList.add('errada');
            setTimeout(() => { a.classList.remove('errada', 'sel'); b.classList.remove('errada'); }, 450); sel = null;
          }
        });
      }
      if (et.tipo === 'ordenar') {
        const seq = [];
        const pinta = () => {
          const lis = palco.querySelectorAll('#ordem li');
          lis.forEach((li, k) => { const c = seq[k]; li.className = c === undefined ? 'vazio' : ''; li.innerHTML = c === undefined ? '…' : it._cartas[c].t; });
          palco.querySelectorAll('.l-carta').forEach(b => b.disabled = seq.includes(+b.dataset.c));
        };
        palco.querySelectorAll('.l-carta').forEach(b => b.onclick = () => {
          if (respondida) return; seq.push(+b.dataset.c); pinta();
          if (seq.length === it.cartas.length) {
            const certos = seq.filter((c, k) => it._cartas[c].k === k).length, ok = certos === it.cartas.length;
            palco.querySelectorAll('#ordem li').forEach((li, k) => li.classList.add(it._cartas[seq[k]].k === k ? 'certa' : 'errada'));
            $('#desfaz').disabled = true;
            const ordem = it.cartas.map((t, k) => `${k + 1}. ${t}`).join('<br>');
            fechar(ok, (ok ? '<b>Ordem perfeita!</b> ' : `<b>${certos} de ${it.cartas.length} no lugar.</b> A ordem certa é:<br>${ordem}<br>`) + (it.e || ''), ok ? 1 : 0);
          }
        });
        $('#desfaz').onclick = () => { if (!respondida) { seq.pop(); pinta(); } };
      }
    }

    function fechar(ok, txt, pt) {
      respondida = true; if (ok) acertos++; pontos += pt;
      $('#corr').innerHTML = `<div class="corr ${ok ? 'ok' : 'bad'}">${txt}</div>`;
      const ultima = i === fila.length - 1;
      $('#seguir').innerHTML = `<button class="btn" type="button" id="prox">${ultima ? 'Ver resultado' : 'Próximo →'}</button>`;
      $('#prox').onclick = () => { if (ultima) fim(); else { i++; mostrar(); } };
      $('#prox').focus({ preventScroll: true });
    }

    function fim() {
      ENEM.contarFeitas(fila.length);
      const n = fila.length, est = acertos >= n - 1 ? 3 : acertos >= n - 3 ? 2 : acertos >= n / 2 ? 1 : 0, novo = ENEM.darEstrelas(cfg.id, est);
      $('#tot-est') && ($('#tot-est').textContent = ENEM.totalEstrelas());
      const prox = cfg.proximo ? `<a class="btn ghost" href="${cfg.proximo[0]}">${cfg.proximo[1]}</a>` : '';
      palco.innerHTML = `<div class="fim"><div class="grande">${acertos}/${n}</div>${ENEM.estrelasHtml(est)}
        ${novo ? '<p class="feedback ok">Novo recorde de estrelas!</p>' : ''}
        ${cfg.fim ? `<div class="corr" style="text-align:left;margin-top:14px">${cfg.fim}</div>` : ''}
        <div class="btn-row" style="justify-content:center;margin-top:16px"><button class="btn" type="button" id="denovo">Jogar de novo</button>${prox}<a class="btn ghost" href="./">Voltar à ilha</a></div></div>`;
      $('#denovo').onclick = comecar;
    }

    function abertura() {
      palco.innerHTML = `${cfg.figura ? `<div class="l-fig">${cfg.figura}</div>` : ''}${cfg.intro ? `<p class="l-intro">${cfg.intro}</p>` : ''}
        <div class="btn-row" style="justify-content:center;margin-top:14px"><button class="btn" type="button" id="comeca">▶ Começar</button></div>`;
      $('#comeca').onclick = comecar; $('#comeca').focus({ preventScroll: true });
    }

    document.addEventListener('keydown', e => {
      if (!$('#q') || respondida || e.ctrlKey || e.metaKey || e.altKey || !fila[i]) return;
      const t = fila[i].et.tipo; if (t !== 'enem' && t !== 'classificar') return;
      const k = e.key.toUpperCase(), idx = '123456'.indexOf(k) >= 0 ? '123456'.indexOf(k) : t === 'enem' ? 'ABCDE'.indexOf(k) : -1;
      const b = idx >= 0 && palco.querySelector(`.alt[data-k="${idx}"]`); if (b) { b.click(); e.preventDefault(); }
    });
    if (cfg.figura || cfg.intro) abertura(); else comecar();
  }

  window.LING = { jogo };
})();
