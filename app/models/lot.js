import Ember from 'ember';
import DS from 'ember-data';
import currency from 'currency';
import moment from 'moment';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),
  sells: DS.hasMany('sells', {async: true}),

  acquiredAt: DS.attr('date'),
  quantity: DS.attr('number'),
  quantitySold: DS.attr('number'),
  shareCost: DS.attr('currency'),

  acquiredAtEndOfDay: function() {
    return moment(this.get('acquiredAt')).endOf('day').toDate();
  }.property('acquiredAt'),
  assetClass: Ember.computed.alias('fund.assetClass'),
  fundName: Ember.computed.alias('fund.name'),
  fundPrice: Ember.computed.alias('fund.price'),
  isLoss: Ember.computed.lt('unrealizedValueChange', 0),
  isOpen: Ember.computed.not('isClosed'),
  isClosed: function() {
    var quantity = this.get('quantity'),
        sold = this.get('quantitySold');
    return (sold > quantity || sold === quantity);
  }.property('quantity', 'quantitySold'),
  isUnrealizedTaxableLoss: function() {
    if (this.get('isClosed')) {
      return false;
    }
    if (!this.get('isTaxable')) {
      return false;
    }
    var shareCost = this.get('shareCost') || currency(""),
        fundPrice = this.get('fundPrice') || currency("");
    var priceChange = fundPrice.subtract(shareCost);
    return priceChange < 0;
  }.property('isClosed', 'shareCost', 'fundPrice', 'isTaxable'),
  symbol: Ember.computed.alias('fund.symbol'),
  isTaxable: Ember.computed.alias('portfolio.taxable'),

  quantityRemaining: function() {
    var bought = this.get('quantity'),
        sold = this.get('quantitySold') || 0;
    return bought - sold;
  }.property('quantity', 'quantitySold'),

  ownedDuration: function() {
    var acquiredAtEndOfDay = this.get('acquiredAtEndOfDay');
    if (!acquiredAtEndOfDay) {
      return moment.duration();
    }
    return moment.duration(new Date() - acquiredAtEndOfDay);
  }.property('acquiredAtEndOfDay'),

  isShortTerm: Ember.computed.lt('ownedDuration', moment.duration(1, 'year')),
  isLongTerm: Ember.computed.gte('ownedDuration', moment.duration(1, 'year')),

  // TODO: clean all these up to use well-factored computed properties:
  marketValue: function() {
    var fundPrice = this.get('fundPrice') || currency(""),
       remaining = this.get('quantityRemaining') || currency("");
    return fundPrice.multiply(remaining);
  }.property('fundPrice', 'quantityRemaining'),

  unrealizedValueChange: function() {
    // TODO, may need to take sells into account
    var fundPrice = this.get('fundPrice') || currency("0.0"),
        remaining = this.get('quantityRemaining');
    return fundPrice.subtract(this.get('shareCost')).multiply(remaining);
  }.property('fundPrice', 'shareCost', 'quantityRemaining'),
});
