/* Imprime os moldes táteis em PDF, na pasta de cada ficha (<slug>-moldes-tateis.pdf).
     node _fonte/braille/moldes.js            todos
     node _fonte/braille/moldes.js reta       só os que têm "reta" no nome
     node _fonte/braille/moldes.js desplugada só os de uma área (matematica, computacao ou desplugada)
     node _fonte/braille/moldes.js --previa   também salva PNGs das páginas em _fonte/braille/previa/
   Rode na raiz do site, depois de python _fonte/braille/gerar.py. Precisa do playwright. */
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const RAIZ = path.resolve(__dirname, '..', '..');
const MOLDES = path.join(__dirname, 'moldes');
const PASTAS = { matematica: 'matematica-adaptada/fichas', computacao: 'computacao-adaptada/fichas', desplugada: 'computacao-desplugada' };
const indice = JSON.parse(fs.readFileSync(path.join(__dirname, 'indice.json'), 'utf8'));
const args = process.argv.slice(2);
const previa = args.includes('--previa');
const filtro = args.find(a => !a.startsWith('--'));

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 800, height: 1130 } });
  let n = 0;
  for (const [slug, info] of Object.entries(indice)) {
    if (!info.figuras || (filtro && !slug.includes(filtro) && info.area !== filtro)) continue;
    const pasta = path.join(RAIZ, PASTAS[info.area], slug);
    await pagina.goto('file://' + path.join(MOLDES, `${slug}.html`), { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    if (previa) {
      fs.mkdirSync(path.join(__dirname, 'previa'), { recursive: true });
      await pagina.screenshot({ path: path.join(__dirname, 'previa', `${slug}-moldes.png`), fullPage: true });
    }
    await pagina.pdf({ path: path.join(pasta, `${slug}-moldes-tateis.pdf`), format: 'A4', preferCSSPageSize: true, printBackground: true });
    n++;
  }
  await navegador.close();
  console.log(`${n} PDFs de moldes táteis`);
})();
