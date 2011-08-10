// ==========================================================================
// Project:   Nodelink - mainPage
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

Nodelink.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'raphaelCanvasView'.w(),
    
    raphaelCanvasView: RaphaelViews.RaphaelCanvasView.design({
      
      layout: { top: 20, left: 20, width: 404, height: 304 },
      
      childViews: 'diagramView'.w(),
      
      diagramView: RaphaelViews.RaphaelCollectionView.design({
        contentBinding:        'Nodelink.diagramController.arrangedObjects',
        contentExampleViewKey: 'exampleView',
        selectOnMouseDown:     NO,
        
        childViews: 'containerView'.w(),
        
        containerView: Nodelink.RectView.design({
          cornerRadius: 5,
          width: 400,
          height: 300,
          borderColor: '#CCCCCC',
          borderWidth: 2
        }),
        
        mouseDown: function (evt) {
          // override selection policy by deselecting all items if the view clicked wasn't an item view (i.e., it was
          // the containerView
          
          if (!this.itemViewForEvent(evt)) {
            this.select(null);
          }
          sc_super();
        }
                
      })
    })    
  })

});
