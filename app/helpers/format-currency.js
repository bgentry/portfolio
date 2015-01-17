import Ember from 'ember';
import currency from 'currency';

export function formatCurrency(value) {
  if (value === undefined || value === null) {
    return null;
  }
  return currency(value).format(true);
}

export default Ember.Handlebars.makeBoundHelper(formatCurrency);
