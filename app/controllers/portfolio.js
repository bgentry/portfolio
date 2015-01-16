import Ember from 'ember';
import groupBy from '../computed/group-by';

export default Ember.ObjectController.extend({
  groupedLots: groupBy('lots', 'assetClass.id'),
});
