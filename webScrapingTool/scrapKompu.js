const dw = require('./DataFileWriter');
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function scrapePriceKomputronik(url){

   let pageToUse;
   let browserToUse;

// LOAD BROWSER
  const browser = puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--incognito'],
      devtools: true,
      //slowMo:300
      //args: ['--no-sandbox', '--incognito']
   });

// LOAD NEW TAB
   const page = browser.then(result => {
      console.log("browser loaded");
      browserToUse = result;
      return result.newPage();
   })

// GO TO URL
   const goURL = page.then(result => {
      pageToUse = result;
      return result.goto(url, {
         waitUntil: 'domcontentloaded'
      });
   });

// HELP LOGS
   const info = goURL.then(() => {
      //console.log(goURL);
      //console.log(page);
   })

// SCROLLING
   const scroll = goURL.then(() => pageToUse.evaluate(() => new Promise((resolve) => {
      var scrollTop = -1;
      const interval = setInterval(() => {
         window.scrollBy(0, 300);
         if(document.documentElement.scrollTop !== scrollTop) {
            scrollTop = document.documentElement.scrollTop;
            return;
         }
         clearInterval(interval);
         resolve();
      }, 300);
   })));


   const dataExtract = scroll.then(() => {

      // SELECTORS' STRINGS
      var str = [
         'ul.product-entry2-wrap li.product-entry2 .pe2-head a.blank-link',
         'ul.product-entry2-wrap li.product-entry2 span.price span.proper',
         '',
         ''
      ]

      //FILTERS' STRINGS
      var filterString = [
         'tp*link',
         ''
      ]

      // WAITING FOR SELECTOR
      const wait1 = /*scroll.then(() => */pageToUse.waitForSelector(str[0]/*'ul.product-entry2-wrap li.product-entry2'*/);

      // ALL PRODUCT FRAMES
      const frames = wait1.then(() => pageToUse.$$eval(str[0], (arg1) => {
         //console.log(arg1.length);
         return arg1.map(arg2 => (arg2.textContent).trim());
      }));

      const prices = wait1.then(() => pageToUse.$$eval(str[1], (arg1) => {
         //console.log(arg1.length);
         return arg1.map(arg2 => (arg2.childNodes[0].textContent).trim());
      }));

      //frames.then(result => console.log(result));
      //prices.then(result => console.log(result));

      const arrPricesAndNames = Promise.all([frames, prices]).then(result => {
         const srcs2 = result[1].map(function(a, i) {return a.toString().replace(',','.').padEnd(6,' ') + " " + result[0][i]});
         const srcs3 = srcs2.sort((a, b) => {
          if (a > b) {
          return 1;
         }
          else {
              return -1;
          }
         })
         return srcs3
         }
      );

      return arrPricesAndNames.then(result => {
         dw.setData(result);
         dw.appendToDataFile();
         return;
         }
      )

   })

   dataExtract.then(() => browserToUse.close()).then(console.log('finished successfully'));

}

module.exports = {scrapePriceKomputronik};
scrapePriceKomputronik('https://www.komputronik.pl/category/16831/adaptery-bluetooth.html');
