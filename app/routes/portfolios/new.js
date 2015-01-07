import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.createRecord('portfolio', params);
  },
  setupController: function(controller, model) {
    controller.set('model', model);

    var allAssetClasses = this.store.find('portfolio');
    allAssetClasses.then(function(data) {
      controller.set('allAssetClasses', data);
    });
  }
});
