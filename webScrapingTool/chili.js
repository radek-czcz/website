
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){

  const browser = await puppeteer.launch({
        headless: false,
        /*devtools: false,*/
        //slowMo:1000,
        args: ['--no-sandbox', '--incognito']});
        console.log("browser loaded");
  const page  = await browser.newPage();
  await page.goto(url, {
  waitUntil: 'networkidle2',
});

await page.waitForSelector('span.ellipsis-footer');
console.log("page loaded");
  //await page.waitForSelector('.price-with-code-emblem');

  /*await page.evaluate(() => new Promise((resolve) => {
  var scrollTop = -1;
  const interval = setInterval(() => {
    window.scrollBy(0, 100);
    if(document.documentElement.scrollTop !== scrollTop) {
      scrollTop = document.documentElement.scrollTop;
      return;
    }
    clearInterval(interval);
    resolve();
  }, 10);
}));*/

const dataExtract = await page.evaluate(() => {

  var str = [
  'div.showcase-contents-container',
  'div.wrapper-desktop',
  'div.footer-icon',
  'div.price-footer',
  'span.ellipsis-footer.white.testo-4 span span'
]

  const allProducts = window.setTimeout(sub1, 5000);

  return allProducts;
  function sub1(){
  const allProducts = document.querySelector(str[0]);
  return allProducts;
  }
  //return allProducts;
  const productBoxes = Array.from(allProducts.querySelectorAll(str[2]));
  return productBoxes;
  var productsPriceFiltered = productBoxes.filter(inp => inp.querySelector(str[3]).toLowerCase().includes('6,90'));
  const names = productsPriceFiltered.map(inp => inp.querySelector(str[4]).textContent);
  const prices = productsPriceFiltered.map(inp => inp.querySelector(str[3]).textContent);

  var srcs3 = [];
  srcs3 = names.map(function(a, i) {return prices[i].padStart(5,' ') + " " + a.trim()});
  return srcs3;

  return namesSelection;
});

  console.log(dataExtract);
  /*console.log(dataExtract.length);
  console.log('set of srcs:');
  console.log(dataExtract.sort((a,b) => {
    return a.substring(0,4).trim() - b.substring(0,4).trim();
  }));*/

  await page.close();
  await browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8');
