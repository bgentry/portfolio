import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    allocations: {embedded: 'always'}
  },
  serializeHasMany: function(record, json, relationship) {
    this._super(record, json, relationship);
    if (relationship.key === "allocations") {
      json.allocations.forEach(function(hash) {
        delete hash.portfolio_id;
      });
    }
  }
});
