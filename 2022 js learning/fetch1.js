//const fetch = require('node-fetch');
import fetch from 'node-fetch';
import express from 'express';
const app = express()
const port = 3000;

app.use(express.static('pub'));



app.get('/mai', (req, res) => {

   var text = fetch('http://localhost:3000/mediaExpertDataFile.txt')
   .then(result => {
     return result.text();
     //console.log(result);
   }).then(result => {
      const rows = result.split('\n');
      var names = [];
      var prices = [];
      rows.forEach(elt => prices.push(elt.substring(0,4).trim()));
      rows.forEach(elt => names.push(elt.substring(5)));
      console.log(prices[2]);
      console.log(names[2]);
      res.send(names);
      return names;
   })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







  /*
  const newP = document.createElement('p');
  document.body.appendChild(newP);
  newP.textContent = result + 'radeks2';
  return result
}).catch(error => {
  console.log(error);
})*/
