var proto = {
describe: function () {
  return 'name: '+this.name;
}
};
var obj = Object.create(proto, {name: {value: 'radek'}});
console.log(obj.name);
