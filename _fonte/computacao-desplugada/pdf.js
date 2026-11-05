/* Gera um PDF por atividade desplugada (folha do estudante, para recortar e orientações) e confere se alguma folha transborda.
     node _fonte/computacao-desplugada/pdf.js             todas
     node _fonte/computacao-desplugada/pdf.js hanoi       só as que têm "hanoi" no nome
     node _fonte/computacao-desplugada/pdf.js --previa    também salva PNGs das folhas em _fonte/computacao-desplugada/previa/
   Rode na raiz do site, depois de python _fonte/computacao-desplugada/gerar.py. Precisa do playwright. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const PASTA = path.join(RAIZ, 'computacao-desplugada');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
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
  let problemas = 0;
  for (const slug of fs.readdirSync(PASTA).filter(s => s !== 'assets' && fs.statSync(path.join(PASTA, s)).isDirectory()).filter(s => !filtro || s.includes(filtro)).sort()) {
    await pagina.goto(`http://localhost:${porta}/computacao-desplugada/${slug}/`, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    const cheias = await pagina.evaluate(() => Array.from(document.querySelectorAll('.folha')).map(f => {
      f.style.zoom = '';
      const rod = f.querySelector('.folha-rodape');
      const antes = rod.previousElementSibling;
      const fim = antes ? antes.getBoundingClientRect().bottom : 0;
      const fora = rod.getBoundingClientRect().bottom - f.getBoundingClientRect().bottom;
      return { versao: f.dataset.versao, sobra: Math.round(Math.min(rod.getBoundingClientRect().top - fim, -fora)), larg: f.scrollWidth - f.clientWidth };
    }));
    for (const c of cheias) {
      const aviso = c.sobra < 4 || c.larg > 0 ? '  <-- TRANSBORDA' : '';
      if (aviso) problemas++;
      console.log(`${slug} ${c.versao}: sobra ${c.sobra}px${c.larg > 0 ? `, largura +${c.larg}px` : ''}${aviso}`);
    }
    if (previa) {
      const dir = path.join(__dirname, 'previa');
      fs.mkdirSync(dir, { recursive: true });
      const els = await pagina.$$('.folha');
      for (let i = 0; i < els.length; i++) await els[i].screenshot({ path: path.join(dir, `${slug}-${i + 1}.png`) });
    }
    await pagina.emulateMedia({ media: 'print' });
    await pagina.pdf({ path: path.join(PASTA, slug, `${slug}.pdf`), preferCSSPageSize: true, printBackground: true });
    await pagina.emulateMedia({ media: 'screen' });
  }
  await navegador.close();
  servidor.close();
  if (problemas) { console.log(`${problemas} folha(s) transbordando`); process.exitCode = 1; }
})();
