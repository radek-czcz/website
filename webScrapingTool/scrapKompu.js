
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url){

  const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--incognito'],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
   });


   console.log("browser loaded");

   const page = await browser.newPage();
   await page.goto(url, {
      waitUntil: 'networkidle2'
   });
   console.log("page loaded");

// SCROLLING
   await page.evaluate(() => new Promise((resolve) => {
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
   }));

   const dataExtract = await page.evaluate(() => {

// SELECTORS' STRINGS
      var str = [
      'product-entry2',
      '.pe2-head .blank-link.at-product-name-0',
      '',
      ''
      ]

//FILTERS' STRINGS
      var filterString = [
         'remington',
         '.icon-box-bold'
      ]


// ALL PRODUCT FRAMES
      const productBoxes = Array.from(document.querySelectorAll(str[0]));
      console.log(productBoxes);



      //productBoxes = Array.from(document.querySelectorAll(str[0] + ' ' + str[1]))
// FILTERED (MANUFACTURER) ALL PRODUCT FRAMES
         //.filter(inp => inp.textContent.toLowerCase().includes(filterString[0]))
// FILTERED (ONLY AVALIBLE TO BUY) ALL PRODUCT FRAMES - falsy expr: !inp.querySelector('.icon-box-bold')
         //.filter(inp => !inp.querySelector(filterString[1]));
// MAPPED (TO PRODUCTS NAMES UNTRIMMED)
      const namesUntrimmed = productBoxes.map(inp => inp.querySelector(str[1]));
      console.log(namesUntrimmed);  /*

// UNTRIMMED PRODUCT'S NAMES
      const names = namesUntrimmed.map(inp => inp.textContent);
//PRICE EXTRACT
      const pricesSelection = productBoxes.map(function(inp) {
         const promoPrice = inp.querySelector('div.price-with-code-emblem');
         // CHECK IF PROMO-PRICE
         if (promoPrice) {
            return promoPrice.querySelector('span.whole');
         } else {
            return inp.querySelector(str[3]);
         }
      });
//PRICE PADDING AND NULL-CHECK (PRICE)
      const pricesPadded = pricesSelection.map(function(inp) {
         if (inp === null)
            return "----";
         else
            return inp.textContent.padStart(4,' ');
      });

//JOINING PRICE AND PRODUCTS' NAMES TOGETHER
      var namesAndPrices = [];
      namesAndPrices = names.map(function(a, i) {return pricesPadded[i] + " " + a.trim()});
      return namesAndPrices;

   });

   console.log(dataExtract.length);
   console.log('set of srcs:');
   console.log(dataExtract.sort((a,b) => {
      return a.substring(0,4).trim() - b.substring(0,4).trim();
   }
));

//for (i = 0;  i<dataExtract.length; i++) {
function append(arrayOfStrings) {
console.log('before append ' + dataExtract[arrayOfStrings]);
fs.appendFile('mediaExpertDataFile.txt', dataExtract[arrayOfStrings] + "\r\n", () => {
console.log('after append ' + dataExtract[arrayOfStrings])
if (++arrayOfStrings < dataExtract.length)
append(arrayOfStrings);
});
}
//}
let date = new Date()
/*let day = date.getDate();
let month = date.getMonth()+1;
let year = date.getFullYear();
let fullDate = `${year}.${month}.${day}`;*/

await fs.appendFile('mediaExpertDataFile.txt', date.getTime() + "\r\n", () => append(0))
;

await page.close();
await browser.close();

}

module.exports = {scrapePrice};
scrapePrice('https://www.komputronik.pl/category/16831/adaptery-bluetooth.html?prod%5B%5D=16&prod%5B%5D=234&filter=1&sort=1&by=f_price_10&showBuyActiveOnly=1')
