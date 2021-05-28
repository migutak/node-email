"use strict";
const nodemailer = require("nodemailer");
var express = require('express');
var router = express.Router();
const app = express();
const cors = require('cors');
var data = require('./data.js');

var data = require('./data.js');

//const LETTERS_DIR = data.filePath;
//const IMAGE_DIR = data.imagePath;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use(cors())

router.post('/email', (req, res) => {
  const letter_data = req.body;
  //const GUARANTORS = req.body.guarantors;
  let demand = 'Demand Notice'
  let phones = '0711049937/0711049195/0711049517';
  let msgbody = 'loan';

  if (letter_data.title == 'overduecc' || letter_data.title == 'prelistingcc' || letter_data.title == 'suspension') {
    msgbody = 'Credit card';
    phones = '0711049639/0711049979/0711049932';
  }


  if (letter_data.branchemail == null || letter_data.branchemail == undefined) {
    letter_data.branchemail = 'Contact Centre Team <ContactCentreTeam@co-opbank.co.ke>';
  };

  if (letter_data.title == 'prelisting' || letter_data.title == 'prelistingcc' || letter_data.title == 'prelistingremedial') {
    demand = 'Pre-Listing Notice'
  } else if (letter_data.title == 'Day30') {
    demand = 'Thirty(30) Day Notice Letter'
  } else if (letter_data.title == 'Day90') {
    demand = 'Ninety(90) Day Notice Letter'
  } else if (letter_data.title == 'Day40') {
    demand = 'Forty(40) Day Notice Letter'
  } else if (letter_data.title == 'suspension') {
    demand = 'Credit Card Suspension Letter'
  } else if (letter_data.title == 'Demand1') {
    demand = 'First Demand Letter'
  } else if (letter_data.title == 'Demand2') {
    demand = 'Second Demand Letter'
  } else if (letter_data.title == 'PostlistingUnsecuredcc' || letter_data.title == 'PostlistingUnsecured' || letter_data.title == 'PostlistingSecured') {
    demand = 'Post-Listing Letter'
  } else {
    demand = 'Demand Notice'
  }

  let g_email = [];
  if (letter_data.guarantor && letter_data.guarantor.length > 0) {
    for (let i = 0; i < letter_data.guarantor.length; i++) {
      g_email.push(letter_data.guarantor[i].email)
    }
  }


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
    from: 'ecollect@co-opbank.co.ke',
    to: letter_data.email,
    cc: g_email,
    subject: "[Co-op Bank Collections]" + demand,
    // text: "Text. ......",
    html: '<body style="overflow: auto; padding:0; margin:0; font-size: 14px; font-family: arial, helvetica, sans-serif; cursor:auto; background-color:#feffff">' +
      '<table cellspacing="0" cellpadding="0" width="100%" bgcolor="#feffff">' +
      '<tr>' +
      '<td style="FONT-SIZE: 0px; HEIGHT: 0px; LINE-HEIGHT: 0"></td>' +
      '</tr>' +
      '<tr>' +
      '<td valign="top">' +
      '<table class="rtable" style="WIDTH: 756px; MARGIN: 0px auto" cellspacing="0" cellpadding="0" width="756" align="center" border="0">' +
      '<tr>' +
      '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent">' +
      '<table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left">' +
      '<tr style="HEIGHT: 20px" height="20">' +
      '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent"></th>' +
      '</tr>' +
      '<tr style="HEIGHT: 94px" height="94">' +
      '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 756px; VERTICAL-ALIGN: middle; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: transparent">' +
      '<table cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center">' +
      '<table class="imgtable" style="MARGIN: 0px auto" cellspacing="0" cellpadding="0" align="center" border="0">' +
      '<tr>' +
      '<td style="PADDING-BOTTOM: 2px; PADDING-TOP: 2px; PADDING-LEFT: 2px; PADDING-RIGHT: 2px" align="center">' +
      '<table cellspacing="0" cellpadding="0" border="0">' +
      '<tr>' +
      '<td style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; BACKGROUND-COLOR: transparent"><a href="http://www.co-opbank.co.ke/" target="_blank"><img title="Co-operative Bank of Kenya" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="" src="cid:unique@kreata.ee" width="110" /></a></td>' +
      '</tr>' +
      '</table>' +
      '</td>' +
      '</tr>' +
      '</table>' +
      '</tr>' +
      '</table>' +
      '</th>' +
      '</tr>' +
      '<tr>' +
      '<th class="contenttd" style="BORDER-TOP: #0e8706 5px solid; BORDER-RIGHT: medium none; WIDTH: 756px; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 0px; TEXT-ALIGN: left; PADDING-TOP: 0px; PADDING-LEFT: 0px; BORDER-LEFT: medium none; PADDING-RIGHT: 0px; BACKGROUND-COLOR: #feffff">' +
      '<table style="WIDTH: 100%" cellspacing="0" cellpadding="0" align="left">' +
      '<tr style="HEIGHT: 348px" height="348">' +
      '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 10px; TEXT-ALIGN: left; PADDING-TOP: 20px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
      '<p style="FONT-SIZE: 24px; MARGIN-BOTTOM: 1em; FONT-FAMILY: geneve, arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #2d2d2d; TEXT-ALIGN: left; LINE-HEIGHT: 37px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left"><span style="FONT-SIZE: 16px; LINE-HEIGHT: 25px"><strong>Dear Customer</strong></span>,</p>' +
      '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">This is to remind you that your ' + msgbody + ' payment is over-due and the debt needs to be settled as per the borrowing terms. Attached here is the ' + demand + '.<br />' +
      '&nbsp;<br />' +
      '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">For any queries, contact Collections Department on phone numbers: ' + phones + '</p>' +
      '<p style="FONT-SIZE: 14px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #575757; TEXT-ALIGN: left; LINE-HEIGHT: 22px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">Yours Faithfully,<br />' +
      '<br />' +
      '<strong>Head,</strong><br />' +
      '<strong>Collections Department,</strong><br />' +
      '<strong>Credit Management Division,</strong><br />' +
      '<strong>Co-operative Bank Of Kenya Ltd</strong><br />' +
      '</p>' +
      '<p style="FONT-SIZE: 10px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #7c7c7c; TEXT-ALIGN: left; LINE-HEIGHT: 12px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left">This e-mail message has been scanned for <strong>Viruses and Content Scanned</strong></p>' +
      '</th>' +
      '</tr>' +
      '<tr style="HEIGHT: 150px" height="150">' +
      '<th class="contenttd" style="BORDER-TOP: #0e8706 1px solid; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 20px; TEXT-ALIGN: left; PADDING-TOP: 10px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
      '<p style="FONT-SIZE: 10px; MARGIN-BOTTOM: 1em; FONT-FAMILY: arial, helvetica, sans-serif; MARGIN-TOP: 0px; COLOR: #7c7c7c; TEXT-ALIGN: left; LINE-HEIGHT: 12px; BACKGROUND-COLOR: transparent; mso-line-height-rule: exactly" align="left"><br />' +
      '&nbsp;<strong>DISCLAIMER:</strong> This email (including any attachments) is confidential and intended only for the use of the addressee. It may contain information covered by legal, professional or other privilege, which privilege is not lost or waived by reason of mistaken transmission thereof. Unless you are the intended recipient (or authorized to receive for the intended recipient), you may not read, print, retain, use, copy, distribute or disclose to anyone the message (including any attachments) or any information contained in the message. Any representation or opinions expressed are those of the individual sender and not necessarily those of Co-operative Bank Of Kenya. Internet communications are not secure or safe and therefore Co-operative Bank does not accept legal responsibility for the contents of this message. If you are not the addressee, please inform the sender immediately and destroy this e-mail (including any attachments). Although Co-operative Bank operates anti-virus programs, it does not accept responsibility for any damage whatsoever caused by any viruses passed by e-mail.</p>' +
      '</th>' +
      '</tr>' +
      '<tr style="HEIGHT: 84px" height="84">' +
      '<th class="contenttd" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; WIDTH: 726px; VERTICAL-ALIGN: top; BORDER-BOTTOM: medium none; FONT-WEIGHT: normal; PADDING-BOTTOM: 30px; TEXT-ALIGN: left; PADDING-TOP: 10px; PADDING-LEFT: 15px; BORDER-LEFT: medium none; PADDING-RIGHT: 15px; BACKGROUND-COLOR: transparent">' +
      '<div style="PADDING-BOTTOM: 10px; TEXT-ALIGN: center; PADDING-TOP: 10px; PADDING-LEFT: 10px; PADDING-RIGHT: 10px">' +
      '<table class="imgtable" style="DISPLAY: inline-block" cellspacing="0" cellpadding="0" border="0">' +
      '<tr>' +
      '<td style="PADDING-RIGHT: 5px"><a href="https://www.facebook.com/coopbankenya/" target="_blank"><img title="Facebook" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="Facebook" src="cid:unique@facebook_logo.ee" width="24" ></a> </td>' +
      '<td style="PADDING-RIGHT: 5px"><a href="https://twitter.com/coopbankenya/" target="_blank"><img title="Twitter" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="Twitter" src="cid:unique@twitter_logo.ee" width="24" ></a> </td>' +
      '<td><a href="https://wa.me/254736690101" target="_blank"><img title="Coopbankenya WhatsApp" style="BORDER-TOP: medium none; BORDER-RIGHT: medium none; BORDER-BOTTOM: medium none; BORDER-LEFT: medium none; DISPLAY: block" alt="" src="cid:unique@whatsapp_logo.ee" width="24"></a> </td>' +
      '</tr>' +
      '</table>' +
      '</div>' +
      '</th>' +
      '</tr>' +
      '<tr>' +
      '<td style="FONT-SIZE: 0; HEIGHT: 8px; LINE-HEIGHT: 0">&nbsp;</td>' +
      '</tr>' +
      '</table>' +
      '</th>' +
      '</tr></table></th></tr></table></td></tr></table>' +
      '</body>',
    /*attachments: [
      {
        //filename: 'Demand 1',
        // path: '/home/ecollectadmin/demandletters/016C72278352032019-03-15demand1.docx'
        path: letter_data.file
      }
    ]*/
    attachments: [
      {
        filename: 'coopbank_logo.png',
        path: 'images/coopbank_logo.png',
        cid: 'unique@kreata.ee' //same cid value as in the html img src
      },
      {
        filename: 'facebook_logo.png',
        path: 'images/facebook_logo.png',
        cid: 'unique@facebook_logo.ee' //same cid value as in the html img src
      },
      {
        filename: 'twitter_logo.png',
        path: 'images/twitter_logo.png',
        cid: 'unique@twitter_logo.ee' //same cid value as in the html img src
      },
      {
        filename: 'whatsapp_logo.png',
        path: 'images/whatsapp_logo.png',
        cid: 'unique@whatsapp_logo.ee' //same cid value as in the html img src
      },
      {
        path: letter_data.file
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
