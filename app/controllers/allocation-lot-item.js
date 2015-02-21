import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ["portfolio", "allocationItem", "allocationFundItem"],

  currentWeight: function() {
    var portfolioValue = this.get('portfolioValue'),
        marketValue = this.get('marketValue');
    if (!portfolioValue || portfolioValue.value === 0) {
      return 0;
    }
    return marketValue / portfolioValue;
  }.property('model', 'marketValue', 'portfolioValue'),
  marketValue: Ember.computed.alias('model.marketValue'),
  portfolioValue: Ember.computed.alias('controllers.allocationFundItem.portfolioValue'),
});
