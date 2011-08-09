// ==========================================================================
// Project:   Nodelink.Node
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink */

/** @class

  A node in the directed graph being diagrammed in this demo app.

  @extends SC.Record
  @version 0.1
*/
Nodelink.Node = SC.Record.extend(
/** @scope Nodelink.Node.prototype */ {

  /**
    X-position (in pixels) of this node, relative to the upper left corner of the diagram
    
    @property {Number}
  */
  x: SC.Record.attr(Number),

  /**
    Y-position (in pixels) of this node, relative to the upper left corner of the diagram
    
    @property {Number}
  */
  y: SC.Record.attr(Number),
  
  /**
    Links (edges) leaving this node
    
    @property {Nodelink.Link[]}
  */
  outLinks: SC.Record.toMany('Nodelink.Link', {
    inverse: 'startNode',
    isMaster: YES
  }),
  
  /**
    Links (edges) entering this node
    
    @property {Nodelink.Link[]}
  */
  inLinks: SC.Record.toMany('Nodelink.Link', {
    inverse: 'endNode',
    isMaster: YES
  })
  
});
