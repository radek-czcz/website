console.log(SCRIPTS);

var myEl = document.getElementsByClassName('list')[0];
var props = [];
for  (var runner5 in myEl) {
  props.push(runner5);
}
console.log(props.sort());

function filterData(func) {
  let livArr = [];
  for (let element of SCRIPTS) {
    if (!element.living) {
      func(element);
      //console.log("active " + element.name);
    }
  }
  console.log(livArr);
}

filterData(inp => {console.log(inp)});
