const request = new XMLHttpRequest();
request.open('GET', 'https://imdb-api.com/en/API/SearchMovie/k_jxpq0txa/Bergman Island'
/*'https://imdb-api.com/en/API/Title/k_jxpq0txa/tt0110413'*/);
request.setRequestHeader('X-AUTH-TOKEN','k_jxpqOtxa')
request.send();
var data;
request.onload = () => {
  if (request.status ===200) {
    data = JSON.parse(request.response);
    console.log(data);



    document.body.innerHTML = ""
    var keyColumn = document.createElement('ul');
    var valueColumn = document.createElement('ul');

    for (var key in data) {

         var list = document.body.appendChild(document.createElement('ul'));
         var el1 = list.appendChild(document.createElement('li'));
         var el2 = list.appendChild(document.createElement('li'));
         el1.style.display = 'inline-block';
         el1.style.width = "30%";
         //el1.style.width = 30%;
         el2.style.display = 'inline-block';
         //el2.style.width = 70%;
         //var elementNode = document.body.appendChild(
            document.createElement('p');
            el1.textContent = key;
            el2.textContent = data[key];
      //var str = key.toString().padEnd(30, '-');
      //console.log(str);
         //elementNode.textContent = str + data[key] + "\r\n";
          //document.body.appendChild(elementNode);
        }
}
   else {
    console.log('error');
  }
}
