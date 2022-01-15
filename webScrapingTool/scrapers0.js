
const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){
  const browser = await puppeteer.launch({headless: true});
  console.log(typeof browser.constructor);
  const page  = await browser.newPage();
  await page.goto(url);

  const el = await page.$$("span.tooltipstered");
  /*console.log(typeof el);*/
  for (let runner of el) {
    let text = await runner.getProperty('textContent');
    let rawText = await text.jsonValue();
    console.log(rawText);
  };

  browser.close();
}

scrapePrice('https://www.futbin.com/22/player/791/renato-sanches');
