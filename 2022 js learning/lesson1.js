function fundamental(callb) {
  console.log('this is base function');
  callb();
  return 'this is result returned from base function'
}

function branch1st() {
  console.log('branch1 function');
}

function branch2nd() {
  console.log('branch1 function');
}

//console.log(fundamental(branch1st));

function doSomethingAsync(then) {
  setTimeout(then, 1000);
  console.log('Doing something asynchronously');
}

doSomethingAsync(function() {
  console.log('Done');
});

console.log('Doing something else');
