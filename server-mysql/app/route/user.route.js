module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');
  // user Routes
  app.route('/api/register').post(users.register)



}