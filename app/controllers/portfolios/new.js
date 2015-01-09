import Ember from 'ember';

export default Ember.ObjectController.extend({
  assetClassToAdd: null,
  onAssetClassToAddChange:function(){
    var assetClass = this.get('assetClassToAdd');
    if(assetClass === null) {
      return;
    }
    var portfolio = this.get('model');
    var allocation = this.store.createRecord('allocation', {
      assetClass: assetClass,
      portfolio: portfolio
    });
    portfolio.get('allocations').addObject(allocation);
    this.set('assetClassToAdd', null);
  }.observes('assetClassToAdd'),

  actions: {
    create: function(params) {
      console.log("CREATE PARAMS: ", params);
      var newPortfolio = this.get('model');
      var self = this;
      newPortfolio.save().then(function() {
        self.transitionToRoute('portfolio', newPortfolio);
      });
    }
  }
});
