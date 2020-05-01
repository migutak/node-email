const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors')

//include the routes file
var email = require('./email');
var home = require('./home');
var ipfcancellation = require('./ipfcancellation');
var ipfrevocation = require('./ipfrevocation');

app.use('/home', home);
app.use('/ipfcancellation', ipfcancellation);
app.use('/ipfrevocation', ipfrevocation);
app.use('/demandemail', email);

router.get('/', function (req, res) {
    res.json({ message: 'Email service ready!' }); 
  });
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())


  //add the router
app.use('/', router);
app.listen(process.env.port || 8005);

console.log('Running at Port 8005');