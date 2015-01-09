import {
  formatPercentage
} from 'portfolio/helpers/format-percentage';

module('FormatPercentageHelper');

test('it formats percentages correctly', function() {
  equal(formatPercentage(42), '42', "42 is converted into 42");
  equal(formatPercentage(42.0), '42', "42.0 is converted into 42");
  equal(formatPercentage(42.1), '42.1', "42.1 is converted into 42.1");
  equal(formatPercentage(42.05), '42', "42.05 is converted into 42");
  equal(formatPercentage(42.15), '42.1', "42.15 is converted into 42.1");
});
