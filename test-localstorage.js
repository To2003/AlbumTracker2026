const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  // Go to local dev server
  await page.goto('http://localhost:3000');
  
  // Wait for the page to load
  await page.waitForSelector('.lucide-plus', { timeout: 5000 });
  
  // Click the first plus button to add a sticker
  await page.click('.lucide-plus');
  
  // Wait a bit for state update and save
  await new Promise(r => setTimeout(r, 1000));
  
  // Check local storage
  const ls1 = await page.evaluate(() => localStorage.getItem('album-mundial-2026-collection'));
  console.log('LS before reload:', ls1);
  
  // Reload page
  await page.reload();
  await page.waitForSelector('.lucide-plus', { timeout: 5000 });
  
  // Check local storage again
  const ls2 = await page.evaluate(() => localStorage.getItem('album-mundial-2026-collection'));
  console.log('LS after reload:', ls2);
  
  await browser.close();
})();
