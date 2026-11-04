// Converte saida/calendario-2027.html em PDF. Uso: node _fonte/calendario-2027/pdf.js
const path = require('path');
const { chromium } = require('playwright');
const ORIGEM = path.join(__dirname, 'saida', 'calendario-2027.html');
const DEST = path.join(__dirname, '..', '..', 'material-didatico', 'calendario-2027', 'calendario-2027-professor-computacao.pdf');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + ORIGEM, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: DEST, format: 'A4', printBackground: true, tagged: true, preferCSSPageSize: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font-size:7px;font-family:sans-serif;text-align:right;padding-right:11mm;color:#4a4a4a">Júlia Roberta Quoos Alves · ohtopico.com.br · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
  });
  await browser.close();
  console.log('ok', path.relative(process.cwd(), DEST));
})();
