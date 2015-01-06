import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  funds: DS.hasMany('fund', {async: true})
});
