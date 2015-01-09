import Ember from 'ember';
import DataRoute from 'ember-data-route/mixins/data-route';

export default Ember.Route.extend(DataRoute, {
  model: function(params) {
    return this.store.createRecord('portfolio', params);
  },
  resetController: function() {
    this._super();

    // Special work to cleanup after unsaved children. In this case, we need to
    // clean up the allocations when they weren't saved.
    //
    // This might just be due to a bug that should be fixed by ember-data 1.0:
    // https://github.com/dockyard/ember-data-route/issues/12
    var model = this.get('controller.model');
    model.eachRelationship(function(name, descriptor) {
      if(descriptor.kind === "hasMany") {
        var items = model.get(name);
        items.forEach(function(item) {
          if(item !== null && !item.get('isDeleted')) {
            if (item.get('isNew')) {
              item.deleteRecord();
            } else {
              item.rollback();
            }
          }
        });
      }
    });
  },
  setupController: function(controller, model) {
    controller.set('model', model);

    var allAssetClasses = this.store.find('asset-class');
    allAssetClasses.then(function(data) {
      controller.set('allAssetClasses', data);
    });
  }
});
