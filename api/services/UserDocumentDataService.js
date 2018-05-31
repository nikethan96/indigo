'use strict';

var mainApp = require('./../../app');
var nano = require('nano')(mainApp.get("couch_db_host"));
var db = nano.use(mainApp.get("couch_db_name"));

module.exports = {
	
};