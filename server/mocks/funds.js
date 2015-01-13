var FUND_FIXTURES = [{
  id: "1",
  asset_class_id: "1",
  name: 'Vanguard Total Stock Market ETF',
  symbol: 'VTI',
  expense_ratio: 0.05,
  price: 104.28,
  price_updated_at: "2015-01-12T21:00:00Z"
}, {
  id: "2",
  asset_class_id: "1",
  name: 'Schwab US Broad Market ETF',
  symbol: 'SCHB',
  expense_ratio: 0.04,
  price: 49.00,
  price_updated_at: "2015-01-12T21:00:00Z"
}, {
  id: "3",
  asset_class_id: "4",
  name: 'iPath® Dow Jones-UBS Commodity Index Total Return(SM) ETN',
  symbol: 'DJP',
  expense_ratio: 0.75,
  price: 28.78,
  price_updated_at: "2015-01-12T21:00:00Z"
}, {
  id: "4",
  asset_class_id: "4",
  name: 'Vanguard Energy ETF',
  symbol: 'VDE',
  expense_ratio: 0.12,
  price: 104.81,
  price_updated_at: "2015-01-12T21:00:00Z"
}]

module.exports = function(app) {
  var express = require('express');
  var fundsRouter = express.Router();

  var getFund = function(id) {
    return FUND_FIXTURES.filter(function(fund) {
      if (fund.id === id) {
        return fund;
      }
    })[0];
  }

  fundsRouter.get('/', function(req, res) {
    res.send({
      'funds': FUND_FIXTURES
    });
  });

  fundsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  fundsRouter.get('/:id', function(req, res) {
    res.send({ 'fund': getFund(req.params.id) });
  });

  fundsRouter.put('/:id', function(req, res) {
    res.send({ 'fund': getFund(req.params.id) });
  });

  fundsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/funds', fundsRouter);
};
