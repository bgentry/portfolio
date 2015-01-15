import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),

  dateAcquired: DS.attr('date'),
  dateSold: DS.attr('date'),
  quantity: DS.attr('number'),
  shareCost: DS.attr('currency'),

  fundPrice: Ember.computed.alias('fund.price'),
  isOpen: Ember.computed.not('dateSold'),
  isClosed: Ember.computed.bool('dateSold'),

  // TODO: clean all these up to use well-factored computed properties:
  marketValue: function() {
    var fundPrice = this.get('fundPrice'),
       quantity = this.get('quantity');
    if (typeof(fundPrice) === 'undefined' || typeof(quantity) === 'undefined') {
      return null;
    }

    return fundPrice.multiply(quantity);
  }.property('fundPrice', 'quantity'),
  totalCost: function() {
    var shareCost = this.get('shareCost'),
       quantity = this.get('quantity');
    if (typeof(shareCost) === 'undefined' || typeof(quantity) === 'undefined') {
      return null;
    }

    return shareCost.multiply(quantity);
  }.property('quantity', 'shareCost'),
  valueChange: function() {
    var marketValue = this.get('marketValue'),
      totalCost = this.get('totalCost');
    if (marketValue == null || totalCost == null) {
      return null;
    }

    return marketValue.subtract(totalCost);
  }.property('marketValue', 'totalCost')
});
