module.exports = function(app) {
  var express = require('express');
  var assetClassesRouter = express.Router();

  assetClassesRouter.get('/', function(req, res) {
    res.send({asset_classes: [
      {id: "1", name: "US Stocks"}
    ]});
  });

  assetClassesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  assetClassesRouter.get('/:id', function(req, res) {
    res.send({
      'asset_class': {
        id: req.params.id,
        name: "US Stocks"
      }
    });
  });

  assetClassesRouter.put('/:id', function(req, res) {
    res.send({
      'asset_class': {
        id: req.params.id,
        name: "US Stocks"
      }
    });
  });

  assetClassesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/asset_classes', assetClassesRouter);
};
