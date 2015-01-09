import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return serialized * 100;
  },

  serialize: function(deserialized) {
    return deserialized / 100;
  }
});
