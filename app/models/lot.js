import Ember from 'ember';
import DS from 'ember-data';
import currency from 'currency';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),
  sells: DS.hasMany('sells', {async: true}),

  acquiredAt: DS.attr('date'),
  quantity: DS.attr('number'),
  quantitySold: DS.attr('number'),
  shareCost: DS.attr('currency'),

  assetClass: Ember.computed.alias('fund.assetClass'),
  fundName: Ember.computed.alias('fund.name'),
  fundPrice: Ember.computed.alias('fund.price'),
  isLoss: Ember.computed.lt('valueChange', 0),
  isOpen: Ember.computed.not('isClosed'),
  isClosed: function() {
    var quantity = this.get('quantity'),
        sold = this.get('quantitySold');
    return (sold > quantity || sold === quantity);
  }.property('quantity', 'quantitySold'),
  isUnrealizedLoss: function() {
    if (!this.get('isOpen')) {
      return false;
    }
    var shareCost = this.get('shareCost') || currency(""),
        fundPrice = this.get('fundPrice') || currency("");
    var priceChange = shareCost.subtract(fundPrice);
    return priceChange < 0;
  }.property('isOpen', 'shareCost', 'fundPrice'),
  symbol: Ember.computed.alias('fund.symbol'),

  quantityRemaining: function() {
    var bought = this.get('quantity'),
        sold = this.get('quantitySold') || 0;
    return bought - sold;
  }.property('quantity', 'quantitySold'),

  // TODO: clean all these up to use well-factored computed properties:
  marketValue: function() {
    var fundPrice = this.get('fundPrice') || currency(""),
       remaining = this.get('quantityRemaining') || currency("");
    return fundPrice.multiply(remaining);
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
    // TODO, may need to take sells into account
    return this.get('fundPrice').subtract(this.get('shareCost'));
  }.property('fundPrice', 'shareCost')
});
