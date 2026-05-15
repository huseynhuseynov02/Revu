const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const out = { mobile: null, desktop: null };
  try {
    const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const context = await browser.newContext({ viewport: { width: 412, height: 915 } });
    const page = await context.newPage();
    const url = process.env.URL || 'http://localhost:3000';
    const axePath = require.resolve('axe-core/axe.min.js');
    await page.addInitScript({ content: fs.readFileSync(axePath, 'utf8') });

    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle' });

    console.log('Running axe-core (mobile)');
    const mobileResults = await page.evaluate(async () => {
      return await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2aa', 'best-practice'] } });
    });
    out.mobile = mobileResults;
    fs.writeFileSync('playwright-a11y-mobile.json', JSON.stringify(mobileResults, null, 2));

    // desktop
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.reload({ waitUntil: 'networkidle' });
    console.log('Running axe-core (desktop)');
    const desktopResults = await page.evaluate(async () => {
      return await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2aa', 'best-practice'] } });
    });
    out.desktop = desktopResults;
    fs.writeFileSync('playwright-a11y-desktop.json', JSON.stringify(desktopResults, null, 2));

    await browser.close();
    console.log('Saved reports: playwright-a11y-mobile.json, playwright-a11y-desktop.json');
    process.exit(0);
  } catch (err) {
    console.error('Audit failed:', err);
    process.exit(2);
  }
})();
