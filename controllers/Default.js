'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.bye = function bye (req, res, next) {
  Default.bye(req.swagger.params, res, next);
};

module.exports.health = function health (req, res, next) {
  Default.health(req.swagger.params, res, next);
};

module.exports.hello = function hello (req, res, next) {
  Default.hello(req.swagger.params, res, next);
};


