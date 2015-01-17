import Ember from 'ember';

export function formatPercentage(percentage) {
  percentage = percentage * 100.0;
  var wholePercs = Math.floor(percentage),
      decimalPortion = Math.abs(percentage - wholePercs);
  if (decimalPortion < 0.1) {
    return wholePercs.toString()+'%';
  }
  return percentage.toFixed(1)+'%';
}

export default Ember.Handlebars.makeBoundHelper(formatPercentage);
