import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function(params) {
    return this.store.createRecord('portfolio', params);
  },
  setupController: function(controller, model) {
    controller.set('model', model);

    var allAssetClasses = this.store.find('asset-class');
    allAssetClasses.then(function(data) {
      controller.set('allAssetClasses', data);
    });
  }
});
