//const fetch = require('node-fetch');
const text = fetch('abc.txt')
.then(result => {
  return result.text();
  console.log(result);
}).then(result => {
  console.log(result);
  const newP = document.createElement('p');
  document.body.appendChild(newP);
  newP.textContent = result + 'radeks2';
  return result
}).catch(error => {
  console.log(error);
})
