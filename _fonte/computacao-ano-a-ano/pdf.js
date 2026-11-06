/* PDFs do ano a ano: caderno do estudante e guia do professor de cada ano. Também confere se alguma folha transborda.
     node _fonte/computacao-ano-a-ano/pdf.js            todos os anos
     node _fonte/computacao-ano-a-ano/pdf.js 1          só o 1º ano
     node _fonte/computacao-ano-a-ano/pdf.js 1 --previa também salva PNGs das folhas em _fonte/computacao-ano-a-ano/previa/ (fora do git)
   Rode na raiz do site, depois de python _fonte/computacao-ano-a-ano/gerar.py. Precisa do playwright. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const PASTA = path.join(RAIZ, 'computacao-ano-a-ano');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
const args = process.argv.slice(2);
const previa = args.includes('--previa');
const filtro = args.find(a => !a.startsWith('--'));

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
  const pagina = await navegador.newPage({ viewport: { width: 1000, height: 1200 } });
  await pagina.route(/googletagmanager/, r => r.abort());
  let problemas = 0;
  const anos = fs.readdirSync(PASTA).filter(s => /^\d-ano$/.test(s)).filter(s => !filtro || s.startsWith(filtro + '-')).sort();
  for (const ano of anos) {
    for (const [arq, nome] of [['imprimir-caderno.html', 'caderno-do-estudante'], ['imprimir-guia.html', 'guia-do-professor']]) {
      await pagina.goto(`http://localhost:${porta}/computacao-ano-a-ano/${ano}/${arq}`, { waitUntil: 'networkidle' });
      await pagina.evaluate(() => document.fonts.ready);
      const cheias = await pagina.evaluate(() => Array.from(document.querySelectorAll('.folha')).map((f, i) => {
        f.style.zoom = '';
        const rod = f.querySelector('.folha-rodape');
        const antes = rod.previousElementSibling;
        const fim = antes ? antes.getBoundingClientRect().bottom : 0;
        const fora = rod.getBoundingClientRect().bottom - f.getBoundingClientRect().bottom;
        return { i, titulo: (f.querySelector('.folha-titulo') || {}).textContent, sobra: Math.round(Math.min(rod.getBoundingClientRect().top - fim, -fora)), larg: f.scrollWidth - f.clientWidth };
      }));
      for (const c of cheias) {
        if (c.sobra < 4 || c.larg > 0) { problemas++; console.log(`${ano} ${nome} folha ${c.i} (${c.titulo}): sobra ${c.sobra}px${c.larg > 0 ? `, largura +${c.larg}px` : ''}  <-- TRANSBORDA`); }
      }
      if (previa) {
        const dir = path.join(__dirname, 'previa');
        fs.mkdirSync(dir, { recursive: true });
        const els = await pagina.$$('.folha');
        for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `${ano}-${nome}-${String(i).padStart(2, '0')}.png`) });
      }
      await pagina.emulateMedia({ media: 'print' });
      const n = ano.split('-')[0];
      await pagina.pdf({ path: path.join(PASTA, ano, `computacao-${n}-ano-${nome}.pdf`), preferCSSPageSize: true, printBackground: true });
      await pagina.emulateMedia({ media: 'screen' });
      console.log(`${ano} ${nome}: ${cheias.length} folhas`);
    }
  }
  await navegador.close();
  servidor.close();
  if (problemas) { console.log(`${problemas} folha(s) transbordando`); process.exitCode = 1; }
})();
