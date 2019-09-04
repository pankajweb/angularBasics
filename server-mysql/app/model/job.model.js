const db = require('../config/db.config.js');
//user object constructor

var jobData = function(data){
	this.client_id        = data.client_id;
	this.job_description  = data.job_description;
	this.job_title        = data.job_title;
	this.job_media        = data.job_media;
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
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            }); 
};

jobData.getAllJobs = function (result) {

	var sql = "SELECT * FROM jobs JOIN users ON users.id = jobs.client_id";


        db.query(sql, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('users : ', res);  

                 result(null, res);
                }
            });   
};


module.exports= jobData;
