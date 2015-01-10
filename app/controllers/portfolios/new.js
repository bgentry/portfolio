import Ember from 'ember';

export default Ember.ObjectController.extend({
  allAssetClasses: function() {
    return this.store.find('asset-class');
  }.property(),

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

  remainingAssetClasses: Ember.computed.setDiff('allAssetClasses', 'model.assetClasses'),

  actions: {
    create: function() {
      var newPortfolio = this.get('model');
      var self = this;
      newPortfolio.save().then(function() {
        self.transitionToRoute('portfolio', newPortfolio);
      });
    }
  }
});
