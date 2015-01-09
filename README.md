# Portfolio

This is an Ember.js application that I'm building to help manage financial
portfolios. I intend for it to:

* track multiple portfolio allocations
* track current holdings in each portfolio, including cost basis info
* make recommendations for periodic rebalancing
* make recommendations for tax loss harvesting opportunities

A lot of this will be modeled after Betterment. I like their service, but can't
take advantage of their tax loss harvesting without transferring all assets into
their system.

This is my first real Ember.js project. I've opted for ember-cli and ember-data
as well. There's a real shortage of material describing best practices for
simple CRUD apps with ember-data, but I've done my best to synthesize what I
could find. Feedback welcome :)

As of now, the app's backend is just a mock server. At some point, I'll switch
that out for an actual API server in Rails, Go, or Node.

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

TODO
