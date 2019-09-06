const db = require('../config/db.config.js');
//user object constructor

var jobData = function(data){

    this.job_title        = data.job_title;
	this.job_desc         = data.job_desc;
	this.job_price        = data.job_price;
    this.job_type         = data.job_type;
    this.country          = data.country;
    this.createdAt        = new Date();
    this.updatedAt        = new Date();
 };


jobData.createJob = function (newjob , result) {  
  db.query("INSERT INTO jobs set ?", newjob, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res.insertId);
                }
            }); 
};

jobData.getAllJobs = function (result) {

	var sql = "SELECT *,jobs.id as job_id FROM jobs JOIN users ON users.id = jobs.client_id";
        db.query(sql, function (err, res) {
                if(err) {
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });   
};


jobData.getJobById = function (jobId, result) {
    console.log(jobId);
        db.query("Select *,jobs.id as job_id from jobs JOIN users ON users.id = jobs.client_id where jobs.id = ? limit 1", jobId, function (err, res, fields) {             
                if(err) {
                    result(err, null);
                }
                else{
                    result(null, JSON.stringify(res));
                }
            });   
};



module.exports= jobData;
