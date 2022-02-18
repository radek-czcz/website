const fetch = import('node-fetch');

const request = new XMLHttpRequest();
request.open('GET', 'https://www.filmweb.pl/search/live?q=hered');
request.setRequestHeader('X-AUTH-TOKEN','qjcGhW2JnvGT9dfCt3uT_jozR3s')
request.send();
request.onload = () => {
  if (request.status ===200) {
    console.log(JSON.parse(request.response));
  } else {
    console.log('error');
  }
}
