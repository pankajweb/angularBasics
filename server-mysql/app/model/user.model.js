const db = require('../config/db.config.js');
//user object constructor

var UserData = function(data){
	this.firstname = data.firstname;
	this.lastname  = data.lastname;
	this.username  = data.username;
	this.password  = data.password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
 };

UserData.createUser = function (newUser, result) {  
  db.query("INSERT INTO users set ?", newUser, function (err, res) {
                
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






module.exports= UserData;


