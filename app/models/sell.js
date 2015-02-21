import Ember from 'ember';
import DS from 'ember-data';
import moment from 'moment';

export default DS.Model.extend({
  lot: DS.belongsTo('lot', {async: true}),

  price: DS.attr('currency'),
  quantity: DS.attr('number'),
  soldAt: DS.attr('date'),

  ownedDuration: function() {
    var acquiredAt = this.get('lot.acquiredAt'),
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
  }.property('lot.acquiredAt', 'soldAt'),

  isShortTerm: Ember.computed.lt('ownedDuration', moment.duration(1, 'year')),
  isLongTerm: Ember.computed.gte('ownedDuration', moment.duration(1, 'year')),
  isLoss: Ember.computed.lt('valueChange', 0),

  proceeds: function() {
    var quantity = this.get('quantity'),
        price = this.get('price');
    if (typeof(price) === 'undefined' || typeof(quantity) === 'undefined') {
      return null;
    }
    return price.multiply(quantity);
  }.property('quantity', 'price'),

  totalCost: function() {
    var shareCost = this.get('lot.shareCost'),
       quantity = this.get('quantity');
    if (typeof(shareCost) === 'undefined' || typeof(quantity) === 'undefined') {
      return null;
    }
    return shareCost.multiply(quantity);
  }.property('quantity', 'lot.shareCost'),

  valueChange: function() {
    var totalCost = this.get('totalCost'),
        proceeds = this.get('proceeds');
    if (proceeds == null) {
      return null;
    }
    return proceeds.subtract(totalCost || 0);
  }.property('isOpen', 'marketValue', 'proceeds', 'totalCost')
});
