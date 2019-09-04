const db = require('../config/db.config.js');
const Job = require('../model/job.model.js');
const jwt = require('jsonwebtoken')

exports.create = function(req, res) {

  var jobData = new Job(req.body);
  console.log(jobData);
  
      Job.createJob(jobData, function(err, result) {
    if(err) {
    	    return res.send({
					code : 400,
					message : "errors"
				});
    } else {

    	   return res.send({
					code : 200,
					message : "Job Created Successfully!!"
				});
    }

 
  });

};

exports.allJobs = function(req, res) {
console.log("adasd");

  Job.getAllJobs(function(err, jobs) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', jobs);
    res.send(jobs);
  });

};
