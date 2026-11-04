/* Gera material-adaptado/glossario/glossario-libras.pdf com todos os cartões (A4, fundo branco)
   e material-adaptado/glossario/parede/cartazes-libras-parede.pdf (um cartaz A4 por termo).
     node _fonte/glossario-libras/pdf.js             PDF
     node _fonte/glossario-libras/pdf.js --previa    também salva PNGs da página em _fonte/glossario-libras/previa/
   Rode na raiz do site, depois de python _fonte/glossario-libras/gerar.py. Precisa do playwright. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const SAIDA = path.join(RAIZ, 'material-adaptado', 'glossario');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const previa = process.argv.includes('--previa');

const servidor = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const arq = path.join(RAIZ, p);
  if (!arq.startsWith(RAIZ) || !fs.existsSync(arq)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
  fs.createReadStream(arq).pipe(res);
});

(async () => {
  await new Promise(r => servidor.listen(0, r));
  const porta = servidor.address().port;
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1100, height: 1200 } });
  await pagina.goto(`http://localhost:${porta}/material-adaptado/glossario/`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({ path: path.join(SAIDA, 'glossario-libras.pdf'), preferCSSPageSize: true, printBackground: true });
  await pagina.goto(`http://localhost:${porta}/material-adaptado/glossario/parede/`, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({ path: path.join(SAIDA, 'parede', 'cartazes-libras-parede.pdf'), preferCSSPageSize: true, printBackground: true });
  if (previa) {
    const dir = path.join(__dirname, 'previa');
    fs.mkdirSync(dir, { recursive: true });
    await pagina.screenshot({ path: path.join(dir, 'pagina.png'), fullPage: true });
    await pagina.setViewportSize({ width: 390, height: 900 });
    await pagina.screenshot({ path: path.join(dir, 'celular.png') });
    await pagina.goto(`http://localhost:${porta}/material-adaptado/glossario/?termos=fracao,metade,igual`, { waitUntil: 'networkidle' });
    await pagina.screenshot({ path: path.join(dir, 'filtro.png'), fullPage: true });
  }
  if (previa) {
    const dir = path.join(__dirname, 'previa');
    await pagina.setViewportSize({ width: 1100, height: 1200 });
    await pagina.goto(`http://localhost:${porta}/material-adaptado/glossario/parede/`, { waitUntil: 'networkidle' });
    await pagina.screenshot({ path: path.join(dir, 'parede.png'), fullPage: false });
  }
  await navegador.close();
  servidor.close();
  console.log('PDFs do glossário e dos cartazes gerados');
})();
