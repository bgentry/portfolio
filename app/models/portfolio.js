import Ember from 'ember';
import DS from 'ember-data';
import currency from 'currency';

export default DS.Model.extend({
  name: DS.attr('string'),
  taxable: DS.attr('boolean', {defaultValue: true}),
  allocations: DS.hasMany('allocations'),
  lots: DS.hasMany('lots', {async: true}),

  // TODO: the .content here is a workaround for an open Ember issue. Remove
  // it after https://github.com/emberjs/data/issues/2689 is resolved.
  assetClasses: Ember.computed.mapBy('allocations', 'assetClass.content'),
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
