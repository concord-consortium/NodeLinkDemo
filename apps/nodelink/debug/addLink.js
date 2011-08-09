/*globals Nodelink */
// This is a handy function for debugging

function addLink() {
  SC.RunLoop.begin();
  Nodelink.store.createRecord(Nodelink.Link, { guid: 'node2', startNode: 'node1', endNode: 'node2' } );
  SC.RunLoop.end();
}

