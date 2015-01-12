import DS from 'ember-data';

export default DS.Model.extend({
  // TODO: assetClass should be async: true, but there's a bug w/ that atm
  assetClass: DS.belongsTo('asset-class'),
  portfolio: DS.belongsTo('portfolio'),

  weight: DS.attr('percentage', {
    defaultValue: function() { return 0; }
  })
});
