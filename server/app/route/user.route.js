module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');
 
    // Create a new Customer
    app.post('/api/register', users.register);
    app.post('/api/login', users.login);
    app.post('/api/profile', users.profile);
 
}