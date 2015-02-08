import Ember from 'ember';

export default Ember.Component.extend({
  value: 0,
  maxValue: 100,
  height: 10,

  attributeBindings: ['height', 'width'],
  classNames: ['graph-bar'],
  tagName: 'svg',

  width: function() {
    var value = this.get('value'),
        maxValue = this.get('maxValue'),
        adjustedWidth = (value*100.0 / maxValue) * 100.0;
    return Math.floor(adjustedWidth);
  }.property('value', 'maxValue'),
});
