import * as puppeteer from 'puppeteer-extra'
import * as fs from 'fs'

async function scrapePrice(url){

  const browser = await puppeteer.launch({
      //headless: false,
      args: ['--no-sandbox', '--incognito'],
      /*devtools: false,*/
      slowMo:300
      //args: ['--no-sandbox', '--incognito']
   });
   console.log('abc')

}
