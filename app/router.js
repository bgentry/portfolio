import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("asset_classes", function() {
    this.resource("asset_class", { path: "/:asset_class_id" });
  });

  this.resource("lots", function() {
    this.route("closed");
    this.route("open");
    this.route("unrealized-losses");
  });

  this.resource("portfolios", function() {
    this.resource("portfolio", { path: "/:portfolio_id" }, function() {
      this.route("edit");
    });
    this.route("new");
  });
});

export default Router;
