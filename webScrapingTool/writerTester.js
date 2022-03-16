const dw = require('./DataFileWriter');

const data = [];

//console.log(data.length);
data[data.length] = 'name: Radek';
data[data.length] = 'name: Kamila';
//console.log(data.length);
//console.log('data in tester before passing = ' + data[data.length]);

dw.setData(data);
//console.log('data in tester after passing = ' + dw.dataToWrite[dw.dataToWrite.length]);

console.log(dw);
dw.appendToDataFile(0);

module.exports = {data};
