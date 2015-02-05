import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),

  acquiredAt: DS.attr('date'),
  proceeds: DS.attr('currency'),
  quantity: DS.attr('number'),
  shareCost: DS.attr('currency'),
  soldAt: DS.attr('date'),

  assetClass: Ember.computed.alias('fund.assetClass'),
  fundName: Ember.computed.alias('fund.name'),
  fundPrice: Ember.computed.alias('fund.price'),
  isOpen: Ember.computed.not('soldAt'),
  isClosed: Ember.computed.bool('soldAt'),
  isLoss: Ember.computed.lt('valueChange', 0),
  symbol: Ember.computed.alias('fund.symbol'),

  ownedDuration: function() {
    var acquiredAt = this.get('acquiredAt'),
        soldAt = this.get('soldAt');
    if (!acquiredAt) {
      return moment.duration();
    }
    if (!soldAt) {
      soldAt = new Date();
    }
    acquiredAt = moment(acquiredAt).startOf('day');
    soldAt = moment(soldAt).startOf('day');
    return moment.duration(soldAt - acquiredAt);
  }.property('acquiredAt', 'soldAt'),
  isShortTerm: Ember.computed.lt('ownedDuration', moment.duration(1, 'year')),
  isLongTerm: Ember.computed.gte('ownedDuration', moment.duration(1, 'year')),

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
    var isOpen = this.get('isOpen'),
        totalCost = this.get('totalCost');
    if (isOpen) {
      var marketValue = this.get('marketValue');
      if (marketValue == null) {
        return null;
      }
      return marketValue.subtract(totalCost || 0);
    }

    var proceeds = this.get('proceeds');
    if (proceeds == null) {
      return null;
    }
    return proceeds.subtract(totalCost || 0);
  }.property('isOpen', 'marketValue', 'proceeds', 'totalCost')
});
