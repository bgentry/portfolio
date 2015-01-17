import Ember from 'ember';

export default Ember.ObjectController.extend({
  allWeights: Ember.computed.mapBy('allocations', 'weight'),
  closedLots: Ember.computed.filterBy('lots', 'isClosed'),
  openLots: Ember.computed.filterBy('lots', 'isOpen'),
  totalWeight: Ember.computed.sum('allWeights'),
});
