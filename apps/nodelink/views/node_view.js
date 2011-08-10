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
        x = content.get('x'),
        y = content.get('y');

    if ( !this.get('isDragging') ) return;

    content.set('x', x + evt.pageX - this._dragX);
    content.set('y', y + evt.pageY - this._dragY);

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
