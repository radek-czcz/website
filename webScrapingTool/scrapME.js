const scrap1 = require('./meczajniki');
const scrapKomputronik = require('./scrapKompu')

async function all(){

//await scrap1.scrapePrice('https://www.mediaexpert.pl/agd-male/dla-dziecka/szczoteczki-elektryczne/oral-b.philips?sort=price_asc');
//await scrapKomputronik.scrapePriceKomputronik('https://www.komputronik.pl/category/16831/adaptery-bluetooth.html');
scrap1.scrapePrice('https://www.mediaexpert.pl/foto-i-kamery/akcesoria-do-aparatow-i-kamer/karty-pamieci/kioxia/pojemnosc-gb_32.16?limit=10&sort=price_asc&page=1');
}

all();
