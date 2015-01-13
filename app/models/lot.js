import DS from 'ember-data';
import currency from 'currency';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),

  dateAcquired: DS.attr('date'),
  dateSold: DS.attr('date'),
  quantity: DS.attr('number'),
  shareCost: DS.attr('number'),

  totalCost: function() {
    var shareCost = this.get('shareCost'),
       quantity = this.get('quantity');
    if (typeof(shareCost) === 'undefined' || typeof(quantity) === 'undefined') {
      return null;
    }

    return currency(this.get('shareCost')).multiply(this.get('quantity')).format();
  }.property('quantity', 'shareCost'),
});
