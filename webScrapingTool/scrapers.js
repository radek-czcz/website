
const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function brow(){
  const browser = await puppeteer.launch({headless: true});
  await loop();


  async function scrapePrice(url){
    const page  = await browser.newPage();
    await page.goto(url);
    const[el] = await page.$x('//*[@id="xbox-lowest-1"]');
    /*for (const runner in el) {
      console.log(runner);
    }*/
    const text = await el.getProperty('textContent');
    const rawText = await text.jsonValue();
    console.log(rawText);
    await page.close();
  }

  function loop() {
    for (nth = 0; nth < pages.length; nth++) {
    scrapePrice(pages[nth]);
    }
  }
  browser.close();
}

pages = [
  'https://www.futbin.com/22/player/809/diogo-jota',
  'https://www.futbin.com/22/player/765/reguilon',
  'https://www.futbin.com/22/player/519/nathan-ake'
]

brow();
