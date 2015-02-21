import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['acquiredAtEndOfDay', 'symbol', 'quantity'],
});
