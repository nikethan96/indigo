
'use strict';

var util = require('util');
var jobsDocumentDataService = require('../services/JobsDocumentDataService.js');
var documentDataService = require('../services/DocumentDataService.js');
var authenticationProvider = require('../providers/AuthenticationProvider.js');

module.exports = {
    getDiscoverJobs : getDiscoverJobs,
    getAllJobs : getAllJobs,
    getJobByID : getJobByID,
    createJob : createJob,
    updateJob : updateJob,
    deleteJob : deleteJob
};

function getDiscoverJobs(req, res) {

    var latitude = req.swagger.params.latitude.value;
    var longitude = req.swagger.params.longitude.value;
    var limit = req.swagger.params.limit.value;

    // var startkey = [Number(parseFloat((latitude + 0.02), 10).toFixed(6)), Number(parseFloat((longitude + 0.02), 10).toFixed(6)), {}];
    // var endkey = [Number(parseFloat((latitude - 0.02), 10).toFixed(6)), Number(parseFloat((longitude - 0.02), 10).toFixed(6)), ];

        var startkey = [Number(parseFloat((latitude + 0.02), 10).toFixed(6)), Number(parseFloat((longitude + 0.02), 10).toFixed(6)), ['2']];
    var endkey = [Number(parseFloat((latitude - 0.02), 10).toFixed(6)), Number(parseFloat((longitude - 0.02), 10).toFixed(6)), ['2']];

    authenticationProvider.authenticate().then(function (cookies){
        
        jobsDocumentDataService.getDocumentByTimestampOnCollectionJobs(limit, startkey, endkey, cookies).then(function (json){
            // console.log(json.rows);
            var jobs = [];

            if(json.rows.length == 0){
                res.json({jobs: jobs});
            }

            for (var i = 0; i < json.rows.length; i++) {

                var job = json.rows[i].value;

                jobsDocumentDataService.getBranchByBranchID(job, cookies).then(function (json1){

                    jobsDocumentDataService.getOrganizationByOrganizationID(json1, cookies).then(function (json2){

                        jobs.push(json2);

                        if(jobs.length == json.rows.length){
                            // console.log(jobs);
                            res.json({jobs: jobs});
                        }
                
                    }).catch(function (err){
                        res.status(500).json({ message: 'Failed to fetch the Organization Documents'});
                    });
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }

        }).catch(function (err){
            console.log(err);
            res.status(500).json({ message: 'Failed to fetch the Job Documents'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
 
}

function getAllJobs(req, res) {

    var limit = req.swagger.params.limit.value;

    var jobs = [];

    if(limit == 0){
        res.json({jobs: jobs});
    }
    
    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByCollection("Job", limit, cookies).then(function (json){

            if(json.rows.length == 0){
                res.json({jobs: jobs});
            }

            for (var i = 0; i < json.rows.length; i++) {

                var job = json.rows[i].value;
                
                jobsDocumentDataService.getBranchByBranchID(job, cookies).then(function (json1){

                    jobsDocumentDataService.getOrganizationByOrganizationID(json1, cookies).then(function (json2){

                        jobs.push(json2);

                        if(jobs.length == json.rows.length){
                            // console.log(jobs);
                            res.json({jobs: jobs});
                        }
                
                    }).catch(function (err){
                        res.status(500).json({ message: 'Failed to fetch the Organization Documents'});
                    });
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }

        }).catch(function (err){
            res.status(500).json({ message: 'Failed to fetch the Job Documents'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
   
}

function getJobByID(req, res) {

    var jobID = req.swagger.params.ID.value;
    
    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByID(jobID, cookies).then(function (json){

            console.log(json);

            if("Job" == json.collection){

                jobsDocumentDataService.getBranchByBranchID(json, cookies).then(function (json1){

                    jobsDocumentDataService.getOrganizationByOrganizationID(json1, cookies).then(function (json2){

                        res.json({job : json2});
                
                    }).catch(function (err){
                        res.status(500).json({ message: 'Failed to fetch the Organization Documents'});
                    });
                        
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to fetch the Branch Documents'});
                });

            }else{
                res.status(500).json({ message: 'No Job in given jobID'});
            }
            

        }).catch(function (err){
            res.status(500).json({ message: 'Failed to fetch the Job Documents'});
        }); 

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
      
}

function createJob(req, res) {
    
    var job = {};
    job.branchID = req.body.branchID || '';
    job.post = req.body.post || '';
    job.allowance = req.body.allowance || '';
    job.timestamp = req.body.timestamp || '';
    job.startTime = req.body.startTime || '';
    job.endTime = req.body.endTime || '';
    job.status = req.body.status || 0;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(job.branchID, cookies).then(function (json2){

            if("Branch" == json2.rows[0].value.collection){

                job.latitude = json2.rows[0].value.latitude;
                job.longitude = json2.rows[0].value.longitude;

                documentDataService.createDocument(job, "Job", cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to create the Job Document'});
                });

            }else{
                res.status(500).json({ message: 'No branch in given branchID'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No branch in given branchID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function updateJob(req, res) {
    
    var job = {};
    var id = req.swagger.params.jobId.value;
    job.branchID = req.body.branchID || '';
    job.post = req.body.post || '';
    job.allowance = req.body.allowance || '';
    job.timestamp = req.body.timestamp || '';
    job.startTime = req.body.startTime || '';
    job.endTime = req.body.endTime || '';

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Job" == json2.rows[0].value.collection){

                documentDataService.updateDocument(json2.rows[0].value, job, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to update the Job Document'});
                });
                

            }else{
                res.status(500).json({ message: 'No Job in given jobID'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Job in given jobID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

function deleteJob(req, res) {
    
    var id = req.swagger.params.jobId.value;

    authenticationProvider.authenticate().then(function (cookies){
        
        documentDataService.getDocumentByViewID(id, cookies).then(function (json2){

            if("Job" == json2.rows[0].value.collection){

                documentDataService.deleteDocument(json2.rows[0].value, cookies).then(function (json){
                    res.json({id: json.id});
                }).catch(function (err){
                    res.status(500).json({ message: 'Failed to delete the Job document'});
                });
                

            }else{
                res.status(500).json({ message: 'No Job in given jobID'});
            }

        }).catch(function (err){
            res.status(500).json({ message: 'No Job in given jobID'});
        });

    }).catch(function (err){
        res.status(500).json({ message: 'Authentication Error'});
    });
    
}

