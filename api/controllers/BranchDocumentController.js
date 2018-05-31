
'use strict';

var util = require('util');
var documentDataService = require('../services/DocumentDataService.js');
var branchDocumentService = require('../services/BranchDocumentService.js');
var authenticationProvider = require('../providers/AuthenticationProvider.js');

module.exports = {
	getAllBranches : getAllBranches,
	getBranchByID : getBranchByID,
	createBranch : createBranch,
	updateBranch : updateBranch,
	deleteBranch : deleteBranch
};


function getAllBranches(req, res) {

    var limit = req.swagger.params.limit.value;

    var branches = [];

    if(limit == 0){
        res.json({branches: branches});
    }

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByCollection("Branch", limit, cookies).then(function (json){

            if(json.rows.length == 0){
                res.json({branches: branches});
            }

            for (var i = 0; i < json.rows.length; i++) {

                var branch = json.rows[i].value;

                branchDocumentService.getJobsByBranchID(branch, cookies).then(function (json1){

                    branches.push(json1);

                    if(branches.length == json.rows.length){
                        // console.log(branches);
                        res.json({branches : branches});
                    }
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }

        }).catch(function (err){
            res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
        }); 

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });

}

function getBranchByID(req, res) {

    var branchID = req.swagger.params.ID.value;
   
    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByID(branchID, cookies).then(function (json){

            if("Branch" == json.collection){

                branchDocumentService.getJobsByBranchID(json, cookies).then(function (json1){

                    res.json({branches : json1});

                    // res.json(json1);
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }else{
                res.status(500).json({ message: 'Given branch ID is wrong'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Branch in given branch ID'});
        }); 

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });

}

function createBranch(req, res) {
    
    var branch = {};
    branch.organizationID = req.body.organizationID || '';
    branch.branch = req.body.branch || '';
    branch.description = req.body.description || '';
    branch.latitude = req.body.latitude || 0;
    branch.longitude = req.body.longitude || 0;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(branch.organizationID. cookies).then(function (json2){

            if("Organization" == json2.rows[0].value.collection){

                documentDataService.createDocument(branch, "Branch", cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to create the Branch Document'});
                });

            }else{
                res.status(500).json({ message: 'Given organizationID is wrong'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Organization in given organizationID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function updateBranch(req, res) {
    
    var branch = {};
    var id = req.swagger.params.branchID.value;
    branch.organizationID = req.body.organizationID || '';
    branch.branch = req.body.branch || '';
    branch.description = req.body.description || '';
    branch.latitude = req.body.latitude || '';
    branch.longitude = req.body.longitude || '';

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Branch" == json2.rows[0].value.collection){

                documentDataService.updateDocument(json2.rows[0].value, branch, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to update the Branch Document'});
                });
                
            }else{
                res.status(500).json({ message: 'Given branchID is wrong'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Branch in given branchID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function deleteBranch(req, res) {
    
    var id = req.swagger.params.branchID.value;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Branch" == json2.rows[0].value.collection){

                documentDataService.deleteDocument(json2.rows[0].value, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to delete the Branch document'});
                });
                
            }else{
                res.status(500).json({ message: 'Given branchID is wrong'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Branch in given branchID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}