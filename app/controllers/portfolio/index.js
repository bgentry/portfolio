import Ember from 'ember';

export default Ember.Controller.extend({
  allWeights: Ember.computed.mapBy('model.allocations', 'weight'),
  totalWeight: Ember.computed.sum('allWeights'),
});
