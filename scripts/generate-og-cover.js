/**
 * Gera images/og-cover.png e images/og-cover-en.png a partir do próprio site,
 * tirando um "print" real da página (não é um design separado).
 *
 * Uso:
 *   npm install -D playwright
 *   npx playwright install chromium
 *   node scripts/generate-og-cover.js
 *
 * Rode isso sempre que mudar o layout do site, antes de dar commit/deploy.
 */
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const TARGETS = [
  { file: 'index.html', out: 'images/og-cover.png' },
  { file: 'index-en.html', out: 'images/og-cover-en.png' },
];

(async () => {
  const browser = await chromium.launch();
  for (const { file, out } of TARGETS) {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto('file://' + path.join(ROOT, file));
    // espera as fontes e a animação inicial do terminal assentarem antes do print
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(ROOT, out) });
    await page.close();
    console.log('gerado:', out);
  }
  await browser.close();
})();
