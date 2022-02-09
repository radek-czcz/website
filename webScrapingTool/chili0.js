const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const request = require('request');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePrice(url) {

  const browser = await puppeteer.launch({
    //headless: false,
    headless: true,
    /*devtools: false,*/
    //slowMo:300,
    //devtools: true,
    args: ['--no-sandbox', '--incognito']
  });

  console.log("browser loaded");
  const page2 = await browser.newPage();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  await page.waitForSelector('.all-wrapper-a');
  console.log("page loaded");

  function getHref(inp) {
    const href = inp.map(inp => inp.href);
    const name = inp.map(inp => inp.querySelector('div span.ellipsis-footer span span').textContent);
    //inp.forEach(inp => inp.click());
    //return inp.slice(0,3);
    return [href, name];
  }

  const ev = await page.$$eval('.all-wrapper-a', getHref);

  const href = ev[0];
  const name = ev[1];
  //const href = await page.$$('.all-wrapper-a')
  //.then(inp => inp)
  //.slice(0,3)

  let price = [];
  for (nth = 1; nth < href.length; nth++) {

    await page.goto(href[nth], {
      waitUntil: 'networkidle2',
    })
    await page.waitForSelector('#open-purchase-options-cta-VOD48h');
    const clBuy = await page.evaluate((inp) => {
      document.querySelector('#open-purchase-options-cta-VOD48h').click();

      const hdPrice = document.querySelector('#HD-option-price').textContent;
      //console.log(hdPrice.textContent);
      //console.log(hdPrice.querySelector('#HD-option-price').textContent);
      return hdPrice
    }, price)
    //console.log(clBuy);
    price.push(parseFloat(clBuy.replace(',','.')));
  };

  const srcs3 = price.map(function(a, i) {return a.toString().padEnd(6,' ') + " " + name[i]});
  console.log(srcs3.sort((a, b) => {return a - b}));

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

  await browser.close();
}



//„MALINKI” ŚWIĘTUJĄ URODZINY ZOSI
scrapePrice('https://pl.chili.com/showcase/premiery/2f66e28a-cdbc-48ab-87e6-8da6fb9161b8?orderBy=PRICE_ASC');
