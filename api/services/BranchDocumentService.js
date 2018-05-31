'use strict';

var mainApp = require('./../../app');
var util = require('util');
// var nano = require('nano')(mainApp.get("couch_db_host"));
// var db = nano.use(mainApp.get("couch_db_name"));

// var nano = require('nano')("http://127.0.0.1:5984");
// var db = nano.use("indigo");

module.exports = {
    getJobsByBranchID : getJobsByBranchID
};


function getJobsByBranchID(branch, cookies) {

    return new Promise(function (resolve, reject) {

      var db = require('nano')({ 
        url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
        cookie : cookies
      });

      db.view('views', 'viewJobsByBranchID', { key : branch._id}, function(err, body) {
        if (!err) {

          branch.jobs = [];

          for (var i = 0; i < body.rows.length; i++) {
            branch.jobs.push(body.rows[i].value);
          }

          // console.log(branch);

          resolve(branch);
        } else{
          // console.log(err);
          reject(err);
        }
      });

    });
}


// function getJobsByBranchID(branch) {

//     return new Promise(function (resolve, reject) {

//         db.view('views', 'viewJobsByBranchID', { key : branch._id}, function(err, body) {
//           if (!err) {

//             branch.jobs = [];

//             for (var i = 0; i < body.rows.length; i++) {
//               branch.jobs.push(body.rows[i].value);
//             }

//             // console.log(branch);

//             resolve(branch);
//           } else{
//             // console.log(err);
//             reject(err);
//           }
//         });

//     });
// }