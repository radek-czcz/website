const fs = require('fs');
var parse = require('url-parse')
//const fetch = import('node-fetch');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = () => import('url');
//const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch('https://github.com/'));
//const resp = fetch.then(response => response.text());
const fetched = fetch('https://www.komputronik.pl/robots.txt');
const fetched2 = fetched.then(response => response.text());
//const text = fetched2.then(result => console.log(result));

function readDomainName(){

   // *?*a[*][]=*
   let exp = [
      // regexp for extracting domain's name
      /(?:[/]{2}|\.)(?:www.)*([\S|\d]*\.(?:pl|net))[\s\S]*/
   ]

   exp.forEach((item, i) => {
      console.log('https://www.komputronik.pl/robots.txt'.match(item));
      console.log('https://www.apolos.pl/produkt/panasonic-es-rt67/479/?utm_source=ceneo&utm_medium=referral&ceneo_cid=b66a7974-8d27-4b82-256b-314c9f2dc314'.match(item));
      console.log('https://www.morele.net/golarka-panasonic-es-rt67-s503-939398/?utm_source=ceneo&utm_medium=referral&ceneo_cid=29b951ae-b267-d91d-fec6-a44f0e1e28a5'.match(item));
      console.log('https://digitalmarket24.pl/pl/p/Panasonic-ES-RT-67-S503/34100?utm_source=ceneo&utm_medium=referral&ceneo_cid=50f044c8-01cc-3538-5029-918cd0745616'.match(item));
      console.log('https://www.avans.pl/agd-male/higiena-i-uroda/golarki/golarka-philips-s1231-41?utm_source=Ceneo&utm_medium=cpc&utm_content=556360&utm_campaign=2022-03&utm_term=Golarki&ceneo_spo=false&ceneo_cid=768a45df-13a5-996d-9531-1fa7bc24ad0d'.match(item));
      console.log('https://maxelektro.pl/sklep/karta-produktu/golarka-philips-seria-1000-s123141,71765.html?utm_source=ceneooferta&utm_medium=lista&utm_campaign=Higiena%20i%20uroda&utm_content=AGD%20ma%C5%82e&cr_pro_id=71765&ceneo_cid=7546705a-7261-4228-1823-bca693bc4f3b'.match(item));
   });

   //console.log('https://www.komputronik.pl/robots.txt'.match(exp2));
}

function checkIfUrlAllowed() {
   let str = '*?*a[*][]=*'
   let prsedUrl = parse('https://www.apolos.pl/produkt/panasonic-es-rt67/479/?utm_source=ceneo&utm_medium=referral&ceneo_cid=b66a7974-8d27-4b82-256b-314c9f2dc314', true);
   console.log(prsedUrl.query);

}

checkIfUrlAllowed()
//readDomainName();
