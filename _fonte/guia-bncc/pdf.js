// Gera o PDF do guia do professor, a capa (JPG e WEBP), a imagem de compartilhamento e prévias de páginas.
// Uso (da raiz):  python _fonte/guia-bncc/gerar.py && node _fonte/guia-bncc/pdf.js
// Para em erro se algum conteúdo passar da página.
const path = require('path'), fs = require('fs'), http = require('http');
const { chromium } = require('playwright');
const RAIZ = path.join(__dirname, '..', '..');
const DEST = path.join(RAIZ, 'guia-computacao-bncc');
const PDF = 'guia-professor-computacao-bncc.pdf';
const TIPOS = { '.html': 'text/html', '.css': 'text/css', '.woff2': 'font/woff2' };

const srv = http.createServer((req, res) => {
  const f = path.join(RAIZ, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(RAIZ) || !fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
  res.setHeader('Content-Type', TIPOS[path.extname(f)] || 'application/octet-stream'); res.end(fs.readFileSync(f));
}).listen(0, async () => {
  const URL = `http://localhost:${srv.address().port}/_fonte/guia-bncc/guia.html`;
  fs.mkdirSync(DEST, { recursive: true });
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await pg.goto(URL, { waitUntil: 'networkidle' });
  await pg.evaluate(() => document.fonts.ready);
  const fontes = await pg.evaluate(() => ['600 20px Fredoka', '400 12px Lexend'].map(f => document.fonts.check(f)));
  if (fontes.includes(false)) throw new Error('Fonte não carregou: ' + fontes);

  // Conteúdo que passa do rodapé
  const estouros = await pg.evaluate(() => [...document.querySelectorAll('.pg')].map((p, i) => {
    const lim = p.getBoundingClientRect().bottom - 17 * 3.78;   // acima do rodapé (17 mm)
    let pior = 0;
    p.querySelectorAll('*').forEach(e => { if (e.closest('.rodape')) return; const r = e.getBoundingClientRect(); if (r.height && r.bottom > lim + 1) pior = Math.max(pior, r.bottom - lim); });
    if (!p.querySelector('.rodape')) return null; return pior > 0 ? `página ${i + 1}: ${Math.round(pior / 3.78)} mm` : null;
  }).filter(Boolean));
  if (estouros.length) { console.error('Passou da página:\n' + estouros.join('\n')); if (!process.argv.includes('--forcar')) process.exit(1); }

  await pg.pdf({ path: path.join(DEST, PDF), format: 'A4', printBackground: true, tagged: true, preferCSSPageSize: true });
  const n = await pg.evaluate(() => document.querySelectorAll('.pg').length);

  // Imagens a partir das páginas
  const foto = async (i, escala) => {
    const p2 = await b.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: escala });
    await p2.goto(URL, { waitUntil: 'networkidle' }); await p2.evaluate(() => document.fonts.ready);
    const el = (await p2.$$('.pg'))[i];
    const buf = await el.screenshot({ type: 'png' }); await p2.close(); return buf;
  };
  const capa = await foto(0, 1.6);
  const prevs = {};
  for (const i of [14, 15, 4, 25]) prevs[i] = await foto(i, 1.2);

  // Converte com uma página HTML (sem dependências extras): capa JPG/WEBP, OG 1200x630 e prévias WEBP
  const cv = await b.newPage();
  const conv = async (buf, w, h, tipo, q) => cv.evaluate(async ([src, w, h, tipo, q]) => {
    const img = new Image(); img.src = src; await img.decode();
    const c = document.createElement('canvas'); c.width = w; c.height = h || Math.round(w * img.height / img.width);
    const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height); x.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL(tipo, q).split(',')[1];
  }, ['data:image/png;base64,' + buf.toString('base64'), w, h, tipo, q]);
  const grava = (nome, b64) => fs.writeFileSync(path.join(DEST, nome), Buffer.from(b64, 'base64'));
  grava('capa-guia-professor-computacao-bncc.jpg', await conv(capa, 900, 0, 'image/jpeg', 0.86));
  grava('capa-guia-professor-computacao-bncc.webp', await conv(capa, 600, 0, 'image/webp', 0.85));
  grava('pagina-atividade.webp', await conv(prevs[14], 700, 0, 'image/webp', 0.82));
  grava('pagina-folha.webp', await conv(prevs[15], 700, 0, 'image/webp', 0.82));
  grava('pagina-eixo.webp', await conv(prevs[4], 700, 0, 'image/webp', 0.82));
  grava('pagina-atividade-2.webp', await conv(prevs[25], 700, 0, 'image/webp', 0.82));

  // OG: capa à direita, título à esquerda
  const og = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await og.goto(`http://localhost:${srv.address().port}/_fonte/guia-bncc/og.html`, { waitUntil: 'networkidle' });
  await og.evaluate(src => { document.getElementById('capa').src = src; }, 'data:image/png;base64,' + capa.toString('base64'));
  await og.waitForTimeout(300); await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: path.join(DEST, 'og-guia-computacao-bncc.jpg'), type: 'jpeg', quality: 86 });

  console.log('ok', n, 'páginas,', fs.statSync(path.join(DEST, PDF)).size, 'bytes');
  await b.close(); srv.close();
});
