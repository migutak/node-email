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
var callbackshare = require('./callbackshare');
var passwordreset = require('./passwordreset');
var inviteuser = require('./inviteuser');

//app.use(morgan(ecsFormat()))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors())

app.use('/demandemail', email);
app.use('/ipfrevocation', ipfrevocation);
app.use('/ipfcancellation', ipfcancellation);
app.use('/callbackshare', callbackshare);
app.use('/passwordreset', passwordreset);
app.use('/inviteuser', inviteuser);

router.get('/', function (req, res) {
    res.json({ message: 'Email service ready!' }); 
  });
  

  //add the router
app.use('/', router);
app.listen(process.env.port || 8050);

console.log('Running at Port 8050');
