import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  attr: {
    portfolio: {serialize: false},
    portfolio_id: {serialize: false}
  }
});
