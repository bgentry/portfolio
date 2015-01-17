import Ember from 'ember';
import currency from 'currency';

export default Ember.ObjectController.extend({
  needs: ["portfolio", "allocationItem"],

  currentWeight: function() {
    var portfolioValue = this.get('portfolioValue'),
        marketValue = this.get('marketValue');
    if (!portfolioValue || portfolioValue.value === 0) {
      return 0;
    }
    return marketValue / portfolioValue;
  }.property('model', 'marketValue', 'portfolioValue'),
  marketValue: Ember.computed.alias('model.marketValue'),
  portfolioValue: Ember.computed.alias('controllers.allocationItem.portfolioValue'),
});
