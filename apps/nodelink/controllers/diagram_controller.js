// ==========================================================================
// Project:   Nodelink.diagramController
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink */

/** @class

  The content of this DiagramController is the (auto-updating) union of all Nodes and Links in the application. A 
  CollectionView could bind its 'content' property to this controller to display the whole diagram.

  @extends SC.Object
*/
Nodelink.diagramController = SC.ArrayController.create(
/** @scope Nodelink.diagramController.prototype */ {

  /**
    RecordArray of all Nodes in the app.
    
    @property {SC.RecordArray}
  */
  nodes: function () {
    return Nodelink.store.find(Nodelink.Node);
  }.property(),
  
  /**
    RecordArray of all Links in the app.
    
    @property {SC.RecordArray}
  */
  links: function () {
    return Nodelink.store.find(Nodelink.Link);
  }.property(),
  
  /**
    Add observers to call 'updateContent' method when 'nodes' and 'links' properties change. Call this once, after
    fixtures have loaded.
  */
  startUpdatingContent: function () {
    this.addObserver('nodes.[]', this, this.updateContentOnce);
    this.addObserver('links.[]', this, this.updateContentOnce);
    this.updateContent();
  },
  
  updateContentOnce: function () {
    this.invokeOnce(this.updateContent);
  },
  
  /**
    Sets the 'content' property to a simple array containing all nodes, then all links. The resulting array does
    not auto-refresh in the way a RecordArray does.
  */
  updateContent: function () {
    this.set('content', SC.A(this.get('nodes')).concat( SC.A(this.get('links'))));  
  }

});
