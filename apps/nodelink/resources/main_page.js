// ==========================================================================
// Project:   Nodelink - mainPage
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

Nodelink.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'raphaelCanvasView'.w(),
    
    raphaelCanvasView: RaphaelViews.RaphaelCanvasView.design({
      
      layout: { left: 20, right: 20, top: 20, bottom: 20 },
      
      childViews: 'backgroundView diagramView'.w(),
      
      backgroundView: Nodelink.RectView.design({
        cornerRadius: 5,
        width: 400,
        height: 300,
        borderColor: '#CCCCCC',
        borderWidth: 2,
      
        mouseDown: function (evt) {
          this.setPath('parentView.diagramView.selection', null);
          return YES;
        }
      }),
      
      diagramView: RaphaelViews.RaphaelCollectionView.design({
        contentBinding:        'Nodelink.diagramController.arrangedObjects',
        contentExampleViewKey: 'exampleView',
        selectOnMouseDown:     NO
      })
    })    
  })

});
