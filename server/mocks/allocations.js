var ALLOCATION_FIXTURES = [{
  id: "1",
  asset_class_id: "1",
  portfolio_id: "1",
  weight: 0.3
}, {
  id: "2",
  asset_class_id: "2",
  portfolio_id: "1",
  weight: 0.5
}, {
  id: "3",
  asset_class_id: "3",
  portfolio_id: "1",
  weight: 0.2
}];

module.exports = function(app) {
  var express = require('express');
  var allocationsRouter = express.Router();

  var getAllocation = function(id) {
    return ALLOCATION_FIXTURES.filter(function(allocation) {
      if (allocation.id === id) {
        return allocation;
      }
    })[0];
  }

  allocationsRouter.get('/', function(req, res) {
    res.send({'allocations': ALLOCATION_FIXTURES});
  });

  allocationsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  allocationsRouter.get('/:id', function(req, res) {
    res.send({'allocation': getAllocation(req.params.id)});
  });

  allocationsRouter.put('/:id', function(req, res) {
    var requestedAllocation = ALLOCATION_FIXTURES.filter(function(allocation) {
      if (allocation.id === req.params.id) {
        return allocation;
      }
    })[0];
    res.send({'allocation':  getAllocation(req.params.id)});
  });

  allocationsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/allocations', allocationsRouter);
};
