
const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){
  const browser = await puppeteer.launch({
        headless: true,
        /*devtools: false,*/
        /*slowMo:1000,*/
        args: ['--no-sandbox', '--incognito']});
  const page  = await browser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  for (let runner in page) {
  console.log(runner);
  }
  var str = 'li.nav-item.dropdown'
  var navPlatform = await page.$(str);
  console.log(navPlatform.keys)
  for (let runner in navPlatform) {
  console.log(runner);
  }
  await navPlatform.hover();
  await page.close();
  await browser.close();
}

scrapePrice('https://www.futbin.com/22/players?page=1&version=gold_rare&nation=54&league=13&sort=likes&order=desc');
