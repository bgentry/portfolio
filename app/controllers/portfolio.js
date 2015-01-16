import Ember from 'ember';
import groupBy from '../computed/group-by';

export default Ember.ObjectController.extend({
  closedLots: Ember.computed.filterBy('lots', 'isClosed'),
  openLots: Ember.computed.filterBy('lots', 'isOpen'),
  groupedLots: groupBy('lots', 'assetClass.id'),
});
