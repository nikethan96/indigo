
'use strict';

var util = require('util');
var documentDataService = require('../services/DocumentDataService.js');
var companyDocumentDataService = require('../services/OrganizationDocumentDataService.js');
var authenticationProvider = require('../providers/AuthenticationProvider.js');

module.exports = {
	getAllOrganizations : getAllOrganizations,
	getOrganizationByID : getOrganizationByID,
	createOrganization : createOrganization,
	updateOrganization : updateOrganization,
	deleteOrganization : deleteOrganization
};


function getAllOrganizations(req, res) {

    var limit = req.swagger.params.limit.value;

    var organizations = [];

    if(limit == 0){
        res.json({organizations: organizations});
    }

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByCollection("Organization", limit, cookies).then(function (json){

            if(json.rows.length == 0){
                res.json({organizations: organizations});
            }

            for (var i = 0; i < json.rows.length; i++) {

                var organization = json.rows[i].value;

                companyDocumentDataService.getBranchByOrganizationID(organization, cookies).then(function (json1){

                    organizations.push(json1);

                    if(organizations.length == json.rows.length){
                        console.log(organizations);
                        res.json({organizations : organizations});
                    }
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }

        }).catch(function (err){
            res.status(500).json({ message: 'Failed to fetch the Organization Documents'});
        }); 

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
      
}

function getOrganizationByID(req, res) {

    var organizationID = req.swagger.params.ID.value;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByID(organizationID, cookies).then(function (json){

            if("Organization" == json.collection){

                companyDocumentDataService.getBranchByOrganizationID(json, cookies).then(function (json1){

                    res.json({organization : json1});
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }else{
                res.status(500).json({ message: 'No organization in given organizationID'});
            }
            

        }).catch(function (err){
            res.status(500).json({ message: 'Failed to fetch the organization Documents'});
        });  

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });

}

function createOrganization(req, res) {
    
    var organization = {};
    organization.name = req.body.name || '';
    organization.image = req.body.image || '';
    organization.founder = req.body.founder || '';
    organization.founded = req.body.founded || '';
    organization.description = req.body.description || '';

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.createDocument(organization, "Organization", cookies).then(function (json){
            res.json({id: json.id});
        }).catch(function (err){
            res.status(500).json({ message: 'Failed to create the organization Document'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function updateOrganization(req, res) {
    
    var organization = {};
    var id = req.swagger.params.organizationID.value;
    organization.name = req.body.name || '';
    organization.image = req.body.image || '';
    organization.founder = req.body.founder || '';
    organization.founded = req.body.founded || '';
    organization.description = req.body.description || '';

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Organization" == json2.rows[0].value.collection){

                documentDataService.updateDocument(json2.rows[0].value, organization, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to update the Organization Document'});
                });
                

            }else{
                res.status(500).json({ message: 'No Organization in given organizationID'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Organization in given organizationID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function deleteOrganization(req, res) {
    
    var id = req.swagger.params.organizationID.value;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Organization" == json2.rows[0].value.collection){

                documentDataService.deleteDocument(json2.rows[0].value, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to delete the Organization document'});
                });
                

            }else{
                res.status(500).json({ message: 'No Organization in given organizationID'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Organization in given organizationID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}