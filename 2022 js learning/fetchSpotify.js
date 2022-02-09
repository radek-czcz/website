const fetchSpotify = async function() {
  const data =  await fetch('favs.csv');
  const data2 = await data.text();
  //console.log(data2);
  var arr;
  arr = data2.split('\n');
  console.log(arr);

  var setN = new Set();
  arr.forEach(item => {
    const arr2 = item.split(',');
    setN.add(arr2[1]);
  });

  console.log(setN);

  return setN;
}

fetchSpotify();
