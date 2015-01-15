import Ember from 'ember';
import DS from 'ember-data';
import currency from 'currency';

export default DS.Model.extend({
  name: DS.attr('string'),
  allocations: DS.hasMany('allocations'),
  lots: DS.hasMany('lots', {async: true}),

  assetClasses: Ember.computed.mapBy('allocations', 'assetClass'),
  openLots: Ember.computed.filterBy('lots', 'isOpen', true),
  openLotValues: Ember.computed.mapBy('openLots', 'marketValue'),
  // TODO: replace w/ a currency.js computed property
  totalValue: function() {
    var values = this.get('openLotValues'),
        sum = currency(0);
    values.compact().forEach(function(value) {
      sum = sum.add(value);
    });
    return sum;
  }.property('openLotValues.@each'),
});
