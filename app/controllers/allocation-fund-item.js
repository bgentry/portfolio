import Ember from 'ember';
import currency from 'currency';

export default Ember.Controller.extend({
  isExpanded: false,
  needs: ["portfolio", "allocationItem"],

  allLots: Ember.computed.alias("parentController.lots"),

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
    return this.get('allLots').filter(function(lot) {
      return lot.get('fund.id') === controller.get('model.id');
    });
  }.property("model.id", "allLots.@each.fund"),

  lotQuantities: Ember.computed.mapBy('lots', 'quantityRemaining'),
  lotValues: Ember.computed.mapBy('lots', 'marketValue'),
  name: function() {
    return this.get('model.symbol') + ": " + this.model.get('name');
  }.property('model.name', 'model.symbol'),
  portfolioValue: Ember.computed.alias('controllers.portfolio.model.totalValue'),
  quantity: Ember.computed.sum('lotQuantities'),

  // TODO: replace w/ a currency.js computed property
  totalValue: function() {
    var values = this.get('lotValues'),
        sum = currency(0);
    values.compact().forEach(function(value) {
      sum = sum.add(value);
    });
    return sum;
  }.property('lotValues.@each'),

  actions: {
    toggleIsExpanded: function() {
      this.toggleProperty('isExpanded');
    },
  },
});
