function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
  this.add = function(data, parent) {
    var child = new Node(data);
    if(parent) {
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add not to a non-existent parent.');
    }
  };
}

module.exports = Node;
