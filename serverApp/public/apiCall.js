const request = new XMLHttpRequest();
request.open('GET', 'https://futdb.app/api/players/522');
request.setRequestHeader('X-AUTH-TOKEN','769637c3-e48c-4841-a9f3-56e4d915099c')
request.send();
var data;
request.onload = () => {
  if (request.status ===200) {
    data = JSON.parse(request.response);
    console.log(data);

    document.getElementById('nameField').textContent += data.item.name;

  } else {
    console.log('error');
  }
}
