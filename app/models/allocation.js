import DS from 'ember-data';

export default DS.Model.extend({
  assetClass: DS.belongsTo('asset_class', { async: true }),
  portfolio: DS.belongsTo('portfolio'),

  weight: DS.attr('percentage', {
    defaultValue: function() { return 0; }
  })
});
