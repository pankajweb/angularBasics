module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');

  // user Routes
  app.route('/api/register').post(users.register)
  app.route('/api/login').post(users.login)
  app.route('/api/userList').get(users.userList)
  app.route('/api/user/profile').get(users.profile)

   // job Routes



}