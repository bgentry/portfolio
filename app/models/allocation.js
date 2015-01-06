import DS from 'ember-data';

export default DS.Model.extend({
  assetClass: DS.belongsTo('asset_class', { async: true }),
  portfolio: DS.belongsTo('portfolio', { async: true }),

  weight: DS.attr('number')
});
