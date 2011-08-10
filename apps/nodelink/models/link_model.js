// ==========================================================================
// Project:   Nodelink.Link
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink */

sc_require('views/link_view');

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
  startNode: SC.Record.toOne('Nodelink.Node'),

  /**
    The node this link points toward
    
    @property {Nodelink.Node}
  */
  endNode:  SC.Record.toOne('Nodelink.Node'),
  
  /**
    View class to use to display this object in a collection view.
  */
  exampleView: Nodelink.LinkView
  
});
