const db = require('../config/db.config.js');
const Job = require('../model/job.model.js');
const jwt = require('jsonwebtoken')

//user object constructor
 const userFiles = './user_upload/';
const fs = require('fs');


exports.create = function(req, jobRes) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    jwt.verify(bearerToken, 'iloveng', function(err, decoded){
    if(err || !decoded){
    return jobRes.sendStatus(401)
    }else{
      console.log(decoded.data);
        const fileData = req.body.file;
           const base64data = fileData.replace(/^data:.*,/, '');
            const type = fileData.substring(fileData.indexOf('/') + 1, fileData.indexOf(';base64'));
             let new_image_name = new Date().getTime()+"."+type;

            fs.writeFile(userFiles + new_image_name, base64data, 'base64', (err, res) => {
             if (err) {
               jobRes.sendStatus(500);
             }  else {

            var jobData = new Job(req.body);
            jobData.client_id = decoded.data[0].id;
          jobData.job_media  = new_image_name;
            Job.createJob(jobData, function(err, result) {
          if(err) {
                return jobRes.send({
                code : 400,
                message : "errors"
              });
          } else {

               return jobRes.send({
                code : 200,
                message : "Job Created Successfully!!"
              });
          }
        });
             }
        });
    }
    })
    } else {
    jobRes.sendStatus(403);
    }

};

exports.allJobs = function(req, res) {

  Job.getAllJobs(function(err, jobs) {
    console.log('controller')
    if (err)
      res.send(err);
    res.send(jobs);
  });

};

exports.viewtask = function(req, res) {
  Job.getJobById(req.params.jobId, function(err, job) {
    if (err)
      res.send(err);
    res.send(job);
  });
};

