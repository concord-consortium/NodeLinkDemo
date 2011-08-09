// ==========================================================================
// Project:   Nodelink.LinkView
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

/** @class

  Display class for displaying a Link. Expects its 'content' property to be a Nodelink.Link record.

  @extends SC.View
*/
Nodelink.LinkView = RaphaelViews.RaphaelView.extend(SC.ContentDisplay,
/** @scope Nodelink.LinkView.prototype */ {

  contentDisplayProperties: 'endNode.x endNode.y startNode.x startNode.y'.w(),
  
  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.path().attr(attrs);    
  },
  
  render: function (context, firstTime) {
    var content   = this.get('content'),
        startNode = content.get('startNode'),
        endNode   = content.get('endNode'),
        startX    = startNode.get('x'),
        startY    = startNode.get('y'),
        endX      = endNode.get('x'),
        endY      = endNode.get('y'),
        
        attrs = {
          path:              ['M', startX + 25, startY + 25, 'L', endX + 25, endY + 25].join(' '),
          stroke:            '#0000aa',
          'stroke-width':    3,
          'stroke-linecap': 'round'
        },          
        
        path;
        
    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      path = this.get('raphaelObject');
      path.attr(attrs);
    }
  }
      
});
