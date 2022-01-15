
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
  const page  = await browser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});

  var str = 'li a.photo.fancybox'


  const issueSrcs = await page.evaluate(() => {
    const srcs = Array.from(
      document.querySelectorAll('li a.photo.fancybox')).map(inp => 'https://psloneczko.szkolnastrona.pl/' + inp.getAttribute('href')
    );

    return srcs;
});

console.log(issueSrcs.length);
console.log(issueSrcs);

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

  //console.log(downloadAll());
  downloadAll();

  await page.close();
  await browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI

scrapePrice('https://psloneczko.szkolnastrona.pl/index.php?c=modules&mod=mod_gallery&type=art&id=2474');
