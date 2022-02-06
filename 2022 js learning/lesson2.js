const fs = require('fs');

const path = 'C:/Users/Kamila i Radek/Desktop/spotify/all.csv';

var timeDiff = function(inp) {
  return Date.now() - inp;
}

var time;

const getData1 = new Promise((resolve, reject) => {
    time = Date.now();
    console.log('start reading file at ' + timeDiff(time))
    //fs.readFile(path, () => resolve('file read resolved'));
    const data = fs.readFile(path, 'utf-8', (err, data) => {
    if (data) {
      var dataArray = data.split("\n");
      var dataArray2 = dataArray.map(inp => inp.split(','))
      resolve(data);
      console.log('data retrieve finished at ' + timeDiff(time));
    } else  {
      console.log(err);
      reject('data retrieve failed at ' + timeDiff(time));
    }
  }
      /*if (err) {reject('data retrieve failed');
    }
      else {resolve('reading finished');}
  })*/
    //if (data) resolve('data avalible');
    //else reject('data resolving failed');
)})

const myTimer = new Promise((resolve, reject) => {
  console.log('timer starts at ' + timeDiff(time));
  setTimeout(() => {
    console.log('timer finished at ' + timeDiff(time));
    resolve('timer resolved');
  },0);
  //resolve('timer resolved');
})

myTimer.then(() => console.log('timer usage at ' + timeDiff(time)));
getData1.then((data) => {
  console.log('data usage at ' + timeDiff(time));
  //console.log(data);
}, (inp) => {console.log(inp);});
