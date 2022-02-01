
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function download(uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve);
    });
  });
}

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

const issueSrcs = await page.evaluate(() => {

  var str = [
  'div.list-items',
  'div.offer-box',
  'a.is-animate.spark-link',
  'div.main-price.is-big span.whole'
]


  srcs = document.querySelector(str[0]);
  srcs2 = Array.from(srcs.querySelectorAll(str[1]));

  //var productFramesFiltered = srcs.filter(inp => inp.textContent.toLowerCase().includes('moser'));
  var productFramesFiltered = srcs2.filter(inp => inp.textContent.toLowerCase().includes('remington'));

  //selecting all currently avalible products, using falsy expr. !inp.querySelector('.icon-box-bold')
  var productFramesFiltered2 = productFramesFiltered.filter(inp => !inp.querySelector('.icon-box-bold'));

  const allProductsFrames = productFramesFiltered2.map(inp => inp.querySelector(str[2]));
  //const srcsConst = Array.from(document.querySelectorAll(str[1]));
  const srcsName1 = allProductsFrames.map(inp => inp.textContent);

  //const srcsName2 = srcsName1.filter(inp => inp.toLowerCase()).includes('moser');
  const srcsPriceee = productFramesFiltered2.map(function(inp) {
    const promoPrice = inp.querySelector('div.price-with-code-emblem');
    if (promoPrice) {
      return promoPrice.querySelector('span.whole');
    } else {
      return inp.querySelector(str[3]);
    }
  });

  const srcsPrice1 = srcsPriceee.map(function(inp) {
    if (inp === null)
      return "---";
    else
      return inp.textContent;
  });

  //const srcsPrice2 = srcsPrice1.filter(inp => inp.toLowerCase()).includes('moser');

  var srcs3 = [];
  srcs3 = srcsName1.map(function(a, i) {return srcsPrice1[i] + " " + a.trim()});
  return srcs3;


  //document.querySelectorAll(str)).evaluate(inp => inp.textContent, inp

  for (nth=0; nth < srcs.length; nth++) {
    console.log(typeof srcs[nth]);
    let mainElArr = srcs[nth].querySelectorAll(str[1]);
    console.log(srcs[nth].textContent);
  }

  /*const srcs3 = Array.from(
  //document.querySelectorAll(str[0] + ' > ' + str[2])).map(inp => inp.textContent
);*/
  //console.log(srcs3);
  return allProductsFrames;
});

//console.log(issueSrcs.length);
//console.log(issueSrcs);

  /*for (let runner = 1; runner < 3;  runner++) {
  issueSrcs[runner].click;
};*/

function downloadAll(){
  for (let runner in issueSrcs){
    var dir = "C:/Users/Kamila i Radek/Desktop/javaScript/Nowy folder (2)/aa/";
    var newStr = issueSrcs.map(inp => dir + inp.substring(inp.lastIndexOf('/')+1));
  }
  for (nth=1; nth < issueSrcs.length; nth++){
    //console.log(issueSrcs[nth]);
    //console.log(newStr[nth]);
    download(issueSrcs[nth], newStr[nth]);
  }
    return newStr;
}

  console.log(issueSrcs.length);
  console.log('set of srcs:');
  console.log(issueSrcs);
  //downloadAll();

  await page.close();
  await browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://www.mediaexpert.pl/agd-male/zdrowie-i-uroda/strzyzarki/philips.remington');
