import Ember from 'ember';

export default Ember.Component.extend({
  portfolio: null,

  classNames: ['holdings-table'],

  allocations: Ember.computed.alias('portfolio.allocations'),
  lots: Ember.computed.alias('portfolio.lots'),
  allocationsSorting: ['weight:desc'],
  sortedAllocations: Ember.computed.sort('allocations', 'allocationsSorting'),

  allWeights: Ember.computed.mapBy('allocations', 'weight'),
  totalValue: Ember.computed.alias('portfolio.totalValue'),
  totalWeight: Ember.computed.sum('allWeights'),
});
