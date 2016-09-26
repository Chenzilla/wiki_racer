/*

Node.js

A function to represent a node; unidirectional since we
only need to access parents.

*/

function Node(data) {
  // Initialize node
  this.data = data;
  this.parent = null;

  // Adds to 'array' the path of target node to root node
  this.print = function(array) {
    array.push(this.data);

    // Recurse until we reach root
    if (this.parent) { this.parent.print(array); }
    else { return array; }
  };
}

module.exports = Node;
