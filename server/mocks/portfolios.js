var PORTFOLIO_FIXTURES = [{
  id: "1",
  name: "Retirement",
  allocations: [{
    id: "1",
    asset_class_id: "1",
    weight: 0.35
  }, {
    id: "2",
    asset_class_id: "2",
    weight: 0.30
  }, {
    id: "3",
    asset_class_id: "3",
    weight: 0.15
  }, {
    id: "4",
    asset_class_id: "4",
    weight: 0.15
  }],
  lots: ["1", "2", "3", "4", "5"]
}, {
  id: "2",
  name: "Safety Net",
}, {
  id: "3",
  name: "Aggressive Growth"
}];

module.exports = function(app) {
  var express = require('express');
  var bodyParser = require('body-parser');
  var portfoliosRouter = express.Router();
  portfoliosRouter.use(bodyParser.json());

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
    console.log("BODY:", req.body);
    var body = req.body;
    body.portfolio.id = PORTFOLIO_FIXTURES.length+1;
    var minAllocID = 4;
    body.portfolio.allocations.forEach(function(allocation) {
      allocation.id = minAllocID;
      minAllocID++;
      allocation.portfolio_id = body.portfolio.id;
    });
    console.log(body.portfolio);
    res.status(201).send(body);
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
