const express = require('express');
var morgan = require('morgan');
const ecsFormat = require('@elastic/ecs-morgan-format');
const app = express();
require('log-timestamp');
const router = express.Router();
const cors = require('cors')

//include the routes file
var email = require('./email');
var ipfrevocation = require('./ipfrevocation');
var ipfcancellation = require('./ipfcancellation');

//app.use(morgan(ecsFormat()))

app.use('/demandemail', email);
app.use('/ipfrevocation', ipfrevocation);
app.use('/ipfcancellation', ipfcancellation);

router.get('/', function (req, res) {
    res.json({ message: 'Email service ready!' }); 
  });
  
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors())


  //add the router
app.use('/', router);
app.listen(process.env.port || 8005);

console.log('Running at Port 8005');
