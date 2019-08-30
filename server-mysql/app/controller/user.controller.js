const db = require('../config/db.config.js');
const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken')

exports.register = function(req, res) {

  var userData = new User(req.body);
  
      User.createUser(userData, function(err, result) {
    if(err) {
    	    return res.send({
					code : 100,
					message : err
				});
    } else {

    	   return res.send({
					code : 200,
					message : "User Registered Successfully"
				});
    }

 
  });

};





