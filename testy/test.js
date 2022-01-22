let arrVall = [];

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
  action(i);
  }
}

function addToArr(elem) {
  arrVall.push(`This is ${elem} element`);
}

repeat(3, addToArr);
console.log(arrVall);

function action(inp) {
  console.log(inp);
}
