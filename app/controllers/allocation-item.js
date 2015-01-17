import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: "portfolio",

  allOpenLots: Ember.computed.alias("controllers.portfolio.openLots"),
  currentWeight: function() {
    var portfolioValue = this.get('portfolioValue'),
        totalValue = (this.get('totalValue') || currency(0));
    if (!portfolioValue || portfolioValue.value === 0) {
      return 0;
    }
    return totalValue.value / portfolioValue.value;
  }.property('portfolioValue', 'totalValue'),
  lots: function() {
    var controller = this;
    return this.get('allOpenLots').filter(function(item) {
      return item.get('assetClass.id') === controller.get('assetClass.id');
    });
  }.property("assetClass.id", "allOpenLots.@each.assetClass"),
  lotValues: Ember.computed.mapBy('lots', 'marketValue'),
  portfolioValue: Ember.computed.alias('controllers.portfolio.totalValue'),
  targetWeight: Ember.computed.alias('model.weight'),
  // TODO: replace w/ a currency.js computed property
  totalValue: function() {
    var values = this.get('lotValues'),
        sum = currency(0);
    values.compact().forEach(function(value) {
      sum = sum.add(value);
    });
    return sum;
  }.property('lotValues.@each'),
});
