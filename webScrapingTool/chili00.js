const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function scrapePrice(url) {



   const browser =  puppeteer.launch({
      //headless: false,
      headless: false,
      /*devtools: false,*/
      //slowMo:300,
      //devtools: true,
      args: ['--no-sandbox', '--incognito']
   })



const fpage = browser.then(result => {
   return result.newPage();
});


const spage = fpage.then(result => {
   return result.goto(url, {
        waitUntil: 'domcontentloaded'}).waitForSelector('.all-wrapper-a').catch((e) => console.log(e));
});



//const selectr = spage./*then(result => result.*/waitForSelector('.all-wrapper-a').catch((e) => console.log(e));

var fur = spage.then(result => {
   result.evaluate(() => {
   const sel = 'div.price-footer';
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
})})

  /*function getHref(inp) {
    const href = inp.map(inp => inp.href);
    const name = inp.map(inp => inp.querySelector('div span.ellipsis-footer span span').textContent);
    console.log([href, name]);
    return [href, name];
  }

  const ev = page1.then(result => {
     const geth = result.$$eval('.all-wrapper-a', getHref);
     console.log(geth);
     return geth;
  });


  const href = ev[0];
  const name = ev[1];

  let price = [];
  nth = 1;

  let wait;



  function going() {return new Promise((resolve, reject) => {
     wait = setInterval(go, 9000, href, nth);
     wait2 = setInterval(() => {
        if (nth >= href.length) {
           clearInterval(wait);
           console.log('interval cleared');
           clearInterval(wait2);
           resolve();
        } else console.log('nth=' + nth + ' is yet not >= ' + 3)
     }, 1000)
  })}

  const go = async function go(urls, count) {
      console.log(page1.title + "\r\n" + url +  "\r\n" + count + ' ' + nth);
      if (nth < urls.length){
      await page1.goto(urls[nth], {waitUntil: 'domcontentloaded'});
      await page1.waitForSelector('#open-purchase-options-cta-VOD48h');

      const clBuy = await page1.evaluate((result) => {
      document.querySelector('#open-purchase-options-cta-VOD48h').click();
      const hdPrice = document.querySelector('#HD-option-price').textContent;
      return hdPrice;
      });
      console.log(clBuy);
      price.push(parseFloat(clBuy.replace(',','.')));
      count++;
      nth++;
   } else {
        console.log('end of loop');
     }
  }



      const srcs3 = price.map(function(a, i) {return a.toString().padEnd(6,' ') + " " + name[i]});
  console.log(srcs3.sort((a, b) => {
     if (a > b) {
     return 1;
  }
     else {
        return -1;
     }
  }));*/




  //console.log('all pages opened')

  //console.log('all pages closed');



  //browser().close();

  }

scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
