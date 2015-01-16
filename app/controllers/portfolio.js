import Ember from 'ember';

export default Ember.ObjectController.extend({
  closedLots: Ember.computed.filterBy('lots', 'isClosed'),
  openLots: Ember.computed.filterBy('lots', 'isOpen'),
});
