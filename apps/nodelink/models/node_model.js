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
    Links (edges) leaving this node. Calculated as all Links with startNode = <this record>.
    
    @property {Nodelink.Link[]}
  */
  outLinks: function () {
    return this.get('store').find(SC.Query.local(Nodelink.Link, "startNode.id = '%@'".fmt(this.get('id'))));
  }.property('id').cacheable(),
  
  /**
    Links (edges) entering this node. Calculated as all Links with endNode = <this record>.
    
    @property {Nodelink.Link[]}
  */
  inLinks: function () {
    return this.get('store').find(SC.Query.local(Nodelink.Link, "endNode.id = '%@'".fmt(this.get('id'))));
  }.property('id').cacheable()

});
