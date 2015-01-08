import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    create: function(params) {
      console.log("CREATE PARAMS: ", params);
      var newPortfolio = this.get('model');
      var self = this;
      newPortfolio.save().then(function() {
        self.transitionToRoute('portfolio', newPortfolio);
      });
    }
  }
});
