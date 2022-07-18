"use strict";
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const cors = require('cors');
var data = require('./data.js');
require('log-timestamp');


router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(cors());

router.post('/email', (req, res) => {
  


  var transporter = nodemailer.createTransport({
    host: data.smtpserver,
    port: data.smtpport,
    secure: false, // upgrade later with STARTTLS
    tls: { rejectUnauthorized: false },
    debug: true,
    auth: {
      user: data.user,
      pass: data.pass
    }
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  var mailOptions = {
    from: data.user,
    to: req.body.emailaddress,
    subject: "E-Collect Password reset",
    html: '<body style="overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#feffff">' +
    '<div>Click <a href="'+data.reset+req.body.username+'" target=\"_blank\">here</a> to create E-Collect password</div>' +
    '</body>',
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error', error);

      res.json({
        result: 'fail',
        message: "Email message not sent"
      })
      
    }
    console.log("info > ", info)
    res.json({
      result: 'success',
      message: "message sent",
      info: info
    })
    
  })
});

module.exports = router;
