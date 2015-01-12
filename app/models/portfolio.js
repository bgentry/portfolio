import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  allocations: DS.hasMany('allocations'),
  lots: DS.hasMany('lots', {async: true}),

  assetClasses: Ember.computed.mapBy('allocations', 'assetClass')
});
