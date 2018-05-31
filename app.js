'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

var documentDataService = require('./api/services/DocumentDataService.js');
var jobsDocumentDataService = require('./api/services/JobsDocumentDataService.js');

//CORS and Header Parameters
require('./middleware/CrossOriginMW')(app); 

//Application Configurations
require('./config/Configurations')(app);

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
  	console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
	}

  var timestamp = new Date();
  // console.log(timestamp);

  var job = {
    "branchID" : "1281716c012cfddf6437ebc5ec003235",
    "post" : "cashier",
    "allowance" : "1000",
    "timestamp" : timestamp,
    "latitude" : 7.715494,
    "longitude" : 84.904991
  };

  var branch = {
    "organizationID" : "1281716c012cfddf6437ebc5ec0021f7",
    "branch" : "mount lavinia",
    "description" : "LOL", 
    "latitude" : 7.715494,
    "longitude" : 84.904991
  };

  var organization = {
    "name" : "KFC",
    "image" : "URL",
    "Founder" : "Colonel Sanders", 
    "Founded" : "1930, North Corbin, Kentucky, United States",
    "description" : "Kentucky Fried Chicken, more commonly known by its initials KFC, is an American fast food restaurant chain that specializes in fried chicken."
  };

  // documentDataService.createDocument(job, "Job").then(function (json){
  //   console.log(json);
  // }).catch(function (err){
  //   console.log(err);
  // });

  // jobsDocumentDataService.viewByTimestampOnCollectionlol().then(function (json){
  //   console.log(json.rows);
  // }).catch(function (err){
  //   console.log(err);
  // });

});


