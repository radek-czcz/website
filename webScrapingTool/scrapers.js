
const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){
  const browser = await puppeteer.launch({headless: true});
  const page  = await browser.newPage();
  await page.goto(url);

  const[el] = await page.$x('//*[@id="xbox-lowest-1"]');
  /*for (const runner in el) {
    console.log(runner);
  }*/
  const text = await el.getProperty('textContent');
  const rawText = await text.jsonValue();
  console.log(rawText);
  browser.close();
}

scrapePrice('https://www.futbin.com/22/player/791/renato-sanches');
