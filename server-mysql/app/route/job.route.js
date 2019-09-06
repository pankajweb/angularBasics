module.exports = function(app) {
 
    const job = require('../controller/job.controller.js');
 
    // Create a new Customer
    app.post('/api/job/create', job.create);
    app.get('/api/job/list', job.allJobs);
    app.get('/api/job/:jobId', job.viewtask);
  
}