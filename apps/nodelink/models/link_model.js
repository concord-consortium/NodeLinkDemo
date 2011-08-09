// ==========================================================================
// Project:   Nodelink.Link
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink */

/** @class

  An edge, or "link", in the directed graph being diagrammed in this demo app.

  @extends SC.Record
  @version 0.1
*/
Nodelink.Link = SC.Record.extend(
/** @scope Nodelink.Link.prototype */ {

  /**
    The node this link points away from
    
    @property {Nodelink.Node}
  */
  startNode: SC.Record.toOne('Nodelink.Node', {
    inverse: 'outLinks'
  }),

  /**
    The node this link points toward
    
    @property {Nodelink.Node}
  */
  endNode:  SC.Record.toOne('Nodelink.Node', {
    inverse: 'inLinks'
  })
  
});
