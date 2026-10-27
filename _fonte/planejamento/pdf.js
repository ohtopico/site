// Converte os HTML de saida/ em PDF dentro de freebies/. Uso: node _fonte/planejamento/pdf.js
const path = require('path');
const { chromium } = require('playwright');
const SAIDA = path.join(__dirname, 'saida');
const DEST = path.join(__dirname, '..', '..', 'freebies');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const nome of ['informatica', 'matematica']) {
    await page.goto('file://' + path.join(SAIDA, `planejamento-mensal-${nome}.html`), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({
      path: path.join(DEST, `planejamento-mensal-${nome}.pdf`), format: 'A4', landscape: true, printBackground: true, tagged: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: '<div style="width:100%;font-size:7px;font-family:sans-serif;text-align:right;padding-right:12mm;color:#4a4a4a">Júlia Roberta Quoos Alves · ohtopico.com.br · <span class="pageNumber"></span>/<span class="totalPages"></span></div>',
    });
    console.log(nome, 'ok');
  }
  await browser.close();
})();
