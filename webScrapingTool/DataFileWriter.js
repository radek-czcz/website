const fs = require('fs');

var dataToWrite = [];

function appendToDataFile() {
   const date = new Date();
   function appendToDataFile2(counter) {
   fs.appendFile('mediaExpertDataFile.txt', dataToWrite[counter] + "\r\n", () => {
      if (++counter < dataToWrite.length)
      appendToDataFile2(counter);
   });
}
   fs.appendFile('mediaExpertDataFile.txt', date.getTime() + "\r\n", () => appendToDataFile2(0));
}

function setData(data) {
   dataToWrite = data;
}

module.exports = {
   appendToDataFile,
   setData
};
