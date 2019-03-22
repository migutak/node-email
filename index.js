const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors')

//include the routes file
var email = require('./email');

////////
app.use('/demand', email);

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