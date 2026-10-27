/* Assistente do site ohtopico.com.br
   Responde perguntas com trechos dos conteúdos publicados no próprio site.
   Tudo roda no navegador: o índice (assistente/indice.json) é gerado por _fonte/assistente/indexar.py
   a partir das páginas do sitemap, e a busca usa BM25 com um "radical" simples do português.
   Não envia a pergunta para nenhum servidor nem serviço de IA.

   Uso em qualquer página:  <script src="/assistente/assistente.js" defer></script>
   Opcional: data-margem="64" sobe o botão (em px) quando a página tem barra fixa embaixo. */
(function () {
    'use strict';
    if (window.top !== window.self) return;           // dentro da janela "Busca" (iframe) não aparece
    if (document.querySelector('.assist')) return;

    const script = document.currentScript;
    const BASE = (script && script.src) ? script.src.replace(/assistente\.js.*$/, '') : '/assistente/';
    const MARGEM = parseInt(script && script.dataset.margem, 10) || 0;
    const CHAVE = 'ohtopico:assistente';

    const PARADAS = new Set((('a o e as os um uma uns umas de do da dos das em no na nos nas num numa por pelo pela pelos pelas ' +
        'para pra pro com sem sob que se ao aos à às é ser sao são foi era tem ter ha há como qual quais quando onde ' +
        'quem porque por que mais menos muito muita muitos muitas meu minha seu sua seus suas voce você voces vocês eu ' +
        'me te lhe isso isto esse essa este esta aquele aquela ele ela eles elas nao não sim ja já tambem também so só ' +
        'ou mas entao então pode posso podem existe tem algum alguma algo sobre site pagina página ' +
        'fala falar diz dizer explica explique quero queria gostaria saber sabe').split(' ')).map(normalizar));
    // palavras que valem a pena mesmo sendo curtas
    const CURTAS = new Set(['ia', 'ti', 'rs', 'ui', 'bd']);
    const SINONIMOS = {
        ia: ['inteligencia', 'artificial'], inteligencia: ['ia'],
        preco: ['valor', 'investimento', 'custo', 'hora'], valor: ['preco', 'investimento'], custa: ['preco', 'valor', 'investimento'],
        quanto: ['preco', 'valor'], contato: ['email', 'contato', 'whatsapp'], email: ['contato'], whatsapp: ['contato'],
        prof: ['professor'], professor: ['docente', 'educador'], docente: ['professor'],
        formacao: ['formacao', 'curso', 'oficina', 'capacitacao'], curso: ['formacao', 'oficina'], capacitacao: ['formacao'],
        treinamento: ['mentoria', 'formacao'], mentoria: ['treinamento'],
        jogo: ['jogo', 'material'], gratuito: ['gratis', 'freebie'], gratis: ['gratuito'],
        lgpd: ['dados', 'privacidade'], privacidade: ['lgpd'], bncc: ['habilidade', 'competencia'],
        mips: ['pipeline', 'processador', 'instrucao'], livro: ['guia', 'ebook'], ebook: ['guia', 'livro'], guia: ['livro']
    };

    function normalizar(t) {
        return String(t).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    }
    function radical(p) {
        if (p.length <= 3) return p;
        const regras = [['coes', 'cao'], ['soes', 'sao'], ['oes', 'ao'], ['aes', 'ao'], ['ais', 'al'], ['eis', 'el'],
            ['ois', 'ol'], ['ns', 'm'], ['res', 'r'], ['zes', 'z'], ['mente', ''], ['s', '']];
        for (const [fim, troca] of regras) {
            if (p.endsWith(fim) && p.length - fim.length >= 3) { p = p.slice(0, -fim.length) + troca; break; }
        }
        // masculino/feminino e vogal final: professor/professora, aluno/aluna
        if (p.length > 4 && /[aoe]$/.test(p)) p = p.slice(0, -1);
        return p;
    }
    function palavras(t) {
        // siglas com pontos (P.A.C.T.O.) viram uma palavra só (pacto)
        const n = normalizar(t).replace(/\b(?:[a-z]\.){2,}[a-z]?\b/g, m => m.replace(/\./g, ''));
        return n.match(/[a-z0-9]+/g) || [];
    }
    function termos(t) {
        const out = [];
        for (const p of palavras(t)) {
            if (PARADAS.has(p)) continue;
            if (p.length < 3 && !CURTAS.has(p) && !/^\d+$/.test(p)) continue;
            out.push(radical(p));
        }
        return out;
    }
    function esc(t) {
        return String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    /* ---------- índice ---------- */
    let indice = null, carregando = null;
    function carregar() {
        if (indice) return Promise.resolve(indice);
        if (carregando) return carregando;
        carregando = fetch(BASE + 'indice.json', { cache: 'no-cache' })
            .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(d => { indice = preparar(d); return indice; })
            .catch(e => { carregando = null; throw e; });
        return carregando;
    }
    function preparar(d) {
        const docs = d.trechos.map(t => {
            const pag = d.paginas[t.p];
            // título da página e da seção contam mais que o texto corrido
            const tf = new Map();
            const somar = (lista, peso) => { for (const w of lista) tf.set(w, (tf.get(w) || 0) + peso); };
            somar(termos(t.x), 1);
            somar(termos(t.h), 2);
            somar(termos(pag.t), 1.5);
            let tam = 0; for (const v of tf.values()) tam += v;
            return { pag, h: t.h, a: t.a, x: t.x, tf, tam };
        });
        const df = new Map();
        for (const doc of docs) for (const w of doc.tf.keys()) df.set(w, (df.get(w) || 0) + 1);
        const media = docs.reduce((s, doc) => s + doc.tam, 0) / Math.max(docs.length, 1);
        return { docs, df, media, n: docs.length };
    }
    function expandir(q) {
        const base = termos(q);
        const extra = [];
        for (const p of palavras(q)) {
            const s = SINONIMOS[p] || SINONIMOS[radical(p)];
            if (s) for (const w of s) extra.push(radical(w));
        }
        return { base: [...new Set(base)], extra: [...new Set(extra)].filter(w => !base.includes(w)) };
    }
    function buscar(q) {
        const { docs, df, media, n } = indice;
        const { base, extra } = expandir(q);
        if (!base.length && !extra.length) return { resultados: [], base };
        const k1 = 1.4, b = 0.7;
        const pesoTermo = new Map();
        for (const w of base) pesoTermo.set(w, 1);
        for (const w of extra) pesoTermo.set(w, 0.45);
        const resultados = [];
        for (const doc of docs) {
            let s = 0, achou = 0;
            for (const [w, peso] of pesoTermo) {
                // aceita também palavras que começam pelo termo (ex.: "simul" acha "simulador")
                let f = doc.tf.get(w) || 0;
                if (!f && w.length >= 5) for (const [k, v] of doc.tf) if (k.startsWith(w)) { f = v * 0.6; break; }
                if (!f) continue;
                if (peso === 1) achou++;
                const nw = df.get(w) || 1;
                const idf = Math.log(1 + (n - nw + 0.5) / (nw + 0.5));
                s += peso * idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * doc.tam / media));
            }
            if (s > 0) {
                // bônus quando a pergunta inteira aparece no trecho
                if (base.length > 1) s *= 1 + 0.5 * (achou / base.length);
                resultados.push({ doc, s });
            }
        }
        resultados.sort((a, c) => c.s - a.s);
        return { resultados, base };
    }

    /* ---------- montagem da resposta ---------- */
    function frases(t) {
        return t.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ú0-9"“(])/).map(f => f.trim()).filter(Boolean);
    }
    function melhoresFrases(texto, alvo) {
        const lista = frases(texto);
        if (lista.length <= 2) return texto;
        const notas = lista.map(f => { const ts = new Set(termos(f)); let s = 0; for (const w of alvo) if (ts.has(w)) s++; return s; });
        let melhor = 0;
        for (let i = 1; i < lista.length; i++) if (notas[i] > notas[melhor]) melhor = i;
        let fim = melhor + 1;
        let txt = lista.slice(melhor, fim).join(' ');
        while (fim < lista.length && txt.length < 220) { txt += ' ' + lista[fim]; fim++; }
        return (melhor > 0 ? '… ' : '') + txt + (fim < lista.length ? ' …' : '');
    }
    function destacar(texto, alvo) {
        const set = new Set(alvo);
        return esc(texto).replace(/[A-Za-zÀ-ÿ0-9]+/g, p => {
            const r = radical(normalizar(p));
            return (p.length > 2 || CURTAS.has(normalizar(p))) && set.has(r) ? '<mark>' + p + '</mark>' : p;
        });
    }
    function link(doc) {
        let u = doc.pag.u;
        if (doc.a && !/^(win-|conteudo$)/.test(doc.a)) u += '#' + doc.a;
        return u;
    }
    function nomeLocal(doc) {
        return doc.h && doc.h !== doc.pag.t ? doc.pag.t + ' › ' + doc.h : doc.pag.t;
    }

    const CONVERSA = [
        [/^(oi+|ola|bom dia|boa tarde|boa noite|e ai|hello|hi)\b[\s!.?]*$/,
            '<p>Olá. Posso ajudar a encontrar conteúdos do site: formação de professores em IA, mentoria, blog, guia IA pra Prof, materiais didáticos e simuladores. Escreva sua pergunta.</p>'],
        [/^(obrigad[oa]|valeu|agradeco)/,
            '<p>Disponha. Se quiser, faça outra pergunta.</p>'],
        [/(email|e-mail|contato|whatsapp|telefone|falar com)/,
            '<p>O contato é pelo e-mail <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a> ou pelo <a href="https://www.linkedin.com/in/ohtopico">LinkedIn</a>. ' +
            'Para escolas e redes, veja também <a href="/formacao-continuada/">Formação continuada de professores em IA</a> e <a href="/mentoria/">Mentoria</a>.</p>'],
        [/(quem e voce|o que e voce|voce e (uma )?ia|como voce funciona|chatgpt)/,
            '<p>Sou um assistente de busca do site. Procuro a resposta nos textos publicados aqui e mostro o trecho com o link para a página. Não uso inteligência artificial generativa e não envio sua pergunta para nenhum servidor.</p>']
    ];

    function responder(q) {
        const nq = normalizar(q).trim();
        for (const [re, html] of CONVERSA) if (re.test(nq)) return html;

        const { resultados, base } = buscar(q);
        const alvo = base.length ? base : expandir(q).extra;
        // palavras da pergunta que não aparecem em nenhuma página do site
        const ausentes = base.filter(w => !indice.df.has(w));
        const cobertos = base.length - ausentes.length;
        if (!resultados.length || resultados[0].s < 1.2 || (base.length >= 2 && cobertos * 2 <= base.length)) {
            const nomes = palavras(q).filter(p => ausentes.includes(radical(p)));
            let html = '<p>Não encontrei ' + (nomes.length ? 'nada sobre ' + esc(nomes.map(p => '"' + p + '"').join(', ')) : 'isso') +
                ' nos conteúdos do site. Tente com outras palavras, por exemplo o nome de um tema, de um jogo ou de um simulador.</p>';
            const perto = paginasDistintas(resultados.filter(r => r.s >= 1.2), 3);
            if (perto.length) html += '<p class="assist-fonte">Páginas com assuntos próximos:</p>' + listaLinks(perto);
            return html + '<p class="assist-fonte">Para outras dúvidas: <a href="mailto:contato@ohtopico.com.br">contato@ohtopico.com.br</a>.</p>';
        }
        const top = resultados[0].doc;
        let html = '<p>Encontrei isto em <a href="' + esc(link(top)) + '">' + esc(nomeLocal(top)) + '</a>:</p>' +
            '<blockquote>' + destacar(melhoresFrases(top.x, alvo), alvo) + '</blockquote>';

        // segundo trecho da mesma página quando completa a resposta
        const mesma = resultados.slice(1, 4).find(r => r.doc.pag === top.pag && r.s > resultados[0].s * 0.7 && r.doc.x !== top.x);
        if (mesma) html += '<blockquote>' + destacar(melhoresFrases(mesma.doc.x, alvo), alvo) + '</blockquote>';

        const outras = paginasDistintas(resultados.filter(r => r.s >= resultados[0].s * 0.35 && r.doc.pag !== top.pag), 3);
        if (outras.length) html += '<p class="assist-fonte">Também fala disso:</p>' + listaLinks(outras);
        return html;
    }
    function paginasDistintas(lista, max) {
        const out = [], vistas = new Set();
        for (const r of lista) {
            if (out.length >= max) break;
            if (vistas.has(r.doc.pag.u)) continue;
            vistas.add(r.doc.pag.u);
            out.push(r.doc);
        }
        return out;
    }
    function listaLinks(docs) {
        return '<ul>' + docs.map(d => '<li><a href="' + esc(link(d)) + '">' + esc(nomeLocal(d)) + '</a></li>').join('') + '</ul>';
    }

    /* ---------- interface ---------- */
    const SUGESTOES = [
        'Como funciona a formação continuada em IA?',
        'O que pode ir no prompt pela LGPD?',
        'Quais simuladores existem?',
        'Como funciona a mentoria?',
        'Onde baixo o guia IA pra Prof?'
    ];
    const ICONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>';

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = BASE + 'assistente.css' + (script && script.src.includes('?') ? script.src.slice(script.src.indexOf('?')) : '');
    document.head.appendChild(css);

    const raiz = document.createElement('div');
    raiz.className = 'assist';
    if (MARGEM) raiz.style.setProperty('--a-base', MARGEM + 'px');
    raiz.innerHTML =
        '<button type="button" class="assist-abrir" aria-haspopup="dialog" aria-controls="assist-painel">' + ICONE + '<span>Pergunte ao site</span></button>' +
        '<section class="assist-painel" id="assist-painel" role="dialog" aria-labelledby="assist-titulo" hidden>' +
        '<header class="assist-topo"><div><h2 id="assist-titulo">Pergunte ao site</h2>' +
        '<p>Respostas com trechos dos conteúdos de Júlia Roberta Quoos Alves publicados aqui.</p></div>' +
        '<button type="button" class="assist-limpar" title="Recomeçar a conversa">Limpar</button>' +
        '<button type="button" class="assist-fechar" aria-label="Fechar">✕</button></header>' +
        '<div class="assist-conversa" aria-live="polite"></div>' +
        '<form class="assist-form" autocomplete="off"><label class="sr" for="assist-pergunta">Sua pergunta</label>' +
        '<input id="assist-pergunta" type="text" maxlength="200" placeholder="Escreva sua pergunta" enterkeyhint="send">' +
        '<button type="submit">Enviar</button></form>' +
        '<p class="assist-aviso">Busca feita no seu navegador, sem enviar a pergunta a terceiros.</p>' +
        '</section>';

    const abrir = raiz.querySelector('.assist-abrir');
    const painel = raiz.querySelector('.assist-painel');
    const conversa = raiz.querySelector('.assist-conversa');
    const form = raiz.querySelector('.assist-form');
    const campo = raiz.querySelector('#assist-pergunta');

    let historico = [];
    function salvar() {
        try { sessionStorage.setItem(CHAVE, JSON.stringify({ aberto: !painel.hidden, historico: historico.slice(-20) })); } catch (e) { }
    }
    function mensagem(quem, html) {
        const div = document.createElement('div');
        div.className = 'assist-msg ' + quem;
        div.innerHTML = html;
        conversa.appendChild(div);
        conversa.scrollTop = conversa.scrollHeight;
        return div;
    }
    function boasVindas() {
        mensagem('site', '<p>Olá. Pergunte sobre qualquer conteúdo do site e eu mostro o trecho que responde, com o link para a página.</p>');
        const sug = document.createElement('div');
        sug.className = 'assist-sugestoes';
        for (const s of SUGESTOES) {
            const b = document.createElement('button');
            b.type = 'button'; b.textContent = s;
            b.addEventListener('click', () => perguntar(s));
            sug.appendChild(b);
        }
        conversa.appendChild(sug);
    }
    function perguntar(q) {
        q = q.trim();
        if (!q) return;
        const minha = mensagem('voce', '<p>' + esc(q) + '</p>');
        const espera = mensagem('site', '<p>Procurando…</p>');
        carregar().then(() => {
            const html = responder(q);
            espera.innerHTML = html;
            historico.push([q, html]);
            salvar();
            // mostra a resposta a partir do começo (a pergunta fica no topo)
            conversa.scrollTop = minha.offsetTop - conversa.offsetTop - 8;
        }).catch(() => {
            espera.innerHTML = '<p>Não consegui carregar os conteúdos agora. Tente de novo em instantes.</p>';
        });
    }
    function mostrar(aberto, focar) {
        painel.hidden = !aberto;
        abrir.hidden = aberto;
        abrir.setAttribute('aria-expanded', String(aberto));
        if (aberto) { carregar().catch(() => { }); if (focar) campo.focus(); }
        else if (focar) abrir.focus();
        salvar();
    }

    abrir.addEventListener('click', () => mostrar(true, true));
    raiz.querySelector('.assist-fechar').addEventListener('click', () => mostrar(false, true));
    raiz.querySelector('.assist-limpar').addEventListener('click', () => {
        historico = []; conversa.innerHTML = ''; boasVindas(); salvar(); campo.focus();
    });
    painel.addEventListener('keydown', e => { if (e.key === 'Escape') mostrar(false, true); });
    form.addEventListener('submit', e => { e.preventDefault(); const q = campo.value; campo.value = ''; perguntar(q); });

    // a conversa continua ao trocar de página (na mesma aba)
    let salvo = null;
    try { salvo = JSON.parse(sessionStorage.getItem(CHAVE)); } catch (e) { }
    boasVindas();
    if (salvo && Array.isArray(salvo.historico)) {
        historico = salvo.historico;
        for (const [q, html] of historico) { mensagem('voce', '<p>' + esc(q) + '</p>'); mensagem('site', html); }
    }

    function montar() {
        document.body.appendChild(raiz);
        mostrar(!!(salvo && salvo.aberto), false);
    }
    if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
})();
