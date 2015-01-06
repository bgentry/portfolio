var FUND_FIXTURES = [{
  id: "1",
  asset_class_id: "1",
  name: 'Vanguard Total Stock Market ETF',
  symbol: 'VTI',
  expense_ratio: '0.05'
}, {
  id: "2",
  asset_class_id: "1",
  name: 'Schwab US Broad Market ETF',
  symbol: 'SCHB',
  expense_ratio: '0.04'
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
