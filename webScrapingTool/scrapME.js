const scrap1 = require('./meczajniki');
const scrapKomputronik = require('./scrapKompu')

async function all(){

//await scrap1.scrapePrice('https://www.mediaexpert.pl/agd-male/dla-dziecka/szczoteczki-elektryczne/oral-b.philips?sort=price_asc');
//await scrapKomputronik.scrapePriceKomputronik('https://www.komputronik.pl/category/16831/adaptery-bluetooth.html');
//await scrap1.scrapePrice('https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_16.32.64?limit=10&sort=price_asc');
await scrap1.scrapePrice('https://www.mediaexpert.pl/agd-do-zabudowy/zmywarki-do-zabudowy-60/whirlpool.electrolux.miele.siemens.bosch?sort=price_asc&page=1');
//await scrap1.scrapePrice('https://www.mediaexpert.pl/agd/zmywarki-i-akcesoria/zmywarki/bosch.electrolux.whirlpool.samsung.miele?sort=price_asc&page=1');
}

all();
