var SELL_FIXTURES = [{
  id: "1",
  lot_id: "3",
  sold_at: "2012-07-03T20:30:09Z",
  price: 29.20,
  quantity: 14.0,
}, {
  id: "2",
  lot_id: "5",
  sold_at: "2015-01-08T19:30:09Z",
  price: 48.00,
  quantity: 74,
}];

module.exports = function(app) {
  var express = require('express');
  var sellsRouter = express.Router();

  var getSell = function(id) {
    return SELL_FIXTURES.filter(function(sell) {
      if (sell.id === id) {
        return sell;
      }
    })[0];
  }

  sellsRouter.get('/', function(req, res) {
    res.send({
      'sells': SELL_FIXTURES
    });
  });

  sellsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  sellsRouter.get('/:id', function(req, res) {
    res.send({ 'sell': getSell(req.params.id) });
  });

  sellsRouter.put('/:id', function(req, res) {
    res.send({ 'sell': req.params });
  });

  sellsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/sells', sellsRouter);
};

