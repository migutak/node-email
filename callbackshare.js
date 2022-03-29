"use strict";
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const app = express();
const cors = require('cors');
var data = require('./data.js');
const fs = require('fs');
require('log-timestamp');
var Minio = require("minio");

var minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '127.0.0.1',
  port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT, 10) : 9005,
  useSSL: false,
  accessKey: process.env.ACCESSKEY || 'AKIAIOSFODNN7EXAMPLE',
  secretKey: process.env.SECRETKEY || 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY'
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(cors());

router.post('/email', (req, res) => {
  const letter_data = req.body;
  // get file from minio
  minioClient.fGetObject('meetings', letter_data.filename, `${__dirname}/files/` + letter_data.filename, function (err) {
    if (err) {
      return console.log(err)
    }
    console.log(`downloaded successfully from minio at ${new Date()}`);
  })
  // end get files from mino


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
    to: letter_data.selectedPeople,
    subject: "[E-Collect Callbackschedule] Customer Meeting Invite" + letter_data.custname,
    text: "Please accept and join attached client meeting",

    attachments: [
      {
        path: `${__dirname}/files/` + letter_data.filename
      }
    ]
  };

  // send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('error', error);

      res.json({
        result: 'fail',
        message: "Email message not sent"
      })
      //delete file from local
      fs.unlink(`${__dirname}/files/` + letter_data.filename, (err) => {
        if (err) {
          console.error(err)
          return
        }

        //file removed 
      })// end delete file from local
    }
    console.log("info > ", info)
    res.json({
      result: 'success',
      message: "message sent",
      info: info
    })
    // delete file from local
    fs.unlink(`${__dirname}/files/` + letter_data.filename, (err) => {
      if (err) {
        console.error(err)
        return
      }
      //file removed
    })// end delete file from local
  })
});

module.exports = router;
