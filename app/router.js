import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource("asset_classes");

  this.resource("asset_class", {
    path: "/asset_classes/:asset_class_id"
  });
});

export default Router;