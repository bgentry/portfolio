import DS from 'ember-data';

export default DS.Model.extend({
  assetClass: DS.belongsTo('asset_class', {async: true}),

  name: DS.attr('string'),
  symbol: DS.attr('string'),
  expenseRatio: DS.attr('number')
});
