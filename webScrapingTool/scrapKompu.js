
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function scrapePrice(url){

   let pageToUse;

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
      console.log(goURL);
      console.log(page);
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


   const dataExtract = scroll.then(() => pageToUse.evaluate(() => {

      // SELECTORS' STRINGS
      var str = [
         'ul.product-entry2-wrap li.product-entry2',
         '',
         '',
         ''
      ]


      //FILTERS' STRINGS
      var filterString = [
         '',
         ''
      ]


      const wait1 = /*scroll.then(() => */pageToUse.waitForSelector(str[0]/*'ul.product-entry2-wrap li.product-entry2'*/)

      // ALL PRODUCT FRAMES
      productBoxes = wait1.then(() => {
         Array.from(document.querySelectorAll(str[0]))
         console.log(productBoxes.length);
      })
   }))
}

module.exports = {scrapePrice};
scrapePrice('https://www.komputronik.pl/category/16831/adaptery-bluetooth.html?prod%5B%5D=16&prod%5B%5D=234&filter=1&sort=1&by=f_price_10&showBuyActiveOnly=1');