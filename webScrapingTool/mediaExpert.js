
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
  await page.goto(url);
  console.log("page loaded");

const issueSrcs = await page.evaluate(() => {

  var str = [
  'div.list-items',
  'a.is-animate.spark-link',
  'span.whole'
]

  //var str = 'div.category-list-body.js_category-list-body.js_search-results.js_products-list-main > span.price-format span.price span.value';
  var srcs = Array.from(
  //document.querySelectorAll(str)).map(inp => inp.getAttribute('textContent').jsonValue()
  document.querySelectorAll(str[0]));//.map(inp => inp.textContent);

  //srcs = document.querySelector(str[0]);

  var srcsFiltered = srcs.filter(inp => inp.textContent.toLowerCase().includes('moser'));

  const srcsNameee = Array.from(srcs[0].querySelectorAll(str[1]));

  const srcsName = srcsFiltered.map(inp => inp.querySelector(str[1]));
  const srcsPrice = srcsFiltered.map(inp => inp.querySelector(str[2]));
  //const srcsConst = Array.from(document.querySelectorAll(str[1]));

  const srcsName1 = srcsName.map(inp => inp.textContent)
  //const srcsName2 = srcsName1.filter(inp => inp.toLowerCase()).includes('moser');

  const srcsPrice1 = srcsPrice.map(inp => inp.textContent)
  //const srcsPrice2 = srcsPrice1.filter(inp => inp.toLowerCase()).includes('moser');

  var srcs2 = [];
  srcs2 = srcsPrice1.map(function(a, i) {return a + " " + srcsName1[i]});

  //document.querySelectorAll(str)).evaluate(inp => inp.textContent, inp
  console.log('there are ' + srcs.lenght + 'products found');

  for (nth=0; nth < srcs.length; nth++) {
    console.log(typeof srcs[nth]);
    let mainElArr = srcs[nth].querySelectorAll(str[1]);
    console.log(srcs[nth].textContent);
  }

  /*const srcs2 = Array.from(
  //document.querySelectorAll(str[0] + ' > ' + str[2])).map(inp => inp.textContent
);*/
  //console.log(srcs2);
  return srcs;
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
scrapePrice('https://www.mediaexpert.pl/agd-male/zdrowie-i-uroda/strzyzarki/moser');
