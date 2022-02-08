const fs = require('fs');
const path = 'C:/Users/Kamila i Radek/Desktop/spotify/all.csv';

async function step1(){

  console.log('reading file...');
  console.log('reading file2...');
  console.log('reading file3...');

  const data = fs.readFile(path, 'utf-8', (err, data) => {
  //console.log('reading file at ' + timeDiff(time))
  if (data) {
    var dataArray = data.split("\n");
    var dataArray2 = dataArray.map(inp => inp.split(','))
    console.log('data received');
    //resolve(data);
    //console.log('data retrieve finished at ' + timeDiff(time));
  } else  {
    console.log(err);
    //reject('data retrieve failed at ');// + timeDiff(time));
  }
  })
}

async function step2(){

  console.log('processing...')

}

step1();
step2();
