// ==========================================================================
// Project:   Nodelink.NodeView
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

/** @class

  Display class for displaying a Node. Expects its 'content' property to be a Nodelink.Node record.

  @extends SC.View
*/
Nodelink.NodeView = RaphaelViews.RaphaelView.extend(SC.ContentDisplay,
/** @scope Nodelink.NodeView.prototype */ {

  contentDisplayProperties: 'x y'.w(),
  
  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.rect().attr(attrs);
  },
  
  render: function (context, firstTime) {
    var content = this.get('content'),
        x = content.get('x'),
        y = content.get('y'),
        attrs = {
          x: x,
          y: y,
          width: 50,
          height: 50,
          r: 5,
          stroke: '#AAAAAA',
          fill: '#CCCCCC'
        },
        rect;
    
    if (firstTime) {
      context.callback(this, this.renderCallback, attrs);
    }
    else {
      rect = this.get('raphaelObject');
      rect.attr(attrs);
    }
  }
  
});
