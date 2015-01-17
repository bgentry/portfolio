import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  assetClass: DS.belongsTo('asset-class', { async: true }),
  portfolio: DS.belongsTo('portfolio'),
  weight: DS.attr('number', {
    defaultValue: function() { return 0; }
  }),

  assetClassName: Ember.computed.alias('assetClass.name')
});
