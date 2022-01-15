
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

  var str = 'li a.photo.fancybox span img'


  const issueSrcs = await page.evaluate(() => {
    const srcs = Array.from(
      document.querySelectorAll('li a.photo.fancybox span img')
    ).map((image) => image.getAttribute("src"));
    return srcs;
});

console.log(issueSrcs.length);
console.log(issueSrcs);

  for (let runner in page) {
  console.log(runner);
  }

  var navPlatform = await page.$$(str);
  console.log(navPlatform.length);

  await navPlatform[1].hover();
  /*await navPlatform[1].click();*/
  await page.close();
  await browser.close();
}

scrapePrice('https://psloneczko.szkolnastrona.pl/galeria,art,293,wolow-moje-miasto');
