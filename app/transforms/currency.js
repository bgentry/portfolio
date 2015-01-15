import DS from 'ember-data';
import currency from 'currency';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (serialized == null) {
      return null;
    }
    return currency(serialized);
  },

  serialize: function(deserialized) {
    if (deserialized == null) {
      return null;
    }
    return deserialized.toJSON();
  }
});
