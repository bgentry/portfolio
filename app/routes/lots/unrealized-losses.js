import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('lot', function(lot) {
      return lot.get('isOpen') && lot.get('isLoss');
    });
  },
  renderTemplate: function(controller) {
    this.render('lots/index', {controller: controller});
  }
});
