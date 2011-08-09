// ==========================================================================
// Project:   Nodelink - mainPage
// Copyright: @2011 Concord Consortium
// ==========================================================================
/*globals Nodelink RaphaelViews */

Nodelink.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'raphaelCanvasView'.w(),
    
    raphaelCanvasView: RaphaelViews.RaphaelCanvasView.design({
      childViews: 'diagramView'.w(),
      
      diagramView: RaphaelViews.RaphaelCollectionView.design({
        contentBinding:        'Nodelink.diagramController.arrangedObjects',
        contentExampleViewKey: 'exampleView'
      })
    })    
  })

});
