function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
  this.print = function(print, array) {
      console.log(print);
      console.log("PRINTING");
      console.log(this.data);
      array.push(this.data);
    if(this.parent) {
      this.parent.print(print, array);
    } else {
      return array;
    }
  };
}

module.exports = Node;
