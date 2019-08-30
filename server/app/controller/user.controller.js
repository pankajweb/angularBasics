var Sequelize = require('sequelize');

const db = require('../config/db.config.js');
const User = db.users;
const jwt = require('jsonwebtoken')



// Post a Customer
exports.register = (req, res) => {	
  console.log("test");
	// Save to MySQL database
	let user = req.body;
	User.create(user).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};

// Post a Customer
exports.login = (req, res) => {	
	  User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        let token = jwt.sign({data: user}, 'iloveNg1', {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
};


// Post a Customer
exports.profile = (req, res) => {	

  token       = req.headers.authorization.split(' ')[1];
  var decoded = jwt.verify(token,'iloveNg1');

  User.findOne({
    where: {
      id: decoded.data.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })

};


exports.delete = (req, res) => {
  const id = req.params.userID;
  User.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json({msg:'deleted successfully a user with id = ' + id});
  });
};