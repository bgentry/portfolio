import Ember from 'ember';

export default Ember.ObjectController.extend({
  displayWeight: function(key, value, previousValue) {
    if (arguments.length > 1) { // setter
      this.set('weight', value / 100);
    }
    return this.get('weight') * 100;
  }.property('weight')
});
