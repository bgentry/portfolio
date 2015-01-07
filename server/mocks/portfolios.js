var PORTFOLIO_FIXTURES = [{
  id: "1",
  name: "Retirement",
  allocations: [{
    id: "1",
    asset_class_id: "1",
    weight: 0.3
  }, {
    id: "2",
    asset_class_id: "2",
    weight: 0.5
  }, {
    id: "3",
    asset_class_id: "3",
    weight: 0.2
  }]
}, {
  id: "2",
  name: "Safety Net",
}, {
  id: "3",
  name: "Aggressive Growth"
}];

module.exports = function(app) {
  var express = require('express');
  var portfoliosRouter = express.Router();

  var getPortfolio = function(id) {
    return PORTFOLIO_FIXTURES.filter(function(portfolio) {
      if (portfolio.id === id) {
        return portfolio;
      }
    })[0];
  }

  portfoliosRouter.get('/', function(req, res) {
    res.send({'portfolios': PORTFOLIO_FIXTURES});
  });

  portfoliosRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  portfoliosRouter.get('/:id', function(req, res) {
    res.send({'portfolio': getPortfolio(req.params.id)});
  });

  portfoliosRouter.put('/:id', function(req, res) {
    var requestedPortfolio = PORTFOLIO_FIXTURES.filter(function(portfolio) {
      if (portfolio.id === req.params.id) {
        return portfolio;
      }
    })[0];
    res.send({'portfolio':  getPortfolio(req.params.id)});
  });

  portfoliosRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/portfolios', portfoliosRouter);
};
