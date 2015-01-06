var ASSET_CLASS_FIXTURES = [{
  id: "1",
  name: "US Stocks",
  fund_ids: ['1', '2']
}, {
  id: "2",
  name: "Bonds",
}, {
  id: "3",
  name: "Emerging Markets"
}];

module.exports = function(app) {
  var express = require('express');
  var assetClassesRouter = express.Router();

  var getAssetClass = function(id) {
    return ASSET_CLASS_FIXTURES.filter(function(assetClass) {
      if (assetClass.id === id) {
        return assetClass;
      }
    })[0];
  }

  assetClassesRouter.get('/', function(req, res) {
    res.send({'asset_classes': ASSET_CLASS_FIXTURES});
  });

  assetClassesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  assetClassesRouter.get('/:id', function(req, res) {
    res.send({'asset_class': getAssetClass(req.params.id)});
  });

  assetClassesRouter.put('/:id', function(req, res) {
    var requestedAssetClass = ASSET_CLASS_FIXTURES.filter(function(assetClass) {
      if (assetClass.id === req.params.id) {
        return assetClass;
      }
    })[0];
    res.send({'asset_class':  getAssetClass(req.params.id)});
  });

  assetClassesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/asset_classes', assetClassesRouter);
};
