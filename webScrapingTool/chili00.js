const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url) {

   var browserToClose;

   const browser =  puppeteer.launch({
      //headless: false,
      headless: false,
      //devtools: false,
      //slowMo:300,
      devtools: true,
      args: ['--no-sandbox', '--incognito']
      }
   )

   try {

   const page = browser.then(result => {
      console.log("browser loaded");
      browserToClose = result;
      return result.newPage();
      }
   )

   let name;
   let price = [];
   var tabToUse;

   const pageGoTo = page.then(result => {
      tabToUse = result;
      return result.goto(url, {waitUntil: 'networkidle2'});
      }
   )

   var selectorWait = Promise.all([pageGoTo, page]).then(result => {
      console.log('before wait');
      result[1].waitForSelector('.all-wrapper-a');
      console.log('end wait');
      return result[1];
      }
   )

   var prices = selectorWait.then(result => {

      var pricesArray;
      pricesArray = result.evaluate(() => {
         const sel = 'div.price-footer';
         var movieCount = 0;
         var scrollTop = -1;
         let interval;
         var allMoviesPrices;

         function insidePrices() {return new Promise((resolve) => {
            interval = setInterval(scrollFuncAndPrice, 700);
            //console.log(interval);

            function scrollFuncAndPrice(inp) {
               window.scrollBy(0, 10000);
               allMoviesPrices = Array.from(document.querySelectorAll(sel))
               .filter(inp => inp.textContent.toLowerCase().includes('6,90'));
               //console.log('scrollTop: ' + document.documentElement.scrollTop + "\r\n", 'local var scrollTop: ' + scrollTop + "\r\n" , 'movieCount: ' + movieCount  + "\r\n", 'current movieCount: ' + Array.from(document.querySelectorAll(sel)).filter(inp => inp.textContent.toLowerCase().includes('6,90')).length  + "\r\n" + "\r\n")
               if(
                  document.documentElement.scrollTop !== scrollTop
                  && movieCount != Array.from(document.querySelectorAll(sel))
                  .filter(inp => inp.textContent.toLowerCase().includes('6,90')).length
               ){
                  scrollTop = document.documentElement.scrollTop;
                  movieCount = Array.from(document.querySelectorAll(sel))
                  .filter(inp => inp.textContent.toLowerCase().includes('6,90')).length;
                  return;
               }

               console.log('cleraing interval and resolve');
               clearInterval(interval);
               resolve(allMoviesPrices.map(inp => inp.textContent));
            }
         })}

         var inInt = insidePrices();
         var res = inInt.then((result) => {
            //console.log('after inner interval');
            //console.log(result);
         })
         return inInt;
      })

         pricesArray.then(result => console.log('pricesArray ' + result.length));
         console.log("outer resolve");
         return pricesArray;
   })



  const urlsAndNamesAndPrices = Promise.all([prices, page]).then(result => {

     function getHref(inp) {
       const href = inp.map(inp => inp.href);
       const name = inp.map(inp => inp.querySelector('div span.ellipsis-footer span span').textContent);
       console.log([href, name]);
       return [href, name];
      }

     console.log('getting elements');
     let getNamesAndUrls = result[1].$$eval('.all-wrapper-a', getHref);

     const namUrPr = getNamesAndUrls.then(result1 => {
        console.log(result1);
        result1[2] = result[0];
        return result1;
     });

     return namUrPr.then(result => result);
  })


const ev2 = urlsAndNamesAndPrices.then(result => {


   function going(inp) {return new Promise((resolve, reject) => {


      nth = 1;
      var counter = result[2].length;
      //var counter = 5;
      let sec = 1;

      async function go(urls, count) {
            console.log("\r\n" + url +  "\r\n" + count + ' ' + nth);
            console.log('there are ' + (counter - nth) + ' pages left to visit');
            if (nth < counter){
               const gt = tabToUse.goto(urls[nth], {waitUntil: 'domcontentloaded'});
               const wt = gt.then(() => tabToUse.waitForSelector('#open-purchase-options-cta-VOD48h'));

               function myClick(){return new Promise((resolve, reject) => {
                  tabToUse.evaluate(() => {console.log('clicking');
                                    setTimeout(() => {document.querySelector('#open-purchase-options-cta-VOD48h').click();
                                 /*resolve()*/}, 1200);}
               ).then(() => {resolve();
               console.log('click resolved')})
            })}

               function select() {
                  console.log('selecting');
                  return tabToUse.$eval("#HD-option-price", inp => inp.textContent);
               }

               const clBuy = wt.then(() => myClick());
               const sele = clBuy.then(() => {
                  console.log('waiting');
                  return tabToUse.waitForSelector("#HD-option-price");
               });
               const priceRec = sele.then(result => select());
               /*.then(() => select()).catch(e => console.log(e));*/

               priceRec.then(result => {
                  price.push(parseFloat(result.replace(',','.')));
                  console.log('price ' + result.replace(',','.') + ' added to results' );
                  count++;
                  nth++;
                  sec = 1;
               });

               clBuy.then(() => setTimeout(go, 7000, inp, nth));
         } else {
              console.log('end of loop');
           }
        }


      let wait;

      wait = setTimeout(go, 7000, inp, nth);
      wait2 = setInterval(() => {
         if (nth >= counter) {
            clearInterval(wait);
            console.log('interval cleared');
            clearInterval(wait2);
            resolve();
         } else {console.log(sec);
         sec++;}
      }, 1000)
   }
)}

name = result[1];
return going(result[0]);

});

ev2.then(result => {
   const srcs3 = price.map(function(a, i) {return a.toString().padEnd(6,' ') + " " + name[i]});
console.log(srcs3.sort((a, b) => {
 if (a > b) {
 return 1;
}
 else {
     return -1;
 }
}));
  browserToClose.close();
})
} catch (e) {
   console.log('closing browser');
   browser.close();}
  }

scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
