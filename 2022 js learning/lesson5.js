const fs = require('fs');
const path = 'C:/Users/Kamila i Radek/Desktop/spotify/all.csv';

async function ret(){
  console.log('reading file...');
  console.log('reading file2...');
  console.log('reading file3...');
}

async function step1(){
  //return new Promise((resolve, reject) => {

  const ret1 = await ret();
  const ret2 = fs.readFileSync(path);
  console.log('done');

  const res = await (Math.pow(2,15) + Math.pow(4,20));
  console.log(res);

}

async function step2(){

  console.log('processing...')

}

step1();
step2();
