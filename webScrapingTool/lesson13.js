const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function scrapePrice(url) {

   function browser() {
      const chrome = puppeteer.launch({
         //headless: false,
         headless: false,
         /*devtools: false,*/
         //slowMo:300,
         //devtools: true,
         args: ['--no-sandbox', '--incognito']
      });
      console.log('browser loading...');
      return chrome;
   }

   const page = browser().then(result => {
      console.log('browser loaded');
      return result.newPage();
   });

   /*const membs = page.then(result => {
      for (runner in result) {console.log(runner);}
   })*/

   const chili = page.then(result => {
      console.log('tab loaded');
      result.goto('https://pl.chili.com');
      for (runner in result) {console.log(rad + runner)}
      }
   );
   const rad = 'radek';
}


scrapePrice();
