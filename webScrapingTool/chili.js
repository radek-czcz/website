
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



  await page.evaluate(() => new Promise((resolve) => {
  sel = 'div.price-footer';
  var movieCount = 0;
  var scrollTop = -1;
  const interval = setInterval(() => {

    window.scrollBy(0, 10000);
    if(document.documentElement.scrollTop !== scrollTop && movieCount != Array.from(document.querySelectorAll(sel)).filter(inp => inp.textContent.toLowerCase().includes('6,90')).length){ //|| movieCount !== document.querySelectorAll(sel).filter(inp => inp.textContent.toLowerCase().includes('6,90')).length) {
      scrollTop = document.documentElement.scrollTop;
      movieCount = Array.from(document.querySelectorAll(sel)).filter(inp => inp.textContent.toLowerCase().includes('6,90')).length;
      return;
    }
    clearInterval(interval);
    resolve();
  }, 2000);
}));

const dataExtract = await page.evaluate(() => {

  var str = [
  'div.showcase-contents-container',
  'div.wrapper-desktop',
  'div.footer-icon',
  'div.price-footer',
  'span.ellipsis-footer.white.testo-4 span span'
  ]

  const allProducts = document.querySelector(str[0]);
  //const allProducts = document.querySelector(str[1]).textContent;
  //return allProducts;
  const productBoxes = Array.from(allProducts.querySelectorAll(str[2]));
  //return productBoxes.map(inp => inp.textContent);
  var productsPriceFiltered = productBoxes.filter(inp => inp.querySelector(str[3]).textContent.toLowerCase().includes('6,90'));
  return productsPriceFiltered.map(inp => inp.querySelector(str[4]).textContent);
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
scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
