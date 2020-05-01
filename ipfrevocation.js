"use strict";
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');

router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());
router.use(cors())

router.post('/email', function (req, res) {
  const letter_data = req.body;
  const GUARANTORS_EMAIL = '';
  if(req.body.guarantor && req.body.guarantor.length > 0) {
    GUARANTORS_EMAIL = req.body.guarantor.email;
  }
  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'abdiel.funk26@ethereal.email',
      pass: '3HWTWq9gm2TgDtssNP'
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

  /* comment out for production
  var transporter = nodemailer.createTransport({
    host: "192.168.0.39",
    port: 25,
    secure: false, // upgrade later with STARTTLS
    tls: { rejectUnauthorized: false },
    debug: true
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });*/

  var mailOptions = {
    from: letter_data.branchemail,
    to: letter_data.email,
    cc: GUARANTORS_EMAIL,
    subject: "IPF Revocation",
    // text: "Text. ......",
    html: '<h5>Dear Customer:</h5>' +
      'Thank you for your continued patronage of Co-operative Bank. Please find attached your IPF Revocation Notice.<br>' +
      '<p>Kindly note this is an automated delivery system; do not reply to this email address</p>' +
      '<br>' +
      'For any queries, kindly contact Customer Service on phone numbers: 0703027000/ 020 2776000 | SMS:16111 | <br>' +
      'Email: customerservice@co-opbank.co.ke | Twitter handle: @Coopbankenya | Facebook: Co-opBank Kenya | WhatsApp:0736690101<br>' +
      '<br>' +
      'Best Regards,<br>' +
      'Co-operative Bank of Kenya' +
      '<br> <br>' ,
    attachments: [
      {
        //filename: 'Demand 1',
        // path: '/home/ecollectadmin/demandletters/016C72278352032019-03-15demand1.docx'
        path: letter_data.path
      }
    ]
  };

  // send email

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.json({
        result: 'fail',
        message: "message not sent"
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
