
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

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
  const page  = await browser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  var issueSrcs;
  console.log(issueSrcs);
  //downloadAll();
  await page.close();
  await browser.close();



issueSrcs = await page.evaluate(() => {

  var str = [
  'div.cat-prod-row.js_category-list-item.js_clickHashData.js_man-track-event',
  'a.go-to-product.js_conv.js_clickHash.js_seoUrl span',
  'span.price-format span.price span.value'
  ]
  //var str = 'div.category-list-body.js_category-list-body.js_search-results.js_products-list-main > span.price-format span.price span.value';
  const srcs = await Array.from(
  //document.querySelectorAll(str)).map(inp => inp.getAttribute('textContent').jsonValue()
  document.querySelectorAll(str[0]));//.map(inp => inp.textContent);
  //document.querySelectorAll(str)).evaluate(inp => inp.textContent, inp

  /*const srcs2 = Array.from(
  //document.querySelectorAll(str[0] + ' > ' + str[2])).map(inp => inp.textContent
  );*/
  //console.log(srcs2);
  console.log('there are ' + srcs.lenght + 'products found');
  for (nth=0; nth < srcs.length; nth++) {
    console.log(typeof srcs[nth]);
    let mainElArr = srcs[nth].querySelectorAll(str[1]);
    console.log(srcs[nth].textContent);
  }
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
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://www.ceneo.pl/Maszynki_do_strzyzenia/p:Moser;n150;0112-0.htm');
