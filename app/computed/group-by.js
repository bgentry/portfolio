import Ember from 'ember';

var get = Ember.get,
    arrayComputed = Ember.arrayComputed;

export default function (dependentKey, property) {
  var options = {
    initialValue: [],

    addedItem: function(array, item) {
      var key   = get(item, property),
          group = array.findBy('key', key);

      if (!group) {
        group = Ember.ArrayProxy.create({
          content: [],
          key: key
        });
        array.pushObject(group);
      }
      group.pushObject(item);
      return array;
    },

    removedItem: function(array, item) {
      var key   = get(item, property),
          group = array.findBy('key', key);

      if (!group) {
        return;
      }
      group.removeObject(item);
      if (get(group, 'length') === 0) {
        array.removeObject(group);
      }
      return array;
    }
  };
  return arrayComputed(dependentKey, options);
}
