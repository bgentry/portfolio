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
    this.route("open");
  });

  this.resource("portfolios", function() {
    this.resource("portfolio", { path: "/:portfolio_id" });
    this.route("new");
  });
});

export default Router;
