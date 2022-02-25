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
      args: ['--no-sandbox', '--incognito']}
   )

   console.log("browser loaded");

   const page1 = browser
      .then(result => {
      browserToClose = result;
      return result.newPage();}
   )

let name;
let price = [];
var tabToUse;

   const page2 = page1
      .then(result => {
      tabToUse = result;
      return result.goto(url, {waitUntil: 'networkidle2'});
   })


   var pAll = Promise.all([page2, page1])
      .then(result => {
         console.log('before wait');
         result[1].waitForSelector('.all-wrapper-a');
         console.log('end wait');
         return result[1];
      })

   var fur = pAll.then(result => {

      //return new Promise((resolve, reject) => {
      var evl;
      evl = result.evaluate(() => {
         const sel = 'div.price-footer';
         var movieCount = 0;
         var scrollTop = -1;
         let interval;
         var allMoviesFrames;

                  function innerInterval() {return new Promise((resolve) => {
                     interval = setInterval(innFunc, 700);
                     console.log(interval);

                        function innFunc(inp) {
                           window.scrollBy(0, 10000);
                           allMoviesFrames = Array.from(document.querySelectorAll(sel))
                           .filter(inp => inp.textContent.toLowerCase().includes('6,90'));
                           console.log('scrollTop: ' + document.documentElement.scrollTop + "\r\n", 'local var scrollTop: ' + scrollTop + "\r\n" , 'movieCount: ' + movieCount  + "\r\n", 'current movieCount: ' + Array.from(document.querySelectorAll(sel)).filter(inp => inp.textContent.toLowerCase().includes('6,90')).length  + "\r\n" + "\r\n")
                           if(
                              document.documentElement.scrollTop !== scrollTop
                              && movieCount != Array.from(document.querySelectorAll(sel))
                              .filter(inp => inp.textContent.toLowerCase().includes('6,90')).length)
                           {
                              scrollTop = document.documentElement.scrollTop;
                              movieCount = Array.from(document.querySelectorAll(sel))
                              .filter(inp => inp.textContent.toLowerCase().includes('6,90')).length;
                              return;
                           }

                           console.log('cleraing interval and resolve');
                           clearInterval(interval);
                           resolve(allMoviesFrames.map(inp => inp.textContent));
                        }

                  })}

         var inInt = innerInterval();
         var res = inInt.then((result) => {
            console.log('after inner interval');
            console.log(result);
         })
         return inInt;
            }
         )

         evl.then(result => console.log('evl ' + result.length))
         console.log("outer resolve");
         return evl;
   //}
      //)

})



  const ev = Promise.all([fur, page1]).then(result => {

     function getHref(inp) {
       const href = inp.map(inp => inp.href);
       const name = inp.map(inp => inp.querySelector('div span.ellipsis-footer span span').textContent);
       console.log([href, name]);
       return [href, name];
    }

     console.log('getting elements');
     let geth = result[1].$$eval('.all-wrapper-a', getHref);

     const newRes = geth.then(result1 => {
        console.log(result1);
        result1[2] = result[0];
        return result1;
     });

     return newRes.then(result => result);
  })


/*
  const href = ev[0];
  const name = ev[1];


  nth = 1;

  let wait;



  function going() {return new Promise((resolve, reject) => {
     const href = result[0];
     const name = result[1];

     let price = [];
     nth = 1;

     let wait;
     wait = setInterval(go, 9000, href, nth);
     wait2 = setInterval(() => {
        if (nth >= href.length) {
           clearInterval(wait);
           console.log('interval cleared');
           clearInterval(wait2);
           resolve();
        } else console.log('nth=' + nth + ' is yet not >= ' + 3)
     }, 1000)
  })}*/



const ev2 = ev.then(result => {


   function going(inp) {return new Promise((resolve, reject) => {


      nth = 1;
      //var counter = result[2].length;
      var counter = 5;

      async function go(urls, count) {
            console.log("\r\n" + url +  "\r\n" + count + ' ' + nth);
            if (nth < counter){
               await tabToUse.goto(urls[nth], {waitUntil: 'domcontentloaded'});
               await tabToUse.waitForSelector('#open-purchase-options-cta-VOD48h');

               const clBuy = await tabToUse.evaluate((result) => {
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


      let wait;
      wait = setInterval(go, 7000, inp, nth);
      wait2 = setInterval(() => {
         if (nth >= counter) {
            clearInterval(wait);
            console.log('interval cleared');
            clearInterval(wait2);
            resolve();
         } else console.log('nth=' + nth + ' is yet not >= ' + counter)
      }, 1000)

   })}

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





  //console.log('all pages opened')

  //console.log('all pages closed');





  }

scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
