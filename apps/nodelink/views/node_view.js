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

  isSelected: NO,
  isDragging: NO,
  
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

  collectionView: function () {
    var ret = this.get('parentView');
    
    if (ret && ret.kindOf && ret.kindOf(SC.CollectionView)) {
      return ret;
    }
    else {
      ret = ret.get('parentView');
      if (ret && ret.kindOf && ret.kindOf(SC.CollectionView)) {
        return ret;
      }
      else {
        return null;
      }
    }
  }.property('parentView').cacheable(),
  
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
  },
  
  mouseDown: function (evt) {
    this.startDrag(evt);
    return YES;
  },
  
  mouseDragged: function (evt) {
    this.drag(evt);
    return YES;
  },
  
  mouseUp: function (evt) {
    this.endDrag(evt);
    return YES;
  },
  
  startDrag: function (evt) {
    // our layer doesn't respect SC.Cursor, so set the cursors manually
    this.$().css('cursor', 'move');
    
    this.set('isDragging', YES);
    this._dragX = evt.pageX;
    this._dragY = evt.pageY;
    this._mouseDownEvent = evt;
    this._didDragBody = NO;
  },
  
  drag: function (evt) {
    var content = this.get('content'),
        x = content.get('x') + evt.pageX - this._dragX,
        y = content.get('y') + evt.pageY - this._dragY;

    if ( !this.get('isDragging') ) return;
    
    // FIXME this code to limit to the borders of the parent container could be simplified with local vars, and by 
    // double-checking the geometry and arithmetic:
    if (x < this.get('borderWidth')) x = this.get('borderWidth');
    if (x + this.get('bodyWidth') > this.getPath('parentView.width') + this.getPath('parentView.borderWidth')) {
      x = this.getPath('parentView.width') + this.getPath('parentView.borderWidth') - this.get('bodyWidth');
    }
    
    if (y < this.get('borderWidth')) y = this.get('borderWidth');
    if (y + this.get('bodyHeight') > this.getPath('parentView.height') + this.getPath('parentView.borderWidth')) {
      y = this.getPath('parentView.height') + this.getPath('parentView.borderWidth') - this.get('bodyHeight');
    }
    
    content.set('x', x);
    content.set('y', y);

    this._dragX = evt.pageX;
    this._dragY = evt.pageY;
    this._didDragBody = YES;
  },  
  
  endDrag: function (evt) {
    var cv = this.get('collectionView');
    
    if (!this._didDragBody) {
      cv.mouseDown(this._mouseDownEvent);    
      cv.mouseUp(evt);
    }

    this.drag(evt);
    
    this.$().css('cursor', 'default');
    this.set('isDragging', NO); 
  }
  
});
