import Ember from 'ember';

export default Ember.Controller.extend({
  displayWeight: function(key, value) {
    if (arguments.length > 1) { // setter
      this.set('model.weight', value / 100);
    }
    return this.get('model.weight') * 100;
  }.property('model.weight')
});
