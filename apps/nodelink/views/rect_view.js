// ==========================================================================
// Project:   Nodelink.RectView
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

/** @class

  Simple rectangle view

  @extends SC.View
*/
Nodelink.RectView = RaphaelViews.RaphaelView.extend(SC.ContentDisplay,
/** @scope Nodelink.NodeView.prototype */ {

  displayProperties: 'x y width height cornerRadius bodyColor borderColor borderWidth bodyOpacity'.w(),

  // default values:
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  cornerRadius: 0,
  bodyColor: '#FFFFFF',
  borderColor: '#FFFFFF',
  borderWidth: 0,
  borderOpacity: 1.0,
  bodyOpacity: 1.0,
  
  renderCallback: function (raphaelCanvas, attrs) {
    return raphaelCanvas.rect().attr(attrs);
  },
  
  render: function (context, firstTime) {

    var   borderWidth = this.get('borderWidth'),
    
          attrs = {
          x:                this.get('x') + borderWidth,
          y:                this.get('y') + borderWidth,
          width:            this.get('width'),
          height:           this.get('height'),
          r:                this.get('cornerRadius'),
          fill:             this.get('bodyColor'),
          stroke:           this.get('borderColor'),
          'stroke-width':   borderWidth,
          'stroke-opacity': this.get('borderOpacity'),
          'fill-opacity':   this.get('bodyOpacity')
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
