'use strict';

var mainApp = require('./../../app');
var util = require('util');
// var nano = require('nano')(mainApp.get("couch_db_host"));
// var db = nano.use(mainApp.get("couch_db_name"));

// var nano = require('nano')("http://127.0.0.1:5984");
// var db = nano.use("indigo");

module.exports = {
    getDocumentByTimestampOnCollectionJobs : getDocumentByTimestampOnCollectionJobs,
    getBranchByBranchID : getBranchByBranchID,
    getOrganizationByOrganizationID : getOrganizationByOrganizationID,
    getDocumentByTimestampOnCollectionJobsbyKey : getDocumentByTimestampOnCollectionJobsbyKey,
    viewByTimestampOnCollectionlol : viewByTimestampOnCollectionlol
};

function getDocumentByTimestampOnCollectionJobs(limitPrams, startKeyPrams, endKeyPrams, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

      // { descending : true, limit : limitPrams, include_docs : true, startkey : startKeyPrams, endkey : endKeyPrams, keys:[5.715494]}

      // var startkey = [{}, parseFloat((7.715494 + 0.02), 10).toFixed(6), parseFloat((84.904991 + 0.02), 10).toFixed(6)];
      // var endkey = [, parseFloat((7.715494 - 0.02), 10).toFixed(6), parseFloat((84.904991 - 0.02), 10).toFixed(6)];

      // var startkey = [8.745494, 85.924991, {}];
      // var endkey = [8.695494, 85.884991, ];

      // var startkey = [7.745494, 84.924991, {}];
      // var endkey = [7.695494, 84.884991, ];

      // console.log(startkey);
      // console.log(endkey);

      //viewByTimestampOnCollectionJobs  testview

      db.view('views', 'testview', {descending : true, limit : limitPrams, startkey : startKeyPrams, endkey : endKeyPrams}, function(err, body) {
        if (!err) {
          console.log("***********");
          console.log(body.rows);
          console.log("^^^^^^^");
          // console.log(body.rows[0].value.appliersId);
          console.log(body.rows[0].key);
          console.log(body.rows[1].key);
          resolve(body);
        } else{
          console.log(err);
          reject(err);
        }
      });

    });
}

function getBranchByBranchID(job, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.view('views', 'viewById', { key : job.branchID}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            job.branch = body.rows[0].value;
            resolve(job);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}

function getOrganizationByOrganizationID(job, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.view('views', 'viewById', { key : job.branch.organizationID}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            job.branch.organization = body.rows[0].value;
            resolve(job);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}

function getDocumentByTimestampOnCollectionJobsbyKey(keyPrams, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

      // { descending : true, limit : limitPrams, include_docs : true, startkey : startKeyPrams, endkey : endKeyPrams, keys:[5.715494]}

      db.view('views', 'viewByTimestampOnCollectionJobs', {key : [, , , keyPrams] }, function(err, body) {
        if (!err) {
          // console.log(body.rows);
          resolve(body);
        } else{
          // console.log(err);
          reject(err);
        }
      });

    });
}

function viewByTimestampOnCollectionlol(cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.view('views', 'viewByall', {descending : true, include_docs : true}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            resolve(body);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}


/*
function getDocumentByTimestampOnCollectionJobs(limitPrams, startKeyPrams, endKeyPrams) {

    return new Promise(function (resolve, reject) {

      // { descending : true, limit : limitPrams, include_docs : true, startkey : startKeyPrams, endkey : endKeyPrams, keys:[5.715494]}

      // var startkey = [{}, parseFloat((7.715494 + 0.02), 10).toFixed(6), parseFloat((84.904991 + 0.02), 10).toFixed(6)];
      // var endkey = [, parseFloat((7.715494 - 0.02), 10).toFixed(6), parseFloat((84.904991 - 0.02), 10).toFixed(6)];

      // var startkey = [8.745494, 85.924991, {}];
      // var endkey = [8.695494, 85.884991, ];

      // var startkey = [7.745494, 84.924991, {}];
      // var endkey = [7.695494, 84.884991, ];

      // console.log(startkey);
      // console.log(endkey);

      db.view('views', 'viewByTimestampOnCollectionJobs', {descending : true, limit : limitPrams, startkey : startKeyPrams, endkey : endKeyPrams}, function(err, body) {
        if (!err) {
          console.log(body.rows);
          // console.log(body.rows[0].key);
          // console.log(body.rows[1].key);
          resolve(body);
        } else{
          console.log(err);
          reject(err);
        }
      });

    });
}

function getBranchByBranchID(job) {

    return new Promise(function (resolve, reject) {

        db.view('views', 'viewById', { key : job.branchID}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            job.branch = body.rows[0].value;
            resolve(job);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}

function getOrganizationByOrganizationID(job) {

    return new Promise(function (resolve, reject) {

        db.view('views', 'viewById', { key : job.branch.organizationID}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            job.branch.organization = body.rows[0].value;
            resolve(job);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}

function getDocumentByTimestampOnCollectionJobsbyKey(keyPrams) {

    return new Promise(function (resolve, reject) {

      // { descending : true, limit : limitPrams, include_docs : true, startkey : startKeyPrams, endkey : endKeyPrams, keys:[5.715494]}

      db.view('views', 'viewByTimestampOnCollectionJobs', {key : [, , , keyPrams] }, function(err, body) {
        if (!err) {
          // console.log(body.rows);
          resolve(body);
        } else{
          // console.log(err);
          reject(err);
        }
      });

    });
}

function viewByTimestampOnCollectionlol() {

    return new Promise(function (resolve, reject) {

        db.view('views', 'viewByall', {descending : true, include_docs : true}, function(err, body) {
          if (!err) {
            // console.log(body.rows);
            resolve(body);
          } else{
            // console.log(err);
            reject(err);
          }
        });

    });
}

*/