var LOT_FIXTURES = [{
  id: "1",
  portfolio_id: "1",
  fund_id: "1",
  acquired_at: "2015-01-12T19:40:09Z",
  share_cost: 104.27,
  quantity: 15.0,
}, {
  id: "2",
  portfolio_id: "1",
  fund_id: "1",
  acquired_at: "2015-01-08T19:40:09Z",
  share_cost: 106.21,
  quantity: 35.0,
}, {
  id: "3",
  portfolio_id: "1",
  fund_id: "2",
  acquired_at: "2011-11-18T20:30:09Z",
  share_cost: 29.32,
  quantity: 150,
  quantity_sold: 14.0,
  sells: ["1"],
}, {
  id: "4",
  portfolio_id: "1",
  fund_id: "2",
  acquired_at: "2012-03-02T20:30:09Z",
  share_cost: 33.13,
  quantity: 100,
}, {
  id: "5",
  portfolio_id: "1",
  fund_id: "2",
  acquired_at: "2014-12-29T20:30:09Z",
  share_cost: 50.579,
  quantity: 74,
  quantity_sold: 74,
  sells: ["2"],
}, {
  id: "6",
  portfolio_id: "1",
  fund_id: "1",
  acquired_at: "2015-01-08T19:40:09Z",
  share_cost: 106.00,
  quantity: 2.1,
}, {
  id: "7",
  portfolio_id: "1",
  fund_id: "3",
  acquired_at: "2014-12-29T19:40:09Z",
  share_cost: 31.23,
  quantity: 14.0,
}, {
  id: "8",
  portfolio_id: "1",
  fund_id: "4",
  acquired_at: "2015-01-06T19:40:09Z",
  share_cost: 105.42,
  quantity: 8.0,
}, {
  id: "9",
  portfolio_id: "1",
  fund_id: "5",
  acquired_at: "2014-01-16T19:40:09Z",
  share_cost: 46.52,
  quantity: 2.0,
}];

module.exports = function(app) {
  var express = require('express');
  var lotsRouter = express.Router();

  var getLot = function(id) {
    return LOT_FIXTURES.filter(function(lot) {
      if (lot.id === id) {
        return lot;
      }
    })[0];
  }

  lotsRouter.get('/', function(req, res) {
    res.send({
      'lots': LOT_FIXTURES
    });
  });

  lotsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  lotsRouter.get('/:id', function(req, res) {
    res.send({ 'lot': getLot(req.params.id) });
  });

  lotsRouter.put('/:id', function(req, res) {
    res.send({ 'lot': req.params });
  });

  lotsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/lots', lotsRouter);
};
