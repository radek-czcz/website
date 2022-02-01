
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){

  const browser = await puppeteer.launch({
        headless: true,
        /*devtools: false,*/
        //slowMo:1000,
        args: ['--no-sandbox', '--incognito']});
        console.log("browser loaded");
  const page  = await browser.newPage();
  await page.goto(url, {
  waitUntil: 'networkidle2',
});

  //await page.waitForSelector('.price-with-code-emblem');
  console.log("page loaded");

  await page.evaluate(() => new Promise((resolve) => {
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
}));

const dataExtract = await page.evaluate(() => {

  var str = [
  'div.list-items',
  'div.offer-box',
  'a.is-animate.spark-link',
  'div.main-price.is-big span.whole'
]


  allProducts = document.querySelector(str[0]);
  productBoxes = Array.from(allProducts.querySelectorAll(str[1]));

  //var productFramesFiltered = srcs.filter(inp => inp.textContent.toLowerCase().includes('moser'));
  var productsNamed = productBoxes.filter(inp => inp.textContent.toLowerCase().includes('remington'));

  //selecting all currently avalible products, using falsy expr. !inp.querySelector('.icon-box-bold')
  var productsAvalible = productsNamed.filter(inp => !inp.querySelector('.icon-box-bold'));

  const namesSelection = productsAvalible.map(inp => inp.querySelector(str[2]));
  //const srcsConst = Array.from(document.querySelectorAll(str[1]));
  const names = namesSelection.map(inp => inp.textContent);

  //const srcsName2 = names.filter(inp => inp.toLowerCase()).includes('moser');
  const pricesSelection = productsAvalible.map(function(inp) {
    const promoPrice = inp.querySelector('div.price-with-code-emblem');
    if (promoPrice) {
      return promoPrice.querySelector('span.whole');
    } else {
      return inp.querySelector(str[3]);
    }
  });

  const prices = pricesSelection.map(function(inp) {
    if (inp === null)
      return "----";
    else
      return inp.textContent.padStart(4,' ');
  });

  //const srcsPrice2 = prices.filter(inp => inp.toLowerCase()).includes('moser');

  var srcs3 = [];
  srcs3 = names.map(function(a, i) {return prices[i] + " " + a.trim()});
  return srcs3;


  //document.querySelectorAll(str)).evaluate(inp => inp.textContent, inp

  /*for (nth=0; nth < srcs.length; nth++) {
    console.log(typeof srcs[nth]);
    let mainElArr = srcs[nth].querySelectorAll(str[1]);
    console.log(srcs[nth].textContent);
  }*/

  /*const srcs3 = Array.from(
  //document.querySelectorAll(str[0] + ' > ' + str[2])).map(inp => inp.textContent
);*/
  //console.log(srcs3);
  return namesSelection;
});

//console.log(dataExtract.length);
//console.log(dataExtract);

  /*for (let runner = 1; runner < 3;  runner++) {
  dataExtract[runner].click;
};*/

  console.log(dataExtract.length);
  console.log('set of srcs:');
  console.log(dataExtract.sort((a,b) => {
    return a.substring(0,4).trim() - b.substring(0,4).trim();
  }));

  await page.close();
  await browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://www.mediaexpert.pl/agd-male/zdrowie-i-uroda/strzyzarki/philips.remington');
