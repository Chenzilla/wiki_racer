/*

Queue.js

A function to represent a queue

*/

function Queue(){
  // initialise queue
  var queue  = [];
  var offset = 0;

  // Returns true if the queue is empty.
  this.isEmpty = function(){
    return (queue.length == 0);
  }

  // Enqueues the specified item. The parameter is the item to enqueue
  this.enqueue = function(item){
    queue.push(item);
  }

  // Dequeues an item and returns it. If empty we return 'undefined'
  this.dequeue = function(){

    // If queue is empty, return immediately
    if (queue.length == 0) return undefined;

    // Store item at front of queue
    var item = queue[offset];

    // Increment offset and remove free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }

    // Return the dequeued item
    return item;
  }
}

module.exports = Queue;
