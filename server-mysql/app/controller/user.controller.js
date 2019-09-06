const db = require('../config/db.config.js');
const User = require('../model/user.model.js');
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

//user object constructor
 const userFiles = './user_upload/';
const fs = require('fs');



exports.register = function(req, resmAIN) {
     const fileData = req.body.file;
     const base64data = fileData.replace(/^data:.*,/, '');
      const type = fileData.substring(fileData.indexOf('/') + 1, fileData.indexOf(';base64'));
       let new_image_name = new Date().getTime()+"."+type;

      fs.writeFile(userFiles + new_image_name, base64data, 'base64', (err, res) => {
       if (err) {
         res.sendStatus(500);
       } else {
               var userData = new User(req.body);
               userData.userprofile = new_image_name;
               User.createUser(userData, function(err, result) {
              if(err) {
                    return resmAIN.send({
                    code : 100,
                    message : "errors"
                  });
              } else {

                   return resmAIN.send({
                    code : 200,
                    message : "User Registered Successfully"
                  });
              }

           
          });
       }
     });


};


exports.userList = function(req, res) {
console.log("adasd");

  User.getAllUser(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });




};


exports.login  = function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  db.query('SELECT * FROM users WHERE username = ?',[username], function (error, user, fields) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results);
    if(user.length >0){
      if(user[0].password == password){
        token = jwt.sign({data:user},"iloveng", { expiresIn: 86400 });
        res.send({
          "code":200,
          "success":"login sucessfull",
          "token":token
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}



exports.profile  = function(req,res){

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    jwt.verify(bearerToken, 'iloveng', function(err, decoded){
    if(err || !decoded){
    return res.sendStatus(401)
    }else{
      let client_id = decoded.data[0].id;
  db.query("select *,u.id as u_id from users as u left join jobs as j on u.id = j.client_id where u.id  = ?", client_id, function (err, result, fields) {             
        if(err) {
          result(err, null);
          }
            else{
              res.send({
              "code":204,
              "useriwthjobs":result
              });
            }
          });  
        }
    })
    } else {
    res.sendStatus(403);
    }
}
