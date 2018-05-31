'use strict';

var mainApp = require('./../../app');
var util = require('util');
// var nano = require('nano')(mainApp.get("couch_db_host"));
// var db = nano.use(mainApp.get("couch_db_name"));

var nano = require('nano')('https://couchdb-0b3df1.smileupps.com'),   
  username = 'admin', 
  userpass = '13f9a45aea35', 
  callback = console.log,  // this would normally be some callback
  cookies  = {}; // store cookies, normally redis or something 

module.exports = {
    authenticate : authenticate
};


function authenticate() {

    return new Promise(function (resolve, reject) {

      nano.auth(username, userpass, function (err, body, headers) {
        if (err) {
          reject(err);
        }

        if (headers && headers['set-cookie']) {
          cookies.user = headers['set-cookie'];
        }else{
          reject(err);
        }

        resolve(cookies);

      });

    });
}