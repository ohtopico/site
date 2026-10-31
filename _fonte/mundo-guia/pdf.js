// Gera mundo/professores/guia-mundo-professores.pdf a partir de guia.html, com imagens tiradas do próprio Mundo.
// Uso: node _fonte/mundo-guia/pdf.js
const path = require('path'), fs = require('fs'), http = require('http');
const { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..', '..');
const DEST = path.join(RAIZ, 'mundo', 'professores', 'guia-mundo-professores.pdf');
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webmanifest': 'application/manifest+json' };
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const srv = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(RAIZ, p);
  if (!f.startsWith(RAIZ) || !fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
  res.setHeader('Content-Type', TIPOS[path.extname(f)] || 'application/octet-stream'); res.end(fs.readFileSync(f));
}).listen(0, async () => {
  const URL = `http://localhost:${srv.address().port}`;
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1200, height: 760 }, deviceScaleFactor: 2, serviceWorkers: 'block' });
  const png = async (pg, opts) => 'data:image/png;base64,' + (await pg.screenshot(opts)).toString('base64');

  // vila e placa
  const pg = await ctx.newPage();
  await pg.goto(URL + '/mundo/', { waitUntil: 'networkidle' }); await pg.waitForTimeout(800);
  const vila = await png(pg);
  const dados = await pg.evaluate(() => {
    const D = MUNDO_DEBUG, B = window.PERGUNTAS_NPC || {};
    return D.fases.map(f => ({ nome: f.nome, sub: f.sub, temas: (B[f.id] || []).map(b => ({ tema: b.tema, n: b.lista.length, habs: b.habs || [] })) }));
  });
  await pg.evaluate(() => { const S = MUNDO_DEBUG.S(); S.turma.nome = 'Bia'; S.turma.codigo = '8A-2026'; S.resp['n:vila:0:0'] = true; S.resp['n:vila:1:2'] = true; MUNDO_DEBUG.lePlaca(MUNDO_DEBUG.fases[0]); });
  await pg.waitForTimeout(300);
  await pg.evaluate(() => document.querySelectorAll('.habs-det').forEach(d => { d.open = true; }));
  const placa = 'data:image/png;base64,' + (await (await pg.$('#dialogo .d-caixa')).screenshot()).toString('base64');

  // códigos de exemplo para o painel
  const nomes = [['Ana', 3], ['Bia', 2], ['Caio', 1], ['Davi', 0]], codes = [];
  for (const [nome, k] of nomes) {
    const c2 = await b.newContext({ serviceWorkers: 'block' }), p2 = await c2.newPage();   // cada estudante com o seu navegador
    await p2.goto(URL + '/mundo/', { waitUntil: 'networkidle' });
    codes.push(await p2.evaluate(([nome, k]) => {
      const S = MUNDO_DEBUG.S(); S.turma.nome = nome; S.turma.codigo = '8A-2026'; S.pontos = 120 + 90 * k; S.acertos = 8 + 6 * k;
      if (k === 0) S.resp['n:vila:1:1'] = true; else for (let i = 0; i < 2 + 3 * k; i++) S.resp[`n:vila:${i % 2}:${i}`] = true;
      if (k >= 2) S.resp['n:padroes:2:1'] = true;
      if (k >= 3) S.misterio = { aberto: true, pistas: {}, resolvido: true };
      return MUNDO_DEBUG.codigoTurma();
    }, [nome, k]));
    await c2.close();
  }
  const pp = await ctx.newPage();
  await pp.setViewportSize({ width: 1100, height: 900 });
  await pp.goto(URL + '/material-didatico/turma-mundo.html', { waitUntil: 'networkidle' });
  await pp.fill('#codes', codes.join('\n')); await pp.click('#add'); await pp.waitForTimeout(500);
  const h2 = await pp.evaluateHandle(() => [...document.querySelectorAll('h2')].find(x => x.textContent.includes('Habilidades da BNCC')));
  await h2.evaluate(e => e.scrollIntoView());
  await pp.addStyleTag({ content: 'header, .topbar, #topbar, [class*=topbar] { display: none !important; }' });
  await h2.evaluate(e => { const box = document.createElement('div'); box.id = 'foto-habs'; box.style.padding = '10px'; box.style.background = '#fff'; e.before(box); const p = e.nextElementSibling, t = p.nextElementSibling; box.append(e, p, t); });
  const painel = 'data:image/png;base64,' + (await (await pp.$('#foto-habs')).screenshot()).toString('base64');

  const vilas = '<table><tr><th>Vila</th><th>Ano ou tema</th><th>Temas das perguntas e habilidades</th></tr>' + dados.map(v => `<tr><td><b>${esc(v.nome)}</b></td><td>${esc(v.sub)}</td><td>${v.temas.map(t => `${esc(t.tema)} (${t.n})${t.habs.length ? ' ' + t.habs.map(h => `<span class="cod">${h}</span>`).join(' ') : ''}`).join('<br>')}</td></tr>`).join('') + '</table>';
  const html = fs.readFileSync(path.join(__dirname, 'guia.html'), 'utf8').replace('{{VILA}}', vila).replace('{{PLACA}}', placa).replace('{{PAINEL}}', painel).replace('{{VILAS}}', vilas);
  const out = await ctx.newPage();
  await out.setContent(html, { waitUntil: 'networkidle' }); await out.evaluate(() => document.fonts.ready);
  await out.pdf({ path: DEST, format: 'A4', printBackground: true, tagged: true, preferCSSPageSize: true, displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:7px;font-family:sans-serif;text-align:right;padding-right:15mm;color:#4a4a4a">Júlia Roberta Quoos Alves · ohtopico.com.br/mundo · <span class="pageNumber"></span>/<span class="totalPages"></span></div>' });
  console.log('ok', DEST, fs.statSync(DEST).size);
  await b.close(); srv.close();
});
