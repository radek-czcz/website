// CALL TO FUTDB API

const fetch = require('node-fetch');

const request = new XMLHttpRequest();
request.open('GET', 'https://futdb.app/api/players/522');
request.setRequestHeader('X-AUTH-TOKEN','769637c3-e48c-4841-a9f3-56e4d915099c')
request.send();
request.onload = () => {
  if (request.status ===200) {
    console.log(JSON.parse(request.response));
  } else {
    console.log('error');
  }
}
