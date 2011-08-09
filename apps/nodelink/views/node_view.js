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
  displayProperties: 'bodyColor borderColor borderOpacity bodyWidth bodyHeight borderWidth'.w(),

  bodyColor: '#CCCCCC',
  
  borderColor: function () {
    return this.get('isSelected') ? '#FFFF00' : '#AAAAAA';
  }.property('isSelected'),
  
  borderOpacity: 1.0,
  
  bodyWidth: 50,
  bodyHeight: 50,
  
  borderWidth: function () {
    return this.get('isSelected') ? 4 : 2;
  }.property('isSelected'),

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
          r: 5,
          width:            this.get('bodyWidth'),
          height:           this.get('bodyHeight'),
          fill:             this.get('bodyColor'),
          stroke:           this.get('borderColor'),
          'stroke-width':   this.get('borderWidth'),
          'stroke-opacity': this.get('borderOpacity')
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
