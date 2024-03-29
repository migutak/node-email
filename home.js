"use strict";
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
router.use(cors())

router.post('/email', function (req, res) {
  const letter_data = req.body;

  const GUARANTORS_EMAIL = '';
  if (req.body.guarantor && req.body.guarantor.length > 0) {
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

  var mailOptions = {
    from: letter_data.branchemail,
    to: letter_data.email,
    cc: GUARANTORS_EMAIL,
    subject: "[Co-op Bank Collections] Demand Letter",
    // text: "Text. ......",
    html: '<h5>Dear Customer:</h5>' +
      'Thank you for your continued patronage of Co-operative Bank. Please find attached your Demand Notice.<br>' +
      '<p>Kindly note this is an automated delivery system; do not reply to this email address</p>' +
      '<br>' +
      'For any queries, kindly contact Customer Service on phone numbers: 0703027000/ 020 2776000 | SMS:16111 | <br>' +
      'Email: customerservice@co-opbank.co.ke | Twitter handle: @Coopbankenya | Facebook: Co-opBank Kenya | WhatsApp:0736690101<br>' +
      '<br>' +
      'Best Regards,<br>' +
      'Co-operative Bank of Kenya' +
      '<br> <br>' +
      '<hr>' +
      '<p>This e-mail message has been scanned for Viruses and Content Scanned ' +
      '<hr>' +
      '<p>DISCLAIMER:   This email (including any attachments) is confidential and intended only for the use of the addressee. It may contain information covered by legal, professional or other privilege, which privilege is not lost or waived by reason of mistaken transmission thereof. Unless you are the intended recipient (or authorized to receive for the intended recipient), you may not read, print, retain, use, copy, distribute or disclose to anyone the message (including any attachments) or any information contained in the message. Any representation or opinions expressed are those of the individual sender and not necessarily those of Co-operative Bank Of Kenya. Internet communications are not secure or safe and therefore Co-operative Bank does not accept legal responsibility for the contents of this message. If you are not the addressee, please inform the sender immediately and destroy this e-mail (including any attachments).   Although Co-operative Bank operates anti-virus programs, it does not accept responsibility for any damage whatsoever caused by any viruses passed by e-mail.</p>',

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
