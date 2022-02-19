const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url) {

const br = function() {
   return new Promise((resolve, reject) => {
   const br1 = puppeteer.launch({
     //headless: false,
     headless: false,
     /*devtools: false,*/
     //slowMo:300,
     //devtools: true,
     args: ['--no-sandbox', '--incognito']
  })
  resolve(br1);
})}

const browser = await br();

console.log("browser loaded");
const page = browser.newPage();
console.log("tab opened");
const page1 = await browser.newPage();
console.log("tab opened");
await page1.goto(url, {
  waitUntil: 'networkidle2',
});
console.log("page opened");

  await page1.waitForSelector('.all-wrapper-a');
  console.log("selector loaded");

  await page1.evaluate(() => new Promise((resolve) => {
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
}, 300);
}));


  function getHref(inp) {
    const href = inp.map(inp => inp.href);
    const name = inp.map(inp => inp.querySelector('div span.ellipsis-footer span span').textContent);
    //inp.forEach(inp => inp.click());
    //return inp.slice(0,3);
    return [href, name];
  }

  const ev = await page1.$$eval('.all-wrapper-a', getHref);

  const href = ev[0];
  const name = ev[1];
  //const href = await page.$$('.all-wrapper-a')
  //.then(inp => inp)
  //.slice(0,3)

  let price = [];
  nth = 1;
//console.log(page.title + href[nth] + nth);

async function go(url, count) {
   console.log(page1.title + "\r\n" + url +  "\r\n" + count + ' ' + nth);
   if (count < href.length){
   await page1.goto(url, {waitUntil: 'domcontentloaded'});
   await page1.waitForSelector('#open-purchase-options-cta-VOD48h');

   const clBuy = await page1.evaluate((result) => {
   document.querySelector('#open-purchase-options-cta-VOD48h').click();
   const hdPrice = document.querySelector('#HD-option-price').textContent;
   return hdPrice;
   });
   console.log(clBuy);


   console.log(92);
   price.push(parseFloat(clBuy.replace(',','.')));
   console.log(94);
   console.log('before ' + count);
   count++;
   nth++;
   console.log('after ' + count);

} else clearInterval();
}

function go2() {
   return new Promise((resolve, reject) => {
const wait = setInterval(go, 10000, href[nth], nth);
})
}

await go2();

  const srcs3 = price.map(function(a, i) {return a.toString().padEnd(6,' ') + " " + name[i]});
  console.log(srcs3.sort((a, b) => {
     if (a > b) {
     return 1;
  }
     else {
        return -1;
     }
  }));

  //const pagesAll = await openAll(href)
  console.log('all pages opened')
  //console.log(href);
  //await page2.bringToFront();

  //await page2.waitForSelector('#open-purchase-options-cta-VOD48h');
  /*const clBuy = await page2.$eval('#open-purchase-options-cta-VOD48h', (inp) => {
    inp.click();
  });*/



  //const allPages = await browser.pages()
  //allPages.forEach(inp => inp.close());

  //await page.close();

  console.log('all pages closed');



  browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
