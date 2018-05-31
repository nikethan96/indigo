'use strict';

var mainApp = require('./../../app');
var util = require('util');
// var nano = require('nano')(mainApp.get("couch_db_host"));
// var db = nano.use(mainApp.get("couch_db_name"));

// var nano = require('nano')("http://127.0.0.1:5984");
// var db = nano.use("indigo");

module.exports = {
    createDocument : createDocument,
    getAllDocuments : getAllDocuments,
    getDocumentByID : getDocumentByID,
    updateDocument : updateDocument,
    deleteDocument : deleteDocument,
    getDocumentByCollection : getDocumentsByCollection,
    getDocumentByViewID : getDocumentByViewID
};

function createDocument(documentData, collection, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });
        
        documentData.collection = collection;
        
        
        db.insert(documentData, function(err, body, header) {
            if (err) {
                console.log(err);
                reject("error adding document to server, please try again later!");
            }else{
                // console.log(body);
                resolve(body);
            }
        });

    });

}

function getAllDocuments(cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.list({include_docs : true}, function(err, body) {
            if (!err) { 
                resolve(body);
            }else{
                reject(err);;
            }
        }); 

    });   

}

function getDocumentByID(id, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.get(id, {}, function(err, body) {
            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });

    });   

}

function updateDocument(document, newdocumentData, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        for (var key in newdocumentData) {
            if (newdocumentData.hasOwnProperty(key)) {

                document[key] = newdocumentData[key];

            }
        }

        db.insert(document, function(err, body) {

            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });

    });

}

function deleteDocument(document, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.destroy(document._id, document._rev, function(err, body) {
            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });  

    });   

}

function getDocumentsByCollection(collection, limitPrams, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.view('views', 'viewByCollection', { keys:[collection], limit : limitPrams}, function(err, body) {
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

function getDocumentByViewID(id, cookies) {

    return new Promise(function (resolve, reject) {

        var db = require('nano')({ 
            url : 'https://couchdb-0b3df1.smileupps.com/indigo', 
            cookie : cookies
        });

        db.view('views', 'viewById', { key : id}, function(err, body) {
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
function createDocument(documentData, collection) {

    return new Promise(function (resolve, reject) {

        documentData.collection = collection;
        
        db.insert(documentData, function(err, body, header) {
            if (err) {
                // console.log(err);
                reject("error adding document to server, please try again later!");
            }else{
                // console.log(body);
                resolve(body);
            }
        });

    });

}

function getAllDocuments() {

    return new Promise(function (resolve, reject) {

        db.list({include_docs : true}, function(err, body) {
            if (!err) {	
                resolve(body);
            }else{
                reject(err);;
            }
        }); 

    });   

}

function getDocumentByID(id) {

    return new Promise(function (resolve, reject) {

        db.get(id, {}, function(err, body) {
            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });

    });   

}

function updateDocument(document, newdocumentData) {

    return new Promise(function (resolve, reject) {

        for (var key in newdocumentData) {
            if (newdocumentData.hasOwnProperty(key)) {

                document[key] = newdocumentData[key];

            }
        }

        db.insert(document, function(err, body) {

            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });

    });

}

function deleteDocument(document) {

    return new Promise(function (resolve, reject) {

        db.destroy(document._id, document._rev, function(err, body) {
            if (!err){
                resolve(body);
            }else{
                reject(err);
            }
        });  

    });   

}

function getDocumentsByCollection(collection, limitPrams) {

    return new Promise(function (resolve, reject) {

        db.view('views', 'viewByCollection', { keys:[collection], limit : limitPrams}, function(err, body) {
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

function getDocumentByViewID(id) {

    return new Promise(function (resolve, reject) {

        db.view('views', 'viewById', { key : id}, function(err, body) {
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

