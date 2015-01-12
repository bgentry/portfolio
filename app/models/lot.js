import DS from 'ember-data';

export default DS.Model.extend({
  portfolio: DS.belongsTo('portfolio', {async: true}),
  fund: DS.belongsTo('fund', {async: true}),

  dateAcquired: DS.attr('date'),
  dateSold: DS.attr('date'),
  quantity: DS.attr('number'),
  shareCost: DS.attr('number'),

  value: function() {
    return this.get('quantity') * this.get('shareCost');
  }.property('quantity', 'shareCost'),
});
