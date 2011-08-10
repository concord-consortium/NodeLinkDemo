// ==========================================================================
// Project:   Nodelink.LinkView
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

/** @class

  Display class for displaying a Link. Expects its 'content' property to be a Nodelink.Link record.

  @extends SC.View
*/
Nodelink.LinkView = RaphaelViews.RaphaelView.extend(
/** @scope Nodelink.LinkView.prototype */ {

  displayProperties: 'content.endNode.x content.endNode.y content.startNode.x content.startNode.y lineColor borderColor borderOpacity lineWidth borderWidth'.w(),
  
  lineColor: '#0000AA',
  borderColor: '#FFFF00',
  
  borderOpacity: function () {
    return this.get('isSelected') ? 1.0 : 0;
  }.property('isSelected'),
  
  lineWidth: 3,
  borderWidth: 3,
  
  renderCallback: function (raphaelCanvas, lineAttrs, borderAttrs) {
    return raphaelCanvas.set().push(
      raphaelCanvas.path().attr(borderAttrs),
      raphaelCanvas.path().attr(lineAttrs)
    );
  },
  
  render: function (context, firstTime) {
    var content   = this.get('content'),
        startNode = content.get('startNode'),
        endNode   = content.get('endNode'),
        startX    = startNode.get('x'),
        startY    = startNode.get('y'),
        endX      = endNode.get('x'),
        endY      = endNode.get('y'),
        pathStr   = ['M', startX + 25, startY + 25, 'L', endX + 25, endY + 25].join(' '),
        
        borderAttrs = {
          'path':           pathStr,
          'stroke':         this.get('borderColor'),
          'opacity':        this.get('borderOpacity'),
          'stroke-width':   this.get('lineWidth') + 2 * this.get('borderWidth'),  // the border "around" the line is really a fat line behind it
          'stroke-linecap': 'round'
        },
        
        lineAttrs = {
          'path':           pathStr,
          'stroke':         this.get('lineColor'),
          'stroke-width':   this.get('lineWidth'),
          'stroke-linecap': 'round'
        },
        
        raphaelObject,
        border,
        line;
        
    if (firstTime) {
      context.callback(this, this.renderCallback, lineAttrs, borderAttrs);
    }
    else {
      raphaelObject = this.get('raphaelObject');
      border        = raphaelObject.items[0];
      line          = raphaelObject.items[1];

      border.attr(borderAttrs);
      line.attr(lineAttrs);
    }
  }
      
});
