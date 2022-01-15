
const puppeteer = require('puppeteer-extra')


const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){
  const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        slowMo: 2000,
        args: ['--no-sandbox', '--incognito']});
  console.log(typeof browser.constructor);
  const page  = await browser.newPage();

  await page.goto(url, {waitUntil: 'domcontentloaded'});


  const el = await page.$$("a.player_name_players_table");

  /*const pr = await page.$$('tr.player_tr_2 > td > span[class~="font-weight-bold"]');*/

  const pr = await page.$$('tr > td > span[class~="font-weight-bold"]');
  /*const text = await page.evaluate(element => element.textContent, element);*/
  console.log(el.length);
  console.log(pr.length);

  for (let nth=0; nth < el.length; nth++) {

    let text = await pr[nth].getProperty('textContent');
    let rawText = await text.jsonValue();
    /*console.log(rawText);*/

    let line = rawText;

    text = await el[nth].getProperty('textContent');
    rawText = await text.jsonValue();
    line = line + ' ' + rawText;

    console.log(line);

  }

  /*for (let runner of pr) {
    let text = await runner.getProperty('textContent');
    let rawText = await text.jsonValue();
    console.log(rawText);
  };*/

  await page.screenshot({
  path: "./screenshot.png",
  fullPage: true
  });

  await page.close();
  await browser.close();
}

scrapePrice('https://www.futbin.com/22/players?page=1&version=gold_rare&nation=54&league=13&sort=likes&order=desc');
