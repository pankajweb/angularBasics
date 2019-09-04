var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(express.static('public'));
app.use('/user_upload', express.static(__dirname + '/user_upload'));




const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');

require('./app/route/job.route.js')(app);
require('./app/route/user.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

